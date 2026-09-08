(() => {
  'use strict';

  const CFG = window.ORGANIC637_CONFIG || {};
  const Data = window.Organic637Data = window.Organic637Data || {};
  Data.days = Data.days || {};
  const NS = window.Organic637 = window.Organic637 || {};
  const APP_KEY = 'organic637_clean_v1_state';
  const AUTH_KEY = 'organic637_clean_v1_auth';
  const BACKUP_SUFFIX = ':backup';
  const AVAILABLE_MAX_DAY = 4;
  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  if (!NS.Learning || !NS.Review || !NS.Interactions) {
    $('#app').textContent = '学习引擎没有完整加载，请刷新页面。';
    return;
  }

  function normalizeLegacyQuestion(q, day, role = 'practice') {
    const primarySkill = q.primarySkill || q.skill || 'unknown';
    return {
      ...q,
      day: Number(q.day || day),
      type: q.type || 'choice',
      role: q.role || role,
      primarySkill,
      skillIds: Array.isArray(q.skillIds) && q.skillIds.length ? q.skillIds : [primarySkill],
      difficulty: Number(q.difficulty || 1),
      examTags: Array.isArray(q.examTags) ? q.examTags : [],
      hints: Array.isArray(q.hints) ? q.hints : [q.hint1, q.hint2].filter(Boolean),
      explanationLayers: q.explanationLayers || {
        short: q.explanation || '',
        why: q.whyNot || q.explanation || '',
        full: [q.explanation, q.whyNot].filter(Boolean).join(' ')
      }
    };
  }

  function registerLegacyDay1() {
    if (Data.days[1] || !window.ORGANIC637_DAY01) return;
    const old = window.ORGANIC637_DAY01;
    const repairs = {};
    Object.entries(old.repairs || {}).forEach(([skill, rows]) => {
      repairs[skill] = (rows || []).map(q => normalizeLegacyQuestion(q, 1, 'repair'));
    });
    Data.days[1] = {
      ...old,
      objectives: old.objectives || ['找到 C=C 反应中心', '完成普通 HBr 区域选择', '区分 Br₂ 与 Br₂/H₂O'],
      questions: (old.questions || []).map((q, index) => normalizeLegacyQuestion(q, 1, index === 0 ? 'learn' : index === old.questions.length - 1 ? 'transfer' : 'practice')),
      repairs
    };
  }

  registerLegacyDay1();
  const REGISTRY = Data.days;
  const MANIFEST = Data.MANIFEST || { days: [] };
  const SKILLS = Data.SKILLS || [];
  const SKILL_META = new Map(SKILLS.map(row => [row.id, row]));
  const QMAP = NS.Learning.questionIndex(REGISTRY);

  const Auth = {
    token: null,
    user: null,
    expiresAt: 0,
    offline: false,
    base() { return String(CFG.API_URL || '').replace(/\/$/, ''); },
    load() {
      try {
        const row = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
        if (row?.token && row?.user) {
          this.token = row.token;
          this.user = row.user;
          this.expiresAt = Number(row.expires_at) || 0;
          return true;
        }
      } catch {}
      return false;
    },
    save() {
      if (this.token && this.user) localStorage.setItem(AUTH_KEY, JSON.stringify({ token: this.token, user: this.user, expires_at: this.expiresAt }));
      else localStorage.removeItem(AUTH_KEY);
    },
    clear() {
      this.token = null;
      this.user = null;
      this.expiresAt = 0;
      this.offline = false;
      localStorage.removeItem(AUTH_KEY);
    },
    async deriveVerifier(username, password) {
      const user = String(username || '').trim().toLowerCase();
      const pw = String(password || '');
      if (!/^[a-z0-9_]{2,24}$/.test(user)) throw new Error('账号请使用2–24位小写字母、数字或下划线');
      if (pw.length < 6 || pw.length > 72) throw new Error('密码长度需为6–72位');
      if (!crypto?.subtle) throw new Error('当前浏览器不支持安全登录所需的 Web Crypto');
      const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveBits']);
      const salt = new TextEncoder().encode(`organic637:v1:${user}`);
      const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: 150000 }, key, 256);
      return b64url(new Uint8Array(bits));
    },
    async request(path, { method = 'POST', body = null, auth = true } = {}) {
      const base = this.base();
      if (!base || /REPLACE|YOUR_/i.test(base)) throw new Error('后台地址还没有配置');
      const headers = {};
      if (body !== null) headers['Content-Type'] = 'application/json';
      if (auth && this.token) headers.Authorization = `Bearer ${this.token}`;
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);
      try {
        const response = await fetch(base + path, {
          method,
          headers,
          body: body === null ? undefined : JSON.stringify(body),
          cache: 'no-store',
          signal: controller.signal
        });
        let out = {};
        try { out = await response.json(); } catch {}
        if (!response.ok || out?.ok === false) {
          const error = new Error(out?.error?.message || `请求失败（HTTP ${response.status}）`);
          error.code = out?.error?.code || `http_${response.status}`;
          error.status = response.status;
          throw error;
        }
        return out;
      } catch (error) {
        if (error?.name === 'AbortError') throw new Error('后台请求超时');
        throw error;
      } finally {
        clearTimeout(timer);
      }
    },
    async register(username, password) {
      const verifier = await this.deriveVerifier(username, password);
      const out = await this.request('/auth/register', { body: { username, verifier }, auth: false });
      this.token = out.session.token;
      this.expiresAt = out.session.expires_at;
      this.user = out.user;
      this.offline = false;
      this.save();
      return out;
    },
    async login(username, password) {
      const verifier = await this.deriveVerifier(username, password);
      const out = await this.request('/auth/login', { body: { username, verifier }, auth: false });
      this.token = out.session.token;
      this.expiresAt = out.session.expires_at;
      this.user = out.user;
      this.offline = false;
      this.save();
      return out;
    },
    async restore() {
      if (!this.load()) return false;
      if (this.expiresAt && this.expiresAt < Date.now()) {
        this.clear();
        return false;
      }
      try {
        const out = await this.request('/auth/me', { method: 'GET' });
        this.user = out.user;
        this.offline = false;
        this.save();
        return true;
      } catch (error) {
        if (['session_expired', 'unauthorized'].includes(error.code)) {
          this.clear();
          return false;
        }
        this.offline = true;
        return Boolean(this.user);
      }
    },
    async logout() {
      try { if (this.token) await this.request('/auth/logout', { body: {} }); } catch {}
      this.clear();
    }
  };

  function b64url(bytes) {
    let text = '';
    for (const byte of bytes) text += String.fromCharCode(byte);
    return btoa(text).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
  }

  const Store = {
    scope: 'guest',
    state: null,
    key() { return `${APP_KEY}:${this.scope}`; },
    backupKey() { return this.key() + BACKUP_SUFFIX; },
    setScope(id) { this.scope = String(id || 'guest'); },
    fresh() { return NS.Learning.freshState(REGISTRY); },
    valid(value) {
      return Boolean(value && typeof value === 'object' && (value.day1 || value.days || value.schemaVersion === 2) && value.skills && Array.isArray(value.attempts));
    },
    load() {
      let primary = null;
      let backup = null;
      try {
        primary = JSON.parse(localStorage.getItem(this.key()) || 'null');
        backup = JSON.parse(localStorage.getItem(this.backupKey()) || 'null');
      } catch {}
      const rows = [primary, backup].filter(value => this.valid(value)).sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
      this.state = NS.Learning.migrateState(rows[0] || this.fresh(), REGISTRY);
      normalizeState();
      return this.state;
    },
    save(sync = true) {
      this.state = NS.Learning.migrateState(this.state || this.fresh(), REGISTRY);
      normalizeState();
      this.state.updatedAt = Date.now();
      const text = JSON.stringify(this.state);
      try {
        const previous = localStorage.getItem(this.key());
        if (previous && previous !== text) localStorage.setItem(this.backupKey(), previous);
        localStorage.setItem(this.key(), text);
      } catch {}
      if (sync) Cloud.schedule();
    }
  };

  function normalizeState() {
    const state = Store.state;
    if (!state) return;
    state.schemaVersion = 2;
    state.version = 2;
    for (let day = 1; day <= AVAILABLE_MAX_DAY; day += 1) {
      if (REGISTRY[day]) NS.Learning.ensureDayState(state, day, REGISTRY);
    }
    state.attempts = Array.isArray(state.attempts) ? state.attempts.slice(-1200) : [];
    state.completedDays = [...new Set((state.completedDays || []).map(Number))].sort((a, b) => a - b);
    const firstUnfinished = Array.from({ length: AVAILABLE_MAX_DAY }, (_, i) => i + 1).find(day => REGISTRY[day] && !state.completedDays.includes(day));
    if (!state.currentDay || state.currentDay < 1) state.currentDay = firstUnfinished || AVAILABLE_MAX_DAY;
    if (state.currentDay > AVAILABLE_MAX_DAY) state.currentDay = AVAILABLE_MAX_DAY;
    if (state.completedDays.includes(state.currentDay) && firstUnfinished) state.currentDay = firstUnfinished;
  }

  const Cloud = {
    timer: null,
    status: 'local',
    lastError: null,
    schedule() {
      if (!Auth.user || !Auth.token) return;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.push().catch(() => {}), 900);
    },
    chunks(state) {
      const core = { ...state };
      delete core.skills;
      delete core.attempts;
      const chunks = { core, skills: state.skills || {} };
      const attempts = state.attempts || [];
      for (let i = 0; i < attempts.length; i += 100) chunks[`attempts:${Math.floor(i / 100)}`] = attempts.slice(i, i + 100);
      return chunks;
    },
    fromChunks(chunks) {
      const state = chunks.core?.data && typeof chunks.core.data === 'object' ? { ...chunks.core.data } : Store.fresh();
      state.skills = chunks.skills?.data || state.skills || {};
      state.attempts = [];
      Object.keys(chunks)
        .filter(key => key.startsWith('attempts:'))
        .sort((a, b) => Number(a.split(':')[1]) - Number(b.split(':')[1]))
        .forEach(key => { if (Array.isArray(chunks[key]?.data)) state.attempts.push(...chunks[key].data); });
      return NS.Learning.migrateState(state, REGISTRY);
    },
    async pull() {
      this.status = 'syncing';
      renderCloud();
      try {
        const out = await Auth.request('/sync/pull', { method: 'GET' });
        this.status = 'synced';
        this.lastError = null;
        renderCloud();
        return out;
      } catch (error) {
        this.status = 'offline';
        this.lastError = error;
        renderCloud();
        throw error;
      }
    },
    async push() {
      if (!Auth.user || !Auth.token) return;
      this.status = 'syncing';
      renderCloud();
      try {
        const chunks = this.chunks(Store.state);
        const items = Object.entries(chunks).map(([key, data]) => ({ key, data }));
        await Auth.request('/sync/push', { body: { chunks: items } });
        this.status = 'synced';
        this.lastError = null;
        renderCloud();
      } catch (error) {
        this.status = 'offline';
        this.lastError = error;
        renderCloud();
      }
    },
    async bootstrap(newAccount = false) {
      Store.setScope(Auth.user.id);
      Store.load();
      try {
        const out = await this.pull();
        const hasCloud = Object.keys(out.chunks || {}).length > 0;
        if (hasCloud) {
          const cloud = this.fromChunks(out.chunks);
          if ((cloud.updatedAt || 0) >= (Store.state.updatedAt || 0) || !hasLocalProgress(Store.state)) {
            Store.state = cloud;
            Store.save(false);
          }
        } else if (newAccount || hasLocalProgress(Store.state)) {
          await this.push();
        }
        this.status = 'synced';
      } catch {
        this.status = 'offline';
      }
      renderCloud();
    }
  };

  function hasLocalProgress(state) {
    if (!state) return false;
    if ((state.completedDays || []).length) return true;
    if ((state.attempts || []).length) return true;
    return Object.values(state.days || {}).some(day => day?.taskIndex || Object.keys(day?.answered || {}).length || day?.finished);
  }

  function shell(inner, active = '') {
    const name = Auth.user?.username || '';
    $('#app').innerHTML = `<div class="app"><header class="topbar"><div class="brand"><small>南京工业大学 637 · 20天冲刺</small>有机实验室</div><div class="nav-row"><button class="nav-pill ${active === 'home' ? 'active' : ''}" data-nav="#home">今日</button><button class="nav-pill ${active === 'review' ? 'active' : ''}" data-nav="#review">复习</button><button class="nav-pill ${active === 'mistakes' ? 'active' : ''}" data-nav="#mistakes">错题</button><button class="nav-pill ${active === 'abilities' ? 'active' : ''}" data-nav="#abilities">能力</button></div><div class="cloud"><span id="cloudDot" class="dot"></span><span id="cloudText">${name ? esc(name) : '未登录'}</span></div></header>${inner}</div>`;
    document.querySelectorAll('[data-nav]').forEach(button => button.addEventListener('click', () => { location.hash = button.dataset.nav; }));
    renderCloud();
  }

  function renderCloud() {
    const dot = $('#cloudDot');
    const text = $('#cloudText');
    if (!dot || !text) return;
    dot.className = 'dot ' + (!Auth.user ? 'offline' : Cloud.status === 'synced' ? 'synced' : Cloud.status === 'syncing' ? 'syncing' : 'offline');
    text.textContent = !Auth.user ? '未登录' : Cloud.status === 'synced' ? `${Auth.user.username} · 已同步` : Cloud.status === 'syncing' ? `${Auth.user.username} · 同步中` : `${Auth.user.username} · 本地保存`;
  }

  function loginPage(mode = 'login', message = '') {
    $('#app').innerHTML = `<div class="app login-wrap"><section class="panel login-card"><div class="kicker">南京工业大学 637 · 20天冲刺</div><h1 class="hero">有机实验室</h1><p class="lead">今天只学一小串，学会以后再往前走。</p><div class="field"><label>名字 / 账号</label><input id="user" autocomplete="username" placeholder="例如：111"></div><div class="field"><label>密码</label><input id="pass" type="password" autocomplete="${mode === 'login' ? 'current-password' : 'new-password'}" placeholder="至少 6 位"></div>${message ? `<div class="error">${esc(message)}</div>` : ''}<div class="btn-row"><button id="submitLogin" class="btn primary">${mode === 'login' ? '登录' : '创建账号'}</button><button id="switchLogin" class="btn soft">${mode === 'login' ? '第一次来？创建账号' : '已经有账号？直接登录'}</button></div><p class="tiny" style="margin-top:18px">学习状态先保存在本机，再异步同步到云端；断网时也不会阻止做题。</p></section></div>`;
    $('#switchLogin').onclick = () => loginPage(mode === 'login' ? 'register' : 'login');
    $('#submitLogin').onclick = async () => {
      const user = $('#user').value.trim().toLowerCase();
      const password = $('#pass').value;
      $('#submitLogin').disabled = true;
      try {
        if (mode === 'login') await Auth.login(user, password);
        else await Auth.register(user, password);
        await Cloud.bootstrap(mode === 'register');
        location.hash = '#home';
        route();
      } catch (error) {
        loginPage(mode, error.message || '请求失败');
      }
    };
    $('#pass').addEventListener('keydown', event => { if (event.key === 'Enter') $('#submitLogin').click(); });
  }

  const domainNames = {
    reaction: '反应识别与单步反应',
    ranking: '排序与反应性',
    mechanism: '机理与电子箭头',
    structure: '结构推断',
    synthesis: '合成与逆推',
    stereo: '立体化学',
    exam: '综合迁移'
  };

  function domainSummary() {
    const buckets = new Map();
    SKILLS.forEach(meta => {
      const skill = Store.state.skills?.[meta.id];
      if (!skill || !skill.attempts) return;
      const row = buckets.get(meta.domain) || { domain: meta.domain, values: [], due: 0, count: 0 };
      const effective = NS.Learning.getEffectiveMastery(skill);
      row.values.push(effective);
      row.count += 1;
      if (skill.nextReviewAt && skill.nextReviewAt <= NS.Learning.dateISO()) row.due += 1;
      buckets.set(meta.domain, row);
    });
    return [...buckets.values()].map(row => ({ ...row, average: Math.round(row.values.reduce((sum, value) => sum + value, 0) / row.values.length) }));
  }

  function currentDayData() {
    normalizeState();
    return REGISTRY[Store.state.currentDay] || REGISTRY[1];
  }

  function homePage() {
    normalizeState();
    const state = Store.state;
    const day = state.currentDay;
    const data = currentDayData();
    const progress = NS.Learning.ensureDayState(state, day, REGISTRY);
    const baseCount = data.questions.length;
    const answeredMain = Object.keys(progress.answered || {}).filter(id => data.questions.some(q => q.id === id)).length;
    const percent = progress.finished ? 100 : Math.min(96, Math.round((progress.lessonIndex + answeredMain) / Math.max(1, data.lessons.length + baseCount) * 100));
    const due = NS.Review.dueCount(state);
    const mistakes = NS.Learning.todayMistakes(state).length;
    const stable = Object.values(state.skills || {}).filter(skill => NS.Learning.masteryBand(skill, NS.Learning.getEffectiveMastery(skill)) === '稳定').length;
    const score = NS.Learning.estimateScore(state, SKILLS);
    const summary = domainSummary();
    const dayTiles = (MANIFEST.days || []).map(meta => {
      const available = Boolean(REGISTRY[meta.day]) && meta.day <= AVAILABLE_MAX_DAY;
      const done = state.completedDays.includes(meta.day);
      const unlocked = available && (meta.day <= state.currentDay || done);
      const cls = done ? 'done' : meta.day === state.currentDay ? 'current' : !unlocked ? 'locked' : '';
      return `<button class="day-tile ${cls}" ${unlocked ? `data-day="${meta.day}"` : 'disabled'}><span class="day-number">DAY ${String(meta.day).padStart(2, '0')}</span><strong>${esc(meta.shortTitle || meta.title)}</strong><small>${done ? '已完成 · 可自由复练' : meta.day === state.currentDay ? '今天的主线' : available ? '按顺序解锁' : '下一阶段继续建设'}</small></button>`;
    }).join('');
    shell(`<div class="home-grid"><section class="panel day-card"><div class="kicker">DAY ${String(day).padStart(2, '0')} · 今日主线</div><h1>${esc(data.title)}</h1><p class="lead">${esc(data.subtitle || '')}</p><div class="progress-line"><i style="width:${percent}%"></i></div><div class="tiny">今日进度 ${percent}% · 预计 ${Number(data.estimatedMinutes || 80)} 分钟</div><div class="home-actions"><button class="home-action" id="startDay"><b>${progress.lessonIndex || progress.taskIndex ? '继续今天' : '开始今天'}</b><span>只沿这一条主线往前走</span></button><button class="home-action" id="openReview"><b>今日复习 ${due}</b><span>只捡回已经到期的记忆</span></button><button class="home-action" id="openMistakes"><b>今日错题 ${mistakes}</b><span>和遗忘复习分开处理</span></button></div><div class="btn-row"><button id="abilities" class="btn soft">看能力地图</button><button id="logout" class="btn ghost">退出账号</button></div></section><aside class="side-stat"><div class="panel"><div class="kicker">阶段 2 · 能力模型</div><div class="mini-card"><span class="tiny">已稳定技能</span><strong>${stable}</strong></div><div class="mini-card" style="margin-top:10px"><span class="tiny">训练估计</span><strong>${score.low}–${score.high}</strong><span class="tiny">/150 · ${esc(score.label)}</span></div></div><div class="panel"><div class="kicker">阶段 3 · 核心互动</div><p style="line-height:1.8;margin-bottom:0">Day 2–4 已接入结构选择、排序、路线分支与电子箭头。黄色路线允许继续，不把“非最优”直接判成错误。</p></div></aside></div><div class="section-title"><h2>20 天实验地图</h2><span class="phase-badge">本轮已开放 Day 1–4</span></div><div class="day-map">${dayTiles}</div>${summary.length ? `<div class="section-title"><h2>现在只看大能力，不堆几十条技能</h2><button class="tiny-link" id="allAbilities">展开能力地图 →</button></div><div class="ability-grid">${summary.slice(0, 4).map(row => abilityDomainCard(row)).join('')}</div>` : ''}`,'home');
    $('#startDay').onclick = () => { location.hash = `#day/${day}`; };
    $('#openReview').onclick = () => { location.hash = '#review'; };
    $('#openMistakes').onclick = () => { location.hash = '#mistakes'; };
    $('#abilities').onclick = () => { location.hash = '#abilities'; };
    $('#allAbilities')?.addEventListener('click', () => { location.hash = '#abilities'; });
    document.querySelectorAll('[data-day]').forEach(button => button.addEventListener('click', () => { location.hash = `#day/${button.dataset.day}`; }));
    $('#logout').onclick = async () => {
      await Cloud.push().catch(() => {});
      await Auth.logout();
      Store.setScope('guest');
      location.hash = '';
      loginPage('login');
    };
  }

  function abilityDomainCard(row) {
    return `<div class="ability-card"><header><b>${esc(domainNames[row.domain] || row.domain)}</b><strong>${row.average}%</strong></header><div class="meter"><i style="width:${row.average}%"></i></div><small>${row.count} 个已有证据的技能${row.due ? ` · ${row.due} 个到期` : ''}</small></div>`;
  }

  function dayPage(day) {
    const data = REGISTRY[day];
    if (!data || day > AVAILABLE_MAX_DAY) return notReadyPage(day);
    if (day > Store.state.currentDay && !Store.state.completedDays.includes(day)) {
      location.hash = '#home';
      return homePage();
    }
    const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
    if (progress.finished) return dayFinishPage(day);
    if (!progress.startedAt) progress.startedAt = Date.now();
    if (progress.lessonIndex < data.lessons.length) return lessonPage(day, data.lessons[progress.lessonIndex]);
    progress.phase = 'questions';
    if (!Array.isArray(progress.queue) || !progress.queue.length) progress.queue = data.questions.map(q => q.id);
    const id = progress.queue[progress.taskIndex];
    if (!id) return completeDay(day);
    const question = QMAP.get(id);
    if (!question) {
      progress.taskIndex += 1;
      Store.save();
      return dayPage(day);
    }
    return studyQuestionPage(question, {
      mode: question.role === 'repair' ? 'repair' : 'learn',
      day,
      positionLabel: question.role === 'repair' ? '修复题 · 同技能新结构' : `Day ${day} · 第 ${Math.min(progress.taskIndex + 1, progress.queue.length)} 个判断`,
      onNext(result) {
        const currentProgress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
        currentProgress.answered[question.id] = { correct: Boolean(result?.correct), partialScore: Number(result?.partialScore ?? 0), at: Date.now() };
        currentProgress.taskIndex += 1;
        Store.save();
        dayPage(day);
      },
      onSubmitted(result) {
        progress.answered[question.id] = { correct: result.correct, partialScore: result.partialScore, at: Date.now() };
        if (!result.correct && question.role !== 'repair') queueRepair(day, question.primarySkill);
        Store.save();
      }
    });
  }

  function lessonPage(day, item) {
    shell(`<section class="panel lesson-card"><div class="kicker">${esc(item.eyebrow || `Day ${day}`)}</div><h1>${esc(item.title)}</h1><div class="lesson-body">${esc(item.body)}</div>${item.note ? `<div class="note">${esc(item.note)}</div>` : ''}<div class="footer-actions"><button class="link-btn" id="home">← 回首页</button><button class="btn primary" id="nextLesson">继续这一小串</button></div></section>`);
    $('#home').onclick = () => { location.hash = '#home'; };
    $('#nextLesson').onclick = () => {
      const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
      progress.lessonIndex += 1;
      Store.save();
      dayPage(day);
    };
  }

  function studyQuestionPage(question, context) {
    const started = performance.now();
    const roleName = { learn: '新母概念', practice: '同核心练习', contrast: '近邻对比', transfer: '迁移', repair: '修复', review: '到期复习' }[context.mode] || context.mode;
    shell(`<section class="panel question-shell"><div class="question-head"><div class="step-label">${esc(context.positionLabel || `Day ${question.day}`)}</div><span class="role-chip">${esc(roleName)}</span></div><div id="interactionRoot"></div><div class="footer-actions"><button class="link-btn" id="home">← 先回首页</button><span class="tiny">学习模式可以试错；同一天重做不会伪装成长期掌握。</span></div></section>`);
    $('#home').onclick = () => { location.hash = '#home'; };
    const previous = Store.state.attempts.filter(row => row.questionId === question.id).length;
    NS.Interactions.mount($('#interactionRoot'), question, {
      examMode: false,
      onSubmit(submission, feedback) {
        const responseTimeMs = Math.max(0, Math.round(performance.now() - started));
        const attempt = NS.Learning.recordAttempt(Store.state, question, {
          day: context.day || question.day,
          mode: context.mode,
          correct: submission.correct,
          firstAttempt: previous === 0,
          attemptNumber: previous + 1,
          hintsUsed: submission.hintsUsed,
          confidence: submission.confidence,
          responseTimeMs,
          isRepair: context.mode === 'repair',
          isReview: context.mode === 'review',
          isTransfer: question.role === 'transfer',
          answerPayload: submission.payload,
          partialScore: submission.partialScore,
          errorType: submission.errorType,
          reasoningState: submission.reasoningState
        });
        context.onSubmitted?.(submission, attempt);
        Store.save();
        feedback.innerHTML = resultFeedback(question, submission, context);
        const next = feedback.querySelector('#nextAfterFeedback');
        if (next) next.onclick = () => context.onNext?.(submission, attempt);
        bindExplanationButtons(feedback);
      }
    });
  }

  function resultFeedback(question, result, context) {
    const layers = question.explanationLayers || { short: '', why: '', full: '' };
    let title = result.correct ? '这一步通了。' : '这一步还没稳。';
    let sub = '';
    if (question.type === 'ranking' && !result.correct) {
      sub = `你已经排对约 ${Math.round((result.partialScore || 0) * 100)}% 的成对关系，不是“整题全错”。`;
    } else if ((question.type === 'route' || question.type === 'synthesis') && result.details) {
      sub = result.details.reachedTarget ? `路线到达目标，综合路线分约 ${Math.round((result.partialScore || 0) * 100)}%。` : '这条路线还没有到达目标，重点看它在哪个分叉失去出口。';
    } else if (question.type === 'electron-arrow' && !result.correct) {
      sub = `当前箭头匹配度约 ${Math.round((result.partialScore || 0) * 100)}%，系统记录的是电子源和去向，不比较你画得漂不漂亮。`;
    } else if (result.correct && result.hintsUsed > 0) {
      sub = '答对了，但用过提示；这次会作为“会做但还需独立验证”的证据。';
    } else if (result.correct && result.confidence === 'guess') {
      sub = '这次猜对了，不会直接算成稳定掌握；后面还会用新结构确认。';
    } else if (!result.correct && result.confidence === 'sure') {
      sub = '这是一次高置信错误，系统会提高后续修复优先级。';
    }
    const repairText = !result.correct && context.mode !== 'review' && context.mode !== 'repair' ? '<div class="status-note">下一步会插入同技能的新结构修复题；不会让你重复背原题答案。</div>' : '';
    return `<div class="feedback"><div class="result-title">${esc(title)}</div>${sub ? `<div class="result-sub">${esc(sub)}</div>` : ''}${repairText}<div class="layered-explanation"><div class="explain-layer open"><b>一句话</b><br>${esc(layers.short || '')}</div><div class="explain-layer why"><b>为什么</b><br>${esc(layers.why || '')}</div><div class="explain-layer full"><b>完整解释 / 机理</b><br>${esc(layers.full || '')}</div><div class="explain-actions"><button class="btn ghost" data-open-layer="why">为什么？</button><button class="btn ghost" data-open-layer="full">看完整解释</button></div></div><div class="btn-row"><button id="nextAfterFeedback" class="btn ${result.correct ? 'primary' : 'soft'}">${context.mode === 'review' ? '下一条复习' : result.correct ? '继续' : '看懂以后继续修复'}</button></div></div>`;
  }

  function bindExplanationButtons(root) {
    root.querySelectorAll('[data-open-layer]').forEach(button => button.addEventListener('click', () => {
      const target = button.dataset.openLayer;
      root.querySelector(`.explain-layer.${target}`)?.classList.add('open');
      button.disabled = true;
    }));
  }

  function queueRepair(day, skillId) {
    const data = REGISTRY[day];
    const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
    const pool = data.repairs?.[skillId] || [];
    const used = Number(progress.repairUsed?.[skillId] || 0);
    if (!pool.length || used >= pool.length) return;
    const candidate = pool[used];
    progress.repairUsed[skillId] = used + 1;
    const insertAt = progress.taskIndex + 1;
    if (!progress.queue.includes(candidate.id)) progress.queue.splice(insertAt, 0, candidate.id);
  }

  function completeDay(day) {
    const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
    progress.finished = true;
    progress.completedAt = Date.now();
    if (!Store.state.completedDays.includes(day)) Store.state.completedDays.push(day);
    Store.state.completedDays.sort((a, b) => a - b);
    if (Store.state.currentDay === day && day < AVAILABLE_MAX_DAY && REGISTRY[day + 1]) Store.state.currentDay = day + 1;
    Store.save();
    dayFinishPage(day);
  }

  function dayFinishPage(day) {
    const data = REGISTRY[day];
    const primarySkills = [...new Set((data.questions || []).map(q => q.primarySkill).filter(Boolean))];
    const rows = primarySkills.slice(0, 8).map(id => {
      const skill = Store.state.skills?.[id];
      const effective = skill ? NS.Learning.getEffectiveMastery(skill) : 0;
      return { id, label: SKILL_META.get(id)?.label || id, effective, band: NS.Learning.masteryBand(skill, effective) };
    });
    const nextAvailable = day < AVAILABLE_MAX_DAY && Boolean(REGISTRY[day + 1]);
    shell(`<section class="panel finish"><div class="big">🌱</div><div class="kicker">DAY ${day} 收口</div><h1>今天这一条主线已经走完</h1><p class="lead">正确不等于永久掌握。系统已经把提示、置信度、首次作答和后续复习时间写进能力模型。</p><div class="skills">${rows.map(row => `<div class="skill-row"><span>${esc(row.label)}<small style="display:block;color:var(--muted);margin-top:3px">${esc(row.band)}</small></span><b>${row.effective}%</b></div>`).join('')}</div><div class="good">今天的错题与遗忘曲线复习已经分开记录。明天到期的内容会进入“今日复习”，不是随机插进主线。</div><div class="btn-row" style="justify-content:center"><button id="home" class="btn primary">回到今日首页</button>${nextAvailable ? `<button id="nextDay" class="btn soft">看看 Day ${day + 1}</button>` : ''}<button id="redo" class="btn ghost">自由复练这一天</button></div></section>`);
    $('#home').onclick = () => { location.hash = '#home'; };
    $('#nextDay')?.addEventListener('click', () => { location.hash = `#day/${day + 1}`; });
    $('#redo').onclick = () => {
      const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
      Object.assign(progress, {
        phase: 'opening', lessonIndex: 0, taskIndex: 0, queue: data.questions.map(q => q.id), answered: {}, repairQueue: [], repairUsed: {}, finished: false, startedAt: Date.now(), completedAt: null
      });
      Store.save();
      location.hash = `#day/${day}`;
      route();
    };
  }

  function reviewPage() {
    const state = Store.state;
    const due = NS.Review.dueCount(state);
    if (!due) {
      shell(`<section class="panel"><div class="kicker">今日复习</div><h1>今天没有到期记忆</h1><div class="empty-state">不需要为了“刷数量”硬塞复习题。继续今天主线就可以。</div><div class="btn-row"><button class="btn primary" id="home">回到今日</button></div></section>`, 'review');
      $('#home').onclick = () => { location.hash = '#home'; };
      return;
    }
    const day = Store.state.currentDay;
    const progress = NS.Learning.ensureDayState(state, day, REGISTRY);
    if (!progress.reviewQueue.length || progress.reviewIndex >= progress.reviewQueue.length) {
      progress.reviewQueue = NS.Learning.buildReviewQueue(state, REGISTRY, SKILLS).map(row => row.questionId);
      progress.reviewIndex = 0;
      Store.save();
    }
    const id = progress.reviewQueue[progress.reviewIndex];
    if (!id) {
      progress.reviewQueue = [];
      progress.reviewIndex = 0;
      Store.save();
      return reviewDonePage();
    }
    const question = QMAP.get(id);
    if (!question) {
      progress.reviewIndex += 1;
      Store.save();
      return reviewPage();
    }
    studyQuestionPage(question, {
      mode: 'review',
      day,
      positionLabel: `今日复习 · ${progress.reviewIndex + 1}/${progress.reviewQueue.length}`,
      onNext() {
        const currentProgress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
        currentProgress.reviewIndex += 1;
        if (currentProgress.reviewIndex >= currentProgress.reviewQueue.length) {
          currentProgress.reviewQueue = [];
          currentProgress.reviewIndex = 0;
          Store.save();
          reviewDonePage();
        } else {
          Store.save();
          reviewPage();
        }
      }
    });
  }

  function reviewDonePage() {
    shell(`<section class="panel finish"><div class="big">🧠</div><div class="kicker">今日复习</div><h1>到期记忆已经捡回来了</h1><p class="lead">复习只处理遗忘曲线到期内容。今天新做错的题仍留在“今日错题”里单独看。</p><div class="btn-row" style="justify-content:center"><button class="btn primary" id="home">回到今日主线</button></div></section>`, 'review');
    $('#home').onclick = () => { location.hash = '#home'; };
  }

  function mistakesPage() {
    const groups = NS.Review.todayMistakeGroups(Store.state, SKILLS);
    shell(`<section class="panel"><div class="kicker">今日错题</div><h1>只看今天真正偏掉的地方</h1><p class="lead">这里不混入遗忘曲线复习。高置信错误会优先显示。</p>${groups.length ? `<div class="mistake-list">${groups.map(group => `<article class="mistake-card ${group.highConfidence ? 'high' : ''}"><b>${esc(group.skillLabel)} · ${group.count} 次${group.highConfidence ? ' · 高置信错误' : ''}</b><p>${esc(NS.Review.errorMessage(group))}</p><p class="tiny">记录题目：${group.questionIds.map(esc).join('、')}</p></article>`).join('')}</div>` : '<div class="empty-state">今天还没有错误记录。猜对的题不会被当作“完全掌握”，但也不会混进错题列表。</div>'}<div class="btn-row"><button class="btn primary" id="home">回到今日</button></div></section>`, 'mistakes');
    $('#home').onclick = () => { location.hash = '#home'; };
  }

  function abilitiesPage() {
    const summary = domainSummary();
    const attempted = SKILLS.map(meta => {
      const skill = Store.state.skills?.[meta.id];
      if (!skill?.attempts) return null;
      const effective = NS.Learning.getEffectiveMastery(skill);
      return { meta, skill, effective, band: NS.Learning.masteryBand(skill, effective) };
    }).filter(Boolean).sort((a, b) => a.effective - b.effective);
    const score = NS.Learning.estimateScore(Store.state, SKILLS);
    shell(`<section class="panel"><div class="kicker">能力地图</div><h1>后台看细，前台只给你有用的结论</h1><p class="lead">同一天连续做对不会把技能刷成“稳定”。跨日无提示正确和迁移题证据才会真正抬高稳定度。</p><div class="score-box"><div><span class="tiny">训练估计</span><strong>${score.low}–${score.high} / 150</strong></div><div><span class="tiny">目标线</span><strong>${score.target} / 150</strong></div></div>${summary.length ? `<div class="section-title"><h2>能力域</h2></div><div class="ability-grid">${summary.map(row => abilityDomainCard(row)).join('')}</div>` : ''}<div class="section-title"><h2>已有学习证据的技能</h2><span class="tiny">弱项排在前面</span></div>${attempted.length ? `<div class="skill-detail-list">${attempted.map(row => `<div class="skill-detail"><span><b>${esc(row.meta.label)}</b></span><b>${row.effective}%</b><small>${esc(row.band)} · 尝试 ${row.skill.attempts} 次 · 首次正确 ${row.skill.firstAttemptCorrect}/${row.skill.firstAttemptAttempts} · 独立正确 ${row.skill.independentCorrect}${row.skill.crossDayVerified ? ' · 已跨日验证' : ' · 待跨日验证'}${row.skill.nextReviewAt ? ` · 下次复习 ${esc(row.skill.nextReviewAt)}` : ''}</small></div>`).join('')}</div>` : '<div class="empty-state">先完成几道题，能力地图才会开始有证据。</div>'}<div class="btn-row"><button class="btn primary" id="home">回到今日</button></div></section>`, 'abilities');
    $('#home').onclick = () => { location.hash = '#home'; };
  }

  function notReadyPage(day) {
    shell(`<section class="panel"><div class="kicker">DAY ${day}</div><h1>这一阶段还没有开放</h1><p class="lead">当前交付只把 Phase 2 能力模型与 Phase 3 核心互动完整接到 Day 1–4。结构侦探与合成迷宫会在下一阶段继续接入，不在这里放占位假功能。</p><div class="btn-row"><button class="btn primary" id="home">回到今日</button></div></section>`);
    $('#home').onclick = () => { location.hash = '#home'; };
  }

  function route() {
    if (!Auth.user) return loginPage('login');
    const hash = location.hash || '#home';
    if (hash === '#home') return homePage();
    if (hash === '#review') return reviewPage();
    if (hash === '#mistakes') return mistakesPage();
    if (hash === '#abilities') return abilitiesPage();
    const dayMatch = hash.match(/^#day\/(\d+)$/);
    if (dayMatch) return dayPage(Number(dayMatch[1]));
    location.hash = '#home';
  }

  async function boot() {
    if (!REGISTRY[1]) {
      $('#app').textContent = 'Day 1 数据没有加载。';
      return;
    }
    const restored = await Auth.restore();
    if (restored) {
      await Cloud.bootstrap(false);
      route();
    } else {
      loginPage('login');
    }
  }

  window.addEventListener('hashchange', () => { if (Auth.user) route(); });
  window.addEventListener('pagehide', () => {
    if (Auth.user) {
      Store.save();
      Cloud.push().catch(() => {});
    }
  });

  boot();
})();
