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
    color: computed(['colors.title'], ([color]) => color),
    fontSize: computed(['fontSize.xxxs'], ([fontSize]) => fontSize.fontSize),
    lineHeight: computed(
      ['fontSize.xxxs'],
      ([lineHeight]) => lineHeight.lineHeight
    ),
    fontWeight: computed(['fontWeight.bold'], ([fontWeight]) => fontWeight),
  },
  xxs: {
    color: computed(['colors.title'], ([color]) => color),
    // HELP: Spreading doesn't work
    // ...computed([`fontSize.xxs`], ([fontSize]) => fontSize),
    fontWeight: computed(['fontWeight.bold'], ([fontWeight]) => fontWeight),
  },
  xs: {
    color: computed(['colors.title'], ([color]) => color),
    fontSize: computed(['fontSize.xs'], ([fontSize]) => fontSize),
    fontWeight: computed(['fontWeight.bold'], ([fontWeight]) => fontWeight),
  },
  s: {
    color: computed(['colors.title'], ([color]) => color),
    fontSize: computed(['fontSize.s'], ([fontSize]) => fontSize),
    fontWeight: computed(['fontWeight.bold'], ([fontWeight]) => fontWeight),
  },
  m: {
    color: computed(['colors.title'], ([color]) => color),
    fontSize: computed(['fontSize.m'], ([fontSize]) => fontSize),
    fontWeight: computed(['fontWeight.semiBold'], ([fontWeight]) => fontWeight),
    letterSpacing: '-.02em',
  },
  l: {
    color: computed(['colors.title'], ([color]) => color),
    fontSize: computed(['fontSize.l'], ([fontSize]) => fontSize),
    fontWeight: computed(['fontWeight.medium'], ([fontWeight]) => fontWeight),
    letterSpacing: '-.025em',
  },
  xl: {
    color: computed(['colors.title'], ([color]) => color),
    fontSize: computed(['fontSize.xl'], ([fontSize]) => fontSize),
    fontWeight: computed(['fontWeight.light'], ([fontWeight]) => fontWeight),
    letterSpacing: '-.04em',
  },
  xxl: {
    color: computed(['colors.title'], ([color]) => color),
    fontSize: computed(['fontSize.xxl'], ([font]) => font.fontSize),
    lineHeight: computed(['fontSize.xxl'], ([font]) => font.lineHeight),
    fontWeight: computed(['fontWeight.light'], ([fontWeight]) => fontWeight),
    letterSpacing: '-.03em',
  },
};
