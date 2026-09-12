const assert = require('assert');
const fs = require('fs');

global.window = global;
window.Organic637 = {};
window.Organic637Data = { days: {} };
require('../../data/day20.js');
require('../../data/v16-story.js');
require('../../data/v16-director.js');
require('../../js/director-engine.js');
try { require('../../js/v16-repair-presentation.js'); } catch (error) {
  assert.fail(`repair presentation adapter missing: ${error.message}`);
}

const NS = window.Organic637;
const map = NS.V16RepairPresentation?.getRepairPresentation;
assert.equal(typeof map, 'function', 'getRepairPresentation must be exported');
assert.equal(map('stereo.rs'), '3d', 'R/S repair must use 3D');
assert.equal(map('stereo.cip'), '3d', 'CIP repair must use 3D');
assert.equal(map('substitution.stereochemistry'), '3d', 'SN2 spatial repair must use 3D');
assert.equal(map('elimination.antiperiplanar'), '3d', 'E2 anti-periplanar repair must use 3D');
assert.equal(map('mechanism.nucleophilic_attack'), 'electron', 'arrow mechanism repair must use electron presentation');
assert.equal(map('alkene.condition_discrimination'), 'decision-map', 'condition repair must use decision map');
assert.equal(map('elimination.competition'), 'decision-map', 'four-way routing repair must use decision map');
assert.equal(map('structure.nmr_splitting'), 'evidence-board', 'NMR repair must use evidence board');
assert.equal(map('synthesis.route_evaluation'), 'route-board', 'synthesis repair must use route board');
assert.equal(map('ranking.acidity'), 'standard', 'unmapped skill must safely fall back to standard');

const report = NS.V16_STORY.finalReport;
assert.ok(report, 'final case report config missing');
assert.equal(report.actors.guYao.correct, 'operation_error');
assert.equal(report.actors.linCen.correct, 'procedure_violation');
assert.equal(report.actors.xuLinchuan.correct, 'record_falsification');
for (const sceneId of ['case20-open','case20-truth','case20-close']) {
  assert.ok(NS.V16_STORY.scenes[sceneId], `${sceneId} missing`);
}
assert.match(NS.V16_STORY.scenes['case20-close'].panels.at(-1).caption, /唯一从来没有撒谎的证人/, 'final line must preserve the approved ending');

const plan = NS.V16Director.getDayPlan(20);
assert.ok(plan, 'Day20 Director plan missing');
assert.equal(NS.V16Director.estimateMinutes(20), 54, 'Day20 must stay at the approved 54-minute test-build budget');
assert.deepEqual(NS.V16Director.validateDay(20).errors, [], 'Day20 Director plan must validate');
assert.ok(plan.sequence.some(step => step.type === 'case-report'), 'final case report must happen before repair');
assert.ok(plan.sequence.some(step => step.type === 'adaptive-repair'), 'Top3 adaptive repair step missing');
assert.ok(plan.sequence.some(step => step.type === 'final-boss'), 'short repaired-skill Boss missing');
assert.ok(plan.sequence.every(step => step.introducesCoreConcept !== true), 'Day20 must introduce no new core concepts');

const appSource = fs.readFileSync('app.js','utf8');
assert.match(appSource, /function\s+directorCaseReportTask\s*\(/, 'app must render final case report');
assert.match(appSource, /function\s+directorAdaptiveRepairTask\s*\(/, 'app must render Top3 repairs');
assert.match(appSource, /function\s+directorFinalBossTask\s*\(/, 'app must render repaired-skill micro Boss');
assert.match(appSource, /NS\.Learning\.buildDay20Plan\(/, 'Day20 must reuse existing Top3 planner');
assert.match(appSource, /getRepairPresentation\(/, 'Day20 must use presentation adapter');
assert.match(appSource, /isTransfer:\s*context\.isTransfer\s*===\s*true/, 'micro Boss must be recorded as transfer evidence');
assert.match(appSource, /const\s+fullBoss\s*=\s*Store\.state\.examResults\?\.full150\s*\|\|\s*Store\.state\.examResults\?\.\[19\]/, 'final summary must use a real full-150 result for 120-point evidence');
assert.match(appSource, /const\s+coreAudit\s*=\s*Store\.state\.examResults\?\.v16Day19Core/, 'final summary must keep the core audit separate from the full-150 result');
assert.match(appSource, /fullBoss\s*&&\s*Number\(fullBoss\.score150/, '120-point conclusion must require a completed full-150 exam');
assert.match(appSource, /mode:\s*'required'/, 'spatial Top3 repair must use the required 3D gate with 2D fallback, not a skippable decoration');

console.log('PASS test-v16-day20');
