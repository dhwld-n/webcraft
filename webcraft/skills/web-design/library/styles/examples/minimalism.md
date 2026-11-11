# minimalism 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 아래 왼쪽에 놓인 큰 제목 하나(히어로), 라벨과 값이 줄 맞춰 놓인 사양표.

배울 점:
- 첫 화면에 요소가 셋뿐이다: 작은 이름, 아주 큰 제목, 오른쪽 아래 작은 설명. 크기 대비가 8배다
- 제목은 1~8열, 설명은 10~12열. 가운데 정렬이 없다
- 사양표는 선 하나와 줄 맞춤만으로 정리한다. 카드, 아이콘, 그림자가 없다
- 숫자는 고정폭 숫자로 세로 줄을 맞춘다

```html
<header class="mn-hero">
  <p class="mn-hero__name">이름</p>
  <h1 class="mn-hero__title">의자 하나를<br>십 년 동안</h1>
  <p class="mn-hero__note">참나무와 놋쇠만 씁니다. 주문을 받으면 만들기 시작합니다.</p>
</header>

<section class="mn-spec" aria-labelledby="spec-title">
  <h2 id="spec-title" class="mn-label">사양</h2>
  <dl class="mn-spec__list">
    <div><dt>높이</dt><dd>780 mm</dd></div>
    <div><dt>앉는 높이</dt><dd>445 mm</dd></div>
    <div><dt>무게</dt><dd>6.2 kg</dd></div>
    <div><dt>만드는 기간</dt><dd>6주</dd></div>
  </dl>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.mn-hero, .mn-spec {
  box-sizing: border-box; max-width: var(--max); margin: 0 auto; padding: 0 var(--margin);
  display: grid; grid-template-columns: repeat(var(--cols), 1fr); column-gap: var(--gap);
}
.mn-hero { min-height: 100svh; align-content: space-between; padding-block: var(--s-4); }
.mn-hero__name { grid-column: 1 / -1; margin: 0; font-size: var(--fs-sm); font-weight: var(--fw-head); }
.mn-hero__title {
  grid-column: 1 / 9; margin: 0; font-size: var(--fs-hero); font-weight: var(--fw-head);
  line-height: var(--lh-head); letter-spacing: var(--ls-head); word-break: keep-all;
}
.mn-hero__note { grid-column: 10 / 13; align-self: end; margin: 0; font-size: var(--fs-sm); line-height: var(--lh-body); color: color-mix(in srgb, var(--text) 70%, transparent); word-break: keep-all; }

.mn-spec { padding-block: var(--section); }
.mn-label { grid-column: 1 / 4; margin: 0; font-size: var(--fs-xs); font-weight: var(--fw-head); }
.mn-spec__list { grid-column: 5 / 13; margin: 0; }
.mn-spec__list div { display: grid; grid-template-columns: 1fr auto; padding: var(--s-2) 0; border-top: var(--line); }
.mn-spec__list div:last-child { border-bottom: var(--line); }
.mn-spec__list dt { font-size: var(--fs-base); }
.mn-spec__list dd { margin: 0; font-size: var(--fs-base); font-family: var(--font-num); font-variant-numeric: tabular-nums; }

@media (max-width: 760px) {
  .mn-hero__title { grid-column: 1 / -1; }
  .mn-hero__note { grid-column: 1 / -1; margin-top: var(--s-4); max-width: 24em; }
  .mn-label, .mn-spec__list { grid-column: 1 / -1; }
  .mn-label { margin-bottom: var(--s-3); }
}
```

이 예에는 움직임이 없다. 넣는다면 제목에 `scroll-reveal`을 약하게 하나만.
