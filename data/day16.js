(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[16] = {
  "day": 16,
  "title": "排序与机理综合：把前15天压缩成“八位裁判 + 九种电子动作”",
  "subtitle": "今天不再按章节。面对混合题先识别主导因素，再调用对应机理积木，训练真实试卷里的切换能力。",
  "estimatedMinutes": 90,
  "objectives": [
    "用八类因素解释排序",
    "会酸碱/稳定性/反应性/物性排序",
    "把复杂机理拆成基础电子动作",
    "能跨章节切换",
    "纠正“一张顺序表通吃所有粒子”的误区"
  ],
  "lessons": [
    {
      "id": "d16-lesson-eight-judges",
      "eyebrow": "",
      "title": "前15天零碎规律，今天压缩成“八位裁判”",
      "body": "遇到排序/反应性题，不要搜索脑中哪个表格，而是按裁判排查：共振、诱导、杂化、芳香性、空间位阻、中间体稳定性、分子间作用力、离去基/溶剂条件。通常先找能造成最大差异的主导因素。",
      "note": "不是每题八个都用；先找最强主导因素。",
      "formulas": [
        "resonance / induction / hybridization / aromaticity / steric / intermediate stability / intermolecular forces / leaving group & solvent"
      ],
      "analogy": {
        "title": "像八位评委，不是每道题都全部发言",
        "body": "有的题“共振”一票就决定胜负，有的题位阻或氢键才是主裁判。",
        "boundary": "因素可能相互竞争，需要先排强弱而非机械相加。"
      }
    },
    {
      "id": "d16-lesson-acidbase",
      "eyebrow": "",
      "title": "酸碱排序的本质：比较“失去/得到 H⁺ 后的那个离子稳不稳”",
      "body": "酸越强，共轭碱越稳定；碱越强，孤对越可用/共轭酸越不稳定。共振、吸电子诱导、s成分、芳香性都可能稳定负电。",
      "note": "不要只看分子里 O/N 数量。",
      "formulas": [
        "HA ⇌ H⁺ + A⁻；A⁻越稳定 → HA越酸",
        "sp C–H > sp² > sp³（端炔例）"
      ],
      "analogy": {
        "title": "像离开家之后有没有地方安顿",
        "body": "H⁺ 走后留下的负电如果有很多地方分摊，就“生活得更稳”，原酸更愿意放 H。",
        "boundary": "溶剂与电荷位置会强烈影响实际 pKa。"
      }
    },
    {
      "id": "d16-lesson-stability",
      "eyebrow": "",
      "title": "中间体稳定性要分“什么电荷/自由基”，不能一张顺序通吃",
      "body": "碳正离子常 3°>2°>1°，烯丙/苄基因共振很稳定；碳负离子对烷基取代趋势往往相反，但吸电子/共振可稳定；自由基也重视共振与取代。",
      "note": "先确认你排的是 C⁺、C⁻ 还是 radical。",
      "formulas": [
        "carbocation: resonance-stabilized; 3°>2°>1°",
        "carbanion: electron-withdrawing/resonance stabilization important"
      ],
      "analogy": {
        "title": "同一个“邻居多”对不同人不一定都是好事",
        "body": "正电缺电子喜欢烷基帮忙，负电本来就电子多，烷基供电子可能反而不利。",
        "boundary": "具体取代基共振效应可压过简单级数。"
      }
    },
    {
      "id": "d16-lesson-boiling",
      "eyebrow": "",
      "title": "沸点不是“分子量越大永远越高”，先看分子间作用力和形状",
      "body": "同系列中分子量增加常沸点升高；能形成氢键的醇/酸通常高于相近质量的醚/烃；支化增加通常降低接触面积和沸点。",
      "note": "沸点和酸性/反应性是完全不同的判据。",
      "formulas": [
        "H-bond > dipole-dipole > dispersion（粗略同条件比较）",
        "more branching → often lower bp"
      ],
      "analogy": {
        "title": "像人群之间拉手的强弱",
        "body": "能氢键就像多了强连接；支化像把长条人群缩成球，彼此接触面积小。",
        "boundary": "实际沸点还受分子量、极化率等共同影响。"
      }
    },
    {
      "id": "d16-lesson-arrow-blocks",
      "threeDId": "sn2_backside",
      "eyebrow": "",
      "title": "复杂机理其实是少数电子动作重复拼装",
      "body": "把机理拆成积木：质子转移、亲核进攻、离去、π键打开、π键形成、共振、重排、四面体塌陷、自由基单电子。看到新机理先找属于哪几块。",
      "note": "曲箭永远从电子源出发。",
      "formulas": [
        "proton transfer",
        "nucleophilic attack",
        "leaving group",
        "π open/form",
        "resonance",
        "rearrangement",
        "tetrahedral collapse",
        "single-electron"
      ],
      "analogy": {
        "title": "像乐高只有几种基础连接动作",
        "body": "Aldol、酰基取代、SN1/E1 看起来不同，其实都在重复这些基础块。",
        "boundary": "每块的能量与立体要求仍由具体体系决定。"
      }
    },
    {
      "id": "d16-lesson-mixed",
      "threeDId": "e2_anti",
      "eyebrow": "",
      "title": "真正的真题不会告诉你“现在是第几章”，所以今天开始混合切换",
      "body": "一道题可能先让你排酸性，再选条件，再判断机理。训练目标是识别“当前到底该叫哪位裁判上场”，而不是看到一个熟悉试剂就自动套最近学过的章节。",
      "note": "混合切换能力单独记录，不能用分章节正确率替代。",
      "formulas": [
        "structure → dominant factor → mechanism → product → sanity check"
      ],
      "analogy": {
        "title": "像开车从练习场进入真实城市",
        "body": "路牌不会写“现在考左转章节”，你必须自己识别场景。",
        "boundary": "刚开始混合会变慢，这是正常的能力迁移阶段。"
      }
    }
  ],
  "questions": [
    {
      "id": "d16-acid-rank-phenol-01",
      "day": 16,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "ranking.acidity",
      "skillIds": [
        "ranking.acidity"
      ],
      "difficulty": 2,
      "prompt": "按酸性由强到弱排。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "对硝基苯酚 > 苯酚 > 乙醇。",
        "why": "phenoxide 有共振；p-NO₂ 进一步吸电子稳定负电。",
        "full": "乙醇形成的 ethoxide 没有芳环共振稳定。"
      },
      "items": [
        {
          "id": "pnp",
          "label": "对硝基苯酚"
        },
        {
          "id": "ph",
          "label": "苯酚"
        },
        {
          "id": "etoh",
          "label": "乙醇"
        }
      ],
      "correctOrder": [
        "pnp",
        "ph",
        "etoh"
      ],
      "answer": [
        "pnp",
        "ph",
        "etoh"
      ]
    },
    {
      "id": "d16-base-rank-01",
      "day": 16,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "ranking.basicity",
      "skillIds": [
        "ranking.basicity"
      ],
      "difficulty": 2,
      "prompt": "按碱性由强到弱排。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "乙胺 > 苯胺 > 酰胺N。",
        "why": "N孤对从“空闲”到与芳环/羰基共振参与程度越来越大。",
        "full": "酰胺孤对强烈与羰基共振，最不愿意接受 H⁺。"
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
          "id": "amide",
          "label": "乙酰胺中的N"
        }
      ],
      "correctOrder": [
        "ethyl",
        "anil",
        "amide"
      ],
      "answer": [
        "ethyl",
        "anil",
        "amide"
      ]
    },
    {
      "id": "d16-carbocation-rank-01",
      "day": 16,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "ranking.stability",
      "skillIds": [
        "ranking.stability"
      ],
      "difficulty": 2,
      "prompt": "按碳正离子稳定性由高到低排。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "苄基通常非常稳定 > 三级 > 一级。",
        "why": "苄基有共振离域；三级靠超共轭/诱导。",
        "full": "共振通常是更强的稳定因素。"
      },
      "items": [
        {
          "id": "benz",
          "label": "苄基 PhCH₂⁺"
        },
        {
          "id": "tert",
          "label": "叔丁基 (CH₃)₃C⁺"
        },
        {
          "id": "prim",
          "label": "乙基 CH₃CH₂⁺"
        }
      ],
      "correctOrder": [
        "benz",
        "tert",
        "prim"
      ],
      "answer": [
        "benz",
        "tert",
        "prim"
      ]
    },
    {
      "id": "d16-sn2-rank-01",
      "day": 16,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "ranking.reactivity",
      "skillIds": [
        "ranking.reactivity"
      ],
      "difficulty": 2,
      "prompt": "同一亲核体下 SN2 速率由快到慢。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "甲基 > 一级 > 二级 >> 三级。",
        "why": "位阻主导背面进攻。",
        "full": "这里“底物级数”就是空间裁判。"
      },
      "items": [
        {
          "id": "m",
          "label": "CH₃I"
        },
        {
          "id": "p",
          "label": "CH₃CH₂I"
        },
        {
          "id": "s",
          "label": "(CH₃)₂CHI"
        },
        {
          "id": "t",
          "label": "(CH₃)₃CI"
        }
      ],
      "correctOrder": [
        "m",
        "p",
        "s",
        "t"
      ],
      "answer": [
        "m",
        "p",
        "s",
        "t"
      ]
    },
    {
      "id": "d16-acyl-rank-01",
      "day": 16,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "ranking.reactivity",
      "skillIds": [
        "ranking.reactivity"
      ],
      "difficulty": 2,
      "prompt": "按亲核酰基取代活性排序。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "酰氯 > 酯 > 酰胺。",
        "why": "离去基 + 共振供电子共同控制。",
        "full": "复习 Day8 的同一张活性阶梯。"
      },
      "items": [
        {
          "id": "cl",
          "label": "RCOCl"
        },
        {
          "id": "ester",
          "label": "RCOOR"
        },
        {
          "id": "amide",
          "label": "RCONR₂"
        }
      ],
      "correctOrder": [
        "cl",
        "ester",
        "amide"
      ],
      "answer": [
        "cl",
        "ester",
        "amide"
      ]
    },
    {
      "id": "d16-bp-rank-01",
      "day": 16,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "ranking.boiling_point",
      "skillIds": [
        "ranking.boiling_point"
      ],
      "difficulty": 2,
      "prompt": "分子量接近时，按典型沸点由高到低排。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "1-丁醇 > 乙醚 > 丁烷。",
        "why": "氢键 > 偶极 > 主要色散力。",
        "full": "这是物性题，主裁判是分子间作用力，不是反应中间体。"
      },
      "items": [
        {
          "id": "butanol",
          "label": "1-丁醇"
        },
        {
          "id": "ether",
          "label": "乙醚"
        },
        {
          "id": "butane",
          "label": "丁烷"
        }
      ],
      "correctOrder": [
        "butanol",
        "ether",
        "butane"
      ],
      "answer": [
        "butanol",
        "ether",
        "butane"
      ]
    },
    {
      "id": "d16-factor-01",
      "day": 16,
      "type": "choice",
      "role": "practice",
      "primarySkill": "ranking.stability",
      "skillIds": [
        "ranking.stability"
      ],
      "difficulty": 2,
      "prompt": "苯酚比环己醇更酸，最关键因素是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "共振稳定共轭碱。",
        "why": "酸性比较要看失 H 后的阴离子。",
        "full": "phenoxide 有多个共振式，而 cyclohexoxide 的负电主要局限在 O。"
      },
      "options": [
        {
          "id": "a",
          "label": "phenoxide 负电可在芳环共振离域"
        },
        {
          "id": "b",
          "label": "苯酚分子量更大"
        },
        {
          "id": "c",
          "label": "苯环一定让所有物质更酸"
        }
      ],
      "answer": "a",
      "formula": "PhO⁻ resonance stabilization"
    },
    {
      "id": "d16-factor-02",
      "day": 16,
      "type": "choice",
      "role": "practice",
      "primarySkill": "ranking.reactivity",
      "skillIds": [
        "ranking.reactivity"
      ],
      "difficulty": 2,
      "prompt": "三级卤代烃不走普通 SN2 的主要原因？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "位阻。",
        "why": "SN2 需要 Nu 从 C–X 背面靠近。",
        "full": "三个烷基在反应中心周围形成巨大空间屏障。"
      },
      "options": [
        {
          "id": "a",
          "label": "空间位阻挡住背面进攻"
        },
        {
          "id": "b",
          "label": "碳正离子一定太稳定"
        },
        {
          "id": "c",
          "label": "卤素没有电子"
        }
      ],
      "answer": "a",
      "formula": "SN2: steric hindrance"
    },
    {
      "id": "d16-factor-03",
      "day": 16,
      "type": "choice",
      "role": "practice",
      "primarySkill": "ranking.acidity",
      "skillIds": [
        "ranking.acidity"
      ],
      "difficulty": 2,
      "prompt": "端炔比烯烃 C–H 更酸，主要裁判？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "杂化。",
        "why": "sp 碳 s 成分更高，更能稳定碳负离子。",
        "full": "这是 Day3 的规则被抽象到“八位裁判”中的 hybridization。"
      },
      "options": [
        {
          "id": "a",
          "label": "杂化/s成分"
        },
        {
          "id": "b",
          "label": "分子间氢键"
        },
        {
          "id": "c",
          "label": "离去基能力"
        }
      ],
      "answer": "a",
      "formula": "sp > sp2 > sp3 acidity"
    },
    {
      "id": "d16-arrow-proton-01",
      "day": 16,
      "type": "electron-arrow",
      "role": "practice",
      "primarySkill": "mechanism.proton_transfer",
      "skillIds": [
        "mechanism.proton_transfer",
        "mechanism.electron_source"
      ],
      "difficulty": 3,
      "prompt": "画最基础质子转移：乙醇盐夺乙醇/酸性H的示意。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "碱孤对→H，O–H 键→O。",
        "why": "质子转移是大量机理的开场/收尾积木。",
        "full": "把箭头画给电子而不是画给原子。"
      },
      "formula": ":B⁻ + H–O–R → H–B + ⁻O–R",
      "baseSvg": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"电子箭头练习\"><text x=\"30\" y=\"42\" font-size=\"22\">:B⁻ + H–O–R → H–B + ⁻O–R</text><circle cx=\"80\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"92\" y=\"141\" font-size=\"18\">B⁻孤对</text><circle cx=\"250\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"262\" y=\"141\" font-size=\"18\">H</text><circle cx=\"365\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"377\" y=\"141\" font-size=\"18\">O–H键</text><circle cx=\"500\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"512\" y=\"141\" font-size=\"18\">O</text></svg>",
      "hotspots": [
        {
          "id": "b",
          "x": 80,
          "y": 135,
          "role": "source",
          "label": "B⁻孤对"
        },
        {
          "id": "h",
          "x": 250,
          "y": 135,
          "role": "target",
          "label": "H"
        },
        {
          "id": "oh",
          "x": 365,
          "y": 135,
          "role": "source",
          "label": "O–H键"
        },
        {
          "id": "o",
          "x": 500,
          "y": 135,
          "role": "target",
          "label": "O"
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
          "source": "oh",
          "target": "o",
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
          "source": "oh",
          "target": "o",
          "arrowType": "pair",
          "sequence": 1
        }
      ]
    },
    {
      "id": "d16-arrow-acylcollapse-01",
      "day": 16,
      "type": "electron-arrow",
      "role": "practice",
      "primarySkill": "mechanism.leaving",
      "skillIds": [
        "mechanism.leaving",
        "carboxyl.acyl_substitution"
      ],
      "difficulty": 3,
      "prompt": "四面体中间体塌陷：O⁻ 恢复 C=O，同时 C–Cl 键电子给 Cl。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "O⁻→C 恢复 π，C–Cl→Cl。",
        "why": "这是亲核酰基取代的“塌陷”积木。",
        "full": "Day7 的醛酮通常没有可离去 Y，所以停在加成；Day8 的衍生物会继续塌陷。"
      },
      "formula": "R–C(O⁻)(Nu)–Cl → R–C(=O)–Nu + Cl⁻",
      "baseSvg": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"电子箭头练习\"><text x=\"30\" y=\"42\" font-size=\"22\">R–C(O⁻)(Nu)–Cl → R–C(=O)–Nu + Cl⁻</text><circle cx=\"130\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"142\" y=\"141\" font-size=\"18\">O⁻孤对</text><circle cx=\"300\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"312\" y=\"141\" font-size=\"18\">C–O键/羰基C</text><circle cx=\"410\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"422\" y=\"141\" font-size=\"18\">C–Cl键</text><circle cx=\"540\" cy=\"135\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"552\" y=\"141\" font-size=\"18\">Cl</text></svg>",
      "hotspots": [
        {
          "id": "o",
          "x": 130,
          "y": 135,
          "role": "source",
          "label": "O⁻孤对"
        },
        {
          "id": "co",
          "x": 300,
          "y": 135,
          "role": "target",
          "label": "C–O键/羰基C"
        },
        {
          "id": "ccl",
          "x": 410,
          "y": 135,
          "role": "source",
          "label": "C–Cl键"
        },
        {
          "id": "cl",
          "x": 540,
          "y": 135,
          "role": "target",
          "label": "Cl"
        }
      ],
      "expectedArrows": [
        {
          "source": "o",
          "target": "co",
          "arrowType": "pair",
          "sequence": 1
        },
        {
          "source": "ccl",
          "target": "cl",
          "arrowType": "pair",
          "sequence": 1
        }
      ],
      "answer": [
        {
          "source": "o",
          "target": "co",
          "arrowType": "pair",
          "sequence": 1
        },
        {
          "source": "ccl",
          "target": "cl",
          "arrowType": "pair",
          "sequence": 1
        }
      ]
    },
    {
      "id": "d16-mech-switch-01",
      "day": 16,
      "type": "choice",
      "role": "practice",
      "primarySkill": "mechanism.electron_source",
      "skillIds": [
        "mechanism.electron_source"
      ],
      "difficulty": 2,
      "prompt": "看到“NaBH₄ + 酮”，机理第一块最像？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "亲核加成。",
        "why": "氢化物相当于电子丰富的 H 进攻 Cδ+。",
        "full": "把试剂名字翻译成“它提供什么电子动作”。"
      },
      "options": [
        {
          "id": "a",
          "label": "H⁻ 型亲核进攻羰基 C"
        },
        {
          "id": "b",
          "label": "先形成自由碳正离子"
        },
        {
          "id": "c",
          "label": "EAS"
        }
      ],
      "answer": "a",
      "formula": "H⁻ → carbonyl C"
    },
    {
      "id": "d16-mech-switch-02",
      "day": 16,
      "type": "choice",
      "role": "practice",
      "primarySkill": "mechanism.resonance",
      "skillIds": [
        "mechanism.resonance"
      ],
      "difficulty": 2,
      "prompt": "看到“苯甲醇对应苄基碳正离子很稳定”，主导裁判？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "共振。",
        "why": "正电可离域到芳环。",
        "full": "先识别带电中间体，再找能否共振。"
      },
      "options": [
        {
          "id": "a",
          "label": "共振"
        },
        {
          "id": "b",
          "label": "氢键"
        },
        {
          "id": "c",
          "label": "SN2 位阻"
        }
      ],
      "answer": "a",
      "formula": "PhCH₂⁺ resonance"
    },
    {
      "id": "d16-mixed-01",
      "day": 16,
      "type": "multi-choice",
      "role": "transfer",
      "primarySkill": "exam.mixed_transfer",
      "skillIds": [
        "exam.mixed_transfer",
        "ranking.reactivity"
      ],
      "difficulty": 2,
      "prompt": "下列判断哪些正确？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "A、B、D 正确。",
        "why": "C 反了：酰胺最低活性之一。",
        "full": "混合题要求快速切换到正确“裁判”。"
      },
      "options": [
        {
          "id": "a",
          "label": "叔丁基溴 + t-BuOK/Δ：E2 倾向强"
        },
        {
          "id": "b",
          "label": "苯酚比乙醇酸性更强：共振稳定 phenoxide"
        },
        {
          "id": "c",
          "label": "酰胺比酰氯更活泼：因为 N 是好离去基"
        },
        {
          "id": "d",
          "label": "端炔酸性高于烯烃：sp 碳稳定负电"
        }
      ],
      "answer": [
        "a",
        "b",
        "d"
      ],
      "formula": "mixed concepts"
    }
  ],
  "repairs": {
    "ranking.acidity": [
      {
        "id": "d16-repair-acid-01",
        "day": 16,
        "type": "choice",
        "role": "repair",
        "primarySkill": "ranking.acidity",
        "skillIds": [
          "ranking.acidity"
        ],
        "difficulty": 2,
        "prompt": "酸性比较首先应比较？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "共轭碱。",
          "why": "A⁻越稳，HA越愿意放H。",
          "full": "再用共振/诱导/杂化等解释。"
        },
        "options": [
          {
            "id": "a",
            "label": "共轭碱稳定性"
          },
          {
            "id": "b",
            "label": "分子颜色"
          }
        ],
        "answer": "a"
      }
    ],
    "mechanism.electron_source": [
      {
        "id": "d16-repair-arrow-01",
        "day": 16,
        "type": "choice",
        "role": "repair",
        "primarySkill": "mechanism.electron_source",
        "skillIds": [
          "mechanism.electron_source"
        ],
        "difficulty": 2,
        "prompt": "曲箭箭尾应从哪里开始？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "已有电子。",
          "why": "曲箭描述电子移动。",
          "full": "这是所有机理的第一检查。"
        },
        "options": [
          {
            "id": "a",
            "label": "已有电子：孤对/键"
          },
          {
            "id": "b",
            "label": "正电荷符号本身"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "排序先找主导裁判：共振/诱导/杂化/芳香/位阻/中间体/分子间力/离去基与溶剂",
    "酸越强→共轭碱越稳",
    "C⁺与C⁻稳定趋势不能混",
    "机理箭尾从已有电子出发",
    "复杂机理=少数电子积木重复拼"
  ]
};
})();
