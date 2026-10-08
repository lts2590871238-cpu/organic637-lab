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
   for(const f of ['data/original-exam-draft.js','js/interactions.js','js/original-chem-diagrams.js','js/original-chem-graph.js','js/original-reaction-solutions.js','js/original-spectra.js','js/exam-review.js']){
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
   const bodyOverflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   assert.ok(bodyOverflow<25,'advanced case horizontal page overflow '+viewport.name+': '+bodyOverflow);
   await page.screenshot({path:path.join(dir,'original-paper-advanced-'+viewport.name+'.png'),fullPage:true});
   assert.deepEqual(issues,[],'browser JS errors');
   console.log('PASS '+viewport.name+': SVG, answers, toggles, wrong-only, back, retry; screenshot saved');
   await page.close();
  }
 } finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
