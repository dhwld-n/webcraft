# swiss 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 칸을 가로지르는 큰 제목과 칸 안의 정보 덩어리(히어로), 선으로 나눈 일정표.

배울 점:
- 제목 하나가 12열을 거의 다 쓰고, 날짜·장소·번호 같은 작은 정보는 3열짜리 칸에 정확히 들어간다
- 원색은 한 곳(날짜 칸 면)에만 크게
- 일정표는 2px 선으로 시작하고 1px 선으로 나눈다. 시간은 고정폭 숫자
- 모든 요소의 왼쪽 끝이 칸 선에 맞는다

```html
<header class="sw-hero">
  <p class="sw-hero__no">03</p>
  <h1 class="sw-hero__title">도시를 읽는<br>열두 가지 방법</h1>
  <dl class="sw-hero__facts">
    <div class="sw-fact sw-fact--accent"><dt>날짜</dt><dd>5.14–5.18</dd></div>
    <div class="sw-fact"><dt>장소</dt><dd>문화역 2층</dd></div>
    <div class="sw-fact"><dt>입장</dt><dd>무료</dd></div>
  </dl>
</header>

<section class="sw-table" aria-labelledby="sch">
  <h2 id="sch" class="sw-table__head">일정</h2>
  <ol class="sw-table__rows">
    <li><time>10:00</time><b>지도 그리기</b><span>3층 작업실</span></li>
    <li><time>13:30</time><b>버스 노선 걷기</b><span>역 앞 정류장</span></li>
    <li><time>16:00</time><b>표지판 수집</b><span>2층 전시장</span></li>
  </ol>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.sw-hero, .sw-table {
  box-sizing: border-box; max-width: var(--max); margin: 0 auto; padding: var(--margin);
  display: grid; grid-template-columns: repeat(var(--cols), 1fr); column-gap: var(--gap);
}
.sw-hero { min-height: 100svh; align-content: space-between; row-gap: var(--margin); border-bottom: var(--rule-bold); }
.sw-hero__no { grid-column: 1 / 3; margin: 0; font-size: var(--fs-lg); font-weight: var(--fw-head); font-family: var(--font-num); }
.sw-hero__title { grid-column: 1 / 12; margin: 0; font-size: var(--fs-hero); font-weight: var(--fw-head); line-height: var(--lh-head); letter-spacing: var(--ls-head); word-break: keep-all; }
.sw-hero__facts { grid-column: 1 / -1; display: grid; grid-template-columns: subgrid; margin: 0; }
.sw-fact { grid-column: span 3; padding: 12px; border-top: var(--rule); }
.sw-fact dt { font-size: var(--fs-sm); }
.sw-fact dd { margin: 4px 0 0; font-size: var(--fs-lg); font-weight: var(--fw-head); letter-spacing: -0.02em; }
.sw-fact--accent { background: var(--accent); color: var(--on-accent); border-top-color: transparent; }

.sw-table__head { grid-column: 1 / 4; margin: 0; font-size: var(--fs-lg); font-weight: var(--fw-head); }
.sw-table__rows { grid-column: 4 / -1; margin: 0; padding: 0; list-style: none; border-top: var(--rule-bold); }
.sw-table__rows li { display: grid; grid-template-columns: 1fr 2fr 1.5fr; gap: var(--gap); padding: 14px 0; border-bottom: var(--rule); font-size: var(--fs-base); line-height: var(--lh-body); }
.sw-table__rows time { font-family: var(--font-num); font-variant-numeric: tabular-nums; }

@media (max-width: 760px) {
  .sw-hero__title { grid-column: 1 / -1; }
  .sw-fact { grid-column: span 12; }
  .sw-table__head, .sw-table__rows { grid-column: 1 / -1; }
  .sw-table__head { margin-bottom: 12px; }
  .sw-table__rows li { grid-template-columns: 5ch 1fr; }
  .sw-table__rows li span { grid-column: 2; }
}
```

숫자가 바뀌는 움직임이 필요하면 `odometer`를 일정 수나 날짜 칸 하나에만.
