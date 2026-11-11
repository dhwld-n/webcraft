# cyberpunk 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 칸으로 나뉜 계기판 위의 네온 제목(히어로), 형광 노랑 바탕에 잘린 모서리 판 셋.

배울 점:
- 화면을 선으로 4칸 나누고, 칸 모서리마다 좌표·상태 라벨을 붙였다
- 네온 글로우는 제목에만. 글리치는 7초에 한 번, 0.3초
- 두 번째 섹션은 바탕을 형광 노랑으로 뒤집었다. 판은 검정, 모서리를 45°로 자른다
- 영문 라벨만 대문자 + 자간. 한글은 자간 없이

```html
<header class="cp-hero">
  <span class="cp-tag cp-tag--tl">SEC 07 / 37.56N 126.97E</span>
  <span class="cp-tag cp-tag--br">상태: 접속 대기</span>
  <h1 class="cp-hero__title" data-text="밤의 시장">밤의 시장</h1>
  <p class="cp-hero__lede">자정부터 새벽 네 시까지, 지하 3층.</p>
</header>

<section class="cp-cards" aria-labelledby="cp-c">
  <h2 id="cp-c" class="cp-cards__title">입장권</h2>
  <ul>
    <li class="cp-card"><span class="cp-card__no">01</span><b>하룻밤</b><em>₩25,000</em></li>
    <li class="cp-card"><span class="cp-card__no">02</span><b>사흘</b><em>₩60,000</em></li>
    <li class="cp-card"><span class="cp-card__no">03</span><b>운영자</b><em>초대 전용</em></li>
  </ul>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.cp-hero {
  box-sizing: border-box; position: relative; min-height: 100svh; display: grid; align-content: center; padding: var(--margin);
  background: var(--night); color: #fff;
  background-image:
    repeating-linear-gradient(0deg, rgb(255 255 255 / 0.035) 0 1px, transparent 1px 3px),
    linear-gradient(var(--neon-3) 0 0) 50% 0 / 1px 100% no-repeat,
    linear-gradient(var(--neon-3) 0 0) 0 50% / 100% 1px no-repeat;
  background-blend-mode: normal;
}
.cp-tag { position: absolute; font-family: var(--font-num); font-size: var(--fs-xs); letter-spacing: var(--ls-label); color: var(--neon-3); }
.cp-tag--tl { top: var(--margin); left: var(--margin); }
.cp-tag--br { right: var(--margin); bottom: var(--margin); letter-spacing: 0; }
.cp-hero__title {
  position: relative; margin: 0; font-family: var(--font-display); font-size: var(--fs-hero); font-weight: var(--fw-head); line-height: var(--lh-head); letter-spacing: var(--ls-head);
  color: var(--neon-1); text-shadow: 0 0 4px currentColor, 0 0 28px color-mix(in srgb, currentColor 55%, transparent); word-break: keep-all;
}
.cp-hero__title::before, .cp-hero__title::after { content: attr(data-text); position: absolute; inset: 0; opacity: 0; pointer-events: none; }
.cp-hero__title::before { color: var(--neon-2); animation: cp-glitch 7s var(--ease) infinite; }
.cp-hero__title::after { color: var(--neon-3); animation: cp-glitch 7s var(--ease) infinite reverse; }
@keyframes cp-glitch {
  0%, 95%, 100% { opacity: 0; translate: 0; clip-path: inset(0); }
  96% { opacity: 0.9; translate: -3px 1px; clip-path: inset(20% 0 55% 0); }
  98% { opacity: 0.9; translate: 3px -1px; clip-path: inset(60% 0 10% 0); }
}
.cp-hero__lede { margin: var(--gap) 0 0; font-size: var(--fs-lg); color: rgb(255 255 255 / 0.82); word-break: keep-all; }

.cp-cards { padding: calc(var(--gap) * 6) var(--margin); background: var(--neon-1); color: var(--night); }
.cp-cards__title { margin: 0 0 calc(var(--gap) * 2); font-family: var(--font-display); font-size: var(--fs-lg); }
.cp-cards ul { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--gap); margin: 0; padding: 0; list-style: none; }
.cp-card {
  display: grid; gap: 8px; padding: 20px; min-height: 200px; align-content: space-between; background: var(--night); color: #fff;
  clip-path: polygon(0 0, calc(100% - var(--cut)) 0, 100% var(--cut), 100% 100%, var(--cut) 100%, 0 calc(100% - var(--cut)));
  transition: translate var(--dur-2) var(--ease-snap);
}
.cp-card:hover { translate: 0 -6px; }
.cp-card__no { font-family: var(--font-num); font-size: var(--fs-xs); color: var(--neon-2); }
.cp-card b { font-size: var(--fs-lg); }
.cp-card em { font-style: normal; font-family: var(--font-num); font-variant-numeric: tabular-nums; color: var(--neon-1); }

@media (max-width: 760px) { .cp-cards ul { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) {
  .cp-hero__title::before, .cp-hero__title::after { animation: none; }
  .cp-card { transition: none; }
}
```

글리치는 7초 중 0.3초만 보인다. 이보다 자주 깜빡이게 하지 않는다 (초당 3번 넘는 번쩍임은 광과민성 위험).
