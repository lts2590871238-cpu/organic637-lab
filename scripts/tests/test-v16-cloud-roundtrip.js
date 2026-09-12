const assert = require('assert');
global.window = { Organic637: {} };
require('../../js/learning-engine.js');
require('../../js/v16-cloud-codec.js');

const NS = window.Organic637;
const Learning = NS.Learning;
const Codec = NS.V16CloudCodec;

const registry = { 1: { questions: [] }, 15: { questions: [] } };
const state = Learning.migrateState(Learning.freshState(registry), registry);
state.updatedAt = 987654321;
state.currentDay = 15;
state.days[15] = {
  day: 15,
  lessonIndex: 3,
  taskIndex: 2,
  finished: false,
  v16: {
    cursor: 7,
    completedSteps: { 'case15-open': 111, 'l20-compare': 222 },
    migratedFromLegacy: true,
    stepState: { 'l20-compare': { attempts: 2 } }
  }
};
state.v16.story.unlockedScenes = ['case01-open', 'case15-open'];
state.v16.story.confirmedFacts = ['record_version_mismatch', 'stereo_mismatch_confirmed'];
state.v16.story.contradictions = ['record_changed_after_sample_move'];
state.v16.story.routeRecovery = 78;
state.v16.story.personalMarks = { xuLinchuan: 'focus' };
state.skills = { 'stereo.rs': { mastery: 81, attempts: 5 } };
state.attempts = Array.from({ length: 205 }, (_, i) => ({ attemptId: `a-${i}`, day: 15, primarySkill: 'stereo.rs', correct: i % 2 === 0, timestamp: i + 1 }));
state.reviewHistory = [{ questionId: 'r-1', at: 123 }];
state.threeDProgress = {
  tetrahedral_core: { completed: true },
  l20_stereo_compare: { completed: true, step: 4, interactions: { rotate: true } }
};
state.detective = { cases: { x17: { completed: true } } };
state.synthesis = { cases: { routeB: { completed: true } } };
state.examResults = { v16Day19Core: { percent: 82 } };

const rawChunks = Codec.chunks(state);
assert.ok(rawChunks.core && rawChunks.skills && rawChunks['attempts:0'] && rawChunks['attempts:2'], 'codec must split core, skills and 100-attempt chunks');
assert.equal(rawChunks.core.v16.story.routeRecovery, 78);
assert.equal(rawChunks.core.days[15].v16.cursor, 7);

// Match the Worker pull shape: each stored value is wrapped as { data }.
const wrapped = Object.fromEntries(Object.entries(rawChunks).map(([key, data]) => [key, { data }]));
const decoded = Codec.fromChunks(wrapped, () => Learning.freshState({ 1: { questions: [] } }));
const restored = Learning.migrateState(decoded, registry);

assert.equal(restored.schemaVersion, 3);
assert.equal(restored.days[15].v16.cursor, 7, 'Director cursor must survive cloud roundtrip');
assert.deepEqual(restored.days[15].v16.completedSteps, state.days[15].v16.completedSteps);
assert.deepEqual(restored.days[15].v16.stepState, state.days[15].v16.stepState);
assert.deepEqual(restored.v16.story.unlockedScenes, state.v16.story.unlockedScenes);
assert.deepEqual(restored.v16.story.confirmedFacts, state.v16.story.confirmedFacts);
assert.equal(restored.v16.story.routeRecovery, 78);
assert.equal(restored.skills['stereo.rs'].mastery, 81);
assert.equal(restored.attempts.length, 205);
assert.deepEqual(restored.reviewHistory, state.reviewHistory);
assert.equal(restored.threeDProgress.l20_stereo_compare.completed, true);
assert.equal(restored.detective.cases.x17.completed, true);
assert.equal(restored.synthesis.cases.routeB.completed, true);
assert.equal(restored.examResults.v16Day19Core.percent, 82);

// Backward tolerance: raw (unwrapped) chunks should also decode.
const decodedRaw = Codec.fromChunks(rawChunks, () => Learning.freshState({ 1: { questions: [] } }));
assert.equal(decodedRaw.v16.story.routeRecovery, 78);
assert.equal(decodedRaw.attempts.length, 205);

const fs = require('fs');
const path = require('path');
const appSource = fs.readFileSync(path.join(__dirname, '../../app.js'), 'utf8');
const indexSource = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
assert.match(appSource, /V16CloudCodec\?\.chunks/, 'app Cloud.push path must use the tested codec');
assert.match(appSource, /V16CloudCodec\?\.fromChunks/, 'app Cloud.pull path must use the tested codec');
assert.ok(indexSource.indexOf('js/v16-cloud-codec.js') < indexSource.indexOf('app.js'), 'cloud codec must load before app.js');

console.log('PASS test-v16-cloud-roundtrip');
