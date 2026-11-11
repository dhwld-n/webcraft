#!/usr/bin/env node
// Library lookups with short output, so agents never read whole library files.
// usage:
//   node lib.mjs refs <style> [style...]       matching references, one line each
//   node lib.mjs note <id>                      key sections of one reference note
//   node lib.mjs fonts <style> [ko|en] [limit]  fonts tagged with a style (embedding-banned fonts excluded)
//   node lib.mjs fontshare <category>           Fontshare fonts in a category (산세리프, 세리프, 디스플레이 ...)
//   node lib.mjs motion <style>                 recipe headers that fit a style
//   node lib.mjs bundle <style> [id...]         style card + reference briefs + fonts + load hints + recipes
//   node lib.mjs recipe <name> [name...]        recipe code blocks + tuning table only
//   node lib.mjs example <style>                model section code for a style (library/styles/examples)
//   node lib.mjs colors <style> [n]             user-picked colour combos (library/BestMatch_color), third colour = point
//   node lib.mjs --test

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const LIB = join(dirname(fileURLToPath(import.meta.url)), '..', 'library');
const read = (...p) => readFileSync(join(LIB, ...p), 'utf8');
const clean = (s) => s.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\(https:\/\/noonnu\.cc\/font_page\/(\d+)\)/, '$1 (noonnu:$2)').trim();

// Markdown tables -> [{ section, ...columns }]
function tables(md) {
  const rows = [];
  let section = '', head = null;
  for (const line of md.split('\n')) {
    if (line.startsWith('#')) { section = line.replace(/^#+\s*/, ''); head = null; continue; }
    if (!line.startsWith('|')) { head = null; continue; }
    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells.every((c) => /^-+$/.test(c))) continue;
    if (!head) { head = cells; continue; }
    rows.push(Object.fromEntries([['section', section], ...head.map((h, i) => [h, cells[i] ?? ''])]));
  }
  return rows;
}

const fits = (cell, styles) => styles.some((s) => (cell || '').includes(s));

// Fonts every AI-made site reaches for. Kept out of the designer's candidates (audit.js flags them too).
export const OVERUSED = ['Inter', 'Geist', 'Space Grotesk', 'Manrope', 'Plus Jakarta Sans', 'Sora', 'DM Sans', 'Poppins',
  'Montserrat', 'Roboto', 'Open Sans', 'Outfit', 'Urbanist', 'Instrument Serif', 'Fraunces', 'Playfair Display',
  'Cormorant', 'Cormorant Garamond', 'Noto Sans KR'];
const overused = (name) => OVERUSED.some((o) => name === o || name.startsWith(o + ' ('));
// Fisher-Yates so each run sees a different slice instead of always the top of the table.
const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

function refs(styles) {
  return tables(read('references', 'index.md'))
    .filter((r) => fits(r.styles, styles))
    .map((r) => `${r.id} | ${r.styles} | ${r.industry} | ${r.mood}`);
}

function note(id) {
  const md = read('references', `${id}.md`);
  const meta = md.split('\n').filter((l) => /^- (styles|mood|비고):/.test(l));
  // Layout, type, colour and texture carry the measurable values (sizes, ratios, colours) the composition sketch needs.
  const keep = ['첫인상', '왜 좋은가', '레이아웃', '타이포', '색', '질감', '가져올 수 있는 것', '주의할 것', '실측 수치'];
  const parts = md.split(/\n## /).slice(1).filter((p) => keep.includes(p.split('\n')[0].trim()));
  return [`# ${id}`, ...meta, ...parts.map((p) => '## ' + p.trim().slice(0, p.startsWith('실측') ? 2200 : 700))].join('\n');
}

// Styles with no font tags of their own borrow from close ones.
const FONT_ALIAS = {
  'immersive-3d': ['immersive-3d', 'dark-tech', 'editorial', 'kinetic-type'],
  'liquid-glass': ['liquid-glass', 'editorial', 'swiss', 'dark-tech'],
  'minimalism': ['minimalism', 'swiss'],
  'surreal': ['surreal', 'editorial', 'maximalism'],
  'cyberpunk': ['cyberpunk', 'dark-tech', 'y2k-chrome', 'retro-pixel'],
  'pop-art': ['pop-art', 'maximalism', 'neo-brutalism'],
  'retro': ['retro', 'maximalism'],
  'collage': ['collage', 'editorial', 'maximalism'],
  'vector-art': ['vector-art', 'claymorphism', 'bento-grid'],
  'futuristic': ['futuristic', 'dark-tech', 'y2k-chrome'],
  'handwritten': ['handwritten', 'claymorphism'],
  'bohemian': ['bohemian', 'editorial'],
  'graffiti': ['graffiti', 'neo-brutalism', 'maximalism'],
  'aurora': ['aurora', 'dark-tech', 'grainy-gradient'],
  'victorian': ['victorian', 'editorial'],
};

// fresh: drop overused fonts and shuffle, so the designer doesn't land on the same few every time.
function fonts(style, lang, limit = 30, fresh = false) {
  const langs = lang ? [lang] : ['ko', 'en'];
  return langs.flatMap((l) => {
    const rows = tables(read('fonts', `${l}.md`))
      .filter((r) => fits(r['어울리는 스타일'], FONT_ALIAS[style] || [style]) && r['임베딩'] !== '금지')
      .map((r) => ({ ...r, name: clean(r['폰트'] || r['폰트 (Google 이름)']) }));
    return (fresh ? shuffle(rows.filter((r) => !overused(r.name))) : rows)
      .slice(0, limit)
      .map((r) => {
        const src = r['임베딩'] ? `눈누, 임베딩 ${r['임베딩']}` : 'Google';
        // Old-looking faces are marked, so a young brand does not pick one by accident.
        const old = l === 'ko' && /명조|바탕|궁서|고전|전통|옛/.test(`${r.section} ${r['분위기']}`) ? '[전통적] ' : '';
        return `${l} | ${r.section} | ${old}${r.name} | ${r['분위기']} | ${src}`;
      });
  });
}

function fontshare(category, limit = Infinity) {
  const md = read('fonts', 'en.md');
  const fsPart = md.slice(md.indexOf('## Fontshare'));
  const rows = tables(fsPart).filter((r) => !category || r.section === category);
  return (category ? rows : shuffle(rows)).slice(0, limit)
    .map((r) => `${clean(r['폰트'])} | ${r.section} | ${r.slug.replace(/`/g, '')} | ${r['굵기']} | ${r['용도 태그']}`);
}

function motion(style) {
  return readdirSync(join(LIB, 'motion')).filter((f) => f.endsWith('.md')).sort().flatMap((f) => {
    const head = read('motion', f).split('\n').slice(0, 8);
    const get = (k) => (head.find((l) => l.startsWith(`- ${k}:`)) || '').replace(`- ${k}:`, '').trim();
    const fit = get('어울리는 스타일');
    if (!fit.includes(style) && !fit.startsWith('거의 모두')) return [];
    return [`${f.replace('.md', '')} | ${get('종류')} | 강도 ${get('강도')} | ${fit}`];
  });
}

// A recipe's code blocks and its tuning table, without the prose around them.
function recipe(name) {
  const md = read('motion', `${name}.md`);
  const code = [...md.matchAll(/```(?:html|css|js)\n[\s\S]*?```/g)].map((m) => m[0]);
  const tune = (md.match(/## 조절값\n([\s\S]*?)(\n## |$)/) || [, ''])[1].trim();
  const dont = (md.match(/## 하지 말 것\n([\s\S]*?)(\n## |$)/) || [, ''])[1].trim();
  return [`# ${name}`, ...code, '## 조절값', tune, '## 하지 말 것', dont].join('\n');
}

// User-picked colour combos. Third colour is the point (accent). Random pick among combos tagged for the style (or close styles).
function colors(style, n = 5) {
  const rows = tables(read('BestMatch_color', 'palettes.md')).filter((r) => r.id?.startsWith('bm-'));
  const own = rows.filter((r) => fits(r['어울리는 스타일'], [style]));
  const pool = own.length >= n ? own : [...own, ...shuffle(rows.filter((r) => !own.includes(r) && fits(r['어울리는 스타일'], FONT_ALIAS[style] || [style])))];
  const pick = [...shuffle(own), ...pool.filter((r) => !own.includes(r))].slice(0, n);
  const c = (x) => x.replace(/`/g, '');
  return pick.map((r) => `${r.id} | ${c(r['첫째'])} ${c(r['둘째'])} 포인트 ${c(r['포인트'])}${r['넷째'] ? ' (대체 ' + c(r['넷째']) + ')' : ''} | 첫째↔둘째 ${r['첫째↔둘째']} ${r['대비']} · 포인트↔첫째 ${r['포인트↔첫째']} · 포인트↔둘째 ${r['포인트↔둘째']} | ${r['분위기']}`);
}

// Everything system-designer needs in one output, so it spends one tool call instead of six.
function bundle(style, ids) {
  const card = (() => { try { return read('styles', `${style}.md`); } catch { return `(스타일 카드 없음: ${style})`; } })();
  const brief = (id) => {
    const md = read('references', `${id}.md`);
    const mood = (md.match(/^- mood:.*$/m) || [''])[0];
    const pick = (h, n = 450) => ((md.split(/\n## /).find((p) => p.startsWith(h)) || '').split('\n').slice(1).join('\n').trim().slice(0, n));
    // Measured lines beat eyeballed prose for the designer: type and colour from measure.js when the note has them.
    const measured = pick('실측 수치', 2000).split('\n').map((l) => l.replace(/^- /, '')).filter((l) => /^(글자 크기|첫 화면 제목|큰 제목|가장 큰 글자|본문|글꼴|색)[(:]/.test(l)).join('\n');
    const typeColour = measured || `타이포: ${pick('타이포').slice(0, 300)}\n색: ${pick('색').slice(0, 300)}`;
    return `### ${id} ${mood}\n${pick('첫인상')}\n${typeColour}\n가져올 것: ${pick('가져올 수 있는 것')}`;
  };
  const antiAi = readFileSync(join(LIB, '..', 'guide', 'anti-ai-look.md'), 'utf8');
  const section = (h) => (antiAi.match(new RegExp(`## ${h}\\n([\\s\\S]*?)\\n## `)) || [, ''])[1].trim();
  const ko = read('fonts', 'ko.md');
  const quickCss = (ko.match(/## 바로 쓰는 CSS 주소[\s\S]*?```html\n([\s\S]*?)```/) || [, ''])[1]
    .split('\n').filter((l) => l.startsWith('<link')).join('\n');
  return [
    `=== 스타일 카드: ${style} ===`, card.trim(),
    '=== AI 느낌 금지 (스타일 카드가 요구하지 않으면 피한다) ===', section('흔한 첫 화면 틀'), section('디자인'),
    '=== 레퍼런스 ===', ...ids.map(brief),
    '=== 사용자가 고른 색 조합 (BestMatch_color: 첫째·둘째는 바탕과 주조/글자, 셋째는 포인트. 팔레트 하나는 이 중에서 출발한다) ===', ...colors(style, 5),
    `=== 한글 폰트 (언어 | 분류 | 이름 | 분위기 | 출처). 흔한 폰트(${OVERUSED.join(', ')})는 뺐다. 순서는 무작위 ===`, ...fonts(style, 'ko', 20, true),
    '=== 현대 고딕 (스타일과 상관없이 쓸 수 있다. 실용적인 상황의 기본 후보) ===',
    '한글: Pretendard Variable, SUIT Variable, Wanted Sans Variable (아래 주소), IBM Plex Sans KR, Gowun Dodum (Google), 페이퍼로지, 프리젠테이션, 펴진고딕 (눈누)',
    '영문: Instrument Sans (Google), General Sans, Switzer, Satoshi (Fontshare)',
    '=== 영문 폰트 ===', ...fonts(style, 'en', 16, true),
    '=== Fontshare 영문 (이름 | 분류 | slug | 굵기 | 용도). 스타일 태그가 없으니 용도를 보고 판단 ===', ...fontshare(null, 10),
    '=== 불러오는 법 ===',
    'Google: <link href="https://fonts.googleapis.com/css2?family=Name+Here:wght@400;700&display=swap" rel="stylesheet">',
    'Fontshare: <link href="https://api.fontshare.com/v2/css?f[]=<slug>@400,700&display=swap" rel="stylesheet">',
    '눈누 폰트는 아래 주소가 있으면 그것을, 없으면 https://noonnu.cc/font_page/<id> 의 @font-face를 쓴다', quickCss,
    '주의: 나눔 계열 CSS는 굵기마다 이름이 따로다(NanumSquareRoundB, NanumSquareRoundEB ...). font-weight로 고르려면 CSS 대신 @font-face로 woff2를 직접 부른다. 예: https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareRound/NanumSquareRoundEB.woff2 (font-weight: 800)',
    '=== 모션 레시피 (이름 | 종류 | 강도 | 어울리는 스타일) ===', ...motion(style),
  ].join('\n');
}

function selfTest() {
  assert.ok(refs(['claymorphism']).some((l) => l.startsWith('originkit')), 'refs finds originkit for claymorphism');
  assert.ok(note('originkit').includes('## 왜 좋은가'), 'note keeps key sections');
  const z = note('zed');
  assert.ok(['## 레이아웃', '## 타이포', '## 색', '## 질감'].every((h) => z.includes(h)) && z.includes('rgb(17,18,22)'), 'note carries layout/type/colour/texture values');
  assert.ok(!z.includes('## 모션'), 'note drops motion prose');
  assert.ok(/첫 화면 제목\(h1\): plexSerif 26px[\s\S]*\n색: 배경 #111216/.test(bundle('dark-tech', ['zed'])), 'bundle brief prefers measured type and colour');
  assert.ok(z.includes('## 실측 수치') && z.includes('본문의 2.3배'), 'note carries the measured section');
  assert.ok(/첫 화면 제목: 없음/.test(bundle('kinetic-type', ['lando-norris'])), 'bundle brief says when the first screen has no title');
  assert.ok(/첫 화면 제목\(SVG 윤곽, 믿음 보통\): 글자 높이 \d+px/.test(note('anubi')), 'a drawn wordmark counts as the first-screen title');
  assert.ok(/타이포: [\s\S]+\n색: /.test(bundle('editorial', ['_template'])), 'unmeasured notes fall back to prose values');
  for (const f of readdirSync(join(LIB, 'references')).filter((n) => n.endsWith('.md') && !['index.md', '_template.md'].includes(n))) {
    const measured = read('references', f).split('## 실측 수치\n')[1] || '';
    assert.ok(measured.startsWith('- 측정: ') && measured.includes('\n- 아래쪽: '), `${f} has a measured section with the below-the-fold line`);
    assert.ok(!measured.includes('거의 안 그려짐'), `${f} was measured while the page was painting`);
    assert.ok(/^- 측정: \d{4}-\d{2}-\d{2} /.test(measured), `${f} says when it was measured`);
    assert.ok(!measured.includes('입장 전 화면'), `${f} was measured past the entry screen`);
    assert.ok(measured.length < 2200, `${f} measured section fits what note() passes on`);
    assert.ok(measured.includes('- 호버(CSS): ') && measured.includes('- 호버(JS): ') && measured.includes('- 클릭 탐색: ') && measured.includes('- 커서: ') && measured.includes('- 폼: '), `${f} has hover, cursor, form and click lines`);
    if (measured.includes('wheel-probe.js로 잰다')) assert.ok(measured.includes('- 휠 탐색: 실제 휠 '), `${f} has no real scroll, so it needs a wheel-probe line`);
  }
  for (const script of ['measure', 'audit', 'interact-probe', 'wheel-probe', 'gate-pass', 'type-pair']) {
    assert.doesNotThrow(() => new Function(readFileSync(new URL(`./${script}.js`, import.meta.url), 'utf8')), `${script}.js parses`);
  }
  const f = fonts('claymorphism', 'ko', 99);
  assert.ok(f.some((l) => l.includes('주아')), 'fonts finds Jua for claymorphism');
  assert.ok(!f.some((l) => l.includes('메모먼트')), 'fonts excludes embedding-banned fonts');
  assert.ok(fontshare('디스플레이').length > 0, 'fontshare lists a category');
  assert.ok(motion('claymorphism').some((l) => l.startsWith('clay-surface')), 'motion finds clay-surface');
  for (const [st, r] of [['kinetic-type', 'text-reel'], ['bento-grid', 'sticky-stack'], ['immersive-3d', 'coverflow'], ['liquid-glass', 'dock-magnify'], ['dark-tech', 'ai-stream'], ['collage', 'image-trail']]) assert.ok(motion(st).some((l) => l.startsWith(r)), 'motion finds ' + r);
  const b = bundle('claymorphism', ['originkit']);
  assert.ok(b.includes('=== 모션') && b.includes('pretendard') && b.includes('### originkit'), 'bundle has every part');
  assert.ok(b.includes('=== AI 느낌 금지') && b.includes('그라데이션') && b.includes('알약 배지'), 'bundle carries the AI-look ban list and template list');
  const d = bundle('dark-tech', []);
  const listed = d.split('=== 영문 폰트 ===')[1].split('=== 불러오는 법')[0];
  assert.ok(!/\| (Inter|Geist|Space Grotesk) \|/.test(listed), 'bundle drops overused fonts');
  assert.ok(/=== Fontshare[^\n]*\n.+\| `?[a-z0-9-]+`? \|/.test(d), 'bundle includes Fontshare picks');
  assert.ok(fonts('dark-tech', 'en', 99).some((l) => l.includes('| Geist |')), 'plain fonts lookup still lists everything');
  assert.ok(/=== 현대 고딕[^\n]*\n한글: Pretendard/.test(d), 'bundle always offers plain modern sans');
  assert.ok(fonts('editorial', 'ko', 99, true).some((l) => l.includes('[전통적] ') && l.includes('Gowun Batang')), 'old-looking Korean faces are marked');
  assert.ok(!fonts('editorial', 'ko', 99, true).some((l) => l.includes('[전통적] ') && l.includes('Gowun Dodum')), 'sans faces are not marked');
  assert.ok(fonts('swiss', 'ko', 999).some((l) => l.includes('펴진고딕')), 'Sandoll fonts are in the lookup');
  assert.ok(fonts('claymorphism', 'en', 999).some((l) => l.includes('| Caprasimo |')), 'free Cooper-style fonts are in the lookup');
  assert.ok(!fonts('claymorphism', 'en', 999).some((l) => l.includes('Cooper Black |')), 'the subscription font is not auto-picked');
  assert.ok(!fonts('swiss', 'ko', 999).some((l) => /네오현대|체리한스푼/.test(l)), 'fonts barred from embedding stay out');
  assert.ok(fonts('liquid-glass', 'ko', 99).length && fonts('liquid-glass', 'en', 99).length, 'liquid-glass borrows fonts');
  const i3 = bundle('immersive-3d', ['bricelab']);
  assert.ok(i3.includes('object-shelf') && i3.includes('point-morph') && /\nen \|/.test(i3), 'immersive-3d bundle has 3D recipes and borrowed fonts');
  for (const s of readdirSync(join(LIB, 'styles')).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3))) {
    assert.ok(/## 수치 토큰\n[\s\S]*?```css/.test(read('styles', `${s}.md`)), `${s} card has number tokens`);
    assert.ok(read('styles', 'examples', `${s}.md`).includes('```css'), `${s} has model sections`);
  }
  assert.ok(colors('cyberpunk', 3).length === 3 && colors('victorian', 5).length === 5, 'colour combos come back for tagged and borrowed styles');
  assert.ok(colors('cyberpunk', 1)[0].includes('포인트 #'), 'colour lines name the point colour');
  const r = recipe('cushion-button');
  assert.ok(r.includes('```js') && r.includes('## 조절값') && !r.includes('## 성능'), 'recipe keeps code and tuning only');
  console.log('self-test done');
}

const [cmd, ...args] = process.argv.slice(2);
const run = {
  refs: () => refs(args),
  note: () => [note(args[0])],
  fonts: () => fonts(args[0], args[1] === 'all' ? undefined : args[1], Number(args[2]) || 30),
  fontshare: () => fontshare(args[0] === 'all' ? null : args[0]),
  motion: () => motion(args[0]),
  colors: () => colors(args[0], Number(args[1]) || 5),
  bundle: () => [bundle(args[0], args.slice(1))],
  recipe: () => args.map(recipe),
  example: () => { try { return [read('styles', 'examples', `${args[0]}.md`)]; } catch { return [`(모범 섹션 없음: ${args[0]}. 스타일 카드의 수치 토큰과 구도 스케치로 만든다)`]; } },
}[cmd];
if (cmd === '--test') selfTest();
else if (!run || !args.length) { console.error('usage: node lib.mjs refs|note|fonts|fontshare|motion <arg>'); process.exit(2); }
else console.log(run().join('\n') || '(없음)');
