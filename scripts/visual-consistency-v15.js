(function () {
  'use strict';
  const Data = window.Organic637Data = window.Organic637Data || {};
  if (!Data.days) return;

  const hasDiagram = row => Boolean(
    row?.heroDiagram || row?.threeDId ||
    (row?.sequence || []).some(step => step?.diagram) ||
    (row?.termCards || []).some(card => card?.diagram)
  );
  const firstDiagram = row =>
    row?.heroDiagram ||
    (row?.sequence || []).find(step => step?.diagram)?.diagram ||
    (row?.termCards || []).find(card => card?.diagram)?.diagram ||
    '';
  const fakeVisual = visual => visual && /把这一行当成“找不同”|先看左边有什么，再看右边哪里变了/.test(String(visual.caption || ''));
  const genericLook = rows => {
    const text = (rows || []).join(' ');
    return /真正发生变化的是哪根键|哪个官能团|反应名字遮住|碳骨架有没有变化/.test(text);
  };

  for (const day of Object.values(Data.days)) {
    for (const row of day.lessons || []) {
      const real = hasDiagram(row);
      const first = firstDiagram(row);
      if (!row.heroDiagram && first) row.heroDiagram = first;

      // 程序自动把“文字 → 文字”画成框，只能叫结构摘要，不能冒充真正化学图。
      if (fakeVisual(row.visual)) row.visual = null;

      // 绝不允许“看图说一句”出现在没有真实图的页面。
      if (!real && Array.isArray(row.lookQuestions)) row.lookQuestions = [];

      // 泛化看图题即使有图也容易让初学者发懵；没有作者写的具体问题就宁可不问。
      if (genericLook(row.lookQuestions)) row.lookQuestions = [];
    }
  }

  // Day 1 的核心第一次理解页必须有主图，防止最基础概念只剩文字。
  const forced = {
    'd01-pre-06-pi': 'sigma-pi',
    'd01-zero-03-electrons': 'electron',
    'd01-zero-04-break-bond': 'heterolysis',
    'd01-zero-06-hbr-movie': 'pi-to-h',
    'd01-lesson-structure': 'sigma-pi',
    'd01-lesson-addition': 'addition',
    'd01-lesson-hbr': 'pi-to-h',
    'd01-lesson-bromine': 'bromonium-form',
    'd01-lesson-halohydrin': 'bromonium-open-water'
  };
  const d1 = Data.days[1]?.lessons || [];
  for (const [id, diagram] of Object.entries(forced)) {
    const row = d1.find(item => item.id === id);
    if (row) row.heroDiagram = diagram;
  }

  // 继续保留V14对“加成”页的真正逐步视觉解释。
  const add = d1.find(item => item.id === 'd01-lesson-addition');
  if (add) {
    add.heroDiagram = 'addition';
    add.visual = null;
    add.title = '“加成”到底是什么？先看 C=C 怎么一步一步变成 C–C';
    add.body = '先别背“加成反应”四个字。原双键里的 C—C σ 主连接仍把两个碳连在一起；真正被重新利用的是额外那套 π 电子。若试剂写成 A–B，就先把 A 和 B 当成两个需要找到落脚位置的“拼图块”。';
    add.formulas = ['反应前：C=C + A–B','反应后：A–C–C–B','原 C—C σ 保留；π 电子重新分配去形成新 σ 键'];
    add.sequence = [
      { title:'第 1 步：先把双键拆成两层看', text:'C=C 不是两根完全一样的线。两个碳之间有一根 σ 主连接，另外还有一套 π 电子云。', formula:'C=C = σ + π', diagram:'sigma-pi' },
      { title:'第 2 步：先别剪断碳骨架', text:'两个碳仍由原 C—C σ 键连着；被重新利用的是 π 那一对电子。', formula:'σ 保留；π 准备重新成键', diagram:'sigma-pi' },
      { title:'第 3 步：给 A 和 B 找落脚点', text:'A 和 B 都必须在产物中找到位置。先做原子守恒，再谈区域选择。', formula:'C=C + A–B', diagram:'addition' },
      { title:'第 4 步：一对 π 电子形成新 σ 键', text:'不是原子自己跳过去，而是一对原本属于 π 的电子开始在新的两个原子之间共享。', formula:'π 电子 → 新 σ 键', diagram:'new-bond' },
      { title:'第 5 步：只比较反应前后', text:'原来是 C=C；现在是 C—C，并且原双键两个碳各增加了新连接。整条碳链并没有被剪断。', formula:'C=C → A–C–C–B', diagram:'addition' }
    ];
    add.lookQuestions = [
      '指着图左边说：哪一部分是 C—C 的 σ 主连接，哪一部分是 π 电子云？',
      '再指着产物说：C=C 还在吗？原双键两个碳分别多出了什么新连接？'
    ];
  }

  Data.VISUAL_CONSISTENCY_VERSION = 'v15';
})();
