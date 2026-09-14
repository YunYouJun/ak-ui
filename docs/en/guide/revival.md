# Reviving ak-ui

ak-ui was created on the last day of 2019 as a collection of SCSS modules for practicing and recreating the visual language of Arknights interfaces. When the repository reopened in 2026, its components still had a recognizable identity, but its documentation, deployment and usage belonged to an earlier frontend ecosystem.

The revival preserved its most valuable ideas—clipped corners, warning colors, state hierarchy and game-interface atmosphere—and added modern infrastructure to support continued iteration.

<div class="ak-revival-log" aria-label="Project timeline">
  <div class="ak-revival-log__item">
    <time>2019.12</time>
    <strong>PROJECT INIT</strong>
    <span>The repository begins with ak-ui and SCSS modules.</span>
  </div>
  <div class="ak-revival-log__item">
    <time>2020.01—04</time>
    <strong>COMPONENT PHASE</strong>
    <span>Early buttons, cards, map objects, sanity, levels and pagination take shape.</span>
  </div>
  <div class="ak-revival-log__item">
    <time>2020—23</time>
    <strong>MAINTENANCE</strong>
    <span>Occasional dependency maintenance; design and documentation become dormant.</span>
  </div>
  <div class="ak-revival-log__item is-active">
    <time>2026.08</time>
    <strong>REACTIVATED</strong>
    <span>Migration to VitePress, a new showcase site, Registry, visual tests and Cloudflare Pages.</span>
  </div>
</div>

## Why restart

The old project had components, but lacked a reliable path from design through examples and documentation to release:

- The VuePress site and old dependencies were difficult to maintain.
- Separately maintained examples and screenshots could drift apart.
- CSS-only interfaces required Vue consumers to repeatedly wrap behavior and types.
- The GitHub Pages deployment mixed preview, domain and CI responsibilities.
- Screenshot artifacts had entered the Git transfer path, slowing routine pushes.

The first priority was to make the project sustainable before increasing the component count.

## Architecture

```text
src/scss/* ───────────────→ dist/ak-ui.css
      │                          │
      │                          └──→ Vue Registry adapters
      │
examples/*.html ──────────→ DemoPreview + displayed source
      │
      └───────────────────→ Playwright visual captures

GitHub ──→ CI checks ──→ Cloudflare Pages Git deployment

Git tag ──→ verified package ──→ npm OIDC publish + provenance
                                      │
                                      └──→ changelogithub GitHub Release
```

The responsibilities remain simple:

| Layer | Responsibility |
| --- | --- |
| CSS Core | Visuals, stable classes and `--ak-*` variables, without a runtime |
| HTML examples | Single input for documentation previews, displayed source and browser captures |
| Vue Registry | Copyable, editable props, slots, events, keyboard interaction and types |
| VitePress theme | The ak-ui showcase site and documentation structure |
| Playwright | Verify layout, behavior and visual results using real examples |
| Cloudflare Pages | Git deployment, preview URLs and custom domains |

## Implementation history

### 1. VuePress → VitePress

The site migrated to VitePress with a rewritten homepage and theme. Instead of the default Hero, the homepage builds its visual narrative around a Rhodes Island terminal, warning ruler and Live Interface, with coordinated light and dark modes.

### 2. Examples become the single source

Component examples moved into `examples/*.html`. `DemoPreview` renders those files and shows the same source, while Playwright captures them from the same manifest. Documentation, tests and screenshot pages no longer maintain three separate copies.

### 3. Screenshots leave routine Git history

Component screenshots are generated during testing and kept as short-lived CI artifacts. Only desktop and mobile homepage regression baselines remain in the repository. This preserves detection of homepage changes without continuously adding dozens of component images to Git transfers.

### 4. CSS Core + Vue Registry

Framework-agnostic CSS remains the visual core. Vue consumers can use the shadcn-vue CLI to copy adapter source into their project, gaining types, `v-model`, events and keyboard interaction while retaining the freedom to edit source directly.

Registry artifacts are generated from configuration. Verification creates a temporary consumer project and performs real installation, checking that generated JSON also works in a user's project.

### 5. Separate CI and deployment

GitHub Actions handles lint, builds, Registry installation checks and Playwright. Cloudflare Pages deploys the site through Git integration. `pages.dev` supports initial validation, the custom domain is the production entry, and the old GitHub Pages branch remains temporarily available for rollback.

### 6. Expand the visual vocabulary

The first new components after revival focused on state and terminal feedback: Status/Tag, Progress/Gauge, Notice/Alert and Tabs/Segmented. Version 0.2.0 added Text Input, Textarea, Checkbox, Radio, Switch, Select, Dialog, Popover and Tooltip, preferring native browser semantics, states and top-layer behavior.

Vue Registry retains a small set of interactive adapters without copying component styles or becoming a separate npm runtime. HTML and Vue consume the same CSS Core.

### 7. npm Trusted Publishing

A `v*` Git tag triggers npm publication. The release workflow verifies that regular CI passed for the exact tagged commit. A job without publishing permissions validates the tag, build artifacts and token contract, then passes the package to a separate publishing job. Publication uses short-lived OIDC credentials instead of a stored npm token; npm generates provenance automatically.

The tag must exactly match `package.json` and point to a commit in master's history. Prereleases use `next`; stable releases use `latest`. A tag is an explicit release signal, created only after maintainer confirmation. The workflow does not create tags itself or bypass release approval.

### 8. Automated GitHub Releases

Only after npm Trusted Publishing succeeds does a separate `github-release` job run `changelogithub`. It uses the full Git history and Conventional Commits to create or update the tag's GitHub Release, grouping changes by type and scope and listing contributors. This job receives only the required `contents: write` permission; validation and npm jobs remain read-only or hold only OIDC permissions.

The release verifies successful `docs.yml` push CI for the exact tagged commit, then runs only release-specific tag validation, CSS build, token verification and tarball packaging. It does not repeat docs, Registry and Playwright regression checks. Release tools are pinned in the lockfile, dependency lifecycle scripts are disabled during CI installation, and checkout does not persist write credentials. Maintainers can preview notes with `pnpm release:notes` before tagging. This automation manages GitHub Release notes without rewriting the manually curated `CHANGELOG.md`.

## Deliberate exclusions

- ak-ui did not become a Vue-bound runtime component library.
- The revival did not attempt to add dozens of general-purpose components at once.
- Component screenshots did not remain permanent repository content.
- GitHub Actions did not take on both testing and production deployment.
- Existing code remained visible while its visual language gradually gained stable APIs.

## Next phase

The plan after 0.2.0 was to compose business components with a stronger Arknights-inspired identity, such as Operation Card, Stage Node and Operator Card, while improving focus, disabled states, keyboard interaction and CSS variable contracts across existing components.

For a personal project dormant for years, the main lesson was to restore the feedback cycle and release path before expanding features. A small project that can be verified continuously is easier to sustain than a single ambitious rewrite.

::: warning Unofficial project
ak-ui is a hobby-driven interface study and is not affiliated with Hypergryph. Game names, images and related assets belong to their respective rights holders.
:::
