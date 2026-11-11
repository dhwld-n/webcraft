// node swatches.cjs [out.html]  — palettes.md로 조합 견본 페이지를 만든다 (스타일 태그를 눈으로 확인하는 용도)
const fs = require('fs'), path = require('path');
const out = process.argv[2] || path.join(__dirname, 'swatches.html');
const md = fs.readFileSync(path.join(__dirname, 'palettes.md'), 'utf8');
const rows = md.split('\n').filter((l) => l.startsWith('| bm-')).map((l) => l.split('|').slice(1, -1).map((c) => c.trim().replace(/`|\*/g, '')));
const tags = [...new Set(rows.flatMap((r) => r[10].split(', ')))].sort();
const card = ([id, c1, c2, p, alt, names, text, r12, rp1, rp2, tg, mood]) => `
<article class="sw" data-tags="${tg}">
  <div class="sw__face" style="--a:${c1};--b:${c2};--p:${p}">
    <p class="sw__big">밤의 시장 Aa</p>
    <p class="sw__small">둘째 색 글자 · 대비 ${r12} (${text})</p>
    <span class="sw__btn">포인트</span>
  </div>
  <div class="sw__bar"><i style="background:${c1}"></i><i style="background:${c2}"></i><i style="background:${p}"></i>${alt ? `<i style="background:${alt}"></i>` : ''}</div>
  <div class="sw__info">
    <b>${id}</b> <code>${c1}</code> <code>${c2}</code> <code>${p}</code>${alt ? ` <code>${alt}</code>` : ''}
    <div>${names}</div>
    <div class="sw__tags">${tg.split(', ').map((t) => `<span>${t}</span>`).join('')}</div>
    <div class="sw__mood">${mood} · 포인트↔첫째 ${rp1} · 포인트↔둘째 ${rp2}</div>
  </div>
</article>`;
fs.writeFileSync(out, `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BestMatch_color 견본</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css">
<style>
body{margin:0;padding:24px;font-family:"Pretendard Variable",sans-serif;background:#f4f3f0;color:#1b1b1b}
h1{margin:0 0 4px;font-size:22px} p.lead{margin:0 0 16px;color:#555;font-size:14px}
.filter{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:20px}
.filter button{font:inherit;font-size:13px;padding:6px 12px;border:1px solid #bbb;border-radius:999px;background:#fff;cursor:pointer}
.filter button[aria-pressed=true]{background:#1b1b1b;color:#fff;border-color:#1b1b1b}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
.sw{background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgb(0 0 0/.12)}
.sw[hidden]{display:none}
.sw__face{position:relative;background:var(--a);color:var(--b);padding:20px 18px 64px;min-height:96px}
.sw__big{margin:0;font-size:30px;font-weight:800;letter-spacing:-.02em}
.sw__small{margin:6px 0 0;font-size:13px}
.sw__btn{position:absolute;left:18px;bottom:16px;padding:7px 16px;border-radius:999px;background:var(--p);color:var(--a);font-size:13px;font-weight:700}
.sw__bar{display:flex;height:14px}.sw__bar i{flex:1}.sw__bar i:first-child{flex:6}.sw__bar i:nth-child(2){flex:3}
.sw__info{padding:10px 14px 14px;font-size:12px;line-height:1.6}
.sw__info code{font-size:11px;background:#f0f0f0;padding:1px 4px;border-radius:4px}
.sw__tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}.sw__tags span{padding:1px 8px;border-radius:999px;background:#eef2ff;color:#2a3a8f}
.sw__mood{color:#666}
</style></head><body>
<h1>BestMatch_color 견본 (${rows.length}개)</h1>
<p class="lead">위: 첫째 바탕 + 둘째 글자 + 셋째 포인트 버튼. 막대는 6:3:1 비율. 파란 태그가 자동으로 붙은 스타일이다. 틀린 태그는 palettes.md에서 고친다.</p>
<div class="filter"><button aria-pressed="true" data-t="">전체</button>${tags.map((t) => `<button aria-pressed="false" data-t="${t}">${t}</button>`).join('')}</div>
<div class="grid">${rows.map(card).join('')}</div>
<script>
document.querySelector('.filter').addEventListener('click', (e) => {
  const b = e.target.closest('button'); if (!b) return;
  document.querySelectorAll('.filter button').forEach((x) => x.setAttribute('aria-pressed', x === b));
  document.querySelectorAll('.sw').forEach((s) => { s.hidden = b.dataset.t && !s.dataset.tags.split(', ').includes(b.dataset.t); });
});
</script></body></html>`);
console.log('견본', rows.length, '→', out);
