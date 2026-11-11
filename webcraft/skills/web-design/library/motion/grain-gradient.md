# grain-gradient

- 종류: 배경 / 질감
- 강도: 낮음 (움직임 없음)
- 어울리는 스타일: grainy-gradient, editorial, claymorphism
- 의존성: 없음 (CSS + SVG 노이즈)
- 참고: Craft, Ondo Collective, Passionfroot의 종이·필름 질감 원리

부드러운 색 번짐 위에 필름 같은 입자를 얹은 배경. 디지털 화면에 종이나 사진 같은 촉감을 준다. 히어로나 강조 섹션 하나에만.

## 코드

```html
<section class="grain-bg">
  <h2>따뜻한 오후의 커피</h2>
</section>
```

```css
.grain-bg {
  position: relative;
  isolation: isolate;
  padding: 120px 24px;
  background:
    radial-gradient(at 20% 20%, var(--g1, #ffb3c7), transparent 55%),
    radial-gradient(at 80% 30%, var(--g2, #a5b4fc), transparent 55%),
    radial-gradient(at 50% 90%, var(--g3, #fde68a), transparent 60%),
    var(--g-base, #f6f1ea);
}
.grain-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: var(--grain, 0.22);
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

## 조절값
| 변수 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `--g1`~`--g3` | 분홍, 연보라, 노랑 | | 팔레트에서 2~3색. 서로 명도가 비슷해야 탁해지지 않는다 |
| `--g-base` | 미색 | | 바탕색 |
| `--grain` | 0.22 | 0.08~0.35 | 입자 진하기. 어두운 배경이면 `mix-blend-mode: screen`으로 바꾸고 낮게 |
| `baseFrequency` | 0.9 | 0.6~1.2 | 클수록 입자가 곱다 |
| 번짐 위치 `at x% y%` | | | 제목 뒤는 비우고 가장자리에 색을 둔다 |

## 성능
정적인 배경이라 가볍다. 노이즈 SVG는 한 번 그려 타일로 반복된다. 움직이게 하고 싶으면 색 번짐 위치만 아주 느리게(20초 이상) 바꾼다.

## 하지 말 것
- 모든 섹션에 깔기 (지저분해진다)
- 입자를 너무 진하게 해서 글자 가장자리가 지저분해 보이게 하기
- 글자 대비는 번짐의 가장 진한 색 기준으로 확인
