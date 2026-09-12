const assert = require('assert');
global.window = { Organic637: {} };
require('../../js/learning-engine.js');
const Learning = window.Organic637.Learning;

const legacy = {
  schemaVersion: 2,
  version: 2,
  skills: { 'reaction.sn2': { mastery: 72 } },
  attempts: [{ id: 'old-attempt', primarySkill: 'reaction.sn2', correct: true, timestamp: 1000 }],
  reviewHistory: [{ id: 'old-review' }],
  examResults: { day19: { score: 0.8 } },
  threeDProgress: { sn2_backside: { completed: true } },
  detective: { cases: { old: { completed: true } } },
  synthesis: { cases: { old: { completed: true } } },
  days: { 4: { lessonIndex: 2, taskIndex: 1, finished: false } }
};

const next = Learning.migrateState(JSON.parse(JSON.stringify(legacy)));
assert.equal(next.schemaVersion, 3);
assert.equal(next.version, 3);
assert.equal(next.skills['reaction.sn2'].mastery, 72);
assert.equal(next.threeDProgress.sn2_backside.completed, true);
assert.equal(next.detective.cases.old.completed, true);
assert.equal(next.synthesis.cases.old.completed, true);
assert.deepEqual(next.reviewHistory, [{ id: 'old-review' }]);
assert.equal(next.examResults.day19.score, 0.8);
assert.ok(next.v16 && next.v16.story);
assert.equal(next.v16.enabled, true);
assert.deepEqual(next.v16.story.unlockedScenes, []);
assert.equal(next.days[4].v16.cursor, 0);
assert.deepEqual(next.days[4].v16.completedSteps, {});
assert.equal(next.days[4].v16.migratedFromLegacy, false);

const v16Root = Learning.ensureV16RootState(next);
const day4 = Learning.ensureV16DayState(next, 4);
assert.strictEqual(v16Root, next.v16);
assert.strictEqual(day4, next.days[4].v16);

console.log('PASS test-v16-state');
