(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[7] = {
  "day": 7,
  "title": "醛酮：用一套“亲核加成母动作”串起整张网",
  "subtitle": "今天不背十个独立反应。先把 C=O 极化和“Nu 进 C、π 到 O”练成动作，再换 H⁻、CN⁻、RMgX、含氮亲核体。",
  "estimatedMinutes": 90,
  "objectives": [
    "识别羰基亲电中心",
    "掌握亲核加成电子移动",
    "会醛酮还原",
    "用 Grignard 做碳数审计",
    "认识氰醇/肟",
    "理解缩醛保护与 Wittig",
    "用 Tollens 作为醛证据"
  ],
  "lessons": [
    {
      "id": "d07-lesson-polarization",
      "eyebrow": "",
      "title": "C=O 像一条被氧“拽偏”的电子被子",
      "body": "氧电负性更强，把 C=O 的电子云拉向自己，所以氧带部分负电 δ−，羰基碳带部分正电 δ+。这一个极化图，几乎是后面所有醛酮亲核加成的起点。",
      "note": "不要先背“亲电体”三个字；先看到哪里缺电子，再给它正式名字。",
      "formulas": [
        "R₂C=O ↔ R₂Cδ+=Oδ−",
        "Nu:⁻ → Cδ+"
      ],
      "analogy": {
        "title": "像两个人盖一床被子，氧把被子拽走更多",
        "body": "碳这一侧“露出来”更多，就更容易接受别人的电子对。",
        "boundary": "δ+ 不是完整 +1 电荷，只是极化导致的部分正电。"
      },
      "visual": {
        "left": "C=O",
        "arrow": "O 拉电子",
        "right": "Cδ+—Oδ−",
        "caption": "先看极化，再找进攻点"
      },
      "lookQuestions": [
        "谁更缺电子？",
        "亲核体的电子应该送给谁？"
      ]
    },
    {
      "id": "d07-lesson-addition",
      "eyebrow": "",
      "title": "羰基亲核加成的母动作：Nu 进 C，π 电子上 O",
      "body": "无论是 H⁻、CN⁻ 还是 RMgX 的碳负性片段，第一步都可以用同一幅图理解：亲核体把电子送给羰基碳，同时 C=O π 电子移到 O，形成四面体中间体；随后 O⁻ 被质子化。",
      "note": "先学母动作，再学每一种 Nu 的特殊结果。",
      "formulas": [
        "Nu⁻ + R₂C=O → R₂C(O⁻)(Nu) →[H⁺] R₂C(OH)(Nu)"
      ],
      "analogy": {
        "title": "像把一张平桌压成四面体小帐篷",
        "body": "羰基碳原本接近平面；亲核体加入后，碳变成四面体中心。",
        "boundary": "空间构型细节以后再用3D看；现在先抓键的变化。"
      }
    },
    {
      "id": "d07-lesson-reduction",
      "eyebrow": "",
      "title": "NaBH₄ / LiAlH₄：都在“给羰基一个 H⁻”，但力量不同",
      "body": "醛酮还原可理解为 H⁻ 加到羰基碳，O⁻ 后续质子化成 OH。NaBH₄ 较温和，常用于醛酮；LiAlH₄ 更强，也能还原酯、羧酸等更多官能团。",
      "note": "先判断底物类别，再选还原剂，不要看到“还原”就只背一个药名。",
      "formulas": [
        "RCHO → RCH₂OH",
        "R₂CO → R₂CHOH",
        "NaBH₄：常还原醛/酮；LiAlH₄：更强"
      ],
      "analogy": {
        "title": "像两把不同功率的电钻",
        "body": "NaBH₄ 足够钻开醛酮这类“较薄的墙”；LiAlH₄ 功率更大。",
        "boundary": "这是反应范围类比，不代表真实活化能只由“功率”决定。"
      }
    },
    {
      "id": "d07-lesson-grignard",
      "eyebrow": "",
      "title": "Grignard 是“带着一个碳来敲门”的亲核体",
      "body": "RMgX 中 C–Mg 键高度极化，R 端表现出碳负性。它进攻羰基碳时，会把 R 这整个碳片段接上去，所以最重要的是先做“碳数审计”。",
      "note": "Grignard 极怕水/醇/酸性 H；遇到这些会先被“淬灭”。",
      "formulas": [
        "RMgX ≈ R:⁻ + MgX⁺（反应性模型）",
        "R₂C=O + RMgX → R₂C(O⁻MgX)(R) →[H₃O⁺] 醇"
      ],
      "analogy": {
        "title": "像一个自带一节积木的连接器",
        "body": "每次 Grignard 加到羰基，R 那一块碳骨架真的并入目标。",
        "boundary": "RMgX 不是自由存在的裸 R⁻，只是便于预测反应的极化模型。"
      }
    },
    {
      "id": "d07-lesson-derivatives",
      "eyebrow": "",
      "title": "同一个羰基还能和 CN⁻、NH₂OH 等“换不同插件”",
      "body": "HCN/CN⁻ 给氰醇；羟胺 NH₂OH 可生成肟；肼类生成腙。这些反应都先利用羰基碳的亲电性，只是后续脱水/质子转移不同。",
      "note": "不要把每个名字当孤岛：先问“是不是亲核体进羰基”。",
      "formulas": [
        "R₂C=O + HCN ⇌ R₂C(OH)CN",
        "R₂C=O + NH₂OH → R₂C=NOH + H₂O"
      ],
      "analogy": {
        "title": "同一个USB接口，换不同插件",
        "body": "羰基碳是共同接口，CN⁻、含氮亲核体等只是不同插件。",
        "boundary": "不同反应的平衡、催化条件和后处理并不完全相同。"
      }
    },
    {
      "id": "d07-lesson-protection-wittig",
      "eyebrow": "",
      "title": "缩醛是“给羰基戴保护罩”，Wittig 是“把 C=O 换成 C=C”",
      "body": "羰基和醇在酸催化下可形成缩醛，常用于保护羰基；Wittig 试剂 Ph₃P=CHR 可把 C=O 变成 C=C。醛还可以被 Tollens 等选择性氧化为羧酸。",
      "note": "保护基不是“多此一举”，是为了让其它步骤先发生而羰基暂时别参与。",
      "formulas": [
        "R₂C=O + 2ROH ⇌[H⁺] R₂C(OR)₂ + H₂O",
        "R₂C=O + Ph₃P=CHR → R₂C=CHR + Ph₃P=O",
        "RCHO →[Tollens] RCO₂H"
      ],
      "analogy": {
        "title": "缩醛像给重要器件套防水壳",
        "body": "先把容易反应的 C=O 暂时封起来，路线做完后再解保护。",
        "boundary": "保护与脱保护都增加步骤，只有真正需要兼容性时才值得。"
      }
    }
  ],
  "questions": [
    {
      "id": "d07-electrophile-01",
      "day": 7,
      "type": "choice",
      "role": "learn",
      "primarySkill": "carbonyl.electrophilic_center",
      "skillIds": [
        "carbonyl.electrophilic_center"
      ],
      "difficulty": 2,
      "prompt": "在丙酮 (CH₃)₂C=O 中，CN⁻ 最优先攻击哪里？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "攻击羰基碳。",
        "why": "C=O 极化使碳带 δ+。",
        "full": "CN⁻ 的孤对电子送到羰基碳，C=O π 电子移到 O，形成四面体 O⁻ 中间体。"
      },
      "options": [
        {
          "id": "a",
          "label": "羰基碳"
        },
        {
          "id": "b",
          "label": "羰基氧"
        },
        {
          "id": "c",
          "label": "任意甲基碳"
        }
      ],
      "answer": "a",
      "formula": "(CH₃)₂Cδ+=Oδ−  + :CN⁻"
    },
    {
      "id": "d07-arrow-cn-01",
      "day": 7,
      "type": "electron-arrow",
      "role": "practice",
      "primarySkill": "mechanism.nucleophilic_attack",
      "skillIds": [
        "mechanism.nucleophilic_attack",
        "mechanism.electron_source",
        "carbonyl.nucleophilic_addition"
      ],
      "difficulty": 3,
      "prompt": "给 CN⁻ 对丙酮的第一步画两支双电子箭头。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "CN⁻→C，同时 π(C=O)→O。",
        "why": "这两支箭把平面羰基变成四面体 O⁻ 中间体。",
        "full": "箭尾都必须从已有电子出发：CN⁻ 孤对和 C=O π 键。"
      },
      "formula": ":CN⁻ + (CH₃)₂C=O → (CH₃)₂C(O⁻)(CN)",
      "baseSvg": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"电子箭头练习\"><text x=\"30\" y=\"42\" font-size=\"22\">:CN⁻ + (CH₃)₂C=O → (CH₃)₂C(O⁻)(CN)</text><circle cx=\"80\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"92\" y=\"136\" font-size=\"18\">CN⁻孤对</text><circle cx=\"310\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"322\" y=\"136\" font-size=\"18\">羰基C</text><circle cx=\"390\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"402\" y=\"136\" font-size=\"18\">C=O π键</text><circle cx=\"505\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"517\" y=\"136\" font-size=\"18\">O</text></svg>",
      "hotspots": [
        {
          "id": "cn",
          "x": 80,
          "y": 130,
          "role": "source",
          "label": "CN⁻孤对"
        },
        {
          "id": "c",
          "x": 310,
          "y": 130,
          "role": "target",
          "label": "羰基C"
        },
        {
          "id": "pi",
          "x": 390,
          "y": 130,
          "role": "source",
          "label": "C=O π键"
        },
        {
          "id": "o",
          "x": 505,
          "y": 130,
          "role": "target",
          "label": "O"
        }
      ],
      "expectedArrows": [
        {
          "source": "cn",
          "target": "c",
          "arrowType": "pair",
          "sequence": 1
        },
        {
          "source": "pi",
          "target": "o",
          "arrowType": "pair",
          "sequence": 1
        }
      ],
      "answer": [
        {
          "source": "cn",
          "target": "c",
          "arrowType": "pair",
          "sequence": 1
        },
        {
          "source": "pi",
          "target": "o",
          "arrowType": "pair",
          "sequence": 1
        }
      ]
    },
    {
      "id": "d07-nabh4-01",
      "day": 7,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.reduction",
      "skillIds": [
        "carbonyl.reduction"
      ],
      "difficulty": 2,
      "prompt": "苯甲醛 PhCHO 用 NaBH₄ 还原，主产物？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到苄醇。",
        "why": "醛羰基被还原到一级醇。",
        "full": "NaBH₄ 提供氢负性氢加到羰基碳，氧随后质子化。"
      },
      "options": [
        {
          "id": "a",
          "label": "苄醇 PhCH₂OH"
        },
        {
          "id": "b",
          "label": "苯甲酸 PhCO₂H"
        },
        {
          "id": "c",
          "label": "甲苯 PhCH₃"
        }
      ],
      "answer": "a",
      "formula": "PhCHO →[NaBH₄] PhCH₂OH"
    },
    {
      "id": "d07-ketone-reduction-01",
      "day": 7,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.reduction",
      "skillIds": [
        "carbonyl.reduction"
      ],
      "difficulty": 2,
      "prompt": "环己酮用 NaBH₄ 还原，产物类型？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到环己醇。",
        "why": "酮还原为二级醇。",
        "full": "羰基碳原本连两个碳，加入 H 后变成 R₂CHOH。"
      },
      "options": [
        {
          "id": "a",
          "label": "二级醇环己醇"
        },
        {
          "id": "b",
          "label": "一级醇"
        },
        {
          "id": "c",
          "label": "羧酸"
        }
      ],
      "answer": "a",
      "formula": "cyclohexanone → cyclohexanol"
    },
    {
      "id": "d07-carbonyl-react-rank-01",
      "day": 7,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "ranking.reactivity",
      "skillIds": [
        "ranking.reactivity",
        "carbonyl.electrophilic_center"
      ],
      "difficulty": 2,
      "prompt": "在相似取代基下，按典型亲核加成反应性由高到低排。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "甲醛 > 一般醛 > 一般酮。",
        "why": "电子效应与位阻都让酮羰基更不易被亲核体攻击。",
        "full": "甲醛最少烷基、位阻最小；酮有两个烷基供电子并增加位阻。"
      },
      "items": [
        {
          "id": "f",
          "label": "甲醛 HCHO"
        },
        {
          "id": "a",
          "label": "一般醛 RCHO"
        },
        {
          "id": "k",
          "label": "一般酮 R₂CO"
        }
      ],
      "correctOrder": [
        "f",
        "a",
        "k"
      ],
      "answer": [
        "f",
        "a",
        "k"
      ]
    },
    {
      "id": "d07-grignard-formal-01",
      "day": 7,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.grignard",
      "skillIds": [
        "carbonyl.grignard",
        "synthesis.carbon_count"
      ],
      "difficulty": 2,
      "prompt": "CH₃MgBr 与甲醛 HCHO 反应，酸化后得到哪类醇？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到乙醇，一级醇。",
        "why": "甲醛 + 一个 R 片段后，羟基碳只连一个碳。",
        "full": "HCHO + CH₃MgBr → CH₃CH₂OMgBr →[H₃O⁺] CH₃CH₂OH。"
      },
      "options": [
        {
          "id": "a",
          "label": "一级醇乙醇"
        },
        {
          "id": "b",
          "label": "二级醇"
        },
        {
          "id": "c",
          "label": "三级醇"
        }
      ],
      "answer": "a",
      "formula": "HCHO + CH₃MgBr →[H₃O⁺] CH₃CH₂OH"
    },
    {
      "id": "d07-grignard-aldehyde-01",
      "day": 7,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.grignard",
      "skillIds": [
        "carbonyl.grignard"
      ],
      "difficulty": 2,
      "prompt": "乙醛 CH₃CHO + CH₃MgBr，酸化后得到？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到 2-丙醇。",
        "why": "醛（非甲醛）+ Grignard 通常给二级醇。",
        "full": "碳数 2 + 1 = 3；羟基碳连两个碳，因此是二级醇。"
      },
      "options": [
        {
          "id": "a",
          "label": "2-丙醇"
        },
        {
          "id": "b",
          "label": "1-丙醇"
        },
        {
          "id": "c",
          "label": "叔丁醇"
        }
      ],
      "answer": "a",
      "formula": "CH₃CHO + CH₃MgBr →[H₃O⁺] (CH₃)₂CHOH"
    },
    {
      "id": "d07-grignard-ketone-01",
      "day": 7,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.grignard",
      "skillIds": [
        "carbonyl.grignard"
      ],
      "difficulty": 2,
      "prompt": "丙酮 + CH₃MgBr，酸化后得到？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到叔丁醇。",
        "why": "酮羰基碳原本连两个碳，再接一个 CH₃ 后成为三级醇中心。",
        "full": "(CH₃)₂CO + CH₃MgBr → (CH₃)₃COH。"
      },
      "options": [
        {
          "id": "a",
          "label": "叔丁醇"
        },
        {
          "id": "b",
          "label": "2-丙醇"
        },
        {
          "id": "c",
          "label": "1-丁醇"
        }
      ],
      "answer": "a",
      "formula": "(CH₃)₂CO + CH₃MgBr →[H₃O⁺] (CH₃)₃COH"
    },
    {
      "id": "d07-grignard-water-01",
      "day": 7,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.grignard",
      "skillIds": [
        "carbonyl.grignard"
      ],
      "difficulty": 2,
      "prompt": "为什么做 Grignard 反应要尽量无水？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "水会把 Grignard 试剂直接淬灭。",
        "why": "RMgX 的碳端碱性很强，遇到 H₂O 先夺 H。",
        "full": "RMgX + H₂O → RH + Mg(OH)X；试剂被消耗就无法再给羰基加碳。"
      },
      "options": [
        {
          "id": "a",
          "label": "RMgX 会先被水质子化成 RH"
        },
        {
          "id": "b",
          "label": "水会把羰基变得更亲电所以必须大量加"
        },
        {
          "id": "c",
          "label": "水只是颜色不好看"
        }
      ],
      "answer": "a",
      "formula": "RMgX + H₂O → RH + Mg(OH)X"
    },
    {
      "id": "d07-cyanohydrin-01",
      "day": 7,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.cyanohydrin",
      "skillIds": [
        "carbonyl.cyanohydrin"
      ],
      "difficulty": 2,
      "prompt": "丙酮与 HCN/CN⁻ 反应，产品最核心的新键是什么？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "形成羰基碳—CN 的 C–C 键。",
        "why": "CN⁻ 的碳端进攻羰基碳。",
        "full": "产物是氰醇 (CH₃)₂C(OH)CN，同时具有 OH 与 CN。"
      },
      "options": [
        {
          "id": "a",
          "label": "羰基碳—CN 的 C–C 键"
        },
        {
          "id": "b",
          "label": "O—CN 键"
        },
        {
          "id": "c",
          "label": "两个甲基之间新键"
        }
      ],
      "answer": "a",
      "formula": "(CH₃)₂CO + HCN → (CH₃)₂C(OH)CN"
    },
    {
      "id": "d07-oxime-01",
      "day": 7,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.n_derivatives",
      "skillIds": [
        "carbonyl.n_derivatives"
      ],
      "difficulty": 2,
      "prompt": "环己酮 + NH₂OH 通常生成哪类衍生物？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "生成肟。",
        "why": "羟胺对羰基加成后脱水形成 C=N–OH。",
        "full": "这是羰基含氮衍生物的一种，常用于鉴别/衍生化。"
      },
      "options": [
        {
          "id": "a",
          "label": "肟 C=N–OH"
        },
        {
          "id": "b",
          "label": "缩醛"
        },
        {
          "id": "c",
          "label": "羧酸"
        }
      ],
      "answer": "a",
      "formula": "C=O + NH₂OH → C=N–OH + H₂O"
    },
    {
      "id": "d07-acetal-01",
      "day": 7,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.acetal",
      "skillIds": [
        "carbonyl.acetal",
        "synthesis.compatibility"
      ],
      "difficulty": 2,
      "prompt": "要暂时“保护”一个醛羰基，使它不被后续某些亲核试剂攻击，常用什么思路？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "形成缩醛保护。",
        "why": "缩醛对很多碱性/亲核条件较稳定，之后可酸水解恢复羰基。",
        "full": "保护基的意义是暂时改变官能团反应性，解决多步合成兼容性。"
      },
      "options": [
        {
          "id": "a",
          "label": "与二醇/醇酸催化形成缩醛"
        },
        {
          "id": "b",
          "label": "先氧化成酸"
        },
        {
          "id": "c",
          "label": "直接加水"
        }
      ],
      "answer": "a",
      "formula": "RCHO + 2ROH ⇌[H⁺] RCH(OR)₂ + H₂O"
    },
    {
      "id": "d07-wittig-01",
      "day": 7,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.wittig",
      "skillIds": [
        "carbonyl.wittig"
      ],
      "difficulty": 2,
      "prompt": "丙酮与 Ph₃P=CH₂ 发生 Wittig，C=O 最终变成什么？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "C=O 被换成 C=C。",
        "why": "Wittig 把羰基氧移走并引入 ylide 的碳片段。",
        "full": "(CH₃)₂CO + Ph₃P=CH₂ → (CH₃)₂C=CH₂ + Ph₃P=O。"
      },
      "options": [
        {
          "id": "a",
          "label": "C=C，得到 2-甲基丙烯"
        },
        {
          "id": "b",
          "label": "C–OH，得到醇"
        },
        {
          "id": "c",
          "label": "CO₂H"
        }
      ],
      "answer": "a",
      "formula": "(CH₃)₂CO + Ph₃P=CH₂ → (CH₃)₂C=CH₂ + Ph₃P=O"
    },
    {
      "id": "d07-tollens-01",
      "day": 7,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.aldehyde_oxidation",
      "skillIds": [
        "carbonyl.aldehyde_oxidation",
        "structure.chemical_tests"
      ],
      "difficulty": 2,
      "prompt": "Tollens 试剂常用于区分一般醛与酮，因为醛可被氧化成什么？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "醛被氧化到羧酸（碱性介质中先为羧酸盐）。",
        "why": "醛有可继续氧化的醛氢。",
        "full": "银镜反应既是反应题，也是结构推断里的硬证据。"
      },
      "options": [
        {
          "id": "a",
          "label": "羧酸/羧酸盐"
        },
        {
          "id": "b",
          "label": "醇"
        },
        {
          "id": "c",
          "label": "烯烃"
        }
      ],
      "answer": "a",
      "formula": "RCHO →[Tollens] RCO₂⁻ / RCO₂H"
    }
  ],
  "repairs": {
    "carbonyl.grignard": [
      {
        "id": "d07-repair-grig-01",
        "day": 7,
        "type": "choice",
        "role": "repair",
        "primarySkill": "carbonyl.grignard",
        "skillIds": [
          "carbonyl.grignard"
        ],
        "difficulty": 2,
        "prompt": "HCHO + C₂H₅MgBr 酸化后，产物碳数多少？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "3 个碳。",
          "why": "甲醛1C + 乙基2C = 3C。",
          "full": "得到1-丙醇。"
        },
        "options": [
          {
            "id": "a",
            "label": "3"
          },
          {
            "id": "b",
            "label": "2"
          },
          {
            "id": "c",
            "label": "4"
          }
        ],
        "answer": "a"
      }
    ],
    "carbonyl.electrophilic_center": [
      {
        "id": "d07-repair-electro-01",
        "day": 7,
        "type": "choice",
        "role": "repair",
        "primarySkill": "carbonyl.electrophilic_center",
        "skillIds": [
          "carbonyl.electrophilic_center"
        ],
        "difficulty": 2,
        "prompt": "C=O 中更缺电子的是？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "羰基碳更缺电子。",
          "why": "O 拉电子使 C 带 δ+。",
          "full": "亲核体因此攻 C。"
        },
        "options": [
          {
            "id": "a",
            "label": "C"
          },
          {
            "id": "b",
            "label": "O"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "C=O 极化：Cδ+、Oδ−",
    "Nu⁻→C；π(C=O)→O",
    "醛→1°醇；酮→2°醇（还原）",
    "HCHO+RMgX→1°醇；RCHO→2°醇；R₂CO→3°醇",
    "缩醛=保护；Wittig：C=O→C=C",
    "Tollens：醛阳性"
  ]
};
})();
