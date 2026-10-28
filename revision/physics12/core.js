/* Year 12 Physics (NCEA Level 2): question contract, helpers and answer checking.
   Level files (level1.js … level5.js) call Physics12.add(level, definition). */
const Physics12=(()=>{
 // ordered: play the level's questions in order (easiest first) instead of shuffled.
 // jumpAfter: in an ordered level, that many right in a row skips ahead to the next question marked checkpoint.
 const LEVELS=[
  {id:'yr12_physics-mech-units',name:'Mechanics units & symbols',summary:'Learn the quantity, symbol, unit and unit symbol for each mechanics quantity. Fill in the missing cell. Unit symbols are case-sensitive: N, not n.'},
  {id:'yr12_physics-em-units',name:'Electromagnetism units & symbols',summary:'Learn the quantity, symbol, unit and unit symbol for each electricity and magnetism quantity. Fill in the missing cell. Unit symbols are case-sensitive.'},
  {id:'yr12_physics-prefixes',name:'SI prefixes',summary:'Learn the SI prefixes: word, symbol and power of ten. Fill in the missing cell, then convert between prefixed units.'},
  {id:'yr12_physics-multichoice',name:'Directions & concepts — Multiple choice',summary:'Pick the right answer: left- and right-hand rules, vector directions in circular motion, and key ideas in mechanics and electromagnetism.'},
  {id:'yr12_physics-given',name:'Calculate — equation given',summary:'The equation and the givens are shown. Substitute, rearrange if needed, and include the correct unit.'},
  {id:'yr12_physics-recall',name:'Calculate — choose the equation',summary:'Only the givens are shown. Decide which equation applies, then calculate and include the correct unit.'},
  {id:'yr12_physics-word',name:'Word problems',summary:'Short exam-style situations. Pick out the givens, choose the equation, and calculate with units.'},
  {id:'yr12_physics-same-circuit',name:'Same or different circuit?',ordered:true,jumpAfter:5,summary:'Same circuit if every resistor is connected to the same things. Wires can bend, stretch and move. The order of things in series and the order of parallel branches do not matter. All the resistors are identical.'}
 ];
 // Title-card content per level (an HTML table etc.), set by the level files with setCard().
 const CARDS={};
 const setCard=(level,card)=>{CARDS[level]=card;};
 const bank=LEVELS.map(()=>[]);
 const TOPICS=['Mechanics','Electromagnetism'];
 // Umbrella skills for the practice chooser. Each question keeps its own fine-grained `skill`; the umbrella is worked out
 // from that name (first match in its topic wins). Units and SI prefixes have no umbrella: they stay as their own levels.
 const UMBRELLAS={
  Mechanics:[
   ['Springs and Hooke’s law',/hooke|elastic/],
   ['Torque and moments',/torque|moments?\b|see-?saw|beam/],
   ['Momentum and impulse',/momentum|impulse|collision|recoil|force from (a )?change/],
   ['Circular motion',/circular|centripetal|frequency|period|vertical circle|tension as|friction as/],
   ['Projectiles',/projectile/],
   ['Vectors',/perpendicular|resultant/],
   ['Motion graphs',/graph|d–t|v–t/],
   ['Work, energy and power',/energy|efficiency|work|power|kinetic/],
   ['Forces and Newton’s laws',/force|newton|weight|friction|lift|balanced/],
   ['Speed and acceleration',/speed|velocity|acceleration|distance|kinematics|braking|free fall|throw|stop|^v_f|^d =|^a =/]
  ],
  Electromagnetism:[
   ['Electromagnetic induction',/induc|faraday|lenz|flux|emf|transformer|v = bvl|right hand rule|speed of a rod/],
   ['Magnets and magnetic fields',/bar magnet|compass|pole|right hand grip/],
   ['Series and parallel circuits',/^(two|three|four) resistors/],   // same-or-different circuit levels (names mention wires)
   ['Magnetic force',/f = bil|f = bqv|left hand|motor|wire|magnetic force|moving charge|speed from force on a charge|magnetic field strength/],
   ['Electric fields',/field|plates|droplet|charged|e = v\/d|f = eq|δep|ek = |energy gained|distance moved|test charge|electron force/],
   ['Ohm’s law and resistance',/ohm|resistance of|heater element/],
   ['Series and parallel circuits',/series|parallel|resistors|ammeter|what is the same|whole-circuit|total resistance/],
   ['Electrical power and energy',/power|p = |lamps|same v and i|energy = power|energy from power|energy from v/],
   ['Current, charge and voltage',/current|charge|potential difference/]
  ]
 };
 const NO_UMBRELLA=/^(units table|equation symbols|symbols for|initial and final|meaning of δ|si prefix|base unit|prefix|time (and mass )?conversions|km\/h|m\/s to)/;
 const UMBRELLA_ORDER=[...new Set(Object.values(UMBRELLAS).flat().map(([name])=>name))];
 function umbrella(def){
  const name=String(def.skill||'').toLowerCase();
  if(NO_UMBRELLA.test(name)||/^L8-/.test(def.id))return '';   // same-or-different circuits stay one ordered learning unit
  return ((UMBRELLAS[def.topic]||[]).find(([,pattern])=>pattern.test(name))||[])[0]||null;   // null = unmapped (tests flag it)
 }
 const DIRS=['up the page','down the page','left','right','into the page','out of the page'];
 // ---- random helpers ----
 const pick=(xs,r)=>xs[Math.floor(r()*xs.length)];
 const int=(lo,hi,r)=>lo+Math.floor(r()*(hi-lo+1));
 const shuffle=(xs,r)=>{const a=[...xs];for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 // Strip floating-point noise: fmt(0.1+0.2) → "0.3". Keeps up to 6 significant figures.
 const fmt=n=>{const s=Number(Number(n).toPrecision(6));return Math.abs(s)>=1e6||(s!==0&&Math.abs(s)<1e-4)?String(s):String(s);};
 // 3 significant figures (for answers that are not exact).
 const sig3=n=>fmt(Number(Number(n).toPrecision(3)));
 // ---- SVG helpers: strokes use currentColor so every theme works ----
 const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
 const svgWrap=(body,label,view='0 0 640 260')=>`<svg class="revision-visual" viewBox="${view}" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title>${body}</svg>`;
 const line=(x1,y1,x2,y2,w=3,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="${w}" ${extra}/>`;
 const arrow=(x1,y1,x2,y2,w=4,head=14)=>{const a=Math.atan2(y2-y1,x2-x1),hx=n=>(n).toFixed(1),p=(d)=>[hx(x2-head*Math.cos(a+d)),hx(y2-head*Math.sin(a+d))].join(',');const bx=x2-head*0.8*Math.cos(a),by=y2-head*0.8*Math.sin(a); // shaft stops inside the head so it can't poke out past the tip
  return `<g>${line(x1,y1,bx,by,w)}<polygon points="${hx(x2)},${hx(y2)} ${p(0.45)} ${p(-0.45)}" fill="currentColor"/></g>`;};
 const text=(x,y,s,size=22,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="currentColor" style="font-size:${size}px">${esc(s)}</text>`;
 const circle=(x,y,r,w=3,fill='none')=>`<circle cx="${x}" cy="${y}" r="${r}" style="fill:${fill}" stroke="currentColor" stroke-width="${w}"/>`;
 const rect=(x,y,w,h,sw=3,fill='none')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:${fill}" stroke="currentColor" stroke-width="${sw}"/>`;
 const into=(x,y,r=14)=>circle(x,y,r)+line(x-r*.7,y-r*.7,x+r*.7,y+r*.7,2.5)+line(x-r*.7,y+r*.7,x+r*.7,y-r*.7,2.5);   // ⊗ field/current into page
 const out=(x,y,r=14)=>circle(x,y,r)+circle(x,y,3.5,1,'currentColor');                                                 // ⊙ field/current out of page
 const helpers={pick,int,shuffle,fmt,sig3,DIRS,svgWrap,line,arrow,text,circle,rect,into,out};
 // ---- registration ----
 function add(level,def){
  if(!(level>=1&&level<=LEVELS.length))throw new Error('bad level '+level);
  if(!TOPICS.includes(def.topic))throw new Error(def.id+': topic must be one of '+TOPICS.join(', '));
  if(typeof def.gen!=='function')throw new Error(def.id+': gen(r,h) required');
  bank[level-1].push(def);
 }
 // ---- numbers and units ----
 const SUP={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'-','⁺':'+'};
 const plain=s=>String(s).normalize('NFKC').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺]/g,c=>SUP[c]||c).replace(/−|–/g,'-');
 // Thousands separators: "1,000", "1 000" and "12,345,678" mean 1000, 1000 and 12345678. Other commas are left alone.
 function dropThousands(s){return s.replace(/(^|[^\d.])(\d{1,3}(?:[, ]\d{3})+)(?![\d,])/g,(m,pre,num)=>pre+num.replace(/[, ]/g,''));}
 function parseNumber(text){
  let s=dropThousands(plain(text).trim().replace(/\s+/g,' '));
  let m=s.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*(?:[x×*]|\\times)\s*10\s*\^?\s*\(?([+-]?\d+)\)?$/i)||s.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*e\s*([+-]?\d+)$/i);
  if(m)return Number(m[1])*Math.pow(10,Number(m[2]));
  m=s.match(/^10\s*\^\s*\(?([+-]?\d+)\)?$/);if(m)return Math.pow(10,Number(m[1]));
  m=s.match(/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/);if(m)return Number(s);
  m=s.match(/^([+-]?\d+),(\d+)$/);if(m)return Number(m[1]+'.'+m[2]);
  return NaN;
 }
 // Split "12.5 m/s", "3 x 10^8 m/s", "2e-3 A" into {value, unit}. Returns null if no leading number.
 function splitQuantity(text){
  const s=dropThousands(plain(text).trim().replace(/[.!?;]+$/,''));
  const m=s.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:\s*(?:[x×*]\s*10\s*\^?\s*\(?[+-]?\d+\)?|e\s*[+-]?\d+))?)\s*(.*)$/i);
  if(!m)return null;
  const value=parseNumber(m[1]);return Number.isNaN(value)?null:{value,unit:m[2].trim()};
 }
 const PREFIX={kilo:'k',milli:'m',micro:'µ',mega:'M',centi:'c',nano:'n',giga:'G'};
 const WORDS={metre:'m',meter:'m',gram:'g',second:'s',newton:'N',joule:'J',watt:'W',volt:'V',ampere:'A',amp:'A',ohm:'Ω',coulomb:'C',tesla:'T',hertz:'Hz',farad:'F',degree:'°',radian:'rad',kelvin:'K',weber:'Wb'};
 const SPECIAL={Nm:'N m',Ns:'N s',kWh:'kW h',Ωm:'Ω m'};
 function unitToken(tok){
  tok=tok.replace(/[µμ]/g,'µ');
  const w=tok.toLowerCase().match(/^(kilo|milli|micro|mega|centi|nano|giga)?(metre|meter|gram|second|newton|joule|watt|volt|ampere|amp|ohm|coulomb|tesla|hertz|farad|degree|radian|kelvin|weber)s?$/);
  if(w)return (PREFIX[w[1]]||'')+WORDS[w[2]];
  if(tok==='ohm'||tok==='ohms'||tok==='Ohm'||tok==='Ohms')return 'Ω';
  if(/^u[mgsAVFCNJWT]$/.test(tok))return 'µ'+tok.slice(1);
  if(tok==='deg'||tok==='degrees')return '°';
  return tok;
 }
 // Base-unit symbols that can be run together in one token ("ms", "kgm"). Prefixed units are looked up separately.
 const BASE_SYMBOLS=['kg','Hz','mol','rad','Wb','Pa','Ω','°','m','g','s','N','J','W','V','A','C','T','F','K','h','L'];
 const PREFIXES='kmµMcnGdp';
 function isKnownUnit(tok){
  const t=unitToken(tok);
  return BASE_SYMBOLS.includes(t)||new RegExp(`^[${PREFIXES}](?:${BASE_SYMBOLS.filter(b=>b.length===1).join('|')})$`).test(t)||['%','km/h'].includes(t)||t==='min';
 }
 // "ms" → ['m','s'], "kgm" → ['kg','m']; null if the token cannot be read as base units.
 function splitBaseUnits(tok){
  if(!tok)return [];
  for(const sym of BASE_SYMBOLS){
   if(tok.startsWith(sym)){const rest=splitBaseUnits(tok.slice(sym.length));if(rest)return [sym,...rest];}
  }
  return null;
 }
 // "kg m/s", "kg·m·s⁻¹", "N/C", "m s-2", "m/s^2" → canonical "kg^1 m^1 s^-1" style key. Symbols stay case-sensitive.
 function unitKey(text){
  let s=plain(text).trim().replace(/[·⋅•×*]/g,' ').replace(/\s+/g,' ');
  if(SPECIAL[s.replace(/ /g,'')])s=SPECIAL[s.replace(/ /g,'')];
  const [num,...den]=s.split('/');
  const exps={};
  const add=(part,sign)=>{
   for(const tok of part.trim().split(' ').filter(Boolean)){
    const m=tok.match(/^([^\d^+-]+?)\^?\(?([+-]?\d+)?\)?$/);if(!m)return false;
    const e=(m[2]===undefined?1:Number(m[2]))*sign;
    // "ms^-1", "kgm", "kgm/s": run-together base units. Split them unless the token is a unit in its own right (ms = millisecond, kg, mJ).
    const pieces=(m[2]!==undefined||!isKnownUnit(m[1]))&&splitBaseUnits(m[1]);
    // The exponent belongs to the last symbol only: "ms^-1" is m·s⁻¹.
    if(pieces){pieces.forEach((piece,i)=>{const pe=i===pieces.length-1?e:sign;exps[piece]=(exps[piece]||0)+pe;});continue;}
    const base=unitToken(m[1]);
    exps[base]=(exps[base]||0)+e;
   }
   return true;
  };
  if(!add(num||'',1))return null;
  if(den.length&&!add(den.join(' '),-1))return null;
  return Object.keys(exps).filter(k=>exps[k]!==0).sort().map(k=>k+'^'+exps[k]).join(' ')||'1';
 }
 const unitsEqual=(a,b)=>{const x=unitKey(a),y=unitKey(b);return x!==null&&x===y;};
 // Compare a typed quantity with a model answer. Returns 'ok' | 'wrong' | 'nounit'.
 // Relative tolerance 1% by default (src.tolerance overrides) so 3 s.f. rounding is accepted.
 function checkNumeric(src,input){
  const q=splitQuantity(input);
  if(!q)return 'wrong';
  const want=Number(src.answer),tol=src.tolerance??0.01;
  if(src.answerUnit){
   if(!q.unit&&src.unitGiven)return Math.abs(q.value-want)<=Math.max(Math.abs(want)*tol,1e-12)?'ok':'wrong';
   if(!q.unit)return 'nounit';
   const ok=[src.answerUnit,...(src.unitAliases||[])].some(u=>unitsEqual(u,q.unit));
   if(!ok)return 'wrong';
  }else if(q.unit)return 'wrong';
  return Math.abs(q.value-want)<=Math.max(Math.abs(want)*tol,1e-12)?'ok':'wrong';
 }
 const isNumericAnswer=a=>!Number.isNaN(parseNumber(String(a)));
 // ---- generation ----
 function generate(base,random=Math.random){
  const out=base.gen(random,helpers);
  const answer=String(out.answer);
  const result={...base,...out,answer,aliases:out.aliases||[],visual:out.visual||{type:'recall'},phys:true};
  delete result.gen;
  result.prompt=result.cloze;
  const numeric=!result.choices&&isNumericAnswer(answer);
  result.numeric=numeric;
  // Conversions ("1.2 A = ____ mA") state the target unit in the question: keep it visible and accept the bare number.
  result.unitGiven=numeric&&!!out.answerUnit&&/\d[ \t]*(?:[A-Za-zµΩ°]{1,3}(?:\/[A-Za-z]{1,3}[²³]?)?|minutes?|hours?|tonnes?|seconds?)[ \t]*=[ \t]*____[ \t]*[A-Za-zµΩ°]/.test(result.cloze);
  result.caseSensitive=out.caseSensitive!==undefined?out.caseSensitive:!numeric&&!result.choices&&/^[A-Za-zµΩ°]{1,3}$/.test(answer);
  let completed=result.cloze.replace(/____\s*(?:[^\s\n.,;:)]+)?/,m=>answer+(out.answerUnit?' '+out.answerUnit:''));
  result.completedExample=completed;
  return result;
 }
 // Build the unit object the app expects. Question ids are level-prefixed, numbered from 101 so they never clash with Year 10.
 const NUMBERS_OF=()=>(typeof Physics12!=='undefined'&&Physics12.NUMBERS)||{};
 function unit(){
  // Numbers come from the permanent registry in numbers.js so deleting a question never renumbers the others;
  // an id not yet in it gets the next free number (run scripts/assign_numbers.cjs to record it).
  const known=NUMBERS_OF();let n=Math.max(100,...Object.values(known));
  return {id:'yr12_physics',name:'Year 12 Physics — Mechanics & Electromagnetism',status:'ready',mixed:true,physics12:true,source:'NCEA Level 2 Physics (AS 91171 mechanics, AS 91173 electricity & electromagnetism)',
   skills:LEVELS.map((lv,i)=>({id:lv.id,name:lv.name,summary:lv.summary,ordered:lv.ordered,jumpAfter:lv.jumpAfter,cardHtml:CARDS[i+1]?.html,example:CARDS[i+1]?.example,questions:bank[i].map(def=>({...def,unit:def.topic,umbrella:umbrella(def)||'',questionNumber:known[def.id]||++n}))}))};
 }
 return {LEVELS,TOPICS,UMBRELLA_ORDER,umbrella,DIRS,bank,add,setCard,generate,unit,helpers,parseNumber,splitQuantity,unitKey,unitsEqual,checkNumeric,isNumericAnswer};
})();
if(typeof module!=='undefined')module.exports=Physics12;
