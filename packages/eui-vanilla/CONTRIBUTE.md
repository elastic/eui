# Contribute

How to add a component to `@elastic/eui-vanilla`.

Copy `src/button/`. Do not invent a new shape.

Use a short kebab-case id (`badge`, `callout`). That id is the folder name, the CSS file name and the bench key.

## Rules

- Runtime has no React and no Emotion.
- CSS is generated from EUI Emotion style functions at build time.
- Runtime may import EUI **constants** files only (no `.styles.ts`, no Emotion).
- Class names are EUI's stable names (`.euiBadge`). Never hashes.
- Color mode is `data-color-mode="LIGHT"` or `"DARK"` on `<html>`.
- Do not edit `generated/`. Re-run `yarn generate`.

## Where things live

| Concern | Path |
| --- | --- |
| CSS sheet | `scripts/css/sheets/<id>.ts` |
| Register CSS | `scripts/generate-css.ts` |
| Runtime | `src/<id>/` |
| Public API | `src/index.ts` |
| CSS export | `package.json` `exports` |
| Tests | `src/<id>/*.test.ts` and `package.json` `test-unit` |
| Stories | `src/<id>/*.stories.ts` |
| Storybook CSS | `.storybook/preview.ts` |
| Bench | `scripts/bench/components.mjs` |

`src/mount.ts` is shared. Do not duplicate it.

## 1. CSS (build time)

This serializes EUI styles. It does not mount DOM.

1. Find the EUI Emotion style fns for the component (usually `packages/eui/src/components/<id>/*.styles.ts`).
2. Add `scripts/css/sheets/<id>.ts`.
3. Export a `CssSheet`: `(ctx, root) => string`.
4. Wrap every selector with `root` so both color modes emit. Example: `` rule(`${root} .euiBadge`, styles.euiBadge) ``.
5. Use `rule()` from `scripts/emotion_to_css.ts` to compile Emotion bodies to CSS.
6. Register the sheet in `scripts/generate-css.ts`:

```ts
import { badgeSheet } from './css/sheets/badge';

const outputs = {
  base: { reset: baseReset, sheets: [baseSheet] },
  button: { sheets: [buttonSheet] },
  badge: { sheets: [badgeSheet] },
};
```

7. Add the CSS export in `package.json`:

```json
"./badge.css": "./generated/badge.css"
```

8. Run `yarn workspace @elastic/eui-vanilla generate`.
9. Check `generated/<id>.css`. It must contain LIGHT and DARK, the EUI class names and no `.css-xxxxx` hashes.

If the EUI style module pulls Emotion into a file you need at runtime, extract constants into a file (see `_button_constants.ts`) and import that file from `src/`.

`base.css` is global (reset, font, focus). Do not put component rules there.

## 2. Runtime (DOM)

This builds HTML and wires events. It does not import style fns.

Add `src/<id>/`:

| File | Role |
| --- | --- |
| `types.ts` | Props. Re-export EUI constants when they exist. |
| `behavior.ts` | Non-CSS logic (disabled, keys, a11y). |
| `mount.ts` | `render` + `mount<Id>` using shared `mount()`. |
| `index.ts` | Public exports for this component. |

`render` must emit the same class names the CSS sheet targets.

`mount<Id>` signature matches button:

```ts
export const mountBadge = (
  container: HTMLElement,
  props: EuiHtmlBadgeProps
): EuiHtmlMountedBadge =>
  mount(container, props, { render, attach: applyBadgeBehavior });
```

Skip `attach` if there is no behavior.

Put the Elastic copyright header on every source file.

## 3. Public API

1. Re-export from `src/index.ts`.
2. Consumers import `mount<Id>` from `@elastic/eui-vanilla`.
3. Consumers load CSS: `generated/base.css` + `generated/<id>.css`.

Do not add a second package entry for the component JS. One root export is enough.

## 4. Tests

1. Add `src/<id>/<id>.test.ts` (or `behavior.test.ts`).
2. Cover behavior, not Emotion.
3. Assert generated CSS has the stable classes and no hashes.
4. Append the file to `package.json` `test-unit`. That script lists files explicitly today.

```bash
yarn workspace @elastic/eui-vanilla test
```

## 5. Storybook

Stories are picked up from `src/**/*.stories.ts`. No Storybook config change.

1. Add `src/<id>/<id>.stories.ts`.
2. Call `mount<Id>` in `render`. Return the host element.
3. Import `generated/<id>.css` in `.storybook/preview.ts` (it does not glob CSS).
4. Use `postToHost` only if the story should log host messages in Actions.

```bash
yarn workspace @elastic/eui-vanilla storybook
```

Port **4173**. Set color mode in the toolbar.

## 6. Benchmark

Optional until you want numbers.

1. Add a fixture in `scripts/bench/components.mjs`. Key = id.
2. Point `vanilla.from` at `src/<id>/mount.ts`.
3. Point `eui.from` at `packages/eui/src/components/<id>`.
4. List CSS as `['base.css', '<id>.css']`.
5. Use a representative example (the same one you would put in an iframe).

```bash
yarn workspace @elastic/eui-vanilla bench -- <id>
```

JSON goes to stdout. Do not paste JSON into `BENCHMARK.md` unless you are updating that snapshot.

## 7. Verify

Run from the EUI repo root.

```bash
yarn workspace @elastic/eui-vanilla generate
yarn workspace @elastic/eui-vanilla test
yarn workspace @elastic/eui-vanilla storybook
```

Check light and dark. Check disabled and empty states. Compare against the EUI React story for the same component.

## Do not

- Import EUI `.styles.ts` from `src/`.
- Import React or Emotion from `src/`.
- Hand-write component CSS in `generated/`.
- Override EUI internals with `!important` or hashed class selectors.
- Put host `postMessage` protocol into the component. The host owns that. Use `postToHost` at the app/story level.
