const assert = require('assert');
const fs = require('fs');
const path = require('path');

global.window = {};
require('../../data/detective-cases.js');
require('../../data/v16-story.js');
require('../../data/v16-director.js');
require('../../js/director-engine.js');

const Data = window.Organic637Data;
const NS = window.Organic637;
const kase = Data.DETECTIVE_CASES.find(row => row.id === 'lab20-x17');
assert.ok(kase, 'LAB-20 X-17 detective case missing');
assert.equal(kase.formula, 'C8H7BrO');
assert.equal(kase.dbe, 5);
assert.equal(kase.correctCandidate, 'para');
assert.ok(kase.ir?.peaks?.some(row => row.wavenumber >= 1650 && row.wavenumber <= 1710), 'X-17 must carry an aromatic/conjugated carbonyl IR clue');
assert.ok(kase.nmr?.signals?.filter(row => row.integral === 2).length >= 2, 'X-17 NMR must encode para-ring symmetry as two 2H aromatic sets');

const day13 = NS.V16Director.getDayPlan(13);
const day14 = NS.V16Director.getDayPlan(14);
assert.ok(day13 && day14, 'Day13/14 Director plans missing');
const d13 = day13.sequence.find(step => step.type === 'detective');
const d14 = day14.sequence.find(step => step.type === 'detective');
assert.equal(d13?.caseId, 'lab20-x17');
assert.equal(d14?.caseId, 'lab20-x17');
assert.equal(d13?.pauseAfterStage, 1, 'Day13 must stop after IR instead of leaking NMR');
assert.equal(d14?.resumeStage, 2, 'Day14 must resume the same case at NMR');

const story = NS.V16_STORY;
const stereoFact = Object.values(story.facts || {}).find(row => row.id === 'stereoMismatchConfirmed' || row.key === 'stereoMismatchConfirmed');
if (stereoFact?.revealDay != null) assert.ok(Number(stereoFact.revealDay) >= 15, 'stereo mismatch must stay locked through Day14');

const appSource = fs.readFileSync(path.join(__dirname, '../../app.js'), 'utf8');
const detectiveSource = fs.readFileSync(path.join(__dirname, '../../js/detective.js'), 'utf8');
assert.match(appSource, /step\.type === ['"]detective['"]/, 'Director must route detective steps');
assert.match(appSource, /pauseAfterStage/, 'Director detective adapter must pass Day13 stage cap');
assert.match(detectiveSource, /onPartialComplete/, 'existing detective engine must support a staged pause without a second minigame');

console.log('PASS test-v16-detective');
