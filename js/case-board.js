(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};
  const MARKS = new Set(['focus', 'uncertain', 'temporarily-cleared']);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  function source() { return NS.V16_STORY || { characters: {}, testimony: {}, routeMilestones: {} }; }

  function storyState(state) {
    if (NS.V16Narrative?.ensureStoryState) return NS.V16Narrative.ensureStoryState(state);
    state.v16 = state.v16 && typeof state.v16 === 'object' ? state.v16 : {};
    state.v16.story = state.v16.story && typeof state.v16.story === 'object' ? state.v16.story : {};
    const row = state.v16.story;
    row.unlockedScenes = Array.isArray(row.unlockedScenes) ? row.unlockedScenes : [];
    row.confirmedFacts = Array.isArray(row.confirmedFacts) ? row.confirmedFacts : [];
    row.contradictions = Array.isArray(row.contradictions) ? row.contradictions : [];
    row.personalMarks = row.personalMarks && typeof row.personalMarks === 'object' ? row.personalMarks : {};
    row.routeRecovery = Math.max(0, Number(row.routeRecovery) || 0);
    return row;
  }

  function getModel(state) {
    const story = storyState(state);
    const currentDay = Math.max(1, Number(state?.currentDay) || 1);
    const facts = NS.V16Narrative?.getUnlockedFacts ? NS.V16Narrative.getUnlockedFacts(state) : [];
    const contradictions = NS.V16Narrative?.getUnlockedContradictions ? NS.V16Narrative.getUnlockedContradictions(state) : [];
    const testimony = Object.values(source().testimony || {}).filter(item => {
      if (item.minDay && currentDay < Number(item.minDay)) return false;
      if (item.requiresScene && !story.unlockedScenes.includes(item.requiresScene)) return false;
      if (item.requiresFact && !story.confirmedFacts.includes(item.requiresFact)) return false;
      return true;
    });
    const milestones = Object.values(source().routeMilestones || {}).filter(item => {
      if (item.minDay && currentDay < Number(item.minDay)) return false;
      if (item.requiresFact && !story.confirmedFacts.includes(item.requiresFact)) return false;
      if (item.requiresScene && !story.unlockedScenes.includes(item.requiresScene)) return false;
      return true;
    });
    const people = Object.values(source().characters || {}).map(({ id, name, role, palette }) => ({ id, name, role, palette }));
    return {
      facts,
      contradictions,
      testimony,
      route: { recovery: Math.max(0, Math.min(100, Number(story.routeRecovery) || 0)), milestones },
      people,
      personalMarks: { ...(story.personalMarks || {}) }
    };
  }

  function setPersonalMark(state, targetId, mark) {
    const story = storyState(state);
    if (mark == null || mark === '') delete story.personalMarks[targetId];
    else {
      if (!MARKS.has(mark)) throw new Error(`Invalid case-board mark: ${mark}`);
      story.personalMarks[targetId] = mark;
    }
    return state;
  }

  function list(rows, emptyText, formatter) {
    if (!rows.length) return `<div class="case-board-empty">${esc(emptyText)}</div>`;
    return `<ul>${rows.map(row => `<li>${formatter(row)}</li>`).join('')}</ul>`;
  }

  function render(model) {
    const markNames = { focus: '关注', uncertain: '不确定', 'temporarily-cleared': '暂时排除' };
    return `<section class="case-board-shell"><header class="case-board-head"><div><div class="kicker">LAB-20 · 调查笔记</div><h1>案件板</h1><p>这里只记录已经出现的证据。你的关注标记只是个人笔记，不会改变案件真相。</p></div><button class="btn ghost" id="caseBoardBack">回到首页总览</button></header><div class="case-board-grid"><article class="panel case-board-card"><span>01</span><h2>已确认事实</h2>${list(model.facts, '还没有可以确认的新事实。', row => `<b>${esc(row.truth)}</b>`)}</article><article class="panel case-board-card"><span>02</span><h2>待解释矛盾</h2>${list(model.contradictions, '当前没有公开矛盾。', row => esc(row.text))}</article><article class="panel case-board-card"><span>03</span><h2>证词 / 记录口述</h2>${list(model.testimony, '还没有可放进案件板的证词。', row => esc(row.text))}</article><article class="panel case-board-card route-card"><span>04</span><h2>L-20 路线恢复</h2><div class="case-route-meter"><i style="width:${model.route.recovery}%"></i></div><b>${model.route.recovery}%</b>${list(model.route.milestones, '路线还没有恢复到可以确认的节点。', row => esc(row.text))}</article></div><section class="panel case-people"><div class="section-title"><div><h2>人物关注标记</h2><p>没有“嫌疑分数”。你只是在整理自己的注意力。</p></div></div><div class="case-people-grid">${model.people.map(person => { const current = model.personalMarks[person.id] || ''; return `<article class="case-person"><div class="case-person-dot ${esc(person.palette || '')}">${esc(person.name.slice(-1))}</div><div><b>${esc(person.name)}</b><small>${esc(person.role)}</small></div><div class="case-mark-row">${Object.entries(markNames).map(([value,label]) => `<button class="tiny-link ${current===value?'active':''}" data-case-target="${esc(person.id)}" data-case-mark="${esc(value)}">${esc(label)}</button>`).join('')}${current ? `<button class="tiny-link" data-case-target="${esc(person.id)}" data-case-mark="">清除</button>` : ''}</div></article>`; }).join('')}</div></section></section>`;
  }

  NS.V16CaseBoard = { getModel, setPersonalMark, render, allowedMarks: [...MARKS] };
})();
