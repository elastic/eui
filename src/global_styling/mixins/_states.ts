/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { CSSProperties } from 'react';
import { useEuiTheme, UseEuiTheme } from '../../services';
import { css } from '@emotion/react';

export type _EuiFocusRingOffset =
  | 'inset'
  | 'outset'
  | 'center'
  | CSSProperties['outlineOffset'];

/**
 * Focus rings default to the browser's `outline`.
 * However, some components need to be forced to have the same behavior
 * This re-applies the same default outline with a couple parameters
 * @param euiTheme UseEuiTheme.euiTheme
 * @param offset Accepts a specific measurement or 'inset' or 'outset' or 'center' to adjust outline position
 */
export const euiFocusRing = (
  euiTheme: UseEuiTheme['euiTheme'],
  offset: _EuiFocusRingOffset = 'center'
) => {
  const outlineWidth = euiTheme.focus?.width;
  const outlineColor = euiTheme.focus?.color;

  let outlineOffset = offset;
  if (offset === 'inset') {
    outlineOffset = `-${outlineWidth}`;
  } else if (offset === 'outset') {
    outlineOffset = `${outlineWidth}`;
  } else if (offset === 'center') {
    outlineOffset = `calc(${outlineWidth} / -2);`;
  }

  // The latest theme utilizes `focus-visible` to turn on focus outlines.
  // But this is browser-dependend:
  // 👉 Safari and Firefox innately respect only showing the outline with keyboard only
  // 💔 But they don't allow coloring of the 'auto'/default outline, so contrast is no good in dark mode.
  // 👉 For these browsers we use the solid type in order to match with \`currentColor\`.
  // 😦 Which does means the outline will be square
  return css`
    outline: ${outlineWidth} solid ${outlineColor};
    outline-offset: ${outlineOffset};

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

// Hook version
export const useEuiFocusRing = (offset?: _EuiFocusRingOffset) => {
  const { euiTheme } = useEuiTheme();
  return euiFocusRing(euiTheme, offset);
};
