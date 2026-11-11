#!/usr/bin/env node
// WCAG 2.x contrast check.
// usage: node contrast.mjs <fg> <bg> [--large]   (hex: #rgb or #rrggbb)
//        node contrast.mjs <fg>/<bg> <fg>/<bg>! ...   many pairs in one call; trailing ! = large text
//        node contrast.mjs --test
// Prints "<ratio> PASS|FAIL (needs <min>)" per pair and exits 1 if any pair fails.

import assert from 'node:assert/strict';

function parseHex(hex) {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error(`not a hex color: ${hex}`);
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
}

function luminance(hex) {
  const [r, g, b] = parseHex(hex).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function ratio(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

function selfTest() {
  const near = (x, y) => Math.abs(x - y) < 0.01;
  assert.ok(near(ratio('#000', '#fff'), 21), 'black/white = 21');
  assert.ok(near(ratio('#fff', '#fff'), 1), 'same = 1');
  assert.ok(near(ratio('#777777', '#ffffff'), 4.48), '#777 on white = 4.48 (just fails AA)');
  assert.ok(near(ratio('#fff', '#000'), ratio('#000', '#fff')), 'order does not matter');
  let threw = false;
  try { parseHex('#12'); } catch { threw = true; }
  assert.ok(threw, 'bad hex throws');
  assert.deepEqual(toPairs(['#000/#fff', '#777/#fff!']), [['#000', '#fff', false], ['#777', '#fff', true]], 'batch pairs parse');
  assert.deepEqual(toPairs(['#000', '#fff', '--large']), [['#000', '#fff', true]], 'single pair still works');
  console.log('self-test done');
}

// "fg/bg" tokens (trailing ! = large) or the old "<fg> <bg> [--large]" form.
function toPairs(args) {
  if (args.some((a) => a.includes('/'))) {
    return args.map((a) => { const large = a.endsWith('!'); const [fg, bg] = a.replace(/!$/, '').split('/'); return [fg, bg, large]; });
  }
  const [fg, bg] = args.filter((a) => a !== '--large');
  return fg && bg ? [[fg, bg, args.includes('--large')]] : [];
}

const args = process.argv.slice(2);
if (args[0] === '--test') {
  selfTest();
} else {
  const pairs = toPairs(args);
  if (!pairs.length) {
    console.error('usage: node contrast.mjs <fg> <bg> [--large]  |  node contrast.mjs <fg>/<bg>[!] ...');
    process.exit(2);
  }
  let failed = false;
  for (const [fg, bg, large] of pairs) {
    const min = large ? 3 : 4.5;
    const r = ratio(fg, bg);
    failed ||= r < min;
    const label = pairs.length > 1 ? `${fg}/${bg} ` : '';
    console.log(`${label}${r.toFixed(2)} ${r >= min ? 'PASS' : 'FAIL'} (needs ${min})`);
  }
  process.exit(failed ? 1 : 0);
}
