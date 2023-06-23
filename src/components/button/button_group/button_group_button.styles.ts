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

  // Util that tweaks the border-radius to account for padding & background-clip
  const calculateBorderRadius = (radiusSize: CSSProperties['borderRadius']) => `
    border-radius: ${mathWithUnits(
      [radiusSize, euiTheme.border.width.thin],
      (x, y) => x + y
    )};
  `;

  return {
    // Base
    euiButtonGroupButton: css`
      /* Needed for pseudo borders */
      position: relative;

      /* Allow button to shrink and truncate */
      ${logicalCSS('min-width', 0)}
      flex-shrink: 1;
      flex-grow: 0;

      /* Offset the background color from the border by clipping background to before the padding starts */
      padding: ${mathWithUnits(euiTheme.border.width.thin, (x) => x * 2)};
      background-clip: content-box;

      ${euiCanAnimate} {
        transition: background-color ${euiTheme.animation.normal} ease-in-out,
          color ${euiTheme.animation.normal} ease-in-out;
      }
    `,
    // Sizes
    s: css`
      ${calculateBorderRadius(euiTheme.border.radius.small)}
    `,
    m: css`
      ${calculateBorderRadius(euiTheme.border.radius.medium)}
    `,
    uncompressed: css`
      &:is(.euiButtonGroupButton-isSelected) {
        font-weight: ${euiTheme.font.weight.bold};
      }

      /* "Borders" between buttons - should be present between two unselected buttons,
         and absent between selected vs non-selected buttons (different colors) */

      &:not(.euiButtonGroupButton-isSelected)
        + .euiButtonGroupButton:not(.euiButtonGroupButton-isSelected)::before {
        content: '';
        position: absolute;
        inset-block: 0;
        inset-inline-start: -${euiTheme.border.width.thin};
        inline-size: ${euiTheme.border.width.thin};
        background-color: ${transparentize(euiTheme.colors.fullShade, 0.1)};
      }
    `,
    compressed: css`
      ${logicalCSS('height', compressedButtonHeight)}
      line-height: ${compressedButtonHeight};
      font-weight: ${euiTheme.font.weight.regular};
      ${calculateBorderRadius(controlCompressedBorderRadius)}

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
      uncompressed: css`
        padding-inline: ${euiTheme.size.m};
      `,
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
