(function(){
  'use strict';
  const Data = window.Organic637Data = window.Organic637Data || {};
  const acts = [
    {id:1,days:[1,2,3,4],title:'先看懂分子怎么说话',subtitle:'从“线是什么、电子在哪”一路长到第一套真正的反应判断。'},
    {id:2,days:[5,6,7,8],title:'把反应归成几种动作',subtitle:'取代、消除、亲核进攻、离去与回落开始连成同一张反应地图。'},
    {id:3,days:[9,10,11,12],title:'开始自己造碳骨架',subtitle:'从 enolate 到芳香环、胺和重氮盐，学会“电子怎么走”和“碳怎么接”。'},
    {id:4,days:[13,14,15,16],title:'从证据和空间反推结构',subtitle:'把分子式、谱图、立体与稳定性统一成可重复使用的推理流程。'},
    {id:5,days:[17,18,19,20],title:'像出题人一样倒着想',subtitle:'逆合成、路线兼容、未见卷与漏洞修复，最后把知识变成真正做题能力。'}
  ];
  const dayMeta = {
    1:{ability:'看懂结构式并追踪第一根会动的键',from:'从完全看不懂结构式开始',today:'会数碳、认 σ/π、理解加成和第一组条件差异',to:'明天会看到：同一个 C=C，条件一换为什么走不同出口',minutes:85},
    2:{ability:'把“条件”翻译成反应路线',from:'昨天会看 C=C 和最基础加成',today:'学会过氧化物、氢硼化、加氢、氧化裂解、烯丙位',to:'明天把同样的电子逻辑带到 C≡C 和第一次 C–C 增碳',minutes:85},
    3:{ability:'开始主动构建新 C–C 键',from:'已经会看条件改变产物',today:'端炔酸性、炔负离子、选择性还原与 Diels–Alder',to:'明天把“电子多→电子缺”的逻辑正式变成 SN2 / SN1',minutes:85},
    4:{ability:'从底物和条件判断取代路径',from:'已经会追踪电子来源与新键形成',today:'SN2 一步换人、SN1 先离去再进攻、重排与溶剂影响',to:'明天加入“抽走 β-H”的消除路线，四路开始竞争',minutes:85},
    5:{ability:'在 SN1/SN2/E1/E2 之间做条件判决',from:'会判断两条取代路线',today:'加入 β-H、强碱、温度、anti 几何和主产物选择',to:'明天把这些动作放到醇、醚和环氧这个氧元素枢纽',minutes:85},
    6:{ability:'把含氧官能团当成可互换的交通站',from:'已经会取代、消除和离去',today:'氧化、脱水、Williamson、醚裂解、环氧开环',to:'明天进入羰基：同样的“电子多找电子缺”会更清楚',minutes:85},
    7:{ability:'用一个母机理统领醛酮反应',from:'会识别电子源、离去与新键形成',today:'C=O 极化、亲核加成、还原、Grignard、缩醛、Wittig',to:'明天只多学一个动作：四面体中间体回落并把 Y 推走',minutes:90},
    8:{ability:'看懂亲核酰基取代和衍生物活性',from:'会做羰基亲核加成',today:'酰氯/酸酐/酯/酰胺统一成“进攻→回落→离去”',to:'明天把羰基旁边的 α-H 变成新的 C–C 成键入口',minutes:85},
    9:{ability:'第一次用 enolate 主动造 C–C 键',from:'会看羰基电子缺口',today:'α-H、共振、enolate 与 Aldol 的新 C–C 键',to:'明天不换攻击者，只换受体，长出 Claisen / Michael',minutes:85},
    10:{ability:'用“同一个 enolate 攻击谁”统一多种缩合',from:'已经会生成 enolate 并攻击羰基',today:'Claisen、Michael、β-二羰基、烷基化、脱羧',to:'明天把“电子离域带来的稳定”搬到苯环',minutes:90},
    11:{ability:'从芳香稳定性判断 EAS 与定位',from:'会用共振解释稳定性',today:'芳香性、EAS、活化/钝化、邻对间定位与 Friedel–Crafts',to:'明天把芳环路线接到胺和重氮盐这个万能接口',minutes:85},
    12:{ability:'把芳香合成变成路线图而不是试剂表',from:'会判断芳环定位和 EAS',today:'胺碱性、重氮化、Sandmeyer、保护与 CN +1C',to:'明天开始反过来：从证据推分子，而不是从反应推产物',minutes:85},
    13:{ability:'用硬证据先砍掉不可能结构',from:'前12天一直在“结构→反应”',today:'分子式、DBE、化学检验、IR 与候选排除',to:'明天加入 NMR，把“有几种H、多少H、邻居是谁”也纳入证据链',minutes:85},
    14:{ability:'把 NMR 当成约束系统锁定结构',from:'会用 DBE/IR 缩小候选',today:'位移、积分、裂分、对称性与多证据联立',to:'明天解决“连法一样但空间不一样”的立体问题',minutes:90},
    15:{ability:'把三维问题翻译成二维算法',from:'已经会确定分子连法',today:'CIP、R/S、Fischer、E/Z、构象与反应立体后果',to:'明天把前15天零碎判断压缩成几位“总裁判”',minutes:85},
    16:{ability:'用少数底层判据做排序和机理',from:'已经见过大量具体反应',today:'共振、诱导、杂化、芳香性、位阻、稳定性与电子箭头',to:'明天开始倒着想：从目标结构反推最后一步',minutes:85},
    17:{ability:'会做 1–3 步逆合成并正向验算',from:'已经有完整反应工具箱',today:'目标差异、碳数账本、最后一步、断键与关键 C–C',to:'明天加入路线顺序、保护和官能团兼容性',minutes:90},
    18:{ability:'能比较多条路线而不是只背参考答案',from:'会找到合理的短逆合成',today:'多步顺序、兼容、保护、芳环定位和路线评价',to:'明天拿掉教学标签，做一套真正混合未见卷',minutes:90},
    19:{ability:'在没有章节提示时独立切换解题模式',from:'已经完成反应、结构、机理和合成的系统训练',today:'150 分 Boss 未见卷，记录速度、置信度和真实断点',to:'明天只修最影响分数的 Top 3 漏洞，再做换结构迁移',minutes:90},
    20:{ability:'把最后漏洞修成可迁移能力',from:'Boss 卷已经暴露真实薄弱点',today:'诊断→退回一层→重新理解→换结构→无提示迁移',to:'20天结束后按复习队列保持，而不是从头重学',minutes:85}
  };
  Data.COURSE_JOURNEY = { slogan:'学懂有机，会做真题', acts, dayMeta };
  for (let day=1;day<=20;day++) {
    if (Data.days?.[day] && dayMeta[day]) {
      Data.days[day].estimatedMinutes = dayMeta[day].minutes;
      Data.days[day].journey = dayMeta[day];
      Data.days[day].act = acts.find(a=>a.days.includes(day))?.id || 1;
    }
  }
})();
