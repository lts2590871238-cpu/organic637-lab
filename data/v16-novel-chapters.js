(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};
  const novel = NS.V16_NOVEL;
  const director = NS.V16_DIRECTOR_DATA;
  if (!novel?.sections || !director?.days) return;

  const orderedSceneIds = [];
  const stepByScene = new Map();

  for (let day = 1; day <= 18; day++) {
    const sequence = director.days?.[day]?.sequence || [];
    for (const step of sequence) {
      if (step.type !== 'comic' || !step.sceneId) continue;
      orderedSceneIds.push(step.sceneId);
      stepByScene.set(step.sceneId, { day, stepId: step.id, sequenceIndex: sequence.indexOf(step) });
    }
  }

  // Day19 intentionally removes story prompts from the formal exam itself. The novel still
  // keeps one short threshold chapter outside the exam so the 20-day story remains continuous.
  orderedSceneIds.push('case19-open');
  stepByScene.set('case19-open', { day:19, stepId:null, sequenceIndex:-1, outsideExam:true });

  for (let day = 20; day <= 20; day++) {
    const sequence = director.days?.[day]?.sequence || [];
    for (const step of sequence) {
      if (step.type !== 'comic' || !step.sceneId) continue;
      orderedSceneIds.push(step.sceneId);
      stepByScene.set(step.sceneId, { day, stepId: step.id, sequenceIndex: sequence.indexOf(step) });
    }
  }

  const chapters = orderedSceneIds.map((sceneId, index) => {
    const section = novel.sections[sceneId] || {};
    const meta = stepByScene.get(sceneId) || {};
    return {
      number: index + 1,
      sceneId,
      day: section.day || meta.day || 1,
      title: section.title || `DAY ${section.day || meta.day || 1}`,
      subtitle: section.subtitle || '',
      stepId: meta.stepId || null,
      outsideExam: Boolean(meta.outsideExam)
    };
  });

  function getChapter(sceneId) {
    return chapters.find(chapter => chapter.sceneId === sceneId) || null;
  }

  function isChapterReached(chapter, state, includeSceneId = '') {
    if (!chapter) return false;
    if (chapter.sceneId === includeSceneId) return true;
    if (chapter.outsideExam) {
      return Boolean(
        state?.examResults?.v16Day19Core ||
        state?.days?.[19]?.startedAt ||
        state?.days?.[19]?.finished ||
        state?.v16?.days?.[20]
      );
    }
    const dayState = state?.v16?.days?.[chapter.day];
    if (!dayState) return false;
    if (chapter.stepId && dayState.completedSteps?.[chapter.stepId]) return true;

    const sequence = director.days?.[chapter.day]?.sequence || [];
    const targetIndex = sequence.findIndex(step => step.id === chapter.stepId);
    const cursor = Number.isFinite(dayState.cursor) ? dayState.cursor : 0;
    return targetIndex >= 0 && cursor >= targetIndex;
  }

  function getUnlockedChapters(state, options = {}) {
    const includeSceneId = options.includeSceneId || '';
    return chapters.filter(chapter => isChapterReached(chapter, state, includeSceneId));
  }

  novel.chapters = chapters;
  novel.chapterCount = chapters.length;
  novel.getChapter = getChapter;
  novel.getUnlockedChapters = getUnlockedChapters;
})();
