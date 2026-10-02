// 장면 데이터 정합성 검사: node tools/check_scenes.js
// - choice.next 가 실제 장면인지
// - 본문의 {{id|문구}} 가 NOTICES 에 있고, 같은 장면에 속하는지
// - choice.req 가 NOTICES 에 있는지
const fs=require('fs'),path=require('path');
const src=fs.readFileSync(path.join(__dirname,'../src/scenes.js'),'utf8');
const {SCENES,NOTICES,DICT}=new Function(src+';return {SCENES,NOTICES,DICT}')();
const bad=[];
Object.keys(SCENES).forEach(k=>{
  const sc=SCENES[k];
  (sc.choices||[]).forEach(c=>{ if(c.next&&!SCENES[c.next]) bad.push(k+' -> '+c.next+' (없는 장면)'); if(c.req&&!NOTICES[c.req]) bad.push(k+' req '+c.req+' (없는 노트)'); });
  (sc.paras||[]).forEach(p=>{ const t=typeof p==='string'?p:(p.t||''); (t.match(/\{\{(\w+)\|/g)||[]).forEach(m=>{ const id=m.slice(2,-1); if(!NOTICES[id]) bad.push(k+' notice '+id+' 정의 없음'); else if(NOTICES[id].scene!==k) bad.push(k+' notice '+id+' 는 '+NOTICES[id].scene+' 장면 소속'); }); });
});
Object.keys(NOTICES).forEach(id=>{ if(!SCENES[NOTICES[id].scene]) bad.push('notice '+id+' 의 scene '+NOTICES[id].scene+' 없음'); });
console.log(Object.keys(SCENES).length+'개 장면, '+Object.keys(NOTICES).length+'개 노트');
if(bad.length){ console.log('문제 '+bad.length+'건:\n'+bad.join('\n')); process.exit(1); } else console.log('문제 없음');
