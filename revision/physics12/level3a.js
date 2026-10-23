/* Level 3 (equation given) – MECHANICS. Each spec below is one equation; the unknown is chosen at random
   from `unk`, so the student must rearrange about half the time. Values are built forwards from clean
   numbers and every value must be clean (≤3 s.f.), otherwise the numbers are redrawn.
   g = 9.8 m/s² (as on the course formula sheet; stated in the cloze whenever it is needed). */
(()=>{
 const G='g = 9.8 m/s²';
 const clean=v=>Number.isFinite(v)&&Math.abs(v-Number(v.toPrecision(3)))<=1e-9*Math.max(1,Math.abs(v));
 const mk=(spec)=>Physics12.add(3,{id:spec.id,topic:'Mechanics',skill:spec.skill,gen(r,h){
  const sg=v=>Number(Number(v).toPrecision(3));
  const disp=v=>h.fmt(sg(v)).replace('-','−');
  const dispRaw=v=>h.fmt(v).replace('-','−');
  let vals=null,k=null;
  for(let i=0;i<600;i++){
   const v=spec.make(r,h);if(!v)continue;
   const u=h.pick(spec.unk,r);
   const ok=spec.vars.every(x=>(spec.noClean||[]).includes(x.k)||clean(v[x.k]))&&Math.abs(v[u])>1e-12;
   if(ok){vals=v;k=u;break;}
  }
  if(!vals)throw new Error(spec.id+': could not generate');
  const byK=Object.fromEntries(spec.vars.map(x=>[x.k,x]));
  const conv=[];
  const lines=(spec.fixed||[]).slice();
  const givens=[];
  for(const x of spec.vars){
   if(x.k===k)continue;
   let val=vals[x.k],unit=x.u;
   if(x.alt&&r()<(x.p??0.3)){
    const d=val*x.alt.m;
    if(clean(d)&&d>0&&d<10000){conv.push(`${dispRaw(d)} ${x.alt.u} = ${disp(val)} ${x.u}`);givens.push(`${x.s} = ${dispRaw(d)} ${x.alt.u}`);continue;}
   }
   givens.push(`${x.s} = ${disp(val)} ${unit}`);
  }
  const per=givens.length>4?2:3;
  for(let i=0;i<givens.length;i+=per)lines.push(givens.slice(i,i+per).join('    '));
  const U=byK[k];
  const ans=h.fmt(sg(vals[k]));
  const sub=spec.ex[k].replace(/\{(\w+)\}/g,(m,n,off,str)=>vals[n]===undefined?m:(vals[n]<0&&str[off-1]!=='('?'('+disp(vals[n])+')':disp(vals[n])));
  const out={cloze:[spec.eq,...(spec.note?[spec.note]:[]),...lines,`${U.s} = ____ ${U.u}`].join('\n'),answer:ans,answerUnit:U.au||U.u,
   explanation:(conv.length?'Convert first: '+conv.join('; ')+'. ':'')+`${sub} = ${ans.replace('-','−')} ${U.u}.`};
  if(U.ua)out.unitAliases=U.ua;
  return out;
 }});
 const P=h=>h; // (placeholder to keep helper signature obvious)
 const V=(k,s,u,extra)=>Object.assign({k,s,u},extra||{});
 const pick=(xs,r,h)=>h.pick(xs,r);

 // ---------- kinematics ----------
 mk({id:'L3-M01',skill:'Average speed / velocity v = Δd/Δt',eq:'v = Δd/Δt',unk:['v','d','t'],
  vars:[V('v','v','m/s',{alt:{u:'km/h',m:3.6}}),V('d','Δd','m'),V('t','Δt','s')],
  make:(r,h)=>{const v=h.pick([2,3,4,5,8,10,12,15,20,25,30],r),t=h.pick([2,4,5,8,10,20,30,40,50],r);return{v,t,d:v*t};},
  ex:{v:'v = Δd/Δt = {d} ÷ {t}',d:'Δd = vΔt = {v} × {t}',t:'Δt = Δd/v = {d} ÷ {v}'}});
 mk({id:'L3-M02',skill:'Acceleration a = Δv/Δt',eq:'a = Δv/Δt',unk:['a','dv','t'],
  vars:[V('a','a','m/s²'),V('dv','Δv','m/s',{alt:{u:'km/h',m:3.6}}),V('t','Δt','s')],
  make:(r,h)=>{const a=h.pick([0.5,1,1.5,2,2.5,3,4,5],r),t=h.pick([2,3,4,5,6,8,10],r);return a*t>40?null:{a,t,dv:a*t};},
  ex:{a:'a = Δv/Δt = {dv} ÷ {t}',dv:'Δv = aΔt = {a} × {t}',t:'Δt = Δv/a = {dv} ÷ {a}'}});
 mk({id:'L3-M03',skill:'Distance from average velocity',eq:'d = ½(v_i + v_f)t',unk:['d','vf','vi','t'],
  vars:[V('d','d','m'),V('vi','v_i','m/s'),V('vf','v_f','m/s'),V('t','t','s')],
  make:(r,h)=>{const vi=h.int(0,12,r),vf=h.int(0,20,r),t=h.pick([2,3,4,5,6,8,10],r);if(vi===vf)return null;return{vi,vf,t,d:(vi+vf)/2*t};},
  ex:{d:'d = ½(v_i + v_f)t = ½ × ({vi} + {vf}) × {t}',vf:'v_f = 2d/t − v_i = 2 × {d} ÷ {t} − {vi}',vi:'v_i = 2d/t − v_f = 2 × {d} ÷ {t} − {vf}',t:'t = 2d/(v_i + v_f) = 2 × {d} ÷ ({vi} + {vf})'}});
 mk({id:'L3-M04',skill:'v_f = v_i + at',eq:'v_f = v_i + at',unk:['vf','vi','a','t'],
  vars:[V('vf','v_f','m/s'),V('vi','v_i','m/s'),V('a','a','m/s²'),V('t','t','s')],
  make:(r,h)=>{const vi=h.int(0,20,r),a=h.pick([-4,-3,-2,-1,-0.5,0.5,1,1.5,2,2.5,3,4,5],r),t=h.pick([2,3,4,5,6,8,10],r),vf=vi+a*t;return vf>=0&&vf<=40?{vi,a,t,vf}:null;},
  ex:{vf:'v_f = v_i + at = {vi} + {a} × {t}',vi:'v_i = v_f − at = {vf} − ({a} × {t})',a:'a = (v_f − v_i)/t = ({vf} − {vi}) ÷ {t}',t:'t = (v_f − v_i)/a = ({vf} − {vi}) ÷ {a}'}});
 mk({id:'L3-M05',skill:'d = v_i t + ½at²',eq:'d = v_i t + ½at²',unk:['d','a','vi'],
  vars:[V('d','d','m'),V('vi','v_i','m/s'),V('a','a','m/s²'),V('t','t','s')],
  make:(r,h)=>{const vi=h.int(0,15,r),a=h.pick([-2,-1,0.5,1,2,3,4],r),t=h.pick([2,3,4,5,6,8,10],r),d=vi*t+0.5*a*t*t;return d>0&&vi+a*t>=0&&vi+a*t<=40?{vi,a,t,d}:null;},
  ex:{d:'d = v_i t + ½at² = {vi} × {t} + ½ × {a} × {t}²',a:'a = 2(d − v_i t)/t² = 2 × ({d} − {vi} × {t}) ÷ {t}²',vi:'v_i = (d − ½at²)/t = ({d} − ½ × {a} × {t}²) ÷ {t}'}});
 const sq=(id,unk,skill)=>mk({id,skill,eq:'v_f² = v_i² + 2ad',unk,
  vars:[V('vf','v_f','m/s'),V('vi','v_i','m/s'),V('a','a','m/s²'),V('d','d','m')],
  make:(r,h)=>{const vi=h.int(0,16,r),vf=h.int(0,24,r);if(vi===vf)return null;const m=h.pick([0.5,1,1.5,2,2.5,3,4,5],r),a=vf>vi?m:-m;return{vi,vf,a,d:(vf*vf-vi*vi)/(2*a)};},
  ex:{vf:'v_f = √(v_i² + 2ad) = √({vi}² + 2 × {a} × {d})',d:'d = (v_f² − v_i²)/2a = ({vf}² − {vi}²) ÷ (2 × {a})',a:'a = (v_f² − v_i²)/2d = ({vf}² − {vi}²) ÷ (2 × {d})',vi:'v_i = √(v_f² − 2ad) = √({vf}² − 2 × {a} × {d})'}});
 sq('L3-M06',['d','d','a'],'v_f² = v_i² + 2ad (find d or a)');
 sq('L3-M07',['vf','vi'],'v_f² = v_i² + 2ad (find a speed)');

 // ---------- forces ----------
 mk({id:'L3-M08',skill:'Newton’s second law F = ma',eq:'F = ma',unk:['F','m','a'],
  vars:[V('F','F','N'),V('m','m','kg',{alt:{u:'g',m:1000}}),V('a','a','m/s²')],
  make:(r,h)=>{const m=h.pick([0.5,0.2,1,1.5,2,3,4,5,6,8,10,20,50,800,1200],r),a=h.pick([0.5,1,1.5,2,2.5,3,4,5,8,10],r);return m>=800&&a>5?null:{m,a,F:m*a};},
  ex:{F:'F = ma = {m} × {a}',m:'m = F/a = {F} ÷ {a}',a:'a = F/m = {F} ÷ {m}'}});
 mk({id:'L3-M09',skill:'Net force with two forces',eq:'F_net = F_forward − F_back = ma',unk:['a','Ff','Fb','m'],
  vars:[V('Ff','F_forward','N'),V('Fb','F_back','N'),V('m','m','kg'),V('a','a','m/s²')],
  make:(r,h)=>{const m=h.pick([2,4,5,10,20,50,100,500,1000],r),a=h.pick([0.5,1,2,3,4],r),Fb=h.pick([10,20,30,50,100,200,300],r);return Fb>5*m||Fb<0.1*m?null:{m,a,Fb,Ff:Fb+m*a};},
  ex:{a:'a = (F_forward − F_back)/m = ({Ff} − {Fb}) ÷ {m}',Ff:'F_forward = ma + F_back = {m} × {a} + {Fb}',Fb:'F_back = F_forward − ma = {Ff} − {m} × {a}',m:'m = (F_forward − F_back)/a = ({Ff} − {Fb}) ÷ {a}'}});
 mk({id:'L3-M10',skill:'Weight F_g = mg',eq:'F_g = mg',fixed:[G],unk:['Fg','Fg','m'],
  vars:[V('Fg','F_g','N'),V('m','m','kg',{alt:{u:'g',m:1000}})],
  make:(r,h)=>{const m=h.pick([0.5,1,2,3,4,5,6,8,10,15,20,25,40,50,60,75,80],r);return{m,Fg:9.8*m};},
  ex:{Fg:'F_g = mg = {m} × 9.8',m:'m = F_g/g = {Fg} ÷ 9.8'}});
 mk({id:'L3-M11',skill:'Hooke’s law F = kx',eq:'F = kx',note:'(F is the size of the force)',unk:['F','k','x'],
  vars:[V('F','F','N'),V('k','k','N/m'),V('x','x','m',{alt:{u:'cm',m:100}})],
  make:(r,h)=>{const k=h.pick([20,40,50,80,100,150,200,250,400,500],r),x=h.pick([0.02,0.04,0.05,0.08,0.1,0.15,0.2,0.25,0.3,0.4],r);return{k,x,F:k*x};},
  ex:{F:'F = kx = {k} × {x}',k:'k = F/x = {F} ÷ {x}',x:'x = F/k = {F} ÷ {k}'}});

 // ---------- momentum & impulse ----------
 mk({id:'L3-M12',skill:'Momentum p = mv',eq:'p = mv',unk:['p','m','v'],
  vars:[V('p','p','kg·m/s',{ua:['N s','N·s']}),V('m','m','kg',{alt:{u:'g',m:1000}}),V('v','v','m/s')],
  make:(r,h)=>{const m=h.pick([0.2,0.5,1,2,3,5,8,10,60,1000,1200],r),v=h.pick([2,3,4,5,6,8,10,12,15,20,25],r);return m===60&&v>10?null:{m,v,p:m*v};},
  ex:{p:'p = mv = {m} × {v}',m:'m = p/v = {p} ÷ {v}',v:'v = p/m = {p} ÷ {m}'}});
 mk({id:'L3-M13',skill:'Impulse Δp = FΔt',eq:'FΔt = Δp',unk:['dp','F','t'],
  vars:[V('dp','Δp','kg·m/s',{ua:['N s','N·s']}),V('F','F','N'),V('t','Δt','s')],
  make:(r,h)=>{const F=h.pick([20,40,50,80,100,200,500,1000,2000],r),t=h.pick([0.01,0.02,0.05,0.1,0.2,0.5,2,4],r);return{F,t,dp:F*t};},
  ex:{dp:'Δp = FΔt = {F} × {t}',F:'F = Δp/Δt = {dp} ÷ {t}',t:'Δt = Δp/F = {dp} ÷ {F}'}});
 mk({id:'L3-M14',skill:'Change in momentum Δp = mv_f − mv_i',eq:'Δp = mv_f − mv_i',note:'(+ direction is to the right)',unk:['dp','dp','vf','m'],
  vars:[V('dp','Δp','kg·m/s',{ua:['N s','N·s']}),V('m','m','kg'),V('vi','v_i','m/s'),V('vf','v_f','m/s')],
  make:(r,h)=>{const m=h.pick([0.2,0.5,1,2,3,4,5,60,1000],r),vi=h.int(1,12,r),vf=h.int(-8,15,r);if(vi===vf)return null;return{m,vi,vf,dp:m*(vf-vi)};},
  ex:{dp:'Δp = mv_f − mv_i = {m} × {vf} − {m} × {vi}',vf:'v_f = (Δp + mv_i)/m = ({dp} + {m} × {vi}) ÷ {m}',m:'m = Δp/(v_f − v_i) = {dp} ÷ ({vf} − {vi})'}});
 mk({id:'L3-M15',skill:'Force from change in momentum',eq:'FΔt = mv_f − mv_i',unk:['F','F','t'],
  vars:[V('F','F','N'),V('t','Δt','s'),V('m','m','kg'),V('vi','v_i','m/s'),V('vf','v_f','m/s')],
  make:(r,h)=>{const m=h.pick([0.1,0.2,0.5,1,2,60,1000],r),vi=h.int(0,20,r),vf=h.int(0,30,r),t=h.pick([0.01,0.02,0.05,0.1,0.2,0.5,1,2,4,5],r);if(vf<=vi||m*(vf-vi)/t>20000||(m===60&&vf>10))return null;return{m,vi,vf,t,F:m*(vf-vi)/t};},
  ex:{F:'F = m(v_f − v_i)/Δt = {m} × ({vf} − {vi}) ÷ {t}',t:'Δt = m(v_f − v_i)/F = {m} × ({vf} − {vi}) ÷ {F}'}});
 mk({id:'L3-M16',skill:'Conservation of momentum: collision',eq:'m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′',note:'(+ is to the right; v′ = after the collision)',unk:['v1','v2','v1p','v2p'],
  vars:[V('m1','m₁','kg'),V('v1','v₁','m/s'),V('m2','m₂','kg'),V('v2','v₂','m/s'),V('v1p','v₁′','m/s'),V('v2p','v₂′','m/s')],
  make:(r,h)=>{const m1=h.int(1,6,r),m2=h.int(1,6,r),v1=h.int(1,10,r),v2=h.int(-6,3,r),v1p=h.int(-6,6,r);const v2p=(m1*v1+m2*v2-m1*v1p)/m2;return Number.isInteger(v2p)&&v2p>v1p&&v1>v2&&m1*v1*v1+m2*v2*v2>=m1*v1p*v1p+m2*v2p*v2p?{m1,m2,v1,v2,v1p,v2p}:null;},
  ex:{v1:'v₁ = (m₁v₁′ + m₂v₂′ − m₂v₂)/m₁ = ({m1} × {v1p} + {m2} × {v2p} − {m2} × {v2}) ÷ {m1}',v2:'v₂ = (m₁v₁′ + m₂v₂′ − m₁v₁)/m₂ = ({m1} × {v1p} + {m2} × {v2p} − {m1} × {v1}) ÷ {m2}',v1p:'v₁′ = (m₁v₁ + m₂v₂ − m₂v₂′)/m₁ = ({m1} × {v1} + {m2} × {v2} − {m2} × {v2p}) ÷ {m1}',v2p:'v₂′ = (m₁v₁ + m₂v₂ − m₁v₁′)/m₂ = ({m1} × {v1} + {m2} × {v2} − {m1} × {v1p}) ÷ {m2}'}});
 mk({id:'L3-M17',skill:'Conservation of momentum: stick together',eq:'m₁v₁ + m₂v₂ = (m₁ + m₂)v′',note:'(+ is to the right; the objects stick together)',unk:['vp','vp','v1','m2'],
  vars:[V('m1','m₁','kg'),V('v1','v₁','m/s'),V('m2','m₂','kg'),V('v2','v₂','m/s'),V('vp','v′','m/s')],
  make:(r,h)=>{const m1=h.int(1,8,r),m2=h.int(1,8,r),vp=h.int(1,8,r),v2=h.int(-4,4,r);const v1=((m1+m2)*vp-m2*v2)/m1;return Number.isInteger(v1)&&v1>0&&v1!==vp&&v2!==vp?{m1,m2,vp,v2,v1}:null;},
  ex:{vp:'v′ = (m₁v₁ + m₂v₂)/(m₁ + m₂) = ({m1} × {v1} + {m2} × {v2}) ÷ ({m1} + {m2})',v1:'v₁ = ((m₁ + m₂)v′ − m₂v₂)/m₁ = (({m1} + {m2}) × {vp} − {m2} × {v2}) ÷ {m1}',m2:'m₂ = m₁(v₁ − v′)/(v′ − v₂) = {m1} × ({v1} − {vp}) ÷ ({vp} − {v2})'}});
 mk({id:'L3-M18',skill:'Conservation of momentum: explosion / recoil',eq:'0 = m₁v₁ + m₂v₂',note:'(both start at rest; + is to the right)',unk:['v2','v2','m2','v1'],
  vars:[V('m1','m₁','kg'),V('v1','v₁','m/s'),V('m2','m₂','kg'),V('v2','v₂','m/s')],
  make:(r,h)=>{const m1=h.int(1,10,r),m2=h.int(1,10,r),v1=h.int(1,10,r);const v2=-m1*v1/m2;return v1>0?{m1,m2,v1,v2}:null;},
  ex:{v2:'v₂ = −m₁v₁/m₂ = −{m1} × {v1} ÷ {m2}',m2:'m₂ = −m₁v₁/v₂ = −{m1} × {v1} ÷ ({v2})',v1:'v₁ = −m₂v₂/m₁ = −{m2} × ({v2}) ÷ {m1}'}});

 // ---------- energy & power ----------
 mk({id:'L3-M19',skill:'Work W = Fd',eq:'W = Fd',unk:['W','F','d'],
  vars:[V('W','W','J'),V('F','F','N'),V('d','d','m',{alt:{u:'cm',m:100}})],
  make:(r,h)=>{const F=h.pick([5,10,20,25,40,50,80,100,150,200,500],r),d=h.pick([0.5,1,2,3,4,5,6,8,10,12,20],r);return{F,d,W:F*d};},
  ex:{W:'W = Fd = {F} × {d}',F:'F = W/d = {W} ÷ {d}',d:'d = W/F = {W} ÷ {F}'}});
 mk({id:'L3-M20',skill:'Kinetic energy E_k = ½mv²',eq:'E_k = ½mv²',unk:['E','E','v','m'],
  vars:[V('E','E_k','J'),V('m','m','kg',{alt:{u:'g',m:1000}}),V('v','v','m/s')],
  make:(r,h)=>{const m=h.pick([0.1,0.2,0.5,1,2,3,4,5,8,10,20,60,1000],r),v=h.pick([2,3,4,5,6,8,10,12,15,20,25,30],r);return m>=5&&m<=60&&v>12?null:{m,v,E:0.5*m*v*v};},
  ex:{E:'E_k = ½mv² = ½ × {m} × {v}²',v:'v = √(2E_k/m) = √(2 × {E} ÷ {m})',m:'m = 2E_k/v² = 2 × {E} ÷ {v}²'}});
 mk({id:'L3-M21',skill:'Gravitational potential energy ΔE_p = mgΔh',eq:'ΔE_p = mgΔh',fixed:[G],unk:['E','E','h','m'],
  vars:[V('E','ΔE_p','J'),V('m','m','kg',{alt:{u:'g',m:1000}}),V('h','Δh','m',{alt:{u:'cm',m:100}})],
  make:(r,h)=>{const m=h.pick([0.5,1,2,3,4,5,10,15,20,25,50,60,100],r),hh=h.pick([0.5,1,2,3,4,5,10,15,20,25,50],r);return{m,h:hh,E:9.8*m*hh};},
  ex:{E:'ΔE_p = mgΔh = {m} × 9.8 × {h}',h:'Δh = ΔE_p/mg = {E} ÷ ({m} × 9.8)',m:'m = ΔE_p/gΔh = {E} ÷ (9.8 × {h})'}});
 mk({id:'L3-M22',skill:'Elastic potential energy E_p = ½kx²',eq:'E_p = ½kx²',unk:['E','E','k','x'],
  vars:[V('E','E_p','J'),V('k','k','N/m'),V('x','x','m',{alt:{u:'cm',m:100}})],
  make:(r,h)=>{const k=h.pick([20,40,50,80,100,200,250,400,500,1000],r),x=h.pick([0.02,0.04,0.05,0.1,0.2,0.25,0.3,0.4,0.5],r);return{k,x,E:0.5*k*x*x};},
  ex:{E:'E_p = ½kx² = ½ × {k} × {x}²',k:'k = 2E_p/x² = 2 × {E} ÷ {x}²',x:'x = √(2E_p/k) = √(2 × {E} ÷ {k})'}});
 for(const [id,sym,name] of [['L3-M23','W','work done'],['L3-M24','E','energy transferred']])
  mk({id,skill:`Power P = ${sym}/t`,eq:`P = ${sym}/t`,unk:['P','X','t'],
   vars:[V('P','P','W'),V('X',sym,'J'),V('t','t','s',{alt:{u:'min',m:1/60,p:0.25}})],
   make:(r,h)=>{const P=h.pick([5,10,20,40,50,60,100,150,200,500,1000,2000],r),t=h.pick([2,5,10,20,30,60,120,180,300],r);return{P,t,X:P*t};},
   ex:{P:`P = ${sym}/t = {X} ÷ {t}`,X:`${sym} = Pt = {P} × {t}`,t:`t = ${sym}/P = {X} ÷ {P}`}});
 mk({id:'L3-M25',skill:'Efficiency',eq:'efficiency (%) = (E_out ÷ E_in) × 100',unk:['eff','out','in'],
  vars:[V('eff','efficiency','%'),V('out','E_out','J'),V('in','E_in','J')],
  make:(r,h)=>{const eff=h.pick([20,25,30,40,45,50,60,75,80,85,90],r),i=h.pick([50,80,100,200,400,500,800,1000,2000],r);return{eff,in:i,out:eff*i/100};},
  ex:{eff:'efficiency = (E_out ÷ E_in) × 100 = ({out} ÷ {in}) × 100',out:'E_out = efficiency × E_in ÷ 100 = {eff} × {in} ÷ 100',in:'E_in = E_out × 100 ÷ efficiency = {out} × 100 ÷ {eff}'}});

 // ---------- torque ----------
 mk({id:'L3-M26',skill:'Torque τ = Fd',eq:'τ = Fd',unk:['T','F','d'],
  vars:[V('T','τ','N·m',{ua:['N m','Nm']}),V('F','F','N'),V('d','d','m',{alt:{u:'cm',m:100}})],
  make:(r,h)=>{const F=h.pick([5,10,20,25,40,50,80,100,200],r),d=h.pick([0.1,0.2,0.25,0.4,0.5,0.8,1,1.5,2,3],r);return{F,d,T:F*d};},
  ex:{T:'τ = Fd = {F} × {d}',F:'F = τ/d = {T} ÷ {d}',d:'d = τ/F = {T} ÷ {F}'}});
 mk({id:'L3-M27',skill:'Balanced torques (see-saw)',eq:'Στ_cw = Στ_acw  so  F₁d₁ = F₂d₂',note:'(pivot in the middle; d is measured from the pivot)',unk:['F1','F2','d1','d2'],
  vars:[V('F1','F₁ (clockwise)','N'),V('d1','d₁','m'),V('F2','F₂ (anticlockwise)','N'),V('d2','d₂','m')],
  make:(r,h)=>{const F1=h.pick([10,20,25,40,50,60,80,100,200,300,400],r),d1=h.pick([0.5,0.8,1,1.2,1.5,2,2.5,3],r),F2=h.pick([10,20,25,40,50,60,80,100,200,300,400],r);const d2=F1*d1/F2;return F1===F2||d2>4||d2<0.1?null:{F1,d1,F2,d2};},
  ex:{F1:'F₁ = F₂d₂/d₁ = {F2} × {d2} ÷ {d1}',F2:'F₂ = F₁d₁/d₂ = {F1} × {d1} ÷ {d2}',d1:'d₁ = F₂d₂/F₁ = {F2} × {d2} ÷ {F1}',d2:'d₂ = F₁d₁/F₂ = {F1} × {d1} ÷ {F2}'}});
 mk({id:'L3-M28',skill:'Balanced torques with three forces',eq:'F₁d₁ = F₂d₂ + F₃d₃',note:'(F₁ clockwise; F₂ and F₃ anticlockwise)',unk:['F1','F3','d3'],
  vars:[V('F1','F₁','N'),V('d1','d₁','m'),V('F2','F₂','N'),V('d2','d₂','m'),V('F3','F₃','N'),V('d3','d₃','m')],
  make:(r,h)=>{const d1=h.pick([1,1.5,2,2.5,3],r),d2=h.pick([0.5,1,1.5,2],r),d3=h.pick([1,2,3,4],r),F2=h.pick([10,20,30,40,50],r),F3=h.pick([10,20,30,40,50,60],r);return{d1,d2,d3,F2,F3,F1:(F2*d2+F3*d3)/d1};},
  ex:{F1:'F₁ = (F₂d₂ + F₃d₃)/d₁ = ({F2} × {d2} + {F3} × {d3}) ÷ {d1}',F3:'F₃ = (F₁d₁ − F₂d₂)/d₃ = ({F1} × {d1} − {F2} × {d2}) ÷ {d3}',d3:'d₃ = (F₁d₁ − F₂d₂)/F₃ = ({F1} × {d1} − {F2} × {d2}) ÷ {F3}'}});

 // ---------- circular motion ----------
 mk({id:'L3-M29',skill:'Circular speed v = 2πr/T',eq:'v = 2πr/T',noClean:['v'],unk:['v','v','r','T'],
  vars:[V('v','v','m/s'),V('r','r','m'),V('T','T','s')],
  make:(r,h)=>{const rr=h.pick([0.5,1,2,3,5,10,20,50,100],r),T=h.pick([0.5,1,2,4,5,10,20,60],r);const v=2*Math.PI*rr/T;return v>40||v<0.5?null:{r:rr,T,v};},
  ex:{v:'v = 2πr/T = 2π × {r} ÷ {T}',r:'r = vT/2π = {v} × {T} ÷ (2π)',T:'T = 2πr/v = 2π × {r} ÷ {v}'}});
 mk({id:'L3-M30',skill:'Frequency and period f = 1/T',eq:'f = 1/T',unk:['f','T'],
  vars:[V('f','f','Hz'),V('T','T','s')],
  make:(r,h)=>{const T=h.pick([0.002,0.004,0.01,0.02,0.04,0.05,0.1,0.2,0.25,0.5,1,2,4,5,10],r);return{T,f:1/T};},
  ex:{f:'f = 1/T = 1 ÷ {T}',T:'T = 1/f = 1 ÷ {f}'}});
 mk({id:'L3-M31',skill:'Centripetal acceleration a_c = v²/r',eq:'a_c = v²/r',unk:['a','a','v','r'],
  vars:[V('a','a_c','m/s²'),V('v','v','m/s'),V('r','r','m')],
  make:(r,h)=>{const v=h.pick([2,3,4,5,6,8,10,12,15,20,25],r),rr=h.pick([1,2,4,5,8,10,20,25,40,50,100],r);return v*v/rr>40?null:{v,r:rr,a:v*v/rr};},
  ex:{a:'a_c = v²/r = {v}² ÷ {r}',v:'v = √(a_c r) = √({a} × {r})',r:'r = v²/a_c = {v}² ÷ {a}'}});
 mk({id:'L3-M32',skill:'Centripetal force F_c = mv²/r',eq:'F_c = mv²/r',unk:['F','F','m','r','v'],
  vars:[V('F','F_c','N'),V('m','m','kg',{alt:{u:'g',m:1000}}),V('v','v','m/s',{alt:{u:'km/h',m:3.6,p:0.2}}),V('r','r','m')],
  make:(r,h)=>{const m=h.pick([0.5,1,2,3,5,10,60,70,800,1000,1200],r),v=h.pick([2,3,4,5,6,8,10,15,20,25],r),rr=h.pick([5,8,10,20,25,40,50,100],r);return v*v/rr>40||(m>=60&&m<=70&&v>10)?null:{m,v,r:rr,F:m*v*v/rr};},
  ex:{F:'F_c = mv²/r = {m} × {v}² ÷ {r}',m:'m = F_c r/v² = {F} × {r} ÷ {v}²',r:'r = mv²/F_c = {m} × {v}² ÷ {F}',v:'v = √(F_c r/m) = √({F} × {r} ÷ {m})'}});

 // ---------- vectors ----------
 mk({id:'L3-M33',skill:'Resultant of two perpendicular forces',eq:'F_R² = F₁² + F₂²',note:'(F₁ and F₂ are at right angles)',unk:['R','R','F1','F2'],
  vars:[V('F1','F₁','N'),V('F2','F₂','N'),V('R','F_R','N')],
  make:(r,h)=>{const t=h.pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]],r),k=h.pick([1,2,3,4,5,10],r),sw=r()<.5;return{F1:t[sw?1:0]*k,F2:t[sw?0:1]*k,R:t[2]*k};},
  ex:{R:'F_R = √(F₁² + F₂²) = √({F1}² + {F2}²)',F1:'F₁ = √(F_R² − F₂²) = √({R}² − {F2}²)',F2:'F₂ = √(F_R² − F₁²) = √({R}² − {F1}²)'}});
})();
