(() => {
  'use strict';
  const Data = window.Organic637Data = window.Organic637Data || {};

  Data.THREED_LESSONS = {
    sn2_backside: {
      id: 'sn2_backside',
      day: 4,
      title: '把 SN2 拿起来看：为什么一定从背面进攻',
      eyebrow: 'REQUIRED 3D · Day 4',
      skillId: 'substitution.stereochemistry',
      summary: '旋转四面体碳，先故意从离去基同侧尝试，再从 C–X 的反方向靠近，观察几何翻转。',
      requiredActions: ['rotate', 'frontsideAttempt', 'backsideAttempt', 'bridge2D'],
      model: {
        atoms: [
          { id:'Nu', label:'Nu⁻', element:'N', position:[-3.0,0,0] },
          { id:'C', label:'C*', element:'C', position:[0,0,0] },
          { id:'X', label:'Br', element:'Br', position:[2.15,0,0] },
          { id:'A', label:'CH₃', element:'C', position:[-0.25,1.25,1.05] },
          { id:'B', label:'H', element:'H', position:[-0.25,-1.2,1.0] },
          { id:'D', label:'R', element:'C', position:[-0.25,0,-1.45] }
        ],
        bonds: [['C','X'],['C','A'],['C','B'],['C','D']],
        guideAxis: ['Nu','C','X']
      },
      controls: [
        { id:'frontsideAttempt', label:'先从 Br 同侧试一次', note:'同侧既拥挤，也不是把电子送入 σ*(C–Br) 的最佳方向。' },
        { id:'backsideAttempt', label:'改从 C–Br 的正反方向进攻', note:'Nu、C、Br 近似共线时，背面重叠最合适，并产生构型反转。' }
      ],
      bridge2D: {
        prompt: '回到二维题：SN2 最关键的立体结果是什么？',
        options: [
          { id:'retain', label:'反应中心保持原来空间朝向' },
          { id:'invert', label:'反应中心发生构型反转（Walden inversion）' },
          { id:'planar', label:'先形成平面碳正离子再随机进攻' }
        ],
        answer: 'invert',
        feedback: 'SN2 是协同的一步过程；背面进攻让反应中心的四面体朝向翻转。'
      },
      fallback: {
        title: '2D 备用练习：用楔线/虚线读背面进攻',
        body: '把 C–Br 想成朝右伸出的轴，亲核体必须从左侧、也就是 C–Br 的反方向进入。二维图上最终要看到反应中心的前后关系翻转。'
      }
    },

    e2_anti: {
      id: 'e2_anti',
      day: 5,
      title: '把 E2 拿起来看：β-H 和离去基为什么要 anti',
      eyebrow: 'REQUIRED 3D · Day 5',
      skillId: 'elimination.antiperiplanar',
      summary: '沿 Cα–Cβ 单键旋转，把 β-H 与 Br 调到约 180°，再把三支协同电子箭头对应到这个空间排列。',
      requiredActions: ['rotate', 'identifyBetaH', 'setAnti', 'bridge2D'],
      model: {
        atoms: [
          { id:'Ca', label:'Cα', element:'C', position:[0.9,0,0] },
          { id:'Cb', label:'Cβ', element:'C', position:[-0.9,0,0] },
          { id:'Br', label:'Br', element:'Br', position:[2.0,0.95,0.2] },
          { id:'Hb', label:'Hβ', element:'H', position:[-2.0,-0.95,-0.2] },
          { id:'Ra', label:'R', element:'C', position:[1.65,-0.9,0.75] },
          { id:'Rb', label:'R′', element:'C', position:[-1.65,0.9,-0.75] }
        ],
        bonds: [['Ca','Cb'],['Ca','Br'],['Cb','Hb'],['Ca','Ra'],['Cb','Rb']],
        guideAxis: ['Hb','Cb','Ca','Br']
      },
      betaHydrogenId: 'Hb',
      dihedral: { min:0, max:360, target:180, tolerance:12 },
      bridge2D: {
        prompt: '看到 E2 构象题，真正必须先满足的几何条件是？',
        options: [
          { id:'syn', label:'β-H 与离去基在同侧、二面角约 0°' },
          { id:'anti', label:'β-H 与离去基反式共平面、二面角约 180°' },
          { id:'any', label:'只要有 β-H，任何朝向都完全等价' }
        ],
        answer: 'anti',
        feedback: 'E2 需要 β-C–H 与 C–X 轨道以 anti-periplanar 几何协同重叠。'
      },
      fallback: {
        title: '2D 备用练习：先在 Newman/锯架图找 180°',
        body: '沿 Cα–Cβ 轴看过去，先找到离去基，再找与它相隔 180° 的 β-H；只有这组几何才进入标准 E2 协同消除。'
      }
    },

    tetrahedral_core: {
      id: 'tetrahedral_core',
      day: 15,
      title: '先把四面体碳拿起来：楔线和虚线到底在画什么',
      eyebrow: 'REQUIRED 3D · Day 15',
      skillId: 'stereo.rs',
      summary: '先旋转一个连着 H、OH、CH3 和芳基的四面体碳。二维楔线/虚线只是把“朝你、离你、纸面内”压到一张纸上。',
      requiredActions: ['rotate','identifyFrontBack','bridge2D'],
      model: {
        atoms: [
          { id:'Cstar', label:'C*', element:'C', position:[0,0,0] },
          { id:'OH', label:'OH', element:'O', position:[1.45,1.15,1.05] },
          { id:'H', label:'H', element:'H', position:[-1.25,-1.15,1.15] },
          { id:'Me', label:'CH3', element:'C', position:[1.15,-1.2,-1.05] },
          { id:'Ar', label:'p-Br-Ph', element:'C', position:[-1.35,1.15,-1.0] }
        ],
        bonds: [['Cstar','OH'],['Cstar','H'],['Cstar','Me'],['Cstar','Ar']]
      },
      controls: [
        { id:'identifyFrontBack', label:'指出“朝向我”和“背向我”的两根键', note:'楔线/虚线的意义是空间朝向，不是额外的键型。' }
      ],
      bridge2D: {
        prompt: '实楔线通常表示什么？',
        options: [
          { id:'front', label:'键从纸面朝向观察者伸出' },
          { id:'back', label:'键伸到纸面后方' },
          { id:'double', label:'这是一根双键' }
        ],
        answer: 'front',
        feedback: '实楔表示朝向观察者，虚楔表示伸向纸面后方；普通直线通常画在纸面附近。'
      },
      fallback: {
        title: '2D 备用：三种键方向先分清',
        body: '实楔=朝你；虚楔=离你；普通线≈纸面内。先用固定视角把三类方向对应起来，再判断手性中心。'
      }
    },

    mirror_overlap: {
      id: 'mirror_overlap',
      day: 15,
      title: '镜像不是“看起来左右反了”：关键是旋转以后能不能完全重合',
      eyebrow: 'REQUIRED 3D · Day 15',
      skillId: 'stereo.relationship',
      summary: '把一个四面体手性中心想成左右手。允许任意旋转，但不允许断键重接；如果镜像仍不能完全重合，就是对映关系。',
      requiredActions: ['rotate','compareMirror','bridge2D'],
      model: {
        atoms: [
          { id:'Cstar', label:'C*', element:'C', position:[0,0,0] },
          { id:'Br', label:'Br', element:'Br', position:[1.5,1.0,1.05] },
          { id:'OH', label:'OH', element:'O', position:[-1.25,-1.15,1.1] },
          { id:'Me', label:'CH3', element:'C', position:[1.15,-1.2,-1.05] },
          { id:'H', label:'H', element:'H', position:[-1.35,1.2,-1.0] }
        ],
        bonds: [['Cstar','Br'],['Cstar','OH'],['Cstar','Me'],['Cstar','H']]
      },
      controls: [
        { id:'compareMirror', label:'尝试把镜像“只靠旋转”重合', note:'不能断键换位。真正的问题是三维叠合，不是二维图像像不像。' }
      ],
      bridge2D: {
        prompt: '两个结构连接关系相同、互为镜像，而且任意旋转后仍不能完全重合，它们是什么关系？',
        options: [{id:'enantiomer',label:'对映体'},{id:'same',label:'同一个分子'},{id:'constitutional',label:'构造异构体'}],
        answer: 'enantiomer',
        feedback: '镜像不可重合是对映关系的核心判据。'
      },
      fallback: {
        title: '2D 备用：固定最低优先级以后比较镜像',
        body: '在两个固定视角图中保持连接关系不变，只允许整体旋转；如果无法把四个取代基同时对齐，就不能当作同一个空间构型。'
      }
    },

    cip_rs_core: {
      id: 'cip_rs_core',
      day: 15,
      title: 'CIP 与 R/S：先排队，再选观察方向',
      eyebrow: 'REQUIRED 3D · Day 15',
      skillId: 'stereo.rs',
      summary: '先按 CIP 给四个取代基排 1–4，再把 4 号转到背后，最后判断 1→2→3 的方向。',
      requiredActions: ['rotate','identifyPriority','lowestAway','assignR','bridge2D'],
      model: {
        atoms: [
          { id:'Cstar', label:'C*', element:'C', position:[0,0,0] },
          { id:'Br', label:'1 Br', element:'Br', position:[1.5,1.0,1.0] },
          { id:'OH', label:'2 OH', element:'O', position:[-1.25,-1.1,1.1] },
          { id:'Me', label:'3 CH3', element:'C', position:[1.15,-1.2,-1.0] },
          { id:'H', label:'4 H', element:'H', position:[-1.35,1.2,-1.0] }
        ],
        bonds: [['Cstar','Br'],['Cstar','OH'],['Cstar','Me'],['Cstar','H']]
      },
      controls: [
        { id:'identifyPriority', label:'确认优先级 1→4', note:'本例 Br > O > C > H。' },
        { id:'lowestAway', label:'把 4 号 H 转到背后', note:'最低优先级没有放到背后时，顺/逆时针判断要反转。' },
        { id:'assignR', label:'完成一次 R/S 判断', note:'先方向、后标签；不要把“楔线朝前”直接等同于R或S。' }
      ],
      bridge2D: {
        prompt: '判断 R/S 时最稳的顺序是哪一个？',
        options: [
          { id:'cip', label:'先排CIP 1–4 → 让4背向 → 看1→2→3' },
          { id:'clock', label:'看到图就直接看顺时针' },
          { id:'name', label:'先看分子名字猜R/S' }
        ],
        answer: 'cip',
        feedback: 'R/S 是“优先级 + 正确观察方向”的结果，不是单纯看纸面顺逆时针。'
      },
      fallback: {
        title: '2D 备用：先把4号放到虚楔',
        body: '用固定楔线图确保最低优先级朝后，再判断1→2→3；如果4朝前，最后结果反转。'
      }
    },

    l20_stereo_compare: {
      id: 'l20_stereo_compare',
      kind: 'stereo-compare',
      day: 15,
      title: 'L20-0 vs L20-F：连接关系相似，不代表空间身份相同',
      eyebrow: 'CASE PROOF · REQUIRED 3D',
      skillId: 'stereo.relationship',
      summary: '普通非手性 IR/NMR 先证明两份样品具有相同连接骨架；现在用手性HPLC/旋光证据与三维比较判断“是不是同一个合格空间样品”。',
      evidenceNote: '普通 achiral IR/NMR 不能直接区分一对对映体。案件中的空间身份差异由手性HPLC/旋光证据与3D构型判断共同确认。',
      requiredActions: ['rotateSynchronized','rotateIndependent','toggleLabels','identifyKeyCenter','compareAttempt','bridge2D'],
      samples: {
        left: {
          id:'L20-0', label:'L20-0 标准样品', formula:'C8H9BrO', stereochemistry:'S', enantiomerRatio:'S > 99%',
          substituents:[
            {id:'OH',label:'OH',position:[1.45,1.05,1.1]},
            {id:'Ar',label:'p-Br-Ph',position:[-1.3,1.2,-1.0]},
            {id:'Me',label:'CH3',position:[1.15,-1.25,-1.0]},
            {id:'H',label:'H',position:[-1.3,-1.1,1.1]}
          ]
        },
        right: {
          id:'L20-F', label:'L20-F 最终样品', formula:'C8H9BrO', enantiomerRatio:'S:R = 51:49', representativeView:'R-enantiomer component',
          substituents:[
            {id:'OH',label:'OH',position:[-1.45,1.05,1.1]},
            {id:'Ar',label:'p-Br-Ph',position:[1.3,1.2,-1.0]},
            {id:'Me',label:'CH3',position:[-1.15,-1.25,-1.0]},
            {id:'H',label:'H',position:[1.3,-1.1,1.1]}
          ]
        }
      },
      bridge2D: {
        prompt: '两份样品普通 IR/NMR 很相似，但手性HPLC显示 L20-0 高ee、L20-F 近 1:1。最正确的结论是？',
        options: [
          {id:'different',label:'连接关系可相同，但对映体组成不同，不能视为同一合格样品'},
          {id:'same',label:'普通NMR相似，所以一定完全相同'},
          {id:'nmr',label:'普通非手性NMR可以直接给出S:R比例'}
        ],
        answer:'different',
        feedback:'普通非手性谱图主要支持连接关系；对映体组成要靠手性分析/旋光等证据。'
      },
      fallback: {
        title:'2D 备用：固定视角比较 S 与镜像构型',
        body:'依次比较 OH、芳基、CH3、H 的前后关系，再结合手性HPLC的S:R比例。只要能说明“连接关系相同但对映体组成不同”，即可通过备用路径。'
      }
    },

    newman_rotation: {
      id: 'newman_rotation',
      day: 15,
      title: '拿起来看看：Newman 单键旋转',
      eyebrow: 'ON-DEMAND 3D',
      skillId: 'stereo.newman',
      summary: '沿 C–C 键轴观察前后碳，比较 staggered / eclipsed 与 anti / gauche。',
      requiredActions: ['rotate'],
      model: {
        atoms: [
          { id:'Cf', label:'前C', element:'C', position:[0,0,0.75] },
          { id:'Cb', label:'后C', element:'C', position:[0,0,-0.75] },
          { id:'A', label:'CH₃', element:'C', position:[0,1.35,1.25] },
          { id:'B', label:'H', element:'H', position:[1.15,-0.75,1.25] },
          { id:'C', label:'H', element:'H', position:[-1.15,-0.75,1.25] },
          { id:'D', label:'CH₃', element:'C', position:[0,-1.35,-1.25] },
          { id:'E', label:'H', element:'H', position:[1.15,0.75,-1.25] },
          { id:'F', label:'H', element:'H', position:[-1.15,0.75,-1.25] }
        ],
        bonds: [['Cf','Cb'],['Cf','A'],['Cf','B'],['Cf','C'],['Cb','D'],['Cb','E'],['Cb','F']]
      },
      bridge2D: {
        prompt: '一般情况下，两个最大基团在交叉式中相隔 180° 的构象叫什么？',
        options: [{id:'anti',label:'anti'},{id:'gauche',label:'gauche'},{id:'eclipsed',label:'eclipsed'}],
        answer: 'anti',
        feedback: 'anti 让两个大基团相距最远，通常更稳定。'
      },
      fallback: {
        title: '2D Newman 备用图',
        body: '前碳用点、后碳用圆；先分清六根键属于哪个碳，再比较二面角。'
      }
    }
  };
})();
