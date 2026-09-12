(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[15] = {
  "day": 15,
  "title": "立体化学：把“看不见的空间”先变成一套二维算法",
  "subtitle": "3D 模型留到最后一轮，但今天先把 CIP、R/S、Fischer、E/Z、对映/非对映、meso 和构象语言全部练成稳定步骤。",
  "estimatedMinutes": 90,
  "objectives": [
    "识别手性中心",
    "掌握 CIP",
    "按算法判断 R/S",
    "理解 Fischer 透视",
    "区分对映/非对映/meso",
    "判断 E/Z",
    "建立 Newman/椅式二维语言",
    "把 SN2 几何反转和 CIP 分开"
  ],
  "lessons": [
    {
      "id": "d15-lesson-chirality",
      "eyebrow": "",
      "title": "手性先别想成“难看的楔线”：先问镜子里的它能不能和自己完全重合",
      "body": "一个 sp³ 碳若连四个不同基团，常成为手性中心。它的镜像可能像左手和右手：组成和连接都一样，但无论怎么转都不能完全重合。",
      "note": "“有手性中心”与“整个分子一定手性”不能完全等同，meso 是经典例外。",
      "formulas": [
        "C* attached to A/B/C/D all different → chiral center candidate"
      ],
      "analogy": {
        "title": "像左手和右手",
        "body": "骨架关系完全对应，但不能通过普通旋转把左手变成右手。",
        "boundary": "某些没有传统手性碳的分子也可手性，本课程先学最常见中心手性。"
      }
    },
    {
      "id": "d15-lesson-cip",
      "eyebrow": "",
      "title": "CIP 排优先级像“先看身份证第一位，不同就停；相同再往外比”",
      "body": "直接相连原子原子序数越大优先级越高；若第一层相同，就比较下一层按原子序数降序排列的集合；多键按“重复连接”处理。",
      "note": "不要用“基团更大/碳更多”替代正式 CIP。",
      "formulas": [
        "I > Br > Cl > S > O > N > C > H（常见直接比较）"
      ],
      "analogy": {
        "title": "像比较电话号码：从最前一位开始，一旦不同就不用再看后面",
        "body": "第一层原子相同才向外一层层比较。",
        "boundary": "同位素按质量数，双键有特殊重复原子处理。"
      }
    },
    {
      "id": "d15-lesson-rs",
      "eyebrow": "",
      "title": "R/S 是一个固定算法：排 1>2>3>4，把 4 放后面，再看 1→2→3",
      "body": "最低优先级 4 背向观察者时，1→2→3 顺时针为 R，逆时针为 S。如果 4 朝向你，则结果反转。",
      "note": "不要靠“长得像 R”猜。",
      "formulas": [
        "4 away: clockwise = R; counterclockwise = S",
        "4 toward: reverse result"
      ],
      "analogy": {
        "title": "像先把相机摆到固定位置再看转向",
        "body": "相机位置不统一，顺/逆时针就没有意义。",
        "boundary": "分子可以旋转但不能随意交换两个基团；一次交换会翻构型。"
      }
    },
    {
      "id": "d15-lesson-fischer",
      "eyebrow": "",
      "title": "Fischer 投影是一个固定透视规则：横线朝你，竖线背你",
      "body": "交叉点是手性碳；水平两键向纸外，竖直两键向纸内。做 R/S 时若最低优先级在横线上，就要反转读数。",
      "note": "Fischer 旋转 180° 不变，旋转 90° 会改变构型。",
      "formulas": [
        "Fischer: horizontal = toward; vertical = away"
      ],
      "analogy": {
        "title": "像一张固定机位拍的十字路口照片",
        "body": "横向两条路从屏幕里伸向你，纵向两条钻到屏幕后。",
        "boundary": "这只是表示法，不是分子真的永远保持十字形。"
      }
    },
    {
      "id": "d15-lesson-relations",
      "eyebrow": "",
      "title": "对映体、非对映体、meso：先比较每个立体中心，不要凭“看起来像”",
      "body": "所有手性中心都相反且互为镜像 → 对映体；部分相反部分相同 → 非对映体；有多个手性中心却因内部对称面整体不手性 → meso。",
      "note": "旋光性是整个分子的性质，不是只数手性中心。",
      "formulas": [
        "(R,R) vs (S,S) → enantiomers",
        "(R,R) vs (R,S) → diastereomers",
        "meso: stereocenters + internal symmetry → achiral"
      ],
      "analogy": {
        "title": "像两套密码逐位比较",
        "body": "全部位都反转是一对镜像；只改几位则是非对映。",
        "boundary": "构象变化本身不一定产生新构型异构体。"
      }
    },
    {
      "id": "d15-lesson-ez",
      "eyebrow": "",
      "title": "E/Z 不是“顺反凭眼睛”，而是双键两端各自先做 CIP，再看两个高优先基团同侧还是异侧",
      "body": "每个烯碳选高优先基团；同侧 Z（zusammen），异侧 E（entgegen）。",
      "note": "如果某个双键碳连两个相同基团，就没有 E/Z。",
      "formulas": [
        "high/high same side → Z",
        "high/high opposite → E"
      ],
      "analogy": {
        "title": "像河两岸各选一个“VIP”，看两个 VIP 在桥的同侧还是对侧",
        "body": "先选 VIP 再判断位置，不能直接看两个甲基。",
        "boundary": "E/Z 是构型命名，不等同于稳定性排序。"
      }
    },
    {
      "id": "d15-lesson-conformation",
      "eyebrow": "",
      "title": "构象像“同一个人换姿势”，不需要断键；构型像“左右手身份”，互变通常要断键",
      "body": "单键旋转产生不同构象。Newman 中 staggered 通常比 eclipsed 稳；环己烷椅式里大基团更偏赤道位以减少 1,3-diaxial 相互作用。",
      "note": "3D 模块以后会真正旋转模型；今天先用二维规则建立语言。",
      "formulas": [
        "staggered < eclipsed（能量）",
        "cyclohexane: bulky group prefers equatorial"
      ],
      "analogy": {
        "title": "构象像站着/坐着，构型像左手/右手",
        "body": "姿势可以轻松换，身份不能靠普通旋转换。",
        "boundary": "环翻转会交换 axial/equatorial，但 up/down 构型关系保留。"
      }
    }
  ],
  "questions": [
    {
      "id": "d15-chiral-center-01",
      "day": 15,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.rs",
      "skillIds": [
        "stereo.rs"
      ],
      "difficulty": 2,
      "prompt": "下列碳最可能是手性中心的是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "连四个不同基团的 sp³ 碳是经典手性中心。",
        "why": "A 中四个取代基不同。",
        "full": "B 有两个 Cl，C 有三个 H，所以都不满足。"
      },
      "options": [
        {
          "id": "a",
          "label": "CHBrCl–CH₃ 中连 H/Br/Cl/CH₃ 的那个碳"
        },
        {
          "id": "b",
          "label": "CH₂Cl₂ 中的碳"
        },
        {
          "id": "c",
          "label": "CH₃OH 中甲基碳"
        }
      ],
      "answer": "a",
      "formula": "C*: H, Br, Cl, CH₃"
    },
    {
      "id": "d15-cip-01",
      "day": 15,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "stereo.cip",
      "skillIds": [
        "stereo.cip"
      ],
      "difficulty": 2,
      "prompt": "按直接相连原子的 CIP 优先级由高到低排。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "Br > O > N > C > H。",
        "why": "直接比较原子序数。",
        "full": "CIP 第一层一旦不同就停止，不需要比较整个基团大小。"
      },
      "items": [
        {
          "id": "br",
          "label": "–Br"
        },
        {
          "id": "oh",
          "label": "–OH"
        },
        {
          "id": "nh2",
          "label": "–NH₂"
        },
        {
          "id": "ch3",
          "label": "–CH₃"
        },
        {
          "id": "h",
          "label": "–H"
        }
      ],
      "correctOrder": [
        "br",
        "oh",
        "nh2",
        "ch3",
        "h"
      ],
      "answer": [
        "br",
        "oh",
        "nh2",
        "ch3",
        "h"
      ]
    },
    {
      "id": "d15-cip-carbon-01",
      "day": 15,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.cip",
      "skillIds": [
        "stereo.cip"
      ],
      "difficulty": 2,
      "prompt": "比较 –CH₂OH 与 –CH₃，第一层都连 C，继续比较下一层后哪个优先？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "–CH₂OH 优先。",
        "why": "连接碳的下一层：CH₂OH 的集合含 O,H,H；CH₃ 是 H,H,H，O>H。",
        "full": "这是 CIP “逐层比较”的标准动作。"
      },
      "options": [
        {
          "id": "a",
          "label": "–CH₂OH"
        },
        {
          "id": "b",
          "label": "–CH₃"
        }
      ],
      "answer": "a",
      "formula": "–CH₂OH: [O,H,H] > –CH₃: [H,H,H]"
    },
    {
      "id": "d15-rs-rule-01",
      "day": 15,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.rs",
      "skillIds": [
        "stereo.rs"
      ],
      "difficulty": 2,
      "prompt": "若最低优先级 4 已背向你，1→2→3 顺时针，对应？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "R。",
        "why": "固定观察方向后顺时针=R。",
        "full": "若 4 朝向你则要反转。"
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
      "answer": "a",
      "formula": "4 away; 1→2→3 clockwise = R"
    },
    {
      "id": "d15-fischer-rule-01",
      "day": 15,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.fischer",
      "skillIds": [
        "stereo.fischer"
      ],
      "difficulty": 2,
      "prompt": "Fischer 投影中，水平键与竖直键分别朝向哪里？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "水平朝前，竖直朝后。",
        "why": "这是 Fischer 的固定透视规则。",
        "full": "所以最低优先级在横线上时，读取 1→2→3 后需要反转。"
      },
      "options": [
        {
          "id": "a",
          "label": "水平朝前、竖直朝后"
        },
        {
          "id": "b",
          "label": "水平朝后、竖直朝前"
        },
        {
          "id": "c",
          "label": "全都在纸面"
        }
      ],
      "answer": "a",
      "formula": "Fischer: horizontal toward; vertical away"
    },
    {
      "id": "d15-fischer-rotate-01",
      "day": 15,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.fischer",
      "skillIds": [
        "stereo.fischer"
      ],
      "difficulty": 2,
      "prompt": "一张 Fischer 投影在纸面内整体旋转 180°，构型会怎样？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "180° 旋转不变。",
        "why": "相当于同时交换两对位置，总体保留构型。",
        "full": "90° 旋转一般不允许当作等价变换。"
      },
      "options": [
        {
          "id": "a",
          "label": "不变"
        },
        {
          "id": "b",
          "label": "必反转"
        },
        {
          "id": "c",
          "label": "变成对映体"
        }
      ],
      "answer": "a",
      "formula": "Fischer 180° rotation = same configuration"
    },
    {
      "id": "d15-enantiomer-01",
      "day": 15,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.relationship",
      "skillIds": [
        "stereo.relationship"
      ],
      "difficulty": 2,
      "prompt": "一个有两个手性中心的分子：(R,R) 与 (S,S) 且无其它不对称因素，通常关系？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "对映体。",
        "why": "所有手性中心都反转。",
        "full": "若只有一部分中心反转，则通常是非对映体。"
      },
      "options": [
        {
          "id": "a",
          "label": "对映体"
        },
        {
          "id": "b",
          "label": "非对映体"
        },
        {
          "id": "c",
          "label": "同一物"
        }
      ],
      "answer": "a",
      "formula": "(R,R) ↔ (S,S)"
    },
    {
      "id": "d15-diastereomer-01",
      "day": 15,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.relationship",
      "skillIds": [
        "stereo.relationship"
      ],
      "difficulty": 2,
      "prompt": "(R,R) 与 (R,S) 通常是什么关系？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "非对映体。",
        "why": "只一个中心反转，不是整体镜像。",
        "full": "非对映体物性通常可不同。"
      },
      "options": [
        {
          "id": "a",
          "label": "非对映体"
        },
        {
          "id": "b",
          "label": "对映体"
        },
        {
          "id": "c",
          "label": "完全同一"
        }
      ],
      "answer": "a",
      "formula": "(R,R) vs (R,S)"
    },
    {
      "id": "d15-meso-01",
      "day": 15,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.meso",
      "skillIds": [
        "stereo.meso"
      ],
      "difficulty": 2,
      "prompt": "meso 化合物最关键的特征是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "有立体中心但整体 achiral。",
        "why": "内部对称使镜像可重合。",
        "full": "所以“有两个手性中心=一定旋光”是错误的。"
      },
      "options": [
        {
          "id": "a",
          "label": "有立体中心但因内部对称整体不手性"
        },
        {
          "id": "b",
          "label": "没有任何立体中心"
        },
        {
          "id": "c",
          "label": "一定只有一个碳"
        }
      ],
      "answer": "a",
      "formula": "meso: stereocenters + internal symmetry"
    },
    {
      "id": "d15-ez-01",
      "day": 15,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.ez",
      "skillIds": [
        "stereo.ez"
      ],
      "difficulty": 2,
      "prompt": "判断一个双键为 E/Z 的第一步是什么？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "先各端选高优先。",
        "why": "E/Z 比较的是两端的高优先基团相对位置。",
        "full": "同侧为 Z，异侧为 E。"
      },
      "options": [
        {
          "id": "a",
          "label": "在双键每一端分别按 CIP 选高优先基团"
        },
        {
          "id": "b",
          "label": "先看两个 CH₃ 是否同侧"
        },
        {
          "id": "c",
          "label": "先算 DBE"
        }
      ],
      "answer": "a",
      "formula": "CIP each alkene carbon → compare high groups"
    },
    {
      "id": "d15-no-ez-01",
      "day": 15,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.ez",
      "skillIds": [
        "stereo.ez"
      ],
      "difficulty": 2,
      "prompt": "CH₂=CHCl 是否有 E/Z？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "没有。",
        "why": "左侧双键碳有两个相同 H。",
        "full": "要有 E/Z，每个双键碳都必须连两个不同取代基。"
      },
      "options": [
        {
          "id": "a",
          "label": "没有"
        },
        {
          "id": "b",
          "label": "有 E 与 Z 两种"
        }
      ],
      "answer": "a",
      "formula": "CH₂=CHCl: one carbon has H/H → no E/Z"
    },
    {
      "id": "d15-newman-rank-01",
      "day": 15,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "stereo.newman",
      "skillIds": [
        "stereo.newman"
      ],
      "difficulty": 2,
      "prompt": "乙烷绕 C–C 单键的理想构象，按稳定性由高到低排。",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "交错更稳定。",
        "why": "扭转张力更小。",
        "full": "3D 模块会真正转 Newman；这里先记“错开比重叠舒服”。"
      },
      "items": [
        {
          "id": "st",
          "label": "交错 staggered"
        },
        {
          "id": "ec",
          "label": "重叠 eclipsed"
        }
      ],
      "correctOrder": [
        "st",
        "ec"
      ],
      "answer": [
        "st",
        "ec"
      ]
    },
    {
      "id": "d15-chair-01",
      "day": 15,
      "type": "choice",
      "role": "practice",
      "primarySkill": "stereo.chair",
      "skillIds": [
        "stereo.chair"
      ],
      "difficulty": 2,
      "prompt": "单取代环己烷中，大体积取代基通常更偏好？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "赤道位。",
        "why": "轴向会产生更多 1,3-diaxial 空间排斥。",
        "full": "环翻转会在 axial/equatorial 间切换，通常大基团占 equatorial 的构象更稳定。"
      },
      "options": [
        {
          "id": "a",
          "label": "赤道位 equatorial"
        },
        {
          "id": "b",
          "label": "轴向 axial"
        }
      ],
      "answer": "a",
      "formula": "bulky substituent → equatorial"
    },
    {
      "id": "d15-sn2-stereo-review-01",
      "day": 15,
      "type": "choice",
      "role": "transfer",
      "primarySkill": "substitution.stereochemistry",
      "skillIds": [
        "substitution.stereochemistry",
        "stereo.cip"
      ],
      "difficulty": 2,
      "prompt": "关于手性中心 SN2，最严谨结论是？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "几何反转确定，R/S 要重判。",
        "why": "新取代基可能改变 CIP 优先级。",
        "full": "把 Day4 的背面进攻与今天 CIP 算法合起来。"
      },
      "options": [
        {
          "id": "a",
          "label": "几何反转；R/S 标签需按产物重新做 CIP"
        },
        {
          "id": "b",
          "label": "一定字母 R↔S，无需重判"
        },
        {
          "id": "c",
          "label": "完全保持几何"
        }
      ],
      "answer": "a",
      "formula": "SN2 inversion ≠ blindly R↔S"
    },
    {
      "id": "v16-d15-l20-evidence",
      "day": 15,
      "type": "choice",
      "role": "transfer",
      "primarySkill": "stereo.relationship",
      "skillIds": [
        "stereo.relationship",
        "structure.constraint_elimination"
      ],
      "difficulty": 3,
      "prompt": "L20-0 与 L20-F 的普通 IR/NMR 很相似，但手性 HPLC 显示 L20-0 为高 ee 的 S 样品，而 L20-F 的 S:R 约为 51:49。最严谨的判断是？",
      "examTags": ["LAB-20", "立体证据"],
      "hints": [],
      "explanationLayers": {
        "short": "连接关系可以相同，但对映体组成不同，所以不能把 L20-F 当作合格的 L20-0。",
        "why": "普通非手性 IR/NMR 主要支持平面连接关系；S:R 组成必须依赖手性分析、旋光等证据。",
        "full": "X-17 是非手性酮，经普通 NaBH4 还原不会自动恢复单一 S 构型。L20-F 因此可以在普通谱图上与目标高度相似，却在手性 HPLC 上暴露近外消旋组成。"
      },
      "options": [
        { "id": "a", "label": "两者连接关系可相同，但对映体组成不同；L20-F 不能视为合格的 L20-0" },
        { "id": "b", "label": "普通 NMR 相似就证明两者空间身份完全相同" },
        { "id": "c", "label": "普通非手性 NMR 可以直接读出 S:R = 51:49" }
      ],
      "answer": "a",
      "formula": "achiral IR/NMR → connectivity; chiral HPLC / optical rotation → enantiomeric composition"
    }
  ],
  "repairs": {
    "stereo.cip": [
      {
        "id": "d15-repair-cip-01",
        "day": 15,
        "type": "choice",
        "role": "repair",
        "primarySkill": "stereo.cip",
        "skillIds": [
          "stereo.cip"
        ],
        "difficulty": 2,
        "prompt": "直接相连原子 O 与 C，谁 CIP 高？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "O。",
          "why": "原子序数 O(8)>C(6)。",
          "full": "第一层不同直接结束比较。"
        },
        "options": [
          {
            "id": "a",
            "label": "O"
          },
          {
            "id": "b",
            "label": "C"
          }
        ],
        "answer": "a"
      }
    ],
    "stereo.ez": [
      {
        "id": "d15-repair-ez-01",
        "day": 15,
        "type": "choice",
        "role": "repair",
        "primarySkill": "stereo.ez",
        "skillIds": [
          "stereo.ez"
        ],
        "difficulty": 2,
        "prompt": "E/Z 判断比较的是？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "每端按CIP选出的高优先基团。",
          "why": "同侧Z，异侧E。",
          "full": "先CIP后位置。"
        },
        "options": [
          {
            "id": "a",
            "label": "每端高优先基团"
          },
          {
            "id": "b",
            "label": "任意两个最大基团"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "CIP：先直接原子Z，平手再逐层",
    "4背向：顺R逆S；4朝前则反转",
    "Fischer横前竖后；180°等价",
    "all centers inverted→enantiomer；部分→diastereomer",
    "meso有中心但整体不手性",
    "E/Z：每端先CIP；高优先同侧Z异侧E",
    "大基团椅式偏equatorial"
  ]
};
})();
