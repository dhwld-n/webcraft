# text-reel

- 종류: 타이포 / 반복
- 강도: 낮음
- 어울리는 스타일: kinetic-type, editorial, minimalism, swiss
- 의존성: 없음
- 참고: ObsidianUI Text reel의 원리 (단어가 릴처럼 굴러 바뀜). 코드는 새로 썼다

문장 속 단어 하나가 릴처럼 위로 굴러 다음 단어로 바뀐다. 칸 너비도 단어 길이에 맞춰 따라 줄고 늘어서 문장이 어색하게 벌어지지 않는다. 히어로 문구에서 "무엇을 하는 곳인지" 여러 개를 한 줄에 보여 줄 때.

## 코드

```html
<h1>우리는 <span class="reel" data-reel="빵을|커피를|하루를">빵을</span> 굽습니다</h1>
```

```css
.reel-box {
  display: inline-block;
  height: var(--reel-h, 1.15em);
  overflow: hidden;
  vertical-align: bottom;
  transition: width var(--reel-dur, 0.7s) cubic-bezier(0.65, 0, 0.35, 1);
}
.reel-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: transform var(--reel-dur, 0.7s) cubic-bezier(0.65, 0, 0.35, 1);
}
.reel-col > span {
  display: block;
  width: max-content;
  height: var(--reel-h, 1.15em);
  line-height: var(--reel-h, 1.15em);
  white-space: nowrap;
}
```

```js
{
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-reel]').forEach(async (el) => {
    const words = el.dataset.reel.split('|');
    if (reduce || words.length < 2) return;
    await document.fonts.ready;
    const sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = words[0];
    const box = document.createElement('span');
    box.className = 'reel-box';
    box.setAttribute('aria-hidden', 'true');
    const col = document.createElement('span');
    col.className = 'reel-col';
    for (const w of [...words, words[0]]) {
      const s = document.createElement('span');
      s.textContent = w;
      col.append(s);
    }
    box.append(col);
    el.replaceChildren(sr, box);
    const rows = [...col.children];
    const rowH = rows[0].offsetHeight;
    let i = 0;
    let left = Number(el.dataset.reelLoops || 2) * words.length;
    const fit = () => { box.style.width = `${rows[i].offsetWidth}px`; };
    fit();
    const timer = setInterval(() => {
      if (document.hidden) return;
      i += 1;
      left -= 1;
      col.style.transition = '';
      col.style.transform = `translateY(-${i * rowH}px)`;
      fit();
      if (i === words.length) {
        col.addEventListener('transitionend', () => {
          col.style.transition = 'none';
          col.style.transform = 'translateY(0)';
          i = 0;
        }, { once: true });
      }
      if (left <= 0) clearInterval(timer);
    }, Number(el.dataset.reelEvery || 2400));
  });
}
```

`.sr-only` 스타일은 word-highlight 레시피의 것을 쓴다. 스크린 리더는 첫 단어만 읽는다.

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `data-reel` | | 2~5개 | `|`로 나눈 단어 |
| `data-reel-every` | 2400 | 1800~3500 | 단어가 바뀌는 간격(ms) |
| `data-reel-loops` | 2 | 1~3 | 몇 바퀴 돌고 첫 단어에서 멈출지 |
| `--reel-dur` | 0.7s | 0.5~0.9s | 굴러가는 시간 |
| `--reel-h` | 1.15em | 1.05~1.3em | 줄 높이. 제목의 `line-height`와 맞춘다 |

## 성능
`transform`과 칸 너비 하나. 몇 초에 한 번만 움직여서 가볍다.

## 하지 말 것
- 끝없이 돌리기. 정해진 바퀴만 돌고 멈춘다 (5초 넘게 움직이는 글은 멈출 수단이 필요하다)
- 단어 6개 이상, 단어 길이가 서너 배씩 차이 나는 조합
- 한 화면에 두 군데 이상
