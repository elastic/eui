/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
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
} from '../../../themes/amsterdam/global_styling/mixins/button';
import { euiScreenReaderOnly } from '../../accessibility';
import { euiFormVariables } from '../../form/form.styles';

export const euiButtonGroupButtonStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

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
    s: css`
      ${uncompressedBorderRadii(euiTheme.border.radius.small)}
    `,
    m: css`
      ${uncompressedBorderRadii(euiTheme.border.radius.medium)}
    `,
    uncompressed: css`
      &:is(.euiButtonGroupButton-isSelected) {
        font-weight: ${euiTheme.font.weight.bold};
      }

      /* "Borders" between buttons - should be present between two of the same colored buttons,
         and absent between selected vs non-selected buttons (different colors) */

      &:not(.euiButtonGroupButton-isSelected)
        + .euiButtonGroupButton:not(.euiButtonGroupButton-isSelected) {
        box-shadow: -${euiTheme.border.width.thin} 0 0 0 ${transparentize(euiTheme.colors.fullShade, 0.1)};
      }

      &:is(.euiButtonGroupButton-isSelected)
        + .euiButtonGroupButton-isSelected {
        box-shadow: -${euiTheme.border.width.thin} 0 0 0 ${transparentize(euiTheme.colors.emptyShade, 0.2)};
      }
    `,
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

/**
 * Focus utilities - made complex by the two different button styles
 * and the fact that `label`/`input` combos need :focus-within,
 * but `button` does not
 */
const _outlineSelectors = (outlineCss: string) => {
  return css`
    &:is(button) {
      &:focus-visible {
        ${outlineCss}
      }
    }

    &:is(label) {
      /* Firefox fallback for :has. Delete once FF supports :has */
      &:focus-within {
        ${outlineCss}
      }

      @supports selector(:has(*)) {
        &:focus-within {
          outline: none;
        }
        /* Once all evergreen browsers support :has, we can remove
           @supports and the outline: none reset just use this selector */
        &:has(:focus-visible) {
          ${outlineCss}
        }
      }
    }
  `;
};

export const _compressedButtonFocusColor = (
  euiThemeContext: UseEuiTheme,
  color: _EuiButtonColor | 'disabled'
) => {
  const { euiTheme } = euiThemeContext;
  const { backgroundColor } = euiButtonFillColor(euiThemeContext, color);

  return _outlineSelectors(
    `outline: ${euiTheme.focus.width} solid ${backgroundColor};`
  );
};

export const _uncompressedButtonFocus = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return _outlineSelectors(
    euiOutline(euiThemeContext, 'inset', euiTheme.colors.fullShade)
  );
};
