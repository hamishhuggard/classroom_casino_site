// Title card, shown before the main menu when the page loads: a port of the CLAUDE-O-VISION ident that opens the
// retro acids and bases video (classroom5/external_resources/y10/acids_and_bases/explainer_video_retro/vanity.py),
// with its own jingle (assets/claude-o-vision-jingle.wav, rendered by that folder's chiptune.py and trimmed as its
// build.py does, so the final chord lands on the card's flash at 2.3 s). Only the tagline differs: the video says
// EDUCATIONAL BROADCAST. This card replaced the separate START boot screen (BEGINNING INSTRUCTIONAL PROGRAM), so
// START now goes straight to the game.
// Same 4.5 s timeline as the video: chrome logo dissolves in, white flash and glint at 2.3 s, underline, typed
// tagline, the crab scuttles in and waves, dithered fade. Drawn on the video's 480×270 canvas and scaled up with
// hard pixels to fit the screen. Colours come from --tc-* in apple2.css. Any key or click skips it. Browsers block
// sound until the first click or key press, so when Sound is on and the jingle is blocked, the card waits on
// PRESS ANY KEY and starts, with sound, on that press.
const titleCard=(()=>{
  const LOGO='CLAUDE-O-VISION',TAG='LOADING EDUCATIONAL PROGRAM...';
  const HIT=2.3,FPS=15,BLOCK=3;
  // The whole 4.5 s card, as in the video (any key or click skips it).
  const FROM=0,TO=4.5,FADE=.4;
  const BAYER=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
  const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x)),ease=x=>{x=clamp(x);return x*x*(3-2*x);};
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  let card,frame,view,C,L;

  // Theme colours (read each time, so a theme change applies): any CSS colour, normalised to RGB through a 1×1 canvas.
  const probe=document.createElement('canvas').getContext('2d',{willReadFrequently:true});
  function rgb(css){probe.clearRect(0,0,1,1);probe.fillStyle='#000';probe.fillStyle=css.trim()||'#000';probe.fillRect(0,0,1,1);const d=probe.getImageData(0,0,1,1).data;return(255<<24|d[2]<<16|d[1]<<8|d[0])>>>0;}
  function colours(){
    const style=getComputedStyle(card),prop=name=>style.getPropertyValue(name).trim();
    const list=name=>prop(name).split(/\s+/).filter(Boolean).map(rgb);
    return{paper:rgb(prop('--tc-paper')),extrude:rgb(prop('--tc-extrude')),flash:rgb(prop('--tc-flash')),
      tip:rgb(prop('--tc-sparkle')),tag:rgb(prop('--tc-tag')),cursor:rgb(prop('--tc-cursor')),crab:rgb(prop('--tc-crab')),
      ramp:list('--tc-ramp'),bar:list('--tc-bar')};
  }

  // ---------------------------------------------------------------- the crab (vanity.py crab_cells / crab)
  const QW=3,QH=6;
  const BODY=['...#############..','...##e#######e##..','...#############..','...#############..'];
  const FEET_L=[3,5],FEET_R=[13,15];
  const ARM={L_down:[[1,2],[2,2]],R_down:[[16,2],[17,2]],R_up:[[16,1],[17,1],[16,2]],R_high:[[16,2],[17,1],[17,0]]};
  function crabCells(pose,t){
    const body=[],eyes=[];
    BODY.forEach((row,y)=>[...row].forEach((ch,x)=>{if(ch==='#')body.push([x,y]);if(ch==='e')eyes.push([x,y]);}));
    body.push(...ARM.L_down,...(pose==='wave'?(Math.floor(t*6)%2===0?ARM.R_high:ARM.R_up):ARM.R_down));
    let feet=[...FEET_L,...FEET_R].map(x=>[x,false]),dy=0,closed=false;
    if(pose==='walk'){const f=Math.floor(t*7.5)%2,lifted=f===0?FEET_R:FEET_L;feet=feet.map(([x])=>[x,lifted.includes(x)]);dy=f?-1:0;}
    else if(pose==='idle'){dy=(t%1.6)<.8?-1:0;closed=(t%2.7)<.14;}
    return{body,eyes,feet,dy,closed};
  }
  function crab(px,x,feetY,t,pose){
    const{body,eyes,feet,dy,closed}=crabCells(pose,t);
    const X=xq=>Math.round(x)-28+xq*QW,Y=yq=>Math.round(feetY)-5*QH+yq*QH+dy;
    for(const[xq,yq]of body)px.rect(X(xq),Y(yq),X(xq)+QW-1,Y(yq)+QH-1,C.crab);
    for(const[xq,yq]of eyes){
      if(closed){px.rect(X(xq),Y(yq),X(xq)+QW-1,Y(yq)+QH-1,C.crab);px.rect(X(xq-1),Y(yq)+QH-2,X(xq-1)+2*QW-1,Y(yq)+QH-1,C.paper);}
      else px.rect(X(xq),Y(yq),X(xq)+QW-1,Y(yq)+QH-1,C.paper);
    }
    for(const[fx,up]of feet){const h=up?QH>>1:QH-dy;px.rect(X(fx),Y(4),X(fx)+QW-1,Y(4)+h-1,C.crab);}
  }
  const scuttlePos=k=>k<.75?k/.875:.75/.875+(.125/.875)*(2*((k-.75)/.25)-((k-.75)/.25)**2);

  // ---------------------------------------------------------------- layout and the logo layers (vanity.py _logo_layers)
  function layout(){
    const LW=480,LH=270,lines=[LOGO],maxw=LW-68;
    const off=document.createElement('canvas');off.width=LW;off.height=LH;
    const g=off.getContext('2d',{willReadFrequently:true});
    let size=64;
    for(;size>20;size-=2){g.font=`${size}px "RC Title Chakra"`;if(Math.max(...lines.map(s=>g.measureText(s).width))<=maxw)break;}
    const metrics=lines.map(s=>g.measureText(s));
    const th=Math.max(...metrics.map(m=>Math.ceil(m.actualBoundingBoxAscent+m.actualBoundingBoxDescent)));
    const pitch=th+12,centre=104;
    const N=LW*LH,fill=new Uint8Array(N),lineOf=new Uint8Array(N);
    lines.forEach((s,i)=>{
      const m=metrics[i],tw=Math.ceil(m.actualBoundingBoxLeft+m.actualBoundingBoxRight);
      const cy=centre+(i-(lines.length-1)/2)*pitch;
      g.clearRect(0,0,LW,LH);g.fillStyle='#fff';
      g.fillText(s,Math.floor((LW-tw)/2)+m.actualBoundingBoxLeft-2,Math.round(cy+th/2));
      const d=g.getImageData(0,0,LW,LH).data;
      for(let p=0;p<N;p++)if(d[p*4+3]>=128){fill[p]=1;lineOf[p]=i+1;}
    });
    const outl=new Uint8Array(N),ext=new Uint8Array(N);
    for(let y=0;y<LH;y++)for(let x=0;x<LW;x++){
      let on=0;for(let j=-1;j<=1&&!on;j++)for(let i=-1;i<=1;i++){const xx=x+i,yy=y+j;if(xx>=0&&yy>=0&&xx<LW&&yy<LH&&fill[yy*LW+xx]){on=1;break;}}
      outl[y*LW+x]=on;
    }
    for(let y=0;y<LH;y++)for(let x=0;x<LW;x++)for(let k=1;k<=3;k++)if(x-k>=0&&y-k>=0&&outl[(y-k)*LW+x-k]){ext[y*LW+x]=1;break;}
    // per-line row range of the face, for the chrome ramp and its 'horizon' line
    const rows=lines.map(()=>[LH,0]);
    for(let p=0;p<N;p++)if(lineOf[p]){const r=rows[lineOf[p]-1],y=(p/LW)|0;r[0]=Math.min(r[0],y);r[1]=Math.max(r[1],y+1);}
    const img=new Uint32Array(N),alpha=new Uint8Array(N),R=C.ramp.length;
    const box=[LW,LH,0,0],fbox=[LW,LH,0,0],grow=(b,x,y)=>{b[0]=Math.min(b[0],x);b[1]=Math.min(b[1],y);b[2]=Math.max(b[2],x+1);b[3]=Math.max(b[3],y+1);};
    for(let p=0;p<N;p++){
      const x=p%LW,y=(p/LW)|0;
      if(ext[p])img[p]=C.extrude;
      if(outl[p])img[p]=C.paper;
      if(fill[p]){const[y0,y1]=rows[lineOf[p]-1],hz=y0+Math.floor((y1-y0)*.5);img[p]=y===hz?C.paper:C.ramp[Math.min(R-1,Math.floor((y-y0)/(y1-y0)*R))];grow(fbox,x,y);}
      if(ext[p]||outl[p]){alpha[p]=1;grow(box,x,y);}
    }
    // reveal time per chunk: random, with a gentle left-to-right drift (fixed seed, as in the video)
    let seed=7;const rnd=()=>((seed=(seed*1103515245+12345)>>>0)>>>8)/16777216;
    const times=[];
    for(let by=Math.floor(box[1]/BLOCK);by<=Math.floor(box[3]/BLOCK);by++)for(let bx=Math.floor(box[0]/BLOCK);bx<=Math.floor(box[2]/BLOCK);bx++)
      times.push([bx,by,.12+1.25*rnd()+.75*(bx*BLOCK-box[0])/Math.max(1,box[2]-box[0])]);
    // tagline: the game's dot-matrix font at one dot per canvas pixel, pre-rendered and revealed by width
    g.clearRect(0,0,LW,LH);g.font='10px "RC Title Dots"';
    const tagW=g.measureText(TAG).width,tagX=Math.round(LW/2-tagW/2),tagMid=box[3]+22;
    g.fillText(TAG,tagX,tagMid+4);
    const td=g.getImageData(0,0,LW,LH).data,tagMask=new Uint8Array(N);
    for(let p=0;p<N;p++)if(td[p*4+3]>=128)tagMask[p]=1;
    const prefix=[...TAG].map((_,n)=>g.measureText(TAG.slice(0,n+1)).width);
    const feetY=236;
    L={LW,LH,N,img,alpha,fill,box,fbox,times,tagMask,tagX,tagMid,prefix,feetY,data:new ImageData(LW,LH)};
    view.width=LW;view.height=LH;fit();
  }
  function fit(){
    const s=Math.min(innerWidth/L.LW,innerHeight/L.LH);
    view.style.width=`${L.LW*s}px`;view.style.height=`${L.LH*s}px`;frame.style.setProperty('--tc-px',`${s}px`);
  }

  // ---------------------------------------------------------------- one frame (vanity.py s_vanity)
  function draw(t){
    const{LW,LH,N,img,alpha,fill,box,fbox,times}=L,buf=new Uint32Array(L.data.data.buffer);
    buf.fill(C.paper);
    const px={
      set(x,y,c){if(x>=0&&y>=0&&x<LW&&y<LH)buf[y*LW+x]=c;},
      rect(x0,y0,x1,y1,c){for(let y=Math.max(0,y0);y<=Math.min(LH-1,y1);y++)for(let x=Math.max(0,x0);x<=Math.min(LW-1,x1);x++)buf[y*LW+x]=c;},
    };
    // 1. chunky random dissolve; a chunk flashes white on the frame it lands
    if(t<2.25){
      for(const[bx,by,tb]of times){
        if(t<tb)continue;
        const c=t-tb<.07?C.flash:0;
        for(let y=by*BLOCK;y<by*BLOCK+BLOCK&&y<LH;y++)for(let x=bx*BLOCK;x<bx*BLOCK+BLOCK&&x<LW;x++){const p=y*LW+x;if(alpha[p])buf[p]=c||img[p];}
      }
    }else for(let p=0;p<N;p++)if(alpha[p])buf[p]=img[p];
    const[fx0,fy0,fx1,fy1]=fbox;
    // 2. sting: one all-white frame, then a diagonal glint sweeping across the face
    if(t>=HIT&&t<HIT+.067){for(let p=0;p<N;p++)if(alpha[p])buf[p]=C.flash;}
    else if(t>=HIT+.067&&t<HIT+.5){
      const k=(t-HIT-.067)/.43,gx=Math.floor(fx0-30+(fx1-fx0+60)*k),h2=Math.floor((fy1-fy0)/2);
      for(let y=fy0;y<fy1;y++){const xl=gx-h2*(y-fy0)/(fy1-fy0);for(let x=Math.ceil(xl);x<=xl+10;x++)if(x>=0&&x<LW&&fill[y*LW+x])buf[y*LW+x]=C.flash;}
    }
    // underline bar grows out from the centre at the sting
    if(t>=HIT){
      const k=ease((t-HIT)/.35),w=fx1-fx0,half=Math.floor(w/2*k),cx=LW>>1,yb=box[3]+5,B=C.bar.length;
      for(let x=cx-half;x<cx+half;x++){const i=Math.max(0,Math.min(B-1,Math.floor((x-(cx-w/2))/w*B)));px.set(x,yb,C.bar[i]);px.set(x,yb+1,C.bar[i]);}
    }
    // sparkles
    for(const[sx,sy,dt,rm]of[[fx0+3,fy0-1,0,11],[fx1-3,fy0+2,.1,9],[(LW>>1)+34,fy1-2,.2,7],[fx0+Math.floor((fx1-fx0)/3),fy1-1,.3,6]]){
      const u=(t-HIT-dt)/.55;if(u<0||u>=1)continue;
      const r=Math.round(rm*Math.sin(Math.PI*u));
      if(r<1){px.set(sx,sy,C.flash);continue;}
      for(let i=-r;i<=r;i++){px.set(sx+i,sy,C.tip);px.set(sx,sy+i,C.tip);}
      const h=Math.max(1,r>>1);for(let i=-h;i<=h;i++){px.set(sx+i,sy,C.flash);px.set(sx,sy+i,C.flash);}
      if(r>=4)for(const[a,b]of[[1,1],[1,-1],[-1,1],[-1,-1]])px.set(sx+a,sy+b,C.flash);
    }
    // 3. tagline, typed in from just after the sting, with a blinking block cursor
    const tTag=HIT+.15;
    if(t>=tTag){
      const n=Math.min(TAG.length,Math.floor((t-tTag)/.022)+1),edge=L.tagX+L.prefix[n-1];
      for(let p=0;p<N;p++)if(L.tagMask[p]&&p%LW<edge)buf[p]=C.tag;
      if(n<TAG.length&&Math.floor(t*15)%2===0)px.rect(Math.round(edge+1.5),L.tagMid-6,Math.round(edge+7.5),L.tagMid+6,C.cursor);
    }
    // 4. the crab scuttles in from the right, stops centred under the tagline, waves
    const tIn=2,dur=1,x1=LW/2;
    if(t<tIn+dur+.25){if(t>=tIn){const k=(t-tIn)/dur;if(k<1)crab(px,LW+35+(x1-LW-35)*Math.min(1,scuttlePos(k)),L.feetY,t,'walk');else crab(px,x1,L.feetY,t,'idle');}}
    else crab(px,x1,L.feetY,t,t<4.05?'wave':'idle');
    // 5. fade out over the last 0.4 s by ordered dither
    if(t>TO-FADE){const a=clamp((t-(TO-FADE))/FADE);for(let y=0;y<LH;y++)for(let x=0;x<LW;x++)if((BAYER[y%4][x%4]+.5)/16<a)buf[y*LW+x]=C.paper;}
    view.getContext('2d').putImageData(L.data,0,0);
  }

  // ---------------------------------------------------------------- run
  // Fonts load once, when the page loads.
  const fontsReady=Promise.all([new FontFace('RC Title Chakra','url(assets/ChakraPetch-Bold.ttf)'),new FontFace('RC Title Dots','url(assets/RCDotMatrix.ttf)')]
    .map(f=>f.load().then(()=>document.fonts.add(f))));
  let jingle;
  try{jingle=new Audio('assets/claude-o-vision-jingle.wav');jingle.preload='auto';jingle.volume=.5;}catch{}

  return function play(done){
    card=document.createElement('div');frame=document.createElement('div');view=document.createElement('canvas');
    card.id='title-card';card.setAttribute('role','img');card.setAttribute('aria-label',`${LOGO}. ${TAG}.`);
    frame.className='title-card-frame';frame.append(view);card.append(frame);document.body.append(card);
    C=colours();
    let raf=0,ended=false,started=0,timer=0;
    function finish(){
      if(ended)return;ended=true;cancelAnimationFrame(raf);clearTimeout(timer);
      try{jingle.pause();jingle.currentTime=0;}catch{}
      window.removeEventListener('keydown',press,true);window.removeEventListener('resize',onResize);card.remove();done();
    }
    function onResize(){if(L)fit();}
    function tick(now){
      if(ended)return;
      const t=FROM+Math.floor((now-started)/1000*FPS)/FPS;   // 15 fps, as the video
      if(t>=TO)return finish();
      draw(t);raf=requestAnimationFrame(tick);
    }
    // Until the card is running, a key or click starts it (with sound) instead of skipping it.
    let waiting=null,prompt=null;
    function press(event){
      event.preventDefault();event.stopImmediatePropagation();
      if(!waiting)return finish();
      const go=waiting;waiting=null;prompt?.remove();
      try{jingle.currentTime=0;jingle.play().catch(()=>{});}catch{}
      go();
    }
    function run(){started=performance.now();raf=requestAnimationFrame(tick);}
    window.addEventListener('keydown',press,true);card.addEventListener('pointerdown',press);window.addEventListener('resize',onResize);
    Promise.race([fontsReady,new Promise((_,no)=>setTimeout(no,1500))]).then(()=>{
      if(ended)return;layout();
      if(reduced){draw(TO-FADE);timer=setTimeout(finish,1000);return;}
      let sound=false;try{sound=$('sound').checked&&!!jingle;}catch{}
      if(!sound)return run();
      jingle.currentTime=0;
      jingle.play().then(run,()=>{
        if(ended)return;
        waiting=run;prompt=document.createElement('p');prompt.className='title-card-prompt';prompt.textContent='PRESS ANY KEY';card.append(prompt);
      });
    },finish);
  };
})();
titleCard(()=>{});
