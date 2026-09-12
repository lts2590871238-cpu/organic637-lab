const assert = require('assert');
global.window = { Organic637: {} };
require('../../data/v16-story.js');
require('../../js/learning-engine.js');
require('../../js/narrative-engine.js');

const NS = window.Organic637;
const N = NS.V16Narrative;
const state = NS.Learning.freshState({});
state.skills = { sentinel: { mastery: 88 } };

assert.equal(N.canUnlockFact(state, 'lin_preserved_evidence', 11), false, 'B3 preservation truth must stay locked before Day12');
assert.equal(N.canUnlockFact(state, 'lin_preserved_evidence', 12), true, 'B3 preservation truth can unlock on Day12');
assert.equal(N.canUnlockFact(state, 'final_sample_wrong_identity', 14), false, 'stereo mismatch must stay locked before Day15');
assert.equal(N.canUnlockFact(state, 'final_sample_wrong_identity', 15), true, 'stereo mismatch can unlock on Day15');

const beforeSkill = JSON.stringify(state.skills);
N.completeScene(state, 'case01-open', 1);
assert.ok(state.v16.story.unlockedScenes.includes('case01-open'));
assert.ok(state.v16.story.confirmedFacts.includes('zero_sample_missing_appearance'));
assert.equal(JSON.stringify(state.skills), beforeSkill, 'reading story must never update chemistry mastery');
assert.throws(() => N.completeScene(state, 'not-a-scene', 1), /Unknown V16 scene/);

const facts = N.getUnlockedFacts(state);
assert.equal(facts.length, 1);
assert.equal(facts[0].id, 'zero_sample_missing_appearance');
console.log('PASS test-v16-narrative');
