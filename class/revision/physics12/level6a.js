/* Level 4 (Calculate, choose the equation) – MECHANICS. Givens only, no equation, no story. g = 9.8 N/kg (as on the course formula sheet). */
(()=>{
 const T='Mechanics',U='kg·m/s';
 const fmt=n=>String(Number(Number(n).toPrecision(6)));
 const ex3=v=>Math.abs(Number(v.toPrecision(3))-v)<=1e-9*Math.abs(v);       // value has at most 3 s.f.
 const nice=v=>Number.isFinite(v)&&v>0&&ex3(v);
 const G=(s,v,u)=>`${s} = ${fmt(v)} ${u}`;
 const L=(...xs)=>xs.filter(Boolean).join('\n');
 const find=(r,n,fn,fb)=>{for(let i=0;i<n;i++){const o=fn();if(o)return o;}return fb();};
 const add=(id,skill,gen)=>Physics12.add(6,{id,topic:T,skill,gen});

 /* ---------- X = Y × Z families (F=ma, p=mv, impulse, work, torque) ---------- */
 function prod(id,skill,unknowns,c){
  add(id,skill,(r,h)=>{
   const y=h.int(c.y[0],c.y[1],r),z=h.int(c.z[0],c.z[1],r),x=y*z;
   const vals=[x,y,z],S=c.s,N=c.n,Un=c.u,eq=c.eq;
   const k=h.pick(unknowns,r);
   const given=[0,1,2].filter(i=>i!==k).map(i=>G(S[i],vals[i],Un[i]));
   const cloze=L(h.pick(c.ctx,r),...given,`${N[k]} ${S[k]} = ____ ${Un[k]}`);
   let ex;
   if(k===0)ex=`${N[0]} = product of the other two: ${eq}. ${S[0]} = ${fmt(y)} × ${fmt(z)} = ${fmt(x)} ${Un[0]}.`;
   else{const o=k===1?2:1;ex=`${eq}, rearranged: ${S[k]} = ${S[0]} ÷ ${S[o]} = ${fmt(x)} ÷ ${fmt(vals[o])} = ${fmt(vals[k])} ${Un[k]}.`;}
   return {cloze,answer:fmt(vals[k]),answerUnit:Un[k],explanation:ex};
  });
 }
 prod('L6-M01','Newton’s second law',[0],{y:[2,12],z:[1,8],s:['F','m','a'],n:['Net force','Mass','Acceleration'],u:['N','kg','m/s²'],eq:'F = ma',ctx:['A trolley:','A box:','A cart:']});
 prod('L6-M02','Newton’s second law (rearranged)',[1,2],{y:[2,12],z:[1,8],s:['F','m','a'],n:['Net force','Mass','Acceleration'],u:['N','kg','m/s²'],eq:'F = ma',ctx:['A trolley:','A box:','A cart:']});
 prod('L6-M03','Momentum',[0],{y:[1,20],z:[1,15],s:['p','m','v'],n:['Momentum','Mass','Velocity'],u:[U,'kg','m/s'],eq:'p = mv',ctx:['A trolley:','A moving object:','A cart:']});
 prod('L6-M04','Momentum (rearranged)',[1,2],{y:[1,20],z:[1,15],s:['p','m','v'],n:['Momentum','Mass','Velocity'],u:[U,'kg','m/s'],eq:'p = mv',ctx:['A trolley:','A moving object:','A cart:']});
 prod('L6-M05','Impulse = FΔt',[0],{y:[5,60],z:[1,10],s:['Δp','F','Δt'],n:['Impulse','Force','Time'],u:[U,'N','s'],eq:'Δp = FΔt',ctx:['A force on a trolley:','A kick:','A push:']});
 prod('L6-M06','Impulse = FΔt (rearranged)',[1,2],{y:[5,60],z:[1,10],s:['Δp','F','Δt'],n:['Impulse','Force','Time'],u:[U,'N','s'],eq:'Δp = FΔt',ctx:['A force on a trolley:','A kick:','A push:']});
 prod('L6-M07','Work done',[0],{y:[5,80],z:[2,20],s:['W','F','d'],n:['Work done','Force','Distance moved'],u:['J','N','m'],eq:'W = Fd',ctx:['A pushed crate:','A pulled sled:']});
 prod('L6-M08','Work done (rearranged)',[1,2],{y:[5,80],z:[2,20],s:['W','F','d'],n:['Work done','Force','Distance moved'],u:['J','N','m'],eq:'W = Fd',ctx:['A pushed crate:','A pulled sled:']});
 prod('L6-M09','Torque',[0,1,2],{y:[5,60],z:[1,9],s:['τ','F','d'],n:['Torque','Force','Distance from pivot'],u:['N·m','N','m'],eq:'τ = Fd',ctx:['A lever:','A beam on a pivot:']});

 /* ---------- constant speed ---------- */
 add('L6-M10','Speed, distance, time',(r,h)=>{
  const v=h.int(2,25,r),t=h.int(2,20,r),d=v*t,k=h.int(0,2,r);
  if(k===0)return {cloze:L(G('d',d,'m'),G('t',t,'s'),'Speed v = ____ m/s'),answer:v,answerUnit:'m/s',explanation:`Constant speed: v = d/t = ${d} ÷ ${t} = ${v} m/s.`};
  if(k===1)return {cloze:L(G('v',v,'m/s'),G('t',t,'s'),'Distance d = ____ m'),answer:d,answerUnit:'m',explanation:`Constant speed: d = vt = ${v} × ${t} = ${d} m.`};
  return {cloze:L(G('d',d,'m'),G('v',v,'m/s'),'Time t = ____ s'),answer:t,answerUnit:'s',explanation:`Constant speed: t = d/v = ${d} ÷ ${v} = ${t} s.`};
 });
 add('L6-M11','Speed with unit conversion',(r,h)=>{
  const k=h.int(0,2,r);
  if(k===0){const v=h.pick([18,36,54,72,90,108],r),t=h.int(2,12,r),d=v/3.6*t;
   return {cloze:L(G('v',v,'km/h'),G('t',t,'s'),'Distance d = ____ m'),answer:fmt(d),answerUnit:'m',explanation:`Convert: ${v} km/h ÷ 3.6 = ${fmt(v/3.6)} m/s. d = vt = ${fmt(v/3.6)} × ${t} = ${fmt(d)} m.`};}
  if(k===1){const d=h.int(1,12,r)*100,t=h.pick([10,20,25,40,50],r),v=d/t*3.6;
   return {cloze:L(G('d',d,'m'),G('t',t,'s'),'Speed v = ____ km/h'),answer:fmt(v),answerUnit:'km/h',explanation:`v = d/t = ${d} ÷ ${t} = ${fmt(d/t)} m/s. × 3.6 → ${fmt(v)} km/h.`};}
  const v=h.pick([36,54,72,90,108],r),d=h.int(2,9,r)*100,t=d/(v/3.6);
  return {cloze:L(G('d',d,'m'),G('v',v,'km/h'),'Time t = ____ s'),answer:fmt(t),answerUnit:'s',explanation:`${v} km/h ÷ 3.6 = ${fmt(v/3.6)} m/s. t = d/v = ${d} ÷ ${fmt(v/3.6)} = ${fmt(t)} s.`};
 });

 /* ---------- uniform acceleration: choose the SUVAT form ---------- */
 add('L6-M12','a = Δv/t',(r,h)=>{
  const a=h.int(1,8,r),t=h.int(2,10,r),vi=h.int(0,15,r),vf=vi+a*t,k=h.int(0,1,r),dec=r()<.3;
  if(dec){const f=h.int(10,30,r),b=h.int(2,5,r),tt=f/b;
   if(Number.isInteger(tt))return {cloze:L('Slowing to a stop:',G('v_i',f,'m/s'),G('v_f',0,'m/s'),G('t',tt,'s'),'Acceleration a = ____ m/s²'),answer:-b,answerUnit:'m/s²',explanation:`a = Δv/t = (v_f − v_i) ÷ t = (0 − ${f}) ÷ ${tt} = −${b} m/s².`};}
  if(k===0)return {cloze:L(G('v_i',vi,'m/s'),G('v_f',vf,'m/s'),G('t',t,'s'),'Acceleration a = ____ m/s²'),answer:a,answerUnit:'m/s²',explanation:`a = Δv/t = (v_f − v_i) ÷ t = (${vf} − ${vi}) ÷ ${t} = ${a} m/s².`};
  return {cloze:L(G('v_i',vi,'m/s'),G('v_f',vf,'m/s'),G('a',a,'m/s²'),'Time t = ____ s'),answer:t,answerUnit:'s',explanation:`a = Δv/t, so t = Δv/a = (${vf} − ${vi}) ÷ ${a} = ${t} s.`};
 });
 add('L6-M13','Kinematics: no distance involved',(r,h)=>{
  const vi=h.int(0,12,r),a=h.int(1,6,r),t=h.int(2,9,r),vf=vi+a*t,k=h.int(0,3,r);
  const all={vi:G('v_i',vi,'m/s'),vf:G('v_f',vf,'m/s'),a:G('a',a,'m/s²'),t:G('t',t,'s')};
  const ex=`No d given and no d wanted → v_f = v_i + at`;
  if(k===0)return {cloze:L(all.vi,all.a,all.t,'Final speed v_f = ____ m/s'),answer:vf,answerUnit:'m/s',explanation:`${ex}: v_f = ${vi} + ${a} × ${t} = ${vf} m/s.`};
  if(k===1)return {cloze:L(all.vi,all.vf,all.t,'Acceleration a = ____ m/s²'),answer:a,answerUnit:'m/s²',explanation:`${ex}, i.e. a = (v_f − v_i)/t = (${vf} − ${vi}) ÷ ${t} = ${a} m/s².`};
  if(k===2)return {cloze:L(all.vi,all.vf,all.a,'Time t = ____ s'),answer:t,answerUnit:'s',explanation:`${ex}: t = (v_f − v_i)/a = (${vf} − ${vi}) ÷ ${a} = ${t} s.`};
  return {cloze:L(all.vf,all.a,all.t,'Initial speed v_i = ____ m/s'),answer:vi,answerUnit:'m/s',explanation:`${ex}: v_i = v_f − at = ${vf} − ${a} × ${t} = ${vi} m/s.`};
 });
 add('L6-M14','Kinematics: no final speed',(r,h)=>{
  const vi=h.int(1,10,r),a=h.int(1,5,r),t=h.int(2,8,r),d=vi*t+0.5*a*t*t,k=h.int(0,2,r);
  const ex='v_f is not given or wanted → d = v_i t + ½at²';
  if(k===0)return {cloze:L(G('v_i',vi,'m/s'),G('a',a,'m/s²'),G('t',t,'s'),'Distance d = ____ m'),answer:fmt(d),answerUnit:'m',explanation:`${ex}: d = ${vi} × ${t} + ½ × ${a} × ${t}² = ${fmt(d)} m.`};
  if(k===1)return {cloze:L(G('v_i',vi,'m/s'),G('d',d,'m'),G('t',t,'s'),'Acceleration a = ____ m/s²'),answer:a,answerUnit:'m/s²',explanation:`${ex}: ${fmt(d)} = ${vi} × ${t} + ½a × ${t}² → a = ${a} m/s².`};
  return {cloze:L(G('a',a,'m/s²'),G('d',d,'m'),G('t',t,'s'),'Initial speed v_i = ____ m/s'),answer:vi,answerUnit:'m/s',explanation:`${ex}: ${fmt(d)} = v_i × ${t} + ½ × ${a} × ${t}² → v_i = ${vi} m/s.`};
 });
 add('L6-M15','Kinematics: no acceleration',(r,h)=>{
  const vi=h.int(0,10,r),vf=vi+h.int(2,12,r),t=h.int(2,10,r),d=(vi+vf)/2*t,k=h.int(0,3,r);
  const ex='a is not given or wanted → d = ½(v_i + v_f)t';
  if(k===0)return {cloze:L(G('v_i',vi,'m/s'),G('v_f',vf,'m/s'),G('t',t,'s'),'Distance d = ____ m'),answer:fmt(d),answerUnit:'m',explanation:`${ex}: d = ½ × (${vi} + ${vf}) × ${t} = ${fmt(d)} m.`};
  if(k===1)return {cloze:L(G('v_i',vi,'m/s'),G('v_f',vf,'m/s'),G('d',d,'m'),'Time t = ____ s'),answer:t,answerUnit:'s',explanation:`${ex}: t = 2d/(v_i + v_f) = ${fmt(2*d)} ÷ ${vi+vf} = ${t} s.`};
  if(k===2)return {cloze:L(G('v_i',vi,'m/s'),G('d',d,'m'),G('t',t,'s'),'Final speed v_f = ____ m/s'),answer:vf,answerUnit:'m/s',explanation:`${ex}: v_f = 2d/t − v_i = ${fmt(2*d)} ÷ ${t} − ${vi} = ${vf} m/s.`};
  return {cloze:L(G('v_f',vf,'m/s'),G('d',d,'m'),G('t',t,'s'),'Initial speed v_i = ____ m/s'),answer:vi,answerUnit:'m/s',explanation:`${ex}: v_i = 2d/t − v_f = ${fmt(2*d)} ÷ ${t} − ${vf} = ${vi} m/s.`};
 });
 add('L6-M16','Kinematics: no time',(r,h)=>{
  const o=find(r,200,()=>{const vi=h.int(0,10,r),vf=vi+h.int(3,14,r),a=h.int(1,6,r),d=(vf*vf-vi*vi)/(2*a);return Number.isInteger(d*2)&&d>=2&&d<=150?{vi,vf,a,d}:null;},()=>({vi:0,vf:12,a:3,d:24}));
  const {vi,vf,a,d}=o,k=h.int(0,3,r),ex='t is not given or wanted → v_f² = v_i² + 2ad';
  if(k===0)return {cloze:L(G('v_i',vi,'m/s'),G('a',a,'m/s²'),G('d',d,'m'),'Final speed v_f = ____ m/s'),answer:vf,answerUnit:'m/s',explanation:`${ex}: v_f² = ${vi}² + 2 × ${a} × ${fmt(d)} = ${vf*vf}, so v_f = ${vf} m/s.`};
  if(k===1)return {cloze:L(G('v_i',vi,'m/s'),G('v_f',vf,'m/s'),G('a',a,'m/s²'),'Distance d = ____ m'),answer:fmt(d),answerUnit:'m',explanation:`${ex}: d = (v_f² − v_i²)/2a = (${vf*vf} − ${vi*vi}) ÷ ${2*a} = ${fmt(d)} m.`};
  if(k===2)return {cloze:L(G('v_i',vi,'m/s'),G('v_f',vf,'m/s'),G('d',d,'m'),'Acceleration a = ____ m/s²'),answer:a,answerUnit:'m/s²',explanation:`${ex}: a = (v_f² − v_i²)/2d = (${vf*vf} − ${vi*vi}) ÷ ${fmt(2*d)} = ${a} m/s².`};
  return {cloze:L(G('v_f',vf,'m/s'),G('a',a,'m/s²'),G('d',d,'m'),'Initial speed v_i = ____ m/s'),answer:vi,answerUnit:'m/s',explanation:`${ex}: v_i² = v_f² − 2ad = ${vf*vf} − ${fmt(2*a*d)} = ${vi*vi}, so v_i = ${vi} m/s.`};
 });
 add('L6-M17','Kinematics: starts from rest',(r,h)=>{
  const k=h.int(0,3,r);
  if(k===0){const a=h.int(1,6,r),t=h.int(2,8,r),d=0.5*a*t*t;
   return {cloze:L('Starts from rest:',G('d',d,'m'),G('t',t,'s'),'Acceleration a = ____ m/s²'),answer:a,answerUnit:'m/s²',explanation:`From rest (v_i = 0), no v_f → d = ½at², so a = 2d/t² = ${fmt(2*d)} ÷ ${t*t} = ${a} m/s².`};}
  if(k===1){const a=h.int(1,6,r),t=h.int(2,8,r),d=0.5*a*t*t;
   return {cloze:L('Starts from rest:',G('a',a,'m/s²'),G('t',t,'s'),'Distance d = ____ m'),answer:fmt(d),answerUnit:'m',explanation:`From rest (v_i = 0) → d = ½at² = ½ × ${a} × ${t}² = ${fmt(d)} m.`};}
  const o=find(r,200,()=>{const a=h.int(1,6,r),vf=h.int(4,20,r),d=vf*vf/(2*a);return Number.isInteger(d*2)&&d>=2&&d<=150?{a,vf,d}:null;},()=>({a:2,vf:8,d:16}));
  if(k===2)return {cloze:L('Starts from rest:',G('a',o.a,'m/s²'),G('d',o.d,'m'),'Final speed v_f = ____ m/s'),answer:o.vf,answerUnit:'m/s',explanation:`From rest, no t → v_f² = v_i² + 2ad = 0 + 2 × ${o.a} × ${fmt(o.d)} = ${o.vf*o.vf}, so v_f = ${o.vf} m/s.`};
  return {cloze:L('Starts from rest:',G('v_f',o.vf,'m/s'),G('d',o.d,'m'),'Acceleration a = ____ m/s²'),answer:o.a,answerUnit:'m/s²',explanation:`From rest, no t → v_f² = 2ad, so a = v_f²/2d = ${o.vf*o.vf} ÷ ${fmt(2*o.d)} = ${o.a} m/s².`};
 });
 add('L6-M18','Braking to rest: distance or time',(r,h)=>{
  const o=find(r,200,()=>{const vi=h.int(4,30,r),b=h.int(2,8,r),d=vi*vi/(2*b),t=vi/b;return ex3(d)&&ex3(t)&&d>=2?{vi,b,d,t}:null;},()=>({vi:20,b:4,d:50,t:5}));
  const base=[G('v_i',o.vi,'m/s'),G('v_f',0,'m/s'),G('a',-o.b,'m/s²')];
  if(r()<.5)return {cloze:L('A vehicle brakes to a stop:',...base,'Stopping distance d = ____ m'),answer:fmt(o.d),answerUnit:'m',explanation:`No time given → v_f² = v_i² + 2ad: 0 = ${o.vi}² + 2 × (−${o.b}) × d, so d = ${o.vi*o.vi} ÷ ${2*o.b} = ${fmt(o.d)} m.`};
  return {cloze:L('A vehicle brakes to a stop:',...base,'Stopping time t = ____ s'),answer:fmt(o.t),answerUnit:'s',explanation:`No distance wanted → v_f = v_i + at: 0 = ${o.vi} + (−${o.b})t, so t = ${o.vi} ÷ ${o.b} = ${fmt(o.t)} s.`};
 });

 /* ---------- weight, spring ---------- */
 add('L6-M19','Weight',(r,h)=>{
  const gp=h.pick([['',9.8],['On the Moon:',1.6],['On Mars:',3.7]],r),g=gp[1],inG=r()<.3;
  const m=inG?h.pick([200,250,500,750],r):h.int(2,80,r),W=(inG?m/1000:m)*g;
  return {cloze:L(gp[0],G('m',m,inG?'g':'kg'),G('g',g,'N/kg'),'Weight W = ____ N'),answer:fmt(W),answerUnit:'N',explanation:`Weight W = mg = ${fmt(inG?m/1000:m)} kg × ${g} N/kg = ${fmt(W)} N.${inG?' (Convert grams to kg first: ÷ 1000.)':''}`};
 });
 add('L6-M20','Weight (rearranged)',(r,h)=>{
  const gp=h.pick([['',9.8],['On the Moon:',1.6],['On Mars:',3.7]],r),g=gp[1],m=h.int(2,60,r),W=m*g,k=h.int(0,1,r);
  if(k===0)return {cloze:L(gp[0],G('W',W,'N'),G('g',g,'N/kg'),'Mass m = ____ kg'),answer:m,answerUnit:'kg',explanation:`W = mg, so m = W/g = ${fmt(W)} ÷ ${g} = ${m} kg.`};
  return {cloze:L('A planet:',G('m',m,'kg'),G('W',W,'N'),'Field strength g = ____ N/kg'),answer:g,answerUnit:'N/kg',explanation:`W = mg, so g = W/m = ${fmt(W)} ÷ ${m} = ${g} N/kg.`};
 });
 add('L6-M21','Hooke’s law: force',(r,h)=>{
  const k=h.int(2,40,r)*5,x=h.int(2,20,r),F=k*x/100;
  return {cloze:L('A spring:',G('k',k,'N/m'),G('x',x,'cm'),'Force F = ____ N'),answer:fmt(F),answerUnit:'N',explanation:`Hooke’s law F = kx. Convert ${x} cm = ${fmt(x/100)} m. F = ${k} × ${fmt(x/100)} = ${fmt(F)} N.`};
 });
 add('L6-M22','Hooke’s law (rearranged)',(r,h)=>{
  const k=h.int(2,40,r)*5,xc=h.int(2,20,r),F=k*xc/100,q=h.int(0,2,r);
  if(q===0)return {cloze:L('A spring:',G('F',F,'N'),G('x',xc,'cm'),'Spring constant k = ____ N/m'),answer:k,answerUnit:'N/m',explanation:`F = kx, so k = F/x = ${fmt(F)} N ÷ ${fmt(xc/100)} m = ${k} N/m.`};
  if(q===1)return {cloze:L('A spring:',G('F',F,'N'),G('k',k,'N/m'),'Extension x = ____ cm'),answer:xc,answerUnit:'cm',explanation:`F = kx, so x = F/k = ${fmt(F)} ÷ ${k} = ${fmt(xc/100)} m = ${xc} cm.`};
  return {cloze:L('A spring:',G('F',F,'N'),G('k',k,'N/m'),'Extension x = ____ m'),answer:fmt(xc/100),answerUnit:'m',explanation:`F = kx, so x = F/k = ${fmt(F)} ÷ ${k} = ${fmt(xc/100)} m.`};
 });
 add('L6-M23','Elastic potential energy',(r,h)=>{
  const o=find(r,200,()=>{const k=h.int(2,40,r)*10,x=h.int(2,20,r),E=0.5*k*x*x/1e4;return ex3(E)?{k,x,E}:null;},()=>({k:200,x:10,E:1}));
  if(r()<.55)return {cloze:L('A stretched spring:',G('k',o.k,'N/m'),G('x',o.x,'cm'),'Stored energy Eₚ = ____ J'),answer:fmt(o.E),answerUnit:'J',explanation:`Elastic Eₚ = ½kx², x = ${fmt(o.x/100)} m: Eₚ = ½ × ${o.k} × ${fmt(o.x/100)}² = ${fmt(o.E)} J.`};
  return {cloze:L('A stretched spring:',G('k',o.k,'N/m'),G('Eₚ',o.E,'J'),'Extension x = ____ cm'),answer:o.x,answerUnit:'cm',explanation:`Eₚ = ½kx², so x² = 2Eₚ/k = ${fmt(2*o.E)} ÷ ${o.k} = ${fmt(2*o.E/o.k)}, x = ${fmt(o.x/100)} m = ${o.x} cm.`};
 });

 /* ---------- impulse from velocities, momentum conservation ---------- */
 add('L6-M24','Change in momentum',(r,h)=>{
  const m=h.pick([0.2,0.5,1,2,4,5],r),vi=h.int(2,12,r),bounce=r()<.5,vf=bounce?-h.int(2,10,r):h.int(1,16,r)+(r()<.5?vi:0),dp=m*(vf-vi);
  return {cloze:L(bounce?'Right is +. A ball hits a wall and rebounds:':'Right is +:',G('m',m,'kg'),G('v_i',vi,'m/s'),G('v_f',vf,'m/s'),`Change in momentum Δp = ____ ${U}`),answer:fmt(dp),answerUnit:U,unitAliases:['kg m/s','N s','N·s'],explanation:`Δp = mv_f − mv_i = m(v_f − v_i) = ${fmt(m)} × (${vf} − ${vi}) = ${fmt(dp)} ${U}.`};
 });
 add('L6-M25','Average force from a change in velocity',(r,h)=>{
  const o=find(r,300,()=>{const m=h.pick([0.1,0.2,0.5,1,2,60],r),vi=h.int(2,20,r),vf=r()<.5?-h.int(2,20,r):0,t=h.pick([0.01,0.02,0.05,0.1,0.2,0.5],r),F=Math.abs(m*(vf-vi)/t);return nice(F)&&F<=5000?{m,vi,vf,t,F}:null;},()=>({m:0.5,vi:10,vf:0,t:0.1,F:50}));
  return {cloze:L('Right is +. A moving object is stopped or hit back:',G('m',o.m,'kg'),G('v_i',o.vi,'m/s'),G('v_f',o.vf,'m/s'),G('Δt',o.t,'s'),'Size of average force F = ____ N'),answer:fmt(o.F),answerUnit:'N',explanation:`Δp = FΔt and Δp = m(v_f − v_i), so F = m(v_f − v_i)/Δt = ${fmt(o.m)} × (${o.vf} − ${o.vi}) ÷ ${o.t} → size ${fmt(o.F)} N.`};
 });
 add('L6-M26','Collision: stick together, one at rest',(r,h)=>{
  const o=find(r,300,()=>{const m1=h.int(1,6,r),m2=h.int(1,6,r),v=h.int(1,6,r),v1=v*(m1+m2)/m1;return Number.isInteger(v1)&&v1<=30?{m1,m2,v,v1}:null;},()=>({m1:2,m2:2,v:3,v1:6}));
  if(r()<.65)return {cloze:L('Two trolleys collide and stick:',G('m₁',o.m1,'kg'),G('v₁',o.v1,'m/s'),G('m₂',o.m2,'kg')+' (at rest)','Speed after v = ____ m/s'),answer:o.v,answerUnit:'m/s',explanation:`Momentum is conserved: m₁v₁ = (m₁ + m₂)v. v = ${o.m1*o.v1} ÷ ${o.m1+o.m2} = ${o.v} m/s.`};
  return {cloze:L('Two trolleys collide and stick:',G('m₁',o.m1,'kg'),G('v₁',o.v1,'m/s'),G('v',o.v,'m/s')+' (after)','Mass m₂ (at rest) = ____ kg'),answer:o.m2,answerUnit:'kg',explanation:`Momentum is conserved: m₁v₁ = (m₁ + m₂)v → ${o.m1*o.v1} = (${o.m1} + m₂) × ${o.v}, so m₂ = ${o.m2} kg.`};
 });
 add('L6-M27','Collision: stick together, both moving',(r,h)=>{
  const head=r()<.4;
  const o=find(r,500,()=>{const m1=h.int(1,6,r),m2=h.int(1,6,r),v1=h.int(2,10,r),v2=head?-h.int(1,8,r):h.int(1,v1-1>0?v1-1:1,r),v=(m1*v1+m2*v2)/(m1+m2);return ex3(v)&&v!==0&&Math.abs(v)<=20?{m1,m2,v1,v2,v}:null;},()=>({m1:2,m2:1,v1:6,v2:3,v:5}));
  return {cloze:L(head?'Right is +. Two trolleys collide head-on and stick:':'Two trolleys travelling the same way collide and stick:',G('m₁',o.m1,'kg')+'   '+G('v₁',o.v1,'m/s'),G('m₂',o.m2,'kg')+'   '+G('v₂',o.v2,'m/s'),`Velocity after v = ____ m/s`),answer:fmt(o.v),answerUnit:'m/s',explanation:`Momentum is conserved: m₁v₁ + m₂v₂ = (m₁ + m₂)v. ${o.m1*o.v1} + ${o.m2*o.v2} = ${o.m1+o.m2}v, so v = ${fmt(o.v)} m/s.`};
 });
 add('L6-M28','Recoil: push apart from rest',(r,h)=>{
  const o=find(r,300,()=>{const m1=h.int(8,16,r)*5,v1=h.int(1,6,r),m2=h.int(8,16,r)*5,v2=m1*v1/m2;return m1!==m2&&nice(v2)&&v2<=30?{m1,v1,m2,v2}:null;},()=>({m1:40,v1:3,m2:60,v2:2}));
  return {cloze:L('Two skaters at rest push apart:',G('m₁',o.m1,'kg')+'   '+G('v₁',o.v1,'m/s'),G('m₂',o.m2,'kg'),'Speed of skater 2 = ____ m/s'),answer:fmt(o.v2),answerUnit:'m/s',explanation:`Total momentum stays 0, so m₁v₁ = m₂v₂ (opposite directions). v₂ = ${o.m1*o.v1} ÷ ${o.m2} = ${fmt(o.v2)} m/s.`};
 });
 add('L6-M29','Collision: object hit from rest',(r,h)=>{
  const o=find(r,500,()=>{const m1=h.int(1,6,r),v1=h.int(3,12,r),w=r()<.5?-h.int(1,4,r):h.int(0,2,r),m2=h.int(1,6,r),v2=m1*(v1-w)/m2;return nice(v2)&&v2<=20&&v2>w&&m1*v1*v1>=m1*w*w+m2*v2*v2-1e-9?{m1,v1,w,m2,v2}:null;},()=>({m1:2,v1:6,w:0,m2:3,v2:4}));
  return {cloze:L('Right is +. A moving trolley hits one at rest:',G('m₁',o.m1,'kg')+'   '+G('v₁',o.v1,'m/s'),G('m₂',o.m2,'kg')+'   (at rest)',G('Trolley 1 after',o.w,'m/s'),'Trolley 2 after = ____ m/s'),answer:fmt(o.v2),answerUnit:'m/s',explanation:`Momentum is conserved: m₁v₁ = m₁v₁′ + m₂v₂′. ${o.m1*o.v1} = ${fmt(o.m1*o.w)} + ${o.m2}v₂′, so v₂′ = ${fmt(o.v2)} m/s.`};
 });

 /* ---------- energy, power ---------- */
 add('L6-M30','Kinetic energy',(r,h)=>{
  const k=h.int(0,2,r),m=h.int(1,20,r),v=h.int(2,12,r),E=0.5*m*v*v;
  if(k===0){const inG=r()<.3,mm=inG?h.pick([100,200,400,500],r):m,Ek=0.5*(inG?mm/1000:mm)*v*v;
   return {cloze:L('A moving object:',G('m',mm,inG?'g':'kg'),G('v',v,'m/s'),'Kinetic energy Eₖ = ____ J'),answer:fmt(Ek),answerUnit:'J',explanation:`Eₖ = ½mv² = ½ × ${fmt(inG?mm/1000:mm)} × ${v}² = ${fmt(Ek)} J.${inG?' (Grams → kg: ÷ 1000.)':''}`};}
  if(k===1)return {cloze:L('A moving trolley:',G('m',m,'kg'),G('Eₖ',E,'J'),'Speed v = ____ m/s'),answer:v,answerUnit:'m/s',explanation:`Eₖ = ½mv², so v² = 2Eₖ/m = ${fmt(2*E)} ÷ ${m} = ${v*v}, v = ${v} m/s.`};
  return {cloze:L('A moving trolley:',G('v',v,'m/s'),G('Eₖ',E,'J'),'Mass m = ____ kg'),answer:m,answerUnit:'kg',explanation:`Eₖ = ½mv², so m = 2Eₖ/v² = ${fmt(2*E)} ÷ ${v*v} = ${m} kg.`};
 });
 add('L6-M31','Gravitational potential energy',(r,h)=>{
  const o=find(r,300,()=>{const m=h.int(1,40,r),hh=h.int(1,30,r),E=m*9.8*hh;return ex3(E)?{m,hh,E}:null;},()=>({m:5,hh:4,E:196}));
  const k=h.int(0,2,r),g=G('g',9.8,'N/kg');
  if(k===0)return {cloze:L('A lifted object:',G('m',o.m,'kg'),G('Δh',o.hh,'m'),g,'Gain in Eₚ = ____ J'),answer:fmt(o.E),answerUnit:'J',explanation:`ΔEₚ = mgΔh = ${o.m} × 9.8 × ${o.hh} = ${fmt(o.E)} J.`};
  if(k===1)return {cloze:L('A lifted object:',G('m',o.m,'kg'),G('ΔEₚ',o.E,'J'),g,'Height gained Δh = ____ m'),answer:o.hh,answerUnit:'m',explanation:`ΔEₚ = mgΔh, so Δh = ΔEₚ/mg = ${fmt(o.E)} ÷ (${o.m} × 9.8) = ${o.hh} m.`};
  return {cloze:L('A lifted object:',G('Δh',o.hh,'m'),G('ΔEₚ',o.E,'J'),g,'Mass m = ____ kg'),answer:o.m,answerUnit:'kg',explanation:`ΔEₚ = mgΔh, so m = ΔEₚ/gΔh = ${fmt(o.E)} ÷ (9.8 × ${o.hh}) = ${o.m} kg.`};
 });
 add('L6-M32','Energy conservation: speed from a drop',(r,h)=>{
  const o=h.pick([[7,2.5],[14,10],[21,22.5],[28,40]],r),v=o[0],hh=o[1];
  if(r()<.6)return {cloze:L('Dropped, no friction:',G('Δh',hh,'m'),G('g',9.8,'N/kg'),'Speed at the bottom v = ____ m/s'),answer:v,answerUnit:'m/s',explanation:`Eₚ lost = Eₖ gained: mgΔh = ½mv², so v² = 2gΔh = 2 × 9.8 × ${hh} = ${v*v}. The mass cancels. v = ${v} m/s.`};
  return {cloze:L('Dropped, no friction:',G('v',v,'m/s')+' at the bottom',G('g',9.8,'N/kg'),'Height dropped Δh = ____ m'),answer:hh,answerUnit:'m',explanation:`Eₚ lost = Eₖ gained: mgΔh = ½mv², so Δh = v²/2g = ${v*v} ÷ 19.6 = ${hh} m. The mass cancels.`};
 });
 add('L6-M33','Power = work ÷ time',(r,h)=>{
  const P=h.int(2,50,r)*5,t=h.int(2,20,r),W=P*t,k=h.int(0,2,r);
  if(k===0)return {cloze:L(G('W',W,'J'),G('t',t,'s'),'Power P = ____ W'),answer:P,answerUnit:'W',explanation:`P = W/t = ${W} ÷ ${t} = ${P} W.`};
  if(k===1)return {cloze:L(G('P',P,'W'),G('t',t,'s'),'Work done W = ____ J'),answer:W,answerUnit:'J',explanation:`P = W/t, so W = Pt = ${P} × ${t} = ${W} J.`};
  return {cloze:L(G('W',W,'J'),G('P',P,'W'),'Time t = ____ s'),answer:t,answerUnit:'s',explanation:`P = W/t, so t = W/P = ${W} ÷ ${P} = ${t} s.`};
 });
 add('L6-M34','Power: two steps',(r,h)=>{
  if(r()<.5){const o=find(r,300,()=>{const F=h.int(5,60,r)*5,d=h.int(2,20,r),t=h.int(2,15,r),P=F*d/t;return ex3(P)?{F,d,t,P}:null;},()=>({F:100,d:10,t:5,P:200}));
   return {cloze:L('A pulled crate:',G('F',o.F,'N'),G('d',o.d,'m'),G('t',o.t,'s'),'Power P = ____ W'),answer:fmt(o.P),answerUnit:'W',explanation:`Work W = Fd = ${o.F} × ${o.d} = ${o.F*o.d} J. Then P = W/t = ${o.F*o.d} ÷ ${o.t} = ${fmt(o.P)} W.`};}
  const o=find(r,300,()=>{const m=h.int(2,60,r),hh=h.int(1,12,r),t=h.int(2,15,r),P=m*9.8*hh/t;return ex3(P)?{m,hh,t,P}:null;},()=>({m:10,hh:5,t:7,P:70}));
  return {cloze:L('A motor lifts a load:',G('m',o.m,'kg'),G('Δh',o.hh,'m'),G('t',o.t,'s'),G('g',9.8,'N/kg'),'Power P = ____ W'),answer:fmt(o.P),answerUnit:'W',explanation:`Work = ΔEₚ = mgΔh = ${o.m} × 9.8 × ${o.hh} = ${fmt(o.m*9.8*o.hh)} J. P = W/t = ${fmt(o.m*9.8*o.hh)} ÷ ${o.t} = ${fmt(o.P)} W.`};
 });
 add('L6-M35','Efficiency',(r,h)=>{
  const eff=h.pick([20,25,40,50,60,75,80],r),inp=h.pick([40,100,200,400,500,800],r),out=eff/100*inp,power=r()<.4,u=power?'W':'J',k=h.int(0,2,r);
  const a=power?['Useful power out','Power in']:['Useful energy out','Energy in'];
  if(k===0)return {cloze:L(G(a[0],out,u),G(a[1],inp,u),'Efficiency = ____ %'),answer:eff,answerUnit:'%',explanation:`Efficiency = useful out ÷ total in × 100 = ${fmt(out)} ÷ ${inp} × 100 = ${eff}%.`};
  if(k===1)return {cloze:L(G(a[1],inp,u),`Efficiency = ${eff} %`,`${a[0]} = ____ ${u}`),answer:fmt(out),answerUnit:u,explanation:`Efficiency = useful out ÷ total in, so useful out = ${eff/100} × ${inp} = ${fmt(out)} ${u}.`};
  return {cloze:L(G(a[0],out,u),`Efficiency = ${eff} %`,`${a[1]} = ____ ${u}`),answer:inp,answerUnit:u,explanation:`Efficiency = useful out ÷ total in, so total in = ${fmt(out)} ÷ ${eff/100} = ${inp} ${u}.`};
 });

 /* ---------- torque balance ---------- */
 add('L6-M36','Torque with unit conversion',(r,h)=>{
  const F=h.int(2,30,r)*5,dc=h.int(2,16,r)*5,tau=F*dc/100;
  return {cloze:L('A spanner:',G('F',F,'N'),G('d',dc,'cm')+' from the pivot','Torque τ = ____ N·m'),answer:fmt(tau),answerUnit:'N·m',unitAliases:['N m'],explanation:`τ = Fd. Convert ${dc} cm = ${fmt(dc/100)} m. τ = ${F} × ${fmt(dc/100)} = ${fmt(tau)} N·m.`};
 });
 add('L6-M37','Torque balance (forces)',(r,h)=>{
  const o=find(r,300,()=>{const F1=h.int(2,20,r)*5,d1=h.int(1,6,r),d2=h.int(1,6,r),F2=F1*d1/d2;return F2!==F1&&ex3(F2)&&Number.isInteger(F2*2)?{F1,d1,d2,F2}:null;},()=>({F1:60,d1:2,d2:3,F2:40}));
  const k=h.int(0,2,r),all=[G('F₁',o.F1,'N'),G('d₁',o.d1,'m'),G('F₂',o.F2,'N'),G('d₂',o.d2,'m')];
  const ctx='A balanced beam (forces on opposite sides of the pivot, distances from the pivot):';
  const ex=`Balanced: clockwise torque = anticlockwise torque, F₁d₁ = F₂d₂.`;
  if(k===0)return {cloze:L('A balanced beam, forces on opposite sides of the pivot:',all[0],all[1],all[3],'F₂ = ____ N'),answer:fmt(o.F2),answerUnit:'N',explanation:`${ex} F₂ = F₁d₁/d₂ = ${o.F1} × ${o.d1} ÷ ${o.d2} = ${fmt(o.F2)} N.`};
  if(k===1)return {cloze:L('A balanced beam, forces on opposite sides of the pivot:',all[0],all[1],all[2],'d₂ = ____ m'),answer:o.d2,answerUnit:'m',explanation:`${ex} d₂ = F₁d₁/F₂ = ${o.F1*o.d1} ÷ ${fmt(o.F2)} = ${o.d2} m.`};
  return {cloze:L('A balanced beam, forces on opposite sides of the pivot:',all[1],all[2],all[3],'F₁ = ____ N'),answer:o.F1,answerUnit:'N',explanation:`${ex} F₁ = F₂d₂/d₁ = ${fmt(o.F2)} × ${o.d2} ÷ ${o.d1} = ${o.F1} N.`};
 });
 add('L6-M38','See-saw with masses',(r,h)=>{
  const o=find(r,300,()=>{const m1=h.int(10,60,r),d1=h.int(1,4,r),d2=h.int(1,4,r),m2=m1*d1/d2;return m2!==m1&&nice(m2)&&Number.isInteger(m2*2)?{m1,d1,d2,m2}:null;},()=>({m1:30,d1:2,d2:3,m2:20}));
  if(r()<.5)return {cloze:L('A see-saw balances level:',G('m₁',o.m1,'kg')+' at '+G('d₁',o.d1,'m'),G('m₂',o.m2,'kg'),'d₂ = ____ m'),answer:o.d2,answerUnit:'m',explanation:`Balanced: m₁g d₁ = m₂g d₂ and g cancels (no need to find weights). d₂ = m₁d₁/m₂ = ${o.m1*o.d1} ÷ ${o.m2} = ${o.d2} m.`};
  return {cloze:L('A see-saw balances level:',G('m₁',o.m1,'kg')+' at '+G('d₁',o.d1,'m'),G('d₂',o.d2,'m'),'m₂ = ____ kg'),answer:fmt(o.m2),answerUnit:'kg',explanation:`Balanced: m₁g d₁ = m₂g d₂ and g cancels. m₂ = m₁d₁/d₂ = ${o.m1*o.d1} ÷ ${o.d2} = ${fmt(o.m2)} kg.`};
 });

 /* ---------- circular motion ---------- */
 add('L6-M39','Circular motion: speed, radius, period',(r,h)=>{
  const R=h.int(2,25,r),Tp=h.int(2,20,r),v=2*Math.PI*R/Tp,k=h.int(0,2,r);
  if(k===0)return {cloze:L('Constant speed in a circle:',G('r',R,'m'),G('T',Tp,'s'),'Speed v = ____ m/s'),answer:h.sig3(v),answerUnit:'m/s',explanation:`One lap is 2πr, taking T: v = 2πr/T = 2π × ${R} ÷ ${Tp} = ${h.sig3(v)} m/s.`};
  if(k===1)return {cloze:L('Constant speed in a circle:',G('r',R,'m'),G('v',h.sig3(v),'m/s'),'Period T = ____ s'),answer:Tp,answerUnit:'s',tolerance:0.02,explanation:`v = 2πr/T, so T = 2πr/v = 2π × ${R} ÷ ${h.sig3(v)} = ${Tp} s.`};
  return {cloze:L('Constant speed in a circle:',G('T',Tp,'s'),G('v',h.sig3(v),'m/s'),'Radius r = ____ m'),answer:R,answerUnit:'m',tolerance:0.02,explanation:`v = 2πr/T, so r = vT/2π = ${h.sig3(v)} × ${Tp} ÷ 2π = ${R} m.`};
 });
 add('L6-M40','Frequency and period',(r,h)=>{
  const k=h.int(0,2,r);
  if(k===0){const f=h.pick([0.5,2,4,5,8,10,20,50,100],r);return {cloze:L('A spinning wheel:',G('f',f,'Hz'),'Period T = ____ s'),answer:fmt(1/f),answerUnit:'s',explanation:`T = 1/f = 1 ÷ ${f} = ${fmt(1/f)} s.`};}
  if(k===1){const T=h.pick([0.1,0.2,0.25,0.5,2,4,5],r);return {cloze:L('A spinning wheel:',G('T',T,'s'),'Frequency f = ____ Hz'),answer:fmt(1/T),answerUnit:'Hz',explanation:`f = 1/T = 1 ÷ ${T} = ${fmt(1/T)} Hz.`};}
  const n=h.pick([10,20,30,60],r),t=h.pick([5,10,15,20,30],r),f=n/t;
  return {cloze:L('A spinning wheel:',`${n} revolutions in ${t} s`,'Frequency f = ____ Hz'),answer:h.sig3(f),answerUnit:'Hz',explanation:`Revolutions per second: f = ${n} ÷ ${t} = ${h.sig3(f)} Hz (= 1/T with T = ${t}/${n} s).`};
 });
 add('L6-M41','Centripetal acceleration',(r,h)=>{
  const o=find(r,300,()=>{const v=h.int(2,25,r),R=h.int(2,50,r),a=v*v/R;return ex3(a)&&a>=0.5&&a<=100?{v,R,a}:null;},()=>({v:10,R:20,a:5}));
  const k=h.int(0,2,r);
  if(k===0)return {cloze:L('A car on a bend:',G('v',o.v,'m/s'),G('r',o.R,'m'),'Acceleration a = ____ m/s²'),answer:fmt(o.a),answerUnit:'m/s²',explanation:`Circular motion: a_c = v²/r = ${o.v}² ÷ ${o.R} = ${fmt(o.a)} m/s² (towards the centre).`};
  if(k===1)return {cloze:L('A car on a bend:',G('v',o.v,'m/s'),G('a',o.a,'m/s²'),'Radius r = ____ m'),answer:o.R,answerUnit:'m',explanation:`a_c = v²/r, so r = v²/a = ${o.v*o.v} ÷ ${fmt(o.a)} = ${o.R} m.`};
  return {cloze:L('A car on a bend:',G('r',o.R,'m'),G('a',o.a,'m/s²'),'Speed v = ____ m/s'),answer:o.v,answerUnit:'m/s',explanation:`a_c = v²/r, so v² = ar = ${fmt(o.a)} × ${o.R} = ${o.v*o.v}, v = ${o.v} m/s.`};
 });
 add('L6-M42','Centripetal force',(r,h)=>{
  const o=find(r,400,()=>{const m=h.int(1,20,r)*(r()<.5?1:50),v=h.int(2,20,r),R=h.int(2,40,r),F=m*v*v/R;return ex3(F)&&F>=1&&F<=20000?{m,v,R,F}:null;},()=>({m:2,v:10,R:5,F:40}));
  const k=h.int(0,2,r);
  if(k===0)return {cloze:L('An object in a circle:',G('m',o.m,'kg'),G('v',o.v,'m/s'),G('r',o.R,'m'),'Net force F = ____ N'),answer:fmt(o.F),answerUnit:'N',explanation:`Net force towards the centre: F_c = mv²/r = ${o.m} × ${o.v}² ÷ ${o.R} = ${fmt(o.F)} N.`};
  if(k===1)return {cloze:L('An object in a circle:',G('m',o.m,'kg'),G('v',o.v,'m/s'),G('F',o.F,'N'),'Radius r = ____ m'),answer:o.R,answerUnit:'m',explanation:`F_c = mv²/r, so r = mv²/F = ${o.m} × ${o.v*o.v} ÷ ${fmt(o.F)} = ${o.R} m.`};
  return {cloze:L('An object in a circle:',G('v',o.v,'m/s'),G('r',o.R,'m'),G('F',o.F,'N'),'Mass m = ____ kg'),answer:o.m,answerUnit:'kg',explanation:`F_c = mv²/r, so m = Fr/v² = ${fmt(o.F)} × ${o.R} ÷ ${o.v*o.v} = ${o.m} kg.`};
 });

 /* ---------- Pythagoras ---------- */
 add('L6-M43','Resultant of perpendicular vectors',(r,h)=>{
  const t=h.pick([[3,4,5],[5,12,13],[8,15,17],[6,8,10]],r),k=h.int(1,6,r),a=t[0]*k,b=t[1]*k,c=t[2]*k,sw=r()<.5,[x,y]=sw?[b,a]:[a,b];
  const s=h.int(0,2,r);
  if(s===0)return {cloze:L('A walk:',G('East',x,'m'),G('then North',y,'m'),'Distance from the start = ____ m'),answer:c,answerUnit:'m',explanation:`East and north are at right angles, so use Pythagoras: √(${x}² + ${y}²) = √${x*x+y*y} = ${c} m.`};
  if(s===1)return {cloze:L('Two forces at right angles:',G('F₁',x,'N'),G('F₂',y,'N'),'Resultant force = ____ N'),answer:c,answerUnit:'N',explanation:`Forces at 90° add by Pythagoras: √(${x}² + ${y}²) = √${x*x+y*y} = ${c} N.`};
  return {cloze:L('A boat on a river:',G('Speed across',x,'m/s'),G('Current along',y,'m/s'),'Speed over the ground = ____ m/s'),answer:c,answerUnit:'m/s',explanation:`The two velocities are at right angles, so use Pythagoras: √(${x}² + ${y}²) = √${x*x+y*y} = ${c} m/s.`};
 });
 add('L6-M44','Missing perpendicular component',(r,h)=>{
  const t=h.pick([[3,4,5],[5,12,13],[8,15,17],[6,8,10]],r),k=h.int(1,6,r),sw=r()<.5,leg=sw?t[1]*k:t[0]*k,other=sw?t[0]*k:t[1]*k,c=t[2]*k;
  return {cloze:L('A force split into two perpendicular parts:',G('Resultant F',c,'N'),G('One part',leg,'N'),'Other part = ____ N'),answer:other,answerUnit:'N',explanation:`Right-angled triangle: c² = a² + b², so b = √(${c}² − ${leg}²) = √${c*c-leg*leg} = ${other} N.`};
 });
})();
