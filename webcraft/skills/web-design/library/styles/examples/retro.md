# retro 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 아치 사진 옆 큰 둥근 세리프 제목과 도는 배지(히어로), 줄무늬 띠로 나뉜 메뉴판.

배울 점:
- 사진을 아치 모양으로 오렸다. 제목은 인쇄가 어긋난 듯 주황 그림자 3px
- 배지는 SVG `textPath`로 원을 따라 글자가 돈다 (20초에 한 바퀴)
- 줄무늬 띠 네 줄이 섹션을 나눈다
- 메뉴판 가격은 점선으로 이름과 잇는다 (옛 메뉴판 방식)

```html
<header class="rt-hero">
  <div class="rt-hero__photo" role="img" aria-label="사진 자리표시: 아침 햇살 속 빵 바구니"></div>
  <div class="rt-hero__text">
    <h1 class="rt-hero__title">동네 빵집<br>아침 일곱 시</h1>
    <p class="rt-hero__lede">밀가루와 버터, 소금. 매일 새벽에 굽습니다.</p>
  </div>
  <svg class="rt-badge" viewBox="0 0 120 120" aria-hidden="true">
    <defs><path id="rt-c" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0"/></defs>
    <circle cx="60" cy="60" r="58" />
    <text><textPath href="#rt-c">· 오늘 구운 빵 · 오늘 구운 빵 · 오늘 구운 빵 </textPath></text>
  </svg>
</header>
<div class="rt-stripes" aria-hidden="true"></div>

<section class="rt-menu" aria-labelledby="rt-m">
  <h2 id="rt-m" class="rt-menu__title">오늘의 빵</h2>
  <ul>
    <li><span>버터 크루아상</span><i></i><b>3,800</b></li>
    <li><span>통밀 깜빠뉴</span><i></i><b>7,500</b></li>
    <li><span>무화과 호밀빵</span><i></i><b>6,200</b></li>
  </ul>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.rt-hero { box-sizing: border-box; position: relative; min-height: 100svh; display: grid; grid-template-columns: 0.9fr 1.1fr; align-items: center; gap: calc(var(--gap) * 2); padding: var(--margin); background: var(--cream); color: var(--brown); }
.rt-hero__photo { aspect-ratio: 3 / 4; border-radius: var(--r-arch); background: linear-gradient(160deg, #e8c48a, #b5652f); }
.rt-hero__title { margin: 0; font-family: var(--font-display); font-size: var(--fs-hero); font-weight: var(--fw-head); line-height: var(--lh-head); letter-spacing: var(--ls-head); color: var(--rust); text-shadow: var(--misprint); word-break: keep-all; }
.rt-hero__lede { margin: var(--gap) 0 0; max-width: 22em; font-family: var(--font-serif); font-size: var(--fs-lg); line-height: 1.35; word-break: keep-all; }
.rt-badge { position: absolute; right: 6%; top: 8%; width: clamp(96px, 11vw, 150px); animation: rt-spin 20s linear infinite; }
.rt-badge circle { fill: var(--mustard); }
.rt-badge text { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; fill: var(--brown); }
@keyframes rt-spin { to { rotate: 1turn; } }
.rt-stripes { height: 48px; background: var(--stripes); }

.rt-menu { box-sizing: border-box; max-width: 760px; margin: 0 auto; padding: calc(var(--gap) * 4) var(--margin); color: var(--brown); }
.rt-menu__title { margin: 0 0 var(--gap); font-family: var(--font-display); font-size: var(--fs-lg); font-weight: var(--fw-head); text-align: center; }
.rt-menu ul { margin: 0; padding: 0; list-style: none; }
.rt-menu li { display: flex; align-items: baseline; gap: 12px; padding: 14px 0; font-size: var(--fs-lg); font-family: var(--font-serif); }
.rt-menu i { flex: 1; border-bottom: 2px dotted currentColor; opacity: 0.5; }
.rt-menu b { font-family: var(--font-num); font-variant-numeric: tabular-nums; font-weight: 600; }

@media (max-width: 760px) {
  .rt-hero { grid-template-columns: 1fr; }
  .rt-hero__photo { max-height: 50svh; justify-self: center; width: 70%; }
  .rt-menu li { font-size: var(--fs-base); }
}
@media (prefers-reduced-motion: reduce) { .rt-badge { animation: none; } }
```

사진이 생기면 `.rt-hero__photo`에 `background: url(...) center / cover`. 바랜 느낌은 사진에 `filter: sepia(0.15) saturate(0.9)`를 아주 약하게.
