/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css, type SerializedStyles } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import {
  logicalCSS,
  euiTextShift,
  euiOutline,
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

  const buttonSizeMap = euiButtonSizeMap(euiThemeContext);
  const buttonSizes = {
    s: {
      height: buttonSizeMap.s.getInsetHeight(
        buttonSizeMap.s.height,
        euiTheme.size.xs
      ),
      radius: buttonSizeMap.s.radiusInset,
    },
    m: {
      height: buttonSizeMap.m.getInsetHeight(
        buttonSizeMap.m.height,
        euiTheme.size.xs
      ),
      radius: buttonSizeMap.m.radiusInset,
    },
  };
  const selectedSelectors =
    '.euiButtonGroupButton-isSelected, .euiButtonGroup__tooltipWrapper-isSelected';

  return {
    // Base
    euiButtonGroupButton: css`
      /* Allow button to shrink and truncate */
      ${logicalCSS('min-width', 0)}
      flex-shrink: 1;
      flex-grow: 0;
      border: none;
      border-radius: ${buttonSizes.s.radius};
      font-weight: ${euiTheme.font.weight.medium};

      &:is(${selectedSelectors}):not(${euiDisabledSelector}) {
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

      &:is(${selectedSelectors}:where(${euiDisabledSelector})) {
        border: none;
      }

      &:focus-visible {
        outline-offset: 0;
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
    },
    s: css`
      ${logicalCSS('height', buttonSizes.s.height)}
      line-height: ${buttonSizes.s.height};
    `,
    m: css`
      ${logicalCSS('height', buttonSizes.m.height)}
      line-height: ${buttonSizes.m.height};
    `,
    // States
    isSelected: css`
      background-color: ${euiTheme.colors.backgroundLightText};

      &:is(${selectedSelectors}):not(${euiDisabledSelector}) {
        ${highContrastModeStyles(euiThemeContext, {
          preferred: `
            border: ${euiTheme.border.width.thin} solid currentColor;
          `,
          forced: `
            border: none;
          `,
        })}
      }

      &:is(${selectedSelectors}:where(${euiDisabledSelector})) {
        ${highContrastModeStyles(euiThemeContext, {
          preferred: `
            border: ${euiTheme.border.thin};
          `,
        })}
      }
    `,
    disabledAndSelected: css`
      color: ${euiTheme.colors.textDisabled};
      background-color: ${euiTheme.components
        .buttonGroupBackgroundDisabledSelected};
      border: ${highContrastMode
        ? `${euiTheme.border.width.thin} solid ${euiTheme.components.buttonGroupBackgroundDisabledSelected}`
        : `${euiTheme.border.width.thin} solid ${euiTheme.colors.borderBasePlain}`};
    `,
    // Tooltip anchor wrapper
    tooltipWrapper: css`
      /* Without this on the tooltip anchor, button text truncation doesn't work */
      min-inline-size: 0;

      &:has(:focus-visible) {
        /* ensure to keep focus outline over selected sibling wrappers */
        z-index: 1;
      }
    `,
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
