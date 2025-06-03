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
  isEuiThemeRefreshVariant,
  makeDisabledContrastColor,
} from '../../../services';
import {
  mathWithUnits,
  logicalCSS,
  logicalShorthandCSS,
  euiTextShift,
  euiOutline,
  euiCanAnimate,
  preventForcedColors,
  highContrastModeStyles,
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
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );

  const { controlCompressedHeight, controlCompressedBorderRadius } =
    euiFormVariables(euiThemeContext);
  const compressedButtonHeight = mathWithUnits(
    [controlCompressedHeight, euiTheme.border.width.thin],
    (x, y) => (isRefreshVariant ? x - y * 6 : x - y * 2)
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

    &:first-child:last-child {
      ${logicalShorthandCSS('border-radius', `${radiusSize}`)}
    }
  `;

  const refreshVariantStyles = `
      &:is(${selectedSelectors}) {
        ${highContrastModeStyles(euiThemeContext, {
          forced: `
            --highContrastHoverIndicatorColor: ${euiTheme.colors.textInverse};
            border: none;

            /* styles the content manually instead of the button itself to preserve the system
            focus style, as otherwise preventForcedColors() would require manual styling */
            > [class*="euiButtonDisplayContent"] {
              ${preventForcedColors(euiThemeContext)}
              color: ${euiTheme.colors.emptyShade};
              border: none;
            }
          `,
        })}
      }
    `;

  const uncompressedStyles = isRefreshVariant
    ? `
      &:is(${selectedSelectors}):not(:disabled) {
        z-index: 1;
        /* prevent layout jumps due to missing border for selected/filled buttons */
        border: ${euiTheme.border.width.thin} solid transparent;

        ${highContrastModeStyles(euiThemeContext, {
          forced: `
            /* use inset focus outline to ensure visibility, same as custom hover.
            NOTE: temp solution - this will be revisited once we handle global focus styles */
            &:focus-visible {
              outline-color: ${euiTheme.colors.textInverse};
              /* has to be inset due to overflow: hidden */
              outline-offset: -${mathWithUnits(
                euiTheme.border.width.thin,
                (x) => x * 4
              )};
            }
          `,
        })}
      }
    `
    : `
      &:is(.euiButtonGroupButton-isSelected) {
        font-weight: ${euiTheme.font.weight.bold};
      }
    `;

  const compressedStyles = isRefreshVariant
    ? `
      margin: ${euiTheme.size.xxs};
      border-radius: ${mathWithUnits(
        euiTheme.border.radius.small,
        (x) => x / 2
      )};

      & + .euiButtonGroupButton {
        ${logicalCSS('margin-left', '0')}
      }

      &:is(${selectedSelectors}):not(:disabled) {
        /* prevent layout jumps due to missing border for non-selected buttons */
        border: none;

        ${highContrastModeStyles(euiThemeContext, {
          forced: `
            /* use inset focus outline to ensure visibility, same as custom hover.
            NOTE: temp solution - this will be revisited once we handle global focus styles */
            &:focus-visible {
              outline-color: ${euiTheme.colors.textInverse};
              /* has to be inset due to overflow: hidden */
              outline-offset: -${mathWithUnits(
                euiTheme.border.width.thin,
                (x) => x * 3
              )};
            }
          `,
        })}
      }
    `
    : `
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

      ${isRefreshVariant && refreshVariantStyles}
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

        ${uncompressedStyles}
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

        const borderStyles = isRefreshVariant
          ? `
            &:not(:first-child) {
              margin-inline-start: -${borderWidth};
            }

            &:is(${selectors}) {
              &::before {
                position: absolute;
                z-index: 1;
                ${logicalCSS('left', 0)}
                ${logicalCSS('vertical', `-${euiTheme.border.width.thin}`)}
                ${logicalCSS('border-left-style', 'solid')}
                ${logicalCSS('border-left-width', euiTheme.border.width.thin)}
                pointer-events: none;

                ${preventForcedColors(euiThemeContext)}
              }
            }
          `
          : `
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
          `;

        // "Borders" between buttons should be present between two of the same colored buttons,
        // and absent between selected vs non-selected buttons (different colors)
        return `
          position: relative;

          ${borderStyles}

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
        const radius = isRefreshVariant
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
      font-weight: ${euiTheme.font.weight.medium};

      /* Offset the background color from the border by clipping background to before the padding starts */
      padding: ${isRefreshVariant
        ? '0'
        : mathWithUnits(euiTheme.border.width.thin, (x) => x * 2)};

      ${compressedStyles}
    `,
    // States
    disabledAndSelected: css`
      color: ${isRefreshVariant
        ? euiTheme.colors.textDisabled
        : makeDisabledContrastColor(euiTheme.colors.textDisabled)(
            euiTheme.components.buttonGroupBackgroundDisabledSelected
          )};
      background-color: ${euiTheme.components
        .buttonGroupBackgroundDisabledSelected};
      border: ${highContrastMode
        ? `${euiTheme.border.width.thin} solid ${euiTheme.components.buttonGroupBackgroundDisabledSelected}`
        : isRefreshVariant
        ? `${euiTheme.border.width.thin} solid ${euiTheme.colors.borderBasePlain}`
        : ''};
    `,
    // Skip css`` to avoid generating a className
    hasBorder: `
      border: ${euiTheme.border.width.thin} solid
        ${euiTheme.colors.borderBasePlain};
    `,
    // Tooltip anchor wrapper
    tooltipWrapper: css`
      /* Without this on the tooltip anchor, button text truncation doesn't work */
      overflow: hidden;

      &:has(:focus-visible) {
        /* ensure to keep focus outline over selected sibling wrappers */
        z-index: 1;
      }
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
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'buttonVariant'
  );
  const colors = [...BUTTON_COLORS, 'disabled'] as const;

  return colors.reduce((acc, color) => {
    const { backgroundColor } = euiButtonFillColor(euiThemeContext, color);

    return {
      ...acc,
      [color]: css`
        &:focus-visible {
          ${euiOutline(
            euiThemeContext,
            isRefreshVariant ? 'outset' : 'center',
            isRefreshVariant ? euiTheme.focus.color : backgroundColor
          )}

          ${!isRefreshVariant &&
          `
            &:is(.euiButtonGroupButton-isSelected) {
              outline-offset: 0;
            }
          `}
        }
      `,
    };
  }, {} as Record<_EuiButtonColor | 'disabled', SerializedStyles>);
};
