/* Year 12 Physics, units levels (leftovers): equation symbols, compound units and prefix conversions.
   The quantity/unit/prefix recall questions that used to live here are replaced by the table questions in level1–3.js,
   so those skills are skipped. Mechanics → Level 1, electromagnetism → Level 2, conversions → Level 3. */
(()=>{
const P=Physics12;
const SUPERSEDED=new Set(['SI unit symbols','SI unit names','Unit symbol to name','Unit name to symbol','Quantity from a unit','Quantity symbols',
 'Prefix symbol to name','Prefix name to symbol','Prefixed unit name to symbol','Prefix to factor','Prefix to power of ten','Power of ten to prefix',
 'Equivalent compound units','Compound units to a named unit']); // the last two ("1 N = 1 ____") were dropped as too ambiguous
const CONVERSIONS=new Set(['Prefixed unit to base unit','Base unit to prefixed unit','Prefix to prefix','km/h to m/s','m/s to km/h','Time and mass conversions','Time conversions']);
const counters={};
const reg=(topic,skill,gen)=>{
 if(SUPERSEDED.has(skill))return;
 const level=CONVERSIONS.has(skill)?3:topic==='Mechanics'?1:2;
 counters[level]=(counters[level]||0)+1;
 P.add(level,{id:`L${level}-X`+String(counters[level]).padStart(2,'0'),topic,skill,gen});
};
const both=(skill,mk)=>{reg('Mechanics',skill,mk('Mechanics'));reg('Electromagnetism',skill,mk('Electromagnetism'));};
const M='Mechanics',E='Electromagnetism';
const cap=s=>s[0].toUpperCase()+s.slice(1);
const sup=e=>String(e).replace(/-/g,'⁻').replace(/\d/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
const MU='μ'; // Greek small mu (the keyboard/NFKC form of µ)

// ---- unit names ----
const NAMES={N:['newton'],J:['joule'],W:['watt'],Hz:['hertz'],s:['second'],m:['metre','meter'],kg:['kilogram'],g:['gram'],C:['coulomb'],A:['ampere','amp'],V:['volt'],'Ω':['ohm'],T:['tesla']};
const nameAl=sym=>(NAMES[sym]||[]).flatMap(x=>[x,x+'s',cap(x),cap(x)+'s']);

// ---- unit symbol tables: [quantity, symbol, extra symbol aliases] ----
const MS=['m s-1','m s⁻¹','m·s⁻¹'];
const MOM=['kg m s-1','kg m s⁻¹','kg·m/s','kg·m·s⁻¹'];
const ACC=['m s-2','m s⁻²','m/s2','m/s^2','m·s⁻²'];
const UNITS={
 [M]:[['force','N'],['energy','J'],['work','J'],['kinetic energy','J'],['gravitational potential energy','J'],['power','W'],
  ['momentum','kg m/s',[...MOM,'N s','Ns']],['impulse','N s',['Ns','N·s','kg m/s',...MOM]],['torque','N m',['Nm','N·m','N.m']],
  ['frequency','Hz'],['period','s'],['time','s'],['mass','kg'],['distance','m'],['displacement','m'],['velocity','m/s',MS],['speed','m/s',MS],
  ['acceleration','m/s²',ACC],['spring constant','N/m',['N m-1','N m⁻¹','N·m⁻¹']],['gravitational field strength','N/kg',['m/s²','N kg-1','N kg⁻¹',...ACC]]],
 [E]:[['charge','C'],['current','A'],['potential difference','V'],['resistance','Ω'],['electric field strength','N/C',['V/m','N C-1','N C⁻¹','V m-1','V m⁻¹']],
  ['magnetic field strength','T'],['magnetic flux density','T'],['power','W'],['energy','J'],['time','s'],['force','N'],['length','m']]
};
const unitAliases=row=>[...(row[2]||[]),...nameAl(row[1])];

// 1. SI unit symbol for a quantity
both('SI unit symbols',topic=>(r,h)=>{
 const row=h.pick(UNITS[topic],r);
 return {cloze:`The SI unit symbol for ${row[0]} is ____.`,answer:row[1],aliases:unitAliases(row),caseSensitive:true,
  explanation:NAMES[row[1]]?`${cap(row[0])} is measured in ${NAMES[row[1]][0]}s (${row[1]}).`:`${cap(row[0])} is measured in ${row[1]}.`};
});

// 2. SI unit name for a quantity
both('SI unit names',topic=>(r,h)=>{
 const rows=UNITS[topic].filter(x=>NAMES[x[1]]);
 const row=h.pick(rows,r),nm=NAMES[row[1]][0];
 return {cloze:`The SI unit of ${row[0]} is the ____.`,answer:nm,aliases:nameAl(row[1]).filter(a=>a!==nm),
  explanation:`The SI unit of ${row[0]} is the ${nm}, symbol ${row[1]}.`};
});

// 3. unit symbol -> unit name
both('Unit symbol to name',topic=>(r,h)=>{
 const syms=[...new Set(UNITS[topic].map(x=>x[1]).filter(s=>NAMES[s]))];
 const s=h.pick(syms,r),nm=NAMES[s][0];
 return {cloze:`The unit symbol ${s} stands for the ____.`,answer:nm,aliases:nameAl(s).filter(a=>a!==nm),explanation:`${s} is the symbol for the ${nm}.`};
});

// 4. unit name -> unit symbol
both('Unit name to symbol',topic=>(r,h)=>{
 const syms=[...new Set(UNITS[topic].map(x=>x[1]).filter(s=>NAMES[s]))];
 const s=h.pick(syms,r),nm=NAMES[s][0];
 return {cloze:`The symbol for the ${nm} is ____.`,answer:s,aliases:s==='Ω'?['ohm','Ohm']:[],caseSensitive:true,explanation:`The ${nm} is written ${s}.`};
});

// 5. unit -> quantity
const QU={
 [M]:[['N','force'],['J','energy',['work','work done','energy transferred','heat']],['W','power'],['kg m/s','momentum',['impulse']],['N s','impulse',['momentum','change in momentum']],
  ['N m','torque',['moment','moment of a force','turning effect']],['Hz','frequency'],['N/m','spring constant',['force constant','stiffness']],['m/s²','acceleration'],
  ['m/s','velocity',['speed']],['kg','mass'],['N/kg','gravitational field strength',['gravity','field strength','gravitational field','g']],['s','time',['period','time interval','duration']]],
 [E]:[['C','charge'],['A','current'],['V','potential difference',['voltage','pd','PD','p.d.','emf','potential']],['Ω','resistance'],
  ['N/C','electric field strength',['electric field','electric field intensity']],['V/m','electric field strength',['electric field','electric field intensity']],
  ['T','magnetic field strength',['magnetic flux density','magnetic field','flux density','magnetic field density']],['W','power'],['J','energy',['work','work done','energy transferred']]]
};
both('Quantity from a unit',topic=>(r,h)=>{
 const row=h.pick(QU[topic],r);
 return {cloze:`The unit ${row[0]} is used to measure ____.`,answer:row[1],aliases:row[2]||[],
  explanation:`${row[0]} is the unit of ${row[1]}${row[2]&&row[2][0]&&row[0]==='J'?' (or work)':''}.`};
});

// 6. quantity -> symbol
const QS={
 [M]:[['momentum','p'],['torque','τ',['tau']],['frequency','f'],['period','T'],['force','F'],['mass','m'],['acceleration','a'],['time','t'],['spring constant','k'],
  ['power','P'],['work','W'],['kinetic energy','Eₖ',['Ek','E_k','KE']],['gravitational potential energy','Eₚ',['Ep','E_p','PE','GPE']],['radius','r'],['distance','d'],
  ['velocity','v'],['gravitational field strength','g'],['extension of a spring','x']],
 [E]:[['charge','q',['Q']],['current','I'],['potential difference','V'],['resistance','R'],['magnetic field strength','B'],['electric field strength','E'],
  ['power','P'],['energy','E',['ΔE']],['length of wire in a field','L'],['force','F'],['time','t'],['speed','v']]
};
both('Quantity symbols',topic=>(r,h)=>{
 const row=h.pick(QS[topic],r);
 return {cloze:`The usual symbol for ${row[0]} is ____.`,answer:row[1],aliases:row[2]||[],caseSensitive:true,explanation:`${cap(row[0])} is written ${row[1]} in equations.`};
});

// ---- equation symbol tables: [equation, symbol, word, word aliases, unit, unit aliases] ----
const EQ={
 [M]:[
  ['F = ma','F','force',['net force','resultant force'],'N'],
  ['F = ma','m','mass',[],'kg'],
  ['F = ma','a','acceleration',[],'m/s²',ACC],
  ['a = Δv / Δt','Δv','change in velocity',['velocity change','change of velocity'],'m/s',MS],
  ['a = Δv / Δt','Δt','change in time',['time','time taken','time interval','elapsed time'],'s'],
  ['p = mv','p','momentum',[],'kg m/s',[...MOM,'N s','Ns']],
  ['p = mv','v','velocity',['speed'],'m/s',MS],
  ['W = Fd','W','work',['work done','energy','energy transferred'],'J'],
  ['W = Fd','d','distance',['displacement','distance moved'],'m'],
  ['P = W / t','P','power',[],'W'],
  ['P = W / t','t','time',['time taken'],'s'],
  ['Eₖ = ½mv²','Eₖ','kinetic energy',['KE','energy'],'J'],
  ['ΔEₚ = mgΔh','g','gravitational field strength',['gravity','field strength','gravitational acceleration','acceleration due to gravity'],'N/kg',['m/s²',...ACC,'N kg-1','N kg⁻¹']],
  ['ΔEₚ = mgΔh','Δh','change in height',['height change','height','vertical distance','change in vertical height'],'m'],
  ['F = −kx','k','spring constant',['force constant','stiffness'],'N/m',['N m-1','N m⁻¹']],
  ['F = −kx','x','extension',['compression','stretch','extension or compression','displacement'],'m'],
  ['τ = Fd','τ','torque',['moment','moment of a force'],'N m',['Nm','N·m','N.m']],
  ['τ = Fd','d','perpendicular distance',['distance','distance from the pivot','distance from pivot','perpendicular distance from the pivot'],'m'],
  ['a_c = v² / r','r','radius',['radius of the circle','radius of circle'],'m'],
  ['v = 2πr / T','T','period',['time for one revolution','time for one lap','time for one orbit'],'s'],
  ['FΔt = Δp','Δp','change in momentum',['momentum change','impulse'],'kg m/s',[...MOM,'N s','Ns']]
 ],
 [E]:[
  ['V = IR','V','potential difference',['voltage','pd','PD','p.d.','emf'],'V'],
  ['V = IR','I','current',[],'A'],
  ['V = IR','R','resistance',[],'Ω',['ohm','ohms']],
  ['I = q / t','q','charge',[],'C'],
  ['I = q / t','t','time',['time taken'],'s'],
  ['P = IV','P','power',[],'W'],
  ['F = Eq','E','electric field strength',['electric field'],'N/C',['V/m','N C-1','N C⁻¹','V m-1','V m⁻¹']],
  ['F = Eq','F','force',[],'N'],
  ['F = Eq','q','charge',['test charge'],'C'],
  ['F = BIL','B','magnetic field strength',['magnetic flux density','flux density','magnetic field'],'T'],
  ['F = BIL','L','length',['length of wire','length of conductor','length of the wire','length of the conductor'],'m'],
  ['F = Bqv','v','speed',['velocity'],'m/s',MS],
  ['V = ΔE / q','ΔE','energy',['energy transferred','work done','work','change in energy'],'J']
 ]
};
both('Equation symbols: meaning',topic=>(r,h)=>{
 const row=h.pick(EQ[topic],r);
 return {cloze:`In ${row[0]}, ${row[1]} stands for ____.`,answer:row[2],aliases:row[3],explanation:`In ${row[0]}, ${row[1]} is ${row[2]}.`};
});
both('Equation symbols: unit',topic=>(r,h)=>{
 const row=h.pick(EQ[topic],r);
 return {cloze:`In ${row[0]}, ${row[1]} is measured in ____.`,answer:row[4],aliases:[...(row[5]||[]),...nameAl(row[4])],caseSensitive:true,
  explanation:`${row[1]} is ${row[2]}, measured in ${row[4]}.`};
});

// 9. Δ
reg(M,'Meaning of Δ',(r,h)=>{
 const [s,w]=h.pick([['Δv','velocity'],['Δt','time'],['Δd','distance'],['Δp','momentum'],['Δh','height']],r);
 const cloze=r()<.5?`In ${s}, the symbol Δ means a ____ in ${w}.`:`${s} means a ____ in ${w}.`;
 return {cloze,answer:'change',aliases:['changes','difference','a change'],explanation:`Δ (delta) means "change in". ${s} is the change in ${w}.`};
});

// 10. initial / final
reg(M,'Initial and final',(r,h)=>{
 const eq=h.pick(['v_f = v_i + at','v_f² = v_i² + 2ad','d = ½(v_i + v_f)t','a = (v_f − v_i) / Δt'],r);
 const fin=r()<.5,s=fin?'v_f':'v_i';
 return {cloze:`In ${eq}, ${s} is the ____ velocity.`,answer:fin?'final':'initial',aliases:fin?['end','ending','last']:['start','starting','beginning','first'],
  explanation:`${s} is the ${fin?'final':'initial'} velocity (${fin?'f = final':'i = initial'}).`};
});

// 11. Quantity symbols
const NZ=[['final velocity','v_f',['vf','v f','Vf']],['initial velocity','v_i',['vi','v i','Vi']],['change in velocity','Δv',['delta v','deltav','Delta v']],['change in time','Δt',['delta t','deltat','Delta t']],
 ['change in momentum','Δp',['delta p','deltap','Delta p']],['change in height','Δh',['delta h','deltah','Delta h']],['distance (or displacement)','d'],['time','t'],['acceleration','a']];
reg(M,'Symbols for quantities',(r,h)=>{
 const row=h.pick(NZ,r);
 return {cloze:`The symbol for ${row[0]} is ____.`,answer:row[1],aliases:row[2]||[],caseSensitive:true,explanation:`The symbol for ${row[0]} is ${row[1]}.`};
});

// ---- prefixes ----
const PF=[['k','kilo',3],['M','mega',6],['G','giga',9],['m','milli',-3],['µ','micro',-6],['n','nano',-9],['c','centi',-2],['p','pico',-12]];
const PFBY=Object.fromEntries(PF.map(p=>[p[0],p]));
const AL={[M]:{N:['k','M','m'],m:['k','m','c','µ','n'],g:['k','m'],J:['k','M','G'],W:['k','M','G','m'],Hz:['k','M','G'],s:['m','µ','n']},
 [E]:{V:['k','M','m','µ'],A:['m','µ','k'],'Ω':['k','M','m'],C:['m','µ','n','p'],T:['m','µ'],W:['k','M','G','m']}};
const UN={N:'newton',m:'metre',g:'gram',J:'joule',W:'watt',Hz:'hertz',s:'second',V:'volt',A:'ampere','Ω':'ohm',C:'coulomb',T:'tesla'};
const pickPU=(topic,r,h)=>{const u=h.pick(Object.keys(AL[topic]),r);return [h.pick(AL[topic][u],r),u];};
const muAl=(sym)=>sym.includes('µ')?[sym.replace('µ',MU),sym.replace('µ','u')]:[];
const pw=e=>Math.pow(10,e);

both('Prefix symbol to name',topic=>(r,h)=>{
 const [p,u]=pickPU(topic,r,h);
 return {cloze:`In ${p}${u}, the prefix ${p} stands for ____.`,answer:PFBY[p][1],explanation:`${p} = ${PFBY[p][1]} (10${sup(PFBY[p][2])}), so ${p}${u} is a ${PFBY[p][1]}${UN[u]}.`};
});
reg(M,'Prefix name to symbol',(r,h)=>{
 const p=h.pick(PF,r);
 return {cloze:`The symbol for the prefix ${p[1]} is ____.`,answer:p[0],aliases:p[0]==='µ'?[MU,'u','mu','Mu']:[],caseSensitive:true,explanation:`${p[1]} is written ${p[0]} (10${sup(p[2])}). Capital M is mega; lower-case m is milli.`};
});
both('Prefixed unit name to symbol',topic=>(r,h)=>{
 const [p,u]=pickPU(topic,r,h);
 return {cloze:`The symbol for a ${PFBY[p][1]}${UN[u]} is ____.`,answer:p+u,aliases:muAl(p+u),caseSensitive:true,explanation:`${PFBY[p][1]} = ${p}, so ${PFBY[p][1]}${UN[u]} = ${p}${u}.`};
});
// prefix -> factor
reg(M,'Prefix to factor',(r,h)=>{
 const p=h.pick(PF.filter(x=>x[0]!=='p'),r);
 return {cloze:`${p[1]} (${p[0]}) means × ____.`,answer:fmt10(p[2]),explanation:`${p[1]} means 10${sup(p[2])}, which is ${fmt10(p[2])}.`};
});
function fmt10(e){return P.helpers.fmt(pw(e));}
reg(E,'Prefix to factor',(r,h)=>{
 const [p,u]=pickPU(E,r,h);
 return {cloze:`1 ${p}${u} = ____ ${u}`,answer:fmt10(PFBY[p][2]),answerUnit:u,explanation:`${p} means 10${sup(PFBY[p][2])}, so 1 ${p}${u} = ${fmt10(PFBY[p][2])} ${u}.`};
});
reg(M,'Prefix to power of ten',(r,h)=>{
 const p=h.pick(PF,r);
 return {cloze:`${p[1]} (${p[0]}) means × 10^____`,answer:String(p[2]),explanation:`${p[1]} (${p[0]}) means 10${sup(p[2])}.`};
});
reg(M,'Power of ten to prefix',(r,h)=>{
 const p=h.pick(PF,r);
 return {cloze:`The prefix that means 10${sup(p[2])} is ____.`,answer:p[1],explanation:`10${sup(p[2])} is ${p[1]} (${p[0]}).`};
});

// ---- conversions ----
const SETS={
 3:[1.5,2,2.5,3,3.5,4,4.5,5,6,7.5,8,9,12,15,20,25,45],
 6:[1.5,2,2.5,3,4,5,6,8],
 9:[1,2,3,4,5],
 '-2':[20,25,40,45,50,60,75,120,250,500,850],
 '-3':[20,25,40,45,50,75,120,250,350,450,500,850,1200,4500],
 '-6':[100,250,350,470,500,850,2500,4700]
};
const TOBASE={
 [M]:[['mm','m',-3],['cm','m',-2],['km','m',3],['mN','N',-3],['kN','N',3],['kJ','J',3],['MJ','J',6],['kW','W',3],['MW','W',6],['GW','W',9],['ms','s',-3],['µs','s',-6],['kHz','Hz',3],['MHz','Hz',6],['g','kg',-3],['mg','kg',-6]],
 [E]:[['mV','V',-3],['kV','V',3],['µC','C',-6],['mC','C',-3],['mA','A',-3],['µA','A',-6],['kΩ','Ω',3],['MΩ','Ω',6],['mT','T',-3],['µT','T',-6],['kW','W',3],['mW','W',-3],['GW','W',9]]
};
both('Prefixed unit to base unit',topic=>(r,h)=>{
 const [from,to,e]=h.pick(TOBASE[topic],r),v=h.pick(SETS[e],r),a=h.fmt(v*pw(e));
 return {cloze:`${h.fmt(v)} ${from} = ____ ${to}`,answer:a,answerUnit:to,explanation:`1 ${from} = 10${sup(e)} ${to}, so ${h.fmt(v)} × 10${sup(e)} = ${a} ${to}.`};
});
both('Base unit to prefixed unit',topic=>(r,h)=>{
 const [from,to,e]=h.pick(TOBASE[topic].filter(x=>x[2]>=-6&&x[2]<=3),r),v=h.pick(SETS[e],r),b=h.fmt(v*pw(e));
 return {cloze:`${b} ${to} = ____ ${from}`,answer:h.fmt(v),answerUnit:from,explanation:`1 ${from} = 10${sup(e)} ${to}, so ${b} ${to} ÷ 10${sup(e)} = ${h.fmt(v)} ${from}.`};
});
const P2P={
 [M]:[['km','cm',3,-2],['cm','mm',-2,-3],['mm','µm',-3,-6],['MW','kW',6,3],['kW','MW',3,6],['kJ','MJ',3,6],['MJ','kJ',6,3],['ms','µs',-3,-6],['µs','ms',-6,-3],['kN','mN',3,-3]],
 [E]:[['kV','mV',3,-3],['mV','µV',-3,-6],['mA','µA',-3,-6],['µA','mA',-6,-3],['nC','µC',-9,-6],['µC','nC',-6,-9],['kΩ','MΩ',3,6],['MΩ','kΩ',6,3],['mC','µC',-3,-6],['mT','µT',-3,-6]]
};
const V2=[1,2,2.5,3,4,5,6,7.5,8,12,20,25,50,75,250,500,750,2500];
both('Prefix to prefix',topic=>(r,h)=>{
 const [a,b,ea,eb]=h.pick(P2P[topic],r),d=ea-eb;
 const vs=V2.filter(v=>{const x=v*pw(d);return x>=0.01&&x<=1e6;});
 const v=h.pick(vs,r),ans=h.fmt(v*pw(d));
 return {cloze:`${h.fmt(v)} ${a} = ____ ${b}`,answer:ans,answerUnit:b,explanation:`1 ${a} = 10${sup(d)} ${b}, so ${h.fmt(v)} × 10${sup(d)} = ${ans} ${b}.`};
});

// km/h <-> m/s
reg(M,'km/h to m/s',(r,h)=>{
 const k=h.pick([18,36,54,72,90,108,144],r),a=k/3.6;
 return {cloze:`${k} km/h = ____ m/s`,answer:h.fmt(a),answerUnit:'m/s',explanation:`Divide by 3.6: ${k} ÷ 3.6 = ${h.fmt(a)} m/s.`};
});
reg(M,'m/s to km/h',(r,h)=>{
 const m=h.pick([5,10,15,20,25,30,40],r),a=m*3.6;
 return {cloze:`${m} m/s = ____ km/h`,answer:h.fmt(a),answerUnit:'km/h',explanation:`Multiply by 3.6: ${m} × 3.6 = ${h.fmt(a)} km/h.`};
});

// time and mass conversions
const TIMES=[
 ['minute','minutes','s','s',60,[1,2,3,5,6,10,12,1.5,0.5]],
 ['hour','hours','s','s',3600,[1,2,0.5,1.5,0.25]],
 ['hour','hours','minutes','minutes',60,[2,3,0.5,1.5,0.25,4]],
 ['s','s','minutes','minutes',1/60,[120,180,300,600,90,30,1200]],
 ['minute','minutes','hours','hours',1/60,[120,180,90,30,300]]
];
const TIMEAL={s:[],minutes:['min','minute','mins'],hours:['h','hr','hour','hrs']};
const mkTime=(withMass)=>(r,h)=>{
 const rows=withMass?[...TIMES,['tonne','tonnes','kg','kg',1000,[1,2,3,0.5,1.5,4]],['kg','kg','tonnes','tonnes',0.001,[2000,500,3000,1500,4000]]]:TIMES;
 const [s1,p1,s2,p2,f,vs]=h.pick(rows,r),v=h.pick(vs,r),a=h.fmt(v*f);
 const left=v===1?s1:p1;
 const al=s2==='tonnes'?['tonne','t']:(TIMEAL[s2]||[]);
 return {cloze:`${h.fmt(v)} ${left} = ____ ${p2}`,answer:a,answerUnit:p2,unitAliases:al,
  explanation:f>=1?`Multiply by ${h.fmt(f)}: ${h.fmt(v)} × ${h.fmt(f)} = ${a} ${p2}.`:`Divide by ${h.fmt(1/f)}: ${h.fmt(v)} ÷ ${h.fmt(1/f)} = ${a} ${p2}.`};
};
reg(M,'Time and mass conversions',mkTime(true));
reg(E,'Time conversions',(r,h)=>{const g=mkTime(false)(r,h);return g;});

// ---- compound unit identities: [lhs, rhs, rhs aliases, reverse?] ----
const ID={
 [M]:[['N','kg m/s²',['kg m s-2','kg m s⁻²','kg·m/s²','kg·m·s⁻²','kg m/s2','kg m/s^2','kg m s^-2'],false,'force','mass × acceleration, in base units'],
  ['J','N m',['Nm','N·m','N.m'],false,'energy','force × distance'],
  ['W','J/s',['J s-1','J s⁻¹','N m/s','N m s-1'],false,'power','energy ÷ time'],
  ['Hz','s⁻¹',['1/s','/s','s-1','per second','1 s-1','1 s⁻¹'],false,'frequency','1 ÷ time'],
  ['N s','kg m/s',['kg m s-1','kg m s⁻¹','kg·m/s','kg·m·s⁻¹'],false,'impulse','mass × velocity, in base units'],
  ['N/kg','m/s²',['m s-2','m s⁻²','m/s2','m/s^2'],true,'gravitational field strength','acceleration, in base units']],
 [E]:[['V','J/C',['J C-1','J C⁻¹'],false,'voltage','energy ÷ charge'],
  ['A','C/s',['C s-1','C s⁻¹'],false,'current','charge ÷ time'],
  ['C','A s',['As','A·s','A.s'],false,'charge','current × time'],
  ['Ω','V/A',['V A-1','V A⁻¹'],false,'resistance','voltage ÷ current'],
  ['W','V A',['VA','V·A','J/s','J s-1','J s⁻¹'],false,'power','voltage × current'],
  ['N/C','V/m',['V m-1','V m⁻¹'],false,'electric field strength','voltage ÷ distance'],
  ['T','N/(A m)',['N/A m','N A-1 m-1','N A⁻¹ m⁻¹','N/Am','N·A⁻¹·m⁻¹','N/(Am)','N/(A·m)'],false,'magnetic field strength','force ÷ (current × length)']]
};
both('Equivalent compound units',topic=>(r,h)=>{
 const [l,rhs,al,,q,how]=h.pick(ID[topic],r);
 return {cloze:`1 ${l} = 1 ____ (${q} = ${how})`,answer:rhs,aliases:al,caseSensitive:true,explanation:`1 ${l} = 1 ${rhs}.`};
});
const REVAL={'N':'newton','J':'joule','W':'watt','Hz':'hertz','V':'volt','A':'ampere','C':'coulomb','Ω':'ohm','T':'tesla'};
// Mechanics version removed (Q141: "1 N m = 1 ____" is ambiguous with torque); electromagnetism version kept.
reg('Electromagnetism','Compound units to a named unit',((topic)=>(r,h)=>{
 const [l,rhs,,,q]=h.pick(ID[topic].filter(x=>!x[3]),r);
 const nm=REVAL[l];
 return {cloze:`1 ${rhs} = 1 ____ (the named unit for ${q})`,answer:l,aliases:nm?[nm,cap(nm)]:[],caseSensitive:true,explanation:nm?`1 ${rhs} is called 1 ${nm} (${l}).`:`1 ${rhs} = 1 ${l}.`};

})('Electromagnetism'));
})();
