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
  // 엄격하지만 다정한 얼굴: 곧은 눈썹은 그대로, 입꼬리만 살짝 올린다
  if(cfg.kind&&(!expr||expr==='neutral')){ rows[9]="sSSSSSSmSSSSmSSSSsss"; rows[10]="sSSSSSSSmmmmSSSSSsss"; }
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
 holt:{hs:'bun',hair:['#3a2a20','#4e3828','#6a5240','#86705a'],eye:['#4a3428','#8a6448'],kind:true,
   dress:['#2e2e38','#45454f','#5e5e6a','#7a7a86','#9898a4'],trim:['#a9a3b0','#d6d1da','#eeeaf0','#ffffff'],belt:['#2e2e38','#45454f','#5e5e6a'],highneck:true,patch:'#72707e',feet:128},
 marta:{hs:'bun',hair:['#6e665e','#8e867c','#b0a89e','#cec6bc'],eye:['#4a3a2a','#7a6248'],gray:true,round:true,blush:true,
   dress:['#3e2a1e','#5a3e2a','#7a5638','#9a6e4a','#b88c64'],trim:['#b9ad9a','#ddd3c0','#f3ecdc','#fffaf0'],belt:['#b9ad9a','#ddd3c0','#f3ecdc'],apron:true,rolled:true,wide:3,feet:126}
};
function femSprite(id,expr){ const cfg=FEM_FIG[id]; const o=PX(56,132); femBody(o,cfg); femHead(o,15,5,cfg,expr); outlinePass(o); return {c:o.c,feet:cfg.feet}; }
// ── 소년들: 아이 얼굴 지도(아델라인 것) + 짧은 머리, 외투. 아드리안·카일런·율리안·리오넬
const BOY_FIG={
 adrian:{hair:['#9a7a4a','#c8a46a','#e4c890','#f6e2b4'],eye:['#3e5a3a','#6a8a5a','#a8c890'],lock:'r',
   coat:['#3e5468','#56708a','#7290aa','#8eaac2','#b0c8da'],vest:['#8a7a5a','#a8987a','#c4b494','#dccdb0'],pants:['#3a3434','#4e4848','#625c5c','#7a7474'],boots:['#2a1e18','#3e2e24','#56402e','#6e5640'],btn:'#e8d6a8',ink:true,map:true},
 kylen:{hair:['#141822','#222836','#343c50','#4a5470'],eye:['#3a5a8a','#7a9ac0','#c0d8f0'],lock:'l',tuft:true,
   coat:['#1a2234','#26304a','#344262','#46587e','#5a6e96'],vest:['#26304a','#344262','#46587e','#5a6e96'],pants:['#181c26','#22283a','#2e3448','#3c4458'],boots:['#141218','#221e28','#34303c','#4a4452'],btn:'#b8c0d0',fur:['#8a8a94','#b4b4bc','#d6d6dc','#f0f0f4'],gloves:['#2a2024','#3e3034','#56444a','#6e5a60'],face:'kylen',skin:'#f8e2d6'},
 julian:{hair:['#8a6430','#b08a58','#d6b47c','#f2dcaa'],eye:['#3a5a8a','#6a8ab0','#b0c8e8'],lock:'l',
   coat:['#a8a094','#cfc6ba','#e6dfd6','#f4efe8','#ffffff'],vest:['#a08850','#c0a868','#d8c08a','#ecd8a8'],pants:['#8e8678','#aaa294','#c4bcae','#dcd4c6'],boots:['#2a1e18','#3e2e24','#56402e','#6e5640'],btn:'#d9b24a',epaulet:['#8a6a20','#c09030','#d9b24a','#f0d878'],sash:['#2e3e78','#40549a','#5a70b8'],face:'julian',clasp:true,wavy:true},
 lionel:{hair:['#1e1412','#2e201c','#3e2c26','#5a4038'],eye:['#5a3e24','#8a643e','#c8a070'],lock:'none',
   coat:['#1a4440','#245a56','#34807a','#4a9c94','#6ab8ae'],vest:['#8a6a20','#c09030','#d9b24a','#f0d878'],pants:['#1e2a2c','#2a3a3c','#384a4c','#4a5e60'],boots:['#2a1e18','#3e2e24','#56402e','#6e5640'],btn:'#d9b24a',trim:'#d9b24a',face:'lionel',chain:true}
,
 sebastian:{hair:['#5e4c3e','#8a7662','#ac9884','#cdbcaa'],eye:['#3a4a7a','#5a6a9a','#a8b4d8'],lock:'r',face:'sebastian',glasses:'#8a6a3a',
   coat:['#2e3260','#40467e','#5a609e','#7278b8','#9096cc'],vest:['#40467e','#5a609e','#7278b8','#9096cc'],pants:['#2e3260','#40467e','#5a609e','#7278b8'],boots:['#2a2236','#3a3048','#4e4460','#62587a'],btn:'#d9b24a',robe:true,trim2:['#8a6a20','#c09030','#d9b24a'],book:['#4a2a3a','#6a3a50','#8a4e66','#a86680']},
 hadel:{hair:['#121014','#1e1a1e','#2e282c','#4a4246'],eye:['#3a5a2e','#5a7a4a','#a0c088'],lock:'none',tuft:true,face:'hadel',ears:true,skin:'#f2c8ae',
   coat:['#4a3220','#6a4a30','#8a6844','#a8865e','#c4a47c'],vest:['#9a9a9e','#b8b8bc','#d4d4d8','#ececf0'],pants:['#2e2a26','#423c36','#5a524a','#72685e'],boots:['#2a1e18','#3e2e24','#56402e','#6e5640'],btn:'#c0c4cc',belt:['#2a1e18','#3e2e24','#56402e'],sword:true,pauldron:true}
};
// 얼굴 차이: 눈(16~20행, 두 눈 같은 무늬), 눈썹(13~15행), 입(23~25행)
function eyeRows(rows,m){ for(const j in m){ const r=rows[j].split(''); for(let i=0;i<5;i++){ r[6+i]=m[j][i]; r[16+i]=m[j][i]; } rows[j]=r.join(''); } }
function setAt(rows,j,col,str){ rows[j]=rows[j].slice(0,col)+str+rows[j].slice(col+str.length); }
function boyFace(rows,who,expr){
  const closed=expr==='smile';
  if(who==='kylen'){   // 가늘고 낮은 눈, 곧은 눈썹, 다문 입
    if(!closed) eyeRows(rows,{16:'SSSSS',17:'eeeee',18:'bwBBb',19:'bBcBb',20:'sbbbs'});
    else eyeRows(rows,{16:'SSSSS',17:'SSSSS',18:'eeeee',19:'SSSSS',20:'SSSSS'});
    if(expr==='neutral'||expr==='smile'){ setAt(rows,13,5,'SSSSSSSSSSSSSSSSS'); setAt(rows,14,5,'SSSSSSSSSSSSSSSSSS'); setAt(rows,15,6,'hhhhh'); setAt(rows,15,16,'hhhhh'); }
    if(expr==='neutral') setAt(rows,24,12,'mmm');
    if(expr==='smile'){ setAt(rows,24,10,'SSSSSSSS'); setAt(rows,25,12,'mmm'); setAt(rows,24,11,'m'); }
  }
  if(who==='julian'){  // 높은 눈썹, 늘 웃는 듯한 입
    if(expr==='neutral'){ setAt(rows,24,11,'SmSSmS'); setAt(rows,25,12,'mmm'); }
  }
  if(who==='lionel'){  // 무거운 눈꺼풀, 한쪽 눈썹·입꼬리
    if(!closed&&expr!=='surprise') eyeRows(rows,{16:'eeeee',17:'eeeee',18:'bwBBb',19:'bBcBb',20:'sbbbs'});
    if(expr==='neutral'||expr==='smile'){ setAt(rows,14,5,'SSSSSSSSSSSSSSSSSS'); setAt(rows,14,6,'hhhh'); setAt(rows,13,17,'hhhh'); }
    if(expr==='neutral'){ setAt(rows,24,12,'mmm'); setAt(rows,23,15,'m'); }
  }
}
function boyFace2(rows,who,expr){
  if(who==='sebastian'){ // 차분한 반쯤 감긴 눈, 작은 입
    if(expr!=='smile'&&expr!=='surprise') eyeRows(rows,{16:'SSSSS',17:'eeeee',18:'bwBBb',19:'bBcBb',20:'sbbbs'});
    if(expr==='neutral') setAt(rows,24,12,'SmS');
  }
  if(who==='hadel'){   // 굵고 곧은 눈썹, 시원하게 웃는 입
    if(expr==='neutral'||expr==='smile'){ setAt(rows,13,5,'SSSSSSSSSSSSSSSSS'); setAt(rows,14,5,'Shhhhh'); setAt(rows,14,16,'hhhhhS'); setAt(rows,15,5,'Shhhhh'); setAt(rows,15,16,'hhhhhS'); }
    if(expr==='neutral'){ setAt(rows,24,11,'SmmmmS'); }
    if(expr==='smile'){ setAt(rows,24,10,'SmmmmmmS'); setAt(rows,25,11,'SmmmmS'); }
  }
}
function boySprite(id,expr){
  const f=BOY_FIG[id]; const o=PX(56,132); const SK=['#c98a78','#e2a892','#f5d2bd','#fde8d8'], WH=['#a9a3b0','#d6d1da','#f2eff4','#ffffff'];
  const C=f.coat, PT=f.pants, fy=124, BT=f.boots;
  celPath(o,`M20 84 L27 84 L27 ${fy-6} L20 ${fy-6} Z`,PT); celPath(o,`M29 84 L36 84 L36 ${fy-6} L29 ${fy-6} Z`,PT);
  celPath(o,`M18 ${fy-8} L27 ${fy-8} L27 ${fy} L16 ${fy} C16 ${fy-3} 17 ${fy-6} 18 ${fy-8} Z`,BT); celPath(o,`M29 ${fy-8} L38 ${fy-8} C39 ${fy-6} 40 ${fy-3} 40 ${fy} L29 ${fy} Z`,BT);
  if(f.robe) celPath(o,'M15 38 C20 34 36 34 41 38 L43 70 L47 119 L9 119 L13 70 Z',C);
  else celPath(o,'M15 38 C20 34 36 34 41 38 L40 66 L42 88 L31 88 L28 72 L25 88 L14 88 L16 66 Z',C);
  if(f.robe){ o.r(9,117,39,2,f.trim2[1]); o.r(9,117,39,1,f.trim2[2]); o.line(28,62,28,116,f.trim2[1]); o.line(27,62,27,116,C[1]); for(let y=70;y<114;y+=8) o.p(28,y,f.trim2[2]); }
  if(f.belt){ o.r(15,64,26,4,f.belt[1]); o.r(15,64,26,1,f.belt[2]); o.r(15,67,26,1,f.belt[0]); o.r(26,64,4,4,'#d9b24a'); o.r(27,65,2,2,f.belt[1]); }
  if(f.trim){ o.line(16,66,14,88,f.trim); o.line(40,66,42,88,f.trim); o.r(14,88,11,1,f.trim); o.r(31,88,12,1,f.trim); }
  celPath(o,'M24 38 L32 38 L32 60 L28 63 L24 60 Z',f.vest);
  [46,52,58].forEach(yy=>{ o.p(28,yy,'#f4eac8'); o.p(28,yy+1,'#8a7040'); });
  celPath(o,'M24 32 L32 32 L33 40 L28 45 L23 40 Z',WH); celPath(o,'M25 35 L31 35 L30 40 L28 45 L26 40 Z',WH);
  celPath(o,'M22 37 L28 56 L24 58 L18 41 Z',C.map(c=>mix(c,'#ffffff',.1))); celPath(o,'M34 37 L28 56 L32 58 L38 41 Z',C.map(c=>mix(c,'#000000',.15)));
  [[18,48],[18,58],[38,48],[38,58]].forEach(p=>o.p(p[0],p[1],f.btn));
  if(f.sash){ for(let k=0;k<17;k++){ const x=22+Math.round(k*.75), y=38+k; o.p(x,y,f.sash[1]); o.p(x+1,y,f.sash[2]); o.p(x+2,y,f.sash[1]); o.p(x+3,y,f.sash[0]); } }
  if(f.clasp){ celPath(o,'M15 38 C11 46 12 56 22 63 L26 61 C21 56 19 50 20 41 Z',C); celPath(o,'M41 38 C45 46 44 56 34 63 L30 61 C35 56 37 50 36 41 Z',C); }
  else { celPath(o,'M15 38 C11 50 11 64 12 78 L18 78 C18 66 19 52 21 42 Z',C); celPath(o,'M41 38 C45 50 45 64 44 78 L38 78 C38 66 37 52 35 42 Z',C); }
  if(f.epaulet){ celPath(o,'M12 37 C14 34 19 34 21 37 L20 40 L13 40 Z',f.epaulet); celPath(o,'M44 37 C42 34 37 34 35 37 L36 40 L43 40 Z',f.epaulet);
    [13,15,17,19].forEach(x=>{ o.p(x,41,f.epaulet[2]); o.p(56-x,41,f.epaulet[2]); }); }
  if(f.fur){ celPath(o,'M11 42 C12 32 21 29 28 31 C35 29 44 32 45 42 C41 46 36 45 34 42 L28 47 L22 42 C20 45 15 46 11 42 Z',f.fur); o.r(11,74,8,4,f.fur[2]); o.r(37,74,8,4,f.fur[2]); o.r(11,77,8,1,f.fur[1]); o.r(37,77,8,1,f.fur[1]);
    [[16,38],[20,36],[24,35],[32,35],[36,36],[40,38]].forEach(p=>{ o.p(p[0],p[1],f.fur[3]); o.p(p[0]+1,p[1]+1,f.fur[1]); }); }
  if(f.clasp){ o.r(19,60,5,3,C[1]); o.r(32,60,5,3,C[1]);
    celPath(o,'M23 61 C25 59 31 59 33 61 C33 65 30 67 28 67 C26 67 23 65 23 61 Z',WH); o.p(28,62,WH[0]); o.p(28,63,WH[0]); o.p(30,61,WH[1]); }
  else if(f.gloves){ o.r(12,76,6,3,C[1]); o.r(38,76,6,3,C[1]); celPath(o,'M12 78 L18 78 L18 83 C17 86 13 86 12 83 Z',f.gloves); celPath(o,'M38 78 L44 78 L44 83 C43 86 39 86 38 83 Z',f.gloves); }
  else { o.r(12,77,6,2,WH[2]); o.r(38,77,6,2,WH[2]);
    celPath(o,'M12 79 L18 79 L18 83 C17 86 13 86 12 83 Z',SK); celPath(o,'M38 79 L44 79 L44 83 C43 86 39 86 38 83 Z',SK); }
  if(f.sword){ celPath(o,'M45 66 L48 65 L53 104 L50 105 Z',['#2a1e18','#3e2e24','#56402e','#6e5640']); o.p(51,104,'#c0c4cc'); o.p(52,103,'#c0c4cc');
    o.r(44,63,6,2,'#c0c4cc'); o.r(44,63,6,1,'#ececf0'); o.r(46,58,2,5,'#6e5640'); o.p(46,59,'#8a6e50'); o.r(45,56,4,2,'#d9b24a'); }
  if(f.pauldron){ celPath(o,'M10 40 C11 33 18 32 22 36 L21 43 C17 45 12 44 10 40 Z',['#5e5e66','#8a8a94','#b8b8c4','#e0e0e8']); o.p(14,38,'#ffffff'); o.r(12,43,8,1,'#6a4a30'); }
  if(f.book){ celPath(o,'M8 70 L18 68 L19 84 L9 86 Z',f.book); o.line(9,85,18,83,'#f3ecdc'); o.line(9,84,18,82,'#ddd3c0'); o.r(12,74,4,4,'#d9b24a'); }
  if(f.chain){ [[25,49],[24,50],[23,51],[22,52],[22,53],[23,54]].forEach(p=>o.p(p[0],p[1],'#f0d878')); o.r(21,54,3,3,'#d9b24a'); o.p(21,54,'#f8ecb0'); }
  if(f.map){ celPath(o,'M9 66 L15 64 L19 92 L13 94 Z',['#a89878','#cfc0a0','#e8dcc0','#f8f0dc']); o.ell(16,93,3,1,'#8a7a5a'); o.line(11,72,13,86,'#c45a46'); o.line(14,70,16,88,'#5a7ab8'); }
  if(f.ink){ o.p(14,82,'#2a3a6a'); o.p(15,83,'#2a3a6a'); o.p(16,81,'#3e5290'); o.p(41,83,'#2a3a6a'); }   // 잉크 자국
  o.r(25,28,6,6,SK[2]); o.r(29,28,2,6,SK[1]);
  // 머리: 아델라인 얼굴 지도에서 옆머리·윤곽선을 걷어 내고 짧게
  const pal=Object.assign({},ADE_PAL,{h:f.hair[0],H:f.hair[1],L:f.hair[2],W:f.hair[3],b:f.eye[0],B:f.eye[1],c:f.eye[2],r:'#f2b8aa'}); if(f.skin) pal.S=f.skin;
  const rows=ADE_HEAD.slice(); const ex=ADE_EXPR[expr]; if(ex) for(const k in ex) rows[k]=ex[k];
  rows[21]=rows[21].replace(/rr/g,'SS');
  if(f.face){ boyFace(rows,f.face,expr||'neutral'); boyFace2(rows,f.face,expr||'neutral'); }
  const face=/[SsKebBcwrm]/;
  const out=rows.map((row,j)=>{ let r=row.replace(/O/g,'.'); if(j<16) return r;
    const a=r.search(face); let z=-1; for(let i=r.length-1;i>=0;i--) if(face.test(r[i])){ z=i; break; }
    return r.split('').map((ch,i)=>(i<a||i>z)?'.':ch).join(''); });
  for(let j=12;j<16;j++) out[j]='..'+out[j].slice(2,26)+'..';
  // 앞머리 한 갈래
  if(f.lock==='r'){ out[10]=out[10].slice(0,15)+'HHhh'+out[10].slice(19); out[11]=out[11].slice(0,16)+'Hh'+out[11].slice(18); }
  if(f.lock==='l'){ out[10]=out[10].slice(0,8)+'hHHH'+out[10].slice(12); out[11]=out[11].slice(0,9)+'hH'+out[11].slice(11); }
  if(f.wavy){
    for(let j=13;j<26;j++){ const r=out[j].split(''); const a=r.findIndex(c=>c!=='.'); let z=r.length-1; while(z>0&&r[z]==='.') z--;
      const w=((j>>1)%2)?2:3; const L=Math.max(0,a-w), Z=Math.min(r.length-1,z+w);
      for(let i=L;i<a;i++) r[i]=(i===L)?'h':((j%4===1)?'L':'H'); for(let i=z+1;i<=Z;i++) r[i]=(i===Z)?'h':((j%4===3)?'L':'H');
      if(j>=24){ for(let i=0;i<r.length;i++) if(r[i]==='H'||r[i]==='L') r[i]='h'; }
      out[j]=r.join(''); }
    const put=(j,i,c)=>{ const r=out[j]; if(/[HLh]/.test(r[i])) out[j]=r.slice(0,i)+c+r.slice(i+1); };
    [[3,9],[5,16],[7,6]].forEach(w=>{ const j=w[0],i=w[1]; put(j,i,'L'); put(j,i+1,'L'); put(j+1,i-1,'L'); put(j+1,i+2,'L'); put(j+1,i,'h'); put(j+1,i+1,'h'); });
    out[10]=out[10].slice(0,7)+'hHh'+out[10].slice(10); out[11]=out[11].slice(0,7)+'.hH'+out[11].slice(10);
  }
  stampMap(o,out,14,0,pal);
  if(f.glasses){ const G=f.glasses; [[19,15],[29,15]].forEach(g=>{ const x=g[0],y=g[1]; o.r(x+1,y,5,1,G); o.r(x+1,y+6,5,1,G); o.r(x,y+1,1,5,G); o.r(x+6,y+1,1,5,G); o.p(x+5,y+1,'#ffffff'); }); o.r(26,17,3,1,G); }
  if(f.ears){ const E=(expr==='surprise'||expr==='worry')?'#e0605a':'#ee9a8c'; [17,18,19].forEach(y=>{ o.p(17,y,E); o.p(38,y,E); }); o.p(17,20,'#dd8a7a'); o.p(38,20,'#dd8a7a'); }
  if(f.tuft){ [[19,1],[22,0],[33,1],[36,2]].forEach(p=>{ o.p(p[0],p[1],f.hair[1]); o.p(p[0]+1,p[1],f.hair[0]); }); }
  outlinePass(o);
  return {c:o.c,feet:fy};
}
function adrianSprite(expr){ return boySprite('adrian',expr); }
// ── 소녀들: 아델라인 몸·얼굴 지도를 색만 바꿔 쓰고, 땋은 머리 대신 늘어뜨린 긴 머리. 로잘리(세레나도 여기로)
const GIRL_FIG={
 rosalie:{hair:['#6a2a14','#8a3e1e','#cc7a44','#e8a070','#f6c8a0'],eye:['#2e6a5e','#6aa89a','#b0e0d4'],face:'rosalie',
   dress:['#7a3a4e','#a85a72','#d890a2','#eab0be','#f8d0da'],lace:['#b9ad9a','#ddd3c0','#f3ecdc','#fffaf0'],sash:['#2e6a5e','#4a8a7c','#6aa89a','#8ac4b6'],notebook:true,pin:true},
 serena:{hair:['#8a6a30','#c8a458','#e8c880','#f4dca8','#fff2d0'],eye:['#4a3a7a','#8a7ab0','#c8bce8'],face:'serena',
   dress:['#9a90a8','#c4bccc','#e4dee8','#f4efea','#ffffff'],lace:['#a89ab8','#c9b8e0','#e4d8f0','#f6f0fc'],sash:['#5a4a8a','#7a6aa8','#a090c8','#c9b8e0'],ribbon:true}
};
function girlSprite(id,expr){
  const f=GIRL_FIG[id]; const o=PX(56,132); const R=(x,y,w,h,c)=>o.r(x,y,w,h,c);
  const DR=f.dress, LC=f.lace, HR=f.hair, SK=['#c98a78','#e2a892','#f7d5c0','#fde8d8'], SA=f.sash;
  // 뒷머리: 허리 아래까지 늘어뜨림, 끝은 물결
  celPath(o,'M13 20 C10 40 9 66 10 86 C13 89 16 86 19 89 C22 86 25 89 28 87 C31 89 34 86 37 89 C40 86 43 89 46 86 C47 66 46 40 43 20 Z',HR);
  [[14,40,13,84],[19,44,19,86],[37,44,37,86],[42,40,43,84]].forEach(l=>o.line(l[0],l[1],l[2],l[3],HR[3]));
  const sk=celPath(o,'M20 60 C16 78 10 102 5 124 L51 124 C46 102 40 78 36 60 Z',DR);
  [[24,62,19,123],[28,62,28,123],[32,62,38,123],[22,66,11,122],[34,66,45,122]].forEach(l=>{ o.line(l[0],l[1],l[2],l[3],DR[1]); o.line(l[0]-1,l[1]+2,l[2]-1,l[3],DR[3]); });
  for(let X=6;X<51;X++){ const y=121+((X%6)<3?0:1); R(X,y,1,124-y,LC[2]); o.p(X,124,LC[0]); if(X%6===1) o.p(X,120,LC[3]); }
  R(16,125,9,3,'#5a3a2a'); R(31,125,9,3,'#5a3a2a'); R(17,125,6,1,'#7a5a44'); R(32,125,6,1,'#7a5a44');
  celPath(o,'M19 38 C22 36 34 36 37 38 L36 60 L20 60 Z',DR);
  R(27,40,2,18,DR[1]); R(26,40,1,18,DR[3]);
  R(20,57,16,4,SA[2]); R(20,57,16,1,SA[3]); R(20,60,16,1,SA[0]);
  celPath(o,'M30 57 C35 55 37 60 35 64 L32 62 Z',SA); celPath(o,'M26 57 C21 55 19 60 21 64 L24 62 Z',SA);
  celPath(o,'M13 44 C11 37 18 34 23 38 L22 46 C19 47 15 47 13 44 Z',DR); celPath(o,'M43 44 C45 37 38 34 33 38 L34 46 C37 47 41 47 43 44 Z',DR);
  celPath(o,'M14 44 C13 52 16 60 22 64 L26 62 C22 58 20 52 20 45 Z',DR); celPath(o,'M42 44 C43 52 40 60 34 64 L30 62 C34 58 36 52 36 45 Z',DR);
  R(19,61,5,3,LC[2]); R(32,61,5,3,LC[2]);
  if(f.notebook){ celPath(o,'M22 56 L33 55 L34 66 L23 67 Z',['#6a3a2a','#8a5038','#a86a4a','#c48a64']); R(24,57,8,8,LC[3]); for(let y=58;y<64;y+=2) o.line(25,y,30,y,LC[1]); o.line(33,52,30,60,'#d9b24a'); o.p(30,60,'#3a2a22'); }
  celPath(o,'M23 63 C25 61 31 61 33 63 C33 67 30 69 28 69 C26 69 23 67 23 63 Z',SK);
  R(25,30,6,7,SK[2]); R(29,30,2,7,SK[1]); R(25,30,6,1,SK[1]);
  celPath(o,'M20 37 C23 34 33 34 36 37 L33 42 C30 43 26 43 23 42 Z',LC);
  o.p(28,41,SA[2]); o.p(27,41,SA[1]); o.p(29,41,SA[1]);
  outlinePass(o);
  const pal=Object.assign({},ADE_PAL,{h:HR[1],H:HR[2],L:HR[3],W:HR[4],b:f.eye[0],B:f.eye[1],c:f.eye[2]});
  const rows=ADE_HEAD.slice(); const ex=ADE_EXPR[expr]; if(ex) for(const k in ex) rows[k]=ex[k];
  if(f.face==='rosalie'){ // 생기 있는 얼굴: 살짝 벌린 웃는 입, 올라간 눈썹
    if(!expr||expr==='neutral'){ setAt(rows,24,12,'mmmm'); setAt(rows,25,13,'mm'); setAt(rows,23,11,'m'); setAt(rows,23,16,'m'); }
    if(expr==='smile'){ setAt(rows,24,11,'mmmmmm'); setAt(rows,25,12,'mmmm'); }
  }
  if(f.face==='serena'){ // 반쯤 내리뜬 눈, 다문 입: 완벽하고 조금 차가운
    if(expr!=='smile'&&expr!=='surprise') eyeRows(rows,{16:'SSSSS',17:'eeeee',18:'bwBBb',19:'bBcBb',20:'sbbbs'});
    if(!expr||expr==='neutral') setAt(rows,24,12,'mm');
  }
  stampMap(o,rows,14,2,pal);
  if(f.pin){ R(36,9,3,2,SA[2]); o.p(36,9,SA[3]); o.p(38,10,SA[0]); }   // 앞머리 옆 작은 머리핀
  if(f.ribbon){ // 하얀 리본 (머리 위 오른쪽, 나비 모양)
    const RB=['#9a94a8','#c4bed0','#ece8f2','#ffffff'];
    celPath(o,'M33 9 L37 8 L35 13 L33 15 Z',RB); celPath(o,'M40 9 L44 8 L43 15 L41 13 Z',RB);
    celPath(o,'M38 7 C34 1 28 2 29 7 C30 11 35 11 38 8 Z',RB); celPath(o,'M39 7 C43 1 49 2 48 7 C47 11 42 11 39 8 Z',RB);
    o.r(37,6,3,3,RB[1]); o.p(38,7,RB[0]); o.p(31,5,RB[3]); o.p(45,4,RB[3]); }
  return {c:o.c,feet:128};
}
// ── 어른 남자 추가: 그레고르 대공(수염, 털 망토, 큰 키), 발트하임 백작(회색 머리, 지친 눈, 모자를 든 손)
const MALE2={
 gregor:{type:'m',hs:'short',hair:['#2e2218','#3e2e20','#52402e','#6e5842'],eye:['#3a4a5a','#7a8a9a'],coat:['#22262e','#2e333e','#3e4452','#525a6a'],vest:['#4a3a2e','#5e4a3a','#7a6250','#947a66'],pants:['#1a1c22','#24272e','#2e323a','#3c414a'],cravat:false,long:true,feet:131,beard:true,mantle:['#2a2026','#3a2c34','#4e3c46','#62505a'],fur:['#6e665e','#958b80','#bdb2a6','#e0d8ce']},
 count:{type:'m',hs:'swept',hair:['#5a5a64','#7a7a84','#9a9aa2','#c4c4cc'],eye:['#4a4a5a','#6a6a7a'],coat:['#2a2a38','#363646','#464658','#525266'],vest:['#5a5060','#6e6476','#867c8e','#a094a8'],pants:['#20202a','#2a2a36','#363644','#444452'],cravat:true,feet:128,tired:true,cane:true}
};
const BEARD=["HH................HH","HHH..............HHH","HHH...hHHHHHHh...HHH","HHHH............HHHH","HHHHHH........HHHHHH","HHHHHHHHHHHHHHHHHHHH",".HHLHHHHHHHHHHHLHHH.","..HHHHHHHHHHHHHHHH..","....hhHHHHHHHHhh...."];
function adultMale(id,expr){
  const cfg=MALE2[id]; const o=PX(56,132);
  if(cfg.mantle) celPath(o,'M10 34 C16 30 40 30 46 34 L52 122 L4 122 Z',cfg.mantle);
  maleBody(o,cfg);
  if(cfg.cane){ o.line(8,92,5,127,'#2a1e18'); o.line(9,92,6,127,'#4a3424'); o.r(7,85,4,3,'#c0c4cc'); o.p(7,85,'#ececf0'); o.r(5,127,2,1,'#c0c4cc'); }
  if(cfg.fur){ celPath(o,'M8 40 C9 30 20 27 28 29 C36 27 47 30 48 40 C44 45 38 44 35 40 L28 46 L21 40 C18 44 12 45 8 40 Z',cfg.fur);
    [[12,36],[17,33],[23,32],[33,32],[39,33],[44,36]].forEach(p=>{ o.p(p[0],p[1],cfg.fur[3]); o.p(p[0]+1,p[1]+1,cfg.fur[1]); }); o.r(26,40,4,3,'#c09030'); o.p(27,41,'#f0d878'); }
  maleHead(o,15,3,cfg,expr);
  const x=15,y=3, pal={H:cfg.hair[2],L:cfg.hair[3],h:cfg.hair[1]};
  if(cfg.beard) BEARD.forEach((r,k)=>{ const j=7+k+(cfg.long&&7+k>=9?1:0); stampMap(o,['...'+r],x,y+10+j,pal); });
  if(cfg.tired){ [[6,7],[7,7],[8,7],[15,7],[16,7],[17,7]].forEach(p=>o.p(x+p[0],y+10+p[1],'#d8a898')); }
  outlinePass(o); return {c:o.c,feet:cfg.feet};
}
// ── 아이 키 줄이기: 머리 크기는 그대로, [y0,y1) 사이(다리·치마)에서 n줄을 고르게 빼고 윗부분을 내린다. 발 위치(feet)는 그대로.
function shrinkKid(s,y0,y1,n){
  const W=s.c.width,H=s.c.height, o=PX(W,H); const drop=new Set(); for(let k=0;k<n;k++) drop.add(Math.floor(y0+(k+.5)*(y1-y0)/n));
  let ty=H-1; for(let y=H-1;y>=0;y--){ if(drop.has(y)) continue; o.x.drawImage(s.c,0,y,W,1,0,ty,W,1); ty--; }
  return {c:o.c,feet:s.feet};
}
const KID={adeline:[62,120,18],adrian:[64,116,18],kylen:[64,116,16],julian:[64,116,18],lionel:[64,116,18],sebastian:[64,116,20],hadel:[64,116,14],rosalie:[62,120,18],serena:[62,120,18],tangie:[62,110,10]};
function kid(id,s){ const k=KID[id]; return k?shrinkKid(s,k[0],k[1],k[2]):s; }
