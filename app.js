(() => {
  'use strict';
  const CFG = window.ORGANIC637_CONFIG || {};
  const DAY = window.ORGANIC637_DAY01;
  const APP_KEY = 'organic637_clean_v1_state';
  const AUTH_KEY = 'organic637_clean_v1_auth';
  const BACKUP_SUFFIX = ':backup';
  const $ = (s, r=document) => r.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const todayISO = () => { const d=new Date(),p=n=>String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}`; };
  const addDays = (iso,n) => { const d=new Date(iso+'T12:00:00'); d.setDate(d.getDate()+n); return d.toISOString().slice(0,10); };

  const Auth = {
    token:null,user:null,expiresAt:0,offline:false,
    base(){ return String(CFG.API_URL || '').replace(/\/$/, ''); },
    load(){ try { const x=JSON.parse(localStorage.getItem(AUTH_KEY)||'null'); if(x?.token&&x?.user){this.token=x.token;this.user=x.user;this.expiresAt=Number(x.expires_at)||0;return true;} } catch {} return false; },
    save(){ if(this.token&&this.user)localStorage.setItem(AUTH_KEY,JSON.stringify({token:this.token,user:this.user,expires_at:this.expiresAt})); else localStorage.removeItem(AUTH_KEY); },
    clear(){ this.token=null;this.user=null;this.expiresAt=0;this.offline=false;localStorage.removeItem(AUTH_KEY); },
    async deriveVerifier(username,password){
      const u=String(username||'').trim().toLowerCase(),pw=String(password||'');
      if(!/^[a-z0-9_]{2,24}$/.test(u)) throw new Error('账号请使用2–24位小写字母、数字或下划线');
      if(pw.length<6||pw.length>72) throw new Error('密码长度需为6–72位');
      if(!crypto?.subtle) throw new Error('当前浏览器不支持安全登录所需的 Web Crypto');
      const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveBits']);
      const salt=new TextEncoder().encode(`organic637:v1:${u}`);
      const bits=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt,iterations:150000},key,256);
      return b64url(new Uint8Array(bits));
    },
    async request(path,{method='POST',body=null,auth=true}={}){
      const base=this.base(); if(!base || /REPLACE|YOUR_/i.test(base)) throw new Error('后台地址还没有配置');
      const headers={}; if(body!==null)headers['Content-Type']='application/json'; if(auth&&this.token)headers.Authorization=`Bearer ${this.token}`;
      const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),20000);
      try{
        const r=await fetch(base+path,{method,headers,body:body===null?undefined:JSON.stringify(body),cache:'no-store',signal:ctrl.signal});
        let out={}; try{out=await r.json();}catch{}
        if(!r.ok||out?.ok===false){const e=new Error(out?.error?.message||`请求失败（HTTP ${r.status}）`);e.code=out?.error?.code||`http_${r.status}`;e.status=r.status;throw e;}
        return out;
      }catch(e){if(e?.name==='AbortError')throw new Error('后台请求超时');throw e;}finally{clearTimeout(timer);}
    },
    async register(username,password){const verifier=await this.deriveVerifier(username,password);const out=await this.request('/auth/register',{body:{username,verifier},auth:false});this.token=out.session.token;this.expiresAt=out.session.expires_at;this.user=out.user;this.offline=false;this.save();return out;},
    async login(username,password){const verifier=await this.deriveVerifier(username,password);const out=await this.request('/auth/login',{body:{username,verifier},auth:false});this.token=out.session.token;this.expiresAt=out.session.expires_at;this.user=out.user;this.offline=false;this.save();return out;},
    async restore(){if(!this.load())return false;if(this.expiresAt&&this.expiresAt<Date.now()){this.clear();return false;}try{const out=await this.request('/auth/me',{method:'GET'});this.user=out.user;this.offline=false;this.save();return true;}catch(e){if(['session_expired','unauthorized'].includes(e.code)){this.clear();return false;}this.offline=true;return !!this.user;}},
    async logout(){try{if(this.token)await this.request('/auth/logout',{body:{}});}catch{}this.clear();}
  };

  function b64url(bytes){let s='';for(const b of bytes)s+=String.fromCharCode(b);return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/g,'');}

  const Store = {
    scope:'guest',state:null,timer:null,
    key(){return `${APP_KEY}:${this.scope}`;},
    backupKey(){return this.key()+BACKUP_SUFFIX;},
    setScope(id){this.scope=String(id||'guest');},
    fresh(){return {version:1,currentDay:1,created:todayISO(),updatedAt:Date.now(),completedDays:[],day1:{lessonIndex:0,questionIndex:0,phase:'lesson',queue:DAY.questions.map(q=>q.id),answered:{},repairUsed:{},finished:false},skills:{},attempts:[]};},
    valid(x){return !!(x&&typeof x==='object'&&x.day1&&x.skills&&Array.isArray(x.attempts));},
    load(){let a=null,b=null;try{a=JSON.parse(localStorage.getItem(this.key())||'null');b=JSON.parse(localStorage.getItem(this.backupKey())||'null');}catch{}const rows=[a,b].filter(x=>this.valid(x)).sort((x,y)=>(y.updatedAt||0)-(x.updatedAt||0));this.state=rows[0]||this.fresh();this.normalize();return this.state;},
    normalize(){const s=this.state||this.fresh();s.version=1;s.currentDay=1;s.completedDays=Array.isArray(s.completedDays)?s.completedDays:[];s.skills=s.skills||{};s.attempts=Array.isArray(s.attempts)?s.attempts.slice(-500):[];s.day1=s.day1||{};s.day1.lessonIndex=Math.max(0,Number(s.day1.lessonIndex)||0);s.day1.questionIndex=Math.max(0,Number(s.day1.questionIndex)||0);s.day1.phase=s.day1.phase||'lesson';s.day1.queue=Array.isArray(s.day1.queue)&&s.day1.queue.length?s.day1.queue:DAY.questions.map(q=>q.id);s.day1.answered=s.day1.answered||{};s.day1.repairUsed=s.day1.repairUsed||{};s.day1.finished=!!s.day1.finished;this.state=s;},
    save(sync=true){this.normalize();this.state.updatedAt=Date.now();const text=JSON.stringify(this.state);try{const prev=localStorage.getItem(this.key());if(prev&&prev!==text)localStorage.setItem(this.backupKey(),prev);localStorage.setItem(this.key(),text);}catch{}if(sync)Cloud.schedule();},
    skill(id){return this.state.skills[id] ||= {mastery:0,attempts:0,correct:0,lastSeen:null,nextReview:null};}
  };

  const Cloud = {
    timer:null,status:'local',lastError:null,
    schedule(){if(!Auth.user||!Auth.token)return;clearTimeout(this.timer);this.timer=setTimeout(()=>this.push().catch(()=>{}),900);},
    chunks(state){const core={...state};delete core.skills;delete core.attempts;const chunks={core,skills:state.skills||{}};const at=state.attempts||[];for(let i=0;i<at.length;i+=100)chunks[`attempts:${Math.floor(i/100)}`]=at.slice(i,i+100);return chunks;},
    fromChunks(chunks){const s=Store.fresh();if(chunks.core?.data)Object.assign(s,chunks.core.data);s.skills=chunks.skills?.data||{};s.attempts=[];Object.keys(chunks).filter(k=>k.startsWith('attempts:')).sort((a,b)=>Number(a.split(':')[1])-Number(b.split(':')[1])).forEach(k=>{if(Array.isArray(chunks[k]?.data))s.attempts.push(...chunks[k].data);});return s;},
    async pull(){this.status='syncing';renderCloud();try{const out=await Auth.request('/sync/pull',{method:'GET'});this.status='synced';this.lastError=null;renderCloud();return out;}catch(e){this.status='offline';this.lastError=e;renderCloud();throw e;}},
    async push(){if(!Auth.user||!Auth.token)return;this.status='syncing';renderCloud();try{const chunks=this.chunks(Store.state);const items=Object.entries(chunks).map(([key,data])=>({key,data}));await Auth.request('/sync/push',{body:{chunks:items}});this.status='synced';this.lastError=null;renderCloud();}catch(e){this.status='offline';this.lastError=e;renderCloud();}},
    async bootstrap(newAccount=false){Store.setScope(Auth.user.id);Store.load();try{const out=await this.pull();const hasCloud=Object.keys(out.chunks||{}).length>0;if(hasCloud){const cloud=this.fromChunks(out.chunks);if((cloud.updatedAt||0)>=(Store.state.updatedAt||0)||!hasLocalProgress(Store.state)){Store.state=cloud;Store.save(false);}}else if(newAccount||hasLocalProgress(Store.state)){await this.push();}this.status='synced';}catch{this.status='offline';}renderCloud();}
  };

  function hasLocalProgress(s){return !!(s?.day1?.questionIndex||Object.keys(s?.day1?.answered||{}).length||s?.day1?.finished);}

  function allQuestions(){const map=new Map();DAY.questions.forEach(q=>map.set(q.id,q));Object.values(DAY.repairs).flat().forEach(q=>map.set(q.id,q));return map;}
  const QMAP=allQuestions();

  function shell(inner){
    const name=Auth.user?.username||'';
    $('#app').innerHTML=`<div class="app"><header class="topbar"><div class="brand"><small>南京工业大学 637 · 20天冲刺</small>有机实验室</div><div class="cloud"><span id="cloudDot" class="dot"></span><span id="cloudText">${name?esc(name):'未登录'}</span></div></header>${inner}</div>`;
    renderCloud();
  }

  function renderCloud(){const d=$('#cloudDot'),t=$('#cloudText');if(!d||!t)return;d.className='dot '+(!Auth.user?'offline':Cloud.status==='synced'?'synced':Cloud.status==='syncing'?'syncing':'offline');t.textContent=!Auth.user?'未登录':Cloud.status==='synced'?`${Auth.user.username} · 已同步`:Cloud.status==='syncing'?`${Auth.user.username} · 同步中`:`${Auth.user.username} · 本地保存`;}

  function loginPage(mode='login',msg=''){
    $('#app').innerHTML=`<div class="app login-wrap"><section class="panel login-card"><div class="kicker">南京工业大学 637 · 20天冲刺</div><h1 class="hero">有机实验室</h1><p class="lead">今天只学一小串，学会以后再往前走。</p><div class="field"><label>名字 / 账号</label><input id="user" autocomplete="username" placeholder="例如：111"></div><div class="field"><label>密码</label><input id="pass" type="password" autocomplete="${mode==='login'?'current-password':'new-password'}" placeholder="至少 6 位"></div>${msg?`<div class="error">${esc(msg)}</div>`:''}<div class="btn-row"><button id="submit" class="btn primary">${mode==='login'?'登录':'创建账号'}</button><button id="switch" class="btn soft">${mode==='login'?'第一次来？创建账号':'已经有账号？直接登录'}</button></div><p class="tiny" style="margin-top:18px">账号只需要名字和密码；学习进度会先保存在本机，再同步到云端。</p></section></div>`;
    $('#switch').onclick=()=>loginPage(mode==='login'?'register':'login');
    $('#submit').onclick=async()=>{
      const u=$('#user').value.trim().toLowerCase(),p=$('#pass').value;$('#submit').disabled=true;
      try{if(mode==='login')await Auth.login(u,p);else await Auth.register(u,p);await Cloud.bootstrap(mode==='register');location.hash='#home';route();}
      catch(e){loginPage(mode,e.message||'请求失败');}
    };
    $('#pass').addEventListener('keydown',e=>{if(e.key==='Enter')$('#submit').click();});
  }

  function homePage(){
    const s=Store.state,done=Object.keys(s.day1.answered||{}).length,total=DAY.questions.length,percent=s.day1.finished?100:Math.min(96,Math.round(done/total*100));
    shell(`<div class="home-grid"><section class="panel day-card"><div class="kicker">DAY 01 · π 键世界</div><h1>${esc(DAY.title)}</h1><p class="lead">${esc(DAY.subtitle)}</p><div class="chain"><span class="chip">找到 C=C</span><span>→</span><span class="chip">HBr</span><span>→</span><span class="chip">Br₂</span><span>→</span><span class="chip">Br₂/H₂O</span></div><div class="progress-line"><i style="width:${percent}%"></i></div><div class="tiny">今日进度 ${percent}% · 预计 ${DAY.estimatedMinutes} 分钟</div><div class="btn-row"><button id="start" class="btn primary">${s.day1.finished?'再看今天':'开始今天的学习'}</button><button id="logout" class="btn ghost">退出账号</button></div></section><aside class="side-stat"><div class="panel"><div class="kicker">学习原则</div><p style="line-height:1.8;margin-bottom:0">不随机跳章节。先把同一条反应链练成型，再加入近邻对比。</p></div><div class="panel"><div class="mini-card"><span class="tiny">已稳定技能</span><strong>${stableSkillCount()}</strong></div><div class="mini-card" style="margin-top:10px"><span class="tiny">今日错题修复</span><strong>${repairCount()}</strong></div></div></aside></div>`);
    $('#start').onclick=()=>{if(s.day1.finished){s.day1.phase='lesson';s.day1.lessonIndex=0;s.day1.questionIndex=0;s.day1.queue=DAY.questions.map(q=>q.id);s.day1.answered={};s.day1.repairUsed={};s.day1.finished=false;Store.save();}location.hash='#day1';route();};
    $('#logout').onclick=async()=>{await Cloud.push().catch(()=>{});await Auth.logout();Store.setScope('guest');location.hash='';loginPage('login');};
  }

  function stableSkillCount(){return Object.values(Store.state.skills||{}).filter(x=>(x.mastery||0)>=65).length;}
  function repairCount(){return Store.state.attempts.filter(x=>x.day===1&&x.repair===true&&x.correct).length;}

  function dayPage(){
    const d=Store.state.day1;
    if(d.finished)return finishPage();
    if(d.phase==='lesson'&&d.lessonIndex<DAY.lessons.length)return lessonPage(DAY.lessons[d.lessonIndex]);
    d.phase='questions';Store.save(false);
    const id=d.queue[d.questionIndex];
    if(!id){d.finished=true;if(!Store.state.completedDays.includes(1))Store.state.completedDays.push(1);Store.save();return finishPage();}
    const q=QMAP.get(id);if(!q){d.questionIndex++;Store.save();return dayPage();}
    questionPage(q);
  }

  function lessonPage(item){
    shell(`<section class="panel lesson-card"><div class="kicker">${esc(item.eyebrow)}</div><h1>${esc(item.title)}</h1><div class="lesson-body">${esc(item.body)}</div><div class="note">${esc(item.note)}</div><div class="footer-actions"><button class="link-btn" id="home">← 回首页</button><button class="btn primary" id="next">继续这一小串</button></div></section>`);
    $('#home').onclick=()=>{location.hash='#home';route();};
    $('#next').onclick=()=>{Store.state.day1.lessonIndex++;if(Store.state.day1.lessonIndex>=DAY.lessons.length)Store.state.day1.phase='questions';Store.save();dayPage();};
  }

  function questionPage(q){
    let selected=null,confidence='unsure',hints=0,submitted=false;
    const isRepair=q.id.startsWith('repair-');
    shell(`<section class="panel question-card"><div class="step-label">${isRepair?'修复题 · 同技能新结构':`Day 1 · 第 ${Math.min(Store.state.day1.questionIndex+1,DAY.questions.length)} 个判断`}</div><h2>${esc(q.prompt)}</h2><div class="formula">${esc(q.formula)}</div><div class="options">${q.options.map((x,i)=>`<button class="option" data-i="${i}">${String.fromCharCode(65+i)}. ${esc(x)}</button>`).join('')}</div><div class="confidence"><p>这次你有多确定？</p><button data-c="sure">我确定</button><button class="active" data-c="unsure">有点犹豫</button><button data-c="guess">我在猜</button></div><div id="hintBox"></div><div class="btn-row"><button id="hint" class="btn ghost">给我一点提示</button><button id="submit" class="btn primary" disabled>提交这个判断</button></div><div id="feedback"></div><div class="footer-actions"><button class="link-btn" id="home">← 先回首页</button><span class="tiny">答错不会扣分，会插入一道同技能变式。</span></div></section>`);
    document.querySelectorAll('.option').forEach(btn=>btn.onclick=()=>{if(submitted)return;selected=Number(btn.dataset.i);document.querySelectorAll('.option').forEach(x=>x.classList.remove('selected'));btn.classList.add('selected');$('#submit').disabled=false;});
    document.querySelectorAll('[data-c]').forEach(btn=>btn.onclick=()=>{if(submitted)return;confidence=btn.dataset.c;document.querySelectorAll('[data-c]').forEach(x=>x.classList.remove('active'));btn.classList.add('active');});
    $('#hint').onclick=()=>{if(submitted)return;hints=Math.min(2,hints+1);$('#hintBox').innerHTML=`<div class="hint">${esc(hints===1?q.hint1:q.hint2)}</div>`;if(hints>=2)$('#hint').disabled=true;};
    $('#home').onclick=()=>{location.hash='#home';route();};
    $('#submit').onclick=()=>{
      if(selected===null||submitted)return;submitted=true;const correct=selected===q.answer;
      document.querySelectorAll('.option').forEach((btn,i)=>{btn.disabled=true;if(i===q.answer)btn.classList.add('correct');else if(i===selected&&!correct)btn.classList.add('wrong');});
      document.querySelectorAll('[data-c]').forEach(x=>x.disabled=true);$('#hint').disabled=true;$('#submit').remove();
      recordAttempt(q,correct,confidence,hints,isRepair);
      if(!correct)queueRepair(q.skill);
      $('#feedback').innerHTML=`<div class="feedback"><strong>${correct?'答对了。':'这一步还没稳，没关系。'}</strong>${esc(q.explanation)}<div class="why"><b>为什么不是另一个？</b><br>${esc(q.whyNot)}</div><div class="btn-row"><button id="nextQ" class="btn ${correct?'primary':'soft'}">${correct?'继续':'看懂以后继续修复'}</button></div></div>`;
      $('#nextQ').onclick=()=>{Store.state.day1.answered[q.id]={correct,at:Date.now()};Store.state.day1.questionIndex++;Store.save();dayPage();};
    };
  }

  function queueRepair(skill){
    const pool=DAY.repairs[skill]||[],used=Store.state.day1.repairUsed[skill]||0;if(used>=pool.length)return;const candidate=pool[used];Store.state.day1.repairUsed[skill]=used+1;const insertAt=Store.state.day1.questionIndex+1;if(!Store.state.day1.queue.includes(candidate.id))Store.state.day1.queue.splice(insertAt,0,candidate.id);
  }

  function recordAttempt(q,correct,confidence,hints,isRepair){
    const sk=Store.skill(q.skill);sk.attempts++;if(correct)sk.correct++;sk.lastSeen=todayISO();let delta=correct?(hints===0?(confidence==='sure'?18:14):9):-6;if(isRepair&&correct)delta+=4;sk.mastery=Math.max(0,Math.min(100,(sk.mastery||0)+delta));sk.nextReview=addDays(todayISO(),correct?(sk.mastery>=70?4:2):1);
    Store.state.attempts.push({id:crypto.randomUUID?.()||String(Date.now()+Math.random()),day:1,questionId:q.id,skill:q.skill,correct,confidence,hints,repair:isRepair,at:Date.now()});Store.state.attempts=Store.state.attempts.slice(-500);Store.save();
  }

  function finishPage(){
    const rows=DAY.skills.map(s=>({label:s.label,m:Math.round(Store.state.skills[s.id]?.mastery||0)}));
    shell(`<section class="panel finish"><div class="big">🌱</div><div class="kicker">DAY 1 收口</div><h1>今天这一小串已经走完了</h1><p class="lead">没有再开新的章节。你今天只围绕 C=C、普通 HBr、Br₂ 和 Br₂/H₂O 建立第一张小地图。</p><div class="skills">${rows.map(x=>`<div class="skill-row"><span>${esc(x.label)}</span><b>${x.m}%</b></div>`).join('')}</div><div class="good">今天的错题已经被拆成同技能修复记录。后续复习会优先修“哪里不稳”，而不是把整章重新讲一遍。</div><div class="btn-row" style="justify-content:center"><button id="home" class="btn primary">回到今天</button></div></section>`);
    $('#home').onclick=()=>{location.hash='#home';route();};
  }

  function route(){if(!Auth.user)return loginPage('login');const h=location.hash||'#home';if(h==='#day1')dayPage();else homePage();}

  async function boot(){
    if(!DAY){$('#app').textContent='Day 1 数据没有加载';return;}
    const restored=await Auth.restore();
    if(restored){await Cloud.bootstrap(false);route();}
    else loginPage('login');
  }

  window.addEventListener('hashchange',()=>{if(Auth.user)route();});
  window.addEventListener('pagehide',()=>{if(Auth.user){Store.save();Cloud.push().catch(()=>{});}});
  boot();
})();
