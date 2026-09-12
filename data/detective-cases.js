(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};

  window.Organic637Data.DETECTIVE_CASES = [
    {
      id: 'det-terminal-alkyne',
      stage: 'Day 14 · 完整证据链复练',
      title: '谁是真正的端炔？',
      subtitle: '先用 DBE、IR 和化学检验把明显不合格的候选淘汰掉。',
      formula: 'C4H6',
      dbe: 2,
      hints: {
        dbe: 'DBE = (2C + 2 − H) / 2；本题没有 N、X。',
        ir: '3300 cm⁻¹ 的尖峰如果和 2100 cm⁻¹ 弱峰同时出现，要优先想到端炔。',
        nmr: '端炔 H 常在约 2–3 ppm 左右出现；这里更关键的是是否存在一个 1H 的炔氢信号。',
        candidates: '氨性 AgNO3 阳性是非常硬的证据：必须有端炔氢。'
      },
      hardEvidence: [
        { id: 'formula', label: '分子式', text: 'C4H6' },
        { id: 'silver', label: '化学检验', text: '氨性 AgNO3：出现沉淀' }
      ],
      ir: {
        peaks: [
          { wavenumber: 3300, intensity: 0.82, label: '尖峰' },
          { wavenumber: 2100, intensity: 0.34, label: '弱峰' }
        ],
        prompt: '这组 IR 最值得优先锁定哪类结构？',
        options: [
          { id: 'a', label: '端炔：≡C–H 与 C≡C' },
          { id: 'b', label: '饱和醇：O–H' },
          { id: 'c', label: '醛：C=O 与醛基 C–H' }
        ],
        answer: 'a',
        skill: 'structure.ir'
      },
      nmr: {
        signals: [
          { ppm: 2.25, integral: 2, multiplicity: 'm', label: 'CH2–C≡' },
          { ppm: 1.95, integral: 1, multiplicity: 't', label: '≡C–H' },
          { ppm: 1.05, integral: 3, multiplicity: 't', label: 'CH3' }
        ],
        prompt: '这组 1H NMR 最支持哪条判断？',
        options: [
          { id: 'a', label: '存在一个端炔氢，并有乙基片段' },
          { id: 'b', label: '只有两个等价甲基，没有端炔氢' },
          { id: 'c', label: '存在醛氢' }
        ],
        answer: 'a',
        skill: 'structure.nmr_shift'
      },
      candidates: [
        {
          id: 'a', label: '1-丁炔', structure: 'HC≡C–CH2–CH3',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'pass', nmr: 'pass', silver: 'pass' },
          eliminationReason: '全部硬证据都能同时满足。'
        },
        {
          id: 'b', label: '2-丁炔', structure: 'CH3–C≡C–CH3',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'fail', nmr: 'fail', silver: 'fail' },
          eliminationReason: '内炔没有 ≡C–H，也不会形成端炔银盐沉淀。'
        },
        {
          id: 'c', label: '1,3-丁二烯', structure: 'CH2=CH–CH=CH2',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'fail', nmr: 'fail', silver: 'fail' },
          eliminationReason: '没有 C≡C，也没有端炔氢。'
        }
      ],
      correctCandidate: 'a',
      explanation: 'DBE=2 只告诉你“总共有两个环/π键单位”，并不能单独区分炔烃和二烯。真正把候选压到 1-丁炔的是 3300 cm⁻¹ 尖峰、2100 cm⁻¹ 弱峰以及端炔银盐检验。'
    },
    {
      id: 'det-acetone-symmetry',
      stage: 'Day 14 · IR + NMR 对称性',
      title: '一个 6H 单峰为什么这么有力？',
      subtitle: '这次不是“看见羰基就结束”，而是用对称性继续淘汰。',
      formula: 'C3H6O',
      dbe: 1,
      hints: {
        dbe: '一个羰基本身就贡献 1 个 DBE。',
        ir: '1715 cm⁻¹ 强峰首先考虑普通饱和羰基；题目没有宽 O–H。',
        nmr: '只有一组 1H NMR 信号，而且积分是 6H，意味着六个氢完全等价。',
        candidates: '问哪个候选能让两个甲基完全等价，并且没有额外醛氢或 OH。'
      },
      hardEvidence: [
        { id: 'formula', label: '分子式', text: 'C3H6O' },
        { id: 'symmetry', label: '信号数', text: '1H NMR 只有 1 组信号' }
      ],
      ir: {
        peaks: [
          { wavenumber: 1715, intensity: 0.92, label: '强峰' }
        ],
        prompt: '1715 cm⁻¹ 强吸收、且没有宽 O–H，最合理的第一判断是什么？',
        options: [
          { id: 'a', label: '存在普通羰基 C=O' },
          { id: 'b', label: '一定是醇' },
          { id: 'c', label: '一定是炔烃' }
        ],
        answer: 'a',
        skill: 'structure.ir'
      },
      nmr: {
        signals: [
          { ppm: 2.12, integral: 6, multiplicity: 's', label: '6H singlet' }
        ],
        prompt: '2.12 ppm 只有一个 6H 单峰，最值得抓住的结构信息是什么？',
        options: [
          { id: 'a', label: '两个甲基彼此等价，并且旁边没有可裂分的邻氢' },
          { id: 'b', label: '一定有一个 CH2 和一个 CH3' },
          { id: 'c', label: '一定存在醛氢' }
        ],
        answer: 'a',
        skill: 'structure.symmetry'
      },
      candidates: [
        {
          id: 'a', label: '丙酮', structure: 'CH3–CO–CH3',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'pass', nmr: 'pass', symmetry: 'pass' },
          eliminationReason: '两个甲基由对称性等价，正好只给一个 6H 单峰。'
        },
        {
          id: 'b', label: '丙醛', structure: 'CH3–CH2–CHO',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'partial', nmr: 'fail', symmetry: 'fail' },
          eliminationReason: '应出现醛氢以及 CH2、CH3 等多组信号，不会只有一个 6H 单峰。'
        },
        {
          id: 'c', label: '烯丙醇', structure: 'CH2=CH–CH2OH',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'fail', nmr: 'fail', symmetry: 'fail' },
          eliminationReason: '应有 O–H/烯烃特征，且氢环境远不止一组。'
        }
      ],
      correctCandidate: 'a',
      explanation: 'IR 先锁定羰基，NMR 的“只有一个 6H 单峰”再利用对称性把丙醛和烯丙醇淘汰。结构推断不是一条证据单打独斗，而是证据联立。'
    },
    {
      id: 'det-ethyl-acetate',
      stage: 'Day 14 · 多证据联立',
      title: '三组峰拼出乙酸乙酯',
      subtitle: '把积分、裂分和化学位移一起读，不再只凭一个峰猜官能团。',
      formula: 'C4H8O2',
      dbe: 1,
      hints: {
        dbe: '两个氧不参与 DBE 公式。',
        ir: '1740 cm⁻¹ 强峰很像饱和酯羰基；没有很宽的羧酸 O–H。',
        nmr: '4.1 ppm quartet + 1.3 ppm triplet 是典型 –OCH2CH3；另一个 3H singlet 在 2.0 ppm 左右。',
        candidates: '先找“乙氧基”，再看剩余的 3H 单峰应放在哪里。'
      },
      hardEvidence: [
        { id: 'formula', label: '分子式', text: 'C4H8O2' },
        { id: 'acid-oh', label: 'IR 额外观察', text: '没有 2500–3300 cm⁻¹ 极宽羧酸 O–H' }
      ],
      ir: {
        peaks: [
          { wavenumber: 1740, intensity: 0.94, label: '强峰' },
          { wavenumber: 1240, intensity: 0.62, label: 'C–O 区' }
        ],
        prompt: '1740 cm⁻¹ 强峰并伴随 C–O 区吸收，且没有羧酸宽 O–H，最符合哪类官能团？',
        options: [
          { id: 'a', label: '酯' },
          { id: 'b', label: '羧酸' },
          { id: 'c', label: '醚且完全没有羰基' }
        ],
        answer: 'a',
        skill: 'structure.ir'
      },
      nmr: {
        signals: [
          { ppm: 4.12, integral: 2, multiplicity: 'q', label: '2H q' },
          { ppm: 2.05, integral: 3, multiplicity: 's', label: '3H s' },
          { ppm: 1.26, integral: 3, multiplicity: 't', label: '3H t' }
        ],
        prompt: '4.12 ppm 的 2H quartet 与 1.26 ppm 的 3H triplet 最直接组成什么片段？',
        options: [
          { id: 'a', label: '–OCH2CH3' },
          { id: 'b', label: '–COCH3 与一个孤立 CH' },
          { id: 'c', label: '两个彼此独立的甲基' }
        ],
        answer: 'a',
        skill: 'structure.nmr_splitting'
      },
      candidates: [
        {
          id: 'a', label: '乙酸乙酯', structure: 'CH3COOCH2CH3',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'pass', nmr: 'pass', 'acid-oh': 'pass' },
          eliminationReason: '酯羰基 + OCH2CH3 + COCH3 三组证据完全闭合。'
        },
        {
          id: 'b', label: '丙酸甲酯', structure: 'CH3CH2COOCH3',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'pass', nmr: 'fail', 'acid-oh': 'pass' },
          eliminationReason: '应有 OCH3 单峰，而不是 4.12 ppm 的 OCH2 quartet。'
        },
        {
          id: 'c', label: '丁酸', structure: 'CH3CH2CH2CO2H',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'fail', nmr: 'fail', 'acid-oh': 'fail' },
          eliminationReason: '应有极宽羧酸 O–H，NMR 也不会出现 OCH2CH3 组合。'
        }
      ],
      correctCandidate: 'a',
      explanation: '最省力的路线是先用 IR 判酯，再用 quartet + triplet 锁定乙氧基 –OCH2CH3，最后把剩余 3H singlet 放到 CH3CO–。'
    },
    {
      id: 'det-butanal',
      stage: 'Day 14 · 醛的双证据',
      title: '不要只看到 1725：醛还有第二个指纹',
      subtitle: '羰基只是第一层，醛氢和醛基 C–H 才把酮排出去。',
      formula: 'C4H8O',
      dbe: 1,
      hints: {
        dbe: '一个羰基就能解释这 1 个 DBE。',
        ir: '除了 1725 cm⁻¹，还要留意 2720 cm⁻¹ 附近的弱醛基 C–H。',
        nmr: '9–10 ppm 的 1H 是最硬的醛氢证据之一。',
        candidates: '如果候选没有 –CHO，就必须解释为什么会出现 9.75 ppm 的 1H。'
      },
      hardEvidence: [
        { id: 'formula', label: '分子式', text: 'C4H8O' },
        { id: 'tollens', label: '化学检验', text: 'Tollens 试剂：银镜阳性' }
      ],
      ir: {
        peaks: [
          { wavenumber: 1725, intensity: 0.9, label: 'C=O 强峰' },
          { wavenumber: 2720, intensity: 0.26, label: '弱峰' }
        ],
        prompt: '1725 cm⁻¹ 强峰 + 2720 cm⁻¹ 附近弱峰，最值得优先想到什么？',
        options: [
          { id: 'a', label: '醛羰基 + 醛基 C–H' },
          { id: 'b', label: '普通酮，2720 不重要' },
          { id: 'c', label: '羧酸 O–H' }
        ],
        answer: 'a',
        skill: 'structure.ir'
      },
      nmr: {
        signals: [
          { ppm: 9.75, integral: 1, multiplicity: 't', label: 'CHO' },
          { ppm: 2.42, integral: 2, multiplicity: 'm', label: 'CH2–CHO' },
          { ppm: 1.62, integral: 2, multiplicity: 'm', label: 'CH2' },
          { ppm: 0.96, integral: 3, multiplicity: 't', label: 'CH3' }
        ],
        prompt: '9.75 ppm 的 1H 最直接说明什么？',
        options: [
          { id: 'a', label: '存在醛氢 –CHO' },
          { id: 'b', label: '存在普通甲基' },
          { id: 'c', label: '存在醇羟基' }
        ],
        answer: 'a',
        skill: 'structure.nmr_shift'
      },
      candidates: [
        {
          id: 'a', label: '丁醛', structure: 'CH3CH2CH2CHO',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'pass', nmr: 'pass', tollens: 'pass' },
          eliminationReason: '醛基 IR、9.75 ppm 醛氢和银镜全部一致。'
        },
        {
          id: 'b', label: '2-丁酮', structure: 'CH3COCH2CH3',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'partial', nmr: 'fail', tollens: 'fail' },
          eliminationReason: '有羰基但没有醛氢，普通脂肪酮也不应银镜阳性。'
        },
        {
          id: 'c', label: '环丁醇', structure: 'cyclobutanol',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'fail', nmr: 'fail', tollens: 'fail' },
          eliminationReason: '环贡献 DBE，但应有 O–H 而没有羰基与醛氢。'
        }
      ],
      correctCandidate: 'a',
      explanation: '1725 cm⁻¹ 只告诉你“有羰基”的可能性；2720 cm⁻¹ 弱峰、9.75 ppm 醛氢和银镜阳性共同把 2-丁酮淘汰。'
    },
    {
      id: 'det-acetophenone',
      stage: 'Day 14 · 芳香体系',
      title: 'DBE=5 时，不要把“苯环”忘在第一步',
      subtitle: '先从分子式判断高不饱和度，再让芳香区积分和羰基位置合拢。',
      formula: 'C8H8O',
      dbe: 5,
      hints: {
        dbe: '8 个碳、8 个氢：DBE = (16 + 2 − 8)/2 = 5。',
        ir: '芳香酮的羰基常因共轭比普通饱和酮略向低波数移动。',
        nmr: '芳香区约 5H + 一个 3H singlet，很像单取代苯环 + COCH3。',
        candidates: '若是醛，应该额外出现 9–10 ppm 左右的醛氢；若是对甲基苯甲醛，芳香氢应主要是 4H。'
      },
      hardEvidence: [
        { id: 'formula', label: '分子式', text: 'C8H8O' },
        { id: 'aromatic-count', label: '芳香区积分', text: '7.2–8.0 ppm 合计约 5H' }
      ],
      ir: {
        peaks: [
          { wavenumber: 1685, intensity: 0.9, label: '共轭 C=O' },
          { wavenumber: 1600, intensity: 0.46, label: '芳环' },
          { wavenumber: 1500, intensity: 0.35, label: '芳环' }
        ],
        prompt: '1685 cm⁻¹ 强羰基峰并伴随芳环特征，最符合哪种第一层判断？',
        options: [
          { id: 'a', label: '羰基与芳环共轭' },
          { id: 'b', label: '一定是饱和脂肪醇' },
          { id: 'c', label: '一定是端炔' }
        ],
        answer: 'a',
        skill: 'structure.ir'
      },
      nmr: {
        signals: [
          { ppm: 7.85, integral: 2, multiplicity: 'm', label: 'Ar–H' },
          { ppm: 7.45, integral: 3, multiplicity: 'm', label: 'Ar–H' },
          { ppm: 2.60, integral: 3, multiplicity: 's', label: 'COCH3' }
        ],
        prompt: '芳香区共 5H，另有 2.60 ppm 的 3H singlet，最自然的片段组合是什么？',
        options: [
          { id: 'a', label: '单取代苯环 + –COCH3' },
          { id: 'b', label: '对二取代苯环 + –CHO' },
          { id: 'c', label: '乙基苯，没有羰基' }
        ],
        answer: 'a',
        skill: 'structure.nmr_integration'
      },
      candidates: [
        {
          id: 'a', label: '苯乙酮', structure: 'C6H5–CO–CH3',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'pass', nmr: 'pass', 'aromatic-count': 'pass' },
          eliminationReason: '单取代苯环 5H + 共轭酮羰基 + COCH3 单峰全部吻合。'
        },
        {
          id: 'b', label: '苯乙醛', structure: 'C6H5–CH2–CHO',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'partial', nmr: 'fail', 'aromatic-count': 'pass' },
          eliminationReason: '应出现醛氢和苄位 CH2，而不是一个 3H 的 COCH3 单峰。'
        },
        {
          id: 'c', label: '对甲基苯甲醛', structure: 'p-CH3–C6H4–CHO',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'partial', nmr: 'fail', 'aromatic-count': 'fail' },
          eliminationReason: '对二取代苯环芳香氢主要是 4H，还应有醛氢。'
        }
      ],
      correctCandidate: 'a',
      explanation: 'DBE=5 先提示“苯环 4 + 另一个不饱和单位 1”的组合；IR 给出共轭羰基，NMR 再用 5H 芳香区和 3H COCH3 单峰把结构收敛到苯乙酮。'
    },
    {
      id: 'lab20-x17',
      stage: 'LAB-20 · Day 13–14 持续案件',
      title: '无名样品 X-17',
      subtitle: 'Day13 先锁分子式、DBE 与 IR；Day14 再用 ¹H NMR 对称性确定取代位置。',
      formula: 'C8H7BrO',
      dbe: 5,
      hints: {
        dbe: '卤素按一个 H 计入 DBE：DBE = (2C + 2 − H − X) / 2。',
        ir: '1685 cm⁻¹ 左右的强峰配合芳环吸收，优先考虑与芳环共轭的羰基。',
        nmr: '对二取代苯环若两边具有对称关系，芳香区常能简化成两组、各约 2H 的信号。',
        candidates: '三个溴代苯乙酮异构体分子式和羰基 IR 很接近，真正拉开差距的是芳香氢的对称性。'
      },
      hardEvidence: [
        { id: 'formula', label: '分子式', text: 'C8H7BrO' },
        { id: 'dnph', label: '化学检验', text: '2,4-DNP：橙黄色沉淀（羰基阳性）' }
      ],
      ir: {
        peaks: [
          { wavenumber: 1685, intensity: 0.94, label: '共轭 C=O 强峰' },
          { wavenumber: 1600, intensity: 0.46, label: '芳环' },
          { wavenumber: 1490, intensity: 0.32, label: '芳环' }
        ],
        prompt: '这组 IR 与 2,4-DNP 阳性最稳妥支持哪一层判断？',
        options: [
          { id: 'a', label: '样品含有与芳环共轭的醛/酮型羰基' },
          { id: 'b', label: '已经能仅凭 IR 确定 Br 在对位' },
          { id: 'c', label: '样品一定是手性醇' }
        ],
        answer: 'a',
        skill: 'structure.ir'
      },
      nmr: {
        signals: [
          { ppm: 7.86, integral: 2, multiplicity: 'd', label: 'Ar–H · 2H' },
          { ppm: 7.58, integral: 2, multiplicity: 'd', label: 'Ar–H · 2H' },
          { ppm: 2.58, integral: 3, multiplicity: 's', label: 'COCH3 · 3H' }
        ],
        prompt: '芳香区主要是两组各 2H doublet，再加一个 3H 的 COCH3 singlet，最支持哪种取代关系？',
        options: [
          { id: 'a', label: '对位二取代苯环：p-Br–C6H4–COCH3' },
          { id: 'b', label: '邻位二取代；四个芳香氢都应完全等价' },
          { id: 'c', label: '单取代苯环；应有约 5H 芳香氢' }
        ],
        answer: 'a',
        skill: 'structure.symmetry'
      },
      candidates: [
        {
          id: 'para', label: '对溴苯乙酮', structure: 'p-Br–C6H4–COCH3',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'pass', nmr: 'pass', dnph: 'pass' },
          eliminationReason: '同一分子式与羰基证据下，芳香区两组各 2H 的近似对称信号最符合 para 二取代。'
        },
        {
          id: 'meta', label: '间溴苯乙酮', structure: 'm-Br–C6H4–COCH3',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'pass', nmr: 'fail', dnph: 'pass' },
          eliminationReason: '分子式与羰基都可满足，但 meta 取代通常不会给出如此简单的两组各 2H 芳香氢模式。'
        },
        {
          id: 'ortho', label: '邻溴苯乙酮', structure: 'o-Br–C6H4–COCH3',
          constraints: { formula: 'pass', dbe: 'pass', ir: 'pass', nmr: 'fail', dnph: 'pass' },
          eliminationReason: '同样可有羰基，但 ortho 取代破坏对称性，芳香区应更复杂。'
        }
      ],
      correctCandidate: 'para',
      explanation: 'Day13 的 DBE、IR 与羰基检验只能把 X-17 收到“溴代芳香酮”范围；Day14 的两组 2H 芳香信号才把取代位置锁定为 para。这里仍然没有任何手性结论。'
    }
  ];
})();
