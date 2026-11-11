# clay-surface

- 종류: 재질 / 표면
- 강도: 낮음 (움직임 없음, 눌림만)
- 어울리는 스타일: claymorphism
- 의존성: 없음 (CSS만)
- 참고: gparkkii 블로그의 클레이모피즘 그림자 구성(바깥 물든 그림자 + 안쪽 아래 그늘 + 안쪽 위 하이라이트)을 색 변수로 정리

카드, 아이콘 타일, 알약 버튼, 토글에 점토 같은 통통한 표면을 입힌다. 색 변수 하나(`--clay-tint`)만 바꾸면 어느 파스텔 바탕에도 맞는다.

## 코드

```html
<div class="clay-scene">
  <article class="clay clay-card">
    <span class="clay clay-icon" aria-hidden="true">☀</span>
    <h3>오늘의 날씨</h3>
    <p>맑음, 24°C</p>
    <button class="clay clay-pill" type="button">자세히</button>
  </article>
  <label class="clay-toggle">
    <input type="checkbox" checked>
    <span class="clay clay-track"><span class="clay clay-knob"></span></span>
    알림 받기
  </label>
</div>
```

```css
.clay-scene {
  --clay-bg: #e9e4ff;
  --clay-face: #ffffff;
  --clay-tint: 126 104 230;
  --clay-ink: #2f2463;
  --clay-accent: #a8d8ff;
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: center;
  padding: 48px 24px;
  background: var(--clay-bg);
  color: var(--clay-ink);
  font-family: "Nunito", "NanumSquareRound", "Pretendard", system-ui, sans-serif;
}
.clay {
  background: var(--clay-face);
  box-shadow:
    0 24px 48px -12px rgb(var(--clay-tint) / 0.45),
    inset 0 -8px 16px rgb(var(--clay-tint) / 0.35),
    inset 0 10px 24px rgb(255 255 255 / 0.9);
}
.clay-card {
  width: min(100%, 280px);
  padding: 28px;
  border-radius: 28px;
}
.clay-card h3 { margin: 16px 0 4px; font-size: 20px; font-weight: 800; }
.clay-card p { margin: 0 0 20px; font-weight: 600; opacity: 0.8; }
.clay-icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 18px;
  font-size: 28px;
  background: #ffd9c7;
}
.clay-pill {
  border: 0;
  padding: 12px 24px;
  border-radius: 999px;
  font: inherit;
  font-weight: 800;
  color: var(--clay-ink);
  background: var(--clay-accent);
  cursor: pointer;
}
.clay-pill:active {
  box-shadow:
    0 8px 16px -8px rgb(var(--clay-tint) / 0.45),
    inset 0 8px 16px rgb(var(--clay-tint) / 0.35),
    inset 0 -4px 10px rgb(255 255 255 / 0.7);
}
.clay-pill:focus-visible { outline: 3px solid var(--clay-ink); outline-offset: 4px; }
.clay-toggle {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  cursor: pointer;
}
.clay-toggle input { position: absolute; opacity: 0; }
.clay-track {
  position: relative;
  width: 64px;
  height: 36px;
  border-radius: 999px;
  background: #ddd6ff;
  transition: background 0.25s ease;
}
.clay-knob {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.clay-toggle input:checked + .clay-track { background: var(--clay-accent); }
.clay-toggle input:checked + .clay-track .clay-knob { transform: translateX(28px); }
.clay-toggle input:focus-visible + .clay-track { outline: 3px solid var(--clay-ink); outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) {
  .clay-track, .clay-knob { transition: none; }
}
```

## 조절값
| 변수 | 기본 | 효과 |
|---|---|---|
| `--clay-bg` | 연보라 | 장면 바탕. 파스텔 하나 |
| `--clay-tint` | `126 104 230` | 그림자 물들이는 색 (RGB 숫자 세 개). 바탕보다 진한 같은 계열. 복숭아 바탕이면 `230 140 110` 정도 |
| `--clay-face` | 흰색 | 카드 면 |
| `--clay-ink` | 진한 보라 | 글자. 바탕과 4.5:1 이상 |
| `--clay-accent` | 하늘 | 버튼, 켜진 토글 |
| 바깥 그림자 `24px 48px -12px` | | 크게 하면 더 높이 떠 보인다. 작은 요소(아이콘, 손잡이)는 절반 크기로 |
| 안쪽 그림자 두 겹 | | 이 두 겹이 "통통함"을 만든다. 빼면 그냥 둥근 카드가 된다 |

## 성능
그림자만 쓰므로 가볍다. 다만 큰 그림자가 많은 요소에 겹치면 스크롤할 때 다시 그리는 비용이 늘어난다. 한 화면에 클레이 요소 10개 안팎.

## 하지 말 것
- 그림자에 검정 쓰기 (`--clay-tint`를 바탕 계열로)
- 표, 긴 본문, 작은 링크까지 클레이로
- `--clay-ink`를 파스텔로 (대비 실패)
