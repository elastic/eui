# @elastic/design-tokens

Design tokens for the Elastic design system. DTCG-compliant source of truth that builds to CSS, SCSS, JSON, and Figma formats.

## Build

```bash
yarn build          # all targets
yarn build:css      # CSS custom properties only
yarn build:scss     # SCSS variables only
yarn build:ts       # JSON (for TypeScript consumption) only
yarn build:figma    # Figma variables JSON only
```

## Token architecture

Tokens follow a 3-tier hierarchy:

1. **Primitives** (`tokens/borealis/color/primitives/`) — raw hex values, not exposed in public outputs
2. **Shades** (`tokens/borealis/color/shades/`) — semantic aliases referencing primitives (e.g. `primary` -> `blue`)
3. **Mode** (`tokens/borealis/color/mode/{light,dark}/`) — consumer-facing tokens with separate files per color mode

Non-color tokens (size, typography, animation, border, breakpoint, elevation) are mode-agnostic.

## Known issues

### Primitive color deltas between Figma and code

The following primitive colors have small differences between the Figma variables and the values in `eui-theme-borealis` source code. The values in this package currently match the **code** (`eui-theme-borealis`). Needs alignment — one side should be updated to match the other.

| Token | Figma | Code (current) |
|-------|-------|----------------|
| Teal 90 | `#008C88` | `#008B87` |
| Pink 90 | `#BD1F70` | `#BC1E70` |
| Pink 110 | `#801A54` | `#831652` |
| Pink 120 | `#5E1E47` | `#5E2140` |
| Pink 130 | `#481B3B` | `#481E32` |
| Pink 140 | `#35172E` | `#351725` |

These propagate to 4 mode-level tokens (Filled Accent, Border Strong Accent, Filled Accent Secondary, Border Strong Accent Secondary).

### Brand color naming inconsistencies

The brand colors in `primitives/brand.jsonc` were ported from Figma variables as-is. The naming is inconsistent:

- Flat names for midnight variants: `developer-blue`, `dark-midnight`, `light-midnight` (vs. nested `midnight.dark`, `midnight.light`)
- `blue.elastic` instead of `blue.regular` (other families use `dark`/`regular`/`light`)

These match the current Figma structure. Consider normalizing in a future pass.

### Shadow tokens are colors only

The shadow design tokens (`color.shadow.*`) only define the **color component** of shadows. The full shadow definitions (layer count, x/y offsets, blur, spread, opacity per layer) live in `eui-theme-borealis/_shadows.ts` as `shadowPrimitives`.

TODO: Consider replacing `shadowPrimitives` with DTCG `shadow` type tokens in this package to make the full shadow definitions part of the design token source of truth.

### Alpha color format

Alpha colors (via Tokens Studio `studio.tokens.modify`) output in CSS Color Level 4 format: `rgb(21.569% 53.333% 100% / 0.12)` instead of the legacy `rgba(55,136,255, 0.12)`. Both are valid CSS and visually identical, but the string representation differs. This may affect snapshot tests in `eui-theme-borealis`.
