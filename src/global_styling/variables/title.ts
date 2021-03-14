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

// Titles map
// TODO --> MOVE TO COMPONENTS and rename to `title` when out of `colors` key
// Lists all the properties per EuiTitle size that then gets looped through to create the selectors.
// The map allows for tokenization and easier customization per theme, otherwise you'd have to override the selectors themselves
export const titles = {
  xxxs: {
    //HELP: the `color` key is getting removed?
    color: computed(['color.title'], ([color]) => color),
    fontSize: computed(
      [`${COLOR_MODE_KEY}.fontSize.xxxs`],
      ([fontSize]) => fontSize
    ),
    lineHeight: computed(
      [`${COLOR_MODE_KEY}.lineHeight.xxxs`],
      ([lineHeight]) => lineHeight
    ),
    fontWeight: computed(
      [`${COLOR_MODE_KEY}.fontWeight.bold`],
      ([fontWeight]) => fontWeight
    ),
  },
  xxs: {
    color: computed(['color.title'], ([color]) => color),
    fontSize: computed(
      [`${COLOR_MODE_KEY}.fontSize.xxs`],
      ([fontSize]) => fontSize
    ),
    lineHeight: computed(
      [`${COLOR_MODE_KEY}.lineHeight.xxs`],
      ([lineHeight]) => lineHeight
    ),

    fontWeight: computed(
      [`${COLOR_MODE_KEY}.fontWeight.bold`],
      ([fontWeight]) => fontWeight
    ),
  },
  xs: {
    color: computed(['color.title'], ([color]) => color),
    fontSize: computed(
      [`${COLOR_MODE_KEY}.fontSize.xs`],
      ([fontSize]) => fontSize
    ),
    lineHeight: computed(
      [`${COLOR_MODE_KEY}.lineHeight.xs`],
      ([lineHeight]) => lineHeight
    ),

    fontWeight: computed(
      [`${COLOR_MODE_KEY}.fontWeight.bold`],
      ([fontWeight]) => fontWeight
    ),
  },
  s: {
    color: computed(['color.title'], ([color]) => color),
    fontSize: computed(
      [`${COLOR_MODE_KEY}.fontSize.s`],
      ([fontSize]) => fontSize
    ),
    lineHeight: computed(
      [`${COLOR_MODE_KEY}.lineHeight.s`],
      ([lineHeight]) => lineHeight
    ),

    fontWeight: computed(
      [`${COLOR_MODE_KEY}.fontWeight.bold`],
      ([fontWeight]) => fontWeight
    ),
  },
  m: {
    color: computed(['color.title'], ([color]) => color),
    fontSize: computed(
      [`${COLOR_MODE_KEY}.fontSize.m`],
      ([fontSize]) => fontSize
    ),
    lineHeight: computed(
      [`${COLOR_MODE_KEY}.lineHeight.m`],
      ([lineHeight]) => lineHeight
    ),

    fontWeight: computed(
      [`${COLOR_MODE_KEY}.fontWeight.semiBold`],
      ([fontWeight]) => fontWeight
    ),
    letterSpacing: '-.02em',
  },
  l: {
    color: computed(['color.title'], ([color]) => color),
    fontSize: computed(
      [`${COLOR_MODE_KEY}.fontSize.l`],
      ([fontSize]) => fontSize
    ),
    lineHeight: computed(
      [`${COLOR_MODE_KEY}.lineHeight.l`],
      ([lineHeight]) => lineHeight
    ),
    fontWeight: computed(
      [`${COLOR_MODE_KEY}.fontWeight.medium`],
      ([fontWeight]) => fontWeight
    ),
    letterSpacing: '-.025em',
  },
  xl: {
    color: computed(['color.title'], ([color]) => color),
    fontSize: computed(
      [`${COLOR_MODE_KEY}.fontSize.xl`],
      ([fontSize]) => fontSize
    ),
    lineHeight: computed(
      [`${COLOR_MODE_KEY}.lineHeight.xl`],
      ([lineHeight]) => lineHeight
    ),
    fontWeight: computed(
      [`${COLOR_MODE_KEY}.fontWeight.light`],
      ([fontWeight]) => fontWeight
    ),
    letterSpacing: '-.04em',
  },
  xxl: {
    color: computed(['color.title'], ([color]) => color),
    fontSize: computed(
      [`${COLOR_MODE_KEY}.fontSize.xxl`],
      ([fontSize]) => fontSize
    ),
    lineHeight: computed(
      [`${COLOR_MODE_KEY}.lineHeight.xxl`],
      ([lineHeight]) => lineHeight
    ),
    fontWeight: computed(
      [`${COLOR_MODE_KEY}.fontWeight.light`],
      ([fontWeight]) => fontWeight
    ),
    letterSpacing: '-.03em',
  },
};
