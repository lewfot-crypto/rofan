const BW=240, BH=160;
function skyBG(o,P,h){ o.grad(0,0,o.w,h,P.sky); }
function clouds(o,P,rnd,n,yMax){ for(let i=0;i<n;i++){ const cx=Math.floor(rnd()*o.w), cy=6+Math.floor(rnd()*yMax); const col=mix(P.sky[2],'#ffffff',.55); const sh=mix(col,P.sky[1],.5); for(let k=0;k<4;k++){ o.ell(cx+k*6-8,cy+(k%2),7+Math.floor(rnd()*4),3,col); } o.ell(cx,cy+3,16,1,sh); } }
function hills(o,P,y,amp,col,seed,bottom,x0,x1){ const rnd=rng(seed); const ph=rnd()*6; const b=bottom||o.h; for(let X=(x0||0);X<(x1||o.w);X++){ const h=Math.round(y+Math.sin((X+ph)/23)*amp+Math.sin((X+ph)/9)*amp*.4); if(b>h){ o.r(X,h,1,b-h,col); o.p(X,h,mix(col,'#ffffff',.18)); } } }
function tree(o,P,x,y,s,apples,rnd){
  const tw=Math.max(3,Math.round(4*s)), th=Math.round(26*s);
  o.r(x-2,y,tw,th,P.trunk); o.r(x+tw-3,y,2,th,mix(P.trunk,'#000000',.32)); o.r(x-2,y,1,th,mix(P.trunk,'#ffffff',.18)); o.r(x-5,y+th-2,tw+8,2,mix(P.trunk,'#000000',.25));
  const R=Math.round(18*s); const r2=rnd||rng(x*31+y);
  const blobs=[[0,-R*.3,R],[-R*.85,R*.15,R*.8],[R*.85,R*.15,R*.8],[0,-R*.95,R*.78],[-R*.45,-R*.7,R*.6],[R*.5,-R*.65,R*.6]];
  blobs.forEach(b=>o.ell(Math.round(x+b[0]),Math.round(y+b[1]),Math.round(b[2]),Math.round(b[2]*.84),P.leaf[2]));
  blobs.forEach(b=>o.ell(Math.round(x+b[0]-2),Math.round(y+b[1]-2),Math.round(b[2]*.82),Math.round(b[2]*.68),P.leaf[1]));
  blobs.forEach(b=>o.ell(Math.round(x+b[0]-4),Math.round(y+b[1]-4),Math.round(b[2]*.5),Math.round(b[2]*.4),P.leaf[0]));
  for(let i=0;i<Math.round(34*s);i++){ const px=x+Math.round((r2()-.5)*R*2.2), py=y+Math.round(-R*1.1+r2()*R*1.6); o.p(px,py,P.leaf[r2()<.5?0:2]); }
  if(apples){ for(let i=0;i<9;i++){ const px=x+Math.round((r2()-.5)*R*1.8), py=y+Math.round(-R*.8+r2()*R*1.4); o.p(px,py,'#c93a3a'); o.p(px+1,py,'#e2584a'); o.p(px,py+1,'#8a2630'); } }
}
function particles(o,P,rnd,n){ if(!P.part) return; for(let i=0;i<n;i++){ const X=Math.floor(rnd()*o.w),Y=Math.floor(rnd()*o.h*.9); o.p(X,Y,P.part); if(P.part!=='#ffffff'&&rnd()<.6) o.p(X+1,Y+1,mix(P.part,'#b05a20',.35)); } }
function glow(o,cx,cy,rad,col,k){ for(let yy=-rad;yy<=rad;yy++) for(let xx=-rad;xx<=rad;xx++){ const d=Math.sqrt(xx*xx+yy*yy); if(d>rad) continue; const t=(1-d/rad)*(k||1); if(t*16>BAYER[(cy+yy)&3][(cx+xx)&3]) o.p(cx+xx,cy+yy,col); } }
function archWin(o,x,y,w,h,P,night){
  const fr='#4a3228', fl=mix(fr,'#d8b080',.4), cx=x+Math.floor(w/2);
  o.r(x-3,y-3,w+6,h+6,fr); o.r(x-3,y-3,w+6,1,fl); o.r(x-3,y-3,1,h+6,fl);
  const skyc=night?['#10163a','#1c2658','#2c3870']:P.sky;
  o.grad(x,y,w,h,skyc);
  o.ell(cx,y,Math.floor(w/2)+3,Math.floor(w/3),fr); o.ell(cx,y+1,Math.floor(w/2),Math.floor(w/3)-2,skyc[0]);
  if(night){ const r=rng(x*7+y); for(let i=0;i<12;i++) o.p(x+2+Math.floor(r()*(w-4)),y+2+Math.floor(r()*(h-6)),'#f4efe0'); o.ell(x+w-9,y+10,4,4,'#f6f0d0'); o.ell(x+w-8,y+9,3,3,'#fffbe8'); }
  else { hills(o,P,y+h-14,3,P.far[0],x,y+h,x,x+w); o.r(x,y+h-5,w,5,P.gr[1]); o.dith(x,y+h-12,w,6,P.far[0],P.far[1],.4); }
  o.r(cx,y,1,h,fr); o.r(x,y+Math.floor(h/2),w,1,fr); o.r(x,y+Math.floor(h*.25),w,1,fr);
  for(let i=0;i<5;i++){ o.line(x+3+i*2,y+3,x+1+i*2,y+h*.6,mix('#ffffff',skyc[1],.55)); }
  o.r(x-4,y+h+3,w+8,3,fl); o.r(x-4,y+h+5,w+8,2,mix(fr,'#000000',.3));
}
function curtain(o,x,y,w,h,col){ const T=ramp(col,4); o.r(x,y,w,h,T[1]); for(let i=0;i<w;i++){ const ph=(i%5); o.r(x+i,y,1,h,ph<2?T[2]:ph<3?T[1]:T[0]); } for(let j=0;j<h;j+=3){ o.p(x+Math.floor(w/2),y+j,T[3]); } o.r(x,y,w,3,T[3]); o.r(x,y+h-3,w,3,T[0]); o.r(x-1,y-2,w+2,3,mix(col,'#d8b070',.6)); o.r(x+Math.floor(w/2)-3,y+Math.floor(h*.55),w>8?7:w,3,mix(col,'#d8b070',.55)); }
function candle(o,x,y,on){ o.r(x,y,2,6,'#f2ead8'); o.p(x,y,'#ffffff'); o.r(x,y-2,2,2,'#ffd75a'); o.p(x,y-3,'#fff0a8'); o.p(x+1,y-1,'#f2a23a'); if(on) glow(o,x,y-2,11,'#f7d98a',.55); }
function book(o,x,y,w,h,col){ o.r(x,y,w,h,col); o.r(x,y,1,h,mix(col,'#ffffff',.3)); o.r(x+w-1,y,1,h,mix(col,'#000000',.32)); o.r(x+1,y+2,w-2,1,'#f0d99a'); o.r(x+1,y+h-3,w-2,1,mix(col,'#000000',.2)); }
function vignette(o){ for(let j=0;j<o.h;j++) for(let i=0;i<o.w;i++){ const dx=(i-o.w/2)/(o.w/2), dy=(j-o.h/2)/(o.h/2); const d=dx*dx*.6+dy*dy*.9; if(d>.78){ const t=(d-.78)/1.1*.75; if(t*16>BAYER[j&3][i&3]) o.p(i,j,'#2a1f3a'); } } }
function floorBoards(o,y,col,dk){ o.r(0,y,o.w,o.h-y,col); for(let j=0;j<o.h-y;j+=6){ o.r(0,y+j,o.w,1,dk); } const r=rng(y); for(let k=0;k<70;k++){ const X=Math.floor(r()*o.w), Y=y+Math.floor(r()*(o.h-y)); o.r(X,Y,3+Math.floor(r()*4),1,mix(col,'#ffffff',.12)); } o.grad(0,y,o.w,o.h-y,[col,mix(col,'#2a1f3a',.25)]); for(let j=0;j<o.h-y;j+=6){ o.r(0,y+j,o.w,1,mix(dk,'#000000',.1)); } }
function wallPanel(o,y0,y1,col){ o.r(0,y0,o.w,y1-y0,col); for(let X=0;X<o.w;X+=10){ o.r(X,y0,1,y1-y0,mix(col,'#3a2a3a',.2)); o.r(X+1,y0,1,y1-y0,mix(col,'#ffffff',.06)); } o.grad(0,y0,o.w,y1-y0,[mix(col,'#fff1da',.08),col,mix(col,'#2a1f3a',.22)]); }
function chandelier(o,cx,y,w){ o.line(cx,0,cx,y,'#c9a070'); o.r(cx-w/2,y,w,2,'#c9a070'); o.r(cx-w/2+2,y+2,w-4,1,'#8a6a40'); for(let k=-w/2+2;k<=w/2-2;k+=Math.floor(w/5)){ candle(o,Math.round(cx+k),y-1,false); } glow(o,cx,y-2,Math.round(w*.9),'#f7d98a',.5); }
// ── 배경 240×160 — 스타듀풍 새 그림체 (색 수 제한, 단단한 음영, 윤곽선, 점무늬 없음). 저택은 대저택 규모.
// 새 배경 (서재 study2와 같은 방식: 색 수 제한, 단단한 음영, 윤곽선, 점무늬 없음)
// 공통 재료
const WD2=['#26160f','#45291d','#653d2a','#86563a','#a9744d'];
const GD2=['#5e4220','#93703a','#c9a057','#ecd08a'];
function bands(o,x,y,w,h,cols){ const n=cols.length; for(let j=0;j<h;j++) o.r(x,y+j,w,1,cols[Math.min(n-1,Math.floor(j/h*n))]); }
function plankFloor(o,y,W){ const R=(a,b,c,d,e)=>o.r(a,b,c,d,e);
  for(let row=0,Y=y;Y<160;row++,Y+=7){ R(0,Y,240,7,row%2?W[2]:mix(W[2],W[3],.35)); R(0,Y,240,1,W[0]); R(0,Y+1,240,1,row%2?W[3]:W[4]);
    for(let X=(row*23)%46;X<240;X+=46){ R(X,Y,1,7,W[0]); R(X+1,Y+1,1,6,W[3]); }
    for(let X=(row*37)%29+6;X<240;X+=29) R(X,Y+3+(row%3),5,1,W[1]); } }
function frameWin(o,x,y,w,h,P,opt){ opt=opt||{}; const R=(a,b,c,d,e)=>o.r(a,b,c,d,e), W=opt.wood||WD2;
  R(x-4,y-4,w+8,h+10,W[0]); R(x-3,y-3,w+6,h+8,W[3]); R(x-3,y-3,w+6,1,W[4]);
  if(P.night){   // 밤: 짙은 하늘, 별, 달, 검은 언덕·나무 그림자
    bands(o,x,y,w,h,['#121731','#1b2550','#283a6e']);
    for(let k=0;k<6;k++) o.p(x+3+((k*13+x)%(w-6)),y+3+((k*7)%Math.max(4,Math.floor(h*.45))),'#e8e4cf');
    o.ell(x+w-9,y+9,3,3,'#efe6c0'); o.p(x+w-10,y+8,'#d9cc9a');
    for(let X=0;X<w;X++){ const t=Math.round(h*.62+Math.sin((X+x)/7)*2); R(x+X,y+t,1,h-t,'#141a36'); }
    for(let X=0;X<w;X+=9) o.ell(x+X+4,y+Math.round(h*.7),4,3,'#0d1126');
    R(x,y+h-5,w,5,'#0d1126');
  } else {
  bands(o,x,y,w,h,[P.sky[0],P.sky[1],P.sky[2]]);
  // 바깥 풍경: 먼 언덕 + 나무 머리
  for(let X=0;X<w;X++){ const t=Math.round(h*.62+Math.sin((X+x)/7)*2); R(x+X,y+t,1,h-t,P.far[0]); R(x+X,y+t,1,1,mix(P.far[0],'#ffffff',.2)); }
  for(let X=0;X<w;X+=9){ o.ell(x+X+4,y+Math.round(h*.7),4,3,P.leaf[2]); o.ell(x+X+3,y+Math.round(h*.7)-1,3,2,P.leaf[1]); }
  R(x,y+h-5,w,5,P.gr[1]); R(x,y+h-5,w,1,P.gr[0]);
  }
  // 유리 반사
  for(let k=0;k<3;k++) o.line(x+3+k*3,y+3,x+1+k*3,y+12,P.night?'#3a4a7a':mix(P.sky[2],'#ffffff',.6));
  const cx=x+Math.floor(w/2); R(cx-1,y,2,h,W[1]); R(cx-1,y,1,h,W[3]); R(x,y+Math.floor(h/2),w,2,W[1]); R(x,y+Math.floor(h/2),w,1,W[3]);
  R(x-6,y+h+2,w+12,4,W[3]); R(x-6,y+h+2,w+12,1,W[4]); R(x-6,y+h+6,w+12,1,W[0]);
  if(opt.arch){ for(let k=0;k<=Math.floor(w/2)+3;k++){ const d=Math.round(Math.sqrt(Math.max(0,1-(k/(w/2+3))**2))*10); R(cx-k,y-4-d,1,d,W[0]); R(cx+k,y-4-d,1,d,W[0]); if(d>2){ R(cx-k,y-3-d+1,1,d-2,W[3]); R(cx+k,y-3-d+1,1,d-2,W[3]); } }
    for(let k=0;k<=Math.floor(w/2);k++){ const d=Math.round(Math.sqrt(Math.max(0,1-(k/(w/2))**2))*7); R(cx-k,y-d,1,d,P.night?'#121731':P.sky[0]); R(cx+k,y-d,1,d,P.night?'#121731':P.sky[0]); } }
}
function curtainPair(o,x,y,w,h,CU,tie){ const R=(a,b,c,d,e)=>o.r(a,b,c,d,e);
  for(let i=0;i<w;i++){ const ph=i%6; R(x+i,y,1,h,ph<2?CU[2]:ph<3?CU[3]:ph<5?CU[1]:CU[0]); }
  R(x,y,w,1,CU[0]); R(x,y+h-1,w,1,CU[0]); if(tie){ R(x-1,y+Math.floor(h*.55),w+2,3,GD2[2]); R(x-1,y+Math.floor(h*.55)+2,w+2,1,GD2[0]); } }
function sconce(o,x,y){ const R=(a,b,c,d,e)=>o.r(a,b,c,d,e); R(x-2,y+6,5,2,GD2[1]); R(x-1,y+8,3,3,GD2[2]); R(x,y,1,6,'#f2ead8'); R(x,y-3,1,3,'#ffd75a'); o.p(x,y-4,'#fff0a8'); }
function warmGlow(o,cx,cy,rs){ const x=o.x; x.save(); x.globalCompositeOperation='lighter'; rs.forEach(r=>{ x.globalAlpha=r[1]; o.ell(cx,cy,r[0],Math.round(r[0]*.8),'#ffb35a'); }); x.restore(); }
// ════ 대저택 버전 (사용자: "완전 대저택이어야 해") ════
// 외관: 가운데 3층 본관 + 좌우 날개, 기둥 현관과 박공, 망사르 지붕과 지붕창, 대리석 계단, 분수, 철문
function exterior3(o,P){
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  bands(o,0,0,240,96,[P.sky[0],P.sky[0],P.sky[1],P.sky[1],P.sky[2]]);
  const cl=mix(P.sky[2],'#ffffff',.6), cs=mix(cl,P.sky[1],.4);
  [[22,12],[200,8]].forEach(c=>{ o.ell(c[0],c[1],10,3,cl); o.ell(c[0]+8,c[1]-2,7,3,cl); R(c[0]-12,c[1]+3,28,1,cs); });
  for(let X=0;X<240;X++){ const h=Math.round(84+Math.sin(X/23)*3); R(X,h,1,40,P.far[0]); px(X,h,mix(P.far[0],'#ffffff',.2)); }
  // 뒤 나무숲 (건물 양옆으로 살짝)
  for(let X=-4;X<250;X+=13){ const y=86+((X*7)%5); o.ell(X,y,9,8,mix(P.leaf[2],'#000000',.3)); o.ell(X-1,y-1,8,7,P.leaf[2]); o.ell(X-3,y-3,4,3,P.leaf[1]); }
  // 땅·앞마당(자갈)
  R(0,112,240,48,P.gr[0]); R(0,112,240,1,mix(P.gr[0],'#ffffff',.2)); R(0,140,240,20,P.gr[1]); R(0,140,240,1,P.gr[2]);
  o.poly([[20,160],[220,160],[180,116],[60,116]],'#cfc4aa'); o.poly([[24,160],[216,160],[178,118],[62,118]],'#ddd3bb');
  for(let k=0;k<60;k++){ const X=40+(k*37)%160, Y=120+(k*13)%40; px(X,Y,'#bcb096'); }
  const ST=['#7e7064','#a89a86','#d2c6ae','#ebe2cc','#f8f2e2'];       // 크림색 돌
  const RF=['#22223a','#30304e','#42426a','#58588a'];                // 슬레이트
  const win=(x,y,w,h,lit)=>{ R(x-1,y-1,w+2,h+2,ST[0]); R(x,y,w,h,lit?'#f2c25a':'#4e6488');
    if(lit){ R(x,y,w,Math.floor(h/3),'#fde49a'); R(x,y,2,h,'#b84a5e'); R(x+w-2,y,2,h,'#b84a5e'); } else { R(x+1,y+1,Math.floor(w/2)-1,Math.floor(h/2),'#7a90b4'); px(x+1,y+1,'#b8c8e0'); }
    R(x+Math.floor(w/2),y,1,h,ST[0]); R(x,y+Math.floor(h/2),w,1,ST[0]); R(x-2,y+h+1,w+4,2,ST[3]); R(x-2,y+h+2,w+4,1,ST[1]); R(x-1,y-3,w+2,2,ST[3]); };
  // 날개 (왼쪽·오른쪽): 2층 + 지붕창
  [[8,76],[156,76]].forEach((wg,wi)=>{ const x=wg[0], w=wg[1];
    R(x,50,w,64,ST[0]); R(x+1,51,w-2,62,ST[2]); R(x+1,51,2,62,ST[3]); R(x+w-4,51,3,62,ST[1]);
    for(let Y=56;Y<112;Y+=6) R(x+1,Y,w-2,1,ST[1]);
    R(x,79,w,2,ST[3]); R(x,81,w,1,ST[1]);          // 층 띠
    R(x,110,w,4,ST[1]); R(x,110,w,1,ST[3]);
    // 망사르 지붕
    o.poly([[x-3,51],[x+w+3,51],[x+w-4,36],[x+4,36]],RF[0]); o.poly([[x-1,50],[x+w+1,50],[x+w-5,38],[x+5,38]],RF[2]);
    for(let Y=40;Y<50;Y+=3) R(x+2,Y,w-4,1,RF[1]); R(x+4,35,w-8,2,RF[3]);
    for(let k=0;k<3;k++){ const dx=x+14+k*22; R(dx,38,10,12,ST[2]); o.poly([[dx-2,39],[dx+12,39],[dx+5,32]],RF[1]); R(dx+2,41,6,7,'#4e6488'); R(dx+5,41,1,7,ST[0]); }
    // 창: 2층(이층) y58, 1층 y86
    for(let k=0;k<4;k++){ const wx=x+7+k*18; win(wx,58,8,16, wi===0&&k===0); win(wx,86,8,18,false); }
  });
  // 본관 (가운데, 3층)
  const cx=84, cw=72;
  R(cx,30,cw,84,ST[0]); R(cx+1,31,cw-2,82,ST[2]); R(cx+1,31,2,82,ST[3]); R(cx+cw-4,31,3,82,ST[1]);
  for(let Y=36;Y<112;Y+=6) R(cx+1,Y,cw-2,1,ST[1]);
  R(cx,54,cw,2,ST[3]); R(cx,79,cw,2,ST[3]);
  o.poly([[cx-4,31],[cx+cw+4,31],[cx+cw-6,12],[cx+6,12]],RF[0]); o.poly([[cx-2,30],[cx+cw+2,30],[cx+cw-7,14],[cx+7,14]],RF[2]);
  for(let Y=17;Y<30;Y+=3) R(cx+2,Y,cw-4,1,RF[1]); R(cx+6,11,cw-12,2,RF[3]);
  // 지붕 위 시계 박공
  R(114,4,12,10,ST[2]); o.poly([[111,5],[129,5],[120,-2]],RF[1]); o.ell(120,9,3,3,ST[0]); o.ell(120,9,2,2,'#f8f2e2'); px(120,8,ST[0]); px(121,9,ST[0]);
  // 굴뚝
  [[22,26],[60,28],[176,28],[214,26],[96,4],[140,4]].forEach(c=>{ R(c[0]-1,c[1],8,12,'#3a2a26'); R(c[0],c[1]+1,6,11,'#9a6a54'); R(c[0],c[1]+1,2,11,'#b88a70'); R(c[0]-1,c[1],8,2,'#6a4a40'); });
  // 본관 창: 3층 y36, 2층 y58
  for(let k=0;k<4;k++){ const wx=cx+6+k*17; if(k===1||k===2){ win(wx,36,9,13,false); } else { win(wx,36,9,13,false); win(wx,58,9,17,false); } }
  // 기둥 현관 + 박공
  const PX0=98, PW=44;
  o.poly([[PX0-4,58],[PX0+PW+4,58],[120,44]],ST[0]); o.poly([[PX0-1,57],[PX0+PW+1,57],[120,46]],ST[3]); o.poly([[PX0+6,55],[PX0+PW-6,55],[120,49]],ST[2]);
  R(PX0-4,57,PW+8,3,ST[4]); R(PX0-4,60,PW+8,1,ST[0]);
  R(PX0,61,PW,50,'#5a4a44'); R(PX0+1,62,PW-2,48,'#7a665a');
  [PX0,PX0+12,PX0+28,PX0+40].forEach(x=>{ R(x,61,5,50,ST[0]); R(x+1,61,3,50,ST[3]); R(x+1,61,1,50,ST[4]); R(x-1,60,7,2,ST[4]); R(x-1,109,7,2,ST[1]); });
  // 정문
  R(110,74,20,37,'#2e1e18'); R(111,76,18,35,'#6e4a3a'); for(let k=0;k<10;k++){ const d=Math.round(Math.sqrt(1-(k/10)**2)*5); R(120-k,75-d,1,d,'#2e1e18'); R(120+k,75-d,1,d,'#2e1e18'); }
  R(119,76,2,35,'#2e1e18'); [[113,80],[122,80],[113,94],[122,94]].forEach(p=>{ R(p[0],p[1],6,12,'#5a3a2e'); R(p[0]+1,p[1]+1,4,1,'#8a5e48'); }); px(117,92,GD2[3]); px(123,92,GD2[3]);
  R(108,70,24,3,'#ffd36a'); R(110,70,20,1,'#fff0b0');   // 문 위 반원창 빛
  // 대리석 계단 (넓게)
  for(let k=0;k<5;k++){ const w=52+k*10, Y=111+k*2; R(120-w/2,Y,w,2,k%2?ST[2]:ST[3]); R(120-w/2,Y,w,1,ST[4]); }
  // 등 기둥
  [[90,121],[150,121]].forEach(p=>{ R(p[0],p[1]-18,2,18,'#2e2438'); R(p[0]-2,p[1]-24,6,6,'#2e2438'); R(p[0]-1,p[1]-23,4,4,'#ffd36a'); px(p[0],p[1]-22,'#fff4b8'); });
  // 분수 (앞마당 가운데)
  o.ell(120,140,26,6,ST[0]); o.ell(120,139,25,5,ST[3]); o.ell(120,139,22,4,'#5a7aa8'); o.ell(118,138,14,2,'#7a9ac8'); R(117,124,6,15,ST[2]); R(117,124,2,15,ST[4]); o.ell(120,124,8,2,ST[3]); o.ell(120,123,7,1,'#7a9ac8');
  [[116,118],[124,118],[120,116]].forEach(d=>{ px(d[0],d[1],'#d8ecff'); px(d[0],d[1]+2,'#b8d4f0'); }); R(119,114,2,9,'#c8e0f8');
  // 철문·울타리 (맨 앞)
  for(let X=0;X<240;X+=6){ if(X>88&&X<150) continue; R(X,144,2,14,'#22202e'); px(X,143,'#6a5a7a'); px(X+1,142,'#6a5a7a'); }
  R(0,147,90,1,'#22202e'); R(150,147,90,1,'#22202e'); R(0,155,90,1,'#22202e'); R(150,155,90,1,'#22202e');
  [[84,136],[150,136]].forEach(p=>{ R(p[0],p[1],7,24,ST[1]); R(p[0]+1,p[1],5,24,ST[3]); R(p[0]-1,p[1]-2,9,3,ST[4]); o.ell(p[0]+3,p[1]-4,3,2,ST[2]); });
  // 정원수 (양 끝, 계절)
  const shrub=(x,y)=>{ o.ell(x,y,8,9,mix(P.leaf[2],'#000000',.3)); o.ell(x,y,7,8,P.leaf[2]); o.ell(x-2,y-2,5,5,P.leaf[1]); o.ell(x-3,y-4,2,2,P.leaf[0]); R(x-1,y+8,3,4,P.trunk); };
  [[6,124],[234,124],[46,118],[194,118]].forEach(p=>shrub(p[0],p[1]));
  if(P.part){ for(let k=0;k<22;k++){ const X=(k*97)%236, Y=(k*61)%104+4; px(X,Y,P.part); px(X+1,Y,P.part==='#ffffff'?'#e8eef6':mix(P.part,'#7a3a14',.35)); } }
}
// 현관 홀: 2층 높이, 가운데서 갈라지는 대리석 계단, 위층 회랑과 높은 아치 창, 큰 크리스털 샹들리에, 기둥, 초상화
function hall3(o,P){
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  const WL=['#3e2a36','#5a3e4e','#6e4e60','#866478'];
  const MB=['#8a8090','#b4aab4','#d8d0d4','#eee8ea','#ffffff'];  // 대리석
  const RG=['#33121c','#5c1f2d','#7f2c3c','#a1404b','#c0605e'];
  R(0,0,240,108,WL[1]);
  // 천장 몰딩
  R(0,0,240,4,WD2[0]); R(0,4,240,2,GD2[2]); R(0,6,240,1,GD2[0]); for(let X=2;X<240;X+=6){ R(X,7,3,2,MB[2]); px(X,9,MB[0]); }
  // 뒤 벽 위층: 높은 아치 창 3개
  [[60,12],[106,10],[152,12]].forEach((w,i)=>{ const ww=i===1?28:24, wh=i===1?42:38; frameWin(o,w[0]+(i===1?0:2),w[1]+6,ww,wh,P,{arch:true}); });
  // 위층 회랑 (난간)
  R(0,62,240,6,MB[1]); R(0,62,240,1,MB[3]); R(0,67,240,1,MB[0]);
  R(0,52,240,2,MB[2]); R(0,52,240,1,MB[4]); for(let X=2;X<240;X+=5){ R(X,54,2,8,MB[2]); px(X,54,MB[4]); R(X+1,55,1,7,MB[0]); }
  // 아래층 뒤 벽 (판넬) + 가운데 아치 통로
  R(0,68,240,40,WL[0]);
  for(let X=4;X<240;X+=26){ if(X>86&&X<150) continue; R(X,72,20,30,WL[1]); R(X,72,20,1,WL[3]); R(X,72,1,30,WL[3]); R(X+19,72,1,30,'#2a1c26'); }
  // 초상화 (위층 양쪽 벽)
  [[14,18],[196,18]].forEach(p=>{ R(p[0],p[1],30,30,GD2[0]); R(p[0]+1,p[1]+1,28,28,GD2[2]); R(p[0]+3,p[1]+3,24,24,'#2a2430'); o.ell(p[0]+15,p[1]+12,5,6,'#d8b8a0'); R(p[0]+7,p[1]+18,16,9,'#3a3a52'); R(p[0]+12,p[1]+5,6,3,'#3a2a26'); });
  // 기둥 (양 옆)
  [[48,8],[184,8]].forEach(c=>{ const x=c[0]; R(x,8,10,100,MB[0]); R(x+1,8,8,100,MB[2]); R(x+2,8,2,100,MB[4]); R(x+7,8,2,100,MB[1]); R(x-2,8,14,4,MB[3]); R(x-2,104,14,4,MB[1]); R(x-2,104,14,1,MB[3]); });
  // 바닥: 대리석 격자 (원근감 있게 위는 좁게)
  for(let j=0;j<6;j++){ const Y=108+j*9+Math.floor(j*j/3), h=7+j; for(let X=-(j%2)*12;X<240;X+=24){ R(X,Y,12,h,'#c8bca8'); R(X+12,Y,12,h,'#8a7a88'); R(X,Y,12,1,'#ddd2c0'); R(X+12,Y,12,1,'#9e8e9c'); } }
  R(0,108,240,1,'#2a1c26');
  // 가운데 계단: 바닥(108)에서 계단참(70)까지 넓게, 붉은 양탄자
  for(let k=0;k<10;k++){ const Y=104-k*4, w=96-k*3; R(120-w/2,Y,w,4,MB[2]); R(120-w/2,Y,w,1,MB[4]); R(120-w/2,Y+3,w,1,MB[0]); R(120-18,Y,36,4,RG[2]); R(120-18,Y,36,1,RG[4]); R(120-18,Y+3,36,1,RG[0]); }
  R(80,64,80,6,MB[3]); R(80,64,80,1,MB[4]); R(80,69,80,1,MB[0]);   // 계단참
  // 계단참에서 좌우 위층으로 갈라지는 계단
  for(let k=0;k<6;k++){ const Y=63-k*2; R(80-k*5-12,Y,14,2,MB[2]); R(80-k*5-12,Y,14,1,MB[4]); R(146+k*5,Y,14,2,MB[2]); R(146+k*5,Y,14,1,MB[4]); R(80-k*5-9,Y,8,2,RG[2]); R(149+k*5,Y,8,2,RG[2]); }
  // 계단 난간 (가운데 계단 양옆)
  o.line(68,106,82,66,MB[0]); o.line(69,106,83,66,MB[3]); o.line(172,106,158,66,MB[0]); o.line(171,106,157,66,MB[3]);
  for(let k=0;k<8;k++){ const t=k/8; const xl=Math.round(68+14*t), xr=Math.round(172-14*t), y=Math.round(106-40*t); R(xl,y,2,6,MB[1]); R(xr-1,y,2,6,MB[1]); }
  [[64,100],[172,100]].forEach(p=>{ R(p[0],p[1],6,10,MB[1]); R(p[0]+1,p[1],4,10,MB[3]); o.ell(p[0]+3,p[1]-2,3,2,MB[2]); });
  // 큰 크리스털 샹들리에
  o.line(120,0,120,14,GD2[1]); R(100,14,41,2,GD2[2]); R(104,16,33,1,GD2[0]); R(108,20,25,2,GD2[2]); R(110,22,21,1,GD2[0]);
  [100,106,112,118,124,130,136,140].forEach(x=>{ R(x,10,1,4,'#f2ead8'); px(x,9,'#ffd75a'); px(x,8,'#fff0a8'); });
  for(let x=102;x<140;x+=3){ px(x,17,'#d8e8f0'); px(x,18,'#a8c0d0'); } for(let x=110;x<132;x+=3){ px(x,23,'#d8e8f0'); px(x,24,'#a8c0d0'); px(x+1,26,'#e8f4ff'); }
  warmGlow(o,120,14,[[40,.04],[24,.06],[12,.08]]);
  // 앞쪽 큰 양탄자
  o.poly([[62,152],[178,152],[166,118],[74,118]],RG[0]); o.poly([[65,150],[175,150],[164,120],[76,120]],RG[2]); o.poly([[74,146],[166,146],[158,124],[82,124]],RG[1]);
  for(let X=66;X<174;X+=3) px(X,151,GD2[1]);
}
// 공부방(대저택판): 높은 천장 몰딩, 다마스크 벽지, 대리석 벽난로와 거울·탁상시계, 높은 창, 책장, 지도, 지구본, 책상과 의자, 작은 샹들리에
function school3(o,P){
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  const WP=['#3a4a3a','#4e6450','#5e7860','#72906e'];      // 짙은 세이지 벽지
  const MB=['#8a8090','#b4aab4','#d8d0d4','#eee8ea','#ffffff'];
  const GR=['#2a3e2a','#3e5a3c','#557a50','#709868'];
  R(0,0,240,94,WP[1]);
  for(let X=0;X<240;X+=12) for(let Y=16;Y<60;Y+=12){ px(X+6,Y,WP[3]); px(X+5,Y+1,WP[3]); px(X+7,Y+1,WP[3]); px(X+6,Y+2,WP[3]); px(X+6,Y+1,WP[2]); px(X,Y+6,WP[2]); }
  R(0,0,240,4,WD2[0]); R(0,4,240,3,MB[2]); R(0,4,240,1,MB[4]); for(let X=1;X<240;X+=4){ R(X,7,2,2,MB[1]); } R(0,9,240,1,GD2[1]);
  R(0,62,240,1,WD2[0]); R(0,63,240,2,WD2[4]); R(0,65,240,1,WD2[2]); R(0,66,240,24,WD2[2]);
  for(let X=2;X<240;X+=30){ R(X,69,26,18,WD2[1]); R(X+1,70,24,16,WD2[2]); R(X+1,70,24,1,WD2[0]); R(X+2,85,23,1,WD2[3]); R(X+25,71,1,15,WD2[3]); }
  R(0,88,240,1,WD2[3]); R(0,89,240,4,WD2[1]); R(0,93,240,1,WD2[0]);
  plankFloor(o,94,WD2);
  // 높은 창 + 녹색 커튼 (오른쪽)
  frameWin(o,180,16,34,58,P,{arch:true});
  curtainPair(o,168,10,10,74,GR,true); curtainPair(o,216,10,10,74,GR,true); R(164,6,66,4,GD2[1]); R(164,6,66,1,GD2[3]);
  // 지도 액자 (왼쪽 위)
  R(10,16,60,40,WD2[0]); R(11,17,58,38,GD2[1]); R(11,17,58,1,GD2[3]); R(13,19,54,34,'#e8dcb8');
  o.poly([[17,28],[27,23],[37,27],[40,37],[32,45],[20,42]],'#a8c890'); o.poly([[46,32],[58,27],[64,34],[60,46],[48,46]],'#d8a888');
  o.line(22,36,32,30,'#4a6aa0'); o.line(32,30,44,38,'#4a6aa0'); o.line(44,38,58,34,'#4a6aa0');
  // 대리석 벽난로 + 거울 + 탁상시계 (가운데)
  R(92,14,52,40,GD2[0]); R(93,15,50,38,GD2[2]); R(95,17,46,34,'#9aa8b4'); R(96,18,44,32,'#b4c0cc'); o.line(100,20,108,30,'#e0e8f0'); o.line(103,20,111,30,'#d0dae4');
  R(84,56,68,5,MB[2]); R(84,56,68,1,MB[4]); R(84,60,68,1,MB[0]);
  R(88,61,60,33,MB[1]); R(89,61,58,33,MB[2]); R(89,61,3,33,MB[4]); R(144,61,3,33,MB[0]);
  R(100,68,36,26,'#1a1214'); for(let k=0;k<18;k++){ const d=Math.round(Math.sqrt(1-(k/18)**2)*6); R(118-k,68,1,d,MB[2]); R(118+k,68,1,d,MB[2]); }
  R(102,88,32,4,'#3a2a26'); o.ell(118,86,8,4,'#e07a2a'); o.ell(118,85,5,3,'#f6b84a'); o.ell(118,84,2,2,'#ffe8a0');
  R(98,92,40,2,'#2a2228');
  R(112,46,12,10,WD2[1]); R(113,47,10,8,WD2[3]); o.ell(118,50,3,3,'#f6f0de'); px(118,49,'#2a2228'); px(119,50,'#2a2228'); R(110,55,16,1,WD2[0]);   // 탁상시계
  R(94,50,4,6,GD2[2]); R(95,47,2,3,'#f2ead8'); R(138,50,4,6,GD2[2]); R(139,47,2,3,'#f2ead8');   // 촛대
  // 책장 (왼쪽 아래)
  R(6,62,52,32,WD2[0]); R(7,63,50,30,WD2[2]);
  const BK=[['#5a1e2a','#7e2e3a'],['#1e3354','#2c4a78'],['#24402a','#36603c'],['#5e4a1e','#8a6c2c'],['#3e2448','#5a3466']];
  for(let sh=0;sh<2;sh++){ const top=65+sh*14; R(9,top,46,12,'#1a0f0b'); for(let X=10,k=0;X<53;k++){ const w=3+((k*7)%3), h=8+((k*5)%4), c=BK[(k*3+sh)%5]; R(X,top+12-h,w,h,c[1]); R(X,top+12-h,1,h,c[0]); X+=w; } R(8,top+12,48,2,WD2[3]); }
  // 지구본
  o.ell(30,54,7,7,'#4a7aa8'); o.ell(28,52,4,4,'#6a9ac0'); o.poly([[26,50],[31,49],[33,54],[28,57]],'#7aa868'); px(26,49,'#ffffff'); o.line(22,54,30,46,GD2[2]); o.line(30,46,38,54,GD2[2]); R(29,61,3,1,GD2[1]); R(30,60,1,2,GD2[1]);
  // 책상 + 의자 (앞쪽 가운데 오른쪽)
  const DT=['#2a1710','#4d2d1f','#6e4128','#91583a','#b4774f'];
  R(150,110,80,1,DT[0]); R(148,111,84,6,DT[3]); R(148,111,84,1,DT[4]); R(148,117,84,4,DT[2]); R(148,121,84,1,DT[0]);
  [[152,121],[224,121]].forEach(l=>{ R(l[0],l[1],5,28,DT[1]); R(l[0],l[1],1,28,DT[3]); R(l[0]+4,l[1],1,28,DT[0]); });
  R(170,105,22,7,'#e9e2cf'); R(172,104,20,7,'#f6f0de'); for(let k=0;k<3;k++) R(174,106+k*2,14,1,'#a8a090');
  R(198,106,6,5,'#1b1824'); o.line(202,105,210,94,'#efe7d4');
  R(212,106,14,5,'#7e2e3a'); R(212,106,14,1,'#a54852'); R(213,108,12,1,GD2[2]);
  // 의자 등받이 (책상 앞)
  R(184,122,16,24,DT[1]); R(185,123,14,22,'#7a2e3a'); R(185,123,14,1,'#a54852'); R(184,146,3,8,DT[1]); R(197,146,3,8,DT[1]);
  // 작은 샹들리에
  o.line(60,0,60,10,GD2[1]); R(50,10,21,2,GD2[2]); [50,56,62,68].forEach(x=>{ R(x,6,1,4,'#f2ead8'); px(x,5,'#ffd75a'); }); for(let x=52;x<70;x+=3) px(x,13,'#d8e8f0');
  // 녹색 깔개
  o.ell(90,140,40,8,GR[0]); o.ell(90,139,38,7,GR[2]); o.ell(90,139,30,4,GR[1]); for(let X=54;X<128;X+=4) px(X,147,GR[3]);
  warmGlow(o,118,86,[[30,.05],[16,.07]]);
}
// 침실(최종): 나무 벽·나무 바닥·나무 가구 + 천(휘장·커튼·침구·양탄자)만 로판풍
function bedroom5(o,P){
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  const CR=['#b8a894','#d8cab4','#ece0cc','#f6eedf','#fbf6ec'];    // 크림
  const SB=['#4c5c7a','#6a7e9c','#8ea2bc','#b4c2d4','#d6dee6'];    // 하늘색
  const G=['#6e5226','#9c7a3e','#c4a05e','#e2c88e'];               // 금
  const SH=['#d4cabc','#e4dccf','#f0e9de','#f8f3ea'];              // 얇은 휘장
  const WB=['#4a3020','#6a4a30','#86603e','#a27a52','#bc9468'];    // 따뜻한 나무
  // 벽: 나무 판벽 (세로 판자 + 아래 액자 판넬)
  R(0,0,240,96,WB[2]);
  for(let X=0;X<240;X+=10){ R(X,10,1,54,WB[1]); R(X+1,10,1,54,WB[3]); }
  R(0,0,240,4,WB[0]); R(0,4,240,3,WB[3]); R(0,4,240,1,WB[4]); for(let X=1;X<240;X+=4) R(X,7,2,2,WB[1]); R(0,9,240,1,WB[0]);
  R(0,63,240,1,WB[0]); R(0,64,240,2,WB[4]); R(0,66,240,26,WB[2]);
  for(let X=3;X<240;X+=30){ R(X,69,25,19,WB[1]); R(X+1,70,23,17,WB[2]); R(X+1,70,23,1,WB[0]); R(X+2,86,22,1,WB[3]); R(X+24,71,1,15,WB[3]); }
  R(0,91,240,1,WB[3]); R(0,92,240,2,WB[1]); R(0,94,240,1,WB[0]);
  plankFloor(o,95,['#4a3020','#6a4a30','#7e5a3a','#98724e','#b08a62']);
  // 창: 얇은 흰 커튼 + 하늘색 휘장(스와그)과 술
  frameWin(o,150,18,34,50,P,{arch:true});
  for(let i=0;i<10;i++){ const c=i%4<2?SH[1]:SH[2]; R(140+i,12,1,72,c); R(184+i+2,12,1,72,c); }
  o.poly([[136,10],[198,10],[198,16],[184,22],[167,24],[150,22],[136,16]],SB[1]); o.poly([[138,11],[196,11],[196,15],[183,20],[167,22],[151,20],[138,15]],SB[3]);
  for(let X=140;X<196;X+=4) px(X,16+Math.round(4*Math.sin((X-138)/58*Math.PI)),SB[0]);
  [[138,16],[196,16]].forEach(t=>{ R(t[0]-1,t[1],3,10,G[2]); R(t[0]-2,t[1]+10,5,4,G[1]); px(t[0],t[1]+10,G[3]); });
  R(134,7,66,3,G[2]); R(134,7,66,1,G[3]); o.ell(134,8,2,2,G[3]); o.ell(200,8,2,2,G[3]);
  // 나무 책상 (창가)
  const DT=WB;
  R(146,92,44,1,DT[0]); R(144,93,48,4,DT[3]); R(144,93,48,1,DT[4]); R(144,97,48,7,DT[2]); R(144,104,48,1,DT[0]);
  R(158,99,20,3,DT[1]); px(168,100,G[2]);
  [[146,105],[187,105]].forEach(l=>{ R(l[0],l[1],3,22,DT[1]); R(l[0],l[1],1,22,DT[3]); R(l[0]+2,l[1],1,22,DT[0]); });
  R(150,88,16,5,'#8a8a96'); R(151,87,14,5,'#a8a8b4'); R(151,87,14,1,'#c8c8d4');
  R(170,88,4,5,'#1b1824'); o.line(172,87,179,77,'#fbf6ec'); o.line(173,87,180,77,'#e8e0d0');
  R(182,84,2,8,'#f2ead8'); px(182,83,'#ffd75a'); px(182,82,'#fff0a8'); R(181,91,4,1,G[2]);
  R(186,86,4,6,SB[3]); o.ell(188,84,3,2,'#d89a9a'); px(187,83,'#f0d0c8'); px(190,85,'#7aa868');
  // 나무 벽난로 틀 + 나무 거울 (오른쪽 끝)
  R(206,18,34,32,WB[0]); R(207,19,32,30,WB[3]); R(209,21,28,26,'#9aa8b8'); R(210,22,26,24,'#b8c6d6'); o.line(213,24,221,34,'#e0e8f0');
  R(204,52,36,4,WB[3]); R(204,52,36,1,WB[4]); R(204,55,36,1,WB[0]); R(206,56,34,38,WB[2]); R(206,56,2,38,WB[4]); R(238,56,2,38,WB[1]);
  R(212,64,26,30,'#1a1214'); R(214,86,22,4,'#3a2a26'); o.ell(225,84,8,4,'#e07a2a'); o.ell(225,83,5,3,'#f6b84a'); o.ell(225,82,2,2,'#ffe8a0');
  R(212,62,26,2,WB[1]); R(216,46,4,6,SB[3]); o.ell(218,44,3,2,'#d89a9a'); R(230,44,2,8,'#f2ead8'); px(230,43,'#ffd75a');
  // 크리스털 샹들리에
  o.line(120,0,120,10,G[1]); R(106,10,29,2,G[2]); R(110,14,21,1,G[1]);
  [106,112,118,124,130,134].forEach(x=>{ R(x,6,1,4,'#f2ead8'); px(x,5,'#ffd75a'); });
  for(let x=107;x<134;x+=3){ px(x,13,'#f4ece0'); px(x,14,'#d8ccb8'); } for(let x=112;x<130;x+=3){ px(x,17,'#f4ece0'); px(x+1,19,'#fbf6ec'); }
  // 침대: 금관(코로나)에서 흘러내리는 얇은 휘장
  const bx=56;   // 침대 가운데
  // 휘장 뒤판 (하늘색 비단)
  o.poly([[bx-26,26],[bx+26,26],[bx+40,128],[bx-40,128]],SB[2]);
  for(let i=-38;i<=38;i+=4) o.line(bx+Math.round(i*.66),28,bx+i,126,SB[1]);
  // 금관
  o.poly([[bx-14,22],[bx+14,22],[bx+10,12],[bx-10,12]],G[1]); R(bx-14,22,28,3,G[2]); R(bx-14,22,28,1,G[3]);
  [[bx-10,12],[bx-4,10],[bx+4,10],[bx+10,12]].forEach(c=>{ R(c[0]-1,c[1]-4,3,4,G[2]); px(c[0],c[1]-5,G[3]); });
  o.ell(bx,8,3,3,G[2]); px(bx,7,G[3]);
  // 얇은 휘장 (양쪽으로 흘러내려 묶임)
  const drape=(dir)=>{ for(let y=25;y<132;y++){ const t=(y-25)/107; const xo=Math.round(dir*(14+t*36)), w=Math.round(10+t*10 - (y>78&&y<86?6:0));
      for(let i=0;i<w;i++){ const x=bx+xo+(dir>0?-i:i)-(dir>0?0:0); const ph=(i+Math.round(y/9))%5; o.p(x,y,ph<2?SH[2]:ph<3?SH[3]:ph<4?SH[1]:SH[0]); } }
    const ty=82, tx=bx+Math.round(dir*(14+(ty-25)/107*36)); R(tx-(dir>0?8:0),ty,8,3,G[2]); R(tx-(dir>0?8:0),ty,8,1,G[3]); };
  drape(-1); drape(1);
  // 머리판 (금 소용돌이 + 하늘색 누빔)
  for(let k=0;k<24;k++){ const d=Math.round(Math.sqrt(1-(k/24)**2)*10); R(bx-k,60-d,1,d+12,WB[2]); R(bx+k,60-d,1,d+12,WB[2]); if(k%6===0){ R(bx-k,60-d,1,2,WB[4]); R(bx+k,60-d,1,2,WB[4]); } }
  for(let k=0;k<22;k++){ const d=Math.round(Math.sqrt(1-(k/22)**2)*9); R(bx-k,61-d,1,d+10,SB[3]); R(bx+k,61-d,1,d+10,SB[3]); }
  for(let yy=56;yy<70;yy+=5) for(let xx=bx-18;xx<=bx+18;xx+=6) px(xx+((yy/5)%2?3:0),yy,SB[1]);
  o.ell(bx,48,3,2,WB[4]); px(bx,47,'#fbf6ec');
  // 매트리스 + 이불(누빔, 금테) + 레이스 스커트
  R(bx-32,74,64,10,CR[4]); R(bx-32,74,64,1,'#fbf6ec');
  o.ell(bx-14,73,11,5,CR[4]); o.ell(bx+14,73,11,5,CR[4]); o.ell(bx-14,72,8,3,'#fbf6ec'); o.ell(bx+14,72,8,3,'#fbf6ec');   // 큰 베개
  o.ell(bx,76,7,4,SB[3]); o.ell(bx,75,5,2,SB[4]); o.ell(bx-6,77,4,3,'#d8a8a0'); o.ell(bx+6,77,4,3,'#d8a8a0');            // 작은 쿠션
  R(bx-34,82,68,26,SB[2]); R(bx-34,82,68,2,SB[4]); R(bx-34,82,68,1,'#fbf6ec');
  for(let yy=88;yy<106;yy+=6) for(let xx=bx-30;xx<bx+32;xx+=8){ px(xx+((yy/6)%2?4:0),yy,SB[1]); px(xx+((yy/6)%2?4:0)+1,yy+1,SB[3]); }
  R(bx-34,104,68,2,G[2]); R(bx-34,106,68,1,G[0]);
  for(let X=bx-36;X<bx+36;X++){ const yy=108+((X%4)<2?0:1); R(X,yy-1,1,14-(yy-108),CR[3]); px(X,120,(X%4<2)?CR[4]:CR[1]); if(X%4===0) px(X,112,CR[1]); }
  R(bx-36,107,72,1,CR[1]);
  [[bx-36,121],[bx+33,121]].forEach(l=>{ R(l[0],l[1],3,8,WB[1]); R(l[0],l[1],1,8,WB[4]); o.ell(l[0]+1,l[1]+8,2,1,WB[0]); });
  R(bx-37,118,74,3,WB[2]); R(bx-37,118,74,1,WB[4]);
  // 둥근 꽃무늬 양탄자
  o.ell(150,140,52,10,'#a8867e'); o.ell(150,139,50,9,'#e8d4c8'); o.ell(150,139,40,6,'#d4b4a8'); o.ell(150,139,30,4,'#efe0d4');
  [[118,139],[134,143],[150,135],[166,143],[182,139],[150,143]].forEach(f=>{ o.ell(f[0],f[1],2,1,'#c48078'); px(f[0],f[1],'#f6e6dc'); px(f[0]+3,f[1],'#7aa868'); });
  for(let k=0;k<40;k++){ const a=k/40*Math.PI*2; px(150+Math.round(Math.cos(a)*51),139+Math.round(Math.sin(a)*10),G[2]); }
  warmGlow(o,225,82,[[30,.05],[16,.07]]); warmGlow(o,182,82,[[10,.06]]);

  { const X=o.x; X.save(); X.globalCompositeOperation='multiply'; X.globalAlpha=.10; X.fillStyle='#e8b888'; X.fillRect(0,0,240,160); X.restore();
    X.save(); X.globalCompositeOperation='soft-light'; X.globalAlpha=.18; X.fillStyle='#ffd8a0'; X.fillRect(0,0,240,160); X.restore(); }
}
// 식당: 긴 식탁이 안쪽으로 멀어지는 구도, 양 끝 의자, 반대편 빈 의자 앞에도 식기, 샹들리에 둘, 높은 창, 찬장
function dining3(o,P){
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  const WL=['#3e2a36','#5a3e4e','#6e4e60','#866478'];
  const MB=['#8a8090','#b4aab4','#d8d0d4','#eee8ea','#ffffff'];
  const RG=['#33121c','#5c1f2d','#7f2c3c','#a1404b','#c0605e'];
  R(0,0,240,96,WL[1]);
  for(let X=0;X<240;X+=12){ R(X,10,2,48,WL[2]); R(X+2,10,1,48,WL[0]); }
  R(0,0,240,4,WD2[0]); R(0,4,240,3,MB[2]); R(0,4,240,1,MB[4]); for(let X=1;X<240;X+=4) R(X,7,2,2,MB[1]); R(0,9,240,1,GD2[1]);
  R(0,58,240,1,WD2[0]); R(0,59,240,2,GD2[2]); R(0,61,240,1,GD2[0]); R(0,62,240,32,WL[0]);
  for(let X=4;X<240;X+=28){ R(X,66,22,24,WL[1]); R(X,66,22,1,WL[3]); R(X+21,66,1,24,'#2a1c26'); }
  R(0,93,240,1,WD2[0]);
  plankFloor(o,94,WD2);
  // 높은 창 둘 + 붉은 커튼
  [[22,14],[188,14]].forEach(w=>{ frameWin(o,w[0],w[1],30,52,P,{arch:true}); curtainPair(o,w[0]-12,8,10,72,['#4a1828','#6e2236','#923048','#b04a5e'],true); curtainPair(o,w[0]+32,8,10,72,['#4a1828','#6e2236','#923048','#b04a5e'],true); });
  // 안쪽 벽 찬장 (가운데)
  R(92,30,56,62,WD2[0]); R(93,31,54,60,WD2[2]); R(93,31,54,1,WD2[4]);
  for(let sh=0;sh<2;sh++){ const Y=36+sh*14; R(96,Y,48,11,'#2a1c26'); for(let k=0;k<6;k++){ o.ell(100+k*8,Y+6,3,3,'#e8e4ee'); o.ell(100+k*8,Y+6,1,1,'#a8b8d8'); } R(95,Y+11,50,2,WD2[3]); }
  R(96,66,22,22,WD2[1]); R(122,66,22,22,WD2[1]); R(97,67,20,20,WD2[3]); R(123,67,20,20,WD2[3]); px(117,77,GD2[3]); px(123,77,GD2[3]);
  // 긴 식탁 (원근: 앞은 넓고 안쪽은 좁게)
  o.poly([[50,150],[190,150],[150,96],[90,96]],'#c8bcae'); o.poly([[52,148],[188,148],[149,97],[91,97]],'#f2ede6');
  for(let k=0;k<6;k++){ const t=k/6, y=Math.round(148-52*t), xl=Math.round(52+39*t), xr=Math.round(188-39*t); px(xl,y,'#d8d0c4'); px(xr,y,'#d8d0c4'); }
  R(50,150,140,6,'#e8e2d8'); for(let X=50;X<190;X+=5){ R(X,156,3,2,'#d8d0c4'); } R(50,150,140,1,'#ffffff');
  R(84,96,72,1,'#a89a8c');
  o.poly([[112,148],[128,148],[124,97],[116,97]],RG[2]);   // 식탁 가운데 붉은 러너
  // 촛대 (식탁 위)
  [[104,118],[136,118],[110,104],[130,104]].forEach((c,i)=>{ const h=i<2?10:7; R(c[0],c[1]-h,2,h,GD2[2]); R(c[0]-2,c[1],6,1,GD2[1]); px(c[0],c[1]-h-1,'#ffd75a'); px(c[0],c[1]-h-2,'#fff0a8'); });
  // 반대편(안쪽) 끝 빈 의자 + 그 앞 식기
  R(112,78,16,20,WD2[1]); R(113,79,14,18,'#7a2e3a'); R(113,79,14,1,'#a54852'); o.ell(120,78,8,2,WD2[2]);
  o.ell(120,100,5,2,'#ffffff'); o.ell(120,100,3,1,'#d8e0ec'); R(113,99,1,3,'#c0c4cc'); R(127,99,1,3,'#c0c4cc');
  // 앞쪽 끝 의자 (아델라인 자리, 등받이만 보임)
  R(108,150,24,10,WD2[1]); R(109,151,22,9,'#7a2e3a'); R(109,151,22,1,'#a54852');
  // 샹들리에 둘
  [80,160].forEach(cx=>{ o.line(cx,0,cx,10,GD2[1]); R(cx-10,10,21,2,GD2[2]); [cx-10,cx-4,cx+2,cx+8].forEach(x=>{ R(x,6,1,4,'#f2ead8'); px(x,5,'#ffd75a'); }); for(let x=cx-8;x<cx+10;x+=3) px(x,13,'#d8e8f0'); warmGlow(o,cx,10,[[22,.04],[12,.06]]); });
}
// 부엌: 큰 화덕(불)과 옆 낮은 의자, 구리 냄비 줄, 말린 허브, 반죽 탁자(빵), 벽돌 아치, 창, 찬장의 그릇들
function kitchen3(o,P){
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  const BR=['#6a3a2a','#8a5038','#a86a4a','#c48a64','#dca880'];   // 벽돌
  const SN=['#6a6058','#8a8078','#aaa096','#c8beb2'];             // 돌바닥
  const CU=['#6a3418','#a0562a','#d0804a','#f0b07a'];             // 구리
  R(0,0,240,100,BR[2]);
  for(let j=0,Y=0;Y<100;j++,Y+=5){ R(0,Y,240,1,BR[1]); for(let X=(j%2)*8;X<240;X+=16){ R(X,Y,1,5,BR[1]); R(X+1,Y+1,6,1,BR[3]); } }
  // 천장 들보
  R(0,0,240,8,WD2[1]); R(0,6,240,2,WD2[0]); for(let X=10;X<240;X+=46){ R(X,0,10,12,WD2[1]); R(X,0,2,12,WD2[3]); R(X,11,10,1,WD2[0]); }
  // 돌바닥
  for(let j=0,Y=100;Y<160;j++,Y+=10){ R(0,Y,240,10,j%2?SN[1]:SN[2]); R(0,Y,240,1,SN[0]); for(let X=(j%2)*14;X<240;X+=28){ R(X,Y,1,10,SN[0]); R(X+1,Y+1,1,9,SN[3]); } }
  { const T=o.x; T.save(); T.translate(74,0);
  // 큰 화덕 (왼쪽, 벽돌 아치)
  R(8,24,76,76,'#3a2420'); R(10,26,72,74,BR[1]); R(10,26,72,2,BR[3]);
  for(let k=0;k<30;k++){ const d=Math.round(Math.sqrt(1-(k/30)**2)*14); R(46-k,40-d,1,d+2,BR[1]); R(46+k,40-d,1,d+2,BR[1]); }
  R(18,40,56,60,'#1a1214'); for(let k=0;k<26;k++){ const d=Math.round(Math.sqrt(1-(k/26)**2)*10); R(46-k,40-d,1,d,'#1a1214'); R(46+k,40-d,1,d,'#1a1214'); }
  R(6,22,80,4,WD2[2]); R(6,22,80,1,WD2[4]); R(6,26,80,1,WD2[0]);   // 화덕 선반
  o.line(46,40,46,60,'#2a2228'); R(34,60,24,12,'#2a2228'); R(35,61,22,10,'#3e3a44'); R(35,61,22,1,'#5a5662'); R(33,58,26,2,'#2a2228');   // 걸린 솥
  R(22,90,48,6,'#3a2a26'); o.ell(46,88,18,6,'#c04a1a'); o.ell(46,86,13,5,'#e07a2a'); o.ell(46,85,8,3,'#f6b84a'); o.ell(46,84,3,2,'#ffe8a0');
  [[30,82],[40,79],[54,80],[62,83]].forEach(f=>{ px(f[0],f[1],'#ffd36a'); px(f[0],f[1]-2,'#f6b84a'); });
  // 선반 위 단지들
  [[14,14],[26,12],[64,14],[74,13]].forEach(j=>{ R(j[0],j[1]+2,8,8,'#7a5a3a'); R(j[0]+1,j[1],6,2,'#5a3e28'); R(j[0],j[1]+2,2,8,'#9a7a54'); });
  T.restore(); }
  // 화덕 옆 낮은 의자 (탠지가 끌어다 놓은 자리)
  R(162,130,18,3,WD2[3]); R(162,130,18,1,WD2[4]); R(162,133,18,2,WD2[1]); R(163,135,2,12,WD2[1]); R(177,135,2,12,WD2[1]);
  // 구리 냄비 줄 (왼쪽 벽)
  R(4,16,74,2,'#3a2a26'); [[12,6],[28,8],[46,7],[64,8]].forEach((c,i)=>{ const x=c[0], r=c[1]; o.line(x,18,x,22,'#3a2a26'); o.ell(x,22+r,r,r,CU[0]); o.ell(x,22+r,r-1,r-1,CU[2]); o.ell(x-2,20+r,Math.max(1,r-4),Math.max(1,r-4),CU[3]); R(x-r,22+r,r*2,Math.ceil(r/2),CU[1]); });
  // 왼쪽 벽 선반의 단지들
  R(4,56,74,3,WD2[3]); R(4,56,74,1,WD2[4]); [[10,46],[24,44],[40,46],[56,45]].forEach(j=>{ R(j[0],j[1]+2,8,8,'#7a5a3a'); R(j[0]+1,j[1],6,2,'#5a3e28'); R(j[0],j[1]+2,2,8,'#9a7a54'); });
  // 말린 허브 다발
  [[214,14],[224,16],[232,13]].forEach(h=>{ o.line(h[0],8,h[0],h[1],'#5a4a30'); for(let k=0;k<5;k++){ px(h[0]-1+(k%3),h[1]+k,'#5a7a3a'); px(h[0]+(k%2),h[1]+k+1,'#7a9a4a'); } });
  // 창 (오른쪽)
  frameWin(o,180,32,34,36,P,{});
  // 찬장 (오른쪽 벽): 접시들
  R(206,74,34,26,WD2[1]); R(207,75,32,24,WD2[2]); for(let sh=0;sh<2;sh++){ const Y=78+sh*10; R(208,Y,30,8,'#2a1c16'); for(let k=0;k<4;k++){ o.ell(212+k*7,Y+4,3,3,'#e8e2d6'); o.ell(212+k*7,Y+4,1,1,'#7a9ac8'); } }
  { const T=o.x; T.save(); T.translate(-100,0);
  // 반죽 탁자 + 빵
  const DT=['#5a3e28','#7a5a3a','#9a7a54','#bc9a70','#d8bc90'];
  R(110,104,92,1,DT[0]); R(108,105,96,8,DT[3]); R(108,105,96,1,DT[4]); R(108,113,96,4,DT[2]); R(108,117,96,1,DT[0]);
  [[112,117],[196,117]].forEach(l=>{ R(l[0],l[1],5,30,DT[1]); R(l[0],l[1],1,30,DT[3]); });
  o.ell(130,102,10,4,'#e8d8b8'); o.ell(128,101,6,2,'#f6ead0'); R(118,104,24,1,'#d8c8a8');   // 반죽
  [[156,101],[170,100],[184,101]].forEach(b=>{ o.ell(b[0],b[1],6,3,'#a8642a'); o.ell(b[0]-1,b[1]-1,4,2,'#d08a3e'); px(b[0]-2,b[1]-2,'#f0b060'); });   // 빵
  o.ell(146,103,4,1,'#e8e4d8'); R(194,98,6,7,'#c8c0b0'); R(195,97,4,1,'#e0d8c8');   // 밀가루·우유병
  T.restore(); }
  warmGlow(o,120,86,[[50,.06],[30,.08],[14,.1]]);
}
// 과수원(웨스트콧가): 사과나무 줄, 돌담과 작은 나무문, 담 너머 멀리 공작 저택(이층 가장 왼쪽 창)
function orchard3(o,P){
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  bands(o,0,0,240,90,[P.sky[0],P.sky[1],P.sky[1],P.sky[2]]);
  const cl=mix(P.sky[2],'#ffffff',.6); [[40,14],[180,20]].forEach(c=>{ o.ell(c[0],c[1],12,3,cl); o.ell(c[0]+9,c[1]-2,7,3,cl); });
  for(let X=0;X<240;X++){ const h=Math.round(70+Math.sin(X/27)*4); R(X,h,1,30,P.far[0]); px(X,h,mix(P.far[0],'#ffffff',.2)); }
  // 담 너머 공작 저택 (멀리, 오른쪽): 본관 + 좌우 날개, 망사르 지붕, 이층 가장 왼쪽 창
  const ST=['#8a7e72','#b0a490','#cfc4ae','#e6dcc8'], RF=['#2e2e48','#3e3e5e','#52527a'];
  const mx=134;
  [[mx,56,30],[mx+70,56,30]].forEach(w=>{ R(w[0],w[1],w[2],24,ST[0]); R(w[0]+1,w[1]+1,w[2]-2,22,ST[2]); o.poly([[w[0]-1,w[1]+1],[w[0]+w[2]+1,w[1]+1],[w[0]+w[2]-3,w[1]-6],[w[0]+3,w[1]-6]],RF[1]); R(w[0]+3,w[1]-7,w[2]-6,1,RF[2]); });
  R(mx+30,44,40,36,ST[0]); R(mx+31,45,38,34,ST[3]); o.poly([[mx+28,45],[mx+72,45],[mx+66,35],[mx+34,35]],RF[1]); R(mx+34,34,32,1,RF[2]);
  o.poly([[mx+40,58],[mx+60,58],[mx+50,52]],ST[1]); [mx+42,mx+47,mx+53,mx+58].forEach(x=>R(x,58,2,21,ST[3]));
  R(mx+47,66,6,13,'#5a3e34'); R(mx+48,30,4,5,RF[0]); R(mx+5,46,3,5,'#6a4a40'); R(mx+92,46,3,5,'#6a4a40');
  for(let k=0;k<4;k++){ const x=mx+3+k*7; R(x,60,3,6,k===0?'#f2c25a':'#4e6488'); R(x,70,3,6,'#4e6488'); R(x+70,60,3,6,'#4e6488'); R(x+70,70,3,6,'#4e6488'); }
  for(let k=0;k<4;k++){ R(mx+33+k*9,48,3,6,'#4e6488'); }
  // 돌담 + 작은 나무문
  const SW=['#5e5a56','#7e7a74','#9e9a92','#bab6ac'];
  R(0,78,240,22,SW[1]); R(0,78,240,2,SW[3]); R(0,76,240,2,SW[2]);
  for(let j=0;j<4;j++){ const Y=80+j*5; R(0,Y+4,240,1,SW[0]); for(let X=(j%2)*9;X<240;X+=18){ R(X,Y,1,5,SW[0]); R(X+1,Y,7,1,SW[2]); } }
  R(108,72,22,28,'#3a2620'); R(110,74,18,26,'#7a5444'); for(let k=0;k<9;k++){ const d=Math.round(Math.sqrt(1-(k/9)**2)*4); R(119-k,73-d,1,d,'#3a2620'); R(119+k,73-d,1,d,'#3a2620'); }
  for(let X=111;X<128;X+=4) R(X,74,1,26,'#5a3e34'); R(110,80,18,1,'#5a3e34'); R(110,92,18,1,'#5a3e34'); px(125,87,GD2[3]);
  [[20,76],[66,76],[180,76],[226,76]].forEach(v=>{ o.ell(v[0],v[1],6,3,P.leaf[2]); o.ell(v[0]-1,v[1]-1,4,2,P.leaf[1]); });  // 담쟁이
  // 땅
  R(0,100,240,60,P.gr[0]); R(0,100,240,1,mix(P.gr[0],'#ffffff',.2)); R(0,128,240,32,P.gr[1]); R(0,128,240,1,P.gr[2]);
  for(let k=0;k<50;k++){ const X=(k*53)%240, Y=104+(k*29)%54; R(X,Y,3,1,Y>128?P.gr[2]:P.gr[1]); }
  // 사과나무 (단단한 음영 + 사과)
  const apple=(x,y,s,fruit)=>{ const tw=Math.round(5*s), th=Math.round(30*s); R(x-2,y,tw,th,'#2e2018'); R(x-1,y,tw-2,th,P.trunk); R(x-1,y,1,th,mix(P.trunk,'#ffffff',.2));
    o.line(x,y+4,x-8*s,y-4*s,P.trunk); o.line(x+1,y+6,x+9*s,y-2*s,P.trunk);
    const Rr=Math.round(20*s); const bl=[[0,-Rr*.3,Rr],[-Rr*.85,Rr*.1,Rr*.75],[Rr*.85,Rr*.1,Rr*.75],[0,-Rr*.9,Rr*.72],[-Rr*.45,-Rr*.7,Rr*.58],[Rr*.5,-Rr*.65,Rr*.58]];
    bl.forEach(b=>o.ell(Math.round(x+b[0]),Math.round(y+b[1]),Math.round(b[2])+1,Math.round(b[2]*.8)+1,mix(P.leaf[2],'#000000',.35)));
    bl.forEach(b=>o.ell(Math.round(x+b[0]),Math.round(y+b[1]),Math.round(b[2]),Math.round(b[2]*.8),P.leaf[2]));
    bl.forEach(b=>o.ell(Math.round(x+b[0]-2),Math.round(y+b[1]-2),Math.round(b[2]*.76),Math.round(b[2]*.6),P.leaf[1]));
    bl.forEach(b=>o.ell(Math.round(x+b[0]-4),Math.round(y+b[1]-4),Math.round(b[2]*.4),Math.round(b[2]*.32),P.leaf[0]));
    if(fruit){ const r=rng(x*13+y); for(let i=0;i<10;i++){ const ax=x+Math.round((r()-.5)*Rr*1.7), ay=y+Math.round(-Rr*.9+r()*Rr*1.2); R(ax,ay,2,2,'#c93a3a'); px(ax,ay,'#f06a5a'); px(ax+1,ay+1,'#8a2630'); } }
    R(x-Rr,y+th-1,Rr*2,2,mix(P.gr[1],'#000000',.25)); };
  const fruit=!!P.part&&P.part!=='#ffffff'&&P.part!=='#ffd6e4';   // 늦가을·여름엔 사과
  apple(28,86,1.15,fruit); apple(212,88,1.1,fruit); apple(70,100,.8,fruit); apple(172,102,.8,fruit);
  // 떨어진 사과·낙엽
  if(fruit) [[40,124],[58,130],[190,128],[206,134]].forEach(a=>{ R(a[0],a[1],2,2,'#c93a3a'); px(a[0],a[1],'#f06a5a'); });
  if(P.part){ for(let k=0;k<24;k++){ const X=(k*97)%236, Y=(k*61)%120+8; px(X,Y,P.part); px(X+1,Y,P.part==='#ffffff'?'#e8eef6':mix(P.part,'#7a3a14',.35)); } }
}
// 이층 복도(밤): 촛대는 하나 건너 하나만 켜짐, 문들, 긴 양탄자, 창(밤하늘), 복도 끝 서재 문 아래로 새는 노란 선
function corridor3(o,P){
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  const WL=['#2a2030','#3a2e42','#4a3c54','#5e4e68'];
  const RG=['#2a0e18','#4a1824','#6a2434','#8a3444'];
  R(0,0,240,100,WL[1]);
  for(let X=0;X<240;X+=12){ R(X,10,2,48,WL[2]); R(X+2,10,1,48,WL[0]); }
  R(0,0,240,4,WD2[0]); R(0,4,240,3,WD2[2]); R(0,4,240,1,WD2[3]); R(0,7,240,1,WD2[0]);
  R(0,58,240,1,WD2[0]); R(0,59,240,2,WD2[3]); R(0,61,240,38,WD2[1]);
  for(let X=3;X<240;X+=30){ R(X,64,25,30,WD2[0]); R(X+1,65,23,28,WD2[1]); R(X+1,65,23,1,WD2[0]); R(X+2,92,22,1,WD2[2]); }
  R(0,98,240,2,WD2[2]); R(0,100,240,1,WD2[0]);
  plankFloor(o,101,WD2);
  // 밤 창 (왼쪽)
  const SK=['#121731','#1b2550','#283a6e'];
  R(14,16,34,52,WD2[0]); R(15,17,32,50,WD2[2]); bands(o,18,20,26,44,SK); [[22,24],[38,30],[26,44],[40,50]].forEach(p=>px(p[0],p[1],'#e8e4cf'));
  o.ell(36,28,3,3,'#efe6c0'); R(30,20,2,44,WD2[1]); R(18,41,26,2,WD2[1]); R(12,66,38,3,WD2[3]);
  curtainPair(o,6,10,8,66,['#1c2240','#2c365e','#3f4c80','#5a68a2'],true); curtainPair(o,48,10,8,66,['#1c2240','#2c365e','#3f4c80','#5a68a2'],true);
  // 문들
  const door=(x,lit)=>{ R(x,30,30,71,WD2[0]); R(x+2,32,26,69,WD2[2]); R(x+2,32,26,1,WD2[4]); R(x+14,32,2,69,WD2[0]);
    [[x+4,36],[x+17,36],[x+4,68],[x+17,68]].forEach(p=>{ R(p[0],p[1],9,26,WD2[1]); R(p[0]+1,p[1]+1,7,1,WD2[3]); });
    px(x+12,66,GD2[3]); px(x+18,66,GD2[3]);
    if(lit){ R(x+2,100,26,1,'#ffd36a'); const X=o.x; X.save(); X.globalCompositeOperation='lighter'; X.globalAlpha=.12; o.poly([[x+2,101],[x+28,101],[x+38,112],[x-8,112]],'#ffb35a'); X.globalAlpha=.08; o.poly([[x-8,112],[x+38,112],[x+50,130],[x-20,130]],'#ffb35a'); X.restore(); } };
  door(76,false); door(200,true);
  // 작은 탁자 + 꽃병
  R(122,82,24,3,WD2[3]); R(122,82,24,1,WD2[4]); R(124,85,2,15,WD2[1]); R(142,85,2,15,WD2[1]); R(131,74,6,8,'#3a4a7a'); R(132,73,4,1,'#5a6a9a'); o.ell(134,71,3,2,'#6a5a7a');
  // 촛대: 하나 건너 하나만 켜짐
  [[64,true],[112,false],[160,true],[186,false]].forEach(c=>{ const x=c[0]; R(x-3,46,7,2,GD2[1]); R(x-1,48,3,3,GD2[2]); R(x,40,1,6,'#e8e0d0');
    if(c[1]){ px(x,39,'#ffd75a'); px(x,38,'#fff0a8'); const X=o.x; X.save(); X.globalCompositeOperation='lighter'; [[16,.05],[9,.08]].forEach(r=>{ X.globalAlpha=r[1]; o.ell(x,40,r[0],Math.round(r[0]*.8),'#ffb35a'); }); X.restore(); } else px(x,39,'#4a4048'); });
  // 긴 양탄자
  R(0,118,240,24,RG[1]); R(0,120,240,20,RG[2]); R(0,118,240,1,RG[3]); R(0,141,240,1,RG[0]);
  for(let X=4;X<240;X+=16){ px(X,129,GD2[1]); R(X-1,130,3,1,GD2[1]); px(X,131,GD2[1]); } for(let X=0;X<240;X+=3){ px(X,121,GD2[0]); px(X,139,GD2[0]); }
  // 밤 어둠
  const X=o.x; X.save(); X.globalAlpha=.28; X.fillStyle='#0c0a1e'; X.fillRect(0,0,240,160); X.restore();
  X.save(); X.globalCompositeOperation='lighter'; X.globalAlpha=.25; R(202,100,26,1,'#ffd36a'); X.restore();
}
// 집사실: 장부로 가득한 벽, 자로 잰 듯한 책상(펜·인장·잉크병), 열쇠판, 벽시계, 창가 작은 화분 하나
function office3(o,P){
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  const WL=['#3a3a40','#4e4e56','#62626c','#787884'];
  R(0,0,240,96,WL[1]);
  for(let X=0;X<240;X+=16){ R(X,8,1,52,WL[0]); R(X+1,8,1,52,WL[2]); }
  R(0,0,240,4,WD2[0]); R(0,4,240,2,WD2[3]); R(0,6,240,1,WD2[0]);
  R(0,60,240,1,WD2[0]); R(0,61,240,2,WD2[3]); R(0,63,240,30,WD2[1]);
  for(let X=3;X<240;X+=30){ R(X,66,25,24,WD2[0]); R(X+1,67,23,22,WD2[1]); R(X+2,88,22,1,WD2[2]); }
  R(0,93,240,2,WD2[2]); R(0,95,240,1,WD2[0]);
  plankFloor(o,96,WD2);
  // 장부 벽 (왼쪽 큰 선반, 같은 크기 장부가 줄지어)
  R(4,8,96,96,WD2[0]); R(5,9,94,94,WD2[2]); R(5,9,2,94,WD2[4]);
  const LG=[['#2e3a4e','#3e4e66','#566a88'],['#4a2a2a','#663a3a','#845050'],['#3a3a2a','#545440','#6e6e56']];
  for(let sh=0;sh<6;sh++){ const top=12+sh*15; R(8,top,88,13,'#1a0f0b');
    for(let k=0;k<22;k++){ const c=LG[(sh+Math.floor(k/7))%3], X=9+k*4; R(X,top+1,4,12,c[1]); R(X,top+1,1,12,c[2]); R(X+3,top+1,1,12,c[0]); R(X+1,top+4,2,1,GD2[1]); R(X+1,top+9,2,1,'#e8e0c8'); }
    R(7,top+13,90,2,WD2[3]); R(7,top+13,90,1,WD2[4]); }
  // 벽시계
  R(124,12,20,26,WD2[0]); R(125,13,18,24,WD2[3]); o.ell(134,22,7,7,WD2[0]); o.ell(134,22,6,6,'#f6f0de'); o.line(134,22,134,18,'#2a2228'); o.line(134,22,137,23,'#2a2228'); R(133,30,2,6,GD2[2]); o.ell(134,36,2,2,GD2[2]);
  // 열쇠판
  R(152,16,30,22,WD2[0]); R(153,17,28,20,WD2[3]); for(let r=0;r<2;r++) for(let k=0;k<5;k++){ const x=156+k*5, y=20+r*9; px(x,y,GD2[1]); o.line(x,y+1,x,y+4,GD2[2]); px(x+1,y+4,GD2[2]); px(x+1,y+3,GD2[2]); }
  // 창 + 창가 작은 화분 하나
  frameWin(o,196,14,32,46,P,{});
  R(206,58,10,6,'#7a3f2a'); R(205,57,12,2,'#9a5236'); o.ell(211,53,5,4,'#2f5a36'); o.ell(210,52,3,2,'#4c8a4e');
  // 책상 (가운데 오른쪽): 펜·인장·잉크병이 자로 잰 듯
  const DT=['#2a1710','#4d2d1f','#6e4128','#91583a','#b4774f'];
  R(116,98,104,1,DT[0]); R(114,99,108,6,DT[3]); R(114,99,108,1,DT[4]); R(114,105,108,16,DT[2]); R(114,105,108,1,DT[0]); R(114,120,108,1,DT[0]);
  [[124,40],[176,40]].forEach(d=>{ R(d[0],108,d[1]-12,10,DT[1]); R(d[0]+1,109,d[1]-14,8,DT[2]); R(d[0]+Math.floor((d[1]-12)/2)-1,112,3,2,GD2[2]); });   // 서랍(회중시계가 든)
  [[116,121],[216,121]].forEach(l=>{ R(l[0],l[1],5,28,DT[1]); R(l[0],l[1],1,28,DT[3]); });
  R(130,93,30,7,'#e9e2cf'); R(132,92,28,7,'#f6f0de'); for(let k=0;k<3;k++) R(134,94+k*2,22,1,'#a8a090');   // 서류
  R(170,95,1,5,'#2a2228'); R(176,95,1,5,'#2a2228'); R(182,95,1,5,'#2a2228');           // 펜 셋, 나란히
  R(190,94,5,6,'#1b1824'); R(191,93,3,1,'#3a3448');                                    // 잉크병
  R(200,96,4,4,GD2[1]); R(201,93,2,3,'#5a3e28'); o.ell(202,92,2,1,'#5a3e28');            // 인장
  R(208,96,8,4,'#7e2e3a'); R(208,96,8,1,'#a54852');                                    // 봉랍
  // 의자
  R(160,122,18,24,DT[1]); R(161,123,16,22,'#3a3a52'); R(161,123,16,1,'#5a5a72'); R(160,146,3,8,DT[1]); R(175,146,3,8,DT[1]);
  // 등잔
  R(222,84,6,9,GD2[2]); R(220,80,10,4,'#e8c070'); R(220,80,10,1,'#f8e2a0'); warmGlow(o,225,84,[[24,.04],[12,.06]]);
}
// 마차 안: 공작가 마차, 남색 벨벳 누빔 좌석, 금테, 창밖 지나가는 풍경, 커튼
function carriage3(o,P){
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  const VB=['#141a34','#1e2a50','#2c3c6e','#3e5290','#5a70b0'];   // 남색 벨벳
  const WB=['#2a1810','#4a2c1c','#6a4028','#8a5838','#aa7450'];
  R(0,0,240,160,WB[2]);
  // 천장
  R(0,0,240,14,WB[1]); R(0,12,240,2,GD2[2]); R(0,14,240,1,GD2[0]); for(let X=6;X<240;X+=20) o.ell(X,6,6,4,WB[2]);
  // 창 (가운데 큰 창): 지나가는 풍경
  const wx=52, wy=24, ww=136, wh=64;
  R(wx-6,wy-6,ww+12,wh+12,WB[0]); R(wx-4,wy-4,ww+8,wh+8,GD2[1]); R(wx-3,wy-3,ww+6,wh+6,WB[3]);
  bands(o,wx,wy,ww,wh,[P.sky[0],P.sky[1],P.sky[2]]);
  for(let X=0;X<ww;X++){ const h=Math.round(wh*.55+Math.sin((X)/13)*3); R(wx+X,wy+h,1,wh-h,P.far[0]); px(wx+X,wy+h,mix(P.far[0],'#ffffff',.2)); }
  R(wx,wy+wh-12,ww,12,P.gr[1]); R(wx,wy+wh-12,ww,1,P.gr[0]);
  [[wx+20,wy+40],[wx+70,wy+38],[wx+112,wy+42]].forEach(t=>{ R(t[0]-1,t[1],3,12,P.trunk); o.ell(t[0],t[1]-4,10,9,P.leaf[2]); o.ell(t[0]-2,t[1]-6,7,6,P.leaf[1]); o.ell(t[0]-4,t[1]-8,3,3,P.leaf[0]); });
  for(let k=0;k<6;k++) o.line(wx+8+k*22,wy+wh-8,wx+18+k*22,wy+wh-8,mix(P.gr[1],'#ffffff',.25));   // 흐르는 길
  R(wx+ww/2-1,wy,2,wh,WB[1]); for(let k=0;k<3;k++) o.line(wx+6+k*4,wy+4,wx+2+k*4,wy+18,mix(P.sky[2],'#ffffff',.6));
  // 커튼 (묶음)
  const CU=['#4a1828','#6e2236','#923048','#b04a5e'];
  curtainPair(o,wx-4,wy-6,16,wh+10,CU,true); curtainPair(o,wx+ww-12,wy-6,16,wh+10,CU,true);
  R(wx-8,wy-10,ww+16,4,GD2[2]); R(wx-8,wy-10,ww+16,1,GD2[3]);
  // 벽면 누빔 (창 아래)
  R(0,96,240,64,VB[1]);
  R(0,97,240,27,VB[2]);
  for(let X=-24;X<264;X+=12){ o.line(X,97,X+26,123,VB[1]); o.line(X+26,97,X,123,VB[1]); o.line(X+1,97,X+27,123,VB[3]); }
  for(let j=0;j<3;j++) for(let X=(j%2)*6;X<240;X+=12){ const y=97+6+j*7; R(X,y,2,2,GD2[1]); px(X,y,GD2[3]); }
  R(0,94,240,2,GD2[2]); R(0,96,240,1,GD2[0]);
  // 맞은편 좌석 (앞쪽 아래)
  R(0,124,240,36,VB[2]); R(0,124,240,2,VB[4]); R(0,126,240,1,VB[3]);
  for(let X=8;X<240;X+=20){ R(X,128,1,28,VB[1]); R(X+1,128,1,28,VB[3]); R(X,140,2,2,GD2[2]); }
  R(0,138,240,1,VB[1]);
  R(0,156,240,4,WB[1]); R(0,156,240,1,GD2[1]);
  // 양옆 문 손잡이·등
  R(14,60,4,14,GD2[1]); R(14,60,1,14,GD2[3]); R(222,60,4,14,GD2[1]); R(222,60,1,14,GD2[3]);
  R(20,30,8,12,GD2[1]); R(21,31,6,10,'#f6e0a0'); R(212,30,8,12,GD2[1]); R(213,31,6,10,'#f6e0a0');
}
// 새 서재 (스타듀풍: 색 수 제한, 단단한 음영, 윤곽선, 점무늬 없음)
function study2(o,P){
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  const WD=['#26160f','#45291d','#653d2a','#86563a','#a9744d'];   // 나무: 윤곽,어둠,중간,밝음,하이라이트
  const WP=['#1c2826','#2a3b37','#354b45','#435e55'];             // 벽지(짙은 녹색)
  const GD=['#5e4220','#93703a','#c9a057','#ecd08a'];             // 금장
  const RG=['#33121c','#5c1f2d','#7f2c3c','#a1404b'];             // 양탄자
  const SK=['#121731','#1b2550','#283a6e','#3b5590'];             // 밤하늘
  // ── 벽
  R(0,0,240,92,WP[1]);
  for(let X=0;X<240;X+=10){ R(X,8,3,54,WP[2]); R(X+3,8,1,54,WP[0]); }
  for(let X=5;X<240;X+=10) for(let Y=16;Y<62;Y+=14){ px(X+1,Y,WP[3]); px(X,Y+1,WP[3]); px(X+2,Y+1,WP[3]); px(X+1,Y+2,WP[3]); }
  R(0,0,240,5,WD[1]); R(0,5,240,2,WD[3]); R(0,7,240,1,WD[0]); R(0,4,240,1,WD[2]);
  R(0,61,240,1,WD[0]); R(0,62,240,2,WD[4]); R(0,64,240,1,WD[2]); R(0,65,240,1,WD[0]);
  R(0,66,240,22,WD[2]);
  for(let X=2;X<240;X+=30){ R(X,69,26,16,WD[1]); R(X+1,70,24,14,WD[2]); R(X+1,70,24,1,WD[0]); R(X+1,70,1,14,WD[0]); R(X+2,83,23,1,WD[3]); R(X+25,71,1,13,WD[3]); }
  R(0,86,240,1,WD[3]); R(0,87,240,5,WD[1]); R(0,87,240,1,WD[4]); R(0,92,240,1,WD[0]);
  // ── 바닥 (판자)
  for(let row=0,Y=93;Y<160;row++,Y+=7){
    R(0,Y,240,7,row%2?WD[2]:mix(WD[2],WD[3],.35)); R(0,Y,240,1,WD[0]); R(0,Y+1,240,1,row%2?WD[3]:WD[4]);
    for(let X=(row*23)%46;X<240;X+=46){ R(X,Y,1,7,WD[0]); R(X+1,Y+1,1,6,WD[3]); }
    for(let X=(row*37)%29+6;X<240;X+=29){ R(X,Y+3+(row%3),5,1,WD[1]); }
  }
  // ── 양탄자
  o.poly([[44,108],[176,108],[198,152],[22,152]],RG[0]);
  o.poly([[46,109],[174,109],[195,151],[25,151]],GD[1]);
  o.poly([[49,111],[171,111],[190,149],[30,149]],RG[2]);
  o.poly([[56,115],[164,115],[179,145],[41,145]],RG[1]);
  o.poly([[58,116],[162,116],[176,144],[44,144]],RG[2]);
  for(let k=0;k<5;k++){ const cx=78+k*16, cy=130; px(cx,cy-3,GD[2]); R(cx-1,cy-2,3,1,GD[2]); R(cx-2,cy-1,5,1,GD[1]); R(cx-3,cy,7,1,GD[2]); R(cx-2,cy+1,5,1,GD[1]); R(cx-1,cy+2,3,1,GD[2]); px(cx,cy+3,GD[2]); px(cx,cy,RG[3]); }
  R(22,152,176,1,RG[0]); for(let X=24;X<198;X+=3) px(X,153,GD[1]);
  // ── 책장
  R(6,9,80,90,WD[0]); R(7,10,78,88,WD[2]); R(7,10,2,88,WD[4]); R(9,10,1,88,WD[3]); R(82,10,3,88,WD[1]);
  R(4,6,84,5,WD[0]); R(5,7,82,3,WD[3]); R(5,7,82,1,WD[4]);
  const BK=[['#5a1e2a','#7e2e3a','#a54852'],['#1e3354','#2c4a78','#4567a0'],['#24402a','#36603c','#4f8456'],['#5e4a1e','#8a6c2c','#b8924a'],['#3e2448','#5a3466','#7e4e8a'],['#6a3a22','#94562e','#bd7c48']];
  let seed=7; const rr=()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; };
  for(let s=0;s<5;s++){
    const top=14+s*17, bot=top+15;
    R(10,top,72,15,'#1a0f0b');
    let X=11;
    while(X<79){
      if(rr()<.08){ X+=4; continue; }
      const w=3+Math.floor(rr()*3), h=10+Math.floor(rr()*5), c=BK[Math.floor(rr()*BK.length)];
      if(X+w>81) break;
      R(X,bot-h,w,h,c[1]); R(X,bot-h,1,h,c[2]); R(X+w-1,bot-h,1,h,c[0]); R(X,bot-h,w,1,c[2]);
      R(X+1,bot-h+2,w-2,1,GD[2]); R(X+1,bot-4,w-2,1,GD[1]);
      X+=w;
    }
    R(9,bot,74,2,WD[3]); R(9,bot,74,1,WD[4]); R(9,bot+2,74,1,WD[0]);
  }
  // 책장 위 지구본
  R(38,0,1,1,WD[0]);
  // ── 창문 + 커튼
  const wx=122, wy=16, ww=44, wh=52;
  R(wx-4,wy-4,ww+8,wh+10,WD[0]); R(wx-3,wy-3,ww+6,wh+8,WD[3]); R(wx-3,wy-3,ww+6,1,WD[4]);
  for(let j=0;j<wh;j++){ const t=j/wh; R(wx,wy+j,ww,1,t<.35?SK[0]:t<.7?SK[1]:SK[2]); }
  [[6,6],[30,4],[14,20],[38,16],[24,30],[8,38]].forEach(p=>px(wx+p[0],wy+p[1],'#e8e4cf'));
  R(wx+31,wy+7,6,6,'#efe6c0'); R(wx+32,wy+6,4,8,'#efe6c0'); R(wx+30,wy+8,8,4,'#efe6c0'); R(wx+33,wy+8,2,2,'#d9cc9a');
  for(let X=wx;X<wx+ww;X+=4){ const h=4+((X*7)%5); R(X,wy+wh-h,4,h,'#0d1126'); }
  R(wx+21,wy,2,wh,WD[1]); R(wx,wy+25,ww,2,WD[1]); R(wx+21,wy,1,wh,WD[3]); R(wx,wy+25,ww,1,WD[3]);
  R(wx-6,wy+wh+2,ww+12,4,WD[3]); R(wx-6,wy+wh+2,ww+12,1,WD[4]); R(wx-6,wy+wh+6,ww+12,1,WD[0]);
  const CU=['#1c2240','#2c365e','#3f4c80','#5a68a2'];
  const curtain2=(x,w)=>{ R(x,wy-8,w,wh+16,CU[1]); for(let i=0;i<w;i++){ const ph=i%6; R(x+i,wy-8,1,wh+16,ph<2?CU[2]:ph<3?CU[3]:ph<5?CU[1]:CU[0]); } R(x,wy-8,w,1,CU[0]); R(x,wy+wh+7,w,1,CU[0]); R(x-1,wy+26,w+2,3,GD[2]); R(x-1,wy+28,w+2,1,GD[0]); };
  curtain2(106,14); curtain2(168,14);
  R(102,wy-11,84,4,GD[1]); R(102,wy-11,84,1,GD[3]); R(102,wy-8,84,1,GD[0]); R(100,wy-12,4,6,GD[2]); R(184,wy-12,4,6,GD[2]);
  // ── 화분 (창 아래)
  R(108,86,14,12,'#7a3f2a'); R(107,85,16,3,'#9a5236'); R(108,86,1,12,'#a8644a'); R(121,86,1,12,'#4e2618'); R(107,98,16,1,WD[0]);
  [[115,70],[110,74],[120,73],[113,78],[118,79]].forEach(p=>{ o.ell(p[0],p[1],4,3,'#2f5a36'); o.ell(p[0]-1,p[1]-1,2,1,'#4c8a4e'); });
  // ── 책상
  const DT=['#2a1710','#4d2d1f','#6e4128','#91583a','#b4774f'];
  R(146,96,90,1,DT[0]); R(144,97,94,10,DT[3]); R(144,97,94,1,DT[4]); R(144,106,94,1,DT[1]); R(143,96,1,12,DT[0]); R(238,96,1,12,DT[0]);
  R(144,107,94,16,DT[2]); R(144,107,94,1,DT[0]); R(144,122,94,1,DT[0]);
  [[150,26],[180,26],[210,24]].forEach(d=>{ R(d[0],110,d[1],10,DT[1]); R(d[0]+1,111,d[1]-2,8,DT[2]); R(d[0]+1,111,d[1]-2,1,DT[3]); R(d[0]+Math.floor(d[1]/2)-1,114,3,2,GD[2]); px(d[0]+Math.floor(d[1]/2),114,GD[3]); });
  R(146,123,6,26,DT[1]); R(146,123,1,26,DT[3]); R(151,123,1,26,DT[0]); R(230,123,6,26,DT[1]); R(230,123,1,26,DT[3]); R(235,123,1,26,DT[0]); R(146,149,6,1,DT[0]); R(230,149,6,1,DT[0]);
  // 책상 위: 서류, 잉크병+깃펜, 찻잔, 등잔
  R(156,98,22,7,'#e9e2cf'); R(158,97,20,7,'#f6f0de'); for(let k=0;k<3;k++) R(160,99+k*2,14,1,'#a8a090');
  R(184,98,6,5,'#1b1824'); R(185,97,4,1,'#3a3448'); px(185,99,'#4a4460'); o.line(188,97,196,86,'#efe7d4'); o.line(189,97,197,86,'#cfc6b0');
  R(198,100,9,4,'#f2ede2'); R(199,104,7,1,'#c8bfae'); R(207,101,2,2,'#f2ede2'); R(199,100,7,1,'#7a4a2a'); R(196,104,13,1,'#e0d8c8');
  R(220,99,10,4,GD[1]); R(222,88,6,11,GD[2]); R(222,88,1,11,GD[3]); R(219,84,12,5,'#e8c070'); R(219,84,12,1,'#f8e2a0'); R(218,88,14,1,GD[0]);
  // ── 밤 + 등잔 빛
  const x=o.x; x.save(); x.globalAlpha=.22; x.fillStyle='#0c0a1e'; x.fillRect(0,0,240,160); x.restore();
  x.save(); x.globalCompositeOperation='lighter';
  [[30,.035],[20,.05],[11,.08]].forEach(r=>{ x.globalAlpha=r[1]; o.ell(225,86,r[0],Math.round(r[0]*.8),'#ffb35a'); });
  x.restore();
  x.save(); x.globalAlpha=.12; x.globalCompositeOperation='lighter'; o.poly([[wx,wy+wh],[wx+ww,wy+wh],[wx+ww+18,110],[wx+6,110]],'#5a74c0'); x.restore();
}

const BG={
 exterior:(o,P)=>exterior3(o,P), hall:(o,P)=>hall3(o,P), bedroom:(o,P)=>bedroom5(o,P), dining:(o,P)=>dining3(o,P),
 study:(o,P)=>study2(o,P), orchard:(o,P)=>orchard3(o,P), kitchen:(o,P)=>kitchen3(o,P), schoolroom:(o,P)=>school3(o,P),
 corridor:(o,P)=>corridor3(o,P), office:(o,P)=>office3(o,P), carriage:(o,P)=>carriage3(o,P)
};
const PLACES={exterior:'저택 앞',hall:'현관 홀',bedroom:'내 방',dining:'식당',study:'서재 앞',orchard:'과수원 담장',kitchen:'부엌',schoolroom:'공부방',corridor:'이층 복도'};
const BGCACHE={};
// 밤 장면: 어둡게 덮은 뒤 촛불·벽난로·샹들리에 자리만 다시 밝힌다 [x, y, 반지름]
const NIGHT_LIGHTS={
 dining:[[80,10,34],[160,10,34],[104,106,16],[136,106,16],[110,96,12],[130,96,12]],
 bedroom:[[225,84,40],[182,82,18],[120,10,22]],
 hall:[[120,14,48]], schoolroom:[[118,86,34],[60,10,18]], kitchen:[[120,86,54]], office:[[225,84,30]]
};
function bgCanvas(place,season,time){
  const night=time==='night'&&place!=='corridor'&&place!=='study';
  const key=place+'|'+season+(night?'|night':''); if(BGCACHE[key]) return BGCACHE[key];
  const o=PX(BW,BH); const P=seasonPal(season); if(night) P.night=true;
  (BG[place]||BG.exterior)(o,P);
  if(night&&o.x){ const X=o.x; X.save(); X.globalCompositeOperation='multiply'; X.globalAlpha=.55; X.fillStyle='#3a3a6a'; X.fillRect(0,0,BW,BH); X.restore();
    (NIGHT_LIGHTS[place]||[]).forEach(l=>warmGlow(o,l[0],l[1],[[l[2],.07],[Math.round(l[2]*.6),.09],[Math.round(l[2]*.3),.12]])); }
  BGCACHE[key]=o.c; return o.c;
}
// 장면에만 올리는 소품 (scene.props)
const PROPS={
 box(o){   // 서재 책상 위 에버하트 호두나무 상자 (뚜껑에 금빛 글씨)
  const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), W=['#1e120c','#3a2416','#583822','#74502f','#8e6a44'];
  R(149,85,30,13,W[0]); R(150,86,28,11,W[2]); R(150,86,28,1,W[4]); R(150,86,1,11,W[3]); R(177,86,1,11,W[1]);
  R(149,84,30,4,W[0]); R(150,84,28,3,W[3]); R(150,84,28,1,W[4]);          // 뚜껑
  for(let k=0;k<7;k++){ R(155+k*3,85,2,1,'#d8b45a'); } o.p(163,92,'#d8b45a'); R(162,91,3,3,'#b08a3a'); o.p(163,92,'#1e120c');   // 글씨·자물쇠
 }
};
function stageSVG(place,season,chars,time,props){
  const key='st|'+place+'|'+season+'|'+(time||'')+'|'+(props||[]).join(',')+'|'+JSON.stringify(chars||[]);
  if(IMGCACHE[key]) return IMGCACHE[key];
  const o=PX(BW,BH); if(!o.x) return '';
  o.x.drawImage(bgCanvas(place,season,time),0,0);
  (props||[]).forEach(k=>{ if(PROPS[k]) PROPS[k](o); });
  if(place==='carriage'){ const rs=sprite('adeline','neutral'); o.x.save(); o.x.globalAlpha=.3; o.x.drawImage(rs.c,0,Math.max(0,rs.top-2),56,64,92,28,56,64); o.x.restore(); }
  const xs={left:18,center:92,right:166};
  (chars||[]).forEach(ch=>{ const s=sprite(ch.id,ch.expr||'neutral'); const X=xs[ch.pos||'center'], Y=156-s.feet; o.x.globalAlpha=.3; o.x.fillStyle='#1a1226'; for(let k=0;k<4;k++){ o.x.fillRect(X+8+k*2,152+k,40-k*4,1); } o.x.globalAlpha=1;
    // 밤이나 어두운 곳(복도·서재)에서는 인물도 어둡게
    let img=s.c; if(time==='night'||place==='corridor'||place==='study'){ const t=PX(56,132); if(t.x){ t.x.drawImage(s.c,0,0); t.x.globalCompositeOperation='source-atop'; t.x.globalAlpha=.32; t.x.fillStyle='#24244e'; t.x.fillRect(0,0,56,132); img=t.c; } }
    o.x.drawImage(img,X,Y); });
  IMGCACHE[key]=toImg(o.c,'px',PLACES[place]||'마차 안'); return IMGCACHE[key];
}
function bgSVG(place,season){ return toImg(bgCanvas(place,season),'px',PLACES[place]||''); }
function figSVG(id){
  const key='av|'+id; if(IMGCACHE[key]) return IMGCACHE[key];
  const s=sprite(id,'neutral'); const o=PX(56,64); if(!o.x) return '';
  o.r(0,0,56,64,'#d9d3e0'); o.r(0,40,56,24,'#cbc3d8');
  o.x.drawImage(s.c,0,Math.max(0,s.top-3),56,64,0,0,56,64);
  IMGCACHE[key]=toImg(o.c,'px',id); return IMGCACHE[key];
}
function titleSVG(season){
  // 처음 실행 화면: 공작가 마차 안에서 본 창 — 마차 안 배경과 같은 새 그림체(점무늬 없음)
  const key='ti|'+season; if(IMGCACHE[key]) return IMGCACHE[key];
  const o=PX(120,214); if(!o.x) return ''; const P=seasonPal(season); const R=(x,y,w,h,c)=>o.r(x,y,w,h,c), px=(x,y,c)=>o.p(x,y,c);
  const WB=['#2a1810','#4a2c1c','#6a4028','#8a5838','#aa7450'], VB=['#141a34','#1e2a50','#2c3c6e','#3e5290','#5a70b0'];
  // 나무 벽
  R(0,0,120,214,WB[2]); for(let X=0;X<120;X+=10){ R(X,0,1,214,WB[1]); R(X+1,0,1,214,WB[3]); }
  R(0,0,120,56,WB[1]); for(let X=0;X<120;X+=10){ R(X,0,1,56,WB[0]); } R(0,54,120,2,GD2[1]);   // 제목 자리(어둡게 비움)
  // 창 (세로로 긴)
  const wx=22, wy=70, ww=76, wh=82;
  R(wx-6,wy-6,ww+12,wh+12,WB[0]); R(wx-4,wy-4,ww+8,wh+8,GD2[1]); R(wx-3,wy-3,ww+6,wh+6,WB[3]); R(wx-3,wy-3,ww+6,1,WB[4]);
  bands(o,wx,wy,ww,wh,[P.sky[0],P.sky[0],P.sky[1],P.sky[2]]);
  const cl=mix(P.sky[2],'#ffffff',.6); o.ell(wx+18,wy+14,8,2,cl); o.ell(wx+24,wy+12,5,2,cl); o.ell(wx+56,wy+24,7,2,cl);
  for(let X=0;X<ww;X++){ const h=Math.round(wh*.58+Math.sin(X/11)*3); R(wx+X,wy+h,1,wh-h,P.far[0]); px(wx+X,wy+h,mix(P.far[0],'#ffffff',.2)); }
  for(let X=0;X<ww;X++){ const h=Math.round(wh*.68+Math.sin((X+20)/8)*2); R(wx+X,wy+h,1,wh-h,P.far[1]); }
  R(wx,wy+wh-16,ww,16,P.gr[1]); R(wx,wy+wh-16,ww,1,P.gr[0]);
  [[wx+14,wy+66,.8],[wx+60,wy+70,.7]].forEach(t=>{ const x=t[0], y=t[1], r=Math.round(12*t[2]); R(x-1,y,3,Math.round(14*t[2]),P.trunk);
    o.ell(x,y-4,r+1,r,mix(P.leaf[2],'#000000',.3)); o.ell(x,y-4,r,r-1,P.leaf[2]); o.ell(x-2,y-6,Math.round(r*.7),Math.round(r*.55),P.leaf[1]); o.ell(x-4,y-8,Math.round(r*.35),Math.round(r*.3),P.leaf[0]); });
  if(P.part){ for(let k=0;k<10;k++){ const X=wx+3+(k*29)%(ww-6), Y=wy+4+(k*17)%(wh-24); px(X,Y,P.part); px(X+1,Y,P.part==='#ffffff'?'#e8eef6':mix(P.part,'#7a3a14',.35)); } }
  // 창에 비친 아델라인 (흐리게)
  const s=sprite('adeline','neutral'); o.x.save(); o.x.globalAlpha=.22; o.x.drawImage(s.c,0,Math.max(0,s.top-2),56,64,wx+10,wy+18,56,64); o.x.restore();
  R(wx+Math.floor(ww/2)-1,wy,2,wh,WB[1]); R(wx+Math.floor(ww/2)-1,wy,1,wh,WB[3]);
  for(let k=0;k<3;k++) o.line(wx+5+k*4,wy+5,wx+2+k*4,wy+22,mix(P.sky[2],'#ffffff',.6));
  // 커튼 + 금 봉
  const CU=['#4a1828','#6e2236','#923048','#b04a5e'];
  curtainPair(o,4,60,16,100,CU,true); curtainPair(o,100,60,16,100,CU,true);
  R(0,57,120,4,GD2[2]); R(0,57,120,1,GD2[3]); R(0,60,120,1,GD2[0]); o.ell(2,58,2,2,GD2[3]); o.ell(117,58,2,2,GD2[3]);
  // 아래 남색 벨벳 누빔 + 금단추
  R(0,160,120,54,VB[2]); R(0,158,120,2,GD2[2]); R(0,160,120,1,GD2[0]);
  for(let X=-24;X<144;X+=12){ o.line(X,161,X+52,213,VB[1]); o.line(X+52,161,X,213,VB[1]); o.line(X+1,161,X+53,213,VB[3]); }
  for(let j=0;j<7;j++) for(let X=(j%2)*6;X<120;X+=12){ const y=167+j*7; R(X,y,2,2,GD2[1]); px(X,y,GD2[3]); }
  // 벽 등
  IMGCACHE[key]=toImg(o.c,'bgsvg px','').replace('class="bgsvg px"','class="bgsvg px" aria-hidden="true"'); return IMGCACHE[key];
}
