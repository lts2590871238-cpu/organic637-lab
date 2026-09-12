const assert = require('assert');
const fs = require('fs');
const source = fs.readFileSync('app.js', 'utf8');

assert.match(source, /function\s+legacyDayPage\s*\(day\)/, 'legacyDayPage(day) should preserve the old linear renderer');
assert.match(source, /function\s+directorDayPage\s*\(day\)/, 'directorDayPage(day) should exist as the V16 renderer');
assert.match(
  source,
  /function\s+dayPage\s*\(day\)[\s\S]*?ensureV16RootState\(Store\.state\)[\s\S]*?getDayPlan\?\.\(day\)[\s\S]*?return\s+directorDayPage\(day\)[\s\S]*?return\s+legacyDayPage\(day\)/,
  'dayPage(day) should prefer a valid V16 Director plan and preserve legacy fallback'
);

console.log('PASS test-v16-app-legacy-extraction');
