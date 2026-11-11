# y2k-chrome

2000년 전후의 디지털 낙관. 녹은 금속 같은 크롬 글자, 반짝이는 별, 은색과 형광색, 둥근 버블 버튼, 오래된 OS 창. 미래를 상상하던 과거의 미래다. 장난스럽고 빛난다.

**어울리는 곳:** 음악(팝, 일렉트로닉), 패션·주얼리, 게임·굿즈, Z세대 대상 브랜드, 행사 티저, 개인 사이트

**참고:** Poolsuite(오래된 OS 창, 레트로 컴퓨터), Red Antler, daisyUI의 synthwave·acid 테마 토큰

## 뻔한 버전 (이렇게 나오면 실패)
- 보라·분홍 그라데이션 + 반짝이 이모지 ✨ + 둥근 흰 카드 (Y2K 이름만 붙인 템플릿)
- 크롬 효과 없이 그냥 은색 단색 글자
- 2020년대 SaaS 레이아웃에 장식만 얹기

## 레이아웃
- 화면 가운데 큰 크롬 로고나 제목이 주인공. 주변에 별, 원, 궤도선이 떠 있다
- 오래된 OS 창(제목 막대 + 닫기 버튼)을 정보 상자로 쓴다. 여러 창이 살짝 겹친다
- 정보 칸은 작고 빽빽하게, 굵은 테두리 2px
- 스크롤하면 창이나 스티커가 하나씩 튀어나온다

## 타이포
- 제목: 넓거나 둥근 디스플레이 (Michroma, Audiowide, Orbitron, Monoton, Rubik Bubbles / 한글 Orbit, 비트로코어체)
- 본문: 작은 그로테스크나 모노 (Space Grotesk, VT323는 라벨에만)
- 크롬 글자는 제목 한 줄에만. 크롬 본문은 읽을 수 없다

## 색
- 은색 계열(`#e8ecf2` → `#9aa3b0` → `#ffffff`) + 형광 하나(라임 `#c6ff00`, 분홍 `#ff3ecf`, 하늘 `#3ad7ff` 중 하나나 둘)
- 바탕: 은빛 회색, 하늘색 하늘, 또는 짙은 남보라 `#14102a`
- 형광은 버튼, 별, 밑줄에만

## 질감
크롬 글자는 그라데이션을 글자에 오려 넣고 테두리와 그림자를 겹친다.

```css
.chrome {
  background: linear-gradient(180deg, #ffffff 0%, #c9d1dc 38%, #5d6673 50%, #e8ecf2 56%, #ffffff 70%, #9aa3b0 100%);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  -webkit-text-stroke: 1px rgb(255 255 255 / 0.6);
  filter: drop-shadow(0 2px 0 #3a3f48) drop-shadow(0 8px 18px rgb(0 0 0 / 0.35));
}
```
- 가운데 어두운 줄(50% 근처)이 금속 반사의 핵심이다. 그 줄의 위치를 바꾸면 금속 느낌이 달라진다
- 버블 버튼: 위쪽 흰 하이라이트 + 아래쪽 진한 그라데이션 + 알약 모양
- 별: 네 갈래 반짝이 SVG, 크기 셋

### 비슷한 스타일과 구별
- **사이버펑크:** 어둡고 위험하고 글리치. Y2K는 밝고 낙관적이다
- **레트로 픽셀:** 8비트 도트. Y2K는 매끈한 3D 금속과 광택

## 수치 토큰
값은 출발점이다. 구도 스케치의 기준 수치로 옮겨 적고, 비율을 지키며 조정한다. 색과 글꼴은 system-designer가 정한 것을 쓴다.

```css
:root {
  --max: 1280px; --margin: clamp(16px, 4vw, 56px); --gap: clamp(12px, 2vw, 24px);
  /* 크롬: 금속 반사 그라데이션 */
  --chrome: linear-gradient(180deg, #ffffff 0%, #c9d1dc 38%, #5d6673 50%, #e8ecf2 56%, #ffffff 70%, #9aa3b0 100%);
  --neon: #c6ff00; --neon-2: #ff3ecf;
  /* 모양: 버블 버튼, OS 창 */
  --r-pill: 999px; --r-win: 10px; --border: 2px solid #14102a;
  --bubble: inset 0 2px 0 rgb(255 255 255 / 0.8), inset 0 -6px 12px rgb(0 0 0 / 0.25), 0 4px 0 #14102a;
  /* 글자 크기 */
  --fs-xs: 12px; --fs-sm: 14px; --fs-base: 16px; --fs-lg: 22px; --fs-hero: clamp(56px, 12vw, 190px);
  --fw-body: 400; --fw-head: 700; --lh-head: 0.9; --lh-body: 1.45; --ls-head: -0.01em;
  /* 움직임: 통통 튀고 반짝인다 */
  --ease-pop: cubic-bezier(0.34, 1.56, 0.64, 1); --dur-1: 160ms; --dur-2: 480ms; --twinkle: 2.4s;
}
```

**모범 섹션 코드:** `node SKILL_DIR/scripts/lib.mjs example y2k-chrome` (구현할 때 한 번)

## 어울리는 모션
- 크롬 글자 위로 빛 줄기가 지나간다 (배경 위치 애니메이션)
- 별이 반짝인다 (크기와 투명도, 서로 다른 지연)
- 카드나 스티커를 3D로 기울이고 반짝이 (`tilt-card`)
- 버블 버튼 누름 (`cushion-button`)
- 강도: 중간~높음

## 하지 말 것
- 크롬을 본문이나 작은 글자에
- 형광색 세 가지 이상
- 반짝이 이모지 ✨로 별 대신하기 (직접 그린 SVG를 쓴다)
- 대비 확인 없이 은색 바탕 위 흰 글자
