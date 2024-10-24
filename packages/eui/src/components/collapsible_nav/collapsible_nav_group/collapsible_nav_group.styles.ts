/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../../services';
import { logicalCSS } from '../../../global_styling';

export const euiCollapsibleNavGroupStyles = ({ euiTheme }: UseEuiTheme) => {
  return {
    euiCollapsibleNavGroup: css`
      &:not(:first-child) {
        ${logicalCSS('border-top', euiTheme.border.thin)}
      }
    `,
    // Background colors
    none: css``,
    light: css`
      background-color: ${euiTheme.components.collapsibleNavGroupBackground};
    `,
    dark: css`
      background-color: ${euiTheme.components
        .collapsibleNavGroupBackgroundDark};

      .euiCollapsibleNavGroup__title,
      .euiCollapsibleNavGroup__heading,
      .euiAccordion__arrow {
        color: ${euiTheme.colors.ghost};
      }
    `,
    // Header padding
    isCollapsible: css`
      /* This class does not accept a custom className */
      .euiAccordion__triggerWrapper {
        padding: ${euiTheme.size.base};
      }
    `,
    notCollapsible: css`
      /* If the heading is not in an accordion, it needs the padding */
      .euiCollapsibleNavGroup__heading {
        padding: ${euiTheme.size.base};
      }
    `,
    // Children padding
    childrenWrapper: {
      euiCollapsibleNavGroup__children: css`
        padding: ${euiTheme.size.s};
      `,
      withHeading: css`
        ${logicalCSS('padding-top', 0)}
      `,
    },
  };
};
