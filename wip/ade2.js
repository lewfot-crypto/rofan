// 아델라인 새 스프라이트 (56x132). 머리는 점 지도로 직접, 몸은 셀 음영 도형.
const ADE_PAL={
  O:'#3b2a40', h:'#8a8fa8', H:'#c3c7d8', L:'#e4e7f0', W:'#ffffff',
  s:'#e2a892', S:'#f7d5c0', K:'#fde8d8', e:'#2c1f33', b:'#3d4f8e', B:'#6c84c8', c:'#b2c6f0', w:'#ffffff',
  r:'#f3a9a6', m:'#c45a66', R:'#4f6fb4', T:'#7d98d8'
};
const ADE_HEAD=[
"..........OOOOOOOO..........",
"........OOLLLLLLHHOO........",
"......OOLWWLLLLHHHHHOO......",
".....OLLWWLLLLHHHHHHHhO.....",
"....OLLWLLLLLHHHHHHHHHhO....",
"...OLLLLLLLHHHHHHHHHHHhhO...",
"...OLLLLLHHHHHHHHHHHHHHhO...",
"..OHLLLLHHHHHHHHHHHHHHHhhO..",
"..OHLLLHHHHhHHHHHHhHHHHHhO..",
"..OHLLHHHhhHHHHHHhhHHHHHhO..",
"..OHLHHHhKShHHHHhSShHHHHhO..",
".OHHLHHhKSSShHHhSSSShHHHhhO.",
".OHHHHhKSSSSShhSSSSSShHHHhO.",
".OHHHhSSSSSSSSSSSSSSSShHHhO.",
".OHHHSShhhhSSSSSShhhhSShHhO.",
".OHHhSSSSSSSSSSSSSSSSSShHhO.",
".OHHSSeeeeeSSSSSeeeeeSSsHhO.",
".OHhSSwwbbbSSSSSwwbbbSSsHhO.",
".OHhSSbwBBbSSSSSbwBBbSSsHhO.",
".OHhSSbBcBbSSSSSbBcBbSSsHhO.",
".OHhSSsbbbsSSSSSsbbbsSSsHhO.",
".OHhSrrSSSSSSSSSSSSSSrrsHhO.",
".OHhSSSSSSSSSSsSSSSSSSssHhO.",
".OHhhSSSSSSSSSSSSSSSSSshhhO.",
"..OHhSSSSSSSSmmSSSSSSSshhO..",
"..OHhsSSSSSSSSSSSSSSSsshhO..",
"..OHh.sSSSSSSSSSSSSSssO.hO..",
"..OHh..ssSSSSSSSSSsssO..hO..",
"..OHh...OssssssssssO...hO...",
"..OHh....OOOOOOOOOO....hO...",
];
const ADE_EXPR={
  smile:{16:".OHHSSSSSSSSSSSSSSSSSSsHhO.",17:".OHhSSeSSSeSSSSSeSSSeSSsHhO.",18:".OHhSSSeeeSSSSSSSeeeSSSsHhO.",19:".OHhSSSSSSSSSSSSSSSSSSSsHhO.",20:".OHhSSSSSSSSSSSSSSSSSSSsHhO.",24:"..OHhSSSSSSSmSSmSSSSSSshhO..",25:"..OHhsSSSSSSSmmSSSSSSsshhO.."},
  sad:{14:".OHHHSSSShhSSSSSShhSSSSHhO.",13:".OHHHhSShhSSSSSSSShhSShHHhO.",24:"..OHhSSSSSSSSmmSSSSSSSshhO..",25:"..OHhsSSSSSSSSSSSSSSSsshhO.."},
  worry:{14:".OHHHSSSShhSSSSSShhSSSSHhO.",13:".OHHHhSShhSSSSSSSShhSShHHhO.",24:"..OHhSSSSSSSSmmmSSSSSSshhO.."},
  surprise:{14:".OHHHShhhhSSSSSSShhhhShHhO.",13:".OHHHhSSSSSSSSSSSSSSSShHHhO.",24:"..OHhSSSSSSSSmmSSSSSSSshhO..",25:"..OHhsSSSSSSSmmSSSSSSsshhO.."}
};
function adeSprite(expr){
  const o=PX(56,132); const R=(x,y,w,h,c)=>o.r(x,y,w,h,c);
  const poly=(pts,rp,opt)=>{ const m=o.mask(c=>{ c.beginPath(); pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])); c.closePath(); c.fill(); }); celShade(o,m,rp,opt); return m; };
  const path=(d,rp,opt)=>{ const m=o.mask(c=>c.fill(new Path2D(d))); celShade(o,m,rp,opt); return m; };
  const DR=['#1f2c55','#2d4278','#3c5a9a','#5577b8','#7896cf'];   // 드레스 파랑
  const LC=['#b9ad9a','#ddd3c0','#f3ecdc','#fffaf0'];             // 레이스
  const HR=['#6f7490','#8a8fa8','#c3c7d8','#e4e7f0','#ffffff'];   // 은발
  const SK=['#c98a78','#e2a892','#f7d5c0','#fde8d8'];
  // 뒷머리 (어깨까지)
  path('M14 20 C12 34 13 44 16 50 L40 50 C43 44 44 34 42 20 Z',HR);
  // 치마
  const sk=path('M20 60 C16 78 10 102 5 124 L51 124 C46 102 40 78 36 60 Z',DR);
  [[24,62,19,123],[28,62,28,123],[32,62,38,123],[22,66,11,122],[34,66,45,122]].forEach((l,k)=>{ o.line(l[0],l[1],l[2],l[3],DR[1]); o.line(l[0]-1,l[1]+2,l[2]-1,l[3],DR[3]); });
  for(let X=6;X<51;X++){ const y=121+((X%6)<3?0:1); R(X,y,1,124-y,LC[2]); o.p(X,124,LC[0]); if(X%6===1) o.p(X,120,LC[3]); }
  R(16,125,9,3,'#2a2236'); R(31,125,9,3,'#2a2236'); R(17,125,6,1,'#4a3e58'); R(32,125,6,1,'#4a3e58');
  // 몸통
  path('M19 38 C22 36 34 36 37 38 L36 60 L20 60 Z',DR);
  R(27,40,2,18,DR[1]); R(26,40,1,18,DR[3]);
  // 허리 리본
  R(20,57,16,4,'#d8c08a'); R(20,57,16,1,'#f0dca8'); R(20,60,16,1,'#a08850');
  // 퍼프 소매
  path('M13 44 C11 37 18 34 23 38 L22 46 C19 47 15 47 13 44 Z',DR); path('M43 44 C45 37 38 34 33 38 L34 46 C37 47 41 47 43 44 Z',DR);
  // 팔 (앞으로 모은 손)
  path('M14 44 C13 52 16 60 22 64 L26 62 C22 58 20 52 20 45 Z',DR); path('M42 44 C43 52 40 60 34 64 L30 62 C34 58 36 52 36 45 Z',DR);
  R(19,61,5,3,LC[2]); R(32,61,5,3,LC[2]);
  path('M23 61 C25 59 31 59 33 61 C33 65 30 67 28 67 C26 67 23 65 23 61 Z',SK);
  o.p(28,62,SK[1]); o.p(28,63,SK[1]); o.p(28,64,SK[1]);
  // 목 + 칼라
  R(25,30,6,7,SK[2]); R(29,30,2,7,SK[1]); R(25,30,6,1,SK[1]);
  path('M20 37 C23 34 33 34 36 37 L33 42 C30 43 26 43 23 42 Z',LC);
  o.p(28,41,'#7d98d8'); o.p(27,41,'#4f6fb4'); o.p(29,41,'#4f6fb4');
  // 외곽선 (머리 지도 그리기 전)
  outlinePass(o);
  // 머리(점 지도)
  const rows=ADE_HEAD.slice(); const ex=ADE_EXPR[expr]; if(ex) for(const k in ex) rows[k]=ex[k];
  rows.forEach((row,j)=>{ for(let i=0;i<row.length;i++){ const ch=row[i]; if(ch!=='.'&&ADE_PAL[ch]) o.p(14+i,2+j,ADE_PAL[ch]); } });
  // 땋은 머리 (점 지도, 왼쪽 어깨 앞으로)
  const st=(rows,x,y)=>rows.forEach((row,j)=>{ for(let i=0;i<row.length;i++){ const ch=row[i]; if(ch!=='.'&&ADE_PAL[ch]) o.p(x+i,y+j,ADE_PAL[ch]); } });
  const LA=["OLLLHHHhO","OLWLHHhhO",".OhHHhhO."], LB=["OHLLLHHhO","OhLWLHHhO",".OhhHHhO."];
  for(let i=0;i<15;i++){ const y=32+i*3, x=Math.round(18-i*.25); st(i%2?LB:LA,x-4,y); }
  st(["OO.......OO","OTOO...OOTO","OTRRO.ORRTO",".ORRROORRO.","OTRROOORRTO","OO..ORO..OO","....ORO...."],8,76);
  st(["..OHHHO..",".OLHHHhO.","OLLHHhhhO",".OHhOhhO.","..O..OO.."],9,83);
  // 머리 리본 (오른쪽 위)
  R(35,8,5,3,'#4f6fb4'); R(36,8,3,1,'#7d98d8'); o.p(40,10,'#3b2a40'); o.p(34,10,'#3b2a40');
  return {c:o.c,feet:128};
}
function outlinePass(o){
  const w=o.w,h=o.h; const img=o.x.getImageData(0,0,w,h); const d=img.data; const solid=(X,Y)=>X>=0&&Y>=0&&X<w&&Y<h&&d[(Y*w+X)*4+3]>10; const col=(X,Y)=>[d[(Y*w+X)*4],d[(Y*w+X)*4+1],d[(Y*w+X)*4+2]]; const add=[];
  for(let Y=0;Y<h;Y++) for(let X=0;X<w;X++){ if(solid(X,Y)) continue; let n=null; if(solid(X,Y+1)) n=col(X,Y+1); else if(solid(X+1,Y)) n=col(X+1,Y); else if(solid(X-1,Y)) n=col(X-1,Y); else if(solid(X,Y-1)) n=col(X,Y-1); if(n) add.push([X,Y,n]); }
  add.forEach(p=>{ const i=(p[1]*w+p[0])*4; d[i]=p[2][0]*.3+59*.7; d[i+1]=p[2][1]*.3+42*.7; d[i+2]=p[2][2]*.3+64*.7; d[i+3]=255; });
  o.x.putImageData(img,0,0);
}
