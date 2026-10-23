/* Year 12 Physics — Level 5 (word problems), mechanics. Ids L5-M01 … */
(()=>{
 const A=(id,skill,gen)=>Physics12.add(5,{id,topic:'Mechanics',skill,gen});
 // true when n has at most 3 significant figures exactly
 const ok3=n=>Number.isFinite(n)&&n>0&&Number(n.toPrecision(3))===Number(n.toPrecision(10));
 // retry a picker until all listed results are clean (≤3 s.f.)
 const tries=(f,chk)=>{let o;for(let i=0;i<60;i++){o=f();if(chk(o))return o;}return o;};
 const an=n=>/^(8|11|18)/.test(String(n))?'An':'A';
 const R=n=>Number(Number(n).toPrecision(6));
 const an_=n=>an(n).toLowerCase();

 A('L5-M01','Uniform acceleration from rest (v = at)',(r,h)=>{
  const [who,verb]=h.pick([['A car','accelerates uniformly from rest'],['A cyclist','speeds up uniformly from rest'],['A sprinter','accelerates uniformly from rest'],['A train','pulls away from a station, accelerating uniformly from rest']],r);
  const slow=who==='A cyclist'||who==='A sprinter',a=slow?h.pick([1,1.5,2,2.5],r):h.pick([1.5,2,2.5,3,4,5],r),t=slow?h.int(3,5,r):h.int(3,12,r),v=R(a*t);
  return {cloze:`${who} ${verb}\nat ${a} m/s² for ${t} s.\nFind its final speed: ____ m/s`,answer:h.fmt(v),answerUnit:'m/s',
   explanation:`Givens: u = 0, a = ${a} m/s², t = ${t} s. v = u + at = 0 + ${a} × ${t} = ${h.fmt(v)} m/s.`};});

 A('L5-M02','Stopping distance (v² = u² + 2as)',(r,h)=>{
  const {v,a,d}=tries(()=>{const v=h.pick([10,12,15,16,20,24,25,30],r),a=h.pick([2,2.5,4,5,6,8],r);return {v,a,d:R(v*v/(2*a))};},o=>ok3(o.d));
  const what=h.pick(['A car','A truck','A cyclist','A van'],r);
  return {cloze:`${what} is travelling at ${v} m/s when the driver brakes.\nThe deceleration is a constant ${a} m/s² until it comes to a stop.\nFind its stopping distance: ____ m`,answer:h.fmt(d),answerUnit:'m',
   explanation:`Givens: u = ${v} m/s, v = 0, a = −${a} m/s². v² = u² + 2as, so s = (0 − ${v}²) ÷ (2 × −${a}) = ${h.fmt(d)} m.`};});

 A('L5-M03','Time to stop (s = ½(u+v)t)',(r,h)=>{
  const u=h.pick([8,10,12,15,20,25],r),t=h.pick([2,3,4,5,6,8],r),d=R(u*t/2);
  const who=u>12?h.pick(['A car','A van'],r):h.pick(['A car','A van','A trolley','A skater'],r);
  return {cloze:`${who} moving at ${u} m/s slows uniformly\nand comes to a stop after travelling ${h.fmt(d)} m.\nFind the time it takes to stop: ____ s`,answer:h.fmt(t),answerUnit:'s',
   explanation:`Givens: u = ${u} m/s, v = 0, s = ${h.fmt(d)} m. s = ½(u + v)t, so t = 2s ÷ (u + v) = ${h.fmt(2*d)} ÷ ${u} = ${t} s.`};});

 A('L5-M04','Deceleration from distance (v² = u² + 2as)',(r,h)=>{
  const {u,a,d}=tries(()=>{const u=h.pick([10,12,15,16,20,24,25,30],r),a=h.pick([2,2.5,4,5,6,8],r);return {u,a,d:R(u*u/(2*a))};},o=>ok3(o.d)&&o.d>=5);
  const who=h.pick(['A car','A motorbike','A truck'],r);
  return {cloze:`${who} travelling at ${u} m/s brakes\nuniformly and stops in ${h.fmt(d)} m.\nFind the size of its deceleration: ____ m/s²`,answer:h.fmt(a),answerUnit:'m/s²',
   explanation:`Givens: u = ${u} m/s, v = 0, s = ${h.fmt(d)} m. v² = u² + 2as, so a = (0 − ${u}²) ÷ (2 × ${h.fmt(d)}) = −${a} m/s². Size = ${a} m/s².`};});

 A('L5-M05','Distance while accelerating (s = ut + ½at²)',(r,h)=>{
  const u=h.int(2,10,r),a=h.pick([1,2,3,4],r),t=h.int(3,8,r),s=R(u*t+0.5*a*t*t);
  const who=h.pick(['A cyclist','A car','A runner','A trolley'],r);
  return {cloze:`${who} is moving at ${u} m/s when it starts\nto accelerate uniformly at ${a} m/s² for ${t} s.\nFind the distance it travels in that time: ____ m`,answer:h.fmt(s),answerUnit:'m',
   explanation:`Givens: u = ${u} m/s, a = ${a} m/s², t = ${t} s. s = ut + ½at² = ${u}×${t} + ½×${a}×${t}² = ${h.fmt(s)} m.`};});

 A('L5-M06','Speed and distance (d = vt)',(r,h)=>{
  const pair=h.pick([['A runner','jogs',[1.5,2,3,4,5]],['A model car','drives',[1.5,2,3,4,5,8]],['A cyclist','rides',[3,4,5,8,10,12]],['A ferry','travels',[4,5,8,10,12,15]]],r);
  const v=h.pick(pair[2],r),t=h.pick([10,20,25,30,40,60],r),d=R(v*t);
  const m=h.int(0,1,r);
  if(m===0)return {cloze:`${pair[0]} ${pair[1]} at a constant ${v} m/s\nfor ${t} s.\nFind the distance covered: ____ m`,answer:h.fmt(d),answerUnit:'m',explanation:`d = vt = ${v} × ${t} = ${h.fmt(d)} m.`};
  return {cloze:`${pair[0]} ${pair[1]} ${h.fmt(d)} m in ${t} s\nat a constant speed.\nFind its speed: ____ m/s`,answer:h.fmt(v),answerUnit:'m/s',explanation:`v = d ÷ t = ${h.fmt(d)} ÷ ${t} = ${h.fmt(v)} m/s.`};});

 A('L5-M07','Free fall (dropped)',(r,h)=>{
  const t=h.int(1,5,r),height=5*t*t,v=10*t;
  const obj=h.pick(['stone','ball','coin','pebble'],r);
  const m=h.int(0,2,r);
  const head=`A ${obj} is dropped from rest. Ignore air resistance. g = 10 m/s².`;
  if(m===0)return {cloze:`${head}\nIt falls for ${t} s before it lands.\nFind the height it was dropped from: ____ m`,answer:String(height),answerUnit:'m',explanation:`u = 0, a = 10 m/s², t = ${t} s. s = ut + ½at² = ½ × 10 × ${t}² = ${height} m.`};
  if(m===1)return {cloze:`${head}\nIt falls for ${t} s before it lands.\nFind its speed just before it lands: ____ m/s`,answer:String(v),answerUnit:'m/s',explanation:`u = 0, a = 10 m/s², t = ${t} s. v = u + at = 10 × ${t} = ${v} m/s.`};
  return {cloze:`${head}\nIt is dropped from a height of ${height} m.\nFind the time it takes to land: ____ s`,answer:String(t),answerUnit:'s',explanation:`u = 0, a = 10 m/s², s = ${height} m. s = ½at², so t = √(2s ÷ a) = √(${2*height} ÷ 10) = ${t} s.`};});

 A('L5-M08','Vertical throw upward',(r,h)=>{
  const u=h.pick([10,15,20,25,30],r),m=h.int(0,1,r),obj=h.pick(['ball','stone','rugby ball'],r);
  const head=`A ${obj} is thrown straight up at ${u} m/s.\nIgnore air resistance. g = 10 m/s².`;
  if(m===0){const hh=R(u*u/20);return {cloze:`${head}\nFind its maximum height above the thrower's hand: ____ m`,answer:h.fmt(hh),answerUnit:'m',explanation:`u = ${u} m/s, v = 0 at the top, a = −10 m/s². v² = u² + 2as, so s = ${u}² ÷ (2 × 10) = ${h.fmt(hh)} m.`};}
  const t=R(u/10);return {cloze:`${head}\nFind the time it takes to reach its highest point: ____ s`,answer:h.fmt(t),answerUnit:'s',explanation:`u = ${u} m/s, v = 0 at the top, a = −10 m/s². v = u + at, so t = ${u} ÷ 10 = ${h.fmt(t)} s.`};});

 A('L5-M09','Projectile launched horizontally',(r,h)=>{
  const t=h.int(1,4,r),height=5*t*t,v=h.pick([2,3,4,5,6,8,10],r),d=v*t;
  const [obj,place]=h.pick([['A stone','a cliff'],['A ball','a flat roof'],['A rugby ball','a platform']],r);
  return {cloze:`${obj} is kicked horizontally at ${v} m/s off ${place}\n${height} m above level ground. g = 10 m/s². Ignore air resistance.\nFind how far from the edge it lands: ____ m`,answer:String(d),answerUnit:'m',
   explanation:`Vertical: u = 0, s = ${height} m, a = 10 m/s², so t = √(2s ÷ a) = ${t} s. Horizontal: d = vt = ${v} × ${t} = ${d} m.`};});

 A('L5-M10','Newton’s second law',(r,h)=>{
  const m=h.pick([2,3,4,5,8,10,40,60,800,1200],r),a=h.pick([1,2,2.5,3,4,5],r),F=R(m*a),k=h.int(0,2,r);
  const ctx=h.pick([['A trolley','a student pushes with'],['A sledge','is pulled with'],['A shopping trolley','is pushed with']],r);
  if(m>=100){return {cloze:`A car of mass ${m} kg accelerates at ${a} m/s².\nFind the net force on the car: ____ N`,answer:h.fmt(F),answerUnit:'N',explanation:`F = ma = ${m} × ${a} = ${h.fmt(F)} N.`};}
  if(k===0)return {cloze:`${ctx[0]} of mass ${m} kg accelerates at ${a} m/s².\nFind the net force on it: ____ N`,answer:h.fmt(F),answerUnit:'N',explanation:`F = ma = ${m} × ${a} = ${h.fmt(F)} N.`};
  if(k===1)return {cloze:`A net force of ${h.fmt(F)} N acts on ${an_(m)} ${m} kg ${ctx[0].slice(2)}.\nFind its acceleration: ____ m/s²`,answer:h.fmt(a),answerUnit:'m/s²',explanation:`a = F ÷ m = ${h.fmt(F)} ÷ ${m} = ${h.fmt(a)} m/s².`};
  return {cloze:`A net force of ${h.fmt(F)} N gives an object an\nacceleration of ${a} m/s².\nFind the mass of the object: ____ kg`,answer:String(m),answerUnit:'kg',explanation:`m = F ÷ a = ${h.fmt(F)} ÷ ${a} = ${m} kg.`};});

 A('L5-M11','Net force with friction',(r,h)=>{
  const m=h.pick([2,4,5,10,20,50],r),a=h.pick([0.5,1,1.5,2,3],r),f=h.pick([4,5,8,10,15,20],r),F=R(m*a+f);
  const [obj,surf]=h.pick([['crate','floor'],['sledge','snow'],['box','carpet'],['trolley','bench']],r);
  return {cloze:`${an(m)} ${m} kg ${obj} is pushed along the ${surf} with a\nhorizontal force of ${h.fmt(F)} N. Friction is ${f} N.\nFind its acceleration: ____ m/s²`,answer:h.fmt(a),answerUnit:'m/s²',
   explanation:`Net force = ${h.fmt(F)} − ${f} = ${h.fmt(F-f)} N. a = F ÷ m = ${h.fmt(F-f)} ÷ ${m} = ${h.fmt(a)} m/s².`};});

 A('L5-M12','Force, friction then speed (two steps)',(r,h)=>{
  const m=h.pick([2,4,5,10,20],r),a=h.pick([1,2,2.5,3],r),f=h.pick([2,4,5,10],r),t=h.int(2,8,r),F=R(m*a+f),v=R(a*t);
  const obj=h.pick(['crate','sledge','trolley'],r);
  return {cloze:`${an(m)} ${m} kg ${obj} starts from rest. A constant force of ${h.fmt(F)} N\npushes it along a surface with friction of ${f} N.\nFind its speed after ${t} s: ____ m/s`,answer:h.fmt(v),answerUnit:'m/s',
   explanation:`Net force = ${h.fmt(F)} − ${f} = ${h.fmt(F-f)} N, so a = ${h.fmt(F-f)} ÷ ${m} = ${h.fmt(a)} m/s². v = u + at = 0 + ${h.fmt(a)} × ${t} = ${h.fmt(v)} m/s.`};});

 A('L5-M13','Weight and mass',(r,h)=>{
  const k=h.int(0,3,r);
  if(k===0){const m=h.pick([2,5,12,40,55,70,80],r);return {cloze:`A student has a mass of ${m} kg. g = 10 N/kg.\nFind the student's weight: ____ N`,answer:String(m*10),answerUnit:'N',explanation:`W = mg = ${m} × 10 = ${m*10} N.`};}
  if(k===1){const W=h.pick([30,120,250,600,750],r);return {cloze:`A bag has a weight of ${W} N on Earth. g = 10 N/kg.\nFind its mass: ____ kg`,answer:String(W/10),answerUnit:'kg',explanation:`m = W ÷ g = ${W} ÷ 10 = ${W/10} kg.`};}
  if(k===2){const m=h.pick([50,60,70,80],r),g=1.6;const W=R(m*g);return {cloze:`An astronaut with a mass of ${m} kg stands on the Moon,\nwhere g = 1.6 N/kg.\nFind the astronaut's weight on the Moon: ____ N`,answer:h.fmt(W),answerUnit:'N',explanation:`W = mg = ${m} × 1.6 = ${h.fmt(W)} N. (The mass is still ${m} kg.)`};}
  const g=h.pick([4,5,8,12,25],r),m=h.pick([2,5,10,20],r);return {cloze:`On a small planet a ${m} kg object weighs ${m*g} N.\nFind the gravitational field strength there: ____ N/kg`,answer:String(g),answerUnit:'N/kg',explanation:`g = W ÷ m = ${m*g} ÷ ${m} = ${g} N/kg.`};});

 A('L5-M14','Hooke’s law',(r,h)=>{
  const k0=h.pick([20,25,40,50,100,200,250,400],r),x=h.pick([2,4,5,8,10,20],r),F=R(k0*x/100);
  const m=h.int(0,1,r);
  if(m===0)return {cloze:`A spring extends by ${x} cm when a force of ${h.fmt(F)} N pulls on it.\nThe spring obeys Hooke's law.\nFind its spring constant: ____ N/m`,answer:String(k0),answerUnit:'N/m',explanation:`x = ${x} cm = ${h.fmt(x/100)} m. k = F ÷ x = ${h.fmt(F)} ÷ ${h.fmt(x/100)} = ${k0} N/m.`};
  const g=h.pick(['spring balance','spring'],r);
  return {cloze:`A spring with a spring constant of ${k0} N/m obeys Hooke's law.\nA force of ${h.fmt(F)} N is applied to it.\nFind its extension: ____ m`,answer:h.fmt(x/100),answerUnit:'m',explanation:`x = F ÷ k = ${h.fmt(F)} ÷ ${k0} = ${h.fmt(x/100)} m.`};});

 A('L5-M15','Hooke’s law with a hanging mass',(r,h)=>{
  const m=h.pick([0.2,0.5,1,2,3,4],r),x=h.pick([2,4,5,10,20],r),F=m*10,k0=R(F/(x/100));
  return {cloze:`${an(m)} ${m} kg mass hangs at rest from a spring and stretches it\nby ${x} cm. g = 10 N/kg. Hooke's law applies.\nFind the spring constant: ____ N/m`,answer:h.fmt(k0),answerUnit:'N/m',
   explanation:`Force = weight = mg = ${m} × 10 = ${h.fmt(F)} N; x = ${h.fmt(x/100)} m. k = F ÷ x = ${h.fmt(F)} ÷ ${h.fmt(x/100)} = ${h.fmt(k0)} N/m.`};});

 A('L5-M16','Momentum',(r,h)=>{
  const k=h.int(0,1,r);
  if(k===0){const m=h.pick([2,3,5,60,80,1000,1200],r),v=m>=1000?h.pick([8,10,15,20],r):m>=60?h.pick([2,4,5,8],r):h.pick([2,4,5,8,10],r),p=m*v;const who=m>=1000?'car':m>=60?'skater':'trolley';return {cloze:`${an(m)} ${m} kg ${who} moves at ${v} m/s.\nFind its momentum: ____ kg·m/s`,answer:String(p),answerUnit:'kg·m/s',unitAliases:['kg m/s','N s'],explanation:`p = mv = ${m} × ${v} = ${p} kg m/s.`};}
  const m=h.pick([0.5,1,2,4,5],r),v=h.pick([4,6,8,10,12,20],r),p=R(m*v);
  return {cloze:`A ball has a momentum of ${h.fmt(p)} kg m/s and a speed of ${v} m/s.\nFind its mass: ____ kg`,answer:h.fmt(m),answerUnit:'kg',explanation:`m = p ÷ v = ${h.fmt(p)} ÷ ${v} = ${h.fmt(m)} kg.`};});

 A('L5-M17','Impulse and average force',(r,h)=>{
  const m=h.pick([0.2,0.4,0.5],r),v=h.pick([10,12,15,20,25],r),t=h.pick([0.01,0.02,0.05,0.1],r);
  const {F}=tries(()=>({F:R(m*v/t)}),o=>ok3(o.F));
  const ctx=h.pick([['A rugby ball','kicked from rest and leaves the boot'],['A football','kicked from rest and leaves the foot'],['A hockey ball','hit from rest and leaves the stick']],r);
  return {cloze:`${ctx[0]} of mass ${m} kg is ${ctx[1]}\nat ${v} m/s. The contact lasts ${t} s.\nFind the average force on the ball: ____ N`,answer:h.fmt(F),answerUnit:'N',
   explanation:`Δp = m(v − u) = ${m} × ${v} = ${h.fmt(m*v)} kg m/s. F = Δp ÷ Δt = ${h.fmt(m*v)} ÷ ${t} = ${h.fmt(F)} N.`};});

 A('L5-M18','Impulse in a crash (force, time, Δv)',(r,h)=>{
  const m=h.pick([60,70,80,1000,1200],r),v=h.pick([10,15,20,25],r),t=h.pick([0.1,0.2,0.5],r);
  const {F}=tries(()=>({F:R(m*v/t)}),o=>ok3(o.F));
  const [obj,ver]=m>=1000?['A car',`hits a wall and stops`]:['A passenger',`is stopped by the seatbelt`];
  return {cloze:`${obj} of mass ${m} kg travelling at ${v} m/s\n${ver} in ${t} s.\nFind the average stopping force: ____ N`,answer:h.fmt(F),answerUnit:'N',
   explanation:`Δp = m(v − u) = ${m} × (0 − ${v}) = −${m*v} kg m/s. F = Δp ÷ Δt, so size = ${m*v} ÷ ${t} = ${h.fmt(F)} N.`};});

 A('L5-M19','Collision where objects stick',(r,h)=>{
  const {m1,m2,vv,tot,u}=tries(()=>{const m1=h.pick([1,2,3,4,5],r),m2=h.pick([1,2,3,4,5,6],r),vv=h.pick([1,1.5,2,2.5,3],r);return {m1,m2,vv,tot:m1+m2,u:R((m1+m2)*vv/m1)};},o=>ok3(o.u));
  const [a,b,j]=h.pick([['trolley','trolley','stick together'],['wagon','wagon','couple together'],['toy car','toy car','lock together']],r);
  return {cloze:`${an(m1)} ${m1} kg ${a} moving at ${h.fmt(u)} m/s collides with a\nstationary ${m2} kg ${b} and they ${j}.\nFind their speed just after the collision: ____ m/s`,answer:h.fmt(vv),answerUnit:'m/s',
   explanation:`Momentum is conserved. ${m1} × ${h.fmt(u)} = (${m1} + ${m2}) × v, so v = ${h.fmt(m1*u)} ÷ ${tot} = ${h.fmt(vv)} m/s.`};});

 A('L5-M20','Head-on collision, stick together',(r,h)=>{
  const m1=h.pick([2,3,4,5],r),m2=h.pick([1,2,3],r),v1=h.pick([4,5,6,8],r),v2=h.pick([1,2,3],r);
  const vv=R((m1*v1-m2*v2)/(m1+m2));
  if(!(ok3(vv)&&vv>0))return {cloze:`A 4 kg trolley moving at 6 m/s collides head-on with a 2 kg trolley\nmoving at 3 m/s the other way. They stick together.\nFind their speed after the collision: ____ m/s`,answer:'3',answerUnit:'m/s',explanation:`Taking the first trolley's direction as positive: 4 × 6 + 2 × (−3) = 18 = (4 + 2) × v, so v = 3 m/s.`};
  return {cloze:`${an(m1)} ${m1} kg trolley moving at ${v1} m/s collides head-on with a ${m2} kg\ntrolley moving at ${v2} m/s the opposite way. They stick together.\nFind their speed after the collision: ____ m/s`,answer:h.fmt(vv),answerUnit:'m/s',
   explanation:`Take the first trolley's direction as positive. Total momentum before = ${m1} × ${v1} + ${m2} × (−${v2}) = ${m1*v1-m2*v2} kg m/s. After: ${m1+m2} × v, so v = ${h.fmt(vv)} m/s (in the first trolley's direction).`};});

 A('L5-M21','Recoil / explosion',(r,h)=>{
  const M=h.pick([40,50,60,80],r),m=h.pick([2,4,5,8],r),v=h.pick([3,4,5,6,10],r),V=R(m*v/M);
  if(!ok3(V)||m*v>30)return {cloze:`A skater of mass 60 kg stands at rest on ice and throws a 3 kg ball forward at 10 m/s.\nFind the skater's recoil speed: ____ m/s`,answer:'0.5',answerUnit:'m/s',explanation:`0 = 3 × 10 − 60 × v, so v = 0.5 m/s.`};
  const ex=h.pick([['skater','ball','throws','on smooth ice'],['student on a skateboard','medicine ball','throws','on smooth ground'],['boat','crate','pushes off','on still water']],r);
  return {cloze:`${an(M)} ${M} kg ${ex[0]} is at rest ${ex[3]}. It ${ex[2]} ${an_(m)}\n${m} kg ${ex[1]} forwards at ${v} m/s.\nFind the recoil speed of the ${ex[0]}: ____ m/s`,answer:h.fmt(V),answerUnit:'m/s',
   explanation:`Total momentum stays 0. 0 = ${m} × ${v} − ${M} × V, so V = ${m*v} ÷ ${M} = ${h.fmt(V)} m/s backwards.`};});

 A('L5-M22','Work done',(r,h)=>{
  const k=h.int(0,2,r);
  if(k===0){const F=h.pick([20,50,80,100,150,200],r),d=h.pick([2,3,4,5,8,10],r);const W=F*d;return {cloze:`A student pushes a box ${d} m along the floor with a\nconstant horizontal force of ${F} N.\nFind the work done by the student: ____ J`,answer:String(W),answerUnit:'J',explanation:`W = Fd = ${F} × ${d} = ${W} J.`};}
  if(k===1){const m=h.pick([2,5,10,20,50],r),H=h.pick([1.5,2,3,4,5],r),W=m*10*H;return {cloze:`A crane lifts a ${m} kg load at a steady speed through ${H} m.\ng = 10 N/kg.\nFind the work done on the load: ____ J`,answer:h.fmt(W),answerUnit:'J',explanation:`Force = weight = mg = ${m} × 10 = ${m*10} N. W = Fd = ${m*10} × ${H} = ${h.fmt(W)} J.`};}
  const W=h.pick([200,300,400,600,1200],r),F=h.pick([20,40,50,60,100],r),d=R(W/F);if(!ok3(d))return {cloze:`A force of 50 N does 400 J of work on a sledge.\nFind the distance it moves: ____ m`,answer:'8',answerUnit:'m',explanation:`d = W ÷ F = 400 ÷ 50 = 8 m.`};
  return {cloze:`A constant force of ${F} N does ${W} J of work on a sledge.\nFind the distance the sledge moves in the direction of the force: ____ m`,answer:h.fmt(d),answerUnit:'m',explanation:`d = W ÷ F = ${W} ÷ ${F} = ${h.fmt(d)} m.`};});

 A('L5-M23','Power of a lift or motor',(r,h)=>{
  const m=h.pick([20,40,50,100,200,500],r),H=h.pick([2,3,4,5,6,10],r),t=h.pick([2,4,5,8,10,20],r),P=R(m*10*H/t);
  if(!ok3(P))return {cloze:`A motor lifts a 100 kg load 5 m in 10 s. g = 10 N/kg.\nFind the power of the motor, assuming no energy is wasted: ____ W`,answer:'500',answerUnit:'W',explanation:`W = mgh = 100 × 10 × 5 = 5000 J. P = W ÷ t = 5000 ÷ 10 = 500 W.`};
  const o=h.pick(['A motor','A crane','A winch'],r);
  return {cloze:`${o} lifts a ${m} kg load ${H} m at a steady speed in ${t} s.\ng = 10 N/kg.\nFind the useful power output: ____ W`,answer:h.fmt(P),answerUnit:'W',
   explanation:`Work = mgh = ${m} × 10 × ${H} = ${m*10*H} J. P = W ÷ t = ${m*10*H} ÷ ${t} = ${h.fmt(P)} W.`};});

 A('L5-M24','Power from work and time',(r,h)=>{
  const k=h.int(0,1,r);
  if(k===0){const W=h.pick([600,900,1200,3000,4500],r),t=h.pick([5,10,15,20,30],r),P=R(W/t);if(!ok3(P))return {cloze:`A heater transfers 3000 J in 10 s.\nFind its power: ____ W`,answer:'300',answerUnit:'W',explanation:`P = E ÷ t = 3000 ÷ 10 = 300 W.`};return {cloze:`A student does ${W} J of work climbing stairs in ${t} s.\nFind the student's average power: ____ W`,answer:h.fmt(P),answerUnit:'W',explanation:`P = W ÷ t = ${W} ÷ ${t} = ${h.fmt(P)} W.`};}
  const P=h.pick([40,100,250,500,1500],r),t=h.pick([2,5,10,30,60],r),E=P*t;
  return {cloze:`A motor has a power output of ${P} W.\nFind the work it does in ${t} s: ____ J`,answer:String(E),answerUnit:'J',explanation:`W = Pt = ${P} × ${t} = ${E} J.`};});

 A('L5-M25','Efficiency',(r,h)=>{
  const e=h.pick([20,25,40,50,60,75,80],r),Ein=h.pick([200,400,500,800,1000,2000],r),Eo=R(Ein*e/100);
  if(!ok3(Eo))return {cloze:`A motor is supplied with 400 J of energy and does 300 J of useful work.\nFind its efficiency: ____ %`,answer:'75',answerUnit:'%',explanation:`Efficiency = useful output ÷ input × 100 = 300 ÷ 400 × 100 = 75 %.`};
  const d=h.pick(['A motor','An electric kettle','A winch'],r);
  if(h.int(0,1,r)===0)return {cloze:`${d} is supplied with ${Ein} J of energy and\ntransfers ${h.fmt(Eo)} J of it to useful energy.\nFind its efficiency: ____ %`,answer:String(e),answerUnit:'%',explanation:`Efficiency = useful output ÷ input × 100 = ${h.fmt(Eo)} ÷ ${Ein} × 100 = ${e} %.`};
  return {cloze:`${d} is ${e}% efficient. It is supplied with ${Ein} J of energy.\nFind the useful energy output: ____ J`,answer:h.fmt(Eo),answerUnit:'J',explanation:`Useful output = efficiency × input = ${e/100} × ${Ein} = ${h.fmt(Eo)} J.`};});

 A('L5-M26','Energy: Ep ↔ Ek, no losses',(r,h)=>{
  const ctx=h.pick([['A trolley','is released from rest at the top of a smooth ramp',[0.5,1,2],1.8],['A skateboarder','rolls from rest down a smooth curved ramp',[40,50,60],5],['A toy car','is released from rest at the top of a smooth track',[0.2,0.5],1.25]],r);
  const hh=h.pick([0.2,0.45,0.8,1.25,1.8,3.2,5].filter(x=>x<=ctx[3]),r),v=R(Math.sqrt(20*hh));
  const m=h.pick(ctx[2],r);
  return {cloze:`${ctx[0]} of mass ${m} kg ${ctx[1]}\n${h.fmt(hh)} m high. Friction is negligible. g = 10 N/kg.\nFind its speed at the bottom: ____ m/s`,answer:h.fmt(v),answerUnit:'m/s',
   explanation:`No losses, so Ep lost = Ek gained: mgh = ½mv². v = √(2gh) = √(2 × 10 × ${h.fmt(hh)}) = ${h.fmt(v)} m/s (the mass cancels).`};});

 A('L5-M27','Energy: height from speed',(r,h)=>{
  const v=h.pick([2,3,4,5,6,8,10],r),hh=R(v*v/20),ex=h.pick([['A ball','is thrown straight up at','to its highest point'],['A stone','is thrown straight up at','to its highest point']],r);
  if(h.int(0,1,r)===0)return {cloze:`${ex[0]} of mass ${h.pick([0.2,0.5,1],r)} kg ${ex[1]} ${v} m/s. g = 10 N/kg.\nIgnore air resistance.\nFind the maximum height it rises above its starting point: ____ m`,answer:h.fmt(hh),answerUnit:'m',explanation:`Ek at the start becomes Ep at the top: ½mv² = mgh, so h = v² ÷ 2g = ${v}² ÷ 20 = ${h.fmt(hh)} m.`};
  const m=h.pick([1,2,4,60],r),Ek=R(0.5*m*v*v);
  return {cloze:`${an(m)} ${m} kg ${m>=60?'skater':'trolley'} is moving at ${v} m/s.\nFind its kinetic energy: ____ J`,answer:h.fmt(Ek),answerUnit:'J',explanation:`Ek = ½mv² = ½ × ${m} × ${v}² = ${h.fmt(Ek)} J.`};});

 A('L5-M28','Energy lost as heat',(r,h)=>{
  const m=h.pick([2,4,5,10,50,60],r),H=h.pick([2,3,4,5,10],r),v=h.pick([2,4,5,6,8],r),Ep=m*10*H,Ek=R(0.5*m*v*v),lost=R(Ep-Ek);
  if(lost<=0)return {cloze:`A 4 kg box slides from rest down a rough ramp 5 m high and\nreaches the bottom at 6 m/s. g = 10 N/kg.\nFind the energy lost as heat: ____ J`,answer:'128',answerUnit:'J',explanation:`Ep lost = mgh = 4 × 10 × 5 = 200 J. Ek gained = ½ × 4 × 6² = 72 J. Lost = 200 − 72 = 128 J.`};
  const o=m>=50?'skier':'box';
  return {cloze:`${an(m)} ${m} kg ${o} slides from rest down a rough slope ${H} m high\nand reaches the bottom at ${v} m/s. g = 10 N/kg.\nFind the energy lost as heat (to friction): ____ J`,answer:h.fmt(lost),answerUnit:'J',
   explanation:`Ep lost = mgh = ${m} × 10 × ${H} = ${Ep} J. Ek gained = ½mv² = ½ × ${m} × ${v}² = ${h.fmt(Ek)} J. Lost = ${Ep} − ${h.fmt(Ek)} = ${h.fmt(lost)} J.`};});

 A('L5-M29','Braking force and stopping distance (work–energy)',(r,h)=>{
  const {m,v,F,d}=tries(()=>{const m=h.pick([800,1000,1200,1500],r),v=h.pick([10,15,20],r),F=h.pick([2000,3000,4000,5000,6000,8000],r);return {m,v,F,d:R(0.5*m*v*v/F)};},o=>ok3(o.d));
  const Ek=0.5*m*v*v;
  return {cloze:`${an(m)} ${m} kg car travelling at ${v} m/s brakes and stops.\nThe braking force is a constant ${F} N.\nFind the distance it travels while stopping: ____ m`,answer:h.fmt(d),answerUnit:'m',
   explanation:`Work done by the brakes = loss of Ek. Ek = ½mv² = ½ × ${m} × ${v}² = ${h.fmt(Ek)} J. Fd = Ek, so d = ${h.fmt(Ek)} ÷ ${F} = ${h.fmt(d)} m.`};});

 A('L5-M30','Torque (moment of a force)',(r,h)=>{
  const F=h.pick([20,40,50,80,100,150],r),cm=h.pick([10,20,25,30,40,50],r),T=R(F*cm/100);
  const ctx=h.pick([['A spanner','a nut'],['A wrench','a bolt']],r);
  if(h.int(0,1,r)===0)return {cloze:`${ctx[0]} ${cm} cm long is used to turn ${ctx[1]}. A student pushes at\nthe end of it, at right angles, with a force of ${F} N.\nFind the torque about the ${ctx[1].slice(2)}: ____ N·m`,answer:h.fmt(T),answerUnit:'N·m',unitAliases:['N m','Nm'],explanation:`τ = Fd = ${F} × ${h.fmt(cm/100)} = ${h.fmt(T)} N m (${cm} cm = ${h.fmt(cm/100)} m).`};
  return {cloze:`A force of ${F} N pushes at right angles on a door handle\n${cm} cm from the hinge.\nFind the torque about the hinge: ____ N·m`,answer:h.fmt(T),answerUnit:'N·m',unitAliases:['N m','Nm'],explanation:`τ = Fd = ${F} × ${h.fmt(cm/100)} = ${h.fmt(T)} N m (${cm} cm = ${h.fmt(cm/100)} m).`};});

 A('L5-M31','Balanced seesaw (equilibrium of moments)',(r,h)=>{
  let d1=h.pick([1,2,3,4],r),d2=h.pick([1,2,3,4],r);if(d1===d2)d2=d1===4?1:d1+1;
  const k=h.pick([15,20],r),m1=k*d2,m2=k*d1;
  const who=h.pick([['child','child'],['student','student']],r);
  if(h.int(0,1,r)===0)return {cloze:`A uniform seesaw is balanced on a pivot at its centre.\n${an(m1)} ${m1} kg ${who[0]} sits ${d1} m from the pivot on one side.\nA second ${who[1]} sits ${d2} m from the pivot on the other side.\nFind the mass of the second ${who[1]}: ____ kg`,answer:String(m2),answerUnit:'kg',
   explanation:`Balanced: clockwise torque = anticlockwise torque. ${m1} g × ${d1} = m g × ${d2}, so m = ${m1*d1} ÷ ${d2} = ${m2} kg (g cancels).`};
  return {cloze:`A uniform seesaw is balanced on a pivot at its centre.\n${an(m1)} ${m1} kg ${who[0]} sits ${d1} m from the pivot on one side.\n${an(m2)} ${m2} kg ${who[1]} sits on the other side and it stays level.\nFind how far the ${m2} kg ${who[1]} is from the pivot: ____ m`,answer:String(d2),answerUnit:'m',
   explanation:`Balanced: ${m1} g × ${d1} = ${m2} g × d, so d = ${m1*d1} ÷ ${m2} = ${d2} m (g cancels).`};});

 A('L5-M32','Balanced beam with weights hung from it',(r,h)=>{
  const F1=h.pick([10,20,30,40],r),d1=h.pick([0.5,1,1.5,2],r),d2=h.pick([0.25,0.5,1,2],r),F2=R(F1*d1/d2);
  if(!ok3(F2)||d1===d2)return {cloze:`A light rod is balanced on a pivot. A 20 N weight hangs 1 m from the pivot on the left.\nA second weight hangs 0.5 m from the pivot on the right.\nFind the size of the second weight: ____ N`,answer:'40',answerUnit:'N',explanation:`Clockwise = anticlockwise: 20 × 1 = F × 0.5, so F = 40 N.`};
  return {cloze:`A light rod is balanced horizontally on a pivot.\nA ${F1} N weight hangs ${d1} m from the pivot on the left.\nA second weight hangs ${d2} m from the pivot on the right.\nFind the size of the second weight: ____ N`,answer:h.fmt(F2),answerUnit:'N',
   explanation:`Balanced: ${F1} × ${d1} = F × ${d2}, so F = ${h.fmt(F1*d1)} ÷ ${d2} = ${h.fmt(F2)} N.`};});

 A('L5-M33','Speed in circular motion',(r,h)=>{
  const {rad,T,v}=tries(()=>{const rad=h.pick([10,20,25,30,50,100],r),T=h.pick([10,20,25,40,50,60],r);return {rad,T,v:2*Math.PI*rad/T};},o=>o.v<=15&&o.v>=2);
  const o=h.pick([['A cyclist','rides','a circular track'],['A toy car','drives','a circular track']],r);
  return {cloze:`${o[0]} ${o[1]} at constant speed round ${o[2]} of radius ${rad} m.\nOne lap takes ${T} s.\nFind the speed: ____ m/s`,answer:h.sig3(v),answerUnit:'m/s',
   explanation:`Distance for one lap = circumference = 2πr = 2π × ${rad} = ${Number((2*Math.PI*rad).toPrecision(4))} m. v = d ÷ T = ${Number((2*Math.PI*rad).toPrecision(4))} ÷ ${T} = ${h.sig3(v)} m/s.`};});

 A('L5-M34','Period and frequency',(r,h)=>{
  const n=h.pick([10,12,15,20,30,60],r),t=h.pick([20,30,40,60],r);
  const T=R(t/n),f=R(n/t);
  if(!ok3(T)||!ok3(f))return {cloze:`A fairground ride makes 10 revolutions in 40 s.\nFind the period of the ride: ____ s`,answer:'4',answerUnit:'s',explanation:`T = time ÷ revolutions = 40 ÷ 10 = 4 s.`};
  const o=h.pick(['A turntable','A fairground ride','A fan blade','A toy on a string'],r);
  if(h.int(0,1,r)===0)return {cloze:`${o} makes ${n} revolutions in ${t} s.\nFind the period (time for one revolution): ____ s`,answer:h.fmt(T),answerUnit:'s',explanation:`T = time ÷ revolutions = ${t} ÷ ${n} = ${h.fmt(T)} s.`};
  return {cloze:`${o} makes ${n} revolutions in ${t} s.\nFind its frequency: ____ Hz`,answer:h.fmt(f),answerUnit:'Hz',explanation:`f = revolutions ÷ time = ${n} ÷ ${t} = ${h.fmt(f)} Hz.`};});

 A('L5-M35','Centripetal acceleration',(r,h)=>{
  const {v,rad,a,o}=tries(()=>{const o=h.pick([['A bike','rides round a circular track',[4,6,8,10,12]],['A car','goes round a roundabout',[4,6,8,10,12,15,20]],['A runner','runs round a circular track',[4,5,6,8]]],r),v=h.pick(o[2],r),rad=h.pick([4,5,8,10,20,25,40,50],r);return {o,v,rad,a:R(v*v/rad)};},q=>ok3(q.a)&&q.a<=10&&q.rad>=q.v*0.5);
  if(!ok3(a))return {cloze:`A bike rides at 10 m/s round a circular track of radius 20 m.\nFind its centripetal acceleration: ____ m/s²`,answer:'5',answerUnit:'m/s²',explanation:`a = v² ÷ r = 10² ÷ 20 = 5 m/s².`};
  return {cloze:`${o[0]} travelling at a constant ${v} m/s ${o[1]}\nof radius ${rad} m.\nFind its acceleration towards the centre: ____ m/s²`,answer:h.fmt(a),answerUnit:'m/s²',
   explanation:`a = v² ÷ r = ${v}² ÷ ${rad} = ${h.fmt(a)} m/s², directed towards the centre.`};});

 A('L5-M36','Friction as centripetal force',(r,h)=>{
  const {m,v,rad,F}=tries(()=>{const m=h.pick([800,1000,1200,1500],r),v=h.pick([10,12,15,20],r),rad=h.pick([20,25,40,50,100],r);return {m,v,rad,F:R(m*v*v/rad)};},o=>ok3(o.F)&&o.v*o.v/o.rad<=6);
  return {cloze:`${an(m)} ${m} kg car goes round a flat circular bend of radius ${rad} m\nat a constant ${v} m/s. Friction between the tyres and road\nprovides the centripetal force.\nFind the friction force needed: ____ N`,answer:h.fmt(F),answerUnit:'N',
   explanation:`F = mv² ÷ r = ${m} × ${v}² ÷ ${rad} = ${h.fmt(F)} N, towards the centre of the bend.`};});

 A('L5-M37','Tension as centripetal force',(r,h)=>{
  const {m,v,rad,F}=tries(()=>{const m=h.pick([0.1,0.2,0.25,0.5,1,2],r),v=h.pick([2,3,4,5,6,8],r),rad=h.pick([0.5,1,1.5,2,2.5],r);return {m,v,rad,F:R(m*v*v/rad)};},o=>ok3(o.F)&&o.F<=100);
  const grams=m<1;
  const ms=grams?`${m*1000} g`:`${m} kg`;
  const unitNote=grams?` (${m*1000} g = ${m} kg)`:'';
  return {cloze:`A ${ms} ball on a string moves in a circle of radius ${rad} m\non a smooth horizontal table at a constant ${v} m/s.\nFind the tension in the string: ____ N`,answer:h.fmt(F),answerUnit:'N',
   explanation:`The tension is the centripetal force. F = mv² ÷ r = ${m} × ${v}² ÷ ${rad} = ${h.fmt(F)} N${unitNote}.`};});

 A('L5-M38','Lift: force from the floor (two steps)',(r,h)=>{
  const m=h.pick([50,60,70,80],r),a=h.pick([1,2,2.5,0.5],r),up=h.int(0,1,r)===0;
  const N=R(m*(up?10+a:10-a));
  const dirw=up?'upwards':'downwards';
  return {cloze:`${an(m)} ${m} kg person stands on the floor of a lift that is\naccelerating ${dirw} at ${a} m/s². g = 10 N/kg.\nFind the force the floor exerts on the person: ____ N`,answer:h.fmt(N),answerUnit:'N',
   explanation:up?`Weight = mg = ${m*10} N down. Net force up = ma = ${m} × ${a} = ${m*a} N. N − ${m*10} = ${m*a}, so N = ${h.fmt(N)} N.`:`Weight = mg = ${m*10} N down. Net force down = ma = ${m} × ${a} = ${m*a} N. ${m*10} − N = ${m*a}, so N = ${h.fmt(N)} N.`};});

 A('L5-M39','Constant speed: balanced forces',(r,h)=>{
  const f=h.pick([200,300,400,500,800],r),m=h.pick([800,1000,1200,1500],r);
  return {cloze:`${an(m)} ${m} kg car travels along a straight road at a constant speed.\nThe resistive forces on it total ${f} N.\nFind the driving force from the engine: ____ N`,answer:String(f),answerUnit:'N',
   explanation:`Constant speed means a = 0, so the net force is zero. Driving force = resistive force = ${f} N.`};});
})();
