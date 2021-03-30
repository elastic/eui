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

export interface EuiThemeBorder {
  widthThin: string;
  widthThick: string;
  color: string;
  radius: string;
  radiusSmall: string;
  thin: string;
  thick: string;
  editable: string;
}

export const border: EuiThemeBorder = {
  widthThin: '1px',
  widthThick: '2px',
  color: computed(([lightShade]) => lightShade, ['colors.lightShade']),
  radius: '4px',
  radiusSmall: computed(
    ([euiBorderRadius]) => `calc(${euiBorderRadius} * 0.5)`,
    ['border.radius']
  ),
  thin: computed(([widthThin, color]) => `${widthThin} solid ${color}`, [
    'border.widthThin',
    'border.color',
  ]),
  thick: computed(([widthThick, color]) => `${widthThick} solid ${color}`, [
    'border.widthThick',
    'border.color',
  ]),
  editable: computed(([widthThick, color]) => `${widthThick} dotted ${color}`, [
    'border.widthThick',
    'border.color',
  ]),
};
