/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { euiCanAnimate } from '../../global_styling';
import { euiShadowXSmall, euiSlightShadowHover } from '../../themes/amsterdam';

export const euiResizableCollapseButtonStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiResizableCollapseButton: css`
      z-index: 2; /* 1 higher than EuiResizableButton */
      position: absolute;

      /* Remove animation inherited from EuiButtonIcon */
      &:focus {
        animation: none;
      }

      /* Remove transitions from EuiButtonIcon because of the custom transforms */
      ${euiCanAnimate} {
        transition-property: background, box-shadow;
      }
    `,
    collapsible: css`
      background: ${euiTheme.colors.emptyShade};
      ${euiShadowXSmall(euiThemeContext)}

      &:focus {
        ${euiSlightShadowHover(euiThemeContext)}
      }
    `,
    collapsed: css`
      border-radius: 0;
    `,
  };
};
