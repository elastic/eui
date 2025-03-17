/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, type SerializedStyles } from '@emotion/react';
import { CSSProperties } from 'react';

import { UseEuiTheme, makeDisabledContrastColor } from '../../../services';
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
} from '../../../global_styling/mixins/_button';
import { euiScreenReaderOnly } from '../../accessibility';
import { euiFormVariables } from '../../form/form.styles';

export const euiButtonGroupButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
  const isExperimental = euiTheme.flags?.buttonVariant === 'experimental';

  const { controlCompressedHeight, controlCompressedBorderRadius } =
    euiFormVariables(euiThemeContext);
  const compressedButtonHeight = mathWithUnits(
    [controlCompressedHeight, euiTheme.border.width.thin],
    (x, y) => (isExperimental ? x - y * 6 : x - y * 2)
  );

  const selectedSelectors =
    '.euiButtonGroupButton-isSelected, .euiButtonGroup__tooltipWrapper-isSelected';

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

  const defaultUncompressedStyles =
    !isExperimental &&
    `
      &:is(.euiButtonGroupButton-isSelected) {
        font-weight: ${euiTheme.font.weight.bold};
      }
    `;

  const defaultCompressedStyles =
    !isExperimental &&
    `
      background-clip: content-box;
      /* Tweak border radius to account for the padding & background-clip */
      border-radius: ${mathWithUnits(
        [controlCompressedBorderRadius, euiTheme.border.width.thin],
        (x, y) => x + y
      )};

      &:is(.euiButtonGroupButton-isSelected) {
        font-weight: ${euiTheme.font.weight.semiBold};
      }
    `;

  const experimentalUncompressedStyles =
    isExperimental &&
    `
      &:is(.euiButtonGroupButton-isSelected) {
        z-index: 1;
        /* prevent layout jumps due to missing border for selected/filled buttons */
        border: ${euiTheme.border.width.thin} solid transparent;
      }
    `;

  const experimentalCompressedStyles =
    isExperimental &&
    `
      margin: ${euiTheme.size.xxs};
      border-radius: ${mathWithUnits(
        euiTheme.border.radius.small,
        (x) => x / 2
      )};
    `;

  return {
    // Base
    euiButtonGroupButton: css`
      /* Allow button to shrink and truncate */
      ${logicalCSS('min-width', 0)}
      flex-shrink: 1;
      flex-grow: 0;
      z-index: 0;

      &:focus-visible {
        z-index: 2;
      }

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
        &:focus-visible {
          ${euiOutline(
            euiThemeContext,
            'inset',
            euiTheme.components.buttonGroupFocusColor
          )}
        }

        ${defaultUncompressedStyles}
        ${experimentalUncompressedStyles}
      `,
      get borders() {
        // We use pseudo elements to avoid affecing button width, and to allow
        // inheriting high contrast border colors
        const selectors = selectedSelectors;
        const selectedColor = highContrastMode
          ? euiTheme.colors.emptyShade
          : euiTheme.components.buttonGroupBorderColorSelected;
        const unselectedColor = highContrastMode
          ? 'inherit'
          : euiTheme.components.buttonGroupBorderColor;
        const borderWidth = euiTheme.border.width.thin;

        if (isExperimental) {
          // reduce double border
          return `
            &:not(:first-child) {
              margin-inline-start: -${borderWidth};
            }
          `;
        }

        // "Borders" between buttons should be present between two of the same colored buttons,
        // and absent between selected vs non-selected buttons (different colors)
        return `
          position: relative;

          &::before {
            position: absolute;
            ${logicalCSS('left', 0)}
            ${logicalCSS(
              'vertical',
              highContrastMode ? `-${euiTheme.border.width.thin}` : 0
            )}
            ${logicalCSS('border-left-style', 'solid')}
            ${logicalCSS('border-left-width', euiTheme.border.width.thin)}
            pointer-events: none;
          }
        
          &:not(${selectors}) + *:not(${selectors}) {
            &::before {
              content: '';
              border-color: ${unselectedColor};
            }
          }

          &:is(${selectors}) + *:is(${selectors}) {
            &::before {
              content: '';
              border-color: ${selectedColor};
            }
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
        const radius = isExperimental
          ? euiTheme.border.radius.small
          : euiTheme.border.radius.medium;
        return css`
          ${this.borders}
          ${uncompressedBorderRadii(radius)}
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
      font-weight: ${euiTheme.font.weight.regular};

      /* Offset the background color from the border by clipping background to before the padding starts */
      padding: ${isExperimental
        ? '0'
        : mathWithUnits(euiTheme.border.width.thin, (x) => x * 2)};
      ${defaultCompressedStyles}
      ${experimentalCompressedStyles}
    `,
    // States
    disabledAndSelected: css`
      color: ${makeDisabledContrastColor(euiTheme.colors.textDisabled)(
        euiTheme.components.buttonGroupBackgroundDisabledSelected
      )};
      background-color: ${euiTheme.components
        .buttonGroupBackgroundDisabledSelected};
      border: ${highContrastMode &&
      `${euiTheme.border.width.thin} solid ${euiTheme.components.buttonGroupBackgroundDisabledSelected}`};
    `,
    hasBorder: css`
      border: ${euiTheme.border.width.thin} solid
        ${euiTheme.colors.borderBasePlain};
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
  const { euiTheme } = euiThemeContext;
  const isExperimental = euiTheme.flags?.buttonVariant === 'experimental';
  const colors = [...BUTTON_COLORS, 'disabled'] as const;

  const defaultStyles =
    !isExperimental &&
    `
    &:is(.euiButtonGroupButton-isSelected) {
      outline-offset: 0;
    }
  `;

  return colors.reduce((acc, color) => {
    const { backgroundColor } = euiButtonFillColor(euiThemeContext, color);

    return {
      ...acc,
      [color]: css`
        &:focus-visible {
          ${euiOutline(
            euiThemeContext,
            isExperimental ? 'outset' : 'center',
            backgroundColor
          )}

          ${defaultStyles}
        }
      `,
    };
  }, {} as Record<_EuiButtonColor | 'disabled', SerializedStyles>);
};
