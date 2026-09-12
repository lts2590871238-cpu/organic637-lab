const assert = require('assert');
global.window = { Organic637: {} };
require('../../js/director-engine.js');
const NS = window.Organic637;

NS.V16_DIRECTOR_DATA = {
  days: {
    4: {
      legacy: {
        lessonOrder: ['d04-intro', 'd04-sn2', 'd04-moved-detail', 'd04-after'],
        questionOrder: ['d04-q1', 'd04-removed-q', 'd04-q2']
      },
      sequence: [
        { id: 'open', type: 'comic', sceneId: 'open', minutes: 1 },
        { id: 'intro', type: 'lesson', ref: 'd04-intro', minutes: 3 },
        { id: 'sn2', type: 'lesson', ref: 'd04-sn2', minutes: 4 },
        { id: 'break', type: 'comic', sceneId: 'break', minutes: 1 },
        { id: 'after', type: 'lesson', ref: 'd04-after', minutes: 3 },
        { id: 'q1', type: 'question', ref: 'd04-q1', minutes: 3 },
        { id: 'q2', type: 'question', ref: 'd04-q2', minutes: 3 }
      ]
    }
  }
};

const D = NS.V16Director;
assert.equal(
  D.findCursorForLegacy(4, { phase: 'lesson', lessonIndex: 1, finished: false }),
  2,
  'an old SN2 lesson should resume on the V16 step referencing the same asset'
);
assert.equal(
  D.findCursorForLegacy(4, { phase: 'lesson', lessonIndex: 2, finished: false }),
  4,
  'a lesson removed from mandatory V16 should resume at the next mandatory referenced lesson'
);
assert.equal(
  D.findCursorForLegacy(4, { phase: 'questions', queue: ['d04-q1', 'd04-removed-q', 'd04-q2'], taskIndex: 1, finished: false }),
  6,
  'a removed question should resume at the next mandatory V16 question'
);
assert.equal(
  D.findCursorForLegacy(4, { phase: 'questions', taskIndex: 99, finished: true }),
  7,
  'a completed legacy day should map beyond the final V16 step and never reopen mandatory content'
);

console.log('PASS test-v16-resume');
