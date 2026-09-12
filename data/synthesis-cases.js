(function () {
  'use strict';
  const Data = window.Organic637Data = window.Organic637Data || {};

  Data.SYNTHESIS_CASES = [
    {
      id: 'syn-propene-propanol1',
      stage: 'Day 17 · 入门桥',
      title: '丙烯 → 1-丙醇',
      subtitle: '同碳数官能团变化：先看 OH 最终落在哪一端。',
      start: { id: 'propene', label: '丙烯', structure: 'CH₃–CH=CH₂', carbonCount: 3 },
      target: { id: 'propanol1', label: '1-丙醇', structure: 'CH₃–CH₂–CH₂OH', carbonCount: 3 },
      analysis: {
        differencePrompt: '起点和终点最关键的结构差异是什么？',
        differenceOptions: [
          { id: 'a', label: 'C=C 变成 C–C，并在末端得到 OH' },
          { id: 'b', label: '碳链增加 1 个碳' },
          { id: 'c', label: '需要形成芳香环' }
        ],
        differenceAnswer: 'a',
        carbonPrompt: '碳数发生了什么变化？',
        carbonOptions: [{ id: 'a', label: '不变：3C → 3C' }, { id: 'b', label: '+1C' }, { id: 'c', label: '-1C' }],
        carbonAnswer: 'a',
        teaching: '目标 OH 在末端，所以要优先寻找反 Markovnikov 水合；若先得到末端卤代物，也可以再做取代。'
      },
      hints: [
        '只看官能团：目标是末端醇，不需要改变碳骨架。',
        '想最后一步：哪种烯烃水合能把 OH 放到较少取代碳？',
        '最短路线是 1) BH₃·THF  2) H₂O₂/OH⁻。'
      ],
      graph: {
        start: 'propene', target: 'propanol1',
        nodes: [
          { id: 'propene', label: '丙烯', structure: 'CH₃–CH=CH₂' },
          { id: 'propanol1', label: '1-丙醇', structure: 'CH₃–CH₂–CH₂OH' },
          { id: 'bromopropane1', label: '1-溴丙烷', structure: 'CH₃–CH₂–CH₂Br' },
          { id: 'propanol2', label: '2-丙醇', structure: 'CH₃–CH(OH)–CH₃' }
        ],
        edges: [
          { id: 'e1', from: 'propene', to: 'propanol1', reagent: '1) BH₃·THF  2) H₂O₂, OH⁻', transformation: '反 Markovnikov 水合', status: 'green', selectivity: 1, compatibility: true, reason: '一步直接得到目标末端醇。' },
          { id: 'e2', from: 'propene', to: 'bromopropane1', reagent: 'HBr / ROOR', transformation: '自由基反 Markovnikov 加成', status: 'yellow', selectivity: .9, compatibility: true, reason: '化学上可行，但只是先得到末端卤代物，还需要再转成醇。' },
          { id: 'e3', from: 'bromopropane1', to: 'propanol1', reagent: 'NaOH(aq)', transformation: '一级卤代烃 SN2 水解', status: 'green', selectivity: .9, compatibility: true, reason: '可以得到目标，但路线比直接氢硼化更长。' },
          { id: 'e4', from: 'propene', to: 'propanol2', reagent: 'H₂O / H⁺', transformation: '酸催化水合', status: 'orange', selectivity: .95, compatibility: true, reason: '反应本身成立，但主要给 2-丙醇，不是目标区域。' }
        ],
        referenceRoutes: [['e1'], ['e2', 'e3']],
        preferredPath: ['e1']
      }
    },
    {
      id: 'syn-butyne-hexyne',
      stage: 'Day 17 · C–C 键',
      title: '1-丁炔 → 3-己炔',
      subtitle: '先审计碳数，再用端炔负离子完成 +2C。',
      start: { id: 'butyne1', label: '1-丁炔', structure: 'HC≡C–CH₂CH₃', carbonCount: 4 },
      target: { id: 'hexyne3', label: '3-己炔', structure: 'CH₃CH₂–C≡C–CH₂CH₃', carbonCount: 6 },
      analysis: {
        differencePrompt: '目标比起点最关键多了什么？',
        differenceOptions: [{ id: 'a', label: '端炔 H 被一个乙基取代' }, { id: 'b', label: '只把三键还原成双键' }, { id: 'c', label: '少了两个碳' }],
        differenceAnswer: 'a',
        carbonPrompt: '碳数变化是多少？',
        carbonOptions: [{ id: 'a', label: '+2C' }, { id: 'b', label: '+1C' }, { id: 'c', label: '不变' }],
        carbonAnswer: 'a',
        teaching: '端炔的末端 H 可以先被 NaNH₂ 移走；所得炔负离子适合攻击甲基或一级卤代烃。'
      },
      hints: ['先把端炔变成亲核体。', '目标多两个碳，因此需要二碳一级卤代烃。', 'NaNH₂ → 炔负离子；再加 CH₃CH₂Br。'],
      graph: {
        start: 'butyne1', target: 'hexyne3',
        nodes: [
          { id: 'butyne1', label: '1-丁炔', structure: 'HC≡C–CH₂CH₃' },
          { id: 'acetylide', label: '丁炔负离子', structure: '⁻C≡C–CH₂CH₃' },
          { id: 'hexyne3', label: '3-己炔', structure: 'CH₃CH₂–C≡C–CH₂CH₃' },
          { id: 'pentyne2', label: '2-戊炔', structure: 'CH₃–C≡C–CH₂CH₃' },
          { id: 'isobutene', label: '异丁烯支路', structure: '(CH₃)₂C=CH₂' }
        ],
        edges: [
          { id: 'e1', from: 'butyne1', to: 'acetylide', reagent: 'NaNH₂ / NH₃(l)', transformation: '端炔去质子化', status: 'green', selectivity: 1, compatibility: true, reason: '生成后续构建 C–C 键所需的炔负离子。' },
          { id: 'e2', from: 'acetylide', to: 'hexyne3', reagent: 'CH₃CH₂Br', transformation: 'SN2 增加 2 个碳', status: 'green', selectivity: 1, compatibility: true, reason: '一级溴代烃位阻小，直接到达目标。' },
          { id: 'e3', from: 'acetylide', to: 'pentyne2', reagent: 'CH₃I', transformation: 'SN2 增加 1 个碳', status: 'yellow', selectivity: 1, compatibility: true, reason: '反应很好，但只增加 1 个碳，产物碳数不足。' },
          { id: 'e4', from: 'acetylide', to: 'isobutene', reagent: '(CH₃)₃CBr', transformation: '强碱诱导 E2', status: 'red', selectivity: .1, compatibility: false, reason: '三级卤代烃不适合普通 SN2，强碱性炔负离子更易引发 E2。' }
        ],
        referenceRoutes: [['e1', 'e2']], preferredPath: ['e1', 'e2']
      }
    },
    {
      id: 'syn-bromobutane-pentanoic',
      stage: 'Day 17 · 增一碳',
      title: '1-溴丁烷 → 戊酸',
      subtitle: '目标多一个碳：腈路线与 Grignard/CO₂ 都能搭桥。',
      start: { id: 'bromobutane1', label: '1-溴丁烷', structure: 'CH₃CH₂CH₂CH₂Br', carbonCount: 4 },
      target: { id: 'pentanoic', label: '戊酸', structure: 'CH₃CH₂CH₂CH₂CO₂H', carbonCount: 5 },
      analysis: {
        differencePrompt: '目标相对起点最关键的变化是哪一个？',
        differenceOptions: [{ id: 'a', label: 'Br 被含一个新碳的 –CO₂H 端替代' }, { id: 'b', label: '碳链缩短一个碳' }, { id: 'c', label: '只发生消除' }],
        differenceAnswer: 'a',
        carbonPrompt: '碳数审计结果？',
        carbonOptions: [{ id: 'a', label: '4C → 5C，+1C' }, { id: 'b', label: '4C → 4C' }, { id: 'c', label: '4C → 3C' }],
        carbonAnswer: 'a',
        teaching: '看到“卤代烃 → 多 1 个碳的羧酸”，优先想到 CN⁻ 增一碳后水解；也可以想 Grignard 与 CO₂。'
      },
      hints: ['目标多 1 个碳，先找能提供一个新碳的试剂。', 'CN⁻ 的碳会进入碳链；腈水解后变羧酸。', 'NaCN/DMSO → RCN；再 H₃O⁺、加热 → RCO₂H。'],
      graph: {
        start: 'bromobutane1', target: 'pentanoic',
        nodes: [
          { id: 'bromobutane1', label: '1-溴丁烷', structure: 'CH₃CH₂CH₂CH₂Br' },
          { id: 'pentanenitrile', label: '戊腈', structure: 'CH₃CH₂CH₂CH₂CN' },
          { id: 'pentanoic', label: '戊酸', structure: 'CH₃CH₂CH₂CH₂CO₂H' },
          { id: 'butylmgbr', label: '正丁基溴化镁', structure: 'CH₃CH₂CH₂CH₂MgBr' },
          { id: 'butanol1', label: '1-丁醇', structure: 'CH₃CH₂CH₂CH₂OH' }
        ],
        edges: [
          { id: 'e1', from: 'bromobutane1', to: 'pentanenitrile', reagent: 'NaCN / DMSO', transformation: 'SN2 增一碳', status: 'green', selectivity: 1, compatibility: true, reason: '一级卤代烃适合 SN2，CN 的碳进入主链。' },
          { id: 'e2', from: 'pentanenitrile', to: 'pentanoic', reagent: 'H₃O⁺，加热', transformation: '腈水解', status: 'green', selectivity: 1, compatibility: true, reason: '腈碳最终成为羧基碳。' },
          { id: 'e3', from: 'bromobutane1', to: 'butylmgbr', reagent: 'Mg / 无水乙醚', transformation: '制备 Grignard 试剂', status: 'yellow', selectivity: .9, compatibility: true, reason: '化学上可行，是另一条增一碳路线，但对无水条件要求更高。' },
          { id: 'e4', from: 'butylmgbr', to: 'pentanoic', reagent: '1) CO₂  2) H₃O⁺', transformation: '羧化增一碳', status: 'yellow', selectivity: 1, compatibility: true, reason: 'Grignard 与 CO₂ 反应后酸化，同样得到多一碳羧酸。' },
          { id: 'e5', from: 'bromobutane1', to: 'butanol1', reagent: 'NaOH(aq)', transformation: '水解', status: 'orange', selectivity: 1, compatibility: true, reason: '可以生成醇，但碳数没有增加，离目标更远。' }
        ],
        referenceRoutes: [['e1', 'e2'], ['e3', 'e4']], preferredPath: ['e1', 'e2']
      }
    },
    {
      id: 'syn-benzene-meta-bromoacetophenone',
      stage: 'Day 18 · 顺序与定位',
      title: '苯 → 间溴苯乙酮',
      subtitle: '同样两次芳香取代，先后顺序会改变定位结果。',
      start: { id: 'benzene', label: '苯', structure: 'C₆H₆', carbonCount: 6 },
      target: { id: 'meta', label: '间溴苯乙酮', structure: 'm-Br–C₆H₄–COCH₃', carbonCount: 8 },
      analysis: {
        differencePrompt: '目标芳环上新增了哪两类取代基？',
        differenceOptions: [{ id: 'a', label: '–COCH₃ 与 –Br，且互为间位' }, { id: 'b', label: '–NH₂ 与 –OH' }, { id: 'c', label: '只有一个 –Br' }],
        differenceAnswer: 'a',
        carbonPrompt: '相对苯环骨架，新增乙酰基会带来几个碳？',
        carbonOptions: [{ id: 'a', label: '+2C' }, { id: 'b', label: '+1C' }, { id: 'c', label: '不增加碳' }],
        carbonAnswer: 'a',
        teaching: '–COCH₃ 是钝化的间位定位基。先把它装上，再溴化，能把后来的 Br 引向间位。'
      },
      hints: ['目标要求 Br 与 COCH₃ 间位。', '问哪一个先装上后，能把第二个基团导向间位。', '先 Friedel–Crafts 酰基化得到苯乙酮，再 Br₂/FeBr₃。'],
      graph: {
        start: 'benzene', target: 'meta',
        nodes: [
          { id: 'benzene', label: '苯', structure: 'C₆H₆' },
          { id: 'acetophenone', label: '苯乙酮', structure: 'C₆H₅COCH₃' },
          { id: 'meta', label: '间溴苯乙酮', structure: 'm-Br–C₆H₄–COCH₃' },
          { id: 'bromobenzene', label: '溴苯', structure: 'C₆H₅Br' },
          { id: 'opmix', label: '邻/对溴苯乙酮混合倾向', structure: 'o-/p-Br–C₆H₄–COCH₃' }
        ],
        edges: [
          { id: 'e1', from: 'benzene', to: 'acetophenone', reagent: 'CH₃COCl / AlCl₃', transformation: 'Friedel–Crafts 酰基化', status: 'green', selectivity: 1, compatibility: true, reason: '先引入间位定位的 –COCH₃。' },
          { id: 'e2', from: 'acetophenone', to: 'meta', reagent: 'Br₂ / FeBr₃', transformation: '亲电芳香溴代', status: 'green', selectivity: .9, compatibility: true, reason: '–COCH₃ 为间位定位基，Br 主要进入间位。' },
          { id: 'e3', from: 'benzene', to: 'bromobenzene', reagent: 'Br₂ / FeBr₃', transformation: '芳香溴代', status: 'orange', selectivity: 1, compatibility: true, reason: '先溴化会让 Br 以邻/对位定位影响后续取代，而且卤素使芳环钝化。' },
          { id: 'e4', from: 'bromobenzene', to: 'opmix', reagent: 'CH₃COCl / AlCl₃', transformation: '尝试 Friedel–Crafts 酰基化', status: 'red', selectivity: .25, compatibility: false, reason: '这一路既受卤素钝化影响，也不导向目标间位主产物。' }
        ],
        referenceRoutes: [['e1', 'e2']], preferredPath: ['e1', 'e2']
      }
    },
    {
      id: 'syn-aniline-phenol',
      stage: 'Day 18 · 重氮盐枢纽',
      title: '苯胺 → 苯酚',
      subtitle: '芳胺先变成重氮盐，再把 –N₂⁺ 换成 –OH。',
      start: { id: 'aniline', label: '苯胺', structure: 'C₆H₅NH₂', carbonCount: 6 },
      target: { id: 'phenol', label: '苯酚', structure: 'C₆H₅OH', carbonCount: 6 },
      analysis: {
        differencePrompt: '这道题真正需要替换的是哪个官能团？',
        differenceOptions: [{ id: 'a', label: '芳环上的 –NH₂ → –OH' }, { id: 'b', label: '碳链增加一个碳' }, { id: 'c', label: '把苯环完全加氢' }],
        differenceAnswer: 'a',
        carbonPrompt: '碳骨架是否变化？',
        carbonOptions: [{ id: 'a', label: '不变，都是 6C 芳环' }, { id: 'b', label: '+1C' }, { id: 'c', label: '-1C' }],
        carbonAnswer: 'a',
        teaching: '芳香胺的 –NH₂ 很适合先重氮化，ArN₂⁺ 是芳香合成中的“可替换接口”。'
      },
      hints: ['先把 –NH₂ 变成一个更容易替换的离去接口。', '0–5 ℃ 下 NaNO₂/HCl 形成重氮盐。', 'ArN₂⁺ 加热水解可得到 ArOH。'],
      graph: {
        start: 'aniline', target: 'phenol',
        nodes: [
          { id: 'aniline', label: '苯胺', structure: 'C₆H₅NH₂' },
          { id: 'diazonium', label: '苯重氮盐', structure: 'C₆H₅N₂⁺Cl⁻' },
          { id: 'phenol', label: '苯酚', structure: 'C₆H₅OH' },
          { id: 'tribromo', label: '2,4,6-三溴苯胺', structure: '2,4,6-Br₃C₆H₂NH₂' }
        ],
        edges: [
          { id: 'e1', from: 'aniline', to: 'diazonium', reagent: 'NaNO₂ / HCl，0–5 ℃', transformation: '重氮化', status: 'green', selectivity: 1, compatibility: true, reason: '把 –NH₂ 转为可继续替换的重氮基。' },
          { id: 'e2', from: 'diazonium', to: 'phenol', reagent: 'H₂O，加热', transformation: '重氮盐水解', status: 'green', selectivity: 1, compatibility: true, reason: '放出 N₂ 并形成 Ar–OH。' },
          { id: 'e3', from: 'aniline', to: 'tribromo', reagent: 'Br₂ / H₂O', transformation: '强活化芳环多溴代', status: 'orange', selectivity: .2, compatibility: false, reason: '苯胺强烈活化邻对位，会快速多溴代，偏离目标。' }
        ],
        referenceRoutes: [['e1', 'e2']], preferredPath: ['e1', 'e2']
      }
    },
    {
      id: 'syn-acetone-tertbutanol',
      stage: 'Day 18 · 羰基增碳',
      title: '丙酮 → 叔丁醇',
      subtitle: '羰基加一个甲基：Grignard 的碳真正进入产物。',
      start: { id: 'acetone', label: '丙酮', structure: '(CH₃)₂C=O', carbonCount: 3 },
      target: { id: 'tertbutanol', label: '叔丁醇', structure: '(CH₃)₃COH', carbonCount: 4 },
      analysis: {
        differencePrompt: '目标相对丙酮增加了什么？',
        differenceOptions: [{ id: 'a', label: '羰基碳多接一个 CH₃，并最终变成醇' }, { id: 'b', label: '少一个碳' }, { id: 'c', label: '只把 C=O 还原成 CH₂' }],
        differenceAnswer: 'a',
        carbonPrompt: '碳数变化？',
        carbonOptions: [{ id: 'a', label: '+1C' }, { id: 'b', label: '不变' }, { id: 'c', label: '+2C' }],
        carbonAnswer: 'a',
        teaching: 'Grignard 试剂 RMgX 可以看成“带亲核性的 R⁻ 等价体”；R 会和羰基碳形成新的 C–C 键。'
      },
      hints: ['目标比丙酮多一个甲基。', '需要一个“CH₃⁻ 等价体”进攻羰基。', 'CH₃MgBr / 无水乙醚；再 H₃O⁺。'],
      graph: {
        start: 'acetone', target: 'tertbutanol',
        nodes: [
          { id: 'acetone', label: '丙酮', structure: '(CH₃)₂C=O' },
          { id: 'alkoxide', label: '三级烷氧基镁盐', structure: '(CH₃)₃C–O⁻MgBr⁺' },
          { id: 'tertbutanol', label: '叔丁醇', structure: '(CH₃)₃COH' },
          { id: 'isopropanol', label: '异丙醇', structure: '(CH₃)₂CHOH' }
        ],
        edges: [
          { id: 'e1', from: 'acetone', to: 'alkoxide', reagent: 'CH₃MgBr / 无水乙醚', transformation: 'Grignard 亲核加成，形成新 C–C 键', status: 'green', selectivity: 1, compatibility: true, reason: '甲基真正加到羰基碳上，碳数 +1。' },
          { id: 'e2', from: 'alkoxide', to: 'tertbutanol', reagent: 'H₃O⁺', transformation: '酸化质子化', status: 'green', selectivity: 1, compatibility: true, reason: '烷氧负离子质子化得到目标醇。' },
          { id: 'e3', from: 'acetone', to: 'isopropanol', reagent: 'NaBH₄ / MeOH', transformation: '羰基还原', status: 'orange', selectivity: 1, compatibility: true, reason: '能把羰基还原成醇，但没有形成新 C–C 键，碳数仍是 3。' }
        ],
        referenceRoutes: [['e1', 'e2']], preferredPath: ['e1', 'e2']
      }
    },
    {
      id: 'lab20-hidden-route',
      stage: 'LAB-20 · Day 17–18',
      title: '隐藏补救路线：从异常体系到 L20-F',
      subtitle: '先逆推“为什么会出现 X-17”，再正向审计每一步是否真的兼容。',
      start: { id:'r17-abnormal', label:'R-17事故后的异常体系', structure:'p-Br-Ph-CH(OAc/OH)-CH₃（混合物）', carbonCount:8 },
      target: { id:'l20f', label:'L20-F', structure:'p-Br-Ph-CH(OH)-CH₃（S:R≈51:49）', carbonCount:8 },
      analysis: {
        differencePrompt:'要解释 L20-F 的来源，最关键的是哪条“身份变化”？',
        differenceOptions:[
          {id:'a',label:'异常苄位含氧组分经过非手性 X-17，再被还原回醇'},
          {id:'b',label:'碳链需要增加 2 个碳'},
          {id:'c',label:'芳环需要被完全加氢'}
        ],
        differenceAnswer:'a',
        carbonPrompt:'整条补救尾段的主碳骨架怎样变化？',
        carbonOptions:[{id:'a',label:'8C → 8C，碳骨架不变'},{id:'b',label:'8C → 9C'},{id:'c',label:'8C → 7C'}],
        carbonAnswer:'a',
        teaching:'真正的路线指纹不是“多了几个碳”，而是手性苄位醇被氧化成非手性酮 X-17；一旦经过这一步，原有单一构型信息被擦除。'
      },
      hints:[
        '先从 L20-F 往回看：普通 NaBH₄ 最自然的前体是什么？',
        'X-17 已经在 Day14 被锁定为 4-bromoacetophenone。',
        '保护一个必须被氧化的 OH，会让下一步 PCC 失去反应位点。'
      ],
      graph:{
        start:'r17-abnormal', target:'l20f',
        nodes:[
          {id:'r17-abnormal',label:'R-17异常体系',structure:'p-Br-Ph-CH(OAc/OH)-CH₃（混合物）'},
          {id:'recovered-alcohol',label:'可回收苄位醇组分',structure:'p-Br-Ph-CH(OH)-CH₃'},
          {id:'x17',label:'X-17',structure:'p-Br-Ph-COCH₃'},
          {id:'l20f',label:'L20-F',structure:'p-Br-Ph-CH(OH)-CH₃（S:R≈51:49）'},
          {id:'protected-alcohol',label:'被乙酰化的醇',structure:'p-Br-Ph-CH(OAc)-CH₃'},
          {id:'blocked-oxidation',label:'被保护基卡住的死路',structure:'OH 已被保护，PCC 无法按计划生成 X-17'}
        ],
        edges:[
          {id:'lab20-e1',from:'r17-abnormal',to:'recovered-alcohol',reagent:'分离 / 必要时温和水解',transformation:'回收苄位醇组分',status:'green',selectivity:.85,compatibility:true,reason:'从异常体系中得到可继续处理的苄位醇，是补救路线的真实起点。'},
          {id:'lab20-e2',from:'recovered-alcohol',to:'x17',reagent:'PCC / CH₂Cl₂',transformation:'苄位醇氧化为非手性酮',status:'green',selectivity:1,compatibility:true,reason:'生成 X-17，同时把原来的手性中心变成平面羰基碳。'},
          {id:'lab20-e3',from:'x17',to:'l20f',reagent:'NaBH₄ / MeOH',transformation:'非手性羰基还原',status:'green',selectivity:.5,compatibility:true,reason:'普通非手性还原从羰基两面进攻，得到近外消旋醇，符合 L20-F 的手性HPLC证据。'},
          {id:'lab20-e4',from:'recovered-alcohol',to:'protected-alcohol',reagent:'Ac₂O / pyridine',transformation:'把 OH 乙酰化保护',status:'yellow',selectivity:1,compatibility:true,reason:'这一步本身化学上成立，所以不会立刻判错；但要继续问它是否兼容后面的氧化目标。'},
          {id:'lab20-e5',from:'protected-alcohol',to:'blocked-oxidation',reagent:'PCC / CH₂Cl₂',transformation:'尝试氧化被保护的 OH',status:'red',selectivity:0,compatibility:false,reason:'需要被氧化的醇已经被保护成乙酸酯，PCC 不再有目标 OH；这条路线在后续兼容性上才暴露错误。'}
        ],
        referenceRoutes:[['lab20-e1','lab20-e2','lab20-e3']],
        preferredPath:['lab20-e1','lab20-e2','lab20-e3']
      }
    }

  ];
})();
