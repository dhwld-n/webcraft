# particle-field

- 종류: 배경 / 커서
- 강도: 중간~높음
- 어울리는 스타일: futuristic, cyberpunk, aurora, dark-tech, surreal, immersive-3d
- 의존성: 없음 (Canvas 2D)
- 참고: 파티클 배경의 일반 원리 (먼지, 별, 꽃가루, 불씨)

캔버스에 작은 점들이 천천히 떠다니고, 커서가 가까이 오면 밀려난다. 가까운 점끼리 옅은 선으로 이어 별자리처럼 보이게 할 수도 있다. 히어로 한 곳의 배경으로만 쓴다.

## 코드

```html
<section class="pf-hero">
  <canvas class="pf-canvas" data-particles aria-hidden="true"></canvas>
  <h1>...</h1>
</section>
```

```css
.pf-hero { position: relative; isolation: isolate; }
.pf-canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none; }
```

```js
{
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-particles]').forEach((cv) => {
    const ctx = cv.getContext('2d');
    const css = getComputedStyle(cv);
    const num = (k, d) => parseFloat(css.getPropertyValue(k)) || d;
    const color = css.getPropertyValue('--pf-color').trim() || '255 255 255';
    const density = num('--pf-density', 0.00012);  // 화면 1px²당 점 수
    const link = num('--pf-link', 110);             // 이 거리 안의 점끼리 선. 0이면 선 없음
    const push = num('--pf-push', 120);             // 커서가 밀어내는 반경
    let w, h, dpr, pts = [], mx = -1e4, my = -1e4, on = true, raf;

    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(220, Math.round(w * h * density));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4, a: Math.random() * 0.6 + 0.2,
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < push) { const f = (1 - d / push) * 0.6; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
        p.vx *= 0.96; p.vy *= 0.96;                               // 밀린 뒤 서서히 원래 속도로
        p.x += p.vx + (Math.random() - 0.5) * 0.05; p.y += p.vy + (Math.random() - 0.5) * 0.05;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        ctx.fillStyle = `rgb(${color} / ${p.a})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      if (link) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) { ctx.strokeStyle = `rgb(${color} / ${(1 - d / link) * 0.25})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
    };
    const loop = () => { draw(); if (on) raf = requestAnimationFrame(loop); };

    size();
    if (reduce) { draw(); return; }                               // 모션 줄이기: 멈춘 한 장
    addEventListener('resize', () => { size(); draw(); });
    cv.parentElement.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    cv.parentElement.addEventListener('pointerleave', () => { mx = my = -1e4; });
    new IntersectionObserver(([e]) => { on = e.isIntersecting && !document.hidden; cancelAnimationFrame(raf); if (on) loop(); }).observe(cv);
    document.addEventListener('visibilitychange', () => { on = !document.hidden; cancelAnimationFrame(raf); if (on) loop(); });
  });
}
```

## 조절값
| 변수 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--pf-color` | `255 255 255` | RGB 숫자 셋 | 점과 선 색. 밝은 바탕이면 진한 색 |
| `--pf-density` | 0.00012 | 0.00004~0.0003 | 점 개수. 1440×900에서 약 155개 (최대 220) |
| `--pf-link` | 110 | 0~160 | 점을 잇는 거리. 0이면 별가루처럼 점만 |
| `--pf-push` | 120 | 0~220 | 커서가 밀어내는 반경. 0이면 반응 없음 |

분위기별 출발값: 별밤 `link 0, density 0.0002`, 네트워크·기술 `link 120`, 불씨·꽃가루 `color 255 190 120, link 0, density 0.00006`.

## 성능
선 잇기는 점 수의 제곱만큼 계산한다. 220개 근처에서 저사양 노트북이 버거우면 density를 낮추거나 link를 0으로. 화면 밖이거나 탭이 숨으면 멈춘다.

## 하지 말 것
- 페이지 전체 배경에 깔기 (글을 읽을 때 눈이 계속 움직인다)
- 파란 점 + 파란 선 네트워크를 "AI·기술" 기본값으로 쓰기 (가장 흔한 AI 사이트 배경이다. 색과 밀도를 사이트 이야기에서 정한다)
- 글자 바로 뒤를 빽빽하게 (대비가 떨어진다. 제목 뒤는 점을 줄이거나 그라데이션으로 가린다)
