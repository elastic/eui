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

// const usingFullTheme = `sizeToPixel({ base: 16, [...] })(0.25)`
// const usingBaseValue = `sizeToPixel(16)(0.25)`
export const sizeToPixel = (scale: number = 1) => (
  themeOrBase: number | { base: number; [key: string]: any }
) => {
  const base = typeof themeOrBase === 'object' ? themeOrBase.base : themeOrBase;
  return `${base * scale}px`;
};

export const base = 16;

export const size = {
  xs: computed([], sizeToPixel(0.25)),
  s: computed([], sizeToPixel(0.5)),
  m: computed([], sizeToPixel(0.75)),
  base: computed([], sizeToPixel()),
  l: computed([], sizeToPixel(1.5)),
  xl: computed([], sizeToPixel(2)),
  xxl: computed([], sizeToPixel(2.5)),
};

// $euiButtonMinWidth: $euiSize * 7 !default;

// $euiScrollBar: $euiSize !default;
// $euiScrollBarCorner: $euiSizeS * .75 !default;
