/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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
  portal: '[data-euiportal="true"]',
} as const;
