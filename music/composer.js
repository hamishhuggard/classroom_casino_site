// A bounded-memory, rule-based composer. No network, samples or dependencies.
(()=>{
class CircuitComposer {
  constructor(tune,random=Math.random){this.tune=tune;this.random=random;this.reset();}
  reset(){this.pending=[];this.opening=0;this.recent=new Set();this.history=[];}
  pick(items){return items[Math.min(items.length-1,Math.floor(this.random()*items.length))];}
  nearest(note,allowed){return allowed.reduce((best,n)=>Math.abs(n-note)<Math.abs(best-note)?n:best);}
  signature(section){return JSON.stringify([section.chords,section.melody,section.arp,section.energy]);}
  remember(section){
    const key=this.signature(section);this.recent.add(key);this.history.push(key);
    if(this.history.length>128){const old=this.history.shift();if(!this.history.includes(old))this.recent.delete(old);}
  }
  vary(theme,chords,part,strength){
    const {chipThemes,chipChords}=this.tune;
    const low=part==='B'?72:76,high=part==='B'?88:93;
    return chipThemes[theme].map((phrase,bar)=>{
      const chord=chipChords[chords[bar]],original=chipChords[(theme===2?'cdcefgae':'agfeagfe')[bar]];
      const scale=chords[bar]==='e'?[0,2,4,5,8,9,11]:[0,2,4,5,7,9,11];
      const allowed=Array.from({length:high-low+1},(_,i)=>low+i).filter(n=>scale.includes(n%12));
      const anchors=allowed.filter(n=>chord.some(c=>c%12===n%12));
      const direction=this.pick([-1,1]);
      return phrase.map((note,beat)=>{
        // Downbeats land on chord tones; weaker beats may walk through the scale.
        if(!note&&beat!==0&&this.random()>.25)return 0;
        let target=(note||phrase.find(Boolean))+chord[0]-original[0];
        if(this.random()<strength){
          target+=direction*this.pick([2,3,5]);
          if(beat%2===1&&this.random()<.16)return 0;
        }
        return this.nearest(target,beat===0||beat===4?anchors:allowed);
      });
    });
  }
  section(theme,chords,part,energy){
    let section;
    // Reject recent complete passages, while allowing recognisable motifs.
    for(let attempt=0;attempt<32;attempt++){
      section={part,theme,chords,energy,harmony:energy>=3,
        arp:this.pick([[0,1,2,1],[0,2,1,2],[2,1,0,1],[0,1,2,0]]),
        melody:this.vary(theme,chords,part,.25+this.random()*.35)};
      if(!this.recent.has(this.signature(section)))break;
    }
    this.remember(section);return section;
  }
  composeCycle(){
    const a=this.pick(['agfeagfe','afdeafde','acfeacfe','agdeagde']);
    const b=this.pick(['cdcefgae','fcgdfgae','dcfgfgae']);
    const first=this.section(0,a,'A',1),answer=this.section(1,a,'A',2);
    const bridge=this.section(2,b,'B',1);
    const reprise=section=>({...section,melody:section.melody.map(bar=>bar.slice()),harmony:true});
    // Repeat motifs within the form so this remains a composition, not a shuffle.
    this.pending=[
      {...first,energy:0},first,answer,{...answer,energy:3,harmony:true},
      bridge,{...bridge,energy:2},
      {...reprise(first),energy:3},{...reprise(first),energy:4},
      {...reprise(answer),energy:4},{...reprise(answer),energy:3,outro:true}
    ];
  }
  nextSection(){
    // The entire favourite tune plays unchanged before composing new material.
    if(this.opening<this.tune.chipSections.length){
      const source=this.tune.chipSections[this.opening++];
      return {...source,melody:this.tune.chipThemes[source.theme]};
    }
    if(!this.pending.length)this.composeCycle();
    return this.pending.shift();
  }
}
if(typeof module!=='undefined')module.exports=CircuitComposer;else globalThis.CircuitComposer=CircuitComposer;
})();
