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

  const absoluteStyles = css`
    z-index: 1;
    position: absolute;
    ${logicalCSS('vertical', 0)}
  `;

  const staticStyles = css`
    position: static;
    ${logicalCSS('height', '100%')}
    align-self: stretch;
    flex-grow: 0;
  `;

  return {
    euiFormControlLayoutIcons: css`
      ${logicalCSS('height', 'fit-content')}
      pointer-events: none;
      display: flex;
    `,

    disabled: css`
      cursor: not-allowed;
      color: ${controlDisabledColor};
    `,

    uncompressed: {
      base: css`
        gap: ${mathWithUnits(controlPadding, (x) => x / 2)};
      `,
      absolute: css`
        ${absoluteStyles}
        ${iconPaddingTop(controlHeight, controlIconSize.m)}
      `,
      static: css`
        ${staticStyles}
        ${iconPaddingTop(controlLayoutGroupInputHeight, controlIconSize.m)}
        ${logicalCSS('padding-horizontal', controlPadding)}
      `,
      left: css`
        ${logicalCSS('left', controlPadding)}
      `,
      right: css`
        ${logicalCSS('right', controlPadding)}
      `,
      inGroup: css`
        ${iconPaddingTop(controlLayoutGroupInputHeight, controlIconSize.m)}
      `,
    },

    compressed: {
      base: css`
        gap: ${mathWithUnits(controlCompressedPadding, (x) => x / 2)};
      `,
      absolute: css`
        ${absoluteStyles}
        ${iconPaddingTop(controlCompressedHeight, controlIconSize.s)}
      `,
      static: css`
        ${staticStyles}
        ${iconPaddingTop(
          controlLayoutGroupInputCompressedHeight,
          controlIconSize.s
        )}
        ${logicalCSS('padding-horizontal', controlCompressedPadding)}
      `,
      left: css`
        ${logicalCSS('left', controlCompressedPadding)}
      `,
      right: css`
        ${logicalCSS('right', controlCompressedPadding)}
      `,
      inGroup: css`
        ${iconPaddingTop(
          controlLayoutGroupInputCompressedHeight,
          controlIconSize.s
        )}
      `,
    },
  };
};
