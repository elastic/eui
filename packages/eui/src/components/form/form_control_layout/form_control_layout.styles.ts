/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../../services';
import { euiTextTruncate, logicalCSS } from '../../../global_styling';
import { highContrastModeStyles } from '../../../global_styling/functions/high_contrast';

import { euiFormVariables } from '../form.styles';

export const euiFormControlLayoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const form = euiFormVariables(euiThemeContext);

  return {
    euiFormControlLayout: css`
      position: relative;
      z-index: 0;
    `,
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
        position: relative;
        display: flex;
        align-items: stretch;

        border: none;
        background-color: ${form.backgroundColor};
        overflow: hidden; /* Keep backgrounds inside border radius */

        /* use pseudo element for borders to prevent dimension changes and support nested elements better */
        &::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          border: ${euiTheme.border.width.thin} solid ${form.borderColor};
          border-radius: inherit;
          pointer-events: none;
        }

        /* the filter group will use the form layout border instead */
        .euiFilterGroup {
          border-radius: 0;
          /* creating extra space to prevent the focus indicator being cut off */
          ${logicalCSS('padding-right', euiTheme.border.width.thin)}

          &::after {
            display: none;
          }
        }

        .euiFilterButton__wrapper:first-of-type::before,
        .euiFilterButton__wrapper::after {
          display: none;
        }

        .euiFormControlButton {
          border-radius: inherit;
          box-shadow: none;
        }

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

        > :first-child {
          border-radius: inherit;
          ${logicalCSS('border-top-left-radius', '0')}
          ${logicalCSS('border-bottom-left-radius', '0')}
        }

        > :last-child {
          border-radius: inherit;
          ${logicalCSS('border-top-right-radius', '0')}
          ${logicalCSS('border-bottom-right-radius', '0')}
        }
      `,
      prependOnly: css`
        ${logicalCSS('border-top-right-radius', 'inherit')}
        ${logicalCSS('border-bottom-right-radius', 'inherit')}

        > :last-child {
          ${logicalCSS('border-top-right-radius', 'inherit')}
          ${logicalCSS('border-bottom-right-radius', 'inherit')}
        }
      `,
      appendOnly: css`
        ${logicalCSS('border-top-left-radius', 'inherit')}
        ${logicalCSS('border-bottom-left-radius', 'inherit')}

        > :first-child {
          ${logicalCSS('border-top-left-radius', 'inherit')}
          ${logicalCSS('border-bottom-left-radius', 'inherit')}
        }
      `,
    },
  };
};

export const euiFormControlLayoutSideNodeStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  const form = euiFormVariables(euiThemeContext);

  const uncompressedHeight = form.controlHeight;
  const compressedHeight = form.controlCompressedHeight;

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
        none: `
          position: relative;
          ${logicalCSS('margin-left', `-${euiTheme.border.width.thin}`)}

          &::before {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            border-inline-start: 
              ${euiTheme.border.width.thin} solid ${form.borderColor};
          }
        `,
        preferred: logicalCSS('border-left', euiTheme.border.thin),
      })
    ),
    prepend: css(
      highContrastModeStyles(euiThemeContext, {
        none: `
          position: relative;
          ${logicalCSS('margin-right', `-${euiTheme.border.width.thin}`)}

          &::before {
            content: '';
            position: absolute;
            inset: 0;
            z-index: 1;
            pointer-events: none;
            border-inline-end: 
              ${euiTheme.border.width.thin} solid ${form.borderColor};
          }
        `,
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
