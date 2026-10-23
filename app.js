const $ = id => document.getElementById(id);
let forcedChoice;
const pick = xs => xs[forcedChoice?forcedChoice(xs.length):Math.floor(Math.random()*xs.length)];
const number = () => pick([1,2,3,4,5,6,8,10]);
const introductoryProducts=Array.from({length:5},(_,i)=>i+1).flatMap(i=>Array.from({length:5},(_,r)=>[i,r+1]).filter(([i,r])=>i*r<=20));
const levels = [];
function level(name,rule,example,make){levels.push({name,rule,example,make});}
function q(prompt,answer,opts={}) {return {prompt,answer:String(answer),unit:'',kind:'series',labels:[],...opts};}
const introductoryComponents=[
  {name:'LAMP & RESISTOR',types:['lamp','resistor'],rule:'A lamp is a circle with a cross. A resistor is a rectangle.'},
  {name:'CELL & BATTERY',types:['cell','battery'],rule:'A cell has one long and one short line. A battery has several pairs.'},
  {name:'COMPONENTS: MIXED PRACTICE',types:['lamp','resistor','cell','battery'],rule:'Identify lamps, resistors, cells and batteries by their symbols.'}
];
for(const intro of introductoryComponents)level(intro.name,intro.rule,'',()=>{const type=pick(intro.types);return q('Name this component.',type,{kind:'component',component:type,aliases:type==='lamp'?['bulb','light bulb']:[]});});
level('SERIES VS PARALLEL','Series: one path. Parallel: branches.','One loop → series. Two paths → parallel.',()=>{const kind=pick(['series','parallel']);return q('Series or parallel?',kind,{kind});});
level('SERIES VS PARALLEL: DIFFERENT COMPONENTS','Count paths, not components.','Two branches with resistors → parallel.',()=>{const kind=pick(['series','parallel']);return q('Series or parallel?',kind,{kind,resistor:pick([false,true])});});
level('CURRENT & VOLTAGE: UNIT NAMES','Current: amperes. Voltage: volts.','Current is measured in amperes.',()=>{const [term,answer,aliases]=pick([['current','ampere',['amperes','amp','amps']],['voltage','volt',['volts']]]);return q(`Name the unit of ${term}.`,answer,{aliases,kind:'symbol',symbol:term});});
level('CURRENT & VOLTAGE: UNIT SYMBOLS','Ampere: A. Volt: V.','3 amperes = 3 A. 3 volts = 3 V.',()=>{const [term,answer]=pick([['ampere','A'],['volt','V']]);return q(`What is the symbol for ${term}?`,answer,{kind:'symbol',symbol:term});});
level('ELECTRICAL UNIT NAMES','Current: amperes. Voltage: volts. Resistance: ohms.','Resistance is measured in ohms.',()=>{const [term,answer,aliases]=pick([['current','ampere',['amperes','amp','amps']],['voltage','volt',['volts']],['resistance','ohm',['ohms']]]);return q(`Name the unit of ${term}.`,answer,{aliases,kind:'symbol',symbol:term});});
level('ELECTRICAL UNIT SYMBOLS','Ampere: A. Volt: V. Ohm: Ω.','12 volts = 12 V.',()=>{const [term,answer,aliases]=pick([['ampere','A',[]],['volt','V',[]],['ohm','Ω',['omega']]]);return q(`What is the symbol for ${term}?`,answer,{aliases,kind:'symbol',symbol:term});});
level('QUANTITY SYMBOLS','Current: I. Voltage: V. Resistance: R.','I = 2 A means current is 2 A.',()=>{const [term,a]=pick([['current','I'],['voltage','V'],['resistance','R']]);return q(`What letter represents ${term}?`,a,{kind:'symbol',symbol:'?'});});
level('LAMP & RESISTOR SYMBOLS','Cross in circle: lamp. Box: resistor.','⊗ → lamp. Rectangle → resistor.',()=>{const a=pick(['lamp','resistor']);return q('Name this component.',a,{aliases:a==='lamp'?['bulb','light bulb']:[],kind:'component',component:a});});
level('COMPONENT SYMBOLS','Cross: lamp. Box: resistor. Long/short lines: cell.','A resistor is drawn as a box.',()=>{const a=pick(['lamp','resistor','cell']);return q('Name this component.',a,{aliases:a==='lamp'?['bulb','light bulb']:[],kind:'component',component:a});});
level('CURRENT IN SERIES','Current is equal everywhere in series.','I₁ = 2 A → I₂ = 2 A.',()=>{const a=pick([1,2]);return q('Find the current in lamp 2.',a,{unit:'A',labels:[`I₁ = ${a} A`,'I₂ = ?'],worked:`I₂ = I₁ = ${a} A.`});});
level('CURRENT IN SERIES: MORE VALUES','Current is equal everywhere in series.','I₁ = 4 A → I₂ = 4 A.',()=>{const a=number();return q('Find the current in lamp 2.',a,{unit:'A',labels:[`I₁ = ${a} A`,'I₂ = ?'],worked:`I₂ = I₁ = ${a} A.`});});
level('CURRENT IN SERIES: EITHER LAMP','Current is equal everywhere in series.','I₂ = 3 A → I₁ = 3 A.',()=>{const a=number(),i=pick([0,1]);return q(`Find the current in lamp ${i+1}.`,a,{unit:'A',labels:[0,1].map(j=>`I${j?'₂':'₁'} = ${j===i?'?':a+' A'}`),worked:`Both currents are equal: ${a} A.`});});
level('CURRENT IN SERIES: THREE LAMPS','More lamps, same series current.','I₁ = 2 A → I₂ = I₃ = 2 A.',()=>{const a=number(),given=pick([0,1,2]),target=(given+pick([1,2]))%3;return q(`Find the current in lamp ${target+1}.`,a,{unit:'A',count:3,labels:[0,1,2].map(j=>`I${['₁','₂','₃'][j]}${j===given?' = '+a+' A':j===target?' = ?':''}`),worked:`Every lamp carries ${a} A.`});});
level('VOLTAGE ACROSS ONE COMPONENT','One lamp gets the full supply voltage.','6 V supply → 6 V across the lamp.',()=>{const a=number();return q('Find the voltage across the lamp.',a,{unit:'V',count:1,supply:`${a} V`,labels:['V = ?'],worked:`Vlamp = Vsupply = ${a} V.`});});
level('CURRENT IN PARALLEL: TOTAL','Total current = sum of branch currents.','2 A + 3 A = 5 A.',()=>{const a=number(),b=number();return q('Find the total current.',a+b,{unit:'A',kind:'parallel',supply:'I = ?',labels:[`I₁ = ${a} A`,`I₂ = ${b} A`],worked:`I = I₁ + I₂ = ${a} + ${b} = ${a+b} A.`});});
level('CURRENT IN PARALLEL: MISSING BRANCH','Missing branch = total − other branch.','5 A − 2 A = 3 A.',()=>{const a=number(),b=number();return q('Find the missing branch current.',b,{unit:'A',kind:'parallel',supply:`I = ${a+b} A`,labels:[`I₁ = ${a} A`,'I₂ = ?'],worked:`I₂ = I − I₁ = ${a+b} − ${a} = ${b} A.`});});
level('VOLTAGE IN PARALLEL','Each branch gets the full supply voltage.','6 V supply → 6 V on every branch.',()=>{const a=number();return q('Find the missing voltage.',a,{unit:'V',kind:'parallel',supply:`${a} V`,labels:['V₁ = ?',`V₂ = ${a} V`],worked:`V₁ = V₂ = Vsupply = ${a} V.`});});
level('VOLTAGE IN SERIES: TOTAL','Supply voltage = sum of voltage drops.','2 V + 4 V = 6 V.',()=>{const a=number(),b=number();return q('Find the supply voltage.',a+b,{unit:'V',supply:'V = ?',labels:[`V₁ = ${a} V`,`V₂ = ${b} V`],worked:`V = V₁ + V₂ = ${a} + ${b} = ${a+b} V.`});});
level('VOLTAGE IN SERIES: MISSING DROP','Missing drop = supply − known drop.','6 V − 2 V = 4 V.',()=>{const a=number(),b=number();return q('Find the missing voltage drop.',b,{unit:'V',supply:`${a+b} V`,labels:[`V₁ = ${a} V`,'V₂ = ?'],worked:`V₂ = ${a+b} − ${a} = ${b} V.`});});
for (const target of ['V','I','R']) level(`OHM’S LAW: ${{V:'VOLTAGE',I:'CURRENT',R:'RESISTANCE'}[target]}`,{V:'V = I × R.',I:'I = V ÷ R.',R:'R = V ÷ I.'}[target],{V:'2 A × 3 Ω = 6 V.',I:'6 V ÷ 3 Ω = 2 A.',R:'6 V ÷ 2 A = 3 Ω.'}[target],()=>{const [I,R]=target==='V'?pick(introductoryProducts):[number(),number()];const V=I*R;return q(`Find ${ {V:'voltage',I:'current',R:'resistance'}[target] }.`,{V,I,R}[target],{unit:{V:'V',I:'A',R:'Ω'}[target],count:1,resistor:true,supply:target==='V'?'V = ?':`${V} V`,labels:[`R = ${target==='R'?'?':R+' Ω'}`,`I = ${target==='I'?'?':I+' A'}`],worked:{V:`V = I × R = ${I} × ${R} = ${V} V.`,I:`I = V ÷ R = ${V} ÷ ${R} = ${I} A.`,R:`R = V ÷ I = ${V} ÷ ${I} = ${R} Ω.`}[target]});});
level('RESISTANCE IN SERIES','Series resistances add.','2 Ω + 3 Ω = 5 Ω.',()=>{const a=number(),b=number();return q('Find the total resistance.',a+b,{unit:'Ω',resistor:true,labels:[`${a} Ω`,`${b} Ω`],worked:`Rtotal = ${a} + ${b} = ${a+b} Ω.`});});
level('CURRENT IN SERIES: OHM’S LAW','Add resistances. Then I = V ÷ Rtotal.','6 V ÷ (1 Ω + 2 Ω) = 2 A.',()=>{const a=number(),b=number(),i=number();return q('Find the circuit current.',i,{unit:'A',resistor:true,supply:`${(a+b)*i} V`,labels:[`${a} Ω`,`${b} Ω`],worked:`Rtotal = ${a} + ${b} = ${a+b} Ω. I = ${(a+b)*i} ÷ ${a+b} = ${i} A.`});});
level('RESISTANCE IN PARALLEL','Rtotal = R₁R₂ ÷ (R₁ + R₂).','6 Ω × 3 Ω ÷ (6 Ω + 3 Ω) = 2 Ω.',()=>{const a=pick([2,4,6,8,10]);return q('Find the total resistance.',a/2,{unit:'Ω',kind:'parallel',resistor:true,labels:[`${a} Ω`,`${a} Ω`],worked:`Rtotal = ${a} × ${a} ÷ (${a} + ${a}) = ${a/2} Ω.`});});
level('CURRENT IN PARALLEL: OHM’S LAW','Find each I = V ÷ R. Then add currents.','6 V: 3 Ω → 2 A; 6 Ω → 1 A. Total = 3 A.',()=>{const v=pick([6,12,24]),a=pick([2,3,6]),b=pick([2,3,6]);return q('Find the total current.',v/a+v/b,{unit:'A',kind:'parallel',resistor:true,supply:`${v} V`,labels:[`${a} Ω`,`${b} Ω`],worked:`I₁ = ${v} ÷ ${a} = ${v/a} A. I₂ = ${v} ÷ ${b} = ${v/b} A. Total = ${v/a+v/b} A.`});});
level('CURRENT IN MIXED CIRCUITS','Combine parallel R first. Add series R. Use I = V ÷ R.','(6 Ω ∥ 6 Ω) + 2 Ω = 5 Ω. 10 V ÷ 5 Ω = 2 A.',()=>{const r=pick([2,4,6,8]),s=number(),i=number(),total=r/2+s;return q('Find the supply current.',i,{unit:'A',kind:'mixed',resistor:true,supply:`${total*i} V`,labels:[`${r} Ω`,`${r} Ω`,`${s} Ω`],worked:`Parallel R = ${r} ÷ 2 = ${r/2} Ω. Total R = ${r/2} + ${s} = ${total} Ω. I = ${total*i} ÷ ${total} = ${i} A.`});});

function component(x,y,type='lamp') {if(type==='cell')return `<path d="M${x-8} ${y-30}v60 M${x+8} ${y-17}v34"/>`;if(type==='resistor')return `<rect x="${x-30}" y="${y-13}" width="60" height="26" fill="white"/>`;return `<circle cx="${x}" cy="${y}" r="23" fill="white"/><path d="M${x-16} ${y-16}l32 32 M${x-16} ${y+16}l32 -32"/>`;}
function wiredComponent(x,y,type){
  const edge=type==='cell'?8:type==='battery'?24:type==='resistor'?30:23;
  const wires=`<path d="M${x-65} ${y}H${x-edge} M${x+edge} ${y}H${x+65}"/>`;
  const symbol=type==='battery'
    ? [-24,8].map(offset=>`<path d="M${x+offset} ${y-30}v60 M${x+offset+16} ${y-17}v34"/>`).join('')
    : component(x,y,type);
  return wires+symbol;
}
function diagram(q){if(q.kind==='revision')return `<div class="revision-question">${revisionVisual(q)}<div>${scienceMarkup(removeProvidedUnit(q,q.prompt))}</div></div>`;let s='';const text=(x,y,t)=>`<text x="${x}" y="${y}" text-anchor="middle">${scienceSvgMarkup(t)}</text>`;if(q.kind==='symbol')s=text(400,210,q.symbol);else if(q.kind==='component')s=wiredComponent(400,190,q.component);else {s='<path d="M130 100H392 M408 100H670V330H130V100"/>'+component(400,100,'cell')+(q.supply?text(400,60,q.supply):'');if(q.kind==='parallel'||q.kind==='mixed'){s+='<path d="M130 220H670"/>';[220,330].forEach((y,i)=>{s+=component(400,y,q.resistor?'resistor':'lamp')+text(400,y+48,q.labels[i]||'');});if(q.kind==='mixed')s+=component(550,100,'resistor')+text(565,65,q.labels[2]);}else{const n=q.count||2;for(let i=0;i<n;i++){const x=130+(i+1)*540/(n+1);s+=component(x,330,q.resistor?'resistor':'lamp')+text(x,383,q.labels[i]||`Lamp ${i+1}`);}if(q.count===1&&q.labels[1])s+=text(400,280,q.labels[1]);}}return `<svg viewBox="0 0 800 440" role="img" aria-label="${q.kind} circuit"><g stroke="#111" stroke-width="3" fill="none">${s}</g></svg>`;}
let enabled=levels.map((_,i)=>i),position=0,current,correct=0,wrong=0,score=0,attempts=0,seconds=30,timer;
let screen='menu',activeRun=false,highestLevel=1;
let rouletteCorrectCount=0,rouletteTarget=3;
let lastQuestionKey=null,questionLevel=0,needsLevelCard=false;
let reviewDeck=null,currentReview=null,advanceAfterCorrection=false;
let menuIndex=0;
let audioContext,beepTimer;
let musicTimer,musicStep=0,musicEffectPause=false;
const musicVoices=new Set();
let selectedUnit='electricity_magnetism';
let returnToPreferences=false;
const menuIds=['start-game','menu-leaderboard','menu-settings','menu-class','finish-run'];
// Question numbers are a debugging aid: shown only with ?show_number=true.
const showNumber=new URLSearchParams(location.search).get('show_number')==='true';
function questionNumber(){
  if(!current?.source?.id)return '';
  if(current.source.questionNumber)return current.source.questionNumber;
  const unit=curriculumUnits.find(unit=>unit.id===selectedUnit);
  const items=unit?.skills.flatMap(skill=>skill.questions)||[];
  const index=items.findIndex(item=>item.id===current.source.id);return index>=0?index+1:'';
}
function renderCasinoProgress(){const target=rouletteTarget;const progress=$('casino-progress');progress.hidden=!activeRun||!$('roulette-enabled').checked;$('casino-progress-bar').max=target;$('casino-progress-bar').value=rouletteCorrectCount;$('casino-progress-label').textContent=`${Math.max(0,target-rouletteCorrectCount)} questions until you can gamble`; }
function hud(){$('casino-score').textContent=`$${score}`;renderCasinoProgress();renderDeckProgress(); if(activeRun)highestLevel=Math.max(highestLevel,enabled[position]+1); $('level').textContent=`LEVEL ${position+1}${showNumber&&questionNumber()?' · QUESTION '+questionNumber():''}`;$('score').textContent=`BANK $${String(score).padStart(6,'0')}`;}
function renderDeckProgress(){const box=$('deck-progress');box.hidden=!activeRun||!reviewDeck;if(!reviewDeck)return;const progress=reviewDeck.progress;$('deck-progress-label').textContent=`LEVEL ${progress.position+1} · ${progress.seen}/${progress.total} new questions attempted · ${progress.pending} awaiting review${currentReview?.review?' · REVIEW '+(currentReview.stage+1)+'/3 (LEVEL '+(enabled.indexOf(questionLevel)+1)+')':''}`;}
function resetReviewDeck(){reviewDeck=null;currentReview=null;advanceAfterCorrection=false;if(typeof ReviewDeck==='undefined'||!enabled.every(index=>levels[index].questions))return;reviewDeck=new (globalThis.CasinoDiagnostic?.deckFor(selectedUnit)||ReviewDeck)(enabled.map(index=>({index,cards:levels[index].questions.filter(item=>selectedUnit!=='mixed_key_skills'||item.id!=='E4').map(item=>makeRevisionQuestion(item,selectedUnit==='mixed_key_skills'))})));}
function makeRevisionQuestion(base,mixed){const item=typeof base.gen==='function'?Physics12.generate(base):mixed&&typeof CasinoPractice!=='undefined'?CasinoPractice.generate(base):base;return q(item.cloze||item.prompt,item.answer,{kind:'revision',aliases:item.aliases||[],caseSensitive:!!item.caseSensitive||/chemical symbol|formula|base pairs|neutral formula|genotype =/.test(item.prompt),worked:item.explanation,source:item});}
function finishDeck(){stop();if(globalThis.CasinoDiagnostic?.finish(selectedUnit))return;currentReview=null;saveRun();showMenu();$('chapter-summary').textContent='Every question is done. All missed questions passed three successful reviews.';$('chapter-dialog').querySelector('h2').textContent='Practice complete';$('chapter-dialog').showModal();}
function stop(){clearInterval(timer);clearTimeout(beepTimer);$('clock').textContent='';}
function focus(){setTimeout(()=>{if(screen==='game'&&!$('rule-dialog').open&&!$('settings-dialog').open&&!$('preferences-dialog').open&&!$('roulette-dialog').open&&!$('chapter-dialog').open&&!$('skill-dialog').open)answerFocusTarget().focus();},0);}
function startTimer(reset=true){stop();if(screen!=='game'||!activeRun||$('rule-dialog').open||$('settings-dialog').open||$('chapter-dialog').open||$('preferences-dialog').open||$('skill-dialog').open||$('roulette-dialog').open||!$('timed').checked)return;if(reset)seconds=30;$('clock').textContent=`${seconds}s`;timer=setInterval(()=>{seconds--;$('clock').textContent=`${seconds}s`;if(seconds<=0)fail(true);},1000);scheduleBeep();}
function escapeMarkup(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function statement(question,answer=''){
  if(question.kind==='revision')return `<div class="statement revision-statement">${revisionVisual(question)}<div class="statement-link">${scienceMarkup(removeProvidedUnit(question,question.prompt)).replace('____',answer?`<span class="statement-answer answer-value">${answer}</span>`:'____')}</div></div>`;
  if(question.prompt==='Series or parallel?'){
    const picture=diagram({...question,supply:' ',labels:[' ',' ']}).replace(`aria-label="${question.kind} circuit"`,'aria-label="Circuit to identify"');
    return `<div class="statement circuit-statement">${picture}<div class="statement-link">is a</div>${answer?`<div class="statement-answer">${answer}</div><div class="statement-link">circuit</div>`:''}</div>`;
  }
  let body;
  if(question.kind==='component')body=`<svg viewBox="0 0 240 100" role="img" aria-label="Component symbol"><g stroke="currentColor" stroke-width="3" fill="none">${wiredComponent(120,50,question.component)}</g></svg><div class="statement-link">is the symbol for a</div>`;
  else if(question.kind==='symbol'){
    const unitName=question.prompt.startsWith('Name the unit');
    const quantity=question.prompt.startsWith('What letter');
    const term=quantity?question.prompt.match(/represents (.+)\?/)[1]:question.symbol;
    body=`<div class="statement-link">the</div><div class="statement-term">${unitName?'UNIT':'SYMBOL'}</div><div class="statement-link">for</div><div class="statement-term">${escapeMarkup(term)}</div><div class="statement-link">is</div>`;
  }else body=diagram(question)+`<div class="statement-link">${scienceMarkup(displayCloze(question))}</div>`;
  return `<div class="statement${question.kind==='symbol'?' quantity-statement':''}">${body}${answer?`<div class="statement-answer">${answer}</div>`:''}</div>`;
}
function previewStatements(index){if(levels[index].skill)return '';
  let questions=[];
  if(index<3)questions=introductoryComponents[index].types.map(component=>q('',component,{kind:'component',component}));
  else if(index===3||index===4)return `<div class="statement-grid">${['series','parallel'].map(kind=>statement(q('Series or parallel?',kind,{kind,resistor:index===4}),kind)).join('')}</div>`;
  else if(index>=5&&index<=9){
    const items=[['current','ampere','A'],['voltage','volt','V'],['resistance','ohm','Ω']].slice(0,index<7?2:3);
    questions=items.map(([term,unit,symbol])=>index===9?q(`What letter represents ${term}?`,{current:'I',voltage:'V',resistance:'R'}[term],{kind:'symbol',symbol:'?'}):index%2?q(`Name the unit of ${term}.`,unit,{kind:'symbol',symbol:term}):q(`What is the symbol for ${unit}?`,symbol,{kind:'symbol',symbol:unit}));
  }else if(index===10||index===11)questions=(index===10?['lamp','resistor']:['lamp','resistor','cell']).map(component=>q('',component,{kind:'component',component}));
  return questions.length?`<div class="statement-grid${index===2?' component-review-row':''}">${questions.map(question=>statement(question,referenceAnswer(question))).join('')}</div>`:'';
}
function referenceAnswer(question){
  if(question.kind==='component'&&question.component==='lamp')return 'BULB<span class="answer-alternative">or</span>LAMP';
  if(question.answer==='Ω')return 'Ω<span class="answer-alternative">or</span>OMEGA';
  return `<span class="answer-value">${scienceMarkup(question.answer.replace(/,(?=\d)/g,', '))}</span>`;
}
function correctionAnswer(value,expected){
  if(/^\d+(?:,\d+)+$/.test(expected)){const parts=scientificInput(value).match(/\d+/g)||[],target=expected.split(',');return parts.map((part,i)=>`<span${Number(part)!==Number(target[i])?' class="incorrect-letter"':''}>${escapeMarkup(part)}</span>`).join('<span class="answer-separator">, </span>')||'<span class="incorrect-letter">No answer</span>';}
  const typed=String(value),target=String(expected);
  return [...typed].map((letter,i)=>`<span${letter.toLowerCase()!==target[i]?.toLowerCase()?' class="incorrect-letter"':''}>${escapeMarkup(letter)}</span>`).join('')||'<span class="incorrect-letter">No answer</span>';
}

function correctionLayout(model){
  if(!$('diagram').cloneNode)return statement(current,model?referenceAnswer(current):correctionAnswer($('answer').value,current.answer));
  const copy=$('diagram').cloneNode(true),parts=current.answer.split(',');
  const entry=copy.querySelector('#entry-wrap');
  if(entry){const value=model?current.answer+(expectedAnswerUnit(current)?' '+expectedAnswerUnit(current):''):$('answer').value;entry.innerHTML='<span class="correction-filled">'+scienceMarkup(value||'—')+' <span class="answer-mark">'+(model?'✓':'✗')+'</span></span>';}
  copy.querySelectorAll('.shell-input').forEach((field,i)=>{const span=document.createElement('span');span.className='correction-filled';span.innerHTML=scienceMarkup(model?parts[i]:field.value||'—')+' <span class="answer-mark">'+(model?'✓':'✗')+'</span>';field.replaceWith(span);});
  copy.querySelectorAll('[data-connection]').forEach(button=>{const selected=button.dataset.connection===(model?current.answer:$('answer').value);button.classList.toggle('selected',selected);if(selected)button.textContent+=' '+(model?'✓':'✗');button.disabled=true;});
  copy.querySelectorAll('[id]').forEach(node=>node.removeAttribute('id'));
  return copy.innerHTML;
}
function showRule(solution='',title='New step'){
  if(!solution&&title!=='Rule'){startTimer(false);focus();return;}
  stop();const l=levels[questionLevel],preview=previewStatements(questionLevel),correction=!!solution;
  $('rule-dialog').classList.toggle('statement-card',!!preview||correction);
  $('rule-dialog').classList.toggle('correction-card',correction);
  $('card-title').textContent=correction?`${title}${questionNumber()?' · QUESTION '+questionNumber():''}`:`LEVEL ${enabled.indexOf(questionLevel)+1}`;
  $('card-level').textContent=l.name;$('card-level').hidden=!!preview||correction;
  const explanation=levelExplanation(questionLevel);
  $('example').hidden=!!preview||correction||!explanation;$('example').innerHTML=scienceMarkup(explanation);
  $('card-picture').hidden=false;
  $('card-picture').innerHTML=correction?`<div class="correction-grid"><section>${correctionLayout(false)}<p class="answer-verdict">INCORRECT</p></section><section>${correctionLayout(true)}<p class="answer-verdict">CORRECT</p></section></div>`:preview||cardPicture(questionLevel);
  $('quantity-reference').innerHTML='';
  $('circuit-rules').innerHTML='';
  $('solution').innerHTML=correction?((expectedAnswerUnit(current)?'<p class="unit-warning">UNIT REQUIRED — Include the correct unit and case.</p>':'')+(current.worked?scienceMarkup(current.worked):'')):'';
  $('continue').textContent=correction?(reviewDeck?'Continue ↵':'Try again ↵'):'Start ↵';$('rule-dialog').showModal();
}

function quantityReference(index){
  index-=introductoryComponents.length;
  if(index<2)return '';
  const quantities=[['Current','I','ampere','A',2],['Voltage','V','volt','V',2],['Resistance','R','ohm','Ω',4]];
  const cell=(value,introduced)=>index<introduced
    ? '<td class="rule-locked" aria-label="Symbol revealed in a later level"></td>'
    : `<td${index===introduced?' class="rule-new"':''}>${value}</td>`;
  const rows=quantities.filter(([, , , ,introduced])=>index>=introduced).map(([name,symbol,unit,unitSymbol,introduced])=>`<tr><th scope="row">${name}</th>${cell(symbol,6)}${cell(unit,introduced)}${cell(unitSymbol,introduced+1)}</tr>`).join('');
  return `<table class="circuit-rules-table quantity-reference-table"><caption>Symbols &amp; units</caption><thead><tr><th scope="col">Name</th><th scope="col">Symbol</th><th scope="col">Unit</th><th scope="col">Unit symbol</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function circuitRules(index){
  index-=introductoryComponents.length;
  if(index<0)return '';
  if(index>=2&&index<=5)return '';
  const circuit=kind=>`<th scope="row">${kind==='series'?'Series':'Parallel'}</th><td class="rule-circuit">${diagram(q('',kind,{kind,resistor:index>=1,supply:' ',labels:[' ',' ']}))}</td><td>${kind==='series'?'Single':'Multiple'}</td>`;
  const cell=(introduced,equation,description)=>index<introduced
    ? '<td class="rule-locked" aria-label="Rule revealed in a later level"></td>'
    : `<td${index===introduced?' class="rule-new"':''}><span class="rule-equation">${equation}</span><span class="rule-description">${description}</span></td>`;
  return `<table class="circuit-rules-table circuit-comparison-table"><caption>Series &amp; parallel rules</caption><thead><tr><th scope="col">Name</th><th scope="col">Diagram</th><th scope="col">Branches</th><th scope="col">Current</th><th scope="col">Voltage</th></tr></thead><tbody><tr>${circuit('series')}${cell(9,'I<sub>T</sub> = I<sub>1</sub> = I<sub>2</sub>','Same everywhere')}${cell(17,'V<sub>T</sub> = V<sub>1</sub> + V<sub>2</sub>','Voltage drops add')}</tr><tr>${circuit('parallel')}${cell(14,'I<sub>T</sub> = I<sub>1</sub> + I<sub>2</sub>','Branch currents add')}${cell(16,'V<sub>T</sub> = V<sub>1</sub> = V<sub>2</sub>','Same across each branch')}</tr></tbody></table>${index>=9?'<p class="rule-key">T = total / supply; 1 and 2 label the components or branches.</p>':''}`;
}
function questionInstruction(){
  const type=current.source?.visual?.type;
  const instructions={punnett:current.source?.fields?'Fill in the Punnett square:':current.source?.id==='G3'?'Fill in the missing genotype in the Punnett square:':'Use the Punnett square to complete the statement:',graph:'Use the distance–time graph to find the speed:',weight:'Calculate the weight:',journey:'Calculate the average speed:',forces:'Use the forces shown to complete the statement:',reaction:'Complete the reaction:',circuit:'Find the missing current or voltage:',atom:'Use the isotope cell to complete the statement:',shells:'Complete the electron arrangement:',particle:'State the particle’s charge:'};
  return `${showNumber?(questionNumber()||questionLevel+1)+') ':''}${instructions[type]||'Complete the statement:'}`;
}
function render(){
  const reminder=$('unit-reminder');reminder.hidden=true;reminder.classList.remove('unit-missing');$('game-screen').appendChild(reminder);
  lastQuestionKey=questionKey(current);const circuitType=current.prompt==='Series or parallel?',simple=current.kind==='component'||current.kind==='symbol'||circuitType;
  const entry=$('entry-wrap');$('answer-form').querySelector('.answer-row').prepend(entry);
  $('game-screen').classList.toggle('large-circuit-question',current.source?.visual?.type==='circuit');
  $('answer-suffix').hidden=true;$('game-screen').classList.toggle('statement-question',simple);$('game-screen').classList.toggle('cloze-question',true);
  $('prompt').textContent=questionInstruction();$('prompt').classList.toggle('sr-only',false);
  if(current.source?.choices){const choices=current.source.choices;const shuffled=current.choiceOrder||[...choices];for(let i=current.choiceOrder?0:shuffled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}current.choiceOrder=shuffled;$('diagram').innerHTML=`<div class="cloze-game stacked-cloze${current.source.phys?' phys-choice':''}"><div class="choice-question">${scienceMarkup(current.prompt.replace(/____/g,'…')).replace(/\n/g,'<br>')}</div>${current.source.visual?.type==='svg'?casinoDiagram(current.source.visual):''}<div class="connection-choices" role="group" aria-label="Answer choices">${shuffled.map(value=>`<button type="button" data-connection="${escapeMarkup(value)}">${escapeMarkup(value)}</button>`).join('')}</div></div>`;}
  else if(current.kind==='revision'&&current.source?.visual?.type==='circuit')$('diagram').innerHTML=`<div class="cloze-game diagram-cloze">${casinoDiagram({...current.source.visual,inlineAnswer:true,answerMarkup:clozeSentence(removeProvidedUnit(current,current.prompt),'<span id="cloze-answer-slot"></span>')})}</div>`;
  else if(current.kind==='revision'&&current.source?.id==='F2')$('diagram').innerHTML=`<div class="cloze-game diagram-cloze">${casinoDiagram({...current.source.visual,inlineAnswer:true})}</div>`;
  else if(current.kind==='revision'&&current.source?.visual?.type==='punnett')$('diagram').innerHTML=`<div class="cloze-game punnett-cloze">${casinoDiagram({...current.source.visual,inlineAnswer:true,fields:current.source.fields,answerMarkup:current.source.id==='G3'||current.source.fields?'':clozeSentence(removeProvidedUnit(current,current.prompt),'<span id="cloze-answer-slot"></span>')})}</div>`;
  else if(current.kind==='revision'&&current.source?.id==='A2')$('diagram').innerHTML=`<div class="cloze-game">${casinoDiagram({...current.source.visual,shellInputs:Array.from({length:current.answer.split(',').length},(_,i)=>`<input class="shell-input" data-shell="${i}" form="answer-form" inputmode="numeric" maxlength="2" placeholder="_" aria-label="Electrons in shell ${i+1}" autocomplete="off">`)})}</div>`;
  else if(current.kind==='revision'&&current.source?.id==='L2-6')$('diagram').innerHTML=`<div class="cloze-game stacked-cloze"><div class="large-observation">${scienceMarkup(current.source.visual.observation)}</div><div>The gas is</div><div class="large-science"><span id="cloze-answer-slot"></span></div></div>`;
  else if(current.kind==='revision'&&current.source?.id==='G4')$('diagram').innerHTML=`<div class="cloze-game stacked-cloze"><div>Natural selection depends on</div><div class="large-science">survival</div><div>and</div><div class="large-science"><span id="cloze-answer-slot"></span></div></div>`;
  else if(current.kind==='revision'&&current.source?.id==='G1')$('diagram').innerHTML=`<div class="cloze-game">${casinoDiagram({...current.source.visual,answerMarkup:clozeSentence('This section of DNA is a ____','<span id="cloze-answer-slot"></span>')})}</div>`;
  else if(current.kind==='revision'&&['L2-1','L2-3','L2-11'].includes(current.source?.id))$('diagram').innerHTML=`<div class="cloze-game">${revisionVisual(current)}${clozeSentence({'G1':'This section of DNA is a ____','L2-1':'electrons = ____','L2-3':'formula = ____','L2-11':'v = ____'}[current.source.id],'<span id="cloze-answer-slot"></span>')}</div>`;
  else if(current.kind==='revision'&&current.source?.phys)$('diagram').innerHTML=`<div class="cloze-game phys-cloze">${current.source.visual?.type==='svg'?casinoDiagram(current.source.visual):''}${clozeSentence(removeProvidedUnit(current,current.prompt),'<span id="cloze-answer-slot"></span>')}</div>`;
  else if(current.kind==='revision'&&current.source?.recall)$('diagram').innerHTML=`<div class="cloze-game recall-cloze">${clozeSentence(current.prompt,'<span id="cloze-answer-slot"></span>')}</div>`;
  else if(current.kind==='revision'&&current.source?.id==='G2')$('diagram').innerHTML=`<div class="cloze-game stacked-cloze"><div>The genotype</div><div class="large-science">${scienceMarkup(current.source.visual.alleles)}</div><div>is</div><div class="large-science"><span id="cloze-answer-slot"></span></div></div>`;
  else if(current.kind==='revision'&&current.source?.id==='A3')$('diagram').innerHTML=`<div class="cloze-game stacked-cloze"><div class="large-science">${scienceMarkup(current.source.visual.label)}</div><div>forms by</div><div class="large-science"><span id="cloze-answer-slot"></span></div><div>electrons</div></div>`;
  else if(current.kind==='revision'&&current.source?.id==='A4')$('diagram').innerHTML=`<div class="cloze-game stacked-cloze"><div>${current.source.visual.label==='electron'?'An':'A'} ${current.source.visual.label} has</div><div class="large-science"><span id="cloze-answer-slot"></span></div><div>charge</div></div>`;
  else if(current.kind==='revision'&&current.source?.id==='E1')$('diagram').innerHTML=`<div class="cloze-game stacked-cloze"><div>${current.source.visual.meter==='ammeter'?'An':'A'}</div><div class="large-science">${current.source.visual.meter}</div><div>connects in</div><div class="connection-choices" role="group" aria-label="Meter connection"><button type="button" data-connection="series">SERIES</button><button type="button" data-connection="parallel">PARALLEL</button></div></div>`;
  else if(current.kind==='revision'&&['A1','F1','F3','C4'].includes(current.source?.id))$('diagram').innerHTML=`<div class="cloze-game">${current.source.id==='C4'?'':revisionVisual(current)}${clozeSentence({A1:'neutrons = ____',F1:'F = ____',F3:'v = ____',C4:current.prompt}[current.source.id],'<span id="cloze-answer-slot"></span>')}</div>`;
  else if(current.kind==='revision'&&current.source?.id==='C1')$('diagram').innerHTML=`<div class="cloze-game ph-cloze"><div class="ph-link">A solution with a pH of</div><div class="ph-value">${current.source.visual.value}</div><div class="ph-link">is</div><div class="ph-answer"><span id="cloze-answer-slot"></span></div></div>`;
  else if(current.kind==='revision'&&['C2','C3'].includes(current.source?.id))$('diagram').innerHTML=`<div class="cloze-game reaction-cloze"><div class="reaction-reactants">${current.source.visual.left}</div><div class="reaction-arrow" aria-hidden="true">↓</div>${clozeSentence(current.source.id==='C3'?'salt + water + ____':'salt + ____','<span id="cloze-answer-slot"></span>')}</div>`;
  else if(current.kind==='revision')$('diagram').innerHTML=`<div class="cloze-game">${revisionVisual(current)}${clozeSentence(removeProvidedUnit(current,current.prompt),current.source?.fields?((_,i)=>componentField(current.source.fields[i],i)):'<span id="cloze-answer-slot"></span>')}</div>`;
  else if(circuitType){$('diagram').innerHTML=`<div class="cloze-game">${circuitAnswerDiagram(diagram(current),clozeSentence('The circuit is ____.','<span id="cloze-answer-slot"></span>'))}</div>`;}
  else if(simple){$('diagram').innerHTML=statement(current).replace(/<\/div>$/,`<span id="cloze-answer-slot"></span>${circuitType?'<div class="statement-link">circuit</div>':''}</div>`);}
  else $('diagram').innerHTML=`<div class="cloze-game">${['series','parallel','mixed'].includes(current.kind)?circuitAnswerDiagram(diagram(current),clozeSentence(displayCloze(current),'<span id="cloze-answer-slot"></span>')):diagram(current)+clozeSentence(displayCloze(current),'<span id="cloze-answer-slot"></span>')}</div>`;
  ($('diagram').firstElementChild||$('diagram')).appendChild(reminder);
  if(current.source?.choices||current.source?.fields||['A2','E1'].includes(current.source?.id)){entry.hidden=true;}else{$('cloze-answer-slot').appendChild(entry);entry.hidden=false;}$('unit').textContent='';$('answer').value='';if(current.source?.id!=='A2'&&!current.source?.fields&&current.kind==='revision'&&/^\d+(?:,\d+)+$/.test(current.answer)){entry.hidden=true;$('answer-form').querySelector('.answer-row').prepend(entry);$('cloze-answer-slot').innerHTML=shellFields(current.answer.split(',').length);} if(current.source?.choices||current.source?.id==='E1'){selectConnection(current.choiceOrder?.[0]||'series');document.querySelectorAll('[data-connection]').forEach(button=>button.onclick=()=>selectConnection(button.dataset.connection));}paintAnswer();$('answer').inputMode='text';if(!$('answer-result').textContent)renderAnswerHint();hud();startTimer();focus();
}

function questionKey(question){return JSON.stringify([question.prompt,question.unit,diagram(question)]);}
function freshQuestion(make){
  for(let attempt=0;attempt<24;attempt++){const candidate=make();if(questionKey(candidate)!==lastQuestionKey)return candidate;}
  // Enumerate choices if random draws keep colliding; never hang or return a repeat.
  const choices=[];
  try{while(true){let cursor=0;const sizes=[];forcedChoice=size=>{sizes[cursor]=size;return choices[cursor++]||0;};const candidate=make();if(questionKey(candidate)!==lastQuestionKey)return candidate;let index=sizes.length-1;while(index>=0&&(choices[index]||0)+1>=sizes[index])index--;if(index<0)throw new Error('A level needs more than one distinct question.');choices[index]=(choices[index]||0)+1;choices.length=index+1;}}
  finally{forcedChoice=undefined;}
}
function next(){if(reviewDeck){currentReview=reviewDeck.next();if(!currentReview){finishDeck();return;}position=reviewDeck.progress.position;questionLevel=currentReview.level;current=currentReview.question;}else{questionLevel=enabled[position];current=freshQuestion(levels[questionLevel].make);}attempts=0;render();}
function scientificInput(s){return String(s).normalize('NFKC').replace(/−/g,'-').trim();}
function normalize(s){return scientificInput(s).toLowerCase().replace(/[.,!?;:'"“”‘’]/g,'').replace(/(?<=[a-z])-(?=[a-z])/g,'').replace(/\s+/g,' ');}
function expectedAnswerUnit(question){
  if(question.unit)return question.unit;
  if(question.source?.answerUnit)return question.source.answerUnit;
  if(question.kind!=='revision'||!/^\d+(?:\.\d+)?$/.test(question.answer))return '';
  const cloze=question.source?.cloze||question.prompt;
  return cloze.match(/____\s*(m\/s²|m\/s|N\/kg|kg|N|A|V|m|s|%)(?![A-Za-z])/i)?.[1]||'';
}
function renderAnswerHint(){$('feedback').innerHTML=escapeMarkup(answerHint()).replace(/\s*ENTER/g,'<strong class="enter-key">ENTER</strong>');}
function answerHint(){return 'type an answer and press ENTER';}
function matches(value){
  if(current.source?.phys&&current.source.numeric)return Physics12.checkNumeric(current.source,value)==='ok';
  if(['positive','negative'].includes(current.answer)){const signs={positive:['positive','+','+ve'],negative:['negative','-','-ve']};if(signs[current.answer].includes(scientificInput(value).toLowerCase()))return true;}
  if(current.source?.fields){const expected=current.answer.split(','),parts=scientificInput(value).split(',').map(x=>x.trim());return parts.length===expected.length&&parts.every((x,i)=>current.caseSensitive?x===expected[i]:normalize(x)===normalize(expected[i]));}
  if(/^\d+(?:,\d+)+$/.test(current.answer)){const input=scientificInput(value);if(!/^[\d\s\p{P}]+$/u.test(input))return false;const parts=input.match(/\d+/g)||[],expected=current.answer.split(',');return parts.length===expected.length&&parts.every((part,i)=>Number(part)===Number(expected[i]));}
  const expectedUnit=expectedAnswerUnit(current);
  if(expectedUnit){
    const parsed=scientificInput(value).replace(/[.!?;]+$/,'').match(/^([+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+))\s*(.+)$/);if(!parsed)return false;
    const aliases={A:['A','amp','amps','ampere','amperes'],V:['V','volt','volts'],'Ω':['Ω','ohm','ohms'],N:['N','newton','newtons'],kg:['kg','kilogram','kilograms'],m:['m','metre','metres','meter','meters'],s:['s','second','seconds'],'m/s':['m/s','m s-1','m s^-1','metres per second','meters per second'],'m/s²':['m/s2','m/s^2','m s-2','m s^-2'],'N/kg':['N/kg'],'%':['%','percent','per cent']};
    const unit=parsed[2].trim();return (aliases[expectedUnit]||[scientificInput(expectedUnit)]).includes(unit)&&Math.abs(Number(parsed[1].replace(',','.'))-Number(current.answer))<.005;
  }
  if(current.kind==='revision'&&/^\d+(\.\d+)?$/.test(current.answer)){const n=Number(value.trim());return value.trim()!==''&&Number.isFinite(n)&&Math.abs(n-Number(current.answer))<.005;}
  if(current.caseSensitive)return [current.answer,...(current.aliases||[])].some(a=>scientificInput(a).replace(/\s/g,'')===scientificInput(value).replace(/\s/g,'').replace(/[.,!?;]+$/,''));
  return [current.answer,...(current.aliases||[])].some(a=>/^[A-Z][A-Za-z]*[0-9₂₃₄]/.test(a)?scientificInput(a)===scientificInput(value).replace(/[.,!?;]+$/,''):normalize(a)===normalize(value));
}

function fail(timeout=false){playEffect('wrong');globalThis.CasinoResults?.record(false);stop();attempts++;if(reviewDeck){reviewDeck.answer(false);advanceAfterCorrection=true;}else{correct=0;wrong++;}hud();showRule(current.worked||`${current.prompt} Answer: ${current.answer}${current.unit?' '+current.unit:''}.`,timeout?'Time’s up':'Try again');}
let correctFlashTimer;
function flashCorrect(){
  clearTimeout(correctFlashTimer);$('answer-result').innerHTML=`<span class="submitted-answer">${scienceMarkup($('answer').value)}</span><span class="answer-mark" aria-label="Correct">✓</span>`;renderAnswerHint();
  correctFlashTimer=setTimeout(()=>{$('answer-result').innerHTML='';renderAnswerHint();},800);
}

function completedLevel(completed,advance){if(advance)position++;next();}
$('answer-form').addEventListener('submit',e=>{
  e.preventDefault();if($('roulette-dialog').open)return;
  if(current.source?.phys&&current.source.numeric?Physics12.checkNumeric(current.source,$('answer').value)==='nounit':expectedAnswerUnit(current)&&/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)\s*[.!?;]*$/.test(scientificInput($('answer').value))){
    clearTimeout(correctFlashTimer);renderAnswerHint();
    const reminder=$('unit-reminder');reminder.hidden=false;reminder.classList.remove('unit-missing');void reminder.offsetWidth;reminder.classList.add('unit-missing');focus();return;
  }
  $('unit-reminder').hidden=true;
  if(!matches($('answer').value)){fail();return;}
  globalThis.CasinoResults?.record(true);
  playEffect('correct');flashCorrect();stop();score+=attempts?5:10;correct++;wrong=0;rouletteCorrectCount++;hud();
  if(reviewDeck)reviewDeck.answer(true);
  const levelFinished=!reviewDeck&&correct===(levels[questionLevel].correctTarget||3),completed=questionLevel,advance=position<enabled.length-1;
  if(levelFinished){correct=0;needsLevelCard=false;}
  const proceed=()=>{if(levelFinished)completedLevel(completed,advance);else{next();if(needsLevelCard){needsLevelCard=false;showRule();}}};
  if(rouletteCorrectCount>=rouletteTarget){rouletteCorrectCount=0;if($('roulette-enabled').checked&&score>0){rouletteTarget=10;hud();openRoulette(proceed);return;}hud();}
  proceed();
});
$('continue').addEventListener('click',()=>{if($('continue').textContent==='Start ↵')playEffect('level');});
$('rule-dialog').addEventListener('close',()=>{if(screen!=='game')return;if(advanceAfterCorrection){advanceAfterCorrection=false;next();return;}if(wrong>=3){wrong=0;if(position>0){position--;needsLevelCard=true;}}render();});
$('chapter-dialog').addEventListener('close',()=>{if(screen==='game')showRule('','Level up');});
$('learn').onclick=()=>showRule('','Rule');$('timed').onchange=()=>{if($('timed').checked)unlockAudio();if(!$('rule-dialog').open&&!$('settings-dialog').open)startTimer();};
$('settings').onclick=()=>{returnToPreferences=true;$('preferences-dialog').close();stop();$('level-options').innerHTML=levels.map((l,i)=>({l,i})).filter(({l,i})=>curriculumUnits.length?(selectedUnit==='circuit_extension'?i<circuitLevelCount:l.unit===selectedUnit):true).map(({l,i})=>`<label><input type="checkbox" value="${i}" ${enabled.includes(i)?'checked':''}>${i+1}. ${l.name}</label>`).join('');$('settings-dialog').showModal();};
$('all').onclick=()=>document.querySelectorAll('#level-options input').forEach(el=>el.checked=true);
$('calculations').onclick=()=>document.querySelectorAll('#level-options input').forEach(el=>{const l=levels[Number(el.value)];el.checked=l.skill?l.make().answer.match(/^\d+(\.\d+)?$/)!==null:Number(el.value)>=12;});
$('save-settings').onclick=()=>{const selection=[...document.querySelectorAll('#level-options input:checked')].map(el=>Number(el.value));if(!selection.length){$('save-settings').textContent='Choose at least one step';return;}saveRun();needsLevelCard=false;enabled=selection;position=0;correct=wrong=score=rouletteCorrectCount=0;rouletteTarget=3;highestLevel=enabled[0]+1;current=levels[enabled[0]].make();returnToPreferences=false;$('settings-dialog').close();if(screen==='game'){activeRun=true;resetReviewDeck();next();showRule();}else{hud();showMenu();}};
$('settings-dialog').addEventListener('close',()=>{if(returnToPreferences){returnToPreferences=false;$('preferences-dialog').showModal();stop();return;}if(screen==='game'&&!$('rule-dialog').open){startTimer();focus();}else if(screen==='menu'){selectMenu(menuIndex);}});
function applyTheme(theme){document.documentElement.dataset.theme=theme;}
const themes=['paper','terminal','amber','ice','mono'];
try{const saved=localStorage.getItem('circuit-blaster-theme');$('theme').value=themes.includes(saved)?saved:'terminal';}catch{$('theme').value='terminal';}
applyTheme($('theme').value);
$('theme').onchange=()=>{applyTheme($('theme').value);try{localStorage.setItem('circuit-blaster-theme',$('theme').value);}catch{}focus();};

function enterFullscreen(){
  if(document.fullscreenElement||!document.documentElement.requestFullscreen)return;
  try{return document.documentElement.requestFullscreen().catch(()=>{});}catch{}
}
function updateFullscreen(){
  $('fullscreen').textContent=document.fullscreenElement?'Exit fullscreen':'Fullscreen';
}
$('fullscreen').hidden=!document.documentElement.requestFullscreen;
$('fullscreen').onclick=()=>{
  if(document.fullscreenElement){try{document.exitFullscreen().catch(()=>{});}catch{}}
  else enterFullscreen();
};
document.addEventListener('fullscreenchange',updateFullscreen);
updateFullscreen();

function menuButtons(){return menuIds.map($).filter(button=>button&&!button.hidden&&!button.disabled);}
function selectMenu(index,sound=''){const buttons=menuButtons();if(!buttons.length)return;const previous=menuIndex;menuIndex=(index+buttons.length)%buttons.length;if(sound&&menuIndex!==previous)playEffect(sound);buttons.forEach((button,i)=>{button.classList.toggle('selected',i===menuIndex);button.tabIndex=i===menuIndex?0:-1;});buttons[menuIndex].focus();}
function showMenu(){screen='menu';stop();document.documentElement.dataset.screen='menu';$('game-screen').hidden=true;$('menu-screen').hidden=false;$('start-game').textContent=activeRun?'RESUME':'START';$('finish-run').hidden=!activeRun;selectMenu(0);}
function startGame(){if(!enabled.length)return;
  unlockAudio();startMusic();
  const fullscreen=enterFullscreen();
  if(fullscreen)fullscreen.then(beginGame);
  else beginGame();
}
function beginGame(){const resume=activeRun;screen='game';document.documentElement.dataset.screen='game';$('game-screen').hidden=false;$('menu-screen').hidden=true;if(resume){hud();startTimer(false);focus();return;}activeRun=true;needsLevelCard=false;levels.filter(l=>l.unit===selectedUnit).forEach(l=>l.reset?.());position=correct=wrong=score=rouletteCorrectCount=0;rouletteTarget=3;highestLevel=enabled[0]+1;resetReviewDeck();next();showRule();}
function readScores(){try{const saved=JSON.parse(localStorage.getItem('circuit-blaster-scores')||'[]');return Array.isArray(saved)?saved.filter(r=>Number.isFinite(r.score)&&r.score>0&&Number.isInteger(r.level)&&Number.isInteger(r.steps)&&r.steps>0).slice(0,10):[];}catch{return [];}}
function saveRun(){if(!activeRun)return;activeRun=false;if(score<=0)return;const rows=readScores();rows.push({score,unit:selectedUnit,level:highestLevel,steps:enabled.length,timed:$('timed').checked,date:Date.now()});rows.sort((a,b)=>b.score-a.score||b.level-a.level);try{localStorage.setItem('circuit-blaster-scores',JSON.stringify(rows.slice(0,10)));}catch{}}
function showLeaderboard(){const rows=readScores();$('leaderboard-rows').innerHTML=rows.length?'<table><thead><tr><th>RANK</th><th>BANK</th><th>UNIT</th><th>STEP</th><th>MODE</th></tr></thead><tbody>'+rows.map((r,i)=>`<tr><td>${String(i+1).padStart(2,'0')}</td><td>$${String(r.score).padStart(6,'0')}</td><td>${escapeMarkup(r.unit||'Circuits')}</td><td>${r.level}</td><td>${r.timed?'TIMED':'FREE'} · ${r.steps} STEPS</td></tr>`).join('')+'</tbody></table>':'<p class="empty-score">NO SCORES YET. THE HOUSE IS OPEN. PICK A UNIT.</p>';$('leaderboard-dialog').showModal();}
$('menu').onclick=()=>showMenu();$('start-game').onclick=startGame;
$('menu-leaderboard').onclick=showLeaderboard;$('menu-settings').onclick=()=>$('preferences').onclick();
$('finish-run').onclick=()=>{saveRun();showMenu();showLeaderboard();};
$('leaderboard-dialog').addEventListener('close',()=>selectMenu(menuIndex));
menuIds.forEach((id,index)=>{ $(id).addEventListener('pointerenter',()=>{if(!$(id).hidden)selectMenu(index,index>menuIndex?'menuDown':'menuUp');}); });
document.addEventListener('keydown',event=>{
  const panel=activeMenuPanel();
  if(panel){navigatePanel(panel,event);return;}
  if(screen==='game'){if(event.key==='Escape'){event.preventDefault();showMenu();}else routeAnswerKey(event);return;}
  if(['ArrowDown','ArrowRight','ArrowUp','ArrowLeft'].includes(event.key)){event.preventDefault();const down=['ArrowDown','ArrowRight'].includes(event.key);selectMenu(menuIndex+(down?1:-1),down?'menuDown':'menuUp');}
  else if(event.key==='Enter'){event.preventDefault();const buttons=menuButtons();if(buttons.length)buttons[menuIndex%buttons.length].click();}
});
current=levels[enabled[0]].make();hud();showMenu();

function unlockAudio(){try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;audioContext ||= new Audio();if(audioContext.state==='suspended')audioContext.resume().catch(()=>{});}catch{}}
function playEffect(kind,delay=0){
  if(!$('sound').checked)return;
  unlockAudio();if(!audioContext)return;
  const patterns={
    type:[[88,0,.035]],
    correct:[[72,0,.09],[76,.09,.09],[84,.18,.16]],
    wrong:[[48,0,.14],[43,.14,.22]],
    menuUp:[[84,0,.045]],menuDown:[[79,0,.045]],
    rouletteBet:[[76,0,.035],[83,.04,.04]],
    rouletteStart:[[48,0,.07],[55,.07,.07],[60,.14,.1]],
    rouletteTick:[[91,0,.018]],
    rouletteSettle:[[67,0,.045],[55,.05,.09]],
    rouletteWin:[
      [60,0,.12],[72,0,.12],[64,.12,.12],[76,.12,.12],
      [67,.24,.12],[79,.24,.12],[72,.36,.14],[84,.36,.14],
      [79,.5,.1],[84,.6,.1],[88,.7,.1],[91,.8,.1],
      [72,.94,.55],[76,.94,.55],[79,.94,.55],[96,.94,.55]
    ],
    rouletteLose:[
      [60,0,.18],[61,0,.18],[59,.2,.14],[58,.34,.14],
      [55,.48,.16],[51,.64,.18],[48,.82,.2],
      [36,1.04,.65],[42,1.04,.65],[47,1.04,.65]
    ],
    level:[[69,0,.08],[76,.08,.08],[81,.16,.1],[88,.26,.22]]
  };
  const notes=patterns[kind]||patterns.type;
  try{for(const [note,offset,duration] of notes){
    const now=audioContext.currentTime+delay+offset,osc=audioContext.createOscillator(),gain=audioContext.createGain();
    osc.type=kind==='rouletteTick'?'triangle':'square';osc.frequency.value=440*Math.pow(2,(note-69)/12);
    gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(kind==='rouletteTick'?.012:kind==='type'?.014:.025,now+.003);
    gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
    osc.connect(gain);gain.connect(audioContext.destination);osc.onended=()=>{osc.disconnect();gain.disconnect();};
    osc.start(now);osc.stop(now+duration+.01);
  }}catch{}
}
try{$('sound').checked=localStorage.getItem('circuit-blaster-sound')!=='off';}catch{$('sound').checked=true;}
$('sound').onchange=()=>{try{localStorage.setItem('circuit-blaster-sound',$('sound').checked?'on':'off');}catch{}if($('sound').checked)unlockAudio();};
$('answer').addEventListener('input',event=>{if(event.inputType?.startsWith('insert')&&!event.isComposing)playEffect('type');});

const {chipThemes,chipChords,chipSections}=CircuitTune;
const musicComposer=new CircuitComposer(CircuitTune);
let composedSection;
function chipNote(note,type,volume,duration,offset=0,slide=0){
  if(!note)return;
  const now=audioContext.currentTime+offset,osc=audioContext.createOscillator(),gain=audioContext.createGain();
  osc.type=type;osc.frequency.value=440*Math.pow(2,(note-69)/12);
  if(slide){osc.frequency.setValueAtTime(osc.frequency.value,now);osc.frequency.exponentialRampToValueAtTime(slide,now+duration);}
  gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(volume,now+.004);
  gain.gain.setValueAtTime(volume,now+duration*.5);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
  osc.connect(gain);gain.connect(audioContext.destination);musicVoices.add(osc);
  osc.onended=()=>{musicVoices.delete(osc);osc.disconnect();gain.disconnect();};
  osc.start(now);osc.stop(now+duration+.01);
}
function playMusicStep(step){
  const bar=Math.floor(step/8),beat=step%8,phrase=bar%8;
  const sectionIndex=Math.floor(bar/8);
  const endless=$('music-mode').value!=='original';
  if(endless&&(!composedSection||composedSection.index!==sectionIndex)){
    composedSection={index:sectionIndex,...musicComposer.nextSection()};
  }
  const section=endless?composedSection:chipSections[sectionIndex%chipSections.length];
  const melody=section.melody||chipThemes[section.theme];
  const chord=chipChords[section.chords[phrase]],lead=melody[phrase][beat];
  // Ease away at the end so the return to the opening feels deliberate.
  const energy=section.outro&&phrase>=6?1:section.energy;
  chipNote(lead,'square',.011,.19);
  if(beat%2===0)chipNote(chord[0]+(beat===4?12:0),'triangle',.032,energy>=2?.22:.36);
  if(energy>=1){
    if(beat===0||beat===4)chipNote(43,'sine',.04,.13,0,38); // swept kick
    chipNote(114,'square',beat%2?.002:.003,.025); // crisp chip hi-hat
  }
  if(energy>=2){
    const order=section.arp||[0,1,2,1];
    chipNote(chord[order[beat%4]]+24,'triangle',.013,.11);
    if(energy>=4)chipNote(chord[order[(beat+1)%4]]+36,'triangle',.008,.09,.125);
  }
  if(energy>=3&&(beat===2||beat===6)){
    chipNote(68,'triangle',.018,.075,0,110); // descending snare body
    chipNote(106,'square',.003,.045);
  }
  if(section.harmony&&energy>=3&&lead&&beat%2===0){
    chipNote(chord[(beat/2)%3]+36,'triangle',.009,.28);
  }
  if(energy>=4&&phrase===7&&beat>=4){
    chipNote(chipThemes[3][phrase][beat],'triangle',.006,.09,.125);
  }
  if(energy>=3&&phrase%4===3&&beat>=6){
    chipNote(beat===6?62:57,'triangle',.018,.085,0,65);
    chipNote(beat===6?59:55,'triangle',.013,.075,.125,55);
  }
}
// A separate 16-bar casino theme: bouncing bass, minor melody and bright arpeggios.
let rouletteMusicStep=0;
const rouletteChords=[[50,53,57],[55,58,62],[57,61,64],[50,53,57],[46,50,53],[55,58,62],[57,61,64],[50,53,57]];
const rouletteMelody=[
  [74,0,77,76,74,0,69,72],[79,0,82,81,79,77,74,0],
  [81,0,85,84,81,79,76,73],[74,77,81,0,77,76,74,0],
  [77,0,74,72,70,0,74,77],[79,0,77,74,70,74,77,0],
  [73,76,81,0,85,84,81,73],[74,0,77,76,74,69,74,0]
];
function playRouletteMusicStep(step){
  const bar=Math.floor(step/8)%16,beat=step%8,chord=rouletteChords[bar%8];
  const lead=rouletteMelody[bar%8][beat],second=bar>=8;
  chipNote(lead,'square',.01,.14);
  if(beat%2===0)chipNote(chord[beat===4?2:0]-(beat===4?0:12),'triangle',.026,.18);
  if(beat%2===1)chipNote(chord[1]+12,'triangle',.009,.1);
  chipNote(chord[[0,2,1,2][beat%4]]+(second?24:12),'triangle',.008,.09);
  if(second&&lead&&beat%2===0)chipNote(chord[1]+24,'triangle',.006,.16);
  if(beat===0||beat===4)chipNote(43,'sine',.025,.09,0,38);
  chipNote(112,'square',beat%2?.0015:.002,.02);
  if(beat===2||beat===6)chipNote(68,'triangle',.01,.05,0,110);
}
function stopMusic(){
  clearTimeout(musicTimer);musicTimer=undefined;
  for(const voice of musicVoices){try{voice.stop();}catch{}}
  musicVoices.clear();
}
function startMusic(){
  if(musicEffectPause||musicTimer!==undefined||!$('music').checked||document.hidden||!audioContext)return;
  const tick=()=>{
    if(!$('music').checked||document.hidden){stopMusic();return;}
    try{
      if($('roulette-dialog').open)playRouletteMusicStep(rouletteMusicStep++);
      else playMusicStep(musicStep++);
    }catch{}
    musicTimer=setTimeout(tick,$('roulette-dialog').open?200:250);
  };
  tick();
}
try{$('music').checked=localStorage.getItem('circuit-blaster-music')!=='off';}catch{$('music').checked=true;}
$('music').onchange=()=>{
  try{localStorage.setItem('circuit-blaster-music',$('music').checked?'on':'off');}catch{}
  if($('music').checked){unlockAudio();startMusic();}else stopMusic();
};
try{$('music-mode').value=localStorage.getItem('circuit-blaster-music-mode')==='original'?'original':'endless';}catch{$('music-mode').value='endless';}
$('music-mode').onchange=()=>{
  try{localStorage.setItem('circuit-blaster-music-mode',$('music-mode').value);}catch{}
  stopMusic();musicStep=0;composedSection=undefined;musicComposer.reset();unlockAudio();startMusic();
};
document.addEventListener('pointerdown',()=>{unlockAudio();startMusic();});
document.addEventListener('keydown',()=>{unlockAudio();startMusic();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopMusic();else startMusic();});

function scheduleBeep(){if(!audioContext||screen!=='game'||!activeRun||!$('timed').checked||seconds<=0)return;try{const now=audioContext.currentTime,oscillator=audioContext.createOscillator(),gain=audioContext.createGain();oscillator.type='square';oscillator.frequency.value=seconds<=5?880:660;gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.018,now+.004);gain.gain.exponentialRampToValueAtTime(.0001,now+.055);oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.start(now);oscillator.stop(now+.06);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};}catch{}const delay=120+1080*Math.pow(seconds/30,2);beepTimer=setTimeout(scheduleBeep,delay);}

function paintAnswer(){
  const input=$('answer'),value=input.value,caret=input.selectionStart??value.length;
  const fontSize=typeof getComputedStyle==='function'?parseFloat(getComputedStyle($('answer-slots')).fontSize)||36:36;
  const cellWidth=$('character-measure').getBoundingClientRect?.()?.width||fontSize*.5;
  const capacity=Math.max(1,Math.floor(($('entry-wrap').clientWidth||cellWidth*8)/cellWidth));
  const count=Math.min(capacity,Math.max(1,value.length+1));
  const offset=Math.max(0,caret-count+1);
  const escape=character=>character.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  $('answer-slots').innerHTML=Array.from({length:count},(_,slot)=>{const index=offset+slot;return `<span class="entry-slot${index===caret?' cursor':''}">${index<value.length?escape(value[index]):'_'}</span>`;}).join('');
}
for(const event of ['input','keyup','click','select','focus'])$('answer').addEventListener(event,paintAnswer);
paintAnswer();
if(typeof ResizeObserver!=='undefined')new ResizeObserver(paintAnswer).observe($('entry-wrap'));
if(document.fonts)document.fonts.ready.then(paintAnswer);

// Fixed, fully labelled examples match the text on each level card.
function cardPicture(index){if(levels[index].skill)return `<div class="revision-rule">${scienceMarkup(levels[index].rule)}</div>`;
  if(index<introductoryComponents.length){
    const items=introductoryComponents[index].types;
    return referencePicture(items.map((type,i)=>{const x=(i+.5)*600/items.length;return wiredComponent(x,70,type)+`<text x="${x}" y="134">${type}</text>`;}).join(''),'Component symbols with connecting wires');
  }
  index-=introductoryComponents.length;
  if(index>=2&&index<=6){
    const items=[['Current','I','ampere','A'],['Voltage','V','volt','V'],['Resistance','R','ohm','Ω']].slice(0,index<4?2:3);
    return referencePicture(items.map(([name,symbol,unit,unitSymbol],i)=>{const x=(i+.5)*600/items.length;const value=index===6?symbol:index%2===0?unit:unitSymbol;return `<text x="${x}" y="36">${name}</text><text class="reference-value" x="${x}" y="92">${value}</text><text x="${x}" y="134">${index===6?'quantity symbol':index%2===0?'unit name':'unit symbol'}</text>`;}).join(''),'Quantity and unit reference');
  }
  if(index>=7)index-=2;
  if(index<2){const resistor=index===1;return '<div class="picture-pair">'+['series','parallel'].map(kind=>`<figure>${diagram(q('',kind,{kind,resistor,supply:' ',labels:[' ',' ']}))}<figcaption>${kind.toUpperCase()}</figcaption></figure>`).join('')+'</div>';}
  if(index<5){const all=[['Current','I','A'],['Voltage','V','V'],['Resistance','R','Ω']];const items=index===2?all.slice(0,2):all;return referencePicture(items.map(([name,symbol,unit],i)=>{const x=(i+.5)*600/items.length;return `<text x="${x}" y="36">${name}</text><text class="reference-value" x="${x}" y="92">${index===4?symbol:unit}</text><text x="${x}" y="134">${index===4?'quantity symbol':symbol+' measured in '+unit}</text>`;}).join(''),'Quantity and unit reference');}
  if(index<7){const items=index===5?['lamp','resistor']:['lamp','resistor','cell'];return referencePicture(items.map((type,i)=>{const x=(i+.5)*600/items.length;return wiredComponent(x,70,type)+`<text x="${x}" y="134">${type}</text>`;}).join(''),'Lamp, resistor and cell symbols');}
  const examples=[
    {labels:['I₁ = 2 A','I₂ = 2 A']},
    {labels:['I₁ = 4 A','I₂ = 4 A']},
    {labels:['I₁ = 3 A','I₂ = 3 A']},
    {count:3,labels:['I₁ = 2 A','I₂ = 2 A','I₃ = 2 A']},
    {count:1,supply:'6 V',labels:['V = 6 V']},
    {kind:'parallel',supply:'I = 5 A',labels:['I₁ = 2 A','I₂ = 3 A']},
    {kind:'parallel',supply:'I = 5 A',labels:['I₁ = 2 A','I₂ = 3 A']},
    {kind:'parallel',supply:'6 V',labels:['V₁ = 6 V','V₂ = 6 V']},
    {supply:'6 V',labels:['V₁ = 2 V','V₂ = 4 V']},
    {supply:'6 V',labels:['V₁ = 2 V','V₂ = 4 V']},
    {count:1,resistor:true,supply:'6 V',labels:['R = 3 Ω','I = 2 A']},
    {count:1,resistor:true,supply:'6 V',labels:['R = 3 Ω','I = 2 A']},
    {count:1,resistor:true,supply:'6 V',labels:['R = 3 Ω','I = 2 A']},
    {resistor:true,labels:['2 Ω','3 Ω'],supply:'Rtotal = 5 Ω'},
    {resistor:true,labels:['1 Ω','2 Ω'],supply:'6 V · I = 2 A'},
    {kind:'parallel',resistor:true,labels:['6 Ω','3 Ω'],supply:'Rtotal = 2 Ω'},
    {kind:'parallel',resistor:true,labels:['3 Ω · 2 A','6 Ω · 1 A'],supply:'6 V · I = 3 A'},
    {kind:'mixed',resistor:true,labels:['6 Ω','6 Ω','2 Ω'],supply:'10 V · I = 2 A'},
  ];
  return diagram(q('',0,examples[index-7]));
}
function referencePicture(content,label){return `<svg viewBox="0 0 600 160" role="img" aria-label="${label}"><g stroke="currentColor" stroke-width="3" fill="none" text-anchor="middle">${content}</g></svg>`;}

function levelExplanation(index){if(levels[index].skill)return levels[index].example;
  if(index<introductoryComponents.length)return introductoryComponents[index].rule;
  index-=introductoryComponents.length;
  if(index>=2&&index<=6)return [
    'Current is measured in amperes. Voltage is measured in volts.',
    'The unit symbol for ampere is A. The unit symbol for volt is V.',
    'Resistance is measured in ohms. Current is measured in amperes and voltage in volts.',
    'The unit symbol for ohm is Ω. Ampere is A and volt is V.',
    'The quantity symbols are I for current, V for voltage and R for resistance.'
  ][index-2];
  if(index>=7)index-=2;
  return [
  '',
  'The number of paths determines the circuit type. A series circuit has one path, while a parallel circuit has separate branches. This stays true whether the components are lamps or resistors.',
  'Current is measured in amperes, written as A. Voltage is measured in volts, written as V. A current of 3 amperes is written as 3 A, while a voltage of 3 volts is written as 3 V.',
  'Current is measured in amperes (A), voltage in volts (V), and resistance in ohms (Ω). For example, a voltage of 12 volts is written as 12 V.',
  'The letter I represents current, V represents voltage, and R represents resistance. The expression I = 2 A means that the current is 2 amperes.',
  'A lamp is drawn as a circle with a cross inside it. A resistor is drawn as a rectangle. Identify the component from its symbol.',
  'A lamp is drawn as a circle with a cross, and a resistor as a rectangle. A cell is drawn as two parallel lines of different lengths.',
  'The current is the same everywhere in a series circuit. If lamp 1 carries 2 A, lamp 2 also carries 2 A.',
  'Changing the current does not change the series rule. If lamp 1 carries 4 A, lamp 2 must also carry 4 A.',
  'You can use the current at either lamp to find the current at the other. If lamp 2 carries 3 A, lamp 1 also carries 3 A.',
  'Adding another lamp does not change the current along a series circuit. If one lamp carries 2 A, all three lamps carry 2 A.',
  'When a circuit has just one lamp, the voltage across it equals the supply voltage. A 6 V supply gives a voltage of 6 V across the lamp.',
  'In a parallel circuit, the supply current equals the sum of the branch currents. If the branches carry 2 A and 3 A, the supply current is 5 A.',
  'To find a missing branch current, subtract the known branch current from the supply current. If the supply current is 5 A and one branch carries 2 A, the other carries 3 A.',
  'Each parallel branch has the same voltage as the supply. With a 6 V supply, the voltage across each branch is 6 V.',
  'The voltage drops across components in series add up to the supply voltage. If two components have voltage drops of 2 V and 4 V, the supply voltage is 6 V.',
  'To find a missing voltage drop in series, subtract the known drop from the supply voltage. With a 6 V supply and a known drop of 2 V, the missing drop is 4 V.',
  'Ohm’s law gives voltage as current multiplied by resistance. A current of 2 A through a resistance of 3 Ω gives a voltage of 6 V.',
  'To find current using Ohm’s law, divide voltage by resistance. A voltage of 6 V across a resistance of 3 Ω produces a current of 2 A.',
  'To find resistance using Ohm’s law, divide voltage by current. A voltage of 6 V and a current of 2 A give a resistance of 3 Ω.',
  'Resistances in series add together. A 2 Ω resistor and a 3 Ω resistor in series have a total resistance of 5 Ω.',
  'First add the series resistances, then divide the supply voltage by the total resistance. A 6 V supply across 1 Ω and 2 Ω in series gives a current of 2 A.',
  'For two resistors in parallel, multiply their resistances and divide by their sum. Resistors of 6 Ω and 3 Ω have a total resistance of 2 Ω.',
  'Each parallel branch gets the full supply voltage. Use Ohm’s law to find each branch current, then add them. With a 6 V supply, a 3 Ω branch carries 2 A and a 6 Ω branch carries 1 A, giving 3 A in total.',
  'First combine the parallel resistances, then add the series resistance. Two 6 Ω resistors in parallel give 3 Ω; adding a 2 Ω series resistor gives 5 Ω. A 10 V supply then produces a current of 2 A.'
][index];}

// Single-zero roulette after every ten correct answers, independent of level changes.
const rouletteWheel=[0,32,15,19,4,21,2,25,17,34,6,27,13,36,11,30,8,23,10,5,24,16,33,1,20,14,31,9,22,18,29,7,28,12,35,3,26];
const rouletteRed=new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
function rouletteColour(n){return n===0?'green':rouletteRed.has(n)?'red':'black';}
let rouletteProceed,rouletteSpinning=false,roulettePlayed=false,rouletteSelectedColour='red';
function playRouletteResult(win){
  if($('sound').checked){
    stopMusic();musicEffectPause=true;
  }
  playEffect('rouletteSettle');playEffect(win?'rouletteWin':'rouletteLose',.16);
}
function selectRouletteColour(colour){if(rouletteSpinning||roulettePlayed)return;if(colour!==rouletteSelectedColour)playEffect('rouletteBet');rouletteSelectedColour=colour;for(const c of ['red','black','green'])$('bet-'+c).setAttribute?.('aria-pressed',String(c===colour));}
for(const colour of ['red','black','green'])$('bet-'+colour).onclick=()=>selectRouletteColour(colour);
function paintRoulette(index,total=1,stopAngle=0,target=0){
  const step=360/rouletteWheel.length;
  if(index===0){
    // Draw on a four-unit grid so curved edges have deliberate pixel steps.
    const pixelDisc=(radius,inner=0)=>{let path='';for(let y=10;y<410;y+=4)for(let x=10;x<410;x+=4){const r=Math.hypot(x+2-210,y+2-210);if(r<=radius&&r>=inner)path+=`M${x} ${y}h4v4h-4z`;}return path;};
    const cells=rouletteWheel.map(()=>[]);
    for(let y=26;y<394;y+=4)for(let x=26;x<394;x+=4){const dx=x+2-210,dy=y+2-210,r=Math.hypot(dx,dy);if(r<122||r>184)continue;const angle=(Math.atan2(dx,-dy)*180/Math.PI+360)%360;const pocket=Math.round(angle/step)%37;cells[pocket].push(`M${x} ${y}h4v4h-4z`);}
    const pockets=rouletteWheel.map((n,i)=>`<g class="pocket-${rouletteColour(n)}"><path class="wheel-sector" d="${cells[i].join('')}"/><text class="wheel-number" x="210" y="54" text-anchor="middle" dominant-baseline="middle" transform="rotate(${i*step} 210 210)">${n}</text></g>`).join('');
    $('roulette-wheel').innerHTML=`<svg class="roulette-disc" viewBox="0 0 420 420"><path class="wheel-rim" d="${pixelDisc(198)}"/><g id="roulette-rotor">${pockets}<path class="wheel-inner" d="${pixelDisc(120)}"/><path class="wheel-inner-ring" d="${pixelDisc(106,102)}"/><path class="wheel-spoke" d="M206 110h8v200h-8z M110 206h200v8H110z"/><path class="wheel-hub" d="${pixelDisc(30)}"/></g><g id="roulette-ball-orbit"><path class="wheel-ball" d="M206 30h8v4h4v8h-4v4h-8v-4h-4v-8h4z"/></g></svg>`;
  }
  const progress=Math.min(1,index/total),ease=1-Math.pow(1-progress,2);
  const wheelAngle=(stopAngle-720-target*step)*ease,ballAngle=(1080+stopAngle)*ease;
  $('roulette-rotor').setAttribute?.('style',`transform:rotate(${wheelAngle}deg)`);
  $('roulette-ball-orbit').setAttribute?.('style',`transform:rotate(${ballAngle}deg)`);
}
function updateRouletteBet(){$('roulette-bet-value').textContent=`$${$('roulette-bet').value}`;}
$('roulette-bet').addEventListener('input',updateRouletteBet);
let roulettePointsTimer;
function animateRoulettePoints(from,to){
  clearTimeout(roulettePointsTimer);
  const delta=to-from,change=$('roulette-points-change');
  change.textContent=`${delta>=0?'+':'-'}$${Math.abs(delta)}`;
  change.setAttribute?.('data-direction',delta>=0?'gain':'loss');
  let frame=0;
  function count(){
    const progress=frame/30,value=Math.round(from+(to-from)*(1-Math.pow(1-progress,3)));
    $('roulette-bank').textContent=`BANK: $${value}`;
    $('score').textContent=`BANK $${String(value).padStart(6,'0')}`;
    if(frame===30){roulettePointsTimer=undefined;$('roulette-continue').disabled=false;return;}
    frame++;roulettePointsTimer=setTimeout(count,30);
  }
  count();
}
function openRoulette(proceed){stop();rouletteProceed=proceed;roulettePlayed=false;rouletteSpinning=false;$('roulette-points-change').textContent='';$('roulette-points-change').setAttribute?.('data-direction','');$('roulette-bank').textContent=`BANK: $${score}`;$('roulette-bet').max=String(score);$('roulette-bet').value=String(Math.min(10,score));updateRouletteBet();$('roulette-result').textContent='Place a bet or skip.';$('roulette-spin').disabled=false;$('roulette-bet').disabled=false;$('roulette-colour').disabled=false;$('roulette-continue').disabled=false;$('roulette-continue').textContent='Skip ↵';paintRoulette(0);$('roulette-dialog').showModal();stopMusic();musicEffectPause=false;rouletteMusicStep=0;startMusic();}
$('roulette-form').addEventListener('submit',e=>{e.preventDefault();if(rouletteSpinning||roulettePlayed||!$('roulette-dialog').open)return;const stake=Number($('roulette-bet').value),colour=rouletteSelectedColour;if(!Number.isInteger(stake)||stake<1||stake>score||!['red','black','green'].includes(colour)){$('roulette-result').textContent=`Bet a whole dollar amount from $1 to $${score}.`;return;}
  const target=Math.floor(Math.random()*37),stopAngle=Math.random()*360,steps=74+target,bankBefore=score;let frame=0;rouletteSpinning=true;roulettePlayed=true;score-=stake;hud();$('roulette-spin').disabled=true;$('roulette-bet').disabled=true;$('roulette-colour').disabled=true;$('roulette-continue').disabled=true;$('roulette-result').textContent='SPINNING…';playEffect('rouletteStart');
  function spin(){paintRoulette(frame,steps,stopAngle,target);if(frame<steps&&(frame%2===0||frame>=steps-15))playEffect('rouletteTick');if(frame===steps){const n=rouletteWheel[target],landed=rouletteColour(n),win=landed===colour,payout=win?stake*(colour==='green'?50:3):0;score+=payout;hud();playRouletteResult(win);rouletteSpinning=false;animateRoulettePoints(bankBefore,score);$('roulette-result').textContent='';$('roulette-continue').textContent='Continue ↵';return;}frame++;setTimeout(spin,frame<steps-15?25:35+(frame-(steps-15))*12);}
  spin();
});
$('roulette-continue').onclick=()=>{if(!rouletteSpinning&&!$('roulette-continue').disabled)$('roulette-dialog').close();};
$('roulette-dialog').addEventListener('cancel',e=>{if(rouletteSpinning)e.preventDefault();});
$('roulette-dialog').addEventListener('close',()=>{clearTimeout(roulettePointsTimer);roulettePointsTimer=undefined;hud();stopMusic();musicEffectPause=false;startMusic();const proceed=rouletteProceed;rouletteProceed=undefined;if(proceed)proceed();});
try{$('roulette-enabled').checked=localStorage.getItem('circuit-blaster-roulette')!=='off';}catch{}
$('roulette-enabled').onchange=()=>{renderCasinoProgress();try{localStorage.setItem('circuit-blaster-roulette',$('roulette-enabled').checked?'on':'off');}catch{}};
$('preferences').onclick=()=>{stop();$('preferences-dialog').showModal();};
$('preferences-dialog').addEventListener('close',()=>{if(returnToPreferences)return;if(screen==='game'){startTimer(false);focus();}else selectMenu(menuIndex);});
$('choose-skill').onclick=()=>{returnToPreferences=true;$('preferences-dialog').close();stop();renderSkillChoices();$('skill-dialog').showModal();};
$('skill-dialog').addEventListener('close',()=>{returnToPreferences=false;$('preferences-dialog').showModal();stop();});
$('skill-rows').addEventListener('click',event=>{const button=event.target.closest?.('[data-unit]');if(!button)return;chooseUnit(button.dataset.unit);$('skill-dialog').close();});



// Year 10 units share the original answer, retry, score and roulette loop.
const circuitLevelCount=levels.length;
const curriculumUnits=(typeof REVISION_UNITS==='undefined'?[]:REVISION_UNITS).concat(typeof MIXED_REVISION_UNIT==='undefined'?[]:[MIXED_REVISION_UNIT],typeof Physics12==='undefined'?[]:[Physics12.unit()],typeof DIAGNOSTIC_UNIT==='undefined'?[]:[DIAGNOSTIC_UNIT]);
// Classes: each unit belongs to one. URL: ?class=yr12 (or yr10); ?unit=… still works and implies its class.
const CLASSES=[{id:'yr10',name:'YEAR 10',defaultUnit:'electricity_magnetism'},{id:'yr12',name:'YEAR 12',defaultUnit:'yr12_physics'}];
const unitClass=id=>id==='yr12_physics'||id==='yr12_diagnostic'?'yr12':'yr10';
let selectedClass='yr10';const lastUnitForClass={};
function mixedQuestionPicker(questions){
  // E4 (core comparison) disabled pending a clearer question. Retain its source for revision.
  questions=questions.filter(item=>item.id!=='E4');
  let deck=[],previous='';
  const shuffled=items=>{const pool=[...items],out=[];while(pool.length){const chosen=pick(pool);out.push(chosen);pool.splice(pool.indexOf(chosen),1);}return out;};
  const nextItem=()=>{
    if(!deck.length){
      const groups=[...new Set(questions.map(item=>item.unit))].map(unit=>shuffled(questions.filter(item=>item.unit===unit)));
      for(let round=0;round<Math.max(...groups.map(g=>g.length));round++)deck.push(...shuffled(groups).map(g=>g[round]).filter(Boolean));
      if(deck[0].id===previous)[deck[0],deck[1]]=[deck[1],deck[0]];
    }
    const item=deck.shift();previous=item.id;return item;
  };
  nextItem.reset=()=>{deck=[];previous='';};return nextItem;
}
for(const unit of curriculumUnits){
  for(const skill of unit.skills){
    const getItem=unit.mixed?mixedQuestionPicker(skill.questions):()=>pick(skill.questions);
    const entry={name:skill.name.toUpperCase(),rule:skill.summary,example:unit.mixed?'Read each question carefully. Use working for calculations and units as requested.':skill.questions[0].prompt+' Answer: '+skill.questions[0].answer,reset:unit.mixed?()=>getItem.reset():undefined,correctTarget:skill.correctTarget||3,questions:skill.questions,skill:skill.id,unit:unit.id,
      make:()=>makeRevisionQuestion(getItem(),unit.mixed)};
    levels.push(entry);
  }
}
function renderSkillChoices(){
  const choices=curriculumUnits.concat([{id:'circuit_extension',name:'Circuit calculations — original extension ladder'}]).filter(unit=>unitClass(unit.id)===selectedClass);
  $('skill-rows').innerHTML=choices.map((unit,i)=>`<button type="button" data-unit="${unit.id}" aria-pressed="${unit.id===selectedUnit}"><span class="skill-rank">${String(i+1).padStart(2,'0')}</span><span>${escapeMarkup(unit.name)}</span><span class="skill-selected">${unit.id===selectedUnit?'SELECTED':''}</span></button>`).join('');
}
function chooseUnit(id){
  if($('roulette-dialog').open)return;
  saveRun();reviewDeck=null;currentReview=null;advanceAfterCorrection=false;selectedUnit=id;selectedClass=unitClass(id);lastUnitForClass[selectedClass]=id;syncClassUi();position=correct=wrong=score=rouletteCorrectCount=0;rouletteTarget=3;needsLevelCard=false;lastQuestionKey=null;
  const unit=curriculumUnits.find(u=>u.id===id);
  $('calculations').hidden=!!unit?.mixed;
  enabled=levels.map((l,i)=>({l,i})).filter(({l,i})=>id==='circuit_extension'?i<circuitLevelCount:l.unit===id).map(({i})=>i);
  $('start-game').disabled=!enabled.length;$('settings').disabled=!enabled.length;
  $('unit-note').textContent=unit?.mixed?`${unit.skills.length} levels · attempt all new questions · reviews carry forward`:unit?.status==='cross-unit'?'No separate unit plan available; investigation skills are woven into the other units.':unit?.status==='unconfirmed'?'Optional unit — confirm with your teacher.':id==='circuit_extension'?'Original circuit ladder, including extension calculations.':unit?`${unit.skills.length} skills · attempt every new question to move up · reviews carry forward` :'';
  if(enabled.length){current=levels[enabled[0]].make();questionLevel=enabled[0];highestLevel=enabled[0]+1;}
  hud();showMenu();
}
function syncClassUi(){
  const cls=CLASSES.find(c=>c.id===selectedClass);$('class').value=selectedClass;$('menu-class').textContent='CLASS: '+cls.name;
  try{const params=new URLSearchParams(location.search);params.set('class',selectedClass);if(selectedUnit===cls.defaultUnit)params.delete('unit');else params.set('unit',selectedUnit);history.replaceState(null,'','?'+params);}catch{}
  syncSettingChoices?.();
}
function chooseClass(id){if(id===selectedClass||!CLASSES.some(c=>c.id===id))return;chooseUnit(lastUnitForClass[id]||CLASSES.find(c=>c.id===id).defaultUnit);}
$('class').onchange=()=>chooseClass($('class').value);
$('menu-class').onclick=()=>{chooseClass(CLASSES[(CLASSES.findIndex(c=>c.id===selectedClass)+1)%CLASSES.length].id);selectMenu(menuIds.indexOf('menu-class'));};
if(curriculumUnits.length){
  const params=new URLSearchParams(location.search),requestedUnit=params.get('unit'),requestedClass=({yr10:'yr10',y10:'yr10',10:'yr10',year10:'yr10',yr12:'yr12',y12:'yr12',12:'yr12',year12:'yr12'})[String(params.get('class')||'').toLowerCase()];
  const validUnit=curriculumUnits.some(u=>u.id===requestedUnit)||requestedUnit==='circuit_extension';
  if(requestedClass)selectedClass=requestedClass;
  if(validUnit&&(!requestedClass||unitClass(requestedUnit)===requestedClass))selectedUnit=requestedUnit;
  else if(requestedClass)selectedUnit=CLASSES.find(c=>c.id===requestedClass).defaultUnit;
  if(!curriculumUnits.some(u=>u.id===selectedUnit)&&selectedUnit!=='circuit_extension')selectedUnit=curriculumUnits[0].id;
  chooseUnit(selectedUnit);
}

function syncSettingChoices(){
  for(const button of document.querySelectorAll('[data-setting]'))button.setAttribute('aria-pressed',String($(button.dataset.setting).value===button.dataset.value));
}
$('preferences-dialog').addEventListener('click',event=>{
  const button=event.target.closest?.('[data-setting]');if(!button)return;
  $(button.dataset.setting).value=button.dataset.value;$(button.dataset.setting).onchange();syncSettingChoices();
});
syncSettingChoices();

var menuPanelIds=['rule-dialog','settings-dialog','leaderboard-dialog','preferences-dialog','roulette-dialog','chapter-dialog','skill-dialog'];
function activeMenuPanel(){return (menuPanelIds||['rule-dialog','settings-dialog','leaderboard-dialog','preferences-dialog','roulette-dialog','chapter-dialog','skill-dialog']).map($).find(panel=>panel.open);}
function panelControls(panel){return [...panel.querySelectorAll('button,input:not([type="hidden"])')].filter(control=>!control.disabled&&!control.hidden&&(!control.getClientRects||control.getClientRects().length));}
function selectPanelControl(panel,index){const controls=panelControls(panel);if(!controls.length)return;index=(index+controls.length)%controls.length;controls.forEach((control,i)=>control.classList.toggle('selected',i===index));controls[index].focus();}
function navigatePanel(panel,event){
  const controls=panelControls(panel);if(!controls.length)return;
  let index=controls.indexOf(document.activeElement);if(index<0)index=controls.findIndex(control=>control.classList.contains('selected'));if(index<0)index=0;
  if(['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].includes(event.key)){
    if(controls[index].type==='range'&&['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();selectPanelControl(panel,index+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1));
  }else if(event.key==='Enter'){event.preventDefault();controls[index].click();}
}
for(const id of menuPanelIds){const panel=$(id),open=panel.showModal.bind(panel);panel.showModal=()=>{open();const controls=panelControls(panel);const chosen=controls.findIndex(control=>control.getAttribute('aria-pressed')==='true');selectPanelControl(panel,chosen>=0?chosen:0);};panel.addEventListener('focusin',event=>{const controls=panelControls(panel),index=controls.indexOf(event.target);if(index>=0)controls.forEach((control,i)=>control.classList.toggle('selected',i===index));});}

function selectConnection(value){$('answer').value=value;document.querySelectorAll('[data-connection]').forEach(button=>{const selected=button.dataset.connection===value;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));if(selected)button.focus();});}
function routeAnswerKey(event){
  if(!activeRun||event.ctrlKey||event.metaKey||event.altKey||event.isComposing)return;
  if(current.source?.choices||current.source?.id==='E1'){
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();const choices=current.choiceOrder||['series','parallel'];const index=choices.indexOf($('answer').value);const direction=['ArrowLeft','ArrowUp'].includes(event.key)?-1:1;selectConnection(choices[(index+direction+choices.length)%choices.length]);}
    else if(event.key==='Enter'){event.preventDefault();$('answer-form').requestSubmit();}return;
  }
  const input=answerFocusTarget();if(event.target===input)return;
  if(event.key==='Enter'){event.preventDefault();input.focus();$('answer-form').requestSubmit();return;}
  if(event.key.length!==1&&!['Backspace','Delete'].includes(event.key))return;
  event.preventDefault();input.focus();let start=input.selectionStart??input.value.length,end=input.selectionEnd??start;
  if(event.key==='Backspace'&&start===end)start=Math.max(0,start-1);
  if(event.key==='Delete'&&start===end)end=Math.min(input.value.length,end+1);
  const text=event.key.length===1?event.key:'';input.value=input.value.slice(0,start)+text+input.value.slice(end);const caret=start+text.length;input.setSelectionRange(caret,caret);input.dispatchEvent(new Event('input',{bubbles:true}));
}

function scienceText(text){
  const sub='₀₁₂₃₄₅₆₇₈₉',sup='⁰¹²³⁴⁵⁶⁷⁸⁹';
  return String(text).replace(/\b([A-Z][a-z]?)(\d+)([+−-])/g,(_,atom,n,sign)=>atom+[...n].map(c=>sup[Number(c)]).join('')+(sign==='+'?'⁺':'⁻')).replace(/((?:[A-Z][a-z]?\d*|\([A-Za-z0-9]+\)\d*)+)([+−])/g,(_,formula,sign)=>formula+(sign==='+'?'⁺':'⁻')).replace(/(?:[A-Z][a-z]?\d*|\([A-Za-z0-9]+\)\d*)+/g,formula=>formula.replace(/\d/g,n=>sub[Number(n)]));
}
function scienceSvgMarkup(text){
  const subs='₀₁₂₃₄₅₆₇₈₉',supers='⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻';
  return escapeMarkup(scienceText(text)).replace(/[₀₁₂₃₄₅₆₇₈₉]+/g,run=>'<tspan baseline-shift="sub" font-size="65%">'+[...run].map(c=>subs.indexOf(c)).join('')+'</tspan>').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻]+/g,run=>'<tspan baseline-shift="super" font-size="65%">'+[...run].map(c=>c==='⁺'?'+':c==='⁻'?'−':supers.indexOf(c)).join('')+'</tspan>');
}
function scienceMarkup(text){return escapeMarkup(scienceText(text)).replace(/\b([A-Za-z])_([A-Za-z]{1,2}|\d)\b/g,'$1<sub>$2</sub>').replace(/\b([VRI])(lamp|supply|total)\b/g,'$1<sub>$2</sub>');}
function revisionVisual(question){
  const item=question.source;if(!item)return '';if(item.visual&&typeof casinoDiagram==='function')return casinoDiagram(item.visual);const key=item.id||'',prompt=item.cloze||item.prompt;
  const svg=(body,label,view='0 0 600 230')=>`<svg class="revision-visual" viewBox="${view}" role="img" aria-label="${label}">${body}</svg>`;
  if(/atomic_matter-counts|A1/.test(key)||/mass number.*atomic number|atomic number.*mass number/.test(prompt)){const mass=prompt.match(/mass number (\d+)/)?.[1],atomic=prompt.match(/atomic number (\d+)/)?.[1];if(mass&&atomic)return svg(`<rect x="220" y="10" width="160" height="200" fill="none" stroke="currentColor" stroke-width="3"/><text x="240" y="50">${atomic}</text><text x="300" y="120" text-anchor="middle" font-size="50">${atomic==='11'?'Na':'Atom'}</text><text x="300" y="160" text-anchor="middle">${mass}</text><text x="300" y="190" text-anchor="middle" font-size="14">Isotope mass number</text>`,'Atomic number and isotope mass number');}
  if(/×/.test(prompt)&&/offspring/.test(prompt)){const cross=prompt.match(/([A-Za-z]{2}) × ([A-Za-z]{2})/);if(cross){const one=cross[1],two=cross[2];let body='<path d="M220 60H420M220 130H420M220 200H420M220 60V200M320 60V200M420 60V200" fill="none" stroke="currentColor" stroke-width="3"/>';for(let i=0;i<2;i++){body+=`<text x="${270+i*100}" y="40" text-anchor="middle">${one[i]}</text><text x="195" y="${105+i*70}" text-anchor="middle">${two[i]}</text>`;for(let j=0;j<2;j++)body+=`<text x="${270+j*100}" y="${105+i*70}" text-anchor="middle">?</text>`;}return svg(body,'Punnett square with parental alleles; work out the offspring');}}
  if(/distance.*rises from/i.test(prompt)){const m=prompt.match(/from (\d+) m at (\d+) s to (\d+) m at (\d+) s/);if(m){const y1=200-160*Number(m[1])/Number(m[3]),x1=100+400*Number(m[2])/Number(m[4]);return svg(`<path d="M100 20V200H520" fill="none" stroke="currentColor" stroke-width="3"/><path d="M${x1} ${y1}L500 40" fill="none" stroke="currentColor" stroke-width="4"/><text x="${x1}" y="${y1-12}" text-anchor="middle">(${m[2]} s, ${m[1]} m)</text><text x="480" y="28" text-anchor="middle">(${m[4]} s, ${m[3]} m)</text><text x="300" y="228" text-anchor="middle">Time, t (s)</text><text x="38" y="115" transform="rotate(-90 38 115)" text-anchor="middle">Distance, d (m)</text><text x="87" y="220">0</text>`,'Distance–time graph with two labelled points');}}
  if(/N right.*N left/.test(prompt)){const m=prompt.match(/(\d+) N right.*?(\d+) N left/);if(m)return svg(`<rect x="240" y="80" width="120" height="70" fill="none" stroke="currentColor" stroke-width="3"/><path d="M240 115H90L110 100M90 115L110 130M360 115H510L490 100M510 115L490 130" fill="none" stroke="currentColor" stroke-width="3"/><text x="160" y="80" text-anchor="middle">${m[2]} N</text><text x="440" y="80" text-anchor="middle">${m[1]} N</text>`,'Opposing forces on a trolley');}
  if(/lamps? in parallel|parallel lamps|parallel across/.test(prompt)){const volts=prompt.match(/(\d+) V/);return diagram(q('',0,{kind:'parallel',supply:volts?volts[1]+' V':'Supply',labels:['V₁ = ?','V₂ = ?']}));}
  if(/lamps? in series|In series, lamp|Two lamps in series/.test(prompt)){const amps=prompt.match(/(\d+) A/);return diagram(q('',0,{kind:'series',labels:[amps?'I₁ = '+amps[1]+' A':'Lamp 1','I₂ = ?']}));}
  if(/genotype [Bb]{2} is/.test(prompt)){const alleles=prompt.match(/genotype ([Bb]{2})/)[1];return svg(`<rect x="220" y="20" width="30" height="180" rx="15" fill="none" stroke="currentColor" stroke-width="3"/><rect x="360" y="20" width="30" height="180" rx="15" fill="none" stroke="currentColor" stroke-width="3"/><path d="M220 100H250M360 100H390" stroke="currentColor" stroke-width="6"/><text x="200" y="110" text-anchor="end">${alleles[0]}</text><text x="410" y="110">${alleles[1]}</text>`,'Alleles at the same locus on homologous chromosomes');}
  return '';
}

function displayCloze(question){
  if(question.kind==='revision')return removeProvidedUnit(question,question.prompt);
  if(/^Find /.test(question.prompt))return question.prompt.replace(/^Find /,'The ').replace(/[.?]$/,'')+' = ____'+'.';
  return question.prompt;
}

function removeProvidedUnit(question,text){
  const unit=expectedAnswerUnit(question);let result=text.replace(/\s*\(number only\)/gi,'').replace(/\s*Number only\./gi,'');
  if(unit)result=result.replace('____'+(unit==='%'?'':' ')+unit,'____');
  return result.replace(/____\s*\.$/,'____');
}

function clozeSentence(text,blank){
  let field=0;const emphasise=part=>scienceMarkup(part).replace(/(atomic number|mass number|electron arrangement|neutrons|electrons|gradient|resultant force|net force|acceleration|weight|genotype|offspring|survival|reproduction|current|voltage|speed|distance|time|series|parallel|ammeter|electromagnet|DNA|\b[vdtaF]\b)/g,'<strong class="cloze-key">$1</strong>');
  const lines=text.split(/\n|(?<=\.)\s+|:\s*/).filter(Boolean);
  return '<div class="cloze-lines">'+lines.map(line=>`<div class="cloze-line">${emphasise(line).replace(/____/g,()=>typeof blank==='function'?blank(null,field++):blank)}</div>`).join('')+'</div>';
}
function componentField(field,index){return `<span class="component-slot"><input class="shell-input component-input" data-shell="${index}" form="answer-form" maxlength="8" placeholder="_" aria-label="${escapeMarkup(field.label)}" autocomplete="off"></span>`;}

function shellFields(count){return '<span class="shell-fields">'+Array.from({length:count},(_,i)=>`<input class="shell-input" data-shell="${i}" form="answer-form" inputmode="numeric" maxlength="2" placeholder="_" aria-label="Electrons in shell ${i+1}" autocomplete="off">`).join('<span class="shell-comma">,</span>')+'</span>';}
function answerFocusTarget(){if(current.source?.choices||current.source?.id==='E1')return document.querySelector('[data-connection].selected')||$('answer');const fields=[...document.querySelectorAll('.shell-input')];if(fields.length)return fields.includes(document.activeElement)?document.activeElement:fields.find(field=>!field.value)||fields[0];return $('answer');}
function syncShellAnswer(){const fields=[...document.querySelectorAll('.shell-input')];if(fields.length)$('answer').value=fields.map(field=>field.value.trim()).join(',');}
$('game-screen').addEventListener('input',event=>{if(event.target.classList?.contains('shell-input'))syncShellAnswer();});
$('game-screen').addEventListener('keydown',event=>{
  if(!event.target.classList?.contains('shell-input'))return;
  const fields=[...document.querySelectorAll('.shell-input')],index=fields.indexOf(event.target),punnett=current.source?.visual?.type==='punnett';
  if(event.key==='Enter'){
    event.preventDefault();event.stopPropagation();syncShellAnswer();
    if(punnett){const nextEmpty=[...fields.slice(index+1),...fields.slice(0,index+1)].find(field=>!field.value.trim());if(nextEmpty){nextEmpty.focus();return;}}
    $('answer-form').requestSubmit();return;
  }
  if(punnett&&['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(event.key)){
    event.preventDefault();event.stopPropagation();
    const row=Math.floor(index/2),col=index%2;
    const target={ArrowUp:Math.max(0,row-1)*2+col,ArrowDown:Math.min(1,row+1)*2+col,ArrowLeft:row*2+Math.max(0,col-1),ArrowRight:row*2+Math.min(1,col+1)}[event.key];
    fields[Math.min(target,fields.length-1)].focus();return;
  }
  if([',','ArrowRight',' '].includes(event.key)){event.preventDefault();event.stopPropagation();fields[Math.min(index+1,fields.length-1)].focus();}
  else if(event.key==='ArrowLeft'||(event.key==='Backspace'&&!event.target.value&&index>0)){event.preventDefault();event.stopPropagation();fields[Math.max(0,index-1)].focus();}
});
$('game-screen').addEventListener('paste',event=>{if(!event.target.classList?.contains('shell-input'))return;const pasted=event.clipboardData?.getData('text')||'';if(!/^\s*\d+(?:\s*,\s*\d+)+\s*$/.test(pasted))return;event.preventDefault();const parts=pasted.split(',').map(x=>x.trim()),fields=[...document.querySelectorAll('.shell-input')];fields.forEach((field,i)=>field.value=parts[i]||'');syncShellAnswer();fields[fields.length-1].focus();});

function circuitAnswerDiagram(picture,answerMarkup){
 let placed=false;
 picture=picture.replace(/<text x="([\d.]+)" y="([\d.]+)"[^>]*>([\s\S]*?)<\/text>/g,(whole,x,y,label)=>{
  if(placed||!label.includes('?'))return whole;placed=true;
  return `<text x="${Number(x)-5}" y="${y}" text-anchor="end">${label.replace('?', '').trim()}</text><foreignObject x="${Number(x)-52}" y="${Number(y)-34}" width="170" height="48"><div xmlns="http://www.w3.org/1999/xhtml" id="cloze-answer-slot" class="diagram-answer-slot"></div></foreignObject>`;
 });
 if(placed)return picture;
 return picture.replace(/viewBox="0 0 (\d+) (\d+)"/,(_,w,h)=>`viewBox="0 0 ${w} ${Number(h)+180}"`).replace('</svg>',`<foreignObject x="30" y="435" width="740" height="160"><div xmlns="http://www.w3.org/1999/xhtml" class="circuit-diagram-prompt">${answerMarkup}</div></foreignObject></svg>`);
}
