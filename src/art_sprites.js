const SKIN=['#d08a7c','#e8ae98','#f6d2bc','#fde6d4'];
function cubic(o,p0,p1,p2,p3,col,n){ n=n||28; let last=null; for(let i=0;i<=n;i++){ const t=i/n,u=1-t; const X=u*u*u*p0[0]+3*u*u*t*p1[0]+3*u*t*t*p2[0]+t*t*t*p3[0]; const Y=u*u*u*p0[1]+3*u*u*t*p1[1]+3*u*t*t*p2[1]+t*t*t*p3[1]; const k=Math.round(X)+','+Math.round(Y); if(k!==last){ o.p(X,Y,col); last=k; } } }
function fp(o,d,rp,opt){ const m=o.mask(c=>{ c.fill(new Path2D(d)); }); o.shade(m,rp,opt); return m; }
const FIG={
 adeline:{hair:'#cfd2de',hs:'sbraid',top:'#3a5890',trim:'#f2ead8',dress:true,len:36,eye:'#7a8ec0',puff:true,accent:'#e8d6a8',lace:true,ribbon2:'#5a7ab8'},
 edric:{hair:'#2c2a34',hs:'short',top:'#25232e',bot:'#1c1a24',trim:'#a8b0c0',gray:true,fy:124,eye:'#6a7a8a',coat:true,cravat:true,tall:true},
 marot:{hair:'#34282a',hs:'swept',top:'#26242c',bot:'#1c1a22',trim:'#d8d8e0',vest:'#4a4a5a',fy:123,eye:'#4a5a6a',coat:true,cravat:true,watch:true},
 tangie:{hair:'#e0722a',hs:'braid',top:'#7c9a6c',trim:'#f6f0e4',apron:'#f6f0e4',dress:true,len:42,eye:'#6a8a4a',puff:true,accent:'#e0a23a',lace:true},
 holt:{hair:'#6a5240',hs:'bun',top:'#7e7e8a',trim:'#e8e4ee',dress:true,glasses:true,len:50,eye:'#5a5a6a',highneck:true,accent:'#c9a050'},
 marta:{hair:'#c4bcb2',hs:'bun',top:'#9a6a4a',trim:'#f6f0e4',apron:'#f6f0e4',dress:true,len:46,eye:'#6a5a4a',puff:true,accent:'#d8c08a',round:true},
 adrian:{hair:'#d4b480',hs:'swept',top:'#8aa6bc',bot:'#5d5a5a',trim:'#f2ead8',fy:120,eye:'#6a8a6a',coat:true,short:true,cravat:true},
 kylen:{hair:'#222836',hs:'short',top:'#2e3850',bot:'#1e2430',trim:'#cfd4dc',fy:124,eye:'#7a9ac0',coat:true,fur:true},
 julian:{hair:'#b08a58',hs:'swept',top:'#ece6de',bot:'#cfc6ba',trim:'#d9b24a',fy:123,eye:'#6a8ab0',coat:true,cravat:true,epaulet:true},
 lionel:{hair:'#3e2c26',hs:'swept',top:'#34807a',bot:'#2a3a3c',trim:'#d9b24a',fy:123,eye:'#7a5a3a',coat:true,cravat:true},
 sebastian:{hair:'#8a7662',hs:'short',top:'#6a70a8',bot:'#4a4e78',trim:'#e8e4ee',dress:true,glasses:true,len:50,eye:'#5a6a8a',robe:true,accent:'#d9b24a'},
 hadel:{hair:'#5e4636',hs:'short',top:'#8a6844',bot:'#4a3a2a',trim:'#c0c4cc',fy:125,eye:'#5a7a4a',coat:true,sword:true,armor:true,tall:true},
 rosalie:{hair:'#cc7a44',hs:'long',top:'#d890a2',trim:'#f6f0e4',dress:true,len:44,eye:'#6a9a8a',puff:true,accent:'#6aa89a',lace:true},
 serena:{hair:'#e8c880',hs:'long',top:'#f4efea',trim:'#d6cfe0',dress:true,len:50,eye:'#8a7ab0',puff:true,ribbon:true,accent:'#c9b8e0',lace:true},
 gregor:{hair:'#52402e',hs:'short',top:'#3e4452',bot:'#2c303a',trim:'#cfcfd4',fy:125,eye:'#7a8a9a',coat:true,beard:true,fur:true,tall:true},
 count:{hair:'#9a9aa2',hs:'short',top:'#525266',bot:'#363644',trim:'#c0c0cc',fy:124,eye:'#6a6a7a',coat:true,cravat:true}
};
const SPR={};
function drawEye(o,cx,cy,col,expr,right){
  const dk='#2a1c2a', ir=ramp(col,4);
  if(expr==='smile'){ o.p(cx-2,cy+1,dk); o.p(cx-1,cy,dk); o.p(cx,cy-1,dk); o.p(cx+1,cy,dk); o.p(cx+2,cy+1,dk); o.p(cx-1,cy+1,mix(dk,'#e8ae98',.5)); return; }
  const big=expr==='surprise'?1:0;
  o.r(cx-2,cy-3-big,5,1,dk); o.p(right?cx+3:cx-3,cy-3-big,dk); o.p(right?cx+2:cx-2,cy-4-big,mix(dk,'#e8ae98',.4));
  o.r(cx-2,cy-2-big,5,6+big,ir[1]);
  o.r(cx-2,cy-2-big,5,2,ir[0]); o.r(cx-1,cy+2,3,1,ir[2]); o.r(cx-2,cy+3,5,1,ir[3]);
  o.r(cx-1,cy-1,3,3,dk); o.p(cx,cy,mix(dk,col,.3));
  o.r(cx-2,cy-2-big,2,2,'#ffffff'); o.p(cx+1,cy+2,mix(ir[3],'#ffffff',.6));
  if(expr==='sad'||expr==='worry'){ o.p(cx-2,cy+4,mix('#a8d0f0','#fff',.4)); }
  o.p(cx-2,cy+4,mix(SKIN[1],'#c06a6a',.3)); o.p(cx+2,cy+4,mix(SKIN[1],'#c06a6a',.3));
}
function strand(o,pts,col){ cubic(o,pts[0],pts[1],pts[2],pts[3],col,30); }
function sprite(id,expr){
  expr=expr||'neutral'; const key=id+'|'+expr; if(SPR[key]) return SPR[key];
  const f=FIG[id]; const o=PX(56,132);
  if(!f||!o.x){ SPR[key]={c:o.c,feet:124}; return SPR[key]; }
  const HR=ramp(f.hair,5), TR=ramp(f.top,4), BR=ramp(f.bot||f.top,4), CR=ramp(f.trim||'#f2ead8',4), AR=ramp(f.accent||f.trim||'#d9b24a',4);
  const hairBack=()=>{
    if(f.hs==='long'){ const m=fp(o,'M14 26 C10 8 46 8 42 26 C47 46 49 72 46 96 C40 100 35 92 29 97 C23 92 17 100 10 96 C7 72 9 46 14 26 Z',HR,{k:.7,light:[-.4,-.5]}); [[16,30,12,60,14,78,15,94],[22,30,20,62,22,80,23,95],[34,30,36,62,34,80,33,95],[40,30,43,60,42,78,40,94]].forEach(s=>strand(o,[[s[0],s[1]],[s[2],s[3]],[s[4],s[5]],[s[6],s[7]]],HR[3])); }
  };
  let feet=124;
  hairBack();
  if(f.dress){
    const H=72+f.len; feet=H+3;
    // skirt
    fp(o,`M17 72 C12 90 5 ${H-14} 2 ${H} L54 ${H} C51 ${H-14} 44 90 39 72 Z`,TR,{k:.8,f:(i,j)=>((j-72)/f.len)*.2*Math.sin((i-28)*.6)});
    if(f.robe){ fp(o,`M24 66 L32 66 L35 ${H} L21 ${H} Z`,ramp(f.accent,4),{k:.5}); }
    if(f.apron) fp(o,`M21 66 L35 66 L37 72 C41 88 46 ${H-12} 47 ${H-2} L9 ${H-2} C10 ${H-12} 15 88 19 72 Z`,CR,{k:.6,f:(i,j)=>((j-72)/f.len)*.14*Math.sin((i-28)*.6)});
    for(let X=3;X<53;X++){ const edge=Math.round(2+ (X<10?0:0)); if(X%4<2){ o.p(X,H-1,CR[3]); o.p(X,H-2,CR[2]); } else { o.p(X,H-1,CR[1]); } o.p(X,H,mix(TR[0],'#000',.2)); }
    if(f.lace){ for(let X=4;X<52;X+=4){ o.p(X,H-4,CR[2]); o.p(X+1,H-5,CR[3]); } }
    // bodice
    fp(o,'M18 50 C21 47 35 47 38 50 L40 72 L16 72 Z',TR,{k:.75});
    if(f.apron) fp(o,'M22 54 L34 54 L35 70 L21 70 Z',CR,{k:.5});
    // sleeves
    const puff=f.puff?7:5;
    fp(o,'M8 58 C5 70 5 80 7 90 L13 90 C13 80 14 70 16 60 Z',TR,{k:.8}); fp(o,'M48 58 C51 70 51 80 49 90 L43 90 C43 80 42 70 40 60 Z',TR,{k:.8});
    fp(o,`M${14-puff} 54 A${puff} 6 0 1 1 ${14+puff} 54 A${puff} 6 0 1 1 ${14-puff} 54 Z`,TR,{k:.9}); fp(o,`M${42-puff} 54 A${puff} 6 0 1 1 ${42+puff} 54 A${puff} 6 0 1 1 ${42-puff} 54 Z`,TR,{k:.9});
    fp(o,'M6 86 L14 86 L14 91 L6 91 Z',CR,{k:.4}); fp(o,'M42 86 L50 86 L50 91 L42 91 Z',CR,{k:.4});
    fp(o,'M6 94 A3.6 3.6 0 1 1 13.2 94 A3.6 3.6 0 1 1 6 94 Z',SKIN,{hard:true,k:.5}); fp(o,'M42.8 94 A3.6 3.6 0 1 1 50 94 A3.6 3.6 0 1 1 42.8 94 Z',SKIN,{hard:true,k:.5});
    // neck + collar
    // sash
    fp(o,'M16 69 L40 69 L40 73 L16 73 Z',AR,{k:.5}); fp(o,'M30 67 C35 66 37 72 35 77 L32 76 Z',AR,{k:.7}); fp(o,'M29 67 C24 66 22 72 24 77 L27 76 Z',AR,{k:.7}); fp(o,'M26 67 L30 67 L30 73 L26 73 Z',AR,{k:.9});
    if(f.highneck){ fp(o,'M21 46 L35 46 L36 56 L20 56 Z',CR,{k:.5}); o.p(28,56,AR[3]); o.p(28,57,AR[2]); }
    else { fp(o,'M19 49 C23 45 33 45 37 49 L34 57 C31 59 25 59 22 57 Z',CR,{k:.55}); for(let X=20;X<37;X+=2) o.p(X,57+((X%4)?0:1),CR[2]); }
    if(f.round) { /* sturdy */ }
  } else {
    const fy=f.fy||124; feet=fy+3;
    // legs & boots
    fp(o,`M20 100 L27 100 L27 ${fy} L20 ${fy} Z`,BR,{k:.8}); fp(o,`M29 100 L36 100 L36 ${fy} L29 ${fy} Z`,BR,{k:.8});
    fp(o,`M17 ${fy-9} L27 ${fy-9} L27 ${fy+1} L15 ${fy+1} Z`,ramp('#2a2230',4),{k:.8}); fp(o,`M29 ${fy-9} L39 ${fy-9} L41 ${fy+1} L29 ${fy+1} Z`,ramp('#2a2230',4),{k:.8});
    // coat
    fp(o,'M16 51 C20 47 36 47 40 51 L43 74 L46 102 L10 102 L13 74 Z',TR,{k:.85,f:(i,j)=>(j>80?((j-80)/22)*.12*Math.sin((i-28)*.7):0)});
    if(f.vest) fp(o,'M22 58 L34 58 L33 90 L23 90 Z',ramp(f.vest,4),{k:.6});
    fp(o,'M22 49 L28 76 L21 73 L16 56 Z',CR,{k:.5}); fp(o,'M34 49 L28 76 L35 73 L40 56 Z',ramp(mix(f.trim,f.top,.45),4),{k:.5});
    if(f.cravat) fp(o,'M24 47 L32 47 L28 63 Z',ramp('#f6f0e6',4),{k:.5});
    o.r(28,76,1,26,TR[0]);
    [80,88,96].forEach(y=>{ o.p(27,y,AR[3]); o.p(28,y,AR[2]); o.p(27,y+1,AR[1]); });
    o.r(10,99,36,3,CR[1]); o.r(10,99,36,1,CR[2]);
    // arms
    fp(o,'M12 52 C8 66 7 80 8 98 L14 98 C14 82 15 68 18 54 Z',TR,{k:.85}); fp(o,'M44 52 C48 66 49 80 48 98 L42 98 C42 82 41 68 38 54 Z',TR,{k:.85});
    fp(o,'M7 92 L14 92 L14 98 L7 98 Z',CR,{k:.4}); fp(o,'M42 92 L49 92 L49 98 L42 98 Z',CR,{k:.4});
    fp(o,'M7 101 A3.6 3.6 0 1 1 14.2 101 A3.6 3.6 0 1 1 7 101 Z',SKIN,{hard:true,k:.5}); fp(o,'M41.8 101 A3.6 3.6 0 1 1 49 101 A3.6 3.6 0 1 1 41.8 101 Z',SKIN,{hard:true,k:.5});
    if(f.fur){ fp(o,'M14 50 C22 44 34 44 42 50 L40 58 C34 54 22 54 16 58 Z',ramp('#e8e4ec',4),{k:.5}); for(let X=16;X<42;X+=2){ o.p(X,58+((X%4)?0:1),'#cfcad6'); } }
    if(f.epaulet){ fp(o,'M11 49 L19 47 L18 55 L10 56 Z',AR,{k:.5}); fp(o,'M45 49 L37 47 L38 55 L46 56 Z',AR,{k:.5}); o.r(9,56,3,3,AR[3]); o.r(44,56,3,3,AR[3]); }
    if(f.armor){ fp(o,'M10 48 L20 46 L19 56 L9 57 Z',ramp('#9aa0a8',4),{k:.6}); fp(o,'M46 48 L36 46 L37 56 L47 57 Z',ramp('#9aa0a8',4),{k:.6}); fp(o,'M23 66 L33 66 L33 72 L23 72 Z',AR,{k:.5}); }
    if(f.watch){ cubic(o,[22,66],[26,74],[32,74],[36,64],'#e0e0ea',20); o.r(34,64,3,3,AR[3]); }
    if(f.sword){ fp(o,'M45 80 L54 122 L51 123 L42 82 Z',ramp('#bcc2cc',4),{k:.6}); fp(o,'M41 77 L47 77 L47 82 L41 82 Z',AR,{k:.5}); }
  }
  // neck, head
  fp(o,'M25 40 L31 40 L31 49 L25 49 Z',SKIN,{hard:true,k:.4,bias:-.15});
  fp(o,'M18 22 C18 13 38 13 38 22 L38 30 C38 37 33 43 28 43 C23 43 18 37 18 30 Z',SKIN,{hard:true,k:.55,light:[-.4,-.6]});
  // face
  const ex=expr; drawEye(o,23,28,f.eye||'#5a4a3a',ex,false); drawEye(o,33,28,f.eye||'#5a4a3a',ex,true);
  const br=HR[1];
  if(ex==='sad'||ex==='worry'){ o.r(21,22,3,1,br); o.p(20,23,br); o.r(32,22,3,1,br); o.p(35,23,br); }
  else if(ex==='surprise'){ o.r(21,21,4,1,br); o.r(31,21,4,1,br); }
  else { o.r(20,23,5,1,br); o.r(31,23,5,1,br); o.p(19,24,br); o.p(36,24,br); }
  o.p(28,32,SKIN[0]); o.p(28,33,SKIN[1]);
  const lip='#c9606a';
  if(ex==='smile'){ o.r(25,36,6,1,lip); o.r(26,37,4,1,'#8a3a4a'); o.p(24,35,SKIN[0]); o.p(31,35,SKIN[0]); o.r(26,38,4,1,mix(lip,SKIN[2],.4)); }
  else if(ex==='surprise'){ o.r(27,36,2,3,'#7a3040'); o.p(27,35,lip); o.p(28,35,lip); }
  else if(ex==='sad'||ex==='worry'){ o.r(26,37,4,1,lip); o.p(25,38,lip); o.p(30,38,lip); }
  else { o.r(26,37,4,1,lip); o.r(27,38,2,1,mix(lip,SKIN[2],.45)); }
  o.r(20,32,3,2,mix(SKIN[2],'#f08a98',.45)); o.r(33,32,3,2,mix(SKIN[2],'#f08a98',.45)); o.p(21,32,mix(SKIN[2],'#f08a98',.7)); o.p(34,32,mix(SKIN[2],'#f08a98',.7));
  if(f.glasses){ const g='#d9b86a'; o.r(19,25,8,1,g); o.r(19,32,8,1,g); o.r(19,25,1,8,g); o.r(26,25,1,8,g); o.r(29,25,8,1,g); o.r(29,32,8,1,g); o.r(29,25,1,8,g); o.r(36,25,1,8,g); o.r(27,28,2,1,g); o.p(20,26,'#fff3c0'); o.p(30,26,'#fff3c0'); }
  // hair front
  if(f.hs==='long'){ fp(o,'M16 28 C12 8 44 8 40 28 C39 22 36 19 31 17 C27 20 21 22 18 26 Z',HR,{k:.8}); fp(o,'M17 24 C14 34 14 46 17 54 L20 54 C19 46 19 34 21 27 Z',HR,{k:.7}); fp(o,'M39 24 C42 34 42 46 39 54 L36 54 C37 46 37 34 35 27 Z',HR,{k:.7}); strand(o,[[19,17],[24,12],[33,12],[38,19]],HR[4]); strand(o,[[20,22],[24,18],[30,17],[34,21]],HR[3]); }
  if(f.hs==='bun'){ fp(o,'M16 28 C12 8 44 8 40 28 C37 19 19 19 16 28 Z',HR,{k:.8}); fp(o,'M22 9 A6.5 6.5 0 1 1 35 9 A6.5 6.5 0 1 1 22 9 Z',HR,{k:.9}); fp(o,'M16 26 C15 33 16 38 18 40 L20 40 C19 34 19 30 20 25 Z',HR,{k:.6}); fp(o,'M40 26 C41 33 40 38 38 40 L36 40 C37 34 37 30 36 25 Z',HR,{k:.6}); strand(o,[[19,17],[24,12],[33,12],[38,19]],HR[4]); }
  if(f.hs==='braid'){ fp(o,'M16 28 C12 8 44 8 40 28 C38 21 33 17 28 17 C23 17 18 21 16 28 Z',HR,{k:.8}); fp(o,'M16 26 C15 33 16 38 18 40 L20 40 C19 34 19 30 20 25 Z',HR,{k:.6}); strand(o,[[19,17],[24,12],[33,12],[38,19]],HR[4]);
    for(let i=0;i<11;i++){ const y=30+i*6, x=42+(i%2?1:-1)*1; fp(o,`M${x-3} ${y} A3.2 3.2 0 1 1 ${x+3.4} ${y} A3.2 3.2 0 1 1 ${x-3} ${y} Z`,HR,{k:.9,light:[-.3,-.7]}); } o.r(39,92,7,3,AR[2]); o.r(40,92,5,1,AR[3]); }
  if(f.hs==='sbraid'){ fp(o,'M16 28 C12 8 44 8 40 28 C38 21 33 17 28 17 C23 17 18 21 16 28 Z',HR,{k:.8}); fp(o,'M40 26 C41 33 40 38 38 40 L36 40 C37 34 37 30 36 25 Z',HR,{k:.6}); fp(o,'M16 24 C13 32 13 40 15 46 L19 46 C18 40 18 32 20 26 Z',HR,{k:.6}); strand(o,[[19,17],[24,12],[33,12],[38,19]],HR[4]); strand(o,[[22,19],[26,15],[32,15],[36,20]],HR[3]);
    for(let i=0;i<11;i++){ const y=46+i*4.4, x=14+(i%2?-1:1); fp(o,`M${x-4} ${y} A4 3.4 0 1 1 ${x+4.2} ${y} A4 3.4 0 1 1 ${x-4} ${y} Z`,HR,{k:.9,light:[-.3,-.7]}); if(i%2) o.p(x,y,HR[1]); }
    fp(o,'M9 94 L19 94 L20 99 L8 99 Z',ramp(f.ribbon2||'#5a7ab8',4),{k:.5}); o.r(10,99,3,4,HR[2]); o.r(15,99,3,3,HR[3]); }
  if(f.hs==='short'){ fp(o,'M15 28 C12 8 44 8 41 28 C40 21 38 17 33 16 C30 19 25 19 22 16 C18 18 16 22 15 28 Z',HR,{k:.8}); fp(o,'M18 21 L21 27 L24 19 L27 27 L31 18 L34 26 L38 20 L38 16 L18 16 Z',HR,{k:.6}); strand(o,[[18,15],[24,10],[34,10],[39,16]],HR[4]); o.p(19,24,HR[2]); }
  if(f.hs==='swept'){ fp(o,'M15 28 C11 8 45 6 41 26 C38 14 27 12 19 22 C17 24 16 26 15 28 Z',HR,{k:.8}); fp(o,'M20 21 C26 11 36 13 40 23 C34 17 26 18 20 21 Z',HR,{k:.7}); fp(o,'M15 26 C14 33 15 38 17 42 L19 42 C18 36 18 31 19 24 Z',HR,{k:.6}); strand(o,[[19,17],[26,10],[35,11],[39,19]],HR[4]); }
  if(f.gray){ o.p(17,21,'#c4c4d0'); o.p(17,23,'#c4c4d0'); o.p(18,22,'#d8d8e2'); o.p(39,21,'#c4c4d0'); o.p(39,23,'#c4c4d0'); o.p(38,22,'#d8d8e2'); }
  if(f.ribbon){ fp(o,'M12 16 L19 13 L19 20 L12 21 Z',ramp('#ffffff',4),{k:.4}); fp(o,'M26 13 L33 16 L33 22 L26 19 Z',ramp('#ffffff',3),{k:.4}); }
  if(f.beard){ fp(o,'M18 30 C18 40 24 46 28 46 C32 46 38 40 38 30 C36 36 32 38 28 38 C24 38 20 36 18 30 Z',HR,{k:.7}); o.r(25,36,6,1,lip); }
  // outline
  const w=o.w,h=o.h; const img=o.x.getImageData(0,0,w,h); const d=img.data; const solid=(X,Y)=>X>=0&&Y>=0&&X<w&&Y<h&&d[(Y*w+X)*4+3]>10; const col=(X,Y)=>[d[(Y*w+X)*4],d[(Y*w+X)*4+1],d[(Y*w+X)*4+2]]; const add=[];
  for(let Y=0;Y<h;Y++) for(let X=0;X<w;X++){ if(solid(X,Y)) continue; let n=null; if(solid(X,Y+1)) n=col(X,Y+1); else if(solid(X+1,Y)) n=col(X+1,Y); else if(solid(X-1,Y)) n=col(X-1,Y); else if(solid(X,Y-1)) n=col(X,Y-1); if(n) add.push([X,Y,n]); }
  const oc=hex2rgb(OUT); add.forEach(p=>{ const i=(p[1]*w+p[0])*4; d[i]=p[2][0]*.38+oc[0]*.62; d[i+1]=p[2][1]*.38+oc[1]*.62; d[i+2]=p[2][2]*.38+oc[2]*.62; d[i+3]=255; });
  o.x.putImageData(img,0,0);
  SPR[key]={c:o.c,feet:feet+1};
  return SPR[key];
}
