const launchOpts=require('./launch');
const puppeteer=require('puppeteer-core');
(async()=>{
  const browser=await puppeteer.launch(await launchOpts());
  const page=await browser.newPage(); const errs=[]; page.on('pageerror',e=>errs.push(e.message));
  await page.setViewport({width:1200,height:900});
  await page.goto('file://'+require('path').resolve(__dirname,'../dist/game.html'),{waitUntil:'load'});
  await page.evaluate(()=>{
    document.body.innerHTML='<div id="g" style="display:flex;flex-wrap:wrap;gap:8px;padding:8px;background:#444"></div>';
    const g=document.getElementById('g');
    Object.keys(BG).forEach(k=>{ const d=document.createElement('div'); d.style.cssText='width:480px;height:320px'; d.innerHTML=bgSVG(k,'늦가을'); d.firstChild.style.cssText='width:480px;height:320px;image-rendering:pixelated'; g.appendChild(d); });
  });
  await page.screenshot({path:'/tmp/g_bg.png',fullPage:true});
  console.log('errors',errs.join('|')||'none');
  await browser.close();
})();
