import fs from 'fs';import path from 'path';import vm from 'vm';import {fileURLToPath} from 'url';
const here=path.dirname(fileURLToPath(import.meta.url));const base=path.resolve(here,'..');const assert=(c,m)=>{if(!c)throw new Error(m)};
const ctx={window:{Organic637Data:{days:{}}},console};ctx.window.window=ctx.window;vm.createContext(ctx);
const loads=['data/skills.js','data/manifest.js',...Array.from({length:20},(_,i)=>`data/day${String(i+1).padStart(2,'0')}.js`),'data/phase5-augment.js','data/beginner-foundations.js','data/learning-scaffolds.js','data/beginner-first-use.js','data/beginner-closure-v3.js','data/beginner-closure-v4.js','data/detective-cases.js','data/synthesis-cases.js'];
for(const rel of loads){const f=path.join(base,rel);assert(fs.existsSync(f),`missing ${rel}`);vm.runInContext(fs.readFileSync(f,'utf8'),ctx,{filename:rel});}
const D=ctx.window.Organic637Data;const G=D.BEGINNER_GLOSSARY||[];
const lessonText=r=>[r.title,r.body,r.note,...(r.formulas||[]),...(r.sequence||[]).flatMap(s=>[s.title,s.text,s.formula]),...(r.whyChain||[]),r.microCheck?.prompt,...(r.microCheck?.options||[])].filter(Boolean).join(' ');
const qText=r=>[r.prompt,r.formula,...(r.options||[]).map(o=>typeof o==='string'?o:o?.label||''),...(r.hints||[]),r.explanationLayers?.short,r.explanationLayers?.why,r.explanationLayers?.full].filter(Boolean).join(' ');
const matches=(txt,card)=>typeof D.glossaryMatches==='function'?D.glossaryMatches(txt,card):(card.aliases||[card.term]).some(a=>a&&txt.includes(a));
const firstLesson=new Map();
let lessonTotal=0,questionTotal=0,withSequence=0,withMicro=0,withWhy=0,withAnalogy=0;
for(let d=1;d<=20;d++){
 const day=D.days[d];assert(day,`Day${d} missing`);
 for(let i=0;i<(day.lessons||[]).length;i++){
  const row=day.lessons[i];lessonTotal++;assert(row.title&&row.body,`Day${d} lesson ${row.id} missing title/body`);assert(Array.isArray(row.whyChain)&&row.whyChain.length,`Day${d} lesson ${row.id} missing whyChain`);withWhy++;if(row.sequence?.length)withSequence++;if(row.microCheck)withMicro++;if(row.analogy)withAnalogy++;
  const text=lessonText(row);for(const card of G)if(!firstLesson.has(card.term)&&matches(text,card))firstLesson.set(card.term,{day:d,index:i,id:row.id,title:row.title});
 }
 const all=[...(day.questions||[]),...Object.values(day.repairs||{}).flat(),...(day.adaptivePool||[]),...Object.values(day.adaptivePools||{}).flat()];
 for(const row of all){questionTotal++;assert(row.preflight?.steps?.length>=3,`${row.id} missing 3-step preflight`);assert(Array.isArray(row.causalLadder)&&row.causalLadder.length>=3,`${row.id} missing causal ladder`);const text=qText(row);for(const card of G){if(!matches(text,card))continue;const intro=firstLesson.get(card.term);assert(intro,`${row.id} uses glossary term ${card.term} before any teaching lesson`);assert(intro.day<=d,`${row.id} uses ${card.term} on Day${d}, first taught Day${intro.day}`);}}
}
// every first-use glossary item must actually show as a term card on its introduction lesson
for(const [term,intro] of firstLesson){const row=D.days[intro.day].lessons[intro.index];assert((row.termCards||[]).some(c=>c.term===term),`${term} first lesson ${intro.id} lacks termCard`);}
// high-risk future terminology forbidden before its planned day, even if a generic glossary alias could hide it
const forbid=[
 {before:4,re:/\bSN1\b|\bSN2\b/g,label:'SN1/SN2 before Day4'},
 {before:5,re:/\bE1\b|\bE2\b|anti-periplanar|Zaitsev|Hofmann/g,label:'elimination labels before Day5'},
 {before:10,re:/\bClaisen\b|\bMichael\b|Dieckmann|β-二羰基/g,label:'Day10 enolate labels before Day10'},
 {before:14,re:/\bNMR\b|核磁|singlet|doublet|triplet|quartet|\bppm\b/g,label:'NMR before Day14'},
 {before:15,re:/\bCIP\b|\bR\/S\b|\bE\/Z\b|Fischer 投影|Newman/g,label:'formal stereochem before Day15'}
];
for(const rule of forbid){for(let d=1;d<rule.before;d++){const day=D.days[d];const txt=[...(day.lessons||[]).map(lessonText),...(day.questions||[]).map(qText)].join(' ');assert(!rule.re.test(txt),`${rule.label}: found in Day${d}`);rule.re.lastIndex=0;}}
assert(D.days[19].questions.reduce((s,q)=>s+Number(q.points||0),0)===150,'Day19 not 150 points');
console.log(`CLOSURE V4 PASS: ${lessonTotal} lessons; ${questionTotal} main/repair/adaptive question records checked; glossary ${G.length}; taught glossary ${firstLesson.size}; whyChain ${withWhy}/${lessonTotal}; storyboard ${withSequence}; micro-check ${withMicro}; analogy ${withAnalogy}; no planned-term prerequisite leakage.`);
