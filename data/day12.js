(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[12] = {
  "day": 12,
  "title": "胺、重氮盐与腈：把芳香合成接成“万能转接网络”",
  "subtitle": "今天重点不是背 Sandmeyer 名字，而是学会 NH₂→N₂⁺ 这个转接头，以及 CN 这个“藏着一格碳”的合成工具。",
  "estimatedMinutes": 90,
  "objectives": [
    "会比较胺碱性",
    "掌握 NO₂→NH₂ 与氨基保护",
    "掌握低温重氮化",
    "会 N₂⁺→Cl/Br/CN/OH",
    "认识偶氮偶联",
    "掌握腈 +1C、水解和还原"
  ],
  "lessons": [
    {
      "id": "d12-lesson-basicity",
      "eyebrow": "",
      "title": "胺的碱性就是“氮孤对电子愿不愿意拿 H⁺”",
      "body": "脂肪胺的孤对较可用，通常比苯胺强碱；苯胺中孤对与芳环共振离域，没那么愿意拿 H⁺。若芳环还有强吸电子基，碱性会更低。",
      "note": "比较碱性时先问孤对电子是否被共振/吸电子基“占用”。",
      "formulas": [
        "RNH₂ + H⁺ ⇌ RNH₃⁺",
        "aniline lone pair ↔ aromatic ring resonance"
      ],
      "analogy": {
        "title": "像手里那对电子是不是“空闲的手”",
        "body": "孤对越空闲，越容易去抓 H⁺；如果已经和芳环一起分担工作，就没那么有空。",
        "boundary": "水溶液中还会有溶剂化和烷基数等因素。"
      }
    },
    {
      "id": "d12-lesson-nitro-amino",
      "eyebrow": "",
      "title": "NO₂ 与 NH₂ 是芳环合成里一对很有用的可转换标签",
      "body": "硝基可用 Fe/HCl、Sn/HCl、H₂/Pd 等还原到胺。NH₂ 强活化，若要进行某些强条件 EAS，常先酰化保护成酰胺，降低过度活化/避免与 Lewis 酸配位。",
      "note": "保护/脱保护不是考试装饰，而是路线顺序工具。",
      "formulas": [
        "ArNO₂ →[Fe/HCl] ArNH₂",
        "ArNH₂ →[Ac₂O] ArNHCOCH₃（保护）"
      ],
      "analogy": {
        "title": "像把“很吵的 NH₂”先戴上静音耳罩",
        "body": "保护后它仍在，但反应性被压低，路线更容易控制。",
        "boundary": "不同保护基适用条件不同，这里只学乙酰化思路。"
      }
    },
    {
      "id": "d12-lesson-diazo",
      "eyebrow": "",
      "title": "重氮盐像芳环上的“万能转接头”",
      "body": "芳香伯胺在 0–5°C 用 NaNO₂/HCl 形成 ArN₂⁺Cl⁻。这个 –N₂⁺ 可以被 Cl、Br、CN、OH 等多种基团替换，N₂ 气体离去给很强驱动力。",
      "note": "温度很重要；重氮盐通常低温制备和使用。",
      "formulas": [
        "ArNH₂ →[NaNO₂/HCl, 0–5°C] ArN₂⁺Cl⁻",
        "ArN₂⁺ → ArCl / ArBr / ArCN / ArOH ..."
      ],
      "analogy": {
        "title": "像把 NH₂ 改造成一个标准万能接口",
        "body": "接口一装上，后面可以插 Cl、Br、CN、OH 等不同模块。",
        "boundary": "不同替换需要 Cu(I) 盐、加热水等不同条件。"
      }
    },
    {
      "id": "d12-lesson-sandmeyer",
      "eyebrow": "",
      "title": "Sandmeyer：用 Cu(I) 帮重氮基换成 Cl/Br/CN",
      "body": "ArN₂⁺ 与 CuCl/CuBr/CuCN 可得到相应芳基氯、溴、腈。芳基 CN 还是一个“+1 碳”入口，后续水解成羧酸。",
      "note": "这条“NH₂→N₂⁺→CN→CO₂H”在多步合成里很有价值。",
      "formulas": [
        "ArN₂⁺ →[CuCN] ArCN →[H₃O⁺,Δ] ArCO₂H"
      ],
      "analogy": {
        "title": "像换乘两次火车把一个不能直接装的基团装进去",
        "body": "先把 NH₂ 换成通用站台 N₂⁺，再接 CN，最后再变酸。",
        "boundary": "芳基卤化与脂肪族 SN2 的机理不同。"
      }
    },
    {
      "id": "d12-lesson-coupling",
      "eyebrow": "",
      "title": "重氮偶联：这次不是把 N₂ 丢掉，而是把 –N=N– 接到活化芳环上",
      "body": "芳基重氮离子本身可作亲电体，与酚盐或芳胺等强活化芳环发生偶联，形成偶氮化合物。",
      "note": "偶联常偏对位（若空位可用），是染料化学经典。",
      "formulas": [
        "ArN₂⁺ + activated Ar′H → Ar–N=N–Ar′"
      ],
      "analogy": {
        "title": "像把两个芳环用一条 N=N 彩带系起来",
        "body": "这次重氮基不是离去，而是成为桥的一部分。",
        "boundary": "pH 会影响酚/胺活化状态。"
      }
    },
    {
      "id": "d12-lesson-nitrile",
      "eyebrow": "",
      "title": "腈是“藏着一个碳”的官能团：水解成酸、还原成胺",
      "body": "R–CN 中 nitrile carbon 是一个真实碳原子。卤代烃 + CN⁻ SN2 会让碳链 +1；腈水解给羧酸，还原可给一级胺。",
      "note": "做合成碳数账本时，CN 不能当成“只是氮试剂”。",
      "formulas": [
        "R–X + CN⁻ → R–CN（+1C）",
        "R–CN →[H₃O⁺,Δ] R–CO₂H",
        "R–CN →[LiAlH₄] R–CH₂NH₂"
      ],
      "analogy": {
        "title": "像一个压缩包：CN 里藏着下一步会变成羧基碳的那一个 C",
        "body": "装 CN 往往等于给碳链多一格。",
        "boundary": "芳基重氮→ArCN 与脂肪卤代物 SN2→RCN 的前一步机理不同。"
      }
    }
  ],
  "questions": [
    {
      "id": "d12-basicity-rank-01",
      "day": 12,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "amine.basicity",
      "skillIds": [
        "amine.basicity",
        "ranking.basicity"
      ],
      "difficulty": 2,
      "prompt": "在基础水溶液比较下，按碱性由强到弱排。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "乙胺 > 苯胺 > 对硝基苯胺。",
        "why": "苯胺孤对被芳环共振分散；NO₂ 再进一步吸电子。",
        "full": "比较的是 N 孤对可用程度。"
      },
      "items": [
        {
          "id": "ethyl",
          "label": "乙胺 CH₃CH₂NH₂"
        },
        {
          "id": "anil",
          "label": "苯胺 PhNH₂"
        },
        {
          "id": "nitro",
          "label": "对硝基苯胺 p-NO₂-PhNH₂"
        }
      ],
      "correctOrder": [
        "ethyl",
        "anil",
        "nitro"
      ],
      "answer": [
        "ethyl",
        "anil",
        "nitro"
      ]
    },
    {
      "id": "d12-nitro-reduce-01",
      "day": 12,
      "type": "choice",
      "role": "practice",
      "primarySkill": "amine.nitro_reduction",
      "skillIds": [
        "amine.nitro_reduction"
      ],
      "difficulty": 2,
      "prompt": "硝基苯用 Fe/HCl 还原后，再碱化，得到？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到苯胺。",
        "why": "NO₂ 被还原到 NH₂。",
        "full": "这是从芳香硝化产物进入重氮盐路线的常见桥。"
      },
      "options": [
        {
          "id": "a",
          "label": "苯胺"
        },
        {
          "id": "b",
          "label": "苯酚"
        },
        {
          "id": "c",
          "label": "苯甲酸"
        }
      ],
      "answer": "a",
      "formula": "PhNO₂ →[Fe/HCl] PhNH₂"
    },
    {
      "id": "d12-protect-01",
      "day": 12,
      "type": "choice",
      "role": "practice",
      "primarySkill": "amine.protection",
      "skillIds": [
        "amine.protection"
      ],
      "difficulty": 2,
      "prompt": "为什么苯胺做某些芳环取代前常先乙酰化成乙酰苯胺？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "为了调控 NH₂ 反应性。",
        "why": "酰胺 N 的孤对部分与羰基共振，给电子能力比游离 NH₂ 弱。",
        "full": "路线完成后可水解脱保护恢复 NH₂。"
      },
      "options": [
        {
          "id": "a",
          "label": "降低 NH₂ 过强活化并减少与酸/Lewis酸副反应"
        },
        {
          "id": "b",
          "label": "把 NH₂ 永久删除"
        },
        {
          "id": "c",
          "label": "让芳环变成脂肪链"
        }
      ],
      "answer": "a",
      "formula": "PhNH₂ → PhNHCOCH₃ → ... → PhNH₂"
    },
    {
      "id": "d12-diazo-cond-01",
      "day": 12,
      "type": "choice",
      "role": "practice",
      "primarySkill": "diazonium.formation",
      "skillIds": [
        "diazonium.formation"
      ],
      "difficulty": 2,
      "prompt": "苯胺重氮化的典型条件是哪组？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "NaNO₂/HCl，0–5°C。",
        "why": "原位生成 HNO₂/NO⁺ 等亚硝化体系，低温稳定芳基重氮盐。",
        "full": "温度过高会增加分解/副反应。"
      },
      "options": [
        {
          "id": "a",
          "label": "NaNO₂/HCl，0–5°C"
        },
        {
          "id": "b",
          "label": "NaOH，高温"
        },
        {
          "id": "c",
          "label": "Br₂/CCl₄"
        }
      ],
      "answer": "a",
      "formula": "PhNH₂ + NaNO₂/HCl (0–5°C) → PhN₂⁺Cl⁻"
    },
    {
      "id": "d12-sandmeyer-cl-01",
      "day": 12,
      "type": "choice",
      "role": "practice",
      "primarySkill": "diazonium.substitution",
      "skillIds": [
        "diazonium.substitution"
      ],
      "difficulty": 2,
      "prompt": "PhN₂⁺Cl⁻ 用 CuCl 处理，主要得到？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到氯苯。",
        "why": "Sandmeyer 用 Cu(I) 把重氮基换成 Cl。",
        "full": "伴随 N₂ 气体离去。"
      },
      "options": [
        {
          "id": "a",
          "label": "氯苯"
        },
        {
          "id": "b",
          "label": "苯胺"
        },
        {
          "id": "c",
          "label": "苯酚"
        }
      ],
      "answer": "a",
      "formula": "PhN₂⁺ →[CuCl] PhCl + N₂"
    },
    {
      "id": "d12-sandmeyer-cn-01",
      "day": 12,
      "type": "choice",
      "role": "practice",
      "primarySkill": "diazonium.substitution",
      "skillIds": [
        "diazonium.substitution"
      ],
      "difficulty": 2,
      "prompt": "PhN₂⁺ 用 CuCN 后，芳环上得到什么？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到苯腈 PhCN。",
        "why": "CuCN 将重氮基换成 CN。",
        "full": "之后再水解 CN 才能得到苯甲酸。"
      },
      "options": [
        {
          "id": "a",
          "label": "–CN"
        },
        {
          "id": "b",
          "label": "–CO₂H 直接一步"
        },
        {
          "id": "c",
          "label": "–CH₃"
        }
      ],
      "answer": "a",
      "formula": "PhN₂⁺ →[CuCN] PhCN"
    },
    {
      "id": "d12-diazo-oh-01",
      "day": 12,
      "type": "choice",
      "role": "practice",
      "primarySkill": "diazonium.substitution",
      "skillIds": [
        "diazonium.substitution"
      ],
      "difficulty": 2,
      "prompt": "芳基重氮盐与水加热可转成？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "转成 ArOH。",
        "why": "N₂ 是极好离去基，水可取代。",
        "full": "这是从芳胺到酚的经典路线。"
      },
      "options": [
        {
          "id": "a",
          "label": "苯酚类 ArOH"
        },
        {
          "id": "b",
          "label": "烷烃"
        },
        {
          "id": "c",
          "label": "酰氯"
        }
      ],
      "answer": "a",
      "formula": "ArN₂⁺ →[H₂O,Δ] ArOH + N₂"
    },
    {
      "id": "d12-coupling-01",
      "day": 12,
      "type": "choice",
      "role": "practice",
      "primarySkill": "diazonium.coupling",
      "skillIds": [
        "diazonium.coupling"
      ],
      "difficulty": 2,
      "prompt": "重氮偶联最常需要哪类芳环作为另一方？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "强活化芳环。",
        "why": "偶联本质是活化芳环对重氮亲电体的 EAS。",
        "full": "酚盐和芳胺常见。"
      },
      "options": [
        {
          "id": "a",
          "label": "被 –OH/–NR₂ 等强活化的芳环"
        },
        {
          "id": "b",
          "label": "硝基苯等强钝化芳环"
        },
        {
          "id": "c",
          "label": "环己烷"
        }
      ],
      "answer": "a",
      "formula": "ArN₂⁺ + Ar′OH/Ar′NR₂ → Ar–N=N–Ar′"
    },
    {
      "id": "d12-nitrile-plus1-01",
      "day": 12,
      "type": "choice",
      "role": "practice",
      "primarySkill": "nitrile.synthesis",
      "skillIds": [
        "nitrile.synthesis",
        "synthesis.carbon_count"
      ],
      "difficulty": 2,
      "prompt": "1-溴丙烷 + NaCN/DMSO 经 SN2，产物总碳数是多少？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "4 个碳。",
        "why": "CN⁻ 的 C 进入新 C–C 键，碳链 +1。",
        "full": "CH₃CH₂CH₂Br → CH₃CH₂CH₂CN（丁腈）。"
      },
      "options": [
        {
          "id": "a",
          "label": "4"
        },
        {
          "id": "b",
          "label": "3"
        },
        {
          "id": "c",
          "label": "2"
        }
      ],
      "answer": "a",
      "formula": "C3 RBr + CN → C4 nitrile"
    },
    {
      "id": "d12-nitrile-hydro-01",
      "day": 12,
      "type": "choice",
      "role": "practice",
      "primarySkill": "nitrile.hydrolysis",
      "skillIds": [
        "nitrile.hydrolysis"
      ],
      "difficulty": 2,
      "prompt": "丁腈 CH₃CH₂CH₂CN 完全酸水解后得到？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到丁酸。",
        "why": "腈碳保留并成为羧基碳。",
        "full": "因此“卤代烃→腈→酸”是一条 +1C 制酸路线。"
      },
      "options": [
        {
          "id": "a",
          "label": "丁酸"
        },
        {
          "id": "b",
          "label": "丙酸"
        },
        {
          "id": "c",
          "label": "丁胺"
        }
      ],
      "answer": "a",
      "formula": "CH₃CH₂CH₂CN →[H₃O⁺,Δ] CH₃CH₂CH₂CO₂H"
    },
    {
      "id": "d12-nitrile-reduce-01",
      "day": 12,
      "type": "choice",
      "role": "practice",
      "primarySkill": "nitrile.synthesis",
      "skillIds": [
        "nitrile.synthesis"
      ],
      "difficulty": 2,
      "prompt": "乙腈 CH₃CN 用 LiAlH₄ 还原后酸性后处理，得到？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "得到乙胺。",
        "why": "CN 碳变成 CH₂，与 N 保持相连。",
        "full": "R–CN → R–CH₂NH₂。"
      },
      "options": [
        {
          "id": "a",
          "label": "乙胺 CH₃CH₂NH₂"
        },
        {
          "id": "b",
          "label": "甲胺"
        },
        {
          "id": "c",
          "label": "乙醇"
        }
      ],
      "answer": "a",
      "formula": "CH₃CN →[LiAlH₄] CH₃CH₂NH₂"
    },
    {
      "id": "d12-route-phenol-01",
      "day": 12,
      "type": "route",
      "role": "transfer",
      "primarySkill": "diazonium.substitution",
      "skillIds": [
        "diazonium.substitution",
        "synthesis.route_evaluation"
      ],
      "difficulty": 3,
      "prompt": "从硝基苯制苯酚，走一条把 Day11 和 Day12 串起来的路线。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "NO₂→NH₂→N₂⁺→OH。",
        "why": "重氮盐是中间的万能转接头。",
        "full": "路线题要看“每一步产物是否还是下一步需要的底物”。"
      },
      "graph": {
        "start": "nitro",
        "target": "phenol",
        "nodes": [
          {
            "id": "nitro",
            "label": "硝基苯",
            "structure": "PhNO₂"
          },
          {
            "id": "amine",
            "label": "苯胺",
            "structure": "PhNH₂"
          },
          {
            "id": "diazo",
            "label": "苯重氮盐",
            "structure": "PhN₂⁺Cl⁻"
          },
          {
            "id": "phenol",
            "label": "苯酚",
            "structure": "PhOH"
          },
          {
            "id": "chloro",
            "label": "氯苯支路",
            "structure": "PhCl"
          }
        ],
        "edges": [
          {
            "id": "red",
            "from": "nitro",
            "to": "amine",
            "choice": "Fe/HCl 还原",
            "reagent": "Fe/HCl",
            "status": "green",
            "reason": "NO₂→NH₂。"
          },
          {
            "id": "dia",
            "from": "amine",
            "to": "diazo",
            "choice": "NaNO₂/HCl 0–5°C",
            "reagent": "NaNO₂/HCl",
            "status": "green",
            "reason": "重氮化。"
          },
          {
            "id": "water",
            "from": "diazo",
            "to": "phenol",
            "choice": "H₂O，加热",
            "reagent": "H₂O, Δ",
            "status": "green",
            "reason": "重氮基换 OH。"
          },
          {
            "id": "cucl",
            "from": "diazo",
            "to": "chloro",
            "choice": "CuCl",
            "reagent": "CuCl",
            "status": "yellow",
            "reason": "化学上可行，但得到氯苯不是目标。"
          }
        ],
        "referenceRoutes": [
          [
            "red",
            "dia",
            "water"
          ]
        ]
      },
      "answer": {
        "acceptedPaths": [
          [
            "red",
            "dia",
            "water"
          ]
        ],
        "preferredPath": [
          "red",
          "dia",
          "water"
        ]
      }
    },
    {
      "id": "d12-route-acid-plus1-01",
      "day": 12,
      "type": "route",
      "role": "transfer",
      "primarySkill": "nitrile.synthesis",
      "skillIds": [
        "nitrile.synthesis",
        "synthesis.carbon_count"
      ],
      "difficulty": 3,
      "prompt": "从 1-溴丙烷制丁酸，哪条 +1C 路线最直接？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先 CN⁻ +1C，再水解。",
        "why": "碳数账本能立刻看出直接变醇不够。",
        "full": "这是非常高频的“多一个羧基碳”路线。"
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
            "id": "nitrile",
            "label": "丁腈",
            "structure": "CH₃CH₂CH₂CN"
          },
          {
            "id": "acid",
            "label": "丁酸",
            "structure": "CH₃CH₂CH₂CO₂H"
          },
          {
            "id": "propOH",
            "label": "1-丙醇支路",
            "structure": "CH₃CH₂CH₂OH"
          }
        ],
        "edges": [
          {
            "id": "cn",
            "from": "brom",
            "to": "nitrile",
            "choice": "NaCN/DMSO",
            "reagent": "NaCN/DMSO",
            "status": "green",
            "reason": "SN2 +1C。"
          },
          {
            "id": "hyd",
            "from": "nitrile",
            "to": "acid",
            "choice": "H₃O⁺，加热",
            "reagent": "H₃O⁺, Δ",
            "status": "green",
            "reason": "腈完全水解为酸。"
          },
          {
            "id": "oh",
            "from": "brom",
            "to": "propOH",
            "choice": "NaOH(aq)",
            "reagent": "NaOH(aq)",
            "status": "yellow",
            "reason": "能取代成醇，但不增碳且不是目标。"
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
      }
    }
  ],
  "repairs": {
    "diazonium.formation": [
      {
        "id": "d12-repair-diazo-01",
        "day": 12,
        "type": "choice",
        "role": "repair",
        "primarySkill": "diazonium.formation",
        "skillIds": [
          "diazonium.formation"
        ],
        "difficulty": 2,
        "prompt": "芳香伯胺重氮化的温度常控制在？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "0–5°C。",
          "why": "芳基重氮盐低温更稳定。",
          "full": "生成后再按目标进行下一步。"
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
      }
    ],
    "nitrile.synthesis": [
      {
        "id": "d12-repair-cn-01",
        "day": 12,
        "type": "choice",
        "role": "repair",
        "primarySkill": "nitrile.synthesis",
        "skillIds": [
          "nitrile.synthesis"
        ],
        "difficulty": 2,
        "prompt": "R–Br + CN⁻ SN2 后碳数通常？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "+1。",
          "why": "CN 中的碳进入骨架。",
          "full": "随后可水解为酸。"
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
    ]
  },
  "memorySheet": [
    "胺碱性看 N 孤对可用程度",
    "ArNO₂→ArNH₂；必要时 NHAc 保护",
    "ArNH₂→[NaNO₂/HCl,0–5°C]ArN₂⁺",
    "CuCl/CuBr/CuCN；H₂O/Δ→OH",
    "R–X+CN⁻→R–CN：+1C；水解→酸；还原→胺"
  ]
};
})();
