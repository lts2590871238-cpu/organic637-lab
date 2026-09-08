(function () {
  'use strict';

  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};

  window.Organic637Data.days[3] = {
    day: 3,
    title: '炔烃：把 sp 碳变成一把增碳钥匙',
    subtitle: '端炔既能按条件变成羰基或烯烃，也能先失去端氢，再用炔负离子构建新的 C–C 键。',
    estimatedMinutes: 90,
    objectives: [
      '识别端炔酸性来自 sp 碳较高的 s 成分',
      '用强碱生成炔负离子，并学会用“一边成 C–C、一边让 X 离开”的方式增碳；Day4 再给这种取代正式命名',
      '区分炔烃两种水合与两种选择性还原',
      '识别共轭二烯并完成基础 Diels–Alder 判断',
      '开始用光谱硬证据淘汰候选，并做一步微型逆推'
    ],
    lessons: [
      {
        id: 'd03-lesson-acetylide',
        eyebrow: 'Day 3 · 第一把 C–C 键工具',
        title: '端炔的 H 不是普通烷烃 H',
        body: '端炔氢连在 sp 碳上。去质子化后的负电荷处于 s 成分较高的轨道，较稳定，所以端炔比烯烃和烷烃明显更酸；但 pKa 仍约 25，需要 NaNH₂ 等足够强的碱。',
        note: '酸性“更强”是相对比较，不等于能被 NaOH 定量去质子化。'
      },
      {
        id: 'd03-lesson-selectivity',
        eyebrow: '同一个炔键 · 不同出口',
        title: '先区分“停在烯烃”还是“走到羰基”',
        body: 'Lindlar 催化剂把炔烃停在顺式烯烃；Na/NH₃(l) 给反式烯烃。端炔在 Hg²⁺/H₂SO₄/H₂O 下经烯醇互变为甲基酮，在体积较大的硼烷氧化条件下则可得到醛。',
        note: '试剂决定区域和立体，不能只记“炔烃会加成”。'
      },
      {
        id: 'd03-lesson-diene',
        eyebrow: '第二条碳骨架路线',
        title: '共轭二烯与亲双烯体一次形成两根 σ 键',
        body: 'Diels–Alder 是协同 [4+2] 环加成：共轭二烯提供四个 π 电子，烯烃或炔烃亲双烯体提供两个 π 电子，生成六元环并保留一根新双键。',
        note: '今天先抓住碳骨架变化，后续再逐层加入取代基和立体选择。'
      }
    ],
    questions: [
      {
        id: 'd03-acidity-rank-01', day: 3, type: 'ranking', role: 'learn',
        primarySkill: 'alkyne.terminal_acidity',
        skillIds: ['alkyne.terminal_acidity', 'ranking.acidity'],
        difficulty: 2,
        prompt: '按酸性由强到弱排列下列 C–H。',
        examTags: ['酸性排序', '杂化', '真题同型训练'],
        hints: ['比较失去 H 后负电荷所在碳的杂化。', 's 成分越高，碳的电负性表现越强，负电荷越稳定。'],
        explanationLayers: {
          short: '乙炔 > 乙烯 > 乙烷。',
          why: '共轭碱负电荷依次位于 sp、sp²、sp³ 碳；s 成分依次降低。',
          full: '端炔 pKa 约 25，烯烃约 44，烷烃约 50。比较的是同类 C–H 去质子化后碳负离子的稳定性，而不是分子里 π 键数目的简单多少。'
        },
        items: [
          { id: 'a', label: 'HC≡CH', factor: 'sp' },
          { id: 'b', label: 'H₂C=CH₂', factor: 'sp2' },
          { id: 'c', label: 'CH₃CH₃', factor: 'sp3' }
        ],
        correctOrder: ['a', 'b', 'c'],
        factorTags: ['hybridization'],
        answer: ['a', 'b', 'c']
      },
      {
        id: 'd03-base-01', day: 3, type: 'choice', role: 'practice',
        primarySkill: 'alkyne.acetylide_formation',
        skillIds: ['alkyne.acetylide_formation', 'alkyne.terminal_acidity'],
        difficulty: 1,
        prompt: '要把 1-丁炔较完全地转化为炔负离子，最合适的试剂是哪一个？',
        examTags: ['酸碱', '试剂选择'],
        hints: ['端炔 pKa 约 25。', '需要共轭酸 pKa 明显高于端炔的强碱。'],
        explanationLayers: {
          short: '选 NaNH₂（液氨中）。',
          why: 'NH₂⁻ 足够强，可使端炔去质子化；OH⁻ 和 HCO₃⁻ 都不够强。',
          full: '酸碱平衡偏向生成较弱的酸。NH₂⁻ 的共轭酸 NH₃ pKa 约 38，高于端炔，因此平衡有利于炔负离子形成。'
        },
        options: [{ id: 'a', label: 'NaNH₂ / NH₃(l)' }, { id: 'b', label: 'NaOH / H₂O' }, { id: 'c', label: 'NaHCO₃ / H₂O' }],
        answer: 'a'
      },
      {
        id: 'd03-alkylation-01', day: 3, type: 'choice', role: 'practice',
        primarySkill: 'alkyne.acetylide_alkylation',
        skillIds: ['alkyne.acetylide_alkylation', 'substitution.sn2', 'synthesis.carbon_count'],
        difficulty: 2,
        prompt: '乙炔钠 HC≡C⁻ Na⁺ 要顺利增添两个碳，优先选择哪种卤代烃？',
        examTags: ['C–C 键形成', '一步取代', '合成'],
        hints: ['炔负离子既是强亲核体也是强碱。', '这种一步接入更喜欢甲基或一级卤代烃，因为进攻碳周围不拥挤。'],
        explanationLayers: {
          short: '选择溴乙烷。',
          why: '一级溴代烃位阻小，炔负离子可背面进攻形成新的 C–C 键。',
          full: 'HC≡C⁻ + CH₃CH₂Br → HC≡CCH₂CH₃。叔丁基溴周围太拥挤，强碱更容易去拿旁边的 H；乙烯基溴的双键碳也不适合这种背面一步接入。Day4–5 会正式命名这些竞争路线。'
        },
        options: [{ id: 'a', label: 'CH₃CH₂Br' }, { id: 'b', label: '(CH₃)₃CBr' }, { id: 'c', label: 'CH₂=CHBr' }],
        answer: 'a'
      },
      {
        id: 'd03-hydration-01', day: 3, type: 'structure-choice', role: 'practice',
        primarySkill: 'alkyne.mercuric_hydration',
        skillIds: ['alkyne.mercuric_hydration', 'alkene.condition_discrimination'],
        difficulty: 2,
        prompt: '1-丁炔在 HgSO₄/H₂SO₄/H₂O 中水合，最终稳定产物是什么？',
        examTags: ['炔烃水合', '互变异构', '单步反应'],
        hints: ['先形成 Markovnikov 烯醇。', '普通烯醇会迅速互变为羰基化合物。'],
        explanationLayers: {
          short: '最终得到 2-丁酮。',
          why: '端炔汞盐催化水合后形成的烯醇互变为甲基酮。',
          full: 'HC≡CCH₂CH₃ 按 Markovnikov 方向加水，烯醇 CH₂=C(OH)CH₂CH₃ 经酸催化互变为 CH₃COCH₂CH₃。'
        },
        options: [
          { id: 'a', label: '2-丁酮', formula: 'CH₃COCH₂CH₃' },
          { id: 'b', label: '丁醛', formula: 'CH₃CH₂CH₂CHO' },
          { id: 'c', label: '1-丁醇', formula: 'CH₃CH₂CH₂CH₂OH' }
        ],
        answer: 'a'
      },
      {
        id: 'd03-lindlar-01', day: 3, type: 'structure-choice', role: 'contrast',
        primarySkill: 'alkyne.partial_reduction_cis',
        skillIds: ['alkyne.partial_reduction_cis', 'stereo.ez'],
        difficulty: 2,
        prompt: '2-丁炔用 H₂/Lindlar 催化剂还原，主要得到哪一个？',
        examTags: ['选择性还原', '立体化学'],
        hints: ['Lindlar 是被钝化的金属催化剂，会停在烯烃。', '两个 H 从同一面加入。'],
        explanationLayers: {
          short: '主要得到顺-2-丁烯（Z-2-丁烯）。',
          why: 'Lindlar 催化炔键同面加氢，并抑制继续还原。',
          full: '底物和氢在催化剂表面同面传递，产生 cis 烯烃；若使用普通过量 H₂/Pd，则通常继续还原成丁烷。'
        },
        options: [
          { id: 'a', label: '顺-2-丁烯', formula: '(Z)-CH₃CH=CHCH₃' },
          { id: 'b', label: '反-2-丁烯', formula: '(E)-CH₃CH=CHCH₃' },
          { id: 'c', label: '丁烷', formula: 'CH₃CH₂CH₂CH₃' }
        ],
        answer: 'a'
      },
      {
        id: 'd03-dissolving-metal-01', day: 3, type: 'choice', role: 'contrast',
        primarySkill: 'alkyne.partial_reduction_trans',
        skillIds: ['alkyne.partial_reduction_trans', 'alkyne.partial_reduction_cis'],
        difficulty: 2,
        prompt: '若希望把 2-戊炔主要还原为反-2-戊烯，应选择哪组条件？',
        examTags: ['选择性还原', '条件对比'],
        hints: ['题目要求反式烯烃。', '溶解金属还原经历逐步电子与质子转移，净结果为反式加成。'],
        explanationLayers: {
          short: '选 Na/NH₃(l)。',
          why: '溶解金属还原炔烃通常给反式烯烃。',
          full: 'Na/NH₃(l) 经自由基阴离子和乙烯基阴离子中间体，整体 anti 加氢；Lindlar 则给 cis，H₂/Pd 通常继续到烷烃。'
        },
        options: [{ id: 'a', label: 'Na / NH₃(l)' }, { id: 'b', label: 'H₂ / Lindlar' }, { id: 'c', label: '过量 H₂ / Pd' }],
        answer: 'a'
      },
      {
        id: 'd03-conjugation-01', day: 3, type: 'choice', role: 'learn',
        primarySkill: 'diene.conjugation',
        skillIds: ['diene.conjugation', 'mechanism.resonance'],
        difficulty: 1,
        prompt: '下列哪一个是共轭二烯？',
        examTags: ['结构识别', '共轭'],
        hints: ['共轭二烯的两个双键之间只隔一根单键。', '找 C=C–C=C 连续片段。'],
        explanationLayers: {
          short: '1,3-丁二烯是共轭二烯。',
          why: '它具有交替的 C=C–C=C 结构，四个 p 轨道可连续重叠。',
          full: '1,4-戊二烯的双键被 sp³ 碳隔开，是孤立二烯；丙二烯 C=C=C 是累积二烯。'
        },
        options: [{ id: 'a', label: 'CH₂=CH–CH=CH₂' }, { id: 'b', label: 'CH₂=CH–CH₂–CH=CH₂' }, { id: 'c', label: 'CH₂=C=CH₂' }],
        answer: 'a'
      },
      {
        id: 'd03-diels-alder-01', day: 3, type: 'choice', role: 'transfer',
        primarySkill: 'diene.diels_alder',
        skillIds: ['diene.diels_alder', 'synthesis.carbon_count'],
        difficulty: 2,
        prompt: '1,3-丁二烯与乙烯发生最基础的 Diels–Alder 反应，产物骨架是什么？',
        examTags: ['环加成', '碳骨架', '考点迁移'],
        hints: ['这是 [4+2] 环加成，总共六个碳进入新环。', '三根 π 键净变为两根新 σ 键和一根新 π 键。'],
        explanationLayers: {
          short: '生成环己烯。',
          why: '四碳二烯和二碳亲双烯体协同形成六元环，并保留一根双键。',
          full: '反应不丢碳：4 + 2 = 6。新的 σ 键连起二烯两端与乙烯两端，二烯中间两碳之间形成新的 C=C。'
        },
        options: [{ id: 'a', label: '环己烯', formula: 'C₆H₁₀' }, { id: 'b', label: '环己烷', formula: 'C₆H₁₂' }, { id: 'c', label: '环丁烯', formula: 'C₄H₆' }],
        answer: 'a'
      },
      {
        id: 'd03-detective-terminal-01', day: 3, type: 'detective', role: 'transfer',
        primarySkill: 'structure.constraint_elimination',
        skillIds: ['structure.constraint_elimination', 'structure.ir', 'alkyne.identification'],
        difficulty: 2,
        prompt: '未知物分子式 C₄H₆；IR 有约 3300 cm⁻¹ 尖峰和约 2100 cm⁻¹ 弱峰，并能与氨性 AgNO₃ 形成沉淀。哪个候选最符合？',
        examTags: ['结构证据', 'IR', '化学检验'],
        hints: ['3300 cm⁻¹ 尖峰可来自 ≡C–H。', '氨性 AgNO₃ 阳性要求端炔氢。'],
        explanationLayers: {
          short: '候选 A：1-丁炔。',
          why: '只有 1-丁炔同时具有端炔 ≡C–H、C≡C 吸收并能形成炔银沉淀。',
          full: 'C₄H₆ 的 DBE 为 2，三者在分子式层面都可能；IR 与化学检验提供硬约束。2-丁炔无端炔氢，1,3-丁二烯也没有 C≡C。'
        },
        case: {
          formula: 'C4H6', dbe: 2,
          evidence: [
            { id: 'ir-terminal', text: 'IR：约 3300 cm⁻¹ 尖峰、约 2100 cm⁻¹ 弱峰' },
            { id: 'silver-test', text: '氨性 AgNO₃：有沉淀' }
          ],
          irPeaks: [{ wavenumber: 3300, label: '≡C–H' }, { wavenumber: 2100, label: 'C≡C' }],
          nmrSignals: [],
          candidates: [
            { id: 'a', formula: 'HC≡CCH₂CH₃', constraints: { 'ir-terminal': 'pass', 'silver-test': 'pass' }, eliminationReason: '' },
            { id: 'b', formula: 'CH₃C≡CCH₃', constraints: { 'ir-terminal': 'fail', 'silver-test': 'fail' }, eliminationReason: '内炔没有端炔氢。' },
            { id: 'c', formula: 'CH₂=CHCH=CH₂', constraints: { 'ir-terminal': 'fail', 'silver-test': 'fail' }, eliminationReason: '共轭二烯不具有端炔特征。' }
          ]
        },
        answer: { candidateId: 'a', dbe: 2 }
      },
      {
        id: 'd03-route-hexyne-01', day: 3, type: 'route', role: 'transfer',
        primarySkill: 'synthesis.disconnection',
        skillIds: ['synthesis.disconnection', 'alkyne.acetylide_alkylation', 'synthesis.carbon_count'],
        difficulty: 3,
        prompt: '从 1-丁炔制备 3-己炔。先找新增的两个碳，再选择正确的两步路线。',
        examTags: ['微型反合成', 'C–C 键形成', '路线'],
        hints: ['1-丁炔末端 H 可先被强碱移走。', '目标比起点多两个碳，应让炔负离子进攻一级二碳卤代物。'],
        explanationLayers: {
          short: '先 NaNH₂，再加入 CH₃CH₂Br。',
          why: '端炔转为炔负离子后，负电碳进攻一级溴乙烷的带 Br 碳，一边成 C–C 键、一边让 Br 带着旧键电子离开，于是新增两个碳。',
          full: 'HC≡CCH₂CH₃ 经 NaNH₂ 生成 ⁻C≡CCH₂CH₃；其与 CH₃CH₂Br 形成 CH₃CH₂C≡CCH₂CH₃。若用叔丁基溴，强碱性炔负离子主要引发 E2，路线卡住。'
        },
        graph: {
          start: 'butyne1', target: 'hexyne3',
          nodes: [
            { id: 'butyne1', label: '1-丁炔', structure: 'HC≡CCH₂CH₃' },
            { id: 'acetylide', label: '1-丁炔负离子', structure: '⁻C≡CCH₂CH₃' },
            { id: 'hexyne3', label: '3-己炔', structure: 'CH₃CH₂C≡CCH₂CH₃' },
            { id: 'elimination', label: '异丁烯支路', structure: '(CH₃)₂C=CH₂' }
          ],
          edges: [
            { id: 'e1', from: 'butyne1', to: 'acetylide', choice: 'NaNH₂/NH₃(l)', reagent: 'NaNH₂', status: 'green', reason: '生成所需炔负离子。' },
            { id: 'e2', from: 'acetylide', to: 'hexyne3', choice: 'CH₃CH₂Br', reagent: 'CH₃CH₂Br', status: 'green', reason: '一级卤代烃的反应中心较不拥挤，炔负离子容易从背后接近并新建 C–C 键，增加两个碳。' },
            { id: 'e3', from: 'acetylide', to: 'elimination', choice: '(CH₃)₃CBr', reagent: '(CH₃)₃CBr', status: 'red', reason: '三级底物位阻大，主要发生 E2，不能得到目标炔。' }
          ],
          referenceRoutes: [['e1', 'e2']]
        },
        answer: { acceptedPaths: [['e1', 'e2']], preferredPath: ['e1', 'e2'] }
      }
    ],
    repairs: {
      'alkyne.terminal_acidity': [
        {
          id: 'd03-repair-acidity-01', day: 3, type: 'choice', role: 'repair',
          primarySkill: 'alkyne.terminal_acidity', skillIds: ['alkyne.terminal_acidity'], difficulty: 1,
          prompt: '1-丙炔与丙烯相比，哪一个 C–H 更容易被强碱移走？', examTags: ['修复', '酸性'],
          hints: ['比较 sp 与 sp² 碳。'],
          explanationLayers: { short: '1-丙炔的端炔氢更酸。', why: '其共轭碱负电荷位于 sp 碳。', full: 'sp 轨道 s 成分为 50%，比 sp² 碳更能稳定负电荷。' },
          options: [{ id: 'a', label: '1-丙炔端氢' }, { id: 'b', label: '丙烯乙烯基氢' }], answer: 'a'
        }
      ],
      'alkyne.acetylide_alkylation': [
        {
          id: 'd03-repair-alkylation-01', day: 3, type: 'choice', role: 'repair',
          primarySkill: 'alkyne.acetylide_alkylation', skillIds: ['alkyne.acetylide_alkylation', 'substitution.sn2'], difficulty: 2,
          prompt: '丙炔负离子要甲基化，最合适的底物是什么？', examTags: ['修复', '增碳'],
          hints: ['甲基卤代物的反应中心最不拥挤，最适合这种一步接入。'],
          explanationLayers: { short: '选择 CH₃I。', why: '炔负离子可快速进攻甲基碘的碳，同时让 I⁻ 离开。', full: 'CH₃C≡C⁻ + CH₃I 形成 2-丁炔；若换成周围非常拥挤的三级卤代物，强碱更容易夺取邻近 H 并形成双键。Day5 再正式学习这条竞争路线。' },
          options: [{ id: 'a', label: 'CH₃I' }, { id: 'b', label: '(CH₃)₃CCl' }], answer: 'a'
        }
      ],
      'alkyne.mercuric_hydration': [
        {
          id: 'd03-repair-hydration-01', day: 3, type: 'choice', role: 'repair',
          primarySkill: 'alkyne.mercuric_hydration', skillIds: ['alkyne.mercuric_hydration'], difficulty: 1,
          prompt: '乙炔经 HgSO₄/H₂SO₄/H₂O 水合，最终得到什么？', examTags: ['修复', '水合'],
          hints: ['先得乙烯醇，再互变。'],
          explanationLayers: { short: '得到乙醛。', why: '乙烯醇互变为乙醛。', full: 'HC≡CH 水合形成 CH₂=CHOH，随后转化为 CH₃CHO。' },
          options: [{ id: 'a', label: 'CH₃CHO' }, { id: 'b', label: 'CH₃CH₂OH' }, { id: 'c', label: 'CH₃COCH₃' }], answer: 'a'
        }
      ],
      'alkyne.partial_reduction_cis': [
        {
          id: 'd03-repair-lindlar-01', day: 3, type: 'choice', role: 'repair',
          primarySkill: 'alkyne.partial_reduction_cis', skillIds: ['alkyne.partial_reduction_cis'], difficulty: 1,
          prompt: '3-己炔使用 Lindlar 催化剂，主要得到顺式还是反式烯烃？', examTags: ['修复', '立体'],
          hints: ['Lindlar 使氢同面加入。'],
          explanationLayers: { short: '主要得到顺-3-己烯。', why: '催化剂表面同面加氢。', full: '钝化催化剂让反应停在 Z-烯烃阶段。' },
          options: [{ id: 'a', label: '顺式' }, { id: 'b', label: '反式' }], answer: 'a'
        }
      ]
    }
  };
})();
