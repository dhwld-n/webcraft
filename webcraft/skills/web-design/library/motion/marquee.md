# marquee

- 종류: 타이포 / 반복
- 강도: 중간
- 어울리는 스타일: kinetic-type, maximalism, neo-brutalism, y2k-chrome
- 의존성: 없음
- 참고: Lando Norris, Componentry의 화면보다 큰 글자 띠 원리

글자 띠가 끊김 없이 옆으로 흐른다. 섹션 사이 구분선, 고객 로고 줄, 슬로건 띠에. 마우스를 올리면 멈춘다.

## 코드

```html
<div class="marquee" data-marquee data-speed="80">
  <div class="marquee-track">
    <span>FRESH ROAST · DAILY BREW · SLOW COFFEE ·</span>
  </div>
</div>
```

```css
.marquee {
  overflow: hidden;
  font: 800 clamp(48px, 10vw, 140px)/1 system-ui, sans-serif;
  text-transform: uppercase;
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee var(--mq-dur, 20s) linear infinite;
}
.marquee-track > * {
  flex: none;
  padding-right: var(--mq-gap, 0.5em);
  white-space: nowrap;
}
.marquee[data-marquee="reverse"] .marquee-track { animation-direction: reverse; }
.marquee:hover .marquee-track { animation-play-state: paused; }
.marquee.outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--mq-stroke, currentColor);
}
@keyframes marquee { to { transform: translateX(-50%); } }
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}
```

```js
{
  document.querySelectorAll('[data-marquee]').forEach((el) => {
    const track = el.querySelector('.marquee-track');
    const unit = track.firstElementChild;
    for (let i = 0; i < 20 && track.scrollWidth < el.clientWidth; i++) {
      const c = unit.cloneNode(true);
      c.setAttribute('aria-hidden', 'true');
      track.append(c);
    }
    [...track.children].forEach((c) => {
      const k = c.cloneNode(true);
      k.setAttribute('aria-hidden', 'true');
      track.append(k);
    });
    const speed = Number(el.dataset.speed) || 80;
    track.style.setProperty('--mq-dur', `${track.scrollWidth / 2 / speed}s`);
  });
}
```

반 바퀴 길이가 화면보다 길어지도록 내용을 복제한 뒤, 그 전체를 한 번 더 복제해서 `-50%`만큼 움직이면 이음매 없이 반복된다. 복제본은 스크린 리더가 읽지 않게 `aria-hidden`을 붙인다.

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `data-speed` | 80 | 30~200 | 초당 픽셀. 글자가 클수록 느리게 |
| `data-marquee="reverse"` | | | 반대 방향. 위아래 두 줄을 서로 반대로 흐르게 하면 좋다 |
| `.outline` | | | 외곽선 글자 |
| `--mq-gap` | 0.5em | | 반복 사이 간격 |

## 성능
`transform` 하나만 움직인다. 가볍다.

## 하지 말 것
- 중요한 정보를 띠 안에만 두기 (움직이는 글은 읽기 어렵다)
- 한 화면에 띠 3개 이상
