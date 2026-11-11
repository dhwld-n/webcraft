# handwritten 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 반듯한 제목 위에 덧칠한 형광펜과 화살표 메모(히어로), 손으로 동그라미 친 레시피 재료 목록.

배울 점:
- 제목은 반듯한 고딕이고, 손글씨는 여백 메모 한 줄뿐이다
- 형광펜은 단어 아래 42% 높이의 기울어진 띠
- 화살표와 동그라미는 직접 그린 SVG 곡선. 그려지는 등장
- 재료 목록 본문은 반듯한 글꼴, 동그라미만 손그림

```html
<header class="hw-hero">
  <h1 class="hw-hero__title">엄마의 <mark>된장찌개</mark><br>그대로 적어 둡니다</h1>
  <p class="hw-note">진짜 이게 다예요!</p>
  <svg class="hw-arrow" viewBox="0 0 140 90" aria-hidden="true"><path d="M8 12 C 40 4, 92 18, 112 64 M96 58 L113 67 L120 48"/></svg>
</header>

<section class="hw-recipe" aria-labelledby="hw-r">
  <h2 id="hw-r">재료 (2인분)</h2>
  <ul>
    <li>된장 2큰술</li>
    <li class="hw-circled">애호박 반 개 <svg viewBox="0 0 200 60" aria-hidden="true" preserveAspectRatio="none"><path d="M12 30 C 14 6, 186 4, 190 28 C 193 52, 20 58, 10 34 C 6 22, 40 10, 70 9"/></svg></li>
    <li>두부 반 모</li>
    <li>멸치 육수 500ml</li>
  </ul>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다. --font-hand는 system-designer가 고른 손글씨 글꼴 */
.hw-hero { box-sizing: border-box; position: relative; min-height: 90svh; display: grid; align-content: center; padding: var(--margin); max-width: var(--max); margin: 0 auto; color: var(--ink); }
.hw-hero__title { margin: 0; font-size: var(--fs-hero); font-weight: 700; line-height: var(--lh-head); letter-spacing: -0.02em; word-break: keep-all; }
.hw-hero__title mark { background: var(--highlight); color: inherit; padding: 0 0.06em; }
.hw-note { position: absolute; right: var(--margin); top: 24%; margin: 0; font-family: var(--font-hand); font-size: var(--fs-hand); color: var(--red-pen); rotate: var(--note-tilt); }
.hw-arrow { position: absolute; right: calc(var(--margin) + 4%); top: calc(24% + 3.2em); width: 130px; rotate: 8deg; }
.hw-arrow path, .hw-circled path { fill: none; stroke: var(--red-pen); stroke-width: var(--pen); stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 600; stroke-dashoffset: 600; animation: hw-draw var(--draw) var(--ease) 400ms forwards; }
@keyframes hw-draw { to { stroke-dashoffset: 0; } }

.hw-recipe { box-sizing: border-box; max-width: 640px; margin: 0 auto; padding: calc(var(--gap) * 3) var(--margin); color: var(--ink);
  background: repeating-linear-gradient(transparent 0 calc(1.7em - 1px), rgb(35 48 92 / 0.12) calc(1.7em - 1px) 1.7em); font-size: var(--fs-lg); line-height: 1.7; }
.hw-recipe h2 { margin: 0; font-size: var(--fs-lg); font-weight: 700; }
.hw-recipe ul { margin: 0; padding: 0 0 0 1.2em; }
.hw-circled { position: relative; width: fit-content; }
.hw-circled svg { position: absolute; inset: -0.3em -0.8em; width: calc(100% + 1.6em); height: calc(100% + 0.6em); overflow: visible; }

@media (max-width: 760px) {
  .hw-note { position: static; margin-top: var(--gap); }
  .hw-arrow { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .hw-arrow path, .hw-circled path { animation: none; stroke-dashoffset: 0; }
}
```

공책 줄 간격(1.7em)은 본문 행간과 같아야 글자가 줄 위에 앉는다. 행간을 바꾸면 줄 간격도 같이 바꾼다.
