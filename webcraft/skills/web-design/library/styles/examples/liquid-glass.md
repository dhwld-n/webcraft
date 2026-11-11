# liquid-glass 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 꽉 찬 장면 위의 작은 정보판(히어로), 평평한 바탕의 객실 목록. 유리는 화면 전체에서 두 곳(정보판, 고정 내비)뿐이다.

배울 점:
- 유리는 투명하다. 흐림 3px, 면 색 거의 없음, 경계는 빛나는 그라데이션 테두리로 보인다
- 장면이 화면을 다 쓰고, 유리판은 장면의 빈 곳(아래 오른쪽)에 작게 놓인다. 제목은 유리 밖, 장면 위에 직접 쓴다
- 유리판 안은 모노 라벨과 수치. 설명 문장을 넣지 않는다
- 두 번째 섹션은 유리가 없다. 읽을 것은 불투명한 바탕에서 읽는다
- 흐림이 안 되는 브라우저와 모션 줄이기 대체가 있다
- 고정 내비는 어두운 유리다. 사진 위와 밝은 섹션 위를 모두 지나가므로 흰 유리면 밝은 바탕에서 사라진다

```html
<nav class="lg-nav lg-glass" data-refract aria-label="주요 메뉴">
  <a href="#rooms">객실</a><a href="#stay">머무는 법</a><a class="lg-nav__cta" href="#book">예약</a>
</nav>

<header class="lg-hero">
  <div class="lg-hero__scene" role="img" aria-label="사진 자리표시: 안개 낀 호숫가의 통유리 객실"></div>
  <h1 class="lg-hero__title">물 위의<br>세 번째 방</h1>
  <dl class="lg-panel lg-glass" data-refract>
    <div><dt>지금 수온</dt><dd>14.2°</dd></div>
    <div><dt>해 질 때까지</dt><dd>2시간 10분</dd></div>
    <div><dt>남은 방</dt><dd>3</dd></div>
  </dl>
</header>

<section class="lg-rooms" id="rooms" aria-labelledby="rooms-title">
  <h2 id="rooms-title" class="lg-label">객실</h2>
  <ol class="lg-rooms__list">
    <li><span class="lg-rooms__n">01</span><b>호수 쪽</b><span>2인 · 32㎡</span><span class="lg-rooms__price">₩280,000</span></li>
    <li><span class="lg-rooms__n">02</span><b>숲 쪽</b><span>2인 · 28㎡</span><span class="lg-rooms__price">₩240,000</span></li>
    <li><span class="lg-rooms__n">03</span><b>지붕 아래</b><span>4인 · 46㎡</span><span class="lg-rooms__price">₩390,000</span></li>
  </ol>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
/* 투명한 판 + 빛나는 테두리. 판이 있다는 건 가장자리로 안다 */
.lg-glass {
  --blur: var(--glass-blur);
  background: var(--glass-bg); box-shadow: var(--glass-shadow); text-shadow: var(--glass-text-shadow);
  -webkit-backdrop-filter: blur(var(--blur)) saturate(140%); backdrop-filter: blur(var(--blur)) saturate(140%);
}
.lg-glass::after {
  content: ""; position: absolute; inset: 0; border-radius: inherit; padding: 1.5px; pointer-events: none;
  background: var(--glass-rim);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude;
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) { .lg-glass { background: var(--glass-fallback); } }

/* 고정 내비: 아래 가운데 알약 하나 */
.lg-nav {
  position: fixed; left: 50%; bottom: max(16px, env(safe-area-inset-bottom)); translate: -50% 0; z-index: 10;
  display: flex; width: max-content; gap: 4px; padding: 6px; border-radius: var(--r-pill); font-family: var(--font-ui); font-weight: var(--fw-glass);
  /* 밝은 섹션 위로도 지나가므로 어두운 기운을 깔고, 읽을 판이라 흐림을 조금 올린다 */
  --blur: var(--glass-blur-read); background: var(--glass-bg), linear-gradient(rgb(12 14 18 / 0.38), rgb(12 14 18 / 0.38));
}
.lg-nav a { padding: 12px 18px; border-radius: var(--r-pill); color: #fff; text-decoration: none; transition: background var(--dur-1) var(--ease); }
.lg-nav a:hover { background: rgb(255 255 255 / 0.14); }
.lg-nav__cta { background: #fff; color: var(--text) !important; }
.lg-nav a:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }

/* 히어로: 장면이 전부. 제목은 장면 위, 판은 빈 곳에 작게 */
.lg-hero { box-sizing: border-box; position: relative; min-height: 100svh; display: grid; grid-template-columns: 1fr auto; align-items: end; gap: var(--gap); padding: var(--margin) var(--margin) calc(var(--margin) + 88px); color: #fff; overflow: clip; }
.lg-hero__scene {
  position: absolute; inset: 0; z-index: -1;
  background: linear-gradient(180deg, #8fa3ad 0%, #c9c2b4 55%, #3d4a4f 100%); /* 사진이 생기면 background-image로 바꾼다 */
  animation: lg-drift 24s var(--ease) infinite alternate;
}
@keyframes lg-drift { to { transform: scale(1.08) translateY(-2%); } }
.lg-hero__title { margin: 0; font-size: var(--fs-hero); font-weight: var(--fw-head); line-height: var(--lh-head); letter-spacing: var(--ls-head); word-break: keep-all; text-shadow: 0 2px 30px rgb(0 0 0 / 0.25); }
.lg-panel { position: relative; display: grid; gap: 14px; margin: 0; min-width: 220px; padding: var(--pad); border-radius: var(--r-md); }
.lg-panel dt, .lg-label { font-family: var(--font-num); font-size: var(--fs-xs); letter-spacing: var(--ls-label); text-transform: uppercase; opacity: 0.8; }
.lg-panel dd { margin: 2px 0 0; font-family: var(--font-num); font-size: var(--fs-md); font-weight: var(--fw-glass); font-variant-numeric: tabular-nums; }

/* 객실: 유리 없음. 평평한 바탕, 괘선, 숫자 정렬 */
.lg-rooms { max-width: var(--max); margin: 0 auto; padding: calc(var(--gap) * 3) var(--margin); background: var(--bg); color: var(--text); }
.lg-label { margin: 0 0 var(--gap); opacity: 0.6; }
.lg-rooms__list { margin: 0; padding: 0; list-style: none; }
.lg-rooms__list li { display: grid; grid-template-columns: 4ch 1fr auto auto; align-items: baseline; gap: var(--gap); padding: 22px 0; border-top: 1px solid color-mix(in srgb, var(--text) 18%, transparent); font-size: var(--fs-base); }
.lg-rooms__list b { font-size: var(--fs-lg); font-weight: var(--fw-head); letter-spacing: -0.02em; }
.lg-rooms__n, .lg-rooms__price { font-family: var(--font-num); font-variant-numeric: tabular-nums; }

@media (max-width: 760px) {
  .lg-hero { grid-template-columns: 1fr; }
  .lg-panel { grid-template-columns: repeat(3, 1fr); min-width: 0; padding: 14px; }
  .lg-panel dd { font-size: var(--fs-sm); }
  .lg-rooms__list li { grid-template-columns: 3ch 1fr auto; }
  .lg-rooms__list li > span:nth-of-type(2) { grid-column: 2; }
}
@media (prefers-reduced-motion: reduce) {
  .lg-hero__scene { animation: none; }
  .lg-nav a { transition: none; }
}
```

굴절은 `data-refract`가 붙은 두 판에 `glass-refraction` 레시피의 JS를 그대로 넣으면 걸린다.

사진이 생기면 `.lg-hero__scene`에 `background: url(...) center / cover`를 넣는다. 정보판 글자 대비는 사진의 가장 밝은 부분(하늘, 물빛) 위에서 확인한다. 판 위 반사광은 `liquid-glass` 레시피를 정보판 하나에만 붙인다.
