# pop-art 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 크기가 다른 만화 칸 셋과 칸을 넘는 효과음(히어로), 같은 물건을 색만 바꿔 반복하는 격자.

배울 점:
- 칸은 4px 검정 선으로 나뉘고 크기가 모두 다르다. 한 칸만 망점
- 효과음 글자는 -8° 기울고, 윤곽 + 단단한 그림자로 칸 경계를 넘는다
- 반복 격자는 같은 모양에 팔레트 네 색만 돌린다
- 버튼은 누르면 그림자가 8px에서 2px로 줄어든다

```html
<header class="pa-hero">
  <div class="pa-panel pa-panel--big"><h1 class="pa-hero__title">톡 쏘는<br>여름</h1></div>
  <div class="pa-panel pa-panel--dots" role="img" aria-label="캔 음료 그림 자리표시"></div>
  <div class="pa-panel pa-panel--cta"><p>새 맛 세 가지</p><a class="pa-btn" href="#taste">맛보기</a></div>
  <p class="pa-sfx" aria-hidden="true">치익!</p>
</header>

<section class="pa-repeat" aria-label="맛 고르기">
  <a href="#lime" class="pa-can">라임</a><a href="#peach" class="pa-can">복숭아</a><a href="#cola" class="pa-can">콜라</a><a href="#grape" class="pa-can">포도</a>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.pa-hero {
  box-sizing: border-box; position: relative; min-height: 100svh; padding: var(--margin); display: grid; gap: var(--gap);
  grid-template-columns: 1.6fr 1fr; grid-template-rows: 1.4fr 1fr; background: #fff;
}
.pa-panel { border: var(--line); display: grid; align-content: center; padding: clamp(16px, 3vw, 40px); }
.pa-panel--big { grid-row: span 2; background: var(--pa-yellow); }
.pa-panel--dots { background: radial-gradient(circle, rgb(0 0 0 / 0.85) 28%, transparent 30%) 0 0 / var(--dot) var(--dot), var(--pa-cyan); }
.pa-panel--cta { background: var(--pa-magenta); color: #fff; gap: 16px; justify-items: start; font-size: var(--fs-lg); font-weight: var(--fw-head); }
.pa-panel--cta p { margin: 0; }
.pa-hero__title { margin: 0; font-family: var(--font-display); font-size: var(--fs-hero); font-weight: var(--fw-head); font-synthesis: none; line-height: var(--lh-head); color: var(--ink); word-break: keep-all; }
.pa-sfx {
  position: absolute; left: 52%; top: 40%; margin: 0; rotate: var(--sfx-tilt); font-family: var(--font-display); font-size: var(--fs-sfx); font-weight: var(--fw-head); font-synthesis: none;
  color: var(--pa-red); -webkit-text-stroke: 4px var(--ink); paint-order: stroke fill; text-shadow: 6px 6px 0 var(--ink); pointer-events: none;
  animation: pa-pop 700ms var(--ease-pop) 300ms both;
}
@keyframes pa-pop { from { scale: 0.2; opacity: 0; } }
.pa-btn { padding: 12px 24px; background: #fff; color: var(--ink); border: var(--line); box-shadow: var(--hard); font-size: var(--fs-base); text-decoration: none; transition: box-shadow var(--dur-1), translate var(--dur-1); }
.pa-btn:active { box-shadow: var(--hard-press); translate: 6px 6px; }
.pa-btn:focus-visible { outline: 4px solid var(--pa-cyan); outline-offset: 4px; }

.pa-repeat { display: grid; grid-template-columns: repeat(4, 1fr); border-top: var(--line); }
.pa-can { aspect-ratio: 3 / 4; display: grid; place-items: end start; padding: 16px; border-right: var(--line); font-size: var(--fs-lg); font-weight: var(--fw-head); color: var(--ink); text-decoration: none; transition: background-size var(--dur-2) var(--ease-pop); background: radial-gradient(circle, rgb(0 0 0 / 0.8) 26%, transparent 28%) 0 0 / 0 0, var(--c); }
.pa-can:nth-child(1) { --c: var(--pa-yellow); } .pa-can:nth-child(2) { --c: var(--pa-magenta); } .pa-can:nth-child(3) { --c: var(--pa-red); } .pa-can:nth-child(4) { --c: var(--pa-cyan); border-right: 0; }
.pa-can:hover { background-size: var(--dot) var(--dot), auto; }

@media (max-width: 760px) {
  .pa-hero { grid-template-columns: 1fr; grid-template-rows: auto; }
  .pa-panel--big { grid-row: auto; min-height: 50svh; }
  .pa-panel--dots { min-height: 30svh; }
  .pa-repeat { grid-template-columns: repeat(2, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  .pa-sfx { animation: none; }
  .pa-btn, .pa-can { transition: none; }
}
```

호버 때 망점이 깔리는 효과는 마우스가 있는 화면에서만 의미가 있다. 터치 화면에서는 색 칸 그대로 둔다.
