const launchOpts=require('./launch');
const puppeteer=require('puppeteer-core');
const W=+process.argv[2]||390,H=+process.argv[3]||780,P=process.argv[4]||'w',theme=process.argv[5]||'';
(async()=>{
  const browser=await puppeteer.launch(await launchOpts());
  const page=await browser.newPage();
  const errs=[]; page.on('pageerror',e=>errs.push('PAGEERR '+e.message));
  await page.setViewport({width:W,height:H,deviceScaleFactor:1,isMobile:true,hasTouch:true});
  if(theme==='dark') await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:'dark'}]);
  await page.goto('file://'+require('path').resolve(__dirname,'../dist/game.html'),{waitUntil:'load'});
  await page.evaluate(()=>localStorage.clear()); await page.reload({waitUntil:'load'});
  const sleep=ms=>new Promise(r=>setTimeout(r,ms));
  let n=0; const shot=async(l)=>{ n++; await page.screenshot({path:`/tmp/${P}_${String(n).padStart(2,'0')}_${l}.png`}); };
  const click=async sel=>{ await page.click(sel); await sleep(60); };
  const scrollTo=async y=>{ await page.evaluate(y=>{ const t=document.querySelector('#tb'); if(t) t.scrollTop=y; },y); await sleep(40); };
  await click('[data-act=new]');
  // go scene by scene
  for(let i=0;i<12;i++){
    const id=await page.evaluate(()=>{ const s=document.querySelector('.status span:last-child'); return s?s.textContent:''; });
    await shot('scene'+i+'_top');
    const sh=await page.evaluate(()=>{ const t=document.querySelector('#tb'); return t?[t.scrollHeight,t.clientHeight]:[0,0]; });
    if(sh[0]>sh[1]+20){ await scrollTo(9999); await shot('scene'+i+'_bottom'); await scrollTo(0); }
    // notice all
    const ids=await page.evaluate(()=>[...document.querySelectorAll('[data-act=notice]')].map(e=>e.dataset.id));
    for(const nid of ids){ await click(`[data-id=${nid}]`); }
    if(ids.length){ await scrollTo(9999); await shot('scene'+i+'_noticed'); }
    const c=await page.$('[data-act=choice]'); if(!c) break;
    await click('[data-act=choice]'); 
    const end=await page.evaluate(()=>!!document.querySelector('.endcard'));
    if(end){ await shot('end'); break; }
  }
  await click('[data-tab=notes]'); await shot('notes');
  await click('[data-tab=mansion]'); await shot('mansion');
  await click('[data-tab=settings]'); await shot('settings');
  await click('[data-act=sub][data-v=library]'); await shot('library');
  await click('[data-act=chap][data-n="1"]'); await shot('reader');
  await click('[data-act=sub][data-v=library]'); await click('[data-act=sub][data-v=root]');
  await click('[data-act=sub][data-v=chars]'); await shot('chars');
  console.log('shots',n,'errors',errs.join(' | ')||'none');
  await browser.close();
})();
