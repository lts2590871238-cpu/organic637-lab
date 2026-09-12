const assert = require('assert');
const fs = require('fs');

global.window = global;
window.Organic637 = {};
window.Organic637Data = { days: {} };
require('../../data/skills.js');
require('../../data/day19.js');
require('../../data/v16-story.js');
try { require('../../data/v16-exam.js'); } catch (error) {
  assert.fail(`V16 exam config missing: ${error.message}`);
}
require('../../data/v16-director.js');
require('../../js/director-engine.js');

const Data = window.Organic637Data;
const NS = window.Organic637;
const bank = Data.days[19].questions;
const bankIds = new Set(bank.map(q => q.id));
const core = NS.V16_EXAM?.day19Core;
const full = NS.V16_EXAM?.full150;
assert.ok(core, 'V16 Day19 core audit config missing');
assert.ok(full, 'full150 config missing');
assert.ok(Array.isArray(core.itemIds) && core.itemIds.length >= 6, 'core audit must contain a diagnostic queue');
core.itemIds.forEach(id => assert.ok(bankIds.has(id), `core audit references missing Day19 item: ${id}`));

const requiredDomains = ['reaction','mechanism','structure','stereo','spectroscopy','synthesis'];
const covered = new Set((core.items || []).flatMap(item => item.coverage || []));
requiredDomains.forEach(domain => assert.ok(covered.has(domain), `core audit missing ${domain} coverage`));
const minutes = (core.items || []).reduce((sum, item) => sum + Number(item.minutes || 0), 0);
assert.ok(minutes <= 60, `core audit exceeds 60 minutes: ${minutes}`);
assert.ok(minutes >= 50, `core audit is too short for a meaningful diagnostic audit: ${minutes}`);
assert.equal(core.ui.hints, false, 'core exam must disable hints');
assert.equal(core.ui.immediateExplanation, false, 'core exam must disable immediate explanations');
assert.equal(core.ui.story, false, 'core exam must remove story UI');
assert.equal(core.ui.threeD, false, 'core exam must remove 3D UI');

assert.deepEqual(full.itemIds, bank.map(q => q.id), 'full150 must preserve the entire original Day19 bank in original order');
assert.equal(bank.reduce((sum, q) => sum + Number(q.points || 0), 0), 150, 'legacy Day19 bank must remain exactly 150 points');
assert.equal(full.points, 150, 'full150 config must keep 150-point semantics');

const directorSource = fs.readFileSync('data/v16-director.js', 'utf8');
const day19Definitions = (directorSource.match(/\n\s{6}19:\s*\{/g) || []).length;
assert.equal(day19Definitions, 1, 'Day19 Director config must have exactly one 19: definition');

const plan = NS.V16Director.getDayPlan(19);
assert.ok(plan, 'Day19 Director plan missing');
assert.ok(NS.V16Director.estimateMinutes(19) <= 60, 'Day19 mainline must stay <=60 minutes');
assert.deepEqual(NS.V16Director.validateDay(19).errors, [], 'Day19 Director plan must validate cleanly');
assert.ok(plan.sequence.some(step => step.type === 'exam' && step.ref === 'day19-core'), 'Day19 Director must invoke day19-core exam');
assert.ok(NS.V16_STORY.scenes['case19-open'], 'Day19 must keep only the brief approved opening scene before formal exam mode');

const appSource = fs.readFileSync('app.js', 'utf8');
assert.match(appSource, /function\s+directorCoreExamTask\s*\(/, 'app must provide a dedicated V16 core exam runner');
assert.match(appSource, /function\s+coreExamResultsPage\s*\(/, 'app must provide percentage/domain core results');
assert.match(appSource, /function\s+full150ExamPage\s*\(/, 'app must preserve a separate full 150-point exam runner');
assert.match(appSource, /#full-exam\/19/, 'full150 exam needs a separate route/entry');
assert.match(appSource, /NS\.Learning\.topWeakSkills\(/, 'Day19 core audit must reuse existing Top3 logic');
assert.doesNotMatch(appSource, /v16Day19Core[^\n]{0,200}score150\s*:/, 'core audit must not manufacture a /150 score');

console.log('PASS test-v16-day19');
