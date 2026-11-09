/* LI 3–5 beyond the test (9 Nov 2026): templates for every success criterion of LI3 (DNA, genes, chromosomes), LI4 (alleles and
   inheritance) and LI5 (mutation, natural selection, selective breeding), as listed in the unit plan.
   Style follows li1.js / li2.js: long-answer SCs are GENETICS_T.explain items with several short contexts, each with its own
   stem and picture, and a bold "Explain…"/"Describe…"/"Compare…" line; definitions are GENETICS_T.vocabTable five-level tables;
   short-answer SCs (identify, state, recognise, construct) are single-blank items with a picture. See core.js for the contract. */
(function(){
 const {add,vocabTable,explain,P,S,pic,pics,punnett,CROSSES,cells,line,text,sprite,fillRect,circle,rect,arrow}=GENETICS_T;
 const {dna,sun,miniBars}=pics;

 // One short-answer item: a single blank, optional choices, and a picture.
 const one=(o)=>add({id:o.id,test:'',group:'Extra',title:o.title,li:o.li,sc:o.sc,level:'A',template:o.title,slots:{},
  gen:r=>{const d=o.gen(r);return {instruction:d.instruction,cloze:d.cloze,answer:d.answer,aliases:d.aliases,choices:d.choices,unitGiven:d.unitGiven,
   visual:{type:'svg',svg:d.svg},explanation:d.explanation,chosen:d.chosen||{}};}});

 // Long-answer item in the LO1/LO2 style: 2–3 contexts, each with a stem line and a picture.
 const long=(o)=>explain({key:o.key,group:'Extra',li:o.li,sc:o.sc,title:o.title,skillName:o.skill,test:'',level:o.level||'M',
  contexts:o.contexts,stem:c=>o.bare?o.ask:`${c.stem}\n${o.ask}`,model:c=>o.model(c),aliases:o.aliases||{},
  pic:c=>c.pic(),ideas:c=>o.ideas(c)});

 // ---------- LI3: DNA, genes, chromosomes ----------
 vocabTable({key:'li3-terms',group:'Extra',li:3,sc:'Define DNA; Define gene; Define chromosome',title:'DNA, gene and chromosome',skillName:'DNA, genes and chromosomes',
  DEF:{DNA:'a chemical that carries genetic instructions, shaped as a double helix',
       gene:'a section of DNA that carries instructions for one trait',
       chromosome:'a long, tightly coiled structure made of DNA that carries many genes'},
  KEYW:{DNA:['double helix','genetic instructions'],gene:['section of DNA','instructions for one trait'],chromosome:['DNA','many genes']},
  IDEAS:{DNA:[/(instruction|information)/,/(chemical|molecule|substance)/],gene:[/dna/,/(trait|characteristic)/],chromosome:[/dna/,/gene/]},
  ALIASES:{DNA:['deoxyribonucleic acid']},pic:()=>pic(dna(150,14,220,22,1.5),'A DNA double helix')});

 one({id:'li3-loc',li:3,sc:'Identify where DNA is found in cells',title:'Where DNA is found',
  gen:r=>({instruction:'Choose the answer:',cloze:'DNA is found in the ____ of a cell.',answer:'nucleus',choices:S(r,['nucleus','cell wall','cell membrane']),
   svg:pic(circle(150,120,90,3)+circle(150,120,34,3,'currentColor')+text(150,122,'nucleus',18)+text(150,230,'a cell',22),'A cell with its nucleus shown in the middle'),explanation:'DNA is found in the nucleus of the cell.'})});

 long({key:'li3-struct',li:3,sc:'Describe the basic structure of DNA',title:'Structure of DNA',skill:'DNA, genes and chromosomes',ask:'Fill in the blanks.',bare:true,
  contexts:[{stem:'',pic:()=>pic(dna(150,12,226,22,1.5),'A DNA double helix')}],
  model:()=>'DNA is a [double helix], made of two [strands] that are joined by pairs of [bases].',
  aliases:{'double helix':['helix'],strands:['strand'],bases:['base']},
  ideas:()=>[/helix|spiral|twist/,/strand|chain/,/base/]});

 // Four blanks in one sentence, filled in any order (Hamish, 10 Nov 2026). Each blank accepts any base (letter or name) that no other
 // blank has taken; a blank keeps its own answer when checked again, so typing and committing agree.
 add({id:'li3-bases',test:'',group:'Extra',title:'The four bases',li:3,sc:'Identify the four bases found in DNA (A, T, C and G)',level:'A',template:'Fill in the blanks: The four bases in DNA are ____, ____, ____ and ____ (any order).',slots:{},
  gen:r=>{const NAMES={A:['adenine'],T:['thymine'],C:['cytosine'],G:['guanine']},taken={};
   const base=v=>{const x=String(v||'').trim().toUpperCase();return 'ATCG'.split('').find(l=>x===l||NAMES[l][0].toUpperCase()===x);};
   const cells=[0,1,2,3].map(i=>({answer:'ATCG'[i],check:v=>{const l=base(v);if(!l)return false;if(taken[i]===l)return true;if(Object.keys(taken).some(k=>+k!==i&&taken[k]===l))return false;taken[i]=l;return true;}}));
   const parts=['The four bases in DNA are ',{cell:0,ch:3},', ',{cell:1,ch:3},', ',{cell:2,ch:3},' and ',{cell:3,ch:3},'.'];
   return {instruction:'Fill in the blanks:',cloze:'Answer = ____',answer:'A T C G',cells,visual:{type:'gpara',stem:'',parts,svg:pic(text(150,120,'A  T  C  G',40),'The four bases of DNA: A, T, C and G')},
    explanation:'The four bases in DNA are adenine (A), thymine (T), cytosine (C) and guanine (G), in any order.',chosen:{}};}});

 long({key:'li3-genes-dna',li:3,sc:'Explain that genes are sections of DNA',title:'Genes and DNA',skill:'DNA, genes and chromosomes',ask:'Explain how a gene is related to DNA.',
  contexts:[
   {stem:'A student says a gene is “a thing inside the cell that gives you your eye colour”.',pic:()=>pic(dna(150,12,226,22,1.5),'A DNA double helix')},
   {stem:'Students compare a gene on a chromosome with the rest of the DNA.',pic:()=>pic(dna(90,12,226,16,1.5)+rect(60,70,70,50,2,'stroke-dasharray="5 4"')+text(150,100,'gene',20,'start'),'A DNA strand with one section marked as a gene')},
   {stem:'A teacher asks why two sisters can have the same eye colour.',pic:()=>pic(dna(150,12,226,22,1.5),'A DNA double helix')}],
  model:()=>'A gene is a [section] of [DNA] that carries [instructions] for one [trait].',
  aliases:{section:['part','sections'],DNA:['dna'],instructions:['instruction'],trait:['traits']},
  ideas:()=>[/section|part|piece/,/dna/,/instruction|information|code/]});

 long({key:'li3-mut-dna',li:3,sc:'Explain that mutations are changes in DNA',title:'Mutations',skill:'DNA, genes and chromosomes',ask:'Explain what a mutation is.',
  contexts:[
   {stem:'A student notices a new trait appears in a litter of puppies that neither parent has.',pic:()=>pic(dna(150,12,226,18,1.5)+text(150,240,'DNA',18),'DNA with one base changed')},
   {stem:'Students learn that some bacteria become resistant to an antibiotic.',pic:()=>pic(dna(150,12,226,18,1.5)+text(150,240,'DNA',18),'DNA with one base changed')},
   {stem:'A teacher explains why a gene can have more than one version.',pic:()=>pic(dna(150,12,226,18,1.5)+text(150,240,'DNA',18),'DNA with one base changed')}],
  model:()=>'A mutation is a [change] in the [DNA] of an [organism].',
  aliases:{change:['changes'],DNA:['dna'],organism:['cell','individual']},
  ideas:()=>[/change|alter/,/dna|gene/]});

 long({key:'li3-pack',li:3,sc:'Explain that DNA is packaged into chromosomes',title:'DNA and chromosomes',skill:'DNA, genes and chromosomes',ask:'Explain how DNA is organised inside a cell.',
  contexts:[
   {stem:'A student asks why a cell’s DNA does not look like a long string.',pic:()=>pic(dna(150,12,226,22,1.5),'A DNA double helix')},
   {stem:'Students look at a diagram of a cell nucleus with chromosomes.',pic:()=>pic(circle(150,120,90,3)+circle(150,120,34,3,'currentColor')+text(150,122,'nucleus',18)+text(150,230,'chromosomes',18),'A nucleus with chromosomes')},
   {stem:'A teacher asks how a cell fits two metres of DNA into its nucleus.',pic:()=>pic(dna(150,12,226,22,1.5),'A DNA double helix')}],
  model:()=>'DNA is [coiled] tightly and [packaged] into [chromosomes] in the [nucleus] of a cell.',
  aliases:{coiled:['wound','coiled up'],packaged:['packed'],chromosomes:['chromosome'],nucleus:['nuclei']},
  ideas:()=>[/coil|wound|fold|tight/,/chromosome/,/nucleus|cell/]});

 long({key:'li3-rel',li:3,sc:'Describe the relationship between DNA, genes, and chromosomes; Use diagrams/models to explain genetic relationships',title:'DNA, genes and chromosomes',skill:'DNA, genes and chromosomes',ask:'Describe the relationship between DNA, genes and chromosomes.',
  contexts:[
   {stem:'A student draws a nested diagram: a cell, a nucleus, a chromosome and a gene.',pic:()=>pic(dna(70,12,226,16,1.5)+text(70,240,'DNA',18)+line(180,40,260,40,3)+line(180,70,260,70,3)+text(220,30,'chromosome',18)+text(220,120,'genes',18),'A model: DNA packaged into a chromosome that carries genes')},
   {stem:'Students use a bead string model to show DNA, genes and chromosomes.',pic:()=>pic(dna(70,12,226,16,1.5)+text(70,240,'DNA',18)+line(180,40,260,40,3)+text(220,30,'chromosome',18),'A model: DNA packaged into a chromosome')},
   {stem:'A teacher asks how one chromosome can control many traits.',pic:()=>pic(dna(70,12,226,16,1.5)+text(70,240,'DNA',18)+line(180,40,260,40,3)+line(180,70,260,70,3)+line(180,100,260,100,3)+text(220,30,'chromosome',18),'A chromosome carrying several genes')}],
  model:()=>'[DNA] is packaged into [chromosomes]; a [chromosome] carries many [genes], and each [gene] is a section of DNA.',
  aliases:{DNA:['dna'],chromosomes:['chromosome'],genes:['gene'],gene:['genes']},
  ideas:()=>[/dna/,/chromosome/,/gene/,/section|part|piece|many/]});

 long({key:'li3-instr',li:3,sc:'Explain that genes carry instructions for traits; Recognise that proteins help determine characteristics (light only)',title:'Genes and traits',skill:'DNA, genes and chromosomes',ask:'Explain how genes influence a trait.',
  contexts:[
   {stem:'A class is discussing why students have different hair colours.',pic:()=>pic(dna(90,14,220,16,1.5)+text(90,236,'gene',18)+arrow(140,120,190,120,3,10)+text(230,126,'protein',20)+text(230,160,'trait',20),'A gene leads to a protein, which helps determine a trait')},
   {stem:'Students learn that a cow’s coat colour is controlled by genes.',pic:()=>pic(dna(90,14,220,16,1.5)+text(90,236,'gene',18)+arrow(140,120,190,120,3,10)+text(230,126,'protein',20)+text(230,160,'trait',20),'A gene leads to a protein, which helps determine a trait')},
   {stem:'A teacher asks why a gene matters even when it cannot be seen.',pic:()=>pic(dna(90,14,220,16,1.5)+text(90,236,'gene',18)+arrow(140,120,190,120,3,10)+text(230,126,'protein',20)+text(230,160,'trait',20),'A gene leads to a protein, which helps determine a trait')}],
  model:()=>'A gene carries [instructions] that tell the cell to make a [protein], and the protein helps determine a [trait].',
  aliases:{instructions:['instruction'],protein:['proteins'],trait:['traits','characteristic']},
  ideas:()=>[/instruction|information|code/,/protein/,/trait|characteristic/]});

 one({id:'li3-prot',li:3,sc:'Recognise that proteins help determine characteristics (light only)',title:'Proteins and characteristics',
  gen:r=>({instruction:'Choose the answer:',cloze:'Genes give instructions for making ____, which help determine characteristics.',answer:'proteins',aliases:['protein'],choices:S(r,['carbohydrates','vitamins','proteins']),
   svg:pic(dna(150,14,220,18,1.2),'A gene (DNA) with an arrow to proteins'),explanation:'Genes carry instructions for making proteins, and proteins help determine characteristics.'})});

 // ---------- LI4: alleles and inheritance ----------
 vocabTable({key:'li4-terms',group:'Extra',li:4,sc:'Define allele; Define dominant allele; Define recessive allele; Define genotype; Define phenotype; Define homozygous; Define heterozygous; Define pure breeding',title:'Alleles and inheritance terms',skillName:'Alleles and inheritance',
  DEF:{allele:'a version of a gene',
       'dominant allele':'an allele that shows its trait when at least one copy is present',
       'recessive allele':'an allele that only shows its trait when two copies are present',
       genotype:'the genetic makeup of an organism, such as Bb',
       phenotype:'the observable characteristics of an organism',
       homozygous:'having two identical alleles for a gene',
       heterozygous:'having two different alleles for a gene',
       'pure breeding':'always producing offspring with the same trait when bred with the same type'},
  KEYW:{allele:['version of a gene'],'dominant allele':['shows its trait'],'recessive allele':['only shows its trait'],genotype:['genetic makeup'],phenotype:['observable characteristics'],homozygous:['two identical'],heterozygous:['two different'],'pure breeding':['always producing']},
  IDEAS:{allele:[/gene/],'dominant allele':[/allele/,/(trait|characteristic)/],'recessive allele':[/allele/,/(two|both)/],genotype:[/(genetic|gene)/],phenotype:[/(observable|characteristic|appear|look)/],homozygous:[/(identical|same)/],heterozygous:[/(different|two)/],'pure breeding':[/same/]},
  ALIASES:{'dominant allele':['dominant'],'recessive allele':['recessive'],genotype:['genotypes'],phenotype:['phenotypes']}});

 one({id:'li4-gp',li:4,sc:'Distinguish between genotype and phenotype',title:'Genotype or phenotype',
  gen:r=>{const [item,kind]=P(r,[['Bb','genotype'],['tall plant','phenotype'],['BB','genotype'],['black coat','phenotype']]);return {instruction:'Choose genotype or phenotype:',cloze:`${item} is a ____.`,answer:kind,choices:['genotype','phenotype'],
   svg:pic(text(150,120,'Genotype = genes',26)+text(150,160,'Phenotype = appearance',26),'Genotype is the genes; phenotype is what the organism looks like'),explanation:`${item} is a ${kind}.`};}});

 one({id:'li4-punnett',li:4,sc:'Construct simple Punnett squares',title:'Complete the Punnett square',
  gen:r=>{const c=P(r,CROSSES),L=c.L,l=c.l,top=[L,l],side=[L,l],cs=cells(top,side),hide=Math.floor(r()*4);
   const shown=cs.map((v,k)=>k===hide?null:v);
   return {instruction:'Complete the Punnett square for the box marked ?:',cloze:'Genotype in the box marked ? = ____',answer:cs[hide],aliases:[cs[hide].split('').reverse().join('')],
    svg:pic(punnett({top,side,cells:shown,hide,x:90,y:50,c:80,label:'Punnett'}),'Punnett square with one box to complete'),explanation:`The square shows ${cs.join(', ')}. The box marked ? is ${cs[hide]}.`};}});

 one({id:'li4-ratio',li:4,sc:'Predict genotype and phenotype outcomes using Punnett squares',title:'Predicting phenotype ratio',
  gen:r=>{const c=P(r,CROSSES),L=c.L,l=c.l;return {instruction:'Use a Punnett square for a cross of two heterozygous parents:',cloze:`In a ${L}${l} × ${L}${l} cross, ____ of 4 offspring show the dominant phenotype.`,answer:'3',choices:['1','2','3','4'],
   svg:pic(punnett({top:[L,l],side:[L,l],cells:cells([L,l],[L,l]),x:90,y:50,c:80,label:'Punnett'}),'Punnett square for a heterozygous cross'),explanation:`${L}${l} × ${L}${l} gives 1 ${L}${L}, 2 ${L}${l} and 1 ${l}${l}, so 3 of 4 show the dominant phenotype.`};}});

 one({id:'li4-sex',li:4,sc:'Use Punnett squares to predict inheritance outcomes, including biological sex determination',title:'Sex determination',
  gen:r=>({instruction:'Use the Punnett square for the sex chromosomes:',cloze:'The chance a child is male is ____ %.',unitGiven:true,answer:'50',choices:['25','50','75','100'],
   svg:pic(punnett({top:['X','X'],side:['X','Y'],cells:['XX','XY','XX','XY'],x:90,y:50,c:80,label:'sex'}),'Punnett square: mother XX, father XY'),explanation:'Half of the offspring get a Y chromosome from the father, so half are male (XY).'})});

 long({key:'li4-inherit',li:4,sc:'Explain that offspring inherit alleles from both parents',title:'Inheriting alleles',skill:'Alleles and inheritance',ask:'Explain how an offspring gets its alleles.',
  contexts:[
   {stem:'A calf has the same coat colour as its mother, but its father also has a different allele.',pic:()=>pic(sprite('cow',20,40,6,'dim')+text(90,200,'mother',20)+sprite('cow',170,40,6,'bright')+text(240,200,'father',20)+arrow(120,170,140,130,2,8)+arrow(200,170,180,130,2,8),'A calf inherits alleles from both parents')},
   {stem:'Students are told that a child has blood group O, but neither parent has blood group O.',pic:()=>pic(text(90,50,'parent 1',20)+text(210,50,'parent 2',20)+arrow(90,70,140,120,2,8)+arrow(210,70,160,120,2,8)+circle(150,150,22,3)+text(150,156,'child',18),'Two parents each give one allele to the child')},
   {stem:'A seed from a pea plant is grown, and its flower colour is different from both parent plants.',pic:()=>pic(sprite('pea',40,40,6,'dim')+sprite('pea',180,40,6,'bright')+arrow(110,150,150,190,2,8)+arrow(230,150,190,190,2,8)+sprite('pea',120,170,4,'dim'),'A seedling inherits one allele from each parent')}],
  model:()=>'An offspring inherits [one] allele for each gene from each [parent], so it has [two] alleles for each gene.',
  aliases:{one:['an'],parent:['parents'],two:['2']},
  ideas:()=>[/one|1|a single|an allele/,/parent/,/two|2|both/]});

 long({key:'li4-pure',li:4,sc:'Describe pure breeding using a punnet square',title:'Pure breeding',skill:'Alleles and inheritance',ask:'Describe pure breeding using a Punnett square.',
  contexts:[
   {stem:'A farmer wants all of her cattle to have black coats.',pic:()=>pic(punnett({top:['B','B'],side:['B','B'],cells:['BB','BB','BB','BB'],x:90,y:50,c:80,label:'pure'}),'Punnett square: BB crossed with BB, every box BB')},
   {stem:'A plant breeder crosses two white-flowered pea plants that both have the genotype pp.',pic:()=>pic(punnett({top:['p','p'],side:['p','p'],cells:['pp','pp','pp','pp'],x:90,y:50,c:80,label:'pure'}),'Punnett square: pp crossed with pp, every box pp')},
   {stem:'Students cross two guinea pigs with black fur, both with the genotype BB.',pic:()=>pic(punnett({top:['B','B'],side:['B','B'],cells:['BB','BB','BB','BB'],x:90,y:50,c:80,label:'pure'}),'Punnett square: BB crossed with BB, every box BB')}],
  model:()=>'A [pure breeding] [homozygous] parent crossed with another gives a Punnett square where every box has the [same] genotype, so all the [offspring] show the same trait.',
  aliases:{'pure breeding':['pure-breeding'],homozygous:['same alleles'],same:['identical'],offspring:['young']},
  ideas:()=>[/pure/,/homozygous|same|identical/,/offspring|all/]});

 long({key:'li4-vocab',li:4,sc:'Use biological vocabulary to explain inheritance',title:'Explaining inheritance',skill:'Alleles and inheritance',ask:'Explain why the individual shows the dominant phenotype.',
  contexts:[
   {stem:'A pea plant with genotype Bb has purple flowers. Purple is the dominant phenotype.',pic:()=>pic(sprite('pea',60,40,6,'dim')+text(150,220,'Bb: purple',22),'A pea plant with genotype Bb')},
   {stem:'A calf with genotype Bb has a black coat. Black is dominant to white.',pic:()=>pic(sprite('cow',60,40,6,'dim')+text(150,220,'Bb: black',22),'A calf with genotype Bb')},
   {stem:'A guinea pig with genotype Ww has white fur. White is dominant to black.',pic:()=>pic(sprite('guineapig',60,40,6,'bright')+text(150,220,'Ww: white',22),'A guinea pig with genotype Ww')}],
  model:()=>'A [heterozygous] individual has one [dominant] allele, which [shows] its trait, so it shows the [dominant] [phenotype].',
  aliases:{heterozygous:['Bb'],dominant:['dominant allele'],shows:['shows its trait'],phenotype:['phenotypes']},
  ideas:()=>[/heterozygous|two different|one of each/,/dominant/,/phenotype|appear|shows|trait/]});

 // ---------- LI5: mutation, natural selection, selective breeding ----------
 vocabTable({key:'li5-terms',group:'Extra',li:5,sc:'Define mutation; Define natural selection; Define selective breeding',title:'Mutation, natural selection and selective breeding',skillName:'Natural selection and breeding',
  DEF:{mutation:'a change in the DNA of an organism',
       'natural selection':'when organisms with favourable traits survive and reproduce more often than others',
       'selective breeding':'when humans choose parents with desired traits to produce offspring with those traits'},
  KEYW:{mutation:['change in the DNA'],'natural selection':['favourable traits'],'selective breeding':['humans choose']},
  IDEAS:{mutation:[/change/,/dna/],'natural selection':[/surviv|survive/,/reproduc/],'selective breeding':[/human|people|farmer/,/choose|select/]},
  ALIASES:{mutation:['mutations'],'natural selection':['selection'],'selective breeding':['selective']},pic:()=>pic(dna(150,14,220,18,1.2),'DNA')});

 one({id:'li5-var',li:5,sc:'Recognise that mutations are changes in DNA that can create variation',title:'Mutations and variation',
  gen:r=>({instruction:'Choose the answer:',cloze:'A new mutation can create new ____ in a population.',answer:'variation',choices:S(r,['variation','identical offspring','clones']),
   svg:pic(dna(150,14,220,18,1.2),'DNA with a changed base'),explanation:'A mutation changes DNA, which can create new variation.'})});

 long({key:'li5-gamete',li:5,sc:'Explain that mutations occurring in gametes can be inherited by offspring',title:'Mutations in gametes',skill:'Natural selection and breeding',ask:'Explain why a mutation in a gamete can be passed on to offspring.',level:'E',
  contexts:[
   {stem:'A mutation changes the DNA in a sperm cell of a ram.',pic:()=>pic(sprite('sheep',40,60,6,'bright')+text(150,200,'sperm cell',20)+arrow(150,170,150,200,2,8),'A ram with a mutation in a sperm cell')},
   {stem:'A mutation changes the DNA in a skin cell of a kākāpō.',pic:()=>pic(sprite('kakapo',40,60,6,'bright')+text(150,220,'skin cell',20),'A kākāpō with a mutation in a skin cell')},
   {stem:'A mutation changes the DNA in an egg cell of a cow.',pic:()=>pic(sprite('cow',40,60,6,'bright')+text(150,200,'egg cell',20)+arrow(150,170,150,200,2,8),'A cow with a mutation in an egg cell')}],
  model:()=>'A [gamete] (sperm or egg) carries DNA that is [passed] to the [offspring] when they are formed, so a mutation in a gamete is [inherited]; a body cell mutation is not in the gametes.',
  aliases:{gamete:['gametes'],passed:['passed on'],offspring:['young'],inherited:['passed on']},
  ideas:()=>[/gamete|sperm|egg/,/pass|inherit/,/offspring|young/]});

 long({key:'li5-fav',li:5,sc:'Explain how favourable traits may increase survival and reproduction',title:'Favourable traits',skill:'Natural selection and breeding',ask:'Explain how this may help the animal survive and reproduce.',
  contexts:[
   {stem:'Sheep with thicker wool survive a cold winter better than sheep with thin wool.',pic:()=>pic(sprite('sheep',60,60,6,'bright')+text(150,220,'thick wool',20),'A sheep with thick wool')},
   {stem:'Kākāpō with larger wing muscles can escape predators by running and climbing.',pic:()=>pic(sprite('kakapo',60,60,6,'bright')+text(150,220,'strong legs',20),'A kākāpō')},
   {stem:'Guinea pigs with darker fur are harder for predators to see in long grass.',pic:()=>pic(sprite('guineapig',60,60,6,'dim')+text(150,220,'dark fur',20),'A guinea pig with dark fur')}],
  model:()=>'This trait helps the animal [survive] in its environment, so it is more likely to [reproduce] and pass the [allele] for the trait to its offspring.',
  aliases:{survive:['survival','live'],reproduce:['breed'],allele:['alleles','gene']},
  ideas:()=>[/surviv|live/,/reproduc|breed/,/allele|gene|offspring/]});

 long({key:'li5-change',li:5,sc:'Describe how natural selection can cause change in populations over time',title:'Change over time',skill:'Natural selection and breeding',ask:'Describe how natural selection can change this population over time.',
  contexts:[
   {stem:'A flock of sheep in a cold area has a range of wool thickness.',pic:()=>pic(sprite('sheep',20,70,4,'bright')+sprite('sheep',110,70,4,'dim')+sprite('sheep',200,70,4,'bright'),'A flock of sheep with varied wool')},
   {stem:'A population of beetles varies in colour, and birds eat the easiest-to-see beetles.',pic:()=>pic(sprite('pea',20,70,4,'dim')+sprite('pea',110,70,4,'bright')+sprite('pea',200,70,4,'dim'),'A population of varied beetles')},
   {stem:'A population of pea plants varies in height, and drought kills the shortest plants.',pic:()=>pic(sprite('pea',20,70,4,'bright')+sprite('pea',110,70,4,'dim')+sprite('pea',200,70,4,'bright'),'A population of pea plants of varied height')}],
  model:()=>'Individuals with [favourable] traits [survive] and [reproduce] more, so the [allele] for that trait becomes more [common] in the population over many generations.',
  aliases:{favourable:['favorable','useful'],survive:['survival'],allele:['alleles'],common:['frequent']},
  ideas:()=>[/favourable|useful|advantage/,/surviv|reproduc/,/common|frequent|more|increase/]});

 long({key:'li5-compare',li:5,sc:'Compare natural selection and selective breeding',title:'Natural selection and selective breeding',skill:'Natural selection and breeding',ask:'Compare natural selection and selective breeding.',level:'E',
  contexts:[
   {stem:'Students compare how wild sheep and farm sheep became more woolly.',pic:()=>pic(sprite('sheep',20,70,4,'bright')+text(90,210,'wild',20)+sprite('sheep',170,70,4,'bright')+text(240,210,'farm',20),'Wild and farm sheep')},
   {stem:'Students compare how a population of birds changed beak size over generations, and how farmers bred cattle for milk.',pic:()=>pic(sprite('cow',20,70,4,'bright')+text(90,210,'farm',20)+sprite('pea',170,70,4,'bright')+text(240,210,'wild',20),'Farm cattle and wild plants')},
   {stem:'Students compare a drought killing some plants with a farmer keeping only the best plants for seed.',pic:()=>pic(sprite('pea',20,70,4,'dim')+text(90,210,'drought',20)+sprite('pea',170,70,4,'bright')+text(240,210,'farmer',20),'Drought and farmer choice')}],
  model:()=>'Both change the [inherited] traits of a population over time, but in natural selection the [environment] decides which individuals [survive] and [reproduce], while in selective breeding [humans] choose which parents to breed.',
  aliases:{inherited:['genetic'],environment:['environmental conditions'],survive:['survival'],humans:['people','farmers']},
  ideas:()=>[/inherit|genetic|gene/,/environment|nature|surviv/,/human|people|farmer|choose/]});

 long({key:'li5-human',li:5,sc:'Explain how humans can influence inherited traits through selective breeding',title:'Humans and breeding',skill:'Natural selection and breeding',ask:'Explain how farmers can change this trait through selective breeding.',
  contexts:[
   {stem:'A dairy farmer wants cows that produce more milk.',pic:()=>pic(sprite('cow',40,70,6,'bright')+text(150,220,'milk yield',20),'A dairy cow')},
   {stem:'A sheep farmer wants sheep with thicker wool.',pic:()=>pic(sprite('sheep',40,70,6,'bright')+text(150,220,'wool thickness',20),'A sheep with thick wool')},
   {stem:'A grower wants pea plants that are taller.',pic:()=>pic(sprite('pea',40,40,8,'bright')+text(150,220,'plant height',20),'A pea plant')}],
  model:()=>'Farmers choose the [highest] trait [parents] to breed, so the [offspring] are more likely to inherit the [high] trait alleles, and this is repeated over [generations].',
  aliases:{highest:['best','high'],parents:['parent'],offspring:['young'],high:['high milk','good'],generations:['generation']},
  ideas:()=>[/choose|select|breed/,/parent/,/offspring|inherit/]});

 long({key:'li5-adapt',li:5,sc:'Use biological vocabulary to explain adaptation and change',title:'Adaptation',skill:'Natural selection and breeding',ask:'Use biological vocabulary to explain what this adaptation is and how it arose.',level:'E',
  contexts:[
   {stem:'Polar bears have thick fur and a layer of fat that keeps them warm in the Arctic.',pic:()=>pic(sprite('cow',40,70,6,'bright')+text(150,220,'thick fur',20),'An animal with thick fur')},
   {stem:'Cacti have spines instead of leaves, which reduces water loss in the desert.',pic:()=>pic(sprite('pea',40,40,8,'dim')+text(150,220,'spines',20),'A cactus-like plant')},
   {stem:'Kākāpō have a large body and short wings, which suits their life on the ground.',pic:()=>pic(sprite('kakapo',40,60,6,'bright')+text(150,220,'short wings',20),'A kākāpō')}],
  model:()=>'An [adaptation] is an inherited [trait] that helps an organism [survive] in its environment; it arises from [variation] and [natural selection].',
  aliases:{adaptation:['adaptations'],trait:['characteristic'],survive:['survival'],variation:['mutation']},
  ideas:()=>[/adapt/,/inherit|trait|characteristic/,/variation|mutation/,/natural selection|selection/]});
 // The base-pair ladder (extra.js) is the only 3.x item for base pairing: place it just after the four-bases item so the criterion keeps its unit-plan position (3.7).
 {const TT=GENETICS_T.templates;for(const id of ['x-dna-2','x-dna']){const i=TT.findIndex(t=>t.id===id);if(i>=0){const [x]=TT.splice(i,1);TT.splice(TT.findIndex(t=>t.id==='li3-bases')+1,0,x);}}}
})();
