// Gets past a decorative entry screen when measure.js reports "입장 화면: 있음". Paste the whole file into the browser
// tool's JavaScript runner once, then run measure.js again. It waits for loading, presses the element that carries the
// entry wording (not the canvas behind it), first with a click and then with a long press, and returns one line.
// Cookie, age and login gates are never pressed: those belong to the person. Any navigation it causes is cancelled.
(async () => {
  const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
  const own = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
  const shown = (el) => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 2 && r.height > 2 && r.bottom > 0 && r.top < innerHeight && s.visibility !== 'hidden' && +s.opacity > 0; };
  const asks = /\b(enter|begin|explore|start|continue)\b|hold|tap to|click to|입장|시작|들어가|둘러보/i;
  const person = /cookie|consent|accept|agree|\bage\b|years|log ?in|sign|subscribe|쿠키|동의|성인|로그인|가입|구독/i;
  const find = () => [...document.querySelectorAll('body *')].find((el) => { const t = own(el); return t && t.length <= 30 && asks.test(t) && !person.test(t) && shown(el); });
  const loading = () => /(^|\s)\d{1,2}\s?%/.test(document.body.innerText);

  const started = performance.now();
  while (performance.now() - started < 25000 && (loading() || !find())) await sleep(500);
  const label = find();
  if (!label) return '입장: 누를 글자를 못 찾음. 스크린샷을 보고 브라우저 도구로 실제 클릭, 키, 휠을 보내고, 그래도 안 되면 사용자에게 눌러 달라고 한다';
  const waited = Math.round(performance.now() - started);

  const stopNav = (e) => { if (e.cancelable && !e.hashChange) e.preventDefault(); };
  window.navigation?.addEventListener('navigate', stopNav);
  let target = label;
  while (target && target.tagName !== 'BUTTON' && getComputedStyle(target).cursor !== 'pointer') target = target.parentElement;
  target = target || label;
  const gone = async (ms) => { const t = performance.now(); while (performance.now() - t < ms) { if (!find()) return true; await sleep(200); } return !find(); };
  const r = target.getBoundingClientRect();
  const at = { bubbles: true, clientX: r.x + r.width / 2, clientY: r.y + r.height / 2, pointerId: 1, isPrimary: true, button: 0, buttons: 1 };
  let how = null;

  target.click();
  if (await gone(1500)) how = '클릭';
  if (!how) {
    target.dispatchEvent(new PointerEvent('pointerdown', at));
    target.dispatchEvent(new MouseEvent('mousedown', at));
    await sleep(5000);
    target.dispatchEvent(new PointerEvent('pointerup', { ...at, buttons: 0 }));
    target.dispatchEvent(new MouseEvent('mouseup', { ...at, buttons: 0 }));
    if (await gone(6000)) how = '꾹 누르기';
  }
  window.navigation?.removeEventListener('navigate', stopNav);
  return how
    ? `입장: 넘김 (${how}, 로딩 ${waited}ms 기다림)`
    : '입장: 못 넘김. 브라우저 도구로 실제 클릭, 키, 휠을 보내고, 그래도 안 되면 사용자에게 눌러 달라고 한다';
})()
