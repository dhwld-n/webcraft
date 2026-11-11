# 영문 무료 폰트

웹사이트에 무료로 쓸 수 있는 영문 폰트 목록. 2026-11-02에 정리했고, Google Fonts 이름은 전부 실제로 불러와지는지 확인했다.

**영문 폰트에는 한글이 없다.** 한국어 페이지는 한글 폰트(`ko.md`)를 반드시 같이 지정한다. 예: `font-family: "Fraunces", "고운바탕 대체 이름", serif;`

## 불러오는 법

**Google Fonts** (라이선스: SIL OFL 또는 Apache. 상업 사용, 수정, 웹 임베딩 모두 가능)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&family=Fraunces:opsz,wght@9..144,400;9..144,700&display=swap" rel="stylesheet">
```
가변 폰트는 `wght@100..900`처럼 범위로 쓸 수 있다. 쓰는 굵기만 적는다.

**Fontshare** (Indian Type Foundry. 라이선스: ITF Free Font License. 개인·상업 사용 무료. 폰트 파일 재배포와 판매는 금지라서 파일을 저장소에 올리지 말고 아래 주소로 불러온다)
```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,700&f[]=clash-display@600&display=swap" rel="stylesheet">
```
`f[]=` 뒤에는 표의 slug를 쓴다.

## Google Fonts (142개)

### 산세리프

| 폰트 | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Inter** | 중립, 정밀, UI 표준 | dark-tech, bento-grid, swiss, minimalism |
| **Geist** | 개발자, 정밀, 차분 | dark-tech, bento-grid, minimalism |
| **Manrope** | 기하, 현대적 | dark-tech, bento-grid |
| **DM Sans** | 친근, 깔끔 | bento-grid, editorial, minimalism |
| **Plus Jakarta Sans** | 친근한 SaaS | bento-grid, dark-tech, vector-art |
| **Outfit** | 기하, 부드러움 | bento-grid, claymorphism, vector-art, aurora |
| **Sora** | 테크, 넓은 자간 | dark-tech, futuristic, aurora |
| **Space Grotesk** | 테크, 개성 있는 그로테스크 | dark-tech, neo-brutalism, y2k-chrome, collage, futuristic |
| **Archivo** | 단단함, 폭 조절 가능 | swiss, neo-brutalism |
| **Work Sans** | 무난한 그로테스크 | swiss, editorial |
| **IBM Plex Sans** | 기업, 기술 문서 | dark-tech, swiss |
| **Public Sans** | 공공, 중립 | swiss |
| **Figtree** | 친근, 깔끔 | bento-grid, claymorphism, vector-art |
| **Onest** | 깔끔, 화면용 | bento-grid, minimalism |
| **Instrument Sans** | 정갈, 현대 | editorial, swiss, minimalism, collage, aurora |
| **Hanken Grotesk** | 차분한 그로테스크 | swiss, editorial, minimalism, aurora |
| **Schibsted Grotesk** | 신문, 단단함 | editorial, swiss |
| **Bricolage Grotesque** | 개성, 장난기, 폭과 굵기 변화 | editorial, neo-brutalism, maximalism |
| **Familjen Grotesk** | 북유럽, 차분 | swiss |
| **Albert Sans** | 기하, 스칸디나비아 | swiss |
| **Red Hat Display** | 기업, 단정 | dark-tech |
| **Epilogue** | 굵기 폭이 넓은 에디토리얼 | editorial, maximalism |
| **Lexend** | 읽기 쉬움 | bento-grid |
| **Mona Sans** | 폭 조절, 테크 브랜드 | dark-tech, kinetic-type |
| **Hubot Sans** | 로봇, 기계적 | dark-tech, y2k-chrome |
| **Poppins** | 기하, 친근 | claymorphism, bento-grid, vector-art |
| **Montserrat** | 기하, 다목적 | bento-grid |
| **Rubik** | 모서리 살짝 둥근, 친근 | claymorphism, bento-grid, vector-art |
| **Barlow** | 산업, 간판 | swiss |
| **Exo 2** | 테크, 미래 | dark-tech |

### 라운드

| 폰트 | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Nunito** | 둥글고 친근 | claymorphism, vector-art |
| **Quicksand** | 가볍고 귀여움 | claymorphism |
| **Varela Round** | 둥근 단정함 | claymorphism |
| **M PLUS Rounded 1c** | 둥근, 일본어 포함 | claymorphism |
| **Fredoka** | 통통, 장난감 | claymorphism, vector-art |
| **Baloo 2** | 통통, 아이 | claymorphism |
| **Sniglet** | 아주 둥근, 장난기 | claymorphism |
| **Grandstander** | 말랑, 만화 | claymorphism |
| **Gluten** | 쫀득, 말랑 | claymorphism |

### 콘덴스드

| 폰트 | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Barlow Condensed** | 좁고 단단 | kinetic-type, swiss |
| **Oswald** | 포스터, 뉴스 제목 | kinetic-type, maximalism |
| **Bebas Neue** | 포스터, 강렬, 대문자만 | kinetic-type, maximalism |
| **Anton** | 아주 굵고 강렬 | kinetic-type, neo-brutalism |
| **Archivo Narrow** | 좁은 그로테스크 | kinetic-type |
| **Big Shoulders Display** | 산업, 시카고 | kinetic-type, maximalism |
| **League Gothic** | 클래식 포스터 | kinetic-type |
| **Six Caps** | 극단적으로 좁음 | kinetic-type |
| **Antonio** | 좁고 단정 | kinetic-type |

### 디스플레이

| 폰트 | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Caprasimo** | 둥글고 두꺼운 세리프, 70년대 느낌, Cooper Black과 비슷 | claymorphism, maximalism, editorial, retro, bohemian |
| **Corben** | 둥근 세리프, 굵기는 Bold로, Cooper Black과 비슷 | claymorphism, maximalism, editorial, retro, bohemian |
| **Syne** | 실험적, 예술 | maximalism, kinetic-type, surreal, futuristic, aurora |
| **Unbounded** | 넓고 둥근, Y2K | y2k-chrome, maximalism, kinetic-type, surreal, futuristic, aurora |
| **Archivo Black** | 두껍고 단단 | neo-brutalism, pop-art, collage |
| **Tomorrow** | 테크, 각진 | dark-tech, y2k-chrome, cyberpunk, futuristic |
| **Chakra Petch** | 각진 테크, 게임 | y2k-chrome, retro-pixel, cyberpunk, futuristic |
| **Orbitron** | SF, 우주 | y2k-chrome, cyberpunk, futuristic |
| **Michroma** | 넓은 SF | y2k-chrome, dark-tech, cyberpunk, futuristic |
| **Audiowide** | 레트로 퓨처 | y2k-chrome, cyberpunk |
| **Righteous** | 70년대 레트로 | maximalism, retro |
| **Shrikhand** | 굵은 이탤릭, 맥시멀 | maximalism, retro, bohemian |
| **Bowlby One** | 아주 굵음, 포스터 | neo-brutalism, maximalism, pop-art |
| **Titan One** | 통통, 장난감 | claymorphism, pop-art |
| **Lilita One** | 통통, 게임 | claymorphism, pop-art, vector-art |
| **Luckiest Guy** | 만화 | claymorphism, maximalism, pop-art |
| **Bangers** | 만화 효과음 | maximalism, pop-art, graffiti |
| **Chewy** | 쫀득, 장난기 | claymorphism |
| **Rubik Bubbles** | 풍선처럼 부푼 | claymorphism, y2k-chrome |
| **Rubik Glitch** | 글리치 | y2k-chrome, kinetic-type, cyberpunk, graffiti |
| **Rubik Mono One** | 굵은 고정폭, 레트로 | neo-brutalism, retro-pixel, pop-art |
| **Bungee** | 간판, 세로쓰기 가능 | neo-brutalism, maximalism, pop-art, graffiti |
| **Bungee Shade** | 입체 그림자 간판 | maximalism, y2k-chrome, pop-art, retro |
| **Monoton** | 네온 줄무늬 | y2k-chrome, maximalism, cyberpunk, retro |
| **Climate Crisis** | 녹아내리는 굵기 변화 | kinetic-type, maximalism, surreal |
| **Lobster** | 레트로 스크립트 | maximalism, retro, bohemian |
| **Dela Gothic One** | 아주 굵은 고딕, 일본어 포함 | neo-brutalism, maximalism, pop-art, graffiti |
| **Rampart One** | 입체 블록, 일본어 포함 | claymorphism, maximalism, graffiti |
| **Recursive** | 고정폭과 캐주얼 사이를 오가는 가변 | dark-tech, kinetic-type, surreal |

### 세리프

| 폰트 | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Fraunces** | 따뜻, 장난기 있는 고전, 가변 | editorial, grainy-gradient, surreal, bohemian, aurora |
| **Playfair Display** | 고대비, 잡지 | editorial, collage, victorian |
| **Instrument Serif** | 우아, 좁은 제목 | editorial |
| **DM Serif Display** | 고대비 제목 | editorial |
| **Cormorant Garamond** | 고전, 섬세, 럭셔리 | editorial, victorian |
| **EB Garamond** | 책, 고전 | editorial |
| **Libre Baskerville** | 신뢰, 책 | editorial |
| **Lora** | 따뜻한 본문 | editorial, grainy-gradient |
| **Merriweather** | 화면 본문 | editorial |
| **Source Serif 4** | 차분한 본문 | editorial, swiss |
| **Newsreader** | 신문, 에디토리얼 | editorial |
| **Literata** | 전자책 본문 | editorial |
| **Crimson Pro** | 고전 본문 | editorial |
| **Spectral** | 문학, 가벼움 | editorial |
| **Young Serif** | 굵고 따뜻 | editorial, claymorphism, retro, bohemian |
| **Gloock** | 고대비 디스플레이 | editorial, maximalism, surreal, collage, victorian |
| **Bodoni Moda** | 패션, 럭셔리 | editorial, victorian |
| **Italiana** | 가늘고 우아 | editorial |
| **Abril Fatface** | 굵은 포스터 세리프 | maximalism, retro, collage, victorian |
| **Rozha One** | 고대비 굵은 제목 | maximalism, editorial |
| **Yeseva One** | 여성스러운 고대비 | editorial |
| **Petrona** | 현대 본문 | editorial |
| **Gelasio** | 조지아 대체 본문 | editorial |

### 슬랩

| 폰트 | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Alfa Slab One** | 빈티지 간판 | maximalism, neo-brutalism |
| **Ultra** | 아주 굵은 빈티지 | maximalism |
| **Roboto Slab** | 무난한 슬랩 | swiss |
| **Zilla Slab** | 개성 있는 슬랩 | editorial |
| **Bitter** | 본문용 슬랩 | editorial |

### 모노

| 폰트 | 분위기 | 어울리는 스타일 |
|---|---|---|
| **JetBrains Mono** | 코드, 개발자 | dark-tech, cyberpunk |
| **IBM Plex Mono** | 기술 문서 | dark-tech, swiss |
| **Space Mono** | 레트로 테크 | dark-tech, neo-brutalism, retro-pixel |
| **DM Mono** | 부드러운 고정폭 | dark-tech, editorial |
| **Geist Mono** | 개발자, 정밀 | dark-tech, minimalism, futuristic |
| **Fira Code** | 코드 합자 | dark-tech |
| **Source Code Pro** | 코드 표준 | dark-tech |
| **Roboto Mono** | 무난한 고정폭 | dark-tech |
| **Martian Mono** | 넓은 고정폭 | dark-tech, y2k-chrome |
| **Azeret Mono** | 기하 고정폭 | dark-tech |
| **Red Hat Mono** | 단정한 고정폭 | dark-tech |
| **Spline Sans Mono** | 부드러운 고정폭 | dark-tech |
| **Major Mono Display** | 실험적 고정폭 제목 | y2k-chrome, kinetic-type, cyberpunk, futuristic |
| **Courier Prime** | 타자기 | editorial, retro-pixel |

### 픽셀

| 폰트 | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Press Start 2P** | 8비트 오락실 | retro-pixel |
| **VT323** | 터미널 화면 | retro-pixel, dark-tech, cyberpunk |
| **Silkscreen** | 작은 픽셀 UI | retro-pixel |
| **Pixelify Sans** | 부드러운 픽셀 | retro-pixel |
| **Jersey 10** | 스포츠 픽셀 | retro-pixel |
| **Tiny5** | 아주 작은 픽셀 | retro-pixel |
| **Micro 5** | 마이크로 픽셀 | retro-pixel |
| **DotGothic16** | 도트 고딕, 일본어 포함 | retro-pixel |
| **Workbench** | 레트로 컴퓨터, 가변 | retro-pixel, y2k-chrome |

### 손글씨

| 폰트 | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Caveat** | 자연스러운 메모 | editorial, claymorphism, collage, handwritten, bohemian |
| **Kalam** | 펜 손글씨 | editorial, handwritten |
| **Patrick Hand** | 또박또박 | claymorphism, handwritten |
| **Gochi Hand** | 장난기 | claymorphism, handwritten |
| **Permanent Marker** | 마커, 거침 | neo-brutalism, maximalism, collage, graffiti |
| **Shadows Into Light** | 가벼운 메모 | editorial, handwritten |
| **Reenie Beanie** | 낙서 | maximalism, handwritten |
| **Homemade Apple** | 서명 같은 필기 | editorial, handwritten |
| **Nothing You Could Do** | 흘려 쓴 필기 | editorial, handwritten |

### 스크립트

| 폰트 | 분위기 | 어울리는 스타일 |
|---|---|---|
| **Dancing Script** | 경쾌한 필기체 | editorial, bohemian |
| **Pacifico** | 서핑, 레트로 | maximalism, retro |
| **Great Vibes** | 우아한 필기체 | editorial, victorian |
| **Sacramento** | 가는 모노라인 필기 | editorial, bohemian |
| **Mrs Saint Delafield** | 서명 | editorial, victorian |

## Fontshare (64개, ITF Free Font License)

분위기 칸은 Fontshare가 붙인 용도 태그와 소개 첫 문장이다. 처음 쓰는 폰트는 fontshare.com에서 미리보기로 확인한다.

### 산세리프

| 폰트 | slug | 굵기 | 용도 태그 | 소개 |
|---|---|---|---|---|
| **Technor** | `technor` | 200–900 | Books, Poster, Magazines, Logos | Technor is a seven-weight family of constructed sans serif fonts. |
| **General Sans** | `general-sans` | 200–700 | Branding, Logos, Poster, Websites | General Sans is a rationalist sans serif typeface. |
| **Synonym** | `synonym` | 200–700 | Posters, Editorial, Books, Branding | Synonym is a family of six humanist sans serif fonts. |
| **Switzer** | `switzer` | 100–900 | Websites, Books, Logo, Magazines | Switzer is a Latin-script typeface with 18 styles; nine of those are italics. |
| **Tabular** | `tabular` | 300–700 | Code, Websites, Posters, Magazines | Tabular is a family of ten monospace sans serif fonts; there are five weights, each with a companion italic. |
| **Tanker** | `tanker` | 400–400 | Books, Banners, Editorial, Logos | Tanker is a single-weight, uppercase-only, condensed sans serif. |
| **Expose** | `expose` | 400–900 | Magazines, Branding, Banners, Apps | Expose is a constructed sans typeface for headlines and general editorial work. |
| **Pilcrow Rounded** | `pilcrow-rounded` | 400–900 | Logos, Magazines, Branding, Books | Pilcrow Rounded's design is simple and utilitarian, similar to forms found on street and highway signs around the world – or in-use on cast-metal lettering for |
| **Melodrama** | `melodrama` | 300–700 | Websites, Magazines, Branding, Banners | Melodrama is a family of five sans serif fonts whose letterforms feature very high contrast. |
| **New Title** | `new-title` | 200–700 | Magazines, Branding, Titles, Films | New Title is a typeface family for film titles and credits sequences. |
| **Alpino** | `alpino` | 100–900 | Magazines, Posters, Branding, Books | Alpino is humanist sans with a small x-height optimised for magazine design and other editorial applications. |
| **Amulya** | `amulya` | 300–700 | Books, Logos, Posters, Magazines | Joana Correia’s Amulya is a friendly-looking typeface and an outstanding humanistic sans. |
| **Author** | `author` | 200–700 | Branding, Books, Logos, Magazines | Author is a family of humanist sans serif fonts. |
| **Bespoke Sans** | `bespoke-sans` | 300–800 | Poster, Websites, Logos, Magazines | Bespoke Sans is family of humanist sans serif fonts. |
| **Bespoke Stencil** | `bespoke-stencil` | 300–800 | Magazines, Poster, Logos, Websites | Bespoke Sans Stencil is family of humanist sans serif fonts that look like stencil letters. |
| **Clash Grotesk** | `clash-grotesk` | 200–700 | Text, Editorial, Magazines, Reading | Clash Grotesk is a family of sans serif fonts, with a twist. |
| **Clash Display** | `clash-display` | 200–700 | Banners, Editorial, Magazines | Clash Grotesk Display is a family of sans serif fonts for use in large sizes. |
| **Chillax** | `chillax` | 200–700 | Magazines, Logos, Books, Banners | A new geometric sans for larger-size type in display applications, Chillax is a design bringing a 1920s modernist vibe to contemporary editorial design projects |
| **Cabinet Grotesk** | `cabinet-grotesk` | 100–900 | Books, Magazines, Editorial, Posters | Cabinet Grotesk is a family of contemporary fonts. |
| **Panchang** | `panchang` | 200–800 | Editorial, Magazines, Posters, Books | Ranging in weight from Light through ExtraBold, the Panchang family has six wide sans serif fonts on offer. |
| **Excon** | `excon` | 100–900 | Books, Editorial, Logos | Alisa Nowak’s Excon is a versatile six-weight family of sans serif fonts; it is also a tribute to the work of the master French designer Roger Excoffon (1910–19 |
| **Pally** | `pally` | 400–700 | Books, Comics, Editorial, Funny | Pally is a highly-informal sans serif design. |
| **Quilon** | `quilon` | 400–700 | Websites, Banners, Magazines, Posters | Quilon is a high-contrast sans serif family. |
| **Satoshi** | `satoshi` | 300–900 | Logos, Magazines, Branding | Satoshi is a modernist sans serif typeface. |
| **Ranade** | `ranade` | 100–700 | Magazines, Books, Editorial, Posters | Ranade is a family of sans serif fonts designed in the neo-grotesk style. |
| **Plein** | `plein` | 300–900 | Poster, Books, Magazines, Newspapers | Plein is a family of humanist-style sans serif fonts. |
| **Pramukh Rounded** | `pramukh-rounded` | 200–900 | Headlines, Books, Editorial, Text | Pramukh Rounded is a very condensed sans serif typeface in which all strokes end in round semicircular curves. |
| **Supreme** | `supreme` | 100–800 | Poster, Magazines, Books, Logo | Supreme is a large family of constructed-style sans serif fonts. |
| **RX100** | `rx-100` | 400–400 | Signage, Monospaced, Editorial, Programming | RX100 is a monospaced sans serif font. |

### 디스플레이

| 폰트 | slug | 굵기 | 용도 태그 | 소개 |
|---|---|---|---|---|
| **Kihim** | `kihim` | 400–400 | Posters, Magazines, Experimental, Banners | Kihim in a single-weight display typeface. |
| **Boxing** | `boxing` | 400–400 | Editorial, Poster, Books | Boxing is an extended ‘western’ font. |
| **Striper** | `striper` | 400–400 | Poster, Fun, Branding, Experimental | Striper is a decorative sans serif font. |
| **Kohinoor Zerone** | `kohinoor-zerone` | 100–200 | Beauty, Headlines, Posters, Lettering | Kohinoor One is the world’s thinnest font ever produced. |
| **Array** | `array` | 400–700 | Branding, Magazines, Signage, Posters | Array is a small family of electronic display style fonts. |
| **Chubbo** | `chubbo` | 200–700 | Logos, Magazines, Poster, Banners | Chubbo is a family of expressive slab serif fonts. |
| **Bevellier** | `bevellier` | 100–900 | Logos, Poster, Magazines, Websites | Bevellier is a family of condensed and simplified sans serif fonts. |
| **Kola** | `kola` | 400–400 | Editorial, Poster, Books | Kola is a technoid stencil-style sans serif font. |
| **Nippo** | `nippo` | 200–700 | Jerseys, Magazines, Sports, Posters | Nippo is a sans with an instantly-recognisable source of inspiration from the world of athletics. |
| **Sharpie** | `sharpie` | 300–900 | Posters, Magazines, Lettering, Calligraphy | Sharpie is an informal family of script fonts. |
| **Styro** | `styro` | 200–900 | Posters, Headlines, Logos | Styro is a family of modernist-style stencil fonts. |
| **Segment** | `segment` | 400–400 | Posters, Magazines, Branding, Packaging | Segment is an LCD-style display font from Frode Helland, an Oslo based designer. |
| **Stardom** | `stardom` | 400–400 | Branding, Fun, Poster, Experimental | Stardom is a singe weight serif display typeface designed to be used at extreme large sizes. |
| **Zina** | `zina` | 400–400 | Bold, Readable, Display, Grunge | Zina is a stately and elegant inline serif face for display use. |

### 세리프

| 폰트 | slug | 굵기 | 용도 태그 | 소개 |
|---|---|---|---|---|
| **Rowan** | `rowan` | 300–700 | Books, Text, Reading, Editorial | Rowan is a family of serif fonts intended for setting long passages of text for immersive reading. |
| **Gambarino** | `gambarino` | 400–400 | Magazines, Posters, Books, Editorial | Gambarino is a condensed, single-weight serif face for headlines. |
| **Gambetta** | `gambetta` | 300–700 | Newspapers, Text, Books, Magazines | Gambetta is a family of serif fonts designed for use in text. |
| **Sentient** | `sentient` | 200–700 | Poster, Newspapers, Books, Magazines | Sentient is a serif family for texts intended for immersive reading. |
| **Boska** | `boska` | 200–900 | Magazines, Poster, Websites, Books | Boska is a high-contrast ‘modern’, or Didone-style font family, with a calligraphic flourish. |
| **Aktura** | `aktura` | 400–400 | Websites, Poster, Magazines | Aktura is a medieval-style blackletter font. |
| **Bespoke Serif** | `bespoke-serif` | 300–800 | Magazines, Posters, Books, Branding | Bespoke Serif is family of serif fonts intended for use in text sizes: this is a typeface designed for reading. |
| **Bonny** | `bonny` | 100–700 | Banners, Books, Logos, Magazines | Bonny is a family of decorative serif fonts, designed for display typography. |
| **Neco** | `neco` | 400–900 | Reading, Menus, Magazines, Books | Neco is a family of serif fonts, designed for use in headlines as well as smaller-sized texts of short and medium length. |
| **Erode** | `erode` | 300–700 | Magazines, Posters, Books, Branding | Named after a city in Tamil Nadu, Erode is a serif typeface for the Latin script. |
| **Zodiak** | `zodiak` | 100–900 | Editorial, Magazines, Books | Zodiak is a family of fonts with sturdy serifs. |
| **Recia** | `recia` | 300–700 | Code, Posters, Websites, Magazines | Recia is Carlos De Toro’s debut typeface with ITF. |
| **Paquito** | `paquito` | 400–700 | Funny, Books, Comics, Informal | Paquito is a small family of serif fonts for use in display sizes. |

### 슬랩

| 폰트 | slug | 굵기 | 용도 태그 | 소개 |
|---|---|---|---|---|
| **Bespoke Slab** | `bespoke-slab` | 300–800 | Poster, Magazines, Websites, Logos | Bespoke Slab is family of humanist slab serif fonts. |
| **Hoover** | `hoover` | 100–700 | Logo, Magazines, Poster, Banners | Hoover is a family of five monolinear slab serif fonts. |
| **Trench Slab** | `trench-slab` | 300–700 | Magazines, Logos, Headlines, Publishing | Trench Slab is part of the Trench superfamily, which also includes Trench Round, and a special series of fonts designed to print text is very small point sizes |

### 손글씨

| 폰트 | slug | 굵기 | 용도 태그 | 소개 |
|---|---|---|---|---|
| **Comico** | `comico` | 400–400 | Handwriting, Comic, Editorial, Funny | Comico is an informal handwriting font. |

### 스크립트

| 폰트 | slug | 굵기 | 용도 태그 | 소개 |
|---|---|---|---|---|
| **Britney** | `britney` | 300–1000 | Packaging, Poster, Screen, Websites | Britney is a quirky display family with very high contrast and double strokes on the stems. |
| **Pencerio** | `pencerio` | - | Wedding, Titles, Signboards, Packaging | Pencerio is a new take on a formal style of handwriting. |
| **Rosaline** | `rosaline` | 400–400 | Fashion, Editorial | Rosaline is a casual script face, inspired by brush-lettering. |
| **Telma** | `telma` | 300–900 | Invitation, Logos, Poster, Banners | Telma is a family of informal script fonts. |

## 구독이 필요한 폰트 (후보에 나오지 않음)

무료가 아니어서 자동으로 고르지 않는다. 사용자가 이름을 말하고 Adobe Creative Cloud 구독이 있을 때만 쓴다.

- **Cooper Black** (fonts.adobe.com/fonts/cooper-black): 둥글고 두꺼운 세리프. Adobe Fonts에서 웹 프로젝트를 만들어 추가하면 웹사이트에 쓸 수 있다. 자체 서버에 파일을 올리려면 별도 라이선스가 필요하다. 사용자에게 프로젝트의 `<link>` 코드와 CSS 이름을 받아 쓴다. 구독이 없으면 무료인 Caprasimo나 Corben Bold를 권한다.

## 더 찾고 싶을 때

아래는 목록에 넣지 않았지만 무료 상업 사용이 가능한 폰트를 모아 둔 곳이다. 대부분 CDN이 없어 파일을 내려받아 직접 호스팅해야 하고, 폰트마다 라이선스 파일(OFL.txt 등)을 확인한다.
- Velvetyne (velvetyne.fr): 실험적 디스플레이, OFL
- uncut.wtf: 오픈소스 폰트 큐레이션
- Collletttivo (collletttivo.it): 이탈리아 오픈소스 파운드리
- The League of Moveable Type (theleagueofmoveabletype.com): League Gothic, League Spartan 등
- Open Foundry (open-foundry.com): 오픈소스 큐레이션
