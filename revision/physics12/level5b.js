/* Level 3 (equation given), ELECTROMAGNETISM. Equations follow the NZQA L2-PHYSR sheet (91173) plus the
   course's induction work (flux, Faraday's law: L5-E45 to L5-E47 go beyond the sheet). Charge is q, energy ΔE, as on the sheet. */
(()=>{
 const T='Electromagnetism';
 const add=(n,skill,gen)=>Physics12.add(5,{id:'L5-E'+String(n).padStart(2,'0'),topic:T,skill,gen});
 const mk=(lines,ans,unit,ex)=>({cloze:lines.join('\n'),answer:ans,answerUnit:unit,explanation:ex});
 const Is=[0.5,1,1.5,2,2.5,3,4,5];

 // ---- I = q/t ----
 add(1,'Current and charge',(r,h)=>{const I=h.pick(Is,r),t=h.int(2,40,r),q=h.fmt(I*t);
  return mk(['I = q/t',`I = ${I} A    t = ${t} s`,'q = ____ C'],q,'C',`q = It = ${I} × ${t} = ${q} C.`);});
 add(2,'Current and charge',(r,h)=>{const I=h.pick(Is,r),t=h.int(2,40,r),q=h.fmt(I*t);
  return mk(['I = q/t',`I = ${I} A    q = ${q} C`,'t = ____ s'],t,'s',`t = q/I = ${q} ÷ ${I} = ${t} s.`);});
 add(3,'Current and charge',(r,h)=>{const I=h.pick(Is,r),t=h.int(2,30,r),q=h.fmt(I*t);
  return mk(['I = q/t',`q = ${q} C    t = ${t} s`,'I = ____ A'],I,'A',`I = q/t = ${q} ÷ ${t} = ${I} A.`);});
 add(4,'Current in mA to charge',(r,h)=>{const mA=h.pick([50,100,200,250,400,500,750],r),t=h.int(2,60,r),q=h.fmt(mA/1000*t);
  return mk(['I = q/t',`I = ${mA} mA    t = ${t} s`,'q = ____ C'],q,'C',`I = ${mA} mA = ${h.fmt(mA/1000)} A. q = It = ${h.fmt(mA/1000)} × ${t} = ${q} C.`);});
 add(5,'Current and charge, time in minutes',(r,h)=>{const I=h.pick([0.5,1,2,2.5,3],r),m=h.int(1,10,r),q=h.fmt(I*m*60);
  return mk(['I = q/t',`I = ${I} A    t = ${m} min`,'q = ____ C'],q,'C',`t = ${m} × 60 = ${m*60} s. q = It = ${I} × ${m*60} = ${q} C.`);});
 add(6,'Time from charge and a current in mA',(r,h)=>{const mA=h.pick([100,200,250,400,500],r),t=h.int(5,60,r),q=h.fmt(mA/1000*t);
  return mk(['I = q/t',`q = ${q} C    I = ${mA} mA`,'t = ____ s'],t,'s',`I = ${h.fmt(mA/1000)} A. t = q/I = ${q} ÷ ${h.fmt(mA/1000)} = ${t} s.`);});

 // ---- V = IR ----
 add(7,'Ohm’s law',(r,h)=>{const I=h.pick(Is,r),R=h.int(4,Math.min(60,Math.floor(240/I)),r),V=h.fmt(I*R);
  return mk(['V = IR',`I = ${I} A    R = ${R} Ω`,'V = ____ V'],V,'V',`V = IR = ${I} × ${R} = ${V} V.`);});
 add(8,'Ohm’s law',(r,h)=>{const I=h.pick(Is,r),R=h.int(4,40,r),V=h.fmt(I*R);
  return mk(['V = IR',`V = ${V} V    R = ${R} Ω`,'I = ____ A'],I,'A',`I = V/R = ${V} ÷ ${R} = ${I} A.`);});
 add(9,'Ohm’s law',(r,h)=>{const I=h.pick(Is,r),R=h.int(4,Math.min(60,Math.floor(240/I)),r),V=h.fmt(I*R);
  return mk(['V = IR',`V = ${V} V    I = ${I} A`,'R = ____ Ω'],R,'Ω',`R = V/I = ${V} ÷ ${I} = ${R} Ω.`);});
 add(10,'Ohm’s law with kΩ and mA',(r,h)=>{const k=h.pick([1,2,3,4,5,10],r),mA=h.int(1,9,r),V=k*mA;
  return r()<.5?mk(['V = IR',`V = ${V} V    R = ${k} kΩ`,'I = ____ mA'],mA,'mA',`R = ${k*1000} Ω. I = V/R = ${V} ÷ ${k*1000} = ${h.fmt(mA/1000)} A = ${mA} mA.`)
   :mk(['V = IR',`I = ${mA} mA    R = ${k} kΩ`,'V = ____ V'],V,'V',`I = ${h.fmt(mA/1000)} A, R = ${k*1000} Ω. V = IR = ${h.fmt(mA/1000)} × ${k*1000} = ${V} V.`);});

 // ---- P = IV ----
 add(11,'Electrical power',(r,h)=>{const I=h.pick(Is,r),V=h.pick([6,9,12,24,120,230],r),P=h.fmt(I*V);
  return mk(['P = IV',`I = ${I} A    V = ${V} V`,'P = ____ W'],P,'W',`P = IV = ${I} × ${V} = ${P} W.`);});
 add(12,'Electrical power',(r,h)=>{const I=h.pick(Is,r),V=h.pick([6,9,12,24,120,230],r),P=h.fmt(I*V);
  return mk(['P = IV',`P = ${P} W    V = ${V} V`,'I = ____ A'],I,'A',`I = P/V = ${P} ÷ ${V} = ${I} A.`);});
 add(13,'Electrical power',(r,h)=>{const I=h.pick(Is,r),V=h.pick([6,9,12,24,120,230],r),P=h.fmt(I*V);
  return mk(['P = IV',`P = ${P} W    I = ${I} A`,'V = ____ V'],V,'V',`V = P/I = ${P} ÷ ${I} = ${V} V.`);});

 // ---- P = ΔE/t ----
 add(14,'Power and energy',(r,h)=>{const P=h.pick([5,10,20,40,60,100,150,500],r),t=h.int(2,60,r),E=P*t;
  return mk(['P = ΔE/t',`P = ${P} W    t = ${t} s`,'ΔE = ____ J'],E,'J',`ΔE = Pt = ${P} × ${t} = ${E} J.`);});
 add(15,'Power and energy',(r,h)=>{const P=h.pick([5,10,20,40,60,100,150,500],r),t=h.int(2,60,r),E=P*t;
  return mk(['P = ΔE/t',`P = ${P} W    ΔE = ${E} J`,'t = ____ s'],t,'s',`t = ΔE/P = ${E} ÷ ${P} = ${t} s.`);});
 add(16,'Power with energy in kJ',(r,h)=>{const P=h.pick([100,200,250,400,500,800],r),t=h.int(10,60,r),kJ=P*t/1000;
  return mk(['P = ΔE/t',`ΔE = ${h.fmt(kJ)} kJ    t = ${t} s`,'P = ____ W'],P,'W',`ΔE = ${h.fmt(kJ*1000)} J. P = ΔE/t = ${h.fmt(kJ*1000)} ÷ ${t} = ${P} W.`);});
 add(17,'Power and energy in a circuit',(r,h)=>{const P=h.pick([6,12,24,60,100],r),min=h.int(1,10,r),E=P*min*60;
  return mk(['P = ΔE/t',`P = ${P} W    t = ${min} min`,'ΔE = ____ J'],E,'J',`t = ${min*60} s. ΔE = Pt = ${P} × ${min*60} = ${E} J.`);});

 // ---- V = ΔE/q ----
 add(18,'Potential difference',(r,h)=>{const q=h.int(2,20,r),V=h.pick([1.5,3,6,9,12,24],r),E=h.fmt(q*V);
  return mk(['V = ΔE/q',`ΔE = ${E} J    q = ${q} C`,'V = ____ V'],V,'V',`V = ΔE/q = ${E} ÷ ${q} = ${V} V.`);});
 add(19,'Potential difference',(r,h)=>{const q=h.int(2,20,r),V=h.pick([1.5,3,6,9,12,24],r),E=h.fmt(q*V);
  return mk(['V = ΔE/q',`V = ${V} V    q = ${q} C`,'ΔE = ____ J'],E,'J',`ΔE = Vq = ${V} × ${q} = ${E} J.`);});
 add(20,'Potential difference',(r,h)=>{const q=h.int(2,20,r),V=h.pick([1.5,3,6,9,12,24],r),E=h.fmt(q*V);
  return mk(['V = ΔE/q',`V = ${V} V    ΔE = ${E} J`,'q = ____ C'],q,'C',`q = ΔE/V = ${E} ÷ ${V} = ${q} C.`);});

 // ---- resistors ----
 add(21,'Resistors in series',(r,h)=>{const n=h.int(2,3,r),Rs=Array.from({length:n},()=>h.int(2,30,r)),RT=Rs.reduce((a,b)=>a+b,0);
  return mk(['RT = R₁ + R₂ + …',Rs.map((x,i)=>`R${'₁₂₃'[i]} = ${x} Ω`).join('    '),'RT = ____ Ω'],RT,'Ω',`RT = ${Rs.join(' + ')} = ${RT} Ω.`);});
 add(22,'Resistors in series (missing resistor)',(r,h)=>{const a=h.int(2,30,r),b=h.int(2,30,r),c=h.int(2,30,r),RT=a+b+c;
  return mk(['RT = R₁ + R₂ + R₃',`RT = ${RT} Ω    R₁ = ${a} Ω    R₂ = ${b} Ω`,'R₃ = ____ Ω'],c,'Ω',`R₃ = RT − R₁ − R₂ = ${RT} − ${a} − ${b} = ${c} Ω.`);});
 const PAIRS=[[6,3,2],[12,4,3],[6,6,3],[10,10,5],[20,5,4],[30,20,12],[12,12,6],[8,8,4],[15,10,6],[60,20,15],[4,4,2],[9,18,6]];
 add(23,'Resistors in parallel',(r,h)=>{const [a,b,T]=h.pick(PAIRS,r);
  return mk(['1/RT = 1/R₁ + 1/R₂',`R₁ = ${a} Ω    R₂ = ${b} Ω`,'RT = ____ Ω'],T,'Ω',`1/RT = 1/${a} + 1/${b} = ${h.fmt(1/T)}, so RT = ${T} Ω.`);});
 add(24,'Resistors in parallel (three)',(r,h)=>{const [a,b,c,T]=h.pick([[6,6,6,2],[4,4,2,1],[12,6,4,2],[3,6,2,1],[10,10,5,2.5],[8,8,4,2],[9,9,9,3],[20,20,10,5]],r);
  return mk(['1/RT = 1/R₁ + 1/R₂ + 1/R₃',`R₁ = ${a} Ω    R₂ = ${b} Ω    R₃ = ${c} Ω`,'RT = ____ Ω'],T,'Ω',`1/RT = 1/${a} + 1/${b} + 1/${c} = ${h.fmt(1/T)}, so RT = ${T} Ω.`);});
 add(25,'Resistors in parallel (missing resistor)',(r,h)=>{let [a,b,T]=h.pick(PAIRS,r);if(r()<.5)[a,b]=[b,a];
  return mk(['1/RT = 1/R₁ + 1/R₂',`RT = ${T} Ω    R₁ = ${a} Ω`,'R₂ = ____ Ω'],b,'Ω',`1/R₂ = 1/RT − 1/R₁ = 1/${T} − 1/${a}, so R₂ = ${b} Ω.`);});
 add(26,'Series and parallel combined',(r,h)=>{const [a,b,T]=h.pick(PAIRS.filter(p=>p[2]>=2),r),s=h.int(2,12,r);
  return mk(['R₁ is in series with R₂ and R₃ (R₂ and R₃ in parallel).',`R₁ = ${s} Ω    R₂ = ${a} Ω    R₃ = ${b} Ω`,'RT = ____ Ω'],s+T,'Ω',`R₂ and R₃ in parallel: ${T} Ω. RT = ${s} + ${T} = ${s+T} Ω.`);});

 // ---- electric field ----
 add(27,'Field between plates, E = V/d',(r,h)=>{const d=h.pick([0.01,0.02,0.04,0.05,0.1,0.2],r),V=h.pick([20,40,100,200,400,1000],r),E=h.fmt(V/d);
  return mk(['E = V/d',`V = ${V} V    d = ${d} m`,'E = ____ V/m'],E,'V/m',`E = V/d = ${V} ÷ ${d} = ${E} V/m.`);});
 add(28,'Plate separation from field',(r,h)=>{const d=h.pick([0.01,0.02,0.04,0.05,0.1,0.2],r),E=h.pick([500,1000,2000,5000,10000],r),V=h.fmt(E*d);
  return mk(['E = V/d',`E = ${E} V/m    V = ${V} V`,'d = ____ m'],d,'m',`d = V/E = ${V} ÷ ${E} = ${d} m.`);});
 add(29,'Voltage across plates (cm)',(r,h)=>{const cm=h.pick([1,2,4,5,8,10],r),E=h.pick([500,1000,2000,5000],r),V=h.fmt(E*cm/100);
  return mk(['E = V/d',`E = ${E} V/m    d = ${cm} cm`,'V = ____ V'],V,'V',`d = ${h.fmt(cm/100)} m. V = Ed = ${E} × ${h.fmt(cm/100)} = ${V} V.`);});
 add(30,'Force on a charge in a field',(r,h)=>{const E=h.pick([100,200,500,1000,2000,5000],r),q=h.pick([1,2,3,4,5,10],r),F=h.fmt(E*q*1e-6);
  return mk(['F = Eq',`E = ${E} N/C    q = ${q} µC`,'F = ____ N'],F,'N',`q = ${q} × 10⁻⁶ C. F = Eq = ${E} × ${q} × 10⁻⁶ = ${F} N.`);});
 add(31,'Charge from force and field',(r,h)=>{const E=h.pick([100,200,500,1000,2000,5000],r),q=h.pick([1,2,3,4,5,10],r),F=h.fmt(E*q*1e-6);
  return mk(['F = Eq',`F = ${F} N    E = ${E} N/C`,'q = ____ µC'],q,'µC',`q = F/E = ${F} ÷ ${E} = ${q} × 10⁻⁶ C = ${q} µC.`);});
 add(32,'Energy gained by a charge in a field',(r,h)=>{const E=h.pick([1000,2000,5000,10000],r),q=h.pick([1,2,3,5],r),d=h.pick([0.01,0.02,0.05,0.1],r),W=h.fmt(E*q*1e-6*d);
  return mk(['ΔEp = Eqd',`E = ${E} V/m    q = ${q} µC    d = ${d} m`,'ΔEp = ____ J'],W,'J',`ΔEp = Eqd = ${E} × ${q} × 10⁻⁶ × ${d} = ${W} J.`);});
 add(33,'Distance moved in a field',(r,h)=>{const E=h.pick([1000,2000,5000,10000],r),q=h.pick([1,2,3,5],r),d=h.pick([0.01,0.02,0.05,0.1],r),W=h.fmt(E*q*1e-6*d);
  return mk(['ΔEp = Eqd',`ΔEp = ${W} J    E = ${E} V/m    q = ${q} µC`,'d = ____ m'],d,'m',`d = ΔEp/(Eq) = ${W} ÷ (${E} × ${q} × 10⁻⁶) = ${d} m.`);});
 add(34,'Kinetic energy of a charged speck',(r,h)=>{const m=h.pick([2,4,5,10],r),v=h.pick([10,20,30,50],r),Ek=h.fmt(0.5*m*1e-6*v*v);
  return mk(['Ek = ½mv²',`m = ${m} mg    v = ${v} m/s`,'Ek = ____ J'],Ek,'J',`m = ${m} × 10⁻⁶ kg. Ek = ½mv² = ½ × ${m} × 10⁻⁶ × ${v}² = ${Ek} J.`);});

 // ---- magnetic force ----
 const Bs=[0.05,0.1,0.2,0.25,0.4,0.5,0.8];
 add(35,'Force on a current-carrying wire',(r,h)=>{const B=h.pick(Bs,r),I=h.int(2,10,r),L=h.pick([0.1,0.2,0.25,0.4,0.5,0.8,1],r),F=h.fmt(B*I*L);
  return mk(['F = BIL',`B = ${B} T    I = ${I} A    L = ${L} m`,'F = ____ N'],F,'N',`F = BIL = ${B} × ${I} × ${L} = ${F} N.`);});
 add(36,'Field strength from force on a wire',(r,h)=>{const B=h.pick(Bs,r),I=h.int(2,10,r),L=h.pick([0.1,0.2,0.25,0.4,0.5,0.8,1],r),F=h.fmt(B*I*L);
  return mk(['F = BIL',`F = ${F} N    I = ${I} A    L = ${L} m`,'B = ____ T'],B,'T',`B = F/(IL) = ${F} ÷ (${I} × ${L}) = ${B} T.`);});
 add(37,'Current from force on a wire',(r,h)=>{const B=h.pick(Bs,r),I=h.int(2,10,r),L=h.pick([0.1,0.2,0.25,0.4,0.5,0.8,1],r),F=h.fmt(B*I*L);
  return mk(['F = BIL',`F = ${F} N    B = ${B} T    L = ${L} m`,'I = ____ A'],I,'A',`I = F/(BL) = ${F} ÷ (${B} × ${L}) = ${I} A.`);});
 add(38,'Length of wire in a field (cm)',(r,h)=>{const B=h.pick(Bs,r),I=h.int(2,10,r),cm=h.pick([5,10,20,25,40,50],r),F=h.fmt(B*I*cm/100);
  return mk(['F = BIL',`F = ${F} N    B = ${B} T    I = ${I} A`,'L = ____ cm'],cm,'cm',`L = F/(BI) = ${F} ÷ (${B} × ${I}) = ${h.fmt(cm/100)} m = ${cm} cm.`);});
 add(39,'Force on a moving charge',(r,h)=>{const B=h.pick(Bs,r),q=h.int(1,10,r),v=h.pick([100,200,500,1000,2000],r),F=h.fmt(B*q*v);
  return mk(['F = Bqv',`B = ${B} T    q = ${q} µC    v = ${v} m/s`,'F = ____ µN'],F,'µN',`F = Bqv = ${B} × ${q} × 10⁻⁶ × ${v} = ${F} × 10⁻⁶ N = ${F} µN.`);});
 add(40,'Speed from force on a charge',(r,h)=>{const B=h.pick(Bs,r),q=h.int(1,10,r),v=h.pick([100,200,500,1000,2000],r),F=h.fmt(B*q*v);
  return mk(['F = Bqv',`F = ${F} µN    B = ${B} T    q = ${q} µC`,'v = ____ m/s'],v,'m/s',`v = F/(Bq) = ${F} × 10⁻⁶ ÷ (${B} × ${q} × 10⁻⁶) = ${v} m/s.`);});
 add(41,'Field strength from force on a charge',(r,h)=>{const B=h.pick(Bs,r),q=h.int(1,10,r),v=h.pick([100,200,500,1000,2000],r),F=h.fmt(B*q*v);
  return mk(['F = Bqv',`F = ${F} µN    q = ${q} µC    v = ${v} m/s`,'B = ____ T'],B,'T',`B = F/(qv) = ${F} × 10⁻⁶ ÷ (${q} × 10⁻⁶ × ${v}) = ${B} T.`);});

 // ---- induced voltage ----
 add(42,'Induced voltage in a moving rod',(r,h)=>{const B=h.pick(Bs,r),v=h.pick([1,2,4,5,10],r),L=h.pick([0.2,0.25,0.4,0.5,1],r),V=h.fmt(B*v*L);
  return mk(['V = BvL',`B = ${B} T    v = ${v} m/s    L = ${L} m`,'V = ____ V'],V,'V',`V = BvL = ${B} × ${v} × ${L} = ${V} V.`);});
 add(43,'Speed of a rod from induced voltage',(r,h)=>{const B=h.pick(Bs,r),v=h.pick([1,2,4,5,10],r),L=h.pick([0.2,0.25,0.4,0.5,1],r),V=h.fmt(B*v*L);
  return mk(['V = BvL',`V = ${V} V    B = ${B} T    L = ${L} m`,'v = ____ m/s'],v,'m/s',`v = V/(BL) = ${V} ÷ (${B} × ${L}) = ${v} m/s.`);});
 add(44,'Field strength from induced voltage',(r,h)=>{const B=h.pick(Bs,r),v=h.pick([1,2,4,5,10],r),L=h.pick([0.2,0.25,0.4,0.5,1],r),V=h.fmt(B*v*L);
  return mk(['V = BvL',`V = ${V} V    v = ${v} m/s    L = ${L} m`,'B = ____ T'],B,'T',`B = V/(vL) = ${V} ÷ (${v} × ${L}) = ${B} T.`);});
 // beyond the NZQA sheet (course mentions Faraday's law): flux and induced emf
 add(45,'Magnetic flux',(r,h)=>{const B=h.pick(Bs,r),A=h.pick([0.01,0.02,0.05,0.1,0.2,0.5],r),P=h.fmt(B*A);
  return mk(['Φ = BA',`B = ${B} T    A = ${A} m²`,'Φ = ____ Wb'],P,'Wb',`Φ = BA = ${B} × ${A} = ${P} Wb.`);});
 add(46,'Faraday’s law',(r,h)=>{const N=h.pick([1,10,20,50,100,200],r),dP=h.pick([0.02,0.05,0.1,0.2,0.5],r),t=h.pick([0.1,0.2,0.5,2,4],r),e=h.fmt(N*dP/t);
  return mk(['ε = NΔΦ/Δt',`N = ${N}    ΔΦ = ${dP} Wb    Δt = ${t} s`,'ε = ____ V'],e,'V',`ε = NΔΦ/Δt = ${N} × ${dP} ÷ ${t} = ${e} V.`);});
 add(47,'Faraday’s law (turns)',(r,h)=>{const N=h.pick([10,20,50,100,200],r),dP=h.pick([0.02,0.05,0.1,0.2,0.5],r),t=h.pick([0.1,0.2,0.5,2,4],r),e=h.fmt(N*dP/t);
  return mk(['ε = NΔΦ/Δt',`ε = ${e} V    ΔΦ = ${dP} Wb    Δt = ${t} s`,'N = ____'],N,undefined,`N = εΔt/ΔΦ = ${e} × ${t} ÷ ${dP} = ${N}.`);});
})();
