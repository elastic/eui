/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Decorator } from '@storybook/html-vite';
import { action } from 'storybook/actions';

import { isJsonRpc } from '../src/mcp';

let patched = false;
let lastTheme: string | undefined;

const install = () => {
  if (patched) return;
  patched = true;

  const { parent } = window;
  const original = parent.postMessage.bind(parent);

  parent.postMessage = (
    message: unknown,
    targetOriginOrOptions?: unknown,
    transfer?: Transferable[]
  ) => {
    if (isJsonRpc(message)) action('mcp →')(message);

    if (
      typeof targetOriginOrOptions === 'string' ||
      targetOriginOrOptions === undefined
    )
      return original(message, targetOriginOrOptions as string, transfer);

    return original(message, targetOriginOrOptions as WindowPostMessageOptions);
  };

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.source === window) return;
    if (isJsonRpc(event.data)) action('mcp ←')(event.data);
  });
};

/**
 * Decorator for Storybook stories.
 *
 * Preview iframe is the MCP app. Logs JSON-RPC `postMessage` in "Actions" tab.
 * Theme toolbar is sent as `host-context-changed`.
 *
 * @param storyFn - Story function
 * @param context - Story context
 * @returns Story result
 */
export const mcpDecorator: Decorator = (storyFn, context) => {
  install();

  const theme = context.globals.theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;

  if (lastTheme !== theme) {
    lastTheme = theme;

    const message = {
      jsonrpc: '2.0' as const,
      method: 'ui/notifications/host-context-changed',
      params: { theme },
    };

    action('mcp ←')(message);

    window.dispatchEvent(new MessageEvent('message', { data: message }));
  }

  return storyFn();
};
