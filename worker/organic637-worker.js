const VERSION = 'clean-v1.0.0';
const SESSION_DAYS = 30;
const MAX_SYNC_CHUNKS = 32;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env);

    if (request.method === 'OPTIONS') {
      if (!originAllowed(origin, env)) {
        return json({ ok: false, error: { code: 'origin_not_allowed', message: 'Origin not allowed' } }, 403, cors);
      }
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method === 'GET' && url.pathname === '/health') {
      return json({
        ok: true,
        service: 'organic637-lab-api',
        version: VERSION,
        database: Boolean(env.DB),
        auth_configured: Boolean(env.AUTH_PEPPER),
        allowed_origin_configured: Boolean(env.ALLOWED_ORIGIN)
      }, 200, cors);
    }

    if (!originAllowed(origin, env)) {
      return json({ ok: false, error: { code: 'origin_not_allowed', message: 'Origin not allowed' } }, 403, cors);
    }

    if (!env.DB) {
      return json({ ok: false, error: { code: 'db_not_configured', message: 'D1 database binding DB is not configured' } }, 503, cors);
    }
    if (!env.AUTH_PEPPER) {
      return json({ ok: false, error: { code: 'auth_not_configured', message: 'AUTH_PEPPER is not configured' } }, 503, cors);
    }

    try {
      if (request.method === 'POST' && url.pathname === '/auth/register') return await register(request, env, cors);
      if (request.method === 'POST' && url.pathname === '/auth/login') return await login(request, env, cors);
      if (request.method === 'POST' && url.pathname === '/auth/logout') return await logout(request, env, cors);
      if (request.method === 'GET' && url.pathname === '/auth/me') return await me(request, env, cors);
      if (request.method === 'GET' && url.pathname === '/sync/pull') return await syncPull(request, env, cors);
      if (request.method === 'POST' && url.pathname === '/sync/push') return await syncPush(request, env, cors);
      return json({ ok: false, error: { code: 'not_found', message: 'Unknown endpoint' } }, 404, cors);
    } catch (err) {
      const e = normalizeError(err);
      return json({ ok: false, error: e, worker_version: VERSION }, e.http_status || 500, cors);
    }
  }
};

async function register(request, env, cors) {
  const body = await readJson(request);
  const username = normalizeUsername(body.username);
  const verifier = validateVerifier(body.verifier);
  await authRateLimit(request, env, `register:${username}`, 5, 30 * 60);

  const existing = await env.DB.prepare('SELECT id FROM users WHERE username=?').bind(username).first();
  if (existing) return json({ ok: false, error: { code: 'username_taken', message: '这个账号已经被注册' } }, 409, cors);

  const now = Date.now();
  const id = crypto.randomUUID();
  const verifierHash = await hmacVerifier(verifier, env.AUTH_PEPPER);
  await env.DB.prepare('INSERT INTO users(id,username,verifier_hash,created_at,last_login_at) VALUES(?,?,?,?,?)')
    .bind(id, username, verifierHash, now, now).run();

  const session = await createSession(env, id);
  return json({ ok: true, user: { id, username, created_at: now }, session }, 200, cors);
}

async function login(request, env, cors) {
  const body = await readJson(request);
  const username = normalizeUsername(body.username);
  const verifier = validateVerifier(body.verifier);
  await authRateLimit(request, env, `login:${username}`, 10, 10 * 60);

  const row = await env.DB.prepare('SELECT id,username,verifier_hash,created_at FROM users WHERE username=?').bind(username).first();
  const candidate = await hmacVerifier(verifier, env.AUTH_PEPPER);
  if (!row || !safeEqual(candidate, String(row.verifier_hash || ''))) {
    return json({ ok: false, error: { code: 'login_failed', message: '账号或密码不正确' } }, 401, cors);
  }

  const now = Date.now();
  await env.DB.prepare('UPDATE users SET last_login_at=? WHERE id=?').bind(now, row.id).run();
  const session = await createSession(env, row.id);
  return json({ ok: true, user: { id: row.id, username: row.username, created_at: row.created_at }, session }, 200, cors);
}

async function logout(request, env, cors) {
  const token = getBearer(request);
  if (token) {
    const hash = await sha256b64(token);
    await env.DB.prepare('DELETE FROM sessions WHERE token_hash=?').bind(hash).run();
  }
  return json({ ok: true }, 200, cors);
}

async function me(request, env, cors) {
  const auth = await requireUser(request, env);
  return json({ ok: true, user: auth.user, expires_at: auth.expires_at }, 200, cors);
}

async function syncPull(request, env, cors) {
  const auth = await requireUser(request, env);
  const rows = await env.DB.prepare('SELECT chunk_key,data_json,updated_at FROM progress_chunks WHERE user_id=? ORDER BY chunk_key')
    .bind(auth.user.id).all();
  const chunks = {};
  for (const row of rows.results || []) {
    try { chunks[row.chunk_key] = { data: JSON.parse(row.data_json), updated_at: Number(row.updated_at) || 0 }; } catch {}
  }
  return json({ ok: true, user: auth.user, chunks, server_time: Date.now(), worker_version: VERSION }, 200, cors);
}

async function syncPush(request, env, cors) {
  const auth = await requireUser(request, env);
  const body = await readJson(request);
  const items = Array.isArray(body.chunks) ? body.chunks : [];
  if (items.length > MAX_SYNC_CHUNKS) throw clientError('too_many_chunks', '同步数据块过多');

  const now = Date.now();
  const stmts = [];
  for (const item of items) {
    const key = String(item?.key || '').trim();
    if (!/^(core|skills|attempts:\d+)$/.test(key)) continue;
    const data = JSON.stringify(item.data ?? {});
    if (data.length > 1200000) throw clientError('chunk_too_large', `同步数据块 ${key} 过大`, 413);
    stmts.push(env.DB.prepare(
      'INSERT INTO progress_chunks(user_id,chunk_key,data_json,updated_at) VALUES(?,?,?,?) ON CONFLICT(user_id,chunk_key) DO UPDATE SET data_json=excluded.data_json,updated_at=excluded.updated_at'
    ).bind(auth.user.id, key, data, now));
  }
  if (stmts.length) await env.DB.batch(stmts);
  return json({ ok: true, written: stmts.length, updated_at: now, worker_version: VERSION }, 200, cors);
}

function normalizeUsername(value) {
  const s = String(value || '').trim().toLowerCase();
  if (!/^[a-z0-9_]{2,24}$/.test(s)) throw clientError('bad_username', '账号请使用2–24位小写字母、数字或下划线');
  return s;
}

function validateVerifier(value) {
  const s = String(value || '').trim();
  if (!/^[A-Za-z0-9_-]{40,60}$/.test(s)) throw clientError('bad_verifier', '登录凭据格式错误');
  return s;
}

function clientError(code, message, status = 400) {
  const e = new Error(message); e.client = true; e.code = code; e.status = status; return e;
}

async function readJson(request) {
  try { return await request.json(); } catch { throw clientError('bad_json', '请求数据格式错误'); }
}

function bytesToB64url(bytes) {
  let s = ''; for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

async function sha256b64(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(String(text)));
  return bytesToB64url(new Uint8Array(buf));
}

async function hmacVerifier(verifier, pepper) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(String(pepper)), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(verifier));
  return bytesToB64url(new Uint8Array(sig));
}

function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let x = 0; for (let i = 0; i < a.length; i++) x |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return x === 0;
}

function getBearer(request) {
  const h = request.headers.get('Authorization') || '';
  return h.startsWith('Bearer ') ? h.slice(7).trim() : '';
}

async function createSession(env, userId) {
  const raw = new Uint8Array(32); crypto.getRandomValues(raw);
  const token = bytesToB64url(raw);
  const hash = await sha256b64(token);
  const now = Date.now();
  const expires = now + SESSION_DAYS * 86400000;
  await env.DB.prepare('INSERT INTO sessions(token_hash,user_id,created_at,expires_at) VALUES(?,?,?,?)')
    .bind(hash, userId, now, expires).run();
  return { token, expires_at: expires };
}

async function requireUser(request, env) {
  const token = getBearer(request);
  if (!token) throw clientError('unauthorized', '请先登录', 401);
  const hash = await sha256b64(token);
  const now = Date.now();
  const row = await env.DB.prepare(
    'SELECT u.id,u.username,u.created_at,s.expires_at FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?'
  ).bind(hash, now).first();
  if (!row) throw clientError('session_expired', '登录已过期，请重新登录', 401);
  return { user: { id: row.id, username: row.username, created_at: row.created_at }, expires_at: row.expires_at };
}

async function authRateLimit(request, env, label, limit, windowSeconds) {
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const bucket = Math.floor(Date.now() / (windowSeconds * 1000));
  const key = await sha256b64(`${ip}|${label}|${bucket}`);
  const now = Date.now();
  const expires = now + windowSeconds * 1000;
  const row = await env.DB.prepare('SELECT attempts FROM auth_rate WHERE rate_key=?').bind(key).first();
  if (Number(row?.attempts || 0) >= limit) throw clientError('too_many_attempts', '尝试次数过多，请稍后再试', 429);
  await env.DB.prepare(
    'INSERT INTO auth_rate(rate_key,window_start,attempts,expires_at) VALUES(?,?,1,?) ON CONFLICT(rate_key) DO UPDATE SET attempts=attempts+1,expires_at=excluded.expires_at'
  ).bind(key, now, expires).run();
}

function allowedOrigins(env) {
  return String(env.ALLOWED_ORIGIN || '').split(',').map(x => x.trim().replace(/\/+$/g, '')).filter(Boolean);
}

function originAllowed(origin, env) {
  if (!origin) return false;
  const normalized = origin.replace(/\/+$/g, '');
  const list = allowedOrigins(env);
  return list.includes('*') || list.includes(normalized);
}

function corsHeaders(origin, env) {
  const allow = origin && originAllowed(origin, env) ? origin : 'null';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin'
  };
}

function json(obj, status = 200, headers = {}) {
  return new Response(JSON.stringify(obj), { status, headers });
}

function normalizeError(err) {
  if (err?.client) return { code: err.code || 'client_error', message: err.message, http_status: err.status || 400 };
  return { code: 'worker_error', message: String(err?.message || err || 'Unknown error').slice(0, 240), http_status: 500 };
}
