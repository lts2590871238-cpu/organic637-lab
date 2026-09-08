(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const clone = value => JSON.parse(JSON.stringify(value));

  function optionId(option, index) {
    return typeof option === 'object' ? String(option.id ?? index) : String(index);
  }

  function optionLabel(option) {
    return typeof option === 'object' ? option.label ?? option.formula ?? option.id : option;
  }

  function expectedChoice(question) {
    if (typeof question.answer === 'object' && question.answer !== null) return String(question.answer.id ?? question.answer.optionId ?? question.answer.value ?? '');
    if (typeof question.answer === 'number') return optionId((question.options || [])[question.answer], question.answer);
    return String(question.answer ?? '');
  }

  function isPathQuestion(question) {
    return question.type === 'route' || (question.type === 'synthesis' && Boolean(question.graph));
  }

  function isChoiceQuestion(question) {
    return ['choice', 'structure-choice'].includes(question.type) || (question.type === 'synthesis' && !question.graph);
  }

  function rankingEvaluation(question, order) {
    const correctOrder = (question.correctOrder || question.answer?.correctOrder || []).map(String);
    const actual = order.map(String);
    let concordant = 0;
    let total = 0;
    let firstWrongPair = null;
    for (let i = 0; i < correctOrder.length; i += 1) {
      for (let j = i + 1; j < correctOrder.length; j += 1) {
        total += 1;
        const a = correctOrder[i];
        const b = correctOrder[j];
        if (actual.indexOf(a) < actual.indexOf(b)) concordant += 1;
        else if (!firstWrongPair) firstWrongPair = [a, b];
      }
    }
    const pairwiseScore = total ? concordant / total : 0;
    return {
      correct: correctOrder.length === actual.length && correctOrder.every((id, i) => actual[i] === id),
      partialScore: pairwiseScore,
      details: { exactCorrect: pairwiseScore === 1, pairwiseScore, firstWrongPair },
      errorType: pairwiseScore === 1 ? null : 'ranking_factor_error'
    };
  }

  function pathEvaluation(question, path) {
    const graph = question.graph || {};
    const answer = question.answer || {};
    const accepted = answer.acceptedPaths || graph.referenceRoutes || [];
    const normalized = path.map(String);
    const exact = accepted.some(route => {
      const ids = (Array.isArray(route) ? route : route.edges || []).map(String);
      return ids.length === normalized.length && ids.every((id, index) => normalized[index] === id);
    });
    const edges = normalized.map(id => (graph.edges || []).find(edge => String(edge.id) === id)).filter(Boolean);
    const validCount = edges.filter(edge => ['green', 'yellow'].includes(edge.status || 'green')).length;
    const reachedTarget = edges.length ? String(edges[edges.length - 1].to) === String(graph.target) : String(graph.start) === String(graph.target);
    const chemicalValidity = edges.length ? validCount / edges.length : 0;
    const efficiency = reachedTarget ? Math.max(.45, Math.min(1, 3 / Math.max(3, edges.length))) : 0;
    const selectivity = edges.length ? edges.reduce((sum, edge) => sum + (edge.selectivity == null ? (edge.status === 'green' ? 1 : .72) : Number(edge.selectivity)), 0) / edges.length : 0;
    const compatibility = edges.length ? edges.reduce((sum, edge) => sum + (edge.compatibility === false ? 0 : edge.status === 'orange' || edge.status === 'red' ? .2 : 1), 0) / edges.length : 0;
    const routeScore = .5 * chemicalValidity + .2 * efficiency + .15 * selectivity + .15 * compatibility;
    return {
      correct: Boolean(reachedTarget && (exact || chemicalValidity === 1)),
      partialScore: Math.max(0, Math.min(1, routeScore)),
      details: { reachedTarget, exactReference: exact, chemicalValidity, efficiency, selectivity, compatibility, path: normalized },
      errorType: reachedTarget ? (compatibility < .8 ? 'compatibility_error' : exact ? null : 'wrong_disconnection') : 'wrong_disconnection'
    };
  }

  function arrowEvaluation(question, arrows) {
    const expected = question.expectedArrows || question.answer?.expectedArrows || [];
    const key = row => `${row.source}>${row.target}:${row.arrowType || 'pair'}`;
    const exp = expected.map(key);
    const actual = arrows.map(key);
    const matched = actual.filter(value => exp.includes(value)).length;
    const exact = exp.length === actual.length && matched === exp.length;
    let errorType = null;
    if (!exact) {
      const hasSource = arrows.some(row => expected.some(expRow => expRow.source === row.source));
      errorType = hasSource ? 'mechanism_target_error' : 'mechanism_source_error';
    }
    return { correct: exact, partialScore: exp.length ? matched / exp.length : 0, details: { expected, arrows }, errorType };
  }

  function evaluate(question, payload) {
    if (question.type === 'ranking') return rankingEvaluation(question, payload.order || []);
    if (isPathQuestion(question)) return pathEvaluation(question, payload.path || []);
    if (question.type === 'electron-arrow') return arrowEvaluation(question, payload.arrows || []);
    if (question.type === 'detective') {
      const expected = String(question.answer?.candidateId ?? question.answer ?? '');
      const correct = String(payload.selected) === expected;
      return { correct, partialScore: correct ? 1 : 0, details: { candidateId: payload.selected }, errorType: correct ? null : 'evidence_ignored' };
    }
    if (question.type === 'multi-choice') {
      const expected = (question.answer || []).map(String).sort();
      const actual = (payload.selected || []).map(String).sort();
      const matched = actual.filter(x => expected.includes(x)).length;
      return { correct: expected.length === actual.length && expected.every((x, i) => x === actual[i]), partialScore: expected.length ? matched / expected.length : 0, details: {}, errorType: expected.length === actual.length && expected.every((x, i) => x === actual[i]) ? null : 'unknown' };
    }
    if (question.type === 'numeric' || question.type === 'text-short') {
      const accepted = Array.isArray(question.answer) ? question.answer : [question.answer];
      const value = String(payload.value || '').trim().toLowerCase();
      const correct = accepted.some(x => String(x).trim().toLowerCase() === value);
      return { correct, partialScore: correct ? 1 : 0, details: {}, errorType: correct ? null : (question.errorType || 'unknown') };
    }
    const correct = String(payload.selected) === expectedChoice(question);
    const option = (question.options || []).find((x, i) => optionId(x, i) === String(payload.selected));
    return {
      correct,
      partialScore: correct ? 1 : 0,
      details: {},
      errorType: correct ? null : (option?.errorType || question.errorType || 'unknown')
    };
  }

  function renderRepresentation(question) {
    const pieces = [];
    if (question.formula) pieces.push(`<div class="formula">${esc(question.formula)}</div>`);
    if (question.stemStructure) {
      const stem = question.stemStructure;
      pieces.push(`<div class="stem-structure"><span>${esc(stem.label || '题干结构')}</span>${stem.svg ? `<div class="structure-stage trusted-svg">${stem.svg}</div>` : `<div class="formula">${esc(stem.formula || stem.structure || '')}</div>`}</div>`);
    }
    if (question.svg) pieces.push(`<div class="structure-stage trusted-svg">${question.svg}</div>`);
    return pieces.join('');
  }

  function arrowViewBox(question) {
    if (Array.isArray(question.viewBox) && question.viewBox.length === 4) return question.viewBox.map(Number);
    const source = String(question.baseSvg || '');
    const match = source.match(/viewBox=["']\s*([\d.+-]+)\s+([\d.+-]+)\s+([\d.+-]+)\s+([\d.+-]+)\s*["']/i);
    if (match) return match.slice(1).map(Number);
    return [0, 0, 640, 300];
  }

  function renderOptions(question, multi = false) {
    return `<div class="options structure-options">${(question.options || []).map((option, index) => {
      const id = optionId(option, index);
      const formula = typeof option === 'object' && option.formula ? `<span class="option-formula">${esc(option.formula)}</span>` : '';
      const svg = typeof option === 'object' && option.svg ? `<span class="option-svg trusted-svg">${option.svg}</span>` : '';
      return `<button type="button" class="option" data-option="${esc(id)}" aria-pressed="false"><span class="option-letter">${String.fromCharCode(65 + index)}</span><span>${svg}${formula}<span>${esc(optionLabel(option))}</span></span>${multi ? '<span class="multi-mark" aria-hidden="true">✓</span>' : ''}</button>`;
    }).join('')}</div>`;
  }

  function renderDetectiveLite(question) {
    const kase = question.case || {};
    const evidence = (kase.evidence || []).map(row => `<li>${esc(row.text || row.label || row.id)}</li>`).join('');
    const ir = (kase.irPeaks || []).map(row => `${esc(row.wavenumber)} cm⁻¹${row.label ? ` · ${esc(row.label)}` : ''}`).join('；');
    const candidates = (kase.candidates || []).map((candidate, index) => `<button type="button" class="option detective-candidate" data-option="${esc(candidate.id)}" aria-pressed="false"><span class="option-letter">${String.fromCharCode(65 + index)}</span><span><span class="option-formula">${esc(candidate.formula || candidate.label || candidate.id)}</span><span>先保留这个候选</span></span></button>`).join('');
    return `<div class="detective-lite"><div class="evidence-box"><b>当前证据</b>${kase.formula ? `<p>分子式：${esc(kase.formula)}${kase.dbe != null ? ` · DBE=${esc(kase.dbe)}` : ''}</p>` : ''}${evidence ? `<ul>${evidence}</ul>` : ''}${ir ? `<p class="tiny">IR：${ir}</p>` : ''}</div><p class="interaction-instruction">这是一次早期结构证据练习：先选目前最能满足全部硬证据的候选。后面的主线会逐步加入完整证据矩阵。</p><div class="options structure-options">${candidates}</div></div>`;
  }

  function renderSimpleSynthesis(question) {
    const start = question.start || {};
    const target = question.target || {};
    return `<div class="bridgeheads"><div><span>起点有什么？</span><b>${esc(start.label || start.structure || '')}</b>${start.structure && start.label ? `<small>${esc(start.structure)}</small>` : ''}</div><span class="bridge-arrow">→</span><div><span>终点多了什么？</span><b>${esc(target.label || target.structure || '')}</b>${target.structure && target.label ? `<small>${esc(target.structure)}</small>` : ''}</div></div>${renderOptions(question, false)}`;
  }

  function renderRanking(question) {
    return `<p class="interaction-instruction">拖动排序，或用每项右侧按钮移动。最上方表示“最强/最高”。</p><ol class="ranking-list" id="rankingList">${(question.items || []).map((item, index) => `<li class="ranking-item" draggable="true" data-rank-id="${esc(item.id)}"><span class="drag-handle" aria-hidden="true">⋮⋮</span><span class="rank-index">${index + 1}</span><span class="rank-content"><b>${esc(item.label || item.id)}</b>${item.formula ? `<small>${esc(item.formula)}</small>` : ''}</span><span class="rank-actions"><button type="button" data-move="up" aria-label="上移 ${esc(item.label || item.id)}">↑</button><button type="button" data-move="down" aria-label="下移 ${esc(item.label || item.id)}">↓</button></span></li>`).join('')}</ol>`;
  }

  function renderArrow(question) {
    const content = String(question.baseSvg || '').trim();
    const [vx, vy, vw, vh] = arrowViewBox(question);
    const viewBox = `${vx} ${vy} ${vw} ${vh}`;
    const svg = /^<svg[\s>]/i.test(content) ? content : `<svg viewBox="${viewBox}" role="img" aria-label="机理结构图">${content}</svg>`;
    const points = (question.hotspots || []).map(point => {
      const left = ((Number(point.x) - vx) / vw) * 100;
      const top = ((Number(point.y) - vy) / vh) * 100;
      return `<button type="button" class="hotspot" data-hotspot="${esc(point.id)}" data-role="${esc(point.role || 'both')}" style="left:${left}%;top:${top}%" aria-label="${esc(point.label)}"><span>${esc(point.label)}</span></button>`;
    }).join('');
    return `<div class="arrow-workspace" data-viewbox="${esc(viewBox)}"><div class="arrow-base trusted-svg">${svg}</div><svg class="arrow-overlay" viewBox="${viewBox}" aria-hidden="true"><defs><marker id="arrowHead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z"></path></marker></defs><g id="drawnArrows"></g></svg>${points}</div><div class="arrow-readout" id="arrowReadout">先点电子来源，再点电子目的地。</div><div class="arrow-tools"><button type="button" class="mini-button active" data-arrow-type="pair">双电子箭头</button><button type="button" class="mini-button" data-arrow-type="single">单电子鱼钩箭头</button><button type="button" class="mini-button" id="undoArrow">撤销上一支</button></div>`;
  }

  function renderPath(question) {
    const graph = question.graph || {};
    const start = (graph.nodes || []).find(node => String(node.id) === String(graph.start));
    const target = (graph.nodes || []).find(node => String(node.id) === String(graph.target));
    return `<div class="bridgeheads"><div><span>起点有什么？</span><b>${esc(start?.label || start?.structure || graph.start)}</b></div><span class="bridge-arrow">→</span><div><span>终点多了什么？</span><b>${esc(target?.label || target?.structure || graph.target)}</b></div></div><div class="path-history" id="pathHistory"></div><div class="path-node" id="pathNode"></div>`;
  }

  function commonFooter(question, settings) {
    const hints = settings.examMode ? '' : `<button type="button" id="hintButton" class="btn ghost">给我一点提示</button>`;
    return `<div class="confidence"><p>这次你有多确定？</p><div class="confidence-buttons"><button type="button" data-confidence="sure">我确定</button><button type="button" data-confidence="unsure" class="active">有点犹豫</button><button type="button" data-confidence="guess">我在猜</button></div><label class="reasoning-label">现在更接近哪种状态？<select id="reasoningState"><option value="">不额外标记</option><option value="familiar_cannot_recall">有印象但想不起来</option><option value="derive_not_recall">我能推但不记得</option><option value="no_start">我不知道从哪开始</option><option value="between_two">我在两个答案间犹豫</option><option value="alternate_idea">我有另一个想法</option></select></label></div><div id="hintBox"></div><div class="btn-row interaction-submit-row">${hints}<button type="button" id="submitAnswer" class="btn primary" disabled>${settings.examMode ? '锁定这一题' : '提交这个判断'}</button></div><div id="interactionFeedback"></div>`;
  }

  function mount(root, question, settings = {}) {
    const state = {
      confidence: 'unsure', hintsUsed: 0, submitted: false, selected: null, selectedMany: new Set(),
      order: (question.items || []).map(item => String(item.id)), arrows: [], arrowSource: null, arrowType: 'pair',
      path: [], currentNode: question.graph?.start, nodeStack: []
    };
    const type = question.type || 'choice';
    let body = '';
    if (isChoiceQuestion(question) && type !== 'synthesis') body = renderOptions(question, false);
    else if (type === 'synthesis' && !question.graph) body = renderSimpleSynthesis(question);
    else if (type === 'detective') body = renderDetectiveLite(question);
    else if (type === 'multi-choice') body = renderOptions(question, true);
    else if (type === 'ranking') body = renderRanking(question);
    else if (isPathQuestion(question)) body = renderPath(question);
    else if (type === 'electron-arrow') body = renderArrow(question);
    else if (type === 'numeric' || type === 'text-short') body = `<label class="short-answer"><span>你的答案</span><input id="shortAnswer" autocomplete="off" inputmode="${type === 'numeric' ? 'decimal' : 'text'}"></label>`;

    root.innerHTML = `<div class="question-prompt">${esc(question.prompt)}</div>${renderRepresentation(question)}${body}${commonFooter(question, settings)}`;
    const submit = root.querySelector('#submitAnswer');
    const feedback = root.querySelector('#interactionFeedback');
    const canSubmit = () => {
      if (isChoiceQuestion(question) || type === 'detective') return state.selected !== null;
      if (type === 'multi-choice') return state.selectedMany.size > 0;
      if (type === 'ranking') return state.order.length > 1;
      if (type === 'electron-arrow') return state.arrows.length > 0;
      if (isPathQuestion(question)) return state.path.length > 0;
      return Boolean(root.querySelector('#shortAnswer')?.value.trim());
    };
    const refreshSubmit = () => { submit.disabled = state.submitted || !canSubmit(); };

    root.querySelectorAll('[data-confidence]').forEach(button => button.addEventListener('click', () => {
      if (state.submitted) return;
      state.confidence = button.dataset.confidence;
      root.querySelectorAll('[data-confidence]').forEach(x => x.classList.toggle('active', x === button));
    }));

    root.querySelectorAll('[data-option]').forEach(button => button.addEventListener('click', () => {
      if (state.submitted) return;
      const id = button.dataset.option;
      if (type === 'multi-choice') {
        state.selectedMany.has(id) ? state.selectedMany.delete(id) : state.selectedMany.add(id);
        button.classList.toggle('selected', state.selectedMany.has(id));
        button.setAttribute('aria-pressed', String(state.selectedMany.has(id)));
      } else {
        state.selected = id;
        root.querySelectorAll('[data-option]').forEach(x => { x.classList.toggle('selected', x === button); x.setAttribute('aria-pressed', String(x === button)); });
      }
      refreshSubmit();
    }));

    if (type === 'ranking') bindRanking(root, state, refreshSubmit);
    if (type === 'electron-arrow') bindArrows(root, question, state, refreshSubmit);
    if (isPathQuestion(question)) bindPath(root, question, state, refreshSubmit);
    root.querySelector('#shortAnswer')?.addEventListener('input', refreshSubmit);

    const hintButton = root.querySelector('#hintButton');
    hintButton?.addEventListener('click', () => {
      if (state.submitted) return;
      const hints = question.hints || [];
      if (!hints.length) return;
      state.hintsUsed = Math.min(hints.length, state.hintsUsed + 1);
      root.querySelector('#hintBox').innerHTML = `<div class="hint"><b>提示 ${state.hintsUsed}</b>${esc(hints[state.hintsUsed - 1])}</div>`;
      if (state.hintsUsed >= hints.length) hintButton.disabled = true;
    });

    submit.addEventListener('click', () => {
      if (state.submitted || !canSubmit()) return;
      const payload = type === 'multi-choice' ? { selected: [...state.selectedMany] } :
        (isChoiceQuestion(question) || type === 'detective') ? { selected: state.selected } :
        type === 'ranking' ? { order: state.order.slice() } :
        type === 'electron-arrow' ? { arrows: clone(state.arrows) } :
        isPathQuestion(question) ? { path: state.path.slice() } :
        { value: root.querySelector('#shortAnswer')?.value || '' };
      const result = evaluate(question, payload);
      state.submitted = true;
      root.querySelectorAll('button,input,select').forEach(control => { if (!control.closest('#interactionFeedback')) control.disabled = true; });
      if (!settings.examMode) markAnswer(root, question, type, result, payload);
      const submission = {
        ...result,
        payload,
        confidence: state.confidence,
        hintsUsed: state.hintsUsed,
        reasoningState: root.querySelector('#reasoningState')?.value || null
      };
      if (settings.examMode) feedback.innerHTML = '<div class="feedback locked"><strong>这一题已锁定。</strong><p>答案和解析会在整卷结束后统一出现。</p></div>';
      settings.onSubmit?.(submission, feedback);
    });
    refreshSubmit();
    return { state };
  }

  function markAnswer(root, question, type, result, payload) {
    if (isChoiceQuestion(question)) {
      const expected = expectedChoice(question);
      root.querySelectorAll('[data-option]').forEach(button => {
        button.classList.toggle('correct', button.dataset.option === expected);
        button.classList.toggle('wrong', button.dataset.option === String(payload.selected) && !result.correct);
      });
    } else if (type === 'detective') {
      const expected = String(question.answer?.candidateId ?? question.answer ?? '');
      root.querySelectorAll('[data-option]').forEach(button => {
        button.classList.toggle('correct', button.dataset.option === expected);
        button.classList.toggle('wrong', button.dataset.option === String(payload.selected) && !result.correct);
      });
    }
  }

  function bindRanking(root, state, refreshSubmit) {
    const list = root.querySelector('#rankingList');
    let dragging = null;
    const sync = () => {
      state.order = [...list.querySelectorAll('[data-rank-id]')].map(item => item.dataset.rankId);
      [...list.children].forEach((item, index) => { item.querySelector('.rank-index').textContent = index + 1; });
      refreshSubmit();
    };
    list.addEventListener('dragstart', event => { dragging = event.target.closest('[data-rank-id]'); dragging?.classList.add('dragging'); });
    list.addEventListener('dragend', () => { dragging?.classList.remove('dragging'); dragging = null; sync(); });
    list.addEventListener('dragover', event => {
      event.preventDefault();
      const target = event.target.closest('[data-rank-id]');
      if (!dragging || !target || target === dragging) return;
      const box = target.getBoundingClientRect();
      list.insertBefore(dragging, event.clientY < box.top + box.height / 2 ? target : target.nextSibling);
    });
    list.addEventListener('click', event => {
      const button = event.target.closest('[data-move]');
      if (!button) return;
      const item = button.closest('[data-rank-id]');
      if (button.dataset.move === 'up' && item.previousElementSibling) list.insertBefore(item, item.previousElementSibling);
      if (button.dataset.move === 'down' && item.nextElementSibling) list.insertBefore(item.nextElementSibling, item);
      sync();
    });
  }

  function bindArrows(root, question, state, refreshSubmit) {
    const points = new Map((question.hotspots || []).map(point => [String(point.id), point]));
    const readout = root.querySelector('#arrowReadout');
    const draw = () => {
      const group = root.querySelector('#drawnArrows');
      group.innerHTML = state.arrows.map((arrow, index) => {
        const a = points.get(String(arrow.source));
        const b = points.get(String(arrow.target));
        if (!a || !b) return '';
        const bend = Math.max(22, Math.abs(Number(b.x) - Number(a.x)) * .18);
        return `<path d="M ${Number(a.x)} ${Number(a.y)} Q ${(Number(a.x) + Number(b.x)) / 2} ${Math.min(Number(a.y), Number(b.y)) - bend} ${Number(b.x)} ${Number(b.y)}" class="drawn-arrow ${arrow.arrowType === 'single' ? 'single' : ''}" marker-end="url(#arrowHead)"></path><text x="${(Number(a.x) + Number(b.x)) / 2}" y="${Math.min(Number(a.y), Number(b.y)) - bend - 5}">${index + 1}</text>`;
      }).join('');
      readout.textContent = state.arrowSource ? `已选来源：${points.get(state.arrowSource)?.label || state.arrowSource}。现在点目的地。` : state.arrows.length ? `已画 ${state.arrows.length} 支箭头。` : '先点电子来源，再点电子目的地。';
      refreshSubmit();
    };
    root.querySelectorAll('[data-arrow-type]').forEach(button => button.addEventListener('click', () => {
      state.arrowType = button.dataset.arrowType;
      root.querySelectorAll('[data-arrow-type]').forEach(x => x.classList.toggle('active', x === button));
    }));
    root.querySelectorAll('[data-hotspot]').forEach(button => button.addEventListener('click', () => {
      const id = button.dataset.hotspot;
      if (!state.arrowSource) {
        state.arrowSource = id;
        root.querySelectorAll('[data-hotspot]').forEach(x => x.classList.toggle('source-selected', x === button));
      } else {
        state.arrows.push({ source: state.arrowSource, target: id, arrowType: state.arrowType });
        state.arrowSource = null;
        root.querySelectorAll('[data-hotspot]').forEach(x => x.classList.remove('source-selected'));
      }
      draw();
    }));
    root.querySelector('#undoArrow')?.addEventListener('click', () => { state.arrowSource = null; state.arrows.pop(); draw(); });
  }

  function bindPath(root, question, state, refreshSubmit) {
    const graph = question.graph || {};
    const nodes = new Map((graph.nodes || []).map(node => [String(node.id), node]));
    const edges = graph.edges || [];
    const nodeBox = root.querySelector('#pathNode');
    const history = root.querySelector('#pathHistory');
    const render = message => {
      const node = nodes.get(String(state.currentNode));
      const outgoing = edges.filter(edge => String(edge.from) === String(state.currentNode));
      history.innerHTML = state.path.length ? `<ol>${state.path.map(id => { const edge = edges.find(x => String(x.id) === String(id)); return `<li class="status-${esc(edge?.status || 'green')}">${esc(edge?.reagent || edge?.choice || id)} <small>${esc(edge?.transformation || '')}</small></li>`; }).join('')}</ol>` : '<p>路线还没有落下第一步。</p>';
      nodeBox.innerHTML = `<div class="current-compound"><span>当前位置</span><strong>${esc(node?.label || node?.structure || state.currentNode)}</strong>${node?.structure && node?.label ? `<small>${esc(node.structure)}</small>` : ''}</div>${message ? `<div class="path-message">${esc(message)}</div>` : ''}${String(state.currentNode) === String(graph.target) ? '<div class="good">路线已到达目标。现在可以提交整条路线。</div>' : outgoing.length ? `<div class="path-choices">${outgoing.map(edge => `<button type="button" class="path-choice" data-edge="${esc(edge.id)}"><b>${esc(edge.reagent || edge.choice || edge.id)}</b><span>${esc(edge.choice || edge.transformation || '继续这条路线')}</span></button>`).join('')}</div>` : '<div class="dead-end">这条路在这里卡住了。回到上一个分叉点，再看是哪一步让后续失去出口。</div>'}${state.path.length ? '<button type="button" id="backBranch" class="btn ghost">← 回到上一个分叉点</button>' : ''}`;
      nodeBox.querySelectorAll('[data-edge]').forEach(button => button.addEventListener('click', () => {
        const edge = edges.find(x => String(x.id) === button.dataset.edge);
        if (!edge) return;
        state.nodeStack.push(state.currentNode);
        state.path.push(String(edge.id));
        state.currentNode = edge.to;
        const wording = edge.status === 'yellow' ? `这条路化学上能走，但不是最高效主路线：${edge.reason || ''}` : edge.status === 'orange' ? `这一步在当前条件下明显受抑：${edge.reason || ''}` : edge.status === 'red' ? `关键逻辑在这里断了：${edge.reason || ''}` : edge.reason || '这一步可行。';
        render(wording);
        refreshSubmit();
      }));
      nodeBox.querySelector('#backBranch')?.addEventListener('click', () => {
        state.currentNode = state.nodeStack.pop() ?? graph.start;
        state.path.pop();
        render('已回到上一个分叉点。');
        refreshSubmit();
      });
    };
    render();
  }

  NS.Interactions = { mount, evaluate, rankingEvaluation, pathEvaluation, arrowEvaluation };
})();
