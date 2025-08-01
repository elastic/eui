/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  euiMaxBreakpoint,
  euiMinBreakpoint,
  logicalCSS,
  mathWithUnits,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';
import { euiFormMaxWidth } from '../form/form.styles';

export const SIZES = ['s', 'm', 'l'] as const;
export type EuiFlyoutSize = (typeof SIZES)[number];

/**
 * Custom type checker for named flyout sizes since the prop
 * `size` can also be CSSProperties['width'] (string | number)
 */
export function isEuiFlyoutSizeNamed(value: any): value is EuiFlyoutSize {
  return SIZES.includes(value as any);
}

export const FLYOUT_BREAKPOINT = 'm' as const;

export const composeFlyoutSizing = (
  euiThemeContext: UseEuiTheme,
  size: EuiFlyoutSize
) => {
  const euiTheme = euiThemeContext.euiTheme;
  const formMaxWidth = euiFormMaxWidth(euiThemeContext);

  // 1. Calculating the minimum width based on the screen takeover breakpoint
  const flyoutSizes = {
    s: {
      min: `${Math.round(euiTheme.breakpoint.m * 0.5)}px`, // 1.
      width: '25vw',
      max: `${Math.round(euiTheme.breakpoint.s * 0.7)}px`,
    },

    m: {
      // Calculated for forms plus padding
      min: `${mathWithUnits(formMaxWidth, (x) => x + 24)}`,
      width: '50vw',
      max: `${euiTheme.breakpoint.m}px`,
    },

    l: {
      min: `${Math.round(euiTheme.breakpoint.m * 0.9)}px`, // 1.
      width: '75vw',
      max: `${euiTheme.breakpoint.l}px`,
    },
  };

  return `
    ${logicalCSS('max-width', flyoutSizes[size].max)}

    ${euiMaxBreakpoint(euiThemeContext, FLYOUT_BREAKPOINT)} {
      ${logicalCSS('min-width', 0)}
      ${logicalCSS('width', flyoutSizes[size].min)}
    }
    ${euiMinBreakpoint(euiThemeContext, FLYOUT_BREAKPOINT)} {
      ${logicalCSS('min-width', flyoutSizes[size].min)}
      ${logicalCSS('width', flyoutSizes[size].width)}
    }
  `;
};

export const maxedFlyoutWidth = (euiThemeContext: UseEuiTheme) => `
  ${euiMaxBreakpoint(euiThemeContext, FLYOUT_BREAKPOINT)} {
    ${logicalCSS('max-width', '90vw !important')}
  }
`;
