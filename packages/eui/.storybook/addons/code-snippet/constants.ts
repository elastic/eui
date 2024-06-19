/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/**
 * Addon specific constants
 */
export const ADDON_ID = 'storybook/code-snippet';
export const PANEL_ID = `${ADDON_ID}/panel`;

export const EVENTS = {
  SNIPPET_RENDERED: `${ADDON_ID}/snippet-rendered`,
  SNIPPET_PANEL_OPENED: `${ADDON_ID}/snippet-panel-opened`,
  SNIPPET_PANEL_CLOSED: `${ADDON_ID}/snippet-panel-closed`,
};

export const ADDON_PARAMETER_KEY = 'codeSnippet';
export const QUERY_PARAMS = {
  SHOW_SNIPPET: 'showSnippet',
};

export const STORY_ARGS_MARKER = '{{STORY_ARGS}}';

/**
 * JSX snippet generation constants
 */
// excluded props to not be shown in the code snippet
export const EXCLUDED_PROPS = new Set([
  '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
  'key',
]);
// props with 'false' value that should not be removed but shown in the code snippet
export const PRESERVED_FALSE_VALUE_PROPS = new Set(['grow']);
