# glass-refraction

- 종류: 재질
- 강도: 낮음~중간
- 어울리는 스타일: liquid-glass
- 의존성: 없음 (SVG 필터). 굴절은 크롬 계열(Chrome, Edge, Whale, Samsung Internet)에서만 보이고, 사파리와 파이어폭스는 `.glass`의 흐림과 테두리로 보인다
- 참고: 애플 리퀴드 글래스의 렌즈 가장자리 원리

유리판 가장자리에서 뒤 장면이 렌즈처럼 휜다. 가운데는 그대로 비치고, 가장자리 띠에서만 뒤가 밀려 보인다. 판 크기에 맞춘 변위 지도(가장자리는 바깥 방향 색, 가운데는 중립 회색)를 만들어 `backdrop-filter: url(#…)`로 건다. `liquid-glass` 카드의 `.glass` 질감 위에 얹는다.

## 코드

```html
<div class="glass" data-refract>...</div>
```

```js
{
  // 크롬 계열만 backdrop-filter의 SVG 필터를 그린다. 나머지는 CSS의 흐림과 테두리 그대로 둔다
  const chromium = navigator.userAgentData?.brands?.some((b) => b.brand === 'Chromium');
  const els = document.querySelectorAll('[data-refract]');
  if (chromium && els.length) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.cssText = 'position:absolute;width:0;height:0';
    document.body.append(svg);

    // 변위 지도: 빨강은 가로, 초록은 세로 방향. 가운데 둥근 회색(128)은 변위 0
    const map = (w, h, r, edge) => 'data:image/svg+xml,' + encodeURIComponent(
      `<svg xmlns="${NS}" width="${w}" height="${h}"><defs>` +
      `<linearGradient id="x"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#f00"/></linearGradient>` +
      `<linearGradient id="y" x2="0" y2="1"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#0f0"/></linearGradient>` +
      `<filter id="b"><feGaussianBlur stdDeviation="${edge / 2}"/></filter></defs>` +
      `<rect width="${w}" height="${h}" fill="url(#x)"/>` +
      `<rect width="${w}" height="${h}" fill="url(#y)" style="mix-blend-mode:screen"/>` +
      `<rect x="${edge}" y="${edge}" width="${w - edge * 2}" height="${h - edge * 2}" rx="${Math.max(0, r - edge)}" fill="rgb(128,128,0)" filter="url(#b)"/></svg>`);

    els.forEach((el, i) => {
      const id = `glass-refract-${i}`;
      const f = document.createElementNS(NS, 'filter');
      f.id = id;
      f.setAttribute('filterUnits', 'userSpaceOnUse');
      f.setAttribute('color-interpolation-filters', 'sRGB');
      f.innerHTML = '<feImage result="map" preserveAspectRatio="none"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G" result="bent"/>' +
        '<feGaussianBlur in="bent" result="soft"/>' +
        '<feColorMatrix in="soft" type="saturate" values="1.4"/>';
      svg.append(f);
      const [img, disp, blur] = f.children;

      const draw = () => {
        const w = Math.round(el.offsetWidth), h = Math.round(el.offsetHeight);
        if (!w || !h) return;
        const cs = getComputedStyle(el);
        const r = Math.min(parseFloat(cs.borderTopLeftRadius) || 0, w / 2, h / 2);
        const edge = Math.min(parseFloat(cs.getPropertyValue('--refract-edge')) || 22, h / 4); // 낮은 판은 띠를 줄인다
        for (const n of [f, img]) { n.setAttribute('x', 0); n.setAttribute('y', 0); n.setAttribute('width', w); n.setAttribute('height', h); }
        img.setAttribute('href', map(w, h, r, edge));
        disp.setAttribute('scale', parseFloat(cs.getPropertyValue('--refract-scale')) || 50);
        blur.setAttribute('stdDeviation', parseFloat(cs.getPropertyValue('--refract-blur')) || 1.5);
      };
      draw();
      new ResizeObserver(draw).observe(el);
      el.style.webkitBackdropFilter = el.style.backdropFilter = `url(#${id})`;
    });
  }
}
```

## 조절값
| 변수 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--refract-scale` | 50 | 20~90 | 가장자리에서 뒤가 밀리는 세기. 클수록 두꺼운 유리 |
| `--refract-edge` | 22px | 12~40px | 휘는 띠의 폭. 판 높이의 1/4을 넘지 않게 자동으로 줄어든다 |
| `--refract-blur` | 1.5 | 0~4 | 휜 뒤의 흐림. 0이면 맑은 유리, 크면 젖빛 |

값은 판에 CSS 변수로 준다: `.glass { --refract-scale: 60; --refract-edge: 18px; }`. 바꾼 뒤에는 새로고침하거나 판 크기가 바뀌어야 반영된다.

## 하지 말 것
- 화면에 3개 넘게 (판마다 뒤 화면을 매 프레임 다시 그린다)
- 아주 큰 판에 (변위 지도가 커져 무겁다. 히어로 전체를 덮는 판 금지)
- 굴절만 믿고 `.glass`의 흐림과 테두리를 빼기 (사파리와 파이어폭스에서는 그게 전부다)
- 글자가 많은 판에 세게 (가장자리 글자 뒤가 일렁여 읽기 힘들다. 글자는 가장자리 띠 안쪽에 둔다)
