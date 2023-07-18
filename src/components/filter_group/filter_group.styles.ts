/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import { UseEuiTheme } from '../../services';
import { logicalCSS, euiBreakpoint } from '../../global_styling';
import { euiFormVariables } from '../form/form.styles';
import { euiFilterButtonDisplay } from './filter_button.styles';

export const euiFilterGroupStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const {
    backgroundColor,
    borderColor,
    controlBorderRadius,
    controlCompressedBorderRadius,
    controlCompressedHeight,
  } = euiFormVariables(euiThemeContext);

  return {
    euiFilterGroup: css`
      display: inline-flex;
      ${logicalCSS('max-width', '100%')}
      overflow: hidden;

      border-radius: ${controlBorderRadius};
      background-color: ${backgroundColor};
      box-shadow: inset 0 0 0 ${euiTheme.border.width.thin} ${borderColor};

      /* Account for popover or tooltip wrappers around EuiFilterButtons */
      > *:not(.euiFilterButton) {
        ${euiFilterButtonDisplay(euiThemeContext)}
      }
      /* Force popover anchors to expand */
      .euiPopover__anchor {
        display: block;

        .euiFilterButton {
          ${logicalCSS('width', '100%')}
        }
      }

      ${euiBreakpoint(euiThemeContext, ['s'])} {
        flex-wrap: wrap;
      }
      ${euiBreakpoint(euiThemeContext, ['xs'])} {
        /* Force all tiny screens to take up the entire width */
        display: flex;

        .euiFilterButton {
          flex-grow: 1;
        }
      }
    `,
    fullWidth: css`
      display: flex;
    `,
    compressed: css`
      border-radius: ${controlCompressedBorderRadius};

      .euiFilterButton {
        ${logicalCSS('height', controlCompressedHeight)}
      }
    `,
  };
};
