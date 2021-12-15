/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const TEMPLATES = [
  'default',
  'centeredBody',
  'centeredContent',
  'empty',
] as const;

export type _EuiPageTemplate = {
  /**
   * Choose between 4 types of templates.
   * `default`: Typical layout with panelled content;
   * `centeredBody`: The panelled content is centered;
   * `centeredContent`: The content inside the panel is centered;
   * `empty`: Removes the panneling of the page content
   */
  template?: typeof TEMPLATES[number];
};
