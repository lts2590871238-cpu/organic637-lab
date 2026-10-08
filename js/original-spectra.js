(() => {
'use strict';
const NS=window.Organic637=window.Organic637||{},Chem=NS.OriginalChem;if(!Chem)return;
Chem.graphTemplates['对甲基苯甲醚']=[
[[0,-37,''],[32,-19,''],[32,19,''],[0,37,''],[-32,19,''],[-32,-19,''],[0,-70,'O'],[0,-103,''],[0,70,'']],
[[0,1,2],[1,2,1],[2,3,2],[3,4,1],[4,5,2],[5,0,1],[0,6,1],[6,7,1],[3,8,1]]
];
const id='orig-2020-iv-2-ir-nmr';
const priorFigures=Chem.figuresFor,priorAnswers=Chem.answerFor;
const irPeaks=[
{label:'芳环骨架约1600、1500 cm⁻¹',x:241,width:72},
{label:'醚 C–O 约1250、1030 cm⁻¹',x:405,width:88},
{label:'无强 C=O / 宽 O–H',x:100,width:92}
];
function keySpectra(){
 const group1='<rect x="15" y="12" width="740" height="160" rx="12" fill="#f9fbf9" stroke="#c7d9c7"/>'+
 '<text x="30" y="36" fill="#274631" font-size="15">IR 峰群线索（重新绘制，非原扫描实验曲线）</text>'+
 '<line x1="54" y1="142" x2="719" y2="142" stroke="#607b66" stroke-width="2"/>'+
 '<text x="54" y="163" fill="#536b59" font-size="11">4000 cm⁻¹</text><text x="718" y="163" text-anchor="end" fill="#536b59" font-size="11">500 cm⁻¹</text>'+
 '<rect x="365" y="65" width="30" height="77" fill="#cee5d3"/><rect x="427" y="65" width="43" height="77" fill="#bad9c2"/>'+
 '<text x="380" y="60" text-anchor="middle" fill="#1e6840" font-size="13">芳环</text><text x="448" y="60" text-anchor="middle" fill="#1e6840" font-size="13">C–O</text>'+
 '<text x="146" y="98" text-anchor="middle" fill="#616f66" font-size="12">无明显宽 O–H 峰</text>'+
 '<text x="284" y="118" text-anchor="middle" fill="#616f66" font-size="11">无典型强羰基峰</text>';
 const nmr='<rect x="15" y="192" width="740" height="198" rx="12" fill="#f9fbf9" stroke="#c7d9c7"/>'+
 '<text x="30" y="218" fill="#274631" font-size="15">¹H NMR 积分和近似化学位移（非原实验数字化复刻）</text>'+
 '<line x1="58" y1="346" x2="719" y2="346" stroke="#59745f" stroke-width="2"/>'+
 '<g stroke="#2c815a" stroke-width="3">'+
 '<path d="M162 346 V267 M171 346 V267 M187 346 V282 M196 346 V282"/>'+
 '<path d="M426 346 V245 M564 346 V260"/></g>'+
 '<g fill="#32674b" font-size="13" text-anchor="middle">'+
 '<text x="177" y="253">芳香环 4H</text><text x="177" y="371">δ≈6.8–7.2</text>'+
 '<text x="426" y="232">3H · OCH₃</text><text x="426" y="371">δ≈3.7–3.9</text>'+
 '<text x="564" y="248">3H · Ar–CH₃</text><text x="564" y="371">δ≈2.1–2.4</text></g>'+
 '<text x="677" y="373" fill="#677a6e" font-size="11">δ / ppm ↓</text>';
 return '<div class="original-spectrum"><svg viewBox="0 0 772 403" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="红外官能团峰群和¹H NMR两组芳香氢、甲氧基三氢、芳环甲基三氢的教学示意">'+group1+nmr+'</svg><p>此图仅重新表达原扫描支持的峰群与积分。未逐点复原谱线，化学位移均为估读范围；不能用此示意作为原卷谱图精确数值。</p></div>';
}
Chem.figuresFor=function(q){
 if(q?.id!==id)return priorFigures(q);
 return keySpectra();
};
Chem.answerFor=function(q){
 if(q?.id!==id)return priorAnswers(q);
 return '<section class="paper-correct-scheme"><b>推断结构：1-甲氧基-4-甲基苯（对甲基苯甲醚）</b><div class="original-molecule-grid"><figure><figcaption>对位甲氧基与甲基 · 独立键线式</figcaption>'+Chem.draw('对甲基苯甲醚')+'</figure></div><p>苯环保留4H，Ar–O–CH₃与Ar–CH₃各贡献3H；氢总数4+3+3=10，与C₈H₁₀O一致。</p></section>';
};
})();