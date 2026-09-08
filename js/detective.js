(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const clamp01 = value => Math.max(0, Math.min(1, Number(value) || 0));

  function normalizeProgress(progress) {
    const out = progress && typeof progress === 'object' ? progress : {};
    out.cases = out.cases && typeof out.cases === 'object' ? out.cases : {};
    out.inProgress = out.inProgress && typeof out.inProgress === 'object' ? out.inProgress : {};
    out.currentCaseId = out.currentCaseId || null;
    return out;
  }

  function irSvg(peaks = []) {
    const min = 400, max = 4000, width = 760, height = 245;
    const x = wn => 52 + ((max - Number(wn)) / (max - min)) * 660;
    const lines = [4000, 3000, 2000, 1500, 1000, 500].map(v => `<g><line x1="${x(v)}" y1="38" x2="${x(v)}" y2="194" class="spectrum-grid"/><text x="${x(v)}" y="216" text-anchor="middle">${v}</text></g>`).join('');
    const sticks = peaks.map(row => {
      const px = x(row.wavenumber);
      const depth = 32 + clamp01(row.intensity ?? .65) * 112;
      return `<g><line x1="${px}" y1="54" x2="${px}" y2="${54 + depth}" class="ir-stick"/><text x="${px}" y="${Math.min(188, 64 + depth)}" text-anchor="middle" class="spectrum-label">${esc(row.label || '')}</text></g>`;
    }).join('');
    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="简化 IR 光谱"><line x1="52" y1="54" x2="712" y2="54" class="spectrum-axis"/>${lines}${sticks}<text x="382" y="238" text-anchor="middle" class="spectrum-axis-title">波数 / cm⁻¹（从左到右递减）</text></svg>`;
  }

  function nmrSvg(signals = []) {
    const width = 760, height = 245;
    const x = ppm => 52 + ((10 - Number(ppm)) / 10) * 660;
    const lines = [10, 8, 6, 4, 2, 0].map(v => `<g><line x1="${x(v)}" y1="36" x2="${x(v)}" y2="194" class="spectrum-grid"/><text x="${x(v)}" y="216" text-anchor="middle">${v}</text></g>`).join('');
    const sticks = signals.map((row, idx) => {
      const px = x(row.ppm);
      const h = Math.min(112, 42 + Number(row.integral || 1) * 9);
      return `<g><line x1="${px}" y1="188" x2="${px}" y2="${188 - h}" class="nmr-stick"/><text x="${px}" y="${Math.max(45, 178 - h)}" text-anchor="middle" class="spectrum-label">${esc(row.multiplicity || '')} · ${esc(row.integral || '')}H</text><text x="${px}" y="${Math.max(58, 192 - h)}" text-anchor="middle" class="spectrum-label faint">${esc(row.label || `峰${idx + 1}`)}</text></g>`;
    }).join('');
    return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="简化 1H NMR 光谱"><line x1="52" y1="188" x2="712" y2="188" class="spectrum-axis"/>${lines}${sticks}<text x="382" y="238" text-anchor="middle" class="spectrum-axis-title">δ / ppm（从左到右递减）</text></svg>`;
  }

  function correctChoice(def, selected) {
    return String(selected ?? '') === String(def?.answer ?? '');
  }

  function expectedCandidateDecision(kase, candidate) {
    if (String(candidate.id) === String(kase.correctCandidate)) return 'keep';
    const values = Object.values(candidate.constraints || {});
    if (values.includes('fail')) return 'exclude';
    return 'uncertain';
  }

  function eliminationScore(kase, decisions) {
    const candidates = kase.candidates || [];
    if (!candidates.length) return 0;
    const correct = candidates.filter(candidate => decisions[candidate.id] === expectedCandidateDecision(kase, candidate)).length;
    return correct / candidates.length;
  }

  function matrixRows(kase) {
    const ids = ['formula', 'dbe', 'ir', 'nmr', ...(kase.hardEvidence || []).map(row => row.id)].filter((id, i, rows) => rows.indexOf(id) === i);
    const labels = new Map([
      ['formula', '分子式'], ['dbe', 'DBE'], ['ir', 'IR'], ['nmr', '¹H NMR'],
      ...(kase.hardEvidence || []).map(row => [row.id, row.label || row.text || row.id])
    ]);
    return ids.map(id => ({ id, label: labels.get(id) || id }));
  }

  function statusMark(value) {
    if (value === 'pass') return '<span class="constraint pass" title="符合">✓</span>';
    if (value === 'fail') return '<span class="constraint fail" title="不符合">×</span>';
    if (value === 'partial') return '<span class="constraint partial" title="部分符合/不够区分">△</span>';
    return '<span class="constraint unknown">?</span>';
  }

  function mount(root, kase, settings = {}) {
    const saved = settings.initialState && typeof settings.initialState === 'object' ? settings.initialState : {};
    const state = {
      stage: Math.max(0, Math.min(4, Number(saved.stage) || 0)),
      dbeValue: saved.dbeValue || '',
      irSelected: saved.irSelected ?? null,
      nmrSelected: saved.nmrSelected ?? null,
      decisions: saved.decisions && typeof saved.decisions === 'object' ? { ...saved.decisions } : {},
      finalSelected: saved.finalSelected ?? null,
      confidence: ['sure','unsure','guess'].includes(saved.confidence) ? saved.confidence : 'unsure',
      hintsUsed: Math.max(0, Number(saved.hintsUsed) || 0),
      hintsByStage: saved.hintsByStage && typeof saved.hintsByStage === 'object' ? { ...saved.hintsByStage } : {},
      submitted: false
    };
    const emitProgress = () => settings.onProgress?.({
      stage: state.stage,
      dbeValue: state.dbeValue,
      irSelected: state.irSelected,
      nmrSelected: state.nmrSelected,
      decisions: { ...state.decisions },
      finalSelected: state.finalSelected,
      confidence: state.confidence,
      hintsUsed: state.hintsUsed,
      hintsByStage: { ...state.hintsByStage }
    });

    const stages = ['DBE', 'IR', 'NMR', '候选排除', '最终结构'];
    const currentHintKey = () => ['dbe', 'ir', 'nmr', 'candidates', 'candidates'][state.stage] || 'candidates';
    const progressPct = () => Math.round((state.stage / (stages.length - 1)) * 100);

    function header() {
      return `<div class="detective-progress"><div class="detective-progress-top"><span>${esc(kase.stage || '结构推断')}</span><b>${state.stage + 1}/${stages.length} · ${esc(stages[state.stage])}</b></div><div class="progress-line"><i style="width:${progressPct()}%"></i></div></div><div class="detective-case-head"><div><h2>${esc(kase.title)}</h2><p>${esc(kase.subtitle || '')}</p></div><div class="case-formula"><span>分子式</span><b>${esc(kase.formula)}</b></div></div>`;
    }

    function hintButton() {
      const key = currentHintKey();
      const hint = kase.hints?.[key];
      if (!hint) return '';
      const used = state.hintsByStage[key];
      return `<div class="detective-hint-row"><button type="button" class="btn ghost" id="detectiveHint">${used ? '提示已经展开' : '给我一点提示'}</button>${used ? `<div class="hint"><b>提示</b>${esc(hint)}</div>` : ''}</div>`;
    }

    function evidenceStrip() {
      const rows = kase.hardEvidence || [];
      if (!rows.length) return '';
      return `<div class="evidence-strip">${rows.map(row => `<div class="evidence-pill"><span>${esc(row.label || '证据')}</span><b>${esc(row.text || '')}</b></div>`).join('')}</div>`;
    }

    function renderDBE() {
      root.innerHTML = `${header()}${evidenceStrip()}<section class="detective-stage"><div class="stage-kicker">第一步 · 不先猜结构</div><h3>先算不饱和度 DBE</h3><p class="stage-copy">环、双键各贡献 1，三键贡献 2。氧不进入常规 DBE 公式。</p><label class="dbe-input"><span>你的 DBE</span><input id="dbeValue" inputmode="decimal" autocomplete="off" value="${esc(state.dbeValue)}" placeholder="例如 2"></label>${hintButton()}<div class="btn-row"><button class="btn primary" id="nextDetective" disabled>确认 DBE，继续看 IR</button></div></section>`;
      const input = root.querySelector('#dbeValue');
      const next = root.querySelector('#nextDetective');
      input.addEventListener('input', () => { state.dbeValue = input.value.trim(); next.disabled = state.dbeValue === ''; });
      bindHint();
      next.onclick = () => { state.dbeValue = input.value.trim(); state.stage = 1; render(); };
    }

    function renderSpectrumStage(kind) {
      const def = kase[kind];
      const isIR = kind === 'ir';
      const selected = isIR ? state.irSelected : state.nmrSelected;
      root.innerHTML = `${header()}${evidenceStrip()}<section class="detective-stage"><div class="stage-kicker">${isIR ? '第二步 · 官能团硬证据' : '第三步 · 把峰拼成片段'}</div><h3>${isIR ? 'IR：先判断“有哪些官能团”' : '¹H NMR：积分、裂分、位移一起读'}</h3><div class="spectrum-card trusted-svg">${isIR ? irSvg(def.peaks) : nmrSvg(def.signals)}</div><p class="spectrum-question">${esc(def.prompt)}</p><div class="detective-choice-grid">${(def.options || []).map((opt, index) => `<button type="button" class="detective-choice ${String(selected) === String(opt.id) ? 'selected' : ''}" data-spectrum-option="${esc(opt.id)}"><span>${String.fromCharCode(65 + index)}</span><b>${esc(opt.label)}</b></button>`).join('')}</div>${hintButton()}<div class="btn-row"><button class="btn ghost" id="prevDetective">← 上一步</button><button class="btn primary" id="nextDetective" ${selected == null ? 'disabled' : ''}>${isIR ? '继续看 NMR' : '开始淘汰候选'}</button></div></section>`;
      root.querySelectorAll('[data-spectrum-option]').forEach(button => button.onclick = () => {
        if (isIR) state.irSelected = button.dataset.spectrumOption;
        else state.nmrSelected = button.dataset.spectrumOption;
        render();
      });
      bindHint();
      root.querySelector('#prevDetective').onclick = () => { state.stage -= 1; render(); };
      root.querySelector('#nextDetective').onclick = () => { state.stage += 1; render(); };
    }

    function renderCandidates() {
      root.innerHTML = `${header()}${evidenceStrip()}<section class="detective-stage"><div class="stage-kicker">第四步 · 候选结构不是一次性单选</div><h3>逐个决定：保留、排除，还是暂时不确定</h3><p class="stage-copy">这一步只看“目前全部证据能不能同时成立”。选错一个候选不会让整题归零。</p><div class="candidate-grid">${(kase.candidates || []).map(candidate => `<article class="candidate-card"><div class="candidate-title"><span>${esc(candidate.label || candidate.id)}</span><b>${esc(candidate.structure || '')}</b></div><div class="candidate-actions"><button type="button" data-candidate="${esc(candidate.id)}" data-decision="keep" class="${state.decisions[candidate.id] === 'keep' ? 'active keep' : ''}">先保留</button><button type="button" data-candidate="${esc(candidate.id)}" data-decision="exclude" class="${state.decisions[candidate.id] === 'exclude' ? 'active exclude' : ''}">排除</button><button type="button" data-candidate="${esc(candidate.id)}" data-decision="uncertain" class="${state.decisions[candidate.id] === 'uncertain' ? 'active uncertain' : ''}">还不确定</button></div></article>`).join('')}</div>${hintButton()}<div class="btn-row"><button class="btn ghost" id="prevDetective">← 上一步</button><button class="btn primary" id="nextDetective" ${(kase.candidates || []).every(c => state.decisions[c.id]) ? '' : 'disabled'}>拿着候选进入最终判断</button></div></section>`;
      root.querySelectorAll('[data-candidate]').forEach(button => button.onclick = () => {
        state.decisions[button.dataset.candidate] = button.dataset.decision;
        render();
      });
      bindHint();
      root.querySelector('#prevDetective').onclick = () => { state.stage -= 1; render(); };
      root.querySelector('#nextDetective').onclick = () => { state.stage = 4; render(); };
    }

    function renderFinalChoice() {
      root.innerHTML = `${header()}${evidenceStrip()}<section class="detective-stage"><div class="stage-kicker">第五步 · 只有现在才下最终结论</div><h3>哪一个候选能同时解释全部证据？</h3><div class="final-candidates">${(kase.candidates || []).map((candidate, index) => `<button type="button" class="final-candidate ${String(state.finalSelected) === String(candidate.id) ? 'selected' : ''}" data-final-candidate="${esc(candidate.id)}"><span>${String.fromCharCode(65 + index)}</span><div><b>${esc(candidate.label)}</b><small>${esc(candidate.structure || '')}</small></div></button>`).join('')}</div><div class="confidence"><p>这次你有多确定？</p><div class="confidence-buttons"><button data-det-confidence="sure" class="${state.confidence === 'sure' ? 'active' : ''}">我确定</button><button data-det-confidence="unsure" class="${state.confidence === 'unsure' ? 'active' : ''}">有点犹豫</button><button data-det-confidence="guess" class="${state.confidence === 'guess' ? 'active' : ''}">我在猜</button></div></div>${hintButton()}<div class="btn-row"><button class="btn ghost" id="prevDetective">← 上一步</button><button class="btn primary" id="submitDetective" ${state.finalSelected == null ? 'disabled' : ''}>提交整条推断链</button></div></section>`;
      root.querySelectorAll('[data-final-candidate]').forEach(button => button.onclick = () => { state.finalSelected = button.dataset.finalCandidate; render(); });
      root.querySelectorAll('[data-det-confidence]').forEach(button => button.onclick = () => { state.confidence = button.dataset.detConfidence; render(); });
      bindHint();
      root.querySelector('#prevDetective').onclick = () => { state.stage = 3; render(); };
      root.querySelector('#submitDetective').onclick = submit;
    }

    function bindHint() {
      const button = root.querySelector('#detectiveHint');
      if (!button) return;
      button.onclick = () => {
        const key = currentHintKey();
        if (!state.hintsByStage[key]) {
          state.hintsByStage[key] = true;
          state.hintsUsed += 1;
        }
        render();
      };
    }

    function submit() {
      if (state.submitted) return;
      state.submitted = true;
      const dbeCorrect = Number(state.dbeValue) === Number(kase.dbe);
      const irCorrect = correctChoice(kase.ir, state.irSelected);
      const nmrCorrect = correctChoice(kase.nmr, state.nmrSelected);
      const elimination = eliminationScore(kase, state.decisions);
      const finalCorrect = String(state.finalSelected) === String(kase.correctCandidate);
      const score = .15 * Number(dbeCorrect) + .20 * Number(irCorrect) + .25 * Number(nmrCorrect) + .25 * elimination + .15 * Number(finalCorrect);
      const summary = {
        score,
        dbeCorrect,
        irCorrect,
        nmrCorrect,
        eliminationScore: elimination,
        finalCorrect,
        hintsUsed: state.hintsUsed,
        hintsByStage: { ...state.hintsByStage },
        confidence: state.confidence,
        answers: {
          dbe: state.dbeValue,
          ir: state.irSelected,
          nmr: state.nmrSelected,
          decisions: { ...state.decisions },
          final: state.finalSelected
        },
        skillEvidence: [
          { skillId: 'structure.dbe', correct: dbeCorrect, partialScore: dbeCorrect ? 1 : 0, errorType: dbeCorrect ? null : 'dbe_error', questionSuffix: 'dbe', hintsUsed: state.hintsByStage.dbe ? 1 : 0 },
          { skillId: kase.ir?.skill || 'structure.ir', correct: irCorrect, partialScore: irCorrect ? 1 : 0, errorType: irCorrect ? null : 'evidence_ignored', questionSuffix: 'ir', hintsUsed: state.hintsByStage.ir ? 1 : 0 },
          { skillId: kase.nmr?.skill || 'structure.nmr_shift', correct: nmrCorrect, partialScore: nmrCorrect ? 1 : 0, errorType: nmrCorrect ? null : 'nmr_fragment_error', questionSuffix: 'nmr', hintsUsed: state.hintsByStage.nmr ? 1 : 0 },
          { skillId: 'structure.constraint_elimination', correct: elimination >= .8 && finalCorrect, partialScore: clamp01(.65 * elimination + .35 * Number(finalCorrect)), errorType: elimination >= .8 && finalCorrect ? null : 'evidence_ignored', questionSuffix: 'constraints', hintsUsed: state.hintsByStage.candidates ? 1 : 0 }
        ]
      };
      settings.onComplete?.(summary);
      renderResult(summary);
    }

    function renderResult(summary) {
      const rows = matrixRows(kase);
      const correct = (kase.candidates || []).find(c => String(c.id) === String(kase.correctCandidate));
      root.innerHTML = `${header()}<section class="detective-result"><div class="result-score-ring"><b>${Math.round(summary.score * 100)}</b><span>推断链得分</span></div><div><div class="stage-kicker">结果不是只有“猜中/没猜中”</div><h3>${summary.finalCorrect ? '最终结构找对了。' : '最终结构没收住，但前面正确的证据不会被抹掉。'}</h3><div class="subscore-grid"><div><span>DBE</span><b>${summary.dbeCorrect ? '✓' : '×'}</b></div><div><span>IR</span><b>${summary.irCorrect ? '✓' : '×'}</b></div><div><span>NMR</span><b>${summary.nmrCorrect ? '✓' : '×'}</b></div><div><span>候选排除</span><b>${Math.round(summary.eliminationScore * 100)}%</b></div><div><span>最终结构</span><b>${summary.finalCorrect ? '✓' : '×'}</b></div></div></div></section><section class="panel-inset"><div class="stage-kicker">证据表 · 现在揭晓每个候选为什么留/为什么死</div><div class="constraint-table-wrap"><table class="constraint-table"><thead><tr><th>证据</th>${(kase.candidates || []).map(c => `<th>${esc(c.label)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr><th>${esc(row.label)}</th>${(kase.candidates || []).map(c => `<td>${statusMark(c.constraints?.[row.id])}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="candidate-reasons">${(kase.candidates || []).map(c => `<article class="candidate-reason ${String(c.id) === String(kase.correctCandidate) ? 'winner' : ''}"><b>${esc(c.label)}${String(c.id) === String(kase.correctCandidate) ? ' · 最终保留' : ' · 被排除'}</b><p>${esc(c.eliminationReason || '')}</p></article>`).join('')}</div></section><section class="panel-inset"><div class="stage-kicker">收口</div><h3>正确结构：${esc(correct?.label || kase.correctCandidate)}</h3><p class="stage-copy">${esc(kase.explanation || '')}</p><div class="btn-row"><button class="btn primary" id="detectiveBack">${esc(settings.backLabel || '回专项训练')}</button>${settings.nextCaseId ? '<button class="btn soft" id="detectiveNext">下一案</button>' : ''}</div></section>`;
      root.querySelector('#detectiveBack').onclick = () => settings.onBack?.();
      root.querySelector('#detectiveNext')?.addEventListener('click', () => settings.onNext?.(settings.nextCaseId));
    }

    function render() {
      emitProgress();
      if (state.stage === 0) renderDBE();
      else if (state.stage === 1) renderSpectrumStage('ir');
      else if (state.stage === 2) renderSpectrumStage('nmr');
      else if (state.stage === 3) renderCandidates();
      else renderFinalChoice();
    }

    render();
    return { state };
  }

  NS.Detective = {
    mount,
    normalizeProgress,
    irSvg,
    nmrSvg,
    eliminationScore,
    expectedCandidateDecision
  };
})();
