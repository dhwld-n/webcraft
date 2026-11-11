# surreal 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 텅 빈 사막 위에 떠 있는 문 하나(히어로), 바닥에 누워 그림자를 드리운 제목.

배울 점:
- 평범한 지평선 구도에 이상한 것은 하나(떠 있는 빨간 문)뿐이다
- 문의 그림자는 바닥에 떨어져 있고 문과 떨어져 있다. 그 틈이 "떠 있음"을 말한다
- 두 번째 섹션의 제목은 원근을 따라 바닥에 눕는다 (`rotateX`)
- 글은 구석에 작게 한 줄

```html
<header class="sr-hero">
  <div class="sr-door" role="img" aria-label="모래 위에 떠 있는 빨간 문"><span class="sr-door__knob"></span></div>
  <div class="sr-shadow" aria-hidden="true"></div>
  <p class="sr-hero__note">세 번째 문은 열리지 않습니다.</p>
</header>

<section class="sr-floor" aria-labelledby="sr-t">
  <h2 id="sr-t" class="sr-floor__title">문 너머의 방</h2>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.sr-hero { position: relative; min-height: 100svh; overflow: hidden; background: linear-gradient(var(--sky-top), var(--sky-bottom) 62%, var(--ground) 62%); }
.sr-door {
  position: absolute; left: 58%; top: 22%; width: clamp(90px, 11vw, 160px); aspect-ratio: 1 / 2.1; background: var(--odd);
  border-radius: 3px; box-shadow: inset -10px 0 0 rgb(0 0 0 / 0.12); animation: sr-float var(--float) var(--ease) infinite;
}
.sr-door__knob { position: absolute; right: 14%; top: 52%; width: 9%; aspect-ratio: 1; border-radius: 50%; background: #f5d37a; }
.sr-shadow {
  position: absolute; left: 61%; top: 70%; width: clamp(110px, 14vw, 200px); height: 22px; border-radius: 50%;
  background: rgb(31 58 107 / 0.25); filter: blur(6px); animation: sr-shade var(--float) var(--ease) infinite;
}
@keyframes sr-float { 50% { translate: 0 -14px; } }
@keyframes sr-shade { 50% { scale: 0.85; opacity: 0.7; } }
.sr-hero__note { position: absolute; left: var(--margin); bottom: var(--margin); margin: 0; font-size: var(--fs-sm); color: #1f3a6b; }

.sr-floor { min-height: 80svh; display: grid; place-items: center; perspective: 700px; background: linear-gradient(#f8e7d8, var(--ground)); overflow: hidden; }
.sr-floor__title {
  margin: 0; font-family: var(--font-serif); font-size: var(--fs-hero); font-weight: var(--fw-head); line-height: var(--lh-head); color: #1f3a6b;
  transform: rotateX(58deg); transform-origin: 50% 100%; text-shadow: 0 -30px 24px rgb(31 58 107 / 0.18); word-break: keep-all;
}

@media (prefers-reduced-motion: reduce) {
  .sr-door, .sr-shadow { animation: none; }
}
```

장면을 사진으로 만들면 빛 방향과 그림자 방향을 같은 쪽으로 맞춘다. 이상한 물건이 하나 더 늘 때마다 마법이 줄어든다.
