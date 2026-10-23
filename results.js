/* Optional results reporting. Off unless results-config.js sets a Google Form pre-filled link containing XXX.
   Students send a compact per-question summary through the Form; the Form (school Google account, verified
   emails) records who sent it. Nothing is sent automatically and no names are stored here. */
(function(){
  const form=String(window.CASINO_RESULTS_FORM||'').trim();
  const KEY='casino-results-v1';
  const today=()=>new Date().toLocaleDateString('en-CA');
  function load(){
    try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&saved.day===today()&&saved.items)return saved;}catch{}
    return {day:today(),items:{}};
  }
  let state=load();
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch{}}
  // Question formats keep their id; plain curriculum questions are identified by skill id and position.
  function questionKey(){
    const level=levels[questionLevel],source=current?.source;
    if(source?.id)return String(source.id);
    if(level?.skill){const index=level.questions.indexOf(source);return `${level.skill}#${index}`;}
    return `circuit#${questionLevel}`;
  }
  function record(ok){
    if(!form||!current)return;
    try{
      if(state.day!==today())state={day:today(),items:{}};
      const key=`${selectedUnit}|${questionKey()}`,item=state.items[key]||(state.items[key]={a:0,c:0,f:ok?1:0});
      item.a++;if(ok)item.c++;
      save();updateButton();
    }catch{}
  }
  // unit|id:attempts.correct.firstTry entries; units grouped to keep the link short.
  function payload(){
    const groups={};
    for(const [key,item] of Object.entries(state.items)){const [unit,id]=key.split('|');(groups[unit]||=[]).push(`${id}:${item.a}.${item.c}.${item.f}`);}
    return 'v1 '+state.day+' '+Object.entries(groups).map(([unit,list])=>`${unit}=${list.join(',')}`).join(';');
  }
  function count(){return Object.keys(state.items).length;}
  function updateButton(){const button=document.getElementById('send-results');if(button)button.textContent=`SEND RESULTS (${count()})`;}
  function send(){
    if(!count()){const button=document.getElementById('send-results');button.textContent='ANSWER SOME QUESTIONS FIRST';setTimeout(updateButton,1500);return;}
    window.open(form.replace('XXX',encodeURIComponent(payload())),'_blank','noopener');
  }
  window.CasinoResults={record,payload,send,enabled:!!form};
  if(!form)return;
  const button=document.createElement('button');button.id='send-results';
  const finish=document.getElementById('finish-run');finish.parentNode.insertBefore(button,finish);
  if(typeof menuIds!=='undefined')menuIds.splice(menuIds.indexOf('finish-run'),0,'send-results');
  button.onclick=send;updateButton();
  // Remind students on the completion card.
  const summary=document.getElementById('chapter-summary');
  if(summary)new MutationObserver(()=>{if(summary.textContent.includes('Every question is done')&&!summary.textContent.includes('SEND RESULTS')){summary.append(' Choose SEND RESULTS in the menu.');}}).observe(summary,{childList:true,characterData:true,subtree:true});
})();
