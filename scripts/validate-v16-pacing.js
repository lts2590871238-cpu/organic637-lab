const assert = require('assert');
global.window = { Organic637: {} };
require('../data/v16-director.js');
require('../js/director-engine.js');
const D = window.Organic637.V16Director;
const days = D.collectDefinedDays();
assert(days.length > 0, 'no V16 day plans defined');
let failed = false;
for (const day of days) {
  const minutes = D.estimateMinutes(day);
  const report = D.validateDay(day);
  console.log(`Day${day}: ${minutes} min${report.warnings.length ? ` | WARN ${report.warnings.join('; ')}` : ''}`);
  if (report.errors.length) {
    failed = true;
    for (const err of report.errors) console.error(`ERROR ${err}`);
  }
}
if (failed) process.exit(1);
console.log(`V16_PACING_PASS (${days.length}/20 day plans defined; undefined days intentionally skipped during staged migration)`);
