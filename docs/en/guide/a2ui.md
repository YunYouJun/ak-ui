---
title: A2UI experiment
description: Render agent messages as ak-ui interfaces using the official A2UI web_core.
---

# A2UI experiment

This experiment explores runtime-generated interfaces: an agent outputs components and data, the client renders them with ak-ui, and user actions are sent back. The existing [AI Skill](/en/guide/ai-skill) continues to generate and review code during development.

[Open the interactive experiment (中文)](/guide/a2ui). Its controls and scenario labels are currently in Chinese.

Edit the commander's callsign and click “执行部署” (Deploy). Data binding writes the input back to the client model, the button returns the current callsign, and a simulated local agent updates progress, status and button text. You can also clear the interface and receive the three initialization messages individually to inspect incremental rendering.

## Experiment boundaries

- The protocol is pinned to **A2UI v0.9.1**, using the `v0_9` entry of `@a2ui/web_core@0.10.7`. SDK and protocol versions are independent.
- This is a deterministic local simulation. It connects to no model, needs no API key and performs no real deployment.
- The custom catalog identifier is `https://ak-ui.yyj.moe/a2ui/experimental/v1`. It is an identifier, not a downloadable catalog URL. Do not tell an agent that the full basic catalog is supported.
- Supported components are `Column`, `Row`, `Card`, plain-text `Text`, single-line `TextField`, `Button` and custom `AkProgress`. Properties are defined in `examples/a2ui/catalog.mjs`; arbitrary HTML, CSS, scripts and function calls are not accepted.
- The official `MessageProcessor` and `NodeResolver` handle messages, component trees and data binding. The Vue mapping layer consumes resolved nodes. Errors appear in the experiment area, and unknown components are not executed.
- This experiment does not promise full protocol conformance. Network transport, authentication, persistence, complex forms and cross-framework renderers are excluded, and it is outside the stable ak-ui 1.0 API.
- Added dependencies serve development and documentation only. The npm CSS package still has no runtime dependencies. The interactive experiment loads only on its demo page.

## Source and next steps

`examples/a2ui/` contains the catalog, sample messages and independent session. The documentation theme's `components/a2ui/` provides Vue rendering and demo controls. Consumers should first exchange `session.processor.getClientCapabilities({ includeInlineCatalogs: true })` so the agent generates only supported components.

For a real integration, replace the local `respondToAction` with agent messages. Parse transport messages individually and pass them to `session.receive`; forward `onAction` to the backend. Current inputs return only the context explicitly declared by the action. Production integration also needs message size/count limits, reconnection, cancellation, server-side action authorization and corresponding tests.

Validate a real need with this loop before deciding whether to extract an optional adapter package.

References: [A2UI versions and concepts](https://a2ui.org/), [official renderer guide](https://a2ui.org/guides/renderer-development/).
