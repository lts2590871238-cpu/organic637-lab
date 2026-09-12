const assert = require('assert');
const fs = require('fs');
const path = require('path');

global.window = { Organic637: {}, Organic637Data: { days:{} } };
require('../../data/v16-release-config.js');
require('../../data/v16-story.js');
require('../../data/v16-novel.js');
require('../../data/v16-novel-longform.js');
require('../../data/v16-assets.js');
require('../../data/v16-director.js');

const NS = window.Organic637;
assert.equal(NS.V16_RELEASE_CONFIG.storyMode, 'novel', 'formal release must use novel as the primary narrative mode');

const sceneIds = [];
for (const day of Object.values(NS.V16_DIRECTOR_DATA.days || {})) {
  for (const step of day.sequence || []) {
    if (step.type === 'comic' && step.sceneId) sceneIds.push(step.sceneId);
  }
}
assert.ok(sceneIds.length >= 40, 'formal V16 must keep a substantial story spine');

for (const sceneId of sceneIds) {
  const section = NS.V16_NOVEL?.sections?.[sceneId];
  assert.ok(section, `${sceneId} must have novel copy`);
  assert.ok(Array.isArray(section.paragraphs), `${sceneId} paragraphs must be an array`);
  const chars = section.paragraphs.join('').replace(/\s/g, '').length;
  const isOpening = sceneId === 'case00-cast' || /(?:-open)$/.test(sceneId);
  const minParagraphs = isOpening ? 4 : 3;
  const minChars = isOpening ? 520 : 420;
  assert.ok(section.paragraphs.length >= minParagraphs, `${sceneId} needs at least ${minParagraphs} novel paragraphs`);
  assert.ok(chars >= minChars, `${sceneId} novel copy is too thin (${chars} < ${minChars})`);
  assert.ok(section.summaryQuestion || section.learningBridge || section.closingQuestion, `${sceneId} must end with a concrete story question/bridge`);
}

const day1 = NS.V16_NOVEL.sections['case01-open'];
assert.match(day1.paragraphs.join(''), /00:17|凌晨/, 'Day1 opening must establish time and place');
assert.match(day1.paragraphs.join(''), /样品|L20-0/, 'Day1 opening must establish the missing-sample event');
assert.match(day1.paragraphs.join(''), /记录|版本/, 'Day1 opening must establish the altered-record thread');

const day11 = NS.V16_NOVEL.sections['case11-open'];
assert.match(day11.paragraphs.join(''), /六个月|备用路线|Route-B/, 'Day11 must explain what Route-B is before asking about aromatic route fingerprints');
assert.match(day11.paragraphs.join(''), /为什么|需要|判断/, 'Day11 must explain why aromatic chemistry is needed now');

const readerPath = path.join(process.cwd(), 'js/novel-reader.js');
assert.ok(fs.existsSync(readerPath), 'formal release needs a dedicated novel reader');
const reader = fs.readFileSync(readerPath, 'utf8');
assert.match(reader, /v16-novel-reader/, 'novel reader must render a dedicated novel layout');
assert.match(reader, /V16_NOVEL/, 'novel reader must consume the novel source');
assert.match(reader, /font|paragraph|story/i, 'novel reader should be prose-oriented');
assert.match(reader, /v16-novel-previously/, 'novel reader must render a visible previous-case recap when provided');

const app = fs.readFileSync('app.js', 'utf8');
assert.match(app, /V16NovelReader/, 'app must route story steps through the novel reader');
const index = fs.readFileSync('index.html', 'utf8');
assert.match(index, /js\/novel-reader\.js/, 'novel reader must be loaded by index.html');

console.log(`PASS test-v16-novel-primary (${sceneIds.length} story scenes)`);
