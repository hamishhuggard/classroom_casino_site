/* Level 8: same or different circuit? Two drawings of a battery and identical resistors; the student decides
   whether they are the same circuit. Circuits are series–parallel trees. Two drawings are the same circuit when
   their trees match once the order of series parts and of parallel branches is ignored, so each drawing is a
   random layout of a tree: shuffled order, components spread round the loop, branches hanging up or down, the
   battery drawn as one of the parallel branches, or a parallel group drawn as a ladder. The hardest formats make
   the "different" circuit a near miss: the same circuit with one resistor moved. */
(()=>{
const P=Physics12,H=P.helpers,E='Electromagnetism';
// ---- trees: {t:'R'} resistor, {t:'B'} battery, {t:'S',c:[…]} series, {t:'P',c:[…]} parallel ----
const key=n=>n.t==='R'?'R':n.t+'('+n.c.map(key).sort().join(',')+')';
const join=(t,a,b)=>({t,c:[a,b].flatMap(x=>x.t===t?x.c:[x])});
// Every distinct circuit of 1–5 identical resistors (2, 4, 10 and 24 circuits for 2, 3, 4 and 5 resistors).
const ALL=[null,[{t:'R'}]];
for(let n=2;n<=5;n++){const seen=new Map();
 for(let k=1;k<n;k++)for(const a of ALL[k])for(const b of ALL[n-k])for(const t of 'SP'){const x=join(t,a,b);seen.set(key(x),x);}
 ALL[n]=[...seen.values()];}
// Near misses: every circuit you get by taking one resistor out and putting it back somewhere else.
const R1={t:'R'};
const build=(t,kids)=>{kids=kids.filter(Boolean).flatMap(k=>k.t===t?k.c:[k]);return kids.length?kids.length===1?kids[0]:{t,c:kids}:null;};
const removals=n=>n.t==='R'?[null]:n.c.flatMap((c,i)=>removals(c).map(x=>build(n.t,n.c.map((d,j)=>j===i?x:d))));
const insertions=n=>[build('S',[n,R1]),build('P',[n,R1]),...(n.t==='R'?[]:n.c.flatMap((c,i)=>insertions(c).map(x=>build(n.t,n.c.map((d,j)=>j===i?x:d)))))];
function nearMisses(tree){
 const out=new Map();
 for(const less of removals(tree))for(const t of insertions(less))if(key(t)!==key(tree))out.set(key(t),t);
 return [...out.values()];
}
// ---- words for the explanation ----
const NUM=['no','one','two','three','four','five'];
const size=n=>n.t==='R'?1:n.c.reduce((s,c)=>s+size(c),0);
function words(n){
 if(n.t==='R')return 'one resistor';
 const type=n.t==='S'?'series':'parallel',plain=n.c.filter(c=>c.t==='R').length,rest=n.c.filter(c=>c.t!=='R').sort((a,b)=>size(a)-size(b));
 if(!rest.length)return `${NUM[plain]} resistors in ${type}`;
 const parts=(plain?[plain===1?'one resistor':`${NUM[plain]} resistors`]:[]).concat(rest.map(c=>`(${words(c)})`));
 return parts.join(` in ${type} with `);
}
// ---- layout: a block has width w, height h and terminals at (x, y+ty) and (x+w, y+ty) ----
const RW=64,RH=16,WIRE=18,GAP=24,PAD=24,VGAP=24;
const resistor={w:RW+2*WIRE,h:40,ty:20,draw:(x,y)=>H.line(x,y+20,x+WIRE,y+20)+H.rect(x+WIRE,y+20-RH/2,RW,RH)+H.line(x+WIRE+RW,y+20,x+RW+2*WIRE,y+20)};
const battery={w:2*WIRE+14,h:56,ty:28,draw:(x,y)=>H.line(x,y+28,x+WIRE,y+28)+H.line(x+WIRE,y+6,x+WIRE,y+50,3)+H.line(x+WIRE+14,y+17,x+WIRE+14,y+39,7)+H.line(x+WIRE+14,y+28,x+2*WIRE+14,y+28)};
const dot=(x,y)=>H.circle(x,y,5,1,'currentColor');
function series(kids){
 if(kids.length===1)return kids[0];
 const ty=Math.max(...kids.map(k=>k.ty)),below=Math.max(...kids.map(k=>k.h-k.ty)),w=kids.reduce((s,k)=>s+k.w,0)+GAP*(kids.length-1);
 return {w,h:ty+below,ty,draw:(x,y)=>{let s='',cx=x;kids.forEach((k,i)=>{if(i){s+=H.line(cx,y+ty,cx+GAP,y+ty);cx+=GAP;}s+=k.draw(cx,y+ty-k.ty);cx+=k.w;});return s;}};
}
// mode: 'top' (the outside wire meets the first branch), 'mid' (meets the middle of the bus) or 'none' (no outside wire: the battery is a branch).
function parallel(kids,mode){
 const inner=Math.max(...kids.map(k=>k.w)),w=inner+2*PAD;
 let yy=0;const ys=kids.map(k=>{const top=yy;yy+=k.h+VGAP;return top;});
 const bs=kids.map((k,i)=>ys[i]+k.ty),lo=bs[0],hi=bs[bs.length-1];
 const ty=mode==='mid'?(kids.length%2?bs[(kids.length-1)/2]:(lo+hi)/2):lo;
 return {w,h:yy-VGAP,ty,draw:(x,y)=>{
  let s=H.line(x,y+lo,x,y+hi)+H.line(x+w,y+lo,x+w,y+hi);
  kids.forEach((k,i)=>{const kx=x+PAD+(inner-k.w)/2;s+=H.line(x,y+bs[i],kx,y+bs[i])+k.draw(kx,y+ys[i])+H.line(kx+k.w,y+bs[i],x+w,y+bs[i]);});
  // A junction dot wherever three or more wires meet on a bus.
  const pts=[...new Set(mode==='none'?bs:[...bs,ty])];
  for(const p of pts){const deg=(p>lo)+(p<hi)+bs.includes(p)+(mode!=='none'&&p===ty);if(deg>=3)s+=dot(x,y+p)+dot(x+w,y+p);}
  return s;}};
}
// Ladder: a parallel group turned on its side. The branches are rungs between a top and a bottom rail; current comes
// in along the top rail and leaves from the right-hand end of the bottom rail, which a wire takes back up to the line.
function ladder(kids){
 const L=Math.max(...kids.map(k=>k.w)),xs=[];let w=PAD;
 kids.forEach((k,i)=>{if(i)w+=GAP;xs.push(w+k.h-k.ty);w+=k.h;});w+=PAD;
 return {w,h:L,ty:0,draw:(x,y)=>{
  const last=xs.length-1;
  let s=H.line(x,y,x+xs[last],y)+H.line(x+xs[0],y+L,x+w,y+L)+H.line(x+w,y+L,x+w,y);
  kids.forEach((k,i)=>{const cx=x+xs[i],a=(L-k.w)/2;
   s+=H.line(cx,y,cx,y+a)+`<g transform="translate(${cx},${y+a}) rotate(90)"><g transform="translate(0,${-k.ty})">${k.draw(0,0)}</g></g>`+H.line(cx,y+a+k.w,cx,y+L);
   if(i<last)s+=dot(cx,y);if(i>0)s+=dot(cx,y+L);});
  return `<g data-ladder="1">${s}</g>`;}};
}
// o: which drawing tricks a format allows: spread (parts round the whole loop), flip (branches hang outside),
// mid (outside wire meets the middle of a parallel group), rails (battery drawn as a parallel branch),
// ladder (parallel groups drawn as ladders), near (a "different" pair is a near miss).
function block(n,r,o){
 if(n.t==='R')return resistor;
 if(n.t==='B')return battery;
 const kids=H.shuffle(n.c,r).map(c=>block(c,r,o));
 return n.t==='S'?series(kids):o.ladder&&r()<.6?ladder(kids):parallel(kids,o.mid&&r()<.5?'mid':'top');
}
// The whole circuit as top-level series items (the battery is one of them).
const items=tree=>[{t:'B'},...(tree.t==='S'?tree.c:[tree])];
// Loop drawing: items keep a cyclic order and are spread clockwise round a rectangle (top, right, bottom, left).
// Each side's block is rotated to follow the wire and may be flipped so branches hang outside instead of inside.
function drawLoop(sides,ex=0,ey=0){
 const S=sides.map(sd=>{if(!sd)return null;const b=sd.block,down=b.h-b.ty,up=b.ty;return {b,flip:sd.flip,L:b.w,inn:sd.flip?up:down,out:sd.flip?down:up};});
 const g=(i,f)=>S[i]?S[i][f]:0;
 const m=Math.max(g(1,'inn'),g(3,'inn'))+24,m2=Math.max(g(0,'inn'),g(2,'inn'))+24;
 const Wd=Math.max(g(0,'L'),g(2,'L'),120)+2*m+ex,Ht=Math.max(g(1,'L'),g(3,'L'),80)+2*m2+ey;
 const geo=[[0,0,1,0,Wd,0],[Wd,0,0,1,Ht,90],[Wd,Ht,-1,0,Wd,180],[0,Ht,0,-1,Ht,270]];
 let svg='';
 geo.forEach(([ox,oy,dx,dy,len,ang],i)=>{
  const s=S[i];
  if(!s){svg+=H.line(ox,oy,ox+dx*len,oy+dy*len);return;}
  const a=(len-s.L)/2,px=ox+dx*a,py=oy+dy*a,qx=ox+dx*(a+s.L),qy=oy+dy*(a+s.L);
  svg+=H.line(ox,oy,px,py)+H.line(qx,qy,ox+dx*len,oy+dy*len);
  svg+=`<g transform="translate(${px},${py}) rotate(${ang})"><g transform="${s.flip?'scale(1,-1) ':''}translate(0,${-s.b.ty})">${s.b.draw(0,0)}</g></g>`;
 });
 const x=-g(3,'out')-8,y=-g(0,'out')-8;
 return {svg,x,y,w:Wd+g(1,'out')+g(3,'out')+16,h:Ht+g(0,'out')+g(2,'out')+16};
}
// stretch: longer or shorter wires round the loop.
const stretch=(r,o)=>o.stretch?[H.int(0,4,r)*30,H.int(0,3,r)*30]:[0,0];
// Plain: the battery on one side and all the resistors on the opposite side.
function plainLoop(tree,r,o){
 const rest=items(tree).slice(1),[a,b]=H.pick([[0,2],[2,0],[1,3],[3,1]],r),sides=[null,null,null,null];
 sides[a]={block:battery,flip:false};sides[b]={block:series(H.shuffle(rest,r).map(n=>block(n,r,o))),flip:o.flip&&r()<.5};
 return drawLoop(sides,...stretch(r,o));
}
function randomLoop(tree,r,o){
 const order=H.shuffle(items(tree),r),k=order.length;
 const g=H.int(1,Math.min(4,k),r),sideIds=H.shuffle([0,1,2,3],r).slice(0,g).sort();
 const cuts=H.shuffle([...Array(k-1).keys()].map(i=>i+1),r).slice(0,g-1).sort((a,b)=>a-b);
 const runs=[0,...cuts,k].slice(1).map((end,i,arr)=>order.slice(i?arr[i-1]:0,end));
 const sides=[null,null,null,null];
 runs.forEach((run,i)=>{sides[sideIds[i]]={block:series(run.map(n=>block(n,r,o))),flip:o.flip&&r()<.3};});
 return drawLoop(sides,...stretch(r,o));
}
// Rails drawing: one parallel group's branches between two rails, with the battery and everything else in series as another branch.
function drawRails(branches){const b=parallel(branches,'none');return {svg:b.draw(0,0),x:-8,y:-8,w:b.w+16,h:b.h+16};}
function randomRails(tree,r,o){
 const all=items(tree),ps=all.filter(n=>n.t==='P'),p=H.pick(ps,r);
 const rest=H.shuffle(all.filter(n=>n!==p),r),own=series(rest.map(n=>block(n,r,o)));
 return drawRails(H.shuffle([own,...p.c.map(c=>block(c,r,o))],r));
}
const draw=(tree,r,o)=>o.rails&&items(tree).some(n=>n.t==='P')&&r()<.5?randomRails(tree,r,o):o.spread?randomLoop(tree,r,o):plainLoop(tree,r,o);
// Two drawings side by side at a common scale.
function pair(c1,c2){
 const PW=420,PH=320,s=Math.min(1,PW/c1.w,PH/c1.h,PW/c2.w,PH/c2.h);
 const put=(c,cx)=>`<g transform="translate(${(cx-c.w*s/2).toFixed(1)},${(190-c.h*s/2).toFixed(1)}) scale(${s.toFixed(4)}) translate(${-c.x},${-c.y})">${c.svg}</g>`;
 return H.svgWrap(put(c1,235)+H.line(480,30,480,350,2,'stroke-dasharray="6 10" opacity="0.5"')+put(c2,725),'Two circuit diagrams to compare','0 0 960 380').replace('class="revision-visual"','class="revision-visual circuit-pair"');
}
// ---- lookalikes: is one drawing just the other turned round or flipped over? ----
// Flatten a drawing's SVG to absolute line segments, trace them onto a 3-unit grid (after turning, so the grids line up), and compare them under all
// eight rotations and reflections. Drawings at the same scale only, so compare before pair() scales them.
function cells(svg){
 const mul=(a,b)=>[a[0]*b[0]+a[2]*b[1],a[1]*b[0]+a[3]*b[1],a[0]*b[2]+a[2]*b[3],a[1]*b[2]+a[3]*b[3],a[0]*b[4]+a[2]*b[5]+a[4],a[1]*b[4]+a[3]*b[5]+a[5]];
 const stack=[[1,0,0,1,0,0]],segs=[];
 for(const tag of svg.match(/<\/?[a-z]+[^>]*>/g)){
  if(tag.startsWith('</g')){stack.pop();continue;}
  const M=stack[stack.length-1],A=k=>Number((tag.match(new RegExp(` ${k}="([^"]*)"`))||[])[1]),at=(x,y)=>[M[0]*x+M[2]*y+M[4],M[1]*x+M[3]*y+M[5]];
  if(tag.startsWith('<g')){let m=M;
   for(const [,f,a] of ((tag.match(/transform="([^"]*)"/)||[])[1]||'').matchAll(/(\w+)\(([^)]*)\)/g)){const v=a.split(/[ ,]+/).map(Number),t=v[0]*Math.PI/180;
    m=mul(m,f==='translate'?[1,0,0,1,v[0],v[1]||0]:f==='scale'?[v[0],0,0,v.length>1?v[1]:v[0],0,0]:[Math.cos(t),Math.sin(t),-Math.sin(t),Math.cos(t),0,0]);}
   stack.push(m);}
  else if(tag.startsWith('<line'))segs.push([at(A('x1'),A('y1')),at(A('x2'),A('y2'))]);
  else if(tag.startsWith('<rect')){const x=A('x'),y=A('y'),w=A('width'),h=A('height'),p=[[x,y],[x+w,y],[x+w,y+h],[x,y+h]].map(q=>at(...q));p.forEach((q,i)=>segs.push([q,p[(i+1)%4]]));}
  else if(tag.startsWith('<circle')){const c=at(A('cx'),A('cy'));segs.push([c,c]);}
 }
 const out=[];
 for(const [a,b] of segs){const n=Math.max(1,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])));for(let i=0;i<=n;i++)out.push([a[0]+(b[0]-a[0])*i/n,a[1]+(b[1]-a[1])*i/n]);}
 return out;
}
const SYMS=[[1,0,0,1],[0,-1,1,0],[-1,0,0,-1],[0,1,-1,0],[-1,0,0,1],[1,0,0,-1],[0,1,1,0],[0,-1,-1,0]];
function grid(pts,[a,b,c,d]){
 const q=pts.map(([x,y])=>[a*x+b*y,c*x+d*y]),x0=Math.min(...q.map(p=>p[0])),y0=Math.min(...q.map(p=>p[1]));
 return new Set(q.map(([x,y])=>Math.round((x-x0)/3)+','+Math.round((y-y0)/3)));
}
function lookalike(c1,c2){
 const g1=grid(cells(c1.svg),SYMS[0]),p2=cells(c2.svg);
 return SYMS.some(s=>{const g2=grid(p2,s);let n=0;for(const k of g2)if(g1.has(k))n++;return n/Math.max(g1.size,g2.size)>0.9;});
}
// Keep in step with the level summary in core.js.
const RULE='Same circuit if every resistor is connected to the same things. Wires can bend, stretch and move. The order of things in series and the order of parallel branches do not matter. All the resistors are identical.';
// Card: two resistors in series, battery opposite them, and the same circuit with the parts spread round the loop;
// then the whiteboard example — battery and resistor drawn as a parallel branch, and the same circuit as one loop.
{const one=drawLoop([{block:battery,flip:false},null,{block:series([resistor,resistor]),flip:false},null]);
 const two=drawLoop([{block:resistor,flip:false},{block:resistor,flip:false},null,{block:battery,flip:false}]);
 const three=drawRails([series([battery,resistor]),resistor,resistor]);
 const four=drawLoop([{block:battery,flip:false},null,{block:series([parallel([resistor,resistor],'top'),resistor]),flip:true},null]);
 P.setCard(8,{example:RULE,html:`<div class="phys-card">${pair(one,two)}<p>These two are the same circuit: two resistors in series.</p>${pair(three,four)}<p>So are these: one resistor in series with (two resistors in parallel).</p></div>`});}
// Drawing tricks: plain → stretch (wire lengths) → spread (parts round the loop) → mid / flip (how branches join and hang) → rails (battery as a branch).
const PLAIN={},STRETCH={stretch:true},SPREAD={stretch:true,spread:true},MID={stretch:true,spread:true,mid:true},FLIP={stretch:true,spread:true,flip:true},
 TRICKS={stretch:true,spread:true,flip:true,mid:true},ALLTRICKS={stretch:true,spread:true,flip:true,mid:true,rails:true};
const LADDER={...ALLTRICKS,ladder:true},NEAR={...LADDER,near:true};
const ENDS=ALL[3].filter(t=>t.c.every(c=>c.t==='R'));   // three in series, three in parallel
function format(level,id,skill,trees,o){
 P.add(level,{id,topic:E,skill,
  gen(r,h){
   const t1=h.pick(trees,r),same=r()<.5,t2=same?t1:h.pick(o.near?nearMisses(t1):trees.filter(t=>key(t)!==key(t1)),r);
   const c1=draw(t1,r,o);let c2=draw(t2,r,o);
   for(let i=0;same&&lookalike(c1,c2)&&i<60;i++)c2=draw(t2,r,o);   // never the same drawing twice, nor one just turned round or flipped
   return {cloze:'Same circuit or different?\n____',answer:same?'same':'different',choices:['same','different'],fixedChoices:true,noInstruction:true,   // SAME always on the left
    explanation:same?`Same. Both are ${words(t1)}, just drawn differently.`:`Different. Left: ${words(t1)}. Right: ${words(t2)}.`,
    visual:{type:'svg',svg:pair(c1,c2)}};}});
}
// Played in this order (the level is marked ordered in core.js), easiest first: two resistors, three in series or parallel,
// then any three, then four, then ladders and near misses (one resistor moved). A practice run cycles round again.
format(8,'L8-E01','Two resistors: battery and resistors swap sides',ALL[2],PLAIN);
format(8,'L8-E02','Two resistors: longer or shorter wires',ALL[2],STRETCH);
format(8,'L8-E03','Two resistors: parts moved round the loop',ALL[2],SPREAD);
format(8,'L8-E04','Two resistors: parallel group joined in the middle',ALL[2],MID);
format(8,'L8-E05','Two resistors: branches drawn inside or outside',ALL[2],FLIP);
format(8,'L8-E06','Two resistors: battery drawn as a branch',ALL[2],ALLTRICKS);
format(8,'L8-E07','Three resistors in series or parallel',ENDS,PLAIN);
format(8,'L8-E08','Three resistors in series or parallel: longer or shorter wires',ENDS,STRETCH);
format(8,'L8-E09','Three resistors in series or parallel: parts moved',ENDS,SPREAD);
format(8,'L8-E10','Three resistors in series or parallel: branches moved',ENDS,TRICKS);
format(8,'L8-E11','Three resistors in series or parallel: battery drawn as a branch',ENDS,ALLTRICKS);
format(8,'L8-E12','Three resistors',ALL[3],PLAIN);
format(8,'L8-E13','Three resistors: parts moved',ALL[3],SPREAD);
format(8,'L8-E14','Three resistors: branches moved',ALL[3],TRICKS);
format(8,'L8-E15','Three resistors: battery drawn as a branch',ALL[3],ALLTRICKS);
format(8,'L8-E16','Four resistors',ALL[4],PLAIN);
format(8,'L8-E17','Four resistors: parts moved',ALL[4],SPREAD);
format(8,'L8-E18','Four resistors: branches moved',ALL[4],TRICKS);
format(8,'L8-E19','Four resistors: battery drawn as a branch',ALL[4],ALLTRICKS);
format(8,'L8-E20','Three resistors: ladder drawings',ALL[3],LADDER);
format(8,'L8-E21','Three resistors: one resistor moved',ALL[3],NEAR);
format(8,'L8-E22','Four resistors: ladder drawings',ALL[4],LADDER);
format(8,'L8-E23','Four resistors: one resistor moved',ALL[4],NEAR);
format(8,'L8-E24','Five resistors: one resistor moved',ALL[5],NEAR);
})();
