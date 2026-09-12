const assert = require('assert');
global.window = { Organic637: {} };
require('../data/v16-director.js');
require('../js/director-engine.js');
const D = window.Organic637.V16Director;
const introduced = new Set();
const errors = [];
for (const day of D.collectDefinedDays()) {
  const plan = D.getDayPlan(day);
  for (const step of plan.sequence) {
    for (const req of step.prerequisites || []) {
      if (!introduced.has(req)) errors.push(`Day${day} ${step.id} uses ${req} before introduction`);
    }
    for (const id of step.introduces || []) introduced.add(id);
  }
}
if (errors.length) {
  errors.forEach(x => console.error(x));
  process.exit(1);
}
assert(introduced.size > 0, 'no prerequisite metadata found');
console.log(`V16_PREREQUISITE_PASS (${introduced.size} concepts introduced across ${D.collectDefinedDays().length} defined day plans)`);
