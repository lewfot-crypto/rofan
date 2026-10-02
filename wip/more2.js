// 탠지·에드릭·마로트 새 스프라이트
function stampMap(o,rows,x,y,pal){ rows.forEach((row,j)=>{ for(let i=0;i<row.length;i++){ const ch=row[i]; if(ch!=='.'&&pal[ch]) o.p(x+i,y+j,pal[ch]); } }); }
function celPath(o,d,rp){ const m=o.mask(c=>c.fill(new Path2D(d))); celShade(o,m,rp); return m; }
// ── 남자 얼굴 지도 (외곽선 없이, 나중에 외곽선을 두른다)
const M_TOP={
 short:[
".........HHHHHHHH.........",
".......HHLLHHHHHHHh.......",
".....HHLLLHHHHHHHHHhh.....",
"....HLLLHHHHHHHHHHHHhh....",
"...HLLHHHHHHHHHHHHHHHhh...",
"..HHLHHHHHHHHHHHHHHHHHhh..",
"..HHHHHHHHHHHHHHHHHHHHHh..",
".HHHHHhHHHHHhHHHHHhHHHHhh.",
".HHHHhShHHhSShHHhSSShHHhh.",
".HHHhSSShhSSSSShhSSSSShhh."],
 swept:[
".........HHHHHHHH.........",
".......HHLLLLHHHHHh.......",
".....HHLLLLHHHHHHHHhh.....",
"....HLLLHHHHHHHHHHHHhh....",
"...HLLHHHHHHHHHHHHHHHhh...",
"..HHLHHHHHHHHHHHHHHHHHhh..",
"..HHHHHHHHHHHHHHHHHHHHHh..",
".HHHHHHHHHHHHHHhhSSSSShHh.",
".HHHHHHHHHHhhSSSSSSSShHhh.",
".HHHHHHhhSSSSSSSSSSSShhhh."]
};
const M_FACE=[
 "hSSSSSSSSSSSSSSSSSSh","SSSSSSSSSSSSSSSSSSSs","SShhhhhSSSSShhhhhSSs","SSSSSSSSSSSSSSSSSSSs",
 "SSSeeeeSSSSSSeeeeSSs","SSSwbBbSSSSSSwbBbSSs","SSSsbbsSSSSSSsbbsSSs",
 "SSSSSSSSSsSSSSSSSSss","SSSSSSSSSsSSSSSSSsss","sSSSSSSSSSSSSSSSSsss","sSSSSSSSnnnnSSSSSsss",
 ".sSSSSSSSSSSSSSSSss.","..sSSSSSSSSSSSSSss..","...ssSSSSSSSSSSss...",".....ssssssssss....."
];
const M_EXPR={
 smile:{10:"sSSSSSSnSSSSnSSSSsss",11:".sSSSSSSnnnnSSSSSss."},
 sad:{2:"SSSShhhSSSSShhhSSSSs",3:"SShhSSSSSSSSSSShhSSs",11:".sSSSSSnSSSSnSSSSss."},
 worry:{2:"SSSShhhSSSSShhhSSSSs",3:"SShhSSSSSSSSSSShhSSs"},
 surprise:{1:"SShhhhhSSSSShhhhhSSs",2:"SSSSSSSSSSSSSSSSSSSs",10:"sSSSSSSSSnnSSSSSSsss",11:".sSSSSSSSnnSSSSSSss."}
};
function maleHead(o,x,y,cfg,expr){
  const pal={H:cfg.hair[2],L:cfg.hair[3],h:cfg.hair[1],S:'#f5d2bd',s:'#dda48f',e:'#2c1f33',w:'#ffffff',b:cfg.eye[0],B:cfg.eye[1],n:'#a8625c',G:'#c8c8d4'};
  stampMap(o,M_TOP[cfg.hs],x,y,pal);
  const ex=M_EXPR[expr]||{}; let rows=M_FACE.map((r,j)=>ex[j]||r);
  if(cfg.long) rows.splice(9,0,"SSSSSSSSSSSSSSSSSSss");
  rows.forEach((r,j)=>{ const side=j<4?['Hh','hH']:j<8?['sS','Ss']:['..','..']; stampMap(o,['.'+side[0]+r+side[1]+'.'],x,y+10+j,pal); });
  if(cfg.gray){ [[3,6],[2,7],[2,8],[1,9],[1,10]].forEach(p=>{ o.p(x+p[0],y+p[1],pal.G); o.p(x+25-p[0],y+p[1],pal.G); }); }
}
function maleBody(o,cfg){
  const C=cfg.coat, V=cfg.vest, PT=cfg.pants, SK=['#c98a78','#e2a892','#f5d2bd','#fde8d8'], WH=['#a9a3b0','#d6d1da','#f2eff4','#ffffff'];
  const fy=cfg.feet;
  // 다리
  celPath(o,`M19 86 L27 86 L27 ${fy-6} L19 ${fy-6} Z`,PT); celPath(o,`M29 86 L37 86 L37 ${fy-6} L29 ${fy-6} Z`,PT);
  celPath(o,`M17 ${fy-7} L27 ${fy-7} L27 ${fy} L15 ${fy} C15 ${fy-3} 16 ${fy-6} 17 ${fy-7} Z`,['#16121c','#241e2c','#3a3246','#544a62']);
  celPath(o,`M29 ${fy-7} L39 ${fy-7} C40 ${fy-6} 41 ${fy-3} 41 ${fy} L29 ${fy} Z`,['#16121c','#241e2c','#3a3246','#544a62']);
  // 코트 몸통 + 자락
  celPath(o,'M12 38 C18 33 38 33 44 38 L42 70 L44 96 L31 96 L28 74 L25 96 L12 96 L14 70 Z',C);
  // 조끼
  celPath(o,'M23 38 L33 38 L33 72 L28 76 L23 72 Z',V);
  [48,56,64].forEach(yy=>{ o.p(28,yy,'#d8c08a'); o.p(28,yy+1,'#8a7040'); });
  // 셔츠 + 크라바트
  celPath(o,'M24 32 L32 32 L33 40 L28 46 L23 40 Z',WH);
  if(cfg.cravat) celPath(o,'M25 35 L31 35 L30 41 L28 48 L26 41 Z',WH);
  // 옷깃
  celPath(o,'M22 37 L28 60 L24 62 L17 41 Z',C.map(c=>mix(c,'#ffffff',.08))); celPath(o,'M34 37 L28 60 L32 62 L39 41 Z',C.map(c=>mix(c,'#000000',.15)));
  o.line(28,60,28,74,C[0]);
  // 팔
  celPath(o,'M12 38 C8 52 8 68 9 84 L16 84 C16 70 17 54 19 42 Z',C); celPath(o,'M44 38 C48 52 48 68 47 84 L40 84 C40 70 39 54 37 42 Z',C);
  o.r(9,83,7,3,WH[2]); o.r(40,83,7,3,WH[2]); o.r(9,85,7,1,WH[0]); o.r(40,85,7,1,WH[0]);
  celPath(o,'M9 86 L16 86 L16 90 C15 93 10 93 9 90 Z',SK); celPath(o,'M40 86 L47 86 L47 90 C46 93 41 93 40 90 Z',SK);
  // 목
  o.r(24,28,8,6,SK[2]); o.r(29,28,3,6,SK[1]); o.r(24,28,8,1,SK[0]);
}
const NEW_FIG={
 edric:{type:'m',hs:'short',hair:['#141218','#24222c','#34323e','#4c4a58'],eye:['#3a4a5a','#6a7e90'],gray:true,coat:['#0e0d14','#191820','#25232e','#353342'],vest:['#3a3c48','#50525e','#6a6c7a','#8a8c9a'],pants:['#0e0d14','#16151c','#1f1e28','#2c2a36'],cravat:true,long:true,feet:130},
 marot:{type:'m',hs:'swept',hair:['#1e1618','#2e2224','#40302f','#5a4644'],eye:['#2e3e4e','#55697d'],coat:['#121118','#1d1c24','#2a2832','#3a3844'],vest:['#2e2e3a','#40404e','#565666','#6e6e80'],pants:['#121118','#1a1920','#24232c','#302e3a'],cravat:false,feet:128}
};
function maleSprite(id,expr){ const cfg=NEW_FIG[id]; const o=PX(56,132); maleBody(o,cfg); maleHead(o,15,3,cfg,expr); outlinePass(o); return {c:o.c,feet:cfg.feet}; }
// ── 탠지: 아델라인 얼굴 지도 + 주황 머리, 하녀 머리띠, 주근깨, 앞치마
function tangieSprite(expr){
  const o=PX(56,132); const R=(x,y,w,h,c)=>o.r(x,y,w,h,c);
  const DR=['#34472c','#4a6340','#628155','#7e9c6e','#9cb88a'], AP=['#b9ad9a','#ddd3c0','#f3ecdc','#fffaf0'], SK=['#c98a78','#e2a892','#f7d5c0','#fde8d8'];
  const HR=['#8a3a14','#b8521c','#e0722a','#f29a4e','#ffc68a'];
  const BOB=[[28,13,15,12],[15,13,5,5],[13,19,5,5],[12,25,5,5],[14,30,5,4],[19,33,4,3],[41,13,5,5],[43,19,5,5],[44,25,5,5],[42,30,5,4],[37,33,4,3]];
  { const m=o.mask(c=>{ BOB.forEach(b=>{ c.beginPath(); c.ellipse(b[0],b[1],b[2],b[3],0,0,Math.PI*2); c.fill(); }); }); celShade(o,m,HR);
    BOB.slice(1).forEach(b=>{ const x=b[0],y=b[1]; [[-2,-1],[-1,-2],[0,-2],[1,-2]].forEach(d=>o.p(x+d[0],y+d[1],HR[4])); [[2,-1],[2,0],[1,1],[0,2],[-1,2]].forEach(d=>o.p(x+d[0],y+d[1],HR[1])); o.p(x-2,y,HR[3]); }); }
  celPath(o,'M20 60 C17 76 13 96 10 114 L46 114 C43 96 39 76 36 60 Z',DR);
  celPath(o,'M22 60 L34 60 C35 74 37 90 38 104 L18 104 C19 90 21 74 22 60 Z',AP);
  [[25,64,23,102],[28,64,28,102],[31,64,33,102]].forEach(l=>o.line(l[0],l[1],l[2],l[3],AP[1]));
  for(let X=18;X<38;X+=3){ o.p(X,104,AP[3]); o.p(X+1,105,AP[1]); }
  [[16,64,12,112],[40,64,44,112]].forEach(l=>{ o.line(l[0],l[1],l[2],l[3],DR[1]); o.line(l[0]+1,l[1],l[2]+1,l[3],DR[3]); });
  R(10,113,36,2,DR[1]);
  R(17,115,8,3,'#3a2a22'); R(31,115,8,3,'#3a2a22'); R(18,115,5,1,'#5a4434'); R(32,115,5,1,'#5a4434');
  celPath(o,'M19 38 C22 36 34 36 37 38 L36 60 L20 60 Z',DR);
  celPath(o,'M23 44 L33 44 L34 60 L22 60 Z',AP);
  R(20,57,16,3,AP[2]); R(20,59,16,1,AP[0]);
  celPath(o,'M13 44 C11 37 18 34 23 38 L22 46 C19 47 15 47 13 44 Z',DR); celPath(o,'M43 44 C45 37 38 34 33 38 L34 46 C37 47 41 47 43 44 Z',DR);
  celPath(o,'M14 45 C13 52 16 60 22 64 L26 62 C22 58 20 52 20 46 Z',DR); celPath(o,'M42 45 C43 52 40 60 34 64 L30 62 C34 58 36 52 36 46 Z',DR); o.r(19,61,5,2,AP[2]); o.r(32,61,5,2,AP[2]);
  celPath(o,'M23 61 C25 59 31 59 33 61 C33 65 30 67 28 67 C26 67 23 65 23 61 Z',SK);
  R(25,30,6,7,SK[2]); R(29,30,2,7,SK[1]);
  celPath(o,'M20 37 C23 34 33 34 36 37 L33 41 C30 42 26 42 23 41 Z',AP);
  outlinePass(o);
  const pal=Object.assign({},ADE_PAL,{h:HR[1],H:HR[2],L:HR[3],W:HR[4],b:'#3c6a34',B:'#6a9a4a',c:'#b0d890',f:'#d98a5e',F:'#fffaf0',G:'#ddd3c0'});
  const rows=ADE_HEAD.slice(); const ex=ADE_EXPR[expr]; if(ex) for(const k in ex) rows[k]=ex[k];
  rows[21]=".OHhSfSfSSSSSSSSSSfSfsHhO.";
  for(let j=10;j<rows.length;j++){ const r=rows[j].split(''); for(let i=0;i<r.length;i++) if((i<4||i>23)&&'OHhLW'.includes(r[i])) r[i]='.'; rows[j]=r.join(''); }
  stampMap(o,rows,14,2,pal);
  stampMap(o,["...OOOOOOOOOOOOOOOO...","..OFFFFFFFFFFFFFFFFFO..",".OFGFFGFFGFFGFFGFFGFFO.","..OOFOOFOOFOOFOOFOOO..."],17,3,pal);
  return {c:o.c,feet:118};
}
