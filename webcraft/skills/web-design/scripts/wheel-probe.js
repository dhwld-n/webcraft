// Measures pages that have no real scroll (wheel-driven 3D, virtual scroll), where measure.js has no "below the fold".
// Paste the whole file into the browser tool's JavaScript runner twice:
//   1st run starts recording. Then send REAL wheel input with the browser tool's scroll action (script-made wheel events
//   are ignored by many sites), about 8 times with a wait of a second or two between them.
//   2nd run stops recording and returns one line for the note. Reload afterwards, since the page stays scrolled.
// It records sizes, colours and counts only, never the page's words.
(() => {
  const P = window.__wheelProbe;
  if (!P) {
    const W = innerWidth, H = innerHeight;
    const cv = document.createElement('canvas'); cv.width = cv.height = 1;
    const cx = cv.getContext('2d', { willReadFrequently: true });
    const hex = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); const [r, g, b, a] = cx.getImageData(0, 0, 1, 1).data; return a < 20 ? null : '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join(''); };
    const bgAtCentre = () => { for (let e = document.elementFromPoint(W / 2, H / 2); e; e = e.parentElement) { const c = hex(getComputedStyle(e).backgroundColor); if (c) return c; } return null; };

    // The largest canvas, shrunk to 16x16, to see whether the picture changed. Read inside the frame so WebGL still has it.
    const small = document.createElement('canvas'); small.width = small.height = 16;
    const sx = small.getContext('2d', { willReadFrequently: true });
    const gl = [...document.querySelectorAll('canvas')].sort((a, b) => b.width * b.height - a.width * a.height)[0];
    // An all-empty read means the buffer was already cleared: report "unreadable", never a false "no change".
    const readCanvas = () => {
      if (!gl) return null;
      try {
        sx.clearRect(0, 0, 16, 16); sx.drawImage(gl, 0, 0, 16, 16);
        const data = sx.getImageData(0, 0, 16, 16).data;
        return data.some((v) => v !== 0) ? data : null;
      } catch { return null; }
    };
    const diff = (a, b) => { if (!a || !b) return 0; let d = 0; for (let i = 0; i < a.length; i += 4) d += Math.abs(a[i] - b[i]) + Math.abs(a[i + 1] - b[i + 1]) + Math.abs(a[i + 2] - b[i + 2]); return d / (a.length * 0.75 * 255); };

    const state = () => {
      const seen = [...document.querySelectorAll('body *')].slice(0, 4000).filter((el) => {
        if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return false;
        const r = el.getBoundingClientRect();
        return r.width > 2 && r.height > 2 && r.bottom > 0 && r.top < H && r.right > 0 && r.left < W && (!el.checkVisibility || el.checkVisibility({ opacityProperty: true, visibilityProperty: true }));
      });
      const top = seen.map((el) => [parseFloat(getComputedStyle(el).fontSize), el.textContent.trim().slice(0, 40)]).sort((a, b) => b[0] - a[0])[0] || [0, ''];
      return { size: Math.round(top[0]), text: top[1], bg: bgAtCentre(), y: scrollY };
    };

    const rec = { wheels: 0, trusted: 0, scenes: [], canvasMoves: [], lastChange: 0, wheelTimes: [], y0: scrollY, stop: false, last: null };
    addEventListener('wheel', (e) => { rec.wheels++; if (e.isTrusted) { rec.trusted++; rec.wheelTimes.push(performance.now()); } }, { capture: true, passive: true });
    let next = 0, prevPix = readCanvas();
    const tick = (now) => {
      if (rec.stop) return;
      if (now >= next) {
        next = now + 200;
        const s = state(), pix = readCanvas(), d = diff(pix, prevPix);
        prevPix = pix || prevPix;
        if (!rec.canvasRead && pix) rec.canvasRead = true;
        // A new scene is a different largest text or background that holds for 3 samples (0.6s), so scrambling text
        // does not count as many scenes. The words are compared here and never reported.
        const key = s.text + '|' + s.bg;
        rec.held = key === rec.candidate ? rec.held + 1 : 1;
        rec.candidate = key;
        const scene = rec.scenes[rec.scenes.length - 1];
        if (rec.held >= 3 && (!scene || scene.text + '|' + scene.bg !== key)) { rec.scenes.push(s); rec.lastChange = now; }
        if (rec.wheelTimes.length) { rec.canvasMoves.push(d); if (d > 0.01) rec.lastChange = now; }
        rec.last = s;
      }
      // Asking for the next frame from a timer queues this after the page's own render callback, so the canvas holds a fresh picture.
      setTimeout(() => requestAnimationFrame(tick), 0);
    };
    requestAnimationFrame(tick);
    window.__wheelProbe = rec;
    return '녹화 시작. 이제 브라우저 도구의 스크롤 동작으로 실제 휠을 보낸 뒤 이 파일을 한 번 더 실행한다';
  }

  P.stop = true;
  delete window.__wheelProbe;
  if (!P.trusted) return `휠 탐색: 실제 휠 입력이 한 번도 안 왔다 (스크립트 ${P.wheels}번). 브라우저 도구의 스크롤 동작으로 다시 잰다`;
  const avg = P.canvasMoves.length ? P.canvasMoves.reduce((a, b) => a + b, 0) / P.canvasMoves.length : 0;
  const peak = P.canvasMoves.length ? Math.max(...P.canvasMoves) : 0;
  const quietAfterLastWheel = P.lastChange < P.wheelTimes[P.wheelTimes.length - 1];
  const moved = [P.scenes.length > 1 ? '글자·배경' : '', peak > 0.01 ? '캔버스' : '', P.last && P.last.y !== P.y0 ? '창 스크롤' : ''].filter(Boolean);
  return `휠 탐색: 실제 휠 ${P.trusted}번 · 반응 ${moved.join(', ') || '없음'} · 장면 전환 ${Math.max(0, P.scenes.length - 1)}번 (서로 다른 장면 ${new Set(P.scenes.map((s) => s.text + '|' + s.bg)).size}개) · 장면별 가장 큰 글자 ${P.scenes.map((s) => s.size).slice(0, 12).join(', ')}px · 장면별 가운데 배경 ${[...new Set(P.scenes.map((s) => s.bg).filter(Boolean))].slice(0, 6).join(', ') || '?'} · 캔버스 변화 ${!document.querySelector('canvas') ? '캔버스 없음' : P.canvasRead ? `평균 ${(avg * 100).toFixed(1)}% 최대 ${(peak * 100).toFixed(1)}%` : '읽을 수 없음'} · ${quietAfterLastWheel ? '마지막 휠에는 변화 없음 (끝에 닿았을 수 있음)' : '마지막 휠까지 계속 변함 (더 이어질 수 있음)'}`;
})()
