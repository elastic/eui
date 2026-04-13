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
   * Please keep in sync with the fallback in .storybook/test-runner.ts
   */
  default: '#story-wrapper > *',
  /**
   * Text node only selector
   * To be used in stories for components rendering a text node instead of JSX elements
   */
  textOnly: '#story-wrapper',
  /**
   * Portal element content selector
   */
  portal: '#storybook-root > *',
} as const;

/**
 * decorator for story play functions to ensure VRT with included interactions
 * @param target - story play() function
 * @param vrtOnly - optional flag to en/disable vrt only interaction (defaults to true)
 * @returns enhanced story play function
 */
export const vrtPlayDecorator = (
  // using any type here as ReactFramework is not exported from @storybook/react
  target: PlayFunction<ReactRenderer, any>,
  vrtOnly: boolean = true
):
  | (PlayFunction<ReactRenderer, any> & { bodyElement?: HTMLElement })
  | undefined => {
  return async (context) => {
    // navigator.webdriver is true when Playwright (or any WebDriver-controlled browser)
    // is driving the page — works regardless of whether Storybook was started by the
    // test-runner or is an already-running dev server.
    const isVrtRunning = navigator.webdriver;

    if (vrtOnly && !isVrtRunning) return;

    if (isVrtRunning) {
      await waitForDocumentLoaded();

      enablePointerEvents();
    }

    // using ownerDocument.body over parentElement to ensure element is always available
    // related: https://github.com/storybookjs/storybook/issues/16971#issue-1076103727
    const body = context.canvasElement.ownerDocument.body;

    // NOTE: using selectors for elements outside of the context.canvasElement (e.g. for portals)
    // will result in failing interactions while the browser window is not focused (e.g. hot-reload).
    // It works fine while used directly in the browser window or in the CLI.
    // To reach portals we want to pass the body element to the canvas() instead of canvasElement.
    // That way we increase the scope of the testing utils (to include portals)
    const enhancedContext = {
      ...context,
      bodyElement: body,
    };

    await target(enhancedContext);
  };
};

const waitForDocumentLoaded = (): Promise<void> => {
  if (document.readyState === 'loading') {
    return new Promise((resolve) => {
      document.addEventListener('DOMContentLoaded', () => resolve());
    });
  }

  return Promise.resolve();
};

const enablePointerEvents = (): void => {
  const styleElement = document.createElement('style');
  document.head.appendChild(styleElement);
  styleElement.sheet?.insertRule('* {pointer-events: auto !important}');
};
