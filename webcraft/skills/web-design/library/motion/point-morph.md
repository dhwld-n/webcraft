# point-morph

- 종류: 3D / 입자 / 스크롤
- 강도: 높음
- 어울리는 스타일: immersive-3d, dark-tech, retro-pixel
- 의존성: three.js 0.170, `three-stage` 레시피
- 참고: bricelab의 빛이 사각 점으로 흩어지는 효과 (원리만)

수천 개의 점이 형태를 이룬다. 스크롤하면 다음 형태(이름 글자 → 로고 → 제품 윤곽)로 흘러가 바뀌고, 커서가 지나가면 점이 밀려난다. 입장할 때는 흩어져 있던 점이 모인다. 3D 모델 없이도 공간감이 나는 방법이다.

형태는 최대 4개. 글자(`fromText`), 3D 도형이나 불러온 모델(`fromMesh`)에서 점을 뽑는다. 형태는 **내용과 이어지게** 고른다 (사람 이름, 회사 로고, 제품 실루엣). 의미 없는 구와 토러스만 돌리면 뻔해진다.

## 코드

```js
// points.js
import { THREE } from './stage.js';
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';

// n points on the surface of a mesh (a primitive or a loaded model), centred and scaled to `size`.
export function fromMesh(mesh, n, size = 3) {
  mesh.geometry.computeBoundingBox();
  const box = mesh.geometry.boundingBox, scale = size / box.getSize(new THREE.Vector3()).length();
  const centre = box.getCenter(new THREE.Vector3());
  const sampler = new MeshSurfaceSampler(mesh).build();
  const out = new Float32Array(n * 3), p = new THREE.Vector3();
  for (let i = 0; i < n; i++) {
    sampler.sample(p);
    p.sub(centre).multiplyScalar(scale).toArray(out, i * 3);
  }
  return out;
}

// n points filling the letters of `text`, `width` world units wide, a little depth for parallax.
export function fromText(text, n, width = 5, font = '800 160px sans-serif') {
  const c = document.createElement('canvas'), g = c.getContext('2d');
  g.font = font;
  c.width = Math.ceil(g.measureText(text).width) + 20;
  c.height = 220;
  g.font = font; g.fillStyle = '#fff'; g.textBaseline = 'middle';
  g.fillText(text, 10, 110);
  const { data } = g.getImageData(0, 0, c.width, c.height);
  const filled = [];
  for (let y = 0; y < c.height; y += 2) for (let x = 0; x < c.width; x += 2) if (data[(y * c.width + x) * 4 + 3] > 128) filled.push(x, y);
  const out = new Float32Array(n * 3), k = width / c.width;
  for (let i = 0; i < n; i++) {
    const j = Math.floor(Math.random() * (filled.length / 2)) * 2;
    out.set([(filled[j] - c.width / 2) * k, -(filled[j + 1] - c.height / 2) * k, (Math.random() - 0.5) * 0.3], i * 3);
  }
  return out;
}

const vertexShader = `
  attribute vec3 aP0; attribute vec3 aP1; attribute vec3 aP2; attribute vec3 aP3; attribute float aRand;
  uniform float uStep; uniform float uScatter; uniform float uTime; uniform float uSize; uniform vec2 uPointer; uniform float uPush;
  varying float vRand;
  void main() {
    vec3 p = mix(aP0, aP1, clamp(uStep, 0.0, 1.0));
    p = mix(p, aP2, clamp(uStep - 1.0, 0.0, 1.0));
    p = mix(p, aP3, clamp(uStep - 2.0, 0.0, 1.0));
    p += (vec3(fract(aRand * 13.1), fract(aRand * 71.7), fract(aRand * 37.3)) - 0.5) * uScatter * 10.0;
    p += 0.02 * sin(uTime * 1.5 + aRand * 40.0);
    vec4 world = modelMatrix * vec4(p, 1.0);
    vec2 away = world.xy - uPointer;
    world.xy += normalize(away + 1e-4) * smoothstep(0.9, 0.0, length(away)) * uPush;
    vec4 mv = viewMatrix * world;
    gl_PointSize = uSize * (0.6 + aRand * 0.8) / -mv.z;
    gl_Position = projectionMatrix * mv;
    vRand = aRand;
  }`;

const fragmentShader = `
  uniform vec3 uColor; uniform float uRound; varying float vRand;
  void main() {
    if (uRound > 0.5 && length(gl_PointCoord - 0.5) > 0.5) discard;
    gl_FragColor = vec4(uColor * (0.6 + vRand * 0.6), 1.0);
  }`;

export function createPoints(stage, shapes, { color = '#d8d6d0', size = 16, round = false, push = 0.6 } = {}) {
  const { scene, camera, renderer, pointer, reduce } = stage;
  const n = shapes[0].length / 3;
  const geo = new THREE.BufferGeometry();
  const at = (i) => shapes[Math.min(i, shapes.length - 1)];
  geo.setAttribute('position', new THREE.BufferAttribute(at(0), 3));
  ['aP0', 'aP1', 'aP2', 'aP3'].forEach((name, i) => geo.setAttribute(name, new THREE.BufferAttribute(at(i), 3)));
  geo.setAttribute('aRand', new THREE.BufferAttribute(Float32Array.from({ length: n }, Math.random), 1));
  const uniforms = {
    uStep: { value: 0 }, uScatter: { value: reduce ? 0 : 1 }, uTime: { value: 0 },
    uSize: { value: size * renderer.getPixelRatio() }, uPointer: { value: new THREE.Vector2(99, 99) },
    uPush: { value: reduce ? 0 : push }, uColor: { value: new THREE.Color(color) }, uRound: { value: round ? 1 : 0 },
  };
  const points = new THREE.Points(geo, new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, transparent: true, depthWrite: false }));
  points.frustumCulled = false;
  scene.add(points);

  // Pointer projected onto the z = 0 plane, so the push lines up with the cursor.
  const ray = new THREE.Raycaster(), plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), hit = new THREE.Vector3();
  const state = { step: 0, target: 0, scatter: uniforms.uScatter.value, scatterTarget: uniforms.uScatter.value };
  stage.onFrame((dt, t) => {
    const k = reduce ? 1 : Math.min(1, dt * 3);
    state.step += (state.target - state.step) * k;
    state.scatter += (state.scatterTarget - state.scatter) * (reduce ? 1 : Math.min(1, dt * 1.6));
    uniforms.uStep.value = state.step;
    uniforms.uScatter.value = state.scatter;
    uniforms.uTime.value = t;
    uniforms.uSize.value = size * renderer.getPixelRatio();
    ray.setFromCamera({ x: pointer.x, y: pointer.y }, camera);
    if (!pointer.active) uniforms.uPointer.value.set(99, 99);
    else if (ray.ray.intersectPlane(plane, hit)) uniforms.uPointer.value.set(hit.x, hit.y);
    if (!reduce) points.rotation.y = pointer.sx * 0.25;
  });

  return {
    points,
    to: (i) => { state.target = Math.max(0, Math.min(i, shapes.length - 1)); },
    gather: () => { state.scatterTarget = 0; },
    scatter: () => { state.scatterTarget = 1; },
  };
}
```

```js
// main.js 예시: 이름 → 도형 → 로고 글자, 섹션마다 바뀐다
import { createStage, THREE } from './stage.js';
import { createPoints, fromText, fromMesh } from './points.js';

const stage = createStage(document.querySelector('#stage'), { bloom: 0.4 });
if (stage) {
  const N = 9000;
  const cloud = createPoints(stage, [
    fromText('한서진', N, 5, '800 160px "Wanted Sans", sans-serif'),
    fromMesh(new THREE.Mesh(new THREE.TorusKnotGeometry(1, 0.3, 200, 24)), N),
    fromText('LAB', N, 4),
  ]);
  cloud.gather(); // 흩어진 점이 모인다. 입장 버튼과 묶으려면 입장할 때 부른다
  // <section data-shape="1"> 처럼 섹션마다 보여 줄 형태 번호를 단다
  const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && cloud.to(+e.target.dataset.shape)), { threshold: 0.5 });
  document.querySelectorAll('[data-shape]').forEach((s) => io.observe(s));
}
```

`fromText`에 웹폰트를 쓰려면 글꼴이 불러와진 뒤에 부른다 (`await document.fonts.load('800 160px "Wanted Sans"')`).

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| 점 개수 `N` | 9000 | 3000~30000 | 많을수록 형태가 또렷하다. 휴대폰은 6000 안팎 |
| `size` | 16 | 8~40 | 점 크기 |
| `round` | false | | false면 사각 점(디지털, 픽셀), true면 둥근 점(먼지, 별) |
| `push` | 0.6 | 0~1.5 | 커서가 점을 밀어내는 힘 |
| 형태 바뀌는 속도 | `dt * 3` | 1~6 | 낮을수록 천천히 흘러가며 바뀐다 |
| 모이는 속도 | `dt * 1.6` | 0.5~3 | 입장 때 흩어진 점이 모이는 속도 |
| `color` | #d8d6d0 | | 점 색. 빛 번짐과 함께 쓰면 밝은 색이 빛난다 |

## 성능
- 점 2만 개까지는 대부분의 기기에서 가볍다. 셰이더가 위치를 계산하므로 JS는 매 프레임 거의 일하지 않는다
- 형태는 처음에 한 번만 만든다. `fromMesh`는 고해상도 모델에서 느릴 수 있다

## 하지 말 것
- 의미 없는 구, 토러스, 정이십면체만 (흔한 AI 3D가 된다). 첫 형태는 이름이나 로고처럼 이 사이트만의 것
- 형태 5개 이상 (셰이더는 4개까지)
- 점이 글자 위를 덮어 본문이 안 읽히게 두기 (본문 영역 뒤에서는 `to()`로 흩어진 형태로 바꾸거나 어둡게)
