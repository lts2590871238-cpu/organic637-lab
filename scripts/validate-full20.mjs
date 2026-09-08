import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';
const here=path.dirname(fileURLToPath(import.meta.url));
const base=path.resolve(here,'..');
const assert=(c,m)=>{if(!c)throw new Error(m)};
const ctx={window:{Organic637Data:{days:{}}},console};ctx.window.window=ctx.window;vm.createContext(ctx);
const loads=['data/skills.js','data/manifest.js',...Array.from({length:20},(_,i)=>`data/day${String(i+1).padStart(2,'0')}.js`),'data/phase5-augment.js','data/learning-scaffolds.js','data/detective-cases.js','data/synthesis-cases.js'];
for(const rel of loads){const full=path.join(base,rel);assert(fs.existsSync(full),`missing ${rel}`);vm.runInContext(fs.readFileSync(full,'utf8'),ctx,{filename:rel});}
const D=ctx.window.Organic637Data;
assert(D.MANIFEST?.days?.length===20,'manifest must have 20 days');
assert(D.SKILLS?.length>80,'skill registry unexpectedly small');
const skillIds=new Set(D.SKILLS.map(x=>x.id));
const globalIds=new Map();
let questionTotal=0,repairTotal=0,adaptiveTotal=0;
const allowedTypes=new Set(['choice','multi-choice','structure-choice','ranking','route','synthesis','electron-arrow','detective','detective-case','synthesis-case','numeric','text-short']);
for(let d=1;d<=20;d++){
 const day=D.days[d];assert(day,`Day ${d} missing`);assert(day.day===d,`Day ${d} day field mismatch`);assert(day.title&&day.title.length>=4,`Day ${d} title missing`);assert(Number(day.estimatedMinutes)>=60&&Number(day.estimatedMinutes)<=90,`Day ${d} estimatedMinutes not 60-90`);assert(Array.isArray(day.lessons)&&day.lessons.length>=1,`Day ${d} lessons missing`);assert(Array.isArray(day.questions)&&day.questions.length>=6,`Day ${d} too few questions`);
 const rows=[...(day.questions||[])];questionTotal+=rows.length;
 const repairs=Object.values(day.repairs||{}).flat();repairTotal+=repairs.length;rows.push(...repairs);
 const adaptive=Object.values(day.adaptivePools||{}).flat();adaptiveTotal+=adaptive.length;rows.push(...adaptive);
 for(const q of rows){
  assert(q.id,`Day ${d} question without id`);if(globalIds.has(q.id))throw new Error(`duplicate id ${q.id} (day ${globalIds.get(q.id)} and ${d})`);globalIds.set(q.id,d);
  assert(allowedTypes.has(q.type),`${q.id} unsupported type ${q.type}`);
  assert(q.primarySkill&&skillIds.has(q.primarySkill),`${q.id} missing/unknown primarySkill ${q.primarySkill}`);
  for(const s of q.skillIds||[])assert(skillIds.has(s),`${q.id} unknown skill ${s}`);
  assert(q.prompt&&q.prompt.trim(),`${q.id} missing prompt`);
  if(!['detective-case','synthesis-case'].includes(q.type))assert(q.explanationLayers&&typeof q.explanationLayers.short==='string',`${q.id} missing explanationLayers.short`);
  if(['choice','structure-choice'].includes(q.type)){assert(Array.isArray(q.options)&&q.options.length>=2,`${q.id} choice options missing`);assert(q.answer!=null,`${q.id} answer missing`);const ids=new Set(q.options.map((o,i)=>String(typeof o==='object'?(o.id??i):i)));assert(ids.has(String(typeof q.answer==='object'?(q.answer.id??q.answer.optionId??q.answer.value):q.answer)),`${q.id} answer not in options`);}
  if(q.type==='multi-choice'){assert(Array.isArray(q.options)&&q.options.length>=2,`${q.id} multi options missing`);assert(Array.isArray(q.answer),`${q.id} multi answer not array`);}
  if(q.type==='ranking'){const order=(q.correctOrder||q.answer?.correctOrder||[]).map(String);assert(Array.isArray(q.items)&&q.items.length>=2,`${q.id} ranking items missing`);assert(order.length===q.items.length,`${q.id} ranking correctOrder length mismatch`);const itemIds=new Set(q.items.map(x=>String(x.id)));for(const x of order)assert(itemIds.has(x),`${q.id} ranking answer references ${x}`);}
  if(['route','synthesis'].includes(q.type)&&q.graph){const nodes=new Set((q.graph.nodes||[]).map(x=>String(x.id)));assert(nodes.has(String(q.graph.start)),`${q.id} missing graph start`);assert(nodes.has(String(q.graph.target)),`${q.id} missing graph target`);const edgeIds=new Set();for(const e of q.graph.edges||[]){assert(nodes.has(String(e.from))&&nodes.has(String(e.to)),`${q.id} edge ${e.id} bad node ref`);assert(!edgeIds.has(String(e.id)),`${q.id} duplicate edge ${e.id}`);edgeIds.add(String(e.id));}}
  if(q.type==='electron-arrow'){const spots=new Set((q.hotspots||[]).map(x=>String(x.id)));assert(spots.size>=2,`${q.id} insufficient hotspots`);const exp=q.expectedArrows||q.answer?.expectedArrows||[];assert(exp.length>=1,`${q.id} expected arrows missing`);for(const a of exp)assert(spots.has(String(a.source))&&spots.has(String(a.target)),`${q.id} arrow references missing hotspot`);}
  if(q.type==='detective-case')assert((D.DETECTIVE_CASES||[]).some(x=>x.id===q.caseId),`${q.id} missing detective case ${q.caseId}`);
  if(q.type==='synthesis-case')assert((D.SYNTHESIS_CASES||[]).some(x=>x.id===q.caseId),`${q.id} missing synthesis case ${q.caseId}`);
 }
}
const d19=D.days[19];assert(d19.mode==='exam','Day19 must be exam mode');assert(d19.questions.reduce((s,q)=>s+Number(q.points||0),0)===150,'Day19 points must total 150');
const d20=D.days[20];assert(Object.keys(d20.adaptivePools||{}).length>=3,'Day20 adaptive pools missing');assert(Array.isArray(d20.fallbackSkills)&&d20.fallbackSkills.length===3,'Day20 fallback skills must have 3');
for(const kase of D.DETECTIVE_CASES||[]){assert(kase.id&&kase.formula&&Array.isArray(kase.candidates)&&kase.candidates.length>=2,`bad detective case ${kase.id}`);assert(kase.candidates.some(c=>String(c.id)===String(kase.correctCandidate)),`detective ${kase.id} correct candidate missing`);}
for(const kase of D.SYNTHESIS_CASES||[]){assert(kase.id&&kase.start&&kase.target&&Array.isArray(kase.graph?.nodes)&&Array.isArray(kase.graph?.edges),`bad synthesis case ${kase.id}`);}
const index=fs.readFileSync(path.join(base,'index.html'),'utf8');for(const match of index.matchAll(/(?:src|href)="([^"]+)"/g)){const ref=match[1];if(/^(https?:|#)/.test(ref))continue;assert(fs.existsSync(path.join(base,ref.split('?')[0])),`index references missing ${ref}`);}
for(const f of ['random-home.jpg','boss-exercise.jpg','review-page.jpg','study-page.jpg','welcome-page.jpg'])assert(fs.existsSync(path.join(base,'assets/mascots',f)),`missing mascot ${f}`);
const config=fs.readFileSync(path.join(base,'config.js'),'utf8');assert(config.includes('https://organic637-lab-api.lts2590871238.workers.dev'),'config API URL changed unexpectedly');
let combined='';for(const rel of ['app.js','js/interactions.js','js/detective.js','js/synthesis.js',...Array.from({length:20},(_,i)=>`data/day${String(i+1).padStart(2,'0')}.js`)])combined+=fs.readFileSync(path.join(base,rel),'utf8')+'\n';assert(!/TODO|COMING SOON/i.test(combined),'unfinished marker found');
console.log(`FULL20 VALIDATION PASS: 20 days; ${questionTotal} main questions; ${repairTotal} repairs; ${adaptiveTotal} adaptive tasks; ${D.DETECTIVE_CASES.length} structure cases; ${D.SYNTHESIS_CASES.length} synthesis cases; Day19=150/150.`);
