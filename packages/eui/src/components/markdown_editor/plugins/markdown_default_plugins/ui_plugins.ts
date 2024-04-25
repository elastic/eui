/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiMarkdownEditorUiPlugin } from './../../markdown_types';
import * as MarkdownTooltip from '../markdown_tooltip';
import type { ExcludableDefaultPlugins, DefaultPluginsConfig } from './plugins';

export type DefaultEuiMarkdownUiPlugins = EuiMarkdownEditorUiPlugin[];

const DEFAULT_UI_PLUGINS: Partial<
  Record<ExcludableDefaultPlugins, EuiMarkdownEditorUiPlugin>
> = {
  tooltip: MarkdownTooltip.plugin,
};

export const getDefaultEuiMarkdownUiPlugins = ({
  exclude,
}: DefaultPluginsConfig = {}): DefaultEuiMarkdownUiPlugins => {
  const uiPlugins: EuiMarkdownEditorUiPlugin[] = [];

  Object.entries(DEFAULT_UI_PLUGINS).forEach(([pluginName, plugin]) => {
    if (!exclude?.includes(pluginName as ExcludableDefaultPlugins)) {
      uiPlugins.push(plugin);
    }
  });

  return uiPlugins;
};

export const defaultUiPlugins = getDefaultEuiMarkdownUiPlugins();
