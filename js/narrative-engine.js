(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};

  const source = () => NS.V16_STORY || { facts: {}, factGates: {}, contradictions: {}, scenes: {} };

  function ensureStoryState(state) {
    if (!state || typeof state !== 'object') throw new Error('V16 narrative requires a state object');
    state.v16 = state.v16 && typeof state.v16 === 'object' ? state.v16 : {};
    const story = state.v16.story && typeof state.v16.story === 'object' ? state.v16.story : {};
    story.unlockedScenes = Array.isArray(story.unlockedScenes) ? story.unlockedScenes : [];
    story.confirmedFacts = Array.isArray(story.confirmedFacts) ? story.confirmedFacts : [];
    story.contradictions = Array.isArray(story.contradictions) ? story.contradictions : [];
    story.personalMarks = story.personalMarks && typeof story.personalMarks === 'object' ? story.personalMarks : {};
    story.routeRecovery = Math.max(0, Number(story.routeRecovery) || 0);
    state.v16.story = story;
    return story;
  }

  function allFacts() {
    return Object.values(source().facts || {});
  }

  function factById(factId) {
    return allFacts().find(fact => fact.id === factId) || null;
  }

  function sceneById(sceneId) {
    return source().scenes?.[sceneId] || null;
  }

  function canUnlockFact(state, factId, day) {
    ensureStoryState(state);
    const fact = factById(factId);
    if (!fact) throw new Error(`Unknown V16 fact: ${factId}`);
    const minimum = Math.max(1, Number(source().factGates?.[factId]) || 1);
    return Number(day) >= minimum;
  }

  function completeScene(state, sceneId, day) {
    const scene = sceneById(sceneId);
    if (!scene) throw new Error(`Unknown V16 scene: ${sceneId}`);
    const story = ensureStoryState(state);
    if (!story.unlockedScenes.includes(sceneId)) story.unlockedScenes.push(sceneId);

    (scene.unlockFacts || []).forEach(factId => {
      if (canUnlockFact(state, factId, day) && !story.confirmedFacts.includes(factId)) story.confirmedFacts.push(factId);
    });

    (scene.unlockContradictions || []).forEach(contradictionId => {
      const known = Object.values(source().contradictions || {}).some(item => item.id === contradictionId);
      if (!known) throw new Error(`Unknown V16 contradiction: ${contradictionId}`);
      if (!story.contradictions.includes(contradictionId)) story.contradictions.push(contradictionId);
    });

    return state;
  }

  function getUnlockedFacts(state) {
    const story = ensureStoryState(state);
    return story.confirmedFacts.map(factById).filter(Boolean);
  }

  function getUnlockedContradictions(state) {
    const story = ensureStoryState(state);
    const rows = Object.values(source().contradictions || {});
    return story.contradictions.map(id => rows.find(item => item.id === id)).filter(Boolean);
  }

  NS.V16Narrative = {
    ensureStoryState,
    sceneById,
    canUnlockFact,
    completeScene,
    getUnlockedFacts,
    getUnlockedContradictions
  };
})();
