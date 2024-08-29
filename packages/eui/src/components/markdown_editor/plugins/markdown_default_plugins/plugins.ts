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
  type DefaultParsingPluginsConfig,
} from './parsing_plugins';
import {
  getDefaultEuiMarkdownProcessingPlugins,
  DefaultEuiMarkdownProcessingPlugins,
  type DefaultProcessingPluginsConfig,
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
  config: DefaultPluginsConfig & {
    processingConfig?: DefaultProcessingPluginsConfig;
    parsingConfig?: DefaultParsingPluginsConfig;
    uiConfig?: {}; // No customizations currently supported, but we may add this in the future
  } = {}
): {
  parsingPlugins: DefaultEuiMarkdownParsingPlugins;
  processingPlugins: DefaultEuiMarkdownProcessingPlugins;
  uiPlugins: DefaultEuiMarkdownUiPlugins;
} => {
  const { exclude, processingConfig, parsingConfig, uiConfig } = config;

  return {
    parsingPlugins: getDefaultEuiMarkdownParsingPlugins({
      exclude,
      ...parsingConfig,
    }),
    processingPlugins: getDefaultEuiMarkdownProcessingPlugins({
      exclude,
      ...processingConfig,
    }),
    uiPlugins: getDefaultEuiMarkdownUiPlugins({ exclude, ...uiConfig }),
  };
};
