(() => {
  'use strict';

  const CFG = window.ORGANIC637_CONFIG || {};
  const Data = window.Organic637Data = window.Organic637Data || {};
  Data.days = Data.days || {};
  const NS = window.Organic637 = window.Organic637 || {};
  const APP_KEY = 'organic637_clean_v1_state';
  const AUTH_KEY = 'organic637_clean_v1_auth';
  const BACKUP_SUFFIX = ':backup';
  const AVAILABLE_MAX_DAY = 20;
  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  if (!NS.Learning || !NS.Review || !NS.Interactions || !NS.Detective || !NS.Synthesis) {
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
  const SCAFFOLDS = Data.SCAFFOLDS || { lessons: {}, questions: {} };
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
    state.schemaVersion = 3;
    state.version = 3;
    for (let day = 1; day <= AVAILABLE_MAX_DAY; day += 1) {
      if (!REGISTRY[day]) continue;
      const progress = NS.Learning.ensureDayState(state, day, REGISTRY);
      if (!progress.finished) {
        const canonical = REGISTRY[day].questions.map(q => q.id);
        const existing = Array.isArray(progress.queue) ? progress.queue.filter(id => QMAP.has(id)) : [];
        const seen = new Set(existing);
        canonical.forEach(id => { if (!seen.has(id)) { existing.push(id); seen.add(id); } });
        progress.queue = existing;
      }
    }
    state.attempts = Array.isArray(state.attempts) ? state.attempts.slice(-1200) : [];
    state.completedDays = [...new Set((state.completedDays || []).map(Number))].sort((a, b) => a - b);
    state.detective = NS.Detective.normalizeProgress(state.detective);
    state.synthesis = NS.Synthesis.normalizeProgress(state.synthesis);
    if (Number(state.beginnerDeepVersion || 0) < 1) {
      for (let day = 1; day <= AVAILABLE_MAX_DAY; day += 1) {
        const progress = state.days?.[day];
        if (!progress || progress.finished) continue;
        progress.lessonIndex = 0;
        progress.lessonFrames = {};
        progress.lessonChecks = {};
      }
      state.beginnerDeepVersion = 1;
    }
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
      return NS.V16CloudCodec?.chunks ? NS.V16CloudCodec.chunks(state) : { core: state, skills: state?.skills || {} };
    },
    fromChunks(chunks) {
      const raw = NS.V16CloudCodec?.fromChunks
        ? NS.V16CloudCodec.fromChunks(chunks, () => Store.fresh())
        : (chunks.core?.data && typeof chunks.core.data === 'object' ? { ...chunks.core.data } : Store.fresh());
      return NS.Learning.migrateState(raw, REGISTRY);
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
    $('#app').innerHTML = `<div class="app cozy-app">${inner}</div>`;
  }

  function renderCloud() {
    const dot = $('#cloudDot');
    const text = $('#cloudText');
    if (!dot || !text) return;
    dot.className = 'dot ' + (!Auth.user ? 'offline' : Cloud.status === 'synced' ? 'synced' : Cloud.status === 'syncing' ? 'syncing' : 'offline');
    text.textContent = !Auth.user ? '未登录' : Cloud.status === 'synced' ? `${Auth.user.username} · 已同步` : Cloud.status === 'syncing' ? `${Auth.user.username} · 同步中` : `${Auth.user.username} · 本地保存`;
  }

  const DECOR = {
    random: { src: 'assets/mascots/random-home.jpg', name: '随机位置插图', caption: '放在入口与首页，作为轻松的小陪伴。' },
    boss: { src: 'assets/mascots/boss-exercise.jpg', name: '练习 / Boss 插图', caption: '每一道练习和 Day19–20 Boss 都会出现。' },
    review: { src: 'assets/mascots/review-page.jpg', name: '复习页插图', caption: '复习不是重学一遍，而是把快忘的内容捡回来。' },
    study: { src: 'assets/mascots/study-page.jpg', name: '学习页插图', caption: '学习页陪你一步一步把今天主线走完。' },
    welcome: { src: 'assets/mascots/welcome-page.jpg', name: '欢迎页插图', caption: '欢迎回来，今天也不用一下学很多。' }
  };

  function decorImage(key, extra = '') {
    const item = DECOR[key];
    if (!item) return '';
    return `<div class="decor-image ${extra}"><img src="${item.src}" alt="${esc(item.name)}"></div>`;
  }

  function loginPage(mode = 'login', message = '') {
    $('#app').innerHTML = `<div class="app login-wrap"><section class="panel login-card login-layout"><div class="login-copy"><div class="kicker">南京工业大学 637 · 20天冲刺</div><h1 class="hero">有机实验室</h1><p class="lead"><b>学懂有机，会做真题。</b><br>今天只学一小串。先看懂，再动手；中途退出也会记住你做到哪里。</p><div class="field"><label>名字 / 账号</label><input id="user" autocomplete="username" placeholder="例如：111"></div><div class="field"><label>密码</label><input id="pass" type="password" autocomplete="${mode === 'login' ? 'current-password' : 'new-password'}" placeholder="至少 6 位"></div>${message ? `<div class="error">${esc(message)}</div>` : ''}<div class="btn-row"><button id="submitLogin" class="btn primary">${mode === 'login' ? '登录' : '创建账号'}</button><button id="switchLogin" class="btn soft">${mode === 'login' ? '第一次来？创建账号' : '已经有账号？直接登录'}</button></div><p class="tiny" style="margin-top:18px">进度先保存在本机，再同步到云端。</p></div>${decorImage('random', 'login-decor')}</section></div>`;
    $('#switchLogin').onclick = () => loginPage(mode === 'login' ? 'register' : 'login');
    $('#submitLogin').onclick = async () => {
      const user = $('#user').value.trim().toLowerCase();
      const password = $('#pass').value;
      $('#submitLogin').disabled = true;
      try {
        if (mode === 'login') await Auth.login(user, password);
        else await Auth.register(user, password);
        await Cloud.bootstrap(mode === 'register');
        location.hash = '#welcome';
        route();
      } catch (error) {
        loginPage(mode, error.message || '请求失败');
      }
    };
    $('#pass').addEventListener('keydown', event => { if (event.key === 'Enter') $('#submitLogin').click(); });
  }

  function welcomePage() {
    const day = Store.state.currentDay || 1;
    const name = Auth.user?.username || '';
    const act = journeyAct(day);
    shell(`<section class="welcome-stage"><img class="welcome-stage-bg" src="${DECOR.welcome.src}" alt="${esc(DECOR.welcome.name)}"><div class="welcome-stage-shade"></div><div class="welcome-center-card"><div class="welcome-badge">Day ${day} · ${name ? esc(name) : '今天'}${act ? ` · 第 ${act.id} 段` : ''}</div><h1>20天有机化学大作战！</h1><p class="course-slogan">学懂有机，会做真题。</p><p>${act ? esc(act.title) + '。' : ''} 不急着全会。今天只把眼前这一小串真正看懂，再接到明天。</p><button class="btn welcome-start" id="openPortal">开始今天 ✿</button><button class="welcome-skip" id="jumpHome">先看今日总览</button></div><div class="welcome-doodles"><span>✿</span><span>★</span><span>☁</span><span>♡</span></div></section>`);
    $('#openPortal').onclick = () => { location.hash = '#portal'; };
    $('#jumpHome').onclick = () => { location.hash = '#home'; };
  }

  function portalPage() {
    const day = Store.state.currentDay || 1;
    const due = NS.Review.dueCount(Store.state);
    const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
    const v16Cursor = Number(progress.v16?.cursor) || 0;
    const studyText = v16Cursor || progress.lessonIndex || progress.taskIndex ? '从上次的位置继续' : '从今天第一步开始';
    const act = journeyAct(day);
    shell(`<section class="portal-stage"><div class="portal-head"><span>🌷 Day ${day}${act ? ` · 第 ${act.id} 段` : ''}</span><h1>今天想从哪里开始？</h1><p>${act ? esc(act.title) + '。' : ''} 学累了随时退出，回来会接着原来的位置。</p></div><div class="portal-triangle"><button class="portal-card study" data-go="#day/${day}"><img src="${DECOR.study.src}" alt="${esc(DECOR.study.name)}"><div><b>今日学习</b><small>${studyText}</small></div></button><button class="portal-card review" data-go="#review"><img src="${DECOR.review.src}" alt="${esc(DECOR.review.name)}"><div><b>今日复习</b><small>${due ? `有 ${due} 条到期内容` : '今天暂无到期内容'}</small></div></button><button class="portal-card home" data-go="#home"><img src="${DECOR.random.src}" alt="${esc(DECOR.random.name)}"><div><b>返回首页</b><small>看今天进度、错题和20天地图</small></div></button></div></section>`);
    document.querySelectorAll('[data-go]').forEach(button => button.addEventListener('click', () => { location.hash = button.dataset.go; }));
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

  function journeyMeta(day) {
    return Data.COURSE_JOURNEY?.dayMeta?.[day] || REGISTRY[day]?.journey || null;
  }

  function journeyAct(day) {
    return (Data.COURSE_JOURNEY?.acts || []).find(act => act.days.includes(Number(day))) || null;
  }

  function renderJourneyStrip(day) {
    const meta = journeyMeta(day);
    const act = journeyAct(day);
    if (!meta || !act) return '';
    const prev = REGISTRY[day - 1];
    const next = REGISTRY[day + 1];
    return `<section class="journey-strip"><div class="journey-act"><span>第 ${act.id} 段 · Day ${day}/20</span><b>${esc(act.title)}</b><small>${esc(act.subtitle)}</small></div><div class="journey-flow"><div><span>从哪里来</span><b>${esc(meta.from)}</b>${prev ? `<small>上一天：${esc(prev.title)}</small>` : '<small>从零基础开始</small>'}</div><div class="current"><span>今天长出的能力</span><b>${esc(meta.ability)}</b><small>${esc(meta.today)}</small></div><div><span>接到哪里去</span><b>${esc(meta.to)}</b>${next ? `<small>下一天：${esc(next.title)}</small>` : '<small>进入后续保持与真题训练</small>'}</div></div></section>`;
  }

  function renderLearningContext(day) {
    const meta = journeyMeta(day);
    const act = journeyAct(day);
    if (!meta || !act) return '';
    return `<section class="learning-context"><span>第 ${act.id} 段 · Day ${day}/20 · ${esc(act.title)}</span><b>${esc(meta.ability)}</b><small>${esc(meta.from)} → <strong>今天</strong> → ${esc(meta.to)}</small></section>`;
  }

  function renderTimeRhythm(day) {
    const minutes = Number(NS.V16Director?.getDayPlan?.(day)?.targetMinutes || journeyMeta(day)?.minutes || REGISTRY[day]?.estimatedMinutes || 85);
    let blocks = [
      ['捡回旧知识',10],['看懂新动作',20],['带着做',20],['独立/对比',20],['迁移与收口',Math.max(10, minutes-70)]
    ];
    if (day === 1 && NS.V16Director?.getDayPlan?.(1)) blocks = [['案件开场',5],['结构与电子',12],['第一条反应',12],['案件应用',10],['637与收口',10]];
    else if (day === 1) blocks = [['看懂结构语言',15],['电子与键',20],['第一组反应电影',20],['带练/对比',20],['独立收口',10]];
    if (day === 19 && NS.V16Director?.getDayPlan?.(19)) blocks = [['考试说明',1],['核心审核',57]];
    else if (day === 19) blocks = [['热身读题',5],['Boss 卷',75],['统一检查',10]];
    if (day === 20) blocks = [['Top3诊断',15],['退回一层重建',20],['新结构修复',20],['迁移 Boss',20],['总结',10]];
    return `<section class="time-rhythm"><div class="time-rhythm-head"><b>今天约 ${minutes} 分钟</b><span>不是一直刷题，理解和练习交替进行</span></div><div class="time-rhythm-bar">${blocks.map(([label,min])=>`<div style="--w:${min}"><span>${esc(label)}</span><b>${min}m</b></div>`).join('')}</div></section>`;
  }

  function renderCourseActsMap(state) {
    const acts = Data.COURSE_JOURNEY?.acts || [];
    if (!acts.length) return '';
    return `<div class="course-acts">${acts.map(act => `<section class="course-act ${act.days.includes(state.currentDay) ? 'current' : ''}"><header><span>第 ${act.id} 段</span><div><b>${esc(act.title)}</b><small>${esc(act.subtitle)}</small></div></header><div class="course-act-days">${act.days.map(day => { const meta=(MANIFEST.days||[]).find(x=>x.day===day)||{}; const done=state.completedDays.includes(day); const unlocked=day<=state.currentDay||done; const cls=done?'done':day===state.currentDay?'current':unlocked?'':'locked'; return `<button class="act-day ${cls}" ${unlocked?`data-day="${day}"`:'disabled'}><span>Day ${day}</span><b>${esc(meta.shortTitle || REGISTRY[day]?.title || '')}</b><small>${done?'已完成 · 可重练':day===state.currentDay?'今天':unlocked?'可进入':'按顺序解锁'}</small></button>`; }).join('')}</div></section>`).join('')}</div>`;
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
    const v16Plan = Store.state.v16?.enabled ? NS.V16Director?.getDayPlan?.(day) : null;
    const percent = progress.finished ? 100 : v16Plan
      ? Math.min(96, Math.round((Number(progress.v16?.cursor) || 0) / Math.max(1, v16Plan.sequence.length) * 100))
      : Math.min(96, Math.round((progress.lessonIndex + answeredMain) / Math.max(1, data.lessons.length + baseCount) * 100));
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
      return `<button class="day-tile ${cls}" ${unlocked ? `data-day="${meta.day}"` : 'disabled'}><span class="day-number">DAY ${String(meta.day).padStart(2, '0')}</span><strong>${esc(meta.shortTitle || meta.title)}</strong><small>${done ? '已完成 · 可重练' : meta.day === state.currentDay ? '今天' : available ? '按顺序解锁' : ''}</small></button>`;
    }).join('');
    shell(`<section class="home-simple"><div class="home-main panel"><div class="home-title-row"><div><div class="kicker">DAY ${String(day).padStart(2, '0')} · 今天</div><div class="home-slogan">学懂有机，会做真题</div><h1>${esc(data.title)}</h1><p>${esc(data.subtitle || '')}</p></div>${decorImage('random', 'home-tiny-decor')}</div>${renderJourneyStrip(day)}<div class="progress-line"><i style="width:${percent}%"></i></div><div class="home-progress-note"><span>进度 ${percent}%</span><span>约 ${Number(v16Plan?.targetMinutes || data.estimatedMinutes || 80)} 分钟</span><span>可随时退出继续</span></div>${renderTimeRhythm(day)}<div class="home-simple-actions"><button id="startDay" class="home-primary-action"><b>${(Number(progress.v16?.cursor)||0) || progress.lessonIndex || progress.taskIndex ? '继续今日学习' : '开始今日学习'}</b><small>先理解，再带练，再独立；今天只长出一组明确能力</small></button><button id="openReview" class="home-secondary-action"><b>今日复习 ${due}</b><small>只处理到期记忆</small></button><button id="openMistakes" class="home-secondary-action"><b>错题回看 ${mistakes}</b><small>只看今天真正卡住的地方</small></button><button id="abilities" class="home-secondary-action"><b>能力地图</b><small>${stable} 个技能已稳定 · 估计 ${score.low}–${score.high}/150</small></button><button id="openCaseBoard" class="home-secondary-action"><b>查看案件板</b><small>只看已经解锁的事实、矛盾与路线恢复</small></button></div><div class="home-bottom-links"><button id="backPortal" class="soft-link">← 回到欢迎页</button><button id="logout" class="soft-link">退出账号</button></div></div><div class="section-title home-section-title"><h2>20 天不是 20 个孤岛</h2><span>每四天长出一层能力，前一天负责给后一天搭地基。</span></div>${renderCourseActsMap(state)}${summary.length ? `<div class="section-title home-section-title"><h2>能力概览</h2><button class="tiny-link" id="allAbilities">查看全部 →</button></div><div class="ability-grid">${summary.slice(0, 4).map(row => abilityDomainCard(row)).join('')}</div>` : ''}</section>`,'home');
    $('#startDay').onclick = () => { location.hash = `#day/${day}`; };
    $('#openReview').onclick = () => { location.hash = '#review'; };
    $('#openMistakes').onclick = () => { location.hash = '#mistakes'; };
    $('#abilities').onclick = () => { location.hash = '#abilities'; };
    $('#openCaseBoard').onclick = () => { location.hash = '#case-board'; };
    $('#backPortal').onclick = () => { location.hash = '#welcome'; };
    $('#logout').onclick = async () => { await Cloud.push().catch(() => {}); await Auth.logout(); Store.setScope('guest'); location.hash = ''; loginPage('login'); };
    $('#allAbilities')?.addEventListener('click', () => { location.hash = '#abilities'; });
    document.querySelectorAll('[data-day]').forEach(button => button.addEventListener('click', () => { location.hash = `#day/${button.dataset.day}`; }));
  }


  function caseBoardPage() {
    const model = NS.V16CaseBoard.getModel(Store.state);
    shell(NS.V16CaseBoard.render(model), 'home');
    $('#caseBoardBack').onclick = () => { location.hash = '#home'; };
    document.querySelectorAll('[data-case-target][data-case-mark]').forEach(button => button.addEventListener('click', () => {
      NS.V16CaseBoard.setPersonalMark(Store.state, button.dataset.caseTarget, button.dataset.caseMark || null);
      Store.save();
      caseBoardPage();
    }));
  }

  function abilityDomainCard(row) {
    return `<div class="ability-card"><header><b>${esc(domainNames[row.domain] || row.domain)}</b><strong>${row.average}%</strong></header><div class="meter"><i style="width:${row.average}%"></i></div><small>${row.count} 个已有证据的技能${row.due ? ` · ${row.due} 个到期` : ''}</small></div>`;
  }

  function dayPage(day) {
    const v16 = NS.Learning.ensureV16RootState(Store.state);
    const plan = NS.V16Director?.getDayPlan?.(day);
    if (v16.enabled && plan) {
      const report = NS.V16Director.validateDay(day);
      if (!report.errors.length) return directorDayPage(day);
      console.error(`[V16] Day ${day} Director plan invalid; falling back to legacy flow`, report.errors);
    }
    return legacyDayPage(day);
  }

  function hasLegacyProgress(progress) {
    return Boolean(
      progress.startedAt ||
      Number(progress.lessonIndex) > 0 ||
      Number(progress.taskIndex) > 0 ||
      (progress.phase && progress.phase !== 'opening') ||
      Object.keys(progress.answered || {}).length
    );
  }

  function advanceDirectorStep(day, stepId) {
    const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
    const v16 = NS.Learning.ensureV16DayState(Store.state, day);
    const step = NS.V16Director.getStep(day, v16.cursor);
    if (!step || (stepId && step.id !== stepId)) return false;
    v16.completedSteps[step.id] = Date.now();
    v16.cursor += 1;
    Store.save();
    dayPage(day);
    return true;
  }

  function retreatDirectorStep(day) {
    const v16 = NS.Learning.ensureV16DayState(Store.state, day);
    v16.cursor = Math.max(0, v16.cursor - 1);
    Store.save();
    dayPage(day);
  }

  function directorFallbackCard(day, step, message, { allowContinue = false } = {}) {
    shell(`<section class="panel"><div class="kicker">LAB-20 · V16</div><h1>${esc(message)}</h1><p class="lead">当前位置已经保存。旧版学习路径仍然完整可用，不会因为新导演层尚未接完而丢失学习内容。</p><div class="btn-row"><button class="btn ghost" id="directorLegacy">使用旧版学习路径</button>${allowContinue ? '<button class="btn primary" id="directorContinue">继续</button>' : ''}<button class="link-btn" id="directorExit">暂时退出</button></div></section>`, 'study');
    $('#directorLegacy').onclick = () => legacyDayPage(day);
    $('#directorExit').onclick = () => { location.hash = '#welcome'; };
    if (allowContinue) $('#directorContinue').onclick = () => advanceDirectorStep(day, step.id);
  }

  function directorQuestionGroupPage(day, step, progress, v16) {
    v16.stepState = v16.stepState && typeof v16.stepState === 'object' ? v16.stepState : {};
    const state = v16.stepState[step.id] && typeof v16.stepState[step.id] === 'object' ? v16.stepState[step.id] : { index: 0 };
    v16.stepState[step.id] = state;
    const refs = Array.isArray(step.refs) ? step.refs : [];
    const ref = refs[Math.max(0, Number(state.index) || 0)];
    if (!ref) return advanceDirectorStep(day, step.id);
    const question = QMAP.get(ref);
    if (!question) return directorFallbackCard(day, step, `找不到题目资源：${ref}`);
    return studyQuestionPage(question, {
      mode: step.mode === '637_exit' ? 'exam' : (question.role || 'learn'),
      day,
      positionLabel: step.mode === '637_exit' ? `Day ${day} · 637 正式出口` : `Day ${day} · 导演任务`,
      onPrev: () => {
        if (state.index > 0) { state.index -= 1; Store.save(); dayPage(day); }
        else retreatDirectorStep(day);
      },
      onNext(result) {
        progress.answered[question.id] = { correct: Boolean(result?.correct), partialScore: Number(result?.partialScore ?? 0), at: Date.now() };
        state.index += 1;
        Store.save();
        if (state.index >= refs.length) advanceDirectorStep(day, step.id);
        else dayPage(day);
      },
      onSubmitted(result) {
        progress.answered[question.id] = { correct: result.correct, partialScore: result.partialScore, at: Date.now() };
        Store.save();
      }
    });
  }

  function directorDayPage(day) {
    const data = REGISTRY[day];
    if (!data || day > AVAILABLE_MAX_DAY) return notReadyPage(day);
    if (day > Store.state.currentDay && !Store.state.completedDays.includes(day)) {
      location.hash = '#home';
      return homePage();
    }
    const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
    if (progress.finished) {
      if (day === 19 && Store.state.examResults?.v16Day19Core) return coreExamResultsPage();
      if (day === 19 && Store.state.examResults?.[19]) return examResultsPage();
      if (day === 20) return finalSummaryPage();
      return dayFinishPage(day);
    }
    const v16 = NS.Learning.ensureV16DayState(Store.state, day);
    if (!v16.migratedFromLegacy) {
      v16.cursor = hasLegacyProgress(progress) ? NS.V16Director.findCursorForLegacy(day, progress) : 0;
      v16.migratedFromLegacy = true;
      Store.save();
    }
    if (!progress.startedAt) { progress.startedAt = Date.now(); Store.save(); }

    const step = NS.V16Director.getStep(day, v16.cursor);
    if (!step) return completeDay(day);

    if (step.type === 'comic') {
      if (NS.V16Comic?.renderInto) {
        const plan = NS.V16Director.getDayPlan(day);
        const nextComic = (plan?.sequence || []).slice(v16.cursor + 1).find(item => item.type === 'comic' && item.sceneId);
        return NS.V16Comic.renderInto($('#app'), step.sceneId, {
          state: Store.state,
          day,
          preloadSceneIds: nextComic?.sceneId ? [nextComic.sceneId] : [],
          onComplete: () => advanceDirectorStep(day, step.id)
        });
      }
      return directorFallbackCard(day, step, '案件漫画渲染器正在接入', { allowContinue: true });
    }

    if (step.type === 'lesson') {
      const lesson = (data.lessons || []).find(item => item.id === step.ref);
      if (!lesson) return directorFallbackCard(day, step, `找不到课程资源：${step.ref}`);
      return lessonPage(day, lesson, {
        v16: true,
        requireSupportCompletion: false,
        onPrev: () => retreatDirectorStep(day),
        onNext: () => advanceDirectorStep(day, step.id),
        prevLabel: '← 上一步'
      });
    }

    if (step.type === '3d') {
      if (!NS.Chem3D?.getLesson?.(step.ref)) return directorFallbackCard(day, step, `找不到空间学习资源：${step.ref}`);
      shell(`<section class="panel chem3d-shell"><div id="chem3dRoot"></div></section>`, 'study');
      const root = $('#chem3dRoot');
      NS.Chem3D.mount(root, step.ref, {
        state: Store.state,
        mode: step.mode || 'required',
        onProgress() {
          Store.save(false);
          Cloud.schedule();
        },
        onComplete() {
          Store.save();
          advanceDirectorStep(day, step.id);
        },
        onSkip() {
          if (step.mode === 'on_demand') advanceDirectorStep(day, step.id);
        },
        onExit() {
          Store.save();
          location.hash = '#welcome';
        }
      });
      return;
    }

    if (step.type === 'detective') return directorDetectiveTask(day, step);

    if (step.type === 'synthesis') return directorSynthesisTask(day, step);

    if (step.type === 'exam') return directorCoreExamTask(day, step);
    if (step.type === 'case-report') return directorCaseReportTask(day, step);
    if (step.type === 'adaptive-repair') return directorAdaptiveRepairTask(day, step);
    if (step.type === 'final-boss') return directorFinalBossTask(day, step);

    if (['question', 'interaction', 'case-apply'].includes(step.type)) {
      const question = QMAP.get(step.ref);
      if (!question) return directorFallbackCard(day, step, `找不到题目资源：${step.ref}`);
      return studyQuestionPage(question, {
        mode: step.type === 'case-apply' ? 'transfer' : (step.mode || question.role || 'learn'),
        day,
        positionLabel: step.mode === '637_exit' ? `Day ${day} · 637 正式出口` : `Day ${day} · 导演任务`,
        onPrev: () => retreatDirectorStep(day),
        onNext(result) {
          progress.answered[question.id] = { correct: Boolean(result?.correct), partialScore: Number(result?.partialScore ?? 0), at: Date.now() };
          advanceDirectorStep(day, step.id);
        },
        onSubmitted(result) {
          progress.answered[question.id] = { correct: result.correct, partialScore: result.partialScore, at: Date.now() };
          if (!result.correct && question.role !== 'repair' && day !== 20) queueRepair(day, question.primarySkill);
          Store.save();
        }
      });
    }

    if (step.type === 'question-group') return directorQuestionGroupPage(day, step, progress, v16);

    return directorFallbackCard(day, step, `V16 节点“${step.type}”尚未接入`, { allowContinue: false });
  }

  function legacyDayPage(day) {
    const data = REGISTRY[day];
    if (!data || day > AVAILABLE_MAX_DAY) return notReadyPage(day);
    if (day > Store.state.currentDay && !Store.state.completedDays.includes(day)) {
      location.hash = '#home';
      return homePage();
    }
    const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
    if (progress.finished) {
      if (day === 19 && Store.state.examResults?.[19]) return examResultsPage();
      if (day === 20) return finalSummaryPage();
      return dayFinishPage(day);
    }
    if (!progress.startedAt) progress.startedAt = Date.now();
    if (progress.lessonIndex < data.lessons.length) return lessonPage(day, data.lessons[progress.lessonIndex]);
    progress.phase = 'questions';

    if (day === 20 && !progress.day20Prepared) {
      const plan = NS.Learning.buildDay20Plan(Store.state, data);
      Store.state.day20Plan = plan;
      progress.queue = plan.questionIds.slice();
      progress.taskIndex = 0;
      progress.day20Prepared = true;
      Store.save();
    }

    if (!Array.isArray(progress.queue) || !progress.queue.length) progress.queue = data.questions.map(q => q.id);
    const id = progress.queue[progress.taskIndex];
    if (!id) {
      if (day === 19 && data.mode === 'exam') return completeExamDay();
      return completeDay(day);
    }
    const question = QMAP.get(id);
    if (!question) {
      progress.taskIndex += 1;
      Store.save();
      return dayPage(day);
    }

    if (day === 19 && data.mode === 'exam') return examQuestionPage(question, progress);
    if (question.type === 'detective-case') return embeddedDetectiveTask(question, day);
    if (question.type === 'synthesis-case') return embeddedSynthesisTask(question, day);

    return studyQuestionPage(question, {
      mode: question.role === 'repair' ? 'repair' : question.role === 'boss' ? 'boss' : 'learn',
      day,
      positionLabel: question.role === 'repair' ? '修复题 · 同技能新结构' : question.role === 'boss' ? `Day ${day} · 最终 Boss` : `Day ${day} · 第 ${Math.min(progress.taskIndex + 1, progress.queue.length)} 个判断`,
      onNext(result) {
        const currentProgress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
        currentProgress.answered[question.id] = { correct: Boolean(result?.correct), partialScore: Number(result?.partialScore ?? 0), at: Date.now() };
        currentProgress.taskIndex += 1;
        Store.save();
        dayPage(day);
      },
      onSubmitted(result) {
        const currentProgress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
        currentProgress.answered[question.id] = { correct: result.correct, partialScore: result.partialScore, at: Date.now() };
        if (!result.correct && question.role !== 'repair' && day !== 20) queueRepair(day, question.primarySkill);
        Store.save();
      }
    });
  }

  function directorDetectiveTask(day, step) {
    const cases = Array.isArray(Data.DETECTIVE_CASES) ? Data.DETECTIVE_CASES : [];
    const caseId = step.caseId || step.ref;
    const kase = cases.find(row => row.id === caseId);
    if (!kase) return directorFallbackCard(day, step, `找不到结构侦探案件：${caseId}`);

    const started = performance.now();
    let completed = false;
    shell(`<section class="panel detective-shell"><div class="question-head"><div class="step-label">Day ${day} · LAB-20 结构证据</div><span class="role-chip">持续案件</span></div><div class="embedded-task-intro"><b>${esc(kase.title)}</b><p>${day === 13 ? '今天只做到 DBE 与 IR。NMR 会在明天解锁，不提前剧透。' : '继续昨天同一份 X-17 证据，从 NMR 开始把平面结构收住。'}</p></div><div id="detectiveRoot"></div><div class="footer-actions"><button class="link-btn" id="embeddedExit">← 暂时退出</button><span class="tiny">退出后会保留同一案件的证据选择。</span></div></section>`, 'study');
    $('#embeddedExit').onclick = () => { Store.save(); location.hash = '#welcome'; };
    Store.state.detective = NS.Detective.normalizeProgress(Store.state.detective);

    const recordFullSummary = summary => {
      const elapsed = Math.max(0, Math.round(performance.now() - started));
      summary.skillEvidence.forEach(evidence => {
        const questionId = `${kase.id}:${evidence.questionSuffix}`;
        const previous = Store.state.attempts.filter(row => row.questionId === questionId).length;
        const pseudoQuestion = { id: questionId, day, type: 'detective-step', role: 'transfer', primarySkill: evidence.skillId, skillIds: [evidence.skillId] };
        NS.Learning.recordAttempt(Store.state, pseudoQuestion, {
          mode: 'detective', correct: evidence.correct, firstAttempt: previous === 0, attemptNumber: previous + 1,
          hintsUsed: evidence.hintsUsed || 0, confidence: summary.confidence,
          responseTimeMs: Math.round(elapsed / Math.max(1, summary.skillEvidence.length)), isTransfer: true,
          answerPayload: summary.answers, partialScore: evidence.partialScore, errorType: evidence.errorType
        });
      });
      Store.state.detective.cases[kase.id] = {
        completedAt: Date.now(), score: summary.score, dbeCorrect: summary.dbeCorrect, irCorrect: summary.irCorrect,
        nmrCorrect: summary.nmrCorrect, eliminationScore: summary.eliminationScore, finalCorrect: summary.finalCorrect,
        hintsUsed: summary.hintsUsed, confidence: summary.confidence
      };
      delete Store.state.detective.inProgress[kase.id];
    };

    NS.Detective.mount($('#detectiveRoot'), kase, {
      initialState: Store.state.detective.inProgress?.[kase.id] || null,
      resumeStage: step.resumeStage,
      pauseAfterStage: step.pauseAfterStage,
      backLabel: '证据已确认，继续今日主线',
      onProgress(snapshot) {
        Store.state.detective.inProgress[kase.id] = snapshot;
        Store.save(false);
        Cloud.schedule();
      },
      onPartialComplete(snapshot) {
        Store.state.detective.inProgress[kase.id] = snapshot;
        Store.save();
        advanceDirectorStep(day, step.id);
      },
      onComplete(summary) {
        completed = true;
        recordFullSummary(summary);
        Store.save();
      },
      onBack() {
        if (!completed) return;
        advanceDirectorStep(day, step.id);
      },
      onNext() {}
    });
  }

  function embeddedDetectiveTask(question, day) {
    const cases = Array.isArray(Data.DETECTIVE_CASES) ? Data.DETECTIVE_CASES : [];
    const kase = cases.find(row => row.id === question.caseId);
    if (!kase) {
      const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
      progress.taskIndex += 1;
      Store.save();
      return dayPage(day);
    }
    const started = performance.now();
    let completed = false;
    shell(`<section class="content-with-side"><article class="panel detective-shell"><div class="question-head"><div class="step-label">Day ${day} · 结构证据串讲</div><span class="role-chip">证据链任务</span></div><div class="embedded-task-intro"><b>${esc(question.prompt)}</b><p>这不是一道“三选一”。DBE、IR/NMR、候选排除和最终结构会分别留下能力证据。</p></div><div id="detectiveRoot"></div><div class="footer-actions"><button class="link-btn" id="embeddedExit">← 暂时退出</button><span class="tiny">退出后仍会记住当前位置。</span></div></article><aside class="quiet-side-image"><img src="${DECOR.boss.src}" alt="${esc(DECOR.boss.name)}"><p>证据一条条看，不用一次猜中。</p></aside></section>`, 'study');
    $('#embeddedExit').onclick = () => { location.hash = '#welcome'; };
    Store.state.detective = NS.Detective.normalizeProgress(Store.state.detective);
    NS.Detective.mount($('#detectiveRoot'), kase, {
      nextCaseId: null,
      backLabel: '完成这案，继续今日主线',
      initialState: Store.state.detective.inProgress?.[kase.id] || null,
      onProgress(snapshot) {
        Store.state.detective.inProgress[kase.id] = snapshot;
        Store.save(false);
        Cloud.schedule();
      },
      onComplete(summary) {
        completed = true;
        const elapsed = Math.max(0, Math.round(performance.now() - started));
        summary.skillEvidence.forEach(evidence => {
          const questionId = `${kase.id}:${evidence.questionSuffix}`;
          const previous = Store.state.attempts.filter(row => row.questionId === questionId).length;
          const pseudoQuestion = { id: questionId, day, type: 'detective-step', role: 'transfer', primarySkill: evidence.skillId, skillIds: [evidence.skillId] };
          NS.Learning.recordAttempt(Store.state, pseudoQuestion, {
            mode: 'detective', correct: evidence.correct, firstAttempt: previous === 0, attemptNumber: previous + 1,
            hintsUsed: evidence.hintsUsed || 0, confidence: summary.confidence,
            responseTimeMs: Math.round(elapsed / Math.max(1, summary.skillEvidence.length)), isTransfer: true,
            answerPayload: summary.answers, partialScore: evidence.partialScore, errorType: evidence.errorType
          });
        });
        Store.state.detective.cases[kase.id] = { completedAt: Date.now(), score: summary.score, dbeCorrect: summary.dbeCorrect, irCorrect: summary.irCorrect, nmrCorrect: summary.nmrCorrect, eliminationScore: summary.eliminationScore, finalCorrect: summary.finalCorrect, hintsUsed: summary.hintsUsed, confidence: summary.confidence };
        delete Store.state.detective.inProgress[kase.id];
        const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
        progress.answered[question.id] = { correct: summary.score >= .75, partialScore: summary.score, at: Date.now() };
        Store.save();
      },
      onBack() {
        if (!completed) return;
        const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
        progress.taskIndex += 1;
        Store.save();
        dayPage(day);
      },
      onNext() {}
    });
  }

  function directorSynthesisTask(day, step) {
    const cases = Array.isArray(Data.SYNTHESIS_CASES) ? Data.SYNTHESIS_CASES : [];
    const caseId = step.caseId || step.ref;
    const kase = cases.find(row => row.id === caseId);
    if (!kase) return directorFallbackCard(day, step, `找不到合成路线案件：${caseId}`);

    Store.state.synthesis = NS.Synthesis.normalizeProgress(Store.state.synthesis);
    const savedResult = Store.state.synthesis.cases?.[kase.id];

    if (step.reviewCompleted && savedResult?.completedAt) {
      const route = Array.isArray(savedResult.route) ? savedResult.route : [];
      const equation = NS.Synthesis.routeEquation(kase, route);
      shell(`<section class="panel synthesis-shell"><div class="question-head"><div class="step-label">Day ${day} · LAB-20 路线复审</div><span class="role-chip">同一案件 · 不重复刷迷宫</span></div><div class="embedded-task-intro"><b>${esc(kase.title)}</b><p>昨天已经把隐藏路线恢复出来。今天不要求再走一遍，而是用保护、顺序与兼容性重新审查这条已保存路线。</p></div><div class="panel-inset preferred-route"><h3>你保存的路线</h3><div class="route-equation"><b>${esc(equation || '已完成路线')}</b></div><p>复审重点：每一步除了“能发生”，还要问已有官能团能否撑过下一步；实验失败与后来修改记录也必须分开判断。</p></div><div class="btn-row"><button class="btn primary" id="directorSynthesisReviewContinue">带着这条路线继续审证据</button><button class="btn ghost" id="directorSynthesisReplay">重新走一次路线</button></div><div class="footer-actions"><button class="link-btn" id="directorSynthesisExit">← 暂时退出</button></div></section>`, 'study');
      $('#directorSynthesisReviewContinue').onclick = () => advanceDirectorStep(day, step.id);
      $('#directorSynthesisReplay').onclick = () => {
        delete Store.state.synthesis.inProgress[kase.id];
        Store.save();
        directorSynthesisTask(day, { ...step, reviewCompleted:false });
      };
      $('#directorSynthesisExit').onclick = () => { Store.save(); location.hash = '#welcome'; };
      return;
    }

    const started = performance.now();
    let completed = false;
    shell(`<section class="panel synthesis-shell"><div class="question-head"><div class="step-label">Day ${day} · LAB-20 路线重建</div><span class="role-chip">正向 / 逆向</span></div><div class="embedded-task-intro"><b>${esc(kase.title)}</b><p>先做目标差异与碳数账本，再走路线。一个看似合理的分叉可以先走；如果后续条件不兼容，问题会在真正冲突的那一步暴露。</p></div><div id="synthesisRoot"></div><div class="footer-actions"><button class="link-btn" id="directorSynthesisExit">← 暂时退出</button><span class="tiny">退出后保留路线状态，回来继续同一案件。</span></div></section>`, 'study');
    $('#directorSynthesisExit').onclick = () => { Store.save(); location.hash = '#welcome'; };

    NS.Synthesis.mount($('#synthesisRoot'), kase, {
      nextCaseId: null,
      backLabel: '路线证据已保存，继续今日主线',
      initialState: Store.state.synthesis.inProgress?.[kase.id] || null,
      onProgress(snapshot) {
        Store.state.synthesis.inProgress[kase.id] = snapshot;
        Store.save(false);
        Cloud.schedule();
      },
      onComplete(summary) {
        completed = true;
        const elapsed = Math.max(0, Math.round(performance.now() - started));
        (summary.skillEvidence || []).forEach(evidence => {
          const questionId = `${kase.id}:${evidence.questionSuffix}`;
          const previous = Store.state.attempts.filter(row => row.questionId === questionId).length;
          const pseudoQuestion = { id: questionId, day, type:'synthesis-step', role:'transfer', primarySkill:evidence.skillId, skillIds:[evidence.skillId] };
          NS.Learning.recordAttempt(Store.state, pseudoQuestion, {
            mode:'synthesis', correct:evidence.correct, firstAttempt:previous === 0, attemptNumber:previous + 1,
            hintsUsed:summary.hintsUsed || 0, confidence:summary.confidence,
            responseTimeMs:Math.round(elapsed / Math.max(1, summary.skillEvidence.length)), isTransfer:true,
            answerPayload:{ mode:summary.mode, route:summary.route }, partialScore:evidence.partialScore, errorType:evidence.errorType
          });
        });
        Store.state.synthesis.cases[kase.id] = {
          completedAt:Date.now(), score:summary.score, mode:summary.mode,
          differenceCorrect:summary.differenceCorrect, carbonCorrect:summary.carbonCorrect,
          route:summary.route, routeScore:summary.routeResult?.score || 0,
          hintsUsed:summary.hintsUsed, confidence:summary.confidence
        };
        delete Store.state.synthesis.inProgress[kase.id];
        Store.save();
      },
      onBack() {
        if (!completed) return;
        advanceDirectorStep(day, step.id);
      },
      onNext() {}
    });
  }

  function embeddedSynthesisTask(question, day) {
    const cases = Array.isArray(Data.SYNTHESIS_CASES) ? Data.SYNTHESIS_CASES : [];
    const kase = cases.find(row => row.id === question.caseId);
    if (!kase) {
      const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
      progress.taskIndex += 1;
      Store.save();
      return dayPage(day);
    }
    const started = performance.now();
    let completed = false;
    shell(`<section class="content-with-side"><article class="panel synthesis-shell"><div class="question-head"><div class="step-label">Day ${day} · 路线综合训练</div><span class="role-chip">正向 / 逆向</span></div><div class="embedded-task-intro"><b>${esc(question.prompt)}</b><p>先做目标差异与碳数账本，再走路线。非标准但可行的路线不会被简单判错。</p></div><div id="synthesisRoot"></div><div class="footer-actions"><button class="link-btn" id="embeddedExit">← 暂时退出</button><span class="tiny">退出后仍会记住当前位置。</span></div></article><aside class="quiet-side-image"><img src="${DECOR.boss.src}" alt="${esc(DECOR.boss.name)}"><p>先找起点和终点差了什么，再决定走哪条路。</p></aside></section>`, 'study');
    $('#embeddedExit').onclick = () => { location.hash = '#welcome'; };
    Store.state.synthesis = NS.Synthesis.normalizeProgress(Store.state.synthesis);
    NS.Synthesis.mount($('#synthesisRoot'), kase, {
      nextCaseId: null,
      backLabel: '完成这组路线训练，继续今日主线',
      initialState: Store.state.synthesis.inProgress?.[kase.id] || null,
      onProgress(snapshot) {
        Store.state.synthesis.inProgress[kase.id] = snapshot;
        Store.save(false);
        Cloud.schedule();
      },
      onComplete(summary) {
        completed = true;
        const elapsed = Math.max(0, Math.round(performance.now() - started));
        summary.skillEvidence.forEach(evidence => {
          const questionId = `${kase.id}:${evidence.questionSuffix}`;
          const previous = Store.state.attempts.filter(row => row.questionId === questionId).length;
          const pseudoQuestion = { id: questionId, day, type: 'synthesis-step', role: 'transfer', primarySkill: evidence.skillId, skillIds: [evidence.skillId] };
          NS.Learning.recordAttempt(Store.state, pseudoQuestion, {
            mode: 'synthesis', correct: evidence.correct, firstAttempt: previous === 0, attemptNumber: previous + 1,
            hintsUsed: summary.hintsUsed || 0, confidence: summary.confidence,
            responseTimeMs: Math.round(elapsed / Math.max(1, summary.skillEvidence.length)), isTransfer: true,
            answerPayload: { mode: summary.mode, route: summary.route }, partialScore: evidence.partialScore, errorType: evidence.errorType
          });
        });
        Store.state.synthesis.cases[kase.id] = { completedAt: Date.now(), score: summary.score, mode: summary.mode, differenceCorrect: summary.differenceCorrect, carbonCorrect: summary.carbonCorrect, route: summary.route, routeScore: summary.routeResult.score, hintsUsed: summary.hintsUsed, confidence: summary.confidence };
        delete Store.state.synthesis.inProgress[kase.id];
        const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
        progress.answered[question.id] = { correct: summary.score >= .75, partialScore: summary.score, at: Date.now() };
        Store.save();
      },
      onBack() {
        if (!completed) return;
        const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
        progress.taskIndex += 1;
        Store.save();
        dayPage(day);
      },
      onNext() {}
    });
  }

  function directorCaseReportTask(day, step) {
    const report = NS.V16_STORY?.finalReport;
    if (Number(day) !== 20 || !report) return directorFallbackCard(day, step, '最终案件报告配置没有正确加载');
    const v16 = NS.Learning.ensureV16DayState(Store.state, day);
    v16.stepState = v16.stepState && typeof v16.stepState === 'object' ? v16.stepState : {};
    const state = v16.stepState[step.id] && typeof v16.stepState[step.id] === 'object' ? v16.stepState[step.id] : { answers:{} };
    state.answers = state.answers && typeof state.answers === 'object' ? state.answers : {};
    v16.stepState[step.id] = state;
    const categories = Array.isArray(report.categories) ? report.categories : [];
    const actors = Object.entries(report.actors || {});
    shell(`<section class="panel final-case-report"><div class="kicker">CASE 20 · 最终案件报告</div><h1>把错误按证据强度分开</h1><p class="lead">事故、程序违规和记录篡改不是同一件事。先给每个人的行为定性，再看证据能支持到哪一步。</p><div class="case-report-grid">${actors.map(([actorId, actor]) => `<article class="case-report-card"><b>${esc(actor.name)}</b><p>${esc(actor.detail)}</p><label>你的定性<select data-report-actor="${esc(actorId)}"><option value="">请选择</option>${categories.map(category => `<option value="${esc(category.id)}" ${state.answers[actorId] === category.id ? 'selected' : ''}>${esc(category.label)}</option>`).join('')}</select></label></article>`).join('')}</div><div id="caseReportFeedback" class="note">结论必须覆盖三个人，且不能把“结果严重”直接等同于“记录造假”。</div><div class="btn-row"><button id="submitCaseReport" class="btn primary">提交最终报告</button><button id="caseReportExit" class="link-btn">暂时退出</button></div></section>`, 'study');
    document.querySelectorAll('[data-report-actor]').forEach(select => select.addEventListener('change', () => {
      state.answers[select.dataset.reportActor] = select.value;
      Store.save(false);
    }));
    $('#caseReportExit').onclick = () => { Store.save(); location.hash = '#welcome'; };
    $('#submitCaseReport').onclick = () => {
      const missing = actors.filter(([actorId]) => !state.answers[actorId]);
      const wrong = actors.filter(([actorId, actor]) => state.answers[actorId] && state.answers[actorId] !== actor.correct);
      const feedback = $('#caseReportFeedback');
      if (missing.length) {
        feedback.className = 'error';
        feedback.textContent = `还没有完成：${missing.map(([,actor]) => actor.name).join('、')}。`;
        return;
      }
      if (wrong.length) {
        feedback.className = 'error';
        feedback.textContent = `还有 ${wrong.length} 处定性没有和证据强度对齐。再区分“操作事故 / 越程序保存证据 / 主动删除真实记录”。`;
        return;
      }
      NS.Learning.ensureV16RootState(Store.state).story.finalReport = { answers:{...state.answers}, completedAt:Date.now() };
      Store.save();
      advanceDirectorStep(day, step.id);
    };
  }

  function day20PoolForSkill(data, skillId) {
    const pools = data?.adaptivePools || {};
    if (Array.isArray(pools[skillId]) && pools[skillId].length) return pools[skillId];
    const family = String(skillId || '').split('.')[0];
    return Object.entries(pools).find(([key, rows]) => key.split('.')[0] === family && Array.isArray(rows) && rows.length)?.[1] || [];
  }

  function ensureDay20AdaptiveRuntime() {
    const data = REGISTRY[20];
    const v16 = NS.Learning.ensureV16DayState(Store.state, 20);
    v16.adaptiveRuntime = v16.adaptiveRuntime && typeof v16.adaptiveRuntime === 'object' ? v16.adaptiveRuntime : null;
    if (v16.adaptiveRuntime?.groups?.length) return v16.adaptiveRuntime;
    const plan = Store.state.day20Plan && Array.isArray(Store.state.day20Plan.skills)
      ? Store.state.day20Plan
      : NS.Learning.buildDay20Plan(Store.state, data);
    Store.state.day20Plan = plan;
    const groups = (plan.skills || []).map(skillId => {
      const pool = day20PoolForSkill(data, skillId);
      const repairIds = pool.slice(0, Math.min(2, pool.length)).map(question => question.id);
      const bossId = pool.length >= 3 ? pool[2].id : (pool.at(-1)?.id || null);
      return { skillId, repairIds, bossId };
    }).filter(group => group.repairIds.length || group.bossId);
    v16.adaptiveRuntime = { groups, createdAt:Date.now() };
    Store.save(false);
    return v16.adaptiveRuntime;
  }

  function renderDay20RepairPresentation(day, step, state, group) {
    const skillId = group.skillId;
    const presentation = NS.V16RepairPresentation?.getRepairPresentation(skillId) || 'standard';
    const skillLabel = SKILL_META.get(skillId)?.label || skillId;
    const descriptions = {
      electron:'先只盯电子从哪里来、到哪里去，再回题目。不要背整段机理。',
      'decision-map':'先把底物、试剂强弱、溶剂/温度放回决策图，再选路径。',
      'evidence-board':'把每一条谱图/检验证据当成一把锁：它能排除谁，而不是“像不像答案”。',
      'route-board':'先做碳数账本和最后一步，再看路线兼容性。',
      standard:'先回到这个技能最短的判断依据，再用新结构验证。'
    };
    if (presentation === '3d') {
      const ref = NS.V16RepairPresentation?.get3DRef(skillId);
      if (ref && NS.Chem3D?.getLesson?.(ref)) {
        shell(`<section class="panel chem3d-shell"><div class="kicker">DAY 20 · Top3 修复</div><h1>${esc(skillLabel)}</h1><p class="lead">这一处卡点来自空间关系，先拿起来看，再做新结构。</p><div id="chem3dRoot"></div><div class="footer-actions"><button class="link-btn" id="repair3dExit">暂时退出</button></div></section>`, 'study');
        $('#repair3dExit').onclick = () => { Store.save(); location.hash = '#welcome'; };
        return NS.Chem3D.mount($('#chem3dRoot'), ref, {
          state:Store.state, mode:'required',
          onProgress(){ Store.save(false); },
          onComplete(){ state.introDone[skillId] = true; Store.save(); dayPage(day); },
          onSkip(){ state.introDone[skillId] = true; Store.save(); dayPage(day); },
          onExit(){ Store.save(); location.hash = '#welcome'; }
        });
      }
    }
    shell(`<section class="panel"><div class="kicker">DAY 20 · Top3 修复</div><h1>${esc(skillLabel)}</h1><p class="lead">${esc(descriptions[presentation] || descriptions.standard)}</p><div class="repair-presentation-tag">修复工具：${esc(presentation)}</div><div class="btn-row"><button id="startRepairSkill" class="btn primary">用新结构验证</button><button id="repairExit" class="link-btn">暂时退出</button></div></section>`, 'study');
    $('#repairExit').onclick = () => { Store.save(); location.hash = '#welcome'; };
    $('#startRepairSkill').onclick = () => { state.introDone[skillId] = true; Store.save(); dayPage(day); };
  }

  function directorAdaptiveRepairTask(day, step) {
    const runtime = ensureDay20AdaptiveRuntime();
    const v16 = NS.Learning.ensureV16DayState(Store.state, day);
    v16.stepState = v16.stepState && typeof v16.stepState === 'object' ? v16.stepState : {};
    const state = v16.stepState[step.id] && typeof v16.stepState[step.id] === 'object'
      ? v16.stepState[step.id]
      : { groupIndex:0, questionIndex:0, introDone:{} };
    state.introDone = state.introDone && typeof state.introDone === 'object' ? state.introDone : {};
    v16.stepState[step.id] = state;
    const group = runtime.groups[Math.max(0, Number(state.groupIndex) || 0)];
    if (!group) return advanceDirectorStep(day, step.id);
    if (!state.introDone[group.skillId]) return renderDay20RepairPresentation(day, step, state, group);
    const questionId = group.repairIds[Math.max(0, Number(state.questionIndex) || 0)];
    if (!questionId) {
      state.groupIndex += 1;
      state.questionIndex = 0;
      Store.save();
      return dayPage(day);
    }
    const question = QMAP.get(questionId);
    if (!question) {
      state.questionIndex += 1;
      Store.save();
      return dayPage(day);
    }
    const presentation = NS.V16RepairPresentation?.getRepairPresentation(group.skillId) || 'standard';
    return studyQuestionPage(question, {
      mode:'repair', day:20, isTransfer:false,
      positionLabel:`Top3 修复 · ${SKILL_META.get(group.skillId)?.label || group.skillId} · ${presentation}`,
      onPrev:() => { state.introDone[group.skillId] = false; Store.save(); dayPage(day); },
      onNext(){ state.questionIndex += 1; Store.save(); dayPage(day); },
      onSubmitted(){ Store.save(); }
    });
  }

  function directorFinalBossTask(day, step) {
    const runtime = ensureDay20AdaptiveRuntime();
    const v16 = NS.Learning.ensureV16DayState(Store.state, day);
    v16.stepState = v16.stepState && typeof v16.stepState === 'object' ? v16.stepState : {};
    const state = v16.stepState[step.id] && typeof v16.stepState[step.id] === 'object' ? v16.stepState[step.id] : { index:0 };
    v16.stepState[step.id] = state;
    const bossIds = runtime.groups.map(group => group.bossId).filter(Boolean);
    const questionId = bossIds[Math.max(0, Number(state.index) || 0)];
    if (!questionId) return advanceDirectorStep(day, step.id);
    const question = QMAP.get(questionId);
    if (!question) { state.index += 1; Store.save(); return dayPage(day); }
    return studyQuestionPage(question, {
      mode:'boss', day:20, isTransfer:true,
      positionLabel:`修复后独立验证 · ${Number(state.index) + 1}/${bossIds.length}`,
      onPrev:() => { state.index = Math.max(0, Number(state.index) - 1); Store.save(); dayPage(day); },
      onNext(){ state.index += 1; Store.save(); if (state.index >= bossIds.length) advanceDirectorStep(day, step.id); else dayPage(day); },
      onSubmitted(){ Store.save(); }
    });
  }

  function directorCoreExamTask(day, step) {
    const config = NS.V16_EXAM?.day19Core;
    if (!config || step.ref !== config.id) return directorFallbackCard(day, step, `找不到核心审核配置：${step.ref}`);
    const v16 = NS.Learning.ensureV16DayState(Store.state, day);
    v16.stepState = v16.stepState && typeof v16.stepState === 'object' ? v16.stepState : {};
    const draft = v16.stepState[step.id] && typeof v16.stepState[step.id] === 'object'
      ? v16.stepState[step.id]
      : { index:0, responses:[], startedAt:Date.now() };
    v16.stepState[step.id] = draft;
    const ids = config.itemIds || [];
    const questionId = ids[Math.max(0, Number(draft.index) || 0)];
    if (!questionId) return completeCoreExam(day, step, draft);
    const question = QMAP.get(questionId);
    if (!question) return directorFallbackCard(day, step, `核心审核找不到题目：${questionId}`);

    const started = performance.now();
    shell(`<section class="panel question-shell exam-shell"><div class="question-head"><div class="step-label">DAY 19 · 综合能力审核 · ${Number(draft.index) + 1}/${ids.length}</div><span class="role-chip">封闭卷宗</span></div><div class="exam-warning">正式审核模式：无提示、无即时解析、无漫画、无3D。整组完成后统一看能力域结果。</div><div id="interactionRoot"></div><div class="footer-actions"><button class="link-btn" id="coreExamExit">← 暂存退出</button><span class="tiny">答案提交后锁定；置信度只作为诊断证据，不影响得分。</span></div></section>`, 'study');
    $('#coreExamExit').onclick = () => { Store.save(); location.hash = '#welcome'; };
    const previous = Store.state.attempts.filter(row => row.questionId === question.id && row.mode === 'v16-core-exam').length;
    NS.Interactions.mount($('#interactionRoot'), question, {
      examMode:true,
      onSubmit(submission, feedback) {
        const responseTimeMs = Math.max(0, Math.round(performance.now() - started));
        NS.Learning.recordAttempt(Store.state, question, {
          day:19, mode:'v16-core-exam', correct:submission.correct, firstAttempt:previous === 0, attemptNumber:previous + 1,
          hintsUsed:0, confidence:submission.confidence, responseTimeMs, isTransfer:true,
          answerPayload:submission.payload, partialScore:submission.partialScore, errorType:submission.errorType, reasoningState:submission.reasoningState
        });
        if (!draft.responses.some(row => row.questionId === question.id)) {
          draft.responses.push({
            questionId:question.id, correct:submission.correct, partialScore:Number(submission.partialScore || 0),
            confidence:submission.confidence, points:Number(question.points || 0), responseTimeMs
          });
        }
        draft.index += 1;
        Store.save();
        feedback.insertAdjacentHTML('beforeend', `<div class="btn-row"><button id="nextCoreExam" class="btn primary">${draft.index >= ids.length ? '提交核心审核' : '下一题'}</button></div>`);
        feedback.querySelector('#nextCoreExam').onclick = () => {
          if (draft.index >= ids.length) completeCoreExam(day, step, draft);
          else dayPage(day);
        };
      }
    });
  }

  function completeCoreExam(day, step, draft) {
    const config = NS.V16_EXAM?.day19Core;
    if (!config) return directorFallbackCard(day, step, '核心审核配置缺失');
    const rows = Array.isArray(draft.responses) ? draft.responses : [];
    const itemMeta = new Map((config.items || []).map(item => [item.id, item]));
    const rawTotal = rows.reduce((sum, row) => sum + Number(row.points || QMAP.get(row.questionId)?.points || 0), 0);
    const rawEarned = rows.reduce((sum, row) => sum + Number(row.points || QMAP.get(row.questionId)?.points || 0) * Number(row.partialScore || 0), 0);
    const domains = {};
    rows.forEach(row => {
      const pts = Number(row.points || QMAP.get(row.questionId)?.points || 0);
      const earned = pts * Number(row.partialScore || 0);
      const coverage = itemMeta.get(row.questionId)?.coverage || [];
      coverage.forEach(domain => {
        const bucket = domains[domain] ||= { earned:0, total:0 };
        bucket.earned += earned;
        bucket.total += pts;
      });
    });
    const percent = rawTotal ? Math.round(rawEarned / rawTotal * 100) : 0;
    const highConfidenceWrong = rows.filter(row => !row.correct && row.confidence === 'sure').map(row => row.questionId);
    const topWeakSkills = NS.Learning.topWeakSkills(Store.state, NS.Learning.dateISO(), 3).map(row => row.id);
    Store.state.examResults.v16Day19Core = {
      mode:'core', completedAt:Date.now(), percent, rawEarned, rawTotal, domains,
      highConfidenceWrong, topWeakSkills, responseCount:rows.length
    };
    Store.save();
    advanceDirectorStep(day, step.id);
  }

  function coreExamResultsPage() {
    const result = Store.state.examResults?.v16Day19Core;
    if (!result) return homePage();
    const order = NS.V16_EXAM?.day19Core?.requiredDomains || Object.keys(result.domains || {});
    const domainRows = order.map(domain => {
      const row = result.domains?.[domain] || { earned:0, total:0 };
      return { domain, percent:row.total ? Math.round(row.earned / row.total * 100) : 0 };
    });
    const weak = (result.topWeakSkills || []).map(id => SKILL_META.get(id)?.label || id);
    shell(`<section class="panel finish exam-result-page"><div class="kicker">DAY 19 · 综合能力审核</div><h1>${Number(result.percent || 0)}%</h1><p class="lead">这是20天主线的核心诊断，不伪装成150分正式卷。它只负责找出 Day20 最该修的能力。</p><div class="ability-grid">${domainRows.map(row => `<div class="ability-card"><header><b>${esc(domainNames[row.domain] || row.domain)}</b><strong>${row.percent}%</strong></header><div class="meter"><i style="width:${row.percent}%"></i></div></div>`).join('')}</div><div class="section-title"><h2>Day20 优先修的三处</h2></div><div class="skills">${weak.map((label,index) => `<div class="skill-row"><span>${index + 1}. ${esc(label)}</span><b>优先</b></div>`).join('')}</div>${result.highConfidenceWrong?.length ? `<div class="error">高置信错误 ${result.highConfidenceWrong.length} 题：Day20 会提高对应修复优先级。</div>` : '<div class="good">没有高置信错误；Top3仍按真实 mastery 与迁移证据生成。</div>'}<div class="note">如果你现在想做完整150分模拟，可以单独进入“考前正式模拟”。它不会覆盖这次核心审核结果。</div><div class="btn-row" style="justify-content:center"><button class="btn primary" id="go20">进入 Day 20 修复</button><button class="btn soft" id="openFull150">考前正式模拟 · 150分</button><button class="btn ghost" id="home">回首页</button></div></section>`, 'study');
    $('#go20').onclick = () => { location.hash = '#day/20'; };
    $('#openFull150').onclick = () => { location.hash = '#full-exam/19'; };
    $('#home').onclick = () => { location.hash = '#home'; };
  }

  function full150ExamPage() {
    const config = NS.V16_EXAM?.full150;
    if (!config) return homePage();
    if (Store.state.examResults?.full150 && !Store.state.examResults?.full150Draft) return full150ResultsPage();
    const draft = Store.state.examResults.full150Draft ||= { index:0, responses:[], startedAt:Date.now() };
    const questionId = config.itemIds[Math.max(0, Number(draft.index) || 0)];
    if (!questionId) return completeFull150Exam(draft);
    const question = QMAP.get(questionId);
    if (!question) { draft.index += 1; Store.save(); return full150ExamPage(); }
    const started = performance.now();
    shell(`<section class="panel question-shell exam-shell"><div class="question-head"><div class="step-label">考前正式模拟 · ${Number(draft.index) + 1}/${config.itemIds.length}</div><span class="role-chip">${Number(question.points || 0)} 分</span></div><div class="exam-warning">完整150分模拟：无提示、提交锁定、整卷结束统一看分。它独立于20天主线。</div><div id="interactionRoot"></div><div class="footer-actions"><button class="link-btn" id="fullExamExit">← 暂存退出</button><span class="tiny">退出后保留整卷位置，不改变 Day19 核心审核。</span></div></section>`, 'study');
    $('#fullExamExit').onclick = () => { Store.save(); location.hash = '#home'; };
    const previous = Store.state.attempts.filter(row => row.questionId === question.id && row.mode === 'full150-exam').length;
    NS.Interactions.mount($('#interactionRoot'), question, {
      examMode:true,
      onSubmit(submission, feedback) {
        const responseTimeMs = Math.max(0, Math.round(performance.now() - started));
        NS.Learning.recordAttempt(Store.state, question, {
          day:19, mode:'full150-exam', correct:submission.correct, firstAttempt:previous === 0, attemptNumber:previous + 1,
          hintsUsed:0, confidence:submission.confidence, responseTimeMs, isTransfer:true,
          answerPayload:submission.payload, partialScore:submission.partialScore, errorType:submission.errorType, reasoningState:submission.reasoningState
        });
        if (!draft.responses.some(row => row.questionId === question.id)) {
          draft.responses.push({ questionId:question.id, partialScore:Number(submission.partialScore || 0), confidence:submission.confidence, points:Number(question.points || 0), correct:submission.correct, responseTimeMs });
        }
        draft.index += 1;
        Store.save();
        feedback.insertAdjacentHTML('beforeend', `<div class="btn-row"><button id="nextFullExam" class="btn primary">${draft.index >= config.itemIds.length ? '交卷' : '下一题'}</button></div>`);
        feedback.querySelector('#nextFullExam').onclick = () => full150ExamPage();
      }
    });
  }

  function completeFull150Exam(draft) {
    const config = NS.V16_EXAM?.full150;
    const responses = Array.isArray(draft.responses) ? draft.responses : [];
    const total = Number(config?.points || 150) || 150;
    const earned = responses.reduce((sum,row) => sum + Number(row.points || 0) * Number(row.partialScore || 0), 0);
    Store.state.examResults.full150 = {
      completedAt:Date.now(), score150:Math.round(earned / total * 150), rawEarned:earned, rawTotal:total,
      responseCount:responses.length
    };
    delete Store.state.examResults.full150Draft;
    Store.save();
    full150ResultsPage();
  }

  function full150ResultsPage() {
    const result = Store.state.examResults?.full150;
    if (!result) return full150ExamPage();
    shell(`<section class="panel finish exam-result-page"><div class="kicker">考前正式模拟 · 完整150分卷</div><h1>${Number(result.score150 || 0)} / 150</h1><p class="lead">这是原 Day19 的完整24题正式训练卷，150分语义保持不变；它与20天主线的核心审核分开记录。</p><div class="btn-row" style="justify-content:center"><button class="btn primary" id="fullExamHome">回首页</button><button class="btn ghost" id="fullExamRestart">重新做整卷</button></div></section>`, 'study');
    $('#fullExamHome').onclick = () => { location.hash = '#home'; };
    $('#fullExamRestart').onclick = () => {
      delete Store.state.examResults.full150;
      delete Store.state.examResults.full150Draft;
      Store.save();
      full150ExamPage();
    };
  }

  function examQuestionPage(question, progress) {
    const data = REGISTRY[19];
    const position = Math.min(progress.taskIndex + 1, progress.queue.length);
    const started = performance.now();
    progress.examDraft = progress.examDraft || { responses: [], startedAt: Date.now() };
    shell(`<section class="content-with-side"><article class="panel question-shell exam-shell"><div class="question-head"><div class="step-label">Boss 卷 · ${position}/${progress.queue.length}</div><span class="role-chip">${Number(question.points || 0)} 分</span></div><div class="exam-warning">考试模式：无提示、提交即锁定、整卷结束统一看解析。</div><div id="interactionRoot"></div><div class="footer-actions"><button class="link-btn" id="home">← 暂存退出</button><span class="tiny">置信度会记录，但不影响卷面分。</span></div></article><aside class="quiet-side-image"><img src="${DECOR.boss.src}" alt="${esc(DECOR.boss.name)}"><p>Boss 卷先自己做完，再统一看解析。</p></aside></section>`, 'study');
    $('#home').onclick = () => { location.hash = '#welcome'; };
    const previous = Store.state.attempts.filter(row => row.questionId === question.id && row.mode === 'exam').length;
    NS.Interactions.mount($('#interactionRoot'), question, {
      examMode: true,
      onSubmit(submission, feedback) {
        const responseTimeMs = Math.max(0, Math.round(performance.now() - started));
        NS.Learning.recordAttempt(Store.state, question, {
          day: 19, mode: 'exam', correct: submission.correct, firstAttempt: previous === 0, attemptNumber: previous + 1,
          hintsUsed: 0, confidence: submission.confidence, responseTimeMs, isTransfer: true,
          answerPayload: submission.payload, partialScore: submission.partialScore, errorType: submission.errorType, reasoningState: submission.reasoningState
        });
        const current = NS.Learning.ensureDayState(Store.state, 19, REGISTRY);
        current.examDraft = current.examDraft || { responses: [], startedAt: Date.now() };
        if (!current.examDraft.responses.some(row => row.questionId === question.id)) {
          current.examDraft.responses.push({ questionId: question.id, correct: submission.correct, partialScore: Number(submission.partialScore || 0), confidence: submission.confidence, points: Number(question.points || 0), primarySkill: question.primarySkill, responseTimeMs });
        }
        current.answered[question.id] = { correct: submission.correct, partialScore: submission.partialScore, at: Date.now() };
        current.taskIndex += 1;
        Store.save();
        feedback.insertAdjacentHTML('beforeend', `<div class="btn-row"><button id="nextExam" class="btn primary">${current.taskIndex >= data.questions.length ? '交卷并看结果' : '下一题'}</button></div>`);
        feedback.querySelector('#nextExam').onclick = () => dayPage(19);
      }
    });
  }

  function completeExamDay() {
    const data = REGISTRY[19];
    const progress = NS.Learning.ensureDayState(Store.state, 19, REGISTRY);
    const responses = progress.examDraft?.responses || [];
    const total = data.questions.reduce((sum, q) => sum + Number(q.points || 0), 0) || 150;
    const earned = responses.reduce((sum, row) => sum + Number(row.points || 0) * Number(row.partialScore || 0), 0);
    const scaled = Math.round(earned / total * 150);
    const domains = {};
    responses.forEach(row => {
      const meta = SKILL_META.get(row.primarySkill);
      const domain = meta?.domain || 'exam';
      const q = QMAP.get(row.questionId);
      const pts = Number(q?.points || row.points || 0);
      const bucket = domains[domain] ||= { earned: 0, total: 0 };
      bucket.earned += pts * Number(row.partialScore || 0);
      bucket.total += pts;
    });
    const highConfidenceWrong = responses.filter(row => !row.correct && row.confidence === 'sure').map(row => row.questionId);
    const weak = NS.Learning.topWeakSkills(Store.state, NS.Learning.dateISO(), 3).map(row => row.id);
    Store.state.examResults[19] = { completedAt: Date.now(), rawEarned: earned, rawTotal: total, score150: scaled, domains, highConfidenceWrong, topWeakSkills: weak, responseCount: responses.length };
    progress.finished = true;
    progress.completedAt = Date.now();
    if (!Store.state.completedDays.includes(19)) Store.state.completedDays.push(19);
    Store.state.completedDays.sort((a, b) => a - b);
    Store.state.currentDay = 20;
    Store.save();
    examResultsPage();
  }

  function examResultsPage() {
    const result = Store.state.examResults?.[19];
    if (!result) return homePage();
    const domainRows = Object.entries(result.domains || {}).map(([domain, row]) => ({ domain, percent: row.total ? Math.round(row.earned / row.total * 100) : 0 }));
    const weak = (result.topWeakSkills || []).map(id => SKILL_META.get(id)?.label || id);
    shell(`<section class="panel finish exam-result-page"><div class="big">🧪</div><div class="kicker">DAY 19 · Boss 卷结果</div><h1>${result.score150} / 150</h1><p class="lead">这是一套网站内部混合未见卷，不冒充某一年完整真题。它的作用是给 Day20 暴露真实漏洞。</p><div class="ability-grid">${domainRows.map(row => `<div class="ability-card"><header><b>${esc(domainNames[row.domain] || row.domain)}</b><strong>${row.percent}%</strong></header><div class="meter"><i style="width:${row.percent}%"></i></div></div>`).join('')}</div><div class="section-title"><h2>Day20 优先修的三处</h2></div><div class="skills">${weak.map((label, i) => `<div class="skill-row"><span>${i + 1}. ${esc(label)}</span><b>优先</b></div>`).join('')}</div>${result.highConfidenceWrong?.length ? `<div class="error">高置信错误 ${result.highConfidenceWrong.length} 题：这些会被 Day20 提高修复权重。</div>` : '<div class="good">这次没有高置信错误；仍会按低 mastery 和迁移证据选择 Top3。</div>'}<div class="btn-row" style="justify-content:center"><button class="btn primary" id="go20">进入 Day 20 修复</button><button class="btn ghost" id="home">回首页</button></div></section>`);
    $('#go20').onclick = () => { location.hash = '#day/20'; };
    $('#home').onclick = () => { location.hash = '#welcome'; };
  }

  function finalSummaryPage() {
    const score = NS.Learning.estimateScore(Store.state, SKILLS);
    const coreAudit = Store.state.examResults?.v16Day19Core;
    const fullBoss = Store.state.examResults?.full150 || Store.state.examResults?.[19];
    const weak = NS.Learning.topWeakSkills(Store.state, NS.Learning.dateISO(), 5);
    const stable = Object.values(Store.state.skills || {}).filter(skill => NS.Learning.masteryBand(skill, NS.Learning.getEffectiveMastery(skill)) === '稳定').length;
    const day20Attempts = (Store.state.attempts || []).filter(a => a.day === 20 && a.isTransfer);
    const independent = day20Attempts.filter(a => a.correct && a.hintsUsed === 0 && a.firstAttempt);
    const transferRate = day20Attempts.length ? Math.round(independent.length / day20Attempts.length * 100) : 0;
    const targetEvidenceReady = Boolean(fullBoss && Number(fullBoss.score150 || 0) >= 120 && transferRate >= 75);
    const targetMessage = targetEvidenceReady
      ? '完整150分卷与Day20换结构迁移都达到目标线附近：继续按复习队列保持，而不是停止复习。'
      : fullBoss
        ? '已经有完整150分卷证据，但目前还不能把“学完20天”直接等同于120分。继续修低 mastery 和迁移薄弱处。'
        : '20天核心审核已经完成，但还没有完整150分卷证据；在做完“考前正式模拟”前，不给出120分达成判断。';
    shell(`<section class="panel finish final-summary"><div class="big">🏁</div><div class="kicker">20 DAYS · FINAL</div><h1>20 天主线完成</h1><p class="lead">这里给的是训练证据，不是正式考试保证。Day19核心审核负责诊断；只有完整150分卷才用于判断是否接近120分目标线。</p><div class="score-box"><div><span class="tiny">Day19 核心审核</span><strong>${coreAudit ? `${Number(coreAudit.percent || 0)}%` : '未完成'}</strong></div><div><span class="tiny">完整150分模拟</span><strong>${fullBoss ? `${Number(fullBoss.score150 || 0)} / 150` : '未做'}</strong></div><div><span class="tiny">训练估计区间</span><strong>${score.low}–${score.high}</strong></div><div><span class="tiny">Day20 独立迁移表现</span><strong>${transferRate}%</strong></div><div><span class="tiny">稳定技能数</span><strong>${stable}</strong></div></div><div class="section-title"><h2>接下来最值得继续捡回的能力</h2></div><div class="skills">${weak.map(row => `<div class="skill-row"><span>${esc(SKILL_META.get(row.id)?.label || row.id)}</span><b>${row.effective}%</b></div>`).join('')}</div><div class="${targetEvidenceReady ? 'good' : 'note'}">${targetMessage}</div><div class="btn-row" style="justify-content:center"><button class="btn primary" id="home">回能力地图</button>${!fullBoss ? '<button class="btn soft" id="fullExam">考前正式模拟 · 150分</button>' : ''}<button class="btn ghost" id="review">继续到期复习</button></div></section>`);
    $('#home').onclick = () => { location.hash = '#abilities'; };
    $('#fullExam')?.addEventListener('click', () => { location.hash = '#full-exam/19'; });
    $('#review').onclick = () => { location.hash = '#review'; };
  }

  function questionAidLevel(question) {
    const recentWrong = [...(Store.state.attempts || [])].reverse().find(row => row.questionId === question.id && !row.correct);
    if (recentWrong?.confidence === 'sure') return 'full';
    if (recentWrong) return 'full';
    const skill = Store.state.skills?.[question.primarySkill];
    if (!skill?.attempts) return 'full';
    const effective = NS.Learning.getEffectiveMastery(skill);
    if (effective < 55) return 'full';
    if (effective < 75 || !skill.crossDayVerified) return 'compact';
    return 'hidden';
  }

  function renderLessonGrounding(item, day) {
    const g = item.grounding || Data.DAY_GROUNDING?.[day];
    if (!g) return '';
    return `<section class="learning-compass"><div><span>你已经会</span><b>${esc(g.known || '')}</b></div><div class="on"><span>这一页只加一块</span><b>${esc(g.newThing || '')}</b></div><div><span>做题时要变成</span><b>${esc(g.action || '')}</b></div><small>真题出口：${esc(g.exam || '')}</small></section>`;
  }

  function renderLessonHeroVisual(item) {
    if (!item.heroDiagram || !NS.Visuals?.render) return '';
    const visual = NS.Visuals.render(item.heroDiagram);
    if (!visual) return '';
    return `<section class="lesson-hero-chem"><div class="lesson-hero-label"><span>先看图，不急着背名词</span><b>把结构、电子和键的变化先看成一段动作</b></div><div class="lesson-hero-svg">${visual}</div></section>`;
  }

  function renderQuestionTranslation(question) {
    const t = question.translation;
    if (!t) return '';
    const level = questionAidLevel(question);
    const steps = Array.isArray(t.steps) ? t.steps : [];
    if (level === 'hidden') return `<details class="question-translation compact"><summary>忘了怎么拆题？点开“题干翻译机”</summary><p>${esc(t.source || '')}</p>${steps.length ? `<ol>${steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol>` : ''}</details>`;
    return `<section class="question-translation ${level}"><div class="translation-head"><span>题干翻译机</span><b>先把题目翻译成你已经学过的动作</b><small>${esc(t.source || '')}</small></div>${steps.length ? `<ol>${steps.map((x,i)=>`<li><span>${i+1}</span><p>${esc(x)}</p></li>`).join('')}</ol>` : ''}${t.trap ? `<div class="translation-trap"><b>先防一个坑：</b>${esc(t.trap)}</div>` : ''}</section>`;
  }

  function renderLessonExamBridge(item, day) {
    const bridge = item.examBridge || Data.DAY_EXAM_BRIDGES?.[day];
    if (!bridge) return '';
    const formats = Array.isArray(bridge.formats) ? bridge.formats : [];
    return `<section class="exam-bridge"><div class="exam-bridge-kicker">真题连接 · 为什么现在学这一页</div><b>${esc(bridge.title || '这一步会在真题里换一种外壳出现')}</b>${bridge.anchor ? `<p>${esc(bridge.anchor)}</p>` : ''}${formats.length ? `<div class="exam-format-chips">${formats.map(x => `<span>${esc(x)}</span>`).join('')}</div>` : ''}${bridge.goal ? `<small><strong>学完要能做到：</strong>${esc(bridge.goal)}</small>` : ''}</section>`;
  }

  function renderQuestionExamBridge(question) {
    const bridge = question.examBridge;
    if (!bridge) return '';
    return `<section class="question-exam-bridge"><div><span>${esc(bridge.label || '真题能力训练')}</span><b>${esc(bridge.format || '真题同型')}</b></div><p>${esc(bridge.ask || '')}</p>${bridge.dayNote ? `<small>${esc(bridge.dayNote)}</small>` : ''}</section>`;
  }

  function renderFirstUseTerms(item, context = {}) {
    const cards = Array.isArray(item.termCards) ? item.termCards : [];
    if (!cards.length) return '';
    if (context.v16) {
      return `<details class="first-use-terms v16-first-use"><summary>第一次出现 · 点我看看（${cards.map(card => esc(card.term)).join(' / ')}）</summary><div class="term-card-grid compact">${cards.map(card => {
        const visual = card.diagram && NS.Visuals?.render ? NS.Visuals.render(card.diagram) : '';
        return `<article class="term-card first-use-term-details"><h3>${esc(card.term)}</h3><p><b>人话：</b>${esc(card.plain || '')}</p><p><b>为什么现在要懂：</b>${esc(card.why || '')}</p>${visual ? `<div class="mini-term-visual">${visual}</div>` : ''}${card.limit ? `<small><b>边界：</b>${esc(card.limit)}</small>` : ''}</article>`;
      }).join('')}</div></details>`;
    }
    return `<section class="first-use-terms"><div class="first-use-head"><span>第一次见到这些词</span><b>先把词翻译成人话，再读下面正文</b><small>这里没有“默认你会”。每个词都回答：它是什么、为什么有用、哪里不能乱套。</small></div><div class="term-card-grid">${cards.map((card, index) => {
      const visual = card.diagram && NS.Visuals?.render ? NS.Visuals.render(card.diagram) : '';
      return `<article class="term-card ${index < 2 ? 'important' : ''}"><div class="term-title"><span>${index + 1}</span><h3>${esc(card.term)}</h3></div><div class="term-explain"><p><b>先说人话：</b>${esc(card.plain || '')}</p><p><b>为什么要懂它：</b>${esc(card.why || '')}</p></div>${visual ? `<div class="term-visual"><div class="term-visual-label">把刚才这句话变成一张图</div>${visual}</div>` : ''}${card.limit ? `<p class="term-limit"><b>别把它套过头：</b>${esc(card.limit)}</p>` : ''}</article>`;
    }).join('')}</div></section>`;
  }

  function questionGlossaryCards(question) {
    const glossary = Array.isArray(Data.BEGINNER_GLOSSARY) ? Data.BEGINNER_GLOSSARY : [];
    const text = [question.prompt, question.formula, ...(question.options || []).map(x => x.label || ''), ...(question.hints || [])].filter(Boolean).join(' ');
    const found = [];
    const used = new Set();
    glossary.forEach(card => {
      if (used.has(card.term)) return;
      const matches = typeof Data.glossaryMatches === 'function'
        ? Data.glossaryMatches(text, card)
        : (card.aliases || [card.term]).some(alias => alias && text.includes(alias));
      if (matches) {
        found.push(card);
        used.add(card.term);
      }
    });
    return found;
  }

  function renderQuestionPreflight(question) {
    const pre = question.preflight;
    if (!pre) return '';
    const steps = Array.isArray(pre.steps) ? pre.steps : [];
    return `<section class="question-preflight"><div class="preflight-head"><span>做题前先拆题</span><b>这题不是突然冒出来的</b><small>核心能力：${esc(pre.skill || '')}</small></div>${steps.length ? `<ol>${steps.map(step => `<li>${esc(step)}</li>`).join('')}</ol>` : ''}${pre.why ? `<p>${esc(pre.why)}</p>` : ''}</section>`;
  }

  function renderQuestionGuidedFrames(question) {
    const frames = Array.isArray(question.guidedFrames) ? question.guidedFrames : [];
    if (!frames.length || question.role === 'exam' || question.role === 'boss') return '';
    const level = questionAidLevel(question);
    const inner = `<div class="guided-question-steps">${frames.map((frame,index)=>`<article class="guided-question-step" data-guided-step="${index}"><div class="guided-question-index">${index+1}</div><div><b>${esc(frame.title || `第 ${index+1} 步`)}</b>${frame.text?`<p>${esc(frame.text)}</p>`:''}${frame.diagram&&NS.Visuals?.render?`<div class="guided-question-visual">${NS.Visuals.render(frame.diagram)}</div>`:''}${frame.formula?`<div class="story-formula">${esc(frame.formula)}</div>`:''}</div></article>`).join('')}</div>`;
    if (level === 'hidden' || question.role === 'transfer') return `<details class="guided-question collapsed"><summary>如果一眼不知道从哪开始，点开“带我拆一遍”</summary>${inner}</details>`;
    return `<section class="guided-question" data-guided-question="${esc(question.id)}"><div class="guided-question-head"><span>先别急着选答案</span><b>像教练在旁边一样，只看一步、做一步</b><small>这些不是答案，是你以后面对陌生真题也能复用的起手式。</small></div>${inner}<div class="guided-question-controls"><button type="button" class="btn ghost" data-guided-prev>上一步</button><span class="tiny" data-guided-count></span><button type="button" class="btn soft" data-guided-next>下一步</button></div></section>`;
  }

  function bindQuestionGuidedFrames(question, day) {
    const box = document.querySelector(`[data-guided-question="${CSS.escape(question.id)}"]`);
    if (!box) return;
    const steps=[...box.querySelectorAll('[data-guided-step]')]; if(!steps.length)return;
    const progress=NS.Learning.ensureDayState(Store.state, day, REGISTRY);
    progress.questionFrames=progress.questionFrames||{};
    let current=Math.max(0,Math.min(steps.length-1,Number(progress.questionFrames[question.id]||0)));
    const prev=box.querySelector('[data-guided-prev]');
    const next=box.querySelector('[data-guided-next]');
    const count=box.querySelector('[data-guided-count]');
    const draw=()=>{
      steps.forEach((step,index)=>{step.hidden=index!==current;});
      if(prev)prev.disabled=current<=0;
      if(next){next.disabled=current>=steps.length-1;next.textContent=current>=steps.length-1?'这段拆完了 ✓':'下一步';}
      if(count)count.textContent=`${current+1} / ${steps.length}`;
      progress.questionFrames[question.id]=current;
      Store.save(false);
    };
    prev?.addEventListener('click',()=>{if(current>0){current-=1;draw();}});
    next?.addEventListener('click',()=>{if(current<steps.length-1){current+=1;draw();}});
    draw();
  }

  function renderQuestionTermSupport(question) {
    const cards = questionGlossaryCards(question);
    if (!cards.length) return '';
    const level = questionAidLevel(question);
    if (level === 'hidden') {
      return `<details class="question-term-help"><summary>这题有 ${cards.length} 个术语，忘了可以点开</summary><div class="question-term-chip-list">${cards.map(c => `<span>${esc(c.term)}</span>`).join('')}</div>${cards.map(c => `<div class="question-term-mini"><b>${esc(c.term)}</b><p>${esc(c.plain)}</p></div>`).join('')}</details>`;
    }
    if (level === 'compact') {
      return `<div class="question-term-help compact"><b>词义扶手</b><div class="question-term-chip-list">${cards.map(c => `<span title="${esc(c.plain)}">${esc(c.term)}</span>`).join('')}</div><small>忘了词义没关系，先把名词翻译成人话再做。</small></div>`;
    }
    return `<section class="question-term-help full"><div class="first-use-head"><span>这题会用到这些词</span><b>不要求你“应该已经会”</b><small>先读懂词义，再开始判断。</small></div>${cards.map(c => `<article class="question-term-mini full"><b>${esc(c.term)}</b><p><strong>人话：</strong>${esc(c.plain)}</p><p><strong>为什么：</strong>${esc(c.why)}</p>${c.diagram && NS.Visuals?.render ? `<div class="mini-term-visual"><div class="term-visual-label">把刚才这句话变成一张图</div>${NS.Visuals.render(c.diagram)}</div>` : ''}</article>`).join('')}</section>`;
  }

  function goPreviousStudyPage(day) {
    const data = REGISTRY[day];
    if (!data) return;
    const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
    if (progress.lessonIndex < data.lessons.length) {
      if (progress.lessonIndex <= 0) {
        location.hash = '#welcome';
        return;
      }
      progress.lessonIndex -= 1;
      Store.save();
      dayPage(day);
      return;
    }
    if (progress.taskIndex > 0) {
      progress.taskIndex -= 1;
      Store.save();
      dayPage(day);
      return;
    }
    if (data.lessons.length) {
      progress.lessonIndex = data.lessons.length - 1;
      Store.save();
      dayPage(day);
    } else {
      location.hash = '#welcome';
    }
  }

  function renderLessonSupport(item, context = {}) {
    const extra = SCAFFOLDS.lessons?.[item.id] || {};
    const formulas = [...new Set([...(item.formulas || []), ...(extra.equations || [])].filter(Boolean))];
    const concept = extra.concept || item.concept || '';
    const definition = extra.definition || item.definition || '';
    const watch = extra.watch || item.watch || '';
    const analogy = item.analogy || extra.analogy;
    let visual = item.visual || extra.visual;
    let lookQuestions = item.lookQuestions || extra.lookQuestions || [];
    const sequence = item.sequence || extra.sequence || [];
    const whyChain = item.whyChain || extra.whyChain || [];
    const microCheck = item.microCheck || extra.microCheck || null;
    const wonder = item.wonder || extra.wonder || '';
    const arrowFormula = formulas.find(formula => /→|⇄|⇒/.test(formula));
    if (!visual && arrowFormula) {
      const parts = String(arrowFormula).split(/→|⇄|⇒/);
      if (parts.length >= 2) visual = { left: parts[0].trim(), arrow: arrowFormula.includes('⇄') ? '⇄' : '→', right: parts.slice(1).join(' → ').trim(), caption: '把这一行当成“找不同”：先看左边有什么，再看右边哪里变了。' };
    }
    if (!lookQuestions.length && visual) lookQuestions = ['反应前后，最明显变化的是哪根键或哪个官能团？', '碳骨架有没有变化？如果没变，真正变化的只是哪个位置？'];
    if (!formulas.length && !concept && !definition && !analogy && !visual && !lookQuestions.length && !sequence.length && !whyChain.length && !microCheck && !wonder) return '';
    const analogyHtml = analogy ? `<div class="analogy-card deep-analogy"><div class="analogy-icon">🧠</div><div><b>${esc(analogy.title || '先用一个生活直觉')}</b><p>${esc(analogy.body || '')}</p>${analogy.boundary ? `<small><b>比喻到这里为止：</b>${esc(analogy.boundary)}</small>` : ''}</div></div>` : '';
    const visualHtml = visual ? `<div class="concept-visual"><div class="visual-box"><span>先看这里</span><b>${esc(visual.left || '')}</b></div><div class="visual-arrow"><span>${esc(visual.arrow || '→')}</span></div><div class="visual-box"><span>变化以后</span><b>${esc(visual.right || '')}</b></div>${visual.caption ? `<p>${esc(visual.caption)}</p>` : ''}</div>` : '';
    const sequenceHtml = sequence.length ? `<section class="chem-storyboard" data-storyboard="${esc(item.id)}"><div class="story-head"><span>一步一步看</span><b>先不要跳到结论，跟着电子和键走</b></div><div class="story-steps">${sequence.map((step, index) => `<article class="story-step" data-story-step="${index}"><div class="story-index">${index + 1}</div><div class="story-step-body"><b>${esc(step.title || `第 ${index + 1} 步`)}</b>${step.text ? `<p>${esc(step.text)}</p>` : ''}${step.diagram && NS.Visuals?.render ? `<div class="story-diagram">${NS.Visuals.render(step.diagram)}</div>` : ''}${step.formula ? `<div class="story-formula">${esc(step.formula)}</div>` : ''}</div></article>`).join('')}</div><div class="story-controls"><button type="button" class="btn ghost" data-story-prev>上一步</button><span class="tiny" data-story-count></span><button type="button" class="btn soft" data-story-next>看下一步</button></div></section>` : '';
    const whyHtml = whyChain.length ? `<section class="why-chain" data-why-chain="${esc(item.id)}"><div class="why-chain-head"><span>为什么不能停在一句口诀</span><b>把“为什么”一层一层问到底</b><small>每点一次只多揭开一层；如果下一层你自己能说出来，说明真的在变成你的知识。</small></div><div class="why-chain-steps">${whyChain.map((row, index) => `<div class="why-row" data-why-step="${index}"><span>${index + 1}</span><p>${esc(row)}</p></div>`).join('')}</div><div class="why-chain-controls"><button type="button" class="btn ghost" data-why-prev>上一个为什么</button><span class="tiny" data-why-count></span><button type="button" class="btn soft" data-why-next>继续问：为什么？</button></div></section>` : '';
    const lookHtml = lookQuestions.length ? `<div class="look-say"><b>👀 看图说一句</b><p>先别背名词，试着自己说出下面这些变化：</p><ol>${lookQuestions.map(x => `<li>${esc(x)}</li>`).join('')}</ol><small>不用写长答案。能准确指出“谁变了、哪里变了”就已经在建立做题语言。</small></div>` : '';
    const checkHtml = microCheck ? `<div class="micro-check" data-micro-check="${esc(item.id)}"><div class="micro-check-head"><span>小停顿</span><b>${esc(microCheck.prompt || '')}</b></div><div class="micro-check-options">${(microCheck.options || []).map((option, index) => `<button type="button" data-micro-option="${index}">${esc(option)}</button>`).join('')}</div><div class="micro-check-feedback" data-micro-feedback hidden></div></div>` : '';
    const wonderHtml = wonder ? `<div class="wonder-card"><b>✨ 原来如此</b><p>${esc(wonder)}</p></div>` : '';
    const supportBody = `<div class="learning-support lesson-support"><div class="support-head"><span>先学会，再做题</span><b>${esc(concept || '把这一小步先用化学式看清楚')}</b></div>${definition ? `<p>${esc(definition)}</p>` : ''}${analogyHtml}${sequenceHtml}${whyHtml}${visualHtml}${formulas.length ? `<div class="formula-stack">${formulas.map(formula => `<div class="formula-line">${esc(formula)}</div>`).join('')}</div>` : ''}${lookHtml}${checkHtml}${wonderHtml}${watch ? `<div class="support-watch"><b>容易混：</b>${esc(watch)}</div>` : ''}</div>`;
    if (context.v16) return `<details class="v16-lesson-support"><summary>我还是不太懂 · 展开深层扶手</summary>${supportBody}</details>`;
    return supportBody;
  }

  function bindLessonExtras(day, item, { requireSupportCompletion = true } = {}) {
    const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
    progress.lessonFrames = progress.lessonFrames || {};
    progress.lessonChecks = progress.lessonChecks || {};
    progress.lessonWhyDepth = progress.lessonWhyDepth || {};
    const whyChain = item.whyChain || SCAFFOLDS.lessons?.[item.id]?.whyChain || [];
    const sequence = item.sequence || SCAFFOLDS.lessons?.[item.id]?.sequence || [];
    const micro = item.microCheck || SCAFFOLDS.lessons?.[item.id]?.microCheck || null;
    const nextLesson = $('#nextLesson');
    const gate = $('#lessonGate');

    const updateGate = () => {
      const frameDone = !requireSupportCompletion || !sequence.length || Number(progress.lessonFrames[item.id] || 0) >= sequence.length - 1;
      const checkDone = !requireSupportCompletion || !micro || Boolean(progress.lessonChecks[item.id]);
      const whyDone = !requireSupportCompletion || !whyChain.length || Number(progress.lessonWhyDepth[item.id] || 0) >= whyChain.length - 1;
      const ready = frameDone && checkDone && whyDone;
      if (nextLesson) nextLesson.disabled = !ready;
      if (gate) {
        if (ready) {
          gate.className = 'lesson-gate ready';
          gate.innerHTML = '<b>✓ 这一页可以继续了</b><span>你已经把逐帧看到最后，也完成了这一页的小停顿。</span>';
        } else {
          const missing = [];
          if (!frameDone) missing.push('把“一步一步看”翻到最后一帧');
          if (!checkDone) missing.push('做完这一页的小停顿');
          if (!whyDone) missing.push('把“为什么”追问到最后一层');
          gate.className = 'lesson-gate waiting';
          gate.innerHTML = `<b>先别急着翻页</b><span>${missing.join('，')}。忘了前面的内容，随时可以点“上一步”或“上一页”。</span>`;
        }
      }
    };

    document.querySelectorAll('[data-storyboard]').forEach(board => {
      if (board.dataset.storyboard !== item.id) return;
      const steps = [...board.querySelectorAll('[data-story-step]')];
      if (!steps.length) return;
      let current = Math.max(0, Math.min(steps.length - 1, Number(progress.lessonFrames[item.id] || 0)));
      const prev = board.querySelector('[data-story-prev]');
      const next = board.querySelector('[data-story-next]');
      const count = board.querySelector('[data-story-count]');
      const draw = () => {
        steps.forEach((step, index) => { step.hidden = index !== current; });
        if (prev) prev.disabled = current <= 0;
        if (next) {
          next.disabled = current >= steps.length - 1;
          next.textContent = current >= steps.length - 1 ? '这一段看完了 ✓' : '看下一步';
        }
        if (count) count.textContent = `${current + 1} / ${steps.length}`;
        progress.lessonFrames[item.id] = current;
        Store.save();
        updateGate();
      };
      prev?.addEventListener('click', () => { if (current > 0) { current -= 1; draw(); } });
      next?.addEventListener('click', () => { if (current < steps.length - 1) { current += 1; draw(); } });
      draw();
    });

    document.querySelectorAll('[data-why-chain]').forEach(box => {
      if (box.dataset.whyChain !== item.id) return;
      const steps = [...box.querySelectorAll('[data-why-step]')];
      if (!steps.length) return;
      let current = Math.max(0, Math.min(steps.length - 1, Number(progress.lessonWhyDepth[item.id] || 0)));
      const prev = box.querySelector('[data-why-prev]');
      const next = box.querySelector('[data-why-next]');
      const count = box.querySelector('[data-why-count]');
      const draw = () => {
        steps.forEach((step,index)=>{ step.hidden = index > current; step.classList.toggle('current', index === current); });
        if (prev) prev.disabled = current <= 0;
        if (next) { next.disabled = current >= steps.length - 1; next.textContent = current >= steps.length - 1 ? '为什么追到底了 ✓' : '继续问：为什么？'; }
        if (count) count.textContent = `${current + 1} / ${steps.length}`;
        progress.lessonWhyDepth[item.id] = current;
        Store.save();
        updateGate();
      };
      prev?.addEventListener('click',()=>{ if(current>0){current-=1;draw();} });
      next?.addEventListener('click',()=>{ if(current<steps.length-1){current+=1;draw();} });
      draw();
    });

    document.querySelectorAll('[data-micro-check]').forEach(box => {
      if (box.dataset.microCheck !== item.id) return;
      const feedback = box.querySelector('[data-micro-feedback]');
      const saved = progress.lessonChecks[item.id];
      const answer = Number(micro?.answer);
      const explanation = micro?.feedback || '';
      const apply = selected => {
        box.querySelectorAll('[data-micro-option]').forEach(button => {
          const idx = Number(button.dataset.microOption);
          button.classList.toggle('selected', idx === selected);
          button.classList.toggle('correct', idx === answer && selected !== null);
          button.classList.toggle('wrong', idx === selected && idx !== answer);
        });
        if (selected !== null && feedback) {
          const correct = selected === answer;
          feedback.hidden = false;
          feedback.className = `micro-check-feedback ${correct ? 'good' : 'error'}`;
          feedback.textContent = `${correct ? '对，这一步通了。' : '这一步还差一点，但现在知道断点在哪。'} ${explanation}`;
        }
        updateGate();
      };
      if (saved && Number.isInteger(saved.selected)) apply(saved.selected);
      box.querySelectorAll('[data-micro-option]').forEach(button => button.addEventListener('click', () => {
        const selected = Number(button.dataset.microOption);
        progress.lessonChecks[item.id] = { selected, correct: selected === answer, at: Date.now() };
        Store.save();
        apply(selected);
      }));
    });
    updateGate();
  }

  function questionAidData(question) {
    const extra = SCAFFOLDS.questions?.[question.id];
    if (extra) return extra;
    if (question.formula) return { equation: question.formula, logic: '先把结构式和原子变化看清楚，再做判断。', reduced: question.formula };
    if (question.start?.structure && question.target?.structure) return { equation: `${question.start.structure} → ${question.target.structure}`, logic: '先比较起点和终点差了什么。', reduced: `${question.start.structure} → ${question.target.structure}` };
    return null;
  }

  function renderQuestionSupport(question) {
    const aid = questionAidData(question);
    if (!aid) return '';
    const level = questionAidLevel(question);
    if (level === 'hidden') return `<div class="learning-support compact hidden-aid"><div class="support-head"><span>化学式扶手已逐步撤掉</span><b>需要时仍可打开</b></div><button type="button" class="tiny-link reveal-aid" data-reveal-aid>查看反应式 / 结构提示</button><div class="aid-reveal-body" hidden><div class="formula-line">${esc(aid.equation || aid.reduced || '')}</div>${aid.logic ? `<p>${esc(aid.logic)}</p>` : ''}</div></div>`;
    if (level === 'compact') return `<div class="learning-support compact"><div class="support-head"><span>半扶手</span><b>${esc(aid.reduced || aid.equation || '')}</b></div><div class="tiny">你已经见过这个技能，解释先收起来；卡住时再用提示。</div></div>`;
    return `<div class="learning-support"><div class="support-head"><span>新手扶手 · 先看懂化学式</span><b>${esc(aid.equation || aid.reduced || '')}</b></div>${aid.logic ? `<p>${esc(aid.logic)}</p>` : ''}<div class="tiny">随着这个技能变稳，这块会自动缩短，不会永远把答案摆在眼前。</div></div>`;
  }

  function bindAidReveal(root = document) {
    root.querySelectorAll('[data-reveal-aid]').forEach(button => button.addEventListener('click', () => {
      const body = button.parentElement?.querySelector('.aid-reveal-body');
      if (!body) return;
      body.hidden = !body.hidden;
      button.textContent = body.hidden ? '查看反应式 / 结构提示' : '先收起化学式扶手';
    }));
  }

  function lessonPage(day, item, context = {}) {
    const progress = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
    const prevLabel = context.prevLabel || (progress.lessonIndex > 0 ? '← 上一页' : '← 回欢迎页');
    shell(`<section class="learning-page-wrap">${renderLearningContext(day)}<div class="content-with-side"><article class="panel lesson-card"><div class="kicker">${esc(item.eyebrow || `Day ${day}`)}</div><h1>${esc(item.title)}</h1>${renderLessonGrounding(item, day)}${renderLessonHeroVisual(item)}${renderFirstUseTerms(item, context)}<div class="lesson-body">${esc(item.body)}</div>${renderLessonSupport(item, context)}${renderLessonExamBridge(item, day)}${item.note ? `<div class="note">${esc(item.note)}</div>` : ''}<div class="lesson-gate" id="lessonGate"></div><div class="footer-actions lesson-nav-actions"><div class="nav-left"><button class="btn ghost" id="prevLesson">${prevLabel}</button><button class="link-btn" id="home">暂时退出</button></div><button class="btn primary" id="nextLesson">我看懂了，去下一页</button></div></article><aside class="quiet-side-image"><img src="${DECOR.study.src}" alt="${esc(DECOR.study.name)}"><p>如果有一句话不懂，就在这一页多停一会儿。能自己讲出“为什么”再继续 ♡</p></aside></div></section>`,'study');
    $('#home').onclick = () => { location.hash = '#welcome'; };
    $('#prevLesson').onclick = () => context.onPrev ? context.onPrev() : goPreviousStudyPage(day);
    bindLessonExtras(day, item, { requireSupportCompletion: context.requireSupportCompletion !== false });
    $('#nextLesson').onclick = () => {
      if ($('#nextLesson').disabled) return;
      if (context.onNext) return context.onNext(item);
      const current = NS.Learning.ensureDayState(Store.state, day, REGISTRY);
      current.lessonIndex += 1;
      Store.save();
      dayPage(day);
    };
  }

  function studyQuestionPage(question, context) {
    const started = performance.now();
    const roleName = { learn: '新母概念', practice: '同核心练习', contrast: '近邻对比', transfer: '迁移', repair: '修复', review: '到期复习', boss: '最终 Boss', exam: '考试' }[context.mode] || context.mode;
    const decorKey = context.mode === 'review' ? 'review' : 'boss';
    shell(`<section class="learning-page-wrap">${renderLearningContext(context.day || question.day)}<div class="content-with-side"><article class="panel question-shell"><div class="question-head"><div class="step-label">${esc(context.positionLabel || `Day ${question.day}`)}</div><span class="role-chip">${esc(roleName)}</span></div>${renderQuestionTranslation(question)}${renderQuestionExamBridge(question)}${renderQuestionPreflight(question)}${renderQuestionTermSupport(question)}${renderQuestionSupport(question)}${renderQuestionGuidedFrames(question)}<div id="interactionRoot"></div><div class="footer-actions question-nav-actions"><div class="nav-left"><button class="btn ghost" id="prevStudy">← 上一页</button><button class="link-btn" id="home">暂时退出</button></div><span class="tiny">忘了上一页可以直接翻回去；回来也会接着当前这题。</span></div></article><aside class="quiet-side-image"><img src="${DECOR[decorKey].src}" alt="${esc(DECOR[decorKey].name)}"><p>${context.mode === 'review' ? '把快忘的捡回来，不用重学一遍。' : '先看结构变化，再做判断。'}</p></aside></div></section>`, context.mode === 'review' ? 'review' : 'study');
    $('#home').onclick = () => { location.hash = '#welcome'; };
    $('#prevStudy').onclick = () => { if (context.onPrev) { context.onPrev(); } else if (context.mode === 'review') { const d = context.day || Store.state.currentDay; const p = NS.Learning.ensureDayState(Store.state, d, REGISTRY); if (p.reviewIndex > 0) { p.reviewIndex -= 1; Store.save(); reviewPage(); } else { location.hash = '#welcome'; } } else { goPreviousStudyPage(context.day || question.day); } };
    bindAidReveal(document);
    bindQuestionGuidedFrames(question, context.day || question.day);
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
          isTransfer: context.isTransfer === true || question.role === 'transfer',
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
        const retry = feedback.querySelector('#retrySameQuestion');
        if (retry) retry.onclick = () => studyQuestionPage(question, context);
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
    const ladder = Array.isArray(question.causalLadder) ? question.causalLadder : [];
    const ladderHtml = ladder.length ? `<section class="causal-ladder"><div class="causal-ladder-head"><span>把这题追问到底</span><b>不是记答案，而是把原因接回前面</b></div>${ladder.map((row,index)=>`<div class="causal-step"><span>${index+1}</span><p>${esc(row)}</p></div>`).join('')}<small>如果其中任何一步你还说不出“为什么”，先点上面的完整解释，或者用“上一页”回到对应概念再看。</small></section>` : '';
    return `<div class="feedback"><div class="result-title">${esc(title)}</div>${sub ? `<div class="result-sub">${esc(sub)}</div>` : ''}${repairText}<div class="layered-explanation"><div class="explain-layer open"><b>一句话</b><br>${esc(layers.short || '')}</div><div class="explain-layer why"><b>为什么</b><br>${esc(layers.why || '')}</div><div class="explain-layer full"><b>完整解释 / 机理</b><br>${esc(layers.full || '')}</div><div class="explain-actions"><button class="btn ghost" data-open-layer="why">为什么？</button><button class="btn ghost" data-open-layer="full">看完整解释</button></div></div>${ladderHtml}<div class="btn-row"><button id="nextAfterFeedback" class="btn ${result.correct ? 'primary' : 'soft'}">${context.mode === 'review' ? '下一条复习' : result.correct ? '继续' : '看懂以后继续修复'}</button><button id="retrySameQuestion" class="btn ghost">再做一次这题</button></div></div>`;
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
    if (day === 19 && Store.state.examResults?.v16Day19Core) return coreExamResultsPage();
    if (day === 20) return finalSummaryPage();
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
    shell(`<section class="panel finish"><div class="big">🌱</div><div class="kicker">DAY ${day} 收口</div><h1>今天这一条主线已经走完</h1><p class="lead">正确不等于永久掌握。系统已经把提示、置信度、首次作答和后续复习时间写进能力模型。</p><div class="skills">${rows.map(row => `<div class="skill-row"><span>${esc(row.label)}<small style="display:block;color:var(--muted);margin-top:3px">${esc(row.band)}</small></span><b>${row.effective}%</b></div>`).join('')}</div><div class="good">今天的错题与遗忘曲线复习已经分开记录。明天到期的内容会进入“今日复习”，不是随机插进主线。</div>${data.memorySheet?.length ? `<div class="memory-sheet"><div class="section-title"><h2>今天真正要带走的表达</h2></div>${data.memorySheet.map(x => `<div class="memory-line">${esc(x)}</div>`).join('')}</div>` : ''}<div class="btn-row" style="justify-content:center"><button id="home" class="btn primary">回到欢迎页</button>${nextAvailable ? `<button id="nextDay" class="btn soft">看看 Day ${day + 1}</button>` : ''}<button id="redo" class="btn ghost">自由复练这一天</button></div></section>`);
    $('#home').onclick = () => { location.hash = '#welcome'; };
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
      shell(`<section class="panel"><div class="review-mascot-row">${decorImage('review', 'page-side-decor')}<div class="review-panel-copy"><div class="kicker">今日复习</div><h1>今天没有到期记忆</h1><div class="empty-state">不需要为了“刷数量”硬塞复习题。继续今天主线就可以。</div><div class="btn-row"><button class="btn primary" id="home">回到欢迎页</button></div></div></div></section>`, 'review');
      $('#home').onclick = () => { location.hash = '#welcome'; };
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
    shell(`<section class="panel finish"><div class="review-mascot-row">${decorImage('review', 'page-side-decor')}<div class="review-panel-copy"><div class="big">🧠</div><div class="kicker">今日复习</div><h1>到期记忆已经捡回来了</h1><p class="lead">复习只处理遗忘曲线到期内容。今天新做错的题仍留在“今日错题”里单独看。</p><div class="btn-row"><button class="btn primary" id="home">回到欢迎页</button></div></div></div></section>`, 'review');
    $('#home').onclick = () => { location.hash = '#welcome'; };
  }

  function mistakesPage() {
    const groups = NS.Review.todayMistakeGroups(Store.state, SKILLS);
    shell(`<section class="panel"><div class="mistake-mascot-row">${decorImage('random', 'page-side-decor')}<div class="mistake-panel-copy"><div class="kicker">今日错题</div><h1>只看今天真正偏掉的地方</h1><p class="lead">这里不混入遗忘曲线复习。高置信错误会优先显示。</p>${groups.length ? `<div class="mistake-list">${groups.map(group => `<article class="mistake-card ${group.highConfidence ? 'high' : ''}"><b>${esc(group.skillLabel)} · ${group.count} 次${group.highConfidence ? ' · 高置信错误' : ''}</b><p>${esc(NS.Review.errorMessage(group))}</p><p class="tiny">记录题目：${group.questionIds.map(esc).join('、')}</p></article>`).join('')}</div>` : '<div class="empty-state">今天还没有错误记录。猜对的题不会被当作“完全掌握”，但也不会混进错题列表。</div>'}<div class="btn-row"><button class="btn primary" id="home">回到欢迎页</button></div></div></div></section>`, 'mistakes');
    $('#home').onclick = () => { location.hash = '#welcome'; };
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
    shell(`<section class="panel"><div class="ability-mascot-row">${decorImage('random', 'page-side-decor')}<div class="ability-panel-copy"><div class="kicker">能力地图</div><h1>后台看细，前台只给你有用的结论</h1><p class="lead">同一天连续做对不会把技能刷成“稳定”。跨日无提示正确和迁移题证据才会真正抬高稳定度。120/150 是课程设计目标线，不是网站对个人成绩的保证；只有完整20天和Boss卷之后，估计才更有解释意义。</p><div class="score-box"><div><span class="tiny">训练估计</span><strong>${score.low}–${score.high} / 150</strong></div><div><span class="tiny">目标线</span><strong>${score.target} / 150</strong></div></div>${summary.length ? `<div class="section-title"><h2>能力域</h2></div><div class="ability-grid">${summary.map(row => abilityDomainCard(row)).join('')}</div>` : ''}<div class="section-title"><h2>已有学习证据的技能</h2><span class="tiny">弱项排在前面</span></div>${attempted.length ? `<div class="skill-detail-list">${attempted.map(row => `<div class="skill-detail"><span><b>${esc(row.meta.label)}</b></span><b>${row.effective}%</b><small>${esc(row.band)} · 尝试 ${row.skill.attempts} 次 · 首次正确 ${row.skill.firstAttemptCorrect}/${row.skill.firstAttemptAttempts} · 独立正确 ${row.skill.independentCorrect}${row.skill.crossDayVerified ? ' · 已跨日验证' : ' · 待跨日验证'}${row.skill.nextReviewAt ? ` · 下次复习 ${esc(row.skill.nextReviewAt)}` : ''}</small></div>`).join('')}</div>` : '<div class="empty-state">先完成几道题，能力地图才会开始有证据。</div>'}<div class="btn-row"><button class="btn primary" id="home">回到欢迎页</button></div></div></div></section>`, 'abilities');
    $('#home').onclick = () => { location.hash = '#welcome'; };
  }


  function detectiveHubPage() {
    const cases = Array.isArray(Data.DETECTIVE_CASES) ? Data.DETECTIVE_CASES : [];
    const progress = NS.Detective.normalizeProgress(Store.state.detective);
    Store.state.detective = progress;
    const completed = Object.values(progress.cases || {}).filter(row => row?.completedAt).length;
    const average = completed ? Math.round(Object.values(progress.cases).filter(row => row?.completedAt).reduce((sum, row) => sum + Number(row.score || 0), 0) / completed * 100) : 0;
    shell(`<section class="panel detective-hub"><div class="kicker">专项训练 · 结构证据</div><h1>不是“看谱猜答案”，而是把证据一条条关上门</h1><p class="lead">每一案都按同一条链走：分子式与 DBE → IR → ¹H NMR → 候选保留/排除 → 最终结构。最终候选选错，前面算对的 DBE、IR、NMR 仍然分别进入能力模型。</p><div class="detective-hub-stats"><div><span>已完成案例</span><b>${completed}/${cases.length}</b></div><div><span>已完成案例平均推断链</span><b>${completed ? average + '%' : '—'}</b></div><div><span>当前模式</span><b>独立训练</b></div></div><div class="section-title"><h2>案例</h2><span class="phase-badge">Day 13–14 主线同款引擎</span></div><div class="detective-case-list">${cases.map((kase, index) => { const row = progress.cases?.[kase.id]; return `<button type="button" class="detective-case-tile ${row?.completedAt ? 'done' : ''}" data-detective-case="${esc(kase.id)}"><span>${esc(kase.stage || `案例 ${index + 1}`)}</span><b>${esc(kase.title)}</b><small>${esc(kase.subtitle || '')}</small><em>${row?.completedAt ? `已完成 · ${Math.round(Number(row.score || 0) * 100)}%` : '未开始'}</em></button>`; }).join('')}</div><div class="note">这里是自由复练入口；正式 20 天主线在 Day 13–14 也会调用同一套证据链引擎。自由练习不会改变当前主线解锁顺序。</div><div class="btn-row"><button class="btn primary" id="detectiveHome">回到欢迎页</button></div></section>`, 'detective');
    document.querySelectorAll('[data-detective-case]').forEach(button => button.addEventListener('click', () => { location.hash = `#detective/${button.dataset.detectiveCase}`; }));
    $('#detectiveHome').onclick = () => { location.hash = '#home'; };
  }

  function detectiveCasePage(caseId) {
    const cases = Array.isArray(Data.DETECTIVE_CASES) ? Data.DETECTIVE_CASES : [];
    const index = cases.findIndex(row => row.id === caseId);
    const kase = cases[index];
    if (!kase) return detectiveHubPage();
    Store.state.detective = NS.Detective.normalizeProgress(Store.state.detective);
    Store.state.detective.currentCaseId = kase.id;
    Store.save(false);
    const started = performance.now();
    shell(`<section class="panel detective-shell"><div id="detectiveRoot"></div><div class="footer-actions"><button class="link-btn" id="detectiveExit">← 暂时离开这案</button><span class="tiny">推断过程分开计分，不用一次猜中才算会。</span></div></section>`, 'detective');
    $('#detectiveExit').onclick = () => { location.hash = '#detective'; };
    NS.Detective.mount($('#detectiveRoot'), kase, {
      nextCaseId: cases[index + 1]?.id || null,
      initialState: Store.state.detective.inProgress?.[kase.id] || null,
      onProgress(snapshot) {
        Store.state.detective.inProgress[kase.id] = snapshot;
        Store.save(false);
        Cloud.schedule();
      },
      onComplete(summary) {
        const elapsed = Math.max(0, Math.round(performance.now() - started));
        summary.skillEvidence.forEach(evidence => {
          const questionId = `${kase.id}:${evidence.questionSuffix}`;
          const previous = Store.state.attempts.filter(row => row.questionId === questionId).length;
          const pseudoQuestion = {
            id: questionId,
            day: String(kase.stage || '').includes('14') ? 14 : 13,
            type: 'detective-step',
            role: 'transfer',
            primarySkill: evidence.skillId,
            skillIds: [evidence.skillId]
          };
          NS.Learning.recordAttempt(Store.state, pseudoQuestion, {
            mode: 'detective',
            correct: evidence.correct,
            firstAttempt: previous === 0,
            attemptNumber: previous + 1,
            hintsUsed: evidence.hintsUsed || 0,
            confidence: summary.confidence,
            responseTimeMs: Math.round(elapsed / Math.max(1, summary.skillEvidence.length)),
            isTransfer: true,
            answerPayload: summary.answers,
            partialScore: evidence.partialScore,
            errorType: evidence.errorType
          });
        });
        Store.state.detective.cases[kase.id] = {
          completedAt: Date.now(),
          score: summary.score,
          dbeCorrect: summary.dbeCorrect,
          irCorrect: summary.irCorrect,
          nmrCorrect: summary.nmrCorrect,
          eliminationScore: summary.eliminationScore,
          finalCorrect: summary.finalCorrect,
          hintsUsed: summary.hintsUsed,
          confidence: summary.confidence
        };
        delete Store.state.detective.inProgress[kase.id];
        Store.save();
      },
      onBack() { location.hash = '#detective'; },
      onNext(nextId) { location.hash = `#detective/${nextId}`; }
    });
  }

  function synthesisHubPage() {
    const cases = Array.isArray(Data.SYNTHESIS_CASES) ? Data.SYNTHESIS_CASES : [];
    const progress = NS.Synthesis.normalizeProgress(Store.state.synthesis);
    Store.state.synthesis = progress;
    const completedRows = Object.values(progress.cases || {}).filter(row => row?.completedAt);
    const completed = completedRows.length;
    const average = completed ? Math.round(completedRows.reduce((sum, row) => sum + Number(row.score || 0), 0) / completed * 100) : 0;
    shell(`<section class="panel synthesis-hub"><div class="kicker">专项训练 · 路线设计</div><h1>先看差异，再搭桥；不是背“标准路线”</h1><p class="lead">每一组路线练习都先做两件基础审计：目标比起点多了什么、碳数变没变。然后你可以正向走，也可以从目标逆向拆。黄色路线只要化学上成立就会保留，不会因为不是参考答案被打成错。</p><div class="synthesis-hub-stats"><div><span>已完成路线训练</span><b>${completed}/${cases.length}</b></div><div><span>平均路线表现</span><b>${completed ? average + '%' : '—'}</b></div><div><span>判分维度</span><b>4 项</b><small>可行 / 效率 / 选择性 / 兼容</small></div></div><div class="section-title"><h2>路线列表</h2><span class="phase-badge">Day 17–18 主线同款引擎</span></div><div class="synthesis-case-list">${cases.map((kase, index) => { const row = progress.cases?.[kase.id]; return `<button type="button" class="synthesis-case-tile ${row?.completedAt ? 'done' : ''}" data-synthesis-case="${esc(kase.id)}"><span>${esc(kase.stage || `训练 ${index + 1}`)}</span><b>${esc(kase.title)}</b><small>${esc(kase.subtitle || '')}</small><div class="case-mini-equation">${esc(kase.start?.structure || '')}<i>→</i>${esc(kase.target?.structure || '')}</div><em>${row?.completedAt ? `已完成 · ${Math.round(Number(row.score || 0) * 100)}%` : '未开始'}</em></button>`; }).join('')}</div><div class="note">这里是自由复练入口；正式 20 天主线在 Day 17–18 会调用同一套正向/逆向路线训练。自由练习不会改变当前主线解锁顺序。</div><div class="btn-row"><button class="btn primary" id="synthesisHome">回到欢迎页</button></div></section>`, 'synthesis');
    document.querySelectorAll('[data-synthesis-case]').forEach(button => button.addEventListener('click', () => { location.hash = `#synthesis/${button.dataset.synthesisCase}`; }));
    $('#synthesisHome').onclick = () => { location.hash = '#home'; };
  }

  function synthesisCasePage(caseId) {
    const cases = Array.isArray(Data.SYNTHESIS_CASES) ? Data.SYNTHESIS_CASES : [];
    const index = cases.findIndex(row => row.id === caseId);
    const kase = cases[index];
    if (!kase) return synthesisHubPage();
    Store.state.synthesis = NS.Synthesis.normalizeProgress(Store.state.synthesis);
    Store.state.synthesis.currentCaseId = kase.id;
    Store.save(false);
    const started = performance.now();
    shell(`<section class="panel synthesis-shell"><div id="synthesisRoot"></div><div class="footer-actions"><button class="link-btn" id="synthesisExit">← 暂时离开这组路线训练</button><span class="tiny">路线不是只看最终答案；起点终点分析和每一步化学逻辑都会留下证据。</span></div></section>`, 'synthesis');
    $('#synthesisExit').onclick = () => { location.hash = '#synthesis'; };
    NS.Synthesis.mount($('#synthesisRoot'), kase, {
      nextCaseId: cases[index + 1]?.id || null,
      initialState: Store.state.synthesis.inProgress?.[kase.id] || null,
      onProgress(snapshot) {
        Store.state.synthesis.inProgress[kase.id] = snapshot;
        Store.save(false);
        Cloud.schedule();
      },
      onComplete(summary) {
        const elapsed = Math.max(0, Math.round(performance.now() - started));
        summary.skillEvidence.forEach(evidence => {
          const questionId = `${kase.id}:${evidence.questionSuffix}`;
          const previous = Store.state.attempts.filter(row => row.questionId === questionId).length;
          const pseudoQuestion = {
            id: questionId,
            day: String(kase.stage || '').includes('18') ? 18 : 17,
            type: 'synthesis-step',
            role: 'transfer',
            primarySkill: evidence.skillId,
            skillIds: [evidence.skillId]
          };
          NS.Learning.recordAttempt(Store.state, pseudoQuestion, {
            mode: 'synthesis',
            correct: evidence.correct,
            firstAttempt: previous === 0,
            attemptNumber: previous + 1,
            hintsUsed: summary.hintsUsed || 0,
            confidence: summary.confidence,
            responseTimeMs: Math.round(elapsed / Math.max(1, summary.skillEvidence.length)),
            isTransfer: true,
            answerPayload: { mode: summary.mode, route: summary.route },
            partialScore: evidence.partialScore,
            errorType: evidence.errorType
          });
        });
        Store.state.synthesis.cases[kase.id] = {
          completedAt: Date.now(),
          score: summary.score,
          mode: summary.mode,
          differenceCorrect: summary.differenceCorrect,
          carbonCorrect: summary.carbonCorrect,
          route: summary.route,
          routeScore: summary.routeResult.score,
          hintsUsed: summary.hintsUsed,
          confidence: summary.confidence
        };
        delete Store.state.synthesis.inProgress[kase.id];
        Store.save();
      },
      onBack() { location.hash = '#synthesis'; },
      onNext(nextId) { location.hash = `#synthesis/${nextId}`; }
    });
  }

  function notReadyPage(day) {
    shell(`<section class="panel"><div class="kicker">DAY ${day}</div><h1>这一天的数据没有正确加载</h1><p class="lead">20 天内容已经完整写入。如果你看到这里，通常是 GitHub Pages 仍在缓存旧文件，或某个 dayXX.js 没有上传完整。请先刷新页面并核对仓库文件。</p><div class="btn-row"><button class="btn primary" id="home">回到欢迎页</button></div></section>`);
    $('#home').onclick = () => { location.hash = '#welcome'; };
  }

  function route() {
    if (!Auth.user) return loginPage('login');
    const hash = location.hash || '#welcome';
    if (hash === '#welcome') return welcomePage();
    if (hash === '#portal') return portalPage();
    if (hash === '#home') return homePage();
    if (hash === '#review') return reviewPage();
    if (hash === '#mistakes') return mistakesPage();
    if (hash === '#abilities') return abilitiesPage();
    if (hash === '#case-board') return caseBoardPage();
    if (hash === '#detective') return detectiveHubPage();
    if (hash === '#synthesis') return synthesisHubPage();
    const detectiveMatch = hash.match(/^#detective\/(.+)$/);
    if (detectiveMatch) return detectiveCasePage(decodeURIComponent(detectiveMatch[1]));
    const synthesisMatch = hash.match(/^#synthesis\/(.+)$/);
    if (synthesisMatch) return synthesisCasePage(decodeURIComponent(synthesisMatch[1]));
    if (hash === '#full-exam/19') return full150ExamPage();
    const dayMatch = hash.match(/^#day\/(\d+)$/);
    if (dayMatch) return dayPage(Number(dayMatch[1]));
    location.hash = '#welcome';
  }

  async function boot() {
    if (!REGISTRY[1]) {
      $('#app').textContent = 'Day 1 数据没有加载。';
      return;
    }
    const restored = await Auth.restore();
    if (restored) {
      await Cloud.bootstrap(false);
      history.replaceState(null, '', `${location.pathname}${location.search}#welcome`);
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
