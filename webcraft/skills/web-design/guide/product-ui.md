# 제품 화면 (앱, 대시보드, 휴대폰 화면)

사이트가 파는 것이 소프트웨어라서 그 화면을 보여 줘야 할 때 읽는다. 사진이 어울리는 사이트(카페, 사진가 등)에는 쓰지 않는다. 제품 화면을 "사진 자리표시"로 두지 않는다.

## 메인이 할 일
쓸 수 있는 스킬 목록에 `stageshow`가 있으면 **메인은 직접 부르지 않고 `ui-builder` 에이전트를 띄운다.** 문서와 촬영 결과가 메인 맥락에 쌓이면 이후 모든 응답이 그만큼 비싸진다. 넘길 것: 결과물 폴더, 제품 설명, 보여 줄 장면 한 문장, 자리와 크기, 확인받은 글꼴과 색, 이 파일 경로. 데모 하나에 한 번, 페이지에 두 개까지. 받은 파일을 페이지에 넣기만 한다.

## 1. stageshow로 만들기 (`ui-builder`가 따른다)
결과는 React 컴포넌트다. 확인받은 글꼴과 색을 kit의 토큰에 연결한다.

이 플러그인의 결과물은 일반 HTML이므로 묶어서 넣는다. 작업 폴더는 결과물 안의 `demo-src/`로 하고, `kit/`을 거기로 복사한다.

```bash
cd demo-src
npm init -y
npm i react@18.3.1 react-dom@18.3.1 lucide-react@0.468.0 esbuild@0.24.2
npx esbuild main.tsx --bundle --minify --format=esm --jsx=automatic --define:process.env.NODE_ENV='"production"' --outdir=dist
```

`main.tsx`:
```tsx
import { createRoot } from "react-dom/client";
import Demo from "./Demo";
createRoot(document.getElementById("demo")!).render(<Demo />);
```

`dist/main.js`와 `dist/main.css`를 결과물 폴더로 옮겨 페이지에 넣고, 끝나면 `demo-src/node_modules`를 지운다.
```html
<link rel="stylesheet" href="demo.css">
<div id="demo"></div>
<script type="module" src="demo.js"></script>
```

- **`--format=esm`과 `type="module"`을 꼭 쓴다.** kit이 `import.meta.url`을 써서 `iife`로 묶으면 화면이 아무것도 안 그려진다. 모듈이라 `file://`로는 안 열린다. 로컬 서버로 본다.
- `kit/brands`의 로고를 쓰면 그 svg 파일도 `demo.js` 옆에 둔다. 실제 회사 로고와 이름은 쓰지 않는다.
- 데모 하나가 약 200KB를 더한다. 페이지에 데모는 한두 개만 둔다.

## 2. 스킬이 없으면
사용자에게 한 줄로 알린다: "제품 화면 품질을 높이는 stageshow 스킬이 있습니다. `npx skills add benjitaylor/skills --skill stageshow`로 설치할 수 있어요." 설치를 기다리지 않고, 아래 기준으로 HTML과 CSS로 직접 만든다.

## 기준 (둘 다)
한 문장: 진짜 제품처럼 읽히고, 보는 사람에게 필요한 만큼만 남겼으며, 의도를 갖고 잘랐고, 모든 움직임에 원인이 있다.

자주 실패하는 다섯 가지:
| 실패 | 모습 | 대신 |
|---|---|---|
| 과함 | 모든 칸에 실제 글자와 숫자 | 실제 글자는 이야기에 필요한 3~7개만, 나머지는 회색 줄 |
| 뼈대만 | 회색 덩어리 둘과 버튼 | 화면 구조는 빽빽하게 두고, 글자만 줄인다 |
| 상자 | 창 전체를 카드 안에 넣은 스크린샷 | 창이 무대의 3분의 2 이상을 채우고 가장자리 밖으로 나간다 |
| 평면 | 모든 것이 같은 무게의 테두리 카드 | 시선이 머물 곳 하나, 나머지는 가라앉힌다 |
| 밋밋 | 요청과 무관한 회색 창 | 사이트의 색, 글꼴, 분위기를 화면에 그대로 쓴다 |

- 움직이면 3~5박자, 10~16초, 끝이 처음과 이어지게 반복한다. 커서는 이유 있는 곳으로만 간다.
- 움직이는 데모의 대표 프레임은 결과가 화면에 남아 있는 순간이다. 모션 줄이기 설정에서는 그 프레임을 보여 준다.
- 진짜 앱처럼 보이는 창틀을 쓴다. 맥 네이티브 앱에 주소창을 달지 않는다. 휴대폰 상태 표시줄을 어설프게 그리지 않는다.
- 다른 회사 제품의 이름과 모습을 쓰지 않는다. 동작만 참고한다.

기준의 출처: Benji Taylor의 stageshow (MIT).
