# word-highlight

- 종류: 스크롤 / 타이포
- 강도: 낮음
- 어울리는 스타일: editorial, grainy-gradient, swiss
- 의존성: 없음
- 참고: Passionfroot의 추천사 원리

큰 문장(추천사, 선언문)의 단어들이 스크롤에 맞춰 흐린 색에서 진한 색으로 하나씩 켜진다. 읽는 속도에 맞춰 문장이 완성되는 느낌. 페이지에 한두 문장만.

## 코드

```html
<blockquote class="word-hl" data-word-hl>
  처음엔 크리에이터 마케팅이 잘 됐지만 커지지 않았어요. 더 나은 방법이 있을 거라 생각했죠.
</blockquote>
```

```css
.word-hl {
  font: 400 clamp(28px, 4vw, 48px)/1.3 Georgia, "Noto Serif KR", serif;
  color: var(--hl-on, #111);
}
.word-hl .w {
  color: var(--hl-off, rgb(17 17 17 / 0.18));
  transition: color 0.25s ease;
}
.word-hl .w.on { color: inherit; }
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}
```

```js
{
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = [...document.querySelectorAll('[data-word-hl]')].map((el) => {
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    el.textContent = '';
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;
    el.append(sr);
    const words = text.split(' ').map((w, i) => {
      if (i) el.append(' ');
      const s = document.createElement('span');
      s.className = 'w';
      s.setAttribute('aria-hidden', 'true');
      s.textContent = w;
      el.append(s);
      return s;
    });
    return { el, words };
  });
  const update = () => {
    const vh = innerHeight;
    const atBottom = vh + scrollY >= document.documentElement.scrollHeight - 2;
    for (const { el, words } of items) {
      const start = vh * 0.85, end = vh * 0.3;
      const top = el.getBoundingClientRect().top;
      const t = reduce || (atBottom && top < vh) ? 1 : Math.min(1, Math.max(0, (start - top) / (start - end)));
      const lit = Math.round(t * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < lit));
    }
  };
  let queued = false;
  addEventListener('scroll', () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { update(); queued = false; });
  }, { passive: true });
  update();
}
```

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--hl-off` | 18% 검정 | 10~30% | 꺼진 단어. 너무 낮으면 처음에 문장이 안 보인다 |
| `start` / `end` | 0.85 / 0.3 | | 문장 윗부분이 화면 85% 지점에서 켜지기 시작해 30% 지점에서 다 켜짐 |

## 성능
스크롤마다 클래스 토글만 한다. 단어가 수백 개면 느려질 수 있으니 문장 한두 개에만.

## 하지 말 것
- 본문 문단 전체에 쓰기 (읽기를 방해한다)
- 꺼진 단어 색을 너무 연하게 (모든 단어가 처음부터 읽힐 정도는 유지)
