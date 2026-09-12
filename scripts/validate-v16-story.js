const assert = require('assert');
global.window = { Organic637: {} };
require('../data/v16-story.js');
require('../data/v16-assets.js');

const NS = window.Organic637;
const story = NS.V16_STORY;
const assets = NS.V16_ASSETS;

const requiredTimes = [
  'r17Pickup','anomalyObserved','guReportsToXu','xuConfirmsDeviation','backupRouteOpened','backupRoutePrinted',
  'deviationRecorded','x17Produced','x17Discarded','quickAnalysis','linReadsDeviation','linColdRoomEnter',
  'samplesSealed','x17Sealed','linColdRoomExit','pauseMessage','xuNoticesSamplesMissing','recordDeletion',
  'finalSave','zhouCallsTeam','missingConfirmed'
];
for (const key of requiredTimes) assert(/^\d{2}:\d{2}$/.test(story.timeline[key] || ''), `missing/invalid timeline.${key}`);

const ordered = requiredTimes.map(key => story.timeline[key]);
const minutes = ordered.map((t, i) => {
  const [h,m] = t.split(':').map(Number);
  let total = h * 60 + m;
  if (i === ordered.length - 1 && h === 0) total += 24 * 60;
  return total;
});
for (let i = 1; i < minutes.length; i += 1) assert(minutes[i] > minutes[i - 1], `non-monotonic timeline at ${requiredTimes[i]}`);

const gates = story.revealGates;
assert(gates.secretRouteConfirmed.minDay >= 9, 'secret route revealed too early');
assert(gates.zeroSampleFound.minDay >= 12, 'zero sample revealed too early');
assert(gates.stereoMismatchConfirmed.minDay >= 15, 'stereo mismatch revealed too early');
assert(gates.xuRecordTamperingConfirmed.minDay >= 18, 'tampering revealed too early');

for (const id of Object.keys(story.characters)) assert(assets.characters[id], `missing character asset registry ${id}`);
for (const evidence of Object.values(story.evidence)) {
  for (const factKey of evidence.supports || []) assert(story.facts[factKey], `unknown fact ${factKey} in evidence ${evidence.id}`);
}

assert.equal(story.chemistryCase.x17.formula, 'C8H7BrO');
assert.equal(story.chemistryCase.l20Zero.formula, 'C8H9BrO');
assert.equal(story.chemistryCase.l20Final.enantiomerRatio, 'S:R = 51:49');
assert(story.chemistryCase.hardRules.some(x => x.includes('achiral IR/NMR')), 'missing enantiomer spectroscopy hard rule');
console.log('V16_STORY_PASS');
