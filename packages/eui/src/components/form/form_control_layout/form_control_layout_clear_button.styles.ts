/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';

export const EuiFormControlLayoutClearButtonStyles = ({
  euiTheme,
  colorMode,
}: UseEuiTheme) => {
  const isExperimental = euiTheme.flags?.formVariant === 'experimental';

  const backgroundColor = isExperimental
    ? euiTheme.colors.borderInteractiveFormsHoverPlain
    : colorMode === 'DARK'
    ? euiTheme.colors.darkShade
    : euiTheme.colors.mediumShade;
  return {
    euiFormControlLayoutClearButton: css`
      pointer-events: all;
      background-color: ${backgroundColor};
      border-radius: 50%;
      line-height: 0; /* ensures the icon stays vertically centered */

      &:disabled {
        cursor: not-allowed;
        background-color: ${euiTheme.colors.disabled};
      }
    `,

    euiFormControlLayoutClearButton__icon: css`
      transform: scale(0.5);
      fill: ${euiTheme.colors.emptyShade};
      stroke: ${euiTheme.colors.emptyShade};
    `,
    size: {
      s: css`
        stroke-width: ${euiTheme.size.xs};
      `,
      m: css`
        stroke-width: ${euiTheme.size.xxs};
      `,
    },
  };
};
