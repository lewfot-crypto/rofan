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
const BG={
 exterior(o,P,rnd){
  skyBG(o,P,118); clouds(o,P,rnd,5,34); hills(o,P,98,5,P.far[0],11); hills(o,P,108,3,P.far[1],5);
  o.r(0,116,240,44,P.gr[0]); o.dith(0,116,240,44,P.gr[0],P.gr[1],.35); o.dith(0,136,240,24,P.gr[1],P.gr[2],.4);
  o.poly([[92,160],[148,160],[130,120],[110,120]],'#d4c7a2'); for(let k=0;k<60;k++){ o.p(96+Math.floor(rnd()*50),122+Math.floor(rnd()*38),'#b9a87e'); }
  const wall='#e4d6b8', wl=mix(wall,'#fff6e0',.45), wd=mix(wall,'#6a5a7a',.4);
  o.r(58,56,124,66,wall); o.r(58,56,5,66,wl); o.r(172,56,10,66,wd); o.dith(58,56,124,66,wall,wd,.07);
  for(let j=0;j<66;j+=5){ o.r(58,56+j,124,1,mix(wall,'#8a7a8a',.2)); for(let X=((j/5)%2)*8;X<124;X+=16) o.r(58+X,56+j,1,5,mix(wall,'#8a7a8a',.18)); }
  o.r(58,118,124,4,mix(wall,'#6a5a6a',.4));
  o.poly([[48,60],[120,16],[192,60]],'#4e4c6c'); o.poly([[54,60],[120,22],[186,60]],'#6a6a92'); for(let k=0;k<44;k+=4){ o.line(56+k,59-k*.55,120,59-k*.55-10,'#565480'); } o.line(48,60,120,16,'#8a88b0'); o.r(48,60,144,3,'#3e3c58');
  o.r(66,20,8,22,'#8a6a5a'); o.r(66,20,8,3,'#b08a70'); o.r(66,20,2,22,'#a8806a'); o.r(162,26,8,20,'#8a6a5a'); o.r(162,26,8,3,'#b08a70');
  for(let X=0;X<240;X+=3) if(rnd()<.18) o.p(X,10+Math.floor(rnd()*4),'#fff');
  const win=(x,y,lit)=>{ o.r(x-2,y-2,17,22,'#5a4258'); o.r(x-2,y-2,17,1,'#8a7090'); o.r(x,y,13,18,lit?'#ffd36a':'#7c8fb0'); if(lit){ o.r(x,y,13,5,'#fff0a8'); o.dith(x,y+5,13,8,'#ffd36a','#fff0a8',.4); o.r(x,y,3,18,'#c8456a'); o.r(x+10,y,3,18,'#c8456a'); o.r(x,y,13,2,'#e8758a'); } else { o.r(x,y,6,7,'#a6b8d4'); o.r(x+7,y+8,6,7,'#6a7e9c'); } o.r(x+6,y,1,18,'#5a4258'); o.r(x,y+9,13,1,'#5a4258'); o.r(x-3,y+19,19,3,'#a89a86'); };
  [74,114,154].forEach((x,i)=>{ win(x,68,i===0); win(x,94,false); });
  o.r(106,86,28,32,'#5a3e34'); o.r(108,88,24,30,'#7a5444'); o.r(119,88,2,30,'#3f2c26'); o.r(110,92,8,10,'#6a4638'); o.r(122,92,8,10,'#6a4638'); o.p(116,104,'#f2c25a'); o.p(124,104,'#f2c25a'); o.poly([[102,86],[138,86],[120,72]],'#7a5444'); o.poly([[106,86],[134,86],[120,76]],'#6a4638');
  o.r(100,118,40,3,'#b6a894'); o.r(96,121,48,3,'#968878'); o.r(92,124,56,3,'#7f7264');
  for(let X=0;X<240;X+=8){ o.r(X,132,2,12,'#3a2e46'); o.p(X,131,'#6a5a7a'); } o.r(0,135,240,2,'#3a2e46'); o.r(0,141,240,1,'#3a2e46');
  tree(o,P,26,96,1.2,false,rnd); tree(o,P,214,100,1.1,false,rnd);
  [[90,118],[150,118]].forEach(p=>{ o.r(p[0],p[1]-14,3,14,'#3a2e46'); o.ell(p[0]+1,p[1]-17,4,4,'#ffd36a'); o.ell(p[0]+1,p[1]-17,2,2,'#fff4b8'); glow(o,p[0]+1,p[1]-17,11,'#ffd36a',.35); });
 },
 hall(o,P,rnd){
  wallPanel(o,0,108,'#7a5a68'); o.r(0,66,240,44,mix('#7a5a68','#3a2434',.28)); o.r(0,64,240,3,'#d8b070'); o.r(0,106,240,3,'#d8b070');
  for(let X=8;X<240;X+=26){ o.r(X,72,18,30,mix('#7a5a68','#2a1a2a',.2)); o.r(X,72,18,1,mix('#7a5a68','#fff',.25)); o.r(X+1,73,16,1,'#d8b07033'); }
  const tiles=(j)=>{ for(let X=-((j/10)%2)*10;X<240;X+=20){ o.r(X,108+j,10,10,'#d8c8b0'); o.r(X+10,108+j,10,10,'#8e7a94'); } };
  for(let j=0;j<52;j+=10) tiles(j); o.grad(0,108,240,52,['#cdbba8','#a8929a','#6e5870']); for(let j=0;j<52;j+=10){ o.r(0,108+j,240,1,'#5a4660'); }
  archWin(o,168,18,36,68,P,false); curtain(o,152,14,14,76,'#a8384e'); curtain(o,206,14,14,76,'#a8384e');
  for(let i=0;i<18;i++){ o.line(172+i*2,88,140+i*4,112,mix('#fff0c0','#7a5a68',.6)); }
  o.r(100,44,40,64,'#4a3040'); o.r(103,47,34,61,'#6a4458'); o.r(119,47,2,61,'#3a2434'); o.r(106,56,12,18,'#5a3a4c'); o.r(122,56,12,18,'#5a3a4c'); o.r(106,80,12,22,'#5a3a4c'); o.r(122,80,12,22,'#5a3a4c'); o.p(114,82,'#f2c25a'); o.p(126,82,'#f2c25a'); o.ell(120,44,20,8,'#4a3040'); o.ell(120,46,17,6,'#6a4458'); o.r(98,106,44,3,'#8a6a40');
  chandelier(o,120,22,40);
  for(let i=0;i<9;i++){ const y=150-i*8, x=6+i*12, w=100-i*11; o.r(x,y,w,8,i%2?'#a8384e':'#8c2c42'); o.r(x,y,w,1,mix('#c8456a','#fff',.3)); o.r(x,y+7,w,1,'#5a2030'); o.r(x+w-2,y,2,8,'#6a2438'); }
  o.line(8,146,80,92,'#d8b070'); o.line(8,147,80,93,'#8a6a40'); for(let i=0;i<=8;i++){ const bx=10+i*9; o.r(bx,142-i*8-8,2,9,'#d8b070'); o.p(bx,142-i*8-9,'#fff0c0'); }
  o.r(212,100,16,16,'#7a5040'); o.r(212,100,16,2,'#a07058'); o.ell(220,92,12,11,'#3f8a46'); o.ell(218,90,9,8,'#58aa58'); o.ell(216,87,5,4,'#86cc6a');
  vignette(o);
 },
 bedroom(o,P,rnd){
  wallPanel(o,0,106,'#cdb3b6'); o.r(0,80,240,3,'#a8808a'); o.r(0,83,240,23,mix('#cdb3b6','#8a6a80',.18));
  for(let X=4;X<240;X+=18) o.r(X,86,10,14,mix('#cdb3b6','#8a6a80',.3));
  floorBoards(o,106,'#92644e','#6e4a3e');
  archWin(o,170,22,36,56,P,false); curtain(o,152,18,14,64,'#6c7eb0'); curtain(o,208,18,14,64,'#6c7eb0');
  o.r(10,40,5,80,'#6a4638'); o.r(88,40,5,80,'#6a4638'); o.r(8,36,87,5,'#8a5a48'); o.r(8,36,87,1,'#b88a68'); o.poly([[10,41],[93,41],[82,64],[21,64]],'#8ea0d0'); o.dith(10,41,83,23,'#8ea0d0','#6c7eb0',.3);
  curtain(o,10,41,10,66,'#8ea0d0'); curtain(o,83,41,10,66,'#8ea0d0');
  o.r(20,92,64,26,'#ebe3f0'); o.r(20,92,64,3,'#ffffff'); o.r(20,104,64,14,'#8ea0d0'); o.dith(20,104,64,14,'#8ea0d0','#6c7eb0',.3); o.r(20,116,64,3,'#6c7eb0'); o.ell(34,95,10,4,'#ffffff'); o.ell(70,95,10,4,'#f4eef8'); o.ell(34,96,8,2,'#e4dcee'); o.r(16,116,72,6,'#6a4638'); o.r(16,116,72,1,'#a07058');
  o.r(112,92,44,38,'#5a4650'); o.r(112,92,44,3,'#8a7080'); o.r(118,100,32,30,'#2e2028'); glow(o,134,122,22,'#f2a23a',.85); o.poly([[126,128],[142,128],[134,106]],'#f2a23a'); o.poly([[130,128],[138,128],[134,112]],'#ffd75a'); o.poly([[132,128],[136,128],[134,118]],'#fff0a8'); o.r(108,88,52,5,'#7a6070'); o.r(106,86,56,3,'#8a7080');
  o.ell(68,148,44,8,'#a8384e'); o.ell(68,148,38,6,'#c8456a'); o.ell(68,148,28,3,'#e0788a'); for(let k=0;k<20;k++) o.p(34+k*3,148+(k%2),'#f0c0c8');
  o.r(168,100,40,4,'#6a4638'); o.r(172,104,4,30,'#6a4638'); o.r(200,104,4,30,'#6a4638'); o.r(178,92,18,8,'#f2ead8'); o.r(178,92,18,1,'#fff'); o.r(180,93,14,1,'#8a8a9a'); candle(o,204,94,true);
  vignette(o);
 },
 dining(o,P,rnd){
  wallPanel(o,0,100,'#7a5864'); o.r(0,62,240,3,'#d8b070'); o.r(0,72,240,28,mix('#7a5864','#3a2434',.3));
  for(let X=6;X<240;X+=24) o.r(X,76,16,20,mix('#7a5864','#2a1a2a',.22));
  floorBoards(o,100,'#6a4a44','#583c3a');
  archWin(o,22,16,36,58,P,false); curtain(o,6,12,14,66,'#8c2c42'); curtain(o,60,12,14,66,'#8c2c42');
  archWin(o,182,16,36,58,P,false); curtain(o,166,12,14,66,'#8c2c42'); curtain(o,220,12,14,66,'#8c2c42');
  o.poly([[92,100],[148,100],[196,144],[44,144]],'#f6f1ea'); o.poly([[92,100],[148,100],[152,106],[88,106]],'#fff'); for(let k=0;k<5;k++) o.line(100+k*10,102,70+k*24,142,mix('#f6f1ea','#cdbfd0',.5)); o.r(44,144,152,8,'#ddd2c8'); o.r(44,150,152,3,'#8a7a80'); for(let k=0;k<12;k++) o.r(46+k*13,150,5,10,'#f4efe8');
  [[80,128],[160,128],[66,138],[174,138]].forEach(p=>{ o.ell(p[0],p[1],8,3,'#fff'); o.ell(p[0],p[1],5,2,'#e2d8ee'); o.p(p[0]-1,p[1]-1,'#fff'); });
  o.r(106,82,28,36,'#8a4a5c'); o.r(106,82,28,3,'#c98a9a'); o.r(108,87,24,26,'#a8586c'); o.dith(108,87,24,26,'#a8586c','#c0708a',.3); o.r(106,82,3,36,'#6a3446'); o.r(131,82,3,36,'#6a3446'); o.r(109,114,22,4,'#6a3446'); o.ell(120,110,9,3,'#fff'); o.ell(120,110,6,2,'#f4d0d8');
  candle(o,98,104,true); candle(o,140,104,true); o.r(94,110,50,2,'#d8b070');
  [[48,112],[184,112]].forEach(p=>{ o.r(p[0],p[1],12,24,'#4a3040'); o.r(p[0],p[1],12,4,'#6a4458'); o.r(p[0],p[1]+22,12,2,'#2a1a2a'); });
  chandelier(o,120,24,50); vignette(o);
 },
 study(o,P,rnd){
  wallPanel(o,0,106,'#58404c'); floorBoards(o,106,'#4a3238','#3a262e');
  const cols=['#a83a4a','#3a5a9a','#4a7a4a','#c9a050','#7a4a8a','#3a8a8a','#c86a3a','#8a3a6a'];
  o.r(0,10,112,108,'#3a2630'); o.r(0,8,114,5,'#6a4a50'); o.r(0,8,114,1,'#9a7a80');
  for(let r=0;r<5;r++){ const by=16+r*21; o.r(0,by+18,112,3,'#241420'); o.r(0,by+18,112,1,'#5a3a40'); for(let X=3;X<108;){ const w=3+Math.floor(rnd()*4), h=15-Math.floor(rnd()*4); book(o,X,by+18-h,w,h,cols[Math.floor(rnd()*cols.length)]); X+=w+((rnd()<.12)?3:0); } }
  o.r(112,10,3,108,'#241420'); o.r(0,116,114,4,'#2a1a20');
  archWin(o,142,24,34,54,P,true); curtain(o,126,20,14,62,'#3a4a8a'); curtain(o,178,20,14,62,'#3a4a8a');
  o.r(128,98,106,6,'#5a3a30'); o.r(128,98,106,1,'#9a6a50'); o.r(134,104,6,40,'#4a2a22'); o.r(224,104,6,40,'#4a2a22'); o.r(146,90,26,8,'#e8e0d0'); o.r(146,90,26,1,'#fff'); o.r(150,86,14,4,'#a83a4a'); o.r(150,86,14,1,'#d86a7a'); o.r(190,94,6,4,'#2a2030'); o.line(196,92,206,84,'#e8e0d0');
  o.r(204,72,3,26,'#c9a070'); o.ell(205,68,9,7,'#ffd36a'); o.ell(205,67,6,4,'#fff0a8'); o.r(201,74,10,3,'#c9a050'); glow(o,205,76,34,'#f7d98a',.7);
  o.ell(66,148,38,8,'#6a2a3a'); o.ell(66,148,32,6,'#8a3a4a'); o.ell(66,148,22,3,'#a8505e');
  o.ell(20,134,10,10,'#8a6a40'); o.ell(18,131,6,6,'#a8864e'); o.r(18,144,4,10,'#6a4a30'); o.line(9,134,31,134,'#d8b070'); o.line(20,124,20,144,'#d8b070');
  vignette(o);
 },
 orchard(o,P,rnd){
  skyBG(o,P,108); clouds(o,P,rnd,5,30); hills(o,P,84,5,P.far[0],7); hills(o,P,98,3,P.far[1],3);
  o.r(0,108,240,52,P.gr[1]); o.dith(0,108,240,52,P.gr[1],P.gr[0],.4); o.dith(0,132,240,28,P.gr[1],P.gr[2],.45);
  tree(o,P,38,72,1.5,true,rnd); tree(o,P,122,80,1.4,true,rnd); tree(o,P,204,72,1.5,true,rnd);
  o.r(0,104,240,24,'#a89a94'); o.r(0,100,240,5,'#cfc3b8'); o.r(0,100,240,1,'#e8dcd0'); for(let j=0;j<22;j+=6){ for(let X=-(j%12);X<240;X+=16){ o.r(X,108+j,15,5,j%12?'#948680':'#b2a49c'); o.r(X,112+j,15,1,'#7a6e6a'); o.r(X,108+j,15,1,'#c4b8ae'); } }
  for(let X=4;X<240;X+=11){ if(rnd()<.55){ o.r(X,98,4,3,'#6e9a52'); o.p(X+1,97,'#8ac060'); } }
  o.r(106,98,28,30,'#6a4a38'); o.r(108,100,24,28,'#8a6248'); o.r(119,100,2,28,'#4a3226'); for(let k=0;k<4;k++) o.r(108,104+k*7,24,1,'#6a4a38'); o.ell(120,98,14,6,'#6a4a38'); o.ell(120,99,11,4,'#8a6248'); o.r(128,114,3,3,'#d8b070');
  for(let X=0;X<240;X+=3){ if(rnd()<.5) o.p(X,134+Math.floor(rnd()*24),P.gr[0]); } for(let k=0;k<26;k++){ const X=Math.floor(rnd()*240), Y=134+Math.floor(rnd()*22); o.p(X,Y,P.gr[2]); o.p(X,Y-1,P.gr[0]); }
 },
 kitchen(o,P,rnd){
  wallPanel(o,0,100,'#c89a74'); for(let j=0;j<100;j+=9){ o.r(0,j,240,1,mix('#c89a74','#6a4a50',.28)); for(let X=((j/9)%2)*9;X<240;X+=18) o.r(X,j,1,9,mix('#c89a74','#6a4a50',.22)); }
  for(let j=100;j<160;j+=10) for(let X=((j/10)%2)*8;X<240;X+=16){ o.r(X,j,15,9,(X+j)%32?'#8a6a5a':'#74564a'); o.r(X,j,15,1,'#a08070'); }
  o.r(14,36,90,86,'#5a4650'); o.r(14,36,90,5,'#8a7080'); o.r(14,36,90,1,'#b098a8'); o.r(24,54,70,68,'#2a1c24'); o.ell(59,54,35,8,'#2a1c24'); glow(o,59,112,36,'#f2a23a',.85); o.poly([[46,120],[72,120],[59,92]],'#f2a23a'); o.poly([[52,120],[66,120],[59,100]],'#ffd75a'); o.poly([[55,120],[63,120],[59,108]],'#fff0a8');
  o.r(30,96,58,3,'#5a4650'); o.r(40,82,36,16,'#3a3238'); o.r(40,82,36,3,'#7a7078'); o.line(40,82,36,70,'#3a3238'); o.line(76,82,80,70,'#3a3238'); o.r(34,64,50,3,'#3a3238');
  [[120,22],[142,26],[166,20],[190,26]].forEach((p,i)=>{ o.line(p[0],12,p[0],p[1],'#4a3a30'); o.ell(p[0],p[1]+7,7,7,i%2?'#c8783a':'#d88a4a'); o.ell(p[0]-2,p[1]+5,3,3,'#f0b080'); o.r(p[0]-6,p[1]+13,12,2,'#8a4a2a'); });
  o.r(110,12,96,3,'#4a3a30'); for(let k=0;k<6;k++){ o.line(212+k*4,12,213+k*4,30,'#6a8a4a'); o.p(212+k*4,31,'#a8c06a'); }
  archWin(o,166,46,30,44,P,false);
  o.r(116,110,110,7,'#9a7a5a'); o.r(116,110,110,2,'#c9a070'); o.r(122,117,6,38,'#6a4a38'); o.r(212,117,6,38,'#6a4a38'); o.r(122,138,96,3,'#5a402c');
  o.ell(140,106,10,4,'#d89a4a'); o.ell(140,104,8,3,'#f0c27a'); o.ell(164,106,8,4,'#c88a3a'); o.ell(164,104,6,3,'#e8b068'); o.r(184,98,16,10,'#e8e0d0'); o.r(184,98,16,2,'#fff'); o.ell(206,106,6,3,'#c8453a'); o.p(204,104,'#ff8a7a');
  vignette(o);
 },
 schoolroom(o,P,rnd){
  wallPanel(o,0,100,'#b6a8a0'); o.r(0,74,240,3,'#7a5a5a'); o.r(0,77,240,23,mix('#b6a8a0','#5a4a5a',.28));
  floorBoards(o,100,'#8a6a58','#6e5044');
  o.r(22,18,82,54,'#5a4030'); o.r(25,21,76,48,'#e8d8a8'); o.dith(25,21,76,48,'#e8d8a8','#cdb88a',.22); o.line(32,50,50,36,'#6a8aa8'); o.line(50,36,68,48,'#6a8aa8'); o.line(68,48,90,30,'#6a8aa8'); o.ell(40,60,8,5,'#86cc6a'); o.ell(78,56,10,5,'#c8786a'); o.p(68,48,'#a83a4a'); o.r(30,24,12,1,'#8a6a40');
  archWin(o,160,16,38,56,P,false); curtain(o,144,12,14,64,'#6a8a5a'); curtain(o,200,12,14,64,'#6a8a5a');
  o.r(94,106,116,8,'#7a5238'); o.r(94,106,116,2,'#a8785a'); o.r(100,114,6,38,'#5a3a28'); o.r(198,114,6,38,'#5a3a28'); o.r(118,96,22,10,'#f2ead8'); o.r(120,98,14,1,'#8a8a9a'); o.r(120,101,10,1,'#8a8a9a'); o.r(166,98,14,8,'#a83a4a'); o.r(166,98,14,2,'#d86a7a'); o.line(150,100,164,86,'#e8e0d0');
  o.r(12,92,20,34,'#5a3a2c'); o.r(12,92,20,3,'#7a5a48'); o.ell(22,82,9,9,'#c9a050'); o.ell(20,79,5,5,'#e0bc6a'); o.r(21,90,3,3,'#5a3a2c'); o.line(11,82,33,82,'#8a6a30');
  o.ell(60,144,26,6,'#6a8a5a'); o.ell(60,144,21,4,'#86aa72'); vignette(o);
 },
 corridor(o,P,rnd){
  const wall='#5a4254';
  wallPanel(o,0,104,wall); o.r(0,0,240,7,'#2e2030'); o.r(0,7,240,2,'#a8845a'); o.r(0,9,240,1,'#5a4040');
  o.r(0,64,240,3,'#a8845a'); o.r(0,67,240,37,mix(wall,'#2a1a2a',.3)); for(let X=4;X<240;X+=22){ o.r(X,72,16,26,mix(wall,'#1e1220',.28)); o.r(X,72,16,1,mix(wall,'#ffffff',.14)); o.r(X,97,16,1,mix(wall,'#000000',.3)); }
  o.r(0,101,240,3,'#3a2630');
  floorBoards(o,104,'#4e3638','#3c282c');
  o.r(0,118,240,24,'#6a2a3c'); o.r(0,118,240,2,'#a8845a'); o.r(0,140,240,2,'#a8845a'); o.dith(0,120,240,20,'#6a2a3c','#58223a',.35); for(let X=6;X<240;X+=14){ o.p(X,129,'#c98a6a'); o.p(X+1,130,'#c98a6a'); o.p(X-1,130,'#c98a6a'); o.p(X,131,'#c98a6a'); }
  archWin(o,14,20,30,52,P,true); if(P.part==='#ffffff'){ o.r(14,68,30,4,'#e8eef6'); o.dith(14,64,30,4,'#2c3870','#e8eef6',.35); } curtain(o,2,16,10,62,'#3a4a7a'); curtain(o,46,16,10,62,'#3a4a7a');
  const door=(x,w,lit)=>{ o.r(x-4,22,w+8,82,'#3a2428'); o.r(x-4,22,w+8,2,'#7a5444'); o.r(x,26,w,78,lit?'#5e3c34':'#4e3230'); o.r(x+Math.floor(w/2),26,1,78,'#2e1c1e'); const pw=Math.floor(w/2)-5; [x+3,x+Math.floor(w/2)+3].forEach(px=>{ o.r(px,32,pw,26,mix(lit?'#5e3c34':'#4e3230','#000000',.18)); o.r(px,32,pw,1,'#7a5444'); o.r(px,64,pw,34,mix(lit?'#5e3c34':'#4e3230','#000000',.18)); o.r(px,64,pw,1,'#7a5444'); }); o.p(x+Math.floor(w/2)-3,66,'#d8b070'); o.p(x+Math.floor(w/2)+3,66,'#d8b070');
    if(lit){ o.p(x+Math.floor(w/2)+3,69,'#ffe08a'); o.r(x-1,26,1,78,'#c98a3a'); o.r(x,103,w,1,'#ffe8a0'); o.r(x-2,102,w+4,1,'#f7c860');
      for(let j=0;j<22;j++){ const sp=Math.round(j*.8), t=.62*(1-j/22); for(let X=x-sp;X<x+w+sp;X++){ const e=Math.min(X-(x-sp),(x+w+sp)-X)/6; const tt=t*Math.min(1,e+.2); if(tt*16>BAYER[(104+j)&3][X&3]) o.p(X,104+j,j<3?'#f7d98a':'#b07a48'); } } } };
  door(70,30,false); door(162,34,true);
  const sconce=(x,y)=>{ o.r(x-1,y+4,3,6,'#a8845a'); o.r(x-4,y+9,9,2,'#a8845a'); o.p(x,y+11,'#7a5a3a'); candle(o,x,y-2,false); glow(o,x,y-4,10,'#f7d98a',.4); };
  sconce(126,40); sconce(222,40);
  o.r(112,90,28,4,'#5a3a30'); o.r(112,90,28,1,'#8a6248'); o.r(114,94,3,10,'#3e2822'); o.r(135,94,3,10,'#3e2822'); o.r(121,82,8,8,'#3a5a7a'); o.r(122,80,6,2,'#4a6a8a'); o.p(124,78,P.leaf[0]); o.p(123,77,P.leaf[1]); o.p(126,77,P.leaf[1]);
  vignette(o); vignette(o);
 },
 carriage(o,P,rnd){
  o.r(0,0,240,160,'#3a2840'); for(let X=0;X<240;X+=8) o.r(X,0,1,160,'#46324e'); o.r(0,0,240,6,'#2a1c30');
  o.r(56,20,128,94,'#6a4a50'); o.r(60,24,120,86,'#4a323a');
  o.grad(64,28,112,78,P.sky); hills(o,P,72,5,P.far[0],21,106,64,176); o.r(64,88,112,18,P.gr[1]); o.dith(64,88,112,18,P.gr[1],P.gr[0],.4);
  tree(o,P,88,64,1,false,rnd); tree(o,P,152,66,.9,false,rnd); particles(o,P,rnd,16);
  for(let k=0;k<3;k++){ o.line(78+k*36,30,86+k*36,100,mix('#ffffff',P.sky[1],.35)); }
  o.r(119,26,3,84,'#6a4a50'); o.r(60,24,120,2,'#8a6a70'); o.r(60,108,120,2,'#2a1c30');
  curtain(o,42,16,14,98,'#7a3a58'); curtain(o,184,16,14,98,'#7a3a58');
  o.r(0,118,240,42,'#5a3040'); o.r(0,118,240,5,'#8a4a60'); o.dith(0,123,240,37,'#5a3040','#4a2634',.4); for(let X=8;X<240;X+=18){ o.r(X,136,3,3,'#c9a070'); o.p(X+1,135,'#fff0c0'); }
  o.r(22,110,10,7,'#c9a070'); o.r(208,110,10,7,'#c9a070'); vignette(o);
 }
};
const PLACES={exterior:'저택 앞',hall:'현관 홀',bedroom:'내 방',dining:'식당',study:'서재 앞',orchard:'과수원 담장',kitchen:'부엌',schoolroom:'공부방',corridor:'이층 복도'};
const BGCACHE={};
function bgCanvas(place,season){
  const key=place+'|'+season; if(BGCACHE[key]) return BGCACHE[key];
  const o=PX(BW,BH); const P=seasonPal(season); const rnd=rng(hashStr(key));
  (BG[place]||BG.exterior)(o,P,rnd);
  if(/exterior|orchard/.test(place)) particles(o,P,rnd,/겨울/.test(season)?46:20);
  BGCACHE[key]=o.c; return o.c;
}
function stageSVG(place,season,chars){
  const key='st|'+place+'|'+season+'|'+JSON.stringify(chars||[]);
  if(IMGCACHE[key]) return IMGCACHE[key];
  const o=PX(BW,BH); if(!o.x) return '';
  o.x.drawImage(bgCanvas(place,season),0,0);
  if(place==='carriage'){ const rs=sprite('adeline','neutral'); o.x.save(); o.x.globalAlpha=.3; o.x.drawImage(rs.c,0,0,56,70,92,24,56,70); o.x.restore(); }
  const xs={left:18,center:92,right:166};
  (chars||[]).forEach(ch=>{ const s=sprite(ch.id,ch.expr||'neutral'); const X=xs[ch.pos||'center'], Y=156-s.feet; o.x.globalAlpha=.3; o.x.fillStyle='#1a1226'; for(let k=0;k<4;k++){ o.x.fillRect(X+8+k*2,152+k,40-k*4,1); } o.x.globalAlpha=1; o.x.drawImage(s.c,X,Y); });
  IMGCACHE[key]=toImg(o.c,'px',PLACES[place]||'마차 안'); return IMGCACHE[key];
}
function bgSVG(place,season){ return toImg(bgCanvas(place,season),'px',PLACES[place]||''); }
function figSVG(id){
  const key='av|'+id; if(IMGCACHE[key]) return IMGCACHE[key];
  const s=sprite(id,'neutral'); const o=PX(56,64); if(!o.x) return '';
  o.r(0,0,56,64,'#d9d3e0'); o.dith(0,36,56,28,'#d9d3e0','#c6bdd4',.5);
  o.x.drawImage(s.c,0,0,56,64,0,0,56,64);
  IMGCACHE[key]=toImg(o.c,'px',id); return IMGCACHE[key];
}
function titleSVG(season){
  const key='ti|'+season; if(IMGCACHE[key]) return IMGCACHE[key];
  const o=PX(120,214); if(!o.x) return ''; const P=seasonPal(season); const rnd=rng(hashStr(key));
  o.r(0,0,120,214,'#2e2036'); for(let X=0;X<120;X+=7) o.r(X,0,1,214,'#382844');
  o.x.save(); o.x.translate(0,14);
  o.r(18,52,84,92,'#6a4a56'); o.r(21,55,78,86,'#3e2a36');
  o.grad(24,58,72,78,P.sky); hills(o,P,102,4,P.far[0],9,136,24,96); o.r(24,118,72,18,P.gr[1]); o.dith(24,118,72,18,P.gr[1],P.gr[0],.4);
  tree(o,P,36,98,.7,false,rnd); tree(o,P,90,100,.6,false,rnd); particles(o,P,rnd,16);
  o.r(59,55,3,86,'#6a4a56'); o.r(21,55,78,2,'#8a6a74'); o.r(21,139,78,2,'#2a1c30');
  const s=sprite('adeline','neutral'); o.x.save(); o.x.globalAlpha=.3; o.x.drawImage(s.c,0,0,56,70,32,62,56,70); o.x.restore();
  o.x.save(); o.x.globalAlpha=.1; o.x.fillStyle='#ffffff'; o.x.fillRect(24,58,72,78); o.x.restore();
  o.x.restore();
  curtain(o,4,46,13,104,'#7a3a58'); curtain(o,103,46,13,104,'#7a3a58');
  o.r(0,156,120,58,'#5a3040'); o.r(0,156,120,4,'#8a4a60'); o.dith(0,160,120,54,'#5a3040','#4a2634',.4); for(let X=7;X<120;X+=13){ o.r(X,176,2,2,'#c9a070'); }
  IMGCACHE[key]=toImg(o.c,'bgsvg px','').replace('class="bgsvg px"','class="bgsvg px" aria-hidden="true"'); return IMGCACHE[key];
}
