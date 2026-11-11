# y2k-chrome 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 가운데 크롬 제목과 반짝이는 별(히어로), 살짝 겹친 오래된 OS 창 두 개.

배울 점:
- 크롬은 제목 한 줄에만. 빛 줄기가 6초마다 한 번 지나간다
- 별은 SVG 하나를 세 크기로 쓰고, 지연을 달리해 따로 반짝인다
- OS 창은 2px 테두리 + 제목 막대 + 단단한 그림자. 둘이 겹치고 각도가 다르다
- 형광색은 버튼과 별에만

```html
<header class="yk-hero">
  <svg class="yk-star yk-star--1" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 0 C22 16 24 18 40 20 C24 22 22 24 20 40 C18 24 16 22 0 20 C16 18 18 16 20 0Z"/></svg>
  <svg class="yk-star yk-star--2" viewBox="0 0 40 40" aria-hidden="true"><path d="M20 0 C22 16 24 18 40 20 C24 22 22 24 20 40 C18 24 16 22 0 20 C16 18 18 16 20 0Z"/></svg>
  <h1 class="yk-hero__title">밀레니엄<br>버그</h1>
  <a class="yk-btn" href="#join">지금 접속</a>
</header>

<section class="yk-wins" aria-label="공연 정보">
  <article class="yk-win yk-win--a">
    <header class="yk-win__bar"><span>공연.txt</span><i aria-hidden="true">×</i></header>
    <p>2000년 1월 1일 0시<br>지하 2층 무대</p>
  </article>
  <article class="yk-win yk-win--b">
    <header class="yk-win__bar"><span>출연.exe</span><i aria-hidden="true">×</i></header>
    <ul><li>밴드 하나</li><li>밴드 둘</li><li>밴드 셋</li></ul>
  </article>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.yk-hero { box-sizing: border-box; position: relative; min-height: 100svh; display: grid; place-content: center; justify-items: center; gap: var(--gap); padding: var(--margin); background: radial-gradient(120% 80% at 50% 0%, #ffffff, #c9d6e6 60%, #9fb0c6); overflow: hidden; text-align: center; }
.yk-hero__title {
  position: relative; margin: 0; font-family: var(--font-display); font-size: var(--fs-hero); font-weight: var(--fw-head); line-height: var(--lh-head); letter-spacing: var(--ls-head);
  background: linear-gradient(105deg, transparent 40%, rgb(255 255 255 / 0.9) 50%, transparent 60%) no-repeat -150% 0 / 60% 100%, var(--chrome);
  -webkit-background-clip: text; background-clip: text; color: transparent; -webkit-text-stroke: 1px rgb(255 255 255 / 0.6);
  filter: drop-shadow(0 2px 0 #3a3f48) drop-shadow(0 10px 20px rgb(0 0 0 / 0.3));
  animation: yk-shine 6s ease-in-out infinite;
}
@keyframes yk-shine { 0%, 70% { background-position: -150% 0, 0 0; } 100% { background-position: 250% 0, 0 0; } }
.yk-star { position: absolute; fill: var(--neon); animation: yk-twinkle var(--twinkle) ease-in-out infinite; }
.yk-star--1 { width: 56px; top: 18%; left: 16%; }
.yk-star--2 { width: 28px; top: 26%; right: 20%; fill: var(--neon-2); animation-delay: -1.1s; }
@keyframes yk-twinkle { 50% { scale: 0.55; opacity: 0.5; rotate: 45deg; } }
.yk-btn {
  padding: 14px 32px; border-radius: var(--r-pill); border: var(--border); background: linear-gradient(180deg, #e9ff8a, var(--neon) 60%, #8fbf00);
  color: #14102a; font-weight: 700; text-decoration: none; box-shadow: var(--bubble); transition: translate var(--dur-1) var(--ease-pop), box-shadow var(--dur-1);
}
.yk-btn:active { translate: 0 3px; box-shadow: inset 0 2px 0 rgb(255 255 255 / 0.8), inset 0 -4px 8px rgb(0 0 0 / 0.25), 0 1px 0 #14102a; }
.yk-btn:focus-visible { outline: 3px solid var(--neon-2); outline-offset: 4px; }

.yk-wins { position: relative; min-height: 70svh; padding: calc(var(--gap) * 3) var(--margin); background: #14102a; }
.yk-win { position: absolute; width: min(360px, 80vw); border: var(--border); border-color: #fff; border-radius: var(--r-win); background: #e8ecf2; color: #14102a; box-shadow: 8px 8px 0 var(--neon-2); font-size: var(--fs-base); line-height: var(--lh-body); }
.yk-win--a { top: 12%; left: 10%; rotate: -3deg; }
.yk-win--b { top: 34%; left: 38%; rotate: 2deg; box-shadow: 8px 8px 0 var(--neon); }
.yk-win__bar { display: flex; justify-content: space-between; padding: 6px 10px; background: linear-gradient(90deg, #3a2bd6, #ff3ecf); color: #fff; font-size: var(--fs-xs); font-family: var(--font-num); border-radius: calc(var(--r-win) - 2px) calc(var(--r-win) - 2px) 0 0; }
.yk-win p, .yk-win ul { margin: 0; padding: 16px; }

@media (max-width: 760px) {
  .yk-wins { display: grid; gap: var(--gap); }
  .yk-win { position: static; width: auto; }
}
@media (prefers-reduced-motion: reduce) {
  .yk-hero__title, .yk-star { animation: none; }
}
```

크롬 제목의 가운데 어두운 줄이 글자 높이의 절반에 오도록 `--chrome`의 50% 위치를 조정한다. 두 줄 제목이면 줄마다 따로 감싸 각각 그라데이션을 준다.
