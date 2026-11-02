/* Level 5 (word problems) – electromagnetism: circuits, electric fields, forces on conductors/charges, induction.
   Equations in scope: Q=It, V=IR, P=VI, E=Pt, resistor combinations, E=V/d, F=qE, ΔEk=qV, F=BIL, F=qvB, Φ=BA, emf=NΔΦ/Δt, F=ma.
   Left out (not in the course outline): Coulomb's law, transformers. */
(()=>{
 const T='Electromagnetism';
 const PAR=[[6,3,2],[12,4,3],[20,5,4],[30,20,12],[60,40,24],[12,6,4],[10,10,5],[15,10,6],[40,10,8],[30,15,10],[60,30,20],[8,8,4],[24,8,6],[18,9,6]];
 const add=(id,skill,gen)=>Physics12.add(7,{id,topic:T,skill,gen});
 const an_=n=>/^(8|11|18)/.test(String(n))?'an':'a';

 add('L7-E01','Energy = power × time',(r,h)=>{
  const o=h.pick([['kettle',[1.5,1.8,2,2.2,2.4]],['heater',[1,1.5,2]],['toaster',[0.8,1,1.2]]],r);
  const P=h.pick(o[1],r),m=h.int(2,8,r),E=P*1000*m*60/1000;
  return {cloze:`A ${o[0]} is rated at ${h.fmt(P)} kW.\nIt is switched on for ${m} minutes.\nFind the energy it transfers: ____ kJ`,answer:h.fmt(E),answerUnit:'kJ',
   explanation:`Givens: P = ${h.fmt(P*1000)} W, t = ${m*60} s. E = Pt = ${h.fmt(P*1000)} × ${m*60} = ${h.fmt(E*1000)} J = ${h.fmt(E)} kJ.`};});

 add('L7-E02','Current from power and voltage',(r,h)=>{
  const V=h.pick([230,12,230],r),I=V===230?h.pick([2,4,5,8,10],r):h.pick([2,3,5,6,10],r),P=V*I;
  const o=V===230?h.pick(['heater','kettle','toaster','hair dryer'],r):'car heater fan';
  return {cloze:`A ${o} is rated at ${P} W when connected to ${V} V.\nFind the current it draws: ____ A`,answer:I,answerUnit:'A',
   explanation:`Givens: P = ${P} W, V = ${V} V. P = VI so I = P/V = ${P} ÷ ${V} = ${I} A.`};});

 add('L7-E03','Charge from current and time',(r,h)=>{
  const mA=h.pick([100,200,250,500,800,1000,1500,2000],r),min=h.pick([2,5,10,20,30],r),Q=mA/1000*min*60;
  return {cloze:`A phone charger delivers a steady ${mA} mA.\nIt is plugged in for ${min} minutes.\nFind the charge that flows through the phone: ____ C`,answer:h.fmt(Q),answerUnit:'C',
   explanation:`Givens: I = ${h.fmt(mA/1000)} A, t = ${min*60} s. Q = It = ${h.fmt(mA/1000)} × ${min*60} = ${h.fmt(Q)} C.`};});

 add('L7-E04','Power of a torch bulb',(r,h)=>{
  const V=h.pick([3,4.5,6,9],r),mA=h.pick([100,200,250,300,400,500],r),P=V*mA/1000;
  return {cloze:`A torch bulb runs from a ${h.fmt(V)} V battery.\nThe current through the bulb is ${mA} mA.\nFind the power of the bulb: ____ W`,answer:h.fmt(P),answerUnit:'W',
   explanation:`Givens: V = ${h.fmt(V)} V, I = ${h.fmt(mA/1000)} A. P = VI = ${h.fmt(V)} × ${h.fmt(mA/1000)} = ${h.fmt(P)} W.`};});

 add('L7-E05','Resistance of a bulb',(r,h)=>{
  let R,mA,V,n=0;do{R=h.pick([5,10,12,15,20,24,30,40,50],r);mA=h.pick([100,150,200,250,300,400],r);V=R*mA/1000;}while(V>12&&++n<50);
  return {cloze:`A small lamp has ${h.fmt(V)} V across it.\nThe current through it is ${mA} mA.\nFind the resistance of the lamp: ____ Ω`,answer:R,answerUnit:'Ω',
   explanation:`Givens: V = ${h.fmt(V)} V, I = ${h.fmt(mA/1000)} A. R = V/I = ${h.fmt(V)} ÷ ${h.fmt(mA/1000)} = ${R} Ω.`};});

 add('L7-E06','Series resistors: current',(r,h)=>{
  let R1,R2,Rt,I,V,n=0;do{R1=h.pick([10,20,30,40,50,100],r);R2=h.pick([20,30,50,60,100,150],r);Rt=R1+R2;I=h.pick([0.05,0.1,0.2,0.25,0.5],r);V=Rt*I;}while(V>30&&++n<50);
  return {cloze:`Two resistors, ${R1} Ω and ${R2} Ω, are connected in series\nto ${an_(V)} ${h.fmt(V)} V supply.\nFind the current in the circuit: ____ A`,answer:h.fmt(I),answerUnit:'A',
   explanation:`Series: Rₜ = ${R1} + ${R2} = ${Rt} Ω. I = V/Rₜ = ${h.fmt(V)} ÷ ${Rt} = ${h.fmt(I)} A.`};});

 add('L7-E07','Series resistors: pd across one',(r,h)=>{
  let R1,R2,R3,Rt,I,V,V2,n=0;do{R1=h.pick([100,200,300,400],r);R2=h.pick([100,200,300,600],r);R3=h.pick([100,200,500],r);Rt=R1+R2+R3;I=h.pick([0.01,0.02,0.025,0.05],r);V=Rt*I;V2=R2*I;}while(V>30&&++n<50);
  return {cloze:`Three resistors (${R1} Ω, ${R2} Ω and ${R3} Ω) are in series\nwith ${an_(V)} ${h.fmt(V)} V battery.\nFind the potential difference across the ${R2} Ω resistor: ____ V`,answer:h.fmt(V2),answerUnit:'V',
   explanation:`Rₜ = ${Rt} Ω. I = V/Rₜ = ${h.fmt(V)} ÷ ${Rt} = ${h.fmt(I)} A. V = IR = ${h.fmt(I)} × ${R2} = ${h.fmt(V2)} V.`};});

 add('L7-E08','Parallel branches: total current',(r,h)=>{
  const [R1,R2]=h.pick(PAR,r),V=h.pick([6,12,24,30],r),I=V/R1+V/R2;
  return {cloze:`Two lamps of resistance ${R1} Ω and ${R2} Ω are connected\nin parallel across a ${V} V supply.\nFind the total current from the supply: ____ A`,answer:h.sig3(I),answerUnit:'A',
   explanation:`Each branch has ${V} V. I₁ = ${V}/${R1} = ${h.sig3(V/R1)} A, I₂ = ${V}/${R2} = ${h.sig3(V/R2)} A. Total = ${h.sig3(I)} A.`};});

 add('L7-E09','Parallel resistance then power',(r,h)=>{
  const [R1,R2,Rt]=h.pick(PAR,r),V=h.pick([6,12,24,30],r),P=V*V/Rt;
  return {cloze:`Two heating elements of ${R1} Ω and ${R2} Ω are in parallel\nacross a ${V} V supply.\nFind the total power they use: ____ W`,answer:h.sig3(P),answerUnit:'W',
   explanation:`Rₜ = 1/(1/${R1} + 1/${R2}) = ${Rt} Ω. I = V/Rₜ = ${h.sig3(V/Rt)} A. P = VI = ${V} × ${h.sig3(V/Rt)} = ${h.sig3(P)} W.`};});

 add('L7-E10','Series–parallel: total resistance',(r,h)=>{
  const [R1,R2,Rp]=h.pick(PAR,r),Rs=h.pick([4,5,10,12,20],r),Rt=Rs+Rp;
  return {cloze:`A ${Rs} Ω resistor is in series with a parallel pair\nof ${R1} Ω and ${R2} Ω resistors.\nFind the total resistance of the combination: ____ Ω`,answer:h.fmt(Rt),answerUnit:'Ω',
   explanation:`Parallel pair: 1/R = 1/${R1} + 1/${R2}, R = ${Rp} Ω. In series with ${Rs} Ω: Rₜ = ${Rs} + ${Rp} = ${Rt} Ω.`};});

 add('L7-E11','Series–parallel: current from supply',(r,h)=>{
  const [R1,R2,Rp]=h.pick(PAR,r),Rs=h.pick([4,6,10,12,20],r),Rt=Rs+Rp,V=h.pick([6,12,24],r),I=V/Rt;
  return {cloze:`A ${Rs} Ω resistor is in series with two resistors (${R1} Ω and ${R2} Ω)\nthat are in parallel with each other.\nThe supply is ${V} V.\nFind the current drawn from the supply: ____ A`,answer:h.sig3(I),answerUnit:'A',
   explanation:`Parallel pair = ${Rp} Ω. Rₜ = ${Rs} + ${Rp} = ${Rt} Ω. I = V/Rₜ = ${V} ÷ ${Rt} = ${h.sig3(I)} A.`};});

 add('L7-E12','Car headlamps in parallel',(r,h)=>{
  const P=h.pick([36,48,60],r),n=h.pick([2,4],r),Pt=P*n,I=Pt/12;
  return {cloze:`A car has a 12 V battery.\nIt powers ${n} identical headlamps in parallel, each rated at ${P} W.\nFind the total current from the battery: ____ A`,answer:h.fmt(I),answerUnit:'A',
   explanation:`Total power = ${n} × ${P} = ${Pt} W. P = VI so I = P/V = ${Pt} ÷ 12 = ${h.fmt(I)} A.`};});

 add('L7-E13','Power, current and charge',(r,h)=>{
  const I=h.pick([2,4,5,8,10],r),min=h.pick([2,5,10,15],r),P=230*I,Q=I*min*60;
  return {cloze:`A heater is rated at ${P} W on a 230 V supply.\nIt runs for ${min} minutes.\nFind the charge that flows through it: ____ C`,answer:h.fmt(Q),answerUnit:'C',
   explanation:`I = P/V = ${P} ÷ 230 = ${I} A. t = ${min*60} s. Q = It = ${I} × ${min*60} = ${h.fmt(Q)} C.`};});

 add('L7-E14','Energy from V, I and t',(r,h)=>{
  const V=h.pick([6,12,24],r),I=h.pick([2,4,5,10],r),min=h.pick([1,2,5,10],r),E=V*I*min*60/1000;
  return {cloze:`A motor runs from a ${V} V supply and draws ${I} A.\nIt runs for ${min} minutes.\nFind the electrical energy it uses: ____ kJ`,answer:h.fmt(E),answerUnit:'kJ',
   explanation:`P = VI = ${V} × ${I} = ${V*I} W. E = Pt = ${V*I} × ${min*60} = ${h.fmt(E*1000)} J = ${h.fmt(E)} kJ.`};});

 add('L7-E15','Heater element resistance',(r,h)=>{
  const I=h.pick([2,4,5,8,10],r),P=230*I,R=230/I;
  return {cloze:`A heater is rated at ${P} W on a 230 V supply.\nFind the resistance of its element: ____ Ω`,answer:h.sig3(R),answerUnit:'Ω',
   explanation:`I = P/V = ${P} ÷ 230 = ${I} A. R = V/I = 230 ÷ ${I} = ${h.sig3(R)} Ω.`};});

 add('L7-E16','Electric field between plates',(r,h)=>{
  const d=h.pick([1,2,4,5,10],r),V=h.pick([100,200,400,500,1000,2000],r),E=V/(d/100);
  return {cloze:`Two parallel plates are ${d} cm apart.\nThe potential difference across them is ${V} V.\nFind the electric field strength between the plates: ____ V/m`,answer:h.fmt(E),answerUnit:'V/m',unitAliases:['N/C'],
   explanation:`Givens: V = ${V} V, d = ${h.fmt(d/100)} m. E = V/d = ${V} ÷ ${h.fmt(d/100)} = ${h.fmt(E)} V/m.`};});

 add('L7-E17','Force on a charged droplet',(r,h)=>{
  const d=h.pick([1,2,4,5],r),V=h.pick([100,200,400,500,1000],r),q=h.pick([1,2,3,4,5,6,8],r),E=V/(d/100),F=q*E*1e-9*1e6;
  return {cloze:`A charged oil droplet (${q} nC) sits between two parallel plates\n${d} cm apart, with ${V} V across them.\nFind the electric force on the droplet: ____ µN`,answer:h.fmt(F),answerUnit:'µN',
   explanation:`E = V/d = ${V} ÷ ${h.fmt(d/100)} = ${h.fmt(E)} V/m. F = qE = ${q}×10⁻⁹ × ${h.fmt(E)} = ${h.fmt(F)}×10⁻⁶ N = ${h.fmt(F)} µN.`};});

 add('L7-E18','Droplet held still: find the charge',(r,h)=>{
  const d=h.pick([1,2,4,5],r),E=h.pick([1000,2000,4000,5000,10000],r),V=E*d/100,q=h.pick([1,2,3,4,5,6,8],r),m=q*E/1e4;
  return {cloze:`A droplet of mass ${h.fmt(m)} mg hangs motionless between horizontal plates\n${d} cm apart with ${h.fmt(V)} V across them. (g = 10 N/kg)\nFind the size of the charge on the droplet: ____ nC`,answer:q,answerUnit:'nC',
   explanation:`Weight = mg = ${h.fmt(m)}×10⁻⁶ × 10 = ${h.fmt(m*10)}×10⁻⁶ N. E = V/d = ${h.fmt(E)} V/m. Electric force balances weight: q = F/E = ${q} nC.`};});

 add('L7-E19','Acceleration of a charged particle',(r,h)=>{
  const d=h.pick([1,2,4,5],r),V=h.pick([100,200,400,500,1000],r),q=h.pick([2,4,5,10],r),m=h.pick([1,2,4,5,10],r),E=V/(d/100),F=q*E*1e-3,a=F/m;  // F in µN: q nC * V/m *1e-9 *1e6
  return {cloze:`A dust particle of mass ${m} mg carries a charge of ${q} nC.\nIt is released between plates ${d} cm apart with ${V} V across them.\nIgnore gravity. Find its acceleration: ____ m/s²`,answer:h.sig3(a),answerUnit:'m/s²',
   explanation:`E = V/d = ${h.fmt(E)} V/m. F = qE = ${h.fmt(F)} µN = ${h.fmt(F*1e-6)} N. m = ${m}×10⁻⁶ kg. a = F/m =${h.sig3(a)} m/s².`};});

 add('L7-E20','Energy gained through a pd',(r,h)=>{
  const q=h.pick([1,2,4,5,10],r),V=h.pick([100,200,500,1000,2000],r),E=q*V*1e-3;
  return {cloze:`A particle with a charge of ${q} µC is accelerated\nthrough a potential difference of ${V} V.\nFind the kinetic energy it gains: ____ mJ`,answer:h.fmt(E),answerUnit:'mJ',
   explanation:`V = E/q so E = qV = ${q}×10⁻⁶ × ${V} = ${h.fmt(E*1e-3)} J = ${h.fmt(E)} mJ.`};});

 add('L7-E21','Force on a wire (motor)',(r,h)=>{
  const o=h.pick(['A wire in a motor','A straight wire in a loudspeaker','A conductor in a small motor'],r),B=h.pick([0.1,0.2,0.25,0.4,0.5],r),I=h.pick([2,3,4,5,8,10],r),L=h.pick([5,10,20,25,40],r),F=B*I*L/100;
  return {cloze:`${o} carries ${I} A at right angles to a ${B*1000} mT magnetic field.\n${L} cm of the wire is in the field.\nFind the force on the wire: ____ N`,answer:h.sig3(F),answerUnit:'N',
   explanation:`B = ${h.fmt(B)} T, L = ${h.fmt(L/100)} m. F = BIL = ${h.fmt(B)} × ${I} × ${h.fmt(L/100)} = ${h.sig3(F)} N.`};});

 add('L7-E22','Wire in field: acceleration',(r,h)=>{
  const B=h.pick([0.2,0.4,0.5],r),I=h.pick([2,4,5,10],r),L=h.pick([10,20,25,50],r),F=B*I*L/100,m=h.pick([10,20,25,50,100],r),a=F/(m/1000);
  return {cloze:`A loose ${m} g metal rod rests across two rails in a ${B*1000} mT field,\nat right angles to the field. It carries ${I} A and ${L} cm of it is in the field.\nFind its initial acceleration: ____ m/s²`,answer:h.sig3(a),answerUnit:'m/s²',
   explanation:`F = BIL = ${h.fmt(B)} × ${I} × ${h.fmt(L/100)} = ${h.sig3(F)} N. m = ${h.fmt(m/1000)} kg. a = F/m = ${h.sig3(a)} m/s².`};});

 add('L7-E23','Find the magnetic field strength',(r,h)=>{
  const B=h.pick([0.05,0.1,0.2,0.25,0.4,0.5],r),I=h.pick([2,4,5,10],r),L=h.pick([10,20,25,50],r),F=B*I*L/100;
  return {cloze:`A ${L} cm length of wire carrying ${I} A, at right angles to a field,\nexperiences a force of ${h.sig3(F*1000)} mN.\nFind the strength of the magnetic field: ____ T`,answer:B,answerUnit:'T',
   explanation:`F = ${h.sig3(F)} N, L = ${h.fmt(L/100)} m. F = BIL so B = F/(IL) = ${h.sig3(F)} ÷ (${I} × ${h.fmt(L/100)}) = ${B} T.`};});

 add('L7-E24','Force on a moving charge',(r,h)=>{
  const q=h.pick([2,4,5,10],r),v=h.pick([10,20,40,50,100],r),B=h.pick([0.1,0.2,0.5],r),F=q*v*B;
  return {cloze:`A charged droplet (${q} nC) moves at ${v} m/s\nat right angles to a ${B*1000} mT magnetic field.\nFind the magnetic force on it: ____ nN`,answer:h.sig3(F),answerUnit:'nN',
   explanation:`F = qvB = ${q}×10⁻⁹ × ${v} × ${B} = ${h.sig3(F)}×10⁻⁹ N = ${h.sig3(F)} nN.`};});

 add('L7-E25','Magnetic flux through a coil',(r,h)=>{
  const B=h.pick([0.1,0.2,0.25,0.4,0.5],r),A=h.pick([20,40,50,100,200],r),Phi=B*A/10;  // A cm² → 1e-4 m²; Wb*1e3 = mWb → ×0.1
  return {cloze:`A flat coil of area ${A} cm² faces a magnetic field of ${B*1000} mT\nat right angles to the coil.\nFind the magnetic flux through the coil: ____ mWb`,answer:h.sig3(Phi),answerUnit:'mWb',
   explanation:`A = ${A}×10⁻⁴ m² = ${h.fmt(A/1e4)} m². Φ = BA = ${B} × ${h.fmt(A/1e4)} = ${h.fmt(Phi/1000)} Wb = ${h.sig3(Phi)} mWb.`};});

 add('L7-E26','Induced emf from flux change',(r,h)=>{
  const N=h.pick([1,10,50,100,200,500],r),dPhi=h.pick([2,4,5,10,20],r),dt=h.pick([0.1,0.2,0.5,1,2],r),emf=N*dPhi/1000/dt;
  return {cloze:`A coil has ${N} turns. The magnetic flux through it changes\nby ${dPhi} mWb in ${dt} s as a magnet is pushed in.\nFind the average emf induced in the coil: ____ V`,answer:h.sig3(emf),answerUnit:'V',
   explanation:`ΔΦ = ${h.fmt(dPhi/1000)} Wb. emf = NΔΦ/Δt = ${N} × ${h.fmt(dPhi/1000)} ÷ ${dt} = ${h.sig3(emf)} V.`};});

 add('L7-E27','Induced emf: field switched off',(r,h)=>{
  const N=h.pick([20,50,100,200,500],r),A=h.pick([20,50,100,200],r),B=h.pick([0.1,0.2,0.5],r),ms=h.pick([10,20,50,100],r),dPhi=B*A/1e4,emf=N*dPhi/(ms/1000);
  return {cloze:`A coil of ${N} turns and area ${A} cm² has a ${B*1000} mT field through it\nat right angles. The field falls to zero in ${ms} ms.\nFind the average emf induced: ____ V`,answer:h.sig3(emf),answerUnit:'V',
   explanation:`Φ = BA = ${B} × ${h.fmt(A/1e4)} = ${h.fmt(dPhi)} Wb, so ΔΦ = ${h.fmt(dPhi)} Wb. emf = NΔΦ/Δt = ${N} × ${h.fmt(dPhi)} ÷ ${h.fmt(ms/1000)} = ${h.sig3(emf)} V.`};});

 add('L7-E28','Induced emf: find the time',(r,h)=>{
  const N=h.pick([50,100,200,500],r),dPhi=h.pick([2,4,5,10],r),t=h.pick([0.1,0.2,0.25,0.5],r),emf=N*dPhi/1000/t;
  return {cloze:`A generator coil has ${N} turns. The flux through it changes by ${dPhi} mWb\nand this induces an average emf of ${h.sig3(emf)} V.\nFind the time the change takes: ____ s`,answer:t,answerUnit:'s',
   explanation:`emf = NΔΦ/Δt so Δt = NΔΦ/emf = ${N} × ${h.fmt(dPhi/1000)} ÷ ${h.sig3(emf)} = ${t} s.`};});
})();
