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
  'emptyPage',
  'emptyContent',
  'customContent',
] as const;

export type _EuiPageTemplate = {
  /**
   * Choose between 4 types of templates.
   * `default`: Typical layout with panelled content;
   * `centeredContent`: The content inside the panel is centered;
   * `empty`: Removes the panneling of the page content;
   * `emptyPage`: The content is centered and the pageHeader ignored;
   * `emptyContent`: The content is centered;
   * `customContent`: The content is not wrapped by EuiPageContent, you must provide it yourself;
   */
  template?: typeof TEMPLATES[number];
};
