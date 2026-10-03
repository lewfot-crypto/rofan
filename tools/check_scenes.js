// 장면 데이터 정합성 검사: node tools/check_scenes.js
// - choice.next 가 실제 장면인지
// - 본문의 {{id|문구}} 가 NOTICES 에 있고, 같은 장면에 속하는지
// - choice.req/not/note/cross 가 NOTICES 에 있는지
// - 본문 조건(if/not)이 어떤 선택지의 flag 로 실제로 켜지는지, ifN/notN 노트가 있는지 (오타로 영영 안 나오는 문장 찾기)
// - {{id|…}} 로 밑줄이 없는데 byChoice 도 아닌 노트(눌러서 적을 길이 없는 노트), 장소(place)에 배경이 있는지
const fs=require('fs'),path=require('path');
const {SCENES,NOTICES,DICT,LETTERS}=require('./sources').load('scenes','SCENES,NOTICES,DICT,LETTERS');
const bad=[];
const art=fs.readFileSync(path.join(__dirname,'../src/art_bg.js'),'utf8');
const ARTPLACES=new Set([...art.slice(art.indexOf('const BG={')).matchAll(/(\w+):\(o,P\)=>/g)].map(m=>m[1]));
Object.keys(SCENES).forEach(k=>{
  const sc=SCENES[k];
  (sc.choices||[]).forEach(c=>{ if(c.next&&!SCENES[c.next]) bad.push(k+' -> '+c.next+' (없는 장면)'); if(c.req&&!NOTICES[c.req]) bad.push(k+' req '+c.req+' (없는 노트)'); });
  (sc.paras||[]).forEach(p=>{ const t=typeof p==='string'?p:(p.t||''); (t.match(/\{\{(\w+)\|/g)||[]).forEach(m=>{ const id=m.slice(2,-1); if(!NOTICES[id]) bad.push(k+' notice '+id+' 정의 없음'); else if(NOTICES[id].scene!==k) bad.push(k+' notice '+id+' 는 '+NOTICES[id].scene+' 장면 소속'); }); });
});
Object.keys(NOTICES).forEach(id=>{ if(!SCENES[NOTICES[id].scene]) bad.push('notice '+id+' 의 scene '+NOTICES[id].scene+' 없음'); });
const flags=new Set(), marked=new Set(), byNote=new Set();
Object.keys(SCENES).forEach(k=>{ (SCENES[k].choices||[]).forEach(c=>{ if(c.flag) flags.add(c.flag); if(c.note) byNote.add(c.note); }); (SCENES[k].paras||[]).forEach(p=>{ const t=typeof p==='string'?p:(p.t||''); (t.match(/\{\{(\w+)\|/g)||[]).forEach(m=>marked.add(m.slice(2,-1))); }); });
Object.keys(SCENES).forEach(k=>{ const sc=SCENES[k];
  (sc.choices||[]).forEach(c=>{ ['not','note','cross'].forEach(f=>{ if(c[f]&&!NOTICES[c[f]]) bad.push(k+' choice.'+f+' '+c[f]+' (없는 노트)'); }); });
  (sc.paras||[]).forEach(p=>{ if(typeof p!=='object') return; ['if','not'].forEach(f=>{ if(p[f]&&!flags.has(p[f])) bad.push(k+' 단락 '+f+':'+p[f]+' — 이 flag 를 켜는 선택지가 없음'); }); ['ifN','notN'].forEach(f=>{ if(p[f]&&!NOTICES[p[f]]) bad.push(k+' 단락 '+f+':'+p[f]+' (없는 노트)'); }); });
  if(sc.place&&!ARTPLACES.has(sc.place)) bad.push(k+' place '+sc.place+' 배경 없음');
});
Object.keys(NOTICES).forEach(id=>{ if(!marked.has(id)&&!NOTICES[id].byChoice) bad.push('notice '+id+' 는 밑줄도 없고 byChoice 도 아님'); if(NOTICES[id].byChoice&&!byNote.has(id)) bad.push('notice '+id+' 는 byChoice 인데 적는 선택지가 없음'); });
// 편지: 장면의 {fn:'letter',id} 가 있는 편지인지, 편지를 여는 flag 가 켜질 수 있는지, 편지 단락 조건이 맞는지
Object.keys(SCENES).forEach(k=>(SCENES[k].paras||[]).forEach(p=>{ if(p&&p.fn==='letter'&&!LETTERS[p.id]) bad.push(k+' 편지 '+p.id+' 없음'); }));
Object.keys(LETTERS).forEach(id=>{ const L=LETTERS[id]; if(!flags.has(L.open)) bad.push('편지 '+id+' 의 open flag '+L.open+' 를 켜는 선택지가 없음');
  L.paras.forEach(p=>{ if(typeof p!=='object') return; ['if','not'].forEach(f=>{ if(p[f]&&!flags.has(p[f])) bad.push('편지 '+id+' 단락 '+f+':'+p[f]+' flag 없음'); }); ['ifN','notN'].forEach(f=>{ if(p[f]&&!NOTICES[p[f]]) bad.push('편지 '+id+' 단락 '+f+':'+p[f]+' (없는 노트)'); }); }); });
console.log(Object.keys(SCENES).length+'개 장면, '+Object.keys(LETTERS).length+'통 편지, '+Object.keys(NOTICES).length+'개 노트');
if(bad.length){ console.log('문제 '+bad.length+'건:\n'+bad.join('\n')); process.exit(1); } else console.log('문제 없음');
