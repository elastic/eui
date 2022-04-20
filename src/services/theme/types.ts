/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { RecursivePartial, ValueOf } from '../../components/common';
import { _EuiThemeAnimation } from '../../global_styling/variables/animations';
import { _EuiThemeBreakpoints } from '../../global_styling/variables/breakpoint';
import { _EuiThemeBorder } from '../../global_styling/variables/borders';
import { EuiThemeColors } from '../../global_styling/variables/_colors';
import {
  _EuiThemeBase,
  _EuiThemeSizes,
} from '../../global_styling/variables/size';
import { EuiThemeFont } from '../../global_styling/variables/_typography';
import { _EuiThemeFocus } from '../../global_styling/variables/_states';

export const COLOR_MODES_STANDARD = {
  light: 'LIGHT',
  dark: 'DARK',
} as const;
export const COLOR_MODES_INVERSE = 'INVERSE' as const;

export type EuiThemeColorModeInverse = typeof COLOR_MODES_INVERSE;
export type EuiThemeColorModeStandard = ValueOf<typeof COLOR_MODES_STANDARD>;
export type EuiThemeColorMode =
  | 'light'
  | 'dark'
  | EuiThemeColorModeStandard
  | 'inverse'
  | EuiThemeColorModeInverse;

export type ColorModeSwitch<T = string> =
  | {
      [key in EuiThemeColorModeStandard]: T;
    }
  | T;

export type StrictColorModeSwitch<T = string> = {
  [key in EuiThemeColorModeStandard]: T;
};

export type EuiThemeShape = {
  colors: EuiThemeColors;
  base: _EuiThemeBase;
  size: _EuiThemeSizes;
  font: EuiThemeFont;
  border: _EuiThemeBorder;
  focus?: _EuiThemeFocus;
  animation: _EuiThemeAnimation;
  breakpoint: _EuiThemeBreakpoints;
};

export type EuiThemeSystem<T = {}> = {
  root: EuiThemeShape & T;
  model: EuiThemeShape & T;
  key: string;
};

export type EuiThemeModifications<T = {}> = RecursivePartial<EuiThemeShape & T>;

export type ComputedThemeShape<
  T,
  P = string | number | bigint | boolean | null | undefined
> = T extends P | ColorModeSwitch<infer X>
  ? T extends ColorModeSwitch<X>
    ? X extends P
      ? X
      : {
          [K in keyof (X &
            Exclude<
              T,
              keyof X | keyof StrictColorModeSwitch
            >)]: ComputedThemeShape<
            (X & Exclude<T, keyof X | keyof StrictColorModeSwitch>)[K],
            P
          >;
        }
    : T
  : {
      [K in keyof T]: ComputedThemeShape<T[K], P>;
    };

export type EuiThemeComputed<T = {}> = ComputedThemeShape<EuiThemeShape & T> & {
  themeName: string;
};
