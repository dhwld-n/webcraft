# smooth-loader

- 종류: 로딩 / 페이지 진입
- 강도: 중간
- 어울리는 스타일: editorial, minimalism, swiss, futuristic, immersive-3d, victorian
- 의존성: 없음
- 참고: Fluid Glass의 로고 로딩 후 본문, 포트폴리오 사이트들의 숫자 카운터 + 막 걷히기

첫 방문에만 짧은 로딩 화면이 뜬다. 숫자가 0에서 100으로 오르고, 다 차면 막이 위로 걷히며 첫 화면 제목이 아래에서 올라온다. 실제 로딩(글꼴, 첫 이미지)이 끝날 때까지 기다리되 너무 오래 붙잡지 않는다.

## 코드

```html
<div class="sl" data-loader aria-hidden="true">
  <span class="sl__count">0</span>
</div>
<main class="sl-page">...</main>
```

```css
.sl {
  position: fixed; inset: 0; z-index: 100; display: grid; place-items: end start; padding: var(--margin, 32px);
  background: var(--sl-bg, #111); color: var(--sl-fg, #f2efe9);
  transition: clip-path var(--sl-out, 900ms) cubic-bezier(0.76, 0, 0.24, 1);
  clip-path: inset(0 0 0 0);
}
.sl__count { font: var(--sl-font, 500 clamp(64px, 14vw, 200px) / 0.85 var(--font-num, sans-serif)); font-variant-numeric: tabular-nums; letter-spacing: -0.04em; }
.sl.is-done { clip-path: inset(0 0 100% 0); }                 /* 막이 위로 걷힌다 */
.sl-page { opacity: 0; translate: 0 40px; transition: opacity 600ms ease, translate 900ms cubic-bezier(0.22, 1, 0.36, 1); }
.sl.is-done ~ .sl-page, .sl-page.is-in { opacity: 1; translate: 0 0; }
.sl.is-gone { display: none; }

@media (prefers-reduced-motion: reduce) {
  .sl { transition: opacity 200ms linear; clip-path: none; }
  .sl.is-done { opacity: 0; }
  .sl-page { translate: 0 0; transition: opacity 200ms linear; }
}
```

```js
{
  const el = document.querySelector('[data-loader]');
  const page = document.querySelector('.sl-page');
  if (el) {
    const seen = (() => { try { return sessionStorage.getItem('sl-seen'); } catch { return null; } })();
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduce) {                                       // 두 번째 방문, 모션 줄이기: 바로 본문
      el.classList.add('is-gone'); page?.classList.add('is-in');
    } else {
      const count = el.querySelector('.sl__count');
      const MIN = 1200, MAX = 3500, t0 = performance.now();      // 최소 1.2초 보여 주고, 3.5초 넘게 붙잡지 않는다
      let ready = false, shown = 0;
      const firstImg = document.querySelector('main img');
      Promise.all([
        document.fonts?.ready,
        firstImg && !firstImg.complete ? new Promise((r) => firstImg.addEventListener('load', r, { once: true })) : null,
      ]).then(() => { ready = true; });
      const tick = (now) => {
        const t = now - t0;
        const goal = ready && t > MIN ? 100 : Math.min(90, (t / MAX) * 100);   // 준비 전에는 90에서 기다린다
        shown += (goal - shown) * 0.08;
        count.textContent = Math.round(shown);
        if (shown > 99.5 || t > MAX) {
          count.textContent = '100';
          el.classList.add('is-done');
          el.addEventListener('transitionend', () => el.classList.add('is-gone'), { once: true });
          try { sessionStorage.setItem('sl-seen', '1'); } catch {}
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }
}
```

## 조절값
| 변수 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--sl-bg` / `--sl-fg` | `#111` / `#f2efe9` | | 막 색과 숫자 색. 사이트의 가장 진한 면 색을 쓴다 |
| `--sl-out` | 900ms | 600~1200ms | 막이 걷히는 시간. 곡선은 `cubic-bezier(0.76, 0, 0.24, 1)` (천천히 출발, 빠르게 지나, 천천히 멈춤) |
| MIN / MAX | 1200 / 3500ms | 800~2000 / 2500~5000 | 최소 보여 주는 시간과 최대 붙잡는 시간 |
| `--sl-font` | 500, 화면 폭 14% | | 숫자 글꼴. 숫자 전용 글꼴이 있으면 쓴다 |

변형: 숫자 대신 로고를 한 글자씩 그리기(`signature-draw`), 막을 위가 아니라 가운데서 양옆으로 (`clip-path: inset(0 50% 0 50%)`).

## 하지 말 것
- 로딩할 것도 없는데 3초 넘게 붙잡기
- 매 방문마다 보여 주기 (같은 탭에서는 한 번만)
- 돌아가는 원, 점 세 개 같은 기본 스피너 (어디서나 보는 모양이다)
- 로딩 화면 뒤에서 본문이 먼저 튀어 올라와 보이는 것 (본문은 막이 걷힐 때 들어온다)
