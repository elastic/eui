/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';
import { EuiThemeBorealis } from '@elastic/eui-theme-borealis';

import {
  EuiThemeColorModeStandard,
  EuiThemeHighContrastMode,
  EuiThemeSystem,
  EuiThemeModifications,
  EuiThemeComputed,
  EuiThemeNested,
} from './types';

import { DEFAULT_COLOR_MODE, getComputed } from './utils';

export const DEFAULTS = {
  system: EuiThemeBorealis,
  modifications: {},
  colorMode: DEFAULT_COLOR_MODE,
  highContrastMode: false as const,
};

export const EuiSystemContext = createContext<EuiThemeSystem>(DEFAULTS.system);
export const EuiModificationsContext = createContext<EuiThemeModifications>(
  DEFAULTS.modifications
);
export const EuiColorModeContext = createContext<EuiThemeColorModeStandard>(
  DEFAULTS.colorMode
);
export const EuiHighContrastModeContext =
  createContext<EuiThemeHighContrastMode>(DEFAULTS.highContrastMode);

export const defaultComputedTheme = getComputed(
  DEFAULTS.system,
  DEFAULTS.modifications,
  DEFAULTS.colorMode
);
export const EuiThemeContext =
  createContext<EuiThemeComputed>(defaultComputedTheme);
export const EuiNestedThemeContext = createContext<EuiThemeNested>({
  isGlobalTheme: true,
  hasDifferentColorFromGlobalTheme: false,
  bodyColor: '',
  colorClassName: '',
  setGlobalCSSVariables: () => {},
  setNearestThemeCSSVariables: () => {},
});
