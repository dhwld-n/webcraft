# futuristic

깨끗하고 매끈한 미래. 넓은 SF 글자, 가는 선과 원, 계기판 같은 수치, 빛나는 경계, 거대한 여백 속에 정밀한 물건 하나. 사이버펑크가 고장 난 미래라면 퓨처리즘은 **잘 정돈된 미래**다.

**어울리는 곳:** 우주·항공, 전기차·모빌리티, 로봇·하드웨어, 연구소, 첨단 가전, 건축 비전, 미래 콘셉트 전시

**참고:** Bricelab(정밀한 3D 실험실), Anubi(스크롤 3D), daisyUI의 abyss(심해 청록 + 형광 연두) 테마 토큰

## 뻔한 버전 (이렇게 나오면 실패)
- 검정 바탕 + 파란 네온 선 + 지구 이미지 + "The Future of X" (흔한 테크 랜딩)
- HUD 장식을 잔뜩 둘렀는데 아무 정보도 없다
- 홀로그램 그라데이션을 모든 곳에

## 레이아웃
- **아주 넓은 여백과 정밀한 정렬.** 화면 가운데 물건 하나(제품 사진, 3D, 도형)와 그 주변에 가는 선으로 연결된 수치 라벨
- 라벨에서 물건까지 가는 지시선 (1px, 끝에 작은 점)
- 위·아래 가장자리에 좌표, 단계, 버전 같은 작은 메타 정보
- 섹션은 화면 하나씩, 스크롤하면 물건이 회전하거나 확대되며 다음 사양으로

## 타이포
- 제목: 넓은 SF 산세리프 (Michroma, Orbitron, Syne, Unbounded / 한글 Orbit, Moirai One, 펴진고딕 넓게)
- 라벨·수치: 모노 (Geist Mono, Major Mono Display는 제목 한 줄에만) 대문자 영문 + 자간 0.18em
- 본문: 가는 그로테스크 300~400, 작게
- 큰 제목은 자간을 넓게(0.04~0.1em) — 다른 스타일과 반대

## 색
- 바탕: 아주 밝은 회백 `#eef0f2` 또는 깊은 우주 남색 `#05070d` (하나만)
- 주조: 무채색 + 빛나는 색 하나 (청록 `#5cf2ff`, 연두 `#b6ff5c`, 또는 흰 빛)
- 홀로그램 무지개는 아주 작은 곳에만 (선 하나, 테두리 하나)

## 질감
- 1px 선, 작은 십자(+), 눈금자 눈금, 원호
- 빛나는 경계: `box-shadow: 0 0 0 1px` + 옅은 외곽 빛
- 그림자 없음, 둥글기는 0이거나 완전한 원

### 비슷한 스타일과 구별
- **사이버펑크:** 어둡고 더럽고 글리치. 퓨처리즘은 깨끗하다
- **다크테크:** 개발자 도구의 실용. 퓨처리즘은 비전과 연출
- **이머시브 3D:** 3D 공간이 주인공. 퓨처리즘은 3D 없이도 선과 수치로 된다

## 수치 토큰
값은 출발점이다. 구도 스케치의 기준 수치로 옮겨 적고, 비율을 지키며 조정한다. 색과 글꼴은 system-designer가 정한 것을 쓴다.

```css
:root {
  --max: 1440px; --margin: clamp(16px, 4vw, 64px); --gap: clamp(12px, 2vw, 24px);
  --space: #05070d; --glow: #5cf2ff; --hairline: 1px solid color-mix(in srgb, currentColor 22%, transparent);
  --glow-edge: 0 0 0 1px color-mix(in srgb, var(--glow) 60%, transparent), 0 0 24px color-mix(in srgb, var(--glow) 25%, transparent);
  /* 글자: 제목은 넓게 */
  --fs-xs: 11px; --fs-sm: 13px; --fs-base: 16px; --fs-lg: 22px; --fs-hero: clamp(40px, 7vw, 112px);
  --fw-body: 300; --fw-head: 600; --lh-head: 1.0; --lh-body: 1.6; --ls-head: 0.06em; --ls-label: 0.18em;
  /* 움직임: 정밀하고 매끈하게 */
  --ease: cubic-bezier(0.16, 1, 0.3, 1); --dur-1: 240ms; --dur-2: 1100ms;
}
```

**모범 섹션 코드:** `node SKILL_DIR/scripts/lib.mjs example futuristic` (구현할 때 한 번)

## 어울리는 모션
- 지시선이 물건에서 라벨로 그려지고 수치가 올라간다 (`signature-draw` + `odometer`)
- 스크롤에 맞춰 물건이 회전·확대 (`three-stage`, `object-shelf`, 또는 이미지 시퀀스)
- 글자가 정돈되며 나타난다 (`scramble-text`, 짧게)
- 첫 방문 로딩 숫자 (`smooth-loader`)
- 강도: 중간. 느리고 매끈한 곡선 `cubic-bezier(0.16, 1, 0.3, 1)`

## 하지 말 것
- 지구, 회로 기판, 파란 디지털 비 이미지
- 의미 없는 HUD 장식 (모든 선과 숫자는 실제 정보여야 한다)
- 글리치, 스캔라인 (사이버펑크가 된다)
- 한글에 넓은 자간 (영문 제목과 라벨에만)
