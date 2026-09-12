const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
global.window = global;
window.Organic637 = {};
require('../../js/interactions.js');
assert.equal(typeof window.Organic637.Interactions.orderedOptions, 'function', 'interactions must expose deterministic option ordering');

const context = { window: { Organic637Data: { days:{} } } };
vm.createContext(context);
for (let day=1; day<=20; day++) {
  vm.runInContext(fs.readFileSync(`data/day${String(day).padStart(2,'0')}.js`, 'utf8'), context);
}
for (const rel of ['data/phase5-augment.js','data/beginner-foundations.js','data/learning-scaffolds.js','data/beginner-first-use.js','data/beginner-closure-v3.js','data/beginner-closure-v4.js','data/exam-closure-v5.js','data/teaching-closure-v10.js','data/teaching-closure-v11.js']) {
  vm.runInContext(fs.readFileSync(rel,'utf8'), context);
}
const positions = [0,0,0,0];
let counted = 0;
for (const day of Object.values(context.window.Organic637Data.days)) {
  for (const q of day.questions || []) {
    if (!['choice','structure-choice'].includes(q.type) || !Array.isArray(q.options) || q.options.length < 2) continue;
    const first = window.Organic637.Interactions.orderedOptions(q).map(x => x.id);
    const second = window.Organic637.Interactions.orderedOptions(q).map(x => x.id);
    assert.deepEqual(first, second, `${q.id} option order must be stable across rerenders`);
    const pos = first.indexOf(String(q.answer));
    assert.ok(pos >= 0, `${q.id} correct answer must remain present after ordering`);
    if (pos < positions.length) positions[pos] += 1;
    counted += 1;
  }
}
assert.ok(counted > 150, 'expected to audit the full choice bank');
const maxShare = Math.max(...positions) / counted;
assert.ok(maxShare < 0.45, `displayed correct-answer positions remain biased: ${JSON.stringify(positions)}`);
console.log('PASS test-v16-option-shuffle', { counted, positions });
