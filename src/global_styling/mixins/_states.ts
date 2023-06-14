/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { useEuiTheme, UseEuiTheme } from '../../services';

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
 * @param color Accepts any CSS color
 */

export const euiOutline = (
  { euiTheme }: UseEuiTheme,
  offset: _EuiFocusRingOffset = 'center',
  color?: CSSProperties['outlineColor']
) => {
  // Width is enforced as a constant at the global theme layer
  const outlineWidth = euiTheme.focus.width;
  const outlineColor = color || euiTheme.focus.color;

  let outlineOffset = offset;
  if (offset === 'inset') {
    outlineOffset = `-${outlineWidth}`;
  } else if (offset === 'outset') {
    outlineOffset = `${outlineWidth}`;
  } else if (offset === 'center') {
    outlineOffset = `calc(${outlineWidth} / -2);`;
  }

  // This is a separate function from `euiFocusRing` because some EUI components
  // need the outline styles only, not the :focus-visible settings (e.g. - :focus-within usage)
  return `
    outline: ${outlineWidth} solid ${outlineColor};
    outline-offset: ${outlineOffset};
  `;
};

export const euiFocusRing = (
  euiThemeContext: UseEuiTheme,
  offset: _EuiFocusRingOffset = 'center',
  options?: { color?: CSSProperties['outlineColor'] }
) => {
  // This function utilizes `focus-visible` to turn on focus outlines.
  // But this is browser-dependent:
  // 👉 Safari and Firefox innately respect only showing the outline with keyboard only
  // 💔 But they don't allow coloring of the 'auto'/default outline, so contrast is no good in dark mode.
  // 👉 For these browsers we use the solid type in order to match with `currentColor`.
  // 😦 Which does means the outline will be square
  return `
    ${euiOutline(euiThemeContext, offset, options?.color).trim()}

    // 👀 Chrome respects :focus-visible and allows coloring the \`auto\` style
    &:focus-visible {
      outline-style: auto;
    }

    // 🙅‍♀️ But Chrome also needs to have the outline forcefully removed from regular \`:focus\` state
    &:not(:focus-visible) {
      outline: none;
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
