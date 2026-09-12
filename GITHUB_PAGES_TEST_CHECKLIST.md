# Organic637 V16 — GitHub Pages Test-Build Acceptance Checklist

This checklist is the remaining gate between the current V16 Test Build and a formal release. Run it only after uploading the Test Build to GitHub Pages. Do not call the build “formal release” until every blocking item below passes.

## Test environment

Record the deployed GitHub Pages URL, browser, device, viewport/device model, and date in your own test note. Use at least one desktop Chromium browser and one real phone.

## A. Fresh learner — required timed days

Run each day from its first mandatory step without optional case files. Use normal reading/answering speed; do not speed-click.

| Day | Purpose | Metadata budget | Release gate |
|---|---|---:|---|
| Day1 | full V16 vertical slice | 49 min | observed mandatory time must be <=60 min |
| Day5 | four-way SN1/SN2/E1/E2 + E2 spatial gate | 55 min | <=60 min |
| Day7 | carbonyl day after mainline reduction | 51 min | <=60 min |
| Day15 | spatial-first stereochemistry | 59 min | <=60 min |
| Day19 | no-scaffold core audit | 58 min | <=60 min |

If any mandatory run exceeds 60 minutes, stop formal-release promotion and reduce mandatory content before retesting.

## B. Navigation and resume

On a phone:

1. Open site → welcome page must appear first.
2. Tap “开始今天的学习！” → triangular portal.
3. Enter 今日学习 and advance several Director steps.
4. Use 暂时离开 → must return to welcome page.
5. Re-enter → resume at the saved Director step, not the first comic/lesson.
6. 首页总览 → Case Board remains inside overview; portal still has only the frozen three entries.

Existing-user fixture:

- unfinished legacy day maps to the closest V16 mandatory step;
- completed legacy days remain complete;
- mastery, review queue, Day19 results, 3D, detective and synthesis progress remain present.

## C. Comic resilience

Check at least one normal story scene and deliberately break/block one local story image in DevTools if practical.

Required behavior:

- dialogue remains readable;
- character/evidence fallback appears;
- course can continue;
- no story-image failure changes chemistry mastery;
- evidence images can be enlarged/tapped on phone;
- no horizontal overflow at approximately 360px width.

## D. 3D and fallback

Day4:

- SN2 backside task is required;
- completing the spatial task releases the gate;
- if 3D is unavailable, the tested 2D fallback is reachable and can release the gate.

Day5:

- E2 anti-periplanar task behaves the same way.

Day15:

- tetrahedral → mirror/non-superposition → CIP/R/S → L20 comparison appears in spatial-first order;
- L20-0/L20-F comparison is manipulable on the target device;
- fallback remains usable if 3D fails;
- ordinary IR/NMR is not presented as proof of enantiomer identity.

## E. Detective and synthesis continuity

Day13 → Day14:

- X-17 state persists across days;
- Day13 does not prematurely identify the final stereochemical issue;
- Day14 resumes the same case and uses NMR symmetry to lock the planar structure.

Day17 → Day18:

- hidden-route reconstruction persists;
- Day18 reuses the saved route instead of silently starting over;
- record-tampering truth is not revealed before its intended Day18 close.

## F. Day19 / Day20

Day19 core audit:

- no character/comic/scaffold appears inside the formal audit;
- result is shown as a core-audit percentage, not a fake `/150` score;
- Top3 weak abilities are produced for Day20.

Full exam:

- open `#full-exam/19`;
- original 24-question 150/150 exam is reachable;
- scoring behaves independently from the shorter core audit;
- running the full exam does not overwrite the Day20 diagnostic source incorrectly.

Day20:

- final report distinguishes operation error / procedure violation / record falsification;
- Top3 repairs use the appropriate presentation tool;
- micro-Boss samples repaired skills only;
- no new core chemistry is introduced.

## G. Final mobile check

On a real phone verify welcome, portal, lesson, comic, evidence lightbox, Case Board, required 3D/fallback, Day19 core audit and Day20 all remain inside the viewport without unusable horizontal scrolling or unreachable buttons.

## Promotion rule

Promote from **V16 Test Build** to **V16 Formal Release** only when all blocking checks above pass and all five timed mandatory days are <=60 minutes. Record any issue first, fix the code, rerun `node scripts/run-v16-validation.js`, redeploy, and repeat the affected live check.
