# 트로네 공작가의 아델라인 — 프로젝트 지침서 (Claude Code용)

## 한 줄 요약
로맨스 판타지 소설 《트로네 공작가의 아델라인》(본편 4권 30장 + 번외 7편)을 **정사(正史)** 로 삼고, 같은 세계를 "살아 보는" **텍스트 어드벤처 + 픽셀아트 게임**을 만든다. 단일 HTML 파일 하나로 동작한다. 소설 전문은 게임의 **설정 탭 → 이야기 서재**에서 읽을 수 있다.

## 사용자(제작자)의 방향 — 반드시 지킬 것
- 한국어로 대화한다. 존댓말, 따뜻하지만 군더더기 없이.
- **도파민 게임이 아니다.** 점수·게이지·보상음·알림·반짝임 금지. 몰입, 잔잔한 일상 힐링, 가끔 자극.
- 오스틴식 줄거리: 악당 없음, 결점이 곧 갈등, 오해와 첫인상, 작은 행동으로 풀리는 갈등.
- 주인공은 **아델라인 고정**(소설 정사를 따름). 외형: **은빛 머리를 길게 땋음**, 푸른 보라빛 눈, 푸른 드레스.
- 이야기 서재는 **처음부터 전부 열람** 가능(스포일러 방지 안 함).
- 화면 연출: **배경 + 인물 스탠딩(픽셀아트)**. 로판 웹툰풍/스타듀밸리급 도트를 원하지만, 코드로 그린 도트에는 한계가 있다. Google Flow 등 이미지 생성 도구로 만든 그림을 사용자가 나중에 가져올 수 있으니 **이미지 파일로 갈아 끼울 수 있는 구조를 유지**한다 (아래 "그림 교체").
- 플레이어가 모르는 사이에 만든 "알아차림 → 선택지/장면 변화" 구조가 이 게임의 핵심 메커니즘이다.
- 소설 본문 문장은 마음대로 고치지 않는다. 고칠 때는 연대·설정 충돌을 먼저 확인한다 (docs/canon.md).


## 의사결정 규칙 — 중요한 결정은 반드시 사용자에게 묻는다
이 프로젝트의 제작자는 비개발자이고 **방향을 직접 정하고 싶어 한다.** 아래 경우에는 **구현하기 전에 멈추고** 물어본다 (Claude Code에서는 `AskUserQuestion` 도구가 있으면 그것으로, 없으면 번호 선택지로).

### 반드시 묻는 것
- 소설 정사 변경: 줄거리·인물 성격·연대·호칭·엔딩 구조, 본문 문장 수정
- 게임 톤을 바꿀 수 있는 것: 점수·수치·보상·알림·타이머·결제성 요소 추가, 선택지의 "정답/오답" 느낌이 생기는 설계
- 그림 방향: 화풍·해상도·인물 외형(머리색, 옷)·표정 추가·배경 구성 변경, 외부 이미지 도입
- 로드맵에 없는 새 기능, 로드맵 순서 변경, 기존 기능 삭제·단순화
- 선택지가 갈리는 분기 설계 (어떤 알아차림이 어떤 결과를 바꾸는지) — **초안을 제시하고 승인받는다**
- 저장 형식·장면 id 변경처럼 기존 저장 데이터를 깨뜨릴 수 있는 것
- 작업량이 큰 선택 (예: 한 번에 몇 장을 만들지, 갈래 엔딩을 어느 분량으로)
- 두 가지 이상의 합리적인 방법이 있고 결과가 눈에 띄게 달라지는 모든 경우

### 묻지 않고 진행해도 되는 것
- 로드맵·지침서에 이미 적힌 작업, 버그 수정, 테스트 추가, 리팩터링(동작 불변)
- 코드 구조·변수명 같은 내부 구현, 단순 오탈자
- 이미 사용자가 정한 결정(위 "사용자의 방향")을 그대로 따르는 것

### 묻는 방법
1. 한 번에 **질문 1~3개**. 각 질문에 **선택지 2~4개**와 **추천 하나(이유 한 줄)** 를 붙인다.
2. 전문용어를 쓰지 않는다. "무엇이 달라 보이는지"를 예시 문장·화면으로 설명한다.
3. 가정을 해야 하면 "이렇게 가정했다"를 먼저 말하고, 되돌리기 쉬운 쪽을 고른다.
4. 사용자가 "알아서 해 줘"라고 하면 추천안으로 진행하되 무엇을 정했는지 요약해 남긴다.

### 단계마다 미리 보기를 준다
- 의미 있는 단위(장 하나, 기능 하나)를 끝낼 때마다 `npm run build` 후 **`dist/game.html` 경로와 여는 방법**을 알려 주고, 확인할 포인트를 3개 이내로 적어 준다.
- 화면이 바뀌면 `npm run shots` 로 캡처를 보고 스스로 이상한 점을 먼저 고친 뒤 보여 준다.
- 사용자가 본 뒤 "수정해 줘 / 이대로 진행"을 고르게 한다. 승인 없이 다음 장으로 넘어가지 않는다 (작은 버그 수정은 예외).

## 폴더 구조
```
CLAUDE.md                  이 문서
docs/canon.md              세계관·인물·연대표 (정사)
docs/roadmap.md            다음 작업 목록과 1권 4~9장 장면 설계
src/head.html              HTML 머리말 + 전체 CSS
src/novel/                 소설 전문 CHAPTERS (정사). 장마다 한 파일: 01.js~30.js 본편, 31~37.js 번외, _base.js 가 배열 선언
src/art_core.js            픽셀 엔진(PX: 점·사각형·타원·선·다각형·마스크·한꺼번에 찍기 paint), 색 섞기, 계절 팔레트, 난수
src/art_sprites.js         인물 스프라이트 56×132 (FIG 정의 + sprite(id, expr))
src/art_bg.js              배경 240×160 (BG 함수들) + 무대 합성(stageSVG) + 인물 사전 아바타 + 타이틀
src/scenes/                게임 장면. ch01.js~ch30.js = 그 장의 SCENES + NOTICES (장 하나 고칠 때 그 파일만 열면 됨),
                           letters.js 편지 LETTERS, dict.js 인물 사전 DICT, _base.js 그릇 선언
src/changelog.js           업데이트 기록 CHANGELOG (설정 → 업데이트 기록, 왼쪽으로 넘기는 페이지). **업데이트할 때마다 맨 앞에 한 항목 추가**
src/app.js                 화면(타이틀·게임·탭·설정·서재), 저장, 이벤트
tools/sources.js           src 파일 순서(빌드·검사 공통)와 데이터 읽기 도우미 load('scenes','SCENES,…')
tools/build.sh             src → dist/game.html 합치기 (순서는 sources.js)
tools/check_scenes.js      장면 데이터 정합성 검사
tools/dump_paras.js        소설 단락 앞부분 목록 (장면 만들 때 단락 찾기용)
test/test_real.js          실제 브라우저(헤드리스 크로미움) 통합 테스트
test/walk.js               장면별 스크린샷 캡처
test/gallery.js, sprites.js  배경·스프라이트 갤러리 캡처
reference/                 이미 게시된 소설 리더 단독 앱(HTML), 단락 덤프
wip/                       새 그림체를 만들던 작업 기록과 시안(게임에는 안 들어감, README 참고)
preview/                   사용자에게 보여 준 캡처 모음
dist/game.html             빌드 결과 (직접 편집 금지)
index.html, .nojekyll      GitHub Pages용 (빌드가 dist/game.html 을 그대로 복사, 직접 편집 금지)
```

## 빌드·테스트
```bash
npm install            # puppeteer-core, @sparticuz/chromium (헤드리스 크로미움 번들)
npm run check          # 장면 정합성 검사
npm run build          # dist/game.html 생성
npm run quick          # check + build + 빠른 브라우저 테스트 (무작위 플레이 30회, 약 35초) — 고칠 때마다 이것
npm test               # check + build + 전체 브라우저 테스트 (무작위 300회 + 실제 클릭으로 끝까지, 3~4분) — 올리기 전 한 번
npm run shots          # /tmp/w_*.png 로 장면별 캡처 (눈으로 확인)
```
- **그림·레이아웃을 바꾸면 반드시 스크린샷을 눈으로 확인**한다 (`test/walk.js`, `test/sprites.js`). 지금까지의 버그(언덕 색이 바닥까지 번짐, 안경 렌즈가 검은 네모, 긴 머리가 몸을 덮음 등)는 전부 캡처로 발견했다.
- 테스트 통과 ≠ 정상. 화면 문자열 검사는 `#app` 의 `innerText` 만 보라(소스 코드 문자열이 섞이면 거짓 통과한다 — 실제로 한 번 겪음).
- jsdom은 canvas가 없어 쓰지 않는다. 실제 브라우저로만 검증.
- 테스트는 실패하면 종료 코드 1로 끝난다(`npm test && git commit` 처럼 묶어 쓸 수 있음). 각 테스트 시간을 보려면 `TIMES=1`.

## 아키텍처 핵심
### 단일 파일 제약 (claude.ai 아티팩트로 게시할 때)
- 외부 스크립트·이미지·네트워크 요청 불가. 허용: Google Fonts 스타일시트(`fonts.googleapis.com`), `localStorage`(try/catch 필수).
- 이미지는 전부 코드로 생성한 canvas → `data:` URL. 외부 이미지를 쓰려면 **data URI로 인라인**해야 한다 (파일 크기 증가에 주의, 16MB 한도).
- 레이아웃: 모바일 우선, `viewport-fit=cover`, safe-area 패딩, 다크모드(`prefers-color-scheme` + 수동 토글 `data-theme`).
- 게시된 링크: 게임 https://claude.ai/artifact/4joCSZMCZAvyQKJXEEhhcb / 소설 리더 https://claude.ai/artifact/1ky3gVxXz73rgJ9iMgcTF1 (claude.ai의 Artifact 도구로만 갱신 가능). GitHub Pages: https://lewfot-crypto.github.io/rofan/ (**`main` 가지**의 맨 앞 `index.html` 을 게시. 작업을 마치면 `main` 에도 반영해야 페이지가 갱신된다 — 사용자 허락됨. 저장소 맨 앞 `index.html`, 빌드할 때 자동 복사. 공개 링크·로그인 불필요. 같은 주소의 adlvillage 와 저장 키가 겹치지 않음: 이 게임은 `adeline-game-*`, adlvillage 는 `amelia.*`).

### 화면 구조
- 화면 상태는 전역 `ui` 객체, 게임 상태는 `S`(저장 대상). 렌더는 `draw()` 가 `innerHTML` 로 통째로 다시 그리고, 클릭은 `document` 위임(`data-act`)으로 처리한다.
- 타이틀 → 게임(스테이지 + 본문 + 선택지) + 하단 탭 4개(노트, 편지, 저택, 설정). 설정 안에 읽기 설정·소리·저장·**이야기 서재**·인물 사전·정보.
- 스테이지와 본문은 **한 덩어리로 같이 스크롤**된다(`.scroller`). 그림이 위에 고정되면 읽기 불편하다는 피드백으로 고친 것이니 되돌리지 말 것.
- 패널(노트/편지/저택/설정)이 열리면 상단 상태줄은 숨긴다.

### 저장
- `localStorage` 키: `adeline-game-save` (`{scene, noticed:{id:타임스탬프}, flags:{}, crossed:{id:타임스탬프}}` — crossed는 줄 그은 노트, 없으면 {}로 채움), `adeline-game-pref` (글자 크기·테마·소리).
- 저장 코드(설정 → 저장과 불러오기)는 `btoa(JSON.stringify(S))`.
- 장면 id를 바꾸거나 지울 때는 `loadSave()` 에 이전 id 마이그레이션을 넣는다 (예: `s7 → c2a`).

### 장면 데이터 형식 (`src/scenes/chNN.js`)
```js
SCENES.c3c = {
  place:'kitchen', season:'겨울', age:'열 살', chLabel:'1권 · 3장 부엌의 소식통',
  time:'night',                                          // 선택: 밤이면 창이 밤하늘, 방이 어두워지고 불빛만 밝음 (인물도 어둡게)
  chars:[{id:'tangie', pos:'center', expr:'smile'}],     // pos: left|center|right, expr: neutral|smile|sad|worry|surprise
  paras:[
    '일반 단락. {{hands|밑줄 칠 문구}} 처럼 쓰면 눌러서 "알아차릴" 수 있다.',
    {t:'조건부 단락', if:'flagName'},        // 플래그가 있을 때만
    {t:'조건부 단락', not:'flagName'},       // 플래그가 없을 때만
    {t:'조건부 단락', ifN:'noticeId'},       // 해당 노트를 알아챘을 때만
    {t:'조건부 단락', notN:'noticeId'},      // 알아채지 못했을 때만
    {fn:'notebook'}                          // 플레이어가 실제로 적은 노트(1장 장면 것 최대 4개)를 보여 줌
  ],
  choices:[
    {label:'…', next:'c3d', flag:'offeredWater', req:'hands'},   // req: 해당 노트를 알아챈 경우에만 이 선택지가 보임
    {label:'…', next:'c3e', not:'hands'},                        // not: 알아챘다면 숨김
    {label:'…', go:'notes'}                                       // go: notes | library(+chap) | restart
  ],
  end:true, endTitle:'…'                                          // 끝 카드
};
NOTICES.hands = {scene:'c3c', text:'노트에 적히는 한 줄 (아델라인의 노트 어투)'};
// 선택지로 노트에 적기: choice에 note:'misread' → NOTICES.misread = {scene, byChoice:true, text} (밑줄 안내에서 빠짐)
// 장면 소품: props:['box'] (art_bg.js 의 PROPS)
```
- 모든 `{{id|…}}` 는 `NOTICES[id]` 가 있어야 하고 **같은 장면 소속**이어야 한다 (`npm run check` 가 검사).
- 새 장면은 그 장 파일의 `Object.assign(SCENES,{…})` 안에, 노트는 같은 파일 `Object.assign(NOTICES,{…})` 안에 넣는다.
- 문장은 가능하면 소설 본문(`src/novel/NN.js`)의 단락을 그대로 가져온다. 단락 위치는 `node tools/dump_paras.js 4 5` 로 확인.
- 노트 문장 어투: 짧은 평서문, 1인칭 관찰 기록 ("마로트 님은 …했다.").

### 핵심 메커니즘 = 알아차림
- 단서를 눌러야 노트에 적힌다 → 이후 **선택지 노출 / 장면 문장 / 인물 반응**이 달라진다. 안 알아챈 쪽이 "나쁜 결말"이 아니라 "다른 장면"이어야 한다 (벌 주지 않는다).
- 틀린 해석도 이야기가 된다 (오스틴식 오해). 6장에서 "나는 이 집에서 내 것을 가질 수 없다"를 적고 8장에서 줄을 긋는 구조를 계획 중 (docs/roadmap.md).
- 소설의 **큰 줄기는 고정**, 작은 선택의 결과는 몇 장 뒤에 돌아온다. 엔딩은 30장의 9갈래 구조를 따른다.

## 그림 시스템
### 현재 (코드로 그린 픽셀아트)
- 스테이지 캔버스 240×160. 배경은 `BG[place](o,P)` 함수들(`exterior, hall, bedroom, dining, study, orchard, kitchen, schoolroom, corridor, office, carriage`). `P = seasonPal(season)` 로 계절 팔레트(늦가을/겨울/봄/여름). 저택은 **대저택** 규모(사용자 결정).
- 그림체(2026-10 새로 그림, 사용자 승인): 스타듀풍. **점무늬(디더링) 금지**, 셀 음영(`celShade`) + 색 윤곽선(`outlinePass`), 얼굴은 점 지도(`ADE_HEAD`, `M_FACE`, `F_FACE`). 아이는 머리 크기 그대로 다리·치마 줄을 빼서 작게(`KID`). 작업 기록은 `wip/README.md`.
- 인물은 56×132 캔버스. `sprite(id, expr)` → `{c, feet, top}`. 인물별 그리는 함수는 `art_sprites.js` 의 `FIG` (adeSprite, tangieSprite, maleSprite, femSprite, boySprite, girlSprite, adultMale). 표정 5종 neutral·smile·sad·worry·surprise.
- 표시할 때 `<img class="px">` + CSS `image-rendering: pixelated`. 썸네일(저택 탭)은 `image-rendering:auto`.

### 그림 교체 (Flow 등으로 만든 일러스트가 생겼을 때)
`bgCanvas(place, season)`, `sprite(id, expr)` 두 함수의 반환값(canvas)만 이미지로 바꾸면 나머지는 그대로 동작한다.
1. 사용자가 PNG를 대화에 올리면 base64 data URI로 `src/assets.js` 에 넣는다 (배경 `bg_{place}_{season}.png`, 인물 `char_{id}_{expr}.png` 투명 배경).
2. `bgCanvas/sprite` 가 `ASSETS[...]` 에 같은 키가 있으면 `Image` → canvas 로 그려 반환하고, 없으면 지금처럼 코드로 그린다 (부분 교체 가능).
3. 화면 비율: 배경 3:2, 인물은 전신 투명 PNG(발 위치 맞추기 위해 `feet` 값 필요 → `sprite().feet`).
- 이미지 생성은 Claude가 직접 못 한다 (연결된 이미지 생성 도구 없음, Google Flow 연결도 없음을 확인함). 사용자가 따로 생성해 올려야 한다.

## 현재 구현 상태 (v1.1.1)
- 1.1.1(2026-10): 파일 정리(동작 불변). `src/scenes.js` → `src/scenes/`(장마다 한 파일), `src/chapters.js` → `src/novel/`(장마다 한 파일), 순서는 `tools/sources.js`. `npm run quick`(약 35초) 추가, 테스트 실패 시 종료 코드 1. 나누기 전후 데이터가 같은지 확인함(노트 줄 순서만 장 순으로 바뀜 — 노트 표시는 적은 시간 순이라 영향 없음).
- 1.1(2026-10): **일러스트 교체 구현.** `tools/add_art.py <원본> <이름>` 이 `art/<이름>.webp` 로 변환(배경 1200×800, 인물은 투명 테두리 잘라 세로 1000)하고 `src/assets.js`(`ART` 이름 집합)를 다시 만든다. 이름: `bg_<장소>_<계절|any>_<day|night>`, `ch_<인물>_<a|b|c|all>_<표정>`(a=1~14장, b=15~25장, c=26~30장). `app.js artStage()`: `pref.art==='illust'` 이고 배경·모든 인물 그림이 있을 때만 HTML 무대(배경 img + 인물 img, 높이 a72%/b84%/c90%/all92%), 밤 그림이 없으면 낮 그림을 어둡게, 표정이 없으면 같은 나이의 기본 표정. 소품(`props`) 있는 장면은 도트. build 가 `art/` 를 `dist/art` 로 복사. 받은 그림: 서재 낮(`bg_study_any_day`), 마로트 기본(`ch_marot_all_neutral`). 기준 그림 캡처는 `wip/ref/`.
- 1.0.1(2026-10): 홈 화면 아이콘(사용자 선택 A: 아델라인 얼굴 도트, 남색 바탕). `tools/make_icon.js` 가 dist 를 열어 그린 180px PNG 를 `src/head.html` 의 `apple-touch-icon` 에 data URI 로 넣음(그림을 바꾸면 build 후 다시 실행). 앱처럼 열기 메타(`apple-mobile-web-app-capable`, 제목 "아델라인"). 16~30장 검토 목록 `docs/review_16-30.md`(111개, 사용자 답 기다리는 중).
- 1.0(2026-10): **30장 완성 → 이야기 전체 플레이 가능.** 사용자 결정: 아홉 갈래 **모두 열어 둠**(앞 선택으로 잠그지 않음), 갈래마다 장면 2개, 홀트의 편지 네 통은 공통 마지막 장면 직전(`c30m`, 편지 `h1~h4`, open `gotHoltLetters`, 장면에는 제4신). 구조: `c30a`(공통 도입, 선택 9개 flag `end_<id>`) → 갈래 `c30k/j/l/s/w/d/f/t/r` + `1·2` → `c30m` → `c30y`·`c30z`(공통 현관) → `send`(끝 카드: "30장의 다른 길 걸어 보기"=`c30a` 로, 노트, 편지, 처음부터). 갈래 안 되돌림: 17장 `circledNorth/Home/Everhart`, 15장 `quietHand`, 20장 `promisedYul`, 25장 `willWait`, 5장 `gaveTea`, 23장 `answeredHadel`, 1장 `chair`, 19장 `special`, 23장 `eighteen`, 25장 `blueink`. 마지막 장면: 4장 `tookCoat/askedWhose` 가 "외투 입어라"에 한 줄. 갈래 본문은 `/tmp` 스크립트로 소설 단락을 그대로 옮김(문장 수정 없음). 배경 대신 씀: 북쪽 고개→과수원, 서쪽 절벽→저택 앞, 마탑·문서고→서재, 온실(우정)→정원.
- 0.15(2026-10): 4권 26~29장(장면 c26a~c29f). 사용자 "진행" → 추천안(검토 전). **소설 장 정보는 26·27장이 '여름'이지만 생일이 겨울(24·25장)이라 26~29장을 겨울로 둠.** 새 선택: 26장 `laughedDance`(소설)/`countedSteps`(28장 첫 춤에 한 줄), 27장 `keptLetter`(소설)/`sharedLetter`. 28·29장은 선택 없이 되돌림만: 25장 `willWait`(27장), 7장 `askedWatch`, 17장 `warmleather`, 12장 `nameit`, 15장 `quietHand`, 20장 `promisedYul`, 23장 `answeredHadel`(하델 대사 대체), 26장 `afraid`, 1장 `fingers`·`curtain`, 24장 `saidto`, 10장 `readCourage/readNoNeed`, 17장 `oneword`. 편지 `f18`(열여덟 살의 아델라인에게, open `readBirthdayLetter`). 끝 카드 "4권 29장까지". **다음은 30장 아홉 갈래 — 분량을 사용자에게 먼저 묻기로 함.**
- 0.14(2026-10): **3권 완성**(20~25장, 장면 c20a~c25f). 사용자 "20~25장 진행" → 추천안(검토 전). 새 선택: 20장 `thankedYul`(소설)/`promisedYul`, 21장 `teasedSerena`(소설)/`welcomedSerena`, 22장 `leftTangie`(소설)/`waitedOutside`, 23장 `silentHadel`(소설)/`answeredHadel`, 24장 `satWindow`(소설)/`stayedOpposite`, 25장 `wallAlways`(소설)/`willWait` — **30장 갈래(율리안·세레나·하델·아드리안 등)에서 다시 쓸 것**. 앞 장 되돌림: 11장 `toldThumb`(아니면 새 문장), 14장 `notYet/keptSilent`, 16장 `stroke`, 3장 `hands`·`tangerine`·`shoes`, 17장 `circledNorth`, 19장 `special`, 18장 `erasedSecretLine`·`sameangle`, 7장 `wroteMaybe`(아니면 "쓰지 못하고 덮었던"), 4장 `sugar`(첫날 두 조각), 5장 `keptTea`, 13장 `truth`, 15장 `fingertips`. 편지 `k8/a8`(`quietcastle` 알아채면 추측 단락), `k13`(25장 편지 더미, `gotLetter13`), `inv`(모두에게 보내는 초대장, `sentInvitation`, 받는 이 줄 없음 — `to:''` 이면 생략). 배경은 새로 그리지 않고 대신 씀: 온실→`palace`, 상단 접견실→`salon`, 마탑 서고→`study` (새 배경 후보).
- 0.13(2026-10): 3권 19장 완성(장면 c19a~c19h). 추천안: 잠든 마로트에게 `coatOn`(소설)/`freshTea`(새 문장, 4장 서재 앞 찻잔 회상), 7장 `askedWatch` → 시계 한 줄, 18장 `tornedge` → 한 줄. 카일런 **제3신·제4답**(`k3/a4`, open `gotLetter3/wroteLetter4`), 답장의 마로트 단락은 노트 `weatherman` 알아챘을 때만. 노트 `liarnum`·`special`·`whiteknuckle`·`shakycup`·`coldcups`·`clumsybow`·`eastbooks`·`weatherman`. 남은 편지: 제8신·제8답(가을, 21~23장 무렵), 제13신(이른 봄, 25장 무렵).
- 0.12(2026-10): 3권 18장 완성(장면 c18a~c18g, 열다섯 살). 사용자 "진행" → 추천안: 16장 `stroke` → 한 줄, 노트 셋째 줄 `keptSecretLine`(소설)/`erasedSecretLine`(새 문장, 15장 `thinpaper` 를 알아챘으면 한 줄 더). 끝에 카일런 **제2신·제2답**(`LETTERS.k2/a2`, open `gotLetter2/wroteLetter2`), 답장 둘째 단락은 노트 `slant` 를 알아챘을 때만(소설 제2답). 노트 `pageturn`·`penstop`·`tornedge`·`sameangle`·`sawnothing`·`slant`. 3권 이후 장마다 편지 한 쌍씩 이어 가기(번외 34: 제3신·제4답, 제8신·제8답, 제13신).
- 0.11(2026-10): 17장 완성(장면 c17a~c17f) → **2권 완성**. 사용자가 "일단 진행"이라 추천안으로 설계(검토는 나중에 하겠다고 함): 5장 성 선택 `nameSilent/nameTrone/nameEverhart` → 에드릭의 "네 이름은 둘이다" 뒤 회상 한 줄(새 문장), 12장 `heldSleeve` → 어깨를 쥔 손 한 줄, 16장 `stitch` → 새 소매 한 줄, 6장 `dustless` → 열쇠 구멍 한 줄. 지도책 첫 동그라미 `circledHome`(소설)/`circledNorth`/`circledEverhart` — **30장 갈래(가문·북부·독립)에서 다시 쓸 것**. 노트 `emptyspot`·`hidingsmile`·`newcuff`·`ribbon`·`warmleather`·`oneword`·`scratch`·`keyhole`. 무작위 플레이 테스트가 길어져 `test/launch.js` 에 `protocolTimeout`.
- 0.10(2026-10): 16장 완성(장면 c16a~c16g). 2장 노트 `tremble` → 기침 장면에 한 줄(새 문장). 아버지의 편지 `LETTERS.e1`(open `readFatherLetter`, 서명 없음 — `sign:''` 이면 서명 줄 생략). 점심 `kitchenLunch`(소설)/`schoolLunch`(새 문장: 대화 과목, 공부방 점심). 노트 `stitch`·`cough`·`pity`·`stroke`·`twomonths`. 홀트의 부치지 않은 편지 네 통(번외 33)은 **4권 끝(18세 생일 밤 뒤)** 에 건네받는 장면으로(사용자 결정).
- 0.9(2026-10): 15장 완성(장면 c15a~c15h). 9장 `askedGlove`(아니면 새 문장 "내 장갑을 보고 있었다")·10장 `spokeUp`(카일런이 마차 앞 말을 기억하는 새 문장)이 발코니 고백을 바꿈. 대답 `saidCaught`(소설)/`quietHand`(새 문장). 노트 `stillglove`·`chin`·`fingertips`·`flatvoice`·`ears`·`thinpaper`. **편지 탭** 열림: `LETTERS`(src/scenes/letters.js, `open` flag 가 켜지면 탭에 보임, 단락 조건 if/not/ifN/notN), 장면 본문 `{fn:'letter',id}`. 제1신(`gotLetter1`)·제1답(`wroteLetter1`, `thinpaper` 알아채면 지운 흔적 단락). 발코니는 무도회장 밤 배경. 마차 밤 장면은 창이 별 하늘. 이후 편지(번외 4의 제2신~)는 16장 이후 장 사이에 둘 것.
- 0.8(2026-10): 14장 완성(장면 c14a~c14g). 연습 중 대답 `notYet`(소설)/`keptSilent`(새 문장 두 줄) → 마지막 노트 둘째 줄이 달라짐. 노트 `heel`(뒤꿈치)을 알아챘다면 무도회에서 "미리 알고 있었다", 못 알아챘다면 그 자리에서 `halfbeat`. 덮어 주는 행동은 공통(정사). 노트 `shadow`·`knuckle`·`posture`·`heavy`. 탈의실은 무도회장 밤(`time:'night'`, 밤이면 춤추는 사람 그림자 숨김). 21장 〈세레나의 선택〉에서 `notYet/keptSilent`·`heel` 다시 쓸 것.
- 0.7(2026-10): 설정 맨 아래 **업데이트 기록**(한 페이지에 한 판, 왼쪽으로 밀면 이전 판, ‹ › 단추·방향키도 됨). 13장 완성(장면 c13a~c13f): 로잘리 말버릇 노트 `notbig` → 회상 단락이 보이고 "저는 알고 있었어요"(`knewRosalie`), 아니면 "나쁜 사람이 아니라는 건 알아요"(`trustedRosalie`). 노트 `obliged`(신세)·`truth`. 이후 장에서 로잘리 장면에 다시 쓸 것.
- 0.6 정리(2026-10): 옛 점무늬 그림 함수 삭제, 점 찍기를 한꺼번에(`o.paint`) 처리해 인물 그림 생성이 약 50배 빨라짐(80장 11초→0.2초), `npm run check` 가 조건 flag 오타·배경 없는 장소·적을 길 없는 노트까지 검사, 테스트에 무작위 플레이 300회(막다른 장면·빈 장면·도달 못 하는 장면 검사).
- 완성: 실행화면, 게임 화면, 4개 탭, 설정(읽기·소리·저장·서재·인물 사전·정보), 소설 전문 열람(본편 30장 + 번외 7편, 30장 아홉 갈래 선택 UI), 새 그림체 배경 11곳(대저택)·인물 16명·표정 5종, 밤 장면(`time:'night'`).
- 플레이 가능: **1~30장 전체** (장면 227개, 편지 16통, 노트 198줄). 끝 카드 "그 후의 계절".
- 12장(사용자 승인): 정원 모임 `walkedOut`/`rebutted`, 무도회 `heldSleeve`/`stoodBy`. 새 배경 `garden`(양산 탁자 정원), `ballroom`(무도회장, 4권에서도 사용).
- 11장(사용자 승인): `willGo`/`askedMeaning`, 황후에게 `notEmpty`/`justQuiet`, 율리안 비밀 `toldThumb`(노트 `thumb` 필요, 이후 "율" 호칭 장면에 씀)/`politeJulian`. 새 배경 `palace`(황궁 정원 다과회, PLACES 밖). 로잘리 그림: 주근깨·색이 다른 리본 두 개(소설대로, 사용자 승인). 세레나는 그림 유지(머리를 올린 소설 묘사와 다름, 사용자 결정). 2권은 사용자 결정으로 **한 장씩 설계 승인** 후 제작.
- 10장(사용자 승인): 편들기 `defended`(노트 `latelaugh` 필요)/`justWatched`, 떠나는 카일런에게 `saidBye`/`spokeUp`(15장 화해에서 다시 씀), 서명 없는 노트 해석 `readCourage`(노트 `courage`)/`readNoNeed`(노트 `noneed`). 편지 탭은 15장(첫 편지)과 함께 연다.
- 9장(사용자 승인): 장갑 질문 `askedGlove`(노트 `glove` 필요)/`silentGlove` — 2권 카일런 편지·재회 장면에서 다시 쓸 것. 마지막 줄 노트 `slowly`.
- 8장(사용자 승인): `dustless` → "빼앗은 게 아니었네요"(`notTaken`) / "그랬군요"(`soItWas`). 노트 줄 긋기 choice `cross:'misread'`(`crossedLine`) / 긋지 않음(`keptLine`) / 오해 노트가 없으면 `newLine`. 모두 노트 `gladWrong`. 줄 그은 노트는 `S.crossed` 에 저장, 노트 탭·본문에서 `<del>`.
- 7장(사용자 승인): 1장 `notebook` 노트 → 회색 노트 고백(`graynote`), `clock` → 홀트의 시계 말과 연결, `lie` → 의역 장면 한 줄. 선택: 시계 `notAskedWatch`/`askedWatch`, 마지막 줄 `wroteMaybe`(노트 `maybeNot`, `graynote` 필요)/`closedNote`.
- 6장 분기(사용자 승인): 안경 `tookGlasses`/`onlyLooked`, 오해의 노트 `wroteMisread`(노트 `misread`)/`wroteNothing`. 8장에서 `misread` 에 줄 긋기, `dustless` 사용.
- 5장 분기(사용자 승인): 성 선택 `nameTrone`/`nameEverhart`/`nameSilent`(2권 이후 아드리안 장면에 다시 쓸 것), 차 `gaveTea`/`keptTea`.
- 4장 분기(사용자 승인): 설탕 두 조각/넣지 않음(`sugar`/`noSugar`, 8장에서 다시 쓸 예정), "원하지 않아요"/"말씀하셔도 돼요"(`noTell`/`mayTell`), 누구의 말인지 묻기/외투(`askedWhose`/`tookCoat`). 노트 표시 `{fn:'notebook', pre:'c4', empty:'…'}`.
- **그림 교체 방식(사용자 결정)**: 설정에 "그림: 도트 / 일러스트"를 두고, 일러스트가 아직 없는 장면만 도트로 보인다. 첫 일러스트가 오면 실제 그림으로 위치·크기를 맞추며 만든다(배경 3:2, 인물 전신 2:3 투명 PNG, `art/` 폴더에 따로 두고 GitHub Pages 판에서 읽기 — 한 파일 아티팩트 판은 도트 유지). 그림은 사용자가 **Claude 대화에 이미지로 붙임** — 붙인 이미지는 `/root/.claude/uploads/<세션>/` 에 파일로 저장됨(2026-10 확인). 사용자가 목록 번호(예: "② 마로트 기본", "B11")를 함께 적어 줌. 나이 구간 이름: 어린 시절(1~14장)·자라는 시절(15~25장)·성인식 무렵(26~30장).
- 미구현: 저택 탭의 장소 이동, 소리(설정에 켬/끔은 있으나 소리 없음), 그림 목록·ChatGPT 문장은 `docs/art_prompts.md`.
- 앞으로 다시 쓸 1권 플래그: 성 `nameTrone/nameEverhart/nameSilent`(아드리안), 차 `gaveTea/keptTea`, 설탕 `sugar/noSugar`, `mayTell`, 장갑 `askedGlove/silentGlove`, 줄 긋기 `crossedLine/keptLine`.
- 실행 화면(0.8.1, 사용자 선택): 해 질 녘 마차 창 150×300 (`titleCarriage`), 제목 금빛 명조 + 장식선, 단추 금테 고전풍. 부제 문구 없음.
- 읽기 화면: 테마 자동/밝게/종이/어둡게 + 밝기 3단계(`pref.dim`), 상태줄·서재 본문 오른쪽 위 빠른 단추(`qtheme`).

## 다음 할 일
`docs/roadmap.md` 참고. 우선순위: ① 사용자가 미뤄 둔 16~30장 검토(새 문장·선택지) ② 새 배경 후보(온실, 남쪽 상단, 마탑 서고, 북쪽 고개, 서쪽 절벽, 문서고) ③ 저택 탭 장소 이동·소리  ③ 이른 봄 배경 등 그림 보강. (1권 완료) (`corridor`/`office` 배경은 완료)
