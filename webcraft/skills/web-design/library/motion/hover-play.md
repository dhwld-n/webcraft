# hover-play

- 종류: 호버 / 커서
- 강도: 낮음~중간
- 어울리는 스타일: 거의 모두. 특히 editorial, collage, pop-art, maximalism, minimalism
- 의존성: 없음
- 참고: ilovecreatives(호버 100~200ms, 투명도·색만), daisyUI(1000ms `cubic-bezier(1, 0, 0, 1)` 기다렸다 확 바뀌는 호버), UI8(카드 뜨기 200ms), "스크롤·호버·클릭을 색다르게 쓰는 장난스러운 인터랙션" 모음 릴스

호버 효과 네 가지. 한 사이트에 **한두 가지만** 골라 같은 성격으로 통일한다.
- A. 목록 호버 이미지: 글자 목록에 올리면 커서 옆에 사진이 따라 나오고, 나머지 항목은 물러난다 (작업 목록, 메뉴, 기사)
- B. 선 그리기 링크: 밑줄이 왼쪽에서 그려지고, 나갈 때 오른쪽으로 빠진다
- C. 글자 바꿔 끼우기: 버튼 글자가 위로 빠지고 같은 글자가 아래에서 올라온다
- D. 기다렸다 확 바뀌는 면: 카드 바탕이 잠깐 가만히 있다가 끝에서 한 번에 채워진다

## 코드

```html
<!-- A -->
<ul class="hp-list" data-hover-image>
  <li><a href="#" data-img="photo-1.webp">작업 이름 하나</a></li>
  <li><a href="#" data-img="photo-2.webp">작업 이름 둘</a></li>
</ul>
<!-- B -->
<a class="hp-line" href="#">링크</a>
<!-- C -->
<a class="hp-swap" href="#"><span><i>시작하기</i></span></a>
<!-- D -->
<a class="hp-fill" href="#">카드 내용</a>
```

```css
/* A: 커서 옆 사진. 사진 요소는 JS가 하나 만든다 */
.hp-float {
  position: fixed; left: 0; top: 0; z-index: 50; width: var(--hp-img-w, 280px); aspect-ratio: 4 / 5; object-fit: cover;
  pointer-events: none; opacity: 0; scale: 0.9; rotate: -3deg;
  transition: opacity 200ms ease, scale 400ms var(--hp-ease), rotate 400ms var(--hp-ease);
}
.hp-float.is-on { opacity: 1; scale: 1; rotate: 0deg; }
.hp-list a { transition: opacity 150ms linear; }

/* B: 밑줄이 왼쪽에서 그려지고 오른쪽으로 빠진다 */
.hp-line {
  text-decoration: none;
  background: linear-gradient(currentColor 0 0) no-repeat right bottom / 0 1px;
  transition: background-size 350ms var(--hp-ease);
}

/* C: 글자 그림자로 만든 두 번째 줄이 아래에서 올라온다 (같은 글자를 두 번 쓰지 않는다) */
.hp-swap span { display: inline-block; overflow: hidden; height: 1.2em; line-height: 1.2em; vertical-align: bottom; }
.hp-swap i { display: block; font-style: normal; text-shadow: 0 1.2em currentColor; transition: translate 450ms cubic-bezier(0.65, 0, 0.35, 1); }

/* D: 1000ms 동안 기다렸다가 끝에서 확 채워진다 (daisyUI 실측 곡선) */
.hp-fill { background: linear-gradient(var(--hp-fill, currentColor) 0 0) no-repeat left bottom / 100% 0%; transition: background-size 1000ms cubic-bezier(1, 0, 0, 1), color 1000ms cubic-bezier(1, 0, 0, 1); }

:root { --hp-ease: cubic-bezier(0.23, 1, 0.32, 1); }

/* 진짜 마우스가 있을 때만 호버를 건다. 터치 화면에서 눌린 채로 남지 않게 */
@media (hover: hover) and (pointer: fine) {
  .hp-list:hover a:not(:hover) { opacity: 0.35; }
  .hp-line:hover { background-position: left bottom; background-size: 100% 1px; }
  .hp-swap:hover i { translate: 0 -1.2em; }
  .hp-fill:hover { background-size: 100% 100%; color: var(--hp-fill-text, #fff); }
}
/* 키보드도 같은 효과를 본다 */
.hp-line:focus-visible { background-position: left bottom; background-size: 100% 1px; }
.hp-swap:focus-visible i { translate: 0 -1.2em; }

@media (prefers-reduced-motion: reduce) {
  .hp-float, .hp-line, .hp-swap i, .hp-fill { transition-duration: 1ms; }
  .hp-float { rotate: 0deg; scale: 1; }
}
```

```js
{
  // A만 JS가 필요하다. 진짜 마우스가 있을 때만
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('[data-hover-image]').forEach((list) => {
      const img = Object.assign(document.createElement('img'), { className: 'hp-float', alt: '' });
      document.body.append(img);
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
      let x = 0, y = 0, tx = 0, ty = 0, raf;
      const follow = () => {
        x += (tx - x) * (reduce ? 1 : 0.18); y += (ty - y) * (reduce ? 1 : 0.18);   // 0.18: 살짝 늦게 따라온다
        img.style.translate = `${x + 24}px ${y - img.offsetHeight / 2}px`;
        raf = requestAnimationFrame(follow);
      };
      list.querySelectorAll('[data-img]').forEach((a) => {
        a.addEventListener('pointerenter', () => { img.src = a.dataset.img; img.classList.add('is-on'); });
      });
      list.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; });
      list.addEventListener('pointerenter', (e) => { x = tx = e.clientX; y = ty = e.clientY; follow(); });
      list.addEventListener('pointerleave', () => { img.classList.remove('is-on'); cancelAnimationFrame(raf); });
    });
  }
}
```

## 조절값
| 변수 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--hp-ease` | `cubic-bezier(0.23, 1, 0.32, 1)` | | 빨리 나와서 부드럽게 멈춘다 (Raycash 실측 220ms 곡선) |
| `--hp-img-w` | 280px | 180~400px | A의 사진 폭 |
| 따라오는 계수 | 0.18 | 0.08~0.4 | A에서 작을수록 사진이 늦게, 끈적하게 따라온다 |
| `--hp-fill` / `--hp-fill-text` | 글자색 / 흰색 | | D의 채우는 색과 채운 뒤 글자색 |

속도 기준 (실측): 투명도·색만 바뀌는 호버 100~200ms, 움직이는 호버 300~450ms, 일부러 느린 연출 1000ms.

## 하지 말 것
- 네 가지를 한 사이트에 다 쓰기 (호버마다 성격이 달라 산만하다)
- 모든 카드를 위로 띄우고 그림자 키우기 (가장 흔한 템플릿 호버다. UI8 키트의 기본값)
- 호버에만 정보 숨기기 (터치 화면에서는 볼 방법이 없다)
- A를 터치 화면에서 쓰기 (JS가 `pointer: fine`에서만 켠다)
