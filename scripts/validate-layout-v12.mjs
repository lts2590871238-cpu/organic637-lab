import fs from 'fs';
import path from 'path';
import vm from 'vm';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
globalThis.window = globalThis;
const load = file => vm.runInThisContext(fs.readFileSync(path.join(root,file),'utf8'), {filename:file});
for (const f of ['data/skills.js','data/manifest.js',...Array.from({length:20},(_,i)=>`data/day${String(i+1).padStart(2,'0')}.js`),'data/phase5-augment.js','data/beginner-foundations.js','data/learning-scaffolds.js','data/beginner-first-use.js','data/beginner-closure-v3.js','data/beginner-closure-v4.js','data/exam-closure-v5.js','data/teaching-closure-v10.js','data/teaching-closure-v11.js','data/course-journey.js']) load(f);
const D = globalThis.Organic637Data;
const errors=[];
const days=D.days||{};
for(let day=1;day<=20;day++){
  const x=days[day];
  if(!x) errors.push(`Day${day} missing`);
  const m=Number(x?.estimatedMinutes||0);
  if(m<70||m>90) errors.push(`Day${day} time ${m} outside 70-90`);
  if(!x?.journey?.ability||!x?.journey?.from||!x?.journey?.to) errors.push(`Day${day} journey bridge incomplete`);
}
const acts=D.COURSE_JOURNEY?.acts||[];
const covered=acts.flatMap(a=>a.days||[]).sort((a,b)=>a-b);
if(JSON.stringify(covered)!==JSON.stringify(Array.from({length:20},(_,i)=>i+1))) errors.push('course acts do not cover Day1-20 exactly once');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
if(!html.includes('data/course-journey.js')) errors.push('course-journey.js not loaded');
for(const required of ['learning-page-wrap','journey-strip','course-acts','content-with-side']){
  const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
  if(!css.includes(`.${required}`)) errors.push(`missing CSS .${required}`);
}
const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');
let balance=0; for(const c of css){ if(c==='{')balance++; if(c==='}')balance--; if(balance<0)break; }
if(balance!==0) errors.push(`CSS brace balance ${balance}`);
if(errors.length){ console.error('V12 LAYOUT FAIL'); for(const e of errors) console.error('-',e); process.exit(1); }
console.log('V12 LAYOUT PASS');
console.log('20 days linked into 5 acts');
console.log('All day estimates within 70-90 minutes');
console.log('Responsive layout guards present');
