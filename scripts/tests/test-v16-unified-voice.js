const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '../..');
const context = { window: {} };
context.window.window = context.window;
vm.createContext(context);

function load(rel) {
  vm.runInContext(fs.readFileSync(path.join(root, rel), 'utf8'), context, { filename: rel });
}

load('data/v16-learning-voice.js');
const NS = context.window.Organic637 || {};
const voice = NS.V16_LEARNING_VOICE;
if (!voice || !voice.days) throw new Error('V16_LEARNING_VOICE missing');

const devices = [];
for (let day = 1; day <= 20; day++) {
  const row = voice.days[day];
  if (!row) throw new Error(`Day ${day} voice missing`);
  for (const key of ['caseQuestion','plainMeaning','learningPromise','successBeat']) {
    if (!row[key] || String(row[key]).trim().length < 18) throw new Error(`Day ${day} ${key} too short`);
  }
  if (!row.suspense || !row.suspense.device || !row.suspense.readerExpectation || !row.suspense.turn) {
    throw new Error(`Day ${day} suspense metadata incomplete`);
  }
  devices.push(row.suspense.device);
}

for (let i = 2; i < devices.length; i++) {
  const window3 = devices.slice(i - 2, i + 1);
  if (new Set(window3).size === 1) throw new Error(`Suspense device repeated three days: ${window3[0]}`);
}

const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const reader = fs.readFileSync(path.join(root, 'js/novel-reader.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

if (!html.includes('data/v16-learning-voice.js')) throw new Error('index missing v16-learning-voice.js');
if (!app.includes('renderV16LearningVoice')) throw new Error('learning page does not use unified V16 voice');
if (!app.includes('这一步和案情有什么关系')) throw new Error('lesson bridge still uses detached classroom wording');
if (!app.includes('这条判断站住了')) throw new Error('question feedback does not use investigation voice');
if (!reader.includes('前情提要')) throw new Error('novel reader does not render previous-story recap');
if (!reader.includes('要继续查下去，你还缺一把化学钥匙')) throw new Error('novel-to-learning bridge language is not unified');

console.log('V16_UNIFIED_VOICE_PASS');
