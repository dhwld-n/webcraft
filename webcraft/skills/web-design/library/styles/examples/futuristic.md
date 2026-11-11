# futuristic 모범 섹션

**배치를 따라 하지 않는다.** 이 코드는 한 가지 예일 뿐이고, 결과물의 첫 화면이나 섹션 배치가 이 예와 같으면 검수에서 큰 문제로 잡힌다. 배울 것은 아래 "배울 점"의 원리와 수치(크기 비율, 여백 리듬, 선, 숫자 처리, 접근성)다. 첫 화면 구도와 섹션 틀은 구도 스케치에서 이 사이트의 콘셉트로 새로 정한다. 문구는 모두 자리표시다.

두 섹션은 틀이 서로 다르다: 가운데 물건과 지시선으로 연결된 수치 라벨(히어로), 눈금자 위에 놓인 단계 표.

배울 점:
- 물건 하나 + 라벨 셋. 라벨마다 1px 지시선이 물건으로 이어지고 끝에 점이 있다
- 영문 제목은 자간을 넓게(0.06em), 한글 설명은 자간 0
- 화면 위아래 가장자리에 작은 메타 정보 (단계, 좌표)
- 단계 표는 눈금자 눈금(`repeating-linear-gradient`) 위에 놓인다

```html
<header class="ft-hero">
  <p class="ft-meta ft-meta--top"><span>STAGE 02</span><span>궤도 진입 준비</span></p>
  <div class="ft-object" role="img" aria-label="소형 위성 자리표시"></div>
  <dl class="ft-labels">
    <div class="ft-label ft-label--a"><dt>무게</dt><dd>4.8 kg</dd></div>
    <div class="ft-label ft-label--b"><dt>궤도</dt><dd>550 km</dd></div>
    <div class="ft-label ft-label--c"><dt>수명</dt><dd>7년</dd></div>
  </dl>
  <h1 class="ft-hero__title">ORBIT ONE</h1>
</header>

<section class="ft-steps" aria-labelledby="ft-s">
  <h2 id="ft-s" class="ft-steps__title">발사까지</h2>
  <ol>
    <li><b>T-90</b><span>조립 완료</span></li>
    <li><b>T-30</b><span>진동 시험</span></li>
    <li><b>T-0</b><span>발사</span></li>
  </ol>
</section>
```

```css
/* 수치 토큰은 스타일 카드의 :root를 쓴다 */
.ft-hero { box-sizing: border-box; position: relative; min-height: 100svh; display: grid; place-items: center; padding: var(--margin); background: var(--space); color: #e9f6ff; overflow: hidden; }
.ft-meta { position: absolute; left: var(--margin); right: var(--margin); display: flex; justify-content: space-between; margin: 0; font-family: var(--font-num); font-size: var(--fs-xs); letter-spacing: var(--ls-label); opacity: 0.7; }
.ft-meta--top { top: var(--margin); }
.ft-meta span + span { letter-spacing: 0; }
.ft-object { width: clamp(160px, 22vw, 300px); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff 0 4%, #9fb7c9 30%, #1b2633 72%); box-shadow: var(--glow-edge); }
.ft-labels { position: absolute; inset: 0; margin: 0; pointer-events: none; }
.ft-label { position: absolute; display: grid; gap: 2px; padding-left: 10px; border-left: var(--hairline); }
.ft-label::before { content: ""; position: absolute; top: 50%; height: 1px; background: currentColor; opacity: 0.35; width: var(--leader); }
.ft-label::after { content: ""; position: absolute; top: calc(50% - 3px); width: 6px; height: 6px; border-radius: 50%; background: var(--glow); }
.ft-label--a { left: 14%; top: 30%; --leader: 18vw; } .ft-label--a::before { left: 100%; } .ft-label--a::after { left: calc(100% + 18vw); }
.ft-label--b { right: 12%; top: 44%; --leader: 14vw; text-align: right; border-left: 0; border-right: var(--hairline); padding: 0 10px 0 0; } .ft-label--b::before { right: 100%; } .ft-label--b::after { right: calc(100% + 14vw); }
.ft-label--c { left: 20%; bottom: 22%; --leader: 12vw; } .ft-label--c::before { left: 100%; } .ft-label--c::after { left: calc(100% + 12vw); }
.ft-label dt { font-size: var(--fs-xs); opacity: 0.7; }
.ft-label dd { margin: 0; font-family: var(--font-num); font-size: var(--fs-lg); font-variant-numeric: tabular-nums; }
.ft-label::before { transform-origin: left; animation: ft-line var(--dur-2) var(--ease) both; }
.ft-label--b::before { transform-origin: right; }
@keyframes ft-line { from { scale: 0 1; } }
.ft-hero__title { position: absolute; bottom: var(--margin); left: var(--margin); margin: 0; font-family: var(--font-display); font-size: var(--fs-hero); font-weight: var(--fw-head); letter-spacing: var(--ls-head); line-height: var(--lh-head); }

.ft-steps { box-sizing: border-box; padding: calc(var(--gap) * 5) var(--margin); background: #eef0f2; color: #0b1016; }
.ft-steps__title { margin: 0 0 var(--gap); font-size: var(--fs-sm); font-weight: 500; }
.ft-steps ol { display: grid; grid-template-columns: repeat(3, 1fr); margin: 0; padding: 28px 0 0; list-style: none;
  background: repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 24px) 0 0 / 100% 10px no-repeat; }
.ft-steps li { display: grid; gap: 6px; padding-right: var(--gap); }
.ft-steps b { font-family: var(--font-num); font-size: var(--fs-hero); font-weight: 400; letter-spacing: -0.02em; line-height: 1; }
.ft-steps span { font-size: var(--fs-base); font-weight: var(--fw-body); }

@media (max-width: 760px) {
  .ft-labels { position: static; display: grid; gap: 12px; margin-top: var(--gap); }
  .ft-label { position: static; text-align: left !important; border-right: 0 !important; border-left: var(--hairline) !important; padding: 0 0 0 10px !important; }
  .ft-label::before, .ft-label::after { display: none; }
  .ft-hero__title { position: static; }
  .ft-steps ol { grid-template-columns: 1fr; gap: var(--gap); }
}
@media (prefers-reduced-motion: reduce) { .ft-label::before { animation: none; } }
```

라벨 위치와 지시선 길이는 물건 크기에 맞춰 손으로 맞춘다. 물건을 3D(`three-stage`)로 바꾸면 라벨은 그대로 두고 지시선 끝점만 물건 위 실제 부위에 맞춘다.
