/* NCEA exam mode (IDEAS.md idea 2): the "NCEA past papers" unit. Parts run in exam order, each once, with no timer and
   no review loop. Explain parts are self-marked: write an answer, show the marking points, then I GOT IT or NOT YET.
   Optional: remove this script (and revision/ncea/) and the game behaves as before. */
(function(){
  if(typeof NceaExam==='undefined'||!NceaExam.questions.length)return;
  const UNIT=NceaExam.unit();
  (globalThis.EXTRA_UNITS=globalThis.EXTRA_UNITS||[]).push(UNIT);
  const owns=id=>id==='yr12_ncea';

  // Once through in exam order, whatever order the chooser built the levels in.
  class ExamDeck{
    constructor(levels){
      this.queue=levels.flatMap(level=>level.cards.map(question=>({question,level:level.index}))).sort((a,b)=>(a.question.source?.order??0)-(b.question.source?.order??0));
      this.total=this.queue.length;this.done=0;this.right=0;this.marks={A:[0,0],M:[0,0],E:[0,0]};this.current=null;
    }
    next(){
      if(this.current)throw Error('Answer the current card before drawing another.');
      const card=this.queue[0];if(!card)return null;
      this.current=card;return {question:card.question,level:card.level,review:false,stage:0};
    }
    answer(correct){
      const card=this.current;if(!card)throw Error('No current card.');
      this.current=null;this.queue.shift();this.done++;if(correct)this.right++;
      const tally=this.marks[card.question.source?.grade];if(tally){tally[1]++;if(correct)tally[0]++;}
    }
    get progress(){return {position:0,seen:this.done,total:this.total,done:this.done,pending:0,finished:!this.queue.length};}
  }

  function finish(id){
    if(!owns(id)||!reviewDeck)return false;
    const deck=reviewDeck;currentReview=null;saveRun();showMenu();
    const grades=Object.entries(deck.marks).filter(([,[,n]])=>n).map(([g,[c,n]])=>`${g}: ${c} of ${n}`).join(' · ');
    $('chapter-dialog').querySelector('h2').textContent='Exam complete';
    $('chapter-summary').textContent=`${deck.right} of ${deck.total} parts right${grades?` (${grades})`:''}. A, M and E show the grade each part targets. Self-marked parts count as you marked them.`;
    $('chapter-dialog').showModal();
    return true;
  }

  // Self-marked parts: a box to write in and a button that shows the marking points and the two choices.
  const selfMark=()=>!!current?.source?.selfMark;
  function reveal(){
    if(!selfMark()||current.revealed)return false;
    current.revealed=true;
    document.querySelector('.exam-points')?.removeAttribute('hidden');
    document.querySelector('.exam-reveal')?.setAttribute('hidden','');
    document.querySelector('.connection-choices')?.removeAttribute('hidden');
    selectConnection(current.choiceOrder?.[0]||NceaExam.GOT);
    return true;
  }
  function afterRender(){
    if(!selfMark())return;
    current.revealed=false;
    const box=document.querySelector('.choice-question');if(!box)return;
    const points=current.source.selfMark.points.map(p=>`<li>${escapeMarkup(p)}</li>`).join('');
    box.insertAdjacentHTML('afterend',`<div class="exam-self-mark"><textarea class="exam-written" rows="4" aria-label="Your answer" placeholder="Write your answer here" spellcheck="true"></textarea><button type="button" class="exam-reveal">SHOW MARKING POINTS</button><div class="exam-points" hidden><p>A full answer covers:</p><ul>${points}</ul><p>Did your answer cover all of these?</p></div></div>`);
    document.querySelector('.connection-choices')?.setAttribute('hidden','');
    document.querySelector('.exam-reveal').onclick=reveal;
    setTimeout(()=>document.querySelector('.exam-written')?.focus(),0);
  }
  // Before the points are shown, ENTER (outside the text box) shows them instead of answering.
  const beforeSubmit=()=>reveal();
  const focusTarget=()=>selfMark()&&!current.revealed?document.querySelector('.exam-written'):null;
  // Typing in the answer box is plain typing: no answer shortcuts.
  const ownsKey=event=>!!event.target?.closest?.('.exam-written');

  window.CasinoExam={owns,finish,afterRender,beforeSubmit,focusTarget,ownsKey,deckFor:id=>owns(id)?ExamDeck:null,unit:UNIT};
})();
