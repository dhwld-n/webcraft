# three-stage

- 종류: 3D 기반 / 후처리
- 강도: 중간~높음
- 어울리는 스타일: immersive-3d, dark-tech, scroll-3d
- 의존성: three.js 0.170 (CDN, importmap)
- 참고: bricelab의 안개·빛 번짐·노이즈로 만든 공기감, A24 디스크의 반사 재질

모든 3D 레시피(`object-shelf`, `point-morph`)가 올라가는 무대. 렌더러, 카메라, 반사용 환경광, 안개, 빛 번짐, 필름 노이즈, 커서 값, 화면 밖이면 멈춤, 모션 줄이기, WebGL이 없을 때 대체까지 한 번에 만든다.

## 코드

```html
<script type="importmap">
{ "imports": {
  "three": "https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js",
  "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
} }
</script>
<canvas id="stage" aria-hidden="true"></canvas>
<!-- WebGL이 없으면 보이는 대체 그림. 장면과 비슷한 정지 이미지나 자리표시 -->
<div class="stage-fallback" role="img" aria-label="장면 설명"></div>
<script type="module" src="main.js"></script>
```

```css
#stage { position: fixed; inset: 0; width: 100%; height: 100%; display: block; z-index: 0; }
.stage-fallback { display: none; position: fixed; inset: 0; background: var(--bg) center / cover; }
.no-webgl #stage { display: none; }
.no-webgl .stage-fallback { display: block; }
/* 장면 위 HTML은 z-index 1 이상. 클릭이 3D로 가야 하는 빈 영역은 pointer-events: none */
```

```js
// stage.js
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

export { THREE };

export function createStage(canvas, { bg = '#0b0c0e', fog = 0.05, bloom = 0.5, grain = 0.05, fov = 35 } = {}) {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  } catch {
    document.documentElement.classList.add('no-webgl');
    return null;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(bg);
  if (fog) scene.fog = new THREE.FogExp2(bg, fog);
  // Soft studio light for reflections without loading an HDR file.
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), bloom, 0.4, 0.85);
  if (bloom) composer.addPass(bloomPass);
  composer.addPass(new OutputPass());
  const grainPass = new ShaderPass({
    uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uAmount: { value: grain } },
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime; uniform float uAmount; varying vec2 vUv;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      void main() {
        vec4 c = texture2D(tDiffuse, vUv);
        c.rgb += (hash(vUv * 1000.0 + uTime) - 0.5) * uAmount;
        gl_FragColor = c;
      }`,
  });
  if (grain) composer.addPass(grainPass);

  // pointer: -1..1, y up. sx/sy follow it smoothly; use those for motion. active: the cursor is over the page.
  const pointer = { x: 0, y: 0, sx: 0, sy: 0, active: false };
  addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / innerWidth) * 2 - 1;
    pointer.y = -((e.clientY / innerHeight) * 2 - 1);
    pointer.active = true;
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { pointer.active = false; });

  // Pixel ratio is re-read here too: it changes when the window moves to another screen or the page zooms.
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    composer.setPixelRatio(renderer.getPixelRatio());
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas);
  addEventListener('resize', resize);
  resize();

  let onScreen = true;
  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; }).observe(canvas);

  const updates = new Set();
  let last = performance.now();
  const frame = (now) => {
    // Reduced motion: time stands still (dt 0), so scenes keep their pose but still render scroll and resize.
    const dt = reduce ? 0 : Math.min((now - last) / 1000, 0.05);
    last = now;
    if (onScreen && !document.hidden) {
      const k = reduce ? 1 : Math.min(1, dt * 4);
      pointer.sx += (pointer.x - pointer.sx) * k;
      pointer.sy += (pointer.y - pointer.sy) * k;
      grainPass.uniforms.uTime.value = now / 1000;
      updates.forEach((fn) => fn(dt, now / 1000));
      composer.render(dt);
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  return {
    THREE, scene, camera, renderer, composer, pointer, reduce,
    onFrame: (fn) => (updates.add(fn), () => updates.delete(fn)),
    setBloom: (v) => { bloomPass.strength = v; },
  };
}
```

```js
// main.js 예시
import { createStage } from './stage.js';

const stage = createStage(document.querySelector('#stage'), { bg: '#101113' });
if (stage) {
  const { THREE, scene, camera, pointer, onFrame } = stage;
  // 카메라가 커서를 따라 아주 조금 기운다
  onFrame(() => {
    camera.position.x = pointer.sx * 0.3;
    camera.position.y = pointer.sy * 0.2;
    camera.lookAt(0, 0, 0);
  });
}
```

### 사람이 만든 3D 모델을 쓸 때
사용자가 준 `.glb`나 무료 CC0 모델만 쓴다 (Poly Haven, Kenney, Quaternius는 CC0). 출처를 페이지 아래나 보고에 적는다.

```js
// model.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export async function loadModel(url, onProgress) {
  const gltf = await new GLTFLoader().loadAsync(url, (e) => e.total && onProgress?.(e.loaded / e.total));
  return gltf.scene;
}
```

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| `bg` | #0b0c0e | | 배경과 안개 색 (같아야 끝이 자연스럽게 녹는다) |
| `fog` | 0.05 | 0~0.15 | 멀어질수록 흐려지는 정도. 0이면 끈다 |
| `bloom` | 0.5 | 0~1.5 | 밝은 부분 빛 번짐. 밝은 배경이면 0~0.2 |
| `grain` | 0.05 | 0~0.12 | 필름 노이즈. 0이면 끈다 |
| `fov` | 35 | 25~60 | 낮을수록 망원 렌즈처럼 납작하고 고급스럽다 |
| 커서 따라가기 | `dt * 4` | 2~8 | 낮을수록 묵직하게 따라온다 |

## 성능
- 픽셀 비율은 2까지만. 휴대폰에서 느리면 `setPixelRatio(1.5)`
- 캔버스가 화면 밖이거나 탭이 숨겨지면 그리지 않는다
- 빛 번짐 패스가 가장 무겁다. 모바일에서 끊기면 `bloom: 0`
- 검수할 때 브라우저 패널이 가려져 있으면 fps가 낮게 나온다. 그건 성능 문제가 아니다

## 하지 말 것
- 캔버스를 여러 개 만들기 (장면 하나에 모은다)
- 모션 줄이기 설정에서 자동 회전 유지
- 안개 색과 배경색을 다르게 (끝에 띠가 생긴다)
- 출처를 모르는 모델이나 텍스처 쓰기
