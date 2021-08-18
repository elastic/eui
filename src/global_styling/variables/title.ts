/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { computed } from '../../services/theme/utils';
import { _EuiThemeFontScale, SCALES } from './_typography';

/**
 * NOTE: These were quick conversions of their Sass counterparts.
 *       They have yet to be used/tested.
 */

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
