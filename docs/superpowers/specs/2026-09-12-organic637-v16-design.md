# Organic637 V16 沉浸式课程重构设计规格

**状态**：Design approved in chat; implementation not started  
**日期**：2026-09-12  
**目标仓库路径**：`docs/superpowers/specs/2026-09-12-organic637-v16-design.md`  
**项目**：organic637-lab  
**版本代号**：V16 · LAB-20：零号样品

---

## 1. 背景与问题定义

现有 Organic637 已具备完整的 20 天课程、零基础桥接、首次术语解释、scaffold、repair、adaptive pool、结构推断、合成、3D、复习、Day19 综合测试、Day20 Top3 修复、登录与云同步等能力。前期多轮测试证明，知识体系本身已经较完整，真正影响体验的上层问题是：

1. 许多 Day 的实际学习时长达到 70–90 分钟，超出可持续注意力范围。
2. 同一知识经由 beginner foundations、lesson、first-use、scaffold、question explanation、repair 等多个层连续出现，单层合理但叠加后产生重复与疲劳。
3. 学生连续十几分钟甚至三十分钟都处于“继续接收知识”的心理任务，情绪曲线过平。
4. 网页拥有图、动画、3D、交互等优势，但部分内容仍像“把教材搬到网页”。
5. 学习兴趣下降后，即使内容正确、解释充分，学生也不愿继续完成当天课程。

V16 不增加新的学科覆盖目标。它基于现有已经完整的知识资产重新编排，目标是把课程从“知识完整的网页教材”升级为“40–60 分钟内可持续完成的沉浸式学习产品”。

---

## 2. 不可改变的两大基石

### 2.1 知识是真知识

- 有机化学的定义、前置、机理、空间关系、因果链不能因剧情而降低严谨性。
- 第一次出现的新术语必须拥有已解释的前置或同步的轻解释。
- 不允许为悬疑故意隐藏学生理解知识所必需的信息。
- 不允许把关键机理变成“猜谜”或靠剧情角色给答案。

### 2.2 真题是真题

- 637 训练必须保持正式考试表达、真实解题逻辑和独立能力要求。
- 日常剧情可以帮助学习，但进入 637 Exit 后故事明显弱化。
- Day19 完全退出剧情、人物、3D与即时扶手。
- 完整 150 分卷保留为独立“考前正式模拟”，不因 V16 主线减时而删除。

---

## 3. V16 的核心目标

### 3.1 时长

- 普通 Day 必修：40–60 分钟。
- 推荐区间：45–55 分钟。
- Day15、Day19 允许接近 60 分钟。
- 任何必修 Day 不得通过“让学生读快一点”满足时间上限；超过 60 分钟必须做内容取舍。

### 3.2 节奏

- 连续纯 instruction 原则上不超过 8 分钟。
- 每约 12–15 分钟至少发生一次明显心理任务切换：漫画、案件应用、交互、3D、身份变化等。
- 每 Day 至少一次案件知识应用、两次明显 engagement shift、一次自然无压力呼吸点。
- 最后 10 分钟不得再引入新的核心概念。

### 3.3 学习体验

学生一天的基本体验为：

**漫画制造问题 → 学一个核心能力 → 立即动手 → 回到案件应用 → 再补必要知识 → 换身份解决问题 → 637 正式题 → 剧情推进/悬念结束。**

课程不是知识→知识→知识→题，而是不断循环：

**好奇 → 理解 → 使用 → 成功 → 新问题。**

---

## 4. 内容取舍制度

所有旧知识资产保留在知识库，但主线使用分为五级。

### A. `KEEP_MAIN`
必须进入主线。删掉后会阻断后续核心理解、影响高频 637 能力，或使当天案件无法推进。

### B. `SHORTEN`
必要支撑，但只讲到支撑主概念的程度，不展开为独立章节。

### C. `OPTIONAL_CASE_FILE`
真实可能考、但收益不足以占用当天主线时间。以“案件附件 · 约2分钟”等可选入口保留。

### D. `REPAIR_ONLY`
默认不主动展示。学生答错、高置信错误、mastery 低、Day20 命中 Top3 或主动请求帮助时才调用。

### E. `REMOVE_FROM_20D`
退出 20 天必修，但仍可存在于完整知识地图、复习库、考前资料或完整模拟解析中。

**判断原则**：知识“有用”“偶尔会考”“已经做过”不能自动获得主线资格。主线必须至少满足：阻断核心理解 / 高频 637 需要 / 显著降低理解成本 / 直接推进当天能力中的一项。

---

## 5. 故事定位

### 5.1 总故事

**《LAB-20：零号样品》**

大学联合实验中心正在完成代号 L-20 的有机合成项目。最终验收前夜：

- 标准样品 `L20-0` 从原储存位置“消失”；
- 最终样品 `L20-F` 与预期存在异常；
- 实验记录在 22:14 被修改；
- 关键中间样品 `X-17` 没有正式登记；
- 试剂标签与库存记录存在矛盾。

玩家以新加入的轮转调查助理身份，在 20 天内重建实验事实链。玩家开始时不会完整有机化学是合理设定：为了看懂证据，必须逐渐学习结构、反应、光谱、立体和合成。

### 5.2 故事不是独立小说模块

后台先拥有完整小说/案件圣经，以保证人物动机、时间线和伏笔自洽；网页前台不让学生长篇读小说。

漫画要求：

- 每个 scene 主要 2–5 格；
- 用立绘、场景、证物特写、时间戳、手机消息、表情讲故事；
- 不用大段旁白；
- 不做视觉小说式连续十几次点击；
- 漫画不是单独的“休息模块”，而是自然承担案件、人物、八卦、伏笔和情绪呼吸。

### 5.3 叙事气质

参考成熟推理作品的高层叙事方法：封闭人物群、误导但公平的线索、多层动机、前期小细节后期回收、结论由证据闭环决定。不得照搬任何现有作品情节、人物或文风。

整体是成熟实验室悬疑，不儿童化、不恐怖化、不卖萌化。

---

## 6. 案件 Single Source of Truth

故事事实只允许存在一份程序真源：`data/v16-story.js`。

### 6.1 主要人物

- **周砚**：项目负责人，深蓝。克制、严格。未参与篡改，但必须承担高压管理环境的责任。
- **许临川**：合成负责人，暗红。专业、理性。发现事故后采用备用路线补救，最终删除真实偏差记录。
- **林岑**：分析平台主管，青绿。谨慎、证据优先。发现异常后擅自封存样品以保全证据，是前中期主要红鲱鱼。
- **顾遥**：博士生，紫色。临近答辩。最先发生试剂混淆并隐瞒部分事实，是第一块多米诺骨牌。
- **程野**：管理员，姜黄。负责仪器、库存、门禁和轻松气氛。不得故意制造假线索。
- **玩家**：外部/轮转调查助理。无既有利益关系，从不会看结构式逐步成长到能独立重建路线。

### 6.2 核心真相

案件不是一个“坏人偷样品”的简单故事，而是三个行为叠加：

1. 顾遥发生试剂混淆并没有第一时间完整报告——操作事故与隐瞒。
2. 许临川发现正式路线偏离后启用被否决的备用路线进行补救；补救产物极其接近目标，但立体结构错误；他随后删除实验偏差/补救记录——科研记录篡改。
3. 林岑发现最终样品异常、电子记录正在变化，擅自把零号样品、最终样品和异常中间样品封存在异常样品柜中——程序违规但目的为保存证据。

主题：**实验失败不是最危险的；最危险的是一个人开始觉得“差不多也可以算正确”。**

### 6.3 冻结时间线

以下时间不得在 Day 文件中重新手写为不同版本：

- 19:52 顾遥领取试剂，本应使用 R-17B，发生标签/位置混淆。
- 20:16 顾遥发现反应状态异常。
- 20:23 顾遥找到许临川。
- 20:31 许临川确认正式路线明显偏离。
- 20:47 许临川调出六个月前的备用路线。
- 20:58 实验室打印机打印备用路线资料；前期仅知道“有人打印”。
- 21:06 电子记录如实写入“条件偏差 + 尝试补救路线，结果待复核”。
- 21:18 补救产生中间样品 X-17，快速结果看似良好。
- 21:26 X-17 剩余样品被置于废弃样品区，随后被林岑发现。
- 21:31 林岑得到 L20-F 第一轮快速分析，发现与 L20-0 异常差异。
- 21:38 林岑看到记录中的条件偏差/补救说明。
- 21:42 林岑进入冷藏室。
- 21:46 林岑将 L20-0、L20-F 转移到 B3 异常样品柜。
- 21:49 林岑把 X-17 一并封存。
- 21:53 林岑离开冷藏室。
- 21:56 林岑通知周砚最终样品异常、暂停验收、不要继续处理样品；未说明自己已移动样品。
- 22:03 许临川发现两份样品不在原位置，意识到问题可能已暴露。
- 22:14 许临川删除电子记录中的条件偏差与补救路线说明。
- 22:19 系统保存最终版本。
- 23:47 周砚开始联系成员。
- 00:17 打开 L20-0 原储存盒，确认“失踪”，故事开始。

### 6.4 三次主要反转

1. **Day8左右**：顾遥拿错试剂不能解释最终结构；事故后有人主动进行了第二条路线。
2. **Day12**：B3打开，L20-0从未真正被盗；“失踪案”是假象，真正案件转向实验记录为什么被正常化。
3. **Day15**：二维连接相似不足以证明同一物质；3D 立体比较证明 L20-F 与 L20-0 关键构型不同，并吻合备用路线已知风险。

### 6.5 公平线索要求

关键真相必须在揭晓前留下可回溯线索，禁止结尾突然引入决定性新证据。

- 林岑封存：门禁、暂停消息、异常柜、证据保护行为。
- 顾遥事故：库存、R-17A/B、标签重贴、紧张反应。
- 备用路线：旧路线争论、打印记录、X-17无法由正式路线解释。
- 许临川篡改：三个记录版本、对林岑发现内容的异常关注、主动接手顾遥事故、反复强调“足够接近”。

最终结论必须来自 **化学证据 + 文档证据 + 人证 + 行为证据 + 时间证据** 的合证，不允许仅靠门禁/刷卡抓人。

---

## 7. 20 天五幕结构

现有五段能力成长保留，但换为案件语言。

### ACT I — Day1–4：现场：你甚至还看不懂证据
从结构语言、双键、炔烃、SN1/SN2开始，学生逐步从“看不懂”变成能识别结构变化。

### ACT II — Day5–8：实验记录开始撒谎
建立 SN1/SN2/E1/E2、氧枢纽、羰基、酰基取代等反应发动机，证明简单操作事故不是全部真相。

### ACT III — Day9–12：碳骨架不会撒谎
enolate、Aldol、Claisen/Michael、芳香定位、重氮/腈等用于重建隐藏路线；Day12完成“样品从未被盗”的大反转。

### ACT IV — Day13–16：无名样品
DBE、IR、NMR、立体、多证据联合鉴定。Day15通过强制3D完成核心翻案。

### ACT V — Day17–20：重建 L-20
逆合成、顺序与兼容性、正式综合审核、Top3修复和最终案件报告。

---

## 8. 每日核心能力与目标时间

| Day | 案件标题 | 唯一核心能力 | 目标时间 |
|---|---|---|---:|
| 1 | 零号样品 | 看懂结构、键、官能团和第一条电子故事 | 49 min |
| 2 | 三个版本 | 条件改变会改变反应出口 | 49 min |
| 3 | R-17 | 小结构差异带来不同化学行为；第一次主动构建C–C | 51 min |
| 4 | 第二只烧瓶 | SN1 vs SN2 | 54 min |
| 5 | 四条岔路 | SN1/SN2/E1/E2统一决策 | 55 min |
| 6 | 氧的痕迹 | 醇/醚/环氧统一氧枢纽 | 51 min |
| 7 | 羰基上的指纹 | C=O亲核加成母动作 | 51 min |
| 8 | 被重新贴过的标签 | 亲核酰基取代统一逻辑 | 50 min |
| 9 | 多出来的一根C–C键 | enolate与Aldol | 52 min |
| 10 | 旧路线 | Claisen/Michael/β-二羰基构碳 | 54 min |
| 11 | 芳环上的路线指纹 | 芳香性/EAS/定位 | 53 min |
| 12 | B3 | 重氮转接、CN +1C、腈 | 54 min |
| 13 | 无名样品 I | DBE+IR+化学检验做证据排除 | 49 min |
| 14 | 无名样品 II | NMR联合证据锁定平面结构 | 53 min |
| 15 | 镜子里的答案 | 立体化学与空间鉴定 | 59 min |
| 16 | 完整鉴定 | 多证据整合与主导因素判断 | 51 min |
| 17 | 倒着走 | 逆合成与碳数账本 | 53 min |
| 18 | 22:14 | 合成顺序、保护和兼容性 | 55 min |
| 19 | 封闭卷宗 | 无扶手综合能力审核 | 58–60 min |
| 20 | 零号样品 | 最终案件报告 + Top3修复 | 54 min |

平均约 52–53 分钟。

---

## 9. 关键内容迁移决策

### Day1
`KEEP_MAIN`：结构语言、官能团、电子丰富/缺乏、π键、加成、HBr电子过程、基础碳正离子稳定性。  
`SHORTEN`：命名、σ/π文字描述。  
`MOVE_LATER`：Br2/CCl4、Br2/H2O的大量训练。

### Day2
`KEEP_MAIN`：HBr vs HBr/ROOR、氢硼化、H2/Pd、O3。  
`SHORTEN`：NBS。  
`OPTIONAL_CASE_FILE`：热浓KMnO4复杂边界。

### Day3
`KEEP_MAIN`：端炔酸性、炔负离子、C–C构建、Lindlar/Na-NH3。  
`SHORTEN`：两种水合。  
`OPTIONAL_CASE_FILE`：Diels–Alder主体。

### Day4
核心全部保留，减少重复练习；SN2 3D强制。

### Day5
`KEEP_MAIN`：α/β、β-H、E2、E1、四路竞争、Zaitsev。  
`SHORTEN`：Hofmann。  
`REPAIR_ONLY`：复杂例外。  
E2 anti 3D强制。

### Day6
`KEEP_MAIN`：OH离去问题、氧化、Williamson、环氧开环、环氧乙烷+2C。  
`SHORTEN`：脱水。  
`OPTIONAL_CASE_FILE`：Lucas。  
`REPAIR_ONLY`：复杂醚裂解。

### Day7
`KEEP_MAIN`：C=O极化、亲核加成、NaBH4、Grignard。  
`SHORTEN`：CN-、Tollens。  
`MOVE_DAY18`：缩醛保护。  
`OPTIONAL_CASE_FILE`：Wittig。  
`REMOVE_FROM_REQUIRED`：肟/腙大块训练。

### Day8
`KEEP_MAIN`：共同骨架、活性方向、亲核酰基取代、酯化/水解、酰氯→酰胺。  
`SHORTEN`：NaBH4/LAH边界。  
`MOVE_DAY17`：Hofmann −1C。

### Day9
核心保留；交叉Aldol缩短；复杂定向enolate repair-only。

### Day10
`KEEP_MAIN`：统一地图、Claisen、Michael、β-二羰基、丙二酸酯/乙酰乙酸酯核心用途、脱羧。  
`OPTIONAL_CASE_FILE`：Dieckmann。

### Day11
`KEEP_MAIN`：芳香性核心、EAS母动作、定位、活化/钝化、卤素例外。  
`SHORTEN`：亲电体生成细节。  
`SUPPORT`：Friedel–Crafts局限。

### Day12
`KEEP_MAIN`：NO2→NH2、重氮、N2+转换、CN +1C、腈水解/还原。  
`SHORTEN`：胺碱性。  
`MOVE_DAY18`：氨基保护。  
`OPTIONAL_CASE_FILE`：偶氮偶联。

### Day13
DBE、IR、关键化学检验、候选排除全部保留；训练量改为 1 套带练 + X-17真实案件。

### Day14
NMR四核心全部保留；训练量改为 1 套带练 + 1 套半扶手 + X-17独立鉴定，其余进复习库。

### Day15
强制3D：四面体、楔线/虚线、镜像重合、CIP、R/S。  
`KEEP_MAIN`：对映/非对映、meso核心、E/Z。  
`SHORTEN`：Fischer。  
`ON_DEMAND/QUICK_CORE`：Newman、chair。  
新增：L20-0 vs L20-F立体重合实验。

### Day16
现有“八位裁判 + 电子动作”从新课改为证据整合训练；不会时再调 scaffold。

### Day17
核心逆合成思想全部保留；路线数量改为 1 教学 + 1 LAB-20案件 + 1复习/扩展。

### Day18
保留顺序、兼容性、路线评价；接回 Day7 缩醛保护和 Day12 氨基保护，在真正需要时再教。

### Day19
原150分Boss不删除。新增55–60分钟 `DAY19_CORE` 作为20天主线；原卷成为 `FULL_150_EXAM` 独立考前模拟。

### Day20
现有Top3算法、adaptive pools、transfer原则保留；增加案件最终报告与 CASE CLOSED；Boss题数量减少。

---

## 10. 3D 制度

### 10.1 REQUIRED
不看空间容易建立错误概念时必须完成：

- 四面体碳；
- 楔线/虚线；
- SN2 backside；
- E2 anti-periplanar；
- chirality；
- CIP；
- R/S；
- 关键 E/Z。

Required 3D 未完成不得推进 Director cursor。

### 10.2 ON_DEMAND
二维可能足够，但部分学生会想象困难：

- 环氧背面开环；
- cis/trans选择性还原；
- Newman；
- chair；
- Diels–Alder；
- 其它反复二维判断失败的位置。

界面入口采用“空间想不出来？拿起来看看”。

### 10.3 NONE
DBE、IR、一般酸碱、简单官能团、普通条件等二维更清晰的内容不使用3D。

### 10.4 新增核心3D：`l20_stereo_compare`

Day15显示 L20-0 与 L20-F。支持：

- 同步/独立旋转；
- 原子/取代基标签开关；
- 关键手性中心标记；
- 对齐与尝试重合；
- 显示无法同时对齐的关键空间差异。

目的不是“弹错”，而是让学生亲眼看见“连接关系相似 ≠ 同一个空间结构”。

---

## 11. 技术架构

### 11.1 推荐方案

采用独立 **Director/Narrative Layer**，复用全部成熟教学能力。

不选择：

- 直接继续把V16写进 `app.js` 与各Day文件：短期快，长期职责继续纠缠。
- 完全新建第二套V16课程数据库：重复内容、双数据源、迁移风险过高。

### 11.2 新增文件

```text
data/
  v16-story.js
  v16-director.js
  v16-assets.js
  v16-exam.js

js/
  director-engine.js
  narrative-engine.js
  comic-renderer.js
  case-board.js

assets/story/
  characters/
  backgrounds/
  evidence/
  comics/
```

### 11.3 旧系统职责保持

继续负责：

- lesson renderer；
- question判分；
- mastery与attempt evidence；
- repair；
- adaptive pool；
- review；
- detective；
- synthesis；
- 3D engine及2D fallback；
- Day19评分；
- Day20 Top3；
- auth、Worker、D1、云同步、localStorage。

Director 只决定“现在该展示哪个已存在的能力/场景”。

---

## 12. Director 数据模型

V16 Director 不复制知识正文，只引用已有ID。

示意：

```js
{
  day: 1,
  title: '零号样品',
  targetMinutes: 49,
  sequence: [
    { type: 'comic', sceneId: 'case01-open', minutes: 2 },
    { type: 'lesson', ref: 'd01-zero-01-language', minutes: 4 },
    { type: 'interaction', ref: 'v16-d01-evidence-mark', minutes: 3 },
    { type: 'lesson', ref: 'd01-zero-03-electrons', minutes: 5 },
    { type: 'comic', sceneId: 'case01-return', minutes: 2 },
    { type: 'question', ref: '...', mode: 'transfer', minutes: 4 },
    { type: 'question-group', refs: ['...', '...'], mode: '637_exit', minutes: 8 },
    { type: 'comic', sceneId: 'case01-cliffhanger', minutes: 2 }
  ]
}
```

允许 step 类型：

- `comic`
- `lesson`
- `interaction`
- `question`
- `question-group`
- `3d`
- `detective`
- `synthesis`
- `case-board`
- `exam`

旧 lesson/question/3D 仍是内容真源，V16只引用 `ref`。

---

## 13. 资产迁移元数据

每个旧 lesson/question 可增加：

```js
v16: {
  status: 'KEEP_MAIN',
  minutes: 4,
  slot: 'learn_a',
  storyAnchor: 'case07-carbonyl',
  threeD: 'NONE'
}
```

`status`允许：

- `KEEP_MAIN`
- `SHORTEN`
- `MOVE_LATER`
- `OPTIONAL_CASE_FILE`
- `REPAIR_ONLY`
- `REMOVE_FROM_20D`

`threeD`允许：

- `REQUIRED`
- `ON_DEMAND`
- `NONE`

问题角色允许：

- `GUIDED`
- `CASE_APPLY`
- `TRANSFER`
- `637_EXIT`
- `REVIEW`
- `DAY19_CORE`
- `FULL_EXAM`

元数据仅描述V16使用方式，不复制正文。

---

## 14. Director Engine

建议命名空间：`NS.Director`。

核心API：

- `getDay(day)`
- `getSequence(day)`
- `getCurrentStep(state, day)`
- `advance(state, day)`
- `resolveReference(step, registry)`
- `estimateMinutes(day)`
- `validateDay(day)`

主流程从旧的 `lessonIndex → taskIndex` 变为 `directorCursor`。

`app.js`保留legacy fallback：

```js
if (V16.enabled) return directorDayPage(day);
return legacyDayPage(day);
```

legacy 暂时不删除，便于回归验证与故障隔离。

---

## 15. 状态与迁移

### 15.1 Schema

现有状态全部保留，新增V16：

```js
v16: {
  enabled: true,
  cursor: 0,
  completedSteps: {},
  story: {
    unlockedScenes: [],
    confirmedFacts: [],
    contradictions: [],
    suspects: {},
    routeRecovery: 0
  }
}
```

目标 schema version：3。

### 15.2 不得清零的旧数据

- skills
- attempts
- reviewHistory
- examResults
- threeDProgress
- detective
- synthesis
- completedDays
- 云端同步状态

### 15.3 老用户迁移

- 已完成Day：仍视为完成，相应剧情摘要自动解锁，不强制重学。
- 正在学习中的Day：根据旧 lesson/question ID，在V16 sequence定位最接近的对应 `ref`；若该内容已变为 optional/review，则定位下一个必修 step。
- mastery、attempt evidence、review计划不因V16重置。

### 15.4 恢复

欢迎页“从上次的位置继续”改为优先使用 `directorCursor`。若退出时位于required 3D、detective、synthesis或考试步骤，返回时恢复同一步。

“暂时退出”仍返回欢迎页，不新增“案件大厅”破坏原导航。

---

## 16. Narrative / Comic Renderer

### 16.1 Scene 数据

```js
{
  id: 'case04-open',
  panels: [
    {
      background: 'lab-synthesis-night',
      characters: [
        { id: 'xuLinchuan', pose: 'neutral', position: 'right' }
      ],
      dialogue: [
        { speaker: 'xuLinchuan', text: '同一个底物，不代表一定走同一条路。' }
      ]
    }
  ]
}
```

### 16.2 角色视觉

每名角色至少提供：

- neutral
- serious
- surprised
- thinking
- tired
- slight-smile

额外：顾遥 nervous；许临川 defensive；林岑 concerned/cold；程野 teasing；周砚 stern。

角色必须通过色彩与轮廓可快速识别。正式公开部署使用原创角色与原创画面，不依赖商业IP角色。

### 16.3 手机

- 桌面可2–3格并排；手机自动纵排；
- 证物可点开放大；
- 对话字体与正文同等级可读；
- 不允许脸部关键区域被裁切；
- 图片WebP、按scene懒加载当前与下一scene。

### 16.4 降级

图片失败时仍显示角色名、对话与简化证物文字；不得阻塞课程。

---

## 17. Case Board

入口位于首页总览内部，不增加第四个三角入口。

四区：

1. 已确认事实
2. 待解释矛盾
3. 人物/证词
4. L-20路线恢复度

允许玩家自行给人物标记：关注 / 暂时排除 / 不确定。

禁止系统显示“嫌疑度80%”等会暗示真凶的数值条。

故事事实进度与 skill mastery 完全分离。

---

## 18. First-use / Scaffold / Repair的新职责

### 18.1 First-use

不再默认渲染成长教学块。第一次出现术语可显示轻量 `ⓘ`：人话解释、为什么重要、小图、边界。只有当天核心概念才升级为正式lesson。

### 18.2 Scaffold

从“预防性全部展示”改为“按需扶手”。自动触发：

- 连续答错；
- 高置信答错；
- mastery低于阈值；
- 用户主动点“我还是不太懂”。

### 18.3 Repair

完整保留。V16 主线敢做减法的基础就是错误发生时仍能回到完整深度。

---

## 19. Day13/14 Detective 与 Day17/18 Synthesis

不新建第二套小游戏系统。

### Day13/14
直接把 X-17 作为现有 detective engine 的真实case，记录DBE、IR、NMR、候选排除和最终结构等能力证据。

### Day17/18
直接把 LAB-20 隐藏路线作为现有 synthesis engine 的case。错误路线允许学生走一段后再暴露矛盾，避免每一步即时红叉。

---

## 20. Day19与Day20

### 20.1 Day19

新增 `Data.V16_DAY19_CORE`：

- 目标55–60分钟；
- 覆盖reaction、mechanism、structure、stereo、spectroscopy、synthesis；
- 无人物、无漫画、无3D、无即时提示、提交锁定；
- 输出百分比/领域表现与Top weak skills。

不得把核心审核伪装成完整150分成绩，除非题量与权重真正完整等价。

现有完整Boss保存为 `FULL_150_EXAM`，入口“考前正式模拟”。

### 20.2 Day20

继续使用现有Top3算法与adaptive pool：

`diagnose → repair → transfer`

按弱项改变呈现工具：

- stereo → 3D
- mechanism → 电子动画
- condition → 决策图
- spectroscopy → 证据板
- synthesis → 路线板

Day20无新核心知识。先完成最终案件报告，再做Top3 Repair与一个小型验证Boss，最后CASE CLOSED。

---

## 21. Pacing Validator

新增 `scripts/validate-v16-pacing.js`。

硬性规则：

- `mandatoryMinutes <= 60`
- Day1–18存在至少一个 `CASE_APPLY`
- Day1–18存在至少一个 `637_EXIT`
- required 3D 必须被Director引用
- 最后10分钟不得 `introducesCoreConcept = true`

节奏规则：

- 连续lesson型instruction总时长原则上 <= 8min；
- 每12–15分钟至少一个 comic / interaction / case_apply / 3d / role_change；
- 普通Day建议45–55min，Day15/19允许至60min。

违反硬规则FAIL，建议区间可WARN。

---

## 22. Story Validator

新增 `scripts/validate-v16-story.js`。

检查：

- scene引用存在；
- character/evidence ID存在；
- 时间戳均引用Single Source of Truth；
- 事实解锁顺序正确；
- 禁止提前剧透。

至少检查：

- Day8前不得确认 `secret_route_confirmed`；
- Day12前不得确认 `zero_sample_found`；
- Day15前不得确认 `stereo_mismatch_confirmed`；
- Day18前不得确认 `xu_record_tampering_confirmed`。

---

## 23. Prerequisite Validator

在现有first-use审计思想上扩展：

```js
requires: ['electron.rich_poor', 'bond.heterolysis']
```

Director加载核心lesson前检查所有必需前置是否已introduced。删除/后移知识后若造成前置断链，构建/验证必须失败。

---

## 24. 实施顺序

为避免先迁移大量普通Day后才发现特殊系统不兼容，按能力类型先打通架构：

1. schema v3 + migration；
2. Director engine与legacy fallback；
3. Comic renderer；
4. Narrative state + Case Board；
5. Day1完整垂直切片（漫画→教学→案件→637→退出恢复）；
6. Day4 SN2 / Day5 E2 required 3D；
7. Day13/14 detective接LAB-20；
8. Day15 `l20_stereo_compare`；
9. Day17/18 synthesis接LAB-20；
10. Day19 core exam；
11. Day20最终案件报告 + Top3；
12. 批量迁移其余普通Day；
13. 20天全流程QA；
14. 真人计时验收。

这不是重新设计；产品方案已冻结。该顺序只是先验证最难的系统形态以降低返工风险。

---

## 25. QA Gate

旧版 Phase1–5 / 现有验证继续必须PASS。

新增：

- `V16_STORY_PASS`
- `V16_PACING_PASS`
- `V16_PREREQUISITE_PASS`
- `V16_3D_REQUIRED_PASS`
- `V16_RESUME_PASS`
- `V16_MOBILE_PASS`
- `V16_DAY19_PASS`
- `V16_DAY20_PASS`
- `V16_CLOUD_STATE_PASS`

### 真人验收必测

- Day1：是否真实接近50分钟；10分钟后仍愿意继续；
- Day5：四路竞争是否仍过载；
- Day7：减法后是否真正清爽；
- Day15：3D是否帮助理解而非炫技；
- Day19：真人完成时间是否接近55–60分钟；
- 手机：漫画、3D fallback、答题、退出恢复全流程；
- 老用户迁移：技能、复习、考试、3D、detective、synthesis状态不丢。

---

## 26. Definition of Done

V16只有同时满足以下条件才算完成：

### 教学
核心知识前置闭环，新术语无无来源使用。

### 考试
Day1–18每日有637出口；Day19无扶手审核；完整150分卷仍存在。

### 时间
普通必修Day不超过60分钟，主要集中45–55分钟。

### 情绪
不存在连续30分钟纯知识输入；每Day具有自然心理换挡。

### 剧情
20天人物动机、证物、时间线和真相无矛盾；重要反转有公平伏笔。

### 3D
立体化学强制3D；其它空间困难可按需使用；2D fallback可继续学习。

### 修复
主线减负后，学生错误仍可触发旧版完整scaffold/repair深度。

### 稳定
登录、云同步、复习、skills、attempt evidence、旧用户进度不丢。

### 产品体验
Day结束时学生仍愿意第二天回来，而不是因为课程完整性被耗尽注意力。

---

## 27. 明确不做的事项

V16本轮不做：

- 重写auth/Worker/D1；
- 重写review engine；
- 重建第二套mastery系统；
- 重建第二套detective/synthesis；
- 为每个知识都创建3D；
- 用无关小游戏换取“娱乐感”；
- 使用商业IP角色做正式公开资源；
- 引入金币、嫌疑度、过度奖励动画；
- 恢复被减掉的低频内容到主线，仅因为“做都做了”。

---

## 28. 最终设计原则

所有后续新增请求在进入20天主线前，都必须回答：

> **它值得占学生今天50分钟里的时间吗？**

只有当它至少满足以下一项才允许进入：

- 阻断核心理解；
- 高频637需要；
- 显著降低认知负担；
- 直接推进当天核心能力。

否则进入附件、repair、复习或完整知识库。

V16的目的不是让学生“少学有机”，而是把完整知识体系重新导演成一条可以坚持20天、真正学懂并能独立做题的路线。

---

## 29. 核心案件化学 Canon（自检补充，实施前冻结）

为避免故事逻辑成立但化学本身走不通，V16 核心案件必须使用一套明确、可校验的分子关系。教学中可以使用简化结构图，但底层数据必须对应这里的化学事实。

### 29.1 三个核心样品

#### `L20-0`：零号标准样品

**(S)-1-(4-bromophenyl)ethanol**  
分子式：`C8H9BrO`  
参考 isomeric SMILES：`C[C@H](O)c1ccc(Br)cc1`

性质设定：高对映体纯度的 S 构型标准样品。普通 IR / 1H NMR / 常规质谱用于确认连接关系；手性HPLC/旋光用于确认空间身份与对映体纯度。

#### `L20-F`：当晚最终样品

**1-(4-bromophenyl)ethanol 的近外消旋样品**  
连接关系与 L20-0 相同，但 S/R 比显著偏离标准样品（V16固定案例数据：S:R = 51:49；用于教学展示，不宣称为真实实验测量值）。

因此：

- 普通 IR / achiral NMR 可以与 L20-0 高度一致；
- 不能以“普通谱图很像”证明两者是同一个合格样品；
- 旋光度接近零或明显低于 L20-0；
- 手性HPLC出现两个主要对映体峰，而 L20-0 主要为单一目标峰；
- Day15 3D比较展示 S/R 镜像无法重合。

这正是案件核心主题“连接关系接近，不等于同一个合格分子”。

#### `X-17`：异常中间样品

**4-bromoacetophenone**  
分子式：`C8H7BrO`  
SMILES：`CC(=O)c1ccc(Br)cc1`

X-17 为非手性酮。IR应出现明显羰基特征，NMR与 L20-0/L20-F 的醇结构存在可解释差异。Day13/14用分子式、DBE、IR、NMR等逐步确认它是“被擦除立体信息后的酮中间体”。

### 29.2 官方末段路线

官方路线使用一个**高对映体纯度的苄位手性溴代前体 `B16`**。为避免课程主线被先进不对称合成拖走，`B16`被视为项目此前已经验证并供应的手性前体；V16不要求学生学习它的制备方法。

核心末段：

1. `B16` 在强 SN2 倾向条件下发生亲核取代，空间构型发生反转；
2. 经简单官能团处理得到目标构型的 `L20-0`；
3. 该路线的空间结果已经由零号样品验证。

V16固定教学路线如下：

- `B16`：高对映体纯度的 `(R)-1-bromo-1-(4-bromophenyl)ethane`；
- Step A：`KOAc / anhydrous DMSO`，以SN2为主要教学模型，生成构型反转的 `1-(4-bromophenyl)ethyl acetate`；
- Step B：`K2CO3 / MeOH` 脱乙酰，反应发生在酰基端，不破坏苄位手性中心，得到目标 `(S)-L20-0`。

该路线用于教育型案件模型，代码与题目不得把它扩写为“任何二级苄位卤代物在任何条件下都只发生SN2”；Day4/5仍要强调竞争路径与条件依赖。

### 29.3 当晚第一事故：R-17A / R-17B

`R-17A` / `R-17B` 是项目内部编码的两套外观非常相似的反应介质/试剂组合，不在故事中伪装成两个神秘新反应。

- `R-17B`：项目内部配制的 `KOAc / anhydrous DMSO` 取代体系，对该已验证底物用于获得以SN2为主的受控空间结果；
- `R-17A`：错误拿取的含水乙醇型乙酸盐反应介质，对该苄位二级底物显著增加离子化/溶剂解与竞争副反应风险，使产物失去原有高对映体纯度。

顾遥发生的是内部试剂组合混淆，而不是“完全不会化学”。事故使原本受控的立体结果丢失。

### 29.4 许临川的隐藏补救尾段

许临川发现当晚反应已经偏离后，没有终止实验。他采用六个月前方法开发阶段被否决的 Route-B“重置再生成”尾段：

1. 从错误反应所得的含氧组分中分离可回收的苄位醇部分；
2. 按六个月前的 Route-B fallback，将其氧化为非手性的 `X-17`（4-bromoacetophenone；V16题目默认使用 `PCC / CH2Cl2` 作为教学型氧化条件）；
3. 对 `X-17` 使用普通 `NaBH4 / MeOH` 非手性还原；
4. 得到连接关系干净、普通 IR/NMR 看起来正确，但对映体组成为 `S:R = 51:49` 的 `L20-F`。

这里的关键逻辑是：

> **氧化到平面酮会擦掉原有手性信息；普通非手性还原不会自动恢复单一目标构型。**

因此许临川能得到“看起来很像成功”的样品，却无法得到与 L20-0 等价的空间身份。

### 29.5 为什么他会认为“足够接近”

案件不把许临川写成不懂化学的人。他知道这条路线有立体风险，因此 21:06 最初仍如实记录“条件偏差 + 补救路线，待复核”。真正越界发生在：

- 快速常规分析确认连接关系大致正确；
- 项目验收、经费节点、顾遥答辩压力同时存在；
- 完整手性结果尚未返回；
- 林岑已经封存样品，意味着问题可能被正式升级。

他以“等完整结果出来再补说明”为理由，在 22:14 删除真实偏差记录。即使他主观上告诉自己只是“暂时整理记录”，该行为已经改变事实链。

### 29.6 Day13–15 的证据分工

为保证科学性，三天不能混用证据功能：

#### Day13 — DBE / IR
目标：确认 X-17 含有羰基特征并显著约束候选结构。

#### Day14 — NMR
目标：锁定 X-17 的平面连接结构为 4-bromoacetophenone，并证明它可以作为隐藏补救尾段的中间体。

#### Day15 — chiral evidence + 3D
目标：不再尝试用普通NMR“区分对映体”。使用手性HPLC/旋光数据证明 L20-F 的对映体组成与 L20-0 不同，再通过3D让学生亲自理解 S/R 镜像为何不能重合。

### 29.7 Day9–12 与核心案件的关系

Day9–12 不强行假设 L20 最后四步必须同时包含全部 enolate / Claisen / Michael / EAS / diazonium / nitrile 内容。Route-B 的案件关键尾段已经在 29.4 冻结为“氧化到 X-17 → 非手性还原到 L20-F”。为避免为了课程覆盖制造不自然的超长合成路线，这四天采用以下叙事原则：

- 学生正在重建六个月前的**备用路线档案与相关中间体记录**；
- 不同章节帮助学生读懂该旧路线中的代表性路线片段、碳数变化、芳环定位或 +1C 工具；
- 这些证据用于证明“打印出来的确实是被否决的 Route-B 家族”，以及执行者需要掌握这份路线；
- 当晚实际执行的关键救援步骤只要求与 29.4 的隐藏补救尾段严格一致；
- 不允许为了让每个Day都成为L20主路线的一步而创造化学上牵强的串联路线。

实现阶段为 Day9–12 选取/绘制的具体旧路线片段仍必须逐个通过化学审计，但它们是**Route-B档案证据**，不是强行组成 L20-0 的唯一线性合成。

### 29.8 化学一致性硬规则

- 对映体不得被描述为普通 achiral IR/NMR就能直接区分；
- 立体差异的最终确认使用 chiral HPLC / optical rotation / 3D reasoning；
- X-17 为非手性酮，普通 NaBH4 类非手性还原默认产生外消旋/近外消旋结果，而不是自动恢复单一S构型；
- SN1/SN2、氧化还原、羰基、手性证据在故事中的作用必须与课程讲解一致；
- 若后续选择具体试剂后发现选择性/兼容性与本Canon冲突，应修改具体试剂，不得修改核心事实来迁就代码。

