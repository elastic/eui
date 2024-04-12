/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  getDefaultEuiMarkdownUiPlugins,
  DefaultEuiMarkdownUiPlugins,
} from './ui_plugins';
import {
  getDefaultEuiMarkdownParsingPlugins,
  DefaultEuiMarkdownParsingPlugins,
} from './parsing_plugins';
import {
  getDefaultEuiMarkdownProcessingPlugins,
  DefaultEuiMarkdownProcessingPlugins,
} from './processing_plugins';

export type ExcludableDefaultPlugins =
  | 'emoji'
  | 'lineBreaks'
  | 'linkValidator'
  | 'checkbox'
  | 'tooltip';

export type DefaultPluginsConfig =
  | undefined
  | { exclude?: ExcludableDefaultPlugins[] };

export const getDefaultEuiMarkdownPlugins = (
  config?: DefaultPluginsConfig
): {
  parsingPlugins: DefaultEuiMarkdownParsingPlugins;
  processingPlugins: DefaultEuiMarkdownProcessingPlugins;
  uiPlugins: DefaultEuiMarkdownUiPlugins;
} => ({
  parsingPlugins: getDefaultEuiMarkdownParsingPlugins(config),
  processingPlugins: getDefaultEuiMarkdownProcessingPlugins(config),
  uiPlugins: getDefaultEuiMarkdownUiPlugins(config),
});
