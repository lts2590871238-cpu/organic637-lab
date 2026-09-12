(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

  function story() { return NS.V16_STORY || { scenes: {}, characters: {}, timeline: {} }; }
  function assets() { return NS.V16_ASSETS || { characters: {}, backgrounds: {}, evidence: {} }; }
  function scene(sceneId) { return story().scenes?.[sceneId] || null; }

  function speakerName(id) {
    if (id === 'player') return '你';
    if (id === 'narrator') return '旁白';
    return story().characters?.[id]?.name || id || '';
  }

  function characterMarkup(character) {
    const meta = assets().characters?.[character.id] || {};
    const name = story().characters?.[character.id]?.name || meta.name || character.id;
    const pose = character.pose || 'neutral';
    const src = meta.portrait || (meta.portraitBase ? `${meta.portraitBase}-${pose}.webp` : '');
    const initial = name ? name.slice(-1) : '·';
    return `<div class="v16-character v16-character-${esc(meta.palette || 'neutral')}">${src ? `<img data-v16-img src="${esc(src)}" alt="${esc(name)} · ${esc(pose)}">` : ''}<span class="v16-character-fallback" aria-hidden="true">${esc(initial)}</span><b>${esc(name)}</b></div>`;
  }

  function evidenceMarkup(evidenceId) {
    if (!evidenceId) return '';
    const meta = assets().evidence?.[evidenceId] || {};
    const src = meta.path || '';
    const label = evidenceId === 'recordVersions' ? '实验记录版本' : evidenceId === 'zeroSampleBox' ? 'L20-0 储存盒' : evidenceId === 'zeroSampleStructure' ? 'L20-0 结构卡' : evidenceId;
    return `<button type="button" class="v16-evidence" data-v16-evidence-zoom data-v16-evidence-label="${esc(label)}" aria-label="放大证物：${esc(label)}">${src ? `<img data-v16-img src="${esc(src)}" alt="${esc(label)}">` : ''}<span class="v16-evidence-fallback">证物 · ${esc(label)}</span></button>`;
  }

  function panelMarkup(panel, index) {
    const bg = assets().backgrounds?.[panel.background] || {};
    const time = panel.timeKey ? story().timeline?.[panel.timeKey] : '';
    const dialogue = (panel.dialogue || []).map(row => `<div class="v16-dialogue"><b>${esc(speakerName(row.speaker))}</b><p>${esc(row.text)}</p></div>`).join('');
    const characters = (panel.characters || []).map(characterMarkup).join('');
    const style = bg.path ? ` style="--v16-panel-bg:url('${esc(bg.path)}')"` : '';
    return `<article class="v16-comic-panel" data-panel="${index + 1}"${style}>${time ? `<div class="v16-time">${esc(time)}</div>` : ''}<div class="v16-panel-visual">${evidenceMarkup(panel.evidence)}${characters}</div>${panel.caption ? `<p class="v16-caption">${esc(panel.caption)}</p>` : ''}${dialogue}</article>`;
  }

  function collectSceneAssets(sceneId) {
    const item = scene(sceneId);
    if (!item) return [];
    const urls = [];
    for (const panel of item.panels || []) {
      const bg = assets().backgrounds?.[panel.background];
      if (bg?.path) urls.push(bg.path);
      const evidence = assets().evidence?.[panel.evidence];
      if (evidence?.path) urls.push(evidence.path);
      for (const character of panel.characters || []) {
        const meta = assets().characters?.[character.id];
        if (!meta) continue;
        if (meta.portrait) urls.push(meta.portrait);
        else if (meta.portraitBase) urls.push(`${meta.portraitBase}-${character.pose || 'neutral'}.webp`);
      }
    }
    if (item.layout === 'cast-intro') {
      const keyart = assets().keyart?.castLab?.path;
      if (keyart) urls.push(keyart);
      for (const id of item.cast || []) {
        const meta = assets().characters?.[id];
        if (meta?.portrait) urls.push(meta.portrait);
      }
    }
    return [...new Set(urls.filter(Boolean))];
  }

  function preloadScenes(sceneIds) {
    const ids = [...new Set((sceneIds || []).filter(id => scene(id)))].slice(0, 2);
    const urls = [...new Set(ids.flatMap(collectSceneAssets))];
    if (typeof Image !== 'undefined') {
      for (const url of urls) {
        const image = new Image();
        image.decoding = 'async';
        image.src = url;
      }
    }
    return { sceneIds: ids, assets: urls };
  }

  function renderCastIntro(item, day) {
    const cards = (item.cast || []).map(id => {
      const person = story().characters?.[id] || {};
      const meta = assets().characters?.[id] || {};
      const src = meta.portrait || (meta.portraitBase ? `${meta.portraitBase}-neutral.webp` : '');
      const traits = (person.traits || []).slice(0, 3).join(' · ');
      return `<article class="v16-cast-card v16-character-${esc(meta.palette || 'neutral')}">${src ? `<img data-v16-img src="${esc(src)}" alt="${esc(person.name || id)} 立绘">` : ''}<div class="v16-cast-fallback">${esc((person.name || id).slice(-1))}</div><div class="v16-cast-copy"><b>${esc(person.name || id)}</b><span>${esc(person.role || '')}</span><p>${esc(traits)}</p></div></article>`;
    }).join('');
    const keyart = assets().keyart?.castLab?.path || '';
    return `<section class="v16-comic v16-cast-intro" data-scene="${esc(item.id)}"><header class="v16-comic-head"><div><div class="kicker">LAB-20 · 人物档案</div><h1>${esc(item.title || '调查组成员')}</h1></div><span>先认识人，再进入那一晚</span></header>${keyart ? `<figure class="v16-cast-keyart"><img data-v16-img src="${esc(keyart)}" alt="LAB-20 项目组夜间实验室合照"><figcaption>同一间实验室，五个不同视角。今晚开始，任何一句话都要和证据对得上。</figcaption></figure>` : ''}<div class="v16-cast-prologue">${esc(item.intro || '')}</div><div class="v16-cast-grid">${cards}</div><div class="v16-cast-outro">${esc(item.outro || '')}</div><div class="v16-comic-actions"><button class="link-btn" data-v16-comic-exit>暂时退出</button><button class="btn primary" data-v16-comic-continue>进入 00:17 的实验室</button></div></section>`;
  }

  function render(sceneId, { day, learningHook = '' } = {}) {
    const item = scene(sceneId);
    if (!item) return `<section class="panel v16-comic-fallback"><div class="kicker">LAB-20 · CASE ${esc(day || '')}</div><h1>案件片段暂时无法显示</h1><p>视觉资源没有加载成功，但课程和进度没有丢失。可以直接继续主线；稍后补回图片时不需要重做这一段。</p><div class="v16-comic-actions"><button class="link-btn" data-v16-comic-exit>暂时退出</button><button class="btn primary" data-v16-comic-continue>跳过视觉，继续学习</button></div></section>`;
    if (item.layout === 'cast-intro') return renderCastIntro(item, day);
    const hook = learningHook ? `<aside class="v16-story-hook" ${(item.panels || []).length > 1 ? 'hidden' : ''}><span>当前卡住我们的，不是信息不够。</span><b>要继续查下去，你现在还缺一把化学钥匙。</b><p>${esc(learningHook)}</p></aside>` : '';
    return `<section class="v16-comic v16-story-reader" data-scene="${esc(sceneId)}"><header class="v16-comic-head"><div><div class="kicker">LAB-20 · DAY ${esc(day || item.day || '')}</div><h1>${esc(item.title || '案件片段')}</h1></div><span>证据优先，不先猜人</span></header><div class="v16-comic-grid v16-story-pages">${(item.panels || []).map((panel,index) => panelMarkup(panel,index).replace('class="v16-comic-panel"', `class="v16-comic-panel${index === 0 ? ' is-active' : ''}"`)).join('')}</div>${hook}<div class="v16-story-pagebar"><button class="btn ghost" type="button" data-v16-page-prev disabled>← 上一页</button><span data-v16-page-count>1 / ${Math.max(1,(item.panels || []).length)}</span><button class="btn soft" type="button" data-v16-page-next>${(item.panels || []).length > 1 ? '下一页 →' : '读完这一幕'}</button></div><div class="v16-comic-actions"><button class="link-btn" data-v16-comic-exit>暂时退出</button><button class="btn primary" data-v16-comic-continue ${(item.panels || []).length > 1 ? 'hidden' : ''}>${learningHook ? '先把这一步学会 →' : '继续调查'}</button></div></section>`;
  }

  function bindImageFallbacks(root) {
    root.querySelectorAll?.('[data-v16-img]').forEach(img => {
      const fail = () => img.classList.add('is-missing');
      img.addEventListener('error', fail, { once: true });
      if (img.complete && img.naturalWidth === 0) fail();
    });
  }

  function bindEvidenceZoom(root) {
    root.querySelectorAll?.('[data-v16-evidence-zoom]').forEach(button => {
      button.addEventListener('click', () => {
        const doc = root.ownerDocument || (typeof document !== 'undefined' ? document : null);
        if (!doc?.body) return;
        doc.querySelector?.('.v16-evidence-lightbox')?.remove();
        const sourceImage = button.querySelector?.('img[data-v16-img]:not(.is-missing)');
        const label = button.getAttribute('data-v16-evidence-label') || '证物';
        const overlay = doc.createElement('div');
        overlay.className = 'v16-evidence-lightbox';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', `证物放大：${label}`);
        overlay.innerHTML = `<button type="button" class="v16-evidence-lightbox-close" aria-label="关闭证物放大">×</button><div class="v16-evidence-lightbox-card">${sourceImage ? `<img src="${esc(sourceImage.getAttribute('src') || '')}" alt="${esc(label)}">` : ''}<b>${esc(label)}</b>${sourceImage ? '' : '<p>图片暂时不可用，文字证据仍然有效。</p>'}</div>`;
        const onKey = event => { if (event.key === 'Escape') close(); };
        const close = () => {
          doc.removeEventListener('keydown', onKey);
          overlay.remove();
        };
        overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
        overlay.querySelector('.v16-evidence-lightbox-close')?.addEventListener('click', close);
        doc.addEventListener('keydown', onKey);
        doc.body.appendChild(overlay);
        overlay.querySelector('.v16-evidence-lightbox-close')?.focus();
      });
    });
  }

  function bindStoryPager(root) {
    const pages = [...(root.querySelectorAll?.('.v16-story-pages .v16-comic-panel') || [])];
    if (!pages.length) return;
    let index = 0;
    const prev = root.querySelector?.('[data-v16-page-prev]');
    const next = root.querySelector?.('[data-v16-page-next]');
    const count = root.querySelector?.('[data-v16-page-count]');
    const finish = root.querySelector?.('[data-v16-comic-continue]');
    const hook = root.querySelector?.('.v16-story-hook');
    const paint = () => {
      pages.forEach((page,i) => page.classList.toggle('is-active', i === index));
      if (prev) prev.disabled = index === 0;
      if (count) count.textContent = `${index + 1} / ${pages.length}`;
      if (next) {
        next.textContent = index < pages.length - 1 ? '下一页 →' : '读完这一幕';
        next.hidden = index === pages.length - 1;
      }
      const atEnd = index >= pages.length - 1;
      if (finish) finish.hidden = !atEnd;
      if (hook) hook.hidden = !atEnd;
      pages[index]?.scrollIntoView?.({ behavior:'smooth', block:'start' });
    };
    prev?.addEventListener('click', () => { if (index > 0) { index -= 1; paint(); } });
    next?.addEventListener('click', () => { if (index < pages.length - 1) { index += 1; paint(); } });
    paint();
  }

  function renderInto(root, sceneId, { state, day, onComplete, preloadSceneIds = [], learningHook = '' } = {}) {
    const item = scene(sceneId);
    preloadScenes([sceneId, ...preloadSceneIds]);
    root.innerHTML = render(sceneId, { day, learningHook });
    bindImageFallbacks(root);
    bindEvidenceZoom(root);
    bindStoryPager(root);
    root.querySelector?.('[data-v16-comic-exit]')?.addEventListener('click', () => { location.hash = '#welcome'; });
    const button = root.querySelector?.('[data-v16-comic-continue]');
    if (button) button.addEventListener('click', () => {
      if (item && NS.V16Narrative && state) NS.V16Narrative.completeScene(state, sceneId, day || item.day || 1);
      if (typeof onComplete === 'function') onComplete();
    });
    return root;
  }

  NS.V16Comic = { render, renderInto, collectSceneAssets, preloadScenes };
})();
