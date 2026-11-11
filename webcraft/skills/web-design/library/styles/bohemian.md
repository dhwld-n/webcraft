# bohemian

자유롭고 느긋한 여행자의 집. 흙색과 햇빛 색, 손으로 짠 무늬, 말린 꽃과 식물, 아치 창, 둥근 유기적 모양. 정돈보다 편안함, 새것보다 손때. 따뜻하고 이국적이다.

**어울리는 곳:** 요가·리트릿, 수공예·도자기, 자연 화장품, 게스트하우스·캠핑, 플라워 숍, 빈티지 인테리어, 음악 축제(포크)

**참고:** Ondo Collective(부드러운 자연광과 여백), Craft(따뜻한 그라데이션), daisyUI의 retro·caramellatte 테마 토큰

## 뻔한 버전 (이렇게 나오면 실패)
- 베이지 바탕 + 마크라메 사진 + 필기체 제목 + "Find your inner peace" (흔한 웰니스 템플릿)
- 만다라·드림캐처 아이콘 장식
- 유기적 블롭 모양을 이유 없이 여기저기

## 레이아웃
- 아치와 둥근 모양: 사진을 아치 창, 타원, 둥근 돌 모양으로 오린다
- 비대칭이고 느슨한 배치. 사진 두세 장이 높이를 달리해 겹친다
- 섹션 사이에 손으로 짠 듯한 무늬 띠 (지그재그, 다이아몬드 반복)
- 여백 넉넉하게, 서두르지 않는 리듬

## 타이포
- 제목: 부드럽고 따뜻한 세리프 (Fraunces 소프트, Young Serif, Corben / 한글 고운바탕, Hahmlet, 부산단디명조)
- 강조 한 줄: 흐르는 필기체 (Sacramento, Dancing Script)를 아주 작게, 장식으로만
- 본문: 부드러운 고딕이나 세리프 (Pretendard, 고운돋움)
- 제목 이탤릭을 자연스럽게 섞는다

## 색
- 흙과 햇빛: 테라코타 `#c0623b`, 황토 `#d9a05b`, 올리브 `#7a7a4a`, 모래 `#ead9c0`, 짙은 흙 `#4a2f22`
- 바탕: 모래 `#f3e9da` 또는 리넨 `#efe6d6`
- 강조로 짙은 청록 `#2f5d5a` 하나를 쓸 수 있다 (이국적인 대비)

## 질감
- 리넨·종이 그레인 (아주 옅게)
- 손으로 짠 무늬: `repeating-linear-gradient`나 작은 SVG 패턴 (지그재그, 마름모)
- 사진은 따뜻한 자연광, 살짝 바랜 색
- 그림자 없음. 경계는 모양 자체로

### 비슷한 스타일과 구별
- **레트로:** 70년대 상업 인쇄물, 쨍한 머스터드·주황, 굵은 둥근 세리프. 보헤미안은 자연물과 손으로 만든 것
- **에디토리얼:** 정돈된 잡지 그리드. 보헤미안은 느슨하고 유기적

## 수치 토큰
값은 출발점이다. 구도 스케치의 기준 수치로 옮겨 적고, 비율을 지키며 조정한다. 색과 글꼴은 system-designer가 정한 것을 쓴다.

```css
:root {
  --max: 1240px; --margin: clamp(18px, 5vw, 72px); --gap: clamp(16px, 2.6vw, 36px);
  --sand: #f3e9da; --terracotta: #c0623b; --ochre: #d9a05b; --olive: #7a7a4a; --earth: #4a2f22; --teal: #2f5d5a;
  /* 모양: 아치, 둥근 돌 */
  --r-arch: 999px 999px 0 0; --r-pebble: 58% 42% 46% 54% / 52% 48% 52% 48%; --r-sm: 10px;
  /* 짠 무늬 띠 */
  --weave: repeating-linear-gradient(135deg, var(--terracotta) 0 10px, transparent 10px 20px), repeating-linear-gradient(45deg, var(--ochre) 0 10px, var(--sand) 10px 20px);
  /* 글자 */
  --fs-sm: 14px; --fs-base: 17px; --fs-lg: clamp(22px, 2.6vw, 32px); --fs-hero: clamp(48px, 7.5vw, 116px);
  --fw-body: 400; --fw-head: 400; --lh-head: 1.0; --lh-body: 1.7; --ls-head: -0.015em;
  /* 움직임: 바람처럼 느리게 */
  --ease: cubic-bezier(0.45, 0, 0.55, 1); --dur-2: 1000ms; --sway: 7s;
}
```

**모범 섹션 코드:** `node SKILL_DIR/scripts/lib.mjs example bohemian` (구현할 때 한 번)

## 어울리는 모션
- 식물 잎이 바람에 살짝 흔들린다 (7초, 2~3°)
- 사진들이 서로 다른 속도로 지나간다 (`parallax-layers`, 약하게)
- 천천히 떠오르는 등장 (`scroll-reveal`, 900ms)
- 강도: 낮음

## 하지 말 것
- 만다라, 드림캐처, 깃털 아이콘 (상투적인 상징)
- 필기체를 제목 전체에
- 유기적 블롭을 장식으로만 (모양은 사진 틀이나 영역으로 쓴다)
- 차갑거나 형광인 색
