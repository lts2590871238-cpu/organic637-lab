const assert = require('assert');
const fs = require('fs');
const path = require('path');

global.window = global;
window.Organic637 = {};
window.Organic637Data = { days:{} };
require('../../data/v16-story.js');
require('../../data/v16-assets.js');
require('../../data/v16-release-config.js');
require('../../data/v16-director.js');
require('../../js/director-engine.js');
require('../../js/comic-renderer.js');

const NS = window.Organic637;
assert.equal(NS.V16_RELEASE_CONFIG?.allDaysUnlocked, false, 'formal build must restore sequential day unlocking');
assert.equal(NS.V16_RELEASE_CONFIG?.showTestBadge, false, 'formal build must hide TEST BUILD badges');

for (const [id, meta] of Object.entries(NS.V16_ASSETS.characters || {})) {
  assert.ok(meta.portrait, `${id} needs a built-in portrait asset in the test build`);
  const full = path.join(__dirname, '../..', meta.portrait);
  assert.ok(fs.existsSync(full), `${id} portrait missing: ${meta.portrait}`);
  assert.ok(fs.statSync(full).size > 10000, `${id} portrait looks like a placeholder`);
}

const cast = NS.V16_STORY.scenes?.['case00-cast'];
assert.ok(cast, 'Day1 must begin with a cast/introduction scene');
assert.equal(cast.layout, 'cast-intro', 'cast scene must use the dedicated visual-novel cast layout');
assert.equal((cast.cast || []).length, 5, 'cast intro must introduce all five recurring characters');
for (const id of ['zhouYan','chengYe','linCen','guYao','xuLinchuan']) {
  assert.ok((cast.cast || []).includes(id), `cast intro missing ${id}`);
}

const renderedCast = NS.V16Comic.render('case00-cast', { day:1 });
for (const name of ['周砚','程野','林岑','顾遥','许临川']) {
  assert.match(renderedCast, new RegExp(name), `cast page must visibly name ${name}`);
}
assert.match(renderedCast, /v16-cast-grid/, 'cast page must render as a visual cast spread, not generic dialogue cards');
assert.match(renderedCast, /<img[^>]+assets\/story\/characters\//, 'cast page must use built-in portrait images');

assert.ok(NS.V16_ASSETS.keyart?.castLab?.path, 'cast intro needs local LAB-20 group key art');
assert.ok(fs.existsSync(path.join(__dirname, '../..', NS.V16_ASSETS.keyart.castLab.path)), 'cast key art file must exist');
assert.match(renderedCast, /v16-cast-keyart/, 'cast intro must show the lab group key art, not only profile cards');
const hookedScene = NS.V16Comic.render('case01-open', { day:1, learningHook:'要判断记录里的变化是否化学上合理，先学会读结构式。' });
assert.match(hookedScene, /v16-story-hook/, 'story must hand the unresolved question directly into learning');
assert.match(hookedScene, /v16-story-hook[^>]*hidden/, 'learning hook must stay hidden until the last story page');
assert.match(hookedScene, /先把这一步学会|继续查/, 'story-to-learning CTA must preserve the investigation motive');

for (const [sceneId, scene] of Object.entries(NS.V16_STORY.scenes || {})) {
  for (const panel of scene.panels || []) {
    if (panel.background) {
      const bg = NS.V16_ASSETS.backgrounds?.[panel.background];
      assert.ok(bg?.path, `${sceneId} background must resolve: ${panel.background}`);
      assert.ok(fs.existsSync(path.join(__dirname, '../..', bg.path)), `${sceneId} background file missing: ${bg.path}`);
    }
    if (panel.evidence) {
      const ev = NS.V16_ASSETS.evidence?.[panel.evidence];
      assert.ok(ev?.path, `${sceneId} evidence must resolve: ${panel.evidence}`);
      assert.ok(fs.existsSync(path.join(__dirname, '../..', ev.path)), `${sceneId} evidence file missing: ${ev.path}`);
    }
  }
}

const plan = NS.V16Director.getDayPlan(1);
assert.equal(plan.sequence[0].sceneId, 'case00-cast', 'Day1 first step must introduce the people before the incident');
assert.equal(plan.sequence[1].sceneId, 'case01-open', 'Day1 second story beat must enter the incident');
assert.ok(NS.V16Director.estimateMinutes(1) <= 60, 'Day1 must stay inside the hard 60-minute cap');

const appSource = fs.readFileSync(path.join(__dirname, '../../app.js'), 'utf8');
assert.match(appSource, /function\s+isDayUnlocked\s*\(/, 'app must centralize day unlocking logic');
assert.match(appSource, /V16_RELEASE_CONFIG[^\n]*allDaysUnlocked|allDaysUnlocked[^\n]*V16_RELEASE_CONFIG/, 'day unlocking must honor the formal release config');
assert.doesNotMatch(appSource, /day\s*>\s*Store\.state\.currentDay\s*&&\s*!Store\.state\.completedDays\.includes\(day\)\)\s*\{\s*location\.hash\s*=\s*['"]#home['"]/, 'director/legacy entry guards must not bypass centralized test unlocking');
assert.match(appSource, /V16_RELEASE_CONFIG\?\.showTestBadge/, 'test badge behavior must stay controlled by release config');
assert.doesNotMatch(appSource, /20天有机化学大作战！/, 'formal V16 welcome must not revert to the old generic campaign headline');
assert.match(appSource, /一份消失的样品|被改写的记录|LAB-20/, 'formal welcome must establish the mystery instead of generic course copy');

const firstLesson = plan.sequence.find(step => step.type === 'lesson');
assert.ok(firstLesson?.caseBridge, 'first learning step must explain why this chemistry is needed for the investigation');
assert.match(firstLesson.caseBridge, /真相|证据|样品|记录|调查|查清/, 'learning bridge must stay tied to the case');

console.log('PASS test-v16-formal-immersion');
