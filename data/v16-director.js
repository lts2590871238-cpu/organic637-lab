(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};

  NS.V16_DIRECTOR_DATA = {
    version: '16.0.0-rebuild',
    days: {
      1: {
        day: 1,
        act: 1,
        title: '零号样品',
        targetMinutes: 55,
        legacy: {
          lessonOrder: [
            'd01-zero-01-language','d01-zero-02-groups','d01-zero-03-electrons','d01-zero-04-break-bond',
            'd01-zero-05-naming','d01-zero-06-hbr-movie','d01-zero-07-why-stable','d01-zero-08-wonder',
            'd01-lesson-structure','d01-lesson-addition','d01-lesson-hbr','d01-lesson-bromine','d01-lesson-halohydrin','d01-lesson-summary'
          ],
          questionOrder: [
            'pi-center-1','d01-pi-bond-01','d01-formula-01','d01-addition-accounting-01','hbr-1',
            'd01-carbocation-01','d01-hbr-butene-01','br2-1','d01-br2-vs-nbs-01','halohydrin-1',
            'd01-halohydrin-regio-01','condition-1'
          ]
        },
        sequence: [
          { id:'d01-cast-intro', type:'comic', sceneId:'case00-cast', minutes:6, engagement:'story' },
          { id:'d01-story-open', type:'comic', sceneId:'case01-open', minutes:2, engagement:'story' },
          { id:'d01-learn-language', type:'lesson', ref:'d01-zero-01-language', minutes:4, engagement:'instruction', caseBridge:'想弄清 L20-0 为什么会从原位消失、记录又为什么被改过，你得先会把结构式读成真正的连接关系。只有看懂分子，证据才不会只是几根线。', introducesCoreConcept:true, introduces:['structure.line_angle'], prerequisites:[] },
          { id:'d01-learn-groups', type:'lesson', ref:'d01-zero-02-groups', minutes:3, engagement:'instruction', introducesCoreConcept:true, introduces:['structure.functional_group'], prerequisites:['structure.line_angle'] },
          { id:'d01-evidence-mark', type:'interaction', ref:'v16-d01-evidence-mark', minutes:3, engagement:'interaction', prerequisites:['structure.line_angle','structure.functional_group'] },
          { id:'d01-learn-electrons', type:'lesson', ref:'d01-zero-03-electrons', minutes:4, engagement:'instruction', introducesCoreConcept:true, introduces:['electron.rich_poor'], prerequisites:['structure.line_angle'] },
          { id:'d01-electron-drag', type:'interaction', ref:'v16-d01-electron-drag', minutes:3, engagement:'interaction', prerequisites:['electron.rich_poor'] },
          { id:'d01-learn-addition', type:'lesson', ref:'d01-lesson-addition', minutes:4, engagement:'instruction', introducesCoreConcept:true, introduces:['alkene.addition'], prerequisites:['structure.line_angle','electron.rich_poor'] },
          { id:'d01-atom-accounting', type:'question', ref:'d01-addition-accounting-01', minutes:3, engagement:'practice', mode:'guided', prerequisites:['alkene.addition'] },
          { id:'d01-hbr-movie', type:'lesson', ref:'d01-zero-06-hbr-movie', minutes:5, engagement:'instruction', introducesCoreConcept:true, introduces:['alkene.hbr'], prerequisites:['alkene.addition','electron.rich_poor'] },
          { id:'d01-story-return', type:'comic', sceneId:'case01-return', minutes:2, engagement:'story' },
          { id:'d01-guided-pi', type:'question', ref:'pi-center-1', minutes:4, engagement:'practice', mode:'guided', prerequisites:['structure.line_angle'] },
          { id:'d01-case-apply', type:'case-apply', ref:'v16-d01-record-diff', minutes:4, engagement:'case', prerequisites:['alkene.addition','alkene.hbr'] },
          { id:'d01-637-exit', type:'question-group', refs:['hbr-1','d01-hbr-butene-01'], minutes:6, engagement:'exam', mode:'637_exit', prerequisites:['alkene.hbr'] },
          { id:'d01-story-cliff', type:'comic', sceneId:'case01-cliffhanger', minutes:2, engagement:'story' }
        ]
      },
      2: {
        day: 2,
        act: 1,
        title: '三个版本',
        targetMinutes: 49,
        legacy: {
          lessonOrder: ['d02-lesson-conditions','d02-lesson-branches','d02-lesson-retro'],
          questionOrder: ['d02-hbr-roor-01','d02-hydroboration-01','d02-hydrogenation-01','d02-ozonolysis-01','d02-kmno4-01','d02-nbs-01','d02-route-propanol-01','d02-retro-bromide-01','d02-condition-grid-01']
        },
        sequence: [
          { id:'d02-story-open', type:'comic', sceneId:'case02-open', minutes:2, engagement:'story' },
          { id:'d02-conditions', type:'lesson', ref:'d02-lesson-conditions', minutes:4, engagement:'instruction' },
          { id:'d02-hbr-check', type:'question', ref:'d02-hbr-roor-01', minutes:4, engagement:'practice', mode:'guided' },
          { id:'d02-branches', type:'lesson', ref:'d02-lesson-branches', minutes:5, engagement:'instruction' },
          { id:'d02-hydro-check', type:'question', ref:'d02-hydroboration-01', minutes:4, engagement:'practice' },
          { id:'d02-ozone-check', type:'question', ref:'d02-ozonolysis-01', minutes:4, engagement:'practice' },
          { id:'d02-story-return', type:'comic', sceneId:'case02-return', minutes:2, engagement:'story' },
          { id:'d02-case-apply', type:'case-apply', ref:'d02-route-propanol-01', minutes:6, engagement:'case' },
          { id:'d02-nbs-short', type:'question', ref:'d02-nbs-01', minutes:3, engagement:'practice' },
          { id:'d02-637-exit', type:'question-group', refs:['d02-hydrogenation-01','d02-condition-grid-01','d02-retro-bromide-01'], minutes:12, engagement:'exam', mode:'637_exit' },
          { id:'d02-story-cliff', type:'comic', sceneId:'case02-cliff', minutes:3, engagement:'story' }
        ]
      },
      3: {
        day: 3,
        act: 1,
        title: 'R-17',
        targetMinutes: 51,
        legacy: {
          lessonOrder: ['d03-lesson-acetylide','d03-lesson-selectivity','d03-lesson-diene'],
          questionOrder: ['d03-acidity-rank-01','d03-base-01','d03-alkylation-01','d03-hydration-01','d03-lindlar-01','d03-dissolving-metal-01','d03-conjugation-01','d03-diels-alder-01','d03-detective-terminal-01','d03-route-hexyne-01']
        },
        sequence: [
          { id:'d03-story-open', type:'comic', sceneId:'case03-open', minutes:2, engagement:'story' },
          { id:'d03-acetylide', type:'lesson', ref:'d03-lesson-acetylide', minutes:5, engagement:'instruction' },
          { id:'d03-acidity-check', type:'question', ref:'d03-acidity-rank-01', minutes:3, engagement:'practice', mode:'guided' },
          { id:'d03-base-check', type:'question', ref:'d03-base-01', minutes:3, engagement:'practice' },
          { id:'d03-cc-build', type:'question', ref:'d03-alkylation-01', minutes:4, engagement:'interaction' },
          { id:'d03-story-return', type:'comic', sceneId:'case03-return', minutes:2, engagement:'story' },
          { id:'d03-selectivity', type:'lesson', ref:'d03-lesson-selectivity', minutes:5, engagement:'instruction' },
          { id:'d03-lindlar', type:'question', ref:'d03-lindlar-01', minutes:4, engagement:'practice' },
          { id:'d03-metal', type:'question', ref:'d03-dissolving-metal-01', minutes:4, engagement:'practice' },
          { id:'d03-hydration-short', type:'question', ref:'d03-hydration-01', minutes:3, engagement:'practice' },
          { id:'d03-case-apply', type:'case-apply', ref:'d03-detective-terminal-01', minutes:5, engagement:'case' },
          { id:'d03-637-exit', type:'question-group', refs:['d03-route-hexyne-01','d03-alkylation-01'], minutes:8, engagement:'exam', mode:'637_exit' },
          { id:'d03-story-cliff', type:'comic', sceneId:'case03-cliff', minutes:3, engagement:'story' }
        ]
      },
      4: {
        day: 4,
        act: 1,
        title: '第二只烧瓶',
        targetMinutes: 54,
        legacy: {
          lessonOrder: ['d04-zero-01-roles','d04-zero-02-sn2-why-back','d04-zero-03-sn1-wait','d04-lesson-substrate','d04-lesson-mechanism','d04-lesson-arrows'],
          questionOrder: ['d04-substrate-01','d04-leaving-rank-01','d04-sn2-rank-01','d04-sn2-condition-01','d04-arrow-sn2-01','d04-stereo-sn2-01','d04-sn1-condition-01','d04-rearrangement-01','d04-competition-01']
        },
        sequence: [
          { id:'d04-story-open', type:'comic', sceneId:'case04-open', minutes:2, engagement:'story' },
          { id:'d04-roles', type:'lesson', ref:'d04-zero-01-roles', minutes:4, engagement:'instruction' },
          { id:'d04-substrate', type:'lesson', ref:'d04-lesson-substrate', minutes:4, engagement:'instruction' },
          { id:'d04-substrate-check', type:'question', ref:'d04-substrate-01', minutes:4, engagement:'practice', mode:'guided' },
          { id:'d04-sn2-mechanism', type:'lesson', ref:'d04-zero-02-sn2-why-back', minutes:5, engagement:'instruction' },
          { id:'d04-sn2-3d', type:'3d', ref:'sn2_backside', mode:'required', minutes:8, engagement:'3d' },
          { id:'d04-sn2-arrows', type:'question', ref:'d04-arrow-sn2-01', minutes:4, engagement:'interaction', mode:'guided' },
          { id:'d04-sn1', type:'lesson', ref:'d04-zero-03-sn1-wait', minutes:5, engagement:'instruction' },
          { id:'d04-sn1-check', type:'question', ref:'d04-sn1-condition-01', minutes:4, engagement:'practice' },
          { id:'d04-case-apply', type:'case-apply', ref:'d04-rearrangement-01', minutes:4, engagement:'case' },
          { id:'d04-637-exit', type:'question-group', refs:['d04-stereo-sn2-01','d04-competition-01'], minutes:8, engagement:'exam', mode:'637_exit' },
          { id:'d04-story-cliff', type:'comic', sceneId:'case04-cliff', minutes:2, engagement:'story' }
        ]
      },
      5: {
        day: 5,
        act: 2,
        title: '四条岔路',
        targetMinutes: 55,
        legacy: {
          lessonOrder: ['d05-zero-01-base-vs-nu','d05-zero-02-alpha-beta','d05-lesson-elimination','d05-lesson-e2','d05-lesson-anti','d05-lesson-zaitsev','d05-lesson-e1','d05-lesson-fourway'],
          questionOrder: ['d05-beta-h-01','d05-e2-cond-01','d05-zaitsev-rank-01','d05-bulky-base-01','d05-e1-01','d05-temp-01','d05-comp-primary-01','d05-comp-tert-01','d05-comp-secondary-01','d05-anti-01','d05-arrow-e2-01','d05-fourway-route-01']
        },
        sequence: [
          { id:'d05-story-open', type:'comic', sceneId:'case05-open', minutes:2, engagement:'story' },
          { id:'d05-base-vs-nu', type:'lesson', ref:'d05-zero-01-base-vs-nu', minutes:4, engagement:'instruction' },
          { id:'d05-alpha-beta', type:'lesson', ref:'d05-zero-02-alpha-beta', minutes:4, engagement:'instruction' },
          { id:'d05-beta-check', type:'question', ref:'d05-beta-h-01', minutes:4, engagement:'practice', mode:'guided' },
          { id:'d05-anti-lesson', type:'lesson', ref:'d05-lesson-anti', minutes:4, engagement:'instruction' },
          { id:'d05-e2-3d', type:'3d', ref:'e2_anti', mode:'required', minutes:8, engagement:'3d' },
          { id:'d05-e2-arrows', type:'question', ref:'d05-arrow-e2-01', minutes:4, engagement:'interaction', mode:'guided' },
          { id:'d05-fourway', type:'lesson', ref:'d05-lesson-fourway', minutes:5, engagement:'instruction' },
          { id:'d05-secondary', type:'question', ref:'d05-comp-secondary-01', minutes:4, engagement:'practice' },
          { id:'d05-case-apply', type:'case-apply', ref:'d05-fourway-route-01', minutes:6, engagement:'case' },
          { id:'d05-637-exit', type:'question-group', refs:['d05-e2-cond-01','d05-anti-01','d05-bulky-base-01'], minutes:8, engagement:'exam', mode:'637_exit' },
          { id:'d05-story-cliff', type:'comic', sceneId:'case05-cliff', minutes:2, engagement:'story' }
        ]
      },
      6: {
        day: 6,
        act: 2,
        title: '氧的痕迹',
        targetMinutes: 51,
        legacy: {
          lessonOrder: ['d06-lesson-oh','d06-lesson-oxidation','d06-lesson-dehydration','d06-lesson-williamson','d06-lesson-epoxide','d06-lesson-lucas'],
          questionOrder: ['d06-lucas-rank-01','d06-pcc-01','d06-jones-01','d06-secondary-oxid-01','d06-dehydration-01','d06-williamson-01','d06-ether-cleavage-01','d06-epoxide-base-01','d06-epoxide-acid-01','d06-grignard-epox-01','d06-oh-leaving-01','d06-route-ether-01']
        },
        sequence: [
          { id:'d06-story-open', type:'comic', sceneId:'case06-open', minutes:2, engagement:'story' },
          { id:'d06-oh', type:'lesson', ref:'d06-lesson-oh', minutes:4, engagement:'instruction' },
          { id:'d06-oh-check', type:'question', ref:'d06-oh-leaving-01', minutes:3, engagement:'practice', mode:'guided' },
          { id:'d06-oxidation', type:'lesson', ref:'d06-lesson-oxidation', minutes:5, engagement:'instruction' },
          { id:'d06-pcc-check', type:'question', ref:'d06-pcc-01', minutes:3, engagement:'practice' },
          { id:'d06-story-return', type:'comic', sceneId:'case06-return', minutes:2, engagement:'story' },
          { id:'d06-williamson', type:'lesson', ref:'d06-lesson-williamson', minutes:4, engagement:'instruction' },
          { id:'d06-williamson-check', type:'question', ref:'d06-williamson-01', minutes:4, engagement:'practice' },
          { id:'d06-epoxide', type:'lesson', ref:'d06-lesson-epoxide', minutes:5, engagement:'instruction' },
          { id:'d06-epoxide-check', type:'question', ref:'d06-epoxide-base-01', minutes:3, engagement:'practice' },
          { id:'d06-case-apply', type:'case-apply', ref:'d06-grignard-epox-01', minutes:5, engagement:'case' },
          { id:'d06-637-exit', type:'question-group', refs:['d06-dehydration-01','d06-route-ether-01'], minutes:8, engagement:'exam', mode:'637_exit' },
          { id:'d06-story-cliff', type:'comic', sceneId:'case06-cliff', minutes:3, engagement:'story' }
        ]
      },
      7: {
        day: 7,
        act: 2,
        title: '羰基上的指纹',
        targetMinutes: 51,
        legacy: {
          lessonOrder: ['d07-lesson-polarization','d07-lesson-addition','d07-lesson-reduction','d07-lesson-grignard','d07-lesson-derivatives','d07-lesson-protection-wittig'],
          questionOrder: ['d07-electrophile-01','d07-arrow-cn-01','d07-nabh4-01','d07-ketone-reduction-01','d07-carbonyl-react-rank-01','d07-grignard-formal-01','d07-grignard-aldehyde-01','d07-grignard-ketone-01','d07-grignard-water-01','d07-cyanohydrin-01','d07-oxime-01','d07-acetal-01','d07-wittig-01','d07-tollens-01']
        },
        sequence: [
          { id:'d07-story-open', type:'comic', sceneId:'case07-open', minutes:2, engagement:'story' },
          { id:'d07-polarization', type:'lesson', ref:'d07-lesson-polarization', minutes:4, engagement:'instruction' },
          { id:'d07-electrophile', type:'question', ref:'d07-electrophile-01', minutes:3, engagement:'practice', mode:'guided' },
          { id:'d07-addition', type:'lesson', ref:'d07-lesson-addition', minutes:5, engagement:'instruction' },
          { id:'d07-arrow', type:'question', ref:'d07-arrow-cn-01', minutes:3, engagement:'interaction' },
          { id:'d07-reduction', type:'lesson', ref:'d07-lesson-reduction', minutes:4, engagement:'instruction' },
          { id:'d07-reduction-check', type:'question', ref:'d07-nabh4-01', minutes:3, engagement:'practice' },
          { id:'d07-story-return', type:'comic', sceneId:'case07-return', minutes:2, engagement:'story' },
          { id:'d07-grignard', type:'lesson', ref:'d07-lesson-grignard', minutes:5, engagement:'instruction' },
          { id:'d07-grignard-check', type:'question', ref:'d07-grignard-formal-01', minutes:3, engagement:'practice' },
          { id:'d07-case-apply', type:'case-apply', ref:'d07-grignard-ketone-01', minutes:5, engagement:'case' },
          { id:'d07-637-exit', type:'question-group', refs:['d07-carbonyl-react-rank-01','d07-cyanohydrin-01','d07-tollens-01'], minutes:10, engagement:'exam', mode:'637_exit' },
          { id:'d07-story-cliff', type:'comic', sceneId:'case07-cliff', minutes:2, engagement:'story' }
        ]
      },
      8: {
        day: 8,
        act: 2,
        title: '被重新贴过的标签',
        targetMinutes: 50,
        legacy: {
          lessonOrder: ['d08-lesson-family','d08-lesson-ranking','d08-lesson-substitution','d08-lesson-ester','d08-lesson-reduction','d08-lesson-hofmann'],
          questionOrder: ['d08-reactivity-rank-01','d08-acyl-sub-01','d08-arrow-acyl-01','d08-esterification-01','d08-saponification-01','d08-lah-ester-01','d08-nabh4-ester-01','d08-hofmann-01','d08-amide-lowreact-01','d08-acidchloride-amide-01','d08-direction-01','d08-route-amide-01']
        },
        sequence: [
          { id:'d08-story-open', type:'comic', sceneId:'case08-open', minutes:2, engagement:'story' },
          { id:'d08-family', type:'lesson', ref:'d08-lesson-family', minutes:4, engagement:'instruction' },
          { id:'d08-ranking', type:'lesson', ref:'d08-lesson-ranking', minutes:4, engagement:'instruction' },
          { id:'d08-rank-check', type:'question', ref:'d08-reactivity-rank-01', minutes:3, engagement:'practice', mode:'guided' },
          { id:'d08-substitution', type:'lesson', ref:'d08-lesson-substitution', minutes:5, engagement:'instruction' },
          { id:'d08-arrow', type:'question', ref:'d08-arrow-acyl-01', minutes:3, engagement:'interaction' },
          { id:'d08-story-return', type:'comic', sceneId:'case08-return', minutes:2, engagement:'story' },
          { id:'d08-ester', type:'lesson', ref:'d08-lesson-ester', minutes:4, engagement:'instruction' },
          { id:'d08-ester-check', type:'question', ref:'d08-esterification-01', minutes:3, engagement:'practice' },
          { id:'d08-hydrolysis-check', type:'question', ref:'d08-saponification-01', minutes:3, engagement:'practice' },
          { id:'d08-case-apply', type:'case-apply', ref:'d08-acidchloride-amide-01', minutes:5, engagement:'case' },
          { id:'d08-637-exit', type:'question-group', refs:['d08-acyl-sub-01','d08-route-amide-01'], minutes:9, engagement:'exam', mode:'637_exit' },
          { id:'d08-story-cliff', type:'comic', sceneId:'case08-cliff', minutes:3, engagement:'story' }
        ]
      },
      9: {
        day: 9,
        act: 3,
        title: '多出来的一根C—C键',
        targetMinutes: 52,
        legacy: {
          lessonOrder: ['d09-lesson-alpha','d09-lesson-enolate','d09-lesson-aldol','d09-lesson-dehydration','d09-lesson-crossed'],
          questionOrder: ['d09-alpha-identify-01','d09-acidity-01','d09-enolate-resonance-01','d09-arrow-enolate-01','d09-aldol-product-01','d09-aldol-carbon-01','d09-condensation-01','d09-crossed-01','d09-donor-acceptor-01','d09-no-alpha-01','d09-acidity-rank-01','d09-route-aldol-01']
        },
        sequence: [
          { id:'d09-story-open', type:'comic', sceneId:'case09-open', minutes:2, engagement:'story' },
          { id:'d09-alpha', type:'lesson', ref:'d09-lesson-alpha', minutes:4, engagement:'instruction' },
          { id:'d09-alpha-check', type:'question', ref:'d09-alpha-identify-01', minutes:3, engagement:'practice', mode:'guided' },
          { id:'d09-enolate', type:'lesson', ref:'d09-lesson-enolate', minutes:5, engagement:'instruction' },
          { id:'d09-arrow', type:'question', ref:'d09-arrow-enolate-01', minutes:3, engagement:'interaction' },
          { id:'d09-aldol', type:'lesson', ref:'d09-lesson-aldol', minutes:5, engagement:'instruction' },
          { id:'d09-aldol-check', type:'question', ref:'d09-aldol-product-01', minutes:4, engagement:'practice' },
          { id:'d09-story-return', type:'comic', sceneId:'case09-return', minutes:2, engagement:'story' },
          { id:'d09-dehydration', type:'lesson', ref:'d09-lesson-dehydration', minutes:4, engagement:'instruction' },
          { id:'d09-condensation', type:'question', ref:'d09-condensation-01', minutes:3, engagement:'practice' },
          { id:'d09-case-apply', type:'case-apply', ref:'d09-donor-acceptor-01', minutes:5, engagement:'case' },
          { id:'d09-637-exit', type:'question-group', refs:['d09-route-aldol-01','d09-acidity-rank-01'], minutes:9, engagement:'exam', mode:'637_exit' },
          { id:'d09-story-cliff', type:'comic', sceneId:'case09-cliff', minutes:3, engagement:'story' }
        ]
      },
      10: {
        day: 10,
        act: 3,
        title: '旧路线',
        targetMinutes: 54,
        legacy: {
          lessonOrder: ['d10-lesson-map','d10-lesson-claisen','d10-lesson-michael','d10-lesson-beta-dicarbonyl','d10-lesson-acetoacetic','d10-lesson-malonic','d10-lesson-dieckmann'],
          questionOrder: ['d10-claisen-vs-aldol-01','d10-claisen-product-01','d10-base-match-01','d10-michael-site-01','d10-12-vs-14-01','d10-acidity-rank-01','d10-acetoacetic-01','d10-malonic-01','d10-sn2-limit-01','d10-decarb-01','d10-dieckmann-01','d10-route-malonic-01']
        },
        sequence: [
          { id:'d10-story-open', type:'comic', sceneId:'case10-open', minutes:2, engagement:'story' },
          { id:'d10-map', type:'lesson', ref:'d10-lesson-map', minutes:4, engagement:'instruction' },
          { id:'d10-map-check', type:'question', ref:'d10-claisen-vs-aldol-01', minutes:3, engagement:'practice', mode:'guided' },
          { id:'d10-claisen', type:'lesson', ref:'d10-lesson-claisen', minutes:5, engagement:'instruction' },
          { id:'d10-claisen-check', type:'question', ref:'d10-claisen-product-01', minutes:3, engagement:'practice' },
          { id:'d10-michael', type:'lesson', ref:'d10-lesson-michael', minutes:5, engagement:'instruction' },
          { id:'d10-michael-check', type:'question', ref:'d10-michael-site-01', minutes:3, engagement:'practice' },
          { id:'d10-story-return', type:'comic', sceneId:'case10-return', minutes:2, engagement:'story' },
          { id:'d10-beta', type:'lesson', ref:'d10-lesson-beta-dicarbonyl', minutes:4, engagement:'instruction' },
          { id:'d10-beta-check', type:'question', ref:'d10-acidity-rank-01', minutes:3, engagement:'practice' },
          { id:'d10-malonic', type:'lesson', ref:'d10-lesson-malonic', minutes:4, engagement:'instruction' },
          { id:'d10-case-apply', type:'case-apply', ref:'d10-acetoacetic-01', minutes:4, engagement:'case' },
          { id:'d10-637-exit', type:'question-group', refs:['d10-malonic-01','d10-decarb-01','d10-route-malonic-01'], minutes:9, engagement:'exam', mode:'637_exit' },
          { id:'d10-story-cliff', type:'comic', sceneId:'case10-cliff', minutes:3, engagement:'story' }
        ]
      },
      11: {
        day: 11,
        act: 3,
        title: '芳环上的路线指纹',
        targetMinutes: 53,
        legacy: {
          lessonOrder: ['d11-lesson-aromaticity','d11-lesson-why-substitution','d11-lesson-electrophiles','d11-lesson-directing','d11-lesson-halogen','d11-lesson-fc'],
          questionOrder: ['d11-benzene-arom-01','d11-cyclobutadiene-01','d11-eas-net-01','d11-nitration-01','d11-activation-rank-01','d11-direct-oh-01','d11-direct-no2-01','d11-halogen-01','d11-fc-alkyl-01','d11-fc-acyl-01','d11-fc-limit-01','d11-multi-direct-01','d11-route-ethylbenzene-01']
        },
        sequence: [
          { id:'d11-story-open', type:'comic', sceneId:'case11-open', minutes:2, engagement:'story' },
          { id:'d11-aromaticity', type:'lesson', ref:'d11-lesson-aromaticity', minutes:5, engagement:'instruction' },
          { id:'d11-aromatic-check', type:'question', ref:'d11-benzene-arom-01', minutes:3, engagement:'practice', mode:'guided' },
          { id:'d11-why-sub', type:'lesson', ref:'d11-lesson-why-substitution', minutes:4, engagement:'instruction' },
          { id:'d11-eas-check', type:'question', ref:'d11-eas-net-01', minutes:3, engagement:'practice' },
          { id:'d11-directing', type:'lesson', ref:'d11-lesson-directing', minutes:5, engagement:'instruction' },
          { id:'d11-direct-check', type:'question', ref:'d11-direct-no2-01', minutes:3, engagement:'practice' },
          { id:'d11-story-return', type:'comic', sceneId:'case11-return', minutes:2, engagement:'story' },
          { id:'d11-halogen', type:'lesson', ref:'d11-lesson-halogen', minutes:4, engagement:'instruction' },
          { id:'d11-halogen-check', type:'question', ref:'d11-halogen-01', minutes:3, engagement:'practice' },
          { id:'d11-case-apply', type:'case-apply', ref:'d11-multi-direct-01', minutes:5, engagement:'case' },
          { id:'d11-637-exit', type:'question-group', refs:['d11-activation-rank-01','d11-nitration-01','d11-route-ethylbenzene-01'], minutes:10, engagement:'exam', mode:'637_exit' },
          { id:'d11-story-cliff', type:'comic', sceneId:'case11-cliff', minutes:4, engagement:'story' }
        ]
      },
      12: {
        day: 12,
        act: 3,
        title: 'B3',
        targetMinutes: 54,
        legacy: {
          lessonOrder: ['d12-lesson-basicity','d12-lesson-nitro-amino','d12-lesson-diazo','d12-lesson-sandmeyer','d12-lesson-coupling','d12-lesson-nitrile'],
          questionOrder: ['d12-basicity-rank-01','d12-nitro-reduce-01','d12-protect-01','d12-diazo-cond-01','d12-sandmeyer-cl-01','d12-sandmeyer-cn-01','d12-diazo-oh-01','d12-coupling-01','d12-nitrile-plus1-01','d12-nitrile-hydro-01','d12-nitrile-reduce-01','d12-route-phenol-01','d12-route-acid-plus1-01']
        },
        sequence: [
          { id:'d12-story-open', type:'comic', sceneId:'case12-open', minutes:2, engagement:'story' },
          { id:'d12-basicity', type:'lesson', ref:'d12-lesson-basicity', minutes:3, engagement:'instruction' },
          { id:'d12-basicity-check', type:'question', ref:'d12-basicity-rank-01', minutes:3, engagement:'practice' },
          { id:'d12-nitro-amino', type:'lesson', ref:'d12-lesson-nitro-amino', minutes:4, engagement:'instruction' },
          { id:'d12-nitro-check', type:'question', ref:'d12-nitro-reduce-01', minutes:3, engagement:'practice' },
          { id:'d12-diazo', type:'lesson', ref:'d12-lesson-diazo', minutes:5, engagement:'instruction' },
          { id:'d12-diazo-check', type:'question', ref:'d12-diazo-cond-01', minutes:3, engagement:'practice' },
          { id:'d12-story-return', type:'comic', sceneId:'case12-return', minutes:2, engagement:'story' },
          { id:'d12-sandmeyer', type:'lesson', ref:'d12-lesson-sandmeyer', minutes:4, engagement:'instruction' },
          { id:'d12-cn-check', type:'question', ref:'d12-sandmeyer-cn-01', minutes:3, engagement:'practice' },
          { id:'d12-nitrile', type:'lesson', ref:'d12-lesson-nitrile', minutes:4, engagement:'instruction' },
          { id:'d12-case-apply', type:'case-apply', ref:'d12-nitrile-plus1-01', minutes:5, engagement:'case' },
          { id:'d12-637-exit', type:'question-group', refs:['d12-nitrile-hydro-01','d12-nitrile-reduce-01','d12-route-acid-plus1-01'], minutes:9, engagement:'exam', mode:'637_exit' },
          { id:'d12-story-cliff', type:'comic', sceneId:'case12-cliff', minutes:4, engagement:'story' }
        ]
      },
      13: {
        day: 13,
        act: 4,
        title: '无名样品 I',
        targetMinutes: 49,
        legacy: {
          lessonOrder: ['d13-zero-01-dbe-intuition','d13-zero-02-ir','d13-lesson-detective','d13-lesson-dbe','d13-lesson-ir','d13-lesson-tests','d13-lesson-candidate'],
          questionOrder: ['d13-dbe-c4h6-01','d13-dbe-oxygen-01','d13-dbe-benzene-01','d13-ir-carbonyl-01','d13-ir-oh-01','d13-ir-terminal-01','d13-test-aldehyde-01','d13-test-acid-01','d13-evidence-combine-01']
        },
        sequence: [
          { id:'d13-story-open', type:'comic', sceneId:'case13-x17-open', minutes:2, engagement:'story' },
          { id:'d13-dbe', type:'lesson', ref:'d13-zero-01-dbe-intuition', minutes:5, engagement:'instruction' },
          { id:'d13-dbe-check', type:'question', ref:'d13-dbe-c4h6-01', minutes:4, engagement:'practice', mode:'guided' },
          { id:'d13-ir', type:'lesson', ref:'d13-zero-02-ir', minutes:5, engagement:'instruction' },
          { id:'d13-ir-check', type:'question', ref:'d13-ir-carbonyl-01', minutes:4, engagement:'practice', mode:'guided' },
          { id:'d13-tests', type:'lesson', ref:'d13-lesson-tests', minutes:4, engagement:'instruction' },
          { id:'d13-x17-stage1', type:'detective', ref:'lab20-x17', caseId:'lab20-x17', pauseAfterStage:1, minutes:10, engagement:'case' },
          { id:'d13-case-apply', type:'case-apply', ref:'d13-evidence-combine-01', minutes:5, engagement:'case' },
          { id:'d13-637-exit', type:'question-group', refs:['d13-test-aldehyde-01','d13-test-acid-01'], minutes:8, engagement:'exam', mode:'637_exit' },
          { id:'d13-story-cliff', type:'comic', sceneId:'case13-x17-cliff', minutes:2, engagement:'story' }
        ]
      },
      14: {
        day: 14,
        act: 4,
        title: '无名样品 II',
        targetMinutes: 53,
        legacy: {
          lessonOrder: ['d14-zero-01-nmr-why','d14-zero-02-symmetry','d14-lesson-nmr-map','d14-lesson-shift','d14-lesson-integration','d14-lesson-splitting','d14-lesson-symmetry','d14-lesson-combine'],
          questionOrder: ['d14-shift-aldehyde-01','d14-shift-och2-01','d14-integration-01','d14-splitting-ethyl-01','d14-singlet-acetyl-01','d14-sym-acetone-01','d14-ethyl-acetate-clues-01','d14-nplus1-boundary-01']
        },
        sequence: [
          { id:'d14-story-open', type:'comic', sceneId:'case14-x17-open', minutes:2, engagement:'story' },
          { id:'d14-nmr', type:'lesson', ref:'d14-zero-01-nmr-why', minutes:5, engagement:'instruction' },
          { id:'d14-shift-check', type:'question', ref:'d14-shift-aldehyde-01', minutes:4, engagement:'practice', mode:'guided' },
          { id:'d14-symmetry', type:'lesson', ref:'d14-zero-02-symmetry', minutes:4, engagement:'instruction' },
          { id:'d14-sym-check', type:'question', ref:'d14-sym-acetone-01', minutes:4, engagement:'practice' },
          { id:'d14-splitting', type:'lesson', ref:'d14-lesson-splitting', minutes:5, engagement:'instruction' },
          { id:'d14-splitting-check', type:'question', ref:'d14-splitting-ethyl-01', minutes:4, engagement:'practice' },
          { id:'d14-x17-stage2', type:'detective', ref:'lab20-x17', caseId:'lab20-x17', resumeStage:2, minutes:12, engagement:'case' },
          { id:'d14-case-apply', type:'case-apply', ref:'d14-ethyl-acetate-clues-01', minutes:5, engagement:'case' },
          { id:'d14-637-exit', type:'question-group', refs:['d14-nplus1-boundary-01','d14-singlet-acetyl-01'], minutes:6, engagement:'exam', mode:'637_exit' },
          { id:'d14-story-lock', type:'comic', sceneId:'case14-x17-lock', minutes:2, engagement:'story' }
        ]
      },
      15: {
        day: 15,
        act: 4,
        title: '镜子里的答案',
        targetMinutes: 59,
        legacy: {
          lessonOrder: ['d15-lesson-chirality','d15-lesson-cip','d15-lesson-rs','d15-lesson-fischer','d15-lesson-relations','d15-lesson-ez','d15-lesson-conformation'],
          questionOrder: ['d15-chiral-center-01','d15-cip-01','d15-cip-carbon-01','d15-rs-rule-01','d15-fischer-rule-01','d15-fischer-rotate-01','d15-enantiomer-01','d15-diastereomer-01','d15-meso-01','d15-ez-01','d15-no-ez-01','d15-newman-rank-01','d15-chair-01','d15-sn2-stereo-review-01','v16-d15-l20-evidence']
        },
        sequence: [
          { id:'d15-story-open', type:'comic', sceneId:'case15-open', minutes:2, engagement:'story' },
          { id:'d15-tetrahedral-3d', type:'3d', ref:'tetrahedral_core', mode:'required', minutes:6, engagement:'3d' },
          { id:'d15-chiral-check', type:'question', ref:'d15-chiral-center-01', minutes:3, engagement:'practice', mode:'guided' },
          { id:'d15-mirror-3d', type:'3d', ref:'mirror_overlap', mode:'required', minutes:5, engagement:'3d' },
          { id:'d15-cip-lesson', type:'lesson', ref:'d15-lesson-cip', minutes:4, engagement:'instruction', introducesCoreConcept:true },
          { id:'d15-cip-rs-3d', type:'3d', ref:'cip_rs_core', mode:'required', minutes:7, engagement:'3d' },
          { id:'d15-rs-check', type:'question', ref:'d15-rs-rule-01', minutes:3, engagement:'practice' },
          { id:'d15-relations', type:'lesson', ref:'d15-lesson-relations', minutes:4, engagement:'instruction', introducesCoreConcept:true },
          { id:'d15-enantiomer-check', type:'question', ref:'d15-enantiomer-01', minutes:3, engagement:'practice' },
          { id:'d15-ez', type:'lesson', ref:'d15-lesson-ez', minutes:4, engagement:'instruction', introducesCoreConcept:true },
          { id:'d15-ez-check', type:'question', ref:'d15-ez-01', minutes:3, engagement:'practice' },
          { id:'d15-l20-compare', type:'3d', ref:'l20_stereo_compare', mode:'required', minutes:6, engagement:'case' },
          { id:'d15-story-proof', type:'comic', sceneId:'case15-proof', minutes:1, engagement:'story' },
          { id:'d15-case-apply', type:'case-apply', ref:'v16-d15-l20-evidence', minutes:3, engagement:'case' },
          { id:'d15-637-exit', type:'question-group', refs:['d15-diastereomer-01','d15-no-ez-01'], minutes:4, engagement:'exam', mode:'637_exit' },
          { id:'d15-story-close', type:'comic', sceneId:'case15-close', minutes:1, engagement:'story' }
        ]
      },
      16: {
        day: 16,
        act: 4,
        title: '完整鉴定',
        targetMinutes: 51,
        legacy: {
          lessonOrder: ['d16-lesson-eight-judges','d16-lesson-acidbase','d16-lesson-stability','d16-lesson-boiling','d16-lesson-arrow-blocks','d16-lesson-mixed'],
          questionOrder: ['d16-acid-rank-phenol-01','d16-base-rank-01','d16-carbocation-rank-01','d16-sn2-rank-01','d16-acyl-rank-01','d16-bp-rank-01','d16-factor-01','d16-factor-02','d16-factor-03','d16-arrow-proton-01','d16-arrow-acylcollapse-01','d16-mech-switch-01','d16-mech-switch-02','d16-mixed-01']
        },
        sequence: [
          { id:'d16-story-open', type:'comic', sceneId:'case16-open', minutes:2, engagement:'story' },
          { id:'d16-eight-judges', type:'lesson', ref:'d16-lesson-eight-judges', minutes:5, engagement:'instruction' },
          { id:'d16-factor-one', type:'question', ref:'d16-factor-01', minutes:3, engagement:'practice', mode:'guided' },
          { id:'d16-factor-two', type:'question', ref:'d16-factor-02', minutes:3, engagement:'practice' },
          { id:'d16-arrows', type:'lesson', ref:'d16-lesson-arrow-blocks', minutes:5, engagement:'instruction' },
          { id:'d16-arrow-check', type:'question', ref:'d16-arrow-proton-01', minutes:3, engagement:'interaction' },
          { id:'d16-switch', type:'question', ref:'d16-mech-switch-01', minutes:3, engagement:'practice' },
          { id:'d16-story-return', type:'comic', sceneId:'case16-return', minutes:2, engagement:'story' },
          { id:'d16-mixed', type:'lesson', ref:'d16-lesson-mixed', minutes:4, engagement:'instruction' },
          { id:'d16-case-apply', type:'case-apply', ref:'d16-mixed-01', minutes:5, engagement:'case' },
          { id:'d16-factor-three', type:'question', ref:'d16-factor-03', minutes:3, engagement:'practice' },
          { id:'d16-637-exit', type:'question-group', refs:['d16-acid-rank-phenol-01','d16-carbocation-rank-01','d16-acyl-rank-01'], minutes:10, engagement:'exam', mode:'637_exit' },
          { id:'d16-story-cliff', type:'comic', sceneId:'case16-cliff', minutes:3, engagement:'story' }
        ]
      },
      17: {
        day: 17,
        act: 5,
        title: '倒着走',
        targetMinutes: 53,
        legacy: {
          lessonOrder: ['d17-lesson-difference','d17-lesson-carbonledger','d17-lesson-laststep','d17-lesson-disconnection','d17-lesson-forwardcheck','d17-lesson-score'],
          questionOrder: ['d17-diff-01','d17-carbon-01','d17-laststep-alcohol-01','d17-laststep-acid-01','d17-disconnect-grig-01','d17-disconnect-acetylide-01','d17-forward-compat-01','d17-efficiency-01','d17-syn-propanol','d17-syn-hexyne','d17-syn-pentacid']
        },
        sequence: [
          { id:'d17-story-open', type:'comic', sceneId:'case17-open', minutes:2, engagement:'story' },
          { id:'d17-difference', type:'lesson', ref:'d17-lesson-difference', minutes:4, engagement:'instruction' },
          { id:'d17-difference-check', type:'question', ref:'d17-diff-01', minutes:3, engagement:'practice', mode:'guided' },
          { id:'d17-carbon-ledger', type:'lesson', ref:'d17-lesson-carbonledger', minutes:4, engagement:'instruction' },
          { id:'d17-carbon-check', type:'question', ref:'d17-carbon-01', minutes:3, engagement:'practice' },
          { id:'d17-last-step', type:'lesson', ref:'d17-lesson-laststep', minutes:4, engagement:'instruction' },
          { id:'d17-last-step-check', type:'question', ref:'d17-laststep-alcohol-01', minutes:3, engagement:'practice' },
          { id:'d17-disconnection', type:'lesson', ref:'d17-lesson-disconnection', minutes:4, engagement:'instruction' },
          { id:'d17-disconnection-check', type:'question', ref:'d17-disconnect-grig-01', minutes:3, engagement:'practice' },
          { id:'d17-lab20-route', type:'synthesis', ref:'lab20-hidden-route', caseId:'lab20-hidden-route', minutes:11, engagement:'case' },
          { id:'d17-case-apply', type:'case-apply', ref:'d17-forward-compat-01', minutes:4, engagement:'case' },
          { id:'d17-637-exit', type:'question-group', refs:['d17-efficiency-01','d17-disconnect-acetylide-01'], minutes:6, engagement:'exam', mode:'637_exit' },
          { id:'d17-story-cliff', type:'comic', sceneId:'case17-cliff', minutes:2, engagement:'story' }
        ]
      },
      18: {
        day: 18,
        act: 5,
        title: '22:14',
        targetMinutes: 55,
        legacy: {
          lessonOrder: ['d18-lesson-order','d18-lesson-protection','d18-lesson-aromatic-order','d18-lesson-redox-order','d18-lesson-alt','d18-lesson-mixed-case'],
          questionOrder: ['d18-order-fc-01','d18-protect-carbonyl-01','d18-protect-amine-01','d18-redox-select-01','d18-order-diazo-01','d18-order-acid-01','d18-alt-route-01','d18-carbon-check-01','d18-syn-meta-bromo','d18-syn-aniline-phenol','d18-syn-tertbutanol','v16-d18-evidence-synthesis']
        },
        sequence: [
          { id:'d18-story-open', type:'comic', sceneId:'case18-open', minutes:2, engagement:'story' },
          { id:'d18-protection', type:'lesson', ref:'d18-lesson-protection', minutes:6, engagement:'instruction' },
          { id:'d18-protect-carbonyl', type:'question', ref:'d18-protect-carbonyl-01', minutes:3, engagement:'practice', mode:'guided' },
          { id:'d18-protect-amine', type:'question', ref:'d18-protect-amine-01', minutes:3, engagement:'practice' },
          { id:'d18-order', type:'lesson', ref:'d18-lesson-order', minutes:4, engagement:'instruction' },
          { id:'d18-order-check', type:'question', ref:'d18-order-fc-01', minutes:3, engagement:'practice' },
          { id:'d18-redox', type:'lesson', ref:'d18-lesson-redox-order', minutes:4, engagement:'instruction' },
          { id:'d18-redox-check', type:'question', ref:'d18-redox-select-01', minutes:3, engagement:'practice' },
          { id:'d18-lab20-route-review', type:'synthesis', ref:'lab20-hidden-route', caseId:'lab20-hidden-route', reviewCompleted:true, minutes:10, engagement:'case' },
          { id:'d18-case-apply', type:'case-apply', ref:'v16-d18-evidence-synthesis', minutes:6, engagement:'case' },
          { id:'d18-637-exit', type:'question-group', refs:['d18-alt-route-01','d18-carbon-check-01'], minutes:8, engagement:'exam', mode:'637_exit' },
          { id:'d18-story-evidence', type:'comic', sceneId:'case18-evidence', minutes:2, engagement:'story' },
          { id:'d18-story-close', type:'comic', sceneId:'case18-close', minutes:1, engagement:'story' }
        ]
      },
      19: {
        day: 19,
        act: 5,
        title: '封闭卷宗',
        targetMinutes: 58,
        legacy: {
          lessonOrder: ['d19-lesson-exam'],
          questionOrder: []
        },
        sequence: [
          { id:'d19-core-audit', type:'exam', ref:'day19-core', minutes:58, engagement:'exam', mode:'core_audit' }
        ]
      },
      20: {
        day: 20,
        act: 5,
        title: '零号样品',
        targetMinutes: 54,
        legacy: {
          lessonOrder: [],
          questionOrder: []
        },
        sequence: [
          { id:'d20-story-open', type:'comic', sceneId:'case20-open', minutes:2, engagement:'story' },
          { id:'d20-case-report', type:'case-report', minutes:8, engagement:'case' },
          { id:'d20-story-truth', type:'comic', sceneId:'case20-truth', minutes:5, engagement:'story' },
          { id:'d20-adaptive-repair', type:'adaptive-repair', minutes:30, engagement:'repair' },
          { id:'d20-final-boss', type:'final-boss', minutes:7, engagement:'exam' },
          { id:'d20-story-close', type:'comic', sceneId:'case20-close', minutes:2, engagement:'story' }
        ]
      }
    }
  };

  const CASE_BRIDGES = {
    1: '想弄清 L20-0 为什么会从原位消失、记录又为什么被改过，你得先会把结构式读成真正的连接关系。只有看懂分子，证据才不会只是几根线。',
    2: '三份实验记录只差几个条件。要判断哪一处改动足以改变结果，先把“条件怎样改写反应出口”这件事看懂。',
    3: 'R-17 的两个标签只差一点，但小小的结构差异可能让整条路线分叉。先学会读炔键、酸性和选择性，才能判断拿错一瓶究竟会造成什么后果。',
    4: '顾遥说“许老师接手处理”，但第二只烧瓶里到底发生的是替代还是别的过程，不能靠猜。先学 SN1 / SN2，才能从底物和条件判断那一步是否说得通。',
    5: '同一个底物可能走四条路。要判断事故之后有没有人主动改变路线，必须先学会把 SN1、SN2、E1、E2 放进同一张判断地图。',
    6: '中间样品里出现了新的含氧线索。先掌握醇、醚和环氧化物怎样互相转换，才能判断这条痕迹是正常副产物还是人为补救留下的。',
    7: '系统里多出一个编号 X-17。它最明显的证据是一组羰基信号；先学羰基的电子结构和亲核加成，才有能力判断这个陌生样品可能从哪一步来。',
    8: '重新贴过的标签把事故线索指向了酰基衍生物。要判断这一步只是换标签，还是实际发生了取代，先把亲核酰基取代的共同骨架看清。',
    9: 'X-17 比事故原料多出了一段新的 C—C 连接。要解释这根键从哪里来，先学 enolate 与 Aldol；只有这样才能判断是否真的存在第二条路线。',
    10: '六个月前被否决的旧路线重新出现。它的核心就是怎样系统造 C—C 键；先把 Claisen、Michael 和 β-二羰基工具串起来，才能重建隐藏路线。',
    11: '备用路线在芳环上留下了位置“指纹”。想判断这个取代位置是否吻合旧路线，必须先理解芳香取代为什么有方向性。',
    12: 'B3 即将打开，而样品编号里出现了含氮转化线索。先掌握重氮盐和腈这些关键桥梁，才能判断路线是否可能在这里发生过改写。',
    13: 'X-17 终于摆到你面前。现在不允许猜结构；先从分子式、DBE、IR 和化学检验逐条排除，让证据自己缩小范围。',
    14: '昨天只能把 X-17 缩到一类结构，今天要用 1H NMR 锁定具体连接方式。信号数、积分、裂分和对称性将决定它真正的身份。',
    15: 'L20-F 的普通谱图几乎和零号样品一样，但“连接关系一样”不等于“就是同一个分子”。先学三维手性、CIP 和 R/S，才能读懂真正翻案的证据。',
    16: '目前每条证据都只说明一部分事实。今天要把结构、谱图、立体和反应行为合在一起，判断究竟哪个因素真正主导结论。',
    17: '隐藏路线已经露出轮廓，但要证明它完整可行，必须倒着从 L20-F 走回起点。先学逆合成、碳数账本和断键，再重建那晚真正发生的路线。',
    18: '路线已经重建，最后的问题是：它在真实实验顺序里是否兼容？先检查保护、氧化还原和先后顺序，才能把 22:14 的记录修改与化学事实严丝合缝地对上。'
  };
  for (const [dayText, bridge] of Object.entries(CASE_BRIDGES)) {
    const day = Number(dayText);
    const firstLesson = NS.V16_DIRECTOR_DATA.days?.[day]?.sequence?.find(step => step.type === 'lesson');
    if (firstLesson && !firstLesson.caseBridge) firstLesson.caseBridge = bridge;
  }
})();
