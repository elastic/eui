/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export const ADDON_ID = 'storybook/code-snippet';
export const PANEL_ID = `${ADDON_ID}/panel`;

export const EVENTS = {
  SNIPPET_RENDERED: `${ADDON_ID}/snippet-rendered`,
};

export const ADDON_PARAMETER_KEY = 'codeSnippet';

export const STORY_ARGS_MARKER = '{{STORY_ARGS}}';
