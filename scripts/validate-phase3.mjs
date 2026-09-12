import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { webcrypto } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = { console, crypto: webcrypto, setTimeout, clearTimeout };
context.window = context;
context.globalThis = context;
vm.createContext(context);

const load = rel => vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), context, { filename: rel });
['data/skills.js','data/manifest.js','data/day01.js','data/day02.js','data/day03.js','data/day04.js','js/learning-engine.js','js/review-engine.js','js/interactions.js'].forEach(load);

const data = context.Organic637Data;
if (!data.days[1] && context.ORGANIC637_DAY01) {
  const old = context.ORGANIC637_DAY01;
  const normalize = (q, role='practice') => ({ ...q, day: 1, type: q.type || 'choice', role: q.role || role, primarySkill: q.primarySkill || q.skill, skillIds: q.skillIds || [q.primarySkill || q.skill], hints: q.hints || [q.hint1,q.hint2].filter(Boolean), explanationLayers: q.explanationLayers || { short:q.explanation||'', why:q.whyNot||'', full:[q.explanation,q.whyNot].filter(Boolean).join(' ') } });
  const repairs = {};
  for (const [skill, rows] of Object.entries(old.repairs || {})) repairs[skill] = rows.map(q => normalize(q, 'repair'));
  data.days[1] = { ...old, questions: old.questions.map((q,i) => normalize(q, i===0?'learn':i===old.questions.length-1?'transfer':'practice')), repairs };
}

const assert = (cond, msg) => { if (!cond) throw new Error(msg); };
const skills = new Set(data.SKILLS.map(x => x.id));
const supported = new Set(['choice','multi-choice','ranking','route','synthesis','structure-choice','electron-arrow','numeric','text-short','detective']);
const ids = new Set();
for (let day=1; day<=4; day++) {
  const d = data.days[day];
  assert(d, `missing day ${day}`);
  assert(Array.isArray(d.questions) && d.questions.length >= 5, `day ${day} has too few questions`);
  const all = [...d.questions, ...Object.values(d.repairs || {}).flat()];
  for (const q of all) {
    assert(q.id && !ids.has(q.id), `duplicate question id ${q.id}`);
    ids.add(q.id);
    assert(q.primarySkill, `missing primarySkill ${q.id}`);
    assert(skills.has(q.primarySkill), `unknown primarySkill ${q.primarySkill} in ${q.id}`);
    assert(supported.has(q.type || 'choice'), `unsupported type ${q.type} in ${q.id}`);
    if (q.type === 'ranking') {
      const itemIds = new Set((q.items || []).map(x => String(x.id)));
      assert((q.correctOrder || []).length === itemIds.size, `bad ranking length ${q.id}`);
      assert((q.correctOrder || []).every(id => itemIds.has(String(id))), `bad ranking ref ${q.id}`);
    }
    if (q.type === 'route' || (q.type === 'synthesis' && q.graph)) {
      const nodes = new Set((q.graph?.nodes || []).map(x => String(x.id)));
      const edges = new Set((q.graph?.edges || []).map(x => String(x.id)));
      assert(nodes.has(String(q.graph?.start)), `bad route start ${q.id}`);
      assert(nodes.has(String(q.graph?.target)), `bad route target ${q.id}`);
      for (const e of q.graph?.edges || []) {
        assert(nodes.has(String(e.from)) && nodes.has(String(e.to)), `bad route edge ${q.id}/${e.id}`);
        assert(['green','yellow','orange','red'].includes(e.status || 'green'), `bad status ${q.id}/${e.id}`);
      }
      for (const route of q.answer?.acceptedPaths || q.graph?.referenceRoutes || []) for (const edgeId of route) assert(edges.has(String(edgeId)), `bad accepted edge ${q.id}/${edgeId}`);
    }
    if (q.type === 'synthesis' && !q.graph) {
      const optionIds = new Set((q.options || []).map((x,i) => String(typeof x === 'object' ? x.id ?? i : i)));
      assert(optionIds.has(String(q.answer)), `bad simple synthesis answer ${q.id}`);
    }
    if (q.type === 'detective') {
      const candidates = new Set((q.case?.candidates || []).map(x => String(x.id)));
      assert(candidates.has(String(q.answer?.candidateId)), `bad detective answer ${q.id}`);
    }
    if (q.type === 'electron-arrow') {
      const spots = new Set((q.hotspots || []).map(x => String(x.id)));
      for (const a of q.expectedArrows || []) assert(spots.has(String(a.source)) && spots.has(String(a.target)), `bad arrow ref ${q.id}`);
    }
    if (q.type === 'structure-choice') {
      const optionIds = new Set((q.options || []).map((x,i) => String(typeof x === 'object' ? x.id ?? i : i)));
      assert(optionIds.has(String(q.answer)), `bad structure answer ${q.id}`);
    }
  }
}

const L = context.Organic637.Learning;
const I = context.Organic637.Interactions;
const oldState = { version:1, currentDay:1, completedDays:[], day1:{lessonIndex:1,questionIndex:2,phase:'questions',queue:['pi-center-1'],answered:{'pi-center-1':{correct:true}},repairUsed:{},finished:false}, skills:{'alkene.pi_center':{mastery:55,attempts:2,correct:1,lastSeen:'2026-09-07',nextReview:'2026-09-08'}}, attempts:[{id:'a1',day:1,questionId:'pi-center-1',skill:'alkene.pi_center',correct:true,confidence:'sure',hints:0,at:Date.now()}] };
const migrated = L.migrateState(oldState, data.days);
assert(migrated.schemaVersion === 3 && migrated.version === 3 && migrated.days[1].taskIndex === 2 && migrated.days[1].v16?.cursor === 0, 'v1 migration failed');
assert(migrated.attempts.length === 1 && migrated.skills['alkene.pi_center'].mastery === 55, 'v1 evidence lost');
assert(L.evidenceQuality({correct:true,hintsUsed:0,confidence:'sure'}) > L.evidenceQuality({correct:true,hintsUsed:0,confidence:'guess'}), 'confidence weighting failed');
assert(L.evidenceQuality({correct:true,hintsUsed:0,confidence:'guess'}) > L.evidenceQuality({correct:true,hintsUsed:2,confidence:'sure'}), 'hint weighting failed');
const crossState = L.freshState(data.days);
const crossQ = data.days[3].questions.find(q => q.id === 'd03-base-01');
L.recordAttempt(crossState, crossQ, { correct:true, firstAttempt:true, hintsUsed:0, confidence:'sure', date:'2026-09-07', timestamp:new Date('2026-09-07T12:00:00').getTime() });
L.recordAttempt(crossState, crossQ, { correct:true, firstAttempt:true, hintsUsed:0, confidence:'sure', date:'2026-09-08', timestamp:new Date('2026-09-08T12:00:00').getTime(), isReview:true });
assert(crossState.skills[crossQ.primarySkill].crossDayVerified, 'cross-day verification failed');
const raw = crossState.skills[crossQ.primarySkill].mastery;
crossState.skills[crossQ.primarySkill].nextReviewAt = '2026-09-01';
assert(L.getEffectiveMastery(crossState.skills[crossQ.primarySkill], '2026-09-08') < raw, 'forgetting penalty failed');

const ranking = data.days[3].questions.find(q => q.type === 'ranking');
const partial = I.rankingEvaluation(ranking, [ranking.correctOrder[0], ranking.correctOrder[2], ranking.correctOrder[1]]);
assert(!partial.correct && partial.partialScore > 0 && partial.partialScore < 1, 'ranking partial score failed');
const route = data.days[2].questions.find(q => q.id === 'd02-route-propanol-01');
const yellowValid = I.pathEvaluation(route, ['e3','e4']);
assert(yellowValid.correct && yellowValid.details.reachedTarget, 'yellow valid route should be accepted');
const arrow = data.days[4].questions.find(q => q.type === 'electron-arrow');
const fullArrow = I.arrowEvaluation(arrow, arrow.expectedArrows);
const partialArrow = I.arrowEvaluation(arrow, [arrow.expectedArrows[0]]);
assert(fullArrow.correct && !partialArrow.correct && partialArrow.partialScore > 0, 'electron arrow evaluation failed');
const detective = data.days[3].questions.find(q => q.type === 'detective');
assert(I.evaluate(detective, {selected:'a'}).correct, 'detective-lite evaluation failed');
const simpleSynthesis = data.days[2].questions.find(q => q.type === 'synthesis' && !q.graph);
assert(I.evaluate(simpleSynthesis, {selected:'a'}).correct, 'simple synthesis evaluation failed');

const index = fs.readFileSync(path.join(root,'index.html'),'utf8');
for (const rel of ['data/skills.js','data/manifest.js','data/day01.js','data/day02.js','data/day03.js','data/day04.js','js/learning-engine.js','js/review-engine.js','js/interactions.js','app.js']) {
  assert(index.includes(rel), `index missing ${rel}`);
  assert(fs.existsSync(path.join(root, rel)), `file missing ${rel}`);
}
const combined = [...fs.readdirSync(path.join(root,'data')).map(x => fs.readFileSync(path.join(root,'data',x),'utf8')), fs.readFileSync(path.join(root,'app.js'),'utf8')].join('\n');
assert(!/TODO|COMING SOON/i.test(combined), 'unfinished marker found');

console.log(`PASS phase3 validator: ${ids.size} question/repair ids, Day1-Day4, migration, mastery evidence, ranking partial, yellow route, electron arrows.`);
