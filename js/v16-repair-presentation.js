(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};

  function getRepairPresentation(skillId) {
    const id = String(skillId || '');
    if (['stereo.rs','stereo.cip','stereo.relationship','stereo.newman','stereo.chair','substitution.stereochemistry','elimination.antiperiplanar'].includes(id)) return '3d';
    if (id.startsWith('mechanism.')) return 'electron';
    if (['alkene.condition_discrimination','substitution.sn1','substitution.sn2','elimination.e1','elimination.e2','elimination.competition'].includes(id)) return 'decision-map';
    if (id.startsWith('structure.nmr_') || ['structure.dbe','structure.ir','structure.constraint_elimination'].includes(id)) return 'evidence-board';
    if (id.startsWith('synthesis.')) return 'route-board';
    return 'standard';
  }

  function get3DRef(skillId) {
    const id = String(skillId || '');
    if (id === 'substitution.stereochemistry') return 'sn2_backside';
    if (id === 'elimination.antiperiplanar') return 'e2_anti';
    if (id === 'stereo.relationship') return 'mirror_overlap';
    if (id === 'stereo.rs' || id === 'stereo.cip') return 'cip_rs_core';
    if (id === 'stereo.newman') return 'newman_rotation';
    return null;
  }

  NS.V16RepairPresentation = { getRepairPresentation, get3DRef };
})();
