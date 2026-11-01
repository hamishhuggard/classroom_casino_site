/* NCEA Level 2 Physics 2025, AS 91171 Mechanics: rewritten with random numbers, own wording and redrawn diagrams.
   Marking points are written from the physics. See BRIEF.md in this folder. g = 9.8 N/kg, as on the resource sheet. */
(()=>{
 const G=9.8;
 const f=(x,dp)=>Number(x).toFixed(dp);
 const rad=d=>d*Math.PI/180;
 const S=(h,body,label,view)=>({type:'svg',svg:h.svgWrap(body,label,view)});
 const path=(pts,w=3)=>`<polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="currentColor" stroke-width="${w}"/>`;
 const person=(h,x,y)=>h.circle(x,y-52,10,3)+h.line(x,y-42,x,y-14,3)+h.line(x,y-14,x-10,y,3)+h.line(x,y-14,x+10,y,3)+h.line(x,y-34,x-12,y-22,3)+h.line(x,y-34,x+12,y-22,3);

 // ---------- Question 1: acceleration ----------
 // Ball path: height at horizontal distance D.
 const ballY=(v,th,D)=>{const vx=v*Math.cos(rad(th)),vy=v*Math.sin(rad(th)),t=D/vx;return {vx,vy,t,y:vy*t-0.5*G*t*t};};
 NceaExam.add({
  year:2025,standard:'91171',number:1,title:'Rugby: running, tackle bag and kicks',
  summary:'A player sprints from rest, hits a tackle bag, and takes a kick at goal.',
  context(r,h){
   const a=h.int(55,95,r)/100,d=h.int(15,30,r);
   const x=h.int(12,30,r)/100,k=h.pick([2,3,2,4],r);
   let v,th,D,b;
   for(let i=0;i<200;i++){
    v=h.int(16,26,r);th=h.int(24,42,r);D=h.int(38,55,r);b=ballY(v,th,D);
    if(b.y>0.3&&Math.abs(b.y-3)>0.4)break;
   }
   const heavier=r()<.5,m1=h.pick([400,420,430,450],r),m2=m1+(heavier?1:-1)*h.pick([40,60,80],r);
   return {a,d,x,k,v,th,D,H:3.00,heavier,m1,m2};
  },
  original:{a:0.68,d:22,x:0.20,k:2,v:25,th:34,D:45,H:3.00,heavier:true,m1:420,m2:480},
  parts:[
   {part:'a',grade:'A',skill:'Speed and acceleration',expected:'8.0',
    gen(c,h){const t=Math.sqrt(2*c.d/c.a);
     return {cloze:`A player starts from rest and speeds up steadily at ${f(c.a,3)} m/s².\nShe covers ${f(c.d,1)} m in a straight line.\nTime taken: t = ____ s`,answer:h.sig3(t),answerUnit:'s',
      explanation:`d = v₀t + ½at² with v₀ = 0, so t = √(2d/a) = √(2 × ${f(c.d,1)} ÷ ${f(c.a,3)}) = ${h.sig3(t)} s.`,
      visual:S(h,person(h,120,200)+h.arrow(160,150,300,150,4)+h.text(230,135,'a = '+f(c.a,3)+' m/s²',20)+h.line(60,200,580,200,3)+h.line(120,215,520,215,2)+h.text(320,245,f(c.d,1)+' m',20),'A player sprinting from rest along the ground')};}},
   {part:'b',grade:'M',skill:'Work, energy and power',expected:'0.4',
    gen(c,h){const v2=c.x*c.k;
     return {cloze:`A player runs into a tackle bag at speed v. The bag squashes by x = ${f(c.x,2)} m, like a spring,\nand takes all of the player's kinetic energy.\nA player now hits the same bag at ${c.k} × the speed. New compression: ____ m`,answer:h.sig3(v2),answerUnit:'m',
      explanation:`Kinetic energy ½mv² is stored as spring energy ½kx², so x is proportional to v. Speed × ${c.k} gives x × ${c.k}: ${f(c.x,2)} × ${c.k} = ${h.sig3(v2)} m.`,
      visual:S(h,person(h,140,200)+h.arrow(180,150,290,150,4)+h.text(235,135,'v',22)+h.rect(400,100,100,100,3)+h.text(450,155,'bag',20)+h.line(60,200,580,200,3)+h.arrow(400,80,500,80,3,10)+h.arrow(500,80,400,80,3,10)+h.text(450,68,'x',22),'A player running at a tackle bag that compresses by a distance x')};}},
   {part:'c',grade:'M',skill:'Work, energy and power',selfMark:true,
    gen(c,h){return {cloze:`A player runs into a tackle bag at speed v. The bag compresses a distance x like a spring as the player comes to a stop.\nAssuming all the player's energy is transferred to the bag, state and justify what would happen to the distance the bag was compressed if the player was moving at ${c.k} times the speed.`,
     points:['(A) State that x would be bigger.',`(A) x is ${c.k} times as big (multiplying v by ${c.k} multiplies x by ${c.k}); on its own, with no evidence, this is still only Achieved.`,`(M) Give evidence: all the energy is transferred, so ½mv² = ½kx², which gives x ∝ v (energy is conserved).`,`Common error: saying x goes up by ${c.k*c.k}. The energy goes up by ${c.k*c.k}, but x is proportional to v, not v².`]};}},
   {part:'d',grade:'A',skill:'Projectiles',expected:'7.26',
    gen(c,h){const b=ballY(c.v,c.th,c.D);
     return {cloze:`A ball is kicked from the ground at ${f(c.v,1)} m/s, ${c.th}° above the horizontal.\nThe goalposts are ${f(c.D,1)} m away horizontally. Ignore air resistance, g = 9.8 N/kg.\nHeight of the ball when it is level with the posts: ____ m`,answer:h.sig3(b.y),answerUnit:'m',
      explanation:`vₓ = ${f(c.v,1)}cos${c.th}° = ${f(b.vx,2)}, v_y = ${f(c.v,1)}sin${c.th}° = ${f(b.vy,2)} m/s. t = ${f(c.D,1)} ÷ ${f(b.vx,2)} = ${f(b.t,2)} s. y = v_y t − ½gt² = ${f(b.vy*b.t,2)} − ${f(0.5*G*b.t*b.t,2)} = ${h.sig3(b.y)} m. (Grading idea: finding vₓ or v_y alone is A; one error in a correct method is M; a correct answer with a confirmatory sentence is E. Use brackets on the calculator.)`,
      visual:projDiagram(h,c)};}},
   {part:'e',grade:'M',skill:'Projectiles',expected:'clears the crossbar',
    gen(c,h){const b=ballY(c.v,c.th,c.D),clear=b.y>c.H;
     const A='clears the crossbar',B='is still in the air but passes below the crossbar height',C='hits the ground before reaching the posts';
     return {cloze:`By performing appropriate calculations, a student finds the height of a kicked ball when level with the posts is ${h.sig3(b.y)} m.\nThe crossbar is ${f(c.H,2)} m above the ground.\nDecide: the ball ____`,answer:clear?A:B,choices:[A,B,C],
      explanation:`${h.sig3(b.y)} m is ${clear?'above':'below'} the ${f(c.H,2)} m crossbar, and the ball is still in the air (height above zero), so it ${clear?'clears the crossbar':'passes under the crossbar height'}.`,
      visual:projDiagram(h,c)};}},
   {part:'f',grade:'E',skill:'Projectiles',selfMark:true,
    gen(c,h){const w=c.heavier?'heavier':'lighter',m=c.m2,m0=c.m1,cmp=c.heavier?'bigger':'smaller';
     return {cloze:`The player from part (d) replaces the ball (${m0} g) with one from a different manufacturer. The new ball is ${w} (${m} g).\nThe player kicks it so that it leaves the ground at the same speed and angle as before.\nIgnoring any effects from air friction and without using calculations, compare the path of the new ball to that of the original ball.\nYour answer should consider:\n• the time in the air  • the acceleration of the balls in the air\n• the initial vertical and horizontal speeds  • the horizontal distances travelled.`,
      points:['(A) One correct statement, e.g. the new ball has the same initial horizontal and vertical speeds because it is kicked with the same speed and angle.','(A) Gravity gives the same vertical acceleration as before (a = g, about 9.8 m/s² down).',`(M) A statement linking cause and effect: the weight is ${cmp} for the ${w} ball but so is its mass, so a = F ÷ m is unchanged; the same vertical acceleration and initial vertical speed mean the time in the air is identical.`,'(E) Full explanation: the same horizontal speed for the same time gives the identical horizontal distance travelled, so the path is the same.','Common error: thinking a heavier ball falls faster or goes less far.']};}}
  ]
 });
 function projDiagram(h,c){
  const ang=Math.min(Math.max(c.th,20),55);
  const x0=70,y0=200,L=110;
  const ex=x0+L*Math.cos(rad(ang)),ey=y0-L*Math.sin(rad(ang));
  let body=h.line(30,y0,610,y0,3)+h.circle(x0,y0-8,8,3)
   +h.arrow(x0,y0,ex,ey,4)+h.text(ex+10,ey+4,f(c.v,1)+' m/s',20,'start')
   +`<path d="M ${x0+60} ${y0} A 60 60 0 0 0 ${(x0+60*Math.cos(rad(ang))).toFixed(1)} ${(y0-60*Math.sin(rad(ang))).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="2.5"/>`+h.text(x0+66,y0-18,c.th+'°',20,'start')
   +h.line(520,y0,520,70,4)+h.line(560,y0,560,70,4)+h.line(520,110,560,110,5)
   +h.arrow(x0+10,226,515,226,2.5,9)+h.arrow(515,226,x0+10,226,2.5,9)+h.text(300,252,f(c.D,1)+' m',20)
   +h.text(575,104,f(c.H,2)+' m',18,'start')+h.text(575,124,'crossbar',18,'start');
  return S(h,body,'A ball kicked from the ground towards goalposts with a crossbar');
 }

 // ---------- Question 2: momentum ----------
 NceaExam.add({
  year:2025,standard:'91171',number:2,title:'Momentum, scrums and padded posts',
  summary:'Momentum of a player, why momentum beats energy for collisions, two packs colliding, and padding.',
  context(r,h){
   const m=h.int(65,110,r),v=h.int(30,60,r)/10;
   let mX,vX,mY,vY;
   for(let i=0;i<200;i++){mX=h.int(700,950,r);mY=h.int(700,950,r);vX=h.int(300,450,r)/1000;vY=h.int(300,450,r)/1000;
    const pX=mX*vX,pY=mY*vY;if(Math.abs(pX-pY)>0.02*Math.max(pX,pY))break;}
   const pad=h.pick([
    {who:'A player running at full speed is stopped by a thick pad wrapped round a goalpost.',what:'the pad'},
    {who:'A gymnast coming down from a vault is stopped by a thick landing mat.',what:'the mat'},
    {who:'A cyclist falls and her helmet hits the road; the helmet has a layer of crushable foam.',what:'the foam'}],r);
   return {m,v,mX,vX,mY,vY,pad};
  },
  original:{m:80,v:4.3,mX:850,vX:0.378,mY:883,vY:0.354,pad:{who:'A player running at full speed is stopped by a thick pad wrapped round a goalpost.',what:'the pad'}},
  parts:[
   {part:'a',grade:'A',skill:'Momentum and impulse',expected:'344',
    gen(c,h){const p=c.m*c.v;
     return {cloze:`A player of mass ${f(c.m,1)} kg runs at ${f(c.v,2)} m/s.\nMomentum: p = ____ kg m/s`,answer:h.sig3(p),answerUnit:'kg m/s',
      explanation:`p = mv = ${f(c.m,1)} × ${f(c.v,2)} = ${h.sig3(p)} kg m/s.`};}},
   {part:'b',grade:'M',skill:'Momentum and impulse',selfMark:true,
    gen(c,h){return {cloze:'Explain why momentum is more useful than kinetic energy for studying collisions.',
     points:['(A) If there are no external forces, momentum is conserved.','(A) Kinetic energy is often lost as heat / light or sound.','(M) Full answer: both statements, linked to collisions, so momentum before = momentum after can be used even when kinetic energy is not conserved.','Common error: confusing momentum with impulse, or forgetting momentum is a vector.']};}},
   {part:'c',grade:'M',skill:'Momentum and impulse',expected:'0.00503',
    gen(c,h){const net=c.mX*c.vX-c.mY*c.vY,v=Math.abs(net)/(c.mX+c.mY);
     return {cloze:`Calculate the speed of two packs of players that collide and stick together.\nPack X: ${c.mX} kg at ${f(c.vX,3)} m/s to the right. Pack Y: ${c.mY} kg at ${f(c.vY,3)} m/s to the left.\nSpeed of the joined packs just after: ____ m/s`,answer:h.sig3(v),answerUnit:'m/s',
      explanation:`Take right as positive. Total p = ${c.mX} × ${f(c.vX,3)} − ${c.mY} × ${f(c.vY,3)} = ${f(c.mX*c.vX,2)} − ${f(c.mY*c.vY,2)} = ${f(net,2)} kg m/s. v = p ÷ (${c.mX} + ${c.mY}) = ${h.sig3(v)} m/s.`,
      visual:scrumDiagram(h,c)};}},
   {part:'d',grade:'E',skill:'Momentum and impulse',expected:'to the right',
    gen(c,h){const net=c.mX*c.vX-c.mY*c.vY,ans=net>0?'to the right':'to the left';
     return {cloze:`Pack X: ${c.mX} kg at ${f(c.vX,3)} m/s to the right. Pack Y: ${c.mY} kg at ${f(c.vY,3)} m/s to the left.\nThey collide and lock together.\nCalculate the direction of the combined packs immediately after they stick together.\nThey move ____`,answer:ans,choices:['to the right','to the left','neither: they stop dead'],
      explanation:`Momentum right = ${f(c.mX*c.vX,2)} kg m/s and momentum left = ${f(c.mY*c.vY,2)} kg m/s. (E) Correct speed with direction. The bigger momentum wins, so they move ${ans}. The heavier pack does not necessarily win: it is momentum (mv) that counts.`,
      visual:scrumDiagram(h,c)};}},
   {part:'e',grade:'M',skill:'Momentum and impulse',selfMark:true,
    gen(c,h){return {cloze:`${c.pad.who}\nExplain how having ${c.pad.what} helps to protect the person when they collide.`,
     points:['(A) Any one of: the change in momentum (Δp) is the same with or without it; the collision takes longer; a smaller force.',`(A) ${c.pad.what[0].toUpperCase()+c.pad.what.slice(1)} crushes / compresses a bit, so the collision takes longer.`,'(M) Two linked statements: F = Δp ÷ t, so a longer collision time means a smaller force as they stop.','(E) Full explanation: Δp is the same, the longer time gives a smaller force, which is safer for the person.','(Accepted) The same argument in terms of deceleration: a = Δv ÷ t is smaller.']};}}
  ]
 });
 function scrumDiagram(h,c){
  const body=h.rect(130,110,120,60,3)+h.rect(390,110,120,60,3)+h.text(190,145,'Pack X',20)+h.text(450,145,'Pack Y',20)
   +h.arrow(256,140,308,140,4)+h.arrow(384,140,332,140,4)
   +h.text(190,95,c.mX+' kg',20)+h.text(450,95,c.mY+' kg',20)+h.text(290,205,f(c.vX,3)+' m/s →',18,'end')+h.text(350,205,'← '+f(c.vY,3)+' m/s',18,'start')
   +h.line(60,175,580,175,2);
  return S(h,body,'Two packs of players moving towards each other');
 }

 // ---------- Question 3: energy, torque, circular motion ----------
 const bench=c=>{
  const S2=c.L-c.a-c.b,toCentre=c.L/2-c.a;
  const FB=(c.Wb*toCentre+c.W2*c.d2-c.W1*c.d1)/S2,total=c.Wb+c.W1+c.W2;
  return {S2,toCentre,FB,FA:total-FB,total};
 };
 const benchText=c=>`Bench: ${f(c.Wb,0)} N, ${f(c.L,2)} m long, supports A and B at ${f(c.a,3)} m and ${f(c.b,3)} m from the left and right ends.\nA ${f(c.W1,0)} N player sits ${f(c.d1,3)} m left of A.\nA ${f(c.W2,0)} N player sits ${f(c.d2,3)} m right of A.`;
 function benchDiagram(h,c){
  const body=h.rect(60,150,520,16,3,'none')+path([[170,166],[150,205],[190,205],[170,166]],3)+path([[470,166],[450,205],[490,205],[470,166]],3)
   +h.text(170,232,'A',22)+h.text(470,232,'B',22)
   +person(h,128,150)+person(h,222,150)+h.text(128,64,f(c.W1,0)+' N',20)+h.text(222,64,f(c.W2,0)+' N',20)
   +h.text(320,128,'bench '+f(c.Wb,0)+' N',20)+h.line(60,236,60,248,2)+h.line(580,236,580,248,2)+h.arrow(60,242,580,242,2,8)+h.arrow(580,242,60,242,2,8)+h.text(320,258,f(c.L,2)+' m (not to scale)',16);
  return S(h,body,'A uniform bench resting on two supports A and B with a player on each side of A');
 }
 NceaExam.add({
  year:2025,standard:'91171',number:3,title:'Warm-up: stairs, sprint, bench and circle',
  summary:'Work up some stairs, power in a sprint, a loaded bench on two supports, and a circle of players.',
  context(r,h){
   const m=h.int(55,90,r)+h.int(0,9,r)/10,H=h.int(100,170,r)/10,run=h.int(28,40,r);
   const v=h.int(60,90,r)/10,t=h.int(35,50,r)/10;
   const Wb=h.int(400,700,r),L=h.int(250,350,r)/100,a=h.int(20,35,r)/100,b=h.int(20,35,r)/100;
   const W1=h.int(550,750,r),d1=h.int(8,20,r)/100,W2=h.int(650,850,r),d2=h.int(15,30,r)/100;
   const phi=h.pick([0,90,180,270,45,135,225,315],r),cw=r()<.5,rr=h.int(15,35,r)/10,sp=h.int(15,35,r)/10;
   return {m,H,run,v,t,Wb,L,a,b,W1,d1,W2,d2,phi,cw,rr,sp};
  },
  original:{m:68.3,H:14.1,run:35.0,v:7.52,t:4.35,Wb:621,L:3.21,a:0.26,b:0.26,W1:669,d1:0.11,W2:769,d2:0.24,phi:0,cw:true,rr:2.5,sp:2},
  parts:[
   {part:'a',grade:'A',skill:'Work, energy and power',expected:'9440',
    gen(c,h){const W=c.m*G*c.H;
     return {cloze:`A player of mass ${f(c.m,1)} kg runs up a flight of stairs.\nThe stairs run ${f(c.run,1)} m along the ground and rise ${f(c.H,1)} m vertically. g = 9.8 N/kg.\nWork done against gravity: ____ J`,answer:h.sig3(W),answerUnit:'J',
      explanation:`Only the vertical rise counts: W = mgh = ${f(c.m,1)} × 9.8 × ${f(c.H,1)} = ${h.sig3(W)} J.`,
      visual:S(h,path([[80,215],[80,185],[135,185],[135,155],[190,155],[190,125],[245,125],[245,95],[300,95],[300,65],[355,65]],3)+h.line(80,215,355,215,3)
       +h.arrow(380,215,380,65,2.5,9)+h.arrow(380,65,380,215,2.5,9)+h.text(400,145,f(c.H,1)+' m',20,'start')+h.arrow(80,240,355,240,2.5,9)+h.arrow(355,240,80,240,2.5,9)+h.text(218,258,f(c.run,1)+' m',20),'A flight of stairs with its horizontal length and vertical rise labelled')};}},
   {part:'b',grade:'M',skill:'Work, energy and power',expected:'444',
    gen(c,h){const W=0.5*c.m*c.v*c.v,P=W/c.t;
     return {cloze:`A ${f(c.m,1)} kg player speeds up from rest to ${f(c.v,2)} m/s in ${f(c.t,2)} s.\nAverage power developed: P = ____ W`,answer:h.sig3(P),answerUnit:'W',
      explanation:`Work done = gain in kinetic energy = ½mv² = ½ × ${f(c.m,1)} × ${f(c.v,2)}² = ${f(W,0)} J. P = W ÷ t = ${f(W,0)} ÷ ${f(c.t,2)} = ${h.sig3(P)} W. (The work, ${f(W,0)} J, is the A-level step; the power is M.)`};}},
   {part:'c',grade:'A',skill:'Torque and moments',selfMark:true,
    gen(c,h){return {cloze:`${benchText(c)}\nAdd labelled arrows (on paper) to a sketch of the bench to show all the forces acting on it.`,
     points:[`(A) The bench's weight, ${f(c.Wb,0)} N, down from the centre of the bench.`,`(A) The ${f(c.W1,0)} N weight of the left player, down, at the player's position.`,`(A) The ${f(c.W2,0)} N weight of the right player, down, at the player's position.`,'(A) The upward support force at A, labelled F_A.','(A) The upward support force at B, labelled F_B.','Achieved needs all 5 forces labelled (or any torque calculation). Excellence needs all labels and correct F_A and F_B in the next parts.'],
     visual:benchDiagram(h,c)};}},
   {part:'d',grade:'M',skill:'Torque and moments',expected:'351',
    gen(c,h){const k=bench(c);
     return {cloze:`${benchText(c)}\nBy calculating torques about support A, calculate the force acting on the bench at B.\nF_B = ____ N`,answer:h.sig3(k.FB),answerUnit:'N',
      explanation:`The bench is in equilibrium, so anticlockwise torques about A equal clockwise ones. Bench weight acts ${f(k.toCentre,3)} m right of A (${f(c.L,2)} ÷ 2 − ${f(c.a,3)}), and B is ${f(k.S2,3)} m right of A (${f(c.L,2)} − ${f(c.a,3)} − ${f(c.b,3)}). ${f(c.W1,0)} × ${f(c.d1,3)} + F_B × ${f(k.S2,3)} = ${f(c.Wb,0)} × ${f(k.toCentre,3)} + ${f(c.W2,0)} × ${f(c.d2,3)}, so F_B = ${h.sig3(k.FB)} N. (Common slip, worth only M: using one wrong distance, e.g. measuring the bench's centre from the end instead of from A.)`,
      visual:benchDiagram(h,c)};}},
   {part:'e',grade:'E',skill:'Torque and moments',expected:'1708',
    gen(c,h){const k=bench(c);
     return {cloze:`${benchText(c)}\nThe support at B pushes up with ${h.sig3(k.FB)} N.\nCalculate the force acting on the bench at A.\nF_A = ____ N`,answer:h.sig3(k.FA),answerUnit:'N',
      explanation:`The bench is not accelerating, so upward forces equal downward forces: F_A + F_B = ${f(c.Wb,0)} + ${f(c.W1,0)} + ${f(c.W2,0)} = ${f(k.total,0)} N. F_A = ${f(k.total,0)} − ${h.sig3(k.FB)} = ${h.sig3(k.FA)} N.`,
      visual:benchDiagram(h,c)};}},
   {part:'f',grade:'A',skill:'Circular motion',expected:'towards the centre of the circle',
    gen(c,h){const A='towards the centre of the circle';
     return {cloze:`Two players hold hands and move around in a circle at constant speed (seen from above).\nPlayer P is at the position shown, moving as the arrow shows.\nThe arrow showing the direction of P's acceleration points ____`,answer:A,choices:[A,'away from the centre of the circle','in the direction P is moving','opposite to the direction P is moving','nowhere: the acceleration is zero'],
      explanation:'In uniform circular motion the net force, and so the acceleration, points to the centre of the circle (centripetal).',visual:circleDiagram(h,c)};}},
   {part:'g',grade:'E',skill:'Circular motion',selfMark:true,
    gen(c,h){return {cloze:`Two players hold hands and move around in a circle (radius ${f(c.rr,1)} m) at a constant speed of ${f(c.sp,1)} m/s.\nExplain how it is possible for the players to be moving at a constant speed yet accelerating.`,
     points:['(A) Any one of: acceleration is towards the centre of the circle; there is a tension force; there is a change in direction; velocity is a vector.','(M) Link cause and effect: there must be a force towards the middle of the circle (tension in the arms) providing a centripetal force.','(E) This force is perpendicular to the direction of motion, so it changes their direction and not their speed.','(E) Velocity is a vector, and a change in direction is a change in velocity, which is an acceleration.'],
     visual:circleDiagram(h,c)};}}
  ]
 });
 function circleDiagram(h,c){
  const cx=320,cy=125,R=85,p=rad(c.phi),px=cx+R*Math.cos(p),py=cy-R*Math.sin(p);
  const s=c.cw?1:-1,dx=s*Math.sin(p),dy=s*Math.cos(p);
  const body=h.circle(cx,cy,R,3)+h.circle(cx,cy,3,1,'currentColor')+h.circle(px,py,11,3,'currentColor')+h.circle(cx-(px-cx),cy-(py-cy),11,3,'currentColor')
   +h.arrow(px,py,px+dx*60,py+dy*60,4)+h.text(px+(px>=cx?22:-22)*(Math.abs(px-cx)>1?1:0),py+(Math.abs(px-cx)>1?-14:(py<cy?-18:34)),'P',22)+h.text(cx,cy+35,'centre',16);
  return S(h,body,'Top view of two players moving round a circle; an arrow shows the direction of motion of player P','0 0 640 260');
 }
})();
