/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, type SerializedStyles } from '@emotion/react';
import { CSSProperties } from 'react';

import {
  UseEuiTheme,
  makeDisabledContrastColor,
  transparentize,
} from '../../../services';
import {
  mathWithUnits,
  logicalCSS,
  logicalShorthandCSS,
  euiTextShift,
  euiOutline,
  euiCanAnimate,
} from '../../../global_styling';
import {
  euiButtonFillColor,
  _EuiButtonColor,
  BUTTON_COLORS,
} from '../../../themes/amsterdam/global_styling/mixins/button';
import { euiScreenReaderOnly } from '../../accessibility';
import { euiFormVariables } from '../../form/form.styles';

export const euiButtonGroupButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const { controlCompressedHeight, controlCompressedBorderRadius } =
    euiFormVariables(euiThemeContext);
  const compressedButtonHeight = mathWithUnits(
    [controlCompressedHeight, euiTheme.border.width.thin],
    (x, y) => x - y * 2
  );

  const uncompressedBorderRadii = (
    radiusSize: CSSProperties['borderRadius']
  ) => `
    border-radius: 0;

    &:first-child {
      ${logicalShorthandCSS('border-radius', `${radiusSize} 0 0 ${radiusSize}`)}
    }

    &:last-child {
      ${logicalShorthandCSS('border-radius', `0 ${radiusSize} ${radiusSize} 0`)}
    }
  `;

  return {
    // Base
    euiButtonGroupButton: css`
      /* Allow button to shrink and truncate */
      ${logicalCSS('min-width', 0)}
      flex-shrink: 1;
      flex-grow: 0;

      ${euiCanAnimate} {
        transition: background-color ${euiTheme.animation.normal} ease-in-out,
          color ${euiTheme.animation.normal} ease-in-out;
      }
    `,
    iconOnly: css`
      padding-inline: ${euiTheme.size.s};
    `,
    // Sizes
    uncompressed: {
      uncompressed: css`
        &:is(.euiButtonGroupButton-isSelected) {
          font-weight: ${euiTheme.font.weight.bold};
        }

        &:focus-visible {
          ${euiOutline(euiThemeContext, 'inset', euiTheme.colors.fullShade)}
        }
      `,
      get borders() {
        const selectors =
          '.euiButtonGroupButton-isSelected, .euiButtonGroup__tooltipWrapper-isSelected';
        const selectedColor = transparentize(
          euiTheme.colors.emptyShade,
          highContrastMode ? 1 : 0.2
        );
        const unselectedColor = transparentize(
          euiTheme.colors.fullShade,
          highContrastMode ? 1 : 0.1
        );
        const borderWidth = euiTheme.border.width.thin;

        // "Borders" between buttons should be present between two of the same colored buttons,
        // and absent between selected vs non-selected buttons (different colors)
        return `
          &:not(${selectors}) + *:not(${selectors}) {
            box-shadow: -${borderWidth} 0 0 0 ${unselectedColor};
          }
          &:is(${selectors}) + *:is(${selectors}) {
            box-shadow: -${borderWidth} 0 0 0 ${selectedColor};
          }
        `;
      },
      get s() {
        return css`
          ${this.borders}
          ${uncompressedBorderRadii(euiTheme.border.radius.small)}
        `;
      },
      get m() {
        return css`
          ${this.borders}
          ${uncompressedBorderRadii(euiTheme.border.radius.medium)}
        `;
      },
      hasToolTip: css`
        /* Set the border-radius on the tooltip anchor element instead and inherit from that */
        border-radius: inherit;
      `,
    },
    compressed: css`
      ${logicalCSS('height', compressedButtonHeight)}
      line-height: ${compressedButtonHeight};

      /* Offset the background color from the border by clipping background to before the padding starts */
      padding: ${mathWithUnits(euiTheme.border.width.thin, (x) => x * 2)};
      background-clip: content-box;
      /* Tweak border radius to account for the padding & background-clip */
      border-radius: ${mathWithUnits(
        [controlCompressedBorderRadius, euiTheme.border.width.thin],
        (x, y) => x + y
      )};

      font-weight: ${euiTheme.font.weight.regular};

      &:is(.euiButtonGroupButton-isSelected) {
        font-weight: ${euiTheme.font.weight.semiBold};
      }
    `,
    // States
    disabledAndSelected: css`
      color: ${makeDisabledContrastColor(euiTheme.colors.disabledText)(
        euiTheme.colors.disabled
      )};
      background-color: ${euiTheme.colors.disabled};
    `,
    // Tooltip anchor wrapper
    tooltipWrapper: css`
      /* Without this on the tooltip anchor, button text truncation doesn't work */
      overflow: hidden;
    `,
    // Content wrapper
    content: {
      euiButtonGroupButton__content: css``,
      compressed: css`
        padding-inline: ${euiTheme.size.s};
      `,
    },
    // Text wrapper
    text: {
      euiButtonGroupButton__text: css`
        ${euiTextShift('bold', 'data-text', euiTheme)}
      `,
      euiButtonGroupButton__iconOnly: css`
        ${euiScreenReaderOnly()}
      `,
    },
  };
};

export const _compressedButtonFocusColors = (euiThemeContext: UseEuiTheme) => {
  const colors = [...BUTTON_COLORS, 'disabled'] as const;

  return colors.reduce((acc, color) => {
    const { backgroundColor } = euiButtonFillColor(euiThemeContext, color);

    return {
      ...acc,
      [color]: css`
        &:focus-visible {
          ${euiOutline(euiThemeContext, 'center', backgroundColor)}

          &:is(.euiButtonGroupButton-isSelected) {
            outline-offset: 0;
          }
        }
      `,
    };
  }, {} as Record<_EuiButtonColor | 'disabled', SerializedStyles>);
};
