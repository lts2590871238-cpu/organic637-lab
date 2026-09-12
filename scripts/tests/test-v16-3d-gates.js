const assert = require('assert');
const fs = require('fs');
const path = require('path');

global.window = {};
require('../../data/3d-lessons.js');
require('../../js/chem3d.js');
require('../../data/v16-director.js');
require('../../js/director-engine.js');

const Data = window.Organic637Data;
const NS = window.Organic637;

assert.ok(Data.THREED_LESSONS.sn2_backside, 'sn2_backside 3D asset missing');
assert.ok(Data.THREED_LESSONS.e2_anti, 'e2_anti 3D asset missing');
assert.ok(Data.THREED_LESSONS.newman_rotation, 'on-demand Newman asset missing');

const day4 = NS.V16Director.getDayPlan(4);
const day5 = NS.V16Director.getDayPlan(5);
assert.ok(day4, 'Day4 Director plan missing');
assert.ok(day5, 'Day5 Director plan missing');
assert.deepEqual(NS.V16Director.validateDay(4).errors, [], 'Day4 Director plan must satisfy pacing gates');
assert.deepEqual(NS.V16Director.validateDay(5).errors, [], 'Day5 Director plan must satisfy pacing gates');

const sn2Step = day4.sequence.find(step => step.type === '3d' && step.ref === 'sn2_backside');
const e2Step = day5.sequence.find(step => step.type === '3d' && step.ref === 'e2_anti');
assert.equal(sn2Step?.mode, 'required', 'SN2 3D must be required');
assert.equal(e2Step?.mode, 'required', 'E2 3D must be required');

const state = { threeDProgress: {} };
assert.equal(NS.Chem3D.canAdvance(state, sn2Step), false, 'required SN2 must block before completion');
NS.Chem3D.recordAction(state, 'sn2_backside', 'rotate');
assert.equal(NS.Chem3D.canAdvance(state, sn2Step), false, 'one SN2 action cannot satisfy the gate');
for (const action of Data.THREED_LESSONS.sn2_backside.requiredActions) NS.Chem3D.recordAction(state, 'sn2_backside', action);
assert.equal(state.threeDProgress.sn2_backside.completed, true, 'SN2 progress should complete after required actions');
assert.equal(NS.Chem3D.canAdvance(state, sn2Step), true, 'completed SN2 must release the gate');

assert.equal(NS.Chem3D.canAdvance(state, e2Step), false, 'required E2 must block before completion');
for (const action of Data.THREED_LESSONS.e2_anti.requiredActions) NS.Chem3D.recordAction(state, 'e2_anti', action);
assert.equal(state.threeDProgress.e2_anti.completed, true, 'E2 progress should complete after required actions');
assert.equal(NS.Chem3D.canAdvance(state, e2Step), true, 'completed E2 must release the gate');

const onDemand = { type: '3d', ref: 'newman_rotation', mode: 'on_demand' };
assert.equal(NS.Chem3D.canAdvance({ threeDProgress: {} }, onDemand), true, 'on-demand 3D must never block mainline');

const fallbackState = { threeDProgress: {} };
assert.equal(NS.Chem3D.completeFallback(fallbackState, 'sn2_backside', false), false, 'wrong fallback practice cannot complete required 3D');
assert.equal(NS.Chem3D.isCompleted(fallbackState, 'sn2_backside'), false);
assert.equal(NS.Chem3D.completeFallback(fallbackState, 'sn2_backside', true), true, 'correct 2D fallback must be able to release gate');
assert.equal(fallbackState.threeDProgress.sn2_backside.completionMode, '2d-fallback');

const appSource = fs.readFileSync(path.join(__dirname, '../../app.js'), 'utf8');
const indexSource = fs.readFileSync(path.join(__dirname, '../../index.html'), 'utf8');
assert.match(appSource, /step\.type === ['"]3d['"]/i, 'app must route Director 3D steps');
assert.match(appSource, /Chem3D\?\.mount|Chem3D\.mount/, 'app must invoke the shared Chem3D renderer');
assert.match(indexSource, /data\/3d-lessons\.js/, 'index must load 3D lesson data');
assert.match(indexSource, /js\/chem3d\.js/, 'index must load Chem3D engine');

console.log('PASS test-v16-3d-gates');
