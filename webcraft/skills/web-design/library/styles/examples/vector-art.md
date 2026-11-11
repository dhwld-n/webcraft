# vector-art 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 오른쪽 큰 SVG 장면과 왼쪽 글(히어로), 그림이 각자 다른 작은 이야기 셋.

배울 점:
- 일러스트 선과 버튼 테두리가 같은 `--stroke`(3px), 같은 `--ink` 색이다
- 장면은 도형 몇 개(원, 둥근 사각, 곡선)로만 그렸다. 선이 그려지는 등장
- 기능 셋은 아이콘이 아니라 서로 다른 작은 장면
- 그림자는 그라데이션 없이 한 단계 진한 면(6px 아래)

```html
<header class="va-hero">
  <div class="va-hero__text">
    <h1 class="va-hero__title">우산을 챙길지<br>앱이 먼저 알려요</h1>
    <a class="va-btn" href="#get">앱 받기</a>
  </div>
  <svg class="va-scene" viewBox="0 0 400 320" role="img" aria-label="구름 아래 우산을 든 사람 그림">
    <circle class="va-fill-sun" cx="320" cy="70" r="38"/>
    <path class="va-fill-sky va-draw" d="M70 120 a40 40 0 0 1 76 -14 a34 34 0 0 1 62 18 a28 28 0 0 1 -6 55 h-128 a30 30 0 0 1 -4 -59z"/>
    <path class="va-fill-tomato va-draw" d="M140 220 a70 50 0 0 1 140 0 z"/>
    <path class="va-line va-draw" d="M210 220 v62 a12 12 0 0 1 -24 0"/>
    <rect class="va-fill-mint va-draw" x="60" y="282" width="280" height="14" rx="7"/>
  </svg>
</header>

<section class="va-stories" aria-label="할 수 있는 일">
  <article><svg viewBox="0 0 80 80" aria-hidden="true"><circle class="va-fill-sun" cx="40" cy="40" r="22"/></svg><h2>맑은 날</h2><p>빨래하기 좋은 시간을 알려요.</p></article>
  <article><svg viewBox="0 0 80 80" aria-hidden="true"><path class="va-fill-sky" d="M14 46 a18 18 0 0 1 30 -16 a14 14 0 0 1 24 10 a10 10 0 0 1 -2 20 h-48 a8 8 0 0 1 -4 -14z"/></svg><h2>흐린 날</h2><p>비 오기 30분 전에 알림.</p></article>
  <article><svg viewBox="0 0 80 80" aria-hidden="true"><rect class="va-fill-tomato" x="18" y="18" width="44" height="44" rx="12"/></svg><h2>추운 날</h2><p>겉옷 한 벌을 추천해요.</p></article>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.va-hero { box-sizing: border-box; min-height: 100svh; display: grid; grid-template-columns: 1fr 1.1fr; align-items: center; gap: var(--gap); padding: var(--margin); background: var(--cream); color: var(--ink); }
.va-hero__title { margin: 0 0 var(--gap); font-size: var(--fs-hero); font-weight: var(--fw-head); line-height: var(--lh-head); word-break: keep-all; }
.va-btn { display: inline-block; padding: 14px 28px; border: var(--stroke) solid var(--ink); border-radius: var(--r-pill); background: var(--sun); color: var(--ink); font-weight: var(--fw-head); text-decoration: none; box-shadow: var(--flat-shadow); transition: translate var(--dur-1) var(--ease-pop), box-shadow var(--dur-1); }
.va-btn:hover { translate: 0 -2px; }
.va-btn:active { translate: 0 4px; box-shadow: 0 2px 0 var(--ink); }
.va-btn:focus-visible { outline: var(--stroke) solid var(--tomato); outline-offset: 4px; }
.va-scene { width: 100%; height: auto; overflow: visible; }
.va-scene *, .va-stories svg * { stroke: var(--ink); stroke-width: var(--stroke); stroke-linecap: round; stroke-linejoin: round; }
.va-fill-sun { fill: var(--sun); } .va-fill-sky { fill: var(--sky); } .va-fill-tomato { fill: var(--tomato); } .va-fill-mint { fill: var(--mint); } .va-line { fill: none; }
.va-draw { stroke-dasharray: 900; stroke-dashoffset: 900; animation: va-draw 1.4s ease-out forwards; }
.va-draw:nth-of-type(3) { animation-delay: 200ms; } .va-draw:nth-of-type(4) { animation-delay: 400ms; }
@keyframes va-draw { to { stroke-dashoffset: 0; } }

.va-stories { box-sizing: border-box; max-width: var(--max); margin: 0 auto; padding: calc(var(--gap) * 3) var(--margin); display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--gap); color: var(--ink); }
.va-stories article { padding: var(--gap); border: var(--stroke) solid var(--ink); border-radius: var(--r-lg); background: #fff; }
.va-stories svg { width: 72px; height: 72px; }
.va-stories h2 { margin: 12px 0 6px; font-size: var(--fs-lg); font-weight: var(--fw-head); }
.va-stories p { margin: 0; font-size: var(--fs-base); line-height: var(--lh-body); word-break: keep-all; }

@media (max-width: 760px) {
  .va-hero { grid-template-columns: 1fr; }
  .va-scene { order: -1; max-height: 40svh; }
  .va-stories { grid-template-columns: 1fr; }
}
@media (prefers-reduced-motion: reduce) { .va-draw { animation: none; stroke-dashoffset: 0; } .va-btn { transition: none; } }
```

일러스트를 따로 그릴 때도 선 굵기와 색은 `--stroke`, `--ink`와 같게 맞춘다. 외부 일러스트를 받아 오면 선 굵기를 고쳐서 넣는다.
