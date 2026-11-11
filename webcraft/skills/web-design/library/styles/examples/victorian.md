# victorian 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 이중 괘선 안에 대칭으로 쌓인 상표 같은 표지(히어로), 첫 글자 장식이 있는 두 단 본문.

배울 점:
- 표지는 가운데 축 대칭: 작은 대문자 → 큰 제목 → 장식 괘선 → 이탤릭 부제 → 작은 정보
- 테두리는 이중 괘선 + 안쪽 가는 선 한 겹
- 장식 괘선은 가운데 마름모 하나와 양쪽 선. 가운데서 양쪽으로 그려진다
- 본문은 두 단, 첫 글자를 세 줄 높이로 키운다. 금색은 단색

```html
<header class="vc-cover">
  <div class="vc-frame">
    <p class="vc-caps">Est. 1898 · Seoul</p>
    <h1 class="vc-title">한성<br>홍차 상회</h1>
    <div class="vc-ornament" aria-hidden="true"><span></span><i></i><span></span></div>
    <p class="vc-sub">손으로 덖은 찻잎과 오래된 블렌딩</p>
    <p class="vc-info">종로 2가 · 매일 열 시부터</p>
  </div>
</header>

<section class="vc-text" aria-labelledby="vc-h">
  <h2 id="vc-h" class="vc-text__title">상회의 내력</h2>
  <div class="vc-text__cols">
    <p class="vc-dropcap">처음 가게는 우물가 옆 작은 한옥이었다. 배에 실려 온 찻잎을 나무 상자째 들여와 저울에 달아 팔았고, 손님은 대부분 이웃이었다.</p>
    <p>세 번 이사하는 동안 저울과 상자는 그대로 남았다. 지금도 첫 블렌딩은 그 저울로 단다.</p>
  </div>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.vc-cover { box-sizing: border-box; min-height: 100svh; display: grid; place-items: center; padding: var(--margin); background: var(--forest); color: var(--cream); }
.vc-frame { position: relative; box-sizing: border-box; width: min(100%, 720px); padding: clamp(36px, 7vw, 88px) clamp(20px, 5vw, 64px); border: var(--rule-double); text-align: center; }
.vc-frame::before { content: ""; position: absolute; inset: var(--frame-inset); border: var(--rule-thin); pointer-events: none; }
.vc-caps { margin: 0; font-size: var(--fs-xs); letter-spacing: var(--ls-caps); text-transform: uppercase; color: var(--gold); }
.vc-title { margin: 18px 0; font-family: var(--font-serif); font-size: var(--fs-hero); font-weight: var(--fw-head); line-height: var(--lh-head); word-break: keep-all; }
.vc-ornament { display: flex; align-items: center; justify-content: center; gap: 12px; margin: 0 auto 18px; width: 70%; }
.vc-ornament span { flex: 1; height: 1px; background: var(--gold); transform-origin: var(--o, right); animation: vc-rule var(--dur-2) var(--ease) 300ms both; }
.vc-ornament span:last-child { --o: left; }
.vc-ornament i { width: 9px; height: 9px; rotate: 45deg; background: var(--gold); }
@keyframes vc-rule { from { scale: 0 1; } }
.vc-sub { margin: 0; font-family: var(--font-serif); font-style: italic; font-size: var(--fs-lg); }
.vc-info { margin: 22px 0 0; font-size: var(--fs-sm); letter-spacing: 0; color: color-mix(in srgb, var(--cream) 80%, transparent); }

.vc-text { box-sizing: border-box; max-width: var(--max); margin: 0 auto; padding: calc(var(--gap) * 4) var(--margin); background: var(--cream); color: #2a2218; }
.vc-text__title { margin: 0 0 var(--gap); padding-bottom: 12px; border-bottom: var(--rule-double); border-color: #8a6d36; font-family: var(--font-serif); font-size: var(--fs-lg); text-align: center; }
.vc-text__cols { columns: 2; column-gap: calc(var(--gap) * 2); column-rule: 1px solid rgb(138 109 54 / 0.4); }
.vc-text__cols p { margin: 0 0 1em; font-family: var(--font-serif); font-size: var(--fs-base); line-height: var(--lh-body); word-break: keep-all; }
.vc-dropcap::first-letter { float: left; margin: 0.06em 0.1em 0 0; font-size: calc(var(--fs-base) * var(--lh-body) * 3 * 0.85); line-height: 0.85; font-weight: var(--fw-head); color: var(--wine); }

@media (max-width: 760px) { .vc-text__cols { columns: 1; } }
@media (prefers-reduced-motion: reduce) { .vc-ornament span { animation: none; } }
```

영문 라벨(`.vc-caps`)만 대문자 + 넓은 자간. 한글 정보 줄은 자간 0이다.
