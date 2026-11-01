/* Year 12 diagnostic: ten hard questions, one retry (fresh numbers) after a mistake, then send results and
   practise the skill mastery.js recommends. Link: ?class=yr12&unit=yr12_diagnostic, or the Diagnostic tile.
   Optional: remove this script and the game behaves as before. */
(function(){
  if(typeof Physics12==='undefined')return;
  // Ten hard multi-step questions (Level 7 word problems), one per main area. Ids are Physics12 format ids.
  const IDS=[
    'L7-M09',                                         // horizontal projectile: fall time, then distance
    'L7-M12',                                         // net force with friction, then speed
    'L7-M20',                                         // head-on collision, stick together
    'L7-M28',                                         // energy lost as heat
    'L7-M32',                                         // balanced beam (torques)
    'L7-M36',                                         // friction as centripetal force
    'L7-E11',                                         // series-parallel circuit: current
    'L7-E19',                                         // charged particle between plates: acceleration
    'L7-E22',                                         // force on a wire, then acceleration
    'L7-E09'                                          // parallel resistors, then total power
  ];
  const unit=Physics12.unit(),byId={};
  for(const skill of unit.skills)for(const q of skill.questions)byId[q.id]=q;
  const questions=IDS.filter(id=>byId[id]).map(id=>byId[id]);
  const DIAGNOSTIC_UNIT={id:'yr12_diagnostic',class:'yr12',name:`What should I study next? — ${questions.length} hard questions`,status:'ready',mixed:true,physics12:true,diagnostic:true,
    skills:[{id:'yr12_diagnostic-all',name:'What should I study next?',summary:`${questions.length} hard questions across mechanics and electricity. If you get one wrong, you get one more try with new numbers. Then you'll see which skill to practise next.`,questions}]};
  (globalThis.EXTRA_UNITS=globalThis.EXTRA_UNITS||[]).push(DIAGNOSTIC_UNIT);
  window.DIAGNOSTIC_UNIT=DIAGNOSTIC_UNIT;

  class DiagnosticDeck{
    constructor(levels){this.queue=levels.flatMap(level=>level.cards.map(question=>({question,level:level.index,tries:0})));this.total=this.queue.length;this.done=0;this.firstTry=0;this.current=null;}
    next(){
      if(this.current)throw Error('Answer the current card before drawing another.');
      const card=this.queue[0];if(!card)return null;
      // review:true on the retry, so mastery.js counts only the first try.
      this.current=card;return {question:card.question,level:card.level,review:card.tries>0,stage:0};
    }
    answer(correct){
      const card=this.current;if(!card)throw Error('No current card.');
      this.current=null;card.tries++;
      if(!correct&&card.tries<2){const base=byId[card.question.source?.id];if(base)card.question=makeRevisionQuestion(base,true);return;}
      this.queue.shift();this.done++;if(correct&&card.tries===1)this.firstTry++;
    }
    get progress(){return {position:0,seen:this.done,total:this.total,done:this.done,pending:0,finished:!this.queue.length};}
  }
  const owns=id=>id==='yr12_diagnostic';
  const mastery=()=>globalThis.CasinoMastery;

  // Leave the diagnostic and start a Year 12 practice run (a practice-chooser code).
  function practise(code){
    $('diagnostic-dialog').close();activeRun=false;chooseUnit('yr12_physics');
    if(code)beginPractice(code);else beginGame();
  }
  function startDiagnostic(){$('practice-dialog').close();activeRun=false;chooseUnit('yr12_diagnostic');startGame();}

  // End card: SEND RESULTS opens the Form from the click (so pop-up blockers allow it), then the practise-next choices.
  function finish(id){
    if(!owns(id)||!reviewDeck)return false;
    const deck=reviewDeck,dialog=$('diagnostic-dialog');currentReview=null;saveRun();
    const sending=!!globalThis.CasinoResults?.enabled;let sent=!sending;
    $('diagnostic-score').textContent=`${deck.firstTry} / ${deck.total} correct first try`;
    const show=()=>{
      const picks=sent?(mastery()?.next(3)||[]):[];
      $('diagnostic-note').textContent=!sent?'Send your results to your teacher. A Google Form opens: press Submit, then come back here.'
        :picks.length?`${sending?'Press Submit on the Google Form, then come back. ':''}Practise next:`:`${sending?'Press Submit on the Google Form, then come back. ':''}No weak spots found. Play everything mixed together.`;
      const buttons=!sent?[['send','SEND RESULTS ↵','']]
        :[...picks.map(r=>[mastery().practiceCode(r.key),`PRACTISE ${r.name.toUpperCase()}`,r.because?`needed for ${r.because}`:`${r.right} of ${r.tried} right first try`]),['mixed','EVERYTHING MIXED TOGETHER','']];
      $('diagnostic-actions').innerHTML=buttons.filter(([code])=>code).map(([code,label,why])=>`<button type="button" data-code="${escapeMarkup(code)}">${escapeMarkup(label)}${why?`<span class="diagnostic-why">${escapeMarkup(why)}</span>`:''}</button>`).join('');
      if(dialog.open)selectPanelControl(dialog,0);
    };
    $('diagnostic-actions').onclick=event=>{
      const button=event.target.closest?.('[data-code]');if(!button)return;
      if(button.dataset.code==='send'){CasinoResults.send();sent=true;show();return;}
      practise(button.dataset.code);
    };
    show();stop();showMenu();dialog.showModal();
    return true;
  }

  // Extra tiles at the start of the Year 12 chooser: Diagnostic, and Practise next once there is evidence.
  function tiles(unit){
    if(unit.id!=='yr12_physics')return [];
    const pick=mastery()?.next(1)[0];
    return [...(pick&&mastery().practiceCode(pick.key)?[{code:'next',label:'Practise next',note:pick.name,rank:'NEXT'}]:[]),{code:'diagnostic',label:'What should I study next?',note:`${questions.length} hard questions`,rank:'TEST'}];
  }
  function begin(code){
    if(code==='diagnostic'){startDiagnostic();return true;}
    if(code==='next'){const pick=mastery()?.next(1)[0],next=pick&&mastery().practiceCode(pick.key);if(next)beginPractice(next);return true;}
    return false;
  }
  window.CasinoDiagnostic={owns,finish,tiles,begin,deckFor:id=>owns(id)?DiagnosticDeck:null,ids:IDS};
})();
