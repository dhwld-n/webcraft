# dark-tech 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

세 섹션은 틀이 서로 다르다: 비대칭 히어로 + 살아 있는 기록, 큰 숫자 하나, 정의 목록. 이웃한 섹션의 틀을 다르게 하는 예다.

배울 점:
- 제목은 화면 왼쪽 7열, 살아 있는 요소는 오른쪽 끝에 붙인다. 가운데 정렬이 없다
- 크기 대비가 극단적이다 (제목 132px 대 본문 16px, 큰 숫자 240px 대 설명 14px)
- 선은 정보를 나눌 때만 1px. 카드, 그림자, 빛 번짐이 없다
- 숫자는 `tabular-nums`라 바뀌어도 흔들리지 않는다
- 라벨은 한글 소문장. 영문 대문자 모노 라벨이 없다

```html
<header class="dt-hero">
  <div class="dt-hero__copy">
    <h1 class="dt-hero__title">일정 사이의 빈칸을 시간으로 돌려드립니다</h1>
    <p class="dt-hero__lede">회의와 회의 사이 흩어진 15분을 모아, 집중할 수 있는 한 덩어리로 바꿉니다.</p>
    <a class="dt-btn" href="#start">내 일정 연결하기</a>
  </div>
  <figure class="dt-live">
    <figcaption>오늘 정리한 기록</figcaption>
    <ol class="dt-log" aria-live="off">
      <li><time>09:02</time><span>주간 회의 두 건을 하나로</span><b>+18분</b></li>
      <li><time>10:40</time><span>이동 시간 확보</span><b>+12분</b></li>
      <li><time>13:15</time><span>답장 몰아 쓰기 묶음</span><b>+25분</b></li>
    </ol>
    <p class="dt-live__sum">합계 <strong class="dt-num">0:55</strong></p>
  </figure>
</header>

<section class="dt-figure" aria-labelledby="fig-label">
  <p class="dt-figure__num"><span class="dt-num">4.2</span><span class="dt-figure__unit">시간</span></p>
  <p class="dt-figure__note" id="fig-label">한 주 동안 돌려받는 평균 시간. <!-- 실제 수치와 출처로 바꾼다 --> 수치 자리표시.</p>
</section>

<section class="dt-spec">
  <h2 class="dt-spec__title">무엇을 읽고, 무엇은 건드리지 않나</h2>
  <dl class="dt-spec__rows">
    <div><dt>읽는 곳</dt><dd>캘린더 세 곳과 메일 하나</dd></div>
    <div><dt>옮기는 것</dt><dd>참석자가 나뿐인 일정만</dd></div>
    <div><dt>묻는 것</dt><dd>다른 사람이 걸린 일정은 옮기기 전에 묻습니다</dd></div>
    <div><dt>지우는 것</dt><dd>없음</dd></div>
  </dl>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.dt-hero, .dt-figure, .dt-spec {
  display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--gutter);
  max-width: var(--max); margin: 0 auto; padding: 0 var(--margin);
}
.dt-num { font-family: var(--font-num); font-variant-numeric: tabular-nums; letter-spacing: var(--track-num); }

/* 히어로: 제목은 왼쪽 7열, 기록은 오른쪽 4열을 바닥에 붙인다 */
.dt-hero { min-height: 100svh; align-items: end; padding-block: var(--s-6) var(--s-5); row-gap: var(--s-5); }
.dt-hero__copy { grid-column: 1 / span 7; }
.dt-hero__title {
  margin: 0; font-size: var(--fs-hero); line-height: var(--lh-hero); letter-spacing: var(--track-hero);
  font-weight: 600; word-break: keep-all; text-wrap: balance;
}
.dt-hero__lede { margin: var(--s-4) 0 0; max-width: var(--measure); font-size: var(--fs-md); line-height: 1.45; color: var(--muted); }
.dt-btn {
  display: inline-block; margin-top: var(--s-4); padding: 14px 22px; border-radius: var(--radius);
  background: var(--accent); color: var(--on-accent); font-family: var(--font-ui); text-decoration: none;
  transition: transform var(--dur-1) var(--ease);
}
.dt-btn:hover { transform: translateY(-2px); }
.dt-btn:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }

.dt-live { grid-column: 9 / -1; margin: 0; font-size: var(--fs-sm); }
.dt-live figcaption { padding-bottom: var(--s-2); color: var(--muted); border-bottom: var(--hairline); }
.dt-log { list-style: none; margin: 0; padding: 0; }
.dt-log li {
  display: grid; grid-template-columns: 5ch 1fr auto; gap: var(--s-2); align-items: baseline;
  padding-block: 12px; border-bottom: var(--hairline);
  animation: dt-row var(--dur-3) var(--ease) both;
}
.dt-log time, .dt-log b { font-family: var(--font-num); font-variant-numeric: tabular-nums; font-weight: 400; }
.dt-log time { color: var(--muted); }
.dt-log b { color: var(--accent); }
.dt-live__sum { display: flex; justify-content: space-between; align-items: baseline; margin: var(--s-2) 0 0; color: var(--muted); }
.dt-live__sum strong { font-size: var(--fs-xl); color: var(--text); font-weight: 500; }
@keyframes dt-row { from { opacity: 0; transform: translateY(8px); } }

/* 큰 숫자 하나: 숫자는 7열, 설명은 숫자 바닥선에 맞춰 오른쪽 */
.dt-figure { padding-block: var(--section); align-items: end; border-top: var(--hairline); }
.dt-figure__num { grid-column: 1 / span 8; margin: 0; display: flex; align-items: baseline; gap: var(--s-2); line-height: 0.8; }
.dt-figure__num .dt-num { font-size: var(--fs-figure); font-weight: 500; }
.dt-figure__unit { font-size: var(--fs-lg); color: var(--muted); }
.dt-figure__note { grid-column: 10 / -1; margin: 0; font-size: var(--fs-sm); line-height: var(--lh-body); color: var(--muted); }

/* 정의 목록: 제목은 왼쪽에 붙어 따라오고, 줄은 오른쪽 7열 */
.dt-spec { padding-block: 0 var(--section); }
.dt-spec__title {
  grid-column: 1 / span 4; align-self: start; position: sticky; top: var(--s-5); margin: 0;
  font-size: var(--fs-xl); line-height: var(--lh-head); letter-spacing: var(--track-head); font-weight: 600; word-break: keep-all;
}
.dt-spec__rows { grid-column: 6 / -1; margin: 0; }
.dt-spec__rows > div { display: grid; grid-template-columns: 10em 1fr; gap: var(--s-3); padding-block: var(--s-3); border-top: var(--hairline); }
.dt-spec__rows dt { color: var(--muted); font-size: var(--fs-sm); padding-top: 3px; }
.dt-spec__rows dd { margin: 0; font-size: var(--fs-md); line-height: 1.4; word-break: keep-all; }

@media (max-width: 860px) {
  .dt-hero__copy, .dt-live, .dt-figure__num, .dt-figure__note, .dt-spec__title, .dt-spec__rows { grid-column: 1 / -1; }
  .dt-spec__title { position: static; margin-bottom: var(--s-4); }
  .dt-figure__note { margin-top: var(--s-3); }
  .dt-spec__rows > div { grid-template-columns: 1fr; gap: 4px; }
}
@media (prefers-reduced-motion: reduce) {
  .dt-log li { animation: none; }
  .dt-btn { transition: none; }
}
```

살아 있는 기록에 새 줄을 더하려면 `odometer`(합계)와 함께, 몇 초마다 `<li>`를 맨 위에 넣고 마지막 줄을 지운다. 모션 줄이기 설정이면 넣지 않는다.
