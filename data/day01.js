(function () {
  'use strict';

  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};

  window.Organic637Data.days[1] = {
    day: 1,
    title: '烯烃第一天：先看懂 C=C，再学三种加成',
    subtitle: '今天不是背一串试剂。先把“双键为什么会反应、加成到底加了什么、条件为什么会改变产物”这三件事弄明白。',
    estimatedMinutes: 70,
    objectives: [
      '知道 C=C 由 1 个 σ 键和 1 个 π 键组成，反应通常先动 π 键',
      '会用“断 π、成两个新 σ 键”理解加成',
      '会判断普通 HBr 的 Markovnikov 区域选择',
      '会区分 Br₂/CCl₄ 与 Br₂/H₂O',
      '能把同一条规则迁移到不同烯烃，而不是只记一道题'
    ],
    lessons: [
      {
        id: 'd01-lesson-structure',
        eyebrow: 'Day 1 · 先把结构看懂',
        title: 'C=C 不是“两根完全一样的线”',
        body: '碳碳双键由一根 σ 键和一根 π 键组成。σ 键沿两核连线重叠，比较牢；π 键来自两个 p 轨道侧向重叠，电子云在键轴上下方，暴露得更多，也更容易先参与反应。',
        note: '第一天不用背轨道图。只抓一句：烯烃的多数典型加成，先从 π 键开始。',
        formulas: ['C=C = 1 个 σ 键 + 1 个 π 键', '简单开链单烯烃：CₙH₂ₙ，例如丙烯 C₃H₆']
      },
      {
        id: 'd01-lesson-addition',
        eyebrow: 'Day 1 · 加成到底发生了什么',
        title: '“加成”可以先理解成：断一根 π，长出两根新 σ',
        body: '双键反应时，碳骨架通常不先断开，而是 π 键被消耗，原双键两个碳各接上一个新的原子或基团。先做原子守恒，再谈区域选择，能少很多混乱。',
        note: '看到试剂 A–B 时，先问：A 和 B 最后分别接到双键哪两个碳？',
        formulas: ['R¹R²C=CR³R⁴ + A–B → R¹R²C(A)–C(B)R³R⁴', 'CH₂=CH₂ + HBr → CH₃CH₂Br']
      },
      {
        id: 'd01-lesson-hbr',
        eyebrow: 'Day 1 · 第一条区域规则',
        title: '普通 HBr：先用“更稳定的碳正离子”理解 Markovnikov',
        body: '不对称烯烃和 HBr 反应时，先质子化双键。哪种质子化方式能产生更稳定的碳正离子，通常就更有利。Br⁻ 再去进攻那个碳正离子，所以 Br 常落在较多取代的碳上。',
        note: '口诀可以记，但最好知道来源：三级碳正离子通常比二级稳定，二级比一级稳定。',
        formulas: ['CH₃–CH=CH₂ + HBr → CH₃–CHBr–CH₃', '三级 C⁺ > 二级 C⁺ > 一级 C⁺（基础比较）']
      },
      {
        id: 'd01-lesson-bromine',
        eyebrow: 'Day 1 · 第二种加成',
        title: 'Br₂：两个 Br 都来自试剂本身',
        body: '烯烃使 Br₂ 极化并形成溴鎓离子中间体，随后 Br⁻ 开环。第一天先不要求完整机理，只要能看见：C=C 被消耗，原双键两个碳各得到一个 Br。',
        note: 'Br₂/CCl₄ 这一类条件首先想到“邻二溴化物”，不要和 NBS 的烯丙位溴代混。',
        formulas: ['CH₂=CH₂ + Br₂ → BrCH₂–CH₂Br', 'C=C + Br₂ → –C(Br)–C(Br)–']
      },
      {
        id: 'd01-lesson-halohydrin',
        eyebrow: 'Day 1 · 同样有 Br₂，水一加入就变了',
        title: 'Br₂/H₂O：水不是背景，会真正进入产物',
        body: '先形成溴鎓离子后，水作为亲核体参与开环，因此产物不再是两个 Br，而是一个 Br 和一个 OH。对常见不对称烯烃，OH 更偏向较多取代的碳。',
        note: '以后遇到试剂别只看“Br₂”三个字，要把斜杠后面的溶剂和条件一起读完。',
        formulas: ['CH₃–CH=CH₂ + Br₂/H₂O → CH₃–CH(OH)–CH₂Br（主区域）', 'C=C + Br₂/H₂O → 卤代醇']
      },
      {
        id: 'd01-lesson-summary',
        eyebrow: 'Day 1 · 收成一张小地图',
        title: '今天真正要带走的是“先认反应类型，再判位置”',
        body: '同一根 C=C，读条件后先判断产物类型：HBr 得卤代烷；Br₂/CCl₄ 得邻二溴化物；Br₂/H₂O 得卤代醇。只有确定了“是什么反应”，再继续判断 Br 或 OH 到哪边。',
        note: '后面 Day 2 会故意加入 HBr/ROOR、BH₃、O₃、NBS，把条件分流做得更复杂。',
        formulas: ['C=C + HBr → 溴代烷', 'C=C + Br₂/CCl₄ → 邻二溴化物', 'C=C + Br₂/H₂O → 卤代醇']
      }
    ],
    questions: [
      {
        id: 'pi-center-1', day: 1, type: 'choice', role: 'learn',
        primarySkill: 'alkene.pi_center', skillIds: ['alkene.pi_center'], difficulty: 1,
        prompt: '看 CH₃–CH=CH₂。今天这一组烯烃加成，第一眼最该盯住哪一处？',
        formula: 'CH₃–CH=CH₂', examTags: ['结构识别', '反应中心'],
        hints: ['找最容易参与今天这类加成的电子。', '双键里的 π 电子比普通 σ 键更容易先参与反应。'],
        explanationLayers: {
          short: '先盯住 C=C。',
          why: '双键中的 π 电子云暴露在键轴上下方，是典型亲电加成的入口。',
          full: 'C=C 由 σ+π 组成。多数烯烃加成消耗的是 π 键，而原来的 C–C σ 键保留，所以反应中心首先是双键。'
        },
        options: [{ id: 'a', label: 'C=C' }, { id: 'b', label: '左侧 C–C' }, { id: 'c', label: '任意一根 C–H' }], answer: 'a'
      },
      {
        id: 'd01-pi-bond-01', day: 1, type: 'choice', role: 'practice',
        primarySkill: 'alkene.pi_bond_model', skillIds: ['alkene.pi_bond_model'], difficulty: 1,
        prompt: '关于普通烯烃里的 C=C，哪一句最准确？',
        formula: 'C=C = σ + π', examTags: ['基础概念', '化学键'],
        hints: ['双键不是两根完全相同的键。', '一根来自轴向重叠，一根来自侧向重叠。'],
        explanationLayers: {
          short: 'C=C 由 1 个 σ 键和 1 个 π 键组成。',
          why: 'σ 键沿核间轴重叠，π 键由 p 轨道侧向重叠。',
          full: '加成时常先消耗 π 键并形成新的 σ 键，因此把“双键=σ+π”想清楚，比把 C=C 只当成两条线更有用。'
        },
        options: [{ id: 'a', label: '1 个 σ 键 + 1 个 π 键' }, { id: 'b', label: '2 个完全相同的 σ 键' }, { id: 'c', label: '1 个 π 键，不含 σ 键' }], answer: 'a'
      },
      {
        id: 'd01-formula-01', day: 1, type: 'choice', role: 'practice',
        primarySkill: 'alkene.pi_bond_model', skillIds: ['alkene.pi_bond_model'], difficulty: 1,
        prompt: '一个不成环、只有一个 C=C 的简单烯烃，若有 4 个碳，分子式最可能是哪一个？',
        formula: '简单开链单烯烃：CₙH₂ₙ', examTags: ['分子式', '基础概念'],
        hints: ['把 n=4 代进 CₙH₂ₙ。'],
        explanationLayers: {
          short: 'C₄H₈。',
          why: '简单开链单烯烃通式为 CₙH₂ₙ。',
          full: '与相应烷烃 C₄H₁₀ 相比，一个环或一个双键都会少 2 个 H。这个关系以后会连接到 DBE。'
        },
        options: [{ id: 'a', label: 'C₄H₈' }, { id: 'b', label: 'C₄H₁₀' }, { id: 'c', label: 'C₄H₆' }], answer: 'a'
      },
      {
        id: 'd01-addition-accounting-01', day: 1, type: 'structure-choice', role: 'learn',
        primarySkill: 'alkene.addition_atom_accounting', skillIds: ['alkene.addition_atom_accounting', 'alkene.pi_center'], difficulty: 1,
        prompt: '乙烯与 HBr 做最简单的加成。只按“两个碳各接一个新东西”判断，正确产物是哪一个？',
        formula: 'CH₂=CH₂ + HBr → ?', examTags: ['加成', '原子守恒'],
        hints: ['H 和 Br 都要进入产物。', '双键变单键，两个碳分别得到 H 与 Br。'],
        explanationLayers: {
          short: '得到溴乙烷 CH₃CH₂Br。',
          why: 'H 和 Br 分别加到原双键两个碳上，C=C 变成 C–C。',
          full: 'CH₂=CH₂ + HBr → CH₃CH₂Br。对称烯烃没有区域选择问题，所以先练“加了什么”最清楚。'
        },
        options: [{ id: 'a', label: '溴乙烷', formula: 'CH₃CH₂Br' }, { id: 'b', label: '1,2-二溴乙烷', formula: 'BrCH₂CH₂Br' }, { id: 'c', label: '乙醇', formula: 'CH₃CH₂OH' }], answer: 'a'
      },
      {
        id: 'hbr-1', day: 1, type: 'structure-choice', role: 'learn',
        primarySkill: 'alkene.hx_markovnikov', skillIds: ['alkene.hx_markovnikov', 'ranking.stability'], difficulty: 2,
        prompt: '丙烯与 HBr 反应，且明确没有过氧化物。主产物是哪一个？',
        formula: 'CH₃–CH=CH₂ + HBr → ?', examTags: ['Markovnikov', '单步反应'],
        hints: ['先比较两种质子化方向分别会形成几级碳正离子。', '优先形成二级碳正离子的方向。'],
        explanationLayers: {
          short: '主产物是 2-溴丙烷。',
          why: '有利的质子化方向形成二级碳正离子，随后 Br⁻ 进攻。',
          full: '普通离子型 HBr 加成中，H 加到末端碳，使正电荷落在中间碳，形成更稳定的二级碳正离子；Br⁻ 再进攻中间碳，得到 CH₃CHBrCH₃。'
        },
        options: [{ id: 'a', label: '2-溴丙烷', formula: 'CH₃CHBrCH₃' }, { id: 'b', label: '1-溴丙烷', formula: 'CH₃CH₂CH₂Br' }, { id: 'c', label: '1,2-二溴丙烷', formula: 'CH₃CHBrCH₂Br' }], answer: 'a'
      },
      {
        id: 'd01-carbocation-01', day: 1, type: 'choice', role: 'practice',
        primarySkill: 'alkene.hx_markovnikov', skillIds: ['alkene.hx_markovnikov', 'ranking.stability'], difficulty: 2,
        prompt: '解释上一题方向时，下列哪个中间体更稳定？',
        formula: 'CH₃–C⁺H–CH₃   vs   CH₃–CH₂–CH₂⁺', examTags: ['中间体稳定性', '机理基础'],
        hints: ['数正电碳直接连接了几个碳。', '二级碳正离子通常比一级稳定。'],
        explanationLayers: {
          short: 'CH₃–C⁺H–CH₃ 更稳定。',
          why: '它是二级碳正离子，另一种是一级。',
          full: '在基础模型里，烷基通过超共轭和诱导效应帮助分散正电荷，所以三级 > 二级 > 一级 > 甲基。今天只用它解释普通 HX 的区域选择。'
        },
        options: [{ id: 'a', label: 'CH₃–C⁺H–CH₃（二级）' }, { id: 'b', label: 'CH₃–CH₂–CH₂⁺（一级）' }, { id: 'c', label: '两者完全一样' }], answer: 'a'
      },
      {
        id: 'd01-hbr-butene-01', day: 1, type: 'choice', role: 'transfer',
        primarySkill: 'alkene.hx_markovnikov', skillIds: ['alkene.hx_markovnikov'], difficulty: 2,
        prompt: '把骨架换成 1-丁烯。与 HBr 反应、无 ROOR 时，Br 主要落在哪个碳？',
        formula: 'CH₂=CH–CH₂CH₃ + HBr → CH₃–CH(Br)–CH₂CH₃', examTags: ['迁移', '区域选择'],
        hints: ['不要记上一题的“中间那个碳”，重新找较稳定碳正离子。'],
        explanationLayers: {
          short: 'Br 主要落在原双键的 C2。',
          why: '这样对应二级碳正离子，而不是一级。',
          full: '规则迁移后得到 2-溴丁烷。这里要确认你掌握的是“稳定中间体→区域选择”，不是只记丙烯的结构。'
        },
        options: [{ id: 'a', label: 'C2，得到 2-溴丁烷' }, { id: 'b', label: 'C1，得到 1-溴丁烷' }, { id: 'c', label: '最远端 C4' }], answer: 'a'
      },
      {
        id: 'br2-1', day: 1, type: 'structure-choice', role: 'learn',
        primarySkill: 'alkene.br2_addition', skillIds: ['alkene.br2_addition', 'alkene.addition_atom_accounting'], difficulty: 1,
        prompt: '乙烯与 Br₂/CCl₄ 反应，最直接的产物是哪一个？',
        formula: 'CH₂=CH₂ + Br₂ → ?', examTags: ['Br₂加成', '单步反应'],
        hints: ['两个 Br 都来自同一分子 Br₂。', '原双键两个碳各得到一个 Br。'],
        explanationLayers: {
          short: '得到 1,2-二溴乙烷。',
          why: 'Br₂ 对 C=C 加成，两个 Br 分别进入原双键两端。',
          full: '整体式 CH₂=CH₂ + Br₂ → BrCH₂CH₂Br。后面学机理时会看到溴鎓离子，但第一天先把产物类型认稳。'
        },
        options: [{ id: 'a', label: '1,2-二溴乙烷', formula: 'BrCH₂CH₂Br' }, { id: 'b', label: '溴乙烷', formula: 'CH₃CH₂Br' }, { id: 'c', label: '乙二醇', formula: 'HOCH₂CH₂OH' }], answer: 'a'
      },
      {
        id: 'd01-br2-vs-nbs-01', day: 1, type: 'choice', role: 'contrast',
        primarySkill: 'alkene.condition_discrimination', skillIds: ['alkene.condition_discrimination', 'alkene.br2_addition'], difficulty: 2,
        prompt: '若题目只写“环己烯 + Br₂/CCl₄”，最应该想到哪一种变化？',
        formula: '环己烯 + Br₂/CCl₄ → 邻二溴环己烷', examTags: ['条件辨别', '近邻对比'],
        hints: ['这里没有 NBS，也没有 hν。'],
        explanationLayers: {
          short: '双键加成，原双键两个碳各接 Br。',
          why: 'Br₂/CCl₄ 是典型卤素对烯烃的亲电加成条件。',
          full: 'NBS/hν 才是后续要学的烯丙位自由基溴代；不能因为都出现“Br”就把两类反应混在一起。'
        },
        options: [{ id: 'a', label: 'C=C 被消耗，两个 Br 加到原双键两端' }, { id: 'b', label: '双键保留，只在烯丙位换 Br' }, { id: 'c', label: '只生成醇' }], answer: 'a'
      },
      {
        id: 'halohydrin-1', day: 1, type: 'choice', role: 'learn',
        primarySkill: 'alkene.halohydrin', skillIds: ['alkene.halohydrin', 'alkene.condition_discrimination'], difficulty: 1,
        prompt: '把条件从 Br₂/CCl₄ 换成 Br₂/H₂O，产物类型首先应该怎么变？',
        formula: 'C=C + Br₂/H₂O → –C(OH)–C(Br)–', examTags: ['卤代醇', '条件辨别'],
        hints: ['水会作为亲核体参与。'],
        explanationLayers: {
          short: '变成 Br/OH 的卤代醇。',
          why: '水参与溴鎓离子开环，因此一个位置进入 OH。',
          full: '不要把水当作无关溶剂。Br₂/H₂O 与 Br₂/CCl₄ 的核心区别就在于水能参与后续开环，改变产物组成。'
        },
        options: [{ id: 'a', label: '一个 Br + 一个 OH' }, { id: 'b', label: '两个 Br' }, { id: 'c', label: '两个 OH' }], answer: 'a'
      },
      {
        id: 'd01-halohydrin-regio-01', day: 1, type: 'structure-choice', role: 'practice',
        primarySkill: 'alkene.halohydrin', skillIds: ['alkene.halohydrin'], difficulty: 2,
        prompt: '丙烯与 Br₂/H₂O 反应。下面哪个主区域结构更合理？',
        formula: 'CH₃–CH=CH₂ + Br₂/H₂O → ?', examTags: ['卤代醇', '区域选择'],
        hints: ['典型不对称烯烃里，水更偏向从较多取代碳开环。'],
        explanationLayers: {
          short: '主区域结构为 CH₃CH(OH)CH₂Br。',
          why: 'OH 更偏向较多取代碳，Br 留在另一端。',
          full: '溴鎓离子中的较多取代碳带有更多正电特征，水更倾向攻击该位置；整体得到 CH₃CH(OH)CH₂Br。'
        },
        options: [{ id: 'a', label: 'OH 在中间碳', formula: 'CH₃CH(OH)CH₂Br' }, { id: 'b', label: 'OH 在末端碳', formula: 'CH₃CH(Br)CH₂OH' }, { id: 'c', label: '两个 Br', formula: 'CH₃CHBrCH₂Br' }], answer: 'a'
      },
      {
        id: 'condition-1', day: 1, type: 'choice', role: 'practice',
        primarySkill: 'alkene.condition_discrimination', skillIds: ['alkene.condition_discrimination'], difficulty: 1,
        prompt: '同一个烯烃，哪组条件最直接提示你考虑“卤代醇”而不是“邻二溴化物”？',
        formula: 'C=C + Br₂/H₂O → 卤代醇', examTags: ['条件辨别', '旧进度兼容'],
        hints: ['哪一组条件多了能提供 OH 的水？'],
        explanationLayers: {
          short: 'Br₂/H₂O。',
          why: '水会参与开环并进入产物。',
          full: 'Br₂/CCl₄ 主要给邻二溴化物；Br₂/H₂O 给 Br/OH 的卤代醇。读条件时不能只看到 Br₂。'
        },
        options: [{ id: 'a', label: 'Br₂/H₂O' }, { id: 'b', label: 'Br₂/CCl₄' }, { id: 'c', label: 'H₂/Pd' }], answer: 'a'
      },
      {
        id: 'd01-condition-match-01', day: 1, type: 'multi-choice', role: 'practice',
        primarySkill: 'alkene.condition_discrimination', skillIds: ['alkene.condition_discrimination'], difficulty: 2,
        prompt: '下面哪些“条件 → 产物类型”配对是正确的？选择所有正确项。',
        formula: '先认条件，再认产物类型', examTags: ['条件表', '多选'],
        hints: ['逐项看 HBr、Br₂/CCl₄、Br₂/H₂O。'],
        explanationLayers: {
          short: '三项都正确。',
          why: 'HBr 给卤代烷；Br₂/CCl₄ 给邻二溴化物；Br₂/H₂O 给卤代醇。',
          full: 'Day 1 的核心不是把三个产物混在一起记，而是建立“完整条件→反应类型”的第一张分流图。'
        },
        options: [{ id: 'a', label: 'C=C + HBr → 溴代烷' }, { id: 'b', label: 'C=C + Br₂/CCl₄ → 邻二溴化物' }, { id: 'c', label: 'C=C + Br₂/H₂O → 卤代醇' }], answer: ['a', 'b', 'c']
      },
      {
        id: 'd01-transfer-halohydrin-01', day: 1, type: 'choice', role: 'transfer',
        primarySkill: 'alkene.condition_discrimination', skillIds: ['alkene.condition_discrimination', 'alkene.halohydrin'], difficulty: 2,
        prompt: '换成 1-丁烯。只看条件 Br₂/H₂O，哪一句最应该先成立？',
        formula: 'CH₂=CHCH₂CH₃ + Br₂/H₂O → BrCH₂–CH(OH)–CH₂CH₃（主区域）', examTags: ['迁移', '条件判断'],
        hints: ['先判断产物类型，再判具体位置。'],
        explanationLayers: {
          short: '先确定是卤代醇，再进一步判断 OH 的区域。',
          why: '完整条件 Br₂/H₂O 已经先决定了反应类型。',
          full: '对 1-丁烯，主区域结构可写成 BrCH₂CH(OH)CH₂CH₃。即使骨架换了，读条件→定产物类型→判位置的流程不变。'
        },
        options: [{ id: 'a', label: '先想到 Br/OH 加成，再判断 OH 位置' }, { id: 'b', label: '先想到两个 Br 加成，水可以忽略' }, { id: 'c', label: '先想到 NBS 烯丙位取代' }], answer: 'a'
      },
      {
        id: 'd01-final-switch-01', day: 1, type: 'choice', role: 'transfer',
        primarySkill: 'alkene.condition_discrimination', skillIds: ['alkene.condition_discrimination', 'alkene.hx_markovnikov', 'alkene.br2_addition', 'alkene.halohydrin'], difficulty: 3,
        prompt: '考试里最省力的第一步应该是什么？',
        formula: '底物 C=C + 条件 → 先判反应类型 → 再判区域/立体', examTags: ['方法', '迁移'],
        hints: ['不要一上来就背最终结构。'],
        explanationLayers: {
          short: '先把完整条件读完，判断是哪类反应。',
          why: '反应类型一旦分错，后面的区域选择再熟也会全错。',
          full: '把“识别反应中心→读完整条件→判断产物类型→区域/立体→正向核对原子”固定成流程，是后面20天处理陌生题的底层习惯。'
        },
        options: [{ id: 'a', label: '先读完整条件，确定反应类型' }, { id: 'b', label: '先凭感觉画一个产物，再找试剂解释' }, { id: 'c', label: '只看试剂中第一个化学式' }], answer: 'a'
      }
    ],
    repairs: {
      'alkene.pi_center': [{
        id: 'repair-pi-1', day: 1, type: 'choice', role: 'repair', primarySkill: 'alkene.pi_center', skillIds: ['alkene.pi_center'], difficulty: 1,
        prompt: '换成 CH₂=CH–CH₂CH₃，今天这类加成的第一反应中心仍是哪一处？', formula: 'CH₂=CH–CH₂CH₃', examTags: ['修复'], hints: ['找 π 键。'],
        explanationLayers: { short: '仍然是 C=C。', why: '骨架变长不改变烯烃加成首先从 π 键开始。', full: '今天训练的是可迁移识别，不是记住丙烯。' },
        options: [{ id: 'a', label: 'C=C' }, { id: 'b', label: '末端 CH₃' }], answer: 'a'
      }],
      'alkene.pi_bond_model': [{
        id: 'd01-repair-pibond-01', day: 1, type: 'choice', role: 'repair', primarySkill: 'alkene.pi_bond_model', skillIds: ['alkene.pi_bond_model'], difficulty: 1,
        prompt: '烯烃加成时通常最先消耗的是哪一部分？', formula: 'C=C = σ + π', examTags: ['修复'], hints: ['σ 键保留为 C–C 单键。'],
        explanationLayers: { short: 'π 键。', why: 'π 电子更易参与反应。', full: '加成后原来 C=C 的 σ 骨架仍在，π 键被转化成新的 σ 键。' },
        options: [{ id: 'a', label: 'π 键' }, { id: 'b', label: '原 C–C σ 键' }], answer: 'a'
      }],
      'alkene.addition_atom_accounting': [{
        id: 'd01-repair-account-01', day: 1, type: 'choice', role: 'repair', primarySkill: 'alkene.addition_atom_accounting', skillIds: ['alkene.addition_atom_accounting'], difficulty: 1,
        prompt: 'CH₂=CH₂ + Br₂ 的产物中应新增几个 Br？', formula: 'CH₂=CH₂ + Br₂ → BrCH₂CH₂Br', examTags: ['修复'], hints: ['一分子 Br₂ 有两个 Br。'],
        explanationLayers: { short: '两个。', why: '两个 Br 分别加到原双键两个碳上。', full: '先做原子守恒能快速排掉只加一个 Br 的错误选项。' },
        options: [{ id: 'a', label: '2 个' }, { id: 'b', label: '1 个' }, { id: 'c', label: '0 个' }], answer: 'a'
      }],
      'alkene.hx_markovnikov': [{
        id: 'repair-hbr-1', day: 1, type: 'choice', role: 'repair', primarySkill: 'alkene.hx_markovnikov', skillIds: ['alkene.hx_markovnikov'], difficulty: 1,
        prompt: '1-丁烯 + HBr（无 ROOR）时，Br 主要落在哪里？', formula: 'CH₂=CHCH₂CH₃ + HBr → CH₃CHBrCH₂CH₃', examTags: ['修复'], hints: ['优先形成二级碳正离子。'],
        explanationLayers: { short: 'C2。', why: '普通 HBr 的主方向对应更稳定的二级碳正离子。', full: '得到 2-溴丁烷。' },
        options: [{ id: 'a', label: 'C2' }, { id: 'b', label: 'C1' }], answer: 'a'
      }, {
        id: 'repair-hbr-2', day: 1, type: 'choice', role: 'repair', primarySkill: 'alkene.hx_markovnikov', skillIds: ['alkene.hx_markovnikov'], difficulty: 1,
        prompt: '2-甲基丙烯 + HBr（无 ROOR）时，Br 主要落在哪个位置？', formula: '(CH₃)₂C=CH₂ + HBr → (CH₃)₃CBr', examTags: ['修复'], hints: ['优先形成三级碳正离子。'],
        explanationLayers: { short: 'Br 落在较多取代的中心碳。', why: '这样对应三级碳正离子。', full: '普通 HBr 仍遵循由更稳定碳正离子控制的主区域方向。' },
        options: [{ id: 'a', label: '较多取代的中心碳' }, { id: 'b', label: '末端 CH₂' }], answer: 'a'
      }],
      'alkene.br2_addition': [{
        id: 'repair-br2-1', day: 1, type: 'choice', role: 'repair', primarySkill: 'alkene.br2_addition', skillIds: ['alkene.br2_addition'], difficulty: 1,
        prompt: '丙烯 + Br₂/CCl₄ 的主变化是什么？', formula: 'CH₃CH=CH₂ + Br₂ → CH₃CHBrCH₂Br', examTags: ['修复'], hints: ['两个 Br 加到双键两端。'],
        explanationLayers: { short: '得到邻二溴化物。', why: 'Br₂ 直接加成 C=C。', full: '双键消失，两个 Br 各占一个原双键碳。' },
        options: [{ id: 'a', label: '原双键两端各接 Br' }, { id: 'b', label: '只在烯丙位接一个 Br' }], answer: 'a'
      }],
      'alkene.halohydrin': [{
        id: 'repair-halohydrin-1', day: 1, type: 'choice', role: 'repair', primarySkill: 'alkene.halohydrin', skillIds: ['alkene.halohydrin'], difficulty: 1,
        prompt: '2-甲基丙烯 + Br₂/H₂O 时，OH 更偏向哪一端？', formula: '(CH₃)₂C=CH₂ + Br₂/H₂O → (CH₃)₂C(OH)CH₂Br', examTags: ['修复'], hints: ['OH 更偏向较多取代碳。'],
        explanationLayers: { short: '较多取代碳。', why: '水更倾向攻击溴鎓离子中正电特征更强的位置。', full: '主区域结构为 (CH₃)₂C(OH)CH₂Br。' },
        options: [{ id: 'a', label: '较多取代碳' }, { id: 'b', label: '末端 CH₂' }], answer: 'a'
      }],
      'alkene.condition_discrimination': [{
        id: 'repair-condition-1', day: 1, type: 'choice', role: 'repair', primarySkill: 'alkene.condition_discrimination', skillIds: ['alkene.condition_discrimination'], difficulty: 1,
        prompt: '哪组条件一看到就先想到“卤代醇”？', formula: 'C=C + Br₂/H₂O → Br/OH 加成', examTags: ['修复'], hints: ['OH 的来源是水。'],
        explanationLayers: { short: 'Br₂/H₂O。', why: '水参与开环并进入产物。', full: 'Br₂/CCl₄ 则是邻二溴化物。' },
        options: [{ id: 'a', label: 'Br₂/H₂O' }, { id: 'b', label: 'Br₂/CCl₄' }, { id: 'c', label: 'H₂/Pd' }], answer: 'a'
      }]
    }
  };
})();
