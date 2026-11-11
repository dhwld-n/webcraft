# retro-pixel 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 상태 막대와 대화 상자가 있는 게임 화면(히어로), ▶ 커서가 붙는 선택지 메뉴.

배울 점:
- 모든 크기가 4px의 배수다. 테두리는 `box-shadow` 계단
- 픽셀 글꼴은 16px, 32px, 48px만 쓴다. 대화 상자 본문은 읽기 쉬운 고딕
- 대화는 `steps()`로 한 글자씩 찍히고, ▶ 커서는 1초에 한 번 깜빡인다
- 선택지는 진짜 링크 목록이라 키보드로 고를 수 있다

```html
<header class="rp-hero">
  <div class="rp-bar"><span>점수 004200</span><span>목숨 ♥♥♥</span></div>
  <h1 class="rp-hero__title">별 줍는 밤</h1>
  <div class="rp-dialog"><p class="rp-type">오늘 밤 별이 서른 개 떨어진대. 같이 주우러 갈래?</p><span class="rp-next" aria-hidden="true">▼</span></div>
</header>

<nav class="rp-menu" aria-label="메뉴">
  <a href="#start">새로 시작</a>
  <a href="#continue">이어 하기</a>
  <a href="#credits">만든 사람</a>
</nav>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.rp-hero, .rp-menu { box-sizing: border-box; max-width: var(--max); margin: 0 auto; padding: var(--margin); }
.rp-hero { min-height: 100svh; display: grid; grid-template-rows: auto 1fr auto; gap: var(--gap); background: var(--px-0); color: var(--px-2); max-width: none; }
.rp-bar { display: flex; justify-content: space-between; font-family: var(--font-pixel); font-size: var(--fs-pixel-sm); }
.rp-hero__title { align-self: center; justify-self: center; margin: 0; font-family: var(--font-pixel); font-size: var(--fs-hero); line-height: var(--lh-head); color: var(--px-3); text-shadow: var(--px) var(--px) 0 var(--px-hi); }
.rp-dialog {
  position: relative; max-width: calc(var(--px) * 160); width: 100%; justify-self: center; box-sizing: border-box; padding: calc(var(--px) * 5);
  background: var(--px-2); color: var(--px-4);
  box-shadow: 0 calc(var(--px) * -1) 0 var(--px-1), 0 var(--px) 0 var(--px-1), calc(var(--px) * -1) 0 0 var(--px-1), var(--px) 0 0 var(--px-1), inset 0 calc(var(--px) * -1) 0 #c2c3c7;
}
.rp-type { margin: 0; font-size: var(--fs-base); line-height: var(--lh-body); width: 30ch; overflow: hidden; white-space: nowrap; animation: rp-type 2.4s steps(30, end) both; }
@keyframes rp-type { from { width: 0; } }
.rp-next { position: absolute; right: calc(var(--px) * 4); bottom: calc(var(--px) * 2); font-size: var(--fs-pixel-sm); animation: rp-blink var(--blink) steps(1) infinite; }
@keyframes rp-blink { 50% { opacity: 0; } }

.rp-menu { display: grid; gap: calc(var(--px) * 4); justify-items: start; padding-block: calc(var(--px) * 24); }
.rp-menu a { position: relative; padding-left: calc(var(--px) * 8); font-family: var(--font-pixel); font-size: var(--fs-pixel); color: var(--px-4); text-decoration: none; }
.rp-menu a:hover::before, .rp-menu a:focus-visible::before { content: "▶"; position: absolute; left: 0; animation: rp-blink var(--blink) steps(1) infinite; }
.rp-menu a:focus-visible { outline: var(--px) solid var(--px-hi); outline-offset: var(--px); }

@media (max-width: 640px) {
  .rp-type { width: auto; white-space: normal; animation: none; }
}
@media (prefers-reduced-motion: reduce) {
  .rp-type, .rp-next, .rp-menu a::before { animation: none; }
}
```

긴 대화는 한 줄 타이핑 대신 JS로 글자를 하나씩 붙인다. 모바일과 모션 줄이기에서는 한 번에 보인다.
