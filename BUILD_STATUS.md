# BUILD STATUS — Organic637 V16 Formal Release

Date: 2026-09-12
Branch: `v16-rebuild`
Release class: **FORMAL SOURCE RELEASE**

## Current state

- V16 Director: Day1–Day20 enabled; legacy fallback retained for migration safety.
- Formal progression: sequential day unlocking restored; TEST BUILD badges removed.
- Welcome/portal: LAB-20 immersive mystery presentation retained in formal mode.
- Story: canonical `LAB-20：零号样品` source + reveal gates + **54-chapter formal novel** spanning Day1–Day20.
- Novel: prose is the primary narrative layer; chapter headers show `第 X 章 / 54`, and the chapter index only reveals already-read chapters. Character art, scene art and evidence images are supporting visuals, never required for comprehension.
- Learning state: schema/version 3 with legacy mastery/review/exam/3D/detective/synthesis preservation.
- Day4/Day5 required spatial gates: SN2 backside / E2 anti with 2D fallback.
- Day13–14 persistent X-17 detective case; Day15 spatial-first stereochemistry; Day17–18 hidden-route synthesis.
- Day19: short core audit + independent original 150-point exam.
- Day20: final case report + Top3 repair + repaired-skill micro-Boss.
- Question bank: final runtime audit covers 358 main/repair/adaptive records. The complete legacy bank still contains 260 main + 48 repair + 42 adaptive tasks, while 268 main records are present in the final runtime registry after V16 additions/normalization.
- Choice display: deterministic per-question shuffle removes the old answer-position pattern without changing answer ids.
- Cloud/local roundtrip: schema-v3 V16 state serialization/restore covered by automated tests.

## Formal audit

See `FORMAL_RELEASE_AUDIT.md`.

Notable repaired defects:

1. Day1 direct-structure question no longer mixes a suspect accusation into structural observation.
2. Term-leak regression removed from Day1/Day3.
3. Day3 duplicate mandatory question removed and replaced by a new transfer question.
4. Day13 multi-candidate evidence question is now a real multi-choice interaction.
5. Correct-answer positions are no longer effectively fixed at option A.

## Automated validation

Run:

```bash
node scripts/run-v16-validation.js
```

Required final marker:

`V16_FORMAL_AUTOMATED_ALL_PASS`

Current automated status: **PASS**.

Post-deploy browser smoke is still recommended because this execution sandbox cannot run the full GitHub Pages UI itself. Use `GITHUB_PAGES_TEST_CHECKLIST.md` after deployment for Day1/5/7/15/19, resume, story recap, 3D/fallback and full-150 checks.
