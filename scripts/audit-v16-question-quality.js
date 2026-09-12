#!/usr/bin/env node
'use strict';
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const context = { window: { Organic637: {}, Organic637Data: { days:{} } }, console };
vm.createContext(context);
for (let day=1; day<=20; day++) {
  const rel = `data/day${String(day).padStart(2,'0')}.js`;
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), context, { filename:rel });
}
for (const rel of [
  'data/phase5-augment.js',
  'data/beginner-foundations.js',
  'data/learning-scaffolds.js',
  'data/beginner-first-use.js',
  'data/beginner-closure-v3.js',
  'data/beginner-closure-v4.js',
  'data/exam-closure-v5.js',
  'data/teaching-closure-v10.js',
  'data/teaching-closure-v11.js'
]) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), context, { filename:rel });
}
vm.runInContext(fs.readFileSync(path.join(ROOT, 'data/v16-director.js'),'utf8'), context, { filename:'data/v16-director.js' });
const days = context.window.Organic637Data.days;
const director = context.window.Organic637.V16_DIRECTOR_DATA;
const errors = [];
const globalIds = new Map();
let total = 0;
let optionQuestions = 0;
const counts = { main:0, repair:0, adaptive:0 };
const push = (day,id,scope,msg) => errors.push(`Day ${day} · ${scope} · ${id}: ${msg}`);

function poolEntries(data) {
  const rows = [{ scope:'main', items:data.questions || [] }];
  for (const [skill, items] of Object.entries(data.repairs || {})) rows.push({ scope:`repair:${skill}`, bucket:'repair', items:items || [] });
  for (const [skill, items] of Object.entries(data.adaptivePools || {})) rows.push({ scope:`adaptive:${skill}`, bucket:'adaptive', items:items || [] });
  return rows;
}

function auditQuestion(day, q, scope, bucket) {
  total += 1;
  counts[bucket || 'main'] += 1;
  if (!q || typeof q !== 'object') { push(day,'<invalid>',scope,'question entry must be an object'); return; }
  if (!q.id) { push(day,'<missing-id>',scope,'question id is required'); return; }
  const globalKey = String(q.id);
  if (globalIds.has(globalKey)) push(day,q.id,scope,`question id duplicates ${globalIds.get(globalKey)}`);
  else globalIds.set(globalKey, `Day ${day} · ${scope}`);
  if (!String(q.prompt || '').trim()) push(day,q.id,scope,'prompt is empty');
  if (!q.primarySkill && q.role !== 'exam') push(day,q.id,scope,'primarySkill is missing');
  if (!q.explanationLayers?.short && !['route','ranking','electron-arrow','detective'].includes(q.type)) push(day,q.id,scope,'short explanation is missing');

  const options = q.options || [];
  if (['choice','structure-choice','multi-choice'].includes(q.type)) {
    optionQuestions += 1;
    if (options.length < 2) push(day,q.id,scope,'choice question needs at least two options');
    const ids = options.map((o,i)=>String(o?.id ?? i));
    const labels = options.map(o=>String(o?.label ?? o?.formula ?? '').trim());
    if (new Set(ids).size !== ids.length) push(day,q.id,scope,'option ids are not unique');
    if (labels.some(x=>!x)) push(day,q.id,scope,'option label/formula is empty');
    if (new Set(labels).size !== labels.length) push(day,q.id,scope,'option labels are duplicated');
    if (q.type === 'multi-choice') {
      if (!Array.isArray(q.answer) || !q.answer.length) push(day,q.id,scope,'multi-choice answer must be a non-empty array');
      else {
        if (new Set(q.answer.map(String)).size !== q.answer.length) push(day,q.id,scope,'multi-choice answer contains duplicates');
        for (const ans of q.answer) if (!ids.includes(String(ans))) push(day,q.id,scope,`answer ${ans} does not exist in options`);
      }
    } else {
      const ans = typeof q.answer === 'object' && q.answer ? (q.answer.id ?? q.answer.optionId ?? q.answer.value) : q.answer;
      if (!ids.includes(String(ans))) push(day,q.id,scope,`answer ${ans} does not exist in options`);
    }
    if (/直接从结构|结构上确认|直接看见/.test(String(q.prompt || ''))) {
      for (const option of options) {
        const label = String(option?.label || '');
        if (/周砚|许临川|林岑|顾遥|程野|修改了记录|偷走|带出实验室|门禁/.test(label)) {
          push(day,q.id,scope,`direct-structure observation option crosses evidence levels: “${label}”`);
        }
      }
    }
  }

  if (q.type === 'ranking') {
    const itemIds = (q.items || []).map(x=>String(x.id));
    const order = (q.correctOrder || q.answer?.correctOrder || []).map(String);
    if (itemIds.length < 2) push(day,q.id,scope,'ranking needs at least two items');
    if (new Set(itemIds).size !== itemIds.length) push(day,q.id,scope,'ranking item ids are not unique');
    if (order.length !== itemIds.length || order.some(id=>!itemIds.includes(id)) || new Set(order).size !== order.length) push(day,q.id,scope,'ranking correctOrder must contain every item exactly once');
  }

  if (q.type === 'electron-arrow') {
    const hotspots = (q.hotspots || []).map(x=>String(x.id));
    const arrows = q.expectedArrows || q.answer?.expectedArrows || [];
    if (!hotspots.length || !arrows.length) push(day,q.id,scope,'electron-arrow needs hotspots and expected arrows');
    if (new Set(hotspots).size !== hotspots.length) push(day,q.id,scope,'electron-arrow hotspot ids are not unique');
    for (const arrow of arrows) {
      if (!hotspots.includes(String(arrow.source))) push(day,q.id,scope,`arrow source ${arrow.source} missing from hotspots`);
      if (!hotspots.includes(String(arrow.target))) push(day,q.id,scope,`arrow target ${arrow.target} missing from hotspots`);
    }
  }

  if (q.type === 'detective') {
    const candidates = new Set((q.case?.candidates || []).map(x=>String(x.id)));
    const expected = String(q.answer?.candidateId ?? q.answer ?? '');
    if (!candidates.size) push(day,q.id,scope,'detective question needs candidates');
    if (expected && !candidates.has(expected)) push(day,q.id,scope,`detective answer ${expected} is not a candidate`);
  }

  if ((q.type === 'route' || q.type === 'synthesis') && q.graph) {
    const nodes = new Set((q.graph.nodes || []).map(n=>String(n.id)));
    const edges = new Set((q.graph.edges || []).map(e=>String(e.id)));
    if (!nodes.has(String(q.graph.start))) push(day,q.id,scope,'route start node missing');
    if (!nodes.has(String(q.graph.target))) push(day,q.id,scope,'route target node missing');
    for (const edge of q.graph.edges || []) {
      if (!nodes.has(String(edge.from)) || !nodes.has(String(edge.to))) push(day,q.id,scope,`edge ${edge.id} references missing node`);
    }
    for (const route of q.answer?.acceptedPaths || q.graph.referenceRoutes || []) {
      const ids = (Array.isArray(route) ? route : route.edges || []).map(String);
      for (const id of ids) if (!edges.has(id)) push(day,q.id,scope,`accepted route references missing edge ${id}`);
    }
  }
}

for (let day=1; day<=20; day++) {
  const data = days[day];
  if (!data) { errors.push(`Day ${day}: missing day data`); continue; }
  const mainMap = new Map((data.questions || []).map(q=>[q.id,q]));
  for (const group of poolEntries(data)) for (const q of group.items) auditQuestion(day,q,group.scope,group.bucket);

  const plan = director?.days?.[day];
  if (plan) {
    const refs = [];
    for (const step of plan.sequence || []) {
      if (['question','interaction','case-apply'].includes(step.type) && step.ref) refs.push(step.ref);
      if (step.type === 'question-group') refs.push(...(step.refs || []));
    }
    const seen = new Set();
    for (const ref of refs) {
      if (!mainMap.has(ref)) push(day,ref,'director','director references a missing main question');
      if (seen.has(ref)) push(day,ref,'director','same question is used twice in the mandatory director sequence');
      seen.add(ref);
    }
  }
}

if (errors.length) {
  console.error('V16_QUESTION_QUALITY_FAIL');
  for (const line of errors) console.error('- ' + line);
  process.exit(1);
}
console.log(`V16_QUESTION_QUALITY_PASS total=${total} main=${counts.main} repair=${counts.repair} adaptive=${counts.adaptive} optionQuestions=${optionQuestions}`);
