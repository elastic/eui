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
  euiButtonSizeMap,
  euiDisabledSelector,
  euiTextTruncate,
  highContrastModeStyles,
  logicalCSS,
  mathWithUnits,
} from '../../../global_styling';
import { type EuiButtonDisplaySizes } from '../../button/button_display/_button_display';

import { euiFormControlFocusStyles, euiFormVariables } from '../form.styles';

export const buttonSelectors =
  '*:is(.euiButton, .euiButtonEmpty, .euiButtonIcon, .euiFormAppend, .euiFormPrepend)';
const emptyButtonSelectors =
  '*:is(.euiButtonEmpty, .euiButtonIcon:not([class*="fill"]))';
export const textSelectors = '*:is(.euiFormLabel, .euiText)';
export const appendPrependSelectors = '*:is(.euiFormAppend, .euiFormPrepend)';

export const euiFormControlLayoutStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme, highContrastMode } = euiThemeContext;
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

        /* Border styles - uses pseudo element for borders to prevent dimension changes and support nested elements better */
        &::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          border: ${euiTheme.border.width.thin} solid ${form.borderColor};
          border-radius: inherit;
          pointer-events: none;
        }

        /* Hover styles */
        &:where(:not(:has(*:is(${euiDisabledSelector}), [readOnly])):hover) {
          &::after {
            border: ${highContrastMode
                ? euiTheme.border.width.thick
                : euiTheme.border.width.thin}
              solid ${highContrastMode ? form.borderColor : form.borderHovered};
          }
        }

        /* Autofill overrides */
        &:has(:autofill) {
          background: ${form.backgroundAutoFilled};

          &:not(:hover)::after {
            border-color: ${form.borderAutofilled};
          }

          *:-webkit-autofill,
          *:autofill {
            --euiFormControlStateAutofillColor: ${form.backgroundAutoFilled};

            /* cut off the outside of the control as the webkit-box-shadow can create noticable border artifacts especially in DARK mode */
            background-clip: content-box;

            &:hover,
            &:focus {
              --euiFormControlStateAutofillColor: ${form.backgroundAutoFilled};
            }
          }
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
        border-radius: inherit;
      `,
      inGroup: css`
        flex-grow: 1;
        overflow: hidden; /* Ensure truncation works in children elements */

        /* unset children default border and hover as it's handled on the layout wrapper */
        --euiFormControlStateColor: transparent;
        --euiFormControlStateHoverColor: transparent;

        .euiFormControlButton {
          box-shadow: none;

          ${highContrastModeStyles(euiThemeContext, {
            none: 'box-shadow: none;',
            preferred: 'border: none;',
          })}
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
  const buttonSizes = euiButtonSizeMap(euiThemeContext);

  const uncompressedHeight = mathWithUnits(
    [form.controlHeight, euiTheme.size.s],
    (x, y) => x - y
  );
  const compressedHeight = mathWithUnits(
    [form.controlCompressedHeight, euiTheme.size.s],
    (x, y) => x - y
  );

  const buttons = buttonSelectors;
  const text = textSelectors;
  const appendPrepend = appendPrependSelectors;

  const _buttonPadding = (size: EuiButtonDisplaySizes) =>
    logicalCSS('padding-horizontal', buttonSizes[size].padding);

  const dividerStyles = (side: 'start' | 'end', compressed?: boolean) => {
    return `
      position: relative;
      ${`margin-inline-${side}`}: -${euiTheme.border.width.thin};

      &::before {
        content: '';
        position: absolute;
        inset-inline-${side}: 0;
        z-index: ${side === 'end' ? 1 : 0};
        block-size: ${compressed ? euiTheme.size.base : euiTheme.size.l};
        inline-size: ${euiTheme.border.width.thin};
        pointer-events: none;
        border-inline-${side}: 
          ${euiTheme.border.width.thin} solid ${form.borderColor};
      }
    `;
  };

  return {
    euiFormControlLayout__side: css`
      ${logicalCSS('height', '100%')}
      ${euiTextTruncate('50%')}
      flex-shrink: 0;
      display: flex;
      align-items: center;
      gap: ${euiTheme.size.xs};
      padding: ${euiTheme.size.xs};

      /* Overrides */

      ${buttons} {
        block-size: 100%;
        border-radius: ${form.controlLayoutInnerBorderRadius};
        /* Override button hover/active transform */
        transform: none !important; /* stylelint-disable-line declaration-no-important */

        /* Account for border around focusable children */
        &:focus-visible {
          z-index: 1;
          outline-offset: ${euiTheme.focus.width};
        }
      }

      ${text} {
        /* Override .euiFormLabel CSS */
        cursor: default;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* remove default focus outline in favor of custom focus styles.
        TODO: Remove once all append/prepend legacy API usages in Kibana are updated */
      &:where(:has(${buttons}:focus-visible):has(> *:only-child)) {
        *:not(${appendPrepend}) {
          outline: none;
        }

        &::after {
          ${euiFormControlFocusStyles(euiThemeContext)}
          content: '';
          position: absolute;
          inset: 0;
          border-radius: ${form.controlLayoutBorderRadius};
          pointer-events: none;
        }
      }
    `,
    uncompressed: {
      uncompressed: `
        &:not(:has(> ${buttons}:first-child, > *:first-child ${buttons})) {
          ${logicalCSS('padding-left', euiTheme.size.s)}
        }

        &:not(:has(> ${buttons}:last-child, > *:last-child ${buttons})) {
          ${logicalCSS('padding-right', euiTheme.size.s)}
        }

        ${text} {
          ${logicalCSS('padding-horizontal', euiTheme.size.xs)}
          line-height: ${uncompressedHeight};
        }

        ${buttons} {
          ${logicalCSS('height', uncompressedHeight)}
          ${_buttonPadding('s')}
        }

        .euiButtonIcon {
          flex-shrink: 0;
          ${logicalCSS('width', uncompressedHeight)}
        }
      `,
      append: `
       ${dividerStyles('start')}
      `,
      prepend: `
        ${dividerStyles('end')}
      `,
    },
    compressed: {
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

          &:where(:not(.euiButtonIcon)) {
            ${_buttonPadding('xs')}
          }
        }

        .euiButtonIcon {
          flex-shrink: 0;
          ${logicalCSS('width', compressedHeight)}
        }
      `,
      append: `
       ${dividerStyles('start', true)}
      `,
      prepend: `
        ${dividerStyles('end', true)}
      `,
    },
    disabled: css`
      background-color: ${form.backgroundDisabledColor};

      /* Manual override for custom content to match expected styles. 
        TODO: Remove once all append/prepend legacy API usages in Kibana are updated */
      &:where(:not(:has(${appendPrepend}, ${buttonSelectors}))) > *,
      &:where(:not(:has(${appendPrepend}))) .euiFormLabel {
        color: ${form.textColorDisabled};
      }

      ${emptyButtonSelectors}:not(
          ${euiDisabledSelector}
        ) {
        background-color: ${form.backgroundColor};
      }
    `,
    readOnly: css`
      background-color: ${form.backgroundDisabledColor};

      ${emptyButtonSelectors}:not(
          ${euiDisabledSelector}
        ) {
        background-color: ${form.backgroundColor};
      }
    `,
  };
};
