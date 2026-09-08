(function () {
  'use strict';
  const Data = window.Organic637Data = window.Organic637Data || {};
  Data.days = Data.days || {};

  const PRE = {
    1: [
      {
        id: 'd01-zero-01-language', eyebrow: 'Day 1 · 真正从零开始',
        title: '先学会“看懂一行结构式”，再谈反应',
        body: '有机化学第一关不是背反应，而是把结构式看成一张“连接地图”。一条短线代表一对共享电子，也就是一根共价键。碳最常见价数是 4，氢是 1，氧通常 2，氮通常 3，卤素通常 1。你不用一下子背完所有价态，今天只先用这套最常见规则检查结构有没有画合理。',
        note: '以后遇到任何陌生结构，先做三件事：数碳、找异原子、圈官能团。',
        formulas: ['C 常见 4 键；H 1 键；O 2 键；N 常见 3 键；F/Cl/Br/I 常见 1 键', 'CH₃–CH=CH₂：从左到右一共 3 个碳'],
        analogy: { title: '把结构式当成“地铁线路图”', body: '原子是车站，化学键是线路。你不需要先知道整座城市，只要先看哪些站直接相连、哪里出现双线、哪里挂着 O/N/Br 这种醒目的“换乘站”。', boundary: '真实分子不是平面的地铁图；这里只是帮助你先读懂连接关系。' },
        sequence: [
          { title: '第 1 步：数碳', text: 'CH₃–CH=CH₂ 里有 3 个 C，所以碳骨架是三碳。', formula: 'C1 — C2 = C3' },
          { title: '第 2 步：看键型', text: 'C2=C3 是双键；它比普通单键更值得优先关注。', formula: 'C1–C2=C3' },
          { title: '第 3 步：补氢只是“补满价数”', text: '每个碳尽量补到 4 键，所以才会出现 CH₃、CH、CH₂。', formula: 'CH₃–CH=CH₂' }
        ],
        microCheck: { prompt: 'CH₃–CH₂–OH 里有几个碳？', options: ['1 个', '2 个', '3 个'], answer: 1, feedback: 'CH₃ 和 CH₂ 各代表一个碳，所以一共 2 个碳。' }
      },
      {
        id: 'd01-zero-02-groups', eyebrow: 'Day 1 · 先认识“把手”',
        title: '官能团不是新名词，而是分子最容易发生变化的“把手”',
        body: '一个大分子里，大多数 C–C、C–H 往往先保持不动；真正决定它“像谁、怎么反应”的，常常是少数特殊连接，例如 C=C、C=O、–OH、–Br。我们把这些反应性很有特征的部分叫官能团。考试也常常不是要你一次看懂整分子，而是先找到这个把手。',
        note: '以后“认官能团”就是在问：这张结构地图里，最值得先圈哪里？',
        formulas: ['C=C：烯烃官能团', 'C=O：羰基', '–OH：羟基', 'C–Br：卤代烃反应位点'],
        analogy: { title: '像行李箱上的拉链、门把手和开关', body: '箱子的主体很大，但你真正操作它时先找拉链；房子很大，但你开门先找门把手。官能团就是分子上这种“最容易被操作的位置”。', boundary: '不同官能团并非只有一种反应；“把手”只表示它常常是反应中心。' },
        sequence: [
          { title: '看到整分子先别慌', text: '先把普通碳链当作背景。', formula: 'CH₃–CH₂–CH=CH₂' },
          { title: '把特殊连接圈出来', text: '这里唯一特别的是 C=C。', formula: 'CH₃–CH₂–[CH=CH₂]' },
          { title: '再问它常做什么', text: 'C=C 常把 π 电子拿来形成新键，所以后面会学很多“加成”。', formula: '[C=C] → 加成入口' }
        ]
      },
      {
        id: 'd01-zero-03-electrons', eyebrow: 'Day 1 · 为什么会“喜欢”某个位置',
        title: '化学反应不是原子有性格，而是“哪里电子多、哪里电子缺”',
        body: '很多有机反应都可以先用一个非常朴素的问题理解：谁手里有可用电子？谁现在缺电子？电子多的一方可以把一对电子拿来形成新键，电子缺的一方有空位置能接住这对电子。后面“亲核体、亲电体”这些术语，本质上都是给这种供电子/收电子角色起名字。',
        note: '先把“电子从哪里来、要去哪里”练成习惯，机理就不会像神秘箭头。',
        formulas: ['电子丰富处 → 电子缺乏处', ':Nu⁻ → Cδ⁺', 'π 键电子 → Hδ⁺'],
        analogy: { title: '像“手里有两张票的人”和“正好缺票的空座”', body: '成键时，关键不是两个原子“互相喜欢”，而是有一对电子可以被共享，并且另一方有合适的低能空轨道/电子缺口接纳。', boundary: '真实成键由轨道重叠和能量决定，不只是简单静电吸引。' },
        sequence: [
          { title: '先找电子来源', text: '孤对电子、π 键、带负电的位置经常是电子来源。', formula: ':O:   :Br⁻   C=C' },
          { title: '再找电子缺口', text: '带正电、δ⁺、与强电负性原子相连的碳经常更缺电子。', formula: 'C⁺   Hδ+–Brδ−   Cδ+=Oδ−' },
          { title: '新键就是“一对电子开始被两边共享”', text: '曲箭以后表示的不是原子飞过去，而是电子对的去向。', formula: '电子对 → 新 σ 键' }
        ],
        microCheck: { prompt: '在 Hδ+–Brδ− 里，若一团 π 电子要找更缺电子的一端，先看哪一端？', options: ['Hδ+', 'Brδ−'], answer: 0, feedback: '电子丰富的 π 键优先和电子更缺的 Hδ+ 建立新键。' }
      },
      {
        id: 'd01-zero-04-break-bond', eyebrow: 'Day 1 · “断键”到底是什么意思',
        title: '断键不是把一根棍子剪开，而是决定原来那一对电子归谁',
        body: '共价键本质上是一对被两个原子共享的电子。所谓断键，就是这对电子不再被原来两个原子共同使用。两电子都给同一边叫异裂，会得到离子；一边一个叫均裂，会得到自由基。Day 1 的 HBr 普通加成主要看异裂，Day 2 再看自由基均裂。',
        note: '以后看到“键断了”，立刻问：原来键里的两个电子最后去了哪？',
        formulas: ['A–B → A⁺ + :B⁻（异裂，两个电子都给 B）', 'A–B → A· + B·（均裂，一边一个电子）'],
        analogy: { title: '像两个人合租的一笔押金', body: '断键时不是“房子没了”，而是要决定原来共同的两份电子怎么分：两份都给一个人，或一人一份。', boundary: '电子并不是硬币；这个比喻只帮助你记“电子归属”。' },
        sequence: [
          { title: '成键时', text: '两个原子共同使用一对电子。', formula: 'A : B  ≈  A–B' },
          { title: '异裂', text: '两个电子一起偏向更能稳定负电的一端。', formula: 'H–Br → H⁺ + Br⁻' },
          { title: '均裂', text: '每个原子各拿一个电子，形成两个自由基。', formula: 'RO–OR → 2 RO·' }
        ]
      },
      {
        id: 'd01-zero-05-naming', eyebrow: 'Day 1 · 名字终于不再像密码',
        title: '先学最小命名骨架：数碳 → 找双键 → 编号 → 加取代基',
        body: '命名不是单独背表，而是在描述“这张连接地图”。最先找包含重要官能团/多键的最长碳链，再从让双键或主要官能团编号尽量小的一端编号。三碳叫 prop-，双键叫 -ene，所以 CH₃–CH=CH₂ 是 propene（丙烯）。如果第二个碳上有 Br，就是 2-bromopropane（2-溴丙烷）。',
        note: '这里只教做题最常用的最小规则，复杂 IUPAC 以后按需要补。',
        formulas: ['1C meth-；2C eth-；3C prop-；4C but-', 'prop + ene → propene（丙烯）', 'CH₃–CHBr–CH₃ → 2-bromopropane（2-溴丙烷）'],
        analogy: { title: '像给一条街道地址', body: '主链是街道名，编号是门牌号，Br/OH/双键是“这个门牌上有什么”。先把街道和门牌定好，名字就不是乱背。', boundary: '复杂分子还要考虑官能团优先级、多个取代基等规则。' },
        sequence: [
          { title: '数主链', text: 'CH₃–CH=CH₂ 有 3 个碳，所以根是 prop-。', formula: 'C1–C2=C3 → prop-' },
          { title: '标双键', text: '双键从最近一端开始编号，得到 prop-1-ene，常写 propene。', formula: 'CH₂=CH–CH₃ → propene' },
          { title: '再看取代基', text: 'CH₃–CHBr–CH₃ 的 Br 在 C2。', formula: '2-bromopropane' }
        ],
        microCheck: { prompt: 'CH₃–CH₂–CH₂–Br 最直观的中文名是哪一个？', options: ['1-溴丙烷', '2-溴丙烷', '溴乙烷'], answer: 0, feedback: '三碳主链是丙烷，Br 在端点 C1，所以叫 1-溴丙烷。' }
      },
      {
        id: 'd01-zero-06-hbr-movie', eyebrow: 'Day 1 · 把第一条机理真的“看成电影”',
        title: '丙烯 + HBr：一帧一帧看电子怎么走',
        body: '现在我们不背“马氏规则”，先看它为什么会发生。丙烯的 π 键有一对比较容易参与反应的电子；HBr 中 Br 更会拉电子，因此 H 带部分正电、Br 带部分负电。π 电子先和 H 建键，同时 H–Br 键电子全部留给 Br，形成 Br⁻。剩下的另一个双键碳暂时缺电子，成为碳正离子；随后 Br⁻ 用孤对电子去填这个电子缺口，形成 C–Br。',
        note: '这就是以后所有曲箭最重要的语法：箭尾从电子出发，箭头指向新键要形成的位置。',
        formulas: ['CH₃–CH=CH₂ + Hδ+–Brδ−', 'π → H；H–Br → Br⁻', 'CH₃–C⁺H–CH₃ + Br⁻ → CH₃–CHBr–CH₃'],
        analogy: { title: '像先把一个“电子空位”制造出来，再有人来补位', body: '第一步不是 Br 直接扑上去，而是 π 电子先抓 H，留下一个缺电子的碳；Br⁻ 随后拿着孤对电子来补这个空位。', boundary: '碳正离子是高能中间体，真实体系中的溶剂与离子对会影响过程；这里先抓电子流主线。' },
        sequence: [
          { title: '镜头 1：先看极性', text: 'Br 电负性更强，HBr 的电子偏向 Br。', formula: 'Hδ+—Brδ−' },
          { title: '镜头 2：π 电子先去接 H', text: 'π 键是电子来源，Hδ+ 是电子缺口。', formula: 'C=C  π电子 → Hδ+' },
          { title: '镜头 3：H–Br 同时断', text: '原 H–Br 键的一对电子全部回到 Br，形成 Br⁻。', formula: 'H–Br → Br⁻' },
          { title: '镜头 4：出现碳正离子', text: '哪一种方向让正电荷落在更稳定的碳上，哪条路更有利。', formula: '2° C⁺  比 1° C⁺ 稳定' },
          { title: '镜头 5：Br⁻ 补上电子缺口', text: 'Br⁻ 的孤对电子形成新的 C–Br σ 键。', formula: ':Br⁻ → C⁺  →  C–Br' }
        ],
        microCheck: { prompt: '在第二步 Br⁻ 进攻碳正离子时，真正“走过去”的是什么？', options: ['Br 原子本身沿曲箭飞过去', 'Br⁻ 上的一对电子', '碳正离子上的正电荷'], answer: 1, feedback: '曲箭表示电子对移动；原子会随新键形成改变连接，但箭头本身画的是电子。' }
      },
      {
        id: 'd01-zero-07-why-stable', eyebrow: 'Day 1 · “稳定”不是一句魔法',
        title: '为什么二级碳正离子比一级更愿意被形成？',
        body: '碳正离子意味着这个碳只有 6 个价层电子，明显缺电子。周围烷基可以通过 σ 键电子的超共轭以及诱导效应，让正电荷不那么集中在一个点上。你可以先理解成“有人帮忙分担缺电子压力”。分担越充分，中间体能量越低，形成它的路径通常越有利。',
        note: '今天用 3° > 2° > 1° 做基础判断；以后苄基、烯丙基会加入共振这个更强的稳定因素。',
        formulas: ['3° C⁺ > 2° C⁺ > 1° C⁺ > CH₃⁺（基础趋势）', '稳定性更高 → 中间体能量更低 → 对应路径更有利'],
        analogy: { title: '像一笔债务分摊给更多邻居', body: '正电荷越集中越“难受”；周围烷基越多，就越能通过电子效应把这种电子缺乏稍微分散。', boundary: '不是邻居真的把一个完整电子送过去；正式描述是超共轭与诱导效应。' },
        sequence: [
          { title: '一级', text: '正电碳只连一个烷基，能参与分散的邻近 σ 键较少。', formula: 'R–CH₂⁺' },
          { title: '二级', text: '有两个烷基邻居，超共轭机会更多。', formula: 'R₂CH⁺' },
          { title: '三级', text: '三个烷基邻居，基础趋势中最稳定。', formula: 'R₃C⁺' }
        ]
      },
      {
        id: 'd01-zero-08-wonder', eyebrow: 'Day 1 · 进入有机世界的第一张地图',
        title: '你已经不是在背反应，而是在追踪“电子想去哪里”',
        body: '到这里你已经有了一套可以反复使用的语言：结构式是连接地图，官能团是反应把手，键是一对共享电子，断键要追踪电子归属，成键要找到电子来源与电子缺口，条件会改变电子运动路径。后面的 SN1/SN2、羰基、芳香取代、烯醇负离子，看起来名字完全不同，但底层都能回到这几句话。',
        note: '如果这一页真的看懂，后面很多“新反应”会开始像同一种语言的不同句子。',
        formulas: ['找电子源 → 找电子缺口 → 看哪个键断 → 看哪个键成 → 检查产物是否稳定'],
        analogy: { title: '像终于学会看地图图例', body: '第一次看地图时每个符号都陌生；一旦知道“蓝线是河、红线是路、圆点是站”，城市突然变得有秩序。有机化学也是这样。', boundary: '后续还会加入立体、轨道、动力学和热力学等更细规则。' },
        sequence: [
          { title: '以后每道反应先问 1', text: '哪里电子比较多？', formula: '孤对 / π键 / 负电' },
          { title: '再问 2', text: '哪里电子比较缺？', formula: '正电 / δ⁺ / 极化键' },
          { title: '再问 3', text: '电子走过去后，哪根旧键必须断？', formula: '旧键电子 → 更稳定一端' },
          { title: '最后问 4', text: '新连接能不能解释最终产物？', formula: '电子账 + 原子账 + 电荷账' }
        ]
      }
    ],
    2: [
      { id:'d02-zero-01-condition-language', eyebrow:'Day 2 · 条件不是小字', title:'试剂和条件是在告诉你“电子世界的天气”', body:'同一个 C=C 在不同条件下会像走到不同路口。ROOR 会开启自由基链；BH₃ 会改变加成方向；O₃ 会直接把双键“剪开”；NBS/hν 则故意保留双键，只动旁边的烯丙位。条件不是装饰，而是告诉你现在允许哪类电子运动。', note:'以后做题先完整读完“试剂 + 溶剂 + 光/热 + 后处理”。', formulas:['HBr ≠ HBr/ROOR','Br₂/CCl₄ ≠ Br₂/H₂O','O₃/Zn,H₂O ≠ 热浓 KMnO₄'], analogy:{title:'像同一辆车进入不同天气和道路规则',body:'晴天、雪天、封路会让同一辆车走不同路线；化学条件也会改变最容易发生的机理。',boundary:'条件影响的是反应路径和能垒，不是分子“看懂说明书”。'}, sequence:[{title:'先圈主试剂',text:'例如 HBr。',formula:'HBr'},{title:'再看有没有“改路线”的条件',text:'例如 ROOR、hν、Δ、H₂O。',formula:'HBr / ROOR'},{title:'最后看后处理',text:'氧化/还原后处理常决定最终官能团。',formula:'1) BH₃  2) H₂O₂/OH⁻'}] },
      { id:'d02-zero-02-radical', eyebrow:'Day 2 · 第一次见自由基', title:'自由基不是离子：它只是“有一个没配对电子”', body:'普通离子反应常追踪一对电子；自由基反应则要追踪单个未配对电子。过氧键 O–O 比较弱，在光/热条件下可以均裂，一边拿一个电子，生成两个 RO·。这就是为什么 ROOR 能把 HBr 加成带入另一条机理。', formulas:['RO–OR → 2 RO·','单电子箭头：鱼钩箭头','离子型曲箭：一对电子'], analogy:{title:'像一双手套拆成两只单手套',body:'异裂像两只手套都给一个人，形成离子；均裂像一人拿一只，形成两个各带单电子的自由基。',boundary:'电子有自旋与轨道性质，不是真的手套。'}, sequence:[{title:'O–O 均裂',text:'每个 O 各拿一个电子。',formula:'RO–OR → RO· + ·OR'},{title:'自由基传播',text:'一个自由基反应后又生成新的自由基。',formula:'Br· + C=C → C–C·–Br'},{title:'方向来自稳定性',text:'哪条路径产生更稳定的碳自由基，传播更容易。',formula:'3° radical > 2° > 1°（基础趋势）'}] },
      { id:'d02-zero-03-cut-double', eyebrow:'Day 2 · 真正学会“剪双键”', title:'臭氧裂解不是背两个产物：把 C=C 当作剪刀线', body:'做臭氧裂解时，先在 C=C 正中间画一把剪刀，把两个双键碳分到左右两个片段。然后分别看每个双键碳原来连了什么：如果它原来还有 H，常变成醛；如果连着两个碳，常变成酮。这样比直接背产物可靠得多。', formulas:['R₂C=CHR → R₂C=O + RCHO（还原后处理）','双键两端分别变成羰基碳'], analogy:{title:'像沿虚线把一张纸剪成两张，再给每个切口装一个 O',body:'先剪骨架，再处理两个切口。',boundary:'真实臭氧分解经历臭氧化物等中间体；剪纸只是产物预测法。'}, sequence:[{title:'先画剪刀',text:'只剪 C=C，不剪别的 C–C。',formula:'R₂C ║ CHR'},{title:'左右分片',text:'每个双键碳仍留在自己的片段。',formula:'R₂C |   | CHR'},{title:'给每个切口补 O',text:'两个切口各变成 C=O。',formula:'R₂C=O  +  RCHO'}], microCheck:{prompt:'若双键某端碳原来连着一个 H，臭氧还原后处理常得到哪类羰基？',options:['醛','酮'],answer:0,feedback:'该碳保留 H 并形成 C=O，因此是醛。'} }
    ],
    3: [
      { id:'d03-zero-01-hybridization', eyebrow:'Day 3 · 为什么端炔 H 特别', title:'先别背 pKa：看负电荷离原子核有多近', body:'端炔失去 H 后，负电荷落在 sp 碳上。sp 轨道 s 成分高，电子平均更靠近原子核；负电荷被吸得更紧，因此比落在 sp² 或 sp³ 碳上更稳定。酸性强弱本质上是在比较“失去 H 后的共轭碱谁更稳”。', formulas:['sp：50% s；sp²：33% s；sp³：25% s','端炔 pKa≈25；烯烃≈44；烷烃≈50'], analogy:{title:'像负电荷被更短的安全绳拉回中心',body:'离带正电的原子核越近，负电荷越容易被稳定。',boundary:'真实轨道是概率分布，不是绳子长度。'}, sequence:[{title:'先去掉 H',text:'不要先比较原酸，先画共轭碱。',formula:'RC≡CH → RC≡C⁻'},{title:'看负电荷落在哪类轨道',text:'端炔是 sp 碳。',formula:'sp C⁻'},{title:'比较稳定性',text:'共轭碱越稳，原来的 H 越容易失去。',formula:'稳定共轭碱 ⇔ 较强酸'}] },
      { id:'d03-zero-02-carbon-nucleophile', eyebrow:'Day 3 · 第一次真正“接长碳链”', title:'碳也可以当亲核体：炔负离子手里有一对可用电子', body:'很多初学者会以为“亲核体都是 O⁻、N、卤离子”。其实带负电的碳同样可以提供电子对。炔负离子的碳拿着一对电子去进攻一级卤代烃中带 X 的碳，同时 C–X 键断裂，于是旧的两个碳骨架被一根新的 C–C 键接在一起。', formulas:['RC≡C⁻ + R′–CH₂–Br → RC≡C–CH₂R′ + Br⁻'], analogy:{title:'像两段乐高通过一个新卡扣拼成更长的一段',body:'炔负离子提供“卡扣的一对电子”，卤代烃提供可被进攻的碳，同时 Br 离开。',boundary:'位阻太大时 SN2 不顺，会竞争 E2。'}, sequence:[{title:'标出负电碳',text:'它是电子来源。',formula:'RC≡C:⁻'},{title:'标出带 Br 的碳',text:'C–Br 极化，碳是可被进攻的位置。',formula:'R′–CH₂δ+–Brδ−'},{title:'成 C–C 键',text:'负电碳的电子对与 CH₂ 碳形成新 σ 键。',formula:'RC≡C–CH₂R′'},{title:'Br 离开',text:'原 C–Br 键电子留给 Br。',formula:'Br⁻'}] },
      { id:'d03-zero-03-diene', eyebrow:'Day 3 · 共轭到底奇妙在哪', title:'两个双键隔一个单键，电子就不再各管各的', body:'CH₂=CH–CH=CH₂ 中，四个 p 轨道连续排列，π 电子可以在更长的区域离域。Diels–Alder 正是利用这套连续 π 系统，一次性重新分配电子，形成两根新 σ 键和一根新 π 键。', formulas:['CH₂=CH–CH=CH₂：共轭二烯','4π + 2π → 六元环'], analogy:{title:'像四个人手拉手组成一条能整体移动的队伍',body:'共轭让电子不再局限于单独一个双键，而能作为连续体系参与反应。',boundary:'真正描述需用分子轨道，不是电子在链上自由奔跑。'}, sequence:[{title:'确认连续 p 轨道',text:'双键—单键—双键。',formula:'C=C–C=C'},{title:'把 4 个碳当整体',text:'二烯提供 4 个参与碳。',formula:'C1=C2–C3=C4'},{title:'与 2 个碳一次闭环',text:'亲双烯体贡献另外 2 个碳。',formula:'4 + 2 → 6 元环'}] }
    ],
    4: [
      { id:'d04-zero-01-roles', eyebrow:'Day 4 · 三个词终于说人话', title:'亲核体、亲电体、离去基，其实是在分工', body:'亲核体是“愿意拿出一对电子形成新键”的角色；亲电中心是“电子不足、能接住电子”的位置；离去基是“断键后能带着原键电子离开”的部分。SN1/SN2 的每一步都能用这三种角色说清楚。', formulas:['Nu:⁻ = 电子对提供者','Cδ⁺ = 常见亲电中心','C–X → X⁻ = 离去基带走原键电子'], analogy:{title:'像换租客：新租客、空房间、旧租客',body:'Nu 是准备入住的新租客；反应中心碳是房间；X 是能带着自己东西离开的旧租客。',boundary:'真实过程由轨道与能垒决定，分子不是房子。'}, sequence:[{title:'找 Nu',text:'看孤对、负电、π电子。',formula:':CN⁻  :OH⁻  NH₃'},{title:'找亲电碳',text:'通常与离去基 X 相连、带部分正电。',formula:'R–Cδ+–Brδ−'},{title:'看 X 能不能走',text:'断键后若 X⁻ 相对稳定，离去更容易。',formula:'I⁻ > Br⁻ > Cl⁻ >> F⁻'}] },
      { id:'d04-zero-02-sn2-why-back', eyebrow:'Day 4 · SN2 为什么非要从背后', title:'不是老师规定“背面进攻”，而是轨道只在背后有合适入口', body:'C–X 键有一个与成键轨道对应的反键轨道 σ*。亲核体要把电子送进去，最佳重叠方向在 C–X 的反方向；从 X 同侧靠近既被离去基挡住，也无法获得最佳轨道重叠。所以 SN2 自然产生背面进攻和构型翻转。', formulas:['Nu:⁻ → σ*(C–X)','背面进攻 → 构型反转'], analogy:{title:'像要把抽屉里的旧盒子顶出去，你得从抽屉背后沿同一直线推',body:'同侧硬挤既堵又不对齐；从反方向进来最顺。',boundary:'“推盒子”只是几何直觉，核心是轨道重叠。'}, sequence:[{title:'C–X 先给出方向',text:'X 在一侧，占据前方空间。',formula:'Nu ··· C—X'},{title:'Nu 从反方向靠近',text:'孤对电子与 σ* 最好重叠。',formula:'Nu: → C—X'},{title:'一边成键一边断键',text:'没有自由碳正离子。',formula:'Nu–C + X⁻'},{title:'四面体方向翻转',text:'像伞翻面一样得到 inversion。',formula:'Walden inversion'}] },
      { id:'d04-zero-03-sn1-wait', eyebrow:'Day 4 · SN1 为什么会重排', title:'SN1 先真的“空出一个电子缺口”，后面才有人来补', body:'SN1 的第一步是 C–X 异裂，X 带着键电子离开，碳只剩 6 个价电子，成为平面碳正离子。因为这个中间体真的存在，它有时间通过氢迁移或烷基迁移变成更稳定的碳正离子；亲核体再从任一侧接近。', formulas:['R–X → R⁺ + X⁻','2° C⁺ → 1,2-H shift → 3° C⁺'], analogy:{title:'像旧租客先搬走，房间真的空了一会儿',body:'空房期间可以“换房间布局”（重排），之后新租客才入住。',boundary:'碳正离子寿命很短，溶剂环境也影响离子化和捕获。'}, sequence:[{title:'先离去',text:'C–X 键电子全部给 X。',formula:'C–X → C⁺ + X⁻'},{title:'检查有没有更稳定位置',text:'若一次 1,2-迁移能明显稳定正电荷，就可能重排。',formula:'2° → 3°'},{title:'最后 Nu 进攻',text:'孤对电子填补碳的电子缺口。',formula:':Nu → C⁺'}] }
    ],
    5: [
      { id:'d05-zero-01-base-vs-nu', eyebrow:'Day 5 · 为什么同一个试剂有时“打碳”，有时“抢氢”', title:'亲核性和碱性不是一回事：一个看“找碳”，一个看“拿 H⁺”', body:'亲核体关心的是把电子对送给亲电碳；碱关心的是把电子对送给 H⁺，也就是夺质子。很多阴离子两种能力都有，于是 SN2 与 E2 会竞争。体积大的强碱虽然很会夺 H，却不容易挤到拥挤的碳中心，因此更偏消除。', formulas:['Nu:⁻ + Cδ⁺ → C–Nu','Base:⁻ + H–C → H–Base + C=C'], analogy:{title:'像一个人既会抢座位，也会拉走门把手',body:'能不能挤到座位决定亲核进攻；够不够强去拉走 H 决定碱性。',boundary:'亲核性受溶剂、极化性等影响，不只看碱强弱。'}, sequence:[{title:'若去打 α-C',text:'这是取代思路。',formula:'Nu → Cα'},{title:'若去拿 β-H',text:'这是消除思路。',formula:'Base → Hβ'},{title:'大体积强碱',text:'更难靠近拥挤碳，但外侧 β-H 仍容易够到。',formula:'t-BuO⁻ → E2 倾向'}] },
      { id:'d05-zero-02-alpha-beta', eyebrow:'Day 5 · α/β 不是神秘字母', title:'α 就是“离关键位置第一站”，β 是下一站', body:'在卤代烃消除里，把连着离去基 X 的碳叫 α-C；紧挨着它的碳就是 β-C；β-C 上的氢就是 β-H。E2 需要从 β-C 拿 H，才能在 α/β 两个碳之间形成双键。', formulas:['Cβ–Cα–X','Hβ–Cβ–Cα–X → Cβ=Cα'], analogy:{title:'像从火车站往外数站点',body:'X 所在站记作 α，隔壁一站就是 β。字母只是位置标签。',boundary:'在羰基化学里 α 也是“紧邻官能团的碳”，具体参照物不同。'}, sequence:[{title:'先找 X',text:'定位反应中心碳。',formula:'–Cα–X'},{title:'再找隔壁碳',text:'它们都是 β-C。',formula:'Cβ–Cα(X)–Cβ'},{title:'最后找 β-H',text:'只有 β-H 被拿走才能形成相邻双键。',formula:'Hβ → Cβ=Cα'}] }
    ],
    6: [
      { id:'d06-zero-01-oxygen', eyebrow:'Day 6 · 氧为什么总是很忙', title:'O 有两对孤对电子，所以它既能“给电子”，又会强烈拉电子', body:'氧电负性高，会把 O–H、C–O 键电子拉向自己；同时氧又有两对孤对电子，可以接受 H⁺ 或进攻亲电中心。这就是为什么醇、醚、环氧在酸碱和亲核反应里都很活跃。', formulas:['R–O:–H','R–O:–R','环氧 O 上有孤对电子'], analogy:{title:'像一个既很会吸资源、手里又有备用工具的人',body:'氧把键电子拉近自己，所以附近原子会变得更正；但它手上的孤对电子又能拿来成键。',boundary:'“吸资源”对应电负性，“备用工具”对应孤对电子。'}, sequence:[{title:'看电负性',text:'O 比 C、H 更拉电子。',formula:'Cδ+–Oδ−'},{title:'看孤对',text:'O 仍保留可提供的电子对。',formula:':O:'},{title:'所以两种角色都能出现',text:'可被质子化，也可作亲核体。',formula:':O + H⁺ → O–H'}] },
      { id:'d06-zero-02-epoxide-strain', eyebrow:'Day 6 · 环氧为什么这么容易开环', title:'三元环像被硬掰成很小角度的弹簧', body:'普通 sp³ 碳理想键角约 109.5°，三元环只能挤到约 60°，产生明显角张力和扭转张力。亲核体一旦打开一根 C–O 键，体系可以释放张力，所以环氧比普通醚更容易发生开环。', formulas:['三元环角度≈60° << 109.5°','开环 → 释放环张力'], analogy:{title:'像被强行弯得很紧的弹簧',body:'一旦找到出口，弹簧很愿意弹开来释放能量。',boundary:'真实环张力来自轨道角度与重叠等因素。'}, sequence:[{title:'先看三元环',text:'三个原子被迫形成很小的内角。',formula:'△'},{title:'Nu 进攻一个碳',text:'同时 C–O 键断。',formula:'Nu: → C；C–O → O'},{title:'环打开',text:'张力下降，并形成新的 C–Nu 键。',formula:'开链产物'}] }
    ],
    7: [
      { id:'d07-zero-01-carbonyl-polar', eyebrow:'Day 7 · 羰基为什么总被打 C', title:'C=O 不是对称双键：O 把电子拉走，C 自然变缺电子', body:'氧比碳电负性强，所以 C=O 的电子云明显偏向 O。于是 O 带部分负电，羰基碳带部分正电。亲核体手里有电子对，自然优先把电子送到羰基碳，而不是电子已经很丰富的 O。', formulas:['Cδ+=Oδ−', ':Nu⁻ → Cδ+'], analogy:{title:'像一床被子被 O 大幅拉到自己这一边',body:'O 那边“被子多”，C 那边“露出来、缺电子”，所以带电子的 Nu 会去补 C 那边。',boundary:'反应选择来自轨道和能量，不只是静电正负。'}, sequence:[{title:'先极化 C=O',text:'O 拉电子。',formula:'Cδ+=Oδ−'},{title:'Nu 找到 Cδ+',text:'孤对电子形成 C–Nu 键。',formula:':Nu → C'},{title:'π 键电子移到 O',text:'否则 C 会超过八电子。',formula:'C=O π → O⁻'},{title:'得到四面体中间体',text:'C 从平面变成四面体。',formula:'C(OH)(Nu)…'}] },
      { id:'d07-zero-02-carbonyl-names', eyebrow:'Day 7 · 醛和酮怎么一眼分', title:'只看羰基碳还连着谁：有 H 是醛，两边都是碳是酮', body:'羰基碳若连着至少一个 H，就是醛 –CHO；若两侧都连碳，就是酮 R–CO–R′。这一个结构差异会直接影响氧化性、命名和许多反应。', formulas:['R–CHO：醛','R–CO–R′：酮','CH₃CHO = ethanal 乙醛','CH₃COCH₃ = propanone 丙酮'], analogy:{title:'像看羰基碳的“左右邻居名单”',body:'有一个邻居是 H，就归醛；左右都是碳，就归酮。',boundary:'甲醛 HCHO 是特殊最简单醛。'}, sequence:[{title:'圈 C=O',text:'先找到羰基碳。',formula:'C=O'},{title:'看它的两个单键邻居',text:'H + C → 醛；C + C → 酮。',formula:'R–CHO vs R–CO–R′'}] }
    ],
    8: [
      { id:'d08-zero-01-acyl-family', eyebrow:'Day 8 · 为什么酰氯、酯、酰胺像一家人', title:'它们都有同一个骨架：C=O 旁边再连一个可替换的 Y', body:'羧酸衍生物可以统一写成 R–C(=O)–Y。Y 可以是 Cl、OCOR、OR、NH₂ 等。亲核体先攻击同一个羰基碳，随后 Y 作为离去基被替换，所以它们不是四套完全不同的反应。', formulas:['R–C(=O)–Y + Nu → R–C(=O)–Nu','Y = Cl / OCOR / OR / NR₂'], analogy:{title:'像同一间房子门口换了不同“门牌 Y”',body:'房子的核心 C=O 不变，真正不同的是 Y 好不好离开。',boundary:'不同 Y 还会通过共振/诱导改变羰基亲电性。'}, sequence:[{title:'先找共同核心',text:'全部先圈 C=O。',formula:'R–C(=O)–Y'},{title:'Nu 加进去',text:'得到四面体中间体。',formula:'Nu → C=O；π→O'},{title:'中间体再塌回去',text:'O⁻ 重新形成 C=O，同时 Y 离开。',formula:'O⁻ → C=O；C–Y → Y⁻'}] },
      { id:'d08-zero-02-leaving', eyebrow:'Day 8 · 为什么酰氯最活泼', title:'能不能顺利“换人”，很大程度取决于 Y 离开后舒不舒服', body:'Cl⁻ 是相对稳定的弱碱，离开容易；而 NH₂⁻ 极不稳定，是很强的碱，几乎不愿直接作为离去基。因此一般反应性酰氯 > 酸酐 > 酯 > 酰胺。', formulas:['酰氯 > 酸酐 > 酯 > 酰胺','更好离去基 → 更快亲核酰基取代'], analogy:{title:'像换岗位时，看原来的人愿不愿意离职',body:'离开后越“有去处、越稳定”的 Y，替换越容易。',boundary:'同时还受共振、诱导和条件影响。'}, sequence:[{title:'Nu 都能尝试进攻',text:'第一步相似。',formula:'Nu → C=O'},{title:'关键看 Y',text:'四面体中间体要塌回去，Y 必须离开。',formula:'C–Y → Y⁻'},{title:'比较 Y⁻ 稳定性',text:'弱碱通常是好离去基。',formula:'Cl⁻ 好；NH₂⁻ 差'}] }
    ],
    9: [
      { id:'d09-zero-01-alpha', eyebrow:'Day 9 · α-H 为什么突然重要', title:'羰基旁边第一格叫 α，那里失去 H 后负电可以被 C=O 分担', body:'把羰基碳当作参照，紧挨着的碳叫 α-C，α-C 上的氢叫 α-H。若碱拿走 α-H，电子不会孤零零困在一个碳上，而可以与羰基形成共振，把负电分散到 O 上，这让共轭碱更稳定。', formulas:['R–CO–CH₂–R′ → enolate','C⁻–C=O ⇄ C=C–O⁻'], analogy:{title:'像一笔负电可以在两个账户之间分摊',body:'如果负电只能压在一个碳上很难受；有羰基时可以通过共振分到 O 上。',boundary:'共振不是两个结构来回跳，而是实际电子分布的两个极限式。'}, sequence:[{title:'先找羰基',text:'把它当参照。',formula:'C=O'},{title:'找隔壁 α-C',text:'只要相邻就是 α。',formula:'CO–CαH₂'},{title:'碱拿 α-H',text:'C–H 键电子留给 α-C。',formula:'Cα–H → Cα⁻'},{title:'共振分散',text:'负电可移到 O。',formula:'C⁻–C=O ⇄ C=C–O⁻'}] },
      { id:'d09-zero-02-aldol-bond', eyebrow:'Day 9 · Aldol 到底新接了哪根键', title:'先别看长产物：只找“哪个碳负离子打了哪个羰基碳”', body:'Aldol 的本质是一个 enolate 作为碳亲核体，去进攻另一个羰基的亲电碳。于是新的 C–C 键就出现在“enolate α-C”和“被攻击羰基 C”之间。', formulas:['enolate Cα:⁻ → Cδ+=O','新键：Cα–C(carbonyl)'], analogy:{title:'像两个分子终于通过“最有电子的碳”和“最缺电子的碳”接上手',body:'先找两端角色，再画新 C–C 键。',boundary:'后续质子转移、脱水与条件会决定最终产物。'}, sequence:[{title:'找供电子碳',text:'enolate 的 α-C。',formula:'Cα:⁻'},{title:'找受电子碳',text:'另一个分子的羰基 Cδ+。',formula:'Cδ+=O'},{title:'画新 C–C',text:'这就是骨架增长的关键一步。',formula:'Cα—C(OH)…'}] }
    ],
    10: [
      { id:'d10-zero-01-unify-enolate', eyebrow:'Day 10 · 不要再背四个名字', title:'Aldol、Claisen、Michael 的共同问题只有一句：enolate 这次打谁？', body:'Day 9 你已经会做 enolate。Day 10 的新名字只是“亲电目标换了”：打醛酮羰基是 Aldol；打酯羰基并发生取代是 Claisen；打 α,β-不饱和羰基的 β-C 是 Michael。先认攻击目标，名字自然出来。', formulas:['enolate + aldehyde/ketone → Aldol','enolate + ester → Claisen','enolate + α,β-unsaturated C=O → Michael'], analogy:{title:'像同一个前锋面对三种不同球门',body:'前锋还是 enolate，变化的是对方防线和最适合射门的位置。',boundary:'每类反应的平衡、离去基和后处理仍有专门条件。'}, sequence:[{title:'先锁定 enolate',text:'它是供电子者。',formula:'Cα:⁻'},{title:'识别对方',text:'普通羰基 / 酯 / 共轭烯酮。',formula:'C=O / COOR / C=C–C=O'},{title:'决定进攻位点',text:'1,2 加成、酰基取代或 1,4 加成。',formula:'Ccarbonyl 或 Cβ'}] }
    ],
    11: [
      { id:'d11-zero-01-aromatic', eyebrow:'Day 11 · 苯为什么这么“固执”', title:'苯环 6 个 π 电子不是三个互不相干的双键，而是一圈共享电子', body:'苯的 6 个 p 轨道连续重叠，6 个 π 电子离域在整个环上，形成额外稳定的芳香体系。普通加成会破坏这整圈离域稳定，所以苯更倾向先让一个亲电试剂替换掉 H，最后恢复芳香性——这就是亲电芳香取代。', formulas:['苯：6 π e⁻，满足 4n+2（n=1）','EAS：加成到 σ 复合物 → 去 H⁺ → 恢复芳香性'], analogy:{title:'像六个人共同撑着一张很稳定的大网',body:'若直接把一处双键“永久加成掉”，整张共享网络被破坏；取代最终能把网络恢复回来。',boundary:'芳香性来自量子力学离域与轨道能级，不只是“大家共享”。'}, sequence:[{title:'先看芳香稳定',text:'6 π 电子离域。',formula:'benzene π cloud'},{title:'亲电体先加到环上',text:'暂时破坏芳香性。',formula:'Ar–H + E⁺ → σ-complex'},{title:'再去 H⁺',text:'重新形成 π 键，芳香性恢复。',formula:'σ-complex → Ar–E + H⁺'}] },
      { id:'d11-zero-02-ortho-meta-para', eyebrow:'Day 11 · 邻间对其实只是地址', title:'先把苯环当成六个门牌：1,2 是邻，1,3 是间，1,4 是对', body:'o/m/p 不是新的化学本质，只是描述两个取代基相对位置的简写。先固定第一个取代基在 C1，然后沿环数：相邻 C2 是 ortho，隔一个 C3 是 meta，对面 C4 是 para。', formulas:['1,2 = ortho (o-)','1,3 = meta (m-)','1,4 = para (p-)'], analogy:{title:'像圆桌座位编号',body:'先把一个人放在 1 号座，旁边 2 号叫邻位，隔一个 3 号叫间位，对面 4 号叫对位。',boundary:'多取代时需正式编号，不总用 o/m/p。'}, sequence:[{title:'固定 C1',text:'第一个取代基当参照。',formula:'C1–R'},{title:'找 C2',text:'紧邻 → ortho。',formula:'1,2'},{title:'找 C3',text:'隔一位 → meta。',formula:'1,3'},{title:'找 C4',text:'对面 → para。',formula:'1,4'}] }
    ],
    12: [
      { id:'d12-zero-01-amine-lonepair', eyebrow:'Day 12 · 胺为什么有碱性', title:'氮上的孤对电子就是“可以接 H⁺ 的一对电子”', body:'胺氮通常有一对孤对电子，因此能与 H⁺ 形成新的 N–H 键，表现出碱性；同一对孤对电子也能进攻亲电碳，表现亲核性。如果这对电子被芳环共振分散，像苯胺那样，拿来接 H⁺ 的意愿就会降低，碱性变弱。', formulas:['R₃N: + H⁺ → R₃NH⁺','aniline：N 孤对与芳环共振 → 碱性降低'], analogy:{title:'像氮手里有一张“备用电子对”',body:'可以拿来接 H⁺，也可以拿来和亲电碳成键；若这张备用资源被拿去和芳环共享，就没那么容易再拿出来。',boundary:'碱性还受诱导、溶剂化、位阻等影响。'}, sequence:[{title:'找 N 孤对',text:'先问有没有可用电子对。',formula:':NH₂R'},{title:'接 H⁺',text:'孤对变成 N–H 键。',formula:':N + H⁺ → N–H⁺'},{title:'共振会“占用”孤对',text:'苯胺中电子可分散进环。',formula:'Ph–NH₂ ⇄ resonance'}] },
      { id:'d12-zero-02-diazonium', eyebrow:'Day 12 · 为什么重氮盐像“万能接口”', title:'Ar–N₂⁺ 最厉害的地方：N₂ 是极稳定的小分子，很愿意离开', body:'芳香胺经重氮化得到 Ar–N₂⁺。后续很多替换之所以能发生，是因为 N₂ 离开后形成非常稳定的氮气，这为 Cl、Br、CN、OH 等不同基团接入提供了共同出口。', formulas:['ArNH₂ →[NaNO₂/HCl, 0–5°C] ArN₂⁺Cl⁻','ArN₂⁺ → ArCl / ArBr / ArCN / ArOH + N₂↑'], analogy:{title:'像把原来的 NH₂ 换成一个标准化“转接头”',body:'一旦装上重氮接口，就能接到多种不同终端。',boundary:'不同替换需要具体 Cu(I) 盐、温度等条件，不能只写“换掉”。'}, sequence:[{title:'先重氮化',text:'把 –NH₂ 变成 –N₂⁺。',formula:'ArNH₂ → ArN₂⁺'},{title:'N₂ 离开',text:'氮气稳定、推动过程。',formula:'ArN₂⁺ → Ar⁺? + N₂（简化表示）'},{title:'新基团接入',text:'按条件换成 Cl/Br/CN/OH 等。',formula:'Ar–X'}] }
    ],
    13: [
      { id:'d13-zero-01-dbe-intuition', eyebrow:'Day 13 · 结构侦探真正第一步', title:'DBE 不是一条要死背的公式，它在数“少了几对氢”', body:'与完全饱和开链烷烃相比，每出现一个环或一个双键，分子通常少 2 个 H；一个三键相当于少 4 个 H。因此 DBE 可以理解成“这个分子有多少份不饱和程度”。公式只是把这种氢亏损自动算出来。', formulas:['DBE=(2C+2+N−H−X)/2','1 个环 = 1 DBE；1 个双键 = 1；1 个三键 = 2'], analogy:{title:'像做“氢原子账本”',body:'先算满员状态该有多少 H，再看实际少了几对。每少一对，通常意味着多了一个环或一根 π 键。',boundary:'含 O/S 不进简式，特殊价态体系要谨慎。'}, sequence:[{title:'满饱和基准',text:'开链烷烃 CₙH₂ₙ₊₂。',formula:'C4 → H10'},{title:'实际若 C4H8',text:'少 2H。',formula:'DBE=1'},{title:'可能是什么',text:'一个环或一个双键。',formula:'ring 或 C=C'}] },
      { id:'d13-zero-02-ir', eyebrow:'Day 13 · IR 为什么能认官能团', title:'红外光像在“拨动化学键”，不同键有不同振动频率', body:'化学键不是静止棍子，而会伸缩、弯曲。红外光若频率刚好匹配某种振动，就会被吸收。不同键强度、原子质量不同，所以 O–H、C=O、C≡N 等会出现在不同波数区域。你不是在背随机数字，而是在认不同“振动声音”。', formulas:['O–H：约 3200–3600 cm⁻¹（常宽）','C=O：约 1650–1750 cm⁻¹（常强）','C≡N：约 2210–2260 cm⁻¹'], analogy:{title:'像每种琴弦有自己更容易共振的音高',body:'拨到对的频率，某根键的振动会特别强。',boundary:'峰形和位置会受氢键、共轭、环张力等影响。'}, sequence:[{title:'先找最醒目的强峰',text:'例如 C=O。',formula:'~1700 cm⁻¹'},{title:'再看宽峰/尖峰',text:'O–H 常宽，C≡N 常尖。',formula:'3200–3600 vs 2250'},{title:'把 IR 当排除证据',text:'没有对应峰也很重要。',formula:'有/无 都是证据'}] }
    ],
    14: [
      { id:'d14-zero-01-nmr-why', eyebrow:'Day 14 · NMR 不是“神秘峰图”', title:'把每一组氢想成住在不同“电子环境”里的居民', body:'外加磁场中，氢核会有能级差；周围电子会产生屏蔽效应，让不同化学环境的氢在略不同的频率吸收。于是每一种等价氢环境通常给一组信号。NMR 的核心不是背峰，而是问：这个分子里有几种不同的氢环境？', formulas:['化学位移 δ：环境位置','积分：这组氢有多少个','裂分：附近常有多少个不等价邻氢'], analogy:{title:'化学位移像地址，积分像住户人数，裂分像隔壁邻居数',body:'一个峰组先告诉你“住在哪类街区”，面积告诉你住几个人，裂分再提示隔壁有几个人。',boundary:'n+1 只适用于简单一阶耦合，真实谱可能复杂。'}, sequence:[{title:'先数信号组数',text:'决定有几种不同氢环境。',formula:'symmetry → fewer signals'},{title:'看积分',text:'按比例估计每组 H 数。',formula:'3H : 2H : 1H'},{title:'看裂分',text:'常用 n+1 反推邻氢。',formula:'triplet ↔ 2 adjacent H'},{title:'最后再拼片段',text:'把多个证据一起满足。',formula:'shift + integral + splitting'}] },
      { id:'d14-zero-02-symmetry', eyebrow:'Day 14 · 为什么对称性能突然少很多峰', title:'如果两个 H 所处的整个电子环境完全等价，NMR 看不出它们的区别', body:'结构对称会让原本看起来在不同位置的原子，实际上处在相同磁环境中。比如丙酮两个 CH₃ 因分子对称而等价，6 个 H 只给一个主要 singlet。学会先找对称性，能大幅减少猜结构难度。', formulas:['CH₃COCH₃：两个 CH₃ 等价 → 1 组 6H singlet'], analogy:{title:'像两间完全镜像、朝向和邻居都一样的房间',body:'邮递员只看“环境标签”时，无法区分住户来自左房还是右房。',boundary:'某些构象与手性环境会让表面相同的 H 变成不等价。'}, sequence:[{title:'先找对称轴/面对称',text:'问两边能否互换。',formula:'CH₃–CO–CH₃'},{title:'若互换后分子不变',text:'对应氢往往化学等价。',formula:'6H same environment'},{title:'信号数减少',text:'不需要为每个 CH₃ 单独画峰。',formula:'one singlet'}] }
    ],
    15: [
      { id:'d15-zero-01-stereo', eyebrow:'Day 15 · 连法一样也可能不是同一个分子', title:'二维连接关系相同，不代表三维空间排列相同', body:'结构异构关注“谁和谁相连”；立体异构则是连接关系相同，但空间朝向不同。最直观例子是左右手：手指连接顺序一样，但镜像后不能通过旋转完全重合。手性碳就是有机分子里产生这种“左右手版本”的常见源头。', formulas:['四面体 C* 连 4 个不同取代基 → 可能手性','镜像不可重合 → 对映体'], analogy:{title:'左右手：零件一样、连接一样，空间朝向不同',body:'把左手怎么旋转都不能完全变成右手。',boundary:'不是所有四面体碳都手性；四个取代基必须彼此不同。'}, sequence:[{title:'先检查连接关系',text:'是否完全一样。',formula:'same connectivity'},{title:'再看镜像',text:'能否通过旋转重合。',formula:'mirror image'},{title:'不能重合',text:'就是一对对映体。',formula:'R / S'}] },
      { id:'d15-zero-02-cip', eyebrow:'Day 15 · R/S 不是凭眼睛顺时针', title:'先排优先级，再把最低优先级放到背后，最后才看 1→2→3', body:'CIP 比较与手性碳直接相连原子的原子序数；若第一层相同，再向外逐层比较。把最低优先级 4 指向后方后，1→2→3 顺时针是 R，逆时针是 S。', formulas:['优先级：原子序数高 > 低','4 在后：1→2→3 clockwise = R'], analogy:{title:'像先给四个人按身份证号排队，再从正确观众席方向看路线',body:'如果 4 号没有放到背后，你看到的顺逆时针会被翻转。',boundary:'多重键需按 CIP 展开规则处理。'}, sequence:[{title:'排 1–4',text:'先只做优先级。',formula:'Br > O > C > H'},{title:'把 4 放后',text:'H 常是最低优先级。',formula:'4 away'},{title:'看 1→2→3',text:'顺时针 R，逆时针 S。',formula:'R / S'}] }
    ],
    16: [
      { id:'d16-zero-01-judges', eyebrow:'Day 16 · 排序题终于不靠感觉', title:'绝大多数“谁更强/更稳/更快”都在比较几位固定裁判', body:'共振、诱导、杂化、芳香性、位阻、中间体稳定、分子间作用力、离去基/溶剂条件，是你前 15 天不断碰到的底层因素。排序题不是再背新结论，而是识别这次哪位裁判权重最大。', formulas:['先定比较对象 → 找主导因素 → 再处理次要因素'], analogy:{title:'像比赛有不同裁判项目',body:'比酸性时“共轭碱稳定”权重很大；比 SN2 时位阻权重大；比沸点时分子间作用力权重大。不能拿同一把尺量所有题。',boundary:'多因素冲突时要综合，不是永远只有一个因素。'}, sequence:[{title:'先问比什么',text:'酸性/碱性/稳定/反应速率/物性。',formula:'target property'},{title:'列可能因素',text:'共振、诱导、位阻……',formula:'factor list'},{title:'找主导因素',text:'先解释最明显差别。',formula:'dominant factor'},{title:'最后处理冲突',text:'若两个因素相反，再比较强弱。',formula:'weigh evidence'}] },
      { id:'d16-zero-02-arrow-grammar', eyebrow:'Day 16 · 电子箭头最终统一', title:'所有双电子曲箭都只做一件事：搬一对电子', body:'箭尾必须落在现有电子上：孤对、负电、π 键或 σ 键；箭头指向新键形成处，或指向一个原子表示键电子完全回到那个原子。只要坚持“箭尾有电子、箭头有去处”，很多机理错误会自动消失。', formulas:['箭尾：lone pair / π / σ','箭头到原子间 → 成键','箭头到原子 → 断键后电子归该原子'], analogy:{title:'像记账转账：钱必须从真实账户转出，也必须有明确收款方',body:'不能从空白处凭空画箭，也不能让电子转完后原子超过合理价层却不处理。',boundary:'自由基需用单电子鱼钩箭头。'}, sequence:[{title:'先找余额',text:'哪里有电子。',formula:':Nu / π / σ'},{title:'找收款方',text:'哪里能接电子。',formula:'C⁺ / Cδ⁺ / H⁺'},{title:'检查账本',text:'原子价数、电荷、电子数是否合理。',formula:'octet / charge bookkeeping'}] }
    ],
    17: [
      { id:'d17-zero-01-retro', eyebrow:'Day 17 · 合成真正第一步', title:'别先翻试剂表：先把起点和终点放在一起“找不同”', body:'合成题最容易卡住，是因为一上来就在脑子里搜索几十个反应。更稳的方法是先比较：碳数变没变？官能团变了什么？新出现了哪根 C–C 键？最后一步最像哪类已学反应？这一步是在把复杂目标压缩成少数可回答的问题。', formulas:['Target − Start = 官能团变化 + 碳骨架变化','最后一步猜测 → 前体 → 正向验证'], analogy:{title:'像修一座桥先看两岸距离，而不是先冲进五金店买工具',body:'先知道缺的是一块桥板、一个支柱还是整段道路，才知道需要哪类反应。',boundary:'逆推只给候选路线，必须正向验证试剂和兼容性。'}, sequence:[{title:'碳数账本',text:'先数起点/终点 C。',formula:'C_start → C_target'},{title:'圈官能团差异',text:'例如 C=C → OH。',formula:'FGI'},{title:'找新 C–C',text:'若碳数增加，标记可能的关键成键。',formula:'C—C new'},{title:'猜最后一步',text:'从目标往前退一步。',formula:'Target ⇐ precursor'}] },
      { id:'d17-zero-02-carbon-ledger', eyebrow:'Day 17 · 碳数是合成题最可靠的“会计”', title:'每一步都记一笔：碳数有没有增加、减少、保持', body:'Grignard 加甲醛通常 +1C；加乙醛等增加对应羰基片段；CN⁻ 取代后水解能 +1C；Hofmann 降解会 -1C；普通氧化还原通常不改碳数。先用碳数排除不可能路线，能大幅减轻记忆负担。', formulas:['R–X + CN⁻ → R–CN → R–CO₂H：+1 C','RCONH₂ → RNH₂：Hofmann，−1 C'], analogy:{title:'像做现金流账本',body:'每步都写“+1、0、−1”，路线走到最后必须和目标总碳数对账。',boundary:'裂解反应可能把骨架分成多个片段，要分别记账。'}, sequence:[{title:'起点数碳',text:'写在左边。',formula:'C4'},{title:'每步标变化',text:'例如 CN 带来一个新碳。',formula:'+1'},{title:'终点核对',text:'必须和目标一致。',formula:'C5 ✓'}] }
    ],
    18: [
      { id:'d18-zero-01-order', eyebrow:'Day 18 · 为什么会做每一步还会合成错', title:'合成不是“反应清单”，而是步骤之间互相影响', body:'一个试剂往往不只认你想让它反应的官能团。强氧化剂会伤到别的位置；Grignard 会先被酸性 H 淬灭；Friedel–Crafts 受强失活基影响。多步合成真正考的是：现在这一步会不会破坏后面还需要的东西。', formulas:['RMgBr + H–O–R → RH（被淬灭）','强氧化剂：检查所有可氧化位点'], analogy:{title:'像装修房子必须考虑施工顺序',body:'先铺木地板再做大面积水泥施工，前面成果可能全毁；官能团也有自己的“怕什么”。',boundary:'保护基和顺序选择是化学选择性问题，不是生活规则。'}, sequence:[{title:'每步前做兼容检查',text:'试剂会不会碰别的官能团。',formula:'reagent vs all FGs'},{title:'必要时保护',text:'暂时遮住敏感位置。',formula:'protect → react → deprotect'},{title:'每步后重算结构',text:'不要默认只变了你想变的位置。',formula:'validate intermediate'}] },
      { id:'d18-zero-02-protection', eyebrow:'Day 18 · 保护基不是“多余步骤”', title:'当一个官能团会抢先反应时，先给它戴临时保护罩', body:'例如 Grignard 遇 –OH 会立刻酸碱反应，被消耗而无法加成羰基。此时可以先把 –OH 转成不那么酸、不那么活泼的保护形式，完成目标反应后再恢复 –OH。保护基的价值是“让正确的位点在正确的时间反应”。', formulas:['ROH → protected OR → target reaction → ROH'], analogy:{title:'像装修时先给不想沾漆的家具套保护膜',body:'不是家具本身没用，而是暂时不希望它参与当前工序。',boundary:'真正保护基要考虑安装/拆除条件和正交性。'}, sequence:[{title:'识别冲突',text:'当前试剂会先毁掉哪个官能团。',formula:'RMgBr + OH ✗'},{title:'临时保护',text:'把冲突位点变成惰性形式。',formula:'OH → OR(protected)'},{title:'完成主反应',text:'让试剂只做目标变化。',formula:'target step'},{title:'脱保护',text:'把原官能团恢复。',formula:'protected → OH'}] }
    ],
    19: [
      { id:'d19-zero-01-exam', eyebrow:'Day 19 · 今天不是再学新知识', title:'Boss 卷是在测试“离开扶手后，你还能不能自己找电子和变化”', body:'考试模式里不再给即时解析。遇到陌生结构时仍用前 18 天同一套内部语言：先圈官能团、找反应中心、读完整条件、追电子、检查碳数/区域/立体。不会时也先写出你能确定的第一步，而不是空白发呆。', formulas:['圈官能团 → 判反应类型 → 追电子/碳数 → 检查产物'], analogy:{title:'像第一次不带教练独立开车',body:'路况会变，但方向盘、刹车、路标的规则没变。',boundary:'成绩只是当前证据，不代表永久能力。'} }
    ],
    20: [
      { id:'d20-zero-01-repair', eyebrow:'Day 20 · 最后一天不是“再刷一遍”', title:'修复真正有效的方式：定位断点 → 换一道新结构 → 再独立成功', body:'如果只重复原题，很容易记住答案而不是学会能力。今天每个弱点都先找出你在哪一步断掉：没认官能团、没读条件、电子箭头方向错、碳数账错、还是路线兼容出问题。然后换一个新结构验证，直到你能在没有提示时重新走通。', formulas:['错误 ≠ 整章不会','定位错误步骤 → 修复 → 新结构迁移'], analogy:{title:'像修漏水不是重新刷整面墙，而是先找到哪根管子漏',body:'修对真正的断点，再用新题确认它不再漏。',boundary:'如果多个基础同时薄弱，仍需要更长周期的系统复习。'} }
    ]
  };

  Object.entries(PRE).forEach(([dayKey, lessons]) => {
    const day = Data.days[Number(dayKey)];
    if (!day || !Array.isArray(day.lessons)) return;
    const existing = new Set(day.lessons.map(x => x.id));
    const fresh = lessons.filter(x => !existing.has(x.id));
    day.lessons = [...fresh, ...day.lessons];
    day.estimatedMinutes = Math.max(Number(day.estimatedMinutes || 80), Number(dayKey) <= 4 ? 90 : 80);
  });

  const MICRO = {
    'd01-zero-02-groups': { prompt:'CH₃–CH₂–CH=CH₂ 里，第一眼最值得圈出的“反应把手”是哪一处？', options:['末端 CH₃','C=C','任意 C–H'], answer:1, feedback:'今天的反应核心是 C=C；先把官能团从整条碳链里圈出来。' },
    'd01-zero-04-break-bond': { prompt:'H–Br 异裂成 H⁺ 和 Br⁻ 时，原来 H–Br 键里的两个电子去了哪里？', options:['一人一个','都给 Br','都给 H'], answer:1, feedback:'异裂是两电子一起给一端；HBr 中通常把原键电子画给 Br。' },
    'd01-zero-07-why-stable': { prompt:'只按今天的基础模型，下面哪个碳正离子更稳定？', options:['一级','二级','都一样'], answer:1, feedback:'二级碳正离子有更多烷基帮助分散电子缺乏。' },
    'd01-zero-08-wonder': { prompt:'以后看到一条陌生机理，最先问哪个问题最有用？', options:['这个反应叫什么名字？','电子从哪里来？','答案长什么样？'], answer:1, feedback:'先找电子源，再找电子缺口，名字可以最后再贴上去。' },
    'd02-zero-01-condition-language': { prompt:'“HBr”与“HBr/ROOR”可以直接当同一条反应规则吗？', options:['可以','不可以'], answer:1, feedback:'ROOR 会把机理切换到自由基路径，区域选择也随之改变。' },
    'd02-zero-02-radical': { prompt:'自由基符号 “·” 表示什么？', options:['一个未配对电子','一个负电荷','一对孤对电子'], answer:0, feedback:'自由基最核心特征是一个未配对电子。' },
    'd03-zero-01-hybridization': { prompt:'比较端炔、烯烃、烷烃的 C–H，哪一类 H 通常最酸？', options:['端炔','烯烃','烷烃'], answer:0, feedback:'端炔去质子化后负电落在 sp 碳上，共轭碱相对更稳定。' },
    'd03-zero-02-carbon-nucleophile': { prompt:'炔负离子与一级溴代烃反应时，新生成的关键键是什么？', options:['C–O','C–C','O–H'], answer:1, feedback:'这是非常重要的增碳工具：通过 SN2 新建 C–C 键。' },
    'd04-zero-01-roles': { prompt:'SN2 中，谁负责提供形成新键的电子对？', options:['亲核体','离去基','亲电碳'], answer:0, feedback:'亲核体是电子对提供者，亲电碳是接收位置。' },
    'd04-zero-02-sn2-why-back': { prompt:'SN2 为什么倾向背面进攻？', options:['为了最好地重叠 σ* 并避开离去基一侧','因为背面温度更低','没有原因，只是口诀'], answer:0, feedback:'背面几何来自轨道重叠和位阻，而不是人为规定。' },
    'd05-zero-01-base-vs-nu': { prompt:'强碱去拿 β-H 并形成 C=C，这更像哪类过程？', options:['取代','消除'], answer:1, feedback:'夺 β-H、同时离去基离开并形成双键，就是消除思路。' },
    'd05-zero-02-alpha-beta': { prompt:'在 R–CH₂–CH(Br)–R′ 中，直接连 Br 的碳叫？', options:['α-C','β-C','γ-C'], answer:0, feedback:'带离去基的反应中心碳定义为 α-C，相邻碳才是 β-C。' },
    'd06-zero-01-oxygen': { prompt:'氧为什么既能被质子化又能做亲核体？', options:['因为有孤对电子','因为永远带正电','因为没有电子'], answer:0, feedback:'氧的孤对电子可以与 H⁺ 或其它亲电中心成键。' },
    'd06-zero-02-epoxide-strain': { prompt:'环氧比普通醚更容易开环，一个重要原因是？', options:['三元环有较大环张力','氧不存在孤对电子','三元环完全无张力'], answer:0, feedback:'开环能释放三元环的角张力和扭转张力。' },
    'd07-zero-01-carbonyl-polar': { prompt:'亲核体进攻 C=O 时，通常先打哪一个原子？', options:['羰基碳','羰基氧'], answer:0, feedback:'O 拉电子使羰基 C 带 δ⁺，它是更典型的亲电中心。' },
    'd07-zero-02-carbonyl-names': { prompt:'CH₃CHO 属于哪一类？', options:['醛','酮'], answer:0, feedback:'羰基碳连着 H，所以是醛。' },
    'd08-zero-01-acyl-family': { prompt:'亲核酰基取代中，Nu 先做什么？', options:['先攻击羰基碳','先攻击离去基 Y','先切断所有 C–C'], answer:0, feedback:'先亲核加成形成四面体中间体，之后才发生 Y 离去。' },
    'd08-zero-02-leaving': { prompt:'基础趋势中，哪一个通常更活泼？', options:['酰氯','酰胺'], answer:0, feedback:'Cl⁻ 是较好离去基，酰氯羰基也更亲电。' },
    'd09-zero-01-alpha': { prompt:'羰基旁边紧邻的碳叫什么？', options:['α-C','β-C','羰基氧'], answer:0, feedback:'以羰基为参照，紧邻碳就是 α-C。' },
    'd09-zero-02-aldol-bond': { prompt:'Aldol 新 C–C 键常形成在 enolate 的 α-C 与谁之间？', options:['另一个羰基碳','羰基氧','任意 H'], answer:0, feedback:'enolate 的碳端进攻另一个羰基的亲电 C。' },
    'd10-zero-01-unify-enolate': { prompt:'Michael 加成中，enolate 主要进攻 α,β-不饱和羰基的哪个位置？', options:['β-C','羰基 O','任意芳环'], answer:0, feedback:'Michael 是典型 1,4-加成，亲核体攻击 β-C。' },
    'd11-zero-01-aromatic': { prompt:'苯为什么更常做取代而不是普通加成？', options:['取代最终可以恢复芳香稳定性','因为苯没有 π 电子','因为 H 不能离去'], answer:0, feedback:'普通加成会永久损失芳香性；EAS 最终通过去 H⁺ 恢复芳香体系。' },
    'd11-zero-02-ortho-meta-para': { prompt:'苯环上 1,4-两个取代基的相对位置叫？', options:['邻位','间位','对位'], answer:2, feedback:'1,4 位于环的相对两侧，叫 para（对位）。' },
    'd12-zero-01-amine-lonepair': { prompt:'胺的碱性最直接来自什么？', options:['N 上孤对电子可接 H⁺','N 永远带正电','分子里有碳'], answer:0, feedback:'N 的孤对电子可以形成新的 N–H 键。' },
    'd12-zero-02-diazonium': { prompt:'重氮盐转化里，一个重要推动因素是？', options:['N₂ 是稳定气体并离开','N₂ 永远不离开','芳环被完全打碎'], answer:0, feedback:'N₂ 的稳定和逸出让重氮基成为非常好用的转换接口。' },
    'd13-zero-01-dbe-intuition': { prompt:'C₄H₈ 相比饱和开链 C₄H₁₀ 少 2 个 H，对应 DBE 大约是多少？', options:['0','1','2'], answer:1, feedback:'少一对 H = 1 份不饱和度。' },
    'd13-zero-02-ir': { prompt:'看到约 1700 cm⁻¹ 的强吸收，第一反应常是检查哪类键？', options:['C=O','C–C 单键','C–H 普通伸缩'], answer:0, feedback:'C=O 强峰常落在约 1650–1750 cm⁻¹。' },
    'd14-zero-01-nmr-why': { prompt:'NMR 积分最直接告诉你什么？', options:['这一组信号大约有多少个 H','分子总碳数','键能'], answer:0, feedback:'积分面积与该组等价氢数量成比例。' },
    'd14-zero-02-symmetry': { prompt:'丙酮 CH₃COCH₃ 的两个 CH₃ 为什么只给一组主要氢信号？', options:['它们在对称环境中等价','其中一个 CH₃ 没有 H','NMR 看不到甲基'], answer:0, feedback:'分子对称使两个甲基处于相同化学环境。' },
    'd15-zero-01-stereo': { prompt:'镜像后不能通过旋转完全重合的一对结构称为？', options:['对映体','同一个构象','完全无关'], answer:0, feedback:'连接相同、互为不可重合镜像就是对映体。' },
    'd15-zero-02-cip': { prompt:'判断 R/S 前，必须先做什么？', options:['按 CIP 排 1–4 优先级','直接凭顺时针看','先数总碳数'], answer:0, feedback:'优先级和观察方向没定好，顺逆时针没有意义。' },
    'd16-zero-01-judges': { prompt:'比较 SN2 速率时，通常哪个因素权重很大？', options:['反应中心位阻','颜色','分子名字长短'], answer:0, feedback:'SN2 需要背面接近，位阻通常是核心裁判之一。' },
    'd16-zero-02-arrow-grammar': { prompt:'双电子曲箭的箭尾能不能从空白处开始？', options:['不能','可以随便'], answer:0, feedback:'箭尾必须落在真实电子来源：孤对、π 键或 σ 键。' },
    'd17-zero-01-retro': { prompt:'看到合成目标时，第一步更稳的是？', options:['先比较起点和终点差了什么','马上随机写试剂','只背标准答案'], answer:0, feedback:'先找目标差异能把大问题压成官能团、碳数和关键键三个小问题。' },
    'd17-zero-02-carbon-ledger': { prompt:'R–Br → R–CN → R–CO₂H 这条线总碳数通常？', options:['比原来 +1 C','不变','−1 C'], answer:0, feedback:'CN⁻ 带来一个新碳，水解后这个碳成为羧基碳。' },
    'd18-zero-01-order': { prompt:'Grignard 试剂遇到未保护的 –OH 时最可能先发生？', options:['酸碱反应被淬灭','完全无影响','自动变成酯'], answer:0, feedback:'RMgX 是强碱，会先与酸性 O–H 反应，因此顺序/保护很重要。' },
    'd18-zero-02-protection': { prompt:'保护基的主要目的是什么？', options:['暂时让敏感官能团不参与当前步骤','让分子变漂亮','增加碳数'], answer:0, feedback:'保护基是暂时屏蔽反应性，等主反应完成再恢复。' },
    'd19-zero-01-exam': { prompt:'Boss 卷遇到陌生结构时，最稳的第一步是？', options:['圈官能团和反应中心','先猜答案','直接跳过所有结构'], answer:0, feedback:'你前 18 天练的就是把陌生结构翻译成熟悉的反应语言。' },
    'd20-zero-01-repair': { prompt:'错题修复最有效的确认方式是？', options:['换一道新结构再独立做对','只把原答案看十遍','只记题号'], answer:0, feedback:'新结构迁移能证明修复的是能力，不是原题记忆。' }
  };

  const WONDERS = {
    'd01-zero-03-electrons': '从这一刻开始，“为什么它要攻击这里”不再是玄学：你在追踪一对电子从高电子密度位置进入电子缺口。',
    'd01-zero-06-hbr-movie': '一条看似简单的 “C=C + HBr” 其实是一段完整电子故事：先成 C–H，再断 H–Br，再由 Br⁻ 补上 C–Br。',
    'd02-zero-02-radical': '同一分子只因为电子从“一对一起走”变成“一人一个”，就能进入完全不同的反应世界。',
    'd03-zero-02-carbon-nucleophile': '这里是第一次真正把两个原本分开的碳骨架接成更长的分子——合成化学从这里开始有“搭积木”的味道。',
    'd07-zero-01-carbonyl-polar': '以后看到醛、酮、酯、酰胺，先把 C=O 看成一根被极化的“电子坡道”，很多反应会突然变成同一种逻辑。',
    'd11-zero-01-aromatic': '苯环之所以“倔强”，不是因为双键不反应，而是整圈离域电子带来的芳香稳定性太值得保住。',
    'd14-zero-01-nmr-why': 'NMR 最迷人的地方是：你没有直接看到原子，却能从每组氢的“地址、人数、邻居”把结构一点点还原出来。',
    'd17-zero-01-retro': '真正的合成不是记住更多试剂，而是学会从目标倒着问：最后一根关键键，是谁和谁接上的？'
  };

  Object.values(Data.days).forEach(day => {
    (day.lessons || []).forEach(lesson => {
      if (MICRO[lesson.id] && !lesson.microCheck) lesson.microCheck = MICRO[lesson.id];
      if (WONDERS[lesson.id] && !lesson.wonder) lesson.wonder = WONDERS[lesson.id];
    });
  });
})();
