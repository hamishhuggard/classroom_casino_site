/* SVG diagrams use the same generated values as each question's model answer. */
function casinoDiagram(data){
 if(!data)return '';const e=escapeMarkup,s=scienceMarkup;
 const text=(x,y,label,size=24,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" style="font-size:${size}px">${scienceSvgMarkup(label)}</text>`;
 const line=(d,width=3)=>`<path d="${d}" fill="none" stroke="currentColor" stroke-width="${width}"/>`;
 const input=(x,y,w=140)=>`<foreignObject x="${x}" y="${y}" width="${w}" height="48"><div xmlns="http://www.w3.org/1999/xhtml" id="cloze-answer-slot" class="diagram-answer-slot"></div></foreignObject>`;
 const box=(x,y,w,h)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="currentColor" stroke-width="3"/>`;
 const svg=(body,label,view='0 0 640 260')=>`<svg class="revision-visual" viewBox="${view}" role="img" aria-label="${e(label)}"><title>${e(label)}</title>${body}</svg>`;
 switch(data.type){
  case 'recall':return ''; 
  case 'svg':return data.svg||'';
  case 'atom':return svg(box(230,15,180,220)+text(247,52,data.z,26,'start')+text(320,125,data.symbol+(data.ionCharge||''),62)+text(320,165,data.name,21)+text(320,201,data.a,30)+text(320,226,'Isotope mass number',13),'Periodic-table-style isotope cell; top number is atomic number');
  case 'shells':if(data.shellInputs)return svg(Array.from({length:data.count},(_,i)=>`<circle cx="360" cy="220" r="${40+i*45}" fill="none" stroke="currentColor" stroke-width="2"/><foreignObject x="338" y="${220-(40+i*45)-18}" width="44" height="38"><div xmlns="http://www.w3.org/1999/xhtml" class="shell-diagram-field">${data.shellInputs[i]}</div></foreignObject>`).join('')+text(360,227,'+',26)+text(360,415,data.label,22),'Fill each electron shell','0 0 720 440');return svg(Array.from({length:data.count},(_,i)=>`<circle cx="320" cy="175" r="${28+i*28}" fill="none" stroke="currentColor" stroke-width="2"/>`).join('')+text(320,30,data.label,22)+text(320,180,'+',26),'Empty electron shells for the stated atom or ion','0 0 640 320');
  case 'particle':return svg(`<circle cx="320" cy="110" r="55" fill="none" stroke="currentColor" stroke-width="3"/>`+text(320,118,data.label,25),'Identify the charge of the labelled subatomic particle');
  case 'ion':return svg(text(320,105,data.label,56)+line('M210 155H430M410 140L430 155L410 170')+text(320,215,'electron transfer',23),'Ion formation and electron transfer');
  case 'particle-counts':return svg(box(100,45,190,140)+box(350,45,190,140)+text(195,100,data.protons,42)+text(195,155,'protons',23)+text(445,100,data.electrons,42)+text(445,155,'electrons',23),'Proton and electron counts; infer the ion charge');
  case 'ions':return svg(text(200,110,data.left,40)+text(440,110,data.right,40)+text(320,185,'simplest neutral ratio',24),'Ions to combine into a neutral formula');
  case 'ph':return svg(line('M80 130H560')+Array.from({length:15},(_,i)=>line(`M${80+i*480/14} 122v16`,1)+text(80+i*480/14,165,i,15)).join('')+line(`M${80+data.value*480/14} 80v35M${70+data.value*480/14} 102l10 13l10-13`,4)+text(320,220,'pH',24),'pH scale with solution position marked');
  case 'reaction':return svg(text(320,65,data.left,25)+line('M320 95V140M306 126L320 140L334 126')+text(320,190,data.right,25),'Reactants and products');
  case 'gas-tests':return svg(box(90,35,190,120)+box(360,35,190,120)+text(185,75,'Sample A',25)+text(185,120,'squeaky pop',21)+text(455,75,'Sample B',25)+text(455,120,'limewater cloudy',18)+text(320,230,'Which came from acid + carbonate?',22),'Two gas-test observations to compare');
  case 'gas-test':return svg(box(240,30,160,140)+text(320,110,'gas sample',22)+text(320,220,data.observation,20),'Gas-test observation');
  case 'excess':return svg(box(220,35,200,150)+line('M220 90H420',2)+text(320,137,data.label,25)+text(320,225,'after reaction',22),'The reactant left in excess after the reaction');
  case 'forces':return svg(box(250,85,140,75)+line('M250 125H90L110 110M90 125L110 140M390 125H550L530 110M550 125L530 140')+text(160,88,data.left+' N',27)+text(470,88,data.right+' N',27)+(data.mass?text(320,130,data.mass+' kg',25):'')+(data.motion?text(320,225,data.motion,23):''),'Forces on a trolley; horizontal arrows show directions');
  case 'weight':return svg(text(320,30,'g = '+data.g+' N/kg',24)+box(250,60,140,75)+text(320,105,data.mass+' kg',30)+line('M320 135V225M305 208L320 225L335 208')+(data.inlineAnswer?text(280,267,'W =',26,'end')+input(292,235):text(320,267,'W = ?',26)),'Mass in a gravitational field; find weight','0 0 640 300');
  case 'journey':return svg(`<circle cx="90" cy="110" r="10"/><circle cx="550" cy="110" r="10"/>`+line('M115 110H520M500 95L520 110L500 125')+text(320,80,data.distance+' '+(data.distanceUnit||'m'),28)+text(320,175,'Elapsed time: '+data.time+' '+(data.timeUnit||'s'),24)+text(90,155,'Start',20)+text(550,155,'Finish',20),'Journey distance and elapsed time');
  case 'graph':{
   const pts=data.points,maxT=Math.max(...pts.map(p=>p[0])),maxD=Math.max(...pts.map(p=>p[1]),1),x=t=>110+440*t/maxT,y=d=>220-180*d/maxD;
   let body='';for(let i=0;i<=maxT;i++){const xx=x(i);body+=line(`M${xx} 40V220`,.6)+text(xx,242,i,15);}const step=Math.max(1,Math.ceil(maxD/6));for(let d=0;d<=maxD;d+=step){const yy=y(d);body+=line(`M110 ${yy}H550`,.6)+text(95,yy+5,d,15,'end');}if(maxD%step)body+=text(95,y(maxD)+5,maxD,15,'end');
   body+=line('M110 25V220H570');for(let i=0;i<pts.length-1;i++){const [p,q]=[pts[i],pts[i+1]];body+=line(`M${x(p[0])} ${y(p[1])}L${x(q[0])} ${y(q[1])}`,i===data.target?6:3);if(pts.length>2)body+=text((x(p[0])+x(q[0]))/2,(y(p[1])+y(q[1]))/2-15,String.fromCharCode(65+i),20);}
   for(const p of pts)body+=`<circle cx="${x(p[0])}" cy="${y(p[1])}" r="4"/>`;
   return svg(body+text(330,278,'Time, t (s)',20)+`<text x="28" y="135" transform="rotate(-90 28 135)" text-anchor="middle" style="font-size:20px">Distance, d (m)</text>`,'Distance–time graph; labelled axes and segments','0 0 640 300');
  }
  case 'circuit':{const picture=diagram(q('',0,{kind:data.kind,supply:data.supply||'',labels:data.labels||[]}));return data.inlineAnswer?circuitAnswerDiagram(picture,data.answerMarkup):picture;}

  case 'meter':{
   // An unconnected meter invites a choice; the deliberately wrong example is clearly stated in the cloze.
   const body=diagram(q('',0,{kind:'series',count:1,labels:['lamp'],supply:''}));
   if(data.incorrect)return svg(line('M100 70H540V210H100V70M190 70V25H450V70')+`<circle cx="320" cy="25" r="23" fill="none" stroke="currentColor" stroke-width="3"/>`+text(320,33,'A',24)+wiredComponent(320,70,'lamp')+component(320,210,'cell'),'Ammeter incorrectly connected across a lamp');
   return `<div class="meter-diagram">${body}${svg(`<circle cx="320" cy="115" r="45" fill="none" stroke="currentColor" stroke-width="3"/>`+line('M215 115H275M365 115H425')+text(320,128,data.meter==='ammeter'?'A':'V',40)+text(320,210,'Choose its connection',21),'Unconnected meter to place in the circuit')}</div>`;
  }
  case 'cores':case 'coils':{
   let body='';for(let i=0;i<2;i++){const x=100+i*320;body+=box(x,65,140,65)+line(Array.from({length:8},(_,j)=>`M${x+10+j*16} 50q-12 50 0 95`).join(''),2);body+=text(x+70,190,data.type==='cores'?(i?'plastic':'iron'):(i?'80 turns':'40 turns'),23);body+=text(x+70,225,data.mode==='confounded'?(i?'2 A':'1 A'):data.type==='cores'?'equal turns and current':'I = same value',16);}return svg(body,'Compare two electromagnet coils');
  }
  case 'dna':return svg(Array.from({length:8},(_,i)=>line(`M${220+i*22} 50V185`,i>=2&&i<=4?7:2)).join('')+line('M205 50H405M205 185H405')+box(253,35,70,165)+line('M420 125H335M350 113L335 125L350 137')+(data.answerMarkup?`<foreignObject x="425" y="60" width="210" height="170"><div xmlns="http://www.w3.org/1999/xhtml" class="dna-diagram-prompt">${data.answerMarkup}</div></foreignObject>`:''),'DNA with a section highlighted');
  case 'alleles':return svg(box(225,30,30,180)+box(385,30,30,180)+line('M225 110H255M385 110H415',6)+text(205,120,data.alleles[0],34,'end')+text(435,120,data.alleles[1],34,'start'),'Alleles at matching loci on homologous chromosomes');
  case 'punnett':{
   let body=line('M240 65H440M240 140H440M240 215H440M240 65V215M340 65V215M440 65V215');for(let i=0;i<2;i++){body+=text(290+i*100,48,data.one[i],26)+text(212,115+i*75,data.two[i],26);for(let j=0;j<2;j++){if(data.highlight?.[0]===i&&data.highlight?.[1]===j)body+=box(245+j*100,70+i*75,90,65);if(data.inlineAnswer&&data.fields)body+=`<foreignObject x="${250+j*100}" y="${82+i*75}" width="80" height="44"><div xmlns="http://www.w3.org/1999/xhtml" class="punnett-answer-slot">${componentField(data.fields[i*2+j],i*2+j).replace('placeholder="_"','placeholder=""')}</div></foreignObject>`;else if(data.inlineAnswer&&data.highlight?.[0]===i&&data.highlight?.[1]===j)body+=`<foreignObject x="${250+j*100}" y="${82+i*75}" width="80" height="44"><div xmlns="http://www.w3.org/1999/xhtml" id="cloze-answer-slot" class="punnett-answer-slot"></div></foreignObject>`;else body+=text(290+j*100,115+i*75,data.completed?CasinoPractice.normalGenotype(data.one[j]+data.two[i]):'?',27);}}if(data.answerMarkup)body+=`<foreignObject x="20" y="235" width="600" height="170"><div xmlns="http://www.w3.org/1999/xhtml" class="punnett-diagram-prompt">${data.answerMarkup}</div></foreignObject>`;return svg(body,'Punnett square with parental alleles; offspring cells to complete',data.answerMarkup?'0 0 640 420':'0 0 640 260');
  }
  case 'parent-inference':return svg(text(180,80,'Black parent: ?',24)+text(465,80,'bb parent',24)+line('M180 100L320 150M465 100L320 150')+text(320,205,'Some offspring: bb',27),'Use white offspring to infer the unknown black parent genotype');
  case 'heights':return svg(data.values.map((height,i)=>box(90+i*100,220-(height-130)*4,45,(height-130)*4)+text(112+i*100,245,height,18)).join('')+text(320,25,'Recorded heights (cm)',24),'Heights measured across a range');
  case 'selection':return svg(text(150,65,'Inherited variation',22)+line('M245 60H390M375 47L390 60L375 73')+text(480,65,'Survival',25)+line('M480 90V150M465 135L480 150L495 135')+text(350,210,'Alleles passed to offspring',25),'Inherited variation, survival and passing alleles to offspring');
  case 'turn':return svg(line('M100 170H450Q520 170 520 90V40M505 55L520 40L535 55',4)+text(270,125,'constant speed',25)+text(350,235,'direction changes',25),'An object turns while keeping speed constant');
  case 'broken-parallel':return svg(line('M100 45H300M340 45H540V210H100V45M100 130H290M350 130H540')+component(320,130,'lamp')+component(320,210,'cell')+text(320,28,'A: break',20)+text(420,125,'B',24),'Parallel circuit with branch A broken and B complete');
  case 'population':return svg(Array.from({length:10},(_,i)=>`<circle cx="${100+(i%5)*110}" cy="${80+Math.floor(i/5)*90}" r="22" fill="none" stroke="currentColor" stroke-width="${i<2?5:2}"/>`+text(100+(i%5)*110,88+Math.floor(i/5)*90,i<2?'B':'b',22)).join('')+text(320,240,'Illustrative allele frequencies',19),'A dominant allele can be less common than a recessive allele');
  case 'mutation':return svg(box(75,55,200,110)+box(365,55,200,110)+text(175,95,'Gamete DNA',23)+text(175,135,'mutation present',17)+text(465,95,'Skin-cell DNA',23)+text(465,135,'mutation absent',17),'A mutation in a gamete can pass to offspring');
  case 'isotopes':return svg(text(180,85,'Carbon-12',32)+text(460,85,'Carbon-14',32)+text(320,160,'same proton number',24)+text(320,220,'different mass numbers',24),'Two isotopes of the same element');
  case 'weight-comparison':return svg(text(170,90,'Earth',30)+text(470,90,'Moon',30)+text(170,150,'g ≈ 10 N/kg',23)+text(470,150,'g ≈ 1.6 N/kg',23)+text(320,225,'same object',24),'The same object in two gravitational fields');
  case 'energy':return svg(text(125,120,'Electrical energy',22)+line('M260 115H390M375 100L390 115L375 130')+text(490,85,'Light',25)+text(490,160,'Thermal energy',22),'Electrical energy transferred by a lamp');
  default:return '';
 }
}
