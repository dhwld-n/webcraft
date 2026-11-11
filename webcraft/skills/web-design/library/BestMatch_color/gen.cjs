// node gen.cjs raw.txt palettes.md  — raw.txt(한 줄에 "#색 & #색 & #포인트")로 표를 다시 만든다. 대비와 스타일 태그는 자동
const fs = require('fs');
const [raw, out] = process.argv.slice(2);
const NAMED = { 'bubblegum pink': '#FFC1CC' };
const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const hsl = (h) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
  if (!d) return { h: 0, s: 0, l: l * 100 };
  const s = d / (1 - Math.abs(2 * l - 1)); const H = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return { h: (H * 60 + 360) % 360, s: s * 100, l: l * 100 };
};
const kind = (h) => {
  const c = hsl(h);
  if (c.l < 12) return 'black'; if (c.l > 92 && c.s < 60) return 'white'; if (c.s < 15) return c.l < 50 ? 'graydark' : 'gray';
  if (c.l > 78) return 'pastel'; if (c.s > 85 && c.l > 45 && c.l < 70) return 'neon'; if (c.l < 30) return 'deep';
  if (c.h >= 15 && c.h <= 45 && c.s < 70) return 'earth'; return 'vivid';
};
const hueName = (h) => {
  const c = hsl(h); if (c.s < 15) return c.l < 20 ? '검정' : c.l > 85 ? '흰색' : '회색';
  const n = [[15, '빨강'], [40, '주황'], [62, '노랑'], [100, '라임'], [160, '초록'], [195, '청록'], [250, '파랑'], [290, '보라'], [335, '자홍'], [361, '빨강']].find(([x]) => c.h < x)[1];
  return (c.l > 80 ? '연' : c.l < 25 ? '짙은 ' : '') + n;
};
const inHue = (c, a, b, minS = 50) => { const h = hsl(c); return h.h >= a && h.h < b && h.s > minS; };
const seen = new Map(); const rows = [];
for (const line of fs.readFileSync(raw, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean)) {
  const [main, alt] = line.split(' / ');
  const cols = main.split('&').map((x) => x.trim()).map((x) => (NAMED[x.toLowerCase()] ? NAMED[x.toLowerCase()] + '*' : x.toUpperCase()));
  const key = cols.join('|'); if (seen.has(key)) { seen.set(key, seen.get(key) + 1); continue; } seen.set(key, 1);
  const [c1, c2, p] = cols.map((x) => x.replace('*', '')); const all = [c1, c2, p];
  const k = all.map(kind); const L1 = hsl(c1).l, P = hsl(p);
  const r12 = cr(c1, c2);
  const text = r12 >= 4.5 ? '본문 가능' : r12 >= 3 ? '큰 글자만' : '면끼리만';
  const tags = new Set(), mood = new Set();
  const isDark = (c) => ['black', 'deep', 'graydark'].includes(kind(c));
  const darkish = isDark(c1) || (isDark(c2) && !['white', 'gray', 'pastel'].includes(k[0]) && lum(c1) < 0.18); // 바탕 후보(첫째, 또는 첫째가 진한 색일 때 둘째)가 어두운가
  mood.add(darkish ? '어두움' : '밝음');
  const coolNeon = all.filter((c) => !isDark(c)).some((c) => { const h = hsl(c); return h.s > 80 && h.l > 45 && ((h.h >= 62 && h.h < 200) || (h.h >= 280 && h.h < 345)); });
  const warmPoint = (P.h < 45 || P.h >= 345) && P.s > 70;
  const mono = [c1, c2].every((c) => hsl(c).s < 15);                 // 첫째·둘째가 무채색
  if (darkish && coolNeon) { tags.add('cyberpunk'); tags.add('futuristic'); mood.add('형광'); }
  if (darkish && all.some((c) => inHue(c, 195, 300, 50))) tags.add('dark-tech');
  if (mono && warmPoint) { tags.add('swiss'); tags.add('minimalism'); }
  if (k[2] === 'neon' && P.h >= 62 && P.h < 100) { tags.add('y2k-chrome'); tags.add('futuristic'); }
  if (k[2] === 'black' && !darkish) { tags.add('pop-art'); tags.add('neo-brutalism'); }
  if (k.includes('white') || (k[0] === 'gray' && L1 > 85)) { tags.add('minimalism'); tags.add('editorial'); }
  if ([c1, c2].some((c) => { const h = hsl(c); return h.h >= 30 && h.h <= 60 && h.l > 85 && h.s < 60; })) { tags.add('editorial'); tags.add('retro'); mood.add('따뜻함'); }
  if (k.includes('earth')) { tags.add('retro'); tags.add('bohemian'); mood.add('흙빛'); }
  if (k.filter((x) => x === 'pastel' || x === 'white').length >= 2 && k.includes('pastel')) { tags.add('vector-art'); tags.add('claymorphism'); mood.add('부드러움'); }
  const blue = all.some((c) => { const h = hsl(c); return h.h >= 215 && h.h <= 245 && h.s > 70 && h.l > 25 && h.l < 60; });
  const hot = all.some((c) => { const h = hsl(c); return (h.h < 15 || h.h > 345 || (h.h >= 40 && h.h < 62)) && h.s > 75 && h.l > 40; });
  if (blue && hot) { tags.add('swiss'); tags.add('pop-art'); }
  if (k.filter((x) => x === 'neon' || x === 'vivid').length >= 2 && !k.includes('black')) { tags.add('maximalism'); tags.add('pop-art'); mood.add('쨍함'); }
  if (k.includes('neon') && all.some((c) => inHue(c, 290, 345, 70))) tags.add('y2k-chrome');
  if (darkish && all.some((c) => inHue(c, 250, 300, 50))) tags.add('aurora');
  if (!tags.size) tags.add(darkish ? 'dark-tech' : 'editorial');
  rows.push({ id: `bm-${String(rows.length + 1).padStart(2, '0')}`, cols, alt: alt ? alt.trim().toUpperCase() : '', names: all.map(hueName).join(' + '),
    text, r12, rp1: cr(p, c1), rp2: cr(p, c2), tags: [...tags].slice(0, 4).join(', '), mood: [...mood].join(', ') });
}
const dup = [...seen].filter(([, n]) => n > 1).map(([k, n]) => `${k.replace(/\|/g, ' & ')} (${n}번)`);
const f = (x) => x.toFixed(1), q = (x) => '`' + x + '`';
const md = [
  '# BestMatch_color', '',
  `사용자가 고른 색 조합 ${rows.length}개. **세 번째 색이 포인트(강조) 색이다.** 첫째와 둘째는 바탕과 주조, 또는 바탕과 글자로 쓴다. 어느 쪽을 바탕으로 쓸지는 정하지 않았다 (밝기와 분위기로 정한다).`, '',
  '## 쓰는 법',
  '- `node SCRIPTS/lib.mjs colors <스타일 키> [개수]`로 그 스타일에 어울리는 조합을 뽑는다. system-designer의 bundle에도 5개가 들어간다',
  '- 세 색을 역할에 넣는다: 첫째·둘째는 `bg`와 `text`(또는 `surface`), 셋째는 `accent`. 나머지 역할(`muted`, `border`, `on-accent`)은 이 세 색의 명도를 바꿔 만든다',
  '- 포인트 색은 화면의 5~15%만: 버튼, 밑줄, 숫자 하나, 스티커. 면으로 크게 쓰지 않는다',
  '- **글자 대비:** "첫째↔둘째"가 "면끼리만"이면 둘을 글자-바탕 쌍으로 쓰지 않는다. 글자는 검정 `#111`이나 흰색으로 따로 정한다. 포인트 대비가 3 미만인 바탕에서는 포인트 색을 글자로 쓰지 않는다 (버튼 면으로만)',
  '- 고른 뒤에는 늘 `contrast.mjs`로 다시 검사한다', '',
  '## 표 읽는 법',
  '- 대비는 WCAG 대비 비율. 본문 글자 4.5 이상, 큰 글자 3 이상',
  '- 어울리는 스타일과 분위기는 색의 밝기·채도·색상으로 **자동 분류**했다. 맞지 않으면 손으로 고친다',
  '- `*`: 이름으로 받은 색을 hex로 바꾼 것 (bubblegum pink → #FFC1CC)',
  '- 넷째: 받은 조합에 따로 붙어 있던 대체 포인트',
  ...(dup.length ? [`- 겹쳐 받은 조합은 한 번만 넣었다: ${dup.join(', ')}`] : []), '',
  '## 조합', '',
  '| id | 첫째 | 둘째 | 포인트 | 넷째 | 색 이름 | 첫째↔둘째 | 대비 | 포인트↔첫째 | 포인트↔둘째 | 어울리는 스타일 | 분위기 |',
  '|---|---|---|---|---|---|---|---|---|---|---|---|',
  ...rows.map((r) => `| ${r.id} | ${r.cols.map(q).join(' | ')} | ${r.alt ? q(r.alt) : ''} | ${r.names} | ${r.text} | ${f(r.r12)} | ${f(r.rp1)} | ${f(r.rp2)} | ${r.tags} | ${r.mood} |`), '',
].join('\n');
fs.writeFileSync(out, md);
console.log(rows.length, 'rows; dup', dup.length);
