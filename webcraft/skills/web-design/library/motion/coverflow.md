# coverflow

- 종류: 갤러리 / 3D
- 강도: 중간
- 어울리는 스타일: immersive-3d, y2k-chrome, retro, maximalism
- 의존성: 없음
- 참고: Originkit Coverflow Gallery의 원리 (가운데 한 장은 정면, 양옆은 비스듬히 겹침). 코드는 새로 썼다

이미지가 가로로 늘어서고 가운데 한 장만 정면을 본다. 양옆 장은 안쪽으로 돌아서 겹친다. 바탕은 브라우저의 가로 스크롤이라 손가락으로 밀기, 트랙패드, 키보드가 그대로 된다. 앨범, 작품, 메뉴, 상품 몇 개를 고르게 할 때.

## 코드

```html
<div class="cf">
  <ul class="cf-track" tabindex="0" aria-label="작품 목록">
    <li class="cf-item"><img src="…" alt="…"></li>
    <li class="cf-item"><img src="…" alt="…"></li>
    <li class="cf-item"><img src="…" alt="…"></li>
  </ul>
  <button class="cf-prev" type="button" aria-label="이전">←</button>
  <button class="cf-next" type="button" aria-label="다음">→</button>
</div>
```

```css
.cf-track {
  position: relative;
  display: flex;
  margin: 0;
  padding: 48px calc(50% - var(--cf-w, 280px) / 2);
  list-style: none;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.cf-item {
  flex: 0 0 var(--cf-w, 280px);
  scroll-snap-align: center;
  transform:
    perspective(var(--cf-depth, 1100px))
    translateX(calc(var(--o, 0) * var(--cf-overlap, -58%)))
    translateZ(calc(var(--a, 0) * var(--cf-push, -160px)))
    rotateY(calc(var(--r, 0) * var(--cf-turn, -52deg)));
}
.cf-item img {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 6px;
}
```

```js
{
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('.cf').forEach((cf) => {
    const track = cf.querySelector('.cf-track');
    const items = [...track.children];
    const step = () => (items[1] ? items[1].offsetLeft - items[0].offsetLeft : track.clientWidth);
    const go = (dir) => track.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' });
    cf.querySelector('.cf-prev').addEventListener('click', () => go(-1));
    cf.querySelector('.cf-next').addEventListener('click', () => go(1));
    if (reduce) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = track.scrollLeft + track.clientWidth / 2;
      const w = step();
      for (const it of items) {
        const o = Math.max(-3, Math.min(3, (it.offsetLeft + it.offsetWidth / 2 - mid) / w));
        it.style.setProperty('--o', o.toFixed(3));
        it.style.setProperty('--a', Math.min(1, Math.abs(o)).toFixed(3));
        it.style.setProperty('--r', Math.max(-1, Math.min(1, o)).toFixed(3));
        it.style.zIndex = String(100 - Math.round(Math.abs(o) * 10));
      }
    };
    track.addEventListener('scroll', () => { raf ||= requestAnimationFrame(update); }, { passive: true });
    addEventListener('resize', update);
    update();
  });
}
```

버튼 위치와 모양은 사이트에 맞게 정한다. 모션 줄이기 설정이면 평평한 가로 스냅 목록이 된다.

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--cf-w` | 280px | 180~420px | 한 장 너비 |
| `--cf-turn` | -52deg | -35~-70deg | 옆 장이 돌아가는 각도 |
| `--cf-overlap` | -58% | -35~-75% | 옆 장이 가운데로 당겨져 겹치는 정도 |
| `--cf-push` | -160px | -80~-260px | 옆 장이 뒤로 물러나는 깊이 |
| `--cf-depth` | 1100px | 700~1600px | 원근 (작을수록 과장된다) |

## 성능
장마다 `transform` 하나. 스크롤 한 번에 한 프레임만 계산한다. 이미지는 `loading="lazy"`가 아니어도 되지만 장 수는 12장 안쪽으로.

## 하지 말 것
- 글이 많은 카드 (비스듬히 돌면 못 읽는다). 사진, 표지, 큰 숫자 하나
- 3장 이하 (돌 장이 없어 어색하다)
- 자동으로 넘기기
