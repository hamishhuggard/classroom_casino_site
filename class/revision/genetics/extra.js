/* Beyond the test: unit-plan success criteria the Topic Test V3 does not assess, written in the test's genre
   (context + short instruction + diagram). See core.js for the contract. */
(function(){
 const {add,P,S,svg,line,rect,fillRect,circle,text,arrow,ask,sprite,pics}=GENETICS_T;
 const tick=(x,y)=>`<polyline points="${x},${y+8} ${x+7},${y+15} ${x+20},${y}" fill="none" stroke="currentColor" stroke-width="4"/>`;

 // ---------- x-var: class data graphs. Histogram (bars touch) for continuous; bar chart (gaps) for discontinuous ----------
 const DATA=[
  {k:'height',cont:true,cats:['140–149','150–159','160–169','170–179','180–189'],x:'Height (cm)',ctx:'Students in a Year 10 class measured their height.',ph:c=>`with a height of ${c} cm`},
  {k:'hand span',cont:true,cats:['16–17','18–19','20–21','22–23'],x:'Hand span (cm)',ctx:'Students in a Year 10 class measured their hand span.',ph:c=>`with a hand span of ${c} cm`},
  {k:'foot length',cont:true,cats:['20–21','22–23','24–25','26–27'],x:'Foot length (cm)',ctx:'Students in a Year 10 class measured their foot length.',ph:c=>`with a foot length of ${c} cm`},
  {k:'blood group',cont:false,cats:['A','B','AB','O'],x:'Blood group',ctx:'Students in a Year 10 class recorded their blood group.',ph:c=>`with blood group ${c}`},
  {k:'tongue rolling',cont:false,cats:['can roll','cannot roll'],x:'Tongue rolling',ctx:'Students in a Year 10 class tested whether they can roll their tongue.',ph:c=>`who ${c} their tongue`},
  {k:'earlobes',cont:false,cats:['attached','free'],x:'Earlobes',ctx:'Students in a Year 10 class recorded their earlobe type.',ph:c=>`with ${c} earlobes`}];
 const chart=(d,counts)=>{const x0=90,y0=214,W=500,H=180,top=Math.max(...counts)+1,n=d.cats.length,bw=W/n;let b='';
  for(let v=0;v<=top;v++){const y=y0-H*v/top;b+=line(x0,y,x0+W,y,1,'stroke-opacity="0.3"')+(v%2===0?text(x0-10,y+7,String(v),20,'end'):'');}
  d.cats.forEach((c,i)=>{const h=H*counts[i]/top,gap=d.cont?0:bw*.3,x=x0+i*bw+gap/2;b+=fillRect(x,y0-h,bw-gap,h,.25)+rect(x,y0-h,bw-gap,h,3)+text(x0+i*bw+bw/2,y0+26,c,20);});
  b+=line(x0,y0,x0+W+8,y0,3)+line(x0,y0,x0,y0-H-8,3)+text(x0+W/2,y0+56,d.x,22)+text(30,y0-H/2,'Number of students',20,'middle',`transform="rotate(-90 30 ${y0-H/2})"`);
  return svg(b,`${d.cont?'Histogram':'Bar chart'} of class data: ${d.x}`,'0 0 640 284');};
 add({id:'x-var',test:'',group:'Extra',title:'Continuous and discontinuous variation',li:2,sc:'Identify examples of continuous and discontinuous variation; Interpret simple variation data using tables and graphs',level:'A',
  template:'Students in a Year 10 class recorded their {feature}.\nThis is ____ variation  |  Number of students {category} = ____',
  slots:{feature:DATA.map(d=>d.k).join(', '),question:'continuous or discontinuous? | read one bar',counts:'2–9 per bar'},
  gen(r){const d=P(r,DATA),counts=d.cats.map(()=>2+Math.floor(r()*8)),g=chart(d,counts);
   if(r()<.5)return {instruction:'Use the graph to classify the variation:',cloze:`${d.ctx}\nThis is ____ variation`,answer:d.cont?'continuous':'discontinuous',choices:['continuous','discontinuous'],
    visual:{type:'svg',svg:g},explanation:d.cont?`${d.x.replace(/ \(.*/,'')} can take any value in a range, so the histogram bars touch.`:`${d.x} falls into distinct categories, with nothing in between.`,chosen:{feature:d.k,question:'classify'}};
   const i=Math.floor(r()*d.cats.length);
   return {instruction:'Use the graph to complete the statement:',cloze:`${d.ctx}\nNumber of students ${d.ph(d.cats[i])} = ____`,answer:String(counts[i]),
    visual:{type:'svg',svg:g},explanation:`Read across from the top of the ${d.cats[i]} bar: ${counts[i]}.`,chosen:{feature:d.k,question:'read '+d.cats[i]}};}});

 // ---------- x-dna: base pairing on a DNA ladder, one base missing ----------
 const COMP={A:'T',T:'A',C:'G',G:'C'};
 const ORG=['kākāpō','sheep','pea plant','human','takahē'];
 add({id:'x-dna',test:'',group:'Extra',skill:'x-dna',tier:1,title:'DNA base pairs 1: one missing base',li:3,sc:'State that A pairs with T and C pairs with G; Identify the four bases found in DNA (A, T, C and G)',level:'A',
  template:'Missing base = ____',
  slots:{organism:ORG.join(', '),strand:'six random base pairs',missing:'any base on either strand'},
  gen(r){const org=P(r,ORG),left=Array.from({length:6},()=>P(r,'ATCG'.split(''))),right=left.map(b=>COMP[b]),k=Math.floor(r()*6),side=r()<.5?0:1;
   let b=line(200,16,200,248,4)+line(440,16,440,248,4);
   left.forEach((L,i)=>{const y=36+i*38;b+=line(200,y,220,y,3)+line(270,y,370,y,3)+line(420,y,440,y,3);
    [[220,L],[370,right[i]]].forEach(([x,v],s)=>{b+=(i===k&&s===side)?ask(x,y-17,50,34,24):rect(x,y-16,50,32,2)+text(x+25,y+8,v,22);});});
   const ans=side?right[k]:left[k];
   return {instruction:'Complete the DNA base pairs:',cloze:'Missing base = ____',answer:ans,caseSensitive:false,
    visual:{type:'svg',svg:svg(b,'A DNA ladder of six base pairs with one base missing','0 0 640 262')},
    explanation:`A pairs with T and C pairs with G, so the partner of ${side?left[k]:right[k]} is ${ans}.`,chosen:{organism:org,missing:`pair ${k+1}, strand ${side+1}`}};}});

 // Level 2: one whole strand is shown and every base of the other strand is blank (typed, one rung at a time).
 add({id:'x-dna-2',test:'',group:'Extra',skill:'x-dna',tier:2,title:'DNA base pairs 2: a whole strand',li:3,sc:'State that A pairs with T and C pairs with G; Identify the four bases found in DNA (A, T, C and G)',level:'A',
  template:'Complete the DNA base pairs: one strand of six bases is shown; type the partner of each base on the other strand.',
  slots:{strand:'six random bases on one strand',blank:'the whole other strand'},
  gen(r){const left=Array.from({length:6},()=>P(r,'ATCG'.split(''))),right=left.map(b=>COMP[b]),side=r()<.5?0:1,given=side?right:left,blank=side?left:right;
   let b=line(200,16,200,248,4)+line(440,16,440,248,4);
   given.forEach((g,i)=>{const y=36+i*38,xs=side?370:220,xb=side?220:370;b+=line(200,y,220,y,3)+line(270,y,370,y,3)+line(420,y,440,y,3)+rect(xs,y-16,50,32,2)+text(xs+25,y+8,g,22)+rect(xb,y-16,50,32,2);});
   const rows=given.map((g,i)=>side?[{cell:i,label:'base '+(i+1)},g]:[g,{cell:i,label:'base '+(i+1)}]);
   return {instruction:'Complete the DNA base pairs:',cloze:'Other strand = ____',answer:blank.join(' '),caseSensitive:false,
    cells:blank.map(x=>({answer:x,caseSensitive:false})),visual:{type:'gtable',headers:['Strand 1','Strand 2'],rows,svg:svg(b,'A DNA ladder of six base pairs with one strand blank','0 0 640 262')},
    explanation:'A pairs with T and C pairs with G, so the other strand is '+blank.join(', ')+'.',chosen:{strand:side?'strand 1 blank':'strand 2 blank'}};}});

 // ---------- x-mut: body-cell vs gamete mutation; or "a mutation is a change in DNA" ----------
 const WHO=[{w:'a ram',g:'sperm cell'},{w:'a ewe',g:'egg cell'},{w:'a woman',g:'egg cell'},{w:'a man',g:'sperm cell'}];
 const BODY=['skin cell','muscle cell','liver cell'];
 const strandSvg=(x,y,s,m)=>[...s].map((c,i)=>(i===m?rect(x+i*34,y,30,34,5):rect(x+i*34,y,30,34,1.5))+text(x+i*34+15,y+25,c,20)).join('');
 const mutStrand=r=>{const s=Array.from({length:6},()=>P(r,'ATCG'.split(''))),m=1+Math.floor(r()*4),after=s.slice();after[m]=P(r,'ATCG'.split('').filter(x=>x!==s[m]));return {before:s.join(''),after:after.join(''),m};};
 add({id:'x-mut',test:'',group:'Extra',title:'Mutation',li:5,sc:'Explain that mutations occurring in gametes can be inherited by offspring; Explain that mutations are changes in DNA',level:'A',
  template:'{who} has a mutation in a {body cell} and a mutation in a {gamete}.\nThe mutation that can be passed to offspring is in the ____  |  A mutation is a change in ____',
  slots:{who:WHO.map(w=>w.w).join(', '),'body cell':BODY.join(', '),gamete:'egg cell, sperm cell',question:'which is inherited | what a mutation is'},
  gen(r){const W=P(r,WHO),body=P(r,BODY);
   if(r()<.6){const order=S(r,[body,W.g]);let b='';
    order.forEach((cell,k)=>{const x=30+k*310,m=mutStrand(r);b+=rect(x,10,270,236,2)+text(x+135,42,cell,22)+circle(x+135,108,46,3)+circle(x+135,108,14,2)+strandSvg(x+33,170,m.after,m.m)+text(x+135,234,'mutated base boxed',18);});
    return {instruction:'Use the diagram to complete the statement:',cloze:`${W.w[0].toUpperCase()+W.w.slice(1)} has a mutation in a ${body} and in a ${W.g}.\nThe mutation that can be passed to offspring is in the ____`,answer:W.g,choices:[body,W.g],
     visual:{type:'svg',svg:svg(b,`Two cells, a ${order[0]} and a ${order[1]}, each with a mutated base boxed`,'0 0 640 256')},
     explanation:`Only gametes (egg and sperm cells) pass DNA to offspring, so only the ${W.g} mutation can be inherited.`,chosen:{who:W.w,'body cell':body,gamete:W.g,question:'which is inherited'}};}
   const m=mutStrand(r);
   const b=text(110,72,'before',22,'end')+strandSvg(130,46,m.before,-1)+text(110,172,'after',22,'end')+strandSvg(130,146,m.after,m.m)+arrow(232,90,232,138,3);
   return {instruction:'Compare the DNA before and after:',cloze:`A section of DNA from ${W.w} changed.\nA mutation is a change in ____`,answer:'DNA',choices:['DNA','proteins','the environment'],
    visual:{type:'svg',svg:svg(b,'A DNA sequence before and after a mutation, with the changed base boxed','0 0 640 256')},
    explanation:'A mutation is a change in the DNA (here, one base changed).',chosen:{who:W.w,question:'what a mutation is'}};}});

 // ---------- x-sel: selective breeding with a NZ farmer or grower ----------
 const FARM=[
  {k:'dairy cows',who:'A Waikato dairy farmer',chooser:'the farmer',want:'cows that produce more milk',sp:'cow',unit:'L',vals:[18,20,21,22,24,25,26,28,30],what:'milk per day'},
  {k:'sheep',who:'A Canterbury sheep farmer',chooser:'the farmer',want:'sheep that grow more wool',sp:'sheep',unit:'kg',vals:[3,4,5,6,7,8,9],what:'wool per year'},
  {k:'kiwifruit vines',who:'A Bay of Plenty kiwifruit grower',chooser:'the grower',want:'vines with bigger fruit',sp:null,unit:'g',vals:[80,85,90,95,100,110,115,120,130],what:'fruit mass'}];
 const ind=(f,x,y,v)=>f.sp?sprite(f.sp,x,y,4,'dark'):circle(x+32,y+20,8+(v-80)/4,3)+line(x+32,y+20-(8+(v-80)/4),x+36,y+4,2);
 const LET='ABCDE';
 add({id:'x-sel',test:'',group:'Extra',title:'Selective breeding',li:5,sc:'Compare natural selection and selective breeding; Explain how humans can influence inherited traits through selective breeding',level:'A',
  template:'{farmer} wants {goal}.\nThis is ____  |  The parents are chosen by ____  |  The best parents to breed from are ____',
  slots:{farmer:FARM.map(f=>f.k).join(', '),values:'five individuals A–E with different values',question:'name the process | who chooses | pick the parents'},
  gen(r){const f=P(r,FARM),vals=S(r,f.vals).slice(0,5),rank=[0,1,2,3,4].sort((a,b)=>vals[b]-vals[a]),best=rank.slice(0,2).sort(),q=P(r,['process','chooser','pick']);
   let b='';const showTicks=q!=='pick';
   vals.forEach((v,i)=>{const x=24+i*124;b+=text(x+32,22,LET[i],20)+ind(f,x,34,v)+text(x+32,104,`${v} ${f.unit}`,18);if(showTicks&&best.includes(i))b+=tick(x+50,6);});
   let view='0 0 640 116';
   if(showTicks){const avg=(vals[best[0]]+vals[best[1]])/2,step=f.vals[1]-f.vals[0];b+=arrow(320,118,320,156,3)+text(340,146,'offspring',20,'start');
    [0,1,2].forEach(j=>{const v=Math.round(avg+(j-1)*step),x=148+j*124;b+=ind(f,x,166,Math.min(v,130))+text(x+32,236,`${v} ${f.unit}`,18);});view='0 0 640 248';}
   const g=svg(b,`Five ${f.k} labelled A to E with their ${f.what}${showTicks?'; the two chosen parents are ticked, and their offspring are shown':''}`,view);
   const pair=a=>a.map(i=>LET[i]).join(' and ');
   if(q==='process')return {instruction:'Use the diagram to complete the statement:',cloze:`${f.who} uses only the ticked ${f.k} as parents.\nThis is ____`,answer:'selective breeding',choices:['selective breeding','natural selection'],
    visual:{type:'svg',svg:g},explanation:'Humans choose the parents, so this is selective breeding, not natural selection.',chosen:{farmer:f.k,question:'name the process'}};
   if(q==='chooser')return {instruction:'Use the diagram to complete the statement:',cloze:`To get ${f.want}, the parents are chosen by ____`,answer:f.chooser,choices:[f.chooser,'the environment','the offspring'],
    visual:{type:'svg',svg:g},explanation:'In selective breeding, humans choose which individuals breed; in natural selection, the environment decides.',chosen:{farmer:f.k,question:'who chooses'}};
   const worst=rank.slice(3).sort(),mid=[rank[0],rank[4]].sort(),other=[rank[1],rank[2]].sort();
   const choices=[...new Set([pair(best),pair(worst),pair(mid),pair(other)])];
   return {instruction:'Choose the parents:',cloze:`${f.who} wants ${f.want}.\nThe best parents to breed from are ____`,answer:pair(best),choices,
    visual:{type:'svg',svg:g},explanation:`Breed from the two with the most ${f.what}: ${pair(best)}. The trait must be inherited to be passed on.`,chosen:{farmer:f.k,question:'pick the parents'}};}});

 // Continuous or discontinuous, as a table like the test's I or E table: one row's type missing.
 const CONT_F=['Height','Body mass','Hand span','Foot length','Arm span'],DISC_F=['Blood group','Tongue rolling (can or cannot)','Earlobes (attached or free)','Dimples (yes or no)'];
 add({id:'x-var-t',test:'',group:'Extra',title:'Continuous and discontinuous variation: table',li:2,sc:'Identify examples of continuous and discontinuous variation',level:'A',
  template:'Feature | Type of variation table, 6 rows (2–4 continuous): choose continuous or discontinuous for every row, each marked at once.',
  slots:{'continuous feature':CONT_F.join(', '),'discontinuous feature':DISC_F.join(', ')},
  gen(r){const nc=2+Math.floor(r()*3),rows=S(r,[...S(r,CONT_F).slice(0,nc).map(f=>[f,'continuous']),...S(r,DISC_F).slice(0,Math.min(DISC_F.length,6-nc)).map(f=>[f,'discontinuous'])]);
   return {instruction:'Complete the table:',cloze:'Fill in the table = ____',answer:rows.map(x=>x[1]).join(' | '),cells:rows.map(x=>({answer:x[1],options:['continuous','discontinuous']})),
    visual:{type:'gtable',headers:['Feature','Type of variation'],rows:rows.map(([f],i)=>[f,{cell:i,label:'type of variation'}]),svg:pics.variation()},
    explanation:'Continuous: any value in a range (measured). Discontinuous: distinct categories.',chosen:{rows:rows.map(x=>x[0]+' = '+x[1]).join('; ')}};}});
})();
