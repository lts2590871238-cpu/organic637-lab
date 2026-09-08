(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[10] = {
  "day": 10,
  "title": "同一个 enolate，换不同对手：Claisen / Michael / β-二羰基",
  "subtitle": "今天所有新名字都用一个问题拆：谁是 enolate？它攻击谁？再把乙酰乙酸酯、丙二酸酯当作“可拆卸脚手架”做合成。",
  "estimatedMinutes": 90,
  "objectives": [
    "区分 Aldol/Claisen/Michael",
    "掌握 β-二羰基酸性",
    "会乙酰乙酸酯与丙二酸酯合成",
    "知道烷基化受 SN2 限制",
    "理解脱羧",
    "认识 Dieckmann"
  ],
  "lessons": [
    {
      "id": "d10-lesson-map",
      "eyebrow": "",
      "title": "今天不是五个新反应，而是“同一个 enolate 换五种对手”",
      "body": "Day9 已经会 enolate。今天每遇到新反应，先问两句：亲核体还是哪个 enolate？它攻击的是醛酮、酯、还是 α,β-不饱和羰基？一旦把“攻击谁”看清，名字就只是标签。",
      "note": "永远先画 donor → acceptor 箭头，再记人名。",
      "formulas": [
        "Aldol：enolate → 醛/酮 C=O",
        "Claisen：enolate → 酯 C=O",
        "Michael：enolate → α,β-不饱和羰基 β-C"
      ],
      "analogy": {
        "title": "像同一个前锋面对不同球门",
        "body": "前锋（enolate）不变，球门位置不同，比赛名字就不同。",
        "boundary": "不同反应的平衡和后处理仍需分别掌握。"
      }
    },
    {
      "id": "d10-lesson-claisen",
      "eyebrow": "",
      "title": "Claisen：对酯做亲核酰基取代，最后得到 β-二羰基",
      "body": "酯 enolate 攻击另一分子酯羰基，形成四面体中间体，再排出 OR⁻。产物通常是 β-酮酯。常用与酯中 OR 相同的烷氧基碱，减少酯交换。",
      "note": "产物仍带一个酯羰基，不是普通 Aldol 的 β-OH。",
      "formulas": [
        "2 CH₃CO₂Et →[EtO⁻/EtOH] CH₃COCH₂CO₂Et（乙酰乙酸乙酯）"
      ],
      "analogy": {
        "title": "像先挤进酯的房间，再把原来的 OR 门卫推出去",
        "body": "Claisen 本质上是 enolate + 亲核酰基取代。",
        "boundary": "底物一般需要适当 α-H，具体驱动力还包括产物再去质子化。"
      }
    },
    {
      "id": "d10-lesson-michael",
      "eyebrow": "",
      "title": "Michael：不要扑向 C=O 本身，先看共轭体系的 β-碳",
      "body": "α,β-不饱和羰基里，电子缺陷可以通过共轭传到 β-C。软一些的碳亲核体如稳定 enolate 常做 1,4-加成，最终羰基保留而 β 位多出一个 C–C 键。",
      "note": "区分 1,2 加成（攻羰基 C）和 1,4/Michael（攻 β-C）。",
      "formulas": [
        "Nu⁻ + CH₂=CH–C(=O)R → Nu–CH₂–CH₂–C(=O)R"
      ],
      "analogy": {
        "title": "像不从正门撞进去，而是从侧门 β 位切入",
        "body": "共轭把“缺电子”传到远一格的 β-C。",
        "boundary": "亲核体硬软、底物与条件会影响 1,2/1,4 选择。"
      }
    },
    {
      "id": "d10-lesson-beta-dicarbonyl",
      "eyebrow": "",
      "title": "β-二羰基中央 CH₂ 像被两块“吸电子磁铁”夹着",
      "body": "中央 H 去掉后，负电荷可与两侧两个羰基共同共振，因此酸性明显增强，常能被较温和碱形成 enolate。",
      "note": "这就是乙酰乙酸乙酯/丙二酸酯合成好用的根。",
      "formulas": [
        "RCO–CH₂–COR′：中央 CH₂ 活泼",
        "pKa：β-二羰基常约 9–13（视结构）"
      ],
      "analogy": {
        "title": "两边各有一块磁铁帮忙“摊开”负电",
        "body": "负电荷可在更大的共轭系统里分散，所以中间 H 更容易被拿走。",
        "boundary": "具体 pKa 随酯/酮组合而变。"
      }
    },
    {
      "id": "d10-lesson-acetoacetic",
      "eyebrow": "",
      "title": "乙酰乙酸乙酯合成：去 H → SN2 烷基化 → 水解 → 脱羧",
      "body": "乙酰乙酸乙酯的中央 CH₂ 可生成 enolate，和一级卤代烃 SN2 增碳；随后酸性水解把酯变成 β-酮酸，加热脱 CO₂，得到取代甲基酮。",
      "note": "RX 仍要遵守 SN2：甲基/一级最稳。",
      "formulas": [
        "CH₃COCH₂CO₂Et →[1) EtO⁻ 2) R–X 3) H₃O⁺, Δ] CH₃COCH₂R"
      ],
      "analogy": {
        "title": "像临时装一个“可拆卸把手”帮你接碳，最后把把手 CO₂ 拆掉",
        "body": "酯基先帮中央碳变活泼，完成烷基化后再水解脱羧。",
        "boundary": "多次烷基化与支化底物会增加副反应。"
      }
    },
    {
      "id": "d10-lesson-malonic",
      "eyebrow": "",
      "title": "丙二酸酯合成：同样四步，但最后得到取代乙酸",
      "body": "丙二酸二乙酯中央 CH₂ 烷基化后，水解得到二羧酸，加热脱一个 CO₂，最终是 RCH₂CO₂H 型取代乙酸。",
      "note": "一看到目标是“取代乙酸”，就要想是否能用 malonic ester。",
      "formulas": [
        "EtO₂CCH₂CO₂Et →[1) EtO⁻ 2) R–X 3) H₃O⁺, Δ] RCH₂CO₂H"
      ],
      "analogy": {
        "title": "同一套脚手架，最后留下的房间不同",
        "body": "乙酰乙酸路线留下酮；丙二酸路线留下羧酸。",
        "boundary": "目标碳骨架和取代位置决定是否合适。"
      }
    },
    {
      "id": "d10-lesson-dieckmann",
      "eyebrow": "",
      "title": "Dieckmann：把 Claisen 的两端绑在同一个分子里，就能闭环",
      "body": "含两个酯基的同一分子，在合适链长下，enolate 端攻击另一端酯羰基，发生分子内 Claisen，得到环状 β-酮酯。",
      "note": "先看能否形成 5/6 元环，这些通常更有利。",
      "formulas": [
        "二酯 →[RO⁻] 环状 β-酮酯"
      ],
      "analogy": {
        "title": "像一条绳子的两端终于扣在一起",
        "body": "分子内反应把 Claisen 从“两个人握手”变成“自己扣成环”。",
        "boundary": "环大小与构象会显著影响是否容易发生。"
      }
    }
  ],
  "questions": [
    {
      "id": "d10-claisen-vs-aldol-01",
      "day": 10,
      "type": "choice",
      "role": "learn",
      "primarySkill": "enolate.claisen",
      "skillIds": [
        "enolate.claisen"
      ],
      "difficulty": 2,
      "prompt": "下列哪一句最能区分 Claisen 与 Aldol？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "Claisen = enolate 攻酯并发生酰基取代。",
        "why": "酯羰基旁有 OR 可离去，所以四面体中间体会塌回 C=O。",
        "full": "两者都建 C–C，但受体和后续命运不同。"
      },
      "options": [
        {
          "id": "a",
          "label": "Claisen 的亲电受体是酯并发生 OR⁻ 离去；Aldol 通常是醛/酮加成"
        },
        {
          "id": "b",
          "label": "Claisen 完全没有 enolate"
        },
        {
          "id": "c",
          "label": "Aldol 一定不形成 C–C"
        }
      ],
      "answer": "a",
      "formula": "enolate + ester → β-keto ester"
    },
    {
      "id": "d10-claisen-product-01",
      "day": 10,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.claisen",
      "skillIds": [
        "enolate.claisen"
      ],
      "difficulty": 2,
      "prompt": "乙酸乙酯自 Claisen 的典型产物是哪类？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "β-酮酯。",
        "why": "酯 enolate 攻酯，发生加成-消除。",
        "full": "2 CH₃CO₂Et → CH₃COCH₂CO₂Et。"
      },
      "options": [
        {
          "id": "a",
          "label": "β-酮酯乙酰乙酸乙酯"
        },
        {
          "id": "b",
          "label": "β-羟基醛"
        },
        {
          "id": "c",
          "label": "二醇"
        }
      ],
      "answer": "a",
      "formula": "2 CH₃CO₂Et →[EtONa/EtOH] CH₃COCH₂CO₂Et"
    },
    {
      "id": "d10-base-match-01",
      "day": 10,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.claisen",
      "skillIds": [
        "enolate.claisen"
      ],
      "difficulty": 2,
      "prompt": "乙酸乙酯做 Claisen 时为什么常用 EtONa/EtOH 而不是随便换成 MeONa/MeOH？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "匹配烷氧基更干净。",
        "why": "外来烷氧基可与酯发生酯交换。",
        "full": "这是条件细节，但对合成与实验题很实用。"
      },
      "options": [
        {
          "id": "a",
          "label": "匹配烷氧基可减少酯交换带来的混杂"
        },
        {
          "id": "b",
          "label": "EtONa 不是碱"
        },
        {
          "id": "c",
          "label": "MeONa 没有孤对电子"
        }
      ],
      "answer": "a",
      "formula": "Et ester + EtO⁻：matching alkoxide"
    },
    {
      "id": "d10-michael-site-01",
      "day": 10,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.michael",
      "skillIds": [
        "enolate.michael"
      ],
      "difficulty": 2,
      "prompt": "稳定 enolate 对 CH₂=CH–COCH₃ 做 Michael 加成，主要攻击哪个位置？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "攻击 β-C。",
        "why": "共轭体系使 β-C 具有亲电性，形成 1,4-加成。",
        "full": "加成后重新形成羰基，最终 C=O 保留。"
      },
      "options": [
        {
          "id": "a",
          "label": "β-碳（末端 CH₂）"
        },
        {
          "id": "b",
          "label": "羰基 O"
        },
        {
          "id": "c",
          "label": "只攻击甲基"
        }
      ],
      "answer": "a",
      "formula": "Nu⁻ + CH₂=CH–COCH₃ → Nu–CH₂–CH₂–COCH₃"
    },
    {
      "id": "d10-12-vs-14-01",
      "day": 10,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.michael",
      "skillIds": [
        "enolate.michael"
      ],
      "difficulty": 2,
      "prompt": "“1,2 加成”与“1,4 加成”最核心区别是什么？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "进攻位置不同。",
        "why": "编号描述从羰基 O/C 到共轭 β-C 的位置关系。",
        "full": "Day7 的 Grignard 常先学 1,2；稳定 enolate 对 enone 常做 Michael 1,4。"
      },
      "options": [
        {
          "id": "a",
          "label": "1,2 攻羰基 C；1,4 攻共轭 β-C"
        },
        {
          "id": "b",
          "label": "1,2 有两个碳，1,4 有四个碳"
        },
        {
          "id": "c",
          "label": "1,4 一定没有亲核体"
        }
      ],
      "answer": "a",
      "formula": "1,2: Nu→C=O carbon；1,4: Nu→β-C"
    },
    {
      "id": "d10-acidity-rank-01",
      "day": 10,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "enolate.beta_dicarbonyl",
      "skillIds": [
        "enolate.beta_dicarbonyl",
        "ranking.acidity"
      ],
      "difficulty": 2,
      "prompt": "按中央/α-H 酸性由强到弱排。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "β-二羰基中央 H > 酮 α-H >> 烷烃。",
        "why": "两侧羰基让负电荷离域范围更大。",
        "full": "因此丙二酸酯等能用较温和的 matching alkoxide 生成 enolate。"
      },
      "items": [
        {
          "id": "mal",
          "label": "丙二酸二乙酯中央 CH₂"
        },
        {
          "id": "ket",
          "label": "丙酮 α-H"
        },
        {
          "id": "alk",
          "label": "丙烷 C–H"
        }
      ],
      "correctOrder": [
        "mal",
        "ket",
        "alk"
      ],
      "answer": [
        "mal",
        "ket",
        "alk"
      ]
    },
    {
      "id": "d10-acetoacetic-01",
      "day": 10,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.acetoacetic",
      "skillIds": [
        "enolate.acetoacetic",
        "synthesis.carbon_count"
      ],
      "difficulty": 2,
      "prompt": "乙酰乙酸乙酯经 NaOEt、CH₃I、酸水解/加热后，最终典型产物是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到取代甲基酮 2-丁酮。",
        "why": "中央碳先甲基化，水解脱羧后保留 CH₃CO–CH₂R。",
        "full": "R=CH₃，因此 CH₃COCH₂CH₃。"
      },
      "options": [
        {
          "id": "a",
          "label": "2-丁酮 CH₃COCH₂CH₃"
        },
        {
          "id": "b",
          "label": "丁酸"
        },
        {
          "id": "c",
          "label": "乙酸"
        }
      ],
      "answer": "a",
      "formula": "CH₃COCH₂CO₂Et →[MeI; hydrolysis, Δ] CH₃COCH₂CH₃"
    },
    {
      "id": "d10-malonic-01",
      "day": 10,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.malonic",
      "skillIds": [
        "enolate.malonic"
      ],
      "difficulty": 2,
      "prompt": "丙二酸二乙酯经 NaOEt、CH₃CH₂Br、酸水解/加热后，典型产物？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到丁酸。",
        "why": "malonic ester synthesis 最终给 RCH₂CO₂H；R=Et。",
        "full": "EtCH₂CO₂H 就是丁酸。"
      },
      "options": [
        {
          "id": "a",
          "label": "丁酸 CH₃CH₂CH₂CO₂H"
        },
        {
          "id": "b",
          "label": "2-丁酮"
        },
        {
          "id": "c",
          "label": "丙酸"
        }
      ],
      "answer": "a",
      "formula": "EtO₂CCH₂CO₂Et →[EtBr; hydrolysis,Δ] CH₃CH₂CH₂CO₂H"
    },
    {
      "id": "d10-sn2-limit-01",
      "day": 10,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.acetoacetic",
      "skillIds": [
        "enolate.acetoacetic"
      ],
      "difficulty": 2,
      "prompt": "乙酰乙酸酯 enolate 烷基化时，哪类卤代烃最可靠？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "甲基/一级最可靠。",
        "why": "这一步本质仍是 SN2。",
        "full": "三级底物会 E2，乙烯基/芳基 sp²-C 不走普通 SN2。"
      },
      "options": [
        {
          "id": "a",
          "label": "甲基/一级卤代烃"
        },
        {
          "id": "b",
          "label": "三级卤代烃"
        },
        {
          "id": "c",
          "label": "乙烯基卤代烃"
        }
      ],
      "answer": "a",
      "formula": "enolate + 1° R–X → alkylation"
    },
    {
      "id": "d10-decarb-01",
      "day": 10,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.decarboxylation",
      "skillIds": [
        "enolate.decarboxylation"
      ],
      "difficulty": 2,
      "prompt": "β-酮酸加热容易脱羧的直觉理由是什么？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "β-酮酸有特别有利的脱羧路径。",
        "why": "羰基帮助形成环状过渡态，CO₂ 离去后生成 enol 再互变。",
        "full": "不是任何普通羧酸都同样容易脱羧。"
      },
      "options": [
        {
          "id": "a",
          "label": "可经有利的六元环式过渡并生成稳定 enol/羰基"
        },
        {
          "id": "b",
          "label": "所有羧酸加热都一样立刻脱羧"
        },
        {
          "id": "c",
          "label": "因为 CO₂ 是强碱"
        }
      ],
      "answer": "a",
      "formula": "β-keto acid →[Δ] ketone + CO₂"
    },
    {
      "id": "d10-dieckmann-01",
      "day": 10,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.dieckmann",
      "skillIds": [
        "enolate.dieckmann"
      ],
      "difficulty": 2,
      "prompt": "Dieckmann 缩合本质上是哪一类反应的分子内版本？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "分子内 Claisen。",
        "why": "二酯的一端 enolate 攻另一端酯羰基。",
        "full": "常用来构建 5/6 元环 β-酮酯。"
      },
      "options": [
        {
          "id": "a",
          "label": "Claisen 缩合"
        },
        {
          "id": "b",
          "label": "Aldol 水合"
        },
        {
          "id": "c",
          "label": "SN1"
        }
      ],
      "answer": "a",
      "formula": "diester → cyclic β-keto ester"
    },
    {
      "id": "d10-route-malonic-01",
      "day": 10,
      "type": "route",
      "role": "transfer",
      "primarySkill": "enolate.malonic",
      "skillIds": [
        "enolate.malonic",
        "synthesis.route_evaluation"
      ],
      "difficulty": 3,
      "prompt": "想从丙二酸二乙酯制备丁酸，按顺序走正确路线。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "三步功能清楚：生成 enolate、SN2 接碳、水解脱羧。",
        "why": "每一步都可以用之前学过的技能解释。",
        "full": "这就是“螺旋学习”：Day5 的 SN2 限制会回来约束 Day10 的烷基化。"
      },
      "graph": {
        "start": "mal",
        "target": "butacid",
        "nodes": [
          {
            "id": "mal",
            "label": "丙二酸二乙酯",
            "structure": "EtO₂CCH₂CO₂Et"
          },
          {
            "id": "enolate",
            "label": "丙二酸酯 enolate",
            "structure": "EtO₂CCH⁻CO₂Et"
          },
          {
            "id": "alkyl",
            "label": "乙基化产物",
            "structure": "EtO₂CCH(Et)CO₂Et"
          },
          {
            "id": "butacid",
            "label": "丁酸",
            "structure": "CH₃CH₂CH₂CO₂H"
          },
          {
            "id": "e2",
            "label": "消除副反应",
            "structure": "alkene"
          }
        ],
        "edges": [
          {
            "id": "base",
            "from": "mal",
            "to": "enolate",
            "choice": "EtONa/EtOH 去质子化",
            "reagent": "EtONa",
            "status": "green",
            "reason": "中央 CH₂ 较酸。"
          },
          {
            "id": "ethyl",
            "from": "enolate",
            "to": "alkyl",
            "choice": "CH₃CH₂Br 烷基化",
            "reagent": "EtBr",
            "status": "green",
            "reason": "一级卤代烃 SN2。"
          },
          {
            "id": "hydro",
            "from": "alkyl",
            "to": "butacid",
            "choice": "酸水解、加热脱羧",
            "reagent": "H₃O⁺, Δ",
            "status": "green",
            "reason": "转为取代乙酸。"
          },
          {
            "id": "tert",
            "from": "enolate",
            "to": "e2",
            "choice": "改用 t-BuBr",
            "reagent": "t-BuBr",
            "status": "red",
            "reason": "三级底物主要 E2。"
          }
        ],
        "referenceRoutes": [
          [
            "base",
            "ethyl",
            "hydro"
          ]
        ]
      },
      "answer": {
        "acceptedPaths": [
          [
            "base",
            "ethyl",
            "hydro"
          ]
        ],
        "preferredPath": [
          "base",
          "ethyl",
          "hydro"
        ]
      }
    }
  ],
  "repairs": {
    "enolate.michael": [
      {
        "id": "d10-repair-michael-01",
        "day": 10,
        "type": "choice",
        "role": "repair",
        "primarySkill": "enolate.michael",
        "skillIds": [
          "enolate.michael"
        ],
        "difficulty": 2,
        "prompt": "Michael 加成的亲核体主要攻 α,β-不饱和羰基的哪一位？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "β-C。",
          "why": "这是 1,4-加成。",
          "full": "最终羰基保留。"
        },
        "options": [
          {
            "id": "a",
            "label": "β-C"
          },
          {
            "id": "b",
            "label": "O"
          }
        ],
        "answer": "a"
      }
    ],
    "enolate.claisen": [
      {
        "id": "d10-repair-claisen-01",
        "day": 10,
        "type": "choice",
        "role": "repair",
        "primarySkill": "enolate.claisen",
        "skillIds": [
          "enolate.claisen"
        ],
        "difficulty": 2,
        "prompt": "Claisen 的亲电受体通常是哪类？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "酯羰基。",
          "why": "随后有 OR⁻ 离去。",
          "full": "产物常为 β-酮酯。"
        },
        "options": [
          {
            "id": "a",
            "label": "酯羰基"
          },
          {
            "id": "b",
            "label": "烷烃"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "Claisen：enolate→酯，得β-酮酯",
    "Michael：稳定Nu→α,β-不饱和羰基β-C（1,4）",
    "β-二羰基中央H更酸",
    "Acetoacetic route→取代甲基酮",
    "Malonic route→取代乙酸",
    "烷基化必须尊重SN2底物限制"
  ]
};
})();
