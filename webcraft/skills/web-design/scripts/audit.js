// Page audit for webcraft critics. Paste the whole file into the browser tool's JavaScript runner
// on the page under review; it returns one short JSON object instead of many screenshots.
// Checks: horizontal overflow, fonts loaded, fonts applied page-wide, weights with no font file, Korean headings falling back to the body font, text contrast, a11y basics, leftover placeholders,
// reduced-motion and focus-visible rules, AI-look signals, frame rate.
(async () => {
  const W = innerWidth;
  const sel = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (el.classList[0] ? '.' + el.classList[0] : '');

  const cv = document.createElement('canvas'); cv.width = cv.height = 1;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const rgba = (c) => { cx.clearRect(0, 0, 1, 1); cx.fillStyle = '#000'; cx.fillStyle = c; cx.fillRect(0, 0, 1, 1); return [...cx.getImageData(0, 0, 1, 1).data]; };
  const lum = ([r, g, b]) => [r, g, b].map((v) => (v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4).reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
  const bgOf = (el) => {
    for (let e = el; e; e = e.parentElement) {
      const s = getComputedStyle(e);
      if (s.backgroundImage !== 'none') return null;
      const c = rgba(s.backgroundColor);
      if (c[3] > 200) return c;
    }
    return rgba(getComputedStyle(document.body).backgroundColor || '#fff');
  };

  // Only a real horizontal scrollbar counts; clipped marquees and sliders are fine.
  const pageScrolls = document.documentElement.scrollWidth > W + 1;
  const overflow = pageScrolls ? [...document.querySelectorAll('body *')]
    .filter((el) => { const r = el.getBoundingClientRect(); return r.width && r.right > W + 1; })
    .slice(0, 5).map(sel) : [];

  await document.fonts.ready;
  const root = getComputedStyle(document.documentElement);
  const faces = [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family.replace(/["']/g, ''));
  const fonts = [...new Set(['--font-display', '--font-body', '--font-mono']
    .map((v) => root.getPropertyValue(v).split(',')[0].trim().replace(/["']/g, ''))
    .filter((f) => f && !/^(system-ui|sans-serif|serif|monospace|var\()/.test(f)))]
    .map((f) => ({ font: f, loaded: faces.includes(f) }));

  // Every visible text and form control should use one of the --font-* families (fallbacks included).
  const assigned = new Set(['--font-display', '--font-body', '--font-ui', '--font-num', '--font-mono']
    .flatMap((v) => root.getPropertyValue(v).split(',').map((f) => f.trim().replace(/["']/g, '')))
    .filter((f) => f && !/^(system-ui|sans-serif|serif|monospace|cursive|var\()/.test(f)));
  const offFont = [];
  let fontChecked = 0;
  if (assigned.size) {
    for (const el of document.querySelectorAll('body *')) {
      if (fontChecked > 400) break;
      const control = /^(BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName);
      const own = control || [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!own || !el.getBoundingClientRect().width) continue;
      fontChecked++;
      const first = getComputedStyle(el).fontFamily.split(',')[0].trim().replace(/["']/g, '');
      if (!assigned.has(first)) offFont.push(`${sel(el)} ${first}`);
    }
  }

  // Korean headings whose Hangul actually renders in the body font (or a system font) because the display
  // stack has no loaded Korean font. Hangul glyphs are mostly 1em wide, so compare ink bounds, not just width.
  const bodyFam = root.getPropertyValue('--font-body').split(',')[0].trim().replace(/["']/g, '');
  const ink = (stack, t) => { cx.font = `48px ${stack}`; const m = cx.measureText(t); return [m.width, m.actualBoundingBoxAscent, m.actualBoundingBoxDescent, m.actualBoundingBoxLeft, m.actualBoundingBoxRight].map((v) => v.toFixed(1)).join(); };
  const hangulOff = [];
  for (const el of document.querySelectorAll('h1, h2, h3')) {
    const t = (el.textContent.match(/[가-힣]/g) || []).slice(0, 8).join('');
    if (!t || !bodyFam) continue;
    const fams = getComputedStyle(el).fontFamily.split(',').map((f) => f.trim().replace(/["']/g, ''))
      .filter((f) => f && !/^(serif|sans-serif|monospace|cursive|fantasy|system-ui)$/.test(f));
    if (!fams.length || fams[0] === bodyFam) continue; // heading set in the body font on purpose
    const others = fams.filter((f) => f !== bodyFam);
    await Promise.all(others.map((f) => document.fonts.load(`48px "${f}"`, t).catch(() => {})));
    const base = ink(`"${bodyFam}", sans-serif`, t);
    if (!others.some((f) => ink(`"${f}", "${bodyFam}", sans-serif`, t) !== base)) hangulOff.push(`${sel(el)} ${fams.join(' > ')}`);
  }

  const lowContrast = [];
  let checked = 0, unknownBg = 0;
  for (const el of document.querySelectorAll('body *')) {
    if (checked > 400 || lowContrast.length >= 6) break;
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const r = el.getBoundingClientRect();
    if (!own || !r.width || !r.height) continue;
    const s = getComputedStyle(el);
    if (s.visibility === 'hidden' || +s.opacity === 0) continue;
    checked++;
    const bg = bgOf(el);
    if (!bg) { unknownBg++; continue; }
    const large = parseFloat(s.fontSize) >= 24 || (parseFloat(s.fontSize) >= 18.66 && +s.fontWeight >= 700);
    const k = ratio(rgba(s.color), bg);
    if (k < (large ? 3 : 4.5)) lowContrast.push(`${sel(el)} ${k.toFixed(2)} "${el.textContent.trim().slice(0, 20)}"`);
  }

  const css = [...document.styleSheets].map((sh) => { try { return [...sh.cssRules].map((r) => r.cssText).join('\n'); } catch { return ''; } }).join('\n');
  const named = (el) => (el.textContent.trim() || el.getAttribute('aria-label') || el.getAttribute('title') || el.querySelector('img[alt]:not([alt=""])'));

  // Signs that a page looks AI-made (see guide/anti-ai-look.md).
  const visible = [...document.querySelectorAll('body *')].filter((el) => el.getBoundingClientRect().width);
  const ownText = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
  const hue = ([r, g, b]) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; if (!d) return -1; const h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return (h * 60 + 360) % 360; };
  const emojiEls = visible.filter((el) => /(?![©®™‼⁉])\p{Extended_Pictographic}/u.test(ownText(el)));
  const gradientText = visible.filter((el) => { const s = getComputedStyle(el); return s.backgroundClip === 'text' || s.webkitBackgroundClip === 'text'; });
  const bluePurple = visible.filter((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (!bg.includes('gradient')) return false;
    const hs = (bg.match(/rgba?\([^)]+\)/g) || []).map((c) => hue(c.match(/[\d.]+/g).slice(0, 3).map(Number)));
    return hs.some((h) => h >= 200 && h < 255) && hs.some((h) => h >= 255 && h <= 310);
  });
  const blobs = visible.filter((el) => { const m = getComputedStyle(el).filter.match(/blur\(([\d.]+)px\)/); return m && +m[1] >= 30; });
  const blocks = visible.filter((el) => /^(H1|H2|H3|P)$/.test(el.tagName) && ownText(el));
  const centered = blocks.filter((el) => getComputedStyle(el).textAlign === 'center');
  const tripleCards = visible.filter((el) => el.children.length === 3 && el.children[0].className
    && [...el.children].every((c) => c.className === el.children[0].className)).length;
  const cliche = /혁신적인|새로운 차원|차원이 다른|완벽한 솔루션|한 단계 업그레이드|극대화|손쉽게|원활한|경험해\s?보세요|지금 바로 시작|seamless|unlock|empower|elevate|revolutioni[sz]e|next-level|cutting-edge|supercharge|effortless|game-?changer/gi;
  const cliches = [...new Set((document.body.innerText.match(cliche) || []).map((s) => s.toLowerCase()))];
  const shouting = [...document.querySelectorAll('button, a')].filter((el) => el.textContent.includes('!')).length;
  const hiddenUnicode = (document.body.innerHTML.match(/[\u200B-\u200F\u202A-\u202E\u2060-\u2064\uFEFF]/g) || []).length;
  // Generic defaults plus the fonts AI-made sites reach for lately (keep in sync with OVERUSED in lib.mjs).
  const generic = /^(Inter|Roboto|Arial|Helvetica|Pretendard|Pretendard Variable|Noto Sans KR|Poppins|Montserrat|Open Sans|Geist|Space Grotesk|Manrope|Plus Jakarta Sans|Sora|DM Sans|Outfit|Urbanist|Instrument Serif|Fraunces|Playfair Display|Cormorant|Cormorant Garamond)$/i;
  const firstFont = (v) => root.getPropertyValue(v).split(',')[0].trim().replace(/["']/g, '');
  const overusedFont = generic.test(firstFont('--font-display'));

  // Newer tells: the SaaS hero kit, dark page + lime button, mono caps labels, chip clutter, cream + centered serif.
  const hsl = ([r, g, b]) => { const mx = Math.max(r, g, b) / 255, mn = Math.min(r, g, b) / 255, l = (mx + mn) / 2, d = mx - mn; return [hue([r, g, b]), d ? d / (1 - Math.abs(2 * l - 1)) : 0, l]; };
  const transparent = (c) => rgba(c)[3] < 20;
  const pageBg = bgOf(document.body) || rgba(getComputedStyle(document.documentElement).backgroundColor);
  const h1 = visible.find((el) => el.tagName === 'H1');
  const h1r = h1 && h1.getBoundingClientRect();
  const h1Top = h1 && h1r.top + scrollY < innerHeight;
  const pills = visible.filter((el) => {
    const s = getComputedStyle(el), r = el.getBoundingClientRect(), t = el.textContent.trim();
    return r.height < 48 && t && t.length <= 40 && el.children.length <= 3 && parseFloat(s.fontSize) <= 15
      && parseFloat(s.borderTopLeftRadius) >= r.height / 2 - 1 && (!transparent(s.backgroundColor) || parseFloat(s.borderTopWidth) > 0);
  });
  const pillEyebrow = !!h1Top && pills.some((el) => { const r = el.getBoundingClientRect(); return r.bottom <= h1r.top + 2 && h1r.top - r.bottom < 120 && r.right > h1r.left && r.left < h1r.right; });
  const chips = pills.filter((el) => !/^(A|BUTTON)$/.test(el.tagName) && !el.closest('a, button')).length;
  // A greyed-out part of the headline ("Ship faster. / With less work."); accent-coloured words don't count.
  const h1Contrast = h1 && ratio(rgba(getComputedStyle(h1).color), pageBg);
  const twoTone = !!h1Top && [...h1.querySelectorAll('*')].some((c) => {
    if (!ownText(c) || !c.getBoundingClientRect().width) return false;
    const col = rgba(getComputedStyle(c).color);
    return +getComputedStyle(c).opacity < 1 || (hsl(col)[1] < 0.25 && ratio(col, pageBg) < h1Contrast * 0.8);
  });
  const limeOnDark = lum(pageBg) < 0.03 && [...document.querySelectorAll('a, button')].some((el) => {
    const [h, s, l] = hsl(rgba(getComputedStyle(el).backgroundColor));
    return el.getBoundingClientRect().width && h >= 50 && h <= 100 && s > 0.6 && l > 0.45;
  });
  const monoCaps = visible.filter((el) => {
    const s = getComputedStyle(el), t = ownText(el);
    return t && parseFloat(s.fontSize) <= 14 && /mono|code|courier/i.test(s.fontFamily) && !el.closest('pre, code')
      && (s.textTransform === 'uppercase' || (/[A-Z]{2,}/.test(t) && !/[a-z]/.test(t)));
  }).length;
  const [bh, bs, bl] = hsl(pageBg);
  const h1Font = h1 ? getComputedStyle(h1).fontFamily.split(',')[0] : '';
  const creamSerif = !!h1Top && bh >= 25 && bh <= 60 && bs > 0.2 && bl > 0.86 && getComputedStyle(h1).textAlign === 'center'
    && /serif|명조|바탕|myeongjo|batang|garamond|playfair|fraunces|cormorant|hahmlet|gowun/i.test(h1Font) && !/sans/i.test(h1Font);
  const aiFlags = {
    emojiIcons: emojiEls.length >= 2,
    gradientText: gradientText.length > 0,
    bluePurpleGradient: bluePurple.length > 0,
    glowBlobs: blobs.length >= 2,
    mostlyCentered: blocks.length >= 6 && centered.length / blocks.length > 0.7,
    tripleCards: tripleCards >= 2,
    cliches: cliches.length > 0,
    shoutingButtons: shouting > 0,
    hiddenUnicode: hiddenUnicode > 0,
    overusedFont,
    pillEyebrow,
    centeredHero: !!h1Top && getComputedStyle(h1).textAlign === 'center',
    twoToneHeadline: twoTone,
    limeOnDark,
    monoCapsLabels: monoCaps >= 5,
    chipClutter: chips >= 6,
    creamCenteredSerif: creamSerif,
  };
  const aiLook = {
    flags: Object.keys(aiFlags).filter((k) => aiFlags[k]),
    emoji: emojiEls.slice(0, 3).map((el) => `${sel(el)} "${ownText(el).slice(0, 15)}"`),
    gradientText: gradientText.length, bluePurple: bluePurple.length, blobs: blobs.length,
    centered: `${centered.length}/${blocks.length}`, tripleCards, cliches, shoutingButtons: shouting, hiddenUnicode,
    displayFont: firstFont('--font-display'), monoCaps, chips,
  };

  // Hidden tabs throttle or stop frames, so cap the wait.
  let frames = 0; const t0 = performance.now();
  await Promise.race([
    new Promise((done) => { const f = () => { frames++; performance.now() - t0 < 1000 ? requestAnimationFrame(f) : done(); }; requestAnimationFrame(f); }),
    new Promise((done) => setTimeout(done, 1500)),
  ]);

  // A weight with no matching font file is drawn by smearing the letters. Only fonts the page loaded itself are checked.
  const loadedFaces = [...document.fonts].filter((f) => f.status === 'loaded');
  const fauxBold = [...new Set([...document.querySelectorAll('body *')].slice(0, 4000).filter((el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && el.getBoundingClientRect().width > 2).map((el) => {
    const s = getComputedStyle(el), weight = +s.fontWeight;
    const words = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('');
    // The font that really draws these letters: a Latin-only display font does not draw an all-Hangul heading.
    const sample = /[A-Za-z0-9]/.test(words) ? 'H' : '한';
    const draws = (f) => { const w = (fb) => { cx.font = `100px "${f}", ${fb}`; return cx.measureText(sample).width; }; return w('monospace') === w('serif'); };
    const family = s.fontFamily.split(',').map((f) => f.trim().replace(/["']/g, '')).find((f) => loadedFaces.some((face) => face.family.replace(/["']/g, '') === f) && draws(f));
    if (!family || weight < 600) return null;
    const heaviest = Math.max(...loadedFaces.filter((face) => face.family.replace(/["']/g, '') === family).map((face) => Math.max(...String(face.weight).split(' ').map(Number))));
    return weight >= heaviest + 100 ? `${family} ${weight} (파일은 ${heaviest}까지)` : null;
  }).filter(Boolean))].slice(0, 4);

  return {
    width: W,
    pageScrolls,
    overflow,
    fonts,
    fontCoverage: assigned.size ? { checked: fontChecked, offFont: offFont.length, examples: [...new Set(offFont)].slice(0, 5) } : 'no --font-* variables',
    headingHangulInBodyFont: hangulOff.slice(0, 4),
    fauxBold,
    contrast: { checked, unknownBg, low: lowContrast },
    imgNoAlt: document.querySelectorAll('img:not([alt])').length,
    emptyLinks: document.querySelectorAll('a[href="#"], a:not([href])').length,
    unnamedControls: [...document.querySelectorAll('a, button')].filter((el) => !named(el)).slice(0, 5).map(sel),
    placeholders: (document.body.innerText.match(/lorem|ipsum|TODO|예시 문구|placeholder/gi) || []).length,
    reducedMotionRule: css.includes('prefers-reduced-motion'),
    focusVisibleRule: css.includes(':focus-visible'),
    aiLook,
    fps: frames,
    visibility: document.visibilityState,
  };
})()
