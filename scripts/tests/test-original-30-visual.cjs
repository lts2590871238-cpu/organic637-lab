#!/usr/bin/env node
'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict');
const path=require('node:path'),fs=require('node:fs');
const files=['data/original-exam-draft.js','js/interactions.js','js/original-chem-diagrams.js','js/original-chem-graph.js','js/original-reaction-solutions.js','js/original-spectra.js','js/original-iodoform.js','js/exam-review.js'];
const dir='test-results/original-30';fs.mkdirSync(dir,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const viewport of [{name:'desktop',width:1280,height:900},{name:'mobile',width:390,height:844}]){
   const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height},deviceScaleFactor:1});
   const exceptions=[];page.on('pageerror',err=>exceptions.push(err.message));
   await page.setContent('<!doctype html><html lang="zh"><head><meta charset="utf-8"></head><body><main id="paperReviewRoot"></main></body></html>');
   await page.addStyleTag({path:path.resolve('styles.css')});
   for(const file of files)await page.addScriptTag({path:path.resolve(file)});
   for(const day of [19,20]){
    const all=await page.evaluate(d=>window.Organic637.OriginalExamDraft.questions.filter(q=>q.day===d).map(q=>q.id),day);
    assert.equal(all.length,15,'expected exactly 15 scanned exam questions for day '+day);
    for(let start=0;start<15;start+=5){
     const results=await page.evaluate(({d,start})=>{
       const qs=window.Organic637.OriginalExamDraft.questions.filter(q=>q.day===d).slice(start,start+5);
       const rows=qs.map(q=>{
         const fields=Object.fromEntries(Object.entries(q.answer||{}).filter(([,v])=>Array.isArray(v)).map(([k,v])=>[k,v[0]]));
         const payload=q.type==='ranking'?{order:q.correctOrder}:
           q.type==='text-short'?{value:q.answer[0]}:
           q.type==='structure-deduction'||q.type==='synthesis-steps'?{fields,freeRoute:q.type==='synthesis-steps'?'我拟定：LDA预先生成烯醇盐、加环戊酮、温和后处理':''}:
           {selected:q.answer};
         const evaluation=window.Organic637.Interactions.evaluate(q,payload);
         return {question:q,hasEvidence:true,correct:evaluation.correct,partialScore:evaluation.partialScore,payload};
       });
       window.Organic637.ExamReview.render(document.querySelector('#paperReviewRoot'),{
         title:'发布前30题全覆盖 '+d+' · '+(start+1)+'—'+(start+5),
         scoreLabel:'独立结构与原卷回归检查',rows,onBack(){},onRetry(){}
       });
       return rows.map(r=>({id:r.question.id,partial:r.partialScore,correct:r.correct,source:r.question.examSource}));
     },{d:day,start});
     assert.equal(results.length,5);
     for(const r of results){
       assert.equal(r.correct,true,'reference answer failed '+r.id);
       assert.equal(r.partial,1,'reference answer not fully credited '+r.id);
       assert.ok(r.source.year&&r.source.pdfPage&&r.source.originalQuestion,'untraceable exam question '+r.id);
     }
     await page.locator('#paperAllOpen').click();
     assert.equal(await page.locator('details.paper-details[open]').count(),5);
     assert.equal(await page.locator('.original-source-label').count(),5);
     assert.equal(await page.locator('.paper-comparison').count(),5);
     assert.equal(await page.locator('.paper-correct-scheme, .paper-concept-scheme').count(),5,'must have own redrawn answer drawing');
     const errors=await page.evaluate(()=>{
       const problems=[];
       document.querySelectorAll('.paper-question svg').forEach((svg,i)=>{
         try{if(!svg.querySelector('path,line,polygon,polyline,text,circle,rect'))problems.push('empty SVG '+i);}catch(e){problems.push('SVG parse '+i)}
       });
       if(document.documentElement.scrollWidth-innerWidth>25)problems.push('horizontal viewport overflow '+(document.documentElement.scrollWidth-innerWidth));
       return problems;
     });
     assert.deepEqual(errors,[],'responsive visual structure issue day '+day+' group '+start);
     const zoom=page.locator('.paper-zoom-trigger').first();
     await zoom.click();await page.locator('.paper-zoom-dialog[open]').waitFor();
     assert.ok(await page.locator('.paper-zoom-art svg').count()>0);
     await page.locator('#paperZoomClose').click();
     assert.equal(await page.locator('.paper-zoom-dialog[open]').count(),0);
     const filename='day'+day+'-'+(start+1)+'-'+(start+5)+'-'+viewport.name+'.png';
     await page.screenshot({path:path.join(dir,filename),fullPage:true});
     console.log('PASS '+viewport.name+' Day '+day+' questions '+(start+1)+'-'+(start+5));
    }
   }
   assert.deepEqual(exceptions,[],'uncaught browser errors');
   await page.close();
  }
  console.log('PASS all 30 scans and correct answers in desktop/mobile real Chromium; 12 screenshot proofs saved');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1;});
