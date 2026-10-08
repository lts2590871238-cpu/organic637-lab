(() => {
'use strict';
const NS=window.Organic637=window.Organic637||{};
const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
function atomText(x,y,label){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" dominant-baseline="middle" font-size="15" font-weight="600" fill="currentColor">'+escape(label)+'</text>';}
function bond(a,b,double=false,offset=0){
 const [x1,y1]=a,[x2,y2]=b,dx=x2-x1,dy=y2-y1,len=Math.max(1,Math.hypot(dx,dy)),nx=-dy/len,ny=dx/len;
 const line=(o)=>'<line x1="'+(x1+nx*o).toFixed(1)+'" y1="'+(y1+ny*o).toFixed(1)+'" x2="'+(x2+nx*o).toFixed(1)+'" y2="'+(y2+ny*o).toFixed(1)+'" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>';
 return double?line(-2.5+offset)+line(2.5+offset):line(offset);
}
function ring(n,{center=[100,74],radius=39,db=[],hetero={},subs=[]}={}){
 let vertices=Array.from({length:n},(_,i)=>[center[0]+radius*Math.cos(-Math.PI/2+i*2*Math.PI/n),center[1]+radius*Math.sin(-Math.PI/2+i*2*Math.PI/n)]);
 let out='';
 for(let i=0;i<n;i++){let j=(i+1)%n;out+=bond(vertices[i],vertices[j],db.includes(i));}
 for(const [k,v] of Object.entries(hetero)){const p=vertices[Number(k)];out+='<circle cx="'+p[0]+'" cy="'+p[1]+'" r="11" fill="#fff"/>'+atomText(p[0],p[1],v);}
 for(const s of subs){
   const p=vertices[s.at],dx=p[0]-center[0],dy=p[1]-center[1],k=(s.dist||30)/Math.hypot(dx,dy);
   const q=[p[0]+dx*k,p[1]+dy*k];
   out+=bond(p,q);out+='<rect x="'+(q[0]-30)+'" y="'+(q[1]-10)+'" width="60" height="20" fill="#fff"/>'+atomText(q[0],q[1],s.label);
 }
 return out;
}
function linear(segments,labels=[],doubleIndex=[]){
 const pts=segments.map(([x,y])=>[x,y]);
 let o='';for(let i=0;i<pts.length-1;i++)o+=bond(pts[i],pts[i+1],doubleIndex.includes(i));
 for(const [idx,label] of labels){const p=pts[idx];o+='<rect x="'+(p[0]-28)+'" y="'+(p[1]-13)+'" width="56" height="26" fill="white"/>'+atomText(p[0],p[1],label);}
 return o;
}
const shapes={
 '环辛四烯':()=>ring(8,{radius:37,db:[0,2,4,6]}),
 '䓬鎓离子':()=>ring(7,{radius:38,db:[0,2,4]})+atomText(156,45,'⁺'),
 '四氢萘':()=>ring(6,{center:[82,74],radius:36,db:[0,2,4]})+ring(6,{center:[132,74],radius:36,db:[]}),
 '呋喃':()=>ring(5,{hetero:{0:'O'},db:[1,3]}),
 '苯':()=>ring(6,{db:[0,2,4]}),
 '吡啶':()=>ring(6,{db:[0,2,4],hetero:{0:'N'}}),
 '吡咯':()=>ring(5,{hetero:{0:'NH'},db:[1,3]}),
 '吡咯烷':()=>ring(5,{hetero:{0:'NH'}}),
 '咪唑':()=>ring(5,{hetero:{0:'NH',2:'N'},db:[1,3]}),
 '丁二酰亚胺':()=>ring(5,{hetero:{0:'NH'},subs:[{at:1,label:'=O'},{at:4,label:'=O'}]}),
 '苯胺':()=>ring(6,{db:[0,2,4],subs:[{at:0,label:'NH₂'}]}),
 '环己胺':()=>ring(6,{subs:[{at:0,label:'NH₂'}]}),
 '乙酰苯胺':()=>ring(6,{db:[0,2,4],subs:[{at:0,label:'NHCOCH₃',dist:43}]}),
 '苯酚':()=>ring(6,{db:[0,2,4],subs:[{at:0,label:'OH'}]}),
 '苯乙酮':()=>ring(6,{db:[0,2,4],subs:[{at:0,label:'COCH₃',dist:38}]}),
 '苯甲醛':()=>ring(6,{db:[0,2,4],subs:[{at:0,label:'CHO'}]}),
 '苯乙醚':()=>ring(6,{db:[0,2,4],subs:[{at:0,label:'OCH₂CH₃',dist:40}]}),
 '对甲基苯甲酸':()=>ring(6,{db:[0,2,4],subs:[{at:0,label:'COOH'},{at:3,label:'CH₃'}]}),
 '间甲基苯甲酸':()=>ring(6,{db:[0,2,4],subs:[{at:0,label:'COOH'},{at:2,label:'CH₃'}]}),
 '对硝基苯甲酸':()=>ring(6,{db:[0,2,4],subs:[{at:0,label:'COOH'},{at:3,label:'NO₂'}]}),
 '间硝基苯甲酸':()=>ring(6,{db:[0,2,4],subs:[{at:0,label:'COOH'},{at:2,label:'NO₂'}]}),
 '2-丁醇':()=>linear([[40,45],[72,80],[110,50],[145,80]],[[2,'OH']]),
 '正丁醇':()=>linear([[35,65],[65,42],[95,65],[125,42],[153,65]],[[4,'OH']]),
 '叔丁醇':()=>linear([[68,50],[100,76],[134,50],[100,105]],[[3,'OH']]),
 '乙醚':()=>linear([[30,75],[62,47],[94,75],[125,47],[158,75]],[[2,'O']]),
 '乙醛':()=>linear([[46,79],[93,52],[138,80]],[[2,'O']],[1]),
 '丙酮':()=>linear([[40,74],[90,50],[140,74],[90,104]],[[3,'O']],[2]),
 '二苯甲酮':()=>ring(6,{center:[53,68],radius:25,db:[0,2,4]})+ring(6,{center:[146,68],radius:25,db:[0,2,4]})+linear([[77,68],[100,54],[121,68],[100,20]],[[3,'O']],[2]),
 '三氯乙醛':()=>linear([[54,65],[95,65],[135,65]],[[0,'CCl₃'],[2,'O']],[1]),
 '丙醛':()=>linear([[35,80],[75,48],[117,80],[154,48]],[[3,'O']],[2]),
 '甲醛':()=>linear([[68,66],[125,66]],[[0,'H₂C'],[1,'O']],[0]),
 '氯乙酸':()=>linear([[36,65],[70,42],[108,65],[145,42]],[[0,'Cl'],[3,'COOH']]),
 '乙酸':()=>linear([[56,78],[100,51]],[[1,'COOH']]),
 '环戊基甲醇':()=>ring(5,{subs:[{at:0,label:'CH₂OH',dist:36}]}),
 '1-甲基环戊醇':()=>ring(5,{subs:[{at:0,label:'OH'},{at:0,label:'CH₃',dist:51}]}),
 '2-甲基环戊醇':()=>ring(5,{subs:[{at:0,label:'OH'},{at:1,label:'CH₃'}]})
};
const pictureMap={
 '2020:一、选择题7':['环辛四烯','䓬鎓离子','四氢萘','呋喃'],
 '2020:一、选择题12':['苯乙酮','苯酚','苯甲醛','苯乙醚'],
 '2020:一、选择题13':['对甲基苯甲酸','间硝基苯甲酸','间甲基苯甲酸','对硝基苯甲酸'],
 '2020:一、选择题15':['咪唑','吡咯','丁二酰亚胺','吡咯烷'],
 '2017:三、按指定性质排序2':['吡咯烷','吡咯','吡啶'],
 '2017:三、按指定性质排序5':['苯','吡啶','吡咯'],
 '2014:三、按指定性质排序4':['苯胺','环己胺','乙酰苯胺'],
 '2014:三、按指定性质排序5':['苯酚','乙酸','氯乙酸'],
 '2014:三、按指定性质排序6':['乙醛','丙酮','二苯甲酮'],
 '2014:三、按指定性质排序8':['环戊基甲醇','1-甲基环戊醇','2-甲基环戊醇'],
 '2014:三、按指定性质排序9':['正丁醇','叔丁醇','乙醚'],
 '2019:三、单项选择题8':['三氯乙醛','甲醛','丙酮','丙醛']
};
function draw(name){
 if(!shapes[name])return '';
 const inner=shapes[name]();
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 145" role="img" aria-label="'+escape(name)+'键线结构重绘"><rect width="200" height="145" fill="white"/><g color="#26392e">'+inner+'</g></svg>';
}
function figuresFor(question){
 const k=question?.examSource?.year+':'+question?.examSource?.originalQuestion;
 const ids=pictureMap[k]||[];
 if(!ids.length)return '';
 return '<div class="original-molecule-grid">'+ids.map((name,i)=>'<figure><figcaption>'+String.fromCharCode(65+i)+' · '+escape(name)+'</figcaption>'+draw(name)+'</figure>').join('')+'</div>';
}
NS.OriginalChem={draw,figuresFor,pictureMap};
})();