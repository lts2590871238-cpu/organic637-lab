import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const pass = condition => Boolean(condition);
const check = (condition, message) => { if (!pass(condition)) failures.push(message); };
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');

const context = vm.createContext({ window: {}, console });
context.window.window = context.window;
for (const relative of [
  'data/skills.js',
  'data/day03.js',
  'data/day04.js',
  'data/day05.js',
  'data/day15.js',
  'data/day16.js',
  'data/day19.js',
  'data/day20.js',
  'data/3d-lessons.js'
]) {
  vm.runInContext(read(relative), context, { filename: relative });
}

const data = context.window.Organic637Data || {};
const lessons = data.THREE_D_LESSONS || {};
const presets = data.THREE_D_PRESETS || {};
const dayLessons = day => data.days?.[day]?.lessons || [];
const references = [3, 4, 5, 15, 16, 19, 20].flatMap(day => dayLessons(day).filter(row => row.threeDId).map(row => ({ day, lesson: row.id, id: row.threeDId })));

check(Object.keys(lessons).length >= 8, '3D lesson registry is incomplete');
check(Object.keys(presets).length >= 7, '3D preset registry is incomplete');

for (const ref of references) check(Boolean(lessons[ref.id]), `Day${ref.day} lesson ${ref.lesson} references missing threeDId ${ref.id}`);

for (const [id, lesson] of Object.entries(lessons)) {
  check(Boolean(lesson.preset && presets[lesson.preset]), `${id}: preset missing`);
  check(Boolean(lesson.examBridge), `${id}: examBridge missing`);
  check(Boolean(lesson.fallbackSvg && /<svg\b/.test(lesson.fallbackSvg)), `${id}: 2D fallback missing`);
  check(lesson.mobileSafe === true, `${id}: mobileSafe flag missing`);
  check(Boolean(lesson.insight), `${id}: insight sentence missing`);
  check(Array.isArray(lesson.steps) && lesson.steps.length >= 4, `${id}: teaching steps incomplete`);
  check(Array.isArray(lesson.practices) && lesson.practices.length >= 2, `${id}: immediate 3D-to-2D practice incomplete`);
  const questionIds = (lesson.practices || []).map(row => row.id);
  check(questionIds.length === new Set(questionIds).size, `${id}: duplicate practice id`);
  for (const question of lesson.practices || []) {
    check(Array.isArray(question.options) && Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length, `${id}/${question.id}: invalid deterministic answer`);
  }
}

for (const [id, preset] of Object.entries(presets)) {
  const atomIds = (preset.atoms || []).map(row => row.id);
  const atoms = new Set(atomIds);
  check(atomIds.length > 0, `${id}: no atoms`);
  check(atomIds.length === atoms.size, `${id}: atom ids are not unique`);
  for (const atom of preset.atoms || []) check(Array.isArray(atom.position) && atom.position.length === 3 && atom.position.every(Number.isFinite), `${id}/${atom.id}: invalid coordinate`);
  for (const bond of preset.bonds || []) check(atoms.has(bond.from) && atoms.has(bond.to), `${id}: bond ${bond.from}-${bond.to} references missing atom`);
  for (const vector of preset.vectors || []) {
    if (vector.fromAtom) check(atoms.has(vector.fromAtom), `${id}: vector references missing fromAtom ${vector.fromAtom}`);
    if (vector.toAtom) check(atoms.has(vector.toAtom), `${id}: vector references missing toAtom ${vector.toAtom}`);
  }
}

const day3Ids = dayLessons(3).map(row => row.threeDId);
const day4Ids = dayLessons(4).map(row => row.threeDId);
const day5Ids = dayLessons(5).map(row => row.threeDId);
const day15Ids = dayLessons(15).map(row => row.threeDId);
const day16Ids = dayLessons(16).map(row => row.threeDId);
check(day3Ids.includes('diels_alder_endo_exo'), 'Day3 lacks Diels–Alder 3D preview');
check(day4Ids.includes('sn2_backside'), 'Day4 lacks SN2 backside 3D');
check(day5Ids.includes('e2_anti'), 'Day5 lacks E2 anti-periplanar 3D');
for (const id of ['tetrahedral_intro', 'cip_tournament', 'rs_rotation', 'newman_intro', 'chair_intro']) check(day15Ids.includes(id), `Day15 lacks ${id}`);
check(day16Ids.includes('sn2_backside') && day16Ids.includes('e2_anti'), 'Day16 lacks compact SN2/E2 3D review');
check(dayLessons(19).every(row => !row.threeDId), 'Day19 exam lessons must not expose 3D');

for (const [skill, id] of Object.entries(data.THREE_D_BY_SKILL || {})) check(Boolean(lessons[id]), `Skill ${skill} maps to missing 3D lesson ${id}`);
check(data.THREE_D_BY_SKILL?.['stereo.cip'] === 'cip_tournament', 'Day20 CIP repair mapping missing');
check(data.THREE_D_BY_SKILL?.['stereo.rs'] === 'rs_rotation', 'Day20 R/S repair mapping missing');

const index = read('index.html');
const app = read('app.js');
const engine = read('js/chem-3d.js');
const css = read('styles.css');
check(index.includes('data/3d-lessons.js'), 'index.html does not load 3D lesson data');
check(index.includes('type="module" src="js/chem-3d.js'), 'index.html does not load the local Chem3D module');
check(app.includes("organic637:chem3d-ready"), 'app.js does not recover from deferred Chem3D readiness');
check(!/<script[^>]+src=["']https?:\/\//i.test(index), 'index.html contains runtime CDN script');
check(!/^\s*import\s.+from\s+["']https?:\/\//m.test(engine), 'Chem3D imports a CDN at runtime');
check(engine.includes("../vendor/three.module.min.js"), 'Chem3D does not use the local Three.js module');
check(engine.includes('renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))'), 'devicePixelRatio cap missing');
check(engine.includes('renderer.dispose()') && engine.includes('forceContextLoss'), 'renderer disposal is incomplete');
check(app.includes('NS.Chem3D?.dispose?.();'), 'page navigation does not dispose the active scene');
check(app.includes("context.mode === 'repair' ? Data.THREE_D_BY_SKILL"), 'Day20 adaptive 3D repair reopen is missing');
check(app.includes('chem3d-element-legend') && css.includes('.chem3d-element-legend'), '3D element color legend is missing');

const examStart = app.indexOf('function examQuestionPage');
const examEnd = app.indexOf('function completeExamDay', examStart);
check(examStart >= 0 && examEnd > examStart && !app.slice(examStart, examEnd).includes('renderThreeD'), 'Exam mode renders 3D before submission');
check(css.includes('touch-action: none'), '3D canvas touch-action safety missing');
check(css.includes('min-height: 44px'), '3D mobile controls are smaller than 44px');
check(/@media \(max-width: 540px\)/.test(css) && css.includes('height: 320px'), '3D narrow-screen layout missing');

const vendor = path.join(root, 'vendor/three.module.min.js');
check(fs.existsSync(vendor) && fs.statSync(vendor).size > 300000, 'local vendor Three.js file missing or incomplete');
const vendorCore = path.join(root, 'vendor/three.core.min.js');
check(fs.existsSync(vendorCore) && fs.statSync(vendorCore).size > 300000, 'local Three.js core dependency is missing or incomplete');

for (const relative of ['data/3d-lessons.js', 'js/chem-3d.js', 'scripts/validate-3d.mjs']) {
  const unfinishedMarker = new RegExp(`\\b${'TO' + 'DO'}\\b`, 'i');
  check(!unfinishedMarker.test(read(relative)), `${relative}: unfinished marker remains`);
}

if (failures.length) {
  console.error(`3D VALIDATION FAILED (${failures.length})`);
  failures.forEach(message => console.error(`- ${message}`));
  process.exit(1);
}

console.log(`3D VALIDATION PASS · ${Object.keys(lessons).length} lessons · ${Object.keys(presets).length} presets · ${references.length} mainline references`);
