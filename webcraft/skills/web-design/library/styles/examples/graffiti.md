# graffiti 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 벽 한 면의 큰 작품과 흘러내림, 스티커 셋(히어로), 찢긴 포스터가 겹친 일정 벽.

배울 점:
- 큰 글자 하나가 벽의 주인공. 두꺼운 윤곽 + 스프레이 번짐 + 흘러내림 두 줄
- 스티커 셋은 각도가 다르고 흰 테두리
- 작품은 왼쪽에서 스프레이로 칠해지듯 드러난다 (`clip-path`)
- 일정은 포스터 종이 위의 굵은 고딕. 스프레이 글꼴은 큰 작품에만

```html
<header class="gf-wall">
  <h1 class="gf-piece" data-drip>골목<br>대회</h1>
  <p class="gf-sticker gf-sticker--a">10.21 토</p>
  <p class="gf-sticker gf-sticker--b">참가비 무료</p>
  <p class="gf-sticker gf-sticker--c">BMX · 스케이트</p>
</header>

<section class="gf-posters" aria-labelledby="gf-p">
  <h2 id="gf-p" class="gf-posters__title">순서</h2>
  <ol>
    <li class="gf-poster"><b>13:00</b> 연습 주행</li>
    <li class="gf-poster"><b>15:00</b> 예선</li>
    <li class="gf-poster"><b>18:00</b> 결승과 공연</li>
  </ol>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.gf-wall { box-sizing: border-box; position: relative; min-height: 100svh; display: grid; place-items: center; padding: var(--margin); overflow: hidden; background: var(--wall); }
.gf-wall::before { /* 콘크리트 그레인 */
  content: ""; position: absolute; inset: 0; opacity: 0.22; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='.7' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.gf-piece {
  position: relative; margin: 0; rotate: var(--tilt); font-family: var(--font-display); font-size: var(--fs-hero); font-weight: var(--fw-head); font-synthesis: none; line-height: var(--lh-head); text-align: center;
  color: var(--spray-1); -webkit-text-stroke: var(--outline-thick) var(--outline); paint-order: stroke fill; text-shadow: 0.04em 0.04em 0 var(--outline), var(--spray-blur);
  animation: gf-spray 1.1s steps(12, end) both; word-break: keep-all;
}
@keyframes gf-spray { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0 0 0 0); } }
.gf-piece::before, .gf-piece::after { /* 흘러내림 */
  content: ""; position: absolute; top: 88%; width: 0.07em; border-radius: 0 0 999px 999px; transform-origin: top;
  background: linear-gradient(var(--spray-1), var(--spray-1) 80%, transparent); animation: gf-drip 2.4s ease-in 1.1s both;
}
.gf-piece::before { left: 30%; height: 0.5em; } .gf-piece::after { left: 66%; height: 0.32em; animation-delay: 1.5s; }
@keyframes gf-drip { from { scale: 1 0; } }
.gf-sticker { position: absolute; margin: 0; padding: 10px 16px; border: var(--sticker-edge); border-radius: var(--r-sticker); background: var(--spray-2); color: var(--outline); font-size: var(--fs-lg); font-weight: var(--fw-head); box-shadow: 0 6px 12px rgb(0 0 0 / 0.4); animation: gf-slap var(--dur-2) var(--ease-pop) both; }
.gf-sticker--a { top: 12%; left: 8%; rotate: -8deg; animation-delay: 1.4s; }
.gf-sticker--b { bottom: 14%; right: 10%; rotate: 5deg; background: var(--spray-3); animation-delay: 1.6s; }
.gf-sticker--c { bottom: 22%; left: 14%; rotate: 3deg; background: #fff; animation-delay: 1.8s; }
@keyframes gf-slap { from { scale: 1.6; opacity: 0; } }

.gf-posters { box-sizing: border-box; padding: calc(var(--gap) * 5) var(--margin); background: #8d8d88; }
.gf-posters__title { margin: 0 0 var(--gap); font-size: var(--fs-lg); font-weight: var(--fw-head); color: #fff; }
.gf-posters ol { display: flex; flex-wrap: wrap; gap: var(--gap); margin: 0; padding: 0; list-style: none; }
.gf-poster { padding: 28px 24px; min-width: 220px; background: #f4f1e8; color: var(--outline); font-size: var(--fs-lg); font-weight: var(--fw-body);
  clip-path: polygon(0 0, 100% 2%, 98% 100%, 60% 97%, 30% 100%, 2% 96%); }
.gf-poster:nth-child(2) { rotate: 2deg; background: var(--spray-2); } .gf-poster:nth-child(3) { rotate: -2deg; }
.gf-poster b { display: block; font-family: var(--font-num); font-size: var(--fs-base); }

@media (prefers-reduced-motion: reduce) {
  .gf-piece, .gf-piece::before, .gf-piece::after, .gf-sticker { animation: none; }
}
```

`steps(12)`로 칠하면 스프레이를 여러 번 뿌린 것처럼 끊긴다. 매끈하게 하려면 `ease-out`.
