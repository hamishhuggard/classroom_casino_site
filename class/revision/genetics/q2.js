/* Question Two: DNA, genes and chromosomes (test pages 5–6). Templates for 2(a) and 2(b). See core.js for the contract. */
(function(){
 const {add,P,S,svg,line,rect,circle,text,ask}=GENETICS_T;

 // ---------- 2(a) the test's zoom diagram: cell → nucleus → chromosome → DNA → gene → nucleotide ----------
 const helix=(cx,y0,y1,amp,turns)=>{const L=[],R=[],n=64;
  for(let i=0;i<=n;i++){const y=y0+(y1-y0)*i/n,t=turns*2*Math.PI*i/n;L.push(`${(cx+amp*Math.sin(t)).toFixed(1)},${y.toFixed(1)}`);R.push(`${(cx-amp*Math.sin(t)).toFixed(1)},${y.toFixed(1)}`);}
  let b=`<polyline points="${L.join(' ')}" fill="none" stroke="currentColor" stroke-width="3"/><polyline points="${R.join(' ')}" fill="none" stroke="currentColor" stroke-width="3"/>`;
  const bases='TAATGCATCGGCTA';
  for(let k=0;k<14;k++){const f=(k+.5)/14,y=y0+(y1-y0)*f,w=Math.abs(amp*Math.sin(turns*2*Math.PI*f));if(w<amp*.5)continue;
   b+=line(cx-w,y,cx+w,y,2);if(w>amp*.75){const a=bases[k],c={A:'T',T:'A',C:'G',G:'C'}[a];b+=text(cx-w+9,y-3,a,12)+text(cx+w-9,y-3,c,12);}}
  return b;};
 // Label boxes as in the test: empty boxes with leader lines; the asked one is a dashed box with ?.
 const LABELS=[
  {w:'cell',x:45,y:284,lead:[110,284,110,226],why:'The whole round structure is the cell.'},
  {w:'nucleus',x:45,y:6,lead:[110,42,110,116],why:'The dark centre of the cell, holding the chromosomes, is the nucleus.'},
  {w:'chromosome',x:270,y:4,lead:[340,40,360,64],why:'The X-shaped structure is a chromosome: tightly packed DNA.'},
  {w:'DNA',x:602,y:6,lead:[602,24,556,40],why:'The twisted ladder (double helix) is DNA.'},
  {w:'gene',x:620,y:124,lead:[594,142,620,142],why:'The bracketed section of DNA is a gene.'},
  {w:'nucleotide',x:688,y:254,lead:[678,272,688,272],bw:108,why:'One unit of DNA (sugar, phosphate and base) is a nucleotide.'}];
 const zoomDiagram=target=>{
  let b=circle(110,150,74,3)+`<circle cx="110" cy="150" r="36" style="fill:currentColor;fill-opacity:.18" stroke="currentColor" stroke-width="3"/>`;
  [[96,138],[118,134],[104,160],[124,158],[110,148]].forEach(([x,y])=>{b+=line(x-5,y-6,x+5,y+6,2)+line(x+5,y-6,x-5,y+6,2);});
  b+=line(130,132,300,52,1.5)+line(130,168,300,248,1.5);   // zoom: nucleus → chromosome
  b+=`<path d="M312 60 Q348 150 312 240" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/><path d="M378 60 Q342 150 378 240" fill="none" stroke="currentColor" stroke-width="16" stroke-linecap="round"/>`+circle(345,150,10,3,'currentColor');
  b+=line(384,70,494,30,1.5)+line(384,110,494,252,1.5);    // zoom: chromosome arm → DNA
  b+=helix(530,30,250,32,2.2);
  b+=`<path d="M574 100 H594 V184 H574" fill="none" stroke="currentColor" stroke-width="3"/>`;   // gene bracket
  b+=circle(530,248,11,2)+`<g stroke-dasharray="5 4">${line(540,252,616,268,1.5)}</g>`+circle(646,272,32,2);
  b+=circle(630,272,6,2)+`<polygon points="646,262 656,269 652,281 640,281 636,269" style="fill:none" stroke="currentColor" stroke-width="2"/>`+rect(658,264,12,12,2);
  for(const L of LABELS){const bw=L.bw||122;b+=line(...L.lead,2);b+=L.w===target?ask(L.x,L.y,bw,36,24):rect(L.x,L.y,bw,36,2);}
  return svg(b,'How genetic information is organised inside a cell: cell, nucleus, chromosome, DNA, gene and nucleotide, with one label box marked ?','0 0 800 330');};
 const CTX2A=[
  {k:'kākāpō',s:'Scientists working with New Zealand’s kākāpō use DNA information to help manage breeding programmes.'},
  {k:'takahē',s:'Conservation scientists use DNA to plan the takahē breeding programme.'},
  {k:'sheep',s:'A sheep farmer uses DNA tests to help choose rams for breeding.'},
  {k:'pea plants',s:'Plant scientists study the DNA inside pea plant cells.'}];
 add({id:'2a',test:'2(a)',group:'Q2',title:'Identifying genetic structures',li:3,sc:'Define DNA, gene and chromosome; identify where DNA is found in cells',level:'A',
  template:'{context}\nThe diagram shows how genetic information is organised inside a cell.\nThe box marked ? is ____  (nucleotide, DNA, gene, nucleus, cell, chromosome)',
  slots:{context:CTX2A.map(c=>c.k).join(', '),label:LABELS.map(l=>l.w).join(', ')},
  gen(r){const c=P(r,CTX2A),L=P(r,LABELS);
   return {instruction:'Fill in the missing label:',cloze:`${c.s}\nThe box marked ? is ____`,answer:L.w,choices:LABELS.map(l=>l.w),
    visual:{type:'svg',svg:zoomDiagram(L.w)},explanation:L.why,chosen:{context:c.k,label:L.w}};}});

 // ---------- 2(b) the schedule's exemplar chain, one sentence per draw ----------
 const YOUNG=[
  {k:'kākāpō chick',t:'feather colour and body size',m:'mother',f:'father'},
  {k:'takahē chick',t:'feather colour and body size',m:'mother',f:'father'},
  {k:'lamb',t:'wool colour and body size',m:'ewe',f:'ram'},
  {k:'foal',t:'coat colour and height',m:'mare',f:'stallion'}];
 // level: the schedule's A/M/E step the sentence evidences. hide: which diagram label would give the answer away.
 const CHAIN=[
  {lv:'A',sc:'Define DNA',s:'DNA carries genetic ____',a:'information',w:['energy','food','oxygen'],why:'DNA carries the genetic information (instructions) for traits.'},
  {lv:'M',sc:'Explain that DNA is packaged into chromosomes',s:'Chromosomes are made of tightly packed ____',a:'DNA',w:['alleles','cells','proteins only'],hide:'DNA',why:'A chromosome is a long DNA molecule packed tightly.'},
  {lv:'A',sc:'Explain that genes are sections of DNA',s:'Genes are sections of ____ carried on chromosomes',a:'DNA',w:['cells','nuclei','alleles'],hide:'DNA',why:'A gene is a section of DNA; chromosomes carry many genes.'},
  {lv:'M',sc:'Define allele',s:'Alleles are different versions of the same ____',a:'gene',w:['chromosome','cell','species'],hide:'gene',why:'Alleles are versions of one gene, e.g. B and b.'},
  {lv:'M',sc:'Define allele',s:'Alleles of a gene are found in the same ____ on matching chromosomes',a:'position',w:['cell','nucleus','species'],why:'Matching chromosomes carry the same gene at the same position.'},
  {lv:'E',sc:'Explain that offspring inherit alleles from both parents',s:'The {young} inherits one chromosome of each pair from ____',a:'each parent',w:['its mother only','its father only','either parent'],hide:'parents',why:'One chromosome of each matching pair comes from each parent.'},
  {lv:'E',sc:'Distinguish between genotype and phenotype',s:'The combination of inherited alleles influences the {young}’s ____',a:'phenotype',w:['environment','number of chromosomes'],hide:'phenotype',why:'The alleles inherited (genotype) influence the traits shown (phenotype).'},
  {lv:'E',sc:'Explain that offspring inherit alleles from both parents',s:'So the {young} gets a new combination of ____ from its parents',a:'alleles',w:['cells','species','nuclei'],why:'It gets a new combination of alleles from two parents.'}];
 const pairDiagram=(y,c,hide)=>{
  const [A,a]=P(y,[['B','b'],['F','f'],['S','s'],['T','t']]);
  let b='';
  [[110,A,c.m],[220,a,c.f]].forEach(([x,al,par])=>{b+=rect(x-17,30,34,190,3)+`<rect x="${x-17}" y="104" width="34" height="22" style="fill:currentColor"/>`+text(x+(x<150?-30:30),122,al,28,x<150?'end':'start')+text(x,254,hide==='parents'?'from ?':'from '+par,22);});
  b+=text(165,20,'matching pair',22);
  const items=['chromosome','DNA','gene','allele','phenotype'];
  items.forEach((w,i)=>{const yy=14+i*48;if(w===hide)b+=ask(410,yy,180,36,24);else b+=rect(410,yy,180,36,2)+text(500,yy+26,w,22);if(i<items.length-1)b+=`${line(500,yy+34,500,yy+46,2)}`;});
  return svg(b,'A matching pair of chromosomes, one from each parent, with alleles at the same position; and the chain chromosome, DNA, gene, allele, phenotype','0 0 640 262');};
 add({id:'2b',test:'2(b)',group:'Q2',title:'Inheritance of traits (explain)',li:3,sc:'Explain that genes are sections of DNA; Explain that DNA is packaged into chromosomes; Explain that offspring inherit alleles from both parents',level:'A/M/E',
  template:'A {young} inherits traits such as {traits}.\n{one sentence of the schedule’s exemplar chain, with a key word blank}',
  slots:{young:YOUNG.map(c=>c.k).join(', '),sentence:CHAIN.map(c=>`${c.lv}: ${c.s.replace('{young}','…')}`).join(' | ')},
  gen(r){const c=P(r,YOUNG),q=P(r,CHAIN),s=q.s.replace('{young}',c.k);
   return {instruction:'Complete the explanation:',cloze:`A ${c.k} inherits traits such as ${c.t}.\n${s}`,answer:q.a,choices:S(r,[q.a,...q.w]),
    visual:{type:'svg',svg:pairDiagram(r,c,q.hide)},explanation:q.why,chosen:{young:c.k,sentence:q.s.replace('{young}','…'),level:q.lv}};}});

 // 2(a) as a table: Structure | Description, one cell missing. Descriptions follow the assessment schedule's wording.
 const STRUCT=[['cell','The basic unit of a living thing'],['nucleus','The part of the cell that holds the chromosomes'],['chromosome','A structure made of tightly packed DNA'],
  ['DNA','The molecule that carries genetic information'],['gene','A section of DNA with instructions for a trait'],['nucleotide','The building block (unit) of DNA']];
 add({id:'2a-t',test:'2(a)',group:'Q2',title:'Identifying genetic structures: table',li:3,sc:'Define DNA, gene and chromosome; identify where DNA is found in cells',level:'A',
  template:'Structure | Description table, all six structures (rows shuffled): fill in every structure from the word bank, each marked at once.',
  slots:{structures:STRUCT.map(x=>x[0]).join(', ')},
  gen(r){const rows=S(r,STRUCT),bank=S(r,STRUCT.map(x=>x[0]));
   return {instruction:'Complete the table:',cloze:'Fill in the table = ____',answer:rows.map(x=>x[0]).join(' | '),cells:rows.map(x=>({answer:x[0],options:bank})),
    visual:{type:'gtable',headers:['Structure','Description'],rows:rows.map((x,i)=>[{cell:i,label:'structure'},x[1]]),svg:zoomDiagram(null)},
    explanation:rows.map(x=>`${x[0]}: ${x[1].toLowerCase()}`).join('; ')+'.',chosen:{'row order':rows.map(x=>x[0]).join(', ')}};}});
})();
