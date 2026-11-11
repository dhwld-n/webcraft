# webcraft

프롬프트를 처음부터 자세히 쓰지 않아도, 짧은 요청만으로 디자인과 애니메이션이 들어간 웹사이트 시드 결과물을 만들어 주는 Claude Code 플러그인.

## 왜 만들었나

지금은 AI로 웹사이트를 만들 때 디자인이나 애니메이션 효과를 제대로 얻으려면 꽤 자세한 프롬프트를 써야 한다. 스타일, 색, 글꼴, 움직임까지 미리 정해서 적어야 비로소 원하는 것에 가까운 결과가 나온다.

순서를 바꾸고 싶었다. 처음부터 프롬프트를 빡세게 쓰는 대신, 쓸 만한 시드 결과물을 먼저 받고 그것을 보면서 원하는 부분만 고치면 되는 플러그인이 있었으면 했다.

## 어떻게 동작하나

1. **짧게 요청한다.** 업종과 분위기 정도만 말하면 된다. 빠진 내용은 되묻지 않고 플러그인이 정한 뒤 알려 준다.
2. **자세한 프롬프트 대신 라이브러리를 쓴다.** 스타일 카드 24개, 레퍼런스 느낌 노트, 모션 레시피 26개, 무료 폰트 목록에서 요청에 맞는 재료를 고른다. 레퍼런스는 느낌만 참고하고 코드, 이미지, 문구는 가져오지 않는다.
3. **방향을 한 번 확인한다.** 구현 전에 콘셉트와 첫 화면 구도를 안정안, 과감안으로 보여 주고 확인을 받는다.
4. **만들고 검수한다.** 구현한 뒤 에이전트가 시각, 개성, 모션, 사용성을 채점하고 고친다.
5. **시드 결과물을 받는다.** 사진과 일부 문구는 자리표시로 남을 수 있고, 무엇을 채워야 하는지 함께 알려 준다. 이후로는 마음에 안 드는 부분만 말해서 고치면 된다.

## 써 보기

```bash
claude --plugin-dir ./webcraft
```

그다음 그냥 말로 요청한다.

```
카페 랜딩 페이지 만들어줘. 따뜻하고 에디토리얼한 느낌으로
```

`--plugin-dir`로 이 폴더를 직접 가리켜야 `/webcraft:add-reference`로 추가한 노트가 이 폴더에 저장된다.

## 명령

| 명령 | 하는 일 |
|---|---|
| (자동) `web-design` | 디자인 요청이면 알아서 실행. `/webcraft:web-design`으로 직접 불러도 된다 |
| `/webcraft:add-reference <URL>` | 사이트를 브라우저로 보고 느낌 노트 추가 |
| `/webcraft:refresh-references [id]` | 오래된 노트 다시 분석 |

앱이나 소프트웨어 사이트의 제품 화면은 [stageshow](https://benji.org/stageshow) 스킬이 있으면 그것으로 만든다 (`npx skills add benjitaylor/skills --skill stageshow`). 없으면 같은 기준으로 직접 만든다.

브라우저 도구(Playwright MCP, Claude in Chrome 등)가 있어야 레퍼런스 추가와 화면 검수가 된다. 없으면 검수는 코드만 보고 한다.

## 구성

```
skills/web-design/
  SKILL.md                    전체 흐름
  library/styles/             스타일 카드 24개 (editorial, bento-grid, dark-tech, neo-brutalism, claymorphism, immersive-3d, liquid-glass,
                              minimalism, swiss, maximalism, aurora, y2k-chrome, cyberpunk, surreal, retro-pixel, pop-art, retro,
                              collage, vector-art, futuristic, handwritten, bohemian, graffiti, victorian). examples/에 모범 섹션
  library/references/         느낌 노트와 index.md
  library/BestMatch_color/    사용자가 고른 색 조합 71개 (palettes.md, 셋째 색이 포인트). raw.txt에 줄을 더하고 gen.cjs로 표를 다시 만든다
  library/motion/             모션 레시피 26개 (scroll-reveal, kinetic-headline, magnetic-button, gooey-blobs,
                              cushion-button, clay-surface, liquid-glass, glass-refraction, signature-draw, word-highlight,
                              odometer, pixel-loader, grain-gradient, marquee, section-color-shift,
                              particle-field, hover-play, smooth-loader, parallax-layers, tilt-card,
                              3D: three-stage, object-shelf, point-morph, hold-to-enter, scramble-text, view-transition)
  library/fonts/              무료 폰트 목록 (ko.md 한글 127개, en.md 영문 206개, 라이선스와 불러오는 법)
  guide/                      필요할 때만 읽는 세부 (review.md 검수 절차, report.md 보고 형식, product-ui.md 제품 화면,
                              anti-ai-look.md AI 느낌 금지 목록)
  scripts/lib.mjs             라이브러리 조회 (refs, note, fonts, fontshare, motion). 짧게 출력 (node lib.mjs --test)
  scripts/audit.js            검수용 페이지 점검. 브라우저에서 실행하면 짧은 JSON을 돌려줌
  scripts/measure.js          레퍼런스 실측. 브라우저에서 실행하면 글자(SVG, 이미지로 된 큰 글자 포함), 색, 배치, 첫 화면 구도, 스크롤 아래쪽, 움직임 수치를 돌려줌
  scripts/type-pair.js        글꼴 조합의 수치. 실제로 그려지는 글꼴, x높이, 너비, 획 대비, 한글과 라틴의 크기 차이, 가짜 굵기
  scripts/gate-pass.js        연출용 입장 화면을 넘긴다 (클릭, 꾹 누르기). 쿠키, 연령, 로그인 화면은 누르지 않는다
  scripts/interact-probe.js   JS 호버, 커서 따라오기, 폼 모양, 안전한 클릭(메뉴, 탭, 모달)을 실제로 해 보고 반응과 시간을 잰다
  scripts/wheel-probe.js      창 스크롤이 없는 사이트 실측. 실제 휠을 보내는 동안 장면 전환, 글자, 배경, 캔버스 변화를 잰다
  scripts/probe-run.mjs       화면 없는 Chrome으로 measure.js, interact-probe.js를 붙여 넣지 않고 실행하고 위·중간·아래·모바일 스크린샷을 남긴다
  scripts/contrast.mjs        색 대비 검사 (node contrast.mjs --test)
skills/add-reference/         레퍼런스 추가
skills/refresh-references/    레퍼런스 갱신
agents/                       system-designer (팔레트·글꼴·모션을 한 번에)
                              ui-builder (stageshow로 제품 화면 데모 하나)
                              critic (기본 검수, 최대 3회)
                              visual-critic, type-critic, motion-critic, usability-critic ("꼼꼼하게" 정밀 모드 검수 패널)
```

## 토큰을 아끼는 구조
- stageshow 문서와 촬영 결과는 `ui-builder`(Sonnet) 안에만 쌓고, 메인은 묶인 파일과 짧은 보고만 받는다
- 에이전트는 라이브러리 파일을 통째로 읽지 않고 `lib.mjs`의 짧은 출력만 본다
- 레퍼런스 분석은 별도 에이전트 없이 메인이 `note`로 핵심만 읽는다
- 팔레트, 글꼴, 모션은 `system-designer` 하나가 한 번에 고른다
- 검수는 `audit.js`의 수치를 먼저 보고, 스크린샷은 첫 화면 두 장과 시그니처 요소 한 장만. 배율은 원본(1)이다. 줄이면 디테일을 못 본다
- 에이전트는 모두 Sonnet. 사용자가 "꼼꼼하게"라고 한 정밀 모드에서만 마지막 회차 visual-critic을 Opus로 띄운다 (Opus는 Pro 사용량을 빨리 써서, 기본 검수에 쓰면 마지막 회차가 한도로 끊긴다)
- 기본 검수는 에이전트를 처음과 마지막에만 띄우고, 중간 확인은 메인이 `audit.js`로 한다. 정밀 모드는 사용자가 요청할 때만
- 서브에이전트는 도구를 쓸 때마다 기본 맥락(약 2만 토큰)을 다시 보내므로, 에이전트 수와 도구 왕복을 줄이는 것이 가장 크게 효과가 있다


## 늘리는 법

- 스타일 카드: `library/styles/<스타일 키>.md`. 기존 카드와 같은 항목(레이아웃, 타이포, 색, 질감, 어울리는 모션, 하지 말 것)
- 모션 레시피: `library/motion/<이름>.md`. 맨 위에 종류, 강도, 어울리는 스타일, 의존성. 코드에는 반드시 `prefers-reduced-motion` 대체
