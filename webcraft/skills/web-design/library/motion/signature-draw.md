# signature-draw

- 종류: 스크롤 / 손맛
- 강도: 중간
- 어울리는 스타일: kinetic-type, maximalism, editorial, 개인 브랜드
- 의존성: 없음 (SVG)
- 참고: Lando Norris의 스크롤 사인 원리

스크롤하면 사인이나 손글씨 선이 펜으로 쓰듯 그려진다. 스크롤을 되돌리면 지워진다. 페이지에 하나만.

## 코드

```html
<div data-draw-scope style="min-height: 120vh; display: grid; place-items: center;">
  <svg class="sig" viewBox="0 0 400 120" width="400" aria-hidden="true">
    <path data-draw d="M10 80 C 60 10, 90 10, 120 70 S 180 120, 210 60 S 280 0, 320 60 S 370 100, 390 40" />
  </svg>
</div>
```

```css
.sig path {
  fill: none;
  stroke: var(--sig-color, #c8f000);
  stroke-width: var(--sig-width, 5);
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

```js
{
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = [...document.querySelectorAll('[data-draw]')].map((p) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = len;
    p.style.strokeDashoffset = reduce ? 0 : len;
    return { p, len, scope: p.closest('[data-draw-scope]') || p.ownerSVGElement };
  });
  if (!reduce && items.length) {
    const update = () => {
      const vh = innerHeight;
      const atBottom = vh + scrollY >= document.documentElement.scrollHeight - 2;
      for (const { p, len, scope } of items) {
        const start = vh * parseFloat(p.dataset.drawStart || '0.85');
        const end = vh * parseFloat(p.dataset.drawEnd || '0.25');
        const top = scope.getBoundingClientRect().top;
        const t = atBottom && top < vh ? 1 : Math.min(1, Math.max(0, (start - top) / (start - end)));
        p.style.strokeDashoffset = len * (1 - t);
      }
    };
    let queued = false;
    addEventListener('scroll', () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { update(); queued = false; });
    }, { passive: true });
    update();
  }
}
```

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `data-draw-start` | 0.85 | 0.6~1 | 범위 윗부분이 화면 몇 % 지점에 오면 그리기 시작 |
| `data-draw-end` | 0.25 | 0~0.5 | 몇 % 지점에서 다 그려짐. 시작과 차이가 클수록 천천히 |
| `--sig-color` | 형광 라임 | | 팔레트의 강조색 하나 |
| `--sig-width` | 5 | 2~10 | 펜 굵기 |

경로(`d`)는 직접 만든다. 일러스트레이터나 피그마에서 펜으로 한 획을 그리고 SVG로 내보내 `d`를 붙인다. 여러 획이면 `path`마다 `data-draw`를 붙인다.

## 성능
스크롤마다 `stroke-dashoffset` 하나만 바뀐다. 가볍다.

## 하지 말 것
- 실제 사람의 사인을 허락 없이 쓰기
- 글자 위에 겹쳐 읽기를 방해하기
- 채우기(fill)가 있는 모양에 쓰기 (선만 그려진다)
