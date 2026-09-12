# Get started

ak-ui provides Arknights-inspired design tokens, framework-agnostic CSS and editable Vue adapters. Keep your own brand, content and accessible interactions.

**1.0.0** is the stable release. Pin the version for reproducible installation. Stable releases use `latest`; release candidates use `next`.

## Install CSS

```sh
pnpm add @yunyoujun/ak-ui@1.0.0
```

```ts
import '@yunyoujun/ak-ui/style.css'
```

Use semantic HTML with the documented classes:

```html
<button class="ak-button" type="button">Continue</button>
```

## Tokens and Sass

Use only the namespaced variables without element resets:

```ts
import '@yunyoujun/ak-ui/tokens.css'
```

Or consume the public Sass entry with your bundler:

```scss
@use '@yunyoujun/ak-ui/scss';
```

The CSS package has no runtime dependencies. Native elements, Vue adapters or your existing headless components provide behavior.

## AI-assisted development

Install the repository's agent skill:

```sh
npx skills add YunYouJun/ak-ui
```

Ask your coding agent to preserve the existing brand and accessibility behavior, reuse existing primitives, and choose `accent`, `system` or `terminal` styling intensity. See the detailed [AI Skill guide (中文)](/guide/ai-skill).

## Choose an integration

- [Component index](/en/components/): copy framework-agnostic HTML and style it with CSS.
- [Vue Registry](/en/registry/): install editable Vue 3 source.
- [A2UI experiment](/en/guide/a2ui): explore runtime-generated UI through a local simulation.
- [Compatibility and migration](/en/guide/stability): understand the 1.x contract and upgrade from 0.2.x.

## Language and appearance

The homepage, navigation, 404 page and core onboarding are available in English and Chinese. Detailed component/API references currently remain in Chinese and are explicitly labeled. The language menu opens the selected language's homepage so it never invents a missing translation route.

The documentation supports light and dark themes; its appearance control persists your choice. Component examples retain their intended showcase surfaces. The CSS library does not automatically translate your product's labels or switch its theme: pass translated labels through adapter props and override design tokens in your application.
