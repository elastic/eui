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
