# Contribute

How to add a component to `@elastic/eui-vanilla`.

Copy `src/button/`. Do not invent a new shape.

This package is **primitives only** (button, badge, callout, simple form controls). Do not port DataGrid, combo box, or other composites.

Use a short kebab-case id (`badge`, `callout`). That id is the folder (`src/<id>/`), the CSS sheet, the dist file and the bench key. `scripts/css/sheets/<id>.ts` must export `<id>Sheet` (camelCase: `buttonGroup.ts` → `buttonGroupSheet`).

## Rules

- Runtime has no React and no Emotion.
- CSS is generated from EUI Emotion style functions at build time.
- Runtime may import EUI **constants** files only (no `.styles.ts`, no Emotion).
- Class names are EUI's stable names (`.euiBadge`). Never hashes.
- Color mode is `data-color-mode="LIGHT"` or `"DARK"` on `<html>`.
- Do not edit `generated/`. Re-run `yarn generate`.
- Vanilla is monorepo-only unless constants get exported from EUI package.

## Where things live

| Concern | Path | Auto |
| --- | --- | --- |
| CSS sheet | `scripts/css/sheets/<id>.ts` | required for each id |
| Runtime | `src/<id>/mount.ts` | source of ids |
| Public API | `src/index.ts` | manual |
| CSS export | `package.json` `"./*.css"` | wildcard |
| Tests | `src/**/*.test.ts` | globbed |
| Stories | `src/**/*.stories.ts` | globbed |
| Storybook CSS | `generated/*.css` | globbed |
| Bench example | `src/<id>/bench.mjs` | `props` + `jsx` |

`src/mount.ts` is shared. Do not duplicate it.

CSS sheets stay hand-mapped (Emotion object → selector). That mapping is the work. Do not add a CSS compiler.

## 1. CSS (build time)

This serializes EUI styles. It does not mount DOM.

1. Find the EUI Emotion style fns (usually `packages/eui/src/components/<id>/*.styles.ts`).
2. Add `scripts/css/sheets/<id>.ts` exporting `<id>Sheet`.
3. Wrap every selector with `root`. Example: `` rule(`${root} .euiBadge`, styles.euiBadge) ``.
4. Use `rule()` from `scripts/emotion_to_css.ts`.
5. Run `yarn workspace @elastic/eui-vanilla generate`.
6. Check `generated/<id>.css`: LIGHT and DARK, EUI class names, no `.css-xxxxx` hashes.

If the EUI style module pulls Emotion into a file you need at runtime, extract constants into a leaf (see `_button_constants.ts`) and import that leaf from `src/`.

`base.css` is global (reset, font, focus). Do not put component rules there.

Forced-colors / high-contrast is not generated yet (`highContrastMode: false`).

## 2. Runtime (DOM)

This builds HTML and wires events. It does not import style fns.

Add `src/<id>/`:

| File | Role |
| --- | --- |
| `types.ts` | Props. Re-export EUI constants when they exist. |
| `behavior.ts` | Non-CSS logic (disabled, keys, a11y). |
| `mount.ts` | `render` + `mount<Id>` using shared `mount()`. |
| `index.ts` | Public exports for this component. |

`render` must emit the same class names the CSS sheet targets. Match EUI's DOM (content wrapper, `eui-textTruncate`).

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

`update()` remounts and restores focus on the root node. Good enough for buttons. Do not build a virtual DOM.

## 3. Public API

1. Re-export from `src/index.ts`. This stay explicit on purpose.
2. Consumers import `mount<Id>` from `@elastic/eui-vanilla`.
3. Consumers load CSS: `@elastic/eui-vanilla/base.css` + `@elastic/eui-vanilla/<id>.css`.

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
yarn workspace @elastic/eui-vanilla build
yarn workspace @elastic/eui-vanilla storybook
```

`dist/<id>.html` is the iframe resource (base CSS + component CSS + that mount). `dist/index.html` is only a listing.

Check light and dark. Check disabled, empty and loading. Compare against the EUI React story.

## Do not

- Import EUI `.styles.ts` from `src/`.
- Import React or Emotion from `src/`.
- Hand-write component CSS in `generated/`.
- Override EUI internals with `!important` or hashed class selectors.
- Put host `postMessage` protocol into the component. Use `postToHost` at the app/story edge.
- Port composite EUI widgets.
