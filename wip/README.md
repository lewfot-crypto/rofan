# wip — 새 도트 그림체 작업 중 (아직 게임에 반영 안 됨)

2026-10-02, 사용자가 "그림판 낙서 같다"고 해서 스타듀밸리풍으로 다시 그리는 중. 승인된 방향: **도트 버전으로 전부 다시 그리기**.

- `cel.js` — 점무늬 없는 셀 음영 `celShade()` (기존 `fp`를 덮어씀)
- `study2.js` — 새 서재 배경 `study2(o,P)` (샘플, 사용자 확인함)
- `ade2.js` — 새 아델라인 `adeSprite(expr)` (얼굴은 점 지도 `ADE_HEAD`, 땋은 머리 점 지도), `outlinePass()`
- `more2.js` — 새 탠지(굵은 컬 단발) `tangieSprite`, 남자 얼굴 지도 + 몸 `maleSprite('edric'|'marot')`
- `more3.js` — 홀트·마르타(어른 여자 얼굴 지도 `femSprite`), 소년들(아이 얼굴 지도 `boySprite(id,expr)`: adrian·kylen·julian·lionel·sebastian·hadel), 소녀들(`girlSprite(id,expr)`: rosalie·serena), 어른 남자 추가(`adultMale(id,expr)`: gregor·count). 캡처 `node wip/batch1_view.js 파일.png`
- `bg2.js` — 새 배경. 대저택판 `exterior3`·`hall3`·`school3`·`bedroom5`(나무+로판풍 천)·`dining3`·`kitchen3`·`orchard3`·`corridor3`·`office3`·`carriage3`(사용자: "완전 대저택") — 처음 그린 `exterior2`·`hall2`·`school2`는 작아서 폐기 예정 (공통 재료 `frameWin`·`curtainPair`·`plankFloor`). 캡처 `node wip/bg_view.js 파일.png exterior,hall,schoolroom 늦가을`
- `ade_view.js`, `more_view.js`, `cmp.js` — 비교 캡처 (`node wip/more_view.js /tmp/more.png`, 먼저 `npm run build`)
- 미리보기 결과: `preview/study-redraw-compare.png`, `preview/adeline-redraw.png`, `preview/tangie-edric-marot-redraw.png`, `preview/holt-marta-adrian-redraw.png`, `preview/kylen-julian-lionel-redraw.png` (`node wip/batch2_view.js`), `preview/sebastian-hadel-rosalie-redraw.png` (`node wip/batch3_view.js`), `preview/serena-gregor-count-redraw.png` (`node wip/batch4_view.js`)

남은 일: 인물 16명 완료(사용자 확인 대기: 세레나·그레고르·백작). 배경 9곳(+복도, 집사실)을 같은 방식으로 → `src/art_sprites.js`, `src/art_bg.js` 에 정식 반영(`sprite(id,expr)` / `bgCanvas` 인터페이스 유지) → 테스트·캡처.

## 사용자 결정 (2026-10-02)
- 홀트 선생님은 **안경 없음**, "엄격하지만 다정하게": 곧은 눈썹 + 살짝 올린 입꼬리, 따뜻한 갈색 눈.
- 아이 키·마르타는 사용자 확인함.
- 소년들은 얼굴에도 차이를 둔다 (`boyFace`): 카일런 가는 눈·곧은 눈썹·두꺼운 털깃·장갑, 율리안 부드러운 웨이브 곱슬머리(턱선까지)·웃는 입매·흰 장갑 낀 손을 모은 자세·견장·어깨띠, 리오넬 무거운 눈꺼풀·한쪽 눈썹과 입꼬리·회중시계 줄, 아드리안 말아 쥔 지도·잉크 자국.
- 아이는 어른보다 **작게**. 비율 축소 대신 머리는 그대로 두고 다리·치마 줄을 빼서 키를 낮춘다(`shrinkKid`, `KID` 표: 아델라인·아드리안 18줄, 탠지(13세) 10줄). 정식 반영 때 `sprite()` 안에서 적용.
- 머리 모양은 함부로 바꾸지 않는다: 긴 옆머리(카일런)·넘긴 머리(리오넬)는 사용자가 "이상하다"고 해서 되돌림.
- 세바스티안: 마탑 로브(금단)·둥근 안경(렌즈 비움)·책, 반쯤 감긴 차분한 눈. 하델: 가죽 웃옷·허리띠·어깨 보호대·허리에 찬 검, 굵은 눈썹, 늘 붉은 귀(놀람·걱정 때 더 붉게). 로잘리: 허리까지 늘어뜨린 적갈색 머리·분홍 드레스·수첩과 연필, 살짝 벌린 입.
- 하델은 **검은 머리** (사용자 지정, canon.md에 기록). 카일런의 검푸른 머리와 구분되게 푸른 기 없는 검정.
- 세레나: 금발 긴 머리·하얀 나비 리본·흰 드레스와 연보라 띠, 반쯤 내리뜬 눈. 그레고르: 짙은 갈색 수염·털 망토·금 걸쇠, 가장 큰 키. 발트하임 백작: 회색 머리·지친 눈 밑·은 손잡이 지팡이.
- 세레나는 단순한 버전(girlSprite, 나비 리본)을 사용자가 선택. 정교하게 다시 그린 버전은 되돌림.
- 배경은 **대저택** 규모: 외관은 3층 본관+좌우 날개, 기둥 현관·박공·망사르 지붕·시계 박공, 분수(정사 805행 '정원의 분수, 대리석 계단'), 서재 불은 이층 가장 왼쪽 창. 현관 홀은 2층 높이, 가운데 대리석 계단과 위층 회랑, 큰 샹들리에. 공부방은 정사상 '서재 옆 작은 공부방'이라 크기는 작게 두되 꾸밈(몰딩·대리석 벽난로·거울·탁상시계·책장·샹들리에)은 고급스럽게.
- 침실은 로판풍(사용자 요청): 크림빛 벽·하늘색 꽃무늬·금 몰딩, 금관에서 흘러내리는 얇은 휘장 침대, 흰 금장 책상, 흰 대리석 벽난로와 금 거울, 크리스털 샹들리에, 둥근 꽃무늬 양탄자. 소설의 벽난로 불·창가 책상(노트·깃펜·잉크병) 유지.
- 침실 최종(사용자): 나무 벽·나무 바닥·나무 가구, 커튼·휘장·침구·양탄자 같은 천만 로판풍 (bedroom5). bedroom4(크림 벽)는 폐기.
- 과수원: 담 너머 공작 저택(본관+날개, 이층 가장 왼쪽 창 불). 이층 복도: 밤, 촛대 하나 건너 하나, 끝 문 아래 노란 선. 집사실: 장부 벽, 자로 잰 듯한 책상, 열쇠판, 벽시계, 창가 화분 하나. 마차: 남색 벨벳 다이아 누빔, 금단추, 붉은 커튼, 창밖 풍경.
