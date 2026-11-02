/* Flags class: name the country from its flag. One learning unit per continent; "World" is the mixed tile.
   Country data (names, accepted spellings, difficulty tier, look-alike flags) is in countries.js.
   Flag pictures are assets/flags/<code>.svg from flag-icons (MIT, see assets/flags/LICENSE.txt). */
(()=>{
 const CONTINENTS=['Oceania','Asia','Europe','Africa','North America','South America'];
 const COUNTRIES=globalThis.FLAG_COUNTRIES||[];
 const byCode=new Map(COUNTRIES.map(c=>[c.code,c]));
 const ascii=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'');
 // Typing variants the app's own matcher misses: accents, hyphens as spaces ("Guinea Bissau"), "&" for "and", "St" for "Saint".
 function variants(name){
  const out=new Set([name,ascii(name)]);
  for(const v of [...out]){out.add(v.replace(/-/g,' '));out.add(v.replace(/ and /g,' & '));out.add(v.replace(/^Saint /,'St '));out.add(v.replace(/^Saint /,'St. '));}
  return [...out];
 }
 const accepted=c=>[...new Set([c.name,...c.aliases].flatMap(variants))].filter(a=>a!==c.name);
 // Never let typo-forgiveness turn one country into another (Austria → Australia, Slovakia → Slovenia).
 const block=globalThis.FUZZY_BLOCK=globalThis.FUZZY_BLOCK||new Set();
 const key=s=>ascii(s).toLowerCase().replace(/[.,!?;:'"“”‘’]/g,'').replace(/(?<=[a-z])-(?=[a-z])/g,'').replace(/\s+/g,' ').trim();
 for(const c of COUNTRIES)for(const a of [c.name,...accepted(c)])block.add(key(a));
 const flagImage=(code,cls='revision-visual flag-visual')=>`<img class="${cls}" src="assets/flags/${code}.svg" alt="A national flag">`;
 const MC_CHANCE={1:0.3,2:0.5,3:0.7};   // obscure flags are more often multiple choice
 function choicesFor(c,r,h){
  const pool=[...c.lookalikes.map(code=>byCode.get(code)).filter(Boolean)];
  for(const other of h.shuffle(COUNTRIES.filter(o=>o.continent===c.continent&&o!==c),r))if(!pool.includes(other))pool.push(other);
  return h.shuffle([c.name,...pool.slice(0,3).map(o=>o.name)],r);
 }
 function question(c){
  const similar=c.lookalikes.map(code=>byCode.get(code)?.name).filter(Boolean);
  return {id:'FL-'+c.code,unit:c.continent,skill:c.continent,flag:c.code,
   gen(r,h){
    const mc=r()<MC_CHANCE[c.tier];
    return {cloze:'This is the flag of ____',answer:c.name,aliases:accepted(c),caseSensitive:false,
     choices:mc?choicesFor(c,r,h):undefined,
     visual:{type:'svg',svg:flagImage(c.code)},
     explanation:`This is the flag of ${c.name}.`+(similar.length?` Similar: ${similar.slice(0,2).join(', ')}.`:'')};
   }};
 }
 const card=list=>`<div class="flag-card">${[...list].sort((a,b)=>a.name.localeCompare(b.name)).map(c=>`<figure>${flagImage(c.code,'flag-card-image')}<figcaption>${c.name}</figcaption></figure>`).join('')}</div>`;
 if(!COUNTRIES.length)return;
 (globalThis.EXTRA_UNITS=globalThis.EXTRA_UNITS||[]).push({
  id:'flags',class:'flags',name:'Flags of the world',status:'ready',mixed:true,mixedName:'World',
  skills:CONTINENTS.map(continent=>{
   const list=COUNTRIES.filter(c=>c.continent===continent);
   return {id:'flags-'+continent.toLowerCase().replace(/ /g,'-'),name:continent,
    summary:`Name the country from its flag. ${list.length} flags in ${continent}.`,
    example:'Type the country name, or pick it when choices are shown.',
    cardHtml:card(list),questions:list.map(question)};
  })
 });
})();
