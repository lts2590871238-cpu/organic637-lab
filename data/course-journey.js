(function(){
  'use strict';
  const Data = window.Organic637Data = window.Organic637Data || {};
  const acts = [
    {id:1,days:[1,2,3,4],title:'现场：你甚至还看不懂证据',subtitle:'从结构语言和条件差异起步，到能判断第一组真正的取代路径。'},
    {id:2,days:[5,6,7,8],title:'实验记录开始撒谎',subtitle:'用四路竞争、氧枢纽、羰基和酰基取代证明：最初事故解释不了全部结果。'},
    {id:3,days:[9,10,11,12],title:'碳骨架不会撒谎',subtitle:'沿新C—C键、Route-B、芳环位置和重氮/腈接口重建隐藏路线，并打开B3。'},
    {id:4,days:[13,14,15,16],title:'无名样品',subtitle:'让DBE、IR、NMR、手性证据和3D各自只说它真正能证明的事。'},
    {id:5,days:[17,18,19,20],title:'重建 L-20',subtitle:'倒推路线、核对22:14、完成无扶手审核，再把Top3漏洞真正修成迁移能力。'}
  ];
  const dayMeta = {
    1:{ability:'读懂最基础的结构证据',from:'从完全看不懂结构式开始',today:'结构语言、官能团、电子丰富/缺乏与第一条HBr电子故事',to:'明天看同一根C=C为什么会被不同条件送到不同出口',minutes:49},
    2:{ability:'把完整条件翻译成不同反应出口',from:'已经能读懂双键和最基础加成',today:'HBr/ROOR、氢硼化、加氢、臭氧化与简化NBS判断',to:'明天追查R-17，并第一次主动用炔负离子构建C—C键',minutes:49},
    3:{ability:'看见小结构差异如何改变行为并主动增碳',from:'已经会用条件区分烯烃出口',today:'端炔酸性、炔负离子、C—C构建与cis/trans选择性还原',to:'明天进入第二只烧瓶，用SN1/SN2判断事故后发生了什么',minutes:51},
    4:{ability:'从底物和条件判断SN1还是SN2',from:'已经会追踪电子来源和新键形成',today:'亲核体/离去基、SN2背面进攻、SN1等待与重排',to:'明天加入消除路线，把SN1/SN2/E1/E2放进同一张决策图',minutes:54},
    5:{ability:'在四条竞争路线间做条件判决',from:'会判断两条取代路线',today:'β-H、强碱、温度、anti几何与四路竞争',to:'明天把这些动作带到醇、醚、环氧这个氧枢纽',minutes:55},
    6:{ability:'把含氧官能团看成互通的反应枢纽',from:'已经会取代、消除与离去',today:'OH离去问题、氧化、Williamson、环氧开环与+2C',to:'明天进入羰基，检查X-17编号背后的成键可能',minutes:51},
    7:{ability:'用羰基亲核加成母动作解释一组反应',from:'会识别电子源和电子缺口',today:'C=O极化、亲核加成、NaBH4与Grignard；保护基延后到真正需要时',to:'明天用亲核酰基取代继续追标签与路线',minutes:51},
    8:{ability:'用一套“进攻—回落—离去”统一酰基反应',from:'已经会做羰基亲核加成',today:'酰基衍生物活性方向、酰基取代、酯化/水解与酰氯到酰胺',to:'明天用enolate追那根多出来的C—C键',minutes:50},
    9:{ability:'用enolate主动解释新的C—C键',from:'已经确认最初事故解释不完整',today:'α-H、enolate、共振、Aldol与脱水',to:'明天打开六个月前的Route-B，统一Claisen/Michael构碳',minutes:52},
    10:{ability:'把多种构碳反应压缩成统一enolate地图',from:'已经会Aldol构建C—C',today:'Claisen、Michael、β-二羰基、丙二酸酯/乙酰乙酸酯与脱羧',to:'明天用芳环取代位置识别路线指纹',minutes:54},
    11:{ability:'从芳香稳定性和取代基效应判断EAS位置',from:'会用共振解释稳定与反应方向',today:'芳香性、EAS母动作、定位、活化/钝化与卤素例外',to:'明天打开B3，并用重氮/腈把芳香路线接起来',minutes:53},
    12:{ability:'把重氮与腈当成路线接口而不是试剂表',from:'会判断芳环定位和EAS',today:'NO₂→NH₂、重氮、N₂⁺转换、CN +1C与腈的水解/还原',to:'明天从X-17的分子式、DBE和IR开始做真正的结构侦探',minutes:54},
    13:{ability:'用硬证据先砍掉不可能结构',from:'B3里出现了没有正式记录的X-17',today:'分子式、DBE、IR、关键检验与候选排除，只走到证据允许的位置',to:'明天加入NMR，用对称性和裂分锁定X-17平面结构',minutes:49},
    14:{ability:'把NMR变成约束系统锁定平面结构',from:'已经用DBE/IR把X-17缩到芳香羰基体系',today:'位移、积分、裂分、对称性与X-17联合鉴定',to:'明天先拿起3D分子，再解决连接关系相同但空间身份不同的问题',minutes:53},
    15:{ability:'真正看懂手性而不是只背二维口诀',from:'X-17平面结构已经锁定',today:'四面体、镜像重合、CIP/R/S、E/Z与L20-0/L20-F空间比较',to:'明天把谱图、手性、反应和稳定性证据放到同一张桌上',minutes:59},
    16:{ability:'判断一题真正由哪个底层因素主导',from:'已经完成结构、反应和立体核心工具箱',today:'用共振、诱导、杂化、芳香性、位阻和中间体等做综合判断',to:'明天不靠证词定人，先从L20-F倒着恢复隐藏路线',minutes:51},
    17:{ability:'会做短逆合成并用碳数与条件正向验算',from:'已经知道样品身份不合格',today:'目标差异、碳数账本、最后一步、断键与LAB-20隐藏路线',to:'明天加入顺序、保护与兼容性，把路线证据和22:14记录对上',minutes:53},
    18:{ability:'比较路线顺序与兼容性并形成完整证据链',from:'Route-B尾段已经能从化学上闭合',today:'顺序、保护、氧化还原兼容、路线评价与22:14记录核对',to:'明天拿掉漫画、3D和扶手，只做核心综合审核',minutes:55},
    19:{ability:'在没有章节提示时独立切换解题模式',from:'案件线索与前18天能力已经完整',today:'58分钟核心综合审核，记录六大能力域与Top3真实断点',to:'明天只修最影响分数的Top3，并提交最终案件报告',minutes:58},
    20:{ability:'把真实断点修成可迁移能力',from:'Day19已经给出Top3',today:'最终案件报告 + Top3诊断修复 + 换结构微Boss，不再加入新核心知识',to:'20天结束后按复习队列保持；完整150分卷作为独立考前模拟',minutes:54}
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
