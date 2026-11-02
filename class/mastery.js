/* Year 12 skill mastery and "practise next" (IDEAS.md idea 1). No grade prediction.
   Every first try at a Year 12 question (the diagnostic or normal practice) updates a per-skill estimate kept in this
   browser's localStorage. Nothing is sent. Optional: remove this script and the game behaves as before.
   Skill keys are umbrella names ("Momentum and impulse"), or "level:<LEVELS id>" for questions with no umbrella
   (units, SI prefixes, same-or-different circuits). */
(function(root){
  // Each new answer counts fully and older ones fade by FORGET, so later practice can lift a weak diagnostic result.
  const FORGET=0.85,TARGET=0.8,SHAKY=0.5;
  // Teaching order; also breaks ties.
  const ORDER=['level:yr12_physics-mech-units','level:yr12_physics-em-units','level:yr12_physics-prefixes',
    'Speed and acceleration','Motion graphs','Vectors','Forces and Newton’s laws','Projectiles','Momentum and impulse',
    'Work, energy and power','Torque and moments','Circular motion','Springs and Hooke’s law',
    'Current, charge and voltage','Ohm’s law and resistance','Electrical power and energy','Series and parallel circuits',
    'level:yr12_physics-same-circuit','Electric fields','Magnets and magnetic fields','Magnetic force','Electromagnetic induction'];
  // Hand-written prerequisites: a shaky prerequisite is recommended before the skill that needs it.
  const PREREQS={
    'Speed and acceleration':['level:yr12_physics-mech-units','level:yr12_physics-prefixes'],
    'Motion graphs':['Speed and acceleration'],
    'Forces and Newton’s laws':['Speed and acceleration'],
    'Projectiles':['Speed and acceleration','Vectors'],
    'Momentum and impulse':['Forces and Newton’s laws'],
    'Work, energy and power':['Forces and Newton’s laws'],
    'Torque and moments':['Forces and Newton’s laws'],
    'Circular motion':['Forces and Newton’s laws'],
    'Springs and Hooke’s law':['Forces and Newton’s laws'],
    'Current, charge and voltage':['level:yr12_physics-em-units','level:yr12_physics-prefixes'],
    'Ohm’s law and resistance':['Current, charge and voltage'],
    'Electrical power and energy':['Ohm’s law and resistance'],
    'Series and parallel circuits':['Ohm’s law and resistance'],
    'Electric fields':['Current, charge and voltage'],
    'Magnetic force':['Magnets and magnetic fields'],
    'Electromagnetic induction':['Magnetic force']
  };
  // Exam weights (how often a skill is examined). All 1 until past papers are tagged (IDEAS.md idea 2).
  const EXAM_WEIGHT={};

  function skillKey(item){
    if(!item||!/^L\d+-/.test(String(item.id||'')))return null;
    if(item.umbrella)return item.umbrella;
    const level=root.Physics12?.LEVELS[Number(item.id.match(/^L(\d+)/)[1])-1];
    return level?'level:'+level.id:null;
  }
  function skillName(key){
    if(!String(key).startsWith('level:'))return key;
    return root.Physics12?.LEVELS.find(level=>'level:'+level.id===key)?.name||key;
  }
  // p = (correct + 1) / (attempts + 2): Beta(1,1) prior, so one answer never reads as certain.
  const estimate=s=>(s.c+1)/(s.a+2);
  function update(state,key,ok){
    const s=state[key]||(state[key]={a:0,c:0,n:0,k:0});
    s.a=s.a*FORGET+1;s.c=s.c*FORGET+(ok?1:0);s.n++;if(ok)s.k++;s.t=Date.now();
    return state;
  }
  // Weakest skill first, weighted by exam weight; a skill with a shaky prerequisite is replaced by that prerequisite.
  function recommend(state,count=3){
    const place=key=>{const i=ORDER.indexOf(key);return i<0?ORDER.length:i;};
    const weak=Object.keys(state).filter(key=>state[key].n&&estimate(state[key])<TARGET)
      .sort((x,y)=>(EXAM_WEIGHT[y]??1)*(1-estimate(state[y]))-(EXAM_WEIGHT[x]??1)*(1-estimate(state[x]))||place(x)-place(y));
    const root_=(key,seen=new Set())=>{
      if(seen.has(key))return key;seen.add(key);
      const shaky=(PREREQS[key]||[]).filter(p=>state[p]?.n&&estimate(state[p])<SHAKY).sort((x,y)=>estimate(state[x])-estimate(state[y])||place(x)-place(y));
      return shaky.length?root_(shaky[0],seen):key;
    };
    const out=[];
    for(const key of weak){const pick=root_(key);if(!out.some(r=>r.key===pick))out.push({key:pick,name:skillName(pick),p:estimate(state[pick]),right:state[pick].k,tried:state[pick].n,because:pick===key?null:skillName(key)});if(out.length>=count)break;}
    return out;
  }

  const api={FORGET,TARGET,ORDER,PREREQS,EXAM_WEIGHT,skillKey,skillName,estimate,update,recommend};
  if(typeof module!=='undefined'&&module.exports){module.exports=api;return;}

  const KEY='casino-mastery-v1';
  function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{return {};}}
  let state=load();
  // Called by app.js on every answer. Only first tries at fresh Year 12 questions count (not reviews or retries).
  function record(ok){
    try{
      if(typeof selectedClass==='undefined'||selectedClass!=='yr12'||attempts||currentReview?.review)return;
      const key=skillKey(current?.source);if(!key)return;
      update(state,key,ok);localStorage.setItem(KEY,JSON.stringify(state));
    }catch{}
  }
  // Practice-chooser code for a skill key ("skill:<umbrella>" or "level:<index>").
  function practiceCode(key){
    if(!key.startsWith('level:'))return 'skill:'+key;
    const index=levels.findIndex(level=>level.skill===key.slice(6)&&!level.focus);
    return index<0?null:'level:'+index;
  }
  root.CasinoMastery={...api,record,state:()=>state,next:count=>recommend(state,count),practiceCode,reset(){state={};try{localStorage.removeItem(KEY);}catch{}}};
})(globalThis);
