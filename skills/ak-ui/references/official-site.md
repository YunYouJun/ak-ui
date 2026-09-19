# Official website: evidence and coverage

Use this reference for requests about `https://ak.hypergryph.com/#index`. It describes an independent extraction, not an official design system or complete reproduction. Start with `system` intensity for editorial/navigation work; use `terminal` only when immersive composition is part of the request.

## Evidence boundary

The initial study on **2026-09-15** covered Index, Information, and World at 1280 × 720 and 390 × 844. A **2026-09-19** follow-up visually inspected all six main sections on desktop and Information plus the expanded navigation in portrait. The two decoded public CSS hashes still matched the initial study.

- [Official website](https://ak.hypergryph.com/#index)
- [Shell CSS](https://web.hycdn.cn/arknights/official/_next/static/css/144c734e19afaa20.css): navigation, typography, mobile-menu transitions.
- [Page CSS](https://web.hycdn.cn/arknights/official/_next/static/css/6aed155137c3fe93.css): news rows, hero layer transitions, more-link feedback.
- Repository evidence: [initial measurements](https://github.com/YunYouJun/ak-ui/blob/master/research/official-site/2026-09-15.json), [follow-up](https://github.com/YunYouJun/ak-ui/blob/master/research/official-site/2026-09-19.json).

CSS declarations establish authored values, not full runtime choreography. A DOM canvas does not establish a particular shader or rendering algorithm. Font-family declarations do not establish which font rendered every glyph. Revisit the live site for claims about its current behavior.

## Visual rules that transfer

| Observed pattern | Source fact | Adaptation decision |
| --- | --- | --- |
| Bilingual navigation | Condensed Latin primary label; smaller Chinese label; active cyan `#19d1ff` | Use `.ak-nav`; choose primary language for the audience; add a non-color current marker |
| News rows | Cyan category `#18d1ff`, gray content `#d2d2d2`, thin white 30% separators | Use `.ak-news-list`; preserve category/title/time alignment, complete link text and wrapping |
| Typeface roles | Navigation declares `Oswald-Medium` / `SourceHanSans-Medium`; dates `Bender-Regular`; hero title `Novecentosanswide-UltraBold` | Condensed sans navigation, strong sans editorial display, mono data; use available/licensed fonts, not one command face everywhere |
| Section composition | Large focal media, asymmetric text region, quiet oversized lettering, fixed navigation/position cues | Establish one focal region and one reading region; make grids/textures subordinate to content |
| World directory | Bold Chinese labels, smaller English names, horizontal rules | `.ak-nav--vertical` for links; native/headless disclosure for expandable content |
| More action | Gray/light resting state becomes white/black on hover | Paired fill/text feedback; use an existing button with a scoped surface override |
| Portrait composition | Artwork moves above news; navigation becomes a menu; dates move to the right | Recompose for available space; do not shrink desktop controls or overwrite the user's root font |

The site distinguishes dense metadata from the main title. Its authored `6rem` news row measured **64px** on desktop because the root size is scaled. At 390 × 844, the root was **8.32px** and rows approximately **59.27px**. These are observations, not recommended library sizes. ak-ui keeps at least 44px targets and readable content-driven rows; its news component switches layout at a **34rem container** width, not the source site's orientation rule.

Do not infer the complete palette from this sample. ak-ui's yellow action color, red danger, green success, spacing scale, cuts, and motion tokens are independent system choices. Locally mapping the two nearly identical source cyans to `--ak-signal-info` is an adaptation, not evidence of two official semantic tokens.

## Motion evidence

These values are from the dated CSS/DOM inspection. They do not replace the public defaults in [motion.md](motion.md).

| Source element/state | Observed declaration | What remains unknown |
| --- | --- | --- |
| Desktop navigation | `color .3s` | Complete input/focus behavior |
| More-news link | `background-color .3s, color .3s` | Every interactive state |
| Portrait menu items | `opacity .2s, transform .2s`; closed `translateX(20%)`, open `translateX(0)` | Complete menu focus/escape semantics |
| Portrait menu stagger | Computed delays `0, 70, 140, 210, 280, 350, 420ms` for seven links | Behavior under rapid interruption and changed preferences |
| Index root/title | Root opacity `1s`; title transform `1s`, from `translateY(11.5rem)` (`12.25rem` portrait) | Runtime trigger and interaction with route transitions |
| Index visual layers | Canvas scale `1.2 → 1` over `2s`; two decoration fades `.6s` delayed `2s` and `2.3s` | Canvas internals and full frame-by-frame timeline |

For a product, borrow hierarchy in time: primary content first, secondary labels next, decoration last. Small form controls should not inherit a two-second hero entrance. Use native/headless menu behavior, then apply optional stagger to its presentation.

## Coverage matrix

“Available” below means an independent ak-ui implementation, not pixel or timing equivalence.

| Area | Available surface | Coverage / remaining gap |
| --- | --- | --- |
| Bilingual link navigation | CSS Core `.ak-nav` | Implemented; current state is caller-owned; no automatic routing/scroll spy |
| News rows and empty state | CSS Core `.ak-news-list` | Implemented with accessible sizing and container reflow; no data fetch/filter engine |
| Content directory | `.ak-nav--vertical` | Link pattern implemented; site's content detail transitions are separate |
| Buttons / tabs / counts | CSS Core + relevant Registry adapters | Building blocks exist; source-site composition is not a ready-made component |
| Entrances / numeric updates | `/effects`, Registry `AkEntrance`, `AkCountUp` | Implemented; general ak-ui extensions, not verified official timelines |
| Albums / photo arcs / depth | CSS media classes, `/depth` | Implemented; not evidence of official-site animation parity |
| Mobile overlay menu | `/site` `createMobileMenu`, Registry `AkMobileMenu` | Native dialog focus/Escape, scroll lock, 200ms entrance and 70ms stagger; 24px displacement is an adaptation |
| Full-page sections / position | `createSectionNavigation`, `AkSectionNavigator`, `.ak-site` | Native wheel/touch scrolling, hash/history, keyboard, focus, scroll tracking and interruption; independently implemented |
| Archive selector / media gallery | `createMediaGallery`, `AkMediaGallery` | Keyboard selection, touch swipe, image dialog, empty/single items, inactive native media paused; caller supplies real content and audio/video controls |
| Loading lifecycle | `createAssetLoader`, `AkAssetLoader` | Real async task completion, error/retry, cancellation and stale-result suppression; task count rather than downloaded bytes |
| Canvas / particles | `createParticleField`, `AkParticleField` | Original grid/orbit/wave renderer, WebGL → 2D → static fallback, visibility/pause/reduced-motion and context-loss handling; official shaders/morphing not extracted |
| Reduced motion | Effects/depth/site controllers, media and legacy loop CSS | 1.1.0 disables glow/outline/loading loops and freezes particles; independent additions must still be audited |

Do not describe this as “perfectly extracted.” Report the implemented patterns, dated evidence and missing behavior. Official artwork, logos, audio and font binaries are not necessary to transfer the layout and interaction principles.

## Examples to use

Read [examples.md](examples.md) for portable HTML/JavaScript, and [motion.md](motion.md) before attaching effects. The [six-section interactive showcase](https://ak-ui.yyj.moe/showcase/website) demonstrates the 1.1 controllers with original SVG artwork. Read [site.md](site.md) for markup, lifecycle and limitations. The [website-style example page](https://ak-ui.yyj.moe/guide/official-site-examples) composes navigation/news and links to the existing interactive effects demos. The main terminal showcase demonstrates a different, game-interface-inspired composition; it is not an official homepage reconstruction.
