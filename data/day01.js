window.ORGANIC637_DAY01 = {
  day: 1,
  title: "先认识 π 键的三个动作",
  subtitle: "今天只学一小串：找到 C=C → 往上加东西 → 看条件决定产物。",
  estimatedMinutes: 35,
  skills: [
    { id: "alkene.pi_center", label: "找到 C=C 反应中心" },
    { id: "alkene.hx_markovnikov", label: "普通 HBr 加成" },
    { id: "alkene.br2_addition", label: "Br₂ 双键加成" },
    { id: "alkene.halohydrin", label: "Br₂/H₂O 卤代醇" },
    { id: "alkene.condition_discrimination", label: "条件辨别" }
  ],
  lessons: [
    {
      id: "intro-pi",
      eyebrow: "Day 1 · 第一小串",
      title: "先别背试剂，先找最容易动的地方",
      body: "烯烃里最显眼的是 C=C。今天的大多数反应，都先从这根 π 键开始。我们先学会一眼把它找出来。",
      note: "今天不会突然跳去学 NMR、芳香化学或 SN1。只围绕同一条主线往前走。"
    },
    {
      id: "intro-add",
      eyebrow: "只增加一个新想法",
      title: "π 键可以把东西接进来",
      body: "当双键发生加成时，原来的 π 键被打开，两个新基团分别接到原来双键的两个碳上。",
      note: "先会看“加了什么、加到哪边”，机理以后再逐层展开。"
    }
  ],
  questions: [
    {
      id: "pi-center-1",
      skill: "alkene.pi_center",
      prompt: "看这个分子：CH₃–CH=CH₂。今天最值得先盯住的反应中心是哪一处？",
      formula: "CH₃–CH=CH₂",
      options: ["C=C", "左边的 C–C", "任意一根 C–H"],
      answer: 0,
      hint1: "先找和普通单键最不一样的地方。",
      hint2: "双键里的 π 电子更容易参与今天要学的加成反应。",
      explanation: "对，先盯住 C=C。Day 1 的核心就是从这根 π 键出发认识几种典型加成。",
      whyNot: "普通 C–C 和 C–H 当然也能在别的反应里变化，但不是今天这组典型烯烃加成的首要反应中心。"
    },
    {
      id: "hbr-1",
      skill: "alkene.hx_markovnikov",
      prompt: "丙烯 CH₃–CH=CH₂ 与 HBr 反应（没有过氧化物）。主产物更接近哪一个？",
      formula: "CH₃–CH=CH₂  +  HBr",
      options: ["CH₃–CHBr–CH₃", "CH₃–CH₂–CH₂Br", "CH₃–CH₂–CH₃"],
      answer: 0,
      hint1: "先别背名字。想一想：哪一种加成方向对应更稳定的中间体？",
      hint2: "普通条件下，Br 最终落在更取代的那个双键碳上。",
      explanation: "普通 HBr 加成走经典亲电加成方向，主产物是 2-溴丙烷。",
      whyNot: "1-溴丙烷对应另一种区域方向；以后 Day 2 加入过氧化物时，我们会专门比较为什么方向会改变。"
    },
    {
      id: "br2-1",
      skill: "alkene.br2_addition",
      prompt: "环己烯遇 Br₂/CCl₄，最核心的结构变化是什么？",
      formula: "cyclohexene  +  Br₂ / CCl₄",
      options: ["两个 Br 加到原双键两端", "只在烯丙位换成 Br", "生成 Br 和 OH"],
      answer: 0,
      hint1: "这里没有 H₂O，也没有 NBS。先只看 Br₂ 对双键本身做什么。",
      hint2: "把 C=C 想成打开以后，两端各接一个 Br。",
      explanation: "Br₂ 对烯烃发生双键加成，两个 Br 加到原来双键的两个碳上。",
      whyNot: "烯丙位溴代通常要看 NBS/自由基条件；Br/OH 则需要水参与形成卤代醇。"
    },
    {
      id: "halohydrin-1",
      skill: "alkene.halohydrin",
      prompt: "丙烯与 Br₂/H₂O 反应。下面哪种描述更合适？",
      formula: "CH₃–CH=CH₂  +  Br₂ / H₂O",
      options: ["OH 更偏向较多取代碳，Br 到另一端", "Br 和 Br 分别加到两端", "只生成醇，不含 Br"],
      answer: 0,
      hint1: "这次和上一题只多了一个东西：H₂O。",
      hint2: "有水时，不再只得到二溴化物；会形成 Br/OH 的组合。",
      explanation: "Br₂/H₂O 形成卤代醇；在典型不对称烯烃中，OH 更偏向较多取代的碳。",
      whyNot: "只写二溴化物忽略了水；只写醇又丢掉了 Br。这里最值得记住的是“同一个 Br₂，溶剂换成水，产物类型也跟着变”。"
    },
    {
      id: "condition-1",
      skill: "alkene.condition_discrimination",
      prompt: "同一个烯烃，哪组条件最直接提示你要考虑“卤代醇”而不是“二溴加成”？",
      formula: "C=C  +  ?",
      options: ["Br₂ / H₂O", "Br₂ / CCl₄", "H₂ / Pd"],
      answer: 0,
      hint1: "看三组条件里，哪一个多了能提供 OH 的来源。",
      hint2: "关键词不是只看到 Br₂，而是要把 H₂O 一起读进去。",
      explanation: "Br₂/H₂O 是今天最重要的一组条件辨别：它提示卤代醇。",
      whyNot: "Br₂/CCl₄ 对应普通二卤加成；H₂/Pd 是加氢还原，不是今天这道条件辨别。"
    }
  ],
  repairs: {
    "alkene.pi_center": [
      {
        id: "repair-pi-1",
        skill: "alkene.pi_center",
        prompt: "换一个结构：CH₂=CH–CH₂CH₃。先不要想产物，反应中心在哪里？",
        formula: "CH₂=CH–CH₂CH₃",
        options: ["C=C", "末端 CH₃", "所有 C–C 都一样"],
        answer: 0,
        hint1: "还是找 π 键。",
        hint2: "双键就是今天这串反应的入口。",
        explanation: "对，仍然先找到 C=C。换了骨架以后，第一眼判断没有变。",
        whyNot: "骨架变长不会改变今天最先识别 π 键的任务。"
      }
    ],
    "alkene.hx_markovnikov": [
      {
        id: "repair-hbr-1",
        skill: "alkene.hx_markovnikov",
        prompt: "1-丁烯 CH₂=CH–CH₂CH₃ 与 HBr（无过氧化物）反应，主产物中 Br 更偏向哪里？",
        formula: "CH₂=CH–CH₂CH₃  +  HBr",
        options: ["原双键的第二个碳", "末端第一个碳", "最远端 CH₃"],
        answer: 0,
        hint1: "沿用上一题的普通 HBr 区域选择。",
        hint2: "Br 更偏向较多取代的双键碳。",
        explanation: "很好。结构换了以后，你仍然能把普通 HBr 的区域方向迁移过来。",
        whyNot: "如果只凭“Br 靠近端点”来猜，很容易把普通条件和后续的自由基条件混在一起。"
      },
      {
        id: "repair-hbr-2",
        skill: "alkene.hx_markovnikov",
        prompt: "2-甲基丙烯与 HBr（无过氧化物）反应，Br 更偏向哪个位置？",
        formula: "(CH₃)₂C=CH₂  +  HBr",
        options: ["更取代的碳", "末端 CH₂", "不会反应"],
        answer: 0,
        hint1: "仍然只问普通 HBr 的主方向。",
        hint2: "优先考虑能对应更稳定中间体的方向。",
        explanation: "对，普通 HBr 仍然指向更取代碳。",
        whyNot: "这道变式用来确认你掌握的是判断逻辑，而不是记住上一道的产物图。"
      }
    ],
    "alkene.br2_addition": [
      {
        id: "repair-br2-1",
        skill: "alkene.br2_addition",
        prompt: "丙烯遇 Br₂/CCl₄，下面哪一个最符合主变化？",
        formula: "CH₃–CH=CH₂  +  Br₂ / CCl₄",
        options: ["原双键两端各接 Br", "只在旁边的 CH₃ 上换 Br", "只加一个 Br"],
        answer: 0,
        hint1: "条件仍然是普通 Br₂ 加成。",
        hint2: "把双键打开，两边各放一个 Br。",
        explanation: "对。底物换了，Br₂ 对双键的母型没有变。",
        whyNot: "旁边取代和单个 Br 都不是这里的主母型。"
      }
    ],
    "alkene.halohydrin": [
      {
        id: "repair-halohydrin-1",
        skill: "alkene.halohydrin",
        prompt: "2-甲基丙烯遇 Br₂/H₂O。OH 更偏向哪一端？",
        formula: "(CH₃)₂C=CH₂  +  Br₂ / H₂O",
        options: ["更取代的碳", "末端 CH₂", "两个位置完全没有偏好"],
        answer: 0,
        hint1: "先确认这是卤代醇条件。",
        hint2: "典型区域选择里，OH 更偏向较多取代碳。",
        explanation: "很好。你已经把 Br₂/H₂O 的产物类型和区域方向连起来了。",
        whyNot: "如果把 OH 放在末端，往往是把其它反应的区域规则混进来了。"
      }
    ],
    "alkene.condition_discrimination": [
      {
        id: "repair-condition-1",
        skill: "alkene.condition_discrimination",
        prompt: "只看条件：Br₂/CCl₄ 与 Br₂/H₂O，哪一组更应该让你想到产物里出现 OH？",
        formula: "Br₂/CCl₄   vs   Br₂/H₂O",
        options: ["Br₂/H₂O", "Br₂/CCl₄", "两者一样"],
        answer: 0,
        hint1: "OH 的来源在哪里？",
        hint2: "水不是背景，它会参与决定产物类型。",
        explanation: "对。真正的能力不是只认 Br₂，而是把完整条件一起读进去。",
        whyNot: "Br₂/CCl₄ 没有给出形成 OH 的水环境。"
      }
    ]
  }
};
