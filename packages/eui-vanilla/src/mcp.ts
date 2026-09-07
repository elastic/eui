/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * JSON-RPC message.
 */
export type JsonRpc = {
  jsonrpc: '2.0';
  method: string;
  params?: Record<string, unknown>;
};

/**
 * Check if data is a valid JSON-RPC message.
 */
export const isJsonRpc = (data: unknown): data is JsonRpc =>
  typeof data === 'object' &&
  data !== null &&
  (data as JsonRpc).jsonrpc === '2.0' &&
  typeof (data as JsonRpc).method === 'string';

const hostOrigin = (): string => {
  try {
    if (document.referrer) return new URL(document.referrer).origin;
  } catch {
    /* ignore invalid referrer */
  }

  return '*';
};

/**
 * Send JSON-RPC message to the iframe host (e.g. MCP Apps).
 *
 * @param method - JSON-RPC method name
 * @param params - JSON-RPC parameters
 * @param targetOrigin - `postMessage` target origin. Defaults to the embedder referrer, else `*`.
 */
export const postToHost = (
  method: string,
  params?: Record<string, unknown>,
  targetOrigin: string = hostOrigin()
): void => {
  if (window.parent === window) return;

  window.parent.postMessage({ jsonrpc: '2.0', method, params }, targetOrigin);
};
