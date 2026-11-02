/* Level 4 (choose the equation) – ELECTROMAGNETISM. Only givens and the unknown are shown.
   Scope = NZQA L2–PHYSR resource sheet for 91173: I=q/t, V=ΔE/q, V=IR, P=IV, P=ΔE/t, series/parallel R,
   E=V/d, F=Eq, ΔEp=Eqd, Ek=½mv², F=BIL, F=Bqv, V=BvL (plus P=I²R, P=V²/R derived from V=IR and P=IV).
   Coulomb's law, flux/induced emf = NΔΦ/Δt and transformers are NOT on the sheet or in the course plan, so they are left out. */
(()=>{
 const {fmt,sig3,pick,int}=Physics12.helpers;
 const A=(id,skill,gen)=>Physics12.add(6,{id,topic:'Electromagnetism',skill,gen});
 // cloze builder: optional label line, "Given:" lines (2 per line), then the unknown line
 const mk=(label,givens,name,unit)=>{
  const parts=givens.map(([s,v,u])=>`${s} = ${v} ${u}`.trim());
  const lines=[];for(let i=0;i<parts.length;i+=2)lines.push((i?'':'Given: ')+parts.slice(i,i+2).join(',   '));
  return (label?label+'\n':'')+lines.join('\n')+`\n${name} = ____ ${unit}`;
 };
 const out=(cloze,ans,unit,explanation,extra={})=>({cloze,answer:sig3(ans),answerUnit:unit,explanation,...extra});
 const clean=x=>Math.abs(x*100-Math.round(x*100))<1e-9;
 const R_LIST=[2,3,4,5,6,8,10,12,15,20,25,30,40,50];
 const V_LIST=[3,6,9,12,24];

 // ---------- charge and current ----------
 A('L6-E01','Charge from current and time',(r)=>{
  const k=pick([0,1],r);
  if(k===0){const I=int(2,9,r),t=pick([5,10,12,20,30,60],r),Q=I*t;
   return out(mk('A wire:',[['I',I,'A'],['t',t,'s']],'Charge Q','C').replace('Charge Q = ____ C','Q = ____ C'),Q,'C',`Q = It = ${I} × ${t} = ${Q} C. Charge, current and time are linked by I = Q/t.`);}
  const I=pick([100,200,250,400,500,800],r),t=pick([10,20,30,40,60],r),Q=I*t/1000;
  return out(mk('A wire:',[['I',I,'mA'],['t',t,'s']],'Q','C'),Q,'C',`I = ${I} mA = ${fmt(I/1000)} A. Q = It = ${fmt(I/1000)} × ${t} = ${fmt(Q)} C. Charge, current and time are linked by Q = It.`);
 });
 A('L6-E02','Current from charge and time',(r)=>{
  const I=pick([0.5,1,1.5,2,2.5,3,4,5,6],r),t=pick([4,8,10,20,30,60],r),Q=I*t;
  return out(mk('',[['Q',fmt(Q),'C'],['t',t,'s']],'Current I','A'),I,'A',`I = Q/t = ${fmt(Q)} ÷ ${t} = ${fmt(I)} A. Current is charge per second.`);
 });
 A('L6-E03','Time from charge and current',(r)=>{
  if(r()<.5){const I=int(2,8,r),t=pick([5,10,15,20,30,60],r),Q=I*t;
   return out(mk('',[['Q',Q,'C'],['I',I,'A']],'Time t','s'),t,'s',`t = Q/I = ${Q} ÷ ${I} = ${t} s. Rearranged from I = Q/t.`);}
  const I=pick([100,200,250,400,500],r),t=pick([10,20,40,60],r),Q=I*t/1000;
  return out(mk('',[['Q',fmt(Q),'C'],['I',I,'mA']],'t','s'),t,'s',`I = ${I} mA = ${fmt(I/1000)} A. t = Q/I = ${fmt(Q)} ÷ ${fmt(I/1000)} = ${t} s. Rearranged from I = Q/t.`);
 });

 // ---------- Ohm's law ----------
 A('L6-E04','Ohm’s law: find V',(r)=>{
  const I=pick([0.5,1,1.5,2,2.5,3,4],r),R=pick(R_LIST.slice(0,10),r),V=I*R;
  return out(mk('A resistor:',[['I',fmt(I),'A'],['R',R,'Ω']],'Potential difference V','V'),V,'V',`V = IR = ${fmt(I)} × ${R} = ${fmt(V)} V. Current and resistance given, voltage wanted: Ohm’s law.`);
 });
 A('L6-E05','Ohm’s law: find R',(r)=>{
  const I=pick([0.5,1,1.5,2,2.5,3,4],r),R=pick(R_LIST.slice(0,10),r),V=I*R;
  return out(mk('A resistor:',[['V',fmt(V),'V'],['I',fmt(I),'A']],'Resistance R','Ω'),R,'Ω',`R = V/I = ${fmt(V)} ÷ ${fmt(I)} = ${R} Ω. Rearranged from V = IR.`);
 });
 A('L6-E06','Ohm’s law: find I (incl. kΩ, mA)',(r)=>{
  if(r()<.5){const I=pick([0.5,1,1.5,2,3,4],r),R=pick(R_LIST.slice(0,10),r),V=I*R;
   return out(mk('A resistor:',[['V',fmt(V),'V'],['R',R,'Ω']],'Current I','A'),I,'A',`I = V/R = ${fmt(V)} ÷ ${R} = ${fmt(I)} A. Rearranged from V = IR.`);}
  const mA=int(1,9,r),kR=pick([1,2,3,4,5],r),V=mA*kR;
  return out(mk('A resistor:',[['V',V,'V'],['R',kR,'kΩ']],'I','mA'),mA,'mA',`R = ${kR} kΩ = ${kR*1000} Ω. I = V/R = ${V} ÷ ${kR*1000} = ${fmt(V/(kR*1000))} A = ${mA} mA. Rearranged from V = IR.`);
 });
 A('L6-E07','Same V and I: R, P, E or Q',(r)=>{
  const V=pick(V_LIST,r),I=pick([0.5,1,1.5,2,3,4],r),t=pick([10,20,30,60],r),R=V/I,P=V*I;
  const k=pick(['R','P','E','Q'],r);
  const g=[['V',V,'V'],['I',fmt(I),'A'],['t',t,'s']];
  if(k==='R')return out(mk('A device:',g,'Resistance R','Ω'),R,'Ω',`R = V/I = ${V} ÷ ${fmt(I)} = ${sig3(R)} Ω. Resistance from voltage and current: V = IR rearranged (t is not needed).`);
  if(k==='P')return out(mk('A device:',g,'Power P','W'),P,'W',`P = VI = ${V} × ${fmt(I)} = ${fmt(P)} W. Power from voltage and current: P = VI (t is not needed).`);
  if(k==='E')return out(mk('A device:',g,'Energy transferred ΔE','J'),P*t,'J',`ΔE = VIt = ${V} × ${fmt(I)} × ${t} = ${fmt(P*t)} J. Energy needs power and time: ΔE = Pt = VIt.`);
  return out(mk('A device:',g,'Charge passed Q','C'),I*t,'C',`Q = It = ${fmt(I)} × ${t} = ${fmt(I*t)} C. Charge needs current and time: Q = It (V is not needed).`);
 });

 // ---------- power ----------
 A('L6-E08','P = VI: find P, I or V',(r)=>{
  const V=pick([3,6,9,12,24,230],r),I=pick([0.5,1,2,2.5,4],r),P=V*I,k=pick(['P','I','V','mA'],r);
  if(k==='P')return out(mk('A lamp:',[['V',V,'V'],['I',fmt(I),'A']],'Power P','W'),P,'W',`P = VI = ${V} × ${fmt(I)} = ${fmt(P)} W. Voltage and current give power: P = VI.`);
  if(k==='I')return out(mk('A lamp:',[['P',fmt(P),'W'],['V',V,'V']],'Current I','A'),I,'A',`I = P/V = ${fmt(P)} ÷ ${V} = ${fmt(I)} A. Rearranged from P = VI.`);
  if(k==='V')return out(mk('A lamp:',[['P',fmt(P),'W'],['I',fmt(I),'A']],'Voltage V','V'),V,'V',`V = P/I = ${fmt(P)} ÷ ${fmt(I)} = ${V} V. Rearranged from P = VI.`);
  const m=pick([250,500,750],r),v=pick([6,12,24],r),p=m*v/1000;
  return out(mk('A lamp:',[['V',v,'V'],['I',m,'mA']],'P','W'),p,'W',`I = ${m} mA = ${fmt(m/1000)} A. P = VI = ${v} × ${fmt(m/1000)} = ${fmt(p)} W.`);
 });
 A('L6-E09','P = I²R: find P',(r)=>{
  const I=int(1,6,r),R=pick(R_LIST.slice(0,9),r),P=I*I*R;
  return out(mk('A heater element:',[['I',I,'A'],['R',R,'Ω']],'Power P','W'),P,'W',`P = I²R = ${I}² × ${R} = ${P} W. Current and resistance given (no V): P = I²R.`);
 });
 A('L6-E10','P = I²R: find I or R',(r)=>{
  const I=int(1,6,r),R=pick(R_LIST.slice(0,9),r),P=I*I*R;
  if(r()<.5)return out(mk('A heater element:',[['P',P,'W'],['R',R,'Ω']],'Current I','A'),I,'A',`P = I²R, so I² = P/R = ${P} ÷ ${R} = ${I*I}, I = ${I} A. Power and resistance given (no V): P = I²R.`);
  return out(mk('A heater element:',[['P',P,'W'],['I',I,'A']],'Resistance R','Ω'),R,'Ω',`P = I²R, so R = P/I² = ${P} ÷ ${I*I} = ${R} Ω. Power and current given (no V): P = I²R.`);
 });
 A('L6-E11','P = V²/R: find P',(r)=>{
  let V,R,P,n=0;do{V=pick([6,12,24,30,60,230],r);R=pick(R_LIST,r);P=V*V/R;n++;}while(!clean(P)&&n<60);
  if(!clean(P)){V=12;R=8;P=18;}
  return out(mk('A resistor:',[['V',V,'V'],['R',R,'Ω']],'Power P','W'),P,'W',`P = V²/R = ${V}² ÷ ${R} = ${fmt(P)} W. Voltage and resistance given (no I): P = V²/R.`);
 });
 A('L6-E12','P = V²/R: find R or V',(r)=>{
  let V,R,P,n=0;do{V=pick([6,12,24,30,60],r);R=pick(R_LIST,r);P=V*V/R;n++;}while(!clean(P)&&n<60);
  if(!clean(P)){V=12;R=8;P=18;}
  if(r()<.5)return out(mk('A resistor:',[['V',V,'V'],['P',fmt(P),'W']],'Resistance R','Ω'),R,'Ω',`P = V²/R, so R = V²/P = ${V}² ÷ ${fmt(P)} = ${R} Ω. Voltage and power given (no I): P = V²/R.`);
  return out(mk('A resistor:',[['P',fmt(P),'W'],['R',R,'Ω']],'Voltage V','V'),V,'V',`P = V²/R, so V² = PR = ${fmt(P)} × ${R} = ${V*V}, V = ${V} V. Power and resistance given (no I): P = V²/R.`);
 });
 A('L6-E13','Which power equation: P from two givens',(r)=>{
  const k=pick(['VI','IR','VR'],r);
  if(k==='VI'){const V=pick([6,12,24],r),I=pick([0.5,1,2,3],r);
   return out(mk('A component:',[['V',V,'V'],['I',fmt(I),'A']],'Power P','W'),V*I,'W',`P = VI = ${V} × ${fmt(I)} = ${fmt(V*I)} W. Both V and I given: P = VI.`);}
  if(k==='IR'){const I=int(1,5,r),R=pick([2,4,5,10,20],r);
   return out(mk('A component:',[['I',I,'A'],['R',R,'Ω']],'Power P','W'),I*I*R,'W',`P = I²R = ${I}² × ${R} = ${I*I*R} W. I and R given: P = I²R.`);}
  const V=pick([6,12,24],r),R=pick([4,6,8,12,16,24],r),P=V*V/R;
  return out(mk('A component:',[['V',V,'V'],['R',R,'Ω']],'Power P','W'),P,'W',`P = V²/R = ${V}² ÷ ${R} = ${sig3(P)} W. V and R given: P = V²/R.`);
 });

 // ---------- energy ----------
 A('L6-E14','Energy from power and time',(r)=>{
  const k=pick(['J','kJ','t'],r);
  if(k==='J'){const P=pick([10,20,40,60,100,500],r),t=pick([10,30,60,120],r);
   return out(mk('A heater:',[['P',P,'W'],['t',t,'s']],'Energy ΔE','J'),P*t,'J',`ΔE = Pt = ${P} × ${t} = ${P*t} J. Power and time give energy: P = ΔE/t.`);}
  if(k==='kJ'){const P=pick([1,2,3],r),m=pick([1,2,5,10],r);
   return out(mk('A heater:',[['P',P,'kW'],['t',m,'min']],'ΔE','kJ'),P*m*60,'kJ',`P = ${P*1000} W, t = ${m*60} s. ΔE = Pt = ${P*1000} × ${m*60} = ${P*m*60000} J = ${P*m*60} kJ.`);}
  const P=pick([20,40,60,100,500],r),t=pick([10,30,60,120],r);
  return out(mk('A heater:',[['ΔE',P*t,'J'],['P',P,'W']],'Time t','s'),t,'s',`t = ΔE/P = ${P*t} ÷ ${P} = ${t} s. Rearranged from P = ΔE/t.`);
 });
 A('L6-E15','Energy from V, I and t',(r)=>{
  const V=pick([3,6,12,24],r),I=pick([0.5,1,2,3],r),t=pick([10,20,30,60],r),E=V*I*t,k=pick(['E','t','V'],r);
  if(k==='E')return out(mk('A circuit:',[['V',V,'V'],['I',fmt(I),'A'],['t',t,'s']],'Energy ΔE','J'),E,'J',`ΔE = VIt = ${V} × ${fmt(I)} × ${t} = ${fmt(E)} J. Voltage, current and time give energy: ΔE = Pt = VIt.`);
  if(k==='t')return out(mk('A circuit:',[['ΔE',fmt(E),'J'],['V',V,'V'],['I',fmt(I),'A']],'t','s'),t,'s',`t = ΔE/(VI) = ${fmt(E)} ÷ (${V} × ${fmt(I)}) = ${t} s. Rearranged from ΔE = VIt.`);
  return out(mk('A circuit:',[['ΔE',fmt(E),'J'],['I',fmt(I),'A'],['t',t,'s']],'Voltage V','V'),V,'V',`V = ΔE/(It) = ${fmt(E)} ÷ (${fmt(I)} × ${t}) = ${V} V. Rearranged from ΔE = VIt.`);
 });
 A('L6-E16','Energy from charge and voltage',(r)=>{
  const k=pick(['E','V','q','u'],r);
  const q=int(2,9,r),V=pick([3,6,12,24,100,230],r);
  if(k==='E')return out(mk('Charge moves through a p.d.:',[['q',q,'C'],['V',V,'V']],'Energy ΔE','J'),q*V,'J',`ΔE = qV = ${q} × ${V} = ${q*V} J. Charge and potential difference give energy: V = ΔE/q.`);
  if(k==='V')return out(mk('Charge moves through a p.d.:',[['ΔE',q*V,'J'],['q',q,'C']],'Potential difference V','V'),V,'V',`V = ΔE/q = ${q*V} ÷ ${q} = ${V} V. This is the definition of potential difference.`);
  if(k==='q')return out(mk('Charge moves through a p.d.:',[['ΔE',q*V,'J'],['V',V,'V']],'Charge q','C'),q,'C',`q = ΔE/V = ${q*V} ÷ ${V} = ${q} C. Rearranged from V = ΔE/q.`);
  return out(mk('Charge moves through a p.d.:',[['q',q,'µC'],['V',V,'V']],'ΔE','µJ'),q*V,'µJ',`ΔE = qV = ${q} µC × ${V} V = ${q*V} µJ. Charge and potential difference give energy: V = ΔE/q.`);
 });

 // ---------- series / parallel ----------
 A('L6-E17','Series resistance',(r)=>{
  const a=pick(R_LIST.slice(0,10),r),b=pick(R_LIST.slice(0,10),r),c=pick([0,0,5,10,20],r);
  const parts=c?[a,b,c]:[a,b],T=parts.reduce((x,y)=>x+y,0);
  if(r()<.6){const g=parts.map((x,i)=>[`R${'₁₂₃'[i]}`,x,'Ω']);
   return out(mk(`${parts.length} resistors in series:`,g,'Total resistance Rₜ','Ω'),T,'Ω',`Rₜ = ${parts.join(' + ')} = ${T} Ω. In series, resistances add.`);}
  return out(mk('Resistors in series:',[['Rₜ',T,'Ω'],...parts.slice(0,-1).map((x,i)=>[`R${'₁₂'[i]}`,x,'Ω'])],`R${'₁₂₃'[parts.length-1]}`,'Ω'),parts[parts.length-1],'Ω',`Rₜ = R₁ + R₂ + … so the missing one = ${T} − ${parts.slice(0,-1).join(' − ')} = ${parts[parts.length-1]} Ω. In series, resistances add.`);
 });
 const PAR=[[6,12,4],[3,6,2],[4,12,3],[10,40,8],[20,30,12],[15,30,10],[12,24,8],[5,20,4],[30,60,20],[8,8,4],[10,10,5],[60,60,30],[6,3,2],[12,4,3],[9,18,6],[2,2,1],[20,5,4]];
 A('L6-E18','Parallel resistance: find Rₜ',(r)=>{
  const [a,b,T]=pick(PAR,r);
  return out(mk('Two resistors in parallel:',[['R₁',a,'Ω'],['R₂',b,'Ω']],'Total resistance Rₜ','Ω'),T,'Ω',`1/Rₜ = 1/${a} + 1/${b}, so Rₜ = ${T} Ω. In parallel, the reciprocals add (Rₜ is smaller than either).`);
 });
 A('L6-E19','Parallel resistance: find a missing resistor',(r)=>{
  const [a,b,T]=pick(PAR,r);
  return out(mk('Two resistors in parallel:',[['Rₜ',T,'Ω'],['R₁',a,'Ω']],'R₂','Ω'),b,'Ω',`1/R₂ = 1/Rₜ − 1/R₁ = 1/${T} − 1/${a}, so R₂ = ${b} Ω. In parallel, 1/Rₜ = 1/R₁ + 1/R₂.`);
 });
 A('L6-E20','Series or parallel total (three resistors)',(r)=>{
  const par=pick([[2,3,6,1],[3,6,6,1.5],[6,6,6,2],[12,12,6,3],[4,4,2,1],[6,12,12,3],[10,10,5,2.5]],r);
  const ser=r()<.5;
  const [a,b,c,P]=par;
  if(ser)return out(mk('Three resistors in series:',[['R₁',a,'Ω'],['R₂',b,'Ω'],['R₃',c,'Ω']],'Rₜ','Ω'),a+b+c,'Ω',`Rₜ = ${a} + ${b} + ${c} = ${a+b+c} Ω. In series, resistances add.`);
  return out(mk('Three resistors in parallel:',[['R₁',a,'Ω'],['R₂',b,'Ω'],['R₃',c,'Ω']],'Rₜ','Ω'),P,'Ω',`1/Rₜ = 1/${a} + 1/${b} + 1/${c}, so Rₜ = ${fmt(P)} Ω. In parallel, the reciprocals add.`);
 });
 A('L6-E21','Series: current and voltage shares',(r)=>{
  const k=pick(['I','V','V2'],r);
  if(k==='I'){const I=pick([0.5,1,1.5,2,3],r),R1=pick([4,6,10],r),R2=pick([8,12,20],r);
   return out(mk('R₁ and R₂ in series:',[['I through R₁',fmt(I),'A'],['R₂',R2,'Ω']],'Current through R₂','A'),I,'A',`Series: the same current flows through every component, so I = ${fmt(I)} A (R₂ is not needed).`);}
  if(k==='V'){const V1=pick([2,4,5,6],r),V2=pick([3,6,7,10],r);
   return out(mk('R₁ and R₂ in series:',[['V across R₁',V1,'V'],['V across R₂',V2,'V']],'Supply voltage V','V'),V1+V2,'V',`Series: voltages add, so V = ${V1} + ${V2} = ${V1+V2} V.`);}
  const V=pick([6,9,12,24],r),V1=pick([2,3,4,5],r);
  return out(mk('R₁ and R₂ in series:',[['Supply',V,'V'],['V across R₁',V1,'V']],'V across R₂','V'),V-V1,'V',`Series: the voltages add to the supply, so V₂ = ${V} − ${V1} = ${V-V1} V.`);
 });
 A('L6-E22','Parallel: branch currents and voltage',(r)=>{
  const k=pick(['tot','branch','V'],r);
  if(k==='tot'){const a=pick([0.5,1,1.5,2,3],r),b=pick([1,2,2.5,4],r);
   return out(`Two parallel branches:\nBranch currents ${fmt(a)} A and ${fmt(b)} A\nTotal current I = ____ A`,a+b,'A',`Parallel: the branch currents add, so I = ${fmt(a)} + ${fmt(b)} = ${fmt(a+b)} A.`);}
  if(k==='branch'){const T=pick([3,4,5,6],r),a=pick([1,1.5,2],r);
   return out(mk('Two parallel branches:',[['Total current',T,'A'],['Branch 1',fmt(a),'A']],'Branch 2 current','A'),T-a,'A',`Parallel: the branch currents add to the total, so I₂ = ${T} − ${fmt(a)} = ${fmt(T-a)} A.`);}
  const V=pick([6,9,12,24],r),R1=pick([4,6,12],r),R2=pick([8,10,20],r);
  return out(mk('Two resistors in parallel across a supply:',[['Supply',V,'V'],['R₁',R1,'Ω'],['R₂',R2,'Ω']],'V across R₂','V'),V,'V',`Parallel: every branch has the same voltage as the supply, so V = ${V} V (the resistances are not needed).`);
 });
 A('L6-E23','Whole-circuit current: series or parallel',(r)=>{
  const V=pick([6,12,24],r);
  if(r()<.5){const R1=pick([2,4,6],r),R2=pick([6,8,12],r),T=R1+R2;
   if(!clean(V/T))return out(mk('R₁ and R₂ in series:',[['Supply',12,'V'],['R₁',4,'Ω'],['R₂',2,'Ω']],'Current I','A'),2,'A','Rₜ = 4 + 2 = 6 Ω. I = V/Rₜ = 12 ÷ 6 = 2 A. In series, resistances add first.');
   return out(mk('R₁ and R₂ in series:',[['Supply',V,'V'],['R₁',R1,'Ω'],['R₂',R2,'Ω']],'Current I','A'),V/T,'A',`Rₜ = ${R1} + ${R2} = ${T} Ω. I = V/Rₜ = ${V} ÷ ${T} = ${sig3(V/T)} A. In series, resistances add first.`);}
  const [a,b,T]=pick(PAR.filter(p=>p[2]<=12),r),I=V/T;
  return out(mk('R₁ and R₂ in parallel:',[['Supply',V,'V'],['R₁',a,'Ω'],['R₂',b,'Ω']],'Total current I','A'),I,'A',`1/Rₜ = 1/${a} + 1/${b}, so Rₜ = ${T} Ω. I = V/Rₜ = ${V} ÷ ${T} = ${sig3(I)} A. In parallel, reciprocals add first.`);
 });

 // ---------- electric fields ----------
 A('L6-E24','E = V/d',(r)=>{
  const k=pick(['E','V','d','cm'],r);
  const d=pick([0.01,0.02,0.05,0.1,0.2,0.5],r),E=pick([100,200,500,1000,2000,5000],r),V=E*d;
  const cm=d*100;
  if(k==='E')return out(mk('Parallel plates:',[['V',fmt(V),'V'],['d',fmt(d),'m']],'Field strength E','V/m',),E,'V/m',`E = V/d = ${fmt(V)} ÷ ${fmt(d)} = ${E} V/m. Plate voltage and separation give field strength.`,{unitAliases:['N/C']});
  if(k==='V')return out(mk('Parallel plates:',[['E',E,'V/m'],['d',fmt(d),'m']],'Potential difference V','V'),V,'V',`V = Ed = ${E} × ${fmt(d)} = ${fmt(V)} V. Rearranged from E = V/d.`);
  if(k==='d')return out(mk('Parallel plates:',[['V',fmt(V),'V'],['E',E,'V/m']],'Separation d','m'),d,'m',`d = V/E = ${fmt(V)} ÷ ${E} = ${fmt(d)} m. Rearranged from E = V/d.`);
  return out(mk('Parallel plates:',[['V',fmt(V),'V'],['d',fmt(cm),'cm']],'E','V/m'),E,'V/m',`d = ${fmt(cm)} cm = ${fmt(d)} m. E = V/d = ${fmt(V)} ÷ ${fmt(d)} = ${E} V/m.`,{unitAliases:['N/C']});
 });
 A('L6-E25','F = Eq',(r)=>{
  const k=pick(['F','E','q','F2'],r);
  const E=pick([100,200,500,1000,2000],r),q=pick([1,2,3,4,5],r),F=E*q*1e-6; // N, q in µC
  if(k==='F')return out(mk('A charge in an electric field:',[['E',E,'N/C'],['q',q,'µC']],'Force F','mN'),F*1000,'mN',`q = ${q} µC = ${q}×10⁻⁶ C. F = Eq = ${E} × ${q}×10⁻⁶ = ${fmt(F)} N = ${fmt(F*1000)} mN.`);
  if(k==='E')return out(mk('A charge in an electric field:',[['F',fmt(F*1000),'mN'],['q',q,'µC']],'Field strength E','N/C'),E,'N/C',`F = ${fmt(F)} N, q = ${q}×10⁻⁶ C. E = F/q = ${fmt(F)} ÷ (${q}×10⁻⁶) = ${E} N/C.`,{unitAliases:['V/m']});
  if(k==='q')return out(mk('A charge in an electric field:',[['F',fmt(F*1000),'mN'],['E',E,'N/C']],'Charge q','µC'),q,'µC',`F = ${fmt(F)} N. q = F/E = ${fmt(F)} ÷ ${E} = ${q}×10⁻⁶ C = ${q} µC.`);
  const F2=pick([0.2,0.5,1,2,4],r),E2=pick([10,20,50,100,200],r);
  return out(mk('A charge in an electric field:',[['F',fmt(F2),'N'],['E',E2,'N/C']],'q','C'),F2/E2,'C',`q = F/E = ${fmt(F2)} ÷ ${E2} = ${fmt(F2/E2)} C. Rearranged from F = Eq.`);
 });
 A('L6-E26','Field strength: V/d or F/q?',(r)=>{
  const E=pick([100,200,500,1000,2000],r);
  if(r()<.5){const d=pick([0.01,0.02,0.05,0.1],r);
   return out(mk('Parallel plates:',[['V',fmt(E*d),'V'],['d',fmt(d*100),'cm']],'Field strength E','N/C'),E,'N/C',`d = ${fmt(d*100)} cm = ${fmt(d)} m. E = V/d = ${fmt(E*d)} ÷ ${fmt(d)} = ${E} N/C. Voltage and separation given: E = V/d.`,{unitAliases:['V/m']});}
  const q=pick([2,4,5],r);
  return out(mk('A test charge:',[['F',fmt(E*q*1e-6*1000),'mN'],['q',q,'µC']],'Field strength E','N/C'),E,'N/C',`E = F/q = ${fmt(E*q*1e-6)} ÷ ${q}×10⁻⁶ = ${E} N/C. Force and charge given: E = F/q.`,{unitAliases:['V/m']});
 });
 A('L6-E27','ΔEp = Eqd',(r)=>{
  const E=pick([100,200,500,1000],r),q=pick([1,2,4,5],r),d=pick([0.01,0.02,0.05,0.1],r),W=E*q*1e-6*d,k=pick(['W','d','mJ'],r);
  if(k==='W')return out(mk('A charge moves in a uniform field:',[['E',E,'N/C'],['q',q,'µC'],['d',fmt(d*100),'cm']],'Energy change ΔEp','µJ'),W*1e6,'µJ',`ΔEp = Eqd = ${E} × ${q}×10⁻⁶ × ${fmt(d)} = ${fmt(W)} J = ${fmt(W*1e6)} µJ.`);
  if(k==='d')return out(mk('A charge moves in a uniform field:',[['ΔEp',fmt(W*1e6),'µJ'],['E',E,'N/C'],['q',q,'µC']],'Distance d','cm'),d*100,'cm',`d = ΔEp/(Eq) = ${fmt(W)} ÷ (${E} × ${q}×10⁻⁶) = ${fmt(d)} m = ${fmt(d*100)} cm.`);
  const E2=pick([10,50,100,500],r),q2=pick([2,3,5],r),d2=pick([2,4,5],r);
  return out(mk('A charge moves in a uniform field:',[['E',E2,'N/C'],['q',q2,'C'],['d',d2,'m']],'ΔEp','J'),E2*q2*d2,'J',`ΔEp = Eqd = ${E2} × ${q2} × ${d2} = ${E2*q2*d2} J. Field, charge and distance given: ΔEp = Eqd.`);
 });
 A('L6-E28','Ek = ½mv²',(r)=>{
  const k=pick(['E','v','m'],r);
  const m=pick([2,4,10,20,50],r),v=pick([2,3,4,5,10],r),E=0.5*(m/1000)*v*v;
  if(k==='E')return out(mk('A moving particle:',[['m',m,'g'],['v',v,'m/s']],'Kinetic energy Ek','J'),E,'J',`m = ${fmt(m/1000)} kg. Ek = ½mv² = ½ × ${fmt(m/1000)} × ${v}² = ${fmt(E)} J.`);
  if(k==='v')return out(mk('A moving particle:',[['Ek',fmt(E),'J'],['m',m,'g']],'Speed v','m/s'),v,'m/s',`m = ${fmt(m/1000)} kg. v² = 2Ek/m = 2 × ${fmt(E)} ÷ ${fmt(m/1000)} = ${v*v}, v = ${v} m/s. Rearranged from Ek = ½mv².`);
  return out(mk('A moving particle:',[['Ek',fmt(E),'J'],['v',v,'m/s']],'Mass m','g'),m,'g',`m = 2Ek/v² = 2 × ${fmt(E)} ÷ ${v*v} = ${fmt(m/1000)} kg = ${m} g. Rearranged from Ek = ½mv².`);
 });

 // ---------- magnetic force and motional emf ----------
 A('L6-E29','F = BIL: find F',(r)=>{
  const B=pick([0.1,0.2,0.5,1.5],r),I=pick([2,4,5,10],r),L=pick([0.1,0.2,0.5,1],r),F=B*I*L;
  return out(mk('A wire in a magnetic field:',[['B',fmt(B),'T'],['I',I,'A'],['L',fmt(L*100),'cm']],'Force F','N'),F,'N',`L = ${fmt(L*100)} cm = ${fmt(L)} m. F = BIL = ${fmt(B)} × ${I} × ${fmt(L)} = ${fmt(F)} N. Current-carrying wire: F = BIL.`);
 });
 A('L6-E30','F = BIL: find B, I or L',(r)=>{
  const B=pick([0.1,0.2,0.5,1.5],r),I=pick([2,4,5,10],r),L=pick([0.1,0.2,0.5,1],r),F=B*I*L,k=pick(['B','I','L'],r);
  if(k==='B')return out(mk('A wire in a magnetic field:',[['F',fmt(F),'N'],['I',I,'A'],['L',fmt(L),'m']],'Field strength B','T'),B,'T',`B = F/(IL) = ${fmt(F)} ÷ (${I} × ${fmt(L)}) = ${fmt(B)} T. Rearranged from F = BIL.`);
  if(k==='I')return out(mk('A wire in a magnetic field:',[['F',fmt(F),'N'],['B',fmt(B),'T'],['L',fmt(L),'m']],'Current I','A'),I,'A',`I = F/(BL) = ${fmt(F)} ÷ (${fmt(B)} × ${fmt(L)}) = ${I} A. Rearranged from F = BIL.`);
  return out(mk('A wire in a magnetic field:',[['F',fmt(F),'N'],['B',fmt(B),'T'],['I',I,'A']],'Length in field L','cm'),L*100,'cm',`L = F/(BI) = ${fmt(F)} ÷ (${fmt(B)} × ${I}) = ${fmt(L)} m = ${fmt(L*100)} cm. Rearranged from F = BIL.`);
 });
 A('L6-E31','F = Bqv: moving charge',(r)=>{
  const k=pick(['F','e','v','B'],r);
  const B=pick([0.1,0.2,0.5,1],r),q=pick([1,2,5],r),v=pick([100,200,500,1000],r),F=B*q*1e-6*v;
  if(k==='F')return out(mk('A charge moving in a magnetic field:',[['B',fmt(B),'T'],['q',q,'µC'],['v',v,'m/s']],'Force F','mN'),F*1000,'mN',`F = Bqv = ${fmt(B)} × ${q}×10⁻⁶ × ${v} = ${fmt(F)} N = ${fmt(F*1000)} mN. A single moving charge: F = Bqv.`);
  if(k==='e'){const ve=pick([1,2,2.5,4,5],r),Be=pick([0.1,0.2,0.5,1],r),Fe=1.6e-19*ve*1e6*Be;
   return out(mk('An electron (q = 1.60×10⁻¹⁹ C):',[['B',fmt(Be),'T'],['v',`${fmt(ve)}×10⁶`,'m/s']],'F','N'),Fe,'N',`F = Bqv = ${fmt(Be)} × 1.60×10⁻¹⁹ × ${fmt(ve)}×10⁶ = ${sig3(Fe).replace(/e(-?\d+)/,(m,x)=>'×10'+String(x).replace('-','⁻').replace(/\d/g,c=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[c]))} N.`);}
  if(k==='v')return out(mk('A charge moving in a magnetic field:',[['F',fmt(F*1000),'mN'],['B',fmt(B),'T'],['q',q,'µC']],'Speed v','m/s'),v,'m/s',`v = F/(Bq) = ${fmt(F)} ÷ (${fmt(B)} × ${q}×10⁻⁶) = ${v} m/s. Rearranged from F = Bqv.`);
  return out(mk('A charge moving in a magnetic field:',[['F',fmt(F*1000),'mN'],['q',q,'µC'],['v',v,'m/s']],'Field strength B','T'),B,'T',`B = F/(qv) = ${fmt(F)} ÷ (${q}×10⁻⁶ × ${v}) = ${fmt(B)} T. Rearranged from F = Bqv.`);
 });
 A('L6-E32','Magnetic force: wire or single charge?',(r)=>{
  if(r()<.5){const B=pick([0.2,0.5,1],r),I=pick([2,5,10],r),L=pick([0.2,0.5,1],r);
   return out(mk('',[['B',fmt(B),'T'],['I',I,'A'],['L',fmt(L),'m']],'Force F','N'),B*I*L,'N',`F = BIL = ${fmt(B)} × ${I} × ${fmt(L)} = ${fmt(B*I*L)} N. A current and a length of wire are given: F = BIL.`);}
  const B=pick([0.2,0.5,1],r),q=pick([2,4,5],r),v=pick([100,200,500],r),F=B*q*1e-6*v;
  return out(mk('',[['B',fmt(B),'T'],['q',q,'µC'],['v',v,'m/s']],'Force F','mN'),F*1000,'mN',`F = Bqv = ${fmt(B)} × ${q}×10⁻⁶ × ${v} = ${fmt(F)} N = ${fmt(F*1000)} mN. A charge and a speed are given: F = Bqv.`);
 });
 A('L6-E33','V = BvL: emf in a moving conductor',(r)=>{
  const B=pick([0.1,0.2,0.5,1],r),v=pick([2,4,5,10],r),L=pick([0.2,0.5,1,2],r),V=B*v*L,k=pick(['V','v','B'],r);
  if(k==='V')return out(mk('A rod moves across a magnetic field:',[['B',fmt(B),'T'],['v',v,'m/s'],['L',fmt(L),'m']],'Induced voltage V','V'),V,'V',`V = BvL = ${fmt(B)} × ${v} × ${fmt(L)} = ${fmt(V)} V. Induced voltage across a moving conductor: V = BvL.`);
  if(k==='v')return out(mk('A rod moves across a magnetic field:',[['V',fmt(V),'V'],['B',fmt(B),'T'],['L',fmt(L),'m']],'Speed v','m/s'),v,'m/s',`v = V/(BL) = ${fmt(V)} ÷ (${fmt(B)} × ${fmt(L)}) = ${v} m/s. Rearranged from V = BvL.`);
  return out(mk('A rod moves across a magnetic field:',[['V',fmt(V),'V'],['v',v,'m/s'],['L',fmt(L),'m']],'Field strength B','T'),B,'T',`B = V/(vL) = ${fmt(V)} ÷ (${v} × ${fmt(L)}) = ${fmt(B)} T. Rearranged from V = BvL.`);
 });
})();
