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
  const { fontSize, lineHeight } = euiFontSize(euiTheme, 'm', options);
  const { measurement } = options;
  const lineHeightSize = measurement === 'em' ? `${lineHeight}em` : lineHeight;

  // Custom scales
  const tablePaddingVertical = mathWithUnits(fontSize, (x) => x / 4);
  const tablePaddingHorizontal = mathWithUnits(fontSize, (x) => x / 2);

  return `
    .euiCheckbox .euiCheckbox__input ~ .euiCheckbox__label { // Extra specificity necessary to override default checkbox CSS
      font-size: ${fontSize};
      ${logicalCSS('padding-left', lineHeightSize)}
      line-height: ${lineHeight};
    }

    .euiCheckbox + *:not(.euiCheckbox) {
      ${logicalCSS('margin-top', fontSize)}
    }

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

/**
 * Styles
 */
export const euiMarkdownFormatStyles = (euiTheme: UseEuiTheme) => ({
  // TODO: Remaining _markdown_format.scss styles
  euiMarkdownFormat: css``,
  // Text sizes
  m: css`
    ${euiScaleMarkdownFormatText(euiTheme, {
      measurement: 'rem',
      customScale: 'm',
    })}
  `,
  s: css`
    ${euiScaleMarkdownFormatText(euiTheme, {
      measurement: 'rem',
      customScale: 's',
    })}
  `,
  xs: css`
    ${euiScaleMarkdownFormatText(euiTheme, {
      measurement: 'rem',
      customScale: 'xs',
    })}
  `,
  relative: css`
    ${euiScaleMarkdownFormatText(euiTheme, {
      measurement: 'em',
    })}
  `,
});
