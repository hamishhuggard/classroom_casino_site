/* NCEA past papers (IDEAS.md idea 2): exam questions as templates, played in order, parts (a)–(e).
   Each question shares one random context across its parts, so (b) uses the same numbers as (a).
   Paper files (2025-91171.js …) call NceaExam.add(question). Needs Physics12 (core.js) for answer checking and SVG helpers.
   Copyright: questions are rewritten with new numbers and redrawn diagrams; marking points are written from the physics,
   not copied from NZQA schedules. See teach/mock_exams/nzqa_past_papers/COPYRIGHT_RESEARCH.md. */
const NceaExam=(()=>{
 const STANDARDS={'91171':'Mechanics','91173':'Electromagnetism'};
 const GOT='I GOT IT',NOT='NOT YET';
 const questions=[];
 // question: {year, standard, number, title, summary, context(r,h) → ctx, original?: ctx, parts:[part]}
 // part: {part:'a', grade:'A'|'M'|'E', skill (a Year 12 umbrella name), gen(ctx,h,r) → {cloze, answer, answerUnit, explanation, visual, choices}
 //        or selfMark:true with gen → {cloze, points:[…], visual}; expected?: answer for the original numbers}
 function add(question){
  if(!STANDARDS[question.standard])throw new Error(`${question.year} Q${question.number}: standard must be one of ${Object.keys(STANDARDS).join(', ')}`);
  if(typeof question.context!=='function')throw new Error(`${question.year} ${question.standard} Q${question.number}: context(r,h) required`);
  if(!question.parts?.length)throw new Error(`${question.year} ${question.standard} Q${question.number}: parts required`);
  questions.push(question);
 }
 const label=q=>`${q.year} ${STANDARDS[q.standard]} Q${q.number}`;
 // One Physics12-style definition per part. Part (a) draws a fresh context; later parts reuse it.
 // The deck generates a question's parts in order when the run starts, so they always share one context.
 function defs(q,order){
  const shared={ctx:null};
  return q.parts.map((p,i)=>({
   id:`N${q.year}-${q.standard}-Q${q.number}${p.part}`,topic:STANDARDS[q.standard],skill:label(q),umbrella:p.skill,grade:p.grade,
   ncea:{year:q.year,standard:q.standard,number:q.number,part:p.part,grade:p.grade,last:i===q.parts.length-1},order:order+i,noInstruction:true,
   gen(r,h){
    if(i===0||!shared.ctx)shared.ctx=q.context(r,h);
    return part(q,p,shared.ctx,h,r);
   }
  }));
 }
 // Turns a part's output into what Physics12.generate expects. Self-marked parts become a two-button choice.
 function part(q,p,ctx,h,r){
  const out=p.gen(ctx,h,r);
  const head=`Question ${q.number} (${p.part})  [${p.grade}]`;
  if(p.selfMark){
   const points=out.points||[];
   return {...out,cloze:`${head}\n${out.cloze}`,answer:GOT,choices:[GOT,NOT],fixedChoices:true,selfMark:{points},
    explanation:`A full answer covers: ${points.join(' ')}`};
  }
  return {...out,cloze:`${head}\n${out.cloze}`};
 }
 function unit(){
  const sorted=[...questions].sort((a,b)=>b.year-a.year||a.standard.localeCompare(b.standard)||a.number-b.number);
  let order=0;
  return {id:'yr12_ncea',class:'yr12',name:'NCEA past papers — exam mode',status:'ready',mixed:true,ncea:true,mixedName:'Every question, in order',
   source:'Rewritten from NCEA Level 2 Physics papers (AS 91171, AS 91173) with new numbers and redrawn diagrams',
   note:'Exam mode: each question runs through its parts in order, with no timer. Explain parts are self-marked.',
   skills:sorted.map(q=>{const items=defs(q,order);order+=items.length;
    return {id:`yr12_ncea-${q.year}-${q.standard}-q${q.number}`,name:`${label(q)}: ${q.title}`,ordered:true,
     summary:q.summary||`${q.parts.length} parts, in order. Calculations need units. For explain parts, write your answer, then mark it against the points.`,
     questions:items};
   })};
 }
 return {STANDARDS,GOT,NOT,questions,add,label,defs,part,unit};
})();
if(typeof module!=='undefined')module.exports=NceaExam;
