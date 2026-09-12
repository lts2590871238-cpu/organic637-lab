(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};
  const Data = window.Organic637Data = window.Organic637Data || {};
  const lessons = () => Data.THREED_LESSONS || {};

  function getLesson(ref) { return lessons()[ref] || null; }

  function ensureProgress(state, ref) {
    state.threeDProgress = state.threeDProgress && typeof state.threeDProgress === 'object' ? state.threeDProgress : {};
    const row = state.threeDProgress[ref] && typeof state.threeDProgress[ref] === 'object' ? state.threeDProgress[ref] : {};
    row.completed = Boolean(row.completed);
    row.actions = row.actions && typeof row.actions === 'object' ? row.actions : {};
    row.rotation = row.rotation && typeof row.rotation === 'object' ? row.rotation : { x:-0.25, y:0.45 };
    row.dihedral = Number.isFinite(Number(row.dihedral)) ? Number(row.dihedral) : 120;
    row.completionMode = row.completionMode || null;
    state.threeDProgress[ref] = row;
    return row;
  }

  function isCompleted(state, ref) { return Boolean(state?.threeDProgress?.[ref]?.completed); }

  function maybeComplete(state, ref) {
    const lesson = getLesson(ref);
    if (!lesson) return false;
    const row = ensureProgress(state, ref);
    const required = Array.isArray(lesson.requiredActions) ? lesson.requiredActions : [];
    if (required.length && required.every(action => row.actions[action])) {
      row.completed = true;
      row.completedAt ||= Date.now();
      row.completionMode ||= '3d';
    }
    return row.completed;
  }

  function recordAction(state, ref, action, value = true) {
    const row = ensureProgress(state, ref);
    row.actions[action] = value === undefined ? true : value;
    row.lastActionAt = Date.now();
    maybeComplete(state, ref);
    return row;
  }

  function completeFallback(state, ref, correct) {
    const row = ensureProgress(state, ref);
    row.fallbackAttempted = true;
    row.fallbackCorrect = Boolean(correct);
    if (!correct) return false;
    const lesson = getLesson(ref);
    (lesson?.requiredActions || []).forEach(action => { row.actions[action] = true; });
    row.completed = true;
    row.completedAt = Date.now();
    row.completionMode = '2d-fallback';
    return true;
  }

  function canAdvance(state, step) {
    if (!step || step.type !== '3d') return true;
    if (step.mode === 'on_demand') return true;
    return isCompleted(state, step.ref);
  }

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  function rotatePoint(point, rx, ry) {
    let [x,y,z] = point;
    const cy=Math.cos(ry), sy=Math.sin(ry);
    const x1=x*cy+z*sy, z1=-x*sy+z*cy;
    const cx=Math.cos(rx), sx=Math.sin(rx);
    const y1=y*cx-z1*sx, z2=y*sx+z1*cx;
    return [x1,y1,z2];
  }

  function drawModel(canvas, lesson, progress) {
    if (!canvas || typeof canvas.getContext !== 'function') return false;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    const dpr = Math.max(1, Number(window.devicePixelRatio) || 1);
    const rect = canvas.getBoundingClientRect?.() || { width:640, height:360 };
    const width = Math.max(320, Math.round(rect.width || 640));
    const height = Math.max(260, Math.round(rect.height || 360));
    if (canvas.width !== width*dpr || canvas.height !== height*dpr) { canvas.width=width*dpr; canvas.height=height*dpr; }
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,width,height);
    ctx.fillStyle='#fffdf8'; ctx.fillRect(0,0,width,height);
    const rx=Number(progress.rotation?.x)||0, ry=Number(progress.rotation?.y)||0;
    const atoms=(lesson.model?.atoms||[]).map(atom=>({ ...atom, p:rotatePoint(atom.position||[0,0,0],rx,ry) }));
    const byId=Object.fromEntries(atoms.map(atom=>[atom.id,atom]));
    const scale=Math.min(width,height)*0.18;
    const project=p=>({x:width/2+p[0]*scale*(1+p[2]*0.035),y:height/2-p[1]*scale*(1+p[2]*0.035),z:p[2]});
    const pts=Object.fromEntries(atoms.map(atom=>[atom.id,project(atom.p)]));
    ctx.lineCap='round';
    (lesson.model?.bonds||[]).forEach(([a,b])=>{ const pa=pts[a],pb=pts[b]; if(!pa||!pb)return; ctx.strokeStyle='#596274';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(pa.x,pa.y);ctx.lineTo(pb.x,pb.y);ctx.stroke(); });
    atoms.sort((a,b)=>a.p[2]-b.p[2]).forEach(atom=>{ const p=pts[atom.id]; const r=atom.element==='H'?12:atom.element==='Br'?22:18; ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fillStyle=atom.element==='Br'?'#b77252':atom.element==='H'?'#f1eee8':atom.element==='N'?'#7a8fb8':'#879178';ctx.fill();ctx.strokeStyle='#47515f';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#26313d';ctx.font='600 13px system-ui,sans-serif';ctx.textAlign='center';ctx.fillText(atom.label||atom.id,p.x,p.y-r-7); });
    return true;
  }

  function bridgeMarkup(lesson, prefix) {
    const bridge=lesson.bridge2D || {};
    return `<section class="chem3d-bridge"><h3>回到二维考试图</h3><p>${esc(bridge.prompt||'')}</p><div class="chem3d-bridge-options">${(bridge.options||[]).map(opt=>`<button type="button" data-3d-bridge="${esc(opt.id)}">${esc(opt.label)}</button>`).join('')}</div><div class="chem3d-bridge-feedback" id="${prefix}-bridge-feedback"></div></section>`;
  }

  function fallbackMarkup(lesson, prefix) {
    return `<section class="chem3d-fallback" id="${prefix}-fallback" hidden><div class="kicker">2D FALLBACK</div><h3>${esc(lesson.fallback?.title||'二维备用练习')}</h3><p>${esc(lesson.fallback?.body||'')}</p>${bridgeMarkup(lesson,`${prefix}-fallback`)}</section>`;
  }


  function sampleModel(sample, showLabels=true) {
    const atoms = [{ id:'Cstar', label:showLabels?'C*':'', element:'C', position:[0,0,0] }]
      .concat((sample.substituents || []).map(item => ({
        id:item.id,
        label:showLabels ? item.label : '',
        element:item.id === 'OH' ? 'O' : item.id === 'H' ? 'H' : 'C',
        position:item.position
      })));
    return { model:{ atoms, bonds:(sample.substituents || []).map(item => ['Cstar', item.id]) } };
  }

  function mountStereoCompare(root, ref, options={}) {
    const lesson=getLesson(ref);
    if (!root || !lesson || lesson.kind !== 'stereo-compare') return null;
    const state=options.state || {};
    const progress=ensureProgress(state,ref);
    progress.compareMode = progress.compareMode || 'synchronized';
    progress.leftRotation = progress.leftRotation && typeof progress.leftRotation === 'object' ? progress.leftRotation : { x:-0.25, y:0.45 };
    progress.rightRotation = progress.rightRotation && typeof progress.rightRotation === 'object' ? progress.rightRotation : { x:-0.25, y:0.45 };
    progress.showLabels = progress.showLabels !== false;
    const prefix=`chem3d-${ref.replace(/[^a-z0-9_-]/gi,'-')}`;
    const left=lesson.samples?.left || {};
    const right=lesson.samples?.right || {};
    root.innerHTML=`<section class="chem3d-card chem3d-compare-card"><div class="kicker">${esc(lesson.eyebrow||'STEREO COMPARE')}</div><h1>${esc(lesson.title)}</h1><p class="lead">${esc(lesson.summary||'')}</p><div class="chem3d-compare-toolbar"><button type="button" class="btn ghost" data-compare-mode="synchronized">同步旋转</button><button type="button" class="btn ghost" data-compare-mode="independent">分别旋转</button><button type="button" class="btn ghost" id="${prefix}-labels">显示/隐藏标签</button><button type="button" class="btn ghost" id="${prefix}-center">指出关键手性中心</button></div><div class="chem3d-compare-grid"><article><header><b>${esc(left.label||left.id)}</b><span>${esc(left.formula||'')} · ${esc(left.stereochemistry ? `${left.stereochemistry} · ${left.enantiomerRatio||''}` : left.enantiomerRatio||'')}</span></header><canvas id="${prefix}-left" aria-label="${esc(left.label||'L20-0')}三维模型"></canvas></article><article><header><b>${esc(right.label||right.id)}</b><span>${esc(right.formula||'')} · ${esc(right.enantiomerRatio||'')}</span></header><canvas id="${prefix}-right" aria-label="${esc(right.label||'L20-F')}三维模型"></canvas></article></div><div class="chem3d-compare-callout"><b>证据规则</b><p>${esc(lesson.evidenceNote||'')}</p></div><button type="button" class="btn primary" id="${prefix}-attempt">我已经尝试重合并结合手性证据判断</button><div class="chem3d-actions-readout" id="${prefix}-readout"></div>${bridgeMarkup(lesson,prefix)}<div class="btn-row"><button type="button" class="btn ghost" id="${prefix}-fallback-toggle">3D看不清？改用2D备用练习</button><button type="button" class="btn primary" id="${prefix}-continue" ${progress.completed?'':'disabled'}>${progress.completed?'已完成 · 继续':'完成空间证据后继续'}</button><button type="button" class="link-btn" id="${prefix}-exit">暂时退出</button></div>${fallbackMarkup(lesson,prefix)}</section>`;

    const leftCanvas=root.querySelector(`#${prefix}-left`);
    const rightCanvas=root.querySelector(`#${prefix}-right`);
    const readout=root.querySelector(`#${prefix}-readout`);
    const continueButton=root.querySelector(`#${prefix}-continue`);
    const render=()=>{
      drawModel(leftCanvas,sampleModel(left,progress.showLabels),{rotation:progress.leftRotation});
      drawModel(rightCanvas,sampleModel(right,progress.showLabels),{rotation:progress.rightRotation});
      const required=lesson.requiredActions||[];
      readout.innerHTML=required.map(action=>`<span class="chem3d-check ${progress.actions[action]?'done':''}">${progress.actions[action]?'✓':'○'} ${esc(action)}</span>`).join('');
      continueButton.disabled=!progress.completed;
      continueButton.textContent=progress.completed?'已完成 · 继续':'完成空间证据后继续';
      root.querySelectorAll('[data-compare-mode]').forEach(button=>button.classList.toggle('selected',button.dataset.compareMode===progress.compareMode));
      options.onProgress?.(progress);
    };

    root.querySelectorAll('[data-compare-mode]').forEach(button=>button.addEventListener('click',()=>{
      progress.compareMode=button.dataset.compareMode;
      render();
    }));

    function bindRotation(canvas, side) {
      let dragging=false,lastX=0,lastY=0;
      const down=e=>{ dragging=true; lastX=e.clientX||0; lastY=e.clientY||0; canvas.setPointerCapture?.(e.pointerId); };
      const move=e=>{
        if(!dragging)return;
        const dx=(e.clientX||0)-lastX, dy=(e.clientY||0)-lastY; lastX=e.clientX||0; lastY=e.clientY||0;
        if(progress.compareMode==='synchronized') {
          progress.leftRotation.y+=dx*0.012; progress.leftRotation.x+=dy*0.012;
          progress.rightRotation.y+=dx*0.012; progress.rightRotation.x+=dy*0.012;
          recordAction(state,ref,'rotateSynchronized');
        } else {
          const rotation=side==='left'?progress.leftRotation:progress.rightRotation;
          rotation.y+=dx*0.012; rotation.x+=dy*0.012;
          recordAction(state,ref,'rotateIndependent');
        }
        render();
      };
      const up=()=>{dragging=false;};
      canvas?.addEventListener('pointerdown',down); canvas?.addEventListener('pointermove',move); canvas?.addEventListener('pointerup',up); canvas?.addEventListener('pointerleave',up);
    }
    bindRotation(leftCanvas,'left'); bindRotation(rightCanvas,'right');

    root.querySelector(`#${prefix}-labels`)?.addEventListener('click',()=>{ progress.showLabels=!progress.showLabels; recordAction(state,ref,'toggleLabels'); render(); });
    root.querySelector(`#${prefix}-center`)?.addEventListener('click',()=>{ recordAction(state,ref,'identifyKeyCenter'); root.querySelector('.chem3d-compare-callout')?.classList.add('emphasis'); render(); });
    root.querySelector(`#${prefix}-attempt`)?.addEventListener('click',()=>{ recordAction(state,ref,'compareAttempt'); root.querySelector('.chem3d-compare-callout')?.classList.add('emphasis'); render(); });

    const bindBridge=(container,fallback=false)=>{
      container?.querySelectorAll('[data-3d-bridge]').forEach(button=>button.addEventListener('click',()=>{
        const correct=button.dataset['3dBridge']===lesson.bridge2D?.answer;
        container.querySelectorAll('[data-3d-bridge]').forEach(x=>x.classList.toggle('correct',x.dataset['3dBridge']===lesson.bridge2D?.answer));
        const feedback=container.querySelector('.chem3d-bridge-feedback');
        if(feedback) feedback.innerHTML=`<div class="feedback ${correct?'correct':'wrong'}"><strong>${correct?'判断成立':'再看一次证据边界'}</strong><p>${esc(lesson.bridge2D?.feedback||'')}</p></div>`;
        if(fallback) completeFallback(state,ref,correct); else if(correct) recordAction(state,ref,'bridge2D');
        render();
      }));
    };
    bindBridge(root.querySelector('.chem3d-bridge'),false);
    const fallback=root.querySelector(`#${prefix}-fallback`); bindBridge(fallback,true);
    root.querySelector(`#${prefix}-fallback-toggle`)?.addEventListener('click',()=>{ fallback.hidden=!fallback.hidden; });
    continueButton.addEventListener('click',()=>{ if(progress.completed) options.onComplete?.(progress); });
    root.querySelector(`#${prefix}-exit`)?.addEventListener('click',()=>options.onExit?.());
    render();
    return progress;
  }

  function mount(root, ref, options={}) {
    const lesson=getLesson(ref);
    if (!root || !lesson) return null;
    if (lesson.kind === 'stereo-compare') return mountStereoCompare(root, ref, options);
    const state=options.state || {};
    const progress=ensureProgress(state,ref);
    const mode=options.mode || 'required';
    const prefix=`chem3d-${ref.replace(/[^a-z0-9_-]/gi,'-')}`;
    const actionControls=(lesson.controls||[]).map(control=>`<button type="button" class="btn ghost" data-3d-action="${esc(control.id)}"><b>${esc(control.label)}</b><small>${esc(control.note||'')}</small></button>`).join('');
    const e2Controls=lesson.dihedral ? `<div class="chem3d-dihedral"><label>旋转 Cα–Cβ：<strong id="${prefix}-angle">${Math.round(progress.dihedral)}°</strong><input id="${prefix}-slider" type="range" min="${lesson.dihedral.min}" max="${lesson.dihedral.max}" value="${progress.dihedral}" step="1"></label><button type="button" class="btn ghost" data-3d-action="identifyBetaH">我先找到了 β-H</button></div>` : '';
    root.innerHTML=`<section class="chem3d-card"><div class="kicker">${esc(lesson.eyebrow||'3D')}</div><h1>${esc(lesson.title)}</h1><p class="lead">${esc(lesson.summary||'')}</p><div class="chem3d-stage"><canvas id="${prefix}-canvas" aria-label="可旋转的分子空间模型"></canvas><div class="chem3d-stage-note">拖动模型旋转。这里不是看动画：你需要亲手改变视角，再做空间判断。</div></div>${actionControls}${e2Controls}<div class="chem3d-actions-readout" id="${prefix}-readout"></div>${bridgeMarkup(lesson,prefix)}<div class="btn-row"><button type="button" class="btn ghost" id="${prefix}-fallback-toggle">3D看不清？改用2D备用练习</button>${mode==='on_demand'?`<button type="button" class="btn ghost" id="${prefix}-skip">先跳过</button>`:''}<button type="button" class="btn primary" id="${prefix}-continue" ${progress.completed?'':'disabled'}>${progress.completed?'已完成 · 继续':'完成空间任务后继续'}</button><button type="button" class="link-btn" id="${prefix}-exit">暂时退出</button></div>${fallbackMarkup(lesson,prefix)}</section>`;

    const canvas=root.querySelector(`#${prefix}-canvas`);
    const readout=root.querySelector(`#${prefix}-readout`);
    const continueButton=root.querySelector(`#${prefix}-continue`);
    const refresh=()=>{
      drawModel(canvas,lesson,progress);
      const required=lesson.requiredActions||[];
      readout.innerHTML=required.map(action=>`<span class="chem3d-check ${progress.actions[action]?'done':''}">${progress.actions[action]?'✓':'○'} ${esc(action)}</span>`).join('');
      continueButton.disabled=!progress.completed;
      continueButton.textContent=progress.completed?'已完成 · 继续':'完成空间任务后继续';
      options.onProgress?.(progress);
    };

    let dragging=false,lastX=0,lastY=0;
    const point=e=>({x:e.clientX ?? e.touches?.[0]?.clientX ?? 0,y:e.clientY ?? e.touches?.[0]?.clientY ?? 0});
    const down=e=>{dragging=true;const p=point(e);lastX=p.x;lastY=p.y;};
    const move=e=>{if(!dragging)return;const p=point(e);progress.rotation.y+=(p.x-lastX)*0.012;progress.rotation.x+=(p.y-lastY)*0.012;lastX=p.x;lastY=p.y;recordAction(state,ref,'rotate');refresh();};
    const up=()=>{dragging=false;};
    canvas?.addEventListener('pointerdown',down); canvas?.addEventListener('pointermove',move); canvas?.addEventListener('pointerup',up); canvas?.addEventListener('pointerleave',up);

    root.querySelectorAll('[data-3d-action]').forEach(button=>button.addEventListener('click',()=>{ recordAction(state,ref,button.dataset['3dAction']); button.classList.add('selected'); refresh(); }));
    const slider=root.querySelector(`#${prefix}-slider`);
    slider?.addEventListener('input',()=>{ progress.dihedral=Number(slider.value); root.querySelector(`#${prefix}-angle`).textContent=`${Math.round(progress.dihedral)}°`; const target=lesson.dihedral?.target??180,tol=lesson.dihedral?.tolerance??12; if(Math.abs(progress.dihedral-target)<=tol) recordAction(state,ref,'setAnti'); refresh(); });

    const bindBridge=(container, fallback=false)=>{
      container?.querySelectorAll('[data-3d-bridge]').forEach(button=>button.addEventListener('click',()=>{
        const correct=button.dataset['3dBridge']===lesson.bridge2D?.answer;
        container.querySelectorAll('[data-3d-bridge]').forEach(x=>x.classList.toggle('correct',x.dataset['3dBridge']===lesson.bridge2D?.answer));
        const feedback=container.querySelector('.chem3d-bridge-feedback');
        if(feedback) feedback.innerHTML=`<div class="feedback ${correct?'correct':'wrong'}"><strong>${correct?'判断成立':'再看一次空间关系'}</strong><p>${esc(lesson.bridge2D?.feedback||'')}</p></div>`;
        if(fallback) completeFallback(state,ref,correct); else if(correct) recordAction(state,ref,'bridge2D');
        refresh();
      }));
    };
    bindBridge(root.querySelector('.chem3d-bridge'),false);
    const fallback=root.querySelector(`#${prefix}-fallback`);
    bindBridge(fallback,true);
    root.querySelector(`#${prefix}-fallback-toggle`)?.addEventListener('click',()=>{ fallback.hidden=!fallback.hidden; });
    root.querySelector(`#${prefix}-skip`)?.addEventListener('click',()=>options.onSkip?.());
    continueButton.addEventListener('click',()=>{ if(progress.completed) options.onComplete?.(progress); });
    root.querySelector(`#${prefix}-exit`)?.addEventListener('click',()=>options.onExit?.());
    refresh();
    return progress;
  }

  NS.Chem3D={getLesson,ensureProgress,isCompleted,recordAction,completeFallback,canAdvance,mount,mountStereoCompare,drawModel};
})();
