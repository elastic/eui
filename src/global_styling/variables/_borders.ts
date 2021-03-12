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

import { COLOR_MODE_KEY, computed } from '../../services/theme/utils';

export const border = {
  widthThin: '1px',
  widthThick: '2px',
  color: computed(['colors.lightShade'], ([lightShade]) => lightShade),
  radius: '4px',
  radiusSmall: computed(
    [`${COLOR_MODE_KEY}.border.radius`],
    ([euiBorderRadius]) => `calc(${euiBorderRadius} * 0.5)`
  ),
  thin: computed(
    [`${COLOR_MODE_KEY}.border.widthThin`, `${COLOR_MODE_KEY}.border.color`],
    ([widthThin, color]) => `${widthThin} solid ${color}`
  ),
  thick: computed(
    [`${COLOR_MODE_KEY}.border.widthThick`, `${COLOR_MODE_KEY}.border.color`],
    ([widthThick, color]) => `${widthThick} solid ${color}`
  ),
  editable: computed(
    [`${COLOR_MODE_KEY}.border.widthThick`, `${COLOR_MODE_KEY}.border.color`],
    ([widthThick, color]) => `${widthThick} dotted ${color}`
  ),
};
