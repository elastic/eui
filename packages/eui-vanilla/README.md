# @elastic/eui-vanilla

Vanilla EUI primitives (HTML/CSS/JS, no React) for iframe hosts such as [MCP Apps](https://modelcontextprotocol.io/docs/extensions/apps). Button, badge, simple controls - not DataGrid.

Component CSS is **generated** from EUI's existing Emotion style functions at build time. See [CONTRIBUTE.md](./CONTRIBUTE.md) to add a component.

## Why

MCP Apps load a `ui://` HTML resource into a sandboxed iframe (`text/html;profile=mcp-app`). Full `@elastic/eui` works there but it pulls React, Emotion and `EuiProvider`. This package ships one self-contained HTML file **per component**.

This package owns interactive HTML. Consumers own `postMessage` / MCP Apps `App` SDK.

## Architecture

```mermaid
flowchart LR
  EUI --> generate --> minify --> CSS
  mount --> HTML
  CSS --> HTML --> iframe
```

Emotion and React stop at **generate**. Runtime is CSS + `mount`.

## EUI vs Vanilla

| | `@elastic/eui` | `@elastic/eui-vanilla` |
| --- | --- | --- |
| Runtime | React, Emotion, `EuiProvider` | CSS + JS mount |
| Styles | Emotion at runtime | Generated CSS |
| Host | React apps | iframes (e.g. MCP Apps) |

## Usage

```ts
import { mountButton } from '@elastic/eui-vanilla';

mountButton(document.getElementById('root')!, {
  label: 'Deploy',
  color: 'primary',
  fill: true,
  onClick: () => {},
});
```

CSS: `@elastic/eui-vanilla/base.css` + `@elastic/eui-vanilla/button.css` (set `data-color-mode="LIGHT"` or `"DARK"` on `<html>`).

`postToHost(method, params)` sends JSON-RPC to the iframe host (no-op when not embedded). For local development, Storybook logs it in **Actions**.

MCP resource: `dist/button.html` - that component's CSS + `mountButton` inlined. Host owns the view. `dist/index.html` lists available files.

## Scripts

```bash
yarn workspace @elastic/eui-vanilla build       # CSS + dist/<component>.html
yarn workspace @elastic/eui-vanilla storybook   # http://localhost:4173
yarn workspace @elastic/eui-vanilla test
```

## Reused vs hand-written

| From EUI | From scratch |
| --- | --- |
| Emotion style fns → CSS | `mount` DOM |
| Theme tokens | Behavior that isn't CSS |
| Shared consts (color, size, display) | Stable class names (no hashes) |

Re-run `yarn generate` after EUI style changes. Don't edit generated CSS.
