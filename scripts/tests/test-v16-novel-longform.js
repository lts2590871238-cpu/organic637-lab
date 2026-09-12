const assert = require('assert');

global.window = { Organic637: {}, Organic637Data:{days:{}} };
require('../../data/v16-story.js');
require('../../data/v16-novel.js');
require('../../data/v16-novel-longform.js');

const sections = window.Organic637.V16_NOVEL?.sections || {};
const openings = Object.entries(sections).filter(([id]) => id === 'case00-cast' || /(?:-open)$/.test(id));
assert.ok(openings.length >= 18, 'formal novel needs a substantial set of day openings');

for (const [id, section] of openings) {
  const chars = (section.paragraphs || []).join('').replace(/\s/g, '').length;
  const min = id === 'case00-cast' ? 1100 : 760;
  assert.ok(chars >= min, `${id} must read like a real scene, not a synopsis (${chars} < ${min})`);
  assert.ok((section.paragraphs || []).length >= 6, `${id} needs at least six scene beats`);
  if ((section.day || 1) > 1) {
    assert.ok(section.previously && section.previously.length >= 60, `${id} needs a readable previous-case recap for returning/non-specialist readers`);
  }
}

for (const pivotal of ['case01-open','case08-open','case12-open','case15-open','case18-open','case20-open']) {
  const section = sections[pivotal];
  assert.ok(section, `${pivotal} missing`);
  const chars = section.paragraphs.join('').replace(/\s/g, '').length;
  assert.ok(chars >= 900, `${pivotal} is a pivotal chapter and must be especially immersive (${chars} < 900)`);
}

assert.ok(sections['case19-open'], 'Day19 needs a short novel transition before formal exam mode');
assert.match((sections['case19-open'].paragraphs || []).join(''), /没有提示|考试|审核|独立/, 'Day19 transition must explicitly hand control back to the learner');

console.log(`PASS test-v16-novel-longform (${openings.length} openings)`);
