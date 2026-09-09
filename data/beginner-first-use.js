(function () {
  'use strict';
  const Data = window.Organic637Data = window.Organic637Data || {};
  Data.days = Data.days || {};

  const GLOSSARY = [
    {term:'原子',aliases:['原子'],plain:'构成物质的基本微粒。今天只需把它想成结构图里的一个“节点”，例如 C、H、O、Br。',why:'有机结构式画的就是这些原子彼此如何连接。',limit:'原子内部还有原子核和电子，这里先不展开。',diagram:'atom'},
    {term:'元素符号',aliases:['元素','C、H','C/H'],plain:'C、H、O、N、Br 是元素符号：C=碳，H=氢，O=氧，N=氮，Br=溴。',why:'看懂符号，才不会把 CH3 误解成“三个碳”。',limit:'右下角数字表示原子个数，不是电荷。',diagram:'symbols'},
    {term:'分子',aliases:['分子'],plain:'若干原子按特定方式连接成的整体。换一根键的位置，就可能变成另一种分子。',why:'有机化学研究的核心就是“原子怎么连、为什么会换连接”。',limit:'离子和自由基也可能不是中性“分子”，但仍可用连接图分析。',diagram:'molecule'},
    {term:'烃',aliases:['烃'],plain:'只由 C 和 H 构成的有机化合物。烷烃、烯烃、炔烃都属于烃。',why:'先把最简单的 C/H 世界学会，再逐步加入 O、N、卤素。',limit:'真实有机化学远不止烃。',diagram:'hydrocarbon'},
    {term:'烷烃',aliases:['烷烃'],plain:'只含 C–C 单键和 C–H 键的饱和烃。',why:'它提供最基本的碳骨架参照，也让你理解“烯烃比烷烃少 2H”这种账本。',limit:'环烷烃分子式与开链烷烃不同。',diagram:'alkane'},
    {term:'烯烃',aliases:['烯烃'],plain:'含至少一根 C=C 的烃。今天先把它理解成“碳骨架上出现一个双键反应把手”。',why:'C=C 里的 π 电子让烯烃比普通烷烃更容易发生加成。',limit:'多烯、共轭烯等后面再细分。',diagram:'alkene'},
    {term:'结构式',aliases:['结构式'],plain:'把原子写出来，再用线表示谁和谁直接相连。它不是“字母串”，而是一张连接地图。',why:'因为有机题最先考的不是名字，而是连接关系；看错一根键，后面所有反应都会错。',limit:'二维结构式只画连接关系，真实分子还具有三维形状。',diagram:'bond-map'},
    {term:'共价键',aliases:['共价键'],plain:'两个原子共同使用一对电子形成的连接。写成 A—B 时，中间那根线代表一对共享电子。',why:'原子通过共享电子降低体系能量，所以能稳定地连在一起。',limit:'“一根线=一对电子”是路易斯结构语言，不表示电子真的排成直线。',diagram:'bond-pair'},
    {term:'价数',aliases:['价数','价态'],plain:'这里先把它理解成“这个原子通常能同时连几根键”。最常用：C≈4，H≈1，O≈2，N≈3，卤素≈1。',why:'它让你能检查结构有没有“少画一根键”或“多接了一根键”。',limit:'真实价态/氧化态更复杂；第一阶段只用常见成键数。',diagram:'valence'},
    {term:'碳骨架',aliases:['碳骨架','骨架'],plain:'把分子里的碳—碳连接单独拎出来，就是碳骨架。它决定“这栋房子的框架”有没有变。',why:'很多反应只换官能团，不改碳骨架；先分清这一点能大幅减轻记忆。',limit:'裂解、重排和成 C–C 键会真正改变骨架。',diagram:'carbon-skeleton'},
    {term:'异原子',aliases:['异原子'],plain:'有机分子里，除 C、H 之外常见的 O、N、S、卤素等原子。它们经常让附近电子分布明显改变。',why:'它们电负性、孤对电子和成键方式不同，所以往往是反应性“信号灯”。',limit:'不是所有异原子都一定是反应中心。',diagram:'heteroatom'},
    {term:'官能团',aliases:['官能团'],plain:'分子里一小块具有典型反应性的结构，例如 C=C、C=O、–OH、–Br。可以先把它当成“反应把手”。',why:'很多真题只是在不同碳骨架上重复同一种官能团逻辑。先圈官能团，复杂分子会立刻变简单。',limit:'同一官能团也会因邻近基团和条件不同而改变反应性。',diagram:'functional-handle'},
    {term:'电子',aliases:['电子'],plain:'带负电的微粒。有机反应里真正需要追踪的，往往不是“原子跑去哪”，而是哪一对电子改成了新的共享关系。',why:'成键、断键、本质上都涉及电子重新分配。',limit:'我们画的是简化电子账本；真实电子由量子力学描述。',diagram:'electron'},
    {term:'价电子',aliases:['价层电子','价电子'],plain:'原子最外层、最直接参与成键和反应的电子。',why:'碳正离子为什么“缺电子”、孤对为什么能成键，都是在数价电子。',limit:'这里不展开完整电子组态。',diagram:'valence-electron'},
    {term:'电子对',aliases:['电子对','一对电子'],plain:'两个电子成对出现。普通双电子曲箭一次搬的就是一对电子。',why:'一根普通共价键正好对应一对共享电子，所以“搬一对电子”常常就意味着成一根键或断一根键。',limit:'自由基机理会出现单电子移动。',diagram:'electron-pair'},
    {term:'孤对电子',aliases:['孤对电子','孤对'],plain:'没有拿去和别的原子共享、仍留在某个原子上的一对电子。常画成两个点“:”。',why:'它们经常能拿出来形成新键，所以 O、N、卤离子常能当电子提供者。',limit:'有孤对不等于一定强亲核，溶剂、共振、位阻都会影响。',diagram:'lone-pair'},
    {term:'单键',aliases:['单键'],plain:'两个原子共享一对电子，结构式里通常画一根线。',why:'它是最常见的 σ 键骨架连接。',limit:'单键可以转动，但并非绝对自由。',diagram:'single-bond'},
    {term:'双键',aliases:['双键'],plain:'两个原子之间有两套成键：1 根 σ 键 + 1 根 π 键。',why:'π 部分比 σ 部分更容易参与许多加成，因此双键常是反应中心。',limit:'不同双键（C=C、C=O）电子分布不一样。',diagram:'sigma-pi'},
    {term:'σ键',aliases:['σ 键','σ键'],plain:'电子云主要集中在两个原子核连线方向上的成键。可以把它想成“正面对接”的牢固主连接。',why:'正面对接的轨道重叠通常较强，所以很多烯烃加成先动 π，而保留原来的 C–C σ。',limit:'“牢固”是相对说法，σ 键也能断。',diagram:'sigma'},
    {term:'π键',aliases:['π 键','π键'],plain:'两个平行 p 轨道从侧面重叠形成的键，电子云主要分布在键轴上方和下方。',why:'侧向重叠通常比正面 σ 重叠弱，且电子云更暴露，所以容易被亲电试剂“看见”并参与反应。',limit:'π 电子不是漂在外面的球；它是分子轨道中的电子密度。',diagram:'pi'},
    {term:'p轨道',aliases:['p 轨道','p轨道'],plain:'一种像“哑铃”一样分布在原子核两侧的轨道。相邻 p 轨道平行时可以侧向重叠成 π 键。',why:'理解 p 轨道能解释为什么双键限制旋转、为什么共轭需要轨道连续。',limit:'图形表示的是电子出现概率分布，不是实体哑铃。',diagram:'p-orbital'},
    {term:'加成反应',aliases:['加成','加成反应'],plain:'原来有多键的两个原子分别接上新的原子/基团，多键级数下降。',why:'多键里的 π 电子被拿去形成新的 σ 键，所以看起来像“把东西加到双键两边”。',limit:'并非所有加成都走同一种机理。',diagram:'addition'},
    {term:'电负性',aliases:['电负性'],plain:'一个原子在共价键里“拉共享电子”的能力。O、卤素通常比 C/H 更会拉。',why:'它决定很多键的极性，告诉你哪一端更缺电子、哪一端更富电子。',limit:'它是相对趋势，不是原子真的有“吸力开关”。',diagram:'electronegativity'},
    {term:'极性',aliases:['极化','极性'],plain:'一根键的电子没有平均分，而是偏向一端，于是两端出现部分正/负电。',why:'有了极性，亲核体和亲电中心才容易被快速识别。',limit:'部分电荷不是完整的 +1/−1 离子电荷。',diagram:'polarity'},
    {term:'部分电荷 δ+/δ−',aliases:['δ+','δ−','部分正电','部分负电'],plain:'表示“只是偏正/偏负”，不是完整离子。δ+ 说明电子密度相对少，δ− 说明相对多。',why:'例如 Hδ+—Brδ− 能直接提示 π 电子更可能先去接 H。',limit:'δ 的大小依分子环境而变。',diagram:'partial-charge'},
    {term:'亲核体',aliases:['亲核体','亲核'],plain:'能提供一对电子去形成新键的角色。常见线索：负电、孤对电子、π 键。',why:'它的电子对需要一个电子不足的位置来共享，形成新的 σ 键。',limit:'“亲核”描述反应性，不等同于“碱性强”。',diagram:'nucleophile'},
    {term:'亲电中心',aliases:['亲电中心','亲电体','亲电'],plain:'电子相对不足、能够接收一对电子形成新键的位置。常见是 Cδ+、C+、Hδ+。',why:'它有低能可接受轨道/电子缺口，所以能与电子丰富处形成新键。',limit:'亲电性受电荷、诱导、共振、溶剂等共同影响。',diagram:'electrophile'},
    {term:'曲箭',aliases:['曲箭','箭尾','箭头'],plain:'机理里的箭头不是“原子移动路线”，而是电子移动路线。双箭头搬一对电子，鱼钩箭头搬一个电子。',why:'只要箭尾放在真实电子来源、箭头指向新共享位置，就能把成键/断键画清楚。',limit:'箭头是电子账本的图示，不是真实运动轨迹。',diagram:'curved-arrow'},
    {term:'异裂',aliases:['异裂'],plain:'一根键断开时，原来那一对电子全部归同一边，产生正/负离子。',why:'如果某一端更能稳定负电，就更容易把两电子一起带走。',limit:'具体是否异裂取决于键极性、溶剂和生成物稳定性。',diagram:'heterolysis'},
    {term:'均裂',aliases:['均裂'],plain:'一根键断开时，两边各拿一个电子，形成两个自由基。',why:'当键比较弱且有光/热等条件时，单电子分配可能可行。',limit:'不是所有键都容易均裂。',diagram:'homolysis'},
    {term:'自由基',aliases:['自由基'],plain:'带有一个未配对电子的粒子，常用“·”表示。',why:'未配对电子让它通常反应性高，常通过链式步骤继续制造新的自由基。',limit:'自由基不等于带电；它可以是中性的。',diagram:'radical'},
    {term:'碳正离子',aliases:['碳正离子','C⁺'],plain:'带正电、只有 6 个价层电子的碳中心。可以先理解成“这个碳缺一对电子”。',why:'它会强烈接受电子对，所以亲核体容易来补这个电子缺口。',limit:'碳正离子通常寿命很短，并受溶剂和邻基稳定。',diagram:'carbocation'},
    {term:'一级/二级/三级碳',aliases:['一级','二级','三级'],plain:'看“这个中心碳直接连了几个别的碳”：连 1 个叫一级，2 个叫二级，3 个叫三级。不是数整个分子里有几个碳。',why:'邻近烷基数量会影响位阻、碳正离子稳定性、SN1/SN2/E2 倾向。',limit:'不同问题要先确认你在给哪一个“中心碳”分级。',diagram:'carbon-degree'},
    {term:'烷基',aliases:['烷基'],plain:'把一个烷烃去掉一个 H 后剩下、可以作为取代基连接出去的碳氢片段，例如 CH3–（甲基）、CH3CH2–（乙基）。',why:'“一级碳正离子连一个烷基”里，烷基只是说它直接连着一个碳氢片段。',limit:'烷基不是某一种单独分子。',diagram:'alkyl'},
    {term:'超共轭',aliases:['超共轭'],plain:'邻近 C–H/C–C σ 键的电子可以和空的 p 轨道发生一定程度的重叠，把正电荷分散一些。',why:'这能解释为什么更多烷基取代的碳正离子常更稳定。',limit:'它不是“把完整电子送过去”，而是轨道重叠导致的电子离域。',diagram:'hyperconjugation'},
    {term:'诱导效应',aliases:['诱导效应','诱导'],plain:'电负性或带电基团通过 σ 键把电子密度向某一方向拉/推的效应。',why:'它可以改变邻近位置的电子多少，从而影响酸碱性、稳定性和反应性。',limit:'诱导效应通常随距离增加而迅速减弱。',diagram:'inductive'},
    {term:'中间体',aliases:['中间体'],plain:'反应途中真正形成、寿命很短的结构，位于反应物和产物之间。',why:'知道中间体能解释重排、区域选择和为什么某条路线更有利。',limit:'有些反应是协同一步完成，没有可分离中间体。',diagram:'intermediate'},
    {term:'活化能/能垒',aliases:['活化能','能垒'],plain:'反应从起点走到过渡状态必须先“爬过”的能量山。',why:'能垒更低的路径通常反应更快，所以机理竞争常看“哪条山更低”。',limit:'稳定性与速率相关但不是同一个概念。',diagram:'energy-barrier'},
    {term:'R / R′ 简写',aliases:['R¹','R²','R³','R⁴','R′','R–'],plain:'R 不是一种元素，而是“这里连着某个碳氢片段/有机片段”的占位符。R′ 只是表示可能和 R 不同。',why:'用 R 可以把共同反应规律写得很短，不必每次都画一整条碳链。',limit:'具体做题时最终仍要把 R 换回真实结构。',diagram:'r-group'},
    {term:'主链',aliases:['主链'],plain:'命名时选来作为“主街道”的连续碳链，通常要包含最重要官能团和尽可能多的多键。',why:'确定主链后才知道碳数词根和门牌编号。',limit:'复杂命名有更完整的优先规则。',diagram:'main-chain'},
    {term:'取代基',aliases:['取代基'],plain:'挂在主链上的侧枝，例如 –CH₃、–Br、–OH（命名角色依优先级而定）。',why:'名字要告诉别人“哪条主链的第几号碳挂了什么”。',limit:'有些高优先级官能团会作为后缀而不是普通取代基。',diagram:'substituent'},
    {term:'卤素',aliases:['卤素'],plain:'F、Cl、Br、I 这一族元素。在有机题里常作为卤代烃的 X。',why:'C–X 键极性和 X 的离去能力会控制取代/消除。',limit:'不同卤素反应性并不完全一样。',diagram:'halogen'},
    {term:'Markovnikov 区域选择',aliases:['Markovnikov','马氏','区域选择'],plain:'不对称烯烃加 HX 时，常走能形成更稳定碳正离子的方向，因此 X 最终常落在较多取代的碳。',why:'真正决定方向的是两条质子化路径的中间体/过渡状态能量差，不是“X 喜欢更里面”。',limit:'HBr/ROOR、氢硼化等会走不同机理，不能机械套。',diagram:'markovnikov'},
    {term:'试剂',aliases:['试剂'],plain:'加入反应体系、直接参与或促成化学变化的物质。',why:'同一个底物换试剂，就可能走完全不同的电子路径。',limit:'试剂、催化剂、溶剂、后处理角色不同。',diagram:'reagent'},
    {term:'溶剂',aliases:['溶剂'],plain:'提供反应发生环境、通常量较大的介质。它可能稳定离子、包围亲核体，从而改变速率和路线。',why:'很多离子型反应会明显受溶剂影响，所以溶剂不是“背景水”，而是条件的一部分。',limit:'有些溶剂也会直接参与反应，例如 H2O。',diagram:'solvent'},
    {term:'后处理',aliases:['后处理'],plain:'主反应完成后再加入的试剂，用来把中间形态变成最终可观察产物。',why:'例如硼氢化后的氧化、臭氧裂解后的还原/氧化处理会改变最终官能团。',limit:'题目中的“1) ... 2) ...”要按顺序读。',diagram:'workup'},
    {term:'过氧化物 ROOR',aliases:['ROOR','过氧化物'],plain:'含 O–O 单键的一类化合物。O–O 键相对较弱，可在光/热下均裂生成自由基。',why:'它能把 HBr 加成从离子机理切换到自由基链机理。',limit:'“过氧化物效应”主要经典适用于 HBr。',diagram:'peroxide'},
    {term:'链反应',aliases:['链反应','链式','传播'],plain:'一个自由基反应后又生成新的自由基，使反应能够一轮接一轮传播。',why:'这解释了少量引发步骤如何带动大量底物反应。',limit:'还包括引发和终止步骤。',diagram:'radical-chain'},
    {term:'反 Markovnikov',aliases:['反 Markovnikov','反马氏'],plain:'最终取代基落在与普通 Markovnikov 预测相反的位置。',why:'不是“规则反着背”，而是机理换了，控制稳定性的中间体也换了。',limit:'必须看具体试剂体系。',diagram:'anti-mark'},
    {term:'氢硼化–氧化',aliases:['氢硼化','BH₃','H₂O₂/OH⁻'],plain:'先让 B/H 协同加到 C=C，再把 C–B 氧化成 C–OH，整体常给反 Markovnikov 醇。',why:'第一步是协同四中心过渡状态，不经过自由碳正离子，因此区域/重排逻辑不同。',limit:'常见结果还具有 syn 加成特征。',diagram:'hydroboration'},
    {term:'催化加氢',aliases:['H₂/Pd','H₂/Pt','催化加氢','氢化'],plain:'在金属催化剂表面把 H2 加到 C=C/C≡C 上，降低多键级数。',why:'金属表面帮助 H–H 和 π 键活化，让两个 H 逐步接到碳上。',limit:'不同催化剂可控制是否停在烯烃。',diagram:'hydrogenation'},
    {term:'syn 加成',aliases:['syn'],plain:'两个新基团从原多键的同一侧加入。',why:'某些协同/表面加成机理会固定同面几何。',limit:'二维结构式不总能显示 syn/anti，需要立体图。',diagram:'syn'},
    {term:'Lindlar 催化剂',aliases:['Lindlar'],plain:'被“毒化”的 Pd 催化剂，可把炔烃选择性还原到顺式烯烃而不继续到烷烃。',why:'催化剂活性被调低，使反应更容易停在第一阶段。',limit:'典型给 cis 烯烃。',diagram:'lindlar'},
    {term:'臭氧裂解',aliases:['臭氧裂解','O₃'],plain:'把 C=C 两端分别转成羰基，相当于在双键处把碳骨架“剪开”后给两个切口各装 O。',why:'产物预测最稳的方法是先保留双键两端的碳，再分别补成 C=O。',limit:'最终是醛/酮/酸取决于取代和后处理。',diagram:'ozone-cut'},
    {term:'烯丙位',aliases:['烯丙位'],plain:'紧挨着 C=C 的那个 sp3 碳位置。',why:'烯丙位自由基/正离子能与双键共振，所以这一位置反应性特殊。',limit:'不要把双键上的碳本身叫烯丙位。',diagram:'allylic'},
    {term:'NBS',aliases:['NBS'],plain:'N-溴代丁二酰亚胺，常在自由基条件下提供低浓度 Br2，用于烯丙位溴化。',why:'低 Br2 浓度能减少对 C=C 的直接加成，偏向自由基取代。',limit:'仍需看光/引发条件和底物。',diagram:'nbs'},
    {term:'杂化',aliases:['杂化','sp³','sp²','sp'],plain:'把原子上的 s、p 轨道重新组合成适合成键方向的轨道模型。sp、sp2、sp3 的 s 成分和几何不同。',why:'它能解释键角、酸性、轨道方向和某些稳定性趋势。',limit:'杂化是有用模型，不是原子真的先“混合轨道再反应”。',diagram:'hybridization'},
    {term:'pKa',aliases:['pKa'],plain:'衡量酸性强弱的常用数值；pKa 越小，酸通常越强。',why:'更稳定的共轭碱意味着原酸更容易失去 H+，因此 pKa 更低。',limit:'比较时最好在相近溶剂/条件下。',diagram:'pka'},
    {term:'共轭碱',aliases:['共轭碱'],plain:'一个酸失去 H+ 后剩下的物种。',why:'判断酸强弱时，常常反过来比较“失去 H 以后谁更稳定”。',limit:'酸/碱是成对定义的。',diagram:'conjugate-base'},
    {term:'炔负离子/乙炔负离子',aliases:['炔负离子','乙炔负离子','acetylide'],plain:'端炔失去 H 后，负电荷留在末端 sp 碳上的碳负离子。',why:'这个碳带一对可用电子，因此能像 O−/CN− 一样做亲核体去形成 C–C 键。',limit:'更适合和甲基/一级卤代烃做 SN2。',diagram:'acetylide'},
    {term:'π共轭',aliases:['共轭二烯','共轭体系','连续 π'],plain:'相邻 p 轨道连续排列，使 π 电子能在多个原子之间离域，而不是只属于一根双键。',why:'共轭能稳定分子/离子，并改变加成、光谱和芳香性。',limit:'中间若出现 sp3 原子打断 p 轨道连续性，共轭会中断。',diagram:'conjugation'},
    {term:'Diels–Alder',aliases:['Diels','Diels–Alder','亲双烯体'],plain:'一个共轭二烯的 4 个 π 电子与一个亲双烯体的 2 个 π 电子协同重排，一步形成六元环。',why:'轨道几何允许 4+2 电子体系在同一步形成两根 σ 键和一根新 π 键。',limit:'取代基、构象和 endo/exo 会影响结果。',diagram:'diels-alder'},
    {term:'底物',aliases:['底物'],plain:'被试剂作用、发生主要结构变化的那个有机分子。',why:'把底物、试剂、溶剂分清，才知道“谁在被改造”。',limit:'多组分反应里角色可能更复杂。',diagram:'substrate'},
    {term:'离去基',aliases:['离去基'],plain:'和反应中心碳断键后，能带着原键电子离开的基团。',why:'离去后越稳定，就越容易走；因此 I−、Br− 通常比 F− 更好离去。',limit:'离去能力受溶剂和反应类型影响。',diagram:'leaving-group'},
    {term:'SN2',aliases:['SN2'],plain:'亲核取代的一步协同机理：亲核体从背面进攻，C–Nu 成键与 C–X 断键同时发生。',why:'背面几何能让亲核体孤对与 C–X 的 σ* 反键轨道最好重叠。',limit:'位阻大时会明显变慢。',diagram:'sn2'},
    {term:'SN1',aliases:['SN1'],plain:'先离去形成碳正离子，再由亲核体进攻的分步取代机理。',why:'慢步骤主要是底物离子化，所以速率主要看底物浓度。',limit:'碳正离子可能重排，也会与 E1 竞争。',diagram:'sn1'},
    {term:'σ*反键轨道',aliases:['σ*','反键轨道'],plain:'与成键 σ 轨道对应的高能轨道。往里面放电子会削弱原 C–X 键。',why:'SN2 背面进攻的关键，就是亲核体把电子送进这个合适方向的接受轨道。',limit:'这里用轨道模型解释方向，不要求量子化学计算。',diagram:'sigma-star'},
    {term:'构型反转',aliases:['构型反转','inversion','Walden'],plain:'SN2 进攻后，中心碳周围三个基团的空间朝向像雨伞翻面一样反过来。',why:'亲核体从离去基正反方向进入，几何上自然导致翻转。',limit:'R/S 标签是否从 R 变 S 还要重新按 CIP 排优先级。',diagram:'inversion'},
    {term:'重排',aliases:['重排','氢迁移','烷基迁移'],plain:'碳正离子形成后，相邻 H 或烷基连同键电子一起移动，把正电位置换到更稳定的碳。',why:'如果移动后得到明显更稳定的碳正离子，能量更低，所以会竞争发生。',limit:'协同 SN2 没有自由碳正离子，因此通常不重排。',diagram:'rearrangement'},
    {term:'亲核性',aliases:['亲核性'],plain:'一个粒子向亲电碳提供电子对、形成新键的快慢倾向。',why:'受电荷、溶剂、极化性和位阻影响。',limit:'亲核性是动力学概念，不等于碱性。',diagram:'nucleophilicity'},
    {term:'碱性',aliases:['碱性'],plain:'一个粒子接受 H+ 的倾向。',why:'本质上是在比较它和 H+ 成键后的热力学稳定性。',limit:'强碱不一定是强亲核体，尤其体积很大时。',diagram:'basicity'},
    {term:'E2',aliases:['E2'],plain:'强碱拿走 β-H，同时离去基离开、C=C 形成，三个动作在同一步发生。',why:'轨道要在合适几何中同步重排，因此常要求 anti-periplanar。',limit:'底物、碱体积和温度会影响产物。',diagram:'e2'},
    {term:'E1',aliases:['E1'],plain:'先形成碳正离子，再由碱从 β 位拿 H 形成 C=C 的分步消除。',why:'和 SN1 共用碳正离子中间体，所以会重排并常受温度影响。',limit:'不是所有底物都能稳定形成碳正离子。',diagram:'e1'},
    {term:'α-C / β-C / β-H',aliases:['α-C','β-C','β-H','α/β'],plain:'以关键官能团/离去基所在碳为参照，第一站叫 α，隔壁叫 β；β 碳上的 H 就是 β-H。',why:'E2/E1 的新双键正是在 α 与 β 两个碳之间形成。',limit:'羰基化学里 α 的参照点是羰基。',diagram:'alpha-beta'},
    {term:'anti-periplanar',aliases:['anti-periplanar'],plain:'β-H、Cβ、Cα、离去基四个关键原子近似共平面，而且 H 与离去基方向相反。',why:'这种几何使 C–H σ、即将形成的 π、C–X σ* 轨道重叠最有效。',limit:'环己烷中会转化为“反式二轴”要求。',diagram:'anti-periplanar'},
    {term:'二面角',aliases:['二面角'],plain:'沿着中间一根键看，前后两组键彼此扭开了多少；可以把它当成“绕这根轴转了几度”。',why:'E2 与后续构象题都要用它说清楚空间对齐，而不只是说“看起来差不多”。',limit:'它描述四个连续原子形成的两个平面之间的角，不是普通平面键角。',diagram:'anti-periplanar'},
    {term:'Zaitsev/Hofmann',aliases:['Zaitsev','Hofmann','扎伊采夫','霍夫曼'],plain:'消除时可能形成多个烯烃。小碱常偏较多取代的 Zaitsev 烯烃；很大的碱常更容易拿外侧 H，偏 Hofmann。',why:'稳定性与位阻在竞争。',limit:'底物几何和特殊离去基也会改变趋势。',diagram:'zaitsev'},
    {term:'位阻',aliases:['位阻','空间位阻'],plain:'反应位置周围基团太拥挤，让另一个试剂难以靠近。',why:'SN2 需要近距离背面接近，所以对位阻特别敏感。',limit:'位阻也会影响构象、选择性和碱/亲核竞争。',diagram:'steric'},
    {term:'醇',aliases:['醇'],plain:'含 –OH 且 OH 连在饱和碳上的常见有机物。',why:'O 的孤对和 O–H 极性让醇能做酸碱、取代、脱水和氧化。',limit:'酚的 OH 直接连芳环，性质不同。',diagram:'alcohol'},
    {term:'醚',aliases:['醚'],plain:'O 同时连两个碳片段，通式 R–O–R′。',why:'没有 O–H，所以通常比醇不容易被酸碱去质子化，但 O 仍有孤对。',limit:'强酸可使醚裂解。',diagram:'ether'},
    {term:'环氧',aliases:['环氧'],plain:'三元环醚：O 和两个 C 围成一个很小的三角环。',why:'三元环张力高，所以比普通醚更容易被亲核体开环。',limit:'酸性/碱性开环的区域选择不同。',diagram:'epoxide-strain'},
    {term:'氧化',aliases:['氧化'],plain:'有机化学里可先用“C–O/C–X 键增多、C–H 键减少”来识别碳被氧化。',why:'它是电子密度从碳转向更电负性原子的总体趋势。',limit:'严格氧化态可更精确计算。',diagram:'oxidation'},
    {term:'还原',aliases:['还原'],plain:'可先用“C–H 键增多、C–O/C–X 键减少”来识别碳被还原。',why:'与氧化相反，碳获得更多与较低电负性 H 的连接。',limit:'具体还原剂有不同选择性。',diagram:'reduction'},
    {term:'脱水',aliases:['脱水'],plain:'从一个分子中移去 H 和 OH，整体相当于失去 H2O；醇脱水常形成 C=C。',why:'酸先把 OH 变成更好离去的 H2O，再通过消除形成双键。',limit:'一级/二级/三级醇机理可能不同。',diagram:'dehydration'},
    {term:'Williamson 醚合成',aliases:['Williamson'],plain:'RO− 作为亲核体，以 SN2 进攻甲基/一级卤代烃，生成 R–O–R′。',why:'把成熟 SN2 逻辑直接用于“接上两个碳片段到 O 两边”。',limit:'三级卤代烃会强烈竞争 E2。',diagram:'williamson'},
    {term:'Lucas 试验',aliases:['Lucas'],plain:'用浓 HCl/ZnCl2 把醇转成不溶的氯代烃，通过出现浑浊快慢区分某些醇。',why:'能更容易形成稳定碳正离子的醇通常反应更快。',limit:'一级醇常很慢，具体温度和底物会影响。',diagram:'lucas'},
    {term:'孤对电子（氧）',aliases:['氧有两对孤对电子','O 有两对孤对电子'],plain:'中性 O 通常有两对未成键电子；它们可以接 H+ 或攻击亲电中心。',why:'这就是醇、醚、环氧在酸碱和亲核反应里经常“很忙”的根源。',limit:'氧的电负性又会让它强烈拉电子。',diagram:'oxygen-lonepairs'},
    {term:'环张力',aliases:['环张力','角张力','扭转张力'],plain:'小环被迫使用不理想的键角/构象，能量高于更舒展的结构。',why:'开环能释放这部分能量，因此环氧比普通醚更容易被进攻。',limit:'环张力不是唯一反应驱动力。',diagram:'epoxide-strain'},
    {term:'质子化',aliases:['质子化'],plain:'某个原子的孤对电子与 H+ 成键，使它多连一个 H。',why:'质子化常把坏离去基变成好离去基，或增强羰基亲电性。',limit:'是否质子化取决于酸碱平衡。',diagram:'protonation'},
    {term:'Grignard 试剂',aliases:['Grignard','RMg'],plain:'通常写 RMgX，C–Mg 键强烈极化，使 R 端表现得像“带负性的碳亲核体”。',why:'它能把一个碳片段直接接到羰基碳上，是合成 C–C 键的重要工具。',limit:'非常怕水、醇、酸性 H，会被立即淬灭。',diagram:'grignard'},
    {term:'羰基',aliases:['羰基','C=O'],plain:'碳和氧之间的双键 C=O。O 拉电子，所以碳端常 δ+，氧端 δ−。',why:'这种强极化让羰基碳成为许多亲核加成的核心反应中心。',limit:'醛酮和羧酸衍生物的后续机理不同。',diagram:'carbonyl'},
    {term:'醛 / 酮',aliases:['醛','酮'],plain:'都含羰基。羰基碳至少连一个 H 是醛；羰基碳两边都连碳是酮。',why:'这个差别影响氧化、命名和光谱。',limit:'甲醛是特殊醛：羰基碳连两个 H。',diagram:'aldehyde-ketone'},
    {term:'亲核加成',aliases:['亲核加成'],plain:'亲核体先把电子对送给羰基碳，同时 C=O 的 π 电子移到 O，得到四面体结构。',why:'碳要避免超过八电子，因此 Nu 成键时 π 电子必须让开。',limit:'羧酸衍生物随后常还会发生离去，变成“加成—消除”。',diagram:'carbonyl-addition'},
    {term:'四面体中间体',aliases:['四面体中间体'],plain:'羰基碳从平面 sp2 变成四个单键的 sp3 中间体。',why:'这是许多羰基加成、酰基取代共同的中间形态。',limit:'是否能继续回落/离去取决于旁边有没有合适离去基。',diagram:'tetrahedral'},
    {term:'氢化物 H−',aliases:['H⁻','氢化物'],plain:'把 H 看成携带一对电子、能作为亲核体交给羰基碳的形式。NaBH4/LiAlH4 可提供这种“等效 H−”。',why:'H− 加到羰基碳后，C=O 被还原成 C–O。',limit:'溶液中不是自由裸 H− 到处游走。',diagram:'hydride'},
    {term:'氰醇',aliases:['氰醇','HCN'],plain:'CN− 加到羰基碳、O 再质子化后得到同时含 –OH 和 –CN 的产物。',why:'CN− 是碳亲核体，羰基碳是亲电中心。',limit:'HCN/CN− 有毒；这里是理论机理。',diagram:'cyanohydrin'},
    {term:'肟 / 亚胺类衍生物',aliases:['肟','NH₂OH','亚胺'],plain:'含 N 亲核体进攻羰基后脱水，可把 C=O 变成 C=N 相关结构。',why:'仍然从“Nu 攻羰基 C”开始，只是后续脱水。',limit:'不同 N 试剂给不同衍生物。',diagram:'imine'},
    {term:'Tollens 银镜',aliases:['Tollens','银镜'],plain:'Tollens 试剂可氧化多数醛，同时 Ag+ 被还原成金属银。',why:'醛比普通酮更容易被温和氧化成羧酸/羧酸盐。',limit:'有些其他还原性结构也可能阳性。',diagram:'tollens'},
    {term:'Clemmensen / Wolff–Kishner',aliases:['Clemmensen','Wolff','Kishner'],plain:'两套把羰基 C=O 还原成 CH2 的经典方法：一个偏强酸，一个偏强碱/高温。',why:'同一目标转化可根据分子里其他官能团耐酸/耐碱情况选路线。',limit:'选择条件比死背名字更重要。',diagram:'carbonyl-to-methylene'},
    {term:'缩醛',aliases:['缩醛'],plain:'羰基碳与两个 –OR 相连的结构，常由醛/酮和醇在酸催化下形成。',why:'它在很多条件下比羰基稳定，可临时保护 C=O。',limit:'酸性水溶液可水解恢复羰基。',diagram:'acetal'},
    {term:'Wittig 反应',aliases:['Wittig'],plain:'用磷叶立德把 C=O 的氧“换掉”，最终形成 C=C。',why:'它是非常直接的羰基→烯烃碳骨架改造工具。',limit:'这里只先会识别转化，不展开全部叶立德制备。',diagram:'wittig'},
    {term:'羧酸衍生物',aliases:['羧酸衍生物'],plain:'共同含 R–C(=O)–Y 骨架，Y 可以是 Cl、OCOR、OR、NR2 等。',why:'它们共享“亲核酰基取代”母机理，但 Y 离去能力不同导致活性不同。',limit:'羧酸本身也属于相关酰基体系。',diagram:'acyl-family'},
    {term:'酰基',aliases:['酰基'],plain:'R–C(=O)– 这一部分。把它看成“羰基碳 + 它一侧的 R”。',why:'很多羧酸衍生物反应都在同一个酰基碳上换 Y。',limit:'不要把整个 RCOY 都叫酰基。',diagram:'acyl'},
    {term:'亲核酰基取代',aliases:['亲核酰基取代'],plain:'Nu 先攻击羰基碳形成四面体中间体，然后 C=O 重新形成，把 Y 推走。',why:'羰基 π 键可以先让开，而 Y 能作为离去基恢复羰基。',limit:'若 Y 不是好离去基，反应会更难。',diagram:'acyl-sub'},
    {term:'酰氯 / 酸酐 / 酯 / 酰胺',aliases:['酰氯','酸酐','酯','酰胺'],plain:'它们都是 R–C(=O)–Y 家族，只是 Y 不同。通常活性趋势：酰氯 > 酸酐 > 酯 > 酰胺。',why:'Y 的离去稳定性和向羰基回推电子能力不同。',limit:'具体试剂和条件仍会影响。',diagram:'acyl-ranking'},
    {term:'皂化',aliases:['皂化'],plain:'酯在强碱水溶液中水解，最终得到羧酸盐和醇。',why:'生成羧酸后会立刻被碱去质子化成稳定羧酸盐，使反应难以逆转。',limit:'酸化后才得到游离羧酸。',diagram:'saponification'},
    {term:'Hofmann 降解',aliases:['Hofmann 降解','Hofmann rearrangement'],plain:'伯酰胺转成少一个碳的伯胺。原羰基碳在过程中以 CO2 相关形式离开。',why:'这是非常有辨识度的“−1C”工具。',limit:'不要和 E2 的 Hofmann 烯烃混淆。',diagram:'hofmann'},
    {term:'α-H',aliases:['α-H'],plain:'紧邻羰基的 α 碳上的氢。',why:'拿走它后形成的负电荷可以和 C=O 共振分散，所以比普通烷烃 H 更容易被碱拿走。',limit:'不是所有 α-H 都同样酸。',diagram:'alpha-h'},
    {term:'烯醇负离子 enolate',aliases:['enolate','烯醇负离子'],plain:'羰基 α-H 被拿走后得到的共振稳定负离子，电子可以画在 α-C 或 O 上。',why:'它既是碳亲核体又有共振稳定，因此是 Aldol、Claisen、Michael 的共同核心。',limit:'不同碱/温度可控制动力学/热力学 enolate。',diagram:'enolate'},
    {term:'共振',aliases:['共振'],plain:'同一组原子连接不变，只是 π 电子/孤对/电荷的画法不同；真实电子分布是这些极限式的混合。',why:'共振能把电荷分散到多个原子，通常带来稳定。',limit:'共振式不是分子在两张图之间来回跳。',diagram:'resonance'},
    {term:'Aldol',aliases:['Aldol'],plain:'一个羰基先变成 enolate，再攻击另一个羰基，形成新的 C–C 键和 β-羟基羰基。',why:'enolate 是碳亲核体，而另一个羰基碳是亲电中心。',limit:'交叉 Aldol 需要控制谁生成 enolate。',diagram:'aldol'},
    {term:'乙酰乙酸乙酯合成',aliases:['乙酰乙酸乙酯'],plain:'利用 β-二羰基中间亚甲基的酸性：去质子化 → SN2 烷基化 → 水解 → 脱羧，得到取代酮。',why:'把“易形成 enolate”和“脱羧”组合成稳定的增碳路线。',limit:'SN2 烷基化更适合甲基/一级卤代烃。',diagram:'acetoacetic'},
    {term:'丙二酸酯合成',aliases:['丙二酸酯'],plain:'与乙酰乙酸乙酯路线类似，最终脱羧后得到取代乙酸。',why:'双酯基稳定中央 enolate，便于做 C–C 键。',limit:'同样受 SN2 底物限制。',diagram:'malonic'},
    {term:'Dieckmann',aliases:['Dieckmann'],plain:'分子内 Claisen 缩合：同一分子两端酯通过 enolate 进攻闭环，得到环状 β-酮酯。',why:'把“两个反应物”绑在一个分子里会提高分子内成环机会。',limit:'环大小与链长影响是否有利。',diagram:'dieckmann'},
    {term:'Claisen',aliases:['Claisen'],plain:'enolate 去进攻酯羰基，经历亲核酰基取代，得到 β-二羰基。',why:'它把“enolate 亲核体”与“酯的离去基”结合在同一母机理中。',limit:'碱通常要与酯的 OR 基匹配以减少交换。',diagram:'claisen'},
    {term:'Michael 加成',aliases:['Michael'],plain:'亲核体对 α,β-不饱和羰基做 1,4-加成，主要形成新键到 β 碳。',why:'共轭体系把亲电性延伸到了 β 位。',limit:'强硬亲核体有时偏 1,2，加成选择依试剂而变。',diagram:'michael'},
    {term:'β-二羰基',aliases:['β-二羰基'],plain:'两个羰基之间隔一个碳的结构。中间 H 常更酸，因为负电可同时被两侧羰基共振稳定。',why:'因此特别适合生成 enolate 并做烷基化。',limit:'具体酸性取决于羰基类型。',diagram:'beta-dicarbonyl'},
    {term:'脱羧',aliases:['脱羧'],plain:'羧酸/羧酸盐相关结构失去 CO2，碳骨架减少一个碳。',why:'某些 β-羰基酸脱羧后能形成稳定烯醇并迅速互变，驱动反应。',limit:'不是普通羧酸都容易脱羧。',diagram:'decarboxylation'},
    {term:'芳香性',aliases:['芳香性'],plain:'环状、平面、连续共轭并满足 4n+2 π 电子的体系具有额外稳定性。',why:'电子在整个环上离域，比局限在单独双键更稳定。',limit:'只满足“有环”或“有双键”都不够。',diagram:'aromaticity'},
    {term:'离域',aliases:['离域'],plain:'电子不只局限在两原子之间，而分布在多个连续原子/轨道上。',why:'把电荷或 π 电子摊开通常降低能量、增加稳定性。',limit:'离域仍受轨道连续和对称条件限制。',diagram:'delocalization'},
    {term:'Hückel 4n+2',aliases:['4n+2','Hückel'],plain:'单环连续共轭体系若有 2、6、10…个 π 电子，常满足芳香性电子数条件。',why:'这些电子数对应闭壳层稳定的环状分子轨道占据。',limit:'还必须同时满足环状、平面、连续共轭。',diagram:'huckel'},
    {term:'EAS 亲电芳香取代',aliases:['EAS','亲电芳香取代'],plain:'芳环先用 π 电子攻击 E+，短暂失去芳香性，再失去 H+ 恢复芳香性。',why:'这样既能装上新基团，又在最后把宝贵的芳香稳定性拿回来。',limit:'强失活芳环可能很难反应。',diagram:'eas'},
    {term:'σ-络合物',aliases:['σ-络合物','sigma complex'],plain:'EAS 中 E 已和芳环成 σ 键、但芳香性暂时被打断的碳正离子中间体。',why:'不同位置形成的 σ-络合物稳定性决定邻/间/对定位。',limit:'它不是最终产物。',diagram:'sigma-complex'},
    {term:'活化/钝化',aliases:['活化','钝化'],plain:'取代基让芳环比苯更容易/更难做下一次 EAS。',why:'取代基通过共振或诱导改变环上电子密度与 σ-络合物稳定性。',limit:'“活化/钝化”和“定位方向”是两件不同问题。',diagram:'activation'},
    {term:'邻/间/对位',aliases:['邻位','间位','对位','ortho','meta','para'],plain:'以已有取代基为 C1：C2 是邻位，C3 是间位，C4 是对位。',why:'定位规律其实是在比较不同进攻位置产生的中间体稳定性。',limit:'多取代环还要综合多个基团影响。',diagram:'omp'},
    {term:'Friedel–Crafts',aliases:['Friedel','Friedel–Crafts'],plain:'用 Lewis 酸帮助生成强亲电碳物种，把烷基或酰基装到芳环上。',why:'芳环作为 π 电子提供者参与 EAS。',limit:'强失活芳环、某些胺和多烷基化等有禁区。',diagram:'friedel'},
    {term:'胺',aliases:['胺'],plain:'含 N 的有机衍生物，常可看成 NH3 的 H 被碳基团替换。N 上通常保留孤对电子。',why:'这对孤对电子让胺有碱性、亲核性。',limit:'酰胺的 N 孤对因共振而性质明显不同。',diagram:'amine'},
    {term:'重氮盐',aliases:['重氮盐','Ar–N₂⁺'],plain:'芳基与 –N2+ 相连的盐，通常低温由芳香伯胺重氮化得到。',why:'N2 是极稳定气体，很容易离开，所以重氮基是芳环上的“万能转接头”。',limit:'脂肪族重氮体系稳定性不同。',diagram:'diazonium'},
    {term:'Sandmeyer',aliases:['Sandmeyer'],plain:'用 Cu(I) 盐把芳基重氮基换成 Cl、Br、CN 等。',why:'N2 离去提供强驱动力，Cu(I) 帮助实现取代。',limit:'不同目标基团需要不同试剂。',diagram:'sandmeyer'},
    {term:'偶联反应（重氮）',aliases:['偶联','重氮偶联'],plain:'重氮盐不让 N2 离去，而与活化芳环形成 –N=N– 连接，得到偶氮化合物。',why:'活化芳环电子丰富，可进攻重氮阳离子。',limit:'pH 与取代基会强烈影响偶联位置/速率。',diagram:'azo'},
    {term:'腈',aliases:['腈','C≡N','CN'],plain:'含 –C≡N 的官能团；这个 C 是碳骨架的一部分。',why:'因此用 CN− 取代卤代烃后，相当于给碳链增加了 1 个碳。',limit:'CN− 有毒，实验安全另论；这里是理论训练。',diagram:'nitrile'},
    {term:'DBE / 不饱和度',aliases:['DBE','不饱和度'],plain:'一个数字，告诉你分子相对完全饱和开链结构少了多少“2H 单位”。一个环或双键算 1，三键算 2。',why:'在结构推断最开始就能限制环/π 键总数。',limit:'只告诉总数，不告诉具体位置。',diagram:'dbe'},
    {term:'IR 红外光谱',aliases:['IR','红外'],plain:'红外光让化学键发生伸缩/弯曲振动；不同键在不同波数范围吸收。',why:'因此可以像安检一样快速判断有没有 O–H、C=O、C≡N 等官能团。',limit:'很多峰会重叠，不能单靠 IR 唯一确定结构。',diagram:'ir'},
    {term:'波数 cm−1',aliases:['cm⁻¹','波数'],plain:'红外谱横轴常用的单位，与光频率/能量相关。数值越大通常对应更高频振动。',why:'你只需先记住几个高价值区域，不必背整张谱。',limit:'峰位置会受共轭、氢键等影响。',diagram:'wavenumber'},
    {term:'NMR 核磁共振',aliases:['NMR','¹H NMR','核磁'],plain:'把不同化学环境中的 H 当成不同“住址”，通过磁场中的共振信号读取它们的环境、数量和邻居。',why:'它能从看不见的分子里反推出连接关系。',limit:'基础版先用一阶谱；复杂耦合会偏离简单 n+1。',diagram:'nmr'},
    {term:'化学位移 δ / ppm',aliases:['化学位移','ppm'],plain:'NMR 横轴上的“地址”。电子越少、越去屏蔽的 H 往往更靠低场（较大 ppm）。',why:'附近电负性原子、π 系统会改变 H 周围局部磁场。',limit:'不要只靠一个 ppm 猜结构，要结合积分/裂分。',diagram:'chemical-shift'},
    {term:'积分',aliases:['积分'],plain:'一组 NMR 信号下面的总面积，和产生这组信号的等价 H 数量成比例。',why:'它回答“这类 H 有多少个”，不是“峰有多高”。',limit:'OH/NH 等可交换 H 的积分有时不可靠。',diagram:'integration'},
    {term:'裂分 / 多重峰',aliases:['裂分','multiplicity','多重峰'],plain:'一个 H 信号被邻近不等价 H 的自旋相互作用分成多个小峰。简单情况下 n 个等价邻氢常给 n+1 重。',why:'它像告诉你“隔壁大概住几个人”。',limit:'只在简单一阶耦合中直接套 n+1。',diagram:'splitting'},
    {term:'等价氢 / 对称性',aliases:['等价氢','等效氢','对称性'],plain:'如果几个 H 处于相同化学环境，NMR 会把它们看成同一类信号。',why:'分子对称能显著减少信号组数，是排结构的强证据。',limit:'“看起来对称”要结合真实连接/构象判断。',diagram:'symmetry'},
    {term:'手性',aliases:['手性'],plain:'一个结构和自己的镜像不能通过旋转完全重合，就像左手和右手。',why:'这种三维差异会产生对映体并影响旋光/生物作用。',limit:'没有手性中心也可能手性；基础先从四取代碳学。',diagram:'chirality'},
    {term:'手性中心 / 立体中心',aliases:['手性中心','立体中心'],plain:'基础情形下，一个 sp3 碳连着四个不同基团，往往形成一个立体中心。',why:'四个方向的排列有两种互为镜像的可能。',limit:'“四个不同”是常用快速判断，不覆盖全部手性来源。',diagram:'stereocenter'},
    {term:'楔线 / 虚线楔',aliases:['楔线','实楔','虚线楔'],plain:'普通线大致留在纸面；实楔表示键朝观察者伸出，虚线楔表示键伸向纸背后。',why:'它把四面体碳的前后方向压缩到二维试卷上。',limit:'楔线不代表一种新键；换观察方向后纸面画法也可能改变。',diagram:'stereocenter'},
    {term:'对映体',aliases:['对映体'],plain:'连接相同、互为镜像、但不能重合的一对立体异构体。',why:'像左手/右手，镜像关系无法靠旋转消除。',limit:'非手性环境下很多物理性质相同。',diagram:'enantiomer'},
    {term:'非对映体',aliases:['非对映体'],plain:'不是互为镜像的立体异构体。',why:'多个立体中心中只改变部分构型，就常形成非对映关系。',limit:'它们物理化学性质通常可以不同。',diagram:'diastereomer'},
    {term:'meso',aliases:['meso'],plain:'含多个立体中心但整体因内部对称而不手性的结构。',why:'内部镜面对称让整个分子与镜像可重合。',limit:'不能只数手性中心判断是否手性。',diagram:'meso'},
    {term:'CIP 规则',aliases:['CIP'],plain:'给立体中心四个基团排优先级的一套规则：先比直接相连原子的原子序数，相同再向外逐层比。',why:'统一优先级后，R/S、E/Z 才能客观命名。',limit:'多键要按“复制原子”规则处理。',diagram:'cip'},
    {term:'R/S',aliases:['R/S'],plain:'把最低优先级 4 放到背后，观察 1→2→3：顺时针 R，逆时针 S。',why:'这是给同一连接方式的三维排列一个可重复的名字。',limit:'反应后要重新排 CIP，不能机械说“SN2 一定 R↔S 标签互换”。',diagram:'rs'},
    {term:'E/Z',aliases:['E/Z'],plain:'双键两端各按 CIP 选高优先基团：同侧 Z，异侧 E。',why:'双键不能自由旋转，因此两侧空间关系可形成稳定异构。',limit:'不是所有双键都能定义 E/Z。',diagram:'ez'},
    {term:'Fischer 投影',aliases:['Fischer'],plain:'一种固定二维投影：横线朝向观察者，竖线背向观察者。',why:'它让多手性中心链状分子的三维信息能在纸上统一表达。',limit:'不能随意旋转 90° 而保持构型。',diagram:'fischer'},
    {term:'Newman 投影',aliases:['Newman'],plain:'沿着一根 C–C 单键正视，把前碳画成点、后碳画成圆，比较构象。',why:'它能直观看重叠、交叉、anti/gauche 和 E2 几何。',limit:'描述的是构象，不是新的连接异构体。',diagram:'newman'},
    {term:'错开式 / 重叠式',aliases:['staggered','eclipsed','错开式','重叠式'],plain:'沿 C–C 键看，前后键彼此错开叫 staggered；前后键在视线上重叠叫 eclipsed。',why:'错开能减少电子云正面挤压，通常能量更低。',limit:'具体稳定性还要看取代基大小与其他相互作用。',diagram:'newman'},
    {term:'轴向 / 赤道向',aliases:['axial','equatorial','轴向','赤道位','赤道向'],plain:'椅式环己烷中，axial 键大致沿环的竖直方向；equatorial 键向环外围伸。',why:'大基团放赤道向通常能减少与 1,3-diaxial H 的近距离拥挤。',limit:'ring flip 会交换 axial/equatorial，但不会改变 up/down。',diagram:'conformation'},
    {term:'环翻转 ring flip',aliases:['ring flip','环翻转','翻环'],plain:'环己烷从一个椅式换到另一个椅式的构象变化。',why:'它让每个取代基在 axial 与 equatorial 之间交换，方便比较构象稳定性。',limit:'它不把 up 变 down，也不改变原子连接。',diagram:'conformation'},
    {term:'endo / exo',aliases:['endo/exo','endo','exo'],plain:'在桥环型 Diels–Alder 产物中，取代基朝桥下/新 π 系统方向叫 endo，朝桥外叫 exo。',why:'连接相同也可能有不同空间朝向，进而影响产物选择性。',limit:'“endo 常优先”是经典条件下的常见动力学趋势，不是无边界死规则。',diagram:'diels-alder'},
    {term:'构象',aliases:['构象'],plain:'不需要断键，仅通过单键旋转得到的不同空间姿势。',why:'不同构象能量不同，会影响稳定性和反应几何。',limit:'双键或环会限制自由旋转。',diagram:'conformation'},
    {term:'共振效应',aliases:['共振效应'],plain:'取代基通过连续 p 轨道/π 系统把电子推入或拉出某位置的影响。',why:'它能显著稳定/ destabilize 电荷与中间体。',limit:'必须有轨道共轭才能传递。',diagram:'resonance-effect'},
    {term:'分子间作用力',aliases:['分子间作用力','氢键'],plain:'不同分子之间的吸引，包括氢键、偶极作用、色散力等。',why:'它直接影响沸点、溶解度和物态。',limit:'不是分子内部的共价键。',diagram:'intermolecular'},
    {term:'逆合成',aliases:['逆合成','retrosynthesis'],plain:'从目标分子往后倒推：最后一步可能是什么？它的前体应该长什么？',why:'复杂多步合成从终点拆，比从起点盲猜试剂更容易。',limit:'每次逆推必须再正向验证化学可行性。',diagram:'retrosynthesis'},
    {term:'官能团互变 FGI',aliases:['FGI','官能团互变'],plain:'不改变主要碳骨架，只把一种官能团转换成另一种，例如醇↔羰基、卤代烃→腈。',why:'合成路线里很多步骤本质上是在“换把手”。',limit:'实际试剂可能同时影响其他官能团。',diagram:'fgi'},
    {term:'断键分析 disconnection',aliases:['disconnection','逆合成断键'],plain:'逆合成里把目标的一根关键键“想象剪开”，得到两个更容易获得的前体片段。',why:'最好剪那些你已经学过可靠成键反应能重新接上的键。',limit:'这是思维操作，不是说正向反应一定真的先把目标剪开。',diagram:'disconnection'},
    {term:'前体',aliases:['前体'],plain:'能通过一步或少数步骤转成当前目标的较早结构。',why:'逆合成每退一步，就是在找一个更简单、更可获得的前体。',limit:'前体还需检查实际反应条件。',diagram:'precursor'},
    {term:'步骤顺序',aliases:['步骤顺序','合成顺序'],plain:'多步合成里同样几步反应，先后顺序不同可能导致完全不同结果。',why:'前一步会改变电子效应、定位方向或让后一步试剂被别的官能团消耗。',limit:'必须逐步画中间体，不能只列试剂名称。',diagram:'sequence-order'},
    {term:'兼容性',aliases:['兼容','兼容性'],plain:'某一步试剂会不会顺手破坏分子里另一个你还想保留的官能团。',why:'多步合成真正难处常在步骤之间“互相打架”。',limit:'兼容性与选择性、保护基密切相关。',diagram:'compatibility'},
    {term:'保护基',aliases:['保护基','保护'],plain:'把一个暂时不希望反应的官能团转成较惰性的形式，完成主反应后再恢复。',why:'它让“正确的位点在正确的时间反应”。',limit:'保护/脱保护也要消耗步骤，能不用则尽量不用。',diagram:'protection'},
    {term:'化学选择性',aliases:['化学选择性','选择性'],plain:'分子里有多个可能反应的位置时，试剂主要选哪一个。',why:'高选择性路线能减少副反应和保护步骤。',limit:'区域选择、立体选择是更具体的选择性类型。',diagram:'chemoselectivity'}
  ];

  // Slow Day 1 down further: these pages appear before every previous Day 1 page.
  const day1 = Data.days?.[1];
  if (day1 && Array.isArray(day1.lessons)) {
    const firstSteps = [
      {
        id:'d01-pre-00-atoms', eyebrow:'Day 1 · 先把字母变成东西',
        title:'C、H、O 不是密码：它们先只是“不同种类的原子”',
        body:'第一次看有机结构，不要急着反应。先知道 C 是碳、H 是氢、O 是氧、N 是氮、Br 是溴。写在一起的 CH₃ 不是 3 个碳，而是“1 个 C 连着 3 个 H”。右下角的小数字只告诉你这种原子有几个。',
        note:'这一页只练一件事：看到符号时，脑中能说出“几个什么原子”。',
        formulas:['CH₃ = 1 个 C + 3 个 H','CH₂ = 1 个 C + 2 个 H','OH = 1 个 O + 1 个 H'],
        analogy:{title:'像乐高零件上的字母标签',body:'C、H、O 是不同类型的零件；下标 3 只是说“这里配了 3 个 H 小零件”，不是把 C 变成三个。',boundary:'真实原子当然不是塑料积木；这个类比只帮你读符号。'},
        sequence:[
          {title:'先认符号',text:'C=碳，H=氢，O=氧，N=氮，Br=溴。',formula:'C   H   O   N   Br',diagram:'symbols'},
          {title:'再看下标',text:'CH₃ 里只有一个 C；3 只属于 H。',formula:'C H₃',diagram:'molecule'},
          {title:'最后把它读成一句话',text:'CH₃ 可以读成“一个碳，外加三个氢”。',formula:'CH₃ = C + H + H + H',diagram:'atom-count'}
        ],
        microCheck:{prompt:'CH₂ 里有几个碳原子？',options:['1 个','2 个','3 个'],answer:0,feedback:'下标 2 写在 H 后面，所以是 2 个 H；C 没有下标，默认 1 个。'}
      },
      {
        id:'d01-pre-01-bond', eyebrow:'Day 1 · 一根线到底是什么',
        title:'C—C 这根线不是小棍子：它代表“一对被共享的电子”',
        body:'两个原子能连在一起，是因为有一对电子同时被两边共同使用。结构式为了省事，不把两个电子点点都画出来，而是用一根线代替。所以以后说“成键”，是在说一对电子开始被两个原子共享；说“断键”，是在问原来那对电子不再共享以后归谁。',
        note:'这是后面所有机理最底层的一句话。不要急着记机理画法，先把“一根线=一对共享电子”刻进脑子。',
        formulas:['A:B  ≈  A—B','一根普通共价键 = 1 对共享电子'],
        analogy:{title:'像两个人共同捏住同一根绳子的两端',body:'这根绳子不是“某个人的”，而是两边共同使用。成键就是开始共同使用；断键就是不再共享，并重新分配这对电子。',boundary:'电子不是绳子，也没有固定小球轨迹；这个类比只帮你理解“共享”。'},
        sequence:[
          {title:'没有连接时',text:'A 和 B 各自存在。',formula:'A     B',diagram:'atoms-apart'},
          {title:'一对电子成为共享资源',text:'这两个电子同时属于 A–B 这个键。',formula:'A : B',diagram:'bond-pair'},
          {title:'结构式把两个点缩写成一根线',text:'所以 A:B 和 A—B 在这层意思上等价。',formula:'A:B  →  A—B',diagram:'bond-line'}
        ],
        microCheck:{prompt:'结构式里的一根普通单键最先可以理解成什么？',options:['一个原子','一对共享电子','一个正电荷'],answer:1,feedback:'对，一根线是把“一对共享电子”压缩成最容易读的画法。'}
      },
      {
        id:'d01-pre-02-valence', eyebrow:'Day 1 · 为什么会写 CH₃、CH₂、CH',
        title:'碳不是随便接：先用“常见 4 键”把缺的 H 补出来',
        body:'基础有机结构里，中性碳最常见是周围总共 4 根键。双键要算两根，三键算三根。于是一个碳如果已经和别的碳形成 1 根单键，还剩 3 个常见成键位置，就会写成 CH₃；如果已经参与 C=C 双键并再连一个碳，已经用了 3 根键，只剩 1 个 H，所以写 CH。',
        note:'这不是为了背 CH₃/CH₂，而是让你以后自己检查结构。',
        formulas:['C：常见总键数 4','单键算 1；双键算 2；三键算 3'],
        analogy:{title:'像一个常见有 4 个接口的插线板',body:'已经插了几条线，就用 H 把剩余接口补满。双键相当于同时占两个接口。',boundary:'碳也有带电/自由基等例外，这里先学中性常见结构。'},
        sequence:[
          {title:'只连一个 C',text:'已经用 1 个接口，还剩 3 个给 H。',formula:'—C  →  CH₃',diagram:'c-ch3'},
          {title:'左右各连一个 C',text:'用了 2 个接口，还剩 2 个 H。',formula:'—C—  →  CH₂',diagram:'c-ch2'},
          {title:'参与一个双键，再连一个 C',text:'双键占 2，单键占 1，只剩 1 个 H。',formula:'—CH=C',diagram:'c-ch'}
        ],
        microCheck:{prompt:'在 CH₃–CH=CH₂ 中，中间那个 C 为什么只写 CH？',options:['它已经有 3 根键的份额，只剩 1 个 H','因为 H 随机少了','因为双键不算键'],answer:0,feedback:'中间碳：左边单键 1 + 右边双键 2 = 3，所以再连 1 个 H 就到常见 4 键。'}
      },
      {
        id:'d01-pre-03-readmap', eyebrow:'Day 1 · 把一串字拆成一张地图',
        title:'现在再看 CH₃–CH=CH₂：你已经能自己数碳、数键、补 H 了',
        body:'从左到右每出现一个 C，就是一个碳原子节点。中间短线是单键，“=”是双键。你不需要一次理解整个分子，只要顺着连接读过去：第 1 个碳—第 2 个碳=第 3 个碳。于是你已经看懂了最基础的碳骨架。',
        note:'以后遇到更长结构，也永远先“顺着碳走一遍”，再看特殊位置。',
        formulas:['CH₃–CH=CH₂  →  C1–C2=C3'],
        analogy:{title:'像读地铁图：先沿主线走，不要同时盯所有站',body:'C1、C2、C3 是站点，单键/双键是不同线路连接。先把主线走通，再研究哪个站是重点。',boundary:'真实分子不是一条平面铁路线。'},
        sequence:[
          {title:'找到第一个 C',text:'CH₃ 里只有一个 C，把它编号 C1。',formula:'C1',diagram:'read-c1'},
          {title:'沿线找到第二个 C',text:'短线连接到 CH，所以这是 C2。',formula:'C1—C2',diagram:'read-c2'},
          {title:'看到“=”不要慌',text:'它表示 C2 和 C3 之间有双键。',formula:'C1—C2=C3',diagram:'read-c3'},
          {title:'再把 H 放回去',text:'价数检查后就是 CH₃–CH=CH₂。',formula:'CH₃–CH=CH₂',diagram:'read-full'}
        ],
        microCheck:{prompt:'CH₃–CH₂–CH₃ 一共有几个碳节点？',options:['2','3','8'],answer:1,feedback:'每个 CH₃/CH₂ 中的 C 都是一个碳节点，所以共 3 个。'}
      },
      {
        id:'d01-pre-04-sigmapi', eyebrow:'Day 1 · 双键终于拆开来看',
        title:'“=”不是两根一样的线：里面一根是 σ，一根是 π',
        body:'两个碳之间先能沿核—核连线正面对接形成 σ 键；每个碳还各留下一个 p 轨道，它们平行后从侧面重叠，形成第二套连接——π 键。π 电子云主要分布在 C–C 连线的上方和下方，侧向重叠通常更弱、电子也更暴露，所以很多烯烃反应优先拿 π 电子去形成新键。',
        note:'现在才正式出现 σ、π、p 轨道。下面三张图看懂，比背“π 活泼”更重要。',
        formulas:['C=C = 1 σ + 1 π'],
        analogy:{title:'σ 像两个人正面握手，π 像两只手臂从上下侧面再搭住',body:'正面握手对得最正；侧面搭住是额外连接，更容易先被拿去做新的连接。',boundary:'轨道不是手臂；真正关键是轨道重叠方式和能量。'},
        sequence:[
          {title:'先有 σ 键',text:'两个碳沿核连线方向正面对接。',formula:'C—C   (σ)',diagram:'sigma'},
          {title:'每个碳还各有一个 p 轨道',text:'p 轨道像上下两个叶瓣，必须近似平行。',formula:'p   p',diagram:'p-orbital'},
          {title:'两个 p 轨道侧向重叠',text:'上方和下方形成 π 电子云。',formula:'C=C = σ + π',diagram:'pi'},
          {title:'为什么通常先动 π',text:'侧向重叠相对弱、电子云更暴露，所以它是很多加成的电子来源。',formula:'π 电子 → 新 σ 键',diagram:'sigma-pi'}
        ],
        microCheck:{prompt:'烯烃典型加成中，通常先被消耗的是哪一部分？',options:['C–C 的 σ','C=C 的 π','所有 C–H'],answer:1,feedback:'原 C–C σ 通常保留；π 电子被重新分配去形成新的 σ 键。'}
      }
    ];
    const ids = new Set(day1.lessons.map(x => x.id));
    day1.lessons = [...firstSteps.filter(x => !ids.has(x.id)), ...day1.lessons];
    const sigmaPiIndex = day1.lessons.findIndex(x => x.id === 'd01-pre-04-sigmapi');
    if (sigmaPiIndex >= 0) {
      day1.lessons.splice(sigmaPiIndex, 1,
        {
          id:'d01-pre-04-hydrocarbon', eyebrow:'Day 1 · 分子先分成几类',
          title:'先只认识三兄弟：烷烃、烯烃、炔烃',
          body:'“烃”只表示这个分子目前只有 C 和 H。若碳之间只有单键，叫烷烃；出现 C=C，叫烯烃；出现 C≡C，叫炔烃。今天真正要学的是烯烃，因为 C=C 会提供一套比普通单键更容易参与反应的电子。',
          note:'分类不是为了背名字，而是为了你一眼知道“这个分子的反应把手在哪里”。',
          formulas:['烷烃：只有 C–C','烯烃：含 C=C','炔烃：含 C≡C'],
          analogy:{title:'像先看车辆类型，再决定用什么路规',body:'自行车、汽车、火车都能“移动”，但规则不一样；烷烃、烯烃、炔烃也都是 C/H 骨架，却因键型不同而有不同典型反应。',boundary:'一个复杂分子可以同时含多个官能团，不一定只属于一类。'},
          sequence:[
            {title:'只有单键',text:'先叫烷烃。',formula:'C–C',diagram:'carbon-skeleton'},
            {title:'出现双键',text:'含 C=C 的就是烯烃。',formula:'C=C',diagram:'sigma-pi'},
            {title:'出现三键',text:'含 C≡C 的就是炔烃。Day3 再详细学。',formula:'C≡C',diagram:'acetylide'}
          ],
          microCheck:{prompt:'CH₃–CH=CH₂ 属于哪一类？',options:['烷烃','烯烃','炔烃'],answer:1,feedback:'它含 C=C，所以是烯烃。'}
        },
        {
          id:'d01-pre-05-sigma', eyebrow:'Day 1 · 双键先拆第一层',
          title:'σ 键是什么：先理解“正面对接”的主连接',
          body:'两个碳的轨道沿着两颗原子核之间的直线正面对接，会形成 σ 键。你可以把它看成两个碳之间最直接、最牢的主连接。C=C 里首先就有这一根 σ 键。',
          note:'这页只学 σ，不急着同时背 π。',
          formulas:['C—C 的主连接：σ'],
          analogy:{title:'像两只手正面握住',body:'正面对得最齐，重叠区域集中在两核连线上。',boundary:'轨道是电子概率分布，不是真正的手。'},
          sequence:[
            {title:'两个碳先靠近',text:'先沿核—核方向对接。',formula:'C     C',diagram:'sigma'},
            {title:'正面重叠',text:'电子密度集中在两核连线上。',formula:'C—C  (σ)',diagram:'sigma'},
            {title:'这根主连接以后常保留',text:'烯烃加成多数先改 π，而 C—C σ 还在。',formula:'C=C → C–C',diagram:'addition'}
          ],
          microCheck:{prompt:'σ 键的电子密度主要沿哪里分布？',options:['两原子核连线方向','只在分子外面','完全不在两核之间'],answer:0,feedback:'对，σ 键是沿两核连线方向的正面重叠。'}
        },
        {
          id:'d01-pre-06-pi', eyebrow:'Day 1 · 双键再拆第二层',
          title:'π 键是什么：两个 p 轨道从侧面搭在一起',
          body:'形成 σ 后，每个双键碳还各有一个 p 轨道。两个 p 轨道近似平行，从侧面重叠，于是电子云出现在 C–C 连线的上方和下方，这就是 π 键。侧面重叠比正面对接更弱，电子云也更暴露，所以很多烯烃反应会先把这对 π 电子拿去形成新的 σ 键。',
          note:'现在你才真正有资格理解“π 键比较活泼”这句话，因为你已经知道它长在哪里、为什么更容易被动。',
          formulas:['C=C = 1 σ + 1 π','π 电子 → 新 σ 键'],
          analogy:{title:'σ 像正面握手，π 像上下两侧又搭了一层手臂',body:'侧面那层更容易先被拆开，拿去和新的原子建立更牢的正面连接。',boundary:'“更容易拆”来自轨道重叠与能量差，不是手臂松紧。'},
          sequence:[
            {title:'先看 p 轨道',text:'每个碳都有一个上下两瓣的 p 轨道。',formula:'p   p',diagram:'p-orbital'},
            {title:'两个 p 轨道侧向重叠',text:'电子云在键轴上方和下方。',formula:'π',diagram:'pi'},
            {title:'双键现在完整了',text:'中间主连接是 σ，上下额外连接是 π。',formula:'C=C = σ + π',diagram:'sigma-pi'},
            {title:'为什么加成先动 π',text:'π 更暴露、侧向重叠相对弱，常先拿去形成新的 σ 键。',formula:'π → 2 个新 σ',diagram:'addition'}
          ],
          microCheck:{prompt:'为什么烯烃典型加成通常先动 π 而不是原 C–C σ？',options:['π 侧向重叠较弱且电子更暴露','σ 根本不是键','π 里面没有电子'],answer:0,feedback:'这就是后面所有烯烃加成的第一层物理直觉。'}
        }
      );
    }
    day1.estimatedMinutes = Math.max(Number(day1.estimatedMinutes || 0), 105);
    const duplicate = day1.lessons.find(x => x.id === 'd01-zero-01-language');
    if (duplicate) {
      duplicate.title = '把刚才的四个动作合在一起：自己读一遍结构式';
      duplicate.body = '你已经分别学过原子符号、键、碳的常见 4 键和双键里的 σ/π。现在把它们合起来，不再引入新理论：看到 CH₃–CH=CH₂，先数 3 个 C，再标出 C2=C3，最后用价数检查每个 H 是否合理。';
      duplicate.note = '这一页是第一次“整合练习”，不是继续塞新名词。';
    }
  }

  // Rewrite the screenshot-confusing lesson before the term cards are attached.
  const stable = Data.days?.[1]?.lessons?.find(x => x.id === 'd01-zero-07-why-stable');
  if (stable) {
    stable.title = '先别背“三级 > 二级 > 一级”：先弄懂这里的“一级”到底在数什么';
    stable.body = '现在只盯住“带正电的那个碳”。不要数整个分子，也不要先想复杂名词。第一步只数：这个带 + 的碳，直接连着几个别的碳？连 1 个叫一级，连 2 个叫二级，连 3 个叫三级。为什么要数这个？因为旁边的 C–H / C–C 键能通过轨道重叠，稍微帮这个缺电子的碳分担电子不足。邻居通常越多，能帮忙的机会越多，于是这个碳正离子能量更低、更容易被形成。';
    stable.note = '这一页先把“一级/二级/三级、烷基、σ 键、超共轭”逐个解释清楚，再看稳定性顺序。';
    stable.sequence = [
      {title:'先找到真正要分级的碳',text:'找带 + 的碳。它就是中心，不要数别的地方。',formula:'R–CH₂⁺   /   R₂CH⁺   /   R₃C⁺',diagram:'carbon-degree'},
      {title:'一级到底是什么意思',text:'带 + 的碳直接连 1 个“别的碳”，所以叫一级。R 只是一个碳氢片段的简写。',formula:'R–CH₂⁺  →  中心 C 只有 1 个碳邻居',diagram:'primary-carbocation'},
      {title:'二级为什么多一个“帮手”',text:'中心 C 连 2 个碳邻居。每个邻居附近都有 C–H/C–C σ 键，它们的电子密度能和中心空 p 轨道有一点重叠。',formula:'R₂CH⁺  →  2 个碳邻居',diagram:'secondary-carbocation'},
      {title:'这就叫“超共轭”',text:'不是把完整电子送给 C⁺，而是邻近 σ 键和空 p 轨道发生重叠，让正电荷不那么集中。',formula:'邻近 σ 键 ⇢ 空 p 轨道  →  正电荷被分散一些',diagram:'hyperconjugation'},
      {title:'最后才得到顺序',text:'在这个基础模型里，邻近烷基越多，通常越能稳定 C⁺。',formula:'3° C⁺ > 2° C⁺ > 1° C⁺ > CH₃⁺',diagram:'carbocation-stability'}
    ];
    stable.whyChain = [
      '为什么碳正离子“缺电子”？因为普通中性碳常围绕自己达到 8 个价层电子，而典型碳正离子只有 6 个。',
      '为什么“一级/二级/三级”要数碳邻居？因为我们关心的正是中心碳旁边有多少烷基能通过邻近 σ 键参与稳定。',
      '为什么邻居能帮忙？不是“好心借电子”，而是相邻 σ 键电子云与空 p 轨道能够发生一定重叠。',
      '为什么稳定的中间体对应路径更有利？因为形成它需要到达的能量通常更低，相关反应路径更容易竞争成功。'
    ];
  }

  const d1wonder = Data.days?.[1]?.lessons?.find(x => x.id === 'd01-zero-08-wonder');
  if (d1wonder) {
    d1wonder.body = '到这里你已经有了一套可以反复使用的语言：结构式是连接地图，官能团是反应把手，键是一对共享电子，断键要追踪电子归属，成键要找到电子来源与电子缺口，条件会改变电子运动路径。后面你会遇到很多新名字，但先不用管那些名字；我们会在它们第一次真正出现时逐个解释。';
    d1wonder.note = '这一页只收束今天已经解释过的概念，不提前塞后面的术语。';
  }
  const d1bromine = Data.days?.[1]?.lessons?.find(x => x.id === 'd01-lesson-bromine');
  if (d1bromine) d1bromine.note = '今天先把 Br₂ 对双键的加成看懂。后面出现新的溴化条件时，再单独解释它为什么会走另一条路。';
  const d1summary = Data.days?.[1]?.lessons?.find(x => x.id === 'd01-lesson-summary');
  if (d1summary) d1summary.note = 'Day 2 会加入更多会“改路线”的条件；每个新条件第一次出现时都会先解释它是什么、为什么会改变电子路径。';

  function flattenLessonText(lesson) {
    return [lesson.title, lesson.body, lesson.note, ...(lesson.formulas || []), ...(lesson.sequence || []).flatMap(s => [s.title,s.text,s.formula])].filter(Boolean).join(' ');
  }
  const seen = new Set();
  for (let d = 1; d <= 20; d += 1) {
    const day = Data.days[d];
    if (!day) continue;
    for (const lesson of day.lessons || []) {
      const text = flattenLessonText(lesson);
      lesson.termCards = lesson.termCards || [];
      for (const entry of GLOSSARY) {
        if (seen.has(entry.term)) continue;
        if ((entry.aliases || [entry.term]).some(alias => text.includes(alias))) {
          lesson.termCards.push(entry);
          seen.add(entry.term);
        }
      }
    }
  }
  Data.BEGINNER_GLOSSARY = GLOSSARY;
  Data.BEGINNER_GLOSSARY_COVERED = [...seen];

  // Visual storyboards for key invisible processes. Trusted static ids, rendered by app.js.
  const STEP_DIAGRAMS = {
    'd01-zero-01-language':['bond-map','bond-pair','valence'],
    'd01-zero-02-groups':['carbon-skeleton','functional-handle','functional-handle'],
    'd01-zero-03-electrons':['electron-rich','electron-poor','new-bond'],
    'd01-zero-04-break-bond':['bond-pair','heterolysis','homolysis'],
    'd01-zero-06-hbr-movie':['hbr-polarity','pi-to-h','hbr-break','carbocation','br-to-cation'],
    'd01-zero-07-why-stable':['carbon-degree','primary-carbocation','secondary-carbocation','hyperconjugation','carbocation-stability'],
    'd02-zero-02-radical':['homolysis','radical-propagation','radical-stability'],
    'd02-zero-03-cut-double':['ozone-scissors','ozone-split','ozone-products'],
    'd03-zero-01-hybridization':['remove-h','hybridization','conjugate-base'],
    'd03-zero-02-carbon-nucleophile':['acetylide','electrophilic-carbon','cc-bond','leaving-br'],
    'd03-zero-03-diene':['conjugated-p','diene-four','diels-ring'],
    'd04-zero-01-roles':['nucleophile','electrophilic-carbon','leaving-group'],
    'd04-zero-02-sn2-why-back':['sn2-lineup','sn2-attack','sn2-transition','inversion'],
    'd04-zero-03-sn1-wait':['sn1-ionize','rearrangement','sn1-capture'],
    'd05-zero-01-base-vs-nu':['substitution-path','elimination-path','bulky-base'],
    'd05-zero-02-alpha-beta':['alpha-carbon','beta-carbon','beta-h'],
    'd06-zero-01-oxygen':['oxygen-polarity','oxygen-lonepairs','protonation'],
    'd06-zero-02-epoxide-strain':['epoxide-60','epoxide-attack','epoxide-open'],
    'd07-zero-01-carbonyl-polar':['carbonyl-polar','carbonyl-poor-c','nucleophile-carbonyl'],
    'd07-zero-02-carbonyl-names':['aldehyde','ketone','aldehyde-ketone'],
    'd08-zero-01-acyl-family':['acyl-core','acyl-family','acyl-sub'],
    'd09-zero-01-alpha':['alpha-carbonyl','remove-alpha-h','enolate-resonance'],
    'd09-zero-02-aldol-bond':['enolate-carbon','carbonyl-target','aldol-newbond'],
    'd10-zero-01-unify-enolate':['aldol-target','claisen-target','michael-target'],
    'd11-zero-01-aromatic':['benzene-p','benzene-delocalized','eas-restore'],
    'd11-zero-02-ortho-meta-para':['benzene-numbering','ortho-meta-para','ortho-meta-para'],
    'd12-zero-01-amine-lonepair':['amine-lonepair','amine-protonate','amine-protonated'],
    'd12-zero-02-diazonium':['diazonium','n2-leave','diazonium-substitute'],
    'd13-zero-01-dbe-intuition':['saturated','minus-h2','dbe-options'],
    'd13-zero-02-ir':['bond-vibration','ir-peak','ir-functional'],
    'd14-zero-01-nmr-why':['nmr-address','nmr-integration','nmr-splitting','nmr-symmetry'],
    'd15-zero-01-stereo':['mirror-hands','mirror-molecule','enantiomer'],
    'd15-zero-02-cip':['cip-priority','cip-back','rs-turn'],
    'd16-zero-02-arrow-grammar':['arrow-tail','arrow-head','arrow-bond'],
    'd17-zero-01-retro':['retro-compare','retro-disconnect','retro-forward'],
    'd18-zero-02-protection':['conflict','protection','main-reaction','deprotect']
  };
  for (const day of Object.values(Data.days)) {
    for (const lesson of day.lessons || []) {
      const ids = STEP_DIAGRAMS[lesson.id];
      if (!ids) continue;
      (lesson.sequence || []).forEach((step, i) => { if (!step.diagram && ids[i]) step.diagram = ids[i]; });
    }
  }
})();
