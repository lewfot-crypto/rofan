// 소스 파일 목록과 읽기 도우미. 빌드·검사 도구가 모두 이 순서를 쓴다.
//   novel/   소설 전문(_base → 01…37)
//   scenes/  장면·노트(_base → ch01…ch30 → dict → letters)
const fs=require('fs'),path=require('path');
const SRC=path.join(__dirname,'../src');
const dir=d=>fs.readdirSync(path.join(SRC,d)).filter(f=>f.endsWith('.js')).sort((a,b)=>(b[0]==='_')-(a[0]==='_')||(a<b?-1:1)).map(f=>d+'/'+f);
const files=()=>[...dir('novel'),'art_core.js','art_sprites.js','art_bg.js','assets.js',...dir('scenes'),'changelog.js','app.js'];
const read=list=>list.map(f=>fs.readFileSync(path.join(SRC,f),'utf8')).join('\n');
// 데이터 파일을 실행해 값을 꺼낸다: load('scenes','SCENES,NOTICES') → {SCENES,NOTICES}
const load=(d,names)=>new Function(read(dir(d))+';return {'+names+'}')();
module.exports={SRC,dir,files,read,load};
if(require.main===module) console.log(files().join('\n'));
