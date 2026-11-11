# editorial 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

세 섹션은 틀이 서로 다르다: 펼침면 표지, 긴 글(첫 글자 장식, 여백 주석, 튀어나온 인용), 꽉 찬 사진과 번호 붙은 캡션.

배울 점:
- 제목이 화면 아래쪽 왼쪽에 걸쳐 있다. 가운데 정렬 제목이 없다
- 본문은 4~9열, 주석은 10~12열. 한 단 가운데 정렬이 아니라 비대칭이다
- 인용은 본문 폭을 벗어나 2~11열로 튀어나와 리듬을 깬다
- 장식은 괘선, 첫 글자, 번호, 작은 대문자뿐. 카드, 그림자, 아이콘이 없다

```html
<header class="ed-cover">
  <p class="ed-cover__issue">제 12호 · 2026 겨울</p>
  <h1 class="ed-cover__title">새벽 네 시의 반죽</h1>
  <p class="ed-cover__stand">서른 해 동안 같은 시각에 불을 켠 빵집의 기록. 손이 기억하는 온도와, 그 온도를 지키려고 바꾼 것들에 대하여.</p>
  <p class="ed-cover__byline">글 자리표시 · 사진 자리표시</p>
</header>

<article class="ed-read">
  <p class="ed-read__lead">처음 가게를 연 겨울, 오븐은 지금보다 두 배쯤 컸다. 예열에만 한 시간이 걸렸고, 그 한 시간 동안 할 수 있는 일은 반죽을 들여다보는 것뿐이었다.</p>
  <p>문단 자리표시. 본문은 열아홉 픽셀, 한 줄에 서른 자 남짓으로 읽기 편한 폭을 지킨다. 문단 사이는 빈 줄 대신 행간 하나만큼 띄운다.</p>
  <aside class="ed-read__note"><span class="ed-num">1</span> 여백 주석 자리표시. 본문의 한 단어에 붙는 짧은 설명.</aside>
  <blockquote class="ed-read__quote"><p>반죽은 거짓말을 하지 않아요. 내가 서두르면 빵이 먼저 압니다.</p><cite>인용 출처 자리표시</cite></blockquote>
  <p>문단 자리표시. 인용 뒤에는 다시 본문 폭으로 돌아온다.</p>
</article>

<figure class="ed-plate">
  <div class="ed-plate__img" role="img" aria-label="사진 자리표시: 새벽 작업대"></div>
  <figcaption><span class="ed-plate__cap"><span class="ed-num">그림 2</span> 캡션 자리표시. 사진이 무엇인지, 언제 찍었는지 한 줄.</span></figcaption>
</figure>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.ed-cover, .ed-read, .ed-plate figcaption {
  display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--gutter);
  max-width: var(--max); margin-inline: auto; padding-inline: var(--margin);
}
.ed-num { font-family: var(--font-num); font-variant-numeric: oldstyle-nums; letter-spacing: var(--track-caps); }

/* 표지: 위에 호수, 아래쪽에 제목이 화면 폭을 걸친다 */
.ed-cover { min-height: 100svh; grid-template-rows: auto 1fr auto auto; padding-block: var(--s-4); row-gap: var(--s-3); }
.ed-cover__issue { grid-column: 9 / -1; margin: 0; font-size: var(--fs-cap); letter-spacing: var(--track-caps); text-align: right; border-top: var(--rule-strong); padding-top: var(--s-1); }
.ed-cover__title {
  grid-column: 1 / span 11; grid-row: 3; margin: 0; font-size: var(--fs-hero); line-height: var(--lh-hero);
  letter-spacing: var(--track-hero); font-weight: 400; word-break: keep-all;
}
.ed-cover__stand { grid-column: 1 / span 5; grid-row: 4; margin: 0; font-size: var(--fs-md); line-height: 1.45; word-break: keep-all; }
.ed-cover__byline { grid-column: 9 / -1; grid-row: 4; align-self: end; margin: 0; font-size: var(--fs-cap); color: var(--muted); text-align: right; }

/* 긴 글: 본문 4~9열, 주석 10~12열, 인용은 튀어나온다 */
.ed-read { padding-block: var(--section); font-size: var(--fs-base); line-height: var(--lh-body); }
.ed-read > p { grid-column: 4 / span 6; margin: 0 0 1.72em; max-width: var(--measure); word-break: keep-all; }
.ed-read__lead::first-letter {
  float: left; font-family: var(--font-display); font-size: var(--fs-drop); line-height: 0.82; padding: 0.06em 0.08em 0 0;
}
.ed-read__note { grid-column: 10 / -1; grid-row: 2; align-self: start; margin: 0; font-size: var(--fs-cap); line-height: 1.5; color: var(--muted); border-top: var(--rule); padding-top: var(--s-1); }
.ed-read__quote { grid-column: 2 / span 10; margin: var(--s-4) 0 var(--s-5); padding-top: var(--s-3); border-top: var(--rule-strong); }
.ed-read__quote p { margin: 0; font-family: var(--font-display); font-size: var(--fs-quote); line-height: 1.12; font-style: italic; word-break: keep-all; }
.ed-read__quote cite { display: block; margin-top: var(--s-2); font-size: var(--fs-cap); font-style: normal; letter-spacing: var(--track-caps); color: var(--muted); }

/* 사진: 화면 끝까지 꽉, 캡션은 오른쪽 아래 좁게 */
.ed-plate { margin: 0 0 var(--section); }
.ed-plate__img { aspect-ratio: 16 / 9; max-height: 92svh; width: 100%; background: color-mix(in srgb, var(--text) 12%, var(--bg)); }
.ed-plate figcaption { padding-top: var(--s-2); font-size: var(--fs-cap); line-height: 1.5; color: var(--muted); }
.ed-plate__cap { grid-column: 8 / -1; }
.ed-plate__cap .ed-num { color: var(--text); margin-right: var(--s-1); }

@media (max-width: 860px) {
  .ed-cover__issue, .ed-cover__title, .ed-cover__stand, .ed-cover__byline,
  .ed-read > p, .ed-read__note, .ed-read__quote { grid-column: 1 / -1; grid-row: auto; text-align: left; }
  .ed-read__note { margin-bottom: var(--s-3); }
  .ed-plate__cap { grid-column: 1 / -1; }
}
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto; } }
```
