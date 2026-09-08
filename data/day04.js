(function () {
  'use strict';

  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};

  window.Organic637Data.days[4] = {
    day: 4,
    title: '卤代烃：先看底物，再决定 SN2 还是 SN1',
    subtitle: '把底物级数、亲核试剂、溶剂和离去基放进同一张判断表，再用电子箭头解释结果。',
    estimatedMinutes: 90,
    objectives: [
      '识别甲基、一级、二级、三级及烯丙基/苄基卤代物',
      '根据位阻、亲核性、溶剂和离去基判断 SN2 或 SN1',
      '画出 SN2 的亲核进攻与离去两根电子箭头',
      '理解 SN2 的空间反转而不机械套用 R/S 标签翻转',
      '识别 SN1 碳正离子重排风险'
    ],
    lessons: [
      {
        id: 'd04-lesson-substrate',
        eyebrow: 'Day 4 · 第一眼检查',
        title: '级数看的是连着离去基的那个碳',
        body: '先找到 C–X，再数这个碳直接连接了几个碳。甲基和一级底物位阻小，利于 SN2；三级底物能形成较稳定碳正离子，常更利于 SN1。苄基和烯丙基底物还会受到共振稳定作用。',
        note: '不要数整分子一共有多少个碳。'
      },
      {
        id: 'd04-lesson-mechanism',
        eyebrow: '两种取代 · 两种节奏',
        title: 'SN2 一步完成，SN1 先离去再进攻',
        body: 'SN2 中亲核体从离去基背面进攻，成键和断键协同发生，速率同时依赖底物和亲核体。SN1 先慢速电离形成平面碳正离子，速率主要依赖底物浓度。',
        note: '机理不是背字母：它会决定速率、重排和立体结果。'
      },
      {
        id: 'd04-lesson-arrows',
        eyebrow: '电子箭头第一课',
        title: '箭尾必须从电子出发',
        body: '亲核体的孤对电子指向亲电碳；同时 C–X 键电子移向离去基 X。曲箭描述电子移动，不是原子移动方向。',
        note: '本版只点预定义热点，判定电子源、电子目的地和箭头类型。'
      }
    ],
    questions: [
      {
        id: 'd04-substrate-01', day: 4, type: 'choice', role: 'learn',
        primarySkill: 'substitution.identify_substrate',
        skillIds: ['substitution.identify_substrate'],
        difficulty: 1,
        prompt: 'CH₃CH₂CH₂Br 属于哪类卤代烃底物？',
        examTags: ['底物识别', 'SN1/SN2'],
        hints: ['找到直接连 Br 的碳。', '这个碳只直接连接一个其他碳。'],
        explanationLayers: {
          short: '它是一级卤代烃。',
          why: '连 Br 的 CH₂ 只与一个碳相连。',
          full: '底物级数由带离去基碳的取代度决定。1-溴丙烷的反应中心是末端 CH₂Br，因此属于一级底物，位阻较小。'
        },
        options: [{ id: 'a', label: '一级' }, { id: 'b', label: '二级' }, { id: 'c', label: '三级' }],
        answer: 'a'
      },
      {
        id: 'd04-leaving-rank-01', day: 4, type: 'ranking', role: 'practice',
        primarySkill: 'substitution.leaving_group',
        skillIds: ['substitution.leaving_group', 'ranking.reactivity'],
        difficulty: 2,
        prompt: '在其他条件相同的简单卤代烃中，按离去基能力由强到弱排序。',
        examTags: ['离去能力', '排序', '真题同型训练'],
        hints: ['好的离去基离去后应是较稳定的阴离子。', '卤离子碱性通常越弱，离去能力越好。'],
        explanationLayers: {
          short: 'I⁻ > Br⁻ > Cl⁻ >> F⁻。',
          why: '向下卤离子更大、负电荷更易分散，碱性更弱。',
          full: '在常见质子或极性介质的基础比较中，C–I 键也较弱，因此 RI 通常最易取代；F⁻ 是强碱且 C–F 键强，是很差的离去基。'
        },
        items: [{ id: 'i', label: 'I⁻' }, { id: 'br', label: 'Br⁻' }, { id: 'cl', label: 'Cl⁻' }, { id: 'f', label: 'F⁻' }],
        correctOrder: ['i', 'br', 'cl', 'f'],
        factorTags: ['leaving_group'],
        answer: ['i', 'br', 'cl', 'f']
      },
      {
        id: 'd04-sn2-rank-01', day: 4, type: 'ranking', role: 'practice',
        primarySkill: 'substitution.sn2',
        skillIds: ['substitution.sn2', 'ranking.reactivity'],
        difficulty: 2,
        prompt: '与同一亲核体进行 SN2 时，按反应速率由快到慢排列。',
        examTags: ['SN2', '位阻', '排序'],
        hints: ['所有底物离去基相同，关键看亲电碳附近位阻。', '甲基最快，三级底物几乎不走普通 SN2。'],
        explanationLayers: {
          short: 'CH₃Br > CH₃CH₂Br > (CH₃)₂CHBr > (CH₃)₃CBr。',
          why: 'SN2 需要背面接近，亲电碳周围越拥挤越慢。',
          full: '甲基无烷基遮挡，一级只有一个烷基，二级更拥挤；三级碳背面被三个烷基阻挡，通常转而消除或在合适条件下走 SN1。'
        },
        items: [
          { id: 'methyl', label: 'CH₃Br' },
          { id: 'primary', label: 'CH₃CH₂Br' },
          { id: 'secondary', label: '(CH₃)₂CHBr' },
          { id: 'tertiary', label: '(CH₃)₃CBr' }
        ],
        correctOrder: ['methyl', 'primary', 'secondary', 'tertiary'],
        factorTags: ['steric'],
        answer: ['methyl', 'primary', 'secondary', 'tertiary']
      },
      {
        id: 'd04-sn2-condition-01', day: 4, type: 'choice', role: 'practice',
        primarySkill: 'substitution.sn2',
        skillIds: ['substitution.sn2', 'substitution.nucleophile_strength'],
        difficulty: 2,
        prompt: '希望 1-溴丁烷主要发生 SN2 生成戊腈，哪组条件最合适？',
        examTags: ['条件选择', 'SN2', '腈增碳'],
        hints: ['CN⁻ 是良好亲核体，并会把碳链增加一个碳。', '极性非质子溶剂有利于阴离子亲核体保持活性。'],
        explanationLayers: {
          short: '选择 NaCN/DMSO。',
          why: '一级底物、强亲核体和极性非质子溶剂共同支持 SN2。',
          full: 'CN⁻ 从背面进攻末端碳并置换 Br⁻，产物为 CH₃CH₂CH₂CH₂CN（戊腈）。AgNO₃/乙醇偏向促进电离，但一级碳正离子不稳定；叔丁醇钾体积大，易促消除。'
        },
        options: [{ id: 'a', label: 'NaCN / DMSO' }, { id: 'b', label: 'AgNO₃ / 乙醇' }, { id: 'c', label: 't-BuOK / t-BuOH，加热' }],
        answer: 'a'
      },
      {
        id: 'd04-arrow-sn2-01', day: 4, type: 'electron-arrow', role: 'learn',
        primarySkill: 'mechanism.electron_source',
        skillIds: ['mechanism.electron_source', 'mechanism.electron_target', 'mechanism.nucleophilic_attack', 'mechanism.leaving', 'substitution.sn2'],
        difficulty: 2,
        prompt: '为 CN⁻ 进攻溴乙烷的 SN2 步骤选择两根双电子曲箭：先点电子源，再点目的地。',
        examTags: ['电子箭头', 'SN2', '机理'],
        hints: ['第一根箭从 CN⁻ 的孤对电子出发，指向连 Br 的碳。', '第二根箭从 C–Br 键出发，指向 Br。'],
        explanationLayers: {
          short: '孤对电子 → 亲电碳；C–Br 键电子 → Br。',
          why: '形成 C–C 键的同时，Br 带走原 C–Br 键电子。',
          full: 'SN2 是协同一步，两根箭属于同一序列步骤。箭尾不能从正电或空白处开始；曲箭表示电子对移动，因此 arrowType 为 pair。'
        },
        baseSvg: '<svg viewBox="0 0 520 180" role="img" aria-label="氰离子与溴乙烷"><text x="45" y="98" font-size="30">⁻:C≡N</text><text x="265" y="98" font-size="30">CH₃–CH₂–Br</text><circle cx="78" cy="77" r="8" fill="#76b7a7"/><circle cx="352" cy="88" r="8" fill="#f3a6a6"/><circle cx="399" cy="88" r="8" fill="#8fb8df"/><circle cx="447" cy="88" r="8" fill="#c8a6df"/></svg>',
        hotspots: [
          { id: 'cn-pair', x: 78, y: 77, role: 'source', label: 'CN⁻ 的孤对电子' },
          { id: 'electrophilic-carbon', x: 352, y: 88, role: 'target', label: '连 Br 的碳' },
          { id: 'c-br-bond', x: 399, y: 88, role: 'source', label: 'C–Br 键电子' },
          { id: 'bromine', x: 447, y: 88, role: 'target', label: 'Br 原子' }
        ],
        expectedArrows: [
          { source: 'cn-pair', target: 'electrophilic-carbon', arrowType: 'pair', sequence: 1 },
          { source: 'c-br-bond', target: 'bromine', arrowType: 'pair', sequence: 1 }
        ],
        answer: [
          { source: 'cn-pair', target: 'electrophilic-carbon', arrowType: 'pair', sequence: 1 },
          { source: 'c-br-bond', target: 'bromine', arrowType: 'pair', sequence: 1 }
        ]
      },
      {
        id: 'd04-stereo-sn2-01', day: 4, type: 'structure-choice', role: 'contrast',
        primarySkill: 'substitution.stereochemistry',
        skillIds: ['substitution.stereochemistry', 'substitution.sn2'],
        difficulty: 2,
        prompt: '在图示固定观察方向中，手性 2-溴丁烷以实楔 Br 朝向观察者；OH⁻ 发生纯 SN2 后，哪张产物图体现反转？',
        examTags: ['SN2', '楔线虚线', '立体后果'],
        hints: ['SN2 从离去基背面进攻。', '保持图中 CH₃、CH₂CH₃ 和 H 的参考摆放时，新 OH 应出现在原 Br 的相反空间方向。'],
        explanationLayers: {
          short: '选择 OH 画成虚线楔、背向观察者的结构。',
          why: 'SN2 在反应中心发生几何反转。',
          full: '这里判断的是空间反转，不是机械写“R 一定变 S”。若取代前后 CIP 优先级顺序发生不同变化，R/S 字母标签未必只靠反转规则直接替换，必须重新排序。'
        },
        stemStructure: {
          label: '起始构型',
          svg: '<svg viewBox="0 0 260 150" role="img" aria-label="实楔溴朝前的2-溴丁烷"><line x1="130" y1="75" x2="45" y2="35" stroke="#333" stroke-width="3"/><line x1="130" y1="75" x2="215" y2="35" stroke="#333" stroke-width="3"/><line x1="130" y1="75" x2="130" y2="135" stroke="#777" stroke-width="2" stroke-dasharray="5 5"/><polygon points="126,72 134,78 172,120" fill="#df7f72"/><text x="10" y="35" font-size="20">CH₃</text><text x="205" y="35" font-size="18">CH₂CH₃</text><text x="119" y="149" font-size="18">H</text><text x="176" y="130" font-size="20">Br</text></svg>'
        },
        options: [
          { id: 'a', label: 'OH 在虚线楔方向（背向）', svg: '<svg viewBox="0 0 240 130" role="img" aria-label="羟基背向"><line x1="120" y1="62" x2="40" y2="28" stroke="#333" stroke-width="3"/><line x1="120" y1="62" x2="200" y2="28" stroke="#333" stroke-width="3"/><line x1="120" y1="62" x2="165" y2="108" stroke="#5f88aa" stroke-width="4" stroke-dasharray="3 6"/><text x="5" y="28" font-size="18">CH₃</text><text x="190" y="28" font-size="16">CH₂CH₃</text><text x="169" y="118" font-size="18">OH</text></svg>' },
          { id: 'b', label: 'OH 仍在实楔方向（朝向）', svg: '<svg viewBox="0 0 240 130" role="img" aria-label="羟基朝向"><line x1="120" y1="62" x2="40" y2="28" stroke="#333" stroke-width="3"/><line x1="120" y1="62" x2="200" y2="28" stroke="#333" stroke-width="3"/><polygon points="116,59 124,65 169,112" fill="#df7f72"/><text x="5" y="28" font-size="18">CH₃</text><text x="190" y="28" font-size="16">CH₂CH₃</text><text x="171" y="120" font-size="18">OH</text></svg>' }
        ],
        answer: 'a'
      },
      {
        id: 'd04-sn1-condition-01', day: 4, type: 'choice', role: 'learn',
        primarySkill: 'substitution.sn1',
        skillIds: ['substitution.sn1', 'substitution.competition'],
        difficulty: 2,
        prompt: '下列哪组最有利于观察叔丁基氯的 SN1 溶剂解？',
        examTags: ['SN1', '溶剂', '底物'],
        hints: ['三级碳正离子相对稳定。', '极性质子溶剂可以稳定离子，并能作为弱亲核体。'],
        explanationLayers: {
          short: '叔丁基氯在水/乙醇等极性质子介质中容易 SN1。',
          why: '三级底物易电离，极性质子溶剂稳定碳正离子和 Cl⁻。',
          full: '慢步骤是 C–Cl 异裂形成叔丁基碳正离子；溶剂随后进攻并去质子化。若使用强碱并加热，E2 会显著竞争。'
        },
        options: [{ id: 'a', label: '水/乙醇，室温' }, { id: 'b', label: 'NaCN/DMSO' }, { id: 'c', label: 't-BuOK/t-BuOH，加热' }],
        answer: 'a'
      },
      {
        id: 'd04-rearrangement-01', day: 4, type: 'route', role: 'transfer',
        primarySkill: 'substitution.carbocation_rearrangement',
        skillIds: ['substitution.carbocation_rearrangement', 'substitution.sn1', 'synthesis.route_evaluation'],
        difficulty: 3,
        prompt: '3-溴-2-甲基丁烷在促进电离的含水介质中反应。沿 SN1 路线观察为什么重排产物可能出现。',
        examTags: ['SN1', '碳正离子重排', '路线'],
        hints: ['Br 离去先在原位形成二级碳正离子。', '相邻 C2 上的氢迁移后，可把正电荷转移到更稳定的三级碳。'],
        explanationLayers: {
          short: '二级碳正离子可经 1,2-氢迁移变成三级碳正离子，再被水捕获。',
          why: '重排的驱动力是形成更稳定的碳正离子。',
          full: 'SN1 的离散中间体给了骨架重排时间。直接捕获原二级正离子化学上可行，是黄色支路；先由 C2 向 C3 发生氢迁移，正电荷落在三级 C2，再进攻则常给重排醇。SN2 协同机理没有自由碳正离子，通常不重排。'
        },
        graph: {
          start: 'halide', target: 'rearranged-alcohol',
          nodes: [
            { id: 'halide', label: '3-溴-2-甲基丁烷', structure: 'CH₃CH(CH₃)CH(Br)CH₃' },
            { id: 'secondary-cation', label: '二级碳正离子', structure: 'CH₃CH(CH₃)C⁺HCH₃' },
            { id: 'tertiary-cation', label: '重排后的三级碳正离子', structure: 'CH₃C⁺(CH₃)CH₂CH₃' },
            { id: 'rearranged-alcohol', label: '2-甲基-2-丁醇', structure: 'CH₃C(OH)(CH₃)CH₂CH₃' },
            { id: 'direct-alcohol', label: '3-甲基-2-丁醇（直接捕获支路）', structure: 'CH₃CH(OH)CH(CH₃)CH₃' }
          ],
          edges: [
            { id: 'e1', from: 'halide', to: 'secondary-cation', choice: 'C–Br 异裂', reagent: '极性质子介质', status: 'green', reason: 'SN1 慢步骤形成二级碳正离子。' },
            { id: 'e2', from: 'secondary-cation', to: 'tertiary-cation', choice: '1,2-氢迁移', reagent: 'rearrangement', status: 'green', reason: '形成更稳定的三级碳正离子。' },
            { id: 'e3', from: 'tertiary-cation', to: 'rearranged-alcohol', choice: 'H₂O 进攻，去质子化', reagent: 'H₂O', status: 'green', reason: '得到重排醇。' },
            { id: 'e4', from: 'secondary-cation', to: 'direct-alcohol', choice: 'H₂O 立即捕获', reagent: 'H₂O', status: 'yellow', reason: '化学上可行，会给未重排的竞争产物。' }
          ],
          referenceRoutes: [['e1', 'e2', 'e3'], ['e1', 'e4']]
        },
        answer: { acceptedPaths: [['e1', 'e2', 'e3'], ['e1', 'e4']], preferredPath: ['e1', 'e2', 'e3'] }
      },
      {
        id: 'd04-competition-01', day: 4, type: 'multi-choice', role: 'transfer',
        primarySkill: 'substitution.competition',
        skillIds: ['substitution.competition', 'substitution.sn1', 'substitution.sn2'],
        difficulty: 2,
        prompt: '关于 SN1 与 SN2，选择所有正确陈述。',
        examTags: ['机理对比', '多选'],
        hints: ['分别检查速率式、中间体和立体过程。', 'SN1 有碳正离子；SN2 是协同背面进攻。'],
        explanationLayers: {
          short: '正确的是：SN1 可重排；SN2 速率依赖底物和亲核体。',
          why: 'SN1 有碳正离子中间体，SN2 的决速过渡态同时包含两种反应物。',
          full: '“三级底物最快走 SN2”错误，因为位阻阻止背面进攻。SN1 常出现消旋倾向但可能受离子对影响，并非任何情形都严格 50:50。'
        },
        options: [
          { id: 'a', label: 'SN1 可能发生碳正离子重排' },
          { id: 'b', label: 'SN2 速率同时依赖底物与亲核体浓度' },
          { id: 'c', label: '三级卤代烃通常是最快的 SN2 底物' }
        ],
        answer: ['a', 'b']
      }
    ],
    repairs: {
      'substitution.identify_substrate': [
        {
          id: 'd04-repair-substrate-01', day: 4, type: 'choice', role: 'repair',
          primarySkill: 'substitution.identify_substrate', skillIds: ['substitution.identify_substrate'], difficulty: 1,
          prompt: '(CH₃)₂CHCl 是哪一级卤代烃？', examTags: ['修复', '底物'], hints: ['连 Cl 的碳连接两个碳。'],
          explanationLayers: { short: '二级卤代烃。', why: '反应中心碳直接连接两个甲基。', full: '判断级数只看 C–Cl 所在碳的碳取代数。' },
          options: [{ id: 'a', label: '一级' }, { id: 'b', label: '二级' }, { id: 'c', label: '三级' }], answer: 'b'
        }
      ],
      'substitution.sn2': [
        {
          id: 'd04-repair-sn2-01', day: 4, type: 'choice', role: 'repair',
          primarySkill: 'substitution.sn2', skillIds: ['substitution.sn2'], difficulty: 1,
          prompt: 'CH₃I 与 HO⁻ 反应时，最符合的主机理是什么？', examTags: ['修复', 'SN2'], hints: ['甲基底物不能形成稳定碳正离子，且位阻最小。'],
          explanationLayers: { short: 'SN2。', why: '甲基碘适合背面进攻。', full: 'HO⁻ 进攻与 I⁻ 离去协同发生。' },
          options: [{ id: 'a', label: 'SN2' }, { id: 'b', label: 'SN1' }], answer: 'a'
        }
      ],
      'substitution.sn1': [
        {
          id: 'd04-repair-sn1-01', day: 4, type: 'choice', role: 'repair',
          primarySkill: 'substitution.sn1', skillIds: ['substitution.sn1'], difficulty: 1,
          prompt: '叔丁基溴在水中溶剂解，决速步骤是什么？', examTags: ['修复', 'SN1'], hints: ['先形成碳正离子。'],
          explanationLayers: { short: 'C–Br 异裂形成碳正离子。', why: 'SN1 的慢步骤是底物单分子电离。', full: '后续水进攻和去质子化通常较快。' },
          options: [{ id: 'a', label: 'C–Br 异裂' }, { id: 'b', label: '水先背面进攻' }], answer: 'a'
        }
      ],
      'substitution.carbocation_rearrangement': [
        {
          id: 'd04-repair-rearrangement-01', day: 4, type: 'choice', role: 'repair',
          primarySkill: 'substitution.carbocation_rearrangement', skillIds: ['substitution.carbocation_rearrangement'], difficulty: 2,
          prompt: '哪种机理更需要主动检查 1,2-氢迁移或烷基迁移？', examTags: ['修复', '重排'], hints: ['寻找自由碳正离子中间体。'],
          explanationLayers: { short: 'SN1。', why: 'SN1 经过碳正离子，可能重排。', full: 'SN2 是协同过程，没有寿命足够长的自由碳正离子。' },
          options: [{ id: 'a', label: 'SN1' }, { id: 'b', label: 'SN2' }], answer: 'a'
        }
      ]
    }
  };
})();
