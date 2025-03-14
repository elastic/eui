/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { euiShadowMedium } from '@elastic/eui-theme-common';

import { logicalCSS } from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiDatePickerRangeStyles = {
  euiDatePickerRange: css`
    /* Needed for correct focus/invalid underline/linear-gradient styles */
    .euiPopover,
    .react-datepicker__input-container,
    .euiDatePicker {
      ${logicalCSS('height', '100%')}
    }

    /* Needed for the fullWidth prop: makes inputs take the whole available space */
    .euiPopover {
      flex: 1;
    }
  `,
};

export const euiDatePickerRangeInlineStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  // Use a container query to stack date pickers vertically if the container is
  // not wide enough to fit both. We need a fn for this to render two width queries,
  // depending on whether time selection is being rendered or not
  const containerQuery = (
    datePickerWidth: number,
    delimiterWidth: number = 16
  ) => `
    display: block;
    container-type: inline-size;

    .euiFormControlLayout__childrenWrapper {
      /* Use static px widths for now, since render behavior comes from a third party library */
      @container (max-width: ${datePickerWidth * 2 + delimiterWidth}px) {
        /* Unset grid display */
        display: block !important;

        /* Center and point the default delimiter arrow downwards */
        .euiFormControlLayoutDelimited__delimiter .euiIcon {
          transform: rotate(90deg);
          margin-inline: auto;
        }
      }
    }`;

  return {
    euiDatePickerRangeInline: css`
      .euiFormControlLayoutDelimited {
        /* Reset form control styling */
        ${logicalCSS('height', 'auto')}
        ${logicalCSS('width', 'fit-content')}
        ${logicalCSS('max-width', '100%')}
        border: none;
        padding: 0;

        .euiFormControlLayout__childrenWrapper {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          grid-template-rows: auto;
          align-items: stretch;
          background-color: transparent;
        }

        /* Display form control icons below both date pickers */
        .euiFormControlLayoutIcons {
          justify-content: center;
          grid-column: 1 / span 3;
          ${logicalCSS('height', 'auto')}
          ${logicalCSS('padding-bottom', euiTheme.size.s)}
        }
      }

      /* Make sure the inline date picker sets its absolute positioning based off the correct parent */
      .react-datepicker {
        position: relative;
      }
    `,
    responsive: css`
      ${containerQuery(268)}
    `,
    responsiveWithTimeSelect: css`
      ${containerQuery(374)}
    `,
    shadow: css`
      .euiFormControlLayoutDelimited {
        ${euiShadowMedium(euiThemeContext, {
          borderAllInHighContrastMode: true,
        })}
      }
    `,

    // Applied directly to EuiFormControlLayout so we can check if `disabled`
    // and allow the disabled background-color to take precedence
    formLayout: {
      noShadow: css`
        background-color: transparent;
      `,
      shadow: css`
        background-color: ${euiTheme.colors.emptyShade};
      `,
    },
  };
};
