/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';
import {
  EuiThemeColorMode,
  EuiThemeSystem,
  EuiThemeModifications,
  EuiThemeComputed,
} from './types';
import { EuiThemeLegacy } from '../../themes/legacy/theme';
import { DEFAULT_COLOR_MODE, getComputed } from './utils';

export const EuiSystemContext = createContext<EuiThemeSystem>(EuiThemeLegacy);
export const EuiModificationsContext = createContext<EuiThemeModifications>({});
export const EuiColorModeContext = createContext<EuiThemeColorMode>(
  DEFAULT_COLOR_MODE
);
export const EuiThemeContext = createContext<EuiThemeComputed>(
  getComputed(EuiThemeLegacy, {}, DEFAULT_COLOR_MODE)
);
