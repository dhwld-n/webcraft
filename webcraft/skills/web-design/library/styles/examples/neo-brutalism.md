# neo-brutalism 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 포스터 같은 첫 화면(제목 덩어리 + 스티커 + 티켓 버튼), 굵은 선의 시간표.

배울 점:
- 제목이 화면 폭을 꽉 채우고 줄마다 덩어리 색이 다르다. 카드 나열이 아니다
- 스티커는 둘만 기울인다. 모든 것을 기울이면 소란스럽기만 하다
- 버튼은 누르면 그림자 쪽으로 들어간다 (그림자 6px → 2px, 위치 4px 이동)
- 표는 진짜 `<table>`. 굵은 선 하나로 칸을 나누고 현재 줄만 색을 채운다

```html
<header class="nb-poster">
  <h1 class="nb-poster__title">
    <span class="nb-line nb-line--a">동네</span>
    <span class="nb-line nb-line--b">보드게임</span>
    <span class="nb-line nb-line--c">밤샘</span>
  </h1>
  <p class="nb-sticker nb-sticker--date">12월 20일 토요일 밤 8시</p>
  <p class="nb-sticker nb-sticker--seat">자리 24개</p>
  <p class="nb-poster__lede">처음 온 사람도 규칙 설명부터. 게임은 120종, 간식은 각자 하나씩.</p>
  <a class="nb-ticket" href="#join"><span>자리 잡기</span><span class="nb-ticket__stub">무료</span></a>
</header>

<section class="nb-table" aria-labelledby="tt">
  <h2 id="tt" class="nb-table__title">밤의 순서</h2>
  <table>
    <thead><tr><th scope="col">시간</th><th scope="col">무엇</th><th scope="col">누구와</th></tr></thead>
    <tbody>
      <tr><td>20:00</td><td>규칙 설명 · 가벼운 게임</td><td>처음 온 사람</td></tr>
      <tr class="is-now"><td>21:30</td><td>팀 게임 리그</td><td>네 명씩</td></tr>
      <tr><td>24:00</td><td>야식과 자유 게임</td><td>남는 사람 모두</td></tr>
    </tbody>
  </table>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.nb-poster, .nb-table { max-width: var(--max); margin: 0 auto; padding: var(--section) var(--margin); }

/* 포스터: 제목 줄마다 다른 색 덩어리, 위에 스티커 둘 */
.nb-poster { position: relative; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--gutter); row-gap: var(--s-4); }
.nb-poster__title { grid-column: 1 / -1; margin: 0; display: flex; flex-direction: column; align-items: flex-start; gap: var(--s-1); font-size: var(--fs-hero); line-height: var(--lh-hero); letter-spacing: var(--track-hero); font-weight: 900; word-break: keep-all; }
.nb-line { display: inline-block; padding: 0.04em 0.12em 0.08em; border: var(--border); box-shadow: var(--shadow); }
.nb-line--a { background: var(--accent); color: var(--on-accent); }
.nb-line--b { background: var(--surface); margin-left: 8%; }
.nb-line--c { background: var(--accent-2, var(--surface)); }
.nb-sticker { position: absolute; margin: 0; padding: var(--s-1) var(--s-2); border: var(--border); border-radius: var(--radius); background: var(--surface); font-size: var(--fs-md); font-weight: 800; box-shadow: var(--shadow); }
.nb-sticker--date { top: calc(var(--section) * 0.5); right: var(--margin); transform: rotate(var(--tilt)); }
.nb-sticker--seat { top: 46%; right: 14%; transform: rotate(var(--tilt-2)); background: var(--accent); color: var(--on-accent); }
.nb-poster__lede { grid-column: 1 / span 5; margin: 0; font-size: var(--fs-md); line-height: 1.35; word-break: keep-all; }
.nb-ticket {
  grid-column: 9 / -1; align-self: end; justify-self: end; display: flex; border: var(--border); border-radius: var(--radius);
  background: var(--surface); color: var(--text); text-decoration: none; font-size: var(--fs-lg); font-weight: 900; box-shadow: var(--shadow);
  transition: transform var(--dur-1) linear, box-shadow var(--dur-1) linear;
}
.nb-ticket > span { padding: var(--s-2) var(--s-3); }
.nb-ticket__stub { border-left: var(--bw) dashed var(--ink); background: var(--accent); color: var(--on-accent); }
.nb-ticket:active { transform: translate(4px, 4px); box-shadow: var(--shadow-press); }
.nb-ticket:focus-visible { outline: var(--bw) solid var(--ink); outline-offset: 4px; }

/* 시간표: 굵은 선 하나, 현재 줄만 채운다 */
.nb-table__title { margin: 0 0 var(--s-3); font-size: var(--fs-xl); line-height: var(--lh-head); font-weight: 900; }
.nb-table table { width: 100%; border-collapse: collapse; border: var(--border); box-shadow: var(--shadow); background: var(--surface); font-size: var(--fs-md); }
.nb-table th { text-align: left; font-size: var(--fs-sm); font-weight: 800; padding: var(--s-1) var(--s-3); border-bottom: var(--border); }
.nb-table td { padding: var(--s-3); border-top: var(--border); vertical-align: top; word-break: keep-all; }
.nb-table td:first-child { font-family: var(--font-num); font-variant-numeric: tabular-nums; font-weight: 800; width: 7ch; }
.nb-table tr.is-now td { background: var(--accent); color: var(--on-accent); }

@media (max-width: 860px) {
  .nb-poster__lede, .nb-ticket { grid-column: 1 / -1; justify-self: start; }
  .nb-sticker { position: static; justify-self: start; grid-column: span 6; }
  .nb-table table { font-size: var(--fs-base); }
  .nb-table td, .nb-table th { padding: var(--s-2); }
}
@media (prefers-reduced-motion: reduce) { .nb-ticket { transition: none; } }
```
