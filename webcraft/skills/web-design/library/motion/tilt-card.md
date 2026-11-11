# tilt-card

- 종류: 3D / 커서
- 강도: 중간
- 어울리는 스타일: futuristic, y2k-chrome, pop-art, vector-art, cyberpunk, bento-grid, immersive-3d
- 의존성: 없음 (CSS 3D 변환)
- 참고: daisyUI 첫 화면의 원근으로 기울인 컴포넌트 판, 수집 카드(트레이딩 카드)식 반짝이는 기울이기

커서 위치에 따라 카드가 3D로 기울고, 표면에 빛이 비껴 지나간다. 안쪽 요소를 `translateZ`로 띄우면 판 위에 층이 생긴다. 놓으면 스프링처럼 돌아온다. 상품, 작품, 회원 카드처럼 **하나를 집어 보는** 대상에 쓴다.

## 코드

```html
<div class="tc" data-tilt>
  <div class="tc__card">
    <img class="tc__img" src="..." alt="...">
    <h3 class="tc__title">이름</h3>
    <span class="tc__glare" aria-hidden="true"></span>
  </div>
</div>
```

```css
.tc { perspective: var(--tc-depth, 900px); }
.tc__card {
  position: relative; transform-style: preserve-3d; border-radius: 18px; /* overflow: hidden을 쓰면 3D 층이 납작해진다 */
  transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform 600ms cubic-bezier(0.34, 1.45, 0.5, 1);  /* 놓을 때 살짝 튕기며 돌아온다 */
}
.tc.is-active .tc__card { transition: transform 80ms linear; }
.tc__img { display: block; width: 100%; border-radius: inherit; border-bottom-left-radius: 0; border-bottom-right-radius: 0; }
.tc__title { transform: translateZ(40px); }                       /* 판 위에 뜬 층 */
.tc__glare {
  position: absolute; inset: 0; border-radius: inherit; pointer-events: none; mix-blend-mode: soft-light; opacity: 0; transition: opacity 300ms ease;
  background: radial-gradient(circle at var(--gx, 50%) var(--gy, 50%), rgb(255 255 255 / 0.65), transparent 55%);
}
.tc.is-active .tc__glare { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .tc__card { transform: none !important; transition: none; }
  .tc__glare { display: none; }
}
```

```js
{
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (fine && !reduce) {
    document.querySelectorAll('[data-tilt]').forEach((el) => {
      const card = el.firstElementChild;
      const max = parseFloat(getComputedStyle(el).getPropertyValue('--tc-max')) || 12;   // 최대 기울기(도)
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.classList.add('is-active');
        card.style.setProperty('--ry', `${(px - 0.5) * 2 * max}deg`);
        card.style.setProperty('--rx', `${(0.5 - py) * 2 * max}deg`);
        card.style.setProperty('--gx', `${px * 100}%`);
        card.style.setProperty('--gy', `${py * 100}%`);
      });
      el.addEventListener('pointerleave', () => {
        el.classList.remove('is-active');
        card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg');
      });
    });
  }
}
```

## 조절값
| 변수 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--tc-max` | 12 | 4~20 | 최대 기울기(도). 큰 카드는 작게 |
| `--tc-depth` | 900px | 500~1500px | 원근. 작을수록 과장된 3D |
| `translateZ` | 40px | 0~80px | 안쪽 층이 판에서 뜨는 높이 |
| 돌아오는 곡선 | `cubic-bezier(0.34, 1.45, 0.5, 1)` 600ms | | 끝에서 살짝 넘쳤다 돌아온다 (UI8 실측 튕김 곡선과 비슷) |

정지 버전(움직이지 않는 3D): 커서 없이 `--rx: 8deg; --ry: -14deg`를 고정해 두면 daisyUI 첫 화면처럼 기울인 판이 된다. 여러 장을 같은 각도로 겹쳐 놓는다.

## 하지 말 것
- 카드 그리드 전체에 (모든 카드가 흔들리면 싸 보인다. 대표 하나나 상세 화면에)
- 글이 많은 카드 (기울면 읽기 어렵다)
- 터치 화면에서 기울이기 (JS가 `pointer: fine`에서만 켠다)
- 글레어를 흰색 100%로 (번쩍여서 내용이 안 보인다)
