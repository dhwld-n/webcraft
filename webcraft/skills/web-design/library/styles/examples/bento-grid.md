# bento-grid 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

한 화면짜리 도시락 하나. 칸마다 **내용의 종류가 다르다**: 큰 숫자 + 작은 막대그래프, 사진, 인용 한 줄, 작은 표, 지금 움직이는 상태, 행동 하나.

배울 점:
- 가장 중요한 칸(큰 숫자)이 3x2로 가장 크다. 크기가 위계다
- 칸 안 구성이 모두 다르다. "아이콘 + 제목 + 설명 두 줄"이 반복되지 않는다
- 강조색으로 채운 칸은 하나뿐이다
- 칸 둥글기는 하나, 칸 안 요소 둥글기는 그보다 작다 (겹친 둥글기가 어색하지 않게)

```html
<section class="bn" aria-label="한눈에 보기">
  <h2 class="bn-title">이번 달, 숫자로 본 작업실</h2>

  <article class="bn-cell bn-stat">
    <p class="bn-label">완성한 주문</p>
    <p class="bn-stat__num">128</p>
    <ol class="bn-bars" aria-label="주별 주문: 22, 31, 34, 41">
      <li style="--v: 0.54"></li><li style="--v: 0.76"></li><li style="--v: 0.83"></li><li style="--v: 1"></li>
    </ol>
  </article>

  <figure class="bn-cell bn-photo">
    <div class="bn-photo__img" role="img" aria-label="사진 자리표시: 작업대 위 도구"></div>
    <figcaption>작업대, 오전 열 시</figcaption>
  </figure>

  <blockquote class="bn-cell bn-quote">
    <p>“주문한 지 사흘 만에, 손편지까지 같이 왔어요.”</p>
    <cite>후기 자리표시</cite>
  </blockquote>

  <article class="bn-cell bn-table">
    <p class="bn-label">재료 재고</p>
    <dl>
      <div><dt>가죽</dt><dd>14장</dd></div>
      <div><dt>실</dt><dd>9타래</dd></div>
      <div><dt>단추</dt><dd>230개</dd></div>
    </dl>
  </article>

  <article class="bn-cell bn-live">
    <p class="bn-label">지금</p>
    <p class="bn-live__now"><span class="bn-dot" aria-hidden="true"></span>카드 지갑 바느질 중</p>
  </article>

  <a class="bn-cell bn-cta" href="#order">
    <span class="bn-cta__text">주문 받는 중</span>
    <span class="bn-cta__arrow" aria-hidden="true">→</span>
  </a>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.bn {
  display: grid; grid-template-columns: repeat(var(--cols), minmax(0, 1fr)); grid-auto-rows: var(--row); gap: var(--gap);
  max-width: var(--max); margin: 0 auto; padding: var(--s-section, 96px) var(--margin);
}
.bn-title { grid-column: 1 / -1; align-self: end; margin: 0 0 var(--gap); font-size: var(--fs-hero); line-height: var(--lh-head); letter-spacing: var(--track-head); font-weight: 700; word-break: keep-all; }
.bn-cell { margin: 0; padding: var(--cell-pad); border-radius: var(--radius); background: var(--cell); border: var(--cell-line); overflow: hidden; min-width: 0; }
.bn-label { margin: 0; font-size: var(--fs-sm); color: var(--muted); }

/* 큰 숫자 칸: 3x2. 숫자는 위, 막대는 바닥 */
.bn-stat { grid-column: span 3; grid-row: span 2; display: flex; flex-direction: column; }
.bn-stat__num { margin: auto 0 0; font-family: var(--font-num); font-size: var(--fs-stat); line-height: 0.9; letter-spacing: var(--track-stat); font-variant-numeric: tabular-nums; font-weight: 700; }
.bn-bars { display: flex; align-items: end; gap: 8px; height: 30%; margin: var(--s-3, 24px) 0 0; padding: 0; list-style: none; }
.bn-bars li { flex: 1; height: calc(var(--v) * 100%); border-radius: var(--radius-inner) var(--radius-inner) 4px 4px; background: color-mix(in srgb, var(--text) 16%, transparent); }
.bn-bars li:last-child { background: var(--accent); }

/* 사진 칸: 3x2, 여백 없이 꽉 */
.bn-photo { grid-column: span 3; grid-row: span 2; padding: 0; position: relative; }
.bn-photo__img { position: absolute; inset: 0; background: color-mix(in srgb, var(--text) 14%, var(--surface)); }
.bn-photo figcaption { position: absolute; left: var(--cell-pad); bottom: var(--cell-pad); padding: 6px 10px; border-radius: 999px; font-size: var(--fs-xs); background: var(--bg); }

/* 인용 칸: 3x1, 글자만 */
.bn-quote { grid-column: span 3; display: flex; flex-direction: column; justify-content: space-between; }
.bn-quote p { margin: 0; font-size: var(--fs-md); line-height: 1.35; word-break: keep-all; }
.bn-quote cite { font-size: var(--fs-xs); font-style: normal; color: var(--muted); }

/* 표 칸: 2x1 */
.bn-table { grid-column: span 2; }
.bn-table dl { margin: 12px 0 0; }
.bn-table dl > div { display: flex; justify-content: space-between; padding-block: 6px; border-top: var(--cell-line); font-size: var(--fs-sm); }
.bn-table dd { margin: 0; font-family: var(--font-num); font-variant-numeric: tabular-nums; }

/* 지금 칸: 1x1 */
.bn-live { grid-column: span 1; display: flex; flex-direction: column; justify-content: space-between; }
.bn-live__now { margin: 0; font-size: var(--fs-sm); line-height: 1.35; word-break: keep-all; }
.bn-dot { display: inline-block; width: 8px; height: 8px; margin-right: 6px; border-radius: 50%; background: var(--accent); animation: bn-pulse 2s var(--ease) infinite; }
@keyframes bn-pulse { 50% { opacity: 0.3; } }

/* 행동 칸: 강조색으로 채운 유일한 칸. 마지막 줄을 가로로 다 쓴다 */
.bn-cta { grid-column: 1 / -1; display: flex; justify-content: space-between; align-items: end; background: var(--accent); color: var(--on-accent); border-color: transparent; text-decoration: none; font-size: var(--fs-xl); font-weight: 700; transition: transform var(--dur-1) var(--ease); }
.bn-cta:hover { transform: translateY(-3px); }
.bn-cta:focus-visible { outline: 3px solid var(--text); outline-offset: 3px; }
.bn-cta__arrow { transition: transform var(--dur-2) var(--ease); }
.bn-cta:hover .bn-cta__arrow { transform: translateX(6px); }

@media (max-width: 860px) {
  .bn { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .bn-stat, .bn-photo, .bn-quote, .bn-cta { grid-column: 1 / -1; }
  .bn-table { grid-column: span 2; }
  .bn-live { grid-column: span 2; grid-row: span 1; }
}
@media (prefers-reduced-motion: reduce) {
  .bn-dot { animation: none; }
  .bn-cta, .bn-cta__arrow { transition: none; }
}
```

칸이 차례로 떠오르게 하려면 `scroll-reveal` 레시피를 칸마다 쓰고 지연을 `--stagger`씩 늘린다.
