# claymorphism 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 큰 덩어리 하나에 걸친 3D 오브젝트(히어로), 크기가 다른 조약돌로 놓인 단계.

배울 점:
- 첫 화면 덩어리는 하나다. 오브젝트가 덩어리 가장자리 밖으로 걸쳐 공간감이 생긴다
- 단계는 같은 카드 셋이 아니라 크기와 높이가 다른 조약돌. 첫 단계가 가장 크다
- 그림자는 바탕색 계열로 물들인다. 검정 그림자가 없다
- 긴 글과 작은 버튼은 평평하게 둔다. 모든 것을 부풀리지 않는다

```html
<header class="cl-hero">
  <div class="cl-hero__blob">
    <h1 class="cl-hero__title">하루 10분, 숨부터 고르기</h1>
    <p class="cl-hero__lede">앱을 열면 공 하나가 숨 쉬듯 부풀어요. 그 속도에 맞춰 들이쉬고 내쉬면 됩니다.</p>
    <a class="cl-btn" href="#start">첫 숨 쉬어 보기</a>
  </div>
  <div class="cl-hero__object" role="img" aria-label="3D 일러스트 자리표시: 숨 쉬는 공"></div>
</header>

<section class="cl-steps" aria-labelledby="steps-title">
  <h2 id="steps-title" class="cl-steps__title">이렇게 흘러가요</h2>
  <ol class="cl-steps__list">
    <li class="cl-pebble cl-pebble--first"><span class="cl-pebble__n">1</span><b>공을 봐요</b><span>부풀면 들이쉬고, 줄면 내쉬어요.</span></li>
    <li class="cl-pebble cl-pebble--mid"><span class="cl-pebble__n">2</span><b>숫자는 몰라도 돼요</b></li>
    <li class="cl-pebble cl-pebble--last"><span class="cl-pebble__n">3</span><b>끝나면 한 줄</b><span>오늘 기분을 남겨요.</span></li>
  </ol>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.cl-hero, .cl-steps { max-width: var(--max); margin: 0 auto; padding: var(--gap) var(--margin); }

/* 히어로: 덩어리 하나 + 가장자리에 걸친 오브젝트 */
.cl-hero { position: relative; min-height: 88svh; display: grid; align-items: center; }
.cl-hero__blob, .cl-pebble { box-sizing: border-box; }
.cl-hero__blob { width: min(100%, 720px); padding: calc(var(--pad) * 1.6); border-radius: var(--r-lg); background: var(--surface); box-shadow: var(--clay); }
.cl-hero__title { margin: 0; font-size: var(--fs-hero); line-height: var(--lh-head); font-weight: var(--fw-head); word-break: keep-all; text-wrap: balance; }
.cl-hero__lede { margin: var(--gap) 0 0; max-width: 26em; font-size: var(--fs-md); line-height: var(--lh-body); font-weight: var(--fw-body); word-break: keep-all; }
.cl-btn {
  display: inline-block; margin-top: var(--gap); padding: 16px 30px; border-radius: var(--r-pill);
  background: var(--accent); color: var(--on-accent); font-family: var(--font-ui); font-weight: var(--fw-head); text-decoration: none;
  box-shadow: var(--clay); transition: transform var(--dur-2) var(--spring), box-shadow var(--dur-1) ease;
}
.cl-btn:hover { transform: translateY(-3px) scale(1.03); }
.cl-btn:active { transform: translateY(2px) scale(0.97); box-shadow: var(--clay-press); }
.cl-btn:focus-visible { outline: 3px solid var(--text); outline-offset: 4px; }
.cl-hero__object {
  position: absolute; right: var(--margin); top: 50%; width: clamp(180px, 30vw, 380px); aspect-ratio: 1; translate: 0 -50%;
  border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff 0 8%, var(--accent) 45%, color-mix(in srgb, var(--accent) 60%, #000) 100%);
  box-shadow: 0 40px 60px -20px rgb(var(--clay-tint) / 0.5); animation: cl-float var(--float) ease-in-out infinite;
}
@keyframes cl-float { 50% { transform: translateY(-14px) scale(1.04); } }

/* 단계: 크기와 높이가 다른 조약돌 */
.cl-steps__title { margin: 0 0 var(--gap); font-size: var(--fs-xl); font-weight: var(--fw-head); }
.cl-steps__list { display: grid; grid-template-columns: 1.4fr 1fr 1.1fr; align-items: end; gap: var(--gap); margin: 0; padding: 0; list-style: none; }
.cl-pebble { display: flex; flex-direction: column; gap: 8px; padding: var(--pad); background: var(--surface); box-shadow: var(--clay); font-size: var(--fs-base); line-height: var(--lh-body); font-weight: var(--fw-body); word-break: keep-all; }
.cl-pebble b { font-size: var(--fs-lg); font-weight: var(--fw-head); line-height: var(--lh-head); }
.cl-pebble__n { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: var(--accent); color: var(--on-accent); font-family: var(--font-num); font-weight: var(--fw-head); }
.cl-pebble--first { min-height: 260px; border-radius: var(--r-lg) var(--r-lg) var(--r-md) var(--r-lg); }
.cl-pebble--mid { min-height: 180px; border-radius: var(--r-md); }
.cl-pebble--last { min-height: 220px; border-radius: var(--r-lg) var(--r-md) var(--r-lg) var(--r-lg); }

@media (max-width: 860px) {
  .cl-hero { padding-top: calc(var(--gap) + 160px); }
  .cl-hero__object { top: var(--gap); right: var(--margin); width: 150px; translate: 0 0; }
  .cl-steps__list { grid-template-columns: 1fr; }
  .cl-pebble { min-height: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .cl-hero__object { animation: none; }
  .cl-btn { transition: none; }
}
```

3D 일러스트가 생기면 `.cl-hero__object` 자리에 이미지(투명 배경 webp)를 넣고 같은 위치를 쓴다. 누를 때 말랑한 반응은 `cushion-button` 레시피.
