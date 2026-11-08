/* DRAFT genetics test-style templates in the real game, for review only (8 Nov 2026).
   Loaded by index.html only with ?draft=genetics; without it the game is unchanged.
   Replaces the genetics unit's skills with one skill per learning outcome (LO1–5); each template is one card.
   The design sheet (revision/genetics-templates.html) shows each template through index.html?preview=full&draft=genetics. */
(function(){
 const T=globalThis.GENETICS_T;
 const unit=typeof REVISION_UNITS!=='undefined'?REVISION_UNITS.find(u=>u.id==='genetics'):null;
 if(!T||!unit)return;
 // One skill per learning outcome, named for its content, not its question type (Hamish, 9 Nov 2026).
 const NAMES={1:'Traits and variation',2:'Variation in populations',3:'DNA, genes and chromosomes',4:'Alleles and inheritance',5:'Natural selection and breeding'};
 const ORDER=['Q1','LI2','Q2','Q3','Extra'];
 // Play order (Hamish, 9 Nov 2026): level 1 of each success criterion, then level 2 of each, and so on; a criterion that runs out
 // of levels repeats its last one. scKey/lv on each question; mixedQuestionPicker in app.js reads them.
 const firstSC=t=>t.sc.split(';')[0].trim();
 const bySC=new Map();
 T.templates.slice().sort((a,b)=>a.li-b.li||ORDER.indexOf(a.group)-ORDER.indexOf(b.group)).forEach(t=>{const k=t.li+'|'+firstSC(t);if(!bySC.has(k))bySC.set(k,[]);bySC.get(k).push(t);});
 const LV=new Map();
 for(const [k,list] of bySC){const tiered=list.filter(t=>t.tier).sort((a,b)=>a.tier-b.tier),rest=list.filter(t=>!t.tier);[...tiered,...rest].forEach((t,i)=>LV.set(t,{scKey:k,lv:i+1}));}
 unit.skills=Object.keys(NAMES).map(Number).map(li=>{const n=NAMES[li];
  const ts=T.templates.filter(t=>t.li===li).sort((a,b)=>ORDER.indexOf(a.group)-ORDER.indexOf(b.group)||(a.tier||0)-(b.tier||0));
  return {id:'genetics-lo'+li,name:n,summary:n,example:'',questions:ts.map(t=>({id:'GT-'+t.id,unit:n,skill:n,tier:t.tier||1,scKey:LV.get(t).scKey,lv:LV.get(t).lv,gen:r=>t.gen(r)}))};
 }).filter(s=>s.questions.length);
 unit.mixedName='All genetics';unit.generated=true;unit.draft=true;
})();
