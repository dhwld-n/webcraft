# pop-art

만화책과 광고 포스터의 화법. 굵은 검정 윤곽선, 원색 면, 망점(하프톤), 말풍선과 효과음 글자. 일상의 물건을 크게, 반복해서, 쨍하게. 시끄럽지만 규칙이 단순해서 금방 읽힌다.

**어울리는 곳:** 음료·간식·패스트푸드, 장난감·굿즈, 만화·웹툰, 축제, 캠페인 이벤트 페이지, 어린이~청년 브랜드

**참고:** Gumroad(굵은 테두리와 원색), daisyUI의 cmyk·bumblebee·valentine 테마 토큰(시안 `oklch(71.8% .133 239)` + 마젠타 + 노랑)

## 뻔한 버전 (이렇게 나오면 실패)
- 노랑 바탕 + "POW!" 폭발 말풍선 하나 + 평범한 카드 (효과음 스티커만 붙인 템플릿)
- 유명 팝아트 작품(통조림 반복, 눈물 흘리는 만화 얼굴) 흉내
- 망점 없이 원색만 칠하면 그냥 플랫 디자인이다

## 레이아웃
- **만화 칸.** 화면을 굵은 선으로 나눈 칸 여러 개. 칸 크기와 각도가 다르다
- 같은 물건이나 사진을 격자로 반복하고 칸마다 색을 바꾼다
- 효과음 글자가 칸 경계를 넘는다
- 말풍선을 버튼이나 인용으로 쓴다

## 타이포
- 굵고 통통한 디스플레이 (Bangers, Luckiest Guy, Bowlby One, Rubik Mono One / 한글 Black Han Sans, 원스토어모바일POP체, G마켓산스 Bold)
- 효과음 글자: 기울이고(-8°), 검정 윤곽 + 단단한 그림자
- 본문은 깔끔한 고딕. 대문자 영문 말풍선은 짧게

## 색
- 원색 3~4개 + 검정 + 흰색 (시안 `#00a6e8`, 마젠타 `#ef2d7a`, 노랑 `#ffe600`, 빨강 `#ff3b2f`)
- 사진은 원색 하나로 덮거나(듀오톤) 망점으로 바꾼다
- 칸마다 바탕색이 다르지만 팔레트 안에서만

## 질감
망점은 `radial-gradient` 반복으로 만든다.

```css
.pa-dots { background: radial-gradient(circle, rgb(0 0 0 / 0.85) 28%, transparent 30%) 0 0 / 12px 12px, var(--pa-yellow); }
.pa-ink { border: 4px solid #111; box-shadow: 8px 8px 0 #111; }
.pa-sfx { -webkit-text-stroke: 3px #111; paint-order: stroke fill; text-shadow: 6px 6px 0 #111; }
```
- 윤곽선 3~5px 검정, 그림자는 흐림 없는 단단한 그림자
- 망점 크기는 한 사이트에서 하나나 두 가지

### 비슷한 스타일과 구별
- **네오 브루탈리즘:** 같은 굵은 테두리와 그림자지만 망점·말풍선·만화 칸 같은 화법이 없다
- **맥시멀리즘:** 서체와 레이어가 많다. 팝아트는 만화라는 한 가지 화법

## 수치 토큰
값은 출발점이다. 구도 스케치의 기준 수치로 옮겨 적고, 비율을 지키며 조정한다. 색과 글꼴은 system-designer가 정한 것을 쓴다.

```css
:root {
  --max: 1320px; --margin: clamp(12px, 3vw, 40px); --gap: clamp(8px, 1.4vw, 16px);
  --pa-cyan: #00a6e8; --pa-magenta: #ef2d7a; --pa-yellow: #ffe600; --pa-red: #ff3b2f; --ink: #111;
  /* 선과 그림자 */
  --line: 4px solid var(--ink); --hard: 8px 8px 0 var(--ink); --hard-press: 2px 2px 0 var(--ink); --dot: 12px; --r: 0;
  /* 글자 */
  --fs-sm: 15px; --fs-base: 17px; --fs-lg: clamp(24px, 3vw, 40px); --fs-sfx: clamp(56px, 9vw, 140px); --fs-hero: clamp(60px, 12vw, 190px);
  --fw-body: 500; --fw-head: 900; --lh-head: 0.88; --lh-body: 1.45; --sfx-tilt: -8deg;
  /* 움직임: 툭툭 튀어나온다 */
  --ease-pop: cubic-bezier(0.34, 1.7, 0.64, 1); --dur-1: 120ms; --dur-2: 380ms;
}
```

**모범 섹션 코드:** `node SKILL_DIR/scripts/lib.mjs example pop-art` (구현할 때 한 번)

## 어울리는 모션
- 효과음 글자가 크게 튀어나왔다 자리 잡는다 (오버슈트 곡선)
- 버튼을 누르면 그림자가 줄며 눌린다 (`--hard` → `--hard-press`)
- 카드를 기울이고 반짝 (`tilt-card`, 약하게)
- 강도: 중간~높음, 짧고 탁탁

## 하지 말 것
- 유명 팝아트 작품의 이미지·구도 그대로
- 부드러운 그림자, 그라데이션, 흐림
- 망점을 글자 뒤에 진하게 (읽기 힘들다. 글자 뒤는 단색)
- 말풍선 효과음을 모든 섹션에 (하나나 둘)
