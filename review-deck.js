/* One pass through each level; missed cards travel across levels for three reviews.
   Cards are shuffled unless the level is marked ordered (easiest first). */
(function(root){
  class ReviewDeck {
    constructor(levels,random=Math.random){
      this.levels=levels.map(level=>{
        const cards=level.cards.map(question=>({question,level:level.index,seen:false,done:false,stage:0,due:null,order:0}));
        if(!level.ordered)for(let i=cards.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[cards[i],cards[j]]=[cards[j],cards[i]];}
        return {...level,cards};
      });
      this.cards=this.levels.flatMap(level=>level.cards);this.position=0;this.answers=0;this.sequence=0;this.current=null;this.previous=null;
    }
    next(){
      if(this.current)throw Error('Answer the current card before drawing another.');
      while(this.position<this.levels.length&&!this.levels[this.position].cards.some(card=>!card.seen))this.position++;
      const pending=this.cards.filter(card=>card.seen&&!card.done).sort((a,b)=>a.due-b.due||a.order-b.order);
      let card=pending.find(card=>card.due<=this.answers);
      if(!card&&this.position<this.levels.length)card=this.levels[this.position].cards.find(card=>!card.seen);
      // With no new cards left, shorten spacing rather than leave the student waiting.
      if(!card)card=pending.find(card=>card!==this.previous)||pending[0];
      if(!card)return null;
      this.current=card;return {question:card.question,level:card.level,review:card.seen,stage:card.stage};
    }
    answer(correct){
      const card=this.current;if(!card)throw Error('No current card.');
      this.answers++;
      if(!correct){card.seen=true;card.done=false;card.stage=0;card.due=this.answers+3;card.order=this.sequence++;}
      else if(!card.seen){card.seen=true;card.done=true;}
      else{card.stage++;if(card.stage===3){card.done=true;card.due=null;}else{card.due=this.answers+[3,10,20][card.stage];card.order=this.sequence++;}}
      this.previous=card;this.current=null;
    }
    get progress(){
      const position=Math.min(this.position,this.levels.length-1),level=this.levels[position];
      return {position,seen:level.cards.filter(card=>card.seen).length,total:level.cards.length,done:this.cards.filter(card=>card.done).length,pending:this.cards.filter(card=>card.seen&&!card.done).length,finished:this.cards.every(card=>card.done)};
    }
  }
  if(typeof module!=='undefined'&&module.exports)module.exports=ReviewDeck;
  else root.ReviewDeck=ReviewDeck;
})(globalThis);
