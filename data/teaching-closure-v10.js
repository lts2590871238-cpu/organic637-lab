(function(){
'use strict';
const Data=window.Organic637Data=window.Organic637Data||{};Data.days=Data.days||{};
const G=Data.BEGINNER_GLOSSARY=Array.isArray(Data.BEGINNER_GLOSSARY)?Data.BEGINNER_GLOSSARY:[];
const addTerm=row=>{if(!G.some(x=>x.term===row.term))G.push(row)};
[
{term:'溴鎓离子',aliases:['溴鎓离子','bromonium'],plain:'烯烃与 Br₂ 反应时，第一只 Br 并不只挂在一个碳上，而是可以暂时同时连住原双键的两个碳，形成三元桥式正离子。',why:'它解释了为什么 Br₂ 加成和 Br₂/H₂O 会共享同一个前半段，也解释了为什么后续进攻常从桥的反面发生。',limit:'这是一个短寿命中间体，不是最后产物；不要把它画成普通三元环碳骨架。',diagram:'bromonium-form'},
{term:'氧化程度',aliases:['氧化程度','氧化态'],plain:'在基础有机题里可先做“原子账”：同一个碳与 O/N/X 等更电负原子的键变多、与 H 的键变少，通常表示这个碳被氧化；反过来通常是还原。',why:'这样 PCC、Jones、KMnO₄、NaBH₄、LiAlH₄ 不再只是五个孤立试剂名。',limit:'严格氧化数有正式算法；这里先用于判断有机官能团层级。',diagram:'oxidation'}
].forEach(addTerm);

// Remove ambiguous aliases that would make an unrelated everyday word look like a first-use chemistry term.
{const card=G.find(x=>x.term==='活化/钝化');if(card)card.aliases=['活化/钝化','芳环活化','芳环钝化'];}

Data.COURSE_SLOGAN='学懂有机，会做真题';
Data.COURSE_PRINCIPLE='不默认学生会任何第一次出现的词；每一步都能沿“结构→电子→键→稳定性→条件→真题”追问回已经讲过的地基。';

const DAY={
1:{known:'只需要会认 C、H、O、Br 这些原子符号',add:'把“线=共享电子对”建立起来，再认识 σ/π、官能团、断键与成键',action:'先数碳、数键、圈 C=C，再问电子从哪来往哪去',exam:'结构/命名、烯烃加成产物、区域选择'},
2:{known:'Day1 已会：π键更暴露、异裂/均裂、条件会改变电子路径',add:'同一个烯烃遇不同条件会走不同电子故事',action:'先逐字读完整条件，再分“加成/裂解/保留双键”',exam:'条件辨别、产物填写、自由基解释'},
3:{known:'已会：酸碱是 H⁺ 转移，电子丰富处可做亲核体',add:'端炔能被强碱变成带负电的碳，从而真正延长碳骨架',action:'先找 ≡C–H，再做 pKa 与碳数账',exam:'酸性排序、炔烃产物、C–C增碳合成'},
4:{known:'Day3 已看过“带电子的碳从背后接上、Br同时离开”的动作',add:'今天给这类动作正式命名，并和“先形成碳正离子”的路线比较',action:'底物→亲核体→溶剂→是否有自由碳正离子',exam:'SN1/SN2条件判别、重排、立体后果、机理箭头'},
5:{known:'已会 SN1/SN2 与碳正离子稳定性',add:'再加入“夺 β-H 形成 C=C”的两条消除路线',action:'先问强碱还是强亲核，再找 β-H 与空间几何',exam:'四路竞争、主产物、E2机理、Zaitsev/Hofmann'},
6:{known:'已会亲核进攻、离去、酸碱、E2、环张力',add:'用 O 的孤对电子把醇、醚、环氧串成一个网络',action:'看到 O 先问：它现在是亲核体、被质子化、还是离去基前体',exam:'氧化/脱水/Williamson/环氧开环/Lucas'},
7:{known:'已会“电子多处进攻电子缺处”与 π 电子移动',add:'把 C=O 变成一套可重复使用的亲核加成母动作',action:'先标 Cδ+ / Oδ−，再问 Nu 从哪来、π电子去哪',exam:'羰基加成、还原、Grignard、Wittig、机理与合成'},
8:{known:'Day7 会对羰基碳做亲核进攻',add:'如果羰基旁边还有可离去的 Y，就从“加成”升级成“加成—消除”',action:'先找酰基碳，再看 Y 离开后稳不稳',exam:'羧酸衍生物活性排序、酯化/水解、四面体中间体、合成'},
9:{known:'会酸碱、共振、羰基亲核加成',add:'让羰基旁 α-C 先变成亲核体，再去形成 C–C 键',action:'找 α-H→画 enolate→找受体羰基碳→标新键',exam:'Aldol产物、机理、交叉缩合与合成'},
10:{known:'Day9 已会 enolate 这位“进攻者”',add:'今天只换它的“对手”：酯羰基、共轭 β-C、β-二羰基体系',action:'每题先写“亲核碳是谁？受体是谁？碳数怎样变？”',exam:'Claisen/Michael/丙二酸/乙酰乙酸/脱羧'},
11:{known:'已会 π 电子、共振、稳定性与亲电体',add:'把电子离域扩展成芳香大圈，并理解为什么苯偏爱取代',action:'先判芳香性，再找真正 E⁺，最后恢复芳香性',exam:'芳香性、定位、EAS产物、芳香合成顺序'},
12:{known:'会芳香定位、胺孤对电子、离去基',add:'把 ArNH₂→ArN₂⁺ 变成芳环上的通用中转站',action:'先判断 N 孤对是否可用，再看 N₂ 离去后换成什么',exam:'胺碱性、重氮化、Sandmeyer、偶联、腈增碳'},
13:{known:'会分子式、官能团、氧化还原与化学检验',add:'第一次把结构题当“约束排除”而不是猜谜',action:'分子式→DBE→硬证据→IR→候选淘汰',exam:'结构推导大题，近年高分核心'},
14:{known:'Day13 已会用候选结构和硬证据排除',add:'NMR 再提供“地址、人数、邻居、对称”四类证据',action:'每组峰先翻译成结构碎片，再和分子式/IR交叉',exam:'多证据结构推导'},
15:{known:'Day4 已见楔线翻面，Day2/3 已见同侧/异侧',add:'给空间关系正式编号：CIP、R/S、E/Z、Fischer、构象',action:'先画空间、排优先级，再判名称',exam:'立体命名、构型关系、SN2/E2空间结果'},
16:{known:'前15天已有大量“谁更稳/更快/更酸”的局部规律',add:'把它们压成固定判据，并把机理压成少数电子动作',action:'排序先选主导裁判；机理箭尾永远从电子源出发',exam:'排序、机理、跨章节混合'},
17:{known:'已经会单步反应网络与几种可靠 C–C 成键工具',add:'第一次系统倒着看目标：最后一步、碳数、关键断键',action:'起终点找不同→碳数账→最后一步→正向复核',exam:'1–3步合成路线'},
18:{known:'Day17 能提出一条路线',add:'今天让路线真正可用：顺序、兼容、保护、替代路线',action:'每一步做“会不会顺手伤到别处”的兼容审计',exam:'多步合成、路线评价、结构+合成混合'},
19:{known:'前18天所有扶手与互动',add:'把章节标签和即时答案全部拿掉',action:'自己识别题型→调用模型→锁定答案→整卷复盘',exam:'150分混合未见Boss'},
20:{known:'Day19 已暴露真实漏洞',add:'只修 Top3，并用新结构证明不是背答案',action:'诊断→修复→迁移→再检验',exam:'最终迁移与目标线判断'}
};
Data.DAY_GROUNDING=DAY;

const DIAGRAM_RULES=[
[/原子|符号/,'symbols'],[/线不是|共价键|共享电子/,'bond-pair'],[/四键|价键|补 H/,'valence'],[/数碳|骨架|主链/,'carbon-skeleton'],[/σ 键|sigma/,'sigma'],[/π 键|p 轨道/,'pi'],[/官能团/,'functional-handle'],[/电子多|电子缺|亲核体|亲电体/,'electron-rich'],[/断键|异裂/,'bond-breaking'],[/均裂|自由基/,'homolysis'],[/命名|编号/,'bond-map'],[/HBr|Markovnikov/,'pi-to-h'],[/碳正离子.*稳定|三级.*二级/,'carbocation-stability'],[/Br₂.*H₂O|卤代醇/,'bromonium-open-water'],[/Br₂|溴鎓/,'bromonium-form'],[/臭氧|O₃/,'ozone-scissors'],[/氢硼化|BH₃/,'hydroboration-approach'],[/加氢|H₂.*Pd|Lindlar/,'hydrogen-surface'],[/NBS|烯丙/,'allylic'],[/KMnO₄|氧化程度|氧化/,'oxidation'],[/pKa|酸性/,'pka'],[/环张力|小环/,'ring-strain'],[/炔负离子|acetylide/,'acetylide'],[/共轭二烯|共轭/,'conjugation'],[/Diels|亲双烯/,'diels-alder'],[/SN2|背面进攻/,'sn2-electron-flow'],[/SN1|电离|溶剂解/,'sn1-ionize'],[/速率式/,'rate-law'],[/溶剂/,'solvation'],[/碱性.*亲核|亲核性.*碱/,'nucleophilicity'],[/NaOEt|t-BuOK|大碱/,'bulky-base'],[/β-H|alpha|β /,'alpha-beta'],[/E2|anti-periplanar/,'e2-electron-flow'],[/E1/,'e1'],[/四路|竞争/,'condition-crossroads'],[/氧.*孤对|醇|醚/,'oxygen-lonepairs'],[/环氧/,'epoxide-strain'],[/Williamson/,'sn2'],[/Lucas/,'sn1'],[/羰基|C=O|醛|酮/,'carbonyl-polar'],[/亲核加成/,'carbonyl-electron-flow'],[/NaBH₄|LiAlH₄|还原/,'hydride'],[/Grignard/,'grignard'],[/缩醛|保护罩/,'acetal'],[/Wittig/,'carbonyl-to-methylene'],[/Beckmann/,'beckmann'],[/酰基|羧酸衍生物/,'acyl-family'],[/活性顺序/,'acyl-ranking'],[/四面体|酰基取代/,'acyl-collapse-flow'],[/酯化|水解|皂化/,'saponification'],[/Hofmann/,'hofmann'],[/α-H|enolate|烯醇负/,'enolate-electron-flow'],[/Aldol/,'aldol-newbond'],[/Claisen/,'claisen'],[/Michael/,'michael'],[/β-二羰基|丙二酸|乙酰乙酸/,'beta-dicarbonyl'],[/脱羧/,'decarboxylation'],[/芳香性|苯环.*共享|Hückel/,'benzene-delocalized'],[/邻.*间.*对|定位/,'ortho-meta-para'],[/EAS|芳香取代|σ-络合/,'eas-electron-flow'],[/Friedel|Lewis酸/,'friedel'],[/胺.*孤对|碱性/,'amine-lonepair'],[/重氮|N₂/,'diazonium-exit-flow'],[/Sandmeyer/,'sandmeyer'],[/偶联/,'azo'],[/腈/,'nitrile'],[/DBE|不饱和度/,'dbe'],[/IR|红外/,'ir-functional'],[/化学检验/,'silver-test'],[/候选结构/,'constraint'],[/NMR|核磁|住宅登记/,'nmr'],[/singlet|triplet|quartet|n\+1|裂分/,'nmr-neighbor-map'],[/积分/,'integration'],[/对称/,'symmetry'],[/手性|镜像/,'chirality'],[/CIP|优先级/,'cip-priority'],[/R\/S/,'rs'],[/Fischer/,'fischer'],[/E\/Z/,'ez'],[/Newman|构象/,'newman'],[/椅式|轴向|赤道/,'chair-ax-eq'],[/八位裁判|排序/,'ranking'],[/曲箭|电子动作/,'curved-arrow'],[/杂环|吡啶|吡咯/,'pyridine-pyrrole'],[/葡萄糖|单糖/,'sugar'],[/氨基酸|两性离子|肽键/,'zwitterion'],[/逆合成|找不同|最后一步/,'retrosynthesis'],[/碳数账/,'retro-compare'],[/断键|disconnection/,'retro-cut-connect'],[/兼容|顺序/,'compatibility'],[/保护基/,'protection']
];
function pickDiagram(row,day){const text=[row.title,row.body,row.note,...(row.formulas||[])].join(' ');for(const [re,id] of DIAGRAM_RULES)if(re.test(text))return id;return day<=3?'bond-map':day<=6?'condition-map':day<=10?'new-bond':day<=12?'resonance':day<=14?'dbe':day<=16?'carbocation-stability':'retrosynthesis';}

const SPECIFIC={
'd05-lesson-elimination':[
 {title:'先把“换人”和“消除”画在同一个底物上',text:'同一个 R–CH₂–CHX–R′，亲核体找带 X 的 α-C 会得到取代；碱找隔壁 β-H 会得到双键。',formula:'Nu:→Cα  vs  Base:→Hβ',diagram:'substitution-path'},
 {title:'消除不是把两样东西随便删掉',text:'碱拿 β-H 时，原 C–H 键电子必须留下来做 Cα=Cβ 的 π 键。',formula:'Cβ–H → Cα=Cβ',diagram:'e2-electron-flow'},
 {title:'同时还要让 X 离开',text:'中心碳不能一边长双键一边继续保留所有旧键，所以 Cα–X 键电子给 X。',formula:'Cα–X → X⁻',diagram:'e2-electron-flow'},
 {title:'现在才给这个结果贴名字',text:'丢 H 和 X、生成 C=C 的反应叫消除。',formula:'R–CH₂–CHX–R′ → R–CH=CHR′',diagram:'elimination-path'}],
'd05-lesson-anti':[
 {title:'先把四个原子排成一条能“推电子”的线',text:'Hβ–Cβ–Cα–X 四个原子最好接近共平面反式。',formula:'H–C–C–X ≈ 180°',diagram:'anti-periplanar'},
 {title:'为什么不是任意角度都一样',text:'C–H σ 键电子要流进将形成的 C=C π 轨道，同时 C–X 的 σ* 要接走电子；轨道平行时重叠最好。',formula:'σ(C–H) → π(C=C) → σ*(C–X)',diagram:'e2-electron-flow'},
 {title:'所以先看几何，再谈产物',text:'如果某个 β-H 根本不能排到 anti-periplanar，那条 E2 路径会变难。',formula:'geometry first',diagram:'anti-periplanar'}],
'd06-lesson-oh':[
 {title:'先问：OH 为什么不愿直接走',text:'若直接把 C–O 键电子给 O，离去的是 OH⁻；OH⁻ 是强碱，通常不是舒服的离去基。',formula:'R–OH → R⁺ + OH⁻  （通常不利）',diagram:'leaving-group'},
 {title:'先给 O 一个 H⁺',text:'O 的孤对电子接 H⁺，把 –OH 变成 –OH₂⁺。',formula:'R–OH + H⁺ → R–OH₂⁺',diagram:'protonation'},
 {title:'现在离开的就不是 OH⁻，而是水',text:'H₂O 是更稳定的中性分子，所以离去能力明显改善。',formula:'R–OH₂⁺ → R⁺/取代过程 + H₂O',diagram:'leaving-group'}],
'd06-lesson-epoxide':[
 {title:'先看三元环为什么“绷”',text:'sp³ 碳舒服角度约109.5°，三元环被迫接近60°，像硬弯的弹簧。',formula:'109.5° → ~60°',diagram:'epoxide-strain'},
 {title:'亲核体不是“爱环氧”，而是看到能释放张力的亲电碳',text:'O 拉电子让环上 C 带部分正电；Nu 有电子对可提供。',formula:'Nu: → Cδ+',diagram:'epoxide-attack'},
 {title:'新键形成时旧 C–O 键电子去 O',text:'这样碳仍保持常见四键，同时三元环打开，张力释放。',formula:'C–O → O',diagram:'epoxide-open'}],
'd07-lesson-addition':[
 {title:'第一眼只做极化',text:'O 更电负，把 C=O 的电子云拉向自己，所以 Cδ+、Oδ−。',formula:'Cδ+=Oδ−',diagram:'carbonyl-polar'},
 {title:'找电子来源',text:'Nu⁻ 或带孤对电子的中性 Nu 手里有可用电子对。',formula:':Nu → Cδ+',diagram:'nucleophile'},
 {title:'新键一长，π电子必须让位',text:'如果 C=O 还保留完整双键同时又接 Nu，C 会超过常见四键；所以 π 电子移到 O。',formula:'π(C=O) → O',diagram:'carbonyl-electron-flow'},
 {title:'最后通过质子转移收尾',text:'O⁻ 常在后处理里接 H⁺，得到醇等中性产物。',formula:'O⁻ + H⁺ → OH',diagram:'protonation'}],
'd08-lesson-substitution':[
 {title:'第一步和 Day7 一样：Nu 打酰基碳',text:'羰基 Cδ+ 接受 Nu 的电子对，π电子上 O。',formula:'Nu:→C=O；π→O',diagram:'carbonyl-electron-flow'},
 {title:'得到四面体中间体',text:'这个碳暂时连着 Nu、O⁻、原来的 Y 和碳骨架。',formula:'tetrahedral intermediate',diagram:'acyl-sub'},
 {title:'为什么不会永远停在四面体',text:'O⁻ 有很强动力重新做回稳定的 C=O。',formula:'O:⁻ → C',diagram:'acyl-collapse-flow'},
 {title:'为了保持碳四键，Y 同时离开',text:'C–Y 键电子给 Y，完成“加成—消除”。',formula:'C–Y → Y⁻',diagram:'acyl-collapse-flow'}],
'd09-lesson-enolate':[
 {title:'碱先拿 α-H',text:'Base 的电子对去 H；H 被转移时原 C–H 键电子必须留下。',formula:'Base:→Hα',diagram:'enolate-electron-flow'},
 {title:'留下的电子不是只能待在 α-C',text:'它们可以形成 Cα=C 的 π 键。',formula:'Cα–H electrons → Cα=C',diagram:'enolate-electron-flow'},
 {title:'原 C=O π电子再移到 O',text:'于是负电可以分散到更电负的 O 上。',formula:'π(C=O)→O⁻',diagram:'enolate-resonance'},
 {title:'两张共振式是同一个真实电子云',text:'不是两个瓶子里来回变的不同分子。',formula:'C⁻–C=O ↔ C=C–O⁻',diagram:'enolate-resonance'}],
'd10-lesson-michael':[
 {title:'先把共轭受体编号',text:'羰基旁是 α-C，再外一格是 β-C。',formula:'O=C–Cα=Cβ',diagram:'alpha-beta'},
 {title:'为什么这次不直接打羰基 C',text:'共轭体系让 β-C 也表现亲电性，Nu 从 β 位加入可把电子一路推到 O。',formula:'Nu:→Cβ',diagram:'michael'},
 {title:'电子像接力一样移动',text:'Cα=Cβ π电子向羰基方向移动，C=O π电子上 O。',formula:'β attack → enolate',diagram:'michael-target'},
 {title:'最后质子化得到 1,4-加成产物',text:'把暂时的 enolate 收成中性结构。',formula:'enolate + H⁺ → product',diagram:'protonation'}],
'd11-lesson-why-substitution':[
 {title:'苯先用 π 电子接 E⁺',text:'这一步会暂时打破完整芳香大圈，形成 σ-络合物。',formula:'Ar–H + E⁺ → σ-complex',diagram:'eas-electron-flow'},
 {title:'为什么不就停在“加成”状态',text:'若永久保留 H 和 E 两个新键，会失去芳香离域稳定。',formula:'addition would lose aromaticity',diagram:'sigma-complex'},
 {title:'所以再拿掉原来的 H⁺',text:'C–H 键电子重新补回 π 系统，芳香性恢复。',formula:'C–H → aromatic π',diagram:'eas-restore'},
 {title:'最终看起来就是 H 被 E 换掉',text:'因此叫亲电芳香取代，不是普通烯烃加成。',formula:'Ar–H → Ar–E',diagram:'eas-electron-flow'}],
'd12-lesson-diazo':[
 {title:'先把 NH₂ 变成 N₂⁺ 接头',text:'低温重氮化让 Ar–NH₂ 变成 Ar–N₂⁺。',formula:'ArNH₂ → ArN₂⁺',diagram:'diazotization'},
 {title:'为什么 N₂ 是好离去基',text:'离开后形成极稳定、气态的 N₂ 分子，热力学上很有利。',formula:'Ar–N₂⁺ → Ar–? + N₂↑',diagram:'diazonium-exit-flow'},
 {title:'不同条件把问号换成不同基团',text:'CuCl/CuBr/CuCN 或水解等把芳环带到不同终点。',formula:'? = Cl / Br / CN / OH',diagram:'sandmeyer'}],
'd13-lesson-dbe':[
 {title:'先拿完全饱和烷烃当基准',text:'开链饱和烃 CₙH₂ₙ₊₂ 是“氢最多”的参考线。',formula:'CₙH₂ₙ₊₂',diagram:'saturated'},
 {title:'每少一对 H，就多一份不饱和',text:'一根 C=C 或一个环都让分子比基准少 H₂。',formula:'−H₂ → +1 DBE',diagram:'minus-h2'},
 {title:'三键为什么算2',text:'C≡C 相当于比单键多两根 π 键，因此少两对 H。',formula:'C≡C → 2 DBE',diagram:'dbe-options'},
 {title:'公式只是把这笔账自动化',text:'先理解账本，再用公式算得更快。',formula:'DBE=(2C+2+N−H−X)/2',diagram:'dbe'}],
'd14-lesson-splitting':[
 {title:'先选一组正在被观察的 H',text:'不要同时数整分子；只看它隔壁碳上有几个等效 H。',formula:'observed H | neighboring H',diagram:'nmr-neighbor-map'},
 {title:'简单情况下 n 个邻氢把它分成 n+1 条',text:'邻 2H 常 triplet，邻 3H 常 quartet。',formula:'n neighbors → n+1 lines',diagram:'nmr-neighbor-map'},
 {title:'为什么不是“峰高”在数H',text:'裂分描述线数；积分才描述这组信号对应多少 H。',formula:'splitting ≠ integration',diagram:'integration'},
 {title:'什么时候别机械套 n+1',text:'多组不等效邻氢、二阶效应等复杂情况会偏离简单模型。',formula:'n+1 = first-order approximation',diagram:'splitting'}],
'd15-lesson-rs':[
 {title:'先按 CIP 排 1>2>3>4',text:'比较直接相连原子，第一处差异决定高低。',formula:'1 > 2 > 3 > 4',diagram:'cip-priority'},
 {title:'把 4 放到背后',text:'只有最低优先级背向你时，顺逆判断才直接。',formula:'4 away',diagram:'cip-back'},
 {title:'看 1→2→3 转向',text:'顺时针 R，逆时针 S。',formula:'clockwise R / counterclockwise S',diagram:'rs'},
 {title:'若 4 朝你，结果要反转',text:'这就是为什么不能只在纸面上盲看箭头方向。',formula:'4 toward → invert result',diagram:'rs-turn'}],
'd16-lesson-arrow-blocks':[
 {title:'动作1：酸碱',text:'孤对电子去 H，原 H–A 键电子回到 A。',formula:':B→H；H–A→A',diagram:'acid-base'},
 {title:'动作2：亲核进攻',text:'电子对从 Nu 去电子缺的中心。',formula:':Nu→E',diagram:'bond-forming'},
 {title:'动作3：离去',text:'原成键电子跟离去基走。',formula:'C–X→X',diagram:'bond-breaking'},
 {title:'动作4：π键重排/形成',text:'电子不是凭空画箭头，而是在已有键和新键之间转移。',formula:'π↔σ / resonance',diagram:'curved-arrow'}],
'd17-lesson-disconnection':[
 {title:'先在目标上找“最像后来新接”的 C–C 键',text:'不是所有键都值得剪，优先剪你有可靠正向反应能接回来的键。',formula:'target C–C',diagram:'retro-cut-connect'},
 {title:'剪开后给两端安排角色',text:'一端最好能变成亲核碳，另一端最好能提供亲电碳。',formula:'C:⁻  +  C–X',diagram:'disconnection'},
 {title:'马上正向检查',text:'如果你根本找不到能把两端接回来的反应，这个断键就只是想象，不是路线。',formula:'precursors → target ?',diagram:'retro-forward'}],
'd18-lesson-order':[
 {title:'先列出所有步骤需要的“反应天气”',text:'强酸、强碱、强氧化、强还原、亲核体等会不会互相冲突。',formula:'step conditions ledger',diagram:'compatibility'},
 {title:'再标出每一步除了目标位点还可能碰谁',text:'试剂不会只看你心里想反应的那个官能团。',formula:'target site vs sensitive sites',diagram:'chemoselectivity'},
 {title:'若冲突，改顺序或先保护',text:'保护不是炫技，而是暂时把会抢反应的位点藏起来。',formula:'protect → main reaction → deprotect',diagram:'protection'},
 {title:'最后整条路线从头正向走一遍',text:'每个中间体都必须真实存在、下一步条件也要兼容。',formula:'forward audit',diagram:'retro-forward'}]
};

function clone(v){return JSON.parse(JSON.stringify(v));}
function firstSentence(text){const s=String(text||'').split(/[。！？]/).map(x=>x.trim()).filter(Boolean);return s[0]||'先把当前结构看清楚';}
function ensureSequence(row,day){
 if(Array.isArray(row.sequence)&&row.sequence.length>=3)return;
 if(SPECIFIC[row.id]){row.sequence=clone(SPECIFIC[row.id]);return;}
 const diag=row.heroDiagram||pickDiagram(row,day);const g=DAY[day]||{};const why=(row.whyChain||[])[0]||'';
 row.sequence=[
  {title:'先认眼前的结构/条件',text:firstSentence(row.body),formula:(row.formulas||[])[0]||'',diagram:diag},
  {title:'再问“真正变化的是什么”',text:why||'不要先背名字，先找电子来源、电子缺口和会改变的键。',formula:(row.formulas||[])[1]||'',diagram:diag},
  {title:'最后收成一条能做题的动作',text:g.action||'把结构、电子和条件合在一起再判断。',formula:(row.formulas||[])[2]||'',diagram:diag}
 ];
}
function ensureMicro(row,day){if(row.microCheck)return;const g=DAY[day]||{};row.microCheck={prompt:'这一页真正应该先做哪件事？',options:[g.action||'先把结构和条件翻译成人话，再判断','先背下反应名字，不管电子怎么走','只记最终产物长什么样，不看条件'],answer:0,feedback:'对。课程要训练的是可迁移的判断动作，不是把这一页背下来。'};}

function makeGround(row,day,index){const g=DAY[day]||{};row.grounding=row.grounding||{known:g.known,newThing:index===0?g.add:`继续在今天这条主线上只增加一个小块：${firstSentence(row.title)}`,action:g.action,exam:g.exam};row.heroDiagram=row.heroDiagram||pickDiagram(row,day);row.returnAnchor=row.returnAnchor||`Day ${day} 前面已经建立的规则`;}

const sourceByDay={1:'C=C/电子与键',2:'Day1电子与键',3:'Day1–2酸碱/电子',4:'Day3背面成键动作',5:'Day4 SN1/SN2',6:'Day4–5取代/消除',7:'Day1极化与亲核/亲电',8:'Day7羰基亲核加成',9:'Day3酸碱 + Day7羰基',10:'Day9 enolate',11:'Day1 π电子 + 共振稳定',12:'Day11芳香 + 胺孤对',13:'前12天官能团与反应证据',14:'Day13结构约束',15:'Day4空间翻面 + Day2/3同侧异侧',16:'Day1–15全部局部规则',17:'前16天单步反应网',18:'Day17逆合成',19:'Day1–18整套模型',20:'Day19真实错误'};

function typeTranslation(q){
 const type=q.type||'choice';
 if(type==='ranking')return ['先确定“从大到小还是从小到大”','每两个候选只比较一个主导因素','最后再检查有没有特殊例外'];
 if(type==='electron-arrow')return ['先找真正的电子源：孤对/负电/π键','再找电子缺口或将要形成的键','每画一支箭都问：旧键电子去了哪里'];
 if(type==='route'||type==='synthesis'||type==='synthesis-case')return ['先把起点和终点做“找不同”','记碳数变化，再猜最后一步','每一步都做官能团兼容检查'];
 if(type==='detective'||type==='detective-case')return ['先算/核对分子式与DBE','把每条证据逐条放进候选表','任何候选只要违背一条硬证据就淘汰'];
 if(type==='structure-choice')return ['先忽略答案字母，只看连接关系/空间','找题目要求的官能团或构型','最后才在选项中匹配'];
 return ['先圈底物真正会反应的官能团','把试剂/溶剂/温度逐字翻译成人话','只调用前面已经学过的结构—电子—稳定性规则'];
}

for(let day=1;day<=20;day++){
 const d=Data.days[day];if(!d)continue;
 d.grounding=DAY[day];
 (d.lessons||[]).forEach((row,i)=>{makeGround(row,day,i);if(!Array.isArray(row.whyChain))row.whyChain=[];while(row.whyChain.length<3){const extra=[`为什么这一页不能只背名字？因为真题会换结构和条件，只有“${DAY[day]?.action||'结构—电子—稳定性'}”这条动作能迁移。`,`为什么现在学它而不是以后再补？因为它是今天后续题目的前提，少这一层后面的术语会突然悬空。`,`怎么知道真的懂了？把反应名遮住，仍能说出电子从哪来、哪根键变、为什么这样变。`][row.whyChain.length]||'继续把原因接回结构、电子和稳定性。';row.whyChain.push(extra);}row.analogy=row.analogy||{title:'先搭一座生活里的桥',body:'先用熟悉的动作抓住趋势，再回到电子和结构判断。',boundary:'类比只是入口，不能代替真正的化学原因。'};ensureSequence(row,day);ensureMicro(row,day);if(!Array.isArray(row.lookQuestions)||!row.lookQuestions.length)row.lookQuestions=['这张图里真正发生变化的是哪根键/哪个官能团？','如果把反应名字遮住，你能不能只靠电子和结构说出下一步？'];});
 const all=[...(d.questions||[]),...Object.values(d.repairs||{}).flat(),...(d.adaptivePool||[]),...Object.values(d.adaptivePools||{}).flat()];
 for(const q of all){
   q.translation=q.translation||{source:`这题不是新知识，它主要调用：${sourceByDay[day]||'前面主线'}`,steps:typeTranslation(q),trap:q.errorType?`如果错，优先检查系统记录的错误类型：${q.errorType}`:'最常见陷阱是只认反应名，却没有把完整条件和结构一起读。'};
   q.knownFrom=q.knownFrom||sourceByDay[day];
   if(!q.preflight)q.preflight={skill:(Data.SKILLS||[]).find(s=>s.id===q.primarySkill)?.label||q.primarySkill||'当前技能',steps:typeTranslation(q),why:'真题换底物、换条件、换问法以后，仍然先做这一套翻译。'};
 }
}

// Correct two especially easy-to-memorize lessons so the mechanism is visible before the name.
const byId=(d,id)=>Data.days?.[d]?.lessons?.find(x=>x.id===id);
let x=byId(2,'d02-zero-05-hydrogenation');if(x){x.whyChain=['为什么 H₂/Pd 不等于“把 H₂ 写在箭头上就自动加成”？H–H 和烯烃都需要在金属表面被吸附/活化，才能走更低能垒的路径。','为什么两个 H 最后能接到原双键两端？π 键电子重新组织为两个 C–H σ 键，而原 C=C 的 π 成分被消耗。','为什么催化剂最后不写进产物？它在表面提供路径并在循环后再生，不是被当作产物骨架的一部分。'];}
x=byId(1,'d01-lesson-bromine');if(x){x.sequence=[
 {title:'π电子先让 Br₂ 不再对称',text:'C=C 的电子云靠近 Br₂ 时会排斥/极化 Br–Br 电子，使靠近烯烃的 Br 更显电子缺。',formula:'C=C···Brδ+–Brδ−',diagram:'bromonium-form'},
 {title:'π电子去第一只 Br，同时 Br–Br 断',text:'一对π电子形成 C–Br 相互作用；Br–Br 原键电子全部给远端 Br，形成 Br⁻。',formula:'π→Br；Br–Br→Br⁻',diagram:'bromonium-form'},
 {title:'第一只 Br 暂时跨住两个碳',text:'它形成三元桥式溴鎓离子，两个原双键碳都被桥住。',formula:'bromonium ion',diagram:'bromonium-form'},
 {title:'Br⁻ 从另一面开桥',text:'Br⁻ 的电子对去其中一个碳，同时该 C–Br(桥) 键电子回到桥式 Br。',formula:'Br⁻→C；bridge C–Br→Br',diagram:'bromonium-open-br'},
 {title:'最终得到邻二溴化物',text:'原来 C=C 的两个碳各多了一个 Br。',formula:'C=C + Br₂ → Br–C–C–Br',diagram:'addition'}];x.whyChain=['为什么 Br₂ 自己不是明显的“Br⁺+Br⁻”？靠近 π 电子后才被极化。','为什么会出现桥式中间体？第一只 Br 能用孤对与两个碳形成三中心相互作用，比形成完全自由碳正离子更合理。','为什么第二只 Br 从反面进攻？桥式 Br 占据一面，反面进入空间/轨道更有利。'];}
x=byId(1,'d01-lesson-halohydrin');if(x){x.sequence=[
 {title:'前半段和 Br₂ 加成完全一样',text:'先形成桥式溴鎓离子，同时产生 Br⁻。',formula:'C=C + Br₂ → bromonium + Br⁻',diagram:'bromonium-form'},
 {title:'差别从“谁来开桥”开始',text:'水很多时，H₂O 的 O 上孤对电子也可以进攻桥式碳。',formula:'H₂O:→C',diagram:'bromonium-open-water'},
 {title:'水接上后暂时带正电',text:'O 若同时连三个键，会写成含 O⁺ 的中间体。',formula:'C–OH₂⁺',diagram:'protonation'},
 {title:'再失去一个 H⁺',text:'附近水/Br⁻ 接走 H⁺，得到中性的 –OH。',formula:'C–OH₂⁺ → C–OH + H⁺',diagram:'protonation'},
 {title:'所以产物是 Br/OH，而不是 Br/Br',text:'真正决定第二个基团的是反应环境里谁在开桥。',formula:'Br₂/H₂O → halohydrin',diagram:'bromonium-open-water'}];}

// Rebuild first-use term cards after v7 additions and preserve the strict first-use rule.
const lessonText=r=>[r.title,r.body,r.note,...(r.formulas||[]),...(r.sequence||[]).flatMap(s=>[s.title,s.text,s.formula]),...(r.whyChain||[]),r.microCheck?.prompt,...(r.microCheck?.options||[])].filter(Boolean).join(' ');
const seen=new Set();
for(let day=1;day<=20;day++)for(const row of Data.days?.[day]?.lessons||[]){row.termCards=[];const text=lessonText(row);for(const card of G){if(seen.has(card.term))continue;const hit=typeof Data.glossaryMatches==='function'?Data.glossaryMatches(text,card):(card.aliases||[card.term]).some(a=>a&&text.includes(a));if(hit){row.termCards.push(card);seen.add(card.term);}}}
Data.BEGINNER_GLOSSARY_COVERED=[...seen];
Data.TEACHING_CLOSURE_VERSION='v7-mainline';
})();

(function(){
'use strict';
const Data=window.Organic637Data; const G=Data.BEGINNER_GLOSSARY||[];
const lesson=(d,id)=>Data.days?.[d]?.lessons?.find(x=>x.id===id);
const replaceEverywhere=(row,replacements)=>{
  if(!row)return;
  const repl=s=>{let x=String(s??'');for(const [a,b] of replacements)x=x.replace(a,b);return x;};
  for(const key of ['title','body','note','wonder'])if(row[key])row[key]=repl(row[key]);
  row.formulas=(row.formulas||[]).map(repl);
  row.whyChain=(row.whyChain||[]).map(repl);
  row.lookQuestions=(row.lookQuestions||[]).map(repl);
  if(row.analogy){for(const key of ['title','body','boundary'])if(row.analogy[key])row.analogy[key]=repl(row.analogy[key]);}
  for(const s of row.sequence||[]){for(const key of ['title','text','formula'])if(s[key])s[key]=repl(s[key]);}
  if(row.microCheck){row.microCheck.prompt=repl(row.microCheck.prompt);row.microCheck.options=(row.microCheck.options||[]).map(repl);row.microCheck.feedback=repl(row.microCheck.feedback);}
};

// Avoid aliases that falsely treat visual fragments as formal terms before the course names them.
{const c=G.find(x=>x.term==='羰基');if(c)c.aliases=['羰基','carbonyl'];}
{const c=G.find(x=>x.term==='腈');if(c)c.aliases=['腈','nitrile','–C≡N','R–C≡N'];}

// Day 1: do not leak later vocabulary just because the chemistry can be described with it.
let x=lesson(1,'d01-pre-02-valence');if(x){
 x.whyChain=[
  '为什么中性碳最常见画四根键？碳最外层有 4 个价电子；通过和周围原子共享电子，四条常见共价连接能让它处在很常见的稳定成键状态。今天先把这当作“结构检查规则”。',
  '为什么双线要算两份连接？因为“=”代表两对被共享的成键电子，不是一根加粗的线。下一页才把这两份连接分别拆成 σ 和 π。',
  '为什么做题前要会数这些键？因为只要某个中性碳被你画成明显超过或不足常见四键，就要立刻停下来检查结构，不必等到最后才发现整题画错。'
 ];
}
x=lesson(1,'d01-pre-06-pi');if(x){
 x.body='当两个碳已经有一根沿核—核方向的 σ 连接后，每个碳还各有一个形状像上下两瓣的 p 轨道。两个 p 轨道保持近似平行，就能从侧面重叠；这套侧向重叠形成第二份共享电子，叫 π 键。π 电子云主要在 C—C 连线的上、下方，比 σ 键更暴露。';
 x.note='这一页只回答“π 从哪里来、长在哪里”。下一页才开始给“电子多/电子缺”这些反应角色命名。';
 x.whyChain=[
  '为什么双键里要分 σ 和 π？因为两份共享电子来自两种完全不同的轨道重叠方向：一份正面对接，一份侧向对接。',
  '为什么 π 电子云画在键轴上下而不是两核正中间？因为形成 π 的 p 轨道是侧向重叠，最大电子密度自然出现在核间轴的上、下两侧。',
  '为什么后面很多烯烃反应先动 π 而不是 σ？侧向重叠相对没有正面对接牢，而且电子云更暴露；当它找到合适的新成键位置时，重新分配这对电子通常比先拆掉 C—C 主连接更容易。'
 ];
}
x=lesson(1,'d01-zero-02-groups');if(x){
 x.body='一个大分子里，并不是每根 C–C、C–H 都同样值得第一眼关注。某些特殊连接会决定一大批典型反应，例如今天的 C=C、以后会见到的 –OH 和 C–Br。我们把这种“反应表现很有特点、做题时值得先圈出来”的位置叫官能团。';
 x.formulas=['C=C：今天的反应把手','–OH：以后会系统学习的一类含氧把手','C–Br：以后会系统学习的一类含卤把手'];
 x.note='今天只要求真正认熟 C=C。–OH、C–Br 只是让你知道“官能团不是只有一种”，具体反应以后再开箱。';
 x.sequence=[
  {title:'先把整条碳链当背景',text:'不要一眼同时分析所有 C–H。',formula:'CH₃–CH₂–CH=CH₂',diagram:'carbon-skeleton'},
  {title:'找“不像普通单键”的位置',text:'这里最醒目的是 C=C。',formula:'CH₃–CH₂–[CH=CH₂]',diagram:'functional-handle'},
  {title:'把它当成今天的反应把手',text:'接下来所有题先圈它，再问这对 π 电子会怎样重新分配。',formula:'[C=C] → today\'s reaction center',diagram:'functional-handle'}
 ];
 x.whyChain=[
  '为什么需要“官能团”这个概念？因为复杂分子里真正控制典型反应的往往只是少数局部结构；先圈局部，整题会立刻变小。',
  '为什么今天把 C=C 当主要把手？因为它额外拥有一套更暴露的 π 电子，这正是今天几种反应共同使用的电子来源。',
  '为什么不能看到一个官能团就认为只有一种反应？官能团只告诉你“哪里值得先看”；最终走哪条路还要把完整试剂和条件一起读。'
 ];
}
x=lesson(1,'d01-zero-03-electrons');if(x){
 x.body='现在才给两种角色起正式名字：手里有可用电子、能把电子对拿去形成新键的一方叫亲核体；电子相对不足、能接住这对电子的位置叫亲电中心。它们不是“互相喜欢”，而是电子有来源、也有合适去处。';
 x.formulas=['电子来源：孤对电子 / π 电子 / 负电位置','亲核体 Nu: → 亲电中心 Eδ+','新键 = 原来属于一方的电子对开始被两个原子共享'];
 x.whyChain=[
  '为什么带负电或有孤对电子的位置常能做亲核体？因为那里有一对可以重新参与成键的电子，不需要凭空创造电子。',
  '为什么带 δ+ 或正电的位置常是亲电中心？它附近的电子密度较低，存在能量合适的空轨道/电子缺口，可以接纳新的电子共享。',
  '为什么“亲核体去亲电中心”不是万能口诀？还必须同时检查空间能不能靠近、旧键是否能离开、形成的新结构是否合理以及条件允许哪条路径。'
 ];
}
x=lesson(1,'d01-zero-04-break-bond');if(x){
 x.title='今天只学一种断键：原来共享的两个电子一起归到一边';
 x.body='共价键是一对共享电子。断键时，这对电子不再共享；Day 1 的 H–Br 里，我们先只看“两个电子一起给 Br”这一种分法：H 失去这对电子后写成 H⁺，Br 得到这对电子后写成 Br⁻。另一种“一人拿一个电子”的断法明天再正式学习，今天只先认得小圆点“·”代表单个电子。';
 x.formulas=['H–Br → H⁺ + Br⁻（两个原键电子都给 Br）','A–B → A· + B·（另一种分法：明天正式学习）'];
 x.sequence=[
  {title:'成键时',text:'H 和 Br 正在共享一对电子。',formula:'H : Br  ≈  H–Br',diagram:'bond-pair'},
  {title:'今天的断法',text:'原键的两个电子一起移向 Br。',formula:'H–Br  →  H⁺ + :Br⁻',diagram:'heterolysis'},
  {title:'另一种分法先只看图标',text:'若一边只拿一个电子，会画成 A· / B·；它为什么出现、怎样连续反应，Day2 再完整讲。',formula:'A·   B·',diagram:'homolysis'}
 ];
 x.whyChain=[
  '为什么 H–Br 的两个键电子更合理地画给 Br？Br 比 H 更会拉电子，断开后也更能承受新增的负电子密度。',
  '为什么 H 失去原键电子后写 H⁺？氢核本来只有一个质子和一个电子；把那一个电子的占有也失去后，就留下带 +1 电荷的 H⁺。',
  '为什么一定要追踪“旧键电子归谁”？因为后面的电荷、中间体和下一步成键全部由这笔电子账决定；只画“键断了”会丢掉最关键的信息。'
 ];
}
x=lesson(1,'d01-lesson-addition');if(x){
 replaceEverywhere(x,[[/底物/g,'发生反应的烯烃']]);
 x.whyChain=[
  '为什么叫“加成”？原来双键的两个碳在反应后多接入了新的原子/基团，而碳骨架通常没有被剪断。',
  '为什么常说“断 π、成长 σ”？原 C—C 的 σ 主连接保留，π 那对电子被重新分配去参与新的单键连接。',
  '为什么先做原子账再判位置？A–B 里 A、B 最终都必须有去处；先确认“加了什么”能避免直接凭记忆猜产物。'
 ];
}
x=lesson(1,'d01-lesson-hbr');if(x){
 replaceEverywhere(x,[[/离去基/g,'原来连着的基团'],[/羰基/g,'以后会学到的电子缺位置']]);
 x.whyChain=[
  '为什么第一步是 π 电子去 H，而不是 Br 先去双键？H–Br 被极化后 H 一端电子更缺，π 电子有合理的受体；Br 一端反而电子更丰富。',
  '为什么 H 接到某一端后另一端会出现 C⁺？原来 π 的那对电子已经拿去形成新的 C–H 键，另一个碳暂时少了一份共享电子。',
  '为什么两种加 H 的方向不等价？它们会制造不同级别的碳正离子；能形成更稳定中间体的路径通常能垒更低、比例更高。',
  '为什么 Br⁻ 最后能接上？Br⁻ 有孤对电子，C⁺ 是明确的电子缺口；孤对电子进入两者之间形成新的 C–Br σ 键。'
 ];
}
x=lesson(1,'d01-lesson-halohydrin');if(x){
 replaceEverywhere(x,[[/氧化/g,'后面其他含氧变化'],[/脱水/g,'后面其他含氧变化']]);
 x.note='这里顺便第一次认识“溶剂”：它是大量包围反应物的介质；有时只提供环境，有时像 H₂O 这样还能亲自参加反应。–OH 连在饱和碳上时，这类产物属于醇，Day6 会系统学习。';
 x.whyChain=[
  '为什么同样写 Br₂，加入 H₂O 后第二个基团不再一定是 Br？前半段仍形成溴鎓桥，但环境里水数量巨大，而且 O 上有孤对电子，可以竞争去开桥。',
  '为什么水能用 O 去进攻？O 上的孤对电子是电子来源，桥式中间体中的碳处在电子不足状态；于是这对电子可以拿去形成 C–O 键。',
  '为什么刚接上的水最后写成 –OH？O 接到碳后暂时形成 –OH₂⁺，再把一个 H⁺ 转交给周围的水/碱性物种，就得到中性的 –OH。',
  '为什么一定要读“/H₂O”而不能只读 Br₂？因为溶剂并不总是背景；当它可以作为电子提供者参与时，它会直接改变最后接入的基团。'
 ];
}

// Day 2: keep condition learning rich but do not pre-teach Day6 oxygen families or unnecessary advanced labels.
x=lesson(2,'d02-zero-04-hydroboration');if(x){
 replaceEverywhere(x,[[/醚/g,'含氧溶剂'],[/氢化物 H−/g,'带 H 的还原试剂'],[/氢化物/g,'带负电子特征的 H'],[/协同反应/g,'同一步共同发生的过程'],[/过渡态/g,'反应途中还没变成产物的最高能量附近状态']]);
 x.whyChain=[
  '为什么不能把氢硼化只背成“反马氏”？真正决定方向的是同一步里 B、H 与双键两端同时建立关系；哪种排列让电荷发展和空间拥挤更小，哪种更有利。',
  '为什么 B 常落在较少取代端？B 体积更大，靠近较空的一端空间更舒服；同时反应途中较多取代碳更能承受一点正电特征。',
  '为什么最后看到的是 OH 而不是 B？第二步 H₂O₂/OH⁻ 把 C–B 位置转成 C–O，随后得到醇；这个后处理是路线的一部分，不能漏读。'
 ];
}
// Day3: remove formal words whose full models belong later.
x=lesson(3,'d03-official-cycloalkane');if(x){replaceEverywhere(x,[[/环氧/g,'含氧三元环'],[/构象/g,'空间姿势']]);}
x=lesson(3,'d03-zero-02-carbon-nucleophile');if(x){replaceEverywhere(x,[[/腈/g,'含氰基的结构'],[/CN⁻/g,'另一类带负电的碳试剂']]);}
x=lesson(3,'d03-zero-03-diene');if(x){replaceEverywhere(x,[[/芳香性/g,'更大的环状离域稳定体系']]);x.whyChain=[
 '为什么“两个双键隔一个单键”会特殊？中间两个碳也各保留 p 轨道，四个 p 轨道可以连续侧向重叠，π 电子不必局限在某一根双键。',
 '为什么连续重叠会改变反应？电子可以作为一个更长的整体重新分配，于是某些反应能同时形成两根新 σ 键，而不是一步一步生成自由离子。',
 '为什么 Diels–Alder 能一次把 4 个碳和 2 个碳拼成六元环？六个参与原子的 p 轨道在一个协同的电子循环里重新连接；今天先看连接变化，轨道对称性的更深原因不要求。'
];}
// Day5: save chair-specific axial/equatorial vocabulary for Day15.
x=lesson(5,'d05-lesson-anti');if(x){replaceEverywhere(x,[[/轴向/g,'某个特定朝向'],[/赤道向/g,'另一个环上朝向']]);}
// Day6: do not preview the entire Day8/12/17 vocabulary from explanatory side remarks.
x=lesson(6,'d06-official-phenol');if(x){replaceEverywhere(x,[[/邻\/间\/对位/g,'苯环上不同相对位置'],[/邻位/g,'相邻位置'],[/间位/g,'隔一个碳的位置'],[/对位/g,'相对位置']]);}
x=lesson(6,'d06-lesson-oh');if(x){replaceEverywhere(x,[[/酰氯/g,'后面会学的一类羰基化合物'],[/酸酐/g,'后面会学的一类含氧化合物'],[/酯/g,'后面会学的一类含氧化合物'],[/酰胺/g,'后面会学的一类含氮化合物'],[/胺/g,'含氮有机物'],[/前体/g,'上一步结构']]);x.whyChain=[
 '为什么 –OH 本身通常不是一个舒服的“直接离开者”？若 C–O 键电子全给 O，会生成 OH⁻；它是较强碱，通常不愿在普通酸性取代条件中以这种形式离开。',
 '为什么先加 H⁺ 会有帮助？O 的孤对电子接 H⁺ 后，–OH 变成 –OH₂⁺；随后若 C–O 断开，离开的就是中性 H₂O，稳定得多。',
 '为什么“先质子化再离去”不是凭空多一步？它把一个不利的离去形式改造成更稳定的离去物，从而显著降低这条路径的代价。'
];}
// Day7: protection can be introduced concretely, but full route-compatibility vocabulary waits until Day18.
x=lesson(7,'d07-lesson-protection-wittig');if(x){replaceEverywhere(x,[[/兼容性/g,'会不会被后续试剂误伤'],[/保护 \/ 兼容性/g,'保护思路']]);}
// Day14: do not require the formal stereochemistry word before Day15.
x=lesson(14,'d14-zero-02-symmetry');if(x){replaceEverywhere(x,[[/手性环境/g,'某些特殊的三维环境'],[/手性/g,'空间不对称情况'],[/构象/g,'不同空间姿势']]);}

// Put real-exam purpose on every day without pretending a simulated atom is an original past-paper item.
const EXAM={
1:{title:'真题先看“反应中心 + 条件”',anchor:'历年反应填空/选择的第一步常不是背整条反应，而是先认 C=C，再把 HBr、Br₂、Br₂/H₂O 的完整条件翻译成产物类型。',formats:['填空/选择','单步产物','条件辨别'],goal:'换一个烯烃结构，也能说出“哪根键先变、为什么这样接”。'},
2:{title:'同一底物换条件，真题最爱考你是否真正读完试剂',anchor:'烯烃题常把 HBr 与 HBr/ROOR、温和氧化与强氧化、加成与烯丙位反应放在一起混淆。',formats:['条件分流','产物填写','解释题'],goal:'不靠关键词猜，逐个条件说出它把电子路径改在哪里。'},
3:{title:'炔烃题不仅考产物，还会把它塞进增碳合成',anchor:'端炔酸性、炔负离子成 C–C 键、选择性还原和水合都是连接单步反应与合成路线的重要节点。',formats:['酸性排序','反应填空','合成一步'],goal:'先做 pKa/碳数账，再判断哪一个碳真正被接长。'},
4:{title:'近期真题很重视“条件→SN1/SN2→立体/重排”的整条逻辑',anchor:'此前审计到的近期材料里出现过 AgNO₃/EtOH、KI/acetone、SN1 理由及 SN2 空间后果等考法；不能只背 SN1/SN2 名字。',formats:['条件选择','机理理由','产物/空间后果'],goal:'从底物、亲核体、离去、溶剂一路推到机制和结果。'},
5:{title:'四路竞争题真正考的是“谁先占优势”',anchor:'取代与消除常通过底物级数、强碱/强亲核、温度、β-H 与几何条件混合设陷阱。',formats:['主产物','路线判断','排序/解释'],goal:'看到条件先筛路线，再画电子动作，而不是背四张孤立表。'},
6:{title:'含氧化合物是单步反应和合成路线的交通枢纽',anchor:'醇的氧化/脱水/取代、Williamson 与环氧开环经常作为“把一个官能团换成另一个”的中间步骤。',formats:['转化填空','试剂选择','小合成'],goal:'把 O 的孤对、质子化、离去与环张力接回 Day4–5。'},
7:{title:'羰基是高频反应网中心，不是几条人名反应合集',anchor:'醛酮题会把亲核加成、还原、Grignard、Wittig、银镜等混在单步反应、机理和合成中。',formats:['反应填空','机理','合成'],goal:'不论换什么亲核试剂，都先画“Nu→C，π→O”母动作。'},
8:{title:'活性排序 + 加成—消除，是羧酸衍生物题的两把钥匙',anchor:'真题可换成酰氯、酸酐、酯、酰胺或水解/还原条件，但核心仍是酰基碳与离去能力。',formats:['活性排序','产物','机理/合成'],goal:'先问 Y 能不能离开，再决定取代是否走得通。'},
9:{title:'Aldol 不是画长产物，先抓“新 C–C 到底连哪两个碳”',anchor:'缩合题最容易因 α-C、羰基受体和脱水位置混乱而丢分。',formats:['产物','机理','新键定位'],goal:'每次先标 α-H、enolate 亲核碳和受体羰基碳。'},
10:{title:'Claisen/Michael/β-二羰基要统一成“同一个亲核碳换对手”',anchor:'真题会故意换受体与后处理，检验是否只背反应名字。',formats:['反应填空','合成','条件比较'],goal:'先写亲核体/受体/新键/后处理四格表。'},
11:{title:'芳香题最容易从“定位口诀”升级成合成顺序题',anchor:'芳香性、EAS、取代基定位与 Friedel–Crafts 常互相串联；装第一个基团会改变下一步。',formats:['定位','产物','芳香合成'],goal:'每一步都问“现在这个取代基会把下一次 EAS 导向哪里”。'},
12:{title:'重氮盐是芳香合成的转接站',anchor:'胺/重氮盐题常以“如何把 NH₂ 位置换成 Cl/Br/CN/OH”或合成顺序出现。',formats:['转化填空','路线','碱性比较'],goal:'知道 N₂ 为什么愿意走、不同条件把接口换成什么。'},
13:{title:'结构推导大题先靠硬证据缩小候选',anchor:'近年试卷中结构推断长期占较高分值；不能只靠“看起来像”，必须让分子式、DBE、IR、化学检验逐条约束。',formats:['结构推导','证据判断'],goal:'每淘汰一个候选，都能指出是哪条证据杀掉它。'},
14:{title:'NMR 是结构推导的第二层证据，不是峰表背诵',anchor:'化学位移、积分、裂分、对称性最终都要变成结构片段，再与 Day13 的证据联立。',formats:['结构推导','谱图解释'],goal:'把每组信号翻译成“地址/人数/邻居/等价”后再拼结构。'},
15:{title:'立体题要把“图怎么看”和“名字怎么算”分开',anchor:'真题可能考 R/S、E/Z、Fischer、构型关系，也可能把空间结果藏在 SN2/E2 反应里。',formats:['命名','构型关系','反应立体结果'],goal:'先恢复空间，再做 CIP；不机械把“翻面”写成 R 必变 S。'},
16:{title:'排序和机理是跨章节能力，真题不会告诉你该用哪一章',anchor:'多年试卷反复出现酸碱性、稳定性、活性排序和机理解释；真正考的是选择主导因素与电子箭头语法。',formats:['排序','简答','机理'],goal:'排序先选裁判；机理每支箭都能说明电子来源和去向。'},
17:{title:'合成大题从“最后一步”切入，比从试剂海里乱搜更稳',anchor:'老题到近年都长期保留高分合成；路线往往串联前面学过的单步反应。',formats:['1–3步合成','逆推'],goal:'目标差异→碳数→最后一步→关键 C–C→正向验证。'},
18:{title:'高分合成真正拉开差距的是顺序与兼容性',anchor:'多步路线不是“每一步单独都对”就够了；前一步生成的官能团必须扛得住下一步条件。',formats:['多步合成','路线评价','结构+合成'],goal:'每一步都做“目标位点 + 其他敏感位点”的双重审计。'},
19:{title:'Boss卷只验证迁移，不给章节提示',anchor:'本卷按历年稳定题型结构组织，不冒充某年完整原题；目的是检查离开扶手后能否自己识别题型。',formats:['150分混合','无提示'],goal:'目标不是熟悉题记忆，而是陌生结构下仍能调用同一套模型。'},
20:{title:'最后一天只修真实漏洞，再换结构复测',anchor:'是否接近 120/150 目标线，应由未见题与迁移表现证明，而不是“20天打卡完成”。',formats:['Top3修复','迁移Boss'],goal:'同一技能换结构无提示仍能做对，才算真正修复。'}
};
Data.DAY_EXAM_BRIDGES=EXAM;
for(let d=1;d<=20;d++){
 const day=Data.days[d]; if(!day)continue;
 for(const l of day.lessons||[])l.examBridge=l.examBridge||EXAM[d];
 const all=[...(day.questions||[]),...Object.values(day.repairs||{}).flat(),...(day.adaptivePool||[]),...Object.values(day.adaptivePools||{}).flat()];
 for(const q of all){
  if(!q.examBridge)q.examBridge={label:q.role==='exam'?'Boss卷能力':q.role==='transfer'?'真题迁移':'真题同型能力',format:(q.examTags||[]).slice(0,2).join(' · ')||'同型训练',ask:EXAM[d]?.goal||'',dayNote:'这是按历年稳定考法设计的训练原子；除非题面明确标注年份，否则不冒充某年原题。'};
 }
}

// Rebuild first-use cards after the pedagogical timing cleanup.
const lessonText2=r=>[r.title,r.body,r.note,...(r.formulas||[]),...(r.sequence||[]).flatMap(s=>[s.title,s.text,s.formula]),...(r.whyChain||[]),r.microCheck?.prompt,...(r.microCheck?.options||[])].filter(Boolean).join(' ');
const seen2=new Set();
for(let day=1;day<=20;day++)for(const row of Data.days?.[day]?.lessons||[]){row.termCards=[];const text=lessonText2(row);for(const card of G){if(seen2.has(card.term))continue;const hit=typeof Data.glossaryMatches==='function'?Data.glossaryMatches(text,card):(card.aliases||[card.term]).some(a=>a&&text.includes(a));if(hit){row.termCards.push(card);seen2.add(card.term);}}}
Data.BEGINNER_GLOSSARY_COVERED=[...seen2];
Data.TEACHING_CLOSURE_VERSION='v8-strict-mainline';
})();

(function(){
'use strict';
const Data=window.Organic637Data; if(!Data?.days)return;
const G=Data.BEGINNER_GLOSSARY||[];
const allQ=day=>[...(day.questions||[]),...Object.values(day.repairs||{}).flat(),...(day.adaptivePool||[]),...Object.values(day.adaptivePools||{}).flat()];
const q=(d,id)=>allQ(Data.days[d]||{}).find(x=>x.id===id);
const lesson=(d,id)=>Data.days?.[d]?.lessons?.find(x=>x.id===id);
const insertAfter=(d,afterId,row)=>{const arr=Data.days?.[d]?.lessons;if(!arr||arr.some(x=>x.id===row.id))return;const i=arr.findIndex(x=>x.id===afterId);arr.splice(i<0?arr.length:i+1,0,row);};
const replaceStrings=(obj,repls)=>{
  const rep=s=>{let out=String(s??'');for(const [a,b] of repls)out=out.replace(a,b);return out;};
  for(const k of ['prompt','formula'])if(obj[k])obj[k]=rep(obj[k]);
  if(Array.isArray(obj.hints))obj.hints=obj.hints.map(rep);
  if(Array.isArray(obj.options))obj.options=obj.options.map(o=>typeof o==='string'?rep(o):{...o,label:rep(o.label)});
  if(obj.explanationLayers)for(const k of ['short','why','full'])if(obj.explanationLayers[k])obj.explanationLayers[k]=rep(obj.explanationLayers[k]);
  if(obj.preflight){obj.preflight={...obj.preflight,steps:(obj.preflight.steps||[]).map(rep),why:rep(obj.preflight.why)};}
  if(obj.translation){obj.translation={...obj.translation,source:rep(obj.translation.source),steps:(obj.translation.steps||[]).map(rep),trap:rep(obj.translation.trap)};}
  if(Array.isArray(obj.causalLadder))obj.causalLadder=obj.causalLadder.map(rep);
};

// Day 4: introduce “transition state” before it is needed, rather than letting the term appear inside a question first.
insertAfter(4,'d04-zero-02-sn2-why-back',{
  id:'d04-zero-02b-transition-state',eyebrow:'Day 4 · 反应不是瞬间跳过去',
  title:'旧键正在断、新键正在成的“山顶一瞬间”，叫过渡态',
  body:'反应物不会从“还没反应”瞬间跳到“已经反应”。沿反应路径往前走，原来的键会逐渐变弱，新键会逐渐形成。中间有一个最难跨过去、能量最高的瞬间结构，我们把它叫过渡态，常用 ‡ 表示。它不是能装进瓶子里的中间体，而像翻山时必须经过的山顶。',
  note:'这页只建立两件事：过渡态≠中间体；路径越容易跨过那个山顶，反应通常越快。',
  formulas:['反应物 → [过渡态]‡ → 产物','SN2：Nu···C···X 处在同时成键/断键的过渡态'],
  analogy:{title:'像从一个山谷走到另一个山谷，中间必须翻过山顶',body:'反应物在左边山谷，产物在右边山谷；过渡态是最高的山顶。不同路线山顶高低不同，通常山顶较低的路线更容易走。',boundary:'分子不是沿一条真实山路移动；“山高”代表自由能障碍。'},
  sequence:[
    {title:'起点：旧键还完整',text:'Nu 还没真正接上，C–X 仍是完整旧键。',formula:'Nu:   C–X',diagram:'sn2-lineup'},
    {title:'往前走：新键开始形成，旧键开始拉长',text:'这时不能把结构画成一个稳定分子，只能表示“正在变化”。',formula:'[Nu···C···X]‡',diagram:'transition-state'},
    {title:'过了山顶：新键形成，X 带走旧键电子',text:'Nu–C 成为正常键，X 离开。',formula:'Nu–C + X⁻',diagram:'sn2-electron-flow'}
  ],
  whyChain:[
    '为什么过渡态不是中间体？中间体对应能量曲线上的局部低谷，可以有短暂寿命；过渡态是某一步最高点，不能被单独分离。',
    '为什么 SN2 的背面进攻要讨论过渡态？因为真正比较的是不同靠近方向产生的“山顶”谁更低；背面方向能更好地把 Nu 的电子对送入 C–X 的反键方向。',
    '为什么反应快慢和过渡态有关？达到过渡态需要付出的能量越小，在同样温度下能跨过去的分子比例通常越高。'
  ],
  microCheck:{prompt:'下面哪句话最准确？',options:['过渡态是可长期存在的稳定产物','过渡态是旧键/新键正在改变时的最高能量瞬间','过渡态就是自由碳正离子'],answer:1,feedback:'对。它是反应路径上的“山顶”，不是一瓶能分离出来的物质。'},
  examBridge:{title:'机理题常在问“为什么这个方向/这条路径更容易”',formats:['机理简答','SN2方向','速率解释'],anchor:'真正答案通常不是“老师规定”，而是某个过渡态空间/轨道更有利、能量更低。',goal:'看到“为什么背面”“为什么快慢不同”时，知道要比较反应路径而不是只背产物。'}
});

// Question support must never teach tomorrow's language by accident.
const safeCausal={
  1:['先圈 C=C：今天所有主线都从这套较暴露的 π 电子开始。','再完整读 HBr / Br₂ / Br₂+H₂O：不同试剂决定谁来接到原双键两个碳上。','最后做电子和原子账：π 这一层去了哪里？新长了哪两根键？碳骨架有没有被剪开？'],
  2:['先逐字读完条件，不只看第一个试剂名。','再判断今天走的是“两电子一起移动”、单电子链、表面加氢，还是把双键直接切开。','最后画产物前做一次原子账：C=C 是保留、变单键，还是被切成两个片段？'],
  3:['先找今天真正特殊的位置：端炔 H、炔负离子末端碳、共轭 π 系统。','再问电子来源是什么：是强碱拿 H 后留下的电子对，还是连续 π 系统里的电子。','最后做碳数账和成键账：有没有新 C–C 键？增加了几个碳？旧 C–Br 键电子去了哪里？'],
  4:['先给三种角色分工：谁提供电子、哪个碳电子不足、谁能带着旧键电子离开。','再判断是“一步同时换人”还是“旧基团先走、形成碳正离子以后再有人接上”。','最后检查空间、溶剂和底物拥挤程度是否支持这条路径。'],
  5:['先判断来的是更像“找碳成键”的粒子，还是更像“拿 β-H”的强碱。','若走消除，必须找到 β-H，并追踪 C–H 电子怎样变成 C=C、C–X 电子怎样给 X。','最后比较底物、温度、碱体积和几何，筛出四条路线中真正占优势的那条。'],
  6:['先圈 O，并数清它现在有几根键、几对孤对电子。','再问 O 是要给电子、先接 H⁺，还是所在三元环因为张力而容易打开。','最后只画本题真正发生的官能团变化，不把所有含氧反应混在一起。'],
  7:['先把 C=O 标成 Cδ+ / Oδ−，明确电子多和电子少的一端。','再找亲核试剂真正提供电子的原子，并画 Nu→C、π(C=O)→O。','最后根据后处理决定 O⁻ 怎样收尾，并核对碳骨架是否增加。'],
  8:['先找到共同的酰基碳 C=O，再看旁边 Y 是谁。','亲核体先加到酰基碳，随后 O⁻ 做回 C=O 时，Y 必须能带着电子离开。','最后用“Y 离开后稳不稳”比较活性，并核对水解/氨解/还原的最终官能团。'],
  9:['先找羰基旁的 α-H，再问碱拿 H 后电子留在哪里。','把留下的电子画成 enolate，再用亲核碳去找另一个羰基碳。','最后只标新 C–C 键和后续质子化/脱水，不被长产物吓住。'],
 10:['先写“亲核碳是谁”，再写“今天受体是谁”。','根据受体是酯羰基、共轭 β-C 还是 β-二羰基体系选择对应电子路径。','最后做碳数与后处理账：是否离去、是否质子化、是否水解/脱羧。'],
 11:['先确认芳香 π 圈为什么值得保留，再判断取代基怎样改变各位置电子/中间体稳定性。','真正的亲电体先接到芳环，随后丢 H⁺ 把芳香 π 系统恢复。','做合成时每装一个基团就重新判断下一次会被导向哪里。'],
 12:['先看 N 的孤对电子现在能不能使用。','若进入重氮盐路线，先问为什么 N₂ 容易离开，再看条件把这个接口换成什么。','最后把每一步重新画成芳环上的位置变化，不只背 Sandmeyer 等名字。'],
 13:['先只记录分子式、化学检验和 IR 这些已经学过的证据。','一条证据只负责淘汰与它冲突的候选，不要凭一条峰就宣布唯一答案。','最后让保留下来的候选同时通过每一条硬证据；今天不调用明天才学的 NMR。'],
 14:['先把每组 NMR 信号翻译成“地址、人数、邻居、是否等价”。','再把这些结构碎片与分子式、DBE、IR 的旧证据交叉核对。','最终结构必须同时解释所有信号，不能只解释最显眼的一组峰。'],
 15:['先恢复真实空间方向，再排 CIP 优先级。','R/S、E/Z、Fischer 等名字都只是给已经看懂的三维关系编号。','遇到反应立体题时重新排优先级，不把“翻面”机械等同于 R/S 标签必互换。'],
 16:['排序先选真正主导差异的因素，不要把八个判据同时乱堆。','机理箭头永远从电子源出发，箭头终点必须是电子真正去的原子/键。','最后把选择的判据或电子动作接回前面已学过的共振、诱导、位阻、稳定性等原因。'],
 17:['先把起点和目标放在一起找不同：官能团、碳数、新 C–C 键。','再从目标倒着猜“最后一步”，每退一步都必须能找到一个已学过的正向反应接回来。','最后从起点正向走完整条路线，核对每个中间结构和碳数都对。'],
 18:['先把候选路线按先后完整写出来，不只列一串试剂。','每一步都同时看目标位点和其他可能被试剂碰到的位置；冲突时改先后或暂时保护。','最后比较可行性、步数、选择性和是否有更短更干净的替代路线。'],
 19:['先自己识别题型，不依赖章节标签。','再调用对应的结构—电子—稳定性—条件模型完成整题，不看即时答案。','交卷后才用错误分布找真实漏洞，而不是凭感觉说“哪章不会”。'],
 20:['先从 Day19 与历史记录里找真正最低的三个技能。','每个漏洞先诊断断点，再用新结构修复，最后无提示迁移。','只有换结构以后仍能独立做对，才把这块从“会做原题”升级成“真的会”。']
};

function routeSteps(day){
  if(day<=3)return ['先把起点和终点摆在一起找不同','只数碳有没有增加/减少，并圈出今天刚学过的反应把手','选一条已经学过的正向反应走到目标；暂时不讨论多步路线优化'];
  if(day<17)return ['先比较起点和终点最明显的结构差异','只用今天和前面已经学过的反应一步步连接','每走一步就画出真实中间结构，确认没有偏离目标'];
  if(day===17)return ['先做起点/终点找不同','做碳数账，再猜最后一步和关键 C–C 键','逆推后必须从起点正向走回来，逐个核对中间结构'];
  return ['先比较起点/终点与碳数','安排每一步的先后，并检查其他敏感位置会不会被顺手反应','若冲突就改先后或保护，最后比较可行性、效率和选择性'];
}
function detectiveSteps(day){
  if(day<13)return ['只用今天已经学过的一条化学证据，不调用后面谱图知识','把候选逐个和这条证据比较','不满足证据就排除；证据不够时允许保留多个候选'];
  if(day===13)return ['先算/核对分子式与 DBE','逐条读取化学检验和 IR','候选只要违背一条硬证据就淘汰；今天不使用 NMR'];
  return ['先整理分子式/DBE/IR旧证据','再把 NMR 的地址、人数、邻居、对称性变成结构碎片','所有证据同时满足后才锁定唯一结构'];
}
for(let day=1;day<=20;day++){
  const d=Data.days[day]; if(!d)continue;
  for(const row of allQ(d)){
    // Generic causal ladders written by older overlays are replaced with day-safe language.
    const generic=(row.causalLadder||[]).some(s=>/条件决定走离子、自由基、表面催化还是裂解|步骤顺序、官能团兼容性、选择性和是否有更短可行路线|DBE\/IR\/NMR\/化学检验/.test(String(s)));
    if(generic || !Array.isArray(row.causalLadder) || row.causalLadder.length<3) row.causalLadder=[...safeCausal[day]];
    if(['route','synthesis','synthesis-case'].includes(row.type)){
      row.translation={...(row.translation||{}),source:`这题调用的是 Day${day} 以前已经学过的反应与碳数账。`,steps:routeSteps(day),trap:day<=3?'现在只练“能不能接到目标”，不要提前背多步合成术语。':'不要只看最终结构，必须把每一步中间体画出来。'};
      row.preflight={...(row.preflight||{}),steps:routeSteps(day),why:'路线题也不是新世界：先找不同，再用已学过的单步反应搭桥。'};
      if(day<=17 && Array.isArray(row.causalLadder)) row.causalLadder=[...safeCausal[day]];
    }
    if(['detective','detective-case'].includes(row.type)){
      row.translation={...(row.translation||{}),source:day<13?'这里只做“早期证据练习”，不调用未来谱图工具。':day===13?'这题只调用 Day13 已经学过的 DBE / IR / 化学检验。':'这题调用 Day13 的旧证据 + Day14 的 NMR。',steps:detectiveSteps(day),trap:day<13?'只用题面明确给你的那一条证据；不要提前猜整套结构推断。':day===13?'今天不使用 NMR；一条证据不够就保留多个候选。':'不要看见一组峰就锁答案，所有证据必须一起过关。'};
      row.preflight={...(row.preflight||{}),steps:detectiveSteps(day),why:'结构题不是靠灵感猜；每条证据只能做它有资格做的排除。'};
      row.causalLadder=[...safeCausal[day]];
    }
  }
}

// Day 2 micro-retrosynthesis: keep only the already-learned last-step idea.
let x=q(2,'d02-retro-bromide-01');if(x){
  x.causalLadder=['为什么先看起点和目标？因为两边碳数相同，只是 C=C 变成了 C–C 并多出 H/Br，所以最后一步应是烯烃加成。','为什么选普通 HBr？Day1 已经看到普通 HBr 通过较稳定碳正离子主要把 Br 放到较多取代端。','为什么不选 HBr/ROOR？Day2 已学到 ROOR 会把反应切换到单电子链，区域方向会改变。'];
  replaceStrings(x,[[/外消旋\s*/g,'一对镜像产物（空间命名 Day15 再正式学习）']]);
}
// Day 2 radical question: do not introduce the formal “chemoselectivity” label yet.
x=q(2,'d02-official-radical-q');if(x){
  x.preflight={skill:'自由基溴代的位置判断',steps:['先列出不同类型的 C–H','想象每一种 H 被抽走后，那个碳会留下几级自由基','再把“这种 H 有几个”也算进去'],why:'这一步只练“哪个位置更容易被抽 H、为什么”，Day8 才给更广泛的“选择性”概念正式命名。'};
  replaceStrings(x,[[/反应选择性/g,'哪个位置更容易发生'],[/选择性/g,'位置偏好']]);
}
// Day3: plain-language substitution preview, no formal leaving-group name yet.
x=q(3,'d03-alkylation-01');if(x){
  replaceStrings(x,[[/离去基/g,'原来连着 Br 的那一部分']]);
  x.causalLadder=['为什么炔负离子能接碳？末端碳带负电并有一对可用于成键的电子。','为什么优先找一级 CH₃CH₂Br？与 Br 相连的碳周围不拥挤，电子对从背后更容易靠近。','为什么 Br 会离开？新 C–C 键形成时，原 C–Br 键电子全部给 Br，Br 以 Br⁻ 离开；Day4 才给这种整套动作正式命名。'];
}
x=q(3,'d03-detective-terminal-01');if(x){
  x.causalLadder=['题目唯一真正的新证据是什么？氨性 AgNO₃ 出现沉淀。','为什么这条证据能指向端炔？课程已把它定义为“存在 ≡C–H”时的经典检验。','所以如何排候选？有 ≡C–H 的保留，没有的排除；今天不算 DBE，也不看 IR/NMR。'];
}
x=q(3,'d03-route-hexyne-01');if(x){
  x.causalLadder=['目标比 1-丁炔多几个碳？多 2 个，所以新接入的片段应提供 2 个碳。','第一步为什么要 NaNH₂？它把端炔 H 作为 H⁺ 转移走，原 C–H 键电子留在末端碳，得到可成键的炔负离子。','第二步为什么选 CH₃CH₂Br？两碳片段正好，且与 Br 相连的是较不拥挤的一级碳，容易被末端碳的电子对接上。'];
}
x=q(3,'d03-official-ring-q');if(x){replaceStrings(x,[[/构象/g,'空间姿势']]);}
// Day4 question may now safely use transition state because the lesson above precedes it.
x=q(4,'d04-competition-01');if(x){
  x.causalLadder=['先看带 Br 的碳有多拥挤，因为这直接影响背面靠近是否容易、碳正离子是否可能稳定存在。','再看亲核体/碱和溶剂：它们会改变哪条路径的过渡态更容易跨过。','最后才在 SN1/SN2 之间选主路，并检查有没有重排或空间翻面的后果。'];
}
// Before Day18, use plain language instead of the formal route-compatibility vocabulary.
for(const [d,id] of [[7,'d07-acetal-01'],[8,'d08-route-amide-01'],[9,'d09-aldol-carbon-01'],[11,'d11-route-ethylbenzene-01']]){x=q(d,id);if(x)replaceStrings(x,[[/兼容性/g,'后面步骤会不会把这里也破坏'],[/步骤顺序/g,'先做哪一步、后做哪一步']]);}
// Day13: explicitly ban tomorrow's NMR language from every question support string.
for(const row of allQ(Data.days[13]||{})){
  replaceStrings(row,[[/DBE\/IR\/NMR\/化学检验/g,'DBE / IR / 化学检验'],[/IR\/NMR/g,'IR'],[/NMR/g,'明天的谱图工具']]);
  if(['detective','detective-case'].includes(row.type)) row.causalLadder=[...safeCausal[13]];
}
// Day17: teach route construction first; formal route-order/compatibility language belongs to Day18.
for(const row of allQ(Data.days[17]||{})){
  replaceStrings(row,[[/步骤顺序/g,'每一步的先后'],[/官能团兼容性/g,'其他官能团会不会被这一步误伤'],[/兼容性/g,'会不会误伤别处']]);
  if(['route','synthesis','synthesis-case'].includes(row.type)){
    row.translation={...(row.translation||{}),steps:routeSteps(17),trap:'Day17 先证明“这条路线能从起点走到目标”；Day18 再系统比较先后冲突与保护。'};
    row.causalLadder=[...safeCausal[17]];
  }
}

// Day1 question support: never preview tomorrow's radical/catalyst worlds inside the answer explanation ladder.
for(const row of allQ(Data.days[1]||{})){
  if((row.causalLadder||[]).some(s=>/自由基|催化/.test(String(s))))row.causalLadder=[...safeCausal[1]];
}

// Give every question a concrete “why this wording is here” anchor. This is rendered by existing preflight/causal UI.
for(let day=1;day<=20;day++)for(const row of allQ(Data.days[day]||{})){
  row.closureAnchor=row.closureAnchor||{
    from:`Day ${day} 当前题只允许调用已经学过的内容`,
    firstQuestion: row.type==='ranking'?'这题真正比较的主导因素是什么？':row.type==='electron-arrow'?'这支箭的电子从哪里来？':(['route','synthesis','synthesis-case'].includes(row.type)?'起点和终点到底差了什么？':(['detective','detective-case'].includes(row.type)?'题目真正给了哪条硬证据？':'题干里真正会发生变化的结构在哪里？')),
    success:'把答案字母/反应名遮住，仍能从结构、电子、键和条件说出结果。'
  };
}

// Rebuild first-use term cards after the new Day4 lesson and all timing cleanup.
const lessonText=r=>[r.title,r.body,r.note,...(r.formulas||[]),...(r.sequence||[]).flatMap(s=>[s.title,s.text,s.formula]),...(r.whyChain||[]),r.microCheck?.prompt,...(r.microCheck?.options||[])].filter(Boolean).join(' ');
const seen=new Set();
for(let day=1;day<=20;day++)for(const row of Data.days?.[day]?.lessons||[]){row.termCards=[];const text=lessonText(row);for(const card of G){if(seen.has(card.term))continue;const hit=typeof Data.glossaryMatches==='function'?Data.glossaryMatches(text,card):(card.aliases||[card.term]).some(a=>a&&text.includes(a));if(hit){row.termCards.push(card);seen.add(card.term);}}}
Data.BEGINNER_GLOSSARY_COVERED=[...seen];
Data.TEACHING_CLOSURE_VERSION='v9-question-closed-loop';
})();
(function(){
'use strict';
const Data=window.Organic637Data;if(!Data?.days)return;
const rows=d=>[...(Data.days[d]?.questions||[]),...Object.values(Data.days[d]?.repairs||{}).flat(),...(Data.days[d]?.adaptivePool||[]),...Object.values(Data.days[d]?.adaptivePools||{}).flat()];
let q=rows(3).find(x=>x.id==='d03-detective-terminal-01');if(q)q.causalLadder=['题目唯一真正的新证据是什么？氨性 AgNO₃ 出现沉淀。','为什么这条证据能指向端炔？课程已把它定义为“存在 ≡C–H”时的经典检验。','所以如何排候选？有 ≡C–H 的保留，没有的排除；今天只用这一条证据，不调用以后才学的结构推断工具。'];
for(q of rows(13)){
  if(!['detective','detective-case'].includes(q.type))continue;
  q.causalLadder=['先只记录分子式、化学检验和红外这些今天已经学过的证据。','一条证据只负责淘汰与它冲突的候选，不要凭一条峰就宣布唯一答案。','最后让保留下来的候选同时通过每一条硬证据；如果仍有多个候选，就诚实保留到下一天再加新证据。'];
  if(q.preflight){q.preflight.steps=(q.preflight.steps||[]).map(s=>String(s).replace(/今天不使用\s*明天的谱图工具/g,'如果证据还不够，就保留多个候选，明天再加入新的结构证据'));}
  if(q.translation){q.translation.steps=(q.translation.steps||[]).map(s=>String(s).replace(/今天不使用\s*明天的谱图工具/g,'如果证据还不够，就保留多个候选，明天再加入新的结构证据'));q.translation.trap=String(q.translation.trap||'').replace(/今天不使用\s*明天的谱图工具/g,'今天只用已经教过的证据');}
}
Data.TEACHING_CLOSURE_VERSION='v9-question-closed-loop';
})();
(function(){
'use strict';
const Data=window.Organic637Data;if(!Data?.days)return;
const row=Data.days[4]?.lessons?.find(x=>x.id==='d04-zero-02b-transition-state');
if(row){
  row.grounding={known:'刚刚已经看懂 SN2 为什么从背后靠近，以及旧 C–X 键会同时变弱',newThing:'现在只增加一个词：反应途中“新键未完全成、旧键未完全断”的最高能量瞬间叫过渡态',action:'以后遇到“为什么这条路线更快/更容易”，先问哪条路径的山顶更低',exam:'SN2机理理由、速率与路径比较'};
  row.heroDiagram='transition-state';
  row.returnAnchor='Day4 前一页：背面进攻与 C–X 反键方向';
  row.lookQuestions=['图上哪一根旧键正在变弱？哪一根新键正在形成？','为什么这个“山顶结构”不能当成一个能装瓶保存的稳定中间体？'];
}
})();

(function(){
'use strict';
const Data=window.Organic637Data;if(!Data?.days)return;
const L=(d,id)=>Data.days[d]?.lessons?.find(x=>x.id===id);
const set=(d,id,sequence,micro)=>{const r=L(d,id);if(!r)return;if(sequence)r.sequence=sequence;if(micro)r.microCheck=micro;};
const S=(title,text,formula,diagram)=>({title,text,formula,diagram});
const M=(prompt,options,answer,feedback)=>({prompt,options,answer,feedback});

// DAY 1 — every reinforcement page must still show a concrete electron/bond story.
set(1,'d01-lesson-structure',[
 S('先把双键拆成两层','两个碳之间最底层的主连接是 σ；额外的一层侧向重叠是 π。','C=C = σ + π','sigma-pi'),
 S('想象发生加成时谁先被拿来用','原 C—C σ 继续把两个碳连在一起；π 电子被拿去参与新的成键。','σ 保留；π 重新分配','pi'),
 S('所以“看见 C=C”要立刻问两件事','π 电子会去哪里？又有哪些新原子/基团会接到这两个碳上？','C=C → C–C + 2 new bonds','addition')
],M('烯烃典型加成后，原来 C=C 里的哪一部分通常仍把两个碳连在一起？',['σ 键','π 键','两者都完全消失'],0,'对。原 C—C 的 σ 主连接通常保留，π 那一对电子被重新分配。'));
set(1,'d01-lesson-addition',[
 S('先做“原子账”','A–B 里的 A 和 B 最终都要有去处，不能凭空多也不能少。','C=C + A–B','addition'),
 S('π 电子先变成一根新键','双键中的 π 电子对去和其中一端形成新的 σ 键。','π → C–A','new-bond'),
 S('另一端再补上第二根新键','旧 A–B 键电子如何分配，决定另一个基团怎样接到另一只碳。','C=C → A–C–C–B','addition')
],M('“加成”最核心的结构变化是哪一个？',['C=C 变成 C–C，并在两个碳上增加新键','把整条碳链剪成两段','只换掉一个 H，双键完全不动'],0,'对。先抓“多键变少 + 新 σ 键增加”，再讨论区域和立体。'));
set(1,'d01-lesson-hbr',[
 S('先把 H–Br 看成不平均的共享','Br 更会拉电子，所以 H 端相对电子缺、Br 端相对电子富。','Hδ+–Brδ−','hbr-polarity'),
 S('π 电子先去 H','这一步一边长 C–H，一边让 H–Br 原键电子归 Br，留下 Br⁻。','π→H；H–Br→Br⁻','pi-to-h'),
 S('比较两种可能的 C⁺','H 加在不同端会让另一端出现不同级别的碳正离子；较稳定的那条路径通常更有利。','3° C⁺ > 2° C⁺ > 1° C⁺','carbocation-stability'),
 S('Br⁻ 再补电子缺口','Br⁻ 的孤对电子去 C⁺，形成最终 C–Br。',':Br⁻→C⁺','br-to-cation')
],M('普通 HBr 加成为什么要先比较两种可能的碳正离子？',['因为区域方向由中间体稳定性影响','因为 Br 原子数量不同','因为双键会随机断开'],0,'对。不是先背“马氏”，而是先比较哪种质子化会得到更稳定的 C⁺。'));
set(1,'d01-lesson-bromine',null,M('Br₂/CCl₄ 加成时，第二个 Br 从哪里来？',['同一个 Br₂ 分子断开后形成的 Br⁻','溶剂 CCl₄','水'],0,'对。π电子先极化/进攻 Br₂，Br–Br 断裂产生 Br⁻，它再从反面开桥。'));
set(1,'d01-lesson-halohydrin',null,M('Br₂/H₂O 和 Br₂/CCl₄ 的真正分叉点在哪里？',['前半段形成溴鎓离子之后，谁来开桥','第一步是否存在 C=C','是否需要任何电子'],0,'对。前半段共享；水环境让 H₂O 参与开桥，最终形成 Br/OH。'));
set(1,'d01-lesson-summary',[
 S('第一眼只圈反应把手','先找 C=C，不要同时分析所有 C–H。','[C=C]','functional-handle'),
 S('第二眼读完整条件','HBr、Br₂、Br₂/H₂O 是三种不同电子故事。','condition → path','condition-map'),
 S('第三步做电子和原子账','问 π 去哪、新键长哪、每个试剂原子最终去哪。','electron source → new bonds','curved-arrow'),
 S('最后才说反应名字/规则','如果把名字遮住仍能推出产物，才是真的会。','understand → name','markovnikov')
],M('Day1 做陌生烯烃题最稳的第一步是什么？',['先圈 C=C 并读完整条件','先背答案字母','先猜产物再找理由'],0,'对。结构和条件先行，名字只是最后的总结。'));

// DAY 2 — make “conditions change pathways” visible, not a reagent flash-card list.
set(2,'d02-lesson-conditions',[
 S('把试剂拆成三栏','先看主试剂，再看斜杠后的改路线条件，最后看溶剂/后处理。','main reagent | condition | workup','condition-step'),
 S('比较只差一个条件的两行','HBr 与 HBr/ROOR 只有一个额外条件，却会切换到不同电子路径。','HBr ≠ HBr/ROOR','condition-crossroads'),
 S('做题时把条件当成开关','看到 ROOR/hν/金属/强氧化等，先问它改变的是电子来源还是最后收尾。','condition → mechanism family','condition-map')
],M('看到 “HBr / ROOR” 时，最不能做的事是什么？',['只看到 HBr 就直接套 Day1 结果','把 ROOR 当成改路线条件读进去','先判断它是否进入自由基链'],0,'对。斜杠后的小条件经常就是整道题真正的陷阱。'));
set(2,'d02-lesson-branches',[
 S('先判“大方向”','双键是被变成单键、被切开，还是被保留？先做这一层。','add / cut / keep','condition-map'),
 S('再判“位置”','若是加成，再问 H、B、OH、Br 等落在哪个原双键碳。','regio','anti-mark'),
 S('最后才判“空间”','只有当题目真的需要时，再区分同侧/异侧等空间结果。','type → region → space','cis-trans')
],M('面对一个新烯烃条件，最合理的判断顺序是？',['先产物类型→再区域→最后空间','先空间→再猜反应名','只看是否含 Br'],0,'对。先把大问题切小，工作记忆不会一次塞满三层判断。'));
set(2,'d02-lesson-retro',[
 S('先把目标和可能起始烯烃并排','找目标里哪两个相邻碳最像原来的 C=C 两端。','product ← alkene','retrosynthesis'),
 S('把加上去的基团“想象拿掉”','恢复 C=C 后，检查得到的烯烃是否合理、碳数是否一致。','remove added groups → C=C','retro-compare'),
 S('再正向走一次验证','用今天学过的条件重新加成，必须能回到目标。','alkene + condition → target','retro-forward')
],M('微型逆推最重要的安全检查是什么？',['倒推后再正向走一遍能回到目标','只要名字像就算对','碳数不同也无所谓'],0,'对。逆推只是猜前一步，正向验证才决定这条猜测能不能站住。'));
set(2,'d02-lesson-radical-chain',[
 S('引发：先制造第一批自由基','过氧化物/光等条件先产生带单电子的活性粒子。','RO–OR → 2 RO·','homolysis'),
 S('传递1：自由基从 HBr 拿 H','得到新的 Br·，于是“接力棒”没有消失。','RO· + HBr → ROH + Br·','radical-propagation'),
 S('传递2：Br· 加到 C=C','形成新的碳自由基；它再去拿 H，于是链继续。','Br· + C=C → C·','radical-chain'),
 S('终止：两个自由基碰到一起','若两只自由基直接结合，链上不再产生新的自由基。','R· + ·R → R–R','radical')
],M('为什么叫“链反应”？',['传递步骤每消耗一个自由基又生成另一个自由基','所有步骤都没有电子','因为分子排成直线'],0,'对。自由基像接力棒被不断再生，直到两个自由基相遇终止。'));

// DAY 3 — connect acid/base, carbon nucleophile, selective alkyne chemistry and diene joining.
set(3,'d03-zero-03-diene',null,M('“共轭二烯”里两个双键为什么不能完全各算各的？',['中间单键两侧 p 轨道可连续重叠，π电子能离域','因为中间单键不存在','因为所有碳都带正电'],0,'对。关键是连续 p 轨道重叠，而不是名字里有两个“双键”。'));
set(3,'d03-lesson-acetylide',[
 S('第一步先认端炔','只有末端写成 ≡C–H，才有今天这只特殊 H。','R–C≡C–H','acetylide'),
 S('强碱拿走 H⁺','碱的电子对去 H，原 C–H 键电子留在末端碳。','R–C≡C–H → R–C≡C:⁻','deprotonation'),
 S('负电碳变成成键工具','这只末端碳现在有电子对，可以去和合适的电子缺碳形成新的 C–C 键。','C:⁻ → Cδ+','new-bond')
],M('端炔被 NaNH₂ 去质子化后，原 C–H 键的电子主要留在哪里？',['末端碳上','H⁺ 上','Na⁺ 上'],0,'对。H 以 H⁺ 形式被转移，原键电子留给碳，所以得到炔负离子。'));
set(3,'d03-lesson-selectivity',[
 S('先把“三键”当作两层可被处理的 π','还原一层会停在 C=C；继续处理才到 C–C。','C≡C → C=C → C–C','addition'),
 S('Lindlar 让反应停在同侧烯烃','表面加氢较温和，两个 H 从同一面加入，并阻止继续完全还原。','alkyne → cis-alkene','hydrogen-surface'),
 S('Na/NH₃(l) 走单电子路径','分步电子/质子转移常给异侧烯烃。','alkyne → trans-alkene','cis-trans'),
 S('Hg²⁺/H₂O 则不是还原','它把三键带到烯醇，再互变成羰基。','alkyne → enol → carbonyl','tautomerization')
],M('想把炔烃停在烯烃而不是走到烷烃，首先要做什么？',['选择能控制“只处理一层 π”的条件','随便用大量 H₂/Pd','只看碳数'],0,'对。选择性还原本质是控制反应停在哪一层。'));
set(3,'d03-zero-04-cis-trans',null,M('今天说“同侧/异侧”是在描述什么？',['两个新加基团在原多键两侧的空间关系','碳原子数量','是否含氧'],0,'对。这里只先建立空间图像，Day15 再用更正式的 E/Z、R/S 语言。'));
set(3,'d03-lesson-diene',[
 S('先把 4π 那一段摆成能靠近的形状','共轭二烯的四个碳必须能一起参与。','C=C–C=C','conjugation'),
 S('亲双烯体提供另外两个碳','它通常含一个 C=C，两个端点将分别和二烯两端成键。','4C + 2C','diels-alder'),
 S('一次形成两根新 σ，同时重排 π','不是先生成自由碳正离子再慢慢闭环。','two σ + one new π','diels-ring'),
 S('最终得到六元环','碳数账非常直观：4+2=6。','4 + 2 → six-membered ring','diels-ring')
],M('Diels–Alder 的“4+2”最先是在数什么？',['参与成环的 4 个二烯碳 + 2 个亲双烯体碳','反应温度','电子总数只有6个'],0,'对。先做碳骨架账，再去理解更深的协同电子重排。'));
set(3,'d03-lesson-terminal-test',[
 S('先看有没有末端 ≡C–H','端炔把 H 直接连在 sp 碳上，内炔没有这只 H。','R–C≡C–H vs R–C≡C–R','terminal-alkyne'),
 S('强碱能把这只 H 转走','留下炔负离子，这是端炔能“长碳链”的根源。','≡C–H → ≡C:⁻','acetylide'),
 S('银/亚铜检验只是把这条差异显出来','出现沉淀可作为端炔存在的化学证据之一。','terminal alkyne + Ag⁺ → precipitate','silver-test')
],M('2-丁炔 CH₃C≡CCH₃ 为什么不能做端炔银盐检验阳性？',['它没有 ≡C–H','它没有碳','它没有 π 键'],0,'对。关键不是“有三键”就够，而是必须有末端炔氢。'));

// DAY 4 — turn mechanism labels into visible competing stories.
set(4,'d04-zero-03-sn1-wait',null,M('SN1 和 SN2 最根本的步骤差别是哪一个？',['SN1 先让 X 离开形成独立 C⁺，SN2 不先形成自由 C⁺','SN1 没有电子移动','SN2 一定先生成 C⁺'],0,'对。有没有“自由碳正离子中间体”是两条路线最关键的分界之一。'));
set(4,'d04-lesson-substrate',[
 S('先圈与 X 直接相连的碳','级数只数这一只碳直接连着几个其他碳。','R–C(X)–','substrate'),
 S('一级：周围只有一个碳邻居','背面相对不拥挤，但若先离去会形成很不稳定的一级 C⁺。','1° RX','primary-carbocation'),
 S('三级：周围有三个碳邻居','背面很挤，但若先离去能形成较稳定的三级 C⁺。','3° RX','carbocation-stability'),
 S('所以级数会把两条路线推向相反方向','越拥挤越不利一步背面进攻；越能稳定 C⁺ 越有利先离去路线。','steric vs carbocation stability','steric')
],M('判断 2-溴丁烷是一级/二级/三级时，应该数哪个碳？',['直接连 Br 的那个碳','分子里最左边碳','所有碳一起'],0,'对。级数永远围绕“正在发生取代/离去的中心碳”来数。'));
set(4,'d04-lesson-mechanism',[
 S('SN2：两件事同一步发生','Nu 的电子对去中心碳，同时 C–X 键电子给 X。',':Nu→C；C–X→X⁻','sn2-electron-flow'),
 S('整个过程中没有自由 C⁺','只经过同时成/断键的过渡态。','[Nu···C···X]‡','transition-state'),
 S('SN1：第一步先只有 C–X 断','X 带走旧键电子，留下可真实存在一小段时间的 C⁺。','R–X → R⁺ + X⁻','sn1-ionize'),
 S('第二步 Nu 再来补缺口','所以后续还可能发生重排、不同方向进攻等碳正离子特征。',':Nu→C⁺','sn1-capture')
],M('哪条路线会先形成独立的碳正离子中间体？',['SN1','SN2','两者都一定会'],0,'对。SN1 的“1”背后最关键的动作是先电离，SN2 是一步协同。'));
set(4,'d04-lesson-arrows',[
 S('箭尾先找电子','孤对、负电、π键、已有 σ 键都可能是电子来源。','tail = electrons','arrow-tail'),
 S('箭头终点要说清电子要变成什么','去原子通常表示电子落到原子；去两原子之间通常表示形成新键。','head = atom / new bond','arrow-head'),
 S('断键箭头从“键”出发','因为你移动的是那根旧键里的电子，不是把原子本身画飞。','C–X → X','arrow-bond')
],M('表示 C–Br 异裂成 C⁺ + Br⁻ 时，曲箭的尾巴应该从哪里出发？',['C–Br 键','Br 原子外面的空白处','C⁺'],0,'对。原 C–Br 键里的电子要移动，所以箭尾从那根键出发。'));
set(4,'d04-lesson-rate-solvent',null,M('为什么 SN2 速率式里会同时出现 [RX] 和 [Nu⁻]？',['因为最慢关键碰撞里两者都参与','因为溶剂一定进产物','因为 SN2 有两个中间体'],0,'对。速率式是对关键路径参与者的实验线索，不是死记字母。'));

// DAY 5 — make the four-way competition a decision tree.
set(5,'d05-lesson-elimination',null,M('消除形成 C=C 时，哪一根旧键的电子直接成为新的 π 电子？',['β-C–H 键','溶剂里的 O–H 键','任意 C–C 单键'],0,'对。碱拿 β-H，原 C–H 键电子留下来形成 Cα=Cβ。'));
set(5,'d05-lesson-e2',[
 S('碱先对准 β-H','电子对去 H，不是去中心碳。','Base:→Hβ','basicity'),
 S('C–H 键电子留下来做 π','β-C 与 α-C 之间形成 C=C。','Cβ–H → Cα=Cβ','e2-electron-flow'),
 S('中心 C–X 同时断','为了保持合理价键，C–X 电子给 X。','Cα–X→X⁻','e2-electron-flow'),
 S('三件事同一步，所以速率看两边','底物和碱都参与这个关键过渡态。','v=k[RX][Base]','rate-law')
],M('E2 为什么叫“一步协同”？',['夺 H、成 π、X 离开在同一个基本步骤发生','先形成自由 C⁺ 很久再夺 H','只发生 C–X 断裂'],0,'对。没有可分离的碳正离子中间体，三支电子移动是联动的。'));
set(5,'d05-lesson-anti',null,M('E2 要找 anti-periplanar，真正想让哪几套轨道排列最有利？',['C–H σ、将成的 π、C–X 反键方向','任意两个 C–H','溶剂分子'],0,'对。180° 是几何表现，背后原因是电子传递所需的轨道对齐。'));
set(5,'d05-lesson-zaitsev',[
 S('先列所有真正有 β-H 的位置','没有 β-H 的方向根本不能消除。','find β-H','beta-h'),
 S('小碱通常能靠近更拥挤的 H','常更容易形成取代度较高、通常更稳定的烯烃。','small base → Zaitsev often','zaitsev'),
 S('大碱被空间挡住','t-BuO⁻ 更容易拿较外侧、较容易接近的 H，可能给较少取代烯烃。','bulky base → less substituted often','bulky-base')
],M('t-BuOK 常比 NaOEt 更容易给 Hofmann 型较少取代烯烃，最直观原因是什么？',['碱体积大，更偏向够得到的外侧 β-H','它没有氧','它不是碱'],0,'对。先用空间可接近性理解，再记名称。'));
set(5,'d05-lesson-e1',[
 S('第一步和 SN1 共用：X 先走','形成碳正离子，所以三级/稳定 C⁺ 更有利。','R–X → R⁺ + X⁻','sn1-ionize'),
 S('接下来出现分叉','Nu 若去 C⁺ 得取代；碱/溶剂若拿 β-H 得消除。','C⁺ → SN1 or E1','condition-crossroads'),
 S('E1 的 π 键来自 β-C–H','拿 H 后原 C–H 电子做 C=C。','β-C–H → C=C','e1'),
 S('有自由 C⁺，就要警惕重排','氢/烷基迁移可能先把 C⁺ 变得更稳定。','rearrangement possible','rearrangement')
],M('E1 与 SN1 为什么经常一起竞争？',['它们都先经过同一个碳正离子中间体','它们都必须用强碱一步完成','它们都没有离去基'],0,'对。分叉发生在 C⁺ 已形成之后：是 Nu 去补，还是拿 β-H 形成双键。'));
set(5,'d05-lesson-fourway',[
 S('问题1：底物有多拥挤/能否稳定 C⁺','一级更支持背面一步，三级更支持 C⁺ 路线或消除。','substrate','substrate'),
 S('问题2：来的粒子更想找 C 还是拿 H','强亲核偏取代；强而大的碱更偏消除。','Nu vs Base','nucleophilicity'),
 S('问题3：溶剂和温度在帮谁','质子溶剂可稳定离子；升温常使消除竞争增强。','solvent + T','condition-map'),
 S('问题4：β-H/几何是否真的允许','尤其 E2 必须有可用 β-H，并能达到合适反式共平面关系。','β-H + anti','anti-periplanar')
],M('四路竞争里，为什么不能只看“底物是二级”就直接下结论？',['二级底物可能同时支持多条路，还要看 Nu/碱、溶剂、温度和 β-H','二级永远只有 SN1','二级永远只有 E2'],0,'对。二级正是最需要把多个条件一起读的灰区。'));

// DAY 6 — make oxygen chemistry one coherent electron story.
set(6,'d06-lesson-oh',null,M('为什么酸性条件常先把 –OH 变成 –OH₂⁺？',['让以后离开的是更稳定的中性 H₂O，而不是强碱 OH⁻','为了增加碳数','为了生成自由基'],0,'对。质子化是在“改造离去形式”，不是多余步骤。'));
set(6,'d06-lesson-oxidation',[
 S('先只盯连 OH 的那个碳','不要看整分子，先数它和 O/H 的连接。','C–OH','oxygen-polarity'),
 S('氧化 = 让这个碳更“靠近 O、远离 H”','C–O 键层级增加或 C–H 数减少。','C–OH → C=O','oxidation'),
 S('一级醇可先到醛','若继续强氧化，醛还可到羧酸。','RCH₂OH → RCHO → RCO₂H','oxidation'),
 S('二级醇到酮后通常停','羰基碳已没有可继续“氧化成酸”的 H。','R₂CHOH → R₂C=O','ketone')
],M('把二级醇氧化成酮，最明显的“原子账”变化是什么？',['同一碳 C–O 层级增加、C–H 减少','碳数增加两个','所有 C–C 键断裂'],0,'对。先按同一碳做氧化程度账，比死背试剂更稳。'));
set(6,'d06-lesson-dehydration',[
 S('先让 OH 变成更好离开的水','酸把 –OH 质子化成 –OH₂⁺。','ROH + H⁺ → ROH₂⁺','protonation'),
 S('再看邻位 β-H','形成双键需要从相邻碳拿一个 H。','find β-H','alpha-beta'),
 S('C–H 电子留下来形成 C=C','同时水离开，得到烯烃。','C–H → π；H₂O leaves','elimination-path'),
 S('所以脱水与 Day5 消除是同一家逻辑','只是先把 OH 改造成可离开的 H₂O。','alcohol → alkene + H₂O','e1')
],M('醇脱水生成 C=C 时，新的 π 电子主要来自哪里？',['邻位 C–H 键电子','离去的 H₂O','酸催化剂本身'],0,'对。拿走 β-H 后，原 C–H 电子留下来组成新 π 键。'));
set(6,'d06-lesson-williamson',[
 S('先把醇变成 RO⁻','去掉 O–H 的 H⁺，让 O 手里有更强的可用电子对。','ROH → RO⁻','oxygen-lonepairs'),
 S('再选一个不拥挤的 R′–X','一级卤代烃最适合让 O 从背面靠近。','RO⁻ + R′–X','substrate'),
 S('O–C 新键形成，C–X 同时断','这就是 Day4 的一步背面取代，只是亲核体换成 RO⁻。','RO:⁻→C；C–X→X⁻','sn2-electron-flow'),
 S('最终得到醚','两个碳片段通过 O 连起来。','R–O–R′','oxygen-polarity')
],M('Williamson 合成中为什么通常优先用一级卤代烃？',['背面进攻空间更容易，少与消除竞争','一级碳一定能形成稳定 C⁺','因为一级卤代烃没有 C–X 键'],0,'对。它本质是 SN2，所以底物拥挤程度仍然决定成败。'));
set(6,'d06-lesson-epoxide',null,M('碱性条件下 Nu 开环氧时，为什么通常先打较少取代的碳？',['一步背面进攻更受空间拥挤控制','因为氧只拉另一边电子','因为较少取代碳一定带负电'],0,'对。三元环张力提供动力，SN2式背面靠近让位阻决定位置。'));
set(6,'d06-zero-03-grignard-preview',null,M('CH₃MgBr 开环氧后，为什么碳骨架会比原 Grignard 多两个碳？',['环氧的两个碳被一起保留并接到 CH₃ 上','Mg 增加两个碳','酸化步骤增加两个碳'],0,'对。先做碳数账：Grignard 的碳 + 环氧的两个碳都进入产物。'));
set(6,'d06-lesson-lucas',[
 S('Lucas 先把 OH 变成能离开的形式','酸性 ZnCl₂/HCl 环境帮助 C–O 断裂/取代。','ROH → RCl','lucas'),
 S('三级醇更容易走碳正离子路径','较稳定 3° C⁺ 使取代很快。','3° fastest','carbocation-stability'),
 S('生成的 RCl 在水相中溶解性低','出现浑浊只是“产物从溶液里分出来”的可见信号。','RCl → turbidity','solvation'),
 S('所以试验比的是时间','三级快、二级较慢、一级在常温下常很慢。','time → alcohol class','rate-law')
],M('Lucas 试验里“很快变浑浊”最直接说明什么？',['较快生成了难溶于水相的卤代物','生成了大量 CO₂','所有 OH 都同时消失'],0,'对。浑浊是反应速率的可见代理，不是一个新官能团。'));

Data.TEACHING_CLOSURE_VERSION='v9-question-closed-loop';
})();

(function(){
'use strict';
const Data=window.Organic637Data;if(!Data?.days)return;
const L=(d,id)=>Data.days[d]?.lessons?.find(x=>x.id===id);
const set=(d,id,sequence,micro,why)=>{const r=L(d,id);if(!r)return;if(sequence)r.sequence=sequence;if(micro)r.microCheck=micro;if(why)r.whyChain=why;};
const S=(title,text,formula,diagram)=>({title,text,formula,diagram});
const M=(prompt,options,answer,feedback)=>({prompt,options,answer,feedback});

// DAY 7 — Carbonyl: one electron story, many reagents.
set(7,'d07-zero-02-carbonyl-names',[
 S('先只圈 C=O 的那个碳','醛和酮的第一步不是背名字，而是看羰基碳还连着谁。','R–C(=O)–?','aldehyde-ketone'),
 S('若羰基碳直接连 H','至少有一个 H 连在羰基碳上，就是醛；最常见片段写作 –CHO。','R–CHO','aldehyde'),
 S('若羰基碳两边都连碳','两侧都是碳片段，就是酮。','R–CO–R′','ketone'),
 S('名字只是结构差异的标签','以后看到“醛/酮”，先把名字翻译回这张结构图，再谈氧化、还原和加成。','醛 = C=O旁有H；酮 = C=O旁无H','carbonyl')
],M('CH₃COCH₃ 为什么叫酮而不是醛？',['羰基碳两边都连碳，没有直接连 H','因为它有三个碳','因为 O 带负电'],0,'对。分类只看羰基碳直接连着谁。'));
set(7,'d07-lesson-polarization',[
 S('先回到“共享电子不平均”','C=O 也是共价键，但 O 比 C 更能拉电子。','C=O','electronegativity'),
 S('所以电子云向 O 偏','这不是完整电荷转移，而是部分偏移：Oδ−、Cδ+。','Cδ+=Oδ−','carbonyl-polar'),
 S('C 因此成为电子入口','有孤对/负电的粒子若要把电子送进羰基，合理目标是电子相对缺的 C。','Nu: → Cδ+','nucleophile-carbonyl'),
 S('以后羰基题先画这两个 δ','如果你忘了“谁打谁”，重新画 Cδ+=Oδ−，路线会自己显出来。','Cδ+=Oδ−','carbonyl-poor-c')
],M('为什么亲核体通常攻击羰基碳而不是氧？',['羰基电子云偏向 O，使 C 相对缺电子','O 没有电子','C 一定带完整 +1 电荷'],0,'对。是“部分电荷 + 电子可用性”的结果，不是原子互相喜欢。'),[
 '为什么 C=O 会极化？因为 O 电负性更强，成键电子平均位置更靠近 O。',
 '为什么极化会影响反应位置？因为电子丰富的亲核体需要一个能接纳电子的相对缺电子中心。',
 '为什么仍写 C=O 而不是 C⁺–O⁻？真实结构主要仍是共价双键；δ+/δ−表示电子分布不均，不是完全离子化。'
]);
set(7,'d07-lesson-addition',[
 S('箭尾先放在 Nu 的电子上','Nu 的孤对/负电是一对现成电子，所以它能拿来形成新键。',':Nu⁻','nucleophile'),
 S('这对电子去羰基碳','C–Nu 新 σ 键开始形成。',':Nu → Cδ+','carbonyl-electron-flow'),
 S('但碳不能凭空多出第五根键','C=O 的 π 电子必须同时移到 O，双键暂时变单键。','C=O π → O','carbonyl-electron-flow'),
 S('得到四面体 O⁻ 中间体','羰基平面碳变成四面体，O 暂时带负电。','R₂C(O⁻)(Nu)','tetrahedral'),
 S('最后 O⁻ 再拿 H⁺','酸化/溶剂把 O⁻ 变成 OH，得到稳定加成产物。','O⁻ + H⁺ → OH','protonation')
],M('Nu 攻击 C=O 时，为什么 C=O 的 π 电子必须移到 O？',['否则羰基碳会超出合理价键数','因为 O 必须离开分子','为了增加碳数'],0,'对。电子箭头首先要满足价键账：新键形成时旧 π 键必须让位。'));
set(7,'d07-lesson-reduction',[
 S('把“还原剂名字”翻译成真正送来的东西','对醛酮而言，NaBH₄/LiAlH₄最关键的动作可以先近似看作“给羰基碳一个 H⁻ 等价体”。','H⁻ equivalent','hydride'),
 S('H 的电子对去 C','形成 C–H，同时 C=O π 电子上 O。','H:⁻→C；π→O','carbonyl-electron-flow'),
 S('O⁻ 再质子化成 OH','所以净结果是 C=O 变 C–OH，同时羰基碳多一个 H。','C=O → CH–OH','protonation'),
 S('再比较“力量”而不是只背名字','NaBH₄较温和，常处理醛酮；LiAlH₄更强，后面酯/酸等也能被它继续推。','NaBH₄ < LiAlH₄（还原能力）','hydride')
],M('NaBH₄ 把酮还原成醇时，新加到羰基碳上的是什么？',['一个氢（来自氢化物等价体）','一个氧','一个碳'],0,'对。先看净原子变化，再记不同还原剂的适用范围。'));
set(7,'d07-zero-03-carbonyl-to-methylene',[
 S('先区别两个目标','“还原到醇”保留 O；“还原到亚甲基”最终把羰基 O 整体去掉。','C=O → CHOH  vs  C=O → CH₂','carbonyl'),
 S('Clemmensen 是酸性路线','Zn(Hg)/HCl 常用于能耐强酸的底物。','C=O → CH₂  [Zn(Hg),HCl]','acid-route'),
 S('Wolff–Kishner 是碱性高温路线','先与肼形成含 N 中间体，再在强碱/热下最终放出 N₂，留下 C–H。','C=O → CH₂  [NH₂NH₂,KOH,Δ]','base-route'),
 S('合成题先选“环境兼容”','目标变化相同，但底物若怕酸或怕碱，就不能只看最终箭头。','same transformation, different conditions','compatibility')
],M('一个底物同时含“怕强酸”的官能团，想把 C=O 变 CH₂，优先比较哪条路线？',['考虑 Wolff–Kishner 的强碱路线是否更合适','只要 Clemmensen 名字熟就选','NaBH₄ 一定能把 O 完全去掉'],0,'对。真正做合成要同时看目标变化和条件会不会误伤别处。'));
set(7,'d07-lesson-grignard',[
 S('先把 RMgX 的 C–Mg 键看成严重极化','Mg 比 C 更愿意失电子，R 端表现出“碳负性”，可近似当作 R:⁻ 的电子行为。','Rδ−–MgXδ+','grignard'),
 S('R 的碳电子对去羰基碳','这一步会直接形成新的 C–C 键。','R:⁻ → C=O','new-bond'),
 S('C=O π 同时上 O','先得到烷氧负离子。','R–C(O⁻)–','carbonyl-electron-flow'),
 S('酸化只负责把 O⁻ 变成 OH','H₃O⁺ 不增加碳数；新增的碳来自 RMgX 的 R。','O⁻ → OH','workup'),
 S('所以先做碳数账','目标醇里多出的碳片段，必须能从 Grignard 的 R 和原羰基两边追出来。','C(target)=C(carbonyl)+C(R)','carbonyl-target')
],M('CH₃MgBr 与甲醛反应后，新增的那个碳来自哪里？',['CH₃MgBr 的 CH₃ 片段','酸化用的 H₃O⁺','MgBr'],0,'对。Grignard 的价值就是“带着一个碳片段来成新 C–C 键”。'));
set(7,'d07-lesson-derivatives',[
 S('先不要背三套产物，先找共同起点','HCN、NH₂OH、肼都先利用同一个羰基 Cδ+。','Cδ+=Oδ−','carbonyl-polar'),
 S('CN⁻：碳端去 C=O','形成 C–C 新键，后续 O⁻ 质子化，得到氰醇。','C=O + CN⁻ → C(OH)(CN)','nitrile'),
 S('NH₂OH：N 的孤对去羰基碳','先加成，再通过质子转移/失水得到 C=N–OH，也就是肟。','C=O → C=N–OH','beckmann'),
 S('肼类也是“先加、后失水”','最终得到 C=N–NH₂/衍生物。','C=O → C=N–NH₂','carbonyl-addition'),
 S('看到试剂先问“哪一个原子有孤对会去 C？”','这样即使忘了产物名，也能把第一步推出来。','electron donor → carbonyl C','nucleophile-carbonyl')
],M('羟胺 NH₂OH 与醛酮反应的第一步，最关键是谁进攻羰基碳？',['N 上的孤对电子','O 原子必须先离开','羰基氧去攻击 N'],0,'对。先找电子提供者和电子缺口，再进入后续脱水。'));
set(7,'d07-lesson-protection-wittig',[
 S('先区分两个完全不同目标','缩醛是“暂时藏起 C=O”；Wittig 是“永久把 C=O 换成 C=C”。','protect vs transform','protection'),
 S('缩醛保护为什么有效','羰基被转成两个 C–O 单键后，不再有原来的 Cδ+=Oδ− 亲电中心，对很多亲核试剂不再那么敏感。','C=O ⇄ acetal','acetal'),
 S('做主反应后再恢复','保护不是终点；后面用适当酸性水解把 C=O 放回来。','protect → react → deprotect','deprotect'),
 S('Wittig 则把 O 换成碳片段','叶立德提供碳，净结果 C=O → C=C，可用于精准装双键。','C=O + Ph₃P=CR₂ → C=CR₂','wittig')
],M('如果后续要用强亲核试剂，但又想暂时保留一个醛基，为什么会考虑缩醛保护？',['它暂时移除原 C=O 的亲电特征，减少被亲核体攻击','它会增加两个碳','它把醛永久变成烯烃'],0,'对。保护基的本质是暂时改变反应性，主任务完成后再恢复。'));

// DAY 8 — acyl substitution: add, collapse, leave.
set(8,'d08-lesson-family',[
 S('先把所有名字抹掉，只保留共同骨架','酰氯、酸酐、酯、酰胺都能写成 R–C(=O)–Y。','R–C(=O)–Y','acyl-family'),
 S('真正变化的是 Y','Y 不同，会改变离去难度和对 C=O 的供电子程度。','Y=Cl / OCOR / OR / NR₂','acyl-core'),
 S('所以做题先圈“酰基碳”','这只 C 仍因 C=O 极化而缺电子，是 Nu 的入口。','Nu:→C(acyl)','acyl-sub'),
 S('再看 Y 能不能走','Day8 的核心不是四套反应，而是一套“加成→回落→Y离去”。','add → collapse → leave Y','acyl-collapse-flow')
],M('羧酸衍生物之间最值得统一看的共同结构是什么？',['R–C(=O)–Y','所有分子都有 C=C','所有 Y 都完全相同'],0,'对。把共同骨架看出来，四类反应会从“背表”变成一套电子故事。'));
set(8,'d08-lesson-ranking',[
 S('问题1：Y 离开后稳不稳','离去后越稳定、越弱碱，通常越容易离开。','good leaving group = stable after leaving','leaving-group'),
 S('Cl⁻ 比 NH₂⁻ 更愿意独立存在','所以酰氯容易发生取代，而直接把酰胺的 NH₂⁻ 推走非常困难。','Cl⁻ >> NH₂⁻ (leaving)','acyl-ranking'),
 S('问题2：Y 会不会把电子推回羰基','N 的孤对能和 C=O 强共振，降低羰基碳缺电子程度，因此酰胺格外稳定/不活泼。','amide resonance donation','resonance-effect'),
 S('两个因素合起来得到基础顺序','酰氯 > 酸酐 > 酯≈酸 > 酰胺。','acyl chloride > anhydride > ester > amide','acyl-ranking')
],M('为什么酰胺通常比酯更难被亲核体取代？',['N 对羰基共振供电子更强，而且 NH₂⁻ 是很差离去基','因为酰胺没有羰基','因为酰胺一定带正电'],0,'对。要同时看“入口有多缺电子”和“出口 Y 好不好走”。'));
set(8,'d08-lesson-substitution',[
 S('第一步完全复用 Day7','Nu 电子对去酰基碳，C=O π 上 O。',':Nu→C；π→O','acyl-sub'),
 S('得到四面体中间体','这一刻 C 同时连 O⁻、Nu 和 Y。','R–C(O⁻)(Nu)(Y)','tetrahedral'),
 S('第二步是 Day8 新动作：O⁻ 回落','O 的电子重新形成 C=O。','O⁻→C=O','acyl-collapse-flow'),
 S('为了不让 C 超价，C–Y 同时断','旧 C–Y 键电子给 Y，Y 离开。','C–Y→Y⁻','acyl-collapse-flow'),
 S('净结果就是 Y 被 Nu 换掉','所以叫亲核“酰基取代”，不是简单加成停住。','RCOY + Nu → RCONu + Y','acyl-sub')
],M('Day7 醛酮亲核加成和 Day8 酰基取代最关键的分叉是什么？',['Day8 四面体中间体能回落并推出 Y','Day7 没有 C=O','Day8 没有亲核体'],0,'对。是否有一个合适的 Y 可以被推出，决定“停在加成”还是“继续取代”。'));
set(8,'d08-lesson-ester',[
 S('先看 Fischer 酯化的净账','羧酸 + 醇 ⇄ 酯 + 水。','RCO₂H + R′OH ⇄ RCO₂R′ + H₂O','acyl-sub'),
 S('酸催化先让羰基更容易被进攻','质子化提高羰基碳亲电性，醇 O 再用孤对进攻。','protonate C=O → ROH attack','protonation'),
 S('经过质子转移后把 –OH 变成水离开','直接推出 OH⁻ 很差；先让它成为 H₂O 才更合理。','OH → OH₂⁺ → H₂O leaves','leaving-group'),
 S('酸水解就是相反方向的同一网络','水进攻，最终把 OR 换回 OH；因为可逆，常靠过量水等推动。','ester + H₂O ⇄ acid + alcohol','acyl-sub'),
 S('皂化为什么更偏单向','碱性水解最终给稳定羧酸盐 RCO₂⁻，它不会轻易重新变回酯。','ester + OH⁻ → RCO₂⁻ + ROH','saponification')
],M('Fischer 酯化里为什么酸催化有帮助？',['它能提高羰基亲电性，并把差离去的 OH 转成更易离开的水','酸提供额外碳','酸把酯直接还原'],0,'对。酸是在调整“入口”和“出口”的电子条件，不是神秘魔法粉。'));
set(8,'d08-lesson-reduction',[
 S('先问最终 C=O 还在不在','LiAlH₄ 对很多羧酸衍生物会把羰基一直推到醇/胺层级。','acyl derivative → reduced product','hydride'),
 S('对酯：先经历加成/离去，再继续还原','第一轮 H⁻ 可把酯推到醛等中间层，强还原条件继续把它推成一级醇。','RCOOR′ → RCH₂OH (+ R′OH)','hydride'),
 S('NaBH₄通常不够强','普通酯的酰基碳因 OR 共振供电子而没醛酮那么容易被温和 H⁻ 来源攻击。','ester: NaBH₄ often no reaction','acyl-ranking'),
 S('所以“还原剂强弱”要和底物活性一起读','不是看到 C=O 就所有还原剂等价。','substrate reactivity × reagent strength','condition-map')
],M('为什么 NaBH₄ 常能还原醛酮，却对普通酯较弱？',['酯羰基因 OR 共振供电子而反应性更低，需要更强氢化物来源','酯没有氧','NaBH₄ 只认识三个碳'],0,'对。试剂强弱与底物亲电性要一起比较。'));
set(8,'d08-lesson-hofmann',[
 S('先做碳数账：酰胺的羰基碳最后不在产物里','RCONH₂ → RNH₂，明显少 1 个 C。','C(n) → C(n−1)','hofmann'),
 S('反应先把 N 变成更适合重排的形式','Br₂/OH⁻ 先对酰胺 N 进行转化并去质子化。','amide → N-bromo intermediate','hofmann'),
 S('R 带着 C–R 键电子迁到 N','不是 R 先掉成自由 R⁺；迁移与相邻电子重排联动。','R–C(=O)–N → R–N=C=O','beckmann'),
 S('得到异氰酸酯后水解','水解形成不稳定氨基甲酸，再脱 CO₂，得到伯胺。','RNCO → RNH₂ + CO₂','decarboxylation'),
 S('真题最先抓“少一个碳”','复杂机理记不全时，碳数变化仍是最可靠路标。','amide → amine − 1C','retro-compare')
],M('Hofmann 降解里丢掉的是哪一个碳？',['原酰胺的羰基碳','R 基里的任意碳','N 原子变成碳'],0,'对。先做碳数账，才能在合成题里把这条路线认出来。'));

// DAY 9 — alpha-H/enolate/Aldol: make new C–C bond visible.
set(9,'d09-lesson-alpha',[
 S('先固定参照点：羰基碳','紧挨羰基的第一个碳叫 α-C；它上面的 H 才叫 α-H。','C=O–Cα–H','alpha-carbonyl'),
 S('为什么这只 H 比普通烷烃 H 更容易被拿走','拿走后，原 C–H 键电子留在 α-C，得到负电。','Cα–H → Cα:⁻','remove-alpha-h'),
 S('这个负电不是只能困在 C 上','电子可以形成 Cα=C，同时原 C=O π 上 O。','C⁻–C=O ↔ C=C–O⁻','enolate-resonance'),
 S('负电能离域，留下来的共轭碱更稳定','酸性强弱最终还是比较“失去 H 后谁更稳”。','stable conjugate base → more acidic H','conjugate-base')
],M('为什么羰基 α-H 比普通烷烃 H 更容易被碱拿走？',['去 H 后负电可通过羰基共振离域','因为 α-H 原本带正电','因为羰基会增加碳数'],0,'对。酸性不是 H 自己“想走”，而是看走后留下的电子状态稳不稳。'));
set(9,'d09-lesson-enolate',[
 S('两张图不是两个瓶子','C-负式和 O-负式只是同一个离域电子状态的两个极限共振式。','C⁻–C=O ↔ C=C–O⁻','enolate-resonance'),
 S('真实电子密度分散在 α-C/O 相关 π 系统','所以不能说负电每秒“跳来跳去”。','delocalized enolate','delocalization'),
 S('做 C–C 键时常用 C 端','α-C 的电子密度可以去攻击另一个电子缺碳。','Cα: → Cδ+','enolate-carbon'),
 S('做 O 端反应时又可能从 O 出发','同一 enolate 有多个可能反应位点，具体看试剂/条件。','ambident nucleophile','enolate')
],M('画两个 enolate 共振式意味着什么？',['同一个电子离域体系可以用两张极限式表示','溶液中有两瓶不同物质','负电一定只在 O 上'],0,'对。共振式是描述同一真实电子云的工具。'));
set(9,'d09-lesson-aldol',[
 S('先制造亲核碳','一分子醛/酮在 α 位去 H，形成 enolate。','carbonyl → enolate','enolate'),
 S('再找另一分子的羰基 Cδ+','它仍是 Day7 学过的电子入口。','enolate C → carbonyl C','aldol-target'),
 S('两只碳之间长出新 C–C 键','这是整道 Aldol 最值得圈出来的一根新键。','Cα–C(carbonyl) new bond','aldol-newbond'),
 S('原受攻羰基 π 电子上 O，再质子化','因此得到 β-羟基羰基化合物。','O⁻ → OH','aldol'),
 S('回头编号：OH 在 β 位','以仍保留的 C=O 为参照，OH 落在 β-C。','β-hydroxy carbonyl','alpha-beta')
],M('Aldol 新形成的 C–C 键连接哪两个位置？',['enolate 的 α-C 与另一羰基的羰基 C','两个 O 原子','两个 α-H'],0,'对。把这根新键画粗，Aldol 的骨架逻辑就不会散。'));
set(9,'d09-lesson-dehydration',[
 S('先从 β-羟基羰基开始','别跳到长名字，先找 OH 与 α-H 的相对位置。','β-OH + α-H','aldol'),
 S('失去 H 和 OH/H₂O 后形成 α=β 双键','净结果是 C=O 旁边多一个 C=C。','β-hydroxy → α,β-unsaturated','elimination-path'),
 S('为什么这一步常有推动力','新 C=C 与 C=O 相邻，可形成连续 p 轨道共轭，电子能离域。','C=C–C=O conjugation','conjugation'),
 S('所以 condensation = addition + dehydration','先 Aldol 加成，再脱水收口。','aldol → dehydration','aldol')
],M('Aldol 脱水后为什么常得到 α,β-不饱和羰基？',['α/β 两碳形成 C=C，并与 C=O 共轭','羰基被完全删除','碳数减少一个'],0,'对。把“OH/H 离开→新 π→共轭”连起来，比背产物名更稳。'));
set(9,'d09-lesson-crossed',[
 S('先列谁能形成 enolate','只要有 α-H，就可能成为亲核体来源。','has α-H?','alpha-h'),
 S('再列谁能当羰基亲电体','醛酮的 Cδ+ 都可能被攻击。','carbonyl Cδ+','carbonyl-target'),
 S('两边都能当双重角色时，组合会爆炸','A自缩、B自缩、A打B、B打A 都可能出现。','multiple combinations','condition-crossroads'),
 S('设计题常故意让一方没有 α-H','例如苯甲醛只能当亲电体，路线立即干净很多。','no α-H → electrophile only','benzene-numbering')
],M('为什么“一个羰基没有 α-H”常能让交叉 Aldol 更干净？',['它不能形成自己的 enolate，少掉一批竞争组合','它不能被亲核体攻击','它没有羰基'],0,'对。控制角色数量，就是控制产物数量。'));

// DAY 10 — same enolate, different electrophile.
set(10,'d10-lesson-map',[
 S('把 enolate 画在左边不动','今天亲核体底座还是 Day9 的 α-C 电子。','enolate C:⁻','enolate-carbon'),
 S('目标1：普通醛酮 C=O','攻击羰基碳 → Aldol。','enolate → aldehyde/ketone','aldol-target'),
 S('目标2：酯的酰基碳','攻击后可回落推出 OR⁻ → Claisen。','enolate → ester','claisen-target'),
 S('目标3：α,β-不饱和羰基 β-C','走 1,4-加成 → Michael。','enolate → β-C','michael-target'),
 S('先认“打谁”，名字自然出现','同一亲核体换目标，是今天最省记忆的总地图。','same Nu, different E','condition-map')
],M('区分 Aldol / Claisen / Michael 最省力的第一问是什么？',['enolate 这次攻击哪一类亲电位置','碳数是否为偶数','溶液颜色'],0,'对。先锁定攻击目标，再给反应贴名字。'));
set(10,'d10-lesson-claisen',[
 S('第一步：酯先形成 enolate','通常碱的 OR 与酯自身 OR 相同，减少额外酯交换。','ester α-H → enolate','enolate'),
 S('第二步：α-C 打另一酯羰基','形成新的 C–C 键和四面体中间体。','C:→C(=O)OR','claisen'),
 S('第三步：O⁻ 回落，OR⁻ 被推出','这里复用 Day8 的亲核酰基取代。','tetrahedral → C=O + OR⁻','acyl-collapse-flow'),
 S('产物是 β-二羰基','两个 C=O 中间隔一个碳，因此中央 H 后面会很酸。','O=C–C–C=O','beta-dicarbonyl')
],M('Claisen 为什么不是“加成以后停在醇盐”？',['酯上有 OR 可在四面体中间体回落时被推出','因为没有 C=O','因为 enolate 没有电子'],0,'对。它把 Day9 的 enolate 和 Day8 的酰基取代接成了一条线。'));
set(10,'d10-lesson-michael',[
 S('先画 α,β-不饱和羰基','C=C 与 C=O 连在一起，形成一个共轭电子系统。','Cβ=Cα–C=O','michael-target'),
 S('为什么 β-C 也会“缺电子”','羰基拉电子的影响可通过共轭传到 β 位；可以画出 β-C 带正性贡献的共振式。','β-C electrophilic','resonance'),
 S('稳定碳亲核体去 β-C','这叫 1,4-加成，因为从羰基 O/C 系统计数跨到 β 位。','Nu→Cβ','michael'),
 S('电子沿共轭链移动，最后恢复羰基','净结果 C=O 保留，β 位多出一根 C–C 键。','β-addition, C=O restored','michael-target')
],M('Michael 加成结束后，哪一个关键官能团通常被保留下来？',['羰基 C=O','原来的 C=C 一定完整保留','所有双键都消失且没有羰基'],0,'对。它不是直接在羰基碳做 1,2-加成，而是在 β 位做共轭 1,4-加成。'));
set(10,'d10-lesson-beta-dicarbonyl',[
 S('先看中央 CH₂ 被两个羰基夹着','它的 H 不是普通烷烃 H。','O=C–CH₂–C=O','beta-dicarbonyl'),
 S('拿掉 H 后负电可向左离域','形成左侧 enolate 共振。','left enolate','enolate-resonance'),
 S('也可以向右离域','同一负电又能被右羰基分担。','right enolate','resonance'),
 S('两个羰基一起“接住”负电','所以共轭碱显著稳定，中央 H 酸性增强。','more resonance → more stable base','conjugate-base')
],M('β-二羰基中央 H 为什么特别容易被较温和碱拿走？',['去 H 后负电可被两侧羰基共同共振稳定','中央碳没有电子','两个羰基都会变成水'],0,'对。还是同一条酸碱底层逻辑：看共轭碱稳定性。'));
set(10,'d10-lesson-acetoacetic',[
 S('1 去 H：先制造中央 enolate','乙酰乙酸乙酯中央 CH₂ 是电子把手。','CH₃COCH₂CO₂Et → enolate','enolate'),
 S('2 烷基化：和一级 R–X 成新 C–C','电子对从中央碳去 R–X 中心碳，X 离开。','enolate + R–X → alkylated','sn2-electron-flow'),
 S('3 水解：把酯变成酸','得到 β-酮酸。','ester → CO₂H','acyl-sub'),
 S('4 加热脱羧','β-酮酸容易放出 CO₂，最后得到取代甲基酮。','β-keto acid → ketone + CO₂','decarboxylation'),
 S('整条路线的意义：把 R 接到甲基酮 α 位','不要只背四瓶试剂，要看新增 C–C 键和最后骨架。','R–CH₂–CO–CH₃','retro-forward')
],M('乙酰乙酸乙酯合成中真正“长碳链”的是哪一步？',['enolate 与 R–X 形成新 C–C 键','水解','脱羧'],0,'对。水解/脱羧是在整理官能团，真正接入 R 的是烷基化。'));
set(10,'d10-lesson-malonic',[
 S('前两步与乙酰乙酸路线几乎同构','中央 CH₂ 去 H，再对一级 R–X 做 C–C 成键。','(EtO₂C)CH₂(CO₂Et) → alkylated','enolate'),
 S('水解把两个酯都变酸','得到取代丙二酸。','diester → diacid','acyl-sub'),
 S('加热脱一个 CO₂','剩下一只羧酸。','dicarboxylic acid → acid + CO₂','decarboxylation'),
 S('最后骨架是取代乙酸型','RCH₂CO₂H。','RCH₂CO₂H','acid-cut')
],M('丙二酸酯法和乙酰乙酸酯法最值得区分的最终产物类型是什么？',['前者常给取代羧酸，后者常给取代甲基酮','两者都只给烯烃','两者都减少两个碳'],0,'对。共同中间逻辑很像，最后保留下来的官能团不同。'));
set(10,'d10-lesson-dieckmann',[
 S('把 Claisen 两个分子想成用一根链拴在一起','分子内部一端形成 enolate，另一端是酯羰基。','diester in one molecule','claisen'),
 S('enolate 向同一分子另一端折回来','只要链长合适，就能形成新 C–C 环键。','intramolecular attack','retro-cut-connect'),
 S('四面体回落推出 OR⁻','仍然是 Day8 的酰基取代收尾。','collapse → OR⁻ leaves','acyl-collapse-flow'),
 S('得到环状 β-酮酯','所以 Dieckmann = 分子内 Claisen。','cyclic β-keto ester','claisen-target')
],M('Dieckmann 与普通 Claisen 的最大结构差别是什么？',['Dieckmann 的亲核端和酯端在同一个分子里，能闭环','Dieckmann 没有 enolate','Dieckmann 不形成 C–C 键'],0,'对。先记“分子内 → 闭环”，名字就不会孤立。'));

// DAY 11 — aromaticity/EAS as preserve-break-restore.
set(11,'d11-lesson-aromaticity',[
 S('条件1：必须是一圈','电子需要能绕环连续走，开链不算。','cyclic','aromaticity'),
 S('条件2：每个环原子都要有可接力的 p 轨道','中间若有 sp³ 原子打断 p 重叠，电子大圈就断。','continuous p orbitals','benzene-p'),
 S('条件3：大体平面','p 轨道要保持相近方向才能侧向重叠。','planar','p-orbital'),
 S('条件4：π电子数满足 4n+2','2、6、10… 电子会得到特殊闭壳层稳定。','4n+2 π electrons','huckel'),
 S('四项同时满足才叫芳香','不能只因为“长得像六边形”就贴标签。','ring + planar + conjugated + 4n+2','aromaticity')
],M('一个六元环即使有 6 个碳，为什么也不一定芳香？',['还必须连续有 p 轨道、近似平面并满足 4n+2 π电子','六元环自动芳香','只看名字含“苯”'],0,'对。芳香性是一组电子结构条件，不是环的外形。'));
set(11,'d11-lesson-why-substitution',[
 S('芳环先把 π 电子送给 E⁺','形成新的 C–E σ 键，但此时某个碳变 sp³，连续 π 环暂时被打断。','Ar–H + E⁺ → σ-complex','eas-electron-flow'),
 S('这个中间体为什么不想久留','原本整圈芳香离域稳定暂时丢失，能量升高。','temporary loss of aromaticity','sigma-complex'),
 S('从相邻位置丢 H⁺','C–H 键电子重新补回 π 系统。','C–H → π; H⁺ leaves','eas-restore'),
 S('芳香性被恢复','净结果是 H 被 E 替换，而不是永久加成破坏大圈。','Ar–H → Ar–E','eas')
],M('EAS 为什么最终要丢 H⁺？',['让 C–H 键电子重新形成 π 系统并恢复芳香性','为了增加碳数','因为 E⁺ 必须离开'],0,'对。取代的“恢复芳香性”是整个过程强大的收尾动力。'));
set(11,'d11-lesson-electrophiles',[
 S('先固定母动作：芳环需要一个够强的 E⁺','不同反应只是用不同方法制造/激活 E。','Ar π → E⁺','electrophile'),
 S('硝化：制造 NO₂⁺','HNO₃/H₂SO₄ 体系生成硝鎓离子 NO₂⁺。','NO₂⁺','eas'),
 S('卤代：Lewis 酸把 X₂ 拉得更偏','FeBr₃/FeCl₃ 接受电子密度，使 Br₂/Cl₂ 更像强亲电试剂。','Br₂ + FeBr₃ → activated Br','friedel'),
 S('Friedel–Crafts：制造碳亲电体','烷基化常涉及碳正离子样物种；酰基化常用酰鎓离子 RCO⁺。','R⁺ / RCO⁺','friedel'),
 S('一旦 E⁺准备好，环上的电子动作仍是同一套','进攻→σ络合物→去H⁺→恢复芳香。','same EAS skeleton','eas-electron-flow')
],M('硝化、卤代、Friedel–Crafts 看起来试剂不同，为什么能统一学习？',['它们都先提供/制造强亲电体，然后走同一套 EAS 骨架','它们产物完全相同','都没有芳香中间体'],0,'对。名字不同，电子母动作相同。'));
set(11,'d11-lesson-directing',[
 S('先假设第二个 E 可去邻、间、对','每个位置都会形成一组不同的 σ 络合物共振式。','o / m / p attack','ortho-meta-para'),
 S('给电子基能在哪些中间体里直接帮忙','若某些 o/p σ络合物能让正电靠近可供电子取代基，它们会得到额外稳定。','donor stabilizes o/p','omp'),
 S('强吸电子基则可能让某些正电分布特别糟','meta 进攻常避开最不利的共振式。','EWG often meta','activation'),
 S('所以“定位”本质是比较中间体稳定','不是取代基拿着箭头真的指路。','stabilize transition/intermediate','sigma-complex')
],M('为什么判断定位最好比较 σ-络合物共振式，而不是只背“邻对/间”？',['因为取代基通过稳定或去稳定这些中间体决定哪条路径能垒更低','因为苯环没有电子','因为所有取代基方向相同'],0,'对。口诀是结果，电子稳定性才是原因。'));
set(11,'d11-lesson-halogen',[
 S('卤素先通过 σ 键强吸电子','−I 效应让整个芳环电子密度下降，所以反应总体变慢。','Ar–X: deactivated','inductive'),
 S('但卤素又有孤对电子','孤对可以和芳环 p 系统重叠，向环提供共振电子。','X lone pair ↔ ring','resonance-effect'),
 S('这种共振帮助主要出现在邻/对位 σ络合物','所以方向仍偏 o/p。','o/p stabilized relative','omp'),
 S('于是出现“钝化但邻/对位”的经典组合','速率和定位由两个不同效应主导，并不矛盾。','deactivate + o/p direct','activation')
],M('卤素“钝化但邻/对位定位”为什么不矛盾？',['诱导效应主要压低整体反应性，孤对共振又相对稳定邻/对位中间体','因为钝化等于间位','因为卤素没有孤对'],0,'对。一个判断整体速度，一个判断不同位置的相对路径。'));
set(11,'d11-lesson-fc',[
 S('烷基化先制造 R⁺样亲电体','AlCl₃ 等帮助 C–X 键强烈极化/断裂。','R–X + AlCl₃ → R⁺-like','friedel'),
 S('有自由/类碳正离子特征就警惕重排','更稳定的碳正离子若能通过氢/烷基迁移得到，产物骨架可能变化。','R⁺ → rearranged R⁺','rearrangement'),
 S('烷基装上后会活化芳环','所以第二次取代可能比第一次更快，出现多烷基化。','alkyl activates ring','activation'),
 S('酰基化用 RCO⁺ 更可控','酰鎓离子有共振稳定，不容易普通碳正离子式重排；酰基又会钝化环，常减少多取代。','RCO⁺','friedel'),
 S('真正做题要先检查禁区','强钝化环、会强配位 AlCl₃ 的基团等可能让 FC 失败。','substrate check','compatibility')
],M('为什么 Friedel–Crafts 酰基化通常比烷基化更不容易发生碳骨架重排？',['酰鎓离子由共振稳定，不像普通碳正离子那样容易通过迁移变得更稳','酰基化没有亲电体','AlCl₃ 不参与'],0,'对。先比较中间亲电体的结构，再记经验结论。'));

// DAY 12 — N lone pair → diazonium hub → carbon-count tool.
set(12,'d12-lesson-basicity',[
 S('先把“碱性”翻译成一个动作','胺氮的孤对电子能否方便地拿 H⁺，决定其碱性。',':N + H⁺ → N–H⁺','amine-protonate'),
 S('脂肪胺孤对较局部','没有被芳香 π 系统分散，通常更可用。','R₃N:','amine-lonepair'),
 S('苯胺孤对能和苯环共振','电子对部分参与芳香环离域，拿去接 H⁺ 会损失这部分离域收益，因此碱性降低。','Ph–NH₂ ↔ resonance','resonance'),
 S('吸电子基再把电子拉走，会更弱碱','所以排序仍然回到“孤对可用性”。','EWG → lower basicity','inductive')
],M('苯胺为什么通常比脂肪胺弱碱？',['N 孤对可与芳环共振离域，较不愿拿去接 H⁺','苯胺没有孤对','脂肪胺一定带正电'],0,'对。碱性不是背 pKa 表，而是看那对电子有多可用。'));
set(12,'d12-lesson-nitro-amino',[
 S('NO₂ 和 NH₂ 是一对可互换的合成状态','硝化容易把 NO₂ 装上芳环，随后可还原成 NH₂。','Ar–NO₂ → Ar–NH₂','amine'),
 S('还原本质是把 N 的高氧化状态降下来','Fe/HCl、Sn/HCl、H₂/Pd 等最终移走 O、补 H。','NO₂ → NH₂','reduction'),
 S('为什么有时要保护 NH₂','NH₂ 很活化，也会和 AlCl₃ 等 Lewis 酸强相互作用，可能让后续 EAS 失控/失败。','NH₂ → NHCOCH₃','protection'),
 S('酰化后孤对被羰基分担','反应性被“调低”，做完需要的芳环反应再水解恢复 NH₂。','protect → react → deprotect','resonance-effect')
],M('芳香合成里把 NH₂ 暂时酰化保护的主要目的是什么？',['降低过强反应性/避免与后续试剂强配位，再在需要时恢复','增加一个永久碳骨架','把苯环变成非芳香'],0,'对。保护是在控制“什么时候让哪一个位点反应”。'));
set(12,'d12-lesson-diazo',[
 S('第一步先把芳香伯胺认出来','必须先有 Ar–NH₂ 这个入口。','Ar–NH₂','amine'),
 S('NaNO₂ + HCl 在低温产生亚硝化活性物种','低温 0–5°C 是为了让生成的芳基重氮盐更可控。','NaNO₂/HCl, 0–5°C','diazonium'),
 S('NH₂ 最终被转换成 –N₂⁺','这一步叫重氮化。','Ar–NH₂ → Ar–N₂⁺','diazonium'),
 S('为什么 –N₂⁺ 是好中转站','后续一旦 N₂ 以气体离开，非常稳定，这给多种新基团接入留下出口。','Ar–N₂⁺ → Ar⁺-like + N₂↑','n2-leave'),
 S('所以把它看成“万能转接头”','先统一做重氮盐，再按目标选 Cl/Br/CN/OH/偶联等出口。','NH₂ → N₂⁺ → target','diazonium-substitute')
],M('芳基重氮盐为什么特别适合做“中转基团”？',['N₂ 离去后形成非常稳定的氮气，给多种取代路线提供共同出口','N₂ 永远不离开','它会自动增加两个碳'],0,'对。一个稳定离去产物让很多替换路线变得可行。'));
set(12,'d12-lesson-sandmeyer',[
 S('先从同一个 Ar–N₂⁺ 出发','不要把 Sandmeyer 当完全新反应。','Ar–N₂⁺','diazonium'),
 S('Cu(I) 盐决定要接哪类基团','CuCl→Cl，CuBr→Br，CuCN→CN。','CuCl / CuBr / CuCN','sandmeyer'),
 S('核心事件仍是 N₂ 离开','N₂↑离去，同时目标基团占据原芳环位置。','Ar–N₂⁺ → Ar–X + N₂','diazonium-exit-flow'),
 S('基础题先会路线选择，不必背完整铜循环','真题常考“如何从 NH₂ 转成 Cl/Br/CN”。','NH₂→N₂⁺→X','sandmeyer')
],M('想把 ArNH₂ 转成 ArCN，最典型的两段路线是什么？',['先重氮化，再用 CuCN','直接用 NaBH₄','先 HBr/ROOR'],0,'对。先把 NH₂ 变成通用出口 N₂⁺，再选 CN 路线。'));
set(12,'d12-lesson-coupling',[
 S('这次 N₂⁺ 不离开','芳基重氮离子本身作为亲电体，保留 –N=N– 桥。','Ar–N₂⁺ + activated Ar′','azo'),
 S('为什么需要强活化芳环','第二个芳环必须电子足，才能把 π 电子送去重氮端形成 C–N 键。','electron-rich ring → diazonium','eas-electron-flow'),
 S('酚盐/芳胺常能把环变得更电子富','因此常作为偶联伙伴。','ArO⁻ / ArNH₂','activation'),
 S('最终得到共轭偶氮体系','Ar–N=N–Ar′ 常具有强颜色，这是延长共轭的结果。','Ar–N=N–Ar′','azo')
],M('重氮偶联与 Sandmeyer 最大区别是什么？',['偶联保留 –N=N– 并连接另一芳环，Sandmeyer 让 N₂ 离去','偶联一定生成 CN','两者都必须把 N₂ 完整保留'],0,'对。先看 N₂ 是“留下当桥”还是“离开当气体”。'));
set(12,'d12-lesson-nitrile',[
 S('先把 –C≡N 的碳圈出来','CN 不是“一个 N 标签”，其中 C 是真实碳原子。','R–C≡N','nitrile'),
 S('CN⁻ 取代时，这只碳会加入骨架','R–X + ⁻C≡N → R–C≡N，因此通常 +1C。','+1 carbon','new-bond'),
 S('水解把腈碳变成羧酸碳','原 CN 的 C 留在 CO₂H 中。','R–CN → R–CO₂H','acid-cut'),
 S('还原则把 C≡N 推到 –CH₂NH₂','碳数仍保留。','R–CN → R–CH₂NH₂','amine'),
 S('所以腈是合成里的“藏一碳工具”','每次看到 CN 先做碳数账。','CN = carbon-count handle','retro-compare')
],M('R–Br → R–CN → R–CO₂H 为什么常说是“增一碳”？',['CN⁻ 自己带一个碳，这个碳最后成为羧酸羰基碳','Br 变成一个碳','水解会凭空生成碳'],0,'对。碳数账是这条路线最醒目的真题信号。'));

Data.TEACHING_CLOSURE_VERSION='v10-mainline-deep-day12';
})();

(function(){
'use strict';
const Data=window.Organic637Data;if(!Data?.days)return;
const L=(d,id)=>Data.days[d]?.lessons?.find(x=>x.id===id);
const set=(d,id,sequence,micro,why)=>{const r=L(d,id);if(!r)return;if(sequence)r.sequence=sequence;if(micro)r.microCheck=micro;if(why)r.whyChain=why;};
const S=(title,text,formula,diagram)=>({title,text,formula,diagram});
const M=(prompt,options,answer,feedback)=>({prompt,options,answer,feedback});

// DAY 13 — structure inference I: evidence cannot say more than it knows.
set(13,'d13-lesson-detective',[
 S('先把未知物当成“嫌疑人名单”','你不是要一眼猜中，而是先保留多个能满足分子式的结构。','formula → candidates','dbe-options'),
 S('每条证据只负责一个小范围','DBE 管总环/π预算；IR 管某些官能团；化学检验管特定反应性。','evidence → constraint','ir-functional'),
 S('不符合一条硬证据就淘汰','结构推断不是“像不像”，而是“能不能同时解释所有证据”。','candidate + all evidence','retro-compare'),
 S('证据不够就诚实保留多个','今天不强行唯一；明天会加入新的谱图证据进一步区分环境。','multiple candidates allowed','symmetry')
],M('结构推断第一原则最接近哪一句？',['不是猜最像的，而是逐条排除与硬证据冲突的候选','先选一个喜欢的结构再解释','一条 IR 峰就能决定全部结构'],0,'对。证据的力量来自“限制候选”，不是来自看起来神秘。'));
set(13,'d13-lesson-dbe',[
 S('先建立完全饱和参考','开链饱和烷烃 CₙH₂ₙ₊₂ 是“氢最多”的基准。','CₙH₂ₙ₊₂','saturated'),
 S('少 2H = 多 1份不饱和','可能是一根双键，也可能是一个环。','−H₂ → +1 DBE','minus-h2'),
 S('少 4H = 多 2份','一个三键本身含两层 π，因此算 2 DBE；两个双键也算 2。','C≡C = 2 DBE','dbe-options'),
 S('公式只是自动做这本账','DBE=(2C+2+N−H−X)/2；O/S 不改变氢饱和基准，所以不入式。','DBE=(2C+2+N−H−X)/2','dbe'),
 S('DBE只告诉“预算”，不告诉位置','DBE=2 不能直接宣布“一个三键”，还可能是双键+环等。','DBE ≠ structure','dbe-options')
],M('C₄H₈ 相比饱和开链 C₄H₁₀ 少 2 个 H，DBE 是多少？',['1','2','4'],0,'对。少一对 H 就是一份不饱和预算：可能一环或一双键。'));
set(13,'d13-lesson-ir',[
 S('把化学键想成弹簧','原子不停振动；红外光频率合适时，会给某种振动“补能量”，出现吸收。','bond vibration','bond-vibration'),
 S('不同键的“弹簧常数/质量”不同','因此 O–H、C=O、C≡N 等出现在不同波数区域。','bond type → wavenumber','wavenumber'),
 S('先抓最硬、最显眼的几类','宽 O–H、强 C=O、尖端炔 ≡C–H、C≡N 等最值得先看。','IR key regions','ir-peak'),
 S('有峰能支持，没峰也能排除','例如候选必须有羰基，但 1700 cm⁻¹ 附近完全无强吸收，就应高度怀疑它。','peak present / absent','ir-functional'),
 S('不要把每个小峰都解释','考试结构题先用“官能团级别证据”，避免在指纹区迷路。','functional-group first','ir')
],M('IR 在结构推断里最适合先回答哪类问题？',['有没有某类官能团/键的强证据','所有原子的精确连接顺序','每个氢有几个邻居'],0,'对。IR 更像官能团安检门，不是完整结构地图。'));
set(13,'d13-lesson-tests',[
 S('化学检验 = 让未知物“做动作”','不是看静态光谱，而是给试剂，看它是否发生特征反应。','unknown + reagent → visible result','condition-step'),
 S('Tollens 银镜主要抓醛','醛容易被温和氧化成酸/羧酸盐，同时 Ag⁺ 被还原成银。','RCHO → RCO₂⁻ ; Ag⁺→Ag','aldehyde'),
 S('NaHCO₃ 放 CO₂ 常抓羧酸','羧酸把 H⁺ 给 HCO₃⁻，生成 H₂CO₃ 后分解成 CO₂ + H₂O。','RCO₂H + HCO₃⁻ → CO₂↑','acid-route'),
 S('端炔银盐抓的是 ≡C–H','只有端炔能先失去这只 H 并形成难溶金属炔化物。','RC≡CH + Ag⁺ → precipitate','silver-test'),
 S('每个检验都有边界','看到阳性先问“它真正证明的是哪一条结构特征”，不要扩张成整个结构。','test → limited claim','ir-functional')
],M('NaHCO₃ 产生气泡时，最直接支持哪类官能团？',['能提供足够酸性 H⁺ 的羧酸','所有醇','所有酮'],0,'对。气泡来自酸碱后形成的 CO₂，不是“有氧就冒泡”。'));
set(13,'d13-lesson-candidate',[
 S('第一步先列 2–4 个候选','分子式/DBE允许的结构不要只留脑中一个。','A / B / C candidates','dbe-options'),
 S('第二步做证据表','每行一条证据，每列一个候选，标 ✓ / ✗ / ?。','evidence matrix','ir-functional'),
 S('第三步优先用“能一刀淘汰”的硬证据','例如必须有 C=O、必须端炔阳性、必须羧酸放 CO₂。','hard evidence first','silver-test'),
 S('第四步检查剩余候选是否全过关','不能只解释喜欢的那几条；有一条硬证据失败就不能当最终答案。','all constraints pass','retro-forward')
],M('三个候选里，候选B能解释分子式和DBE，但无法解释“银镜阳性”，应该怎么处理？',['淘汰 B','仍然保留因为DBE对了','直接把B定为答案'],0,'对。硬证据发生冲突时，候选必须出局。'));

// DAY 14 — NMR: address, population, neighbours, symmetry, then cross-check.
set(14,'d14-lesson-nmr-map',[
 S('先只问“有几种不同的 H 环境”','化学上等价的 H 会在相同位置给一组信号。','different H environments → signals','nmr-address'),
 S('横坐标 δ = 地址','不同电子环境让氢核受到的有效磁场不同，于是信号位置不同。','chemical shift δ (ppm)','chemical-shift'),
 S('积分 = 人数','一整组峰下面的面积与这组等价 H 的数量成比例。','area ratio → H ratio','nmr-integration'),
 S('裂分 = 邻居互动','简单情况下相邻等效氢通过自旋耦合把一组峰分成 n+1 条。','n neighbours → n+1','nmr-neighbor-map'),
 S('对称性 = 把本来多处位置合成同一环境','所以先找对称，能大幅减少信号数。','symmetry → fewer signals','nmr-symmetry')
],M('¹H NMR 一组信号的“积分”最直接告诉什么？',['这组环境里相对有多少个氢','这组氢有几个邻居','分子有几个碳'],0,'对。地址、人数、邻居是三条不同信息，不能混在一起。'));
set(14,'d14-lesson-shift',[
 S('先理解“屏蔽”','周围电子在外磁场中产生局部响应，能部分抵消氢核感受到的外磁场。','more electron → more shielded','chemical-shift'),
 S('吸电子原子会让邻近 H 去屏蔽','O、卤素、羰基等拉走电子密度，H 更直接感受外磁场。','electron withdrawing → downfield','nmr-address'),
 S('去屏蔽通常移动到更大 ppm','在常见谱图上常说“向低场”。','larger δ = downfield','chemical-shift'),
 S('π 系统还有各向异性效应','芳香环、醛等位置会因 π 电子产生额外局部磁场，因此不能只按电负性一条规则判断。','π anisotropy matters','nmr'),
 S('考试先用区间，不追求小数点背诵','比如醛氢约 9–10 ppm、芳香氢约 6.5–8 等，是结构定位线索。','range > exact decimal','nmr-address')
],M('一个 CH₂ 紧邻 O，为什么它的 H 往往比普通烷基 CH₂ 出现在更大 ppm？',['O 拉走附近电子，使这些 H 更去屏蔽','O 增加了氢的数量','因为积分会自动变大'],0,'对。位置变化来自电子环境，不是峰高。'));
set(14,'d14-lesson-integration',[
 S('积分看“整组面积”，不是最高峰有多高','裂成四条的小峰仍属于同一组氢，要把整组面积加起来。','integral = area','integration'),
 S('积分先看比例','6:2:3 可以整体约成相对氢数，不一定仪器直接写整数。','relative ratio','nmr-integration'),
 S('再和分子式总 H 数对账','若分子式 C₄H₈O₂，所有积分换算后的 H 总数应能解释这 8 个 H。','ΣH(integrals)=molecular H','nmr'),
 S('等价氢共享一组积分','对称的两个 CH₃ 可能合在一起显示 6H。','symmetry → 6H signal','nmr-symmetry')
],M('一个信号裂成 quartet，它的积分仍然代表什么？',['整个 quartet 这一组等价氢的总相对数量','四条线各自是四种不同氢','邻居一定有四个'],0,'对。裂分形状和积分人数是两件独立的事。'));
set(14,'d14-lesson-splitting',[
 S('先从一组 H 看隔壁碳','简单一级近似里，隔壁有 n 个彼此等价邻 H。','H–C–C–Hₙ','nmr-neighbor-map'),
 S('邻氢自旋有不同组合','这些微小磁环境使本信号分裂成若干近邻线。','coupling','splitting'),
 S('常见简单规则是 n+1','邻 2H → triplet；邻 3H → quartet。','n → n+1 lines','nmr-splitting'),
 S('乙基因此常是一对“q + t”','CH₂ 邻 CH₃：q；CH₃ 邻 CH₂：t。','–CH₂–CH₃ → q+t','nmr-neighbor-map'),
 S('先注明规则边界','OH 快速交换、复杂不等价邻氢、多重耦合时不能机械套最简单 n+1。','simple neighbours only','splitting')
],M('CH₃–CH₂– 中 CH₃ 常见 triplet，最直接原因是什么？',['隔壁 CH₂ 有 2 个近似等价邻氢，2+1=3','CH₃ 自己有3个氢','总碳数是3'],0,'对。裂分在问“隔壁”，积分才在问“自己有几个”。'));
set(14,'d14-lesson-symmetry',[
 S('把分子想象放在一面“对称镜”前','若某个操作能把两个位置互换而分子仍完全相同，它们可能处在等价环境。','symmetry operation','symmetry'),
 S('丙酮两个 CH₃ 可互换','因此六个 H 属于同一种环境，给一个 6H singlet。','(CH₃)₂CO → 6H s','nmr-symmetry'),
 S('对称性会压缩信号数量','不是 H 消失，而是仪器无法区分它们的环境。','equivalent H → one signal','nmr'),
 S('结构候选常可用“信号数”一刀排除','若候选理论上有 5 种 H 环境，而实测只有 2 组，就要重新检查对称性/候选。','predicted signals vs observed','nmr-address')
],M('为什么丙酮 6 个甲基 H 只给一组主要信号？',['两个 CH₃ 因对称而等价','因为只有一个碳','因为 C=O 会删除信号'],0,'对。NMR 看到的是不同电子环境的种类，不是原子在纸上的位置数量。'));
set(14,'d14-lesson-combine',[
 S('第一层：分子式/DBE锁大框','总碳氢和不饱和预算先不能错。','formula + DBE','dbe'),
 S('第二层：IR/化学检验锁官能团','先排掉“不可能有/没有某官能团”的候选。','IR/tests','ir-functional'),
 S('第三层：NMR 分配碎片','信号数、δ、积分、裂分、对称性组合成 CH₃/CH₂/芳香等片段。','NMR fragments','nmr'),
 S('第四层：把碎片拼回完整候选','拼好后必须回头让每一条旧证据都通过。','fragments → candidate','retro-cut-connect'),
 S('最后做“反证”','问：有没有另一个结构也能解释全部证据？若有，证据还不够。','try to falsify answer','retro-forward')
],M('结构推断最后为什么要“反过来找有没有第二个候选也能全解释”？',['避免只找到一个可行解就过早锁定，确保唯一性来自证据而不是偏好','因为答案越多越好','为了忽略IR'],0,'对。真正可靠的结构必须同时解释全部证据，并尽量排除竞争候选。'));

// DAY 15 — stereo: from 2D marks to spatial algorithm.
set(15,'d15-lesson-chirality',[
 S('先分清“连接”与“朝向”','两个分子原子连接完全相同，仍可能因为三维排列不同而不是同一个物体。','same connectivity, different 3D','mirror-molecule'),
 S('左右手给最直观类比','左手和右手互为镜像，但怎么旋转都不能完全重合。','mirror ≠ superimposable','mirror-hands'),
 S('常见手性中心：sp³ 碳连四个不同基团','四个方向都不同，镜像常产生另一种不可重合版本。','C*(A)(B)(C)(D)','stereocenter'),
 S('但“有四个不同基团”只是常见判据','整体分子还可能因内部对称而不手性，后面会见 meso。','local center vs whole molecule','meso')
],M('手性最核心的判据是哪一句？',['分子与其镜像不能通过普通旋转完全重合','只要有碳就手性','只要画了楔线就手性'],0,'对。手性是整体空间可重合性问题。'));
set(15,'d15-lesson-cip',[
 S('只比较手性中心直接连的四个原子','先看原子序数，越大优先级越高。','higher Z → higher priority','cip-priority'),
 S('第一层相同才往外看','把下一层各原子按原子序数从大到小排列，逐项找第一个差异。','compare outward shell','cip'),
 S('同位素比较质量数','质量数大者优先。','²H > ¹H','cip'),
 S('多键用“重复连接”规则展开','C=O 可按 C 连两个 O 的比较方式处理，确保算法统一。','double bond → duplicated atoms','cip'),
 S('优先级只是编号，不等于“更稳定”','它是空间命名规则，不是反应活性排序。','priority ≠ reactivity','cip-priority')
],M('CIP 第一层就不同的时候，应该怎么做？',['直接按直接相连原子的原子序数定优先级，不必继续往外比','仍然比较整条链长度','看哪个基团画得更大'],0,'对。算法的价值就是每一步都知道什么时候停止。'));
set(15,'d15-lesson-rs',[
 S('步骤1：先排 1>2>3>4','没有优先级就不谈 R/S。','1 > 2 > 3 > 4','cip'),
 S('步骤2：把最低优先级 4 放到背后','这是为了统一观察方向。','4 away from viewer','cip-back'),
 S('步骤3：沿 1→2→3 看旋转方向','顺时针 R，逆时针 S。','clockwise R / counterclockwise S','rs-turn'),
 S('若 4 朝向你，结果要反转','因为观察方向与标准方向正好相反。','4 toward → invert result','rs'),
 S('最后再提醒 SN2','SN2 是几何翻面；最终 R/S 标签还要重新按新基团 CIP 排序，不能机械说 R必变S。','inversion ≠ always R→S','inversion')
],M('为什么 SN2 发生空间翻面后，R/S 标签不一定机械由 R 变 S？',['产物基团改变后 CIP 优先级可能重新排序','因为 SN2 没有空间变化','R/S 与基团身份完全无关'],0,'对。几何翻面是物理动作，R/S 是重新计算后的命名结果。'));
set(15,'d15-lesson-fischer',[
 S('Fischer 是固定透视图，不是普通十字','交叉点代表手性碳。','Fischer cross','fischer'),
 S('横线两键朝你','左右两个基团伸出纸面。','horizontal = toward','fischer'),
 S('竖线两键背你','上下两个基团指向纸后。','vertical = away','fischer'),
 S('做 R/S 时仍先 CIP','如果最低优先级 4 在竖线，直接读；若在横线，最后反转。','4 horizontal → invert','rs'),
 S('允许的整体操作要谨慎','旋转180°可保持同一 Fischer；旋转90°通常改变构型表示。','180° okay; 90° not','fischer')
],M('Fischer 投影中横线代表什么？',['基团朝向观察者','基团背向观察者','没有空间含义'],0,'对。只要记住“横出竖入”，二维图就能恢复三维方向。'));
set(15,'d15-lesson-relations',[
 S('先给每个手性中心编号','不要整分子凭感觉比较。','C2, C3...','stereocenter'),
 S('所有中心都反且互为镜像','常是对映体。','all inverted → enantiomers','enantiomer'),
 S('只有部分中心反','连接相同但不是镜像关系，属于非对映体。','some inverted → diastereomers','diastereomer'),
 S('再检查内部对称','即使有多个手性中心，整体存在内对称面时可能是 meso，整体不手性。','internal plane → meso possible','meso')
],M('两个双手性中心分子只有一个中心构型相反，最常见关系是什么？',['非对映体','对映体','完全相同一定'],0,'对。对映体要求整体镜像且所有相关手性中心同时反。'));
set(15,'d15-lesson-ez',[
 S('先在双键左端比较两个基团','按 CIP 选左端高优先级。','left high','ez'),
 S('再在双键右端比较两个基团','同样选右端高优先级。','right high','ez'),
 S('两个高优先基团在同侧 = Z','Z 可记 zusammen（一起）。','same side → Z','ez'),
 S('在异侧 = E','E 可记 entgegen（相对）。','opposite side → E','ez'),
 S('不是所有双键都有 E/Z','若某一双键碳连两个相同基团，就无法定义 E/Z。','need two different groups on each C','ez')
],M('判断 E/Z 时真正比较的是哪两个基团？',['双键两端各自按 CIP 选出的高优先基团','两个最大的碳链随便比','两个 H 一定优先'],0,'对。先分别排序，再看高优先组的相对侧。'));
set(15,'d15-lesson-conformation',[
 S('构象先从“单键能转”开始','不需要断键，只是绕 σ 键旋转，分子就能换姿势。','rotation about C–C σ','conformation'),
 S('Newman 是沿一根 C–C 轴看过去','前碳画点/小圆，后碳画大圆，六个键变成钟表方向。','look down C–C','newman'),
 S('重叠式更挤，交叉式更稳','键电子云重叠/取代基接近导致能量升高。','eclipsed > staggered energy','newman-staggered'),
 S('交叉式里再比较 anti / gauche','最大基团相隔180° anti通常更稳；60° gauche较挤。','anti 180° ; gauche 60°','newman-anti-gauche'),
 S('环己烷椅式再用轴向/赤道向','大基团通常偏爱赤道向，减少1,3-轴向拥挤。','equatorial bulky group favored','chair-ax-eq')
],M('构象互变为什么通常不需要断共价键？',['它主要来自单键旋转/环翻转等空间姿势变化','因为所有键都会消失再重建','因为构象没有原子'],0,'对。它和“构型互变需要真正改变连接/立体身份”是不同层次。'));

// DAY 16 — ranking and mechanism grammar as a decision engine.
set(16,'d16-lesson-eight-judges',[
 S('先问题目到底在排什么','酸性、碱性、稳定性、反应速度、沸点用的主裁判不一定相同。','property?','condition-map'),
 S('第一组：电子能否离域/被拉走','共振、诱导、杂化、芳香性主要改变电荷/电子状态稳定。','resonance / induction / hybridization / aromaticity','resonance-effect'),
 S('第二组：空间和路径','位阻、中间体稳定、离去基、溶剂会改变反应能垒。','steric / intermediate / leaving / solvent','energy-barrier'),
 S('第三组：分子之间怎么互相吸引','氢键、偶极、色散力和形状影响沸点等物性。','intermolecular forces','intermolecular'),
 S('先找能造成最大差异的一位裁判','若共振已经决定数量级，就别先纠结微小位阻。','dominant factor first','condition-step')
],M('做排序题第一步最应该问什么？',['题目在比较哪种性质，以及哪一个因素可能主导差异','把所有因素平均打分','先背上次题的顺序'],0,'对。排序不是“八条规则同时用力”，而是找当前主导裁判。'));
set(16,'d16-lesson-acidbase',[
 S('酸性永远先假想“丢掉 H⁺ 以后”','比较共轭碱，不是只盯原酸长相。','HA → H⁺ + A⁻','conjugate-base'),
 S('负电能被共振分散，通常更稳','例如羧酸盐把负电分到两个 O；苯酚盐能进芳环共振。','delocalize A⁻','resonance'),
 S('吸电子基可通过诱导拉走负电密度','越近、越强通常稳定效果越明显。','EWG stabilizes anion','inductive'),
 S('s 成分高的轨道更靠近原子核','负电位于 sp 碳通常比 sp³ 碳更稳定，因此端炔 H 比烷烃 H 酸。','sp > sp² > sp³ for carbanion stability','hybridization'),
 S('碱性反过来问“孤对愿不愿拿 H⁺”','孤对越被共振/吸电子牵制，碱性往往越弱。',':B + H⁺','basicity')
],M('比较两个酸谁更强，最稳的第一步是什么？',['各自去掉 H⁺，比较留下的共轭碱谁更稳定','比较谁的名字更长','只看分子量'],0,'对。酸性排序本质是“离开后的电子状态”比较。'));
set(16,'d16-lesson-stability',[
 S('先问中间体带什么','C⁺、C⁻、自由基的“喜欢什么环境”并不完全一样。','C⁺ / C⁻ / C·','intermediate'),
 S('C⁺：电子缺，烷基/共振供电子通常有利','3°>2°>1° 是无共振普通碳正离子的基础趋势；烯丙/苄基共振可非常稳定。','allylic/benzylic resonance','carbocation-stability'),
 S('C⁻：电子多，额外烷基推电子往往不利','但吸电子基、共振、较高 s 成分可以稳定。','anion stabilization','conjugate-base'),
 S('自由基：有一只未配对电子','取代与烯丙/苄基共振通常也能分散单电子特征。','radical resonance','allyl-resonance'),
 S('不要把一张稳定性顺序表复制到所有电荷','先辨物种，再调用对应底层理由。','species first','condition-step')
],M('为什么不能用“3°>2°>1°”去机械排序所有碳负离子？',['碳负离子电子过多，烷基供电子效应与碳正离子情形不同','所有离子稳定性都一样','碳负离子没有电子'],0,'对。先辨“电子缺还是电子多”，再谈取代影响。'));
set(16,'d16-lesson-boiling',[
 S('沸腾是在克服“分子和分子之间”的吸引','不是断开分子内部 C–C/C–O 共价键。','intermolecular ≠ covalent bond breaking','intermolecular'),
 S('有氢键时往往需要更多能量拉开','O–H/N–H 等可形成较强分子间氢键网络。','H-bond → higher bp often','hydrogen-bond'),
 S('同系列分子越大，色散力通常增强','电子云更大、更易极化，接触面也影响吸引。','size/contact → dispersion','intermolecular'),
 S('支化会改变接触面积','同分子式下更紧凑常降低有效接触，沸点可能下降。','branching → lower bp often','steric'),
 S('所以先比作用力类型，再比大小/形状','不要只按分子量单因素机械排。','force type → size → shape','condition-step')
],M('为什么乙醇沸点通常明显高于相近分子量的烃？',['乙醇分子之间能形成氢键','乙醇内部 C–O 键会在沸腾时断裂','因为乙醇碳更多'],0,'对。沸点比较的是分子间拉开的难度。'));
set(16,'d16-lesson-arrow-blocks',[
 S('块1：质子转移','孤对/负电去 H，同时 H–A 键电子回 A。',':B→H；H–A→A','protonation'),
 S('块2：亲核进攻','电子对去缺电子原子，形成新 σ 键。',':Nu→E','new-bond'),
 S('块3：离去','旧 σ 键电子移到离去原子/基团。','C–X→X','bond-breaking'),
 S('块4：π打开/π形成','新键形成时 π 电子可上 O；消除时 σ(C–H) 电子可组成 π。','π→atom / σ→π','curved-arrow'),
 S('块5：共振/重排/四面体回落/单电子','复杂机理通常只是把这些积木按条件组合。','few arrow grammars → many mechanisms','arrow-tail')
],M('画双电子曲箭最先检查哪两点？',['箭尾有没有现成电子；箭头终点有没有合理去处','箭头颜色是否漂亮','分子名字是否够长'],0,'对。电子守恒和价键账比“像不像课本图”更重要。'));
set(16,'d16-lesson-mixed',[
 S('先遮住章节名','看到题时只圈结构把手和条件，不允许用“这是第几章”提示自己。','structure + condition','functional-handle'),
 S('把任务分类','是要排性质、预测产物、画电子、推结构还是搭路线？','task type','condition-map'),
 S('调用最少的底层规则','例如排序先找主裁判；反应先找电子源/缺口；合成先做碳数/官能团差异。','minimal rule set','condition-map'),
 S('最后检查是否与题目所有条件一致','温度、溶剂、过氧化物、酸/碱等小字不能漏。','full condition check','condition-step')
],M('混合真题中最危险的习惯是什么？',['看到熟悉试剂就自动套最近学过的章节，不读完整结构和条件','先圈官能团','先判断任务类型'],0,'对。Day16开始训练“切换”，因为正式试卷不会替你标章节。'));

// DAY 17 — synthesis I: compare, ledger, last step, disconnect, forward check.
set(17,'d17-lesson-difference',[
 S('把起点/目标左右固定，不换画法','相同碳尽量放在相同位置，视觉上只看变化。','START → TARGET','retro-compare'),
 S('圈官能团差异','OH/C=O/C=C/X/CN 等谁消失、谁出现。','functional change','fgi'),
 S('数碳','C 数相同通常是官能团互变；C 数改变说明某步增/减碳。','carbon ledger','retro-compare'),
 S('找新 C–C 键','若目标多了一条骨架连接，它几乎一定对应某个成碳反应。','new C–C bond','disconnection'),
 S('把差异写成一句人话','例如“3C烯烃→3C一级醇，碳数不变，只是 C=C 变末端 OH”。','one-sentence target','retrosynthesis')
],M('合成题第一分钟最值得做什么？',['起点终点并排找不同：碳数、官能团、新C–C键','立刻写十个试剂名','先猜标准答案路线'],0,'对。把大目标压成几条变化，才有可操作的入口。'));
set(17,'d17-lesson-carbonledger',[
 S('每个中间体旁边写 C 数','这一步几乎零成本，却能快速杀掉不可能路线。','C3 → C3 → C4...','retro-compare'),
 S('CN⁻ 是经典 +1C','CN 里的碳进入骨架，水解后常变羧酸碳。','R–X → R–CN (+1C)','nitrile'),
 S('Grignard 按 R 片段加碳','目标醇新增多少碳，追到 RMgX 的 R 和羰基片段。','RMgX + carbonyl','grignard'),
 S('炔负离子按 R–X 片段增碳','末端炔先变碳亲核体，再接入一级卤代烃片段。','RC≡C⁻ + R′X','acetylide'),
 S('Hofmann 是典型 −1C','原酰胺羰基碳最终以 CO₂ 离开。','RCONH₂ → RNH₂','hofmann')
],M('目标比起点多 1 个碳，以下哪条线最值得优先想到？',['CN⁻ 取代后再水解等经典 +1C 路线','普通 NaBH₄ 还原','H₂/Pd 氢化'],0,'对。先用碳数把候选反应缩小，再考虑官能团。'));
set(17,'d17-lesson-laststep',[
 S('从目标官能团倒问“谁一步能变成它”','这不是猜全部路线，只猜最后一小步。','precursor → target','precursor'),
 S('目标醇：列几类直接来源','羰基还原、Grignard后酸化、烯烃水合/氢硼化、环氧开环等。','? → ROH','fgi'),
 S('目标酸：列直接来源','一级醇/醛氧化、腈水解等。','? → RCO₂H','acid-cut'),
 S('目标烯烃：列直接来源','卤代烃/醇消除、炔部分还原、Wittig 等。','? → C=C','fgi'),
 S('再根据碳数和结构排掉不合适前体','不是所有“能变成醇”的路线都满足目标骨架。','last step + carbon ledger','retro-compare')
],M('逆合成“猜最后一步”为什么有用？',['目标官能团能把无限路线压缩成少数熟悉的直接前体','它能保证整条路线不用检查','因为最后一步永远只有一个答案'],0,'对。它是缩小搜索空间的工具，不是替代正向验证。'));
set(17,'d17-lesson-disconnection',[
 S('只在“能重新接上”的地方断','随便剪一根 C–C 没意义；断口两边要能对应已学亲核体/亲电体组合。','target C–C → two synthons','disconnection'),
 S('Grignard 断法','把醇中心 C 与新增 R 之间断开，常回到羰基 + RMgX。','alcohol ← carbonyl + RMgX','retro-cut-connect'),
 S('enolate 断法','把 α-C 与新接入碳之间断开，回到 enolate 前体 + 合适亲电体。','Cα–Cnew cut','enolate-carbon'),
 S('芳环 C–C 也可回到 Friedel–Crafts 等','但必须同时检查定位和底物是否能做 FC。','Ar–C cut','friedel'),
 S('断完马上翻译成真实试剂','“负碳/正碳”只是思考片段，最终路线要变成可操作底物。','synthon → reagent','precursor')
],M('为什么逆合成不能随便剪任意 C–C 键？',['断口必须能对应一条可靠的实际成键反应，否则正向接不回去','所有 C–C 键都一样容易形成','剪得越多路线越短'],0,'对。逆合成的断键价值取决于你有没有真实化学能把它重新接上。'));
set(17,'d17-lesson-forwardcheck',[
 S('从真实起始物重新往前走','逆推得到的是假设；正向才检验每一步能否发生。','start → ... → target','retro-forward'),
 S('检查1：试剂与底物匹配吗','例如 Grignard 前体中若有酸性 OH，它会先把 Grignard 淬灭。','reagent vs substrate','conflict'),
 S('检查2：是否有更强竞争路线','二级卤代物遇强碱可能优先 E2，不一定按你想的 SN2。','main vs competing path','condition-crossroads'),
 S('检查3：中间体能否撑过下一步','强氧化/还原剂是否会顺手改掉已经装好的官能团。','intermediate survival','compatibility'),
 S('三关都过才把路线保留','否则退回最近分叉，换另一条前体。','validate or backtrack','retro-forward')
],M('逆推得到一条漂亮路线后，为什么还必须正向检查？',['逆推只证明“看起来能接”，正向才暴露竞争反应和条件冲突','逆推已经自动保证所有实验条件','正向只为了画图好看'],0,'对。合成题的化学正确性最终要靠每一步真实可行。'));
set(17,'d17-lesson-score',[
 S('第一项：化学可行性','核心步骤若本身不成立，路线直接失去主资格。','valid chemistry 50%','compatibility'),
 S('第二项：效率','同样可行时，步数更少、收率损耗更少通常更优。','fewer sensible steps','retro-forward'),
 S('第三项：选择性','是否会生成大量位置/立体/副反应混合物。','selectivity','condition-map'),
 S('第四项：条件相容','每一步试剂是否会误伤已经存在的其他基团。','compatibility','compatibility'),
 S('黄色路线不是错','它可能可行但更绕/更差；学会比较而不是只背参考答案。','green / yellow / orange / red','condition-crossroads')
],M('一条5步路线化学上都成立，但比3步路线更绕，最合理评价是什么？',['可行但效率较低，可作为黄色替代路线','完全错误','一定比3步路线更优'],0,'对。合成不是“只认标准答案”，而是比较可行性、效率、选择性和条件。'));

// DAY 18 — synthesis II: order, protection, compatibility, alternatives.
set(18,'d18-lesson-order',[
 S('把每一步试剂想成“会攻击一类目标的工具”','它不会只听你的愿望，也会碰到分子上其他满足条件的位置。','reagent has scope','chemoselectivity'),
 S('所以每一步前都扫描全分子','哪些官能团会被这试剂改？哪些酸性 H 会先反应？','whole-molecule scan','compatibility'),
 S('顺序错误会让后一步无路可走','例如先装强钝化基可能让后续 Friedel–Crafts 失败。','order conflict','conflict'),
 S('优先完成“会被后续条件阻断”的关键步骤','再装会降低反应性/容易受伤的基团。','critical step first','main-reaction'),
 S('路线不是反应列表，而是时间安排','同样几步换顺序，化学结果可能完全不同。','same reactions, different order','retro-forward')
],M('为什么多步合成里“每一步都对”仍可能整条路线错？',['因为前一步产物可能与后一步条件冲突，顺序会改变可行性','因为反应不能连续发生','因为所有试剂互不影响'],0,'对。多步合成考的是“化学动作之间是否能共存”。'));
set(18,'d18-lesson-protection',[
 S('先确认真的存在冲突','保护会多两步，只有某官能团会抢先反应/被误伤时才值得。','conflict?','conflict'),
 S('保护 = 暂时改变反应性','例如羰基变缩醛后，不再像原 C=O 那样容易被亲核体攻击。','C=O → acetal','protection'),
 S('完成主反应','让真正目标位点在保护罩存在时顺利变化。','protected substrate → main reaction','main-reaction'),
 S('最后脱保护恢复原功能','保护基不是终点，必须可选择性拿掉。','protected → original group','deprotect'),
 S('把保护看成“时间管理”','不是让分子更漂亮，而是决定哪个官能团现在有资格反应。','reactivity scheduling','protection')
],M('什么时候最不应该随便加保护基？',['本来没有反应性冲突时，因为只会增加步骤和损耗','只要分子有氧就必须保护','所有合成都先保护'],0,'对。保护是解决冲突的工具，不是默认仪式。'));
set(18,'d18-lesson-aromatic-order',[
 S('先标目标的相对位置','邻/间/对关系决定需要什么“路牌”先装。','target o/m/p','ortho-meta-para'),
 S('问第一个取代基装上后会把第二步导向哪','电子效应会改变第二次 EAS 的优先位置。','first substituent → direction','omp'),
 S('若目标是间位，常利用 meta director 先占位','例如酰基/硝基等可先建立间位控制，再做后续转化。','meta-directing first','activation'),
 S('若 NH₂ 太强/会配位，先以可控形式安排','可先 NO₂ 再还原，或暂时保护 NH₂。','NO₂ ↔ NH₂ / protect','protection'),
 S('最后把“定位”和“官能团转换”一起正向验证','不能只满足位置，却让后续转换条件失败。','position + conversion','retro-forward')
],M('芳环多步合成中，为什么“先装谁”常直接决定成败？',['第一个取代基会改变芳环活性和第二次取代的定位','芳环上所有位置永远等价','第二步完全不受第一基团影响'],0,'对。芳环路线的顺序，本质上是在管理后续电子分布。'));
set(18,'d18-lesson-redox-order',[
 S('先列试剂真正能改哪些官能团','不要只看你想改的那个。','reagent scope','chemoselectivity'),
 S('强氧化剂可能同时碰多个“可氧化”位置','一级醇、醛、烯烃等可能在不同条件下受影响。','oxidant scan','oxidation'),
 S('强还原剂也可能把多个 C=O 衍生物一起推低','LiAlH₄ 不会自动只挑你圈出的一个。','reductant scan','hydride'),
 S('如果会误伤，就换温和试剂/换顺序/保护','目标是只让需要的位点在那个时间窗口发生反应。','selective condition','protection'),
 S('所以“氧化还原位置”也是路线兼容问题','不只是记 PCC/Jones/LAH 名字。','redox + compatibility','compatibility')
],M('路线中既有酯又有酮，只想还原酮，为什么通常优先考虑更温和的 NaBH₄ 而不是 LiAlH₄？',['NaBH₄ 常选择性处理醛酮而普通酯较不易被还原','NaBH₄ 更强能把所有基团还原','LiAlH₄ 不含氢'],0,'对。试剂强弱可以变成路线选择性的工具。'));
set(18,'d18-lesson-alt',[
 S('先判断“能不能走”','核心电子/碳数若错，路线就是红；化学成立才进入比较。','valid / invalid','compatibility'),
 S('可行但绕 = 黄色','多几步、选择性差一些，但没有违反化学，仍应保留为替代路线。','valid but inefficient','retro-forward'),
 S('当前条件明显被副反应压住 = 橙色','形式上能想象，但主路径很不利，不应当成常规答案。','suppressed path','condition-crossroads'),
 S('多个绿色路线再比较四维评分','步数、选择性、条件温和性、原料可得性等决定更优方案。','compare routes','compatibility')
],M('为什么“不是参考答案”的路线不应该自动判错？',['只要每一步化学成立并能到目标，它就是有效路线，只是可能不够优','标准答案之外都违反化学','合成题只考记忆'],0,'对。真正会合成的人必须能评价多条路线，而不是背唯一序列。'));
set(18,'d18-lesson-mixed-case',[
 S('把路线中间体也当“未知结构”审查','每一步画完不要默认它就是你想的中间体。','intermediate check','retro-forward'),
 S('碳数对吗','任何增/减碳都应能追到具体试剂/脱羧步骤。','carbon ledger','retro-compare'),
 S('官能团和定位对吗','芳环方向、氧化级、立体要求是否已满足。','functional/location check','fgi'),
 S('下一步条件能接得上吗','中间体是否带会淬灭/阻断下一试剂的基团。','next-step compatibility','conflict'),
 S('不对就退回最近的分叉点','路线图允许回退，这是训练真正的化学纠错。','backtrack','retro-cut-connect')
],M('多步路线写到中间，最值得立刻做的检查是什么？',['碳数、官能团/定位、以及下一步条件能否承受','等全部写完再看','只检查名字拼写'],0,'对。边走边审计比最后才发现第一步就错高效得多。'));

Data.TEACHING_CLOSURE_VERSION='v10-mainline-deep-day18';
})();

(function(){
'use strict';
const Data=window.Organic637Data;if(!Data?.days)return;
const L=(d,id)=>Data.days[d]?.lessons?.find(x=>x.id===id);
const set=(d,id,sequence,micro,why)=>{const r=L(d,id);if(!r)return;if(sequence)r.sequence=sequence;if(micro)r.microCheck=micro;if(why)r.whyChain=why;};
const S=(title,text,formula,diagram)=>({title,text,formula,diagram});
const M=(prompt,options,answer,feedback)=>({prompt,options,answer,feedback});

// DAY 19 — remove all chapter labels but preserve an internal rescue algorithm.
set(19,'d19-zero-01-exam',[
 S('第一步：先把题目翻译成人话','它是在问产物、排序、机理、结构，还是合成？只确定任务，不猜章节。','What is being asked?','condition-map'),
 S('第二步：圈“会动”的结构','官能团、带电处、孤对、π键、离去基、酸性H是你真正的入口。','reaction handles','functional-handle'),
 S('第三步：读完整条件','主试剂、溶剂、温度、光/过氧化物、酸/碱、后处理都可能切换路线。','full conditions','condition-step'),
 S('第四步：做守恒账','电子从哪里来、旧键电子去哪、碳数变没变、区域/空间是否满足。','electron + carbon + geometry ledger','curved-arrow'),
 S('第五步：卡住也写“确定的一步”','哪怕不能完成，也先写已知官能团/第一支箭/候选排除，让 Day20 能定位断点。','partial reasoning > blank','arrow-tail')
],M('Boss 卷遇到陌生结构时，最差的第一反应是哪一个？',['因为没见过原题就空白放弃','先圈反应中心和条件','先做碳数/电子账'],0,'对。未见题的目的就是检验你能不能用底层语言，而不是靠认脸。'));
set(19,'d19-lesson-exam',[
 S('今天不边做边看答案','即时反馈会把后面的题变成“刚看过”，破坏真正未见测量。','submit → lock','energy-barrier'),
 S('置信度照常记录','“我确定但错”比“我猜而错”更值得 Day20优先修，因为它代表稳定错误模型。','sure / unsure / guess','condition-crossroads'),
 S('时间也只是证据，不是惩罚','很慢但正确可能说明路线还不自动；很快高置信错误则提示错误规则很牢。','time + correctness','rate-law'),
 S('整卷结束才统一拆错','按反应/排序/机理/结构/合成分域，而不是只给总分。','exam → error map','dbe-options'),
 S('目标是验证“离开扶手还能不能走”','120/150 只有在未见题和后续迁移都稳定时才有解释力。','unseen performance → target evidence','retro-forward')
],M('为什么 Boss 卷不能每题做完立刻看完整解析？',['会让后续题受到刚看答案的提示，无法真实测独立能力','因为解析没有用','因为考试不允许记录答案'],0,'对。Day19不是学习模式，而是对前18天能力的独立抽样。'));

// DAY 20 — diagnose the broken link, repair it, then force transfer.
set(20,'d20-zero-01-repair',[
 S('错题先不要抄正确答案','先定位你到底在哪一环断了：读结构、读条件、电子方向、稳定性、碳数、空间还是路线。','error → broken link','condition-map'),
 S('只补那一块最小地基','例如不是“重学SN2”，而是回到“为什么电子从背面去、C–X电子去哪”。','repair minimal prerequisite','sn2-electron-flow'),
 S('换一个新结构立刻验证','原题重做容易靠记忆；换底物才能证明规则被修复。','new structure','retro-forward'),
 S('再隔开一点做迁移','换问法/反方向/混合条件，看能否自己识别应该调用哪条规则。','near → far transfer','condition-crossroads'),
 S('最后才把 mastery 抬高','同日刷对不能替代跨日和换结构证据。','evidence quality','rate-law')
],M('错题修复为什么不能只把原题连续重做三遍？',['容易记住具体答案，不能证明换结构还会','同一题越多越等于跨日掌握','因为原题不能保存'],0,'对。修复必须在“新结构”上重新成功。'));
set(20,'d20-lesson-repair',[
 S('系统先选 Top3，不重学整本','Day19、高置信错误、effective mastery、跨日记录共同决定最漏的三处。','top3','condition-map'),
 S('每个漏洞先做诊断题','故意设计成能区分“名词忘了”和“底层逻辑错了”。','diagnose','dbe-options'),
 S('再回到断点前一层','如果箭头错，就先找电子源；如果区域错，就先比较中间体/共振；如果合成错，就先做碳数账。','back one prerequisite','arrow-tail'),
 S('修复题换结构','保持同技能但换表面形式，防止背答案。','same skill, new molecule','retro-forward'),
 S('只有无提示走通才进入迁移','用提示做对叫“修好一半”，不是稳定。','independent success gate','condition-step')
],M('Top3 修复为什么不是简单挑“错得最多的三个章节”？',['要结合错误类型、置信度、遗忘和迁移证据，定位真正断裂的技能','章节名本身就是能力','只看最近一道题就够'],0,'对。修复对象应该是可操作的技能断点，而不是大章节标签。'));
set(20,'d20-lesson-transfer',[
 S('第一层：近迁移','保持同反应母动作，只换取代基/碳链长度。','same rule, new surface','condition-step'),
 S('第二层：条件迁移','同一底物换一个关键条件，看能否主动切换路线。','same substrate, new condition','condition-crossroads'),
 S('第三层：反方向迁移','从产物倒推前体/试剂，逼你把反应网络双向连接。','product → precursor','retrosynthesis'),
 S('第四层：混合迁移','不告诉章节，把排序/机理/结构/合成放在同一组。','mixed problem','condition-map'),
 S('真正“会” = 不靠题脸也能重新推出','这才是从训练题走向637未见题的桥。','rule survives surface change','retro-forward')
],M('哪一种最能证明“不是背住原题”？',['换结构/换条件后仍能无提示推出','原题答案字母记得很快','同一题连续点对十次'],0,'对。迁移是最终证据，因为考试不会把网站原题原样端上来。'));
set(20,'d20-lesson-finish',[
 S('先看 Day19 未见卷','它回答“离开扶手后，面对混合题能走多远”。','Boss score','dbe-options'),
 S('再看 Day20 迁移','它回答“修复以后，规则能否活在新结构里”。','transfer rate','retro-forward'),
 S('再看跨日稳定/到期复习','它回答“不是当天热乎记忆，而是能不能留住”。','cross-day evidence','condition-step'),
 S('把结论分成稳定 / 风险 / 易忘','不把一个总分伪装成全部能力。','stable / risky / due','condition-map'),
 S('120/150 是证据门槛，不是自动奖励','只有未见题接近80%、迁移也稳、核心域没有大洞，才说“接近目标线”。','unseen≈80% + transfer≥75%','retro-forward')
],M('什么时候才最有底气说“训练证据接近120/150目标线”？',['未见Boss接近80%，换结构迁移也稳定，核心能力没有明显大洞','只要20天页面全部点完','只要某一天100%'],0,'对。我们用独立表现证明目标，不用“学完”两个字替代证据。'));

Data.TEACHING_CLOSURE_VERSION='v10-mainline-deep-complete';
})();

(function(){
'use strict';
const Data=window.Organic637Data;if(!Data?.days)return;
const G=Data.BEGINNER_GLOSSARY||[];
const lessonText=r=>[r.title,r.body,r.note,...(r.formulas||[]),...(r.sequence||[]).flatMap(s=>[s.title,s.text,s.formula]),...(r.whyChain||[]),r.microCheck?.prompt,...(r.microCheck?.options||[])].filter(Boolean).join(' ');
const seen=new Set();
for(let day=1;day<=20;day++)for(const row of Data.days?.[day]?.lessons||[]){
  row.termCards=[];const text=lessonText(row);
  for(const card of G){
    if(seen.has(card.term))continue;
    const hit=typeof Data.glossaryMatches==='function'?Data.glossaryMatches(text,card):(card.aliases||[card.term]).some(a=>a&&text.includes(a));
    if(hit){row.termCards.push(card);seen.add(card.term);}
  }
}
Data.BEGINNER_GLOSSARY_COVERED=[...seen];
Data.TEACHING_CLOSURE_VERSION='v10-mainline-deep-complete';
})();
