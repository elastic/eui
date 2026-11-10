---
name: kibana-ui
description: How to build UI in Kibana. Load before any UI change (new or existing screens, components, flyouts, tables, forms, callouts, navigation, icons, styles or user-facing text), including adding a small feature to UI that already exists. Lists which components to use (@kbn/ui-* packages, then EUI), links to the installed EUI docs for components, patterns, icons and copy guidelines, and how to check what a component already does before building it yourself.
---

# Kibana UI

Kibana UI is built from `@kbn/ui-*` packages and EUI (`@elastic/eui`). Both change faster than your training data: features you don't know may already exist as a prop, and props and icon names you remember may be removed. Assume what you need is *built-in* until the docs say otherwise, even for components you know.

Paths are from the Kibana repo root. EUI docs live in `node_modules/@elastic/eui/docs/`: `index.md` (components and UX patterns), `icons.md`, `content/` (writing guidelines).

## Before writing code

1. **Check `@kbn/ui-*` first.** Run `ls src/platform/kbn-ui` and read the README of any package that fits; use it instead of the EUI component it wraps, since lint expects it. Callouts use `@kbn/ui-callout` (`KbnInfoCallout`, `KbnSuccessCallout`, `KbnWarningCallout`, `KbnDangerCallout`) instead of `EuiCallOut`. App pages use `KibanaPageTemplate` with `AppHeader` from `@kbn/app-header` as the page header, instead of `EuiPageHeader`, `EuiPageTemplate.Header`, `KibanaPageTemplate.Header` or `pageHeader`; read `src/core/packages/chrome/app-header/README.md` before adding or changing a page.
2. **Read the docs page of every EUI component in the change**, including ones already in the file: `components/<name>.md`, named after the docs title in kebab case (`flyout.md`, `basic-tables.md`). If a guess misses, find the page in `index.md`; pick new components there too. Prefer the page's examples over nearby code, which may use removed props.
3. **Find what's *built-in*.** List each feature the task asks for in the words a user would use for what they see or do ("copy to clipboard", "fullscreen", "loading"), rather than the parts you would build it from (buttons, icons, CSS). Grep the whole docs folder for each:
   `grep -rliE 'copy|clipboard' node_modules/@elastic/eui/docs`
   Read the matching sections for components in the change and any matching `patterns/` page. Build a feature yourself only when the grep finds nothing for it. This step is done when every feature has a page and prop, or a grep that found nothing.
4. **Follow the matching pattern page**, listed under Patterns in `index.md`, when the change has a table, form, save flow, help text, error message or status color.

## After writing code

5. **Check every icon name** you added (`type`, `iconType`, `icon`) against `icons.md`. TypeScript accepts any string, and a removed name renders as a broken image.
6. **Check user-facing text** against `content/style.md` and `content/word-choice.md`: sentence case, plain words.
