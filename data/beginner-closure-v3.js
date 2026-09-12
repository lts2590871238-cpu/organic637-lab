(function () {
  'use strict';
  const Data = window.Organic637Data = window.Organic637Data || {};
  Data.days = Data.days || {};

  const extraGlossary = [
    {term:'实楔 / 虚线楔',aliases:['实楔','虚线楔','楔线'],plain:'二维纸面用来表示“朝你/背你”的空间符号：实楔粗的一端朝观察者，虚线楔表示伸向纸面后方。',why:'SN2 的“背面进攻”和构型翻转如果不先看懂楔线，图会像莫名其妙换位置。',limit:'它只是空间方向的画法；今天只用来读“朝你/背你”，更系统的立体命名放到后面的立体化学日再学。',diagram:'wedge-dash'},
    {term:'氢键',aliases:['氢键'],plain:'当 H 连在 O/N/F 等较强拉电子原子上时，这个 H 会明显偏正，可与另一分子的孤对电子产生较强吸引。',why:'水、醇会用氢键把阴离子亲核体“包住”，让它更难直接扑向碳。',limit:'氢键不是新的共价键，强度和距离都不同。',diagram:'hydrogen-bond'},
    {term:'溶剂化',aliases:['溶剂化'],plain:'溶剂分子围在离子或分子周围并稳定它的过程。',why:'同一个 CN⁻ 在不同溶剂里“被包得紧不紧”不同，因此 SN2 速度会变。',limit:'不是所有溶剂化都靠氢键，也有离子–偶极等作用。',diagram:'solvation'},
    {term:'极性质子溶剂',aliases:['极性质子溶剂','质子溶剂'],plain:'能提供 O–H 或 N–H、可以较强氢键溶剂化阴离子的极性溶剂，例如水、甲醇、乙醇。',why:'它们擅长稳定离子，常帮助 SN1 电离，却会把小阴离子亲核体包得更紧。',limit:'“有利 SN1/不利 SN2”只是常见趋势，还要看底物和亲核体。',diagram:'protic-solvent'},
    {term:'极性非质子溶剂',aliases:['极性非质子溶剂','非质子溶剂','DMSO','DMF','丙酮作溶剂'],plain:'本身很极性，却没有 O–H/N–H 去强氢键包住阴离子的溶剂，例如 DMSO、DMF、丙酮。',why:'它能溶解离子，同时让阴离子亲核体更“裸露”，因此常加快 SN2。',limit:'这不是说所有非质子溶剂都同样好，也不是说它们完全不溶剂化离子。',diagram:'aprotic-solvent'},
    {term:'速率式',aliases:['速率式','v = k','速率方程'],plain:'用实验告诉你“反应速度对哪些浓度敏感”的式子。例如 v=k[RX][Nu⁻] 表示底物和亲核体浓度都变会影响速率。',why:'它能反推慢步骤里实际参与了哪些粒子，是区分 SN1/SN2 的硬证据。',limit:'速率式来自实验，不能只靠总反应式想当然写出。',diagram:'rate-law'},
    {term:'慢步骤 / 决速步',aliases:['慢步骤','决速步','速率决定步骤'],plain:'多步反应里最难跨过、最拖慢整体速度的那一步。',why:'速率式通常主要反映决速步里有哪些粒子。',limit:'复杂机理中可能出现预平衡或多个相近能垒。',diagram:'rate-determining'},
    {term:'过渡态',aliases:['过渡态'],plain:'旧键正在断、新键正在成时经过的最高能量“山顶姿势”。它不是能单独装瓶的中间体。',why:'SN2 为什么要求背面进攻，本质上要比较哪种过渡态轨道重叠更好、能垒更低。',limit:'过渡态不是稳定结构，通常用 ‡ 表示。',diagram:'transition-state'},
    {term:'电离',aliases:['电离'],plain:'一根极性共价键异裂，产生带电粒子的过程。例如 R–Br → R⁺ + Br⁻。',why:'SN1 的第一步就是让离去基先带走键电子，真的生成碳正离子。',limit:'能不能电离取决于底物、离去基和溶剂稳定能力。',diagram:'ionization'},
    {term:'协同反应',aliases:['协同','协同反应'],plain:'多个成键/断键变化在同一个基本步骤里一起发生，中间没有可分离的离子中间体。',why:'氢硼化、E2、Diels–Alder 等很多“同时动几根键”的过程可以用这个概念理解。',limit:'“同时”是同一势能面上的单步过程，不代表每根键在同一瞬间完全同程度变化。',diagram:'concerted'},
    {term:'顺式 / 反式',aliases:['顺式','反式','cis','trans'],plain:'在能定义同/异侧的结构里，关键基团位于同一侧常叫顺式 cis，位于相对两侧常叫反式 trans。',why:'Lindlar 还原和溶解金属还原最直观的区别之一就是新 H 从同侧还是异侧进入。',limit:'复杂烯烃更严谨要用 E/Z；那套优先级到 Day15 再学。',diagram:'cis-trans'},
    {term:'端炔银盐检验',aliases:['氨性 AgNO₃','炔银','银盐沉淀'],plain:'具有 ≡C–H 的端炔可在合适氨性银盐条件下形成难溶炔银盐沉淀；内炔没有这个端氢。',why:'它是结构推断里很“硬”的化学证据，可以直接区分端炔和内炔。',limit:'这是经典定性检验语境，不代表所有条件下都能随意混用银盐。',diagram:'silver-test'},
    {term:'烯醇 / 酮式互变',aliases:['烯醇','酮式','互变异构','互变'],plain:'某些羰基化合物可在“C=O + α-H”和“C=C–OH”两种连接方式之间通过质子转移和 π 键移动互相转化。',why:'炔烃水合常先得到烯醇，但最后稳定产物通常是醛或酮。',limit:'平衡位置依结构和条件而变，不能把烯醇当作永远不存在。',diagram:'tautomerization'},
    {term:'保护 / 兼容性',aliases:['兼容性','官能团兼容','保护'],plain:'多步反应里，某个试剂除了改目标位点，还可能顺手攻击别的官能团；“兼容性”就是检查这些位点能不能和平共处，必要时先暂时保护敏感位点。',why:'这能解释为什么缩醛保护不是炫技，而是在给后续强亲核/碱性步骤腾出安全空间。',limit:'不是所有路线都需要保护；保护和脱保护也会增加步骤。',diagram:'compatibility'},
    {term:'Clemmensen / Wolff–Kishner',aliases:['Clemmensen','Wolff–Kishner','Wolff-Kishner'],plain:'两类把醛/酮的 C=O 最终变成 CH₂ 的经典方法：Clemmensen 常用 Zn(Hg)/HCl 偏酸性；Wolff–Kishner 常用 NH₂NH₂/KOH、高温偏碱性。',why:'它们实现相同“羰基 → 亚甲基”结果，但酸碱环境不同，所以路线兼容性不同。',limit:'不是普通“还原成醇”，而是进一步去掉羰基氧。',diagram:'carbonyl-to-methylene'},
    {term:'非对映体',aliases:['非对映体'],plain:'立体异构体中，彼此不是镜像关系的一类。常见情况是多个立体中心里“有些相同、有些不同”。',why:'它们物性通常不同，所以不能像对映体那样简单当成镜像成对。',limit:'E/Z 异构体也属于非对映关系的一种广义情形。',diagram:'diastereomer'},
    {term:'meso',aliases:['meso','内消旋'],plain:'分子有多个立体中心，但因为内部对称性，整体仍与镜像重合，因此总体不手性。',why:'它提醒你“有立体中心 ≠ 整个分子一定手性”。',limit:'必须真的检查整体对称性，不能只数 R/S 数量。',diagram:'meso'}
  ];

  const glossary = Array.isArray(Data.BEGINNER_GLOSSARY) ? Data.BEGINNER_GLOSSARY : [];
  const byTerm = new Map(glossary.map(x => [x.term, x]));
  extraGlossary.forEach(item => { if (!byTerm.has(item.term)) glossary.push(item); });
  Data.BEGINNER_GLOSSARY = glossary;
  const omp = glossary.find(x => x.term === '邻/间/对位');
  if (omp) omp.aliases = ['邻位定位','间位定位','对位定位','邻/间/对位','ortho','meta','para'];

  function q(day, id) { return Data.days?.[day]?.questions?.find(row => row.id === id); }
  function lesson(day, id) { return Data.days?.[day]?.lessons?.find(row => row.id === id); }
  function insertAfter(day, afterId, item) {
    const lessons = Data.days?.[day]?.lessons;
    if (!Array.isArray(lessons) || lessons.some(x => x.id === item.id)) return;
    const idx = lessons.findIndex(x => x.id === afterId);
    lessons.splice(idx >= 0 ? idx + 1 : lessons.length, 0, item);
  }

  // ---------- Day 1: absolutely no Day 2 vocabulary leakage ----------
  let x = q(1, 'hbr-1');
  if (x) x.prompt = '丙烯只与 HBr 反应。按今天学过的普通离子型加成，主产物是哪一个？';
  x = q(1, 'd01-hbr-butene-01');
  if (x) x.prompt = '把骨架换成 1-丁烯。只与 HBr 反应时，Br 主要落在哪个碳？';
  x = q(1, 'd01-carbocation-01');
  if (x) x.explanationLayers.full = '在今天的基础模型里，二级碳正离子旁边有更多 C–H/C–C σ 键可通过超共轭与空 p 轨道重叠，使正电荷不那么集中，因此通常比一级更稳定。';
  x = q(1, 'd01-br2-vs-nbs-01');
  if (x) {
    x.prompt = '环己烯与 Br₂/CCl₄ 反应。根据今天刚学过的 Br₂ 加成，最应该想到哪一种变化？';
    x.hints = ['先只看今天已经学过的 Br₂/CCl₄：双键两端分别接上 Br。'];
    x.explanationLayers = {
      short:'C=C 被消耗，原双键两个碳各接一个 Br。',
      why:'Br₂ 在这组条件下对烯烃发生加成；你只需要沿着原 C=C 找两个新 C–Br 键。',
      full:'把反应前后的骨架叠在一起看：环大小不变，只有 C=C 的 π 部分被换成两个新的 C–Br σ 键。后面遇到其它含 Br 的条件时，我们会在它第一次出现时重新解释。'
    };
    x.options = [
      {id:'a',label:'C=C 消失，原双键两个碳各接 Br'},
      {id:'b',label:'C=C 完全不变，也没有任何新键'},
      {id:'c',label:'只生成一个 C–OH'}
    ];
  }
  x = q(1, 'condition-1');
  if (x) x.options = [{id:'a',label:'Br₂/H₂O'},{id:'b',label:'Br₂/CCl₄'},{id:'c',label:'HBr'}];
  x = q(1, 'd01-final-switch-01');
  if (x) x.formula = '起始分子的 C=C + 完整条件 → 先判反应类型 → 再判连接位置';
  x = q(1, 'd01-formula-01');
  if (x) x.explanationLayers.full = '简单开链单烯烃通式是 CₙH₂ₙ。你可以从相应烷烃 CₙH₂ₙ₊₂ 想：形成一个 C=C 后，总共少 2 个 H，所以 n=4 时是 C₄H₈。';
  const d1Br = lesson(1,'d01-lesson-bromine');
  if (d1Br) {
    d1Br.body += ' Br 是溴，F/Cl/Br/I 这一族统称卤素；今天只需要知道“Br₂ 是两个溴原子组成的试剂”。';
    d1Br.whyChain = [
      '为什么 Br₂ 能在双键处反应？因为 C=C 的 π 电子云比较暴露，靠近 Br₂ 时会使 Br–Br 键发生极化。',
      '为什么最后两个双键碳各接一个 Br？因为原来的 π 电子被重新分配去形成 C–Br，新来的 Br⁻ 再把另一侧电子缺口补上。',
      '为什么碳骨架没断？因为原 C–C 的 σ 主连接仍保留；改变的是 π 这一层连接。'
    ];
  }

  // ---------- Day 2: teach every new condition before it is tested ----------
  insertAfter(2,'d02-zero-03-cut-double',{
    id:'d02-zero-04-hydroboration',eyebrow:'Day 2 · 第一次看 BH₃·THF',
    title:'氢硼化不是“反着背马氏”：先看 H 和 B 为什么一起加上去',
    body:'BH₃ 里的 B 只有 6 个价层电子，电子偏缺；烯烃 π 电子可以和 B 相互作用。同时 B–H 键把 H 送到另一个双键碳，两个变化在同一个基本步骤里协同发生，因此没有自由碳正离子。B 更倾向去空间较不拥挤、取代较少的一端；第二步 H₂O₂/OH⁻ 再把 C–B 换成 C–OH。',
    note:'先抓两个结果：OH 最后落在较少取代碳；H 和 OH 的净结果来自同一侧（syn）。“syn”今天就在这里第一次解释。',
    formulas:['1) BH₃·THF  2) H₂O₂/OH⁻','C=C → H–C–C–OH（OH 到较少取代端）'],
    analogy:{title:'像两个人从同一扇门一起进场',body:'H 和 B 不是一个先进去等很久、另一个再来，而是在一个协同步骤里同时重新分配键。',boundary:'真实过程由四中心过渡态和轨道极性控制，不是两个实体并排走路。'},
    sequence:[
      {title:'先看 B 为什么“缺电子”',text:'BH₃ 中 B 只有 6 个价层电子，有可接受电子的空轨道。',formula:'BH₃：B 电子不足',diagram:'borane-poor'},
      {title:'π 电子靠近 B',text:'双键提供电子密度；B 更靠近较少取代、空间更空的一端。',formula:'π → B',diagram:'hydroboration-approach'},
      {title:'B–H 同时把 H 送到另一端',text:'成 C–B 与 C–H 在同一步协同变化。',formula:'C=C + H–B → H–C–C–B',diagram:'hydroboration'},
      {title:'第二步把 B 换成 OH',text:'氧化处理保留碳位置，因此最终 OH 在原来 B 所在位置。',formula:'C–B → C–OH',diagram:'hydroboration-oxidation'},
      {title:'syn 是什么意思',text:'如果从空间上看两个新基团来自同一侧，就叫 syn；Day15 再系统学立体标记。',formula:'同侧加入 = syn',diagram:'syn'}
    ],
    whyChain:[
      '为什么不走碳正离子？因为氢硼化是协同单步，没有先独立生成 C⁺。',
      '为什么区域方向会和普通 HBr 不一样？因为控制它的不是“哪边形成更稳定 C⁺”，而是四中心过渡态中的电子和空间因素。',
      '为什么第二步能得到醇？因为氧化把 C–B 键的位置转换成 C–O，再经质子化得到 –OH。'
    ],
    microCheck:{prompt:'氢硼化–氧化里，为什么不能直接套“先形成更稳定碳正离子”？',options:['因为这一步是协同过程，没有自由碳正离子','因为反应里没有电子','因为 C=C 没有参与'],answer:0,feedback:'对，换机理以后，控制方向的理由也必须跟着换。'}
  });
  insertAfter(2,'d02-zero-04-hydroboration',{
    id:'d02-zero-05-hydrogenation',eyebrow:'Day 2 · 第一次看 H₂/Pd',
    title:'催化加氢：金属表面把 H₂ 和 π 键都“按住”，再把 H 接上去',
    body:'单独让 H₂ 去撞烯烃并不容易。Pd/Pt/Ni 这类金属表面可以吸附 H₂ 和烯烃，让 H–H 键和 π 键都更容易被重新组织，于是两个 H 加到原 C=C 两端，双键变单键。',
    formulas:['C=C + H₂  ─Pd/Pt/Ni→  C–C','每个原双键碳多接一个 H'],
    analogy:{title:'像在工作台上把两样东西固定住再装配',body:'金属表面把氢和多键都放到容易接触的位置，所以原本难发生的换键过程能走更低能垒。',boundary:'表面催化涉及吸附、解离和多步表面过程，不是“金属拿手按住”。'},
    sequence:[
      {title:'H₂ 先在金属表面被活化',text:'H–H 更容易断成吸附的 H。',formula:'H–H → 2 H(surface)',diagram:'hydrogen-surface'},
      {title:'C=C 也靠在表面',text:'π 电子与金属作用，双键被活化。',formula:'C=C @ Pd',diagram:'alkene-surface'},
      {title:'两个 H 依次接到原双键碳',text:'π 键消失，C–C σ 保留。',formula:'C=C → H–C–C–H',diagram:'hydrogenation'}
    ],
    microCheck:{prompt:'催化加氢最直观的“原子账”是什么？',options:['C=C 两端各多一个 H','整条碳链被剪开','只去掉一个 H'],answer:0,feedback:'对，先把双键变单键，再给两端各补一个 H。'}
  });
  insertAfter(2,'d02-zero-05-hydrogenation',{
    id:'d02-zero-06-nbs',eyebrow:'Day 2 · 第一次看 NBS / hν',
    title:'NBS 不是“另一个 Br₂”：它要找的是双键旁边的烯丙位 H',
    body:'先给“烯丙位”下定义：紧挨 C=C、但不在双键上的那个 sp³ 碳叫烯丙位。这里的 C–H 被抽走后，留下的自由基可以和旁边 C=C 共振，也就是未配对电子可以在一段连续 p 轨道上离域，所以这个自由基相对稳定。NBS 在光照 hν 下维持低浓度溴源，常让反应走烯丙位自由基取代，而不是直接把大量 Br₂ 加到双键上。',
    formulas:['C=C–CH₂–H  →  C=C–CH·  ↔  ·C–C=CH','NBS / hν → 烯丙位 Br；C=C 总体保留'],
    analogy:{title:'像双键旁边有一条“可分摊压力的走廊”',body:'烯丙位生成自由基后，未配对电子不必死守在一个碳上，可以借连续 p 轨道把电子密度分散到相邻位置。',boundary:'共振不是粒子在两个结构之间来回跳，而是同一个离域电子结构的不同画法。'},
    sequence:[
      {title:'先认烯丙位',text:'只圈紧挨双键、但自己不是双键碳的那个碳。',formula:'C=C–[CH₂]–H',diagram:'allylic'},
      {title:'光照开启自由基链',text:'hν 表示光能可帮助引发单电子过程。',formula:'hν → radical chain',diagram:'radical-chain'},
      {title:'先抽烯丙位 H',text:'得到的烯丙基自由基能共振离域。',formula:'C=C–CH· ↔ ·C–C=CH',diagram:'allyl-resonance'},
      {title:'再接 Br',text:'最终是 H 被 Br 换掉，而原双键整体保留。',formula:'C=C–CH₂H → C=C–CH₂Br',diagram:'nbs'}
    ],
    whyChain:[
      '为什么偏偏抽烯丙位 H？因为生成的烯丙基自由基能通过共振分散未配对电子，能量更低。',
      '为什么 NBS 不等于 Br₂/CCl₄？因为它的使用条件和溴浓度设计是为了自由基取代路径，而 Br₂/CCl₄ 典型是双键加成。'
    ],
    microCheck:{prompt:'NBS/hν 的基础判断里，哪一部分通常保留？',options:['原 C=C','所有 C–H','所有 Br 都不进入分子'],answer:0,feedback:'对，先记“烯丙位 H → Br；C=C 总体保留”。'}
  });
  const d2Branch = lesson(2,'d02-lesson-branches');
  if (d2Branch) d2Branch.body += ' 这里的“syn”只表示同侧加入；顺/反、E/Z 的完整空间判定以后再学。';
  x = q(2,'d02-hydroboration-01');
  if (x) {
    x.hints = ['先回想：B 在第一步偏向较少取代、空间较空的一端。','第二步只是把原 C–B 的位置换成 C–OH。'];
    x.explanationLayers.full = '第一步 H/B 协同加到双键两端，B 偏向末端碳；第二步 H₂O₂/OH⁻ 把 C–B 转成 C–O，并保持这个碳的位置，所以得到 CH₃CH₂CH₂CH₂OH。';
  }

  // ---------- Day 3: no SN2/E2, no IR/NMR, no E/Z before they are taught ----------
  insertAfter(3,'d03-zero-02-carbon-nucleophile',{
    id:'d03-zero-02b-alkylation-door',eyebrow:'Day 3 · 炔负离子怎么把碳链接长',
    title:'先不背 SN2：只看“带电子的碳从背后把 Br 顶走”',
    body:'炔负离子的末端碳带有可用电子对。它要形成新的 C–C 键，需要找一个“连着离去基、而且周围不拥挤”的碳。甲基或一级卤代烃的这个碳比较容易从背后接近，所以炔负离子能一边成 C–C，一边把 C–Br 键电子推给 Br。Day4 才给这套动作正式命名为 SN2。',
    note:'今天先学动作，不提前背章节名：电子对 → 卤代烃碳；C–Br 键电子 → Br。',
    formulas:['RC≡C:⁻ + CH₃CH₂–Br → RC≡C–CH₂CH₃ + Br⁻'],
    analogy:{title:'像从门背后换掉门栓',body:'如果门口堆满大箱子，很难从背后靠近；小而不拥挤的碳更容易让这个同步“接上—推出”过程发生。',boundary:'真正原因是轨道重叠与位阻，不是实体门。'},
    sequence:[
      {title:'电子从哪里来',text:'炔负离子末端碳有一对可用电子。',formula:'RC≡C:⁻',diagram:'acetylide'},
      {title:'要打哪里',text:'找 C–Br 中与 Br 直接相连、而且不拥挤的碳。',formula:':C⁻ → CH₂–Br',diagram:'electrophilic-carbon'},
      {title:'新 C–C 成键',text:'电子对变成新的 C–C σ 键。',formula:'C:⁻ → C  ⇒  C–C',diagram:'cc-bond'},
      {title:'旧 C–Br 同时离开',text:'原 C–Br 键电子归 Br，得到 Br⁻。',formula:'C–Br → Br⁻',diagram:'leaving-br'}
    ],
    microCheck:{prompt:'为什么优先选一级卤代烃，而不是周围塞满三个甲基的三级碳？',options:['一级碳背后更容易接近','三级碳没有电子','一级碳没有 C–Br 键'],answer:0,feedback:'对，先把空间拥挤这个直觉抓住；Day4 再补完整轨道解释。'}
  });
  insertAfter(3,'d03-lesson-selectivity',{
    id:'d03-zero-04-cis-trans',eyebrow:'Day 3 · 第一次出现“顺 / 反”',
    title:'先只学“同侧 / 异侧”：别急着上 E/Z',
    body:'当一个平面双键两端各带两个基团时，可以先用最直观的同侧/异侧观察。关键基团在同一侧，基础语境常称顺式 cis；在相对两侧，常称反式 trans。更一般、更严谨的 E/Z 要等 Day15 学优先级以后再用。',
    formulas:['同侧 → cis（顺式）','异侧 → trans（反式）'],
    analogy:{title:'像两个人坐在道路同一边或相对两边',body:'先只判断几何“同侧/异侧”，不急着给复杂分子贴 E/Z。',boundary:'当双键两端取代基复杂时，cis/trans 不够用，必须改用 E/Z。'},
    sequence:[
      {title:'同侧',text:'两个要比较的基团画在双键同一侧。',formula:'cis',diagram:'cis-trans'},
      {title:'异侧',text:'两个要比较的基团在双键相对两侧。',formula:'trans',diagram:'cis-trans'},
      {title:'Lindlar 为什么给顺式',text:'两个 H 在金属表面从同一面加入。',formula:'alkyne → cis-alkene',diagram:'lindlar'}
    ]
  });
  x = q(3,'d03-alkylation-01');
  if (x) {
    x.prompt = '乙炔钠 HC≡C⁻ Na⁺ 想把碳链再接长两个碳。为了让末端碳从背后顺利接上并把 Br 顶走，优先选择哪种卤代烃？';
    x.examTags = ['C–C 键形成','增碳','合成'];
    x.hints = ['先找“与 Br 相连、而且周围最不拥挤”的碳。','甲基或一级卤代烃更容易让背后接近。'];
    x.explanationLayers = {
      short:'选择溴乙烷 CH₃CH₂Br。',
      why:'与 Br 相连的是一级碳，背后比较不拥挤，炔负离子的电子对容易形成新的 C–C 键。',
      full:'电子从炔负离子末端碳出发去成新的 C–C σ 键；同时原 C–Br 键电子归 Br，得到 Br⁻。Day4 会把这种“背后接上、同时推出离去基”的动作正式命名。'
    };
  }
  x = q(3,'d03-lindlar-01');
  if (x) {
    x.explanationLayers = {short:'主要得到顺-2-丁烯。',why:'Lindlar 催化剂把炔键只还原到烯烃，两个 H 从金属表面的同一侧加入。',full:'Lindlar 是经过处理、活性较温和的 Pd 催化体系，所以更容易停在烯烃阶段；同面加氢给顺式产物。更一般的 E/Z 命名到 Day15 再学。'};
    x.options[0].formula = '顺-CH₃CH=CHCH₃';
    x.options[1].formula = '反-CH₃CH=CHCH₃';
  }
  x = q(3,'d03-detective-terminal-01');
  if (x) {
    x.prompt = '未知物分子式 C₄H₆，并能与氨性 AgNO₃ 形成沉淀。只用今天已经学过的“端炔氢”证据，哪个候选最符合？';
    x.examTags = ['结构证据','化学检验'];
    x.hints = ['氨性 AgNO₃ 阳性在本课程里作为端炔 ≡C–H 的经典硬证据。'];
    x.explanationLayers = {short:'候选 A：1-丁炔。',why:'只有 1-丁炔有端炔 ≡C–H，能满足炔银沉淀这条硬证据。',full:'2-丁炔虽然也是炔烃，但没有末端 ≡C–H；1,3-丁二烯没有三键。先用化学检验排除候选，不需要提前用 IR/NMR。'};
    x.case = {
      formula:'C4H6',
      evidence:[{id:'silver-test',text:'氨性 AgNO₃：有沉淀'}],
      irPeaks:[],nmrSignals:[],
      candidates:[
        {id:'a',formula:'HC≡CCH₂CH₃',constraints:{'silver-test':'pass'},eliminationReason:''},
        {id:'b',formula:'CH₃C≡CCH₃',constraints:{'silver-test':'fail'},eliminationReason:'没有端炔氢。'},
        {id:'c',formula:'CH₂=CHCH=CH₂',constraints:{'silver-test':'fail'},eliminationReason:'没有端炔结构。'}
      ]
    };
    x.answer = {candidateId:'a'};
  }

  // ---------- Day 4: teach space symbols and solvent/rate language before questions ----------
  insertAfter(4,'d04-zero-03-sn1-wait',{
    id:'d04-zero-04-wedge-inversion',eyebrow:'Day 4 · 先学会看“朝前 / 朝后”',
    title:'实楔和虚线楔只是空间箭头：先看懂图，再谈 SN2 翻面',
    body:'纸面上的普通线表示大致在纸面内；实心楔线表示这根键朝观察者伸出来；虚线楔表示伸向纸面后方。SN2 从离去基背面进入，所以如果固定另外几个基团作为参照，反应中心会像雨伞被翻面。今天只判断“空间翻转”，不提前引入后面才系统学习的立体命名。',
    formulas:['实楔 = 朝你','虚线楔 = 背你','背面进攻 → 反应中心翻面'],
    analogy:{title:'像雨伞被大风从里向外掀翻',body:'骨架仍连着，但中心周围的空间方向整体翻到相反面。',boundary:'分子不是刚性雨伞；严格描述是 SN2 过渡态导致 Walden inversion。'},
    sequence:[
      {title:'先认实楔',text:'粗的一端朝向你。',formula:'实楔 = toward viewer',diagram:'wedge-dash'},
      {title:'再认虚线楔',text:'表示键指向纸面后方。',formula:'虚线 = behind',diagram:'wedge-dash'},
      {title:'SN2 从背面进入',text:'新基团从离去基相反方向靠近。',formula:'Nu: → C–Br',diagram:'sn2-attack'},
      {title:'最后看翻面',text:'固定其它参照后，新基团出现在原离去基相反空间方向。',formula:'front → back',diagram:'inversion'}
    ],
    microCheck:{prompt:'实楔 Br 画成“朝你”，若发生纯 SN2，新的 Nu 在固定参照图里应更接近哪一侧？',options:['原 Br 的相反侧','仍完全占据原 Br 朝向','与空间方向无关'],answer:0,feedback:'对，先学会看几何翻面；R/S 字母以后再算。'}
  });
  const d4rate = lesson(4,'d04-lesson-rate-solvent');
  if (d4rate) {
    d4rate.title = '先把“速率式”和“溶剂包围”看懂，再比较 SN2 / SN1';
    d4rate.body = '反应速率不是看总方程猜出来的，而是实验测量。若 v=k[RX][Nu⁻]，说明底物和亲核体浓度都会影响关键慢步骤；若 v=k[RX]，说明关键慢步骤只需要底物先发生电离。溶剂也会改变离子的舒服程度：水/醇这类极性质子溶剂能用氢键把阴离子包得较紧，也能很好稳定分开的离子；DMSO/DMF 这类极性非质子溶剂不会用 O–H/N–H 强氢键包住阴离子，所以 CN⁻ 等常更容易直接进攻。';
    d4rate.formulas = ['SN2 常见：v = k[RX][Nu⁻]','SN1 常见：v = k[RX]','水/醇：极性质子；DMSO/DMF：极性非质子'];
    d4rate.whyChain = [
      '为什么速率式能告诉机理？因为浓度变化只会影响真正需要这些粒子参与的关键步骤。',
      '为什么水/醇会降低某些阴离子的 SN2 亲核性？因为氢键和离子–偶极作用把阴离子溶剂化得更紧，先要“脱掉外套”才能靠近碳。',
      '为什么 SN1 反而常喜欢这种溶剂？因为它的困难第一步是把 R–X 分成离子，强极性溶剂能稳定新生的正负电荷。'
    ];
    d4rate.sequence = [
      {title:'先看 SN2 的速率式',text:'底物和 Nu⁻ 都出现在式子里，说明关键一步两者都在场。',formula:'v=k[RX][Nu⁻]',diagram:'rate-law'},
      {title:'再看 SN1',text:'只有 RX 浓度影响关键慢步骤。',formula:'v=k[RX]',diagram:'rate-law'},
      {title:'质子溶剂把阴离子包住',text:'O–H / N–H 能用氢键围住 CN⁻、HO⁻ 等。',formula:'solvent···Nu⁻',diagram:'protic-solvent'},
      {title:'非质子极性溶剂让阴离子更裸露',text:'能溶离子，却没有 O–H/N–H 去强氢键包住它。',formula:'DMSO / DMF',diagram:'aprotic-solvent'}
    ];
  }
  x = q(4,'d04-stereo-sn2-01');
  if (x) {
    x.prompt = '在固定观察方向中，2-溴丁烷的 Br 用实楔画成朝向观察者；OH⁻ 发生纯 SN2 后，哪张产物图体现“反应中心翻面”？';
    x.examTags = ['SN2','楔线虚线','空间翻转'];
    x.explanationLayers = {short:'选择 OH 画成虚线楔、背向观察者的结构。',why:'SN2 从离去基相反方向进入，在固定其它基团参照时，反应中心发生几何翻转。',full:'这题只检查“朝前/朝后”的空间变化。先把翻面看懂，后面的立体化学日再学习正式命名。'};
  }
  x = q(4,'d04-rs-caveat-01');
  if (x) {
    x.prompt = '关于 SN2 的空间结果，哪一句最严谨？';
    x.formula = 'Nu⁻ 背面进攻 → 反应中心几何翻转';
    x.examTags = ['SN2','空间翻转'];
    x.hints = ['只用今天学过的“背面进攻 + 翻面”，不要提前想字母标签。'];
    x.explanationLayers = {short:'背面进攻导致反应中心发生几何翻转。',why:'Nu 必须从离去基相反方向与 σ* 反键轨道有效重叠，因此从一侧进入、另一侧离去。',full:'今天只需要把这个空间事实看懂。后面的立体化学日再把几何翻转和正式命名联系起来。'};
    x.options = [
      {id:'a',label:'背面进攻会让反应中心发生几何翻转'},
      {id:'b',label:'新基团总从离去基同一面进入，空间完全保留'},
      {id:'c',label:'SN2 的空间方向完全随机'}
    ];
  }

  // ---------- Day 7: protection/compatibility and carbonyl deoxygenation taught before any exam use ----------
  const d7protect = lesson(7,'d07-lesson-protection-wittig');
  if (d7protect) {
    d7protect.body = '缩醛可以把原来很容易被亲核体进攻的 C=O 暂时变成较不容易被同类试剂攻击的结构，相当于给羰基戴保护罩。这里第一次引入“兼容性”：做多步合成时，要问后续试剂会不会顺手把不想动的官能团也改掉。若会，就考虑先保护、做主反应、再脱保护。Wittig 则是另一条思路：直接把 C=O 换成 C=C。';
  }
  insertAfter(7,'d07-lesson-reduction',{
    id:'d07-zero-03-carbonyl-to-methylene',eyebrow:'Day 7 · 还有一种“还原”会把 O 整个拿掉',
    title:'Clemmensen / Wolff–Kishner：目标不是醇，而是把 C=O 变成 CH₂',
    body:'NaBH₄/LiAlH₄ 通常把 C=O 降到 C–OH；但有些合成题想把羰基氧彻底去掉，让原羰基碳最后变成 CH₂。经典有两条：Clemmensen 常在强酸环境用 Zn(Hg)/HCl；Wolff–Kishner 常在强碱、高温环境用 NH₂NH₂/KOH。最终变化相似，但酸碱环境不同，所以要看分子里其它官能团能不能承受。',
    formulas:['R₂C=O ─Zn(Hg)/HCl→ R₂CH₂','R₂C=O ─NH₂NH₂/KOH, Δ→ R₂CH₂'],
    analogy:{title:'像同一个目的地有“酸性山路”和“碱性山路”',body:'两条路线都把羰基氧去掉，但沿途环境不同；分子里如果有怕酸或怕碱的部位，就要选更合适的一条。',boundary:'两种机理完全不同，这里先抓最终结构变化和条件兼容性。'},
    sequence:[
      {title:'先和普通还原区分',text:'NaBH₄ 常停在醇。',formula:'C=O → CH–OH',diagram:'reduction'},
      {title:'这两种走得更远',text:'最终把羰基氧完全移除。',formula:'C=O → CH₂',diagram:'carbonyl-to-methylene'},
      {title:'Clemmensen 走酸性环境',text:'典型 Zn(Hg)/HCl。',formula:'acidic route',diagram:'acid-route'},
      {title:'Wolff–Kishner 走碱性环境',text:'典型 NH₂NH₂/KOH, Δ。',formula:'basic route',diagram:'base-route'}
    ]
  });

  // ---------- Day 9: no beta-dicarbonyl before Day10 ----------
  x = q(9,'d09-acidity-rank-01');
  if (x) {
    x.prompt = '把已经学过的三类 C–H 放在一起：按典型酸性由强到弱排序。';
    x.explanationLayers = {
      short:'酮 α-H > 端炔 H >> 烷烃 C–H。',
      why:'酮失去 α-H 后，负电可在 C/O 间共振；端炔负电落在 s 成分高的 sp 碳；烷基负离子最难稳定。',
      full:'典型 pKa 大致可理解为酮 α-H≈20、端炔≈25、烷烃≈50。真正比较酸性就是比较“失去 H⁺ 后留下的共轭碱谁更稳定”。'
    };
    x.items = [
      {id:'ket',label:'酮 α-H'},
      {id:'alkyne',label:'端炔 ≡C–H'},
      {id:'alk',label:'普通烷烃 C–H'}
    ];
    x.correctOrder = ['ket','alkyne','alk'];
    x.answer = ['ket','alkyne','alk'];
  }

  // ---------- Day 13: structure detective stays IR/chemical-test only; NMR starts Day14 ----------
  x = q(13,'d13-evidence-combine-01');
  if (x) x.explanationLayers.full = '目前只凭这条 IR 不能把醛和酮彻底分开；还需要再找醛基 C–H、银镜等额外证据。下一天会再加入新的谱图证据工具。';
  x = q(13,'d13-case-terminal');
  if (x) {
    x.type = 'detective';
    delete x.caseId;
    x.prompt = '证据练习：C₄H₆，IR 同时出现 ≡C–H 与 C≡C 特征，并且氨性 AgNO₃ 有沉淀。哪个候选能同时满足全部证据？';
    x.hints = ['先用 IR 锁“端炔”，再用炔银沉淀做第二次确认。'];
    x.case = {
      formula:'C4H6',dbe:2,
      evidence:[{id:'ir-terminal',text:'IR：约3300 cm⁻¹尖峰 + 约2100 cm⁻¹弱峰'},{id:'silver-test',text:'氨性 AgNO₃：有沉淀'}],
      irPeaks:[{wavenumber:3300,label:'≡C–H'},{wavenumber:2100,label:'C≡C'}],nmrSignals:[],
      candidates:[
        {id:'a',formula:'HC≡CCH₂CH₃',constraints:{'ir-terminal':'pass','silver-test':'pass'},eliminationReason:''},
        {id:'b',formula:'CH₃C≡CCH₃',constraints:{'ir-terminal':'fail','silver-test':'fail'},eliminationReason:'没有端炔 H。'},
        {id:'c',formula:'CH₂=CHCH=CH₂',constraints:{'ir-terminal':'fail','silver-test':'fail'},eliminationReason:'没有 C≡C。'}
      ]
    };
    x.answer = {candidateId:'a',dbe:2};
  }
  x = q(13,'d13-case-acetone');
  if (x) {
    x.type = 'multi-choice';
    delete x.caseId;
    x.prompt = '证据练习：C₃H₆O，DBE=1，IR 约1715 cm⁻¹有强峰且没有宽 O–H。现阶段哪些候选最值得保留？';
    x.primarySkill = 'structure.constraint_elimination';
    x.skillIds = ['structure.constraint_elimination','structure.ir'];
    x.hints = ['1715 强峰先锁定 C=O；没有宽 O–H 让醇候选明显变弱。'];
    x.case = {
      formula:'C3H6O',dbe:1,
      evidence:[{id:'carbonyl',text:'IR：1715 cm⁻¹ 强峰'},{id:'no-oh',text:'IR：无宽 O–H'}],
      irPeaks:[{wavenumber:1715,label:'C=O'}],nmrSignals:[],
      candidates:[
        {id:'a',formula:'CH₃COCH₃（丙酮）',constraints:{carbonyl:'pass','no-oh':'pass'},eliminationReason:''},
        {id:'b',formula:'CH₃CH₂CHO（丙醛）',constraints:{carbonyl:'pass','no-oh':'pass'},eliminationReason:''},
        {id:'c',formula:'CH₂=CHCH₂OH（烯丙醇）',constraints:{carbonyl:'fail','no-oh':'fail'},eliminationReason:'应有 O–H，且没有羰基。'}
      ]
    };
    x.options = [
      {id:'a',label:'丙酮 CH₃COCH₃'},
      {id:'b',label:'丙醛 CH₃CH₂CHO'},
      {id:'c',label:'烯丙醇 CH₂=CHCH₂OH'}
    ];
    x.answer = ['a','b'];
    x.explanationLayers = {short:'先保留丙酮和丙醛，排除烯丙醇。',why:'现有证据只证明“有羰基、没有 O–H”，还不足以把醛/酮二选一。',full:'结构推断最重要的能力之一，就是敢于停在“证据还不够”的阶段。不要为了想立刻得到唯一答案而偷偷使用尚未提供的证据。'};
  }
  // Keep acetone full NMR case for Day14.
  const d14 = Data.days?.[14];
  if (d14 && !d14.questions.some(row => row.id === 'd14-case-acetone')) {
    const insertAt = Math.max(0, d14.questions.findIndex(row => row.id === 'd14-case-ethyl-acetate'));
    d14.questions.splice(insertAt, 0, {
      id:'d14-case-acetone',day:14,type:'detective-case',role:'practice',primarySkill:'structure.symmetry',skillIds:['structure.symmetry','structure.nmr_shift','structure.constraint_elimination'],difficulty:3,
      prompt:'完整案例：现在正式用“只有一个 6H 单峰”的 NMR 对称性证据锁定丙酮。',caseId:'det-acetone-symmetry',examTags:['NMR','对称性'],hints:[],
      explanationLayers:{short:'完成整套过程后统一复盘。',why:'今天已经正式学过 NMR 信号数、积分和对称性，现在再用它锁结构。',full:'这一次所有证据都在当前知识边界内，不再提前借用下一天的工具。'}
    });
  }
  const detCases = Array.isArray(Data.DETECTIVE_CASES) ? Data.DETECTIVE_CASES : null;
  // detective-cases.js loads after this file, so stage mutation is repeated from app-independent audit via pending flag.
  Data.BEGINNER_PENDING_CASE_STAGE_FIX = true;


  // Remaining closure fixes found by the prerequisite audit.
  x = q(1,'d01-transfer-halohydrin-01');
  if (x) x.options = [
    {id:'a',label:'先想到 Br/OH 加成，再判断 OH 位置'},
    {id:'b',label:'先想到两个 Br 加成，水可以忽略'},
    {id:'c',label:'先把 C=C 当成完全不反应'}
  ];

  const d2Weather = lesson(2,'d02-zero-01-condition-language');
  if (d2Weather) {
    d2Weather.body = '昨天你已经看到：同一个 C=C，HBr、Br₂/CCl₄、Br₂/H₂O 会给不同结果。今天只把这个思想再推进一步——“条件”是在告诉你哪一种电子运动路径最容易。我们不会先把一串陌生试剂名堆给你，而是每遇到一个新条件，就先解释它是什么、它改变了哪一步、最后怎样从结构上认出来。';
    d2Weather.formulas = ['同一个 C=C + 不同条件 → 不同电子路径 → 不同产物'];
    d2Weather.sequence = [
      {title:'先看昨天的三个出口',text:'HBr、Br₂/CCl₄、Br₂/H₂O 已经证明“条件不是小字”。',formula:'同一 C=C → 三种不同结果',diagram:'condition-crossroads'},
      {title:'今天每次只开一个新出口',text:'先解释试剂，再看电子，再看产物。',formula:'试剂是什么 → 为什么改变路径 → 结构怎么变',diagram:'condition-step'},
      {title:'最后才做混合辨别',text:'等每条路都看懂，再把它们放回同一个路口比较。',formula:'理解后再混合，不靠死背',diagram:'condition-map'}
    ];
    d2Weather.whyChain = [
      '为什么条件能改产物？因为不同试剂/光/溶剂会改变可走的基本步骤和各条路径的能垒。',
      '为什么不能只看“都含 Br”就归成一类？因为同一个元素可以出现在完全不同的电子机制里。'
    ];
  }

  insertAfter(2,'d02-zero-06-nbs',{
    id:'d02-zero-07-kmno4',eyebrow:'Day 2 · 第一次看强氧化裂解',
    title:'热、浓 KMnO₄ 不只是“加 O”：它能把 C=C 直接切到更高氧化程度',
    body:'“氧化”先用最朴素的碳账理解：一个碳周围 C–O 键变多、C–H 键变少，通常就是被氧化。热、浓 KMnO₄ 对 C=C 很强，会把双键两端切开；切口碳若原来还有 H，往往继续被推到羧酸；如果这个切口碳没有 H，则常停在酮。',
    note:'先画剪刀，再看每个切口碳原来有没有 H。不要背整串产物。',
    formulas:['R₂C=CHR  ─hot KMnO₄→  R₂C=O + RCO₂H','切口碳有 H → 更容易继续到酸；无 H → 酮'],
    analogy:{title:'像臭氧剪刀后面又接了一个“强力清洗程序”',body:'O₃ 还原后处理常停在醛/酮；热浓 KMnO₄ 对带 H 的切口会继续氧化。',boundary:'真实 KMnO₄ 机理不等于简单先臭氧再氧化，这只是产物预测对比。'},
    sequence:[
      {title:'第一步还是剪 C=C',text:'两个双键碳分开，各自保留在原片段。',formula:'C=C → C | C',diagram:'ozone-scissors'},
      {title:'先看没有 H 的切口',text:'双键碳若原来连两个碳，常给酮。',formula:'R₂C= → R₂C=O',diagram:'ketone-cut'},
      {title:'再看带 H 的切口',text:'原本有 H 的双键碳在强氧化下常继续到羧酸。',formula:'RCH= → RCO₂H',diagram:'acid-cut'}
    ],
    microCheck:{prompt:'热浓 KMnO₄ 裂解时，一个双键碳原来还连着 H，基础预测更常把它推到哪一类？',options:['羧酸','普通烷烃','醚'],answer:0,feedback:'对，强氧化比臭氧还原后处理走得更远。'}
  });

  x = q(2,'d02-hydrogenation-01');
  if (x) x.explanationLayers.full = '烯烃与氢在金属表面被活化后，原 C=C 的 π 连接被消耗，原来的 C–C σ 主连接保留，两个双键碳各得到一个 H，碳骨架不变。';

  x = q(3,'d03-route-hexyne-01');
  if (x) {
    x.hints = ['1-丁炔末端 H 可先被强碱移走。','目标比起点多两个碳，应让炔负离子去接一级二碳卤代物。'];
    x.explanationLayers = {
      short:'先 NaNH₂，再加入 CH₃CH₂Br。',
      why:'第一步把端炔变成带电子对的炔负离子；第二步它从背后接到溴乙烷的一级碳上，形成新的 C–C 键。',
      full:'HC≡CCH₂CH₃ 先失去端 H，得到 ⁻C≡CCH₂CH₃；随后末端碳的电子对去接 CH₃CH₂Br 中与 Br 相连的碳，同时 C–Br 键电子归 Br。若换成很拥挤的三级卤代烃，背后接近困难，容易走掉 H 形成烯烃的支路，因此不能得到目标炔。'
    };
    if (x.graph?.edges) {
      const e2=x.graph.edges.find(e=>e.id==='e2'); if(e2) e2.reason='一级卤代烃空间较空，炔负离子可背后接上，形成新的 C–C 键。';
      const e3=x.graph.edges.find(e=>e.id==='e3'); if(e3) e3.reason='三级碳周围太拥挤，炔负离子更容易夺邻近 H 并形成烯烃支路，不能得到目标炔。';
    }
  }
  x = q(3,'d03-detective-terminal-01');
  if (x) {
    x.skillIds = ['structure.constraint_elimination','alkyne.identification'];
    x.explanationLayers.full = '2-丁炔虽然也是炔烃，但没有末端 ≡C–H；1,3-丁二烯没有三键。这里只用今天已经学过的化学检验排除候选，不借用后面才会学的谱图工具。';
  }

  x = q(4,'d04-leaving-rank-01');
  if (x) {
    x.hints = ['好的离去基离去后应能比较舒服地承受负电荷。','I⁻、Br⁻、Cl⁻、F⁻ 中，越大的离子通常越能把负电荷摊开。'];
    x.explanationLayers = {short:'I⁻ > Br⁻ > Cl⁻ >> F⁻。',why:'向下的卤离子体积更大，负电荷更分散；同时 C–I 比 C–F 更容易断。',full:'所以在常见简单卤代烃比较里，I 通常是更好的离去基，F 很差。Day5 学酸碱时，再把“阴离子愿不愿意抓 H⁺”这条尺度接进来。'};
  }
  x = q(4,'d04-sn1-condition-01');
  if (x) {
    x.options = [
      {id:'a',label:'水/乙醇这类能很好稳定离子的溶剂，室温'},
      {id:'b',label:'CN⁻ / DMSO 这类让阴离子更裸露的条件'},
      {id:'c',label:'低极性烃类环境（难稳定新生离子）'}
    ];
    x.explanationLayers.full = '慢步骤是 C–Cl 异裂形成叔丁基碳正离子与 Cl⁻。水/乙醇这类极性质子溶剂能较好稳定新生正负离子，因此更利于这一步发生；随后溶剂中的 H₂O/EtOH 可以用孤对电子接上碳正离子。';
  }
  // ---------- Glossary matching: avoid accidental substrings such as 氧化 inside 过氧化物 ----------
  const substringBlocks = {
    '氧化':['过氧化物'],
    '一级':['一级/二级/三级'],
    '二级':['一级/二级/三级'],
    '三级':['一级/二级/三级']
  };
  Data.glossaryMatches = function (text, card) {
    text = String(text || '');
    const aliases = card?.aliases || [card?.term];
    return aliases.some(alias => {
      if (!alias || !text.includes(alias)) return false;
      const blocks = substringBlocks[alias] || [];
      if (blocks.some(block => text.includes(block) && text.replaceAll(block,'').indexOf(alias) < 0)) return false;
      return true;
    });
  };

  function flattenLessonText(row) {
    return [row.title,row.body,row.note,...(row.formulas||[]),...(row.sequence||[]).flatMap(s=>[s.title,s.text,s.formula]),...(row.whyChain||[]),row.microCheck?.prompt,...(row.microCheck?.options||[])].filter(Boolean).join(' ');
  }
  function flattenQuestionText(row) {
    return [row.prompt,row.formula,...(row.options||[]).map(o=>typeof o==='string'?o:(o?.label||'')),...(row.hints||[]),row.explanationLayers?.short,row.explanationLayers?.why,row.explanationLayers?.full].filter(Boolean).join(' ');
  }

  // Rebuild first-use cards after all v3 mutations, using safer matching.
  const seen = new Set();
  for (let d=1; d<=20; d+=1) {
    const day = Data.days?.[d];
    if (!day) continue;
    for (const row of day.lessons || []) {
      row.termCards = [];
      const text = flattenLessonText(row);
      for (const card of glossary) {
        if (seen.has(card.term)) continue;
        if (Data.glossaryMatches(text, card)) {
          row.termCards.push(card);
          seen.add(card.term);
        }
      }
      // Every lesson gets a visible "why" bridge, even if the author forgot to write one.
      if (!Array.isArray(row.whyChain) || !row.whyChain.length) {
        const why = row.termCards.slice(0,3).map(card => `为什么这里要懂“${card.term}”？${card.why}`);
        if (why.length) row.whyChain = why;
      }
    }
  }
  Data.BEGINNER_GLOSSARY_COVERED = [...seen];

  // Question pre-flight: every question declares what it is asking and which already-taught ideas it uses.
  const skillLabels = new Map((Data.skills || []).map(s => [s.id, s.label]));
  function preflightFor(question) {
    const type = question.type;
    let steps;
    if (type === 'ranking') steps = ['先确认“按什么性质排”','每一对只找一个决定性差异','再把局部比较拼成完整顺序'];
    else if (type === 'electron-arrow') steps = ['先找真实电子来源','再找电子要去的缺口','最后检查旧键电子归谁'];
    else if (type === 'route' || type === 'synthesis' || type === 'synthesis-case') steps = ['先比较起点和终点差什么','数碳有没有变化','再挑能完成这一步变化的反应'];
    else if (type === 'detective' || type === 'detective-case') steps = ['先分清“硬证据”和“候选”','每条证据只排除不满足者','证据不够时允许暂时保留多个候选'];
    else if (type === 'structure-choice') steps = ['先找反应中心或空间参照','只比较真正发生变化的位置','再检查原子数和键数有没有对上'];
    else steps = ['先圈题干里的起始结构/官能团','再完整读试剂与条件','最后只回答题目真正问的那一层'];
    return {
      skill: skillLabels.get(question.primarySkill) || question.primarySkill || '当前小技能',
      steps,
      why:'如果这三步都能回到前面讲过的概念，这道题就不是靠猜；如果某一步出现陌生词，页面会先把词翻译成人话。'
    };
  }
  for (let d=1; d<=20; d+=1) {
    const day = Data.days?.[d]; if (!day) continue;
    for (const question of day.questions || []) question.preflight = question.preflight || preflightFor(question);
    for (const list of Object.values(day.repairs || {})) for (const question of list || []) question.preflight = question.preflight || preflightFor(question);
    for (const question of day.adaptivePool || []) question.preflight = question.preflight || preflightFor(question);
  }

  Data.BEGINNER_CLOSURE_V3 = {version:'3.0.0', glossaryCount:glossary.length};
})();
