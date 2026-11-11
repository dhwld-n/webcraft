# hold-to-enter

- 종류: 로딩 / 입장
- 강도: 중간
- 어울리는 스타일: immersive-3d, dark-tech, retro-pixel
- 의존성: 없음 (3D와 함께 쓰면 `three-stage`의 로딩 진행률을 넘겨준다)
- 참고: bricelab의 꾹 눌러 입장하는 로딩 화면 (원리만)

무거운 장면을 불러오는 동안 입장 화면을 보여 주고, 다 불러오면 버튼을 **꾹 누르고 있어야** 들어간다. 기다리는 시간이 의식이 된다. 손을 떼면 게이지가 천천히 빠진다. 스페이스나 엔터를 누르고 있어도 되고, 모션 줄이기 설정이면 한 번 누르면 들어간다.

## 코드

```html
<div class="gate" id="gate">
  <p class="gate-load"><span data-load>0</span>% 불러옴</p>
  <button class="gate-btn" type="button" disabled aria-describedby="gate-hint">
    <span class="gate-label">꾹 눌러 들어가기</span>
    <span class="gate-bar" aria-hidden="true"></span>
  </button>
  <p class="gate-hint" id="gate-hint">스페이스나 엔터를 누르고 있어도 됩니다</p>
</div>
<main id="main" tabindex="-1">...</main>
```

```css
.gate {
  position: fixed; inset: 0; z-index: 10;
  display: grid; place-content: center; gap: 16px; text-align: center;
  background: var(--bg); color: var(--text);
  transition: opacity 0.8s ease, visibility 0.8s;
}
.gate.is-open { opacity: 0; visibility: hidden; }
.gate-btn {
  position: relative; overflow: hidden; padding: 18px 32px;
  border: 1px solid currentColor; background: none; color: inherit; font: inherit;
  user-select: none; -webkit-user-select: none; -webkit-touch-callout: none; touch-action: none;
}
.gate-btn:disabled { opacity: 0.4; }
.gate-bar {
  position: absolute; inset: 0; z-index: -1;
  background: var(--accent); transform-origin: left;
  transform: scaleX(var(--p, 0));
}
.gate-load, .gate-hint { margin: 0; color: var(--muted); font-variant-numeric: tabular-nums; }
```

```js
// gate.js
export function createGate(gate, { hold = 1400, onEnter } = {}) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const btn = gate.querySelector('.gate-btn');
  const load = gate.querySelector('[data-load]');
  if (reduce) {
    gate.querySelector('.gate-label').textContent = '눌러서 들어가기';
    gate.querySelector('.gate-hint').hidden = true;
  }
  let p = 0, holding = false, last = 0, done = false;

  const enter = () => {
    done = true;
    gate.classList.add('is-open');
    document.documentElement.classList.add('entered');
    document.querySelector('#main')?.focus({ preventScroll: true });
    onEnter?.();
  };
  // Time-based, so a slow frame rate does not make the hold longer.
  const tick = (now) => {
    const dt = now - last; last = now;
    p = Math.min(1, Math.max(0, p + (holding ? dt / hold : -dt / (hold / 2))));
    btn.style.setProperty('--p', p);
    if (p >= 1) return enter();
    if (holding || p > 0) requestAnimationFrame(tick);
  };
  const start = () => {
    if (done || btn.disabled || holding) return;
    holding = true; last = performance.now();
    requestAnimationFrame(tick);
  };
  const stop = () => { holding = false; };

  if (reduce) btn.addEventListener('click', () => !btn.disabled && enter());
  else {
    btn.addEventListener('pointerdown', (e) => { btn.setPointerCapture(e.pointerId); start(); });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((t) => btn.addEventListener(t, stop));
    btn.addEventListener('keydown', (e) => {
      if (e.key !== ' ' && e.key !== 'Enter') return;
      e.preventDefault();
      if (!e.repeat) start();
    });
    btn.addEventListener('keyup', (e) => (e.key === ' ' || e.key === 'Enter') && stop());
    btn.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  const progress = (v) => {
    load.textContent = Math.round(v * 100);
    if (v >= 1 && btn.disabled) { btn.disabled = false; btn.focus(); }
  };
  // Never trap anyone behind a load that stalls: unlock after 12s whatever happens.
  setTimeout(() => progress(1), 12000);
  // progress(0..1): loading progress; the button unlocks at 1.
  return { progress };
}
```

```js
// main.js 예시: three.js 로딩 진행률과 묶기
import { createGate } from './gate.js';
import { THREE } from './stage.js';

// onEnter: 입장 순간 장면을 깨운다 (예: point-morph의 cloud.gather())
const gate = createGate(document.querySelector('#gate'), { onEnter: () => {} });
THREE.DefaultLoadingManager.onProgress = (_, loaded, total) => gate.progress(loaded / total);
// 불러올 에셋이 없으면 바로: gate.progress(1)
```

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `hold` | 1400 | 800~2500 ms | 누르고 있어야 하는 시간. 길면 의식, 짧으면 답답하지 않다 |
| 빠지는 속도 | `hold / 2` | | 손을 떼면 게이지가 빠지는 시간 |
| 사라지는 시간 | 0.8s | 0.4~1.5s | 입장 화면이 걷히는 속도 |

## 성능
게이지는 `transform` 하나. 누르고 있을 때만 프레임을 돈다.

## 하지 말 것
- 키보드나 모션 줄이기 대체 없이 꾹 누르기만 두기 (못 들어가는 사람이 생긴다)
- 불러올 것이 없는 가벼운 페이지에 입장 화면 (기다림에 이유가 없다)
- 버튼 문구를 영문 "HOLD TO ENTER"로 그대로 (레퍼런스의 얼굴이고 흔하다)
- 입장 후 입장 화면이 초점을 잡고 있게 두기 (초점은 본문으로)
