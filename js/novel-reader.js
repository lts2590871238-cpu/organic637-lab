(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};

  function esc(value) {
    return String(value ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }

  function story() { return NS.V16_STORY || { scenes:{}, characters:{} }; }
  function novel() { return NS.V16_NOVEL || { sections:{} }; }
  function assets() { return NS.V16_ASSETS || { backgrounds:{}, evidence:{}, characters:{}, keyart:{} }; }

  function section(sceneId) { return novel().sections?.[sceneId] || null; }
  function scene(sceneId) { return story().scenes?.[sceneId] || null; }

  function pickVisual(sceneId) {
    const sc = scene(sceneId) || {};
    const panel = (sc.panels || []).find(row => row.evidence || row.background || (row.characters || []).length) || (sc.panels || [])[0] || {};
    const evidence = panel.evidence ? assets().evidence?.[panel.evidence]?.path : '';
    const background = panel.background ? assets().backgrounds?.[panel.background]?.path : '';
    const characterId = (panel.characters || [])[0]?.id;
    const portrait = characterId ? assets().characters?.[characterId]?.portrait : '';
    return {
      evidence: evidence || '',
      background: background || '',
      portrait: portrait || '',
      characterName: characterId ? (story().characters?.[characterId]?.name || '') : ''
    };
  }

  function visualMarkup(sceneId) {
    const visual = pickVisual(sceneId);
    const main = visual.evidence || visual.background || assets().keyart?.castLab?.path || '';
    if (!main && !visual.portrait) return '';
    return `<figure class="v16-novel-visual ${visual.evidence ? 'is-evidence' : 'is-scene'}">${main ? `<img data-v16-novel-img class="v16-novel-scene-img" src="${esc(main)}" alt="${visual.evidence ? '案件证物插图' : '案件场景插图'}">` : ''}${visual.portrait ? `<img data-v16-novel-img class="v16-novel-portrait" src="${esc(visual.portrait)}" alt="${esc(visual.characterName || '人物')}立绘">` : ''}<figcaption>插图只帮助你进入现场；事实以正文、证物和后续化学验证为准。</figcaption></figure>`;
  }

  function render(sceneId, { day, learningHook = '', state = null } = {}) {
    const data = section(sceneId);
    if (!data) {
      return `<section class="panel v16-novel-fallback"><div class="kicker">LAB-20 · DAY ${esc(day || '')}</div><h1>这一段故事暂时无法显示</h1><p>叙事资源没有加载成功，但学习与案件进度没有丢失。你仍然可以继续主线。</p><div class="v16-novel-actions"><button class="link-btn" data-v16-novel-exit>暂时退出</button><button class="btn primary" data-v16-novel-continue>继续主线</button></div></section>`;
    }
    const paragraphs = (data.paragraphs || []).map(text => `<p>${esc(text)}</p>`).join('');
    const question = data.summaryQuestion || data.closingQuestion || '';
    const bridge = learningHook || data.learningBridge || '';
    const previously = data.previously ? `<aside class="v16-novel-previously"><span>前情提要</span><p>${esc(data.previously)}</p></aside>` : '';
    const chapter = novel().getChapter?.(sceneId) || null;
    const totalChapters = novel().chapterCount || novel().chapters?.length || '';
    const chapterMeta = chapter ? `第 ${chapter.number} 章 / ${totalChapters}` : `LAB-20 · DAY ${esc(day || data.day || '')}`;
    return `<article class="v16-novel-reader" data-scene="${esc(sceneId)}"><header class="v16-novel-head"><div class="v16-novel-chapterbar"><div class="kicker">${esc(chapterMeta)} · DAY ${esc(day || data.day || '')}</div><button class="tiny-link" data-v16-novel-index>小说目录</button></div><h1>${esc(data.title || '案件记录')}</h1><p>${esc(data.subtitle || '先把这一段发生了什么读清楚，再决定下一步。')}</p></header>${previously}${visualMarkup(sceneId)}<div class="v16-novel-copy">${paragraphs}</div>${question ? `<aside class="v16-novel-question"><span>这一段真正留下的问题</span><b>${esc(question)}</b></aside>` : ''}${bridge ? `<aside class="v16-novel-bridge"><span>要继续查下去，你还缺一把化学钥匙</span><b>${esc(bridge)}</b><p>先把它说成人话，再学会正式名字；学会以后，马上回到证据里验证。</p></aside>` : ''}<div class="v16-novel-actions"><button class="link-btn" data-v16-novel-exit>暂时退出</button><button class="btn primary" data-v16-novel-continue>${bridge ? '带着这个问题去拆开它 →' : '继续调查 →'}</button></div></article>`;
  }

  function bindImages(root) {
    root.querySelectorAll?.('[data-v16-novel-img]').forEach(img => {
      const fail = () => {
        img.classList.add('is-missing');
        img.setAttribute('aria-hidden', 'true');
      };
      img.addEventListener('error', fail, { once:true });
      if (img.complete && img.naturalWidth === 0) fail();
    });
  }

  function chapterIndexMarkup(sceneId, state) {
    const unlocked = novel().getUnlockedChapters?.(state, { includeSceneId:sceneId }) || [];
    const current = novel().getChapter?.(sceneId);
    const rows = unlocked.map(chapter => `<li class="${chapter.sceneId === sceneId ? 'is-current' : ''}"><span>第 ${chapter.number} 章</span><b>${esc(chapter.title)}</b><small>DAY ${chapter.day}${chapter.sceneId === sceneId ? ' · 正在阅读' : ' · 已解锁'}</small></li>`).join('');
    return `<div class="v16-novel-index-modal" data-v16-novel-index-modal><section class="v16-novel-index-card"><button class="v16-novel-index-close" data-v16-novel-index-close aria-label="关闭小说目录">×</button><div class="kicker">LAB-20 · 零号样品</div><h2>小说目录</h2><p>这是一部 54 章的实验室悬疑。目录只显示你已经读到的部分，后面的章名不会提前剧透。</p><div class="v16-novel-index-progress">已读到第 ${current?.number || unlocked.length || 1} 章 / 54</div><ol>${rows}</ol></section></div>`;
  }

  function openChapterIndex(root, sceneId, state) {
    root.querySelector?.('[data-v16-novel-index-modal]')?.remove?.();
    const wrap = document.createElement('div');
    wrap.innerHTML = chapterIndexMarkup(sceneId, state);
    const modal = wrap.firstElementChild;
    if (!modal) return;
    root.appendChild(modal);
    const close = () => modal.remove();
    modal.querySelector?.('[data-v16-novel-index-close]')?.addEventListener('click', close);
    modal.addEventListener('click', event => { if (event.target === modal) close(); });
  }

  function renderInto(root, sceneId, { state, day, learningHook = '', onComplete } = {}) {
    root.innerHTML = render(sceneId, { day, learningHook, state });
    bindImages(root);
    root.querySelector?.('[data-v16-novel-index]')?.addEventListener('click', () => openChapterIndex(root, sceneId, state));
    root.querySelector?.('[data-v16-novel-exit]')?.addEventListener('click', () => { location.hash = '#welcome'; });
    root.querySelector?.('[data-v16-novel-continue]')?.addEventListener('click', () => {
      const sc = scene(sceneId);
      if (sc && NS.V16Narrative && state) NS.V16Narrative.completeScene(state, sceneId, day || sc.day || 1);
      if (typeof onComplete === 'function') onComplete();
    });
    return root;
  }

  NS.V16NovelReader = { render, renderInto, pickVisual, chapterIndexMarkup };
})();
