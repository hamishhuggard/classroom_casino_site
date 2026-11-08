/* LO1 success criterion the test doesn't ask directly (9 Nov 2026): identify examples of variation within a species.
   A 6-row table: for each example, is it variation within one species (Yes) or a difference between species (No)?
   Each cell is chosen from Yes / No and marked at once (core.js cells contract). */
(function(){
 const {add,S,pic,sprite,text,line}=GENETICS_T;
 // Diagram: one species varying (sheep of different sizes and shades) above two species (a sheep and a cow).
 const PIC=pic(text(150,22,'one species: variation',20)+sprite('sheep',8,52,3,'bright')+sprite('sheep',80,40,4,'dim')+sprite('sheep',172,28,5,'bright')
  +line(10,124,290,124,2)+text(150,148,'two species',20)+sprite('sheep',30,170,4,'bright')+sprite('cow',180,170,4,'bright'),
  'Above: sheep of different sizes and shades, variation within one species. Below: a sheep and a cow, two different species');
 const YES=['Labradors can be black, yellow or chocolate','Kākāpō differ in body mass','Students in a class have different heights',
  'Some people have attached earlobes, others free','Sheep in a flock have different wool thickness','Snapper in a school differ in length',
  'Pōhutukawa trees flower at slightly different times','Monarch butterflies have different wing sizes','Some pea plants are tall, some short'];
 const NO=['A kea is bigger than a tūī','A dog has fur but a fish has scales','Kauri trees are taller than harakeke (flax)',
  'A kiwi cannot fly but a kererū can','Sheep have wool but cattle do not','A lion is much bigger than a house cat'];
 add({id:'li1-ex',test:'',group:'Q1',title:'Variation within a species',li:1,sc:'Identify examples of variation within a species',level:'A',
  template:'Example | Variation within one species? table, 6 rows: choose Yes or No for every row (each marked at once).',
  slots:{yes:YES.join('; '),no:NO.join('; '),table:'6 rows: 3–4 Yes, the rest No; new examples and a new order every draw'},
  gen(r){const nY=3+Math.floor(r()*2);
   const rows=S(r,[...S(r,YES).slice(0,nY).map(c=>[c,'Yes']),...S(r,NO).slice(0,6-nY).map(c=>[c,'No'])]);
   return {instruction:'Is each example variation within one species? Choose Yes or No:',cloze:'Yes or No for each row = ____',
    answer:rows.map(x=>x[1]).join(' | '),cells:rows.map(x=>({answer:x[1],options:['Yes','No']})),
    visual:{type:'gtable',headers:['Example','Within one species?'],rows:rows.map(([c],i)=>[c,{cell:i,label:'Yes or No'}]),svg:PIC},
    explanation:'Variation within a species means differences between members of the same species, such as labradors of different colours. A kea and a tūī are different species, so the difference between them is not variation within a species.',
    chosen:{rows:rows.map(x=>x[0]+' = '+x[1]).join('; ')}};}});
})();
