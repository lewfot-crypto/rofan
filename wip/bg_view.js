// 새 배경 비교 캡처: node wip/bg_view.js 파일.png place1,place2,... (먼저 npm run build)
const launchOpts=require('../test/launch');
const puppeteer=require('puppeteer-core');
const fs=require('fs'); const SP=__dirname;
(async()=>{ const b=await puppeteer.launch(await launchOpts()); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.setViewport({width:1000,height:700});
  await p.goto('file://'+require('path').resolve(__dirname,'../dist/game.html'));
  const places=(process.argv[3]||'exterior,hall,schoolroom').split(',');
  const NEW={exterior:'exterior3',hall:'hall3',schoolroom:'school3',study:'study2',bedroom:'bedroom5',dining:'dining3',kitchen:'kitchen3',orchard:'orchard2',carriage:'carriage2',corridor:'corridor2',office:'office2'};
  const season=process.argv[4]||'늦가을';
  const old=await p.evaluate((pl,s)=>pl.map(k=>{ try{ return bgCanvas(k,s).toDataURL(); }catch(e){ return ''; } }),places,season);
  for(const f of ['cel.js','study2.js','ade2.js','more2.js','more3.js','bg2.js']) await p.addScriptTag({content:fs.readFileSync(SP+'/'+f,'utf8')});
  const nw=await p.evaluate((pl,NEW,s)=>pl.map(k=>{ const o=PX(240,160); window[NEW[k]](o,seasonPal(s)); return o.c.toDataURL(); }),places,NEW,season);
  const stage=await p.evaluate((k,NEW,s)=>{ const o=PX(240,160); window[NEW[k]](o,seasonPal(s)); [[kid('adeline',adeSprite('neutral')),40],[femSprite('holt','neutral'),130]].forEach(a=>o.x.drawImage(a[0].c,a[1],156-a[0].feet)); return o.c.toDataURL(); },places[1]||places[0],NEW,season);
  await p.evaluate((old,nw,stage,s)=>{ document.body.innerHTML='<div style="background:#3a3040;padding:8px;color:#fff;font:14px sans-serif"><div>왼쪽: 지금 / 오른쪽: 새로 그린 것 ('+s+')</div><div id=a></div><div>인물을 세운 모습</div><div id=c></div></div>';
    old.forEach((u,i)=>{ const row=document.createElement('div'); [u,nw[i]].forEach(v=>{ const im=new Image(); im.src=v; im.style.cssText='width:480px;height:320px;image-rendering:pixelated;margin:2px'; row.appendChild(im); }); document.getElementById('a').appendChild(row); });
    const im=new Image(); im.src=stage; im.style.cssText='width:720px;height:480px;image-rendering:pixelated'; document.getElementById('c').appendChild(im); },old,nw,stage,season);
  await p.screenshot({path:process.argv[2],fullPage:true}); console.log('errors',errs.join('|')||'none'); await b.close(); })();
