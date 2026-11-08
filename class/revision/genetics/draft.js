/* DRAFT genetics test-style templates in the real game, for review only (8 Nov 2026).
   Loaded by index.html only with ?draft=genetics; without it the game is unchanged.
   Replaces the genetics unit's skills with one skill per test question (Q1, Q2, Q3, Extra); each template is one card.
   The design sheet (revision/genetics-templates.html) shows each template through index.html?preview=full&draft=genetics. */
(function(){
 const T=globalThis.GENETICS_T;
 const unit=typeof REVISION_UNITS!=='undefined'?REVISION_UNITS.find(u=>u.id==='genetics'):null;
 if(!T||!unit)return;
 const NAMES={Q1:'Traits and variation',LI2:'Variation',Q2:'DNA, genes and chromosomes',Q3:'Inheritance',Extra:'Bonus questions'};
 // One skill per test question; a template with a skill key (e.g. 1a's six levels) gets its own ordered skill, played by tier.
 const SKILLNAMES={};
 unit.skills=[];
 for(const g of Object.keys(NAMES)){const ts=T.templates.filter(t=>t.group===g);
  for(const k of [...new Set(ts.filter(t=>t.skill).map(t=>t.skill))]){const n=ts.find(t=>t.skill===k).skillName||SKILLNAMES[k]||k;unit.skills.push({id:'genetics-'+k,name:n,summary:n,example:'',ordered:true,
   questions:ts.filter(t=>t.skill===k).sort((a,b)=>a.tier-b.tier).map(t=>({id:'GT-'+t.id,unit:n,skill:n,tier:t.tier,gen:r=>t.gen(r)}))});}
  const rest=ts.filter(t=>!t.skill);if(rest.length)unit.skills.push({id:'genetics-'+g.toLowerCase(),name:NAMES[g],summary:NAMES[g],example:'',
   questions:rest.map(t=>({id:'GT-'+t.id,unit:NAMES[g],skill:NAMES[g],tier:1,gen:r=>t.gen(r)}))});}
 unit.mixedName='All genetics';unit.generated=true;unit.draft=true;
})();
