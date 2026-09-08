import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = { window: {} };
context.window.window = context.window;
vm.createContext(context);
for (const rel of ['data/skills.js', 'data/detective-cases.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), context, { filename: rel });
}
const data = context.window.Organic637Data || {};
const skills = new Set((data.SKILLS || []).map(x => x.id));
const cases = data.DETECTIVE_CASES || [];
const errors = [];
if (cases.length < 5) errors.push('need at least 5 detective cases');
const ids = new Set();
for (const kase of cases) {
  if (!kase.id || ids.has(kase.id)) errors.push(`bad/duplicate case id: ${kase.id}`);
  ids.add(kase.id);
  if (!kase.formula || kase.dbe == null) errors.push(`${kase.id}: formula/dbe missing`);
  if (!kase.ir?.options?.length || !kase.ir.answer) errors.push(`${kase.id}: IR question missing`);
  if (!kase.nmr?.options?.length || !kase.nmr.answer) errors.push(`${kase.id}: NMR question missing`);
  if (kase.ir?.skill && !skills.has(kase.ir.skill)) errors.push(`${kase.id}: unknown IR skill ${kase.ir.skill}`);
  if (kase.nmr?.skill && !skills.has(kase.nmr.skill)) errors.push(`${kase.id}: unknown NMR skill ${kase.nmr.skill}`);
  const candidates = kase.candidates || [];
  if (candidates.length < 3) errors.push(`${kase.id}: need >=3 candidates`);
  if (!candidates.some(c => String(c.id) === String(kase.correctCandidate))) errors.push(`${kase.id}: correct candidate missing`);
  const candidateIds = new Set();
  for (const candidate of candidates) {
    if (!candidate.id || candidateIds.has(candidate.id)) errors.push(`${kase.id}: duplicate candidate ${candidate.id}`);
    candidateIds.add(candidate.id);
    if (!candidate.constraints || !Object.keys(candidate.constraints).length) errors.push(`${kase.id}/${candidate.id}: constraints missing`);
    if (!candidate.eliminationReason) errors.push(`${kase.id}/${candidate.id}: elimination reason missing`);
  }
  const correct = candidates.find(c => String(c.id) === String(kase.correctCandidate));
  if (correct && Object.values(correct.constraints || {}).includes('fail')) errors.push(`${kase.id}: correct candidate contains fail constraint`);
}
for (const required of ['structure.dbe','structure.ir','structure.nmr_shift','structure.nmr_splitting','structure.nmr_integration','structure.symmetry','structure.constraint_elimination']) {
  if (!skills.has(required)) errors.push(`required skill missing: ${required}`);
}
if (errors.length) {
  console.error('PHASE4 VALIDATION FAIL');
  for (const error of errors) console.error('-', error);
  process.exit(1);
}
console.log(`PHASE4 VALIDATION PASS: ${cases.length} cases; ${skills.size} skills available.`);
