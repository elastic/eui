/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import * as MarkdownTooltip from '../markdown_tooltip';
import { EuiMarkdownEditorUiPlugin } from './../../markdown_types';

export const getDefaultEuiMarkdownUiPlugins = (): EuiMarkdownEditorUiPlugin[] => {
  const array = [MarkdownTooltip.plugin];
  // @ts-ignore __originatedFromEui is a custom property
  array.__originatedFromEui = true;
  return array;
};

export const defaultUiPlugins = getDefaultEuiMarkdownUiPlugins();
