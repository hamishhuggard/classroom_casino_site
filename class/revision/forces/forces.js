/* Year 10 Forces & Motion for Revision Roulette (30 October 2026).
   Replaces the three fixed questions per skill in curriculum.json with generated questions (same gen(r,h) contract as
   revision/physics12: randomness only through r; helpers h). Each skill is an ordered list of cards, easiest first:
   `tier` 1 -> 3 (or 4), the first card of each later tier is a checkpoint, and five right in a row skip ahead.
   One concept per skill so the teacher dashboard's per-skill results mean something. Acceleration (F = ma) and
   stability keep their fixed curriculum.json questions. Numbers are small and give clean answers; g = 10 N/kg
   on Earth and 1.6 N/kg on the Moon. Test with: node tests/forces.cjs */
(function(){
 const Q='____';
 const SKILLS=[];
 function skill(key,name,summary,example){const s={id:'forces_motion-'+key,name,summary,example,ordered:true,jumpAfter:5,questions:[]};SKILLS.push(s);return s;}
 function card(s,code,tier,gen){s.questions.push({id:'FM-'+code,unit:s.name,skill:s.name,tier,checkpoint:tier>1&&!s.questions.some(c=>c.tier===tier),gen});}
 const mc=(h,r,answer,wrongs)=>h.shuffle([answer,...wrongs],r);
 const num=n=>String(Number(Number(n).toPrecision(8)));
 const OPP={left:'right',right:'left',up:'down',down:'up'};

 // ---------- diagrams ----------
 // Forces on one object. F = {left,right,up,down}, each {n, label?, unknown?}. Arrows run out from the box; lengths follow one scale.
 function forceSvg(h,F,o={}){
  const cx=320,cy=130,obj=o.obj||'',bw=Math.max(120,obj.length*13+24),bh=60;
  const vert=!!(F.up||F.down);
  const max=Math.max(1,...['left','right','up','down'].map(k=>F[k]&&!F[k].unknown?F[k].n:0));
  const s=vert?Math.min(10,86/max):Math.min(14,190/max);
  const len=f=>f.unknown?(vert?56:70):Math.max(vert?36:40,f.n*s);
  const lab=f=>f.label||(f.unknown?'?':f.n+' N');
  const arrow=(f,x1,y1,x2,y2)=>f.unknown?`<g stroke-dasharray="9 7">${h.arrow(x1,y1,x2,y2,4,14)}</g>`:h.arrow(x1,y1,x2,y2,4,14);
  let b=h.rect(cx-bw/2,cy-bh/2,bw,bh,3)+(obj?h.text(cx,cy+7,obj,20):'');
  if(F.left){const l=len(F.left);b+=arrow(F.left,cx-bw/2,cy,cx-bw/2-l,cy)+h.text(cx-bw/2-6,cy-12,lab(F.left),22,'end');}
  if(F.right){const l=len(F.right);b+=arrow(F.right,cx+bw/2,cy,cx+bw/2+l,cy)+h.text(cx+bw/2+6,cy-12,lab(F.right),22,'start');}
  if(F.up){const l=len(F.up);b+=arrow(F.up,cx,cy-bh/2,cx,cy-bh/2-l)+h.text(cx+14,cy-bh/2-l/2+7,lab(F.up),22,'start');}
  if(F.down){const l=len(F.down);b+=arrow(F.down,cx,cy+bh/2,cx,cy+bh/2+l)+h.text(cx+14,cy+bh/2+l/2+7,lab(F.down),22,'start');}
  return {type:'svg',svg:h.svgWrap(b,o.alt||'Forces acting on an object; each arrow is labelled with its size')};
 }
 // Journey in legs, each {d,t} or {stop:t}. Units du, tu.
 function journeySvg(h,legs,du='m',tu='s'){
  const n=legs.length,x0=50,x1=590,seg=(x1-x0)/n,y=120;let b='';
  legs.forEach((g,i)=>{
   const xa=x0+i*seg,xb=xa+seg,mid=(xa+xb)/2;
   if(g.stop!==undefined)b+=h.line(xa,y,xb,y,4,'stroke-dasharray="3 9"')+h.text(mid,y-20,'stopped',24)+h.text(mid,y+40,g.stop+' '+tu,24);
   else b+=h.line(xa,y,i===n-1?xb-8:xb,y,4)+h.text(mid,y-20,g.d+' '+du,24)+h.text(mid,y+40,g.t+' '+tu,24);
  });
  b+=h.arrow(x1-60,y,x1,y,4,14);
  for(let i=0;i<=n;i++)b+=h.circle(x0+i*seg,y,7,3,'currentColor');
  b+=h.text(x0,y+80,'Start',22,'middle')+h.text(x1,y+80,'Finish',22,'middle');
  return {type:'svg',svg:h.svgWrap(b,'A journey in sections; each section shows its distance and time')};
 }
 // Distance–time graph from sections [{dt,v}] (v in m/s; 0 = stopped). ticks give gridline steps.
 function graphSvg(h,secs,o={}){
  const pts=[[0,0]];for(const g of secs){const p=pts[pts.length-1];pts.push([p[0]+g.dt,p[1]+g.dt*g.v]);}
  const tmax=pts[pts.length-1][0],dmax=Math.max(...pts.map(p=>p[1]),1);
  const ts=o.tstep||(tmax<=10?1:tmax<=20?2:5),ds=o.dstep||(dmax<=30?5:dmax<=60?10:20);
  const tm=Math.ceil(tmax/ts)*ts,dm=Math.ceil(dmax/ds)*ds,x0=100,y0=250,W=480,H=210;
  const X=t=>x0+t/tm*W,Y=d=>y0-d/dm*H,f=n=>n.toFixed(1);
  let b='';
  for(let t=0;t<=tm;t+=ts)b+=h.line(f(X(t)),y0,f(X(t)),y0-H,1,'stroke-opacity=".3"')+h.text(f(X(t)),y0+24,t,18);
  const ls=o.labelStep||ds;for(let d=0;d<=dm;d+=ds)b+=h.line(x0,f(Y(d)),x0+W,f(Y(d)),1,'stroke-opacity=".3"')+(d%ls===0?h.text(x0-10,f(Y(d))+6,d,18,'end'):'');
  b+=h.line(x0,y0-H-8,x0,y0,3)+h.line(x0,y0,x0+W+10,y0,3);
  const names=o.names===false?null:(o.names||secs.map((g,i)=>String.fromCharCode(65+i)));
  secs.forEach((g,i)=>{
   const a=pts[i],c=pts[i+1];b+=h.line(f(X(a[0])),f(Y(a[1])),f(X(c[0])),f(Y(c[1])),5);
   if(names){const mx=(X(a[0])+X(c[0]))/2,my=(Y(a[1])+Y(c[1]))/2;b+=g.v?h.text(f(mx-22),f(my-8),names[i],26):h.text(f(mx),f(my-14),names[i],26);}
  });
  for(const p of pts)b+=h.circle(f(X(p[0])),f(Y(p[1])),4.5,2,'currentColor');
  b+=h.text(x0+W/2,y0+52,'Time (s)',22)+`<text transform="rotate(-90 34 ${y0-H/2})" x="34" y="${y0-H/2}" text-anchor="middle" fill="currentColor" style="font-size:22px">Distance (m)</text>`;
  return {type:'svg',svg:h.svgWrap(b,'Distance–time graph with labelled sections','0 0 640 312')};
 }
 // Curve shapes on small axes. kind: fast (speeding up), slow (slowing down), steady, stopped.
 const shapeY=(kind,u)=>kind==='fast'?u*u:kind==='slow'?1-(1-u)*(1-u):kind==='steady'?u:.55;
 function shapePath(kind,x,y,w,hh){const p=[];for(let i=0;i<=24;i++){const u=i/24,v=shapeY(kind,u);p.push(`${(x+u*w).toFixed(1)},${(y+hh-(kind==='stopped'?v*hh:(.04+.92*v)*hh)).toFixed(1)}`);}return `<polyline points="${p.join(' ')}" fill="none" stroke="currentColor" stroke-width="5"/>`;}
 function shapeSvg(h,kinds,letters){   // 1 big graph, or 4 small ones in a row
  const one=kinds.length===1;let b='';
  kinds.forEach((k,i)=>{
   const w=one?300:110,hh=one?160:110,x=one?170:30+i*152,y=one?40:40;
   b+=h.line(x,y-8,x,y+hh,3)+h.line(x,y+hh,x+w+8,y+hh,3)+shapePath(k,x,y,w,hh);
   b+=one?h.text(x+w/2,y+hh+34,'Time',22)+`<text transform="rotate(-90 ${x-20} ${y+hh/2})" x="${x-20}" y="${y+hh/2}" text-anchor="middle" fill="currentColor" style="font-size:22px">Distance</text>`:h.text(x+w/2,y+hh+44,letters[i],30);
  });
  return {type:'svg',svg:h.svgWrap(b,one?'A distance–time graph shape':'Four distance–time graph shapes labelled A to D',one?'0 0 640 260':'0 0 640 250')};
 }
 // Two straight lines P and Q on one graph, each [t0,d0,t1,d1].
 function twoLineSvg(h,P,Qq){
  const tmax=10,dmax=60,x0=100,y0=250,W=480,H=210,X=t=>x0+t/tmax*W,Y=d=>y0-d/dmax*H;let b='';
  for(let t=0;t<=tmax;t+=2)b+=h.line(X(t),y0,X(t),y0-H,1,'stroke-opacity=".3"')+h.text(X(t),y0+24,t,18);
  for(let d=0;d<=dmax;d+=10)b+=h.line(x0,Y(d),x0+W,Y(d),1,'stroke-opacity=".3"')+h.text(x0-10,Y(d)+6,d,18,'end');
  b+=h.line(x0,y0-H-8,x0,y0,3)+h.line(x0,y0,x0+W+10,y0,3);
  [[P,'P'],[Qq,'Q']].forEach(([l,name])=>{b+=h.line(X(l[0]),Y(l[1]),X(l[2]),Y(l[3]),5)+h.text(X(l[2])+18,Y(l[3])+8,name,26,'start');});
  b+=h.text(x0+W/2,y0+52,'Time (s)',22)+`<text transform="rotate(-90 34 ${y0-H/2})" x="34" y="${y0-H/2}" text-anchor="middle" fill="currentColor" style="font-size:22px">Distance (m)</text>`;
  return {type:'svg',svg:h.svgWrap(b,'Distance–time graph with two lines, P and Q','0 0 640 312')};
 }

 // =====================================================================
 // 1. Types of force
 // =====================================================================
 const S1=skill('forces','Types of force','A force is a push or a pull. It is measured in newtons (N), not kilograms. Contact forces need touching: a push, friction, tension, air resistance and the support force. Non-contact forces work across a gap: gravity (weight), magnetic and electric forces.','A force is a push or a ____ → pull');
 card(S1,'FT01',1,(r,h)=>{const a=h.pick([['A force is a push or a '+Q,'pull',['pulls']],['A force is a pull or a '+Q,'push',['pushes']]],r);return {cloze:a[0],answer:a[1],aliases:a[2],caseSensitive:false,explanation:'A force is a push or a pull.'};});
 card(S1,'FT02',1,(r,h)=>({cloze:h.pick(['Force is measured in '+Q,'The unit of force is the '+Q],r),answer:'newtons',aliases:['newton','N'],caseSensitive:false,explanation:'Force is measured in newtons (N), not kilograms.'}));
 card(S1,'FT03',1,(r,h)=>({cloze:h.pick(['The symbol for the newton is '+Q,'A force of 5 newtons is written 5 '+Q,'The unit symbol for force is '+Q],r),answer:'N',caseSensitive:true,explanation:'The newton is written N, with a capital letter.'}));
 card(S1,'FT04',1,(r,h)=>{const sets=[['kg','m/s','s'],['kg','m','s'],['kg','m/s²','m'],['m','s','kg']];return {cloze:'One unit of force is '+Q,answer:'N',choices:mc(h,r,'N',h.pick(sets,r)),explanation:'Force is measured in newtons (N). kg is for mass, m for distance, s for time and m/s for speed.'};});
 card(S1,'FT05',1,(r,h)=>{
  const L=h.shuffle(['A','B','C','D'],r),at={up:L[0],down:L[1],left:L[2],right:L[3]};
  const names={up:['support',['normal','support force','normal force','normal contact force']],down:['weight',['gravity','weight force','force of gravity','gravitational force']],left:['friction',['friction force']],right:['push',['applied','pushing','applied force','thrust','push force']]};
  const k=h.pick(['up','down','left','right'],r);
  return {cloze:`A box is pushed along a table.\nArrow ${at[k]} shows the ${Q} force`,answer:names[k][0],aliases:names[k][1],caseSensitive:false,
   visual:forceSvg(h,{up:{n:6,label:at.up},down:{n:6,label:at.down},left:{n:3,label:at.left},right:{n:5,label:at.right}},{obj:'box'}),
   explanation:{up:'The table pushes up on the box: the support force.',down:'Gravity pulls the box down: its weight.',left:'Friction acts against the motion.',right:'The student pushes the box along.'}[k]};});
 const DESC_A=[['The force that tries to stop two surfaces sliding past each other is '+Q,'friction',[]],['A table pushes up on a book. This upward force is the '+Q+' force','support',['normal','normal contact','support force','normal force']],['The pull in a stretched rope is called '+Q,'tension',[]]];
 const DESC_B=[['The pull of gravity on an object is called its '+Q,'weight',['gravity','weight force','force of gravity']],['The force of the air pushing against a moving cyclist is called air '+Q,'resistance',['drag']],['A rope pulls a sled. This force is a push or a '+Q,'pull',['pulls']]];
 const expl={friction:'Friction opposes sliding between surfaces.',support:'A surface pushes up on an object resting on it: the support force.',tension:'A stretched rope or string pulls with a tension force.',weight:'Weight is the pull of gravity on an object.',resistance:'Air resistance pushes against anything moving through the air.',pull:'A rope can only pull.'};
 card(S1,'FT06',1,(r,h)=>{const d=h.pick(DESC_A,r);return {cloze:d[0],answer:d[1],aliases:d[2],caseSensitive:false,explanation:expl[d[1]]};});
 card(S1,'FT07',1,(r,h)=>{const d=h.pick(DESC_B,r);return {cloze:d[0],answer:d[1],aliases:d[2],caseSensitive:false,explanation:expl[d[1]]};});
 const CON=[['the push of a hand','contact'],['friction','contact'],['tension in a rope','contact'],['air resistance','contact'],['the support force from the ground','contact'],['gravity','non-contact'],['the force between two magnets','non-contact'],['the pull of a rubbed balloon on small pieces of paper','non-contact']];
 const conCard=(code,items)=>card(S1,code,2,(r,h)=>{const [name,kind]=h.pick(items,r);return {cloze:`${name[0].toUpperCase()+name.slice(1)} is a ${Q} force`,answer:kind,choices:['contact','non-contact'],explanation:kind==='contact'?`${name[0].toUpperCase()+name.slice(1)} needs the objects to touch: a contact force.`:`${name[0].toUpperCase()+name.slice(1)} acts across a gap: a non-contact force.`};});
 conCard('FT08',[CON[0],CON[5]]);conCard('FT09',[CON[1],CON[6]]);conCard('FT10',[CON[2],CON[7]]);conCard('FT11',[CON[3],CON[5]]);
 card(S1,'FT12',2,(r,h)=>{const non=h.pick(['gravity','the force between two magnets','the pull of a rubbed balloon on paper'],r),con=h.shuffle(['friction','a push from a hand','tension in a rope','air resistance','the support force from a table'],r).slice(0,3);return {cloze:'A non-contact force is '+Q,answer:non,choices:mc(h,r,non,con),explanation:'Gravity, magnetic and electric forces act across a gap. The others need touching.'};});
 card(S1,'FT13',2,(r,h)=>{const con=h.pick(['friction','a push from a hand','tension in a rope','air resistance'],r);return {cloze:'A contact force is '+Q,answer:con,choices:mc(h,r,con,['gravity','the force between two magnets','the pull of a rubbed balloon on paper']),explanation:`${con[0].toUpperCase()+con.slice(1)} needs the objects to touch. Gravity, magnetic and electric forces act across a gap.`};});
 card(S1,'FT14',3,(r,h)=>({cloze:h.pick(['A trolley is pulled with a force of 12 '+Q,'A student pushes a box with a force of 30 '+Q,'The force on a car is 500 '+Q],r),answer:'N',aliases:['newtons','newton'],caseSensitive:true,explanation:'Forces are measured in newtons, N. Not kg.'}));
 card(S1,'FT15',3,(r,h)=>{const n=h.pick([20,30,45,60],r);return {cloze:'This measurement is a force: '+Q,answer:n+' N',choices:mc(h,r,n+' N',[n+' kg',n+' m',n+' s']),explanation:'Newtons (N) measure force. kg is mass, m is distance and s is time.'};});
 card(S1,'FT16',3,(r,h)=>{const a=h.pick(['a pull from a rope','a push from a hand'],r);return {cloze:'One example of a force is '+Q,answer:a,choices:mc(h,r,a,['a speed of 5 m/s','a mass of 5 kg','a time of 5 s']),explanation:'A force is a push or a pull. Speed, mass and time are not forces.'};});
 card(S1,'FT17',3,(r,h)=>{const m=h.pick([3,4,6,8],r);return {cloze:`A bag has a mass of ${m} kg. Its weight is a force, measured in ${Q}`,answer:'newtons',aliases:['newton','N'],caseSensitive:false,explanation:'Mass is in kg. Weight is a force, so it is measured in newtons (N).'};});

 // =====================================================================
 // 2. Net force on one line
 // =====================================================================
 const S2=skill('net','Net force on one line','Net force is what is left when the forces are added up. Forces in opposite directions subtract. Forces in the same direction add. The net force acts in the direction of the bigger force. Equal opposite forces are balanced: net force 0 N.','Right 10 N, left 4 N → net force 6 N right');
 const OBJ=['trolley','box','sled','crate','cart'];
 function opp(r,h,lo,hi,{equal=false,names=null}={}){
  const big=h.int(lo+1,hi,r),small=equal?big:h.int(lo,big-1,r),rightBig=r()<.5;
  const R=equal?big:rightBig?big:small,L=equal?big:rightBig?small:big;
  const nm=names||['',''];
  return {L,R,net:Math.abs(R-L),dir:equal?'':R>L?'right':'left',names:nm};
 }
 const oppSvg=(h,o,obj,names)=>forceSvg(h,{left:{n:o.L,label:names?names[1]+' '+o.L+' N':undefined},right:{n:o.R,label:names?names[0]+' '+o.R+' N':undefined}},{obj});
 const netSize=(code,tier,lo,hi,opts={})=>card(S2,code,tier,(r,h)=>{
  const names=opts.names?h.pick(opts.names,r):null,o=opp(r,h,lo,hi,opts),obj=h.pick(OBJ,r);
  return {cloze:`Net force = ${Q} N`,answer:String(o.net),answerUnit:'N',visual:oppSvg(h,o,obj,names),meta:{kind:'net1',L:o.L,R:o.R},
   explanation:o.net?`${Math.max(o.L,o.R)} − ${Math.min(o.L,o.R)} = ${o.net} N, to the ${o.dir}.`:`${o.L} − ${o.R} = 0 N. The forces are balanced.`};});
 netSize('NF01',1,1,9);netSize('NF02',1,2,9);netSize('NF03',1,3,12);
 netSize('NF04',1,3,12,{equal:true});
 netSize('NF05',1,4,15);
 netSize('NF06',1,5,20,{names:[['push','friction'],['pull','friction'],['thrust','air resistance']]});
 const netDir=(code,names)=>card(S2,code,2,(r,h)=>{
  const o=opp(r,h,2,14,{names}),nm=names?h.pick(names,r):null,obj=h.pick(OBJ,r);
  return {cloze:`The net force acts to the ${Q}`,answer:o.dir,aliases:['to the '+o.dir],caseSensitive:false,visual:oppSvg(h,o,obj,nm),meta:{kind:'net1dir',L:o.L,R:o.R},
   explanation:`${Math.max(o.L,o.R)} N is bigger than ${Math.min(o.L,o.R)} N, so the net force is to the ${o.dir}.`};});
 netDir('NF07');netDir('NF08');netDir('NF09',[['push','friction'],['pull','friction'],['thrust','air resistance']]);
 const netMC=code=>card(S2,code,3,(r,h)=>{
  const o=opp(r,h,3,15),obj=h.pick(OBJ,r),opp_=OPP[o.dir],sum=o.L+o.R;
  const ans=`${o.net} N ${o.dir}`;
  return {cloze:'The net force is '+Q,answer:ans,choices:mc(h,r,ans,[`${o.net} N ${opp_}`,`${sum} N ${o.dir}`,`${o.net} N`]),visual:oppSvg(h,o,obj),meta:{kind:'net1mc',L:o.L,R:o.R},
   explanation:`Opposite forces subtract: ${Math.max(o.L,o.R)} − ${Math.min(o.L,o.R)} = ${o.net} N. It acts in the direction of the bigger force, to the ${o.dir}.`};});
 netMC('NF10');netMC('NF11');netMC('NF12');netMC('NF13');
 card(S2,'NF14',4,(r,h)=>{
  const a=h.int(4,15,r),b=h.int(3,12,r),dir=r()<.5?'left':'right',obj=h.pick(['car','sled','trolley'],r),n=a+b;
  return {cloze:`Two people push a ${obj} the same way.\nNet force = ${Q} N`,answer:String(n),answerUnit:'N',visual:forceSvg(h,{[dir]:{n,label:`${a} N + ${b} N`}},{obj}),meta:{kind:'same2',a,b},
   explanation:`Forces in the same direction add: ${a} + ${b} = ${n} N.`};});
 card(S2,'NF15',4,(r,h)=>{
  const a=h.int(3,9,r),b=h.int(2,7,r),c=h.int(2,a+b-1,r),net=a+b-c,obj=h.pick(OBJ,r);
  return {cloze:`Net force = ${Q} N`,answer:String(net),answerUnit:'N',visual:{type:'svg',svg:h.svgWrap(
   h.rect(250,100,140,60,3)+h.text(320,138,obj,20)+
   h.arrow(390,118,390+Math.max(40,a*10),118,4,14)+h.text(396,98,a+' N',22,'start')+
   h.arrow(390,146,390+Math.max(40,b*10),146,4,14)+h.text(396,184,b+' N',22,'start')+
   h.arrow(250,132,250-Math.max(40,c*10),132,4,14)+h.text(244,112,c+' N',22,'end'),'Three forces on an object: two to the right and one to the left')},meta:{kind:'three',a,b,c},
   explanation:`Add the forces that point the same way: ${a} + ${b} = ${a+b} N right. Then subtract the force the other way: ${a+b} − ${c} = ${net} N right.`};});
 card(S2,'NF16',4,(r,h)=>{
  const a=h.int(2,9,r),b=h.int(2,9,r),c=h.int(1,a+b-1,r),net=a+b-c,right=r()<.5;
  const ans=`${net} N ${right?'right':'left'}`;
  const F=right?{right:{n:a+b,label:`${a} N + ${b} N`},left:{n:c}}:{left:{n:a+b,label:`${a} N + ${b} N`},right:{n:c}};
  return {cloze:'The net force is '+Q,answer:ans,choices:mc(h,r,ans,[`${net} N ${right?'left':'right'}`,`${a+b+c} N ${right?'right':'left'}`,`${net} N`]),visual:forceSvg(h,F,{obj:'crate'}),meta:{kind:'three2',a,b,c},
   explanation:`Same direction add: ${a} + ${b} = ${a+b} N. Then subtract ${c} N: ${net} N, in the direction of the bigger side (${right?'right':'left'}).`};});
 // one force unknown
 card(S2,'NF17',5,(r,h)=>{const known=h.int(8,16,r),net=h.int(2,known-3,r),right=r()<.5,obj=h.pick(OBJ,r);
  const F=right?{right:{n:known},left:{n:0,unknown:true}}:{left:{n:known},right:{n:0,unknown:true}};
  const unk=known-net;
  return {cloze:`Net force: ${net} N ${right?'right':'left'}\n${right?'Left':'Right'} force = ${Q} N`,answer:String(unk),answerUnit:'N',visual:forceSvg(h,F,{obj}),meta:{kind:'unk',known,net,unk},
   explanation:`The net force is ${net} N, so the other force is ${known} − ${net} = ${unk} N.`};});
 card(S2,'NF18',5,(r,h)=>{const known=h.int(5,18,r),obj=h.pick(OBJ,r),right=r()<.5;
  const F=right?{right:{n:known},left:{n:0,unknown:true}}:{left:{n:known},right:{n:0,unknown:true}};
  return {cloze:`The forces are balanced.\n${right?'Left':'Right'} force = ${Q} N`,answer:String(known),answerUnit:'N',visual:forceSvg(h,F,{obj}),meta:{kind:'unkbal',known},
   explanation:`Balanced forces are equal and opposite, so the unknown force is ${known} N.`};});
 card(S2,'NF19',5,(r,h)=>{const big=h.int(10,20,r),net=h.int(2,big-3,r),right=r()<.5,obj=h.pick(OBJ,r);
  const F=right?{left:{n:big},right:{n:0,unknown:true}}:{right:{n:big},left:{n:0,unknown:true}};
  const unk=big-net;
  return {cloze:`Net force: ${net} N ${right?'left':'right'}\n${right?'Right':'Left'} force = ${Q} N`,answer:String(unk),answerUnit:'N',visual:forceSvg(h,F,{obj}),meta:{kind:'unk',known:big,net,unk},
   explanation:`The net force is ${net} N, so the other force is ${big} − ${net} = ${unk} N.`};});

 // =====================================================================
 // 3. Net force with four forces
 // =====================================================================
 const S3=skill('net4','Net force with four forces','Forces at right angles do not affect each other. Work out the sideways forces (left and right) on their own, then the up and down forces on their own. Each pair works like a one-line net force: subtract, and the bigger force wins.','Up 8 N, down 5 N, left 3 N, right 3 N → net force 3 N up, sideways balanced');
 function four(r,h,{hbal=false,vbal=false}={}){
  let U,D,Lf,Rt;
  if(vbal){U=D=h.int(3,9,r);}else{U=h.int(2,9,r);D=h.int(2,9,r);while(D===U)D=h.int(2,9,r);}
  if(hbal){Lf=Rt=h.int(3,9,r);}else{Lf=h.int(2,9,r);Rt=h.int(2,9,r);while(Rt===Lf)Rt=h.int(2,9,r);}
  return {U,D,Lf,Rt,hnet:Rt-Lf,vnet:U-D};
 }
 const fourSvg=(h,f,obj)=>forceSvg(h,{up:{n:f.U},down:{n:f.D},left:{n:f.Lf},right:{n:f.Rt}},{obj,alt:'Four forces on an object: up, down, left and right'});
 const objs4=['box','drone','ball','crate'];
 const sidewaysCard=(code,tier,opts)=>card(S3,code,tier,(r,h)=>{const f=four(r,h,opts),o=h.pick(objs4,r);return {cloze:`Sideways net force = ${Q} N`,answer:String(Math.abs(f.hnet)),answerUnit:'N',visual:fourSvg(h,f,o),meta:{kind:'four',f,ask:'h'},
  explanation:`Sideways only: ${Math.max(f.Lf,f.Rt)} − ${Math.min(f.Lf,f.Rt)} = ${Math.abs(f.hnet)} N, to the ${f.hnet>0?'right':'left'}. Up and down forces do not change this.`};});
 const verticalCard=(code,tier,opts)=>card(S3,code,tier,(r,h)=>{const f=four(r,h,opts),o=h.pick(objs4,r);return {cloze:`Up and down net force = ${Q} N`,answer:String(Math.abs(f.vnet)),answerUnit:'N',visual:fourSvg(h,f,o),meta:{kind:'four',f,ask:'v'},
  explanation:`Up and down only: ${Math.max(f.U,f.D)} − ${Math.min(f.U,f.D)} = ${Math.abs(f.vnet)} N, ${f.vnet>0?'up':'down'}. Sideways forces do not change this.`};});
 sidewaysCard('NG01',1,{vbal:true});sidewaysCard('NG02',1,{vbal:true});verticalCard('NG03',1,{hbal:true});verticalCard('NG04',1,{hbal:true});sidewaysCard('NG05',1,{vbal:true});
 sidewaysCard('NG06',2,{});sidewaysCard('NG07',2,{});verticalCard('NG08',2,{});verticalCard('NG09',2,{});sidewaysCard('NG10',2,{});verticalCard('NG11',2,{});
 card(S3,'NG12',3,(r,h)=>{const f=four(r,h),o=h.pick(objs4,r);const d=f.hnet>0?'right':'left';return {cloze:`The sideways net force acts to the ${Q}`,answer:d,aliases:['to the '+d],caseSensitive:false,visual:fourSvg(h,f,o),meta:{kind:'four',f,ask:'hdir'},explanation:`Right ${f.Rt} N and left ${f.Lf} N: the bigger force is to the ${d}.`};});
 card(S3,'NG13',3,(r,h)=>{const f=four(r,h),o=h.pick(objs4,r);const d=f.vnet>0?'up':'down';return {cloze:`The up and down net force acts ${Q}`,answer:d,aliases:[d==='up'?'upwards':'downwards'],caseSensitive:false,visual:fourSvg(h,f,o),meta:{kind:'four',f,ask:'vdir'},explanation:`Up ${f.U} N and down ${f.D} N: the bigger force is ${d}.`};});
 const fourMC=code=>card(S3,code,3,(r,h)=>{
  const f=four(r,h),o=h.pick(objs4,r),hd=f.hnet>0?'right':'left',vd=f.vnet>0?'up':'down',hn=Math.abs(f.hnet),vn=Math.abs(f.vnet);
  const ans=`${hn} N ${hd} and ${vn} N ${vd}`,total=f.U+f.D+f.Lf+f.Rt;
  return {cloze:'The net force is '+Q,answer:ans,choices:mc(h,r,ans,[`${hn} N ${OPP[hd]} and ${vn} N ${vd}`,`${hn} N ${hd} and ${vn} N ${OPP[vd]}`,`${total} N`]),visual:fourSvg(h,f,o),meta:{kind:'four',f,ask:'mc'},
   explanation:`Sideways: ${Math.max(f.Lf,f.Rt)} − ${Math.min(f.Lf,f.Rt)} = ${hn} N ${hd}. Up and down: ${Math.max(f.U,f.D)} − ${Math.min(f.U,f.D)} = ${vn} N ${vd}.`};});
 fourMC('NG14');fourMC('NG15');fourMC('NG16');
 const zeroCard=code=>card(S3,code,3,(r,h)=>{
  const case_=h.pick(['both','h','v'],r),f=four(r,h,{hbal:case_!=='h',vbal:case_!=='v'}),o=h.pick(objs4,r);
  return {cloze:'The net force on the object is zero: '+Q,answer:case_==='both'?'true':'false',choices:['true','false'],visual:fourSvg(h,f,o),meta:{kind:'four',f,ask:'zero'},
   explanation:case_==='both'?'Left equals right and up equals down, so the net force is zero.':case_==='h'?'Up equals down, but left and right are not equal. The net force is not zero.':'Left equals right, but up and down are not equal. The net force is not zero.'};});
 zeroCard('NG17');zeroCard('NG18');

 // =====================================================================
 // 4. Balanced forces at constant speed
 // =====================================================================
 const S4=skill('balanced','Balanced forces and constant speed','Balanced forces are equal and opposite, so the net force is zero. Balanced forces do not mean there are no forces. With zero net force, an object at rest stays at rest and a moving object keeps the same speed in a straight line. A moving object does not need a net force to keep moving. A net force changes the speed or the direction.','A car at constant speed: net force = 0 N');
 card(S4,'BF01',1,(r,h)=>{const o=h.pick(['A book on a table','A parked car','A lamp hanging from the ceiling'],r);return {cloze:`${o} is at rest.\nNet force = ${Q} N`,answer:'0',answerUnit:'N',meta:{kind:'zero'},explanation:'An object at rest has balanced forces, so the net force is 0 N.'};});
 card(S4,'BF02',1,(r,h)=>{const o=h.pick(['A cyclist','A train','A ship','A car'],r);return {cloze:`${o} moves at a constant speed in a straight line.\nNet force = ${Q} N`,answer:'0',answerUnit:'N',meta:{kind:'zero'},explanation:'Constant speed in a straight line means the forces are balanced. The net force is 0 N.'};});
 card(S4,'BF03',1,(r,h)=>{const o=h.pick(['trolley','skater','boat'],r);return {cloze:`The forces on a moving ${o} are balanced.\nIts speed will ${Q}`,answer:'stay the same',choices:['stay the same','increase','decrease'],explanation:'Balanced forces mean zero net force, so the speed does not change.'};});
 card(S4,'BF04',1,(r,h)=>{const t=r()<.5;return {cloze:t?'True or false?\nBalanced forces are equal in size and opposite in direction.\n'+Q:'True or false?\nBalanced forces means no forces are acting.\n'+Q,answer:t?'true':'false',choices:['true','false'],explanation:t?'Balanced forces are equal and opposite, so they cancel out.':'Forces are still acting. They are equal and opposite, so they cancel out.'};});
 card(S4,'BF05',1,(r,h)=>({cloze:h.pick(['When the forces on an object are unbalanced, its speed or direction '+Q,'If there is a net force on an object, its speed or direction '+Q],r),answer:'changes',aliases:['change','will change'],caseSensitive:false,explanation:'A net force changes the speed or direction.'}));
 card(S4,'BF06',1,(r,h)=>({cloze:'An object keeps the same speed and direction unless an '+Q+' force acts on it',answer:'unbalanced',aliases:['net','resultant'],caseSensitive:false,explanation:'This is Newton’s first law: only an unbalanced (net) force changes the motion.'}));
 const eqCard=(code,tier,mk)=>card(S4,code,tier,(r,h)=>mk(r,h));
 eqCard('BF07',2,(r,h)=>{const [a,b]=h.pick([['push','friction'],['pull','friction']],r),n=h.int(5,25,r),obj=h.pick(OBJ,r);
  return {cloze:`The ${obj} moves at constant speed.\nFriction = ${Q} N`,answer:String(n),answerUnit:'N',visual:forceSvg(h,{right:{n,label:a+' '+n+' N'},left:{n:0,unknown:true,label:b+' ?'}},{obj}),meta:{kind:'eq',n},explanation:`Constant speed means balanced forces, so friction equals the ${a}: ${n} N.`};});
 eqCard('BF08',2,(r,h)=>{const n=h.pick([300,400,500,600,700,800],r),who=h.pick(['parachutist','skydiver'],r);
  return {cloze:`A ${who} falls at a steady speed.\nAir resistance = ${Q} N`,answer:String(n),answerUnit:'N',visual:forceSvg(h,{down:{n,label:'weight '+n+' N'},up:{n:0,unknown:true,label:'air resistance ?'}},{obj:who}),meta:{kind:'eq',n},explanation:`Steady speed means balanced forces. Air resistance equals the weight: ${n} N.`};});
 eqCard('BF09',2,(r,h)=>{const n=h.pick([2,4,6,8],r),u=h.pick(['A drone','A toy helicopter'],r);
  return {cloze:`${u} hovers (not moving up or down).\nLift = ${Q} N`,answer:String(n),answerUnit:'N',visual:forceSvg(h,{down:{n,label:'weight '+n+' N'},up:{n:0,unknown:true,label:'lift ?'}},{obj:u.slice(2)}),meta:{kind:'eq',n},explanation:`Hovering means balanced forces, so lift equals weight: ${n} N.`};});
 eqCard('BF10',2,(r,h)=>{const push=h.int(10,20,r),fr=h.int(4,push-3,r),air=push-fr;
  return {cloze:`A cart moves at constant speed.\nAir resistance = ${Q} N`,answer:String(air),answerUnit:'N',visual:{type:'svg',svg:h.svgWrap(
   h.rect(250,100,140,60,3)+h.text(320,138,'cart',20)+h.arrow(390,130,390+push*10,130,4,14)+h.text(396,114,'push '+push+' N',22,'start')+
   h.arrow(250,118,250-fr*10,118,4,14)+h.text(244,98,'friction '+fr+' N',22,'end')+
   '<g stroke-dasharray="9 7">'+h.arrow(250,146,190,146,4,14)+'</g>'+h.text(244,186,'air resistance ?',22,'end'),'Forces on a cart moving at constant speed; air resistance is unknown')},
   meta:{kind:'air',push,fr,air},explanation:`Constant speed means balanced. The backwards forces add up to the push: ${fr} + air resistance = ${push}, so air resistance = ${air} N.`};});
 eqCard('BF11',2,(r,h)=>{const n=h.pick([1000,1500,2000,2500,3000],r);return {cloze:`A car travels at constant speed.\nThe engine force is ${n} N.\nThe total force against it = ${Q} N`,answer:String(n),answerUnit:'N',meta:{kind:'eq',n},explanation:`Constant speed means balanced forces. The forces against the car add up to ${n} N.`};});
 eqCard('BF12',2,(r,h)=>{const fr=h.int(10,20,r),extra=h.int(3,8,r);return {cloze:`A box moves at constant speed with a ${fr} N push.\nFriction is ${fr} N.\nThe push becomes ${fr+extra} N.\nNet force = ${Q} N`,answer:String(extra),answerUnit:'N',meta:{kind:'extra',fr,extra},explanation:`Friction stays ${fr} N: ${fr+extra} − ${fr} = ${extra} N forwards. The box speeds up.`};});
 card(S4,'BF13',3,(r,h)=>{const ans='no force is needed to keep it moving';return {cloze:h.pick(['A puck slides at constant speed on very smooth ice.','A hockey puck glides at constant speed across smooth ice.','A curling stone slides at constant speed on very smooth ice.'],r)+'\nIt keeps moving because '+Q,answer:ans,choices:mc(h,r,ans,['the push it was given is still acting on it','a forward force is always needed to keep it moving','gravity pulls it forward']),explanation:'No net force is needed to keep an object moving at a constant speed. A push does not stay "inside" an object.'};});
 card(S4,'BF14',3,(r,h)=>{
  const good=h.pick(['a cyclist riding at a steady speed in a straight line','a lift moving up at a steady speed','a parachutist falling at a steady speed','a book resting on a shelf'],r);
  const bad=h.shuffle(['a car speeding up','a ball falling faster and faster','a train slowing down','a rocket speeding up on launch','a car going round a bend at constant speed'],r).slice(0,3);
  return {cloze:'An object with balanced forces is '+Q,answer:good,choices:mc(h,r,good,bad),explanation:'Balanced forces mean no change in speed or direction. Speeding up, slowing down and turning all need a net force.'};});
 card(S4,'BF15',3,(r,h)=>{const o=h.pick(['car','skater','ship','cyclist'],r),ans='at constant speed in a straight line the forces are balanced';
  return {cloze:`A student says: "The ${o} is moving, so the forces on it must be unbalanced."\nThe student is wrong because `+Q,answer:ans,choices:mc(h,r,ans,['forces never act on moving objects','balanced forces stop an object moving','only fast objects have balanced forces']),explanation:'A moving object only needs a net force to change its speed or direction. At constant speed the forces are balanced.'};});
 card(S4,'BF16',3,(r,h)=>{const n=h.pick([2000,3000,4000,5000],r),ans=`${n} N backwards`;
  return {cloze:`A ship moves at constant speed in a straight line.\nThe engine force forwards is ${n} N.\nThe water resistance is `+Q,answer:ans,choices:mc(h,r,ans,[`less than ${n} N backwards`,`more than ${n} N backwards`,'0 N']),explanation:`Constant speed means balanced forces, so the resistance is equal and opposite: ${n} N backwards.`};});
 card(S4,'BF17',3,(r,h)=>{return {cloze:h.pick(['A spacecraft is far from any planet. Its engines are off and it is moving.','A probe in deep space has its engines off and is moving.','A satellite far from any planet drifts with its engines off.'],r)+'\nIts speed will '+Q,answer:'stay the same',choices:['stay the same','slow down and stop','keep speeding up'],explanation:'There is no net force, so it keeps the same speed in a straight line.'};});

 // =====================================================================
 // 5. Speed, distance and time
 // =====================================================================
 const S5=skill('speed','Speed, distance and time','Speed = distance ÷ time (v = d ÷ t). Distance = speed × time (d = v × t). Time = distance ÷ speed (t = d ÷ v). Use matching units: metres and seconds give m/s; kilometres and hours give km/h. Always write the unit in your answer.','d = 60 m, t = 12 s → v = 5 m/s');
 const WHO=[['A walker',[1,2]],['A runner',[3,4,5,6,7,8]],['A cyclist',[4,5,6,8,10,12]],['A car',[10,15,20,25,30]],['A bus',[10,15,20,25]],['A train',[20,25,30,40]],['A bird',[5,10,15]]];
 const TIMES=[4,5,6,8,10,12,15,20,25,30,40];
 const trip=(r,h,tlist=TIMES)=>{const [who,vs]=h.pick(WHO,r),v=h.pick(vs,r),t=h.pick(tlist,r);return {who,v,t,d:v*t};};
 card(S5,'SP01',1,(r,h)=>{const v=h.int(2,9,r),t=h.int(3,10,r),d=v*t;return {cloze:`v = d ÷ t\nd = ${d} m\nt = ${t} s\nv = ${Q} m/s`,answer:String(v),answerUnit:'m/s',meta:{kind:'v',d,t,v},explanation:`v = d ÷ t = ${d} ÷ ${t} = ${v} m/s.`};});
 card(S5,'SP02',1,(r,h)=>{const v=h.int(2,9,r),t=h.int(3,10,r),d=v*t;return {cloze:`d = v × t\nv = ${v} m/s\nt = ${t} s\nd = ${Q} m`,answer:String(d),answerUnit:'m',meta:{kind:'d',v,t,d},explanation:`d = v × t = ${v} × ${t} = ${d} m.`};});
 card(S5,'SP03',1,(r,h)=>{const v=h.int(2,9,r),t=h.int(3,10,r),d=v*t;return {cloze:`t = d ÷ v\nd = ${d} m\nv = ${v} m/s\nt = ${Q} s`,answer:String(t),answerUnit:'s',meta:{kind:'t',d,v,t},explanation:`t = d ÷ v = ${d} ÷ ${v} = ${t} s.`};});
 card(S5,'SP04',1,(r,h)=>{const v=h.int(3,12,r),t=h.int(2,8,r),d=v*t;return {cloze:`v = d ÷ t\nd = ${d} m\nt = ${t} s\nv = ${Q} m/s`,answer:String(v),answerUnit:'m/s',meta:{kind:'v',d,t,v},explanation:`v = d ÷ t = ${d} ÷ ${t} = ${v} m/s.`};});
 card(S5,'SP05',1,(r,h)=>{const e=h.pick([['speed','v = d ÷ t',['v = d × t','v = t ÷ d','v = d + t'],'Speed = distance ÷ time.'],['distance','d = v × t',['d = v ÷ t','d = t ÷ v','d = v + t'],'Distance = speed × time.'],['time','t = d ÷ v',['t = d × v','t = v ÷ d','t = d − v'],'Time = distance ÷ speed.']],r);return {cloze:`The equation for ${e[0]} is `+Q,answer:e[1],choices:mc(h,r,e[1],e[2]),explanation:e[3]};});
 card(S5,'SP06',1,(r,h)=>({cloze:'One unit of speed is '+Q,answer:'m/s',choices:mc(h,r,'m/s',h.pick([['m','s','N'],['kg','m','s'],['N','s','m']],r)),explanation:'Speed is distance per time, such as metres per second (m/s).'}));
 const word=(kind)=>(r,h)=>{const o=trip(r,h);
  if(kind==='v')return {cloze:`${o.who} travels ${o.d} m in ${o.t} s.\nSpeed = ${Q} m/s`,answer:String(o.v),answerUnit:'m/s',meta:{kind:'v',d:o.d,t:o.t,v:o.v},explanation:`v = d ÷ t = ${o.d} ÷ ${o.t} = ${o.v} m/s.`};
  if(kind==='d')return {cloze:`${o.who} travels at ${o.v} m/s for ${o.t} s.\nDistance = ${Q} m`,answer:String(o.d),answerUnit:'m',meta:{kind:'d',v:o.v,t:o.t,d:o.d},explanation:`d = v × t = ${o.v} × ${o.t} = ${o.d} m.`};
  return {cloze:`${o.who} travels ${o.d} m at ${o.v} m/s.\nTime = ${Q} s`,answer:String(o.t),answerUnit:'s',meta:{kind:'t',d:o.d,v:o.v,t:o.t},explanation:`t = d ÷ v = ${o.d} ÷ ${o.v} = ${o.t} s.`};};
 ['v','d','t','v','d','t'].forEach((k,i)=>card(S5,'SP'+String(7+i).padStart(2,'0'),2,word(k)));
 const big=(kind)=>(r,h)=>{const [who,vs]=h.pick(WHO.slice(1),r),v=h.pick(vs,r),t=h.pick([15,20,25,30,40,50,60],r),d=v*t;
  if(kind==='v')return {cloze:`${who} travels ${d} m in ${t} s.\nSpeed = ${Q} m/s`,answer:String(v),answerUnit:'m/s',meta:{kind:'v',d,t,v},explanation:`v = d ÷ t = ${d} ÷ ${t} = ${v} m/s.`};
  if(kind==='d')return {cloze:`${who} travels at ${v} m/s for ${t} s.\nDistance = ${Q} m`,answer:String(d),answerUnit:'m',meta:{kind:'d',v,t,d},explanation:`d = v × t = ${v} × ${t} = ${d} m.`};
  return {cloze:`${who} travels ${d} m at ${v} m/s.\nTime = ${Q} s`,answer:String(t),answerUnit:'s',meta:{kind:'t',d,v,t},explanation:`t = d ÷ v = ${d} ÷ ${v} = ${t} s.`};};
 ['d','t','v','d'].forEach((k,i)=>card(S5,'SP'+String(13+i).padStart(2,'0'),3,big(k)));
 card(S5,'SP17',3,(r,h)=>{
  const pairs=[[[100,20],[60,10]],[[90,15],[48,8]],[[80,10],[63,9]],[[120,24],[70,10]],[[72,12],[45,5]],[[60,12],[44,8]]],pr=h.pick(pairs,r);
  const sp=pr.map(([d,t])=>d/t),fast=sp[0]>sp[1]?'A':'B';
  return {cloze:`Runner A: ${pr[0][0]} m in ${pr[0][1]} s\nRunner B: ${pr[1][0]} m in ${pr[1][1]} s\nThe faster runner is ${Q}`,answer:fast,choices:['A','B'],meta:{kind:'faster',sp},explanation:`A: ${pr[0][0]} ÷ ${pr[0][1]} = ${sp[0]} m/s. B: ${pr[1][0]} ÷ ${pr[1][1]} = ${sp[1]} m/s. ${fast} is faster.`};});
 card(S5,'SP18',3,(r,h)=>{
  const pairs=[[[200,40],[90,15]],[[150,30],[100,25]],[[75,15],[40,10]],[[240,30],[210,35]]],pr=h.pick(pairs,r).slice();
  const sw=r()<.5;if(sw)pr.reverse();const sp=pr.map(([d,t])=>d/t),fast=sp[0]>sp[1]?'A':'B';
  return {cloze:`Cyclist A: ${pr[0][0]} m in ${pr[0][1]} s\nCyclist B: ${pr[1][0]} m in ${pr[1][1]} s\nThe faster cyclist is ${Q}`,answer:fast,choices:['A','B'],meta:{kind:'faster',sp},explanation:`A: ${pr[0][0]} ÷ ${pr[0][1]} = ${sp[0]} m/s. B: ${pr[1][0]} ÷ ${pr[1][1]} = ${sp[1]} m/s. ${fast} is faster.`};});
 const kmh=(kind)=>(r,h)=>{const [who,vs]=h.pick([['A bus',[40,60,80]],['A car',[50,60,80,100]],['A train',[60,80,100,120]]],r),v=h.pick(vs,r),t=h.pick([2,3,4,5],r),d=v*t;
  if(kind==='v')return {cloze:`${who} travels ${d} km in ${t} h.\nSpeed = ${Q} km/h`,answer:String(v),answerUnit:'km/h',meta:{kind:'v',d,t,v},explanation:`v = d ÷ t = ${d} ÷ ${t} = ${v} km/h.`};
  if(kind==='d')return {cloze:`${who} travels at ${v} km/h for ${t} h.\nDistance = ${Q} km`,answer:String(d),answerUnit:'km',meta:{kind:'d',v,t,d},explanation:`d = v × t = ${v} × ${t} = ${d} km.`};
  return {cloze:`${who} travels ${d} km at ${v} km/h.\nTime = ${Q} h`,answer:String(t),answerUnit:'h',meta:{kind:'t',d,v,t},explanation:`t = d ÷ v = ${d} ÷ ${v} = ${t} h.`};};
 ['v','d','t'].forEach((k,i)=>card(S5,'SP'+String(19+i),4,kmh(k)));

 // =====================================================================
 // 6. Unit conversions before substituting
 // =====================================================================
 const S6=skill('units','Unit conversions','Change units before you use v = d ÷ t. 1 km = 1000 m. 1 minute = 60 s. 1 hour = 3600 s. To get speed in m/s you need distance in m and time in s.','1.2 km in 2 min → 1200 m ÷ 120 s = 10 m/s');
 const conv=(code,tier,text)=>card(S6,code,tier,text);
 conv('UC01',1,(r,h)=>{const x=h.pick([2,3,4,5,6,8,9,12],r);return {cloze:`${x} km = ${Q} m`,answer:String(x*1000),answerUnit:'m',meta:{kind:'conv',v:x*1000},explanation:`1 km = 1000 m, so ${x} km = ${x} × 1000 = ${x*1000} m.`};});
 conv('UC02',1,(r,h)=>{const x=h.pick([0.5,1.5,2.5,3.5,0.2,0.4,0.6,1.2,2.4],r);return {cloze:`${x} km = ${Q} m`,answer:num(x*1000),answerUnit:'m',meta:{kind:'conv',v:Math.round(x*1000)},explanation:`1 km = 1000 m, so ${x} km = ${x} × 1000 = ${num(x*1000)} m.`};});
 conv('UC03',1,(r,h)=>{const x=h.pick([2,3,4,5,6,8,10],r);return {cloze:`${x} min = ${Q} s`,answer:String(x*60),answerUnit:'s',meta:{kind:'conv',v:x*60},explanation:`1 minute = 60 s, so ${x} min = ${x} × 60 = ${x*60} s.`};});
 conv('UC04',1,(r,h)=>{const x=h.pick([0.5,1.5,2.5,4.5],r);return {cloze:`${x} min = ${Q} s`,answer:num(x*60),answerUnit:'s',meta:{kind:'conv',v:Math.round(x*60)},explanation:`1 minute = 60 s, so ${x} min = ${x} × 60 = ${num(x*60)} s.`};});
 conv('UC05',1,(r,h)=>{const x=h.pick([1,2,3],r);return {cloze:`${x} h = ${Q} s`,answer:String(x*3600),answerUnit:'s',meta:{kind:'conv',v:x*3600},explanation:`1 hour = 3600 s, so ${x} h = ${x} × 3600 = ${x*3600} s.`};});
 conv('UC06',1,(r,h)=>{const x=h.pick([0.5,1.5,0.25],r);return {cloze:`${x} h = ${Q} s`,answer:num(x*3600),answerUnit:'s',meta:{kind:'conv',v:Math.round(x*3600)},explanation:`1 hour = 3600 s, so ${x} h = ${x} × 3600 = ${num(x*3600)} s.`};});
 conv('UC07',1,(r,h)=>{const x=h.pick([2000,3500,4500,500,1500,6000],r);return {cloze:`${x} m = ${Q} km`,answer:num(x/1000),answerUnit:'km',meta:{kind:'conv',v:x/1000},explanation:`1000 m = 1 km, so ${x} m = ${x} ÷ 1000 = ${num(x/1000)} km.`};});
 conv('UC08',1,(r,h)=>{const x=h.pick([120,180,300,600,90,240],r);return {cloze:`${x} s = ${Q} min`,answer:num(x/60),answerUnit:'min',meta:{kind:'conv',v:x/60},explanation:`60 s = 1 minute, so ${x} s = ${x} ÷ 60 = ${num(x/60)} min.`};});
 conv('UC09',2,(r,h)=>{const c=[];for(const v of [2,4,5,8,10])for(const t of [50,100,200,250,400,500])if((v*t)%100===0)c.push([v,t]);const [v,t]=h.pick(c,r),d=v*t;
  return {cloze:`d = ${num(d/1000)} km\nt = ${t} s\nv = ${Q} m/s`,answer:String(v),answerUnit:'m/s',meta:{kind:'sp',dm:d,ts:t,v},explanation:`${num(d/1000)} km = ${d} m. v = d ÷ t = ${d} ÷ ${t} = ${v} m/s.`};});
 conv('UC10',2,(r,h)=>{const v=h.pick([1,2,3,4,5,6,8,10],r),tm=h.pick([1,2,3,4,5,10],r),d=v*60*tm;
  return {cloze:`d = ${d} m\nt = ${tm} min\nv = ${Q} m/s`,answer:String(v),answerUnit:'m/s',meta:{kind:'sp',dm:d,ts:tm*60,v},explanation:`${tm} min = ${tm*60} s. v = d ÷ t = ${d} ÷ ${tm*60} = ${v} m/s.`};});
 conv('UC11',2,(r,h)=>{const c=[];for(const v of [5,10,15,20])for(const tm of [1,2,3,5,10])if((v*60*tm)%100===0)c.push([v,tm]);const [v,tm]=h.pick(c,r),d=v*60*tm;
  return {cloze:`d = ${num(d/1000)} km\nt = ${tm} min\nv = ${Q} m/s`,answer:String(v),answerUnit:'m/s',meta:{kind:'sp',dm:d,ts:tm*60,v},explanation:`${num(d/1000)} km = ${d} m and ${tm} min = ${tm*60} s. v = ${d} ÷ ${tm*60} = ${v} m/s.`};});
 conv('UC12',2,(r,h)=>{const v=h.pick([2,4,5,6,8,10],r),tm=h.pick([2,3,5,10],r),d=v*60*tm;
  return {cloze:`A cyclist rides at ${v} m/s for ${tm} min.\nDistance = ${Q} m`,answer:String(d),answerUnit:'m',meta:{kind:'dist',v,ts:tm*60,d},explanation:`${tm} min = ${tm*60} s. d = v × t = ${v} × ${tm*60} = ${d} m.`};});
 conv('UC13',2,(r,h)=>{const c=[];for(const v of [2,4,5,8,10])for(const km of [0.4,0.8,1.2,2,2.4,3,4])if((km*1000)%v===0)c.push([v,km]);const [v,km]=h.pick(c,r),t=km*1000/v;
  return {cloze:`A runner covers ${km} km at ${v} m/s.\nTime = ${Q} s`,answer:num(t),answerUnit:'s',meta:{kind:'time',dm:km*1000,v,t},explanation:`${km} km = ${num(km*1000)} m. t = d ÷ v = ${num(km*1000)} ÷ ${v} = ${num(t)} s.`};});
 conv('UC14',2,(r,h)=>{const v=h.pick([5,10,15,20],r),tm=h.pick([2,3,4,5],r),d=v*60*tm,right=`${d} ÷ ${tm*60}`;
  return {cloze:`A student runs ${num(d/1000)} km in ${tm} min.\nSpeed in m/s = `+Q,answer:right,choices:mc(h,r,right,[`${num(d/1000)} ÷ ${tm}`,`${d} ÷ ${tm}`,`${num(d/1000)} ÷ ${tm*60}`]),explanation:`Convert first: ${num(d/1000)} km = ${d} m and ${tm} min = ${tm*60} s. Then ${d} ÷ ${tm*60}.`};});
 conv('UC15',3,(r,h)=>{const v=h.pick([5,10,15,20,25],r),th=h.pick([1,2],r),d=v*3.6*th;
  return {cloze:`d = ${num(d)} km\nt = ${th} h\nv = ${Q} m/s`,answer:String(v),answerUnit:'m/s',meta:{kind:'sp',dm:d*1000,ts:th*3600,v},explanation:`${num(d)} km = ${num(d*1000)} m and ${th} h = ${th*3600} s. v = ${num(d*1000)} ÷ ${th*3600} = ${v} m/s.`};});
 conv('UC16',3,(r,h)=>{const v=h.pick([10,15,20,25],r),th=h.pick([1,2],r),d=v*3.6*th;
  return {cloze:`A train travels at ${v} m/s for ${th} h.\nDistance = ${Q} km`,answer:num(d),answerUnit:'km',meta:{kind:'distkm',v,ts:th*3600},explanation:`${th} h = ${th*3600} s. d = ${v} × ${th*3600} = ${v*th*3600} m = ${num(d)} km.`};});
 conv('UC17',3,(r,h)=>{const v=h.pick([5,10,15,20],r),th=h.pick([1,2,3],r),d=v*3.6*th;
  return {cloze:`A boat travels ${num(d)} km at ${v} m/s.\nTime = ${Q} h`,answer:String(th),answerUnit:'h',meta:{kind:'timeh',dm:d*1000,v},explanation:`${num(d)} km = ${num(d*1000)} m. t = ${num(d*1000)} ÷ ${v} = ${th*3600} s = ${th} h.`};});
 conv('UC18',3,(r,h)=>{const v=h.pick([5,10,15,20],r),tm=h.pick([10,20,30],r),d=v*60*tm;
  return {cloze:`d = ${num(d/1000)} km\nt = ${tm} min\nv = ${Q} m/s`,answer:String(v),answerUnit:'m/s',meta:{kind:'sp',dm:d,ts:tm*60,v},explanation:`${num(d/1000)} km = ${d} m and ${tm} min = ${tm*60} s. v = ${d} ÷ ${tm*60} = ${v} m/s.`};});

 // =====================================================================
 // 7. Average speed
 // =====================================================================
 const S7=skill('avgspeed','Average speed','Average speed = total distance ÷ total time. Add up all the distances, add up all the times (include any time stopped), then divide. Do not average the speeds of the sections.','60 m in 10 s, then 60 m in 20 s → 120 ÷ 30 = 4 m/s');
 const cache={};
 // Candidate journeys, all with a whole-number average speed that differs from the mean of the section speeds.
 function cands(key,vs,ts,legsN,stops){
  if(cache[key])return cache[key];const out=[];
  const walk=(i,legs)=>{
   if(i===legsN){const d=legs.reduce((s,l)=>s+l.d,0),t=legs.reduce((s,l)=>s+l.t,0);
    for(const st of stops){const T=t+st;if(d%T===0){const avg=d/T;const sp=legs.map(l=>l.d/l.t);const mean=sp.reduce((a,b)=>a+b,0)/sp.length;if(new Set(sp).size>1&&Math.abs(avg-mean)>1e-9&&!sp.includes(avg))out.push({legs:legs.slice(),stop:st,d,t:T,avg,mean});}}
    return;}
   for(const v of vs)for(const t of ts)walk(i+1,[...legs,{d:v*t,t,v}]);
  };
  walk(0,[]);cache[key]=out;return out;
 }
 const mset=(c,r,h)=>h.pick(c,r);
 const legTexts=(legs,du,tu)=>legs.map((l,i)=>`Leg ${i+1}: ${l.d} ${du} in ${l.t} ${tu}`);
 const jLegs=(c,withStop,du='m',tu='s')=>{const L=c.legs.map(l=>({d:l.d,t:l.t}));if(withStop&&c.stop){L.splice(1,0,{stop:c.stop});}return L;};
 const pool=(key,legsN,stops,vs=[1,2,3,4,5,6,8,10],ts=[5,10,15,20])=>cands(key,vs,ts,legsN,stops);
 card(S7,'AV01',1,(r,h)=>{const c=mset(pool('2',2,[0]),r,h);return {cloze:`Total distance = ${Q} m`,answer:String(c.d),answerUnit:'m',visual:journeySvg(h,jLegs(c,false)),meta:{kind:'avtotal',c},explanation:`${c.legs[0].d} + ${c.legs[1].d} = ${c.d} m.`};});
 card(S7,'AV02',1,(r,h)=>{const c=mset(pool('2s',2,[5,10]),r,h);return {cloze:`Total time = ${Q} s`,answer:String(c.t),answerUnit:'s',visual:journeySvg(h,jLegs(c,true)),meta:{kind:'avtime',c},explanation:`${c.legs[0].t} + ${c.stop} + ${c.legs[1].t} = ${c.t} s. The time stopped counts.`};});
 const avg=(code,tier,key,legsN,stops,withStop)=>card(S7,code,tier,(r,h)=>{const c=mset(pool(key,legsN,stops),r,h),n=c.legs.length;
  return {cloze:`Average speed = ${Q} m/s`,answer:String(c.avg),answerUnit:'m/s',visual:journeySvg(h,jLegs(c,withStop)),meta:{kind:'avg',c},
   explanation:`Total distance = ${c.d} m. Total time = ${c.t} s${withStop?' (including the stop)':''}. ${c.d} ÷ ${c.t} = ${c.avg} m/s.`};});
 avg('AV03',1,'2',2,[0],false);avg('AV04',2,'2',2,[0],false);avg('AV05',2,'2',2,[0],false);avg('AV06',2,'3',3,[0],false);
 const avgMC=(code,tier,key,legsN,stops,withStop)=>card(S7,code,tier,(r,h)=>{const c=mset(pool(key,legsN,stops),r,h),sp=c.legs.map(l=>l.d/l.t),fast=Math.max(...sp),slow=Math.min(...sp);
  const ans=c.avg+' m/s',wrong=[num(c.mean)+' m/s',fast+' m/s',slow+' m/s'];
  return {cloze:(withStop?`The whole trip includes a ${c.stop} s stop.\n`:'')+'Average speed = '+Q,answer:ans,choices:mc(h,r,ans,wrong),visual:journeySvg(h,jLegs(c,withStop)),meta:{kind:'avmc',c},
   explanation:`Total distance ÷ total time = ${c.d} ÷ ${c.t} = ${c.avg} m/s. ${num(c.mean)} m/s is the average of the section speeds, which is not the average speed.`};});
 avgMC('AV07',2,'2',2,[0],false);
 avg('AV08',3,'2s',2,[5,10],true);avg('AV09',3,'2s',2,[5,10],true);
 avgMC('AV10',3,'2s',2,[5,10],true);avgMC('AV11',3,'2',2,[0],false);
 card(S7,'AV12',3,(r,h)=>{const v=h.int(2,9,r),t=h.pick([20,30,40,50,60],r);return {cloze:`Average speed = ${v} m/s\nTotal time = ${t} s\nTotal distance = ${Q} m`,answer:String(v*t),answerUnit:'m',meta:{kind:'avdist',v,t},explanation:`d = v × t = ${v} × ${t} = ${v*t} m.`};});
 card(S7,'AV13',3,(r,h)=>{const c=mset(cands('kmh2',[20,30,40,45,50,60,80,90],[1,2,3],2,[0]),r,h);return {cloze:`Average speed = ${Q} km/h`,answer:String(c.avg),answerUnit:'km/h',visual:journeySvg(h,jLegs(c,false),'km','h'),meta:{kind:'avg',c},explanation:`Total distance = ${c.d} km. Total time = ${c.t} h. ${c.d} ÷ ${c.t} = ${c.avg} km/h.`};});
 card(S7,'AV14',3,(r,h)=>{const c=mset(cands('kmh2s',[20,30,40,50,60,80],[1,2],2,[1]),r,h);return {cloze:`Average speed = ${Q} km/h`,answer:String(c.avg),answerUnit:'km/h',visual:journeySvg(h,jLegs(c,true,'km','h'),'km','h'),meta:{kind:'avg',c},explanation:`Total distance = ${c.d} km. Total time = ${c.t} h (including the ${c.stop} h stop). ${c.d} ÷ ${c.t} = ${c.avg} km/h.`};});
 card(S7,'AV15',4,(r,h)=>{
  const c=[];for(const d of [60,120,180,240,300])for(const v1 of [2,3,4,5,6,10,12])for(const v2 of [2,3,4,5,6,10,12])if(v1!==v2&&d%v1===0&&d%v2===0&&(2*d)%(d/v1+d/v2)===0&&v1>v2)c.push([d,v1,v2]);
  const [d,v1,v2]=h.pick(c,r),t1=d/v1,t2=d/v2,a=2*d/(t1+t2);
  return {cloze:`A student cycles ${d} m to school in ${t1} s.\nThe ride home, the same ${d} m, takes ${t2} s.\nAverage speed for the round trip = ${Q} m/s`,answer:String(a),answerUnit:'m/s',meta:{kind:'round',d,t1,t2,a},explanation:`Total distance = ${2*d} m. Total time = ${t1+t2} s. ${2*d} ÷ ${t1+t2} = ${a} m/s. It is not the average of ${v1} and ${v2} m/s.`};});
 card(S7,'AV16',4,(r,h)=>{const t=r()<.5;return {cloze:t?'True or false?\nAverage speed = total distance ÷ total time.\n'+Q:'True or false?\nAverage speed is the average of the speeds in each section.\n'+Q,answer:t?'true':'false',choices:['true','false'],explanation:t?'Add all the distances and all the times, then divide.':'Average speed is total distance ÷ total time. Averaging the section speeds gives a different, wrong answer unless the times are equal.'};});

 // =====================================================================
 // 8. Mass and weight
 // =====================================================================
 const S8=skill('weight','Mass and weight','Mass is the amount of matter, in kg. It does not change. Weight is a force, in N: W = m × g. On Earth g = 10 N/kg. On the Moon g = 1.6 N/kg. So an object weighs less on the Moon, but its mass is the same.','m = 6 kg, g = 10 N/kg → W = 60 N');
 const mEarth=[2,3,4,5,6,8,10,12,15,20],mMoon=[5,10,15,20,25,30,40,50];
 card(S8,'MW01',1,(r,h)=>{const m=h.pick(mEarth,r);return {cloze:`m = ${m} kg\ng = 10 N/kg\nW = ${Q} N`,answer:String(m*10),answerUnit:'N',meta:{kind:'W',m,g:10},explanation:`W = m × g = ${m} × 10 = ${m*10} N.`};});
 card(S8,'MW02',1,(r,h)=>{const m=h.pick(mEarth,r);return {cloze:`A bag has a mass of ${m} kg.\nOn Earth (g = 10 N/kg), its weight = ${Q} N`,answer:String(m*10),answerUnit:'N',meta:{kind:'W',m,g:10},explanation:`W = m × g = ${m} × 10 = ${m*10} N.`};});
 card(S8,'MW03',1,(r,h)=>{const m=h.pick(mEarth,r);return {cloze:`W = ${m*10} N\ng = 10 N/kg\nm = ${Q} kg`,answer:String(m),answerUnit:'kg',meta:{kind:'m',W:m*10,g:10},explanation:`m = W ÷ g = ${m*10} ÷ 10 = ${m} kg.`};});
 card(S8,'MW04',1,(r,h)=>{const m=h.pick(mEarth,r);return {cloze:`A box has a weight of ${m*10} N on Earth (g = 10 N/kg).\nIts mass = ${Q} kg`,answer:String(m),answerUnit:'kg',meta:{kind:'m',W:m*10,g:10},explanation:`m = W ÷ g = ${m*10} ÷ 10 = ${m} kg.`};});
 card(S8,'MW05',1,(r,h)=>{const m=h.pick([3,4,5,6,8],r),a=m*10+' N';return {cloze:`A bag has a mass of ${m} kg.\nIts weight on Earth (g = 10 N/kg) = `+Q,answer:a,choices:mc(h,r,a,[m*10+' kg',m+' N',m+' kg']),explanation:`W = m × g = ${m} × 10 = ${m*10} N. Weight is a force, so it is in newtons.`};});
 card(S8,'MW06',1,(r,h)=>({cloze:h.pick(['Weight is measured in '+Q,'The unit of weight is the '+Q],r),answer:'newtons',aliases:['newton','N'],caseSensitive:false,explanation:'Weight is a force, so it is measured in newtons (N). Mass is measured in kg.'}));
 card(S8,'MW07',2,(r,h)=>{const m=h.pick(mMoon,r);return {cloze:`m = ${m} kg\ng = 1.6 N/kg (Moon)\nW = ${Q} N`,answer:num(m*1.6),answerUnit:'N',meta:{kind:'W',m,g:1.6},explanation:`W = m × g = ${m} × 1.6 = ${num(m*1.6)} N.`};});
 card(S8,'MW08',2,(r,h)=>{const m=h.pick(mMoon,r);return {cloze:`A rock has a mass of ${m} kg.\nOn the Moon (g = 1.6 N/kg), its weight = ${Q} N`,answer:num(m*1.6),answerUnit:'N',meta:{kind:'W',m,g:1.6},explanation:`W = m × g = ${m} × 1.6 = ${num(m*1.6)} N.`};});
 card(S8,'MW09',2,(r,h)=>{const m=h.pick(mMoon,r);return {cloze:`An astronaut with a mass of ${m} kg is on the Moon (g = 1.6 N/kg).\nWeight = ${Q} N`,answer:num(m*1.6),answerUnit:'N',meta:{kind:'W',m,g:1.6},explanation:`W = m × g = ${m} × 1.6 = ${num(m*1.6)} N.`};});
 card(S8,'MW10',2,(r,h)=>{const m=h.pick(mMoon,r);return {cloze:`W = ${num(m*1.6)} N\ng = 1.6 N/kg (Moon)\nm = ${Q} kg`,answer:String(m),answerUnit:'kg',meta:{kind:'m',W:m*1.6,g:1.6},explanation:`m = W ÷ g = ${num(m*1.6)} ÷ 1.6 = ${m} kg.`};});
 card(S8,'MW11',2,(r,h)=>{const m=h.pick(mMoon,r);return {cloze:`A rover on the Moon (g = 1.6 N/kg) weighs ${num(m*1.6)} N.\nIts mass = ${Q} kg`,answer:String(m),answerUnit:'kg',meta:{kind:'m',W:m*1.6,g:1.6},explanation:`m = W ÷ g = ${num(m*1.6)} ÷ 1.6 = ${m} kg.`};});
 card(S8,'MW12',3,(r,h)=>{const m=h.pick([20,40,50,60,80],r),o=h.pick(['An astronaut','A rover','A toolbox'],r);return {cloze:`${o} has a mass of ${m} kg on Earth.\nIts mass on the Moon = ${Q} kg`,answer:String(m),answerUnit:'kg',meta:{kind:'same',m},explanation:'Mass does not change. It is the amount of matter, so it is the same on the Moon.'};});
 card(S8,'MW13',3,(r,h)=>{const m=h.pick([5,10,15,25,30,40,50],r),o=h.pick(['A rock','A probe','A telescope'],r);return {cloze:`${o} weighs ${m*10} N on Earth (g = 10 N/kg).\nIts mass on the Moon = ${Q} kg`,answer:String(m),answerUnit:'kg',meta:{kind:'same',m},explanation:`Mass on Earth: ${m*10} ÷ 10 = ${m} kg. Mass does not change, so it is ${m} kg on the Moon.`};});
 card(S8,'MW14',3,(r,h)=>{const m=h.pick([20,30,40,50],r),ans=m+' kg',wrong=[num(m*1.6/10)+' kg',num(m*1.6)+' kg',num(m*10)+' kg'];
  return {cloze:`An astronaut has a mass of ${m} kg on Earth.\nTheir mass on the Moon = `+Q,answer:ans,choices:mc(h,r,ans,wrong),explanation:'Mass stays the same on the Moon. Only the weight changes.'};});
 card(S8,'MW15',3,(r,h)=>{const m=h.pick([5,10,15,20,25,30,40,50],r),ans=num(m*1.6)+' N',wrong=[num(m*1.6)+' kg',m*10+' N',m+' N'];
  return {cloze:`An object has a mass of ${m} kg.\nIts weight on the Moon (g = 1.6 N/kg) = `+Q,answer:ans,choices:mc(h,r,ans,wrong),explanation:`W = m × g = ${m} × 1.6 = ${num(m*1.6)} N. Weight is in newtons.`};});
 card(S8,'MW16',3,(r,h)=>{const same=r()<.5,o=h.pick(['An object','A rock','A rover','An astronaut'],r);return {cloze:`${o} is moved from Earth to the Moon.\nThe quantity that ${same?'stays the same':'changes'} is `+Q,answer:same?'mass':'weight',choices:mc(h,r,same?'mass':'weight',same?['weight','both mass and weight','neither']:['mass','both mass and weight','neither']),explanation:'Mass stays the same. Weight changes because g is different.'};});
 card(S8,'MW17',3,(r,h)=>{const m=h.pick([5,10,20,50],r);return {cloze:`Earth: g = 10 N/kg. Moon: g = 1.6 N/kg.\nAn object has a mass of ${m} kg. Its weight on the Moon is ${Q} than on Earth`,answer:'less',choices:mc(h,r,'less',['more','the same']),explanation:`On Earth: ${m*10} N. On the Moon: ${num(m*1.6)} N. The Moon's gravity is weaker, so the weight is less.`};});
 card(S8,'MW18',4,(r,h)=>{const m=h.pick([5,10,15,20,25],r);return {cloze:`A bag weighs ${m*10} N on Earth (g = 10 N/kg).\nIts weight on the Moon (g = 1.6 N/kg) = ${Q} N`,answer:num(m*1.6),answerUnit:'N',meta:{kind:'twostep',m},explanation:`Mass: ${m*10} ÷ 10 = ${m} kg. Weight on the Moon: ${m} × 1.6 = ${num(m*1.6)} N.`};});

 // =====================================================================
 // 9. Distance–time graphs: reading sections
 // =====================================================================
 const S9=skill('graphs','Distance–time graphs: reading sections','On a distance–time graph, a flat line means stopped. A steeper line means faster. Gradient = rise ÷ run = speed. The height of the line is how far away the object is, not how fast it is going.','Flat section → stopped. Steepest section → fastest.');
 const LET='ABCDE';
 // Section lists: fixed shapes so each card has one clear answer. v in m/s.
 const SHAPES3=[[{dt:4,v:5},{dt:3,v:0},{dt:3,v:2}],[{dt:3,v:0},{dt:4,v:5},{dt:3,v:2}],[{dt:4,v:2},{dt:3,v:5},{dt:3,v:0}],[{dt:3,v:5},{dt:4,v:0},{dt:3,v:3}],[{dt:2,v:4},{dt:4,v:0},{dt:4,v:2}],[{dt:4,v:3},{dt:2,v:0},{dt:4,v:6}]];
 const stoppedCard=(code,tier,shapes)=>card(S9,code,tier,(r,h)=>{const s=h.pick(shapes,r),i=s.findIndex(x=>x.v===0);return {cloze:`The object is stopped in section ${Q}`,answer:LET[i],choices:LET.slice(0,s.length).split(''),visual:graphSvg(h,s,{dstep:10}),meta:{kind:'gstop',s},explanation:`Section ${LET[i]} is flat. The distance is not changing, so the object is stopped.`};});
 stoppedCard('DG01',1,SHAPES3);stoppedCard('DG02',1,SHAPES3);stoppedCard('DG03',1,SHAPES3);
 const stateCard=(code,tier)=>card(S9,code,tier,(r,h)=>{const s=h.pick(SHAPES3,r),i=Math.floor(r()*s.length),st=s[i].v===0;return {cloze:`In section ${LET[i]} the object is ${Q}`,answer:st?'stopped':'moving at a steady speed',choices:['stopped','moving at a steady speed','speeding up'],visual:graphSvg(h,s,{dstep:10}),meta:{kind:'gstate',s,i},explanation:st?`Section ${LET[i]} is flat: the distance is not changing, so it is stopped.`:`Section ${LET[i]} is a straight sloping line: a steady speed.`};});
 stateCard('DG04',1);stateCard('DG05',1);
 // Fastest: the highest part of the graph is a flat (stopped) line, and the steepest section is not the last moving one.
 const FAST=[[{dt:3,v:6},{dt:4,v:2},{dt:3,v:0}],[{dt:3,v:5},{dt:3,v:0},{dt:4,v:2}],[{dt:4,v:2},{dt:3,v:6},{dt:3,v:0}],[{dt:3,v:6},{dt:2,v:3},{dt:3,v:0}],[{dt:2,v:5},{dt:4,v:1},{dt:4,v:0}]];
 const fastCard=(code,tier,shapes)=>card(S9,code,tier,(r,h)=>{const s=h.pick(shapes,r),v=s.map(x=>x.v),i=v.indexOf(Math.max(...v));return {cloze:`The object moves fastest in section ${Q}`,answer:LET[i],choices:LET.slice(0,s.length).split(''),visual:graphSvg(h,s,{dstep:10}),meta:{kind:'gfast',s},explanation:`Section ${LET[i]} is the steepest, so it has the biggest speed. Height does not show speed.`};});
 fastCard('DG06',2,FAST);fastCard('DG07',2,FAST);
 const FAST4=[[{dt:2,v:3},{dt:3,v:0},{dt:2,v:6},{dt:3,v:0}],[{dt:3,v:4},{dt:2,v:0},{dt:2,v:7},{dt:3,v:1}],[{dt:2,v:7},{dt:3,v:2},{dt:2,v:0},{dt:3,v:4}]];
 fastCard('DG08',2,FAST4);
 card(S9,'DG09',2,(r,h)=>{const s=h.pick([[{dt:3,v:6},{dt:3,v:0},{dt:4,v:2}],[{dt:3,v:5},{dt:2,v:0},{dt:5,v:1}],[{dt:2,v:7},{dt:3,v:0},{dt:4,v:3}]],r),i=s.findIndex(x=>x.v>0&&x.v===Math.min(...s.filter(y=>y.v>0).map(y=>y.v)));return {cloze:`The object is moving, but slowest, in section ${Q}`,answer:LET[i],choices:LET.slice(0,s.length).split(''),visual:graphSvg(h,s,{dstep:10}),meta:{kind:'gslow',s},explanation:`Section ${LET[i]} slopes up, so the object is moving, but it is the least steep of the moving sections.`};});
 // gradient: every vertex on a gridline
 function gradCands(){const out=[];for(const v of [1,2,3,4,5,6,8,10])for(const dt of [2,4,6])if((v*dt)%10===0||(v*dt)%5===0)out.push({v,dt});return out;}
 const GC=gradCands();
 const gradCard=(code,tier,lead)=>card(S9,code,tier,(r,h)=>{
  const s=[];const a=h.pick(GC,r);let b=h.pick(GC,r),guard=0;while((b.v===a.v)&&guard++<20)b=h.pick(GC,r);
  const secs=lead?[{dt:h.pick([2,4],r),v:0},a,{dt:b.dt,v:0}]:[a,{dt:2,v:0},b];
  const ask=lead?1:(r()<.5?0:2),g=secs[ask];
  return {cloze:`Speed in section ${LET[ask]} = ${Q} m/s`,answer:String(g.v),answerUnit:'m/s',visual:graphSvg(h,secs,{tstep:2,dstep:5,labelStep:secs.reduce((a,x)=>a+x.dt*x.v,0)>30?10:5}),meta:{kind:'ggrad',secs,ask},
   explanation:`Gradient = rise ÷ run = ${g.v*g.dt} m ÷ ${g.dt} s = ${g.v} m/s.`};});
 gradCard('DG10',2,false);gradCard('DG11',2,false);gradCard('DG12',2,false);gradCard('DG13',3,true);
 card(S9,'DG14',3,(r,h)=>{const a=h.pick([{v:5,dt:4},{v:4,dt:5},{v:10,dt:2},{v:5,dt:6}],r),b=h.pick([{v:2,dt:5},{v:3,dt:5},{v:2,dt:10},{v:6,dt:5},{v:4,dt:5}],r),stop=h.pick([2,4],r);
  const secs=[a,{dt:stop,v:0},b];const ask=h.pick([0,2],r),g=secs[ask];
  return {cloze:`Speed in section ${LET[ask]} = ${Q} m/s`,answer:String(g.v),answerUnit:'m/s',visual:graphSvg(h,secs,{tstep:ask===2&&secs.reduce((s,x)=>s+x.dt,0)>10?5:2,dstep:10}),meta:{kind:'ggrad',secs,ask},explanation:`Gradient = rise ÷ run = ${g.v*g.dt} m ÷ ${g.dt} s = ${g.v} m/s.`};});
 // Whole-journey cards (Forces revision 3, LO2): total distance, then average speed = total distance ÷ total time. Every vertex is on a gridline of 5 m.
 const AVG=[[{dt:4,v:5},{dt:2,v:0},{dt:4,v:5}],[{dt:5,v:4},{dt:5,v:0}],[{dt:2,v:10},{dt:3,v:0},{dt:5,v:4}],[{dt:4,v:5},{dt:4,v:0},{dt:2,v:5}],[{dt:3,v:5},{dt:2,v:0},{dt:5,v:3}],[{dt:5,v:6},{dt:5,v:2}],[{dt:5,v:2},{dt:2,v:0},{dt:3,v:10}],[{dt:10,v:2},{dt:5,v:0},{dt:5,v:4}],[{dt:5,v:6},{dt:5,v:0},{dt:10,v:3}]];
 const totals=s=>({d:s.reduce((a,x)=>a+x.dt*x.v,0),t:s.reduce((a,x)=>a+x.dt,0)});
 const avgOpts=s=>({tstep:totals(s).t>10?5:2,dstep:5,labelStep:totals(s).d>30?10:5});
 card(S9,'GA01',3,(r,h)=>{const s=h.pick(AVG,r),T=totals(s);return {cloze:`Total distance travelled = ${Q} m`,answer:String(T.d),answerUnit:'m',visual:graphSvg(h,s,avgOpts(s)),meta:{kind:'gtotal',s},explanation:`The graph ends at ${T.d} m, so the object travelled ${T.d} m in total.`};});
 const avgCard=code=>card(S9,code,3,(r,h)=>{const s=h.pick(AVG,r),T=totals(s),a=T.d/T.t;return {cloze:`Average speed for the whole journey = ${Q} m/s`,answer:String(a),answerUnit:'m/s',visual:graphSvg(h,s,avgOpts(s)),meta:{kind:'gavg',s},explanation:`Average speed = total distance ÷ total time = ${T.d} ÷ ${T.t} = ${a} m/s.`};});
 avgCard('GA02');avgCard('GA03');
 card(S9,'GA04',3,(r,h)=>{const ans='total distance ÷ total time';return {cloze:'The average speed for a whole journey is found by '+Q,answer:ans,choices:mc(h,r,ans,['adding the section speeds and dividing by the number of sections','the speed of the steepest section','the final distance × the final time']),explanation:'Average speed = total distance ÷ total time. Averaging the section speeds gives the wrong answer when the sections last different times.'};});
 card(S9,'DG15',3,(r,h)=>{const s=h.pick([[{dt:4,v:5},{dt:2,v:0},{dt:4,v:3}],[{dt:2,v:5},{dt:4,v:0},{dt:2,v:10}],[{dt:2,v:10},{dt:2,v:0},{dt:4,v:5}]],r),i=2,d=s[i].v*s[i].dt;
  return {cloze:`Distance travelled in section C = ${Q} m`,answer:String(d),answerUnit:'m',visual:graphSvg(h,s,{tstep:2,dstep:5}),meta:{kind:'gdist',s,i},explanation:`Read the distance at the start and end of section C and subtract. The object travels ${d} m in section C.`};});
 card(S9,'DG16',3,(r,h)=>{const stop=h.pick([2,3,4],r),s=[{dt:h.pick([3,4],r),v:5},{dt:stop,v:0},{dt:3,v:h.pick([2,4],r)}];
  return {cloze:`The object is stopped for ${Q} s`,answer:String(stop),answerUnit:'s',visual:graphSvg(h,s,{tstep:1,dstep:10}),meta:{kind:'gstoptime',s,stop},explanation:`The flat section (B) lasts ${stop} s.`};});
 card(S9,'DG17',3,(r,h)=>{const s=h.pick([[{dt:4,v:5},{dt:4,v:0}],[{dt:3,v:6},{dt:5,v:0}],[{dt:4,v:4},{dt:4,v:0}]],r),ans='section B is flat, so the object is stopped';
  return {cloze:'A student says the object is fastest in section B because B is the highest part of the graph.\nThe student is wrong because '+Q,answer:ans,choices:mc(h,r,ans,['section B is the lowest part of the graph','height shows time, not distance','a flat line means the object is moving fast']),visual:graphSvg(h,s,{dstep:10}),explanation:'Height shows how far away the object is, not how fast it is going. A flat line means stopped.'};});

 // =====================================================================
 // 10. Distance–time graphs: speeding up and slowing down
 // =====================================================================
 const S10=skill('graphs2','Distance–time graphs: speeding up and slowing down','A straight sloping line is a steady speed. A curve that gets steeper means the object is speeding up. A curve that gets flatter means it is slowing down. A flat line means it is stopped. A steeper line is a faster object; height alone does not show speed.','Curve getting steeper → speeding up');
 const KIND={fast:'speeding up',slow:'slowing down',steady:'moving at a steady speed',stopped:'stopped'};
 const KIND_EXPL={fast:'The curve gets steeper, so the speed is increasing.',slow:'The curve gets flatter, so the speed is decreasing.',steady:'A straight sloping line is a steady speed.',stopped:'A flat line means the distance is not changing: stopped.'};
 const oneShape=(code,k)=>card(S10,code,1,(r,h)=>({cloze:`The object is ${Q}`,answer:KIND[k],choices:['speeding up','slowing down','moving at a steady speed','stopped'],visual:shapeSvg(h,[k]),meta:{kind:'shape1',k},explanation:KIND_EXPL[k]}));
 oneShape('DS01','fast');oneShape('DS02','slow');oneShape('DS03','steady');oneShape('DS04','stopped');
 const ALL4=['fast','slow','steady','stopped'];
 const pickShape=(code,tier,k)=>card(S10,code,tier,(r,h)=>{const kinds=h.shuffle(ALL4,r),i=kinds.indexOf(k);return {cloze:`The graph that shows an object ${KIND[k]} is `+Q,answer:'ABCD'[i],choices:['A','B','C','D'],visual:shapeSvg(h,kinds,'ABCD'.split('')),meta:{kind:'shape4',kinds,k},explanation:KIND_EXPL[k]};});
 pickShape('DS05',2,'fast');pickShape('DS06',2,'slow');pickShape('DS07',2,'steady');pickShape('DS08',2,'stopped');
 const STORY=[['A cyclist starts from rest and pedals harder and harder.','fast'],['A car brakes smoothly until it stops.','slow'],['A runner keeps a steady pace.','steady'],['A ball rolls down a ramp and goes faster and faster.','fast'],['A bus slows down as it reaches the bus stop.','slow'],['A train waits at the station.','stopped'],['A skater glides at a constant speed.','steady']];
 const storyCard=(code,idx)=>card(S10,code,3,(r,h)=>{const [txt,k]=STORY[idx[Math.floor(r()*idx.length)]],kinds=h.shuffle(ALL4,r);return {cloze:`${txt}\nThe matching graph is `+Q,answer:'ABCD'[kinds.indexOf(k)],choices:['A','B','C','D'],visual:shapeSvg(h,kinds,'ABCD'.split('')),meta:{kind:'shape4',kinds,k},explanation:KIND_EXPL[k]};});
 storyCard('DS09',[0,3]);storyCard('DS10',[1,4]);storyCard('DS11',[2,5,6]);
 card(S10,'DS12',3,(r,h)=>{const sw=r()<.5,sp=h.pick([[2,5],[3,6],[2,4],[1,5]],r);const a=sw?sp[1]:sp[0],b=sw?sp[0]:sp[1];
  const P=[0,0,10,a*10],Qq=[0,0,10,b*10];
  return {cloze:`The faster object is ${Q}`,answer:a>b?'P':'Q',choices:['P','Q'],visual:twoLineSvg(h,P,Qq),meta:{kind:'twoline',a,b},explanation:`The steeper line is faster. P: ${a*10} ÷ 10 = ${a} m/s. Q: ${b*10} ÷ 10 = ${b} m/s.`};});
 card(S10,'DS13',4,(r,h)=>{const [sa,sb]=h.pick([[2,4],[1,3],[2,5],[1,4]],r),y=h.pick([20,30],r),flip=r()<.5;
  // The slower object starts higher up, so it ends higher: P ends higher but Q is faster (or the other way round)
  const hi=[0,y,10,y+sa*10],lo=[0,0,10,sb*10];
  const P=flip?lo:hi,Qq=flip?hi:lo,fastName=flip?'P':'Q';
  return {cloze:`The faster object is ${Q}`,answer:fastName,choices:['P','Q'],visual:twoLineSvg(h,P,Qq),meta:{kind:'twoline2',sa,sb,y},explanation:`Compare the steepness, not the height. ${flip?'Q':'P'} starts higher but only gains ${sa*10} m in 10 s (${sa} m/s). ${fastName} gains ${sb*10} m in 10 s (${sb} m/s).`};});

 // Merge 10 into 9 as one skill, "Distance–time graphs" (id forces_motion-graphs): reading-sections cards first, then speeding up and slowing down.
 // The second block's tiers are shifted up by the first block's top tier, so the ramp keeps rising and each later tier still starts with a checkpoint.
 SKILLS.splice(SKILLS.indexOf(S10),1);
 {const shift=Math.max(...S9.questions.map(c=>c.tier));
  S9.name='Distance–time graphs';S9.summary+=' '+S10.summary;S9.example+=' '+S10.example;
  for(const c of S10.questions)S9.questions.push({...c,tier:c.tier+shift});
  const tiersSeen=new Set();
  for(const c of S9.questions){c.unit=c.skill=S9.name;c.checkpoint=c.tier>1&&!tiersSeen.has(c.tier);tiersSeen.add(c.tier);}}

 // ---------- install into the forces_motion unit ----------
 const old=typeof REVISION_UNITS!=='undefined'?REVISION_UNITS.find(u=>u.id==='forces_motion'):null;
 if(!old)return;
 const keep=id=>old.skills.find(s=>s.id===id);
 // Lesson order: forces, net force, speed, conversions, average speed, weight, graphs. Acceleration and stability follow.
 old.skills=[S1,S2,S3,S4,S5,S6,S7,S8,S9,keep('forces_motion-acceleration'),keep('forces_motion-stability')].filter(Boolean);
 old.mixedName='All forces and motion';
 old.generated=true;
 globalThis.FORCES_SKILLS=SKILLS;
})();
