(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[19] = {
  "day": 19,
  "title": "Boss 卷：混合未见题",
  "subtitle": "今天撤掉学习模式的即时提示和即时解析，用一套150分混合卷检验真正独立迁移。",
  "estimatedMinutes": 90,
  "mode": "exam",
  "objectives": [
    "完成混合未见题",
    "记录首次作答/置信度/时间",
    "暴露高置信错误",
    "生成Day20 Top3修复输入"
  ],
  "lessons": [
    {
      "id": "d19-lesson-exam",
      "eyebrow": "",
      "title": "Boss 卷规则：今天不边做边看答案",
      "body": "这是一套混合未见题。做题过程中不给提示、不立即显示解析；每题提交即锁定。遇到不会的题可以选择“我在猜”，这会帮助 Day20 判断是知识缺口还是犹豫。",
      "note": "今天的目的不是制造漂亮分数，而是暴露真实的切换和迁移能力。",
      "formulas": [
        "总分按 150 分换算",
        "提交后锁定；整卷结束统一复盘"
      ],
      "analogy": {
        "title": "像正式模拟考",
        "body": "没有“刚答错立刻被教会”的优势，才能看出当前真正独立水平。",
        "boundary": "这是网站内部 Boss 卷，不伪称某一年完整原题。"
      }
    }
  ],
  "questions": [
    {
      "id": "d19-rxn-01",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "alkene.condition_discrimination",
      "skillIds": [
        "alkene.condition_discrimination"
      ],
      "difficulty": 2,
      "prompt": "1-丁烯经 1) BH₃·THF 2) H₂O₂/OH⁻，主产物？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "1-丁醇。",
        "why": "反 Markovnikov 水合。",
        "full": "OH 到较少取代端。"
      },
      "options": [
        {
          "id": "a",
          "label": "1-丁醇"
        },
        {
          "id": "b",
          "label": "2-丁醇"
        },
        {
          "id": "c",
          "label": "2-丁酮"
        }
      ],
      "answer": "a",
      "formula": "CH₂=CHCH₂CH₃ → CH₃CH₂CH₂CH₂OH",
      "points": 3
    },
    {
      "id": "d19-rxn-02",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "alkyne.partial_reduction_trans",
      "skillIds": [
        "alkyne.partial_reduction_trans"
      ],
      "difficulty": 2,
      "prompt": "3-己炔要得到反-3-己烯，选？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "Na/NH₃(l)。",
        "why": "溶解金属还原给 trans。",
        "full": "Lindlar 给 cis，Pd过量到烷烃。"
      },
      "options": [
        {
          "id": "a",
          "label": "Na/NH₃(l)"
        },
        {
          "id": "b",
          "label": "H₂/Lindlar"
        },
        {
          "id": "c",
          "label": "H₂/Pd excess"
        }
      ],
      "answer": "a",
      "formula": "RC≡CR′ →[Na/NH₃] trans-alkene",
      "points": 3
    },
    {
      "id": "d19-rxn-03",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "elimination.competition",
      "skillIds": [
        "elimination.competition"
      ],
      "difficulty": 2,
      "prompt": "叔丁基溴 + t-BuOK/Δ，主路径？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "E2。",
        "why": "3°底物+强大体积碱+热。",
        "full": "普通 SN2 被位阻阻断。"
      },
      "options": [
        {
          "id": "a",
          "label": "E2"
        },
        {
          "id": "b",
          "label": "SN2"
        },
        {
          "id": "c",
          "label": "SN1 only"
        }
      ],
      "answer": "a",
      "formula": "t-BuBr + t-BuOK/Δ → isobutene",
      "points": 3
    },
    {
      "id": "d19-rxn-04",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "epoxide.base_opening",
      "skillIds": [
        "epoxide.base_opening"
      ],
      "difficulty": 2,
      "prompt": "不对称环氧 + MeO⁻/MeOH，MeO⁻优先攻击？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "较少取代。",
        "why": "碱性开环 SN2 位阻控制。",
        "full": "酸性才更偏较多取代端。"
      },
      "options": [
        {
          "id": "a",
          "label": "较少取代碳"
        },
        {
          "id": "b",
          "label": "较多取代碳"
        },
        {
          "id": "c",
          "label": "O"
        }
      ],
      "answer": "a",
      "formula": "basic epoxide opening → less substituted C",
      "points": 3
    },
    {
      "id": "d19-rxn-05",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carbonyl.grignard",
      "skillIds": [
        "carbonyl.grignard"
      ],
      "difficulty": 2,
      "prompt": "CH₃CHO + C₂H₅MgBr，酸化后产物类型？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "2-丁醇。",
        "why": "醛+Grignard→二级醇，碳数2+2=4。",
        "full": "结构为 CH₃CH(OH)CH₂CH₃。"
      },
      "options": [
        {
          "id": "a",
          "label": "2-丁醇"
        },
        {
          "id": "b",
          "label": "1-丁醇"
        },
        {
          "id": "c",
          "label": "2-丁酮"
        }
      ],
      "answer": "a",
      "formula": "CH₃CHO + EtMgBr → 2-butanol",
      "points": 3
    },
    {
      "id": "d19-rxn-06",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carboxyl.hofmann",
      "skillIds": [
        "carboxyl.hofmann"
      ],
      "difficulty": 2,
      "prompt": "丁酰胺 CH₃CH₂CH₂CONH₂ Hofmann 降解得到？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "丙胺。",
        "why": "少一个羰基碳。",
        "full": "4C amide→3C amine。"
      },
      "options": [
        {
          "id": "a",
          "label": "丙胺"
        },
        {
          "id": "b",
          "label": "丁胺"
        },
        {
          "id": "c",
          "label": "乙胺"
        }
      ],
      "answer": "a",
      "formula": "C4 amide → C3 amine",
      "points": 3
    },
    {
      "id": "d19-rxn-07",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.michael",
      "skillIds": [
        "enolate.michael"
      ],
      "difficulty": 2,
      "prompt": "稳定 enolate 对 CH₂=CHCOCH₃ 做 Michael，主要新键接到？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "β-C。",
        "why": "Michael 是 1,4 加成。",
        "full": "最终羰基保留。"
      },
      "options": [
        {
          "id": "a",
          "label": "β-C"
        },
        {
          "id": "b",
          "label": "羰基O"
        },
        {
          "id": "c",
          "label": "羰基C直接1,2为唯一"
        }
      ],
      "answer": "a",
      "formula": "Nu → beta carbon",
      "points": 3
    },
    {
      "id": "d19-rxn-08",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "aromatic.orientation",
      "skillIds": [
        "aromatic.orientation"
      ],
      "difficulty": 2,
      "prompt": "硝基苯继续溴化，Br 主要进入？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "间位。",
        "why": "NO₂强钝化meta director。",
        "full": "邻/对 σ络合物更不稳定。"
      },
      "options": [
        {
          "id": "a",
          "label": "间位"
        },
        {
          "id": "b",
          "label": "邻位唯一"
        },
        {
          "id": "c",
          "label": "对位唯一"
        }
      ],
      "answer": "a",
      "formula": "PhNO₂ + Br₂/FeBr₃ → meta major",
      "points": 3
    },
    {
      "id": "d19-rxn-09",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "diazonium.substitution",
      "skillIds": [
        "diazonium.substitution"
      ],
      "difficulty": 2,
      "prompt": "PhNH₂ 要变 PhCN，最直接两步？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先重氮化，再 CuCN。",
        "why": "芳基 C–NH₂ 不能直接普通SN2。",
        "full": "重氮盐是转接头。"
      },
      "options": [
        {
          "id": "a",
          "label": "NaNO₂/HCl 0–5°C；CuCN"
        },
        {
          "id": "b",
          "label": "NaCN/DMSO直接SN2"
        },
        {
          "id": "c",
          "label": "H₂/Pd；HCN"
        }
      ],
      "answer": "a",
      "formula": "PhNH₂→PhN₂⁺→PhCN",
      "points": 3
    },
    {
      "id": "d19-rxn-10",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.ez",
      "skillIds": [
        "stereo.ez"
      ],
      "difficulty": 2,
      "prompt": "CH₃CH=CHCl 判断 E/Z 的正确做法？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先CIP再相对位置。",
        "why": "两端都各有两个不同基团，所以有E/Z。",
        "full": "高优先同侧Z，异侧E。"
      },
      "options": [
        {
          "id": "a",
          "label": "每端先按CIP选高优先，再看同侧/异侧"
        },
        {
          "id": "b",
          "label": "只看两个H"
        },
        {
          "id": "c",
          "label": "一定没有E/Z"
        }
      ],
      "answer": "a",
      "formula": "CIP on each alkene carbon",
      "points": 3
    },
    {
      "id": "d19-rank-01",
      "day": 19,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "ranking.acidity",
      "skillIds": [
        "ranking.acidity"
      ],
      "difficulty": 2,
      "prompt": "酸性由强到弱排。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "乙酸 > 苯酚 > 乙醇。",
        "why": "carboxylate 两个O共振最强；phenoxide 次之。",
        "full": "比较共轭碱稳定性。"
      },
      "items": [
        {
          "id": "acid",
          "label": "乙酸"
        },
        {
          "id": "phenol",
          "label": "苯酚"
        },
        {
          "id": "ethanol",
          "label": "乙醇"
        }
      ],
      "correctOrder": [
        "acid",
        "phenol",
        "ethanol"
      ],
      "answer": [
        "acid",
        "phenol",
        "ethanol"
      ],
      "points": 5
    },
    {
      "id": "d19-rank-02",
      "day": 19,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "substitution.sn2",
      "skillIds": [
        "substitution.sn2"
      ],
      "difficulty": 2,
      "prompt": "SN2速率由快到慢。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "Me >1°>2°>>3°。",
        "why": "位阻主导。",
        "full": "背面进攻需要空间。"
      },
      "items": [
        {
          "id": "me",
          "label": "CH₃Br"
        },
        {
          "id": "pri",
          "label": "CH₃CH₂Br"
        },
        {
          "id": "sec",
          "label": "(CH₃)₂CHBr"
        },
        {
          "id": "tert",
          "label": "(CH₃)₃CBr"
        }
      ],
      "correctOrder": [
        "me",
        "pri",
        "sec",
        "tert"
      ],
      "answer": [
        "me",
        "pri",
        "sec",
        "tert"
      ],
      "points": 5
    },
    {
      "id": "d19-rank-03",
      "day": 19,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "carboxyl.reactivity",
      "skillIds": [
        "carboxyl.reactivity"
      ],
      "difficulty": 2,
      "prompt": "酰基取代活性由高到低。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "酰氯>酸酐>酯>酰胺。",
        "why": "离去基与共振。",
        "full": "酰胺最低。"
      },
      "items": [
        {
          "id": "acl",
          "label": "RCOCl"
        },
        {
          "id": "anh",
          "label": "(RCO)₂O"
        },
        {
          "id": "est",
          "label": "RCOOR"
        },
        {
          "id": "am",
          "label": "RCONR₂"
        }
      ],
      "correctOrder": [
        "acl",
        "anh",
        "est",
        "am"
      ],
      "answer": [
        "acl",
        "anh",
        "est",
        "am"
      ],
      "points": 5
    },
    {
      "id": "d19-rank-04",
      "day": 19,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "amine.basicity",
      "skillIds": [
        "amine.basicity"
      ],
      "difficulty": 2,
      "prompt": "碱性由强到弱。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "乙胺>苯胺>对硝基苯胺。",
        "why": "孤对可用程度。",
        "full": "共振与NO₂吸电子降低碱性。"
      },
      "items": [
        {
          "id": "ethyl",
          "label": "乙胺"
        },
        {
          "id": "anil",
          "label": "苯胺"
        },
        {
          "id": "pno2",
          "label": "对硝基苯胺"
        }
      ],
      "correctOrder": [
        "ethyl",
        "anil",
        "pno2"
      ],
      "answer": [
        "ethyl",
        "anil",
        "pno2"
      ],
      "points": 5
    },
    {
      "id": "d19-mech-01",
      "day": 19,
      "type": "electron-arrow",
      "role": "practice",
      "primarySkill": "mechanism.nucleophilic_attack",
      "skillIds": [
        "mechanism.nucleophilic_attack"
      ],
      "difficulty": 3,
      "prompt": "画 CN⁻ 对丙酮羰基第一步。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "Nu→C，π→O。",
        "why": "羰基亲核加成母动作。",
        "full": "两支箭同时满足碳八隅体。"
      },
      "formula": ":CN⁻ + (CH₃)₂C=O → tetrahedral O⁻",
      "baseSvg": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"电子箭头练习\"><text x=\"30\" y=\"42\" font-size=\"22\">:CN⁻ + (CH₃)₂C=O → tetrahedral O⁻</text><circle cx=\"80\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"92\" y=\"136\" font-size=\"18\">CN孤对</text><circle cx=\"310\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"322\" y=\"136\" font-size=\"18\">羰基C</text><circle cx=\"400\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"412\" y=\"136\" font-size=\"18\">C=O π</text><circle cx=\"520\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"532\" y=\"136\" font-size=\"18\">O</text></svg>",
      "hotspots": [
        {
          "id": "nu",
          "x": 80,
          "y": 130,
          "role": "source",
          "label": "CN孤对"
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
          "x": 400,
          "y": 130,
          "role": "source",
          "label": "C=O π"
        },
        {
          "id": "o",
          "x": 520,
          "y": 130,
          "role": "target",
          "label": "O"
        }
      ],
      "expectedArrows": [
        {
          "source": "nu",
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
          "source": "nu",
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
      "points": 10
    },
    {
      "id": "d19-mech-02",
      "day": 19,
      "type": "electron-arrow",
      "role": "practice",
      "primarySkill": "elimination.e2",
      "skillIds": [
        "elimination.e2"
      ],
      "difficulty": 3,
      "prompt": "画 E2 的三支核心电子箭头。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "夺H、成π、离去同一步。",
        "why": "E2协同。",
        "full": "无自由碳正离子。"
      },
      "formula": "Base⁻ + Hβ–Cβ–Cα–Br → C=C + HB + Br⁻",
      "baseSvg": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"电子箭头练习\"><text x=\"30\" y=\"42\" font-size=\"22\">Base⁻ + Hβ–Cβ–Cα–Br → C=C + HB + Br⁻</text><circle cx=\"60\" cy=\"140\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"72\" y=\"146\" font-size=\"18\">Base孤对</text><circle cx=\"190\" cy=\"140\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"202\" y=\"146\" font-size=\"18\">β-H</text><circle cx=\"280\" cy=\"140\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"292\" y=\"146\" font-size=\"18\">C-H</text><circle cx=\"375\" cy=\"140\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"387\" y=\"146\" font-size=\"18\">C-C</text><circle cx=\"460\" cy=\"140\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"472\" y=\"146\" font-size=\"18\">C-Br</text><circle cx=\"560\" cy=\"140\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"572\" y=\"146\" font-size=\"18\">Br</text></svg>",
      "hotspots": [
        {
          "id": "b",
          "x": 60,
          "y": 140,
          "role": "source",
          "label": "Base孤对"
        },
        {
          "id": "h",
          "x": 190,
          "y": 140,
          "role": "target",
          "label": "β-H"
        },
        {
          "id": "ch",
          "x": 280,
          "y": 140,
          "role": "source",
          "label": "C-H"
        },
        {
          "id": "cc",
          "x": 375,
          "y": 140,
          "role": "target",
          "label": "C-C"
        },
        {
          "id": "cbr",
          "x": 460,
          "y": 140,
          "role": "source",
          "label": "C-Br"
        },
        {
          "id": "br",
          "x": 560,
          "y": 140,
          "role": "target",
          "label": "Br"
        }
      ],
      "expectedArrows": [
        {
          "source": "b",
          "target": "h",
          "arrowType": "pair",
          "sequence": 1
        },
        {
          "source": "ch",
          "target": "cc",
          "arrowType": "pair",
          "sequence": 1
        },
        {
          "source": "cbr",
          "target": "br",
          "arrowType": "pair",
          "sequence": 1
        }
      ],
      "answer": [
        {
          "source": "b",
          "target": "h",
          "arrowType": "pair",
          "sequence": 1
        },
        {
          "source": "ch",
          "target": "cc",
          "arrowType": "pair",
          "sequence": 1
        },
        {
          "source": "cbr",
          "target": "br",
          "arrowType": "pair",
          "sequence": 1
        }
      ],
      "points": 10
    },
    {
      "id": "d19-mech-03",
      "day": 19,
      "type": "electron-arrow",
      "role": "practice",
      "primarySkill": "carboxyl.acyl_substitution",
      "skillIds": [
        "carboxyl.acyl_substitution"
      ],
      "difficulty": 3,
      "prompt": "四面体酰基中间体塌陷：画 O⁻ 恢复羰基、C–Cl 离去。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "O⁻→C，C–Cl→Cl。",
        "why": "恢复C=O同时离去。",
        "full": "亲核酰基取代的塌陷步骤。"
      },
      "formula": "R–C(O⁻)(OR)–Cl → RCOOR + Cl⁻",
      "baseSvg": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"电子箭头练习\"><text x=\"30\" y=\"42\" font-size=\"22\">R–C(O⁻)(OR)–Cl → RCOOR + Cl⁻</text><circle cx=\"120\" cy=\"140\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"132\" y=\"146\" font-size=\"18\">O⁻</text><circle cx=\"300\" cy=\"140\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"312\" y=\"146\" font-size=\"18\">酰基C</text><circle cx=\"420\" cy=\"140\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"432\" y=\"146\" font-size=\"18\">C-Cl键</text><circle cx=\"550\" cy=\"140\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"562\" y=\"146\" font-size=\"18\">Cl</text></svg>",
      "hotspots": [
        {
          "id": "o",
          "x": 120,
          "y": 140,
          "role": "source",
          "label": "O⁻"
        },
        {
          "id": "c",
          "x": 300,
          "y": 140,
          "role": "target",
          "label": "酰基C"
        },
        {
          "id": "bond",
          "x": 420,
          "y": 140,
          "role": "source",
          "label": "C-Cl键"
        },
        {
          "id": "cl",
          "x": 550,
          "y": 140,
          "role": "target",
          "label": "Cl"
        }
      ],
      "expectedArrows": [
        {
          "source": "o",
          "target": "c",
          "arrowType": "pair",
          "sequence": 1
        },
        {
          "source": "bond",
          "target": "cl",
          "arrowType": "pair",
          "sequence": 1
        }
      ],
      "answer": [
        {
          "source": "o",
          "target": "c",
          "arrowType": "pair",
          "sequence": 1
        },
        {
          "source": "bond",
          "target": "cl",
          "arrowType": "pair",
          "sequence": 1
        }
      ],
      "points": 10
    },
    {
      "id": "d19-struct-01",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.constraint_elimination",
      "skillIds": [
        "structure.ir",
        "structure.nmr_shift",
        "structure.chemical_tests",
        "structure.constraint_elimination"
      ],
      "difficulty": 2,
      "prompt": "未知 C₄H₈O，IR 1725 cm⁻¹ 强峰；¹H NMR 有约9.8 ppm 1H；Tollens阳性。最合理？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "丁醛。",
        "why": "醛氢9.8+银镜+羰基三证据一致。",
        "full": "酮无醛氢/银镜，醇无羰基峰。"
      },
      "options": [
        {
          "id": "a",
          "label": "丁醛 CH₃CH₂CH₂CHO"
        },
        {
          "id": "b",
          "label": "2-丁酮 CH₃COCH₂CH₃"
        },
        {
          "id": "c",
          "label": "1-丁醇"
        }
      ],
      "answer": "a",
      "formula": "C4H8O; CHO evidence",
      "points": 10
    },
    {
      "id": "d19-struct-02",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.constraint_elimination",
      "skillIds": [
        "structure.ir",
        "structure.chemical_tests",
        "structure.constraint_elimination"
      ],
      "difficulty": 2,
      "prompt": "未知 C₄H₆，IR 3300尖峰+2100弱峰，氨性AgNO₃沉淀。最合理？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "1-丁炔。",
        "why": "端炔IR+炔银检验。",
        "full": "内炔无≡C-H，二烯无C≡C。"
      },
      "options": [
        {
          "id": "a",
          "label": "1-丁炔 HC≡CCH₂CH₃"
        },
        {
          "id": "b",
          "label": "2-丁炔 CH₃C≡CCH₃"
        },
        {
          "id": "c",
          "label": "1,3-丁二烯"
        }
      ],
      "answer": "a",
      "formula": "terminal alkyne evidence",
      "points": 10
    },
    {
      "id": "d19-struct-03",
      "day": 19,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.constraint_elimination",
      "skillIds": [
        "structure.ir",
        "structure.nmr_shift",
        "structure.nmr_splitting",
        "structure.constraint_elimination"
      ],
      "difficulty": 2,
      "prompt": "未知 C₄H₈O₂，IR 1740强峰；¹H NMR 4.1 q(2H)、2.0 s(3H)、1.25 t(3H)。最合理？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "乙酸乙酯。",
        "why": "OCH₂CH₃给q+t，COCH₃给singlet，IR酯羰基。",
        "full": "丁酸会有很宽酸OH且NMR链型不同。"
      },
      "options": [
        {
          "id": "a",
          "label": "乙酸乙酯 CH₃COOCH₂CH₃"
        },
        {
          "id": "b",
          "label": "丁酸 CH₃CH₂CH₂CO₂H"
        },
        {
          "id": "c",
          "label": "1,4-丁二醇"
        }
      ],
      "answer": "a",
      "formula": "EtOAc fingerprint",
      "points": 10
    },
    {
      "id": "d19-syn-01",
      "day": 19,
      "type": "route",
      "role": "transfer",
      "primarySkill": "synthesis.route_evaluation",
      "skillIds": [
        "synthesis.route_evaluation"
      ],
      "difficulty": 3,
      "prompt": "从苯制正丙苯，选择避免重排的主路线。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先酰基化再还原。",
        "why": "控制重排风险。",
        "full": "路线短不等于选择性好。"
      },
      "graph": {
        "start": "benz",
        "target": "propyl",
        "nodes": [
          {
            "id": "benz",
            "label": "苯",
            "structure": "PhH"
          },
          {
            "id": "ket",
            "label": "芳基酮",
            "structure": "PhCOCH₂CH₃"
          },
          {
            "id": "propyl",
            "label": "正丙苯",
            "structure": "PhCH₂CH₂CH₃"
          },
          {
            "id": "iso",
            "label": "异丙苯支路",
            "structure": "PhCH(CH₃)₂"
          }
        ],
        "edges": [
          {
            "id": "acyl",
            "from": "benz",
            "to": "ket",
            "choice": "CH₃CH₂COCl/AlCl₃",
            "reagent": "propionyl chloride/AlCl₃",
            "status": "green",
            "reason": "不重排酰基化。"
          },
          {
            "id": "red",
            "from": "ket",
            "to": "propyl",
            "choice": "Clemmensen/Wolff-Kishner 去羰基",
            "reagent": "Zn(Hg)/HCl or NH₂NH₂/KOH",
            "status": "green",
            "reason": "C=O→CH₂。"
          },
          {
            "id": "direct",
            "from": "benz",
            "to": "iso",
            "choice": "1-Cl-propane/AlCl₃",
            "reagent": "1-propyl chloride/AlCl₃",
            "status": "yellow",
            "reason": "有重排风险，选择性差。"
          }
        ],
        "referenceRoutes": [
          [
            "acyl",
            "red"
          ]
        ]
      },
      "answer": {
        "acceptedPaths": [
          [
            "acyl",
            "red"
          ]
        ],
        "preferredPath": [
          "acyl",
          "red"
        ]
      },
      "points": 15
    },
    {
      "id": "d19-syn-02",
      "day": 19,
      "type": "route",
      "role": "transfer",
      "primarySkill": "synthesis.route_evaluation",
      "skillIds": [
        "synthesis.route_evaluation"
      ],
      "difficulty": 3,
      "prompt": "从 1-溴丙烷制丁酸，选择主路线。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "CN +1C 后水解。",
        "why": "先做碳数账本。",
        "full": "C3起点→C4酸，必须增加一碳。"
      },
      "graph": {
        "start": "brom",
        "target": "acid",
        "nodes": [
          {
            "id": "brom",
            "label": "1-溴丙烷",
            "structure": "CH₃CH₂CH₂Br"
          },
          {
            "id": "nitr",
            "label": "丁腈",
            "structure": "CH₃CH₂CH₂CN"
          },
          {
            "id": "acid",
            "label": "丁酸",
            "structure": "CH₃CH₂CH₂CO₂H"
          },
          {
            "id": "ol",
            "label": "1-丙醇",
            "structure": "CH₃CH₂CH₂OH"
          }
        ],
        "edges": [
          {
            "id": "cn",
            "from": "brom",
            "to": "nitr",
            "choice": "NaCN/DMSO",
            "reagent": "NaCN/DMSO",
            "status": "green",
            "reason": "SN2 +1C。"
          },
          {
            "id": "hyd",
            "from": "nitr",
            "to": "acid",
            "choice": "酸水解加热",
            "reagent": "H₃O⁺,Δ",
            "status": "green",
            "reason": "腈→酸。"
          },
          {
            "id": "oh",
            "from": "brom",
            "to": "ol",
            "choice": "NaOH(aq)",
            "reagent": "NaOH(aq)",
            "status": "yellow",
            "reason": "得到C3醇，碳数不够。"
          }
        ],
        "referenceRoutes": [
          [
            "cn",
            "hyd"
          ]
        ]
      },
      "answer": {
        "acceptedPaths": [
          [
            "cn",
            "hyd"
          ]
        ],
        "preferredPath": [
          "cn",
          "hyd"
        ]
      },
      "points": 15
    },
    {
      "id": "d19-mix-01",
      "day": 19,
      "type": "multi-choice",
      "role": "practice",
      "primarySkill": "exam.mixed_transfer",
      "skillIds": [
        "exam.mixed_transfer"
      ],
      "difficulty": 2,
      "prompt": "选择所有正确陈述。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "A、B正确。",
        "why": "E2协同无自由C⁺；3°位阻阻断SN2。",
        "full": "这是取代/消除混合切换。"
      },
      "options": [
        {
          "id": "a",
          "label": "SN1有自由碳正离子，因此可能重排"
        },
        {
          "id": "b",
          "label": "SN2在反应中心发生几何反转"
        },
        {
          "id": "c",
          "label": "E2一定先形成碳正离子"
        },
        {
          "id": "d",
          "label": "三级底物通常很适合SN2"
        }
      ],
      "answer": [
        "a",
        "b"
      ],
      "formula": "mechanism mix",
      "points": 5
    },
    {
      "id": "d19-mix-02",
      "day": 19,
      "type": "multi-choice",
      "role": "practice",
      "primarySkill": "exam.mixed_transfer",
      "skillIds": [
        "exam.mixed_transfer"
      ],
      "difficulty": 2,
      "prompt": "选择所有正确陈述。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "A、B、C正确。",
        "why": "D反了：LiAlH₄更强。",
        "full": "碳数与官能团工具混合审计。"
      },
      "options": [
        {
          "id": "a",
          "label": "Hofmann酰胺降解通常少1C"
        },
        {
          "id": "b",
          "label": "R–X+CN⁻通常可+1C"
        },
        {
          "id": "c",
          "label": "Wittig把C=O变C=C"
        },
        {
          "id": "d",
          "label": "NaBH₄比LiAlH₄更强，能轻易还原普通酰胺"
        }
      ],
      "answer": [
        "a",
        "b",
        "c"
      ],
      "formula": "synthetic tools",
      "points": 5
    }
  ],
  "repairs": {},
  "memorySheet": [
    "考试中不提示",
    "提交即锁定",
    "最终统一看模块分、Top3漏洞",
    "150分是内部Boss卷换算，不冒充某年原题"
  ]
};
})();
