(function () {
  'use strict';
  window.Organic637Data = window.Organic637Data || {};
  window.Organic637Data.days = window.Organic637Data.days || {};
  window.Organic637Data.days[5] = {
  "day": 5,
  "title": "四路竞争：SN1 / SN2 / E1 / E2",
  "subtitle": "今天不背四张表。把取代和消除放到同一个交通枢纽里，用底物、试剂、溶剂和温度逐层筛。",
  "estimatedMinutes": 85,
  "objectives": [
    "识别 α-C、β-C 与 β-H",
    "理解 E2 协同电子移动和 anti-periplanar",
    "区分 E1 与 E2",
    "判断 Zaitsev/Hofmann",
    "把 SN1/SN2/E1/E2 放在同一套流程里判断"
  ],
  "lessons": [
    {
      "id": "d05-lesson-elimination",
      "eyebrow": "",
      "title": "取代是“换人”，消除是“同时拉掉两样东西”",
      "body": "从卤代烃出发，如果碱不去进攻带 X 的碳，而是去拿相邻 β-碳上的 H，同时 X 离去，α/β 两个碳之间就形成 C=C。先把“β-H + 离去基 → 双键”看懂，再记 E2。",
      "note": "看到强碱、加热和二三级底物时，要主动检查消除。",
      "formulas": [
        "R–CH₂–CHX–R′ + Base⁻ → R–CH=CHR′ + HB + X⁻"
      ],
      "analogy": {
        "title": "像两个人同时拉开一条拉链",
        "body": "碱拉走 β-H，离去基从相邻碳离开，两件事同步发生，原来两个碳之间长出 π 键。",
        "boundary": "真实反应是轨道与电子协同，不是原子被机械拉扯。"
      },
      "visual": {
        "left": "β-H / C–X",
        "arrow": "Base⁻，一步",
        "right": "C=C",
        "caption": "E2：断 C–H、断 C–X、成 C=C 同步"
      },
      "lookQuestions": [
        "先找带 X 的 α-碳。",
        "再找相邻 β-碳上有没有 H。",
        "最后才问哪个 β-H 被拿走。"
      ]
    },
    {
      "id": "d05-lesson-e2",
      "eyebrow": "",
      "title": "E2：一步协同，速率同时看底物和碱",
      "body": "E2 的慢步骤就是唯一一步：碱夺 β-H、C–H 电子形成 π 键、C–X 键断裂。因为底物和碱都参与，所以速率都有关。",
      "note": "E2 没有自由碳正离子，因此一般不走碳正离子重排。",
      "formulas": [
        "E2：v = k[RX][Base⁻]",
        "Base⁻ + Hβ–Cβ–Cα–X → Cβ=Cα + HB + X⁻"
      ],
      "analogy": {
        "title": "像“三件事必须同一拍完成”",
        "body": "如果只拉 H 不让 X 走，或者只让 X 走却没有形成双键，就不是标准 E2。",
        "boundary": "这是协同过渡态，不存在能单独拿出来装瓶的中间体。"
      },
      "visual": {
        "left": "Base⁻···Hβ–Cβ–Cα–X",
        "arrow": "同一步",
        "right": "Cβ=Cα + HB + X⁻",
        "caption": "三根键的电子变化属于同一个过渡态"
      }
    },
    {
      "id": "d05-lesson-anti",
      "eyebrow": "",
      "title": "anti-periplanar：不是死记 180°，而是让轨道排成最好的一条线",
      "body": "E2 最顺利时，β-C–H 与 C–X 反式共平面。可以先把它想成两根需要被同时拆掉的键，必须排得足够“直”，C–H σ 轨道才能把电子顺畅送进正在形成的 π 轨道并与 C–X σ* 对齐。",
      "note": "环己烷里这会变成 trans-diaxial 要求，3D 版本以后再做；现在先会在题目给出的二维构象里找 anti。",
      "formulas": [
        "Hβ–Cβ–Cα–X：anti-periplanar → E2 最有利"
      ],
      "analogy": {
        "title": "像两扇门要在一条走廊两头对齐",
        "body": "轨道方向不对，再强的碱也会让这一构象的 E2 变得困难。",
        "boundary": "不是“离得远”就行，关键是二面角与轨道对齐。"
      }
    },
    {
      "id": "d05-lesson-zaitsev",
      "eyebrow": "",
      "title": "小碱与大碱：同样 E2，抢哪个 β-H 可能不同",
      "body": "多数较小强碱更容易给较多取代烯烃（Zaitsev）；体积很大的碱更容易从更暴露的 β-H 下手，Hofmann 产物比例会上升。先分“能否 E2”，再分“生成哪个烯烃”。",
      "note": "这不是绝对开关，底物构象、共轭与其它稳定因素也会改变主次。",
      "formulas": [
        "小而强的碱 → 常偏 Zaitsev",
        "t-BuO⁻ 等大体积碱 → Hofmann 比例提高"
      ],
      "analogy": {
        "title": "像伸手拿桌上的东西",
        "body": "小手能伸进拥挤位置，大手更愿意拿外侧容易够到的那一个 H。",
        "boundary": "最终主产物还要综合烯烃稳定性和构象。"
      }
    },
    {
      "id": "d05-lesson-e1",
      "eyebrow": "",
      "title": "E1：先形成碳正离子，再慢慢找 β-H",
      "body": "E1 与 SN1 共用第一步：离去基先走，形成碳正离子。之后如果溶剂/弱碱夺 β-H，就形成烯烃；如果亲核体进攻，则走 SN1。升温通常更利于消除。",
      "note": "有碳正离子就要检查重排。",
      "formulas": [
        "E1：RX → R⁺ + X⁻；R⁺ → 烯烃 + H⁺",
        "E1：v = k[RX]"
      ],
      "analogy": {
        "title": "先空出座位，再决定“坐人”还是“开一扇双键门”",
        "body": "SN1 和 E1 前半段相同，后半段才分叉。",
        "boundary": "具体比例受温度、溶剂、底物与亲核/碱性共同影响。"
      }
    },
    {
      "id": "d05-lesson-fourway",
      "eyebrow": "",
      "title": "四路交通枢纽：不要背四张表，要按四个问题筛",
      "body": "每题按固定顺序：①底物级数；②试剂更像亲核体还是强碱；③溶剂；④温度。甲基/一级 + 强亲核常 SN2；三级 + 强碱常 E2；三级 + 弱亲核极性质子环境常 SN1/E1；二级是真正竞争区。",
      "note": "二级底物最不能只凭一个关键词。",
      "formulas": [
        "1° + 强亲核/弱碱 → SN2 倾向",
        "3° + 强碱 → E2 倾向",
        "3° + 弱亲核 + protic → SN1/E1",
        "高温通常提高消除比例"
      ],
      "analogy": {
        "title": "像高速路四岔口",
        "body": "底物先决定哪些路根本进不去，试剂与条件再决定哪条路最畅通。",
        "boundary": "真实反应可能给混合物；网站的绿/黄路线就是为了保留这种竞争。"
      }
    }
  ],
  "questions": [
    {
      "id": "d05-beta-h-01",
      "day": 5,
      "type": "choice",
      "role": "learn",
      "primarySkill": "elimination.beta_h",
      "skillIds": [
        "elimination.beta_h"
      ],
      "difficulty": 2,
      "prompt": "2-溴丁烷里，E2 要形成双键，碱应该夺哪类 H？",
      "examTags": [],
      "hints": [
        "先找带 Br 的 α-C。",
        "再看它两侧相邻碳上的 H。"
      ],
      "explanationLayers": {
        "short": "夺 β-H。",
        "why": "E2 要在 α/β 两碳之间形成新的 π 键。",
        "full": "先把连 Br 的碳叫 α-C；它相邻的碳叫 β-C。碱夺 β-H，C–H 电子形成 Cα=Cβ，同时 Br⁻ 离去。"
      },
      "options": [
        {
          "id": "a",
          "label": "与带 Br 的碳相邻的 β-碳上的 H"
        },
        {
          "id": "b",
          "label": "同一个带 Br 碳上的 H"
        },
        {
          "id": "c",
          "label": "任意最远端 H"
        }
      ],
      "answer": "a",
      "formula": "CH₃–CH(Br)–CH₂–CH₃：Br 所在 C2=α；C1/C3=β"
    },
    {
      "id": "d05-e2-cond-01",
      "day": 5,
      "type": "choice",
      "role": "practice",
      "primarySkill": "elimination.e2",
      "skillIds": [
        "elimination.e2"
      ],
      "difficulty": 2,
      "prompt": "2-溴丁烷在 NaOEt/EtOH、加热下，最应该优先考虑哪类过程？",
      "examTags": [],
      "hints": [
        "二级底物是竞争区。",
        "强碱+热把天平推向消除。"
      ],
      "explanationLayers": {
        "short": "优先 E2。",
        "why": "二级底物遇较强碱且加热，消除竞争很强。",
        "full": "乙醇钠既有亲核性也有碱性；在二级底物和加热条件下，E2 通常是重要主路径。"
      },
      "options": [
        {
          "id": "a",
          "label": "E2 消除"
        },
        {
          "id": "b",
          "label": "SN1 纯取代"
        },
        {
          "id": "c",
          "label": "完全不反应"
        }
      ],
      "answer": "a",
      "formula": "CH₃CHBrCH₂CH₃ + EtO⁻/Δ → 烯烃"
    },
    {
      "id": "d05-zaitsev-rank-01",
      "day": 5,
      "type": "ranking",
      "role": "practice",
      "primarySkill": "elimination.zaitsev_hofmann",
      "skillIds": [
        "elimination.zaitsev_hofmann",
        "ranking.stability"
      ],
      "difficulty": 2,
      "prompt": "比较下列烯烃稳定性（基础规则，由高到低）。",
      "examTags": [],
      "hints": [
        "先只数双键两端烷基取代数。"
      ],
      "explanationLayers": {
        "short": "通常取代越多越稳定。",
        "why": "烷基取代可通过超共轭等稳定双键。",
        "full": "基础 Zaitsev 规律把较多取代烯烃视为更稳定；但共轭等因素以后可压过简单取代数。"
      },
      "items": [
        {
          "id": "a",
          "label": "2-甲基-2-丁烯（四/高取代）"
        },
        {
          "id": "b",
          "label": "2-甲基-1-丁烯（较少取代）"
        },
        {
          "id": "c",
          "label": "1-戊烯（末端）"
        }
      ],
      "correctOrder": [
        "a",
        "b",
        "c"
      ],
      "answer": [
        "a",
        "b",
        "c"
      ]
    },
    {
      "id": "d05-bulky-base-01",
      "day": 5,
      "type": "choice",
      "role": "practice",
      "primarySkill": "elimination.zaitsev_hofmann",
      "skillIds": [
        "elimination.zaitsev_hofmann"
      ],
      "difficulty": 2,
      "prompt": "2-溴-2-甲基丁烷用 t-BuOK/t-BuOH 加热，为什么末端较少取代烯烃比例可能上升？",
      "examTags": [],
      "hints": [
        "想象一个体积很大的手去抓 H。"
      ],
      "explanationLayers": {
        "short": "大体积碱提高 Hofmann 产物比例。",
        "why": "它更难靠近拥挤的 β-H。",
        "full": "空间位阻改变夺氢可达性，所以较少取代烯烃可能成为重要甚至主产物。"
      },
      "options": [
        {
          "id": "a",
          "label": "体积大，优先夺更暴露的 β-H"
        },
        {
          "id": "b",
          "label": "t-BuOK 是弱碱"
        },
        {
          "id": "c",
          "label": "三级卤代烃不能消除"
        }
      ],
      "answer": "a",
      "formula": "3° RX + t-BuOK/Δ → E2；Hofmann 比例↑"
    },
    {
      "id": "d05-e1-01",
      "day": 5,
      "type": "choice",
      "role": "practice",
      "primarySkill": "elimination.e1",
      "skillIds": [
        "elimination.e1"
      ],
      "difficulty": 2,
      "prompt": "叔丁基溴在乙醇中加热，若先形成叔丁基碳正离子，随后被乙醇夺 β-H 生成烯烃，这一步属于什么？",
      "examTags": [],
      "hints": [
        "看有没有先形成独立碳正离子。"
      ],
      "explanationLayers": {
        "short": "这是 E1。",
        "why": "先有碳正离子，再失去 β-H。",
        "full": "E1 与 SN1 共用电离步骤；后续去质子化生成 π 键即为 E1。"
      },
      "options": [
        {
          "id": "a",
          "label": "E1"
        },
        {
          "id": "b",
          "label": "E2"
        },
        {
          "id": "c",
          "label": "SN2"
        }
      ],
      "answer": "a",
      "formula": "(CH₃)₃CBr → (CH₃)₃C⁺ → (CH₃)₂C=CH₂"
    },
    {
      "id": "d05-temp-01",
      "day": 5,
      "type": "choice",
      "role": "practice",
      "primarySkill": "elimination.competition",
      "skillIds": [
        "elimination.competition"
      ],
      "difficulty": 2,
      "prompt": "同一三级底物在极性质子溶剂中，升高温度通常会把 SN1/E1 混合物的比例往哪边推？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "通常更偏消除 E1。",
        "why": "消除在熵方面常更有利，升温会提高其相对比例。",
        "full": "这不是说取代完全消失，而是 SN1/E1 共存时，升温常使烯烃比例上升。"
      },
      "options": [
        {
          "id": "a",
          "label": "更偏 E1"
        },
        {
          "id": "b",
          "label": "更偏 SN2"
        },
        {
          "id": "c",
          "label": "温度绝对没有影响"
        }
      ],
      "answer": "a",
      "formula": "3° RX + protic：SN1/E1；Δ → E1 比例↑"
    },
    {
      "id": "d05-comp-primary-01",
      "day": 5,
      "type": "choice",
      "role": "practice",
      "primarySkill": "elimination.competition",
      "skillIds": [
        "elimination.competition"
      ],
      "difficulty": 2,
      "prompt": "1-溴丁烷 + NaCN/DMSO，室温。主路径更可能是哪一个？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "SN2。",
        "why": "一级底物位阻小，CN⁻ 是好亲核体，DMSO 支持 SN2。",
        "full": "一级碳正离子不稳定，所以 SN1/E1 不利；CN⁻ 又不是典型大体积强碱。"
      },
      "options": [
        {
          "id": "a",
          "label": "SN2"
        },
        {
          "id": "b",
          "label": "E1"
        },
        {
          "id": "c",
          "label": "SN1"
        }
      ],
      "answer": "a",
      "formula": "CH₃CH₂CH₂CH₂Br + CN⁻/DMSO → CH₃CH₂CH₂CH₂CN"
    },
    {
      "id": "d05-comp-tert-01",
      "day": 5,
      "type": "choice",
      "role": "practice",
      "primarySkill": "elimination.competition",
      "skillIds": [
        "elimination.competition"
      ],
      "difficulty": 2,
      "prompt": "叔丁基溴 + t-BuOK/t-BuOH，加热。主路径最可能是什么？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "E2。",
        "why": "三级底物堵死普通 SN2，强大体积碱+热强烈促进消除。",
        "full": "虽然三级底物在某些条件可 SN1/E1，但这里强碱使协同 E2 更快。"
      },
      "options": [
        {
          "id": "a",
          "label": "E2"
        },
        {
          "id": "b",
          "label": "SN2"
        },
        {
          "id": "c",
          "label": "SN1 为唯一产物"
        }
      ],
      "answer": "a",
      "formula": "(CH₃)₃CBr + t-BuO⁻/Δ → (CH₃)₂C=CH₂"
    },
    {
      "id": "d05-comp-secondary-01",
      "day": 5,
      "type": "choice",
      "role": "practice",
      "primarySkill": "elimination.competition",
      "skillIds": [
        "elimination.competition"
      ],
      "difficulty": 2,
      "prompt": "2-溴丁烷 + NaOEt/EtOH，加热。以下哪句话最合理？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "二级底物这里 E2 很重要，同时可能有 SN2 竞争。",
        "why": "二级底物是竞争区，强碱与热提高消除。",
        "full": "考试若问主产物通常选较稳定烯烃；若问“可能机理”，不要把竞争关系抹掉。"
      },
      "options": [
        {
          "id": "a",
          "label": "E2 很重要，SN2 可能竞争"
        },
        {
          "id": "b",
          "label": "一定只有 SN1"
        },
        {
          "id": "c",
          "label": "一定只有 SN2，E2 不可能"
        }
      ],
      "answer": "a",
      "formula": "2° RX + EtO⁻/EtOH/Δ → E2 主 + SN2 竞争"
    },
    {
      "id": "d05-anti-01",
      "day": 5,
      "type": "choice",
      "role": "practice",
      "primarySkill": "elimination.antiperiplanar",
      "skillIds": [
        "elimination.antiperiplanar"
      ],
      "difficulty": 2,
      "prompt": "E2 对 β-C–H 与 C–X 的几何要求，基础上最有利的是哪一种？",
      "examTags": [],
      "hints": [],
      "explanationLayers": {
        "short": "anti-periplanar 最有利。",
        "why": "这样 σ(C–H) 向 π 与 σ*(C–X) 的轨道重叠最好。",
        "full": "二维题先学会识别 180° 关系；环己烷的 trans-diaxial 以后在3D模块深化。"
      },
      "options": [
        {
          "id": "a",
          "label": "反式共平面 anti-periplanar"
        },
        {
          "id": "b",
          "label": "完全同向重叠"
        },
        {
          "id": "c",
          "label": "几何完全无关"
        }
      ],
      "answer": "a",
      "formula": "Hβ–Cβ–Cα–X：二面角约 180° → E2 有利"
    },
    {
      "id": "d05-arrow-e2-01",
      "day": 5,
      "type": "electron-arrow",
      "role": "practice",
      "primarySkill": "mechanism.electron_source",
      "skillIds": [
        "mechanism.electron_source",
        "mechanism.electron_target",
        "elimination.e2"
      ],
      "difficulty": 3,
      "prompt": "给一个简化 E2：请画出“碱夺 H、C–H 成 π、C–Br 离去”的三支双电子箭头。",
      "examTags": [],
      "hints": [
        "箭尾永远从已有电子出发。",
        "三支箭是同一步。"
      ],
      "explanationLayers": {
        "short": "三支箭同时属于一个 E2 步骤。",
        "why": "电子从碱孤对、C–H 键和 C–Br 键出发。",
        "full": "第一支到 H；第二支把 C–H 电子送到 C–C 形成 π；第三支把 C–Br 电子送给 Br。"
      },
      "formula": "Base⁻ + Hβ–Cβ–Cα–Br → Cβ=Cα + HBase + Br⁻",
      "baseSvg": "<svg viewBox=\"0 0 640 300\" role=\"img\" aria-label=\"电子箭头练习\"><text x=\"30\" y=\"42\" font-size=\"22\">Base⁻ + Hβ–Cβ–Cα–Br → Cβ=Cα + HBase + Br⁻</text><circle cx=\"80\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"92\" y=\"136\" font-size=\"18\">Base⁻孤对</text><circle cx=\"210\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"222\" y=\"136\" font-size=\"18\">β-H</text><circle cx=\"285\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"297\" y=\"136\" font-size=\"18\">Cβ–H键</text><circle cx=\"365\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"377\" y=\"136\" font-size=\"18\">Cβ–Cα键</text><circle cx=\"445\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"457\" y=\"136\" font-size=\"18\">Cα–Br键</text><circle cx=\"545\" cy=\"130\" r=\"9\" fill=\"#f1b2a7\"/><text x=\"557\" y=\"136\" font-size=\"18\">Br</text></svg>",
      "hotspots": [
        {
          "id": "base",
          "x": 80,
          "y": 130,
          "role": "source",
          "label": "Base⁻孤对"
        },
        {
          "id": "h",
          "x": 210,
          "y": 130,
          "role": "target",
          "label": "β-H"
        },
        {
          "id": "ch",
          "x": 285,
          "y": 130,
          "role": "source",
          "label": "Cβ–H键"
        },
        {
          "id": "cc",
          "x": 365,
          "y": 130,
          "role": "target",
          "label": "Cβ–Cα键"
        },
        {
          "id": "cbr",
          "x": 445,
          "y": 130,
          "role": "source",
          "label": "Cα–Br键"
        },
        {
          "id": "br",
          "x": 545,
          "y": 130,
          "role": "target",
          "label": "Br"
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
          "source": "cbr",
          "target": "br",
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
          "source": "cbr",
          "target": "br",
          "arrowType": "pair",
          "sequence": 1
        }
      ]
    },
    {
      "id": "d05-fourway-route-01",
      "day": 5,
      "type": "route",
      "role": "transfer",
      "primarySkill": "elimination.competition",
      "skillIds": [
        "elimination.competition",
        "synthesis.route_evaluation"
      ],
      "difficulty": 3,
      "prompt": "二级底物 2-溴丁烷在不同条件下会走哪条路？先选一个条件支路继续观察。",
      "examTags": [],
      "hints": [
        "先看底物是二级。",
        "再看强碱/弱亲核/温度。"
      ],
      "explanationLayers": {
        "short": "主路线可直接用强碱 E2 得到烯烃。",
        "why": "黄色支路代表化学上能走但不一定高效/单一。",
        "full": "四路竞争题的价值是先排除“不可能”，再比较哪条更占优势，而不是把现实混合物硬写成只有一条路。"
      },
      "graph": {
        "start": "rx",
        "target": "alkene",
        "nodes": [
          {
            "id": "rx",
            "label": "2-溴丁烷",
            "structure": "CH₃CHBrCH₂CH₃"
          },
          {
            "id": "sn2",
            "label": "2-丁醇/取代物支路",
            "structure": "CH₃CH(OR)CH₂CH₃"
          },
          {
            "id": "alkene",
            "label": "2-丁烯为主的消除支路",
            "structure": "CH₃CH=CHCH₃"
          },
          {
            "id": "sn1mix",
            "label": "SN1/E1 混合支路",
            "structure": "取代物 + 烯烃"
          }
        ],
        "edges": [
          {
            "id": "e2",
            "from": "rx",
            "to": "alkene",
            "choice": "EtONa/EtOH，加热",
            "reagent": "EtONa/EtOH, Δ",
            "status": "green",
            "reason": "强碱+二级底物+热，E2 很重要。"
          },
          {
            "id": "sn2e",
            "from": "rx",
            "to": "sn2",
            "choice": "NaCN/DMSO，低温",
            "reagent": "NaCN/DMSO",
            "status": "yellow",
            "reason": "二级底物可 SN2，但位阻使其比一级慢。"
          },
          {
            "id": "solv",
            "from": "rx",
            "to": "sn1mix",
            "choice": "EtOH，弱亲核，加热",
            "reagent": "EtOH, Δ",
            "status": "yellow",
            "reason": "可发生溶剂解并伴随 E1。"
          },
          {
            "id": "mix_to",
            "from": "sn1mix",
            "to": "alkene",
            "choice": "继续升温观察烯烃比例",
            "reagent": "Δ",
            "status": "yellow",
            "reason": "E1 比例提高，但不是唯一。"
          }
        ],
        "referenceRoutes": [
          [
            "e2"
          ],
          [
            "solv",
            "mix_to"
          ]
        ]
      },
      "answer": {
        "acceptedPaths": [
          [
            "e2"
          ],
          [
            "solv",
            "mix_to"
          ]
        ],
        "preferredPath": [
          "e2"
        ]
      }
    }
  ],
  "repairs": {
    "elimination.beta_h": [
      {
        "id": "d05-repair-beta-01",
        "day": 5,
        "type": "choice",
        "role": "repair",
        "primarySkill": "elimination.beta_h",
        "skillIds": [
          "elimination.beta_h"
        ],
        "difficulty": 2,
        "prompt": "1-溴丙烷发生 E2 时，哪一个是 β-碳？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "中间 CH₂ 是 β-碳。",
          "why": "它与带 Br 的 α-C 直接相邻。",
          "full": "E2 只能从相邻 β-C 上夺 H 来形成 α=β 双键。"
        },
        "options": [
          {
            "id": "a",
            "label": "中间 CH₂"
          },
          {
            "id": "b",
            "label": "带 Br 的末端 CH₂"
          },
          {
            "id": "c",
            "label": "另一端 CH₃ 不是相邻碳"
          }
        ],
        "answer": "a",
        "formula": "CH₃–CH₂(β)–CH₂Br(α)"
      }
    ],
    "elimination.competition": [
      {
        "id": "d05-repair-comp-01",
        "day": 5,
        "type": "choice",
        "role": "repair",
        "primarySkill": "elimination.competition",
        "skillIds": [
          "elimination.competition"
        ],
        "difficulty": 2,
        "prompt": "叔丁基溴 + 强碱 t-BuO⁻，最不可能的主路径是哪一个？",
        "examTags": [],
        "hints": [],
        "explanationLayers": {
          "short": "SN2 最不可能。",
          "why": "三级碳背面位阻巨大。",
          "full": "三级底物的普通 SN2 基本被阻断；强碱会推动 E2。"
        },
        "options": [
          {
            "id": "a",
            "label": "SN2"
          },
          {
            "id": "b",
            "label": "E2"
          }
        ],
        "answer": "a"
      }
    ]
  },
  "memorySheet": [
    "E2：v=k[RX][Base⁻]，一步协同",
    "E1：v=k[RX]，先碳正离子后失H",
    "E2 需要 β-H；anti-periplanar 最有利",
    "小碱常偏 Zaitsev；大体积碱提高 Hofmann",
    "1°+强亲核→SN2；3°+强碱→E2；3°+protic弱亲核→SN1/E1"
  ]
};
})();
