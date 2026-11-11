# graffiti

골목 벽의 스프레이와 스티커. 굵게 번진 글자, 흘러내린 물감, 덧칠된 태그, 콘크리트와 철판, 형광 스프레이 색. 거칠고 크고 반항적이다. 모든 걸 다 뿌리면 읽을 수 없으니 **벽 하나에 큰 작품 하나**가 원칙이다.

**어울리는 곳:** 스트리트 패션, 힙합·랩, 스케이트·BMX, 스니커즈, 도시 축제, 청소년 문화 공간, 에너지 음료

**참고:** Monument(거친 글자 운동), Lando Norris(손으로 그린 서명과 낙서), daisyUI acid 테마 토큰(형광 자홍·주황·연두)

## 뻔한 버전 (이렇게 나오면 실패)
- 벽돌 벽 사진 배경 + 그라피티 글꼴 제목 + 평범한 카드 (배경만 골목)
- 모든 글자를 스프레이 글꼴로
- 무지개 스프레이를 화면 전체에

## 레이아웃
- **벽.** 섹션 하나가 벽 한 면. 큰 작품(제목) 하나 + 주변에 작은 태그, 스티커, 포스터
- 포스터를 붙인 듯 사각 종이가 겹치고 일부가 찢겼다
- 스티커 여러 장을 비뚤게 (팀 이름, 날짜, 가격)
- 정보는 스텐실(구멍 뚫린 판 글자)이나 손으로 쓴 마커로

## 타이포
- 큰 작품: 굵고 통통하거나 날카로운 디스플레이 (Permanent Marker, Bangers, Rubik Spray Paint 대안으로 Rampart One, Dela Gothic One / 한글 Black Han Sans, 독도체, 나눔손글씨 붓)
- 스텐실 정보: 굵은 산세리프 대문자에 끊긴 부분 (Archivo Black, Bungee)
- 본문: 평범한 굵은 고딕 (Pretendard 600)

## 색
- 벽: 콘크리트 회색 `#8d8d88`, 짙은 아스팔트 `#1e1f22`, 또는 흰 페인트 벽 `#efefea`
- 스프레이: 형광 2~3색 (자홍 `#ff2bd6`, 라임 `#b6ff1a`, 주황 `#ff7a00`, 하늘 `#22c3ff`)
- 윤곽선은 검정이나 흰색 두껍게

## 질감
- 스프레이 번짐: 글자에 같은 색 `text-shadow` 여러 겹 흐리게 (0 0 2px, 0 0 8px)
- 흘러내림: 글자 아래로 짧은 세로 줄 (`::after`, 그라데이션 끝이 둥근 막대)
- 콘크리트 그레인 (`grain-gradient`, 진하게 0.2)
- 스티커: 흰 테두리 + 둥근 모서리 + 살짝 그림자

### 비슷한 스타일과 구별
- **팝아트:** 깨끗한 원색 면과 망점, 만화 화법. 그라피티는 거칠고 번진다
- **네오 브루탈리즘:** 정돈된 굵은 테두리. 그라피티는 스프레이와 낙서

## 수치 토큰
값은 출발점이다. 구도 스케치의 기준 수치로 옮겨 적고, 비율을 지키며 조정한다. 색과 글꼴은 system-designer가 정한 것을 쓴다.

```css
:root {
  --max: 1440px; --margin: clamp(12px, 3vw, 40px); --gap: clamp(10px, 1.6vw, 20px);
  --wall: #1e1f22; --spray-1: #ff2bd6; --spray-2: #b6ff1a; --spray-3: #ff7a00; --outline: #0b0b0b;
  /* 스프레이 */
  --spray-blur: 0 0 2px currentColor, 0 0 10px color-mix(in srgb, currentColor 60%, transparent);
  --outline-thick: 3px; /* 한글 굵은 글꼴은 획이 촘촘해서 4px을 넘기면 뭉개진다 */ --sticker-edge: 5px solid #fff; --r-sticker: 10px;
  /* 글자 */
  --fs-sm: 14px; --fs-base: 17px; --fs-lg: clamp(24px, 3vw, 40px); --fs-hero: clamp(70px, 15vw, 240px);
  --fw-body: 600; --fw-head: 900; --lh-head: 0.85; --lh-body: 1.5; --tilt: -6deg;
  /* 움직임: 툭, 빠르게 */
  --ease-pop: cubic-bezier(0.34, 1.56, 0.64, 1); --dur-1: 140ms; --dur-2: 450ms;
}
```

**모범 섹션 코드:** `node SKILL_DIR/scripts/lib.mjs example graffiti` (구현할 때 한 번)

## 어울리는 모션
- 큰 작품이 스프레이로 칠해지듯 왼쪽에서 드러난다 (`clip-path` 또는 `signature-draw`)
- 스티커가 툭 붙는다 (오버슈트)
- 포스터 띠가 흐른다 (`marquee`)
- 강도: 중간~높음, 짧고 거칠게

## 하지 말 것
- 벽돌 벽 사진 배경에 의존
- 본문, 메뉴, 가격을 스프레이 글꼴로
- 실제 작가의 태그·작품 흉내
- 형광색 위 형광 글자 (대비 실패. 윤곽선을 두껍게)
