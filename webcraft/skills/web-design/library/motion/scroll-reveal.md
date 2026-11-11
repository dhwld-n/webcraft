# scroll-reveal

- 종류: 스크롤
- 강도: 낮음
- 어울리는 스타일: 거의 모두. 특히 editorial, bento-grid, swiss
- 의존성: 없음

요소가 화면에 들어올 때 아래에서 살짝 떠오르며 나타난다. 여러 요소는 차례로 나타난다.

## 코드

```html
<section data-reveal>
  <h2 style="--i:0">제목</h2>
  <p style="--i:1">설명</p>
</section>
```

```css
[data-reveal] > * {
  opacity: 0;
  transform: translateY(var(--reveal-distance, 24px));
  transition:
    opacity var(--reveal-duration, 700ms) var(--reveal-ease, cubic-bezier(0.22, 1, 0.36, 1)),
    transform var(--reveal-duration, 700ms) var(--reveal-ease, cubic-bezier(0.22, 1, 0.36, 1));
  transition-delay: calc(var(--i, 0) * var(--reveal-stagger, 80ms));
}
[data-reveal].is-visible > * {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  [data-reveal] > * { opacity: 1; transform: none; transition: none; }
}
```

```js
{
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
    }
  }, { threshold: 0.15 });
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
}
```

## 조절값
| 변수 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--reveal-distance` | 24px | 8~48px | 클수록 극적 |
| `--reveal-duration` | 700ms | 400~1000ms | editorial은 길게, neo-brutalism은 짧게 |
| `--reveal-stagger` | 80ms | 40~150ms | 요소 사이 간격 |
| `--reveal-ease` | 감속 곡선 | | neo-brutalism은 `steps(4)`나 짧은 탄성도 어울린다 |

## 성능
`opacity`와 `transform`만 바꾸므로 가볍다. 한 화면에 수십 개여도 괜찮다.

## 하지 말 것
- 페이지의 모든 요소에 붙이기 (첫 화면 히어로는 바로 보여야 한다)
- 1초 넘게 기다리게 하기
