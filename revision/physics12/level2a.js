/* Year 12 Physics, Level 2 (multiple choice), part A: electromagnetism.
   Directions are computed with vectors (x right, y up, z out of the page) and cross products:
   B round a wire = I × r̂ (r̂ from wire to point); force on a wire F = I × B; on a charge F = q v × B;
   induced current along a moving rod = v × B (positive charges). */
(()=>{
const A='Electromagnetism';
const V={'up the page':[0,1,0],'down the page':[0,-1,0],'left':[-1,0,0],'right':[1,0,0],'into the page':[0,0,-1],'out of the page':[0,0,1]};
const N=Object.keys(V);
const cr=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]].map(x=>x||0);
const ng=a=>a.map(x=>-x||0);
const nm=v=>N.find(n=>V[n].every((x,i)=>x===v[i]));
const X=(a,b)=>nm(cr(V[a],V[b]));
const opp=n=>nm(ng(V[n]));
const perp=(a,b)=>V[a].reduce((s,x,i)=>s+x*V[b][i],0)===0;
const pairs=N.flatMap(a=>N.filter(b=>perp(a,b)).map(b=>[a,b]));
const dxy=n=>[V[n][0],-V[n][1]||0];
const six=()=>N.slice();
const four=['up the page','down the page','left','right'];
const cap=s=>s[0].toUpperCase()+s.slice(1);

// ---------- drawing helpers ----------
const pt=(h,x,y,lab,ox=14,oy=-10,anchor='start')=>h.circle(x,y,5,2,'currentColor')+h.text(x+ox,y+oy,lab,24,anchor);
// current in a wire: arrow in the page, or a cross-section symbol. Returns {svg,type}
function curr(h,n,label='I'){
 const v=V[n];
 if(v[2])return {type:'dot',svg:(v[2]>0?h.out:h.into)(320,130,16)+h.text(352,122,label,24)};
 const [dx,dy]=dxy(n);
 const s=h.arrow(320-80*dx,130-80*dy,320+80*dx,130+80*dy,6,18);
 return dx?{type:'h',svg:s+h.text(320,106,label,24)}:{type:'v',svg:s+h.text(338,136,label,24,'start')};
}
// uniform magnetic field B, drawn round the object in the middle
function fld(h,n,type,noMid){
 const v=V[n];let s=h.text(42,138,'B',26);
 if(v[2]){
  const sym=v[2]>0?h.out:h.into;
  for(const x of [120,230,410,520])for(const y of [55,130,205]){
   if(y===130&&(noMid||(type==='h'&&(x===230||x===410))))continue;
   s+=sym(x,y,13);
  }
 }else if(v[0]){
  const rows=(type==='dot'||noMid)?[45,95,165,215]:[40,130,220];
  for(const y of rows)for(const [a,b] of [[90,270],[370,550]])s+=v[0]>0?h.arrow(a,y,b,y,4,14):h.arrow(b,y,a,y,4,14);
 }else{
  const cols=type==='dot'?[110,200,440,530]:[110,230,410,530];
  const segs=type==='dot'?[[35,120],[140,225]]:[[35,100],[160,225]];
  for(const x of cols)for(const [a,b] of segs)s+=v[1]>0?h.arrow(x,b,x,a,4,14):h.arrow(x,a,x,b,4,14);
 }
 return s;
}
// a rod (solid) lying along `axis`, moved/pushed in direction vn with label
function rod(h,axis,vn,label){
 const a=V[axis];let s,type;
 if(a[2]){type='dot';s=h.circle(320,130,16,3,'currentColor');}
 else if(a[0]){type='h';s=h.line(240,130,400,130,9);}
 else{type='v';s=h.line(320,50,320,210,9);}
 const v=V[vn],[dx,dy]=dxy(vn);
 if(v[2]){
  const sym=v[2]>0?h.out:h.into;
  if(type==='h')s+=sym(320,190,14)+h.text(352,198,label,24,'start');
  else if(type==='v')s+=sym(400,130,14)+h.text(432,138,label,24,'start');
 }else if(type==='h')s+=h.arrow(320,130,320,130+85*dy,5,16)+h.text(346,130+50*dy+8,label,24,'start');
 else if(type==='v')s+=h.arrow(320,130,320+85*dx,130,5,16)+h.text(320+55*dx,108,label,24);
 else if(dx)s+=h.arrow(320+22*dx,130,320+95*dx,130,5,16)+h.text(320+60*dx,108,label,24);
 else s+=h.arrow(320,130+22*dy,320,130+95*dy,5,16)+h.text(348,130+60*dy+8,label,24,'start');
 return {svg:s,type};
}
// a charge (sign +1/-1) moving with velocity vn
function chg(h,sign,vn){
 const v=V[vn],[dx,dy]=dxy(vn),sg=sign>0?'+':'−';
 const ball=(x,y)=>h.circle(x,y,17,3)+h.text(x,y+9,sg,26);
 if(v[2]){
  const sym=v[2]>0?h.out:h.into;
  return {type:'dot',svg:ball(285,130)+h.text(335,138,'v',24)+sym(372,130,13)};
 }
 if(dx)return {type:'h',svg:ball(320-50*dx,130)+h.arrow(320-28*dx,130,320+75*dx,130,4,14)+h.text(320+23*dx,104,'v',24)};
 return {type:'v',svg:ball(320,130-50*dy)+h.arrow(320,130-28*dy,320,130+75*dy,4,14)+h.text(346,134,'v',24,'start')};
}
// solenoid seen from the front: slanted strands with optional current arrows (up=true: front current up the page)
function sol(h,up,arrows,endLabels){
 let s='';const xs=[0,1,2,3,4,5,6].map(i=>210+i*36);
 xs.forEach((x,i)=>{
  const [a,b]=up?[[x,175],[x+14,85]]:[[x+14,85],[x,175]];
  s+=arrows?h.arrow(a[0],a[1],b[0],b[1],4,12):h.line(a[0],a[1],b[0],b[1],4);
  if(i<6)s+=h.line(x+14,85,xs[i+1],175,1.5,'stroke-dasharray="5 5"');
 });
 s+=h.line(150,175,210,175,3)+h.line(xs[6]+14,85,xs[6]+60,85,3);
 s+=h.text(130,185,endLabels[0],28)+h.text(xs[6]+82,95,endLabels[1],28);
 return s;
}
// motor / coil end-on between poles
function motor(h,nLeft,xLeft,xOut,labels){
 let s=h.rect(40,55,70,150,3)+h.text(75,140,nLeft?'N':'S',30)+h.rect(530,55,70,150,3)+h.text(565,140,nLeft?'S':'N',30);
 const d=nLeft?1:-1;
 for(const y of [70,190])s+=d>0?h.arrow(135,y,505,y,4,14):h.arrow(505,y,135,y,4,14);
 s+=h.line(225,130,415,130,3)+h.circle(320,130,5,2,'currentColor');
 const lx=xLeft?210:430,rx=xLeft?430:210;
 s+=(xOut?h.out:h.into)(lx,130,15)+(xOut?h.into:h.out)(rx,130,15);
 if(labels)s+=h.text(lx,172,'X',24)+h.text(rx,172,'Y',24);
 return s;
}
// magnet + coil + galvanometer. lead = pole nearest the coil. moving = 'in' | 'out'
function lenz(h,lead,moving){
 let s=h.rect(200,105,120,50)+h.line(260,105,260,155)+h.text(230,140,lead==='N'?'S':'N',26)+h.text(290,140,lead,26);
 s+=h.rect(360,90,120,80);for(let x=380;x<480;x+=20)s+=h.line(x,90,x,170,2);
 s+=h.line(370,170,370,225)+h.line(370,225,395,225)+h.circle(420,225,20)+h.text(420,233,'G',22)+h.line(445,225,470,225)+h.line(470,225,470,170);
 s+=moving==='in'?h.arrow(240,65,320,65,5,16):h.arrow(320,65,240,65,5,16);
 return s;
}
// plates: orient 'h' (plates top/bottom) or 'v'; positive plate 'top'|'bottom'|'left'|'right' or null for unlabelled
function plates(h,orient,posPlate,dense){
 let s='';const sg=(p)=>posPlate===null?'':(p===posPlate?'+':'−');
 if(orient==='h'){
  s+=h.line(150,60,490,60,8)+h.line(150,200,490,200,8);
  if(posPlate!==null){const t=sg('top'),b=sg('bottom');
   for(const x of dense?[180,240,300,360,420,480]:[200,260,380,440]){s+=h.text(x,92,t,26)+h.text(x,188,b,26);}}
 }else{
  s+=h.line(190,25,190,235,8)+h.line(450,25,450,235,8);
  if(posPlate!==null){const l=sg('left'),r=sg('right');
   for(const y of dense?[50,90,130,170,210]:[60,100,175,215]){s+=h.text(222,y+8,l,26)+h.text(418,y+8,r,26);}}
 }
 return s;
}
const ball=(h,x,y,sign)=>h.circle(x,y,17,3)+h.text(x,y+9,sign>0?'+':'−',26);
// circuits
const lamp=(h,x,y)=>h.circle(x,y,20)+h.line(x-14,y-14,x+14,y+14,2.5)+h.line(x-14,y+14,x+14,y-14,2.5);
const resb=(h,x,y)=>h.rect(x-30,y-13,60,26);
const cell=(h,x,y)=>h.line(x-16,y-6,x+16,y-6,4)+h.line(x-8,y+7,x+8,y+7,4);
const comp=(h,kind,x,y)=>kind==='lamp'?lamp(h,x,y):resb(h,x,y);
function series(h,kind,labs){
 const n=labs.length,xs=n===1?[320]:n===2?[240,400]:[200,320,440],hw=kind==='lamp'?20:30;
 let s=cell(h,90,130)+h.line(90,75,90,124)+h.line(90,137,90,200)+h.line(90,200,550,200)+h.line(550,200,550,75);
 let prev=90;
 xs.forEach((x,i)=>{s+=h.line(prev,75,x-hw,75)+comp(h,kind,x,75)+h.text(x,40,labs[i],22);prev=x+hw;});
 s+=h.line(prev,75,550,75);
 return s;
}
function parallel(h,kind,labs){
 const n=labs.length,xs=n===1?[300]:n===2?(kind==='res'?[220,420]:[260,400]):[230,340,450],hh=kind==='lamp'?20:13;
 let s=cell(h,90,130)+h.line(90,55,90,124)+h.line(90,137,90,205)+h.line(90,55,xs[n-1],55)+h.line(90,205,xs[n-1],205);
 xs.forEach((x,i)=>{s+=h.line(x,55,x,130-hh)+comp(h,kind,x,130)+h.line(x,130+hh,x,205)+h.text(x+(kind==='lamp'?30:38),138,labs[i],22,'start');});
 return s;
}
const W=(h,body,alt)=>({type:'svg',svg:h.svgWrap(body,alt)});
const DIAL={above:[320,50],below:[320,210],'to the left of':[190,130],'to the right of':[450,130]};
const RHAT={above:'up the page',below:'down the page','to the left of':'left','to the right of':'right'};
const POSITIONS=Object.keys(DIAL);

// ======================= WIRES AND SOLENOIDS =======================
Physics12.add(2,{id:'L2-E01',topic:A,skill:'Right Hand Grip rule: wire end-on',
 gen(r,h){
  const cur=h.pick(['into the page','out of the page'],r),pos=h.pick(POSITIONS,r);
  const ans=X(cur,RHAT[pos]),[px,py]=DIAL[pos];
  const body=curr(h,cur).svg+pt(h,px,py,'P');
  return {cloze:`A long straight wire carries current ${cur}.\nPoint P is ${pos} the wire.\nThe magnetic field at P points ____.`,answer:ans,choices:six(),
   explanation:`Right Hand Grip rule: thumb along the current (${cur}), fingers curl round the wire. At P (${pos} the wire) they point ${ans}.`,
   visual:W(h,body,`Wire end-on with current ${cur} and a point P ${pos} it`)};}});

Physics12.add(2,{id:'L2-E02',topic:A,skill:'Right Hand Grip rule: wire side view',
 gen(r,h){
  const cur=h.pick(['up the page','down the page'],r),pos=h.pick(['to the left of','to the right of'],r);
  const ans=X(cur,RHAT[pos]),[px,py]=DIAL[pos];
  const body=curr(h,cur).svg+pt(h,px,py,'P');
  return {cloze:`A long straight wire carries current ${cur}.\nPoint P is ${pos} the wire.\nThe magnetic field at P points ____.`,answer:ans,choices:six(),
   explanation:`Right Hand Grip rule: thumb along the current (${cur}), fingers curl round the wire. At P (${pos} the wire) they go ${ans}.`,
   visual:W(h,body,`Wire in the plane of the page carrying current ${cur}, point P ${pos} it`)};}});

Physics12.add(2,{id:'L2-E03',topic:A,skill:'Right Hand Grip rule: find the current',
 gen(r,h){
  if(r()<.5){
   const I=h.pick(['into the page','out of the page'],r),pos=h.pick(POSITIONS,r),rh=RHAT[pos],B=X(I,rh),[px,py]=DIAL[pos],[dx,dy]=dxy(B);
   let s=h.circle(320,130,16,3)+h.text(360,138,'wire',20,'start')+h.circle(px,py,5,2,'currentColor')+h.arrow(px,py,px+55*dx,py+55*dy,4,14);
   s+=dx?h.text(px,py-16,'P',24)+h.text(px+80*dx,py+8,'B',24):h.text(px-14,py+8,'P',24,'end')+h.text(px+20,py+55*dy+(dy>0?20:-8),'B',24,'start');
   return {cloze:`The wire is end-on. The magnetic field at P\n(${pos} the wire) is shown by the arrow B.\nThe current in the wire flows ____.`,answer:I,choices:six(),
    explanation:`Right Hand Grip rule: the field at P (${pos} the wire) goes ${B}. That only happens if the thumb (current) points ${I}.`,visual:W(h,s,'Wire end-on with the field direction shown at P')};
  }
  const pos=h.pick(['to the left of','to the right of'],r),rh=RHAT[pos],B=h.pick(['into the page','out of the page'],r),I=X(rh,B),[px,py]=DIAL[pos];
  const s=h.line(320,50,320,210,6)+h.text(350,80,'wire',20,'start')+(V[B][2]>0?h.out:h.into)(px,py,14)+h.text(px+(pos==='to the left of'?-26:26),py-16,'P',24,pos==='to the left of'?'end':'start');
  return {cloze:`The magnetic field at P, ${pos} the wire,\npoints ${B}.\nThe current in the wire flows ____.`,answer:I,choices:six(),
   explanation:`Right Hand Grip rule: the field at P (${pos} the wire) goes ${B}, so the thumb (current) must point ${I}.`,visual:W(h,s,`Wire in the plane of the page with the field at P ${B}`)};}});

Physics12.add(2,{id:'L2-E04',topic:A,skill:'Right Hand Grip rule: solenoid poles',
 gen(r,h){
  const up=r()<.5,xl=r()<.5,labs=xl?['X','Y']:['Y','X'];
  const north=up?labs[0]:labs[1];
  return {cloze:`Current flows through a solenoid as shown (arrows are the front of the windings).\nThe north pole is at ____.`,answer:`end ${north}`,choices:['end X','end Y','both ends'],
   explanation:`Right Hand Grip rule for a coil: fingers curl the way the current flows, thumb points to the north end. Current goes ${up?'up':'down'} the front of the windings, so end ${north} is north.`,
   visual:W(h,sol(h,up,true,labs),'Solenoid with current arrows on the front windings and ends X and Y')};}});

Physics12.add(2,{id:'L2-E05',topic:A,skill:'Right Hand Grip rule: solenoid current',
 gen(r,h){
  const left=r()<.5,up=left;   // N at left <=> front current up
  let s=sol(h,true,false,['','']);
  s+=h.text(left?130:560,left?185:95,'N',30);
  return {cloze:`The north pole of this solenoid is at the ${left?'left':'right'} end.\nThe current in the front of the windings flows ____.`,answer:up?'up the page':'down the page',choices:four,
   explanation:`Right Hand Grip rule for a coil: thumb points to the north end (${left?'left':'right'}), so the fingers (current) go ${up?'up':'down'} the front of the windings.`,
   visual:W(h,s,`Solenoid with its north pole at the ${left?'left':'right'} end`)};}});

// ======================= FLEMING'S LEFT HAND RULE =======================
Physics12.add(2,{id:'L2-E06',topic:A,skill:'Fleming’s Left Hand rule: force on a wire',
 gen(r,h){
  const [In,Bn]=h.pick(pairs,r),ans=X(In,Bn),c=curr(h,In);
  return {cloze:`A wire carries current I in a uniform magnetic field B.\nThe force on the wire points ____.`,answer:ans,choices:six(),
   explanation:`Fleming’s Left Hand rule: first finger = field (${Bn}), second finger = current (${In}), thumb = force = ${ans}.`,
   visual:W(h,c.svg+fld(h,Bn,c.type),`Wire with current ${In} in a field ${Bn}`)};}});

Physics12.add(2,{id:'L2-E07',topic:A,skill:'Fleming’s Left Hand rule: positive charge',
 gen(r,h){
  const [vn,Bn]=h.pick(pairs,r),ans=X(vn,Bn),c=chg(h,1,vn);
  return {cloze:`A positive charge moves with velocity v through a uniform magnetic field B.\nThe force on the charge points ____.`,answer:ans,choices:six(),
   explanation:`Fleming’s Left Hand rule: first finger = field (${Bn}), second finger = velocity of the positive charge (${vn}), thumb = force = ${ans}.`,
   visual:W(h,c.svg+fld(h,Bn,c.type),`Positive charge moving ${vn} in a field ${Bn}`)};}});

Physics12.add(2,{id:'L2-E08',topic:A,skill:'Fleming’s Left Hand rule: electron',
 gen(r,h){
  const [vn,Bn]=h.pick(pairs,r),pos=X(vn,Bn),ans=opp(pos),c=chg(h,-1,vn);
  return {cloze:`An electron moves with velocity v through a uniform magnetic field B.\nThe force on the electron points ____.`,answer:ans,choices:six(),
   explanation:`An electron is negative, so conventional current flows opposite to v. Left Hand rule with a positive charge gives ${pos}, so for the electron the force is ${ans}.`,
   visual:W(h,c.svg+fld(h,Bn,c.type),`Electron moving ${vn} in a field ${Bn}`)};}});

Physics12.add(2,{id:'L2-E09',topic:A,skill:'Fleming’s Left Hand rule: find the current',
 gen(r,h){
  const [Bn,Fn]=h.pick(pairs,r),ans=X(Bn,Fn);
  return {cloze:`A wire is in the magnetic field B shown.\nThe force on the wire must point ${Fn}.\nThe current in the wire must flow ____.`,answer:ans,choices:six(),
   explanation:`Fleming’s Left Hand rule: first finger = field (${Bn}), thumb = force (${Fn}), so the second finger (current) points ${ans}.`,
   visual:W(h,fld(h,Bn,'dot'),`Uniform magnetic field pointing ${Bn}`)};}});

Physics12.add(2,{id:'L2-E10',topic:A,skill:'Fleming’s Left Hand rule: find the field',
 gen(r,h){
  const [In,Fn]=h.pick(pairs,r),ans=X(Fn,In),c=curr(h,In);
  return {cloze:`The wire carries the current I shown.\nThe force on the wire must point ${Fn}.\nThe magnetic field must point ____.`,answer:ans,choices:six(),
   explanation:`Fleming’s Left Hand rule: second finger = current (${In}), thumb = force (${Fn}), so the first finger (field) points ${ans}.`,
   visual:W(h,c.svg,`Wire carrying current ${In}`)};}});

Physics12.add(2,{id:'L2-E11',topic:A,skill:'Fleming’s Left Hand rule: find the field (charge)',
 gen(r,h){
  const [vn,Fn]=h.pick(pairs,r),s=r()<.5?1:-1,ans=s>0?X(Fn,vn):X(vn,Fn),c=chg(h,s,vn);
  return {cloze:`A ${s>0?'positive charge':'electron'} moves as shown.\nThe magnetic force on it points ${Fn}.\nThe magnetic field must point ____.`,answer:ans,choices:six(),
   explanation:s>0?`Left Hand rule: second finger = velocity (${vn}), thumb = force (${Fn}), so the first finger (field) points ${ans}.`:
    `An electron is negative: use the opposite of v for the current. Second finger = ${opp(vn)}, thumb = force (${Fn}), so the field points ${ans}.`,
   visual:W(h,c.svg,`${s>0?'Positive charge':'Electron'} moving ${vn}`)};}});

Physics12.add(2,{id:'L2-E12',topic:A,skill:'Motor effect: force on a coil side',
 gen(r,h){
  const nl=r()<.5,xl=r()<.5,xo=r()<.5,B=nl?'right':'left',ans=X(xo?'out of the page':'into the page',B);
  return {cloze:`Current flows round a coil placed between two magnet poles, as shown.\nThe force on side X points ____.`,answer:ans,choices:four,
   explanation:`Fleming’s Left Hand rule: field goes from N to S (${B}), current in X is ${xo?'out of':'into'} the page, so the thumb (force) points ${ans}.`,
   visual:W(h,motor(h,nl,xl,xo,true),'Coil end-on between a north and a south pole, sides X and Y')};}});

Physics12.add(2,{id:'L2-E13',topic:A,skill:'Motor effect: direction a coil turns',
 gen(r,h){
  const nl=r()<.5,xl=r()<.5,xo=r()<.5,B=nl?'right':'left';
  const leftOut=xl?xo:!xo,fy=V[X(leftOut?'out of the page':'into the page',B)][1];
  const ans=fy>0?'turn clockwise':'turn anticlockwise';
  return {cloze:`Current flows round a coil placed between two magnet poles, as shown.\nThe coil starts to ____.`,answer:ans,choices:['turn clockwise','turn anticlockwise','not turn'],
   explanation:`Fleming’s Left Hand rule: the force on the left side is ${fy>0?'up':'down'} and on the right side ${fy>0?'down':'up'}, so the coil turns ${fy>0?'clockwise':'anticlockwise'}.`,
   visual:W(h,motor(h,nl,xl,xo,false),'Coil end-on between a north and a south pole')};}});

// ======================= INDUCTION =======================
Physics12.add(2,{id:'L2-E14',topic:A,skill:'Fleming’s Right Hand rule: induced current in a rod',
 gen(r,h){
  const [vn,Bn]=h.pick(pairs,r),ans=X(vn,Bn),rd=rod(h,ans,vn,'v');
  return {cloze:`A metal rod is moved with velocity v through a uniform magnetic field B.\nThe induced current in the rod flows ____.`,answer:ans,choices:six(),
   explanation:`Fleming’s Right Hand rule: thumb = motion (${vn}), first finger = field (${Bn}), second finger = induced current = ${ans}.`,
   visual:W(h,rd.svg+fld(h,Bn,rd.type,true),`Rod moving ${vn} through a field ${Bn}`)};}});

Physics12.add(2,{id:'L2-E15',topic:A,skill:'Fleming’s Right Hand rule: find the motion',
 gen(r,h){
  const [Bn,In]=h.pick(pairs,r),ans=X(Bn,In),c=curr(h,In,'I');
  return {cloze:`A rod in the magnetic field B has the induced current I shown.\nThe rod is being moved ____.`,answer:ans,choices:six(),
   explanation:`Fleming’s Right Hand rule: first finger = field (${Bn}), second finger = induced current (${In}), thumb = motion = ${ans}.`,
   visual:W(h,c.svg+fld(h,Bn,c.type),`Rod with induced current ${In} in a field ${Bn}`)};}});

Physics12.add(2,{id:'L2-E16',topic:A,skill:'Lenz’s law: pole formed in a coil',
 gen(r,h){
  const lead=h.pick(['N','S'],r),mv=h.pick(['in','out'],r);
  const near=(mv==='in')===(lead==='N')?'north':'south';
  return {cloze:`The ${lead} pole of a magnet is ${mv==='in'?'pushed towards':'pulled away from'} a coil.\nThe end of the coil nearest the magnet becomes a ____ pole.`,answer:near,choices:['north','south','neither (no pole)'],
   explanation:`Lenz’s law: the induced current opposes the change. ${mv==='in'?`To resist the ${lead} pole approaching, the near end becomes ${near} (like poles repel).`:`To resist the ${lead} pole leaving, the near end becomes ${near} (unlike poles attract).`}`,
   visual:W(h,lenz(h,lead,mv),`Bar magnet with its ${lead} pole nearest a coil, moving ${mv==='in'?'towards':'away from'} it`)};}});

Physics12.add(2,{id:'L2-E17',topic:A,skill:'Lenz’s law: galvanometer deflection',
 gen(r,h){
  const base=h.pick(['left','right'],r);let pole,mv;
  do{pole=h.pick(['N','S'],r);mv=h.pick(['in','out'],r);}while(pole==='N'&&mv==='in');
  const same=(pole==='N')===(mv==='in'),ans=`to the ${same?base:(base==='left'?'right':'left')}`;
  return {cloze:`Pushing the N pole of a magnet into a coil makes the galvanometer needle deflect to the ${base}.\nNow the ${pole} pole is ${mv==='in'?'pushed into':'pulled out of'} the coil.\nThe needle deflects ____.`,answer:ans,choices:['to the left','to the right','not at all'],
   explanation:`Swapping the pole, or swapping in/out, reverses the induced current. ${same?'Here it is swapped twice (or not at all), so the deflection is the same.':'Here it is swapped once, so the deflection reverses.'}`,
   visual:W(h,lenz(h,pole,mv),`Magnet ${pole} pole ${mv==='in'?'entering':'leaving'} a coil connected to a galvanometer G`)};}});

Physics12.add(2,{id:'L2-E18',topic:A,skill:'Lenz’s law: induced current direction',
 gen(r,h){
  const lead=h.pick(['N','S'],r),mv=h.pick(['in','out'],r);
  const near=(mv==='in')===(lead==='N')?'N':'S',ans=near==='N'?'anticlockwise':'clockwise';
  return {cloze:`The ${lead} pole of a magnet is ${mv==='in'?'pushed into':'pulled out of'} a coil.\nLooking from the magnet’s side, the induced current in the coil goes ____.`,answer:ans,choices:['clockwise','anticlockwise','no current flows'],
   explanation:`Lenz’s law: the near end becomes ${near==='N'?'north':'south'}. Right Hand Grip rule for a coil: seen from a north end the current goes anticlockwise; seen from a south end, clockwise. So ${ans}.`,
   visual:W(h,lenz(h,lead,mv),`Magnet ${lead} pole ${mv==='in'?'entering':'leaving'} a coil`)};}});

Physics12.add(2,{id:'L2-E19',topic:A,skill:'When is an emf induced?',
 gen(r,h){
  const moving=['a magnet is pushed into the coil','a magnet is pulled out of the coil','the coil is moved towards a magnet that is held still','the coil is pulled away from a magnet that is held still'];
  const still=['a magnet is held still inside the coil','a magnet is held still beside the coil','the magnet and coil are both at rest','the magnet and coil are moved together at the same speed in the same direction'];
  const ask=r()<.5;
  const good=ask?h.pick(moving,r):h.pick(still,r),others=h.shuffle(ask?still:moving,r).slice(0,3);
  const choices=h.shuffle([good,...others],r).map(cap);
  return {cloze:`A coil is connected to a galvanometer.\nWhich of these ${ask?'induces':'does NOT induce'} an emf in the coil?\n____`,answer:cap(good),choices,
   explanation:ask?'An emf is induced only when the magnetic flux through the coil is changing, which needs relative motion between magnet and coil.':'No relative motion between magnet and coil means no change in flux, so no emf is induced.'};}});

Physics12.add(2,{id:'L2-E20',topic:A,skill:'Size of the induced emf',
 gen(r,h){
  const up=['Move the magnet in faster','Use a coil with more turns','Use a stronger magnet'],down=['Move the magnet in more slowly','Use a coil with fewer turns','Use a weaker magnet','Hold the magnet still in the coil'];
  const good=h.pick(up,r),choices=h.shuffle([good,...h.shuffle(down,r).slice(0,3)],r);
  return {cloze:`A magnet is pushed into a coil, giving a small emf.\nWhich change would increase the induced emf?\n____`,answer:good,choices,
   explanation:'Induced emf is larger when the flux changes faster, when the coil has more turns, and when the magnetic field is stronger.'};}});

// ======================= ELECTRIC FIELDS =======================
const PL={top:'down the page',bottom:'up the page',left:'right',right:'left'};  // field direction (from + plate to − plate)
Physics12.add(2,{id:'L2-E21',topic:A,skill:'Electric field between plates',
 gen(r,h){
  const p=h.pick(['top','bottom','left','right'],r),orient=(p==='top'||p==='bottom')?'h':'v',ans=PL[p];
  return {cloze:`Two parallel plates are connected to a power supply, with the ${p} plate positive.\nThe electric field between the plates points ____.`,answer:ans,choices:four,
   explanation:`Electric field lines point away from positive and towards negative, so from the ${p} plate to the other plate: ${ans}.`,
   visual:W(h,plates(h,orient,p,true),`Parallel plates with the ${p} plate positive`)};}});

Physics12.add(2,{id:'L2-E22',topic:A,skill:'Force on a charge in an electric field',
 gen(r,h){
  const p=h.pick(['top','bottom','left','right'],r),orient=(p==='top'||p==='bottom')?'h':'v',s=r()<.5?1:-1,E=PL[p],ans=s>0?E:opp(E);
  return {cloze:`A ${s>0?'positive charge':'negative charge'} sits between two plates. The ${p} plate is positive.\nThe electric force on the charge points ____.`,answer:ans,choices:four,
   explanation:`The field points ${E}. A positive charge is pushed along the field, a negative charge against it, so the force is ${ans}.`,
   visual:W(h,plates(h,orient,p)+ball(h,320,130,s),`A ${s>0?'positive':'negative'} charge between plates with the ${p} plate positive`)};}});

Physics12.add(2,{id:'L2-E23',topic:A,skill:'Electron force and field direction',
 gen(r,h){
  const orient=h.pick(['h','v'],r),F=h.pick(orient==='h'?['up the page','down the page']:['left','right'],r),E=opp(F),[dx,dy]=dxy(F);
  const s=plates(h,orient,null)+ball(h,320-0*dx,130,-1)+h.arrow(320+22*dx,130+22*dy,320+(dx?90:55)*dx,130+(dx?90:55)*dy,5,16)+h.text(320+(dx?60*dx:30),dx?104:130+45*dy+8,'F',24);
  return {cloze:`An electron between two plates is pushed in the direction of the arrow F.\nThe electric field between the plates points ____.`,answer:E,choices:four,
   explanation:`The force on a negative charge is opposite to the field. The force is ${F}, so the field points ${E}.`,
   visual:W(h,s,'An electron between two plates with a force arrow F')};}});

Physics12.add(2,{id:'L2-E24',topic:A,skill:'Field lines round a point charge',
 gen(r,h){
  const outward=r()<.5;let s=h.circle(320,130,22,3)+h.text(320,139,'Q',24);
  for(let k=0;k<8;k++){const a=k*Math.PI/4,c=Math.cos(a),sn=Math.sin(a),p1=[320+34*c,130-34*sn],p2=[320+90*c,130-90*sn];
   s+=outward?h.arrow(p1[0],p1[1],p2[0],p2[1],4,12):h.arrow(p2[0],p2[1],p1[0],p1[1],4,12);}
  return {cloze:`The arrows show the electric field lines round a point charge Q.\nQ is ____.`,answer:outward?'positive':'negative',choices:['positive','negative','neutral'],
   explanation:`Field lines point away from a positive charge and towards a negative charge. These ${outward?'point away from Q, so Q is positive':'point towards Q, so Q is negative'}.`,
   visual:W(h,s,`Field lines ${outward?'pointing away from':'pointing towards'} a point charge Q`)};}});

Physics12.add(2,{id:'L2-E25',topic:A,skill:'Force on a test charge near a point charge',
 gen(r,h){
  const pos=h.pick(POSITIONS,r),sq=r()<.5?1:-1,st=r()<.5?1:-1,rh=RHAT[pos];
  const loc={above:[320,40],below:[320,220],'to the left of':[150,130],'to the right of':[490,130]}[pos];
  const ans=sq*st>0?rh:opp(rh);
  const s=ball(h,320,130,sq).replace('r="17"','r="22"')+ball(h,loc[0],loc[1],st)+h.text(loc[0]+(pos==='above'||pos==='below'?30:0),loc[1]+(pos==='above'||pos==='below'?8:-28),'P',24,'middle');
  return {cloze:`A fixed ${sq>0?'positive':'negative'} charge Q is shown. A ${st>0?'positive':'negative'} charge at P is ${pos} Q.\nThe electric force on the charge at P points ____.`,answer:ans,choices:four,
   explanation:sq*st>0?`Like charges repel, so the force on the charge at P points away from Q: ${ans}.`:`Unlike charges attract, so the force on the charge at P points towards Q: ${ans}.`,
   visual:W(h,s,`Fixed ${sq>0?'positive':'negative'} charge Q with a ${st>0?'positive':'negative'} charge at P ${pos} it`)};}});

Physics12.add(2,{id:'L2-E26',topic:A,skill:'Where is the electric field strongest?',
 gen(r,h){
  const cd=h.pick([70,100],r),rest=h.shuffle([70,100,130].filter(x=>x!==cd),r),ds={A:rest[0],B:rest[1],C:cd},ang={A:15,B:195,C:100};
  const sg=r()<.5?1:-1;let s=ball(h,320,130,sg).replace('r="17"','r="22"');
  for(let k=0;k<8;k++){const a=k*Math.PI/4,c=Math.cos(a),sn=Math.sin(a),p1=[320+34*c,130-34*sn],p2=[320+58*c,130-58*sn];
   s+=sg>0?h.arrow(p1[0],p1[1],p2[0],p2[1],3,10):h.arrow(p2[0],p2[1],p1[0],p1[1],3,10);}
  for(const k of ['A','B','C']){const a=ang[k]*Math.PI/180,x=320+ds[k]*Math.cos(a),y=130-ds[k]*Math.sin(a);s+=h.circle(x,y,5,2,'currentColor')+h.text(x+14,y-8,k,24,'start');}
  const ans=['A','B','C'].reduce((m,k)=>ds[k]<ds[m]?k:m,'A');
  return {cloze:`A fixed point charge and three points A, B and C are shown.\nThe electric field is strongest at point ____.`,answer:ans,choices:['A','B','C'],
   explanation:'The field of a point charge gets weaker with distance, so it is strongest at the point closest to the charge.',
   visual:W(h,s,'A point charge with points A, B and C at different distances')};}});

// ======================= BAR MAGNETS =======================
const bar=(h,nLeft)=>h.rect(220,105,200,50)+h.line(320,105,320,155)+h.text(270,140,nLeft?'N':'S',28)+h.text(370,140,nLeft?'S':'N',28);
const BAR_P={'above the middle':[320,55],'below the middle':[320,205],'beyond the left end':[150,130],'beyond the right end':[490,130]};
function barDir(nLeft,where){const n2s=nLeft?'right':'left';return (where==='above the middle'||where==='below the middle')?n2s:opp(n2s);}
Physics12.add(2,{id:'L2-E27',topic:A,skill:'Magnetic field direction round a bar magnet',
 gen(r,h){
  const nl=r()<.5,where=h.pick(Object.keys(BAR_P),r),[px,py]=BAR_P[where],ans=barDir(nl,where);
  return {cloze:`Point P is ${where} of a bar magnet.\nThe magnetic field at P points ____.`,answer:ans,choices:four,
   explanation:`Outside a magnet the field lines go from the north pole to the south pole. ${where.includes('middle')?`Beside the magnet they run ${ans}.`:`${where==='beyond the left end'?'On the left':'On the right'} of the magnet the lines ${(where==='beyond the left end')===nl?'leave the N pole':'enter the S pole'} and point ${ans}.`}`,
   visual:W(h,bar(h,nl)+pt(h,px,py,'P',16,-12),`Bar magnet with point P ${where}`)};}});

Physics12.add(2,{id:'L2-E28',topic:A,skill:'Compass needle near a magnet',
 gen(r,h){
  const nl=r()<.5,where=h.pick(Object.keys(BAR_P),r),[px,py]=BAR_P[where],ans=barDir(nl,where);
  const lab=where.includes('middle')?h.text(px+30,py+8,'compass',20,'start'):h.text(px,py-34,'compass',20);
  return {cloze:`A small compass is placed at P, ${where} of a bar magnet.\nThe north end of the compass needle points ____.`,answer:ans,choices:four,
   explanation:`The north end of a compass points along the field, which outside the magnet goes from N to S. Here that is ${ans}.`,
   visual:W(h,bar(h,nl)+h.circle(px,py,20,3)+lab,`Bar magnet with a compass ${where}`)};}});

Physics12.add(2,{id:'L2-E29',topic:A,skill:'Attraction and repulsion of magnetic poles',
 gen(r,h){
  const a=r()<.5,b=r()<.5;       // true => N on the left half of that magnet
  const s=h.rect(70,105,190,50)+h.line(165,105,165,155)+h.text(117,140,a?'N':'S',28)+h.text(213,140,a?'S':'N',28)
   +h.rect(380,105,190,50)+h.line(475,105,475,155)+h.text(427,140,b?'N':'S',28)+h.text(523,140,b?'S':'N',28);
  const faceL=a?'S':'N',faceR=b?'N':'S',att=faceL!==faceR;
  return {cloze:`Two bar magnets are placed end to end, as shown.\nThe magnets ____ each other.`,answer:att?'attract':'repel',choices:['attract','repel','neither attract nor repel'],
   explanation:`The facing poles are ${faceL} and ${faceR}. ${att?'Unlike poles attract.':'Like poles repel.'}`,
   visual:W(h,s,'Two bar magnets end to end with poles labelled')};}});

Physics12.add(2,{id:'L2-E30',topic:A,skill:'Identify a pole from attraction/repulsion',
 gen(r,h){
  const a=r()<.5,att=r()<.5,faceL=a?'S':'N',want=att?(faceL==='N'?'S':'N'):faceL;
  const s=h.rect(70,105,190,50)+h.line(165,105,165,155)+h.text(117,140,a?'N':'S',28)+h.text(213,140,a?'S':'N',28)
   +h.rect(380,105,190,50)+h.line(475,105,475,155)+h.text(427,140,'X',28);
  return {cloze:`The two magnets ${att?'attract':'repel'} each other.\nEnd X of the right-hand magnet is a ____ pole.`,answer:want==='N'?'north':'south',choices:['north','south','cannot be told'],
   explanation:`The facing end of the left magnet is ${faceL}. ${att?'They attract, so unlike poles face each other':'They repel, so like poles face each other'}: X is ${want==='N'?'north':'south'}.`,
   visual:W(h,s,'Two bar magnets with the right-hand magnet’s left end labelled X')};}});

// ======================= CIRCUITS (CONCEPTS) =======================
const BR=['gets brighter','gets dimmer','stays the same brightness','goes out'];
Physics12.add(2,{id:'L2-E31',topic:A,skill:'Series circuit: adding or removing a lamp',
 gen(r,h){
  const sc=h.pick(['add','remove','blow','addI','removeI'],r),n=(sc==='add'||sc==='addI')?2:3,labs=['A','B','C'].slice(0,n);
  const body=series(h,'lamp',labs);
  const intro=`Identical lamps are connected in series to a battery (see diagram).\n`;
  let cloze,answer,choices,explanation;
  if(sc==='add'){cloze=intro+`A third identical lamp is added in series.\nLamp A ____.`;answer='gets dimmer';choices=BR;explanation='Adding a lamp in series raises the total resistance, so the current falls and every lamp gets dimmer.';}
  else if(sc==='remove'){cloze=intro+`Lamp C is removed and the gap is closed with a wire.\nLamp A ____.`;answer='gets brighter';choices=BR;explanation='Removing a lamp in series lowers the total resistance, so the current rises and the other lamps get brighter.';}
  else if(sc==='blow'){cloze=intro+`The filament in lamp C breaks.\nLamp A ____.`;answer='goes out';choices=BR;explanation='In a series circuit there is only one path. A break stops the current everywhere, so all the lamps go out.';}
  else if(sc==='addI'){cloze=intro+`A third identical lamp is added in series.\nThe current from the battery ____.`;answer='decreases';choices=['increases','decreases','stays the same'];explanation='The total resistance increases and the battery voltage stays the same, so the current decreases (I = V/R).';}
  else{cloze=intro+`Lamp C is removed and the gap is closed with a wire.\nThe current from the battery ____.`;answer='increases';choices=['increases','decreases','stays the same'];explanation='The total resistance decreases and the battery voltage stays the same, so the current increases (I = V/R).';}
  return {cloze,answer,choices,explanation,visual:W(h,body,`Series circuit with ${n} lamps`)};}});

Physics12.add(2,{id:'L2-E32',topic:A,skill:'Parallel circuit: adding or removing a lamp',
 gen(r,h){
  const sc=h.pick(['add','remove','blow','addI','removeI','blowI'],r),n=(sc==='add'||sc==='addI')?2:3,labs=['A','B','C'].slice(0,n);
  const body=parallel(h,'lamp',labs);
  const intro=`Identical lamps are connected in parallel to a battery (see diagram).\n`;
  const bs='Each branch has the full battery voltage, so lamp A is not affected by changes in the other branches.';
  let cloze,answer,choices,explanation;
  if(sc==='add'){cloze=intro+`A third identical lamp is added in parallel.\nLamp A ____.`;answer='stays the same brightness';choices=BR;explanation=bs;}
  else if(sc==='remove'){cloze=intro+`Lamp C is taken out of the circuit (its branch is removed).\nLamp A ____.`;answer='stays the same brightness';choices=BR;explanation=bs;}
  else if(sc==='blow'){cloze=intro+`The filament in lamp C breaks.\nLamp A ____.`;answer='stays the same brightness';choices=BR;explanation=bs;}
  else if(sc==='addI'){cloze=intro+`A third identical lamp is added in parallel.\nThe current from the battery ____.`;answer='increases';choices=['increases','decreases','stays the same'];explanation='A new branch adds more current, and the other branches are unchanged, so the total current from the battery increases.';}
  else if(sc==='removeI'){cloze=intro+`Lamp C is taken out of the circuit (its branch is removed).\nThe current from the battery ____.`;answer='decreases';choices=['increases','decreases','stays the same'];explanation='One branch no longer carries current and the others are unchanged, so the total current from the battery decreases.';}
  else{cloze=intro+`The filament in lamp C breaks.\nThe current from the battery ____.`;answer='decreases';choices=['increases','decreases','stays the same'];explanation='The broken branch carries no current and the others are unchanged, so the total current decreases.';}
  return {cloze,answer,choices,explanation,visual:W(h,body,`Parallel circuit with ${n} lamps`)};}});

Physics12.add(2,{id:'L2-E33',topic:A,skill:'Ammeter and voltmeter placement',
 gen(r,h){
  const serX=r()<.5,wantA=r()<.5,xs=serX?'X':'Y',ys=serX?'Y':'X';
  const cx=serX?320:320;let s=cell(h,90,170)+h.line(90,100,90,164)+h.line(90,177,90,220)+h.line(90,220,300,220)+h.line(340,220,550,220)+h.line(550,220,550,100);
  s+=h.line(90,100,250,100)+resb(h,320,100)+h.text(320,142,'resistor',20)+h.line(390,100,550,100);
  s+=h.line(250,100,250,45)+h.line(250,45,300,45)+h.line(340,45,390,45)+h.line(390,45,390,100);
  const serSvg=h.circle(320,220,20)+h.text(320,228,serX?'X':'Y',22),parSvg=h.circle(320,45,20)+h.text(320,53,serX?'Y':'X',22);
  s+=serSvg+parSvg;
  const ans=wantA?xs:ys;
  return {cloze:`Two measuring devices, X and Y, are connected to a circuit as shown.\nThe ${wantA?'ammeter, which measures the current through the resistor,':'voltmeter, which measures the voltage across the resistor,'} is device ____.`,answer:ans,choices:['X','Y','either one'],
   explanation:wantA?`An ammeter must be in series with the resistor so the same current flows through it. Device ${xs} is in series.`:`A voltmeter must be in parallel with (across) the resistor. Device ${ys} is in parallel.`,
   visual:W(h,s,'A battery and a resistor with device X and device Y, one in series and one in parallel')};}});

Physics12.add(2,{id:'L2-E34',topic:A,skill:'What is the same in series or parallel',
 gen(r,h){
  const par=r()<.5,body=(par?parallel:series)(h,'res',['R₁','R₂']);
  return {cloze:`Two different resistors, R₁ and R₂, are connected in ${par?'parallel':'series'} to a battery.\nThe quantity that is the same for both is ____.`,answer:par?'the voltage across them':'the current through them',
   choices:['the voltage across them','the current through them','the resistance','the power'],
   explanation:par?'In parallel each resistor is connected straight across the battery, so both have the same voltage. The currents split.':'In series there is only one path, so the same current flows through both. The battery voltage is shared.',
   visual:W(h,body,`Two resistors in ${par?'parallel':'series'}`)};}});

Physics12.add(2,{id:'L2-E35',topic:A,skill:'Total resistance when a resistor is added or removed',
 gen(r,h){
  const par=r()<.5,sc=h.pick(['addS','addP','rem'],r);
  const body=(par?parallel:series)(h,'res',['R₁','R₂']);
  const txt={addS:'A third resistor R₃ is added in series with the existing ones.',addP:'A third resistor R₃ is added in parallel with the existing combination.',
   rem:par?'Resistor R₂ is removed (its branch is cut).':'Resistor R₂ is replaced by a plain wire.'}[sc];
  const ans=sc==='addS'?'increases':sc==='addP'?'decreases':par?'increases':'decreases';
  const why={addS:'Resistors in series add up, so the total resistance increases.',addP:'Another path for the current always lowers the total resistance, so it decreases.',
   rem:par?'Removing a parallel branch leaves fewer paths for the current, so the total resistance increases.':'Replacing a series resistor with a wire removes its resistance, so the total decreases.'}[sc];
  return {cloze:`A battery is connected to two resistors in ${par?'parallel':'series'}.\n${txt}\nThe total resistance of the circuit ____.`,answer:ans,choices:['increases','decreases','stays the same'],
   explanation:why,visual:W(h,body,`Two resistors in ${par?'parallel':'series'} before the change`)};}});

function transformer(h,np,ns){
 const big=np>ns;let s=h.rect(230,50,180,160,6)+h.rect(270,90,100,80,6);
 const strands=(x,n)=>{let t='';for(let i=0;i<n;i++){const y=64+i*(132/(n-1));t+=h.line(x-16,y,x+16,y,3);}return t;};
 s+=strands(250,big?8:4)+strands(390,big?4:8);
 s+=h.text(120,118,'Primary',22)+h.text(120,146,`${np} turns`,22)+h.text(520,118,'Secondary',22)+h.text(520,146,`${ns} turns`,22);
 return s;
}
function turnsPair(r,h){
 const base=h.pick([50,100,200,250,500,1000],r),ratio=h.pick([2,4,5,10],r),up=r()<.5;
 return up?[base,base*ratio,true]:[base*ratio,base,false];
}
Physics12.add(2,{id:'L2-E36',topic:A,skill:'Transformers: step-up or step-down',
 gen(r,h){
  const [np,ns,up]=turnsPair(r,h);
  return {cloze:`A transformer has ${np} turns on its primary coil and ${ns} turns on its secondary coil.\nIt is a ____ transformer.`,answer:up?'step-up':'step-down',choices:['step-up','step-down','AC to DC'],
   explanation:`The secondary has ${up?'more':'fewer'} turns than the primary, so the output voltage is ${up?'larger':'smaller'} than the input: a ${up?'step-up':'step-down'} transformer.`,
   visual:W(h,transformer(h,np,ns),`Transformer with ${np} primary turns and ${ns} secondary turns`)};}});

Physics12.add(2,{id:'L2-E37',topic:A,skill:'Transformers: current in the secondary',
 gen(r,h){
  const [np,ns,up]=turnsPair(r,h);
  return {cloze:`An ideal transformer has ${np} primary turns and ${ns} secondary turns.\nThe current in the secondary coil is ____ than the current in the primary coil.`,answer:up?'smaller':'larger',choices:['larger','smaller','the same'],
   explanation:`An ideal transformer has no power loss (Vₚ Iₚ = Vₛ Iₛ). The secondary voltage is ${up?'larger':'smaller'}, so the secondary current is ${up?'smaller':'larger'}.`,
   visual:W(h,transformer(h,np,ns),`Transformer with ${np} primary turns and ${ns} secondary turns`)};}});

Physics12.add(2,{id:'L2-E38',topic:A,skill:'Compare power, current and voltage in two resistors',
 gen(r,h){
  const par=r()<.5,q=h.pick(['power','current','voltage'],r),rs=h.shuffle([5,10,15,20,30,40],r).slice(0,2),ra=rs[0],rb=rs[1];
  const body=(par?parallel:series)(h,'res',[`A  ${ra} Ω`,`B  ${rb} Ω`]);
  const hi=ra>rb?'A':'B',lo=ra>rb?'B':'A';
  let ans,why;
  if(par){
   if(q==='voltage'){ans='both the same';why='In parallel both resistors are connected across the same battery, so the voltage is the same.';}
   else{ans=`resistor ${lo}`;why=`In parallel the voltage is the same, so the smaller resistance carries more current (I = V/R) and has more power (P = V²/R). Resistor ${lo} is smaller.`;}
  }else{
   if(q==='current'){ans='both the same';why='In series the same current flows through both resistors.';}
   else{ans=`resistor ${hi}`;why=`In series the current is the same, so the larger resistance has more voltage (V = IR) and more power (P = I²R). Resistor ${hi} is larger.`;}
  }
  return {cloze:`Resistor A (${ra} Ω) and resistor B (${rb} Ω) are connected in ${par?'parallel':'series'} to a battery.\nWhich has the greater ${q}?\n____`,answer:ans,choices:['resistor A','resistor B','both the same'],
   explanation:why,visual:W(h,body,`Resistors A and B in ${par?'parallel':'series'}`)};}});

Physics12.add(2,{id:'L2-E39',topic:A,skill:'Compare two lamps by their ratings',
 gen(r,h){
  const V0=h.pick([6,12],r),ps=h.shuffle([3,6,12,24,36],r).slice(0,2),pa=ps[0],pb=ps[1],q=h.pick(['current','resistance'],r);
  const s=lamp(h,200,110)+h.text(200,170,'Lamp A',22)+h.text(200,198,`${V0} V, ${pa} W`,22)+lamp(h,440,110)+h.text(440,170,'Lamp B',22)+h.text(440,198,`${V0} V, ${pb} W`,22);
  const big=pa>pb?'A':'B',small=pa>pb?'B':'A',ans=q==='current'?`lamp ${big}`:`lamp ${small}`;
  return {cloze:`Two lamps are each connected to a ${V0} V supply.\nWhich has the greater ${q}?\n____`,answer:ans,choices:['lamp A','lamp B','both the same'],
   explanation:q==='current'?`Same voltage, so I = P/V is larger for the higher-power lamp (lamp ${big}).`:`Same voltage, so R = V²/P is larger for the lower-power lamp (lamp ${small}).`,
   visual:W(h,s,`Lamp A rated ${V0} V ${pa} W and lamp B rated ${V0} V ${pb} W`)};}});
})();
