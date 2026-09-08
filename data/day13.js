(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[13] = {
  "day": 13,
  "title": "结构推断 I：分子式、DBE、IR 和化学检验",
  "subtitle": "今天不追求一眼猜结构。学会像办案一样：先算预算，再用硬证据一条条淘汰候选。",
  "estimatedMinutes": 85,
  "objectives": [
    "掌握 DBE 公式",
    "把 IR 当官能团安检",
    "会用银镜/端炔/碳酸氢钠等检验",
    "建立候选结构表",
    "完成至少两套完整证据链"
  ],
  "lessons": [
    {
      "id": "d13-lesson-detective",
      "eyebrow": "",
      "title": "结构推断不是“灵感猜谜”，而是像刑侦：每条证据都在缩小嫌疑人",
      "body": "先把未知结构想成一群候选。分子式给边界，DBE 告诉你“不饱和/环”的总预算，化学检验和 IR 是硬证据。每得到一条证据就划掉不满足的候选，而不是等到最后凭感觉选一个。",
      "note": "今天不要求一次猜中；过程里的每一步都单独计分。",
      "formulas": [
        "分子式 → DBE → 官能团硬证据 → 候选 → 逐条排除"
      ],
      "analogy": {
        "title": "像刑警办案：证据不是用来“印证喜欢的嫌疑人”，而是用来淘汰不可能的人",
        "body": "先建立嫌疑人列表，再用每条证据关门。",
        "boundary": "化学证据有时存在例外，必须看题目给定条件。"
      }
    },
    {
      "id": "d13-lesson-dbe",
      "eyebrow": "",
      "title": "DBE 是“少了多少对 H”的账本：1 个环或 1 个双键算 1，1 个三键算 2",
      "body": "对只含 C/H/N/X 的分子，DBE=(2C+2+N−H−X)/2，O/S 不进入公式。它不直接告诉你“在哪里”，只告诉你总共需要多少个环+π键单位。",
      "note": "DBE=4 不等于“一定是苯”，它只是预算。",
      "formulas": [
        "DBE = (2C + 2 + N − H − X)/2",
        "1 个环=1；1 个 C=C=1；1 个 C≡C=2；苯环=4"
      ],
      "analogy": {
        "title": "像装修预算",
        "body": "DBE 告诉你一共有4个“结构单位预算”，但预算可以分给一个苯环，也可以分给别的环/双键组合。",
        "boundary": "含特殊价态元素时要用更完整的化学判断。"
      }
    },
    {
      "id": "d13-lesson-ir",
      "eyebrow": "",
      "title": "IR 像安检门：先抓“有没有这类官能团”，不要试图读每一个小峰",
      "body": "最值得先抓的常见硬峰：O–H 宽峰约 3200–3600；羧酸 O–H 非常宽约 2500–3300；C=O 强峰约 1650–1750；端炔 ≡C–H 尖峰约 3300；C≡N 约 2250。",
      "note": "IR 先做“有/无”，精细位移留到候选变少以后。",
      "formulas": [
        "O–H：3200–3600 cm⁻¹（醇，宽）",
        "C=O：约 1650–1750 cm⁻¹（强）",
        "≡C–H：约 3300 cm⁻¹（尖）",
        "C≡N：约 2250 cm⁻¹"
      ],
      "analogy": {
        "title": "像机场安检，不是看清行李里每一根线，而是先发现“有金属/液体/危险物”",
        "body": "一个强羰基峰就能一次砍掉大量不含 C=O 的候选。",
        "boundary": "峰位会受共轭、氢键、环张力等影响，不要把单个数字绝对化。"
      }
    },
    {
      "id": "d13-lesson-tests",
      "eyebrow": "",
      "title": "化学检验是“让分子亲自做动作给你看”",
      "body": "银镜提示醛；Br₂/CCl₄ 褪色可提示 C=C/C≡C 等不饱和；氨性 AgNO₃/Cu⁺ 可检端炔；NaHCO₃ 放 CO₂ 可提示羧酸。做结构题时，这些常比模糊 IR 更像硬证据。",
      "note": "化学检验要结合“题目明确说的条件”，不要把所有褪色都归一个官能团。",
      "formulas": [
        "RCHO + Tollens → 银镜",
        "RC≡CH + Ag(NH₃)₂⁺ → 炔银沉淀",
        "RCO₂H + NaHCO₃ → CO₂↑"
      ],
      "analogy": {
        "title": "像让嫌疑人完成不同测试动作",
        "body": "会“吐气泡”、会“照银镜”、会“生成沉淀”的候选自然越来越少。",
        "boundary": "有些官能团也可能干扰同一检验，最终仍需多证据交叉。"
      }
    },
    {
      "id": "d13-lesson-candidate",
      "eyebrow": "",
      "title": "候选结构要主动列，不要只在脑子里“觉得像”",
      "body": "DBE 和官能团确定后，主动列 2–4 个合理候选，再逐条问：它能解释分子式吗？IR 吗？化学检验吗？如果一条硬证据 fail，就果断淘汰。",
      "note": "保留“还不确定”比硬猜更好；网站会允许 unknown 状态。",
      "formulas": [
        "candidate A / B / C × evidence table"
      ],
      "analogy": {
        "title": "像做排除法表格，而不是凭长相认人",
        "body": "每个候选都必须接受同一套证据审问。",
        "boundary": "候选列得不全也可能漏掉真结构，所以后期要学会系统枚举。"
      }
    }
  ],
  "questions": [
    {
      "id": "d13-dbe-c4h6-01",
      "day": 13,
      "type": "choice",
      "role": "learn",
      "primarySkill": "structure.dbe",
      "skillIds": [
        "structure.dbe"
      ],
      "difficulty": 2,
      "prompt": "C₄H₆ 的 DBE 是多少？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "DBE=2。",
        "why": "(2×4+2−6)/2=2。",
        "full": "这两个单位可以是一根三键，也可以两个双键/环+双键等。"
      },
      "options": [
        {
          "id": "a",
          "label": "2"
        },
        {
          "id": "b",
          "label": "1"
        },
        {
          "id": "c",
          "label": "3"
        }
      ],
      "answer": "a",
      "formula": "DBE=(2×4+2−6)/2=2"
    },
    {
      "id": "d13-dbe-oxygen-01",
      "day": 13,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.dbe",
      "skillIds": [
        "structure.dbe"
      ],
      "difficulty": 2,
      "prompt": "C₃H₆O 的 DBE 是多少？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "DBE=1。",
        "why": "O 不进入常用 DBE 公式。",
        "full": "(2×3+2−6)/2=1，说明一个环或一个双键单位。"
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
      "formula": "DBE=(2×3+2−6)/2=1"
    },
    {
      "id": "d13-dbe-benzene-01",
      "day": 13,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.dbe",
      "skillIds": [
        "structure.dbe"
      ],
      "difficulty": 2,
      "prompt": "苯 C₆H₆ 的 DBE=4，如何拆最直观？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "1 环 + 3 双键。",
        "why": "环和每个 π 键各贡献 1。",
        "full": "这也是“DBE 是预算”而非具体结构的例子。"
      },
      "options": [
        {
          "id": "a",
          "label": "1 个环 + 3 个双键"
        },
        {
          "id": "b",
          "label": "4 个三键"
        },
        {
          "id": "c",
          "label": "4 个羟基"
        }
      ],
      "answer": "a",
      "formula": "benzene: ring(1)+3 C=C=4"
    },
    {
      "id": "d13-ir-carbonyl-01",
      "day": 13,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.ir",
      "skillIds": [
        "structure.ir"
      ],
      "difficulty": 2,
      "prompt": "IR 出现强而尖的 1715 cm⁻¹ 左右吸收，最先应该怀疑哪类键？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先怀疑羰基 C=O。",
        "why": "大量醛、酮、酸、酯等在 1650–1750 区域有强羰基峰。",
        "full": "下一步还要用更具体峰和其它证据区分是哪种羰基衍生物。"
      },
      "options": [
        {
          "id": "a",
          "label": "C=O"
        },
        {
          "id": "b",
          "label": "O–H"
        },
        {
          "id": "c",
          "label": "C–C 单键"
        }
      ],
      "answer": "a",
      "formula": "IR ~1715 cm⁻¹ → C=O"
    },
    {
      "id": "d13-ir-oh-01",
      "day": 13,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.ir",
      "skillIds": [
        "structure.ir"
      ],
      "difficulty": 2,
      "prompt": "IR 3200–3600 cm⁻¹ 出现宽峰，且无 1700 左右强峰，首先想到？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先想到醇/酚 O–H。",
        "why": "氢键让 O–H 伸缩吸收变宽。",
        "full": "若同时有非常宽 2500–3300 和 C=O，则要考虑羧酸。"
      },
      "options": [
        {
          "id": "a",
          "label": "醇 O–H"
        },
        {
          "id": "b",
          "label": "酮"
        },
        {
          "id": "c",
          "label": "腈"
        }
      ],
      "answer": "a",
      "formula": "IR broad 3200–3600 → O–H"
    },
    {
      "id": "d13-ir-terminal-01",
      "day": 13,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.ir",
      "skillIds": [
        "structure.ir"
      ],
      "difficulty": 2,
      "prompt": "约 3300 cm⁻¹ 有较尖的峰，同时 2100 cm⁻¹ 附近有弱峰，最像？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "很像端炔。",
        "why": "≡C–H 尖峰与 C≡C 弱峰组合很有指向性。",
        "full": "再配合炔银沉淀等化学证据可进一步确认。"
      },
      "options": [
        {
          "id": "a",
          "label": "端炔 ≡C–H + C≡C"
        },
        {
          "id": "b",
          "label": "普通烷烃"
        },
        {
          "id": "c",
          "label": "羧酸"
        }
      ],
      "answer": "a",
      "formula": "RC≡CH: ~3300 sharp; C≡C ~2100"
    },
    {
      "id": "d13-test-aldehyde-01",
      "day": 13,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.chemical_tests",
      "skillIds": [
        "structure.chemical_tests"
      ],
      "difficulty": 2,
      "prompt": "未知物 Tollens 银镜阳性，最直接支持哪类官能团？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "支持醛。",
        "why": "醛容易被温和氧化，Ag(I) 被还原成 Ag。",
        "full": "少数其它还原性体系有例外，但本科结构题通常把银镜作为醛的重要证据。"
      },
      "options": [
        {
          "id": "a",
          "label": "醛"
        },
        {
          "id": "b",
          "label": "普通酮"
        },
        {
          "id": "c",
          "label": "醚"
        }
      ],
      "answer": "a",
      "formula": "RCHO → Tollens positive"
    },
    {
      "id": "d13-test-acid-01",
      "day": 13,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.chemical_tests",
      "skillIds": [
        "structure.chemical_tests"
      ],
      "difficulty": 2,
      "prompt": "未知液体加入 NaHCO₃ 明显放 CO₂，最优先考虑？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "羧酸。",
        "why": "羧酸酸性足够与 HCO₃⁻ 反应放 CO₂。",
        "full": "普通醇酸性不够，通常不会有同样气泡。"
      },
      "options": [
        {
          "id": "a",
          "label": "羧酸"
        },
        {
          "id": "b",
          "label": "醇"
        },
        {
          "id": "c",
          "label": "醚"
        }
      ],
      "answer": "a",
      "formula": "RCO₂H + NaHCO₃ → RCO₂Na + CO₂ + H₂O"
    },
    {
      "id": "d13-evidence-combine-01",
      "day": 13,
      "type": "multi-choice",
      "role": "practice",
      "primarySkill": "structure.constraint_elimination",
      "skillIds": [
        "structure.constraint_elimination",
        "structure.ir"
      ],
      "difficulty": 2,
      "prompt": "未知 C₄H₈O：DBE=1，IR 1715 强峰，无 O–H。哪些候选仍值得保留？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "保留酮和醛，先排除醇。",
        "why": "DBE=1 与 C=O 相容；IR 有 C=O 且无 OH。",
        "full": "目前还不能只凭 1715 把醛/酮分开，需要醛 C–H、银镜或 NMR 等下一条证据。"
      },
      "options": [
        {
          "id": "a",
          "label": "2-丁酮 CH₃COCH₂CH₃"
        },
        {
          "id": "b",
          "label": "丁醛 CH₃CH₂CH₂CHO"
        },
        {
          "id": "c",
          "label": "1-丁醇 CH₃CH₂CH₂CH₂OH"
        }
      ],
      "answer": [
        "a",
        "b"
      ],
      "formula": "C₄H₈O + C=O evidence → aldehyde/ketone candidates"
    },
    {
      "id": "d13-case-terminal",
      "day": 13,
      "type": "detective-case",
      "role": "transfer",
      "primarySkill": "structure.constraint_elimination",
      "skillIds": [
        "structure.constraint_elimination"
      ],
      "difficulty": 4,
      "prompt": "完整案例：用 DBE + IR + 炔银检验锁定端炔。",
      "caseId": "det-terminal-alkyne",
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
      "id": "d13-case-acetone",
      "day": 13,
      "type": "detective-case",
      "role": "transfer",
      "primarySkill": "structure.constraint_elimination",
      "skillIds": [
        "structure.constraint_elimination"
      ],
      "difficulty": 4,
      "prompt": "完整案例：用羰基证据与“只有一组氢”的对称性锁定丙酮。",
      "caseId": "det-acetone-symmetry",
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
    "structure.dbe": [
      {
        "id": "d13-repair-dbe-01",
        "day": 13,
        "type": "choice",
        "role": "repair",
        "primarySkill": "structure.dbe",
        "skillIds": [
          "structure.dbe"
        ],
        "difficulty": 2,
        "prompt": "C₅H₁₀ 的 DBE？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "1。",
          "why": "(12−10)/2=1。",
          "full": "可能是一环或一双键。"
        },
        "options": [
          {
            "id": "a",
            "label": "1"
          },
          {
            "id": "b",
            "label": "0"
          }
        ],
        "answer": "a"
      }
    ],
    "structure.ir": [
      {
        "id": "d13-repair-ir-01",
        "day": 13,
        "type": "choice",
        "role": "repair",
        "primarySkill": "structure.ir",
        "skillIds": [
          "structure.ir"
        ],
        "difficulty": 2,
        "prompt": "强 1735 cm⁻¹ 吸收最先提示？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "C=O。",
          "why": "羰基是强特征峰。",
          "full": "再结合其它峰细分。"
        },
        "options": [
          {
            "id": "a",
            "label": "C=O"
          },
          {
            "id": "b",
            "label": "C–C"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "DBE=(2C+2+N−H−X)/2；O/S不计",
    "C=O≈1650–1750 strong",
    "O–H≈3200–3600 broad；CO₂H更宽到2500–3300",
    "terminal alkyne ≡C–H≈3300 sharp",
    "银镜→醛；炔银→端炔；NaHCO₃→羧酸"
  ]
};
})();
