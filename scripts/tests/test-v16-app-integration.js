const assert = require('assert');
const fs = require('fs');
const source = fs.readFileSync('app.js', 'utf8');

assert.match(source, /state\.schemaVersion\s*=\s*3\s*;/, 'app normalization must preserve schemaVersion 3');
assert.match(source, /state\.version\s*=\s*3\s*;/, 'app normalization must preserve version 3');
assert.match(source, /function\s+directorDayPage\s*\(day\)/, 'app should provide a Director renderer entry point');
assert.match(source, /NS\.Learning\.ensureV16RootState\(Store\.state\)/, 'day routing should normalize V16 root state before feature switching');
assert.match(source, /NS\.V16Director\?\.getDayPlan\?\.\(day\)/, 'day routing should only use Director when a plan exists');
assert.match(source, /migratedFromLegacy\s*=\s*true/, 'legacy progress should be lazily marked as migrated');
assert.match(source, /legacyDayPage\(day\)/, 'legacy fallback must remain available');
assert.match(source, /function\s+advanceDirectorStep\s*\(day, stepId\)/, 'Director steps need an explicit completion/advance function');
assert.match(source, /function\s+lessonPage\s*\(day, item, context\s*=\s*\{\}\)/, 'lesson renderer should accept Director callbacks without breaking legacy flow');
assert.match(source, /context\.onNext/, 'lesson renderer should let Director own progression');
assert.match(source, /context\.onPrev/, 'study renderers should let Director own backward navigation');

console.log('PASS test-v16-app-integration');
