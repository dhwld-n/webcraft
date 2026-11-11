# bohemian 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 높이가 다른 아치와 둥근 돌 사진 둘 옆의 세리프 제목(히어로), 짠 무늬 띠 아래의 느슨한 두 단 소개.

배울 점:
- 사진 틀이 아치와 둥근 돌 모양이고 높이가 다르다
- 제목 한 단어만 이탤릭, 필기체는 작은 한 줄 장식
- 짠 무늬 띠는 두 겹 `repeating-linear-gradient`
- 색은 흙과 햇빛 다섯 가지 + 청록 강조 하나

```html
<header class="bh-hero">
  <div class="bh-hero__text">
    <p class="bh-hero__script">slow mornings</p>
    <h1 class="bh-hero__title">흙으로 빚고<br><em>햇볕에</em> 말립니다</h1>
    <a class="bh-btn" href="#class">도자기 수업</a>
  </div>
  <div class="bh-photo bh-photo--arch" role="img" aria-label="사진 자리표시: 물레 앞 손"></div>
  <div class="bh-photo bh-photo--pebble" role="img" aria-label="사진 자리표시: 말린 꽃과 그릇"></div>
</header>
<div class="bh-weave" aria-hidden="true"></div>

<section class="bh-about">
  <h2>작업실 이야기</h2>
  <p>바닷가 마을 오래된 창고를 고쳐 작업실로 씁니다. 창이 서쪽으로 나 있어 오후 네 시부터 그릇이 금빛으로 물듭니다.</p>
  <p>수업은 한 번에 네 명까지. 흙을 만지는 두 시간 동안 휴대폰은 바구니에 둡니다.</p>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.bh-hero { box-sizing: border-box; position: relative; min-height: 100svh; display: grid; grid-template-columns: 1.1fr 0.7fr 0.5fr; align-items: end; gap: var(--gap); padding: var(--margin); background: var(--sand); color: var(--earth); }
.bh-hero__text { align-self: center; }
.bh-hero__script { margin: 0 0 8px; font-family: var(--font-script); font-size: var(--fs-lg); color: var(--terracotta); }
.bh-hero__title { margin: 0 0 var(--gap); font-family: var(--font-serif); font-size: var(--fs-hero); font-weight: var(--fw-head); line-height: var(--lh-head); letter-spacing: var(--ls-head); word-break: keep-all; }
.bh-hero__title em { color: var(--terracotta); }
.bh-btn { display: inline-block; padding: 14px 28px; border-radius: 999px; background: var(--teal); color: var(--sand); text-decoration: none; transition: background var(--dur-2) var(--ease); }
.bh-btn:hover { background: var(--earth); }
.bh-btn:focus-visible { outline: 2px solid var(--terracotta); outline-offset: 4px; }
.bh-photo { background: linear-gradient(160deg, var(--ochre), var(--terracotta)); }
.bh-photo--arch { aspect-ratio: 2 / 3.2; border-radius: var(--r-arch); }
.bh-photo--pebble { aspect-ratio: 1; border-radius: var(--r-pebble); align-self: center; background: linear-gradient(160deg, #c9c39a, var(--olive)); animation: bh-sway var(--sway) var(--ease) infinite alternate; }
@keyframes bh-sway { to { rotate: 3deg; translate: 0 -6px; } }
.bh-weave { height: 28px; background: var(--weave); opacity: 0.85; }

.bh-about { box-sizing: border-box; max-width: var(--max); margin: 0 auto; padding: calc(var(--gap) * 3) var(--margin); display: grid; grid-template-columns: 1fr 1.2fr 1.2fr; gap: var(--gap); color: var(--earth); }
.bh-about h2 { margin: 0; font-family: var(--font-serif); font-size: var(--fs-lg); font-weight: var(--fw-head); font-style: italic; }
.bh-about p { margin: 0; font-size: var(--fs-base); line-height: var(--lh-body); word-break: keep-all; }
.bh-about p:last-child { margin-top: 4em; } /* 두 단의 높이를 어긋나게 */

@media (max-width: 860px) {
  .bh-hero { grid-template-columns: 1fr 1fr; }
  .bh-hero__text { grid-column: 1 / -1; }
  .bh-about { grid-template-columns: 1fr; }
  .bh-about p:last-child { margin-top: 0; }
}
@media (prefers-reduced-motion: reduce) { .bh-photo--pebble { animation: none; } }
```

필기체 한 줄(`--font-script`)은 영문 장식으로만. 한글 문장을 필기체로 쓰지 않는다.
