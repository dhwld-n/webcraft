# liquid-glass

- 종류: 재질 / 커서
- 강도: 낮음~중간
- 어울리는 스타일: liquid-glass, dark-tech, editorial(사진 위 고정 내비 하나)
- 의존성: 없음
- 참고: Fluid Glass의 반투명 하단 내비 원리

배경 위에 떠 있는 유리판. 뒤를 흐리게 비추고, 위쪽 가장자리에 빛이 맺히며, 커서를 따라 반사광이 움직인다. 사진이나 색 있는 배경 위 **한 곳**(내비, 히어로 카드 하나)에만 쓴다.

## 코드

```html
<nav class="glass" data-glass>
  <a href="#work">작업</a> <a href="#about">소개</a> <a href="#contact">연락</a>
</nav>
```

```css
.glass {
  position: relative;
  display: inline-flex;
  gap: 24px;
  padding: 14px 28px;
  border-radius: 999px;
  color: #fff;
  background: rgb(255 255 255 / var(--glass-tint, 0.12));
  -webkit-backdrop-filter: blur(var(--glass-blur, 16px)) saturate(180%);
  backdrop-filter: blur(var(--glass-blur, 16px)) saturate(180%);
  border: 1px solid rgb(255 255 255 / 0.28);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.5),
    inset 0 -1px 0 rgb(255 255 255 / 0.08),
    0 8px 32px rgb(0 0 0 / 0.25);
  overflow: hidden;
}
.glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: radial-gradient(circle at var(--mx, 30%) var(--my, 0%), rgb(255 255 255 / 0.35), transparent 45%);
}
.glass a { position: relative; color: inherit; text-decoration: none; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .glass { background: rgb(20 20 28 / 0.85); }
}
```

```js
{
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('[data-glass]').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    });
  }
}
```

## 조절값
| 변수 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--glass-blur` | 16px | 8~32px | 클수록 뒤가 뿌옇다 |
| `--glass-tint` | 0.12 | 0.05~0.3 | 유리의 흰 기운. 밝은 배경이면 낮게, 어두운 글자가 필요하면 높게 |
| 반사광 투명도 | 0.35 | 0.15~0.5 | `::before`의 첫 색 |

## 성능
`backdrop-filter`는 뒤 화면을 매 프레임 다시 그린다. 화면에 2~3개 이하, 큰 면적 금지. 스크롤로 계속 움직이는 영상 위에서는 저사양 기기에서 끊길 수 있다.

## 하지 말 것
- 카드, 버튼, 패널 전부를 유리로 (Fluid Glass처럼 한 곳만)
- 단색 배경 위에 쓰기 (비칠 게 없어 그냥 회색 판이 된다)
- 글자 대비 확인 없이 쓰기. 뒤 배경의 **가장 밝은 부분** 기준으로 확인
