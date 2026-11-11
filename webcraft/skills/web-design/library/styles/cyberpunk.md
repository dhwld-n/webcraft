# cyberpunk

비 오는 밤의 네온 도시. 어둠 속에 형광 노랑, 분홍, 하늘색이 날카롭게 빛나고, 화면은 계기판처럼 칸과 숫자로 가득하다. 글리치와 스캔라인이 "고장 난 미래"를 말한다. 위험하고 빠르다.

**어울리는 곳:** 게임·e스포츠, 일렉트로닉 음악·클럽, 보안·해킹 행사, 테크 굿즈, SF 콘텐츠, 하드웨어

**참고:** Better Stack, Bricelab(어두운 실험실), daisyUI cyberpunk 테마 토큰(형광 노랑 바탕 `oklch(94.5% .179 104)` + 분홍 + 하늘 + 보라, 둥글기 0), synthwave 토큰

## 뻔한 버전 (이렇게 나오면 실패)
- 검정 바탕 + 보라·파랑 네온 그라데이션 + 둥근 카드 (그냥 어두운 SaaS)
- 모든 글자에 네온 글로우 (흐릿해서 아무것도 안 읽힌다)
- 글리치를 모든 곳에

## 레이아웃
- **계기판 구조.** 화면을 가는 선으로 칸칸이 나누고, 칸마다 번호·좌표·상태 같은 작은 라벨이 붙는다
- 모서리를 비스듬히 자른 판 (`clip-path`로 한 귀퉁이 45° 자르기)
- 큰 제목은 화면 폭을 가로지르고, 주변에 작은 데이터가 빽빽하다
- 형광 노랑 면을 크게 한 번 쓰면 강력하다 (daisyUI cyberpunk처럼 바탕 자체를 형광으로)

## 타이포
- 제목: 각지고 넓은 테크 서체 (Orbitron, Chakra Petch, Tomorrow, Michroma / 한글 Orbit, Do Hyeon)
- 라벨·숫자: 모노 (JetBrains Mono, VT323, Geist Mono). 대문자 영문 + 넓은 자간 0.12em
- 한글 본문은 단정한 고딕(Pretendard, IBM Plex Sans KR). 한글 라벨에는 자간을 넣지 않는다

## 색
- 바탕: 남색 밤 `#0a0a12` 또는 형광 노랑 `#f3ff47` (하나만)
- 네온: 형광 노랑 `#f3ff47`, 분홍 `#ff2a6d`, 하늘 `#05d9e8` 중 둘. 보라 `#7700ff`는 그림자에만
- 네온 글로우는 큰 제목과 선 몇 개에만. `text-shadow` 두 겹 (가까운 강한 빛 + 먼 약한 빛)

## 질감
- 스캔라인: 2~3px 간격 가로줄을 아주 옅게 덮는다
- 비스듬히 자른 모서리, 1px 네온 선, 작은 십자 표시(+)
- 노이즈와 색수차(빨강·하늘 글자 그림자를 1~2px 어긋나게)

```css
.cp-cut { clip-path: polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px)); }
.cp-scan { background-image: repeating-linear-gradient(0deg, rgb(255 255 255 / 0.04) 0 1px, transparent 1px 3px); }
.cp-neon { text-shadow: 0 0 4px currentColor, 0 0 24px color-mix(in srgb, currentColor 60%, transparent); }
```

### 비슷한 스타일과 구별
- **Y2K 크롬:** 밝은 낙관, 은색 금속, 둥근 버블. 사이버펑크는 어둡고 각지고 위험하다
- **다크테크:** 차분한 개발자 도구. 사이버펑크는 장르적이고 과장된다
- **퓨처리즘:** 깨끗하고 매끈한 미래. 사이버펑크는 더럽고 고장 난 미래

## 수치 토큰
값은 출발점이다. 구도 스케치의 기준 수치로 옮겨 적고, 비율을 지키며 조정한다. 색과 글꼴은 system-designer가 정한 것을 쓴다.

```css
:root {
  --max: 1440px; --margin: clamp(14px, 3vw, 40px); --gap: clamp(8px, 1.2vw, 16px);
  /* 네온 */
  --neon-1: #f3ff47; --neon-2: #ff2a6d; --neon-3: #05d9e8; --night: #0a0a12;
  /* 모양: 잘린 모서리, 가는 선 */
  --cut: 18px; --r: 0; --line: 1px solid color-mix(in srgb, var(--neon-3) 50%, transparent);
  /* 글자 크기 */
  --fs-xs: 11px; --fs-sm: 13px; --fs-base: 16px; --fs-lg: 24px; --fs-hero: clamp(56px, 11vw, 180px);
  --fw-body: 400; --fw-head: 800; --lh-head: 0.88; --lh-body: 1.5; --ls-head: 0.01em; --ls-label: 0.12em;
  /* 움직임: 빠르고 끊긴다 */
  --ease: steps(4, end); --ease-snap: cubic-bezier(0.7, 0, 0.2, 1); --dur-1: 90ms; --dur-2: 320ms;
}
```

**모범 섹션 코드:** `node SKILL_DIR/scripts/lib.mjs example cyberpunk` (구현할 때 한 번)

## 어울리는 모션
- 글자가 무작위 문자에서 제자리로 맞춰진다 (`scramble-text`)
- 짧은 글리치 한 번 (0.3초, 몇 초에 한 번. 모범 섹션 코드)
- 네트워크처럼 이어지는 점 (`particle-field`, 하늘색, link 120)
- 숫자 카운터 (`odometer`)
- 강도: 중간~높음. 계속 깜빡이는 것은 금지 (광과민성)

## 하지 말 것
- 초당 3번 넘게 번쩍이는 효과 (광과민성 발작 위험. 글리치는 몇 초에 한 번, 짧게)
- 네온 글로우를 본문에
- 둥근 모서리와 부드러운 그림자 (다른 스타일이 된다)
- 보라·파랑 그라데이션만으로 사이버펑크라고 하기
