// 세레나·그레고르·백작 캡처: node wip/batch4_view.js /tmp/b1.png (먼저 npm run build)
const launchOpts=require('../test/launch');
const puppeteer=require('puppeteer-core');
const fs=require('fs'); const SP=__dirname;
(async()=>{ const b=await puppeteer.launch(await launchOpts()); const p=await b.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.setViewport({width:1000,height:700});
  await p.goto('file://'+require('path').resolve(__dirname,'../dist/game.html'));
  const ids=['serena','gregor','count'];
  const old=await p.evaluate(ids=>ids.map(id=>sprite(id,'neutral').c.toDataURL()),ids);
  for(const f of ['cel.js','study2.js','ade2.js','more2.js','more3.js']) await p.addScriptTag({content:fs.readFileSync(SP+'/'+f,'utf8')});
  const E=['neutral','smile','sad','worry','surprise'];
  const rows=await p.evaluate(E=>['serena','gregor','count'].map(id=>E.map(e=>id==='serena'?kid(id,girlSprite(id,e)):adultMale(id,e))).map(r=>r.map(s=>s.c.toDataURL())),E);
  const stage=await p.evaluate(()=>{ const o=PX(240,160); study2(o,seasonPal('겨울')); [[adultMale('gregor','neutral'),2],[maleSprite('edric','neutral'),56],[kid('adeline',adeSprite('neutral')),104],[kid('serena',girlSprite('serena','neutral')),142],[adultMale('count','neutral'),184]].forEach(a=>o.x.drawImage(a[0].c,a[1],156-a[0].feet)); return o.c.toDataURL(); });
  await p.evaluate((old,rows,stage)=>{ document.body.innerHTML='<div style="background:#3a3040;padding:8px;color:#fff;font:14px sans-serif"><div>위: 지금 (세레나·그레고르·발트하임 백작)</div><div id=a></div><div>새로 그린 것: 보통·웃음·슬픔·걱정·놀람</div><div id=b0></div><div id=b1></div><div id=b2></div><div id=c></div></div>';
    const put=(el,arr,w,h)=>arr.forEach(u=>{ const i=new Image(); i.src=u; i.style.cssText='width:'+w+'px;height:'+h+'px;image-rendering:pixelated;margin:2px'; document.getElementById(el).appendChild(i); });
    put('a',old,84,198); rows.forEach((r,k)=>put('b'+k,r,140,330)); put('c',[stage],720,480); },old,rows,stage);
  await p.screenshot({path:process.argv[2],fullPage:true}); console.log('errors',errs.join('|')||'none'); await b.close(); })();
