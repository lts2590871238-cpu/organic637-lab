#!/usr/bin/env node
'use strict';
// Full in-app flow test with a fake authorized account and an isolated local server.
// No production credentials or requests reach the real Cloudflare Worker.
const {chromium}=require('playwright');
const http=require('node:http');
const path=require('node:path');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const mime={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
const server=http.createServer((req,res)=>{
 let pathname;
 try{pathname=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname);}catch{res.writeHead(400).end();return;}
 const name=path.join(process.cwd(),pathname==='/'?'index.html':pathname.replace(/^\//,''));
 if(!name.startsWith(process.cwd()+path.sep)){res.writeHead(403).end();return;}
 fs.readFile(name,(err,body)=>{
  if(err){res.writeHead(404).end('Missing');return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(name)]||'application/octet-stream'}).end(body);
 });
});
const listen=()=>new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const close=()=>new Promise(resolve=>server.close(resolve));
async function run(){
 await listen();
 const port=server.address().port,browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1100,height:780}});
  const errs=[];page.on('pageerror',err=>errs.push(err.message));
  const fakeUser={id:'test-original-journey',username:'automation_tester'};
  await page.route('**/organic637-lab-api.*/**',route=>{
   const url=route.request().url();
   const body=url.includes('/auth/me')?{ok:true,user:fakeUser}:url.includes('/sync/pull')?{ok:true,chunks:{}}:{ok:true};
   route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(body)});
  });
  await page.addInitScript((u)=>{
    localStorage.setItem('organic637_clean_v1_auth',JSON.stringify({token:'E2E-FAKE-NOT-A-REAL-SESSION',user:u,expires_at:Date.now()+3600000}));
    window.confirm=()=>true;
  },fakeUser);
  await page.goto('http://127.0.0.1:'+port+'/#welcome',{waitUntil:'domcontentloaded'});
  await page.locator('.app.cozy-app').waitFor({timeout:25000});
  await page.evaluate(()=>{location.hash='#day/19';});
  await page.locator('.original-exam-question').waitFor({timeout:25000});
  for(const day of [19,20]){
   if(day===20){await page.evaluate(()=>{location.hash='#day/20';});await page.locator('.original-exam-question').waitFor();}
   for(let q=1;q<=15;q++){
    await page.locator('.original-exam-question').waitFor();
    const head=(await page.locator('.step-label').allTextContents()).join(' ');
    assert.match(head,new RegExp(q+'/15'),'wrong current question: '+head);
    const choice=page.locator('button[data-option]');
    const fields=page.locator('input[data-structure-part]');
    const text=page.locator('#shortAnswer');
    if(await choice.count())await choice.first().click();
    else if(await fields.count()){
      const expected=await page.evaluate(()=>{
        const id=window.location.hash.match(/day\\/(19|20)/)?.[1]||'19';
        const state=JSON.parse(localStorage.getItem('organic637_clean_v1_state:test-original-journey'));
        const index=state?.originalExamDrafts?.['originalDay'+id]?.responses?.length||0;
        const q=window.Organic637.OriginalExamDraft.questions.filter(q=>q.day===Number(id))[index];
        return q?.answer||{};
      });
      for(const part of ['A','B','C'])await page.locator('input[data-structure-part="'+part+'"]').fill(expected[part]?.[0]||'');
    }else if(await text.count()){
      const sample=await page.evaluate(()=>{
        const id=Number(window.location.hash.match(/day\\/(19|20)/)?.[1]||19);
        const state=JSON.parse(localStorage.getItem('organic637_clean_v1_state:test-original-journey'));
        const index=state?.originalExamDrafts?.['originalDay'+id]?.responses?.length||0;
        return window.Organic637.OriginalExamDraft.questions.filter(q=>q.day===id)[index].answer?.[0]||'';
      });
      await text.fill(sample);
    }
    const submit=page.locator('#submitAnswer');
    await submit.waitFor();
    assert.equal(await submit.isDisabled(),false,'submit disabled at day '+day+' q'+q);
    await submit.click();
    assert.match(await page.locator('#interactionFeedback').innerText(),/锁定/,'must not leak score before full paper is submitted');
    const next=page.locator('#originalNextQuestion');
    await next.waitFor({timeout:7000});
    assert.equal(await next.isDisabled(),false,'next button disabled');
    await next.click();
   }
   await page.locator('.original-exam-result').waitFor({timeout:15000});
   assert.match(await page.locator('.original-exam-score').innerText(),/150/);
   await page.locator('#originalPaper').click();
   await page.locator('.paper-review').waitFor();
   assert.equal(await page.locator('.paper-question').count(),15,'paper must have 15 questions');
   assert.equal(await page.locator('.paper-comparison').count(),15,'all answers must have comparison');
   assert.equal(await page.locator('.paper-correct-scheme').count(),15,'every explanation has redrawn answer');
   await page.locator('#paperOnlyWrong').click();
   await page.locator('#paperOnlyWrong').click();
   await page.locator('#paperAllOpen').click();
   assert.equal(await page.locator('details.paper-details[open]').count(),15);
   await page.locator('#paperBack').click();
   await page.locator('.original-exam-result').waitFor();
   const old=await page.evaluate(day=>{
     const state=JSON.parse(localStorage.getItem('organic637_clean_v1_state:test-original-journey'));
     return {attempts:state?.attempts?.length,result:state?.examResults?.['originalDay'+day],prior:state?.examResults?.v16Day19Core};
   },day);
   assert.ok(old.attempts>=15,'attempts not persisted');
   assert.equal(old.result.responses.length,15,'responses not persisted');
   console.log('PASS full day '+day+': 15 completed, final mark, answer sheet, detailed SVGs, cloud/local progress preserved');
  }
  await page.locator('#originalRetry').click();
  await page.locator('.original-exam-question').waitFor();
  const saved=await page.evaluate(()=>{
    const s=JSON.parse(localStorage.getItem('organic637_clean_v1_state:test-original-journey'));
    return {previous:s.examReviewHistory?.filter(a=>a.kind==='original-20').length,attempts:s.attempts.length};
  });
  assert.ok(saved.previous>=1&&saved.attempts>=30,'retry failed to archive grade or deleted prior work');
  assert.deepEqual(errs,[],'browser emitted JavaScript exceptions');
  console.log('PASS full learner journey: 30 questions, both papers, navigation, results, redo archives old scores');
  await page.close();
 } finally{await browser.close();await close();}
}
run().catch(e=>{console.error(e);process.exitCode=1;server.close();});
