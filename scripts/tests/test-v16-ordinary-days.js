const assert = require('assert');

function refsOf(plan) {
  return new Set((plan.sequence || []).flatMap(step => [step.ref, ...(step.refs || [])]).filter(Boolean));
}

const expectedMinutes = {
  1:49, 2:49, 3:51, 4:54, 5:55, 6:51, 7:51, 8:50, 9:52, 10:54,
  11:53, 12:54, 13:49, 14:53, 15:59, 16:51, 17:53, 18:55, 19:58, 20:54
};
const expectedTitles = {
  1:'零号样品', 2:'三个版本', 3:'R-17', 4:'第二只烧瓶', 5:'四条岔路', 6:'氧的痕迹',
  7:'羰基上的指纹', 8:'被重新贴过的标签', 9:'多出来的一根C—C键', 10:'旧路线',
  11:'芳环上的路线指纹', 12:'B3', 13:'无名样品 I', 14:'无名样品 II', 15:'镜子里的答案',
  16:'完整鉴定', 17:'倒着走', 18:'22:14', 19:'封闭卷宗', 20:'零号样品'
};

global.window = { Organic637: {}, Organic637Data: { days: Object.fromEntries(Array.from({length:20}, (_,i)=>[i+1,{}])) } };
require('../../data/v16-story.js');
require('../../data/v16-asset-migration.js');
require('../../data/v16-director.js');
require('../../js/director-engine.js');
require('../../data/course-journey.js');

const D = window.Organic637.V16Director;
const story = window.Organic637.V16_STORY;
const assets = window.Organic637.V16_ASSET_MIGRATION;
const journey = window.Organic637Data.COURSE_JOURNEY;

assert.deepStrictEqual(D.collectDefinedDays(), Array.from({length:20}, (_,i)=>i+1), 'all 20 V16 day plans must be defined');
for (let day = 1; day <= 20; day += 1) {
  const plan = D.getDayPlan(day);
  assert(plan, `Day${day} director plan missing`);
  assert.strictEqual(plan.title, expectedTitles[day], `Day${day} title must match frozen V16 case title`);
  assert.strictEqual(D.estimateMinutes(day), expectedMinutes[day], `Day${day} mandatory minutes must match frozen V16 budget`);
  const report = D.validateDay(day);
  assert.deepStrictEqual(report.errors, [], `Day${day} director validation failed: ${report.errors.join('; ')}`);
}

for (const day of [2,3,4,5,6,7,8,9,10,11,12,16]) {
  const plan = D.getDayPlan(day);
  const comicSteps = plan.sequence.filter(step => step.type === 'comic');
  assert(comicSteps.length >= 1, `Day${day} must return to LAB-20 through at least one comic step`);
  for (const step of comicSteps) assert(story.scenes[step.sceneId], `Day${day} comic scene ${step.sceneId} must exist in story source`);
}

const allowedStatuses = new Set(['KEEP_MAIN','SHORTEN','MOVE_LATER','OPTIONAL_CASE_FILE','REPAIR_ONLY','REMOVE_FROM_20D']);
for (const day of [2,3,6,7,8,9,10,11,12,16]) {
  const policy = assets.days[day];
  assert(policy, `Day${day} asset migration policy missing`);
  for (const [id, row] of Object.entries(policy.assets || {})) {
    assert(allowedStatuses.has(row.status), `${id} has invalid V16 status ${row.status}`);
  }
}

function status(day, id) { return assets.days[day]?.assets?.[id]?.status; }
assert.strictEqual(status(2,'d02-kmno4-01'), 'OPTIONAL_CASE_FILE');
assert.strictEqual(status(3,'d03-diels-alder-01'), 'OPTIONAL_CASE_FILE');
assert.strictEqual(status(6,'d06-lucas-rank-01'), 'OPTIONAL_CASE_FILE');
assert.strictEqual(status(6,'d06-ether-cleavage-01'), 'REPAIR_ONLY');
assert.strictEqual(status(7,'d07-acetal-01'), 'MOVE_LATER');
assert.strictEqual(status(7,'d07-wittig-01'), 'OPTIONAL_CASE_FILE');
assert.strictEqual(status(7,'d07-oxime-01'), 'REMOVE_FROM_20D');
assert.strictEqual(status(8,'d08-hofmann-01'), 'MOVE_LATER');
assert.strictEqual(status(10,'d10-dieckmann-01'), 'OPTIONAL_CASE_FILE');
assert.strictEqual(status(12,'d12-protect-01'), 'MOVE_LATER');
assert.strictEqual(status(12,'d12-coupling-01'), 'OPTIONAL_CASE_FILE');

const excludedMandatory = [
  [2,'d02-kmno4-01'], [3,'d03-diels-alder-01'], [6,'d06-lucas-rank-01'], [6,'d06-ether-cleavage-01'],
  [7,'d07-acetal-01'], [7,'d07-wittig-01'], [7,'d07-oxime-01'], [8,'d08-hofmann-01'],
  [10,'d10-dieckmann-01'], [12,'d12-protect-01'], [12,'d12-coupling-01']
];
for (const [day,id] of excludedMandatory) {
  assert(!refsOf(D.getDayPlan(day)).has(id), `${id} must not occupy mandatory Day${day} mainline time`);
}

assert.deepStrictEqual(journey.acts.map(x => x.title), [
  '现场：你甚至还看不懂证据',
  '实验记录开始撒谎',
  '碳骨架不会撒谎',
  '无名样品',
  '重建 L-20'
], 'five ACT labels must use frozen LAB-20 language');
for (let day = 1; day <= 20; day += 1) {
  assert.strictEqual(journey.dayMeta[day].minutes, expectedMinutes[day], `course journey Day${day} minutes must match Director budget`);
}


const fs = require('fs');
const path = require('path');
const appSource = fs.readFileSync(path.join(__dirname, '../../app.js'), 'utf8');
assert.match(appSource, /lessonPage\(day,\s*lesson,\s*\{[\s\S]*?v16:\s*true/, 'Director lessons must identify V16 presentation mode');
assert.match(appSource, /第一次出现\s*·\s*点我看看/, 'first-use terminology must be a light expandable prompt in V16');
assert.match(appSource, /我还是不太懂/, 'V16 lesson scaffold must expose an explicit help request instead of always opening');
assert.match(appSource, /requireSupportCompletion:\s*false/, 'V16 must not block lesson completion on optional scaffold interactions');
assert.match(appSource, /recentWrong[\s\S]*?confidence\s*===\s*'sure'/, 'high-confidence wrong answers must force the question scaffold back open');

console.log('V16_ORDINARY_DAYS_PASS');
