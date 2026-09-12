const assert = require('assert');
global.window = { Organic637: {} };
require('../../data/v16-story.js');
require('../../data/v16-novel.js');
require('../../data/v16-novel-longform.js');
require('../../data/v16-assets.js');
require('../../data/v16-director.js');
require('../../js/comic-renderer.js');

const NS = window.Organic637;
const scenes = new Set();
for (const day of Object.values(NS.V16_DIRECTOR_DATA.days || {})) {
  for (const step of day.sequence || []) if (step.type === 'comic' && step.sceneId) scenes.add(step.sceneId);
}
assert.ok(scenes.size >= 40, 'formal build should have a substantial comic scene set');
for (const sceneId of scenes) {
  const recap = NS.V16_NOVEL?.sections?.[sceneId];
  assert.ok(recap, `${sceneId} needs a detailed story recap`);
  assert.ok(Array.isArray(recap.paragraphs) && recap.paragraphs.length >= 2, `${sceneId} recap should have at least two paragraphs`);
  const chars = recap.paragraphs.join('').replace(/\s/g,'').length;
  assert.ok(chars >= 160, `${sceneId} recap is too thin (${chars} chars)`);
  const html = NS.V16Comic.render(sceneId, { day: NS.V16_STORY.scenes[sceneId]?.day || 1 });
  assert.match(html, /data-v16-story-recap/, `${sceneId} should expose the story recap button`);
}
console.log(`PASS test-v16-story-recap (${scenes.size} scenes)`);
