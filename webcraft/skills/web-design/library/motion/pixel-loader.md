# pixel-loader

- 종류: 로딩 / 상태
- 강도: 낮음
- 어울리는 스타일: retro-pixel, dark-tech, AI 제품
- 의존성: 없음
- 참고: Beautiful UI의 픽셀 격자 로더 + 경과 시간 원리

작은 픽셀 격자가 무작위로 깜빡이고, 옆에 상태 문구와 경과 시간이 올라간다. AI 응답 대기, 업로드, 생성 중 상태에.

## 코드

```html
<div class="px-loader" data-px-loader="3" role="status">
  <span class="px-grid" aria-hidden="true"></span>
  <span class="px-label">생각 중</span>
  <span class="px-time" data-px-time>0.0s</span>
</div>
```

```css
.px-loader {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font: 500 14px/1 ui-monospace, "SF Mono", Menlo, monospace;
  color: var(--px-color, inherit);
}
.px-grid {
  display: grid;
  grid-template-columns: repeat(var(--n, 3), var(--px-size, 5px));
  gap: 2px;
}
.px-grid i {
  width: var(--px-size, 5px);
  height: var(--px-size, 5px);
  background: currentColor;
  opacity: 0.15;
  animation: px-blink 1.2s steps(2, jump-none) infinite;
  animation-delay: var(--d, 0s);
}
@keyframes px-blink { 50% { opacity: 1; } }
.px-time { font-variant-numeric: tabular-nums; }
@media (prefers-reduced-motion: reduce) {
  .px-grid i { animation: none; opacity: 0.6; }
}
```

```js
function startPixelLoader(el, size = 3) {
  const grid = el.querySelector('.px-grid');
  grid.style.setProperty('--n', size);
  for (let i = 0; i < size * size; i++) {
    const c = document.createElement('i');
    c.style.setProperty('--d', `-${(Math.random() * 1.2).toFixed(2)}s`);
    grid.append(c);
  }
  const time = el.querySelector('[data-px-time]');
  const t0 = performance.now();
  const id = setInterval(() => {
    time.textContent = `${((performance.now() - t0) / 1000).toFixed(1)}s`;
  }, 100);
  return () => clearInterval(id);
}
document.querySelectorAll('[data-px-loader]').forEach((el) => startPixelLoader(el, Number(el.dataset.pxLoader) || 3));
```

작업이 끝나면 `startPixelLoader`가 돌려준 함수를 불러 시간을 멈추고, 로더를 결과로 바꾼다.

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `data-px-loader` | 3 | 2~5 | 격자 크기 (3이면 3×3) |
| `--px-size` | 5px | 3~8px | 픽셀 크기 |
| 깜빡임 주기 | 1.2s | 0.8~2s | `animation` 시간 |
| `--px-color` | 주변 글자색 | | 레트로면 형광 초록이나 주황. 바꾸면 배경과 4.5:1 이상인지 `contrast.mjs`로 확인 |

## 성능
CSS 애니메이션과 0.1초 타이머 하나. 가볍다.

## 하지 말 것
- 로딩이 0.5초도 안 걸리는 곳에 쓰기 (깜빡이고 사라진다)
- 경과 시간을 끝난 뒤에도 계속 올리기 (반드시 멈춘다)
