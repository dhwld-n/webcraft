# ai-stream

- 종류: 제품 화면 / 글자
- 강도: 낮음
- 어울리는 스타일: dark-tech, minimalism, swiss, bento-grid
- 의존성: 없음
- 참고: beautiful-ui의 AI 대기 화면 원리 (생각 단계가 하나씩 켜지고 답이 글자 단위로 흘러나옴). 코드는 새로 썼다

AI 기능을 소개하는 칸에서, 단계 목록이 대기 → 진행 중(돌아가는 고리) → 완료(체크)로 하나씩 바뀌고, 이어서 답이 글자 몇 개씩 흘러나온다. 끝에는 깜빡이는 커서가 잠깐 남는다. 화면 전체 데모가 필요하면 ui-builder(stageshow)를 쓰고, 이것은 카드 하나 안의 작은 연출용이다.

## 코드

```html
<div class="ai-demo" data-ai-demo>
  <ol class="ai-steps">
    <li>질문 읽는 중</li>
    <li>장부에서 지난달 기록 찾는 중</li>
    <li>답 정리하는 중</li>
  </ol>
  <p class="sr-only">지난달 식비는 412,000원으로, 그 전달보다 8% 줄었어요.</p>
  <p class="ai-answer" aria-hidden="true">지난달 식비는 412,000원으로, 그 전달보다 8% 줄었어요.</p>
  <button class="ai-replay" type="button">다시 보기</button>
</div>
```

```css
.ai-steps { list-style: none; margin: 0 0 16px; padding: 0; display: grid; gap: 8px; }
.ai-steps li { display: flex; align-items: center; gap: 10px; opacity: 0.45; transition: opacity 0.3s; }
.ai-steps li::before {
  content: '';
  flex: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid currentColor;
  box-sizing: border-box;
}
.ai-steps li[data-state='run'] { opacity: 1; }
.ai-steps li[data-state='run']::before { border-top-color: transparent; animation: ai-spin 0.8s linear infinite; }
.ai-steps li[data-state='done'] { opacity: 0.8; }
.ai-steps li[data-state='done']::before {
  content: '✓';
  border: 0;
  background: var(--ai-ok, #2f9e5b);
  color: #fff;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
}
.ai-answer { min-height: 3lh; }
.ai-answer.typing::after {
  content: '';
  display: inline-block;
  width: 0.5em;
  height: 1em;
  margin-left: 2px;
  vertical-align: -0.15em;
  background: currentColor;
  animation: ai-blink 1s steps(1) infinite;
}
@keyframes ai-spin { to { rotate: 1turn; } }
@keyframes ai-blink { 50% { opacity: 0; } }
```

```js
{
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  document.querySelectorAll('[data-ai-demo]').forEach((demo) => {
    const steps = [...demo.querySelectorAll('.ai-steps li')];
    const out = demo.querySelector('.ai-answer');
    const replay = demo.querySelector('.ai-replay');
    const full = out.textContent.trim();
    const finish = () => {
      steps.forEach((s) => (s.dataset.state = 'done'));
      out.textContent = full;
    };
    if (reduce) { finish(); replay?.remove(); return; }
    let running = false;
    const run = async () => {
      if (running) return;
      running = true;
      if (replay) replay.disabled = true;
      steps.forEach((s) => (s.dataset.state = 'wait'));
      out.textContent = '';
      out.classList.add('typing');
      for (const s of steps) {
        s.dataset.state = 'run';
        await wait(600 + Math.random() * 600);
        s.dataset.state = 'done';
      }
      for (let i = 0; i < full.length; ) {
        i += 1 + Math.floor(Math.random() * 3);
        out.textContent = full.slice(0, i);
        await wait(18 + Math.random() * 40);
      }
      await wait(1200);
      out.classList.remove('typing');
      if (replay) replay.disabled = false;
      running = false;
    };
    finish();
    replay?.addEventListener('click', run);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      run();
    }, { threshold: 0.6 });
    io.observe(demo);
  });
}
```

`.sr-only` 스타일은 word-highlight 레시피의 것을 쓴다. 스크린 리더는 숨긴 문단으로 답 전체를 한 번에 읽는다.

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| 단계 시간 | 600~1200ms | 400~1500ms | 단계 하나가 진행 중으로 머무는 시간 |
| 글자 묶음 | 1~3자 | 1~5자 | 한 번에 흘러나오는 글자 수 |
| 글자 간격 | 18~58ms | 10~80ms | 흘러나오는 속도 |
| `--ai-ok` | #2f9e5b | | 완료 체크 배경색. 팔레트에서 고른다 |

## 성능
글자를 바꾸는 동안만 짧게 움직이고, 나머지는 멈춰 있다.

## 하지 말 것
- 답을 길게 (두세 문장까지. 길면 기다리다 지친다)
- 단계 5개 이상
- 진짜 AI처럼 보이게 하려고 "AI가 생성한 답변" 같은 문구를 덧붙이기. 문구는 사이트 상황에 맞는 구체적인 질문과 답으로
