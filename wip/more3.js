// 홀트·마르타(어른 여자 얼굴 지도) + 아드리안(아이 얼굴 지도)
// ── 어른 여자 얼굴 (20칸, maleHead와 같은 자리 규칙)
const F_FACE=[
 "hSSSSSSSSSSSSSSSSSSh","SSSSSSSSSSSSSSSSSSSs","SSShhhSSSSSSSShhhSSs","SSSSSSSSSSSSSSSSSSSs",
 "SSeeeeeSSSSSSeeeeeSs","SSewbBbSSSSSSwbBbeSs","SSsbbbsSSSSSSsbbbsSs",
 "SSSSSSSSSsSSSSSSSSss","SrrSSSSSSsSSSSSSrrss","sSSSSSSSSSSSSSSSSsss","sSSSSSSSmmmmSSSSSsss",
 ".sSSSSSSSSSSSSSSSss.","..sSSSSSSSSSSSSSSs..","...ssSSSSSSSSSSss...",".....ssssssssss....."
];
const F_ROUND={11:"sSSSSSSSSSSSSSSSSSss",12:".sSSSSSSSSSSSSSSSss.",13:"..ssSSSSSSSSSSSSss..",14:"....ssssssssssss...."};
const F_EXPR={
 smile:{4:"SSSeeeSSSSSSSSeeeSSs",5:"SSeSSSeSSSSSSeSSSeSs",6:"SSSSSSSSSSSSSSSSSSSs",10:"sSSSSSSmSSSSmSSSSsss",11:".sSSSSSSSmmmmSSSSSs."},
 sad:{2:"SSSShhSSSSSSSShhSSSs",1:"SSSSShSSSSSSSShSSSSs",3:"SShhSSSSSSSSSSShhSSs",10:"sSSSSSSSSSSSSSSSSsss",11:".sSSSSSSmmmmSSSSSss."},
 worry:{2:"SSSShhSSSSSSSShhSSSs",1:"SSSSShSSSSSSSShSSSSs",3:"SShhSSSSSSSSSSShhSSs",10:"sSSSSSSSmmmSSSSSSsss"},
 surprise:{1:"SSShhhSSSSSSSShhhSSs",2:"SSSSSSSSSSSSSSSSSSSs",10:"sSSSSSSSSmmSSSSSSsss",11:".sSSSSSSSmmSSSSSSss."}
};
const F_TOP={
 bun:[
"..........hHHHHHh.........",
"........hHHLLhHHHHh.......",
"......hHHLLHHhHHHHHHh.....",
".....hHLLHHHHhHHHHHHHh....",
"....hHLHHHHHHhHHHHHHHHh...",
"...hHHHHHHHHhShHHHHHHHHh..",
"..hHHHHHHHHhSSShHHHHHHHhh.",
"..HHHHHHHhSSSSSShHHHHHHhh.",
".HHHHHHhSSSSSSSSSShHHHHhh.",
".HHHHhSSSSSSSSSSSSSShHHhh."]
};
const F_BUN=["...hHHHHh...",".hHHLLHHHHh.","hHHLHHHHHHHh","hHHHHHHHHHhh",".hhHHHHHHhh."];
function femHead(o,x,y,cfg,expr){
  const pal={H:cfg.hair[2],L:cfg.hair[3],h:cfg.hair[1],S:'#f5d2bd',s:'#dda48f',e:'#2c1f33',w:'#ffffff',b:cfg.eye[0],B:cfg.eye[1],m:'#b8645e',r:cfg.blush?'#f0b0a4':'#f5d2bd'};
  stampMap(o,F_BUN,x+7,y-4,pal);
  stampMap(o,F_TOP[cfg.hs],x,y,pal);
  const ex=F_EXPR[expr]||{}; const base=F_FACE.map((r,j)=>(cfg.round&&F_ROUND[j])||r);
  const rows=base.map((r,j)=>ex[j]||r);
  rows.forEach((r,j)=>{ const side=j<4?['Hh','hH']:j<8?['sS','Ss']:['..','..']; stampMap(o,['.'+side[0]+r+side[1]+'.'],x,y+10+j,pal); });
  if(cfg.gray){ [[3,4],[4,3],[2,6],[22,5],[23,7],[21,3],[12,0],[10,1]].forEach(p=>o.p(x+p[0],y+p[1],'#d8d4dc')); }
  if(cfg.glasses){ const F=cfg.glasses, gy=y+10+3; [[x+4,gy],[x+15,gy]].forEach(g=>{ o.r(g[0],g[1],7,1,F); o.r(g[0],g[1]+4,7,1,F); o.r(g[0],g[1],1,5,F); o.r(g[0]+6,g[1],1,5,F); o.p(g[0]+5,g[1]+1,'#ffffff'); });
    o.r(x+11,gy+1,4,1,F); o.p(x+3,gy+1,F); o.p(x+22,gy+1,F); }
}
// ── 어른 여자 몸
function femBody(o,cfg){
  const D=cfg.dress, T=cfg.trim, SK=['#c98a78','#e2a892','#f5d2bd','#fde8d8'], fy=cfg.feet, w=cfg.wide||0;
  // 치마
  celPath(o,`M${18-w} 62 C${15-w} 80 ${10-w*2} 104 ${7-w} ${fy-3} L${49+w} ${fy-3} C${46+w*2} 104 ${41+w} 80 ${38+w} 62 Z`,D);
  [[24,64,20,fy-4],[28,64,28,fy-4],[32,64,36,fy-4]].forEach(l=>{ o.line(l[0],l[1],l[2],l[3],D[1]); o.line(l[0]+1,l[1]+2,l[2]+1,l[3],D[3]); });
  if(cfg.apron){ celPath(o,`M21 62 L35 62 C37 78 40 96 41 ${fy-10} L15 ${fy-10} C16 96 19 78 21 62 Z`,T); [[25,66,23,fy-12],[31,66,33,fy-12]].forEach(l=>o.line(l[0],l[1],l[2],l[3],T[1])); for(let X=16;X<41;X+=3) o.p(X,fy-10,T[3]); }
  o.r(7-w,fy-4,42+w*2,1,D[0]);
  o.r(17,fy-3,9,3,'#2a2236'); o.r(31,fy-3,9,3,'#2a2236'); o.r(18,fy-3,6,1,'#4a3e58'); o.r(32,fy-3,6,1,'#4a3e58');
  // 몸통
  celPath(o,`M${15-w} 38 C${19-w} 33 ${37+w} 33 ${41+w} 38 L${38+w} 62 L${18-w} 62 Z`,D);
  if(cfg.apron){ celPath(o,'M22 44 L34 44 L35 62 L21 62 Z',T); o.line(22,44,19,36,T[1]); o.line(34,44,37,36,T[1]); }
  o.r(18-w,59,21+w*2,3,cfg.belt[1]); o.r(18-w,59,21+w*2,1,cfg.belt[2]); o.r(18-w,61,21+w*2,1,cfg.belt[0]);
  // 팔 (손은 허리 앞에 모음)
  celPath(o,`M${15-w} 38 C${11-w} 46 ${12-w} 56 22 63 L26 61 C21 56 19 50 20 41 Z`,D); celPath(o,`M${41+w} 38 C${45+w} 46 ${44+w} 56 34 63 L30 61 C35 56 37 50 36 41 Z`,D);
  if(cfg.rolled){ celPath(o,`M${12-w} 50 L20 52 L22 56 L${14-w} 56 Z`,T); celPath(o,`M${44+w} 50 L36 52 L34 56 L${42+w} 56 Z`,T);
    celPath(o,`M${14-w} 56 L22 56 C23 59 24 61 24 63 L19 62 C17 61 ${15-w} 59 ${14-w} 56 Z`,SK); celPath(o,`M${42+w} 56 L34 56 C33 59 32 61 32 63 L37 62 C39 61 ${41+w} 59 ${42+w} 56 Z`,SK); }
  else { o.r(19,60,5,3,T[2]); o.r(32,60,5,3,T[2]); }
  if(cfg.patch){ o.r(13,48,5,5,cfg.patch); [[13,48],[15,48],[17,48],[17,50],[17,52],[15,52],[13,52],[13,50]].forEach(q=>o.p(q[0],q[1],'#a8a4b0')); }
  celPath(o,'M23 61 C25 59 31 59 33 61 C33 65 30 67 28 67 C26 67 23 65 23 61 Z',SK); o.p(28,62,SK[1]); o.p(28,63,SK[1]);
  // 목 + 칼라
  o.r(25,27,6,8,SK[2]); o.r(29,27,2,8,SK[1]); o.r(25,27,6,1,SK[1]);
  if(cfg.highneck){ celPath(o,'M23 29 L33 29 L34 36 L22 36 Z',D); o.r(23,29,11,1,T[2]); o.p(28,36,'#e8c870'); o.p(28,37,'#a8803a'); o.p(27,36,'#c9a050'); o.p(29,36,'#c9a050'); }
  else celPath(o,'M20 36 C23 33 33 33 36 36 L33 40 C30 41 26 41 23 40 Z',T);
}
const FEM_FIG={
 holt:{hs:'bun',hair:['#3a2a20','#4e3828','#6a5240','#86705a'],eye:['#3e4250','#6a7080'],glasses:'#6a5432',
   dress:['#2e2e38','#45454f','#5e5e6a','#7a7a86','#9898a4'],trim:['#a9a3b0','#d6d1da','#eeeaf0','#ffffff'],belt:['#2e2e38','#45454f','#5e5e6a'],highneck:true,patch:'#72707e',feet:128},
 marta:{hs:'bun',hair:['#6e665e','#8e867c','#b0a89e','#cec6bc'],eye:['#4a3a2a','#7a6248'],gray:true,round:true,blush:true,
   dress:['#3e2a1e','#5a3e2a','#7a5638','#9a6e4a','#b88c64'],trim:['#b9ad9a','#ddd3c0','#f3ecdc','#fffaf0'],belt:['#b9ad9a','#ddd3c0','#f3ecdc'],apron:true,rolled:true,wide:3,feet:126}
};
function femSprite(id,expr){ const cfg=FEM_FIG[id]; const o=PX(56,132); femBody(o,cfg); femHead(o,15,5,cfg,expr); outlinePass(o); return {c:o.c,feet:cfg.feet}; }
// ── 아드리안: 아이 얼굴 지도(아델라인 것) + 모래빛 짧은 머리, 하늘색 외투, 잉크 묻은 손
function adrianSprite(expr){
  const o=PX(56,132); const SK=['#c98a78','#e2a892','#f5d2bd','#fde8d8'], WH=['#a9a3b0','#d6d1da','#f2eff4','#ffffff'];
  const C=['#3e5468','#56708a','#7290aa','#8eaac2','#b0c8da'], PT=['#3a3434','#4e4848','#625c5c','#7a7474'], fy=124;
  const BT=['#2a1e18','#3e2e24','#56402e','#6e5640'];
  celPath(o,`M20 84 L27 84 L27 ${fy-6} L20 ${fy-6} Z`,PT); celPath(o,`M29 84 L36 84 L36 ${fy-6} L29 ${fy-6} Z`,PT);
  celPath(o,`M18 ${fy-8} L27 ${fy-8} L27 ${fy} L16 ${fy} C16 ${fy-3} 17 ${fy-6} 18 ${fy-8} Z`,BT); celPath(o,`M29 ${fy-8} L38 ${fy-8} C39 ${fy-6} 40 ${fy-3} 40 ${fy} L29 ${fy} Z`,BT);
  celPath(o,'M15 38 C20 34 36 34 41 38 L40 66 L42 88 L31 88 L28 72 L25 88 L14 88 L16 66 Z',C);
  celPath(o,'M24 38 L32 38 L32 60 L28 63 L24 60 Z',['#8a7a5a','#a8987a','#c4b494','#dccdb0']);
  [46,52,58].forEach(yy=>{ o.p(28,yy,'#f4eac8'); o.p(28,yy+1,'#8a7040'); });
  celPath(o,'M24 32 L32 32 L33 40 L28 45 L23 40 Z',WH); celPath(o,'M25 35 L31 35 L30 40 L28 45 L26 40 Z',WH);
  celPath(o,'M22 37 L28 56 L24 58 L18 41 Z',C.map(c=>mix(c,'#ffffff',.1))); celPath(o,'M34 37 L28 56 L32 58 L38 41 Z',C.map(c=>mix(c,'#000000',.15)));
  [[18,48],[18,58],[38,48],[38,58]].forEach(p=>{ o.p(p[0],p[1],'#e8d6a8'); });
  celPath(o,'M15 38 C11 50 11 64 12 78 L18 78 C18 66 19 52 21 42 Z',C); celPath(o,'M41 38 C45 50 45 64 44 78 L38 78 C38 66 37 52 35 42 Z',C);
  o.r(12,77,6,2,WH[2]); o.r(38,77,6,2,WH[2]);
  celPath(o,'M12 79 L18 79 L18 83 C17 86 13 86 12 83 Z',SK); celPath(o,'M38 79 L44 79 L44 83 C43 86 39 86 38 83 Z',SK);
  o.p(14,82,'#2a3a6a'); o.p(15,83,'#2a3a6a'); o.p(16,81,'#3e5290'); o.p(41,83,'#2a3a6a');   // 잉크 자국
  o.r(25,28,6,6,SK[2]); o.r(29,28,2,6,SK[1]);
  // 머리: 아델라인 얼굴 지도에서 옆머리·윤곽선을 걷어 내고 짧게
  const pal=Object.assign({},ADE_PAL,{h:'#9a7a4a',H:'#c8a46a',L:'#e4c890',W:'#f6e2b4',b:'#3e5a3a',B:'#6a8a5a',c:'#a8c890',r:'#f2b8aa'});
  const rows=ADE_HEAD.slice(); const ex=ADE_EXPR[expr]; if(ex) for(const k in ex) rows[k]=ex[k];
  rows[21]=rows[21].replace(/rr/g,'SS');
  const face=/[SsKebBcwrm]/;
  const out=rows.map((row,j)=>{ let r=row.replace(/O/g,'.'); if(j<16) return r;
    const a=r.search(face); let z=-1; for(let i=r.length-1;i>=0;i--) if(face.test(r[i])){ z=i; break; }
    return r.split('').map((ch,i)=>(i<a||i>z)?'.':ch).join(''); });
  // 귀 옆은 짧게: 16행 이전에도 너무 넓은 옆머리를 한 칸씩 깎는다
  for(let j=12;j<16;j++) out[j]='..'+out[j].slice(2,26)+'..';
  // 앞머리 한 갈래를 이마 오른쪽으로 내린다
  out[10]=out[10].slice(0,15)+'HHhh'+out[10].slice(19); out[11]=out[11].slice(0,16)+'Hh'+out[11].slice(18);
  stampMap(o,out,14,0,pal);
  outlinePass(o);
  return {c:o.c,feet:fy};
}
