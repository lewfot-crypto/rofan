// 브라우저 실행 옵션. Mac/Windows는 설치된 Chrome, 리눅스(서버)는 @sparticuz/chromium.
// CHROME_PATH 환경변수로 직접 지정할 수도 있다.
const fs=require('fs');
const LOCAL=[
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
];
module.exports=async function launchOpts(){
  const local=process.env.CHROME_PATH||(process.platform!=='linux'&&LOCAL.find(p=>fs.existsSync(p)));
  if(local) return {executablePath:local,headless:true,args:['--no-sandbox']};
  const chromium=require('@sparticuz/chromium').default||require('@sparticuz/chromium');
  return {args:chromium.args.concat(['--no-sandbox']),executablePath:await chromium.executablePath(),headless:'shell'};
};
