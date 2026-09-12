const assert = require('assert');
const fs = require('fs');
const path = require('path');

global.window = {};
require('../../data/v16-story.js');
require('../../data/v16-assets.js');
require('../../js/comic-renderer.js');

const NS = window.Organic637;
const assets = NS.V16_ASSETS;

for (const groupName of ['characters', 'backgrounds', 'evidence']) {
  const group = assets[groupName] || {};
  for (const [id, meta] of Object.entries(group)) {
    const value = meta.path || meta.portraitBase || '';
    if (!value) continue;
    assert.ok(!/^https?:\/\//i.test(value), `${groupName}.${id} must not depend on remote HTTP assets`);
    assert.ok(!/^\/\//.test(value), `${groupName}.${id} must not use protocol-relative assets`);
    assert.ok(value.startsWith('assets/story/'), `${groupName}.${id} must use local assets/story paths`);
  }
}

const known = NS.V16Comic.render('case01-open', { day: 1 });
assert.match(known, /v16-character-fallback/, 'known scenes must include character fallback markup even when an image path exists');
assert.match(known, /v16-evidence-fallback/, 'known scenes must include evidence fallback markup even when an image path exists');
assert.match(known, /data-v16-comic-continue/, 'known scene must always offer a continue action');

const missing = NS.V16Comic.render('scene-does-not-exist', { day: 1 });
assert.match(missing, /案件片段暂时无法显示/, 'missing scene must render a readable text fallback');
assert.match(missing, /data-v16-comic-continue/, 'missing scene must not deadlock the learning flow');
assert.match(missing, /data-v16-comic-exit/, 'missing scene must still allow temporary exit');

const source = fs.readFileSync(path.join(__dirname, '../../js/comic-renderer.js'), 'utf8');
assert.match(source, /addEventListener\(['"]error['"]/, 'image elements must bind an error fallback');
assert.match(source, /naturalWidth\s*===\s*0/, 'already-failed cached images must be detected');
assert.doesNotMatch(source, /fetch\s*\(/, 'comic rendering must not require a network fetch to show a scene');

console.log('PASS test-v16-comic-resilience');
