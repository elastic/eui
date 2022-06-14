/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';

const arrowSize = 'm';

export const euiPopoverArrowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    // Base
    euiPopoverArrow: css`
      position: absolute;
      width: 0;
      height: 0;

      // This part of the arrow matches the panel.
      &:after {
        position: absolute;
        content: '';
        height: 0;
        width: 0;
      }
    `,

    // POSITIONS
    top: css`
      &:after {
        bottom: -${euiTheme.size[arrowSize]};
        border-left: ${euiTheme.size[arrowSize]} solid transparent;
        border-right: ${euiTheme.size[arrowSize]} solid transparent;
        border-top: ${euiTheme.size[arrowSize]} solid
          ${euiTheme.colors.emptyShade};
      }
    `,

    bottom: css`
      &:after {
        top: -${euiTheme.size[arrowSize]};
        border-left: ${euiTheme.size[arrowSize]} solid transparent;
        border-right: ${euiTheme.size[arrowSize]} solid transparent;
        border-bottom: ${euiTheme.size[arrowSize]} solid
          ${euiTheme.colors.emptyShade};
      }
    `,

    left: css`
      &:after {
        right: -${euiTheme.size[arrowSize]};
        top: 50%;
        border-top: ${euiTheme.size[arrowSize]} solid transparent;
        border-bottom: ${euiTheme.size[arrowSize]} solid transparent;
        border-left: ${euiTheme.size[arrowSize]} solid
          ${euiTheme.colors.emptyShade};
      }
    `,

    right: css`
      &:after {
        left: -${euiTheme.size[arrowSize]};
        top: 50%;
        border-top: ${euiTheme.size[arrowSize]} solid transparent;
        border-bottom: ${euiTheme.size[arrowSize]} solid transparent;
        border-right: ${euiTheme.size[arrowSize]} solid
          ${euiTheme.colors.emptyShade};
      }
    `,
  };
};
