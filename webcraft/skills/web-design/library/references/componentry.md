# Componentry

- url: https://componentry.dev
- styles: dark-tech, kinetic-type, liquid-glass, retro-pixel
- industry: 애니메이션 컴포넌트 라이브러리 (React)
- mood: 세련됨, 실험적, 다크, 공들인, 장난기 한 스푼
- analyzed_at: 2026-11-01
- 라이선스: **MIT** (GitHub `harshjdhv/componentry`)
- 비고: 약 800px 너비 화면에서 확인함. 첫 화면은 선명하게 봤고, 아래쪽은 일부만 그려졌다. 컴포넌트 목록은 링크에서 확인

## 첫인상
검은 화면에 파란 점묘(하프톤) 빛이 번지고, 그 위로 회색 제목 "The component library for polished interfaces."가 천천히 떠오른다. 위에 작게 "Backed by Vercel OSS Program". 내려가면 화면보다 큰 외곽선 글자 "COMPONENTRY"가 흘러가고, 반짝이는 3D 아이콘들이 격자로 놓여 있다.

## 왜 좋은가
- **배경 하나로 분위기를 낸다.** 점으로 이루어진 파란 빛 번짐(디더링 그라데이션)이 히어로 전체를 채워서 글자가 적어도 비어 보이지 않는다
- **제목이 빛 속에서 서서히 나타난다.** 처음엔 거의 보이지 않다가 선명해지는 등장 효과
- **신뢰 표시를 맨 위에 작게.** "Vercel OSS 프로그램 지원"을 제목 위 작은 줄에 둬서 바로 신뢰를 준다
- **광택 3D 아이콘 격자.** 말랑하고 반짝이는 이모지 같은 3D 아이콘(별, 무지개, 다이아몬드)이 줄지어 있다. 클레이모피즘 느낌의 아이콘 활용 예
- 컴포넌트가 54개로 많지 않지만 하나하나 "공들인" 느낌이 나는 것들만 모았다

## 레이아웃
- 위: 왼쪽 로고, 오른쪽 검색(⌘K), GitHub 별 수, 테마 전환, 메뉴
- 히어로: 가운데 정렬, 작은 신뢰 표시 → 회색 제목 2줄 → 아래 큰 미리보기 칸
- 이후: 거대한 외곽선 글자 마키, 3D 아이콘 격자, 맥 독 같은 아이콘 줄, 추천사 ("Loved by builders with taste"), 제작 문의

## 타이포
- Geist, 제목 40px 굵기 500, 자간 좁게(-2.4px)
- 본문 17px 회색
- 화면보다 큰 외곽선 대문자 마키

## 색
- 배경: 거의 검정 `rgb(10,10,10)`
- 빛: 파랑 점묘
- 글자: 흰색, 보조는 푸른 회색
- 3D 아이콘의 원색 광택이 포인트

## 질감
- 디더링, 점묘 그라데이션
- 광택 있는 3D 아이콘
- 둥근 미리보기 칸, 얇은 테두리

## 모션
- 점묘 빛 배경 (캔버스)
- 제목 페이드 인
- 외곽선 글자 마키
- 맥 독 아이콘 확대 (magnetic-dock)

## 레시피 후보
MIT라 원리를 참고해 다시 구현해도 된다. 레시피 형식으로 새로 쓴다. 스타일별로 나누면:
- **리퀴드**: webgl-liquid, liquid-chrome, liquid-glass-carousel, image-ripple-effect, ripple-transition
- **그레이니, 디더링**: grain-gradient, dither-gradient, dither-prism-hero, dithered-logo, animated-gradient, prism-gradient, silk-aurora, aurora-flow, spectral-ribbon
- **키네틱 타이포**: kinetic-text-reveal, letter-cascade, text-morph, text-repel, flipping-word-swap, split-flap-display, cursor-driven-particle-typography, annotated-text, scroll-based-velocity
- **스크롤**: scroll-choreography, sticky-scroll-cards, scroll-split-card, scroll-tilted-grid
- **3D, 갤러리**: spiral-3d-slider, fisheye-infinite-grid, infinite-image-field, wheel-carousel, orbit-card-stack, layered-stack, case-study-flip-stack
- **커서, 마이크로 인터랙션**: magnetic-dock, magnet-lines, eye-tracking, image-trail, pixel-image-trail, hover-transition
- **레트로, 픽셀**: pixel-canvas, matrix-rain, ascii-effect, split-flap-display
- **손맛**: signature (사인이 그려지는 효과, Lando Norris 노트와 연결)
- 그 외: circuit-board, lens-clock, music-player, mac-keyboard, github-calendar, flight-status-card, newsletter-bookshelf

## 가져올 수 있는 것
- 히어로 배경을 점묘 빛 번짐 하나로
- 신뢰 표시를 제목 위 작은 줄에
- 거대한 외곽선 글자 마키로 섹션 구분
- 광택 3D 아이콘으로 기능 목록에 촉감 더하기

## 주의할 것
- React 전제. 순수 HTML이면 원리만 가져온다
- 회색 제목이 어두운 배경 위에서 처음엔 거의 안 보인다. 등장이 끝난 뒤 대비를 확인한다
- 레시피 후보가 많아서 한 페이지에 여러 개를 넣고 싶어진다. 주인공 모션은 하나

## 실측 수치
- 측정: 2026-11-04 componentry.dev · 화면 1440×900 · 그릴 때 프레임 122/초
- 글자 크기(글자 수 많은 순): 16, 14, 12, 96, 17, 13, 56, 44px · 본문 16px · 첫 화면 가장 큰 글자 56px (본문의 3.5배)
- 첫 화면 제목(h1): Geist 56px · 굵기 500 · 행간 0.96 · 자간 -0.060em
- 본문: Geist 16px · 굵기 400 · 행간 1.53 · 자간 0 · 문단 폭 최대 600px
- 글꼴(많이 쓰는 순): Geist, JetBrains Mono
- 색: 배경 #0a0a0a · 글자 #fafafa, #d4d4d8, #818181, #9f9fa9 · 면 #0a0a0a, #141414, #161616, #1a1a1a, #72727a · 강조 #2b7fff, #615fff, #fb2c36
- 배치: 왼쪽 여백 40, 270px · 그리드 3열 간격 14 / 1열 간격 0 / 4열 간격 10 · 섹션 위아래 여백 합 108, 168, 192px
- 첫 화면 구도: 제목 위치 왼쪽 25% 위 27% · 폭 50% · 정렬 center
- 아래쪽: 스크롤 방식 window · 페이지 높이 3.7화면 3357px · 끝까지 봄 · 서로 다른 모양 3가지 · h2 Geist 12, 36, 44px · 화면별 가장 큰 글자 36, 44, 16px · 화면별 가운데 배경 #0a0a0a×3
- 모양: 둥글기 알약, 6px, 14px, 16px · 테두리 1px, 2px · 그림자 115개 · 뒤 흐림 6개
- 움직임: 전환 시간 150ms, 200ms, 160ms · 이징 cubic-bezier(0.4, 0, 0.2, 1), cubic-bezier(0.23, 1, 0.32, 1) · CSS 애니메이션 8개 · 캔버스 4개 (화면을 채움, 안쪽 글자는 못 잰다)
- 호버(CSS): 규칙 17개 · 바뀌는 것 background 8, color 6, opacity 2, transform 1 · 전환 시간 가운데값 150ms (150~300ms) · 이징 cubic-bezier(0.4, 0, 0.2, 1) · 바로 바뀌는 규칙 0개
- 호버(JS): 살펴본 묶음 12개 · 반응 2개 · 전환 시간 가운데값 300ms (300~300ms) · 이징 cubic-bezier(0.23, 1, 0.32, 1)
- 커서: 기본 커서 숨김 0% · 따라오는 요소 0개 · 마우스 따라 움직이는 층 0개
- 폼: 입력칸 없음
- 클릭 탐색: 후보 2개 · 위험하거나 안 보여서 뺌 1개 · 누른 묶음 1개 · 모달 1 · 펼침 0 · 탭 0 · 작은 변화 0 · 변화 없음 0 · 바뀐 요소 가운데값 801개 · 화면 밀림 0.000 · 전환 시간 가운데값 200ms (200~200ms) · 이징 cubic-bezier(0.4, 0, 0.2, 1) · 되돌리지 못함 1개
