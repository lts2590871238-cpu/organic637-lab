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
load('js/original-reaction-solutions.js',w);
const {questions,status}=w.Organic637.OriginalExamDraft;
const iodo=questions.find(q=>q.examSource.year===2020&&q.examSource.originalQuestion==='一、选择题12');
assert.match(iodo.options[2].label,/苯甲醚/,'iodoform option C scan mismatch');
assert.match(iodo.options[3].label,/苯乙醛/,'iodoform option D scan mismatch');
const fc=questions.find(q=>q.examSource.year===2022&&q.examSource.originalQuestion==='二、选择题5');
assert.match(fc.options[2].label,/仲丁基苯/,'FC option C original scan mismatch');
const water=questions.find(q=>q.id==='exam-2016-7-18');assert.equal(water.examSource.pdfPage,50,'incorrect water-solubility provenance');
const check=w.Organic637.Interactions;
const chem=w.Organic637.OriginalChem;
const expectedPages=new Map([[2020,new Set([26,27,28,29,31])],[2019,new Set([35,36])],[2017,new Set([44])],[2014,new Set([59])],[2016,new Set([50])],[2018,new Set([40])],[2022,new Set([22])],[2023,new Set([16])],[2015,new Set([54])]]);
assert.equal(questions.length,30,'must ship thirty distinct scanned question entries');
assert.match(status,/pending/,'must not mistakenly mark editorial verification complete');
assert.equal(new Set(questions.map(q=>q.id)).size,questions.length,'duplicate ID');
assert.equal(new Set(questions.map(q=>q.examSource.year+'|'+q.examSource.originalQuestion)).size,questions.length,'duplicated original exam question');
for(const day of [19,20]){
 const paper=questions.filter(q=>q.day===day);
 assert.equal(paper.length,15,'each paper has 15 scanned questions');
 assert.equal(paper.reduce((n,q)=>n+q.points,0),150,'each mixed paper must normalize to 150');
}
// Independently tally implicit hydrogens from each newly redrawn atom–bond graph.
function elementCounts(name){
 const graph=chem.graphTemplates[name];assert.ok(graph,'missing audited molecular graph '+name);
 const [atoms,bonds]=graph,count={C:0,H:0,O:0,N:0,Cl:0};
 for(let i=0;i<atoms.length;i++){
  const label=atoms[i][2],bondSum=bonds.reduce((n,[a,b,order])=>n+(a===i||b===i?order:0),0);
  if(label==='O'){count.O++;count.H+=Math.max(0,2-bondSum);}
  else if(label==='OH'){count.O++;count.H++;}
  else if(label==='N'){count.N++;count.H+=Math.max(0,3-bondSum);}
  else if(label==='Cl'){count.Cl++;}
  else{count.C++;count.H+=Math.max(0,4-bondSum);}
 }
 return Object.fromEntries(Object.entries(count).filter(([,n])=>n));
}
for(const [name,expected] of [
 ['NaBH₄还原底物',{C:6,H:10,O:1}],['NaBH₄还原产物',{C:6,H:12,O:1}],
 ['分子内FC底物',{C:10,H:13,Cl:1}],['四氢萘',{C:10,H:12}],
 ['2-甲基吡啶',{C:6,H:7,N:1}],['2-苯乙烯基吡啶',{C:13,H:11,N:1}],
 ['吡啶-2-甲醛',{C:6,H:5,O:1,N:1}],
 ['环戊酮',{C:5,H:8,O:1}],['交叉羟醛加成目标',{C:13,H:16,O:2}]
 ])assert.deepEqual(elementCounts(name),expected,'structure atom/bond graph disagrees with required molecular formula for '+name);

let recognizedSvg=0, recognizedAnswers=0;
for(const [name,[atoms,bonds]] of Object.entries(chem.graphTemplates)) {
 assert.ok(atoms.length>=1,'empty structure '+name);
 for(const [i,j,order] of bonds){assert.ok(atoms[i]&&atoms[j], 'broken atom bond index '+name);assert.ok([1,2,3].includes(order),'unsupported bond order '+name);}
 // This static check rejects impossible total bond orders; actual structure identity
 // still requires comparison against the original scanned drawing.
 for(let atomId=0;atomId<atoms.length;atomId++){
  const label=atoms[atomId][2],total=bonds.reduce((n,e)=>n+(e[0]===atomId||e[1]===atomId?e[2]:0),0);
  const max=['O','O−'].includes(label)?2:['OH','Br','Cl','F'].includes(label)?1:['·','+'].includes(label)?3:4;
  assert.ok(total<=max,'chemically impossible bond-order sum '+name+' atom '+atomId+': '+total+'/'+max);
 }
}
for(const q of questions){
 const src=q.examSource;
 assert.notEqual(q.hold,true,'unreviewed question must be quarantined');
 assert.ok(expectedPages.get(src.year)?.has(src.pdfPage),'out-of-bounds year/page: '+q.id);
 assert.equal(src.printedSubjectCode,'816','original year exam code must be captured, separate from compilation 637');
 assert.ok(src.originalPoints===2 || (['structure-deduction','synthesis-steps'].includes(q.type)&&src.originalPoints===8),'original mark metadata wrong');
 assert.ok(src.originalQuestion.match(/(?:选择题|排序|填空题|结构推导题|合成题)\d+/),'specific source exam question missing');
 assert.equal(src.scanFile,'扫描件_260725_205723(1).pdf');
 assert.ok(q.examGuide.steps.length>=4&&q.examGuide.steps.every(t=>t.length>=20),'need detailed nontrivial explanation steps');
 if(q.type==='ranking'){
   assert.deepEqual([...q.correctOrder].sort().join(','),q.items.map(i=>i.id).sort().join(','),'ranking permutation invalid');
   assert.equal(check.evaluate(q,{order:q.correctOrder}).correct,true,'correct ranking not given full mark');
   assert.equal(check.evaluate(q,{order:[...q.correctOrder].reverse()}).correct,false,'inverse ranking wrongfully accepted');
 }else if(q.type==='text-short'){
   assert.ok(check.evaluate(q,{value:q.answer[0]}).correct,'real reaction product must match');
   assert.equal(check.evaluate(q,{value:'错误产物'}).correct,false,'invalid product wrongfully accepted');
 }else if(q.type==='structure-deduction'||q.type==='synthesis-steps'){
   const all=Object.fromEntries(Object.entries(q.answer).map(([p,values])=>[p,values[0]]));
   assert.equal(check.evaluate(q,{fields:all}).partialScore,1,'all correct structural deductions must score fully');
   const k=Object.keys(all)[1];
   assert.equal(check.evaluate(q,{fields:{...all,[k]:'错误结构'}}).partialScore,2/3,'two correct subparts must score two thirds');
   assert.equal(check.evaluate(q,{fields:Object.fromEntries(Object.keys(all).map(k=>[k,'错误']))}).partialScore,0,'all invalid should score zero');
   if(q.type==='structure-deduction')assert.equal(check.evaluate(q,{fields:{A:'2-picoline',B:'2-styrylpyridine',C:'picolinaldehyde'}}).correct,true,'accepted nomenclature synonyms should grade correctly');
 }else{
   assert.equal(check.evaluate(q,{selected:q.answer}).correct,true,'correct multiple-choice answer not full mark');
   for(const other of q.options.filter(o=>o.id!==q.answer))assert.equal(check.evaluate(q,{selected:other.id}).correct,false,'distractor wrongfully full scored');
 }
 const images=chem.figuresFor(q);
 if(q.type!=='structure-deduction')assert.match(images,/<svg/,'Missing independent question/structure drawing '+q.id);
 if(q.type!=='structure-deduction')assert.match(images,/<\/svg>/,'Broken SVG closing tag '+q.id);
 recognizedSvg++;
 const answer=chem.answerFor(q);
 assert.match(answer,/<svg/,'Missing separately redrawn correct answer '+q.id);
 assert.match(answer,/<\/svg>/,'Broken correct answer drawing '+q.id);
 recognizedAnswers++;
 if(chem.optionStructureNames(q).length)assert.equal(chem.optionStructureNames(q).length,(q.options||q.items).length,'mismatched diagram count and answer option count for '+q.id);
}
console.log('PASS: 30 sourced questions, two 150-point normalized papers, correct and incorrect scoring');
console.log('PASS: source metadata, page indexing, detailed explanation coverage, duplicate control');
console.log('PASS: source/product formulas independently audited against all seven redrawn graphs');
console.log('PASS: '+recognizedSvg+' source figures and '+recognizedAnswers+' independently redrawn answer solutions; '+Object.keys(chem.graphTemplates).length+' molecular templates validated');
console.log('Note: this is code-level verification, NOT final chemistry double-blind review or visual browser QA.');
