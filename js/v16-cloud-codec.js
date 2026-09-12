(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};

  const unwrap = value => value && typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, 'data') ? value.data : value;

  function chunks(state) {
    const core = { ...(state || {}) };
    delete core.skills;
    delete core.attempts;
    const out = { core, skills: state?.skills || {} };
    const attempts = Array.isArray(state?.attempts) ? state.attempts : [];
    for (let i = 0; i < attempts.length; i += 100) out[`attempts:${Math.floor(i / 100)}`] = attempts.slice(i, i + 100);
    return out;
  }

  function fromChunks(input, freshFactory) {
    const source = input && typeof input === 'object' ? input : {};
    const core = unwrap(source.core);
    const fallback = typeof freshFactory === 'function' ? freshFactory() : {};
    const state = core && typeof core === 'object' && !Array.isArray(core) ? { ...core } : fallback;
    const skills = unwrap(source.skills);
    state.skills = skills && typeof skills === 'object' && !Array.isArray(skills) ? skills : (state.skills || {});
    state.attempts = [];
    Object.keys(source)
      .filter(key => /^attempts:\d+$/.test(key))
      .sort((a, b) => Number(a.split(':')[1]) - Number(b.split(':')[1]))
      .forEach(key => {
        const rows = unwrap(source[key]);
        if (Array.isArray(rows)) state.attempts.push(...rows);
      });
    return state;
  }

  NS.V16CloudCodec = { chunks, fromChunks };
})();
