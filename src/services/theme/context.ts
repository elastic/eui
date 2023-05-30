/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';
import {
  EuiThemeColorModeStandard,
  EuiThemeSystem,
  EuiThemeModifications,
  EuiThemeComputed,
  EuiThemeNested,
} from './types';
import { EuiThemeAmsterdam } from '../../themes/amsterdam/theme';
import { DEFAULT_COLOR_MODE, getComputed } from './utils';

export const EuiSystemContext =
  createContext<EuiThemeSystem>(EuiThemeAmsterdam);
export const EuiModificationsContext = createContext<EuiThemeModifications>({});
export const EuiColorModeContext =
  createContext<EuiThemeColorModeStandard>(DEFAULT_COLOR_MODE);
export const defaultComputedTheme = getComputed(
  EuiThemeAmsterdam,
  {},
  DEFAULT_COLOR_MODE
);
export const EuiThemeContext =
  createContext<EuiThemeComputed>(defaultComputedTheme);
export const EuiNestedThemeContext = createContext<EuiThemeNested>({
  isGlobalTheme: true,
  hasDifferentColorFromGlobalTheme: false,
  bodyColor: '',
  colorClassName: '',
});
