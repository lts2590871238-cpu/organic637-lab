(function () {
  'use strict';
  const Data = window.Organic637Data = window.Organic637Data || {};
  Data.SCAFFOLDS = {
    lessons: {
      'd02-lesson-conditions': {
        concept: '区域选择不是“方向突然反了”，而是机理换了。',
        definition: '普通 HBr 走离子型亲电加成；HBr/ROOR 走自由基链加成。',
        equations: ['CH₃CH=CH₂ + HBr → CH₃CHBrCH₃', 'CH₃CH=CH₂ + HBr/ROOR → CH₃CH₂CH₂Br'],
        watch: '先圈 ROOR，再决定是否使用自由基规则。'
      },
      'd02-lesson-branches': {
        concept: '一根 C=C 有很多“出口”，第一步先认产物类型。',
        definition: '加氢、加水、裂解、烯丙位取代的碳骨架变化完全不同。',
        equations: ['C=C + H₂/Pd → C–C', 'C=C + BH₃；H₂O₂/OH⁻ → 反 Markovnikov 醇', 'C=C + O₃；Zn/H₂O → 两个羰基片段', '烯烃 + NBS/hν → 烯丙位 Br，C=C 保留'],
        watch: '先问“双键消失、裂开，还是保留？”'
      },
      'd02-lesson-retro': {
        concept: '反合成不是倒着背答案，而是先猜“最后一步”。',
        definition: '把目标上的 OH/Br 暂时拿掉，在相邻碳间补回可能的 C=C，再正向验证。',
        equations: ['CH₃CH₂CH₂OH ⇐ CH₃CH=CH₂ + 1) BH₃ 2) H₂O₂/OH⁻', 'CH₃CHBrCH₂CH₃ ⇐ CH₂=CHCH₂CH₃ + HBr'],
        watch: '逆推提出候选，正向走一遍才算验证。'
      },
      'd03-lesson-acetylide': {
        concept: '端炔能变成碳负离子，是第一把可靠的 C–C 键工具。',
        definition: '端炔 pKa≈25，需要 NaNH₂ 等强碱；所得炔负离子对甲基/一级卤代烃做 SN2。',
        equations: ['RC≡CH + NaNH₂ → RC≡C⁻Na⁺ + NH₃', 'RC≡C⁻ + R′CH₂Br → RC≡CCH₂R′ + Br⁻'],
        watch: '三级卤代烃会更偏向 E2，不能把“炔负离子会增碳”无限推广。'
      },
      'd03-lesson-selectivity': {
        concept: '同一个 C≡C，可以停在烯烃，也可以走到羰基。',
        definition: '试剂控制还原深度、烯烃几何和水合区域。',
        equations: ['RC≡CR′ + H₂/Lindlar → cis-RCH=CHR′', 'RC≡CR′ + Na/NH₃(l) → trans-RCH=CHR′', 'RC≡CH + Hg²⁺/H₂SO₄/H₂O → 甲基酮', 'RC≡CH + 1) bulky BH₃ 2) H₂O₂/OH⁻ → 醛'],
        watch: '先辨“还原”还是“水合”，再看具体条件。'
      },
      'd03-lesson-diene': {
        concept: 'Diels–Alder 是一次建立六元环的 [4+2] 环加成。',
        definition: '4 个 π 电子来自共轭二烯，2 个 π 电子来自亲双烯体。',
        equations: ['CH₂=CH–CH=CH₂ + CH₂=CH₂ → 环己烯', '4 个碳 + 2 个碳 → 6 元环'],
        watch: '先数碳、看骨架，再学习 endo/exo 等更细立体选择。'
      },
      'd04-lesson-substrate': {
        concept: '卤代烃级数只看“连着离去基的那个碳”。',
        definition: '甲基/一级位阻小，三级能形成较稳定碳正离子；苄基/烯丙基还受共振稳定。',
        equations: ['CH₃Br：甲基', 'CH₃CH₂Br：一级', '(CH₃)₂CHBr：二级', '(CH₃)₃CBr：三级'],
        watch: '不要数整分子一共有几个碳。'
      },
      'd04-lesson-mechanism': {
        concept: 'SN2 一步，SN1 两步；有没有自由碳正离子决定很多后果。',
        definition: 'SN2 协同背面进攻；SN1 先电离再被亲核体捕获。',
        equations: ['SN2：Nu⁻ + R–X → R–Nu + X⁻', 'SN1：R–X → R⁺ + X⁻；R⁺ + Nu → R–Nu'],
        watch: 'SN1 有重排风险；SN2 通常没有自由碳正离子重排。'
      },
      'd04-lesson-arrows': {
        concept: '曲箭画的是电子，不是原子“走路”。',
        definition: '箭尾必须从已有电子出发：孤对电子、π 键或 σ 键。',
        equations: [':CN⁻ → Cδ⁺', 'C–Br 键电子 → Br⁻'],
        watch: '先找电子源，再找电子缺口。'
      }
    },
    questions: {
      'd02-hbr-roor-01': { equation: 'CH₃CH=CH₂ + HBr/ROOR → CH₃CH₂CH₂Br', logic: 'ROOR → 自由基世界；Br 到较少取代端。', reduced: 'HBr/ROOR → 反 Markovnikov' },
      'd02-hydroboration-01': { equation: 'CH₂=CHCH₂CH₃ →[1) BH₃·THF  2) H₂O₂/OH⁻] CH₃CH₂CH₂CH₂OH', logic: 'B 先到较少取代碳，氧化后原位变 OH。', reduced: '氢硼化-氧化 → 末端醇' },
      'd02-hydrogenation-01': { equation: '环己烯 + H₂/Pd → 环己烷', logic: '不改碳骨架，只把 C=C 还原成 C–C。', reduced: 'C=C + H₂ → C–C' },
      'd02-ozonolysis-01': { equation: '(CH₃)₂C=CHCH₃ →[O₃; Zn/H₂O] (CH₃)₂CO + CH₃CHO', logic: '从 C=C 中间剪开，每个双键碳变成羰基碳。', reduced: 'O₃/Zn → 双键两端各变羰基' },
      'd02-kmno4-01': { equation: 'CH₂=CHCH₂CH₃ →[热浓 KMnO₄] CO₂ + CH₃CH₂CO₂H', logic: '强氧化比还原性臭氧后处理走得更远。', reduced: '末端烯烃强氧化 → CO₂ + 羧酸' },
      'd02-nbs-01': { equation: '环己烯 + NBS/hν → 3-溴环己烯', logic: '双键保留；替换的是烯丙位 H。', reduced: 'NBS/hν → 烯丙位溴代' },
      'd02-route-propanol-01': { equation: 'CH₃CH=CH₂ →[1) BH₃ 2) H₂O₂/OH⁻] CH₃CH₂CH₂OH', logic: '目标 OH 在末端，所以优先找反 Markovnikov 水合。', reduced: '丙烯 → 1-丙醇：氢硼化-氧化' },
      'd02-retro-bromide-01': { equation: 'CH₂=CHCH₂CH₃ + HBr → CH₃CHBrCH₂CH₃', logic: '目标 Br 在较多取代碳，不加 ROOR。', reduced: '1-丁烯 + HBr → 2-溴丁烷' },
      'd03-acidity-rank-01': { equation: 'sp C–H > sp² C–H > sp³ C–H（酸性）', logic: 's 成分越高，共轭碱中的负电荷越稳定。', reduced: '酸性：sp > sp² > sp³' },
      'd03-base-01': { equation: 'RC≡CH + NaNH₂ → RC≡C⁻Na⁺ + NH₃', logic: '端炔 pKa≈25，NaOH 不够强。', reduced: '端炔去质子化：NaNH₂' },
      'd03-alkylation-01': { equation: 'HC≡C⁻ + CH₃CH₂Br → HC≡CCH₂CH₃', logic: '炔负离子 + 一级卤代烃 → SN2 增碳。', reduced: '炔负离子 + 1° RX → C–C' },
      'd03-hydration-01': { equation: 'HC≡CCH₂CH₃ →[HgSO₄/H₂SO₄/H₂O] CH₃COCH₂CH₃', logic: 'Markovnikov 水合烯醇 → 甲基酮。', reduced: '端炔 + Hg²⁺水合 → 甲基酮' },
      'd03-lindlar-01': { equation: 'CH₃C≡CCH₃ + H₂/Lindlar → (Z)-CH₃CH=CHCH₃', logic: '同面加氢，停在 cis 烯烃。', reduced: 'Lindlar → cis 烯烃' },
      'd03-dissolving-metal-01': { equation: 'RC≡CR′ + Na/NH₃(l) → trans-RCH=CHR′', logic: '溶解金属还原净 anti。', reduced: 'Na/NH₃ → trans 烯烃' },
      'd03-diels-alder-01': { equation: '1,3-丁二烯 + 乙烯 → 环己烯', logic: '[4+2]：4 个碳 + 2 个碳形成六元环。', reduced: 'Diels–Alder：4+2→6元环' },
      'd03-route-hexyne-01': { equation: 'HC≡CCH₂CH₃ →[NaNH₂] ⁻C≡CCH₂CH₃ →[CH₃CH₂Br] CH₃CH₂C≡CCH₂CH₃', logic: '先去端氢，再用一级二碳卤代物做 SN2。', reduced: '1-丁炔 → 炔负离子 → +2C' },
      'd04-substrate-01': { equation: 'CH₃CH₂CH₂Br：Br 所在碳只连 1 个碳 → 一级', logic: '级数只看反应中心碳。', reduced: 'CH₃CH₂CH₂Br = 1° RX' },
      'd04-leaving-rank-01': { equation: 'I⁻ > Br⁻ > Cl⁻ >> F⁻（离去能力）', logic: '较弱碱、较稳定阴离子通常是更好离去基。', reduced: 'LG：I > Br > Cl >> F' },
      'd04-sn2-rank-01': { equation: 'CH₃X > 1° > 2° >> 3°（SN2）', logic: 'SN2 必须背面接近，位阻越大越慢。', reduced: 'SN2：甲基 > 一级 > 二级 >> 三级' },
      'd04-sn2-condition-01': { equation: 'CH₃CH₂CH₂CH₂Br + CN⁻ →[DMSO] CH₃CH₂CH₂CH₂CN + Br⁻', logic: '一级底物 + 强亲核体 + 极性非质子溶剂。', reduced: '1° RBr + CN⁻/DMSO → SN2' },
      'd04-arrow-sn2-01': { equation: ':CN⁻ → CH₃CH₂–Br；同时 C–Br → Br⁻', logic: '两根箭属于同一个协同步骤。', reduced: 'Nu孤对→C；C–X→X' },
      'd04-sn1-condition-01': { equation: '(CH₃)₃CCl →[(H₂O/EtOH)] (CH₃)₃C⁺ → 取代产物', logic: '三级底物 + 极性质子介质有利于电离。', reduced: '3° RX + protic solvent → SN1倾向' },
      'd04-rearrangement-01': { equation: '2° C⁺ →[1,2-H shift] 3° C⁺ →[H₂O] 重排醇', logic: '只要存在自由碳正离子，就要检查是否能重排得更稳定。', reduced: 'SN1：先查重排，再捕获' },
      'd04-competition-01': { equation: 'SN2：一步，无自由 C⁺；SN1：先 C–X 异裂，有自由 C⁺', logic: '有没有碳正离子决定重排和速率式。', reduced: 'SN2协同；SN1分步' }
    }
  };


  Object.assign(Data.SCAFFOLDS.lessons, {
    'd01-lesson-structure': {
      analogy: { title: '像一只手握住，再多搭一条松一点的带子', body: 'σ 键像正面对握的主连接，比较牢；π 键像在上下方额外搭住的一层连接，更暴露，也更容易先被反应“碰到”。', boundary: '真实的 σ/π 是轨道重叠和电子云分布，不是两根实体绳子。' },
      visual: { left: 'C=C = σ + π', arrow: '先反应的通常是 π', right: 'C–C + 两个新 σ 键', caption: '以后看到烯烃，第一眼先盯住 C=C，而不是整分子一起看。' },
      lookQuestions: ['双键里哪一部分更容易先参与反应？','如果 π 键被消耗，两个碳之间最后还剩什么键？']
    },
    'd01-lesson-addition': {
      analogy: { title: '像把一个双层扣子的外层打开，腾出两个接口', body: '烯烃加成时不是把碳骨架拆掉，而是把 π 键的电子拿来形成两根新的 σ 键。', boundary: '“打开扣子”只表示键型变化，原子并不会真的像扣子那样机械弹开。' },
      visual: { left: 'C=C  +  A–B', arrow: 'π 键被消耗', right: 'A–C–C–B', caption: '先看“谁加到了双键两端”，再去讨论方向。' },
      lookQuestions: ['C=C 变成了什么？','A 和 B 分别去了哪里？','碳原子总数有没有变化？']
    },
    'd01-lesson-hbr': {
      analogy: { title: '正电荷像一个缺帮手的人', body: '如果正电荷落在周围有更多烷基邻居的碳上，邻居可以通过诱导与超共轭稍微分担它的“缺电子”状态，所以更稳定。', boundary: '这只是稳定性直觉，正式原因仍是诱导效应与超共轭。' },
      visual: { left: '1° C⁺', arrow: '<  2° C⁺  <', right: '3° C⁺', caption: '普通 HBr 加成先比较可能形成的碳正离子稳定性。' },
      lookQuestions: ['两种质子化方向分别会生成几级碳正离子？','Br⁻ 最后会去抓哪一个碳正离子？']
    },
    'd01-lesson-bromine': {
      analogy: { title: '像一对同款贴纸分别贴到双键两端', body: 'Br₂ 提供两个 Br，最终两个双键碳各得到一个 Br，原来的 π 键消失。', boundary: '真正机理会经过溴鎓离子，并不是两个 Br 同时平铺上去。' },
      visual: { left: 'C=C + Br–Br', arrow: '加成', right: 'Br–C–C–Br', caption: '先记“两个 Br 都进产物”，再逐步理解溴鎓离子。' },
      lookQuestions: ['双键还在不在？','产物里新增了几个 Br？']
    },
    'd01-lesson-halohydrin': {
      analogy: { title: '水不是看热闹的人，而是真的下场参赛', body: 'Br₂/H₂O 中，水会参与开环，所以产物不是二溴化物，而是一个 Br 加一个 OH。', boundary: 'OH 的区域选择来自溴鎓离子开环时较多正电性位置更易被水进攻。' },
      visual: { left: 'C=C + Br₂/H₂O', arrow: '水参与', right: 'Br–C–C–OH', caption: '和 Br₂/CCl₄ 放在一起比较最容易记。' },
      lookQuestions: ['和 Br₂/CCl₄ 相比，产物里哪个基团被换成了 OH？','为什么不能只看到 Br₂ 就写二溴化物？']
    },
    'd01-lesson-summary': {
      analogy: { title: '像到同一个十字路口先看路牌', body: '底物都是烯烃，但 HBr、Br₂、Br₂/H₂O 是三块不同路牌。先认条件，再决定产物类型，最后才看区域与立体。', boundary: '类比只是帮助建立审题顺序，真正判产物仍要靠反应机理。' },
      lookQuestions: ['先圈出试剂中最能区分路线的部分。','先判断“双键消失后加了什么”，再判断“加在哪”。']
    },
    'd02-lesson-conditions': { analogy: { title: '同一个路口，路牌多一个词就可能换一条路', body: 'HBr 和 HBr/ROOR 看起来只多了 ROOR，但它把反应从离子型换到自由基链过程，区域选择因此改变。', boundary: '过氧化物效应主要针对 HBr，不能机械套到 HCl 或 HI。' } },
    'd02-lesson-branches': { analogy: { title: '像一个总开关接着五个出口', body: '看到 C=C 后先问：这次是加氢、加水、裂解，还是只改烯丙位？先分大类，比直接背产物快得多。', boundary: '同一反应大类内部仍可能有区域、立体和后处理差别。' } },
    'd02-lesson-retro': { analogy: { title: '像导航时从目的地倒着找最后一个路口', body: '目标里看到 OH 或 Br，不要立刻搜试剂表；先问“最后一步最像哪种变化”，再补回可能的 C=C。', boundary: '倒推得到的只是候选路线，必须正向验证条件与兼容性。' } },
    'd02-lesson-radical-chain': { analogy: { title: '像接力赛：一个自由基交棒给下一个', body: '链引发产生自由基，传播步骤不断“用掉一个自由基、再生一个自由基”，所以反应可以持续。', boundary: '自由基链并不是所有步骤都同样快，真实速率受引发、传播、终止共同影响。' } },
    'd03-lesson-acetylide': { analogy: { title: '负电荷像被更短的绳子拴得更靠近原子核', body: 'sp 碳 s 成分更高，电子平均更靠近原子核，所以端炔失去 H 后形成的负电荷比烯烃、烷烃对应负离子更稳定。', boundary: '“更近”是轨道性质的直觉，不等于电子固定在某个点。' } },
    'd03-lesson-selectivity': { analogy: { title: '像踩刹车决定停在哪一站', body: 'Lindlar 让炔烃停在 cis 烯烃，Na/NH₃ 停在 trans 烯烃；水合条件则把路线带到羰基。', boundary: '不同试剂不是同一个机理的“刹车强弱”，而是走不同反应路径。' } },
    'd03-lesson-diene': { analogy: { title: '像四块拼图和两块拼图一次扣成一个六边形', body: 'Diels–Alder 把共轭二烯的 4 个碳和亲双烯体的 2 个碳一次组成六元环，同时形成两根新 σ 键。', boundary: '真实过程受轨道对称性、构象和取代基控制，并不是任意 4+2 碳都能拼。' } },
    'd03-lesson-terminal-test': { analogy: { title: '先找“门把手”再判断这扇门能不能打开', body: '端炔最显眼的门把手就是 ≡C–H。只有找到这个 H，才谈得上去质子化、炔负离子和炔银检验。', boundary: '内部炔也会参与许多反应，只是没有端炔这组特征性质。' } },
    'd04-lesson-substrate': { analogy: { title: '只数门口挤了几个人，不数整栋楼', body: '一级、二级、三级卤代烃只看带离去基的那个碳直接连了几个碳。整分子再大，也不能把远处的碳算进级数。', boundary: '苄基、烯丙基等还要额外考虑共振稳定。' } },
    'd04-lesson-mechanism': { analogy: { title: 'SN2 是同时换座，SN1 是先空座再来人', body: 'SN2 中亲核体进攻和离去基离开同一步发生；SN1 先让离去基走，形成碳正离子，再等亲核体进来。', boundary: '“座位”只是帮助记步骤，真实过程由轨道、溶剂和能垒决定。' } },
    'd04-lesson-arrows': { analogy: { title: '像转账：钱必须从有余额的账户转出去', body: '曲箭箭尾一定从已有电子出发——孤对电子、π 键或 σ 键；不能从一个空位置凭空画箭。', boundary: '曲箭表示电子对迁移，不表示整个原子沿着箭头飞过去。' } },
    'd04-lesson-rate-solvent': { analogy: { title: '看慢步骤里到底有几个人在排队', body: 'SN2 的关键一步同时需要底物和亲核体，所以速率看两者；SN1 的慢步骤只是底物先电离，所以速率主要看底物。', boundary: '速率式是实验动力学结论，不只是数反应式左边有几种物质。' } }
  });

  const RESTORE_BASE = {
  "d02-lesson-conditions": {
    "concept": "区域选择不是“方向突然反了”，而是机理换了。",
    "definition": "普通 HBr 走离子型亲电加成；HBr/ROOR 走自由基链加成。",
    "equations": [
      "CH₃CH=CH₂ + HBr → CH₃CHBrCH₃",
      "CH₃CH=CH₂ + HBr/ROOR → CH₃CH₂CH₂Br"
    ],
    "watch": "先圈 ROOR，再决定是否使用自由基规则。"
  },
  "d02-lesson-branches": {
    "concept": "一根 C=C 有很多“出口”，第一步先认产物类型。",
    "definition": "加氢、加水、裂解、烯丙位取代的碳骨架变化完全不同。",
    "equations": [
      "C=C + H₂/Pd → C–C",
      "C=C + BH₃；H₂O₂/OH⁻ → 反 Markovnikov 醇",
      "C=C + O₃；Zn/H₂O → 两个羰基片段",
      "烯烃 + NBS/hν → 烯丙位 Br，C=C 保留"
    ],
    "watch": "先问“双键消失、裂开，还是保留？”"
  },
  "d02-lesson-retro": {
    "concept": "反合成不是倒着背答案，而是先猜“最后一步”。",
    "definition": "把目标上的 OH/Br 暂时拿掉，在相邻碳间补回可能的 C=C，再正向验证。",
    "equations": [
      "CH₃CH₂CH₂OH ⇐ CH₃CH=CH₂ + 1) BH₃ 2) H₂O₂/OH⁻",
      "CH₃CHBrCH₂CH₃ ⇐ CH₂=CHCH₂CH₃ + HBr"
    ],
    "watch": "逆推提出候选，正向走一遍才算验证。"
  },
  "d03-lesson-acetylide": {
    "concept": "端炔能变成碳负离子，是第一把可靠的 C–C 键工具。",
    "definition": "端炔 pKa≈25，需要 NaNH₂ 等强碱；所得炔负离子对甲基/一级卤代烃做 SN2。",
    "equations": [
      "RC≡CH + NaNH₂ → RC≡C⁻Na⁺ + NH₃",
      "RC≡C⁻ + R′CH₂Br → RC≡CCH₂R′ + Br⁻"
    ],
    "watch": "三级卤代烃会更偏向 E2，不能把“炔负离子会增碳”无限推广。"
  },
  "d03-lesson-selectivity": {
    "concept": "同一个 C≡C，可以停在烯烃，也可以走到羰基。",
    "definition": "试剂控制还原深度、烯烃几何和水合区域。",
    "equations": [
      "RC≡CR′ + H₂/Lindlar → cis-RCH=CHR′",
      "RC≡CR′ + Na/NH₃(l) → trans-RCH=CHR′",
      "RC≡CH + Hg²⁺/H₂SO₄/H₂O → 甲基酮",
      "RC≡CH + 1) bulky BH₃ 2) H₂O₂/OH⁻ → 醛"
    ],
    "watch": "先辨“还原”还是“水合”，再看具体条件。"
  },
  "d03-lesson-diene": {
    "concept": "Diels–Alder 是一次建立六元环的 [4+2] 环加成。",
    "definition": "4 个 π 电子来自共轭二烯，2 个 π 电子来自亲双烯体。",
    "equations": [
      "CH₂=CH–CH=CH₂ + CH₂=CH₂ → 环己烯",
      "4 个碳 + 2 个碳 → 6 元环"
    ],
    "watch": "先数碳、看骨架，再学习 endo/exo 等更细立体选择。"
  },
  "d04-lesson-substrate": {
    "concept": "卤代烃级数只看“连着离去基的那个碳”。",
    "definition": "甲基/一级位阻小，三级能形成较稳定碳正离子；苄基/烯丙基还受共振稳定。",
    "equations": [
      "CH₃Br：甲基",
      "CH₃CH₂Br：一级",
      "(CH₃)₂CHBr：二级",
      "(CH₃)₃CBr：三级"
    ],
    "watch": "不要数整分子一共有几个碳。"
  },
  "d04-lesson-mechanism": {
    "concept": "SN2 一步，SN1 两步；有没有自由碳正离子决定很多后果。",
    "definition": "SN2 协同背面进攻；SN1 先电离再被亲核体捕获。",
    "equations": [
      "SN2：Nu⁻ + R–X → R–Nu + X⁻",
      "SN1：R–X → R⁺ + X⁻；R⁺ + Nu → R–Nu"
    ],
    "watch": "SN1 有重排风险；SN2 通常没有自由碳正离子重排。"
  },
  "d04-lesson-arrows": {
    "concept": "曲箭画的是电子，不是原子“走路”。",
    "definition": "箭尾必须从已有电子出发：孤对电子、π 键或 σ 键。",
    "equations": [
      ":CN⁻ → Cδ⁺",
      "C–Br 键电子 → Br⁻"
    ],
    "watch": "先找电子源，再找电子缺口。"
  }
};
  Object.entries(RESTORE_BASE).forEach(([id, row]) => Object.assign(Data.SCAFFOLDS.lessons[id], row));
})();
