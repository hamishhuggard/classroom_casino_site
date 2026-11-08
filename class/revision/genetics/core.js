/* Year 10 Genetics: test-style question TEMPLATES for Revision Roulette (8 Nov 2026).
   One template per part of the Year 10 Genetic and Inheritance Topic Test V3 (plus a few for unit-plan success criteria the
   test does not cover). Each template keeps the test's wording and swaps the context: organism, alleles, person,
   characteristic... Every template draws a diagram from the same values as its answer.

   Files: core.js (this: contract, pools, SVG helpers) + q1.js, q2.js, q3.js, extra.js (templates) + draft.js (installs
   them into the game's genetics unit with ?draft=genetics). Design sheet: revision/genetics-templates.html.

   TEMPLATE CONTRACT — GENETICS_T.add({
     id:'3a-ii',                 stable id, also the card id in the game (shown as GT-3a-ii)
     test:'3(a)(ii)',            test part it copies, or '' for extras
     group:'Q3',                 'Q1' | 'Q2' | 'Q3' | 'Extra'
     skill:'1a', tier:1,         optional: templates sharing a skill key become one ordered skill in the game, played by tier (levels)
     title:'Predicting offspring',
     li:4, sc:'Construct simple Punnett squares',   unit-plan learning intention (1–5) and success criterion, verbatim
     level:'A',                  schedule level this step evidences: 'A' | 'M' | 'E'
     template:'…{organism}…',    the question with {slots}, as a reader-friendly pattern (shown on the sheet)
     slots:{organism:'cattle, sheep, …'},   what each slot can be (shown on the sheet)
     gen(r){ return {
       instruction:'Complete the Punnett square:',   test-style instruction line shown above the diagram (top left)
       cloze:'…____…',           statement with ONE blank ____ (game splits lines at \n, '. ' and ':' — keep lines short)
       answer, aliases?, choices?, caseSensitive?,
       keepCase?,                true: choice buttons keep their case (genotypes); otherwise the game shows them in capitals
       visual:{type:'svg', svg}, built with the helpers below, from the same values as the answer
         or visual:{type:'gtable', headers, rows, svg}: an HTML table (svg: the picture beside it; every template has one) whose cells hold the answer (see gtableMarkup in app.js):
         a cell is text, {blank:true,pre?,post?}, {field:i,wide?} (several typed boxes: also return fields:[...]),
         or {pick:i,options:[...]} (choose for that row; answer = the picks joined by commas, fields:[...])
       check?(value, fieldValues)  optional: mark the answer yourself (typed definitions, whole tables in any order)
       explanation:'…',          one short line, shown on the correction card
       chosen:{organism:'sheep',…}   the slot values used in this draw (shown on the sheet)
     }; }
   });
   All randomness goes through r (r() in [0,1)). Use P(r,arr) / S(r,arr). No Math.random. NZ English.
   Explain questions (1c, 1d, 2b, 3b, 3c) can't be marked as free text: the student completes one sentence of the
   schedule's exemplar answer, with the blank on a key idea (choose which sentence at random; tag level by sentence). */
(function(root){
 const T=[];
 const P=(r,a)=>a[Math.floor(r()*a.length)];
 const S=(r,a)=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

 // ---------- SVG helpers (currentColor, so every game theme works; text uses the game font) ----------
 const svg=(body,label,view='0 0 640 260')=>`<svg class="revision-visual" viewBox="${view}" role="img" aria-label="${esc(label)}"><title>${esc(label)}</title>${body}</svg>`;
 const line=(x1,y1,x2,y2,w=3,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="${w}" ${extra}/>`;
 const rect=(x,y,w,h,sw=3,extra='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:none" stroke="currentColor" stroke-width="${sw}" ${extra}/>`;
 const fillRect=(x,y,w,h,op=1)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" style="fill:currentColor;fill-opacity:${op}"/>`;
 const circle=(x,y,rad,w=3,fill='none')=>`<circle cx="${x}" cy="${y}" r="${rad}" style="fill:${fill}" stroke="currentColor" stroke-width="${w}"/>`;
 const text=(x,y,s,size=22,anchor='middle',extra='')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" fill="currentColor" style="font-size:${size}px" ${extra}>${esc(s)}</text>`;
 const arrow=(x1,y1,x2,y2,w=3,head=12)=>{const a=Math.atan2(y2-y1,x2-x1),p=d=>[(x2-head*Math.cos(a+d)).toFixed(1),(y2-head*Math.sin(a+d)).toFixed(1)].join(',');
  return line(x1,y1,x2-head*.8*Math.cos(a),y2-head*.8*Math.sin(a),w)+`<polygon points="${x2},${y2} ${p(.45)} ${p(-.45)}" fill="currentColor"/>`;};
 // The thing the student must supply: a dashed box with "?" (never the answer).
 const ask=(x,y,w=110,h=44,size=26)=>rect(x,y,w,h,3,'stroke-dasharray="7 5"')+text(x+w/2,y+h/2+size*.35,'?',size);

 // ---------- pixel sprites (16 wide). '#' takes the phenotype shade, 's' is always solid, '.' empty ----------
 const SPRITES={
  cow:['..............#.','#............###','.#..........####','..###########.##','..############..','..############..','..############..','...##.......##..','...##.......##..','...##.......##..'],
  sheep:['.............ss.','...##########sss','..############ss','.#############s.','.##############.','.##############.','..############..','...s.s....s.s...','...s.s....s.s...','...s.s....s.s...'],
  guineapig:['..........ss....','....#######ss...','..###########s..','.#############s.','.##############s','.##############.','..############..','...s.s....s.s...'],
  pea:['.....####.......','....######......','....######......','.....####.......','.......s........','.......s...ss...','..ss...s..s.....','....s..s.s......','.....s.ss.......','.......s........','.......s........','.....sssss......'],
  kakapo:['......####......','....########....','...##s####s##...','...##########...','....###ss###....','...##########...','..############..','..############..','..############..','...##########...','....########....','.....s....s.....','....ss....ss....'],
  person:['.....######.....','....########....','....########....','....########....','.....######.....','......####......','...##########...','..############..','..############..','..############..'],
 };
 // shade: 'dark' (filled, like the test's black calf) or 'light' (pale, like its grey calf)
 // 'dim' and 'light' draw at .32 opacity; anything else ('dark', 'bright') is solid. The game is light-on-black, so a black
 // coat is drawn 'dim' and a white coat 'bright' (CROSSES below); other diagrams use 'dark'/'light' as solid/pale.
 const sprite=(name,x,y,px=6,shade='dark')=>{const rows=SPRITES[name],op=shade==='dim'||shade==='light'?.32:1;let b='';rows.forEach((row,j)=>[...row].forEach((c,i)=>{if(c==='.')return;b+=fillRect(x+i*px,y+j*px,px,px,c==='s'?1:op);}));return b;};
 const spriteW=(name,px=6)=>16*px, spriteH=(name,px=6)=>SPRITES[name].length*px;

 // Punnett square in the test's layout: gametes across the top and down the side, four offspring cells.
 // cells: 4 strings (row-major) or null for empty; hide: index of the cell to ask for (drawn as ?); x,y: top-left of the grid.
 const punnett=({top,side,cells=[null,null,null,null],hide=-1,x=250,y=60,c=86,label='Punnett square'}={})=>{
  let b='';for(let i=0;i<=2;i++){b+=line(x,y+i*c,x+2*c,y+i*c)+line(x+i*c,y,x+i*c,y+2*c);}
  b+=line(x-c,y,x,y)+line(x,y-c*.7,x,y);   // the corner lines of the test's 3×3 grid
  for(let i=0;i<2;i++){b+=text(x+c/2+i*c,y-16,top[i],28)+text(x-c/2,y+c/2+10+i*c,side[i],28);}
  cells.forEach((v,k)=>{const cx=x+(k%2)*c,cy=y+Math.floor(k/2)*c;if(k===hide)b+=ask(cx+10,cy+20,c-20,c-40,26);else if(v)b+=text(cx+c/2,cy+c/2+10,v,28);});
  return b;
 };
 // A table like the test's: headers + rows of strings; blank:[row,col] shows ?; highlight row optional.
 const table=({headers,rows,blank=null,x=40,y=20,widths,rowH=40,size=20})=>{
  const W=widths||headers.map(()=>Math.floor(560/headers.length));let b='',yy=y;
  const rowOut=(cells,bold)=>{let xx=x;cells.forEach((v,i)=>{b+=rect(xx,yy,W[i],rowH,2);if(v!=null)b+=text(xx+10,yy+rowH/2+size*.35,v,size,'start',bold?'font-weight="bold"':'');xx+=W[i];});yy+=rowH;};
  rowOut(headers,true);rows.forEach((row,ri)=>{const cells=row.slice();if(blank&&blank[0]===ri)cells[blank[1]]=null;rowOut(cells);
   if(blank&&blank[0]===ri){const xx=x+W.slice(0,blank[1]).reduce((a,v)=>a+v,0);b+=ask(xx+8,yy-rowH+5,W[blank[1]]-16,rowH-10,22);}});
  return b;
 };

 // ---------- shared contexts ----------
 // Simple complete-dominance crosses, test style ("In cattle, the allele for black coat colour (B) is dominant to the allele
 // for white coat colour (b)"). shadeDom/shadeRec: how the sprite shows each phenotype on the black screen (dark colours dim, white bright). Cattle black/white is the test's own.
 const CROSSES=[
  {org:'cattle',L:'B',l:'b',trait:'coat colour',dom:'black',rec:'white',domPh:'black coat',recPh:'white coat',male:'bull',female:'cow',young:'calf',youngs:'calves',sprite:'cow',shadeDom:'dim',shadeRec:'bright'},
  {org:'sheep',L:'W',l:'w',trait:'wool colour',dom:'white',rec:'black',domPh:'white wool',recPh:'black wool',male:'ram',female:'ewe',young:'lamb',youngs:'lambs',sprite:'sheep',shadeDom:'bright',shadeRec:'dim'},
  {org:'guinea pigs',L:'B',l:'b',trait:'fur colour',dom:'black',rec:'white',domPh:'black fur',recPh:'white fur',male:'boar',female:'sow',young:'pup',youngs:'pups',sprite:'guineapig',shadeDom:'dim',shadeRec:'bright'},
  {org:'pea plants',L:'P',l:'p',trait:'flower colour',dom:'purple',rec:'white',domPh:'purple flowers',recPh:'white flowers',male:'plant',female:'plant',young:'seedling',youngs:'seedlings',sprite:'pea',shadeDom:'dim',shadeRec:'bright'},
 ];
 const G=c=>({HD:c.L+c.L,HET:c.L+c.l,HR:c.l+c.l});
 const crossLine=c=>`In ${c.org}, the allele for ${c.dom} ${c.trait} (${c.L}) is dominant to the allele for ${c.rec} ${c.trait} (${c.l})`;
 const norm=g=>g[0]===g[1]?g:(g[0]===g[0].toUpperCase()?g:g[1]+g[0]);
 const cells=(top,side)=>[norm(side[0]+top[0]),norm(side[0]+top[1]),norm(side[1]+top[0]),norm(side[1]+top[1])];


 // ---------- small pictures for tables and explain questions (9 Nov 2026: every question has a diagram) ----------
 // Drawn in a 300×240 box (pic()), shown beside a gtable or the stem of a gpara.
 const pic=(body,label)=>svg(body,label,'0 0 300 240');
 const sun=(x,y,rad=16)=>{let b=circle(x,y,rad,3,'currentColor');for(let k=0;k<8;k++){const a=k*Math.PI/4;b+=line(x+(rad+5)*Math.cos(a),y+(rad+5)*Math.sin(a),x+(rad+13)*Math.cos(a),y+(rad+13)*Math.sin(a),3);}return b;};
 // A short DNA ladder (two strands and rungs), vertical, centred on cx.
 const dna=(cx,y0,y1,amp=16,turns=1.5)=>{const L=[],R=[],n=40;for(let i=0;i<=n;i++){const y=y0+(y1-y0)*i/n,t=turns*2*Math.PI*i/n;L.push(`${(cx+amp*Math.sin(t)).toFixed(1)},${y.toFixed(1)}`);R.push(`${(cx-amp*Math.sin(t)).toFixed(1)},${y.toFixed(1)}`);}
  let b=`<polyline points="${L.join(' ')}" fill="none" stroke="currentColor" stroke-width="3"/><polyline points="${R.join(' ')}" fill="none" stroke="currentColor" stroke-width="3"/>`;
  for(let k=0;k<12;k++){const f=(k+.5)/12,w=Math.abs(amp*Math.sin(turns*2*Math.PI*f));if(w>amp*.45)b+=line(cx-w,y0+(y1-y0)*f,cx+w,y0+(y1-y0)*f,2);}return b;};
 const dumbbell=(x,y)=>line(x-22,y,x+22,y,4)+fillRect(x-30,y-12,8,24)+fillRect(x+22,y-12,8,24);
 const virus=(x,y)=>{let b=circle(x,y,9,3);for(let k=0;k<8;k++){const a=k*Math.PI/4;b+=line(x+9*Math.cos(a),y+9*Math.sin(a),x+15*Math.cos(a),y+15*Math.sin(a),2)+circle(x+16*Math.cos(a),y+16*Math.sin(a),2,2,'currentColor');}return b;};
 const flake=(x,y,s=9)=>[0,1,2].map(k=>{const a=k*Math.PI/3;return line(x-s*Math.cos(a),y-s*Math.sin(a),x+s*Math.cos(a),y+s*Math.sin(a),2);}).join('');
 // Small graphs: a histogram (bars touch: continuous) or a bar chart (gaps: discontinuous), with a caption.
 const miniBars=(x,y,w,h,vals,gapped,caption)=>{const n=vals.length,bw=w/n,top=Math.max(...vals);let b='';
  vals.forEach((v,i)=>{const bh=h*v/top,g=gapped?bw*.3:0;b+=fillRect(x+i*bw+g/2,y+h-bh,bw-g,bh,.25)+rect(x+i*bw+g/2,y+h-bh,bw-g,bh,2);});
  return b+line(x,y+h,x+w+4,y+h,3)+line(x,y+h,x,y-4,3)+text(x+w/2,y+h+28,caption,22);};
 const pics={sun,dna,dumbbell,virus,flake,miniBars,
  // Continuous vs discontinuous: a histogram of height beside a bar chart of blood group.
  variation:()=>pic(miniBars(14,44,120,140,[1,3,6,8,5,2],false,'height')+miniBars(166,44,120,140,[7,3,1,8],true,'blood group')+text(74,26,'measured',21)+text(226,26,'groups',21),
   'A histogram of height with touching bars, and a bar chart of blood group with gaps between the bars'),
  // Genes and environment both shape a characteristic: DNA (I) + sun (E) → person (B).
  genesEnv:(env='sun',labels=['genes','environment'])=>pic(dna(56,8,108,18)+text(56,136,labels[0],22)+text(150,70,'+',40)+(env==='train'?dumbbell(244,60):sun(244,60,20))+text(244,136,labels[1],22)
   +arrow(80,150,108,180,3,11)+arrow(220,150,192,180,3,11)+sprite('person',110,180,5,'bright'),'Genes and the environment both influence a person’s characteristics'),
  // A key for a cross: the dominant and recessive phenotypes with their alleles.
  key:c=>pic(sprite(c.sprite,24,30,6,c.shadeDom)+text(72,150,`${c.L} = ${c.dom}`,24)+text(72,178,'dominant',20)
   +sprite(c.sprite,180,30,6,c.shadeRec)+text(228,150,`${c.l} = ${c.rec}`,24)+text(228,178,'recessive',20)+text(150,226,c.org,22),
   `Key: ${c.L} gives ${c.dom} ${c.trait} (dominant); ${c.l} gives ${c.rec} ${c.trait} (recessive)`)};
 root.GENETICS_T={templates:T,add:t=>T.push(t),pic,pics,P,S,esc,svg,line,rect,fillRect,circle,text,arrow,ask,sprite,spriteW,spriteH,SPRITES,punnett,table,CROSSES,G,crossLine,norm,cells,
  // Unit-plan learning intentions (Junior Science Unit Plan Y10 Genetics), verbatim.
  LI:{1:'Understand that traits vary between individuals and are influenced by inheritance and the environment.',
      2:'Understand how inherited and environmental factors influence traits and cause variation within populations.',
      3:'Understand the relationship between DNA, genes, chromosomes, and how they influence inherited traits.',
      4:'Understand how alleles influence inherited traits and how inheritance patterns can be predicted.',
      5:'Understand how genetic variation can lead to adaptation, natural selection, and selective breeding.'}};

 // ---------- Definition table, six levels (Hamish, 9 Nov 2026; first used for 1(a)) ----------
 // A Term | Definition table, rows shuffled every draw. L1 choose every term (word bank), L2 type every term, L3 choose the
 // missing key word in every definition, L4 type them, L5 write every definition (marked on key ideas), L6 the whole table
 // from memory in any row order. Levels 1–5: the answer column starts empty, each cell is marked as soon as it is answered.
 // spec: {key, group, test, li, sc, title, DEF:{term:definition}, KEYW:{term:[key words in its definition]},
 //        IDEAS:{term:[regex, …] all must match a typed definition}, KEYALT?:{key word:[other words accepted when it is typed]}, ALIASES?:{term:[accepted short forms]}, pic:()=>svg (the picture beside the table)}
 const LVNAMES=['','choose terms','type terms','choose key words','type key words','write definitions','whole table'];
 root.GENETICS_T.vocabTable=spec=>{
  const {DEF,KEYW,IDEAS}=spec,TERMS=Object.keys(DEF),AL=spec.ALIASES||{},n=TERMS.length;
  const termOf=v=>{const x=String(v||'').trim().toLowerCase();return TERMS.find(t=>t.toLowerCase()===x||(AL[t]||[]).some(a=>a.toLowerCase()===x));};
  const defOK=(t,txt)=>{const x=String(txt||'').toLowerCase();return x.trim().split(/\s+/).length>=2&&IDEAS[t].every(re=>re.test(x));};
  const gen=L=>r=>{
   const order=S(r,TERMS),table=rows=>({type:'gtable',headers:['Term','Definition'],rows,svg:spec.pic?.()});
   const full=order.map(t=>`${t}: ${DEF[t].charAt(0).toLowerCase()+DEF[t].slice(1)}`).join('; ')+'.';
   const T2=(rows,cells,explanation)=>({instruction:'Complete the table:',cloze:'Fill in the table = ____',answer:cells.map(c=>c.answer).join(' | '),cells,visual:table(rows),explanation,chosen:{'row order':order.join(', ')}});
   if(L<=2){const opts=S(r,TERMS);return T2(order.map((t,i)=>[{cell:i,label:'term'},DEF[t]]),order.map(t=>({answer:t,aliases:AL[t]||[],...(L===1?{options:opts}:{})})),full);}
   if(L<=4){const keys=order.map(t=>P(r,KEYW[t])),bank=S(r,keys);
    const rows=order.map((t,i)=>{const w=keys[i],j=DEF[t].toLowerCase().indexOf(w.toLowerCase());return [t,{cell:i,pre:DEF[t].slice(0,j),post:DEF[t].slice(j+w.length),label:'missing word'}];});
    return T2(rows,keys.map(w=>({answer:w,aliases:[w.endsWith('s')?w.slice(0,-1):w+'s',...(spec.KEYALT?.[w]||[])],...(L===3?{options:bank}:{})})),full);}
   if(L===5)return T2(order.map((t,i)=>[t,{cell:i,wide:true,label:'definition of '+t}]),order.map(t=>({answer:DEF[t],check:v=>defOK(t,v)})),full+' Your own words are fine if they include the key ideas.');
   const rows=order.map((t,i)=>[{field:2*i,label:'term '+(i+1)},{field:2*i+1,wide:true,label:'definition '+(i+1)}]);
   return {instruction:`Fill in the table: ${n} terms and their definitions:`,cloze:'Whole table = ____',answer:TERMS.flatMap(t=>[t,DEF[t]]).join(','),fields:TERMS.flatMap(()=>[{label:'term'},{label:'definition'}]),
    check:(v,f)=>{const used=new Set();for(let i=0;i<n;i++){const t=termOf(f[2*i]);if(!t||used.has(t)||!defOK(t,f[2*i+1]))return false;used.add(t);}return used.size===n;},
    visual:table(rows),explanation:full,chosen:{'row order':'any (the student chooses)'}};
  };
  for(let L=1;L<=6;L++)root.GENETICS_T.add({id:`${spec.key}-${L}`,test:spec.test||'',group:spec.group,skill:spec.key,skillName:spec.skillName,tier:L,
   title:`${spec.title} ${L}: ${LVNAMES[L]}`,li:spec.li,sc:spec.sc,level:'A',
   template:`Term | Definition table (${TERMS.join(', ')}), rows shuffled every draw. Level ${L}: ${LVNAMES[L]}.`,
   slots:{'key words':TERMS.map(t=>t+' ('+KEYW[t].join(', ')+')').join('; ')},gen:gen(L)});
 };

 // ---------- Explain / compare answers, four levels (Hamish, 9 Nov 2026) ----------
 // The model answer (E-level, concise) is written with [key words]. L1 every key word is blank, chosen from a word bank;
 // L2 the key words are typed; L3 every word is blank and typed one at a time (Space or ENTER moves on); L4 the whole
 // answer from memory, marked on its key ideas. Each blank is marked as soon as it is answered.
 // spec: {key, group, test, li, sc, title, skillName, level, contexts:[{label, …}], stem:c=>string,
 //        model:c=>'text with [key words]' ([answer|wrong|wrong] gives that blank its own choices at level 1), aliases?:{answer:[…]}, ideas:c=>[regex, …] (all must match the L4 answer), explanation?:c=>string, pic:c=>svg (the picture beside the stem)}
 const XNAMES=['','choose the missing words','type the missing words','word by word','from memory'];
 const XINSTR=['','Complete the answer: choose the missing words:','Complete the answer: type the missing words:','Write the answer one word at a time:','Write the whole answer from memory:'];
 root.GENETICS_T.explain=spec=>{
  for(let L=1;L<=4;L++)root.GENETICS_T.add({id:`${spec.key}-${L}`,test:spec.test||'',group:spec.group,skill:spec.key,skillName:spec.skillName,tier:L,
   title:`${spec.title} ${L}: ${XNAMES[L]}`,li:spec.li,sc:spec.sc,level:spec.level||'M/E',
   template:`Explain question in the test's style; the model answer ${L<=2?'with its key words blank':L===3?'with every word blank':'written from memory'}.`,
   slots:{context:spec.contexts.map(c=>c.label).join('; ')},
   gen(r){const c=P(r,spec.contexts),m=spec.model(c),plain=m.replace(/\[([^\]|]*)(\|[^\]]*)?\]/g,'$1'),stem=spec.stem(c),parts=[],cells=[];
    // Shown as bullet points (Hamish, 9 Nov 2026): one sentence per bullet; {bullet:true} starts each one.
    const sentences=s=>s.split(/(?<=[.!?])\s+/).filter(Boolean);
    if(L<=2){const keys=[];for(const sen of sentences(m)){parts.push({bullet:true});for(const tok of sen.split(/(\[[^\]]+\])/))if(/^\[.*\]$/.test(tok)){const [w,...wrong]=tok.slice(1,-1).split('|');parts.push({cell:cells.length,ch:Math.max(4,w.length+2)});cells.push({answer:w,aliases:spec.aliases?.[w]||[],...(wrong.length?{own:S(r,[w,...wrong])}:{})});if(!wrong.length)keys.push(w);}else if(tok)parts.push(tok);}
     if(L===1){const bank=S(r,[...new Set(keys)]);cells.forEach(x=>x.options=x.own||bank);}cells.forEach(x=>delete x.own);}
    else if(L===3){for(const sen of sentences(plain)){parts.push({bullet:true});for(const tok of sen.match(/[\p{L}\p{N}’'-]+|[^\p{L}\p{N}’'-]+/gu))if(/[\p{L}\p{N}]/u.test(tok)){parts.push({cell:cells.length,ch:tok.length+1});cells.push({answer:tok});}else parts.push(tok);}}
    else{const ideas=spec.ideas(c);parts.push({cell:0,area:true,label:'your answer',placeholder:'Write your answer as bullet points, one idea per line'});cells.push({answer:plain,check:v=>{const x=String(v||'').toLowerCase();return x.trim().split(/\s+/).length>=8&&ideas.every(re=>re.test(x));}});}
    return {instruction:XINSTR[L],cloze:'Answer = ____',answer:cells.map(x=>x.answer).join(' '),cells,visual:{type:'gpara',stem,parts,svg:spec.pic?.(c)},
     explanation:spec.explanation?spec.explanation(c):'Model answer:\n'+sentences(plain).map(x=>'• '+x).join('\n'),chosen:{context:c.label}};}});
 };
})(typeof window!=='undefined'?window:globalThis);
