# sticky-stack

- 종류: 스크롤 / 카드
- 강도: 중간
- 어울리는 스타일: bento-grid, editorial, dark-tech, minimalism
- 의존성: 없음
- 참고: Componentry sticky-scroll-cards의 원리 (스크롤하면 카드가 위에 차곡차곡 쌓임). 코드는 새로 썼다

스크롤하면 카드가 화면 위쪽에 붙고, 다음 카드가 그 위로 올라와 덮는다. 덮인 카드는 살짝 작아지고 어두워져 뒤로 물러난 느낌이 난다. 기능 3~5개, 과정 단계, 사례 묶음에.

## 코드

```html
<section class="stack">
  <article class="stack-card">…</article>
  <article class="stack-card">…</article>
  <article class="stack-card">…</article>
</section>
```

```css
.stack {
  display: grid;
  gap: var(--stack-space, 20vh);
  padding-bottom: 12vh;
}
.stack-card {
  position: sticky;
  top: calc(var(--stack-top, 12vh) + var(--i, 0) * var(--stack-gap, 16px));
  min-height: min(68vh, 560px);
  border-radius: 24px;
  transform-origin: 50% 0;
  transform: scale(calc(1 - var(--p, 0) * var(--stack-shrink, 0.06)));
}
.stack-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: #000;
  opacity: calc(var(--p, 0) * var(--stack-dim, 0.25));
  pointer-events: none;
}
```

```js
{
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.stack').forEach((stack) => {
    const cards = [...stack.querySelectorAll('.stack-card')];
    cards.forEach((c, i) => c.style.setProperty('--i', i));
    if (reduce) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      for (let i = 0; i < cards.length - 1; i++) {
        const a = cards[i].getBoundingClientRect();
        const b = cards[i + 1].getBoundingClientRect();
        const p = Math.min(1, Math.max(0, 1 - (b.top - a.top) / a.height));
        cards[i].style.setProperty('--p', p.toFixed(3));
      }
    };
    addEventListener('scroll', () => { raf ||= requestAnimationFrame(update); }, { passive: true });
    addEventListener('resize', update);
    update();
  });
}
```

카드 배경색은 각자 정한다. 투명하면 뒤 카드가 비친다.

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--stack-top` | 12vh | 6~20vh | 카드가 붙는 높이. 고정 헤더가 있으면 그만큼 더한다 |
| `--stack-gap` | 16px | 0~28px | 쌓인 카드 머리가 보이는 간격 |
| `--stack-space` | 20vh | 10~40vh | 다음 카드가 올라오기까지 스크롤 거리 |
| `--stack-shrink` | 0.06 | 0~0.1 | 덮인 카드가 작아지는 정도 |
| `--stack-dim` | 0.25 | 0~0.4 | 덮인 카드가 어두워지는 정도 |

## 성능
카드마다 `transform`과 그림자 층 `opacity`. 스크롤 한 번에 한 프레임만 계산한다.

## 하지 말 것
- 조상 요소에 `overflow: hidden`이나 `overflow: auto` (sticky가 안 붙는다)
- 카드 높이가 화면보다 큼 (아래 내용을 못 읽고 덮인다)
- 카드 6장 이상
- 모바일에서 `--stack-top`을 크게 (화면이 좁아 카드가 금방 가려진다)
