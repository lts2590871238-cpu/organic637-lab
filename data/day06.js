(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[6] = {
  "day": 6,
  "title": "醇、醚、环氧：把“氧”变成一个反应枢纽",
  "subtitle": "今天不按三个章节背。围绕 O 的电子、离去能力和环张力，把氧化、取代、消除、Williamson、环氧开环连成一张地图。",
  "estimatedMinutes": 85,
  "objectives": [
    "区分醇氧化级别",
    "理解 OH 活化和脱水",
    "会用 Lucas 作为结构证据",
    "用 Williamson 设计醚",
    "区分酸/碱环氧开环区域选择",
    "会用环氧乙烷做 +2C 合成"
  ],
  "lessons": [
    {
      "id": "d06-lesson-oh",
      "eyebrow": "",
      "title": "OH 本身不是好离去基：先把“坏门把手”改造",
      "body": "醇的 C–O 键要发生取代/消除时，常先把 OH 质子化成 H₂O，或者转成更好的磺酸酯/卤代物。H₂O 是比 HO⁻ 好得多的离去基。",
      "note": "看到醇直接写“OH⁻ 离去”通常是不严谨的。",
      "formulas": [
        "ROH + H⁺ ⇌ ROH₂⁺",
        "ROH₂⁺ → R⁺/或被 Nu 进攻 + H₂O"
      ],
      "analogy": {
        "title": "像门把手太滑，先套一个容易被拉走的套子",
        "body": "OH⁻ 很不愿意单独离开；质子化后变成中性 H₂O，就容易离开。",
        "boundary": "一级醇常不形成自由一级碳正离子，而是更偏协同取代。"
      }
    },
    {
      "id": "d06-lesson-oxidation",
      "eyebrow": "",
      "title": "醇氧化像“往同一个碳上加更多 C–O、少更多 C–H”",
      "body": "一级醇可先到醛，再到羧酸；二级醇到酮；三级醇缺少带 OH 碳上的 H，常规温和氧化不容易直接给普通羰基。",
      "note": "PCC 常把一级醇停在醛；Jones/KMnO₄ 等强氧化剂常继续到酸。",
      "formulas": [
        "1° ROH → RCHO → RCO₂H",
        "2° R₂CHOH → R₂C=O",
        "3° R₃COH：常规氧化不走简单羰基"
      ],
      "analogy": {
        "title": "像氧化级别的楼梯",
        "body": "一级醇还有两级可爬：醇→醛→酸；二级醇爬到酮就没有同样的下一阶。",
        "boundary": "具体试剂选择和底物结构会决定是否发生其它裂解。"
      },
      "visual": {
        "left": "CH₃CH₂OH",
        "arrow": "PCC / 强氧化剂",
        "right": "CH₃CHO / CH₃CO₂H",
        "caption": "同一个一级醇，试剂控制停在哪一层"
      }
    },
    {
      "id": "d06-lesson-dehydration",
      "eyebrow": "",
      "title": "醇脱水：把 OH 和邻位 H 组合成 H₂O，留下 C=C",
      "body": "酸催化脱水中，OH 先质子化成好离去基。二三级醇常可经历碳正离子并有重排风险；主烯烃常遵循 Zaitsev，但仍要看结构。",
      "note": "把 Day5 的消除思维迁移过来：仍然要找 β-H。",
      "formulas": [
        "R–CH₂–CH(OH)–R′ →[H₂SO₄, Δ] R–CH=CH–R′ + H₂O"
      ],
      "analogy": {
        "title": "像把相邻两处“各拿走一小块”，中间长出双键",
        "body": "从 α 碳拿走离去基，从 β 碳拿走 H。",
        "boundary": "酸催化脱水与强碱 E2 的具体机理可能不同。"
      }
    },
    {
      "id": "d06-lesson-williamson",
      "eyebrow": "",
      "title": "Williamson：做醚最稳的思路是“RO⁻ 当亲核体 + 一级 RX 做 SN2”",
      "body": "把醚 R–O–R′ 从 O–C 键切开，优先让较拥挤的一侧做 RO⁻，较不拥挤的一侧做甲基/一级卤代烃。",
      "note": "若把三级卤代烃当 SN2 底物，通常会被 E2 抢走。",
      "formulas": [
        "RO⁻ + R′–X → R–O–R′ + X⁻",
        "PhO⁻ + CH₃I → PhOCH₃"
      ],
      "analogy": {
        "title": "像拼插头：氧端是“插头”，一级卤代烃是“宽插座”",
        "body": "选错到三级“窄插座”，空间太挤就容易改走消除。",
        "boundary": "芳基卤代物 C(sp²)–X 也不走普通 SN2。"
      }
    },
    {
      "id": "d06-lesson-epoxide",
      "eyebrow": "",
      "title": "环氧像一只被压紧的三角弹簧：开环能释放张力",
      "body": "三元环键角远离理想值，所以容易被亲核体开环。碱性条件下 Nu⁻ 直接 SN2 攻击较少取代碳；酸性条件先质子化氧，亲核体更偏攻击较多取代碳。",
      "note": "两种条件的区域选择不能混。",
      "formulas": [
        "碱性：Nu⁻ → 较少取代环氧碳",
        "酸性：H⁺ 先活化；Nu → 较多取代碳（常见）"
      ],
      "analogy": {
        "title": "像一只压得很紧的弹簧夹",
        "body": "打开三元环本身就“释放压力”，所以亲核进攻有额外驱动力。",
        "boundary": "具体区域选择还受底物类型和亲核体影响；这里只用本科基础模型。"
      }
    },
    {
      "id": "d06-lesson-lucas",
      "eyebrow": "",
      "title": "Lucas 试验其实是在比较“谁更快把 OH 变成 Cl 并出现浑浊”",
      "body": "浓 HCl/ZnCl₂ 条件下，三级醇通常很快，二级较慢，一级常需加热或很慢。它本质上利用不同级数醇转为不溶氯代烃的速率差。",
      "note": "这是一条化学检验证据，后面的结构推断会用。",
      "formulas": [
        "3° ROH：快速浑浊",
        "2° ROH：数分钟",
        "1° ROH：室温慢/不明显"
      ],
      "analogy": {
        "title": "像三种门锁的开锁速度",
        "body": "三级最容易先形成稳定正离子，所以转换快；一级最慢。",
        "boundary": "具体底物、溶解性和温度会改变观察时间。"
      }
    }
  ],
  "questions": [
    {
      "id": "d06-lucas-rank-01",
      "day": 6,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "alcohol.lucas",
      "skillIds": [
        "alcohol.lucas",
        "ranking.reactivity"
      ],
      "difficulty": 2,
      "prompt": "按 Lucas 试剂下典型反应速度由快到慢排序。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "3° > 2° > 1°。",
        "why": "三级醇更容易在酸性条件形成稳定碳正离子。",
        "full": "Lucas 是速率比较，不是“一级完全永不反应”。"
      },
      "items": [
        {
          "id": "t",
          "label": "叔丁醇 3°"
        },
        {
          "id": "s",
          "label": "2-丁醇 2°"
        },
        {
          "id": "p",
          "label": "1-丁醇 1°"
        }
      ],
      "correctOrder": [
        "t",
        "s",
        "p"
      ],
      "answer": [
        "t",
        "s",
        "p"
      ]
    },
    {
      "id": "d06-pcc-01",
      "day": 6,
      "type": "choice",
      "role": "learn",
      "primarySkill": "alcohol.oxidation",
      "skillIds": [
        "alcohol.oxidation"
      ],
      "difficulty": 2,
      "prompt": "1-丙醇用 PCC 氧化，主产物最合适的是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到丙醛。",
        "why": "PCC 常把一级醇停在醛。",
        "full": "CH₃CH₂CH₂OH → CH₃CH₂CHO；若用更强、含水氧化体系常继续到羧酸。"
      },
      "options": [
        {
          "id": "a",
          "label": "丙醛"
        },
        {
          "id": "b",
          "label": "丙酸"
        },
        {
          "id": "c",
          "label": "丙酮"
        }
      ],
      "answer": "a",
      "formula": "CH₃CH₂CH₂OH →[PCC] CH₃CH₂CHO"
    },
    {
      "id": "d06-jones-01",
      "day": 6,
      "type": "choice",
      "role": "practice",
      "primarySkill": "alcohol.oxidation",
      "skillIds": [
        "alcohol.oxidation"
      ],
      "difficulty": 2,
      "prompt": "1-丙醇用 Jones/Cr(VI) 强氧化体系，常得到？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到丙酸。",
        "why": "强氧化会让一级醇经醛继续到羧酸。",
        "full": "一级醇“醇→醛→酸”是氧化级别地图。"
      },
      "options": [
        {
          "id": "a",
          "label": "丙酸"
        },
        {
          "id": "b",
          "label": "丙醛为唯一终点"
        },
        {
          "id": "c",
          "label": "丙烯"
        }
      ],
      "answer": "a",
      "formula": "CH₃CH₂CH₂OH →[强氧化] CH₃CH₂CO₂H"
    },
    {
      "id": "d06-secondary-oxid-01",
      "day": 6,
      "type": "choice",
      "role": "practice",
      "primarySkill": "alcohol.oxidation",
      "skillIds": [
        "alcohol.oxidation"
      ],
      "difficulty": 2,
      "prompt": "2-丁醇氧化，最典型羰基产物是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到 2-丁酮。",
        "why": "二级醇失去一个 C–H 和 O–H，形成酮。",
        "full": "CH₃CH(OH)CH₂CH₃ → CH₃COCH₂CH₃。"
      },
      "options": [
        {
          "id": "a",
          "label": "2-丁酮"
        },
        {
          "id": "b",
          "label": "丁醛"
        },
        {
          "id": "c",
          "label": "丁酸"
        }
      ],
      "answer": "a",
      "formula": "CH₃CH(OH)CH₂CH₃ → CH₃COCH₂CH₃"
    },
    {
      "id": "d06-dehydration-01",
      "day": 6,
      "type": "choice",
      "role": "practice",
      "primarySkill": "alcohol.dehydration",
      "skillIds": [
        "alcohol.dehydration"
      ],
      "difficulty": 2,
      "prompt": "2-丁醇在浓 H₂SO₄、加热下，主要反应类型？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "主要脱水成烯烃。",
        "why": "酸和热促进 OH 活化后消除。",
        "full": "常以 2-丁烯为主要烯烃，体现较稳定烯烃优势；实际可有异构体混合。"
      },
      "options": [
        {
          "id": "a",
          "label": "脱水消除形成丁烯"
        },
        {
          "id": "b",
          "label": "氧化成酮"
        },
        {
          "id": "c",
          "label": "直接生成醚为唯一产物"
        }
      ],
      "answer": "a",
      "formula": "CH₃CH(OH)CH₂CH₃ →[H₂SO₄,Δ] CH₃CH=CHCH₃ + H₂O"
    },
    {
      "id": "d06-williamson-01",
      "day": 6,
      "type": "choice",
      "role": "practice",
      "primarySkill": "ether.williamson",
      "skillIds": [
        "ether.williamson"
      ],
      "difficulty": 2,
      "prompt": "要合成乙基叔丁基醚 (CH₃)₃C–O–CH₂CH₃，哪种 Williamson 拆法更合理？",
      "examTags": [],
      "hints": [
        "先决定哪一侧承担 SN2 底物。"
      ],
      "explanationLayers": {
        "short": "用叔丁醇盐 + 一级溴乙烷更合理。",
        "why": "SN2 应让卤代烃一侧尽量不拥挤。",
        "full": "若用叔丁基溴作底物，乙醇盐更容易促 E2；所以把拥挤部分放在 alkoxide 一侧。"
      },
      "options": [
        {
          "id": "a",
          "label": "(CH₃)₃CO⁻ + CH₃CH₂Br"
        },
        {
          "id": "b",
          "label": "CH₃CH₂O⁻ + (CH₃)₃CBr"
        }
      ],
      "answer": "a",
      "formula": "(CH₃)₃CO⁻ + CH₃CH₂Br → (CH₃)₃COCH₂CH₃"
    },
    {
      "id": "d06-ether-cleavage-01",
      "day": 6,
      "type": "choice",
      "role": "practice",
      "primarySkill": "ether.cleavage",
      "skillIds": [
        "ether.cleavage"
      ],
      "difficulty": 2,
      "prompt": "二乙醚与过量 HI、加热，最终更可能得到什么类型？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "强 HI 可裂解醚，形成碘代烷。",
        "why": "O 先质子化，I⁻ 再取代 C–O。",
        "full": "对简单一级醚可经 SN2 裂解；过量 HI 可让两侧最终转为 RI。"
      },
      "options": [
        {
          "id": "a",
          "label": "碘乙烷（并可进一步完全裂解）"
        },
        {
          "id": "b",
          "label": "乙醛"
        },
        {
          "id": "c",
          "label": "乙烯为唯一产物"
        }
      ],
      "answer": "a",
      "formula": "CH₃CH₂OCH₂CH₃ + 2HI → 2 CH₃CH₂I + H₂O"
    },
    {
      "id": "d06-epoxide-base-01",
      "day": 6,
      "type": "choice",
      "role": "practice",
      "primarySkill": "epoxide.base_opening",
      "skillIds": [
        "epoxide.base_opening"
      ],
      "difficulty": 2,
      "prompt": "1,2-环氧丙烷在 CH₃O⁻/CH₃OH 下开环，CH₃O⁻ 优先攻击哪一个碳？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "碱性条件优先较少取代碳。",
        "why": "这是 SN2 型背面进攻，位阻最关键。",
        "full": "Nu⁻ 攻击较少取代碳，C–O 键断裂，随后质子化。"
      },
      "options": [
        {
          "id": "a",
          "label": "较少取代的 CH₂"
        },
        {
          "id": "b",
          "label": "较多取代的 CH"
        },
        {
          "id": "c",
          "label": "氧原子"
        }
      ],
      "answer": "a",
      "formula": "碱性环氧开环：Nu⁻ → less substituted C"
    },
    {
      "id": "d06-epoxide-acid-01",
      "day": 6,
      "type": "choice",
      "role": "practice",
      "primarySkill": "epoxide.acid_opening",
      "skillIds": [
        "epoxide.acid_opening"
      ],
      "difficulty": 2,
      "prompt": "同一不对称环氧在 H⁺/H₂O 下，水通常更偏攻击哪一端？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "酸性条件通常偏较多取代碳。",
        "why": "质子化环氧使 C–O 键具有更多碳正离子特征，较多取代端更能稳定。",
        "full": "仍是背面开环特征，但区域因素与碱性条件相反。"
      },
      "options": [
        {
          "id": "a",
          "label": "较多取代碳"
        },
        {
          "id": "b",
          "label": "较少取代碳，永远"
        },
        {
          "id": "c",
          "label": "不会开环"
        }
      ],
      "answer": "a",
      "formula": "酸性环氧：先 O-H⁺；Nu → more substituted C"
    },
    {
      "id": "d06-grignard-epox-01",
      "day": 6,
      "type": "choice",
      "role": "practice",
      "primarySkill": "epoxide.grignard_opening",
      "skillIds": [
        "epoxide.grignard_opening",
        "synthesis.carbon_count"
      ],
      "difficulty": 2,
      "prompt": "CH₃MgBr 与环氧乙烷反应，酸化后相当于给 CH₃– 增加几个碳？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "增加 2 个碳。",
        "why": "环氧乙烷本身提供两个碳。",
        "full": "CH₃MgBr + (CH₂CH₂)O → CH₃CH₂CH₂O⁻MgBr⁺ → H₃O⁺ → 1-丙醇。"
      },
      "options": [
        {
          "id": "a",
          "label": "2 个碳"
        },
        {
          "id": "b",
          "label": "1 个碳"
        },
        {
          "id": "c",
          "label": "0 个碳"
        }
      ],
      "answer": "a",
      "formula": "CH₃MgBr + 环氧乙烷 →[H₃O⁺] CH₃CH₂CH₂OH"
    },
    {
      "id": "d06-oh-leaving-01",
      "day": 6,
      "type": "choice",
      "role": "practice",
      "primarySkill": "alcohol.substitution",
      "skillIds": [
        "alcohol.substitution"
      ],
      "difficulty": 2,
      "prompt": "酸性条件下醇发生取代前，为什么常先质子化 OH？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "把 OH 变成 H₂O 离去。",
        "why": "中性水比强碱 HO⁻ 更适合离去。",
        "full": "这也是很多酸催化醇反应的共同第一步。"
      },
      "options": [
        {
          "id": "a",
          "label": "把差离去基 OH⁻ 变成较好离去基 H₂O"
        },
        {
          "id": "b",
          "label": "让碳变成负离子"
        },
        {
          "id": "c",
          "label": "把 O 彻底删掉，不涉及电子"
        }
      ],
      "answer": "a",
      "formula": "ROH + H⁺ → ROH₂⁺"
    },
    {
      "id": "d06-route-ether-01",
      "day": 6,
      "type": "route",
      "role": "transfer",
      "primarySkill": "ether.williamson",
      "skillIds": [
        "ether.williamson",
        "synthesis.route_evaluation"
      ],
      "difficulty": 3,
      "prompt": "目标是甲氧基乙烷 CH₃OCH₂CH₃。选择更稳的 Williamson 路线。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "两种绿色拆法都成立。",
        "why": "Williamson 不是只有一条固定答案，关键是把 SN2 放在甲基/一级底物上。",
        "full": "路线评价应先看化学可行，再看底物位阻与效率。"
      },
      "graph": {
        "start": "start",
        "target": "target",
        "nodes": [
          {
            "id": "start",
            "label": "路线选择",
            "structure": "CH₃OCH₂CH₃"
          },
          {
            "id": "target",
            "label": "甲氧基乙烷",
            "structure": "CH₃OCH₂CH₃"
          },
          {
            "id": "e2dead",
            "label": "消除支路",
            "structure": "烯烃/副产物"
          }
        ],
        "edges": [
          {
            "id": "good",
            "from": "start",
            "to": "target",
            "choice": "CH₃O⁻ + CH₃CH₂Br",
            "reagent": "NaOCH₃ + CH₃CH₂Br",
            "status": "green",
            "reason": "一级卤代烃适合 SN2。"
          },
          {
            "id": "also",
            "from": "start",
            "to": "target",
            "choice": "CH₃CH₂O⁻ + CH₃I",
            "reagent": "NaOEt + CH₃I",
            "status": "green",
            "reason": "甲基碘更是优秀 SN2 底物。"
          },
          {
            "id": "bad",
            "from": "start",
            "to": "e2dead",
            "choice": "CH₃O⁻ + (CH₃)₃CBr",
            "reagent": "NaOCH₃ + t-BuBr",
            "status": "red",
            "reason": "这甚至不是同一目标骨架，且三级底物易消除。"
          }
        ],
        "referenceRoutes": [
          [
            "good"
          ],
          [
            "also"
          ]
        ]
      },
      "answer": {
        "acceptedPaths": [
          [
            "good"
          ],
          [
            "also"
          ]
        ],
        "preferredPath": [
          "also"
        ]
      }
    }
  ],
  "repairs": {
    "alcohol.oxidation": [
      {
        "id": "d06-repair-oxid-01",
        "day": 6,
        "type": "choice",
        "role": "repair",
        "primarySkill": "alcohol.oxidation",
        "skillIds": [
          "alcohol.oxidation"
        ],
        "difficulty": 2,
        "prompt": "环己醇氧化的典型产物？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "环己酮。",
          "why": "环己醇是二级醇。",
          "full": "二级醇氧化到酮。"
        },
        "options": [
          {
            "id": "a",
            "label": "环己酮"
          },
          {
            "id": "b",
            "label": "环己醛"
          }
        ],
        "answer": "a"
      }
    ],
    "epoxide.base_opening": [
      {
        "id": "d06-repair-epox-01",
        "day": 6,
        "type": "choice",
        "role": "repair",
        "primarySkill": "epoxide.base_opening",
        "skillIds": [
          "epoxide.base_opening"
        ],
        "difficulty": 2,
        "prompt": "碱性不对称环氧开环，Nu⁻ 优先攻击？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "较少取代碳。",
          "why": "SN2 型位阻控制。",
          "full": "酸性条件才更偏较多取代端。"
        },
        "options": [
          {
            "id": "a",
            "label": "较少取代碳"
          },
          {
            "id": "b",
            "label": "较多取代碳"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "1°醇→醛→酸；2°醇→酮",
    "ROH + H⁺ → ROH₂⁺：把坏离去基变好",
    "Williamson：RO⁻ + 甲基/1° RX → ROR′",
    "环氧碱开环攻较少取代；酸开环常偏较多取代",
    "RMgX + 环氧乙烷 + H₃O⁺ → +2C 醇"
  ]
};
})();
