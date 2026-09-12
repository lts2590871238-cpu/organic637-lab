(() => {
  'use strict';

  const NS = window.Organic637 = window.Organic637 || {};

  NS.V16_STORY = {
    caseId: 'lab20-zero-sample',
    title: 'LAB-20：零号样品',
    theme: '实验失败不是最危险的；最危险的是有人开始觉得“差不多也可以算对”。',

    characters: {
      zhouYan: {
        id: 'zhouYan', name: '周砚', role: '项目负责人', palette: 'navy',
        traits: ['克制', '严格', '承担高压管理环境的责任'],
        canonicalAction: '未参与篡改；21:56后要求暂停项目处理。'
      },
      xuLinchuan: {
        id: 'xuLinchuan', name: '许临川', role: '合成负责人', palette: 'wine',
        traits: ['专业', '理性', '逐步说服自己结果“足够接近”'],
        canonicalAction: '发现事故后采用备用路线补救，并于22:14删除真实偏差记录。'
      },
      linCen: {
        id: 'linCen', name: '林岑', role: '分析平台主管', palette: 'teal',
        traits: ['谨慎', '证据优先', '前中期主要红鲱鱼'],
        canonicalAction: '发现异常后擅自封存L20-0、L20-F与X-17以保存证据。'
      },
      guYao: {
        id: 'guYao', name: '顾遥', role: '博士生', palette: 'purple',
        traits: ['临近答辩', '紧张', '第一块多米诺骨牌'],
        canonicalAction: '19:52发生R-17试剂体系混淆，并因害怕承担后果而隐瞒部分事实。'
      },
      chengYe: {
        id: 'chengYe', name: '程野', role: '实验室管理员', palette: 'amber',
        traits: ['负责仪器库存门禁', '承担轻松气氛', '爱讲八卦但不伪造证据'],
        canonicalAction: '提供库存、门禁、设备与实验室日常信息。',
        mayPlantFalseEvidence: false
      }
    },

    timeline: {
      r17Pickup: '19:52',
      anomalyObserved: '20:16',
      guReportsToXu: '20:23',
      xuConfirmsDeviation: '20:31',
      backupRouteOpened: '20:47',
      backupRoutePrinted: '20:58',
      deviationRecorded: '21:06',
      x17Produced: '21:18',
      x17Discarded: '21:26',
      quickAnalysis: '21:31',
      linReadsDeviation: '21:38',
      linColdRoomEnter: '21:42',
      samplesSealed: '21:46',
      x17Sealed: '21:49',
      linColdRoomExit: '21:53',
      pauseMessage: '21:56',
      xuNoticesSamplesMissing: '22:03',
      recordDeletion: '22:14',
      finalSave: '22:19',
      zhouCallsTeam: '23:47',
      missingConfirmed: '00:17'
    },

    revealGates: {
      guYaoIncidentPartial: { minDay: 3 },
      secretRouteConfirmed: { minDay: 9 },
      zeroSampleFound: { minDay: 12 },
      x17IdentityConfirmed: { minDay: 14 },
      stereoMismatchConfirmed: { minDay: 15 },
      xuRecordTamperingConfirmed: { minDay: 18 }
    },

    facts: {
      zeroSampleMissingAppearance: { id: 'zero_sample_missing_appearance', truth: 'L20-0离开原储存位置，但并未离开实验室。' },
      guYaoR17Mixup: { id: 'guyao_r17_mixup', truth: '顾遥发生R-17A/R-17B体系混淆，这是第一起事故。' },
      linPreservedEvidence: { id: 'lin_preserved_evidence', truth: '林岑将三份关键样品封存到B3以保存证据。' },
      backupRouteUsed: { id: 'backup_route_used', truth: '事故后有人主动执行了被否决的Route-B补救尾段。' },
      x17IdentityConfirmed: { id: 'x17_identity_confirmed', truth: 'X-17被确定为4-bromoacetophenone，是非手性芳香酮中间体。' },
      xuDeletedRecord: { id: 'xu_deleted_record', truth: '许临川于22:14删除“条件偏差+补救路线”说明。' },
      finalSampleWrongIdentity: { id: 'final_sample_wrong_identity', truth: 'L20-F连接关系接近目标，但对映体组成与L20-0不等价。' }
    },

    factGates: {
      zero_sample_missing_appearance: 1,
      guyao_r17_mixup: 3,
      backup_route_used: 9,
      lin_preserved_evidence: 12,
      x17_identity_confirmed: 14,
      final_sample_wrong_identity: 15,
      xu_deleted_record: 18
    },

    contradictions: {
      recordVersionsDiffer: { id: 'record_versions_differ', text: '同一实验记录存在版本差异，且最后一次关键编辑发生在22:14。' }
    },

    testimony: {
      chengRecordsReady: { id: 'cheng_records_ready', speaker: 'chengYe', requiresScene: 'case01-open', text: '程野：门禁、库存与仪器记录可以逐项核对。' },
      linRecordVersion: { id: 'lin_record_version', speaker: 'linCen', requiresScene: 'case01-open', text: '林岑：当前记录与她早些时候看到的版本不同。' }
    },

    routeMilestones: {
      backupRouteConfirmed: { id: 'route_backup_confirmed', requiresFact: 'backup_route_used', text: '确认事故后存在第二条补救路线。' },
      x17Locked: { id: 'route_x17_locked', minDay: 14, text: 'X-17 平面结构被锁定，可用于回推隐藏路线。' },
      stereoBranchLocked: { id: 'route_stereo_branch_locked', requiresFact: 'final_sample_wrong_identity', text: '最终样品的立体身份与零号样品不一致。' }
    },

    finalReport: {
      categories: [
        { id:'operation_error', label:'操作失误 / 事故' },
        { id:'procedure_violation', label:'程序违规' },
        { id:'record_falsification', label:'记录篡改' }
      ],
      actors: {
        guYao: { name:'顾遥', correct:'operation_error', detail:'拿错/混淆R-17体系是操作事故；之后隐瞒部分事实属于不当，但她没有伪造22:14记录。' },
        linCen: { name:'林岑', correct:'procedure_violation', detail:'未经完整授权转移并封存样品违反程序，但目的和结果是保存证据，不是篡改实验事实。' },
        xuLinchuan: { name:'许临川', correct:'record_falsification', detail:'擅自执行补救路线已越过项目授权边界；22:14主动删除真实偏差记录，是最终必须区分出的记录篡改。' }
      }
    },

    scenes: {
      'case00-cast': {
        id: 'case00-cast', day: 1, title: 'LAB-20｜调查组成员', layout: 'cast-intro',
        cast: ['zhouYan','chengYe','linCen','guYao','xuLinchuan'],
        intro: 'L-20 是校内联合实验室最重要的一条合成项目。三个月前，零号样品 L20-0 曾成功通过全部验收。今晚，它从应该出现的位置消失了。',
        outro: '凌晨 00:17，项目组被临时叫回实验室。你作为刚进入项目的调查助理，将从他们每个人的证词和化学证据里重建那一晚。'
      },
      'case01-open': {
        id: 'case01-open', day: 1, title: 'CASE 01｜零号样品',
        unlockFacts: ['zero_sample_missing_appearance'],
        panels: [
          {
            background: 'coldRoomNight', timeKey: 'missingConfirmed', evidence: 'zeroSampleBox',
            caption: '原本应该放着 L20-0 的位置空了。封条本身看不出明显破坏。'
          },
          {
            background: 'meetingRoom', characters: [{ id: 'zhouYan', pose: 'serious' }, { id: 'chengYe', pose: 'tired' }],
            dialogue: [
              { speaker: 'zhouYan', text: '先别猜是谁做的。把事实和推测分开。' },
              { speaker: 'chengYe', text: '门禁、库存、仪器记录我都给你。至于 NMR——我看它一直像心电图。' }
            ]
          },
          {
            background: 'analysisLab', characters: [{ id: 'linCen', pose: 'concerned' }], evidence: 'recordVersions',
            dialogue: [
              { speaker: 'linCen', text: '这份记录和我早些时候看到的版本不一样。' },
              { speaker: 'zhouYan', text: '先记住“发生过变化”。别急着替变化解释原因。' }
            ]
          },
          {
            background: 'meetingRoom', characters: [{ id: 'zhouYan', pose: 'neutral' }],
            dialogue: [
              { speaker: 'zhouYan', text: '你先从最基础的证据开始：把结构式读成连接关系。能读懂，接下来才能判断变化是否化学上合理。' }
            ]
          }
        ]
      },
      'case01-return': {
        id: 'case01-return', day: 1, title: '回到证物台',
        panels: [
          {
            background: 'analysisLab', characters: [{ id: 'linCen', pose: 'thinking' }], evidence: 'zeroSampleStructure',
            dialogue: [
              { speaker: 'linCen', text: '现在先别管它叫什么。数碳、找 O、圈出 Br，把它读成一张连接地图。' }
            ]
          },
          {
            background: 'meetingRoom', characters: [{ id: 'chengYe', pose: 'teasing' }], evidence: 'recordVersions',
            dialogue: [
              { speaker: 'chengYe', text: '顺便说一句，实验室里叫 final、final2、final真的最终版 的文件，通常都不是最终版。' }
            ]
          },
          {
            background: 'meetingRoom', characters: [{ id: 'zhouYan', pose: 'serious' }],
            dialogue: [
              { speaker: 'zhouYan', text: '结构能读懂以后，下一步才是判断：记录里的变化，究竟只是写法变化，还是化学事实也变了。' }
            ]
          }
        ]
      },
      'case01-cliffhanger': {
        id: 'case01-cliffhanger', day: 1, title: '22:14',
        unlockContradictions: ['record_versions_differ'],
        panels: [
          {
            background: 'analysisLab', timeKey: 'recordDeletion', evidence: 'recordVersions',
            dialogue: [
              { speaker: 'linCen', text: '最后一次关键编辑时间：22:14。' },
              { speaker: 'zhouYan', text: '今天先不判断是谁。只确认一件事：这份记录确实被改过。' }
            ]
          },
          {
            background: 'meetingRoom', characters: [{ id: 'chengYe', pose: 'teasing' }, { id: 'zhouYan', pose: 'stern' }],
            dialogue: [
              { speaker: 'chengYe', text: '那“final真的最终版”以后是不是要列入违禁文件名？' },
              { speaker: 'zhouYan', text: '先把样品和三个版本弄清楚。' }
            ]
          },
          {
            background: 'coldRoomNight', caption: 'CASE 01 CLOSE · 明天：三个版本'
          }
        ]
      },
      'case02-open': {
        id:'case02-open', day:2, title:'CASE 02｜三个版本',
        panels:[
          { background:'analysisLab', evidence:'recordVersions', caption:'同一份L-20记录留下了三个版本。条件栏里只有几处很小的差异。' },
          { background:'meetingRoom', characters:[{id:'linCen',pose:'thinking'}], dialogue:[{speaker:'linCen',text:'不要先问哪个版本“看起来最正式”。先问：条件一换，化学结果会不会跟着换。'}] }
        ]
      },
      'case02-return': {
        id:'case02-return', day:2, title:'条件不是备注',
        panels:[
          { background:'analysisLab', evidence:'recordVersions', dialogue:[{speaker:'zhouYan',text:'你刚刚已经看到，同一根双键会因为条件不同走向完全不同的出口。记录里的斜杠、光照和后处理都不能当装饰。'}] },
          { background:'cafeteria', characters:[{id:'chengYe',pose:'teasing'}], dialogue:[{speaker:'chengYe',text:'我们实验室最危险的四个字通常不是“反应失控”，是“条件差不多”。'}] }
        ]
      },
      'case02-cliff': {
        id:'case02-cliff', day:2, title:'21:42—21:53',
        panels:[
          { background:'coldRoomNight', caption:'门禁记录显示：21:42林岑进入冷藏室，21:53离开。' },
          { background:'meetingRoom', characters:[{id:'zhouYan',pose:'serious'}], dialogue:[{speaker:'zhouYan',text:'这是事实，不是结论。明天先去查R-17。'}] }
        ]
      },
      'case03-open': {
        id:'case03-open', day:3, title:'CASE 03｜R-17',
        panels:[
          { background:'synthesisLab', evidence:'r17Labels', caption:'旧照片里出现两个外观近似的试剂体系：R-17A与R-17B。库存记录指向顾遥。' },
          { background:'synthesisLab', characters:[{id:'guYao',pose:'nervous'}], dialogue:[{speaker:'guYao',text:'瓶子的位置后来动过。我那天确实拿过R-17……但我不确定自己最开始拿的是哪一瓶。'}] }
        ]
      },
      'case03-return': {
        id:'case03-return', day:3, title:'一处小差别',
        panels:[
          { background:'synthesisLab', evidence:'r17Labels', dialogue:[{speaker:'linCen',text:'先别把“标签不同”当成行政错误。一个小结构差异，足够让酸性、选择性和后续成键方式都改变。'}] }
        ]
      },
      'case03-cliff': {
        id:'case03-cliff', day:3, title:'第一块多米诺骨牌', unlockFacts:['guyao_r17_mixup'],
        panels:[
          { background:'meetingRoom', characters:[{id:'guYao',pose:'nervous'}], dialogue:[{speaker:'guYao',text:'20:16我就觉得不对。20:23，我去找了许老师。'}] },
          { background:'meetingRoom', characters:[{id:'zhouYan',pose:'serious'}], dialogue:[{speaker:'zhouYan',text:'事故已经出现，但事故是不是最后结果的全部原因，还不能下结论。'}] }
        ]
      },
      'case04-open': {
        id:'case04-open', day:4, title:'CASE 04｜第二只烧瓶',
        panels:[
          { background:'synthesisLab', caption:'台面照片里，事故烧瓶旁还有第二只被重新使用过的烧瓶。' },
          { background:'meetingRoom', characters:[{id:'guYao',pose:'nervous'}], dialogue:[{speaker:'guYao',text:'我告诉许老师以后，他让我先走，说“我来处理”。'}] }
        ]
      },
      'case04-cliff': {
        id:'case04-cliff', day:4, title:'谁在主动进攻',
        panels:[
          { background:'synthesisLab', dialogue:[{speaker:'linCen',text:'第二只烧瓶说明事故后有人继续操作。接下来要判断的不是“有没有继续”，而是继续时走了哪条机制。'}] }
        ]
      },
      'case05-open': {
        id:'case05-open', day:5, title:'CASE 05｜四条岔路',
        panels:[
          { background:'analysisLab', evidence:'recordVersions', dialogue:[{speaker:'zhouYan',text:'同一个底物，在亲核体、碱、温度和位阻变化后会走不同岔路。今天用这张判断图去反查事故后的第二只烧瓶。'}] }
        ]
      },
      'case05-cliff': {
        id:'case05-cliff', day:5, title:'事故解释不完',
        panels:[
          { background:'analysisLab', dialogue:[{speaker:'linCen',text:'只靠顾遥最初拿错R-17，无法得到后来检测到的那类结果。事故后一定发生了新的主动选择。'}] },
          { background:'meetingRoom', dialogue:[{speaker:'zhouYan',text:'从今天起，把问题改成：20:31之后，谁做了什么？'}] }
        ]
      },
      'case06-open': {
        id:'case06-open', day:6, title:'CASE 06｜氧的痕迹',
        panels:[
          { background:'analysisLab', evidence:'oxygenTrace', caption:'清洗记录和残余样品里出现连续的含氧官能团变化。它们像一串没有写在正式路线里的脚印。' },
          { background:'cafeteria', characters:[{id:'chengYe',pose:'teasing'}], dialogue:[{speaker:'chengYe',text:'林岑以前留过一句话：放大异常时，先查中间体。她写得像遗嘱，其实只是特别讨厌跳步骤。'}] }
        ]
      },
      'case06-return': {
        id:'case06-return', day:6, title:'氧不是终点',
        panels:[
          { background:'synthesisLab', dialogue:[{speaker:'linCen',text:'醇、醚、环氧不是三章互不相干的知识。把它们看成一个氧枢纽，才看得出有人怎样把错误中间体继续往下推。'}] }
        ]
      },
      'case06-cliff': {
        id:'case06-cliff', day:6, title:'半条消息',
        panels:[
          { background:'meetingRoom', characters:[{id:'guYao',pose:'nervous'}], caption:'顾遥手机备份里只恢复出半句： “先别报，后面也许能……”' },
          { background:'meetingRoom', dialogue:[{speaker:'zhouYan',text:'别替缺失的后半句填答案。明天看羰基证据。'}] }
        ]
      },
      'case07-open': {
        id:'case07-open', day:7, title:'CASE 07｜羰基上的指纹',
        panels:[
          { background:'analysisLab', evidence:'outsideReport', caption:'第三方快速报告里出现一个陌生峰型，同时样品清单边缘写着“X-17”。系统里没有这个编号。' },
          { background:'analysisLab', characters:[{id:'linCen',pose:'thinking'}], dialogue:[{speaker:'linCen',text:'先把编号放一边。看羰基：谁是电子缺口，谁会进攻，哪些变化真的能把碳骨架接起来。'}] }
        ]
      },
      'case07-return': {
        id:'case07-return', day:7, title:'编号不存在，化学会留下痕迹',
        panels:[
          { background:'meetingRoom', characters:[{id:'xuLinchuan',pose:'defensive'},{id:'linCen',pose:'concerned'}], dialogue:[{speaker:'xuLinchuan',text:'一个临时编号不能证明有人走了备用路线。'}, {speaker:'linCen',text:'同意。所以我们不用编号定结论，只看它能不能由已经确认的反应得到。'}] }
        ]
      },
      'case07-cliff': {
        id:'case07-cliff', day:7, title:'X-17',
        panels:[
          { background:'analysisLab', evidence:'x17Bottle', caption:'废弃样品区的旧照片里，同样出现了“X-17”。它第一次成为需要解释的真实对象。' }
        ]
      },
      'case08-open': {
        id:'case08-open', day:8, title:'CASE 08｜被重新贴过的标签',
        panels:[
          { background:'synthesisLab', evidence:'r17Labels', caption:'R-17A/B瓶身标签的胶痕与库存照片不一致。' },
          { background:'meetingRoom', characters:[{id:'guYao',pose:'nervous'}], dialogue:[{speaker:'guYao',text:'标签是我后来重新贴的。我怕别人一眼就看出我拿错过。'}] }
        ]
      },
      'case08-return': {
        id:'case08-return', day:8, title:'回落以后还能把谁推出去',
        panels:[
          { background:'synthesisLab', dialogue:[{speaker:'zhouYan',text:'今天学的重点不是多背四种羧酸衍生物，而是看懂“进攻—四面体—回落—离去”这一套动作。用它检查事故后还能发生哪些真正的转换。'}] }
        ]
      },
      'case08-cliff': {
        id:'case08-cliff', day:8, title:'“你先走，我来处理”',
        panels:[
          { background:'meetingRoom', characters:[{id:'guYao',pose:'nervous'}], dialogue:[{speaker:'guYao',text:'20:23以后，许老师让我先走。他说：“你先走，我来处理。”'}] },
          { background:'analysisLab', dialogue:[{speaker:'linCen',text:'现在已经能排除一个解释：最终异常不可能只由最初拿错试剂自动产生。事故后有人主动继续了化学操作。'}] }
        ]
      },
      'case09-open': {
        id:'case09-open', day:9, title:'CASE 09｜多出来的一根C—C键', unlockFacts:['backup_route_used'],
        panels:[
          { background:'analysisLab', evidence:'routeFragment', caption:'把已知中间体与后续样品做碳数账本，一根新的C—C键无法由原正式路线解释。' },
          { background:'meetingRoom', characters:[{id:'zhouYan',pose:'serious'}], dialogue:[{speaker:'zhouYan',text:'从这里开始，“第二条路线存在”不再只是猜测。我们要重建它。'}] }
        ]
      },
      'case09-return': {
        id:'case09-return', day:9, title:'碳骨架不会替人圆谎',
        panels:[
          { background:'synthesisLab', dialogue:[{speaker:'linCen',text:'条件可以写错，标签可以重贴，但新出现的C—C键必须有真正的成键步骤。今天的enolate就是一把追路线的尺子。'}] }
        ]
      },
      'case09-cliff': {
        id:'case09-cliff', day:9, title:'六个月前',
        panels:[
          { background:'analysisLab', evidence:'routeFragment', caption:'项目归档里检索到一份六个月前被否决的路线评审，第一页只露出编号：Route-B。' }
        ]
      },
      'case10-open': {
        id:'case10-open', day:10, title:'CASE 10｜旧路线',
        panels:[
          { background:'analysisLab', evidence:'routeFragment', caption:'Route-B不是随手写下的草稿，而是一条曾经完整评估、随后因风险被否决的备用路线。' },
          { background:'meetingRoom', characters:[{id:'linCen',pose:'concerned'},{id:'xuLinchuan',pose:'defensive'}], dialogue:[{speaker:'linCen',text:'我当时反对的不是它“一步都走不通”，而是它把后面的立体风险留给运气。'}, {speaker:'xuLinchuan',text:'我认为下游还能补救。'}] }
        ]
      },
      'case10-return': {
        id:'case10-return', day:10, title:'同一个enolate，换一个受体',
        panels:[
          { background:'synthesisLab', dialogue:[{speaker:'zhouYan',text:'Aldol、Claisen、Michael不要背成三座孤岛。把它们统一成“谁生成enolate、它攻击谁”，再去检查Route-B的构碳步骤。'}] }
        ]
      },
      'case10-cliff': {
        id:'case10-cliff', day:10, title:'20:58',
        panels:[
          { background:'analysisLab', evidence:'printerLog', caption:'打印机缓存：20:58打印过Route-B资料。当前记录只能确认“有人打印”，还不能确认是谁。' },
          { background:'meetingRoom', characters:[{id:'chengYe',pose:'teasing'}], dialogue:[{speaker:'chengYe',text:'打印机终于第一次在实验室里提供了比“缺纸”更有用的信息。'}] }
        ]
      },
      'case11-open': {
        id:'case11-open', day:11, title:'CASE 11｜芳环上的路线指纹',
        panels:[
          { background:'analysisLab', evidence:'routeFragment', caption:'Route-B的一步芳香取代落点与正式路线不同，像一枚藏在骨架上的路线指纹。' },
          { background:'meetingRoom', characters:[{id:'linCen',pose:'thinking'}], dialogue:[{speaker:'linCen',text:'别背“邻对间”三个字。先问取代基怎样改变芳环电子分布，再看这个位置是不是Route-B才会偏好的出口。'}] }
        ]
      },
      'case11-return': {
        id:'case11-return', day:11, title:'位置也是证据',
        panels:[
          { background:'analysisLab', evidence:'routeFragment', dialogue:[{speaker:'zhouYan',text:'两条路线即使最后官能团名单接近，中间的芳环取代位置仍可能留下可追踪差异。'}] }
        ]
      },
      'case11-cliff': {
        id:'case11-cliff', day:11, title:'B3',
        panels:[
          { background:'coldRoomNight', caption:'冷藏室门禁记录再次指向21:42—21:53。角落里有一个异常样品柜：B3。' },
          { background:'meetingRoom', characters:[{id:'linCen',pose:'concerned'}], dialogue:[{speaker:'linCen',text:'如果你们明天要打开B3，我希望先把“保存证据”和“隐藏样品”分开判断。'}] }
        ]
      },
      'case12-open': {
        id:'case12-open', day:12, title:'CASE 12｜B3',
        panels:[
          { background:'coldRoomNight', evidence:'b3Cabinet', caption:'B3柜门打开。里面不是一件失物，而是三份被分别封存的样品。' },
          { background:'meetingRoom', characters:[{id:'zhouYan',pose:'serious'}], dialogue:[{speaker:'zhouYan',text:'先别碰封条。今天把芳香路线最后几个转接工具补齐，再按记录顺序开箱。'}] }
        ]
      },
      'case12-return': {
        id:'case12-return', day:12, title:'万能接口不是万能背诵',
        panels:[
          { background:'synthesisLab', dialogue:[{speaker:'linCen',text:'重氮盐和腈的价值不在于多两行试剂表，而在于它们能把芳香路线接到原本难直接到达的位置和碳数。'}] }
        ]
      },
      'case12-cliff': {
        id:'case12-cliff', day:12, title:'样品从未被盗', unlockFacts:['lin_preserved_evidence'],
        panels:[
          { background:'coldRoomNight', evidence:'b3Cabinet', caption:'B3内确认：L20-0、L20-F、X-17。三份样品的封存时间与林岑21:42—21:53门禁完全一致。' },
          { background:'meetingRoom', characters:[{id:'linCen',pose:'concerned'}], dialogue:[{speaker:'linCen',text:'我移动了它们。程序上我没有先把位置说清楚，但我不想让异常样品在验收前被继续处理。'}] },
          { background:'meetingRoom', dialogue:[{speaker:'zhouYan',text:'所以“谁偷了零号样品”这个问题到此结束。真正的问题变成：为什么记录后来让这一切看起来像正式路线正常完成？'}] }
        ]
      },
      'case16-open': {
        id:'case16-open', day:16, title:'CASE 16｜完整鉴定',
        panels:[
          { background:'analysisLab', evidence:'chiralHplc', caption:'分子式、IR、NMR、手性HPLC和反应路线现在同时摆在桌上。今天不再新增一章，只把证据放到同一张桌上。' },
          { background:'meetingRoom', characters:[{id:'zhouYan',pose:'neutral'}], dialogue:[{speaker:'zhouYan',text:'每道判断只问：真正主导它的是哪一个因素？共振、诱导、杂化、芳香性、位阻，还是中间体稳定性？'}] }
        ]
      },
      'case16-return': {
        id:'case16-return', day:16, title:'证据各自说到哪里',
        panels:[
          { background:'analysisLab', dialogue:[{speaker:'linCen',text:'普通谱图负责连接关系，手性证据负责空间身份，路线证据负责解释它怎么产生。不要让任何一种证据越权。'}] }
        ]
      },
      'case16-cliff': {
        id:'case16-cliff', day:16, title:'她没有马上走',
        panels:[
          { background:'meetingRoom', characters:[{id:'guYao',pose:'nervous'}], dialogue:[{speaker:'guYao',text:'那天20:30以后……我其实没有马上走。我看到许老师重新翻出了那份旧路线。'}] },
          { background:'meetingRoom', characters:[{id:'zhouYan',pose:'serious'}], dialogue:[{speaker:'zhouYan',text:'证词记下。明天不用它直接定人，先从最终产物倒着重建路线。'}] }
        ]
      },
      'case13-x17-open': {
        id: 'case13-x17-open', day: 13, title: 'CASE 13｜无名样品 I',
        panels: [
          {
            background: 'analysisLab', evidence: 'x17Bottle',
            caption: 'B3里的第三份样品没有正式编号记录，只写着“X-17”。'
          },
          {
            background: 'analysisLab', characters: [{ id: 'linCen', pose: 'thinking' }],
            dialogue: [
              { speaker: 'linCen', text: '今天只做证据允许的判断。分子式、DBE、IR和化学检验能走到哪里，就停在哪里。' }
            ]
          }
        ]
      },
      'case13-x17-cliff': {
        id: 'case13-x17-cliff', day: 13, title: '还不能下结论',
        panels: [
          {
            background: 'analysisLab', evidence: 'x17Bottle',
            dialogue: [
              { speaker: 'linCen', text: '现在只能确认它是溴代芳香羰基体系。Br到底在邻、间还是对位，明天看NMR。' }
            ]
          }
        ]
      },
      'case14-x17-open': {
        id: 'case14-x17-open', day: 14, title: 'CASE 14｜无名样品 II',
        panels: [
          {
            background: 'analysisLab', evidence: 'x17Bottle',
            dialogue: [
              { speaker: 'linCen', text: '昨天已经排除了“凭一条峰猜结构”。今天只问一件事：芳香区有没有对称性。' }
            ]
          }
        ]
      },
      'case14-x17-lock': {
        id: 'case14-x17-lock', day: 14, title: 'X-17 锁定',
        unlockFacts: ['x17_identity_confirmed'],
        panels: [
          {
            background: 'analysisLab', evidence: 'x17Bottle',
            dialogue: [
              { speaker: 'linCen', text: 'X-17：4-bromoacetophenone。连接关系现在可以锁定。' },
              { speaker: 'zhouYan', text: '记住：这仍然只是平面结构证据。明天才处理空间身份。' }
            ]
          }
        ]
      },
      'case15-open': {
        id: 'case15-open', day: 15, title: 'CASE 15｜镜子里的答案',
        panels: [
          {
            background: 'analysisLab', evidence: 'x17Bottle',
            dialogue: [
              { speaker: 'linCen', text: 'X-17 的平面结构已经锁定。今天先别看一堆楔线，先把分子拿起来。' },
              { speaker: 'zhouYan', text: '如果空间关系才是关键，就先用空间证据学习。二维算法放在后面收束。' }
            ]
          },
          {
            background: 'analysisLab', evidence: 'chiralHplc',
            caption: '两份最终样品的普通 IR/NMR 很接近，但手性 HPLC 的结果并不一样。'
          }
        ]
      },
      'case15-proof': {
        id: 'case15-proof', day: 15, title: '同样的骨架，不同的空间身份',
        panels: [
          {
            background: 'analysisLab', evidence: 'chiralHplc',
            dialogue: [
              { speaker: 'linCen', text: 'L20-0 是高 ee 的 S 样品；L20-F 接近 1:1。普通非手性谱图不会替我们回答这个问题。' }
            ]
          },
          {
            background: 'meetingRoom', characters: [{ id: 'chengYe', pose: 'thinking' }],
            dialogue: [
              { speaker: 'chengYe', text: '所以它们像是“身份证号码一样”，前面都对，最后那个空间身份不对？' },
              { speaker: 'zhouYan', text: '更准确地说：连接关系可以相同，但样品的对映体组成不是同一个质量标准。' }
            ]
          }
        ]
      },
      'case15-close': {
        id: 'case15-close', day: 15, title: '备用路线的立体风险',
        unlockFacts: ['final_sample_wrong_identity'],
        panels: [
          {
            background: 'analysisLab', evidence: 'chiralHplc',
            dialogue: [
              { speaker: 'linCen', text: '这正是六个月前我在备用路线评审里写的风险：一旦经过非手性 X-17，再普通还原，原来的单一空间信息不会自动回来。' },
              { speaker: 'zhouYan', text: '到这里我们才能确认：L20-F 不是合格的零号样品替代物。' }
            ]
          },
          {
            background: 'coldRoomNight', caption: 'CASE 15 CLOSE · 平面结构相同，不等于空间身份合格。'
          }
        ]
      },
      'case17-open': {
        id: 'case17-open', day: 17, title: 'CASE 17｜倒着走',
        panels: [
          {
            background: 'meetingRoom', characters: [{ id: 'guYao', pose: 'nervous' }, { id: 'zhouYan', pose: 'serious' }],
            dialogue: [
              { speaker: 'guYao', text: '20:30以后我没有马上离开。我看见许老师把那份旧路线重新拿了出来。' },
              { speaker: 'zhouYan', text: '证词先记下，但今天不靠证词定人。把路线从L20-F倒着走，看看化学自己能不能闭合。' }
            ]
          },
          {
            background: 'synthesisLab', evidence: 'x17Bottle',
            caption: '任务：从 L20-F、X-17 和 R-17异常体系之间，恢复一条碳数、官能团与条件都自洽的路线。'
          }
        ]
      },
      'case17-cliff': {
        id: 'case17-cliff', day: 17, title: '路线恢复，但还不是结案',
        panels: [
          {
            background: 'synthesisLab', evidence: 'x17Bottle',
            dialogue: [
              { speaker: 'linCen', text: 'R-17异常组分 → 可回收苄位醇 → X-17 → L20-F，这条补救尾段在化学上闭合。' },
              { speaker: 'zhouYan', text: '这能证明有人继续做了第二条路线，但还不能单凭路线证明是谁改了记录。' }
            ]
          },
          {
            background: 'analysisLab', caption: '下一步：把21:06和22:19两个版本，与路线、证词和时间窗口一起核对。'
          }
        ]
      },
      'case18-open': {
        id: 'case18-open', day: 18, title: 'CASE 18｜22:14',
        panels: [
          {
            background: 'analysisLab', evidence: 'recordVersions',
            dialogue: [
              { speaker: 'linCen', text: '21:06的版本写着“条件偏差，尝试备用路线，待验证”。22:19的版本，这两行消失了。' },
              { speaker: 'zhouYan', text: '先别跳到“谁删的”。今天先检查：这条备用路线为什么看起来能救回来，又为什么实际上不能当作零号样品。' }
            ]
          },
          {
            background: 'synthesisLab', characters: [{ id: 'xuLinchuan', pose: 'defensive' }],
            dialogue: [
              { speaker: 'xuLinchuan', text: '路线本身能走到一个结构很接近的最终样品。我当时只是想把项目救回来。' }
            ]
          }
        ]
      },
      'case18-evidence': {
        id: 'case18-evidence', day: 18, title: '五条证据开始汇合',
        panels: [
          {
            background: 'meetingRoom', evidence: 'recordVersions',
            caption: '现在同时成立：R-17事故、Route-B化学闭环、X-17实物、顾遥证词、21:06→22:19记录差异。'
          },
          {
            background: 'meetingRoom', characters: [{ id: 'zhouYan', pose: 'serious' }],
            dialogue: [
              { speaker: 'zhouYan', text: '实验失败和记录篡改是两件事。前者可以报告，后者会让后来的人失去判断事实的机会。' }
            ]
          }
        ]
      },
      'case18-close': {
        id: 'case18-close', day: 18, title: '22:14之后',
        unlockFacts: ['xu_deleted_record'],
        panels: [
          {
            background: 'meetingRoom', characters: [{ id: 'xuLinchuan', pose: 'tired' }],
            dialogue: [
              { speaker: 'xuLinchuan', text: '21:06那版是我写的。22:14删掉偏差和备用路线的也是我。' },
              { speaker: 'xuLinchuan', text: '我当时觉得最终结构已经很接近……差不多，也可以算正确。' }
            ]
          },
          {
            background: 'meetingRoom', characters: [{ id: 'zhouYan', pose: 'stern' }],
            dialogue: [
              { speaker: 'zhouYan', text: '路线失败不是最严重的问题。明知记录与事实不一致，还让它看起来正常，才是越过的那条线。' }
            ]
          },
          {
            background: 'coldRoomNight', caption: 'CASE 18 CLOSE · 明天没有提示。'
          }
        ]
      },
      'case19-open': {
        id: 'case19-open', day: 19, title: 'CASE 19｜封闭卷宗',
        panels: [
          {
            background: 'meetingRoom', characters: [{ id: 'zhouYan', pose: 'neutral' }],
            dialogue: [
              { speaker: 'zhouYan', text: '今天不再给你案件提示。题目只看你能不能独立把前18天的能力调出来。' },
              { speaker: 'zhouYan', text: '如果你真的学会了，今天不需要我们站在旁边。' }
            ]
          }
        ]
      },
      'case20-open': {
        id: 'case20-open', day: 20, title: 'CASE 20｜零号样品',
        panels: [
          {
            background: 'meetingRoom', characters: [{ id:'zhouYan', pose:'serious' }],
            dialogue: [
              { speaker:'zhouYan', text:'最后一件事不是再学一个反应。把每个人做过的事分类：事故、程序违规、记录篡改。' },
              { speaker:'zhouYan', text:'结论必须和证据强度一致。不能因为结果严重，就把所有错误都叫成同一种错误。' }
            ]
          }
        ]
      },
      'case20-truth': {
        id: 'case20-truth', day: 20, title: '事实各归其位',
        panels: [
          {
            background: 'meetingRoom', characters: [{ id:'guYao', pose:'tired' }, { id:'linCen', pose:'concerned' }, { id:'xuLinchuan', pose:'tired' }],
            caption: '顾遥造成第一起事故并隐瞒部分过程；林岑越过程序保存证据；许临川继续补救路线，并在22:14删除真实偏差记录。'
          },
          {
            background: 'meetingRoom', characters: [{ id:'zhouYan', pose:'stern' }],
            dialogue: [
              { speaker:'zhouYan', text:'我也要承担管理责任。项目压力让“失败必须立刻被修好”变成了默认气氛，这给了错误选择生长的空间。' }
            ]
          }
        ]
      },
      'case20-close': {
        id: 'case20-close', day: 20, title: 'CASE CLOSED',
        panels: [
          {
            background: 'coldRoomNight', caption: '第二天，B3柜门多了一张新纸条：不是失物招领处。'
          },
          {
            background: 'cafeteria', characters: [{ id:'chengYe', pose:'teasing' }],
            dialogue: [
              { speaker:'chengYe', text:'最近不想看到六边形？正常，说明学到了。晚上火锅还是烧烤？' }
            ]
          },
          {
            background: 'analysisLab', evidence: 'zeroSampleStructure',
            caption: '你再次看向第一天完全读不懂的那张结构式。它没有说过一句话，却是整个案件里唯一从来没有撒谎的证人。'
          }
        ]
      }
    },

    evidence: {
      doorLog2142: { id: 'door_log_2142', type: 'door-log', supports: ['linPreservedEvidence'] },
      r17Inventory: { id: 'r17_inventory', type: 'inventory', supports: ['guYaoR17Mixup'] },
      record2106: { id: 'record_2106', type: 'document', supports: ['backupRouteUsed'] },
      record2219: { id: 'record_2219', type: 'document', supports: ['xuDeletedRecord'] },
      x17Sample: { id: 'x17_sample', type: 'sample', supports: ['backupRouteUsed'] },
      chiralHplc: { id: 'chiral_hplc', type: 'chiral-analysis', supports: ['finalSampleWrongIdentity'] }
    },

    chemistryCase: {
      l20Zero: {
        id: 'L20-0',
        name: '(S)-1-(4-bromophenyl)ethanol',
        formula: 'C8H9BrO',
        isomericSmiles: 'C[C@H](O)c1ccc(Br)cc1',
        stereochemistry: 'S',
        evidenceRole: '高对映体纯度标准样品；普通IR/NMR确认连接关系，手性HPLC/旋光确认空间身份。'
      },
      l20Final: {
        id: 'L20-F',
        name: '1-(4-bromophenyl)ethanol near-racemic sample',
        formula: 'C8H9BrO',
        connectivityMatchesL20Zero: true,
        enantiomerRatio: 'S:R = 51:49',
        evidenceRole: '普通achiral IR/NMR可高度相似，但手性证据显示不是合格的单一目标构型。'
      },
      x17: {
        id: 'X-17',
        name: '4-bromoacetophenone',
        formula: 'C8H7BrO',
        smiles: 'CC(=O)c1ccc(Br)cc1',
        chiral: false,
        evidenceRole: 'Route-B中擦除原手性信息的非手性酮中间体。'
      },
      officialTail: {
        precursor: '(R)-1-bromo-1-(4-bromophenyl)ethane',
        stepA: 'KOAc / anhydrous DMSO；教学模型按SN2主导，发生构型反转。',
        stepB: 'K2CO3 / MeOH；脱乙酰，不破坏苄位手性中心，得到(S)-L20-0。'
      },
      r17Systems: {
        R17B: 'KOAc / anhydrous DMSO；已验证的受控取代体系。',
        R17A: '含水乙醇型乙酸盐体系；增加离子化/溶剂解与竞争副反应风险。'
      },
      hiddenRescueTail: [
        '从错误反应所得含氧组分中分离可回收苄位醇部分。',
        'PCC / CH2Cl2 氧化为非手性X-17（4-bromoacetophenone）。',
        'NaBH4 / MeOH 非手性还原。',
        '得到普通IR/NMR连接关系正确、但S:R = 51:49的L20-F。'
      ],
      hardRules: [
        '对映体不得描述为普通achiral IR/NMR可直接区分。',
        '立体差异最终确认使用手性HPLC/旋光/3D reasoning。',
        'X-17是非手性酮；普通非手性NaBH4还原不会自动恢复单一S构型。',
        '故事中的SN1/SN2、氧化还原、羰基与手性证据必须与课程讲解一致。'
      ]
    }
  };
})();
