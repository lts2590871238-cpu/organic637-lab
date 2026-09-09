(function () {
  'use strict';

  window.Organic637Data = window.Organic637Data || {};

  const atom = (id, element, position, label, extra = {}) => ({ id, element, position, label, ...extra });
  const bond = (from, to, extra = {}) => ({ from, to, order: 1, ...extra });
  const examBridge = '南京工业大学 637 可能把这个空间关系压成楔线、Newman、锯架或二维构象图。最终要会在没有 3D 时识别。';

  const presets = {
    tetrahedral: {
      id: 'tetrahedral',
      camera: [4.8, 3.4, 6.8],
      atoms: [
        atom('c', 'C', [0, 0, 0], 'C'),
        atom('a', 'C', [-1.2, 0.55, 0.25], 'A'),
        atom('b', 'N', [1.2, 0.55, 0.25], 'B'),
        atom('front', 'O', [0, -0.9, 1.25], '朝前 X', { highlight: true }),
        atom('back', 'H', [0.2, 0.95, -1.18], '背后 D')
      ],
      bonds: [bond('c', 'a'), bond('c', 'b'), bond('c', 'front'), bond('c', 'back')]
    },
    sn2: {
      id: 'sn2',
      camera: [5.2, 3.7, 7.4],
      atoms: [
        atom('c', 'C', [0, 0, 0], '反应中心 C', { highlight: true }),
        atom('x', 'Br', [0, 0, 1.85], '离去基 X'),
        atom('nu', 'N', [0, 0, -3.35], 'Nu:⁻'),
        atom('r1', 'C', [1.25, 0, -0.1], 'R¹'),
        atom('r2', 'C', [-0.64, 1.08, -0.1], 'R²'),
        atom('h', 'H', [-0.64, -1.08, -0.1], 'H')
      ],
      bonds: [
        bond('c', 'x'), bond('c', 'r1'), bond('c', 'r2'), bond('c', 'h'),
        bond('nu', 'c', { style: 'forming', opacity: 0.25 })
      ],
      vectors: [{ from: [0, 0, -2.8], to: [0, 0, -0.65], color: '#d46f8f', showAt: 1 }],
      orbital: { center: [0, 0, -0.55], scale: [0.7, 0.7, 2.8], color: '#7da9d8' }
    },
    e2: {
      id: 'e2',
      camera: [5.6, 4.2, 7.2],
      initialDihedral: 60,
      atoms: [
        atom('cb', 'C', [-0.78, 0, 0], 'Cβ'),
        atom('ca', 'C', [0.78, 0, 0], 'Cα'),
        atom('hb', 'H', [-1.32, 0, -1.18], 'β-H', { highlight: true }),
        atom('br', 'Br', [1.32, 0, 1.18], 'X', { highlight: true }),
        atom('r1', 'C', [-1.22, 1.05, 0.58], 'R'),
        atom('r2', 'H', [-1.22, -1.05, 0.58], 'H'),
        atom('r3', 'C', [1.22, 1.05, -0.58], 'R′'),
        atom('r4', 'H', [1.22, -1.05, -0.58], 'H'),
        atom('base', 'O', [-2.9, 0.6, -1.9], 'Base:⁻')
      ],
      bonds: [
        bond('cb', 'ca'), bond('cb', 'hb'), bond('cb', 'r1'), bond('cb', 'r2'),
        bond('ca', 'br'), bond('ca', 'r3'), bond('ca', 'r4')
      ],
      vectors: [
        { from: [-2.55, 0.48, -1.72], toAtom: 'hb', color: '#d46f8f', showAt: 2 },
        { fromAtom: 'hb', to: [0, 0, 0], color: '#7da9d8', showAt: 2 },
        { from: [1.02, 0, 0.58], toAtom: 'br', color: '#76ad9a', showAt: 2 }
      ]
    },
    cip_rs: {
      id: 'cip_rs',
      camera: [0, 0, 7],
      atoms: [
        atom('c', 'C', [0, 0, 0], 'C*'),
        atom('p1', 'Br', [0, 1.35, 0.25], '1 · Br', { highlight: true }),
        atom('p2', 'O', [1.17, -0.68, 0.25], '2 · OH'),
        atom('p3', 'C', [-1.17, -0.68, 0.25], '3 · CH₃'),
        atom('p4', 'H', [0, 0, -1.48], '4 · H（背后）')
      ],
      bonds: [bond('c', 'p1'), bond('c', 'p2'), bond('c', 'p3'), bond('c', 'p4')]
    },
    newman: {
      id: 'newman',
      camera: [5.4, 3.6, 7.2],
      atoms: [
        atom('cf', 'C', [0, 0, 0.58], '前碳'), atom('cr', 'C', [0, 0, -0.58], '后碳'),
        atom('f1', 'C', [0, 1.42, 0.92], 'CH₃'), atom('f2', 'H', [-1.22, -0.72, 0.92], 'H'), atom('f3', 'H', [1.22, -0.72, 0.92], 'H'),
        atom('r1', 'C', [1.22, 0.72, -0.92], 'CH₃'), atom('r2', 'H', [-1.22, 0.72, -0.92], 'H'), atom('r3', 'H', [0, -1.42, -0.92], 'H')
      ],
      bonds: [
        bond('cf', 'cr'), bond('cf', 'f1'), bond('cf', 'f2'), bond('cf', 'f3'),
        bond('cr', 'r1'), bond('cr', 'r2'), bond('cr', 'r3')
      ],
      rearIds: ['r1', 'r2', 'r3']
    },
    chair: {
      id: 'chair',
      camera: [5.8, 4.8, 7.3],
      chairPositions: {
        c1: [-1.6, 0, 0], c2: [-0.82, 0.94, 0.48], c3: [0.82, 0.94, -0.48],
        c4: [1.6, 0, 0], c5: [0.82, -0.94, 0.48], c6: [-0.82, -0.94, -0.48]
      },
      flatPositions: {
        c1: [-1.6, 0, 0], c2: [-0.82, 1.18, 0], c3: [0.82, 1.18, 0],
        c4: [1.6, 0, 0], c5: [0.82, -1.18, 0], c6: [-0.82, -1.18, 0]
      },
      atoms: [
        atom('c1', 'C', [-1.6, 0, 0], 'C1'), atom('c2', 'C', [-0.82, 0.94, 0.48], 'C2'), atom('c3', 'C', [0.82, 0.94, -0.48], 'C3'),
        atom('c4', 'C', [1.6, 0, 0], 'C4'), atom('c5', 'C', [0.82, -0.94, 0.48], 'C5'), atom('c6', 'C', [-0.82, -0.94, -0.48], 'C6'),
        atom('methyl', 'C', [-1.6, 0, 1.48], 'CH₃ · axial', { highlight: true }),
        atom('h3ax', 'H', [0.82, 0.94, 1.02], '1,3-axial H'), atom('h5ax', 'H', [0.82, -0.94, 1.02], '1,3-axial H')
      ],
      bonds: [
        bond('c1', 'c2'), bond('c2', 'c3'), bond('c3', 'c4'), bond('c4', 'c5'), bond('c5', 'c6'), bond('c6', 'c1'),
        bond('c1', 'methyl'), bond('c3', 'h3ax'), bond('c5', 'h5ax')
      ]
    },
    diels_alder: {
      id: 'diels_alder',
      camera: [5.8, 4.1, 7.5],
      atoms: [
        atom('d1', 'C', [-2.8, 0.95, 0], 'C1'), atom('d2', 'C', [-1.75, 0.35, 0], 'C2'), atom('d3', 'C', [-1.75, -0.85, 0], 'C3'), atom('d4', 'C', [-2.8, -1.35, 0], 'C4'),
        atom('e1', 'C', [2.25, 0.45, 0.75], 'C5'), atom('e2', 'C', [2.25, -0.75, 0.75], 'C6'),
        atom('cargo', 'O', [2.95, -0.15, -0.75], '取代基（桥下）', { highlight: true })
      ],
      bonds: [
        bond('d1', 'd2', { order: 2 }), bond('d2', 'd3'), bond('d3', 'd4', { order: 2 }),
        bond('e1', 'e2', { order: 2 }), bond('e2', 'cargo'),
        bond('d1', 'e1', { style: 'forming', opacity: 0.22 }), bond('d4', 'e2', { style: 'forming', opacity: 0.22 })
      ]
    }
  };

  const fallback = {
    tetrahedral: '<svg viewBox="0 0 520 220" role="img" aria-label="四面体碳与楔线虚线二维分解"><line x1="260" y1="110" x2="120" y2="55"/><line x1="260" y1="110" x2="400" y2="55"/><polygon points="252,112 268,108 350,190"/><line class="dash" x1="260" y1="110" x2="170" y2="190"/><text x="245" y="105">C</text><text x="82" y="53">A</text><text x="410" y="53">B</text><text x="356" y="202">朝前 X</text><text x="92" y="205">背后 D</text></svg>',
    sn2: '<svg viewBox="0 0 520 220" role="img" aria-label="SN2背面进攻二维分镜"><text x="24" y="116">Nu:⁻</text><path class="arrow" d="M105 104 C155 64 190 64 228 102"/><text x="244" y="114">C</text><line x1="270" y1="105" x2="385" y2="105"/><text x="402" y="114">X</text><text x="122" y="165">从 X 的相反侧接近</text></svg>',
    e2: '<svg viewBox="0 0 520 220" role="img" aria-label="E2反式共平面二维示意"><text x="34" y="105">Hβ</text><line x1="75" y1="98" x2="205" y2="98"/><text x="214" y="105">Cβ</text><line x1="255" y1="98" x2="350" y2="98"/><text x="360" y="105">Cα</text><line x1="402" y1="98" x2="475" y2="98"/><text x="484" y="105">X</text><text x="140" y="174">Hβ—Cβ—Cα—X 反向排开，二面角约 180°</text></svg>',
    cip_rs: '<svg viewBox="0 0 520 240" role="img" aria-label="最低优先级背向时判断R和S"><text x="245" y="124">C*</text><line x1="260" y1="105" x2="260" y2="35"/><line x1="250" y1="120" x2="155" y2="185"/><line x1="270" y1="120" x2="365" y2="185"/><line class="dash" x1="260" y1="120" x2="260" y2="220"/><text x="250" y="25">1</text><text x="125" y="205">3</text><text x="380" y="205">2</text><text x="270" y="225">4 背后</text><path class="arrow" d="M280 58 C370 83 360 145 315 166"/><text x="368" y="86">顺时针 → R</text></svg>',
    newman: '<svg viewBox="0 0 520 240" role="img" aria-label="沿碳碳键观察得到Newman投影"><circle cx="260" cy="120" r="56"/><circle class="fill" cx="260" cy="120" r="8"/><line x1="260" y1="112" x2="260" y2="32"/><line x1="253" y1="125" x2="182" y2="170"/><line x1="267" y1="125" x2="338" y2="170"/><line x1="260" y1="176" x2="260" y2="224"/><line x1="212" y1="92" x2="170" y2="66"/><line x1="308" y1="92" x2="350" y2="66"/><text x="176" y="25">前碳是点 ●，后碳是圆 ○；这不是新分子，只是观察方向变了。</text></svg>',
    chair: '<svg viewBox="0 0 520 240" role="img" aria-label="环己烷椅式轴向与赤道向"><polyline points="80,145 165,82 260,110 350,75 440,135 350,180 260,150 165,185 80,145"/><line x1="165" y1="82" x2="165" y2="24"/><text x="112" y="20">axial 近似竖直</text><line x1="165" y1="82" x2="92" y2="45"/><text x="18" y="45">equatorial 向外</text><text x="150" y="225">ring flip：axial ↔ equatorial，但 up/down 不变</text></svg>',
    diels_alder: '<svg viewBox="0 0 520 240" role="img" aria-label="Diels-Alder产物endo和exo方向"><path d="M80 160 L145 70 L245 92 L300 170 L190 205 Z"/><line x1="145" y1="70" x2="190" y2="18"/><text x="145" y="16">exo：朝桥外</text><line class="dash" x1="190" y1="205" x2="230" y2="128"/><text x="240" y="130">endo：朝桥下 / 新π系统方向</text></svg>'
  };

  const lessons = {
    tetrahedral_intro: {
      id: 'tetrahedral_intro', preset: 'tetrahedral', skillId: 'stereo.wedge_dash', mobileSafe: true,
      title: '纸上四根线，真的都在同一个平面吗？',
      lifeIntuition: '想象四根牙签从一个橡皮泥球向空间四个方向伸出去。',
      gap2D: '普通平面线只交代连接；它没有告诉你哪根键朝你、哪根钻到纸背后。',
      insight: '楔线不是新键，它只是在告诉你普通纸面画不出的前后方向。',
      steps: ['先转一转：sp³ 碳附近更像四面体，不是平面十字。', '锁定纸面：普通线大致在纸面，实楔朝你，虚线楔背你。', '换到右侧观察：分子没换，谁在前面却会随观察方向改变。', '把空间重新压回纸面，完成下面两道无 3D 判断。'],
      controls: [{ action: 'right-view', label: '从右边看' }],
      practices: [
        { id: 'tetra-front', prompt: '固定当前纸面表示，哪个基团朝向观察者？', options: ['实楔连接的 X', '虚线楔连接的 D', '所有基团都在纸面'], answer: 0, feedback: '实楔由窄到宽，表示键朝观察者伸出。' },
        { id: 'tetra-to-2d', prompt: '一个基团在 3D 中指向纸背后，二维应优先用什么表示？', options: ['普通双键', '虚线楔', '实楔'], answer: 1, feedback: '虚线楔把“向纸背后”压缩成二维符号。' }
      ],
      examBridge, fallbackSvg: fallback.tetrahedral
    },
    sn2_backside: {
      id: 'sn2_backside', preset: 'sn2', skillId: 'substitution.stereochemistry', mobileSafe: true,
      title: 'SN2 为什么从背面来？',
      lifeIntuition: '先把反应中心想成一把正在被换人的伞：新人从旧人正对面推入，伞面经过近似平面后翻过去。',
      gap2D: '二维箭头能画“Nu → C”，却很容易藏掉 Nu、C、X 必须近似排成一线的方向。',
      insight: '背面进攻不是老师规定的路线，而是电子要找到能有效重叠的位置。',
      steps: ['Nu:⁻ 还在远处，先找离去基 X 的正对面。', 'Nu 从背面接近；电子对朝 C–X 的反键方向有效重叠。', '成键与断键同时进行，中心附近短暂接近平面。', 'Nu–C 形成、C–X 拉断，原来的四面体像伞一样翻面。', '回到楔线：几何反转已经发生，但 R/S 字母仍要按产物 CIP 重算。'],
      controls: [{ action: 'wrong-attack', label: '试试从 X 同侧进攻' }],
      practices: [
        { id: 'sn2-side', prompt: 'Nu 应从哪里接近反应中心？', options: ['与 X 同侧', 'X 的相反侧', '任何方向完全一样'], answer: 1, feedback: '背面方向既减小正面拥挤，也让电子对更好对准 C–X σ*。' },
        { id: 'sn2-product', prompt: '若起始 Br 用实楔朝前，固定其余基团画法，纯 SN2 后新基团应怎样画？', options: ['仍画实楔', '改画虚线楔', '改成双键'], answer: 1, feedback: '几何翻面后，新基团落到原离去基相反的空间方向。' },
        { id: 'sn2-rs', prompt: '“SN2 发生反转”是否等于“R 一定变 S”？', options: ['一定等于', '不一定；产物要重新做 CIP', '只有一级底物等于'], answer: 1, feedback: 'SN2 inversion 讲几何；R/S 讲命名。两个问题必须分别算。' }
      ],
      examBridge, fallbackSvg: fallback.sn2
    },
    e2_anti: {
      id: 'e2_anti', preset: 'e2', skillId: 'elimination.antiperiplanar', mobileSafe: true,
      title: '转到哪一个方向，E2 的三处电子变化才接得上？',
      lifeIntuition: '像三个人接力：碱拿 H、C–H 电子去成 π 键、C–X 电子给 X，三步必须同一拍对齐。',
      gap2D: '一张平面结构式常常没有交代 C–C 单键当前扭到了多少。',
      insight: 'anti 不是一条要背的规则，而是三处电子变化要同时排成能接力的方向。',
      steps: ['先沿中间 Cβ–Cα 单键看，两组键之间扭开了多少。', '转动后碳，让 β-H 与 X 逐渐来到同一平面并反向。', '接近 180° 时三支电子箭头同时亮起：现在对上了。', '再回二维锯架图，只凭纸面判断哪一幅能直接走经典 E2。'],
      controls: [{ action: 'dihedral-minus', label: '反向转 60°' }, { action: 'dihedral-plus', label: '正向转 60°' }, { action: 'try-e2', label: '让 E2 发生' }],
      practices: [
        { id: 'e2-angle', prompt: 'β-C–H 与 C–X 经典最有利的二面角接近多少？', options: ['0°', '60°', '180°'], answer: 2, feedback: '两键反式共平面时二面角约 180°，轨道排列最有利。' },
        { id: 'e2-2d', prompt: '二维锯架图中 Hβ 与 X 反向、共平面，这个构象能否直接满足经典 E2 最有利排列？', options: ['能', '不能，因为必须同侧', '只看碱强弱，构象无关'], answer: 0, feedback: '二维里认出 anti 后，就不再需要 3D 扶手。' },
        { id: 'e2-gauche', prompt: '转到 gauche 后点击反应，最严谨的说法是？', options: ['宇宙中绝不反应', '当前构象不满足经典 E2 最有利排列', '会自动变成 SN1'], answer: 1, feedback: '不是简单红叉；分子可先转到可反应构象，当前 gauche 本身不利。' }
      ],
      examBridge, fallbackSvg: fallback.e2
    },
    cip_tournament: {
      id: 'cip_tournament', preset: 'cip_rs', skillId: 'stereo.cip', mobileSafe: true,
      title: 'CIP 只解决一件事：谁排 1、2、3、4？',
      lifeIntuition: '像淘汰赛：先比直接相连原子；第一层打平，才把镜头向外移一层。',
      gap2D: '空间旋转不会改变优先级；优先级来自连接的原子，不来自它画在左边还是右边。',
      insight: 'CIP 是逐层比较的排序工具，不是凭基团看起来大不大。',
      steps: ['先只看编号 1、2、3、4，把“空间排列”和“叫什么名字”分开。', '真实例子 Br、OH、CH₃、H：直接原子序数先决定 Br > O > C > H。', '若第一原子都是 C，再向外比排序集合；O,H,H 会胜过 H,H,H。', '排完才进入 R/S；不要边排边猜顺逆时针。'],
      practices: [
        { id: 'cip-direct', prompt: 'Br、O、C、H 直接连到手性碳时，最高优先级是谁？', options: ['Br', 'O', 'C'], answer: 0, feedback: '第一层原子序数 35 > 8 > 6 > 1。' },
        { id: 'cip-next', prompt: '–CH₂OH 与 –CH₃ 第一层都为 C，下一层比较后谁优先？', options: ['–CH₂OH', '–CH₃', '完全相同'], answer: 0, feedback: 'O,H,H 与 H,H,H 比较，第一处差异 O > H。' }
      ],
      examBridge, fallbackSvg: fallback.cip_rs
    },
    rs_rotation: {
      id: 'rs_rotation', preset: 'cip_rs', skillId: 'stereo.rs', mobileSafe: true,
      title: '先把 4 号放背后，再给空间排列命名',
      lifeIntuition: '像先把相机摆到统一机位，再读转向；相机没摆好，顺逆时针没有共同标准。',
      gap2D: '纸上看到的顺时针会随观察方向改变，但同一个分子的构型不会因为整颗分子旋转而改变。',
      insight: 'R/S 不是分子本身的左右，而是固定优先级和观察方向后的命名结果。',
      steps: ['确认 CIP 已排成 1 > 2 > 3 > 4。', '把最低优先级 4 转到背后，再锁定这个视角。', '沿 1 → 2 → 3 读方向：顺时针 R，逆时针 S。', '把整颗分子旋转 180°：构型没有改变，只是观察者位置变了。', '最后撤掉 3D，用楔线独立判断。'],
      controls: [{ action: 'priority-away', label: '把 4 号转到背后' }, { action: 'half-turn', label: '整颗分子转 180°' }],
      practices: [
        { id: 'rs-basic', prompt: '4 号背向观察者时，1 → 2 → 3 顺时针叫什么？', options: ['R', 'S', '无法命名'], answer: 0, feedback: '最低优先级背向时，顺时针为 R。' },
        { id: 'rs-rotate', prompt: '把整颗分子在空间旋转 180°，它会变成另一个构型吗？', options: ['会', '不会，只是观察视角改变', '一定从 R 变 S'], answer: 1, feedback: '普通空间旋转不交换基团连接关系，所以构型不变。' }
      ],
      examBridge, fallbackSvg: fallback.cip_rs
    },
    newman_intro: {
      id: 'newman_intro', preset: 'newman', skillId: 'stereo.newman', mobileSafe: true,
      title: '把眼睛移到 C–C 键正前方',
      lifeIntuition: '像顺着一根吸管往里看：前端挡成一个点，后端露成一个圆。',
      gap2D: '普通线角式能告诉你谁连着谁，却不方便比较绕 C–C 单键转过的角度。',
      insight: 'Newman 不是新分子，只是把眼睛移到了 C–C 键正前方。',
      steps: ['先从斜侧面确认：这是同一根 C–C 键和六个取代基。', '点击“沿 C–C 键看”，前碳成为点，后碳成为圆。', '转动后碳，观察 eclipsed（重叠）与 staggered（错开）互换。', '在丁烷里再看两个 CH₃：相隔最远的 anti 比 gauche 更少拥挤。', '撤掉模型，只看 Newman 二维速记完成判断。'],
      controls: [{ action: 'bond-view', label: '沿 C–C 键看' }, { action: 'newman-rotate', label: '转动后碳 60°' }],
      practices: [
        { id: 'newman-eye', prompt: 'Newman 投影代表什么？', options: ['一种新分子', '沿 C–C 键方向观察的二维速记', '只适用于双键'], answer: 1, feedback: '观察方向改变了，分子连接没有改变。' },
        { id: 'newman-stagger', prompt: '乙烷中键彼此错开的构象正式叫？', options: ['eclipsed', 'staggered', 'endo'], answer: 1, feedback: '先看到电子云更少正面挤压，再命名为 staggered。' },
        { id: 'newman-butane', prompt: '丁烷绕中键观察，两个 CH₃ 相隔 180° 的构象通常更稳定，叫？', options: ['anti', 'gauche', 'eclipsed'], answer: 0, feedback: '两个大基团最远，空间拥挤较小。' }
      ],
      examBridge, fallbackSvg: fallback.newman
    },
    chair_intro: {
      id: 'chair_intro', preset: 'chair', skillId: 'stereo.chair', mobileSafe: true,
      title: '平面六边形为什么要折成椅式？',
      lifeIntuition: '像把一圈硬纸条轻轻折起：它不是为了画得怪，而是为了让键角与相邻键的错开都舒服一点。',
      gap2D: '平面六边形会误导你以为所有碳和键都在同一张纸上，也藏掉 axial / equatorial 的距离差。',
      insight: '椅式不是奇怪画法，是六元环为了让键角和扭转都舒服一点而折起来。',
      steps: ['先看平面六边形：它不能让每个 sp³ 碳都舒适。', '让环折起成为 chair，观察上下交替的空间形状。', '辨认 axial 大致平行于环的竖直方向，equatorial 向外围伸。', '比较 CH₃ axial 与 equatorial：axial 更靠近两个 1,3-diaxial H。', '做 ring flip：axial / equatorial 交换，但 up / down 不变。'],
      controls: [{ action: 'ring-flip', label: '做一次 ring flip' }, { action: 'methyl-equatorial', label: '把 CH₃ 放赤道位' }],
      practices: [
        { id: 'chair-axes', prompt: '环己烷椅式中，大致向环外围伸出的键叫？', options: ['axial', 'equatorial', 'endo'], answer: 1, feedback: 'equatorial 像沿环的“赤道”向外伸。' },
        { id: 'chair-flip', prompt: 'ring flip 后，原来 up 的取代基会怎样？', options: ['变 down', '仍是 up，但 axial/equatorial 互换', '从分子上掉下'], answer: 1, feedback: '环翻转换的是姿势，不改变 up/down 构型关系。' },
        { id: 'chair-methyl', prompt: '甲基环己烷通常哪个椅式更稳定？', options: ['CH₃ axial', 'CH₃ equatorial', '永远完全相同'], answer: 1, feedback: '赤道位减少与 1,3-diaxial H 的近距离拥挤。' }
      ],
      examBridge, fallbackSvg: fallback.chair
    },
    diels_alder_endo_exo: {
      id: 'diels_alder_endo_exo', preset: 'diels_alder', skillId: 'diene.diels_alder', mobileSafe: true,
      title: '同一骨架连接后，“货物”朝桥下还是桥外？',
      lifeIntuition: '把亲双烯体上的取代基想成货物：endo 是货物收向新桥下，exo 是货物朝外。',
      gap2D: '二维骨架能画出两根新 σ 键，却容易把桥下 / 桥外这层朝向压没。',
      insight: 'endo/exo 不是两种连接方式，而是同一种骨架连接后的空间朝向不同。',
      steps: ['先确认二烯的 4 个 π 电子与亲双烯体的 2 个 π 电子。', '两端同时靠近：六个 π 电子协同重新组织。', '形成两根新 σ 键与一根新 π 键，骨架连接相同。', '切换 endo / exo，只比较取代基朝桥下还是桥外。', '经典条件下 endo 常有动力学优势，但它不是任何底物、任何条件下的死规则。'],
      controls: [{ action: 'endo', label: '看 endo' }, { action: 'exo', label: '看 exo' }],
      practices: [
        { id: 'da-label', prompt: '取代基朝桥下 / 新 π 系统方向，空间标签是？', options: ['endo', 'exo', 'anti'], answer: 0, feedback: '先用“货物朝桥下”建立方向，再记正式名词 endo。' },
        { id: 'da-rule', prompt: '“endo 常优先”最严谨的理解是？', options: ['任何条件都绝对只得 endo', '经典条件下常有动力学优势，但要看底物与条件', 'endo 与 exo 连接方式完全不同'], answer: 1, feedback: 'endo/exo 是同骨架的空间朝向；常见选择性不是无边界口诀。' }
      ],
      examBridge, fallbackSvg: fallback.diels_alder
    }
  };

  window.Organic637ThreeDPresets = presets;
  window.Organic637ThreeDLessons = lessons;
  window.Organic637Data.THREE_D_PRESETS = presets;
  window.Organic637Data.THREE_D_LESSONS = lessons;
  window.Organic637Data.THREE_D_BY_SKILL = {
    'stereo.wedge_dash': 'tetrahedral_intro',
    'stereo.tetrahedral_view': 'tetrahedral_intro',
    'substitution.stereochemistry': 'sn2_backside',
    'substitution.sn2': 'sn2_backside',
    'elimination.antiperiplanar': 'e2_anti',
    'stereo.cip': 'cip_tournament',
    'stereo.rs': 'rs_rotation',
    'stereo.newman': 'newman_intro',
    'stereo.chair': 'chair_intro',
    'stereo.ring_flip': 'chair_intro',
    'diene.diels_alder': 'diels_alder_endo_exo',
    'diene.endo_exo': 'diels_alder_endo_exo'
  };
})();
