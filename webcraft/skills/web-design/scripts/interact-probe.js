// Tries a page's interactions and returns lines for the note: hover built in JavaScript, what follows the cursor,
// form field looks, and safe clicks.
// Paste the whole file into the browser tool's JavaScript runner once, after measure.js. Takes up to 20 seconds.
// Reload afterwards, since a menu may stay open. Only allow-listed controls are clicked, never links, forms, or
// anything that reads like buying, signing in or accepting. Any navigation they try is cancelled and counted.
// Forms are never submitted: a field briefly holds a test value, with no input event sent, and gets its value back.
// Password, card and file fields are skipped.
// It records counts and times only, never the page's words.
(async () => {
  const sleep = (ms) => new Promise((done) => setTimeout(done, ms));
  const shown = (el) => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && +s.opacity > 0; };
  const banner = '[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i],[id*="onetrust" i],[class*="gdpr" i]';
  // One sample per look: thirty cards with the same hover are one measurement.
  const groupKey = (el) => { const r = el.getBoundingClientRect(); return [el.tagName, [...el.classList].slice(0, 3).join('.'), Math.round(r.width / 50), Math.round(r.height / 50), ...['role', 'aria-haspopup', 'aria-controls', 'aria-expanded'].map((a) => (el.hasAttribute(a) ? a : ''))].join('/'); };
  const oneOfEach = (els, n) => [...new Map(els.map((el) => [groupKey(el), el])).values()].slice(0, n);
  const timing = (anims) => {
    const list = anims.map((a) => { const t = a.effect?.getTiming?.(); return t && { ms: Math.round(+t.duration || 0), ease: t.easing }; }).filter((t) => t && t.ms > 0).sort((a, b) => a.ms - b.ms);
    if (!list.length) return '';
    const eases = list.map((t) => t.ease).filter((e) => e && e !== 'linear');
    return ` · 전환 시간 가운데값 ${list[list.length >> 1].ms}ms (${list[0].ms}~${list[list.length - 1].ms}ms)${eases.length ? ` · 이징 ${eases[0]}` : ''}`;
  };

  let moved = 0;
  const stopNav = (e) => { if (e.cancelable && !e.hashChange) { e.preventDefault(); moved++; } };
  window.navigation?.addEventListener('navigate', stopNav);

  // Hover in JavaScript. Script-made mouse events do not turn on CSS :hover, so any reaction here comes from a script.
  // The element's surroundings are watched for 100ms first, so a running marquee is not taken for a reaction.
  const hoverEls = oneOfEach([...document.querySelectorAll('a, button, [role="button"], [class*="card" i], [class*="item" i], figure, img, video')].filter((el) => shown(el) && !el.closest(banner)), 12);
  const fire = (el, types) => { const r = el.getBoundingClientRect(); for (const t of types) el.dispatchEvent(new (t.startsWith('pointer') ? PointerEvent : MouseEvent)(t, { bubbles: !/enter|leave/.test(t), clientX: r.x + r.width / 2, clientY: r.y + r.height / 2 })); };
  let hoverReact = 0, hoverBusy = 0; const hoverAnims = [];
  for (const el of hoverEls) {
    const area = el.parentElement || el;
    let changes = 0;
    const ob = new MutationObserver((m) => { changes += m.length; });
    ob.observe(area, { subtree: true, childList: true, attributes: true, attributeFilter: ['style', 'class'] });
    await sleep(100);
    if (changes) { ob.disconnect(); hoverBusy++; continue; }
    const before = new Set(document.getAnimations());
    fire(el, ['pointerover', 'mouseover', 'pointerenter', 'mouseenter']);
    await sleep(300);
    const fresh = document.getAnimations().filter((a) => !before.has(a));
    if (changes || fresh.length) { hoverReact++; hoverAnims.push(...fresh); }
    fire(el, ['pointerout', 'mouseout', 'pointerleave', 'mouseleave']);
    ob.disconnect();
    await sleep(100);
  }

  // What follows the cursor. Jump a script-made mouse from A to B and log each small floating element frame by frame:
  // how long it takes to get halfway gives the smoothing. Layers that move a little with the mouse are counted apart.
  const moveTo = (x, y) => { const el = document.elementFromPoint(x, y) || document.body; for (const t of ['pointermove', 'mousemove']) el.dispatchEvent(new (t === 'pointermove' ? PointerEvent : MouseEvent)(t, { bubbles: true, clientX: x, clientY: y })); };
  const A = [innerWidth * 0.25, innerHeight * 0.25], B = [innerWidth * 0.6, innerHeight * 0.6], jump = Math.hypot(B[0] - A[0], B[1] - A[1]);
  const centre = (el) => { const r = el.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; };
  let hiddenCursor = 0;
  for (let gy = 1; gy < 7; gy++) for (let gx = 1; gx < 7; gx++) { const el = document.elementFromPoint((innerWidth * gx) / 7, (innerHeight * gy) / 7); if (el && getComputedStyle(el).cursor === 'none') hiddenCursor++; }
  moveTo(A[0] - 40, A[1] - 40); await sleep(100); moveTo(...A); await sleep(500);
  const onScreenEls = () => [...document.querySelectorAll('body *')].slice(0, 1500).filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight && !el.closest('svg')?.parentElement?.closest('svg'); });
  const positions = () => new Map(onScreenEls().map((el) => [el, centre(el)]));
  const idle1 = positions(); await sleep(300); const idle2 = positions();
  const still = [...idle2.keys()].filter((el) => { const a = idle1.get(el), b = idle2.get(el); return a && Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.5; });
  const floaters = [...idle2.keys()].filter((el) => { const st = getComputedStyle(el); return /fixed|absolute/.test(st.position) && st.pointerEvents === 'none' && el.offsetWidth < 200; }).slice(0, 200);
  const from = idle2;
  const log = [];
  const jumpAt = performance.now();
  moveTo(...B);
  await new Promise((done) => { const tick = () => { const t = performance.now() - jumpAt; log.push([t, floaters.map(centre)]); t < 800 ? requestAnimationFrame(tick) : done(); }; requestAnimationFrame(tick); setTimeout(done, 1000); });
  const reach = (el, at) => Math.hypot(at[0] - from.get(el)[0], at[1] - from.get(el)[1]) / jump;
  const last = log[log.length - 1];
  const followers = floaters.map((el, i) => ({ el, i })).filter(({ el, i }) => reach(el, last[1][i]) >= 0.8);
  const when = (i, el, part) => log.find(([, at]) => reach(el, at[i]) >= part)?.[0];
  const t50s = followers.map(({ el, i }) => when(i, el, 0.5)).filter(Boolean).sort((a, b) => a - b);
  const t90s = followers.map(({ el, i }) => when(i, el, 0.9)).filter(Boolean).sort((a, b) => a - b);
  const t50 = t50s[t50s.length >> 1], t90 = t90s[t90s.length >> 1];
  // Layers that shifted with the mouse but did not follow it: parallax. A follower's own children are not counted.
  const shifted = still.filter((el) => !followers.some((f) => f.el.contains(el) || el.contains(f.el))).map((el) => reach(el, centre(el))).filter((part) => part > 0.002 && part < 0.8).sort((a, b) => a - b);
  const cursorLine = `커서: 기본 커서 숨김 ${Math.round((hiddenCursor / 36) * 100)}% · 따라오는 요소 ${followers.length}개${t50 ? ` · 절반까지 ${Math.round(t50)}ms · 90%까지 ${t90 ? Math.round(t90) + 'ms' : '800ms 넘음'} · 부드러움 계수 ${(1 - Math.pow(0.5, 16.7 / t50)).toFixed(2)} (60프레임 기준)` : ''} · 마우스 따라 움직이는 층 ${shifted.length}개${shifted.length ? ` (이동 비율 가운데값 ${shifted[shifted.length >> 1].toFixed(3)})` : ''}`;

  // Form fields: resting look, focus, placeholder, floating label, invalid style. One sample for each look.
  const hexOf = (c) => { const m = c.match(/[\d.]+/g) || []; return m.length < 3 || m[3] === '0' ? 'none' : '#' + m.slice(0, 3).map((v) => Math.round(+v).toString(16).padStart(2, '0')).join(''); };
  const fields = [...document.querySelectorAll('input, textarea, select')].filter((el) => shown(el) && !el.closest(banner) && !/^(hidden|checkbox|radio|submit|button|reset|range|color|image)$/.test(el.type));
  const sensitive = fields.filter((el) => el.type === 'file' || el.type === 'password' || /cc-|password/i.test(el.autocomplete || '') || /card|ssn|cvc|cvv|iban|account/i.test(`${el.name} ${el.id}`));
  const usable = fields.filter((el) => !sensitive.includes(el));
  let formLine = `폼: 입력칸 없음${sensitive.length ? ` · 민감해서 뺌 ${sensitive.length}개` : ''}`;
  if (usable.length) {
    const el = usable[0], look = (e) => { const st = getComputedStyle(e); return { border: `${Math.round(parseFloat(st.borderTopWidth))}px ${hexOf(st.borderTopColor)}`, outline: st.outlineStyle === 'none' ? 0 : parseFloat(st.outlineWidth), outlineColor: hexOf(st.outlineColor), shadow: st.boxShadow }; };
    const st = getComputedStyle(el), rest = look(el), r0 = el.getBoundingClientRect();
    const place = el.tagName === 'SELECT' ? '' : hexOf(getComputedStyle(el, '::placeholder').color);
    el.focus({ preventScroll: true }); await sleep(250);
    const on = look(el);
    el.blur(); await sleep(100);
    let focusSays = [on.border !== rest.border ? `테두리 ${on.border}` : '', on.outline ? `링 ${on.outline}px ${on.outlineColor}` : '', on.shadow !== rest.shadow ? '그림자' : ''].filter(Boolean).join(', ');
    if (!focusSays) {
      // :focus does not apply while the browser window lacks focus, so read the declared rules instead.
      // ponytail: another server's stylesheet is skipped here; add a fetch like measure.js has if a site keeps its form CSS there.
      const said = new Set(), colour = (c) => (c.startsWith('rgb') ? hexOf(c) : c);
      const visit = (rules) => { for (const r of rules) {
        if (r.selectorText?.includes(':focus')) {
          const base = r.selectorText.split(',').find((x) => x.includes(':focus')).replace(/:focus(-visible|-within)?/g, '').trim() || '*';
          let hit = false; try { hit = !!el.closest(base); } catch { hit = false; }
          if (hit) {
            if (r.style.outlineWidth && r.style.outlineWidth !== '0px' && r.style.outlineStyle !== 'none') said.add(`링 ${r.style.outlineWidth} ${colour(r.style.outlineColor)}`);
            if (r.style.borderTopColor) said.add(`테두리 ${colour(r.style.borderTopColor)}`);
            if (r.style.boxShadow && r.style.boxShadow !== 'none') said.add('그림자');
          }
        } else if (r.cssRules) visit(r.cssRules);
      } };
      for (const sheet of document.styleSheets) { try { visit(sheet.cssRules); } catch { /* another server's file */ } }
      focusSays = said.size ? `${[...said].join(', ')} (규칙 기준)` : document.hasFocus() ? '변화 없음' : '규칙 못 찾음';
    }
    let floated = '라벨 없음', invalid = '이메일 칸 없음';
    const label = el.labels?.[0] || el.parentElement?.querySelector('label');
    const saved = (f) => { const v = f.value; return () => { f.value = v; }; };
    if (label && shown(label) && el.tagName !== 'SELECT') {
      const undo = saved(el), l0 = label.getBoundingClientRect();
      try { el.value = 'test'; await sleep(300); const l1 = label.getBoundingClientRect(); floated = Math.abs(l1.top - l0.top) > 2 ? `떠오르는 라벨 ${Math.round(l0.top - l1.top)}px 위로` : '라벨 고정'; } finally { undo(); }
    }
    const mail = usable.find((f) => f.type === 'email');
    if (mail) {
      const undo = saved(mail), before = look(mail);
      try { mail.value = 'x'; await sleep(250); const after = look(mail); invalid = mail.matches(':invalid') && (after.border !== before.border || after.shadow !== before.shadow) ? '오류 스타일 있음' : '오류 스타일 없음'; } finally { undo(); }
    }
    const button = el.closest('form')?.querySelector('button, [type="submit"]');
    formLine = `폼: 입력칸 ${usable.length}개${sensitive.length ? ` · 민감해서 뺌 ${sensitive.length}개` : ''} · 높이 ${Math.round(r0.height)}px · 글자 ${Math.round(parseFloat(st.fontSize))}px · 안쪽 여백 ${Math.round(parseFloat(st.paddingTop))}/${Math.round(parseFloat(st.paddingLeft))}px · 둥글기 ${Math.round(parseFloat(st.borderTopLeftRadius))}px · 테두리 ${rest.border}${place ? ` · 자리표시 글자 ${place}` : ''} · 포커스 ${focusSays} · ${floated} · ${invalid}${button && shown(button) ? ` · 같은 폼 버튼 높이 ${Math.round(button.getBoundingClientRect().height)}px` : ''}`;
  }

  // Clicks: controls that only open or switch something on the page.
  const danger = /buy|cart|pay|checkout|order|delete|remove|log ?out|log ?in|sign|subscribe|accept|agree|consent|cookie|구매|결제|주문|삭제|장바구니|로그|가입|구독|동의|쿠키/i;
  const found = [...document.querySelectorAll('button[aria-expanded], [aria-controls], [role="tab"], summary, [data-toggle], [aria-haspopup]')];
  const safe = found.filter((el) => shown(el) && !el.closest('form') && !el.form && !el.closest(banner) && !danger.test(`${el.textContent} ${el.getAttribute('aria-label') || ''}`)
    && !(el.tagName === 'A' && !(el.getAttribute('href') || '#').startsWith('#')));
  const targets = oneOfEach(safe, 8);
  const visibleNow = () => [...document.querySelectorAll('body *')].slice(0, 4000).filter(shown);
  const counts = { 모달: 0, 펼침: 0, 탭: 0, '작은 변화': 0, '변화 없음': 0 };
  const clickAnims = [], changed = []; let stuck = 0, shift = 0, viewTransitions = 0;
  // Layout shift while clicking, and whether the page uses the View Transitions API.
  let shiftWatch = null;
  try { shiftWatch = new PerformanceObserver((list) => { for (const e of list.getEntries()) shift += e.value; }); shiftWatch.observe({ type: 'layout-shift' }); } catch { shiftWatch = null; }
  const ownVT = document.startViewTransition;
  if (ownVT) document.startViewTransition = function (...args) { viewTransitions++; return ownVT.apply(this, args); };
  for (const el of targets) {
    const seen = new Set(visibleNow()), before = new Set(document.getAnimations());
    const isTab = el.getAttribute('role') === 'tab';
    const wasTab = isTab && el.parentElement.querySelector('[role="tab"][aria-selected="true"]');
    el.click();
    await sleep(60);
    const running = document.getAnimations().filter((a) => !before.has(a));
    await sleep(440);
    clickAnims.push(...running);
    const nowVisible = visibleNow(), nowSet = new Set(nowVisible);
    const fresh = nowVisible.filter((n) => !seen.has(n));
    changed.push(fresh.length + [...seen].filter((n) => !nowSet.has(n)).length);
    const top = fresh.filter((n) => !fresh.includes(n.parentElement));
    const area = (n) => { const r = n.getBoundingClientRect(); return Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0)) * Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)); };
    const whole = innerWidth * innerHeight;
    if (top.some((n) => getComputedStyle(n).position === 'fixed' && area(n) >= whole * 0.5)) counts.모달++;
    else if (isTab && (top.length || running.length)) counts.탭++;
    // Not clipped to the screen: an accordion further down the page still opens.
    else if (top.reduce((sum, n) => { const r = n.getBoundingClientRect(); return sum + r.width * r.height; }, 0) > whole * 0.01) counts.펼침++;
    else if (top.length || running.length) counts['작은 변화']++;
    else counts['변화 없음']++;
    // Put it back: Escape, then the control again, or the tab that was selected before.
    document.activeElement?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await sleep(150);
    if (top.some(shown)) { (wasTab && wasTab !== el ? wasTab : el).click(); await sleep(300); }
    if (top.some((n) => n.isConnected && shown(n))) stuck++;
  }
  window.navigation?.removeEventListener('navigate', stopNav);
  shiftWatch?.disconnect();
  if (ownVT) document.startViewTransition = ownVT;
  changed.sort((a, b) => a - b);

  return [
    `호버(JS): 살펴본 묶음 ${hoverEls.length}개 · 반응 ${hoverReact}개${hoverBusy ? ` · 계속 움직여서 판단 못 함 ${hoverBusy}개` : ''}${timing(hoverAnims)}`,
    cursorLine,
    formLine,
    `클릭 탐색: 후보 ${found.length}개 · 위험하거나 안 보여서 뺌 ${found.length - safe.length}개 · 누른 묶음 ${targets.length}개 · ${Object.entries(counts).map(([k, n]) => `${k} ${n}`).join(' · ')}${moved ? ` · 페이지 이동 막음 ${moved}번` : ''}${changed.length ? ` · 바뀐 요소 가운데값 ${changed[changed.length >> 1]}개 · 화면 밀림 ${shift.toFixed(3)}${viewTransitions ? ` · View Transition ${viewTransitions}번` : ''}` : ''}${timing(clickAnims)}${stuck ? ` · 되돌리지 못함 ${stuck}개` : ''}`,
  ].join('\n');
})()
