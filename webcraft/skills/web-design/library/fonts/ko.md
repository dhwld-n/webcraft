# 한글 무료 폰트

웹사이트에 무료로 쓸 수 있는 한글 폰트 목록. 2026-11-02에 정리했다. 눈누(noonnu.cc)의 인기 폰트, Google Fonts의 한글 폰트, 산돌구름 무료폰트를 모았다.

## 라이선스 읽는 법
- **Google Fonts 한글 폰트:** SIL OFL. 상업 사용, 웹 임베딩 모두 가능
- **눈누 폰트:** 눈누의 라이선스 요약표 기준. 아래 목록은 모두 "웹사이트 사용 가능"이다
  - **임베딩 = 사용 가능:** 웹폰트로 서버에 올려 써도 된다
  - **임베딩 = 조건부 허용:** 원본 라이선스의 조건(출처 표기 등)을 확인하고 쓴다. 결과를 알릴 때 사용자에게 그 조건을 알린다
  - **임베딩 = 금지:** 웹폰트로 서버에 올려 쓰면 안 된다. 웹사이트에서는 글자를 이미지로 만들어야만 쓸 수 있으니, 웹 디자인에서는 고르지 않는다
- 눈누 요약표는 참고용이다. 정확한 조건은 저작권자의 원본 라이선스가 우선한다

## 바로 쓰는 CSS 주소 (확인함)

```html
<!-- 프리텐다드 (가변, 필요한 글자만 내려받음) → font-family: "Pretendard Variable" -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<!-- 수트 SUIT (가변) → "SUIT Variable" -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/variable/woff2/SUIT-Variable.css">
<!-- Wanted Sans (가변) → "Wanted Sans Variable" -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.3/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css">
<!-- 마루 부리 → "MaruBuri" -->
<link rel="stylesheet" href="https://hangeul.pstatic.net/hangeul_static/css/maru-buri.css">
<!-- 나눔스퀘어 네오 → "NanumSquareNeo" -->
<link rel="stylesheet" href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css">
<!-- 나눔스퀘어 → "NanumSquare" (굵기별 이름: NanumSquareLight, NanumSquareBold, NanumSquareExtraBold) -->
<link rel="stylesheet" href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css">
<!-- 나눔스퀘어라운드 → "NanumSquareRound" (굵기별 이름: NanumSquareRoundL, NanumSquareRoundB, NanumSquareRoundEB) -->
<link rel="stylesheet" href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-round.css">
```

나눔 계열 CSS는 굵기마다 이름을 따로 붙이고 `font-weight`를 적지 않는다. `font-weight: 800`처럼 굵기로 고르려면 CSS 대신 필요한 굵기 파일 하나만 `@font-face`로 직접 부른다. 예: 나눔스퀘어라운드 ExtraBold
```css
@font-face {
  font-family: "NanumSquareRound";
  src: url("https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareRound/NanumSquareRoundEB.woff2") format("woff2");
  font-weight: 800;
  font-display: swap;
}
```

## 눈누 폰트를 불러오는 법
목록에 없는 주소는 눈누 폰트 페이지(표의 링크)의 "웹폰트로 사용" 코드를 그대로 가져온다. 페이지를 WebFetch나 브라우저로 열면 `@font-face` 블록이 있다. 주소는 보통 `https://cdn.jsdelivr.net/gh/projectnoonnu/...` 형태다. 쓰는 굵기의 `@font-face`만 넣는다.

## Google Fonts 한글 (37개)
Google Fonts 주소에 영문 폰트와 함께 넣을 수 있다. 예: `family=Gowun+Batang:wght@400;700`. Sunflower는 굵기 300, 500, 700만 있어서 굵기를 꼭 지정한다.

### 고딕

| 폰트 (Google 이름) | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Noto Sans KR** | 중립, 표준 본문 | dark-tech, swiss, bento-grid, minimalism |
| **IBM Plex Sans KR** | 기술, 단정 | dark-tech, swiss, minimalism |
| **Gothic A1** | 깔끔한 고딕, 굵기 다양 | swiss, bento-grid, minimalism |
| **Nanum Gothic** | 익숙한 본문 고딕 | bento-grid |
| **Nanum Gothic Coding** | 한글 코딩 고정폭 | dark-tech |
| **Gowun Dodum** | 부드러운 돋움 | editorial, claymorphism, vector-art, aurora |
| **Do Hyeon** | 각진 굵은 제목, 복고 | neo-brutalism, retro-pixel, pop-art |
| **Jua** | 둥글고 귀여운 제목 | claymorphism, pop-art |
| **Black Han Sans** | 아주 굵은 제목 | neo-brutalism, maximalism, kinetic-type, pop-art, graffiti |
| **Sunflower** | 가늘고 단정 | swiss |
| **Orbit** | 우주, 기하 | y2k-chrome, dark-tech, cyberpunk, futuristic |
| **Stylish** | 세련된 가는 고딕 | editorial |

### 라운드

| 폰트 (Google 이름) | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Dongle** | 통통 말랑 | claymorphism |

### 명조

| 폰트 (Google 이름) | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Noto Serif KR** | 표준 명조 본문 | editorial, minimalism |
| **Nanum Myeongjo** | 익숙한 명조 | editorial, victorian |
| **Gowun Batang** | 부드러운 명조 | editorial, grainy-gradient, bohemian, victorian |
| **Hahmlet** | 현대 명조, 가변 | editorial, bohemian |
| **Song Myung** | 고전 붓 명조 | editorial, retro, victorian |
| **Diphylleia** | 우아한 디스플레이 명조 | editorial, surreal |
| **Grandiflora One** | 꽃 장식 명조 | editorial, maximalism, surreal |

### 디스플레이

| 폰트 (Google 이름) | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Bagel Fat One** | 베이글처럼 통통 | claymorphism, maximalism |
| **Gasoek One** | 굵은 장식 제목 | maximalism, neo-brutalism, collage, graffiti |
| **Moirai One** | 물결무늬 장식 | y2k-chrome, maximalism, surreal, futuristic |
| **Gugi** | 네모 장식 | retro-pixel, maximalism |
| **Yeon Sung** | 복고 간판 | maximalism, retro |
| **Black And White Picture** | 흑백 사진관 복고 | maximalism, collage |
| **Kirang Haerang** | 장난기 장식 | maximalism |

### 손글씨

| 폰트 (Google 이름) | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Gaegu** | 귀여운 손글씨 | claymorphism, handwritten |
| **Hi Melody** | 발랄한 손글씨 | claymorphism, handwritten |
| **Gamja Flower** | 귀여운 손글씨 | claymorphism, handwritten |
| **Poor Story** | 동화 손글씨 | claymorphism, handwritten |
| **Cute Font** | 귀여운 손글씨 | claymorphism |
| **Single Day** | 말랑한 손글씨 | claymorphism, handwritten |
| **Nanum Pen Script** | 펜 손글씨 | editorial, handwritten |
| **Nanum Brush Script** | 붓 손글씨 | editorial, maximalism, handwritten, graffiti |
| **Dokdo** | 거친 붓 | maximalism, graffiti |
| **East Sea Dokdo** | 거친 붓, 굵음 | maximalism, graffiti |

## 눈누 인기 폰트 (70개)

임베딩은 2026-11-02에 눈누 라이선스 요약표를 한 줄씩 다시 읽어 확인했다. 허용 칸이 비어 있으면 금지다.

### 고딕

| 폰트 | 제작 | 굵기 | 임베딩 | 분위기 | 어울리는 스타일 |
|---|---|---|---|---|---|
| **[프리텐다드](https://noonnu.cc/font_page/694)** | 길형진 | 9 | 사용 가능 | 중립, 현대 UI 표준 | dark-tech, bento-grid, swiss, editorial, minimalism, aurora |
| **[수트 SUIT](https://noonnu.cc/font_page/845)** | SUNN YOUN | 9 | 사용 가능 | 현대 UI, 단정 | dark-tech, bento-grid, swiss, minimalism, aurora |
| **[Wanted Sans](https://noonnu.cc/font_page/1269)** | 원티드랩 | 7 | 사용 가능 | 현대 UI, 단단 | dark-tech, bento-grid, minimalism, aurora |
| **[페이퍼로지](https://noonnu.cc/font_page/1456)** | 이주임 X 김도균 | 9 | 사용 가능 | 깔끔, 발표용 | bento-grid, swiss, minimalism |
| **[프리젠테이션](https://noonnu.cc/font_page/1369)** | 이주임 | 9 | 사용 가능 | 깔끔, 발표용 | bento-grid, swiss |
| **[에이투지체](https://noonnu.cc/font_page/1778)** | 오토노머스에이투지 X 이주임 | 9 | 사용 가능 | 현대 고딕, 테크 | dark-tech, swiss |
| **[에스코어드림](https://noonnu.cc/font_page/223)** | S-Core | 9 | 사용 가능 | 기하, 깔끔 | bento-grid, swiss |
| **[G마켓 산스](https://noonnu.cc/font_page/366)** | G마켓 | 3 | 사용 가능 | 굵고 둥근 홍보 제목 | bento-grid, claymorphism, pop-art |
| **[나눔스퀘어](https://noonnu.cc/font_page/37)** | 네이버 | 4 | 사용 가능 | 각진 제목 고딕 | swiss, dark-tech |
| **[나눔스퀘어 네오](https://noonnu.cc/font_page/1053)** | 네이버 | 6 | 사용 가능 | 현대적 각진 고딕 | swiss, dark-tech |
| **[나눔스퀘어라운드](https://noonnu.cc/font_page/38)** | 네이버 | 4 | 사용 가능 | 둥근 각진 고딕 | claymorphism, vector-art |
| **[나눔바른고딕](https://noonnu.cc/font_page/36)** | 네이버 | 4 | 사용 가능 | 본문 고딕 | bento-grid |
| **[KoPub돋움](https://noonnu.cc/font_page/33)** | 한국출판인회의 | 3 | 사용 가능 | 출판 본문 | editorial |
| **[부산단디고딕](https://noonnu.cc/font_page/1989)** | 부산시청 | 3 | 사용 가능 | 공공 고딕 | swiss |
| **[서울알림체](https://noonnu.cc/font_page/1604)** | 서울시청 | 4 | 사용 가능 | 굵은 공공 제목 | neo-brutalism, kinetic-type |
| **[이사만루](https://noonnu.cc/font_page/463)** | 공게임즈 X 폰트릭스 | 3 | 사용 가능 | 스포츠, 굵은 제목 | kinetic-type, maximalism |
| **[어그로체](https://noonnu.cc/font_page/738)** | 샌드박스네트워크 | 3 | 사용 가능 | 굵은 썸네일 제목 | maximalism, neo-brutalism, pop-art |
| **[검은고딕 (Black Han Sans)](https://noonnu.cc/font_page/106)** | ZESSTYPE | 1 | 사용 가능 | 아주 굵은 제목 | neo-brutalism, maximalism, kinetic-type |
| **[도현체](https://noonnu.cc/font_page/55)** | 우아한형제들 | 1 | 사용 가능 | 각진 굵은 복고 제목 | neo-brutalism, retro-pixel |
| **[주아체](https://noonnu.cc/font_page/53)** | 우아한형제들 | 1 | 사용 가능 | 둥글고 귀여운 제목 | claymorphism |
| **[여기어때 잘난체](https://noonnu.cc/font_page/115)** | 여기어때컴퍼니 | 1 | 조건부 허용 | 굵은 장식 제목 | maximalism, neo-brutalism |
| **[여기어때 잘난체 고딕](https://noonnu.cc/font_page/1254)** | 여기어때컴퍼니 | 1 | 조건부 허용 | 굵은 제목 고딕 | maximalism, kinetic-type |
| **[차이 활짝체](https://noonnu.cc/font_page/1971)** | 차이커뮤니케이션 | 4 | 조건부 허용 | 활기찬 둥근 제목 | claymorphism |
| **[조선굴림체](https://noonnu.cc/font_page/415)** | 조선일보 | 1 | 사용 가능 | 복고 굴림 | retro-pixel, editorial |
| **[깍두기 도면체](https://noonnu.cc/font_page/1988)** | 역동감자 | 4 | 사용 가능 | 도면, 기술 | swiss, dark-tech |
| **[빗썸고딕 Original](https://noonnu.cc/font_page/1978)** | 빗썸 | - | 사용 가능 | 핀테크 고딕 | dark-tech |
| **[느좋체](https://noonnu.cc/font_page/1966)** | AI올컷 | 2 | 사용 가능 | 좁고 길쭉한 트렌디 고딕 | kinetic-type, editorial |
| **[레벨업](https://noonnu.cc/font_page/1994)** | Hada Type | 3 | 사용 가능 | 굵은 스포츠 장식 고딕, 제목용 | kinetic-type, maximalism |

### 바탕

| 폰트 | 제작 | 굵기 | 임베딩 | 분위기 | 어울리는 스타일 |
|---|---|---|---|---|---|
| **[마루 부리](https://noonnu.cc/font_page/487)** | 네이버 | 5 | 사용 가능 | 현대 명조 | editorial, minimalism |
| **[리디바탕](https://noonnu.cc/font_page/324)** | 리디 | 1 | 사용 가능 | 전자책 명조 | editorial |
| **[조선일보명조](https://noonnu.cc/font_page/63)** | 조선일보 | 1 | 사용 가능 | 신문 명조 | editorial, victorian |
| **[고운바탕](https://noonnu.cc/font_page/733)** | 류양희 | 2 | 사용 가능 | 부드러운 명조 | editorial, grainy-gradient, bohemian |
| **[나눔명조](https://noonnu.cc/font_page/41)** | 네이버 | 3 | 사용 가능 | 익숙한 명조 | editorial |
| **[KoPub바탕](https://noonnu.cc/font_page/32)** | 한국출판인회의 | 3 | 사용 가능 | 출판 명조 | editorial |
| **[부크크 명조](https://noonnu.cc/font_page/1084)** | 부크크 | 2 | 사용 가능 | 책 명조 | editorial |
| **[을유1945](https://noonnu.cc/font_page/620)** | 을유문화사 | 2 | 금지 | 고전 명조 | editorial, victorian |
| **[부산단디명조](https://noonnu.cc/font_page/1990)** | 부산시청 | 3 | 사용 가능 | 현대 명조 | editorial, bohemian |
| **[스텔라체](https://noonnu.cc/font_page/1907)** | 동서대학교 | 1 | 사용 가능 | 좁은 굵은 명조 제목 | editorial, kinetic-type, victorian |
| **[더 우아한 세리프](https://noonnu.cc/font_page/1992)** | 디스이즈페어웨이 | - | 금지 | 우아한 명조 | editorial, victorian |
| **[조선궁서체](https://noonnu.cc/font_page/416)** | 조선일보 | 1 | 사용 가능 | 궁서, 전통 | editorial, maximalism |
| **[빛의계승자체](https://noonnu.cc/font_page/442)** | 펀플로 X 산돌 | 2 | 조건부 허용 | 판타지 게임 명조 | maximalism |
| **[강원교육모두체](https://noonnu.cc/font_page/802)** | 강원도교육청 X 헤움디자인 | 2 | 사용 가능 | 교육, 단정 | editorial |

### 장식체

| 폰트 | 제작 | 굵기 | 임베딩 | 분위기 | 어울리는 스타일 |
|---|---|---|---|---|---|
| **[카페24 써라운드](https://noonnu.cc/font_page/669)** | Cafe24 | 1 | 사용 가능 | 둥근 장식 제목 | claymorphism, vector-art |
| **[학교안심 둥근미소](https://noonnu.cc/font_page/1479)** | KERIS | 2 | 사용 가능 | 둥근, 아이 | claymorphism, vector-art |
| **[넥슨 메이플스토리](https://noonnu.cc/font_page/427)** | 넥슨 | 2 | 사용 가능 | 게임, 둥근 | claymorphism |
| **[쿠키런](https://noonnu.cc/font_page/364)** | 데브시스터즈 | 3 | 조건부 허용 | 게임, 통통 | claymorphism |
| **[원스토어 모바일POP체](https://noonnu.cc/font_page/676)** | 원스토어 | 1 | 사용 가능 | POP 광고 | maximalism, pop-art |
| **[티몬체](https://noonnu.cc/font_page/72)** | 티몬 | 1 | 사용 가능 | 굵은 장식 | maximalism |
| **[제주돌담체](https://noonnu.cc/font_page/1032)** | 얼리폰트 | 1 | 조건부 허용 | 돌담 질감 장식 | maximalism |
| **[춤추는사람들](https://noonnu.cc/font_page/1974)** | Hada Type | 가변 | 사용 가능 | 사람 모양 실험 장식 | maximalism, kinetic-type |
| **[GS혜자로운체](https://noonnu.cc/font_page/1984)** | GS리테일 | 1 | 금지 | 장식 | maximalism |
| **[비트로 코어체](https://noonnu.cc/font_page/477)** | 학산 | 1 | 금지 | 굵은 장식 | maximalism, cyberpunk |
| **[리아체](https://noonnu.cc/font_page/1510)** | 롯데GRS | 1 | 사용 가능 | 굵고 각진 제목용 장식체 | maximalism, neo-brutalism |
| **[Ok단단체](https://noonnu.cc/font_page/1664)** | 오케이티콘 | 1 | 사용 가능 | 통통한 장식 손글씨, 버블 | claymorphism, maximalism |
| **[와일드각](https://noonnu.cc/font_page/1682)** | 김씨폰트공방 | 1 | 사용 가능 | 각지고 거친 장식 손글씨 | maximalism, neo-brutalism |
| **[히피체](https://noonnu.cc/font_page/1967)** | AI올컷 | 1 | 사용 가능 | 동글동글 귀여운 두꺼운 손글씨 | claymorphism |
| **[떡상체](https://noonnu.cc/font_page/1993)** | AI올컷 | 1 | 사용 가능 | 굵게 기울어진 썸네일 제목 | maximalism, kinetic-type |

### 픽셀체

| 폰트 | 제작 | 굵기 | 임베딩 | 분위기 | 어울리는 스타일 |
|---|---|---|---|---|---|
| **[둥근모꼴+ Fixedsys](https://noonnu.cc/font_page/250)** | 길형진 | 1 | 사용 가능 | 도스 시절 픽셀 | retro-pixel |
| **[Mona12](https://noonnu.cc/font_page/1792)** | Monad ABXY | 2 | 사용 가능 | 픽셀 | retro-pixel |
| **[뚝딱감자체](https://noonnu.cc/font_page/1969)** | 귀댕이 | 1 | 사용 가능 | 귀여운 픽셀 | retro-pixel, claymorphism |

### 손글씨

| 폰트 | 제작 | 굵기 | 임베딩 | 분위기 | 어울리는 스타일 |
|---|---|---|---|---|---|
| **[메모먼트 꾹꾹체](https://noonnu.cc/font_page/1663)** | 메모먼트 | 1 | 금지 | 꾹꾹 눌러 쓴 손글씨 | claymorphism, editorial, handwritten |
| **[온글잎 박다현체](https://noonnu.cc/font_page/1541)** | 온글잎 | 1 | 사용 가능 | 자연스러운 손글씨 | editorial, handwritten |
| **[온글잎 콘콘체](https://noonnu.cc/font_page/1546)** | 온글잎 | 1 | 사용 가능 | 귀여운 손글씨 | claymorphism, handwritten |
| **[온글잎 윤탱체](https://noonnu.cc/font_page/1918)** | 온글잎 | 1 | 사용 가능 | 손글씨 | editorial |
| **[온글잎 의연체](https://noonnu.cc/font_page/667)** | 온글잎 | 1 | 사용 가능 | 단정한 손글씨 | editorial, handwritten |
| **[이서윤체](https://noonnu.cc/font_page/872)** | 흥국생명 | 1 | 사용 가능 | 또박또박 손글씨 | editorial, handwritten |
| **[교보손글씨 2019](https://noonnu.cc/font_page/419)** | 교보문고 | 1 | 사용 가능 | 편지 손글씨 | editorial, handwritten |
| **[그리운 경찰감성체](https://noonnu.cc/font_page/1777)** | 서울경찰청 X 그리운 | 1 | 사용 가능 | 손글씨 | editorial |
| **[부산단디손글씨](https://noonnu.cc/font_page/1991)** | 부산시청 | 1 | 사용 가능 | 손글씨 | editorial, handwritten |
| **[꾸불림체](https://noonnu.cc/font_page/1500)** | 우아한형제들 | 1 | 사용 가능 | 꾸불꾸불 장식 손글씨 | maximalism, claymorphism |

## 산돌구름 무료폰트 (20개)

산돌구름 무료폰트(sandollcloud.com/freefonts) 65개를 2026-11-05에 확인했다. 31개는 위 목록에 이미 있어서 뺐다. 아래는 나머지 중 눈누에서 불러올 주소까지 확인한 것이다. 산돌구름은 PC 앱으로 켜는 곳이라 웹 주소를 주지 않으므로, 주소는 눈누 페이지에서 가져온다.
임베딩은 산돌구름과 눈누 요약표를 함께 봤다. 분위기는 산돌구름의 분류로만 적었고 눈으로 확인하지 않았다.
주소가 없어서 넣지 않음: 갈무리9, 본고딕, 본명조, Google Sans Flex, K110 Alien Sans, DesignMag Sans, 제임스네일체, KBL 코트체, 퍼즐체, SD 유니세프 3종. 임베딩 금지라서 넣지 않음: 네오현대(산돌), 그리운 체리한스푼(눈누는 금지, 산돌은 가능으로 표기가 달라 빼 둠).

### 민부리

| 폰트 | 제작 | 굵기 | 임베딩 | 분위기 | 어울리는 스타일 |
|---|---|---|---|---|---|
| **[KoPub World 돋움체](https://noonnu.cc/font_page/33)** | - | 3 | 사용 가능 | 단정한 고딕, 본문 | swiss, editorial, bento-grid, minimalism |
| **[펴진고딕](https://noonnu.cc/font_page/1586)** | - | 5 | 사용 가능 | 고딕 | swiss, bento-grid, dark-tech, minimalism |
| **[원주체](https://noonnu.cc/font_page/1875)** | - | 2 | 사용 가능 | 고딕 | swiss, bento-grid, dark-tech |
| **[HS잔다리체](https://noonnu.cc/font_page/1689)** | - | 1 | 사용 가능 | 고딕 | swiss, bento-grid, dark-tech |
| **[HS산토끼체](https://noonnu.cc/font_page/809)** | - | 1 | 사용 가능 | 고딕 | swiss, bento-grid, dark-tech |
| **[와구리체](https://noonnu.cc/font_page/1353)** | - | 1 | 사용 가능 | 고딕 | swiss, bento-grid, dark-tech |
| **[Cafe24 PRO Slim](https://noonnu.cc/font_page/1699)** | - | 3 | 사용 가능 | 고딕 | swiss, bento-grid, dark-tech |
| **[카페24 아네모네](https://noonnu.cc/font_page/363)** | - | 1 | 사용 가능 | 고딕, 제목 | swiss, bento-grid, kinetic-type |
| **[어그로체](https://noonnu.cc/font_page/738)** | - | 3 | 사용 가능 | 굵은 고딕, 제목 | kinetic-type, maximalism, neo-brutalism, pop-art |
| **[학교안심 지우개](https://noonnu.cc/font_page/1299)** | - | 1 | 사용 가능 | 고딕, 제목 | claymorphism, bento-grid |
| **[여기어때 잘난체](https://noonnu.cc/font_page/115)** | - | 1 | 조건부 허용 | 굵은 고딕, 제목 | kinetic-type, maximalism, neo-brutalism |

### 디스플레이

| 폰트 | 제작 | 굵기 | 임베딩 | 분위기 | 어울리는 스타일 |
|---|---|---|---|---|---|
| **[대구북성로](https://noonnu.cc/font_page/1701)** | - | 2 | 사용 가능 | 디스플레이 | kinetic-type, maximalism, retro |
| **[KBL점프체](https://noonnu.cc/font_page/1762)** | - | 4 | 사용 가능 | 디스플레이 | kinetic-type, neo-brutalism, pop-art |
| **[을지로체](https://noonnu.cc/font_page/321)** | - | 1 | 사용 가능 | 디스플레이, 옛 간판 | maximalism, neo-brutalism, retro |

### 손글씨

| 폰트 | 제작 | 굵기 | 임베딩 | 분위기 | 어울리는 스타일 |
|---|---|---|---|---|---|
| **[그리운 두준두준체](https://noonnu.cc/font_page/1892)** | - | 1 | 사용 가능 | 손글씨 | claymorphism, editorial, handwritten |
| **[둥글둥글체 김규리](https://noonnu.cc/font_page/1807)** | - | 1 | 사용 가능 | 손글씨 | claymorphism, handwritten |
| **[Ok Mallang](https://noonnu.cc/font_page/1795)** | - | 2 | 사용 가능 | 손글씨 | claymorphism, handwritten |
| **[KNPS오대산체](https://noonnu.cc/font_page/1691)** | - | 1 | 사용 가능 | 손글씨 | editorial |
| **[꾸불림체](https://noonnu.cc/font_page/1500)** | - | 1 | 사용 가능 | 손글씨 | claymorphism, maximalism |
| **[Continuous](https://noonnu.cc/font_page/1319)** | - | 5 | 조건부 허용 | 손글씨 | editorial |
