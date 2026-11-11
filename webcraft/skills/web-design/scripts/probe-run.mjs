// Runs the probe scripts on a reference site in headless Chrome, so nothing has to be pasted into a browser tool.
//   node probe-run.mjs <url> <outPrefix> [scripts]
//   scripts: comma list of names in this folder (default measure,interact-probe) or file paths
// Prints each script's lines, saves <outPrefix>-top/mid/low/mobile.jpg (1440×900, mobile 390×844).
// Chrome path: $CHROME, else the usual Chrome or Edge install. Some sites block headless browsers; use the browser tool then.
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [url, out, list = 'measure,interact-probe'] = process.argv.slice(2);
if (!url || !out) { console.log('사용법: node probe-run.mjs <url> <저장 경로 앞부분> [measure,interact-probe]'); process.exit(1); }
const DIR = dirname(fileURLToPath(import.meta.url));
const exe = [process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find((p) => p && existsSync(p));
if (!exe) { console.log('Chrome을 찾지 못했다. CHROME 환경 변수에 실행 파일 경로를 넣는다'); process.exit(1); }

const port = 9300 + Math.floor(Math.random() * 500);
const chrome = spawn(exe, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'probe-'))}`,
  '--window-size=1440,900', '--hide-scrollbars', '--mute-audio', '--no-first-run', 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const quit = (code) => { chrome.kill(); process.exit(code); };

let ws;
for (let i = 0; i < 40 && !ws; i++) {
  try {
    const t = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((x) => x.type === 'page');
    ws = new WebSocket(t.webSocketDebuggerUrl);
  } catch { await sleep(250); }
}
if (!ws) { console.log('Chrome에 연결하지 못했다'); quit(1); }
await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const wait = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && wait.has(m.id)) { wait.get(m.id)(m); wait.delete(m.id); } });
const cdp = (method, params = {}) => new Promise((r) => { const n = ++id; wait.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });
const evalJs = async (expr, ms = 60000) => {
  const r = await Promise.race([cdp('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true, userGesture: true }), sleep(ms).then(() => ({ timeout: true }))]);
  if (r.timeout) return '(시간 초과)';
  return r.result?.exceptionDetails ? `(오류) ${r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text}` : r.result?.result?.value;
};
const shot = async (name) => { const r = await cdp('Page.captureScreenshot', { format: 'jpeg', quality: 60 }); writeFileSync(`${out}-${name}.jpg`, Buffer.from(r.result.data, 'base64')); };

await cdp('Page.enable'); await cdp('Runtime.enable');
await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
await cdp('Network.setUserAgentOverride', { userAgent: String(await evalJs('navigator.userAgent')).replace('HeadlessChrome', 'Chrome') });
await cdp('Page.navigate', { url });
await sleep(7000);                                              // 로딩 화면과 입장 연출이 끝나기를 기다린다
await shot('top');
for (const s of list.split(',').filter(Boolean)) {
  console.log(`=== ${s} ===`);
  console.log(await evalJs(readFileSync(s.includes('/') || s.includes('\\') ? s : join(DIR, `${s}.js`), 'utf8')));
}
await evalJs('scrollTo(0,0)'); await sleep(800);
const h = await evalJs('document.documentElement.scrollHeight');
for (const [n, f] of [['mid', 0.35], ['low', 0.7]]) { await evalJs(`scrollTo(0, ${Math.round(h * f)})`); await sleep(1500); await shot(n); }
await cdp('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
await evalJs('scrollTo(0,0)'); await sleep(2000); await shot('mobile');
quit(0);
