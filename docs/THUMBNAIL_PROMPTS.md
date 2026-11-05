# 생각 카드 썸네일 프롬프트

## 테세우스의 배

- 적용 이미지: `public/thumbnails/ship-of-theseus.png`
- 적용 대상: `content/paradoxes.json`의 `p001`
- 생성 도구: 내장 `image_gen`
- 생성 설정: `transparent_background: false`
- 참조 이미지 1: 사용자가 제공한 고서 속 인물 삽화. 거친 펜선과 해칭의 스타일 참조로 사용했습니다.
- 참조 이미지 2: 첫 번째 배 시안인 `output/imagegen/ship-of-theseus-blue.png`. 디테일을 줄일 대상으로 사용했습니다.

아래는 실제 적용 이미지 생성에 사용한 프롬프트입니다. 복잡도를 60% 줄이고 해칭을 5~10개씩 배치한다는 수치는 사용자의 지정이 아닌 생성 시 추가한 조건입니다.

```text
Generate a new Ship of Theseus illustration.

Image 1 is the REQUIRED STYLE REFERENCE: old printed book illustration with expressive irregular pen contours and visible short parallel hatching.

Image 2 is the earlier ship whose detail was too dense.

Find the middle: retain the character and authentic engraved illustration of Image 1, but reduce Image 2's visual complexity by about 60 percent.

This must be a real book illustration, NOT a minimal outline icon or logo.

Draw a modest ancient Greek wooden boat in three-quarter view, single mast and loosely draped square sail, 5-6 hull planks, one plank being replaced with two loose boards alongside.

Use medium dusty blue #527C9C ink on solid white.

Confident slightly rough contour lines with selective groups of 5-10 fine parallel hatch marks at sail folds and below the hull, open white highlights.

A few woodgrain marks ONLY, no ornamental Greek key borders, no carved foliage, no elaborate curled prow, no dense rigging.

Preserve the handcrafted historical printed illustration quality.

Balanced silhouette, generous whitespace, no scenery.

No glow, blur, gradients, color washes, drop shadow, solid colored fills, or text.

Landscape 3:2 spot illustration meant to occupy the upper-middle of a warm paper mobile card.
```

## 더미의 역설

- 생성 이미지: `public/thumbnails/sorites-paradox.png`
- 적용 대상: `content/paradoxes.json`의 `p004`
- 생성 도구: 내장 `image_gen`
- 생성 설정: `transparent_background: false`
- 스타일 참조: `public/thumbnails/ship-of-theseus.png`
- 모래 더미에서 흩어진 모래알로 이어지는 구성입니다.

```text
Create an editorial book illustration of the Sorites paradox (the paradox of the heap). The attached Ship of Theseus illustration is the REQUIRED visual style reference, not the subject. Match its exact muted dusty blue ink #527C9C, slightly rough hand-engraved pen contours, selective parallel hatching and crosshatching, moderate detail, and generous white highlights. Draw one modest irregular mound of sand, viewed slightly from above, with a thin scattering of individual sand grains trailing away to the right, gradually diminishing to one isolated grain. Make it unmistakably granular sand, not rocks or a mountain landscape. Use small irregular stipple marks for the grains and short groups of fine hatched strokes for the shaded side and ground contact. Preserve an antique printed book illustration quality and tactile irregular lines, with the same visual weight as the reference ship. A real illustration, not a geometric icon, not a cartoon, not photorealistic. Single balanced landscape 3:2 spot composition on solid pure white, ample margins, no scenery or horizon. No hands, containers, tools, arrows, text, labels, border, glow, blur, gradients, color washes or solid colored fills. Intended as a companion thumbnail on a warm paper philosophy reading card.
```

