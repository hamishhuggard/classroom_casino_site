/* "What type of physics student are you?" A Year 12 personality quiz for Revision Roulette.
   Every choice is accepted; each one scores a type, and the end card shows the winner with what to practise.
   app.js hooks: CasinoQuiz.deckFor (one pass, no reviews), CasinoQuiz.record (from reportAnswer), CasinoQuiz.finish,
   CasinoQuiz.tiles / begin (a tile on the Year 12 chooser). */
(function(){
 const TYPES={
  E:{name:'The Tinkerer',who:'Ernest Rutherford',
   fact:'Born near Nelson, he found the atomic nucleus by firing alpha particles at gold foil, and won the 1908 Nobel Prize in Chemistry.',
   blurb:'You want to get your hands on it. You trust what you can see and measure more than what’s on the page.',
   strength:'You know when an answer is ridiculous, because you know what the real thing looks like.',
   watch:'Exams want working and units written down, not just a feel for it.',
   practise:'Calculate — choose the equation'},
  T:{name:'The Mathematician',who:'Albert Einstein',
   fact:'In 1905, working in a patent office, he published special relativity, and E = mc², from pen-and-paper reasoning.',
   blurb:'You like it when everything comes down to one equation and the algebra comes out clean.',
   strength:'Rearranging formulas and getting numbers out fast.',
   watch:'Getting a number and forgetting to say what it means, or which direction it goes.',
   practise:'Directions & concepts — multiple choice'},
  V:{name:'The Visualiser',who:'Michael Faraday',
   fact:'He had almost no formal maths. He pictured invisible “lines of force” round magnets, and built the first electric motor in 1821.',
   blurb:'You think in pictures: arrows, paths and field lines. If you can see it, you get it.',
   strength:'Force diagrams and field directions: the questions other people guess at.',
   watch:'The step from a good diagram to the equation and the number.',
   practise:'Calculate — equation given'},
  Q:{name:'The Philosopher',who:'Richard Feynman',
   fact:'He shared the 1965 Nobel Prize in Physics, and his Caltech lectures are still famous for explaining hard ideas simply.',
   blurb:'You can’t leave a “why” alone. You learn by arguing about it and explaining it to someone else.',
   strength:'Explain questions: you write the reasons markers look for.',
   watch:'Time. Big-picture thinking is slow in a calculation.',
   practise:'Word problems'}
 };
 const ORDER=['E','T','V','Q'];
 // [question, takeaway, Tinkerer, Mathematician, Visualiser, Philosopher]. Each question is an everyday scene with a
 // Year 12 idea hidden in it, and every option is true physics, so students meet the idea without being told it's a lesson.
 // The takeaway shows only if the timer runs out; the end card names the ideas in one quiet line.
 const QUESTIONS=[
  ['The bus brakes hard and your bag slides off the seat onto the floor. Your brain goes…',
   'Nothing pushed the bag forward: it kept moving while the bus stopped (Newton’s first law).',
   'next time I’m testing it with a ball on the seat','how fast was the bus going, though?','I picture the bag carrying on while the bus stops under it','wait, so nothing actually pushed the bag?'],
  ['Bumper cars. A massive Year 13 rams your tiny car from behind.',
   'A heavier car at the same speed carries more momentum, and passes more of it on in a collision.',
   'next round I’m getting the heaviest car','same speed, more mass, more momentum','I picture their big arrow shrinking and mine growing','why does it hurt more when they’re heavier?'],
  ['On the rocks at Piha, you throw a stone flat out to sea while your mate drops one straight down. Who hits the water first?',
   'Horizontal and vertical motion are independent: both stones fall the same height in the same time.',
   'let’s do it again and watch closely','same height, same fall time: a tie','I picture them dropping level, side by side','does throwing it faster change anything?'],
  ['Your little cousin wants to go on the seesaw with you, but you’re way heavier.',
   'Balance needs equal torques (force × distance), so the heavier person sits closer to the pivot.',
   'I shuffle towards the middle until it balances','move in until weight × distance matches','I picture their arrow small but far out, mine big but close in','why does sitting closer make me “lighter”?'],
  ['You pull apart a dead speaker. Inside: a magnet, and a coil of wire glued to the cone.',
   'A current in a magnetic field feels a force (F = BIL), which pushes the coil and cone back and forth.',
   'I touch the wires to a battery to see if it moves','more current, bigger push on the coil','I picture the field lines running through the coil','how does a push on a wire turn into music?'],
  ['One bulb in an old string of fairy lights dies, and the whole string goes dark.',
   'In series there is one path: a single break stops the current everywhere. Houses use parallel circuits.',
   'swap bulbs one at a time until it lights up','one gap and the current is zero everywhere','I picture one loop, broken in one spot','so why doesn’t my house do this?'],
  ['You’re at the top of the tallest hydroslide.',
   'Height (gravitational potential energy) becomes speed (kinetic energy); at the bottom it becomes heat and sound.',
   'I’d race a mate to see if being heavier helps','higher start, faster finish','I picture height turning into speed all the way down','where does all that speed go when I splash in?']
 ];
 const TOPICS='Newton’s first law, momentum, projectile motion, torque, the force on a current in a magnetic field, series circuits and energy';
 const UNIT_ID='yr12_physics_type';
 const questions=QUESTIONS.map(([prompt,takeaway,...choices],i)=>({id:`PT-${i+1}`,skill:'physics-type',
  gen:()=>({noInstruction:true,stackChoices:true,cloze:prompt,answer:choices[0],aliases:choices.slice(1),choices,explanation:`Any answer is fine. The physics: ${takeaway}`,type:Object.fromEntries(choices.map((c,j)=>[c,ORDER[j]]))})}));
 (globalThis.EXTRA_UNITS=globalThis.EXTRA_UNITS||[]).push({id:UNIT_ID,class:'yr12',name:'What type of physics student are you?',status:'ready',mixed:true,diagnostic:true,
  skills:[{id:`${UNIT_ID}-all`,name:'What type of physics student are you?',summary:`${questions.length} quick questions, no wrong answers. Pick the one most like you.`,questions}]});

 let tally={};
 // One pass through the cards, in order, with no reviews.
 class QuizDeck{
  constructor(levels){this.queue=levels.flatMap(level=>level.cards.map(question=>({question,level:level.index})));this.total=this.queue.length;this.done=0;this.current=null;tally={};}
  next(){if(this.current)throw Error('Answer the current card before drawing another.');const card=this.queue[0];if(!card)return null;this.current=card;return {question:card.question,level:card.level,review:false,stage:0};}
  answer(){if(!this.current)throw Error('No current card.');this.current=null;this.queue.shift();this.done++;}
  get progress(){return {position:0,seen:this.done,total:this.total,done:this.done,pending:0,finished:!this.queue.length};}
 }
 const owns=id=>id===UNIT_ID;
 function record(ok){
  if(!ok||typeof selectedUnit==='undefined'||!owns(selectedUnit))return;
  const type=current?.source?.type?.[$('answer').value];if(type)tally[type]=(tally[type]||0)+1;
 }
 // Highest count wins; a tie goes to the later type in ORDER.
 function winner(){let best=null;for(const t of ORDER)if((tally[t]||0)>=(tally[best]||0)&&tally[t])best=t;return best;}
 function finish(id){
  if(!owns(id))return false;
  stop();currentReview=null;saveRun();showMenu();
  const key=winner()||'Q',t=TYPES[key],dialog=$('chapter-dialog'),e=escapeMarkup;
  const second=ORDER.filter(k=>k!==key&&tally[k]).sort((a,b)=>tally[b]-tally[a])[0];
  dialog.querySelector('.eyebrow').textContent='Your physics type';
  dialog.querySelector('h2').textContent=t.name;
  $('chapter-summary').innerHTML=`<p>${e(t.blurb)}${second?` With a bit of ${e(TYPES[second].name.replace('The ','the '))} in you.`:''}</p>`
   +`<p><b>Strength:</b> ${e(t.strength)}<br><b>Watch out for:</b> ${e(t.watch)}<br><b>Practise next:</b> ${e(t.practise)}</p>`
   +`<p>You’re in good company: <b>${e(t.who)}</b>. ${e(t.fact)}</p>`
   +`<p class="quiz-ps"><small>P.S. Every answer in this quiz was good physics. Hidden in the questions: ${e(TOPICS)}.</small></p>`;
  dialog.addEventListener('close',()=>{dialog.querySelector('.eyebrow').textContent='Chapter complete';},{once:true});
  dialog.showModal();return true;
 }
 // A tile on the Year 12 chooser's "All physics" page, next to "What should I study next?" (diagnostic.js does the same).
 const tiles=unit=>unit.id==='yr12_physics'?[{code:'physics-type',label:'What type of physics student are you?',note:`${questions.length} questions`,rank:'QUIZ'}]:[];
 function begin(code){
  if(code!=='physics-type')return false;
  $('practice-dialog').close();activeRun=false;chooseUnit(UNIT_ID);startGame();return true;
 }
 globalThis.CasinoQuiz={owns,record,finish,tiles,begin,deckFor:id=>owns(id)?QuizDeck:null,TYPES,QUESTIONS};
})();
