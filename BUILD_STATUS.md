# BUILD STATUS — Organic637 V16 Test Build

Date: 2026-09-12
Branch: `v16-rebuild`
Release class: **TEST BUILD — not the formal release**

## Current state

- V16 Director: ENABLED for Day1–Day20 with legacy fallback retained.
- Story: `LAB-20：零号样品` canonical timeline and reveal gates loaded from a single story source.
- Learning state: schema/version 3 with legacy mastery/review/exam/3D/detective/synthesis preservation.
- Mandatory day budgets: 49, 49, 51, 54, 55, 51, 51, 50, 52, 54, 53, 54, 49, 53, 59, 51, 53, 55, 58, 54 minutes.
- Day4/Day5 required spatial gates: SN2 backside / E2 anti with 2D fallback.
- Day13–14: persistent X-17 detective case.
- Day15: spatial-first stereochemistry plus L20-0/L20-F comparison.
- Day17–18: persistent hidden-route synthesis case.
- Day19: 58-minute core audit; original 150-point exam preserved separately at `#full-exam/19`.
- Day20: final case report + existing Top3 repair + repaired-skill micro-Boss.
- Comic assets: local/static-first, current+next scene preload only, text/color fallback on image failure.
- Mobile static guards: 360px stacking, evidence enlargement, case-board stacking and reachable fallback controls.
- Cloud/local roundtrip: schema-v3 V16 state serialization and restore covered by automated tests.

## Automated validation

Command:

```bash
node scripts/run-v16-validation.js
```

Latest result: **PASS**

Verified markers include:

- `V16_STORY_PASS`
- `V16_PACING_PASS`
- `V16_PREREQUISITE_PASS`
- `V16_3D_REQUIRED_PASS`
- `V16_RESUME_PASS`
- `V16_DAY19_PASS`
- `V16_DAY20_PASS`
- `V16_CLOUD_STATE_PASS`
- `V16_LEGACY_REGRESSION_PASS`
- `V16_AUTOMATED_ALL_PASS`

Legacy regression validators also pass: full20, closure-v5/v10/v11, layout-v13, Phase3, Phase4 and Phase5.

Historical validators `validate-closure-v4.mjs`, `validate-closure-v8.mjs`, `validate-closure-v9.mjs`, and `validate-layout-v12.mjs` are not release gates. They are superseded; in particular layout-v12 hard-codes the obsolete 70–90 minute rule and conflicts with the approved 40–60 minute V16 design.

## Formal-release gate still open

This execution sandbox blocks browser navigation to localhost and `file://`, so browser/live timing evidence cannot be honestly claimed here. Formal release remains blocked until the GitHub Pages build passes the real-device checklist in `GITHUB_PAGES_TEST_CHECKLIST.md`.

Required live checks include Day1/5/7/15/19 timing, welcome→temporary exit→welcome→resume, comic/evidence interactions, 3D and 2D fallback reachability, mobile overflow, and independent entry/scoring of the full 150-point exam.

**Current verdict:** automated Test Build accepted; formal V16 release not yet accepted.
