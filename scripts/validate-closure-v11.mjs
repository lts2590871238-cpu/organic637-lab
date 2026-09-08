import fs from 'fs';import path from 'path';import vm from 'vm';import {fileURLToPath} from 'url';
const here=path.dirname(fileURLToPath(import.meta.url));const base=path.resolve(here,'..');const assert=(c,m)=>{if(!c)throw new Error(m)};
const ctx={window:{Organic637Data:{days:{}},Organic637:{}},console};ctx.window.window=ctx.window;vm.createContext(ctx);
const loads=['data/skills.js','data/manifest.js',...Array.from({length:20},(_,i)=>`data/day${String(i+1).padStart(2,'0')}.js`),'data/phase5-augment.js','data/beginner-foundations.js','data/learning-scaffolds.js','data/beginner-first-use.js','data/beginner-closure-v3.js','data/beginner-closure-v4.js','data/exam-closure-v5.js','data/teaching-closure-v10.js','data/teaching-closure-v11.js','data/detective-cases.js','data/synthesis-cases.js','js/chem-visuals.js'];
for(const rel of loads){const f=path.join(base,rel);assert(fs.existsSync(f),`missing ${rel}`);vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:rel});}
const D=ctx.window.Organic637Data,V=ctx.window.Organic637.Visuals;let guided=0,questions=0,causal=0,bridges=0,diagrams=0;
const generic=/先圈|先读完整条件|结构—电子—稳定性—条件模型|前面已经学过的内容/;
for(let day=7;day<=18;day++){
 const d=D.days[day];assert(d,`Day${day} missing`);
 const all=[...(d.questions||[]),...Object.values(d.repairs||{}).flat(),...(d.adaptivePool||[]),...Object.values(d.adaptivePools||{}).flat()];
 for(const q of all){
  questions++;
  assert(Array.isArray(q.guidedFrames)&&q.guidedFrames.length>=3,`${q.id} guidedFrames <3`);guided++;
  for(const f of q.guidedFrames){assert(f.title&&f.text,`${q.id} incomplete guided frame`);if(f.diagram){const svg=V.render(f.diagram);assert(typeof svg==='string'&&svg.includes('<svg'),`${q.id} diagram ${f.diagram} missing`);diagrams++;}}
  assert(Array.isArray(q.causalLadder)&&q.causalLadder.length>=4,`${q.id} causal ladder <4`);causal++;
  assert(q.causalLadder.every(x=>String(x).length>=24),`${q.id} causal ladder too shallow`);
  assert(q.examBridge?.format&&q.examBridge?.ask,`${q.id} missing exam bridge`);bridges++;
  assert(q.translation?.steps?.length>=3,`${q.id} translation <3`);
  assert(q.preflight?.steps?.length>=3,`${q.id} preflight <3`);
  if(q.primarySkill!=='exam.mixed_transfer') assert(!q.causalLadder.every(x=>generic.test(String(x))),`${q.id} looks generic`);
 }
}
assert(D.TEACHING_CLOSURE_VERSION==='v11-human-audit-guided-questions','v11 marker missing');
assert(D.QUESTION_GUIDE_VERSION==='v11','question guide marker missing');
assert(D.COURSE_SLOGAN==='学懂有机，会做真题','slogan mismatch');
assert(D.days[19].questions.reduce((s,q)=>s+Number(q.points||0),0)===150,'Day19 !=150');
console.log(`CLOSURE V11 PASS: Day7-18 ${questions} questions; guided ${guided}/${questions}; causal ${causal}/${questions}; exam bridges ${bridges}/${questions}; renderable guided diagrams ${diagrams}.`);
