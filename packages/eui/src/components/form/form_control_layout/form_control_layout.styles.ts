/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { isEuiThemeRefreshVariant, UseEuiTheme } from '../../../services';
import {
  euiButtonSizeMap,
  euiTextTruncate,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import { highContrastModeStyles } from '../../../global_styling/functions/high_contrast';
import { type EuiButtonDisplaySizes } from '../../button/button_display/_button_display';

import { euiFormVariables } from '../form.styles';

export const buttonSelectors =
  '*:is(.euiButton, .euiButtonEmpty, .euiButtonIcon, .euiFormAppend, .euiFormPrepend)';

export const euiFormControlLayoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'formVariant'
  );
  const form = euiFormVariables(euiThemeContext);

  const groupStyles = `
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
  `;

  const wrapperGroupStyles = `
      > :first-child {
        ${logicalCSS('border-top-left-radius', '0')}
        ${logicalCSS('border-bottom-left-radius', '0')}
      }

      > :last-child {
        ${logicalCSS('border-top-right-radius', '0')}
        ${logicalCSS('border-bottom-right-radius', '0')}
      }
  `;

  const prependOnlyStyles = `
      > :last-child {
        ${logicalCSS('border-top-right-radius', 'inherit')}
        ${logicalCSS('border-bottom-right-radius', 'inherit')}
      }
  `;

  const appendOnlyStyles = `
      > :first-child {
        ${logicalCSS('border-top-left-radius', 'inherit')}
        ${logicalCSS('border-bottom-left-radius', 'inherit')}
      }
  `;

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

        border: ${isRefreshVariant
          ? 'none'
          : `${euiTheme.border.width.thin} solid ${form.borderColor}`};
        background-color: ${form.backgroundColor};
        overflow: hidden; /* Keep backgrounds inside border radius */

        ${isRefreshVariant && groupStyles}

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

        ${isRefreshVariant && wrapperGroupStyles}
      `,
      prependOnly: css`
        ${logicalCSS('border-top-right-radius', 'inherit')}
        ${logicalCSS('border-bottom-right-radius', 'inherit')}

        ${isRefreshVariant && prependOnlyStyles}
      `,
      appendOnly: css`
        ${logicalCSS('border-top-left-radius', 'inherit')}
        ${logicalCSS('border-bottom-left-radius', 'inherit')}

        ${isRefreshVariant && appendOnlyStyles}
      `,
    },
  };
};

export const euiFormControlLayoutSideNodeStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;
  const isRefreshVariant = isEuiThemeRefreshVariant(
    euiThemeContext,
    'formVariant'
  );

  const form = euiFormVariables(euiThemeContext);
  const buttonSizes = euiButtonSizeMap(euiThemeContext);

  const uncompressedHeight = mathWithUnits(
    [form.controlHeight, euiTheme.border.width.thin],
    (x, y) => (isRefreshVariant ? x : x - y * 2)
  );
  const compressedHeight = mathWithUnits(
    [form.controlCompressedHeight, euiTheme.border.width.thin],
    (x, y) => (isRefreshVariant ? x : x - y * 2)
  );

  const appendPrepend = '*:is(.euiFormAppend, .euiFormPrepend)';
  const buttons = buttonSelectors;
  const text = '*:is(.euiFormLabel, .euiText)';

  const appendStyles = `
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
  `;

  const prependStyles = `
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
  `;

  const _buttonPadding = (size: EuiButtonDisplaySizes) =>
    isRefreshVariant
      ? `${logicalCSS('padding-horizontal', buttonSizes[size].padding)}`
      : '';

  const buttonIconStyles = `
    &:first-child {
      ${logicalCSS('border-top-right-radius', '0')}
      ${logicalCSS('border-bottom-right-radius', '0')}
    }

    &:last-child {
      ${logicalCSS('border-top-left-radius', '0')}
      ${logicalCSS('border-bottom-left-radius', '0')}
    }
  `;

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

      :has(${appendPrepend}) > *,
      ${appendPrepend} > ${buttons} {
        block-size: 100%;
      }

      ${buttons} {
        block-size: 100%;
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
    `,
    append: css(
      highContrastModeStyles(euiThemeContext, {
        none: `
          ${isRefreshVariant && appendStyles}
        `,
        preferred: logicalCSS('border-left', euiTheme.border.thin),
      })
    ),
    prepend: css(
      highContrastModeStyles(euiThemeContext, {
        none: `
          ${isRefreshVariant && prependStyles}
        `,
        preferred: logicalCSS('border-right', euiTheme.border.thin),
      })
    ),
    uncompressed: `
      /* Legacy padding styles to handle content without <EuiFormAppend/Prepend> */
      &:not(:has(${appendPrepend})):not(
          :has(> ${buttons}:first-child, > *:first-child ${buttons})
        ) {
        ${logicalCSS(
          'padding-left',
          isRefreshVariant ? euiTheme.size.m : euiTheme.size.s
        )}
      }

      &:not(:has(${appendPrepend})):not(
          :has(> ${buttons}:last-child, > *:last-child ${buttons})
        ) {
        ${logicalCSS(
          'padding-right',
          isRefreshVariant ? euiTheme.size.m : euiTheme.size.s
        )}
      }

      ${text} {
        ${logicalCSS('padding-horizontal', euiTheme.size.xs)}
        line-height: ${uncompressedHeight};
      }

      ${buttons} {
        ${logicalCSS('height', uncompressedHeight)}
        ${_buttonPadding('m')}
      }

      .euiButtonIcon {
        flex-shrink: 0;
        ${logicalCSS(
          'width',
          isRefreshVariant ? uncompressedHeight : euiTheme.size.xl
        )}

        ${isRefreshVariant && buttonIconStyles}
      }
    `,
    compressed: css`
      /* Legacy padding styles to handle content without <EuiFormAppend/Prepend> */
      &:not(:has(${appendPrepend})):not(
          :has(> ${buttons}:first-child, > *:first-child ${buttons})
        ) {
        ${logicalCSS('padding-left', euiTheme.size.s)}
      }

      &:not(:has(${appendPrepend})):not(
          :has(> ${buttons}:last-child, > *:last-child ${buttons})
        ) {
        ${logicalCSS('padding-right', euiTheme.size.s)}
      }

      ${text} {
        ${logicalCSS('padding-horizontal', euiTheme.size.xxs)}
        line-height: ${compressedHeight};
      }

      ${buttons} {
        ${logicalCSS('height', compressedHeight)}
        ${_buttonPadding('s')}
      }

      .euiButtonIcon {
        flex-shrink: 0;
        ${logicalCSS(
          'width',
          isRefreshVariant ? compressedHeight : euiTheme.size.xl
        )}

        ${isRefreshVariant && buttonIconStyles}
      }
    `,
  };
};
