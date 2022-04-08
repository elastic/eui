/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme } from '../../services/theme';
import { transparentize } from '../../services/color';
import { createStyleHookFromMixin } from '../utils';

export const SHADOW_SIZE = ['xs', 's', 'm', 'l', 'xl'] as const;
export type _EuiShadowSizes = typeof SHADOW_SIZE[number];

/**
 * Shadow t-shirt sizes descriptions
 */
export const _EuiShadowSizesDescriptions = {
  xs: 'Very subtle shadow used on small components.',
  s: 'Adds subtle depth, usually used in conjunction with a border.',
  m: 'Used on small sized portalled content like popovers.',
  l: 'Primary shadow used in most cases to add visible depth.',
  xl:
    'Very large shadows used for large portalled style containers like modals and flyouts.',
};

/**
 * overflowShadow
 */
export interface MixinOverflowShadowStyles {
  direction?: 'y' | 'x';
  side?: 'both' | 'start' | 'end';
}
export const mixinOverflowShadowStyles = (
  { size }: UseEuiTheme['euiTheme'],
  { direction: _direction, side: _side }: MixinOverflowShadowStyles = {}
) => {
  const direction = _direction || 'y';
  const side = _side || 'both';
  const hideHeight = `calc(${size.base} * 0.75 * 1.25)`;
  const gradientStart = `
  ${transparentize('red', 0.1)} 0%,
  ${transparentize('red', 1)} ${hideHeight}
  `;
  const gradientEnd = `
  ${transparentize('red', 1)} calc(100% - ${hideHeight}),
  ${transparentize('red', 0.1)} 100%
  `;
  let gradient = '';
  if (side) {
    if (side === 'both') {
      gradient = `${gradientStart}, ${gradientEnd}`;
    } else if (side === 'start') {
      gradient = `${gradientStart}`;
    } else {
      gradient = `${gradientEnd}`;
    }
  }

  if (direction === 'y') {
    return `mask-image: linear-gradient(to bottom, ${gradient});`;
  } else {
    return `mask-image: linear-gradient(to right, ${gradient});`;
  }
};

export const useOverflowShadowStyles = createStyleHookFromMixin(
  mixinOverflowShadowStyles
);
