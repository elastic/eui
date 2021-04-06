/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { RecursivePartial, ValueOf } from '../../components/common';
import { EuiThemeBorder } from '../../global_styling/variables/_borders';
import { EuiThemeColors } from '../../global_styling/variables/_colors';
import {
  EuiThemeBase,
  EuiThemeSize,
} from '../../global_styling/variables/_size';
import { EuiThemeTitle } from '../../global_styling/variables/title';
import {
  EuiFont,
  EuiFontSize,
  EuiFontWeight,
} from '../../global_styling/variables/_typography';

export const COLOR_MODES_STANDARD = {
  light: 'LIGHT',
  dark: 'DARK',
} as const;
export const COLOR_MODES_INVERSE = 'INVERSE' as const;

type EuiThemeColorModeInverse = typeof COLOR_MODES_INVERSE;
type EuiThemeColorModeStandard = ValueOf<typeof COLOR_MODES_STANDARD>;
export type EuiThemeColorMode =
  | string
  | EuiThemeColorModeStandard
  | EuiThemeColorModeInverse;

export type ColorModeSwitch<T = string> = {
  [key in EuiThemeColorModeStandard]: T;
};

export type EuiThemeShape = {
  colors: EuiThemeColors;
  base: EuiThemeBase;
  size: EuiThemeSize;
  font: EuiFont;
  fontSize: EuiFontSize;
  fontWeight: EuiFontWeight;
  border: EuiThemeBorder;
  title: EuiThemeTitle;
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
            Exclude<T, keyof X | keyof ColorModeSwitch>)]: ComputedThemeShape<
            (X & Exclude<T, keyof X | keyof ColorModeSwitch>)[K],
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
