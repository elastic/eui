# Contribute

How to add a primitive to `@elastic/eui-vanilla`.

This package is **primitives only** (button, badge, callout, simple form controls). Do not port `EuiDataGrid`, `EuiComboBox` or other composites.

Use a short kebab-case id (`badge`, `callout`). Use it for the source folder, CSS sheet filename, generated stylesheet and benchmark key. Convert it to camelCase only for the sheet export: `button-group.ts` exports `buttonGroupSheet`.

## Rules

- Runtime has no React and no Emotion.
- CSS is generated from EUI Emotion style functions at build time.
- Runtime may import EUI **constants** files only (no `.styles.ts`, no Emotion).
- CSS and semantic HTML are the primary API. JavaScript helpers are optional.
- Reuse public EUI class names such as `.euiBadge`. Document and test any vanilla-only variant classes. Never expose Emotion hashes.
- Color mode is `data-color-mode="LIGHT"` or `"DARK"` on `<html>`.
- Do not edit `generated/`. Re-run `yarn generate`.
- Keep primitives independently composable.
- Keep application state and host protocols outside this package.
- Do not build a virtual DOM.

## Where things live

| Concern | Path | Auto |
| --- | --- | --- |
| CSS sheet | `scripts/css/sheets/<id>.ts` | required for each id |
| CSS outputs | `scripts/css/sheets/index.ts` | manual |
| Runtime | `src/<id>/mount.ts` | source of ids |
| Public API | `src/index.ts` | manual |
| CSS export | `package.json` `"./*.css"` | wildcard |
| Tests | `src/**/*.test.ts` | globbed |
| Stories | `src/**/*.stories.ts` | globbed |
| Storybook CSS | `generated/*.css` | globbed |
| Bench example | `src/<id>/bench.mjs` | `props` + `jsx` |

`src/mount.ts` is the current optional helper foundation. Do not duplicate it.

CSS sheets stay hand-mapped (Emotion object → selector). That mapping is the work. Do not add a CSS compiler.

## 1. CSS (build time)

This serializes EUI styles. It does not mount DOM.

1. Find the EUI Emotion style fns (usually `packages/eui/src/components/<id>/*.styles.ts`).
2. Add `scripts/css/sheets/<id>.ts` exporting `<id>Sheet`. Register it in `scripts/css/sheets/index.ts`.
3. Wrap every selector with `root`. Example: `` rule(`${root} .euiBadge`, styles.euiBadge) ``.
4. Use `rule()` from `scripts/emotion_to_css.ts`.
5. Run `yarn workspace @elastic/eui-vanilla generate`.
6. Check `generated/<id>.css`: LIGHT and DARK, EUI class names, no `.css-xxxxx` hashes.

If the EUI style module pulls Emotion into a file you need at runtime, extract constants into a leaf (see `_button_constants.ts`) and import that leaf from `src/`.

`base.css` is global (reset, font, focus). Do not put component rules there.

Forced-colors / high-contrast is not generated yet (`highContrastMode: false`).

## 2. Semantic markup and optional runtime

First define the smallest valid semantic HTML that the stylesheet supports. Prefer native HTML behavior. Add runtime code only for dynamic creation, updates or behavior HTML and CSS cannot provide.

Add `src/<id>/`:

| File | Role |
| --- | --- |
| `types.ts` | Props. Re-export EUI constants when they exist. |
| `behavior.ts` | Non-CSS logic (disabled, keys, a11y). |
| `mount.ts` | `render` + `mount<Id>` using shared `mount()`. |
| `index.ts` | Public exports for this component. |

Helpers must emit the documented markup and class names. Match meaningful EUI structure, such as content and truncation wrappers, without copying React-only implementation details.

`mount<Id>` signature matches button:

```ts
export const mountBadge = (
  container: HTMLElement,
  props: EuiHtmlBadgeProps
): EuiHtmlMountedBadge =>
  mount(container, props, { render, attach: applyBadgeBehavior });
```

Skip `attach` if there is no behavior.

Icons are out of scope until there is a vanilla icon set. Loading may use `aria-busy` plus `euiLoadingSpinner` if that CSS is generated.

Put the Elastic copyright header on every source file.

Helpers must preserve native semantics, focus and accessible state. Keep updates direct and component-specific when a generic abstraction would add weight or complexity.

## 3. Public API

1. Re-export optional helpers and types from `src/index.ts`. Keep this explicit.
2. Document the semantic markup contract.
3. Consumers load `base.css` plus the component stylesheet.
4. Consumers import helpers only when their view needs dynamic DOM.

## 4. Tests

1. Add `src/<id>/*.test.ts`.
2. Cover behavior and the EUI class-name recipe.
3. Assert generated CSS has the stable classes and no hashes.

```bash
yarn workspace @elastic/eui-vanilla test
```

## 5. Storybook

1. Add `src/<id>/<id>.stories.ts`.
2. Call `mount<Id>` in `render`. Return the host element.
3. Use `postToHost` only if the story should log host messages in Actions.

```bash
yarn workspace @elastic/eui-vanilla storybook
```

Port **4173**. Set color mode in the toolbar.

## 6. Benchmark

Optional until you want numbers.

Add `src/<id>/bench.mjs` with `props` (vanilla) and `jsx` (EUI React). Mount name, EUI import and CSS files come from the id.

```bash
yarn workspace @elastic/eui-vanilla bench -- <id>
```

## 7. Verify

```bash
yarn workspace @elastic/eui-vanilla generate
yarn workspace @elastic/eui-vanilla test
yarn workspace @elastic/eui-vanilla storybook
```

Storybook is for local iteration. Consumers compose `mount` + CSS in their own MCP App HTML.

Check light and dark. Check disabled, empty and loading. Compare against the EUI React story.

## Do not

- Import EUI `.styles.ts` from `src/`.
- Import React or Emotion from `src/`.
- Hand-write component CSS in `generated/`.
- Override EUI internals with `!important` or hashed class selectors.
- Put host `postMessage` protocol into the component. Use `postToHost` at the app/story edge.
- Port composite EUI widgets.
