(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[20] = {
  "day": 20,
  "title": "Top 3 漏洞修复 + 迁移 Boss",
  "subtitle": "系统根据前19天证据挑三处最危险的技能：每处诊断、修复、换结构迁移，最后再做一组混合Boss。",
  "estimatedMinutes": 90,
  "mode": "adaptive",
  "objectives": [
    "修复Top3漏洞",
    "用新结构验证迁移",
    "完成最终Boss",
    "生成稳定/风险/易忘能力总结"
  ],
  "lessons": [
    {
      "id": "d20-lesson-repair",
      "eyebrow": "",
      "title": "最后一天不再“重学整本书”，只堵最漏的三处",
      "body": "系统会结合 Day19、effective mastery、跨日验证和高置信错误，选 Top3。每个漏洞走三步：诊断→修复→换结构迁移。",
      "note": "今天最重要的是修复，而不是刷很多熟题。",
      "formulas": [
        "Top3 = low effective mastery + high-confidence wrong + no cross-day/transfer evidence"
      ],
      "analogy": {
        "title": "像屋顶漏水：只修三处最严重的洞",
        "body": "不把整个屋顶拆了重盖。",
        "boundary": "如果历史数据不足，就回退到高频核心技能。"
      }
    },
    {
      "id": "d20-lesson-transfer",
      "eyebrow": "",
      "title": "修复成功不等于结束：必须换结构再做一次",
      "body": "同题重做容易记答案。真正修复要换底物、换问法或反方向，再看能否无提示做出。",
      "note": "迁移题成功才是“这条路真的通了”的更强证据。",
      "formulas": [
        "diagnose → repair → transfer"
      ],
      "analogy": {
        "title": "像学会游泳不能只在同一个浅水池动作",
        "body": "换到稍不同的水域还能做，才说明技能属于你。",
        "boundary": "20天后仍需周期复习保持长期稳定。"
      }
    },
    {
      "id": "d20-lesson-finish",
      "eyebrow": "",
      "title": "最终结果只说“稳定、风险、易忘”，不假装给命运判决",
      "body": "网站给训练估计区间、稳定能力、风险能力和下一次复习建议。目标线120/150只有当未见题和迁移都接近80%时才有底气。",
      "note": "它不是正式考试保证。",
      "formulas": [
        "hidden unseen ≥80% + transfer ≥75% → 接近120目标线（训练意义）"
      ],
      "analogy": {
        "title": "像体检报告，不是“你的人生分数”",
        "body": "告诉你哪里强、哪里需要继续练，而不是给虚假的确定性。",
        "boundary": "实际考试还受时间、心理、题目分布等影响。"
      }
    }
  ],
  "questions": [
    {
      "id": "d20-boss-01",
      "day": 20,
      "type": "multi-choice",
      "role": "boss",
      "primarySkill": "exam.mixed_transfer",
      "skillIds": [
        "exam.mixed_transfer"
      ],
      "difficulty": 2,
      "prompt": "Boss混合：选择所有正确项。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "A、C正确。",
        "why": "Lindlar给cis；三级SN2位阻大。",
        "full": "跨章节切换。"
      },
      "options": [
        {
          "id": "a",
          "label": "HBr/ROOR 对烯烃常反Markovnikov"
        },
        {
          "id": "b",
          "label": "Lindlar给trans烯烃"
        },
        {
          "id": "c",
          "label": "SN1可重排"
        },
        {
          "id": "d",
          "label": "三级RX适合SN2"
        }
      ],
      "answer": [
        "a",
        "c"
      ],
      "formula": "mixed"
    },
    {
      "id": "d20-boss-02",
      "day": 20,
      "type": "ranking",
      "role": "boss",
      "primarySkill": "ranking.reactivity",
      "skillIds": [
        "ranking.reactivity"
      ],
      "difficulty": 2,
      "prompt": "Boss排序：由高到低。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "酰氯很活泼；酰胺最不活泼。",
        "why": "不同体系不能严格同一数值比较，但本科反应性直觉中酰氯对Nu最敏感、酰胺最被共振钝化。",
        "full": "本题训练快速识别“谁最容易被亲核体攻击”。"
      },
      "items": [
        {
          "id": "acl",
          "label": "RCOCl酰氯"
        },
        {
          "id": "ket",
          "label": "一般酮对Nu加成反应性"
        },
        {
          "id": "amide",
          "label": "RCONR₂酰胺酰基取代活性"
        }
      ],
      "correctOrder": [
        "acl",
        "ket",
        "amide"
      ],
      "answer": [
        "acl",
        "ket",
        "amide"
      ]
    },
    {
      "id": "d20-boss-03",
      "day": 20,
      "type": "choice",
      "role": "boss",
      "primarySkill": "structure.constraint_elimination",
      "skillIds": [
        "structure.constraint_elimination"
      ],
      "difficulty": 2,
      "prompt": "Boss结构：C₃H₆O，IR C=O；NMR只有一个6H singlet。结构？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "丙酮。",
        "why": "对称两个甲基等价。",
        "full": "丙醛会有醛氢等多组。"
      },
      "options": [
        {
          "id": "a",
          "label": "丙酮"
        },
        {
          "id": "b",
          "label": "丙醛"
        }
      ],
      "answer": "a",
      "formula": "(CH₃)₂CO"
    },
    {
      "id": "d20-boss-04",
      "day": 20,
      "type": "choice",
      "role": "boss",
      "primarySkill": "synthesis.disconnection",
      "skillIds": [
        "synthesis.disconnection"
      ],
      "difficulty": 2,
      "prompt": "Boss合成：叔丁醇最自然由哪个羰基+Grignard？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "丙酮+MeMgBr。",
        "why": "酮+R给3°醇。",
        "full": "碳数3+1=4。"
      },
      "options": [
        {
          "id": "a",
          "label": "丙酮 + CH₃MgBr"
        },
        {
          "id": "b",
          "label": "乙醛 + CH₃MgBr"
        }
      ],
      "answer": "a",
      "formula": "acetone + MeMgBr → t-BuOH"
    },
    {
      "id": "d20-boss-05",
      "day": 20,
      "type": "choice",
      "role": "boss",
      "primarySkill": "aromatic.multisubstituent",
      "skillIds": [
        "aromatic.multisubstituent"
      ],
      "difficulty": 2,
      "prompt": "Boss芳香：目标间硝基苯甲酸，若从苯甲酸再硝化，CO₂H定位作用？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "meta。",
        "why": "CO₂H强吸电子meta director。",
        "full": "所以先做苯甲酸再硝化可利用定位。"
      },
      "options": [
        {
          "id": "a",
          "label": "meta"
        },
        {
          "id": "b",
          "label": "o/p"
        }
      ],
      "answer": "a",
      "formula": "PhCO₂H + nitration → meta major"
    },
    {
      "id": "d20-boss-06",
      "day": 20,
      "type": "choice",
      "role": "boss",
      "primarySkill": "exam.mixed_transfer",
      "skillIds": [
        "exam.mixed_transfer"
      ],
      "difficulty": 2,
      "prompt": "最后检查：如果一道路线“结果对但理由是三级SN2”，系统应该怎么判？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "理由必须修复。",
        "why": "正确结果不等于掌握。",
        "full": "能力模型要保存正确步骤和错误理由的差异。"
      },
      "options": [
        {
          "id": "a",
          "label": "结果可能碰巧对，但机理理由必须标为待修复"
        },
        {
          "id": "b",
          "label": "只看最后结构直接满分"
        }
      ],
      "answer": "a",
      "formula": "correct result ≠ correct reasoning"
    }
  ],
  "repairs": {},
  "adaptivePools": {
    "alkene": [
      {
        "id": "d20-alkene-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "alkene.condition_discrimination",
        "skillIds": [
          "alkene.condition_discrimination"
        ],
        "difficulty": 2,
        "prompt": "Br₂/H₂O 与 Br₂/CCl₄ 的关键产物差别？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "水参与使前者成为卤代醇。",
          "why": "水参与使前者成为卤代醇。",
          "full": "水参与使前者成为卤代醇。"
        },
        "options": [
          {
            "id": "a",
            "label": "前者Br/OH，后者Br/Br"
          },
          {
            "id": "b",
            "label": "完全一样"
          }
        ],
        "answer": "a",
        "formula": "C=C + Br₂/H₂O → Br/OH"
      },
      {
        "id": "d20-alkene-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "alkene.hbr_peroxide",
        "skillIds": [
          "alkene.hbr_peroxide"
        ],
        "difficulty": 2,
        "prompt": "丙烯+HBr/ROOR，Br主要到？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "ROOR切到自由基反Markovnikov。",
          "why": "ROOR切到自由基反Markovnikov。",
          "full": "ROOR切到自由基反Markovnikov。"
        },
        "options": [
          {
            "id": "a",
            "label": "末端较少取代碳"
          },
          {
            "id": "b",
            "label": "中间较多取代碳"
          }
        ],
        "answer": "a",
        "formula": "CH₃CH=CH₂→CH₃CH₂CH₂Br"
      },
      {
        "id": "d20-alkene-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "alkene.ozonolysis",
        "skillIds": [
          "alkene.ozonolysis"
        ],
        "difficulty": 2,
        "prompt": "2-丁烯 O₃/Zn,H₂O 裂解？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "还原性后处理保留醛。",
          "why": "还原性后处理保留醛。",
          "full": "还原性后处理保留醛。"
        },
        "options": [
          {
            "id": "a",
            "label": "2 CH₃CHO"
          },
          {
            "id": "b",
            "label": "2 CH₃CO₂H"
          }
        ],
        "answer": "a",
        "formula": "CH₃CH=CHCH₃→2CH₃CHO"
      }
    ],
    "substitution": [
      {
        "id": "d20-sub-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "substitution.sn2",
        "skillIds": [
          "substitution.sn2"
        ],
        "difficulty": 2,
        "prompt": "1-溴丁烷+CN⁻/DMSO主机理？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "一级+强亲核+非质子溶剂→SN2。",
          "why": "一级+强亲核+非质子溶剂→SN2。",
          "full": "一级+强亲核+非质子溶剂→SN2。"
        },
        "options": [
          {
            "id": "a",
            "label": "SN2"
          },
          {
            "id": "b",
            "label": "SN1"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-sub-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "substitution.sn1",
        "skillIds": [
          "substitution.sn1"
        ],
        "difficulty": 2,
        "prompt": "叔丁基氯在水/乙醇中先发生？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "SN1慢步是电离。",
          "why": "SN1慢步是电离。",
          "full": "SN1慢步是电离。"
        },
        "options": [
          {
            "id": "a",
            "label": "电离形成3°C⁺"
          },
          {
            "id": "b",
            "label": "CN⁻背面进攻"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-sub-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "substitution.carbocation_rearrangement",
        "skillIds": [
          "substitution.carbocation_rearrangement"
        ],
        "difficulty": 2,
        "prompt": "SN1中出现2°C⁺且相邻可变3°C⁺，要检查？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "自由C⁺要检查重排。",
          "why": "自由C⁺要检查重排。",
          "full": "自由C⁺要检查重排。"
        },
        "options": [
          {
            "id": "a",
            "label": "1,2迁移重排"
          },
          {
            "id": "b",
            "label": "SN2反转"
          }
        ],
        "answer": "a"
      }
    ],
    "elimination": [
      {
        "id": "d20-elim-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "elimination.beta_h",
        "skillIds": [
          "elimination.beta_h"
        ],
        "difficulty": 2,
        "prompt": "E2形成双键必须夺？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "夺β-H。",
          "why": "夺β-H。",
          "full": "夺β-H。"
        },
        "options": [
          {
            "id": "a",
            "label": "β-H"
          },
          {
            "id": "b",
            "label": "同一α-C上的任意H"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-elim-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "elimination.antiperiplanar",
        "skillIds": [
          "elimination.antiperiplanar"
        ],
        "difficulty": 2,
        "prompt": "E2最有利几何？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "反式共平面有利轨道对齐。",
          "why": "反式共平面有利轨道对齐。",
          "full": "反式共平面有利轨道对齐。"
        },
        "options": [
          {
            "id": "a",
            "label": "anti-periplanar"
          },
          {
            "id": "b",
            "label": "完全无关"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-elim-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "elimination.competition",
        "skillIds": [
          "elimination.competition"
        ],
        "difficulty": 2,
        "prompt": "3°RX+t-BuOK/Δ主路？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "位阻+强碱+热→E2。",
          "why": "位阻+强碱+热→E2。",
          "full": "位阻+强碱+热→E2。"
        },
        "options": [
          {
            "id": "a",
            "label": "E2"
          },
          {
            "id": "b",
            "label": "SN2"
          }
        ],
        "answer": "a"
      }
    ],
    "carbonyl": [
      {
        "id": "d20-carb-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "carbonyl.electrophilic_center",
        "skillIds": [
          "carbonyl.electrophilic_center"
        ],
        "difficulty": 2,
        "prompt": "C=O中Nu攻击？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "羰基碳缺电子。",
          "why": "羰基碳缺电子。",
          "full": "羰基碳缺电子。"
        },
        "options": [
          {
            "id": "a",
            "label": "Cδ+"
          },
          {
            "id": "b",
            "label": "Oδ−"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-carb-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "carbonyl.grignard",
        "skillIds": [
          "carbonyl.grignard"
        ],
        "difficulty": 2,
        "prompt": "丙酮+MeMgBr酸化给？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "酮+Grignard→3°醇。",
          "why": "酮+Grignard→3°醇。",
          "full": "酮+Grignard→3°醇。"
        },
        "options": [
          {
            "id": "a",
            "label": "叔丁醇"
          },
          {
            "id": "b",
            "label": "2-丙醇"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-carb-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "carbonyl.wittig",
        "skillIds": [
          "carbonyl.wittig"
        ],
        "difficulty": 2,
        "prompt": "Wittig净变化？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "Wittig烯化。",
          "why": "Wittig烯化。",
          "full": "Wittig烯化。"
        },
        "options": [
          {
            "id": "a",
            "label": "C=O→C=C"
          },
          {
            "id": "b",
            "label": "C=O→CO₂H"
          }
        ],
        "answer": "a"
      }
    ],
    "carboxyl": [
      {
        "id": "d20-acyl-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "carboxyl.reactivity",
        "skillIds": [
          "carboxyl.reactivity"
        ],
        "difficulty": 2,
        "prompt": "酰氯与酰胺谁更活泼？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "酰氯高、酰胺低。",
          "why": "酰氯高、酰胺低。",
          "full": "酰氯高、酰胺低。"
        },
        "options": [
          {
            "id": "a",
            "label": "酰氯"
          },
          {
            "id": "b",
            "label": "酰胺"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-acyl-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "carboxyl.acyl_substitution",
        "skillIds": [
          "carboxyl.acyl_substitution"
        ],
        "difficulty": 2,
        "prompt": "酰基取代的中间体？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "先亲核加成成四面体，再离去。",
          "why": "先亲核加成成四面体，再离去。",
          "full": "先亲核加成成四面体，再离去。"
        },
        "options": [
          {
            "id": "a",
            "label": "四面体中间体"
          },
          {
            "id": "b",
            "label": "自由芳基阳离子"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-acyl-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "carboxyl.hofmann",
        "skillIds": [
          "carboxyl.hofmann"
        ],
        "difficulty": 2,
        "prompt": "RCONH₂→Hofmann后碳数？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "羰基碳以CO₂丢失。",
          "why": "羰基碳以CO₂丢失。",
          "full": "羰基碳以CO₂丢失。"
        },
        "options": [
          {
            "id": "a",
            "label": "少1"
          },
          {
            "id": "b",
            "label": "多1"
          }
        ],
        "answer": "a"
      }
    ],
    "enolate": [
      {
        "id": "d20-enol-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "enolate.alpha_h",
        "skillIds": [
          "enolate.alpha_h"
        ],
        "difficulty": 2,
        "prompt": "α-H在哪？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "α-C是羰基邻碳。",
          "why": "α-C是羰基邻碳。",
          "full": "α-C是羰基邻碳。"
        },
        "options": [
          {
            "id": "a",
            "label": "羰基相邻碳"
          },
          {
            "id": "b",
            "label": "羰基O上"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-enol-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "enolate.aldol",
        "skillIds": [
          "enolate.aldol"
        ],
        "difficulty": 2,
        "prompt": "Aldol新C–C由？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "亲核α-C攻亲电羰基C。",
          "why": "亲核α-C攻亲电羰基C。",
          "full": "亲核α-C攻亲电羰基C。"
        },
        "options": [
          {
            "id": "a",
            "label": "enolate α-C→羰基C"
          },
          {
            "id": "b",
            "label": "O→O"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-enol-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "enolate.michael",
        "skillIds": [
          "enolate.michael"
        ],
        "difficulty": 2,
        "prompt": "Michael主要攻？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "典型1,4加成攻β-C。",
          "why": "典型1,4加成攻β-C。",
          "full": "典型1,4加成攻β-C。"
        },
        "options": [
          {
            "id": "a",
            "label": "共轭β-C"
          },
          {
            "id": "b",
            "label": "羰基O"
          }
        ],
        "answer": "a"
      }
    ],
    "aromatic": [
      {
        "id": "d20-arom-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "aromatic.aromaticity",
        "skillIds": [
          "aromatic.aromaticity"
        ],
        "difficulty": 2,
        "prompt": "苯π电子数满足？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "6π芳香。",
          "why": "6π芳香。",
          "full": "6π芳香。"
        },
        "options": [
          {
            "id": "a",
            "label": "4n+2=6"
          },
          {
            "id": "b",
            "label": "4n=4"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-arom-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "aromatic.orientation",
        "skillIds": [
          "aromatic.orientation"
        ],
        "difficulty": 2,
        "prompt": "NO₂定位？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "强吸电子meta director。",
          "why": "强吸电子meta director。",
          "full": "强吸电子meta director。"
        },
        "options": [
          {
            "id": "a",
            "label": "meta"
          },
          {
            "id": "b",
            "label": "ortho/para"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-arom-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "aromatic.halogen_exception",
        "skillIds": [
          "aromatic.halogen_exception"
        ],
        "difficulty": 2,
        "prompt": "Cl在芳环？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "经典例外。",
          "why": "经典例外。",
          "full": "经典例外。"
        },
        "options": [
          {
            "id": "a",
            "label": "钝化但o/p"
          },
          {
            "id": "b",
            "label": "活化meta"
          }
        ],
        "answer": "a"
      }
    ],
    "amine": [
      {
        "id": "d20-amine-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "amine.basicity",
        "skillIds": [
          "amine.basicity"
        ],
        "difficulty": 2,
        "prompt": "乙胺 vs 苯胺更碱？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "苯胺孤对共振离域。",
          "why": "苯胺孤对共振离域。",
          "full": "苯胺孤对共振离域。"
        },
        "options": [
          {
            "id": "a",
            "label": "乙胺"
          },
          {
            "id": "b",
            "label": "苯胺"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-amine-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "amine.nitro_reduction",
        "skillIds": [
          "amine.nitro_reduction"
        ],
        "difficulty": 2,
        "prompt": "ArNO₂→ArNH₂可用？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "还原硝基。",
          "why": "还原硝基。",
          "full": "还原硝基。"
        },
        "options": [
          {
            "id": "a",
            "label": "Fe/HCl"
          },
          {
            "id": "b",
            "label": "Br₂/CCl₄"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-amine-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "amine.protection",
        "skillIds": [
          "amine.protection"
        ],
        "difficulty": 2,
        "prompt": "苯胺乙酰化目的常是？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "保护调控路线。",
          "why": "保护调控路线。",
          "full": "保护调控路线。"
        },
        "options": [
          {
            "id": "a",
            "label": "调低过强活化/保护"
          },
          {
            "id": "b",
            "label": "永久删NH₂"
          }
        ],
        "answer": "a"
      }
    ],
    "diazonium": [
      {
        "id": "d20-diazo-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "diazonium.formation",
        "skillIds": [
          "diazonium.formation"
        ],
        "difficulty": 2,
        "prompt": "重氮化温度？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "低温稳定。",
          "why": "低温稳定。",
          "full": "低温稳定。"
        },
        "options": [
          {
            "id": "a",
            "label": "0–5°C"
          },
          {
            "id": "b",
            "label": "100°C"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-diazo-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "diazonium.substitution",
        "skillIds": [
          "diazonium.substitution"
        ],
        "difficulty": 2,
        "prompt": "ArN₂⁺+CuCN→？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "Sandmeyer CN。",
          "why": "Sandmeyer CN。",
          "full": "Sandmeyer CN。"
        },
        "options": [
          {
            "id": "a",
            "label": "ArCN"
          },
          {
            "id": "b",
            "label": "ArOH"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-diazo-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "diazonium.substitution",
        "skillIds": [
          "diazonium.substitution"
        ],
        "difficulty": 2,
        "prompt": "ArN₂⁺+H₂O/Δ→？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "水解成酚。",
          "why": "水解成酚。",
          "full": "水解成酚。"
        },
        "options": [
          {
            "id": "a",
            "label": "ArOH"
          },
          {
            "id": "b",
            "label": "ArNH₂"
          }
        ],
        "answer": "a"
      }
    ],
    "structure": [
      {
        "id": "d20-struct-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "structure.dbe",
        "skillIds": [
          "structure.dbe"
        ],
        "difficulty": 2,
        "prompt": "C₆H₆ DBE？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "1环+3双键=4。",
          "why": "1环+3双键=4。",
          "full": "1环+3双键=4。"
        },
        "options": [
          {
            "id": "a",
            "label": "4"
          },
          {
            "id": "b",
            "label": "3"
          }
        ],
        "answer": "a",
        "formula": "DBE=(14−6)/2=4"
      },
      {
        "id": "d20-struct-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "structure.ir",
        "skillIds": [
          "structure.ir"
        ],
        "difficulty": 2,
        "prompt": "1715强峰先看？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "羰基。",
          "why": "羰基。",
          "full": "羰基。"
        },
        "options": [
          {
            "id": "a",
            "label": "C=O"
          },
          {
            "id": "b",
            "label": "O-H"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-struct-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "structure.nmr_splitting",
        "skillIds": [
          "structure.nmr_splitting"
        ],
        "difficulty": 2,
        "prompt": "乙基常见组合？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "CH₂看3H→q，CH₃看2H→t。",
          "why": "CH₂看3H→q，CH₃看2H→t。",
          "full": "CH₂看3H→q，CH₃看2H→t。"
        },
        "options": [
          {
            "id": "a",
            "label": "q(2H)+t(3H)"
          },
          {
            "id": "b",
            "label": "s(5H)"
          }
        ],
        "answer": "a"
      }
    ],
    "stereo": [
      {
        "id": "d20-stereo-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "stereo.cip",
        "skillIds": [
          "stereo.cip"
        ],
        "difficulty": 2,
        "prompt": "CIP直接原子Br/O/C/H谁最高？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "原子序数Br最高。",
          "why": "原子序数Br最高。",
          "full": "原子序数Br最高。"
        },
        "options": [
          {
            "id": "a",
            "label": "Br"
          },
          {
            "id": "b",
            "label": "O"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-stereo-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "stereo.rs",
        "skillIds": [
          "stereo.rs"
        ],
        "difficulty": 2,
        "prompt": "最低优先级背向，1→2→3顺时针？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "R。",
          "why": "R。",
          "full": "R。"
        },
        "options": [
          {
            "id": "a",
            "label": "R"
          },
          {
            "id": "b",
            "label": "S"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-stereo-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "stereo.ez",
        "skillIds": [
          "stereo.ez"
        ],
        "difficulty": 2,
        "prompt": "E/Z第一步？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "先CIP。",
          "why": "先CIP。",
          "full": "先CIP。"
        },
        "options": [
          {
            "id": "a",
            "label": "每端CIP选高优先"
          },
          {
            "id": "b",
            "label": "直接看甲基"
          }
        ],
        "answer": "a"
      }
    ],
    "ranking": [
      {
        "id": "d20-rank-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "ranking.acidity",
        "skillIds": [
          "ranking.acidity"
        ],
        "difficulty": 2,
        "prompt": "酸越强说明？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "看共轭碱稳定。",
          "why": "看共轭碱稳定。",
          "full": "看共轭碱稳定。"
        },
        "options": [
          {
            "id": "a",
            "label": "共轭碱越稳定"
          },
          {
            "id": "b",
            "label": "分子量越大"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-rank-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "ranking.reactivity",
        "skillIds": [
          "ranking.reactivity"
        ],
        "difficulty": 2,
        "prompt": "SN2最怕？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "背面进攻受位阻。",
          "why": "背面进攻受位阻。",
          "full": "背面进攻受位阻。"
        },
        "options": [
          {
            "id": "a",
            "label": "位阻"
          },
          {
            "id": "b",
            "label": "共振稳定羰基"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-rank-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "ranking.boiling_point",
        "skillIds": [
          "ranking.boiling_point"
        ],
        "difficulty": 2,
        "prompt": "相近分子量，醇常比醚沸点高因？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "分子间氢键。",
          "why": "分子间氢键。",
          "full": "分子间氢键。"
        },
        "options": [
          {
            "id": "a",
            "label": "氢键"
          },
          {
            "id": "b",
            "label": "SN1"
          }
        ],
        "answer": "a"
      }
    ],
    "mechanism": [
      {
        "id": "d20-mech-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "mechanism.electron_source",
        "skillIds": [
          "mechanism.electron_source"
        ],
        "difficulty": 2,
        "prompt": "曲箭箭尾从？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "箭尾从电子源。",
          "why": "箭尾从电子源。",
          "full": "箭尾从电子源。"
        },
        "options": [
          {
            "id": "a",
            "label": "孤对/键等已有电子"
          },
          {
            "id": "b",
            "label": "正电符号"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-mech-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "mechanism.nucleophilic_attack",
        "skillIds": [
          "mechanism.nucleophilic_attack"
        ],
        "difficulty": 2,
        "prompt": "Nu对羰基第一支箭？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "电子由Nu送给C。",
          "why": "电子由Nu送给C。",
          "full": "电子由Nu送给C。"
        },
        "options": [
          {
            "id": "a",
            "label": "Nu孤对→羰基C"
          },
          {
            "id": "b",
            "label": "C=O→Nu"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-mech-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "mechanism.leaving",
        "skillIds": [
          "mechanism.leaving"
        ],
        "difficulty": 2,
        "prompt": "C–Br离去箭头？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "键电子给离去基。",
          "why": "键电子给离去基。",
          "full": "键电子给离去基。"
        },
        "options": [
          {
            "id": "a",
            "label": "C–Br键→Br"
          },
          {
            "id": "b",
            "label": "Br→C–Br键"
          }
        ],
        "answer": "a"
      }
    ],
    "synthesis": [
      {
        "id": "d20-syn-1",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "synthesis.carbon_count",
        "skillIds": [
          "synthesis.carbon_count"
        ],
        "difficulty": 2,
        "prompt": "RBr+CN⁻碳数？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "CN碳进入骨架。",
          "why": "CN碳进入骨架。",
          "full": "CN碳进入骨架。"
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
      },
      {
        "id": "d20-syn-2",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "synthesis.last_step",
        "skillIds": [
          "synthesis.last_step"
        ],
        "difficulty": 2,
        "prompt": "目标2°醇最直接羰基前体？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "酮还原给2°醇。",
          "why": "酮还原给2°醇。",
          "full": "酮还原给2°醇。"
        },
        "options": [
          {
            "id": "a",
            "label": "酮"
          },
          {
            "id": "b",
            "label": "酰胺"
          }
        ],
        "answer": "a"
      },
      {
        "id": "d20-syn-3",
        "day": 20,
        "type": "choice",
        "role": "repair",
        "primarySkill": "synthesis.compatibility",
        "skillIds": [
          "synthesis.compatibility"
        ],
        "difficulty": 2,
        "prompt": "RMgX遇游离OH？",
        "examTags": [],
        "hints": [
          "先回到该技能最基础的判据。"
        ],
        "explanationLayers": {
          "short": "酸碱反应优先。",
          "why": "酸碱反应优先。",
          "full": "酸碱反应优先。"
        },
        "options": [
          {
            "id": "a",
            "label": "先被淬灭"
          },
          {
            "id": "b",
            "label": "更快加羰基"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "fallbackSkills": [
    "alkene.condition_discrimination",
    "structure.constraint_elimination",
    "synthesis.last_step"
  ],
  "memorySheet": [
    "不重学整章，只修Top3",
    "repair后必须transfer",
    "高置信错误优先",
    "最终目标：未见题≈80%、迁移≈75%才接近120训练目标线"
  ]
};
})();
