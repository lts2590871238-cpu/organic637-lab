(() => {
  'use strict';
  const NS = window.Organic637 = window.Organic637 || {};
  const Data = window.Organic637Data = window.Organic637Data || {};
  const bank = Data.days?.[19]?.questions || [];

  const coreItems = [
    { id: 'd19-rxn-03', coverage: ['reaction'], minutes: 4 },
    { id: 'd19-rxn-05', coverage: ['reaction', 'synthesis'], minutes: 4 },
    { id: 'd19-mech-01', coverage: ['mechanism'], minutes: 6 },
    { id: 'd19-mech-02', coverage: ['mechanism', 'stereo'], minutes: 7 },
    { id: 'd19-struct-01', coverage: ['structure', 'spectroscopy'], minutes: 5 },
    { id: 'd19-struct-03', coverage: ['structure', 'spectroscopy'], minutes: 6 },
    { id: 'd19-rxn-10', coverage: ['stereo'], minutes: 4 },
    { id: 'd19-syn-01', coverage: ['synthesis', 'reaction'], minutes: 8 },
    { id: 'd19-syn-02', coverage: ['synthesis'], minutes: 8 },
    { id: 'd19-mix-01', coverage: ['reaction', 'mechanism', 'stereo'], minutes: 5 }
  ];

  NS.V16_EXAM = {
    version: '16.0.0-test',
    day19Core: {
      id: 'day19-core',
      title: '封闭卷宗 · 综合能力审核',
      description: '无提示、无即时解析、无故事与3D。只保留高诊断价值的综合题，为 Day20 生成真实弱项。',
      itemIds: coreItems.map(item => item.id),
      items: coreItems,
      scoreMode: 'percent',
      ui: {
        hints: false,
        immediateExplanation: false,
        story: false,
        threeD: false
      }
    },
    full150: {
      id: 'full150',
      title: '考前正式模拟 · 150分完整卷',
      itemIds: bank.map(question => question.id),
      points: bank.reduce((sum, question) => sum + Number(question.points || 0), 0),
      scoreMode: 'score150',
      ui: {
        hints: false,
        immediateExplanation: false,
        story: false,
        threeD: false
      }
    }
  };
})();
