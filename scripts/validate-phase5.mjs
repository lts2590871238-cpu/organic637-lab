import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = { window: {} };
context.window.window = context.window;
vm.createContext(context);
for (const rel of [
  'data/skills.js','data/day01.js','data/day02.js','data/day03.js','data/day04.js',
  'data/phase5-augment.js','data/learning-scaffolds.js','data/synthesis-cases.js'
]) {
  vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), context, { filename: rel });
}
const data = context.window.Organic637Data || {};
const days = data.days || {};
const skills = new Set((data.SKILLS || []).map(x => x.id));
const cases = data.SYNTHESIS_CASES || [];
const errors = [];

const minimumQuestions = {1: 15, 2: 12, 3: 12, 4: 11};
for (const day of [1,2,3,4]) {
  const row = days[day];
  if (!row) { errors.push(`Day ${day} missing`); continue; }
  if ((row.questions || []).length < minimumQuestions[day]) errors.push(`Day ${day} only ${(row.questions || []).length} questions; need >= ${minimumQuestions[day]}`);
  if ((row.lessons || []).length < 4) errors.push(`Day ${day} only ${(row.lessons || []).length} lessons; need >=4`);
  for (const q of row.questions || []) {
    if (!q.id || !q.primarySkill) errors.push(`Day ${day}: bad question id/skill`);
    if (q.primarySkill && !skills.has(q.primarySkill)) errors.push(`${q.id}: unknown primary skill ${q.primarySkill}`);
  }
}
if ((days[1]?.estimatedMinutes || 0) < 60) errors.push('Day 1 estimatedMinutes must be >=60 after depth repair');

const scaffolds = data.SCAFFOLDS || {};
const scaffoldable = [2,3,4].flatMap(day => days[day]?.questions || []);
const explicit = scaffoldable.filter(q => scaffolds.questions?.[q.id] || q.formula || q.start?.structure || q.target?.structure).length;
if (scaffoldable.length && explicit / scaffoldable.length < .8) errors.push(`formula/scaffold coverage too low: ${explicit}/${scaffoldable.length}`);

if (cases.length < 6) errors.push('need at least 6 synthesis cases');
const caseIds = new Set();
for (const kase of cases) {
  if (!kase.id || caseIds.has(kase.id)) errors.push(`bad/duplicate synthesis case id: ${kase.id}`);
  caseIds.add(kase.id);
  if (!kase.start?.structure || !kase.target?.structure) errors.push(`${kase.id}: start/target structure missing`);
  if (!kase.analysis?.differenceOptions?.length || !kase.analysis?.carbonOptions?.length) errors.push(`${kase.id}: analysis prompts missing`);
  if (!Array.isArray(kase.hints) || kase.hints.length < 3) errors.push(`${kase.id}: need 3 staged hints`);
  const graph = kase.graph || {};
  const nodes = new Map((graph.nodes || []).map(n => [String(n.id), n]));
  const edges = new Map((graph.edges || []).map(e => [String(e.id), e]));
  if (!nodes.has(String(graph.start)) || !nodes.has(String(graph.target))) errors.push(`${kase.id}: graph start/target node missing`);
  for (const edge of graph.edges || []) {
    if (!nodes.has(String(edge.from)) || !nodes.has(String(edge.to))) errors.push(`${kase.id}/${edge.id}: edge references missing node`);
    if (!['green','yellow','orange','red'].includes(edge.status)) errors.push(`${kase.id}/${edge.id}: invalid status ${edge.status}`);
    if (!edge.reagent || !edge.reason) errors.push(`${kase.id}/${edge.id}: reagent/reason missing`);
  }
  const routes = graph.referenceRoutes || [];
  if (!routes.length) errors.push(`${kase.id}: no reference route`);
  for (const route of routes) {
    let node = String(graph.start);
    for (const id of route) {
      const edge = edges.get(String(id));
      if (!edge) { errors.push(`${kase.id}: route references missing edge ${id}`); break; }
      if (String(edge.from) !== node) { errors.push(`${kase.id}: discontinuous route at ${id}`); break; }
      node = String(edge.to);
    }
    if (node !== String(graph.target)) errors.push(`${kase.id}: reference route does not reach target`);
  }
}
const yellowEdges = cases.flatMap(kase => kase.graph?.edges || []).filter(edge => edge.status === 'yellow');
if (yellowEdges.length < 3) errors.push(`need several yellow valid-alternative edges, got ${yellowEdges.length}`);
for (const required of ['synthesis.target_difference','synthesis.carbon_count','synthesis.last_step','synthesis.disconnection','synthesis.compatibility','synthesis.route_evaluation']) {
  if (!skills.has(required)) errors.push(`required skill missing: ${required}`);
}

if (errors.length) {
  console.error('PHASE5 VALIDATION FAIL');
  for (const error of errors) console.error('-', error);
  process.exit(1);
}
console.log(`PHASE5 VALIDATION PASS: Day1=${days[1].questions.length}q/${days[1].lessons.length} lessons; Day2=${days[2].questions.length}q; Day3=${days[3].questions.length}q; Day4=${days[4].questions.length}q; ${cases.length} synthesis mazes; scaffold coverage ${explicit}/${scaffoldable.length}.`);
