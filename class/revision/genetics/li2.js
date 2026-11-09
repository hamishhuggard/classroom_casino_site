/* LI 1–2 beyond the test (9 Nov 2026): the LI2 definition table and the explain / compare success criteria the test doesn't ask
   directly. Made up to follow the test's conventions (a short context, then a bold "Explain…" or "Compare…") and the schedule's
   marking (A: states the idea; M: explains how or why; E: links ideas in a cause-and-effect chain applied to the context).
   Model answers are concise E-level answers. See core.js for vocabTable and explain. */
(function(){
 const {vocabTable,explain,pic,pics,line,rect,fillRect,circle,text,arrow,sprite}=GENETICS_T;
 const {sun,dna,dumbbell,virus,flake,miniBars}=pics;
 // ---------- pictures (9 Nov 2026) ----------
 // A stick figure standing on footY, h tall; skin 'pale' (bright head) or 'dark' (dim head).
 const stick=(x,footY,h,skin='pale')=>{const hr=h*.13,hy=footY-h+hr;return `<circle cx="${x}" cy="${hy}" r="${hr}" style="fill:currentColor;fill-opacity:${skin==='dark'?.32:1}" stroke="currentColor" stroke-width="3"/>`
  +line(x,hy+hr,x,footY-h*.42)+line(x,footY-h*.42,x-h*.13,footY)+line(x,footY-h*.42,x+h*.13,footY)+line(x-h*.2,hy+hr+h*.12,x+h*.2,hy+hr+h*.12);};
 const apple=(x,y)=>circle(x,y,12,3,'currentColor')+line(x,y-12,x+3,y-22,3)+`<ellipse cx="${x+10}" cy="${y-20}" rx="7" ry="3" style="fill:currentColor"/>`;
 const wave=(x,y,w)=>`<path d="M${x} ${y} q${w/8} -10 ${w/4} 0 t${w/4} 0 t${w/4} 0 t${w/4} 0" fill="none" stroke="currentColor" stroke-width="3"/>`;
 const sameGenes=text(150,234,'same genes',22);
 const ENVPIC={
  nutrition:()=>pic(stick(90,200,120)+stick(210,200,160)+apple(260,60)+line(30,200,270,200,3)+sameGenes,'Identical twins: the twin with the better diet is taller'),
  light:()=>pic(sun(60,34)+sprite('pea',20,92,6,'bright')+fillRect(170,14,110,14,.32)+rect(170,14,110,14,2)+sprite('pea',188,140,4,'dim')+line(10,212,290,212,3)+text(225,52,'shade',21)+sameGenes,
   'Two cuttings from the same plant: the one in the sun is bigger and greener than the one in the shade'),
  exercise:()=>pic(stick(90,200,140)+stick(210,200,140)+dumbbell(250,60)+line(30,200,270,200,3)+sameGenes,'Identical twins: the twin who lifts weights every week has stronger muscles')};
 const SURVPIC={
  disease:()=>pic(virus(60,30)+virus(150,24)+virus(240,32)+['bright','dim','bright','bright','dim'].map((sh,i)=>sprite('kakapo',6+i*58,100,3,sh)).join('')+text(150,190,'variation',21),
   'A population of kākāpō that varies, with a new disease arriving'),
  cold:()=>pic([40,110,190,260,75,225].map((x,i)=>flake(x,22+(i%2)*26)).join('')+['bright','dim','bright','dim','bright'].map((sh,i)=>sprite('sheep',6+i*58,110,3,sh)).join('')+text(150,190,'variation',21),
   'A flock of sheep that varies in wool, with snow falling'),
  drought:()=>{let b=sun(40,34)+line(10,110,290,110,3)+text(220,40,'dry soil',21);
   [[80,40],[140,95],[200,60],[260,115]].forEach(([x,d])=>{b+=line(x-10,110,x-16,80,3)+line(x,110,x,74,3)+line(x+10,110,x+16,80,3)+line(x,110,x,110+d,2)+line(x,110+d*.5,x-12,110+d*.7,2)+line(x,110+d*.5,x+12,110+d*.7,2);});
   return pic(b,'Grass plants with roots of different depths in dry soil');}};
 const CMPENV={height:apple,'body mass':(x,y)=>dumbbell(x,y),'muscle strength':(x,y)=>dumbbell(x,y),'running speed':(x,y)=>dumbbell(x,y)};
 const cmpPic=c=>pic(dna(50,4,78,14,1.2)+text(50,102,'genes',21)+CMPENV[c.trait](236,40)+text(226,102,'environment',21)
  +arrow(64,110,96,134,3,9)+arrow(214,110,190,134,3,9)+miniBars(80,136,140,62,[1,3,6,8,5,2],false,c.trait),`Genes and the environment both influence ${c.trait}, which varies continuously`);
 const genePic=c=>pic(dna(50,14,226,18,2.4)+`<path d="M78 80 H92 V150 H78" fill="none" stroke="currentColor" stroke-width="3"/>`+text(104,120,'gene',18,'start')
  +arrow(150,115,186,115,3,10)+(c.label.startsWith('cattle')?sprite('cow',196,90,5,'dim'):sprite('person',196,86,5,'bright'))+text(196,226,c.trait,21),
  `A gene is a section of DNA; it carries the instructions for ${c.trait}`);

 // ---------- LI2 definition table, five levels, same style as 1(a) ----------
 vocabTable({key:'li2v',group:'LI2',li:2,sc:'Define continuous variation; define discontinuous variation; distinguish between inherited and environmental characteristics',
  title:'LI2 vocabulary',skillName:'Variation vocabulary',
  DEF:{'Continuous variation':'Variation where a characteristic is measured and can take any value in a range',
   'Discontinuous variation':'Variation where a characteristic falls into separate categories, with no values in between',
   'Inherited characteristic':'A characteristic passed from parents to offspring in their genes',
   'Environmental characteristic':'A characteristic caused by an organism’s surroundings, diet or lifestyle'},
  KEYW:{'Continuous variation':['measured','any value'],'Discontinuous variation':['separate categories','no values in between'],'Inherited characteristic':['parents to offspring','in their genes'],'Environmental characteristic':['surroundings','diet','lifestyle']},
  KEYALT:{'any value':['any number','any measurement'],'separate categories':['distinct groups','separate groups','distinct categories','groups','categories'],'no values in between':['no in-between values','no values between','nothing in between'],
   'parents to offspring':['parents to their offspring','parent to offspring','parents to children'],'in their genes':['through genes','in genes','in the genes','by genes','through their genes','in their dna','through dna'],surroundings:['environment','habitat'],lifestyle:['way of life','experiences']},
  ALIASES:{'Continuous variation':['continuous'],'Discontinuous variation':['discontinuous'],'Inherited characteristic':['inherited'],'Environmental characteristic':['environmental']},
  IDEAS:{'Continuous variation':[/range|any value|measur|scale/],
   'Discontinuous variation':[/distinct|group|categor|separate|either/],
   'Inherited characteristic':[/gene|dna|parent|inherit/],
   'Environmental characteristic':[/surround|environment|way of life|lifestyle|experience|diet|injur|learn|acquir|during (its|their|a) life|not (from|by|in) (the |their )?gene/]},pic:pics.variation});

 // ---------- Explain how the environment can influence phenotype ----------
 explain({key:'li2-env',group:'LI2',li:2,sc:'Explain how the environment can influence phenotype',title:'Environment and phenotype',skillName:'Explain: environment and phenotype',
  contexts:[
   {label:'identical twins, height (nutrition)',stem:'Identical twins have the same genes, but the one with a healthier diet is 8 cm taller.',pair:'twins',factor:'nutrition',how:'the taller twin had better [nutrition] while growing'},
   {label:'plant cuttings, sun and shade',stem:'Two cuttings from one plant have the same genes, but the one in full sun grows bigger.',pair:'cuttings',factor:'light',how:'the plant in the sun received more [light]'},
   {label:'identical twins, muscle strength (exercise)',stem:'Identical twins have the same genes, but the twin who lifts weights every week has stronger muscles.',pair:'twins',factor:'exercise',how:'more [exercise] made the weightlifter’s muscles stronger'}],
  stem:c=>`${c.stem}\nExplain how the environment can influence phenotype.`,
  model:c=>`The ${c.pair} have the same [genes], so something else must cause the difference. It is caused by the [environment]: ${c.how}. This shows that an organism’s [phenotype] can change even when its [genotype] is the same.`,
  aliases:{nutrition:['diet','food'],light:['sunlight','sun'],exercise:['training','weights','weight training','lifting','activity'],genes:['dna','genotype']},
  pic:c=>ENVPIC[c.factor](),
  ideas:c=>[/same gene|identical gene|genes are the same|same dna|same genotype|genetically identical/,new RegExp('environment|'+c.factor+'|diet|food|sun|light')]});

 // ---------- Explain why variation is important for survival in populations ----------
 explain({key:'li1-surv',group:'LI2',li:1,sc:'Explain why variation is important for survival in populations',title:'Why variation matters',skillName:'Explain: why variation matters for survival',
  contexts:[
   {pic:'disease',label:'kākāpō, a new disease',stem:'A new disease spreads through a kākāpō population.',change:'a new disease arrives',trait:'resistance to the disease'},
   {pic:'cold',label:'sheep, a very cold winter',stem:'A very cold winter hits a flock of sheep that vary in wool thickness.',change:'a very cold winter',trait:'thicker wool'},
   {pic:'drought',label:'a grass species, a drought',stem:'A long drought hits a grass species whose roots vary in depth.',change:'a drought',trait:'deeper roots'}],
  stem:c=>`${c.stem}\nExplain why variation is important for the population’s survival.`,
  model:c=>`Variation means the individuals in a population have [different] characteristics. When the [environment] changes, for example ${c.change}, some individuals may have a characteristic such as ${c.trait} that helps them [survive]. These survivors are more likely to [reproduce] and pass on the [alleles] for that characteristic, so it becomes more [common] in the population. If every individual were the same, they could all [die].`,
  aliases:{alleles:['genes','allele','gene'],reproduce:['breed'],different:['varied','unique'],environment:['conditions','surroundings'],die:['be wiped out','perish'],survive:['live','cope']},
  pic:c=>SURVPIC[c.pic](),
  ideas:()=>[/variation|differ|not (all )?the same|vary/,/surviv/,/reproduc|offspring|pass (it |the )?on|breed/]});

 // ---------- Compare genetic and environmental influences on traits ----------
 explain({key:'li2-cmp',group:'LI2',li:2,sc:'Compare genetic and environmental influences on traits',title:'Compare genes and environment',skillName:'Compare: genes and environment',
  contexts:[
   {label:'height',trait:'height',gene:'tall people tend to have tall children',env:'a good diet and health while growing'},
   {label:'body mass',trait:'body mass',gene:'some families tend to have a larger body build',env:'diet and how much exercise a person does'},
   {label:'muscle strength',trait:'muscle strength',gene:'some families tend to have strong muscles',env:'weight training builds muscle'},
   {label:'running speed',trait:'running speed',gene:'leg length and muscle type run in families',env:'training makes a runner faster'}],
  stem:c=>`Students in a Year 10 class vary in ${c.trait}.\nCompare how genes and the environment influence ${c.trait}.`,
  model:c=>`${c.trait.charAt(0).toUpperCase()+c.trait.slice(1)} is influenced by both genes and the environment. Genes are inherited from parents and give the [potential] for ${c.trait}: for example, ${c.gene}. The environment changes the characteristic during an organism’s [lifetime]: for example, ${c.env}. Genetic influences can be passed on to offspring, but environmental effects cannot.`,
  aliases:{potential:['instructions','information','code','blueprint'],lifetime:['life','lifespan']},
  pic:cmpPic,
  ideas:()=>[/gene|inherit|dna/,/environment|diet|sun|train|exercise|nutrition|lifestyle/]});

 // ---------- Explain how genes can influence inherited traits ----------
 explain({key:'li2-gene',group:'LI2',li:2,sc:'Explain how genes can influence inherited traits',title:'How genes influence traits',skillName:'Explain: how genes influence traits',
  contexts:[
   {label:'eye colour',trait:'eye colour',plural:'eye colours',who:'A child has the same eye colour as her father.'},
   {label:'blood group',trait:'blood group',plural:'blood groups',who:'A child has the same blood group as his mother.'},
   {label:'cattle coat colour',trait:'coat colour',plural:'coat colours',who:'A black calf is born to a black bull.'},
   {label:'natural hair colour',trait:'natural hair colour',plural:'hair colours',who:'Two sisters have the same natural hair colour as their mother.'}],
  stem:c=>`${c.who}\nExplain how genes influence ${c.trait}.`,
  model:c=>`Genes are sections of [DNA] that carry the [instructions] for ${c.trait}. Offspring inherit half of their genes from each parent, carried in the [sperm] and [egg] cells. Different versions of a gene, called [alleles], give different ${c.plural}, so the genes an organism inherits decide its ${c.trait}. This is why an offspring’s ${c.trait} is often like its parents’.`,
  aliases:{instructions:['information','code','recipe','blueprint'],sperm:['sperm cell','sperm cells'],egg:['egg cell','egg cells','ovum'],alleles:['allele','versions']},
  pic:genePic,
  ideas:()=>[/dna|gene/,/instruction|code|information|recipe/,/parent|inherit/]});
})();
