// Numbers behind a font pairing, for type-critic. Paste the whole file into the browser tool's JavaScript runner.
// It finds which fonts really draw Latin and Hangul in each role, draws their letters on a canvas to read proportions,
// and flags pairs that look like a mistake. The numbers are evidence: whether two fonts belong together still needs eyes.
(async () => {
  await Promise.race([document.fonts.ready, new Promise((done) => setTimeout(done, 2000))]);
  const cv = document.createElement('canvas'); cv.width = 400; cv.height = 400;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  const SIZE = 200;
  const own = (el) => [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
  const shown = (el) => { const r = el.getBoundingClientRect(), s = getComputedStyle(el); return r.width > 2 && r.height > 2 && s.visibility !== 'hidden' && +s.opacity > 0; };
  const banner = '[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i]';
  const texts = [...document.querySelectorAll('body *')].slice(0, 4000).filter((el) => own(el) && shown(el) && !el.closest(banner));
  const GENERIC = /^(serif|sans-serif|monospace|cursive|fantasy|system-ui|ui-[a-z-]+|-apple-system|emoji|math)$/i;
  const stackOf = (el) => getComputedStyle(el).fontFamily.split(',').map((f) => f.trim().replace(/["']/g, ''));
  const name = (f) => f.replace(/-[0-9a-f]{8,}$/, '').replace(/^__(.+?)_[0-9a-f]{6}$/, '$1');

  // A font has a letter if drawing it does not fall back: the width is the same whichever fallback is named.
  const widthWith = (font, ch) => { cx.font = font; return cx.measureText(ch).width; };
  const has = (family, ch) => widthWith(`${SIZE}px "${family}", monospace`, ch) === widthWith(`${SIZE}px "${family}", serif`, ch);
  const drawing = (stack, ch) => stack.find((f) => !GENERIC.test(f) && has(f, ch)) || null;

  // Stroke thickness along one line through the middle of a letter.
  const run = (data, get, len) => { let start = -1; for (let i = 0; i < len; i++) { if (get(data, i) > 128) { if (start < 0) start = i; } else if (start >= 0) return i - start; } return start >= 0 ? len - start : 0; };
  const drawn = (font, ch) => { cx.clearRect(0, 0, 400, 400); cx.font = font; cx.fillStyle = '#000'; cx.textBaseline = 'alphabetic'; cx.fillText(ch, 60, 280); return cx.getImageData(0, 0, 400, 400).data; };
  const inkBox = (d) => { let l = 400, r = 0, t = 400, b = 0; for (let y = 0; y < 400; y++) for (let x = 0; x < 400; x++) if (d[(y * 400 + x) * 4 + 3] > 128) { l = Math.min(l, x); r = Math.max(r, x); t = Math.min(t, y); b = Math.max(b, y); } return { l, r, t, b }; };
  const contrast = (font, ch) => {
    const d = drawn(font, ch), box = inkBox(d);
    if (box.r <= box.l) return null;
    const midY = (box.t + box.b) >> 1, midX = (box.l + box.r) >> 1;
    const thick = run(d, (a, i) => a[(midY * 400 + box.l + i) * 4 + 3], box.r - box.l + 1);
    const thin = run(d, (a, i) => a[((box.t + i) * 400 + midX) * 4 + 3], box.b - box.t + 1);
    return thin ? thick / thin : null;
  };
  const rowWidth = (d, y, box) => { let n = 0; for (let x = box.l; x <= box.r; x++) if (d[(y * 400 + x) * 4 + 3] > 128) n++; return n; };
  const hasSerif = (font) => { const d = drawn(font, 'I'), box = inkBox(d); if (box.r <= box.l) return null; return rowWidth(d, box.b - 2, box) > rowWidth(d, (box.t + box.b) >> 1, box) * 1.3; };

  const measureOf = (family, weight, kind) => {
    if (!family) return null;
    const font = `${weight} ${SIZE}px "${family}"`;
    cx.font = font;
    const tall = (ch) => { const m = cx.measureText(ch); return (m.actualBoundingBoxAscent + m.actualBoundingBoxDescent) / SIZE; };
    if (kind === 'ko') { const h = tall('한'); cx.font = font; return { family, height: h, width: cx.measureText('한글다람쥐').width / (5 * SIZE), contrast: contrast(font, 'ㅇ') }; }
    const x = tall('x'), cap = tall('H');
    cx.font = font;
    return { family, x, cap, width: cx.measureText('Hamburgefonstiv').width / (15 * SIZE), contrast: contrast(font, 'O'), serif: hasSerif(font) };
  };

  // Each role takes the look that carries the most characters.
  const top = (els) => {
    const count = {};
    for (const el of els) { const s = getComputedStyle(el), k = `${stackOf(el).join('|')}~${s.fontWeight}`; (count[k] = count[k] || { n: 0, el }).n += own(el).length; }
    const best = Object.values(count).sort((a, b) => b.n - a.n)[0];
    return best?.el || null;
  };
  const px = (el) => parseFloat(getComputedStyle(el).fontSize);
  const bigOnes = texts.filter((el) => /^H[1-3]$/.test(el.tagName) || el.closest('h1,h2,h3'));
  const roles = {
    // The title is the biggest heading look; small subheads have more characters but are not it.
    제목: top((bigOnes.length ? bigOnes : texts.filter((el) => px(el) >= 32)).filter((el, _, all) => px(el) >= Math.max(...all.map(px)) * 0.7)),
    본문: top(texts.filter((el) => (el.tagName === 'P' || el.tagName === 'LI' || own(el).length > 40) && px(el) <= 24 && !el.closest('h1,h2,h3'))),
    UI: top(texts.filter((el) => el.closest('button, nav, label, [role="button"]'))),
  };
  const read = {};
  for (const [role, el] of Object.entries(roles)) {
    if (!el) continue;
    const s = getComputedStyle(el), stack = stackOf(el);
    read[role] = { size: px(el), weight: s.fontWeight, tracking: s.letterSpacing === 'normal' ? 0 : parseFloat(s.letterSpacing) / px(el), leading: s.lineHeight === 'normal' ? null : parseFloat(s.lineHeight) / px(el), en: measureOf(drawing(stack, 'H'), s.fontWeight, 'en'), ko: measureOf(drawing(stack, '한'), s.fontWeight, 'ko') };
  }

  const pct = (a, b) => Math.abs(a - b) / Math.max(a, b);
  const show = (m, kind) => !m ? '없음' : kind === 'ko'
    ? `${name(m.family)} (높이 ${m.height.toFixed(2)}, 너비 ${m.width.toFixed(2)}, 획 대비 ${m.contrast ? m.contrast.toFixed(1) : '?'})`
    : `${name(m.family)} (x높이 ${m.x.toFixed(2)}, 대문자 ${m.cap.toFixed(2)}, 너비 ${m.width.toFixed(2)}, 획 대비 ${m.contrast ? m.contrast.toFixed(1) : '?'}, ${m.serif === null ? '?' : m.serif ? '세리프' : '산세리프'})`;
  const lines = Object.entries(read).map(([role, r]) => `${role}: ${Math.round(r.size)}px 굵기 ${r.weight} 자간 ${r.tracking.toFixed(3)}em 행간 ${r.leading ? r.leading.toFixed(2) : '기본'} · 라틴 ${show(r.en, 'en')} · 한글 ${show(r.ko, 'ko')}`);

  const flags = [];
  const T = read.제목, B = read.본문;
  // Two fonts that differ only slightly read as a mistake, not a choice.
  const tooClose = (a, b, keys) => a && b && a.family !== b.family && (a.serif === undefined || a.serif === b.serif) && keys.every((k) => a[k] && b[k] && pct(a[k], b[k]) < 0.12);
  if (T && B) {
    const titleWords = bigOnes.map(own).join('');
    const latinShare = (titleWords.match(/[A-Za-z]/g) || []).length / Math.max(1, titleWords.replace(/\s/g, '').length);
    if (latinShare >= 0.3 && tooClose(T.en, B.en, ['x', 'width', 'contrast'])) flags.push(`라틴 제목과 본문이 다른 글꼴인데 거의 같음 (${name(T.en.family)}, ${name(B.en.family)})`);
    if (T.en && B.en && pct(T.en.x, B.en.x) > 0.25) flags.push(`라틴 x높이 차이가 큼 (${Math.round(pct(T.en.x, B.en.x) * 100)}%)`);
    if (T.size / B.size < 1.5) flags.push(`제목이 본문의 ${(T.size / B.size).toFixed(1)}배뿐`);
  }
  if (T && T.size >= 48 && T.tracking >= 0) flags.push(`${Math.round(T.size)}px 제목 자간이 ${T.tracking.toFixed(3)}em (큰 글자는 보통 좁힌다)`);
  if (T && T.size >= 48 && T.leading && T.leading > 1.3) flags.push(`${Math.round(T.size)}px 제목 행간이 ${T.leading.toFixed(2)}`);

  // Hangul and Latin side by side: compare how tall each looks at the same size. Six reference sites read 1.16 to 1.40.
  const mixed = texts.filter((el) => /[가-힣]/.test(own(el)) && /[A-Za-z0-9]/.test(own(el)));
  const seenMix = new Set(), mixLines = [];
  for (const el of mixed) {
    const s = getComputedStyle(el), stack = stackOf(el), en = drawing(stack, 'H'), ko = drawing(stack, '한');
    const key = `${en}|${ko}|${s.fontWeight}`;
    if (!en || !ko || seenMix.has(key) || seenMix.size >= 3) continue;
    seenMix.add(key);
    const a = measureOf(en, s.fontWeight, 'en'), b = measureOf(ko, s.fontWeight, 'ko'), ratio = b.height / a.cap;
    mixLines.push(`${name(en)} + ${name(ko)}: 한글 높이가 대문자의 ${ratio.toFixed(2)}배`);
    if (en !== ko && (ratio < 1.05 || ratio > 1.45)) flags.push(`한글과 라틴을 섞은 글에서 크기가 달라 보임 (${name(en)} + ${name(ko)}, ${ratio.toFixed(2)}배)`);
  }

  // A weight with no matching font file is drawn by smearing the letters.
  const faces = [...document.fonts].filter((f) => f.status === 'loaded');
  const fauxSeen = new Set();
  for (const el of texts) {
    const s = getComputedStyle(el), weight = +s.fontWeight;
    const words = own(el);
    for (const fam of [/[A-Za-z0-9]/.test(words) && drawing(stackOf(el), 'H'), /[가-힣]/.test(words) && drawing(stackOf(el), '한')]) {
      const own2 = fam && faces.filter((f) => f.family.replace(/["']/g, '') === fam);
      if (!own2?.length || fauxSeen.has(fam + weight)) continue;
      const heaviest = Math.max(...own2.map((f) => Math.max(...String(f.weight).split(' ').map(Number))));
      if (weight >= heaviest + 100 && weight >= 600) { fauxSeen.add(fam + weight); flags.push(`${name(fam)} 굵기 ${weight}은 파일이 없어 가짜로 굵어짐 (가장 굵은 파일 ${heaviest}, ${el.tagName.toLowerCase()} 등)`); }
    }
  }

  // Some sites load each weight as its own family (FooBold, FooLight), which is one font to the eye.
  const families = new Set(texts.flatMap((el) => [drawing(stackOf(el), 'H'), drawing(stackOf(el), '한')]).filter(Boolean).map((f) => name(f).replace(/[-_ ]?(thin|light|regular|medium|semibold|bold|black|\d00)$/i, '')));
  if (families.size > 3) flags.push(`실제로 그려지는 글꼴이 ${families.size}개`);

  return [
    `글꼴 ${families.size}개: ${[...families].join(', ')}`,
    ...lines,
    mixLines.length ? `섞인 글: ${mixLines.join(' / ')}` : '섞인 글: 없음',
    `걸린 것: ${flags.join(' · ') || '없음'}`,
  ].join('\n');
})()
