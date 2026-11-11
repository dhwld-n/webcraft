# magnetic-button

- 종류: 마이크로 인터랙션 / 커서
- 강도: 중간
- 어울리는 스타일: dark-tech, bento-grid, liquid-glass, claymorphism
- 의존성: 없음

커서가 가까이 오면 버튼이 커서 쪽으로 살짝 끌려오고, 벗어나면 스프링처럼 제자리로 돌아온다. 주요 버튼 한두 개에만 쓴다.

## 코드

```html
<a class="btn" data-magnetic href="#start"><span>시작하기</span></a>
```

```js
if (matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.dataset.strength || '0.35');
    const stiffness = 0.15, damping = 0.75;
    let x = 0, y = 0, vx = 0, vy = 0, tx = 0, ty = 0, raf = 0;
    const tick = () => {
      vx = (vx + (tx - x) * stiffness) * damping;
      vy = (vy + (ty - y) * stiffness) * damping;
      x += vx; y += vy;
      el.style.transform = `translate(${x}px, ${y}px)`;
      if (Math.abs(tx - x) + Math.abs(ty - y) + Math.abs(vx) + Math.abs(vy) > 0.1) raf = requestAnimationFrame(tick);
      else raf = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) * strength;
      ty = (e.clientY - (r.top + r.height / 2)) * strength;
      kick();
    });
    el.addEventListener('pointerleave', () => { tx = 0; ty = 0; kick(); });
  });
}
```

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `data-strength` | 0.35 | 0.15~0.6 | 얼마나 끌려오는지 |
| `stiffness` | 0.15 | 0.08~0.25 | 클수록 빠르게 따라옴 |
| `damping` | 0.75 | 0.6~0.9 | 작을수록 출렁임이 빨리 멈춤 |

## 성능
움직일 때만 프레임을 돈다. 멈추면 루프가 끝난다.

## 하지 말 것
- 터치 기기에서 켜기 (위 코드는 `pointer: fine`일 때만 켠다)
- 링크 목록, 내비게이션 전체에 붙이기
