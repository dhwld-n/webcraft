# view-transition

- 종류: 페이지 전환
- 강도: 낮음~중간
- 어울리는 스타일: 거의 모두. 특히 immersive-3d, editorial
- 의존성: 없음 (브라우저 기본 View Transitions API)
- 참고: A24 콘셉트 사이트에서 목록과 상세가 끊기지 않고 이어지는 느낌 (원리만)

페이지를 옮겨도 하얗게 깜빡이지 않고, 같은 요소(제목, 표지 이미지)가 제자리에서 새 위치로 이어진다. 라이브러리 없이 CSS 몇 줄. 지원하지 않는 브라우저(현재 Firefox 일부)는 평범하게 넘어간다.

## 코드

```css
/* 같은 사이트 안의 페이지 이동에 전환을 켠다. 두 페이지 모두에 넣는다 */
@view-transition { navigation: auto; }

::view-transition-old(root),
::view-transition-new(root) { animation-duration: 0.45s; animation-timing-function: cubic-bezier(0.2, 0, 0, 1); }

/* 이어질 요소: 목록 페이지와 상세 페이지에서 같은 이름을 준다. 이름은 한 페이지에 하나만 */
.work-title[data-id='one'] { view-transition-name: work-one; }
::view-transition-group(work-one) { animation-duration: 0.6s; animation-timing-function: cubic-bezier(0.2, 0, 0, 1); }

@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}
```

```js
// 한 페이지 안에서 내용만 바꿀 때 (탭, 필터, 상세 열기)
function swap(update) {
  if (!document.startViewTransition) return update();
  document.startViewTransition(update);
}
```

3D 목록(`object-shelf`)에서 상세로 갈 때: 3D 물체는 이어지지 않으므로, 목록의 HTML 제목과 상세의 큰 제목에 같은 `view-transition-name`을 준다. 제목이 날아가 자리 잡는 동안 장면이 사라지면 충분히 이어진 느낌이 난다.

## 조절값
| 값 | 기본 | 범위 | 효과 |
|---|---|---|---|
| 전체 전환 시간 | 0.45s | 0.25~0.8s | 페이지 전체가 바뀌는 시간 |
| 이어지는 요소 시간 | 0.6s | 0.4~1s | 제목이나 이미지가 옮겨 가는 시간. 전체보다 조금 길게 |

## 성능
브라우저가 화면 캡처로 처리해서 가볍다. 이어질 요소는 페이지당 몇 개만.

## 하지 말 것
- 같은 `view-transition-name`을 한 페이지의 여러 요소에 (전환이 통째로 취소된다)
- 전환 시간 1초 이상 (페이지 이동이 느려 보인다)
- 다른 사이트로 가는 링크에 기대하기 (같은 출처끼리만 된다)
