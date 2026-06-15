/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { PlayFunction } from '@storybook/csf';
import type { ReactRenderer } from '@storybook/react';

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
    // Respect `vrt.skip` - if the story opts out of VRT, skip the play function too.
    if (context.parameters?.vrt?.skip) return;

    // `navigator.webdriver` is true when Playwright (or any WebDriver-controlled browser)
    // is driving the page - works regardless of whether Storybook was started by the
    // test-runner or is an already-running dev server.
    const isVrtRunning = navigator.webdriver;

    if (vrtOnly && !isVrtRunning) return;

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
