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
src/chapters.js            소설 전문 CHAPTERS 배열 (본편 1~30장 + 번외 31~37). 편집 대상이자 정사
src/art_core.js            픽셀 엔진(PX), 팔레트, 음영(mask+shade), 난수
src/art_sprites.js         인물 스프라이트 56×132 (FIG 정의 + sprite(id, expr))
src/art_bg.js              배경 240×160 (BG 함수들) + 무대 합성(stageSVG) + 인물 사전 아바타 + 타이틀
src/scenes.js              게임 장면 SCENES / 노트 NOTICES / 인물 사전 DICT
src/app.js                 화면(타이틀·게임·탭·설정·서재), 저장, 이벤트
tools/build.sh             src → dist/game.html 합치기
tools/check_scenes.js      장면 데이터 정합성 검사
tools/dump_paras.js        소설 단락 앞부분 목록 (장면 만들 때 단락 찾기용)
test/test_real.js          실제 브라우저(헤드리스 크로미움) 통합 테스트
test/walk.js               장면별 스크린샷 캡처
test/gallery.js, sprites.js  배경·스프라이트 갤러리 캡처
reference/                 이미 게시된 소설 리더 단독 앱(HTML), 단락 덤프
dist/game.html             빌드 결과 (직접 편집 금지)
```

## 빌드·테스트
```bash
npm install            # puppeteer-core, @sparticuz/chromium (헤드리스 크로미움 번들)
npm run check          # 장면 정합성 검사
npm run build          # dist/game.html 생성
npm test               # check + build + 브라우저 통합 테스트
npm run shots          # /tmp/w_*.png 로 장면별 캡처 (눈으로 확인)
```
- **그림·레이아웃을 바꾸면 반드시 스크린샷을 눈으로 확인**한다 (`test/walk.js`, `test/sprites.js`). 지금까지의 버그(언덕 색이 바닥까지 번짐, 안경 렌즈가 검은 네모, 긴 머리가 몸을 덮음 등)는 전부 캡처로 발견했다.
- 테스트 통과 ≠ 정상. 화면 문자열 검사는 `#app` 의 `innerText` 만 보라(소스 코드 문자열이 섞이면 거짓 통과한다 — 실제로 한 번 겪음).
- jsdom은 canvas가 없어 쓰지 않는다. 실제 브라우저로만 검증.

## 아키텍처 핵심
### 단일 파일 제약 (claude.ai 아티팩트로 게시할 때)
- 외부 스크립트·이미지·네트워크 요청 불가. 허용: Google Fonts 스타일시트(`fonts.googleapis.com`), `localStorage`(try/catch 필수).
- 이미지는 전부 코드로 생성한 canvas → `data:` URL. 외부 이미지를 쓰려면 **data URI로 인라인**해야 한다 (파일 크기 증가에 주의, 16MB 한도).
- 레이아웃: 모바일 우선, `viewport-fit=cover`, safe-area 패딩, 다크모드(`prefers-color-scheme` + 수동 토글 `data-theme`).
- 게시된 링크: 게임 https://claude.ai/artifact/4joCSZMCZAvyQKJXEEhhcb / 소설 리더 https://claude.ai/artifact/1ky3gVxXz73rgJ9iMgcTF1 (claude.ai의 Artifact 도구로만 갱신 가능. Claude Code에서는 `dist/game.html` 만 만들면 되고, 정적 호스팅(예: GitHub Pages)에도 그대로 올릴 수 있다).

### 화면 구조
- 화면 상태는 전역 `ui` 객체, 게임 상태는 `S`(저장 대상). 렌더는 `draw()` 가 `innerHTML` 로 통째로 다시 그리고, 클릭은 `document` 위임(`data-act`)으로 처리한다.
- 타이틀 → 게임(스테이지 + 본문 + 선택지) + 하단 탭 4개(노트, 편지, 저택, 설정). 설정 안에 읽기 설정·소리·저장·**이야기 서재**·인물 사전·정보.
- 스테이지와 본문은 **한 덩어리로 같이 스크롤**된다(`.scroller`). 그림이 위에 고정되면 읽기 불편하다는 피드백으로 고친 것이니 되돌리지 말 것.
- 패널(노트/편지/저택/설정)이 열리면 상단 상태줄은 숨긴다.

### 저장
- `localStorage` 키: `adeline-game-save` (`{scene, noticed:{id:타임스탬프}, flags:{}}`), `adeline-game-pref` (글자 크기·테마·소리).
- 저장 코드(설정 → 저장과 불러오기)는 `btoa(JSON.stringify(S))`.
- 장면 id를 바꾸거나 지울 때는 `loadSave()` 에 이전 id 마이그레이션을 넣는다 (예: `s7 → c2a`).

### 장면 데이터 형식 (`src/scenes.js`)
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
```
- 모든 `{{id|…}}` 는 `NOTICES[id]` 가 있어야 하고 **같은 장면 소속**이어야 한다 (`npm run check` 가 검사).
- 문장은 가능하면 소설 본문(`chapters.js`)의 단락을 그대로 가져온다. 단락 위치는 `node tools/dump_paras.js 4 5` 로 확인.
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

## 현재 구현 상태 (v0.5)
- 완성: 실행화면, 게임 화면, 4개 탭, 설정(읽기·소리·저장·서재·인물 사전·정보), 소설 전문 열람(본편 30장 + 번외 7편, 30장 아홉 갈래 선택 UI), 픽셀아트 배경 9곳·인물 16명·표정 4종.
- 플레이 가능: **1권 1~3장** (장면 23개). 마지막은 `send` 끝 카드.
- 미구현: 편지 탭 내용(첫 편지는 10장 이후), 저택 탭의 장소 이동, 소리, 4장 이후 장면.

## 다음 할 일
`docs/roadmap.md` 참고. 우선순위: ① 1권 4~9장 장면화(설계 완료) ② `corridor`/`office` 배경 추가 ③ 노트 수정(줄 긋기) 메커니즘 ④ 2권 이후.
