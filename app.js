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
// Rolling count-up: the balance ticks up to its new value (cosmetic; falls back to an instant update).
let shownScore=0,countToken=0;
function showScore(){
  const el=$('casino-score'),token=++countToken;
  if(typeof requestAnimationFrame!=='function'||score<=shownScore||!activeRun){shownScore=score;el.textContent=`$${score}`;return;}
  const from=shownScore,to=score,start=Date.now(),duration=Math.min(900,250+(to-from)*30);
  const step=()=>{if(token!==countToken)return;const k=Math.min(1,(Date.now()-start)/duration);shownScore=Math.round(from+(to-from)*k);el.textContent=`$${shownScore}`;if(k<1)requestAnimationFrame(step);};
  step();
}
function hud(){showScore();renderCasinoProgress();renderDeckProgress(); if(activeRun)highestLevel=Math.max(highestLevel,enabled[position]+1); $('level').textContent=`LEARNING UNIT ${position+1}${showNumber&&questionNumber()?' · QUESTION '+questionNumber():''}`;$('score').textContent=`BANK $${String(score).padStart(6,'0')}`;}
function renderDeckProgress(){const box=$('deck-progress');box.hidden=true; // progress line hidden at Hamish's request; label text still maintained
  if(!reviewDeck)return;const progress=reviewDeck.progress;$('deck-progress-label').textContent=`LEARNING UNIT ${progress.position+1} · ${progress.seen}/${progress.total} new questions attempted · ${progress.pending} awaiting review${currentReview?.review?' · REVIEW '+(currentReview.stage+1)+'/3 (LEARNING UNIT '+(enabled.indexOf(questionLevel)+1)+')':''}`;}
function resetReviewDeck(){reviewDeck=null;currentReview=null;advanceAfterCorrection=false;if(typeof ReviewDeck==='undefined'||!enabled.every(index=>levels[index].questions))return;reviewDeck=new ReviewDeck(enabled.map(index=>({index,ordered:levels[index].ordered,cards:levels[index].questions.filter(item=>selectedUnit!=='mixed_key_skills'||item.id!=='E4').map(item=>makeRevisionQuestion(item,selectedUnit==='mixed_key_skills'))})));}
function makeRevisionQuestion(base,mixed){const item=typeof base.gen==='function'?Physics12.generate(base):mixed&&typeof CasinoPractice!=='undefined'?CasinoPractice.generate(base):base;return q(item.cloze||item.prompt,item.answer,{kind:'revision',aliases:item.aliases||[],caseSensitive:!!item.caseSensitive||/chemical symbol|formula|base pairs|neutral formula|genotype =/.test(item.prompt),worked:item.explanation,source:item});}
function finishDeck(){stop();currentReview=null;saveRun();showMenu();$('chapter-summary').textContent='Every question is done. All missed questions passed three successful reviews.';$('chapter-dialog').querySelector('h2').textContent='Practice complete';$('chapter-dialog').showModal();}
function stop(){clearInterval(timer);clearTimeout(beepTimer);$('clock').textContent='';}
function focus(){setTimeout(()=>{if(screen==='game'&&!$('rule-dialog').open&&!$('settings-dialog').open&&!$('preferences-dialog').open&&!$('roulette-dialog').open&&!$('chapter-dialog').open&&!$('skill-dialog').open&&!$('practice-dialog').open)answerFocusTarget().focus();},0);}
function startTimer(reset=true){stop();if(screen!=='game'||!activeRun||$('rule-dialog').open||$('settings-dialog').open||$('chapter-dialog').open||$('preferences-dialog').open||$('skill-dialog').open||$('practice-dialog').open||$('roulette-dialog').open||!$('timed').checked)return;if(reset)seconds=30;$('clock').textContent=`${seconds}s`;timer=setInterval(()=>{seconds--;$('clock').textContent=`${seconds}s`;if(seconds<=0)fail(true);},1000);scheduleBeep();}
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
  if(!solution&&title!=='Rule'&&!levels[questionLevel]?.cardHtml){startTimer(false);focus();return;} // levels with a table card always show it
  stop();const l=levels[questionLevel],preview=previewStatements(questionLevel),correction=!!solution;
  $('rule-dialog').classList.toggle('statement-card',!!preview||correction);
  $('rule-dialog').classList.toggle('correction-card',correction);
  $('rule-dialog').classList.toggle('table-card',!!l.cardHtml&&!correction);
  $('card-title').textContent=correction?`${title}${questionNumber()?' · QUESTION '+questionNumber():''}`:`LEARNING UNIT ${enabled.indexOf(questionLevel)+1}`;
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
    ? '<td class="rule-locked" aria-label="Symbol revealed in a later learning unit"></td>'
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
    ? '<td class="rule-locked" aria-label="Rule revealed in a later learning unit"></td>'
    : `<td${index===introduced?' class="rule-new"':''}><span class="rule-equation">${equation}</span><span class="rule-description">${description}</span></td>`;
  return `<table class="circuit-rules-table circuit-comparison-table"><caption>Series &amp; parallel rules</caption><thead><tr><th scope="col">Name</th><th scope="col">Diagram</th><th scope="col">Branches</th><th scope="col">Current</th><th scope="col">Voltage</th></tr></thead><tbody><tr>${circuit('series')}${cell(9,'I<sub>T</sub> = I<sub>1</sub> = I<sub>2</sub>','Same everywhere')}${cell(17,'V<sub>T</sub> = V<sub>1</sub> + V<sub>2</sub>','Voltage drops add')}</tr><tr>${circuit('parallel')}${cell(14,'I<sub>T</sub> = I<sub>1</sub> + I<sub>2</sub>','Branch currents add')}${cell(16,'V<sub>T</sub> = V<sub>1</sub> = V<sub>2</sub>','Same across each branch')}</tr></tbody></table>${index>=9?'<p class="rule-key">T = total / supply; 1 and 2 label the components or branches.</p>':''}`;
}
// Multiple-choice wording: "Arrow ____ shows X." reads better as a question; other blanks show as "…".
function choiceText(question){
  let text=question.prompt;
  if(question.source?.phys)text=text.replace(/Arrow ____ (shows [^\n]*?)\.?(?=\n|$)/,'Which arrow $1?').replace(/\s*Arrow ____\.$/,'');
  return text.replace(/____/g,'…');
}
// Answer box width: 25% longer than the longest acceptable answer (rounded up), measured in character cells.
function longestAnswerLength(question){
  const src=question.source||{},unit=src.answerUnit||expectedAnswerUnit(question);
  const forms=[question.answer,...(question.aliases||[]),...(src.aliases||[])].map(String);
  if(unit)for(const u of [unit,...(src.unitAliases||[])])forms.push(question.answer+' '+u);
  return Math.max(1,...forms.map(form=>[...form].length));
}
function sizeAnswerBox(entry,slot){
  const cells=Math.max(4,Math.ceil(longestAnswerLength(current)*1.25));
  if(!entry.style)return;
  if(slot?.style){slot.style.width='auto';slot.style.minWidth='0';}
  entry.style.width=`calc(${(cells*0.65).toFixed(2)}em + .7em)`;entry.style.flex='none';
}
// One column (quantity / symbol / unit / unit symbol) or one row (prefix word / symbol / power of ten) with a blank cell holding the answer box.
function unitTableMarkup(visual){
  const slot='<span id="cloze-answer-slot"></span>';
  const body=row=>row.blank?(row.pre?scienceMarkup(row.pre):'')+slot:scienceMarkup(row.value);
  if(visual.orient==='row')return `<table class="phys-table row-table"><thead><tr>${visual.rows.map(row=>`<th>${scienceMarkup(row.label)}</th>`).join('')}</tr></thead><tbody><tr>${visual.rows.map(row=>`<td${row.blank?' class="blank"':''}>${body(row)}</td>`).join('')}</tr></tbody></table>`;
  return `<table class="phys-table"><tbody>${visual.rows.map(row=>`<tr><th scope="row">${scienceMarkup(row.label)}</th><td${row.blank?' class="blank"':''}>${body(row)}</td></tr>`).join('')}</tbody></table>`;
}
function questionInstruction(){
  if(current.source?.noInstruction)return '';
  const type=current.source?.visual?.type;
  const instructions={punnett:current.source?.fields?'Fill in the Punnett square:':current.source?.id==='G3'?'Fill in the missing genotype in the Punnett square:':'Use the Punnett square to complete the statement:',graph:'Use the distance–time graph to find the speed:',weight:'Calculate the weight:',journey:'Calculate the average speed:',forces:'Use the forces shown to complete the statement:',reaction:'Complete the reaction:',circuit:'Find the missing current or voltage:',atom:'Use the isotope cell to complete the statement:',unittable:'Fill in the missing cell:',shells:'Complete the electron arrangement:',particle:'State the particle’s charge:'};
  return `${showNumber?(questionNumber()||questionLevel+1)+') ':''}${instructions[type]||'Complete the statement:'}`;
}
function render(){
  const reminder=$('unit-reminder');reminder.hidden=true;reminder.classList.remove('unit-missing');$('game-screen').appendChild(reminder);
  lastQuestionKey=questionKey(current);const circuitType=current.prompt==='Series or parallel?',simple=current.kind==='component'||current.kind==='symbol'||circuitType;
  const entry=$('entry-wrap');$('answer-form').querySelector('.answer-row').prepend(entry);
  $('game-screen').classList.toggle('large-circuit-question',current.source?.visual?.type==='circuit');
  $('answer-suffix').hidden=true;$('game-screen').classList.toggle('statement-question',simple);$('game-screen').classList.toggle('cloze-question',true);
  $('prompt').textContent=questionInstruction();$('prompt').classList.toggle('sr-only',false);$('prompt').hidden=!$('prompt').textContent;
  if(current.source?.choices){const choices=current.source.choices;const shuffled=current.choiceOrder||[...choices];for(let i=current.choiceOrder||current.source.fixedChoices?0:shuffled.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];}current.choiceOrder=shuffled;$('diagram').innerHTML=`<div class="cloze-game stacked-cloze${current.source.phys?' phys-choice':''}"><div class="choice-question">${scienceMarkup(choiceText(current)).replace(/\n/g,'<br>')}</div>${current.source.visual?.type==='svg'?casinoDiagram(current.source.visual):''}<div class="connection-choices" role="group" aria-label="Answer choices">${shuffled.map(value=>`<button type="button" data-connection="${escapeMarkup(value)}">${escapeMarkup(value)}</button>`).join('')}</div></div>`;}
  else if(current.kind==='revision'&&current.source?.visual?.type==='circuit')$('diagram').innerHTML=`<div class="cloze-game diagram-cloze">${casinoDiagram({...current.source.visual,inlineAnswer:true,answerMarkup:clozeSentence(removeProvidedUnit(current,current.prompt),'<span id="cloze-answer-slot"></span>')})}</div>`;
  else if(current.kind==='revision'&&current.source?.id==='F2')$('diagram').innerHTML=`<div class="cloze-game diagram-cloze">${casinoDiagram({...current.source.visual,inlineAnswer:true})}</div>`;
  else if(current.kind==='revision'&&current.source?.visual?.type==='punnett')$('diagram').innerHTML=`<div class="cloze-game punnett-cloze">${casinoDiagram({...current.source.visual,inlineAnswer:true,fields:current.source.fields,answerMarkup:current.source.id==='G3'||current.source.fields?'':clozeSentence(removeProvidedUnit(current,current.prompt),'<span id="cloze-answer-slot"></span>')})}</div>`;
  else if(current.kind==='revision'&&current.source?.id==='A2')$('diagram').innerHTML=`<div class="cloze-game">${casinoDiagram({...current.source.visual,shellInputs:Array.from({length:current.answer.split(',').length},(_,i)=>`<input class="shell-input" data-shell="${i}" form="answer-form" inputmode="numeric" maxlength="2" placeholder="_" aria-label="Electrons in shell ${i+1}" autocomplete="off">`)})}</div>`;
  else if(current.kind==='revision'&&current.source?.id==='L2-6')$('diagram').innerHTML=`<div class="cloze-game stacked-cloze"><div class="large-observation">${scienceMarkup(current.source.visual.observation)}</div><div>The gas is</div><div class="large-science"><span id="cloze-answer-slot"></span></div></div>`;
  else if(current.kind==='revision'&&current.source?.id==='G4')$('diagram').innerHTML=`<div class="cloze-game stacked-cloze"><div>Natural selection depends on</div><div class="large-science">survival</div><div>and</div><div class="large-science"><span id="cloze-answer-slot"></span></div></div>`;
  else if(current.kind==='revision'&&current.source?.id==='G1')$('diagram').innerHTML=`<div class="cloze-game">${casinoDiagram({...current.source.visual,answerMarkup:clozeSentence('This section of DNA is a ____','<span id="cloze-answer-slot"></span>')})}</div>`;
  else if(current.kind==='revision'&&['L2-1','L2-3','L2-11'].includes(current.source?.id))$('diagram').innerHTML=`<div class="cloze-game">${revisionVisual(current)}${clozeSentence({'G1':'This section of DNA is a ____','L2-1':'electrons = ____','L2-3':'formula = ____','L2-11':'v = ____'}[current.source.id],'<span id="cloze-answer-slot"></span>')}</div>`;
  else if(current.kind==='revision'&&current.source?.visual?.type==='unittable')$('diagram').innerHTML=`<div class="cloze-game phys-cloze">${unitTableMarkup(current.source.visual)}</div>`;
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
  if(current.source?.choices||current.source?.fields||['A2','E1'].includes(current.source?.id)){entry.hidden=true;}else{$('cloze-answer-slot').appendChild(entry);entry.hidden=false;sizeAnswerBox(entry,$('cloze-answer-slot'));}$('unit').textContent='';$('answer').value='';if(current.source?.id!=='A2'&&!current.source?.fields&&current.kind==='revision'&&/^\d+(?:,\d+)+$/.test(current.answer)){entry.hidden=true;$('answer-form').querySelector('.answer-row').prepend(entry);$('cloze-answer-slot').innerHTML=shellFields(current.answer.split(',').length);} if(current.source?.choices||current.source?.id==='E1'){selectConnection(current.choiceOrder?.[0]||'series');document.querySelectorAll('[data-connection]').forEach(button=>button.onclick=()=>selectConnection(button.dataset.connection));}paintAnswer();$('answer').inputMode='text';$('symbol-pad').hidden=!!(current.source?.choices||current.source?.id==='E1'||current.source?.flag);if(!$('answer-result').textContent)renderAnswerHint();hud();startTimer();focus();
}

function questionKey(question){return JSON.stringify([question.prompt,question.unit,diagram(question)]);}
function freshQuestion(make){
  for(let attempt=0;attempt<24;attempt++){const candidate=make();if(questionKey(candidate)!==lastQuestionKey)return candidate;}
  // Enumerate choices if random draws keep colliding; never hang or return a repeat.
  const choices=[];
  try{while(true){let cursor=0;const sizes=[];forcedChoice=size=>{sizes[cursor]=size;return choices[cursor++]||0;};const candidate=make();if(questionKey(candidate)!==lastQuestionKey)return candidate;let index=sizes.length-1;while(index>=0&&(choices[index]||0)+1>=sizes[index])index--;if(index<0)throw new Error('A level needs more than one distinct question.');choices[index]=(choices[index]||0)+1;choices.length=index+1;}}
  finally{forcedChoice=undefined;}
}
function next(){if(reviewDeck){currentReview=reviewDeck.next();
  // One level or skill selected: start its questions again with fresh values instead of finishing.
  if(!currentReview&&enabled.length===1){resetReviewDeck();currentReview=reviewDeck?.next();}
  if(!currentReview){finishDeck();return;}position=reviewDeck.progress.position;questionLevel=currentReview.level;current=currentReview.question;}else{questionLevel=enabled[position];current=freshQuestion(levels[questionLevel].make);}attempts=0;render();}
function scientificInput(s){return String(s).normalize('NFKC').replace(/−/g,'-').trim();}
// "1,000" and "12,345,678" are the numbers 1000 and 12345678. Other commas are left for the caller.
function withoutThousands(s){return String(s).replace(/(^|[^\d.])(\d{1,3}(?:[, ]\d{3})+)(?![\d,])/g,(m,pre,num)=>pre+num.replace(/[, ]/g,''));}
function normalize(s){return scientificInput(s).toLowerCase().replace(/[.,!?;:'"“”‘’]/g,'').replace(/(?<=[a-z])-(?=[a-z])/g,'').replace(/\s+/g,' ');}
function expectedAnswerUnit(question){
  if(question.source?.unitGiven)return '';
  if(question.unit)return question.unit;
  if(question.source?.answerUnit)return question.source.answerUnit;
  if(question.kind!=='revision'||!/^\d+(?:\.\d+)?$/.test(question.answer))return '';
  const cloze=question.source?.cloze||question.prompt;
  return cloze.match(/____\s*(m\/s²|m\/s|N\/kg|kg|N|A|V|m|s|%)(?![A-Za-z])/i)?.[1]||'';
}
function renderAnswerHint(){$('feedback').innerHTML=escapeMarkup(answerHint()).replace(/\s*ENTER/g,'<strong class="enter-key">ENTER</strong>');}
function answerHint(){return 'type an answer and press ENTER';}
function matches(value){
  if(current)current.spellingFix=null;
  if(current.source?.phys&&current.source.numeric)return Physics12.checkNumeric(current.source,value)==='ok';
  if(['positive','negative'].includes(current.answer)){const signs={positive:['positive','+','+ve'],negative:['negative','-','-ve']};if(signs[current.answer].includes(scientificInput(value).toLowerCase()))return true;}
  if(current.source?.fields){const expected=current.answer.split(','),parts=scientificInput(value).split(',').map(x=>x.trim());return parts.length===expected.length&&parts.every((x,i)=>current.caseSensitive?x===expected[i]:normalize(x)===normalize(expected[i]));}
  if(/^\d+(?:,\d+)+$/.test(current.answer)){const input=scientificInput(value);if(!/^[\d\s\p{P}]+$/u.test(input))return false;const parts=input.match(/\d+/g)||[],expected=current.answer.split(',');return parts.length===expected.length&&parts.every((part,i)=>Number(part)===Number(expected[i]));}
  const expectedUnit=expectedAnswerUnit(current);
  if(expectedUnit){
    const parsed=scientificInput(value).replace(/[.!?;]+$/,'').match(/^([+-]?(?:\d{1,3}(?:,\d{3})+(?:\.\d*)?|\d+(?:[.,]\d*)?|[.,]\d+))\s*(.+)$/);if(!parsed)return false;
    const aliases={A:['A','amp','amps','ampere','amperes'],V:['V','volt','volts'],'Ω':['Ω','ohm','ohms'],N:['N','newton','newtons'],kg:['kg','kilogram','kilograms'],m:['m','metre','metres','meter','meters'],s:['s','second','seconds'],'m/s':['m/s','m s-1','m s^-1','metres per second','meters per second'],'m/s²':['m/s2','m/s^2','m s-2','m s^-2'],'N/kg':['N/kg'],'%':['%','percent','per cent']};
    const unit=parsed[2].trim();return (aliases[expectedUnit]||[scientificInput(expectedUnit)]).includes(unit)&&Math.abs(Number(withoutThousands(parsed[1]).replace(',','.'))-Number(current.answer))<.005;
  }
  if(current.kind==='revision'&&/^\d+(\.\d+)?$/.test(current.answer)){const typed=withoutThousands(value.trim()),n=Number(typed);return typed!==''&&Number.isFinite(n)&&Math.abs(n-Number(current.answer))<.005;}
  if(current.caseSensitive)return ([current.answer,...(current.aliases||[])].some(a=>scientificInput(a).replace(/\s/g,'')===scientificInput(value).replace(/\s/g,'').replace(/[.,!?;]+$/,'')))||closeSpelling(value);
  return [current.answer,...(current.aliases||[])].some(a=>/^[A-Z][A-Za-z]*[0-9₂₃₄]/.test(a)?scientificInput(a)===scientificInput(value).replace(/[.,!?;]+$/,''):normalize(a)===normalize(value))||closeSpelling(value);
}
// Typos count: ordinary words within 1 edit (2 for long answers) are accepted, e.g. "colombs" for coulombs.
function editDistance(a,b){
  const d=Array.from({length:a.length+1},(_,i)=>[i,...Array(b.length).fill(0)]);for(let j=1;j<=b.length;j++)d[0][j]=j;
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++){
    d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
    if(i>1&&j>1&&a[i-1]===b[j-2]&&a[i-2]===b[j-1])d[i][j]=Math.min(d[i][j],d[i-2][j-2]+1);
  }
  return d[a.length][b.length];
}
// Different words one letter apart: a typo here is a different answer, so no leniency.
const CONFUSABLE_WORDS=[['charge','change'],['current','currents'],['north','south'],['series','serial']];
// Opposites and neighbours that a typo-tolerant match must never blur: balanced/unbalanced, increase/decrease, sulfate/sulfide.
function oppositeWords(a,b){
  const bare=w=>w.replace(/^(un|in|im|de|dis|non|anti|over|under|sub|super)/,'');
  const ending=w=>(w.match(/(ate|ide|ite|ine|ic|ous)$/)||[''])[0];
  const wa=a.split(' '),wb=b.split(' ');
  return wa.length===wb.length&&wa.some((w,i)=>w!==wb[i]&&(bare(w)===bare(wb[i])||(ending(w)&&ending(wb[i])&&ending(w)!==ending(wb[i])&&w.slice(0,-ending(w).length)===wb[i].slice(0,-ending(wb[i]).length))));
}
function closeSpelling(value){
  if(current.source?.choices||current.source?.fields||current.kind!=='revision')return false;
  const typed=normalize(value);if(!/^[a-z][a-z ]*$/.test(typed))return false;
  if(typeof FUZZY_BLOCK!=='undefined'&&FUZZY_BLOCK.has(typed))return false;   // typed another real answer (e.g. a different country)
  return [current.answer,...(current.aliases||[])].some(a=>{
    const want=normalize(a);if(!/^[a-z][a-z ]*$/.test(want)||want.length<5)return false;
    if(CONFUSABLE_WORDS.some(pair=>pair.includes(typed)&&pair.includes(want)&&typed!==want))return false;
    if(oppositeWords(typed,want))return false;
    if(editDistance(typed,want)>(want.length>=8?2:1))return false;
    current.spellingFix=a; // shown on the tick instead of the typo
    return true;
  });
}

// Right number, but typed "ms" (milliseconds) where the answer is another unit, e.g. m/s. Says why it is wrong; the answer is still marked wrong.
function millisecondHint(value){
  const src=current.source;if(!src?.phys||!src.numeric||!src.answerUnit)return '';
  const q=Physics12.splitQuantity(value);if(!q||q.unit!=='ms')return '';
  const want=Number(src.answer),tol=src.tolerance??0.01;if(!(Math.abs(q.value-want)<=Math.max(Math.abs(want)*tol,1e-12)))return '';
  return src.answerUnit==='m/s'?'ms means milliseconds, not metres per second. For metres per second, write m/s or m s^-1.':`ms means milliseconds, not ${src.answerUnit}.`;
}
// Shows the correct answer in symbols a student can type: N·m → N m, m/s² → m/s^2.
function typeableUnits(s){return String(s).replace(/[·⋅]/g,' ').replace(/²/g,'^2').replace(/³/g,'^3').replace(/⁻¹/g,'^-1').replace(/⁻²/g,'^-2').replace(/⁻³/g,'^-3');}
function fail(timeout=false,hint=''){playEffect('wrong');stop();attempts++;if(reviewDeck){reviewDeck.answer(false);advanceAfterCorrection=true;}else{correct=0;wrong++;}hud();showRule(`${hint?hint+' ':''}${typeableUnits(current.worked||`${current.prompt} Answer: ${current.answer}${current.unit?' '+current.unit:''}.`)}`,timeout?'Time’s up':'Try again');}
let correctFlashTimer;
function cashPop(amount){
  try{ // cosmetic only: never let it interrupt answering
  const score=$('casino-score');score.classList.remove('cash-pop');void score.offsetWidth;score.classList.add('cash-pop');
  const gain=document.createElement('span');gain.className='cash-gain';gain.textContent='+$'+amount;gain.setAttribute('aria-hidden','true');
  $('casino-status').appendChild(gain);setTimeout(()=>gain.remove(),1100);
  }catch{}
}
function flashCorrect(){
  cashPop(attempts?5:10);clearTimeout(correctFlashTimer);$('answer-result').innerHTML=`<span class="submitted-answer">${scienceMarkup(current.spellingFix||$('answer').value)}</span><span class="answer-mark" aria-label="Correct">✓</span>`;renderAnswerHint();
  correctFlashTimer=setTimeout(()=>{$('answer-result').innerHTML='';renderAnswerHint();},800);
}

function completedLevel(completed,advance){if(advance)position++;next();}
// Roulette opens after a short pause so the tick, cha-ching and count-up are seen first.
let pendingRoulette=false,rouletteSpinTimer,rouletteFinishSpin;const ROULETTE_DELAY_MS=1100;
$('answer-form').addEventListener('submit',e=>{
  e.preventDefault();if($('roulette-dialog').open||pendingRoulette)return;
  if(current.source?.phys&&current.source.numeric?Physics12.checkNumeric(current.source,$('answer').value)==='nounit':expectedAnswerUnit(current)&&/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)\s*[.!?;]*$/.test(withoutThousands(scientificInput($('answer').value)))){
    clearTimeout(correctFlashTimer);renderAnswerHint();
    const reminder=$('unit-reminder');reminder.hidden=false;reminder.classList.remove('unit-missing');void reminder.offsetWidth;reminder.classList.add('unit-missing');focus();return;
  }
  $('unit-reminder').hidden=true;
  if(!matches($('answer').value)){fail(false,millisecondHint($('answer').value));return;}
  playEffect('correct');flashCorrect();stop();score+=attempts?5:10;correct++;wrong=0;rouletteCorrectCount++;hud();
  if(reviewDeck)reviewDeck.answer(true);
  const levelFinished=!reviewDeck&&correct===(levels[questionLevel].correctTarget||3),completed=questionLevel,advance=position<enabled.length-1;
  if(levelFinished){correct=0;needsLevelCard=false;}
  const proceed=()=>{if(levelFinished)completedLevel(completed,advance);else{next();if(needsLevelCard){needsLevelCard=false;showRule();}}};
  if(rouletteCorrectCount>=rouletteTarget){rouletteCorrectCount=0;if($('roulette-enabled').checked&&score>0){rouletteTarget=10;hud();pendingRoulette=true;setTimeout(()=>{pendingRoulette=false;openRoulette(proceed);},ROULETTE_DELAY_MS);return;}hud();}
  proceed();
});
$('continue').addEventListener('click',()=>{if($('continue').textContent==='Start ↵')playEffect('level');});
$('rule-dialog').addEventListener('close',()=>{if(screen!=='game')return;if(advanceAfterCorrection){advanceAfterCorrection=false;next();return;}if(wrong>=3){wrong=0;if(position>0){position--;needsLevelCard=true;}}render();});
$('chapter-dialog').addEventListener('close',()=>{if(screen==='game')showRule('','Next learning unit');});
$('learn').onclick=()=>showRule('','Rule');$('timed').onchange=()=>{if($('timed').checked)unlockAudio();if(!$('rule-dialog').open&&!$('settings-dialog').open)startTimer();};
$('settings').onclick=()=>{returnToPreferences=true;$('preferences-dialog').close();stop();$('level-options').innerHTML=levels.map((l,i)=>({l,i})).filter(({l,i})=>curriculumUnits.length?(selectedUnit==='circuit_extension'?i<circuitLevelCount:l.unit===selectedUnit):true).map(({l,i})=>`<label><input type="checkbox" value="${i}" ${enabled.includes(i)?'checked':''}>${i+1}. ${l.name}</label>`).join('');$('settings-dialog').showModal();};
$('all').onclick=()=>document.querySelectorAll('#level-options input').forEach(el=>el.checked=true);
$('calculations').onclick=()=>document.querySelectorAll('#level-options input').forEach(el=>{const l=levels[Number(el.value)];el.checked=l.skill?l.make().answer.match(/^\d+(\.\d+)?$/)!==null:Number(el.value)>=12;});
$('save-settings').onclick=()=>{const selection=[...document.querySelectorAll('#level-options input:checked')].map(el=>Number(el.value));if(!selection.length){$('save-settings').textContent='Choose at least one step';return;}saveRun();needsLevelCard=false;enabled=selection;position=0;correct=wrong=score=rouletteCorrectCount=0;rouletteTarget=3;highestLevel=enabled[0]+1;current=levels[enabled[0]].make();returnToPreferences=false;$('settings-dialog').close();if(screen==='game'){activeRun=true;resetReviewDeck();next();showRule();}else{hud();showMenu();}};
$('settings-dialog').addEventListener('close',()=>{if(returnToPreferences){returnToPreferences=false;$('preferences-dialog').showModal();stop();return;}if(screen==='game'&&!$('rule-dialog').open){startTimer();focus();}else if(screen==='menu'){selectMenu(menuIndex);}});
function applyTheme(theme){document.documentElement.dataset.theme=theme;}
const themes=['paper','terminal','amber','ice','mono','apple2'];
try{const saved=localStorage.getItem('circuit-blaster-theme');$('theme').value=themes.includes(saved)?saved:'amber';}catch{$('theme').value='amber';}
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
  // S on the roulette table: skip the spin while it runs, otherwise skip or continue.
  // R / B / G on the roulette table pick red, black or green; Space spins.
  const betKey={r:'red',b:'black',g:'green'}[event.key.toLowerCase?.()];
  if(panel?.id==='roulette-dialog'&&betKey&&!event.ctrlKey&&!event.metaKey&&!event.altKey){event.preventDefault();selectRouletteColour(betKey);return;}
  if(panel?.id==='roulette-dialog'&&event.key===' '&&!event.ctrlKey&&!event.metaKey&&!event.altKey){event.preventDefault();if(!$('roulette-spin').disabled)$('roulette-form').requestSubmit();return;}
  if(panel?.id==='roulette-dialog'&&event.key.toLowerCase?.()==='s'&&!event.ctrlKey&&!event.metaKey&&!event.altKey){event.preventDefault();if(rouletteSpinning)rouletteFinishSpin?.();else $('roulette-continue').onclick();return;}
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
    // "cha-ching": two quick low blips, then a bright ringing bell
    correct:[[72,0,.05],[79,.06,.05],[91,.16,.09],[96,.16,.4],[103,.25,.35]],
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
  if(appleSpeaker()){
    try{
      // Two voices at most: a chord keeps its lowest and highest notes.
      const chords=new Map();
      for(const [note,offset,duration] of notes){if(!chords.has(offset))chords.set(offset,{notes:[],duration});const chord=chords.get(offset);chord.notes.push(note);chord.duration=Math.min(chord.duration,duration);}
      const volume=kind==='type'||kind==='rouletteTick'?.01:.016;
      for(const [offset,chord] of chords)for(const note of new Set([Math.min(...chord.notes),Math.max(...chord.notes)]))speakerTone(note,delay+offset,chord.duration,{volume,music:false});
    }catch{}
    return;
  }
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
// Apple II speaker: square waves through a small-speaker filter, at most two voices
// (lead and bass, as Electric Duet-style software managed). No fades: the build-up comes
// from the bass line underneath, not from extra high notes.
let speakerInput;
function appleSpeaker(){return $('music-sound').value!=='chip';}
function speakerOut(){
  if(!speakerInput){
    if(audioContext.createBiquadFilter){
      const low=audioContext.createBiquadFilter(),high=audioContext.createBiquadFilter();
      low.type='highpass';low.frequency.value=110;high.type='lowpass';high.frequency.value=3200;
      low.connect(high);high.connect(audioContext.destination);speakerInput=low;
    }else speakerInput=audioContext.destination;
  }
  return speakerInput;
}
function speakerTone(note,start,duration,{volume=.013,slide=0,music=true}={}){
  if(!note)return;
  const now=audioContext.currentTime+start,osc=audioContext.createOscillator(),gain=audioContext.createGain();
  osc.type='square';osc.frequency.value=440*Math.pow(2,(note-69)/12);
  if(slide){osc.frequency.setValueAtTime(osc.frequency.value,now);osc.frequency.exponentialRampToValueAtTime(slide,now+duration);}
  // 2 ms edges keep the on/off character without a click on every note.
  gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(volume,now+.002);
  gain.gain.setValueAtTime(volume,now+duration-.002);gain.gain.linearRampToValueAtTime(0,now+duration);
  osc.connect(gain);gain.connect(speakerOut());if(music)musicVoices.add(osc);
  osc.onended=()=>{musicVoices.delete(osc);osc.disconnect();gain.disconnect();};
  osc.start(now);osc.stop(now+duration+.005);
}
// Bass by energy: none, then held roots, octave bounce, a walking chord line, then drum clicks.
function speakerBass(length,beat,chord,energy){
  if(energy<1)return;
  const root=chord[0],fifth=chord[2]<root+12?chord[2]:chord[2]-12;
  if(energy===1){if(beat%2===0)speakerTone(root,0,length*1.9,{volume:.016});return;}
  let start=0;
  if(energy>=3&&(beat===0||beat===4)){speakerTone(36,0,.03,{volume:.02,slide:40});start=.03;}
  if(energy>=4&&(beat===2||beat===6)){speakerTone(67,0,.025,{volume:.012,slide:180});start=.025;}
  const line=energy===2?[root,root+12]:[root,fifth,root+12,fifth];
  speakerTone(line[beat%line.length],start,length*.85-start,{volume:.016});
}
function speakerStep(length,beat,chord,lead,energy){
  if(lead)speakerTone(lead,0,length*.9);
  speakerBass(length,beat,chord,energy);
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
  if(appleSpeaker()){speakerStep(.25,beat,chord,lead,energy);return;}
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
  if(appleSpeaker()){speakerStep(.2,beat,chord,lead,second?4:3);return;}
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
try{$('music-sound').value=localStorage.getItem('circuit-blaster-music-sound')==='chip'?'chip':'apple';}catch{$('music-sound').value='apple';}
$('music-sound').onchange=()=>{
  try{localStorage.setItem('circuit-blaster-music-sound',$('music-sound').value);}catch{}
  stopMusic();unlockAudio();startMusic();playEffect('menuUp');
};
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
function cardPicture(index){if(levels[index].cardHtml)return levels[index].cardHtml;if(levels[index].skill)return `<div class="revision-rule">${scienceMarkup(levels[index].rule)}</div>`;
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
function selectRouletteColour(colour){if(rouletteSpinning||roulettePlayed)return;if(colour!==rouletteSelectedColour)playEffect('rouletteBet');rouletteSelectedColour=colour;for(const c of ['red','black','green'])$('bet-'+c).setAttribute?.('aria-pressed',String(c===colour));if($('roulette-dialog').querySelector?.('.bet-colour.selected'))selectPanelControl($('roulette-dialog'),panelControls($('roulette-dialog')).indexOf($('bet-'+colour)));} // the keyboard cursor follows R/B/G
for(const colour of ['red','black','green'])$('bet-'+colour).onclick=()=>selectRouletteColour(colour);
// Down from a colour button moves to Spin (stopPropagation keeps the document-level answer-key handler from reading it).
// The pixel roulette wheel (also shown on the main menu).
function rouletteWheelSvg(){
  const step=360/rouletteWheel.length;
  // Draw on a four-unit grid so curved edges have deliberate pixel steps.
  const pixelDisc=(radius,inner=0)=>{let path='';for(let y=10;y<410;y+=4)for(let x=10;x<410;x+=4){const r=Math.hypot(x+2-210,y+2-210);if(r<=radius&&r>=inner)path+=`M${x} ${y}h4v4h-4z`;}return path;};
  const cells=rouletteWheel.map(()=>[]);
  for(let y=26;y<394;y+=4)for(let x=26;x<394;x+=4){const dx=x+2-210,dy=y+2-210,r=Math.hypot(dx,dy);if(r<122||r>184)continue;const angle=(Math.atan2(dx,-dy)*180/Math.PI+360)%360;const pocket=Math.round(angle/step)%37;cells[pocket].push(`M${x} ${y}h4v4h-4z`);}
  const pockets=rouletteWheel.map((n,i)=>`<g class="pocket-${rouletteColour(n)}"><path class="wheel-sector" d="${cells[i].join('')}"/><text class="wheel-number" x="210" y="54" text-anchor="middle" dominant-baseline="middle" transform="rotate(${i*step} 210 210)">${n}</text></g>`).join('');
  return `<svg class="roulette-disc" viewBox="0 0 420 420"><path class="wheel-rim" d="${pixelDisc(198)}"/><g id="roulette-rotor">${pockets}<path class="wheel-inner" d="${pixelDisc(120)}"/><path class="wheel-inner-ring" d="${pixelDisc(106,102)}"/><path class="wheel-spoke" d="M206 110h8v200h-8z M110 206h200v8H110z"/><path class="wheel-hub" d="${pixelDisc(30)}"/></g><g id="roulette-ball-orbit"><path class="wheel-ball" d="M206 30h8v4h4v8h-4v4h-8v-4h-4v-8h4z"/><path class="wheel-ball-shade" d="M214 38h4v4h-4z M210 42h4v4h-4z"/></g></svg>`;
}
function paintRoulette(index,total=1,stopAngle=0,target=0){
  const step=360/rouletteWheel.length;
  if(index===0)$('roulette-wheel').innerHTML=rouletteWheelSvg();
  const progress=Math.min(1,index/total),ease=1-Math.pow(1-progress,2);
  const wheelAngle=(stopAngle-720-target*step)*ease,ballAngle=(1080+stopAngle)*ease;
  $('roulette-rotor').setAttribute?.('style',`transform:rotate(${wheelAngle}deg)`);
  // The ball stays upright and snaps to the wheel's 4-unit pixel grid as it travels round (no rotated pixels).
  const rad=ballAngle*Math.PI/180,snap=v=>Math.round(v/4)*4;
  $('roulette-ball-orbit').setAttribute?.('style',`transform:translate(${snap(172*Math.sin(rad))}px,${snap(172-172*Math.cos(rad))}px)`);$('roulette-ball-orbit').setAttribute?.('data-angle',String(ballAngle));
}
$('menu-wheel').innerHTML=rouletteWheelSvg().replace(/<g id="roulette-ball-orbit">.*?<\/g>/,'').replace(' id="roulette-rotor"','');   // no ball on the menu
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
    $('roulette-bank').textContent=`$${value}`;
    $('score').textContent=`BANK $${String(value).padStart(6,'0')}`;
    if(frame===30){roulettePointsTimer=undefined;$('roulette-continue').disabled=false;return;}
    frame++;roulettePointsTimer=setTimeout(count,30);
  }
  count();
}
// The bank balance flies from the bottom-left counter to its place on the roulette table (cosmetic; skipped if animation is unavailable).
function flyBalanceToRoulette(fromRect,fromFont){
  try{
    const bank=$('roulette-bank');if(!fromRect||!bank.animate)return;
    const to=bank.getBoundingClientRect(),toFont=parseFloat(getComputedStyle(bank).fontSize)||64;
    const fly=document.createElement('div');fly.className='balance-fly';fly.textContent=bank.textContent;fly.setAttribute('aria-hidden','true');
    fly.style.cssText=`position:fixed;left:0;top:0;margin:0;font-size:${toFont}px;transform-origin:0 0;z-index:10;pointer-events:none;white-space:nowrap;color:var(--ink);font-variant-numeric:tabular-nums;`;
    $('roulette-dialog').appendChild(fly);
    const w=fly.getBoundingClientRect().width,cx=to.left+(to.width-w)/2,scale=(fromFont||toFont)/toFont;
    const ms=800;
    bank.animate([{opacity:0},{opacity:0,offset:.9},{opacity:1}],{duration:ms});
    fly.animate([{transform:`translate(${fromRect.left}px,${fromRect.top}px) scale(${scale})`},{transform:`translate(${cx}px,${to.top}px) scale(1)`}],{duration:ms,easing:'cubic-bezier(.3,.1,.2,1)',fill:'forwards'}).onfinish=()=>fly.remove();
  }catch{}
}
function openRoulette(proceed){const flyFrom=$('casino-score').getBoundingClientRect?.(),flyFont=typeof getComputedStyle==='function'?parseFloat(getComputedStyle($('casino-score')).fontSize):0;stop();rouletteProceed=proceed;roulettePlayed=false;rouletteSpinning=false;$('roulette-points-change').textContent='';$('roulette-points-change').setAttribute?.('data-direction','');$('roulette-bank').textContent=`$${score}`;$('roulette-bet').max=String(score);$('roulette-bet').value=String(Math.min(10,score));updateRouletteBet();$('roulette-result').textContent='Place a bet or skip.';$('roulette-spin').disabled=false;$('roulette-bet').disabled=false;$('roulette-colour').disabled=false;$('roulette-continue').disabled=false;$('roulette-continue').textContent='Skip (S) ↵';paintRoulette(0);$('roulette-dialog').showModal();flyBalanceToRoulette(flyFrom,flyFont);stopMusic();musicEffectPause=false;rouletteMusicStep=0;startMusic();}
$('roulette-form').addEventListener('submit',e=>{e.preventDefault();if(rouletteSpinning||roulettePlayed||!$('roulette-dialog').open)return;const stake=Number($('roulette-bet').value),colour=rouletteSelectedColour;if(!Number.isInteger(stake)||stake<1||stake>score||!['red','black','green'].includes(colour)){$('roulette-result').textContent=`Bet a whole dollar amount from $1 to $${score}.`;return;}
  const target=Math.floor(Math.random()*37),stopAngle=Math.random()*360,steps=74+target,bankBefore=score;let frame=0;rouletteSpinning=true;roulettePlayed=true;score-=stake;hud();$('roulette-spin').disabled=true;$('roulette-bet').disabled=true;$('roulette-colour').disabled=true;$('roulette-continue').disabled=true;$('roulette-result').textContent='SPINNING…';playEffect('rouletteStart');
  function spin(){paintRoulette(frame,steps,stopAngle,target);if(frame<steps&&(frame%2===0||frame>=steps-15))playEffect('rouletteTick');if(frame===steps){const n=rouletteWheel[target],landed=rouletteColour(n),win=landed===colour,payout=win?stake*(colour==='green'?50:3):0;score+=payout;hud();playRouletteResult(win);rouletteSpinning=false;animateRoulettePoints(bankBefore,score);$('roulette-result').textContent='';$('roulette-continue').textContent='Continue (S) ↵';$('roulette-fast').hidden=true;rouletteFinishSpin=undefined;return;}frame++;rouletteSpinTimer=setTimeout(spin,frame<steps-15?25:35+(frame-(steps-15))*12);}
  // Skip spin: jump straight to the last frame, which settles the bet as usual.
  rouletteFinishSpin=()=>{clearTimeout(rouletteSpinTimer);frame=steps;spin();};
  $('roulette-fast').hidden=false;$('roulette-fast').focus();
  spin();
});
$('roulette-fast').onclick=()=>rouletteFinishSpin?.();
$('roulette-continue').onclick=()=>{if(!rouletteSpinning&&!$('roulette-continue').disabled)$('roulette-dialog').close();};
$('roulette-dialog').addEventListener('cancel',e=>{if(rouletteSpinning){e.preventDefault();rouletteFinishSpin?.();}});
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
const curriculumUnits=(typeof REVISION_UNITS==='undefined'?[]:REVISION_UNITS).concat(typeof MIXED_REVISION_UNIT==='undefined'?[]:[MIXED_REVISION_UNIT],typeof Physics12==='undefined'?[]:[Physics12.unit()],typeof EXTRA_UNITS==='undefined'?[]:EXTRA_UNITS);
// Classes: each unit belongs to one. URL: ?class=yr12 (or yr10, flags, dutch); ?unit=… still works and implies its class.
// Extra units (revision/flags, revision/dutch) push themselves onto EXTRA_UNITS with their own `class`; a class with no units is hidden.
const CLASSES=[{id:'yr10',name:'YEAR 10',defaultUnit:'electricity_magnetism'},{id:'yr12',name:'YEAR 12',defaultUnit:'yr12_physics'},{id:'flags',name:'FLAGS',defaultUnit:'flags'},{id:'dutch',name:'DUTCH',defaultUnit:'dutch'}].filter(c=>c.id==='yr10'||curriculumUnits.some(u=>u.id===c.defaultUnit));
const unitClass=id=>id==='yr12_physics'?'yr12':curriculumUnits.find(u=>u.id===id)?.class||'yr10';
let selectedClass='yr10';const lastUnitForClass={};
function mixedQuestionPicker(questions,ordered=false){
  // E4 (core comparison) disabled pending a clearer question. Retain its source for revision.
  questions=questions.filter(item=>item.id!=='E4');
  let deck=[],previous='';
  const shuffled=items=>{if(ordered)return [...items];const pool=[...items],out=[];while(pool.length){const chosen=pick(pool);out.push(chosen);pool.splice(pool.indexOf(chosen),1);}return out;};
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
    const getItem=unit.mixed?mixedQuestionPicker(skill.questions,skill.ordered):()=>pick(skill.questions);
    const entry={name:skill.name.toUpperCase(),rule:skill.summary,cardHtml:skill.cardHtml,example:skill.example||(unit.mixed?'Read each question carefully. Use working for calculations and units as requested.':skill.questions[0].prompt+' Answer: '+skill.questions[0].answer),reset:unit.mixed?()=>getItem.reset():undefined,correctTarget:skill.correctTarget||3,ordered:skill.ordered,questions:skill.questions,skill:skill.id,unit:unit.id,
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
  $('unit-note').textContent=unit?.status==='cross-unit'?'No separate unit plan available; investigation skills are woven into the other units.':unit?.status==='unconfirmed'?'Optional unit — confirm with your teacher.':id==='circuit_extension'?'Original circuit ladder, including extension calculations.':'';
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
for(const button of document.querySelectorAll('[data-setting="class"]'))button.hidden=!CLASSES.some(c=>c.id===button.dataset.value);
$('menu-class').onclick=()=>{chooseClass(CLASSES[(CLASSES.findIndex(c=>c.id===selectedClass)+1)%CLASSES.length].id);selectMenu(menuIds.indexOf('menu-class'));};
if(curriculumUnits.length){
  const params=new URLSearchParams(location.search),requestedUnit=params.get('unit');let requestedClass=({yr10:'yr10',y10:'yr10',10:'yr10',year10:'yr10',yr12:'yr12',y12:'yr12',12:'yr12',year12:'yr12',flags:'flags',flag:'flags',dutch:'dutch',nl:'dutch'})[String(params.get('class')||'').toLowerCase()];
  const validUnit=curriculumUnits.some(u=>u.id===requestedUnit)||requestedUnit==='circuit_extension';
  if(requestedClass&&!CLASSES.some(c=>c.id===requestedClass))requestedClass=undefined;
  if(requestedClass)selectedClass=requestedClass;
  if(validUnit&&(!requestedClass||unitClass(requestedUnit)===requestedClass))selectedUnit=requestedUnit;
  else if(requestedClass)selectedUnit=CLASSES.find(c=>c.id===requestedClass).defaultUnit;
  if(!curriculumUnits.some(u=>u.id===selectedUnit)&&selectedUnit!=='circuit_extension')selectedUnit=curriculumUnits[0].id;
  chooseUnit(selectedUnit);
}

// START opens a chooser: all levels, one level, or (Year 12) one skill group, optionally limited to one topic.
// Each choice becomes a level entry so the usual deck, review and roulette loop runs unchanged.
const practiceEntries=new Map();let practiceTopic='all';
const practiceUnit=()=>curriculumUnits.find(u=>u.id===selectedUnit);
const practiceChoosable=()=>{const unit=practiceUnit();return !!unit&&unit.skills.length>0;};
function practiceEntry(key,name,questions,mixed=true){
  if(!practiceEntries.has(key)){
    const next=mixedQuestionPicker(questions);
    levels.push({name:name.toUpperCase(),rule:`Practice: ${name}.`,example:'Read each question carefully. Use working for calculations and units as requested.',reset:()=>next.reset(),correctTarget:3,questions,skill:key,unit:'practice',focus:true,make:()=>makeRevisionQuestion(next(),mixed)});
    practiceEntries.set(key,levels.length-1);
  }
  return practiceEntries.get(key);
}
const ownLevels=()=>levels.map((l,i)=>i).filter(i=>!levels[i].focus&&levels[i].unit===selectedUnit);
function levelForTopic(index,topic){
  const questions=levels[index].questions.filter(item=>item.unit===topic);
  if(topic==='all'||questions.length===levels[index].questions.length)return index;   // nothing filtered out: keep the real level (its card and order)
  return questions.length?practiceEntry(`${levels[index].skill}|${topic}`,`${levels[index].name} · ${topic}`,questions):null;
}
function skillGroups(unit){
  const groups=new Map();
  // Year 12 groups by umbrella skill (questions keep their fine-grained skill); units and prefixes have none and stay as levels.
  for(const skill of unit.skills)for(const item of skill.questions){const name=unit.physics12?item.umbrella:String(item.skill||'').split(':')[0].trim();if(!name)continue;if(!groups.has(name))groups.set(name,[]);groups.get(name).push(item);}
  return groups;
}
// 16×16 pixel icons for the practice tiles, picked by keywords in the level name (first match wins; star otherwise).
// Each icon is 16 rows of 4 hex digits (one bit per pixel, left = high bit). Redraw them with scripts/pixel_icons.py.
const PIXEL_ICONS={atom:'01800ff01818203467f64c324812c993c99348124c3267e6200418180ff00000',balls:'000003c0066004200420042006603ffc418241824182418241823e7c00000000',bars:'40004000401c401c401c41dc41dc41dc41dc5ddc5ddc5ddc5ddc5ddc5ddc7fff',bb:'00000000000078606c606c6078786c6c6c6c787800000000ffff000000000000',bolt:'007800f001e003c007800ff801f003e007c00f001c0030004000000000000000',breed:'700e88118a518991718e22442004218403c004200420042003c0018001800180',bulb:'07e008101008124812481188099005a003c003c003c001800000000000000000',car:'00000000f80000003bf00408088410827ffe80018001f3e712240c1800000000',charged:'000000000000000000387c440092feba00927c44003800000000000000000000',circuit:'0000020002407e7e42424202400240024002400247e27c3e07e0000000000000',collide:'0000000000001c383e7c3e7c3e7c1c3800002004f00f20040000000000000000',conical:'000007e002400240024002400240042004200e1010101ff8200420047ffe0000',directions:'0000020007000a800200020002000208020403fe040448085000600078000000',dna:'20043ffc10080c3003c00c3010083ffc200410080c3003c00c3010083ffc2004',dom:'0000000000000000f030da30d930f0bcd936da36f03c00000000000000000000',electromagnet:'00000000000000001e781248124a1249f24f1249124a124813c8000000000000',element:'7ffe400258024402480250025c024002520252e25ea252e25282527240027ffe',eq_choose:'00000000003c00660006e00c8e18c0188e008018001800000000000000000000',eq_given:'000000000000ffff0000a0ecae4aa04cae4a40ea0000ffff0000000000000000',equation:'0000000040c0a4a0eec0a4a0a0c00000000600887fc800880006000000000000',flag:'000040007f1c7ffe7ffe7ffe7ffe7ffe61fe401c4000400040004000e0000000',flask:'00000ff0042004200620046004200820091010101ff83fbc3bfc7ffc7ffe0000',force:'0000000000000000000007e004244422fc3f442207e400000000000000000000',graph:'4000400040024004400840104020402040404640498048005000600040007fff',indicator:'00001fe008400844084e085f085f085f0fce0fc00fc00fc00fc007c007800000',magnet:'000007e0181827e42814500a500a500a500a500a700e500a700e000000000000',meter:'0000000007e01818100821042284e387e287228420041008181807e000000000',mixed:'0000007f0041005100410045ffc180ffa08080808880808082808080ff800000',motor:'01000380054001000100e7c7e827eaa7e927eaa7e827e7c70000000000000000',mutation:'40087ff8201018600780186020107ff840080008001c00bf001c000800000008',orbit:'000001801818200400000002400741ff40070002000020041818018000000000',pack:'07e0081008103ffc4002400240027ffe43c2424243c2400240027ffe00000000',page:'00003fe020302028203c200420042ff420042ff420042ff420042f8420043ffc',plant:'03800440044003800100610c911289224544393801000100010007c000000000',plates:'0000ffff000021082108210821082108739c21080000ffff0000000000000000',prefix:'0000000000070001000700010007017003505150215051700000000000000000',projectile:'000000000540101020080000400400008002000080020001c000c00100000000',punnett:'0e3800003fff2081ae81ae81ae8120813fff2081a081a081a081208120813fff',quake:'000000000200020002800a800a801ae0fdff05c0054005000500010001000000',ramp:'000038007c007c0038008000e0009800860081808060801880068001ffff0000',resistor:'00000000000000000000111011102aa8eaab0aaa044404440000000000000000',seesaw:'0000000000000000000760076007ffff018003c007e00ff00000000000000000',spring:'3ffc018007e0081007e0081007e0081007e001800ff00810081008100ff00000',star:'0180018003c003c007e0ffff7ffe1ff80ff00ff01e781c38381c300c40020000',states:'00000000000800140014002200220041fe518249b222821c82008200fe000000',stopwatch:'000003c0018203c40c301008210421242144218420042004200410080c3003c0',table:'0000e007a005e007b81fe815bfeeeaaabfeeeaaabfeeeaaa7fee00003ff03ff0',tip:'000003c0044004200820081009901188124810042004210420047ffe0000ffff',vectors:'003c000c00140024004400840104020404040804100420044004fffe00000000',wave:'000001e00618080210e02100210040c040008000830c4cdb30200000ffff0000',weight:'03c0024003c00ff00810100814081508263426542534406240027ffe00000000',xx:'00006363363636361c1c1c1c3636363636366363636300000000000000000000'};
// Extra frames for a few icons, shown in turn while the tile is highlighted (2, 4 or 8 frames in all, counting the still icon); the rest bob. Edit with scripts/pixel_icons.py.
const PIXEL_FRAMES={orbit:['0000018018182004000000004002410241020100010021041b9807c003800000','000001801818200400004000e002ff82e0024000000020041818018000000000','038007c01b982104010001004102410240020000000020041818018000000000'],projectile:['0000000005401010200800004004c000c0020000800200010000000100000000','0000000005403010300800004004000080020000800200010000000100000000','0000060007401010200800004004000080020000800200010000000100000000','0000006005601010200800004004000080020000800200010000000100000000','000000000540101c200c00004004000080020000800200010000000100000000','0000000005401010200800004004000380030000800200010000000100000000','0000000005401010200800004004000080020000800200010003000300000000'],seesaw:['00000000000060006000c0073c0703c701bc03c307e00ff00000000000000000','0000000000000000000760076007ffff018003c007e00ff00000000000000000','000000000007000700070003603c63c03d80c3c007e00ff00000000000000000'],spring:['3ffc018007e0081007e0081007e001800ff00810081008100ff0000000000000'],stopwatch:['000003c0018203c40c301008210421042104218420442024200410080c3003c0','000003c0018203c40c301008210421042104230424042804200410080c3003c0','000003c0018203c40c301008210429042504230420042004200410080c3003c0']};
const DOODLES=[
  [/mixed|^all (mechanics|electromagnetism)$/,'mixed'],
  [/^(world|oceania|asia|europe|africa|north america|south america)$/,'flag'],
  // Year 12 umbrella skills
  [/hooke/,'spring'],[/torque and moments/,'seesaw'],[/momentum and impulse/,'collide'],[/circular motion/,'orbit'],[/^projectiles/,'projectile'],[/^vectors/,'vectors'],
  [/motion graphs/,'graph'],[/work, energy and power/,'ramp'],[/forces and newton/,'force'],[/speed and acceleration/,'stopwatch'],
  [/electromagnetic induction/,'electromagnet'],[/^magnetic force/,'motor'],[/magnets and magnetic/,'magnet'],[/^electric fields/,'plates'],
  [/ohm’s law and/,'resistor'],[/series and parallel circuits/,'circuit'],[/electrical power and/,'bulb'],[/current, charge and/,'bolt'],
  [/same or different|series rules|parallel rules|circuits and/,'circuit'],
  [/prefix|conversion/,'prefix'],
  [/electromagnet(?!ism)/,'electromagnet'],
  [/magnet|electromagnetism units/,'magnet'],
  [/mechanics units|mass and weight/,'weight'],
  [/multiple choice|directions/,'directions'],
  [/equation given/,'eq_given'],
  [/choose the equation/,'eq_choose'],
  [/word problem|word equation/,'page'],
  [/symbol equation|reaction pattern|formula/,'equation'],
  [/indicator/,'indicator'],
  [/\bph\b|acid|\bbases and|alkali|neutral|salt|carbonate/,'flask'],
  [/electron arrangement|shells|subatomic|ions/,'atom'],
  [/element symbol|atomic and mass|common ion/,'element'],
  [/group|period|metals and non/,'table'],
  [/states|chemical change/,'states'],
  [/charged particle/,'charged'],
  [/mass|bonding|particle/,'balls'],
  [/net force|types of force/,'force'],
  [/acceleration|newton/,'car'],
  [/speed|calculate/,'stopwatch'],
  [/data/,'bars'],
  [/graph/,'graph'],
  [/stability|centre of gravity/,'tip'],
  [/charge|static/,'bolt'],
  [/quantities|meters/,'meter'],
  [/resistance|energy/,'resistor'],
  [/variable|fair test/,'conical'],
  [/punnett|probability/,'punnett'],
  [/xx|chromosome/,'xx'],
  [/allele|genotype/,'bb'],
  [/dominant|recessive/,'dom'],
  [/pure breeding|selective breeding/,'breed'],
  [/mutation/,'mutation'],
  [/dna|gene|inheritance/,'dna'],
  [/trait|variation|natural selection|heredity/,'plant'],
  [/earthquake|plate|monitoring/,'quake'],
  [/tsunami|response/,'wave'],
  [/survival|equipment/,'pack']
];
function levelDoodle(name){
  const key=String(name).toLowerCase(),icon=(DOODLES.find(([pattern])=>pattern.test(key))||[0,'star'])[1],frames=[PIXEL_ICONS[icon],...(PIXEL_FRAMES[icon]||[])];
  const path=bits=>{let d='';for(let y=0;y<16;y++){const row=parseInt(bits.slice(y*4,y*4+4),16);for(let x=0;x<16;x++)if(row&(0x8000>>x))d+=`M${x} ${y}h1v1h-1z`;}return `<path d="${d}"/>`;};
  return `<svg class="practice-doodle${frames.length>1?' px-frames px-f'+frames.length:''}" viewBox="0 0 16 16" aria-hidden="true">${frames.map(path).join('')}</svg>`;
}
const PRACTICE_PAGE=15,PRACTICE_COLS=5;let practicePage=0,practicePages=1,practiceSearch='';
// Year 12 levels that belong to one topic's section of the chooser (the rest go under All physics).
const PRACTICE_SECTION_OF={'yr12_physics-mech-units':'Mechanics','yr12_physics-em-units':'Electromagnetism','yr12_physics-same-circuit':'Electromagnetism'};
function renderPractice(){
  const unit=practiceUnit(),own=ownLevels(),topical=!!unit.physics12;
  const tile=(code,label,note,rank,also='')=>({name:(label+' '+also).toLowerCase(),html:`<button type="button" class="practice-tile" data-practice="${escapeMarkup(code)}" data-name="${escapeMarkup(label.toLowerCase())}"><span class="skill-rank">${rank}</span>${levelDoodle(label)}<span class="practice-name">${escapeMarkup(label)}</span><span class="skill-selected">${note}</span></button>`});
  const levelTiles=own.filter(index=>!topical||practiceTopic==='all'||levels[index].questions.some(item=>item.unit===practiceTopic));
  let n=0;const rank=()=>String(++n).padStart(2,'0');
  let sections;
  if(topical){
    // Year 12: All physics, then Mechanics, then Electromagnetism. Each section starts a new page; the tabs above the grid name them.
    const order=typeof Physics12==='undefined'?[]:Physics12.UMBRELLA_ORDER,place=name=>order.includes(name)?order.indexOf(name):order.length;
    const groups=[...skillGroups(unit)].map(([name,items])=>[name,items.filter(item=>practiceTopic==='all'||item.unit===practiceTopic)]).filter(([,items])=>items.length).sort((a,b)=>place(a[0])-place(b[0])||a[0].localeCompare(b[0]));
    const sectionOf=index=>PRACTICE_SECTION_OF[levels[index].skill]||'All physics';
    sections=['All physics','Mechanics','Electromagnetism'].map(title=>({title,tiles:[
      title==='All physics'?tile('mixed',unit.mixedName||'Everything mixed together','','ALL'):tile(`topic:${title}`,`All ${title.toLowerCase()}`,'','ALL'),
      ...levelTiles.filter(index=>sectionOf(index)===title).map(index=>tile(`level:${index}`,levels[index].name,'',rank())),
      // Search also matches the fine-grained skills inside each umbrella (e.g. "hooke").
      ...groups.filter(([,items])=>items[0].unit===title).map(([name,items])=>tile(`skill:${name}`,name,'',rank(),[...new Set(items.map(item=>item.skill))].join(' ')))]}));
  }else sections=[{title:'',tiles:[tile('mixed',unit.mixedName||'Everything mixed together','','ALL'),...levelTiles.map(index=>tile(`level:${index}`,levels[index].name,'',rank()))]}];
  if(practiceSearch)sections.forEach(section=>section.tiles=section.tiles.filter(item=>item.name.includes(practiceSearch)));
  sections=sections.filter(section=>section.tiles.length);
  // Pages hold 3 rows of 5 cells. A section moves to the next page whole when it doesn't fit; a section longer than a page is split.
  const pages=[[]],names=[[]];let rowsUsed=0;
  for(const section of sections){
    const cells=section.tiles.map(item=>item.html);
    const rows=Math.ceil(cells.length/PRACTICE_COLS);
    if(rowsUsed&&rowsUsed+rows>PRACTICE_PAGE/PRACTICE_COLS){pages.push([]);names.push([]);rowsUsed=0;}
    for(let i=0;i<cells.length;i+=PRACTICE_PAGE){if(i){pages.push([]);names.push([]);rowsUsed=0;}if(section.title)names[names.length-1].push(section.title);pages[pages.length-1].push(...cells.slice(i,i+PRACTICE_PAGE));rowsUsed+=Math.ceil(Math.min(PRACTICE_PAGE,cells.length-i)/PRACTICE_COLS);}
  }
  practicePages=pages.length;practicePage=Math.min(practicePage,pages.length-1);
  $('practice-rows').innerHTML=pages[practicePage].join('')||'<p>No skills match.</p>';
  $('practice-pager').hidden=practicePages<2;
  // Visual cue only: < and > beside the grid when there is another page that way (the arrow keys get there).
  $('practice-more-left').hidden=practicePage===0;$('practice-more-right').hidden=practicePage>=practicePages-1;
  // Tabs along the top, one per page, named after its sections (or numbered); the current page is highlighted.
  const labels=names.map((list,i)=>[...new Set(list)].join(' · ')||`Page ${i+1}`).map((label,i,all)=>all.indexOf(label)<i?`${label} ${all.slice(0,i+1).filter(x=>x===label).length}`:label);
  $('practice-pager').innerHTML=labels.map((label,i)=>`<button type="button" role="tab" data-tab="${i}" aria-selected="${i===practicePage}">${escapeMarkup(label)}</button>`).join('');
  $('practice-find').hidden=!topical;
}
function filterPractice(){practiceSearch=$('practice-search').value.trim().toLowerCase();practicePage=0;renderPractice();}
function beginPractice(code){
  const unit=practiceUnit(),topic=unit.physics12?practiceTopic:'all';
  let picked;
  if(code==='mixed'){const questions=ownLevels().flatMap(index=>levels[index].questions).filter(item=>topic==='all'||item.unit===topic);picked=questions.length?[practiceEntry(`mixed|${selectedUnit}|${topic}`,unit.mixedName||'Everything mixed together',questions,!!unit.mixed)]:[];}
  else if(code.startsWith('topic:')){const name=code.slice(6),questions=ownLevels().flatMap(index=>levels[index].questions).filter(item=>item.unit===name);picked=questions.length?[practiceEntry(`mixed|${selectedUnit}|${name}`,`All ${name.toLowerCase()}`,questions,!!unit.mixed)]:[];}
  else if(code.startsWith('level:'))picked=[levelForTopic(Number(code.slice(6)),topic)];
  else{const name=code.slice(6),questions=(skillGroups(unit).get(name)||[]).filter(item=>topic==='all'||item.unit===topic);picked=questions.length?[practiceEntry(`skill|${name}|${topic}`,name,questions)]:[];}
  picked=picked.filter(index=>index!==null);if(!picked.length)return;
  enabled=picked;enabled.forEach(index=>levels[index].reset?.());
  position=0;current=levels[enabled[0]].make();questionLevel=enabled[0];highestLevel=enabled[0]+1;
  $('unit-note').textContent='';
  $('practice-dialog').close();hud();startGame();
}
$('practice-dialog').addEventListener('click',event=>{
  const pager=event.target.closest?.('[data-tab]');
  if(pager){practicePage=Number(pager.dataset.tab);renderPractice();selectPanelControl($('practice-dialog'),panelControls($('practice-dialog')).indexOf($('practice-pager').querySelector(`[data-tab="${practicePage}"]`)));return;}
  const button=event.target.closest?.('[data-practice]');if(button)beginPractice(button.dataset.practice);
});
$('practice-search').addEventListener('input',filterPractice);
$('start-game').onclick=()=>{if(activeRun||selectedUnit==='circuit_extension'||!practiceChoosable())return startGame();practicePage=0;practiceSearch='';$('practice-search').value='';renderPractice();$('practice-dialog').showModal();selectPanelControl($('practice-dialog'),panelControls($('practice-dialog')).indexOf($('practice-rows').querySelector('.practice-tile')));};

function syncSettingChoices(){
  for(const button of document.querySelectorAll('[data-setting]'))button.setAttribute('aria-pressed',String($(button.dataset.setting).value===button.dataset.value));
}
$('preferences-dialog').addEventListener('click',event=>{
  const button=event.target.closest?.('[data-setting]');if(!button)return;
  $(button.dataset.setting).value=button.dataset.value;$(button.dataset.setting).onchange();syncSettingChoices();
});
syncSettingChoices();

var menuPanelIds=['rule-dialog','settings-dialog','leaderboard-dialog','preferences-dialog','roulette-dialog','chapter-dialog','skill-dialog','practice-dialog'];
function activeMenuPanel(){return (menuPanelIds||['rule-dialog','settings-dialog','leaderboard-dialog','preferences-dialog','roulette-dialog','chapter-dialog','skill-dialog','practice-dialog']).map($).find(panel=>panel.open);}
function panelControls(panel){
  // After the wheel has spun, the only thing to do is Continue: keep arrow keys on it.
  if(panel.id==='roulette-dialog'&&roulettePlayed)return [$('roulette-continue')].filter(control=>!control.disabled);
  return [...panel.querySelectorAll('button,input:not([type="hidden"])')].filter(control=>!control.disabled&&!control.hidden&&(!control.getClientRects||control.getClientRects().length));}
function selectPanelControl(panel,index){const controls=panelControls(panel);if(!controls.length)return;index=(index+controls.length)%controls.length;controls.forEach((control,i)=>control.classList.toggle('selected',i===index));controls[index].focus();}
var spatialPanelIds=['practice-dialog','preferences-dialog','roulette-dialog'];
function navigatePanel(panel,event){
  const controls=panelControls(panel);if(!controls.length)return;
  let index=controls.indexOf(document.activeElement);if(index<0)index=controls.findIndex(control=>control.classList.contains('selected'));if(index<0)index=0;
  if(['ArrowDown','ArrowUp','ArrowLeft','ArrowRight'].includes(event.key)){
    if(controls[index].type==='range'&&['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();
    // Practice, Settings and the roulette table: arrows follow the on-screen layout (styleguide: left/right stay in the row, up/down change rows and wrap).
    // On the practice screen, past the end of a row of tiles, left/right turn the page; elsewhere the end of a row is a stop.
    if(spatialPanelIds.includes(panel.id)){
      const horizontal=['ArrowLeft','ArrowRight'].includes(event.key),forward=['ArrowRight','ArrowDown'].includes(event.key);
      const boxes=controls.map((control,i)=>({i,box:control.getBoundingClientRect()})),here=boxes[index].box,cx=here.left+here.width/2,cy=here.top+here.height/2;
      const centre=({box})=>[box.left+box.width/2,box.top+box.height/2];
      const sameRow=boxes.filter(item=>item.i!==index&&Math.abs(centre(item)[1]-cy)<here.height/2);
      // Left/right along the page tabs turn the page as they go.
      if(horizontal&&controls[index].dataset.tab!==undefined){
        const next=practicePage+(forward?1:-1);if(next<0||next>=practicePages)return;
        practicePage=next;renderPractice();return selectPanelControl(panel,panelControls(panel).indexOf($('practice-pager').querySelector(`[data-tab="${next}"]`)));
      }
      if(horizontal){
        const ahead=sameRow.filter(item=>forward?centre(item)[0]>cx:centre(item)[0]<cx).sort((a,b)=>Math.abs(centre(a)[0]-cx)-Math.abs(centre(b)[0]-cx));
        if(ahead.length)return selectPanelControl(panel,ahead[0].i);
        const next=practicePage+(forward?1:-1);
        // Off the side of the page: the next page in that direction, on the same row (or its last row if it has fewer), at the near end.
        if(controls[index].classList.contains('practice-tile')&&next>=0&&next<practicePages){
          const rowTops=()=>[...new Set([...$('practice-rows').querySelectorAll('.practice-tile')].map(tile=>Math.round(tile.getBoundingClientRect().top)))].sort((a,b)=>a-b);
          const row=rowTops().findIndex(top=>Math.abs(top-here.top)<4);
          practicePage=next;renderPractice();
          const tops=rowTops(),top=tops[Math.min(Math.max(row,0),tops.length-1)];
          const inRow=[...$('practice-rows').querySelectorAll('.practice-tile')].filter(tile=>Math.abs(tile.getBoundingClientRect().top-top)<4).sort((a,b)=>a.getBoundingClientRect().left-b.getBoundingClientRect().left);
          return selectPanelControl(panel,panelControls(panel).indexOf(forward?inRow[0]:inRow[inRow.length-1]));}
        return;
      }
      // Down from the bottom row of tiles turns to the next page; up from the top row goes to the current page's tab.
      if(controls[index].classList.contains('practice-tile')){
        const tileBoxes=boxes.filter(item=>controls[item.i].classList.contains('practice-tile')),beyond=tileBoxes.some(item=>forward?item.box.top>=here.bottom-1:item.box.bottom<=here.top+1),next=practicePage+(forward?1:-1);
        const tab=$('practice-pager').hidden?null:$('practice-pager').querySelector(`[data-tab="${practicePage}"]`);
        if(!beyond&&!forward&&tab)return selectPanelControl(panel,controls.indexOf(tab));
        if(!beyond&&next>=0&&next<practicePages){
          practicePage=next;renderPractice();
          const tiles=[...$('practice-rows').querySelectorAll('.practice-tile')],edge=forward?tiles[0].getBoundingClientRect().top:tiles[tiles.length-1].getBoundingClientRect().top;
          const row=tiles.filter(tile=>Math.abs(tile.getBoundingClientRect().top-edge)<4).sort((a,b)=>Math.abs(a.getBoundingClientRect().left+a.offsetWidth/2-cx)-Math.abs(b.getBoundingClientRect().left+b.offsetWidth/2-cx));
          return selectPanelControl(panel,panelControls(panel).indexOf(row[0]));}
      }
      let rows=boxes.filter(item=>forward?item.box.top>=here.bottom-1:item.box.bottom<=here.top+1);
      if(!rows.length)rows=boxes.filter(item=>!sameRow.includes(item)&&item.i!==index);
      if(!rows.length)return;
      // Down takes the highest row below (wrapping: the first row); up takes the lowest row above (wrapping: the bottom row).
      const near=forward?Math.min(...rows.map(r=>r.box.top)):Math.max(...rows.map(r=>r.box.bottom));
      const row=rows.filter(({box})=>Math.abs((forward?box.top:box.bottom)-near)<4).sort((a,b)=>Math.abs(centre(a)[0]-cx)-Math.abs(centre(b)[0]-cx));
      return selectPanelControl(panel,row[0].i);
    }
    selectPanelControl(panel,index+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1));
  }else if(event.key==='Enter'){event.preventDefault();controls[index].click();}
}
for(const id of menuPanelIds){const panel=$(id),open=panel.showModal.bind(panel);panel.showModal=()=>{open();const controls=panelControls(panel);const chosen=controls.findIndex(control=>control.getAttribute('aria-pressed')==='true');selectPanelControl(panel,chosen>=0?chosen:0);};panel.addEventListener('focusin',event=>{const controls=panelControls(panel),index=controls.indexOf(event.target);if(index>=0)controls.forEach((control,i)=>control.classList.toggle('selected',i===index));});}

function selectConnection(value){$('answer').value=value;document.querySelectorAll('[data-connection]').forEach(button=>{const selected=button.dataset.connection===value;button.classList.toggle('selected',selected);button.setAttribute('aria-pressed',String(selected));if(selected)button.focus();});}
function routeAnswerKey(event){
  if(!activeRun||event.ctrlKey||event.metaKey||event.altKey||event.isComposing)return;
  if(current.source?.choices||current.source?.id==='E1'){
    if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();const choices=current.choiceOrder||['series','parallel'];const index=choices.indexOf($('answer').value);const direction=['ArrowLeft','ArrowUp'].includes(event.key)?-1:1;selectConnection(choices[Math.min(choices.length-1,Math.max(0,index+direction))]);} // stop at the ends, no wrapping
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

// Clickable special characters (student suggestion, 23/10/2026). Inserts at the caret of the last answer field used.
const SYMBOLS=['Ω','µ','¹','²','³','⁻','⁺','₁','₂','₃','×','÷','Δ','θ','λ','τ','π','Φ','ε','Σ','°','±'];
let lastAnswerField=$('answer');
$('game-screen').addEventListener('focusin',event=>{if(event.target.id==='answer'||event.target.classList?.contains('shell-input'))lastAnswerField=event.target;});
// Formula subscripts (v_f, F_g, E_k…): Unicode has no subscript f or g, so these insert the typed form (_f) that the answer checker expects, labelled as a subscript.
const SUBSCRIPT_KEYS=['i','f','g','k','p','c','net'];
$('symbol-pad').innerHTML=SYMBOLS.map(symbol=>`<button type="button" tabindex="-1" data-symbol="${symbol}">${symbol}</button>`).join('')+SUBSCRIPT_KEYS.map(sub=>`<button type="button" tabindex="-1" data-symbol="_${sub}" data-sub="${sub}" aria-label="subscript ${sub}"><sub>${sub}</sub></button>`).join('');
$('symbol-pad').addEventListener('pointerdown',event=>event.preventDefault());
$('symbol-pad').addEventListener('click',event=>{
  const symbol=event.target.closest?.('[data-symbol]')?.dataset.symbol;if(!symbol)return;
  const field=document.contains(lastAnswerField)&&!lastAnswerField.closest('[hidden]')?lastAnswerField:answerFocusTarget();
  const limit=field.maxLength>0?field.maxLength:Infinity;if(field.value.length>=limit)return;
  const start=field.selectionStart??field.value.length,end=field.selectionEnd??start;
  field.value=field.value.slice(0,start)+symbol+field.value.slice(end);
  field.focus();field.setSelectionRange?.(start+symbol.length,start+symbol.length);
  field.dispatchEvent(new Event('input',{bubbles:true}));
  if(field.classList.contains('shell-input'))syncShellAnswer();
  paintAnswer();
});
