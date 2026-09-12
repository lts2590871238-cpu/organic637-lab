const assert = require('assert');
global.window = global;
window.Organic637 = {};
window.Organic637Data = { days:{} };
for (let day=1; day<=20; day++) {
  try { require(`../../data/day${String(day).padStart(2,'0')}.js`); } catch {}
}
require('../../data/v16-director.js');
const D = window.Organic637.V16_DIRECTOR_DATA;
for (let day=1; day<=18; day++) {
  const plan = D.days[day];
  assert.ok(plan, `missing day ${day}`);
  const lesson = (plan.sequence || []).find(step => step.type === 'lesson');
  if (!lesson) continue;
  assert.ok(lesson.caseBridge && lesson.caseBridge.length >= 16, `Day ${day} first lesson needs an investigation bridge`);
  assert.match(lesson.caseBridge, /证据|案件|记录|样品|路线|真相|调查|判断|线索|解释|鉴定|重建|身份/, `Day ${day} bridge must tie chemistry back to the case`);
}
console.log('PASS test-v16-case-bridges');
