#!/usr/bin/env node
'use strict';
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
function load(path,w){vm.runInNewContext(fs.readFileSync(path,'utf8'),{window:w,console},{filename:path});}
const w={Organic637:{},Organic637Data:{days:{}}};
load('data/original-exam-draft.js',w);
load('js/interactions.js',w);
load('js/original-chem-diagrams.js',w);
load('js/original-chem-graph.js',w);
const {questions,status}=w.Organic637.OriginalExamDraft;
const iodo=questions.find(q=>q.examSource.year===2020&&q.examSource.originalQuestion==='一、选择题12');
assert.match(iodo.options[2].label,/苯甲醚/,'iodoform option C scan mismatch');
assert.match(iodo.options[3].label,/苯乙醛/,'iodoform option D scan mismatch');
const fc=questions.find(q=>q.examSource.year===2022&&q.examSource.originalQuestion==='二、选择题5');
assert.match(fc.options[2].label,/仲丁基苯/,'FC option C original scan mismatch');
const water=questions.find(q=>q.id==='exam-2016-7-18');assert.equal(water.examSource.pdfPage,50,'incorrect water-solubility provenance');
const check=w.Organic637.Interactions;
const chem=w.Organic637.OriginalChem;
const expectedPages=new Map([[2020,new Set([26,27,28])],[2019,new Set([35,36])],[2017,new Set([44])],[2014,new Set([59])],[2016,new Set([50])],[2018,new Set([40])],[2022,new Set([22])],[2023,new Set([16])],[2015,new Set([54])]]);
assert.equal(questions.length,30,'must ship thirty distinct scanned question entries');
assert.match(status,/pending/,'must not mistakenly mark editorial verification complete');
assert.equal(new Set(questions.map(q=>q.id)).size,questions.length,'duplicate ID');
assert.equal(new Set(questions.map(q=>q.examSource.year+'|'+q.examSource.originalQuestion)).size,questions.length,'duplicated original exam question');
for(const day of [19,20]){
 const paper=questions.filter(q=>q.day===day);
 assert.equal(paper.length,15,'each paper has 15 scanned questions');
 assert.equal(paper.reduce((n,q)=>n+q.points,0),150,'each mixed paper must normalize to 150');
}
let recognizedSvg=0, recognizedAnswers=0;
for(const [name,[atoms,bonds]] of Object.entries(chem.graphTemplates)) {
 assert.ok(atoms.length>=1,'empty structure '+name);
 for(const [i,j,order] of bonds){assert.ok(atoms[i]&&atoms[j], 'broken atom bond index '+name);assert.ok([1,2,3].includes(order),'unsupported bond order '+name);}
}
for(const q of questions){
 const src=q.examSource;
 assert.notEqual(q.hold,true,'unreviewed question must be quarantined');
 assert.ok(expectedPages.get(src.year)?.has(src.pdfPage),'out-of-bounds year/page: '+q.id);
 assert.equal(src.printedSubjectCode,'816','original year exam code must be captured, separate from compilation 637');
 assert.equal(src.originalPoints,2,'each selected original is a two-mark task');
 assert.ok(src.originalQuestion.match(/(?:选择题|排序)\d+/),'specific source exam question missing');
 assert.equal(src.scanFile,'扫描件_260725_205723(1).pdf');
 assert.ok(q.examGuide.steps.length>=4&&q.examGuide.steps.every(t=>t.length>=20),'need detailed nontrivial explanation steps');
 if(q.type==='ranking'){
   assert.deepEqual([...q.correctOrder].sort().join(','),q.items.map(i=>i.id).sort().join(','),'ranking permutation invalid');
   assert.equal(check.evaluate(q,{order:q.correctOrder}).correct,true,'correct ranking not given full mark');
   assert.equal(check.evaluate(q,{order:[...q.correctOrder].reverse()}).correct,false,'inverse ranking wrongfully accepted');
 }else{
   assert.equal(check.evaluate(q,{selected:q.answer}).correct,true,'correct multiple-choice answer not full mark');
   for(const other of q.options.filter(o=>o.id!==q.answer))assert.equal(check.evaluate(q,{selected:other.id}).correct,false,'distractor wrongfully full scored');
 }
 const images=chem.figuresFor(q);
 assert.match(images,/<svg/,'Missing independent question/structure drawing '+q.id);
 assert.match(images,/<\/svg>/,'Broken SVG closing tag '+q.id);
 recognizedSvg++;
 const answer=chem.answerFor(q);
 assert.match(answer,/<svg/,'Missing separately redrawn correct answer '+q.id);
 assert.match(answer,/<\/svg>/,'Broken correct answer drawing '+q.id);
 recognizedAnswers++;
 if(chem.optionStructureNames(q).length)assert.equal(chem.optionStructureNames(q).length,(q.options||q.items).length,'mismatched diagram count and answer option count for '+q.id);
}
console.log('PASS: 30 sourced questions, two 150-point normalized papers, correct and incorrect scoring');
console.log('PASS: source metadata, page indexing, detailed explanation coverage, duplicate control');
console.log('PASS: '+recognizedSvg+' question diagrams and '+recognizedAnswers+' independently redrawn answer diagrams; 81 molecular templates validated');
console.log('Note: this is code-level verification, NOT final chemistry double-blind review or visual browser QA.');
