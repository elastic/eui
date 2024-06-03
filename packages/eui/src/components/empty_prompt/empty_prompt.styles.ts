/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import {
  euiBreakpoint,
  euiPaddingSize,
  euiBorderColor,
  logicalCSS,
  mathWithUnits,
} from '../../global_styling';
import { UseEuiTheme } from '../../services';

export const euiEmptyPromptStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  const iconMaxWidth = mathWithUnits(euiTheme.size.l, (x) => x * 15);

  const generatePaddingStyles = (property = 'padding') => ({
    none: null,
    s: css`
      ${property}: ${euiPaddingSize(euiThemeContext, 's')}
    `,
    m: css`
      ${property}: ${euiPaddingSize(euiThemeContext, 'm')}
    `,
    l: css`
      ${property}: ${euiPaddingSize(euiThemeContext, 'l')}
    `,
  });

  const generateFooterBorder = (color: Parameters<typeof euiBorderColor>[1]) =>
    `${euiTheme.border.width.thin} solid ${euiBorderColor(
      euiThemeContext,
      color
    )}`;

  return {
    euiEmptyPrompt: css`
      text-align: center;
      margin: auto;

      ${euiBreakpoint(euiThemeContext, ['l', 'xl'])} {
        /* the width becomes as wide as necessary to contain all of its contents */
        ${logicalCSS('max-width', 'max-content')}
      }
    `,
    vertical: css``,
    horizontal: css`
      ${euiBreakpoint(euiThemeContext, ['l', 'xl'])} {
        justify-content: flex-start;
        text-align: start;
      }
    `,
    main: {
      euiEmptyPrompt__main: css`
        display: flex;
        flex-direction: column;
      `,
      vertical: css`
        justify-content: center;
      `,
      horizontal: css`
        align-items: center;

        ${euiBreakpoint(euiThemeContext, ['l', 'xl'])} {
          flex-direction: row-reverse;
        }
      `,
      ...generatePaddingStyles(),
      horizontalPadding: generatePaddingStyles('gap'),
    },
    content: {
      euiEmptyPrompt__content: css`
        ${logicalCSS('max-width', '36em')}
      `,
      vertical: css`
        margin: auto;
      `,
      horizontal: css`
        ${euiBreakpoint(euiThemeContext, ['l', 'xl'])} {
          padding-block: ${euiTheme.size.l};
          padding-inline: 0;
        }
      `,
    },
    icon: {
      euiEmptyPrompt__icon: css`
        ${logicalCSS('max-width', iconMaxWidth)}
        margin: auto;

        /* Consumers should use an EuiImage (recommended) with the horizontal layout
         * But they can use for example an img or other react node */
        & > * {
          flex-shrink: 1;
          ${logicalCSS('max-width', '100%')}
        }
      `,
      vertical: css`
        ${logicalCSS('margin-bottom', euiTheme.size.base)}
      `,
      horizontal: css`
        ${euiBreakpoint(euiThemeContext, ['l', 'xl'])} {
          ${logicalCSS('min-width', '40%')}
          ${logicalCSS('max-width', '50%')}

          /* I'm not totally sure why setting a percentage max width on the wrapper and a static
             max-width on the underlying image/icon makes sense, but this ports over the previous Sass
             styles as-is to avoid UI changes/regressions 🤷 */
          /* Note: The extra && selector specificity is there to override euiImageWrapper's CSS */
          && > * {
            ${logicalCSS('max-width', iconMaxWidth)}
          }
        }
      `,
    },
    actions: {
      euiEmptyPrompt__actions: css``,
      vertical: css``,
      horizontal: css`
        ${euiBreakpoint(euiThemeContext, ['l', 'xl'])} {
          justify-content: flex-start;
        }
      `,
    },
    footer: {
      euiEmptyPrompt__footer: css`
        /* Round bottom corners only */
        border-end-end-radius: inherit;
        border-end-start-radius: inherit;
      `,
      roundedBorders: css`
        /* Round all corners */
        border-radius: inherit;
      `,
      // Colors
      transparent: css`
        background-color: ${euiTheme.colors.body};
      `,
      plain: css`
        background-color: ${euiTheme.colors.body};
      `,
      subdued: css`
        ${logicalCSS('border-top', generateFooterBorder('subdued'))}
      `,
      primary: css`
        ${logicalCSS('border-top', generateFooterBorder('primary'))}
      `,
      accent: css`
        ${logicalCSS('border-top', generateFooterBorder('accent'))}
      `,
      danger: css`
        ${logicalCSS('border-top', generateFooterBorder('danger'))}
      `,
      warning: css`
        ${logicalCSS('border-top', generateFooterBorder('warning'))}
      `,
      success: css`
        ${logicalCSS('border-top', generateFooterBorder('success'))}
      `,
      ...generatePaddingStyles(),
    },
  };
};
