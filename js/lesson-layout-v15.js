(() => {
  'use strict';

  const REAL_VISUAL = '.lesson-hero-chem, .story-diagram svg, .term-visual svg, .guided-question-visual svg, .mini-term-visual svg, .chem3d-card, canvas';

  function addGlobalStyle() {
    if (document.getElementById('visual-consistency-v15-style')) return;
    const style = document.createElement('style');
    style.id = 'visual-consistency-v15-style';
    style.textContent = `
      .lesson-card .lesson-hero-chem,
      .lesson-card .chem-storyboard,
      .lesson-card .first-use-terms,
      .lesson-card .why-chain,
      .lesson-card .look-say,
      .question-shell .guided-question,
      .question-shell .question-term-help { width:100%; min-width:0; }
      .lesson-card .story-step-body,
      .lesson-card .term-card,
      .question-shell .guided-question-step > div,
      .question-shell .question-term-mini { min-width:0; }
      .lesson-card .lesson-hero-svg,
      .lesson-card .story-diagram,
      .lesson-card .term-visual,
      .question-shell .guided-question-visual,
      .question-shell .mini-term-visual { display:block; width:100%; margin:14px 0 4px; overflow:auto; }
      .lesson-card .lesson-hero-svg svg,
      .lesson-card .story-diagram svg,
      .lesson-card .term-visual svg,
      .question-shell .guided-question-visual svg,
      .question-shell .mini-term-visual svg { display:block; width:min(100%,720px); max-width:100%; height:auto; margin:0 auto; }
      .lesson-card .look-say { margin-top:14px; }
      .lesson-card .concept-visual[data-v15-summary="1"]::before { content:'结构变化摘要'; display:block; font-size:12px; color:#9b7770; margin-bottom:8px; }
      @media (max-width:700px) {
        .lesson-card .lesson-hero-chem,
        .lesson-card .chem-storyboard,
        .lesson-card .first-use-terms,
        .lesson-card .why-chain,
        .lesson-card .look-say,
        .question-shell .guided-question,
        .question-shell .question-term-help { padding-left:12px !important; padding-right:12px !important; }
        .lesson-card .story-diagram,
        .lesson-card .term-visual,
        .question-shell .guided-question-visual,
        .question-shell .mini-term-visual { margin-top:12px; }
        .lesson-card .lesson-hero-svg svg,
        .lesson-card .story-diagram svg,
        .lesson-card .term-visual svg,
        .question-shell .guided-question-visual svg,
        .question-shell .mini-term-visual svg { width:100%; max-height:none; }
        .lesson-card .story-controls,
        .lesson-card .why-chain-controls,
        .question-shell .guided-question-controls { display:grid !important; grid-template-columns:1fr !important; gap:10px !important; }
        .lesson-card .story-controls button,
        .lesson-card .why-chain-controls button,
        .question-shell .guided-question-controls button { width:100%; min-height:46px; }
        .formula-line,.story-formula { overflow-x:auto; overflow-y:hidden; white-space:normal; overflow-wrap:anywhere; }
      }
    `;
    document.head.appendChild(style);
  }

  function nearestRealVisual(card) {
    const nodes = [...card.querySelectorAll(REAL_VISUAL)];
    return nodes.find(node => node.offsetParent !== null) || nodes[0] || null;
  }

  function polishLesson(card) {
    const real = nearestRealVisual(card);
    const concept = card.querySelector('.concept-visual');
    if (concept) {
      if (real) concept.hidden = true;
      else concept.dataset.v15Summary = '1';
    }

    card.querySelectorAll('.look-say').forEach(look => {
      const visual = nearestRealVisual(card);
      if (!visual) {
        look.remove();
        return;
      }
      const label = look.querySelector('b');
      const intro = look.querySelector('p');
      if (label) label.textContent = '👀 对着上面这张图说一句';
      if (intro) intro.textContent = '先指出图里真正变化的位置，再说电子或键发生了什么。说不出时就回到上一帧，不需要硬背名词。';

      // 视觉块可能是SVG本身；把“看图问题”放在完整视觉容器后面。
      const host = visual.closest('.lesson-hero-chem, .story-step, .term-visual, .chem3d-card') || visual;
      if (host.parentElement && look.previousElementSibling !== host) host.insertAdjacentElement('afterend', look);
    });
  }

  function polishQuestion(card) {
    // 题目里的图永远放在对应说明文字后面；这里仅保证不会横向挤压。
    card.querySelectorAll('.guided-question-step, .question-term-mini.full').forEach(block => {
      block.style.gridTemplateColumns = '1fr';
    });
  }

  function polishPage() {
    document.querySelectorAll('.lesson-card').forEach(polishLesson);
    document.querySelectorAll('.question-shell').forEach(polishQuestion);
  }

  addGlobalStyle();
  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      polishPage();
    });
  };
  new MutationObserver(schedule).observe(document.documentElement, { childList:true, subtree:true });
  window.addEventListener('hashchange', schedule);
  window.addEventListener('DOMContentLoaded', schedule);
  schedule();
})();
