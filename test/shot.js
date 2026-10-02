const launchOpts=require('./launch');
const puppeteer=require('puppeteer-core');
(async()=>{
  const opts=await launchOpts();
  console.log('exe',opts.executablePath);
  const browser=await puppeteer.launch(opts);
  const page=await browser.newPage();
  await page.setViewport({width:390,height:780,deviceScaleFactor:1,isMobile:true,hasTouch:true});
  await page.goto('file://'+require('path').resolve(__dirname,'../dist/game.html'),{waitUntil:'load'});
  await page.screenshot({path:'/tmp/shot_title.png'});
  console.log('ok');
  await browser.close();
})().catch(e=>{console.error('FAIL',e.message.slice(0,300));process.exit(1);});
