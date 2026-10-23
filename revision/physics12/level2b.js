/* Year 12 Physics, Level 2 (multiple choice): MECHANICS, part b. Ids L2-M01 …
   Circular motion directions, linear vector directions, Newton's laws, momentum, energy and work,
   torque, and graph reading. Diagrams are drawn with the Physics12 helpers (strokes use currentColor). */
(()=>{
const P=Physics12;let n=0;
const add=(skill,gen)=>P.add(2,{id:'L2-M'+String(++n).padStart(2,'0'),topic:'Mechanics',skill,gen});
const rad=d=>d*Math.PI/180;
const f1=x=>Number(x).toFixed(1);
const gcd=(a,b)=>b?gcd(b,a%b):a;
const FR={'1/2':'½','1/3':'⅓','2/3':'⅔','1/4':'¼','3/4':'¾'};
const frac=(a,b)=>{const g=gcd(Math.abs(a),b);a/=g;b/=g;return b===1?String(a):(FR[a+'/'+b]||a+'/'+b);};
const LR=s=>s>0?'to the right':'to the left';
const LETTERS=['A','B','C','D','E'];
const poly=(pts,w=4,extra='')=>`<polyline points="${pts.map(p=>f1(p[0])+','+f1(p[1])).join(' ')}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linejoin="round" ${extra}/>`;
// label beside an arrow tip at (x,y) with unit direction (dx,dy); if (cx,cy) is given, push the label away from that point's side
function tipLabel(h,x,y,dx,dy,t,cx,cy){
 let px=-dy,py=dx;
 if(cx!==undefined&&(px*(x-cx)+py*(y-cy))<0){px=-px;py=-py;}
 return h.text(f1(x+14*dx+13*px),f1(y+14*dy+13*py+7),t,22);
}
// straight labelled arrow leaving (x,y) at math angle ang (degrees, anticlockwise from +x)
function larrow(h,x,y,ang,len,t,cx,cy,o=8){
 const dx=Math.cos(rad(ang)),dy=-Math.sin(rad(ang));
 const sx=x+o*dx,sy=y+o*dy,ex=sx+len*dx,ey=sy+len*dy;
 return h.arrow(sx,sy,ex,ey,4,14)+tipLabel(h,ex,ey,dx,dy,t,cx,cy);
}
// ------------------------------------------------------------------ circular motion (top view)
const CX=320,CY=130,CR=62,CL=30;
const SC=[
 {key:'ball',obj:'ball',string:true,sub:'the ball',lines:w=>[`A ball on a string is whirled ${w}`,'in a horizontal circle at constant speed.'],
  force:'the force of the string on the ball (the tension)',prov:'The tension in the string',
  cut:['The string breaks at the instant shown.'],cutWhat:'the ball’s path just after the string breaks'},
 {key:'car',obj:'car',sub:'the car',lines:w=>[`A car drives ${w} round`,'a flat circular track at constant speed.'],
  force:'the sideways friction force of the road on the car',prov:'Friction between the tyres and the road',
  cut:['The car hits a patch of ice at the instant shown,','so there is no friction.'],cutWhat:'the car’s path just after it hits the ice'},
 {key:'coin',obj:'coin',disc:true,sub:'the coin',lines:w=>[`A coin rests on a turntable that spins ${w}.`,'The coin does not slip.'],
  force:'the friction force of the turntable on the coin',prov:'Friction between the coin and the turntable',
  cut:['The turntable spins faster, and the coin','starts to slide off at the instant shown.'],cutWhat:'the coin’s path just after it starts to slide'},
 {key:'sat',obj:'sat',planet:true,sub:'the satellite',lines:w=>[`A satellite orbits Earth ${w}`,'at constant speed. Earth is at the centre.'],
  force:'the gravitational force of Earth on the satellite',prov:'Gravity',
  cut:['Earth’s gravity suddenly switches off','at the instant shown.'],cutWhat:'the satellite’s path just after that'}
];
function circBody(h,o){
 const px=CX+CR*Math.cos(rad(o.th)),py=CY-CR*Math.sin(rad(o.th));
 let b=h.text(14,28,'Top view',20,'start');
 if(o.disc)b+=h.circle(CX,CY,CR+14,3);
 else b+=`<circle cx="${CX}" cy="${CY}" r="${CR}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="7 6"/>`;
 if(o.planet)b+=h.circle(CX,CY,7,3);
 else b+=h.circle(CX,CY,3,1,'currentColor');
 if(o.string)b+=h.line(CX,CY,f1(px),f1(py),2);
 const deg=-(o.th+90*o.s);
 if(o.obj==='ball')b+=h.circle(f1(px),f1(py),8,2,'currentColor');
 else if(o.obj==='car')b+=`<g transform="translate(${f1(px)} ${f1(py)}) rotate(${f1(deg)})">${h.rect(-15,-8,30,16,3,'var(--bg,#fff)')}</g>`;
 else if(o.obj==='coin')b+=h.circle(f1(px),f1(py),8,3);
 else b+=`<g transform="translate(${f1(px)} ${f1(py)}) rotate(${f1(deg)})">${h.rect(-8,-6,16,12,3,'currentColor')}</g>`;
 const ang={tf:o.th+90*o.s,tb:o.th-90*o.s,in:o.th+180,out:o.th};
 o.arrows.forEach(a=>{
  if(a.k==='curve'){
   const a0=o.th+o.s*9,a1=o.th+o.s*68;
   const x0=CX+CR*Math.cos(rad(a0)),y0=CY-CR*Math.sin(rad(a0)),x1=CX+CR*Math.cos(rad(a1)),y1=CY-CR*Math.sin(rad(a1));
   const ta=a1+90*o.s,dx=Math.cos(rad(ta)),dy=-Math.sin(rad(ta));
   const hd=(d)=>f1(x1-14*Math.cos(rad(ta+d)))+','+f1(y1+14*Math.sin(rad(ta+d)));
   b+=`<path d="M${f1(x0)} ${f1(y0)} A${CR} ${CR} 0 0 ${o.s>0?0:1} ${f1(x1)} ${f1(y1)}" fill="none" stroke="currentColor" stroke-width="4"/>`+
      `<polygon points="${f1(x1)},${f1(y1)} ${hd(26)} ${hd(-26)}" fill="currentColor"/>`+tipLabel(h,x1,y1,dx,dy,a.l,CX,CY);
  }else b+=larrow(h,px,py,ang[a.k],o.obj==='sat'?21:CL,a.l,CX,CY,o.obj==='car'?17:o.obj==='sat'?9:10);
 });
 return b;
}
// kinds: array of arrow kinds; correct kind; returns {cloze lines, answer letter, choices, visual}
function circQ(r,h,kind){
 const sc=h.pick(SC,r),th=h.pick([90,45,0,-45,-90,-135,180,135],r),s=r()<.5?1:-1,w=s>0?'anticlockwise':'clockwise';
 let kinds,correct,what,extra=[],expl;
 if(kind==='vel'){kinds=['tf','tb','in','out'];correct='tf';what=`the velocity of ${sc.sub}`;
  expl=`Velocity is along the tangent to the circle, in the direction of motion (${w} here). It is not toward or away from the centre.`;}
 else if(kind==='acc'){kinds=['in','out','tf','tb'];correct='in';what=`the acceleration of ${sc.sub}`;
  expl=`Even at constant speed the direction keeps changing, so there is an acceleration. It points toward the centre of the circle (a = v²/r).`;}
 else if(kind==='net'){kinds=['in','out','tf','tb'];correct='in';what=`the net force on ${sc.sub}`;
  expl=`The net force is the centripetal force: it points toward the centre of the circle, at right angles to the velocity. There is no outward force.`;}
 else if(kind==='force'){kinds=['in','out','tf','tb'];correct='in';what=sc.force;
  expl=`${sc.prov} provides the centripetal force, so it points toward the centre of the circle.`;}
 else{kinds=['tf','out','curve','in'];correct='tf';what=sc.cutWhat;extra=sc.cut;
  expl=`With no centripetal force the object keeps its velocity (Newton’s first law): it moves in a straight line along the tangent, not outward and not round the curve.`;}
 const order=h.shuffle(kinds,r),L=order.map((k,i)=>({k,l:LETTERS[i]}));
 const ans=L.find(x=>x.k===correct).l;
 const body=circBody(h,{th,s,obj:sc.obj,disc:sc.disc,planet:sc.planet,string:sc.string,arrows:L});
 const subj=kind==='cut'?'Arrow ____ shows '+what+'.':'Arrow ____ shows '+what+' at this instant.';
 return {cloze:[...sc.lines(w),...extra,subj].join('\n'),answer:ans,choices:['A','B','C','D'],
  explanation:`Arrow ${ans}. ${expl}`,visual:{type:'svg',svg:h.svgWrap(body,`Top view of a circular path with four labelled arrows A to D drawn from the moving object`)}};
}
add('Circular motion: velocity direction',(r,h)=>circQ(r,h,'vel'));
add('Circular motion: acceleration direction',(r,h)=>circQ(r,h,'acc'));
add('Circular motion: net force direction',(r,h)=>circQ(r,h,'net'));
add('Circular motion: which force points inward',(r,h)=>circQ(r,h,'force'));
add('Circular motion: path when the force stops',(r,h)=>circQ(r,h,'cut'));

// what provides the centripetal force
add('What provides the centripetal force',(r,h)=>{
 const it=h.pick([
  ['a ball whirled round on a string','tension','The string pulls the ball toward the centre, so the tension is the centripetal force.'],
  ['a car turning a corner on a flat road','friction','Friction between the tyres and the road pushes the car toward the centre of the bend.'],
  ['the Moon orbiting Earth','gravity','Earth’s gravity pulls the Moon toward the centre of its orbit.'],
  ['a coin on a spinning turntable','friction','Friction from the turntable on the coin points toward the centre.'],
  ['a satellite in orbit','gravity','Gravity is the only force on the satellite and it points toward Earth’s centre.'],
  ['a stone swung round on a rope','tension','The rope pulls the stone toward the centre.'],
  ['a cyclist going round a flat corner','friction','Friction between the tyres and the road points toward the centre of the turn.']],r);
 return {cloze:`The centripetal force on ${it[0]}\nis provided by ____.`,answer:it[1],choices:['tension','friction','gravity','a centrifugal force','the normal force'],
  explanation:it[2]+' Centripetal force is not a new force: it is the name for the net force toward the centre. “Centrifugal force” is not a real force on the object.'};
});

// scaling
add('Centripetal force and acceleration: scaling',(r,h)=>{
 const names={v:['speed','v'],r:['radius','r'],m:['mass','m']};
 for(let tries=0;tries<200;tries++){
  const keys=h.shuffle(['v','r','m'],r).slice(0,r()<.5?1:2);
  const fac={v:1,r:1,m:1};keys.forEach(k=>{fac[k]=r()<.5?2:0.5;});
  const asks=h.pick(['force','accel'],r);
  const F=fac.m*fac.v*fac.v/fac.r,A=fac.v*fac.v/fac.r;
  const val=asks==='force'?F:A;
  if(![0.25,0.5,1,2,4].includes(val))continue;
  const phr={v:['its speed is doubled','its speed is halved'],r:['the radius of the circle is doubled','the radius of the circle is halved'],m:['its mass is doubled','its mass is halved']};
  const ch=keys.map(k=>phr[k][fac[k]===2?0:1]);
  const same=['v','r','m'].filter(k=>!keys.includes(k)).map(k=>names[k][0]);
  const ans={0.25:'becomes ¼ as big',0.5:'halves',1:'stays the same',2:'doubles',4:'becomes 4 times as big'}[val];
  const what=asks==='force'?'the centripetal force needed':'the centripetal acceleration';
  const obj=h.pick(['An object moves in a horizontal circle at constant speed.','A car goes round a circular track at constant speed.','A ball on a string moves in a circle at constant speed.'],r);
  const forms=asks==='force'?'F = mv²/r':'a = v²/r';
  return {cloze:`${obj}\nThen ${ch.join(' and ')}\n(the ${same.join(' and ')} stay${same.length>1?'':'s'} the same).\nThe ${what} ____.`,
   answer:ans,choices:['becomes ¼ as big','halves','stays the same','doubles','becomes 4 times as big'],
   explanation:`${forms}. Speed is squared, radius is on the bottom${asks==='force'?', mass is on top':', and mass does not appear in a = v²/r'}. Overall factor = ${frac(Math.round(val*4),4)}.`};
 }
});

// concept statements about circular motion
add('Circular motion: concept check',(r,h)=>{
 const it=h.pick([
  ['A car moves round a circular track at constant speed.\nWhich statement is correct?','The car is accelerating, because its velocity is changing direction',['The car is not accelerating, because its speed is constant','The net force on the car is zero, because its speed is constant','The car is accelerating, because its speed is increasing'],'Velocity is a vector: changing direction is changing velocity, so there is an acceleration (toward the centre).'],
  ['Centripetal force is best described as','the net force toward the centre of the circle',['an outward force that throws the object away from the centre','a force in the direction of the velocity','an extra force that balances the object’s weight'],'It is just the name for the net inward force that makes the object follow a circle.'],
  ['A passenger feels pushed outward as a car turns a sharp corner.\nThe best explanation is that the passenger','tends to keep moving in a straight line',['is pushed by a centrifugal force','is pulled by the centripetal force','has no forces acting on them at all'],'Newton’s first law: the passenger’s body tends to continue straight while the car turns; the door/seat then pushes them inward.'],
  ['For an object moving in a circle at constant speed, the direction of its acceleration is','at right angles to its velocity',['in the same direction as its velocity','opposite to its velocity','away from the centre'],'Acceleration points toward the centre; velocity is along the tangent, so they are at right angles.'],
  ['A ball moves in a circle on the end of a string at constant speed.\nThe string tension does','no work on the ball',['positive work on the ball','negative work on the ball','work that increases the ball’s speed'],'The force is at right angles to the motion, so it transfers no energy and the speed stays constant.'],
  ['The Moon travels in a nearly circular orbit around Earth.\nThe net force on the Moon points','toward the centre of Earth',['in the direction the Moon is moving','away from Earth','is zero, since the Moon’s speed is constant'],'Gravity from Earth is the net force and points toward Earth’s centre, the centre of the orbit.']],r);
 const ans=it[1];
 return {cloze:`${it[0]}\n____.`,answer:ans,choices:[ans,...it[2]],explanation:it[3]};
});

// vertical circle
add('Vertical circle: forces at top, bottom and sides',(r,h)=>{
 const pos=h.pick(['bottom','top','left','right'],r),cx=320,cy=125,R=80;
 const ang={bottom:-90,top:90,left:180,right:0}[pos];
 const bx=cx+R*Math.cos(rad(ang)),by=cy-R*Math.sin(rad(ang));
 const body=h.circle(cx,cy,R,2.5).replace('fill="none"','fill="none" stroke-dasharray="7 6"')+h.circle(cx,cy,3,1,'currentColor')+h.line(cx,cy,f1(bx),f1(by),2)+h.circle(f1(bx),f1(by),11,2,'currentColor')+h.text(14,28,'Side view',20,'start');
 let cloze,answer,choices,explanation;
 if(pos==='bottom'){
  if(r()<.5){cloze='A ball on a string is swung in a vertical circle.\nAt the lowest point the net force on the ball\npoints ____.';answer='upward, toward the centre';
   choices=['upward, toward the centre','downward, away from the centre','horizontally, in the direction of motion','zero'];explanation='The net force must point toward the centre of the circle, which is upward at the bottom.';}
  else{cloze='A ball on a string is swung in a vertical circle.\nAt the lowest point, the tension in the string is\n____ the ball’s weight.';answer='greater than';choices=['greater than','equal to','less than'];
   explanation='Net force is upward toward the centre: tension (up) minus weight (down) must be positive, so T > W.';}
 }else if(pos==='top'){
  if(r()<.5){cloze='A ball on a string is swung in a vertical circle.\nAt the highest point the net force on the ball\npoints ____.';answer='downward, toward the centre';
   choices=['downward, toward the centre','upward, away from the centre','horizontally, in the direction of motion','zero'];explanation='The net force points toward the centre of the circle, which is downward at the top.';}
  else{cloze='A ball on a string is swung in a vertical circle.\nAt the highest point the weight and the tension\nboth act ____.';answer='downward';choices=['downward','upward','in opposite directions'];
   explanation='Weight always acts down. A string can only pull, so at the top it pulls the ball down, toward the centre.';}
 }else{
  cloze=`A ball on a string is swung in a vertical circle.\nAt the ${pos}-hand side, the force toward the centre\nof the circle is the ____.`;answer='tension';choices=['tension','weight','centrifugal force','friction'];
  explanation='At the side the string is horizontal and pulls the ball toward the centre. The weight acts down, at right angles to the radius, so it does not supply the centripetal force there.';
 }
 return {cloze,answer,choices,explanation,visual:{type:'svg',svg:h.svgWrap(body,'A ball on a string at one point of a vertical circle')}};
});

// ------------------------------------------------------------------ linear vectors
const cart=(h,x,gy,w=100)=>h.rect(x-w/2,gy-52,w,30,3)+h.circle(x-w/4,gy-11,11,3)+h.circle(x+w/4,gy-11,11,3);
const floor=(h,gy)=>h.line(40,gy,600,gy,3);
add('Net force and acceleration: speeding up or slowing down',(r,h)=>{
 const d=r()<.5?1:-1,m=h.pick([['speeding up',1],['slowing down',-1],['moving at a constant velocity',0]],r),q=h.pick(['net force','acceleration'],r);
 const gy=190,body=floor(h,gy)+cart(h,320,gy)+h.arrow(320,gy-100,320+d*110,gy-100,5,16)+h.text(320+d*55,gy-114,'v',24);
 const vec=m[1]*d,answer=vec===0?'zero':LR(vec);
 return {cloze:`The car is ${m[0]}.\nThe arrow shows its velocity.\nThe ${q} of the car is ____.`.replace('of the car is','on the car is').replace('The acceleration on','The acceleration of'),answer,choices:['to the left','to the right','zero'],
  explanation:vec===0?'Constant velocity means zero acceleration, so the net force is zero (Newton’s first law).':`${m[1]>0?'Speeding up: acceleration and net force are in the direction of the velocity.':'Slowing down: acceleration and net force are opposite to the velocity.'} (F = ma, so net force and acceleration point the same way.)`,
  visual:{type:'svg',svg:h.svgWrap(body,'A car with an arrow showing its velocity')}};
});

add('Friction direction',(r,h)=>{
 const d=r()<.5?1:-1,k=h.pick(['slide','push','truck','tyre'],r),gy=190;
 let body=floor(h,gy),cloze,answer,explanation,choices=['to the left','to the right','upward','downward'];
 if(k==='slide'){body+=h.rect(290,gy-60,60,60,3)+h.arrow(320,gy-95,320+d*100,gy-95,5,16)+h.text(320+d*50,gy-109,'v',24);
  cloze='A block slides across a rough floor.\nThe arrow shows its velocity.\nThe friction force on the block acts ____.';answer=LR(-d);explanation='Kinetic friction opposes the motion of the surface sliding past, so it points opposite to the velocity.';}
 else if(k==='push'){body=floor(h,gy)+h.rect(290,gy-60,60,60,3)+h.arrow(320-d*95,gy-30,320-d*35,gy-30,5,16)+h.text(320-d*65,gy-44,'push',22);
  cloze='A student pushes a heavy box on a rough floor,\nbut the box does not move.\nThe friction force on the box acts ____.';answer=LR(-d);explanation='The box is at rest, so friction balances the push: equal size, opposite direction.';}
 else if(k==='truck'){body+=cart(h,320,gy,140)+h.rect(300,gy-82,40,30,3)+h.arrow(320,gy-125,320+d*110,gy-125,5,16)+h.text(320+d*55,gy-139,'a',24);
  cloze='A crate sits on the back of a truck. The truck speeds\nup, as shown by its acceleration a, and the crate\ndoes not slide. Friction on the crate acts ____.';answer=LR(d);choices=['to the left','to the right','upward'];
  explanation='The crate accelerates with the truck. Only friction acts horizontally on it, so friction is the net force and points in the direction of the acceleration.';}
 else{body+=cart(h,320,gy)+h.arrow(320,gy-100,320+d*110,gy-100,5,16)+h.text(320+d*55,gy-114,'v',24);
  cloze='A car is driving along the road, as shown.\nThe road pushes on the driving tyres with a friction\nforce that acts ____.';answer=LR(d);choices=['to the left','to the right','upward'];
  explanation='The tyres push backward on the road, so by Newton’s third law the road pushes the tyres forward. Friction here acts in the direction of motion.';}
 return {cloze,answer,choices,explanation,visual:{type:'svg',svg:h.svgWrap(body,'A diagram for a friction question')}};
});

add('Directions of weight, normal force and tension',(r,h)=>{
 const d=r()<.5?1:-1,k=h.pick(['weight','normal','wall','cable','rope'],r),gy=200;
 let body='',cloze,answer,choices,explanation;
 if(k==='weight'){cloze='A book rests on a table.\nThe weight of the book acts ____.';answer='downward';choices=['downward','upward','sideways (horizontally)'];explanation='Weight is the pull of gravity on the book, toward the centre of Earth: downward.';
  body=floor(h,gy)+h.rect(270,gy-30,100,30,3)+h.rect(280,gy-60,80,30,3);}
 else if(k==='normal'){cloze='A book rests on a table.\nThe normal force on the book from the table acts ____.';answer='upward';choices=['upward','downward','sideways (horizontally)'];explanation='The normal force is a contact force that acts at right angles to the surface, away from it: upward from a table.';
  body=floor(h,gy)+h.rect(270,gy-30,100,30,3)+h.rect(280,gy-60,80,30,3);}
 else if(k==='cable'){cloze='A lamp hangs at rest from the ceiling on a cable.\nThe force of the cable on the lamp acts ____.';answer='upward';choices=['upward','downward','sideways (horizontally)'];explanation='Tension pulls along the cable, away from the lamp, toward the ceiling: upward. It balances the weight.';
  body=h.line(200,30,440,30,5)+h.line(320,30,320,120,3)+h.circle(320,145,25,3);}
 else if(k==='wall'){const wx=320+d*70;
  body=floor(h,gy)+h.line(wx,40,wx,gy,6)+[0,1,2,3,4].map(i=>h.line(wx,70+i*30,wx+d*18,52+i*30,2)).join('')+h.rect(wx-d*30-30,gy-60,60,60,3)+h.arrow(wx-d*60-d*80,gy-30,wx-d*60-d*8,gy-30,5,16)+h.text(wx-d*60-d*50,gy-44,'push',22);
  cloze='A hand pushes a box against a wall, as shown.\nThe normal force on the box from the wall acts ____.';answer=LR(-d);choices=['to the left','to the right','upward','downward'];
  explanation='The normal force is at right angles to the wall and pushes the box away from the wall.';}
 else{const sx=320-d*40;
  body=floor(h,gy)+h.rect(sx-45,gy-30,90,30,3)+h.line(sx+d*45,gy-20,sx+d*45+d*130,gy-110,3)+h.circle(sx+d*45+d*140,gy-118,12,3)+h.text(sx+d*45+d*140,gy-148,'hand',20);
  cloze='A student pulls a sled with a rope held\nabove the ground, as shown. The force of the rope\non the sled acts ____.';answer='along the rope, toward the hand';
  choices=['along the rope, toward the hand','along the rope, away from the hand','straight upward','horizontally, away from the hand'];explanation='A rope can only pull. Tension acts along the rope, directed away from the object that the rope pulls, toward the hand.';}
 return {cloze,answer,choices,explanation,visual:{type:'svg',svg:h.svgWrap(body,'A diagram for a force direction question')}};
});

add('Net force from force arrows',(r,h)=>{
 const vert=r()<.4,a=h.int(2,12,r);let b=r()<.25?a:h.int(2,12,r);
 const sc=vert?6:9,cx=320,cy=130;
 const body=h.rect(cx-35,cy-25,70,50,3);
 let svg=body,net=a-b; // a: toward positive (right/up), b: negative
 if(!vert){svg+=h.arrow(cx+35,cy,cx+35+a*sc,cy,5,16)+h.text(cx+35+a*sc/2,cy-18,a+' N',22)+h.arrow(cx-35,cy,cx-35-b*sc,cy,5,16)+h.text(cx-35-b*sc/2,cy-18,b+' N',22);}
 else{svg+=h.arrow(cx,cy-25,cx,cy-25-a*sc,5,16)+h.text(cx+38,cy-25-a*sc/2+7,a+' N',22,'start')+h.arrow(cx,cy+25,cx,cy+25+b*sc,5,16)+h.text(cx+38,cy+25+b*sc/2+7,b+' N',22,'start');}
 const pos=vert?'upward':'to the right',neg=vert?'downward':'to the left';
 let cloze,answer,choices,explanation;
 if(r()<.5||true){
  answer=net===0?'zero':(net>0?pos:neg);
  cloze='The forces on a box are shown.\nThe net force on the box is ____.';choices=[pos,neg,'zero'];
  explanation=net===0?`${a} N and ${b} N in opposite directions balance, so the net force is zero.`:`Opposite forces subtract: ${Math.max(a,b)} − ${Math.min(a,b)} = ${Math.abs(net)} N, ${net>0?pos:neg} (the direction of the larger force).`;
 }
 if(net===0&&r()<.5){cloze='The forces on a box are shown.\nThe box ____.';answer='stays at rest or moves at constant velocity';choices=[`accelerates ${pos}`,`accelerates ${neg}`,answer];
  explanation='The forces are balanced (net force zero), so by Newton’s first law the velocity does not change.';}
 else if(net!==0&&r()<.5){cloze='The forces on a box are shown.\nThe box ____.';answer=`accelerates ${net>0?pos:neg}`;choices=[`accelerates ${pos}`,`accelerates ${neg}`,'stays at rest or moves at constant velocity'];
  explanation=`Net force ${Math.abs(net)} N ${net>0?pos:neg}, so by F = ma the box accelerates that way.`;}
 return {cloze,answer,choices,explanation,visual:{type:'svg',svg:h.svgWrap(svg,'A box with two opposite force arrows labelled in newtons')}};
});

add('Resultant of two perpendicular forces',(r,h)=>{
 const pr=h.pick([[3,4],[4,3],[6,8],[8,6],[3,6],[6,3],[4,8],[8,4]],r),sx=r()<.5?1:-1,sy=r()<.5?1:-1,sc=11;
 const [a,b]=pr,ox=190,oy=135;
 let svg=h.rect(ox-30,oy-20,60,40,3);
 svg+=h.arrow(ox+sx*30,oy,ox+sx*(30+a*sc),oy,5,16)+h.text(ox+sx*(30+a*sc+34),oy+8,a+' N',22);
 svg+=h.arrow(ox,oy-sy*20,ox,oy-sy*(20+b*sc),5,16)+h.text(ox+ (sx>0?-14:14),oy-sy*(20+b*sc/2)+7,b+' N',22,sx>0?'end':'start');
 const ang=Math.atan2(sy*b,sx*a)*180/Math.PI;
 const cands=[{k:'right',a:ang},{k:'mx',a:Math.atan2(sy*b,-sx*a)*180/Math.PI},{k:'my',a:Math.atan2(-sy*b,sx*a)*180/Math.PI},{k:'mxy',a:Math.atan2(-sy*b,-sx*a)*180/Math.PI}];
 const order=h.shuffle(cands,r),ex=470,ey=135;
 svg+=h.circle(ex,ey,4,1,'currentColor');
 order.forEach((c,i)=>{c.l=LETTERS[i];svg+=larrow(h,ex,ey,c.a,62,c.l,undefined,undefined,0);});
 const ans=order.find(c=>c.k==='right').l;
 return {cloze:'Two forces act on a box, as shown.\nWhich arrow shows the direction of the\nnet force? Arrow ____.',answer:ans,choices:['A','B','C','D'],
  explanation:`Add the forces as vectors: ${a} N ${sx>0?'right':'left'} and ${b} N ${sy>0?'up':'down'} give a resultant pointing ${sy>0?'up':'down'} and ${sx>0?'right':'left'}, at an angle set by the sizes (tan θ = ${b}/${a}).`,
  visual:{type:'svg',svg:h.svgWrap(svg,'A box with a horizontal and a vertical force, and four labelled arrows A to D to choose from')}};
});

// ------------------------------------------------------------------ projectiles
function para(x0,y0,x1,y1,xa,ya,N=24){ // parabola through (x0,y0), apex (xa,ya), symmetric about xa
 const k=(y0-ya)/((x0-xa)*(x0-xa)),pts=[];for(let i=0;i<=N;i++){const x=x0+(x1-x0)*i/N;pts.push([x,ya+k*(x-xa)*(x-xa)]);}return pts;}
add('Projectile: acceleration and velocity at points of the flight',(r,h)=>{
 const pt=h.pick(['P','Q','R'],r),q=h.pick(['acc','acc','vv','force'],r);
 const path=para(150,225,490,225,320,40);
 const xs={P:230,Q:320,R:410},ys={P:40+185*((230-320)/170)**2,Q:40,R:40+185*((410-320)/170)**2};
 let body=poly(path,3,'stroke-dasharray="8 6"')+h.line(60,225,600,225,3);
 ['P','Q','R'].forEach(p=>{body+=h.circle(xs[p],f1(ys[p]),(p===pt?9:5),2,p===pt?'currentColor':'none')+h.text(xs[p]+(p==='P'?-24:p==='R'?24:0),f1(ys[p]+(p==='Q'?-18:6)),p,22);});
 let cloze,answer,choices,explanation;
 const where=pt==='Q'?'at the highest point Q':`at point ${pt}`;
 if(q==='acc'){cloze=`A ball is kicked at an angle (ignore air resistance).\nThe acceleration of the ball ${where}\nis ____.`;answer='downward';choices=['downward','upward','zero','along the path of the ball'];
  explanation='Only gravity acts, so the acceleration is g = 9.8 m/s² downward at every point, including the top.';}
 else if(q==='force'){cloze=`A ball is kicked at an angle (ignore air resistance).\nThe net force on the ball ${where}\nis ____.`;answer='its weight, downward';choices=['its weight, downward','zero','upward','in the direction of its velocity'];
  explanation='With no air resistance the only force is the weight, downward, throughout the flight.';}
 else{cloze='A ball is kicked at an angle (ignore air resistance).\nAt the highest point Q, the vertical part of\nits velocity is ____.';answer='zero';choices=['zero','upward','downward','equal to g'];
  explanation='At the top it stops rising and has not yet started falling, so the vertical velocity is zero (the horizontal velocity is not).';}
 return {cloze,answer,choices,explanation,visual:{type:'svg',svg:h.svgWrap(body,'The curved path of a kicked ball with three marked points P, Q and R')}};
});

add('Projectile: horizontal and vertical motion',(r,h)=>{
 const hor=r()<.5,comp=h.pick(['horizontal','vertical'],r);
 let body,cloze,answer,choices,explanation;
 if(hor){const path=para(200,90,540,230,200,90).filter(p=>p[1]<=232);
  // parabola with vertex at table edge
  const pts=[];for(let i=0;i<=24;i++){const x=200+i*14;pts.push([x,90+(x-200)*(x-200)*140/(340*340)]);}
  body=poly(pts,3,'stroke-dasharray="8 6"')+h.line(60,230,600,230,3)+h.line(80,90,200,90,4)+h.line(80,90,80,230,4)+h.circle(200,82,8,2,'currentColor');
  cloze=`A ball rolls off a table and leaves the edge horizontally\n(ignore air resistance). While it is in the air its\n${comp} velocity ____.`;
  if(comp==='horizontal'){answer='stays constant';explanation='No horizontal force acts (no air resistance), so the horizontal velocity does not change.';}
  else{answer='increases';explanation='Gravity gives a constant downward acceleration, so the vertical (downward) velocity increases steadily.';}
  choices=['stays constant','increases','decreases','is zero'];
 }else{
  const path=para(130,225,510,225,320,45);
  body=poly(path,3,'stroke-dasharray="8 6"')+h.line(60,225,600,225,3)+h.arrow(130,225,160,185,4,12)+h.circle(205,f1(45+180*((205-320)/190)**2),8,2,'currentColor');
  cloze=`A ball is kicked at an angle. While it rises to its\nhighest point (ignore air resistance), its\n${comp} velocity ____.`;
  if(comp==='horizontal'){answer='stays constant';explanation='There is no horizontal force, so the horizontal velocity is constant for the whole flight.';}
  else{answer='decreases';explanation='Gravity acts downward, opposite to the upward vertical velocity, so that velocity decreases by 9.8 m/s every second until it reaches zero at the top.';}
  choices=['stays constant','increases','decreases','is zero'];
 }
 return {cloze,answer,choices,explanation,visual:{type:'svg',svg:h.svgWrap(body,'A ball moving along a curved path under gravity')}};
});

add('Projectile: independence of horizontal and vertical motion',(r,h)=>{
 const kind=h.pick(['drop','fast'],r),sw=r()<.5,gy=235,top=60;
 const mk=(x,dx,lab)=>{ // path from (x,top): straight down (dx=0) or launched sideways to the right
  const pts=[];for(let i=0;i<=20;i++){const t=i/20;pts.push([x+dx*t,top+(gy-top)*t*t]);}
  return (dx===0?h.line(x,top,x,gy-6,3,'stroke-dasharray="8 6"'):poly(pts,3,'stroke-dasharray="8 6"'))+h.circle(x,top,9,2,'currentColor')+h.text(x-(dx===0?0:20),top-14,lab,22);};
 let body=h.line(60,gy,600,gy,3)+h.line(60,top,600,top,2);
 const bx=sw?400:180,ax=sw?160:420;
 let cloze,explanation;
 if(kind==='drop'){
  body+=mk(ax,0,'A')+mk(sw?bx-40:bx,120,'B');
  cloze='At the same instant, ball A is dropped and ball B\nis thrown sideways from the same height.\nIgnore air resistance. They hit the ground ____.';
  explanation='The vertical motion is the same for both (start from zero vertical velocity, same height, same g), so they take the same time.';
 }else{
  body+=mk(sw?ax:ax-60,90,'A')+mk(sw?bx-130:bx-20,190,'B');
  cloze='At the same instant, balls A and B are thrown\nsideways from the same height, B faster than A.\nIgnore air resistance. They hit the ground ____.';
  explanation='Horizontal speed does not affect the time of fall. Both fall the same height with the same vertical motion, so they land at the same time (B lands further away).';
 }
 return {cloze,answer:'at the same time',choices:['at the same time','A first','B first'],explanation,visual:{type:'svg',svg:h.svgWrap(body,'Two balls released from the same height, one dropped or thrown slower and one thrown sideways faster')}};
});

// ------------------------------------------------------------------ Newton's laws
add('Newton’s third law pairs',(r,h)=>{
 const strikers=[['bat','ball'],['boot','football'],['hammer','nail'],['racquet','ball'],['stick','puck']];
 const sp=h.pick(strikers,r);
 const it=h.pick([
  ['A book rests on a table. Earth pulls the book\ndown (its weight). The reaction force is','the book pulling Earth upward',['the table pushing the book upward','the book pushing down on the table','the table pushing down on the floor'],'Third-law pairs are the same type of force acting on two different objects: Earth pulls book, so book pulls Earth. The table’s push is a different force (a normal force).'],
  [`A ${sp[0]} hits a ${sp[1]}. The ${sp[0]} pushes on the ${sp[1]}.\nThe reaction force is`,`the ${sp[1]} pushing on the ${sp[0]}`,[`the weight of the ${sp[1]}`,`the weight of the ${sp[0]}`,`the ${sp[1]} accelerating away`],'A third-law pair: the force on A by B and the force on B by A. They are equal in size, opposite in direction, and act on different objects.'],
  ['A swimmer pushes the water backward.\nThe reaction force is','the water pushing the swimmer forward',['the swimmer’s weight','the water’s drag on the swimmer','the swimmer pushing the water forward'],'Swimmer pushes water back; water pushes swimmer forward (equal and opposite, on different objects).'],
  ['A tyre pushes backward on the road.\nThe reaction force is','the road pushing the tyre forward',['the weight of the car','air resistance on the car','the engine pushing the car forward'],'Force of tyre on road and force of road on tyre are a third-law pair.'],
  ['A rocket pushes hot gas downward.\nThe reaction force is','the gas pushing the rocket upward',['the weight of the rocket','air resistance on the rocket','the rocket’s weight pulling the gas'],'Rocket pushes on gas; gas pushes on rocket. This upward force on the rocket is the thrust.'],
  ['Earth pulls the Moon with a gravitational force.\nThe reaction force is','the Moon pulling Earth',['the Moon’s orbital speed','the centrifugal force on the Moon','Earth’s weight'],'Gravity acts on both objects: Earth pulls Moon, Moon pulls Earth, with equal-sized forces.'],
  ['A person stands on the floor. The floor pushes up\non the person. The reaction force is','the person pushing down on the floor',['the person’s weight','the floor’s weight','friction from the floor'],'A weight (Earth pulling the person) is not the reaction to the floor’s push. The pair is floor-on-person and person-on-floor.']],r);
 return {cloze:`${it[0]}\n${'____'}.`,answer:it[1],choices:[it[1],...it[2]],explanation:it[3]};
});

add('Which of Newton’s laws',(r,h)=>{
 const L1='Newton’s first law',L2='Newton’s second law',L3='Newton’s third law';
 const it=h.pick([
  ['A passenger lurches forward when a bus brakes suddenly.',L1,'The passenger keeps moving at constant velocity unless a net force acts (inertia).'],
  ['A hockey puck slides on smooth ice at almost constant speed.',L1,'With almost no net force, the velocity stays constant.'],
  ['A coin on a card stays put when the card is flicked away.',L1,'The coin has inertia: it tends to stay at rest.'],
  ['A spacecraft far from any star coasts at constant velocity\nwith its engines off.',L1,'No net force means no change in velocity.'],
  ['A loaded shopping trolley is harder to speed up than\nan empty one, using the same push.',L2,'a = F/m: for the same force, a bigger mass has a smaller acceleration.'],
  ['Doubling the force on a trolley doubles its acceleration.',L2,'a = F/m: acceleration is proportional to the net force.'],
  ['A light car accelerates faster than a heavy truck\nwhen both have the same net force.',L2,'a = F/m.'],
  ['A balloon shoots across a room as air rushes out of it.',L3,'The balloon pushes air out; the air pushes the balloon the other way (equal and opposite pair).'],
  ['A person steps from a small boat onto a jetty\nand the boat moves backward.',L3,'The person pushes the boat back; the boat pushes the person forward.'],
  ['A rower pushes the water backward with the oar\nand the boat moves forward.',L3,'Force on water by oar and force on oar by water are a third-law pair.'],
  ['A student pushes a wall and feels the wall push back.',L3,'Equal and opposite forces on two different objects.']],r);
 return {cloze:`${it[0]}\nThis is explained by ____.`,answer:it[1],choices:[L1,L2,L3],explanation:it[2]};
});

add('Balanced and unbalanced forces',(r,h)=>{
 const bal='zero (balanced forces)';
 const it=h.pick([
  ['A skydiver falls at a constant velocity','The net force on the skydiver is ____.',bal,['downward','upward'],'Constant velocity means no acceleration, so the net force is zero (Newton’s first law).'],
  ['A lift moves upward at a steady 2 m/s','The net force on the lift is ____.',bal,['upward','downward'],'Steady speed in a straight line: acceleration is zero, so the net force is zero. The cable tension equals the weight.'],
  ['A crate rests on a floor','The net force on the crate is ____.',bal,['upward','downward'],'At rest means zero acceleration, so the forces balance.'],
  ['A car is speeding up along a straight road','The net force on the car is ____.','forward',[bal,'backward'],'Speeding up means acceleration forward, so the net force is forward.'],
  ['A box slides along a rough floor and slows down','The net force on the box is ____.','backward (opposite to the motion)',[bal,'forward'],'Slowing down means acceleration opposite to the velocity, so net force opposes the motion (friction).'],
  ['A ball is at the top of its flight (no air resistance)','The net force on the ball is ____.','downward (its weight)',[bal,'upward'],'Its velocity is momentarily zero, but gravity still acts, so the net force is not zero.'],
  ['A cyclist rides at constant velocity on a flat road','The forward and backward forces on the cyclist are ____.','equal in size',['larger forward','larger backward'],'Constant velocity: net force zero, so the forward force equals the resistive force.']],r);
 const ans=it[2],bal2=it[3];
 return {cloze:`${it[0]}.\n${it[1]}`,answer:ans,choices:[ans,...bal2],explanation:it[4]};
});

add('Engine force and resistive force',(r,h)=>{
 const F=h.int(4,20,r)*100,mode=h.pick(['constant','faster','slower'],r);
 const A={constant:'The car travels at a constant speed in a straight line.',faster:'The car speeds up along a straight road.',slower:'The car slows down along a straight road with the engine still on.'}[mode];
 const ans={constant:'equal to the engine force',faster:'less than the engine force',slower:'greater than the engine force'}[mode];
 const ex={constant:'Constant velocity means zero net force, so the resistive force equals the engine force.',faster:'Speeding up means the net force is forward, so the engine force is larger than the resistive force.',slower:'Slowing down means the net force is backward, so the resistive force is larger than the engine force.'}[mode];
 return {cloze:`The engine force on a car is ${F} N.\n${A}\nThe total resistive force is ____.`,answer:ans,choices:['equal to the engine force','less than the engine force','greater than the engine force'],explanation:ex};
});

// ------------------------------------------------------------------ momentum
add('Recoil: pushing apart',(r,h)=>{
 const pr=h.pick([[60,40],[40,60],[50,50],[80,40],[40,80],[70,35],[35,70],[90,45]],r),aLeft=r()<.5;
 const [ma,mb]=pr,unit=h.pick(['skaters','astronauts','trolleys'],r);
 const U={skaters:['skater','Skaters A and B stand still on smooth ice,\ntouching. They push off each other.'],astronauts:['astronaut','Astronauts A and B float at rest in space,\ntouching. They push off each other.'],trolleys:['trolley','Trolleys A and B are at rest, touching, with a\ncompressed spring between them. It is released.']}[unit];
 const xa=aLeft?286:354,xb=aLeft?354:286;
 const body=h.circle(xa,110,34,3)+h.text(xa,119,'A',26)+h.circle(xb,110,34,3)+h.text(xb,119,'B',26)+h.text(xa,180,ma+' kg',22)+h.text(xb,180,mb+' kg',22);
 const dB=aLeft?1:-1,speed=ma>mb?'faster than A':ma<mb?'slower than A':'at the same speed as A';
 const answer=`${LR(dB)}, ${speed}`;
 const choices=[];['right','left'].forEach(d=>['faster than A','slower than A','at the same speed as A'].forEach(s=>choices.push(`to the ${d}, ${s}`)));
 return {cloze:`${U[1]}\nAfterwards, B moves ____.`,answer,choices,
  explanation:`Total momentum starts at zero, so the momenta after are equal and opposite: ${ma} × vA = ${mb} × vB. ${ma>mb?'B is lighter, so it moves faster.':ma<mb?'B is heavier, so it moves slower.':'Equal masses give equal speeds.'} They move in opposite directions (B moves ${LR(dB).replace('to the ','')}).`,
  visual:{type:'svg',svg:h.svgWrap(body,'Two objects A and B touching, with masses shown')}};
});

add('Collision: trolleys stick together',(r,h)=>{
 const d=r()<.5?1:-1,pr=h.pick([[1,1],[1,2],[2,1],[1,3],[3,1]],r),[ma,mb]=pr;
 const hasB=r()<.5; // head-on version?
 const cx=320;
 let body=floor(h,200),cloze,answer,choices,explanation;
 const A=cx-d*130,B=cx+d*60;
 if(!hasB){
  body+=cart(h,A,200,70)+h.text(A,114,'A  '+ma+' kg',22)+h.arrow(A-d*5,86,A+d*60,86,5,16)+h.text(A+d*30,70,'v',22)+cart(h,B,200,70)+h.text(B,114,'B  '+mb+' kg',22)+h.text(B,86,'at rest',22);
  const f=frac(ma,ma+mb);
  cloze='Trolley A hits trolley B, which is at rest. They\nstick together. After the collision they move ____.';
  answer=`${LR(d)} at ${f==='1'?'v':f+' v'}`;
  choices=[answer,`${LR(-d)} at ${f} v`,`${LR(d)} at v`,`${LR(d)} at ${f==='½'?'¼':'½'} v`,'They stop'];
  explanation=`Momentum is conserved: ${ma}v = (${ma} + ${mb})v′, so v′ = ${ma}v/${ma+mb} = ${f} v, in the direction A was moving.`;
 }else{
  const xa=cx-d*110,xb=cx+d*110;
  body+=cart(h,xa,200,70)+h.arrow(xa-d*10,86,xa+d*60,86,5,16)+h.text(xa+d*25,70,'v',22)+h.text(xa,114,'A  '+ma+' kg',22)+cart(h,xb,200,70)+h.arrow(xb+d*10,86,xb-d*60,86,5,16)+h.text(xb-d*25,70,'v',22)+h.text(xb,114,'B  '+mb+' kg',22);
  const net=ma-mb,f=frac(Math.abs(net),ma+mb);
  cloze='Trolleys A and B move toward each other at the same\nspeed v and stick together. After the collision\nthey move ____.';
  answer=net===0?'They stop':`${LR(net>0?d:-d)} at ${f} v`;
  const opp=net===0?`${LR(d)} at ½ v`:`${LR(net>0?-d:d)} at ${f} v`;
  choices=net===0?['They stop',`${LR(d)} at ½ v`,`${LR(-d)} at ½ v`,`${LR(d)} at v`]:[answer,opp,'They stop',`${LR(net>0?d:-d)} at v`];
  explanation=net===0?'Equal masses, equal speeds, opposite directions: total momentum is zero, so they stop.':`Take A’s direction as positive: ${ma}v − ${mb}v = (${ma} + ${mb})v′, so v′ = ${net}v/${ma+mb} = ${net>0?'':'−'}${f} v. The heavier trolley decides the direction.`;
 }
 return {cloze,answer,choices,explanation,visual:{type:'svg',svg:h.svgWrap(body,'Two trolleys about to collide')}};
});

add('Conservation of momentum in a collision',(r,h)=>{
 let m,v,mb,bounce,p,pa,pb;
 for(let t=0;t<500;t++){
  m=h.int(1,4,r);v=h.int(2,5,r);mb=h.int(1,3,r);bounce=r()<.4;p=m*v;
  pa=h.int(1,Math.max(1,p-1),r)*(bounce?-1:1);pb=p-pa;
  const ke0=m*v*v/2,ke1=pa*pa/(2*m)+pb*pb/(2*mb); // energy cannot increase
  if(ke1<=ke0+1e-9&&(bounce||pb/mb>=pa/m-1e-9))break;
 }
 const sx=r()<.5?1:-1;
 const body=floor(h,200)+cart(h,320-sx*120,200,70)+h.text(320-sx*120,114,'A  '+m+' kg',22)+h.arrow(320-sx*130,90,320-sx*60,90,5,16)+h.text(320-sx*95,70,v+' m/s',22)+cart(h,320+sx*70,200,70)+h.text(320+sx*70,114,'B  '+mb+' kg',22)+h.text(320+sx*70,90,'at rest',22);
 const ans=`${pb} kg m/s ${LR(sx)}`;
 const ch=[ans,`${p} kg m/s ${LR(sx)}`,`${p+pa} kg m/s ${LR(sx)}`,`${pb} kg m/s ${LR(-sx)}`];
 return {cloze:`Trolley A (${m} kg) moving at ${v} m/s hits trolley B, which is at rest. After the collision A has ${Math.abs(pa)} kg m/s of\nmomentum ${bounce?LR(-sx):LR(sx)}. The momentum of B is ____.`.replace('which is at rest. After','at rest. After').replace('hits trolley B, at rest.','hits trolley B (at rest).'),
  answer:ans,choices:Array.from(new Set(ch)),explanation:`Total momentum before = ${m} × ${v} = ${p} kg m/s ${LR(sx)}. After: ${p} = ${bounce?'−':''}${Math.abs(pa)} + pB, so pB = ${pb} kg m/s ${LR(sx)}.`,
  visual:{type:'svg',svg:h.svgWrap(body,'Trolley A moving toward stationary trolley B')}};
});

add('Impulse direction',(r,h)=>{
 const d=r()<.5?1:-1,k=h.pick(['rebound','catch','kick'],r),gy=200;
 let body=floor(h,gy),cloze,answer,explanation;
 if(k==='rebound'){const wx=320+d*120;body+=h.line(wx,60,wx,gy,6)+h.circle(320-d*60,gy-20,18,3,'currentColor')+h.arrow(320-d*100,gy-70,320-d*20,gy-70,5,16)+h.text(320-d*60,gy-86,'v',24);
  cloze='A ball moving toward a wall bounces straight back.\nThe impulse on the ball from the wall acts ____.';answer=LR(-d);explanation='Impulse = change in momentum = final − initial. The ball ends up moving away from the wall, so the change in momentum, and the impulse, points away from the wall.';}
 else if(k==='catch'){body+=h.circle(320-d*60,gy-60,18,3,'currentColor')+h.arrow(320-d*100,gy-110,320-d*20,gy-110,5,16)+h.text(320-d*60,gy-126,'v',24);
  cloze='A fielder catches a ball moving as shown, and the ball\nstops. The impulse on the ball acts ____.';answer=LR(-d);explanation='The ball loses its momentum, so the change in momentum (the impulse) is opposite to the ball’s original velocity.';}
 else{body+=h.circle(320,gy-20,18,3,'currentColor')+h.text(320,gy-56,'ball at rest',22)+h.arrow(320-d*140,gy-20,320-d*50,gy-20,5,16)+h.text(320-d*100,gy-36,'kick',22);
  cloze='A ball at rest is kicked in the direction shown.\nThe impulse on the ball acts ____.';answer=LR(d);explanation='Impulse is in the direction of the force, which is the direction of the change in momentum (the way the ball ends up moving).';}
 return {cloze,answer,choices:['to the left','to the right','upward','it is zero'],explanation,visual:{type:'svg',svg:h.svgWrap(body,'A ball for an impulse question')}};
});

add('Longer collision time, smaller force',(r,h)=>{
 const it=h.pick([
  ['A car’s crumple zone makes a crash last longer.','the same change in momentum happens over a longer time'],
  ['An airbag slows the driver over a longer time.','the same change in momentum happens over a longer time'],
  ['A cricketer pulls their hands back while catching a fast ball.','the same change in momentum happens over a longer time'],
  ['A gymnast bends their knees on landing.','the same change in momentum happens over a longer time'],
  ['A soft foam mat is used under a high-jump bar.','the same change in momentum happens over a longer time']],r);
 const sub=h.pick([['the force on the person or ball is smaller','F = Δp/Δt: for the same change in momentum Δp, a longer time Δt gives a smaller average force F.']],r);
 return {cloze:`${it[0]}\nThis reduces the force because ____.`,answer:it[1],
  choices:[it[1],'the impulse is made smaller','the momentum is made larger','the object has less mass'],
  explanation:sub[1]+' The impulse (change in momentum) itself is unchanged.'};
});

// ------------------------------------------------------------------ energy, work, power
const POOL={gk:'gravitational potential energy → kinetic energy',kg:'kinetic energy → gravitational potential energy',ek:'elastic potential energy → kinetic energy',kh:'kinetic energy → heat and sound',ke:'kinetic energy → elastic potential energy',gh:'gravitational potential energy → heat'};
function pendulum(h,pos){ // pivot top, bob at a position
 const px=320,py=30,L=170;const a=pos==='left'?-35:pos==='right'?35:0;
 const bx=px+L*Math.sin(rad(a)),by=py+L*Math.cos(rad(a));
 return h.line(260,py,380,py,5)+h.line(px,py,f1(bx),f1(by),2)+h.circle(f1(bx),f1(by),14,2,'currentColor')+`<path d="M${px-L*Math.sin(rad(40))} ${py+L*Math.cos(rad(40))} A${L} ${L} 0 0 0 ${px+L*Math.sin(rad(40))} ${py+L*Math.cos(rad(40))}" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="6 6"/>`;
}
add('Energy transformations',(r,h)=>{
 const side=r()<.5?'left':'right',other=side==='left'?'right':'left';
 const it=h.pick([
  [`A pendulum is released from its highest point on the ${side}\nand swings to the lowest point.\nThe main transformation is`,'gk','Eₚ falls as the bob loses height and Eₖ rises as it speeds up.',pendulum(h,side)],
  [`A pendulum swings from its lowest point up to its highest\npoint on the ${other}. The main transformation is`,'kg','Eₖ falls as the bob slows and Eₚ rises as it gains height.',pendulum(h,'mid')],
  ['A compressed spring pushes a trolley away.\nThe main transformation is','ek','Energy stored in the compressed spring becomes kinetic energy of the trolley.',h.rect(120,120,60,40,3)+poly([[180,140],[200,120],[220,160],[240,120],[260,160],[280,140]],4)+cart(h,420,200,80)+floor(h,200)],
  ['A ball is thrown upward and is rising.\nThe main transformation is','kg','The ball slows down (Eₖ falls) and gains height (Eₚ rises).',h.arrow(320,230,320,50,5,16)+h.circle(320,235,12,3,'currentColor')],
  ['A car brakes to a stop on a flat road.\nThe main transformation is','kh','Friction in the brakes changes the car’s Eₖ into heat (and some sound).',cart(h,320,200,110)+floor(h,200)],
  ['A child slides down a slide at a steady speed.\nThe main transformation is','gh','The speed is constant so Eₖ does not change; Eₚ is lost to heat through friction.',h.line(180,60,460,200,5)+h.line(460,200,600,200,3)+h.circle(250,f1(60+(70/280)*140-16),13,3)],
  ['A bouncing ball hits the floor and stops for an instant,\nbeing squashed. The main transformation is','ke','The ball’s Eₖ is stored briefly as elastic potential energy in the squashed ball.',h.line(60,200,600,200,3)+h.circle(320,188,12,3)+h.arrow(320,60,320,150,5,16)]],r);
 const ans=POOL[it[1]];
 const others=h.shuffle(Object.keys(POOL).filter(k=>k!==it[1]),r).slice(0,3).map(k=>POOL[k]);
 return {cloze:`${it[0]}\n____.`,answer:ans,choices:[ans,...others],explanation:it[2],visual:{type:'svg',svg:h.svgWrap(it[3],'A diagram of the situation')}};
});

add('Is work done by the force?',(r,h)=>{
 const YES='Yes – the force transfers energy to the object',AWAY='Yes – the force transfers energy away from the object',PERP='No – the force is at right angles to the motion',NOMOVE='No – there is no movement in the direction of the force';
 const choices=[YES,AWAY,PERP,NOMOVE];
 if(r()<.5){
  const k=h.pick(['perp','par','opp'],r),d=r()<.5?1:-1,up=r()<.5?1:-1;
  let fx,fy,ans,ex;
  if(k==='perp'){fx=0;fy=up;ans=PERP;ex='W = Fd works only with the part of the force along the motion. At 90° to the motion there is none, so no work is done.';}
  else if(k==='par'){fx=d;fy=0;ans=YES;ex='The force acts in the direction of the motion, so it does positive work (it increases the object’s kinetic energy).';}
  else{fx=-d;fy=0;ans=AWAY;ex='The force opposes the motion, so it takes energy from the object (like friction slowing it down).';}
  const oy=105,mv=h.arrow(d>0?150:490,232,d>0?250:390,232,4,14)+h.text(d>0?262:378,240,'motion',22,d>0?'start':'end')+h.circle(320,oy,16,3,'currentColor');
  const fa=h.arrow(320+fx*16,oy-fy*16,320+fx*(16+58),oy-fy*(16+58),5,16)+h.text(320+fx*(16+58+22),oy-fy*(16+58+22)+8,'F',24);
  return {cloze:'A force F acts on an object that moves in the\ndirection shown. Is work done by the force?\n____.',answer:ans,choices,explanation:ex,visual:{type:'svg',svg:h.svgWrap(mv+fa,'An object with a force arrow F and a motion arrow')}};
 }
 const it=h.pick([
  ['A ball on a string moves in a horizontal circle.\nDoes the tension in the string do work on the ball?',PERP,'The tension is always at right angles to the velocity, so it does no work and the speed stays constant.'],
  ['A satellite orbits Earth in a circle. Does gravity\ndo work on the satellite?',PERP,'Gravity is at right angles to the circular motion, so no work is done and the speed stays constant.'],
  ['A person carries a bag at a steady speed along a\nlevel path. Does the upward force on the bag do work?',PERP,'The upward force is at right angles to the horizontal motion, so no work is done by it.'],
  ['A student pushes hard on a wall that does not move.\nDoes the student’s push do work on the wall?',NOMOVE,'W = Fd and d = 0, so no work is done.'],
  ['A crane lifts a load upward.\nDoes the cable’s upward force do work?',YES,'The force is in the direction of the displacement, so it transfers energy to the load (Eₚ increases).'],
  ['A skidding car slows down. Does the friction\nforce from the road do work on the car?',AWAY,'Friction opposes the motion and takes kinetic energy from the car (transferring it to heat).']],r);
 return {cloze:`${it[0]}\n____.`.replace('?\n____','?\n____'),answer:it[1],choices,explanation:it[2]};
});

add('Power: which machine has more power',(r,h)=>{
 const t1=h.pick([4,5,10,20],r),t2=h.pick([4,5,10,20,40],r),tie=r()<.2;
 const e1=h.pick([200,400,600,800,1000],r);let e2=tie?e1*t2/t1:h.pick([200,400,600,800,1000,1200],r);
 const p1=e1/t1,p2=e2/t2;
 const answer=p1===p2?'Neither – the powers are equal':p1>p2?'Machine A':'Machine B';
 return {cloze:`Machine A transfers ${e1} J of energy in ${t1} s.\nMachine B transfers ${e2} J of energy in ${t2} s.\nThe machine with the greater power is ____.`.replace('is ____.','is ____.'),answer,choices:['Machine A','Machine B','Neither – the powers are equal'],
  explanation:`P = E/t. A: ${e1}/${t1} = ${p1} W. B: ${e2}/${t2} = ${p2} W. ${p1===p2?'They are equal.':p1>p2?'A is larger.':'B is larger.'} (Power is the energy transferred per second, not the total energy.)`};
});

add('Efficiency concepts',(r,h)=>{
 if(r()<.5){
  const eff=[0.2,0.25,0.4,0.5,0.6,0.75,0.8],tot=[100,200,400,500],eA=h.pick(eff,r),eB=r()<.2?eA:h.pick(eff,r),tA=h.pick(tot,r),tB=h.pick(tot,r);
  const uA=Math.round(eA*tA),uB=Math.round(eB*tB);
  const answer=eA===eB?'Neither – they are equally efficient':eA>eB?'Machine A':'Machine B';
  return {cloze:`Machine A takes in ${tA} J and gives out ${uA} J of useful energy.\nMachine B takes in ${tB} J and gives out ${uB} J of useful energy.\nThe more efficient machine is ____.`,answer,choices:['Machine A','Machine B','Neither – they are equally efficient'],
   explanation:`Efficiency = useful output ÷ total input. A: ${uA}/${tA} = ${Math.round(eA*100)}%. B: ${uB}/${tB} = ${Math.round(eB*100)}%. The one giving out more energy is not necessarily the more efficient.`};
 }
 const it=h.pick([
  ['A motor takes in 500 J of electrical energy and does\n400 J of useful work. The other 100 J is','transferred to the surroundings as heat and sound','Energy is conserved. The “lost” energy is spread to the surroundings, usually as heat and sound.',['destroyed','stored inside the motor as useful energy','turned into extra useful work']],
  ['The efficiency of a real machine is always','less than 100%','Some energy is always transferred as heat or sound by friction, so the useful output is less than the input.',['greater than 100%','exactly 100%','equal to its power']],
  ['A machine is more efficient when','a larger fraction of its input energy is useful output','Efficiency = useful output ÷ total input.',['it uses more energy in total','it runs for longer','it has a larger power rating']]],r);
 return {cloze:`${it[0]}\n____.`,answer:it[1],choices:[it[1],...it[3]],explanation:it[2]};
});

// ------------------------------------------------------------------ torque and equilibrium
const BY=140;
const beamBody=(h,pv)=>h.line(60,BY,580,BY,8)+`<polygon points="${pv},${BY+4} ${pv-20},${BY+46} ${pv+20},${BY+46}" fill="none" stroke="currentColor" stroke-width="3"/>`;
add('Torque: direction of turning effect',(r,h)=>{
 const pv=320,dist=h.pick([80,140,200],r),side=r()<.5?1:-1,up=r()<.5?1:-1,x=pv+side*dist;
 let body=beamBody(h,pv);
 body+=up>0?h.arrow(x,BY,x,BY-65,5,16)+h.text(x+24,BY-30,'F',24):h.arrow(x,BY+6,x,BY+71,5,16)+h.text(x+24,BY+50,'F',24);
 body+=h.text(pv,BY+68,'pivot',20);
 const z=(x-pv)*(up>0?1:-1),answer=z>0?'anticlockwise':'clockwise';
 return {cloze:`A force F acts ${up>0?'upward':'downward'} on a beam at a point\n${side>0?'right':'left'} of the pivot, as shown.\nIt tends to turn the beam ____ about the pivot.`,answer,choices:['clockwise','anticlockwise','it has no turning effect'],
  explanation:`Picture the beam turning about the pivot: a ${up>0?'upward':'downward'} force on the ${side>0?'right':'left'} side lifts that side ${up>0?'up':'down'}, so the beam turns ${answer}.`,
  visual:{type:'svg',svg:h.svgWrap(body,'A horizontal beam on a pivot with one force arrow')}};
});

function hang(h,x,m,d,lab){ // hanging mass at x
 return h.line(x,BY,x,BY+32,2)+h.rect(x-24,BY+32,48,44,3)+h.text(x,BY+62,m+' kg',20)+(lab?h.text(x,BY+104,d+' cm',20):'');}
add('Moments: which side goes down',(r,h)=>{
 const pv=320,sc=5;
 const mL=h.int(1,6,r),dL=h.pick([10,20,30,40],r);let mR=h.int(1,6,r),dR=h.pick([10,20,30,40],r);
 if(r()<.2){dR=h.pick([10,20,30,40].filter(x=>mL*dL%x===0&&mL*dL/x<=6),r)||dR;mR=mL*dL/dR;if(!(mR>=1&&mR<=6&&Number.isInteger(mR))){mR=mL;dR=dL;}}
 const aL=mL*dL,aR=mR*dR;
 let body=beamBody(h,pv)+hang(h,pv-dL*sc,mL,dL,true)+hang(h,pv+dR*sc,mR,dR,true);
 const answer=aL===aR?'beam stays balanced':aL>aR?'left side goes down':'right side goes down';
 return {cloze:'A beam is balanced on a pivot with masses hung\nas shown, then released. The ____.',answer,choices:['left side goes down','right side goes down','beam stays balanced'],
  explanation:`Compare moments (mass × distance): left ${mL} × ${dL} = ${aL}, right ${mR} × ${dR} = ${aR}. ${aL===aR?'Equal, so the beam stays balanced.':aL>aR?'The left moment is larger, so the left side goes down.':'The right moment is larger, so the right side goes down.'} The heavier mass does not always win: distance matters too.`,
  visual:{type:'svg',svg:h.svgWrap(body,'A beam on a pivot with a mass hanging on each side at marked distances')}};
});

add('Moments: where to hang a mass to balance',(r,h)=>{
 const pv=320,sc=5,mL=h.int(1,6,r),dL=h.pick([10,20,30,40],r);let mR=h.int(1,6,r);
 if(r()<.15)mR=mL;
 const body=beamBody(h,pv)+hang(h,pv-dL*sc,mL,dL,true);
 const rel=mR>mL?'closer to the pivot than':mR<mL?'further from the pivot than':'the same distance from the pivot as';
 const answer=`on the right, ${rel} the left mass`;
 const choices=['on the right, closer to the pivot than the left mass','on the right, further from the pivot than the left mass','on the right, the same distance from the pivot as the left mass','on the left, closer to the pivot than the first mass','on the left, further from the pivot than the first mass'];
 return {cloze:`A ${mL} kg mass hangs ${dL} cm to the left of a pivot.\nA ${mR} kg mass is hung on the other side to balance\nthe beam. It must hang ____.`,answer,choices,
  explanation:`For balance the clockwise and anticlockwise moments must be equal (mass × distance). The mass must go on the opposite side. ${mR>mL?'It is heavier, so it needs a shorter distance.':mR<mL?'It is lighter, so it needs a longer distance.':'The masses are equal, so the distances are equal.'}`,
  visual:{type:'svg',svg:h.svgWrap(body,'A beam on a pivot with one mass hanging on the left')}};
});

// ------------------------------------------------------------------ graphs
function dtAxes(h,yl,mid){
 const y0=mid?130:220;
 return h.arrow(110,y0,585,y0,3,12)+h.arrow(110,mid?238:y0,110,14,3,12)+h.text(604,y0+8,'t',24)+h.text(132,26,yl,24);
}
const GX=t=>110+t*400,GY=(v)=>220-v*170,VY=v=>130-v*85;
add('d–t graph: describing motion',(r,h)=>{
 const shapes=[
  ['stationary (at rest)',()=>{const l=0.3+r()*0.4;return [[0,l],[1,l]];}],
  ['moving away at a constant speed',()=>{const s=0.4+r()*0.4,a=0.05+r()*0.1;return [[0,a],[1,a+s]];}],
  ['speeding up',()=>{const pts=[],a=0.05;for(let i=0;i<=24;i++){const t=i/24;pts.push([t,a+0.85*t*t]);}return pts;}],
  ['slowing down',()=>{const pts=[],a=0.05;for(let i=0;i<=24;i++){const t=i/24;pts.push([t,a+0.85*(1-(1-t)*(1-t))]);}return pts;}],
  ['moving back toward the start at a constant speed',()=>{const s=0.4+r()*0.4;return [[0,0.9],[1,0.9-s]];}],
  ['at rest, then moving away at a constant speed',()=>{const l=0.1+r()*0.15,k=0.3+r()*0.2;return [[0,l],[k,l],[1,0.9]];}]];
 const i=Math.floor(r()*shapes.length),pts=shapes[i][1]().map(p=>[GX(p[0]),GY(p[1])]);
 const body=dtAxes(h,'d',false)+poly(pts,5);
 return {cloze:'The graph shows distance d from a start point\nagainst time t. The object is ____.',answer:shapes[i][0],choices:shapes.map(s=>s[0]),
  explanation:'On a d–t graph the gradient is the velocity: flat = at rest, straight slope = constant velocity, steepening = speeding up, flattening = slowing down, sloping down = moving back toward the start.',
  visual:{type:'svg',svg:h.svgWrap(body,'A distance–time graph')}};
});

add('v–t graph: describing motion',(r,h)=>{
 const v=0.45+r()*0.4,w=0.3+r()*0.4;
 const shapes=[
  ['moving at a constant velocity in the positive direction',[[0,v],[1,v]]],
  ['at rest',[[0,0],[1,0]]],
  ['accelerating at a constant rate from rest',[[0,0],[1,v]]],
  ['slowing down at a constant rate until it stops',[[0,v],[1,0]]],
  ['moving at a constant velocity in the negative direction',[[0,-v],[1,-v]]],
  ['slowing to a stop, then speeding up in the opposite direction',[[0,v],[1,-w]]]];
 const i=Math.floor(r()*shapes.length);
 const body=dtAxes(h,'v',true)+poly(shapes[i][1].map(p=>[GX(p[0]),VY(p[1])]),5);
 return {cloze:'The graph shows velocity v against time t.\nThe object is ____.',answer:shapes[i][0],choices:shapes.map(s=>s[0]),
  explanation:'On a v–t graph the height is the velocity and the gradient is the acceleration: flat = constant velocity, upward slope = constant acceleration, line crossing zero = changes direction.',
  visual:{type:'svg',svg:h.svgWrap(body,'A velocity–time graph with the time axis through the middle')}};
});

add('v–t graph: direction of acceleration',(r,h)=>{
 const cases=[[0.3,0.9],[0.9,0.3],[-0.3,-0.9],[-0.9,-0.3]],c=h.pick(cases,r),sp=Math.abs(c[1])>Math.abs(c[0]);
 const body=dtAxes(h,'v',true)+poly([[GX(0.05),VY(c[0])],[GX(0.95),VY(c[1])]],5)+h.text(95,VY(0.7)+7,'+',26,'end')+h.text(95,VY(-0.7)+7,'−',26,'end');
 const acc=c[1]>c[0]?'positive':'negative';
 if(r()<.5){
  return {cloze:'Positive velocity means moving to the right.\nThe object’s acceleration is ____.',answer:c[1]>c[0]?'to the right':'to the left',choices:['to the right','to the left','zero'],
   explanation:`Gradient of a v–t graph = acceleration. The line slopes ${c[1]>c[0]?'upward':'downward'}, so the acceleration is ${acc} (${c[1]>c[0]?'to the right':'to the left'}), whether the object is speeding up or slowing down.`,visual:{type:'svg',svg:h.svgWrap(body,'A sloping line on a velocity–time graph')}};
 }
 const dir=c[0]>0?'positive':'negative';
 const answer=`${sp?'speeding up':'slowing down'} while moving in the ${dir} direction`;
 const choices=[];['speeding up','slowing down'].forEach(a=>['positive','negative'].forEach(d=>choices.push(`${a} while moving in the ${d} direction`)));
 return {cloze:'The graph shows velocity v against time t.\nThe object is ____.',answer,choices,
  explanation:`The line is ${c[0]>0?'above':'below'} the axis (velocity ${dir}) and its size ${sp?'increases':'decreases'}, so it is ${sp?'speeding up':'slowing down'}. Speeding up or slowing down depends on the size of v, not the slope sign.`,visual:{type:'svg',svg:h.svgWrap(body,'A sloping line on a velocity–time graph')}};
});

add('Graphs: area and gradient',(r,h)=>{
 const k=h.pick(['vt-area','vt-grad','dt-grad','ft-area'],r);
 const shapeV=h.pick(['rect','tri','trap'],r);
 const ax=(yl)=>h.arrow(110,220,585,220,3,12)+h.arrow(110,220,110,14,3,12)+h.text(604,228,'t',24)+h.text(132,26,yl,24);
 let body,answer,cloze,explanation,wrong;
 const pool=['the distance travelled','the acceleration','the velocity','the impulse (change in momentum)','the force','the time taken'];
 if(k==='vt-area'||k==='ft-area'){
  const yl=k==='vt-area'?'v':'F',a=0.3+r()*0.2,b=0.6+r()*0.15,hh=0.5+r()*0.35,h2=0.2+r()*0.2;
  let pts;
  if(shapeV==='rect'||k==='ft-area')pts=[[0,0],[0,hh],[b,hh],[b,0]];
  else if(shapeV==='tri')pts=[[0.1,0],[b,hh],[b,0]];
  else pts=[[0.1,h2],[b,hh],[b,0],[0.1,0]];
  const px=pts.map(p=>[GX(p[0]),GY(p[1])]);
  const edge=(shapeV==='tri'&&k==='vt-area')?poly([[GX(0.1),GY(0)],[GX(b),GY(hh)]],5):shapeV==='trap'&&k==='vt-area'?poly([[GX(0.1),GY(h2)],[GX(b),GY(hh)]],5):'';
  body=ax(yl)+`<polygon points="${px.map(p=>f1(p[0])+','+f1(p[1])).join(' ')}" fill="currentColor" fill-opacity="0.28" stroke="currentColor" stroke-width="3"/>`+edge;
  answer=k==='vt-area'?'the distance travelled':'the impulse (change in momentum)';
  cloze=`On this ${yl}–t graph, the shaded area represents ____.`;
  explanation=k==='vt-area'?'Area under a v–t graph = velocity × time = distance travelled (displacement).':'Area under an F–t graph = force × time = impulse, which equals the change in momentum.';
 }else{
  const yl=k==='vt-grad'?'v':'d',up=0.5+r()*0.3;
  body=ax(yl)+poly([[GX(0.05),GY(0.08)],[GX(0.95),GY(0.08+up)]],5);
  answer=k==='vt-grad'?'the acceleration':'the velocity';
  cloze=`The gradient (slope) of this ${yl}–t graph represents ____.`;
  explanation=k==='vt-grad'?'Gradient = rise/run = change in velocity ÷ time = acceleration.':'Gradient = rise/run = change in distance ÷ time = velocity (speed).';
 }
 const others=h.shuffle(pool.filter(x=>x!==answer),r).slice(0,3);
 return {cloze,answer,choices:[answer,...others],explanation,visual:{type:'svg',svg:h.svgWrap(body,'A graph against time')}};
});
})();
