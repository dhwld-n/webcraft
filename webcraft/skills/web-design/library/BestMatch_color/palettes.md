# BestMatch_color

사용자가 고른 색 조합 71개. **세 번째 색이 포인트(강조) 색이다.** 첫째와 둘째는 바탕과 주조, 또는 바탕과 글자로 쓴다. 어느 쪽을 바탕으로 쓸지는 정하지 않았다 (밝기와 분위기로 정한다).

## 쓰는 법
- `node SCRIPTS/lib.mjs colors <스타일 키> [개수]`로 그 스타일에 어울리는 조합을 뽑는다. system-designer의 bundle에도 5개가 들어간다
- 세 색을 역할에 넣는다: 첫째·둘째는 `bg`와 `text`(또는 `surface`), 셋째는 `accent`. 나머지 역할(`muted`, `border`, `on-accent`)은 이 세 색의 명도를 바꿔 만든다
- 포인트 색은 화면의 5~15%만: 버튼, 밑줄, 숫자 하나, 스티커. 면으로 크게 쓰지 않는다
- **글자 대비:** "첫째↔둘째"가 "면끼리만"이면 둘을 글자-바탕 쌍으로 쓰지 않는다. 글자는 검정 `#111`이나 흰색으로 따로 정한다. 포인트 대비가 3 미만인 바탕에서는 포인트 색을 글자로 쓰지 않는다 (버튼 면으로만)
- 고른 뒤에는 늘 `contrast.mjs`로 다시 검사한다

## 표 읽는 법
- 대비는 WCAG 대비 비율. 본문 글자 4.5 이상, 큰 글자 3 이상
- 어울리는 스타일과 분위기는 색의 밝기·채도·색상으로 **자동 분류**했다. 맞지 않으면 손으로 고친다
- `*`: 이름으로 받은 색을 hex로 바꾼 것 (bubblegum pink → #FFC1CC)
- 넷째: 받은 조합에 따로 붙어 있던 대체 포인트
- 겹쳐 받은 조합은 한 번만 넣었다: #0593C6 & #FCFFFF & #D83995 (3번), #121111 & #F9F9F9 & #D485FC (2번)

## 조합

| id | 첫째 | 둘째 | 포인트 | 넷째 | 색 이름 | 첫째↔둘째 | 대비 | 포인트↔첫째 | 포인트↔둘째 | 어울리는 스타일 | 분위기 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| bm-01 | `#FD671C` | `#FDBDC8` | `#EDEB59` |  | 주황 + 연빨강 + 노랑 | 면끼리만 | 1.9 | 2.3 | 1.3 | maximalism, pop-art | 밝음, 쨍함 |
| bm-02 | `#0F7FC4` | `#01047B` | `#DEF434` |  | 파랑 + 짙은 파랑 + 라임 | 큰 글자만 | 3.7 | 3.5 | 13.1 | y2k-chrome, futuristic, maximalism, pop-art | 밝음, 쨍함 |
| bm-03 | `#060507` | `#CBCFD2` | `#F74B01` |  | 짙은 보라 + 회색 + 주황 | 본문 가능 | 13.0 | 5.8 | 2.2 | dark-tech | 어두움 |
| bm-04 | `#111313` | `#123DD0` | `#E5FF00` |  | 검정 + 파랑 + 라임 | 면끼리만 | 2.3 | 16.5 | 7.2 | cyberpunk, futuristic, dark-tech, y2k-chrome | 어두움, 형광 |
| bm-05 | `#F2EBDD` | `#20201E` | `#E52620` |  | 연노랑 + 검정 + 빨강 | 본문 가능 | 13.8 | 3.8 | 3.6 | editorial, retro | 밝음, 따뜻함 |
| bm-06 | `#4A275E` | `#E3D9EF` | `#FFAA76` |  | 보라 + 연보라 + 주황 | 본문 가능 | 8.9 | 6.5 | 1.4 | dark-tech | 어두움 |
| bm-07 | `#222526` | `#CCDCEF` | `#FF6574` |  | 검정 + 연파랑 + 빨강 | 본문 가능 | 11.1 | 5.4 | 2.0 | dark-tech | 어두움 |
| bm-08 | `#E9E5D6` | `#2589D8` | `#FF783D` |  | 연노랑 + 파랑 + 주황 | 면끼리만 | 2.9 | 2.1 | 1.4 | editorial, retro, maximalism, pop-art | 밝음, 따뜻함, 쨍함 |
| bm-09 | `#F5EBCC` | `#F34E3D` | `#55263D` |  | 연노랑 + 빨강 + 짙은 자홍 | 면끼리만 | 3.0 | 10.2 | 3.4 | editorial | 밝음 |
| bm-10 | `#010511` | `#0046DE` | `#FEB192` |  | 짙은 파랑 + 파랑 + 주황 | 면끼리만 | 2.8 | 11.6 | 4.1 | dark-tech | 어두움 |
| bm-11 | `#C48B67` | `#693822` | `#FE4D03` |  | 주황 + 주황 + 주황 | 큰 글자만 | 3.3 | 1.2 | 2.9 | retro, bohemian | 밝음, 흙빛 |
| bm-12 | `#0593C6` | `#FCFFFF` | `#D83995` |  | 파랑 + 연청록 + 자홍 | 큰 글자만 | 3.5 | 1.2 | 4.2 | maximalism, pop-art | 밝음, 쨍함 |
| bm-13 | `#0A0F1E` | `#8FA3C7` | `#E8743B` |  | 짙은 파랑 + 파랑 + 주황 | 본문 가능 | 7.5 | 6.4 | 1.2 | dark-tech | 어두움 |
| bm-14 | `#050506` | `#7D8B5E` | `#D9A53A` |  | 검정 + 라임 + 노랑 | 본문 가능 | 5.6 | 9.1 | 1.6 | retro, bohemian | 어두움, 흙빛 |
| bm-15 | `#F1EEE8` | `#0E4F4A` | `#FF6F5E` |  | 연노랑 + 짙은 청록 + 빨강 | 본문 가능 | 8.1 | 2.4 | 3.4 | minimalism, editorial, retro | 밝음, 따뜻함 |
| bm-16 | `#111217` | `#DFE5EB` | `#EF233C` |  | 짙은 파랑 + 연파랑 + 빨강 | 본문 가능 | 14.7 | 4.4 | 3.3 | dark-tech | 어두움 |
| bm-17 | `#18181C` | `#723BFA` | `#B9F500` |  | 검정 + 보라 + 라임 | 큰 글자만 | 3.1 | 13.6 | 4.3 | cyberpunk, futuristic, dark-tech, y2k-chrome | 어두움, 형광 |
| bm-18 | `#BC164D` | `#FFD0DF` | `#FFE164` |  | 빨강 + 연빨강 + 노랑 | 본문 가능 | 4.6 | 4.8 | 1.1 | maximalism, pop-art, y2k-chrome | 밝음, 쨍함 |
| bm-19 | `#012B1D` | `#01B36C` | `#FEB192` |  | 짙은 청록 + 초록 + 주황 | 본문 가능 | 5.6 | 8.7 | 1.6 | dark-tech | 어두움 |
| bm-20 | `#03203D` | `#639CC5` | `#EB2F33` |  | 짙은 파랑 + 파랑 + 빨강 | 본문 가능 | 5.6 | 3.9 | 1.4 | dark-tech, maximalism, pop-art | 어두움, 쨍함 |
| bm-21 | `#000002` | `#FEFEFE` | `#FA0980` |  | 짙은 파랑 + 흰색 + 자홍 | 본문 가능 | 20.8 | 5.4 | 3.8 | cyberpunk, futuristic, dark-tech, minimalism | 어두움, 형광 |
| bm-22 | `#FAC7E1` | `#A5467C` | `#004AFD` |  | 연자홍 + 자홍 + 파랑 | 큰 글자만 | 3.8 | 4.2 | 1.1 | maximalism, pop-art, y2k-chrome | 밝음, 쨍함 |
| bm-23 | `#6D0317` | `#E52150` | `#F4EB06` |  | 짙은 빨강 + 빨강 + 노랑 | 면끼리만 | 2.8 | 10.0 | 3.6 | maximalism, pop-art | 어두움, 쨍함 |
| bm-24 | `#121111` | `#F9F9F9` | `#D485FC` |  | 검정 + 흰색 + 보라 | 본문 가능 | 17.9 | 7.7 | 2.3 | dark-tech, minimalism, editorial, aurora | 어두움 |
| bm-25 | `#FD550A` | `#015D47` | `#E0F354` |  | 주황 + 짙은 청록 + 라임 | 면끼리만 | 2.4 | 2.6 | 6.4 | y2k-chrome, futuristic, maximalism, pop-art | 밝음, 쨍함 |
| bm-26 | `#01010D` | `#6331FB` | `#88F9C0` |  | 짙은 파랑 + 보라 + 초록 | 큰 글자만 | 3.3 | 16.2 | 4.9 | cyberpunk, futuristic, dark-tech, aurora | 어두움, 형광 |
| bm-27 | `#DBF2FC` | `#072D59` | `#FD6E88` |  | 연파랑 + 짙은 파랑 + 빨강 | 본문 가능 | 11.9 | 2.3 | 5.1 | editorial | 밝음 |
| bm-28 | `#21232E` | `#105BFF` | `#FE8500` |  | 짙은 파랑 + 파랑 + 주황 | 면끼리만 | 2.9 | 6.4 | 2.2 | dark-tech, maximalism, pop-art | 어두움, 쨍함 |
| bm-29 | `#F0F0F0` | `#105BFF` | `#FFC1CC*` |  | 흰색 + 파랑 + 연빨강 | 본문 가능 | 4.7 | 1.3 | 3.5 | minimalism, editorial, vector-art, claymorphism | 밝음, 부드러움 |
| bm-30 | `#74FFED` | `#171F44` | `#FE81D1` |  | 청록 + 짙은 파랑 + 자홍 | 본문 가능 | 13.1 | 1.9 | 7.0 | maximalism, pop-art | 밝음, 쨍함 |
| bm-31 | `#000000` | `#6D8F63` | `#39FF88` |  | 검정 + 초록 + 초록 | 본문 가능 | 5.8 | 15.8 | 2.7 | cyberpunk, futuristic | 어두움, 형광 |
| bm-32 | `#39FA0E` | `#000000` | `#FF0000` |  | 초록 + 검정 + 빨강 | 본문 가능 | 14.9 | 2.8 | 5.3 | editorial | 밝음 |
| bm-33 | `#F04400` | `#FFD91A` | `#000000` | `#D0F030` | 주황 + 노랑 + 검정 | 면끼리만 | 2.7 | 5.5 | 15.2 | pop-art, neo-brutalism | 밝음 |
| bm-34 | `#FB8500` | `#8ECAE6` | `#023047` |  | 주황 + 파랑 + 짙은 파랑 | 면끼리만 | 1.4 | 5.6 | 7.7 | maximalism, pop-art | 밝음, 쨍함 |
| bm-35 | `#0C0C0A` | `#F15419` | `#77E7FE` |  | 검정 + 주황 + 청록 | 본문 가능 | 5.6 | 13.7 | 2.4 | cyberpunk, futuristic | 어두움, 형광 |
| bm-36 | `#8DB9F0` | `#E9E8F8` | `#F5B69E` |  | 파랑 + 연파랑 + 주황 | 면끼리만 | 1.7 | 1.2 | 1.4 | minimalism, editorial, vector-art, claymorphism | 밝음, 부드러움 |
| bm-37 | `#0B3048` | `#F2F0E9` | `#B9F12F` |  | 짙은 파랑 + 연노랑 + 라임 | 본문 가능 | 12.0 | 10.2 | 1.2 | cyberpunk, futuristic, dark-tech, y2k-chrome | 어두움, 형광, 따뜻함 |
| bm-38 | `#1C1D20` | `#F2F4F1` | `#FFC928` |  | 검정 + 흰색 + 노랑 | 본문 가능 | 15.2 | 10.9 | 1.4 | swiss, minimalism, editorial | 어두움 |
| bm-39 | `#013CD3` | `#FEFDFE` | `#C7FC02` |  | 파랑 + 연자홍 + 라임 | 본문 가능 | 8.0 | 6.7 | 1.2 | y2k-chrome, futuristic, minimalism, editorial | 밝음, 쨍함 |
| bm-40 | `#250104` | `#071A06` | `#CDF73D` |  | 짙은 빨강 + 짙은 초록 + 라임 | 면끼리만 | 1.1 | 15.6 | 14.6 | cyberpunk, futuristic, y2k-chrome | 어두움, 형광 |
| bm-41 | `#3283BE` | `#FEFDFE` | `#FD614B` |  | 파랑 + 연자홍 + 빨강 | 큰 글자만 | 4.0 | 1.4 | 3.0 | minimalism, editorial, maximalism, pop-art | 밝음, 쨍함 |
| bm-42 | `#08090B` | `#F5F3EF` | `#FFC900` |  | 짙은 파랑 + 연주황 + 노랑 | 본문 가능 | 18.0 | 12.9 | 1.4 | minimalism, editorial, retro | 어두움, 따뜻함 |
| bm-43 | `#FAF8F3` | `#08090B` | `#CDF22B` |  | 연노랑 + 짙은 파랑 + 라임 | 본문 가능 | 18.8 | 1.2 | 15.5 | y2k-chrome, futuristic, minimalism, editorial | 밝음, 따뜻함 |
| bm-44 | `#F3EEE8` | `#17645F` | `#FF6854` |  | 연주황 + 짙은 청록 + 빨강 | 본문 가능 | 6.0 | 2.5 | 2.4 | minimalism, editorial, retro | 밝음, 따뜻함 |
| bm-45 | `#E13A26` | `#831613` | `#FEEE65` |  | 빨강 + 빨강 + 노랑 | 면끼리만 | 2.3 | 3.6 | 8.4 | maximalism, pop-art | 밝음, 쨍함 |
| bm-46 | `#010102` | `#AD96F1` | `#58F6B1` |  | 짙은 파랑 + 보라 + 초록 | 본문 가능 | 8.4 | 15.1 | 1.8 | cyberpunk, futuristic, dark-tech, aurora | 어두움, 형광 |
| bm-47 | `#8FB4E3` | `#0D1A33` | `#FF6A2B` |  | 파랑 + 짙은 파랑 + 주황 | 본문 가능 | 8.1 | 1.3 | 6.1 | maximalism, pop-art | 밝음, 쨍함 |
| bm-48 | `#4A0F14` | `#F6B27A` | `#19D3FF` |  | 짙은 빨강 + 주황 + 청록 | 본문 가능 | 8.4 | 8.6 | 1.0 | cyberpunk, futuristic, maximalism, pop-art | 어두움, 형광, 쨍함 |
| bm-49 | `#F3F2EE` | `#0B0B0C` | `#B6FF2E` |  | 연노랑 + 검정 + 라임 | 본문 가능 | 17.6 | 1.1 | 16.2 | y2k-chrome, futuristic, minimalism, editorial | 밝음, 따뜻함 |
| bm-50 | `#95191D` | `#F6F6EA` | `#FDE827` |  | 빨강 + 연노랑 + 노랑 | 본문 가능 | 7.9 | 6.9 | 1.2 | minimalism, editorial, retro, maximalism | 밝음, 따뜻함, 쨍함 |
| bm-51 | `#0042AC` | `#00D3FB` | `#83FD80` |  | 파랑 + 청록 + 초록 | 본문 가능 | 4.9 | 6.9 | 1.4 | maximalism, pop-art | 밝음, 쨍함 |
| bm-52 | `#0B0B0C` | `#FFFFFF` | `#C6F432` |  | 검정 + 흰색 + 라임 | 본문 가능 | 19.7 | 15.4 | 1.3 | cyberpunk, futuristic, y2k-chrome, minimalism | 어두움, 형광 |
| bm-53 | `#14213D` | `#F4EDE0` | `#FF6B5B` |  | 짙은 파랑 + 연주황 + 빨강 | 본문 가능 | 13.7 | 5.7 | 2.4 | dark-tech, editorial, retro | 어두움, 따뜻함 |
| bm-54 | `#1F3D2B` | `#EBDCC4` | `#8B5CF6` |  | 짙은 초록 + 연주황 + 보라 | 본문 가능 | 8.8 | 2.8 | 3.1 | dark-tech, aurora | 어두움 |
| bm-55 | `#A8C9C8` | `#FFFFFF` | `#F45B0B` |  | 청록 + 흰색 + 주황 | 면끼리만 | 1.8 | 1.9 | 3.3 | minimalism, editorial, maximalism, pop-art | 밝음, 쨍함 |
| bm-56 | `#FDEE00` | `#0F0A87` | `#FC0C94` |  | 노랑 + 파랑 + 자홍 | 본문 가능 | 12.3 | 3.1 | 4.0 | swiss, pop-art, maximalism, y2k-chrome | 밝음, 쨍함 |
| bm-57 | `#7E03FC` | `#440499` | `#FBD7E6` |  | 보라 + 보라 + 연빨강 | 면끼리만 | 1.9 | 4.8 | 9.3 | maximalism, pop-art, y2k-chrome | 밝음, 쨍함 |
| bm-58 | `#20309A` | `#FFFFFF` | `#BB232B` |  | 파랑 + 흰색 + 빨강 | 본문 가능 | 10.8 | 1.7 | 6.2 | minimalism, editorial, maximalism, pop-art | 밝음, 쨍함 |
| bm-59 | `#BFE9FE` | `#6F3DFF` | `#B7B7B7` |  | 연파랑 + 보라 + 회색 | 큰 글자만 | 4.3 | 1.6 | 2.8 | editorial | 밝음 |
| bm-60 | `#F3E6D7` | `#9B7ED6` | `#E4FF3B` |  | 연주황 + 보라 + 라임 | 면끼리만 | 2.7 | 1.1 | 2.9 | y2k-chrome, futuristic, editorial, retro | 밝음, 따뜻함, 쨍함 |
| bm-61 | `#080808` | `#CDCBCA` | `#D41514` |  | 검정 + 회색 + 빨강 | 본문 가능 | 12.4 | 3.7 | 3.3 | swiss, minimalism | 어두움 |
| bm-62 | `#0002CC` | `#01000C` | `#BF032F` |  | 파랑 + 짙은 파랑 + 빨강 | 면끼리만 | 1.9 | 1.7 | 3.2 | dark-tech | 어두움 |
| bm-63 | `#929DA7` | `#17191C` | `#FF4B32` |  | 회색 + 검정 + 빨강 | 본문 가능 | 6.4 | 1.2 | 5.3 | swiss, minimalism | 밝음 |
| bm-64 | `#02070A` | `#0297DE` | `#FC734D` |  | 짙은 파랑 + 파랑 + 빨강 | 본문 가능 | 6.3 | 7.4 | 1.2 | dark-tech | 어두움 |
| bm-65 | `#09318D` | `#FFFFFF` | `#FD91CC` |  | 파랑 + 흰색 + 자홍 | 본문 가능 | 11.4 | 5.5 | 2.1 | cyberpunk, futuristic, dark-tech, minimalism | 어두움, 형광, 부드러움 |
| bm-66 | `#030407` | `#1558C9` | `#D4FF24` |  | 짙은 파랑 + 파랑 + 라임 | 큰 글자만 | 3.2 | 17.7 | 5.5 | cyberpunk, futuristic, dark-tech, y2k-chrome | 어두움, 형광 |
| bm-67 | `#E7B0DE` | `#400849` | `#FF5A0A` |  | 자홍 + 짙은 자홍 + 주황 | 본문 가능 | 8.6 | 1.7 | 5.0 | y2k-chrome | 밝음 |
| bm-68 | `#A5A79B` | `#E8D2B5` | `#590907` |  | 회색 + 연주황 + 짙은 빨강 | 면끼리만 | 1.7 | 5.9 | 9.8 | editorial | 밝음 |
| bm-69 | `#0A0A0A` | `#007BA7` | `#FF2D95` |  | 검정 + 파랑 + 자홍 | 큰 글자만 | 4.1 | 5.7 | 1.4 | cyberpunk, futuristic, dark-tech, y2k-chrome | 어두움, 형광 |
| bm-70 | `#DDE3E8` | `#3A0F34` | `#EAAA00` |  | 연파랑 + 짙은 자홍 + 노랑 | 본문 가능 | 12.5 | 1.6 | 7.9 | editorial | 밝음 |
| bm-71 | `#6F4E37` | `#E5E4E2` | `#E6E0F0` |  | 주황 + 흰색 + 연보라 | 본문 가능 | 5.9 | 5.8 | 1.0 | editorial, retro, bohemian | 밝음, 따뜻함, 흙빛 |
