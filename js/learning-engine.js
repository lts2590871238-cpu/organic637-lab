(() => {
  'use strict';

  const NS = window.Organic637 = window.Organic637 || {};
  const DAY_MS = 86400000;
  const clamp = (n, min = 0, max = 100) => Math.max(min, Math.min(max, Number(n) || 0));
  const pad = n => String(n).padStart(2, '0');
  const dateISO = value => {
    const d = value instanceof Date ? value : value ? new Date(value) : new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  const addDays = (iso, count) => {
    const d = new Date(`${iso}T12:00:00`);
    d.setDate(d.getDate() + count);
    return dateISO(d);
  };
  const dayDistance = (from, to) => {
    if (!from || !to) return 0;
    return Math.round((new Date(`${to}T12:00:00`) - new Date(`${from}T12:00:00`)) / DAY_MS);
  };
  const uid = prefix => `${prefix || 'id'}-${crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`}`;

  function blankSkill(id) {
    return {
      id,
      mastery: 0,
      effectiveMastery: 0,
      attempts: 0,
      correctAttempts: 0,
      firstAttemptAttempts: 0,
      firstAttemptCorrect: 0,
      independentCorrect: 0,
      hintedCorrect: 0,
      reviewAttempts: 0,
      reviewCorrect: 0,
      transferAttempts: 0,
      transferCorrect: 0,
      lastSeenAt: null,
      lastIndependentCorrectAt: null,
      lastReviewAt: null,
      nextReviewAt: null,
      intervalDays: 1,
      stabilityLevel: 0,
      crossDayVerified: false,
      recentEvidence: []
    };
  }

  function normalizeSkill(id, old) {
    const out = Object.assign(blankSkill(id), old || {});
    out.id = id;
    out.mastery = clamp(out.mastery);
    out.effectiveMastery = clamp(out.effectiveMastery || out.mastery);
    out.attempts = Number(out.attempts) || 0;
    out.correctAttempts = Number(out.correctAttempts ?? out.correct) || 0;
    out.firstAttemptAttempts = Number(out.firstAttemptAttempts) || 0;
    out.firstAttemptCorrect = Number(out.firstAttemptCorrect) || 0;
    out.independentCorrect = Number(out.independentCorrect) || 0;
    out.hintedCorrect = Number(out.hintedCorrect) || 0;
    out.reviewAttempts = Number(out.reviewAttempts) || 0;
    out.reviewCorrect = Number(out.reviewCorrect) || 0;
    out.transferAttempts = Number(out.transferAttempts) || 0;
    out.transferCorrect = Number(out.transferCorrect) || 0;
    out.lastSeenAt = out.lastSeenAt || out.lastSeen || null;
    out.nextReviewAt = out.nextReviewAt || out.nextReview || null;
    out.intervalDays = Math.max(1, Number(out.intervalDays) || 1);
    out.stabilityLevel = Math.max(0, Number(out.stabilityLevel) || 0);
    out.crossDayVerified = Boolean(out.crossDayVerified);
    out.recentEvidence = Array.isArray(out.recentEvidence) ? out.recentEvidence.slice(-12) : [];
    delete out.correct;
    delete out.lastSeen;
    delete out.nextReview;
    return out;
  }

  function blankDay(day, registry) {
    const data = registry && registry[day];
    return {
      day,
      phase: 'opening',
      lessonIndex: 0,
      taskIndex: 0,
      queue: data ? data.questions.map(q => q.id) : [],
      reviewQueue: [],
      reviewIndex: 0,
      answered: {},
      repairQueue: [],
      repairUsed: {},
      finished: false,
      startedAt: null,
      completedAt: null,
      examDraft: null
    };
  }

  function freshState(registry) {
    const today = dateISO();
    return {
      schemaVersion: 2,
      version: 2,
      currentDay: 1,
      created: today,
      updatedAt: Date.now(),
      completedDays: [],
      days: { 1: blankDay(1, registry) },
      skills: {},
      attempts: [],
      reviewHistory: [],
      examResults: {},
      aiCache: {},
      day20Plan: null,
      settings: { reducedMotion: false }
    };
  }

  function oldAttemptToV2(row, index) {
    const at = Number(row.timestamp ?? row.at) || Date.now();
    const primary = row.primarySkill || row.skill || 'unknown';
    return Object.assign({}, row, {
      attemptId: row.attemptId || row.id || `legacy-${at}-${index}`,
      day: Math.max(1, Number(row.day) || 1),
      questionId: String(row.questionId || 'legacy-question'),
      primarySkill: primary,
      skillIds: Array.isArray(row.skillIds) && row.skillIds.length ? row.skillIds : [primary],
      questionType: row.questionType || row.type || 'choice',
      mode: row.mode || (row.repair ? 'repair' : 'learn'),
      correct: Boolean(row.correct),
      firstAttempt: row.firstAttempt !== false,
      attemptNumber: Math.max(1, Number(row.attemptNumber) || 1),
      hintsUsed: Math.max(0, Number(row.hintsUsed ?? row.hints) || 0),
      confidence: ['sure', 'unsure', 'guess'].includes(row.confidence) ? row.confidence : 'unsure',
      responseTimeMs: Math.max(0, Number(row.responseTimeMs) || 0),
      isRepair: Boolean(row.isRepair ?? row.repair),
      isReview: Boolean(row.isReview),
      isTransfer: Boolean(row.isTransfer),
      timestamp: at,
      date: row.date || dateISO(at),
      answerPayload: row.answerPayload ?? null,
      partialScore: row.partialScore == null ? (row.correct ? 1 : 0) : clamp(row.partialScore, 0, 1),
      errorType: row.errorType || (row.correct ? null : 'unknown'),
      reasoningState: row.reasoningState || null
    });
  }

  function migrateState(input, registry) {
    const source = input && typeof input === 'object' ? input : freshState(registry);
    const out = Object.assign(freshState(registry), source);
    out.schemaVersion = 2;
    out.version = 2;
    out.currentDay = clamp(Math.round(out.currentDay || 1), 1, 20);
    out.completedDays = [...new Set((Array.isArray(out.completedDays) ? out.completedDays : []).map(Number).filter(n => n >= 1 && n <= 20))].sort((a, b) => a - b);
    out.days = out.days && typeof out.days === 'object' ? Object.assign({}, out.days) : {};

    if (source.day1 && !(source.days && source.days[1])) {
      out.days[1] = Object.assign(blankDay(1, registry), {
        phase: source.day1.phase || 'lesson',
        lessonIndex: Math.max(0, Number(source.day1.lessonIndex) || 0),
        taskIndex: Math.max(0, Number(source.day1.questionIndex) || 0),
        queue: Array.isArray(source.day1.queue) ? source.day1.queue.slice() : [],
        answered: source.day1.answered || {},
        repairUsed: source.day1.repairUsed || {},
        finished: Boolean(source.day1.finished)
      });
    }

    Object.keys(out.days).forEach(key => {
      const day = Number(key);
      const current = out.days[key] || {};
      const normalized = Object.assign(blankDay(day, registry), current);
      normalized.day = day;
      normalized.lessonIndex = Math.max(0, Number(normalized.lessonIndex) || 0);
      normalized.taskIndex = Math.max(0, Number(normalized.taskIndex ?? normalized.questionIndex) || 0);
      normalized.reviewIndex = Math.max(0, Number(normalized.reviewIndex) || 0);
      normalized.queue = Array.isArray(normalized.queue) && normalized.queue.length ? normalized.queue.slice() : (registry && registry[day] ? registry[day].questions.map(q => q.id) : []);
      normalized.reviewQueue = Array.isArray(normalized.reviewQueue) ? normalized.reviewQueue.slice() : [];
      normalized.repairQueue = Array.isArray(normalized.repairQueue) ? normalized.repairQueue.slice() : [];
      normalized.answered = normalized.answered && typeof normalized.answered === 'object' ? normalized.answered : {};
      normalized.repairUsed = normalized.repairUsed && typeof normalized.repairUsed === 'object' ? normalized.repairUsed : {};
      normalized.finished = Boolean(normalized.finished);
      delete normalized.questionIndex;
      out.days[day] = normalized;
    });

    if (!out.days[1]) out.days[1] = blankDay(1, registry);
    out.skills = out.skills && typeof out.skills === 'object' ? out.skills : {};
    Object.keys(out.skills).forEach(id => { out.skills[id] = normalizeSkill(id, out.skills[id]); });
    out.attempts = (Array.isArray(out.attempts) ? out.attempts : []).map(oldAttemptToV2).slice(-1200);
    out.reviewHistory = Array.isArray(out.reviewHistory) ? out.reviewHistory.slice(-500) : [];
    out.examResults = out.examResults && typeof out.examResults === 'object' ? out.examResults : {};
    out.aiCache = out.aiCache && typeof out.aiCache === 'object' ? out.aiCache : {};
    out.settings = Object.assign({ reducedMotion: false }, out.settings || {});
    delete out.day1;
    return out;
  }

  function ensureDayState(state, day, registry) {
    state.days = state.days || {};
    if (!state.days[day]) state.days[day] = blankDay(day, registry);
    return state.days[day];
  }

  function ensureSkill(state, id) {
    state.skills = state.skills || {};
    state.skills[id] = normalizeSkill(id, state.skills[id]);
    return state.skills[id];
  }

  function evidenceQuality(attempt) {
    if (!attempt.correct) return attempt.confidence === 'sure' ? 2 : attempt.confidence === 'guess' ? 20 : 10;
    if (attempt.hintsUsed >= 2) return 38;
    if (attempt.hintsUsed === 1) return 55;
    if (attempt.confidence === 'guess') return 63;
    if (attempt.confidence === 'unsure') return 78;
    return 96;
  }

  function evidenceWeight(attempt) {
    let weight = attempt.firstAttempt ? 1.25 : 0.65;
    if (attempt.isRepair) weight *= 0.75;
    if (attempt.isReview) weight *= 1.1;
    if (attempt.isTransfer) weight *= 1.25;
    if (attempt.hintsUsed) weight *= 0.82;
    return weight;
  }

  function updateSkillState(state, attempt) {
    const skill = ensureSkill(state, attempt.primarySkill);
    const previousIndependentDate = skill.lastIndependentCorrectAt ? dateISO(skill.lastIndependentCorrectAt) : null;
    const independent = attempt.correct && attempt.hintsUsed === 0 && attempt.firstAttempt;
    const crossDay = independent && previousIndependentDate && previousIndependentDate !== attempt.date;

    skill.attempts += 1;
    if (attempt.correct) skill.correctAttempts += 1;
    if (attempt.firstAttempt) {
      skill.firstAttemptAttempts += 1;
      if (attempt.correct) skill.firstAttemptCorrect += 1;
    }
    if (independent) skill.independentCorrect += 1;
    if (attempt.correct && attempt.hintsUsed > 0) skill.hintedCorrect += 1;
    if (attempt.isReview) {
      skill.reviewAttempts += 1;
      if (attempt.correct) skill.reviewCorrect += 1;
      skill.lastReviewAt = attempt.timestamp;
    }
    if (attempt.isTransfer) {
      skill.transferAttempts += 1;
      if (attempt.correct) skill.transferCorrect += 1;
    }
    skill.lastSeenAt = attempt.timestamp;
    if (independent) skill.lastIndependentCorrectAt = attempt.timestamp;
    if (crossDay) skill.crossDayVerified = true;

    const evidence = {
      attemptId: attempt.attemptId,
      date: attempt.date,
      quality: evidenceQuality(attempt),
      weight: evidenceWeight(attempt),
      correct: attempt.correct,
      independent,
      crossDay: Boolean(crossDay),
      transfer: attempt.isTransfer,
      review: attempt.isReview
    };
    skill.recentEvidence.push(evidence);
    skill.recentEvidence = skill.recentEvidence.slice(-12);

    let weighted = clamp(skill.mastery) * 1.6;
    let totalWeight = 1.6;
    skill.recentEvidence.forEach((row, index, rows) => {
      const recency = 0.72 + 0.28 * ((index + 1) / rows.length);
      const w = row.weight * recency;
      weighted += row.quality * w;
      totalWeight += w;
    });
    skill.mastery = Math.round(clamp(weighted / totalWeight));

    if (!attempt.correct) {
      skill.stabilityLevel = Math.max(0, skill.stabilityLevel - (attempt.confidence === 'sure' ? 2 : 1));
      skill.intervalDays = 1;
    } else if (attempt.hintsUsed > 0) {
      skill.intervalDays = Math.min(2, Math.max(1, skill.intervalDays));
    } else if (crossDay) {
      skill.stabilityLevel = Math.min(5, skill.stabilityLevel + 1);
      skill.intervalDays = [1, 2, 4, 7, 10, 14][skill.stabilityLevel];
    } else {
      skill.intervalDays = Math.max(1, Math.min(2, skill.intervalDays));
    }
    skill.nextReviewAt = addDays(attempt.date, skill.intervalDays);
    skill.effectiveMastery = getEffectiveMastery(skill, attempt.date);
    return skill;
  }

  function getEffectiveMastery(skill, today = dateISO()) {
    if (!skill) return 0;
    const raw = clamp(skill.mastery);
    if (!skill.nextReviewAt) return Math.round(raw);
    const overdue = dayDistance(skill.nextReviewAt, today);
    if (overdue <= 0) return Math.round(raw);
    const penalty = Math.min(18, 2 + overdue * (skill.stabilityLevel >= 3 ? 1 : 1.7));
    return Math.round(clamp(raw - penalty));
  }

  function masteryBand(skill, effective) {
    const value = effective == null ? getEffectiveMastery(skill) : effective;
    if (!skill || skill.attempts === 0) return '未开始';
    if (value < 30) return '刚见过';
    if (value < 50) return '正在成形';
    if (value < 70) return '基本会';
    if (!skill.crossDayVerified) return '基本会 · 待跨日验证';
    if (value < 85) return '较稳定';
    return '稳定';
  }

  function createAttempt(question, context) {
    const now = Number(context.timestamp) || Date.now();
    const primarySkill = question.primarySkill || question.skill;
    const correct = Boolean(context.correct);
    const partial = context.partialScore == null ? (correct ? 1 : 0) : clamp(context.partialScore, 0, 1);
    return {
      attemptId: uid('attempt'),
      day: Number(question.day || context.day) || 1,
      questionId: question.id,
      primarySkill,
      skillIds: Array.isArray(question.skillIds) && question.skillIds.length ? question.skillIds.slice() : [primarySkill],
      questionType: question.type || 'choice',
      mode: context.mode || question.role || 'learn',
      correct,
      firstAttempt: context.firstAttempt !== false,
      attemptNumber: Math.max(1, Number(context.attemptNumber) || 1),
      hintsUsed: Math.max(0, Number(context.hintsUsed) || 0),
      confidence: ['sure', 'unsure', 'guess'].includes(context.confidence) ? context.confidence : 'unsure',
      responseTimeMs: Math.max(0, Number(context.responseTimeMs) || 0),
      isRepair: Boolean(context.isRepair || question.role === 'repair'),
      isReview: Boolean(context.isReview || context.mode === 'review'),
      isTransfer: Boolean(context.isTransfer || question.role === 'transfer'),
      timestamp: now,
      date: context.date || dateISO(now),
      answerPayload: context.answerPayload ?? null,
      partialScore: partial,
      errorType: correct ? (context.errorType || null) : (context.errorType || 'unknown'),
      reasoningState: context.reasoningState || null
    };
  }

  function recordAttempt(state, question, context) {
    const attempt = createAttempt(question, context);
    state.attempts = Array.isArray(state.attempts) ? state.attempts : [];
    state.attempts.push(attempt);
    state.attempts = state.attempts.slice(-1200);
    updateSkillState(state, attempt);
    return attempt;
  }

  function questionIndex(registry) {
    const map = new Map();
    Object.values(registry || {}).forEach(day => {
      (day.questions || []).forEach(q => map.set(q.id, q));
      Object.values(day.repairs || {}).flat().forEach(q => map.set(q.id, q));
      Object.values(day.adaptivePools || {}).flat().forEach(q => map.set(q.id, q));
    });
    return map;
  }

  function buildReviewQueue(state, registry, skillRegistry, today = dateISO(), limit = 5) {
    const skillsById = new Map((skillRegistry || []).map(s => [s.id, s]));
    const candidates = Object.values(state.skills || {}).map(skill => {
      const effective = getEffectiveMastery(skill, today);
      const overdueDays = skill.nextReviewAt ? Math.max(0, dayDistance(skill.nextReviewAt, today)) : 0;
      const recentWrong = (state.attempts || []).slice(-80).reverse().find(a => a.primarySkill === skill.id && !a.correct);
      const importance = Number(skillsById.get(skill.id)?.importance) || 1;
      const due = Boolean(skill.nextReviewAt && skill.nextReviewAt <= today);
      const priority = (due ? 80 : 0) + overdueDays * 8 + (100 - effective) * .45 + (recentWrong ? 16 : 0) + (!skill.crossDayVerified ? 10 : 0) + importance * 4;
      return { skill, due, effective, priority };
    }).filter(x => x.due).sort((a, b) => b.priority - a.priority);

    const all = Object.values(registry || {}).flatMap(day => day.questions || []);
    const recentIds = new Set((state.attempts || []).slice(-12).map(a => a.questionId));
    const selected = [];
    candidates.some(row => {
      const match = all.find(q => !recentIds.has(q.id) && q.day <= state.currentDay && (q.primarySkill === row.skill.id || (q.skillIds || []).includes(row.skill.id)) && q.role !== 'learn') ||
        all.find(q => q.day <= state.currentDay && (q.primarySkill === row.skill.id || (q.skillIds || []).includes(row.skill.id)));
      if (match && !selected.some(x => x.questionId === match.id)) selected.push({ questionId: match.id, skillId: row.skill.id, priority: row.priority });
      return selected.length >= Math.max(3, Math.min(5, limit));
    });
    return selected;
  }

  function todayMistakes(state, today = dateISO()) {
    return (state.attempts || []).filter(a => a.date === today && !a.correct && !a.isRepair);
  }

  function topWeakSkills(state, today = dateISO(), count = 3) {
    const highConfidenceWrong = new Set((state.attempts || []).filter(a => !a.correct && a.confidence === 'sure').slice(-40).map(a => a.primarySkill));
    return Object.values(state.skills || {}).map(skill => {
      const effective = getEffectiveMastery(skill, today);
      const risk = (100 - effective) + (!skill.crossDayVerified ? 14 : 0) + (highConfidenceWrong.has(skill.id) ? 24 : 0) + (skill.transferAttempts === 0 ? 6 : 0);
      return { id: skill.id, effective, risk, skill };
    }).sort((a, b) => b.risk - a.risk).slice(0, count);
  }

  function estimateScore(state, skillRegistry, today = dateISO()) {
    const weights = { reaction: .28, condition: .11, ranking: .12, mechanism: .14, structure: .16, synthesis: .14, stereo: .05 };
    const buckets = {};
    (skillRegistry || []).forEach(meta => {
      const domain = meta.domain || 'reaction';
      const skill = state.skills?.[meta.id];
      const value = skill ? getEffectiveMastery(skill, today) : 0;
      (buckets[domain] ||= []).push(value);
    });
    let normalized = 0;
    Object.entries(weights).forEach(([domain, weight]) => {
      const values = buckets[domain] || [];
      const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      normalized += avg * weight;
    });
    const center = normalized * 1.5;
    return {
      low: Math.max(0, Math.round((center - 7) / 3) * 3),
      high: Math.min(150, Math.round((center + 7) / 3) * 3),
      target: 120,
      label: '训练估计，不等于正式考试成绩'
    };
  }

  function buildDay20Plan(state, day20, today = dateISO()) {
    const fallback = day20.fallbackSkills || ['reaction.condition', 'structure.constraint_elimination', 'synthesis.last_step'];
    const weak = topWeakSkills(state, today, 3).map(x => x.id);
    const chosen = [...new Set([...weak, ...fallback])].slice(0, 3);
    const pools = day20.adaptivePools || {};
    const tasks = [];
    chosen.forEach(skillId => {
      const exact = pools[skillId] || [];
      const family = exact.length ? exact : Object.entries(pools).find(([key]) => skillId.startsWith(key.split('.')[0]))?.[1] || [];
      tasks.push(...family.slice(0, 3));
    });
    const boss = (day20.questions || []).filter(q => q.role === 'boss');
    return { createdAt: Date.now(), skills: chosen, questionIds: [...new Set([...tasks.map(q => q.id), ...boss.map(q => q.id)])] };
  }

  NS.Learning = {
    dateISO,
    addDays,
    freshState,
    migrateState,
    ensureDayState,
    ensureSkill,
    evidenceQuality,
    updateSkillState,
    getEffectiveMastery,
    masteryBand,
    recordAttempt,
    questionIndex,
    buildReviewQueue,
    todayMistakes,
    topWeakSkills,
    estimateScore,
    buildDay20Plan
  };
})();
