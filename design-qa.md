# Design QA · Rhodes Island terminal

## Evidence

- Source visual truth: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/source-ak-2heng-desktop.png`
- Implementation: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/ak-ui-terminal-desktop-refined-final.png`
- Full comparison: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/ak-ui-terminal-comparison-refined.png`
- Profile/assistant focus: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/ak-ui-terminal-focus-profile-desktop.png`
- Resource/command focus: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/ak-ui-terminal-focus-menu.png`
- Portrait reference and implementation: `source-ak-2heng-mobile.png` and `ak-ui-terminal-mobile-final.png` in the same evidence directory.
- Operation-panel audit source: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/audit-01-source-operation.png`
- Operation-panel audit implementation: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/audit-09-operation-accepted.png`
- Direct operation-panel source capture: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/direct-03-source-panel-focus.png`
- Direct operation-panel implementation capture: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/direct-07-operation-after.png`
- Same-crop source/implementation comparison: `direct-09-source-panel-same-crop.png` and `direct-08-after-panel-focus.png` in the same evidence directory.
- Final portrait guidance: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/direct-10-after-mobile.png`
- Strict 1440 × 900 source capture: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/strict-01-source-1440x900.png`
- Strict 1440 × 900 implementation capture: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/strict-08-local-final.png`
- Strict portrait implementation capture: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/strict-09-local-mobile.png`
- Loading source capture at 1440 × 900: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/loading-source-immediate.png`
- Loading normalized source capture at 1280 × 720: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/loading-source-mobile-390x844.png`
- Loading normalized implementation capture at 1280 × 720: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/loading-local-final2-1280x720.png`
- Separated main-terminal capture at 1280 × 720: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/separated-main-final-1280x720.png`
- Separated Loading capture at 1280 × 720: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/separated-loading-final-1280x720.png`
- Homepage generated-material capture at 1280 × 720: `/Users/yunyou/.codex/visualizations/2026/08/02/019fc353-09b1-7321-80f4-806be6628d67/homepage-generated-material-final-1280x720.png`
- Desktop source/implementation pixels and CSS viewport: 1440 × 900 at device scale 1; no density normalization required.
- Portrait source/implementation pixels and CSS viewport: 390 × 844 at device scale 1; no density normalization required.
- State: neutral pointer for visual comparison; task Dialog, resource Popover, pointer depth, and portrait guidance checked separately.

## Required fidelity surfaces

- Fonts and typography: Noto Serif SC 900 is used for primary Chinese command labels; Noto Sans SC and monospace faces cover profile, status, counters, and telemetry. Label scale, weight, and line height now follow the source hierarchy.
- Spacing and layout: the profile is vertically stacked, assistant utilities are horizontal rows, the command plane uses the source's non-equal tracks, and resource/operation/deck proportions are aligned at 1440 × 900.
- Colors and tokens: paper, muted, dark, cyan, yellow, orange, opacity, shadow, perspective, and depth ranges are mapped to reusable `--ak-dashboard-*` and `--ak-command-*` variables.
- Image quality: the implementation uses an original 1440 × 900 operator/industrial scene generated for this demo. Its character pose and scenery deliberately differ because game/reverse-engineered assets are not copied; subject position, negative space, crop, and contrast are tuned to the same terminal art direction.
- Copy and content: user identity is `YunYouJun`; labels and realistic terminal values are coherent throughout the dashboard and native overlays.
- Loading state: the startup screen matches the source's blue-black composition, top-left tip, centered italic identity hierarchy, right-side mark, 2px track, clipped runner shape, and 5-second motion curve. The product name and background are intentionally original replacements.

## Comparison history

### Pass 1

- P1 · Command plane clipped at the right edge. Fixed its width, position, perspective origin, and terminal surface proportions.
- P1 · Assistant/news plane was too small and low. Fixed its measured width, height, bottom alignment, and content density.
- P1 · Resource and social typography was undersized. Fixed responsive counter/icon/telemetry values.
- P1 · Portrait state used an invented warning treatment and a missing symbol. Replaced it with the quiet dark source state and a real Remix Icon smartphone asset.

### Pass 2

- P2 · Profile identity used a horizontal layout unlike the source. Rebuilt it as a vertically centered level ring, username, ID, and assistant panel.
- P2 · Friend and intelligence actions were tall side-by-side cards. Changed them to the source's stacked horizontal utilities.
- P2 · Command deck started too high and the resource strip was too narrow. Rebalanced resource, operation, and deck tracks; widened the right plane and terminal counters.
- Post-fix evidence: full-view and focused comparisons listed above show aligned profile geometry and right-side command hierarchy.

### Pass 3

- P2 · Pointer depth logic lived inside the single demo. Extracted `createDashboardDepth()` as a framework-neutral package export and `useDashboardDepth()` as a lifecycle-only Vue Registry hook. The final browser pass measured `--ak-layer-x` changing from `0.00px` to `-21.67px`.
- Interactions: task Dialog opened/closed; resource Popover opened/closed; command state remained interactive.
- Browser health: no console errors in the final desktop interaction pass.
- Homepage disclosure: desktop and 390px layouts contain the explicit fidelity/material-scope statement without horizontal overflow.

### Pass 4

- P1 · The operation panel was visually flattened: resource counters were undersized, the sanity reading lacked its own figure layer, and current-stage labels were positioned like generic command metadata. Expanded the reusable `ak-counter--terminal`, `ak-san-container--terminal`, and `ak-command--operation` states instead of adding demo-only CSS.
- P1 · The level ring was roughly 25% too small and the `LV` label used caption sizing. Matched the reference's 120px ring, 60px value, 16px `LV` label, and centered grid geometry at the shared 1280 × 720 audit viewport.
- Post-fix geometry: reference operation label `(857, 158)` and implementation `(851, 163)` before the final density normalization; the accepted visual pass keeps the same component alignment while separating the resource and operation layers.
- Browser health: no console errors in the accepted operation-panel pass.

### Pass 5

- P1 · The sanity total bar incorrectly covered the entire left column, while the add control was anchored halfway down the panel. Rebuilt the terminal modifier around the source hierarchy: a panel-level watermark and one content layer split into figure and battle regions.
- P1 · The operation watermark inherited generic command positioning and appeared too far right/down. Moved it to the terminal panel layer and aligned it independently from the action button.
- P2 · The operation label was too short and the status/stage rows were compressed upward. Retuned the terminal-only type scale and row offsets without changing the generic command component.
- Final 1280 × 720 geometry: source add center approximately `(699, 220)` and implementation `(699, 221)`; source operation label `(857, 158, 112 × 75)` and implementation approximately `(858, 158, 113 × 74)`; source watermark `(989, 138, 145 × 153)` and implementation approximately `(989, 138, 145 × 153)`.

### Pass 6

- P1 · At the user's comparison viewport, the implementation's right plane was still materially larger than the source and its three command rows followed equal tracks. Re-measured the source at 1440 × 900, then extracted menu width, height, top/right offsets, resource/operation tracks, card inset, and card trim as reusable `--ak-dashboard-menu-*` tokens.
- P1 · The background close-up placed the operator over the menu and left no source-like negative space. Replaced it with an original generated scene composed specifically for the 1440 × 900 terminal slot; no reference/game asset was imported.
- P1 · Operation internals used the wrong left/right split and compressed the label rows. The final reusable terminal variants measure: sanity value `(878.3, 269.3, 124.2 × 81.3)` versus source `(877.5, 270.1, 124.9 × 84.1)`; operation label `(1033.1, 253.8, 107.8 × 76.3)` versus source `(1032.4, 253.6, 108.3 × 76.0)`; status `(1033.1, 328.9, 40.6 × 29.8)` versus source `(1032.4, 328.1, 40.5 × 30.3)`.
- P2 · Resource counters were continuous, undersized strips. Added terminal-only stepped widths, gaps, heights, and vertical offsets. Final counter tops differ from the source by at most `0.34px`; final widths differ by at most `1.33px` before the common 3D transform.
- P2 · Recruitment lacked the source's independent dark heading strip. Added it to `ak-command-group--recruitment` so the banner remains reusable and the demo does not carry a private implementation.
- Post-fix comparison: `strict-01-source-1440x900.png` and `strict-08-local-final.png` were viewed together at identical CSS viewport and neutral pointer state. No remaining P0/P1/P2 component geometry mismatch was observed.
- Interaction/health check: resource Popover and mission Dialog both opened through pointer input; portrait hides the full scene, shows the rotate guidance, and has `0px` horizontal overflow; final browser logs contain no warnings or errors.

### Pass 7 · Loading state

- P1 · Captured the source loading layer before it dismissed, including its CSS geometry and `5s ease` keyframes, then added reusable `ak-loading-screen` and `ak-loading-track` Core components.
- P1 · The first generated backdrop placed an oversized crate against the left edge, changing the source composition. Iterated the original asset so the medical cargo sits in the left third with central cyan light and clean right-side negative space. No source/game asset or hotlink is used.
- P2 · Initial identity and progress geometry was high and narrow at the normalized 1280 × 720 state. Repositioned the identity to source y≈348, set the line to y≈502 and ≈491px wide, resized the open-source rook mark, and clipped the runner below the 2px line to reproduce the source's visible half-shape.
- P2 · Loading was initially coupled to the dashboard lifecycle. The final structure moves the complete composition into the canonical `examples/loading/terminal.html`; the main-terminal source contains no loader, while `AkShowcase` selects one of the two canonical raw examples by `kind` without duplicating markup or styles.
- Post-fix comparison: `loading-source-mobile-390x844.png` and `loading-local-final2-1280x720.png` were opened together at equal 1280 × 720 pixels, CSS size, and device scale 1. Typography, layout rhythm, palette, image crop, copy hierarchy, and motion affordance have no remaining actionable P0/P1/P2 mismatch beyond the accepted original-brand/original-asset substitution.
- Browser verification: the standalone Loading route remains visible and animated; the main-terminal route has zero `[data-loading-screen]` nodes and renders immediately; browser logs contain no warnings or errors.

### Pass 8 · Separated examples and homepage material

- P1 · The full-screen routes now have single responsibilities: `/showcase/fullscreen.html` renders `showcase/main`, and `/showcase/loading.html` renders `loading/terminal`. The component documentation embeds that same Loading source instead of maintaining a second example.
- P2 · The homepage hero still used the legacy dark photo after the generated terminal artwork was accepted. Changed the live preview to the shared `color` surface so it reuses `operator-terminal-v2.png` through the existing preview theme rule; no homepage-only background implementation remains.
- Automated coverage: main dashboard interaction/depth, standalone Loading state/animation, and portrait rotation guidance pass as three targeted Playwright tests. Stylelint, VitePress production build, Registry verification, and `git diff --check` also pass.
- Final browser state: main `showcase/main`, Loading `loading/terminal`, and homepage `is-color`/generated artwork were inspected at 1280 × 720; all three routes have empty warning/error logs.

## Accepted constraint

Exact character pose, background architecture, and event illustration cannot match without reusing game-derived assets. This is an expected and disclosed asset-level difference, not an unresolved component/layout defect; the reusable UI geometry, tokens, typography, CSS 3D behavior, and interactions are independently implemented.

final result: passed
