/* Year 12 diagnostic: one question per key skill, one retry (fresh numbers) after a mistake, then send results
   and play the normal Year 12 game. Optional: remove this script and the game behaves as before. */
(function(){
  if(typeof Physics12==='undefined')return;
  // One format per key skill, roughly in teaching order. Ids are Physics12 format ids.
  const IDS=[
    'L1-11','L1-29',                                  // units, symbols, prefixes
    'L2-M35','L2-M37','L3-M02','L3-M04',              // kinematics and graphs
    'L2-M13','L3-M08','L3-M09','L2-M18',              // forces
    'L2-M16',                                         // projectiles
    'L3-M12','L3-M13','L3-M17',                       // momentum
    'L3-M20','L3-M21',                                // energy
    'L3-M27',                                         // torque
    'L2-M02','L3-M32',                                // circular motion
    'L3-E01','L3-E07','L3-E11','L3-E21','L3-E23',     // circuits
    'L3-E27','L3-E30',                                // electric fields
    'L2-E01','L2-E06','L3-E35','L3-E39',              // magnetism and the motor effect
    'L2-E14','L3-E42'                                 // induction
  ];
  const unit=Physics12.unit(),byId={};
  for(const skill of unit.skills)for(const q of skill.questions)byId[q.id]=q;
  const questions=IDS.filter(id=>byId[id]).map(id=>byId[id]);
  window.DIAGNOSTIC_UNIT={id:'yr12_diagnostic',name:`Year 12 Diagnostic — ${questions.length} key skills`,status:'ready',mixed:true,physics12:true,diagnostic:true,
    skills:[{id:'yr12_diagnostic-all',name:'Diagnostic',summary:`${questions.length} questions, one for each key skill. If you get one wrong, you get one more try with new numbers. Then send your results and play the casino.`,questions}]};

  class DiagnosticDeck{
    constructor(levels){this.queue=levels.flatMap(level=>level.cards.map(question=>({question,level:level.index,tries:0})));this.total=this.queue.length;this.done=0;this.firstTry=0;this.current=null;}
    next(){
      if(this.current)throw Error('Answer the current card before drawing another.');
      const card=this.queue[0];if(!card)return null;
      this.current=card;return {question:card.question,level:card.level,review:false,stage:0};
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

  // End card: SEND RESULTS opens the Form from the click (so pop-up blockers allow it), then PLAY starts the game.
  function finish(id){
    if(!owns(id)||!reviewDeck)return false;
    const deck=reviewDeck;currentReview=null;saveRun();
    let dialog=document.getElementById('diagnostic-dialog');
    if(!dialog){dialog=document.createElement('dialog');dialog.id='diagnostic-dialog';dialog.innerHTML='<form method="dialog"><p class="eyebrow">DIAGNOSTIC COMPLETE</p><h2 id="diagnostic-score"></h2><p id="diagnostic-note"></p><button id="diagnostic-action" value="go"></button></form>';document.body.append(dialog);if(typeof menuPanelIds!=='undefined')menuPanelIds.push('diagnostic-dialog');}
    const sending=!!globalThis.CasinoResults?.enabled,button=dialog.querySelector('#diagnostic-action');
    dialog.querySelector('#diagnostic-score').textContent=`${deck.firstTry} / ${deck.total} correct first try`;
    let sent=!sending;
    const show=()=>{dialog.querySelector('#diagnostic-note').textContent=sent?(sending?'Press Submit on the Google Form, then come back here and play.':'Now play the Year 12 casino.'):'Send your results to your teacher. A Google Form opens: press Submit, then come back here.';button.textContent=sent?'PLAY THE CASINO ↵':'SEND RESULTS ↵';};
    show();
    button.onclick=event=>{
      event.preventDefault();
      if(!sent){CasinoResults.send();sent=true;show();return;}
      dialog.close();activeRun=false;chooseUnit('yr12_physics');beginGame();
    };
    stop();showMenu();dialog.showModal();button.focus();
    return true;
  }
  window.CasinoDiagnostic={owns,finish,deckFor:id=>owns(id)?DiagnosticDeck:null,ids:IDS};
})();
