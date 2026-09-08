(function () {
  'use strict';
  const Data = window.Organic637Data = window.Organic637Data || {};
  const days = Data.days || {};

  function appendUnique(list, rows) {
    const ids = new Set((list || []).map(x => x.id));
    rows.forEach(row => { if (!ids.has(row.id)) list.push(row); });
  }

  if (days[2]) {
    appendUnique(days[2].lessons, [{
      id: 'd02-lesson-radical-chain',
      eyebrow: 'Day 2 · 为什么偏偏是 HBr/ROOR',
      title: '过氧化物不是“反向按钮”，它是在改走自由基链反应',
      body: 'ROOR 受热或光照可产生自由基，随后形成 Br· 并开启链反应。Br· 先加到双键较少取代端，使新自由基落在更稳定的较多取代碳，再从 HBr 夺 H。这个经典“过氧化物效应”主要适用于 HBr，不能机械推广到 HCl、HI。',
      note: '这一天要形成习惯：看到 ROOR，先问机理世界是否从离子型切换成自由基型。',
      formulas: ['ROOR → 2 RO·', 'CH₃CH=CH₂ + HBr/ROOR → CH₃CH₂CH₂Br', 'HBr：可形成有效自由基链；HCl/HI：不要套同一结论']
    }]);
    appendUnique(days[2].questions, [
      {
        id: 'd02-peroxide-specificity-01', day: 2, type: 'choice', role: 'contrast',
        primarySkill: 'alkene.hbr_peroxide', skillIds: ['alkene.hbr_peroxide', 'alkene.condition_discrimination'], difficulty: 2,
        prompt: '考试里看到“HX/ROOR”时，经典反 Markovnikov 过氧化物效应主要可靠地对应哪一种 HX？',
        formula: '烯烃 + HBr/ROOR → 反 Markovnikov 溴代物', examTags: ['自由基', '条件边界'],
        hints: ['不要把“ROOR”理解成对所有 HX 都自动反向。'],
        explanationLayers: {
          short: '主要是 HBr。',
          why: 'HBr 的自由基链传播步骤在能量上合适；HCl、HI 不能简单照搬。',
          full: '经典 Kharasch 过氧化物效应是 HBr 的重点规律。做题时若看见 HCl/ROOR 或 HI/ROOR，不应直接写反 Markovnikov 产物。'
        },
        options: [{ id: 'a', label: 'HBr' }, { id: 'b', label: 'HCl' }, { id: 'c', label: 'HI' }, { id: 'd', label: '三者完全一样' }], answer: 'a'
      },
      {
        id: 'd02-hydroboration-syn-01', day: 2, type: 'choice', role: 'practice',
        primarySkill: 'alkene.hydroboration_oxidation', skillIds: ['alkene.hydroboration_oxidation', 'stereo.ez'], difficulty: 2,
        prompt: '关于烯烃氢硼化-氧化，哪一句最适合作为基础记忆？',
        formula: '1) BH₃·THF  2) H₂O₂/OH⁻  →  反 Markovnikov 醇；H/OH 净同面', examTags: ['区域', '立体'],
        hints: ['先分区域，再分立体。'],
        explanationLayers: {
          short: 'OH 到较少取代碳，H/OH 净结果为 syn。',
          why: '氢硼化协同同面加入，氧化时 B 被 OH 保留构型替换。',
          full: '因此该反应同时给出反 Markovnikov 区域选择和 syn 加成的立体特征。第一轮做题先把区域结论抓牢，立体要求以后再深化。'
        },
        options: [{ id: 'a', label: 'OH 到较少取代碳，净 syn' }, { id: 'b', label: 'OH 到较多取代碳，净 anti' }, { id: 'c', label: '只发生裂解' }], answer: 'a'
      },
      {
        id: 'd02-oxidation-compare-01', day: 2, type: 'multi-choice', role: 'contrast',
        primarySkill: 'alkene.condition_discrimination', skillIds: ['alkene.ozonolysis', 'alkene.oxidative_cleavage', 'alkene.condition_discrimination'], difficulty: 3,
        prompt: '以丙烯 CH₃CH=CH₂ 为底物，下列哪些“条件 → 产物”判断正确？',
        formula: 'CH₃CH=CH₂  ─裂解→  两个原双键碳分别成为羰基/更高氧化态', examTags: ['氧化裂解', '条件对比'],
        hints: ['还原性臭氧后处理会保留醛；热浓 KMnO₄ 会继续强氧化。'],
        explanationLayers: {
          short: 'O₃/Zn,H₂O 给 CH₃CHO + HCHO；热浓 KMnO₄ 最终给 CH₃CO₂H + CO₂。',
          why: '两者都切双键，但后处理氧化程度不同。',
          full: '丙烯内侧双键碳带 H，臭氧还原后处理给乙醛；末端 CH₂ 给甲醛。强氧化时乙醛对应端继续到乙酸，末端碳最终可到 CO₂。'
        },
        options: [
          { id: 'a', label: 'O₃；Zn/H₂O → CH₃CHO + HCHO' },
          { id: 'b', label: '热浓 KMnO₄，酸化 → CH₃CO₂H + CO₂' },
          { id: 'c', label: 'O₃；Zn/H₂O → CH₃CO₂H + CO₂' }
        ], answer: ['a', 'b']
      }
    ]);
  }

  if (days[3]) {
    appendUnique(days[3].lessons, [{
      id: 'd03-lesson-terminal-test',
      eyebrow: 'Day 3 · 端炔和内炔要分开',
      title: '先找“≡C–H”，很多性质就跟着分流',
      body: '端炔写成 RC≡CH，末端碳还连着 H；内炔写成 RC≡CR′，没有这个端氢。端炔可被足够强的碱去质子化，也可与氨性 AgNO₃/Cu⁺ 类试剂形成沉淀；内炔没有这条性质。',
      note: '先确认是否端炔，再讨论“酸性、炔负离子、增碳、化学检验”。',
      formulas: ['端炔：RC≡CH', '内炔：RC≡CR′', 'RC≡CH + NaNH₂ → RC≡C⁻Na⁺ + NH₃']
    }]);
    appendUnique(days[3].questions, [
      {
        id: 'd03-terminal-test-01', day: 3, type: 'choice', role: 'practice',
        primarySkill: 'alkyne.identification', skillIds: ['alkyne.identification', 'structure.chemical_tests'], difficulty: 1,
        prompt: '1-丁炔与 2-丁炔相比，哪一个能利用“端炔氢”这条性质与氨性 AgNO₃ 形成沉淀？',
        formula: 'HC≡CCH₂CH₃  vs  CH₃C≡CCH₃', examTags: ['端炔', '化学检验'],
        hints: ['只找 ≡C–H。'],
        explanationLayers: { short: '1-丁炔。', why: '它有端炔氢，2-丁炔没有。', full: '端炔可形成金属炔化物沉淀。这条证据以后会进入结构推断题。' },
        options: [{ id: 'a', label: '1-丁炔 HC≡CCH₂CH₃' }, { id: 'b', label: '2-丁炔 CH₃C≡CCH₃' }], answer: 'a'
      },
      {
        id: 'd03-hydroboration-terminal-01', day: 3, type: 'structure-choice', role: 'contrast',
        primarySkill: 'alkyne.hydroboration_oxidation', skillIds: ['alkyne.hydroboration_oxidation', 'alkyne.mercuric_hydration'], difficulty: 2,
        prompt: '1-丁炔用体积较大的硼烷后再 H₂O₂/OH⁻ 氧化，最终稳定产物是哪一个？',
        formula: 'HC≡CCH₂CH₃  →  烯醇  →  CH₃CH₂CH₂CHO', examTags: ['端炔水合', '条件对比'],
        hints: ['端炔氢硼化-氧化给反 Markovnikov 水合结果。', '末端烯醇互变后得到醛。'],
        explanationLayers: { short: '丁醛。', why: '端炔反 Markovnikov 水合后的烯醇互变为醛。', full: '它与 Hg²⁺/H₂SO₄/H₂O 给甲基酮形成鲜明对比：同一端炔，条件决定醛还是酮。' },
        options: [{ id: 'a', label: '丁醛', formula: 'CH₃CH₂CH₂CHO' }, { id: 'b', label: '2-丁酮', formula: 'CH₃COCH₂CH₃' }, { id: 'c', label: '1-丁醇', formula: 'CH₃CH₂CH₂CH₂OH' }], answer: 'a'
      },
      {
        id: 'd03-reduction-grid-01', day: 3, type: 'multi-choice', role: 'transfer',
        primarySkill: 'alkyne.partial_reduction_cis', skillIds: ['alkyne.partial_reduction_cis', 'alkyne.partial_reduction_trans'], difficulty: 2,
        prompt: '对内炔 2-丁炔，下列哪些“条件 → 主要产物类型”配对正确？',
        formula: 'CH₃C≡CCH₃  →  (Z)-烯烃 / (E)-烯烃 / 烷烃', examTags: ['还原', '条件分流'],
        hints: ['Lindlar 停在 cis；Na/NH₃ 停在 trans；普通 H₂/Pd 往往走到底。'],
        explanationLayers: { short: '三项都正确。', why: '三组条件控制还原深度和立体结果。', full: 'Lindlar：顺式烯烃；Na/NH₃(l)：反式烯烃；过量 H₂/Pd：烷烃。把它们放成条件表最不容易混。' },
        options: [{ id: 'a', label: 'H₂/Lindlar → 顺-2-丁烯' }, { id: 'b', label: 'Na/NH₃(l) → 反-2-丁烯' }, { id: 'c', label: '过量 H₂/Pd → 丁烷' }], answer: ['a', 'b', 'c']
      }
    ]);
  }

  if (days[4]) {
    appendUnique(days[4].lessons, [{
      id: 'd04-lesson-rate-solvent',
      eyebrow: 'Day 4 · 不只看底物，还要看速率式和溶剂',
      title: 'SN2 和 SN1 的“谁参与慢步骤”不一样',
      body: 'SN2 的过渡态里底物和亲核体同时参与，所以速率与两者浓度都有关；SN1 的慢步骤是底物先电离，速率主要只看底物。极性非质子溶剂常帮助阴离子亲核体做 SN2；极性质子溶剂能稳定离子，更适合 SN1 电离环境。',
      note: '遇到条件题，按“底物 → 亲核/碱 → 溶剂 → 温度”逐项读，而不是只靠一个关键词。',
      formulas: ['SN2：v = k[RX][Nu⁻]', 'SN1：v = k[RX]', 'SN2 常见：一级底物 + 强亲核体 + DMSO/DMF/丙酮']
    }]);
    appendUnique(days[4].questions, [
      {
        id: 'd04-rate-law-01', day: 4, type: 'choice', role: 'practice',
        primarySkill: 'substitution.sn2', skillIds: ['substitution.sn2', 'substitution.sn1'], difficulty: 2,
        prompt: '某取代反应测得速率式 v = k[RX][CN⁻]。这一动力学特征更支持哪种机理？',
        formula: 'v = k[RX][Nu⁻]', examTags: ['速率式', 'SN2'],
        hints: ['慢步骤里同时出现底物和亲核体。'],
        explanationLayers: { short: '更支持 SN2。', why: '速率同时依赖 RX 和 CN⁻。', full: 'SN2 是双分子决速过程；SN1 的电离慢步骤不直接包含外部亲核体。' },
        options: [{ id: 'a', label: 'SN2' }, { id: 'b', label: 'SN1' }], answer: 'a'
      },
      {
        id: 'd04-solvent-01', day: 4, type: 'choice', role: 'contrast',
        primarySkill: 'substitution.sn2', skillIds: ['substitution.sn2', 'substitution.competition'], difficulty: 2,
        prompt: '同为一级溴代烃与 CN⁻ 反应，哪种溶剂更常用于强化 SN2 亲核性？',
        formula: 'R–Br + CN⁻  ─DMSO→  R–CN + Br⁻', examTags: ['溶剂', 'SN2'],
        hints: ['阴离子亲核体不希望被氢键强烈包裹。'],
        explanationLayers: { short: 'DMSO。', why: '极性非质子溶剂能溶解离子，又不强烈氢键溶剂化 CN⁻。', full: '水/乙醇会更强地溶剂化阴离子，常降低其 SN2 亲核活性；SN1 则更受益于稳定离子的极性质子环境。' },
        options: [{ id: 'a', label: 'DMSO' }, { id: 'b', label: '水' }, { id: 'c', label: '乙醇' }], answer: 'a'
      },
      {
        id: 'd04-rs-caveat-01', day: 4, type: 'choice', role: 'transfer',
        primarySkill: 'substitution.stereochemistry', skillIds: ['substitution.stereochemistry', 'stereo.cip'], difficulty: 3,
        prompt: '关于手性中心的 SN2，哪一句最严谨？',
        formula: 'Nu⁻ 背面进攻 → 反应中心几何反转；R/S 需重新按 CIP 排序', examTags: ['SN2', 'R/S'],
        hints: ['“几何反转”和“字母一定 R↔S”不是完全同一句话。'],
        explanationLayers: { short: 'SN2 必有几何反转，但 R/S 标签应根据产物重新排 CIP。', why: '取代后基团优先级可能变化。', full: '如果优先级关系不变，反转常对应 R↔S；但更严谨的做法始终是对产物重新排序，而不是机械替换字母。' },
        options: [{ id: 'a', label: '几何反转确定，R/S 需重新判定' }, { id: 'b', label: '任何 SN2 都必定 R 变 S、S 变 R，无需重新排序' }, { id: 'c', label: 'SN2 不影响空间构型' }], answer: 'a'
      }
    ]);
  }
})();
