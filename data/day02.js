(function () {
  'use strict';

  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};

  window.Organic637Data.days[2] = {
    day: 2,
    title: '同一个烯烃，条件决定去向',
    subtitle: '把试剂看完整：同一根 C=C 可以通向卤代物、醇、烷烃、裂解产物或烯丙位取代物。',
    estimatedMinutes: 90,
    objectives: [
      '区分普通 HBr 与 HBr/ROOR 的区域选择',
      '用氢硼化-氧化、加氢、臭氧化和强氧化条件预测产物',
      '识别 NBS 的烯丙位溴代而非双键加成',
      '从简单醇或卤代物逆推出合理烯烃与条件'
    ],
    lessons: [
      {
        id: 'd02-lesson-conditions',
        eyebrow: 'Day 2 · 条件判别',
        title: '不要只看 HBr，要看斜杠后面还有什么',
        body: '普通 HBr 走离子型亲电加成，Br 通常到较多取代的双键碳；加入过氧化物 ROOR 后，HBr 可走自由基链过程，Br 通常到较少取代的双键碳。这个“过氧化物效应”不能随意推广到 HCl 或 HI。',
        note: '先圈出完整条件，再判断产物类型和区域方向。'
      },
      {
        id: 'd02-lesson-branches',
        eyebrow: '一根双键 · 五个出口',
        title: '先问产物类型，再问区域与立体',
        body: 'H₂/Pd 把双键还原；BH₃·THF 后接 H₂O₂/OH⁻ 得反 Markovnikov 醇；O₃ 后处理切断双键；热、浓 KMnO₄ 也会氧化裂解；NBS/hν 则保留双键并在烯丙位换上 Br。',
        note: '“双键消失还是保留”是很省力的第一道筛选。'
      },
      {
        id: 'd02-lesson-retro',
        eyebrow: '30 秒微型逆推',
        title: '看到产物，反问最后一步需要哪种区域选择',
        body: '把目标里的 OH 或 Br 暂时拿掉，尝试在相邻两个碳之间补回 C=C。再根据目标基团落在较多还是较少取代碳，选择普通加成、自由基加成或氢硼化-氧化。',
        note: '逆推只是提出候选，最后一定要正向走一遍确认。'
      }
    ],
    questions: [
      {
        id: 'd02-hbr-roor-01', day: 2, type: 'choice', role: 'learn',
        primarySkill: 'alkene.hbr_peroxide',
        skillIds: ['alkene.hbr_peroxide', 'alkene.condition_discrimination'],
        difficulty: 1,
        prompt: '丙烯与 HBr/ROOR 反应，主产物是哪一个？',
        examTags: ['单步反应', '区域选择', '真题同型训练'],
        hints: ['ROOR 提示自由基链过程。', '在这个条件下，Br 落到较少取代的双键碳。'],
        explanationLayers: {
          short: '主产物是 1-溴丙烷。',
          why: 'HBr 在过氧化物存在时发生反 Markovnikov 自由基加成。',
          full: 'Br·先加到末端烯烃，使新的碳自由基位于更稳定的二级碳；随后它从 HBr 夺取 H，得到 CH₃CH₂CH₂Br 并再生 Br·。'
        },
        options: [
          { id: 'a', label: '1-溴丙烷', formula: 'CH₃CH₂CH₂Br' },
          { id: 'b', label: '2-溴丙烷', formula: 'CH₃CHBrCH₃' },
          { id: 'c', label: '1,2-二溴丙烷', formula: 'CH₃CHBrCH₂Br' }
        ],
        answer: 'a'
      },
      {
        id: 'd02-hydroboration-01', day: 2, type: 'structure-choice', role: 'practice',
        primarySkill: 'alkene.hydroboration_oxidation',
        skillIds: ['alkene.hydroboration_oxidation', 'alkene.condition_discrimination'],
        difficulty: 1,
        prompt: '1-丁烯依次经过 1) BH₃·THF；2) H₂O₂, OH⁻。主要得到哪种醇？',
        examTags: ['单步反应', '醇', '区域选择'],
        hints: ['氢硼化时 B 偏向位阻较小的一端。', '氧化把 C–B 转成 C–OH，碳骨架位置不变。'],
        explanationLayers: {
          short: '主要得到 1-丁醇。',
          why: '氢硼化-氧化给出反 Markovnikov 水合结果，OH 位于较少取代碳。',
          full: 'H 与 BH₂ 同面加到双键两端，B 优先到末端碳；碱性过氧化把 C–B 键转为 C–O 键并保留该位置，因此产物为 CH₃CH₂CH₂CH₂OH。'
        },
        options: [
          { id: 'a', label: '1-丁醇', formula: 'CH₃CH₂CH₂CH₂OH' },
          { id: 'b', label: '2-丁醇', formula: 'CH₃CH(OH)CH₂CH₃' },
          { id: 'c', label: '丁酮', formula: 'CH₃COCH₂CH₃' }
        ],
        answer: 'a'
      },
      {
        id: 'd02-hydrogenation-01', day: 2, type: 'choice', role: 'practice',
        primarySkill: 'alkene.hydrogenation',
        skillIds: ['alkene.hydrogenation', 'alkene.condition_discrimination'],
        difficulty: 1,
        prompt: '环己烯在 H₂/Pd 条件下，最主要的结构变化是什么？',
        examTags: ['单步反应', '还原'],
        hints: ['金属催化氢化消耗一当量 H₂。', '两个双键碳各得到一个 H。'],
        explanationLayers: {
          short: '环己烯被还原为环己烷。',
          why: 'H₂/Pd 催化加氢使 C=C 变为 C–C。',
          full: '烯烃与氢在金属表面吸附后同面传递氢；本题只需抓住不饱和度降低一，碳骨架不变。'
        },
        options: [
          { id: 'a', label: '生成环己烷', formula: 'C₆H₁₂' },
          { id: 'b', label: '生成环己醇', formula: 'C₆H₁₁OH' },
          { id: 'c', label: '开环生成己烷', formula: 'CH₃(CH₂)₄CH₃' }
        ],
        answer: 'a'
      },
      {
        id: 'd02-ozonolysis-01', day: 2, type: 'choice', role: 'practice',
        primarySkill: 'alkene.ozonolysis',
        skillIds: ['alkene.ozonolysis', 'structure.constraint_elimination'],
        difficulty: 2,
        prompt: '2-甲基-2-丁烯经 1) O₃；2) Zn/H₂O 处理，羰基产物组合是哪一组？',
        examTags: ['氧化裂解', '结构反推', '考点迁移'],
        hints: ['从 C=C 中间剪开，每个双键碳各变成一个羰基碳。', '带两个 CH₃ 的双键碳给丙酮；带 H 和 CH₃ 的双键碳给乙醛。'],
        explanationLayers: {
          short: '得到丙酮和乙醛。',
          why: '还原性臭氧化把双键两端分别变为酮和醛。',
          full: '(CH₃)₂C=CHCH₃ 裂开后，左端无 H，形成 (CH₃)₂CO；右端有 H 和 CH₃，形成 CH₃CHO。Zn/H₂O 后处理不会继续把醛氧化成酸。'
        },
        options: [
          { id: 'a', label: '丙酮 + 乙醛', formula: '(CH₃)₂CO + CH₃CHO' },
          { id: 'b', label: '两个丙酮', formula: '2 (CH₃)₂CO' },
          { id: 'c', label: '乙酸 + 丙酮', formula: 'CH₃CO₂H + (CH₃)₂CO' }
        ],
        answer: 'a'
      },
      {
        id: 'd02-kmno4-01', day: 2, type: 'choice', role: 'contrast',
        primarySkill: 'alkene.oxidative_cleavage',
        skillIds: ['alkene.oxidative_cleavage', 'alkene.ozonolysis'],
        difficulty: 2,
        prompt: '1-丁烯用热、浓 KMnO₄ 氧化并酸化，主要有机产物是哪一个？',
        examTags: ['氧化裂解', '条件对比'],
        hints: ['末端 =CH₂ 在强氧化裂解下最终可到 CO₂。', '另一端的双键碳带一个 H，会成为羧酸。'],
        explanationLayers: {
          short: '主要有机产物是丙酸，同时末端碳成为 CO₂。',
          why: '热浓高锰酸钾把末端烯烃彻底氧化裂解。',
          full: 'CH₂=CHCH₂CH₃ 中，末端 CH₂ 碳被氧化至 CO₂；相邻双键碳原来带 H，裂解后继续氧化为 CH₃CH₂CO₂H。'
        },
        options: [
          { id: 'a', label: '丙酸（并生成 CO₂）', formula: 'CH₃CH₂CO₂H' },
          { id: 'b', label: '丁醛', formula: 'CH₃CH₂CH₂CHO' },
          { id: 'c', label: '1,2-丁二醇', formula: 'HOCH₂CH(OH)CH₂CH₃' }
        ],
        answer: 'a'
      },
      {
        id: 'd02-nbs-01', day: 2, type: 'choice', role: 'contrast',
        primarySkill: 'alkene.allylic_bromination',
        skillIds: ['alkene.allylic_bromination', 'alkene.condition_discrimination'],
        difficulty: 2,
        prompt: '环己烯与 NBS/hν 反应，哪句描述最准确？',
        examTags: ['自由基', '条件判断', '单步反应'],
        hints: ['NBS 在这组条件下维持低浓度 Br₂并引发烯丙位取代。', '双键邻位的 C–H 被 Br 取代，双键总体保留。'],
        explanationLayers: {
          short: '发生烯丙位溴代，主要得到 3-溴环己烯。',
          why: 'NBS/hν 的核心是烯丙位自由基取代，不是给双键两端各加一个 Br。',
          full: '烯丙位氢被自由基抽取，形成共振稳定的烯丙基自由基，再与溴源反应。环己烯的等价烯丙位给同一构造产物。'
        },
        options: [
          { id: 'a', label: '双键保留，在烯丙位引入 Br', formula: '3-溴环己烯' },
          { id: 'b', label: '双键消失，生成邻二溴化物', formula: '1,2-二溴环己烷' },
          { id: 'c', label: '直接生成环己醇', formula: '环己醇' }
        ],
        answer: 'a'
      },
      {
        id: 'd02-route-propanol-01', day: 2, type: 'route', role: 'transfer',
        primarySkill: 'alkene.retrosynthesis',
        skillIds: ['alkene.retrosynthesis', 'alkene.hydroboration_oxidation', 'synthesis.last_step'],
        difficulty: 2,
        prompt: '从丙烯出发制备 1-丙醇。请选择一条能真正到达目标的路线；若走入支路，可以回到分叉点。',
        examTags: ['微型反合成', '路线选择', '区域选择'],
        hints: ['终点的 OH 在末端碳。', '需要反 Markovnikov 水合结果。'],
        explanationLayers: {
          short: '氢硼化-氧化路线直接到达 1-丙醇。',
          why: 'BH₃·THF；H₂O₂/OH⁻ 把 OH 放到较少取代的末端碳。',
          full: '酸催化水合虽能反应，但主要给 2-丙醇，是化学上可行却通向另一个产物的黄色支路；HBr/ROOR 给 1-溴丙烷，还需另一步取代，不能算本题最直接路线。'
        },
        graph: {
          start: 'propene', target: 'propanol1',
          nodes: [
            { id: 'propene', label: '丙烯', structure: 'CH₃CH=CH₂' },
            { id: 'propanol1', label: '1-丙醇', structure: 'CH₃CH₂CH₂OH' },
            { id: 'propanol2', label: '2-丙醇', structure: 'CH₃CH(OH)CH₃' },
            { id: 'bromopropane1', label: '1-溴丙烷', structure: 'CH₃CH₂CH₂Br' }
          ],
          edges: [
            { id: 'e1', from: 'propene', to: 'propanol1', choice: '先 BH₃·THF，再 H₂O₂/OH⁻', reagent: '1) BH₃·THF  2) H₂O₂, OH⁻', status: 'green', reason: '直接形成目标末端醇。' },
            { id: 'e2', from: 'propene', to: 'propanol2', choice: 'H₂O/H⁺', reagent: 'H₂O, H⁺', status: 'yellow', reason: '反应可行，但给 Markovnikov 产物 2-丙醇。' },
            { id: 'e3', from: 'propene', to: 'bromopropane1', choice: 'HBr/ROOR', reagent: 'HBr, ROOR', status: 'yellow', reason: '得到末端卤代物，尚未成为目标醇。' },
            { id: 'e4', from: 'bromopropane1', to: 'propanol1', choice: '稀 NaOH，水溶液', reagent: 'NaOH(aq)', status: 'green', reason: '一级卤代物可经 SN2 转为醇，但总路线更长。' }
          ],
          referenceRoutes: [['e1'], ['e3', 'e4']]
        },
        answer: { acceptedPaths: [['e1'], ['e3', 'e4']], preferredPath: ['e1'] }
      },
      {
        id: 'd02-retro-bromide-01', day: 2, type: 'synthesis', role: 'practice',
        primarySkill: 'synthesis.last_step',
        skillIds: ['synthesis.last_step', 'alkene.hx_markovnikov', 'alkene.retrosynthesis'],
        difficulty: 2,
        prompt: '目标是 2-溴丁烷。若最后一步从 1-丁烯加成得到，应该选哪组条件？',
        examTags: ['微型反合成', '最后一步'],
        hints: ['目标 Br 位于较多取代的原双键碳。', '不要加入会改变区域方向的过氧化物。'],
        explanationLayers: {
          short: '选择普通 HBr，不加 ROOR。',
          why: '1-丁烯普通 HBr 加成主要给 Markovnikov 产物 2-溴丁烷。',
          full: '先在 C1–C2 间补回双键得到 1-丁烯，再正向验证：质子化优先形成二级碳正离子，Br⁻ 捕获后得到外消旋 2-溴丁烷。'
        },
        start: { label: '1-丁烯', structure: 'CH₂=CHCH₂CH₃' },
        target: { label: '2-溴丁烷', structure: 'CH₃CHBrCH₂CH₃' },
        options: [
          { id: 'a', label: 'HBr' },
          { id: 'b', label: 'HBr/ROOR' },
          { id: 'c', label: 'Br₂/CCl₄' }
        ],
        answer: 'a'
      },
      {
        id: 'd02-condition-grid-01', day: 2, type: 'multi-choice', role: 'transfer',
        primarySkill: 'alkene.condition_discrimination',
        skillIds: ['alkene.condition_discrimination', 'alkene.hydrogenation', 'alkene.allylic_bromination'],
        difficulty: 2,
        prompt: '哪些条件通常保留原来的 C=C？选择所有正确项。',
        examTags: ['条件分流', '多选', '考点迁移'],
        hints: ['逐项问：反应发生在双键上，还是双键邻位？', 'NBS/hν 做烯丙位取代；其余两项直接消耗双键。'],
        explanationLayers: {
          short: '只有 NBS/hν 通常保留 C=C。',
          why: 'NBS/hν 主要替换烯丙位 H；H₂/Pd 与 Br₂/CCl₄ 都直接对双键加成。',
          full: '这里考的是产物类型的第一层分类。看到自由基烯丙位取代条件时保留烯键；看到催化氢化或卤素亲电加成时，π 键被消耗。'
        },
        options: [
          { id: 'a', label: 'NBS/hν' },
          { id: 'b', label: 'H₂/Pd' },
          { id: 'c', label: 'Br₂/CCl₄' }
        ],
        answer: ['a']
      }
    ],
    repairs: {
      'alkene.hbr_peroxide': [
        {
          id: 'd02-repair-hbr-roor-01', day: 2, type: 'choice', role: 'repair',
          primarySkill: 'alkene.hbr_peroxide', skillIds: ['alkene.hbr_peroxide'], difficulty: 1,
          prompt: '1-丁烯与 HBr/ROOR 反应，Br 主要落在哪个碳？',
          examTags: ['修复', '区域选择'], hints: ['ROOR 改变 HBr 的加成方向。'],
          explanationLayers: { short: 'Br 主要落在末端 C1。', why: '这样先形成更稳定的二级碳自由基。', full: 'Br·加到 C1，未配对电子留在 C2；C2 为二级自由基，比相反方向产生的一级自由基稳定。' },
          options: [{ id: 'a', label: '末端 C1' }, { id: 'b', label: '内部 C2' }], answer: 'a'
        }
      ],
      'alkene.hydroboration_oxidation': [
        {
          id: 'd02-repair-hydroboration-01', day: 2, type: 'choice', role: 'repair',
          primarySkill: 'alkene.hydroboration_oxidation', skillIds: ['alkene.hydroboration_oxidation'], difficulty: 1,
          prompt: '2-甲基丙烯经氢硼化-氧化后，OH 主要位于哪里？',
          examTags: ['修复', '区域选择'], hints: ['OH 最终替代最初的 B。'],
          explanationLayers: { short: 'OH 主要位于末端 CH₂。', why: 'B 在氢硼化中优先到较少取代、位阻较小的碳。', full: '产物为 2-甲基-1-丙醇，体现反 Markovnikov 区域选择。' },
          options: [{ id: 'a', label: '末端 CH₂' }, { id: 'b', label: '较多取代的中心碳' }], answer: 'a'
        }
      ],
      'alkene.ozonolysis': [
        {
          id: 'd02-repair-ozone-01', day: 2, type: 'choice', role: 'repair',
          primarySkill: 'alkene.ozonolysis', skillIds: ['alkene.ozonolysis'], difficulty: 2,
          prompt: '2-丁烯经 O₃、Zn/H₂O 后得到什么？',
          examTags: ['修复', '裂解'], hints: ['从对称双键中间剪开。'],
          explanationLayers: { short: '得到两分子乙醛。', why: '两个双键碳都各带一个 H 和一个 CH₃。', full: '每个双键碳在还原性后处理中都成为醛羰基，因此生成 2 CH₃CHO。' },
          options: [{ id: 'a', label: '2 CH₃CHO' }, { id: 'b', label: '2 CH₃CO₂H' }, { id: 'c', label: 'CH₃COCH₃' }], answer: 'a'
        }
      ],
      'alkene.allylic_bromination': [
        {
          id: 'd02-repair-nbs-01', day: 2, type: 'choice', role: 'repair',
          primarySkill: 'alkene.allylic_bromination', skillIds: ['alkene.allylic_bromination'], difficulty: 1,
          prompt: '丙烯在 NBS/hν 下，主要把哪类氢替换成 Br？',
          examTags: ['修复', '自由基'], hints: ['找双键旁边的碳。'],
          explanationLayers: { short: '替换烯丙位氢。', why: '烯丙基自由基可由共振稳定。', full: 'CH₂=CHCH₃ 主要形成 CH₂=CHCH₂Br；不是把双键直接变成邻二溴化物。' },
          options: [{ id: 'a', label: '烯丙位氢' }, { id: 'b', label: '乙烯基氢' }, { id: 'c', label: '任意氢完全等价' }], answer: 'a'
        }
      ]
    }
  };
})();
