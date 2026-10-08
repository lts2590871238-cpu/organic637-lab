#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const w={Organic637:{}};
function load(p){vm.runInNewContext(fs.readFileSync(p,'utf8'),{window:w,console},{filename:p});}
load('data/original-exam-draft.js');
load('js/original-chem-diagrams.js');
load('js/original-chem-graph.js');
load('js/exam-review.js');
const questions=w.Organic637.OriginalExamDraft.questions;
const incorrect=questions.find(q=>q.examSource.year===2020&&q.examSource.originalQuestion==='一、选择题12');
const correct=questions.find(q=>q.examSource.year===2022&&q.examSource.originalQuestion==='二、选择题5');
assert.ok(incorrect&&correct);
const buttons=new Map(),details=[{open:false},{open:false}],paperRows=[{dataset:{wrong:'true'},hidden:false},{dataset:{wrong:'false'},hidden:false}];
function el(selector){if(!buttons.has(selector))buttons.set(selector,{onclick:null,textContent:'',attrs:{},setAttribute(k,v){this.attrs[k]=v;},addEventListener(type,handler){this[type]=handler;}});return buttons.get(selector);}
const root={innerHTML:'',querySelector:el,querySelectorAll(s){if(s==='[data-paper-jump]')return[];if(s==='.paper-details')return details;if(s==='.paper-question')return paperRows;return []}};
let wentBack=false,redo=false;
w.Organic637.ExamReview.render(root,{title:'答卷复盘自动测试',scoreLabel:'90/150',rows:[
 {question:incorrect,hasEvidence:true,correct:false,partialScore:0,payload:{selected:'d'}},
 {question:correct,hasEvidence:true,correct:true,partialScore:1,payload:{selected:'b'}}
],onBack(){wentBack=true;},onRetry(){redo=true;}});
assert.match(root.innerHTML,/2020年/);
assert.match(root.innerHTML,/2022年/);
assert.match(root.innerHTML,/苯乙醛/,'correct original q12 D must be visible');
assert.match(root.innerHTML,/仲丁基苯/,'correct original q5 C must be visible');
assert.match(root.innerHTML,/你的选择/,'old answer snapshot must render');
assert.match(root.innerHTML,/正确项/,'correct answer must render');
assert.match(root.innerHTML,/原卷化学详解/);
assert.match(root.innerHTML,/正确答案 · 独立键线结构图/);
assert.match(root.innerHTML,/paper-electron-diagram/,'real mechanism diagram must display');
assert.match(root.innerHTML,/data-wrong="true"/);
assert.match(root.innerHTML,/data-wrong="false"/);
el('#paperAllOpen').onclick();assert.ok(details.every(x=>x.open));
el('#paperAllClose').onclick();assert.ok(details.every(x=>!x.open));
el('#paperOnlyWrong').onclick();assert.equal(paperRows[0].hidden,false);assert.equal(paperRows[1].hidden,true);
el('#paperOnlyWrong').onclick();assert.ok(paperRows.every(x=>!x.hidden));
el('#paperBack').onclick();assert.equal(wentBack,true);
assert.equal(typeof el('#paperRetry').onclick,'function');
assert.equal(typeof el('#paperRetryBottom').onclick,'function');
console.log('PASS: answers shown with provenance, student selection, correct structure, electron-flow diagram');
console.log('PASS: all-expand/all-collapse, wrong-only toggle, navigation to result, retry controls wired');
console.log('Browser-level visual and account-login QA still required before merge.');
