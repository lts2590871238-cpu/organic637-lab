const assert = require('assert');
const fs = require('fs');

global.window = { Organic637: {}, Organic637Data: { days:{} } };
require('../../data/v16-story.js');
require('../../data/v16-novel.js');
require('../../data/v16-novel-longform.js');
require('../../data/v16-director.js');
require('../../data/v16-novel-chapters.js');
require('../../data/v16-assets.js');
require('../../js/novel-reader.js');

const NS = window.Organic637;
const novel = NS.V16_NOVEL;
assert.ok(Array.isArray(novel.chapters), 'formal novel must expose an ordered chapter manifest');
assert.ok(novel.chapters.length >= 40 && novel.chapters.length <= 60, `formal novel must be 40–60 chapters, got ${novel.chapters.length}`);
assert.equal(novel.chapters.length, 54, 'LAB-20 formal novel is frozen as 54 chapters');

const seen = new Set();
const days = new Set();
for (let i = 0; i < novel.chapters.length; i++) {
  const ch = novel.chapters[i];
  assert.equal(ch.number, i + 1, `chapter ${i + 1} must have sequential numbering`);
  assert.ok(ch.sceneId && !seen.has(ch.sceneId), `chapter ${i + 1} must use a unique sceneId`);
  seen.add(ch.sceneId);
  assert.ok(ch.day >= 1 && ch.day <= 20, `chapter ${i + 1} has invalid day ${ch.day}`);
  days.add(ch.day);
  assert.ok(String(ch.title || '').trim().length >= 2, `chapter ${i + 1} needs a readable title`);
  const section = novel.sections?.[ch.sceneId];
  assert.ok(section, `chapter ${i + 1} points to missing novel section ${ch.sceneId}`);
  const chars = (section.paragraphs || []).join('').replace(/\s/g, '').length;
  assert.ok(chars >= 300, `chapter ${i + 1} is too thin to function as a real chapter (${chars})`);
}
for (let day = 1; day <= 20; day++) assert.ok(days.has(day), `Day ${day} must appear in the 54-chapter novel`);
assert.equal(novel.chapters[0].sceneId, 'case00-cast', 'Chapter 1 must establish the cast/world');
assert.equal(novel.chapters.at(-1).sceneId, 'case20-close', 'Final chapter must close the case');
const day19 = novel.chapters.filter(ch => ch.day === 19);
assert.equal(day19.length, 1, 'Day19 should have one novel transition chapter outside the formal exam itself');
assert.equal(day19[0].sceneId, 'case19-open');

assert.equal(typeof novel.getChapter, 'function', 'novel needs getChapter(sceneId)');
assert.equal(typeof novel.getUnlockedChapters, 'function', 'novel needs getUnlockedChapters(state)');
const state = { v16:{ days:{ 1:{ completedSteps:{'d01-cast-intro':true,'d01-story-open':true} } } } };
const unlocked = novel.getUnlockedChapters(state);
assert.ok(unlocked.length >= 1 && unlocked.length < novel.chapters.length, 'chapter index must only expose reached story, not spoil future chapters');
assert.ok(unlocked.every(ch => ch.number <= 2), 'state with only first two story steps must not expose later chapters');

const html = NS.V16NovelReader.render('case01-open', { day:1, state });
assert.match(html, /第\s*2\s*章/, 'reader must show chapter number');
assert.match(html, /54/, 'reader must show total chapter count');
assert.match(html, /小说目录/, 'reader must expose a chapter index control');

const app = fs.readFileSync('app.js','utf8');
assert.match(app, /54\s*章/, 'formal welcome must present LAB-20 as a 54-chapter novel, not a loose collection of course intros');

const reader = fs.readFileSync('js/novel-reader.js','utf8');
assert.match(reader, /data-v16-novel-index/, 'novel reader must bind a chapter index button');
console.log(`PASS test-v16-novel-chapters (${novel.chapters.length} chapters)`);
