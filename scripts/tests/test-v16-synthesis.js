const assert = require('assert');
const fs = require('fs');

global.window = global;
window.Organic637 = {};
window.Organic637Data = { days: {} };
require('../../data/day17.js');
require('../../data/day18.js');
require('../../data/synthesis-cases.js');
require('../../data/v16-story.js');
require('../../data/v16-director.js');
require('../../js/director-engine.js');
require('../../js/narrative-engine.js');
require('../../js/synthesis.js');

const Data = window.Organic637Data;
const NS = window.Organic637;
const kase = (Data.SYNTHESIS_CASES || []).find(row => row.id === 'lab20-hidden-route');
assert.ok(kase, 'LAB-20 hidden-route synthesis case missing');

const preferred = ['lab20-e1','lab20-e2','lab20-e3'];
const preferredResult = NS.Synthesis.evaluateRoute(kase, preferred);
assert.equal(preferredResult.reachedTarget, true, 'approved hidden route must reach L20-F');
assert.equal(preferredResult.correct, true, 'approved hidden route must be chemically valid');
assert.equal(preferredResult.preferred, true, 'approved hidden route must be preferred');

const wrongPath = ['lab20-e1','lab20-e4','lab20-e5'];
const wrongEdges = wrongPath.map(id => kase.graph.edges.find(edge => edge.id === id));
assert.equal(wrongEdges[1].status, 'yellow', 'plausible wrong branch should be allowed before later failure');
assert.equal(wrongEdges[1].compatibility, true, 'first wrong branch step should remain chemically possible');
assert.equal(wrongEdges[2].status, 'red', 'later step should expose the compatibility failure');
assert.equal(wrongEdges[2].compatibility, false, 'later failure must be a declared compatibility failure');
const wrongResult = NS.Synthesis.evaluateRoute(kase, wrongPath);
assert.equal(wrongResult.correct, false, 'wrong branch must not be accepted as a valid route');
assert.ok(wrongResult.compatibility < 1, 'wrong branch must lose compatibility score');

for (const day of [17,18]) {
  const plan = NS.V16Director.getDayPlan(day);
  assert.ok(plan, `Day${day} Director plan missing`);
  assert.ok(NS.V16Director.estimateMinutes(day) <= 60, `Day${day} must stay within 60 minutes`);
  assert.deepEqual(NS.V16Director.validateDay(day).errors, [], `Day${day} must satisfy Director pacing rules`);
  assert.ok(plan.sequence.some(step => step.type === 'synthesis' && step.ref === 'lab20-hidden-route'), `Day${day} must use the persistent LAB-20 synthesis case`);
}

const d17 = NS.V16Director.getDayPlan(17);
const d18 = NS.V16Director.getDayPlan(18);
assert.ok(d17.sequence.some(step => step.ref === 'd17-lesson-carbonledger'), 'Day17 must include carbon-ledger reasoning');
assert.ok(d17.sequence.some(step => step.ref === 'd17-lesson-laststep'), 'Day17 must include last-step retrosynthesis');
assert.ok(d18.sequence.some(step => step.ref === 'd18-lesson-protection'), 'Day18 must teach protection when compatibility makes it necessary');
assert.ok(d18.sequence.some(step => step.ref === 'd18-protect-carbonyl-01'), 'Day18 must practice carbonyl protection');
assert.ok(d18.sequence.some(step => step.ref === 'd18-protect-amine-01'), 'Day18 must practice amine protection');

const story = NS.V16_STORY;
for (const sceneId of ['case17-open','case17-cliff','case18-open','case18-evidence','case18-close']) {
  assert.ok(story.scenes[sceneId], `${sceneId} story scene missing`);
}
const narrativeState = { v16: { story: {} } };
NS.V16Narrative.completeScene(narrativeState, 'case18-open', 18);
NS.V16Narrative.completeScene(narrativeState, 'case18-evidence', 18);
assert.ok(!narrativeState.v16.story.confirmedFacts.includes('xu_deleted_record'), 'record falsification must stay locked until evidence synthesis closes');
NS.V16Narrative.completeScene(narrativeState, 'case18-close', 18);
assert.ok(narrativeState.v16.story.confirmedFacts.includes('xu_deleted_record'), 'Day18 closing evidence should unlock record falsification');

const appSource = fs.readFileSync('app.js', 'utf8');
assert.match(appSource, /function\s+directorSynthesisTask\s*\(/, 'app must provide Director synthesis adapter');
assert.match(appSource, /step\.type\s*===\s*['"]synthesis['"]/, 'Director must route synthesis steps through the existing synthesis engine');
assert.doesNotMatch(appSource, /delete\s+Store\.state\.synthesis\.cases\[kase\.id\]/, 'replaying Day18 route review must not erase the saved Day17 completion record');

console.log('PASS test-v16-synthesis');
