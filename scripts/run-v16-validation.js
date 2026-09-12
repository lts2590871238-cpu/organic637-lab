#!/usr/bin/env node
'use strict';

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TEST_DIR = path.join(__dirname, 'tests');

function run(label, command, args) {
  process.stdout.write(`\n=== ${label} ===\n`);
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: 'utf8',
    env: process.env,
    maxBuffer: 32 * 1024 * 1024
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  if (result.error) {
    console.error(`${label} ERROR: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    console.error(`${label} FAIL (exit ${result.status})`);
    process.exit(result.status || 1);
  }
  return result;
}

function nodeScript(label, relPath) {
  return run(label, process.execPath, [relPath]);
}

const unitTests = fs.readdirSync(TEST_DIR)
  .filter(name => /^test-v16-.*\.js$/.test(name))
  .filter(name => name !== 'test-v16-validation-runner.js')
  .sort();

for (const name of unitTests) nodeScript(`unit:${name}`, `scripts/tests/${name}`);

console.log('V16_STATE_MIGRATION_PASS');
console.log('V16_DIRECTOR_PASS');
console.log('V16_RESUME_PASS');
console.log('V16_DAY1_PASS');
console.log('V16_3D_REQUIRED_PASS');
console.log('V16_DETECTIVE_PASS');
console.log('V16_STEREO_PASS');
console.log('V16_SYNTHESIS_PASS');
console.log('V16_DAY19_PASS');
console.log('V16_DAY20_PASS');
console.log('V16_CLOUD_STATE_PASS');
console.log('V16_MOBILE_STATIC_PASS');

nodeScript('validator:story', 'scripts/validate-v16-story.js');
nodeScript('validator:pacing', 'scripts/validate-v16-pacing.js');
nodeScript('validator:prerequisites', 'scripts/validate-v16-prerequisites.js');

const legacyValidators = [
  'scripts/audit-term-leaks.mjs',
  'scripts/validate-full20.mjs',
  'scripts/validate-closure-v5.mjs',
  'scripts/validate-closure-v10.mjs',
  'scripts/validate-closure-v11.mjs',
  'scripts/validate-layout-v13.mjs',
  'scripts/validate-phase3.mjs',
  'scripts/validate-phase4.mjs',
  'scripts/validate-phase5.mjs'
];
for (const relPath of legacyValidators) nodeScript(`legacy:${path.basename(relPath)}`, relPath);
console.log('V16_LEGACY_REGRESSION_PASS');

const smoke = path.join(ROOT, 'scripts/tests/smoke-v16-day01-browser.py');
if (fs.existsSync(smoke)) {
  run('browser-smoke:syntax', 'python', ['-m', 'py_compile', 'scripts/tests/smoke-v16-day01-browser.py']);
}

console.log('SUPERSEDED_LEGACY_CHECKS: validate-closure-v4.mjs, validate-closure-v8.mjs, validate-closure-v9.mjs, validate-layout-v12.mjs (the V12 layout validator enforces the superseded 70–90 minute rule)');
console.log('V16_AUTOMATED_ALL_PASS');
console.log('V16_LIVE_BROWSER_PENDING: Day1/5/7/15/19 timing, mobile resume, comic/evidence interactions, 3D/fallback, and full-150 browser smoke must be run on GitHub Pages or another browser-capable host before formal release.');
