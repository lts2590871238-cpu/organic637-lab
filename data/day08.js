(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[8] = {
  "day": 8,
  "title": "羧酸衍生物：同一个酰基碳，学会“加成—消除”",
  "subtitle": "把酰氯、酸酐、酯、酰胺放成一条活性阶梯，再用同一套四面体中间体解释酯化、水解、酰胺形成和还原。",
  "estimatedMinutes": 90,
  "objectives": [
    "掌握衍生物活性顺序",
    "理解亲核酰基取代",
    "会酯化/水解/皂化",
    "区分 NaBH4/LiAlH4",
    "掌握 Hofmann 减一碳",
    "会从酸经酰氯到酰胺"
  ],
  "lessons": [
    {
      "id": "d08-lesson-family",
      "eyebrow": "",
      "title": "羧酸衍生物是一家“同一个酰基碳，换不同离去基”的亲戚",
      "body": "酰氯、酸酐、酯、酰胺都可写成 R–C(=O)–Y。它们的差别主要在 Y 能不能当好离去基、以及 Y 对羰基的供电子能力。",
      "note": "先认共同骨架 R–C(=O)–Y，再比较 Y。",
      "formulas": [
        "RCOCl",
        "(RCO)₂O",
        "RCOOR′",
        "RCONR₂"
      ],
      "analogy": {
        "title": "像同一间房间换不同“门卫”",
        "body": "门卫越容易离开，亲核体越容易完成替换。",
        "boundary": "反应性还受立体与催化条件影响。"
      }
    },
    {
      "id": "d08-lesson-ranking",
      "eyebrow": "",
      "title": "活性顺序背后其实是“谁更容易离开 + 谁把电子推回羰基”",
      "body": "基础顺序通常：酰氯 > 酸酐 > 酯 ≈ 酸 > 酰胺。Cl⁻ 是较好离去基；NR₂⁻ 极差且酰胺 N 对羰基共振供电子强，所以酰胺最不活泼。",
      "note": "不要把“羧酸衍生物都一样是 C=O”当成相同活性。",
      "formulas": [
        "RCOCl > (RCO)₂O > RCOOR′ > RCONR₂（基础）"
      ],
      "analogy": {
        "title": "像不同等级的门锁",
        "body": "酰氯的“门”最容易打开，酰胺像上了两道锁。",
        "boundary": "不同教材对酸与酯相对位置的表达可能略有语境差异，这里抓最稳定的端点：酰氯高、酰胺低。"
      }
    },
    {
      "id": "d08-lesson-substitution",
      "eyebrow": "",
      "title": "亲核酰基取代：先加成，再“弹回去”把 Y 推走",
      "body": "第一步和 Day7 一样，Nu 攻羰基碳形成四面体中间体；第二步 O⁻ 恢复 C=O，同时 Y 离去。区别就在“羰基旁边有一个可离去的 Y”。",
      "note": "醛酮通常是“加成到底”；羧酸衍生物常是“加成-消除”。",
      "formulas": [
        "RCOY + Nu⁻ → R–C(O⁻)(Nu)–Y → RCONu + Y⁻"
      ],
      "analogy": {
        "title": "像有人先挤进电梯，再把原来的乘客推出去",
        "body": "四面体中间体短暂同时装着 Nu 和 Y，随后恢复羰基把 Y 弹走。",
        "boundary": "有些反应需要质子转移使离去基变好。"
      }
    },
    {
      "id": "d08-lesson-ester",
      "eyebrow": "",
      "title": "酯化、水解、皂化都是同一个酰基交换网络",
      "body": "Fischer 酯化是酸催化可逆过程；酸水解是逆过程；碱性皂化生成羧酸盐，由于生成稳定羧酸盐，通常更趋向单向。",
      "note": "看到“皂化”别只记肥皂，先读作“酯的碱水解”。",
      "formulas": [
        "RCO₂H + R′OH ⇌[H⁺] RCO₂R′ + H₂O",
        "RCO₂R′ + OH⁻ → RCO₂⁻ + R′OH"
      ],
      "analogy": {
        "title": "像可逆换座 vs 出门后锁门",
        "body": "酸催化酯化/水解可以来回；皂化生成羧酸盐后更难直接回去。",
        "boundary": "工业皂化涉及长链脂肪酸盐，这里学的是通用机理。"
      }
    },
    {
      "id": "d08-lesson-reduction",
      "eyebrow": "",
      "title": "还原强度：LiAlH₄ 可以把酯等一路推到醇",
      "body": "LiAlH₄ 可还原酰氯、酯、羧酸等到相应醇；酰胺还原常给胺。NaBH₄ 对普通酯通常不够强。",
      "note": "先分底物是醛酮还是酸衍生物，再选强弱还原剂。",
      "formulas": [
        "RCO₂R′ →[LiAlH₄] RCH₂OH + R′OH（后处理）",
        "RCONR₂ →[LiAlH₄] RCH₂NR₂"
      ],
      "analogy": {
        "title": "像“够不够力”打开更难的羰基",
        "body": "酯/酰胺因为共振等更抗亲核加成，需要更强还原体系。",
        "boundary": "具体选择性可用 DIBAL 等更细工具，本20天不展开。"
      }
    },
    {
      "id": "d08-lesson-hofmann",
      "eyebrow": "",
      "title": "Hofmann 降解：酰胺变伯胺，而且少一个碳",
      "body": "一级酰胺 RCONH₂ 在 Br₂/OH⁻ 等条件下可重排为异氰酸酯，再水解脱 CO₂，最后得到 RNH₂。因此羰基碳被丢掉。",
      "note": "这是合成题里很醒目的“减一碳”工具。",
      "formulas": [
        "RCONH₂ →[Br₂, OH⁻] RNH₂ + CO₂",
        "碳数：n → n−1"
      ],
      "analogy": {
        "title": "像把羰基碳当成一次性中转站，最后把它丢掉",
        "body": "产物胺保留 R，但酰胺的 C=O 那个碳不见了。",
        "boundary": "只对适合的一级酰胺讨论经典 Hofmann 重排。"
      }
    }
  ],
  "questions": [
    {
      "id": "d08-reactivity-rank-01",
      "day": 8,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "carboxyl.reactivity",
      "skillIds": [
        "carboxyl.reactivity",
        "ranking.reactivity"
      ],
      "difficulty": 2,
      "prompt": "按亲核酰基取代活性由高到低排序。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "酰氯 > 酸酐 > 酯 > 酰胺。",
        "why": "离去基能力和共振供电子共同控制。",
        "full": "Cl⁻ 易离去；酰胺 N 强共振供电子且 NR₂⁻ 极差离去，因此最不活泼。"
      },
      "items": [
        {
          "id": "acyl",
          "label": "CH₃COCl 酰氯"
        },
        {
          "id": "anh",
          "label": "乙酸酐"
        },
        {
          "id": "ester",
          "label": "乙酸乙酯"
        },
        {
          "id": "amide",
          "label": "乙酰胺"
        }
      ],
      "correctOrder": [
        "acyl",
        "anh",
        "ester",
        "amide"
      ],
      "answer": [
        "acyl",
        "anh",
        "ester",
        "amide"
      ]
    },
    {
      "id": "d08-acyl-sub-01",
      "day": 8,
      "type": "choice",
      "role": "learn",
      "primarySkill": "carboxyl.acyl_substitution",
      "skillIds": [
        "carboxyl.acyl_substitution"
      ],
      "difficulty": 2,
      "prompt": "乙酰氯 CH₃COCl + CH₃OH，在碱捕酸条件下主要生成？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "生成乙酸甲酯。",
        "why": "甲醇作为亲核体取代酰氯上的 Cl。",
        "full": "先加成形成四面体中间体，再恢复 C=O、Cl⁻ 离去。"
      },
      "options": [
        {
          "id": "a",
          "label": "乙酸甲酯 CH₃COOCH₃"
        },
        {
          "id": "b",
          "label": "丙酮"
        },
        {
          "id": "c",
          "label": "乙醛"
        }
      ],
      "answer": "a",
      "formula": "CH₃COCl + CH₃OH → CH₃COOCH₃ + HCl"
    },
    {
      "id": "d08-arrow-acyl-01",
      "day": 8,
      "type": "electron-arrow",
      "role": "practice",
      "primarySkill": "carboxyl.acyl_substitution",
      "skillIds": [
        "carboxyl.acyl_substitution",
        "mechanism.nucleophilic_attack"
      ],
      "difficulty": 3,
      "prompt": "画亲核酰基取代第一阶段：MeO⁻ 攻乙酰氯羰基，π 键到 O。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "第一步与醛酮亲核加成一样。",
        "why": "差别在下一步：这里还有 Cl 可离去，所以中间体会塌回 C=O。",
        "full": "先加成，再消除离去基，是亲核酰基取代母机理。"
      },
      "formula": "CH₃O⁻ + CH₃COCl → 四面体中间体",
      "baseSvg": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"电子箭头练习\"><text x=\"30\" y=\"42\" font-size=\"22\">CH₃O⁻ + CH₃COCl → 四面体中间体</text><circle cx=\"80\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"92\" y=\"136\" font-size=\"18\">MeO⁻孤对</text><circle cx=\"310\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"322\" y=\"136\" font-size=\"18\">酰基C</text><circle cx=\"390\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"402\" y=\"136\" font-size=\"18\">C=O π键</text><circle cx=\"510\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"522\" y=\"136\" font-size=\"18\">O</text></svg>",
      "hotspots": [
        {
          "id": "nu",
          "x": 80,
          "y": 130,
          "role": "source",
          "label": "MeO⁻孤对"
        },
        {
          "id": "c",
          "x": 310,
          "y": 130,
          "role": "target",
          "label": "酰基C"
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
          "x": 510,
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
      ]
    },
    {
      "id": "d08-esterification-01",
      "day": 8,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carboxyl.esterification",
      "skillIds": [
        "carboxyl.esterification"
      ],
      "difficulty": 2,
      "prompt": "乙酸 + 乙醇，在浓硫酸催化下加热，主要平衡产物是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "生成乙酸乙酯和水。",
        "why": "这是 Fischer 酯化，可逆。",
        "full": "可通过用过量醇或移走水推动平衡向酯。"
      },
      "options": [
        {
          "id": "a",
          "label": "乙酸乙酯 + 水"
        },
        {
          "id": "b",
          "label": "乙醛 + 水"
        },
        {
          "id": "c",
          "label": "乙烯 + 乙酸"
        }
      ],
      "answer": "a",
      "formula": "CH₃CO₂H + HOCH₂CH₃ ⇌ CH₃CO₂CH₂CH₃ + H₂O"
    },
    {
      "id": "d08-saponification-01",
      "day": 8,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carboxyl.hydrolysis",
      "skillIds": [
        "carboxyl.hydrolysis"
      ],
      "difficulty": 2,
      "prompt": "乙酸乙酯 + NaOH 水溶液加热，直接有机盐产物是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到乙酸钠（并有乙醇）。",
        "why": "OH⁻ 促酯水解，羧酸立即被碱转成羧酸盐。",
        "full": "这使反应在通常条件下趋向不可逆。"
      },
      "options": [
        {
          "id": "a",
          "label": "CH₃CO₂Na"
        },
        {
          "id": "b",
          "label": "CH₃CHO"
        },
        {
          "id": "c",
          "label": "CH₃CH₂ONa 为唯一产物"
        }
      ],
      "answer": "a",
      "formula": "CH₃CO₂Et + NaOH → CH₃CO₂Na + EtOH"
    },
    {
      "id": "d08-lah-ester-01",
      "day": 8,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carboxyl.reduction_control",
      "skillIds": [
        "carboxyl.reduction_control"
      ],
      "difficulty": 2,
      "prompt": "乙酸乙酯用过量 LiAlH₄ 后酸化，酰基部分最终变为什么？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "酰基部分变成乙醇。",
        "why": "LiAlH₄ 足够强，会把酯羰基一路还原到一级醇。",
        "full": "乙氧基部分离去后也最终形成乙醇，所以该底物总体会给乙醇。"
      },
      "options": [
        {
          "id": "a",
          "label": "乙醇"
        },
        {
          "id": "b",
          "label": "乙醛为主要终点"
        },
        {
          "id": "c",
          "label": "乙酸"
        }
      ],
      "answer": "a",
      "formula": "CH₃CO₂Et →[LiAlH₄/H₃O⁺] CH₃CH₂OH"
    },
    {
      "id": "d08-nabh4-ester-01",
      "day": 8,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carboxyl.reduction_control",
      "skillIds": [
        "carboxyl.reduction_control"
      ],
      "difficulty": 2,
      "prompt": "普通 NaBH₄ 与乙酸乙酯相比，对哪类更典型有效？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "NaBH₄ 典型还原醛酮。",
        "why": "普通酯/酰胺因共振稳定，对温和 H⁻ 试剂反应慢。",
        "full": "做题先用“NaBH₄温和、LiAlH₄强”做第一层筛选。"
      },
      "options": [
        {
          "id": "a",
          "label": "醛酮"
        },
        {
          "id": "b",
          "label": "普通酯"
        },
        {
          "id": "c",
          "label": "酰胺"
        }
      ],
      "answer": "a",
      "formula": "NaBH₄：RCHO/R₂CO → 醇"
    },
    {
      "id": "d08-hofmann-01",
      "day": 8,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carboxyl.hofmann",
      "skillIds": [
        "carboxyl.hofmann",
        "synthesis.carbon_count"
      ],
      "difficulty": 2,
      "prompt": "丙酰胺 CH₃CH₂CONH₂ 经 Hofmann 降解，最终伯胺是什么？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到乙胺。",
        "why": "羰基碳在重排/水解中以 CO₂ 形式丢失，少 1 个碳。",
        "full": "丙酰胺 3C → 乙胺 2C。"
      },
      "options": [
        {
          "id": "a",
          "label": "乙胺 CH₃CH₂NH₂"
        },
        {
          "id": "b",
          "label": "丙胺 CH₃CH₂CH₂NH₂"
        },
        {
          "id": "c",
          "label": "甲胺 CH₃NH₂"
        }
      ],
      "answer": "a",
      "formula": "CH₃CH₂CONH₂ →[Br₂/OH⁻] CH₃CH₂NH₂"
    },
    {
      "id": "d08-amide-lowreact-01",
      "day": 8,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carboxyl.reactivity",
      "skillIds": [
        "carboxyl.reactivity"
      ],
      "difficulty": 2,
      "prompt": "为什么酰胺对亲核酰基取代通常比酯更不活泼？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "共振稳定 + 差离去基。",
        "why": "酰胺 N 的孤对与羰基共轭，使羰基碳亲电性下降。",
        "full": "同时若要直接离去成 NR₂⁻，这是非常强碱、很差的离去基。"
      },
      "options": [
        {
          "id": "a",
          "label": "N 向羰基共振供电子强，且 NR₂⁻ 是很差离去基"
        },
        {
          "id": "b",
          "label": "酰胺没有羰基"
        },
        {
          "id": "c",
          "label": "N 比 O 大很多所以完全不反应"
        }
      ],
      "answer": "a",
      "formula": "R–C(=O)–NR₂ ↔ R–C(–O⁻)=N⁺R₂"
    },
    {
      "id": "d08-acidchloride-amide-01",
      "day": 8,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carboxyl.acyl_substitution",
      "skillIds": [
        "carboxyl.acyl_substitution"
      ],
      "difficulty": 2,
      "prompt": "乙酰氯 + 2 当量 NH₃，主要有机产物？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到乙酰胺。",
        "why": "NH₃ 亲核进攻酰氯，第二当量常用于中和 HCl。",
        "full": "酰氯是合成酰胺的高活性入口。"
      },
      "options": [
        {
          "id": "a",
          "label": "乙酰胺 CH₃CONH₂"
        },
        {
          "id": "b",
          "label": "乙胺"
        },
        {
          "id": "c",
          "label": "乙腈"
        }
      ],
      "answer": "a",
      "formula": "CH₃COCl + 2NH₃ → CH₃CONH₂ + NH₄Cl"
    },
    {
      "id": "d08-direction-01",
      "day": 8,
      "type": "choice",
      "role": "practice",
      "primarySkill": "carboxyl.reactivity",
      "skillIds": [
        "carboxyl.reactivity"
      ],
      "difficulty": 2,
      "prompt": "从酰氯制酯通常容易，而从普通酯直接用 Cl⁻ 变回酰氯为什么不容易？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "通常“高活性→低活性”更顺。",
        "why": "反向意味着把较差离去基换成更好离去基，需要额外活化。",
        "full": "这是一条很有用的合成方向判断。"
      },
      "options": [
        {
          "id": "a",
          "label": "会从高活性衍生物向低活性衍生物走得更顺"
        },
        {
          "id": "b",
          "label": "Cl⁻ 完全没有电子"
        },
        {
          "id": "c",
          "label": "酯没有 C=O"
        }
      ],
      "answer": "a",
      "formula": "RCOCl → 酯/酰胺 容易；反向需专门活化"
    },
    {
      "id": "d08-route-amide-01",
      "day": 8,
      "type": "route",
      "role": "transfer",
      "primarySkill": "synthesis.last_step",
      "skillIds": [
        "synthesis.last_step",
        "carboxyl.acyl_substitution"
      ],
      "difficulty": 3,
      "prompt": "从苯甲酸 PhCO₂H 制苯甲酰胺 PhCONH₂，哪条路线更可靠？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先活化成酰氯，再氨解。",
        "why": "直接酸+氨主要先发生酸碱反应。",
        "full": "合成题要区分“形式上官能团接近”与“真实反应条件能不能把水脱掉”。"
      },
      "graph": {
        "start": "acid",
        "target": "amide",
        "nodes": [
          {
            "id": "acid",
            "label": "苯甲酸",
            "structure": "PhCO₂H"
          },
          {
            "id": "acyl",
            "label": "苯甲酰氯",
            "structure": "PhCOCl"
          },
          {
            "id": "amide",
            "label": "苯甲酰胺",
            "structure": "PhCONH₂"
          },
          {
            "id": "salt",
            "label": "铵盐支路",
            "structure": "PhCO₂⁻NH₄⁺"
          }
        ],
        "edges": [
          {
            "id": "soCl2",
            "from": "acid",
            "to": "acyl",
            "choice": "SOCl₂ 活化",
            "reagent": "SOCl₂",
            "status": "green",
            "reason": "把差 OH 离去基转成高活性酰氯。"
          },
          {
            "id": "nh3",
            "from": "acyl",
            "to": "amide",
            "choice": "过量 NH₃",
            "reagent": "NH₃",
            "status": "green",
            "reason": "亲核酰基取代得到酰胺。"
          },
          {
            "id": "direct",
            "from": "acid",
            "to": "salt",
            "choice": "直接加 NH₃",
            "reagent": "NH₃",
            "status": "yellow",
            "reason": "首先酸碱中和成铵盐，并不等于直接高收率脱水成酰胺。"
          }
        ],
        "referenceRoutes": [
          [
            "soCl2",
            "nh3"
          ]
        ]
      },
      "answer": {
        "acceptedPaths": [
          [
            "soCl2",
            "nh3"
          ]
        ],
        "preferredPath": [
          "soCl2",
          "nh3"
        ]
      }
    }
  ],
  "repairs": {
    "carboxyl.reactivity": [
      {
        "id": "d08-repair-rank-01",
        "day": 8,
        "type": "choice",
        "role": "repair",
        "primarySkill": "carboxyl.reactivity",
        "skillIds": [
          "carboxyl.reactivity"
        ],
        "difficulty": 2,
        "prompt": "酰氯与酰胺谁更易被亲核体进攻并取代？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "酰氯更活泼。",
          "why": "Cl 是较好离去基，酰胺共振更强。",
          "full": "牢记端点：酰氯高，酰胺低。"
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
      }
    ],
    "carboxyl.hofmann": [
      {
        "id": "d08-repair-hof-01",
        "day": 8,
        "type": "choice",
        "role": "repair",
        "primarySkill": "carboxyl.hofmann",
        "skillIds": [
          "carboxyl.hofmann"
        ],
        "difficulty": 2,
        "prompt": "苯甲酰胺 PhCONH₂ Hofmann 降解得到？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "苯胺。",
          "why": "羰基碳被丢掉。",
          "full": "PhCONH₂ → PhNH₂。"
        },
        "options": [
          {
            "id": "a",
            "label": "苯胺 PhNH₂"
          },
          {
            "id": "b",
            "label": "苄胺 PhCH₂NH₂"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "RCOCl > 酸酐 > 酯 > 酰胺（基础活性）",
    "酰基取代：Nu加成→四面体→Y离去",
    "Fischer酯化可逆；皂化趋向单向",
    "LiAlH₄ 可把酯等还原到醇",
    "Hofmann：RCONH₂→RNH₂，少1C"
  ]
};
})();
