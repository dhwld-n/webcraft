# cushion-button

- 종류: 마이크로 인터랙션 / 커서
- 강도: 중간
- 어울리는 스타일: claymorphism, neo-brutalism(그림자만 바꿔서), bento-grid
- 의존성: 없음
- 참고: Originkit의 Velour Bolster 아이디어(부풀기, 눌림, 튕김)를 CSS + 스프링으로 가볍게 새로 구현

말랑한 쿠션 같은 버튼. 커서가 올라오면 살짝 부풀며 커서 쪽으로 기울고, 누르면 움푹 들어갔다가 놓으면 튕겨 나온다. 주요 버튼 한두 개에만 쓴다.

## 코드

```html
<button class="cushion" data-cushion type="button">시작하기</button>
```

```css
.cushion {
  --cushion-color: #f6b5c8;
  --cushion-ink: #5a1f33;
  --cushion-tint: 214 92 132;
  padding: 18px 40px;
  border: 0;
  border-radius: 999px;
  font: 700 18px/1 system-ui, sans-serif;
  color: var(--cushion-ink);
  background: var(--cushion-color);
  box-shadow:
    0 16px 32px -10px rgb(var(--cushion-tint) / 0.5),
    inset 0 -6px 12px rgb(var(--cushion-tint) / 0.4),
    inset 0 8px 16px rgb(255 255 255 / 0.65);
  cursor: pointer;
  transition: box-shadow 0.18s ease;
}
.cushion.is-pressed,
.cushion:active {
  box-shadow:
    0 6px 12px -6px rgb(var(--cushion-tint) / 0.45),
    inset 0 8px 16px rgb(var(--cushion-tint) / 0.4),
    inset 0 -3px 8px rgb(255 255 255 / 0.5);
}
.cushion:focus-visible {
  outline: 3px solid var(--cushion-ink);
  outline-offset: 4px;
}
```

```js
{
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-cushion]').forEach((el) => {
    el.addEventListener('pointerdown', () => el.classList.add('is-pressed'));
    ['pointerup', 'pointerleave', 'blur'].forEach((t) => el.addEventListener(t, () => el.classList.remove('is-pressed')));
    if (reduce) return;

    const lean = parseFloat(el.dataset.lean || '0.12');
    const k = 0.18, damping = 0.7;
    let s = 1, vs = 0, ts = 1, x = 0, vx = 0, tx = 0, y = 0, vy = 0, ty = 0, raf = 0;
    const tick = () => {
      vs = (vs + (ts - s) * k) * damping; s += vs;
      vx = (vx + (tx - x) * k) * damping; x += vx;
      vy = (vy + (ty - y) * k) * damping; y += vy;
      el.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
      const rest = Math.abs(ts - s) + Math.abs(vs) + Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(vx) + Math.abs(vy);
      raf = rest > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };

    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width / 2) * lean;
      ty = (e.clientY - r.top - r.height / 2) * lean;
      if (!el.classList.contains('is-pressed')) ts = 1.06;
      kick();
    });
    el.addEventListener('pointerdown', () => { ts = 0.92; kick(); });
    el.addEventListener('pointerup', () => { ts = 1.06; vs += 0.04; kick(); });
    el.addEventListener('pointerleave', () => { ts = 1; tx = 0; ty = 0; kick(); });
  });
}
```

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--cushion-color` | 분홍 | | 파스텔이 클레이모피즘답다. 글자색은 같은 색의 아주 진한 톤 |
| `--cushion-tint` | `214 92 132` | | 그림자를 물들이는 색 (RGB 숫자). 버튼색보다 진한 같은 계열. 검정을 쓰면 플라스틱처럼 보인다 |
| `data-lean` | 0.12 | 0~0.25 | 커서 쪽으로 기우는 정도 |
| `ts` 눌림 값 | 0.92 | 0.88~0.96 | 작을수록 깊게 눌림 |
| 놓을 때 `vs += 0.04` | 0.04 | 0~0.08 | 튕김 세기 |

## 성능
움직일 때만 프레임을 돈다. `transform`과 `box-shadow`만 바뀐다.

## 하지 말 것
- 버튼마다 붙이기 (주요 행동 하나)
- 글자색을 버튼색과 대비 낮게 두기 (`contrast.mjs`로 확인)
- 모션 줄이기 설정에서도 그림자 눌림(`:active`)은 남긴다. 위 코드가 그렇게 되어 있다
