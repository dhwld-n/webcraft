# maximalism 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 화면 밖으로 넘치는 제목과 스티커(히어로), 서로 반대로 흐르는 띠 두 줄.

배울 점:
- 제목이 화면 폭의 17%로 커서 단어가 잘린다. 한 단어만 세리프 이탤릭
- 스티커 두 개가 같은 각도 규칙(-4°, 3°)으로 기울어 겹친다
- 띠 두 줄은 서로 반대 방향, 다른 속도. 띠 안에 글자와 알약이 섞인다
- 색은 팔레트 네 가지(`--c1`~`--c4`) 안에서만 돈다

```html
<header class="mx-hero">
  <h1 class="mx-hero__title">한여름<br><em>밤의</em> 소음</h1>
  <p class="mx-sticker mx-sticker--a">8월 9일</p>
  <p class="mx-sticker mx-sticker--b">강변 무대</p>
</header>

<section class="mx-bands" aria-label="출연진">
  <div class="mx-band mx-band--1"><p>밴드 하나 <span>밴드 둘</span> 밴드 셋 <span>밴드 넷</span> 밴드 하나 <span>밴드 둘</span> 밴드 셋 <span>밴드 넷</span></p></div>
  <div class="mx-band mx-band--2" aria-hidden="true"><p>지금 예매 · 지금 예매 · 지금 예매 · 지금 예매 · 지금 예매 · 지금 예매 ·</p></div>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다. --c1~--c4는 system-designer의 팔레트 */
.mx-hero { box-sizing: border-box; position: relative; min-height: 100svh; padding: var(--margin); overflow: hidden; background: var(--c1); color: var(--c4); display: grid; align-content: end; }
.mx-hero__title {
  margin: 0 calc(var(--margin) * -0.5); font-family: var(--font-display); font-size: var(--fs-hero); font-weight: var(--fw-head); font-synthesis: none;
  line-height: var(--lh-head); letter-spacing: var(--ls-head); word-break: keep-all; white-space: nowrap;
}
.mx-hero__title em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--c2); }
.mx-sticker {
  position: absolute; margin: 0; padding: 14px 26px; border-radius: var(--r-sticker); border: var(--sticker-edge);
  background: var(--c3); color: var(--c4); font-size: var(--fs-lg); font-weight: var(--fw-head);
  transition: rotate var(--dur-2) var(--ease-pop), scale var(--dur-2) var(--ease-pop);
}
.mx-sticker--a { top: 14%; right: 8%; rotate: var(--tilt-1); }
.mx-sticker--b { top: 30%; right: 22%; rotate: var(--tilt-2); background: var(--c2); }
.mx-sticker:hover { scale: 1.06; rotate: 0deg; }

.mx-bands { overflow: hidden; background: var(--c4); padding-block: var(--gap); }
.mx-band { border-block: 2px solid var(--c1); overflow: hidden; }
.mx-band p { display: flex; gap: 0.4em; width: max-content; margin: 0; padding-block: 8px; font-size: var(--fs-xl); font-weight: var(--fw-head); line-height: 1; color: var(--c1); white-space: nowrap; animation: mx-run var(--marquee) linear infinite; }
.mx-band span { padding: 0 0.3em; border: 2px solid currentColor; border-radius: var(--r-sticker); font-family: var(--font-serif); font-style: italic; font-weight: 400; }
.mx-band--2 p { color: var(--c2); font-size: var(--fs-lg); animation-direction: reverse; animation-duration: calc(var(--marquee) * 0.7); }
@keyframes mx-run { to { translate: -50% 0; } }

@media (max-width: 760px) {
  .mx-hero__title { white-space: normal; }
  .mx-sticker { font-size: var(--fs-base); padding: 10px 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .mx-band p { animation: none; }
  .mx-sticker { transition: none; }
}
```

띠 글자는 두 번 반복해야 -50% 이동에서 이음매가 안 보인다. 길이가 다르면 `marquee` 레시피의 JS 복제 방식을 쓴다.
