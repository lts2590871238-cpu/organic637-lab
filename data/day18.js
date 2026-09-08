(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[18] = {
  "day": 18,
  "title": "多步合成 II：顺序、兼容性、保护与多路线评价",
  "subtitle": "今天从“会几步反应”升级到“能不能把它们放在正确顺序里”。每一步都要对下一步负责。",
  "estimatedMinutes": 90,
  "objectives": [
    "识别步骤顺序冲突",
    "判断何时需要保护",
    "用芳环定位安排顺序",
    "做氧化还原兼容性审计",
    "接受并评价多条有效路线",
    "完成3座高阶路线训练"
  ],
  "lessons": [
    {
      "id": "d18-lesson-order",
      "eyebrow": "",
      "title": "多步合成真正难的往往不是“每步会不会”，而是“顺序会不会互相打架”",
      "body": "同一套反应换顺序可能完全失败：先装强钝化基可能堵死 Friedel–Crafts；先生成会被强氧化剂破坏的官能团也会出事。每加一步都问“下一步试剂会不会伤到已经做好的部分”。",
      "note": "合成从 Day18 开始像下棋：每一步都要看下一手。",
      "formulas": [
        "route order = reactivity + compatibility"
      ],
      "analogy": {
        "title": "像装修顺序：先铺木地板再砸墙一定出事",
        "body": "每一步都可能让下一步变容易或变困难。",
        "boundary": "考试路线优先追求经典稳妥，不必优化到工业工艺。"
      }
    },
    {
      "id": "d18-lesson-protection",
      "eyebrow": "",
      "title": "保护基不是为了炫技，而是当两个官能团的反应性冲突时“临时遮住一个”",
      "body": "羰基可缩醛保护，氨基可酰化保护。保护前先问：真的有冲突吗？如果没有，就不要多走两步。",
      "note": "保护基增加步骤，所以只有“必要”才是好路线。",
      "formulas": [
        "C=O ⇌ acetal protection",
        "ArNH₂ → ArNHAc protection → hydrolysis deprotection"
      ],
      "analogy": {
        "title": "像施工时给不能沾油漆的家具套膜",
        "body": "膜不是终点，施工结束必须拆掉。",
        "boundary": "保护基需能在其它步骤下稳定并可选择性脱除。"
      }
    },
    {
      "id": "d18-lesson-aromatic-order",
      "eyebrow": "",
      "title": "芳香合成顺序：先看每个取代基装上后会把下一步导向哪里",
      "body": "目标 1,3 关系常可先装 meta director，再做第二次 EAS；目标 o/p 可利用 o/p director。若 NH₂ 太强或会与 AlCl₃ 配位，考虑先以 NO₂/保护胺等形态安排顺序。",
      "note": "不要只看最终基团，要看它在“当时那一步”是什么形态。",
      "formulas": [
        "director installed first → controls next EAS position"
      ],
      "analogy": {
        "title": "像先放哪块路牌，会决定下一辆车往哪条路走",
        "body": "路线顺序本身就是定位策略。",
        "boundary": "位阻与多个取代基竞争会让实际比例更复杂。"
      }
    },
    {
      "id": "d18-lesson-redox-order",
      "eyebrow": "",
      "title": "氧化/还原步骤要检查“会不会顺手把别的地方也改掉”",
      "body": "强氧化剂可能攻击醛、一级醇、烯烃等；LiAlH₄ 可能把多个羰基衍生物一起还原。若只想改一个官能团，要么选更温和/选择性试剂，要么调整顺序。",
      "note": "“这个试剂能完成目标变化”只是第一问；第二问是“它还会改什么”。",
      "formulas": [
        "chemoselectivity audit before every redox step"
      ],
      "analogy": {
        "title": "像用高压水枪洗一个小污点，可能把旁边贴纸也冲掉",
        "body": "试剂越强，越要检查旁边敏感官能团。",
        "boundary": "真实选择性依赖试剂、温度、当量等。"
      }
    },
    {
      "id": "d18-lesson-alt",
      "eyebrow": "",
      "title": "多路线比较要允许“不是标准答案但化学上通”的方案",
      "body": "如果一条路线更长但每步合理，它应该被标黄而不是判错；如果某一步在当前条件下明显副反应主导，标橙；违反核心机理/碳数则红。",
      "note": "这套颜色是为了练路线思维，不是游戏装饰。",
      "formulas": [
        "green main / yellow valid alternative / orange suppressed / red invalid"
      ],
      "analogy": {
        "title": "像导航的绿线、备选线、堵车线和断路",
        "body": "能到与最好到是两件事。",
        "boundary": "考试阅卷仍可能要求写清条件和主要路线。"
      }
    },
    {
      "id": "d18-lesson-mixed-case",
      "eyebrow": "",
      "title": "终局合成经常要把结构推断反过来用：中间体该长什么，靠证据检查",
      "body": "写完一个中间体，可以反问：它的官能团与下一步条件相容吗？碳数对吗？定位对吗？若不对，回到上一个分叉。",
      "note": "Day13/14 的“候选排除”其实也能用于合成路线审计。",
      "formulas": [
        "synthesis ↔ structure verification"
      ],
      "analogy": {
        "title": "像工程验收：每一层盖完都要量尺寸，不等整栋楼盖完才发现歪了",
        "body": "中间体就是每层楼的验收点。",
        "boundary": "考试时间有限，优先检查最容易出灾难的步骤。"
      }
    }
  ],
  "questions": [
    {
      "id": "d18-order-fc-01",
      "day": 18,
      "type": "choice",
      "role": "learn",
      "primarySkill": "synthesis.compatibility",
      "skillIds": [
        "synthesis.compatibility"
      ],
      "difficulty": 2,
      "prompt": "想在苯环上既有 –NO₂ 又通过 Friedel–Crafts 装酰基。为什么“先硝化再 FC 酰基化”常不好？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先 NO₂ 会堵 FC。",
        "why": "强钝化芳环很难再做 Friedel–Crafts。",
        "full": "因此常先 FC 装酰基，再根据定位/后续需要安排硝化。"
      },
      "options": [
        {
          "id": "a",
          "label": "NO₂ 强烈钝化芳环，会抑制 Friedel–Crafts"
        },
        {
          "id": "b",
          "label": "NO₂ 会变成强碱"
        },
        {
          "id": "c",
          "label": "FC 只能在烷烃上发生"
        }
      ],
      "answer": "a",
      "formula": "PhNO₂ + RCOCl/AlCl₃ → difficult FC"
    },
    {
      "id": "d18-protect-carbonyl-01",
      "day": 18,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.compatibility",
      "skillIds": [
        "synthesis.compatibility"
      ],
      "difficulty": 2,
      "prompt": "一个分子同时有酮和酯，你想让 Grignard 只在后续特定阶段攻击酮，而当前先做别的强亲核步骤。常见策略？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "缩醛保护羰基。",
        "why": "缩醛对很多碱性/亲核条件较稳定。",
        "full": "之后酸水解可恢复 C=O。"
      },
      "options": [
        {
          "id": "a",
          "label": "必要时把酮先转缩醛保护"
        },
        {
          "id": "b",
          "label": "把酮氧化成更活泼酰氯"
        },
        {
          "id": "c",
          "label": "加水让 Grignard 更稳定"
        }
      ],
      "answer": "a",
      "formula": "ketone ⇌ acetal protection"
    },
    {
      "id": "d18-protect-amine-01",
      "day": 18,
      "type": "choice",
      "role": "practice",
      "primarySkill": "amine.protection",
      "skillIds": [
        "amine.protection"
      ],
      "difficulty": 2,
      "prompt": "苯胺要进行可控溴化而避免过度反应，经典做法之一？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先保护成乙酰苯胺。",
        "why": "NHAc 比 NH₂ 活化弱，定位仍主要 o/p，可提高可控性。",
        "full": "这就是保护基解决“太活泼”的典型。"
      },
      "options": [
        {
          "id": "a",
          "label": "先乙酰化 NH₂ → NHAc，再溴化，最后水解"
        },
        {
          "id": "b",
          "label": "直接用大量 Br₂ 水保证只一取代"
        },
        {
          "id": "c",
          "label": "先把 NH₂ 变成 NO₂ 再还原每一步都更短"
        }
      ],
      "answer": "a",
      "formula": "PhNH₂ → PhNHAc → bromination → hydrolysis"
    },
    {
      "id": "d18-redox-select-01",
      "day": 18,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.compatibility",
      "skillIds": [
        "synthesis.compatibility"
      ],
      "difficulty": 2,
      "prompt": "分子同时有醛和烯烃，若用热浓 KMnO₄，只想“温柔地把醛氧化成酸”为什么可能有问题？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "强氧化剂可能同时破坏烯烃。",
        "why": "试剂兼容性不只看目标官能团。",
        "full": "若要选择性氧化醛，可考虑更温和条件或先调整路线。"
      },
      "options": [
        {
          "id": "a",
          "label": "KMnO₄ 也可能强氧化烯烃"
        },
        {
          "id": "b",
          "label": "KMnO₄ 只认醛绝不碰烯烃"
        },
        {
          "id": "c",
          "label": "醛不能氧化"
        }
      ],
      "answer": "a",
      "formula": "alkene + hot KMnO₄ → oxidative cleavage"
    },
    {
      "id": "d18-order-diazo-01",
      "day": 18,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.last_step",
      "skillIds": [
        "synthesis.last_step"
      ],
      "difficulty": 2,
      "prompt": "目标芳环上要把 NH₂ 最终换成 CN。最自然的最后两步？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "重氮化再 Sandmeyer CN。",
        "why": "芳基 C(sp²)–NH₂ 不是普通 SN2 底物。",
        "full": "ArNH₂ → ArN₂⁺ →[CuCN] ArCN。"
      },
      "options": [
        {
          "id": "a",
          "label": "NH₂ → N₂⁺ → CN"
        },
        {
          "id": "b",
          "label": "NH₂ → OH → CN 直接SN2"
        },
        {
          "id": "c",
          "label": "NH₂ → CH₃ → CN"
        }
      ],
      "answer": "a",
      "formula": "ArNH₂ → ArN₂⁺ → ArCN"
    },
    {
      "id": "d18-order-acid-01",
      "day": 18,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.last_step",
      "skillIds": [
        "synthesis.last_step"
      ],
      "difficulty": 2,
      "prompt": "目标为芳香羧酸 ArCO₂H，若已有 ArCN，最直接最后一步？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "腈水解。",
        "why": "CN 碳成为羧基碳。",
        "full": "这也说明早先装 CN 是 +1C/功能转换的战略步骤。"
      },
      "options": [
        {
          "id": "a",
          "label": "腈水解"
        },
        {
          "id": "b",
          "label": "Hofmann 降解"
        },
        {
          "id": "c",
          "label": "Br₂/CCl₄"
        }
      ],
      "answer": "a",
      "formula": "ArCN →[H₃O⁺,Δ] ArCO₂H"
    },
    {
      "id": "d18-alt-route-01",
      "day": 18,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.route_evaluation",
      "skillIds": [
        "synthesis.route_evaluation"
      ],
      "difficulty": 2,
      "prompt": "一条5步路线每一步都可靠；另一条3步路线第二步会让三级卤代物强行做 SN2。应该怎么评价？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "化学可行性先于步数。",
        "why": "三级底物普通 SN2 是核心机理冲突。",
        "full": "路线短不能补救关键不成立的一步。"
      },
      "options": [
        {
          "id": "a",
          "label": "5步路线可行（黄/绿），3步路线关键逻辑错误（红）"
        },
        {
          "id": "b",
          "label": "3步一定更优"
        },
        {
          "id": "c",
          "label": "两条一样"
        }
      ],
      "answer": "a",
      "formula": "validity > raw step count"
    },
    {
      "id": "d18-carbon-check-01",
      "day": 18,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.carbon_count",
      "skillIds": [
        "synthesis.carbon_count"
      ],
      "difficulty": 2,
      "prompt": "目标比起点多2个碳，路线里唯一成碳步骤是“RBr + CN⁻”，这条路线在碳数上够吗？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "不够。",
        "why": "CN 只贡献一个碳。",
        "full": "还需要另一处 +1C 或一个 +2C 成键工具。"
      },
      "options": [
        {
          "id": "a",
          "label": "不够，只+1C"
        },
        {
          "id": "b",
          "label": "够，CN+2C"
        },
        {
          "id": "c",
          "label": "碳数无需检查"
        }
      ],
      "answer": "a",
      "formula": "CN route: +1C only"
    },
    {
      "id": "d18-syn-meta-bromo",
      "day": 18,
      "type": "synthesis-case",
      "role": "transfer",
      "primarySkill": "synthesis.route_evaluation",
      "skillIds": [
        "synthesis.route_evaluation"
      ],
      "difficulty": 4,
      "prompt": "路线 4：苯 → 间溴苯乙酮，训练芳环定位与步骤顺序。",
      "caseId": "syn-benzene-meta-bromoacetophenone",
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
      "id": "d18-syn-aniline-phenol",
      "day": 18,
      "type": "synthesis-case",
      "role": "transfer",
      "primarySkill": "synthesis.route_evaluation",
      "skillIds": [
        "synthesis.route_evaluation"
      ],
      "difficulty": 4,
      "prompt": "路线 5：苯胺 → 苯酚，走重氮盐转接路线。",
      "caseId": "syn-aniline-phenol",
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
      "id": "d18-syn-tertbutanol",
      "day": 18,
      "type": "synthesis-case",
      "role": "transfer",
      "primarySkill": "synthesis.route_evaluation",
      "skillIds": [
        "synthesis.route_evaluation"
      ],
      "difficulty": 4,
      "prompt": "路线 6：丙酮 → 叔丁醇，用 Grignard 做碳数和官能团逆推。",
      "caseId": "syn-acetone-tertbutanol",
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
    "synthesis.compatibility": [
      {
        "id": "d18-repair-compat-01",
        "day": 18,
        "type": "choice",
        "role": "repair",
        "primarySkill": "synthesis.compatibility",
        "skillIds": [
          "synthesis.compatibility"
        ],
        "difficulty": 2,
        "prompt": "含游离OH的底物直接加RMgBr，首先发生？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "先淬灭。",
          "why": "RMgX强碱。",
          "full": "需要保护或换顺序。"
        },
        "options": [
          {
            "id": "a",
            "label": "酸碱淬灭"
          },
          {
            "id": "b",
            "label": "Grignard无视OH"
          }
        ],
        "answer": "a"
      }
    ],
    "synthesis.route_evaluation": [
      {
        "id": "d18-repair-eval-01",
        "day": 18,
        "type": "choice",
        "role": "repair",
        "primarySkill": "synthesis.route_evaluation",
        "skillIds": [
          "synthesis.route_evaluation"
        ],
        "difficulty": 2,
        "prompt": "路线评价第一优先？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "先可行。",
          "why": "无效3步不如有效5步。",
          "full": "再比较效率/选择性/兼容。"
        },
        "options": [
          {
            "id": "a",
            "label": "化学可行性"
          },
          {
            "id": "b",
            "label": "步数最少不管机理"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "顺序决定后续可不可做",
    "保护基只在有真实冲突时使用",
    "芳环：先装谁决定下一步定位/活性",
    "强氧化/强还原要检查旁边官能团",
    "validity 50% > efficiency/selectivity/compatibility"
  ]
};
})();
