(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const clamp01 = value => Math.max(0, Math.min(1, Number(value) || 0));

  function normalizeProgress(progress) {
    const out = progress && typeof progress === 'object' ? progress : {};
    out.cases = out.cases && typeof out.cases === 'object' ? out.cases : {};
    out.currentCaseId = out.currentCaseId || null;
    return out;
  }

  function routeIds(route) {
    return (Array.isArray(route) ? route : route?.edges || []).map(String);
  }

  function pathEqual(a, b) {
    const x = routeIds(a), y = routeIds(b);
    return x.length === y.length && x.every((id, index) => id === y[index]);
  }

  function evaluateRoute(kase, forwardPath) {
    const graph = kase.graph || {};
    const edges = new Map((graph.edges || []).map(edge => [String(edge.id), edge]));
    let node = String(graph.start);
    let continuous = true;
    const used = [];
    for (const id of forwardPath.map(String)) {
      const edge = edges.get(id);
      if (!edge || String(edge.from) !== node) {
        continuous = false;
        break;
      }
      used.push(edge);
      node = String(edge.to);
    }
    const reachedTarget = continuous && node === String(graph.target);
    const accepted = (graph.referenceRoutes || []).some(route => pathEqual(route, forwardPath));
    const preferred = routeIds(graph.preferredPath || graph.referenceRoutes?.[0] || []);
    const validityMap = { green: 1, yellow: 1, orange: .35, red: 0 };
    const chemicalValidity = used.length ? used.reduce((sum, edge) => sum + (validityMap[edge.status || 'green'] ?? 0), 0) / used.length : 0;
    const preferredLength = Math.max(1, preferred.length || Math.min(...(graph.referenceRoutes || [[]]).map(route => Math.max(1, routeIds(route).length))));
    const efficiency = reachedTarget ? Math.max(.35, Math.min(1, preferredLength / Math.max(preferredLength, used.length))) : 0;
    const selectivity = used.length ? used.reduce((sum, edge) => sum + clamp01(edge.selectivity == null ? (edge.status === 'green' ? 1 : edge.status === 'yellow' ? .8 : .3) : edge.selectivity), 0) / used.length : 0;
    const compatibility = used.length ? used.reduce((sum, edge) => sum + (edge.compatibility === false ? 0 : edge.status === 'red' ? 0 : edge.status === 'orange' ? .35 : 1), 0) / used.length : 0;
    const score = .5 * chemicalValidity + .2 * efficiency + .15 * selectivity + .15 * compatibility;
    const hasRed = used.some(edge => edge.status === 'red');
    const hasOrange = used.some(edge => edge.status === 'orange');
    return {
      reachedTarget,
      continuous,
      accepted,
      preferred: pathEqual(preferred, forwardPath),
      chemicalValidity,
      efficiency,
      selectivity,
      compatibility,
      score: reachedTarget ? clamp01(score) : clamp01(score * .45),
      correct: Boolean(reachedTarget && !hasRed && !hasOrange && chemicalValidity >= .99),
      used,
      path: forwardPath.map(String)
    };
  }

  function statusText(edge) {
    if (!edge) return '';
    if (edge.status === 'yellow') return `🟡 这条路化学上能走，但不是主路线：${edge.reason || ''}`;
    if (edge.status === 'orange') return `🟠 这一步本身可能发生，但会把路线带偏：${edge.reason || ''}`;
    if (edge.status === 'red') return `🔴 关键化学逻辑在这里断了：${edge.reason || ''}`;
    return `🟢 这一步成立：${edge.reason || ''}`;
  }

  function routeEquation(kase, path) {
    const graph = kase.graph || {};
    const nodes = new Map((graph.nodes || []).map(node => [String(node.id), node]));
    const edges = new Map((graph.edges || []).map(edge => [String(edge.id), edge]));
    let nodeId = String(graph.start);
    const parts = [nodes.get(nodeId)?.structure || nodes.get(nodeId)?.label || nodeId];
    path.forEach(id => {
      const edge = edges.get(String(id));
      if (!edge) return;
      parts.push(`—[${edge.reagent || edge.choice || id}]→`);
      nodeId = String(edge.to);
      parts.push(nodes.get(nodeId)?.structure || nodes.get(nodeId)?.label || nodeId);
    });
    return parts.join(' ');
  }

  function mount(root, kase, settings = {}) {
    const graph = kase.graph || {};
    const nodes = new Map((graph.nodes || []).map(node => [String(node.id), node]));
    const edges = graph.edges || [];
    const state = {
      stage: 'analysis',
      difference: null,
      carbon: null,
      analysisSubmitted: false,
      mode: null,
      currentNode: String(graph.start),
      selectedEdges: [],
      nodeStack: [],
      message: '',
      hintsUsed: 0,
      confidence: 'unsure',
      completed: false
    };

    function shell(content, step = 1) {
      root.innerHTML = `<div class="synthesis-progress"><div><b>合成迷宫</b><span>${esc(kase.stage || '')}</span></div><div class="synthesis-step-dots">${[1,2,3,4].map(n => `<i class="${n <= step ? 'on' : ''}"></i>`).join('')}</div></div><div class="synthesis-case-head"><div><div class="stage-kicker">${esc(kase.title)}</div><h2>${esc(kase.subtitle || '')}</h2></div></div><div class="synthesis-bridge"><div><span>起点</span><b>${esc(kase.start?.label || '')}</b><strong>${esc(kase.start?.structure || '')}</strong></div><div class="bridge-arrow">⇄</div><div><span>目标</span><b>${esc(kase.target?.label || '')}</b><strong>${esc(kase.target?.structure || '')}</strong></div></div>${content}`;
    }

    function renderAnalysis() {
      const a = kase.analysis || {};
      shell(`<section class="synthesis-stage"><div class="stage-kicker">第 1 步 · 先别急着选试剂</div><h3>先比较起点和终点</h3><p class="stage-copy">合成题最容易一上来就“搜记忆”。这里先强制做两件更稳的事：看官能团差异，审计碳数。</p><div class="analysis-question"><b>${esc(a.differencePrompt || '关键结构差异是什么？')}</b><div class="detective-choice-grid">${(a.differenceOptions || []).map((row, i) => `<button type="button" class="detective-choice" data-diff="${esc(row.id)}"><span>${String.fromCharCode(65+i)}</span>${esc(row.label)}</button>`).join('')}</div></div><div class="analysis-question"><b>${esc(a.carbonPrompt || '碳数如何变化？')}</b><div class="detective-choice-grid">${(a.carbonOptions || []).map((row, i) => `<button type="button" class="detective-choice" data-carbon="${esc(row.id)}"><span>${String.fromCharCode(65+i)}</span>${esc(row.label)}</button>`).join('')}</div></div><div id="analysisFeedback"></div><div class="btn-row"><button type="button" class="btn primary" id="submitAnalysis" disabled>先把这两件事定下来</button></div></section>`, 1);
      const submit = root.querySelector('#submitAnalysis');
      root.querySelectorAll('[data-diff]').forEach(button => button.addEventListener('click', () => {
        state.difference = button.dataset.diff;
        root.querySelectorAll('[data-diff]').forEach(x => x.classList.toggle('selected', x === button));
        submit.disabled = !(state.difference && state.carbon);
      }));
      root.querySelectorAll('[data-carbon]').forEach(button => button.addEventListener('click', () => {
        state.carbon = button.dataset.carbon;
        root.querySelectorAll('[data-carbon]').forEach(x => x.classList.toggle('selected', x === button));
        submit.disabled = !(state.difference && state.carbon);
      }));
      submit.addEventListener('click', () => {
        state.analysisSubmitted = true;
        const diffOK = String(state.difference) === String(a.differenceAnswer);
        const carbonOK = String(state.carbon) === String(a.carbonAnswer);
        root.querySelector('#analysisFeedback').innerHTML = `<div class="feedback"><strong>${diffOK && carbonOK ? '起点和终点看清了。' : '先把桥头重新对齐。'}</strong><p>${esc(a.teaching || '')}</p><div class="formula-learning-card"><span>先把这条结构变化读出来</span><b>${esc(kase.start?.structure || '')} → ${esc(kase.target?.structure || '')}</b></div><div class="btn-row"><button type="button" class="btn primary" id="analysisNext">进入迷宫</button></div></div>`;
        root.querySelector('#analysisNext').onclick = renderMode;
      });
    }

    function renderMode() {
      shell(`<section class="synthesis-stage"><div class="stage-kicker">第 2 步 · 选择你的思考方向</div><h3>从起点往前走，还是从目标往后拆？</h3><div class="mode-grid"><button type="button" class="mode-card" data-mode="forward"><span>正向</span><b>我从起点往前想</b><small>已知起始物，逐步选择试剂与中间体。</small></button><button type="button" class="mode-card" data-mode="backward"><span>逆向</span><b>我从目标往后拆</b><small>先猜最后一步，再寻找合理前体。</small></button></div><div class="note">两种方式最后都会用同一条化学路线做正向验证。逆向只是帮助你找到路，不会替代最后的正向检查。</div></section>`, 2);
      root.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
        state.mode = button.dataset.mode;
        state.currentNode = String(state.mode === 'forward' ? graph.start : graph.target);
        state.selectedEdges = [];
        state.nodeStack = [];
        state.message = state.mode === 'forward' ? '从起点出发。先看这一步最需要改变什么。' : '从目标往回看。先猜最后一步可能由什么前体得到。';
        renderMaze();
      }));
    }

    function choicesAtCurrent() {
      if (state.mode === 'forward') return edges.filter(edge => String(edge.from) === state.currentNode);
      return edges.filter(edge => String(edge.to) === state.currentNode);
    }

    function goalReached() {
      return state.mode === 'forward' ? state.currentNode === String(graph.target) : state.currentNode === String(graph.start);
    }

    function forwardPath() {
      return state.mode === 'forward' ? state.selectedEdges.slice() : state.selectedEdges.slice().reverse();
    }

    function historyHtml() {
      if (!state.selectedEdges.length) return '<div class="empty-route">还没有落下第一步。</div>';
      return `<ol class="synthesis-history">${state.selectedEdges.map((id, index) => {
        const edge = edges.find(row => String(row.id) === String(id));
        const label = state.mode === 'forward' ? `${edge?.reagent || id} → ${nodes.get(String(edge?.to))?.structure || edge?.to}` : `${edge?.reagent || id} ⇐ ${nodes.get(String(edge?.from))?.structure || edge?.from}`;
        return `<li class="status-${esc(edge?.status || 'green')}"><span>${index + 1}</span><div><b>${esc(label)}</b><small>${esc(edge?.transformation || '')}</small></div></li>`;
      }).join('')}</ol>`;
    }

    function hintHtml() {
      const hints = kase.hints || [];
      if (!state.hintsUsed) return '';
      return `<div class="synthesis-hints">${hints.slice(0, state.hintsUsed).map((text, i) => `<div class="hint"><b>提示 ${i + 1}</b>${esc(text)}</div>`).join('')}</div>`;
    }

    function renderMaze() {
      const node = nodes.get(state.currentNode);
      const choices = choicesAtCurrent();
      const reached = goalReached();
      shell(`<section class="synthesis-stage"><div class="stage-kicker">第 3 步 · ${state.mode === 'forward' ? '正向搭桥' : '逆向拆桥'}</div><div class="maze-toolbar"><div class="current-node-card"><span>你现在站在</span><b>${esc(node?.label || state.currentNode)}</b><strong>${esc(node?.structure || '')}</strong></div><button type="button" class="btn ghost" id="resetDirection">换一个思考方向</button></div>${state.message ? `<div class="path-message">${esc(state.message)}</div>` : ''}<div class="section-title"><h3>已经走过</h3><span class="phase-badge">${state.mode === 'forward' ? '起点 → 目标' : '目标 → 起点'}</span></div>${historyHtml()}${reached ? `<div class="good synthesis-goal"><b>${state.mode === 'forward' ? '已经到达目标。' : '已经逆推回起点。'}</b><br>现在把路线按正向顺序重新检查，再提交评价。</div>` : choices.length ? `<div class="section-title"><h3>${state.mode === 'forward' ? '下一步选什么？' : '这个结构可能从哪一步来？'}</h3></div><div class="maze-choice-grid">${choices.map(edge => `<button type="button" class="maze-choice" data-edge="${esc(edge.id)}"><span>${esc(edge.reagent || edge.choice || edge.id)}</span><b>${esc(edge.transformation || '继续')}</b></button>`).join('')}</div>` : '<div class="dead-end">这里已经没有继续出口。这个中间体把路线带进了死胡同。</div>'}${hintHtml()}<div class="maze-controls"><div>${state.selectedEdges.length ? '<button type="button" class="btn ghost" id="backStep">← 回到上一个分叉点</button>' : ''}</div><div class="btn-row">${!reached && (kase.hints || []).length ? `<button type="button" class="btn soft" id="mazeHint" ${state.hintsUsed >= (kase.hints || []).length ? 'disabled' : ''}>${state.hintsUsed ? '再给一点提示' : '我卡住了，给一点提示'}</button>` : ''}${reached ? '<button type="button" class="btn primary" id="submitRoute">提交整条路线</button>' : ''}</div></div></section>`, 3);
      root.querySelector('#resetDirection')?.addEventListener('click', renderMode);
      root.querySelectorAll('[data-edge]').forEach(button => button.addEventListener('click', () => {
        const edge = edges.find(row => String(row.id) === button.dataset.edge);
        if (!edge) return;
        state.nodeStack.push(state.currentNode);
        state.selectedEdges.push(String(edge.id));
        state.currentNode = String(state.mode === 'forward' ? edge.to : edge.from);
        state.message = statusText(edge);
        renderMaze();
      }));
      root.querySelector('#backStep')?.addEventListener('click', () => {
        state.currentNode = String(state.nodeStack.pop() ?? (state.mode === 'forward' ? graph.start : graph.target));
        state.selectedEdges.pop();
        state.message = '已回到上一个分叉点。重新看这个节点还能怎么走。';
        renderMaze();
      });
      root.querySelector('#mazeHint')?.addEventListener('click', () => {
        state.hintsUsed = Math.min((kase.hints || []).length, state.hintsUsed + 1);
        renderMaze();
      });
      root.querySelector('#submitRoute')?.addEventListener('click', renderConfidence);
    }

    function renderConfidence() {
      const path = forwardPath();
      shell(`<section class="synthesis-stage"><div class="stage-kicker">第 4 步 · 提交前最后自检</div><h3>你对这条路线有多确定？</h3><div class="route-equation"><span>你的正向路线</span><b>${esc(routeEquation(kase, path))}</b></div><div class="confidence-buttons synthesis-confidence"><button type="button" data-confidence="sure">我确定</button><button type="button" data-confidence="unsure" class="active">有点犹豫</button><button type="button" data-confidence="guess">我在猜</button></div><div class="btn-row"><button type="button" class="btn ghost" id="backMaze">回去再看看</button><button type="button" class="btn primary" id="finalRoute">评价这条路线</button></div></section>`, 4);
      root.querySelectorAll('[data-confidence]').forEach(button => button.addEventListener('click', () => {
        state.confidence = button.dataset.confidence;
        root.querySelectorAll('[data-confidence]').forEach(x => x.classList.toggle('active', x === button));
      }));
      root.querySelector('#backMaze').onclick = renderMaze;
      root.querySelector('#finalRoute').onclick = renderResult;
    }

    function renderResult() {
      if (state.completed) return;
      state.completed = true;
      const a = kase.analysis || {};
      const diffCorrect = String(state.difference) === String(a.differenceAnswer);
      const carbonCorrect = String(state.carbon) === String(a.carbonAnswer);
      const path = forwardPath();
      const result = evaluateRoute(kase, path);
      const preferred = routeIds(graph.preferredPath || graph.referenceRoutes?.[0] || []);
      const summary = {
        caseId: kase.id,
        mode: state.mode,
        differenceCorrect: diffCorrect,
        carbonCorrect,
        route: path,
        routeResult: result,
        score: clamp01(.15 * (diffCorrect ? 1 : 0) + .1 * (carbonCorrect ? 1 : 0) + .75 * result.score),
        hintsUsed: state.hintsUsed,
        confidence: state.confidence,
        skillEvidence: [
          { skillId: 'synthesis.target_difference', questionSuffix: 'target-difference', correct: diffCorrect, partialScore: diffCorrect ? 1 : 0, errorType: diffCorrect ? null : 'wrong_functional_group' },
          { skillId: 'synthesis.carbon_count', questionSuffix: 'carbon-count', correct: carbonCorrect, partialScore: carbonCorrect ? 1 : 0, errorType: carbonCorrect ? null : 'wrong_disconnection' },
          { skillId: state.mode === 'backward' ? 'synthesis.last_step' : 'synthesis.disconnection', questionSuffix: 'route-build', correct: result.reachedTarget, partialScore: result.reachedTarget ? result.chemicalValidity : result.score, errorType: result.reachedTarget ? null : 'wrong_disconnection' },
          { skillId: 'synthesis.compatibility', questionSuffix: 'compatibility', correct: result.compatibility >= .99, partialScore: result.compatibility, errorType: result.compatibility >= .99 ? null : 'compatibility_error' },
          { skillId: 'synthesis.route_evaluation', questionSuffix: 'route-evaluation', correct: result.correct, partialScore: result.score, errorType: result.correct ? null : (result.compatibility < .8 ? 'compatibility_error' : 'wrong_disconnection') }
        ]
      };
      settings.onComplete?.(summary);
      const status = result.preferred ? '主路线' : result.correct ? '可行替代路线' : result.reachedTarget ? '到达目标但含风险步骤' : '没有真正到达目标';
      shell(`<section class="synthesis-stage synthesis-result"><div class="stage-kicker">路线评价</div><div class="synthesis-result-head"><div class="result-score-ring"><b>${Math.round(summary.score * 100)}</b><span>综合%</span></div><div><h3>${esc(status)}</h3><p>${result.preferred ? '这条路线既成立，也符合当前题目的优先路线。' : result.correct ? '不是参考主路线，但化学上成立；系统不会因为“不一样”把它判错。' : '分数保留了你已经做对的结构分析和可行步骤，不会整题清零。'}</p></div></div><div class="route-score-grid"><div><span>化学可行</span><b>${Math.round(result.chemicalValidity * 100)}%</b><small>权重 50%</small></div><div><span>效率</span><b>${Math.round(result.efficiency * 100)}%</b><small>权重 20%</small></div><div><span>选择性</span><b>${Math.round(result.selectivity * 100)}%</b><small>权重 15%</small></div><div><span>兼容性</span><b>${Math.round(result.compatibility * 100)}%</b><small>权重 15%</small></div></div><div class="panel-inset"><h3>你的路线</h3><div class="route-equation"><b>${esc(routeEquation(kase, path))}</b></div></div><div class="panel-inset preferred-route"><h3>优先参考路线</h3><div class="route-equation"><b>${esc(routeEquation(kase, preferred))}</b></div><p>${esc(kase.analysis?.teaching || '')}</p></div><div class="btn-row"><button type="button" class="btn ghost" id="synthesisBack">回到迷宫列表</button><button type="button" class="btn soft" id="synthesisRetry">换个方向再走一次</button>${settings.nextCaseId ? '<button type="button" class="btn primary" id="synthesisNext">下一座迷宫</button>' : ''}</div></section>`, 4);
      root.querySelector('#synthesisBack').onclick = () => settings.onBack?.();
      root.querySelector('#synthesisRetry').onclick = () => {
        state.completed = false;
        state.mode = null;
        state.currentNode = String(graph.start);
        state.selectedEdges = [];
        state.nodeStack = [];
        state.hintsUsed = 0;
        renderMode();
      };
      root.querySelector('#synthesisNext')?.addEventListener('click', () => settings.onNext?.(settings.nextCaseId));
    }

    renderAnalysis();
    return { state };
  }

  NS.Synthesis = { normalizeProgress, evaluateRoute, routeEquation, mount };
})();
