import * as THREE from '../vendor/three.module.min.js';

(() => {
  'use strict';

  const NS = window.Organic637 = window.Organic637 || {};
  const ELEMENTS = {
    C: { color: '#41444b', radius: 0.34 },
    H: { color: '#f7f0df', radius: 0.24 },
    O: { color: '#d97979', radius: 0.32 },
    N: { color: '#78a9d3', radius: 0.33 },
    Br: { color: '#8e4c45', radius: 0.42 },
    Cl: { color: '#75aa83', radius: 0.39 }
  };
  let active = null;

  const clone = value => JSON.parse(JSON.stringify(value));
  const vector = value => new THREE.Vector3(...value);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const nearAnti = angle => Math.abs((((Number(angle) - 180) % 360) + 540) % 360 - 180) <= 15;

  function fallback(container, detail = '') {
    if (!container) return null;
    container.innerHTML = `<div class="chem3d-unavailable"><b>这个设备暂时没打开 3D</b><p>我们继续用下面的二维分解理解，不影响今天学习。${detail ? ` ${detail}` : ''}</p></div>`;
    return null;
  }

  function setCylinder(mesh, start, end, radius = 0.09) {
    const delta = end.clone().sub(start);
    const length = Math.max(0.001, delta.length());
    mesh.position.copy(start).add(end).multiplyScalar(0.5);
    mesh.scale.set(radius / 0.09, length, radius / 0.09);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), delta.normalize());
  }

  function makeCylinder(material) {
    return new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1, 16), material);
  }

  function materialList(material) {
    return Array.isArray(material) ? material : [material];
  }

  function mount(container, inputModel, options = {}) {
    if (!container) return null;
    dispose();
    const source = typeof inputModel === 'string' ? window.Organic637ThreeDPresets?.[inputModel] : inputModel;
    if (!source) return fallback(container, '教学模型没有正确加载。');

    const model = clone(source);
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch (error) {
      console.warn('[Chem3D] WebGL unavailable', error);
      return fallback(container);
    }

    container.innerHTML = '';
    container.classList.add('chem3d-mounted');
    const reducedMotion = Boolean(options.reducedMotion || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100);
    const modelGroup = new THREE.Group();
    const atomMeshes = new Map();
    const labels = new Map();
    const bondObjects = [];
    const vectorObjects = [];
    const atomDefs = new Map(model.atoms.map(row => [row.id, row]));
    const initialPositions = new Map(model.atoms.map(row => [row.id, vector(row.position)]));
    const labelLayer = document.createElement('div');
    const status = document.createElement('div');
    let labelsVisible = options.showLabels !== false;
    let currentStep = 0;
    let animationFrame = 0;
    let renderFrame = 0;
    let newmanAngle = 60;
    let dihedral = Number(model.initialDihedral ?? 180);
    let chairFlipped = false;
    let dielsVariant = 'endo';
    let disposed = false;

    labelLayer.className = 'chem3d-label-layer';
    status.className = 'chem3d-live-status';
    status.setAttribute('aria-live', 'polite');
    renderer.domElement.className = 'chem3d-canvas';
    renderer.domElement.setAttribute('aria-label', options.ariaLabel || '可旋转的有机化学教学三维模型');
    renderer.domElement.setAttribute('role', 'img');
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0xfffbf6, 0);
    container.append(renderer.domElement, labelLayer, status);

    scene.add(modelGroup);
    scene.add(new THREE.HemisphereLight(0xfffbef, 0x8ea6b3, 2.25));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.35);
    keyLight.position.set(4, 6, 7);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xffd9df, 1.2);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    model.atoms.forEach(def => {
      const style = ELEMENTS[def.element] || ELEMENTS.C;
      const geometry = new THREE.SphereGeometry(Number(def.radius || style.radius), 28, 20);
      const material = new THREE.MeshStandardMaterial({ color: def.color || style.color, roughness: 0.5, metalness: 0.02 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(vector(def.position));
      mesh.userData.atomId = def.id;
      modelGroup.add(mesh);
      atomMeshes.set(def.id, mesh);
      if (def.highlight) {
        const halo = new THREE.Mesh(
          new THREE.SphereGeometry(Number(def.radius || style.radius) * 1.42, 24, 16),
          new THREE.MeshBasicMaterial({ color: 0xf3a4bd, transparent: true, opacity: 0.2, depthWrite: false })
        );
        mesh.add(halo);
      }
      const label = document.createElement('span');
      label.className = 'chem3d-atom-label';
      label.textContent = def.label || def.element || def.id;
      labelLayer.appendChild(label);
      labels.set(def.id, label);
    });

    model.bonds.forEach(def => {
      const material = new THREE.MeshStandardMaterial({
        color: def.color || (def.style === 'forming' ? 0xd27d9b : 0x7a7d84),
        roughness: 0.62,
        transparent: Number(def.opacity ?? 1) < 1,
        opacity: Number(def.opacity ?? 1)
      });
      const group = new THREE.Group();
      const count = def.style === 'forming' ? 5 : Math.max(1, Number(def.order || 1));
      for (let index = 0; index < count; index += 1) {
        const cylinder = makeCylinder(material.clone());
        group.add(cylinder);
      }
      group.userData.bondDef = def;
      modelGroup.add(group);
      bondObjects.push(group);
    });

    (model.vectors || []).forEach(def => {
      const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), 1, new THREE.Color(def.color || '#d46f8f'), 0.28, 0.15);
      arrow.userData.vectorDef = def;
      arrow.visible = false;
      modelGroup.add(arrow);
      vectorObjects.push(arrow);
    });

    if (model.orbital) {
      const orbital = new THREE.Mesh(
        new THREE.SphereGeometry(1, 28, 18),
        new THREE.MeshPhongMaterial({ color: model.orbital.color || '#7da9d8', transparent: true, opacity: 0.12, depthWrite: false, side: THREE.DoubleSide })
      );
      orbital.position.copy(vector(model.orbital.center));
      orbital.scale.set(...model.orbital.scale);
      modelGroup.add(orbital);
    }

    function atomPosition(id) {
      return atomMeshes.get(id)?.position.clone() || new THREE.Vector3();
    }

    function updateBonds() {
      bondObjects.forEach(group => {
        const def = group.userData.bondDef;
        const start = atomPosition(def.from);
        const end = atomPosition(def.to);
        const delta = end.clone().sub(start);
        const side = new THREE.Vector3(0, 0, 1).cross(delta).normalize().multiplyScalar(0.075);
        if (!Number.isFinite(side.x)) side.set(0.075, 0, 0);
        if (def.style === 'forming') {
          group.children.forEach((mesh, index) => {
            const a = start.clone().lerp(end, index / 5 + 0.035);
            const b = start.clone().lerp(end, index / 5 + 0.135);
            setCylinder(mesh, a, b, 0.055);
          });
        } else if (group.children.length === 2) {
          setCylinder(group.children[0], start.clone().add(side), end.clone().add(side), 0.065);
          setCylinder(group.children[1], start.clone().sub(side), end.clone().sub(side), 0.065);
        } else {
          setCylinder(group.children[0], start, end, 0.085);
        }
      });
    }

    function resolveVectorPoint(def, prefix) {
      if (def[`${prefix}Atom`]) return atomPosition(def[`${prefix}Atom`]);
      return vector(def[prefix] || [0, 0, 0]);
    }

    function updateVectors(force = false) {
      vectorObjects.forEach(arrow => {
        const def = arrow.userData.vectorDef;
        const permitted = force || currentStep >= Number(def.showAt || 0);
        arrow.visible = permitted && (model.id !== 'e2' || nearAnti(dihedral));
        if (!arrow.visible) return;
        const from = resolveVectorPoint(def, 'from');
        const to = resolveVectorPoint(def, 'to');
        const delta = to.clone().sub(from);
        const length = Math.max(0.25, delta.length());
        arrow.position.copy(from);
        arrow.setDirection(delta.normalize());
        arrow.setLength(length, Math.min(0.3, length * 0.25), Math.min(0.17, length * 0.16));
      });
    }

    function drawLabels() {
      labels.forEach((label, id) => {
        const mesh = atomMeshes.get(id);
        if (!mesh || !labelsVisible) {
          label.hidden = true;
          return;
        }
        const world = mesh.getWorldPosition(new THREE.Vector3()).project(camera);
        const hidden = world.z < -1 || world.z > 1;
        label.hidden = hidden;
        if (!hidden) {
          label.style.left = `${(world.x * 0.5 + 0.5) * 100}%`;
          label.style.top = `${(-world.y * 0.5 + 0.5) * 100}%`;
        }
      });
    }

    function renderNow() {
      if (disposed) return;
      renderer.render(scene, camera);
      drawLabels();
    }

    function requestRender() {
      if (renderFrame || disposed) return;
      renderFrame = requestAnimationFrame(() => {
        renderFrame = 0;
        renderNow();
      });
    }

    function size() {
      if (disposed) return;
      const rect = container.getBoundingClientRect();
      const width = Math.max(280, Math.round(rect.width || 440));
      const height = Math.max(280, Math.round(rect.height || (width < 430 ? 320 : 350)));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      requestRender();
    }

    function message(text, tone = '') {
      status.textContent = text || '';
      status.className = `chem3d-live-status ${tone}`.trim();
      options.onMessage?.(text, tone);
    }

    function tween(duration, update, done) {
      cancelAnimationFrame(animationFrame);
      if (reducedMotion || !duration) {
        update(1);
        updateBonds();
        updateVectors();
        requestRender();
        done?.();
        return;
      }
      const started = performance.now();
      const run = now => {
        const raw = clamp((now - started) / duration, 0, 1);
        const value = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
        update(value);
        updateBonds();
        updateVectors();
        renderNow();
        if (raw < 1) animationFrame = requestAnimationFrame(run);
        else done?.();
      };
      animationFrame = requestAnimationFrame(run);
    }

    function moveAtoms(targets, duration = 600, done) {
      const starts = {};
      Object.keys(targets).forEach(id => { starts[id] = atomPosition(id); });
      tween(duration, amount => {
        Object.entries(targets).forEach(([id, target]) => atomMeshes.get(id)?.position.lerpVectors(starts[id], vector(target), amount));
      }, done);
    }

    function restorePositions() {
      initialPositions.forEach((position, id) => atomMeshes.get(id)?.position.copy(position));
      updateBonds();
    }

    function applyE2Angle(nextAngle, notify = true) {
      dihedral = ((Number(nextAngle) % 360) + 360) % 360;
      const center = atomPosition('cb');
      const rotation = new THREE.Matrix4().makeRotationX(THREE.MathUtils.degToRad(180 - dihedral));
      ['hb', 'r1', 'r2'].forEach(id => {
        const base = initialPositions.get(id).clone().sub(initialPositions.get('cb')).applyMatrix4(rotation).add(center);
        atomMeshes.get(id)?.position.copy(base);
      });
      updateBonds();
      updateVectors();
      const aligned = nearAnti(dihedral);
      message(`当前扭转角约 ${Math.round(dihedral)}°${aligned ? ' · 现在对上了' : ''}`, aligned ? 'good' : '');
      if (notify) options.onMetric?.({ type: 'dihedral', value: Math.round(dihedral), aligned });
      requestRender();
    }

    function applyChair(flipped, duration = 600) {
      chairFlipped = Boolean(flipped);
      const chair = model.chairPositions || {};
      const targets = {};
      Object.entries(chair).forEach(([id, position]) => { targets[id] = [position[0], position[1], chairFlipped ? -position[2] : position[2]]; });
      targets.methyl = chairFlipped ? [-2.68, 0, 0.52] : [-1.6, 0, 1.48];
      targets.h3ax = chairFlipped ? [0.82, 0.94, -1.02] : [0.82, 0.94, 1.02];
      targets.h5ax = chairFlipped ? [0.82, -0.94, -1.02] : [0.82, -0.94, 1.02];
      moveAtoms(targets, duration, () => {
        const label = labels.get('methyl');
        if (label) label.textContent = chairFlipped ? 'CH₃ · equatorial · 仍然 up' : 'CH₃ · axial · up';
        message(chairFlipped ? '环翻转完成：CH₃ 从 axial 变 equatorial，但仍然是 up。' : '回到原椅式：CH₃ 又是 axial，up/down 没有改变。', 'good');
      });
    }

    function applyDiels(step) {
      const product = {
        d1: [-1.55, 0.88, 0], d2: [-0.48, 1.36, 0.18], d3: [0.58, 0.82, 0], d4: [0.58, -0.42, 0],
        e2: [-0.48, -1.02, 0.18], e1: [-1.55, -0.42, 0], cargo: dielsVariant === 'endo' ? [-0.42, -1.7, -0.78] : [-0.42, -1.7, 1.05]
      };
      if (step <= 0) return moveAtoms(Object.fromEntries([...initialPositions].map(([id, value]) => [id, value.toArray()])), 450);
      if (step === 1) {
        const targets = {};
        ['e1', 'e2', 'cargo'].forEach(id => {
          const p = initialPositions.get(id).clone();
          p.x -= 1.35;
          targets[id] = p.toArray();
        });
        return moveAtoms(targets, 650);
      }
      moveAtoms(product, 780);
    }

    function animateStep(step) {
      currentStep = Math.max(0, Number(step) || 0);
      if (model.id === 'sn2') {
        const map = [
          { nu: [0, 0, -3.35], x: [0, 0, 1.85], r1: [1.25, 0, -0.1], r2: [-0.64, 1.08, -0.1], h: [-0.64, -1.08, -0.1] },
          { nu: [0, 0, -2.25], x: [0, 0, 1.9], r1: [1.25, 0, -0.04], r2: [-0.64, 1.08, -0.04], h: [-0.64, -1.08, -0.04] },
          { nu: [0, 0, -1.35], x: [0, 0, 2.35], r1: [1.25, 0, 0], r2: [-0.64, 1.08, 0], h: [-0.64, -1.08, 0] },
          { nu: [0, 0, -1.55], x: [0, 0, 3.35], r1: [1.2, 0, 0.46], r2: [-0.6, 1.04, 0.46], h: [-0.6, -1.04, 0.46] }
        ];
        const target = map[Math.min(map.length - 1, currentStep)] || map[0];
        moveAtoms(target, 620);
      } else if (model.id === 'e2') {
        if (currentStep === 0) applyE2Angle(model.initialDihedral ?? 60, false);
        if (currentStep >= 2 && !nearAnti(dihedral)) applyE2Angle(180, true);
      } else if (model.id === 'chair') {
        if (currentStep === 0) moveAtoms(model.flatPositions, 480, () => message('如果六个 sp³ 碳都被压平，键角与重叠都会不舒服。'));
        else if (currentStep === 1) moveAtoms(model.chairPositions, 700, () => message('环折起来了：这就是椅式不是“故意画怪”的原因。', 'good'));
        else if (currentStep >= 4) applyChair(true, 650);
      } else if (model.id === 'diels_alder') {
        applyDiels(currentStep >= 2 ? 2 : currentStep);
      } else if (model.id === 'newman' && currentStep >= 1) {
        setView('bond');
      }
      updateVectors();
      requestRender();
    }

    function setView(name = 'standard') {
      const destination = name === 'right' ? [7, 0, 0] : name === 'bond' || name === 'priorityAway' ? [0, 0, 7] : (model.camera || [5, 3.5, 7]);
      const start = camera.position.clone();
      const end = vector(destination);
      const startQuaternion = modelGroup.quaternion.clone();
      const endQuaternion = name === 'halfTurn'
        ? new THREE.Quaternion().setFromEuler(new THREE.Euler(modelGroup.rotation.x, modelGroup.rotation.y + Math.PI, modelGroup.rotation.z))
        : name === 'standard' || name === 'bond' || name === 'priorityAway' || name === 'right'
          ? new THREE.Quaternion()
          : startQuaternion;
      tween(520, amount => {
        camera.position.lerpVectors(start, end, amount);
        camera.lookAt(0, 0, 0);
        modelGroup.quaternion.slerpQuaternions(startQuaternion, endQuaternion, amount);
      }, () => {
        const text = name === 'bond' ? '现在沿 C–C 键看：前碳是点，后碳是圆。' : name === 'priorityAway' ? '4 号已经在背后，可以读 1 → 2 → 3。' : name === 'halfTurn' ? '整颗分子转了 180°，连接与构型没有改变。' : '';
        if (text) message(text, 'good');
        options.onAction?.(name);
      });
    }

    function adjustDihedral(delta) {
      if (model.id !== 'e2') return;
      applyE2Angle(dihedral + Number(delta || 0));
    }

    function rotateNewman(delta = 60) {
      if (model.id !== 'newman') return;
      newmanAngle = (newmanAngle + Number(delta || 60)) % 360;
      const center = initialPositions.get('cr');
      const rotation = new THREE.Matrix4().makeRotationZ(THREE.MathUtils.degToRad(Number(delta || 60)));
      (model.rearIds || []).forEach(id => {
        const next = atomPosition(id).sub(center).applyMatrix4(rotation).add(center);
        atomMeshes.get(id)?.position.copy(next);
      });
      updateBonds();
      const normalized = ((newmanAngle % 120) + 120) % 120;
      const conformation = normalized < 5 || normalized > 115 ? 'eclipsed · 重叠' : 'staggered · 错开';
      message(`后碳已转 ${Math.round(newmanAngle)}° · ${conformation}`, conformation.startsWith('staggered') ? 'good' : '');
      options.onMetric?.({ type: 'newman', value: newmanAngle, conformation });
      requestRender();
    }

    function ringFlip() {
      if (model.id !== 'chair') return;
      applyChair(!chairFlipped, 720);
      options.onAction?.('ringFlip');
    }

    function methylEquatorial() {
      if (model.id !== 'chair') return;
      if (!chairFlipped) applyChair(true, 620);
      else message('CH₃ 已在 equatorial，和 1,3-diaxial H 的拥挤更小。', 'good');
      options.onAction?.('methylEquatorial');
    }

    function setVariant(variantName) {
      if (model.id !== 'diels_alder') return;
      dielsVariant = variantName === 'exo' ? 'exo' : 'endo';
      const cargo = atomMeshes.get('cargo');
      const label = labels.get('cargo');
      if (cargo) cargo.position.z = dielsVariant === 'endo' ? -0.78 : 1.05;
      if (label) label.textContent = dielsVariant === 'endo' ? '取代基 · endo · 桥下' : '取代基 · exo · 桥外';
      message(dielsVariant === 'endo' ? 'endo：货物收向桥下 / 新 π 系统方向。' : 'exo：货物朝桥外。', 'good');
      options.onAction?.(dielsVariant);
      updateBonds();
      requestRender();
    }

    function wrongAttack() {
      if (model.id !== 'sn2') return;
      const nu = atomMeshes.get('nu');
      if (!nu) return;
      const start = nu.position.clone();
      const crowd = new THREE.Vector3(0.15, 0, 2.55);
      tween(480, amount => nu.position.lerpVectors(start, crowd, amount), () => {
        message('这边被 X 占着，而且电子对也没有对准 C–X σ*：空间拥挤 + 方向不利。', 'warn');
        setTimeout(() => {
          if (disposed) return;
          tween(430, amount => nu.position.lerpVectors(crowd, start, amount));
        }, reducedMotion ? 0 : 650);
      });
      options.onAction?.('wrongAttack');
    }

    function tryE2() {
      if (model.id !== 'e2') return;
      if (nearAnti(dihedral)) {
        currentStep = Math.max(currentStep, 2);
        updateVectors(true);
        message('现在对上了：Base → H、C–H → C=C、C–X → X 同步发生。', 'good');
      } else {
        message('不是说永远完全不反应，而是这个构象不满足经典 E2 最有利的 anti-periplanar 排列。', 'warn');
      }
      requestRender();
      options.onAction?.('tryE2');
    }

    function toggleLabels() {
      labelsVisible = !labelsVisible;
      requestRender();
      return labelsVisible;
    }

    function reset() {
      cancelAnimationFrame(animationFrame);
      restorePositions();
      modelGroup.rotation.set(0, 0, 0);
      camera.position.copy(vector(model.camera || [5, 3.5, 7]));
      camera.lookAt(0, 0, 0);
      dihedral = Number(model.initialDihedral ?? 180);
      newmanAngle = 60;
      chairFlipped = false;
      if (model.id === 'e2') applyE2Angle(dihedral, false);
      status.textContent = '';
      updateVectors();
      requestRender();
    }

    let dragging = false;
    let pointerX = 0;
    let pointerY = 0;
    let dragReported = false;
    const canvas = renderer.domElement;
    const onPointerDown = event => {
      if (options.interactive === false) return;
      dragging = true;
      pointerX = event.clientX;
      pointerY = event.clientY;
      canvas.setPointerCapture?.(event.pointerId);
    };
    const onPointerMove = event => {
      if (!dragging || options.interactive === false) return;
      const dx = event.clientX - pointerX;
      const dy = event.clientY - pointerY;
      pointerX = event.clientX;
      pointerY = event.clientY;
      modelGroup.rotation.y += dx * 0.009;
      modelGroup.rotation.x = clamp(modelGroup.rotation.x + dy * 0.007, -1.2, 1.2);
      if (!dragReported && Math.abs(dx) + Math.abs(dy) > 2) {
        dragReported = true;
        options.onAction?.('drag');
      }
      requestRender();
    };
    const onPointerUp = event => {
      dragging = false;
      canvas.releasePointerCapture?.(event.pointerId);
    };
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(size) : null;
    resizeObserver?.observe(container);
    camera.position.copy(vector(model.camera || [5, 3.5, 7]));
    camera.lookAt(0, 0, 0);
    updateBonds();
    if (model.id === 'e2') applyE2Angle(dihedral, false);
    size();
    renderNow();

    const instance = {
      modelId: model.id,
      animateStep,
      setView,
      adjustDihedral,
      rotateNewman,
      ringFlip,
      methylEquatorial,
      setVariant,
      wrongAttack,
      tryE2,
      toggleLabels,
      reset,
      projectTo2D() { options.onAction?.('project2d'); },
      getMetric() { return { dihedral, newmanAngle, chairFlipped, dielsVariant }; },
      dispose() {
        if (disposed) return;
        disposed = true;
        cancelAnimationFrame(animationFrame);
        cancelAnimationFrame(renderFrame);
        resizeObserver?.disconnect();
        canvas.removeEventListener('pointerdown', onPointerDown);
        canvas.removeEventListener('pointermove', onPointerMove);
        canvas.removeEventListener('pointerup', onPointerUp);
        canvas.removeEventListener('pointercancel', onPointerUp);
        scene.traverse(object => {
          object.geometry?.dispose?.();
          if (object.material) materialList(object.material).forEach(item => item?.dispose?.());
        });
        renderer.dispose();
        renderer.forceContextLoss?.();
        container.classList.remove('chem3d-mounted');
        if (active === instance) active = null;
      }
    };
    active = instance;
    return instance;
  }

  function dispose() {
    active?.dispose?.();
    active = null;
  }

  NS.Chem3D = { mount, dispose, get active() { return active; } };
  window.dispatchEvent(new CustomEvent('organic637:chem3d-ready'));
})();
