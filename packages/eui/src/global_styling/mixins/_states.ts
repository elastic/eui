/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { useEuiTheme, UseEuiTheme } from '../../services';
import { mathWithUnits } from '../functions';

export type _EuiFocusRingOffset =
  | 'inset'
  | 'outset'
  | 'center'
  | CSSProperties['outlineOffset'];

/**
 * It is best practice to utilize the browser's default `outline` property for handling focus rings.
 * However, some components need to be forced to have the same behavior, or adjust the display.
 * This function re-applies the same default outline with a couple parameters
 * @param euiTheme UseEuiTheme
 * @param offset Accepts a specific measurement or 'inset', 'outset' or 'center' to adjust outline position
 * @param color Accepts any CSS color (POC: defaults to accent/Teal — the inner ring)
 * @param outerColor POC: defaults to primary blue — the outer ring. Pass the same value as
 *   `color` (or `'transparent'`) only for rare intentional single-ring exceptions.
 */

export const euiOutline = (
  { euiTheme }: UseEuiTheme,
  offset: _EuiFocusRingOffset = 'center',
  color?: CSSProperties['outlineColor'],
  outerColor?: CSSProperties['outlineColor']
) => {
  // Width is enforced as a constant at the global theme layer
  const outlineWidth = euiTheme.focus.width;
  // POC: dual focus ring defaults — inner Teal (accent), outer primary blue
  const innerColor = color || euiTheme.colors.accent;
  const outer = outerColor ?? euiTheme.colors.primary;
  const isDoubleRing = outer !== innerColor && outer !== 'transparent';

  // POC: single-ring opt-out (legacy / intentional exceptions)
  if (!isDoubleRing) {
    let outlineOffset = offset;
    if (offset === 'inset') {
      outlineOffset = `-${outlineWidth}`;
    } else if (offset === 'outset') {
      outlineOffset = `${outlineWidth}`;
    } else if (offset === 'center') {
      outlineOffset = mathWithUnits(outlineWidth, (x) => x / -2);
    }

    return `
      outline: ${outlineWidth} solid ${innerColor};
      outline-offset: ${outlineOffset};
    `;
  }

  // POC: inset dual ring — outer primary at the edge, inner Teal toward content
  if (offset === 'inset') {
    const outerSpread = outlineWidth;
    const innerSpread = mathWithUnits(outlineWidth, (x) => x * 2);
    return `
      outline: none;
      box-shadow:
        inset 0 0 0 ${outerSpread} ${outer},
        inset 0 0 0 ${innerSpread} ${innerColor};
    `;
  }

  // POC: outset / center / custom — outer primary (outline), inner Teal (box-shadow), no gap
  return `
    outline: ${outlineWidth} solid ${outer};
    outline-offset: ${outlineWidth};
    box-shadow: 0 0 0 ${outlineWidth} ${innerColor};
  `;
};

export const euiFocusRing = (
  euiThemeContext: UseEuiTheme,
  offset: _EuiFocusRingOffset = 'center',
  options?: {
    color?: CSSProperties['outlineColor'];
    /** POC: outer ring color; defaults to primary blue for the dual Teal+primary ring */
    outerColor?: CSSProperties['outlineColor'];
  }
) => {
  const { euiTheme } = euiThemeContext;
  const innerColor = options?.color || euiTheme.colors.accent;
  const outerColor = options?.outerColor ?? euiTheme.colors.primary;
  const isDoubleRing = outerColor !== innerColor && outerColor !== 'transparent';

  // This function utilizes `focus-visible` to turn on focus outlines.
  // But this is browser-dependent:
  // 👉 Safari and Firefox innately respect only showing the outline with keyboard only
  // 💔 But they don't allow coloring of the 'auto'/default outline, so contrast is no good in dark mode.
  // 👉 For these browsers we use the solid type in order to match with `currentColor`.
  // 😦 Which does means the outline will be square
  return `
    ${euiOutline(euiThemeContext, offset, innerColor, outerColor).trim()}

    ${
      // POC: keep solid dual-color rings — Chrome's outline-style:auto would collapse them
      isDoubleRing
        ? `
    &:focus-visible {
      outline-style: solid;
    }
    `
        : `
    // 👀 Chrome respects :focus-visible and allows coloring the \`auto\` style
    &:focus-visible {
      outline-style: auto;
    }
    `
    }

    // 🙅‍♀️ But Chrome also needs to have the outline forcefully removed from regular \`:focus\` state
    &:not(:focus-visible) {
      outline: none;
      ${isDoubleRing ? 'box-shadow: none;' : ''}
    }
  `;
};
export const useEuiFocusRing = (
  offset?: _EuiFocusRingOffset,
  color?: CSSProperties['outlineColor']
) => {
  const euiTheme = useEuiTheme();
  return euiFocusRing(euiTheme, offset, { color });
};
