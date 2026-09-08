import fs from 'fs';import path from 'path';import vm from 'vm';import {fileURLToPath} from 'url';
const here=path.dirname(fileURLToPath(import.meta.url));const base=path.resolve(here,'..');
const ctx={window:{Organic637Data:{days:{}},Organic637:{}},console};ctx.window.window=ctx.window;vm.createContext(ctx);
const loads=['data/skills.js','data/manifest.js',...Array.from({length:20},(_,i)=>`data/day${String(i+1).padStart(2,'0')}.js`),'data/phase5-augment.js','data/beginner-foundations.js','data/learning-scaffolds.js','data/beginner-first-use.js','data/beginner-closure-v3.js','data/beginner-closure-v4.js','data/exam-closure-v5.js','data/teaching-closure-v10.js','data/detective-cases.js','data/synthesis-cases.js','js/chem-visuals.js'];
for(const rel of loads){vm.runInContext(fs.readFileSync(path.join(base,rel),'utf8'),ctx,{filename:rel});}
const D=ctx.window.Organic637Data,G=D.BEGINNER_GLOSSARY||[];
const lessonText=r=>[r.title,r.body,r.note,...(r.formulas||[]),...(r.sequence||[]).flatMap(s=>[s.title,s.text,s.formula]),...(r.whyChain||[]),r.microCheck?.prompt,...(r.microCheck?.options||[])].filter(Boolean).join(' ');
const qText=r=>[r.prompt,r.formula,...(r.options||[]).map(o=>typeof o==='string'?o:o?.label||''),...(r.hints||[]),r.explanationLayers?.short,r.explanationLayers?.why,r.explanationLayers?.full,r.preflight?.why,...(r.preflight?.steps||[]),...(r.causalLadder||[])].filter(Boolean).join(' ');
const matches=(txt,card)=>typeof D.glossaryMatches==='function'?D.glossaryMatches(txt,card):(card.aliases||[card.term]).some(a=>a&&txt.includes(a));
const first=new Map();
for(let d=1;d<=20;d++) for(let i=0;i<(D.days[d]?.lessons||[]).length;i++){const row=D.days[d].lessons[i], txt=lessonText(row); for(const card of G) if(!first.has(card.term)&&matches(txt,card)) first.set(card.term,{day:d,id:row.id,title:row.title});}
const leaks=[];
for(let d=1;d<=20;d++){const day=D.days[d]; const rows=[...(day.questions||[]),...Object.values(day.repairs||{}).flat(),...(day.adaptivePool||[]),...Object.values(day.adaptivePools||{}).flat()]; for(const q of rows){const txt=qText(q); for(const card of G){if(!matches(txt,card))continue;const intro=first.get(card.term);if(!intro||intro.day>d)leaks.push({day:d,q:q.id,term:card.term,intro:intro?`D${intro.day}:${intro.id}`:'NONE'});}}}
console.log(JSON.stringify(leaks,null,2));
console.error('COUNT',leaks.length);
