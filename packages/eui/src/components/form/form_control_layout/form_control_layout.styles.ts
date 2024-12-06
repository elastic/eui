/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import {
  euiTextTruncate,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import { highContrastModeStyles } from '../../../global_styling/functions/high_contrast';

import { euiFormVariables } from '../form.styles';

export const euiFormControlLayoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  return {
    euiFormControlLayout: css``,
    // Skip the css`` on the default height to avoid generating a className
    uncompressed: `
      ${logicalCSS('height', form.controlHeight)}
    `,
    compressed: css`
      ${logicalCSS('height', form.controlCompressedHeight)}
    `,
    // Skip the css`` on the default width to avoid generating a className
    formWidth: `
      ${logicalCSS('max-width', form.maxWidth)}
      ${logicalCSS('width', '100%')}
    `,
    fullWidth: css`
      ${logicalCSS('max-width', '100%')}
      ${logicalCSS('width', '100%')}
    `,

    group: {
      group: css`
        display: flex;
        align-items: stretch;

        border: ${euiTheme.border.width.thin} solid ${form.borderColor};
        background-color: ${form.backgroundColor};
        overflow: hidden; /* Keep backgrounds inside border radius */

        /* Force the stretch of any children so they expand the full height of the control */
        > * {
          ${logicalCSS('height', '100%')}
        }
      `,
      // Skipping css`` to avoid repeated compressed/uncompressed classNames
      uncompressed: `
        border-radius: ${form.controlBorderRadius};
      `,
      compressed: `
        border-radius: ${form.controlCompressedBorderRadius};
      `,
    },

    children: {
      euiFormControlLayout__childrenWrapper: css`
        position: relative;
      `,
      inGroup: css`
        flex-grow: 1;
        overflow: hidden; /* Ensure truncation works in children elements */
      `,
      prependOnly: css`
        ${logicalCSS('border-top-right-radius', 'inherit')}
        ${logicalCSS('border-bottom-right-radius', 'inherit')}
      `,
      appendOnly: css`
        ${logicalCSS('border-top-left-radius', 'inherit')}
        ${logicalCSS('border-bottom-left-radius', 'inherit')}
      `,
    },
  };
};

export const euiFormControlLayoutSideNodeStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  const uncompressedHeight = mathWithUnits(
    [form.controlHeight, euiTheme.border.width.thin],
    (x, y) => x - y * 2
  );
  const compressedHeight = mathWithUnits(
    [form.controlCompressedHeight, euiTheme.border.width.thin],
    (x, y) => x - y * 2
  );

  const buttons = '*:is(.euiButton, .euiButtonEmpty, .euiButtonIcon)';
  const text = '*:is(.euiFormLabel, .euiText)';

  return {
    euiFormControlLayout__side: css`
      ${logicalCSS('height', '100%')}
      ${euiTextTruncate('50%')}
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.xs};
      background-color: ${form.appendPrependBackground};

      /* Overrides */

      ${buttons} {
        /* Override button hover/active transform */
        transform: none !important; /* stylelint-disable-line declaration-no-important */

        /* Account for border around focusable children */
        &:focus-visible {
          outline-offset: -${euiTheme.focus.width};
        }
      }

      ${text} {
        /* Override .euiFormLabel CSS */
        cursor: default;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Account for button padding when spacing children */
      /* Second > * selector accounts for buttons inside popover & tooltip wrappers */

      &:not(:has(> ${buttons}:first-child, > *:first-child > ${buttons})) {
        ${logicalCSS('padding-left', euiTheme.size.s)}
      }

      &:not(:has(> ${buttons}:last-child, > *:last-child > ${buttons})) {
        ${logicalCSS('padding-right', euiTheme.size.s)}
      }
    `,
    append: css(
      highContrastModeStyles(euiThemeContext, {
        preferred: logicalCSS('border-left', euiTheme.border.thin),
      })
    ),
    prepend: css(
      highContrastModeStyles(euiThemeContext, {
        preferred: logicalCSS('border-right', euiTheme.border.thin),
      })
    ),
    uncompressed: `
      ${text} {
        ${logicalCSS('padding-horizontal', euiTheme.size.xs)}
        line-height: ${uncompressedHeight};
      }

      ${buttons} {
        ${logicalCSS('height', uncompressedHeight)}
      }

      .euiButtonIcon {
        flex-shrink: 0;
        ${logicalCSS('width', euiTheme.size.xl)}
      }
    `,
    compressed: css`
      ${text} {
        ${logicalCSS('padding-horizontal', euiTheme.size.xxs)}
        line-height: ${compressedHeight};
      }

      ${buttons} {
        ${logicalCSS('height', compressedHeight)}
      }

      .euiButtonIcon {
        flex-shrink: 0;
        ${logicalCSS('width', euiTheme.size.xl)}
      }
    `,
  };
};
