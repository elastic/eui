/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiBackgroundColor } from '../../../global_styling';
import { UseEuiTheme } from '../../../services';

export const arrowSize = 'm';

export const euiPopoverArrowStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  // Match the background color of panels
  const borderColor = euiBackgroundColor(euiThemeContext, 'plain');

  return {
    // Base
    euiPopoverArrow: css`
      position: absolute;
      width: 0;
      height: 0;

      // This part of the arrow matches the panel.
      &:before {
        position: absolute;
        content: '';
        height: 0;
        width: 0;
      }
    `,

    // POSITIONS
    top: css`
      &:before {
        bottom: -${euiTheme.size[arrowSize]};
        border-left: ${euiTheme.size[arrowSize]} solid transparent;
        border-right: ${euiTheme.size[arrowSize]} solid transparent;
        border-top: ${euiTheme.size[arrowSize]} solid ${borderColor};
      }
    `,

    bottom: css`
      &:before {
        top: -${euiTheme.size[arrowSize]};
        border-left: ${euiTheme.size[arrowSize]} solid transparent;
        border-right: ${euiTheme.size[arrowSize]} solid transparent;
        border-bottom: ${euiTheme.size[arrowSize]} solid ${borderColor};
      }
    `,

    left: css`
      &:before {
        right: -${euiTheme.size[arrowSize]};
        top: 50%;
        border-top: ${euiTheme.size[arrowSize]} solid transparent;
        border-bottom: ${euiTheme.size[arrowSize]} solid transparent;
        border-left: ${euiTheme.size[arrowSize]} solid ${borderColor};
      }
    `,

    right: css`
      &:before {
        left: -${euiTheme.size[arrowSize]};
        top: 50%;
        border-top: ${euiTheme.size[arrowSize]} solid transparent;
        border-bottom: ${euiTheme.size[arrowSize]} solid transparent;
        border-right: ${euiTheme.size[arrowSize]} solid ${borderColor};
      }
    `,
  };
};
