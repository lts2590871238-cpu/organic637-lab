import fs from 'fs';import path from 'path';import vm from 'vm';import {fileURLToPath} from 'url';
const here=path.dirname(fileURLToPath(import.meta.url));const base=path.resolve(here,'..');const assert=(c,m)=>{if(!c)throw new Error(m)};
const ctx={window:{Organic637Data:{days:{}},Organic637:{}},console};ctx.window.window=ctx.window;vm.createContext(ctx);
const loads=['data/skills.js','data/manifest.js',...Array.from({length:20},(_,i)=>`data/day${String(i+1).padStart(2,'0')}.js`),'data/phase5-augment.js','data/beginner-foundations.js','data/learning-scaffolds.js','data/beginner-first-use.js','data/beginner-closure-v3.js','data/beginner-closure-v4.js','data/exam-closure-v5.js','data/teaching-closure-v9.js','data/detective-cases.js','data/synthesis-cases.js','js/chem-visuals.js'];
for(const rel of loads){const f=path.join(base,rel);assert(fs.existsSync(f),`missing ${rel}`);vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:rel});}
const D=ctx.window.Organic637Data;const V=ctx.window.Organic637.Visuals;const G=D.BEGINNER_GLOSSARY||[];
const lessonText=r=>[r.title,r.body,r.note,...(r.formulas||[]),...(r.sequence||[]).flatMap(s=>[s.title,s.text,s.formula]),...(r.whyChain||[]),r.microCheck?.prompt,...(r.microCheck?.options||[])].filter(Boolean).join(' ');
const qText=r=>[r.prompt,r.formula,...(r.options||[]).map(o=>typeof o==='string'?o:o?.label||''),...(r.hints||[]),r.explanationLayers?.short,r.explanationLayers?.why,r.explanationLayers?.full].filter(Boolean).join(' ');
const matches=(txt,card)=>typeof D.glossaryMatches==='function'?D.glossaryMatches(txt,card):(card.aliases||[card.term]).some(a=>a&&txt.includes(a));
let lessons=0,questions=0,story=0,micro=0,hero=0,translated=0;const first=new Map();
for(let d=1;d<=20;d++){
 const day=D.days[d];assert(day,`Day${d} missing`);assert(day.grounding,`Day${d} missing grounding`);
 for(let i=0;i<(day.lessons||[]).length;i++){
  const row=day.lessons[i];lessons++;
  assert(row.grounding?.known&&row.grounding?.newThing&&row.grounding?.action,`Day${d} ${row.id} missing grounding closure`);
  assert(Array.isArray(row.whyChain)&&row.whyChain.length>=3,`Day${d} ${row.id} whyChain <3`);
  assert(Array.isArray(row.sequence)&&row.sequence.length>=3,`Day${d} ${row.id} storyboard <3`);story++;
  assert(row.microCheck&&Array.isArray(row.microCheck.options)&&row.microCheck.options.length>=2,`Day${d} ${row.id} missing microCheck`);micro++;
  assert(row.heroDiagram,`Day${d} ${row.id} missing heroDiagram`);const svg=V.render(row.heroDiagram);assert(typeof svg==='string'&&svg.includes('<svg'),`Day${d} ${row.id} heroDiagram ${row.heroDiagram} not renderable`);hero++;
  for(const step of row.sequence||[])if(step.diagram){const s=V.render(step.diagram);assert(typeof s==='string'&&s.includes('<svg'),`${row.id} sequence diagram ${step.diagram} not renderable`);}
  const txt=lessonText(row);for(const card of G)if(!first.has(card.term)&&matches(txt,card))first.set(card.term,{day:d,index:i,id:row.id});
 }
 const all=[...(day.questions||[]),...Object.values(day.repairs||{}).flat(),...(day.adaptivePool||[]),...Object.values(day.adaptivePools||{}).flat()];
 for(const q of all){questions++;assert(q.translation?.source&&Array.isArray(q.translation.steps)&&q.translation.steps.length>=3,`${q.id} missing question translation`);translated++;assert(q.preflight?.steps?.length>=3,`${q.id} missing preflight`);assert(Array.isArray(q.causalLadder)&&q.causalLadder.length>=3,`${q.id} missing causal ladder`);const txt=qText(q);for(const card of G){if(!matches(txt,card))continue;const intro=first.get(card.term);assert(intro,`${q.id} uses term ${card.term} before teaching`);assert(intro.day<=d,`${q.id} uses ${card.term} Day${d}, taught Day${intro.day}`);}}
}
for(const [term,intro] of first){const row=D.days[intro.day].lessons[intro.index];assert((row.termCards||[]).some(c=>c.term===term),`${term} first lesson ${intro.id} lacks term card`);}
const planned=[
 [4,/\bSN1\b|\bSN2\b/,'SN1/SN2'],[5,/\bE1\b|\bE2\b|anti-periplanar|Zaitsev|Hofmann/,'E1/E2 labels'],[6,/Grignard/,'Grignard preview'],[7,/Wittig|Clemmensen|Wolff.Kishner|Beckmann/,'carbonyl named tools'],[8,/亲核酰基取代|皂化/,'acyl substitution'],[9,/\benolate\b|烯醇负离子|Aldol/,'enolate/Aldol'],[10,/\bClaisen\b|\bMichael\b|Dieckmann|β-二羰基/,'Day10 enolate tools'],[11,/Hückel|亲电芳香取代|Friedel|σ-络合物/,'aromatic EAS'],[12,/重氮|Sandmeyer|偶氮|重氮化/,'diazonium'],[13,/\bDBE\b|红外|\bIR\b/,'structure IR'],[14,/\bNMR\b|核磁|singlet|doublet|triplet|quartet|\bppm\b/,'NMR'],[15,/\bCIP\b|\bR\/S\b|\bE\/Z\b|Fischer 投影|Newman/,'formal stereochem'],[17,/逆合成|retrosynthesis|断键分析|FGI/,'retrosynthesis']
];
for(const [day0,re,label] of planned){for(let d=1;d<day0;d++){const day=D.days[d];const txt=[...(day.lessons||[]).map(lessonText),...(day.questions||[]).map(qText)].join(' ');re.lastIndex=0;assert(!re.test(txt),`${label} leaked on Day${d}`);}}
assert(D.COURSE_SLOGAN==='学懂有机，会做真题','slogan mismatch');assert(D.TEACHING_CLOSURE_VERSION==='v9-question-closed-loop','v9 marker missing');assert(D.days[19].questions.reduce((s,q)=>s+Number(q.points||0),0)===150,'Day19 !=150');
console.log(`CLOSURE V9 BASE PASS: ${lessons} lessons; storyboard ${story}/${lessons}; micro-check ${micro}/${lessons}; hero diagrams ${hero}/${lessons}; ${questions} questions translated ${translated}/${questions}; glossary ${G.length}, first-use taught ${first.size}; prerequisite leakage audit PASS.`);
