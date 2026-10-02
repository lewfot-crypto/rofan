// 픽셀 엔진: PX(w,h) 캔버스와 점·사각형·타원·선·다각형·마스크, 색 섞기, 계절 팔레트, 난수
function rng(seed){ let a=seed>>>0; return function(){ a=(a+0x6D2B79F5)|0; let t=Math.imul(a^(a>>>15),1|a); t=(t+Math.imul(t^(t>>>7),61|t))^t; return ((t^(t>>>14))>>>0)/4294967296; }; }
function hex2rgb(h){ h=h.replace('#',''); return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]; }
function rgb2hex(a){ return '#'+a.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join(''); }
function mix(a,b,t){ const x=hex2rgb(a),y=hex2rgb(b); return rgb2hex(x.map((v,i)=>v+(y[i]-v)*t)); }
const RGBC={};
function RGB(col){ if(RGBC[col]!==undefined) return RGBC[col]; return RGBC[col]=(/^#[0-9a-f]{6}$/i.test(col)?hex2rgb(col):null); }
const MASKS={};
function maskCtx(w,h){ const k=w+'x'+h; if(!MASKS[k]){ const t=document.createElement('canvas'); t.width=w; t.height=h; MASKS[k]=t.getContext('2d',{willReadFrequently:true}); } return MASKS[k]; }
function PX(w,h){
  const c=document.createElement('canvas'); c.width=w; c.height=h;
  const x=c.getContext('2d',{willReadFrequently:true}); const o={c,x,w,h};
  if(!x){ o.p=o.r=o.ell=o.line=o.poly=o.mask=()=>{}; return o; }
  o.p=(X,Y,col)=>{ X|=0; Y|=0; if(X<0||Y<0||X>=w||Y>=h) return; x.fillStyle=col; x.fillRect(X,Y,1,1); };
  o.r=(X,Y,W,H,col)=>{ x.fillStyle=col; x.fillRect(X|0,Y|0,W|0,H|0); };
  o.ell=(cx,cy,rx,ry,col)=>{ for(let yy=-ry;yy<=ry;yy++){ const dx=Math.round(rx*Math.sqrt(Math.max(0,1-(yy*yy)/(ry*ry+.0001)))); o.r(cx-dx,cy+yy,dx*2+1,1,col); } };
  o.line=(x0,y0,x1,y1,col)=>{ x0|=0;y0|=0;x1|=0;y1|=0; const dx=Math.abs(x1-x0),dy=-Math.abs(y1-y0),sx=x0<x1?1:-1,sy=y0<y1?1:-1; let e=dx+dy; for(;;){ o.p(x0,y0,col); if(x0===x1&&y0===y1) break; const e2=2*e; if(e2>=dy){ e+=dy; x0+=sx; } if(e2<=dx){ e+=dx; y0+=sy; } } };
  o.poly=(pts,col)=>{ let mn=1e9,mx=-1e9; pts.forEach(p=>{ mn=Math.min(mn,p[1]); mx=Math.max(mx,p[1]); }); for(let yy=Math.floor(mn);yy<=Math.ceil(mx);yy++){ const xs=[]; for(let i=0;i<pts.length;i++){ const a=pts[i],b=pts[(i+1)%pts.length]; if((a[1]<=yy&&b[1]>yy)||(b[1]<=yy&&a[1]>yy)){ xs.push(a[0]+(yy-a[1])/(b[1]-a[1])*(b[0]-a[0])); } } xs.sort((m,n)=>m-n); for(let k=0;k+1<xs.length;k+=2){ o.r(Math.round(xs[k]),yy,Math.round(xs[k+1])-Math.round(xs[k])+1,1,col); } } };
  o.mask=(draw)=>{ const cc=maskCtx(w,h); cc.clearRect(0,0,w,h); cc.fillStyle='#000'; cc.beginPath(); draw(cc); const d=cc.getImageData(0,0,w,h).data; const m=new Uint8Array(w*h); for(let i=0;i<w*h;i++) m[i]=d[i*4+3]>110?1:0; return m; };
  // 점을 한꺼번에 찍기: 영역을 한 번 읽고, 점들을 메모리에서 바꾼 뒤 한 번에 되돌려 놓는다 (o.p 를 수백 번 부르는 것보다 훨씬 빠름)
  o.paint=(X0,Y0,W,H,each)=>{ X0=Math.max(0,X0|0); Y0=Math.max(0,Y0|0); W=Math.min(w-X0,W|0); H=Math.min(h-Y0,H|0); if(W<=0||H<=0) return;
    const img=x.getImageData(X0,Y0,W,H), d=img.data, later=[];
    each((X,Y,col)=>{ X|=0; Y|=0; if(X<X0||Y<Y0||X>=X0+W||Y>=Y0+H) return; const c=RGB(col); if(!c){ later.push([X,Y,col]); return; } const k=((Y-Y0)*W+(X-X0))*4; d[k]=c[0]; d[k+1]=c[1]; d[k+2]=c[2]; d[k+3]=255; });
    x.putImageData(img,X0,Y0); later.forEach(q=>o.p(q[0],q[1],q[2])); };
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
