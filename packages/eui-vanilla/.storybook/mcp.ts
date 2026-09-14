/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type StoryNotification = {
  jsonrpc: '2.0';
  method: string;
  params?: Record<string, unknown>;
};

/**
 * Check if the data is a story notification.
 *
 * @param data - data to check
 * @returns true if the data is a story notification
 */
export const isStoryNotification = (data: unknown): data is StoryNotification =>
  typeof data === 'object' &&
  data !== null &&
  (data as StoryNotification).jsonrpc === '2.0' &&
  typeof (data as StoryNotification).method === 'string';

/**
 * Post a story notification.
 *
 * @param method - method to post
 * @param params - parameters to post
 */
export const postStoryNotification = (
  method: string,
  params?: Record<string, unknown>
): void => {
  window.parent.postMessage({ jsonrpc: '2.0', method, params }, '*');
};
