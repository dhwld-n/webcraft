# kinetic-headline

- 종류: 타이포
- 강도: 중간
- 어울리는 스타일: kinetic-type, editorial, dark-tech, maximalism
- 의존성: 없음

큰 제목이 글자(또는 단어) 단위로 아래에서 밀려 올라오며 나타난다. 첫 화면 히어로 제목 하나에만 쓴다.

## 코드

```html
<h1 class="kinetic" data-split="chars">따뜻한 오후의 커피</h1>
```

```css
.kinetic .unit {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
}
.kinetic .unit > span {
  display: inline-block;
  transform: translateY(110%);
  animation: kinetic-in var(--k-duration, 900ms) var(--k-ease, cubic-bezier(0.16, 1, 0.3, 1)) forwards;
  animation-delay: calc(var(--i) * var(--k-stagger, 35ms) + var(--k-delay, 150ms));
}
@keyframes kinetic-in { to { transform: none; } }
@media (prefers-reduced-motion: reduce) {
  .kinetic .unit > span { transform: none; animation: none; }
}
```

```js
document.querySelectorAll('.kinetic').forEach((el) => {
  const mode = el.dataset.split || 'chars';
  const text = el.textContent;
  el.setAttribute('aria-label', text);
  const parts = mode === 'words' ? text.split(/(\s+)/) : [...text];
  el.innerHTML = '';
  let i = 0;
  for (const p of parts) {
    if (/^\s+$/.test(p)) { el.append(p); continue; }
    const unit = document.createElement('span');
    unit.className = 'unit';
    unit.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.textContent = p;
    inner.style.setProperty('--i', i++);
    unit.append(inner);
    el.append(unit);
  }
});
```

## 조절값
| 변수 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `data-split` | chars | chars / words | 한글 긴 문장은 words가 자연스럽다 |
| `--k-stagger` | 35ms | 15~80ms | 글자 수가 많으면 줄인다. 전체가 1.2초를 넘지 않게 |
| `--k-duration` | 900ms | 500~1200ms | |
| `--k-delay` | 150ms | 0~400ms | 페이지 로드 후 시작까지 |

## 성능
`transform`만 쓰므로 가볍다. 글자 수가 100자를 넘으면 words로 바꾼다.

## 하지 말 것
- 본문이나 여러 제목에 반복 사용
- 스크린 리더용 `aria-label` 빼먹기 (위 코드에 들어 있다)
