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

// HELP: Can we provide the base within this function?
export function sizeToPixel(base: number, scale: number) {
  return `${base * scale}px`;
}

export const base = 16;

export const size = {
  xs: computed(['base'], ([base]) => `${base * 0.25}px`),
  s: computed(['base'], ([base]) => `${base * 0.5}px`),
  m: computed(['base'], ([base]) => `${base * 0.75}px`),
  base: computed(['base'], ([base]) => `${base}px`),
  l: computed(['base'], ([base]) => `${base * 1.5}px`),
  xl: computed(['base'], ([base]) => `${base * 2}px`),
  xxl: computed(['base'], ([base]) => `${base * 2.5}px`),
};

// $euiButtonMinWidth: $euiSize * 7 !default;

// $euiScrollBar: $euiSize !default;
// $euiScrollBarCorner: $euiSizeS * .75 !default;
