(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};
  const source = () => NS.V16_DIRECTOR_DATA || { days: {} };
  const allowedTypes = new Set(['comic','lesson','interaction','question','question-group','3d','detective','synthesis','case-board','exam','case-apply','case-report','adaptive-repair','final-boss']);

  function getDayPlan(day) {
    return source().days?.[Number(day)] || null;
  }

  function getStep(day, cursor) {
    const plan = getDayPlan(day);
    if (!plan) return null;
    const index = Math.max(0, Number(cursor) || 0);
    return plan.sequence[index] || null;
  }

  function estimateMinutes(day) {
    const plan = getDayPlan(day);
    if (!plan) return 0;
    return plan.sequence.reduce((sum, step) => sum + (step.optional === true ? 0 : Math.max(0, Number(step.minutes) || 0)), 0);
  }

  function validateDay(day) {
    const plan = getDayPlan(day);
    const errors = [];
    const warnings = [];
    if (!plan) return { errors:[`Day${day} plan missing`], warnings };
    if (!Array.isArray(plan.sequence) || plan.sequence.length === 0) return { errors:[`Day${day} sequence empty`], warnings };

    const mandatory = plan.sequence.filter(step => step.optional !== true);
    const total = estimateMinutes(day);
    if (total > 60) errors.push(`Day${day} mandatory minutes ${total} > 60`);
    if (total < 40) warnings.push(`Day${day} mandatory minutes ${total} < 40`);
    if (total < 45 || total > 55) warnings.push(`Day${day} outside recommended 45-55 minute band (${total})`);

    let instructionRun = 0;
    let shifts = 0;
    let previousEngagement = null;
    let elapsed = 0;
    const finalTenStart = Math.max(0, total - 10);
    let hasCaseApply = false;
    let has637Exit = false;

    for (const step of mandatory) {
      if (!step.id) errors.push(`Day${day} step missing id`);
      if (!allowedTypes.has(step.type)) errors.push(`Day${day} ${step.id || '?'} invalid type ${step.type}`);
      const needsRef = ['lesson','interaction','question','3d','detective','synthesis','case-apply'].includes(step.type);
      if (needsRef && !step.ref) errors.push(`Day${day} ${step.id} missing ref`);
      if (step.type === 'question-group' && !(Array.isArray(step.refs) && step.refs.length)) errors.push(`Day${day} ${step.id} missing refs`);
      if (step.type === 'comic' && !step.sceneId) errors.push(`Day${day} ${step.id} missing sceneId`);
      if (step.type === 'exam' && !step.ref) errors.push(`Day${day} ${step.id} missing exam ref`);

      if (step.engagement === 'instruction') {
        instructionRun += Math.max(0, Number(step.minutes) || 0);
        if (instructionRun > 8) errors.push(`Day${day} continuous instruction > 8 min at ${step.id}`);
      } else {
        instructionRun = 0;
      }

      if (previousEngagement && step.engagement && step.engagement !== previousEngagement && step.engagement !== 'instruction') shifts += 1;
      if (step.engagement) previousEngagement = step.engagement;
      if (step.type === 'case-apply') hasCaseApply = true;
      if ((step.type === 'question' || step.type === 'question-group') && step.mode === '637_exit') has637Exit = true;
      if (elapsed >= finalTenStart && step.introducesCoreConcept === true) errors.push(`Day${day} introduces core concept in final 10 minutes at ${step.id}`);
      elapsed += Math.max(0, Number(step.minutes) || 0);
    }

    if (Number(day) <= 18 && !hasCaseApply) errors.push(`Day${day} missing case-apply`);
    if (Number(day) <= 18 && !has637Exit) errors.push(`Day${day} missing 637_exit`);
    if (Number(day) <= 18 && shifts < 2) errors.push(`Day${day} has fewer than two engagement shifts`);
    return { errors, warnings };
  }

  function stepReferences(step, ref) {
    return Boolean(ref) && (step.ref === ref || (Array.isArray(step.refs) && step.refs.includes(ref)));
  }

  function nextMappedCursor(seq, orderedRefs, startIndex) {
    const from = Math.max(0, Number(startIndex) || 0);
    for (let i = from; i < orderedRefs.length; i += 1) {
      const ref = orderedRefs[i];
      const found = seq.findIndex(step => step.optional !== true && stepReferences(step, ref));
      if (found >= 0) return found;
    }
    return -1;
  }

  function findCursorForLegacy(day, legacyState) {
    const plan = getDayPlan(day);
    if (!plan || !legacyState) return 0;
    const seq = Array.isArray(plan.sequence) ? plan.sequence : [];
    if (legacyState.finished === true) return seq.length;

    if (legacyState.phase === 'lesson' || legacyState.phase === 'opening') {
      const lessonIndex = Math.max(0, Number(legacyState.lessonIndex) || 0);
      const legacyOrder = Array.isArray(plan.legacy?.lessonOrder) ? plan.legacy.lessonOrder : [];
      if (legacyOrder.length) {
        const mapped = nextMappedCursor(seq, legacyOrder, lessonIndex);
        if (mapped >= 0) return mapped;
      }
      const lessons = seq.map((step, index) => ({ step, index })).filter(x => x.step.type === 'lesson' && x.step.optional !== true);
      const target = lessons[lessonIndex];
      return target ? target.index : (lessons.at(-1)?.index ?? 0);
    }

    const queue = Array.isArray(legacyState.queue) && legacyState.queue.length
      ? legacyState.queue
      : (Array.isArray(plan.legacy?.questionOrder) ? plan.legacy.questionOrder : []);
    const taskIndex = Math.max(0, Number(legacyState.taskIndex) || 0);
    if (queue.length) {
      const mapped = nextMappedCursor(seq, queue, taskIndex);
      if (mapped >= 0) return mapped;
    }
    const firstQuestion = seq.findIndex(step => step.optional !== true && ['question','question-group','case-apply','exam'].includes(step.type));
    return firstQuestion >= 0 ? firstQuestion : 0;
  }

  function collectDefinedDays() {
    return Object.keys(source().days || {}).map(Number).sort((a,b) => a-b);
  }

  NS.V16Director = {
    getDayPlan,
    getStep,
    estimateMinutes,
    validateDay,
    findCursorForLegacy,
    collectDefinedDays,
    allowedTypes: [...allowedTypes]
  };
})();
