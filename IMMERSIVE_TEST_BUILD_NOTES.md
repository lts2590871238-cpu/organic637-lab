# V16 Immersive Test Build Notes

This test build replaces the earlier card-like story presentation with an immersive visual-novel / webtoon-inspired layer while keeping the chemistry engine unchanged.

## What changed

- Five recurring characters now ship with local built-in portrait art:
  - 周砚
  - 许临川
  - 林岑
  - 顾遥
  - 程野
- Day 1 begins with a cast introduction, then enters the 00:17 incident as full-screen story pages.
- Story panels use local laboratory backgrounds and evidence art instead of blank placeholders.
- The unresolved case question is handed directly into the next lesson through the same investigation objective.
- Test build explicitly unlocks Day 1–20 so any day can be opened directly for QA.
- The normal sequential unlock logic is preserved behind `data/v16-test-config.js`; formal release only needs the test-build switch disabled/removed.
- Comic assets are local WebP files; no external image host is required.
- Image failure still degrades to readable text/evidence fallbacks and never blocks course progress.

## Release status

- Automated validation: PASS
- GitHub Pages live-browser review: REQUIRED before formal release
- Formal sequential progression: intentionally disabled in this test build only

## Live checks requested

Prioritize Day 1, 5, 7, 15 and 19 on desktop and phone. Check:

1. character portraits feel consistent and readable;
2. Day 1 story produces real curiosity before chemistry starts;
3. story-to-lesson transition feels motivated rather than like a classroom intro;
4. evidence zoom works and no image 404 blocks progress;
5. all 20 days are directly accessible in test mode;
6. resume works after leaving mid-story and mid-lesson.
