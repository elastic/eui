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

import { CSSProperties } from 'react';
import { computed } from '../../services/theme/utils';
import { _EuiThemeFontScale, SCALES } from './_typography';

export type EuiThemeTitle = {
  [size in _EuiThemeFontScale]: {
    color: string;
    fontSize: string;
    fontWeight: CSSProperties['fontWeight'];
    letterSpacing?: string;
    lineHeight: string;
  };
};

const titlesPartial: {
  [size in _EuiThemeFontScale]: {
    fontWeight: string;
    letterSpacing?: string;
  };
} = {
  xxxs: {
    fontWeight: 'bold',
    letterSpacing: undefined,
  },
  xxs: {
    fontWeight: 'bold',
    letterSpacing: undefined,
  },
  xs: {
    fontWeight: 'bold',
    letterSpacing: undefined,
  },
  s: {
    fontWeight: 'bold',
    letterSpacing: undefined,
  },
  m: {
    fontWeight: 'semiBold',
    letterSpacing: '-.02em',
  },
  l: {
    fontWeight: 'medium',
    letterSpacing: '-.025em',
  },
  xl: {
    fontWeight: 'light',
    letterSpacing: '-.04em',
  },
  xxl: {
    fontWeight: 'light',
    letterSpacing: '-.03em',
  },
};

export const title: EuiThemeTitle = SCALES.reduce((acc, size) => {
  acc[size] = {
    fontSize: computed(([{ fontSize }]) => fontSize, [`font.size.${size}`]),
    lineHeight: computed(([{ lineHeight }]) => lineHeight, [
      `font.size.${size}`,
    ]),
    color: computed(([color]) => color, ['colors.title']),
    fontWeight: computed(([fontWeight]) => fontWeight, [
      `font.weight.${titlesPartial[size].fontWeight}`,
    ]),
    letterSpacing: titlesPartial[size].letterSpacing,
  };
  return acc;
}, {} as EuiThemeTitle);
