(function(){
'use strict';
const Data=window.Organic637Data=window.Organic637Data||{};Data.days=Data.days||{};
const SK=Data.SKILLS=Array.isArray(Data.SKILLS)?Data.SKILLS:[];
const G=Data.BEGINNER_GLOSSARY=Array.isArray(Data.BEGINNER_GLOSSARY)?Data.BEGINNER_GLOSSARY:[];
const addSkill=(row)=>{if(!SK.some(x=>x.id===row.id))SK.push(row)};
const addTerm=(row)=>{if(!G.some(x=>x.term===row.term))G.push(row)};
const addLesson=(day,row,afterId=null)=>{const a=Data.days?.[day]?.lessons;if(!a||a.some(x=>x.id===row.id))return;let i=afterId?a.findIndex(x=>x.id===afterId):-1;if(i<0)a.push(row);else a.splice(i+1,0,row)};
const addQuestion=(day,row)=>{const a=Data.days?.[day]?.questions;if(a&&!a.some(x=>x.id===row.id))a.push(row)};

Data.COURSE_SLOGAN='学懂有机，会做真题';
Data.EXAM_AUDIT={
  official:'南京工业大学 637《有机化学》2026考试大纲',
  examTypes:['填空题','选择题','简答题','结构推导题','合成路线设计题'],
  officialCore:'结构、命名、性质、官能团相互转换、立体化学、典型反应历程与合成设计',
  recentWeights:[
    {year:2024,note:'结构推断35 + 机理18 + 合成40 = 93/150'},
    {year:2023,note:'结构推断25 + 机理20 + 合成44 = 89/150'},
    {year:2022,note:'结构推断30 + 机理24 + 合成40 = 94/150'},
    {year:2020,note:'排序16 + 结构24 + 机理12 + 合成24；非纯记忆板块约88/150'}
  ],
  policy:'训练题若未逐字核对原卷，只标“真题同型/真题能力”，绝不冒充某年原题。'
};

const DAY={
1:{title:'把结构式读成人话，是后面所有真题的地基',formats:['填空：结构/命名','选择：加成产物','简答：为什么这样加成'],anchor:'历年单步反应与命名结构题都会默认你能迅速找到 C=C；这里先把“默认”拆掉。',goal:'看到结构先数碳、圈官能团、找电子多/少，再判断产物。'},
2:{title:'真题最爱把“同一个底物 + 不同条件”混在一起',formats:['填空：写产物','选择：条件辨别','简答：自由基/区域选择'],anchor:'条件本身就是题目语言；HBr 与 HBr/ROOR、Br₂ 与 NBS/hν 不能只看前半截。',goal:'先逐字翻译试剂，再决定走哪条机理。'},
3:{title:'炔烃题常把酸碱、增碳、选择性还原揉在一起',formats:['排序：酸性','填空：炔负离子/水合','合成：C–C增碳'],anchor:'真题不会提示“这是端炔酸性题”，而是把强碱、卤代烃、还原条件放在同一反应串里。',goal:'能从 pKa、电子来源和碳数账判断路线。'},
4:{title:'卤代烃是近年条件判别与机理解释的高频枢纽',formats:['选择：底物/溶剂/亲核体','排序：SN2/SN1活性','简答/机理：反转与重排'],anchor:'已审计近年锚点包括 AgNO₃/EtOH、KI/acetone、SN2立体后果与SN1理由；本日训练都围绕这些能力。',goal:'不背四张表，能从底物→试剂→溶剂→温度一步步判路。'},
5:{title:'真题的四路竞争，考的是“谁更占优势”',formats:['选择：SN/E竞争','填空：主产物','机理：E2箭头','简答：区域/几何'],anchor:'很多错题并非不知道SN2/E2，而是没有把位阻、碱性、温度、β-H一起比较。',goal:'每题都写一张小决策表，再选主路径。'},
6:{title:'醇/醚/环氧把前面“取代、消除、亲核进攻”串成网络',formats:['填空：试剂/产物','选择：Lucas/开环','合成：Williamson/环氧增碳'],anchor:'真题经常把同一含氧底物在不同条件下互转，关键是先判断 O 是亲核、离去还是被质子化。',goal:'看到 O 先数孤对电子、酸碱状态和环张力。'},
7:{title:'羰基是机理、结构推断与合成三大板块的共同核心',formats:['填空：加成/还原/氧化','机理：Nu→C=O','合成：Grignard/Wittig','结构：醛酮证据'],anchor:'近年高分板块结构推断、机理、合成都频繁经过 C=O；羰基必须学成“母逻辑”而不是反应清单。',goal:'看到 C=O 先标 Cδ+ / Oδ−，再问电子从哪来。'},
8:{title:'羧酸衍生物真题的关键不是名字多，而是同一个“加成—消除”母机理',formats:['排序：活性','填空：水解/酯化','机理：四面体中间体','合成：衍生物互转'],anchor:'把酰氯/酸酐/酯/酰胺排成活性阶梯，比逐个死背更能迁移。',goal:'先比较羰基亲电性和离去基能力。'},
9:{title:'Aldol 是第一次把“酸碱 + 共振 + C–C成键”真正合起来',formats:['机理：enolate形成/进攻','填空：Aldol产物','合成：新C–C键'],anchor:'真题里一旦出现 α-H、碱、羰基，不要只搜反应名字；先问谁被去质子化、负电能否离域。',goal:'能指出 α-C、电子去向和新键两端。'},
10:{title:'Claisen/Michael/β-二羰基看似新，其实只是“同一个enolate换受体”',formats:['选择：受体位置','填空：烷基化/脱羧','合成：丙二酸酯/乙酰乙酸酯'],anchor:'真题合成常用这些工具做增碳与定位；真正要会的是碳数账和受体选择。',goal:'每一步都写：亲核碳是谁、受体是谁、最后碳数是多少。'},
11:{title:'芳香题常把芳香性、定位和合成顺序一起考',formats:['判断/选择：芳香性','填空：EAS产物','排序：活性','合成：定位顺序'],anchor:'不是背邻/间/对表；要能解释为什么某个 σ 络合物更稳定、为什么苯要恢复芳香性。',goal:'先判断芳香体系，再看取代基如何改电子密度。'},
12:{title:'重氮盐是芳香合成的“万能转接头”',formats:['填空：重氮化/Sandmeyer','选择：胺碱性','合成：ArNH₂→ArX/ArCN/ArOH'],anchor:'真题合成中芳环上“难直接装”的基团，经常通过胺→重氮盐绕过去。',goal:'把重氮盐当路线节点，不当孤立人名反应。'},
13:{title:'结构推导题不是猜答案，而是用证据一层层排除',formats:['结构推导：分子式/DBE/IR/化学检验'],anchor:'2024结构推断35分、2022为30分、2020为24分；这是近年真正的大分值能力。',goal:'任何候选结构都必须通过每条证据。'},
14:{title:'NMR把“看不到的结构”变成地址、人数和邻居',formats:['结构推导：δ/积分/裂分/对称'],anchor:'结构推导高分题通常不是单一谱图，而是分子式 + IR + NMR + 化学证据联立。',goal:'先解释每个信号，再拼结构；不从答案反推。'},
15:{title:'立体化学不是附加题，它会藏在命名、取代、消除和结构判断里',formats:['命名：R/S/E/Z','选择：构型关系','机理：SN2反转/E2几何'],anchor:'大纲明确要求手性、R/S与构型式转换；真题常把立体结论嵌在其它反应里。',goal:'先画/定优先级，再判空间，不凭口诀。'},
16:{title:'排序与机理综合是在训练真正的“陌生题翻译器”',formats:['排序：酸碱/稳定性/活性/物性','机理：电子箭头','混合选择'],anchor:'真题不会标章节名；这一天开始刻意混题，逼你从结构和条件自己识别问题。',goal:'用共振、诱导、杂化、芳香性、位阻等判据解释，不只报顺序。'},
17:{title:'合成题先从目标倒着看，才不会掉进试剂海洋',formats:['合成路线设计：1–3步','填空：关键试剂/中间体'],anchor:'2024合成40分、2023合成44分、2022合成40分；这是必须单独练成的高分能力。',goal:'目标差异→碳数→最后一步→关键C–C→正向验证。'},
18:{title:'多步合成真正拉开分数的是顺序、兼容与替代路线',formats:['合成路线设计：多步','简答：路线理由','结构+合成混合'],anchor:'老年份和近年都持续出现高分合成，说明不是“最后背几条路线”能解决。',goal:'每一步都做兼容审计，并能解释为什么另一条路更差。'},
19:{title:'Boss卷把题型混在一起，模拟“真题不告诉你章节”的状态',formats:['选择/填空','排序','机理','结构推导','合成路线'],anchor:'637大纲明确列出填空、选择、简答、结构推导、合成路线；本卷按能力组合，不冒充某年整卷。',goal:'无提示完成，暴露真正迁移率和高置信错误。'},
20:{title:'最后一天只修真正掉分的三处，再用新结构验证',formats:['错题修复','迁移同型','综合Boss'],anchor:'达到目标不是“20天签到”，而是未见题与换结构迁移真的稳定。',goal:'Top3断点→修复→新结构独立成功。'}
};
Data.DAY_EXAM_BRIDGES=DAY;

for(const [dayKey,bridge] of Object.entries(DAY)){
 const day=Data.days[Number(dayKey)];if(!day)continue;
 day.examBridge=bridge;
 for(const lesson of day.lessons||[]){
  if(!lesson.examBridge) lesson.examBridge={title:bridge.title,formats:bridge.formats,anchor:bridge.anchor,goal:bridge.goal};
 }
}

const TYPE={
 choice:{format:'选择/填空同型',ask:'真题常把结构和条件换掉，问主产物、主路径或最关键判据。'},
 'multi-choice':{format:'多选/综合判断同型',ask:'考你能不能同时检查多条规则，而不是只认一条口诀。'},
 ranking:{format:'排序题同型',ask:'正式答题通常既要顺序，也要能写出主导因素。'},
 route:{format:'路线/条件分支同型',ask:'真题会把几个可能路线并列，要求你判断主路、次路和为什么。'},
 synthesis:{format:'微型合成同型',ask:'先比起点和终点差异，再选能正向成立的步骤。'},
 'synthesis-case':{format:'合成路线设计同型',ask:'按目标差异、碳数、关键键、顺序与兼容性评分。'},
 'electron-arrow':{format:'反应历程/机理同型',ask:'箭尾必须来自真实电子源，箭头终点必须解释新键/断键。'},
 'structure-choice':{format:'结构/立体选择同型',ask:'结构不是装饰；要把官能团、连接方式和空间信息读出来。'},
 detective:{format:'结构推导同型',ask:'每条谱图/化学证据都要能淘汰候选。'},
 'detective-case':{format:'结构推导大题同型',ask:'分子式→DBE→IR/NMR→化学证据→候选淘汰。'}
};
for(const day of Object.values(Data.days)){
 const all=[...(day.questions||[]),...Object.values(day.repairs||{}).flat(),...(day.adaptivePool||[]),...Object.values(day.adaptivePools||{}).flat()];
 for(const question of all){
  const rule=TYPE[question.type]||{format:'真题能力迁移',ask:'先把题干翻译成已经学过的结构与电子问题。'};
  question.examBridge=question.examBridge||{format:rule.format,ask:rule.ask,dayNote:DAY[day.day]?.goal||'',label:(question.examTags||[]).includes('真题同型训练')?'真题同型训练':'真题能力训练'};
 }
}

// Official-syllabus coverage skills that were underrepresented in the 20-day core.
[
 {id:'alkane.radical_halogenation',label:'烷烃自由基卤代与选择性',domain:'reaction',importance:3},
 {id:'cycloalkane.ring_strain',label:'环烷烃环张力与稳定性',domain:'ranking',importance:3},
 {id:'phenol.acidity',label:'苯酚酸性与取代效应',domain:'ranking',importance:3},
 {id:'carbonyl.beckmann',label:'肟的 Beckmann 重排',domain:'reaction',importance:2},
 {id:'heterocycle.aromaticity',label:'杂环芳香性与孤对电子角色',domain:'ranking',importance:2},
 {id:'carbohydrate.monosaccharide',label:'单糖结构、还原性与Fischer识别',domain:'structure',importance:2},
 {id:'aminoacid.zwitterion',label:'氨基酸两性与两性离子',domain:'ranking',importance:2},
 {id:'aminoacid.peptide_bond',label:'肽键形成与识别',domain:'reaction',importance:2}
].forEach(addSkill);

[
 {term:'烷烃自由基卤代',aliases:['自由基氯代','自由基卤代','烷烃氯代'],plain:'烷烃的 C–H 在光照/加热下可被 Cl 或 Br 取代。机理不是离子一对电子走，而是单电子链反应。',why:'2026大纲明确要求烷烃自由基取代、自由基稳定性与氯代历程；它也能帮你真正理解 Day2 的 ROOR/NBS。',limit:'氯代选择性较低，溴代通常更选择性；产物比例还取决于可抽 H 数量。',diagram:'radical-chain'},
 {term:'链引发 / 链传递 / 链终止',aliases:['链引发','链传递','链终止'],plain:'自由基链反应的三段：先制造自由基；再让自由基反复“接力”并再生新的自由基；最后两个自由基碰到一起把链停掉。',why:'有了这三段，自由基机理就不再是一串莫名其妙的点。',limit:'真实体系还可能有副反应，但基础题先抓主链。',diagram:'radical-chain'},
 {term:'环烷烃 / 环张力',aliases:['环烷烃','角张力','扭转张力'],plain:'把碳骨架首尾连成环就是环烷烃。小环为了“够到彼此”会迫使键角偏离理想值、键彼此重叠更多，因此能量升高，这些代价合称环张力。',why:'它解释环丙烷/环丁烷为什么比普通开链烷烃更容易发生开环等反应，也连接 Day6 环氧的三元环张力。',limit:'环张力不只由角度决定，还包括扭转和跨环相互作用。',diagram:'ring-strain'},
 {term:'苯酚',aliases:['苯酚','phenol','PhOH'],plain:'OH 直接连在芳香环碳上叫酚，不等于普通醇。失去 H 后的酚氧负离子能把负电通过共振分散到芳环，因此苯酚比普通脂肪醇更酸。',why:'这样能统一“酸性排序”和“芳环上OH为什么强活化邻对位”。',limit:'“更酸”是相对普通醇，苯酚仍是弱酸。',diagram:'phenol-resonance'},
 {term:'Beckmann 重排',aliases:['Beckmann','Beckmann 重排'],plain:'肟在酸等条件下可重排成酰胺；与离去基反式的那个碳基团迁移到 N。',why:'2026大纲把 Beckmann 列在醛酮掌握内容里，基础题常考产物或“谁迁移”。',limit:'立体关系决定迁移基团；详细立体图在3D模块再加强。',diagram:'beckmann'},
 {term:'杂环化合物',aliases:['杂环','杂环化合物'],plain:'环里不全是碳，至少有 O/N/S 等异原子，就是杂环。很多杂环仍然能形成连续 p 轨道并具有芳香性。',why:'2026大纲单列杂环章节；基础真题可能考分类、命名、芳香性与反应性。',limit:'不是“有环有N”就一定芳香，仍要检查连续 p 轨道和电子数。',diagram:'heterocycle'},
 {term:'吡啶 / 吡咯的孤对电子',aliases:['吡啶','吡咯'],plain:'吡啶 N 的孤对电子不参加芳香 6π 电子圈，较能接 H⁺；吡咯 N 的一对孤对电子要贡献给芳香 6π 系统，所以拿去接 H⁺ 会损失芳香稳定性。',why:'这一对比能把“芳香性”和“碱性”真正连起来。',limit:'这里只比较最基础趋势，取代基和溶剂会继续影响。',diagram:'pyridine-pyrrole'},
 {term:'碳水化合物 / 单糖',aliases:['碳水化合物','单糖','葡萄糖'],plain:'单糖可以理解为带多个 –OH、同时带一个醛或酮特征的多官能团分子。Fischer 投影常用来画它们的开链构型。',why:'2026大纲要求单糖结构、命名与反应；它还能把羰基、醇、立体化学三条线合在一起。',limit:'溶液中单糖常以环状形式为主；本版先掌握考试最基础的结构与还原性。',diagram:'sugar'},
 {term:'还原糖',aliases:['还原糖'],plain:'能在溶液中提供可被氧化的游离醛型/等效形式、因此能还原 Tollens/Fehling 试剂的糖叫还原糖。',why:'它把 Day7 的醛氧化检验和碳水化合物联系起来。',limit:'是否还原取决于异头碳是否被锁死等结构因素。',diagram:'reducing-sugar'},
 {term:'氨基酸 / 两性离子',aliases:['氨基酸','两性离子','zwitterion'],plain:'氨基酸同时有酸性的 –CO₂H 和碱性的 –NH₂。在中性附近常发生内部质子转移，主要写成 –NH₃⁺ 与 –CO₂⁻ 同时存在的两性离子。',why:'2026大纲要求氨基酸酸碱两性；这里正好回扣 Day3/16 的酸碱与电荷稳定。',limit:'具体电荷形式取决于 pH 和侧链。',diagram:'zwitterion'},
 {term:'肽键',aliases:['肽键','肽'],plain:'一个氨基酸的羧基与另一个氨基酸的氨基缩合后形成 –C(=O)–NH–，这段酰胺连接叫肽键。',why:'它把羧酸衍生物的酰基化与生物分子连接起来。',limit:'真实肽合成通常需要活化/保护，不能只把游离酸和胺混在一起就高效缩合。',diagram:'peptide'}
].forEach(addTerm);

// Official-outline bridge capsules. These are deliberately short and placed where prerequisite logic already exists.
addLesson(2,{
 id:'d02-official-alkane-radical',eyebrow:'大纲兜底 · 烷烃自由基取代',title:'先把烷烃自由基卤代看成“接力赛”，再看为什么光照会启动氯代',
 body:'CH₄ 在 hν 下与 Cl₂ 反应，不是 Cl⁻ 去“亲核取代”。光先让 Cl–Cl 均裂，一人一个电子，生成两个 Cl·。Cl· 抽走 CH₄ 的一个 H 时，原 C–H 键也均裂：一个电子跟 H 去形成 H–Cl，另一个留在碳上形成 ·CH₃。随后 ·CH₃ 再从 Cl₂ 拿一个 Cl，生成 CH₃Cl，同时再生 Cl·，所以链能继续。',
 formulas:['Cl₂ —hν→ 2 Cl·','Cl· + CH₄ → HCl + ·CH₃','·CH₃ + Cl₂ → CH₃Cl + Cl·'],
 analogy:{title:'像接力赛，不是一次性碰撞',body:'引发只负责把第一根接力棒交出去；传递阶段每跑一步都会再生新的自由基接棒者；两个自由基互相结合时才真正终止。',boundary:'接力只是帮助理解“自由基被再生”，真实驱动力仍是键能与能垒。'},
 sequence:[{title:'引发：先制造自由基',text:'光使 Cl–Cl 均裂。',formula:'Cl–Cl → Cl· + ·Cl',diagram:'radical-chain'},{title:'传递1：抽 H',text:'Cl· 从甲烷夺 H，C–H 一人一个电子。',formula:'Cl· + H–CH₃ → HCl + ·CH₃',diagram:'radical-chain'},{title:'传递2：装上 Cl',text:'甲基自由基从 Cl₂ 得到 Cl，同时再生 Cl·。',formula:'·CH₃ + Cl₂ → CH₃Cl + Cl·',diagram:'radical-chain'},{title:'终止',text:'两个自由基直接结合，链上没有新自由基。',formula:'Cl· + ·CH₃ → CH₃Cl',diagram:'radical-chain'}],
 whyChain:['为什么光照能启动？因为它给 Cl–Cl 足够能量发生均裂。','为什么叫链反应？因为传递步骤消耗一个自由基又生成另一个自由基。','为什么不同H被取代比例不同？抽H的速率与形成的自由基稳定性有关，同时还要乘“这种H有几个”。'],
 microCheck:{prompt:'自由基氯代中，哪一步会“消耗一个自由基，同时再生另一个自由基”？',options:['链引发','链传递','链终止'],answer:1,feedback:'传递阶段让自由基像接力棒一样继续存在。'},
 examBridge:{title:'大纲明确要求烷烃自由基取代历程',formats:['填空：氯代产物','简答/机理：链引发/传递/终止','排序：自由基稳定性'],anchor:'这部分也直接为 HBr/ROOR 与 NBS 的自由基机理打地基。',goal:'看到 hν/过氧化物，能主动切换到单电子世界。'}
},'d02-zero-02-radical');
addQuestion(2,{id:'d02-official-radical-q',day:2,type:'choice',role:'practice',primarySkill:'alkane.radical_halogenation',skillIds:['alkane.radical_halogenation'],difficulty:2,prompt:'丙烷自由基溴代时，为什么中间碳上的 H 通常更容易被抽走？',options:[{id:'a',label:'抽走后形成较稳定的二级碳自由基'},{id:'b',label:'因为中间碳没有电子'},{id:'c',label:'因为 Br· 只能看到中间位置'}],answer:'a',formula:'CH₃CH₂CH₃ → CH₃ĊHCH₃（2° radical）',hints:['先问：抽 H 后留下什么自由基？'],explanationLayers:{short:'因为会形成更稳定的二级碳自由基。',why:'自由基中间体越稳定，对应抽H步骤通常越有利。',full:'真正产物比例还要同时考虑每类H的数量与每一种H被抽取的难易；不能只背“二级一定100%”。'},examTags:['真题同型训练','自由基稳定性','烷烃氯/溴代'],preflight:{skill:'自由基选择性',steps:['找可被抽的不同类型H','想象各自抽走后形成几级自由基','再考虑H数量与反应选择性'],why:'这就是大纲要求的“自由基稳定性比较和选择性”。'},causalLadder:['为什么抽H会留下自由基？因为 C–H 均裂，一只电子跟H走，另一只留在C。','为什么二级自由基较稳？邻近烷基能通过超共轭等方式帮助分散电子缺陷。','为什么还要数H？即使单个H反应慢，数量多也会影响总产物比例。']});

addLesson(3,{id:'d03-official-cycloalkane',eyebrow:'大纲兜底 · 环烷烃',title:'为什么小环像被硬掰弯的弹簧？先看键角和“挤”的代价',body:'sp³ 碳最舒服的四面体键角约 109.5°。把三个碳硬连成环丙烷，平面三角形角度只有约 60°，C–C 键被迫偏离理想方向；同时相邻 C–H 也很难完全错开。角度不舒服 + 键彼此更重叠，就形成较大的环张力。环己烷则能通过椅式构象接近理想角度并错开键，因此稳定得多。',formulas:['sp³ 理想键角 ≈109.5°','cyclopropane ≈60° → 大角张力','cyclohexane chair → 张力显著降低'],analogy:{title:'像把一根本想保持自然弧度的弹簧强行掰成很小的圈',body:'圈越小，越要强迫它偏离舒服姿势，储存的“紧绷能量”越高。',boundary:'分子不是机械弹簧；环张力来自轨道方向、扭转与空间相互作用。'},sequence:[{title:'先看正常sp³碳',text:'四根键倾向四面体方向。',formula:'109.5°',diagram:'valence'},{title:'三元环被迫压角',text:'约60°，远离理想值。',formula:'60° << 109.5°',diagram:'ring-strain'},{title:'张力高意味着什么',text:'某些开环反应能释放这部分能量。',formula:'strained ring → ring opening',diagram:'ring-strain'},{title:'六元环会“折”成椅式',text:'不必保持平面，能大幅减轻张力。',formula:'cyclohexane chair',diagram:'chair-ax-eq'}],whyChain:['为什么环丙烷更紧张？键角偏离sp³理想值很大。','为什么环己烷不画平六边形来判断稳定？真实分子可折叠成三维椅式，减少角张力和扭转张力。','这和环氧有什么关系？环氧也是三元环，开环能释放张力，所以更活泼。'],microCheck:{prompt:'同样都是 C–C/C–H 为主，哪一个通常环张力更小？',options:['环丙烷','椅式环己烷'],answer:1,feedback:'椅式环己烷能接近理想键角并把相邻键错开。'},examBridge:{title:'大纲明确要求环烷烃结构、化学性质与环己烷稳定构象',formats:['选择/排序：稳定性','命名/结构','简答：环张力'],anchor:'这也为Day15椅式构象、Day6环氧张力建立统一直觉。',goal:'看到小环先问“它被迫偏离了多少舒服几何”。'}},'d03-zero-01-hybridization');
addQuestion(3,{id:'d03-official-ring-q',day:3,type:'choice',role:'practice',primarySkill:'cycloalkane.ring_strain',skillIds:['cycloalkane.ring_strain'],difficulty:1,prompt:'只比较基础环张力，哪一个通常最稳定？',options:[{id:'a',label:'环丙烷'},{id:'b',label:'环丁烷'},{id:'c',label:'椅式环己烷'}],answer:'c',formula:'cyclopropane / cyclobutane / chair cyclohexane',hints:['谁最接近sp³碳舒服的键角，并且键更能错开？'],explanationLayers:{short:'椅式环己烷。',why:'它能接近109.5°并减少重叠。',full:'小环同时受角张力和扭转张力影响；环己烷通过非平面椅式显著降低两者。'},examTags:['真题同型训练','环烷烃稳定性'],preflight:{skill:'环张力',steps:['先认环大小','比较键角偏离','再看是否能用非平面构象错开键'],why:'稳定性不是看“圈画得大不大”，而看几何代价。'},causalLadder:['为什么sp³碳有舒服角度？四个电子域尽量彼此远离。','为什么小环难做到？闭环几何强迫键方向偏折。','为什么椅式稳定？既接近理想键角，又减少相邻键的重叠。']});

addLesson(4,{id:'d04-official-solvolysis',eyebrow:'Day 4 · 第一次见“溶剂解”',title:'为什么水/乙醇有时不只是背景，而会亲自接到碳上？',body:'如果三级卤代烃先发生 C–X 异裂，得到较稳定的碳正离子，那么周围最多的水或乙醇分子就有机会用 O 上孤对电子接到这个缺电子碳上。因为“溶剂自己就是进攻者”，这种过程叫溶剂解。名字听起来新，其实动作仍是你已经会的：先电离产生电子缺口，再由有孤对电子的分子把缺口补上。',formulas:['R₃C–X → R₃C⁺ + X⁻','R₃C⁺ + H₂O: → R₃C–OH₂⁺ → R₃C–OH'],analogy:{title:'像房间空出来以后，走廊里数量最多的人最容易先进去坐下',body:'水/乙醇既是“周围环境”，也真的可以成为进攻者。',boundary:'真正速率和产物比例还取决于电离难易、溶剂稳定离子的能力和竞争反应。'},sequence:[{title:'先空座',text:'C–X 异裂，形成碳正离子。',formula:'R₃C–X → R₃C⁺ + X⁻',diagram:'sn1'},{title:'再看周围是谁',text:'水/乙醇带 O 孤对电子。',formula:'H₂O:',diagram:'oxygen-lonepairs'},{title:'孤对去补缺口',text:'形成新的 C–O 键。',formula:'H₂O: → C⁺',diagram:'sn1-capture'},{title:'最后去掉多余H⁺',text:'得到中性醇/醚产物。',formula:'ROH₂⁺ → ROH',diagram:'protonation'}],whyChain:['为什么叫“溶剂解”？因为溶剂分子本身参与断裂后的取代过程。','为什么三级底物更常见？它更容易先形成相对稳定的三级碳正离子。','为什么一级底物通常不这样？形成一级碳正离子的能量代价太高。'],microCheck:{prompt:'叔丁基溴在水中若走SN1，真正接到碳正离子上的常是谁？',options:['水分子的O孤对电子','Br上的一个H','没有任何分子'],answer:0,feedback:'水既是溶剂，也能亲自当亲核体。'},examBridge:{title:'真题常把“水/乙醇”既当溶剂又当反应物考',formats:['选择：哪组条件更利SN1','简答：为什么水/乙醇能参与'],anchor:'先把“溶剂解”翻译成普通电子动作，就不会被术语吓住。',goal:'看到三级底物+极性质子溶剂，能想到先电离再由溶剂进攻。'}},'d04-lesson-rate-solvent');

addLesson(6,{id:'d06-official-phenol',eyebrow:'大纲兜底 · 苯酚',title:'OH 连在苯环上以后，为什么“同样是OH”却不再像普通醇？',body:'乙醇失去 H⁺ 后得到 CH₃CH₂O⁻，负电主要留在 O 上。苯酚失去 H⁺ 后得到 PhO⁻，O 的一对电子可以和芳环 p 轨道连续重叠，负电能通过多张共振式分散到环上。因此苯酚的共轭碱更稳定，苯酚比普通脂肪醇更酸。反过来，OH 的孤对电子也能向芳环给电子，使芳环更活化并偏邻/对位取代。',formulas:['PhOH ⇌ PhO⁻ + H⁺','phenol pKa≈10；ethanol pKa≈16','–OH：芳环强活化，邻/对位定位'],analogy:{title:'像一笔债务能不能分摊给整栋楼',body:'乙氧负离子的负电主要压在O这一个“房间”；酚氧负离子能借芳环共振把负担分到多个位置，所以更容易承受失去H后的状态。',boundary:'真实稳定来自轨道共轭与溶剂化，不是电荷真的平均切成几份。'},sequence:[{title:'普通醇失H',text:'负电主要在O。',formula:'EtOH → EtO⁻',diagram:'oxygen-lonepairs'},{title:'苯酚失H',text:'O与芳环形成共轭。',formula:'PhOH → PhO⁻',diagram:'phenol-resonance'},{title:'共振分散负电',text:'共轭碱更稳。',formula:'PhO⁻ ↔ resonance forms',diagram:'phenol-resonance'},{title:'回到芳环反应',text:'OH又能给电子，活化邻/对位。',formula:'PhOH + E⁺ → o/p',diagram:'eas'}],whyChain:['为什么更酸要看共轭碱？酸放走H⁺以后真正留下的是共轭碱。','为什么共振会稳定？电子密度不被迫集中在单一原子/单一键上。','为什么OH又能活化芳环？未质子化时O的孤对电子可向芳环π系统供电子。'],microCheck:{prompt:'比较 PhOH 与 CH₃CH₂OH，哪一个通常更酸？',options:['苯酚','乙醇'],answer:0,feedback:'酚氧负离子可通过芳环共振稳定。'},examBridge:{title:'大纲把酚与醇、醚一起列为掌握内容',formats:['排序：酸性','填空：酚的反应','芳香取代：定位'],anchor:'它是把Day6含氧化学和Day11芳香定位接起来的一座桥。',goal:'看到PhOH不要按普通ROH机械套。'}},'d06-zero-01-oxygen');
addQuestion(6,{id:'d06-official-phenol-q',day:6,type:'choice',role:'contrast',primarySkill:'phenol.acidity',skillIds:['phenol.acidity','ranking.acidity'],difficulty:2,prompt:'为什么苯酚通常比乙醇酸性强？',options:[{id:'a',label:'酚氧负离子的负电可与芳环共振离域'},{id:'b',label:'苯酚的O没有孤对电子'},{id:'c',label:'乙醇失H后会形成碳正离子'}],answer:'a',formula:'PhOH → PhO⁻（resonance stabilized）',hints:['比较失H后的共轭碱谁更稳。'],explanationLayers:{short:'因为PhO⁻共轭稳定。',why:'负电可通过O与芳环p轨道共轭离域。',full:'酸性比较应从HA⇌H⁺+A⁻出发：A⁻越稳定，HA越愿意放出H⁺。'},examTags:['真题同型训练','酸性排序','苯酚'],preflight:{skill:'酸性排序',steps:['写出两者失H后的共轭碱','看负电能否共振分散','共轭碱更稳→原酸更强'],why:'不是背pKa大小，而是解释稳定性。'},causalLadder:['为什么酸性看共轭碱？失H后的产物稳定会推动解离。','为什么PhO⁻更稳？负电能与芳环共轭。','为什么EtO⁻不行？没有连续芳香p轨道供同样离域。']});

addLesson(7,{id:'d07-official-beckmann',eyebrow:'大纲兜底 · Beckmann 重排',title:'肟为什么能“把一个碳基团搬到N旁边”？先把迁移和离去看成同一段电子重排',body:'醛酮与羟胺可先形成肟 R₂C=NOH。酸性条件下，–OH 被质子化后更容易以水离去。与此同时，与离去基处于反式方向的那个碳基团带着原 C–R 键电子迁到 N 上，形成含 C–N 键的中间体，水解后得到酰胺。基础题最重要的是：先认肟，再找与离去基反式的迁移基团，再把“酮骨架”翻译成“酰胺骨架”。',formulas:['R¹R²C=NOH →[H⁺] amide','迁移：C–R 键电子 → N'],analogy:{title:'像一扇门离开时，旁边那个人连同自己的“座位票”一起搬到N旁边',body:'真正迁移的不是裸R⁺，而是R基团连同原C–R键电子一起移动。',boundary:'迁移选择由立体关系决定，3D模块会把anti关系画得更直观。'},sequence:[{title:'先从羰基做成肟',text:'C=O换成C=N–OH。',formula:'ketone → oxime',diagram:'carbonyl'},{title:'让OH变成好离去形式',text:'酸性条件先质子化。',formula:'–NOH + H⁺ → –NOH₂⁺',diagram:'protonation'},{title:'离去与迁移协同发生',text:'反式R带着C–R键电子迁到N。',formula:'C–R → N',diagram:'beckmann'},{title:'水解整理成酰胺',text:'得到R–C(=O)–NR′骨架。',formula:'nitrilium → amide',diagram:'beckmann'}],whyChain:['为什么不能把R画成裸碳正离子飞过去？迁移是键电子一起移动。','为什么先质子化OH？OH⁻本身是差离去基，变成H₂O后更容易离开。','为什么考“谁迁移”？肟的几何关系决定哪个基团与离去基anti，从而迁移。'],microCheck:{prompt:'Beckmann基础判断里，真正迁移时通常是？',options:['R基团带着原C–R键电子迁到N','R先变成完全自由R⁺再随机走','只移动一个H电子'],answer:0,feedback:'迁移是“基团 + 键电子”一起重排。'},examBridge:{title:'2026大纲在醛酮章节明确列出Beckmann重排',formats:['填空：产物','选择：迁移基','简答：为什么会重排'],anchor:'这类题本质仍然是“离去 + 迁移 + 新键形成”的电子账。',goal:'不背产物模板，能沿键电子解释迁移。'}},'d07-zero-02-carbonyl-names');
addQuestion(7,{id:'d07-official-beckmann-q',day:7,type:'choice',role:'practice',primarySkill:'carbonyl.beckmann',skillIds:['carbonyl.beckmann'],difficulty:2,prompt:'Beckmann 重排中，迁移的碳基团是怎样移动的？',options:[{id:'a',label:'带着原 C–R 键电子迁到 N 上'},{id:'b',label:'先形成完全自由的 R⁺，再随机攻击'},{id:'c',label:'只把 R 上的一个 H 移走'}],answer:'a',formula:'C–R bond electrons → N',hints:['机理箭头的箭尾应该从哪里出发？'],explanationLayers:{short:'R基团连同C–R键电子迁到N。',why:'这属于1,2-迁移型电子重排，不是裸R⁺自由漂移。',full:'酸活化使离去基变好；迁移与离去紧密耦合，随后经水解得到酰胺。'},examTags:['真题能力','Beckmann','重排'],preflight:{skill:'重排电子账',steps:['先认肟','找可离去的–NOH₂⁺','找与离去基anti的迁移基','箭头从C–R键指向N'],why:'和碳正离子重排一样，关键是“哪个键的电子搬家”。'},causalLadder:['为什么OH要先质子化？让离去物变成中性水。','为什么迁移箭头从C–R键开始？电子原来就在这根键里。','为什么产物是酰胺？迁移后C/N/O骨架经过水解整理成C(=O)–N。']});

addLesson(16,{id:'d16-official-heterocycle',eyebrow:'大纲兜底 · 杂环',title:'杂环化合物：环里换进一个 N 后，最关键不是“有N”，而是这对孤对电子有没有参加芳香大圈',body:'把苯的一个 CH 换成 N 可以得到吡啶；它仍有6π芳香电子，而 N 的那对孤对电子位于另一个不参与π圈的轨道里，所以较能接 H⁺，表现出碱性。吡咯则不同：N 的一对孤对电子正好要拿出来补成6π芳香电子；如果把它拿去接H⁺，就会损失芳香稳定性，所以它明显更弱碱。',formulas:['pyridine：6π，N lone pair 不进芳香圈','pyrrole：N lone pair 贡献2π → 6π'],analogy:{title:'同样是一张“备用卡”，一张在口袋里，一张已经拿去维持整圈运行',body:'吡啶孤对像还在口袋里的备用卡，较能拿去接H⁺；吡咯孤对已经参与芳香“公共账本”，拿走代价大。',boundary:'真正差异来自孤对所在轨道方向与芳香能量。'},sequence:[{title:'先画芳香大圈',text:'检查连续p轨道和6π电子。',formula:'4n+2, n=1 → 6π',diagram:'aromatic'},{title:'看吡啶N孤对',text:'孤对不属于芳香π六电子。',formula:'pyridine N: available',diagram:'pyridine-pyrrole'},{title:'看吡咯N孤对',text:'孤对提供2个π电子维持6π。',formula:'pyrrole lone pair → aromatic π',diagram:'pyridine-pyrrole'},{title:'回到碱性',text:'能否轻易拿孤对接H⁺。',formula:'pyridine > pyrrole basicity',diagram:'basicity'}],whyChain:['为什么两者都有N却碱性差很多？关键不是元素名字，而是孤对电子是否被芳香性“占用”。','为什么吡咯质子化代价大？会破坏原来靠该孤对维持的芳香稳定。','为什么这和Day11有关？还是同一个Hückel与电子离域模型。'],microCheck:{prompt:'基础比较中，哪一个N孤对更“空闲”去接H⁺？',options:['吡啶','吡咯'],answer:0,feedback:'吡啶N孤对不参与芳香6π电子圈。'},examBridge:{title:'2026大纲单列杂环化合物，要求分类、命名、化学性质与芳香性',formats:['选择：芳香性/碱性','结构：孤对电子角色'],anchor:'不用另背一章，先把它接回Day11芳香性与Day12胺碱性。',goal:'见杂环先问：哪对电子进了芳香π圈。'}},'d16-zero-02-arrow-grammar');
addQuestion(16,{id:'d16-official-heterocycle-q',day:16,type:'choice',role:'contrast',primarySkill:'heterocycle.aromaticity',skillIds:['heterocycle.aromaticity','ranking.basicity'],difficulty:2,prompt:'基础趋势中，为什么吡啶比吡咯更容易用 N 的孤对电子接 H⁺？',options:[{id:'a',label:'吡啶N孤对不参与芳香6π电子圈'},{id:'b',label:'吡咯没有N'},{id:'c',label:'吡啶不是芳香化合物'}],answer:'a',formula:'pyridine lone pair free; pyrrole lone pair in aromatic sextet',hints:['先问哪一对孤对电子被芳香性“占用”。'],explanationLayers:{short:'吡啶N孤对更空闲。',why:'吡咯的孤对贡献给芳香6π体系。',full:'吡啶N的p轨道贡献一个π电子，但孤对位于环平面内的sp²轨道；吡咯N孤对位于p轨道并贡献2π电子。'},examTags:['大纲兜底','杂环','芳香性','碱性'],preflight:{skill:'杂环芳香性',steps:['先数π电子','确定N孤对是否进π系统','再判断拿孤对接H⁺会不会损失芳香性'],why:'不能只看到N就按普通胺判断碱性。'},causalLadder:['为什么要管孤对在哪个轨道？只有和相邻p轨道平行的电子才能进入共轭π系统。','为什么进了芳香圈就不愿接H⁺？会失去芳香稳定能。','为什么吡啶仍芳香？N的p轨道仍参与6π圈，但那对孤对在另一轨道。']});

addLesson(16,{id:'d16-official-carbohydrate',eyebrow:'大纲兜底 · 碳水化合物',title:'先别把葡萄糖当一张恐怖结构图：它只是“很多OH + 一个羰基 + 立体信息”叠在一起',body:'开链葡萄糖可以先分模块看：最上端有醛基 –CHO，中间多个碳各带 –OH，末端是 –CH₂OH。也就是说，你前面学过的羰基、醇、立体中心现在被装进同一个分子。因为溶液中可以重新打开到带醛基的形式，葡萄糖能还原 Tollens/Fehling 试剂，是还原糖。Fischer 投影只是把这条碳链按统一规则压在纸面上。',formulas:['glucose：多羟基醛糖','开放链 –CHO ⇄ 环状半缩醛','还原糖：可给 Tollens / Fehling 阳性'],analogy:{title:'像把已经会的零件装成一个复杂乐高',body:'OH不是新概念、CHO不是新概念、Fischer也不是新概念；新的是它们同时出现在一个骨架里。',boundary:'真实溶液中环状异构体占多数，后续3D模块再加强环构象/异头碳。'},sequence:[{title:'先圈端基',text:'开链葡萄糖顶端是CHO。',formula:'CHO–(CHOH)₄–CH₂OH',diagram:'sugar'},{title:'再数多个OH',text:'它是多羟基化合物。',formula:'many –OH',diagram:'sugar'},{title:'连接Day7醛检验',text:'能打开到醛型，所以有还原性。',formula:'Tollens +',diagram:'reducing-sugar'},{title:'连接Day15 Fischer',text:'横线朝你、竖线背后。',formula:'Fischer projection',diagram:'fischer'}],whyChain:['为什么叫还原糖？它能把氧化剂还原，而自己被氧化。','为什么环状形式还能表现醛的还原性？溶液中存在环开链平衡，可不断产生少量开放链羰基形式。','为什么放Day16而不是重开一整章？这里是在用已学羰基/醇/立体知识完成大纲基础覆盖。'],microCheck:{prompt:'葡萄糖能给Tollens阳性的核心理由更接近哪一个？',options:['溶液中可形成带醛基的开放链形式','因为所有OH都带负电','因为没有羰基'],answer:0,feedback:'环开链平衡让可被氧化的醛型持续存在。'},examBridge:{title:'2026大纲要求单糖结构、命名与反应',formats:['选择/填空：还原糖','结构：Fischer','性质：氧化还原'],anchor:'这一小块把Day7羰基、Day15立体与实验检验合起来。',goal:'不从头背糖化学，先用已学模块拆结构。'}},'d16-official-heterocycle');
addQuestion(16,{id:'d16-official-sugar-q',day:16,type:'choice',role:'practice',primarySkill:'carbohydrate.monosaccharide',skillIds:['carbohydrate.monosaccharide','structure.chemical_tests'],difficulty:2,prompt:'为什么葡萄糖属于还原糖并可给 Tollens 阳性？',options:[{id:'a',label:'溶液中可通过环开链平衡形成可被氧化的醛型'},{id:'b',label:'因为每一个OH都是强还原剂'},{id:'c',label:'因为葡萄糖没有任何羰基特征'}],answer:'a',formula:'cyclic glucose ⇄ open-chain aldehyde → oxidized',hints:['把它接回Day7“醛为什么能银镜”。'],explanationLayers:{short:'因为能形成开放链醛型。',why:'少量醛型持续被氧化，平衡再补充。',full:'还原糖的关键不是“有没有很多OH”，而是异头中心是否可释放出游离羰基等效形式。'},examTags:['大纲兜底','碳水化合物','Tollens'],preflight:{skill:'还原糖',steps:['先找是否有可恢复的羰基形式','连接醛的Tollens反应','不要被大量OH干扰'],why:'复杂分子仍然可以拆回已学官能团。'},causalLadder:['为什么醛能Tollens阳性？醛被氧化成酸/羧酸盐，同时Ag(I)被还原成Ag。','为什么环状葡萄糖还有醛反应？环能开回少量开放链。','为什么不是所有糖都一样？若异头碳被锁成缩醛型，可能不能自由开链。']});

addLesson(16,{id:'d16-official-aminoacid',eyebrow:'大纲兜底 · 氨基酸与肽键',title:'一个分子里同时放“酸”和“碱”会怎样？氨基酸用一次内部质子转移把两条线接起来',body:'最简单的α-氨基酸可以写成 H₂N–CH(R)–CO₂H。–CO₂H 能给 H⁺，–NH₂ 的孤对能接 H⁺，所以在中性附近常发生内部质子转移，主要形式写成 ⁺H₃N–CH(R)–CO₂⁻，这叫两性离子。两个氨基酸连接时，一个的羧基部分与另一个的氨基形成 –C(=O)–NH–，这就是肽键，本质上是一条酰胺键。',formulas:['H₂N–CHR–CO₂H ⇄ ⁺H₃N–CHR–CO₂⁻','–CO₂H + H₂N– → –C(=O)–NH– + H₂O（概念式）'],analogy:{title:'像同一个人左手能递出球，右手又能接球',body:'羧基像“给H⁺的一端”，氨基像“接H⁺的一端”；所以同一个分子可随pH在正/中/负电状态间切换。',boundary:'肽合成实验上常需要活化与保护，不能把“脱水概念式”当成随便混合就高产。'},sequence:[{title:'先圈两个官能团',text:'NH₂ 和 CO₂H。',formula:'H₂N–CHR–CO₂H',diagram:'zwitterion'},{title:'内部质子转移',text:'CO₂H给H⁺，NH₂接H⁺。',formula:'NH₂→NH₃⁺；CO₂H→CO₂⁻',diagram:'zwitterion'},{title:'认肽键',text:'C(=O)–NH就是酰胺连接。',formula:'–CO–NH–',diagram:'peptide'},{title:'接回Day8',text:'肽键的电子结构就是酰胺。',formula:'amide resonance',diagram:'peptide'}],whyChain:['为什么氨基酸能两性？同一分子同时拥有可给H⁺和可接H⁺的官能团。','为什么肽键不只是普通C–N单键？N孤对与羰基共振，使C–N具有部分双键特征。','为什么真实肽合成需要活化？羧酸的OH不是特别好的离去基，需要把酰基转成更容易被胺进攻的形式。'],microCheck:{prompt:'肽键最直接属于哪类官能团连接？',options:['酰胺 C(=O)–N','醚 C–O–C','烯烃 C=C'],answer:0,feedback:'肽键就是特殊的酰胺键。'},examBridge:{title:'2026大纲要求氨基酸酸碱两性、结构、合成与肽键形成',formats:['选择：电荷形式','结构：氨基酸/肽键','简答：两性'],anchor:'这里把Day3/16酸碱和Day8酰胺连接起来。',goal:'复杂生物分子也能拆回熟悉官能团。'}},'d16-official-carbohydrate');
addQuestion(16,{id:'d16-official-amino-q',day:16,type:'choice',role:'practice',primarySkill:'aminoacid.zwitterion',skillIds:['aminoacid.zwitterion','aminoacid.peptide_bond'],difficulty:2,prompt:'中性附近，普通 α-氨基酸为什么常主要写成两性离子？',options:[{id:'a',label:'羧基可给H⁺，氨基孤对可接H⁺，发生内部质子转移'},{id:'b',label:'因为碳原子自动带正负电'},{id:'c',label:'因为所有氨基酸都没有酸碱性质'}],answer:'a',formula:'H₂N–CHR–CO₂H ⇄ ⁺H₃N–CHR–CO₂⁻',hints:['把酸/碱定义拿回来：谁给H⁺，谁接H⁺？'],explanationLayers:{short:'因为分子同时有酸性羧基和碱性氨基。',why:'内部质子转移形成NH₃⁺/CO₂⁻。',full:'具体比例取决于pH与各pKa；基础题先识别“两性”来自同一分子中酸/碱官能团并存。'},examTags:['大纲兜底','氨基酸','两性离子'],preflight:{skill:'氨基酸酸碱',steps:['圈CO₂H','圈NH₂孤对','问H⁺从哪到哪','写净电荷'],why:'仍然是Day3学过的质子转移。'},causalLadder:['为什么CO₂H能给H⁺？羧酸失H后的羧酸根被共振稳定。','为什么NH₂能接H⁺？N有孤对电子。','为什么叫两性离子？同一分子同时存在正负电荷，但总电荷可为0。']});

// Re-purpose the two 5-point Day19 mixed questions to cover the official-outline breadth without changing total score.
let mix=(Data.days?.[19]?.questions||[]).find(x=>x.id==='d19-mix-01');
if(mix){Object.assign(mix,{prompt:'大纲兜底综合：选择所有正确陈述。',options:[{id:'a',label:'吡啶 N 的孤对电子不参与芳香 6π 电子圈，因此比吡咯的那对孤对更容易接 H⁺'},{id:'b',label:'葡萄糖可通过环开链平衡出现可被氧化的醛型，因此属于还原糖'},{id:'c',label:'普通 α-氨基酸在中性附近可主要以 NH₃⁺/CO₂⁻ 两性离子形式存在'},{id:'d',label:'肽键本质上是醚键 C–O–C'}],answer:['a','b','c'],formula:'杂环 + 单糖 + 氨基酸/肽键',explanationLayers:{short:'A、B、C正确。',why:'D错误：肽键是酰胺 C(=O)–NH。',full:'这些是2026大纲中较容易被核心反应课程漏掉的章节，本题只检验最基础可迁移逻辑。'},examTags:['2026大纲兜底','杂环','碳水化合物','氨基酸'],examBridge:{format:'综合选择/填空同型',ask:'覆盖大纲低频但不能完全空白的三块；只考课程已明确讲过的基础。',dayNote:'Boss卷保持150分不变。',label:'大纲覆盖'}})}
mix=(Data.days?.[19]?.questions||[]).find(x=>x.id==='d19-mix-02');
if(mix){Object.assign(mix,{prompt:'基础机理兜底：选择所有正确陈述。',options:[{id:'a',label:'烷烃自由基氯代的链传递步骤会消耗一个自由基并再生另一个自由基'},{id:'b',label:'椅式环己烷比环丙烷更能接近 sp³ 碳舒服的键角，因此基础环张力更小'},{id:'c',label:'苯酚比乙醇更酸，一个重要原因是 PhO⁻ 可通过芳环共振稳定'},{id:'d',label:'Beckmann 重排中迁移基团一定先变成完全自由的 R⁺ 再随机迁移'}],answer:['a','b','c'],formula:'自由基 + 环张力 + 苯酚 + Beckmann',explanationLayers:{short:'A、B、C正确。',why:'D错误：迁移通常是基团连同 C–R 键电子一起迁到 N。',full:'这四点分别对应大纲中的烷烃、环烷烃、酚与醛酮重排；都能回到前面电子/稳定性模型。'},examTags:['2026大纲兜底','自由基','环烷烃','苯酚','Beckmann'],examBridge:{format:'综合选择同型',ask:'检查被核心高分模块挤压后仍不能漏掉的基础大纲点。',dayNote:'不冒充任何一年原题。',label:'大纲覆盖'}})}

// Refresh examBridge for newly-added questions and ensure all day lesson/question bridges are present.
for(const [dayKey,bridge] of Object.entries(DAY)){
 const day=Data.days[Number(dayKey)];if(!day)continue;
 for(const lesson of day.lessons||[]) lesson.examBridge=lesson.examBridge||{title:bridge.title,formats:bridge.formats,anchor:bridge.anchor,goal:bridge.goal};
 const all=[...(day.questions||[]),...Object.values(day.repairs||{}).flat(),...(day.adaptivePool||[]),...Object.values(day.adaptivePools||{}).flat()];
 for(const question of all){if(question.examBridge)continue;const rule=TYPE[question.type]||{format:'真题能力迁移',ask:'先把题干翻译成已经学过的结构与电子问题。'};question.examBridge={format:rule.format,ask:rule.ask,dayNote:bridge.goal,label:(question.examTags||[]).includes('真题同型训练')?'真题同型训练':'真题能力训练'};}
}

// Mark new lessons with the same closure metadata standard as v4.
const ensureClosureLesson=(lesson)=>{
 lesson.whyChain=Array.isArray(lesson.whyChain)&&lesson.whyChain.length?lesson.whyChain:['为什么要学这一步？因为后续真题会把它当成判断下一步的前提。','为什么不能只背名字？因为结构/条件一换，只有电子与稳定性逻辑能迁移。','怎么知道真的懂了？能不看答案说出“电子从哪来、哪根键变、为什么”。'];
 lesson.analogy=lesson.analogy||{title:'先找一个能抓住的直觉',body:'把新概念接到已经理解的电子、键、官能团或稳定性上。',boundary:'类比只用于搭桥，最终判断仍回到化学结构。'};
};
for(const day of Object.values(Data.days))for(const lesson of day.lessons||[])ensureClosureLesson(lesson);

// Give all new questions the v4 preflight/causal standard if they were appended after v4 overlay.
for(const day of Object.values(Data.days)){
 const all=[...(day.questions||[]),...Object.values(day.repairs||{}).flat(),...(day.adaptivePool||[]),...Object.values(day.adaptivePools||{}).flat()];
 for(const row of all){
  if(!row.preflight)row.preflight={skill:(Data.SKILLS||[]).find(s=>s.id===row.primarySkill)?.label||row.primarySkill||'当前技能',steps:['把题干里的结构/条件翻译成人话','找本题真正变化的键或官能团','只用已经学过的电子/稳定性规则作判断'],why:'真题换外壳时，仍然先做同一套翻译。'};
  if(!Array.isArray(row.causalLadder)||row.causalLadder.length<3)row.causalLadder=['这题为什么先看这个结构？因为它决定反应中心。','为什么这个条件能改变路径？因为它改变电子来源、离去/中间体或能垒。','为什么答案能迁移到新结构？因为判断依据不是题号，而是同一条结构—电子—稳定性逻辑。'];
 }
}

// Refresh manifest focus labels for official coverage without changing the 20-day spine.
const manifest=Data.MANIFEST?.days||[];
const mf=(d,...items)=>{const row=manifest.find(x=>x.day===d);if(row){row.focus=[...(row.focus||[]),...items.filter(x=>!(row.focus||[]).includes(x))]}};
mf(2,'烷烃自由基卤代');mf(3,'环烷烃/环张力');mf(6,'苯酚');mf(7,'Beckmann');mf(16,'杂环','单糖','氨基酸/肽键');

// Day1 must not leak Day2 radical/NBS terminology. Contrast in plain visible structural language only.
const sanitizeDay1=(value)=>{
 if(typeof value==='string')return value
  .replace(/NBS\/?hν?/g,'另一组后续条件')
  .replace(/NBS/g,'另一组后续条件')
  .replace(/烯丙位自由基溴代/g,'保留双键、只替换双键旁 C–H 的溴代')
  .replace(/烯丙位溴代/g,'双键旁 C–H 的取代型溴代')
  .replace(/烯丙位/g,'双键旁边、但不属于双键本身的位置')
  .replace(/H₂\/Pd/g,'HBr');
 if(Array.isArray(value))return value.map(sanitizeDay1);
 if(value&&typeof value==='object'){for(const k of Object.keys(value))value[k]=sanitizeDay1(value[k]);return value}
 return value;
};
sanitizeDay1(Data.days?.[1]);
const replaceBeforeDay4=(value)=>{
 if(typeof value==='string')return value.replace(/位阻较小/g,'周围更不拥挤').replace(/位阻太大/g,'周围太拥挤').replace(/位阻/g,'空间拥挤程度');
 if(Array.isArray(value))return value.map(replaceBeforeDay4);
 if(value&&typeof value==='object'){for(const k of Object.keys(value))value[k]=replaceBeforeDay4(value[k]);return value}
 return value;
};
replaceBeforeDay4(Data.days?.[2]);replaceBeforeDay4(Data.days?.[3]);
const q4=Data.days?.[4]?.questions?.find(row=>row.id==='d04-sn2-condition-01');
if(q4?.explanationLayers?.full)q4.explanationLayers.full=q4.explanationLayers.full.replace(/；叔丁醇钾体积大，易促消除。/g,'；体积很大的强碱会更偏向夺取邻碳上的 H，这条竞争路线在 Day5 再正式命名。');

// Day3 teaches the electron movement before giving the Day4 mechanism label.
const d3door=Data.days?.[3]?.lessons?.find(row=>row.id==='d03-zero-02b-alkylation-door');
if(d3door){
  d3door.whyChain=[
    '为什么负电碳能接到卤代烃的碳上？因为它有一对可用电子，而 C–Br 键被极化后，连 Br 的碳相对缺电子。',
    '为什么旧 C–Br 键要同时断？如果新 C–C 键形成而旧键不动，中心碳会超过常见的四键；所以原 C–Br 键电子移向 Br。',
    '为什么优先选甲基或一级卤代烃？它们反应中心周围更不拥挤，电子丰富的碳更容易从 Br 的反方向靠近。Day4 再给这种一步取代正式命名。'
  ];
}

// Day9 establishes enolate first; named Day10 condensations wait until their own lesson.
const d9alpha=Data.days?.[9]?.lessons?.find(row=>row.id==='d09-zero-01-alpha');
if(d9alpha){d9alpha.whyChain=[
  '为什么羰基旁边的 H 比普通烷烃 H 更容易被碱拿走？因为 C–H 键电子留下后，负电可以借羰基共振分散。',
  '为什么这个负离子不只画一种结构？电子密度分布在 α-C 和 O 之间，两个共振式只是同一个真实结构的极限画法。',
  '为什么今天只学这一种攻击者？先把“谁变成亲核体、它从哪一端进攻”练熟；Day10 再让它面对不同类型的受体。'
];}

// Day2 only primes same-side/opposite-side intuition; formal E/Z waits for the stereochemistry consolidation.
const d2branches=Data.days?.[2]?.lessons?.find(row=>row.id==='d02-lesson-branches');
if(d2branches){
  d2branches.body=d2branches.body.replace(' 这里的“syn”只表示同侧加入；顺/反、E/Z 的完整空间判定以后再学。',' 这里先只把 syn 理解成“从同一侧加入”；更正式的双键空间命名以后再系统学。');
  d2branches.note='这里先把“同侧/异侧”当成看图语言；更正式的双键空间命名与优先级规则到立体化学集中日再系统学。';
  d2branches.whyChain=[
    '为什么同一个 C=C 换试剂会给完全不同产物？因为试剂决定先发生哪种电子移动，反应不是由双键单独决定。',
    '为什么先问“双键消失还是保留”？这是最省力的第一层分类：加成/还原常消耗 π 键，烯丙位取代则保留双键。',
    '为什么今天只说“同侧加入”而不马上塞完整立体命名？先建立空间直觉；正式编号规则以后再补，避免一个页面同时背太多新词。'
  ];
}

// Day3 teaches cis/trans intuition with selective alkyne reduction, without leaking the later formal alkene priority notation.
const d3cis=Data.days?.[3]?.lessons?.find(row=>row.id==='d03-zero-04-cis-trans');
if(d3cis){
  d3cis.title='先只学“同侧 / 异侧”：把空间方向看懂，再学更严格的命名';
  d3cis.body=d3cis.body.replace(/E\/Z/g,'更一般的正式双键空间命名');
  if(d3cis.analogy){d3cis.analogy.body=(d3cis.analogy.body||'').replace(/E\/Z/g,'复杂命名');d3cis.analogy.boundary=(d3cis.analogy.boundary||'').replace(/E\/Z/g,'更严格的优先级命名');}
  d3cis.whyChain=[
    '为什么炔烃还原后要关心“同侧/异侧”？因为 C=C 不能像普通单键那样自由转一圈，生成时的相对方向会被保留下来。',
    '为什么 Lindlar 常给同侧产物？两个 H 都从催化剂表面同一面递给炔键。',
    '为什么现在先不学复杂命名？先把空间图看懂；更严格的优先级规则在立体化学集中日再系统接上。'
  ];
}
const d3lindlar=Data.days?.[3]?.questions?.find(row=>row.id==='d03-lindlar-01');
if(d3lindlar?.explanationLayers?.full)d3lindlar.explanationLayers.full=d3lindlar.explanationLayers.full.replace(/更一般的 E\/Z 命名到 Day15 再学。/g,'更一般的正式双键空间命名到立体化学集中日再系统学习。');

// Day4: keep abbreviations out until their dedicated first-use explanation.
const d4sn1=Data.days?.[4]?.questions?.find(row=>row.id==='d04-sn1-condition-01');
if(d4sn1?.explanationLayers?.full)d4sn1.explanationLayers.full=d4sn1.explanationLayers.full.replace(/H₂O\/EtOH/g,'水/乙醇');

// Rebuild first-use term cards after v5 glossary additions, so new words are explained exactly where they first appear.
const flatLesson=(r)=>[r.title,r.body,r.note,...(r.formulas||[]),...(r.sequence||[]).flatMap(s=>[s.title,s.text,s.formula]),...(r.whyChain||[]),r.microCheck?.prompt,...(r.microCheck?.options||[])].filter(Boolean).join(' ');
const seenTerms=new Set();
for(let d=1;d<=20;d++){
 const day=Data.days?.[d];if(!day)continue;
 for(const row of day.lessons||[]){
  row.termCards=[];const text=flatLesson(row);
  for(const card of G){
   if(seenTerms.has(card.term))continue;
   const hit=typeof Data.glossaryMatches==='function'?Data.glossaryMatches(text,card):(card.aliases||[card.term]).some(alias=>alias&&text.includes(alias));
   if(hit){row.termCards.push(card);seenTerms.add(card.term)}
  }
 }
}
Data.BEGINNER_GLOSSARY_COVERED=[...seenTerms];
})();
