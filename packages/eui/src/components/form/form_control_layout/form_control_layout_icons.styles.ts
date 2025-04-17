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
    controlCompressedHeight,
    controlCompressedPadding,
    controlDisabledColor,
    controlHeight,
    controlIconSize,
    controlLayoutGroupInputCompressedHeight,
    controlLayoutGroupInputHeight,
    controlPadding,
  } = euiFormVariables(euiThemeContext);

  const iconPaddingTop = (controlHeight: string, iconSize: string) =>
    logicalCSS(
      'padding-top',
      mathWithUnits([controlHeight, iconSize], (x, y) => (x - y) / 2)
    );

  return {
    euiFormControlLayoutIcons: css`
      ${logicalCSS('height', 'fit-content')}
      pointer-events: none;
      display: flex;
    `,
    uncompressed: `
      gap: ${mathWithUnits(controlPadding, (x) => x / 2)};
    `,
    compressed: css`
      gap: ${mathWithUnits(controlCompressedPadding, (x) => x / 2)};
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
          paddingTop: css`
            ${iconPaddingTop(controlHeight, controlIconSize.m)}
          `,
          left: css`
            z-index: 1; /* Ensure the icon is visible above sibling inputs */
            ${logicalCSS('left', controlPadding)}
          `,
          right: css`
            ${logicalCSS('right', controlPadding)}
          `,
        },
        compressed: {
          paddingTop: css`
            ${iconPaddingTop(controlCompressedHeight, controlIconSize.s)}
          `,
          left: css`
            z-index: 1; /* Ensure the icon is visible above sibling inputs */
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
        uncompressed: css`
          ${iconPaddingTop(controlLayoutGroupInputHeight, controlIconSize.m)}
          ${logicalCSS('padding-horizontal', controlPadding)}
        `,
        compressed: css`
          ${iconPaddingTop(
            controlLayoutGroupInputCompressedHeight,
            controlIconSize.s
          )}
          ${logicalCSS('padding-horizontal', controlCompressedPadding)}
        `,
      },
    },

    inGroup: {
      uncompressed: `
      ${iconPaddingTop(controlLayoutGroupInputHeight, controlIconSize.m)}
    `,
      compressed: css`
        ${iconPaddingTop(
          controlLayoutGroupInputCompressedHeight,
          controlIconSize.s
        )}
      `,
    },
  };
};
