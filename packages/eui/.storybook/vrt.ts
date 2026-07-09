/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { PlayFunction } from '@storybook/csf';
import type { ReactRenderer } from '@storybook/react';

/**
 * Viewport variants every story is screenshotted under. The test-runner is
 * invoked once per variant (see `scripts/test-visual-regression.js`) using the
 * `VRT_VARIANT` env var.
 *
 * Keys are the variant names, used both as the baseline suffix
 * (e.g. `${context.id}-desktop.png`) and in `parameters.vrt.skip`.
 */
export const VARIANTS = {
  desktop: { name: 'desktop', viewport: { width: 1440, height: 900 } },
  mobile: { name: 'mobile', viewport: { width: 390, height: 844 } },
} as const;

export type VariantName = keyof typeof VARIANTS;

/**
 * `parameters.vrt.skip` opts a story out of VRT:
 * - `true` skips every variant,
 * - an array (e.g. `['mobile']`) skips only the listed variants.
 */
export type VrtSkip = boolean | VariantName[];

export const isVariantSkipped = (
  skip: VrtSkip | undefined,
  variant: VariantName
): boolean => skip === true || (Array.isArray(skip) && skip.includes(variant));

export const isVariantName = (
  value: string | null | undefined
): value is VariantName => value != null && value in VARIANTS;

/**
 * Attribute set on `<html>` by the test-runner in `preVisit` so browser-side
 * code (play functions) can read the active variant.
 */
export const VRT_VARIANT_ATTRIBUTE = 'data-vrt-variant';

const getActiveVariant = (): VariantName | undefined => {
  const value = document.documentElement.getAttribute(VRT_VARIANT_ATTRIBUTE);
  return isVariantName(value) ? value : undefined;
};

export const VRT_SELECTORS = {
  /**
   * Default story selector
   */
  default: '#story-wrapper > *',
  /**
   * Text node only selector
   *
   * To be used in stories for components rendering a text node instead of JSX elements.
   */
  textOnly: '#story-wrapper',
  /**
   * Portal element content selector
   *
   * To be used in stories for components rendering a portal, e.g. flyouts, modals and popovers.
   * Might change in the future, see https://github.com/elastic/eui/issues/9503
   */
  portal: 'page',
} as const;

/**
 * Wraps a story play function with helpers:
 *
 * - skips the play body when `parameters.vrt.skip` is set,
 * - runs only under Playwright (gated by `navigator.webdriver`) unless `vrtOnly=false`,
 * - exposes `bodyElement` (`document.body`) in the context so play functions can query
 * portalled DOM (flyouts, popovers, tooltips, modals).
 *
 * @param target  - story play function
 * @param vrtOnly - skip the play body outside VRT (default: `true`)
 */
export const playDecorator = (
  // using any type here as ReactFramework is not exported from @storybook/react
  target: PlayFunction<ReactRenderer, any>,
  vrtOnly: boolean = true
): PlayFunction<ReactRenderer, any> | undefined => {
  return async (context) => {
    const skip: VrtSkip | undefined = context.parameters?.vrt?.skip;

    // Fully opted out of VRT - skip the play body everywhere (dev included).
    if (skip === true) return;

    // `navigator.webdriver` is true when Playwright (or any WebDriver-controlled browser)
    // is driving the page - works regardless of whether Storybook was started by the
    // test-runner or is an already-running dev server.
    const isVrtRunning = navigator.webdriver;

    if (vrtOnly && !isVrtRunning) return;

    // Opted out of the active variant - skip the play body so it doesn't run
    // (and potentially fail) at a viewport the story isn't built for.
    const activeVariant = getActiveVariant();
    if (activeVariant && isVariantSkipped(skip, activeVariant)) return;

    // using `ownerDocument.body` over `parentElement` to ensure element is always available
    // related: https://github.com/storybookjs/storybook/issues/16971#issue-1076103727
    const body = context.canvasElement.ownerDocument.body;

    // NOTE: using selectors for elements outside of the `context.canvasElement` (e.g. for portals)
    // will result in failing interactions while the browser window is not focused (e.g. hot-reload).
    // It works fine while used directly in the browser window or in the CLI.
    // To reach portals we want to pass the body element to the `canvas()` instead of `canvasElement`.
    // That way we increase the scope of the testing utils (to include portals)
    const enhancedContext = {
      ...context,
      bodyElement: body,
    };

    await target(enhancedContext);
  };
};
