# immersive-3d 모범 섹션

3D 장면 위에 얹는 HTML의 한 예다. 장면은 `three-stage`, `object-shelf`, `point-morph` 레시피로 만든다. **배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

배울 점:
- 화면 대부분을 장면에 양보한다. 글자를 어디에 둘지는 콘셉트가 정한다. 이 예의 "네 모서리 + 왼쪽 아래 제목 + 아래 진행 막대"는 한 가지일 뿐이다 (위쪽 띠 하나, 한쪽 세로 단, 장면 속 물체 곁에 붙는 글자 등)
- 크기가 극단적이다: 11~15px 작은 글자와 120px 제목. 중간 크기가 없다
- 라벨은 한글 소문장. 영문 대문자 모노 HUD가 아니다
- 목록은 진짜 링크 (`object-shelf`의 `.shelf-list`와 같은 역할). 현재 항목만 밝다
- 장면 위 글자 층은 `pointer-events: none`, 누를 수 있는 것만 `auto`라서 빈 곳의 클릭은 3D로 간다

```html
<div class="im-ui">
  <a class="im-ui__name" href="/">한서진 작업실</a>
  <nav class="im-ui__index" aria-label="작업 목록">
    <ol>
      <li><a href="#w1" aria-current="true">겨울 정원</a></li>
      <li><a href="#w2">물의 기록</a></li>
      <li><a href="#w3">밤 버스</a></li>
    </ol>
  </nav>
  <div class="im-ui__title">
    <p class="im-ui__count">01 / 03</p>
    <h1 class="im-ui__now">겨울 정원</h1>
  </div>
  <p class="im-ui__meta">사진 연작 · 2025 · 자리표시</p>
  <div class="im-ui__progress" aria-hidden="true"><span></span></div>
  <p class="im-ui__hint">스크롤해서 넘기기</p>
</div>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다. 장면 캔버스는 three-stage의 #stage */
.im-ui { position: fixed; inset: 0; z-index: var(--z-ui); pointer-events: none; font-size: var(--fs-sm); line-height: var(--lh-body); }
.im-ui a { pointer-events: auto; color: inherit; text-decoration: none; }
.im-ui a:focus-visible { outline: 1px solid currentColor; outline-offset: 4px; }

.im-ui__name { position: absolute; top: var(--edge); left: var(--edge); font-weight: 600; }
.im-ui__index { position: absolute; top: var(--edge); right: var(--edge); text-align: right; }
.im-ui__index ol { margin: 0; padding: 0; list-style: none; display: grid; gap: var(--edge-gap); }
.im-ui__index a { color: var(--muted); transition: color var(--dur-ui) var(--ease); }
.im-ui__index a[aria-current='true'], .im-ui__index a:hover { color: var(--text); }

/* 번호는 제목 밖에 따로 둔다. 제목 안의 일부만 흐리게 하면 흔한 AI 틀이 된다 */
.im-ui__title { position: absolute; left: var(--edge); bottom: calc(var(--edge) + 28px); display: grid; gap: 10px; }
.im-ui__count { margin: 0; font-family: var(--font-num); font-size: var(--fs-sm); font-variant-numeric: tabular-nums; color: var(--muted); }
.im-ui__now { margin: 0; font-family: var(--font-display); font-size: var(--fs-title); line-height: var(--lh-title); letter-spacing: var(--track-title); font-weight: 500; word-break: keep-all; }
.im-ui__meta { position: absolute; left: var(--edge); bottom: var(--edge); margin: 0; color: var(--muted); }
.im-ui__hint { position: absolute; right: var(--edge); bottom: var(--edge); margin: 0; color: var(--muted); }

/* 진행 막대: 화면 아래 끝 1줄 */
.im-ui__progress { position: absolute; left: 0; right: 0; bottom: 0; height: var(--progress-h); background: color-mix(in srgb, var(--text) 14%, transparent); }
.im-ui__progress span { display: block; height: 100%; width: 100%; background: var(--text); transform-origin: left; transform: scaleX(var(--p, 0)); }

/* 제목이 바뀔 때: 아래에서 올라온다 */
.im-ui__now.is-swapping { animation: im-swap var(--dur-title) var(--ease); }
@keyframes im-swap { from { opacity: 0; transform: translateY(0.3em); } }

@media (max-width: 700px) {
  .im-ui__index { display: none; } /* 휴대폰은 목록 대신 제목과 진행 막대만 */
  .im-ui__hint { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .im-ui__now.is-swapping { animation: none; }
}
```

```js
// im-ui.js: 스크롤 진행률과 현재 항목을 장면 위 글자에 반영한다. object-shelf와 함께 쓰면 그 진행률을 넘겨도 된다
export function bindUI(root, count) {
  const bar = root.querySelector('.im-ui__progress');
  const now = root.querySelector('.im-ui__now');
  const counter = root.querySelector('.im-ui__count');
  const links = [...root.querySelectorAll('.im-ui__index a')];
  let current = -1;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const p = max > 0 ? scrollY / max : 0;
    bar.style.setProperty('--p', p);
    const i = Math.min(count - 1, Math.round(p * (count - 1)));
    if (i === current) return;
    current = i;
    links.forEach((a, j) => a.setAttribute('aria-current', j === i));
    now.textContent = links[i]?.textContent ?? '';
    counter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`;
    now.classList.remove('is-swapping'); void now.offsetWidth; now.classList.add('is-swapping');
  };
  addEventListener('scroll', update, { passive: true });
  update();
}
```
