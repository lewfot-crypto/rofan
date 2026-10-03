// 사용법: node tools/dump_paras.js 4 5 6  → 해당 장의 단락 앞 14자와 인덱스를 출력
const fs=require('fs'),path=require('path');
const {CHAPTERS}=require('./sources').load('novel','CHAPTERS');
const want=process.argv.slice(2).map(Number);
CHAPTERS.filter(c=>want.includes(c.n)).forEach(c=>{
  const ps=c.text.split(/\n\s*\n/).map(x=>x.trim()).filter(x=>x&&x!=='---');
  console.log('== '+c.n+' '+c.title+' ('+ps.length+')');
  ps.forEach((p,i)=>console.log(i+': '+p.slice(0,14)));
});
