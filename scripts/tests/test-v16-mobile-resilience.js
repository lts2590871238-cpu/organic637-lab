const assert = require('assert');
const fs = require('fs');
const path = require('path');

const loaded = [];
class FakeImage {
  set src(value) { this._src = value; loaded.push(value); }
  get src() { return this._src; }
}

global.Image = FakeImage;
global.window = { Organic637: {} };
require('../../data/v16-story.js');
require('../../data/v16-assets.js');
require('../../js/comic-renderer.js');

const Comic = window.Organic637.V16Comic;
assert.equal(typeof Comic.collectSceneAssets, 'function', 'comic renderer must expose per-scene asset collection');
assert.equal(typeof Comic.preloadScenes, 'function', 'comic renderer must expose bounded scene preloading');

const first = Comic.collectSceneAssets('case01-open');
const second = Comic.collectSceneAssets('case01-return');
const third = Comic.collectSceneAssets('case01-cliffhanger');
assert.ok(first.length > 0, 'current scene should resolve local visual assets');
assert.ok(second.length > 0, 'next scene should resolve local visual assets');
assert.ok(third.length > 0, 'later scene should also have assets for the preload cap test');

loaded.length = 0;
const result = Comic.preloadScenes(['case01-open', 'case01-return', 'case01-cliffhanger']);
assert.equal(result.sceneIds.length, 2, 'preloader must cap itself to current + next scene');
const allowed = new Set([...first, ...second]);
for (const url of loaded) assert.ok(allowed.has(url), `preloader must not fetch later-day/third-scene asset ${url}`);
for (const url of third) assert.ok(!loaded.includes(url) || allowed.has(url), 'third scene must not be proactively loaded');

const html = Comic.render('case01-open', { day: 1 });
assert.match(html, /data-v16-evidence-zoom/, 'evidence must be tappable/enlargeable on narrow screens');

const css = fs.readFileSync(path.join(__dirname, '../../styles.css'), 'utf8');
assert.match(css, /@media\s*\(max-width:420px\)/, '360px-equivalent layout needs a dedicated narrow breakpoint');
assert.match(css, /\.v16-comic[^\{]*\{[^}]*max-width\s*:\s*100%/s, 'comic shell must not exceed the viewport');
assert.match(css, /\.case-board-shell[^\{]*\{[^}]*max-width\s*:\s*100%/s, 'case board shell must not exceed the viewport');
assert.match(css, /\.v16-evidence-lightbox/, 'evidence zoom must have a mobile-safe lightbox style');
assert.match(css, /\.chem3d-shell[^\{]*\{[^}]*max-width\s*:\s*100%/s, '3D shell must be width-safe on mobile');

console.log('PASS test-v16-mobile-resilience');
