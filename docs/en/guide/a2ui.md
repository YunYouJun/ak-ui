# A2UI experiment

A2UI lets an agent describe components and data for a client renderer. ak-ui's optional experiment uses the official `@a2ui/web_core@0.10.7` processor with protocol v0.9.1. SDK and protocol version numbers are independent.

[Open the interactive experiment (中文)](/guide/a2ui). Edit a callsign, submit the action and observe the updated progress and status. This is a deterministic local simulation; it has no model connection, API key or real deployment operation.

## Supported scope

The custom catalog supports `Column`, `Row`, `Card`, `Text`, `TextField`, `Button` and `AkProgress`. It accepts declared properties and bindings, not arbitrary HTML or scripts. The catalog URL is an identifier, not a download endpoint.

`examples/a2ui/` holds the catalog, scenario and session. The documentation Vue layer renders resolved nodes. Exchange inline client capabilities before asking an agent to generate messages for this catalog.

## Stability

A2UI is outside the stable ak-ui 1.x API and adds no runtime dependency to the CSS package. Network transport, authentication, persistence, complex forms and production agent integration remain outside this experiment. Adopt them only for a real consumer requirement.

See the [official A2UI documentation](https://a2ui.org/) and the [ak-ui compatibility contract](/en/guide/stability).
