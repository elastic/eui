/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';

export const euiDroppableStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiDroppable: css``,
    spacing: sharedSpacingPadding(euiThemeContext),
  };
};

// Droppable and draggable components both have the same shared spacing/padding values
export const sharedSpacingPadding = ({ euiTheme }: UseEuiTheme) => ({
  none: null,
  s: css`
    padding: ${euiTheme.size.xxs};
  `,
  m: css`
    padding: ${euiTheme.size.xs};
  `,
  l: css`
    padding: ${euiTheme.size.s};
  `,
});
