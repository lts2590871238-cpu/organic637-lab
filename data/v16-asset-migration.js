(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};
  const days = {};

  function day(day, groups) {
    const assets = {};
    Object.entries(groups).forEach(([status, ids]) => {
      (ids || []).forEach(id => { assets[id] = { status }; });
    });
    days[day] = { day, assets };
  }

  day(2, {
    KEEP_MAIN: ['d02-lesson-conditions','d02-lesson-branches','d02-lesson-retro','d02-hbr-roor-01','d02-hydroboration-01','d02-hydrogenation-01','d02-ozonolysis-01','d02-route-propanol-01','d02-retro-bromide-01','d02-condition-grid-01'],
    SHORTEN: ['d02-nbs-01'],
    OPTIONAL_CASE_FILE: ['d02-kmno4-01']
  });
  day(3, {
    KEEP_MAIN: ['d03-lesson-acetylide','d03-lesson-selectivity','d03-acidity-rank-01','d03-base-01','d03-alkylation-01','d03-lindlar-01','d03-dissolving-metal-01','d03-detective-terminal-01','d03-route-hexyne-01'],
    SHORTEN: ['d03-hydration-01'],
    OPTIONAL_CASE_FILE: ['d03-lesson-diene','d03-conjugation-01','d03-diels-alder-01']
  });
  day(6, {
    KEEP_MAIN: ['d06-lesson-oh','d06-lesson-oxidation','d06-lesson-williamson','d06-lesson-epoxide','d06-pcc-01','d06-jones-01','d06-secondary-oxid-01','d06-williamson-01','d06-epoxide-base-01','d06-epoxide-acid-01','d06-grignard-epox-01','d06-oh-leaving-01','d06-route-ether-01'],
    SHORTEN: ['d06-lesson-dehydration','d06-dehydration-01'],
    OPTIONAL_CASE_FILE: ['d06-lesson-lucas','d06-lucas-rank-01'],
    REPAIR_ONLY: ['d06-ether-cleavage-01']
  });
  day(7, {
    KEEP_MAIN: ['d07-lesson-polarization','d07-lesson-addition','d07-lesson-reduction','d07-lesson-grignard','d07-electrophile-01','d07-arrow-cn-01','d07-nabh4-01','d07-ketone-reduction-01','d07-carbonyl-react-rank-01','d07-grignard-formal-01','d07-grignard-aldehyde-01','d07-grignard-ketone-01','d07-grignard-water-01'],
    SHORTEN: ['d07-lesson-derivatives','d07-cyanohydrin-01','d07-tollens-01'],
    MOVE_LATER: ['d07-acetal-01'],
    OPTIONAL_CASE_FILE: ['d07-lesson-protection-wittig','d07-wittig-01'],
    REMOVE_FROM_20D: ['d07-oxime-01']
  });
  day(8, {
    KEEP_MAIN: ['d08-lesson-family','d08-lesson-ranking','d08-lesson-substitution','d08-lesson-ester','d08-reactivity-rank-01','d08-acyl-sub-01','d08-arrow-acyl-01','d08-esterification-01','d08-saponification-01','d08-amide-lowreact-01','d08-acidchloride-amide-01','d08-direction-01','d08-route-amide-01'],
    SHORTEN: ['d08-lesson-reduction','d08-lah-ester-01','d08-nabh4-ester-01'],
    MOVE_LATER: ['d08-lesson-hofmann','d08-hofmann-01']
  });
  day(9, {
    KEEP_MAIN: ['d09-lesson-alpha','d09-lesson-enolate','d09-lesson-aldol','d09-lesson-dehydration','d09-alpha-identify-01','d09-acidity-01','d09-enolate-resonance-01','d09-arrow-enolate-01','d09-aldol-product-01','d09-aldol-carbon-01','d09-condensation-01','d09-donor-acceptor-01','d09-no-alpha-01','d09-acidity-rank-01','d09-route-aldol-01'],
    SHORTEN: ['d09-lesson-crossed','d09-crossed-01']
  });
  day(10, {
    KEEP_MAIN: ['d10-lesson-map','d10-lesson-claisen','d10-lesson-michael','d10-lesson-beta-dicarbonyl','d10-lesson-acetoacetic','d10-lesson-malonic','d10-claisen-vs-aldol-01','d10-claisen-product-01','d10-base-match-01','d10-michael-site-01','d10-12-vs-14-01','d10-acidity-rank-01','d10-acetoacetic-01','d10-malonic-01','d10-sn2-limit-01','d10-decarb-01','d10-route-malonic-01'],
    OPTIONAL_CASE_FILE: ['d10-lesson-dieckmann','d10-dieckmann-01']
  });
  day(11, {
    KEEP_MAIN: ['d11-lesson-aromaticity','d11-lesson-why-substitution','d11-lesson-directing','d11-lesson-halogen','d11-benzene-arom-01','d11-cyclobutadiene-01','d11-eas-net-01','d11-nitration-01','d11-activation-rank-01','d11-direct-oh-01','d11-direct-no2-01','d11-halogen-01','d11-multi-direct-01','d11-route-ethylbenzene-01'],
    SHORTEN: ['d11-lesson-electrophiles','d11-lesson-fc','d11-fc-alkyl-01','d11-fc-acyl-01','d11-fc-limit-01']
  });
  day(12, {
    KEEP_MAIN: ['d12-lesson-nitro-amino','d12-lesson-diazo','d12-lesson-sandmeyer','d12-lesson-nitrile','d12-nitro-reduce-01','d12-diazo-cond-01','d12-sandmeyer-cl-01','d12-sandmeyer-cn-01','d12-diazo-oh-01','d12-nitrile-plus1-01','d12-nitrile-hydro-01','d12-nitrile-reduce-01','d12-route-phenol-01','d12-route-acid-plus1-01'],
    SHORTEN: ['d12-lesson-basicity','d12-basicity-rank-01'],
    MOVE_LATER: ['d12-protect-01'],
    OPTIONAL_CASE_FILE: ['d12-lesson-coupling','d12-coupling-01']
  });
  day(16, {
    KEEP_MAIN: ['d16-lesson-eight-judges','d16-lesson-arrow-blocks','d16-lesson-mixed','d16-factor-01','d16-factor-02','d16-factor-03','d16-arrow-proton-01','d16-arrow-acylcollapse-01','d16-mech-switch-01','d16-mech-switch-02','d16-mixed-01'],
    SHORTEN: ['d16-lesson-acidbase','d16-lesson-stability','d16-lesson-boiling','d16-acid-rank-phenol-01','d16-base-rank-01','d16-carbocation-rank-01','d16-sn2-rank-01','d16-acyl-rank-01','d16-bp-rank-01']
  });

  NS.V16_ASSET_MIGRATION = {
    version: '16.0.0-test',
    statuses: ['KEEP_MAIN','SHORTEN','MOVE_LATER','OPTIONAL_CASE_FILE','REPAIR_ONLY','REMOVE_FROM_20D'],
    days
  };
})();
