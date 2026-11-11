# section-color-shift

- 종류: 스크롤 / 전환
- 강도: 낮음
- 어울리는 스타일: kinetic-type, editorial, swiss, maximalism
- 의존성: 없음
- 참고: Lando Norris(올리브 → 카키 → 미색), 서울디자인페스티벌(사이드 띠 색 변화), Ondo Collective의 장별 온도 변화

스크롤로 섹션이 바뀌면 페이지 배경색과 글자색이 부드럽게 바뀐다. 장이 넘어가는 느낌을 선 없이 만든다.

## 코드

```html
<section data-bg="#282c20" data-fg="#f2efe6">1장</section>
<section data-bg="#c9c3a8" data-fg="#1d1f18">2장</section>
<section data-bg="#f2efe6" data-fg="#1d1f18">3장</section>
```

```css
:root {
  --page-bg: #ffffff;
  --page-fg: #111111;
}
body {
  background: var(--page-bg);
  color: var(--page-fg);
  transition: background-color 0.7s ease, color 0.7s ease;
}
section[data-bg] { min-height: 100vh; }
@media (prefers-reduced-motion: reduce) {
  body { transition: none; }
}
```

```js
{
  const sections = document.querySelectorAll('[data-bg]');
  const root = document.documentElement;
  const apply = (s) => {
    root.style.setProperty('--page-bg', s.dataset.bg);
    if (s.dataset.fg) root.style.setProperty('--page-fg', s.dataset.fg);
  };
  if (sections[0]) apply(sections[0]);
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && apply(e.target)),
    { rootMargin: '-50% 0px -50% 0px' }
  );
  sections.forEach((s) => io.observe(s));
}
```

화면 가운데 가로줄을 지나는 섹션의 색으로 바뀐다.

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `data-bg` / `data-fg` | | | 섹션별 배경과 글자색. **쌍마다 `contrast.mjs`로 검사** |
| 전환 시간 | 0.7s | 0.4~1.2s | 길수록 부드럽다 |
| `rootMargin` | 가운데 줄 | | `-30% 0px -70% 0px`이면 화면 위쪽 30% 지점에서 바뀜 |

## 성능
섹션이 바뀔 때만 색 두 개가 바뀐다. 가볍다.

## 하지 말 것
- 섹션마다 완전히 다른 색 (3~4색 안에서 온도만 바꾼다)
- 섹션 안에 자기 배경색을 따로 칠하기 (전환이 안 보인다)
- 전환 중간색에서 글자가 안 읽히는 조합 (어두운 → 밝은 사이는 글자색도 같이 바뀐다)
