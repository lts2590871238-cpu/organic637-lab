(()=>{'use strict';
const N=window.Organic637=window.Organic637||{},C=N.OriginalChem;if(!C)return;
// Independently redrawn intermediates, following atom identities and actual bonds.
// PhCOCI3: the original methyl carbon becomes the triiodomethyl carbon.
const starting=C.graphTemplates['苯乙酮'];
if(!starting)return;
const atoms=starting[0].map(a=>[...a]),bonds=starting[1].map(b=>[...b]);
for(const point of [[92,42,'I'],[86,67,'I'],[75,-1,'I']]){
 bonds.push([0,atoms.length,1]);atoms.push(point);
}
C.graphTemplates['三碘苯乙酮']=[atoms,bonds];
C.graphTemplates['碘仿CHI3']=[[[0,0,''],[-29,-23,'I'],[30,-22,'I'],[0,34,'I']],[[0,1,1],[0,2,1],[0,3,1]]];
const benzoate=C.graphTemplates['苯甲酸'];
const bAtoms=benzoate[0].map(a=>[...a]);bAtoms[2][2]='O⁻';
C.graphTemplates['苯甲酸根']=[bAtoms,benzoate[1].map(b=>[...b])];
const isIodoform=q=>q?.examSource?.year===2020&&q?.examSource?.originalQuestion==='一、选择题12';
const isNotIodoform=q=>q?.examSource?.year===2022&&q?.examSource?.originalQuestion==='二、选择题7';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const oldElectron=C.electronSvg;
const stages=[
 {title:'第一阶段：碱促进烯醇化，连续进行三次 α-碘代',
  formula:'Ph–C(=O)–CH₃ → Ph–C(=O)–CI₃',
  why:'OH⁻ 夺取羰基 α 位 H；Cα–H 键电子形成烯醇盐离域结构，电子由亲核 α 碳端进攻 I₂，I–I 键电子给 I⁻。重复三次，三个 α-H 依次被 I 取代。'},
 {title:'第二阶段：OH⁻ 对三碘甲基酮的羰基碳进攻',
  formula:'Ph–C(=O)–CI₃ + OH⁻ → Ph–C(OH)(O⁻)–CI₃',
  why:'羟基氧的孤对进攻缺电子羰基 C，C=O 的 π 电子移向 O，得到四面体中间体。这不是直接由羟基去进攻 CI₃ 上的碳。'},
 {title:'第三阶段：四面体中间体塌陷、酰基侧 C–C 键断裂',
  formula:'Ph–C(OH)(O⁻)–CI₃ → PhCOOH + CI₃⁻',
  why:'原羰基 O⁻ 的孤对重建 C=O，连接羰基C与CI₃的 σ 键电子转移给 CI₃，形成稳定的三碘甲基阴离子；在碱中PhCOOH进一步成为PhCOO⁻。'},
 {title:'第四阶段：形成黄色碘仿沉淀',
  formula:'CI₃⁻ + H₂O → CHI₃↓ + OH⁻',
  why:'CI₃⁻ 接受质子得到 CHI₃，通常观察到黄色沉淀。反应判据不只是有“羰基”，还要求可产生 CI₃⁻ 的甲基羰基等特定结构。'}
];
function cards(){
 return '<div class="paper-iodoform-graphs"><div class="original-molecule-grid">'+[
  ['苯乙酮','① 原始甲基酮'],
  ['三碘苯乙酮','② 三碘代中间体'],
  ['苯甲酸根','③ 苯甲酸根'],
  ['碘仿CHI3','④ 碘仿 CHI₃']
 ].map(([name,label])=>'<figure><figcaption>'+esc(label)+'</figcaption>'+C.draw(name)+'</figure>').join('')+'</div></div>';
}
function electronPanels(){
 // Source-to-target arrows use real chemical bonds and electron pairs;
 // these are reaction mechanisms, not a fake screenshot of an experimental trace.
 const svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 260" role="img" aria-label="碘仿反应电子对箭头：α-碳对碘亲核进攻、羟基对羰基进攻、四面体中间体断碳碳键">'+
 '<defs><marker id="iodoArrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 Z" fill="#157759"/></marker></defs>'+
 '<g fill="#f4faf5" stroke="#b2cdb5"><rect x="10" y="15" width="300" height="225" rx="14"/><rect x="340" y="15" width="310" height="225" rx="14"/><rect x="680" y="15" width="310" height="225" rx="14"/></g>'+
 '<g font-family="Arial,sans-serif" fill="#244836" font-size="16">'+
 '<text x="24" y="39" font-weight="700">① 烯醇盐 α-碳进攻 I₂</text>'+
 '<text x="354" y="39" font-weight="700">② OH⁻ 进攻羰基 C</text>'+
 '<text x="694" y="39" font-weight="700">③ C–C σ 键断裂</text>'+
 '</g>'+
 '<g font-size="20" fill="#234b36" font-family="Arial,sans-serif" text-anchor="middle">'+
 '<text x="62" y="148">Cα:</text><text x="212" y="146">I–I</text>'+
 '<text x="395" y="147">:OH⁻</text><text x="540" y="148">C</text><text x="540" y="77">O</text>'+
 '<text x="742" y="149">O⁻</text><text x="827" y="149">C</text><text x="940" y="149">CI₃</text>'+
 '</g>'+
 '<g stroke="#506e59" stroke-width="3" fill="none"><path d="M535 94 V125 M545 94 V125"/><path d="M762 139 H803 M850 139 H909"/></g>'+
 '<g stroke="#157759" stroke-width="3.3" fill="none" marker-end="url(#iodoArrow)">'+
 '<path d="M84 132 Q148 59 195 129"/>'+
 '<path d="M220 129 Q265 82 258 146"/>'+
 '<path d="M425 130 Q467 68 529 131"/>'+
 '<path d="M557 126 Q591 78 553 75"/>'+
 '<path d="M762 125 Q788 80 821 123"/>'+
 '<path d="M879 124 Q926 76 952 127"/>'+
 '</g>'+
 '<g font-family="Arial,sans-serif" font-size="12" fill="#4c6655" text-anchor="middle">'+
 '<text x="155" y="73">Cα 孤对 / π电子 → I</text><text x="261" y="161">I–I → I⁻</text>'+
 '<text x="452" y="72">:OH⁻ → C=O 的 C</text><text x="595" y="82">C=O π → O</text>'+
 '<text x="786" y="72">O⁻ → C=O</text><text x="922" y="73">C–CI₃ σ → CI₃</text>'+
 '</g></svg>';
 return svg;
}
function details(){
 return '<section class="paper-iodoform-mechanism"><h4>碘仿反应逐步电子机理（独立绘制）</h4>'+
 cards()+electronPanels()+
 stages.map((s,i)=>'<div class="paper-mechanism-step"><strong>'+esc(s.title)+'</strong><div class="paper-mechanism-formula">'+esc(s.formula)+'</div><p>'+esc(s.why)+'</p></div>').join('')+
 '<p>注意：这是根据有机化学机理绘制的教学解释，不是扫描卷原有的答案图。</p></section>';
}
C.iodoformDetails=details;
C.electronSvg=function(q){
 if(isIodoform(q))return details();
 if(isNotIodoform(q))return '<section class="paper-iodoform-mechanism"><h4>为何B不能形成碘仿？</h4>'+
 '<p>原卷 B 的结构为 (CH₃)₃C–CHO，羰基旁是已经连着三个CH₃的季碳；它不是 CH₃–C(=O)–R 甲基酮，也不可能在α位提供连续三个H供三次碘代。</p>'+
 '<p>对照：A 异丙醇可先被氧化为丙酮，C 乙醛 CH₃CHO 属特殊阳性例，D 丙酮直接是甲基酮。能否氧化成甲基酮、羰基相邻的碳结构，才是判断依据。</p>'+
 details()+'</section>';
 return oldElectron?.(q)||'';
};
})();