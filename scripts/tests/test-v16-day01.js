const assert = require('assert');
global.window = global;
window.Organic637 = {};
window.Organic637Data = { days: {} };
require('../../data/day01.js');
require('../../data/beginner-foundations.js');
require('../../data/v16-story.js');
require('../../data/v16-director.js');
require('../../js/director-engine.js');

const day = window.Organic637Data.days[1];
const D = window.Organic637.V16Director;
const plan = D.getDayPlan(1);
const lessonIds = new Set((day.lessons || []).map(x => x.id));
const questionIds = new Set((day.questions || []).map(x => x.id));
const sceneIds = new Set(Object.keys(window.Organic637.V16_STORY.scenes || {}));

assert.equal(D.estimateMinutes(1), 49);
assert.deepEqual(D.validateDay(1).errors, []);
assert.equal(plan.sequence[0].type, 'comic');
assert.equal(plan.sequence.at(-1).sceneId, 'case01-cliffhanger');
assert.ok(plan.sequence.some(step => step.type === 'case-apply'));
assert.ok(plan.sequence.some(step => step.mode === '637_exit'));
assert.ok(plan.sequence.filter(step => ['comic','interaction','case-apply','question','question-group'].includes(step.type)).length >= 7, 'Day1 must change psychological mode repeatedly');

for (const step of plan.sequence) {
  if (step.type === 'lesson') assert.ok(lessonIds.has(step.ref), `missing Day1 lesson ref: ${step.ref}`);
  if (['question','interaction','case-apply'].includes(step.type)) assert.ok(questionIds.has(step.ref), `missing Day1 question/interaction ref: ${step.ref}`);
  if (step.type === 'question-group') for (const ref of step.refs || []) assert.ok(questionIds.has(ref), `missing Day1 question-group ref: ${ref}`);
  if (step.type === 'comic') assert.ok(sceneIds.has(step.sceneId), `missing Day1 comic scene: ${step.sceneId}`);
}

const finalTenStart = D.estimateMinutes(1) - 10;
let elapsed = 0;
for (const step of plan.sequence.filter(x => x.optional !== true)) {
  if (elapsed >= finalTenStart) assert.notEqual(step.introducesCoreConcept, true, `new core concept too late at ${step.id}`);
  elapsed += Number(step.minutes || 0);
}

console.log('PASS test-v16-day01');
