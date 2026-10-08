(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};
  const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const list = x => Array.isArray(x) ? x : [];
  const clone = x => x == null ? null : JSON.parse(JSON.stringify(x));
  const formatScore = n => Number.isFinite(Number(n)) ? String(Math.round(Number(n) * 10)/10) : '0';
  const skillGuide = {
    alkene: ['先辨别试剂是亲电加成、自由基加成还是氧化裂解。只有把底物、催化条件和后处理一起看，才能判断区域选择性与氧化态。','Br₂/H₂O 通常经溴鎓离子，再由水攻击，形成邻位卤代醇；Br₂/惰性溶剂以卤离子开环形成邻二卤化物。HBr/ROOR 的自由基链加成常反马氏，臭氧化的产物取决于后处理的氧化/还原性质。'],
    substitution: ['先数与离去基相连的碳的取代程度，再查亲核试剂强弱、溶剂质子性以及离去基能力。一级中心加上强亲核试剂与极性非质子溶剂常偏 SN2；三级中心与离子化溶剂常偏 SN1/E1。','SN2 是背面进攻、成键断键协同，立体构型反转；SN1 经平面碳正离子，可能重排。实际 SN1/E1 比例仍受温度和亲核试剂影响，不能把“能形成碳正离子”等同于唯一通道。'],
    elimination: ['E2 发生在相邻碳：离去基所在位置叫 α-C，被碱夺取氢的位置叫 β-C。Cβ–H 的键电子建立 Cα=Cβ，同时 α-C 的离去基带走 C–X 键电子。','最有利的立体排列通常是 β-C–H 与 Cα–X 反式共平面，这使 σ(C–H) 与 σ*(C–X) 有利于轨道相互作用。环状体系还应审查是否存在满足这一几何条件的构象。'],
    carbonyl: ['C=O 由电负性差异极化：O δ−、羰基 C δ+，因此 Nu 进攻 C，而 C=O π 电子向 O 移动。格氏试剂提供碳亲核片段，酸化使烷氧负离子变醇。','醛酮受到亲核加成；Wittig 则通过膦叶立德与羰基形成中间体，最终把 C=O 更换为 C=C。考合成时要核对新增加的碳以及羟基中心的一级/二级/三级取代度。'],
    carboxyl: ['羧酸衍生物的酰基取代通常先由 Nu 进攻羰基碳，形成四面体中间体，之后再通过重建 C=O 排出离去基。判断活性不能只看 C=O，还需要比较离去基与杂原子的共振供电子。','酰氯通常反应性高，酰胺因氮的共振给电子显著减活化。Hofmann 反应与普通酰基取代不同：酰胺重排产生异氰酸酯，水解脱 CO₂ 后产物胺比起始酰胺少一个羰基碳。'],
    enolate: ['羰基碳的相邻碳叫 α-C；若这里有 H，适当碱可形成共振稳定的烯醇负离子。亲核性的碳端用于形成新的 C–C 键，而不是把所有反应画成 O 与 O 的结合。','Aldol 反应的亲核烯醇负离子 α-C 攻击另一分子的羰基 C；Michael 加成中的受体是 α,β-不饱和羰基，典型稳定碳亲核体在 β-C 上形成新键。注意具体底物可能改变 1,2/1,4 的竞争。'],
    aromatic: ['芳香性要求环状、平面、连续共轭，满足 Hückel 4n+2 π 电子规则；苯有 6π 电子，对应 n=1。亲电取代定位要把诱导效应和中间 σ-络合物共振稳定性分开判断。','硝基通常强致钝化且间位导向；卤素是例外：因 −I 效应使环失活，但孤对共振供电子使其整体表现为邻/对位定位。因此“失活”与“间位定位”不是必然同义。'],
    amine: ['胺的碱性取决于孤对接受质子的可用程度。脂肪族胺的氮孤对较局域；苯胺氮孤对与芳环共轭离域，因而常比类似脂肪族胺更弱。溶剂、取代基和立体位阻也会改变实测顺序。','芳香硝基可通过适宜的还原体系转成胺；苯胺易发生过度的亲电芳香取代，先乙酰化成为酰胺能降低过度活化并实现临时保护，后续水解可再恢复 –NH₂。'],
    diazonium: ['芳香伯胺在低温酸性亚硝酸体系形成 Ar–N₂⁺。温度常控制在 0–5 °C 左右以避免重氮盐过快分解；重氮盐的 N₂ 是很好的离去基。','ArN₂⁺ 与 CuCN 可经 Sandmeyer 型转化得到 Ar–CN；与水加热则能用 OH 取代重氮基生成酚。试剂决定引入的新基团，不能把 CuCN 的氰化和水解写成同一反应。'],
    structure: ['用不饱和度 DBE=(2C+2+N−H−X)/2 统计环和 π 键；IR 在约 1700 cm⁻¹ 左右的强吸收常提示羰基，但位置随具体官能团与共轭程度变化。','¹H NMR 的化学位移、积分和裂分必须联用。普通乙基 –CH₂CH₃ 在合适条件常呈 2H quartet 与 3H triplet，分别因相邻 3H 与 2H 的 n+1 裂分；只有当邻近氢等价及偶合清晰时这一简化才成立。'],
    stereo: ['CIP 规则先比较直接连接手性中心或双键碳的原子的原子序数；若相同才逐层向外比较。Br(35) > O(8) > C(6) > H(1)。','R/S 判断中必须把最低优先基朝后：这时 1→2→3 顺时针为 R，逆时针为 S；若最低优先基朝前要反转结论。E/Z 则在双键两端分别选高优先基，同侧为 Z、异侧为 E。'],
    ranking: ['反应性排序首先保证比较的是同一个机制和可比的试剂、溶剂、底物类型，否则只有经验趋势不能当普遍定量速率。酸性看共轭碱稳定性，SN2 看背面进攻位阻。','物性排序要看分子间作用力；相似相对分子质量下，醇中的 O–H 通常既能提供也能接受氢键，而普通醚缺少 O–H 氢键供体，因此醇常具有更高沸点。'],
    mechanism: ['曲箭符号跟踪一对电子：箭尾从现存的孤对或化学键出发，箭头终点指向电子接受的原子或新形成的键。正电荷本身不是电子的来源。','羰基亲核加成需画 Nu: → 羰基 C，同时 C=O π → O；卤代烷离去则从 C–Br 键指向 Br，表示 Br 带走电子对形成 Br⁻。数电子与价态可检查箭头是否自洽。'],
    synthesis: ['做合成题先画碳骨架与官能团之间的差异，再逆向寻找能够建立目标键的反应。CN⁻ 在合适的一级卤代烷 SN2 中把氰基碳带入骨架，因此净增加一个 C。','普通酮还原会得到二级醇；Grignard 试剂与游离 O–H 会快速发生酸碱反应而被淬灭，因而进行亲核羰基加成前通常需要处理可反应的酸性质子。每一步都应核对碳数和官能团兼容性。']
  };
  function guideFor(question) {
    const prewritten=NS.ExamExplanations?.[question.id];
    if (prewritten) return prewritten;
    const pool=String(question.id||'').match(/^d20-([a-z]+)-/);
    const group=pool?.[1] || 'mechanism';
    const parts=skillGuide[group] || skillGuide.mechanism;
    const correct=(question.options||[]).filter(x=>Array.isArray(question.answer) ? question.answer.includes(x.id) : x.id===question.answer).map(x=>x.label).join('、') || question.explanationLayers?.short || '请按题干条件核对';
    return {title:'第20天换结构迁移：'+String(question.primarySkill||group).replaceAll('.', ' · '),
      from:question.formula || question.prompt,
      to:correct,
      steps:[
        '本题正确结论是“'+correct+'”。题目问的是：'+question.prompt+'。先把题干中关键官能团、试剂、反应位点与题设条件列出来，排除仅凭选项位置猜测的做法。'+(question.explanationLayers?.short||''),
        ...parts,
        '回头检查干扰项：'+(question.options||[]).filter(x=>x.id!==question.answer).map(x=>x.label).join('、')+'。错误选择通常是把另一类反应的条件、区域性、立体性或反应机制错误套用；对照题中指定条件，逐项写出不能成立的关键一环。'
      ]};
  }
  function verdict(question,payload){
    if(!payload || typeof payload!=='object')return {choice:'旧答题记录未保存具体选项',hasAnswer:false};
    const labels=new Map((question.options||[]).map(x=>[String(x.id),String(x.label||x.id)]));
    const nodeNames=new Map((question.items||[]).map(x=>[String(x.id),String(x.label||x.id)]));
    const hs=new Map((question.hotspots||[]).map(x=>[String(x.id),String(x.label||x.id)]));
    const edges=new Map((question.graph?.edges||[]).map(x=>[String(x.id),String(x.choice||x.reagent||x.id)]));
    const arrow=rows=>list(rows).map(x=> (hs.get(String(x.source))||x.source)+' → '+(hs.get(String(x.target))||x.target)).join('；');
    const sequence=(v,map)=>list(v).map(id=>map.get(String(id))||String(id)).join(' → ');
    if(question.type==='multi-choice')return {choice:list(payload.selected).map(v=>labels.get(String(v))||String(v)).join('；')||'未选',hasAnswer:true};
    if(question.type==='ranking')return {choice:sequence(payload.order,nodeNames),hasAnswer:true};
    if(question.type==='electron-arrow')return {choice:arrow(payload.arrows),hasAnswer:true};
    if(question.type==='route'||question.graph)return {choice:sequence(payload.path,edges),hasAnswer:true};
    return {choice:labels.get(String(payload.selected))||String(payload.value??payload.selected??'未填'),hasAnswer:true};
  }
  function rightAnswer(q){
    const ans=q.answer,opts=new Map((q.options||[]).map(o=>[String(o.id),String(o.label||o.id)]));
    if(q.type==='ranking')return list(q.correctOrder||ans).map(k=>(q.items||[]).find(x=>String(x.id)===String(k))?.label||k).join(' → ');
    if(q.type==='route')return list(ans?.preferredPath||q.graph?.referenceRoutes?.[0]).map(k=>(q.graph?.edges||[]).find(x=>x.id===k)?.choice||k).join(' → ');
    if(q.type==='electron-arrow'){const hs=new Map((q.hotspots||[]).map(x=>[x.id,x.label]));return list(ans).map(a=>(hs.get(a.source)||a.source)+' → '+(hs.get(a.target)||a.target)).join('；');}
    if(Array.isArray(ans))return ans.map(x=>opts.get(String(x))||x).join('；');
    return opts.get(String(ans))||String(ans??'—');
  }
  function scheme(question,guide){
    const a=String(guide.from||question.formula||'').trim();
    const b=String(guide.to||'').trim();
    const wrap=(str,max=27)=>{const xs=[...str];const out=[];for(let i=0;i<xs.length;i+=max)out.push(xs.slice(i,i+max).join(''));return out.slice(0,3);};
    const ra=wrap(a),rb=wrap(b);
    const id='arr_'+String(question.id).replace(/[^a-z0-9]/gi,'_');
    const segment=(lines,x)=>lines.map((str,i)=>'<text x="'+x+'" y="'+(98+i*23)+'" text-anchor="middle">'+esc(str)+'</text>').join('');
    return '<svg class="paper-scheme" viewBox="0 0 850 185" role="img" aria-label="化学结构式与反应路径图"><defs><marker id="'+id+'" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/></marker></defs><rect x="9" y="22" width="355" height="145" rx="12" class="scheme-box"/><rect x="489" y="22" width="352" height="145" rx="12" class="scheme-box"/><text x="25" y="42" class="scheme-title">起始结构 / 已知条件</text><text x="505" y="42" class="scheme-title">产物 / 判别结论</text><g class="scheme-chem">'+segment(ra,185)+segment(rb,665)+'</g><line x1="375" y1="97" x2="475" y2="97" stroke="currentColor" stroke-width="3" marker-end="url(#'+id+')"/></svg>';
  }
  function illustration(q,guide){
    const original=q.stemStructure?.svg||q.svg||q.baseSvg;
    return '<div class="paper-chemical-visual">'+scheme(q,guide)+(original?'<details class="paper-original-figure"><summary>查看题目原始结构／机理反应图</summary><div class="paper-trusted-svg">'+original+'</div></details>':'')+'</div>';
  }
  function render(root, config){
    const rows=list(config.rows).filter(r=>r.question);
    let wrongOnly=false;
    root.innerHTML='<section class="paper-review"><header class="paper-review-head"><div class="kicker">'+esc(config.title||'原卷核对')+'</div><h1>返回试题卷 · 逐题核对</h1><p>保留当时的作答记录，显示你实际选择的答案、正确答案与错因；解析只在交卷后开放，点开可详细阅读，收起可继续核对下一题。</p><div class="paper-review-stats"><strong>'+esc(config.scoreLabel||'')+'</strong><span>共 '+rows.length+' 题 · 正确 '+rows.filter(r=>r.correct).length+' 题 · 需复盘 '+rows.filter(r=>!r.correct).length+' 题</span></div></header><div class="paper-review-actions"><button class="btn soft" id="paperAllOpen">展开全部解析</button><button class="btn ghost" id="paperAllClose">收起全部解析</button><button class="btn ghost" id="paperOnlyWrong" aria-pressed="false">只看错题</button><button class="btn primary" id="paperRetry">↻ 刷新重做</button><button class="btn ghost" id="paperBack">← 返回成绩页</button></div><nav class="paper-jump" aria-label="跳转题号">'+rows.map((r,i)=>'<a class="'+(r.correct?'correct':'wrong')+'" href="#paper-item-'+(i+1)+'">'+(i+1)+'</a>').join('')+'</nav><div id="paperItems">'+rows.map((r,i)=>{const q=r.question,guide=guideFor(q),v=verdict(q,r.payload),right=rightAnswer(q),fraction=Math.max(0,Math.min(1,Number(r.partialScore ?? (r.correct?1:0))||0));const block=guide.steps.map((s,j)=>'<section class="paper-explain-section"><b>'+(j===0?'① 核心机理与步骤':j===1?'② 化学依据与结构判断':j===2?'③ 易错点和选项排除':'④ 迁移与补充理解')+'</b><p>'+esc(s)+'</p></section>').join('');const optionHtml=(q.options||[]).map((o,oi)=>{const sel=Array.isArray(r.payload?.selected)?r.payload.selected.map(String).includes(String(o.id)):String(r.payload?.selected)===String(o.id);const good=Array.isArray(q.answer)?q.answer.map(String).includes(String(o.id)):String(q.answer)===String(o.id);return '<div class="paper-option '+(good?'is-answer ':'')+(sel?'was-picked ':'')+(sel&&!good?'wrong-pick':'')+'"><span>'+String.fromCharCode(65+oi)+'</span><b>'+esc(o.label||o.id)+'</b><em>'+(sel?'你的选择 ':'')+(good?'✓ 正确项':'')+'</em></div>';}).join('');return '<article class="paper-question '+(r.correct?'paper-right':'paper-wrong')+'" id="paper-item-'+(i+1)+'" data-wrong="'+(!r.correct)+'"><div class="paper-question-top"><span>第 '+(i+1)+' 题 · '+esc(q.type)+' · '+esc(q.points||'')+' 分</span><b class="'+(r.correct?'paper-tag-right':'paper-tag-wrong')+'">'+(r.correct?'✓ 回答正确':fraction>0?'△ 部分得分':'✕ 回答错误')+'</b></div><h2>'+esc(q.prompt)+'</h2>'+ (q.formula?'<div class="paper-question-formula">'+esc(q.formula)+'</div>':'')+ optionHtml+'<div class="paper-comparison"><div><small>你当时的答案</small><strong>'+esc(v.choice)+'</strong></div><div><small>正确答案</small><strong>'+esc(right)+'</strong></div></div>'+(q.type==='ranking'||q.type==='electron-arrow'||q.type==='route'?'<div class="paper-score-detail">该题匹配度 / 部分得分：'+formatScore(fraction*100)+'%</div>':'')+'<details class="paper-details"><summary>展开超级详细解析、反应结构式与错因 <span>⌄</span></summary><div class="paper-explanation"><h3>'+esc(guide.title)+'</h3>'+illustration(q,guide)+block+'<div class="paper-answer-note"><b>最后核对：</b>'+esc(right)+'</div></div></details></article>';}).join('')+'</div><div class="paper-review-actions paper-bottom"><button class="btn primary" id="paperRetryBottom">↻ 刷新重做</button><button class="btn ghost" id="paperBackBottom">回成绩页</button></div></section>';
    root.querySelector('#paperAllOpen').onclick=()=>root.querySelectorAll('.paper-details').forEach(x=>x.open=true);
    root.querySelector('#paperAllClose').onclick=()=>root.querySelectorAll('.paper-details').forEach(x=>x.open=false);
    root.querySelector('#paperOnlyWrong').onclick=e=>{wrongOnly=!wrongOnly;e.target.setAttribute('aria-pressed',String(wrongOnly));e.target.textContent=wrongOnly?'显示全部题目':'只看错题';root.querySelectorAll('.paper-question').forEach(x=>{x.hidden=wrongOnly&&x.dataset.wrong!=='true';});};
    const back=()=>config.onBack?.(),retry=()=>{if(window.confirm('重新作答会开始一次新的练习；原来的分数和答案将保留在历史记录中。确认继续？'))config.onRetry?.();};
    for(const id of ['paperBack','paperBackBottom'])root.querySelector('#'+id).onclick=back;
    for(const id of ['paperRetry','paperRetryBottom'])root.querySelector('#'+id).onclick=retry;
  }
  NS.ExamReview={render,verdict,rightAnswer,guideFor};
})();