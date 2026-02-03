/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, type SerializedStyles } from '@emotion/react';
import { CSSProperties } from 'react';

import { UseEuiTheme } from '../../../services';
import {
  mathWithUnits,
  logicalCSS,
  logicalShorthandCSS,
  euiTextShift,
  euiOutline,
  euiCanAnimate,
  preventForcedColors,
  highContrastModeStyles,
  euiDisabledSelector,
} from '../../../global_styling';
import {
  _EuiButtonColor,
  BUTTON_COLORS,
  euiButtonSizeMap,
} from '../../../global_styling/mixins/_button';
import { euiScreenReaderOnly } from '../../accessibility';

export const euiButtonGroupButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;

  const buttonSizes = euiButtonSizeMap(euiThemeContext);
  const compressedButtonHeight = mathWithUnits(
    [buttonSizes.s.height, euiTheme.border.width.thin],
    (x, y) => x - y * 6
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
    `,
    iconOnly: {
      // used only as classname, sizes are added separately
      iconOnly: css``,
      s: `
        ${logicalCSS('width', buttonSizes.s.height)}
      `,
      m: `
        ${logicalCSS('width', buttonSizes.m.height)}
      `,
      compressed: `
        ${logicalCSS('width', compressedButtonHeight)}
      `,
    },
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

        &:is(${selectedSelectors}):not(${euiDisabledSelector}) {
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

        // "Borders" between buttons should be present between two of the same colored buttons,
        // and absent between selected vs non-selected buttons (different colors)
        return `
          position: relative;

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
        const radius = euiTheme.border.radius.small;
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
      padding: 0;

      margin: ${euiTheme.size.xxs};
      border-radius: ${mathWithUnits(
        euiTheme.border.radius.small,
        (x) => x / 2
      )};

      & + .euiButtonGroupButton {
        ${logicalCSS('margin-left', '0')}
      }

      &:is(${selectedSelectors}):not(${euiDisabledSelector}) {
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
    `,
    // States
    disabledAndSelected: css`
      color: ${euiTheme.colors.textDisabled};
      background-color: ${euiTheme.components
        .buttonGroupBackgroundDisabledSelected};
      border: ${highContrastMode
        ? `${euiTheme.border.width.thin} solid ${euiTheme.components.buttonGroupBackgroundDisabledSelected}`
        : `${euiTheme.border.width.thin} solid ${euiTheme.colors.borderBasePlain}`};
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
  const colors = [...BUTTON_COLORS, 'disabled'] as const;

  return colors.reduce((acc, color) => {
    return {
      ...acc,
      [color]: css`
        &:focus-visible {
          ${euiOutline(euiThemeContext, 'outset', euiTheme.focus.color)}
        }
      `,
    };
  }, {} as Record<_EuiButtonColor | 'disabled', SerializedStyles>);
};
