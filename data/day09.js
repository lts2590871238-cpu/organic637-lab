(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[9] = {
  "day": 9,
  "title": "α-H 与 Aldol：让羰基旁边的碳变成亲核体",
  "subtitle": "今天只做一个核心跃迁：原本羰基碳是亲电体；把 α-H 拿掉以后，相邻 α-C 也能变成亲核体并去建 C–C 键。",
  "estimatedMinutes": 85,
  "objectives": [
    "找到 α-C/α-H",
    "理解 enolate 共振",
    "会画 enolate 基础箭头",
    "掌握 Aldol 加成与脱水",
    "理解交叉 Aldol 选择性",
    "能用碳数审计检查产物"
  ],
  "lessons": [
    {
      "id": "d09-lesson-alpha",
      "eyebrow": "",
      "title": "羰基旁边的 α-H 是“藏在旁边的一只把手”",
      "body": "羰基本身拉电子，使相邻 α-C 上的 H 比普通烷烃 H 更酸。碱夺走 α-H 后，负电荷可以在 α-C 与 O 之间共振分散，这就是 enolate。",
      "note": "先会找 α-C，再谈哪个 α-H 更容易被夺。",
      "formulas": [
        "R–CO–CH₂–R′ + Base ⇌ R–CO–CH⁻–R′ ↔ R–C(O⁻)=CH–R′"
      ],
      "analogy": {
        "title": "像羰基旁边装了一只“隐藏把手”",
        "body": "一拉这个 H，留下的负电荷有两个位置可以分担，所以比普通碳负离子更稳。",
        "boundary": "不同羰基的 α-H pKa 不同，平衡取决于碱强度。"
      }
    },
    {
      "id": "d09-lesson-enolate",
      "eyebrow": "",
      "title": "Enolate 不是两个不同东西，而是同一个电子云的两张共振照片",
      "body": "画 C-负式和 O-负式不是说分子在两瓶之间来回跳，而是表示真实电子离域。做 C–C 键时，我们常把 α-C 当亲核端。",
      "note": "共振式只移动电子，不移动原子。",
      "formulas": [
        "R–CO–CH⁻R′ ↔ R–C(O⁻)=CHR′"
      ],
      "analogy": {
        "title": "像同一个人从两个摄像头看",
        "body": "两张照片都在描述同一个真实 enolate，不是两种能分离的异构体。",
        "boundary": "具体反应位点受硬软酸碱、动力学/热力学等影响，本课程先抓常见 C-亲核。"
      }
    },
    {
      "id": "d09-lesson-aldol",
      "eyebrow": "",
      "title": "Aldol：一个羰基先变成亲核体，再去攻击另一个羰基",
      "body": "先由带 α-H 的醛/酮形成 enolate；它的 α-C 进攻另一个羰基碳，形成新的 C–C 键。质子化后得到 β-羟基羰基化合物。",
      "note": "先问“谁变 enolate？”再问“它攻击谁？”",
      "formulas": [
        "2 CH₃CHO →[OH⁻] CH₃CH(OH)CH₂CHO",
        "enolate C → carbonyl C：形成 C–C"
      ],
      "analogy": {
        "title": "同一支球队里，一名队员先变成前锋，再去撞另一队的球门",
        "body": "羰基既能提供 enolate 亲核体，也能当亲电受体。",
        "boundary": "自缩合与交叉缩合的选择性差异很大。"
      }
    },
    {
      "id": "d09-lesson-dehydration",
      "eyebrow": "",
      "title": "Aldol condensation：β-羟基产物还能脱水形成共轭烯酮",
      "body": "加热或合适条件下，β-羟基羰基化合物可失水，生成 α,β-不饱和羰基。共轭常带来额外稳定。",
      "note": "题目写 aldol addition 还是 condensation，要看是否进一步脱水。",
      "formulas": [
        "β-hydroxy carbonyl →[Δ] α,β-unsaturated carbonyl + H₂O"
      ],
      "analogy": {
        "title": "先搭桥，再把一分子水拆掉，桥变成共轭双键",
        "body": "第一阶段是 C–C 成键；第二阶段是脱水。",
        "boundary": "不同底物/条件下脱水程度不同。"
      }
    },
    {
      "id": "d09-lesson-crossed",
      "eyebrow": "",
      "title": "交叉 Aldol 最大问题不是“不会反应”，而是“谁都能当亲核体就会乱”",
      "body": "如果两个不同羰基都能形成 enolate，可能产生多种自缩合/交叉产物。常见设计是让一个羰基没有 α-H，只能当亲电体，例如苯甲醛。",
      "note": "合成题里“无 α-H 的醛”是一个很醒目的选择性提示。",
      "formulas": [
        "PhCHO（无 α-H） + CH₃COCH₃（有 α-H） → 更可控交叉 Aldol"
      ],
      "analogy": {
        "title": "像两个人都抢着当司机会乱套",
        "body": "让一个人明确当司机（enolate），另一个只当乘客（electrophile），路线就干净。",
        "boundary": "现代方法还能用预生成 enolate 控制更多底物，本20天先学经典策略。"
      }
    }
  ],
  "questions": [
    {
      "id": "d09-alpha-identify-01",
      "day": 9,
      "type": "choice",
      "role": "learn",
      "primarySkill": "enolate.alpha_h",
      "skillIds": [
        "enolate.alpha_h"
      ],
      "difficulty": 2,
      "prompt": "在 2-丁酮 CH₃COCH₂CH₃ 中，α-碳指哪些位置？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "紧邻羰基的碳是 α-C。",
        "why": "α 是相对于官能团的第一邻位。",
        "full": "2-丁酮两侧都有 α-C，也都有 α-H，因此可在两侧形成 enolate。"
      },
      "options": [
        {
          "id": "a",
          "label": "紧邻 C=O 的两侧碳"
        },
        {
          "id": "b",
          "label": "羰基碳本身"
        },
        {
          "id": "c",
          "label": "离羰基最远的末端碳"
        }
      ],
      "answer": "a",
      "formula": "CH₃(α)–CO–CH₂(α)–CH₃"
    },
    {
      "id": "d09-acidity-01",
      "day": 9,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.alpha_h",
      "skillIds": [
        "enolate.alpha_h"
      ],
      "difficulty": 2,
      "prompt": "为什么丙酮 α-H 比丙烷中的普通 C–H 更容易被碱夺走？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "共振稳定 enolate。",
        "why": "去质子化后负电荷能在 C/O 之间离域。",
        "full": "稳定的共轭碱意味着原酸的 H 更容易被移走。"
      },
      "options": [
        {
          "id": "a",
          "label": "生成的负电荷可与羰基共振离域"
        },
        {
          "id": "b",
          "label": "因为羰基碳一定带完整正电"
        },
        {
          "id": "c",
          "label": "因为丙酮没有 C–H"
        }
      ],
      "answer": "a",
      "formula": "CH₃COCH₂⁻ ↔ CH₃C(O⁻)=CH₂"
    },
    {
      "id": "d09-enolate-resonance-01",
      "day": 9,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.formation",
      "skillIds": [
        "enolate.formation"
      ],
      "difficulty": 2,
      "prompt": "下列哪种变化属于 enolate 的共振，而不是化学反应？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "C/O 两种负电式是共振式。",
        "why": "原子位置不变，只变电子分布。",
        "full": "共振箭头不是平衡箭头，也不是表示两种分子互相转化。"
      },
      "options": [
        {
          "id": "a",
          "label": "C 负式 ↔ O 负式只移动电子"
        },
        {
          "id": "b",
          "label": "一个 H 从 C 跑到 O"
        },
        {
          "id": "c",
          "label": "断 C–C 键"
        }
      ],
      "answer": "a",
      "formula": "RCOCH⁻R′ ↔ RC(O⁻)=CHR′"
    },
    {
      "id": "d09-arrow-enolate-01",
      "day": 9,
      "type": "electron-arrow",
      "role": "practice",
      "primarySkill": "enolate.formation",
      "skillIds": [
        "enolate.formation",
        "mechanism.electron_source"
      ],
      "difficulty": 3,
      "prompt": "画碱夺 α-H 形成 enolate 的关键电子移动。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "夺 H、形成 C=C、π 到 O 是常见 enolate 画法。",
        "why": "这让负电最终落在 O 的共振式中。",
        "full": "也可以画碳负式作为另一共振贡献者；电子箭头必须保持价电子合理。"
      },
      "formula": "Base⁻ + CH₃COCH₃ → CH₃COCH₂⁻ ↔ CH₃C(O⁻)=CH₂",
      "baseSvg": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"电子箭头练习\"><text x=\"30\" y=\"42\" font-size=\"22\">Base⁻ + CH₃COCH₃ → CH₃COCH₂⁻ ↔ CH₃C(O⁻)=CH₂</text><circle cx=\"70\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"82\" y=\"141\" font-size=\"18\">Base孤对</text><circle cx=\"210\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"222\" y=\"141\" font-size=\"18\">α-H</text><circle cx=\"300\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"312\" y=\"141\" font-size=\"18\">C–H键</text><circle cx=\"390\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"402\" y=\"141\" font-size=\"18\">αC–羰基C键</text><circle cx=\"465\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"477\" y=\"141\" font-size=\"18\">C=O π键</text><circle cx=\"560\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"572\" y=\"141\" font-size=\"18\">O</text></svg>",
      "hotspots": [
        {
          "id": "base",
          "x": 70,
          "y": 135,
          "role": "source",
          "label": "Base孤对"
        },
        {
          "id": "h",
          "x": 210,
          "y": 135,
          "role": "target",
          "label": "α-H"
        },
        {
          "id": "ch",
          "x": 300,
          "y": 135,
          "role": "source",
          "label": "C–H键"
        },
        {
          "id": "cc",
          "x": 390,
          "y": 135,
          "role": "target",
          "label": "αC–羰基C键"
        },
        {
          "id": "pi",
          "x": 465,
          "y": 135,
          "role": "source",
          "label": "C=O π键"
        },
        {
          "id": "o",
          "x": 560,
          "y": 135,
          "role": "target",
          "label": "O"
        }
      ],
      "expectedArrows": [
        {
          "source": "base",
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
          "source": "pi",
          "target": "o",
          "arrowType": "pair",
          "sequence": 1
        }
      ],
      "answer": [
        {
          "source": "base",
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
          "source": "pi",
          "target": "o",
          "arrowType": "pair",
          "sequence": 1
        }
      ]
    },
    {
      "id": "d09-aldol-product-01",
      "day": 9,
      "type": "choice",
      "role": "learn",
      "primarySkill": "enolate.aldol",
      "skillIds": [
        "enolate.aldol"
      ],
      "difficulty": 2,
      "prompt": "乙醛自 Aldol 加成（不考虑脱水）得到的 β-羟基醛是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到 3-羟基丁醛。",
        "why": "一个乙醛 enolate 的 α-C 攻击另一个乙醛羰基。",
        "full": "新 C–C 键把两个 C2 单元接成 C4，亲电羰基变成 OH，另一个羰基保留。"
      },
      "options": [
        {
          "id": "a",
          "label": "CH₃CH(OH)CH₂CHO"
        },
        {
          "id": "b",
          "label": "CH₃CH=CHCHO"
        },
        {
          "id": "c",
          "label": "CH₃COCH₃"
        }
      ],
      "answer": "a",
      "formula": "2 CH₃CHO → CH₃CH(OH)CH₂CHO"
    },
    {
      "id": "d09-aldol-carbon-01",
      "day": 9,
      "type": "choice",
      "role": "practice",
      "primarySkill": "synthesis.carbon_count",
      "skillIds": [
        "enolate.aldol",
        "synthesis.carbon_count"
      ],
      "difficulty": 2,
      "prompt": "两个乙醛做 Aldol 后，主骨架碳数应该是多少？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "4 个碳。",
        "why": "Aldol 是 C–C 成键，不丢碳。",
        "full": "先做碳数账本能快速排除很多错误产物。"
      },
      "options": [
        {
          "id": "a",
          "label": "4"
        },
        {
          "id": "b",
          "label": "2"
        },
        {
          "id": "c",
          "label": "3"
        }
      ],
      "answer": "a",
      "formula": "2C + 2C → 4C"
    },
    {
      "id": "d09-condensation-01",
      "day": 9,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.aldol",
      "skillIds": [
        "enolate.aldol"
      ],
      "difficulty": 2,
      "prompt": "3-羟基丁醛加热脱水，形成的共轭产物最接近？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到巴豆醛 CH₃CH=CHCHO。",
        "why": "β-OH 与 α-H 脱水，形成 α,β-C=C。",
        "full": "新双键与羰基共轭，常使脱水有利。"
      },
      "options": [
        {
          "id": "a",
          "label": "CH₃CH=CHCHO"
        },
        {
          "id": "b",
          "label": "CH₃CH₂CH₂CHO"
        },
        {
          "id": "c",
          "label": "CH₃COCH₂OH"
        }
      ],
      "answer": "a",
      "formula": "CH₃CH(OH)CH₂CHO →[Δ] CH₃CH=CHCHO + H₂O"
    },
    {
      "id": "d09-crossed-01",
      "day": 9,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.aldol",
      "skillIds": [
        "enolate.aldol"
      ],
      "difficulty": 2,
      "prompt": "苯甲醛 PhCHO 与丙酮做经典交叉 Aldol 时，为什么苯甲醛常被选作“只当亲电体”的一方？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "苯甲醛没有 α-H。",
        "why": "它不能像一般脂肪醛那样形成自己的 enolate。",
        "full": "这样能减少两个底物都自缩合造成的产物混乱。"
      },
      "options": [
        {
          "id": "a",
          "label": "PhCHO 没有 α-H"
        },
        {
          "id": "b",
          "label": "PhCHO 没有羰基"
        },
        {
          "id": "c",
          "label": "PhCHO 是强碱"
        }
      ],
      "answer": "a",
      "formula": "PhCHO：无 α-H；丙酮：有 α-H → enolate"
    },
    {
      "id": "d09-donor-acceptor-01",
      "day": 9,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.aldol",
      "skillIds": [
        "enolate.aldol"
      ],
      "difficulty": 2,
      "prompt": "Aldol 的 C–C 新键通常形成在哪两个位置之间？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "α-C → 羰基 C。",
        "why": "enolate 的碳端是亲核体，羰基碳是亲电体。",
        "full": "把“谁攻击谁”说清，就能避免只背产物。"
      },
      "options": [
        {
          "id": "a",
          "label": "enolate 的 α-C 与另一个羰基 C"
        },
        {
          "id": "b",
          "label": "两个 O 原子"
        },
        {
          "id": "c",
          "label": "两个羰基 O"
        }
      ],
      "answer": "a",
      "formula": "enolate Cα → C=O carbon"
    },
    {
      "id": "d09-no-alpha-01",
      "day": 9,
      "type": "choice",
      "role": "practice",
      "primarySkill": "enolate.alpha_h",
      "skillIds": [
        "enolate.alpha_h"
      ],
      "difficulty": 2,
      "prompt": "下列哪个羰基化合物没有 α-H？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "苯甲醛没有 α-H。",
        "why": "CHO 直接连芳环，羰基旁边没有带 H 的 sp³ α-C。",
        "full": "因此它常用于可控交叉 Aldol 作为亲电受体。"
      },
      "options": [
        {
          "id": "a",
          "label": "苯甲醛 PhCHO"
        },
        {
          "id": "b",
          "label": "乙醛 CH₃CHO"
        },
        {
          "id": "c",
          "label": "丙酮 (CH₃)₂CO"
        }
      ],
      "answer": "a",
      "formula": "Ph–CHO：无 α-H"
    },
    {
      "id": "d09-acidity-rank-01",
      "day": 9,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "ranking.acidity",
      "skillIds": [
        "ranking.acidity",
        "enolate.alpha_h"
      ],
      "difficulty": 2,
      "prompt": "按这些 C–H 的典型酸性由强到弱排序。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "β-二羰基活泼亚甲基 > 普通酮 α-H >> 烷烃。",
        "why": "共轭碱能被越多吸电子羰基共振稳定，酸性越强。",
        "full": "这会为 Day10 的 β-二羰基化学做铺垫。"
      },
      "items": [
        {
          "id": "bd",
          "label": "β-二羰基中央 CH₂"
        },
        {
          "id": "ket",
          "label": "酮 α-H"
        },
        {
          "id": "alk",
          "label": "烷烃 C–H"
        }
      ],
      "correctOrder": [
        "bd",
        "ket",
        "alk"
      ],
      "answer": [
        "bd",
        "ket",
        "alk"
      ]
    },
    {
      "id": "d09-route-aldol-01",
      "day": 9,
      "type": "route",
      "role": "transfer",
      "primarySkill": "enolate.aldol",
      "skillIds": [
        "enolate.aldol",
        "synthesis.last_step"
      ],
      "difficulty": 3,
      "prompt": "从两分子乙醛走到巴豆醛，哪条顺序最合理？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先 Aldol 成键，再脱水。",
        "why": "两步分别解决“接碳”和“共轭双键”。",
        "full": "多步题要把功能拆开：第一步建 C–C，第二步调氧化/不饱和状态。"
      },
      "graph": {
        "start": "acet",
        "target": "croton",
        "nodes": [
          {
            "id": "acet",
            "label": "2 CH₃CHO",
            "structure": "2 CH₃CHO"
          },
          {
            "id": "aldol",
            "label": "3-羟基丁醛",
            "structure": "CH₃CH(OH)CH₂CHO"
          },
          {
            "id": "croton",
            "label": "巴豆醛",
            "structure": "CH₃CH=CHCHO"
          },
          {
            "id": "acid",
            "label": "乙酸支路",
            "structure": "CH₃CO₂H"
          }
        ],
        "edges": [
          {
            "id": "add",
            "from": "acet",
            "to": "aldol",
            "choice": "稀 OH⁻，低温 Aldol 加成",
            "reagent": "OH⁻",
            "status": "green",
            "reason": "先形成 β-羟基醛。"
          },
          {
            "id": "dehyd",
            "from": "aldol",
            "to": "croton",
            "choice": "加热脱水",
            "reagent": "Δ",
            "status": "green",
            "reason": "得到共轭 α,β-不饱和醛。"
          },
          {
            "id": "oxid",
            "from": "acet",
            "to": "acid",
            "choice": "强氧化",
            "reagent": "[O]",
            "status": "red",
            "reason": "氧化成酸后不再是本题 Aldol 路线。"
          }
        ],
        "referenceRoutes": [
          [
            "add",
            "dehyd"
          ]
        ]
      },
      "answer": {
        "acceptedPaths": [
          [
            "add",
            "dehyd"
          ]
        ],
        "preferredPath": [
          "add",
          "dehyd"
        ]
      }
    }
  ],
  "repairs": {
    "enolate.alpha_h": [
      {
        "id": "d09-repair-alpha-01",
        "day": 9,
        "type": "choice",
        "role": "repair",
        "primarySkill": "enolate.alpha_h",
        "skillIds": [
          "enolate.alpha_h"
        ],
        "difficulty": 2,
        "prompt": "丙酮里的 α-C 在哪里？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "两侧甲基碳。",
          "why": "它们直接邻接羰基碳。",
          "full": "α-H 就在这些碳上。"
        },
        "options": [
          {
            "id": "a",
            "label": "羰基两侧甲基碳"
          },
          {
            "id": "b",
            "label": "羰基氧"
          }
        ],
        "answer": "a"
      }
    ],
    "enolate.aldol": [
      {
        "id": "d09-repair-aldol-01",
        "day": 9,
        "type": "choice",
        "role": "repair",
        "primarySkill": "enolate.aldol",
        "skillIds": [
          "enolate.aldol"
        ],
        "difficulty": 2,
        "prompt": "Aldol 新 C–C 键由谁攻谁？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "α-C 攻羰基 C。",
          "why": "这是 C–C 成键核心。",
          "full": "先找 donor enolate，再找 acceptor carbonyl。"
        },
        "options": [
          {
            "id": "a",
            "label": "enolate α-C 攻羰基 C"
          },
          {
            "id": "b",
            "label": "O 攻 O"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "α-H：羰基相邻碳上的 H",
    "enolate：C负式 ↔ O负式",
    "Aldol：enolate α-C → 另一羰基 C",
    "β-羟基羰基 →[Δ] α,β-不饱和羰基",
    "交叉 Aldol 常让一方无 α-H"
  ]
};
})();
