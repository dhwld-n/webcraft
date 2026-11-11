# dock-magnify

- 종류: 커서 / 내비게이션
- 강도: 중간
- 어울리는 스타일: y2k-chrome, liquid-glass, claymorphism, futuristic
- 의존성: 없음
- 참고: Componentry magnetic-dock의 원리 (커서 가까운 아이콘일수록 커짐). 코드는 새로 썼다

아이콘이 한 줄로 놓인 바에서 커서가 가까운 아이콘일수록 커지고, 옆 아이콘이 밀려난다. 컴퓨터 화면 아래 독 같은 느낌. 바로가기 5~8개, 앱이나 도구 모음, 장난스러운 포트폴리오 메뉴에.

## 코드

```html
<nav class="dock" aria-label="바로가기">
  <a class="dock-item" href="#work"><img src="…" alt="작업"></a>
  <a class="dock-item" href="#about"><img src="…" alt="소개"></a>
  <a class="dock-item" href="#contact"><img src="…" alt="연락"></a>
</nav>
```

```css
.dock {
  --dock-size: 52px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  width: max-content;
  height: calc(var(--dock-size) + 20px);
  margin-inline: auto;
  padding: 10px 14px;
  border-radius: 22px;
}
.dock-item {
  flex: none;
  width: calc(var(--dock-size) * var(--s, 1));
  height: calc(var(--dock-size) * var(--s, 1));
  border-radius: 28%;
  transition: width 0.12s ease-out, height 0.12s ease-out;
}
.dock-item img { width: 100%; height: 100%; display: block; }
.dock-item:focus-visible { --s: 1.3; outline: 2px solid currentColor; outline-offset: 4px; }
```

```js
{
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (fine && !reduce) document.querySelectorAll('.dock').forEach((dock) => {
    const items = [...dock.querySelectorAll('.dock-item')];
    const max = Number(dock.dataset.dockMax || 1.7);
    const range = Number(dock.dataset.dockRange || 150);
    let rest = [];
    const measure = () => {
      const d = dock.getBoundingClientRect();
      rest = items.map((it) => {
        const r = it.getBoundingClientRect();
        return r.left + r.width / 2 - (d.left + d.width / 2);
      });
    };
    measure();
    addEventListener('resize', measure);
    dock.addEventListener('pointermove', (e) => {
      const d = dock.getBoundingClientRect();
      const x = e.clientX - (d.left + d.width / 2);
      items.forEach((it, i) => {
        const t = Math.max(0, 1 - Math.abs(x - rest[i]) / range);
        it.style.setProperty('--s', (1 + (max - 1) * (0.5 - 0.5 * Math.cos(Math.PI * t))).toFixed(3));
      });
    });
    dock.addEventListener('pointerleave', () => items.forEach((it) => it.style.removeProperty('--s')));
  });
}
```

아이콘 크기를 정지 상태 기준으로 재 두고 계산해서, 커지는 동안 위치가 흔들리지 않는다. 터치 화면과 모션 줄이기 설정에서는 그냥 가만있는 아이콘 줄이다.

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--dock-size` | 52px | 40~64px | 쉬고 있을 때 아이콘 크기 |
| `data-dock-max` | 1.7 | 1.3~2 | 커서 바로 아래 아이콘의 최대 배율 |
| `data-dock-range` | 150 | 100~220 | 커지는 영향이 미치는 거리(px) |

## 성능
아이콘 너비가 바뀌어 레이아웃을 다시 계산한다. 아이콘 8개 이하면 문제없다. 그 이상이면 쓰지 않는다.

## 하지 말 것
- 이름 없는 아이콘만 (`alt`나 `aria-label`로 이름을 준다)
- 본문 사이의 일반 메뉴 (장난감 같은 느낌이 맞는 사이트에만)
- 아이콘 9개 이상
