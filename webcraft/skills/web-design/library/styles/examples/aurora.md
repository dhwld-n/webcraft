# aurora 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 아래에서 피어오르는 빛과 왼쪽 아래 글(히어로), 빛 없이 선으로 나눈 세 줄 목록.

배울 점:
- 빛의 띠는 가운데 원이 아니라 화면 아래에서 비스듬히 올라오는 긴 타원 셋이다
- 빛 층은 `filter: blur`를 한 번만 건다 (띠마다 걸지 않는다)
- 그레인 한 겹으로 색 띠(밴딩)를 감춘다
- 두 번째 섹션에는 빛이 없다. 어둠과 선만

```html
<header class="au-hero">
  <div class="au-sky" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="au-hero__text">
    <h1 class="au-hero__title">잠들기 전<br>십오 분</h1>
    <p class="au-hero__lede">눈을 감고 소리만 따라가세요.</p>
  </div>
</header>

<section class="au-list" aria-labelledby="au-l">
  <h2 id="au-l" class="au-list__title">오늘 밤의 소리</h2>
  <ol>
    <li><span>01</span><b>북쪽 숲의 비</b><time>14:20</time></li>
    <li><span>02</span><b>얼음 위 바람</b><time>12:05</time></li>
    <li><span>03</span><b>먼 기차</b><time>16:40</time></li>
  </ol>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.au-hero { position: relative; min-height: 100svh; overflow: hidden; isolation: isolate; background: var(--bg); color: #fff; display: grid; align-items: end; }
.au-sky { position: absolute; inset: -20%; z-index: -2; filter: blur(var(--glow-blur)); opacity: var(--glow-alpha); }
.au-sky i { position: absolute; display: block; border-radius: 50%; mix-blend-mode: screen; animation: au-sway var(--glow-speed) var(--ease) infinite alternate; }
.au-sky i:nth-child(1) { width: 70%; height: 28%; left: -5%; bottom: 18%; background: var(--glow-1); rotate: -14deg; }
.au-sky i:nth-child(2) { width: 60%; height: 22%; left: 30%; bottom: 26%; background: var(--glow-2); rotate: -22deg; animation-duration: calc(var(--glow-speed) * 1.3); animation-delay: -6s; }
.au-sky i:nth-child(3) { width: 45%; height: 30%; right: -8%; bottom: 8%; background: var(--glow-3); rotate: -8deg; animation-duration: calc(var(--glow-speed) * 0.8); animation-delay: -3s; }
@keyframes au-sway { to { translate: 6% -8%; scale: 1.12 0.9; } }
.au-hero::after { /* 그레인: 색 띠를 감춘다 */
  content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0.12; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.au-hero__text { box-sizing: border-box; width: 100%; max-width: var(--max); margin: 0 auto; padding: var(--margin); }
.au-hero__title { margin: 0; font-size: var(--fs-hero); font-weight: var(--fw-head); line-height: var(--lh-head); letter-spacing: var(--ls-head); word-break: keep-all; }
.au-hero__lede { margin: var(--gap) 0 0; font-size: var(--fs-lg); color: rgb(255 255 255 / 0.78); word-break: keep-all; }

.au-list { box-sizing: border-box; max-width: var(--max); margin: 0 auto; padding: calc(var(--gap) * 4) var(--margin); color: #fff; }
.au-list__title { margin: 0 0 var(--gap); font-size: var(--fs-sm); font-weight: 500; color: rgb(255 255 255 / 0.7); }
.au-list ol { margin: 0; padding: 0; list-style: none; }
.au-list li { display: grid; grid-template-columns: 4ch 1fr auto; align-items: baseline; gap: var(--gap); padding: 22px 0; border-top: var(--line); font-size: var(--fs-lg); }
.au-list span, .au-list time { font-size: var(--fs-sm); font-family: var(--font-num); font-variant-numeric: tabular-nums; color: rgb(255 255 255 / 0.7); }
.au-list b { font-weight: var(--fw-head); }

@media (prefers-reduced-motion: reduce) {
  .au-sky i { animation: none; }
}
```

빛 층의 흐림은 GPU가 그린다. 큰 화면에서 무거우면 `--glow-blur`를 80px로 낮추거나 `.au-sky`의 `inset`을 줄인다.
