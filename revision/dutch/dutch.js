/* Dutch (Netherlands) beginner prototype for Revision Roulette. Registers one unit with five skills via EXTRA_UNITS.
   Questions use the same gen(r,h) contract as Physics12 (randomness only through r). */
(function(){
 const Q='____';
 // Whole normalised answers that sit within a typo of another real answer (dertien/veertien, werkt/werken...).
 globalThis.FUZZY_BLOCK=globalThis.FUZZY_BLOCK||new Set();
 FUZZY_BLOCK.add('nul');
 ['nul','twee','drie','vier','zeven','negen','twaalf','dertien','veertien','vijftien','zestien','zeventien','achttien','negentien','twintig',
  'woon','woont','wonen','werk','werkt','werken','speel','speelt','spelen','heb','hebt','heeft','hebben','zijn','bent',
  'groen','groene','blauw','paars','bruin','grijs','zwart','oranje','roze',
  'goedemorgen','goedemiddag','goedenavond','goedenacht','bedankt','doei'].forEach(w=>FUZZY_BLOCK.add(w));

 const cap=s=>s[0].toUpperCase()+s.slice(1);

 // ---------- 1. Greetings & basics ----------
 const GREET=[
  {nl:'hallo',en:['hello','hi']},
  {nl:'goedemorgen',en:['good morning'],al:['goede morgen']},
  {nl:'goedemiddag',en:['good afternoon'],al:['goede middag']},
  {nl:'goedenavond',en:['good evening'],al:['goede avond']},
  {nl:'goedenacht',en:['good night'],al:['goede nacht']},
  {nl:'tot ziens',en:['goodbye','see you later'],al:['totziens']},
  {nl:'doei',en:['bye']},
  {nl:'tot morgen',en:['see you tomorrow']},
  {nl:'dank je wel',en:['thank you','thanks'],al:['dankjewel','dank u wel','dankuwel','dank je','dank u','bedankt']},
  {nl:'bedankt',en:['thanks','thank you'],al:['dank je wel','dankjewel','dank je']},
  {nl:'alsjeblieft',en:['please','here you are'],al:['alstublieft','als je blieft','alsjeblief']},
  {nl:'graag gedaan',en:['you are welcome',"you're welcome",'my pleasure']},
  {nl:'welkom',en:['welcome']},
  {nl:'ja',en:['yes']},
  {nl:'nee',en:['no']},
  {nl:'sorry',en:['sorry']},
 ];
 // Pairs where the Dutch word is ambiguous or has near-synonyms, used for the "situation" format.
 const SITU=[
  ['You meet a friend at 8 am. Say hello:','goedemorgen',['goede morgen'],'Goedemorgen is "good morning".'],
  ['It is 3 pm. Greet your teacher:','goedemiddag',['goede middag'],'Goedemiddag is "good afternoon".'],
  ['It is 7 pm. Greet someone:','goedenavond',['goede avond'],'Goedenavond is "good evening".'],
  ['You go to bed. Say good night:','goedenacht',['goede nacht'],'Goedenacht is "good night".'],
  ['You leave a shop. Say goodbye:','tot ziens',['totziens','doei','dag'],'Tot ziens means "goodbye" (until we see each other again).'],
  ['Someone helps you. Say thank you:','dank je wel',['dankjewel','dank u wel','dankuwel','bedankt','dank je','dank u'],'Dank je wel (or bedankt) means "thank you".'],
  ['Someone thanks you. Reply "you are welcome":','graag gedaan',[],'Graag gedaan means "you are welcome" (gladly done).'],
  ['You order: "Een koffie, ____."','alsjeblieft',['alstublieft','als je blieft'],'Alsjeblieft means "please" (and "here you are").'],
  ['Someone asks "Wil je thee?" (Want tea?) You want some. Say yes:','ja',[],'Ja means "yes".'],
  ['Someone asks "Wil je koffie?" You do not. Say no:','nee',[],'Nee means "no".'],
 ];

 // ---------- 2. Numbers 0–20 ----------
 const NUM=['nul','een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf','dertien','veertien','vijftien','zestien','zeventien','achttien','negentien','twintig'];

 // ---------- 3. de or het? (all checked against standard Dutch) ----------
 const NOUNS=[
  {nl:'man',art:'de',en:'man'},{nl:'vrouw',art:'de',en:'woman'},{nl:'jongen',art:'de',en:'boy'},{nl:'meisje',art:'het',en:'girl'},
  {nl:'kind',art:'het',en:'child'},{nl:'kat',art:'de',en:'cat'},{nl:'hond',art:'de',en:'dog'},{nl:'paard',art:'het',en:'horse'},
  {nl:'tafel',art:'de',en:'table'},{nl:'stoel',art:'de',en:'chair'},{nl:'bed',art:'het',en:'bed'},{nl:'deur',art:'de',en:'door'},
  {nl:'raam',art:'het',en:'window'},{nl:'huis',art:'het',en:'house'},{nl:'school',art:'de',en:'school'},{nl:'boek',art:'het',en:'book'},
  {nl:'pen',art:'de',en:'pen'},{nl:'papier',art:'het',en:'paper'},{nl:'water',art:'het',en:'water'},{nl:'brood',art:'het',en:'bread'},
  {nl:'melk',art:'de',en:'milk'},{nl:'kaas',art:'de',en:'cheese'},{nl:'appel',art:'de',en:'apple'},{nl:'ei',art:'het',en:'egg'},
  {nl:'fiets',art:'de',en:'bicycle',alt:['bike']},{nl:'auto',art:'de',en:'car'},{nl:'stad',art:'de',en:'city',alt:['town']},{nl:'dorp',art:'het',en:'village'},
  {nl:'straat',art:'de',en:'street',alt:['road']},{nl:'boom',art:'de',en:'tree'},{nl:'bloem',art:'de',en:'flower'},{nl:'land',art:'het',en:'country',alt:['land']},
  {nl:'zon',art:'de',en:'sun'},{nl:'maan',art:'de',en:'moon'},{nl:'hand',art:'de',en:'hand'},{nl:'hoofd',art:'het',en:'head'},
  {nl:'oog',art:'het',en:'eye'},{nl:'neus',art:'de',en:'nose'},{nl:'mond',art:'de',en:'mouth'},{nl:'vriend',art:'de',en:'friend'},
 ];
 const DIMIN=['huisje','kaartje','hondje','katje','boekje','tafeltje','stoeltje','bloemetje','boompje','autootje'];
 const DIMIN_EN={huisje:'little house',kaartje:'little card (ticket)',hondje:'little dog',katje:'little cat',boekje:'little book',tafeltje:'little table',stoeltje:'little chair',bloemetje:'little flower',boompje:'little tree',autootje:'little car'};

 // ---------- 4. Verbs ----------
 const PRON=[['ik',0],['jij',1],['hij',2],['zij (she)',2],['wij',3],['jullie',4],['zij (they)',5]];
 const VERBS={
  zijn:{en:'to be',f:['ben','bent','is','is','zijn','zijn','zijn']},
  hebben:{en:'to have',f:['heb','hebt','heeft','heeft','hebben','hebben','hebben']},
  werken:{en:'to work',f:['werk','werkt','werkt','werkt','werken','werken','werken']},
  wonen:{en:'to live (somewhere)',f:['woon','woont','woont','woont','wonen','wonen','wonen']},
  spelen:{en:'to play',f:['speel','speelt','speelt','speelt','spelen','spelen','spelen']},
 };
 const pronWord=p=>p.replace(/ \(.*\)/,'');
 // jij-form of each verb in inversion: the -t drops after jij ("werk jij?", "heb jij?", "ben jij?")
 const INV={zijn:'ben',hebben:'heb',werken:'werk',wonen:'woon',spelen:'speel'};

 // ---------- 5. Colours & everyday nouns ----------
 const COL=[['red','rood'],['blue','blauw'],['yellow','geel'],['green','groen'],['black','zwart'],['white','wit'],['orange','oranje'],['purple','paars'],['brown','bruin'],['grey','grijs',['gray']],['pink','roze']];
 const COLTHING=[
  ['De lucht is ____.','blauw','The sky is blue.'],['Gras is ____.','groen','Grass is green.'],['Sneeuw is ____.','wit','Snow is white.'],
  ['Een banaan is ____.','geel','A banana is yellow.'],['Een tomaat is ____.','rood','A tomato is red.'],['Een wortel is ____.','oranje','A carrot is orange.'],
  ['Melk is ____.','wit','Milk is white.'],['Chocola is ____.','bruin','Chocolate is brown.'],['De zon is ____.','geel','The sun is yellow.'],
 ];

 const enAl=(en,alt)=>{const base=[en,...(alt||[])];return base.flatMap(w=>[w,'the '+w,'a '+w]);};

 const skills=[
  {id:'dutch-greetings',name:'Greetings & basics',summary:'Hallo, goedemorgen, dank je wel, alsjeblieft, tot ziens, ja and nee. Say them both ways.',example:'thank you = dank je wel',questions:[
   {id:'NL-G01',unit:'Greetings & basics',skill:'greetings',gen(r,h){const g=h.pick(GREET,r);return {cloze:`${cap(g.en[0])} in Dutch = ${Q}`,answer:g.nl,aliases:g.al||[],explanation:`${cap(g.nl)} means "${g.en[0]}".`,caseSensitive:false};}},
   {id:'NL-G02',unit:'Greetings & basics',skill:'greetings',gen(r,h){const g=h.pick(GREET,r);const ans=g.en[0];return {cloze:`${g.nl} = ${Q} (English)`,answer:ans,aliases:[...g.en.slice(1),...(g.nl==='ja'?[]:[])],explanation:`${cap(g.nl)} means "${g.en[0]}".`,caseSensitive:false};}},
   {id:'NL-G03',unit:'Greetings & basics',skill:'greetings',gen(r,h){const s=h.pick(SITU,r);return {cloze:s[0].includes(Q)?s[0]:`${s[0]} ${Q}`,answer:s[1],aliases:s[2],explanation:s[3],caseSensitive:false};}},
   {id:'NL-G04',unit:'Greetings & basics',skill:'greetings',gen(r,h){const pool=GREET.filter(x=>x.en.length&&!['hallo','sorry','ja','nee','welkom'].includes(x.nl));const g=h.pick(pool,r);
     const others=h.shuffle(pool.filter(x=>x.nl!==g.nl&&!x.en.some(e=>g.en.includes(e))),r).slice(0,3).map(x=>x.nl);
     return {cloze:`"${g.en[0]}" = ${Q}`,answer:g.nl,choices:h.shuffle([g.nl,...others],r),explanation:`${cap(g.nl)} means "${g.en[0]}".`};}},
   {id:'NL-G05',unit:'Greetings & basics',skill:'greetings',gen(r,h){const yes=r()<.5;return {cloze:`${yes?'Yes':'No'} = ${Q}`,answer:yes?'ja':'nee',aliases:[],explanation:yes?'Ja means "yes".':'Nee means "no".',caseSensitive:false};}},
   {id:'NL-G06',unit:'Greetings & basics',skill:'greetings',gen(r,h){const nm=h.pick(['Ana','Bella','Caleb','Daan','Eva'],r);const p=h.pick([['Ik','My name is'],['Hij','His name is'],['Zij','Her name is']],r);return {cloze:`${p[1]} ${nm}: "${p[0]} ${Q} ${nm}."`,answer:'heet',aliases:[],explanation:`${p[0]} heet ${nm}: "heten" means "to be called" (name).`,caseSensitive:false};}},
  ]},
  {id:'dutch-numbers',name:'Numbers 0–20',summary:'Count nul to twintig, in both directions, then add and subtract.',example:'7 = zeven',questions:[
   {id:'NL-N01',unit:'Numbers 0–20',skill:'numbers',gen(r,h){const n=h.int(0,20,r);return {cloze:`${n} = ${Q}`,answer:NUM[n],aliases:n===1?['één','eén']:[],explanation:`${n} is ${n===1?'één':NUM[n]}.`,caseSensitive:false};}},
   {id:'NL-N02',unit:'Numbers 0–20',skill:'numbers',gen(r,h){const n=h.int(0,20,r);return {cloze:`${n===1?'één':NUM[n]} = ${Q} (digits)`,answer:String(n),aliases:[],explanation:`${n===1?'één':NUM[n]} is ${n}.`};}},
   {id:'NL-N03',unit:'Numbers 0–20',skill:'numbers',gen(r,h){const n=h.int(0,17,r);return {cloze:`${n}, ${n+1}, ${n+2}, ${Q}\n(next, in Dutch)`,answer:NUM[n+3],aliases:[],explanation:`${n+3} is ${NUM[n+3]}.`,caseSensitive:false};}},
   {id:'NL-N04',unit:'Numbers 0–20',skill:'numbers',gen(r,h){const a=h.int(1,10,r),b=h.int(1,20-a,r);const nm=n=>n===1?'één':NUM[n];return {cloze:`${nm(a)} plus ${nm(b)} = ${Q}`,answer:NUM[a+b],aliases:a+b===1?['één']:[],explanation:`${a} + ${b} = ${a+b}, which is ${NUM[a+b]}.`,caseSensitive:false};}},
   {id:'NL-N05',unit:'Numbers 0–20',skill:'numbers',gen(r,h){const a=h.int(2,20,r),b=h.int(1,a,r);const nm=n=>n===1?'één':NUM[n];return {cloze:`${nm(a)} min ${nm(b)} = ${Q}`,answer:NUM[a-b],aliases:a-b===1?['één']:[],explanation:`${a} − ${b} = ${a-b}, which is ${NUM[a-b]}.`,caseSensitive:false};}},
   {id:'NL-N06',unit:'Numbers 0–20',skill:'numbers',gen(r,h){const n=h.int(0,20,r);const wrong=h.shuffle([...Array(21).keys()].filter(i=>i!==n&&Math.abs(i-n)<=4),r).slice(0,3);
     return {cloze:`${n===1?'één':NUM[n]} = ${Q}`,answer:String(n),choices:h.shuffle([n,...wrong].map(String),r),explanation:`${n===1?'één':NUM[n]} is ${n}.`};}},
  ]},
  {id:'dutch-de-het',name:'de or het?',summary:'Dutch has two words for "the". Learn each noun with its article. Words ending in -je are always het.',example:'het huis, de kat',questions:[
   {id:'NL-D01',unit:'de or het?',skill:'de-het',gen(r,h){const n=h.pick(NOUNS,r);return {cloze:`${Q} ${n.nl}`,answer:n.art,choices:['de','het'],explanation:`It is ${n.art} ${n.nl} (${n.en}).`};}},
   {id:'NL-D02',unit:'de or het?',skill:'de-het',gen(r,h){const n=h.pick(NOUNS,r);return {cloze:`the ${n.en} = ${Q} ${n.nl}`,answer:n.art,choices:['de','het'],explanation:`It is ${n.art} ${n.nl}.`};}},
   {id:'NL-D03',unit:'de or het?',skill:'de-het',gen(r,h){const n=h.pick(NOUNS,r);return {cloze:`Ik zie ${Q} ${n.nl}.\n(I see the ${n.en}.)`,answer:n.art,choices:['de','het'],explanation:`${cap(n.art)} ${n.nl}: the ${n.en}.`};}},
   {id:'NL-D04',unit:'de or het?',skill:'de-het',gen(r,h){const d=h.pick(DIMIN,r);return {cloze:`${Q} ${d}\n(words ending in -je)`,answer:'het',choices:['de','het'],explanation:`Every diminutive (-je, -tje) is het: het ${d}, ${DIMIN_EN[d]}.`};}},
   {id:'NL-D05',unit:'de or het?',skill:'de-het',gen(r,h){const n=h.pick(NOUNS,r);return {cloze:`${cap(n.nl)} is ${Q}-woord. (de/het)`,answer:n.art,choices:['de','het'],explanation:`${cap(n.nl)} is a ${n.art}-woord: ${n.art} ${n.nl}.`};}},
   {id:'NL-D06',unit:'de or het?',skill:'de-het',gen(r,h){const n=h.pick(NOUNS,r);return {cloze:`${n.en} = ${Q} ${n.nl}\n(type de or het)`,answer:n.art,aliases:[],explanation:`It is ${n.art} ${n.nl}.`,caseSensitive:false};}},
  ]},
  {id:'dutch-verbs',name:'Verbs: zijn, hebben, werken',summary:'ik ben, jij bent, hij is; ik heb, hij heeft; ik werk, jij werkt, wij werken.',example:'ik ben, jij bent, hij is',questions:[
   {id:'NL-V01',unit:'Verbs: zijn, hebben, werken',skill:'verbs',gen(r,h){const p=h.pick(PRON,r);return {cloze:`${p[0]} ${Q}\n(zijn = to be)`,answer:VERBS.zijn.f[p[1]],aliases:[],explanation:`Zijn: ${pronWord(p[0])} ${VERBS.zijn.f[p[1]]}.`,caseSensitive:false};}},
   {id:'NL-V02',unit:'Verbs: zijn, hebben, werken',skill:'verbs',gen(r,h){const p=h.pick(PRON,r);return {cloze:`${p[0]} ${Q}\n(hebben = to have)`,answer:VERBS.hebben.f[p[1]],aliases:[],explanation:`Hebben: ${pronWord(p[0])} ${VERBS.hebben.f[p[1]]}.`,caseSensitive:false};}},
   {id:'NL-V03',unit:'Verbs: zijn, hebben, werken',skill:'verbs',gen(r,h){const v=h.pick(['werken','wonen','spelen'],r),p=h.pick(PRON,r);return {cloze:`${p[0]} ${Q}\n(${v} = ${VERBS[v].en})`,answer:VERBS[v].f[p[1]],aliases:[],explanation:`${pronWord(p[0])} ${VERBS[v].f[p[1]]}. Stem + t for jij/hij/zij, plain stem for ik, infinitive for the plurals.`,caseSensitive:false};}},
   {id:'NL-V04',unit:'Verbs: zijn, hebben, werken',skill:'verbs',gen(r,h){const v=h.pick(Object.keys(VERBS),r),i=h.pick([0,1,2,4],r);
     const en={0:'I',1:'you',2:'he',4:'we'}[i];const pr={0:'ik',1:'jij',2:'hij',4:'wij'}[i];
     const be={zijn:{0:'am',1:'are',2:'is',4:'are'}};
     const verbEn={zijn:be.zijn[i],hebben:i===2?'has':'have',werken:i===2?'works':'work',wonen:i===2?'lives':'live',spelen:i===2?'plays':'play'}[v];
     return {cloze:`${en} ${verbEn} = ${pr} ${Q}`,answer:VERBS[v].f[i],aliases:[],explanation:`${cap(v)}: ${pr} ${VERBS[v].f[i]}.`,caseSensitive:false};}},
   {id:'NL-V05',unit:'Verbs: zijn, hebben, werken',skill:'verbs',gen(r,h){const v=h.pick(['zijn','hebben','werken','wonen','spelen'],r);const f=VERBS[v].f;const p=h.pick([0,1,2,4],r);
     const nm={0:'ik',1:'jij',2:'hij',4:'wij'}[p];const wrong=h.shuffle([...new Set(f)].filter(x=>x!==f[p]),r).slice(0,3);
     return {cloze:`${nm} ${Q}  (${v})`,answer:f[p],choices:h.shuffle([f[p],...wrong],r),explanation:`${cap(v)}: ${nm} ${f[p]}.`};}},
   {id:'NL-V06',unit:'Verbs: zijn, hebben, werken',skill:'verbs',gen(r,h){const v=h.pick(Object.keys(INV),r);const stmt={zijn:'Jij bent',hebben:'Jij hebt',werken:'Jij werkt',wonen:'Jij woont',spelen:'Jij speelt'}[v];
     return {cloze:`${stmt}.  Question: ${Q} jij?`,answer:INV[v],aliases:[],explanation:`In a question the verb comes first and jij takes no -t: ${INV[v]} jij?`,caseSensitive:false};}},
   {id:'NL-V07',unit:'Verbs: zijn, hebben, werken',skill:'verbs',gen(r,h){const subj=h.pick([['Hij','heeft','hebben'],['Zij (she)','heeft','hebben'],['Wij','hebben','hebben'],['Ik','ben','zijn'],['Hij','is','zijn'],['Jij','bent','zijn']],r);
     const obj={hebben:h.pick(['een boek','een fiets','een hond','een kat'],r),zijn:h.pick(['leraar','blij','moe','op school'],r)}[subj[2]];
     const txt=subj[2]==='zijn'&&obj==='leraar'?'een leraar':obj;
     return {cloze:`${subj[0].replace(' (she)','')} ${Q} ${txt}.`,answer:subj[1],aliases:[],explanation:`${subj[0].replace(' (she)','')} ${subj[1]} ${txt}.`,caseSensitive:false};}},
  ]},
  {id:'dutch-colours-nouns',name:'Colours & everyday nouns',summary:'rood, blauw, geel, groen … and common things like het huis, de kat, het brood.',example:'red = rood',questions:[
   {id:'NL-C01',unit:'Colours & everyday nouns',skill:'colours',gen(r,h){const c=h.pick(COL,r);return {cloze:`${cap(c[0])} in Dutch = ${Q}`,answer:c[1],aliases:[],explanation:`${cap(c[1])} means "${c[0]}".`,caseSensitive:false};}},
   {id:'NL-C02',unit:'Colours & everyday nouns',skill:'colours',gen(r,h){const c=h.pick(COL,r);return {cloze:`${c[1]} = ${Q} (English)`,answer:c[0],aliases:c[2]||[],explanation:`${cap(c[1])} means "${c[0]}".`,caseSensitive:false};}},
   {id:'NL-C03',unit:'Colours & everyday nouns',skill:'colours',gen(r,h){const t=h.pick(COLTHING,r);return {cloze:t[0],answer:t[1],aliases:[],explanation:`${t[2]} (${t[1]}).`,caseSensitive:false};}},
   {id:'NL-C04',unit:'Colours & everyday nouns',skill:'nouns',gen(r,h){const n=h.pick(NOUNS,r);return {cloze:`${cap(n.en)} in Dutch = ${Q}`,answer:n.nl,aliases:[`${n.art} ${n.nl}`],explanation:`${cap(n.en)} is ${n.art} ${n.nl}.`,caseSensitive:false};}},
   {id:'NL-C05',unit:'Colours & everyday nouns',skill:'nouns',gen(r,h){const n=h.pick(NOUNS,r);return {cloze:`${n.art} ${n.nl} = ${Q} (English)`,answer:n.en,aliases:enAl(n.en,n.alt).slice(1),explanation:`${cap(n.art)} ${n.nl} means "the ${n.en}".`,caseSensitive:false};}},
   {id:'NL-C06',unit:'Colours & everyday nouns',skill:'nouns',gen(r,h){const n=h.pick(NOUNS,r);return {cloze:`the ${n.en} = ${Q}`,answer:`${n.art} ${n.nl}`,aliases:[],explanation:`${cap(n.art)} ${n.nl}. Learn the article with the noun.`,caseSensitive:false};}},
   {id:'NL-C07',unit:'Colours & everyday nouns',skill:'nouns',gen(r,h){const n=h.pick(NOUNS,r);const wrong=h.shuffle(NOUNS.filter(x=>x.nl!==n.nl),r).slice(0,3).map(x=>x.nl);
     return {cloze:`${n.en} = ${Q}`,answer:n.nl,choices:h.shuffle([n.nl,...wrong],r),explanation:`${cap(n.en)} is ${n.art} ${n.nl}.`};}},
  ]},
 ];
 // Fuzzy block: the bare noun words and numbers are also whole answers elsewhere.
 NOUNS.forEach(n=>{if(n.nl.length>=5)FUZZY_BLOCK.add(n.nl);});
 (globalThis.EXTRA_UNITS=globalThis.EXTRA_UNITS||[]).push({
  id:'dutch',class:'dutch',name:'Dutch — beginner prototype',status:'ready',mixed:true,mixedName:'All Dutch skills',skills
 });
})();
