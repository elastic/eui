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
