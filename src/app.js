const VOLS={1:'1권 · 겨울의 문턱',2:'2권 · 사교계의 규칙',3:'3권 · 편지와 균열',4:'4권 · 무도회',5:'번외편'};
const volOf=n=>n>=31?5:(n<=9?1:(n<=17?2:(n<=25?3:4)));
const chLabel=c=>c.ex?('번외 '+c.exNo):(c.n+'장');
const $=s=>document.querySelector(s);
const root=document.documentElement;
function store(k,v){ try{ if(v===undefined) return localStorage.getItem(k); if(v===null){ localStorage.removeItem(k); return null; } localStorage.setItem(k,v); return v; }catch(e){ return null; } }
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function inline(s){ return esc(s).replace(/~~([^~]+)~~/g,'<del>$1</del>').replace(/\*([^*]+)\*/g,'<em>$1</em>'); }
// 노트 한 줄 (줄을 그은 노트는 취소선)
function jotText(id){ const t=esc(NOTICES[id].text); return (S.crossed&&S.crossed[id])?'<del>'+t+'</del>':t; }
function renderText(text){
  let out='';
  text.split(/\n\s*\n/).forEach(b=>{
    b=b.trim(); if(!b) return;
    if(b==='---'){ out+='<hr>'; return; }
    if(b.startsWith('*—')){
      const lines=b.split('\n');
      lines.forEach((l,i)=>{ out+='<p class="note'+(i===0?' first':'')+(i===lines.length-1?' last':'')+'">'+esc(l.replace(/^\*|\*$/g,'')).replace(/~~([^~]+)~~/g,'<del>$1</del>')+'</p>'; });
      return;
    }
    out+='<p>'+inline(b)+'</p>';
  });
  return out;
}

let pref={fs:18,theme:'auto',sound:false,dim:0};
try{ const p=JSON.parse(store('adeline-game-pref')||'null'); if(p) pref=Object.assign(pref,p); }catch(e){}
function applyPref(){
  root.style.setProperty('--fs',pref.fs+'px');
  if(pref.theme==='auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme',pref.theme);
  root.style.setProperty('--dim',[1,.88,.76][pref.dim||0]);
  store('adeline-game-pref',JSON.stringify(pref));
}
function freshSave(){ return {scene:'s1',noticed:{},flags:{},crossed:{}}; }
// 지금 만들어진 마지막 장 (c13a 같은 장 첫 장면 id로 계산)
const LAST_CH=Math.max(...Object.keys(SCENES).map(k=>(k.match(/^c(\d+)a$/)||[0,0])[1]*1));
// 이전 판의 끝 카드(send)에 멈춰 있던 저장은, 그때 끝난 장의 다음 장 첫 장면으로 옮긴다
function resumeFromEnd(s){
  let ch=s.endAt;
  if(!ch){ ch=1; Object.keys(s.noticed||{}).forEach(id=>{ const n=NOTICES[id], m=n&&n.scene.match(/^c(\d+)/); if(m) ch=Math.max(ch,+m[1]); }); }
  if(ch<LAST_CH&&SCENES['c'+(ch+1)+'a']){ s.scene='c'+(ch+1)+'a'; delete s.endAt; }
}
function loadSave(){ try{ const s=JSON.parse(store('adeline-game-save')||'null'); if(s){ if(s.scene==='s7') s.scene='c2a'; if(!s.crossed) s.crossed={}; if(!s.noticed) s.noticed={}; if(!s.flags) s.flags={}; if(s.scene==='send') resumeFromEnd(s); if(SCENES[s.scene]) return s; } }catch(e){} return null; }
let S=loadSave();
function persist(){ if(S) store('adeline-game-save',JSON.stringify(S)); }

let ui={screen:'title',tab:null,sub:'root',chap:null,fork:null,confirm:false,msg:'',code:false};
const app=$('#app');

const ICON={
 note:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>',
 mail:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
 house:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-5h4v5"/></svg>',
 set:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h9M17 7h3M4 12h3M11 12h9M4 17h11M19 17h1"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="17" r="2"/></svg>',
 back:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
 go:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
};

function notebookHtml(p){
  // p.pre: 이 장면 id로 시작하는 장면에서 적은 노트만 (기본: 1장 s*), p.empty: 하나도 없을 때 문장
  p=p||{}; const re=p.pre?new RegExp('^'+p.pre):/^s\d/;
  const early=Object.keys(SCENES).filter(k=>re.test(k));
  const ids=Object.keys(S.noticed).filter(id=>NOTICES[id]&&early.indexOf(NOTICES[id].scene)>=0).sort((x,y)=>S.noticed[x]-S.noticed[y]).slice(-4);
  if(!ids.length) return '<p class="hint">'+esc(p.empty||'낡은 노트는 거의 비어 있었다.')+'</p>';
  return ids.map(id=>'<div class="jot">'+jotText(id)+'</div>').join('');
}
// 조건부 단락(if/not/ifN/notN)이 지금 보이는지
function paraOn(p){ return typeof p!=='object'||!((p.if&&!S.flags[p.if])||(p.not&&S.flags[p.not])||(p.ifN&&!S.noticed[p.ifN])||(p.notN&&S.noticed[p.notN])); }
function letterHtml(id){
  const L=LETTERS[id]; if(!L) return '';
  return '<div class="letter"><div class="lh">'+esc(L.head)+'</div><p class="to">'+esc(L.to)+'</p>'+L.paras.filter(paraOn).map(p=>'<p>'+inline(typeof p==='object'?p.t:p)+'</p>').join('')+(L.sign?'<p class="sign">'+esc(L.sign)+'</p>':'')+'</div>';
}
function sceneHtml(){
  const sc=SCENES[S.scene];
  const stage=stageSVG(sc.place,sc.season,sc.chars,sc.time,sc.props);
  let paras='';
  (sc.paras||[]).forEach(p=>{
    let t=p;
    if(typeof p==='object'){
      if(!paraOn(p)) return;
      if(p.fn==='notebook'){ paras+=notebookHtml(p); return; }
      if(p.fn==='letter'){ paras+=letterHtml(p.id); return; }
      t=p.t;
    }
    paras+='<p>'+inline(t).replace(/\{\{(\w+)\|([^}]+)\}\}/g,(m,id,ph)=>'<span class="notice'+(S.noticed[id]?' done':'')+'" role="button" tabindex="0" data-act="notice" data-id="'+id+'">'+ph+'</span>')+'</p>';
  });
  let jots='';
  Object.keys(NOTICES).forEach(id=>{ if(NOTICES[id].scene===S.scene&&S.noticed[id]) jots+='<div class="jot">'+jotText(id)+'</div>'; });
  let body;
  if(sc.end){
    const n=Object.keys(S.noticed).length;
    body='<div class="endcard"><h3>'+(sc.endTitle||'여기까지예요')+'</h3><p>알아차린 것 '+n+'줄이 노트에 적혀 있어요. 무엇을 알아챘는지에 따라 달라진 장면이 있었어요. 다음 장면은 순서대로 추가될 거예요.</p></div>';
  } else {
    const left=Object.keys(NOTICES).some(id=>NOTICES[id].scene===S.scene&&!NOTICES[id].byChoice&&!S.noticed[id]);   // 선택으로 적히는 노트(byChoice)는 밑줄 안내에서 뺀다
    body=paras+(left?'<div class="hint">밑줄 친 부분을 누르면 노트에 적어요</div>':'')+jots;
  }
  let ch='';
  if(sc.end&&ui.confirmEnd){ ch='<div class="hint">저장된 이야기가 지워져요. 처음부터 시작할까요?</div><button class="choice" data-act="endNo">취소</button><button class="choice" data-act="endYes">처음부터 시작</button>'; }
  else (sc.choices||[]).forEach((c,i)=>{ if(c.req&&!S.noticed[c.req]) return; if(c.not&&S.noticed[c.not]) return; ch+='<button class="choice" data-act="choice" data-i="'+i+'">'+esc(c.label)+'</button>'; });
  return '<div class="scroller" id="tb"><div class="stage">'+stage+'</div><div class="textbox">'+body+'<div class="choices">'+ch+'</div></div></div>';
}

function drawTitle(){
  const season=S?SCENES[S.scene].season:'늦가을';
  let menu;
  if(ui.confirm){
    menu='<div class="tt-confirm">저장된 이야기가 지워져요. 처음부터 시작할까요?<div class="r"><button class="tbtn" style="width:auto;padding:.6em 1.2em" data-act="cancelNew">취소</button><button class="tbtn main" style="width:auto;padding:.6em 1.2em" data-act="doNew">처음부터 시작</button></div></div>';
  } else {
    menu=(S?'<button class="tbtn main" data-act="continue">이어하기</button><button class="tbtn" data-act="new">새로 시작</button>':'<button class="tbtn main" data-act="new">새로 시작</button>')+'<button class="tbtn" data-act="titleSettings">설정</button>';
  }
  app.innerHTML='<div class="title">'+titleSVG(season)+'<div class="tt-wrap"><h1 class="tt-h serif"><span class="tt-k">트로네 공작가의</span>아델라인</h1><div class="tt-orn" aria-hidden="true"><i></i><b></b><i></i></div></div><div class="tt-menu">'+menu+'</div></div>';
}

function nav(){
  const t=ui.tab;
  const b=(k,ic,lb)=>'<button data-act="tab" data-tab="'+k+'" class="'+(t===k?'on':'')+'" aria-label="'+lb+'">'+ICON[ic]+lb+'</button>';
  return '<nav class="nav">'+b('notes','note','노트')+b('letters','mail','편지')+b('mansion','house','저택')+b('settings','set','설정')+'</nav>';
}

function drawGame(){
  const tb=$('#tb'), pn=$('.panel');
  const ts=tb?tb.scrollTop:0, ps=pn?pn.scrollTop:0;
  const sc=SCENES[S.scene];
  app.innerHTML='<div class="gs">'+(ui.tab?'':'<div class="status"><span>'+sc.season+' · '+sc.age+'</span><span class="qt"><span>'+sc.chLabel+'</span>'+qBtn()+'</span></div>')+'<div class="main">'+sceneHtml()+(ui.tab?'<div class="panel">'+panelHtml(false)+'</div>':'')+'</div>'+nav()+'</div>';
  const tb2=$('#tb'), pn2=$('.panel');
  if(tb2&&ui.keep!=='top') tb2.scrollTop=ts;
  if(pn2&&ui.keep!=='top') pn2.scrollTop=ps;
  ui.keep=null;
}
function drawTitleSettings(){
  app.innerHTML='<div class="gs"><div class="status"><span>설정</span><span></span></div><div class="main"><div class="panel" style="z-index:1">'+panelHtml(true)+'</div></div></div>';
}
function draw(){
  if(ui.screen==='title') drawTitle();
  else if(ui.screen==='titleSettings') drawTitleSettings();
  else drawGame();
}

function head(title,backLabel,act,v,q){
  return '<div class="ph"><button class="bk" data-act="'+act+'"'+(v!==undefined?' data-v="'+v+'"':'')+'>'+ICON.back+backLabel+'</button><h2>'+title+'</h2>'+(q?qBtn():'')+'</div>';
}
// 읽는 화면에서 바로 바꾸는 화면 색: 밝게 → 종이 → 어둡게
const THEME_NAME={auto:'자동',light:'밝게',paper:'종이',dark:'어둡게'};
function curTheme(){ if(pref.theme!=='auto') return pref.theme; return (window.matchMedia&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'; }
function qBtn(){ const t=curTheme(); const ic=t==='dark'?'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>':t==='paper'?'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h7M9 16h7"/>':'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  return '<button class="qbtn" data-act="qtheme" aria-label="화면 색 바꾸기 (지금: '+THEME_NAME[t]+')"><svg viewBox="0 0 24 24" aria-hidden="true">'+ic+'</svg></button>'; }
function panelHtml(fromTitle){
  const t=ui.tab;
  if(t==='notes') return head('노트','장면으로','closeTab')+'<div class="pc notebook">'+notesHtml()+'</div>';
  if(t==='letters') return head('편지','장면으로','closeTab')+'<div class="pc">'+lettersHtml()+'</div>';
  if(t==='mansion') return head('저택','장면으로','closeTab')+'<div class="pc">'+mansionHtml()+'</div>';
  return settingsHtml(fromTitle);
}
function lettersHtml(){
  const ids=Object.keys(LETTERS).filter(id=>S.flags[LETTERS[id].open]);
  if(!ids.length) return '<div class="empty"><b>아직 편지가 없어요</b>첫 편지는 몇 계절이 지난 뒤에 도착해요.</div>';
  return ids.map(id=>'<div class="lmeta">'+esc(LETTERS[id].season)+' · '+esc(LETTERS[id].who)+'</div>'+letterHtml(id)).join('');
}
function notesHtml(){
  const ids=Object.keys(S.noticed).filter(id=>NOTICES[id]).sort((a,b)=>S.noticed[a]-S.noticed[b]);
  if(!ids.length) return '<div class="empty"><b>아직 아무것도 적지 않았어요</b>장면 속 밑줄 친 부분을 누르면 노트에 한 줄이 쌓여요.</div>';
  let o='<div class="hint">'+ids.length+'줄</div>';
  ids.forEach(id=>{ o+='<div class="ent"><div class="jot">'+jotText(id)+'</div></div>'; });
  return o;
}
function mansionHtml(){
  const cur=SCENES[S.scene];
  let o='<p class="note-s" style="padding-top:0">하루를 어디서 보낼지 고르는 곳이에요. 지금은 시연 장면만 열려 있어요.</p><div class="places">';
  Object.keys(PLACES).forEach(k=>{
    o+='<div class="place'+(cur.place===k?' cur':'')+'"><div class="th">'+bgSVG(k,cur.season)+'</div><div class="nm">'+PLACES[k]+'<small>'+(cur.place===k?'지금 있는 곳':'아직 갈 수 없어요')+'</small></div></div>';
  });
  return o+'</div>';
}

function settingsHtml(fromTitle){
  const sub=ui.sub;
  const rootBack=fromTitle?['처음 화면','backTitle']:['장면으로','closeTab'];
  if(sub==='root'){
    const n=S?Object.keys(S.noticed).length:0;
    const row=(k,lb,v)=>'<button class="row" data-act="sub" data-v="'+k+'">'+lb+'<span class="v">'+(v||'')+'</span>'+ICON.go+'</button>';
    return head('설정',rootBack[0],rootBack[1])+'<div class="pc">'+row('reading','읽기 설정',pref.fs+'px · '+THEME_NAME[pref.theme]+(pref.dim?' · 밝기 '+['','조금 낮게','낮게'][pref.dim]:''))+row('sound','소리',pref.sound?'켬':'끔')+row('save','저장과 불러오기',S?('노트 '+n+'줄'):'')+row('library','이야기 서재','본편 30장 · 번외 7편')+row('chars','인물 사전','16명')+row('about','정보','')+row('log','업데이트 기록','지금 '+CHANGELOG[0].v)+'</div>';
  }
  const back=(lb,v)=>head(lb,sub==='reader'?'서재':'설정',sub==='reader'?'sub':'sub',sub==='reader'?'library':'root');
  if(sub==='reading'){
    const seg=(k,lb)=>'<button class="'+(pref.theme===k?'on':'')+'" data-act="theme" data-v="'+k+'">'+lb+'</button>';
    return back('읽기 설정')+'<div class="pc"><div class="field">글자 크기<span class="seg"><button data-act="fs" data-v="-1">작게</button><span style="align-self:center;font-size:13px;color:var(--soft);min-width:3em;text-align:center">'+pref.fs+'px</span><button data-act="fs" data-v="1">크게</button></span></div><div class="field">화면<span class="seg">'+seg('auto','자동')+seg('light','밝게')+seg('paper','종이')+seg('dark','어둡게')+'</span></div><div class="field">밝기<span class="seg">'+[0,1,2].map(k=>'<button class="'+((pref.dim||0)===k?'on':'')+'" data-act="dim" data-v="'+k+'">'+['보통','조금 낮게','낮게'][k]+'</button>').join('')+'</span></div><p class="note-s">이야기 본문과 서재에 같이 적용돼요. 읽는 화면 오른쪽 위 단추로도 밝게·종이·어둡게를 바로 바꿀 수 있어요.</p></div>';
  }
  if(sub==='sound'){
    return back('소리')+'<div class="pc"><div class="field">배경 소리<span class="seg"><button class="'+(pref.sound?'on':'')+'" data-act="sound" data-v="1">켬</button><button class="'+(!pref.sound?'on':'')+'" data-act="sound" data-v="0">끔</button></span></div><p class="note-s">소리 파일은 아직 없어요. 켜 두면 준비되는 대로 계절 소리가 재생돼요.</p></div>';
  }
  if(sub==='save'){
    const code=S?btoa(JSON.stringify(S)):'';
    let o=back('저장과 불러오기')+'<div class="pc"><p class="note-s" style="padding-top:0">이 기기의 브라우저에 자동으로 저장돼요. 다른 기기로 옮기려면 저장 코드를 복사해 두세요.</p>';
    if(S){
      o+='<div class="field">현재 장면<span style="color:var(--soft);font-size:13px">'+esc(SCENES[S.scene].chLabel)+'</span></div><div class="field">저장 코드<button data-act="toggleCode">'+(ui.code?'숨기기':'보기')+'</button></div>';
      if(ui.code) o+='<textarea id="codeOut" readonly>'+code+'</textarea><div style="margin-top:8px"><button data-act="copyCode">코드 복사</button></div>';
    } else o+='<div class="empty" style="padding:24px 0"><b>저장된 이야기가 없어요</b>새로 시작하면 자동으로 저장돼요.</div>';
    o+='<div class="field" style="margin-top:12px;display:block">불러오기<textarea id="codeIn" placeholder="저장 코드를 붙여 넣으세요" style="margin-top:8px"></textarea><div style="margin-top:8px"><button data-act="importCode">불러오기</button></div></div>';
    if(ui.msg) o+='<div class="msg">'+esc(ui.msg)+'</div>';
    o+='<div class="field" style="display:block">처음부터 다시';
    if(ui.confirm) o+='<div class="note-s">저장된 이야기가 지워져요. 처음부터 시작할까요?</div><div class="seg"><button data-act="cancelNew">취소</button><button data-act="doNewGame">처음부터 시작</button></div>';
    else o+='<div style="margin-top:8px"><button data-act="askNew">처음부터 다시 시작</button></div>';
    return o+'</div></div>';
  }
  if(sub==='library') return back('이야기 서재')+'<div class="pc"><ul class="toc">'+tocHtml()+'</ul></div>';
  if(sub==='reader') return readerHtml();
  if(sub==='chars'){
    let o=back('인물 사전')+'<div class="pc">';
    DICT.forEach(d=>{ o+='<div class="chr"><div class="av">'+figSVG(d.id)+'</div><div><h4>'+d.name+'</h4><div class="rl">'+d.role+'</div><p>'+d.desc+'</p></div></div>'; });
    return o+'</div>';
  }
  if(sub==='log') return logHtml(back);
  if(sub==='about') return back('정보')+'<div class="pc"><div class="field">버전<span style="color:var(--soft);font-size:13px">'+CHANGELOG[0].v+'</span></div><div class="field">플레이할 수 있는 장면<span style="color:var(--soft);font-size:13px">1권 전체 · 2권 10~16장</span></div><div class="field">이야기 서재<span style="color:var(--soft);font-size:13px">본편 30장 · 번외 7편</span></div><p class="note-s">《트로네 공작가의 아델라인》. 배경과 인물은 코드로 그린 픽셀 그림이에요. 나중에 실제 일러스트로 바꿔 끼울 수 있게 만들어 두었어요.</p></div>';
  return '';
}
// 업데이트 기록: 한 장에 한 판씩. 왼쪽으로 넘기면(또는 오른쪽 단추) 더 이전 업데이트.
function logHtml(back){
  const n=CHANGELOG.length, i=Math.max(0,Math.min(n-1,ui.logPage||0)), e=CHANGELOG[i];
  return back('업데이트 기록')+'<div class="pc"><div class="logpage'+(ui.logDir?' turn-'+ui.logDir:'')+'" id="logpage">'
    +'<div class="logv">'+esc(e.v)+'</div><div class="logd">'+esc(e.date)+(i===0?' · 지금 판':'')+'</div><h3 class="logt">'+esc(e.title)+'</h3>'
    +'<ul class="logl">'+e.items.map(t=>'<li>'+esc(t)+'</li>').join('')+'</ul></div>'
    +'<div class="lognav"><button data-act="logp" data-v="-1"'+(i===0?' disabled':'')+'>‹ 최근</button><span>'+(i+1)+' / '+n+'</span><button data-act="logp" data-v="1"'+(i===n-1?' disabled':'')+'>이전 ›</button></div>'
    +'<p class="note-s">왼쪽으로 밀면 이전 업데이트, 오른쪽으로 밀면 최근 업데이트로 넘어가요.</p></div>';
}
function turnLog(d){ const n=CHANGELOG.length, j=(ui.logPage||0)+d; if(j<0||j>=n) return; ui.logPage=j; ui.logDir=d>0?'next':'prev'; draw(); ui.logDir=null; }
function tocHtml(){
  let h='',v=0;
  CHAPTERS.forEach(c=>{ const cv=volOf(c.n); if(cv!==v){ v=cv; h+='<li class="vol">'+VOLS[v]+'</li>'; }
    h+='<li><button class="it" data-act="chap" data-n="'+c.n+'"><span class="no">'+chLabel(c)+'</span><span class="tt">'+c.title+'</span><span class="se">'+c.season+'</span></button></li>'; });
  return h;
}
function readerHtml(){
  const c=CHAPTERS.find(x=>x.n===ui.chap); if(!c) return '';
  const i=CHAPTERS.indexOf(c), prev=CHAPTERS[i-1], next=CHAPTERS[i+1];
  let o=head(chLabel(c),'서재','sub','library',true)+'<div class="pc"><article class="chapter"><div class="meta">'+VOLS[volOf(c.n)]+' · '+c.season+'</div><h3>'+c.title+'</h3>'+renderText(c.text);
  if(c.branches){
    const groups=[]; c.branches.forEach(b=>{ let g=groups.find(x=>x.t===b.group); if(!g){ g={t:b.group,items:[]}; groups.push(g);} g.items.push(b); });
    o+='<section class="fork"><h4>이야기가 갈라지는 곳</h4><p class="hint2">읽고 싶은 길을 하나 고르세요. 어느 길이든 마지막 장면은 같아요.</p>';
    groups.forEach(g=>{ o+='<div class="ft">'+g.t+'</div>'; g.items.forEach(b=>{ o+='<button class="fb'+(ui.fork===b.id?' on':'')+'" data-act="branch" data-id="'+b.id+'">'+b.label+'</button>'; }); });
    const b=c.branches.find(x=>x.id===ui.fork);
    if(b) o+='<div class="epi" id="epi"><h5>'+b.label+'</h5>'+renderText(b.text)+'<hr>'+renderText(c.closing)+'<p class="end">《트로네 공작가의 아델라인》은 여기까지예요.<br>위에서 다른 길도 읽어 보세요.</p></div>';
    o+='</section>';
  }
  o+='<div class="pager"><button data-act="chap" data-n="'+(prev?prev.n:'')+'" class="'+(prev?'':'ghost')+'">이전 장</button><button data-act="chap" data-n="'+(next?next.n:'')+'" '+(next?'':'class="ghost"')+'>다음 장</button></div></article></div>';
  return o;
}

function resetGame(){ S=freshSave(); persist(); ui={screen:'game',tab:null,sub:'root',chap:null,fork:null,confirm:false,msg:'',code:false,keep:'top'}; draw(); }

document.addEventListener('click',e=>{
  const el=e.target.closest('[data-act]'); if(!el) return;
  const act=el.dataset.act, v=el.dataset.v;
  switch(act){
   case 'continue': ui.screen='game'; ui.tab=null; break;
   case 'new': if(S){ ui.confirm=true; } else { resetGame(); return; } break;
   case 'cancelNew': ui.confirm=false; break;
   case 'doNew': ui.confirm=false; resetGame(); return;
   case 'doNewGame': ui.confirm=false; S=freshSave(); persist(); ui.tab=null; ui.sub='root'; ui.screen='game'; ui.keep='top'; break;
   case 'askNew': ui.confirm=true; break;
   case 'titleSettings': ui.screen='titleSettings'; ui.sub='root'; break;
   case 'backTitle': ui.screen='title'; ui.sub='root'; break;
   case 'tab': ui.tab=(ui.tab===el.dataset.tab)?null:el.dataset.tab; ui.sub='root'; ui.confirm=false; ui.msg=''; break;
   case 'closeTab': ui.tab=null; ui.sub='root'; break;
   case 'sub': ui.sub=v; ui.confirm=false; ui.msg=''; if(v==='log') ui.logPage=0; break;
   case 'logp': turnLog(+v); return;
   case 'chap': if(el.dataset.n){ ui.chap=+el.dataset.n; ui.sub='reader'; ui.fork=null; ui.keep='top'; const pn=$('.panel'); if(pn) pn.scrollTop=0; } break;
   case 'branch': ui.fork=el.dataset.id; draw(); { const ep=$('#epi'); if(ep&&ep.scrollIntoView) ep.scrollIntoView({block:'start'}); } return;
   case 'fs': pref.fs=Math.max(14,Math.min(26,pref.fs+(+v))); applyPref(); break;
   case 'theme': pref.theme=v; applyPref(); break;
   case 'qtheme': { const order=['light','paper','dark']; pref.theme=order[(order.indexOf(curTheme())+1)%3]; applyPref(); break; }
   case 'dim': pref.dim=+v; applyPref(); break;
   case 'sound': pref.sound=v==='1'; applyPref(); break;
   case 'toggleCode': ui.code=!ui.code; break;
   case 'copyCode': { const ta=$('#codeOut'); if(ta){ ta.select(); try{ navigator.clipboard.writeText(ta.value); ui.msg='복사했어요.'; }catch(err){ ui.msg='선택된 코드를 직접 복사해 주세요.'; } } break; }
   case 'importCode': { const ta=$('#codeIn'); let ok=false; try{ const j=JSON.parse(atob((ta.value||'').trim())); if(j&&SCENES[j.scene]){ S={scene:j.scene,noticed:j.noticed||{},flags:j.flags||{},crossed:j.crossed||{}}; if(j.endAt) S.endAt=j.endAt; if(S.scene==='send') resumeFromEnd(S); persist(); ok=true; } }catch(err){} ui.msg=ok?'불러왔어요.':'코드를 읽지 못했어요. 다시 확인해 주세요.'; break; }
   case 'endNo': ui.confirmEnd=false; break;
   case 'endYes': ui.confirmEnd=false; resetGame(); return;
   case 'notice': { const id=el.dataset.id; if(!S.noticed[id]){ S.noticed[id]=Date.now(); persist(); } break; }
   case 'choice': {
     const sc=SCENES[S.scene], c=sc.choices[+el.dataset.i]; if(!c) return;
     if(c.flag) S.flags[c.flag]=1;
     if(c.note&&!S.noticed[c.note]) S.noticed[c.note]=Date.now();   // 선택으로 노트에 적기
     if(c.cross&&S.noticed[c.cross]){ if(!S.crossed) S.crossed={}; S.crossed[c.cross]=Date.now(); }   // 노트 줄 긋기
     if(c.go==='notes'){ ui.tab='notes'; }
     else if(c.go==='library'){ ui.tab='settings'; ui.sub='reader'; ui.chap=c.chap||4; ui.fork=null; }
     else if(c.go==='restart'){ ui.confirmEnd=true; }
     else if(c.next){ S.scene=c.next; if(c.next==='send') S.endAt=LAST_CH; ui.keep='top'; }
     persist(); break;
   }
   default: return;
  }
  draw();
  if(act==='choice'){ const tb=$('#tb'); if(tb) tb.scrollTop=0; }
});
// 업데이트 기록 넘기기: 손가락으로 밀기
let swX=null, swY=null;
document.addEventListener('touchstart',e=>{ const t=e.target.closest&&e.target.closest('#logpage'); if(!t) { swX=null; return; } swX=e.touches[0].clientX; swY=e.touches[0].clientY; },{passive:true});
document.addEventListener('touchend',e=>{ if(swX===null) return; const dx=e.changedTouches[0].clientX-swX, dy=e.changedTouches[0].clientY-swY; swX=null; if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.5) turnLog(dx<0?1:-1); },{passive:true});
document.addEventListener('keydown',e=>{
  if(ui.sub==='log'&&document.getElementById('logpage')){ if(e.key==='ArrowLeft'){ turnLog(-1); return; } if(e.key==='ArrowRight'){ turnLog(1); return; } }
  if((e.key==='Enter'||e.key===' ')&&e.target&&e.target.getAttribute&&e.target.getAttribute('role')==='button'){ e.preventDefault(); e.target.click(); }
});
applyPref();
draw();
