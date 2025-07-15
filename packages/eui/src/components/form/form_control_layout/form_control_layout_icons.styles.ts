/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { logicalCSS, mathWithUnits } from '../../../global_styling';
import { euiFormVariables } from '../form.styles';

export const euiFormControlLayoutIconsStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const {
    controlHeight,
    controlCompressedHeight,
    controlPadding,
    controlCompressedPadding,
    controlDisabledColor,
  } = euiFormVariables(euiThemeContext);

  return {
    euiFormControlLayoutIcons: css`
      position: relative;
      z-index: 1; /* Ensure the icon is visible above sibling inputs */
      display: flex;
      align-items: center;
      pointer-events: none;
    `,
    uncompressed: `
      gap: ${mathWithUnits(controlPadding, (x) => x / 2)};
      max-block-size: ${controlHeight};
    `,
    compressed: css`
      gap: ${mathWithUnits(controlCompressedPadding, (x) => x / 2)};
      max-block-size: ${controlCompressedHeight};
    `,
    disabled: css`
      cursor: not-allowed;
      /* If the control is disabled, change the color of the icons */
      color: ${controlDisabledColor};
    `,

    position: {
      absolute: {
        absolute: css`
          position: absolute;
          ${logicalCSS('vertical', 0)}
        `,
        uncompressed: {
          left: css`
            /* Ensure the icon is visible above focused sibling inputs */
            z-index: 2;
            ${logicalCSS('left', controlPadding)}
          `,
          right: css`
            ${logicalCSS('right', controlPadding)}
          `,
        },
        compressed: {
          left: css`
            /* Ensure the icon is visible above focused sibling inputs */
            z-index: 2;
            ${logicalCSS('left', controlCompressedPadding)}
          `,
          right: css`
            ${logicalCSS('right', controlCompressedPadding)}
          `,
        },
      },
      static: {
        static: css`
          position: static;
          ${logicalCSS('height', '100%')}
          align-self: stretch;
          flex-grow: 0;
          ${logicalCSS('padding-horizontal', '100%')}
        `,
        uncompressed: logicalCSS('padding-horizontal', controlPadding),
        compressed: logicalCSS('padding-horizontal', controlCompressedPadding),
      },
    },
  };
};
