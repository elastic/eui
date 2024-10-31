/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';
import {
  logicalCSS,
  euiFontSize,
  _FontScaleOptions,
  mathWithUnits,
} from '../../global_styling';

/**
 * Mixins
 */
// Internal utility for text scales/sizes
const euiScaleMarkdownFormatText = (
  euiTheme: UseEuiTheme,
  options: _FontScaleOptions
) => {
  const { fontSize } = euiFontSize(euiTheme, 'm', options);

  // Custom scales
  const tablePaddingVertical = mathWithUnits(fontSize, (x) => x / 4);
  const tablePaddingHorizontal = mathWithUnits(fontSize, (x) => x / 2);

  return `
    .euiMarkdownFormat__codeblockWrapper {
      ${logicalCSS('margin-bottom', fontSize)}
    }

    .euiMarkdownFormat__table {
      ${logicalCSS('margin-bottom', fontSize)}
    }

    .euiMarkdownFormat__table th,
    .euiMarkdownFormat__table td {
      ${logicalCSS('padding-vertical', tablePaddingVertical)}
      ${logicalCSS('padding-horizontal', tablePaddingHorizontal)}
    }
  `;
};

// Internal utility for generating border colors based on EuiText colors
const euiMarkdownAdjustBorderColors = (
  { euiTheme }: UseEuiTheme,
  color: string
) => {
  const border = `${euiTheme.border.width.thin} solid ${color}`;

  return `
    .euiMarkdownFormat__blockquote {
      ${logicalCSS('border-left-color', color)}
    }

    .euiHorizontalRule {
      background-color: ${color};
      color: ${color}; /* ensure that firefox gets the currentColor */
    }

    /* Tables */

    .euiMarkdownFormat__table {
      display: block;
      ${logicalCSS('width', '100%')}
      overflow: auto;
      border-spacing: 0;
      border-collapse: collapse;
      ${logicalCSS('border-left', border)}
    }

    .euiMarkdownFormat__table th,
    .euiMarkdownFormat__table td {
      ${logicalCSS('border-vertical', border)}

      &:last-child {
        ${logicalCSS('border-right', border)}
      }
    }

    .euiMarkdownFormat__table tr {
      ${logicalCSS('border-top', border)}
    }
  `;
};

/**
 * Styles
 */
export const euiMarkdownFormatStyles = (euiTheme: UseEuiTheme) => ({
  euiMarkdownFormat: css``,
  // Text sizes
  m: css(
    euiScaleMarkdownFormatText(euiTheme, {
      customScale: 'm',
    })
  ),
  s: css(
    euiScaleMarkdownFormatText(euiTheme, {
      customScale: 's',
    })
  ),
  xs: css(
    euiScaleMarkdownFormatText(euiTheme, {
      customScale: 'xs',
    })
  ),
  relative: css(
    euiScaleMarkdownFormatText(euiTheme, {
      unit: 'em',
    })
  ),
  colors: {
    default: css(
      euiMarkdownAdjustBorderColors(
        euiTheme,
        euiTheme.euiTheme.components.markdownFormatTableBorderColor
      )
    ),
    subdued: css(
      euiMarkdownAdjustBorderColors(
        euiTheme,
        euiTheme.euiTheme.colors.subduedText
      )
    ),
    success: css(
      euiMarkdownAdjustBorderColors(euiTheme, euiTheme.euiTheme.colors.success)
    ),
    accent: css(
      euiMarkdownAdjustBorderColors(euiTheme, euiTheme.euiTheme.colors.accent)
    ),
    accentSecondary: css(
      euiMarkdownAdjustBorderColors(
        euiTheme,
        euiTheme.euiTheme.colors.accentSecondary
      )
    ),
    warning: css(
      euiMarkdownAdjustBorderColors(euiTheme, euiTheme.euiTheme.colors.warning)
    ),
    danger: css(
      euiMarkdownAdjustBorderColors(euiTheme, euiTheme.euiTheme.colors.danger)
    ),
    ghost: css(
      euiMarkdownAdjustBorderColors(euiTheme, euiTheme.euiTheme.colors.ghost)
    ),
    inherit: css(euiMarkdownAdjustBorderColors(euiTheme, 'currentColor')),
    custom: css(euiMarkdownAdjustBorderColors(euiTheme, 'currentColor')),
  },
});
