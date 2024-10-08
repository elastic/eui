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
export const SPREAD_STORY_ARGS_MARKER = '{{...STORY_ARGS}}';

/**
 * JSX snippet generation constants
 */
export const EMOTION_TYPE_KEY = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__';
export const EMOTION_LABEL_KEY = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__';

// excluded props to not be shown in the code snippet
export const EXCLUDED_PROPS = new Set([
  EMOTION_TYPE_KEY,
  EMOTION_LABEL_KEY,
  'key',
]);

/** ERRORS */
export const ADDON_ERROR =
  'An error occurred in the EUI Storybook `code-snippet` addon. Returning the story without code snippet.';
export const CODE_FORMATTING_ERROR =
  'An error occurred and no formatted code was provided. Falling back to pre-formatted code.';
