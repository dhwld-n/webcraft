# parallax-layers

- 종류: 스크롤
- 강도: 낮음~중간
- 어울리는 스타일: editorial, collage, surreal, bohemian, liquid-glass, immersive-3d, victorian
- 의존성: 없음 (CSS 스크롤 연동 애니메이션, 안 되는 브라우저는 JS)
- 참고: 사진 액자가 스크롤에 맞춰 천천히 움직이는 에디토리얼 사이트들, 겹친 콜라주 조각이 서로 다른 속도로 지나가는 사이트들

스크롤할 때 겹친 조각들이 서로 다른 속도로 움직여 깊이가 생긴다. 사진은 액자 안에서 천천히 밀리고, 스티커·오린 사진 같은 조각은 앞으로 빨리 지나간다. `data-speed`로 조각마다 속도를 준다.

## 코드

```html
<section class="px-scene">
  <figure class="px-frame"><img data-speed="-0.15" src="photo.webp" alt="..."></figure>
  <img class="px-cut" data-speed="0.35" src="cutout.webp" alt="">
  <h2 data-speed="0.1">제목</h2>
</section>
```

```css
.px-frame { overflow: hidden; }
.px-frame img { display: block; width: 100%; height: 120%; object-fit: cover; }  /* 움직일 여유 20% */

/* 1순위: CSS만으로. 요소가 화면을 지나는 동안 --speed만큼 움직인다 */
@supports (animation-timeline: view()) {
  [data-speed] {
    animation: px-move linear both;
    animation-timeline: view();
    animation-range: cover 0% cover 100%;
  }
  @keyframes px-move {
    from { translate: 0 calc(var(--speed, 0) * -40vh); }
    to   { translate: 0 calc(var(--speed, 0) *  40vh); }
  }
}
@media (prefers-reduced-motion: reduce) {
  [data-speed] { animation: none !important; translate: none !important; }
}
```

```js
{
  const els = [...document.querySelectorAll('[data-speed]')];
  els.forEach((el) => el.style.setProperty('--speed', -parseFloat(el.dataset.speed) || 0));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // 2순위: 스크롤 연동 애니메이션이 없는 브라우저 (현재 Firefox 일부, 오래된 Safari)
  if (!CSS.supports('animation-timeline: view()') && !reduce && els.length) {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = innerHeight;
      for (const el of els) {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;               // 화면 밖은 건너뛴다
        const p = (r.top + r.height / 2 - vh / 2) / vh;         // 가운데 0, 위 -1, 아래 +1
        el.style.translate = `0 ${-p * parseFloat(el.dataset.speed) * 40}vh`;
      }
    };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
    addEventListener('resize', update);
    update();
  }
}
```

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `data-speed` | 0 | -0.3~0.5 | 0은 그대로, 음수는 더 느리게(뒤에 있는 느낌), 양수는 더 빠르게(앞에 있는 느낌) |
| 사진 높이 | 120% | 110~140% | 액자 안 사진이 움직일 여유. speed가 크면 키운다 |
| 이동 폭 | 40vh | 20~60vh | 한 화면 지나는 동안 최대 이동 |

층 나누기 출발값: 배경 사진 -0.15, 제목 0.1, 앞 조각(스티커, 오린 사진) 0.3~0.5. 한 장면에 층 2~3개.

## 성능
CSS 쪽은 브라우저가 스크롤 스레드에서 처리해 가볍다. JS 쪽은 `translate`만 바꾸고 스크롤 한 번에 한 프레임만 계산한다. 화면에 움직이는 요소 10개 이하.

## 하지 말 것
- 페이지의 모든 요소에 속도 주기 (멀미가 난다. 장면 한두 곳만)
- 글 문단에 패럴랙스 (읽는 중에 줄이 미끄러진다)
- 스크롤을 가로채서 느리게 만들기 (이 레시피는 스크롤 속도를 바꾸지 않는다)
