# collage 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 오린 글자 제목과 겹친 종이 조각(히어로), 문장 안에 사진과 다른 서체를 끼운 한 줄 콜라주.

배울 점:
- 제목 단어마다 다른 종이와 서체 (오린 글자). 제목 한 줄에만
- 조각 넷의 각도가 모두 다르다 (-4°, 3°, -2°, 5°). 테이프는 반투명 노랑
- 찢긴 가장자리는 `clip-path` 점 18개
- 두 번째 섹션은 문장이 주인공. 그 안에 작은 사진, 세리프 이탤릭 단어, 알약 단어가 끼어 있다

```html
<header class="cl2-hero">
  <h1 class="cl2-title" aria-label="우리 동네 잡지">
    <span class="cl2-cut cl2-cut--a">우리</span><span class="cl2-cut cl2-cut--b">동네</span><span class="cl2-cut cl2-cut--c">잡지</span>
  </h1>
  <figure class="cl2-piece cl2-piece--photo"><span class="cl2-tape"></span><div class="cl2-img" role="img" aria-label="사진 자리표시: 골목 시장"></div></figure>
  <p class="cl2-piece cl2-piece--memo">7호 나왔어요!<br>시장 골목 특집</p>
  <figure class="cl2-piece cl2-piece--news"><div class="cl2-img cl2-img--bw" role="img" aria-label="사진 자리표시: 오래된 간판"></div></figure>
</header>

<section class="cl2-line">
  <p>이번 호에는 <span class="cl2-pic" role="img" aria-label="작은 사진: 떡집"></span> 떡집 할머니와 <em>마흔 해</em> 된 철물점, 그리고 <a class="cl2-pill" href="#join">새 동네 기자</a> 여섯 명이 함께했습니다.</p>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.cl2-hero { box-sizing: border-box; position: relative; min-height: 100svh; padding: var(--margin); background: var(--paper); overflow: hidden; }
.cl2-title { position: relative; z-index: 2; display: flex; flex-wrap: wrap; gap: 10px; margin: 8vh 0 0; font-size: var(--fs-hero); line-height: 1; }
.cl2-cut { display: inline-block; padding: 0.04em 0.14em; box-shadow: var(--paper-shadow); }
.cl2-cut--a { background: #111; color: var(--paper); font-family: var(--font-display); rotate: var(--t1); }
.cl2-cut--b { background: var(--news); color: #111; font-family: var(--font-serif); font-style: italic; font-weight: 400; rotate: var(--t2); }
.cl2-cut--c { background: var(--memo); color: #111; font-family: var(--font-num); font-weight: 700; rotate: var(--t3); }
.cl2-piece { position: absolute; margin: 0; box-shadow: var(--paper-shadow); }
.cl2-piece--photo { right: 8%; top: 12%; width: clamp(180px, 26vw, 380px); padding: 10px 10px 36px; background: #fff; rotate: var(--t4); }
.cl2-piece--news { right: 30%; bottom: 8%; width: clamp(140px, 18vw, 260px); background: var(--news); padding: 8px; rotate: var(--t5); clip-path: var(--torn); }
.cl2-piece--memo { left: 12%; bottom: 14%; width: 14em; padding: 18px; background: var(--memo); font-family: var(--font-hand); font-size: var(--fs-lg); line-height: 1.2; rotate: var(--t2); }
.cl2-img { aspect-ratio: 4 / 5; background: linear-gradient(140deg, #c7a27a, #5b6e5a); }
.cl2-img--bw { aspect-ratio: 1; background: linear-gradient(140deg, #ccc, #444); filter: grayscale(1); }
.cl2-tape { position: absolute; left: 50%; top: -14px; width: 110px; height: 28px; translate: -50% 0; rotate: -3deg; background: var(--tape); clip-path: polygon(0 10%, 4% 0, 8% 12%, 12% 0, 100% 0, 96% 90%, 92% 100%, 88% 88%, 84% 100%, 0 100%); }
.cl2-piece { animation: cl2-drop var(--dur-2) var(--ease-drop) both; }
.cl2-piece--memo { animation-delay: 120ms; } .cl2-piece--news { animation-delay: 240ms; }
@keyframes cl2-drop { from { opacity: 0; translate: 0 -24px; rotate: 0deg; } }

.cl2-line { box-sizing: border-box; max-width: var(--max); margin: 0 auto; padding: calc(var(--gap) * 4) var(--margin); }
.cl2-line p { margin: 0; font-size: clamp(30px, 4.4vw, 64px); line-height: 1.15; letter-spacing: -0.02em; word-break: keep-all; }
.cl2-line em { font-family: var(--font-serif); font-style: italic; }
.cl2-pic { display: inline-block; width: 1.6em; height: 0.9em; vertical-align: -0.08em; border-radius: 6px; background: linear-gradient(140deg, #e7b98d, #a24f3a); }
.cl2-pill { padding: 0 0.3em; border: 2px solid currentColor; border-radius: 999px; color: inherit; text-decoration: none; }
.cl2-pill:hover, .cl2-pill:focus-visible { background: var(--pen); color: #fff; border-color: var(--pen); }

@media (max-width: 760px) {
  .cl2-hero { display: grid; gap: var(--gap); }
  .cl2-piece { position: relative; inset: auto; width: auto; justify-self: start; }
  .cl2-piece--photo { width: 70%; justify-self: end; }
}
@media (prefers-reduced-motion: reduce) { .cl2-piece { animation: none; } }
```

조각의 순서(겹침)는 `z-index`보다 HTML 순서로 정하는 게 관리하기 쉽다. 각도 변수 `--t1`~`--t5`를 돌려 쓰되 이웃한 두 조각이 같은 값을 쓰지 않게 한다.
