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

import { computed } from '../../../../services/theme/utils';
import { transparentize } from '../../../../global_styling/functions/_colors';
import {
  focus,
  EuiThemeFocus,
} from '../../../../global_styling/variables/_states';
// // Color when not using currentColor
// $euiFocusRingColor: $euiColorPrimaryText;

// // Sizing
// $euiFocusRingAnimStartSize: 2px;
// $euiFocusRingSize: 2px;

// // Transparency
// $euiFocusTransparency: lightOrDarkTheme(.9, .7);
// $euiFocusBackgroundColor: transparentize($euiColorPrimary, $euiFocusTransparency);

export const focus_ams: EuiThemeFocus = {
  transparency: { LIGHT: 0.9, DARK: 0.7 },
  background: computed(({ colors, focus }) =>
    transparentize(colors.primary, focus.transparency)
  ),
  ring: {
    ...focus.ring,
    color: computed(({ colors }) => colors.textPrimary),
    animStartSize: '2px',
    size: '2px',
  },
};
