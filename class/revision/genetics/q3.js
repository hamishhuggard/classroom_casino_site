/* Question Three: Inheritance (test pages 7–9). Templates for 3(a)(i), 3(a)(ii), 3(a)(iii–iv), 3(b), 3(c). See core.js for the contract. */
(function(){
 const {add,P,S,svg,line,rect,text,arrow,ask,sprite,punnett,table,CROSSES,G,crossLine,cells,pics}=GENETICS_T;
 const ORG=CROSSES.map(c=>c.org).join(', ');
 const PAIRS=CROSSES.map(c=>c.dom+' / '+c.rec+' '+c.trait).join('; ');
 const pct=p=>p===75?['3/4','75','0.75','3 in 4','75 %']:p===25?['1/4','25','0.25','1 in 4','25 %']:['1/2','50','0.5','half','1 in 2','50 %'];
 // "calf with black coat", "lamb with white wool", "seedling with purple flowers"
 const withPh=(c,dom)=>`${c.young} with ${dom?c.domPh:c.recPh}`;
 const withPhs=(c,dom)=>`${c.youngs} with ${dom?c.domPh:c.recPh}`;

 // 3(a)(i) Genotypes and phenotypes: the test's table with one cell missing.
 add({id:'3a-i',test:'3(a)(i)',group:'Q3',title:'Genotypes and phenotypes: table',li:4,sc:'Define homozygous; define heterozygous; distinguish between genotype and phenotype',level:'A',
  template:'In {organism}, the allele for {dominant} (L) is dominant to the allele for {recessive} (l).\nThe test’s Description | Genotype | Phenotype table: fill in all six cells (genotypes typed, phenotypes chosen), each marked at once.',
  slots:{organism:ORG,'dominant / recessive':PAIRS},
  gen(r){const c=P(r,CROSSES),g=G(c),D=[['Homozygous dominant',g.HD,c.dom],['Heterozygous',g.HET,c.dom],['Homozygous recessive',g.HR,c.rec]];
   const cellsSpec=D.flatMap(([,gt,ph])=>[{answer:gt,caseSensitive:true,...(gt[0]!==gt[1]?{aliases:[gt[1]+gt[0]]}:{})},{answer:ph,options:[c.dom,c.rec]}]);
   return {instruction:'Complete the table:',cloze:`${crossLine(c)}.\nFill in the table = ____`,answer:cellsSpec.map(x=>x.answer).join(' | '),cells:cellsSpec,
    visual:{type:'gtable',headers:['Description','Genotype','Phenotype'],rows:D.map(([d],i)=>[d,{cell:2*i,label:d+' genotype'},{cell:2*i+1,label:d+' phenotype'}]),svg:pics.key(c)},
    explanation:`${g.HD} and ${g.HET} have a dominant allele, so ${c.dom}; ${g.HR} has no dominant allele, so ${c.rec}.`,
    chosen:{organism:c.org,dominant:c.dom+' '+c.trait,recessive:c.rec+' '+c.trait}};}});

 // 3(a)(ii) Complete the Punnett square: heterozygous × heterozygous, one offspring cell asked for.
 add({id:'3a-ii',test:'3(a)(ii)',group:'Q3',title:'Predicting offspring: Punnett square',li:4,sc:'Construct simple Punnett squares',level:'A',
  template:'In {organism}, the allele for {dominant} (L) is dominant to the allele for {recessive} (l).\nA heterozygous {male} is crossed with a heterozygous {female}.\nMissing genotype = ____',
  slots:{organism:CROSSES.map(c=>c.org).join(', '),'dominant / recessive':CROSSES.map(c=>c.dom+' / '+c.rec+' '+c.trait).join('; '),cell:'any of the four offspring cells'},
  gen(r){const c=P(r,CROSSES),g=G(c),top=[c.L,c.l],side=[c.L,c.l],k=cells(top,side),hide=Math.floor(r()*4);
   const body=sprite(c.sprite,40,70,6,c.shadeDom)+text(88,165,c.male,20)+sprite(c.sprite,500,70,6,c.shadeDom)+text(548,165,c.female,20)+text(88,190,g.HET,24)+text(548,190,g.HET,24)+punnett({top,side,cells:k,hide,x:262,y:62,c:86});
   return {instruction:'Complete the Punnett square:',cloze:`${crossLine(c)}.\nA heterozygous ${c.male} × a heterozygous ${c.female}\nMissing genotype = ____`,answer:k[hide],caseSensitive:true,
    aliases:k[hide][0]!==k[hide][1]?[k[hide][1]+k[hide][0]]:[],
    visual:{type:'svg',svg:svg(body,`Punnett square for ${g.HET} × ${g.HET} with one offspring genotype missing`,'0 0 640 250')},
    explanation:`Take the allele from the top of its column and the side of its row: ${k[hide]}.`,
    chosen:{organism:c.org,dominant:c.dom+' '+c.trait,recessive:c.rec+' '+c.trait,male:c.male,female:c.female,cell:['top left','top right','bottom left','bottom right'][hide]}};}});

 // 3(a)(iii–iv) State the probability, read off the completed Punnett square.
 add({id:'3a-iii',test:'3(a)(iii–iv)',group:'Q3',title:'Predicting offspring: probability',li:4,sc:'Construct simple Punnett squares',level:'M',
  template:'In {organism}, the allele for {dominant} (L) is dominant to the allele for {recessive} (l).\nA heterozygous {male} × a heterozygous {female}\nProbability of a {young} with {dominant|recessive phenotype} = ____',
  slots:{organism:ORG,'dominant / recessive':PAIRS,asked:'dominant phenotype (75%) or recessive phenotype (25%)'},
  gen(r){const c=P(r,CROSSES),g=G(c),top=[c.L,c.l],side=[c.L,c.l],k=cells(top,side),dom=r()<.5,p=dom?75:25;
   const body=sprite(c.sprite,40,70,6,c.shadeDom)+text(88,165,c.male,20)+text(88,190,g.HET,24)+sprite(c.sprite,500,70,6,c.shadeDom)+text(548,165,c.female,20)+text(548,190,g.HET,24)+punnett({top,side,cells:k,x:262,y:62,c:86});
   return {instruction:'State the probability:',cloze:`${crossLine(c)}.\nA heterozygous ${c.male} × a heterozygous ${c.female}\nProbability of a ${withPh(c,dom)} = ____`,answer:p+'%',aliases:pct(p),
    visual:{type:'svg',svg:svg(body,`Completed Punnett square for ${g.HET} × ${g.HET}`,'0 0 640 250')},
    explanation:dom?`${g.HD}, ${g.HET} and ${g.HET} show ${c.domPh}: 3 of 4 boxes = 75%.`:`Only ${g.HR} shows ${c.recPh}: 1 of 4 boxes = 25%.`,
    chosen:{organism:c.org,dominant:c.dom+' '+c.trait,recessive:c.rec+' '+c.trait,asked:dom?'dominant phenotype':'recessive phenotype'}};}});

 // 3(b) Two dominant-phenotype parents, a recessive-phenotype offspring: one sentence of the schedule's exemplar.
 const S3B=[
  {k:'A1',level:'A',f:(c,g)=>({cloze:`A ${withPh(c,false)} has genotype ____`,answer:g.HR,caseSensitive:true,explanation:`Only two recessive alleles, ${g.HR}, give ${c.recPh}.`,hideCell:true,hideParents:false})},
  {k:'M1',level:'M',f:(c,g)=>({cloze:`Both parents have ${c.domPh}, but each parent is ____`,answer:'heterozygous',choices:['heterozygous','homozygous dominant','homozygous recessive'],explanation:`Each parent is ${g.HET}: it shows ${c.dom} but carries ${c.l}.`,hideCell:false,hideParents:true})},
  {k:'M2',level:'M',f:(c,g)=>({cloze:`Each parent carries the recessive allele ____ and can pass it on`,answer:c.l,caseSensitive:true,explanation:`Each ${g.HET} parent carries ${c.l}.`,hideCell:false,hideParents:true})},
  {k:'M3',level:'M',f:(c,g)=>({cloze:`The ${withPh(c,false)} has genotype ${g.HR}, so it inherited ____ ${c.l} allele from each parent`,answer:'one',choices:['one','two','no'],explanation:`${g.HR} needs one ${c.l} from each parent.`,hideCell:false,hideParents:false})},
  {k:'M4',level:'M',f:(c,g)=>({cloze:`The Punnett square shows a ____ chance of a ${withPh(c,false)}`,answer:'25%',aliases:pct(25),explanation:`${g.HR} is 1 of the 4 boxes: 25%.`,hideCell:false,hideParents:false,noHighlight:true})}];
 add({id:'3b',test:'3(b)',group:'Q3',title:'Inheritance of traits: recessive offspring from dominant parents',li:4,sc:'Explain that offspring inherit alleles from both parents',level:'A/M',
  template:'Both parents have {dominant phenotype}, but some offspring have {recessive phenotype}.\nExplain why heterozygous parents can produce a {young} with {recessive phenotype}.\n{one sentence of the exemplar answer, with ____}',
  slots:{organism:ORG,sentence:'A: offspring genotype is ll · M: each parent is heterozygous · M: each parent carries l · M: l came from both parents · M: Punnett square shows 25%'},
  gen(r){const c=P(r,CROSSES),g=G(c),s=P(r,S3B),o=s.f(c,g),top=[c.L,c.l],side=[c.L,c.l],k=cells(top,side);
   let b=sprite(c.sprite,30,30,5,c.shadeDom)+text(70,105,o.hideParents?'?':g.HET,22)+sprite(c.sprite,170,30,5,c.shadeDom)+text(210,105,o.hideParents?'?':g.HET,22)
    +arrow(70,115,110,160)+arrow(210,115,170,160)+sprite(c.sprite,100,170,5,c.shadeRec)+text(140,245,o.hideCell?'?':g.HR,22);
   b+=punnett({top,side,cells:k,hide:o.hideCell?3:-1,x:440,y:60,c:72});
   if(!o.hideCell&&!o.noHighlight)b+=rect(440+72+5,60+72+5,62,62,4);
   return {instruction:'Complete the explanation:',cloze:`Both parents have ${c.domPh}${/s$/.test(c.domPh)?'':'s'}, but one of their ${c.youngs} has ${c.recPh}${/s$/.test(c.recPh)?'':'s'}.\n${o.cloze}`,answer:o.answer,
    ...(o.choices?{choices:o.choices}:{}),...(o.aliases?{aliases:o.aliases}:{}),...(o.caseSensitive?{caseSensitive:true}:{}),
    visual:{type:'svg',svg:svg(b,`Two ${c.dom} parents and a ${c.rec} offspring, with a Punnett square`,'0 0 640 260')},
    explanation:o.explanation,chosen:{organism:c.org,dominant:c.dom+' '+c.trait,recessive:c.rec+' '+c.trait,sentence:s.k+' ('+s.level+')'}};}});

 // 3(c) Pure breeding: offspring evidence vs the farmer's claim that both parents are pure bred.
 const EVID=[{k:'1:1',ns:[4,5,6],d:n=>n,rc:n=>n},{k:'3:1',ns:[2,3],d:n=>3*n,rc:n=>n},{k:'all',ns:[8,10,12],d:n=>n,rc:()=>0}];
 add({id:'3c',test:'3(c)',group:'Q3',title:'Pure breeding: judge the claim from the offspring',li:4,sc:'Define homozygous; use offspring evidence to infer parent genotypes',level:'A/M/E',
  template:'A farmer crosses two {organism} and gets {n dominant} {dominant} and {n recessive} {recessive} {youngs}.\nThe farmer claims both parents are pure bred.\n{one sentence of the reasoning, with ____}',
  slots:{organism:ORG,evidence:'n : n (1:1, Bb × bb) · 3n : n (3:1, Bb × Bb) · all dominant (pure breeding possible)',sentence:'A: pure breeding = homozygous · A: claim incorrect / could be correct · M: recessive offspring got l from each parent · E: a LL parent could not pass on l · E: most likely cross · E: expected percentage'},
  gen(r){const c=P(r,CROSSES),g=G(c),e=P(r,EVID),n=P(r,e.ns),nd=e.d(n),nr=e.rc(n);
   const sent=[
    {k:'A pure breeding',level:'A',cloze:'Pure breeding means ____',answer:'homozygous',choices:['homozygous','heterozygous','dominant'],explanation:'Pure breeding means two identical alleles, e.g. '+g.HD+' or '+g.HR+'.'},
    {k:'A judgement',level:'A',cloze:'The farmer’s claim is ____',answer:nr?'incorrect':'could be correct',choices:['incorrect','could be correct'],explanation:nr?'Both colours appear, so both parents cannot be pure breeding.':`${g.HD} × ${g.HR} or ${g.HD} × ${g.HD} would give all ${c.dom} offspring.`}];
   if(nr){sent.push({k:'M recessive from each parent',level:'M',cloze:`Each ${withPh(c,false)} must inherit ____ from each parent`,answer:c.l,caseSensitive:true,explanation:`${g.HR} needs one ${c.l} from each parent.`},
    {k:'E LL cannot pass on l',level:'E',cloze:`A ${g.HD} parent could not pass on ____`,answer:c.l,caseSensitive:true,explanation:`${g.HD} has only ${c.L} alleles to pass on.`},
    {k:'E most likely cross',level:'E',cloze:'The most likely cross is ____',answer:e.k==='1:1'?`${g.HET} × ${g.HR}`:`${g.HET} × ${g.HET}`,choices:[`${g.HET} × ${g.HR}`,`${g.HD} × ${g.HR}`,`${g.HET} × ${g.HET}`,`${g.HR} × ${g.HR}`],explanation:e.k==='1:1'?`About 1:1 comes from ${g.HET} × ${g.HR}.`:`About 3:1 comes from ${g.HET} × ${g.HET}.`},
    {k:'E expected percentage',level:'E',cloze:`This cross gives about ____ ${withPhs(c,false)}`,answer:e.k==='1:1'?'50%':'25%',aliases:pct(e.k==='1:1'?50:25),explanation:e.k==='1:1'?`${g.HET} × ${g.HR}: 2 of 4 boxes are ${g.HR}.`:`${g.HET} × ${g.HET}: 1 of 4 boxes is ${g.HR}.`});}
   const s=P(r,sent),kids=S(r,[...Array(nd).fill(c.shadeDom),...Array(nr).fill(c.shadeRec)]),per=Math.ceil(kids.length/2);
   let b=text(320,26,'Offspring',22);kids.forEach((sh,i)=>{const row=Math.floor(i/per),col=i%per,x=320-per*45+col*90+13;b+=sprite(c.sprite,x,50+row*100,4,sh);});
   return {instruction:'Using evidence from the offspring:',cloze:`${nr?`${nd} ${c.dom} and ${nr} ${c.rec} ${c.youngs}`:`All ${nd} ${c.youngs} have ${c.domPh}${/s$/.test(c.domPh)?'':'s'}`}.\nThe farmer claims both parents are pure bred.\n${s.cloze}`,answer:s.answer,
    ...(s.choices?{choices:s.choices,keepCase:true}:{}),...(s.aliases?{aliases:s.aliases}:{}),...(s.caseSensitive?{caseSensitive:true}:{}),
    visual:{type:'svg',svg:svg(b,`${nd} ${c.dom} and ${nr} ${c.rec} offspring`,'0 0 640 260')},
    explanation:s.explanation,chosen:{organism:c.org,evidence:`${nd} ${c.dom} : ${nr} ${c.rec} (${e.k})`,sentence:s.k+' ('+s.level+')'}};}});

 // 3(c) as a table: Parents | Offspring genotypes | Phenotype ratio for four crosses, one cell missing.
 add({id:'3c-t',test:'3(c)',group:'Q3',title:'Pure breeding: crosses table',li:4,sc:'Construct simple Punnett squares; use offspring evidence to infer parent genotypes',level:'M',
  template:'In {organism}, the allele for {dominant} (L) is dominant to the allele for {recessive} (l).\nParents | Offspring genotypes | Phenotype ratio for LL × ll, Ll × ll, Ll × Ll, ll × ll (rows shuffled): fill in both answer columns, each cell marked at once.',
  slots:{organism:ORG,'dominant / recessive':PAIRS},
  gen(r){const c=P(r,CROSSES),g=G(c);
   const ALL=S(r,[[`${g.HD} × ${g.HR}`,`all ${g.HET}`,`all ${c.dom}`],[`${g.HET} × ${g.HR}`,`${g.HET} and ${g.HR}`,`1 ${c.dom} : 1 ${c.rec}`],
    [`${g.HET} × ${g.HET}`,`${g.HD}, ${g.HET} and ${g.HR}`,`3 ${c.dom} : 1 ${c.rec}`],[`${g.HR} × ${g.HR}`,`all ${g.HR}`,`all ${c.rec}`]]);
   const go=S(r,ALL.map(x=>x[1])),ro=S(r,ALL.map(x=>x[2]));
   const cellsSpec=ALL.flatMap(x=>[{answer:x[1],options:go},{answer:x[2],options:ro}]);
   return {instruction:'Complete the table:',cloze:`${crossLine(c)}.\nFill in the table = ____`,answer:cellsSpec.map(x=>x.answer).join(' | '),cells:cellsSpec,
    visual:{type:'gtable',headers:['Parents','Offspring genotypes','Phenotype ratio'],rows:ALL.map((x,i)=>[x[0],{cell:2*i,label:'offspring genotypes'},{cell:2*i+1,label:'phenotype ratio'}]),svg:pics.key(c)},
    explanation:'Each parent passes one allele. A pure-breeding (homozygous) parent can pass on only one kind of allele.',
    chosen:{organism:c.org,'row order':ALL.map(x=>x[0]).join(', ')}};}});
})();
