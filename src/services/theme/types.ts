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

type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
export type EuiThemeOverrides<T = {}> = DeepPartial<EuiThemeShape & T>;

type OmitDistributive<T, K extends PropertyKey> = T extends any
  ? T extends object
    ? OmitRecursively<T, K>
    : T
  : never;
type OmitRecursively<T extends any, K extends PropertyKey> = Omit<
  { [P in keyof T]: OmitDistributive<T[P], K> },
  K
>;

type Colorless<T> = OmitRecursively<T, 'colors'>;
export type EuiThemeComputed<T = {}> = Colorless<EuiThemeShape & T> & {
  themeName: string;
  colors: EuiThemeColor;
  // I don't like this
  buttons: Colorless<EuiThemeShape['buttons']> & {
    colors: EuiThemeShape['buttons']['colors']['light'];
  };
};
