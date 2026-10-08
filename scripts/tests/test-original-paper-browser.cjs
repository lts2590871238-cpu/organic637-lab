#!/usr/bin/env node
'use strict';
const {chromium}=require('playwright');
const path=require('node:path');
const fs=require('node:fs');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const viewport of [{name:'desktop',width:1280,height:860},{name:'mobile',width:390,height:844}]){
   const page=await browser.newPage({viewport:{width:viewport.width,height:viewport.height},deviceScaleFactor:1});
   const issues=[];
   page.on('pageerror',e=>issues.push(e.message));
   await page.setContent('<!doctype html><html lang="zh"><head><meta charset="utf-8"></head><body><main id="paperReviewRoot"></main></body></html>');
   await page.addStyleTag({path:path.resolve('styles.css')});
   for(const f of ['data/original-exam-draft.js','js/interactions.js','js/original-chem-diagrams.js','js/original-chem-graph.js','js/original-reaction-solutions.js','js/original-spectra.js','js/original-iodoform.js','js/exam-review.js']){
    await page.addScriptTag({path:path.resolve(f)});
   }
   await page.evaluate(()=>{
     const q=window.Organic637.OriginalExamDraft.questions;
     const wrong=q.find(x=>x.examSource.year===2020&&x.examSource.originalQuestion==='一、选择题12');
     const right=q.find(x=>x.examSource.year===2022&&x.examSource.originalQuestion==='二、选择题5');
     window.__wentBack=false;window.__didRedo=false;window.confirm=()=>true;
     window.Organic637.ExamReview.render(document.querySelector('#paperReviewRoot'),{
       title:'真题混合卷交卷复盘',scoreLabel:'90 / 150',rows:[
         {question:wrong,correct:false,hasEvidence:true,partialScore:0,payload:{selected:'d'}},
         {question:right,correct:true,hasEvidence:true,partialScore:1,payload:{selected:'b'}}
       ],onBack(){window.__wentBack=true;},onRetry(){window.__didRedo=true;}
     });
   });
   assert.equal(await page.locator('.paper-question').count(),2,'two answered questions visible');
   assert.equal(await page.locator('.paper-correct-scheme').count(),2,'correct answer structure missing');
   assert.ok(await page.locator('svg.mol-graph-svg').count()>=8,'original molecular SVG missing');
   assert.ok(await page.locator('.paper-electron-diagram svg').count()>=1,'electron movement drawing missing');
   await page.locator('#paperAllOpen').click();
   assert.equal(await page.locator('details.paper-details[open]').count(),2);
   await page.locator('#paperAllClose').click();
   assert.equal(await page.locator('details.paper-details[open]').count(),0);
   await page.locator('#paperOnlyWrong').click();
   assert.equal(await page.locator('.paper-question:visible').count(),1,'wrong-only filter failed');
   await page.locator('#paperOnlyWrong').click();
   assert.equal(await page.locator('.paper-question:visible').count(),2,'restore all questions failed');
   await page.locator('#paperAllOpen').click();
   await page.locator('#paper-item-2').scrollIntoViewIfNeeded();
   const dir='test-results';fs.mkdirSync(dir,{recursive:true});
   await page.screenshot({path:path.join(dir,'original-paper-'+viewport.name+'.png'),fullPage:true});
   await page.locator('#paperBackBottom').click();
   assert.equal(await page.evaluate(()=>window.__wentBack),true);
   await page.locator('#paperRetryBottom').click();
   assert.equal(await page.evaluate(()=>window.__didRedo),true);
   // Advanced questions: real original 2020 open synthesis and IR/NMR deduction.
   await page.evaluate(()=>{
     const q=window.Organic637.OriginalExamDraft.questions,
       synth=q.find(x=>x.id==='orig-2020-vii-2-aldol-synthesis'),
       spectra=q.find(x=>x.id==='orig-2020-iv-2-ir-nmr');
     const payload1={fields:{base:'LDA',electrophile:'环戊酮',workup:'NH4Cl'},freeRoute:'先苯乙酮烯醇化，再加环戊酮后温和质子化'};
     const payload2={fields:{structure:'对甲基苯甲醚',aromatic:'2H+2H',methoxy:'甲氧基',arylMethyl:'芳环甲基'}};
     window.Organic637.ExamReview.render(document.querySelector('#paperReviewRoot'),{
       title:'原卷高级题复盘：合成与谱图',scoreLabel:'20 / 20（仅用于截图测试）',
       rows:[{question:synth,correct:true,hasEvidence:true,partialScore:1,payload:payload1},
         {question:spectra,correct:true,hasEvidence:true,partialScore:1,payload:payload2}],
       onBack(){},onRetry(){}
     });
   });
   await page.locator('#paperAllOpen').click();
   assert.equal(await page.locator('.paper-question').count(),2,'advanced q render failed');
   assert.ok(await page.locator('.original-spectrum svg').count()>=1,'redrawn IR/NMR trace explanation missing');
   assert.ok(await page.locator('.original-molecule-grid svg').count()>=4,'synthetic precursors and exact products not drawn');
   assert.ok((await page.locator('.paper-comparison').first().innerText()).includes('我的自由路线'),'student-written synthesis plan missing from review');
   // Open the actual SVG enlargement view and use the return button.
   const zoom=page.locator('.paper-question').first().locator('.paper-zoom-trigger').first();
   await zoom.waitFor();
   await zoom.click();
   await page.locator('.paper-zoom-dialog[open]').waitFor();
   assert.ok(await page.locator('.paper-zoom-art svg').count()>=1,'zoom did not clone the original vector chemical structure');
   await page.locator('#paperZoomClose').click();
   assert.equal(await page.locator('.paper-zoom-dialog[open]').count(),0,'return-to-paper did not close the enlargement');
   const single=await page.evaluate(()=>{
     const f=document.querySelector('.paper-correct-scheme .original-molecule-grid > figure:only-child');
     return f?{figure:f.getBoundingClientRect().width,grid:f.parentElement.getBoundingClientRect().width}:null;
   });
   assert.ok(single&&single.figure/single.grid>0.85,'single correct-answer molecular SVG wastes half of phone width');
   const spectrumZoom=page.locator('.original-spectrum .paper-zoom-trigger');
   await spectrumZoom.click();
   await page.locator('.paper-zoom-dialog[open]').waitFor();
   assert.ok(await page.locator('.paper-zoom-art.is-wide svg').count()>0,'spectrum needs scrollable readable enlargement');
   await page.locator('#paperZoomClose').click();
   const bodyOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   assert.ok(bodyOverflow<25,'advanced case horizontal page overflow '+viewport.name+': '+bodyOverflow);
   await page.screenshot({path:path.join(dir,'original-paper-advanced-'+viewport.name+'.png'),fullPage:true});
   // Source-grounded Lucas reaction and IR acyl-halide comparisons:
   // show *the scanned molecular choices* and inspect tertiary alcohol curved arrows.
   await page.evaluate(()=>{
     const qs=window.Organic637.OriginalExamDraft.questions;
     const lucas=qs.find(x=>x.examSource.year===2014&&x.examSource.originalQuestion==='三、按指定性质排序8');
     const ir=qs.find(x=>x.examSource.year===2018&&x.examSource.originalQuestion==='三、按指定性质排序3');
     window.Organic637.ExamReview.render(document.querySelector('#paperReviewRoot'),{
       title:'原卷来源和分子结构专项：Lucas及羰基红外排序',scoreLabel:'仅作逐题绘图验收',
       rows:[
         {question:lucas,correct:true,hasEvidence:true,partialScore:1,payload:{order:lucas.correctOrder}},
         {question:ir,correct:true,hasEvidence:true,partialScore:1,payload:{order:ir.correctOrder}}
       ],onBack(){},onRetry(){}
     });
   });
   await page.locator('#paperAllOpen').click();
   assert.equal(await page.locator('.paper-question').count(),2);
   assert.ok(await page.locator('svg.mol-graph-svg').count()>=12,
     'Lucus and IR 3-option molecular diagrams missing');
   const lucasBlock=await page.locator('.paper-electron-diagram').first().innerText();
   assert.match(lucasBlock,/ZnCl₂|C–O|Lucas/,'Lucas mechanistic explanation missing');
   assert.ok(await page.locator('svg[aria-label*="Lucas试剂"]').count()>=1,
     'Lucas electron-pair curved-arrow schematic missing');
   const lucasOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   assert.ok(lucasOverflow<25,'Lucas/IR chemistry page overflow '+viewport.name+': '+lucasOverflow);
   await page.screenshot({path:path.join(dir,'original-paper-lucas-ir-'+viewport.name+'.png'),fullPage:true});

   // 2020 scan p27 and 2022 scan p22: actual iodine-carbon structures, not generic formulas.
   await page.evaluate(()=>{
     const qs=window.Organic637.OriginalExamDraft.questions;
     const positive=qs.find(q=>q.examSource.year===2020&&q.examSource.originalQuestion==='一、选择题12');
     const negative=qs.find(q=>q.examSource.year===2022&&q.examSource.originalQuestion==='二、选择题7');
     window.Organic637.ExamReview.render(document.querySelector('#paperReviewRoot'),{
       title:'原卷碘仿专项：结构与机理',scoreLabel:'两题均供复盘检查',
       rows:[
         {question:positive,hasEvidence:true,correct:true,partialScore:1,payload:{selected:'a'}},
         {question:negative,hasEvidence:true,correct:true,partialScore:1,payload:{selected:'b'}}
       ],onBack(){},onRetry(){}
     });
   });
   await page.locator('#paperAllOpen').click();
   assert.equal(await page.locator('.paper-question').count(),2,'iodoform source pair not rendered');
   assert.ok(await page.locator('.paper-iodoform-mechanism').count()>=2,'separate 2020 and 2022 mechanisms missing');
   assert.ok(await page.locator('svg[aria-label*="碘仿反应电子对箭头"]').count()>=2,'iodoform electron-arrow figures missing');
   assert.ok(await page.locator('.paper-iodoform-graphs svg.mol-graph-svg').count()>=8,'redrawn iodoform intermediates/products not shown');
   assert.match(await page.locator('.paper-question').first().innerText(),/苯乙醛/,'scanned phenylacetaldehyde distractor missing');
   assert.match(await page.locator('.paper-question').last().innerText(),/叔丁基甲醛|季碳/,'scanned pivaldehyde negative case missing');
   const iodoOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   assert.ok(iodoOverflow<25,'iodoform explanation spills outside phone viewport: '+viewport.name+' '+iodoOverflow);
   await page.screenshot({path:path.join(dir,'original-paper-iodoform-'+viewport.name+'.png'),fullPage:true});

   // New source/answer review for p28 reaction products and p29 A/B/C deduction:
   // this screenshot is used for visual comparison with the uploaded pages.
   await page.evaluate(()=>{
     const qs=window.Organic637.OriginalExamDraft.questions;
     const reduction=qs.find(q=>q.id==='orig-2020-ii-10-nabh4');
     const cyclize=qs.find(q=>q.id==='orig-2020-ii-5-intramolecular-fc');
     const deduction=qs.find(q=>q.id==='orig-2020-iv-1-picoline-structure');
     const fields=Object.fromEntries(Object.entries(deduction.answer).map(([k,v])=>[k,v[0]]));
     window.Organic637.ExamReview.render(document.querySelector('#paperReviewRoot'),{
       title:'2020 原卷第28-29页反应和结构推导 · 逐键复盘',
       scoreLabel:'用于原卷视觉审校的三道真题',
       rows:[
        {question:reduction,correct:true,hasEvidence:true,partialScore:1,payload:{value:reduction.answer[0]}},
        {question:cyclize,correct:true,hasEvidence:true,partialScore:1,payload:{value:cyclize.answer[0]}},
        {question:deduction,correct:true,hasEvidence:true,partialScore:1,payload:{fields}}
       ],onBack(){},onRetry(){}
     });
   });
   await page.locator('#paperAllOpen').click();
   assert.equal(await page.locator('.paper-question').count(),3,'2020 p28-29 selected original questions not rendered');
   assert.ok(await page.locator('svg.mol-graph-svg').count()>=7,'source 2020 p28-29 structures not actually redrawn');
   const photoOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   assert.ok(photoOverflow<25,'p28/p29 redrawn reaction study spills off phone: '+viewport.name+' '+photoOverflow);
   await page.screenshot({path:path.join(dir,'original-paper-2020-p28-29-'+viewport.name+'.png'),fullPage:true});
   assert.deepEqual(issues,[],'browser JS errors');
   console.log('PASS '+viewport.name+': SVG, answers, toggles, wrong-only, back, retry; screenshot saved');
   await page.close();
  }
 } finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
