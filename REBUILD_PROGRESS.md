# Organic637 V16 Rebuild Progress

## Recovery decision

The lost Codex implementation is treated as non-authoritative and not reconstructed from memory. The approved V16 design and implementation plan remain binding. Rebuild starts from the recovered v13 functional project plus the v15 visual-consistency patch.

## Baseline

- Functional base: beginner-closure v13.
- Visual overlay: v15 `visual-consistency-v15.js` + `lesson-layout-v15.js`.
- The archive did not contain the later 3D implementation despite v15's historical index referencing it. Missing 3D is therefore rebuilt/tested explicitly later; it is not faked in the baseline.
- Current canonical legacy validators passing: full20, closure-v10, closure-v11, layout-v13, phase3, phase4, phase5.
- Historical stale validators closure-v4/v8/v9 are not baseline gates because they are superseded and/or depend on removed intermediate closure files.

## Completed V16 tasks

### Task 1 — COMPLETE
Schema v3 and lossless V16 state migration.
Commit: `208ee0a`

- Added `Learning.ensureV16RootState`.
- Added `Learning.ensureV16DayState`.
- Upgraded fresh/migrated state to schema/version 3.
- Preserves old mastery, attempts, review, exam, 3D, detective, synthesis and legacy day state.
- Updated Phase3 migration validation for schema v3.
- New test: `scripts/tests/test-v16-state.js` PASS.

### Task 2 — COMPLETE
Canonical LAB-20 story truth and reveal validator.
Commit: `57ce9d7`

- Added `data/v16-story.js` as the single story/chemistry truth source.
- Added `data/v16-assets.js` registry.
- Frozen canonical 19:52 → 00:17 timeline.
- Frozen reveal gates: secret route Day9+, zero sample Day12+, stereo mismatch Day15+, record tampering Day18+.
- Frozen chemistry canon for L20-0, L20-F, X-17, R-17 systems and hidden rescue tail.
- New `V16_STORY_PASS` validator.

### Task 3 — COMPLETE
Pure Director engine, Day1 plan, pacing and prerequisite validators.
Commit: `6c3a15a`

- Added `data/v16-director.js`.
- Added `js/director-engine.js`.
- Day1 Director sequence now totals exactly 49 mandatory minutes.
- Continuous instruction stays <=8 minutes.
- Day1 includes story, interaction, case application and formal 637 exit.
- New pacing and prerequisite validators PASS.

## Important implementation ruling

The implementation-plan examples used `window.ORGANIC637`, but the recovered real codebase consistently uses `window.Organic637` and exposes learning helpers through `Organic637.Learning`. The rebuild follows the existing namespace to minimize compatibility risk. This is an implementation adaptation, not a product/design change.

### Task 4 — COMPLETE
Director routing, schema-v3 save path, resume migration and legacy fallback.
Commits: `ef40c07`, `bcb6aa7`

- Extracted the old linear course flow into `legacyDayPage(day)` instead of deleting it.
- `dayPage(day)` now prefers a valid V16 Director plan and falls back safely to legacy flow.
- Fixed `app.js normalizeState()` so it no longer downgrades schema/version back to 2.
- Added ID-based legacy progress → V16 cursor migration; moved/optional content advances to the next mandatory step instead of resetting the learner.
- Fresh users start at the first Director step; completed legacy days map to the end.
- New integration/resume tests PASS.

### Task 5 — COMPLETE
Narrative state and spoiler-safe comic rendering.
Commit: `8c46489`

- Added Day1 scenes `case01-open`, `case01-return`, `case01-cliffhanger`.
- Added `js/narrative-engine.js` and `js/comic-renderer.js`.
- Reading story updates only story evidence state; it never mutates chemistry mastery.
- Day12/15/18 reveal gates are enforced in code.
- Comic text remains usable when image assets fail.

### Task 6 — COMPLETE
LAB-20 case board.
Commit: `ee66fd6`

- Added `js/case-board.js` with unlocked facts, contradictions, testimony and route milestones only.
- No probability/suspicion scoring is used. Personal marks are only `focus`, `uncertain`, `temporarily-cleared`.
- Case Board is available from 首页总览; the frozen three-way portal remains unchanged.

### Task 7 — COMPLETE (browser live-run blocked by harness)
Day1 Director vertical slice.

- Day1 Director sequence resolves to real comic, lesson, interaction, case-application and 637 resources and remains exactly 49 mandatory minutes.
- Added real Day1 evidence-selection, electron-arrow and case-evidence interactions.
- Portal/home progress and time estimates use Director cursor/target minutes when V16 is active.
- Node validators PASS: Day1, app integration, resume, narrative, case board, pacing, prerequisites, story, full20, Phase3, Phase4 and Phase5.
- A Playwright smoke test was added to walk welcome → portal → full Day1 → completion, but this execution sandbox blocks both localhost and `file://` Chromium navigation with `ERR_BLOCKED_BY_ADMINISTRATOR`. This is recorded as an environment limitation, not reported as a browser PASS. The smoke test remains in the repo for a normal browser-capable environment.

### Task 8 — COMPLETE
Required spatial learning gates for Day4/Day5 plus resilient 2D fallback.
Commit lineage: `822ea44`, with 3D integration retained through later commits.

- Rebuilt the missing shared 3D data/renderer contract from the recovered codebase.
- Day4 `sn2_backside` and Day5 `e2_anti` are REQUIRED Director gates.
- `threeDProgress[ref].completed` remains the compatibility contract.
- A correct 2D fallback can release the gate so WebGL/canvas failures cannot deadlock the course.
- On-demand 3D remains non-blocking.

### Task 9 — COMPLETE
X-17 continuous detective investigation across Day13–14.
Commit: `a995fda`

- Day13 stops at formula/DBE/IR evidence and deliberately does not overclaim structure.
- Day14 resumes the same saved detective state and uses NMR symmetry to lock X-17 as 4-bromoacetophenone.
- Ordinary spectral evidence is kept separate from Day15 stereochemical identity evidence.

### Task 10 — COMPLETE
Day15 spatial-first stereochemistry and L20 stereochemical proof.

- Day15 mandatory sequence is exactly 60 minutes and starts with 3D before text.
- Added REQUIRED `tetrahedral_core`, `mirror_overlap`, `cip_rs_core`, and `l20_stereo_compare`.
- Added dedicated synchronized/independent dual-sample comparison UI with label toggle, key-center check, evidence attempt, 2D bridge and fallback.
- Added LAB-20 case evidence question using existing mastery IDs only.
- Added `case15-open`, `case15-proof`, `case15-close`; only the closing evidence scene unlocks `final_sample_wrong_identity`.
- Chemistry rule preserved: ordinary achiral IR/NMR supports connectivity, while chiral HPLC/optical rotation + 3D reasoning establish stereochemical identity.
- Full legacy + V16 automated validation suite passes.

### Task 11 — COMPLETE
LAB-20 hidden-route reconstruction across Day17–18.
Commit: `bdab1c8`

- Added persistent synthesis case `lab20-hidden-route` using the existing synthesis engine.
- Day17 reconstructs R-17 abnormal system → recoverable benzyl alcohol → X-17 → L20-F with carbon-ledger, last-step and disconnection reasoning.
- A plausible protection detour is allowed initially and fails only when later PCC compatibility is checked; the route engine does not instantly red-X a chemically possible earlier step.
- Day18 reuses the same saved case instead of creating a second route game; completed Day17 routes are reviewed rather than forced through the maze again.
- Replay no longer deletes the saved Day17 completion record, preserving resume safety.
- Delayed protection/sequence/redox compatibility assets are taught in Day18 where they have a real reason to exist.
- Added convergent-evidence case question separating experimental failure from deliberate record alteration.
- Added Day17/18 story scenes; `xu_deleted_record` remains locked until `case18-close`.
- Day17 = 52 mandatory minutes; Day18 = 49 mandatory minutes.
- New `scripts/tests/test-v16-synthesis.js` PASS; full legacy + V16 automated validation suite PASS.

## Next task

Task 12: split Day19 into a <=60-minute V16 core audit while preserving the original full 150-point examination as a separate formal simulation.

### Task 12 — COMPLETE
Day19 core audit separated from the formal 150-point simulation.
Commits: `6c0e9cf`, `c5b8736`, `d8ca85e`

- Day19 V16 mainline is a 58-minute no-scaffold core audit with domain diagnostics and Top3 output.
- Original 24-question 150/150 exam remains available at `#full-exam/19` as a separate formal simulation.
- Core audit percentage is not mislabeled as a 150-point score.
- Final 120-point readiness language now requires actual full-150 evidence, not the shorter core audit.
- Duplicate Day19 Director-key regression was caught and fixed.

### Task 13 — COMPLETE
Day20 final case report, Top3 repair presentation and repaired-skill micro-Boss.
Commit: `b1894a9`

- Final report distinguishes operation error, procedure violation and record falsification.
- Existing Top3 algorithm is reused; only repair presentation changes by weakness type.
- Spatial repairs use required 3D with tested 2D fallback; mechanism/evidence/synthesis weaknesses use matching tools.
- The micro-Boss only samples repaired skills and records transfer evidence.
- Day20 introduces no new core chemistry.

### Task 14 — COMPLETE
All 20 days migrated to the V16 Director with A/B/C/D/E-style asset policy.
Commits: `080b8fd`, `c3031e5`, `894584e`

- All Day1–20 Director plans are defined and pass pacing validation.
- Frozen mandatory budgets are now: 49,49,51,54,55,51,51,50,52,54,53,54,49,53,59,51,53,55,58,54 minutes.
- Low-frequency items remain in the library but are classified as optional/later/repair/reference-only instead of occupying mandatory mainline time.
- Added `data/v16-asset-migration.js` plus `docs/v16/asset-migration.md` as migration metadata/inventory, without duplicating teaching content.
- Added ordinary-day LAB-20 comic scenes while preserving reveal gates: backup route Day9+, B3 truth Day12+, stereochemical proof Day15+, record tampering Day18+.
- First-use terminology is lightweight/expandable in V16; deep lesson scaffolds default collapsed and no longer block progression. Wrong/high-confidence-wrong/low-mastery question support re-expands automatically.
- Five ACT labels and homepage journey copy now match LAB-20 and the shortened V16 curriculum.
- Full legacy + V16 automated suite passes. Day15 (59) and Day19 (58) only trigger the allowed >55 recommendation warning; both remain <=60.

## Next task

Task 15: harden mobile layout, comic asset loading/preload policy, 3D fallback reachability and schema-v3 cloud/local state roundtrip for the V16 Test Build.

### Task 15 — COMPLETE
Mobile, comic-resource resilience and schema-v3 cloud/local persistence hardening.
Commit: `0e92300`

- Added current-scene + next-scene-only comic preload policy; no 20-day eager image load.
- Missing story images degrade to text/color evidence instead of blocking learning.
- Added evidence enlargement/lightbox behavior and 360px static layout guards.
- Added pure V16 cloud-state codec and roundtrip coverage; Director cursor, story, skills, 205 attempts, review, 3D, detective, synthesis and exam state survive serialize/restore/migrate.
- Updated mobile browser smoke to 360px checks. The sandbox cannot execute the live browser smoke because localhost/file navigation is administratively blocked.
- Full V16 + legacy automated regression suite PASS.

### Task 16 — AUTOMATED GATES COMPLETE; LIVE BROWSER GATE PENDING
Unified automated validation and Test Build release documentation.

- Added `scripts/run-v16-validation.js` and its runner regression test.
- Fresh run on 2026-09-12 reports `V16_AUTOMATED_ALL_PASS` and `V16_LEGACY_REGRESSION_PASS` with zero test/validator failures.
- All 20 day plans remain <=60 mandatory minutes; Day15=59 and Day19=58 intentionally exceed only the recommended 45–55 band.
- Superseded historical validators are disclosed explicitly rather than silently ignored; `validate-layout-v12.mjs` conflicts with the approved V16 40–60 minute rule.
- Formal release is intentionally NOT claimed because this sandbox cannot perform the mandatory live browser timing/resume/interaction/full-exam runs.
- Added `GITHUB_PAGES_TEST_CHECKLIST.md` as the remaining promotion gate from Test Build to Formal Release.

## Current verdict

**V16 TEST BUILD: AUTOMATED ACCEPTANCE PASS.**

**V16 FORMAL RELEASE: PENDING LIVE GITHUB PAGES / REAL-DEVICE ACCEPTANCE.**
