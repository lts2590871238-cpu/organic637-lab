const assert = require('assert');
const fs = require('fs');
const path = require('path');

global.window = global;
window.Organic637 = {};
window.Organic637Data = { days: {} };
require('../../data/day15.js');
require('../../data/v16-story.js');
require('../../data/3d-lessons.js');
require('../../data/v16-director.js');
require('../../js/director-engine.js');
require('../../js/narrative-engine.js');
require('../../js/chem3d.js');

const Data = window.Organic637Data;
const NS = window.Organic637;

for (const ref of ['tetrahedral_core','mirror_overlap','cip_rs_core','l20_stereo_compare']) {
  assert.ok(Data.THREED_LESSONS[ref], `${ref} required Day15 3D asset missing`);
}

const compare = Data.THREED_LESSONS.l20_stereo_compare;
assert.equal(compare.kind, 'stereo-compare');
assert.equal(compare.samples.left.id, 'L20-0');
assert.equal(compare.samples.right.id, 'L20-F');
assert.equal(compare.samples.left.formula, 'C8H9BrO');
assert.equal(compare.samples.right.formula, 'C8H9BrO');
assert.equal(compare.samples.left.stereochemistry, 'S');
assert.equal(compare.samples.right.enantiomerRatio, 'S:R = 51:49');
for (const action of ['rotateSynchronized','rotateIndependent','toggleLabels','identifyKeyCenter','compareAttempt','bridge2D']) {
  assert.ok(compare.requiredActions.includes(action), `l20 compare missing required action ${action}`);
}
assert.match(compare.evidenceNote, /手性HPLC|旋光/);
assert.match(compare.evidenceNote, /普通.*IR.*NMR|achiral/i, 'compare must explicitly avoid claiming ordinary spectra distinguish enantiomeric identity');

const state = { threeDProgress: {} };
for (const action of compare.requiredActions) NS.Chem3D.recordAction(state, 'l20_stereo_compare', action);
assert.equal(NS.Chem3D.isCompleted(state, 'l20_stereo_compare'), true, 'all compare actions should complete the gate');
const fallback = { threeDProgress: {} };
assert.equal(NS.Chem3D.completeFallback(fallback, 'l20_stereo_compare', true), true, '2D fallback must prevent a Day15 deadlock');

const day15 = NS.V16Director.getDayPlan(15);
assert.ok(day15, 'Day15 Director plan missing');
assert.ok(NS.V16Director.estimateMinutes(15) <= 60, 'Day15 must stay within 60 minutes');
assert.deepEqual(NS.V16Director.validateDay(15).errors, [], 'Day15 must satisfy Director pacing rules');
const story = NS.V16_STORY;
const lessonIds = new Set((Data.days[15].lessons || []).map(row => row.id));
const questionIds = new Set((Data.days[15].questions || []).map(row => row.id));
const sceneIds = new Set(Object.keys(story.scenes || {}));
for (const step of day15.sequence) {
  if (step.type === 'lesson') assert.ok(lessonIds.has(step.ref), `missing Day15 lesson ref ${step.ref}`);
  if (['question','case-apply'].includes(step.type)) assert.ok(questionIds.has(step.ref), `missing Day15 question ref ${step.ref}`);
  if (step.type === 'question-group') for (const ref of step.refs || []) assert.ok(questionIds.has(ref), `missing Day15 question-group ref ${ref}`);
  if (step.type === 'comic') assert.ok(sceneIds.has(step.sceneId), `missing Day15 scene ${step.sceneId}`);
  if (step.type === '3d') assert.ok(Data.THREED_LESSONS[step.ref], `missing Day15 3D ref ${step.ref}`);
}
const sequence = day15.sequence;
assert.equal(sequence[0].type, 'comic');
assert.equal(sequence[1].type, '3d', 'Day15 must go spatial before text');
assert.equal(sequence[1].ref, 'tetrahedral_core');
const compareIndex = sequence.findIndex(step => step.ref === 'l20_stereo_compare');
const exitIndex = sequence.findIndex(step => step.mode === '637_exit');
assert.ok(compareIndex > 0 && exitIndex > compareIndex, 'case stereo comparison must happen before 637 exit');

assert.equal(typeof NS.V16Narrative?.canUnlockFact, 'function', 'narrative engine should guard Day15 fact unlocks');

for (const sceneId of ['case15-open','case15-proof','case15-close']) {
  assert.ok(story.scenes[sceneId], `${sceneId} story scene missing`);
}
const beforeProof = { v16: { story: {} } };
NS.V16Narrative.completeScene(beforeProof, 'case15-open', 15);
assert.ok(!beforeProof.v16.story.confirmedFacts.includes('final_sample_wrong_identity'), 'opening scene must not reveal stereo mismatch');
NS.V16Narrative.completeScene(beforeProof, 'case15-close', 15);
assert.ok(beforeProof.v16.story.confirmedFacts.includes('final_sample_wrong_identity'), 'closing evidence scene should unlock stereo mismatch');
assert.equal(story.factGates.final_sample_wrong_identity, 15, 'stereo mismatch cannot unlock before Day15');
assert.ok(story.chemistryCase.hardRules.some(row => /普通.*IR\/NMR|achiral IR\/NMR/i.test(row)), 'story chemistry must preserve achiral-spectrum limitation');

const source = fs.readFileSync(path.join(__dirname, '../../js/chem3d.js'), 'utf8');
assert.match(source, /mountStereoCompare/, 'Chem3D must provide a dedicated stereo compare renderer');
assert.match(source, /synchronized/i, 'stereo compare renderer must expose synchronized rotation');

console.log('PASS test-v16-stereo');
