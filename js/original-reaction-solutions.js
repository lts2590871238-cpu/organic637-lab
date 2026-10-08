(() => {
'use strict';
const N=window.Organic637=window.Organic637||{},C=N.OriginalChem;if(!C)return;
Object.assign(C.graphTemplates,{"NaBH₄还原底物":[[[-105,10,""],[-65,-12,""],[-25,10,""],[15,-12,""],[55,10,""],[95,-12,""],[135,10,"O"]],[[0,1,1],[1,2,2],[2,3,1],[3,4,1],[4,5,1],[5,6,2]]],"NaBH₄还原产物":[[[-105,10,""],[-65,-12,""],[-25,10,""],[15,-12,""],[55,10,""],[95,-12,""],[135,10,"OH"]],[[0,1,1],[1,2,2],[2,3,1],[3,4,1],[4,5,1],[5,6,1]]],"分子内FC底物":[[[0,-34,""],[30,-17,""],[30,17,""],[0,34,""],[-30,17,""],[-30,-17,""],[62,-34,""],[94,-17,""],[126,-34,""],[158,-17,""],[190,-34,"Cl"]],[[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],[0,6,1],[6,7,1],[7,8,1],[8,9,1],[9,10,1]]],"2-甲基吡啶":[[[0,-36,"N"],[31,-18,""],[31,18,""],[0,36,""],[-31,18,""],[-31,-18,""],[62,-36,""]],[[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],[1,6,1]]],"2-苯乙烯基吡啶":[[[-110,-36,"N"],[-79,-18,""],[-79,18,""],[-110,36,""],[-141,18,""],[-141,-18,""],[-45,-34,""],[-11,-18,""],[23,-34,""],[56,-18,""],[56,18,""],[23,36,""],[-11,18,""],[-11,-18,""]],[[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],[1,6,1],[6,7,2],[7,8,1],[8,9,2],[9,10,1],[10,11,2],[11,12,1],[12,13,2],[13,8,1]]],"吡啶-2-甲醛":[[[0,-36,"N"],[31,-18,""],[31,18,""],[0,36,""],[-31,18,""],[-31,-18,""],[64,-36,""],[94,-18,"O"]],[[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],[1,6,1],[6,7,2]]]});
Object.assign(C.graphTemplates,{"环戊酮":[[[0,0,""],[33,-20,""],[50,10,""],[18,37,""],[-18,23,""],[0,-38,"O"]],[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,0,1],[0,5,2]]],"苯乙酮烯醇盐":[[[0,0,""],[0,-38,"O⁻"],[37,18,""],[-36,18,""],[-70,-3,""],[-103,17,""],[-103,53,""],[-70,72,""],[-36,53,""]],[[0,1,1],[0,2,2],[0,3,1],[3,4,2],[4,5,1],[5,6,2],[6,7,1],[7,8,2],[8,3,1]]],"交叉羟醛加成目标":[[[72,3,""],[99,-25,""],[133,-12,""],[133,24,""],[98,43,""],[66,-36,"OH"],[35,-20,""],[-3,-2,""],[-3,-40,"O"],[-38,-22,""],[-72,-42,""],[-106,-22,""],[-106,16,""],[-72,35,""],[-38,16,""]],[[0,1,1],[1,2,1],[2,3,1],[3,4,1],[4,0,1],[0,5,1],[0,6,1],[6,7,1],[7,8,2],[7,9,1],[9,10,2],[10,11,1],[11,12,2],[12,13,1],[13,14,2],[14,9,1]]]});
const oldFigure=C.figuresFor,oldAnswer=C.answerFor,oldReason=C.reasoningFor,oldArrow=C.electronSvg;
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const captions={
 'orig-2020-ii-10-nabh4':{before:['NaBH₄还原底物'],after:['NaBH₄还原产物']},
 'orig-2020-ii-5-intramolecular-fc':{before:['分子内FC底物'],after:['四氢萘']},
 'orig-2020-iv-1-picoline-structure':{before:[],after:['2-甲基吡啶','2-苯乙烯基吡啶','吡啶-2-甲醛']},
 'orig-2020-vii-2-aldol-synthesis':{before:['苯乙酮','环戊酮'],after:['交叉羟醛加成目标']}
};
function graphGallery(names,lead){
 if(!names.length)return '<div class="paper-chem-intro"><b>'+esc(lead)+'</b><p>本题原卷要求从线索推断结构，提交前不展示目标结构。</p></div>';
 return '<div class="paper-chem-intro"><b>'+esc(lead)+'</b><div class="original-molecule-grid">'+names.map((name,i)=>
 '<figure class="original-chem-reaction-figure"><figcaption>'+esc(lead==='三步结构推断的正确结构'?'ABC'[i]+' · '+name:name)+'</figcaption>'+C.draw(name)+'</figure>').join('')+'</div></div>';
}
C.figuresFor=function(q){const spec=captions[q?.id];if(!spec)return oldFigure(q);const starting=graphGallery(spec.before,'原卷起始分子 · 独立键线重绘');return q.id==='orig-2020-vii-2-aldol-synthesis'?starting+'<div class="paper-synthesis-target">'+graphGallery(['交叉羟醛加成目标'],'原卷指定目标 · 结构题干的一部分（非路线答案）')+'</div>':starting;};
C.answerFor=function(q){const spec=captions[q?.id];if(!spec)return oldAnswer(q);return '<section class="paper-correct-scheme">'+graphGallery(spec.after,spec.after.length>1?'三步结构推断的正确结构':'正确产物 · 独立键线重绘')+'</section>';};
const stages={
 'orig-2020-ii-10-nabh4':[
 ['1. 判断亲电性','羰基 O 电负性较强，使醛的羰基 Cδ⁺ 成为氢化物加成位点'],
 ['2. 电子对移动','H⁻ 等效片段迁到羰基 C；C=O 的 π 电子同时移向 O，形成烷氧负离子'],
 ['3. 质子化','烷氧负离子从介质接受 H⁺ 得到 CH₂OH；非共轭 C=C 通常保留']
 ],
 'orig-2020-ii-5-intramolecular-fc':[
 ['1. 活化离去基','AlCl₃ 配位于氯并促进 C–Cl 极化，生成强亲电烷基中心／离子对'],
 ['2. π 电子构建新 σ 键','芳环邻位碳进攻侧链末端，原有四个 –CH₂– 与芳环邻接两碳闭合六元环'],
 ['3. 恢复芳香性','σ 络合物脱去邻位 H⁺，恢复苯环 π 体系，得到四氢萘']
 ],
 'orig-2020-vii-2-aldol-synthesis':[
 ['1. 先形成苯乙酮烯醇盐','仅对苯乙酮加入 LDA/THF 低温脱 α-H，避免两种酮事先混合产生自缩合'],
 ['2. 羰基 C-亲核加成','形成的苯乙酮烯醇盐 α-C 进攻环戊酮羰基碳，C=O π 电子移至 O，形成新 C–C σ 键'],
 ['3. 温和质子化','用 NH₄Cl(aq) 处理，环酮的 O⁻ → OH；不进行后续脱水，以保留目标 β-羟基酮'],
 ['4. 用碳骨架验证','目标环上同一 C 连 OH 与 –CH₂–COPh；加成产物 C₁₃H₁₆O₂，不损失水']
 ],
 'orig-2020-iv-1-picoline-structure':[
 ['1. Cannizzaro 倒推 C','C 经浓 NaOH 得醇和羧酸，提示无α-H醛发生歧化，故为吡啶-2-甲醛'],
 ['2. 双键臭氧裂解倒推 B','苯甲醛和吡啶-2-甲醛来自 C=C 两端，双键两碳原各保留一个 H，B=Ph–CH=CH–pyridyl(2)'],
 ['3. 缩合倒推 A','B 比苯甲醛多 C₆H₇N 并少 H₂O，说明 A=2-甲基吡啶，其甲基碳与苯甲醛构建新 C–C 键并脱水']
 ]};
C.reasoningFor=function(q){if(!stages[q?.id])return oldReason(q);
 return '<section class="paper-mechanism"><h4>逐步机理与判断证据</h4>'+(q.id==='orig-2020-vii-2-aldol-synthesis'?graphGallery(['苯乙酮烯醇盐'],'关键烯醇盐共振式 · 重绘'):'')+stages[q.id].map(([t,why],i)=>
 '<div class="paper-mechanism-step"><div class="paper-mechanism-step-title">'+esc(t)+'</div><p>'+esc(why)+'</p></div>'+(i<stages[q.id].length-1?'<div class="paper-mechanism-arrow">↓</div>':'')).join('')+'</section>';};
const arrows={
 'orig-2020-vii-2-aldol-synthesis':{title:'交叉羟醛的电子流动逻辑示意（非全键级曲箭）',source:'烯醇盐 α-C → 环戊酮 C=O 的羰基 C；π(C=O) → O',why:'Cα 与原环戊酮羰基 C 形成 C–C σ 键，环羰基氧变 O⁻，再经 NH₄Cl(aq) 质子化得 OH。'},
 'orig-2020-ii-10-nabh4':{title:'氢化物还原的两支电子对箭头',
 source:'H:⁻ → Cδ⁺(=O)；π(C=O) → O',why:'新形成 C–H σ 键，同时 C=O 变为 C–O⁻；后续 O⁻ + H⁺ → OH。'},
 'orig-2020-ii-5-intramolecular-fc':{title:'分子内亲电取代的进攻路径示意（非逐原子曲箭图）',source:'π(Ar 邻位) → C(末端CH₂)；σ(C–H) → 芳环π体系',why:'第一箭构成邻位芳环碳与末端亚甲基之间新键，第二阶段脱质子恢复芳香性。'},
 'orig-2020-iv-1-picoline-structure':{title:'结构推断反应逻辑示意（非逐原子曲箭图）',source:'C核亲电加成 → 脱水成C=C；O₃作用双键断裂 → 两分子醛；OH⁻进攻CHO → 氢转移歧化',why:'臭氧裂解的产物由原C=C两端取代基决定；Cannizzaro涉及分子间形式上的氢化物转移。'}
};
C.electronSvg=function(q){if(q?.id==='orig-2020-ii-10-nabh4')return "<section class=\"paper-electron-diagram\"><h4>NaBH₄ 的电子对曲箭：碳氧双键加成</h4><svg viewBox=\"0 0 850 235\" role=\"img\" aria-label=\"氢化物电子对从H向羰基C进攻，C=O π电子向O转移\"><defs><marker id=\"naBH4CurveHead\" markerWidth=\"8\" markerHeight=\"8\" refX=\"7\" refY=\"4\" orient=\"auto\"><path d=\"M0 0 L8 4 L0 8 Z\" fill=\"#1c805d\"/></marker></defs><g font-family=\"Arial,sans-serif\" font-size=\"23\" fill=\"#284b37\" text-anchor=\"middle\"><text x=\"80\" y=\"145\">H:⁻</text><text x=\"260\" y=\"145\">C</text><text x=\"260\" y=\"55\">O</text><text x=\"354\" y=\"145\">R</text><text x=\"207\" y=\"145\">H</text><text x=\"600\" y=\"138\">R–CH₂–O⁻</text><text x=\"770\" y=\"138\">R–CH₂OH</text></g><g stroke=\"#4c6756\" stroke-width=\"3\"><path d=\"M254 72 V118 M264 72 V118 M275 136 H318\"/></g><g fill=\"none\" stroke=\"#1c805d\" stroke-width=\"3.6\" marker-end=\"url(#naBH4CurveHead)\"><path d=\"M105 132 Q158 65 249 126\"/><path d=\"M267 103 Q310 75 277 63\"/></g><g font-family=\"Arial,sans-serif\" font-size=\"14\" fill=\"#526b5c\" text-anchor=\"middle\"><text x=\"168\" y=\"67\">① H:⁻ 孤对 → 羰基 C</text><text x=\"374\" y=\"60\">② π(C=O) → O</text><text x=\"459\" y=\"131\" font-size=\"26\">→</text><text x=\"687\" y=\"130\" font-size=\"24\">→</text><text x=\"684\" y=\"103\">质子化 H⁺</text><text x=\"417\" y=\"194\">新 C–H σ 键生成 · 原 C=O 变 C–O⁻ · C=C 保留</text></g></svg><p>两支曲箭表示同一次羰基加成中的电子对移动。第一箭尾来自氢化物的成键电子当量，终点为缺电子的羰基碳；第二箭从 C=O 的 π 电子开始，终点在氧。反应介质随后把 O⁻ 质子化为 OH。</p></section>";const a=arrows[q?.id];if(!a)return oldArrow?.(q)||'';
 const uid='oarr_'+q.id.replace(/[^a-z0-9]/gi,'_');
 return '<section class="paper-electron-diagram"><h4>'+esc(a.title)+'</h4><svg viewBox="0 0 850 170" role="img" aria-label="'+esc(a.title)+'"><defs><marker id="'+uid+'" orient="auto" markerWidth="7" markerHeight="7" refX="6" refY="3.5"><path d="M0 0 L7 3.5 L0 7 Z" fill="#27795c"/></marker></defs><rect x="15" y="30" width="380" height="95" rx="12" fill="#eff8ef" stroke="#9ec39f"/><rect x="490" y="30" width="342" height="95" rx="12" fill="#f6f8f4" stroke="#9ec39f"/><text x="205" y="82" text-anchor="middle" font-size="17" fill="#214332">'+esc(a.source)+'</text><path d="M402 77 Q447 25 481 77" stroke="#27795c" stroke-width="3" fill="none" marker-end="url(#'+uid+')"/><text x="661" y="67" text-anchor="middle" font-size="16" fill="#214332">电子对流动的物理原因</text><text x="661" y="92" text-anchor="middle" font-size="11" fill="#536458">'+esc(a.why.slice(0,45))+'</text></svg><p>'+esc(a.why)+'</p></section>';
};
})();