// 홈 화면 아이콘(180×180) 만들기: node tools/make_icon.js  (먼저 npm run build)
// 게임 속 아델라인 도트(sprite('adeline','neutral'))를 60×60 남색 바탕에 그리고 3배로 키워, src/head.html 의 apple-touch-icon 에 data URI 로 넣는다.
const launchOpts=require('../test/launch');const puppeteer=require('puppeteer-core');const fs=require('fs'),path=require('path');
(async()=>{const b=await puppeteer.launch(await launchOpts());const p=await b.newPage();
await p.goto('file://'+path.resolve(__dirname,'../dist/game.html'),{waitUntil:'load'});
const url=await p.evaluate(()=>{ const N=60, o=PX(N,N); for(let y=0;y<N;y++) o.r(0,y,N,1,mix('#2c3c6e','#141a34',y/N));
  const s=sprite('adeline','neutral'); o.x.drawImage(s.c,0,Math.max(0,s.top-3),56,58,2,6,56,58);
  const big=PX(180,180); big.x.imageSmoothingEnabled=false; big.x.drawImage(o.c,0,0,180,180); return big.c.toDataURL('image/png'); });
await b.close();
const head=path.resolve(__dirname,'../src/head.html'); let h=fs.readFileSync(head,'utf8');
const tag='<link rel="apple-touch-icon" href="'+url+'">';
h=/<link rel="apple-touch-icon"[^>]*>/.test(h)?h.replace(/<link rel="apple-touch-icon"[^>]*>/,tag):h.replace('</title>','</title>\n'+tag);
fs.writeFileSync(head,h); fs.writeFileSync(path.resolve(__dirname,'../preview/icon_180.png'),Buffer.from(url.split(',')[1],'base64'));
console.log('icon', Math.round(url.length/1024)+' KB');})();
