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
load('js/original-spectra.js',w);
const {questions,status}=w.Organic637.OriginalExamDraft;
const check=w.Organic637.Interactions;
const chem=w.Organic637.OriginalChem;
const iodo=questions.find(q=>q.examSource.year===2020&&q.examSource.originalQuestion==='一、选择题12');
assert.match(iodo.options[2].label,/苯甲醚/,'iodoform option C scan mismatch');
assert.match(iodo.options[3].label,/苯乙醛/,'iodoform option D scan mismatch');
const fc=questions.find(q=>q.examSource.year===2022&&q.examSource.originalQuestion==='二、选择题5');
assert.match(fc.options[2].label,/仲丁基苯/,'FC option C original scan mismatch');
const nmr=questions.find(q=>q.id==='orig-2020-iv-2-ir-nmr');
assert.equal(nmr.examSource.pdfPage,30);
assert.equal(nmr.examSource.originalPoints,8);
const fourPart=Object.fromEntries(Object.entries(nmr.answer).map(([id,accept])=>[id,accept[0]]));
assert.equal(w.Organic637.Interactions.evaluate(nmr,{fields:fourPart}).partialScore,1);
assert.equal(w.Organic637.Interactions.evaluate(nmr,{fields:{...fourPart,methoxy:'错误'}}).partialScore,0.75);
const spectrumSVG=w.Organic637.OriginalChem.figuresFor(nmr);
assert.match(spectrumSVG,/非原扫描实验曲线/);
assert.match(spectrumSVG,/芳香环 4H/);
// Topological scan audit, 2022 original p22 Q6:
// A is allylic bromide (distance 1 bond to a C=C atom), B nonallylic
// (2 bonds away), C bromocyclohexane (no C=C), D vinylic bromide (0).
// This validates *atom connections*, not just SVG syntax or answer letters.
function bromideDistanceToDoubleBond(name){
 const [atoms,bonds]=w.Organic637.OriginalChem.graphTemplates[name];
 const br=atoms.findIndex(a=>a[2]==='Br');
 assert.ok(br>=0,'bromine atom missing '+name);
 const brBond=bonds.find(([i,j])=>i===br||j===br);
 assert.ok(brBond,'bromine bond absent '+name);
 const attached=brBond[0]===br?brBond[1]:brBond[0];
 const endpoints=new Set(bonds.filter(([, ,order])=>order===2).flatMap(([i,j])=>[i,j]));
 if(!endpoints.size)return Infinity;
 const graph=atoms.map(()=>[]);
 for(const [i,j] of bonds){if(i!==br&&j!==br){graph[i].push(j);graph[j].push(i)}}
 const queue=[[attached,0]],seen=new Set([attached]);
 for(const [i,d] of queue){if(endpoints.has(i))return d;
  for(const nb of graph[i])if(!seen.has(nb)){seen.add(nb);queue.push([nb,d+1])}
 }
 return Infinity;
}
for(const [name,expected] of [
 ['烯丙位溴环己烯',1],
 ['非烯丙位溴环己烯',2],
 ['溴环己烷',Infinity],
 ['乙烯基溴环己烯',0]
 ])assert.equal(bromideDistanceToDoubleBond(name),expected,'scan p22 q6 bromine is attached to wrong ring carbon: '+name);
const sn1=questions.find(q=>q.examSource.year===2022&&q.examSource.originalQuestion==='二、选择题6');
assert.equal(sn1.answer,'d','2022 scanned source p22 q6 weakest SN1 is D vinylic bromide');
const target=questions.find(q=>q.id==='orig-2020-vii-2-aldol-synthesis');
assert.ok(w.Organic637.OriginalChem.figuresFor(target).includes('原卷指定目标'),'synthesis scan p31 product skeleton must be shown in the question alongside the starting reagents');
assert.ok(w.Organic637.OriginalChem.figuresFor(target).includes('交叉羟醛加成目标'),'p31 drawn target skeleton missing');

// Historical E1 scan item was replaced by the new IR/NMR question and is no
// longer among the current 30. Keep its archived explanation diagram chemically
// correct without artificially requiring the old item in the live paper.
const e1={examSource:{year:2015,originalQuestion:'三、按指定性质排序6'}};
const e1Electron=w.Organic637.OriginalChem.electronSvg(e1);
assert.match(e1Electron,/<h4>E1 消除/,'E1 must not render SN1 substitution scheme');
assert.match(e1Electron,/Cα=Cβ/,'E1 mechanistic diagram must show alkene formation');
assert.match(e1Electron,/脱 β-H/,'E1 must indicate beta proton removal');
assert.doesNotMatch(e1Electron,/<h4>SN1/,'E1 mistakenly displays SN1 title');

// Two source-scan structure audits: original p59 Lucas q8, p40 carbonyl IR q3.
// Verify the actual attached functional-group carbon and bonding patterns,
// not just that a valid SVG happens to render.
function molecule(name){
 const [atoms,bonds]=chem.graphTemplates[name];
 const adj=atoms.map(()=>[]);
 for(const [i,j,order] of bonds){adj[i].push({to:j,order});adj[j].push({to:i,order})}
 return {atoms,bonds,adj};
}
function hasRingPath(adj,start,target,skipA,skipB){
 const todo=[start],seen=new Set([start]);
 for(const k of todo){if(k===target)return true;
  for(const {to} of adj[k])if(!((k===skipA&&to===skipB)||(k===skipB&&to===skipA))&&!seen.has(to)){
   seen.add(to);todo.push(to)
  }
 }
 return false;
}
function ringAtoms(name){
 const {atoms,bonds,adj}=molecule(name),included=new Set();
 for(const [i,j] of bonds)if(hasRingPath(adj,i,j,i,j)){included.add(i);included.add(j)}
 return included;
}
function lucasOH(name){
 const {atoms,adj}=molecule(name),ring=ringAtoms(name),hydroxy=atoms.findIndex(x=>x[2]==='OH');
 assert.ok(hydroxy>=0,'Lucas source missing OH: '+name);
 const joined=adj[hydroxy].map(x=>x.to);
 assert.equal(joined.length,1,'Lucas OH bond degree wrong: '+name);
 const carbon=joined[0];
 return {ringSize:ring.size,onRing:ring.has(carbon),carbonDegree:adj[carbon].length,carbon,
   neighbors:adj[carbon].filter(x=>x.to!==hydroxy).map(x=>x.to),
   adj,ring};
}
const lucasA=lucasOH('环戊基甲醇'),lucasB=lucasOH('1-甲基环戊醇'),lucasC=lucasOH('2-甲基环戊醇');
assert.equal(lucasA.ringSize,5);
assert.equal(lucasB.ringSize,5);
assert.equal(lucasC.ringSize,5);
assert.equal(lucasA.onRing,false,'p59 Lucas A must be cyclopentyl-CH2OH, not ring alcohol');
assert.equal(lucasA.carbonDegree,2,'p59 Lucas A CH2OH carbon should have one carbon neighbor');
assert.equal(lucasB.onRing,true);
assert.equal(lucasB.carbonDegree,4,'p59 Lucas B is tertiary carbinol: OH carbon has three C neighbors');
assert.equal(lucasC.onRing,true);
assert.equal(lucasC.carbonDegree,3,'p59 Lucas C is secondary carbinol: OH carbon has two C neighbors');
const methylNeighborB=lucasB.neighbors.filter(x=>!lucasB.ring.has(x));
assert.equal(methylNeighborB.length,1,'p59 Lucas B ring-OH carbon must bear methyl');
const methylNeighborC=lucasC.neighbors.some(i=>lucasC.adj[i].some(e=>!lucasC.ring.has(e.to)));
assert.equal(methylNeighborC,true,'p59 Lucas C ring-adjacent carbon must bear methyl');
const lucasQ=questions.find(q=>q.examSource.year===2014&&q.examSource.originalQuestion==='三、按指定性质排序8');
assert.deepEqual([...lucasQ.correctOrder].join(','),'b,c,a','source-grounded tertiary > secondary > primary Lucas rate ordering');
const lucasCurve=chem.electronSvg(lucasQ);
assert.match(lucasCurve,/<h4>Lucas 反应/,'Lucas detailed electron flow diagram required');
assert.match(lucasCurve,/C–O σ电子给O/,'Lucas carbon–oxygen bond electron pair departure missing');
assert.match(lucasCurve,/Cl孤对进攻三级C/,'Lucas chloride capture must be drawn');
assert.match(lucasCurve,/不能照搬/,'do not teach primary alcohols to react via free primary carbocations');
const irQ=questions.find(q=>q.examSource.year===2018&&q.examSource.originalQuestion==='三、按指定性质排序3');
assert.ok(irQ,'scanned p40 carbonyl IR original must be in current mixed paper');
assert.deepEqual([...irQ.correctOrder].join(','),'b,a,c','p40 acyl fluoride > acyl chloride > conjugated methyl vinyl ketone');
function carbonylEnvironment(name){
 const {atoms,adj,bonds}=molecule(name);
 const carbonyl=bonds.find(([i,j,n])=>n===2&&(atoms[i][2]==='O'||atoms[j][2]==='O'));
 assert.ok(carbonyl,'missing C=O bond in IR original '+name);
 const c=atoms[carbonyl[0]][2]==='O'?carbonyl[1]:carbonyl[0];
 const halogen=adj[c].map(e=>atoms[e.to][2]).find(x=>x==='Cl'||x==='F')||null;
 const directlyAttachedVinyl=adj[c].some(e=>adj[e.to].some(q=>q.order===2&&q.to!==c && atoms[q.to][2]!=='O'));
 return {halogen,directlyAttachedVinyl};
}
assert.deepEqual(carbonylEnvironment('乙酰氯'),{halogen:'Cl',directlyAttachedVinyl:false});
assert.deepEqual(carbonylEnvironment('乙酰氟'),{halogen:'F',directlyAttachedVinyl:false});
assert.deepEqual(carbonylEnvironment('甲基乙烯基酮'),{halogen:null,directlyAttachedVinyl:true});

const water=questions.find(q=>q.id==='exam-2016-7-18');assert.equal(water.examSource.pdfPage,50,'incorrect water-solubility provenance');


const expectedPages=new Map([[2020,new Set([26,27,28,29,30,31])],[2019,new Set([35,36])],[2017,new Set([44])],[2014,new Set([59])],[2016,new Set([50])],[2018,new Set([40])],[2022,new Set([22])],[2023,new Set([16])],[2015,new Set([54])]]);
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
 ['环戊酮',{C:5,H:8,O:1}],['交叉羟醛加成目标',{C:13,H:16,O:2}],['对甲基苯甲醚',{C:8,H:10,O:1}]
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
   assert.equal(check.evaluate(q,{fields:{...all,[k]:'错误结构'}}).partialScore,(Object.keys(all).length-1)/Object.keys(all).length,'partial score must match the number of correct subparts');
   assert.equal(check.evaluate(q,{fields:Object.fromEntries(Object.keys(all).map(k=>[k,'错误']))}).partialScore,0,'all invalid should score zero');
   if(q.id==='orig-2020-iv-1-picoline-structure')assert.equal(check.evaluate(q,{fields:{A:'2-picoline',B:'2-styrylpyridine',C:'picolinaldehyde'}}).correct,true,'accepted nomenclature synonyms should grade correctly');
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
console.log('PASS: p59 Lucas ring / OH substitution topology and p40 three carbonyl IR group connections');
console.log('PASS: historical 2015 E1 electron-flow template is distinct from SN1 substitution');
console.log('PASS: p22 SN1 bromide ring positions (allylic/homoallylic/vinylic), p31 target present before answer');
console.log('PASS: source/product formulas audited, including the synthesis target and IR/NMR aromatic ether');
console.log('PASS: '+recognizedSvg+' source figures and '+recognizedAnswers+' independently redrawn answer solutions; '+Object.keys(chem.graphTemplates).length+' molecular templates validated');
console.log('Note: this is code-level verification, NOT final chemistry double-blind review or visual browser QA.');
