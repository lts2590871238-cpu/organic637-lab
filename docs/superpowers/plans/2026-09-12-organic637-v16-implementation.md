# Organic637 V16 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Organic637 20-day learning flow around the approved LAB-20 Director/Narrative layer while preserving the existing chemistry knowledge base, mastery/review logic, 3D engine, detective/synthesis engines, Day19/Day20 assessment logic, auth, and cloud sync.

**Architecture:** Keep all existing lesson/question/repair/3D assets as the single source of chemistry truth. Add a Director layer that schedules existing assets together with short comic scenes, case-state updates, case-board interactions, required/on-demand 3D, 637 exits, and exam steps. Add schema-v3 migration so legacy learners retain skills and progress; keep the old linear renderer behind a fallback switch until full V16 QA passes.

**Tech Stack:** Static HTML/CSS/vanilla JavaScript, `window.ORGANIC637` namespace, localStorage + existing Cloudflare Worker/D1 sync, existing Chem3D renderer, existing detective/synthesis engines, Node.js validator/test scripts using built-in `assert`/`vm` only.

**Spec:** `docs/superpowers/specs/2026-09-12-organic637-v16-design.md`

## Global Constraints

- Ordinary mandatory Day duration: **40–60 minutes**; recommended **45–55 minutes**.
- Day15 and Day19 may approach **60 minutes**, never exceed it.
- Continuous pure instruction must be **<= 8 minutes**.
- Every Day1–18 must contain at least one case application and one formal 637 exit.
- Every Day must contain at least two engagement shifts; the last 10 minutes may not introduce a new core concept.
- Story truth has exactly one program source: `data/v16-story.js`; Day files may reference story IDs but may not redefine canonical times/facts.
- Chemistry lesson/question text remains in existing data assets. V16 Director references existing IDs; do not duplicate chemistry content into V16 files.
- Required 3D: tetrahedral/wedge-dash core, SN2 backside, E2 anti-periplanar, chirality/CIP/R-S, the Day15 L20 comparison. On-demand 3D remains optional elsewhere.
- Day19 mainline is a 55–60 minute core audit with no story, 3D, hints, or immediate explanations; the full existing 150-point exam remains available as a separate formal simulation.
- Day20 introduces no new core knowledge; it combines final case report with existing Top3 diagnose → repair → transfer logic.
- Preserve legacy skills, attempts, review history, completed days, exam results, 3D progress, detective progress, synthesis progress, auth, local backup, and cloud sync.
- Keep legacy day rendering available behind a fallback until V16 full regression passes.
- No new external runtime dependencies.

---

## File map locked by this plan

### Create

- `data/v16-story.js` — canonical LAB-20 characters, timeline, facts, reveal gates, chemistry case metadata.
- `data/v16-assets.js` — character/background/evidence asset registry only; no story truth duplication.
- `data/v16-director.js` — Day1–20 sequence plans; references existing lesson/question/3D/detective/synthesis IDs.
- `data/v16-exam.js` — Day19 core-audit queue and mapping back to full exam items.
- `js/director-engine.js` — pure Director planning/cursor/validation/reference helpers.
- `js/narrative-engine.js` — pure story-state transitions and reveal-gate logic.
- `js/comic-renderer.js` — DOM renderer for 2–5 panel comic scenes with text fallback.
- `js/case-board.js` — case-board projection + UI.
- `scripts/tests/test-v16-state.js`
- `scripts/tests/test-v16-story.js`
- `scripts/tests/test-v16-director.js`
- `scripts/tests/test-v16-resume.js`
- `scripts/tests/test-v16-day01.js`
- `scripts/tests/test-v16-3d-gates.js`
- `scripts/tests/test-v16-detective.js`
- `scripts/tests/test-v16-stereo.js`
- `scripts/tests/test-v16-synthesis.js`
- `scripts/tests/test-v16-day19.js`
- `scripts/tests/test-v16-day20.js`
- `scripts/validate-v16-pacing.js`
- `scripts/validate-v16-story.js`
- `scripts/validate-v16-prerequisites.js`
- `scripts/run-v16-validation.js`

### Modify

- `index.html` — load V16 data/engines before `app.js`.
- `js/learning-engine.js` — schema-v3 migration + V16 state initialization helpers; do not change mastery formula.
- `app.js` — route day rendering through `directorDayPage()` when V16 enabled; preserve legacy path.
- `data/course-journey.js` — V16 act labels and new time budgets only.
- Existing `data/day01.js` … `data/day20.js` — add metadata only where necessary; avoid content duplication.
- `data/3d-lessons.js` — add `l20_stereo_compare` data + any missing required geometry metadata.
- Existing detective data file(s) — add X-17 case referencing existing detective engine.
- Existing synthesis data file(s) — add LAB-20 hidden-route case referencing existing synthesis engine.
- Existing CSS file(s) used by `app.js` — comic/case-board/responsive styling only; preserve current design tokens.
- Existing build/status/docs files — update only after all QA passes.

---

## Preflight before Task 1

Execution worker must create an isolated worktree using `superpowers:using-git-worktrees`, then run the repository's current validation suite before changing code. Record the exact passing commands in the implementation notes. If the baseline does not pass, stop and diagnose baseline failures before V16 work.

---

### Task 1: Schema v3 and lossless V16 state migration

**Files:**
- Modify: `js/learning-engine.js`
- Create: `scripts/tests/test-v16-state.js`

**Interfaces:**
- Produces: `NS.ensureV16RootState(state) -> state.v16`
- Produces: `NS.ensureV16DayState(state, day) -> state.days[day].v16`
- Produces: `NS.migrateState(rawState) -> schemaVersion 3 state`
- Guarantees: existing mastery/review/exam/3D/detective/synthesis data survive byte-for-byte semantically.

- [ ] **Step 1: Write a failing migration test**

```js
// scripts/tests/test-v16-state.js
const assert = require('assert');
global.window = { ORGANIC637: {} };
require('../../js/learning-engine.js');
const NS = window.ORGANIC637;

const legacy = {
  schemaVersion: 2,
  skills: { 'reaction.sn2': { mastery: 0.72 } },
  attempts: [{ id: 'old-attempt' }],
  reviewHistory: [{ id: 'old-review' }],
  examResults: { day19: { score: 0.8 } },
  threeDProgress: { sn2_backside: { completed: true } },
  detective: { cases: { old: { completed: true } } },
  synthesis: { cases: { old: { completed: true } } },
  days: { 4: { lessonIndex: 2, taskIndex: 1, finished: false } }
};

const next = NS.migrateState(JSON.parse(JSON.stringify(legacy)));
assert.equal(next.schemaVersion, 3);
assert.equal(next.skills['reaction.sn2'].mastery, 0.72);
assert.equal(next.threeDProgress.sn2_backside.completed, true);
assert.equal(next.detective.cases.old.completed, true);
assert.equal(next.synthesis.cases.old.completed, true);
assert.ok(next.v16 && next.v16.story);
assert.equal(next.days[4].v16.cursor, 0);
console.log('PASS test-v16-state');
```

- [ ] **Step 2: Run the test and verify failure**

Run: `node scripts/tests/test-v16-state.js`  
Expected: FAIL because schema 3 / V16 helpers do not exist.

- [ ] **Step 3: Add minimal V16 state helpers and schema-v3 migration**

Add helpers with this exact shape:

```js
NS.ensureV16RootState = function ensureV16RootState(state) {
  state.v16 ||= {};
  state.v16.enabled ??= true;
  state.v16.story ||= {
    unlockedScenes: [],
    confirmedFacts: [],
    contradictions: [],
    personalMarks: {},
    routeRecovery: 0
  };
  return state.v16;
};

NS.ensureV16DayState = function ensureV16DayState(state, day) {
  state.days ||= {};
  state.days[day] ||= {};
  state.days[day].v16 ||= {
    cursor: 0,
    completedSteps: {},
    migratedFromLegacy: false
  };
  return state.days[day].v16;
};
```

Update migration so v2 → v3 initializes only new fields; do not reset existing keys.

- [ ] **Step 4: Run migration test plus current legacy validation**

Run: `node scripts/tests/test-v16-state.js`  
Expected: PASS.

Then run the repository's existing state/learning validators discovered in preflight.  
Expected: all baseline validators remain PASS.

- [ ] **Step 5: Commit**

```bash
git add js/learning-engine.js scripts/tests/test-v16-state.js
git commit -m "feat(v16): add lossless schema v3 state migration"
```

---

### Task 2: Canonical LAB-20 story truth and reveal validator

**Files:**
- Create: `data/v16-story.js`
- Create: `data/v16-assets.js`
- Create: `scripts/tests/test-v16-story.js`
- Create: `scripts/validate-v16-story.js`
- Modify: `index.html`

**Interfaces:**
- Produces: `NS.V16_STORY.characters`, `.timeline`, `.facts`, `.revealGates`, `.chemistryCase`
- Produces: `NS.V16_ASSETS.characters/backgrounds/evidence`
- Validator exit code 0 only when chronology and reveal gates are valid.

- [ ] **Step 1: Write failing story invariant test**

```js
const assert = require('assert');
global.window = { ORGANIC637: {} };
require('../../data/v16-story.js');
const story = window.ORGANIC637.V16_STORY;
assert.equal(story.timeline.r17Pickup, '19:52');
assert.equal(story.timeline.recordDeletion, '22:14');
assert.equal(story.revealGates.zeroSampleFound.minDay, 12);
assert.equal(story.revealGates.stereoMismatchConfirmed.minDay, 15);
assert.equal(story.revealGates.xuRecordTamperingConfirmed.minDay, 18);
assert.equal(story.chemistryCase.x17.id, 'X-17');
assert.ok(story.chemistryCase.l20Zero.stereochemistry);
console.log('PASS test-v16-story');
```

- [ ] **Step 2: Run and confirm failure**

Run: `node scripts/tests/test-v16-story.js`  
Expected: FAIL because file does not exist.

- [ ] **Step 3: Implement canonical story constants**

Use canonical keys, not duplicated free-form timestamps:

```js
NS.V16_STORY = {
  caseId: 'lab20-zero-sample',
  timeline: {
    r17Pickup: '19:52',
    anomalyObserved: '20:16',
    guReportsToXu: '20:23',
    xuConfirmsDeviation: '20:31',
    backupRouteOpened: '20:47',
    backupRoutePrinted: '20:58',
    deviationRecorded: '21:06',
    x17Produced: '21:18',
    quickAnalysis: '21:31',
    linColdRoomEnter: '21:42',
    samplesSealed: '21:46',
    x17Sealed: '21:49',
    linColdRoomExit: '21:53',
    pauseMessage: '21:56',
    xuNoticesSamplesMissing: '22:03',
    recordDeletion: '22:14',
    finalSave: '22:19',
    zhouCallsTeam: '23:47',
    missingConfirmed: '00:17'
  },
  revealGates: {
    secretRouteConfirmed: { minDay: 9 },
    zeroSampleFound: { minDay: 12 },
    stereoMismatchConfirmed: { minDay: 15 },
    xuRecordTamperingConfirmed: { minDay: 18 }
  }
};
```

Add approved chemistry metadata from the spec; keep filenames/assets in `v16-assets.js`, not in truth data.

- [ ] **Step 4: Implement story validator**

Validator must reject:
- missing canonical times;
- non-monotonic evening chronology (except `00:17` treated after midnight);
- reveal gate earlier than approved day;
- unknown character/fact/evidence IDs referenced by story scenes later.

Run: `node scripts/validate-v16-story.js`  
Expected: `V16_STORY_PASS`.

- [ ] **Step 5: Load data files in `index.html` before engines/app**

Add script tags before `app.js` and before future V16 engines.

- [ ] **Step 6: Commit**

```bash
git add data/v16-story.js data/v16-assets.js scripts/tests/test-v16-story.js scripts/validate-v16-story.js index.html
git commit -m "feat(v16): add canonical LAB-20 story model"
```

---

### Task 3: Pure Director engine, plan schema, pacing and prerequisite validators

**Files:**
- Create: `data/v16-director.js`
- Create: `js/director-engine.js`
- Create: `scripts/tests/test-v16-director.js`
- Create: `scripts/validate-v16-pacing.js`
- Create: `scripts/validate-v16-prerequisites.js`
- Modify: `index.html`

**Interfaces:**
- `NS.V16Director.getDayPlan(day) -> DayPlan`
- `NS.V16Director.getStep(day, cursor) -> Step|null`
- `NS.V16Director.estimateMinutes(day) -> number`
- `NS.V16Director.validateDay(day) -> {errors:string[], warnings:string[]}`
- `NS.V16Director.findCursorForLegacy(day, legacyState) -> number`

Step schema:

```js
{
  id: 'd01-learn-language',
  type: 'lesson',
  ref: 'd01-zero-01-language',
  minutes: 4,
  engagement: 'instruction',
  introducesCoreConcept: true,
  prerequisites: []
}
```

Allowed `type`: `comic|lesson|interaction|question|question-group|3d|detective|synthesis|case-board|exam|case-apply`.

- [ ] **Step 1: Write a failing Director unit test using a minimal Day1 plan**

```js
const assert = require('assert');
global.window = { ORGANIC637: {} };
require('../../data/v16-director.js');
require('../../js/director-engine.js');
const D = window.ORGANIC637.V16Director;
assert.equal(D.getDayPlan(1).targetMinutes, 49);
assert.equal(D.getStep(1, 0).type, 'comic');
assert.ok(D.estimateMinutes(1) <= 60);
const report = D.validateDay(1);
assert.deepEqual(report.errors, []);
console.log('PASS test-v16-director');
```

- [ ] **Step 2: Run and verify failure**

Run: `node scripts/tests/test-v16-director.js`  
Expected: FAIL.

- [ ] **Step 3: Implement pure Director functions with no DOM access**

`getStep` must return `null` after the last step. `estimateMinutes` sums only mandatory steps (`optional !== true`).

`validateDay` must report errors for:
- mandatory minutes > 60;
- any continuous instruction run > 8 minutes;
- Day1–18 missing `case-apply`;
- Day1–18 missing a `mode:'637_exit'` question/question-group;
- fewer than two non-instruction engagement shifts;
- a core concept introduced in the final 10 mandatory minutes;
- required step missing `ref`/`sceneId` as appropriate.

- [ ] **Step 4: Implement prerequisite validator**

Each plan may declare `prerequisites` and `introduces`. Validator simulates the 20-day sequence and fails if a prerequisite is used before introduction. Do not infer from text; use IDs only.

Run: `node scripts/validate-v16-prerequisites.js`  
Expected initially: PASS for the minimal Day1 plan.

- [ ] **Step 5: Implement pacing validator**

Run: `node scripts/validate-v16-pacing.js`  
Expected: prints per-day mandatory minutes and `V16_PACING_PASS` once plans are populated; during early tasks it may validate only defined plans and explicitly report skipped undefined days.

- [ ] **Step 6: Commit**

```bash
git add data/v16-director.js js/director-engine.js scripts/tests/test-v16-director.js scripts/validate-v16-pacing.js scripts/validate-v16-prerequisites.js index.html
git commit -m "feat(v16): add director plan engine and validators"
```

---

### Task 4: App integration, legacy fallback, cursor resume and migration mapping

**Files:**
- Modify: `app.js`
- Modify: `js/learning-engine.js`
- Create: `scripts/tests/test-v16-resume.js`

**Interfaces:**
- `directorDayPage(day)` renders current Director step.
- `legacyDayPage(day)` contains the current linear flow unchanged.
- `advanceDirectorStep(day, stepId)` marks the step complete and increments cursor.
- `NS.V16Director.findCursorForLegacy(day, legacyState)` maps old lesson/task progress to the nearest referenced V16 step.

- [ ] **Step 1: Extract current day body into `legacyDayPage(day)` without behavior changes**

Do this as a pure move first. `dayPage(day)` should call `legacyDayPage(day)` and all current validations must remain PASS.

- [ ] **Step 2: Commit extraction only**

```bash
git add app.js
git commit -m "refactor: isolate legacy day renderer"
```

- [ ] **Step 3: Write failing resume test**

Test mappings:
- old Day4 `lessonIndex` at an SN2 lesson maps to the matching V16 `ref` step;
- old completed Day stays completed and does not reopen mandatory V16 content;
- old progress whose asset moved to optional maps to the next mandatory step.

Use fixture plans directly; assert exact returned cursors.

- [ ] **Step 4: Add `dayPage` feature switch**

```js
function dayPage(day) {
  const state = NS.loadState();
  const v16 = NS.ensureV16RootState(state);
  return v16.enabled ? directorDayPage(day) : legacyDayPage(day);
}
```

If Director plan is missing/invalid at runtime, log one clear error and fall back to `legacyDayPage(day)` rather than leaving a blank screen.

- [ ] **Step 5: Implement resume migration lazily per Day**

On first V16 visit to an unfinished legacy Day:
- map cursor;
- set `migratedFromLegacy:true`;
- save state once.

- [ ] **Step 6: Run resume and legacy tests**

Run: `node scripts/tests/test-v16-resume.js`  
Expected: PASS.  
Run existing app smoke validators.  
Expected: PASS with V16 disabled and with no Director plan.

- [ ] **Step 7: Commit**

```bash
git add app.js js/learning-engine.js scripts/tests/test-v16-resume.js
git commit -m "feat(v16): route day progress through director with legacy fallback"
```

---

### Task 5: Narrative state engine and comic renderer with accessible fallback

**Files:**
- Create: `js/narrative-engine.js`
- Create: `js/comic-renderer.js`
- Modify: `index.html`
- Modify: current main stylesheet(s)
- Extend: `data/v16-story.js`

**Interfaces:**
- `NS.V16Narrative.canUnlockFact(state, factId, day) -> boolean`
- `NS.V16Narrative.completeScene(state, sceneId, day) -> state`
- `NS.V16Narrative.getUnlockedFacts(state) -> Fact[]`
- `NS.V16Comic.render(sceneId, {state, day}) -> HTMLElement|string according to existing renderer pattern`

- [ ] **Step 1: Add scene data for Day1 open/return/cliff only**

Each scene: 2–5 panels. Each panel references canonical character/asset IDs; no raw canonical timestamps except through evidence/timeline keys.

- [ ] **Step 2: Write pure reveal-gate tests in `test-v16-story.js`**

Example: attempting to unlock `zeroSampleFound` on Day11 returns false; Day12 returns true.

- [ ] **Step 3: Implement narrative transitions**

Unknown scene/fact IDs must throw in validation/dev mode; production renderer should show a compact fallback card rather than crash the course.

- [ ] **Step 4: Implement comic renderer**

Requirements:
- 2–5 panels;
- desktop may use 2–3 columns; mobile stacks vertically;
- image load failure retains speaker name, dialogue, evidence/time label;
- no chemistry mastery update occurs merely from reading a scene;
- completing a scene may only update story state and Director cursor.

- [ ] **Step 5: Add responsive CSS and keyboard/touch controls**

Do not introduce fixed heights. Evidence thumbnails must be tappable and readable on narrow mobile screens.

- [ ] **Step 6: Manually smoke Day1 scene with images disabled**

Expected: full dialogue remains readable; Continue advances to next Director step.

- [ ] **Step 7: Commit**

```bash
git add js/narrative-engine.js js/comic-renderer.js data/v16-story.js index.html <stylesheet-path>
git commit -m "feat(v16): add narrative state and comic scenes"
```

---

### Task 6: Case Board projection and non-spoilery player marks

**Files:**
- Create: `js/case-board.js`
- Modify: `app.js`
- Modify: current main stylesheet(s)
- Extend: `data/v16-story.js`

**Interfaces:**
- `NS.V16CaseBoard.getModel(state) -> {facts, contradictions, testimony, route, personalMarks}`
- `NS.V16CaseBoard.setPersonalMark(state, targetId, mark)` where mark is `focus|uncertain|temporarily-cleared|null`.

- [ ] **Step 1: Write a model test**

Assert locked facts do not appear, unlocked facts do, and no suspect probability/score exists in the returned model.

- [ ] **Step 2: Implement pure projection**

The board may show only facts already unlocked by narrative state. Never derive “culprit likelihood”.

- [ ] **Step 3: Implement UI entry inside existing overview page**

Do not add a fourth primary triangle. Add one `查看案件板` action inside the existing overview.

- [ ] **Step 4: Implement personal marks**

Marks are learner notes only; they do not change story truth or mastery.

- [ ] **Step 5: Mobile smoke**

Four logical sections stack; no horizontal overflow at 360px viewport.

- [ ] **Step 6: Commit**

```bash
git add js/case-board.js app.js data/v16-story.js <stylesheet-path>
git commit -m "feat(v16): add spoiler-safe LAB-20 case board"
```

---

### Task 7: Day1 end-to-end vertical slice

**Files:**
- Extend: `data/v16-director.js`
- Extend: `data/v16-story.js`
- Modify only as needed: `data/day01.js`, beginner foundation/first-use/scaffold data files
- Create: `scripts/tests/test-v16-day01.js`

**Interfaces:**
- Full Day1 sequence ends in a formal 637 exit and cliffhanger.
- Existing chemistry refs remain canonical.

- [ ] **Step 1: Inventory exact Day1 existing IDs**

Record in the plan implementation notes which existing IDs correspond to:
- structure language;
- functional groups;
- electron rich/poor;
- HBr movie;
- minimal carbocation support;
- 2–3 formal exit questions.

If an approved concept has no reusable asset, create the smallest new canonical lesson/interaction in the existing Day1/beginner data file, not in `v16-director.js`.

- [ ] **Step 2: Populate Day1 Director sequence to target 49 minutes**

Mandatory ordering:
`comic → structure language → evidence mark interaction → electron lesson → HBr interaction → case return → guided/transfer → 637_exit → cliff comic`.

- [ ] **Step 3: Write Day1 structural test**

Assert:
- mandatory minutes 40–60;
- no instruction run >8;
- at least two engagement shifts;
- one `case-apply`;
- one `637_exit`;
- last 10 minutes introduce no core concept;
- all refs resolve.

- [ ] **Step 4: Run Day1 through browser from fresh state**

Verify welcome → triangle → 今日学习 → comic → course → 637 → cliff → welcome exit/resume.

- [ ] **Step 5: Measure real completion time once**

Do not “pass” from metadata alone. Record observed time in implementation notes; if >60 minutes, reduce mandatory assets before proceeding.

- [ ] **Step 6: Commit**

```bash
git add data/v16-director.js data/v16-story.js data/day01.js <any-day1-support-files> scripts/tests/test-v16-day01.js
git commit -m "feat(v16): complete Day1 director vertical slice"
```

---

### Task 8: Required/on-demand 3D gates for Day4/Day5 and generic Director 3D step

**Files:**
- Modify: `app.js`
- Modify: `data/v16-director.js`
- Reuse/modify minimally: `data/3d-lessons.js`
- Create: `scripts/tests/test-v16-3d-gates.js`

**Interfaces:**
- Director `type:'3d'` supports `{ref, mode:'required'|'on_demand'}`.
- Required step completes only when existing 3D progress reports completion.
- On-demand step does not block cursor if learner chooses 2D/skip according to approved design.

- [ ] **Step 1: Write gate tests**

Fixtures:
- Day4 SN2 required remains at same cursor until `threeDProgress.sn2_backside.completed===true`.
- Day5 E2 required behaves the same.
- On-demand Newman does not block mandatory progress.

- [ ] **Step 2: Add generic 3D Director adapter**

It must invoke the existing 3D renderer; do not duplicate rendering or mastery logic.

- [ ] **Step 3: Populate Day4 and Day5 minimal Director plans around existing assets**

Use SN2 `required`, E2 anti `required`.

- [ ] **Step 4: Verify 3D-unavailable fallback**

If WebGL/3D unavailable, existing 2D fallback must satisfy the required learning gate only after the fallback practice is completed; do not deadlock the day.

- [ ] **Step 5: Commit**

```bash
git add app.js data/v16-director.js data/3d-lessons.js scripts/tests/test-v16-3d-gates.js
git commit -m "feat(v16): enforce required spatial learning gates"
```

---

### Task 9: X-17 detective case across Day13–14

**Files:**
- Extend: existing detective data file(s)
- Extend: `data/v16-director.js`
- Extend: `data/v16-story.js`
- Modify adapter only if needed: `app.js`
- Create: `scripts/tests/test-v16-detective.js`

**Interfaces:**
- One persistent detective case ID: `lab20-x17`.
- Day13 reveals formula/DBE/IR/chemical tests.
- Day14 resumes same case and reveals 1H NMR.
- Existing detective mastery/evidence recording remains unchanged.

- [ ] **Step 1: Write persistence test**

Complete Day13 evidence selections in fixture state, then construct Day14 case model and assert prior eliminations persist.

- [ ] **Step 2: Add X-17 case using approved chemistry metadata**

Do not introduce an extra “evidence minigame”; use the existing detective engine.

- [ ] **Step 3: Connect Day13 and Day14 Director steps**

Day13: `comic → minimal DBE/IR learning → detective(lab20-x17 stage1) → 637_exit`.  
Day14: `comic → NMR learning → detective(lab20-x17 stage2) → case-apply → 637_exit`.

- [ ] **Step 4: Verify no Day15 stereo conclusion is leaked**

Story validator must still keep `stereoMismatchConfirmed` locked through Day14.

- [ ] **Step 5: Commit**

```bash
git add <detective-data-path> data/v16-director.js data/v16-story.js app.js scripts/tests/test-v16-detective.js
git commit -m "feat(v16): integrate X-17 detective investigation"
```

---

### Task 10: Day15 spatial-first lesson and L20 stereo comparison

**Files:**
- Modify: `data/3d-lessons.js`
- Extend: `data/v16-director.js`
- Extend: `data/v16-story.js`
- Modify 3D adapter/renderer only if required: `app.js`
- Create: `scripts/tests/test-v16-stereo.js`

**Interfaces:**
- New 3D ref: `l20_stereo_compare`.
- Model exposes two approved case molecules and a completion state only after learner performs the required compare actions.

- [ ] **Step 1: Write data-level stereo case test**

Assert:
- `l20_stereo_compare` exists;
- both structures use the approved connectivity/stereochemistry metadata;
- interaction requires rotate/compare/identify-key-center before completion;
- completion unlocks `stereoMismatchConfirmed` only on Day15+.

- [ ] **Step 2: Implement 3D lesson data and interaction state**

Required operations:
- synchronized rotation;
- independent rotation;
- optional atom labels;
- key stereocenter selection;
- compare attempt;
- final 2D exam-style bridge.

Do not claim ordinary achiral NMR alone distinguishes enantiomeric identity. The reveal must rely on approved chiral/optical evidence plus spatial comparison.

- [ ] **Step 3: Build Day15 sequence spatial-first**

Order:
`comic → tetrahedral 3D → wedge/dash bridge → mirror overlap → CIP → R/S → enantiomer/diastereomer → concise E/Z → l20_stereo_compare → transfer → 637_exit → confrontation cliff`.

Keep Fischer advanced rules optional/repair; keep Newman/chair concise or on-demand to stay <=60 minutes.

- [ ] **Step 4: Verify 2D fallback path**

Fallback must still teach/assess spatial relation without freezing progress; it may use multiple fixed viewpoints and explicit comparison practice.

- [ ] **Step 5: Manual real-time Day15 run**

Target <=60 minutes. If over, remove optional mandatory material before touching core 3D.

- [ ] **Step 6: Commit**

```bash
git add data/3d-lessons.js data/v16-director.js data/v16-story.js app.js scripts/tests/test-v16-stereo.js
git commit -m "feat(v16): add spatial-first Day15 case proof"
```

---

### Task 11: LAB-20 hidden-route synthesis across Day17–18

**Files:**
- Extend: existing synthesis case data file(s)
- Extend: `data/v16-director.js`
- Extend: `data/v16-story.js`
- Modify adapter only if needed: `app.js`
- Create: `scripts/tests/test-v16-synthesis.js`

**Interfaces:**
- Persistent synthesis case ID: `lab20-hidden-route`.
- Day17 supports retrosynthetic route reconstruction.
- Day18 validates sequence/protection/compatibility and closes chemistry evidence.

- [ ] **Step 1: Write synthesis persistence/route-validity test**

Assert approved route steps are accepted; at least one plausible wrong route can proceed temporarily and fails later on a declared compatibility constraint rather than immediate arbitrary rejection.

- [ ] **Step 2: Add case data using existing synthesis engine schema**

Reuse existing route evaluation conventions; no second synthesis engine.

- [ ] **Step 3: Move delayed knowledge to Day18 canonical assets**

Ensure carbonyl protection (from old Day7) and amino protection (from old Day12) are taught here as needed, not duplicated in V16 data.

- [ ] **Step 4: Connect Day17/18 Director sequences**

Day17: reverse route + carbon count + final-step inference.  
Day18: protection/order/compatibility + complete hidden route + evidence synthesis + confrontation.

- [ ] **Step 5: Verify final culprit fact remains locked until evidence synthesis step**

No earlier `xuRecordTamperingConfirmed` unlock.

- [ ] **Step 6: Commit**

```bash
git add <synthesis-data-path> data/v16-director.js data/v16-story.js app.js scripts/tests/test-v16-synthesis.js
git commit -m "feat(v16): integrate LAB-20 hidden synthesis route"
```

---

### Task 12: Day19 core audit split from full 150-point simulation

**Files:**
- Create: `data/v16-exam.js`
- Extend: `data/v16-director.js`
- Modify minimally: Day19 exam queue selection in `app.js` / relevant exam helper
- Create: `scripts/tests/test-v16-day19.js`

**Interfaces:**
- `NS.V16_EXAM.day19Core.itemIds` references existing Day19 questions.
- Coverage metadata includes `reaction|mechanism|structure|stereo|spectroscopy|synthesis`.
- Full original Day19 question set remains addressable as `full150`/legacy formal simulation.

- [ ] **Step 1: Write exam selection test**

Assert:
- every core item exists in original Day19 bank;
- each required domain has at least one scored item;
- estimated median completion budget <=60 minutes using existing/declared item times;
- core UI config disables hints, immediate explanations, story, 3D.

- [ ] **Step 2: Select diagnostic core queue from existing items**

Do not rewrite questions. Prefer items with high domain discrimination and avoid redundant near-duplicates.

- [ ] **Step 3: Add separate entry for full formal simulation**

Preserve original score semantics for the 150-point full exam. The V16 core audit displays percentage/domain diagnostics, not a fake `/150` score unless weighting truly preserves 150 points.

- [ ] **Step 4: Verify Day19 produces Top3 in the format Day20 already consumes**

Do not fork Top3 logic.

- [ ] **Step 5: Commit**

```bash
git add data/v16-exam.js data/v16-director.js app.js scripts/tests/test-v16-day19.js
git commit -m "feat(v16): add 60-minute Day19 core audit"
```

---

### Task 13: Day20 final case report + presentation-aware Top3 repair

**Files:**
- Extend: `data/v16-director.js`
- Extend: `data/v16-story.js`
- Modify: `app.js` and/or Day20 presentation adapter
- Create: `scripts/tests/test-v16-day20.js`

**Interfaces:**
- `getRepairPresentation(skillId) -> '3d'|'electron'|'decision-map'|'evidence-board'|'route-board'|'standard'`.
- Existing Top3 selection and mastery updates stay unchanged.

- [ ] **Step 1: Write mapping tests**

Examples:
- R/S skill → `3d`;
- SN2/E2 spatial skill → `3d`;
- mechanism-arrow skill → `electron`;
- condition-routing skill → `decision-map`;
- NMR skill → `evidence-board`;
- synthesis skill → `route-board`.

- [ ] **Step 2: Add final case-report Director step before repair**

Learner must classify:
- 顾遥: operation error + partial concealment;
- 林岑: unauthorized evidence preservation / procedure violation;
- 许临川: unauthorized rescue route + deletion of deviation record.

The interaction must distinguish accident / procedure violation / record falsification.

- [ ] **Step 3: Reuse existing Top3 algorithm with presentation adapter**

No new mastery algorithm. Presentation only chooses the most suitable existing instructional tool.

- [ ] **Step 4: Add short final boss only on repaired skills**

No new concepts. Completion unlocks final comic and `CASE CLOSED`.

- [ ] **Step 5: Commit**

```bash
git add data/v16-director.js data/v16-story.js app.js scripts/tests/test-v16-day20.js
git commit -m "feat(v16): close case with adaptive Day20 repair"
```

---

### Task 14: Migrate remaining ordinary Days and enforce A/B/C/D/E asset status

**Files:**
- Extend: `data/v16-director.js`
- Modify metadata only as necessary: `data/day02.js`, `day03.js`, `day06.js` … `day12.js`, `day16.js`
- Modify beginner/first-use/scaffold data only to expose reusable IDs/metadata, not to duplicate content.
- Modify: `data/course-journey.js`

**Interfaces:**
- Every existing V16-used asset may carry optional metadata:

```js
v16: {
  status: 'KEEP_MAIN',
  minutes: 4,
  slot: 'learn_a',
  threeD: 'NONE'
}
```

Allowed status: `KEEP_MAIN|SHORTEN|MOVE_LATER|OPTIONAL_CASE_FILE|REPAIR_ONLY|REMOVE_FROM_20D`.

- [ ] **Step 1: Inventory each remaining Day's existing IDs before editing**

Create an implementation-note table with source ID → V16 status → target Day/slot. Do not invent replacement content before checking reuse.

- [ ] **Step 2: Populate Director plans Day2–3, Day6–12, Day16**

Use approved target times from spec. Each day must pass `validateDay` before moving to the next.

- [ ] **Step 3: Convert low-frequency items to optional/repair rather than deleting assets**

Examples from spec:
- hot concentrated KMnO4 edge cases → optional;
- Diels–Alder advanced endo/exo → optional/on-demand;
- Lucas → optional;
- oxime/hydrazone heavy practice → remove from required;
- Wittig → optional;
- Dieckmann full detail → optional;
- azo coupling → optional;
- advanced Fischer → optional/repair;
- repeated route drills → review/extension.

- [ ] **Step 4: Convert first-use and scaffold presentation policy**

First-use terms become inline expandable light explanations by default. Scaffolds auto-open only on wrong/high-confidence-wrong/low mastery or explicit `我还是不太懂` request.

- [ ] **Step 5: Update five ACT labels and new duration budgets in `course-journey.js`**

Do not alter phase dependency logic.

- [ ] **Step 6: Run pacing/prerequisite validation after every Day addition**

Run:
`node scripts/validate-v16-pacing.js && node scripts/validate-v16-prerequisites.js`

Expected final: every Day1–20 defined; all mandatory budgets pass.

- [ ] **Step 7: Commit in small groups, not one giant commit**

Recommended commits:
- `feat(v16): migrate days 2 3 6 to director`
- `feat(v16): migrate days 7 to 10 to director`
- `feat(v16): migrate days 11 12 16 to director`

---

### Task 15: Mobile, performance, fallback and cloud-state compatibility

**Files:**
- Modify: comic/case-board stylesheet(s)
- Modify: `js/comic-renderer.js`
- Modify: `app.js` only if preload hooks live there
- Extend: `scripts/tests/test-v16-resume.js`
- Create or extend smoke scripts as appropriate

**Interfaces:**
- Current scene and next scene may be preloaded; never preload all 20 days of imagery.
- Missing comic assets degrade to text dialogue/evidence.
- 3D failure degrades to existing 2D fallback.
- Cloud serialization includes schema-v3 fields but stays backward-tolerant.

- [ ] **Step 1: Add narrow-viewport smoke checks**

At 360px-equivalent layout verify:
- no horizontal overflow;
- comic panels stack;
- dialogue readable;
- case-board sections stack;
- evidence can be enlarged/tapped;
- 3D/fallback controls remain reachable.

- [ ] **Step 2: Add lazy/preload policy**

Load current scene assets immediately and next scene assets opportunistically. Do not add a new image framework.

- [ ] **Step 3: Test image failure**

Force invalid asset URL for one panel; expected: names/dialogue/evidence still render and course remains completable.

- [ ] **Step 4: Test cloud/local roundtrip with V16 state**

Serialize → sync payload → restore. Assert Director cursor, story facts, skills, review and 3D progress survive.

- [ ] **Step 5: Commit**

```bash
git add js/comic-renderer.js app.js <stylesheet-path> scripts/tests/test-v16-resume.js
git commit -m "fix(v16): harden mobile fallback and state persistence"
```

---

### Task 16: Unified validation runner, full regression, real-user timing gates and release docs

**Files:**
- Create: `scripts/run-v16-validation.js`
- Modify only after pass: `BUILD_STATUS.md`, `CODEX_STATE.md`, `README.md` or current equivalent release docs

**Interfaces:**
- One command runs all V16 static/unit validators and existing repository validators that can run non-interactively.

- [ ] **Step 1: Implement unified validator runner**

It must invoke, fail-fast on nonzero exit, and print explicit labels for:
- state migration;
- story;
- Director;
- prerequisites;
- pacing;
- resume;
- Day1;
- 3D gates;
- detective;
- stereo;
- synthesis;
- Day19;
- Day20;
- existing Phase1–5/build validators.

- [ ] **Step 2: Run full automated validation**

Run: `node scripts/run-v16-validation.js`  
Expected terminal summary includes:

```text
V16_STORY_PASS
V16_PACING_PASS
V16_PREREQUISITE_PASS
V16_3D_REQUIRED_PASS
V16_RESUME_PASS
V16_DAY19_PASS
V16_DAY20_PASS
V16_CLOUD_STATE_PASS
V16_ALL_PASS
```

- [ ] **Step 3: Perform mandatory real browser runs**

Fresh learner:
- Day1 full, timed;
- Day5 full, timed;
- Day7 full, timed;
- Day15 full, timed;
- Day19 full, timed.

Existing learner fixture:
- resume unfinished legacy Day;
- completed legacy Days remain complete;
- review queue and mastery intact.

Mobile:
- welcome → triangle → today's learning → temporary exit → welcome → resume;
- comic/evidence/3D fallback/case board.

Record observed times. Any mandatory Day >60 minutes blocks release and must be reduced before documentation update.

- [ ] **Step 4: Verify full 150-point exam remains available**

Run one smoke entry to the separate full exam and confirm original scoring behavior still works.

- [ ] **Step 5: Update release/status documentation only after all gates pass**

State clearly:
- V16 Director enabled;
- story version/case title;
- schema version 3;
- full 150-point exam preserved separately;
- timing audit results;
- all QA gates.

- [ ] **Step 6: Commit**

```bash
git add scripts/run-v16-validation.js BUILD_STATUS.md CODEX_STATE.md README.md
git commit -m "docs(v16): record validated immersive course release"
```

---

## Final verification before merge/release

Execution worker must invoke `superpowers:verification-before-completion` before claiming success. Minimum evidence:

1. `node scripts/run-v16-validation.js` passes.
2. Existing pre-V16 validators pass.
3. Browser timing evidence for Day1/5/7/15/19 is recorded and none exceeds 60 mandatory minutes.
4. Legacy learner migration preserves mastery/review/exam/3D/detective/synthesis state.
5. Full 150-point exam remains reachable and independently functional.
6. Day15 spatial proof works both in 3D and 2D fallback.
7. Story reveal gates prevent Day12/15/18 truths from appearing early.
8. Mobile resume from welcome page works after temporary exit.

## Implementation boundaries

Do **not** during execution:
- redesign the story;
- add new protagonists or culprit branches;
- add new primary navigation;
- replace the existing mastery algorithm;
- replace detective/synthesis engines;
- replace cloud/auth infrastructure;
- re-expand low-frequency content into mandatory mainline;
- mark a Day complete solely because metadata says the planned time is below 60 minutes.

If implementation exposes a chemistry inconsistency in the approved L20 route, stop that task and correct the canonical chemistry case in the spec/story source before writing UI around a false premise. Chemistry correctness overrides narrative convenience.
