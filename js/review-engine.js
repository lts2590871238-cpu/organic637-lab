(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};

  function prepareOpeningReview(state, day, registry, skills) {
    const progress = NS.Learning.ensureDayState(state, day, registry);
    if (!progress.reviewQueue.length) {
      progress.reviewQueue = NS.Learning.buildReviewQueue(state, registry, skills).map(row => row.questionId);
      progress.reviewIndex = 0;
    }
    return progress.reviewQueue;
  }

  function dueCount(state, today = NS.Learning.dateISO()) {
    return Object.values(state.skills || {}).filter(skill => skill.nextReviewAt && skill.nextReviewAt <= today).length;
  }

  function todayMistakeGroups(state, skillMeta, today = NS.Learning.dateISO()) {
    const labels = new Map((skillMeta || []).map(x => [x.id, x.label]));
    const grouped = new Map();
    NS.Learning.todayMistakes(state, today).forEach(attempt => {
      const key = attempt.errorType || 'unknown';
      const row = grouped.get(key) || {
        errorType: key,
        skillId: attempt.primarySkill,
        skillLabel: labels.get(attempt.primarySkill) || attempt.primarySkill,
        count: 0,
        questionIds: [],
        highConfidence: false
      };
      row.count += 1;
      row.questionIds.push(attempt.questionId);
      row.highConfidence ||= attempt.confidence === 'sure';
      grouped.set(key, row);
    });
    return [...grouped.values()].sort((a, b) => Number(b.highConfidence) - Number(a.highConfidence) || b.count - a.count);
  }

  function errorMessage(group) {
    const messages = {
      condition_missed: '条件没有读完整，先比较试剂里真正改变产物方向的部分。',
      regio_error: '区域选择还没稳，先标出两个反应位点再判断。',
      stereo_error: '立体结果需要把进攻方向和优先级变化分开处理。',
      mechanism_source_error: '电子从哪里出发还没找准，先找孤对电子或 π 键。',
      mechanism_target_error: '箭头终点还没找准，终点应是缺电子的位置或将要形成的键。',
      ranking_factor_error: '排序的关键判据选错了，先比较最先产生差异的因素。',
      wrong_functional_group: '官能团变化识别偏了，先只看起点和终点差了什么。',
      wrong_disconnection: '断键位置还不够合理，优先找可由可靠反应形成的关键键。',
      compatibility_error: '单步反应可能成立，但与路线里的其他官能团不兼容。',
      evidence_ignored: '有一条硬证据没有参与排除候选。',
      dbe_error: '不饱和度计算需要重新核对环和 π 键总数。',
      nmr_fragment_error: 'NMR 的积分、裂分或对称性碎片还没连起来。',
      high_confidence_wrong: '这是一次高置信错误，优先用新结构修复。',
      guess_correct: '这次猜对了，但还需要一次无提示迁移来确认。',
      unknown: '这一步还没稳，系统会用同技能的新结构再确认一次。'
    };
    return messages[group.errorType] || messages.unknown;
  }

  NS.Review = { prepareOpeningReview, dueCount, todayMistakeGroups, errorMessage };
})();
