/* 2025 NCEA Level 2 Physics, AS 91173 (electricity and electromagnetism): rewritten with random numbers and redrawn diagrams.
   Part letters run a, b, c… in order (the paper's sub-parts (b)(i), (b)(ii)… get their own letters; see 91173-parts.md). */
(()=>{
 const SUP={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','-':'⁻'};
 // 4.8 × 10⁻¹⁰ style, to sf significant figures.
 const sci=(x,sf=3)=>{
  let e=Math.floor(Math.log10(Math.abs(x)));let m=Number((x/Math.pow(10,e)).toPrecision(sf));
  if(Math.abs(m)>=10){m/=10;e++;}
  return `${m.toFixed(sf-1)} × 10${String(e).split('').map(ch=>SUP[ch]).join('')}`;
 };
 const sig=(x,n=3)=>Number(Number(x).toPrecision(n));
 const T=(x,y,s,size=20,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="currentColor" style="font-size:${size}px">${s}</text>`;

 // ---------- Question 1: ink-jet plates ----------
 const plates=(h,o={})=>{
  // o.signs: sign of the TOP plate to label on both plates; o.path: 'top'|'bottom' droplet path; o.drop: sign text; o.stay: droplet hanging between plates
  let b=h.rect(110,50,370,16,3,'currentColor')+h.rect(110,194,370,16,3,'currentColor');
  b+=h.arrow(505,130,505,72,2.5,10)+h.arrow(505,130,505,188,2.5,10);
  b+=T(517,126,'d',22,'start')+T(517,150,'= '+o.d+' mm',18,'start');
  if(o.signs){const t=o.signs,u=t==='+'?'−':'+';for(let i=0;i<5;i++){b+=T(145+i*75,44,t,22);b+=T(145+i*75,236,u,22);}}
  if(o.path){const up=o.path==='top';b+=`<path d="M 70 130 Q 280 130 ${up?'440 76':'440 184'}" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="8 6"/>`;
   b+=h.circle(70,130,12,3,'none')+T(70,137,o.drop,20)+T(70,168,'droplet',18);}
  if(o.stay)b+=h.circle(320,130,13,3,'none')+T(320,170,'droplet',18);
  if(o.move)b+=h.circle(320,184,13,3,'none')+h.arrow(320,172,320,100,3,10)+T(360,130,'moves',18,'start')+T(320,226,'start',16);
  return b;
 };
 const q1Choices=(c)=>{
  const up=c.tp==='−',topS=c.tp,botS=c.tp==='+'?'−':'+',dir=up?'up':'down',rev=up?'down':'up',other=c.tp==='+'?'negative':'positive';
  const mine=c.tp==='+'?'positive':'negative';
  return {
   answer:`Top plate ${mine}; evenly spaced parallel lines pointing ${dir}`,
   choices:[
    `Top plate ${mine}; evenly spaced parallel lines pointing ${dir}`,
    `Top plate ${mine}; evenly spaced parallel lines pointing ${rev}`,
    `Top plate ${other}; evenly spaced parallel lines pointing ${dir}`,
    `Top plate ${other}; evenly spaced parallel lines pointing ${rev}`,
    `Top plate ${mine}; lines that curve outward and spread apart, like those round a point charge`
   ]};
 };
 NceaExam.add({
  year:2025,standard:'91173',number:1,title:'Ink droplets between charged plates',
  summary:'Parallel plates steer charged ink droplets: field direction, voltage from force, energy gained, and balancing a droplet.',
  context(r,h){
   const d=h.pick([0.50,0.80,1.00,1.20,1.50,2.00],r),q=h.pick([2.4,3.2,4.0,4.8,5.6,6.4,7.2],r)*1e-10,V=h.pick([1200,1500,1800,2000,2400,2500,3000],r);
   const F=sig(q*V/(d*1e-3),3);
   const V2=h.pick([2000,2500,3000,3500,4000,4500,5000],r),n=h.pick([3,4,5,6,8],r)*1e9,m=h.pick([0.80,1.02,1.20,1.50],r)*1e-11;
   const tp=h.pick(['+','−'],r),ds=h.pick(['+','−'],r);
   return {d,q,F,V2,n,m,tp,ds};
  },
  original:{d:1.00,q:4.8e-10,F:9.6e-4,V2:4000,n:4e9,m:1.02e-11,tp:'−',ds:'+'},
  parts:[
   {part:'a',grade:'A',skill:'Electric fields',
    gen(c,h){
     const attractedTop=c.ds!==c.tp;const side=attractedTop?'upwards, towards the top plate':'downwards, towards the bottom plate';
     const dropWord=c.ds==='+'?'positively':'negatively';
     const out=q1Choices(c);
     return {cloze:`Two horizontal parallel plates carry equal and opposite charges.\nA ${dropWord} charged ink droplet is fired in between and is deflected ${side}.\nWhich choice correctly gives the top plate's charge and the field between the plates?`,
      ...out,
      explanation:`The droplet is deflected towards the plate with the opposite charge, so the top plate is ${c.tp==='+'?'positive':'negative'}. Field lines run from + to −, so they point ${c.tp==='+'?'down':'up'}. Between parallel plates the field is uniform: straight, parallel, evenly spaced lines. Common mistake: field lines run from + to −, never from − to +.`,
      visual:{type:'svg',svg:h.svgWrap(plates(h,{d:c.d.toFixed(2),path:attractedTop?'top':'bottom',drop:c.ds}),'Two horizontal parallel plates with a droplet entering and curving towards one plate')}};
    }},
   {part:'b',grade:'M',skill:'Electric fields',expected:'2000',
    gen(c,h){
     const V=sig(c.F*c.d*1e-3/c.q,3);
     return {cloze:`The plates are ${c.d.toFixed(2)} mm apart. A droplet with charge ${sci(c.q)} C feels an electric force of ${sci(c.F)} N.\nWhat is the voltage across the plates?\nV = ____ V`,
      answer:h.fmt(V),answerUnit:'V',
      explanation:`E = F/q = ${sci(c.F)} / ${sci(c.q)} = ${sci(c.F/c.q)} N C⁻¹. V = Ed = ${sci(c.F/c.q)} × ${sci(c.d*1e-3)} = ${h.fmt(V)} V. (Same result from F = qV/d.) Remember to change mm to m before substituting.`,
      visual:{type:'svg',svg:h.svgWrap(plates(h,{d:c.d.toFixed(2),stay:false}),'Two horizontal parallel plates a small distance apart')}};
    }},
   {part:'c',grade:'E',skill:'Electric fields',expected:'708',
    gen(c,h){
     const e=1.6e-19,q=c.n*e,E=q*c.V2,v=Math.sqrt(2*E/c.m);
     return {cloze:`The voltage across the plates is now ${c.V2} V.\nA droplet of mass ${sci(c.m)} kg carries ${sci(c.n,2)} excess electrons (e = 1.6 × 10⁻¹⁹ C).\nIt is released from rest at the negative plate.\nHow fast is it moving when it reaches the positive plate?\nv = ____ m/s`,
      answer:h.fmt(sig(v,3)),answerUnit:'m/s',unitAliases:['m s⁻¹'],
      explanation:`q = ${sci(c.n,2)} × 1.6 × 10⁻¹⁹ = ${sci(q)} C. Energy gained = qV = ${sci(q)} × ${c.V2} = ${sci(E)} J (the plate gap cancels: Eqd = qV; using the field value as the energy is the A-level step). This becomes kinetic energy: ½mv² = ${sci(E)}, so v = √(2 × ${sci(E)} / ${sci(c.m)}) = ${h.fmt(sig(v,3))} m/s.`,
      visual:{type:'svg',svg:h.svgWrap(plates(h,{d:c.d.toFixed(2),move:false}),'Two horizontal parallel plates')}};
    }},
   {part:'d',grade:'E',skill:'Electric fields',selfMark:true,
    gen(c,h){
     const top=c.tp==='+'?'positive':'negative',dir=c.tp==='+'?'down':'up',sign=c.tp==='+'?'negative':'positive';
     return {cloze:`A charged ink droplet is held stationary between two horizontal charged parallel plates. The top plate is ${top}.\nDiscuss how it is possible for the droplet to be stationary.\nIn your answer:\n• identify the forces on the droplet and their directions\n• describe how the forces combine to keep it stationary\n• explain what type of charge the droplet must have.`,
      points:[
       '(A) The gravitational force (weight) acting on the droplet is downwards.',
       '(A) The electrostatic force on the droplet is upward.',
       '(M) Balance: when the gravitational force equals the electric force (equal size, opposite direction, net force zero) the droplet is suspended.',
       `(E) Field direction: with the top plate ${top}, the field points ${dir} (from + to −, never the other way).`,
       `(E) For the electric force to be upward, the droplet must have a ${sign} charge, opposite to the charge on the top plate.`,
       'Grade guide: one correct statement = A; two linked statements = M; the full explanation = E.'
      ],
      visual:{type:'svg',svg:h.svgWrap(plates(h,{d:c.d.toFixed(2),signs:c.tp,stay:true}),'Two horizontal parallel plates with a droplet hanging between them')}};
    }}
  ]
 });

 // ---------- Question 2: air fryer circuit ----------
 const sw=(x,y,closed,label)=>{
  let b=h0.circle(x,y-14,3.5,2,'currentColor')+h0.circle(x,y+14,3.5,2,'currentColor');
  b+=closed?h0.line(x,y+14,x,y-14,3):h0.line(x,y+14,x+20,y-12,3);
  return b+T(x+36,y+6,label,20,'start');
 };
 let h0=null;
 const circuit=(h,o)=>{
  h0=h;
  const L=60,R=430,yb=40;
  let b=h.line(L,yb,200,yb)+h.line(200,yb-14,200,yb+14,3)+h.line(212,yb-24,212,yb+24,3)+h.line(212,yb,R,yb)+T(206,yb-30,o.V+' V',20);
  b+=h.line(L,yb,L,235)+h.line(R,yb,R,86)+h.line(R,114,R,181)+h.line(R,209,R,235);
  b+=sw(R,100,true,'A');
  // right rail from A down to B
  b+=sw(R,195,o.bClosed,'B');
  // lamp row
  const yl=135;b+=h.line(L,yl,222,yl)+h.circle(240,yl,18,3)+h.line(228,yl-12,252,yl+12,2.5)+h.line(228,yl+12,252,yl-12,2.5)+h.line(258,yl,R,yl);
  b+=T(150,yl-12,o.lampLabel,20);
  // rheostat row
  const yr=175;b+=h.line(L,yr,205,yr)+h.rect(205,yr-12,70,24,3)+h.line(275,yr,R,yr)+h.arrow(215,yr+16,265,yr-20,2.5,9)+T(150,yr-10,o.elLabel,20);
  // fans row
  const yf=235;b+=h.line(L,yf,110,yf)+h.rect(110,yf-12,70,24,3)+h.line(180,yf,230,yf)+h.rect(230,yf-12,70,24,3)+h.line(300,yf,R,yf);
  b+=T(145,yf-18,o.fanLabel,18)+T(265,yf-18,o.fanLabel,18);
  return h.svgWrap(b,'Circuit: a supply feeding a lamp and a rheostat in parallel, and two resistors in series behind switch B, with switch A in the supply line','0 0 640 270');
 };
 NceaExam.add({
  year:2025,standard:'91173',number:2,title:'Air fryer circuit',
  summary:'A supply feeds a lamp, a heating element (rheostat) and two fans in parallel. Currents, power and what happens when parts change.',
  context(r,h){
   const RL=h.pick([500,800,1000,1200,2000],r),Re=h.pick([24,30,32,36,40,48],r),Rf=h.pick([240,360,480,600],r),t=h.pick([2,3,5,10],r),inc=h.pick([true,false],r);
   return {V:240,RL,Re,Rf,t,inc,P:240*240/Re};
  },
  original:{V:240,RL:1000,Re:32,Rf:480,t:5,inc:true,P:1800},
  parts:[
   {part:'a',grade:'A',skill:'Ohm’s law and resistance',expected:'0.24',
    gen(c,h){
     const I=c.V/c.RL;
     return {cloze:`A ${c.V} V supply is connected to a lamp (${c.RL} Ω), a heating element and two fans, each in its own parallel branch (see diagram).\nSwitch A is closed and switch B is open, so only the lamp and element are on.\nWhat is the current in the lamp?\nI = ____ A`,
      answer:h.fmt(sig(I,3)),answerUnit:'A',
      explanation:`Take care to use V (voltage), not v. The lamp is directly across the supply: V = IR, so I = V/R = ${c.V} / ${c.RL} = ${h.fmt(sig(I,3))} A.`,
      visual:{type:'svg',svg:circuit(h,{V:c.V,bClosed:false,lampLabel:`lamp ${c.RL} Ω`,elLabel:'element',fanLabel:`fan ${c.Rf} Ω`})}};
    }},
   {part:'b',grade:'M',skill:'Electrical power and energy',selfMark:true,
    gen(c,h){
     const w=c.inc?'increase':'decrease',how=c.inc?'decrease':'increase';
     return {cloze:`The heating element is the rheostat in the ${c.V} V parallel circuit. Use physics principles to explain what change to the rheostat's resistance would ${w} the power output of the element.`,
      points:[
       c.inc?'(A) Decrease the resistance of the rheostat.':'(A) Increase the resistance of the rheostat.',
       `(A) The supply voltage is fixed at ${c.V} V.`,
       `(M) The rheostat (element) is in its own parallel branch, so it gets the full ${c.V} V.`,
       c.inc?'(M) Lower resistance means more current through the rheostat (I = V/R), so more power (P = VI = V²/R).':'(M) Higher resistance means less current through the rheostat (I = V/R), so less power (P = VI = V²/R).',
       'Common mistake: stay with the rheostat. Adding lamps or other components does not answer the question.'
      ],visual:{type:'svg',svg:circuit(h,{V:c.V,bClosed:false,lampLabel:`lamp ${c.RL} Ω`,elLabel:'element',fanLabel:`fan ${c.Rf} Ω`})}};
    }},
   {part:'c',grade:'A',skill:'Electrical power and energy',expected:'32',
    gen(c,h){
     return {cloze:`Both switches are now closed. The element is set to give ${c.P} W from the ${c.V} V supply.\nWhat is the resistance of the element?\nR = ____ Ω`,
      answer:h.fmt(c.Re),answerUnit:'Ω',
      explanation:`The element is across ${c.V} V, so P = V²/R and R = V²/P = ${c.V}² / ${c.P} = ${h.fmt(c.Re)} Ω.`,
      visual:{type:'svg',svg:circuit(h,{V:c.V,bClosed:true,lampLabel:`lamp ${c.RL} Ω`,elLabel:'element',fanLabel:`fan ${c.Rf} Ω`})}};
    }},
   {part:'d',grade:'E',skill:'Series and parallel circuits',expected:'2400',
    gen(c,h){
     const G=1/c.RL+1/c.Re+1/(2*c.Rf),Rt=1/G,I=c.V*G,Q=I*c.t*60;
     return {cloze:`Both switches are closed. The lamp is ${c.RL} Ω, the element ${c.Re} Ω (${c.P} W) and each fan ${c.Rf} Ω, with the two fans in series.\nThe supply is ${c.V} V and runs for ${c.t} minutes.\nHow much charge flows through the power supply in that time?\nQ = ____ C`,
      answer:h.fmt(sig(Q,3)),answerUnit:'C',
      explanation:`Grade guide: the current in any single branch, or the element resistance, earns A; one error gives M; all correct gives E. Branches in parallel: 1/Rₜ = 1/${c.RL} + 1/${c.Re} + 1/${2*c.Rf} so Rₜ = ${h.fmt(sig(Rt,3))} Ω. I = V/Rₜ = ${h.fmt(sig(I,3))} A. Q = It (change minutes to seconds first) = ${h.fmt(sig(I,3))} × ${c.t * 60} s = ${h.fmt(sig(Q,3))} C.`,
      visual:{type:'svg',svg:circuit(h,{V:c.V,bClosed:true,lampLabel:`lamp ${c.RL} Ω`,elLabel:`element ${c.Re} Ω`,fanLabel:`fan ${c.Rf} Ω`})}};
    }},
   {part:'e',grade:'E',skill:'Series and parallel circuits',selfMark:true,
    gen(c,h){
     return {cloze:`Both switches are closed and the element is set to ${c.P} W. The lamp then burns out (its branch becomes a break).\nUse physics principles to explain the effect on (1) the total current from the supply and (2) the power output of the element.`,
      points:[
       '(A) With the lamp out, a pathway is removed (one fewer parallel branch), so the total resistance of the circuit increases.',
       `(M) The supply voltage is fixed at ${c.V} V, so the total current in the circuit decreases.`,
       `(E) The element still gets the full ${c.V} V, so the current through it is unchanged (P = IV), and so is its power output: no effect.`,
       'Grade guide: one correct statement = A; two linked statements = M; full explanation = E.',
       'Common mistakes: "current splits in parallel" is too generic; and not everything stays the same when one component changes.'
      ],visual:{type:'svg',svg:circuit(h,{V:c.V,bClosed:true,lampLabel:`lamp ${c.RL} Ω`,elLabel:`element ${c.Re} Ω`,fanLabel:`fan ${c.Rf} Ω`})}};
    }}
  ]
 });

 // ---------- Question 3: magnets and motors ----------
 const horseshoe=(h,c)=>{
  let b=`<path d="M230 235 V110 A90 90 0 0 1 410 110 V235" fill="none" stroke="currentColor" stroke-width="28"/>`;
  b+=h.rect(216,190,28,45,3,'none')+h.rect(396,190,28,45,3,'none')+T(180,222,'A',24)+T(460,222,'B',24);
  b+=(c.aI<0?h.into(320,215):h.out(320,215))+h.arrow(320,190,320,120,4,14)+T(320,104,'force',20)+T(320,254,`wire, current ${c.aI<0?'into':'out of'} the page`,18);
  return h.svgWrap(b,`Horseshoe magnet with poles A and B and a wire carrying current ${c.aI<0?'into':'out of'} the page between them, with the force on the wire shown`);
 };
 const motor=(h,c,o={})=>{
  const left=c.sb>0?'N':'S',right=c.sb>0?'S':'N',A=[285,80],B=[250,175],C=[430,175],D=[465,80];
  let b=h.rect(30,70,80,130,3,'none')+T(70,145,left,32)+h.rect(530,70,80,130,3,'none')+T(570,145,right,32);
  const f=(x1,x2)=>c.sb>0?h.arrow(x1,125,x2,125,3,12):h.arrow(x2,125,x1,125,3,12);
  b+=f(125,225)+f(470,520)+T(175,112,'field',18);
  b+=[[A,B],[B,C],[C,D],[D,A]].map(([p,q])=>h.line(p[0],p[1],q[0],q[1],4)).join('');
  b+=T(285,64,'A',22)+T(232,198,'B',22)+T(448,198,'C',22)+T(478,66,'D',22);
  if(o.force){const up=c.sf>0;b+=up?h.arrow(268,115,268,38,4,14)+T(256,58,o.force,20,'end'):h.arrow(268,140,268,222,4,14)+T(280,236,o.force,20,'start');}
  b+=T(450,254,`coil of ${c.N} turns`,18);
  return h.svgWrap(b,'Electric motor drawn in perspective: a rectangular coil ABCD lying flat between the north and south poles of a magnet');
 };
 const dirWord=s=>s>0?'upwards':'downwards';
 NceaExam.add({
  year:2025,standard:'91173',number:3,title:'Magnets, motors and generators',
  summary:'Force on a wire in a magnet, a motor coil, and the same coil turned into a generator.',
  context(r,h){
   const N=h.pick([20,30,40,50,60],r),B=h.pick([1.2,1.4,1.5,1.7,1.8],r),L=h.pick([0.30,0.40,0.50,0.60],r),I=h.pick([0.30,0.40,0.44,0.50,0.60],r);
   const F=sig(N*B*L*I,3),Vmax=h.pick([8,10,12,15,18,20,24],r);
   const aI=h.pick([-1,1],r),aF=h.pick([-1,1],r),sb=h.pick([-1,1],r),sf=h.pick([-1,1],r);
   return {N,B,L,F,Vmax,aI,aF,sb,sf};
  },
  original:{N:40,B:1.7,L:0.50,F:15,Vmax:12,aI:-1,aF:1,sb:-1,sf:1},
  parts:[
   {part:'a',grade:'A',skill:'Magnetic force',
    gen(c,h){
     const north=(c.aI*c.aF>0)?'A':'B';
     return {cloze:`A wire between the poles A and B of a horseshoe magnet carries current ${c.aI<0?'into':'out of'} the page. The field is horizontal, and the force on the wire is ${dirWord(c.aF)}.\nWhich pole is the north pole?`,
      answer:north,choices:['A','B'],
      explanation:`Magnets have north and south poles, not + and −. Fleming's left hand rule: thumb = force (${dirWord(c.aF)}), second finger = current (${c.aI<0?'into':'out of'} the page); the first finger then gives the field direction, ${north==='A'?'left to right':'right to left'}. Field lines leave the north pole, so pole ${north} is north.`,
      visual:{type:'svg',svg:horseshoe(h,c)}};
    }},
   {part:'b',grade:'A',skill:'Magnetic force',
    gen(c,h){
     const towards=c.sb*c.sf>0;   // toward the viewer along AB means A (back) to B (front)
     const ans=towards?'A → B → C → D → A':'B → A → D → C → B';
     return {cloze:`A motor has a coil ABCD (${c.N} turns) lying flat in the field between the poles. The force on side AB is ${dirWord(c.sf)}.\nIn which direction does the current go round the coil?`,
      answer:ans,choices:['A → B → C → D → A','B → A → D → C → B'],
      explanation:`Field: ${c.sb>0?'left to right (N on the left)':'right to left (N on the right)'}. Give the direction, not just a letter. Fleming's left hand rule on AB: thumb = force (${dirWord(c.sf)}), first finger = field, so the second finger (current) points ${towards?'towards you':'away from you'}, which is ${towards?'A to B':'B to A'} (A is at the back). So the current goes ${ans}.`,
      visual:{type:'svg',svg:motor(h,c,{force:`${c.F} N`})}};
    }},
   {part:'c',grade:'M',skill:'Magnetic force',
    gen(c,h){
     const opp=dirWord(-c.sf),same=dirWord(c.sf),F=c.F;
     const ans=`${F} N ${opp}`;
     return {cloze:`The force on side AB of the coil is ${F} N ${same}.\nWhat are the size and direction of the force on side CD?`,
      answer:ans,choices:[ans,`${F} N ${same}`,'0 N',`${sig(F/2,3)} N ${opp}`],
      explanation:`CD is the same length in the same field, carrying the same current, at right angles to the field, so F = BIL is the same size. The current runs the opposite way round the coil, so (Fleming's left hand rule) the force is ${opp}.`,
      visual:{type:'svg',svg:motor(h,c,{force:`${F} N`})}};
    }},
   {part:'d',grade:'M',skill:'Magnetic force',
    gen(c,h){
     const F=c.F,u=dirWord(1),d=dirWord(-1);
     return {cloze:`The force on side AB of the coil is ${F} N ${dirWord(c.sf)}. The sides AB and CD are at right angles to the field. Side BC runs parallel to the field.\nWhat is the force on side BC?`,
      answer:'0 N',choices:['0 N',`${F} N ${u}`,`${F} N ${d}`,`${sig(F/2,3)} N ${u}`],
      explanation:'BC is parallel to the field, so it does not cut field lines: F = BIL sin θ with θ = 0, giving 0 N.',
      visual:{type:'svg',svg:motor(h,c,{force:`${F} N`})}};
    }},
   {part:'e',grade:'E',skill:'Magnetic force',selfMark:true,
    gen(c,h){
     return {cloze:`The coil lies flat in a horizontal field. The force on AB is ${c.F} N ${dirWord(c.sf)}, on CD it is ${c.F} N ${dirWord(-c.sf)}, and on BC it is 0 N.\nUse physics principles to explain the differences between the forces on CD and BC.`,
      points:[
       '(M) CD: the current is at right angles (perpendicular) to the magnetic field, so the force on it is the maximum, F = BIL.',
       '(M) BC: the current is parallel to the magnetic field, so the force on it is 0 N.',
       '(E) The link: F = BIL sin θ, where θ is the angle between the current and the field. CD has θ = 90° (sin θ = 1); BC has θ = 0° (sin θ = 0).',
       '(M) The current in CD is opposite to the current in AB, so the force on CD is in the opposite direction (Fleming\'s left hand rule).'
      ],visual:{type:'svg',svg:motor(h,c,{force:`${c.F} N`})}};
    }},
   {part:'f',grade:'M',skill:'Magnetic force',expected:'0.44',
    gen(c,h){
     const It=c.F/(c.B*c.L),I1=It/c.N;
     return {cloze:`Side AB is ${Math.round(c.L*100)} cm long in a field of ${c.B} T. The coil has ${c.N} turns, so side AB is ${c.N} strands of wire side by side, together feeling ${c.F} N.\nCalculate the current in one strand.\nI = ____ A`,
      answer:h.fmt(sig(I1,3)),answerUnit:'A',
      explanation:`Total: F = BIL so I = F/(BL) = ${c.F} / (${c.B} × ${c.L}) = ${h.fmt(sig(It,3))} A. This is the sum over ${c.N} strands, so one strand carries ${h.fmt(sig(It,3))} / ${c.N} = ${h.fmt(sig(I1,3))} A. (Equivalent: ${c.F}/${c.N} = ${h.fmt(sig(c.F/c.N,3))} N per strand, then I = F/(BL).)`,
      visual:{type:'svg',svg:motor(h,c,{force:`${c.F} N`})}};
    }},
   {part:'g',grade:'M',skill:'Electromagnetic induction',expected:'0.176',
    gen(c,h){
     const v=c.Vmax/(2*c.N*c.B*c.L);
     return {cloze:`The voltage source is removed and the coil is spun as a generator. Sides AB and CD each have length ${c.L} m and cut a field of ${c.B} T at the same speed, in opposite directions, and their emfs add. The coil has ${c.N} turns.\nWhat speed must side AB have for the largest emf across the whole coil to be ${c.Vmax} V?\nv = ____ m/s`,
      answer:h.fmt(sig(v,3)),answerUnit:'m/s',unitAliases:['m s⁻¹'],
      explanation:`Each side of each turn gives emf = BLv. Two sides per turn, ${c.N} turns: V = 2NBLv. So v = V / (2NBL) = ${c.Vmax} / (2 × ${c.N} × ${c.B} × ${c.L}) = ${h.fmt(sig(v,3))} m/s.`,
      visual:{type:'svg',svg:motor(h,c,{})}};
    }},
   {part:'h',grade:'E',skill:'Electromagnetic induction',selfMark:true,
    gen(c,h){
     return {cloze:`The coil generator turns in the field. Use physics principles to explain what position side AB needs to be in to produce the maximum voltage.`,
      points:[
       '(E) The maximum emf is when the coil is in the position shown: flat, with its plane parallel to the magnetic field.',
       '(E) Here sides AB and CD move at 90° (right angles) to the field, so they cut the field lines at the fastest rate: V = BvL is greatest.',
       '(Extra) Equivalent: the flux through the coil is zero but is changing at its fastest rate.',
       'When the coil is upright the sides move along the field lines, cut none, and the emf is zero.'
      ],visual:{type:'svg',svg:motor(h,c,{})}};
    }}
  ]
 });
})();
