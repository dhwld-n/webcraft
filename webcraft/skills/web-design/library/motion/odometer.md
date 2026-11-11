# odometer

- 종류: 숫자 / 스크롤
- 강도: 낮음
- 어울리는 스타일: dark-tech, bento-grid, swiss
- 의존성: 없음
- 참고: ObsidianUI 대시보드 지표의 자릿수별 회전 원리

숫자가 화면에 들어오면 자릿수마다 0~9가 굴러가며 목표 값에 멈춘다. 지표, 가격, 사용자 수에.

## 코드

```html
<p>누적 사용자 <strong class="odo" data-odo="128450">128,450</strong>명</p>
```

```css
.odo {
  display: inline-flex;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}
.odo .d {
  display: inline-block;
  height: 1em;
  overflow: hidden;
}
.odo .col {
  display: flex;
  flex-direction: column;
  transition: transform var(--odo-dur, 1.4s) cubic-bezier(0.16, 1, 0.3, 1);
}
.odo .col > span { height: 1em; line-height: 1; }
```

```js
{
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-odo]').forEach((el) => {
    const text = new Intl.NumberFormat(el.dataset.odoLocale || 'ko-KR').format(Number(el.dataset.odo));
    if (reduce) { el.textContent = text; return; }
    el.textContent = '';
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;
    el.append(sr);
    const cols = [];
    for (const ch of text) {
      if (!/\d/.test(ch)) {
        const s = document.createElement('span');
        s.setAttribute('aria-hidden', 'true');
        s.textContent = ch;
        el.append(s);
        continue;
      }
      const d = document.createElement('span');
      d.className = 'd';
      d.setAttribute('aria-hidden', 'true');
      const col = document.createElement('span');
      col.className = 'col';
      for (let i = 0; i < 20; i++) {
        const s = document.createElement('span');
        s.textContent = i % 10;
        col.append(s);
      }
      d.append(col);
      el.append(d);
      cols.push([col, 10 + Number(ch)]);
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      cols.forEach(([col, idx], i) => {
        col.style.transitionDelay = `${i * 60}ms`;
        col.style.transform = `translateY(-${idx}em)`;
      });
      io.disconnect();
    }, { threshold: 0.5 });
    io.observe(el);
  });
}
```

`.sr-only` 스타일은 word-highlight 레시피의 것을 쓴다 (스크린 리더용 숨김 텍스트).

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `data-odo` | | | 목표 숫자 |
| `data-odo-locale` | ko-KR | | 천 단위 구분 방식 |
| `--odo-dur` | 1.4s | 0.8~2.4s | 구르는 시간 |
| 자릿수 간격 | 60ms | 0~120ms | 왼쪽부터 차례로 멈추는 느낌 |

## 성능
자릿수마다 `transform` 하나. 가볍다.

## 하지 말 것
- 한 화면에 카운터 4개 이상 (산만하다)
- 소수점 많은 숫자 (정수, 또는 소수 한 자리까지)
- 서체가 숫자 폭이 일정하지 않으면 흔들린다. `tabular-nums`를 지원하는 서체로
