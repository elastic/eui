/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { CSSObject } from '@emotion/react';

import type { RecursivePartial, ValueOf } from '../../types';

import type { _EuiThemeAnimation } from '../../global_styling/variables/animations';
import type { _EuiThemeBreakpoints } from '../../global_styling/variables/breakpoint';
import type { _EuiThemeBorder } from '../../global_styling/variables/borders';
import type { _EuiThemeColors } from '../../global_styling/variables/colors';
import type {
  _EuiThemeBase,
  _EuiThemeSizes,
} from '../../global_styling/variables/size';
import type { _EuiThemeFont } from '../../global_styling/variables/typography';
import type { _EuiThemeFocus } from '../../global_styling/variables/states';
import type { _EuiThemeShadows } from '../../global_styling/variables/shadow';
import type { _EuiThemeLevels } from '../../global_styling/variables/levels';
import type { _EuiThemeComponents } from '../../global_styling/variables/components';
import type { _EuiThemeFlags } from '../../global_styling/variables';
import type { _EuiThemeOverrides } from '../../global_styling/variables/overrides';

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

// Consumers can pass a boolean to manually toggle the preferred high contrast mode,
// but our internal high contrast mode enum is slightly more granular to account for
// Windows's high contrast themes, which force colors/backgrounds/shadows
export type EuiThemeHighContrastModeProp = boolean;
export type EuiThemeHighContrastMode = 'forced' | 'preferred' | false;

export const EUI_THEME_HIGH_CONTRAST_MODE_KEY = 'HCM' as const;
export const EUI_THEME_OVERRIDES_KEY = 'overrides' as const;

export type EuiThemeShapeBase = {
  colors: _EuiThemeColors;
  /** - Default value: 16 */
  base: _EuiThemeBase;
  /**
   * See {@link https://eui.elastic.co/docs/getting-started/theming/tokens/sizing/ | Reference} for more information
   */
  size: _EuiThemeSizes;
  font: _EuiThemeFont;
  border: _EuiThemeBorder;
  focus: _EuiThemeFocus;
  animation: _EuiThemeAnimation;
  breakpoint: _EuiThemeBreakpoints;
  levels: _EuiThemeLevels;
  shadows: _EuiThemeShadows;
  components: _EuiThemeComponents;
  flags: _EuiThemeFlags;
};

export type EuiThemeShape = EuiThemeShapeBase & {
  overrides?: _EuiThemeOverrides;
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

export type EuiThemeNested = {
  isGlobalTheme: boolean;
  hasDifferentColorFromGlobalTheme: boolean;
  bodyColor: string;
  colorClassName: string;
  setGlobalCSSVariables: Function;
  globalCSSVariables?: CSSObject;
  setNearestThemeCSSVariables: Function;
  themeCSSVariables?: CSSObject;
};

export interface UseEuiTheme<T extends {} = {}> {
  euiTheme: EuiThemeComputed<T>;
  colorMode: EuiThemeColorModeStandard;
  highContrastMode: EuiThemeHighContrastMode;
  modifications: EuiThemeModifications<T>;
}

export interface EUI_THEME {
  text: string;
  value: string;
  provider?: EuiThemeSystem;
}
