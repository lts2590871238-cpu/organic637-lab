const assert = require('assert');
global.window = { Organic637: {} };
require('../../data/v16-story.js');
require('../../js/learning-engine.js');
require('../../js/narrative-engine.js');
require('../../js/case-board.js');

const NS = window.Organic637;
const state = NS.Learning.freshState({});
state.currentDay = 1;
NS.V16Narrative.completeScene(state, 'case01-open', 1);

const model = NS.V16CaseBoard.getModel(state);
assert.ok(model.facts.some(row => row.id === 'zero_sample_missing_appearance'));
assert.ok(!model.facts.some(row => row.id === 'final_sample_wrong_identity'), 'locked Day15 truth must not leak');
assert.ok(model.testimony.some(row => row.id === 'lin_record_version'));
assert.equal('likelihood' in model, false);
assert.equal('probability' in model, false);
assert.equal('suspectScores' in model, false);

NS.V16CaseBoard.setPersonalMark(state, 'xuLinchuan', 'focus');
assert.equal(NS.V16CaseBoard.getModel(state).personalMarks.xuLinchuan, 'focus');
NS.V16CaseBoard.setPersonalMark(state, 'xuLinchuan', null);
assert.equal(NS.V16CaseBoard.getModel(state).personalMarks.xuLinchuan, undefined);
assert.throws(() => NS.V16CaseBoard.setPersonalMark(state, 'xuLinchuan', 'guilty'), /Invalid case-board mark/);

console.log('PASS test-v16-case-board');
