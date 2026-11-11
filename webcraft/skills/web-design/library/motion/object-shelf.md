# object-shelf

- 종류: 3D / 스크롤 / 목록
- 강도: 높음
- 어울리는 스타일: immersive-3d, editorial, scroll-3d
- 의존성: three.js 0.170, `three-stage` 레시피
- 참고: A24 콘셉트 사이트의 스크롤 따라 흐르는 디스크 줄 (원리만)

목록의 항목마다 물건 하나(디스크, 카드, 책)를 만들고 이미지를 입혀, 스크롤하면 비스듬한 줄을 따라 흘러간다. 가운데 온 물건이 지금 항목이다. **진짜 목록은 HTML에 있고**, 3D는 그것을 비춘다. 링크에 초점이 가면 그 항목으로 스크롤하고, 가운데 물건을 누르면 링크로 간다.

물건 모양은 내용에 맞게 고른다: `disc`(음반, 영화), `card`(사진, 포스터, 프로젝트), `book`(책, 잡지). 이미지가 없으면 제목을 그린 자리표시 텍스처가 들어간다.

## 코드

```html
<section class="shelf" style="--count: 5">
  <ol class="shelf-list">
    <li><a href="work/one.html" data-img="img/one.webp">첫 작업</a></li>
    <li><a href="work/two.html" data-img="img/two.webp">두 번째 작업</a></li>
    <!-- ... -->
  </ol>
  <p class="shelf-now" aria-live="polite"></p>
</section>
```

```css
/* 항목 하나당 화면 높이 80%만큼 스크롤 길이 */
.shelf { position: relative; height: calc(var(--count) * 80vh + 100vh); z-index: 1; pointer-events: none; }
.shelf-list { position: sticky; top: 0; padding: 24px; list-style: none; margin: 0; pointer-events: auto; width: max-content; }
.shelf-list a { color: var(--muted); text-decoration: none; }
.shelf-list a[aria-current='true'] { color: var(--text); }
.shelf-now { position: sticky; top: calc(100vh - 64px); padding: 0 24px; margin: 0; }
/* WebGL이 없으면 목록이 평범한 큰 목록으로 보인다 */
.no-webgl .shelf { height: auto; }
.no-webgl .shelf-list a { color: var(--text); font-size: 2rem; }
```

```js
// shelf.js
import { THREE } from './stage.js';

// Placeholder texture with the title drawn on it, used when there is no image yet.
function labelTexture(text, bg, fg) {
  const c = document.createElement('canvas');
  c.width = c.height = 512;
  const g = c.getContext('2d');
  g.fillStyle = bg; g.fillRect(0, 0, 512, 512);
  g.fillStyle = fg; g.font = '600 44px ' + getComputedStyle(document.body).fontFamily;
  g.textAlign = 'center'; g.fillText(text, 256, 270, 440);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeObject(shape, face) {
  const skin = new THREE.MeshPhysicalMaterial({ map: face, roughness: 0.45, clearcoat: 0.6, clearcoatRoughness: 0.2, envMapIntensity: 0.5 });
  if (shape === 'disc') {
    const edge = new THREE.MeshPhysicalMaterial({ color: 0xdddddd, roughness: 0.1, transmission: 0.6, thickness: 0.05 });
    const m = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.03, 96), [edge, skin, skin]);
    m.geometry.rotateX(Math.PI / 2); // face the camera
    return m;
  }
  const size = shape === 'book' ? [1.3, 1.8, 0.25] : [1.4, 1.9, 0.02];
  const side = new THREE.MeshStandardMaterial({ color: shape === 'book' ? 0xf2efe8 : 0x222222, roughness: 0.8 });
  return new THREE.Mesh(new THREE.BoxGeometry(...size), [side, side, side, side, skin, side]);
}

export function createShelf(stage, section, { shape = 'card', spacing = 1.9, rise = 0.55, depth = 0.9, turn = 0.45, placeholder = ['#2a2b2e', '#f2f0eb'] } = {}) {
  const { scene, camera, renderer, reduce } = stage;
  const links = [...section.querySelectorAll('.shelf-list a')];
  const now = section.querySelector('.shelf-now');
  const loader = new THREE.TextureLoader();
  const group = new THREE.Group();
  scene.add(group);

  // A cylinder cap's UVs come out turned a quarter; turn the image back so it reads upright.
  const upright = (t) => { if (shape === 'disc') { t.center.set(0.5, 0.5); t.rotation = Math.PI / 2; } return t; };

  const items = links.map((a, i) => {
    const face = upright(labelTexture(a.textContent.trim(), ...placeholder));
    const mesh = makeObject(shape, face);
    if (a.dataset.img) {
      loader.load(a.dataset.img, (t) => {
        upright(t);
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = renderer.capabilities.getMaxAnisotropy();
        mesh.material.forEach((m) => { if (m.map === face) { m.map = t; m.needsUpdate = true; } });
      });
    }
    mesh.userData.index = i;
    group.add(mesh);
    // Keyboard and screen reader path: focusing a link scrolls its object to the centre.
    a.addEventListener('focus', () => scrollToItem(i));
    return mesh;
  });

  const range = () => section.offsetHeight - innerHeight;
  const progress = () => Math.min(1, Math.max(0, -section.getBoundingClientRect().top / range()));
  const scrollToItem = (i) => scrollTo({
    top: section.offsetTop + (i / Math.max(1, items.length - 1)) * range(),
    behavior: reduce ? 'auto' : 'smooth',
  });

  // Click the centre object to open it, any other to bring it to the centre.
  const ray = new THREE.Raycaster();
  let current = 0;
  renderer.domElement.style.pointerEvents = 'auto';
  addEventListener('click', (e) => {
    if (e.target.closest('a, button, input, select, textarea')) return;
    ray.setFromCamera({ x: (e.clientX / innerWidth) * 2 - 1, y: -(e.clientY / innerHeight) * 2 + 1 }, camera);
    const hit = ray.intersectObjects(items)[0];
    if (!hit) return;
    const i = hit.object.userData.index;
    if (i === current) links[i].click();
    else scrollToItem(i);
  });

  let s = progress();
  return stage.onFrame((dt) => {
    // Follow the scroll with a little lag so the row glides and settles.
    s += (progress() - s) * (reduce ? 1 : Math.min(1, dt * 5));
    const pos = s * (items.length - 1);
    items.forEach((m, i) => {
      const t = i - pos;
      m.position.set(t * spacing, -t * rise, -Math.abs(t) * depth);
      m.rotation.set(-0.15 + stage.pointer.sy * 0.1, -t * turn + stage.pointer.sx * 0.15, t * 0.05);
      const near = Math.max(0, 1 - Math.abs(t));
      m.scale.setScalar(1 + near * 0.12);
    });
    const c = Math.round(pos);
    if (c !== current || !now.textContent) {
      current = c;
      links.forEach((a, i) => a.setAttribute('aria-current', i === c));
      now.textContent = links[c].textContent;
    }
  });
}
```

```js
// main.js 예시
import { createStage } from './stage.js';
import { createShelf } from './shelf.js';

const stage = createStage(document.querySelector('#stage'), { bg: '#ecebe8', fog: 0.04, bloom: 0, grain: 0.03 });
if (stage) createShelf(stage, document.querySelector('.shelf'), { shape: 'disc', placeholder: ['#d9d6cf', '#1b1b1b'] });
```

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `shape` | card | disc, card, book | 물건 모양. 내용의 은유에 맞춘다 |
| `spacing` | 1.9 | 1.2~3 | 옆 물건과의 가로 간격 |
| `rise` | 0.55 | -1~1 | 줄의 기울기. 0이면 수평, 음수면 반대로 내려간다 |
| `depth` | 0.9 | 0~2 | 가운데에서 멀수록 뒤로 물러나는 정도 |
| `turn` | 0.45 | 0~1 | 옆 물건이 비스듬히 돌아가는 각도 |
| 따라가기 | `dt * 5` | 3~10 | 낮을수록 미끄러지듯 늦게 멈춘다 |
| `--count` | | | 항목 수 (스크롤 길이) |

## 성능
- 물건 30개까지는 가볍다. 이미지는 1024px 이하 webp
- 디스크 가장자리의 `transmission`은 무겁다. 느리면 `transmission: 0, opacity`로 바꾼다

## 하지 말 것
- 목록을 3D로만 만들고 HTML 목록을 지우기 (키보드, 검색, WebGL 없는 기기에서 사라진다)
- 내용과 상관없는 물건 고르기 (카페 메뉴를 CD로)
- 레퍼런스와 같은 물건 + 같은 배치 (영화 + CD + 비스듬한 줄)는 베낀 티가 난다. 물건이나 줄의 방향을 바꾼다
- 스크롤을 가로채서 한 칸씩 강제로 넘기기
