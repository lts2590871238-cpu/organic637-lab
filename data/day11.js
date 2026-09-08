(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[11] = {
  "day": 11,
  "title": "芳香性与 EAS：先保护芳香稳定，再学取代基“路牌”",
  "subtitle": "今天从“为什么苯不爱普通加成”开始，把硝化、卤代、Friedel–Crafts 统一成 EAS，再用活化/钝化与邻对间定位做路线判断。",
  "estimatedMinutes": 90,
  "objectives": [
    "用四条件/Hückel判断芳香性",
    "理解 EAS 恢复芳香性的驱动力",
    "识别常见亲电体",
    "掌握活化/钝化与定位",
    "牢记卤素例外",
    "理解 Friedel–Crafts 优缺点"
  ],
  "lessons": [
    {
      "id": "d11-lesson-aromaticity",
      "eyebrow": "",
      "title": "芳香性像“环形共享电子毯”：必须四个条件同时满足",
      "body": "要芳香：环状、近似平面、每个环原子都有 p 轨道连续共轭，并满足 Hückel 4n+2 π 电子。少一个条件都不能直接贴“芳香”标签。",
      "note": "4n π 电子在满足其它条件时属于反芳香，不是“弱一点的芳香”。",
      "formulas": [
        "Hückel：π e⁻ = 4n + 2（n=0,1,2…）",
        "苯：6 π e⁻ → n=1"
      ],
      "analogy": {
        "title": "像一圈人共同托着一张毯子",
        "body": "必须围成闭环、每个人都能接力、电子数还要刚好适合稳定的环流。",
        "boundary": "真实芳香性涉及分子轨道与能量，不是电子在环上绕圈跑。"
      }
    },
    {
      "id": "d11-lesson-why-substitution",
      "eyebrow": "",
      "title": "苯为什么偏爱“取代”而不是普通加成？因为不想永久撕掉芳香稳定",
      "body": "EAS 第一步亲电体 E⁺ 攻环形成 σ-络合物，芳香性暂时失去；随后去 H⁺ 恢复 π 系统和芳香性。所以净结果是 H 被 E 取代。",
      "note": "第一步通常是能垒高的关键步骤，因为暂时失去芳香性。",
      "formulas": [
        "Ar–H + E⁺ → σ-complex → Ar–E + H⁺"
      ],
      "analogy": {
        "title": "像一张很珍贵的环形弹簧网",
        "body": "可以暂时按下去接上新东西，但系统会努力恢复原来的闭环稳定。",
        "boundary": "某些强条件下芳环也能加成/氧化，这里讨论典型 EAS。"
      }
    },
    {
      "id": "d11-lesson-electrophiles",
      "eyebrow": "",
      "title": "硝化、卤代、磺化、Friedel–Crafts 只是“换了不同 E⁺”",
      "body": "把反应名背成一个亲电体生成表更省力：NO₂⁺、Br⁺等效亲电体、SO₃/H⁺、R⁺/酰鎓离子。后面的芳环进攻母机理相同。",
      "note": "先识别亲电体，再看原有取代基决定它去哪里。",
      "formulas": [
        "HNO₃/H₂SO₄ → NO₂⁺",
        "Br₂/FeBr₃ → 活化 Br electrophile",
        "RCOCl/AlCl₃ → RCO⁺（酰鎓）"
      ],
      "analogy": {
        "title": "同一个门禁系统，换不同访客",
        "body": "芳环的反应动作类似，来的访客 E⁺ 不同。",
        "boundary": "亲电体实际结构可能是配合物，不一定是完全自由离子。"
      }
    },
    {
      "id": "d11-lesson-directing",
      "eyebrow": "",
      "title": "取代基像“路牌”：它改变哪里形成的 σ-络合物更稳定",
      "body": "给电子基通常活化并邻/对位定位；强吸电子基通常钝化并间位定位。判断不是靠位置口诀，而是比较关键 σ-络合物共振式能否被取代基稳定/强烈去稳定。",
      "note": "先判断活化/钝化，再判断方向。",
      "formulas": [
        "–OH, –OR, –NH₂, –R：常 o/p 定位（强弱不同）",
        "–NO₂, –CHO, –COR, –CO₂R, –CN：常 meta 定位"
      ],
      "analogy": {
        "title": "像路牌既决定“这条路快不快”，也决定“往哪边拐”",
        "body": "取代基同时改变整体反应速度和空间位置偏好。",
        "boundary": "多取代时多个路牌可能冲突，需要综合。"
      }
    },
    {
      "id": "d11-lesson-halogen",
      "eyebrow": "",
      "title": "卤素是经典“反常路牌”：钝化，但邻/对位定位",
      "body": "F/Cl/Br/I 通过 −I 吸电子使芳环总体变慢；但孤对电子能在邻/对位 σ-络合物中提供共振稳定，所以方向仍是 o/p。",
      "note": "考试最爱把“钝化=间位”这个错误直觉抓出来。",
      "formulas": [
        "Ar–Cl：deactivating but ortho/para directing"
      ],
      "analogy": {
        "title": "像限速牌旁边又放了方向牌",
        "body": "它让整条路变慢，但仍把车辆更多导向邻/对位出口。",
        "boundary": "活性与定位是两个不同问题。"
      }
    },
    {
      "id": "d11-lesson-fc",
      "eyebrow": "",
      "title": "Friedel–Crafts 是装碳骨架的强工具，但也有明显禁区",
      "body": "烷基化可发生碳正离子重排且烷基会活化芳环，可能多烷基化；酰基化用酰鎓离子，通常不重排且酰基使环钝化，常更容易控制单取代。强钝化芳环和游离 –NH₂ 等与 AlCl₃ 配位时常不适合。",
      "note": "需要直链烷基时常“先酰基化，再还原 C=O”避免重排。",
      "formulas": [
        "Ar–H + RCl/AlCl₃ → Ar–R",
        "Ar–H + RCOCl/AlCl₃ → Ar–COR"
      ],
      "analogy": {
        "title": "烷基化像直接搬家具，可能在楼道里变形；酰基化像先装进硬箱子再搬",
        "body": "酰鎓离子较稳定不易重排，路线更可控。",
        "boundary": "还原步骤和底物兼容性仍需单独审计。"
      }
    }
  ],
  "questions": [
    {
      "id": "d11-benzene-arom-01",
      "day": 11,
      "type": "choice",
      "role": "learn",
      "primarySkill": "aromatic.aromaticity",
      "skillIds": [
        "aromatic.aromaticity"
      ],
      "difficulty": 2,
      "prompt": "苯为什么满足 Hückel 芳香性？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "四条件同时满足，6π=4n+2。",
        "why": "n=1 时 4n+2=6。",
        "full": "芳香性不是只数双键，环状、平面、连续 p 轨道同样必要。"
      },
      "options": [
        {
          "id": "a",
          "label": "环状平面连续共轭且有 6π=4n+2"
        },
        {
          "id": "b",
          "label": "因为有三个双键所以任何三烯都芳香"
        },
        {
          "id": "c",
          "label": "因为分子式是 C₆H₆"
        }
      ],
      "answer": "a",
      "formula": "benzene: 6 π e⁻ = 4(1)+2"
    },
    {
      "id": "d11-cyclobutadiene-01",
      "day": 11,
      "type": "choice",
      "role": "practice",
      "primarySkill": "aromatic.aromaticity",
      "skillIds": [
        "aromatic.aromaticity"
      ],
      "difficulty": 2,
      "prompt": "若环丁二烯理想化为平面连续共轭，它有 4π 电子，属于？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "4n π（n=1）对应反芳香。",
        "why": "满足环/平面/共轭却是 4n 电子会特别不稳定。",
        "full": "现实分子会通过结构畸变等方式降低反芳香不稳定。"
      },
      "options": [
        {
          "id": "a",
          "label": "反芳香"
        },
        {
          "id": "b",
          "label": "芳香"
        },
        {
          "id": "c",
          "label": "非共轭烷烃"
        }
      ],
      "answer": "a",
      "formula": "4 π = 4n"
    },
    {
      "id": "d11-eas-net-01",
      "day": 11,
      "type": "choice",
      "role": "practice",
      "primarySkill": "aromatic.eas_mechanism",
      "skillIds": [
        "aromatic.eas_mechanism"
      ],
      "difficulty": 2,
      "prompt": "典型 EAS 的净结果是什么？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "H 被 E 取代。",
        "why": "σ-络合物暂时失芳香，去 H⁺ 后恢复。",
        "full": "所以叫 electrophilic aromatic substitution，而不是普通 alkene addition。"
      },
      "options": [
        {
          "id": "a",
          "label": "芳环上的 H 被 E 取代，芳香性恢复"
        },
        {
          "id": "b",
          "label": "永久把 E 和 H 都加到相邻碳并失去芳香性"
        },
        {
          "id": "c",
          "label": "芳环被切开"
        }
      ],
      "answer": "a",
      "formula": "Ar–H + E⁺ → Ar–E + H⁺"
    },
    {
      "id": "d11-nitration-01",
      "day": 11,
      "type": "choice",
      "role": "practice",
      "primarySkill": "aromatic.eas_mechanism",
      "skillIds": [
        "aromatic.eas_mechanism"
      ],
      "difficulty": 2,
      "prompt": "苯硝化 HNO₃/H₂SO₄ 中关键亲电体是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "硝鎓离子 NO₂⁺。",
        "why": "强酸混合物把硝酸转成更强亲电体。",
        "full": "芳环 π 电子进攻 NO₂⁺，再去质子化恢复芳香性。"
      },
      "options": [
        {
          "id": "a",
          "label": "NO₂⁺"
        },
        {
          "id": "b",
          "label": "NO₃⁻"
        },
        {
          "id": "c",
          "label": "OH⁻"
        }
      ],
      "answer": "a",
      "formula": "HNO₃ + H₂SO₄ → NO₂⁺ + ..."
    },
    {
      "id": "d11-activation-rank-01",
      "day": 11,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "aromatic.activation",
      "skillIds": [
        "aromatic.activation",
        "ranking.reactivity"
      ],
      "difficulty": 2,
      "prompt": "按 EAS 反应活性由高到低排（基础）。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "PhOCH₃ > benzene > PhNO₂。",
        "why": "OMe 共振给电子活化；NO₂ 强吸电子钝化。",
        "full": "把取代基对 σ-络合物的稳定作用作为根本判断。"
      },
      "items": [
        {
          "id": "anis",
          "label": "苯甲醚 PhOCH₃"
        },
        {
          "id": "benz",
          "label": "苯"
        },
        {
          "id": "nitro",
          "label": "硝基苯 PhNO₂"
        }
      ],
      "correctOrder": [
        "anis",
        "benz",
        "nitro"
      ],
      "answer": [
        "anis",
        "benz",
        "nitro"
      ]
    },
    {
      "id": "d11-direct-oh-01",
      "day": 11,
      "type": "choice",
      "role": "practice",
      "primarySkill": "aromatic.orientation",
      "skillIds": [
        "aromatic.orientation"
      ],
      "difficulty": 2,
      "prompt": "苯酚进行温和 EAS 时，–OH 通常把新取代基主要导向？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "邻/对位。",
        "why": "O 孤对可共振给电子，特别稳定 o/p σ-络合物。",
        "full": "–OH 还是强活化基，因此反应通常比苯快。"
      },
      "options": [
        {
          "id": "a",
          "label": "邻/对位"
        },
        {
          "id": "b",
          "label": "间位"
        },
        {
          "id": "c",
          "label": "没有任何方向性"
        }
      ],
      "answer": "a",
      "formula": "Ph–OH → o/p director"
    },
    {
      "id": "d11-direct-no2-01",
      "day": 11,
      "type": "choice",
      "role": "practice",
      "primarySkill": "aromatic.orientation",
      "skillIds": [
        "aromatic.orientation"
      ],
      "difficulty": 2,
      "prompt": "硝基苯再硝化，新 NO₂ 主要进哪里？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "主要间位。",
        "why": "原 –NO₂ 强吸电子，邻/对位 σ-络合物出现特别不利的正电布局。",
        "full": "因此 –NO₂ 是强钝化 meta director。"
      },
      "options": [
        {
          "id": "a",
          "label": "间位"
        },
        {
          "id": "b",
          "label": "只对位"
        },
        {
          "id": "c",
          "label": "只邻位"
        }
      ],
      "answer": "a",
      "formula": "PhNO₂ + nitration → m-dinitrobenzene"
    },
    {
      "id": "d11-halogen-01",
      "day": 11,
      "type": "choice",
      "role": "practice",
      "primarySkill": "aromatic.halogen_exception",
      "skillIds": [
        "aromatic.halogen_exception"
      ],
      "difficulty": 2,
      "prompt": "氯苯的 –Cl 对 EAS 的两个标签是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "钝化但 o/p 定位。",
        "why": "−I 降低总体活性，孤对共振决定 o/p 方向。",
        "full": "速度和方向必须分开记。"
      },
      "options": [
        {
          "id": "a",
          "label": "钝化，但邻/对位定位"
        },
        {
          "id": "b",
          "label": "活化，间位定位"
        },
        {
          "id": "c",
          "label": "活化，邻/对位定位"
        }
      ],
      "answer": "a",
      "formula": "Ar–Cl: deactivating; o/p-directing"
    },
    {
      "id": "d11-fc-alkyl-01",
      "day": 11,
      "type": "choice",
      "role": "practice",
      "primarySkill": "aromatic.friedel_crafts",
      "skillIds": [
        "aromatic.friedel_crafts"
      ],
      "difficulty": 2,
      "prompt": "苯 + 1-氯丙烷/AlCl₃ 做 Friedel–Crafts 烷基化，为什么可能不干净地得到正丙苯？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "存在碳正离子重排风险。",
        "why": "一级丙基正离子不稳定，可能重排/等效形成更稳定亲电体。",
        "full": "需要直链侧链时常用酰基化再还原更可控。"
      },
      "options": [
        {
          "id": "a",
          "label": "中间体可重排为更稳定碳正离子"
        },
        {
          "id": "b",
          "label": "苯没有 π 电子"
        },
        {
          "id": "c",
          "label": "AlCl₃ 是强还原剂"
        }
      ],
      "answer": "a",
      "formula": "PhH + RCl/AlCl₃ → rearrangement risk"
    },
    {
      "id": "d11-fc-acyl-01",
      "day": 11,
      "type": "choice",
      "role": "practice",
      "primarySkill": "aromatic.friedel_crafts",
      "skillIds": [
        "aromatic.friedel_crafts"
      ],
      "difficulty": 2,
      "prompt": "Friedel–Crafts 酰基化相比烷基化，一个重要优点是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "通常不重排且更易控制。",
        "why": "酰鎓离子有共振稳定，且产物酰基会钝化芳环。",
        "full": "这使酰基化成为构建芳基酮的可靠工具。"
      },
      "options": [
        {
          "id": "a",
          "label": "酰鎓离子通常不发生普通碳正离子重排"
        },
        {
          "id": "b",
          "label": "一定产生多取代"
        },
        {
          "id": "c",
          "label": "只能用于硝基苯"
        }
      ],
      "answer": "a",
      "formula": "ArH + RCOCl/AlCl₃ → ArCOR"
    },
    {
      "id": "d11-fc-limit-01",
      "day": 11,
      "type": "choice",
      "role": "practice",
      "primarySkill": "aromatic.friedel_crafts",
      "skillIds": [
        "aromatic.friedel_crafts",
        "synthesis.compatibility"
      ],
      "difficulty": 2,
      "prompt": "强烈钝化的硝基苯做 Friedel–Crafts 烷基化通常怎样？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "通常很困难。",
        "why": "NO₂ 大幅降低芳环亲核性，无法顺利攻击 FC 亲电体。",
        "full": "合成路线中若先把强钝化基装上，可能堵死后面的 FC 步骤。"
      },
      "options": [
        {
          "id": "a",
          "label": "很困难/通常不发生"
        },
        {
          "id": "b",
          "label": "比苯快很多"
        },
        {
          "id": "c",
          "label": "必定邻位"
        }
      ],
      "answer": "a",
      "formula": "PhNO₂ + RCl/AlCl₃ → no useful FC"
    },
    {
      "id": "d11-multi-direct-01",
      "day": 11,
      "type": "choice",
      "role": "practice",
      "primarySkill": "aromatic.multisubstituent",
      "skillIds": [
        "aromatic.multisubstituent"
      ],
      "difficulty": 2,
      "prompt": "对甲氧基硝基苯继续 EAS 时，若两个取代基指向同一位置，这个位置通常？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "通常成为很有利位置。",
        "why": "多个定位效应一致时会叠加。",
        "full": "若冲突，则常让更强活化基主导，同时考虑位阻。"
      },
      "options": [
        {
          "id": "a",
          "label": "优先性很高"
        },
        {
          "id": "b",
          "label": "一定被禁止"
        },
        {
          "id": "c",
          "label": "与定位无关"
        }
      ],
      "answer": "a",
      "formula": "multiple directing groups → combine effects"
    },
    {
      "id": "d11-route-ethylbenzene-01",
      "day": 11,
      "type": "route",
      "role": "transfer",
      "primarySkill": "synthesis.last_step",
      "skillIds": [
        "aromatic.friedel_crafts",
        "synthesis.route_evaluation"
      ],
      "difficulty": 3,
      "prompt": "想从苯得到正丙苯且尽量避免烷基重排，哪条路线更稳？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先酰基化，再去羰基。",
        "why": "把“重排风险”当作路线兼容性问题。",
        "full": "合成题不是知道反应就够，还要知道哪种顺序更可控。"
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
            "label": "苯丙酮/芳基酮",
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
            "reason": "酰基化不发生普通重排。"
          },
          {
            "id": "reduce",
            "from": "ket",
            "to": "propyl",
            "choice": "把 C=O 还原成 CH₂",
            "reagent": "Zn(Hg)/HCl 或 NH₂NH₂/KOH",
            "status": "green",
            "reason": "得到直链烷基。"
          },
          {
            "id": "direct",
            "from": "benz",
            "to": "iso",
            "choice": "1-Cl-propane/AlCl₃ 直接烷基化",
            "reagent": "CH₃CH₂CH₂Cl/AlCl₃",
            "status": "yellow",
            "reason": "可能重排，路线选择性较差。"
          }
        ],
        "referenceRoutes": [
          [
            "acyl",
            "reduce"
          ]
        ]
      },
      "answer": {
        "acceptedPaths": [
          [
            "acyl",
            "reduce"
          ]
        ],
        "preferredPath": [
          "acyl",
          "reduce"
        ]
      }
    }
  ],
  "repairs": {
    "aromatic.orientation": [
      {
        "id": "d11-repair-dir-01",
        "day": 11,
        "type": "choice",
        "role": "repair",
        "primarySkill": "aromatic.orientation",
        "skillIds": [
          "aromatic.orientation"
        ],
        "difficulty": 2,
        "prompt": "–NO₂ 是哪类定位基？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "间位。",
          "why": "强吸电子基。",
          "full": "–OH/OR/NH₂/R 常o/p；–NO₂/CHO/COR/CO₂R/CN 常meta。"
        },
        "options": [
          {
            "id": "a",
            "label": "间位"
          },
          {
            "id": "b",
            "label": "邻对位"
          }
        ],
        "answer": "a"
      }
    ],
    "aromatic.halogen_exception": [
      {
        "id": "d11-repair-hal-01",
        "day": 11,
        "type": "choice",
        "role": "repair",
        "primarySkill": "aromatic.halogen_exception",
        "skillIds": [
          "aromatic.halogen_exception"
        ],
        "difficulty": 2,
        "prompt": "–Br 在芳环上是？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "钝化但邻/对位。",
          "why": "诱导吸电子 + 孤对共振。",
          "full": "把活性和方向分开。"
        },
        "options": [
          {
            "id": "a",
            "label": "钝化但邻对位"
          },
          {
            "id": "b",
            "label": "活化且间位"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "芳香：环状+平面+连续共轭+4n+2π",
    "EAS：暂时失芳香→去H恢复",
    "给电子基多为活化o/p；强吸电子多为钝化meta",
    "卤素：钝化但o/p",
    "FC烷基化有重排/多取代；酰基化更可控"
  ]
};
})();
