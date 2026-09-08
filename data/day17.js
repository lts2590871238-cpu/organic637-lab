(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[17] = {
  "day": 17,
  "title": "多步合成 I：从“找不同”开始的一至三步逆推",
  "subtitle": "今天不背标准路线。先做目标差异和碳数账本，再猜最后一步、切关键 C–C 键，最后正向验证。",
  "estimatedMinutes": 90,
  "objectives": [
    "比较起点/终点差异",
    "做碳数账本",
    "猜最后一步",
    "用已学成键反应做断键",
    "进行正向兼容性验证",
    "评价多条有效路线",
    "完成3座路线训练"
  ],
  "lessons": [
    {
      "id": "d17-lesson-difference",
      "eyebrow": "",
      "title": "合成第一步不是想试剂，而是“找不同”",
      "body": "把起点和目标并排，逐项圈：碳数变没变？新增/消失了什么官能团？多了哪根 C–C 键？氧化级别怎么变？先得到“差异清单”，再想反应。",
      "note": "如果还没说清“目标比起点多了什么”，现在想试剂通常是在猜。",
      "formulas": [
        "start → target：carbon count / functional groups / key bond / oxidation level"
      ],
      "analogy": {
        "title": "像玩找不同",
        "body": "先找出两张图到底哪里不一样，才知道需要哪种工具。",
        "boundary": "同一差异可能有多种路线，后面再比较。"
      }
    },
    {
      "id": "d17-lesson-carbonledger",
      "eyebrow": "",
      "title": "碳数账本是最便宜也最强的排错器",
      "body": "每一步写 C 数。CN⁻ +1；Grignard 加入 R 的碳数；炔负离子 + R–X 加入 R；Hofmann −1；氧化还原通常不改碳骨架。",
      "note": "先用碳数排掉不可能路线，再讨论试剂。",
      "formulas": [
        "R–X + CN⁻ → R–CN：+1C",
        "RMgX + carbonyl：+R carbons",
        "Hofmann amide → amine：−1C"
      ],
      "analogy": {
        "title": "像会计做账",
        "body": "账对不上，路线再漂亮也一定有问题。",
        "boundary": "裂解/脱羧等会丢碳，必须显式记账。"
      }
    },
    {
      "id": "d17-lesson-laststep",
      "eyebrow": "",
      "title": "逆合成最容易起步的方法：猜“最后一步”",
      "body": "看目标官能团，问它最自然由谁一步变来：醇可能来自羰基还原/Grignard/烯烃水合；酸可能来自腈水解/一级醇氧化；烯烃可能来自消除/Wittig/炔还原。",
      "note": "最后一步只是候选，必须正向验证条件与区域选择。",
      "formulas": [
        "target alcohol ⇐ carbonyl / alkene / epoxide routes",
        "target acid ⇐ nitrile / 1° alcohol / derivative hydrolysis"
      ],
      "analogy": {
        "title": "像从终点站往前查上一站",
        "body": "你不需要一次看完整条铁路，只先找“最后一站从哪来”。",
        "boundary": "多个上一站都可能，后面要比较效率和兼容性。"
      }
    },
    {
      "id": "d17-lesson-disconnection",
      "eyebrow": "",
      "title": "关键断键：优先切那些你已经有“可靠成键反应”能重新接上的键",
      "body": "常见 C–C 成键工具：炔负离子 SN2、Grignard+羰基、enolate 烷基化/Aldol/Claisen/Michael、Friedel–Crafts。断键后若一边能对应这些亲核片段，路线更有希望。",
      "note": "不是任何 C–C 都值得切；要切在“能重新接”的地方。",
      "formulas": [
        "C–C disconnection ⇐ RMgX + C=O",
        "⇐ acetylide + 1° RX",
        "⇐ enolate + electrophile"
      ],
      "analogy": {
        "title": "像拆桥要选你有现成施工队能重建的那一跨",
        "body": "如果你没有对应成键反应，切得再对称也没有用。",
        "boundary": "真实逆合成还会考虑保护、选择性和商业可得性。"
      }
    },
    {
      "id": "d17-lesson-forwardcheck",
      "eyebrow": "",
      "title": "逆推完必须正向走一遍做三次安检",
      "body": "①每一步试剂能否对这个底物发生；②有没有更强竞争反应；③生成的中间体能否撑过下一步。逆推只是猜路线，正向验证才是化学。",
      "note": "这是防止“纸上看起来能连，实际条件互相打架”的关键。",
      "formulas": [
        "retrosynthesis proposal → forward validation → accepted route"
      ],
      "analogy": {
        "title": "像地图规划后必须真的模拟开车一遍",
        "body": "有的路地图上连着，但施工、限高、单行道会让你过不去。",
        "boundary": "考试中不要求工程收率，但必须守基本反应兼容性。"
      }
    },
    {
      "id": "d17-lesson-score",
      "eyebrow": "",
      "title": "路线评价不只看“和答案一样”",
      "body": "网站按四项：化学可行性 50%、效率 20%、选择性 15%、兼容性 15%。一条 5 步可行路线可以是黄色；3 步高选择性路线可能更优。",
      "note": "非标准但正确路线不应该被红叉。",
      "formulas": [
        "route score = validity 50% + efficiency 20% + selectivity 15% + compatibility 15%"
      ],
      "analogy": {
        "title": "像导航不只问“能不能到”，还比较路程、堵车和限行",
        "body": "目的地到达只是第一层。",
        "boundary": "考试标准答案仍可能偏好特定经典路线，但化学有效性必须先尊重。"
      }
    }
  ],
  "questions": [
    {
      "id": "d17-diff-01",
      "day": 17,
      "type": "choice",
      "role": "learn",
      "primarySkill": "synthesis.target_difference",
      "skillIds": [
        "synthesis.target_difference"
      ],
      "difficulty": 2,
      "prompt": "起点丙烯 CH₃CH=CH₂，目标 1-丙醇 CH₃CH₂CH₂OH。第一条差异最准确？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "碳数不变，双键→末端醇。",
        "why": "这立刻把候选收缩到水合/间接取代等路线。",
        "full": "再看末端 OH 要求反 Markovnikov 或先末端卤化再 SN2。"
      },
      "options": [
        {
          "id": "a",
          "label": "碳数不变；C=C 消失；末端出现 OH"
        },
        {
          "id": "b",
          "label": "碳数 +1"
        },
        {
          "id": "c",
          "label": "需要新芳环"
        }
      ],
      "answer": "a",
      "formula": "C3 alkene → C3 primary alcohol"
    },
    {
      "id": "d17-carbon-01",
      "day": 17,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.carbon_count",
      "skillIds": [
        "synthesis.carbon_count"
      ],
      "difficulty": 2,
      "prompt": "1-溴丁烷 → 戊酸，目标比起点多几个碳？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "多1个碳。",
        "why": "最醒目的 +1C 工具是 CN⁻。",
        "full": "RBr + CN⁻ → RCN，再水解成 RCO₂H。"
      },
      "options": [
        {
          "id": "a",
          "label": "1"
        },
        {
          "id": "b",
          "label": "0"
        },
        {
          "id": "c",
          "label": "2"
        }
      ],
      "answer": "a",
      "formula": "C4 RBr → C5 acid"
    },
    {
      "id": "d17-laststep-alcohol-01",
      "day": 17,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.last_step",
      "skillIds": [
        "synthesis.last_step"
      ],
      "difficulty": 2,
      "prompt": "目标是 2-丙醇。若最后一步选羰基还原，最直接前体？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "丙酮。",
        "why": "酮还原给二级醇。",
        "full": "丙醛还原会给1-丙醇。"
      },
      "options": [
        {
          "id": "a",
          "label": "丙酮"
        },
        {
          "id": "b",
          "label": "丙醛"
        },
        {
          "id": "c",
          "label": "丙酸"
        }
      ],
      "answer": "a",
      "formula": "(CH₃)₂CO →[NaBH₄] (CH₃)₂CHOH"
    },
    {
      "id": "d17-laststep-acid-01",
      "day": 17,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.last_step",
      "skillIds": [
        "synthesis.last_step"
      ],
      "difficulty": 2,
      "prompt": "目标是丁酸，若最后一步选腈水解，前体应是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "丁腈。",
        "why": "腈碳保留成为羧基碳，所以前体与目标同碳数。",
        "full": "若从3C卤代物出发，CN步骤已完成+1C。"
      },
      "options": [
        {
          "id": "a",
          "label": "丁腈 CH₃CH₂CH₂CN"
        },
        {
          "id": "b",
          "label": "丙腈 CH₃CH₂CN"
        },
        {
          "id": "c",
          "label": "丁胺"
        }
      ],
      "answer": "a",
      "formula": "C4 nitrile → C4 acid"
    },
    {
      "id": "d17-disconnect-grig-01",
      "day": 17,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.disconnection",
      "skillIds": [
        "synthesis.disconnection"
      ],
      "difficulty": 2,
      "prompt": "目标 2-丙醇 (CH₃)₂CHOH 若用 Grignard 断键，哪组最自然？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "乙醛 + 甲基 Grignard。",
        "why": "非甲醛醛 + RMgX 给二级醇。",
        "full": "HCHO+C₂H₅MgBr 给1-丙醇，不是2-丙醇。"
      },
      "options": [
        {
          "id": "a",
          "label": "CH₃CHO + CH₃MgBr"
        },
        {
          "id": "b",
          "label": "HCHO + C₂H₅MgBr 只会给2-丙醇"
        },
        {
          "id": "c",
          "label": "CH₃CO₂H + CH₃Br"
        }
      ],
      "answer": "a",
      "formula": "CH₃CHO + CH₃MgBr → (CH₃)₂CHOH"
    },
    {
      "id": "d17-disconnect-acetylide-01",
      "day": 17,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.disconnection",
      "skillIds": [
        "synthesis.disconnection"
      ],
      "difficulty": 2,
      "prompt": "目标 3-己炔 CH₃CH₂C≡CCH₂CH₃。哪种断键最适合端炔负离子 SN2？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "1-丁炔负离子 + EtBr。",
        "why": "一级二碳卤代物适合 SN2，并把端炔变内炔。",
        "full": "三级卤代物会 E2。"
      },
      "options": [
        {
          "id": "a",
          "label": "1-丁炔负离子 + 溴乙烷"
        },
        {
          "id": "b",
          "label": "2-丁炔 + 乙烷"
        },
        {
          "id": "c",
          "label": "叔丁基溴 + 乙炔负离子"
        }
      ],
      "answer": "a",
      "formula": "HC≡CCH₂CH₃ → acetylide + EtBr → 3-hexyne"
    },
    {
      "id": "d17-forward-compat-01",
      "day": 17,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.compatibility",
      "skillIds": [
        "synthesis.compatibility"
      ],
      "difficulty": 2,
      "prompt": "计划“先做 Grignard，再在同一瓶里保留游离 –OH 不保护”，最大风险？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "游离 OH 会淬灭 RMgX。",
        "why": "Grignard 是强碱，先做酸碱反应。",
        "full": "因此要改变顺序或保护 OH。"
      },
      "options": [
        {
          "id": "a",
          "label": "–OH 会把 Grignard 质子化淬灭"
        },
        {
          "id": "b",
          "label": "–OH 会让 Grignard 更强"
        },
        {
          "id": "c",
          "label": "完全无影响"
        }
      ],
      "answer": "a",
      "formula": "ROH + RMgX → ROMgX + RH"
    },
    {
      "id": "d17-efficiency-01",
      "day": 17,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.route_evaluation",
      "skillIds": [
        "synthesis.route_evaluation"
      ],
      "difficulty": 2,
      "prompt": "两条路线都化学可行：A 2步且选择性好；B 5步且多次保护/脱保护。一般评价？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "A 更优，B 可标黄色。",
        "why": "效率是路线评价的一部分，但不是化学可行性的全部。",
        "full": "这就是“有效路线不等于最佳路线”。"
      },
      "options": [
        {
          "id": "a",
          "label": "A 更优但 B 仍可行"
        },
        {
          "id": "b",
          "label": "B 必须判错"
        },
        {
          "id": "c",
          "label": "步数永远不影响"
        }
      ],
      "answer": "a",
      "formula": "valid ≠ optimal"
    },
    {
      "id": "d17-syn-propanol",
      "day": 17,
      "type": "synthesis-case",
      "role": "transfer",
      "primarySkill": "synthesis.route_evaluation",
      "skillIds": [
        "synthesis.route_evaluation"
      ],
      "difficulty": 4,
      "prompt": "路线 1：丙烯 → 1-丙醇，比较直接氢硼化与绕行路线。",
      "caseId": "syn-propene-propanol1",
      "examTags": [
        "综合任务"
      ],
      "hints": [],
      "explanationLayers": {
        "short": "完成整套过程后统一复盘。",
        "why": "过程中的每一步都会分别记录。",
        "full": "该任务使用专门的结构推断/路线训练引擎。"
      }
    },
    {
      "id": "d17-syn-hexyne",
      "day": 17,
      "type": "synthesis-case",
      "role": "transfer",
      "primarySkill": "synthesis.route_evaluation",
      "skillIds": [
        "synthesis.route_evaluation"
      ],
      "difficulty": 4,
      "prompt": "路线 2：1-丁炔 → 3-己炔，完成端炔增碳。",
      "caseId": "syn-butyne-hexyne",
      "examTags": [
        "综合任务"
      ],
      "hints": [],
      "explanationLayers": {
        "short": "完成整套过程后统一复盘。",
        "why": "过程中的每一步都会分别记录。",
        "full": "该任务使用专门的结构推断/路线训练引擎。"
      }
    },
    {
      "id": "d17-syn-pentacid",
      "day": 17,
      "type": "synthesis-case",
      "role": "transfer",
      "primarySkill": "synthesis.route_evaluation",
      "skillIds": [
        "synthesis.route_evaluation"
      ],
      "difficulty": 4,
      "prompt": "路线 3：1-溴丁烷 → 戊酸，用 CN⁻ 做 +1C。",
      "caseId": "syn-bromobutane-pentanoic",
      "examTags": [
        "综合任务"
      ],
      "hints": [],
      "explanationLayers": {
        "short": "完成整套过程后统一复盘。",
        "why": "过程中的每一步都会分别记录。",
        "full": "该任务使用专门的结构推断/路线训练引擎。"
      }
    }
  ],
  "repairs": {
    "synthesis.carbon_count": [
      {
        "id": "d17-repair-carbon-01",
        "day": 17,
        "type": "choice",
        "role": "repair",
        "primarySkill": "synthesis.carbon_count",
        "skillIds": [
          "synthesis.carbon_count"
        ],
        "difficulty": 2,
        "prompt": "R–Br → R–CN 这一步碳数？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "+1。",
          "why": "CN碳进入骨架。",
          "full": "水解后该碳成为羧基碳。"
        },
        "options": [
          {
            "id": "a",
            "label": "+1"
          },
          {
            "id": "b",
            "label": "不变"
          }
        ],
        "answer": "a"
      }
    ],
    "synthesis.last_step": [
      {
        "id": "d17-repair-last-01",
        "day": 17,
        "type": "choice",
        "role": "repair",
        "primarySkill": "synthesis.last_step",
        "skillIds": [
          "synthesis.last_step"
        ],
        "difficulty": 2,
        "prompt": "目标二级醇，最常见直接羰基前体？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "酮。",
          "why": "酮还原或醛+Grignard都可给二级醇。",
          "full": "先找最直接最后一步。"
        },
        "options": [
          {
            "id": "a",
            "label": "酮"
          },
          {
            "id": "b",
            "label": "酰氯"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "合成第一问：碳数/官能团/关键键/氧化态差什么",
    "last step先猜候选，再正向验证",
    "常见C–C：Grignard、acetylide SN2、enolate、FC",
    "CN +1C；Hofmann −1C",
    "路线：先valid，再效率/选择性/兼容"
  ]
};
})();
