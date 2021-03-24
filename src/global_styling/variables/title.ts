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

// Titles map
// TODO --> MOVE TO COMPONENTS and rename to `title` when out of `colors` key
// Lists all the properties per EuiTitle size that then gets looped through to create the selectors.
// The map allows for tokenization and easier customization per theme, otherwise you'd have to override the selectors themselves
export const title = {
  xxxs: {
    color: computed(([color]) => color, ['colors.title']),
    fontSize: computed(([fontSize]) => fontSize.fontSize, ['fontSize.xxxs']),
    lineHeight: computed(([lineHeight]) => lineHeight.lineHeight, [
      'fontSize.xxxs',
    ]),
    fontWeight: computed(([fontWeight]) => fontWeight, ['fontWeight.bold']),
  },
  xxs: {
    color: computed(([color]) => color, ['colors.title']),
    // HELP: Spreading doesn't work
    // ...computed(([fontSize]) => fontSize, [`fontSize.xxs`]),
    fontWeight: computed(([fontWeight]) => fontWeight, ['fontWeight.bold']),
  },
  xs: {
    color: computed(([color]) => color, ['colors.title']),
    fontSize: computed(([fontSize]) => fontSize, ['fontSize.xs']),
    fontWeight: computed(([fontWeight]) => fontWeight, ['fontWeight.bold']),
  },
  s: {
    color: computed(([color]) => color, ['colors.title']),
    fontSize: computed(([fontSize]) => fontSize, ['fontSize.s']),
    fontWeight: computed(([fontWeight]) => fontWeight, ['fontWeight.bold']),
  },
  m: {
    color: computed(([color]) => color, ['colors.title']),
    fontSize: computed(([fontSize]) => fontSize, ['fontSize.m']),
    fontWeight: computed(([fontWeight]) => fontWeight, ['fontWeight.semiBold']),
    letterSpacing: '-.02em',
  },
  l: {
    color: computed(([color]) => color, ['colors.title']),
    fontSize: computed(([fontSize]) => fontSize, ['fontSize.l']),
    fontWeight: computed(([fontWeight]) => fontWeight, ['fontWeight.medium']),
    letterSpacing: '-.025em',
  },
  xl: {
    color: computed(([color]) => color, ['colors.title']),
    fontSize: computed(([fontSize]) => fontSize, ['fontSize.xl']),
    fontWeight: computed(([fontWeight]) => fontWeight, ['fontWeight.light']),
    letterSpacing: '-.04em',
  },
  xxl: {
    color: computed(([color]) => color, ['colors.title']),
    fontSize: computed(([font]) => font.fontSize, ['fontSize.xxl']),
    lineHeight: computed(([font]) => font.lineHeight, ['fontSize.xxl']),
    fontWeight: computed(([fontWeight]) => fontWeight, ['fontWeight.light']),
    letterSpacing: '-.03em',
  },
};
