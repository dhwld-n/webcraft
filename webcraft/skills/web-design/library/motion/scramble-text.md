# scramble-text

- 종류: 타이포 / 등장
- 강도: 낮음
- 어울리는 스타일: immersive-3d, dark-tech, retro-pixel
- 의존성: 없음
- 참고: bricelab 로딩 문구가 무작위 글자에서 제자리로 맞춰지는 효과 (원리만)

문구가 무작위 기호로 깜빡이다가 왼쪽부터 한 글자씩 제자리로 맞춰진다. 화면에 들어올 때나 입장할 때 한 번. 짧은 라벨, 메뉴, 좌표 같은 계기판 글자에 어울린다.

## 코드

```html
<p data-scramble>지금 보고 있는 작업</p>
```

```js
// scramble.js
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scramble(el, { duration = 900, chars = '▪▫░▒/\\<>_=+01' } = {}) {
  const text = el.textContent;
  if (reduce) return Promise.resolve();
  // Screen readers get the real text once; the flicker is hidden from them.
  const sr = Object.assign(document.createElement('span'), { className: 'sr-only', textContent: text });
  const out = document.createElement('span');
  out.setAttribute('aria-hidden', 'true');
  el.replaceChildren(sr, out);
  const glyphs = [...text];
  return new Promise((done) => {
    const t0 = performance.now();
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / duration);
      const fixed = Math.floor(k * glyphs.length);
      out.textContent = glyphs.map((c, i) => (i < fixed || c === ' ' ? c : chars[(Math.random() * chars.length) | 0])).join('');
      if (k < 1) requestAnimationFrame(tick);
      else { el.textContent = text; done(); }
    };
    requestAnimationFrame(tick);
  });
}

// Scramble each [data-scramble] the first time it scrolls into view.
export function scrambleOnView(root = document) {
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    scramble(e.target);
  }), { threshold: 0.6 });
  root.querySelectorAll('[data-scramble]').forEach((el) => io.observe(el));
}
```

`.sr-only` 스타일은 word-highlight 레시피의 것을 쓴다.

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `duration` | 900 | 400~1600 ms | 다 맞춰지는 시간. 글자 수가 많으면 길게 |
| `chars` | 기호와 0, 1 | | 섞일 때 보이는 글자. 사이트 분위기에 맞게 (한글 자모, 점자, 숫자만) |

## 성능
글자 수만큼 문자열을 다시 만든다. 짧은 문구(30자 이하)에만 쓰면 가볍다.

## 하지 말 것
- 본문 문단이나 긴 제목에 (읽기 전에 지친다)
- 폭이 다른 글꼴에서 쓰기. 글자 폭이 바뀌어 줄이 흔들린다 (고정폭 글꼴이나 `font-variant-numeric: tabular-nums`)
- 같은 문구를 스크롤할 때마다 반복
