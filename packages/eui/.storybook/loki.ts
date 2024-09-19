/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import createAsyncCallback from '@loki/create-async-callback';
import isLokiRunning from '@loki/is-loki-running';
import type { PlayFunction } from '@storybook/csf';
import type { ReactRenderer } from '@storybook/react';

export const LOKI_SELECTORS = {
  /**
   * Default story selector
   * Please keep in sync with loki.config.js
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
 * decorator for story play functions to ensure loki VRT with included interactions
 * ref: https://github.com/oblador/loki/issues/359#issuecomment-1248135073
 * @param target - story play() function
 * @param vrtOnly - optional flag to en/disable vrt only interaction (defaults to true)
 * @returns enhanced story play function
 */
export const lokiPlayDecorator = (
  // using any type here as ReactFramework is not exported from @storybook/react
  target: PlayFunction<ReactRenderer, any>,
  vrtOnly: boolean = true
):
  | (PlayFunction<ReactRenderer, any> & { bodyElement?: HTMLElement })
  | undefined => {
  return async (context) => {
    const lokiIsRunning = isLokiRunning();
    const asyncCallback = createAsyncCallback();

    if (vrtOnly && !lokiIsRunning) return;

    if (lokiIsRunning) {
      await waitForDocumentLoaded();

      enablePointerEvents();
    }

    // using ownerDocument.body over parentElement to ensure element is always available
    // related: https://github.com/storybookjs/storybook/issues/16971#issue-1076103727
    const body = context.canvasElement.ownerDocument.body;

    // NOTE: using selectors for elements outside of the context.canvasElement (e.g. for portals)
    // will result in failing interactions while the browser window is not focused (e.g. hot-reload).
    // It works fine while used directly in the browser window or in the CLI.
    // To reach portals we want to pass the body element to lokis canvas() instead of canvasElement.
    // That way we increase the scope of the testing utils (to include portals)
    const enhancedContext = {
      ...context,
      bodyElement: body,
    };

    try {
      await target(enhancedContext);
    } finally {
      asyncCallback();
    }
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
