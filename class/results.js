/* Optional results reporting, set in results-config.js. Two ways, either or both:
   - CASINO_RESULTS_API: the backend (backend/server.py). The running per-question summary is sent automatically
     every 20 seconds (and when the tab is hidden) under a random player id kept in this browser. No names.
   - CASINO_RESULTS_FORM: a Google Form pre-filled link containing XXX. Students press SEND RESULTS; the Form
     (school Google account, verified emails) records who sent it. Only used when no API is set. */
(function(){
  // Two versions of the game: plain (index.html: pick a unit and practise, nothing is sent anywhere) and class
  // (class.html -> index.html?mode=class: join screen, class code, results sent to the backend, unit chosen by the link).
  // The published /class/ copy sets CASINO_DEFAULT_MODE='class' in its results-config.js, so its plain URL is the class game.
  const modeParam=new URLSearchParams(location.search).get('mode'),classMode=!!window.CASINO_LOCK||modeParam==='class'||(window.CASINO_DEFAULT_MODE==='class'&&modeParam!=='plain');
  if(!classMode){window.CasinoResults={record(){},send(){},report(){},player:'',name:'',code:'',enabled:false};return;}
  const api=String(new URLSearchParams(location.search).get('results-api')||window.CASINO_RESULTS_API||'').trim().replace(/\/+$/,'');
  const form=api?'':String(window.CASINO_RESULTS_FORM||'').trim();
  const KEY='casino-results-v1';
  const today=()=>new Date().toLocaleDateString('en-CA');
  function load(){
    try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved&&saved.day===today()&&saved.items)return {written:{},...saved};}catch{}
    return {day:today(),items:{},written:{}};
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
    if(!(form||api)||!current)return;
    try{
      if(state.day!==today())state={day:today(),items:{},written:{}};
      const key=`${selectedUnit}|${questionKey()}`,item=state.items[key]||(state.items[key]={a:0,c:0,f:ok?1:0});
      item.a++;if(ok)item.c++;
      // Self-marked (explain) parts: keep the whole written answer and the student's own mark for the teacher.
      const box=current.source?.selfMark&&document.querySelector('.exam-written');
      if(box&&box.value.trim()){
        const [unit,id]=key.split('|'),q=(document.getElementById('prompt')?.innerText+' '+(document.querySelector('.choice-question')?.innerText||'')).replace(/\s+/g,' ').trim();
        state.written[key]={unit,id,q:q.slice(0,600),text:box.value.trim().slice(0,4000),self:ok?1:0};
      }
      save();dirty=true;updateButton();
    }catch{}
  }
  // unit|id:attempts.correct.firstTry entries; units grouped to keep the link short.
  function payload(){
    const groups={};
    for(const [key,item] of Object.entries(state.items)){const [unit,id]=key.split('|');(groups[unit]||=[]).push(`${id}:${item.a}.${item.c}.${item.f}`);}
    // The current bank ($) rides along as a bank=N group for the class race page; the dashboard skips it (no id:a.c.f entries).
    const bank=api&&typeof score==='number'?`;bank=${Math.max(0,Math.round(score))}`:'';
    return 'v1 '+state.day+' '+Object.entries(groups).map(([unit,list])=>`${unit}=${list.join(',')}`).join(';')+bank;
  }
  function count(){return Object.keys(state.items).length;}
  function updateButton(){if(!form)return;const button=document.getElementById('send-results');if(button)button.textContent=`SEND RESULTS (${count()})`;}
  function send(){
    if(!count()){const button=document.getElementById('send-results');button.textContent='ANSWER SOME QUESTIONS FIRST';setTimeout(updateButton,1500);return;}
    window.open(form.replace('XXX',encodeURIComponent(payload())),'_blank','noopener');
  }
  // Random player id, e.g. P-4821, kept in this browser so a student's reports join up across the day.
  let player='';
  try{player=localStorage.getItem('casino-player-id')||'';}catch{}
  if(!/^P-\d{4,8}$/.test(player)){player='P-'+String(1000+Math.floor(Math.random()*9000));try{localStorage.setItem('casino-player-id',player);}catch{}}
  // Random alliterating animal name, Google Docs style ("Grumpy Gorilla", "Shrieking Seagull"), for the leaderboard.
  // 30 animals; the adjective / -ing verb starts with the animal's letter. Kept in this browser.
  const ANIMALS=['Alpaca','Axolotl','Badger','Beaver','Capybara','Cheetah','Dolphin','Duck','Flamingo','Frog','Gorilla','Giraffe','Hedgehog','Hippo','Jellyfish','Kangaroo','Kiwi','Llama','Lion','Meerkat','Octopus','Otter','Penguin','Panda','Quokka','Rabbit','Seagull','Sloth','Tiger','Walrus'];
  const WORDS={
    A:['Awesome','Adventurous','Amazing','Acrobatic','Arguing'],
    B:['Bouncing','Bashful','Bubbly','Burping','Brave','Blinking'],
    C:['Cheeky','Cuddly','Clumsy','Cartwheeling','Chuckling','Curious'],
    D:['Dancing','Dizzy','Daring','Dazzling','Dreaming','Dozing'],
    F:['Fluffy','Fizzing','Fearless','Flapping','Fancy','Frolicking'],
    G:['Grumpy','Giggling','Groovy','Glowing','Gliding','Gleeful'],
    H:['Happy','Hopping','Humming','Hungry','Hiccuping','Hasty'],
    J:['Jolly','Jumping','Jazzy','Juggling','Jittery'],
    K:['Kooky','Kicking','Kind','Knitting'],
    L:['Lucky','Laughing','Lazy','Leaping','Loud'],
    M:['Mighty','Munching','Merry','Moonwalking','Mysterious','Mumbling'],
    O:['Odd','Orbiting','Outrageous','Optimistic'],
    P:['Prancing','Plucky','Puzzled','Peckish','Purring','Polite'],
    Q:['Quirky','Quacking','Quick','Quiet'],
    R:['Rolling','Roaring','Racing','Rapping','Radiant'],
    S:['Shrieking','Sleepy','Sneaky','Sparkly','Snoring','Sneezing','Skipping'],
    T:['Tiny','Twirling','Tickled','Tumbling','Turbo','Tiptoeing'],
    W:['Wobbly','Wiggling','Wise','Waddling','Whistling','Wacky'],
  };
  const pick=list=>list[Math.floor(Math.random()*list.length)];
  function makeName(){const animal=pick(ANIMALS);return pick(WORDS[animal[0]])+' '+animal;}
  let name='';
  try{name=localStorage.getItem('casino-player-name')||'';}catch{}
  if(!name){name=makeName();try{localStorage.setItem('casino-player-name',name);}catch{}}
  // Class code (e.g. KEA7) keeps each class's data separate. From ?code=, else typed on a full-screen prompt at the start.
  const CODE_RE=/^[A-Z0-9]{2,12}$/;
  const tidy=v=>String(v||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
  let code=window.CASINO_LOCK?.code||tidy(new URLSearchParams(location.search).get('code'));
  try{if(window.CASINO_LOCK?.code){/* locked: the link's code wins */}else if(CODE_RE.test(code))localStorage.setItem('casino-class-code',code);else code=localStorage.getItem('casino-class-code')||'';}catch{}
  let dirty=count()>0;
  function report(beacon){
    if(!api||!code||!dirty||!count())return;
    const body=JSON.stringify({id:player,name,code,payload:payload(),written:Object.values(state.written||{})});dirty=false;
    if(beacon&&navigator.sendBeacon){navigator.sendBeacon(api+'/api/report',new Blob([body],{type:'text/plain'}));return;}
    // text/plain keeps this a simple request (no CORS preflight).
    fetch(api+'/api/report',{method:'POST',headers:{'Content-Type':'text/plain'},body,keepalive:true}).catch(()=>{dirty=true;});
  }
  window.CasinoResults={record,payload,send,report,player,name,get code(){return code;},enabled:!!(form||api)};
  if(api){
    // Show the student their leaderboard name on the main menu.
    const hint=document.querySelector('#menu-screen .menu-hint');
    let tag=null;
    // Name and animal in the top bar of every screen, so students can find themselves on the class race.
    const showBadge=()=>{
      const bar=document.querySelector('header.arcade-hud');if(!bar||document.getElementById('player-badge'))return;
      const badge=document.createElement('span');badge.id='player-badge';badge.setAttribute('aria-label','You are '+name);
      badge.style.cssText='flex:0 0 auto;display:flex;align-items:center;gap:12px;font-size:clamp(22px,2.6vw,34px);letter-spacing:.04em;margin-left:auto;margin-right:12px;color:var(--a2-green,var(--ink))';
      badge.innerHTML=(globalThis.animalIcon?.(name,3,true)||'')+'<span>'+name.toUpperCase()+'</span>';
      const nav=bar.querySelector('nav');bar.insertBefore(badge,nav);if(nav)nav.style.marginLeft='0';
    };
    const showTag=()=>{showBadge();if(!tag)return;tag.textContent=`YOU ARE ${name.toUpperCase()}`+(code?` · CLASS ${code}`:' · NO CLASS CODE (RESULTS NOT SENT)');
      const art=globalThis.animalIcon?.(name,3,true);if(art){tag.insertAdjacentHTML('afterbegin',art);const svg=tag.firstElementChild;svg.style.cssText='display:block;margin:0 auto 6px';}};
    if(hint){tag=document.createElement('p');tag.className='menu-hint player-name';hint.before(tag);showTag();}
    {
      // Join screen (class mode): your random name, your animal in your colour, and the class code. Opaque, full viewport (styleguide).
      const unitName=(curriculumUnits.find(u=>u.id===selectedUnit)?.name||'').toUpperCase();
      const tile=new URLSearchParams(location.search).get('tile')||'mixed';
      const screen=document.createElement('section');screen.id='class-code-screen';screen.setAttribute('aria-labelledby','class-code-title');
      screen.style.cssText='position:fixed;inset:0;z-index:120;background:var(--paper);color:var(--ink);display:grid;place-items:center;text-align:center;padding:24px;overflow:auto';
      const art=globalThis.animalIcon?.(name,1,true)||'';
      screen.innerHTML=`<form style="display:flex;flex-direction:column;align-items:center;gap:clamp(8px,2vh,22px)"><p class="menu-hint" style="margin:0;animation:none;opacity:1">YOU ARE</p><div id="join-art" style="line-height:0">${art}</div><h1 id="class-code-title" style="font-size:clamp(30px,8vh,76px);margin:0;color:var(--a2-green,var(--ink))">${name.toUpperCase()}</h1>${unitName?`<p class="menu-hint" style="margin:0;animation:none;opacity:1">TODAY: ${unitName}</p>`:''}<label for="class-code" class="menu-hint" style="margin:clamp(4px,2vh,24px) 0 0;animation:none;opacity:1">ENTER YOUR CLASS CODE</label><input id="class-code" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="12" value="${code}" style="font:inherit;font-size:clamp(30px,7vh,56px);width:7em;max-width:90vw;text-align:center;text-transform:uppercase;background:var(--paper);color:var(--ink);border:2px solid var(--ink);padding:8px"><p id="class-code-error" class="menu-hint" style="min-height:1.5em;margin:0" aria-live="polite">PRESS ENTER TO START</p></form>`;
      // Locked link with a code: no join screen, boot.js starts the unit straight away.
      if(window.CASINO_LOCK?.code)screen.hidden=true;else document.body.append(screen);
      const svg=screen.querySelector('#join-art svg');if(svg){const size=Math.max(96,Math.min(innerHeight*.34,320));svg.setAttribute('width',size);svg.setAttribute('height',size);}
      const input=screen.querySelector('#class-code');
      // Start (or restart, from the menu's START) the unit chosen by the link: the Everything mixed tile unless ?tile= names another.
      const begin=()=>{const before=enabled;beginPractice(tile);if(enabled===before)openPractice(tile);};
      window.CasinoClass={restart:begin};
      screen.addEventListener('keydown',e=>e.stopPropagation());
      screen.querySelector('form').onsubmit=e=>{e.preventDefault();const v=tidy(input.value);if(!CODE_RE.test(v)){screen.querySelector('#class-code-error').textContent='2 TO 12 LETTERS OR NUMBERS';return;}code=v;try{localStorage.setItem('casino-class-code',code);}catch{}screen.remove();showTag();dirty=true;begin();};
      if(!screen.hidden)input.focus();
    }
    // The bank also changes in the roulette without any answer being recorded, so notice that too.
    let lastBank=null;
    setInterval(()=>{if(typeof score==='number'&&score!==lastBank){if(lastBank!==null)dirty=true;lastBank=score;}report(false);},10000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')report(true);});
    window.addEventListener('pagehide',()=>report(true));
  }
  if(!form)return;
  const button=document.createElement('button');button.id='send-results';
  const finish=document.getElementById('finish-run');finish.parentNode.insertBefore(button,finish);
  if(typeof menuIds!=='undefined')menuIds.splice(menuIds.indexOf('finish-run'),0,'send-results');
  button.onclick=send;updateButton();
  // Remind students on the completion card.
  const summary=document.getElementById('chapter-summary');
  if(summary)new MutationObserver(()=>{if(summary.textContent.includes('Every question is done')&&!summary.textContent.includes('SEND RESULTS')){summary.append(' Choose SEND RESULTS in the menu.');}}).observe(summary,{childList:true,characterData:true,subtree:true});
})();
