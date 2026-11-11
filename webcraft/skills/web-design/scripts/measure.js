// Measure a reference site's design numbers. Paste the whole file into the browser tool's JavaScript runner
// at desktop width (1440) on the reference page; it returns a few short lines for the note's "실측 수치" section.
// Reads computed styles only: type scale, fonts, colours, layout, shape, motion, first-screen composition, hover rules.
// It walks to the end of the page first, so lazy content counts, then comes back to the top.
(async () => {
  // Some pages never settle their font set while the tab is hidden, so cap the wait.
  await Promise.race([document.fonts.ready, new Promise((done) => setTimeout(done, 2000))]);
  const W = innerWidth, H = innerHeight;
  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const rgba = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); return [...cx.getImageData(0, 0, 1, 1).data]; };
  const hex = (c) => { const [r, g, b, a] = rgba(c); return a < 20 ? null : '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join(''); };
  // Saturation, or 0 for near-black and near-white so dark navy or off-white never count as an accent.
  const sat = (h) => { const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; return mx === mn || l < 0.2 || l > 0.9 ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1)); };
  const px = (v) => Math.round(parseFloat(v) || 0);
  const tally = (pairs, n) => Object.entries(pairs.reduce((m, [k, w = 1]) => (k == null ? m : ((m[k] = (m[k] || 0) + w), m)), {}))
    .sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => k);
  // Build tools add hashes to font names (Poppins-eff274c5f1fc31cf, __inter_c0346e); keep the readable part.
  const fam = (s) => s.fontFamily.split(',')[0].trim().replace(/["']/g, '').replace(/-[0-9a-f]{8,}$/, '').replace(/^__(.+?)_[0-9a-f]{6}$/, '$1');
  const own = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();

  // Cookie and consent banners are not the site's design, so their text and colours are left out. The length limit keeps
  // a wrapper that merely has "cookie" in a class name from swallowing the whole page.
  const banners = [...new Set([...document.querySelectorAll('[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i],[id*="onetrust" i],[class*="gdpr" i],[aria-label*="cookie" i],[aria-label*="consent" i]'),
    ...[...document.querySelectorAll('body *')].filter((el) => getComputedStyle(el).position === 'fixed' && /cookie|consent|쿠키/i.test(el.textContent))])] // banners with unhelpful class names
    .filter((el) => {
      if (el === document.body || /^(STYLE|SCRIPT)$/.test(el.tagName)) return false;
      const r = el.getBoundingClientRect(); // a fixed box under 60% of the screen is a banner however long its policy text is
      return el.textContent.length < 1500 || (getComputedStyle(el).position === 'fixed' && r.width * r.height < W * H * 0.6);
    });
  const inBanner = (el) => banners.some((b) => b.contains(el));
  const bannersShown = banners.filter((b) => !banners.some((o) => o !== b && o.contains(b)) && [b, ...b.querySelectorAll('*')].some((e) => e.getBoundingClientRect().height > 0)).length;

  // First-screen title: a real h1 if one shows, else the largest text. It only has to overlap the screen, because big
  // titles often run past the edge; at least a quarter of it must show, which skips slides parked off to the side.
  const onScreen = (el) => {
    const r = el.getBoundingClientRect();
    if (r.width <= 2 || r.height <= 2) return false; // screen-reader-only text
    if (el.checkVisibility && !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) return false;
    const w = Math.min(r.right, W) - Math.max(r.left, 0), h = Math.min(r.bottom, H) - Math.max(r.top, 0);
    return w > 0 && h > 0 && (w * h) / (r.width * r.height) >= 0.25;
  };
  const size = (el) => parseFloat(getComputedStyle(el).fontSize);
  const largest = (els) => [...els].sort((a, b) => size(b) - size(a))[0];
  const CAP = 4000;
  const textsOnScreen = () => [...document.querySelectorAll('body *')].slice(0, CAP).filter((el) => own(el).length && !inBanner(el) && onScreen(el));
  // An h1 is often split into spans for animation, so read the type from its largest visible text piece.
  const h1 = [...document.querySelectorAll('h1')].find((el) => el.textContent.trim() && onScreen(el));
  const h1Text = h1 && largest([h1, ...h1.querySelectorAll('*')].filter((el) => own(el).length && onScreen(el)));
  const hero = h1Text || largest(textsOnScreen());
  const heroFrom = h1Text ? 'h1' : '가장 큰 글자';
  const spec = (el) => {
    if (!el) return '없음';
    const s = getComputedStyle(el), fs = parseFloat(s.fontSize);
    const lh = s.lineHeight === 'normal' ? 'normal' : (parseFloat(s.lineHeight) / fs).toFixed(2);
    const ls = s.letterSpacing === 'normal' ? '0' : (parseFloat(s.letterSpacing) / fs).toFixed(3) + 'em';
    return `${fam(s)} ${Math.round(fs)}px · 굵기 ${s.fontWeight} · 행간 ${lh} · 자간 ${ls}${s.textTransform === 'uppercase' ? ' · 대문자' : ''}`;
  };
  const pageBg = hex(getComputedStyle(document.body).backgroundColor) || hex(getComputedStyle(document.documentElement).backgroundColor) || '#ffffff';

  // An entry screen: short wording that asks to go in, on a page that also covers the screen or cannot scroll yet.
  // Numbers read here describe the gate, not the site, so the report says so. Cookie, age and login gates do not count.
  const gatePhrase = textsOnScreen().some((el) => { const t = own(el); return t.length <= 30 && /\b(enter|begin|explore|start|continue)\b|hold|tap to|click to|입장|시작|들어가|둘러보/i.test(t) && !/cookie|consent|accept|agree|\bage\b|years|log ?in|sign|subscribe|쿠키|동의|성인|로그인|가입|구독/i.test(t); });
  const gateCover = [...document.querySelectorAll('body *')].slice(0, CAP).some((el) => { const st = getComputedStyle(el), r = el.getBoundingClientRect(); return /fixed|absolute/.test(st.position) && +st.zIndex > 10 && st.visibility !== 'hidden' && +st.opacity > 0 && r.width * r.height > W * H * 0.8; });

  // Whether the page was actually painting: in a hidden tab, intro animations may not have run yet.
  let frames = 0; const t0 = performance.now();
  await Promise.race([
    new Promise((done) => { const f = () => { frames++; performance.now() - t0 < 500 ? requestAnimationFrame(f) : done(); }; requestAnimationFrame(f); }),
    new Promise((done) => setTimeout(done, 700)),
  ]);

  // A big title is often not text but an SVG wordmark or an image. Only lettering-shaped ones in a heading or named like
  // a logo count; narrow icons and small client logos do not. Ink height is close to cap height, so size = height / 0.7.
  const imgInk = (img, r) => {
    try {
      if (!img.naturalWidth) return null;
      const w = Math.min(img.naturalWidth, 300), h = Math.round((img.naturalHeight * w) / img.naturalWidth);
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const g = c.getContext('2d', { willReadFrequently: true }); g.drawImage(img, 0, 0, w, h);
      const d = g.getImageData(0, 0, w, h).data; // throws on a cross-origin image
      const cols = new Map(), rows = []; let ink = 0;
      // ponytail: the top-left pixel stands in for the background; an image with an odd corner just reads as not lettering.
      for (let y = 0; y < h; y++) {
        let n = 0;
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;
          if (Math.abs(d[i] - d[0]) + Math.abs(d[i + 1] - d[1]) + Math.abs(d[i + 2] - d[2]) + Math.abs(d[i + 3] - d[3]) > 60) {
            n++; ink++;
            const k = (d[i] >> 5) * 64 + (d[i + 1] >> 5) * 8 + (d[i + 2] >> 5);
            cols.set(k, (cols.get(k) || 0) + 1);
          }
        }
        rows.push(n > w * 0.01);
      }
      const bands = []; let run = 0;
      for (const on of [...rows, false]) { if (on) run++; else if (run) { bands.push(run); run = 0; } }
      // Lettering is a few colours in one to three clean rows. A photo is neither.
      if (!bands.length || bands.length > 3 || [...cols.values()].filter((v) => v > ink * 0.01).length > 8) return false;
      return (Math.max(...bands) * r.height) / h;
    } catch { return null; }
  };
  const readDrawn = (el) => {
    const r = el.getBoundingClientRect();
    const named = /logo|wordmark|brand|title/i.test([el.id, el.getAttribute('class'), el.getAttribute('alt'), el.getAttribute('aria-label'), el.currentSrc].join(' '));
    if (r.height < 40 || r.width / r.height <= 2 || !(el.closest('h1,h2') || (named && r.width >= W * 0.2))) return null;
    if (el.tagName === 'IMG') {
      const ink = imgInk(el, r);
      if (ink === false) return null;
      return ink ? { el, r, how: '이미지 글자', trust: '낮음', ink, est: ink / 0.7 } : { el, r, how: '이미지 상자', trust: '낮음', box: r.height, est: r.height };
    }
    try {
      const t = [...el.querySelectorAll('text')].find((n) => n.textContent.trim());
      if (t) { const m = t.getScreenCTM(); return { el, r, how: 'SVG 글자', trust: '높음', est: parseFloat(getComputedStyle(t).fontSize) * Math.hypot(m.a, m.b) }; }
      const m = el.getScreenCTM(), ink = el.getBBox().height * Math.hypot(m.a, m.b);
      return ink >= 40 ? { el, r, how: 'SVG 윤곽', trust: '보통', ink, est: ink / 0.7 } : null;
    } catch { return null; } // an SVG that is not rendering has no box
  };
  const drawn = [...document.querySelectorAll('svg, img')].filter((el) => !el.parentElement.closest('svg') && !inBanner(el) && onScreen(el))
    .map(readDrawn).filter((d) => d && d.est > (hero ? size(hero) : 0)).sort((a, b) => b.est - a.est)[0];

  // Measured from the title box, so a block wider than its text still reports the box. The align value tells them apart.
  // Read now, before the walk below moves the page.
  const hr = drawn ? drawn.r : (h1Text ? h1 : hero)?.getBoundingClientRect();
  const heroLeft = hr?.left, heroTop = hr?.top, heroWidth = hr?.width, heroAlign = (drawn ? drawn.el : hero) && getComputedStyle(drawn ? drawn.el : hero).textAlign;
  const pct = (v, of) => Math.round((v / of) * 100) + '%';

  // Below the first screen: walk one screen at a time to the real end, so lazy content appears and the whole page counts.
  // Some pages scroll an inner box instead of the window; use the tallest one if the window itself does not scroll.
  const inner = document.documentElement.scrollHeight > H * 1.05 ? null : [...document.querySelectorAll('body, body *')].filter((el) => {
    const s = getComputedStyle(el);
    return /auto|scroll/.test(s.overflowY) && el.scrollHeight > el.clientHeight * 1.2 && el.clientHeight > H * 0.5;
  }).sort((a, b) => b.scrollHeight - a.scrollHeight)[0];
  const scrollBox = inner || document.scrollingElement || document.documentElement;
  const startY = scrollBox.scrollTop, BUDGET_MS = 30000, walkStart = performance.now();
  const bgAtCentre = () => { for (let e = document.elementFromPoint(W / 2, H / 2); e; e = e.parentElement) { const c = hex(getComputedStyle(e).backgroundColor); if (c) return c; } return pageBg; };
  // What sits under the centre of the screen. Screens that repeat one layout, like a long product grid, share a signature.
  const signature = () => document.elementsFromPoint(W / 2, H / 2).slice(0, 6).map((e) => `${e.tagName}.${Math.round(e.offsetWidth / 50)}`).join('|');
  // Always down the page, because jumping around scrambles pages whose animation follows the scroll. Each screen waits
  // 200ms: scripts like GSAP reveal text later than that wait can detect, and shorter waits misread real pages. Only a
  // page too long for the time left waits less, down to 60ms, and past that it skips screens evenly and still ends at the last.
  const screens = () => Math.max(1, Math.ceil(scrollBox.scrollHeight / H - 0.05));
  const walk = [], seen = new Set();
  let total = screens(), scanMs = 10, jumped = false;
  for (let i = 1; i < total;) {
    scrollBox.scrollTo({ top: Math.min(i * H, scrollBox.scrollHeight - H), behavior: 'instant' });
    const share = (BUDGET_MS - (performance.now() - walkStart)) / (total - i);
    await new Promise((done) => setTimeout(done, Math.max(60, Math.min(200, share - scanMs))));
    const scanStart = performance.now();
    const big = largest(textsOnScreen());
    walk.push([big ? px(getComputedStyle(big).fontSize) : 0, bgAtCentre(), signature()]);
    seen.add(i);
    scanMs = performance.now() - scanStart;
    total = screens(); // lazy content may have made the page taller
    const left = BUDGET_MS - (performance.now() - walkStart);
    if (i >= total - 1 || jumped) break;
    if (left <= 0) { jumped = true; i = total - 1; continue; } // out of time: one jump to the end
    i = Math.min(total - 1, i + Math.max(1, Math.ceil(((total - 1 - i) * (scanMs + 60)) / left)));
  }
  const skipped = []; for (let i = 1; i < total; i++) if (!seen.has(i)) skipped.push(i + 1);
  const overBudget = skipped.length > 0;
  const perScreen = Math.round((performance.now() - walkStart) / Math.max(1, walk.length));
  const pageH = scrollBox.scrollHeight, steps = walk.length;
  scrollBox.scrollTo({ top: startY, behavior: 'instant' });

  // Everything below reads the whole document, off-screen parts included, now that the walk has loaded it.
  const all = [...document.querySelectorAll('body *')].filter((el) => !inBanner(el)).slice(0, CAP);
  const vis = all.filter((el) => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && +s.opacity > 0; });
  const texts = vis.filter((el) => own(el).length);
  const chars = (el) => own(el).length;

  // Type: weighted by how many characters each size or font carries.
  const sizes = tally(texts.map((el) => [px(getComputedStyle(el).fontSize), chars(el)]), 8).map(Number);
  // Body is the most used size up to 24px; a long marquee at 64px has many characters but is not body text.
  const body = sizes.find((v) => v > 0 && v <= 24) ?? sizes[0];
  const bodyEl = texts.filter((el) => px(getComputedStyle(el).fontSize) === body).sort((a, b) => chars(b) - chars(a))[0];
  const fonts = tally(texts.map((el) => [fam(getComputedStyle(el)), chars(el)]), 4);
  const para = vis.filter((el) => el.tagName === 'P' && el.textContent.trim().length > 80).map((el) => px(el.getBoundingClientRect().width)).filter((w) => w > 40 && w <= W);
  const measure = para.length ? Math.max(...para) : null;
  // Without an h1, text counts as a title only if clearly bigger than body and at least 24px; smaller is a menu or label.
  const firstScreen = hr && (drawn || h1Text || size(hero) >= Math.max(body * 1.5, 24));
  const drawnSpec = drawn && (drawn.box
    ? `상자 높이 ${px(drawn.box)}px (다른 서버 이미지라 글자 높이는 못 잼, 스크린샷으로 확인)`
    : (drawn.ink ? `글자 높이 ${px(drawn.ink)}px, 글자 크기 약 ${px(drawn.est)}px (대문자 기준 추정)` : `글자 크기 약 ${px(drawn.est)}px`) + ` · 본문의 ${(drawn.est / body).toFixed(1)}배`);

  // Colour: page background, text colours by characters, surfaces by area, the most used saturated colour.
  const textCols = tally(texts.map((el) => [hex(getComputedStyle(el).color), chars(el)]), 4);
  const surfaces = tally(vis.map((el) => { const r = el.getBoundingClientRect(); return [hex(getComputedStyle(el).backgroundColor), Math.min(r.width * r.height, W * H)]; }), 5);
  const accents = tally(vis.flatMap((el) => { const s = getComputedStyle(el); return [s.color, s.backgroundColor, s.borderTopColor].map(hex).filter((h) => h && sat(h) > 0.35).map((h) => [h]); }), 3);

  // Layout: side margin, widest text column, grids, section padding.
  const lefts = tally(texts.filter((el) => el.getBoundingClientRect().left < W * 0.3).map((el) => [px(el.getBoundingClientRect().left)]), 2);
  const grids = tally(vis.filter((el) => getComputedStyle(el).display.includes('grid'))
    .map((el) => [getComputedStyle(el).gridTemplateColumns.split(' ').filter(Boolean).length + '열 간격 ' + px(getComputedStyle(el).columnGap)]), 3);
  const blocks = vis.filter((el) => /^(SECTION|HEADER|FOOTER|ARTICLE)$/.test(el.tagName) && el.getBoundingClientRect().width > W * 0.6);
  const padY = tally(blocks.map((el) => [px(getComputedStyle(el).paddingTop) + px(getComputedStyle(el).paddingBottom)]).filter(([v]) => v > 0), 3);

  // Shape and motion.
  const radii = tally(vis.map((el) => { const r = px(getComputedStyle(el).borderTopLeftRadius); return [r >= 999 ? "알약" : r || null]; }), 4);
  const borders = tally(vis.map((el) => { const w = parseFloat(getComputedStyle(el).borderTopWidth); return [w ? w + 'px' : null]; }), 2);
  const shadows = vis.filter((el) => getComputedStyle(el).boxShadow !== 'none').length;
  const blur = vis.filter((el) => (getComputedStyle(el).backdropFilter || 'none') !== 'none').length;
  const durs = tally(all.flatMap((el) => getComputedStyle(el).transitionDuration.split(',').map((d) => [parseFloat(d) ? Math.round(parseFloat(d) * 1000) + 'ms' : null])), 3);
  const eases = tally(all.map((el) => { const s = getComputedStyle(el); return [parseFloat(s.transitionDuration) ? s.transitionTimingFunction.split(/,(?![^(]*\))/)[0].trim() : null]; }), 2);
  const anims = all.filter((el) => getComputedStyle(el).animationName !== 'none').length;
  const canvases = document.querySelectorAll('canvas').length;
  const smooth = ['lenis', 'locomotive-scroll', 'has-scroll-smooth'].filter((c) => document.documentElement.className.includes(c) || document.body.className.includes(c));

  // Hover without moving a mouse: read the page's own :hover rules. Only rules whose element exists count, so unused CSS
  // from a framework does not. The browser hides the rules of another server's stylesheet, so fetch and parse a copy;
  // only a file the server also refuses that way counts as unread. @import inside such a copy is not followed.
  const hoverRules = []; let unreadSheets = 0;
  const visit = (rules) => { for (const r of rules) { if (r.selectorText?.includes(':hover')) hoverRules.push(r); else if (r.cssRules) visit(r.cssRules); } };
  for (const sheet of document.styleSheets) {
    try { visit(sheet.cssRules); } catch {
      try {
        const res = await fetch(sheet.href, { credentials: 'omit', signal: AbortSignal.timeout(3000) });
        if (!res.ok) throw new Error('refused');
        const copy = new CSSStyleSheet(); copy.replaceSync(await res.text());
        visit(copy.cssRules);
      } catch { unreadSheets++; }
    }
  }
  const hoverKinds = [['color', /^(color|fill|stroke)$/], ['background', /^background/], ['transform', /^(transform|translate|scale|rotate)$/], ['opacity', /^opacity$/], ['shadow', /shadow/], ['border', /^(border|outline)/], ['underline', /^text-decoration/], ['filter', /filter$/]];
  const hoverCount = {}, hoverDurs = [], hoverEases = []; let hoverUsed = 0, hoverInstant = 0;
  for (const rule of hoverRules) {
    const base = rule.selectorText.split(',').find((s) => s.includes(':hover')).replace(/:hover/g, '').replace(/::?(before|after)/g, '').trim() || '*';
    let el = null;
    try { el = document.querySelector(base); } catch { continue; } // selectors this browser cannot parse
    if (!el || inBanner(el) || el.getBoundingClientRect().width === 0) continue;
    const kinds = hoverKinds.filter(([, re]) => [...rule.style].some((p) => re.test(p))).map(([k]) => k);
    if (!kinds.length) continue;
    hoverUsed++;
    kinds.forEach((k) => { hoverCount[k] = (hoverCount[k] || 0) + 1; });
    const s = getComputedStyle(el), ms = Math.max(...s.transitionDuration.split(',').map((d) => parseFloat(d) * 1000));
    if (ms > 0) { hoverDurs.push(Math.round(ms)); hoverEases.push([s.transitionTimingFunction.split(/,(?![^(]*\))/)[0].trim()]); } else hoverInstant++;
  }
  hoverDurs.sort((a, b) => a - b);
  const unreadNote = unreadSheets ? ` · 못 읽은 CSS 파일 ${unreadSheets}개` : '';
  const hoverLine = hoverUsed
    ? `호버(CSS): 규칙 ${hoverUsed}개 · 바뀌는 것 ${Object.entries(hoverCount).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(', ')}${hoverDurs.length ? ` · 전환 시간 가운데값 ${hoverDurs[hoverDurs.length >> 1]}ms (${hoverDurs[0]}~${hoverDurs[hoverDurs.length - 1]}ms) · 이징 ${tally(hoverEases, 1)[0]}` : ''} · 바로 바뀌는 규칙 ${hoverInstant}개${unreadNote}`
    : `호버(CSS): 규칙 없음${unreadNote}`;

  const h2s = [...document.querySelectorAll('h2')].filter((el) => el.textContent.trim() && el.getBoundingClientRect().width > 2 && !inBanner(el));
  const h2Sizes = tally(h2s.map((el) => [px(getComputedStyle(el).fontSize)]), 3);
  const h2Font = h2s.length ? fam(getComputedStyle(h2s[0])) : '';
  // How the page scrolls decides how it can be measured. Anything without a real scroll needs wheel-probe.js.
  const lib = smooth[0] || (document.querySelector('[data-scroll-container]') ? 'locomotive' : document.querySelector('#smooth-wrapper') ? 'gsap-smoother' : '');
  const bigCanvas = [...document.querySelectorAll('canvas')].some((c) => { const r = c.getBoundingClientRect(); return r.width * r.height > W * H * 0.6; });
  const model = steps ? (inner ? 'inner' : 'window') + (lib ? `(${lib})` : '') : lib ? `virtual(${lib})` : bigCanvas ? 'canvas' : 'none';
  // With no scroll at all the page is built like an app, so count its layers and controls instead.
  const layers = vis.filter((el) => /fixed|absolute/.test(getComputedStyle(el).position) && el.getBoundingClientRect().width * el.getBoundingClientRect().height > W * H * 0.02).length;
  const appLike = model === 'none' ? ` · 스크롤 없는 앱형 화면 · 떠 있는 층 ${layers}개 · 누를 수 있는 것 ${all.filter((el) => /^(A|BUTTON)$/.test(el.tagName)).length}개` : '';
  // Long pages repeat themselves, so neighbouring equal values fold into "72×3".
  const runs = (vals) => vals.reduce((out, v) => { const last = out[out.length - 1]; if (last && last[0] === v) last[1]++; else out.push([v, 1]); return out; }, [])
    .map(([v, n]) => (n > 1 ? `${v}×${n}` : v)).slice(0, 16).join(', ');
  const below = steps
    ? `아래쪽: 스크롤 방식 ${model} · 페이지 높이 ${(pageH / H).toFixed(1)}화면 ${Math.round(pageH)}px · ${overBudget ? `${total}화면 중 ${steps + 1}화면 봄 (${BUDGET_MS / 1000}초 제한, 화면당 ${perScreen}ms, 건너뛴 화면 ${skipped.slice(0, 8).join(', ')}${skipped.length > 8 ? ' 외' : ''})` : '끝까지 봄'} · 서로 다른 모양 ${new Set(walk.map(([, , sig]) => sig)).size}가지 · h2 ${h2Sizes.length ? `${h2Font} ${h2Sizes.join(', ')}px` : '없음'} · 화면별 가장 큰 글자 ${runs(walk.map(([s]) => s))}px · 화면별 가운데 배경 ${runs(walk.map(([, c]) => c))}`
    : `아래쪽: 스크롤 방식 ${model} · 창 스크롤 없음${appLike}${model === 'none' ? '' : ' · wheel-probe.js로 잰다'}`;

  // Under ~8 frames a second the tab is close to not painting; above that it is painting but slowly.
  const frameNote = frames < 4 ? ' (화면이 거의 안 그려짐, 창이 가려졌을 수 있어 다시 재야 함)' : frames < 15 ? ' (프레임 낮음, 페이지가 무겁거나 창이 일부 가려짐)' : '';
  return [
    `측정: ${new Date().toISOString().slice(0, 10)} ${location.hostname} · 화면 ${W}×${H} · 그릴 때 프레임 ${frames * 2}/초${frameNote}${bannersShown ? ` · 쿠키 창 ${bannersShown}개 뺌` : ''}`,
    ...(gatePhrase && (gateCover || !steps) ? ['입장 화면: 있음, 이 값은 입장 전 화면이다. gate-pass.js로 넘긴 뒤 다시 잰다'] : []),
    `글자 크기(글자 수 많은 순): ${sizes.join(', ')}px · 본문 ${body}px · 첫 화면 가장 큰 글자 ${hero ? px(getComputedStyle(hero).fontSize) : '?'}px (본문의 ${hero ? (size(hero) / body).toFixed(1) : '?'}배)`,
    // No title to report: say so instead of naming a menu item.
    drawn ? `첫 화면 제목(${drawn.how}, 믿음 ${drawn.trust}): ${drawnSpec}` : !firstScreen ? `첫 화면 제목: 없음 (화면에 h1이 없고 가장 큰 글자가 ${hero ? px(getComputedStyle(hero).fontSize) : '?'}px뿐)` : `첫 화면 제목(${heroFrom}): ${spec(hero)}`,
    `본문: ${spec(bodyEl)}${measure ? ` · 문단 폭 최대 ${measure}px` : ''}`,
    `글꼴(많이 쓰는 순): ${fonts.join(', ')}`,
    `색: 배경 ${pageBg} · 글자 ${textCols.join(', ')} · 면 ${surfaces.join(', ')} · 강조 ${accents.join(', ') || '없음'}`,
    `배치: 왼쪽 여백 ${lefts.join(', ') || '?'}px · 그리드 ${grids.join(' / ') || '없음'} · 섹션 위아래 여백 합 ${padY.join(', ') || '?'}px`,
    firstScreen ? `첫 화면 구도: 제목 위치 왼쪽 ${pct(heroLeft, W)} 위 ${pct(heroTop, H)} · 폭 ${pct(heroWidth, W)} · 정렬 ${heroAlign}` : '첫 화면 구도: 제목 없음',
    below,
    `모양: 둥글기 ${radii.map((r) => (r === '알약' ? r : r + 'px')).join(', ') || '0'} · 테두리 ${borders.join(', ') || '없음'} · 그림자 ${shadows}개 · 뒤 흐림 ${blur}개`,
    `움직임: 전환 시간 ${durs.join(', ') || '없음'} · 이징 ${eases.join(', ') || '없음'} · CSS 애니메이션 ${anims}개 · 캔버스 ${canvases}개${bigCanvas ? ' (화면을 채움, 안쪽 글자는 못 잰다)' : ''}${smooth.length ? ' · 부드러운 스크롤 ' + smooth.join(',') : ''}`,
    hoverLine,
  ].join('\n');
})()
