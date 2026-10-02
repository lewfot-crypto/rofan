// 셀 음영: 점무늬 없이 2~3단 단단한 그림자 + 윗왼쪽 하이라이트
function celShade(o,m,rp,opt){
  opt=opt||{}; const w=o.w,h=o.h,n=rp.length;
  let x0=w,x1=0,y0=h,y1=0; for(let j=0;j<h;j++) for(let i=0;i<w;i++) if(m[j*w+i]){ if(i<x0)x0=i; if(i>x1)x1=i; if(j<y0)y0=j; if(j>y1)y1=j; }
  if(x1<x0) return; const at=(i,j)=>(i<0||j<0||i>=w||j>=h)?0:m[j*w+i];
  const base=Math.min(n-1,Math.max(1,Math.round((n-1)*.6))), sh=base-1, hi=Math.min(n-1,base+1), dd=Math.max(0,sh-1);
  const cx=(x0+x1)/2, hw=Math.max(1,(x1-x0)/2);
  for(let j=y0;j<=y1;j++) for(let i=x0;i<=x1;i++){ if(!at(i,j)) continue;
    let t=base;
    const nx=(i-cx)/hw;
    if(nx>.42 && (x1-x0)>6) t=sh;                               // 큰 면의 오른쪽 그늘
    if(!at(i+1,j)||!at(i,j+1)) t=sh;                             // 오른쪽·아래 가장자리
    if((!at(i+1,j)&&!at(i,j+1))||(!at(i+1,j)&&nx>.42)) t=dd;      // 모서리 짙게
    if((!at(i-1,j)||!at(i,j-1)) && nx<.2 && t===base) t=hi;      // 왼쪽·위 하이라이트
    if(opt.f){ const v=opt.f(i,j,nx,0); if(v<-.06) t=Math.max(0,t-1); else if(v>.06) t=Math.min(n-1,t+1); }
    o.p(i,j,rp[t]);
  }
}
fp=function(o,d,rp,opt){ const m=o.mask(c=>{ c.fill(new Path2D(d)); }); celShade(o,m,rp,opt); return m; };
for(const k in SPR) delete SPR[k];
