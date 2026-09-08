(function(){
'use strict';
const Data=window.Organic637Data=window.Organic637Data||{};Data.days=Data.days||{};
const G=Data.BEGINNER_GLOSSARY=Array.isArray(Data.BEGINNER_GLOSSARY)?Data.BEGINNER_GLOSSARY:[];
const add=(item)=>{if(!G.some(x=>x.term===item.term))G.push(item)};
[
{term:'质子 H⁺',aliases:['H⁺','质子'],plain:'在酸碱反应里，H⁺就是氢原子失去电子后留下的氢核。做有机题时常把“转移 H⁺”简称质子转移。',why:'酸碱反应本质上经常是“谁把电子对拿去和 H⁺ 成键”。',limit:'溶液里几乎没有孤零零的裸 H⁺，常被溶剂包围；写 H⁺ 是方便的反应语言。',diagram:'proton'},
{term:'酸 / 碱（质子定义）',aliases:['酸性','酸','强酸','强碱','碱'],plain:'在最常用的 Brønsted 模型里：酸愿意给出 H⁺，碱用一对电子接住 H⁺。',why:'pKa、端炔去质子化、E2 抢 β-H 都能回到“谁给 H⁺、谁接 H⁺”。',limit:'Lewis 酸碱范围更广，芳香反应里会再补。',diagram:'acid-base'},
{term:'催化剂',aliases:['催化剂','催化'],plain:'提供一条更低能垒路径、让反应更快，但在一个完整催化循环后会被再生的物质。',why:'Pd、Pt、Ni、H₂SO₄、AlCl₃ 等常不是“最终装进产物的零件”，而是在帮反应换一条更容易走的路。',limit:'催化剂也可能暂时与底物成键；“最后再生”不等于全过程毫无变化。',diagram:'catalyst'},
{term:'吸附',aliases:['吸附'],plain:'分子暂时贴在固体表面并与表面发生相互作用，不是钻进固体内部。',why:'催化加氢里 H₂ 和烯烃先在金属表面被吸附/活化，才更容易重新成键。',limit:'吸附强弱和表面结构会影响反应。',diagram:'adsorption'},
{term:'hν / 光照',aliases:['hν','光照'],plain:'hν 表示光子能量。题目里常提示“用光把某根较弱键引发为自由基过程”。',why:'NBS/hν、某些卤化反应看到光照，要先想到单电子世界可能被打开。',limit:'不是所有见光反应都一定是自由基。',diagram:'light'},
{term:'THF',aliases:['THF'],plain:'四氢呋喃，一种常用醚类溶剂。BH₃·THF 中，THF 主要帮助稳定并携带 BH₃；做产物账本时，真正加到双键上的关键来自 B–H。',why:'这样你不会误以为“THF 也要接进产物”。',limit:'实验上 THF 也会影响溶解和反应环境。',diagram:'solvent'},
{term:'H₂O₂ / 过氧化氢',aliases:['H₂O₂','H2O2','过氧化氢'],plain:'过氧化氢含 O–O 键，是常见氧化剂。氢硼化第二步中它把 C–B 位置转换为 C–O，最后得到 –OH。',why:'它解释了“第一步装 B，第二步为什么能变成 OH”。',limit:'不同体系中过氧化氢还能参与很多其它氧化反应。',diagram:'oxidant'},
{term:'KMnO₄ / 高锰酸钾',aliases:['KMnO₄','高锰酸钾'],plain:'高锰酸钾是常见强氧化剂。冷稀/热浓条件反应深度不同；本课程遇到“热、浓”时重点预测双键氧化裂解。',why:'题目不只看试剂名，还要看浓度、温度和后处理。',limit:'实际产物依底物与具体条件而变。',diagram:'oxidant'},
{term:'NaNH₂ / 氨基钠',aliases:['NaNH₂','NaNH2','氨基钠'],plain:'非常强的碱，可把端炔 pKa≈25 的 H 较充分夺走，得到炔负离子。它的共轭酸是 NH₃，pKa 约 38。',why:'选择碱不是看名字“强不强”，而是比较酸/共轭酸的 pKa。',limit:'遇水会迅速反应，实验条件要求严格无水。',diagram:'base-pka'},
{term:'HgSO₄ 催化炔烃水合',aliases:['HgSO₄','HgSO4'],plain:'Hg²⁺ 能帮助炔键在酸性水溶液中发生水合。端炔经典情况下先得到烯醇，随后互变为更稳定的酮。',why:'它把“炔烃 + 水”这条本来慢的路径催化打开。',limit:'区域选择和末端/内炔结构有关。',diagram:'alkyne-hydration'},
{term:'Na / 液氨还原',aliases:['Na/NH₃','Na / NH₃','液氨'],plain:'金属 Na 在液氨中提供单电子，炔烃经过单电子/质子化步骤，常停在反式烯烃。',why:'它与 Lindlar 的同面加氢形成非常重要的条件对比。',limit:'真实机理包含自由基阴离子等中间体。',diagram:'dissolving-metal'},
{term:'亲双烯体',aliases:['亲双烯体'],plain:'Diels–Alder 中与共轭二烯配对的“2π 伙伴”，通常是一根烯键或炔键；若带吸电子基常更容易反应。',why:'先分清“4π 的二烯”和“2π 的伙伴”，六元环怎么拼就不再神秘。',limit:'取代基、构象和轨道能量都会影响速度与选择性。',diagram:'diels-alder'},
{term:'溶剂解',aliases:['溶剂解'],plain:'溶剂本身直接充当亲核体参与取代，例如叔丁基卤代物在水/乙醇里先电离，再由水/乙醇接上。',why:'它解释了 SN1 题里为什么“溶剂”不仅是背景。',limit:'不同溶剂亲核性和离子稳定能力不同。',diagram:'solvolysis'},
{term:'氢迁移 / 重排',aliases:['氢迁移','1,2-氢迁移'],plain:'碳正离子形成后，相邻 C–H 键可以连同那对键电子一起迁到缺电子碳上，使正电荷转移到原来那个相邻碳。',why:'若迁移后得到更稳定碳正离子，重排路径可能胜出。',limit:'只有存在寿命足够的中间体时才讨论这类重排；SN2 没有自由碳正离子。',diagram:'hydride-shift'},
{term:'NaOEt / 乙醇钠',aliases:['NaOEt','EtONa','EtO⁻','乙醇钠'],plain:'乙醇失去 H⁺ 后得到乙氧负离子 EtO⁻，Na⁺只是配对阳离子。EtO⁻ 是较强碱，也有不错亲核性。',why:'二级卤代烃遇它时，SN2 与 E2 都可能竞争，温度会影响主次。',limit:'具体强弱受溶剂和底物影响。',diagram:'ethoxide'},
{term:'t-BuOK / 叔丁醇钾',aliases:['t-BuOK','t-BuO⁻','叔丁醇钾'],plain:'叔丁醇失去 H⁺ 得到体积很大的叔丁氧负离子。它很会夺 H，却很难挤到拥挤碳中心。',why:'所以它常强化 E2，并提高 Hofmann 较少取代烯烃比例。',limit:'“大碱=永远 Hofmann”不是绝对规则。',diagram:'bulky-base'},
{term:'PCC',aliases:['PCC'],plain:'一种较温和、常用于醇氧化的 Cr(VI) 试剂。基础预测：一级醇常停在醛，二级醇到酮。',why:'它和 Jones/强 KMnO₄ 对一级醇的“继续氧化到酸”形成条件对比。',limit:'具体溶剂和水分会影响结果。',diagram:'pcc'},
{term:'Jones 氧化',aliases:['Jones'],plain:'常指 Cr(VI) 的强酸性水溶液氧化体系。一级醇通常继续氧化到羧酸，二级醇到酮。',why:'它帮助你理解“同一个一级醇，温和/强氧化剂能停在不同台阶”。',limit:'三级醇通常不能简单靠失去 α-H 变普通羰基。',diagram:'jones'},
{term:'Fischer 酯化',aliases:['Fischer 酯化','Fischer esterification'],plain:'羧酸与醇在酸催化、加热下可逆生成酯和水。',why:'它把羧酸和醇连接成酯，是羧酸衍生物里非常常见的官能团转化。',limit:'平衡反应常需移水或使用过量反应物推动。',diagram:'esterification'},
{term:'Me / Et / Ph / Ar 简写',aliases:['Me','Et','Ph','Ar'],plain:'常见有机简写：Me=CH₃–（甲基），Et=CH₃CH₂–（乙基），Ph=C₆H₅–（苯基），Ar=泛指芳基。',why:'后期公式为了不被长结构淹没会用这些缩写；看到时要能立刻还原。',limit:'Ar 不只等于苯基；Ph 才特指苯基。',diagram:'organic-abbrev'},
{term:'s / d / t / q 峰型',aliases:['singlet','doublet','triplet','quartet','s/d/t/q','q+t'],plain:'¹H NMR 常把峰型简称：s=单峰、d=二重峰、t=三重峰、q=四重峰。它们描述一组信号被分成几条。',why:'简单 n+1 情形中，邻 2H 常给 t，邻 3H 常给 q。',limit:'复杂耦合不一定整齐符合 n+1。',diagram:'nmr-multiplets'},
{term:'低场 / 去屏蔽',aliases:['低场','去屏蔽','下场'],plain:'H 周围电子密度较少时，外加磁场的影响更直接，信号常出现在较大的 δ/ppm，也叫更低场/去屏蔽。',why:'O、C=O、芳环各向异性等都可能把附近 H 推向较大 ppm。',limit:'化学位移是多因素共同结果。',diagram:'deshielding'},
{term:'轴向 / 赤道向',aliases:['axial','equatorial','轴向','赤道位','赤道向'],plain:'环己烷椅式中，每个碳有一根大致上下的轴向键 axial，另一根沿环外围伸展的赤道向键 equatorial。',why:'大基团通常更喜欢赤道向，能减少与同侧轴向 H 的拥挤。',limit:'椅式翻转会交换 axial/equatorial，但 up/down 关系保持。',diagram:'chair-ax-eq'},
{term:'交叉式 / 重叠式',aliases:['staggered','eclipsed','交叉式','重叠式'],plain:'沿 C–C 单键看 Newman：前后键错开 60° 叫交叉式，前后键投影重叠叫重叠式。',why:'交叉式电子/空间排斥通常更小，能量更低。',limit:'取代基大小会进一步区分 anti/gauche。',diagram:'newman-staggered'},
{term:'anti / gauche 构象',aliases:['gauche','anti/gauche'],plain:'在交叉式 Newman 中，两大基团二面角约 180° 叫 anti，约 60° 叫 gauche。',why:'大基团相隔更远的 anti 通常更稳定。',limit:'这里的 anti 是构象术语，不要和 E2 的 anti-periplanar 混为完全同一个标签。',diagram:'newman-anti-gauche'},
{term:'Lewis 酸',aliases:['Lewis 酸','Lewis acid'],plain:'能接受一对电子的物种。AlCl₃、FeBr₃ 常通过接受卤素/酰氯上的电子对来增强其亲电性。',why:'它解释了芳香取代里为什么加入 AlCl₃/FeBr₃ 后才能生成更强的亲电物种。',limit:'Lewis 酸定义比“给 H⁺ 的酸”更广。',diagram:'lewis-acid'},
{term:'硝鎓离子 NO₂⁺',aliases:['NO₂⁺','硝鎓'],plain:'苯硝化时真正被芳环 π 电子进攻的强亲电体。通常由 HNO₃/H₂SO₄ 体系生成。',why:'先找真正 E⁺，再画芳环进攻，机理就能和其它 EAS 统一。',limit:'不需要把混酸里所有平衡都背下来。',diagram:'nitronium'},
{term:'酰鎓离子',aliases:['酰鎓','RCO⁺'],plain:'Friedel–Crafts 酰基化中的关键碳亲电体，可用 R–C≡O⁺ ↔ R–C⁺=O 共振表示。',why:'它相对不易像普通烷基碳正离子那样重排，所以酰基化常更可控。',limit:'真实体系常与 Lewis 酸配位。',diagram:'acylium'},
{term:'重氮化',aliases:['重氮化'],plain:'把芳香伯胺 ArNH₂ 在低温下转成芳基重氮盐 ArN₂⁺ 的过程，常用 NaNO₂/HCl 原位生成亚硝酸性物种。',why:'重氮盐是后续 Sandmeyer、变 OH、偶联等路线的通用中转站。',limit:'芳基重氮盐通常低温制备并及时使用。',diagram:'diazotization'},
{term:'Cu(I)',aliases:['Cu(I)'],plain:'表示铜处于 +1 氧化态。Sandmeyer 常用 CuCl、CuBr、CuCN 这类 Cu(I) 盐帮助重氮基被替换。',why:'这里先把它当作帮助完成基团替换的催化/促进角色。',limit:'具体机理包含单电子过程，基础阶段不必展开全部铜循环。',diagram:'copper-one'}
].forEach(add);

const q=(d,id)=>Data.days?.[d]?.questions?.find(x=>x.id===id);
const l=(d,id)=>Data.days?.[d]?.lessons?.find(x=>x.id===id);
const insertAfter=(d,afterId,item)=>{const a=Data.days?.[d]?.lessons;if(!a||a.some(x=>x.id===item.id))return;const i=a.findIndex(x=>x.id===afterId);a.splice(i<0?a.length:i+1,0,item)};

// Day1 repairs must stay inside Day1 knowledge: no future condition names in the prompt.
for(const r of Data.days?.[1]?.repairs?.['alkene.hx_markovnikov']||[]){r.prompt=String(r.prompt||'').replace(/（无 ROOR）/g,'（只给普通 HBr 条件）').replace(/ROOR/g,'');}

// Day2: remove hybridization jargon before Day3 and make every unfamiliar condition legible.
let x=l(2,'d02-zero-06-nbs');
if(x){
 x.body=x.body.replace('紧挨 C=C、但不在双键上的那个 sp³ 碳叫烯丙位。','紧挨 C=C、但自己不在双键上的那个饱和碳位置叫烯丙位。');
 x.sequence=(x.sequence||[]).map(s=>({...s,text:String(s.text||'').replace(/sp³/g,'饱和')}));
 x.note='看到 NBS/hν 时先逐字翻译：NBS 提供温和溴源；hν 是光照，引发单电子链反应；目标通常是烯丙位 H。';
}
x=l(2,'d02-zero-04-hydroboration');if(x){x.body='BH₃·THF 先拆开看：BH₃ 是关键反应物；THF 是一种醚类溶剂，主要帮助稳定 BH₃，不会整块接进产物。B 在 BH₃ 中只有 6 个价层电子，电子偏缺，所以能接受烯烃 π 电子。与此同时 B–H 键把 H 送到另一个双键碳，两件事在同一个协同步骤里发生，因此没有自由碳正离子。B 更偏向空间较不拥挤、取代较少的一端。第二步 H₂O₂/OH⁻ 中，H₂O₂ 是过氧化氢氧化剂，它把 C–B 所在位置转换为 C–O，最后得到 –OH。';}
x=l(2,'d02-zero-05-hydrogenation');if(x){x.body='单独让 H₂ 去撞烯烃并不容易。Pd/Pt/Ni 是金属催化剂：它们提供更低能垒的表面路径。H₂ 和 C=C 会先“吸附”——也就是暂时贴在金属表面并与表面相互作用，不是钻进金属内部。H–H 被活化，π 键也更容易重新组织，最后两个 H 分别接到原双键两端，而催化剂在循环后被再生。';}
x=l(2,'d02-zero-03-cut-double');if(x){x.body+=' 题目常写 1) O₃ 2) Zn/H₂O：O₃ 是臭氧，负责把双键氧化裂开；Zn/H₂O 是还原后处理，帮助最终停在醛/酮层级，而不是把醛继续强氧化。';}
x=l(2,'d02-zero-07-kmno4');if(x){x.body='“氧化”先用原子账理解：同一个碳周围 C–O/C–X 键变多、C–H 键变少，通常就是碳被氧化。KMnO₄ 是高锰酸钾；题目特别写“热、浓”时表示氧化能力很强。它可把 C=C 两端切开：切口碳若原来还有 H，往往继续推到羧酸；若没有 H，常停在酮。最后“酸化”只是把反应体系中的羧酸盐转成便于写出的羧酸形式。';}

// Day3: mechanics first, SN2 name postponed to Day4.
x=l(3,'d03-lesson-acetylide');if(x){x.note='酸性“更强”是相对比较，不等于 NaOH 就一定够强。选碱时要比较：碱的共轭酸 pKa 是否明显高于端炔约 25。';}
insertAfter(3,'d03-zero-01-hybridization',{
 id:'d03-zero-01b-acid-base',eyebrow:'Day 3 · “强碱”到底强在哪',title:'别凭感觉选 NaNH₂：用“夺 H 以后谁更愿意留下”比较',
 body:'碱就是用一对电子去接 H⁺ 的角色。要让 RC≡CH 变成 RC≡C⁻，平衡要愿意往右走。最实用判断是比较两边酸的 pKa：端炔约 25；NaNH₂ 对应的共轭酸 NH₃ 约 38。右边的酸 NH₃ 更弱（pKa 更大），所以平衡明显偏向炔负离子。NaOH 的共轭酸 H₂O pKa 约 15.7，反而比端炔更强，不能把端炔较完全地去质子化。',
 formulas:['RC≡CH + NH₂⁻ ⇌ RC≡C⁻ + NH₃','pKa: 25 → 38，平衡偏右','OH⁻ 的共轭酸 H₂O pKa≈15.7：不够'],
 analogy:{title:'像把球从一个“更愿意抓 H”的人手里转给另一个',body:'最终更偏向“弱酸 + 弱碱”的一侧。pKa 越大，那个酸越不愿意把 H⁺ 交出去。',boundary:'这是酸碱平衡的简化方向判断，具体溶剂也会影响数值。'},
 sequence:[{title:'先找要被夺走的 H',text:'端炔末端 ≡C–H。',formula:'RC≡C–H',diagram:'terminal-alkyne'},{title:'再看碱手里的电子对',text:'NH₂⁻ 用孤对电子接 H。',formula:':NH₂⁻ → H',diagram:'acid-base'},{title:'C–H 键电子留给碳',text:'得到炔负离子。',formula:'C–H → C:⁻',diagram:'deprotonation'},{title:'最后用 pKa 检查平衡方向',text:'25 → 38，产物侧酸更弱，因此可行。',formula:'25 < 38',diagram:'pka'}],
 whyChain:['为什么 NH₂⁻ 能拿走 H？因为它有可用孤对电子，能与 H 形成 N–H 键。','为什么 C–H 断后电子归碳？这是酸碱异裂：H 作为 H⁺ 被转移，原键电子留在碳上。','为什么 NaOH 不够？因为生成 H₂O 会把平衡拉回去；H₂O 的 pKa 比端炔低。'],
 microCheck:{prompt:'要较充分去质子化 pKa≈25 的端炔，哪种共轭酸 pKa 更合适？',options:['NH₃≈38','H₂O≈15.7'],answer:0,feedback:'产物侧共轭酸越弱（pKa 越大），去质子化越有利。'}
});
x=l(3,'d03-zero-02b-alkylation-door');if(x){x.title='先不背机理编号：只看“带电子的碳从背后接上，同时把 Br 顶走”';x.body='炔负离子末端碳有一对可用电子。若遇到 CH₃CH₂Br 这类不拥挤的一级卤代烃，它可以从 C–Br 的背后靠近：自己的电子对开始形成新 C–C 键，同时原 C–Br 键那对电子全部归 Br，Br⁻ 离开。Day4 会给这种“背面成键、同时离去”的动作正式命名；今天先把电子账看懂。';}
for(const id of ['d03-alkylation-01','d03-route-hexyne-01']){x=q(3,id);if(x){x.prompt=String(x.prompt).replace(/SN2/g,'背面取代').replace(/E2/g,'夺 H 形成烯烃');x.examTags=(x.examTags||[]).map(t=>String(t).replace(/SN2/g,'背面取代').replace(/E2/g,'消除支路'));x.hints=(x.hints||[]).map(t=>String(t).replace(/SN2/g,'背面取代').replace(/E2/g,'夺 H 形成烯烃'));if(x.explanationLayers)for(const k of ['short','why','full'])x.explanationLayers[k]=String(x.explanationLayers[k]||'').replace(/SN2/g,'背面取代').replace(/E2/g,'夺 H 形成烯烃');}}
x=l(3,'d03-lesson-selectivity');if(x){x.body='炔烃加成后可以停在不同层级。HgSO₄/H₂SO₄/H₂O 是经典酸性水合条件：Hg²⁺ 帮炔键被水加成，先得到“烯醇”——也就是 C=C–OH 这种结构；它通常会通过质子转移和 π 键移动互变成更稳定的羰基。Lindlar 则是温和的金属催化还原，目标是停在顺式烯烃；Na/液氨走单电子路径，常给反式烯烃。';}
x=l(3,'d03-lesson-diene');if(x){x.body='共轭二烯有连续 4 个 π 电子；Diels–Alder 的另一方叫“亲双烯体”，通常提供 2 个 π 电子。反应在一个协同基本步骤里重新组织 6 个 π 电子，同时形成两根新的 C–C σ 键和一根新的 π 键，得到六元环。你可以先把它看成“4π 片段 + 2π 片段合成一个六边形”。';}

// Day4: remove Day5 reagents from distractors and make SN1/SN2 naming earned rather than dumped.
x=l(4,'d04-zero-01-roles');if(x){x.body='你前面已经会说“电子多的一方”和“电子缺的一方”。今天只是给角色贴正式标签：亲核体 Nu 是能拿出一对电子形成新键的角色；亲电中心是电子不足、能接住这对电子的位置；离去基 X 是断键时能带走原键电子离开的部分。先看角色，再学两种不同时间顺序。';}
x=l(4,'d04-zero-02-sn2-why-back');if(x){x.body+=' 这种“一步里 Nu 从背面成键、X 同时离开”的取代，正式名叫 SN2。S=取代 substitution，N=亲核 nucleophilic，2 表示关键速率步骤同时涉及两种粒子。名字最后再记，动作先看懂。';}
x=l(4,'d04-zero-03-sn1-wait');if(x){x.body+=' 这种“先由底物自己电离，后面亲核体再来”的取代叫 SN1。1 提醒你关键慢步骤只涉及一个底物分子。';}
x=q(4,'d04-sn2-condition-01');if(x)x.options=[{id:'a',label:'NaCN / DMSO'},{id:'b',label:'水/乙醇，且底物换成三级卤代烃'},{id:'c',label:'低极性烃类溶剂、没有强亲核体'}];

// Day5: explicitly introduce the two common bases before testing them.
insertAfter(5,'d05-zero-01-base-vs-nu',{
 id:'d05-zero-01b-bases',eyebrow:'Day 5 · 先把试剂名字拆开',title:'NaOEt 和 t-BuOK 不是密码：先看真正会夺 H 的阴离子',
 body:'NaOEt 可拆成 Na⁺ + EtO⁻。Et 是乙基 CH₃CH₂–，所以 EtO⁻ 就是乙氧负离子 CH₃CH₂O⁻。t-BuOK 可拆成 K⁺ + t-BuO⁻；t-Bu 表示叔丁基 (CH₃)₃C–，所以 t-BuO⁻ 是体积很大的叔丁氧负离子。真正去夺 β-H 的是 O⁻ 那一端；Na⁺/K⁺ 主要是配对阳离子。',
 formulas:['NaOEt → Na⁺ + CH₃CH₂O⁻','t-BuOK → K⁺ + (CH₃)₃CO⁻'],
 analogy:{title:'像同样拿着钳子的两只手，一只小、一只戴着厚拳套',body:'两者都有 O⁻ 这把“夺 H 的钳子”，但叔丁氧负离子周围更拥挤，更难把手伸进碳中心。',boundary:'溶剂与离子配对也会影响实际反应性。'},
 sequence:[{title:'乙醇钠先拆离子',text:'真正反应的是 EtO⁻。',formula:'NaOEt → Na⁺ + EtO⁻',diagram:'ethoxide'},{title:'叔丁醇钾也拆离子',text:'真正反应的是 t-BuO⁻。',formula:'t-BuOK → K⁺ + t-BuO⁻',diagram:'bulky-base'},{title:'比较体积',text:'EtO⁻ 较小；t-BuO⁻ 很大。',formula:'small vs bulky',diagram:'base-size'}],
 microCheck:{prompt:'t-BuOK 条件里真正去夺 β-H 的主要角色是谁？',options:['K⁺','t-BuO⁻','整个分子必须完整撞上'],answer:1,feedback:'对，先把盐拆成离子，才知道电子对在谁手里。'}
});

// Day6: named reagents and the intentionally early Grignard bridge are explained before use.
x=l(6,'d06-lesson-oxidation');if(x){x.body+=' PCC 是较温和的 Cr(VI) 氧化剂，常让一级醇停在醛；Jones 是更强的酸性 Cr(VI) 水溶液体系，一级醇更容易继续到羧酸。先看“氧化到哪一阶”，再记试剂名。';}
insertAfter(6,'d06-lesson-epoxide',{
 id:'d06-zero-03-grignard-preview',eyebrow:'Day 6 · 提前借一把 Day7 的“碳亲核体”',title:'CH₃MgBr 为什么能给环氧“多接两个碳”？先只学这一件事',
 body:'CH₃MgBr 属于 Grignard 试剂。C–Mg 键很偏极，做反应预测时可把 CH₃ 这一端看成“带着一对可用电子的碳”。它会从背面攻击环氧中较不拥挤的碳，环氧 C–O 键打开。注意：CH₃MgBr 本身带来 1 个碳，但环氧乙烷本身的两个环碳会一起留在新链里，所以从 CH₃ 这段视角看，相当于一次接上一个 2C 片段。完整 Grignard 与羰基反应 Day7 再系统学。',
 formulas:['CH₃–MgBr ≈ CH₃:⁻（预测模型）','CH₃:⁻ + 环氧乙烷 → CH₃CH₂CH₂O⁻ →[H⁺] CH₃CH₂CH₂OH'],
 analogy:{title:'像一只带着“碳积木”的手去掰开小三角环',body:'攻击点一接上，三元环的两个碳都并入新的链，因此碳链明显变长。',boundary:'CH₃⁻ 并不是溶液中自由裸离子，这是极化反应模型。'},
 sequence:[{title:'先看 C–Mg 极性',text:'C 端更富电子。',formula:'Cδ−–Mgδ+',diagram:'grignard-polar'},{title:'C 端攻击环氧较少取代碳',text:'背面接上新的 C–C 键。',formula:'CH₃:⁻ → epoxide C',diagram:'epoxide-carbon-attack'},{title:'C–O 键同步开环',text:'原键电子归 O，得到 O⁻。',formula:'C–O → O⁻',diagram:'epoxide-open'},{title:'酸化只是给 O⁻ 补 H',text:'最后得到醇。',formula:'O⁻ + H⁺ → OH',diagram:'protonate'}],
 whyChain:['为什么攻击较少取代碳？因为这是类似背面取代的开环，位阻越小越容易接近。','为什么环会愿意开？因为三元环角度被压得很紧，打开能释放环张力。','为什么最后要酸化？第一步得到的是 O⁻，需要 H⁺ 才变成中性 OH。']
});
x=q(6,'d06-williamson-01');if(x&&x.explanationLayers)x.explanationLayers.full=String(x.explanationLayers.full||'').replace(/alkoxide/g,'烷氧负离子');
x=q(6,'d06-epoxide-base-01');if(x)x.formula=String(x.formula||'').replace(/less substituted C/g,'较少取代碳');
x=q(6,'d06-epoxide-acid-01');if(x)x.formula=String(x.formula||'').replace(/more substituted C/g,'较多取代碳');

// Day7: abbreviations must be translated once before they appear everywhere.
insertAfter(7,'d07-zero-02-carbonyl-names',{
 id:'d07-zero-02b-abbrev',eyebrow:'Day 7 · 结构式开始变长，所以学四个常见简写',title:'Me、Et、Ph、Ar 都不是元素：把它们随时还原成真实片段',
 body:'有机化学为了少写长结构，常用 Me、Et、Ph、Ar。Me=CH₃– 甲基；Et=CH₃CH₂– 乙基；Ph=C₆H₅– 苯基；Ar=泛指芳基。以后看到 PhCHO，不要把 Ph 当成新原子，它只是把 C₆H₅– 缩成两个字母。',
 formulas:['Me = CH₃–','Et = CH₃CH₂–','Ph = C₆H₅–','Ar = 芳基的通用占位'],
 analogy:{title:'像把常用地址存成通讯录缩写',body:'信息没有消失，只是写短了；做原子账时随时可以展开。',boundary:'Ar 可以是各种芳基，不只苯基；Ph 特指苯基。'},
 sequence:[{title:'Me',text:'一个碳。',formula:'Me = CH₃–',diagram:'organic-abbrev'},{title:'Et',text:'两个碳。',formula:'Et = CH₃CH₂–',diagram:'organic-abbrev'},{title:'Ph',text:'苯环去一个 H 后的苯基。',formula:'Ph = C₆H₅–',diagram:'organic-abbrev'}],
 microCheck:{prompt:'PhCHO 里的 Ph 应展开成什么？',options:['C₆H₅–','P 和 H 两个元素','CH₃–'],answer:0,feedback:'Ph 是 phenyl（苯基）的常用简写。'}
});

// Day8: distinguish two Fischers.
x=l(8,'d08-lesson-ester');if(x){x.body='Fischer 酯化是羧酸 + 醇在酸催化、加热下可逆生成酯和水的经典反应。今天先把它当作一个反应名字：酸和醇经过一连串加成、质子转移与失水，最后得到酯。酸水解是逆方向；碱性皂化则生成羧酸盐，由于羧酸盐很稳定，通常更趋向单向。';x.whyChain=[];x.termCards=[];}
const fproj=G.find(x=>x.term==='Fischer 投影');if(fproj)fproj.aliases=['Fischer 投影','Fischer projection'];

// Day9: do not name Day10 reactions before they are taught.
x=l(9,'d09-zero-01-alpha');if(x)x.body=String(x.body||'').replace(/Aldol、Claisen、Michael[^。]*。?/g,'今天先只处理 Aldol；明天再把同一个 enolate 换不同对手。');
x=l(9,'d09-lesson-crossed');if(x)x.note='今天只把 Aldol 的“谁当供体、谁当受体”弄清楚。下一天再扩展到其它 enolate 反应。';

// Day11: translate English jargon and define actual electrophiles.
x=l(11,'d11-lesson-electrophiles');if(x){x.body='硝化、卤代、磺化、Friedel–Crafts 的共同动作仍是“芳环 π 电子去接一个强亲电体 E⁺”。硝化最常见 E⁺ 是硝鎓离子 NO₂⁺；Br₂/FeBr₃ 中 FeBr₃ 作为 Lewis 酸把 Br₂ 强烈极化；Friedel–Crafts 酰基化中 RCOCl/AlCl₃ 生成强亲电的酰鎓离子。先找到真正亲电体，再复用同一套 EAS。';x.formulas=['HNO₃/H₂SO₄ → NO₂⁺','Br₂/FeBr₃ → 更强的 Br 亲电物种','RCOCl/AlCl₃ → 酰鎓离子 RCO⁺'];}

// Day12: make the low-temperature diazotization ingredients explicit.
x=l(12,'d12-lesson-diazo');if(x){x.body='芳香伯胺 ArNH₂ 在 0–5°C 用 NaNO₂/HCl 做“重氮化”。NaNO₂ 是亚硝酸钠；在酸中原位生成能把 –NH₂ 转成 –N₂⁺ 的活性亚硝化物种。最终得到 ArN₂⁺Cl⁻。这个 –N₂⁺ 是很好的中转基团，因为离去后形成 N₂ 气体非常稳定。';}
x=l(12,'d12-lesson-sandmeyer');if(x){x.body='Sandmeyer 用 Cu(I) 盐帮助芳基重氮基换成 Cl、Br、CN。Cu(I) 只是说铜处在 +1 氧化态，例如 CuCl、CuBr、CuCN。基础做题不必展开完整铜循环，只要知道“先重氮化，再按目标选对应 Cu(I) 盐”。';}

// Day13: explain units and bicarbonate test instead of assuming lab familiarity.
x=l(13,'d13-zero-02-ir');if(x){x.body+=' IR 横轴常写波数 cm⁻¹，读作“每厘米”，它与振动光的频率/能量相关。你不需要把 cm⁻¹ 当成长度去算，只把它当作每类键常出现的“地址刻度”。';}
x=l(13,'d13-lesson-tests');if(x){x.body+=' 例如 NaHCO₃ 是碳酸氢钠：羧酸能把 H⁺ 给 HCO₃⁻，先生成 H₂CO₃，随后分解成 CO₂↑ + H₂O，所以明显冒气泡可作为羧酸证据。';}

// Day14: first translate English peak names and why ppm moves.
insertAfter(14,'d14-lesson-nmr-map',{
 id:'d14-zero-03-multiplet-words',eyebrow:'Day 14 · 先翻译谱图里的英文缩写',title:'singlet / doublet / triplet / quartet 只是“1、2、3、4 条”的名字',
 body:'谱图常把峰型写成 s、d、t、q。singlet=单峰（1条），doublet=二重峰（2条），triplet=三重峰（3条），quartet=四重峰（4条）。这些名字本身没有新机理，只是在数一组信号被裂成几条。等你看到 n+1 时，再解释为什么邻居数会决定条数。',
 formulas:['s = 1 条','d = 2 条','t = 3 条','q = 4 条'],
 analogy:{title:'像把“一个铃声”分成几条并排的小铃声',body:'先只数条数，不急着猜结构；条数背后再由邻氢耦合解释。',boundary:'复杂谱可能出现 multiplet 等不规则多重峰。'},
 sequence:[{title:'s',text:'singlet，1条。',formula:'s = 1',diagram:'nmr-multiplets'},{title:'t',text:'triplet，3条。',formula:'t = 3',diagram:'nmr-multiplets'},{title:'q',text:'quartet，4条。',formula:'q = 4',diagram:'nmr-multiplets'}],
 microCheck:{prompt:'quartet 最直接只是说这组信号被分成几条？',options:['1','3','4'],answer:2,feedback:'对，先翻译词；为什么变四条，下一页再用邻氢解释。'}
});
x=l(14,'d14-lesson-shift');if(x){x.body='化学位移 δ 是信号在横轴上的位置，单位常写 ppm。H 周围电子越多，电子越能部分抵消外磁场，叫“屏蔽”；若 O、羰基、芳香 π 系统把附近电子密度拉走，H 更“去屏蔽”，常移动到更大的 ppm，也称更低场。先把“电子环境 → 屏蔽程度 → ppm”这条因果链记住，再用几个锚点。';}

// Day15: translate conformation vocabulary before questions.
x=l(15,'d15-lesson-conformation');if(x){x.body='单键旋转能产生不同“构象”，不需要断键。沿 C–C 单键用 Newman 投影看：前后键错开 60° 的交叉式（staggered）通常比重叠式（eclipsed）稳；在交叉式里，大基团相隔 180° 叫 anti，相隔 60° 叫 gauche。环己烷椅式中，大致上下的键叫轴向 axial，沿环外围伸出的叫赤道向 equatorial；大基团通常偏赤道向以减少 1,3-二轴拥挤。';x.formulas=['交叉式 staggered < 重叠式 eclipsed（能量）','大基团：anti 通常比 gauche 稳','环己烷：大基团通常偏 equatorial 赤道向'];}

// Translate residual unnecessary English in student-facing material.
for(let d=1;d<=20;d++){
 const day=Data.days?.[d];if(!day)continue;
 const rows=[...(day.lessons||[]),...(day.questions||[])];
 for(const row of rows){
   for(const key of ['body','note','prompt','formula']) if(typeof row[key]==='string') row[key]=row[key].replace(/matching alkoxide/gi,'与酯烷氧基相匹配的烷氧负离子').replace(/phenoxide/gi,'苯氧负离子').replace(/ethoxide/gi,'乙氧负离子').replace(/less substituted/gi,'较少取代').replace(/more substituted/gi,'较多取代');
   if(row.explanationLayers)for(const key of ['short','why','full'])if(typeof row.explanationLayers[key]==='string')row.explanationLayers[key]=row.explanationLayers[key].replace(/matching alkoxide/gi,'与酯烷氧基相匹配的烷氧负离子').replace(/phenoxide/gi,'苯氧负离子').replace(/ethoxide/gi,'乙氧负离子');
 }
}

function flatLesson(r){return [r.title,r.body,r.note,...(r.formulas||[]),...(r.sequence||[]).flatMap(s=>[s.title,s.text,s.formula]),...(r.whyChain||[]),r.microCheck?.prompt,...(r.microCheck?.options||[])].filter(Boolean).join(' ')}
function flatQ(r){return [r.prompt,r.formula,...(r.options||[]).map(o=>typeof o==='string'?o:o?.label||''),...(r.hints||[]),r.explanationLayers?.short,r.explanationLayers?.why,r.explanationLayers?.full].filter(Boolean).join(' ')}

// Make first-use aliases safer after adding new terminology.
const degree=G.find(x=>x.term==='一级/二级/三级碳');if(degree)degree.aliases=['一级碳','二级碳','三级碳','一级碳正离子','二级碳正离子','三级碳正离子','1°','2°','3°'];
const acidBase=G.find(x=>x.term==='酸 / 碱（质子定义）');if(acidBase)acidBase.aliases=['强酸','强碱','酸性条件','碱性条件','酸碱反应'];
const axeq=G.find(x=>x.term==='轴向 / 赤道向');if(axeq)axeq.aliases=['轴向键','赤道位','赤道向','axial','equatorial'];

// Rebuild first-use term cards from scratch after all v4 mutations.
const seen=new Set();
for(let d=1;d<=20;d++){
 const day=Data.days?.[d];if(!day)continue;
 for(const row of day.lessons||[]){
   row.termCards=[];const text=flatLesson(row);
   for(const card of G){if(seen.has(card.term))continue;if(Data.glossaryMatches?Data.glossaryMatches(text,card):(card.aliases||[card.term]).some(a=>a&&text.includes(a))){row.termCards.push(card);seen.add(card.term)}}
   // Every lesson gets a real why-chain. When no author chain exists, build it from the lesson's own causal statement instead of a generic compliment.
   if(!Array.isArray(row.whyChain)||!row.whyChain.length){
     const cards=row.termCards.slice(0,3);
     if(cards.length) row.whyChain=cards.map(c=>`为什么这里必须先懂“${c.term}”？${c.why}`);
     else if(row.analogy?.boundary) row.whyChain=[`为什么这个类比有用？${row.analogy.body||'它先提供直觉。'}`,`为什么不能把类比机械套到底？${row.analogy.boundary}`];
     else row.whyChain=['为什么这一步值得单独学？因为后面的判断会直接调用这里的结构变化或电子账；如果这一步说不清，就先不要往后背结论。'];
   }
 }
}
Data.BEGINNER_GLOSSARY_COVERED=[...seen];

// Causal ladders: after every question, show the reusable reason chain rather than only the answer.
const chainRules=[
 [/^(alkene|alkyne|diene)\./,['先找 π 键/多键：它提供较暴露的电子。','再完整读条件：条件决定走离子、自由基、表面催化还是裂解。','最后做原子账：原多键哪一层消失，哪些新键形成，碳骨架是否改变。']],
 [/^(substitution)\./,['先找亲电碳与离去基：C–X 的碳是被进攻位置。','再看亲核体的电子对能否靠近；位阻和溶剂决定背面进攻是否容易。','若先生成碳正离子，就再检查稳定性与重排；若协同一步，就没有自由碳正离子。']],
 [/^(elimination)\./,['先标 α-C、相邻 β-C 和 β-H。','碱的电子对先对准 β-H；C–H 键电子必须去形成 C=C，同时 C–X 键电子归 X。','再比较几何、碱体积和烯烃稳定性决定主产物。']],
 [/^(alcohol|ether|epoxide)\./,['先圈 O 以及与 O 直接相连的碳。','判断条件是在改造 OH、氧化碳、做背面取代还是释放环张力。','每一步都检查 C–O/C–H 键数和电荷是否守恒。']],
 [/^(carbonyl)\./,['先画 Cδ+=Oδ−：亲核体真正要打的是缺电子的羰基碳。','Nu 的电子对形成 C–Nu 时，C=O 的 π 电子必须先移到 O，否则碳会超过常见价数。','随后用质子化/离去/还原等后续步骤把 O 的电荷处理成最终产物。']],
 [/^(carboxyl)\./,['先认酰基碳 C=O，它仍是亲电中心。','亲核体先加到羰基碳，得到四面体中间体。','中间体再回落重建 C=O，并把能离开的 Y 推走；活性差异核心看 Y 的离去能力和共振给电子。']],
 [/^(enolate)\./,['先找羰基旁 α-H，问失去 H 后负电能否被 C=O 共振分担。','生成 enolate 后，明确它的碳亲核端。','再看对手是谁：醛/酮、酯、共轭烯酮或卤代烃，决定下一种成键动作。']],
 [/^(aromatic)\./,['先确认芳环连续共轭和芳香稳定性。','芳环 π 电子去接 E⁺ 时会暂时失去芳香性，形成 σ-络合物。','最后去掉 H⁺ 恢复芳香性；取代基通过稳定/不稳定不同 σ-络合物决定方向。']],
 [/^(amine|diazonium|nitrile)\./,['先找 N 的孤对电子或重氮基的离去能力。','若是胺碱性，比较孤对电子有多可用；若是重氮盐，利用 N₂ 离去的驱动力换基团。','若用 CN 接入骨架，要把腈碳算进总碳数，再决定水解/还原去向。']],
 [/^(structure)\./,['先只记录题目给出的硬证据，不先猜唯一结构。','DBE/IR/NMR/化学检验各自只回答自己能回答的问题。','候选只有与某条硬证据冲突时才排除；证据不够就保留多个。']],
 [/^(stereo)\./,['先固定连接关系，再看空间方向，不能把“换画法”误认为“换分子”。','需要编号时先按 CIP；需要构象时只做不破键的旋转/环翻转。','最后检查你判断的是构型、构象还是两分子关系。']],
 [/^(synthesis)\./,['先比较起点与终点：碳数、官能团、关键新 C–C 键分别变了什么。','从终点倒推最后一步，再检查前体能否由已有反应得到。','最后正向走一遍，检查步骤顺序、官能团兼容性、选择性和是否有更短可行路线。']],
 [/^(ranking)\./,['先确认题目到底在排酸性、稳定性、反应性还是物性。','一次只找最主导的差异因素，不把所有术语同时堆上去。','每比较一对都说出“这个因素如何改变电子/能量/位阻”，再拼成总顺序。']]
];
for(let d=1;d<=20;d++){
 const day=Data.days?.[d];if(!day)continue;
 const rows=[...(day.questions||[]),...Object.values(day.repairs||{}).flat(),...(day.adaptivePool||[]),...Object.values(day.adaptivePools||{}).flat()];
 for(const question of rows){
   const rule=chainRules.find(([re])=>re.test(String(question.primarySkill||'')));
   question.causalLadder=question.causalLadder||(rule?rule[1]:['先把题干每个陌生词翻译成已经学过的结构/电子语言。','再只做题目真正要求的一个判断，不跨步猜结论。','最后用原子数、键数、电荷和已学条件检查答案是否自洽。']);
 }
}

Data.BEGINNER_CLOSURE_V4={version:'4.0.0',glossaryCount:G.length};
})();
