// 사용법: node test/sprites.js adeline,tangie smile [head] /tmp/out.png
const launchOpts=require('./launch');
const puppeteer=require('puppeteer-core'); const fs=require('fs'); const path=require('path');
(async()=>{
  const code=['art_core.js','art_sprites.js'].map(f=>fs.readFileSync(path.join(__dirname,'../src',f),'utf8')).join('\n');
  const browser=await puppeteer.launch(await launchOpts());
  const page=await browser.newPage(); const errs=[]; page.on('pageerror',e=>errs.push(e.message));
  await page.setViewport({width:1200,height:700});
  await page.setContent('<body style="margin:0;background:#d9d3e0"><div id="g" style="display:flex;flex-wrap:wrap;gap:4px;padding:6px"></div></body>');
  await page.addScriptTag({content:code});
  const ids=process.argv[2]?process.argv[2].split(','):Object.keys(await page.evaluate(()=>FIG));
  const expr=process.argv[3]||'neutral'; const crop=process.argv[4]==='head';
  await page.evaluate((ids,expr,crop)=>{ const g=document.getElementById('g'); ids.forEach(k=>{ const s=sprite(k,expr); const c=document.createElement('canvas'); const w=56,h=crop?60:132; c.width=w;c.height=h; c.getContext('2d').drawImage(s.c,0,0,w,h,0,0,w,h); const img=new Image(); img.src=c.toDataURL(); const z=crop?6:3.4; img.style.cssText='width:'+(w*z)+'px;height:'+(h*z)+'px;image-rendering:pixelated'; g.appendChild(img); }); },ids,expr,crop);
  await page.screenshot({path:process.argv[5]||'/tmp/sprites.png',fullPage:true});
  console.log('errors',errs.join('|')||'none'); await browser.close();
})();
