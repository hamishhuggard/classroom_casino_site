/* Question One: Traits and variation (test pages 2–4). Templates for 1(a), 1(b), 1(c), 1(d). See core.js for the contract. */
(function(){
 const {add,P,S,svg,line,rect,fillRect,text,arrow,ask,sprite,table,pic,pics}=GENETICS_T;
 // 1(a) picture: parents pass characteristics to offspring, and the offspring vary.
 const family=()=>pic(sprite('person',40,14,4,'bright')+sprite('person',196,14,4,'dim')+text(150,50,'parents',22)
  +arrow(104,62,74,124,3,10)+arrow(150,62,150,124,3,10)+arrow(196,62,226,124,3,10)
  +sprite('person',26,134,3,'bright')+sprite('person',126,134,3,'dim')+sprite('person',226,134,3,'bright')+text(150,214,'offspring',22),
  'Two parents and three offspring: the offspring inherit characteristics from their parents and vary');
 // Split a string into lines of at most n characters (for text inside boxes).
 const wrap=(s,n)=>{const out=[];let cur='';for(const w of s.split(' ')){if(cur&&(cur+' '+w).length>n){out.push(cur);cur=w;}else cur=cur?cur+' '+w:w;}if(cur)out.push(cur);return out;};
 const cap=s=>s[0].toUpperCase()+s.slice(1);
 // Local pixel sprites (same format as core.js SPRITES): '#' takes the shade, 's' always solid.
 const LOCAL={
  rabbit:['...s..s.........','...s..s.........','...##.##........','...######.......','..#######.......','..########......','...##########...','..############..','..#############.','..############..','...s.s.....s.s..'],
  bacterium:['................','....########....','..############..','.##############.','################','################','.##############.','..############..','....########....'],
  insect:['....s......s....','.....s....s.....','......####......','.....######.....','..s.########.s..','...s########s...','..s.########.s..','...s.######.s...','.....######.....','......####......'],
 };
 const draw=(name,x,y,px,shade)=>{if(!LOCAL[name])return sprite(name,x,y,px,shade);let b='';LOCAL[name].forEach((row,j)=>[...row].forEach((c,i)=>{if(c!=='.')b+=fillRect(x+i*px,y+j*px,px,px,c==='s'||shade==='dark'?1:.32);}));return b;};

 // ---------- 1(a) Genetics vocabulary: Term | Definition table, six levels (core.js vocabTable) ----------
 // Definitions from the Assessment Schedule V4; typed definitions are marked on their key ideas.
 GENETICS_T.vocabTable({key:'1a',group:'Q1',test:'1(a)',li:1,sc:'Define trait, heredity, variation and phenotype',title:'LI1 vocabulary',skillName:'Traits and variation vocabulary',
  DEF:{Trait:'A characteristic of an organism, such as eye colour',Heredity:'Passing genetic information from parents to offspring',
   Variation:'Differences between organisms of the same species',Phenotype:'Observable characteristics of an organism'},
  KEYW:{Trait:['characteristic'],Heredity:['genetic information','parents to offspring'],Variation:['differences','species'],Phenotype:['observable']},
  KEYALT:{characteristic:['feature','quality','attribute'],'genetic information':['genes','traits','characteristics','dna','genetic material','information'],'parents to offspring':['parents to their offspring','parent to offspring','parents to children'],observable:['visible','physical','measurable']},
  IDEAS:{Trait:[/characteristic|feature|quality|attribute/],
   Heredity:[/pass|inherit|transfer|transmit|hand|give|given/,/parent|mother|father/,/offspring|child|young|generation|bab(y|ies)|kid/],
   Variation:[/differ/,/species|same kind|same type|individual|organism|population/],
   Phenotype:[/observ|visible|see|seen|physical|appear|look|show/]},pic:family});

 // ---------- 1(b) Inherited and environmental factors: the whole I or E column ----------
 const INH=['Eye colour','Natural hair colour','Blood group','Rhesus blood factor (+ or −)','Earlobe shape (attached or free)','Natural hair texture (curly or straight)',
  'Dimples','Colour blindness','Albinism','Widow’s peak hairline','Cleft chin','Being able to taste a bitter chemical (PTC)'];
 const ENV=['Scar from a basketball injury','Scar from a rugby injury','A tattoo','Pierced ears','The language a person speaks','A suntan','A sunburn','Dyed hair','A broken arm',
  'Braces on teeth','A haircut','Calluses from playing guitar','Being able to ride a bike','Being able to swim','Being able to play the piano','A New Zealand accent','Painted nails','A chipped tooth'];
 // Both: genes set the potential or tendency, and the environment changes it.
 const BOTH=['Height','Body mass','Freckles','Running speed','Muscle strength','Tooth decay','Acne'];
 add({id:'1b',test:'1(b)',group:'Q1',title:'Inherited and environmental factors',li:1,sc:'Distinguish between inherited and environmental characteristics; recognise that genes and the environment both influence traits',level:'A',
  template:'At Glenfield College, variation is caused by inherited genes, environmental factors, or both.\nCharacteristic | Inherited, Environmental or Both table, 12 rows: choose Inherited, Environmental or Both for every row (each marked at once).',
  slots:{'inherited (I)':INH.join(', '),'environmental (E)':ENV.join(', '),'both (B)':BOTH.join(', '),table:'12 rows: 3–4 Inherited, 2–3 Both, the rest Environmental; new characteristics and a new order every draw'},
  gen(r){const nI=3+Math.floor(r()*2),nB=2+Math.floor(r()*2);
   const rows=S(r,[...S(r,INH).slice(0,nI).map(c=>[c,'Inherited']),...S(r,BOTH).slice(0,nB).map(c=>[c,'Both']),...S(r,ENV).slice(0,12-nI-nB).map(c=>[c,'Environmental'])]);
   const list=k=>rows.filter(x=>x[1]===k).map(x=>x[0].replace(/ \(.*\)$/,'').toLowerCase()).join(', ');
   return {instruction:'Is each characteristic inherited (genes), environmental, or both?',cloze:'Inherited, Environmental or Both for each row = ____',
    answer:rows.map(x=>x[1]).join(' | '),cells:rows.map(x=>({answer:x[1],options:['Inherited','Environmental','Both']})),
    visual:{type:'gtable',headers:['Characteristic','Inherited, environmental or both?'],rows:rows.map(([c],i)=>[c,{cell:i,label:'Inherited, Environmental or Both'}]),svg:pics.genesEnv('sun',['genes','environment'])},
    explanation:`Inherited: ${list('Inherited')}. Environmental: ${list('Environmental')}. Both (genes set the potential, the environment changes it): ${list('Both')}.`,
    chosen:{rows:rows.map(x=>x[0]+' = '+x[1]).join('; ')}};}});

 // ---------- 1(c) Inherited, environmental or both? Explain, four levels (core.js explain) ----------
 // Model answer: the schedule's Merit exemplar, tightened. Made-up people and skills, so each draw is a variation on the test's question, not the test question.
 GENETICS_T.explain({key:'1c',group:'Q1',test:'1(c)',li:1,sc:'Recognise that genes and the environment both influence traits; compare genetic and environmental influences on traits',
  title:'Inherited, environmental or both?',skillName:'Inherited, environmental or both?',level:'A/M',
  contexts:[{label:'Ana, violinist',name:'Ana',role:'violinist',inh:'hearing and finger coordination'},
   {label:'Caleb, sprinter',name:'Caleb',role:'sprinter',inh:'leg muscle and reaction speed'},
   {label:'Bella, netball player',name:'Bella',role:'netball player',inh:'height and agility'},
   {label:'Mere, mathematician',name:'Mere',role:'mathematician',inh:'memory and logical reasoning'},
   {label:'Tama, chess player',name:'Tama',role:'chess player',inh:'memory and concentration'}],
  stem:c=>`${c.name} is a world-class ${c.role}. Will ${c.name}’s children automatically become great ${c.role}s?\nIs being a world-class ${c.role} inherited, environmental, or both? Explain.`,
  model:c=>`Being a world-class ${c.role} is influenced by [both inherited and environmental|inherited|environmental|star sign] factors. A person’s ${c.inh} are partly set by the [genes] they receive from their parents. But environmental factors such as [training], coaching and good nutrition are needed to develop these abilities. So the children of ${c.name} may have the [potential], but it is not [guaranteed] that they will become world-class.`,
  pic:c=>pics.genesEnv('train',['inherit','training']),
  aliases:{genes:['dna','alleles'],training:['practice','exercise'],potential:['ability','chance'],guaranteed:['certain','sure','automatic'],'both inherited and environmental':['both','both environmental and inherited','inherited and environmental','environmental and inherited','both genetic and environmental']},
  ideas:()=>[/both|combination|inherited and environmental|genes and (the )?environment/,/inherit|gene/,/train|coach|practi|nutrition|environment/,/guarantee|not automatic|still need|may not|might not|won.?t automatically|doesn.?t mean|not certain|not necessarily/]});

 // ---------- 1(d) Survival of a population ----------
 const POPS=[
  {org:'kākāpō',one:'kākāpō',pop:'kākāpō',res:'disease resistance',event:'A new disease spreads through the population',press:'disease',future:'disease outbreaks',sprite:'kakapo',px:3},
  {org:'rabbits',one:'rabbit',pop:'rabbit',res:'resistance to the myxoma virus',event:'The myxoma virus spreads through the population',press:'virus',future:'virus outbreaks',sprite:'rabbit',px:3},
  {org:'bacteria',one:'bacterium',pop:'bacteria',res:'resistance to an antibiotic',event:'The antibiotic is used to treat an infection',press:'antibiotic',future:'antibiotic treatments',sprite:'bacterium',px:3},
  {org:'insects',one:'insect',pop:'insect',res:'resistance to an insecticide',event:'A crop is sprayed with the insecticide',press:'insecticide',future:'sprayings',sprite:'insect',px:3}];
 const NS=[
  {level:'A',make:s=>({cloze:'Natural selection is when organisms with favourable characteristics are more likely to ____',answer:'survive and reproduce',choices:['survive and reproduce','grow bigger','learn new skills'],explanation:'Organisms with favourable (helpful) inherited characteristics are more likely to survive and reproduce.'})},
  {level:'A',make:s=>({cloze:`Some ${s.org} have better resistance.\nSo they are more likely to ____ the ${s.press}`,answer:'survive',choices:['survive','die from'],explanation:'Resistant individuals are more likely to survive.'})},
  {level:'M',make:s=>({cloze:`The resistance is due to a genetic difference, such as an ____ for resistance`,answer:'allele',choices:['allele','acquired change','effort'],explanation:'Resistance comes from an inherited allele (or a heritable mutation), not from effort or injury.'})},
  {level:'M',make:s=>({cloze:`Resistant ${s.org} are more likely to survive and ____`,answer:'reproduce',choices:['reproduce','grow bigger','change their genes'],explanation:'Surviving is not enough: they must reproduce to pass the allele on.'})},
  {level:'M',make:s=>({cloze:`Survivors can pass the resistance allele to their ____`,answer:'offspring',choices:['offspring','parents','environment'],explanation:'Survivors pass their alleles to their offspring.'})},
  {level:'E',make:s=>({cloze:`Over many generations, resistance may become more ____ in the ${s.pop} population`,answer:'common',choices:['common','rare','dangerous'],explanation:'The resistance allele spreads, so resistance becomes more common over many generations.'})},
  {level:'E',make:s=>({cloze:`The population becomes better ____ and more likely to survive future ${s.future}`,answer:'adapted',choices:['adapted','acclimatised','trained'],explanation:'More of the population now has the resistance allele, so it is better adapted.'})}];
 add({id:'1d',test:'1(d)',group:'Q1',title:'Survival of a population',li:5,sc:'Explain how favourable traits may increase survival and reproduction; describe how natural selection can cause change in populations over time',level:'A / M / E',
  template:'A population of {organism} shows genetic variation in {resistance}. {event}.\nOne sentence of the schedule’s exemplar chain with a key idea blanked (variation → survival → reproduction → inheritance → population change)',
  slots:{organism:POPS.map(s=>s.org).join(', '),event:POPS.map(s=>s.event.toLowerCase()).join('; '),sentence:'2 Achievement, 3 Merit, 2 Excellence sentences'},
  gen(r){const s=P(r,POPS),k=Math.floor(r()*NS.length),st=NS[k],o=st.make(s);
   // Three panels of nine: before (3 resistant), survivors (3 resistant + 1 not), later (8 resistant). Dark = resistant.
   const panel=(x,title,nDark,nLight)=>{const kinds=S(r,[...Array(nDark).fill('dark'),...Array(nLight).fill('light')]);let b=rect(x,8,196,178,2)+text(x+98,32,title,18);
    kinds.forEach((sh,i)=>{b+=draw(s.sprite,x+14+(i%3)*60,44+Math.floor(i/3)*46,s.px,sh);});return b;};
   let b=panel(8,'Before',3,6)+arrow(205,97,226,97)+panel(222,`After the ${s.press}`,3,1)+arrow(419,97,440,97)+panel(436,'Later',8,1);
   b+=fillRect(150,200,14,14,1)+text(170,213,'resistant',16,'start')+fillRect(330,200,14,14,.32)+text(350,213,'not resistant',16,'start');
   return {instruction:`Explain how genetic variation may affect the ${s.pop} population over time. Complete the answer:`,cloze:`A population of ${s.org} shows genetic variation in ${s.res}. ${s.event}.\n${o.cloze}`,answer:o.answer,choices:o.choices,
    visual:{type:'svg',svg:svg(b,`Three panels of a ${s.one} population: before, after the ${s.press}, and later; dark ones are resistant`,'0 0 640 222')},
    explanation:o.explanation,chosen:{organism:s.org,resistance:s.res,event:s.event,sentence:`${st.level} step ${k+1}`}};}});

})();
