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
})();
