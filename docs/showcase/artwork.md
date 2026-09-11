# Terminal artwork provenance

- Character: 小云 (Xiaoyun), original design by Ai_Floverse for YunYouJun.
- Canonical reference: https://github.com/YunYouJun/yun (images/yun-alpha.png).
- Derivative character asset: `xiaoyun-tactical-v1.png`, AI-assisted adaptation using the built-in image_gen tool, 2026-09-11. Artwork licensed CC BY-NC-SA 4.0, following the source character license; this image is separate from the code's MIT license.
- Style direction: user's supplied Arknights terminal screenshot, with tactical clothing and dynamic ribbons; no claim of official game artwork.
- `../bg/terminal-rooftop-v1.png`: AI-generated clean background plate, derived from the existing terminal scene. Character, UI and lettering removed.
- Character PNG verified as RGBA with alpha range 0–255. Rendering uses a dedicated foreground layer; background contains no character.

## Built-in generation / edit prompts

### xiaoyunTacticalPrompt

Use case: identity-preserve / stylized-concept. Asset: transparent full-body character illustration for an Arknights-inspired game terminal. Image 1 is Xiaoyun's canonical identity reference: preserve her recognizable silver-white hair, two small buns, ahoge, sky-blue eyes, cloud hair ornaments, cheerful slightly mischievous face, blue/cyan/white palette, sailor-collar motif and geometric blue ribbon accents. Image 2 is ONLY the visual style/composition reference: polished anime tactical operator splash illustration, strong angular silhouette, precise equipment details, layered flowing fabric and elegant energy arcs; do not copy that character's face, hair color, costume or dragon. Draw Xiaoyun in a new tasteful fully clothed tactical outfit: white and deep-navy technical sailor jacket, cyan piping, layered practical skirt over opaque tights and technical boots, compact cloud-themed staff/terminal device, small cloud emblems. Dynamic yet readable standing pose, gentle confident smile, a few flowing blue-white fabric ribbons and a graceful cyan cloud-shaped energy arc behind her, no huge opaque effect hiding the face. No sexualization. TRUE TRANSPARENT ALPHA background, no landscape, floor, UI, text, checkerboard pixels or watermark. Wide 16:10 canvas. Full body and effects entirely in frame with margins; Xiaoyun centered at approximately x=36%, head at y=20%, boots near y=93%, rightmost 35% mostly transparent so menu buttons fit there. Keep a clean separate silhouette; exquisite hair and fabric alpha edges. This is a new Xiaoyun derivative, not extraction of the dark-haired character.

### xiaoyunAlphaPrompt

Use case: background-extraction. Edit the provided Xiaoyun illustration. Remove the ENTIRE painted gray checkerboard background, including every gap between hair strands, ribbons, staff and fingers. Return a PNG with actual transparent alpha outside the character. A checkerboard pattern is NOT transparency and must not be drawn. Keep exactly the existing face, pose, silver hair, blue eyes, white/navy/cyan costume, cloud-topped staff, clouds and blue ribbons; do not redesign, do not add any new objects. Preserve clean antialiased edges, full body and current placement/framing. Background: transparent, no color, no grid, no shadow, no backdrop. This is a compositing foreground asset.

### backgroundLayerPrompt

Use case: precise-object-edit. Edit target: supplied 1440 x 900, 16:10 industrial city illustration. Produce a CLEAN BACKGROUND PLATE for a parallax UI. Remove the entire standing character, all her hair, gun, boots, coat and every attached dark blue flowing ribbon/cloth (including the wide cloth extending off the left edge and the fabric curling across the top center). Remove her cast shadow/contact marks. Reconstruct the occluded industrial steel structures, distant city and wet concrete/metal rooftop floor seamlessly and with consistent perspective. Keep the original camera, horizon, cranes, railings, platforms, sky, architecture, lighting, gray-blue palette and composition unchanged, same full 16:10 canvas. Do not insert any people or character silhouettes or dark phantom cloth. No text or UI. Only fill areas hidden by the extracted character; this is a clean plate, not a new scene.

## 八职业小云 / Xiaoyun operator series

2026-09-11 使用内置 `image_gen` 生成。人物参考为 `xiaoyun-tactical-v1.png`；发卡参考为项目 `ak-ui-app-icon-512.png`，将象牙白几何 AK 标志、黑底和橙色三角融入发饰。均为小云衍生创作，沿用以上 CC BY-NC-SA 4.0 素材许可，不是官方游戏素材。

文档主终端的立绘 Playground 可在原版与八职业之间切换，同步替换前景与助理缩略图；只更换图片，不重建终端，保留菜单、弹窗和景深交互。点击「下载 PNG 原图」可查看原始素材。

八职业成品均为 1586 × 992 PNG，已检查为 RGBA、alpha 范围 0–255。直接保留内置生成工具输出的透明通道，未使用本地抠图。

### 先锋 / vanguard

- 素材：[xiaoyun-vanguard-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-vanguard-v1-3afc27b2ab4f.png)
- 定位：前期阻挡敌人，回复部署费用（DP / Cost）。

```text
Use case: stylized-concept / identity-preserve. Create ONE full body illustration of Xiaoyun as the 先锋 (vanguard) class for an Arknights-inspired game terminal. Reference image 1 defines character identity ONLY: silver-white long flowing hair, two small buns, ahoge, large sky-blue eyes, cheerful anime face, blue/cloud accents. Reference image 2 is the ak-ui project logo: reproduce its black badge, ivory angular AK monogram, corner frame, and tiny orange triangle as a clearly visible hair clip at her temple. Keep the logo on the hair clip, do not place an oversized logo elsewhere. Outfit and action: Vanguard: lightweight white/navy tactical jacket, opaque leggings and boots, long compact cyan-edged spear with a small cloud pennant, rallying forward stance. Fast and light silhouette. High-quality Arknights-style operator splash art, intricate technical fasteners and fabric, refined anime shading, appealing clean silhouette. All clothing tasteful and practical, no exposed midriff, fully clothed. Full body including boots and all equipment entirely inside a wide 16:10 canvas, character centered at x=36%, top margin 5%, boots y=94%, right 30% empty. Background transparent alpha for compositing. No text, no scenery, no ground shadow, no watermark. This is a new outfit and pose, preserve Xiaoyun's recognizable identity.
```

### 近卫 / guard

- 素材：[xiaoyun-guard-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-guard-v1-e66c9dd8c5d7.png)
- 定位：近战输出核心，正面抗敌并歼灭威胁。

```text
Use case: stylized-concept / identity-preserve. Create ONE full body illustration of Xiaoyun as the 近卫 (guard) class for an Arknights-inspired game terminal. Reference image 1 defines character identity ONLY: silver-white long flowing hair, two small buns, ahoge, large sky-blue eyes, cheerful anime face, blue/cloud accents. Reference image 2 is the ak-ui project logo: reproduce its black badge, ivory angular AK monogram, corner frame, and tiny orange triangle as a clearly visible hair clip at her temple. Keep the logo on the hair clip, do not place an oversized logo elsewhere. Outfit and action: Guard: white/navy armored coat, reinforced opaque trousers, a broad cyan-edged technical sword held at her side, confident grounded stance. Distinct melee duelist silhouette. High-quality Arknights-style operator splash art, intricate technical fasteners and fabric, refined anime shading, appealing clean silhouette. All clothing tasteful and practical, no exposed midriff, fully clothed. Full body including boots and all equipment entirely inside a wide 16:10 canvas, character centered at x=36%, top margin 5%, boots y=94%, right 30% empty. Background transparent alpha for compositing. No text, no scenery, no ground shadow, no watermark. This is a new outfit and pose, preserve Xiaoyun's recognizable identity.
```

### 重装 / defender

- 素材：[xiaoyun-defender-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-defender-v1-6b8ce2a555d5.png)
- 定位：高生命值与防御力，阻挡多名敌人。

```text
Use case: stylized-concept / identity-preserve. Create ONE full body illustration of Xiaoyun as the 重装 (defender) class for an Arknights-inspired game terminal. Reference image 1 defines character identity ONLY: silver-white long flowing hair, two small buns, ahoge, large sky-blue eyes, cheerful anime face, blue/cloud accents. Reference image 2 is the ak-ui project logo: reproduce its black badge, ivory angular AK monogram, corner frame, and tiny orange triangle as a clearly visible hair clip at her temple. Keep the logo on the hair clip, do not place an oversized logo elsewhere. Outfit and action: Defender: heavy navy and white protective armor over fully covered limbs, huge white tower shield with cyan cloud emblem, sturdy armored boots, protective planted stance. Broad shield silhouette. High-quality Arknights-style operator splash art, intricate technical fasteners and fabric, refined anime shading, appealing clean silhouette. All clothing tasteful and practical, no exposed midriff, fully clothed. Full body including boots and all equipment entirely inside a wide 16:10 canvas, character centered at x=36%, top margin 5%, boots y=94%, right 30% empty. Background transparent alpha for compositing. No text, no scenery, no ground shadow, no watermark. This is a new outfit and pose, preserve Xiaoyun's recognizable identity.
```

### 狙击 / sniper

- 素材：[xiaoyun-sniper-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-sniper-v1-e5b64b353852.png)
- 定位：远程物理输出，应对空中或高速敌人。

```text
Use case: stylized-concept / identity-preserve. Create ONE full body illustration of Xiaoyun as the 狙击 (sniper) class for an Arknights-inspired game terminal. Reference image 1 defines character identity ONLY: silver-white long flowing hair, two small buns, ahoge, large sky-blue eyes, cheerful anime face, blue/cloud accents. Reference image 2 is the ak-ui project logo: reproduce its black badge, ivory angular AK monogram, corner frame, and tiny orange triangle as a clearly visible hair clip at her temple. Keep the logo on the hair clip, do not place an oversized logo elsewhere. Outfit and action: Sniper: streamlined navy/white ranger coat and opaque leggings, compact futuristic crossbow with cyan scope and folded mechanical limbs, one hand lifting her visor, focused standing pose. Clear ranged crossbow silhouette. High-quality Arknights-style operator splash art, intricate technical fasteners and fabric, refined anime shading, appealing clean silhouette. All clothing tasteful and practical, no exposed midriff, fully clothed. Full body including boots and all equipment entirely inside a wide 16:10 canvas, character centered at x=36%, top margin 5%, boots y=94%, right 30% empty. Background transparent alpha for compositing. No text, no scenery, no ground shadow, no watermark. This is a new outfit and pose, preserve Xiaoyun's recognizable identity.
```

### 术师 / caster

- 素材：[xiaoyun-caster-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-caster-v1-25d2619293f5.png)
- 定位：远程法术输出，对抗高防御敌人。

```text
Use case: stylized-concept / identity-preserve. Create ONE full body illustration of Xiaoyun as the 术师 (caster) class for an Arknights-inspired game terminal. Reference image 1 defines character identity ONLY: silver-white long flowing hair, two small buns, ahoge, large sky-blue eyes, cheerful anime face, blue/cloud accents. Reference image 2 is the ak-ui project logo: reproduce its black badge, ivory angular AK monogram, corner frame, and tiny orange triangle as a clearly visible hair clip at her temple. Keep the logo on the hair clip, do not place an oversized logo elsewhere. Outfit and action: Caster: layered white/navy technical robe over opaque tights, tall cloud-headed casting staff, small brilliant blue floating geometric crystal and restrained magical arcs, confident casting pose. Elegant mage silhouette. High-quality Arknights-style operator splash art, intricate technical fasteners and fabric, refined anime shading, appealing clean silhouette. All clothing tasteful and practical, no exposed midriff, fully clothed. Full body including boots and all equipment entirely inside a wide 16:10 canvas, character centered at x=36%, top margin 5%, boots y=94%, right 30% empty. Background transparent alpha for compositing. No text, no scenery, no ground shadow, no watermark. This is a new outfit and pose, preserve Xiaoyun's recognizable identity.
```

### 医疗 / medic

- 素材：[xiaoyun-medic-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-medic-v1-3a809ce5286a.png)
- 定位：恢复我方干员的生命值。

```text
Use case: stylized-concept / identity-preserve. Create ONE full body illustration of Xiaoyun as the 医疗 (medic) class for an Arknights-inspired game terminal. Reference image 1 defines character identity ONLY: silver-white long flowing hair, two small buns, ahoge, large sky-blue eyes, cheerful anime face, blue/cloud accents. Reference image 2 is the ak-ui project logo: reproduce its black badge, ivory angular AK monogram, corner frame, and tiny orange triangle as a clearly visible hair clip at her temple. Keep the logo on the hair clip, do not place an oversized logo elsewhere. Outfit and action: Medic: white field medical coat with navy undersuit and opaque trousers, cyan medical kit, compact cloud-shaped healing drone above an open palm, warm reassuring smile. Medical insignia is a cyan cloud, no red cross. Gentle field medic silhouette. High-quality Arknights-style operator splash art, intricate technical fasteners and fabric, refined anime shading, appealing clean silhouette. All clothing tasteful and practical, no exposed midriff, fully clothed. Full body including boots and all equipment entirely inside a wide 16:10 canvas, character centered at x=36%, top margin 5%, boots y=94%, right 30% empty. Background transparent alpha for compositing. No text, no scenery, no ground shadow, no watermark. This is a new outfit and pose, preserve Xiaoyun's recognizable identity.
```

### 辅助 / supporter

- 素材：[xiaoyun-supporter-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-supporter-v1-77d602a94396.png)
- 定位：减速、削弱敌人，或增强我方干员。

```text
Use case: stylized-concept / identity-preserve. Create ONE full body illustration of Xiaoyun as the 辅助 (supporter) class for an Arknights-inspired game terminal. Reference image 1 defines character identity ONLY: silver-white long flowing hair, two small buns, ahoge, large sky-blue eyes, cheerful anime face, blue/cloud accents. Reference image 2 is the ak-ui project logo: reproduce its black badge, ivory angular AK monogram, corner frame, and tiny orange triangle as a clearly visible hair clip at her temple. Keep the logo on the hair clip, do not place an oversized logo elsewhere. Outfit and action: Supporter: white/navy long technical cape over opaque leggings, floating blue geometric tactical rings and handheld holographic tablet, calm thoughtful pose. Small cloud-shaped signal emitters. Distinct tactical coordinator silhouette. High-quality Arknights-style operator splash art, intricate technical fasteners and fabric, refined anime shading, appealing clean silhouette. All clothing tasteful and practical, no exposed midriff, fully clothed. Full body including boots and all equipment entirely inside a wide 16:10 canvas, character centered at x=36%, top margin 5%, boots y=94%, right 30% empty. Background transparent alpha for compositing. No text, no scenery, no ground shadow, no watermark. This is a new outfit and pose, preserve Xiaoyun's recognizable identity.
```

### 特种 / specialist

- 素材：[xiaoyun-specialist-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-specialist-v1-3174675049b6.png)
- 定位：位移、快速复活等特殊战术功能。

```text
Use case: stylized-concept / identity-preserve. Create ONE full body illustration of Xiaoyun as the 特种 (specialist) class for an Arknights-inspired game terminal. Reference image 1 defines character identity ONLY: silver-white long flowing hair, two small buns, ahoge, large sky-blue eyes, cheerful anime face, blue/cloud accents. Reference image 2 is the ak-ui project logo: reproduce its black badge, ivory angular AK monogram, corner frame, and tiny orange triangle as a clearly visible hair clip at her temple. Keep the logo on the hair clip, do not place an oversized logo elsewhere. Outfit and action: Specialist: short navy hooded utility jacket with white panels, fully covered legs, climbing harness, compact grappling hook and neatly coiled cyan cable, agile side-step pose with mischievous smile. Distinct mobile grappling specialist silhouette. High-quality Arknights-style operator splash art, intricate technical fasteners and fabric, refined anime shading, appealing clean silhouette. All clothing tasteful and practical, no exposed midriff, fully clothed. Full body including boots and all equipment entirely inside a wide 16:10 canvas, character centered at x=36%, top margin 5%, boots y=94%, right 30% empty. Background transparent alpha for compositing. No text, no scenery, no ground shadow, no watermark. This is a new outfit and pose, preserve Xiaoyun's recognizable identity.
```


## 八职业辨识度改版 / v2

当前 Playground 使用六职业 v2、近卫与辅助 v4；保留 v1 素材供原版蓝白切换。代表色为本项目的角色设计，不是官方职业配色。固定小云银发、双丸子、蓝眼与 ak-ui logo 发卡，通过大面积服装色块、服装轮廓与姿势区分职业，减少重复的蓝色飘带和云雾特效。

| 职业 | 代表色 | 素材 |
| --- | --- | --- |
| 先锋 | 琥珀黄 | [xiaoyun-vanguard-v2.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-vanguard-v2-3a239f8aef9a.png) |
| 近卫 | 酒红银灰 | [xiaoyun-guard-v4.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-guard-v4-c28b2a5e8a14.png) |
| 重装 | 钴蓝 | [xiaoyun-defender-v2.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-defender-v2-1047279e52b7.png) |
| 狙击 | 橄榄绿 | [xiaoyun-sniper-v2.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-sniper-v2-17a5d7c608a3.png) |
| 术师 | 紫罗兰 | [xiaoyun-caster-v2.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-caster-v2-1a80b64b0840.png) |
| 医疗 | 薄荷绿 | [xiaoyun-medic-v2.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-medic-v2-994a03c10114.png) |
| 辅助 | 玫瑰粉 | [xiaoyun-supporter-v4.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-supporter-v4-1061edde6465.png) |
| 特种 | 橙黑 | [xiaoyun-specialist-v2.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-specialist-v2-d246c8672f00.png) |

全部使用内置 image_gen 生成和去背景，沿用上述角色来源及 CC BY-NC-SA 4.0 素材许可。缩略图通过 CSS 聚焦人物并使用职业色边框，移动端按两列排列。

### v2 生成提示词

#### 先锋

```text
Use case: identity-preserve / stylized-concept. Create a radically redesigned full-body Xiaoyun 先锋 (vanguard) operator illustration, Arknights-inspired high-end tactical anime splash art. Image 1 is ONLY face/identity reference, NOT clothing, pose, color palette or decorative effects reference. Preserve her recognizable silver-white hair, twin small buns, loop ahoge, sky-blue eyes and cute face. CHANGE costume silhouette, stance, equipment and dominant clothing color COMPLETELY. Image 2 is ak-ui logo reference: one clearly visible black badge hairclip with ivory angular AK monogram and tiny orange triangle. Design brief: AMBER YELLOW and charcoal. Cropped saturated amber-yellow bomber jacket with rolled-up sleeves over black practical jumpsuit trousers, yellow sneakers/boots, compact small shoulder pennant. Lean forward in a running stride, both knees clearly bent differently, a slim spear aimed forward diagonally. Hair neatly tied back behind the twin buns. Light aerodynamic silhouette. NO long coat. The assigned role color must cover most of the visible clothing in large flat readable masses, NOT merely thin trim. Keep the face and silver hair readable. REMOVE ALL generic blue cloud swirls, long floating ribbons, white/navy sailor jackets and excessive floating ornaments from reference. No copying original white-blue outfit. Only small cloud insignia allowed. Distinct instantly readable at 100-pixel thumbnail size. Fully clothed practical tasteful design, no exposed midriff. TRUE transparent alpha PNG background. Wide 16:10 canvas; complete character and equipment in frame with 5% safety margin, subject centered x=36%, rightmost 25% empty for terminal menus, character occupies most canvas height but do not stretch crouching pose into standing. No ground, no checkerboard pixels, no background scene, no lettering, no watermark.
```

#### 近卫

```text
Use case: identity-preserve / stylized-concept. Create a radically redesigned full-body Xiaoyun 近卫 (guard) operator illustration, Arknights-inspired high-end tactical anime splash art. Image 1 is ONLY face/identity reference, NOT clothing, pose, color palette or decorative effects reference. Preserve her recognizable silver-white hair, twin small buns, loop ahoge, sky-blue eyes and cute face. CHANGE costume silhouette, stance, equipment and dominant clothing color COMPLETELY. Image 2 is ak-ui logo reference: one clearly visible black badge hairclip with ivory angular AK monogram and tiny orange triangle. Design brief: CRIMSON RED and black. Bold crimson fitted armored swordswoman tabard with short split red panels, black opaque armored trousers, red gauntlets and boots. Wide grounded duelist stance, both hands gripping one enormous broad sword held diagonally upward across the body, fierce determined expression. Hair tied in compact high ponytail behind twin buns. Strong diagonal sword silhouette. NO white coat. The assigned role color must cover most of the visible clothing in large flat readable masses, NOT merely thin trim. Keep the face and silver hair readable. REMOVE ALL generic blue cloud swirls, long floating ribbons, white/navy sailor jackets and excessive floating ornaments from reference. No copying original white-blue outfit. Only small cloud insignia allowed. Distinct instantly readable at 100-pixel thumbnail size. Fully clothed practical tasteful design, no exposed midriff. TRUE transparent alpha PNG background. Wide 16:10 canvas; complete character and equipment in frame with 5% safety margin, subject centered x=36%, rightmost 25% empty for terminal menus, character occupies most canvas height but do not stretch crouching pose into standing. No ground, no checkerboard pixels, no background scene, no lettering, no watermark.
```

#### 重装

```text
Use case: identity-preserve / stylized-concept. Create a radically redesigned full-body Xiaoyun 重装 (defender) operator illustration, Arknights-inspired high-end tactical anime splash art. Image 1 is ONLY face/identity reference, NOT clothing, pose, color palette or decorative effects reference. Preserve her recognizable silver-white hair, twin small buns, loop ahoge, sky-blue eyes and cute face. CHANGE costume silhouette, stance, equipment and dominant clothing color COMPLETELY. Image 2 is ak-ui logo reference: one clearly visible black badge hairclip with ivory angular AK monogram and tiny orange triangle. Design brief: COBALT BLUE and steel gray. Broad saturated cobalt-blue heavy plated armor, huge rounded shoulders, thick armored boots, no fabric coat, a huge cobalt rectangular tower shield planted beside her and covering one side of body, other hand confidently on hip, both feet apart in an immovable squared stance. Hair tucked compactly behind armor retaining twin buns. Broad rectangular silhouette, minimal hair flow. The assigned role color must cover most of the visible clothing in large flat readable masses, NOT merely thin trim. Keep the face and silver hair readable. REMOVE ALL generic blue cloud swirls, long floating ribbons, white/navy sailor jackets and excessive floating ornaments from reference. No copying original white-blue outfit. Only small cloud insignia allowed. Distinct instantly readable at 100-pixel thumbnail size. Fully clothed practical tasteful design, no exposed midriff. TRUE transparent alpha PNG background. Wide 16:10 canvas; complete character and equipment in frame with 5% safety margin, subject centered x=36%, rightmost 25% empty for terminal menus, character occupies most canvas height but do not stretch crouching pose into standing. No ground, no checkerboard pixels, no background scene, no lettering, no watermark.
```

#### 狙击

```text
Use case: identity-preserve / stylized-concept. Create a radically redesigned full-body Xiaoyun 狙击 (sniper) operator illustration, Arknights-inspired high-end tactical anime splash art. Image 1 is ONLY face/identity reference, NOT clothing, pose, color palette or decorative effects reference. Preserve her recognizable silver-white hair, twin small buns, loop ahoge, sky-blue eyes and cute face. CHANGE costume silhouette, stance, equipment and dominant clothing color COMPLETELY. Image 2 is ak-ui logo reference: one clearly visible black badge hairclip with ivory angular AK monogram and tiny orange triangle. Design brief: OLIVE GREEN and tan. Large olive hood worn back so twin buns and logo hairclip remain visible, short asymmetric green ranger poncho, tan utility trousers, compact green quiver. Clearly KNEELING on ONE KNEE while carefully aiming a long mechanical crossbow horizontally to the left, focused eye along scope, balanced sensible anatomy. Hair braided behind shoulder. Low triangular silhouette, NO flowing long coat. The assigned role color must cover most of the visible clothing in large flat readable masses, NOT merely thin trim. Keep the face and silver hair readable. REMOVE ALL generic blue cloud swirls, long floating ribbons, white/navy sailor jackets and excessive floating ornaments from reference. No copying original white-blue outfit. Only small cloud insignia allowed. Distinct instantly readable at 100-pixel thumbnail size. Fully clothed practical tasteful design, no exposed midriff. TRUE transparent alpha PNG background. Wide 16:10 canvas; complete character and equipment in frame with 5% safety margin, subject centered x=36%, rightmost 25% empty for terminal menus, character occupies most canvas height but do not stretch crouching pose into standing. No ground, no checkerboard pixels, no background scene, no lettering, no watermark.
```

#### 术师

```text
Use case: identity-preserve / stylized-concept. Create a radically redesigned full-body Xiaoyun 术师 (caster) operator illustration, Arknights-inspired high-end tactical anime splash art. Image 1 is ONLY face/identity reference, NOT clothing, pose, color palette or decorative effects reference. Preserve her recognizable silver-white hair, twin small buns, loop ahoge, sky-blue eyes and cute face. CHANGE costume silhouette, stance, equipment and dominant clothing color COMPLETELY. Image 2 is ak-ui logo reference: one clearly visible black badge hairclip with ivory angular AK monogram and tiny orange triangle. Design brief: VIOLET PURPLE and deep plum. Rich purple long bell-shaped mage robe, oversized long sleeves lined lavender, opaque dark tights and pointed technical boots. FLOATING above nothing with both knees bent and boots tucked together, both arms raised casting a compact purple crystal ring above one palm, tilted playful head. Hair falls vertically in two neat silver sections. Rounded bell silhouette. No staff, no blue swirls. The assigned role color must cover most of the visible clothing in large flat readable masses, NOT merely thin trim. Keep the face and silver hair readable. REMOVE ALL generic blue cloud swirls, long floating ribbons, white/navy sailor jackets and excessive floating ornaments from reference. No copying original white-blue outfit. Only small cloud insignia allowed. Distinct instantly readable at 100-pixel thumbnail size. Fully clothed practical tasteful design, no exposed midriff. TRUE transparent alpha PNG background. Wide 16:10 canvas; complete character and equipment in frame with 5% safety margin, subject centered x=36%, rightmost 25% empty for terminal menus, character occupies most canvas height but do not stretch crouching pose into standing. No ground, no checkerboard pixels, no background scene, no lettering, no watermark.
```

#### 医疗

```text
Use case: identity-preserve / stylized-concept. Create a radically redesigned full-body Xiaoyun 医疗 (medic) operator illustration, Arknights-inspired high-end tactical anime splash art. Image 1 is ONLY face/identity reference, NOT clothing, pose, color palette or decorative effects reference. Preserve her recognizable silver-white hair, twin small buns, loop ahoge, sky-blue eyes and cute face. CHANGE costume silhouette, stance, equipment and dominant clothing color COMPLETELY. Image 2 is ak-ui logo reference: one clearly visible black badge hairclip with ivory angular AK monogram and tiny orange triangle. Design brief: MINT GREEN and ivory. Simple mint-green medical tunic and mint straight scrub trousers with ivory short vest, small white medical satchel, low practical mint shoes, no oversized coat. Upright gentle close-legged stance, torso leaning slightly toward viewer, one palm extended toward viewer with a small mint cloud-shaped healing drone, other hand holding medical satchel. Warm reassuring smile, neat silver shoulder-length silhouette with twin buns and remaining long hair gathered behind back. Clean vertical silhouette. No red cross. The assigned role color must cover most of the visible clothing in large flat readable masses, NOT merely thin trim. Keep the face and silver hair readable. REMOVE ALL generic blue cloud swirls, long floating ribbons, white/navy sailor jackets and excessive floating ornaments from reference. No copying original white-blue outfit. Only small cloud insignia allowed. Distinct instantly readable at 100-pixel thumbnail size. Fully clothed practical tasteful design, no exposed midriff. TRUE transparent alpha PNG background. Wide 16:10 canvas; complete character and equipment in frame with 5% safety margin, subject centered x=36%, rightmost 25% empty for terminal menus, character occupies most canvas height but do not stretch crouching pose into standing. No ground, no checkerboard pixels, no background scene, no lettering, no watermark.
```

#### 辅助

```text
Use case: identity-preserve / stylized-concept. Create a radically redesigned full-body Xiaoyun 辅助 (supporter) operator illustration, Arknights-inspired high-end tactical anime splash art. Image 1 is ONLY face/identity reference, NOT clothing, pose, color palette or decorative effects reference. Preserve her recognizable silver-white hair, twin small buns, loop ahoge, sky-blue eyes and cute face. CHANGE costume silhouette, stance, equipment and dominant clothing color COMPLETELY. Image 2 is ak-ui logo reference: one clearly visible black badge hairclip with ivory angular AK monogram and tiny orange triangle. Design brief: ROSE PINK and ivory. Bold dusty-rose short cape with a large curved collar over ivory tailored trouser suit, rose-pink gloves and ankle boots. Graceful conductor pose: body turned three-quarter, one arm stretched sideways and other raised, a small rose translucent tactical fan of geometric panels between hands. Silver hair gathered into elegant low loop behind twin buns. Broad T-shaped upper-body silhouette, no long blue ribbons, no staff. The assigned role color must cover most of the visible clothing in large flat readable masses, NOT merely thin trim. Keep the face and silver hair readable. REMOVE ALL generic blue cloud swirls, long floating ribbons, white/navy sailor jackets and excessive floating ornaments from reference. No copying original white-blue outfit. Only small cloud insignia allowed. Distinct instantly readable at 100-pixel thumbnail size. Fully clothed practical tasteful design, no exposed midriff. TRUE transparent alpha PNG background. Wide 16:10 canvas; complete character and equipment in frame with 5% safety margin, subject centered x=36%, rightmost 25% empty for terminal menus, character occupies most canvas height but do not stretch crouching pose into standing. No ground, no checkerboard pixels, no background scene, no lettering, no watermark.
```

#### 特种

```text
Use case: identity-preserve / stylized-concept. Create a radically redesigned full-body Xiaoyun 特种 (specialist) operator illustration, Arknights-inspired high-end tactical anime splash art. Image 1 is ONLY face/identity reference, NOT clothing, pose, color palette or decorative effects reference. Preserve her recognizable silver-white hair, twin small buns, loop ahoge, sky-blue eyes and cute face. CHANGE costume silhouette, stance, equipment and dominant clothing color COMPLETELY. Image 2 is ak-ui logo reference: one clearly visible black badge hairclip with ivory angular AK monogram and tiny orange triangle. Design brief: SAFETY ORANGE and charcoal BLACK. Tight compact black utility jumpsuit with BIG saturated orange chest, thigh and forearm panels, orange climbing harness, short orange hood folded back, knee pads and black lightweight boots. Deep low crouching side-lunge, one hand braced near knee and the other swinging a grappling hook on one taut short orange cable upward. Confident mischievous grin, silver hair tied tightly behind twin buns. Compact zigzag silhouette. NO skirt, NO coat tails. The assigned role color must cover most of the visible clothing in large flat readable masses, NOT merely thin trim. Keep the face and silver hair readable. REMOVE ALL generic blue cloud swirls, long floating ribbons, white/navy sailor jackets and excessive floating ornaments from reference. No copying original white-blue outfit. Only small cloud insignia allowed. Distinct instantly readable at 100-pixel thumbnail size. Fully clothed practical tasteful design, no exposed midriff. TRUE transparent alpha PNG background. Wide 16:10 canvas; complete character and equipment in frame with 5% safety margin, subject centered x=36%, rightmost 25% empty for terminal menus, character occupies most canvas height but do not stretch crouching pose into standing. No ground, no checkerboard pixels, no background scene, no lettering, no watermark.
```

### v2 透明背景编辑提示词

```text
Remove the background. Transparent background PNG cutout of this exact character. Preserve all colors, face, clothes, pose, equipment, composition and full image dimensions unchanged.
```

### v2 辅助局部修正提示词

```text
Correct one anatomical error in this illustration: there is an EXTRA third pink-gloved hand resting against the upper chest / collar, just below her chin. REMOVE that extra chest hand and its wrist entirely and reconstruct the rose cape and ivory blouse naturally in that small area. The character must have EXACTLY TWO arms and TWO hands: keep the raised hand above her head and keep the hand extended horizontally to the right beside the pink tactical panels. Preserve everything else exactly: face, pose, color, clothes, hairclip, layout and dimensions. Transparent background PNG, preserve actual alpha. Do not add any hands.
```

v2 八张成品均已检查为 RGBA、alpha 范围 0–255；重装与辅助为 1584 × 993，其余为 1586 × 992。保留生成器输出尺寸，显示时保持原比例。


## 配色协调与结构修订 / v3（历史记录）

近卫、辅助的 v2／v3 已被 v4 替代，四张旧稿已从项目清理。下文保留生成与修订记录，旧文件名仅用于追溯，不再作为可下载素材。

职业配色系列的近卫与辅助分别使用 `xiaoyun-guard-v3.png` 和 `xiaoyun-supporter-v3.png`，其余职业保留 v2。近卫使用银灰护肩、象牙白护领、酒红发卡与柔和发丝反光衔接头身；辅助重画两臂，画面左侧右手托晶体、右侧左手持终端，分别连接左右肩膀，发卡改为玫瑰金与象牙白。

Playground 提供「职业配色 / 原版蓝白」双系列。原版蓝白展示初版八职业（v1）的蓝白服饰和原有姿势，不是对当前图片应用滤镜。切换系列时保留所选职业，同时更新卡片、主图、缩略图和素材路径。「原版 TACTICAL」仍可恢复初始战术立绘。

以下两张使用内置 image_gen 编辑及透明背景提取，已检查为 1586 × 992 RGBA PNG、alpha 范围 0–255，沿用前述素材许可。

### guard v3 提示词

```text
Use case: identity-preserve / precise-object-edit. Redesign and harmonize this Xiaoyun Guard illustration. Preserve recognizable Xiaoyun silver-white hair, twin buns, ahoge, blue eyes, swordfighter role and broad diagonal two-handed sword silhouette. Fix the pasted-on-looking head versus armored body: natural connected neck, clearly readable shoulder anatomy, unified anime proportions (about six heads tall), the face, hair, hands and body must share the same detailed linework, soft neutral lighting and shading. Soften aggressive black/red contrast: muted wine-red and charcoal armor with substantial pearl-silver shoulder plates, ivory inner collar and silver chest accents to bridge silver hair to body. Keep red as the recognizable role accent, but avoid solid black torso. Add subtle warm rose reflected light in hair shadows, keep hair fundamentally silver. Change bright blue hair ornaments to dusty rose and silver, change the huge black logo hairclip to a smaller burgundy/silver enamel ak-ui monogram pin coordinated with armor. Friendly determined Xiaoyun expression, no grim adult face. Preserve full-body composition and boots, generous margins in wide 16:10 canvas, character center-left, empty right edge for menu. Clean isolated character with transparent background. No scenery, text or watermark.
```

### supporter v3 提示词

```text
Use case: identity-preserve / anatomy correction. Redraw the upper body and BOTH ARMS of this Xiaoyun Supporter illustration from scratch with correct anatomy. The current reference has two arms emerging from one side: DO NOT preserve that arm arrangement. NEW SIMPLE POSE: torso faces the viewer, two clearly separated shoulders. Her anatomical RIGHT arm emerges from the shoulder on the VIEWER'S LEFT, upper arm travels diagonally down-left, elbow visible, forearm bends up, one open right palm holding a small pink crystal on the VIEWER'S LEFT of her body. Her anatomical LEFT arm emerges from shoulder on VIEWER'S RIGHT, upper arm travels down-right, elbow visible, left hand holds a closed small tactical tablet near the RIGHT hip. No arm overhead. Exactly two arms, one from EACH shoulder, exactly two hands, natural wrists/thumbs and five fingers. Do not cross arms over chest, no additional gloves or hands near collar. Preserve Xiaoyun silver-white twin-bun hair, ahoge, blue eyes, warm face, rose-pink cape and ivory trouser suit. Reduce cape clutter so both arm paths are visible. Coordinate face/body with uniform neutral light, light rose hair shadows and ivory collar. Replace black hairclip with smaller rose-gold and ivory ak-ui monogram enamel clip; hair ornaments dusty pink not bright blue. Keep elegant support role, full-body feet in frame, wide 16:10 canvas and center-left placement. Transparent background, no scenery, no text or watermark.
```

透明背景提取沿用前述 v2 透明背景编辑提示词。


## 持书与头甲方向修订 / v4

当前职业配色使用 `xiaoyun-supporter-v4.png` 与 `xiaoyun-guard-v4.png`。辅助将左手持书改为屈肘贴近躯干的握持，书脊、封面与手腕方向一致；近卫调整头颈和护领的朝向，减少正面脸与侧转胸甲的割裂。均使用内置 image_gen 编辑并提取透明背景，沿用前述角色素材许可。已检查 RGBA、alpha 范围 0–255；近卫 1584 × 993，辅助 1585 × 992。

### supporter v4 提示词

```text
Use case: precise-object-edit / anatomy correction. Edit ONLY the left forearm, left glove and closed book at the character's anatomical LEFT hip (VIEWER'S RIGHT). The current book grip and wrist orientation are unnatural. Redraw a clearly readable natural book-holding pose: upper arm relaxed from viewer-right shoulder, elbow softly bent, forearm angled inward across waist. Closed rose-ivory hardback book held upright against her left side with the lower edge RESTING IN her upturned left palm. Fingers curl naturally under the bottom edge, LEFT thumb visible on front cover, four fingers support bottom/back, wrist straight in line with forearm. Book front cover faces viewer in mild three-quarter perspective; top edge and spine parallel coherently, book never intersects the wrist or fingers. Keep book small, no extra hands or fingers. Exactly two arms, one from each shoulder; preserve her right raised hand on viewer-left with crystal unchanged. Preserve face, hair, rose-gold hairclip, pink/ivory suit, all remaining pose, lighting and full image composition. Transparent PNG background, no scene or text.
```

### guard v4 提示词

```text
Use case: precise-object-edit / identity-preserve. Correct ONLY head-neck-shoulder-torso orientation of this Xiaoyun Guard illustration to feel anatomically connected. Keep recognizable Xiaoyun face, silver-white twin-bun hair, blue eyes, burgundy enamel hairclip, wine-red and silver armor, wide standing pose and both hands gripping diagonal sword. Currently frontal face and twisted chest armor look disconnected. Redraw face and head at a subtle THREE-QUARTER angle toward VIEWER'S RIGHT, aligned with the same direction as sternum, breastplate, collar and shoulder line. Eyes can gently look back toward viewer, but nose/chin/neck must follow torso orientation. A visible natural neck sits centrally inside the silver collar; coherent collar ellipse, trapezius and shoulder foreshortening, no pasted-on frontal head, no extreme head tilt or neck twist. Unify light from upper-left across face and metal plates, soften hair/body contrast with silver ivory collar and muted wine-red reflected light. Preserve friendly determined character identity, sword, hand grip, limbs, outfit and overall canvas layout. Transparent PNG background, full figure, no scenery, no text.
```

去背景沿用上述透明背景编辑提示词。职业配色与原版蓝白采用手动切换，保留当前职业，避免并列终端挤压角色空间。


## 精英装饰试作 / elite-v1

参考用户本地「照片 → 图片收藏 → arknights」相簿的立绘构图：放大查看了结晶屏障与金色飞马装饰案例，并比较网格中的纯角色与精英立绘。只借鉴能力意象、非矩形轮廓、主体与装饰层次；未导出或收录收藏原图，也未将收藏原图作为生成器输入。生成输入为项目自己的 v4 小云近卫与辅助。

首批两张用于比较不同装饰方向：近卫采用破裂装甲、钢构与剑势；辅助采用档案框架、悬浮书页与战术晶体阵列。保留纯立绘版本及原版蓝白系列。在 Playground 勾选「精英装饰」后，职业配色的近卫、辅助使用装饰版；其他职业与蓝白系列保持纯立绘，状态文字标明实际版本。默认关闭装饰。

采用内置 image_gen 编辑模式，保持原有角色与持物结构，随后使用内置工具提取透明背景。沿用前述角色素材许可。项目文件为 `xiaoyun-guard-elite-v1.png`、`xiaoyun-supporter-elite-v1.png`。

成品已检查为 RGBA，alpha 范围均为 0–255；近卫为 1586 × 992，辅助为 1584 × 993。已在实际终端检查装饰叠加、职业与配色切换、主图和缩略图同步，以及切换时保留景深参数。

### 近卫装饰提示词

```text
Use case: identity-preserve / compositing. Edit this exact Xiaoyun Guard into an Arknights-inspired elite operator splash illustration with integrated decorative scenery. Preserve the existing character's face, silver-white twin buns and loop ahoge, blue eyes, enamel logo hairpin, wine-red/silver armor, naturally aligned head/neck, both hands gripping sword, and all limbs. Do not redesign anatomy. Build an asymmetric stage BEHIND her: a few large broken graphite armor slabs and angular ruined steel ribs rising behind the lower-left silhouette, silver fracture edges and restrained crimson embers, a sharp sweeping crimson sword-energy trace following her blade diagonal, small debris at feet. The decoration tells a close-combat breakthrough story; it must be a coherent hand-painted industrial structure, not a generic circular magic ring, not random flowers. More complex than plain cutout, but character remains brightest focal point and face, hands and sword completely readable. Keep the head background quiet. Decorations occupy left and lower periphery, no full scene, no horizon, no rectangular backdrop. Cohesive detailed tactical anime rendering, restrained dark neutral scenery with crimson accents. Wide 16:10 canvas, FULL figure, sword and decorative silhouette entirely within 5% margin; leave rightmost 20% empty for terminal menu; character center-left. True transparent alpha PNG around and between decorative elements. No checkerboard, lettering, watermark, extra people, extra hands.
```

### 辅助装饰提示词

```text
Use case: identity-preserve / compositing. Edit this exact Xiaoyun Supporter into an Arknights-inspired elite operator splash illustration with integrated decorative scenery. Preserve her exact silver-white twin-bun hair, loop ahoge, blue eyes, rose-gold logo hairpin, rose-pink/ivory trouser suit and cape. LOCK anatomy: exactly two arms connected one to EACH shoulder; anatomical right hand on viewer-left holds crystal; anatomical left hand on viewer-right holds the small CLOSED book naturally close to torso. Do not change these hands or the book grip. Add a coherent floating tactical archive BEHIND her: asymmetric ivory and brushed rose-gold segmented archive frame, three small translucent rose quartz tactical panels linked by very thin luminous lines, several floating ivory folio pages with restrained abstract diagrams, fine crystalline fragments low around feet. Pages and structure create an elegant open fan silhouette echoing the cape, with clear negative spaces. No giant book, no generic circular halo or spiral ribbon. These are inanimate supports, no extra people or arms. Keep face/hand area clean and character brightest focal point. Matte graphite shadows balance pink and ivory; subtly grounded industrial fantasy, avoid sugary floral look. Wide 16:10 canvas, full figure and all ornaments within 5% margin, character center-left, rightmost 20% empty for menu. True transparent alpha PNG around and between decoration; no full background, horizon, rectangular panel, checkerboard, legible text or watermark.
```

### 装饰版透明提取提示词

辅助：

```text
Remove ONLY the checkerboard background. Transparent background PNG cutout of this exact character AND ALL the decorative archive structures, floating pages, panels, crystals and fine details. Preserve all colors, face, clothes, pose, equipment, decoration, composition and full image dimensions unchanged.
```


近卫第一轮透明提取：

```text
Remove ONLY the checkerboard background. Transparent background PNG cutout of this exact character AND ALL decorative broken armor, ruined steel structures, rubble, red energy traces and fine details. Preserve all colors, face, clothes, pose, equipment, decoration, composition and full image dimensions unchanged.
```

第一轮提取仍输出 RGB 棋盘格背景，未作为成品接入；第二轮简化为以下提示词（两张通用）：

```text
Remove the background. Transparent background PNG cutout of this exact character and her decorative objects. Preserve all colors, face, clothes, pose, equipment, composition and full image dimensions unchanged.
```


## 八职业精英装饰 / elite-v1 补全

新增先锋、重装、狙击、术师、医疗、特种六张精英装饰立绘，以各职业 v2 为编辑输入，使用内置 image_gen。沿用前述角色素材许可；此前近卫、辅助的 elite-v1 保持不变。Playground 的职业配色现已全部支持纯立绘／精英装饰切换，原版蓝白仍使用 v1。

六张新成品均为 1586 × 992 RGBA PNG，已验证 alpha 范围为 0–255。

生成提示词按「通用前缀 + 对应职业设计 + 通用结尾」拼接；透明提取使用下方同一提示词，若输出仍为 RGB 棋盘格，则继续用上一轮输出重复透明提取，直至检查到真实 alpha。

### 通用前缀

```text
Use case: identity-preserve / compositing. Edit this exact Xiaoyun operator into an Arknights-inspired elite operator splash illustration with integrated decorative scenery. Preserve her exact face, silver-white hair, twin buns, loop ahoge, blue eyes, costume colors, logo hairclip, pose, weapon grip and all limbs. Exactly two arms and two hands connected to separate shoulders. Do not redesign character anatomy.
```

### 先锋

成品：[xiaoyun-vanguard-elite-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-vanguard-elite-v1-0232139a0e2a.png)

```text
AMBER yellow and graphite. Add a compact forward-deployment outpost behind her running spear pose: two leaning deployable radio beacon masts with small amber pennants, a broken angular launch-platform section beneath the trailing foot, luminous amber directional route marks and a few airborne dust shards following the forward motion. Open diagonal aerodynamic silhouette. No giant wall, no halo.
```

### 重装

成品：[xiaoyun-defender-elite-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-defender-elite-v1-26df5be27ee9.png)

```text
COBALT blue and gunmetal. Add a monumental but compact segmented defensive bulwark behind her tower shield: two thick angular armored barricade wings, hydraulic feet and a low fractured concrete base, restrained translucent blue shield facets bridging gaps. Broad stable rectangular silhouette, character's shield distinct from backdrop. No wings, no floating magic circle.
```

### 狙击

成品：[xiaoyun-sniper-elite-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-sniper-elite-v1-a2691f688ad9.png)

```text
OLIVE green and warm stone. Add an asymmetric ruined observation post behind the kneeling crossbow sniper: a low broken concrete parapet with sparse moss and small windblown leaves, one slender folded reconnaissance antenna behind the far shoulder, subtle green sightline markers away from face. Low horizontal silhouette with a quiet open zone along crossbow aim. No extra gun, no hands, no gigantic foliage.
```

### 术师

成品：[xiaoyun-caster-elite-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-caster-elite-v1-20751fa2e269.png)

```text
VIOLET and dark obsidian. Add a fan of tall floating fractured amethyst monoliths BEHIND her levitating spellcaster pose, thin silver armillary segments broken into asymmetric arcs, a few smaller crystals suspended underneath boots by faint violet force lines. Open upward tapering silhouette. Preserve held crystal and exactly two hands. No solid circular disk, no generic purple smoke filling canvas.
```

### 医疗

成品：[xiaoyun-medic-elite-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-medic-elite-v1-3b8979b20fc0.png)

```text
MINT green and ivory. Add a compact deployable rescue station behind her: an ivory open-frame medical equipment rack with neatly housed supply cartridges, two small hovering service drones echoing her existing cute drone, translucent mint diagnostic panes and a low folded stretcher case by feet. Airy, calm, humane silhouette with generous gaps; all mechanical tools unmistakably inanimate. No extra human arms, no syringes near face, no red cross emblem, no patients.
```

### 特种

成品：[xiaoyun-specialist-elite-v1.png](https://assets.yunyoujun.cn/ak-ui/assets/img/character/xiaoyun-specialist-elite-v1-cbc7196df6fb.png)

```text
SAFETY ORANGE and charcoal. Add a dynamic asymmetric urban rigging structure BEHIND her low crouched grappling pose: a broken narrow black steel catwalk, two orange mechanical anchor winches, a taut cable diagonal linking scenery behind and away from her face, small falling steel fragments. Compact zigzag silhouette, preserve her original hook and its rope path clearly. No cable crossing neck or limbs, no extra hands, no giant wall.
```

### 通用结尾

```text
Detailed polished tactical anime rendering with coherent materials and lighting. Scenery subordinate to the character; keep face, hands and weapon completely readable and brightest focal point. Decorations tell the role's story, not generic swirls. Wide 16:10 canvas; entire character, equipment and decorative silhouette within frame, character centered slightly left, rightmost 20% mostly empty for menu. True transparent PNG background around and between objects. No rectangular background, full landscape, horizon, text, watermark, additional characters or limbs.
```

### 透明提取

```text
Remove the background. Transparent background PNG cutout of this exact character and her decorative objects. Preserve all colors, face, clothes, pose, equipment, composition and full image dimensions unchanged.
```

先锋在两轮透明提取仍保留棋盘格后，最终使用以下简化提示词完成提取：

```text
Remove the background. Transparent background PNG cutout of this exact character. Preserve all colors, face, clothes, pose, equipment, composition and full image dimensions unchanged.
```

### COS 素材存储

`docs/public/img/` 的 40 个素材已迁移至 `yunyoujun-assets-prod-1325586649`（上海）的 `ak-ui/assets/` 前缀，通过 [assets.yunyoujun.cn](https://assets.yunyoujun.cn/) 分发。全部在线文件已校验字节数、SHA-256 与 Content-Type。Playground、背景及其他文档示例直接使用在线资源，本地图片副本已移出仓库；Git 保留素材清单、许可和生成提示词。

展示用的 28 张大 PNG 已生成完整尺寸 WebP（质量 90，透明通道无损），总体积从 43.10 MiB 降至 9.63 MiB；25 张小云另有 640px、质量 85 的 WebP 缩略图。全部 53 个 WebP 已上传并验证，原始 PNG 继续保留在 COS。编码参数与各版本哈希记录于清单，生成脚本为 `scripts/prepare-artwork-webp.mjs`。

文件名含内容哈希，以便区分版本和缓存。近卫、辅助的 v2／v3 四张错误稿已清理。存储桶通过既有 EdgeOne 回源授权提供资源；上传子账号只新增了 `ak-ui/assets/*` 的 `PutObject` 权限。

本地 master 和四个发布标签已清除历史 `docs/public/img/` 与 `docs/.vuepress/public/img/` 路径，非图片文件树及未提交改动已核对保持不变；远端尚未强推。映射和迁移记录见仓库 `assets/` 目录。
