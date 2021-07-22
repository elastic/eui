/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RecursiveOmit, RecursivePartial } from '../../components/common';
import { euiThemeDefault } from './theme';

type EuiThemeColorModeInverse = 'inverse';
type EuiThemeColorModeStandard = 'light' | 'dark';
export type EuiThemeColorMode =
  | string
  | EuiThemeColorModeStandard
  | EuiThemeColorModeInverse;

export type EuiThemeShape = typeof euiThemeDefault;
export type EuiThemeColor = EuiThemeShape['colors']['light'];

export type EuiThemeSystem<T = {}> = {
  root: EuiThemeShape & T;
  model: EuiThemeShape & T;
  key: string;
};

export type EuiThemeModifications<T = {}> = RecursivePartial<EuiThemeShape & T>;

type Colorless<T> = RecursiveOmit<T, 'colors'>;
// I don't like this.
// Requires manually maintaining sections (e.g., `buttons`) containing colorMode options.
// Also cannot account for extended theme sections (`T`) that use colorMode options.
export type EuiThemeComputed<T = {}> = Colorless<EuiThemeShape & T> & {
  themeName: string;
  colors: EuiThemeColor;
  buttons: Colorless<EuiThemeShape['buttons']> & {
    colors: EuiThemeShape['buttons']['colors']['light'];
  };
} & T;
