/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';

import {
  UseEuiTheme,
  euiPaletteColorBlind,
  makeHighContrastColor,
} from '../../../services';
import { euiFontSize, logicalCSS } from '../../../global_styling';

export const euiSelectableTemplateSitewideStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  const visColors = euiPaletteColorBlind();

  return {
    euiSelectableTemplateSitewide: css`
      /* Override .euiSelectable flex display, which fixes the anchor positioning for mobile popoverButtons */
      display: block;
    `,

    euiSelectableTemplateSitewide__optionMetasList: css`
      display: block;
      ${euiFontSize(euiThemeContext, 'xs')}
      color: ${euiTheme.colors.textSubdued};
    `,

    euiSelectableTemplateSitewide__optionMeta: css`
      &:not(:last-of-type)::after {
        content: '•';
        ${logicalCSS('margin-horizontal', euiTheme.size.xs)}
        color: ${euiTheme.colors.textSubdued};
      }
    `,
    metaTypes: {
      fontWeight: `
        font-weight: ${euiTheme.font.weight.medium};
      `,
      application: css`
        color: ${makeHighContrastColor(visColors[1])(euiTheme)};
      `,
      deployment: css`
        color: ${makeHighContrastColor(visColors[0])(euiTheme)};
      `,
      article: css`
        color: ${makeHighContrastColor(visColors[3])(euiTheme)};
      `,
      case: css`
        color: ${makeHighContrastColor(visColors[9])(euiTheme)};
      `,
      platform: css`
        color: ${makeHighContrastColor(visColors[5])(euiTheme)};
      `,
    },
  };
};

export const euiSelectableTemplateSitewidePopoverStyles = (
  euiThemeContext: UseEuiTheme
) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiSelectableTemplateSitewide__popover: css`
      color: ${euiTheme.colors.textParagraph};
    `,
  };
};
