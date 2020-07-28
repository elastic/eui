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

const brand = {
  // Core
  euiColorPrimary: '#006BB4',
  euiColorSecondary: '#017D73',
  euiColorAccent: '#DD0A73',
};

const colors = {
  // Core
  ...brand,

  // These colors stay the same no matter the theme
  euiColorGhost: '#FFF',
  euiColorInk: '#000',

  // Status
  euiColorSuccess: brand.euiColorSecondary,
  euiColorDanger: '#BD271E',
  euiColorWarning: '#F5A700',

  // Grays
  euiColorEmptyShade: '#FFF',
  euiColorLightestShade: '#F5F7FA',
  euiColorLightShade: '#D3DAE6',
  euiColorMediumShade: '#98A2B3',
  euiColorDarkShade: '#69707D',
  euiColorDarkestShade: '#343741',
  euiColorFullShade: '#000',

  euiColorHighlight: '#FFFCDD',
  euiTextColor: '#343741',
};

export default colors;
export { colors };
