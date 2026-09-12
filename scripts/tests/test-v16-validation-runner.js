const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const runner = path.join(__dirname, '../run-v16-validation.js');
assert.ok(fs.existsSync(runner), 'unified V16 validation runner must exist');

const result = spawnSync(process.execPath, [runner], {
  cwd: path.join(__dirname, '../..'),
  encoding: 'utf8',
  env: { ...process.env, V16_VALIDATION_NESTED: '1' },
  maxBuffer: 16 * 1024 * 1024
});
const output = `${result.stdout || ''}\n${result.stderr || ''}`;
assert.equal(result.status, 0, output);
for (const marker of [
  'V16_STORY_PASS',
  'V16_PACING_PASS',
  'V16_PREREQUISITE_PASS',
  'V16_3D_REQUIRED_PASS',
  'V16_RESUME_PASS',
  'V16_DAY19_PASS',
  'V16_DAY20_PASS',
  'V16_CLOUD_STATE_PASS',
  'V16_LEGACY_REGRESSION_PASS',
  'V16_AUTOMATED_ALL_PASS',
  'V16_LIVE_BROWSER_PENDING'
]) assert.match(output, new RegExp(marker), `missing runner marker ${marker}`);
assert.match(output, /SUPERSEDED_LEGACY_CHECKS[^\n]*validate-layout-v12\.mjs/, 'runner must disclose the old 70–90 minute validator as superseded, not silently omit it');

console.log('PASS test-v16-validation-runner');
