/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiThemeSystem } from '../services';
import { EuiThemeAmsterdam, AMSTERDAM_NAME_KEY } from './amsterdam/theme';
import { EuiThemeLegacy, LEGACY_NAME_KEY } from './legacy/theme';

export interface EUI_THEME {
  text: string;
  value: string;
  provider?: EuiThemeSystem;
}

export const EUI_THEMES: EUI_THEME[] = [
  {
    text: 'Light',
    value: 'light',
    provider: EuiThemeAmsterdam,
  },
  {
    text: 'Dark',
    value: 'dark',
    provider: EuiThemeAmsterdam,
  },
  {
    text: 'Legacy: Light',
    value: `${LEGACY_NAME_KEY}_light`,
    provider: EuiThemeLegacy,
  },
  {
    text: 'Legacy: Dark',
    value: `${LEGACY_NAME_KEY}_dark`,
    provider: EuiThemeLegacy,
  },
];

export const isLegacyTheme = (name: string) => {
  return name === LEGACY_NAME_KEY;
};

export const isDefaultTheme = (name: string) => {
  return name === AMSTERDAM_NAME_KEY;
};
