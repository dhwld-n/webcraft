# image-trail

- 종류: 커서 / 이미지
- 강도: 높음
- 어울리는 스타일: maximalism, collage, pop-art, editorial
- 의존성: 없음
- 참고: Componentry image-trail의 원리 (커서가 지나간 자리에 사진이 차례로 찍혔다 사라짐). 코드는 새로 썼다

정해 둔 칸 안에서 커서를 움직이면, 일정 거리마다 사진이 한 장씩 커서 자리에 살짝 기울어 찍히고 곧 사라진다. 사진이 많은 가게, 작업이 많은 포트폴리오, 행사 사진 모음의 첫 화면에.

## 코드

```html
<section class="trail" data-trail>
  <h2 class="trail-title">지난 여름의 장면들</h2>
  <div class="trail-src" hidden>
    <img src="…" alt="">
    <img src="…" alt="">
    <img src="…" alt="">
  </div>
</section>
```

```css
.trail { position: relative; overflow: hidden; min-height: 70vh; display: grid; place-items: center; }
.trail-title { position: relative; z-index: 1; }
.trail-img {
  position: absolute;
  z-index: 0;
  width: var(--trail-w, 180px);
  aspect-ratio: 4 / 5;
  object-fit: cover;
  translate: -50% -50%;
  pointer-events: none;
}
```

```js
{
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (fine && !reduce) document.querySelectorAll('[data-trail]').forEach((area) => {
    const srcs = [...area.querySelectorAll('.trail-src img')].map((i) => i.currentSrc || i.src);
    const gap = Number(area.dataset.trailGap || 90);
    const max = Number(area.dataset.trailMax || 7);
    let last = null;
    let n = 0;
    area.addEventListener('pointermove', (e) => {
      const r = area.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (last && Math.hypot(x - last[0], y - last[1]) < gap) return;
      last = [x, y];
      const img = new Image();
      img.src = srcs[n++ % srcs.length];
      img.alt = '';
      img.className = 'trail-img';
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.rotate = `${Math.random() * 12 - 6}deg`;
      area.append(img);
      const all = area.querySelectorAll('.trail-img');
      if (all.length > max) all[0].remove();
      img.animate([{ opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1 }], { duration: 260, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
      img.animate([{ opacity: 1 }, { opacity: 0, scale: 0.9 }], { duration: 500, delay: 700, fill: 'forwards', easing: 'ease-in' })
        .finished.then(() => img.remove(), () => {});
    });
  });
}
```

`hidden` 칸의 사진은 미리 받아 두는 용도다. 터치 화면과 모션 줄이기 설정에서는 아무것도 찍히지 않으므로, 그때 보일 사진 한 장이나 작은 격자를 따로 둔다.

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `data-trail-gap` | 90 | 60~160 | 사진이 찍히는 거리(px). 작을수록 빽빽하다 |
| `data-trail-max` | 7 | 4~10 | 한꺼번에 남는 사진 수 |
| `--trail-w` | 180px | 120~260px | 사진 너비 |
| 기울기 | ±6deg | 0~12deg | 손으로 붙인 느낌 |

## 성능
사진 몇 장에 `opacity`와 `scale`만 움직인다. 사진 파일은 너비 600px 안쪽으로 줄여 둔다.

## 하지 말 것
- 제목 위로 사진이 덮이게 (제목에 `z-index`를 주고 사진은 뒤로)
- 사진 3장 이하 (같은 사진이 너무 자주 반복된다)
- 읽어야 할 본문 구역 전체에 걸기. 첫 화면이나 사진 모음 칸 하나에만
