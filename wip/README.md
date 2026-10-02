# wip — 새 도트 그림체 작업 중 (아직 게임에 반영 안 됨)

2026-10-02, 사용자가 "그림판 낙서 같다"고 해서 스타듀밸리풍으로 다시 그리는 중. 승인된 방향: **도트 버전으로 전부 다시 그리기**.

- `cel.js` — 점무늬 없는 셀 음영 `celShade()` (기존 `fp`를 덮어씀)
- `study2.js` — 새 서재 배경 `study2(o,P)` (샘플, 사용자 확인함)
- `ade2.js` — 새 아델라인 `adeSprite(expr)` (얼굴은 점 지도 `ADE_HEAD`, 땋은 머리 점 지도), `outlinePass()`
- `more2.js` — 새 탠지(굵은 컬 단발) `tangieSprite`, 남자 얼굴 지도 + 몸 `maleSprite('edric'|'marot')`
- `more3.js` — 홀트·마르타(어른 여자 얼굴 지도 `femSprite`), 소년들(아이 얼굴 지도 `boySprite(id,expr)`: adrian·kylen·julian·lionel). 캡처 `node wip/batch1_view.js 파일.png`
- `ade_view.js`, `more_view.js`, `cmp.js` — 비교 캡처 (`node wip/more_view.js /tmp/more.png`, 먼저 `npm run build`)
- 미리보기 결과: `preview/study-redraw-compare.png`, `preview/adeline-redraw.png`, `preview/tangie-edric-marot-redraw.png`, `preview/holt-marta-adrian-redraw.png`, `preview/kylen-julian-lionel-redraw.png` (`node wip/batch2_view.js`)

남은 일: 나머지 인물 6명(sebastian, hadel, rosalie, serena, gregor, count), 배경 9곳(+복도, 집사실)을 같은 방식으로 → `src/art_sprites.js`, `src/art_bg.js` 에 정식 반영(`sprite(id,expr)` / `bgCanvas` 인터페이스 유지) → 테스트·캡처.

## 사용자 결정 (2026-10-02)
- 홀트 선생님은 **안경 없음**, "엄격하지만 다정하게": 곧은 눈썹 + 살짝 올린 입꼬리, 따뜻한 갈색 눈.
- 아이 키·마르타는 사용자 확인함.
- 아이는 어른보다 **작게**. 비율 축소 대신 머리는 그대로 두고 다리·치마 줄을 빼서 키를 낮춘다(`shrinkKid`, `KID` 표: 아델라인·아드리안 18줄, 탠지(13세) 10줄). 정식 반영 때 `sprite()` 안에서 적용.
