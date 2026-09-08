(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[14] = {
  "day": 14,
  "title": "结构推断 II：¹H NMR 把“地址、人数、邻居”合起来",
  "subtitle": "今天不背一张化学位移大表。先用五个锚点、积分和 n+1 看懂片段，再把所有证据送进候选矩阵。",
  "estimatedMinutes": 90,
  "objectives": [
    "用 δ 区间识别常见氢环境",
    "用积分读相对氢数",
    "用 n+1 识别简单邻氢",
    "用对称性判断信号数",
    "把 IR/NMR/化学检验合并",
    "完成3套完整 NMR 结构推断"
  ],
  "lessons": [
    {
      "id": "d14-lesson-nmr-map",
      "eyebrow": "",
      "title": "¹H NMR 可以先当成一张“住宅登记表”：地址、人数、邻居",
      "body": "化学位移 δ 告诉你这组 H 所处电子环境“地址”；积分告诉这组有几个 H；裂分告诉相邻碳上大约有几个等效邻氢；信号组数反映有几类不等价 H。",
      "note": "先把四种信息分开读，再合起来。",
      "formulas": [
        "shift = 地址",
        "integration = 人数",
        "splitting ≈ 邻居数 + 1（简单一阶）",
        "number of signals = 不等价 H 的种类数"
      ],
      "analogy": {
        "title": "像查小区住户表",
        "body": "地址告诉住在哪条街，积分告诉这一户几个人，裂分告诉隔壁大概住几个人。",
        "boundary": "复杂耦合、交换氢、二阶谱会打破简单 n+1。"
      }
    },
    {
      "id": "d14-lesson-shift",
      "eyebrow": "",
      "title": "化学位移：越被吸电子/π 系统“拉走电子”，H 往往越往低场",
      "body": "典型范围只需先抓锚点：烷基约 0.8–2；邻 O 的 O–CHₓ 常 3–4.5；烯氢约 4.5–6.5；芳氢约 6.5–8；醛氢约 9–10；羧酸 OH 可 10–13。",
      "note": "不要背到小数点；先用区间识别环境。",
      "formulas": [
        "alkyl ~0.8–2 ppm",
        "O–CH ~3–4.5",
        "C=C–H ~4.5–6.5",
        "Ar–H ~6.5–8",
        "CHO ~9–10"
      ],
      "analogy": {
        "title": "像不同地段的房价区间",
        "body": "靠近强吸电子原子或各向异性 π 系统，信号会搬到不同“地段”。",
        "boundary": "溶剂、浓度、取代基会让具体 δ 浮动。"
      }
    },
    {
      "id": "d14-lesson-integration",
      "eyebrow": "",
      "title": "积分不是峰高，而是“这一整组峰下面的面积”对应相对 H 数",
      "body": "比如乙酸乙酯常见 3H singlet、2H quartet、3H triplet。积分比 3:2:3 可以直接提示两个 CH₃ 和一个 CH₂。",
      "note": "先约成最简单整数比，不要把绝对面积当氢数。",
      "formulas": [
        "integration ratio 3:2:3 → CH₃ / CH₂ / CH₃"
      ],
      "analogy": {
        "title": "像每栋楼住了多少人，不看楼有多高而看总面积",
        "body": "峰高可能因裂分被分散，积分才对应总人数。",
        "boundary": "OH/NH 等交换氢积分可能不稳定。"
      }
    },
    {
      "id": "d14-lesson-splitting",
      "eyebrow": "",
      "title": "n+1 规则：先只在“简单相邻、等效、互相耦合”的情况下用",
      "body": "一个 CH₃ 邻着 CH₂（2个邻氢）常是 triplet；CH₂ 邻着 CH₃（3个邻氢）常 quartet，所以乙基片段常出现 q+t 组合。",
      "note": "OH/NH 常因快速交换不按简单 n+1；复杂体系也会偏离。",
      "formulas": [
        "CH₃–CH₂–X：CH₃ → triplet；CH₂ → quartet",
        "simple splitting ≈ n+1"
      ],
      "analogy": {
        "title": "像隔壁每个人都能给你的门铃多一种组合",
        "body": "2个等效邻居→3条，3个等效邻居→4条。",
        "boundary": "这是简单一阶谱近似，不是宇宙定律。"
      }
    },
    {
      "id": "d14-lesson-symmetry",
      "eyebrow": "",
      "title": "对称性是“信号数量压缩器”",
      "body": "结构里互相等价的 H 只给一组信号。丙酮两个 CH₃ 因对称而等价，所以只有一个 6H singlet；乙醚两个乙基若等价也会减少信号种类。",
      "note": "看到“信号特别少”要主动检查对称性。",
      "formulas": [
        "(CH₃)₂CO → 1 signal, 6H singlet"
      ],
      "analogy": {
        "title": "像双胞胎使用同一个身份类别",
        "body": "虽然人很多，但如果环境完全等价，NMR 把他们归在同一组。",
        "boundary": "表面对称不一定等于磁等价，复杂高级情况暂不展开。"
      }
    },
    {
      "id": "d14-lesson-combine",
      "eyebrow": "",
      "title": "真正锁结构时，四类 NMR 信息必须和分子式/IR 一起“交叉验票”",
      "body": "任何一个候选都要同时解释：总 H 数、信号数、每组积分、δ 区间、裂分，以及前一天的 DBE/IR/化学检验。只解释一半不能过关。",
      "note": "如果一个候选解释不了一条硬证据，就应该淘汰。",
      "formulas": [
        "formula + DBE + IR + NMR(signal count, δ, integration, splitting) → unique candidate"
      ],
      "analogy": {
        "title": "像机场转机要连续过四道闸机",
        "body": "候选结构必须每一道都刷得过去。",
        "boundary": "真实未知物还可能需要 13C NMR/MS 等，本考试范围按材料需要扩展。"
      }
    }
  ],
  "questions": [
    {
      "id": "d14-shift-aldehyde-01",
      "day": 14,
      "type": "choice",
      "role": "learn",
      "primarySkill": "structure.nmr_shift",
      "skillIds": [
        "structure.nmr_shift"
      ],
      "difficulty": 2,
      "prompt": "¹H NMR 在 9.8 ppm 左右有 1H 信号，最先怀疑？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先怀疑醛氢。",
        "why": "醛氢通常在约 9–10 ppm。",
        "full": "再结合 IR C=O 与醛 C–H/银镜可强力确认。"
      },
      "options": [
        {
          "id": "a",
          "label": "醛氢 –CHO"
        },
        {
          "id": "b",
          "label": "普通烷基 CH₃"
        },
        {
          "id": "c",
          "label": "醚中 OCH₃"
        }
      ],
      "answer": "a",
      "formula": "δH ~9–10 ppm → CHO"
    },
    {
      "id": "d14-shift-och2-01",
      "day": 14,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.nmr_shift",
      "skillIds": [
        "structure.nmr_shift"
      ],
      "difficulty": 2,
      "prompt": "一个 2H quartet 出现在约 4.1 ppm，常提示什么片段？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "常见于 O–CH₂–CH₃。",
        "why": "O 吸电子使相邻 CH₂ 下场到约 3–4.5 ppm，邻 3H 使其 quartet。",
        "full": "如果同时有约1.2 ppm的3H triplet，就是典型乙氧基。"
      },
      "options": [
        {
          "id": "a",
          "label": "–OCH₂CH₃"
        },
        {
          "id": "b",
          "label": "普通 CH₃CH₂– 里的远离杂原子 CH₂"
        },
        {
          "id": "c",
          "label": "醛氢"
        }
      ],
      "answer": "a",
      "formula": "–OCH₂CH₃: ~4.1 q (2H) + ~1.2 t (3H)"
    },
    {
      "id": "d14-integration-01",
      "day": 14,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.nmr_integration",
      "skillIds": [
        "structure.nmr_integration"
      ],
      "difficulty": 2,
      "prompt": "某分子只有三组信号，积分 3:2:3。最合理的最小氢片段组合是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "两个 CH₃ 和一个 CH₂ 很自然。",
        "why": "积分给的是相对人数。",
        "full": "还要再用 δ 与裂分判断它们如何连接。"
      },
      "options": [
        {
          "id": "a",
          "label": "CH₃ + CH₂ + CH₃"
        },
        {
          "id": "b",
          "label": "CH + CH + 6H"
        },
        {
          "id": "c",
          "label": "只有三个 H"
        }
      ],
      "answer": "a",
      "formula": "3:2:3"
    },
    {
      "id": "d14-splitting-ethyl-01",
      "day": 14,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.nmr_splitting",
      "skillIds": [
        "structure.nmr_splitting"
      ],
      "difficulty": 2,
      "prompt": "一个 3H triplet 与一个 2H quartet 成对出现，最典型提示？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "典型乙基片段。",
        "why": "CH₃ 看见 2 个邻 H → triplet；CH₂ 看见 3 个邻 H → quartet。",
        "full": "再看 CH₂ 的 δ 判断乙基靠 O、羰基还是普通烷基。"
      },
      "options": [
        {
          "id": "a",
          "label": "乙基 –CH₂CH₃"
        },
        {
          "id": "b",
          "label": "孤立甲基 –COCH₃"
        },
        {
          "id": "c",
          "label": "叔丁基"
        }
      ],
      "answer": "a",
      "formula": "CH₃–CH₂–X → t(3H)+q(2H)"
    },
    {
      "id": "d14-singlet-acetyl-01",
      "day": 14,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.nmr_splitting",
      "skillIds": [
        "structure.nmr_splitting"
      ],
      "difficulty": 2,
      "prompt": "CH₃CO– 的甲基为什么常是 3H singlet？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "邻位羰基碳没有氢可耦合。",
        "why": "简单 n+1 中 n=0，所以 singlet。",
        "full": "δ 常约 2.0–2.6 ppm，能和乙基 triplet 区分。"
      },
      "options": [
        {
          "id": "a",
          "label": "相邻羰基碳没有 H"
        },
        {
          "id": "b",
          "label": "因为所有 CH₃ 永远 singlet"
        },
        {
          "id": "c",
          "label": "因为 O 上有三个 H"
        }
      ],
      "answer": "a",
      "formula": "CH₃–C(=O)– → ~2.x ppm singlet"
    },
    {
      "id": "d14-sym-acetone-01",
      "day": 14,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.symmetry",
      "skillIds": [
        "structure.symmetry"
      ],
      "difficulty": 2,
      "prompt": "丙酮 (CH₃)₂CO 在简单 ¹H NMR 中有几组主要质子信号？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "1组。",
        "why": "两个 CH₃ 由分子对称性等价。",
        "full": "积分为 6H，且相邻羰基碳无 H，所以 singlet。"
      },
      "options": [
        {
          "id": "a",
          "label": "1 组（6H singlet）"
        },
        {
          "id": "b",
          "label": "2 组各3H"
        },
        {
          "id": "c",
          "label": "6组"
        }
      ],
      "answer": "a",
      "formula": "(CH₃)₂CO → 6H singlet"
    },
    {
      "id": "d14-ethyl-acetate-clues-01",
      "day": 14,
      "type": "multi-choice",
      "role": "practice",
      "primarySkill": "structure.constraint_elimination",
      "skillIds": [
        "structure.nmr_shift",
        "structure.nmr_integration",
        "structure.nmr_splitting"
      ],
      "difficulty": 2,
      "prompt": "乙酸乙酯 CH₃COOCH₂CH₃ 的 ¹H NMR，哪些特征应同时出现？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "前三项组合。",
        "why": "乙酰甲基无邻氢→s；乙氧基给 q+t；没有醛氢。",
        "full": "这种“组合指纹”比只认一个峰更稳。"
      },
      "options": [
        {
          "id": "a",
          "label": "~2.0 ppm 3H singlet（COCH₃）"
        },
        {
          "id": "b",
          "label": "~4.1 ppm 2H quartet（OCH₂）"
        },
        {
          "id": "c",
          "label": "~1.2 ppm 3H triplet（CH₃）"
        },
        {
          "id": "d",
          "label": "~9.8 ppm 1H aldehyde"
        }
      ],
      "answer": [
        "a",
        "b",
        "c"
      ],
      "formula": "EtOAc: 2.0 s(3H), 4.1 q(2H), 1.2 t(3H)"
    },
    {
      "id": "d14-nplus1-boundary-01",
      "day": 14,
      "type": "choice",
      "role": "practice",
      "primarySkill": "structure.nmr_splitting",
      "skillIds": [
        "structure.nmr_splitting"
      ],
      "difficulty": 2,
      "prompt": "下面哪一句关于 n+1 最严谨？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "n+1 有使用边界。",
        "why": "交换、非等效邻氢和二阶效应会使裂分复杂。",
        "full": "考试基础题可先用，但看到异常不要硬套。"
      },
      "options": [
        {
          "id": "a",
          "label": "只适合很多简单一阶相邻等效氢情况，OH/NH与复杂体系可能偏离"
        },
        {
          "id": "b",
          "label": "任何谱图永远严格 n+1"
        },
        {
          "id": "c",
          "label": "积分也按 n+1"
        }
      ],
      "answer": "a",
      "formula": "simple first-order: multiplicity ≈ n+1"
    },
    {
      "id": "d14-case-ethyl-acetate",
      "day": 14,
      "type": "detective-case",
      "role": "transfer",
      "primarySkill": "structure.constraint_elimination",
      "skillIds": [
        "structure.constraint_elimination"
      ],
      "difficulty": 4,
      "prompt": "完整案例：用 IR + q/t + 积分锁定乙酸乙酯。",
      "caseId": "det-ethyl-acetate",
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
      "id": "d14-case-butanal",
      "day": 14,
      "type": "detective-case",
      "role": "transfer",
      "primarySkill": "structure.constraint_elimination",
      "skillIds": [
        "structure.constraint_elimination"
      ],
      "difficulty": 4,
      "prompt": "完整案例：用醛氢、银镜和链状 NMR 锁定丁醛。",
      "caseId": "det-butanal",
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
      "id": "d14-case-acetophenone",
      "day": 14,
      "type": "detective-case",
      "role": "transfer",
      "primarySkill": "structure.constraint_elimination",
      "skillIds": [
        "structure.constraint_elimination"
      ],
      "difficulty": 4,
      "prompt": "完整案例：把 DBE=5、芳香区5H和酰基甲基组合成苯乙酮。",
      "caseId": "det-acetophenone",
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
    "structure.nmr_splitting": [
      {
        "id": "d14-repair-split-01",
        "day": 14,
        "type": "choice",
        "role": "repair",
        "primarySkill": "structure.nmr_splitting",
        "skillIds": [
          "structure.nmr_splitting"
        ],
        "difficulty": 2,
        "prompt": "CH₃ 邻着 CH₂，CH₃ 最常见裂分？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "triplet。",
          "why": "邻2H→2+1=3。",
          "full": "而 CH₂ 看见3H→quartet。"
        },
        "options": [
          {
            "id": "a",
            "label": "triplet"
          },
          {
            "id": "b",
            "label": "quartet"
          }
        ],
        "answer": "a"
      }
    ],
    "structure.symmetry": [
      {
        "id": "d14-repair-sym-01",
        "day": 14,
        "type": "choice",
        "role": "repair",
        "primarySkill": "structure.symmetry",
        "skillIds": [
          "structure.symmetry"
        ],
        "difficulty": 2,
        "prompt": "丙酮两个甲基在普通环境下？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "等价。",
          "why": "分子有对称性。",
          "full": "因此合成一个6H信号。"
        },
        "options": [
          {
            "id": "a",
            "label": "等价"
          },
          {
            "id": "b",
            "label": "必不等价"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "δ: alkyl~0.8–2; OCH~3–4.5; vinyl~4.5–6.5; aryl~6.5–8; CHO~9–10",
    "integration=相对H数",
    "simple splitting≈n+1",
    "ethyl常 q(2H)+t(3H)",
    "对称性减少信号数",
    "候选必须同时过 formula/DBE/IR/NMR"
  ]
};
})();
