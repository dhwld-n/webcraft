# gooey-blobs

- 종류: 리퀴드
- 강도: 높음
- 어울리는 스타일: liquid-glass, claymorphism, maximalism, y2k-chrome, grainy-gradient
- 의존성: 없음 (SVG 필터)

배경의 방울들이 천천히 떠다니다 닿으면 하나로 녹아 붙는다. 히어로 배경 하나에만 쓴다.

## 코드

```html
<div class="goo-wrap" aria-hidden="true">
  <svg width="0" height="0" style="position:absolute">
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="18" result="b" />
      <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -12" />
    </filter>
  </svg>
  <div class="goo">
    <i style="--s:220px;--x:20%;--y:30%;--d:14s"></i>
    <i style="--s:180px;--x:60%;--y:50%;--d:18s"></i>
    <i style="--s:140px;--x:40%;--y:70%;--d:11s"></i>
    <i style="--s:160px;--x:75%;--y:25%;--d:16s"></i>
  </div>
</div>
```

```css
.goo-wrap { position: absolute; inset: 0; overflow: hidden; z-index: -1; }
.goo { position: absolute; inset: 0; filter: url(#goo); }
.goo i {
  position: absolute;
  left: var(--x); top: var(--y);
  width: var(--s); height: var(--s);
  border-radius: 50%;
  background: var(--goo-color, #7f77dd);
  animation: goo-drift var(--d) ease-in-out infinite alternate;
}
.goo i:nth-child(2n) { animation-direction: alternate-reverse; }
@keyframes goo-drift {
  0%   { transform: translate(0, 0) scale(1); }
  50%  { transform: translate(var(--goo-range, 120px), calc(var(--goo-range, 120px) * -0.6)) scale(1.1); }
  100% { transform: translate(calc(var(--goo-range, 120px) * -0.8), calc(var(--goo-range, 120px) * 0.4)) scale(0.9); }
}
@media (prefers-reduced-motion: reduce) {
  .goo i { animation: none; }
}
@media (max-width: 640px) {
  .goo i { --s: 120px; }
}
```

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `stdDeviation` | 18 | 10~30 | 클수록 멀리서도 붙는다 |
| 행렬 마지막 두 값 | 28 -12 | | 경계 선명도. 첫 값을 키우면 더 날카로움 |
| `--goo-range` | 120px | 40~200px | 떠다니는 범위 |
| `--d` | 11~18s | 8~25s | 느릴수록 차분함 |
| `--goo-color` | 보라 | | 팔레트의 강조색. 방울마다 다른 색이면 섞인 경계가 탁해지니 한 색 권장 |

## 성능
SVG 블러 필터는 비싸다. 화면 전체가 아니라 히어로 영역 안에만 쓰고, 방울은 6개 이하. 저사양 휴대폰에서 끊기면 모바일에서 `animation: none`으로 고정한다. 더 무거운 버전(마우스 반응, 셰이더)이 필요하면 WebGL 메타볼로 다시 구현한다.

## 하지 말 것
- 글자 위에 겹치기 (블러가 글자를 먹는다. 필터 밖에 글자를 둔다)
- 섹션마다 반복
