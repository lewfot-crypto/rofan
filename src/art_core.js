const BAYER=[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]];
function hashStr(s){ let h=2166136261; for(const ch of String(s)){ h^=ch.charCodeAt(0); h=Math.imul(h,16777619); } return h>>>0; }
function rng(seed){ let a=seed>>>0; return function(){ a=(a+0x6D2B79F5)|0; let t=Math.imul(a^(a>>>15),1|a); t=(t+Math.imul(t^(t>>>7),61|t))^t; return ((t^(t>>>14))>>>0)/4294967296; }; }
function hex2rgb(h){ h=h.replace('#',''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
function rgb2hex(a){ return '#'+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join(''); }
function mix(a,b,t){ const x=hex2rgb(a),y=hex2rgb(b); return rgb2hex(x.map((v,i)=>v+(y[i]-v)*t)); }
function ramp(c,n){ n=n||4; const out=[]; for(let i=0;i<n;i++){ const t=i/(n-1); out.push(t<.5?mix(mix(c,'#2c1f4a',.62),c,t*2):mix(c,'#fff1da',.5),); } const a=[]; for(let i=0;i<n;i++){ const t=i/(n-1); a.push(t<.5?mix(mix(c,'#2c1f4a',.62),c,t/.5):mix(c,'#fff1da',(t-.5)/.5*.52)); } return a; }
function tone(c){ return {l:mix(c,'#fff4e4',.28),m:c,d:mix(c,'#2a1f3a',.36),dd:mix(c,'#1c1428',.6)}; }
const OUT='#2b2030';
function PX(w,h){
  const c=document.createElement('canvas'); c.width=w; c.height=h;
  const x=c.getContext('2d'); const o={c,x,w,h};
  if(!x){ o.p=o.r=o.ell=o.line=o.poly=o.dith=o.grad=o.mask=o.shade=()=>{}; return o; }
  o.p=(X,Y,col)=>{ X|=0; Y|=0; if(X<0||Y<0||X>=w||Y>=h) return; x.fillStyle=col; x.fillRect(X,Y,1,1); };
  o.r=(X,Y,W,H,col)=>{ x.fillStyle=col; x.fillRect(X|0,Y|0,W|0,H|0); };
  o.ell=(cx,cy,rx,ry,col)=>{ for(let yy=-ry;yy<=ry;yy++){ const dx=Math.round(rx*Math.sqrt(Math.max(0,1-(yy*yy)/(ry*ry+.0001)))); o.r(cx-dx,cy+yy,dx*2+1,1,col); } };
  o.line=(x0,y0,x1,y1,col)=>{ x0|=0;y0|=0;x1|=0;y1|=0; const dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1; let e=dx+dy; for(;;){ o.p(x0,y0,col); if(x0===x1&&y0===y1) break; const e2=2*e; if(e2>=dy){ e+=dy; x0+=sx; } if(e2<=dx){ e+=dx; y0+=sy; } } };
  o.poly=(pts,col)=>{ let mn=1e9,mx=-1e9; pts.forEach(p=>{ mn=Math.min(mn,p[1]); mx=Math.max(mx,p[1]); }); for(let yy=Math.floor(mn);yy<=Math.ceil(mx);yy++){ const xs=[]; for(let i=0;i<pts.length;i++){ const a=pts[i],b=pts[(i+1)%pts.length]; if((a[1]<=yy&&b[1]>yy)||(b[1]<=yy&&a[1]>yy)){ xs.push(a[0]+(yy-a[1])/(b[1]-a[1])*(b[0]-a[0])); } } xs.sort((m,n)=>m-n); for(let k=0;k+1<xs.length;k+=2){ o.r(Math.round(xs[k]),yy,Math.round(xs[k+1])-Math.round(xs[k])+1,1,col); } } };
  o.dith=(X,Y,W,H,a,b,t)=>{ for(let j=0;j<H;j++) for(let i=0;i<W;i++) o.p(X+i,Y+j,(t*16>BAYER[(Y+j)&3][(X+i)&3])?b:a); };
  o.grad=(X,Y,W,H,cols)=>{ const n=cols.length; for(let j=0;j<H;j++){ const f=j/Math.max(1,H-1)*(n-1); const i=Math.min(n-2,Math.floor(f)); const t=f-i; for(let k=0;k<W;k++){ o.p(X+k,Y+j,(t*16>BAYER[j&3][(X+k)&3])?cols[i+1]:cols[i]); } } };
  o.mask=(draw)=>{ const t=document.createElement('canvas'); t.width=w; t.height=h; const cc=t.getContext('2d'); cc.fillStyle='#000'; draw(cc); const d=cc.getImageData(0,0,w,h).data; const m=new Uint8Array(w*h); for(let i=0;i<w*h;i++) m[i]=d[i*4+3]>110?1:0; return m; };
  o.shade=(m,rp,opt)=>{ opt=opt||{}; const n=rp.length; let x0=w,x1=0,y0=h,y1=0; for(let j=0;j<h;j++) for(let i=0;i<w;i++) if(m[j*w+i]){ if(i<x0)x0=i; if(i>x1)x1=i; if(j<y0)y0=j; if(j>y1)y1=j; }
    if(x1<x0) return; const cx=(x0+x1)/2, cy=(y0+y1)/2, hw=Math.max(1,(x1-x0)/2), hh=Math.max(1,(y1-y0)/2); const L=opt.light||[-.55,-.7]; const k=opt.k==null?.85:opt.k; const bias=opt.bias==null?.0:opt.bias;
    const at=(i,j)=>(i<0||j<0||i>=w||j>=h)?0:m[j*w+i];
    for(let j=y0;j<=y1;j++) for(let i=x0;i<=x1;i++){ if(!m[j*w+i]) continue;
      const nx=(i-cx)/hw, ny=(j-cy)/hh; const z=Math.sqrt(Math.max(0,1-Math.min(1,nx*nx*.6+ny*ny*.4)));
      let s=.5-(nx*L[0]+ny*L[1])*.5*k + (opt.flat?0:(z-.6)*.12) + bias; if(opt.f) s+=opt.f(i,j,nx,ny);
      if(!at(i+1,j)) s-=.16; if(!at(i,j+1)) s-=.12; if(!at(i-1,j)) s+=.07; if(!at(i,j-1)) s+=.07;
      s=Math.max(0,Math.min(.999,s)); const lv=s*(n-1); let a=Math.floor(lv); const t=lv-a; const tt=Math.max(0,Math.min(1,(t-.42)/.16)); const idx=opt.hard?Math.round(lv):((tt*16>BAYER[j&3][i&3])?a+1:a); o.p(i,j,rp[Math.min(n-1,idx)]); } };
  return o;
}
function seasonPal(season){
  const s=String(season||'');
  if(/겨울/.test(s)) return {sky:['#8fa7c8','#b6c8de','#e2eaf4'],far:['#9db0c9','#8296b4'],leaf:['#eef3f8','#cdd9e6','#a3b4c8'],gr:['#eef2f7','#d3dde8','#b4c3d4'],trunk:'#5a4a48',part:'#ffffff',mood:'#b7c6dd'};
  if(/봄/.test(s)) return {sky:['#9fd0ee','#c8e6f2','#f3f1e2'],far:['#93c7a4','#7bb08e'],leaf:['#fbd2de','#ee9fba','#c8708f'],gr:['#a3d684','#7dbc68','#5e9c52'],trunk:'#5a4234',part:'#ffd6e4',mood:'#e8c9d6'};
  if(/여름/.test(s)) return {sky:['#6fbfe8','#a0d8f0','#e0f2f6'],far:['#7fb98c','#5fa070'],leaf:['#86cc6a','#52a04c','#2f7040'],gr:['#82c866','#5aa64e','#3f8440'],trunk:'#5a4234',part:null,mood:'#cfe3c0'};
  return {sky:['#e0a878','#efc898','#f8e6bf'],far:['#bb9468','#9c7650'],leaf:['#f2ae3c','#d6762a','#a24c20'],gr:['#c2a258','#9c7c40','#7a5e30'],trunk:'#4f3a2c',part:'#e8923a',mood:'#e2b890'};
}
const IMGCACHE={};
function toImg(c,cls,alt){ let u=''; try{ u=c.toDataURL('image/png'); }catch(e){ u=''; } return '<img class="'+(cls||'')+'" alt="'+(alt||'')+'" src="'+u+'">'; }
