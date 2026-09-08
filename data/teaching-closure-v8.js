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
