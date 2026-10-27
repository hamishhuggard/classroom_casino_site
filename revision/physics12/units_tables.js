/* Year 12 Physics, Levels 1–3: table questions.
   Level 1 mechanics quantities, Level 2 electromagnetism quantities (each question shows one column of the
   quantity / symbol / unit / unit symbol table with one cell blank); Level 3 SI prefixes (one row: word / symbol / power of ten).
   The title cards show the full tables. */
(()=>{
const P=Physics12,M='Mechanics',E='Electromagnetism';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const sup=e=>String(e).replace(/-/g,'⁻').replace(/\d/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
const MS=['m s-1','m s⁻¹','m·s⁻¹'],ACC=['m s-2','m s⁻²','m/s2','m/s^2','m·s⁻²'],MOM=['kg m s-1','kg m s⁻¹','kg·m/s','kg·m·s⁻¹','N s','Ns','N·s'];
const plural=w=>[w,w+'s'];
// q: quantity (+ accepted other names), s: symbol (+ aliases), u: unit name (+ aliases), us: unit symbol (+ aliases)
const MECH=[
 {q:'distance',qa:['displacement','length'],s:'d',u:'metre',ua:['metres','meter','meters'],us:'m'},
 {q:'time',s:'t',u:'second',ua:['seconds'],us:'s'},
 {q:'velocity',qa:['speed'],s:'v',u:'metre per second',ua:['metres per second','meter per second','meters per second','metres/second'],us:'m/s',usa:MS},
 {q:'acceleration',s:'a',u:'metre per second squared',ua:['metres per second squared','meter per second squared','meters per second squared','metres per second per second'],us:'m/s²',usa:ACC},
 {q:'mass',s:'m',u:'kilogram',ua:['kilograms'],us:'kg'},
 {q:'force',s:'F',u:'newton',ua:['newtons'],us:'N'},
 {q:'weight',qa:['gravitational force','force of gravity','gravity force','force due to gravity','force of gravitation','weight force','gravitational pull','pull of gravity','force of gravity on an object','weight (force of gravity)'],s:'F_g',sa:['Fg','F g','Fₘ'],u:'newton',ua:['newtons'],us:'N'},
 {q:'momentum',s:'p',u:'kilogram metre per second',ua:['kilogram metres per second','kilograms metres per second','kilogram meter per second','newton second'],us:'kg m/s',usa:MOM},
 {q:'energy',s:'E',sa:['Ek','Ep','ΔE','Eₖ','Eₚ','E_k','E_p'],u:'joule',ua:['joules'],us:'J'},
 {q:'work',s:'W',u:'joule',ua:['joules'],us:'J'},
 {q:'power',s:'P',u:'watt',ua:['watts'],us:'W'},
 {q:'torque',s:'τ',sa:['tau'],u:'newton metre',ua:['newton metres','newton meter','newtons metres'],us:'N m',usa:['Nm','N·m','N.m']},
 {q:'frequency',s:'f',u:'hertz',ua:['hertzs'],us:'Hz'},
 {q:'period',s:'T',u:'second',ua:['seconds'],us:'s'},
 {q:'spring constant',qa:['force constant'],s:'k',u:'newton per metre',ua:['newtons per metre','newton per meter','newtons per meter'],us:'N/m',usa:['N m-1','N m⁻¹','N·m⁻¹']},
 {q:'gravitational field strength',s:'g',u:'newton per kilogram',ua:['newtons per kilogram'],us:'N/kg',usa:['m/s²','N kg-1','N kg⁻¹',...ACC]}
];
const ELEC=[
 {q:'charge',s:'q',sa:['Q'],u:'coulomb',ua:['coulombs'],us:'C'},
 {q:'current',s:'I',u:'ampere',ua:['amperes','amp','amps'],us:'A'},
 {q:'potential difference',qa:['voltage','pd','p.d.'],s:'V',u:'volt',ua:['volts'],us:'V'},
 {q:'resistance',s:'R',u:'ohm',ua:['ohms'],us:'Ω'},
 {q:'electric field strength',qa:['electric field'],s:'E',u:'newton per coulomb',ua:['newtons per coulomb','volt per metre','volts per metre'],us:'N/C',usa:['V/m','N C-1','N C⁻¹','V m-1','V m⁻¹']},
 {q:'magnetic field strength',qa:['magnetic flux density','magnetic field'],s:'B',u:'tesla',ua:['teslas'],us:'T'}
];
const withCaps=list=>list.flatMap(x=>[x,x[0].toUpperCase()+x.slice(1)]);
// A quantity cell can be blank only when the other three cells identify it uniquely (e.g. not "joule, J" alone).
const ALL=[...MECH,...ELEC];
const identifies=r=>ALL.filter(o=>o.s===r.s&&o.u===r.u&&o.us===r.us).length===1;

const disp=r=>r.s.replace(/^F_g$/,'F_g');
function columnQuestion(r,rand,h){
 // Derived units written in words ("metre per second", "newton per kilogram") are not asked for: the Unit cell is never blanked for them.
 const compound=/ per | squared/.test(r.u);
 const free=[1,2,3].filter(i=>!(compound&&i===2));if(identifies(r))free.unshift(0);
 const blank=h.pick(free,rand);
 const cells=[['Quantity',r.q,'quantity'],['Symbol',r.s,'symbol'],['Unit',r.u,'unit'],['Unit symbol',r.us,'unit symbol']];
 const rows=cells.map(([label,value],i)=>i===blank?{label,blank:true}:{label,value});
 const cloze=cells.map(([label,value],i)=>`${label}: ${i===blank?'____':value}`).join(' | ');
 const real=r.s==='F_g'?'F_g':r.s;
 const ans=[[r.q,withCaps(r.qa||[])],[r.s,r.sa||[]],[r.u,withCaps(r.ua||[])],[r.us,r.usa||[]]][blank];
 const symbolCell=blank===1||blank===3;
 return {cloze,answer:ans[0],aliases:ans[1],caseSensitive:symbolCell,visual:{type:'unittable',orient:'column',rows},
  explanation:`${r.q[0].toUpperCase()+r.q.slice(1)}: symbol ${real}, unit ${r.u} (${r.us}).`};
}
let n={1:0,2:0};
for(const [level,list,topic] of [[1,MECH,M],[2,ELEC,E]])
 for(const r of list)
  P.add(level,{id:`L${level}-T`+String(++n[level]).padStart(2,'0'),topic,skill:`Units table: ${r.q}`,gen:(rand,h)=>columnQuestion(r,rand,h)});

// ---- SI prefixes (Level 3): one row of word / symbol / power of ten ----
const PREFIXES=[['giga','G',9],['mega','M',6],['kilo','k',3],['centi','c',-2],['milli','m',-3],['micro','µ',-6,['μ','u','mu','Mu']],['nano','n',-9],['pico','p',-12]];
PREFIXES.forEach(([word,symbol,power,symAl],i)=>{
 P.add(3,{id:'L3-P'+String(i+1).padStart(2,'0'),topic:M,skill:`SI prefix: ${word}`,gen:(rand,h)=>{
  const blank=h.int(0,2,rand),pow='10'+sup(power);
  const rows=[{label:'Word',value:word},{label:'Symbol',value:symbol},{label:'Power of ten',value:pow}].map((r,k)=>k===blank?(k===2?{label:r.label,blank:true,pre:'10^'}:{label:r.label,blank:true}):r);
  const cloze=`Word: ${blank===0?'____':word} | Symbol: ${blank===1?'____':symbol} | Power of ten: ${blank===2?'10^____':pow}`;
  const answer=[word,symbol,String(power)][blank],aliases=[withCaps([]),[...(symAl||[])],[]][blank===0?0:blank===1?1:2];
  return {cloze,answer,aliases:blank===0?[word[0].toUpperCase()+word.slice(1)]:aliases,caseSensitive:blank===1,visual:{type:'unittable',orient:'row',rows},
   explanation:`${word} (${symbol}) means 10${sup(power)}. Capital M is mega; lower-case m is milli.`};
 }});
});

// ---- title cards ----
const cell=v=>`<td>${esc(v).replace(/\b([A-Za-z])_([a-z]{1,2})\b/g,'$1<sub>$2</sub>')}</td>`;
const colTable=list=>`<table class="phys-card-table"><tbody>${[['Quantity','q'],['Symbol','s'],['Unit','u'],['Unit symbol','us']].map(([label,k])=>`<tr><th scope="row">${label}</th>${list.map(r=>cell(r[k])).join('')}</tr>`).join('')}</tbody></table>`;
P.setCard(1,{example:'Each question shows one column. Fill in the missing cell.',html:`<div class="phys-card">${colTable(MECH.slice(0,8))}${colTable(MECH.slice(8))}</div>`});
P.setCard(2,{example:'Each question shows one column. Fill in the missing cell.',html:`<div class="phys-card">${colTable(ELEC)}</div>`});
P.setCard(3,{example:'Each question shows one row. Fill in the missing cell, then convert between prefixed units.',html:`<div class="phys-card"><table class="phys-card-table prefix-table"><thead><tr><th>Word</th><th>Symbol</th><th>10<sup>x</sup></th></tr></thead><tbody>${PREFIXES.map(([w,s,p])=>`<tr><td>${w}</td><td>${s}</td><td>10${sup(p)}</td></tr>`).join('')}</tbody></table></div>`});
})();
