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

import { computed } from '../../services/theme/utils';
import { ColorModeSwitch } from '../../services/theme/types';
import { shade, tint, transparentize } from '../functions/_colors';

export interface EuiThemeFocus {
  transparency: ColorModeSwitch<number>;
  background: ColorModeSwitch;
  ring: {
    color: string;
    animStartColor: string;
    animStartSize: string;
    animStartSizeLarge: string;
    sizeLarge: string;
    size: string;
  };
}

export const focus: EuiThemeFocus = {
  transparency: { LIGHT: 0.1, DARK: 0.3 },
  background: {
    LIGHT: computed(
      ([primary, transparency]) => tint(primary, 1 - transparency),
      ['colors.primary', 'focus.transparency']
    ),
    DARK: computed(
      ([primary, transparency]) => shade(primary, 1 - transparency),
      ['colors.primary', 'focus.transparency']
    ),
  },
  ring: {
    // Colors
    color: computed(({ colors }) => transparentize(colors.primary, 0.3)),
    animStartColor: computed(({ colors }) => transparentize(colors.primary, 0)),
    animStartSize: '6px',
    animStartSizeLarge: '10px',

    // Sizing
    sizeLarge: computed(({ size }) => size.xs),
    size: computed(({ focus }) => `calc(${focus.ring.sizeLarge} * .75)`),
  },
};
