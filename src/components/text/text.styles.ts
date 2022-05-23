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
  euiBackgroundColor,
  _FontScaleOptions,
} from '../../global_styling';

import { euiLinkCSS } from '../link/link.styles';
import { euiTitle } from '../title/title.styles';

/**
 * TODO: Make this a global value so it can be set by theme?
 */
export const euiTextConstrainedMaxWidth = 'max(64ch, 75%)';

/**
 * Mixins
 */
export const euiText = (
  euiTheme: UseEuiTheme['euiTheme'],
  inheritColor = false
) => {
  return {
    color: inheritColor ? 'inherit' : euiTheme.colors.text,
    fontWeight: euiTheme.font.weight.regular,
  };
};

// Internal utility for EuiText scales/sizes
const euiScaleText = (
  euiTheme: UseEuiTheme['euiTheme'],
  options: _FontScaleOptions
) => {
  const { fontSize, lineHeight } = euiFontSize('m', euiTheme, options);
  const { measurement, customScale: _customScale } = options;
  const lineHeightSize = measurement === 'em' ? `${lineHeight}em` : lineHeight;

  const headings = {
    h1: euiTitle('l', euiTheme, options),
    h2: euiTitle('m', euiTheme, options),
    h3: euiTitle('s', euiTheme, options),
    h4: euiTitle('xs', euiTheme, options),
    h5: euiTitle('xxs', euiTheme, options),
    h6: euiTitle('xxxs', euiTheme, options),
  };
  // Generate margins for headings based on customScale (not on heading level)
  const customScale = _customScale === 'xxxs' ? 'xxs' : _customScale || 'm';
  const headingMarginTop = `${parseFloat(euiTheme.size[customScale]) * 2}px`;
  const headingMarginBottom = euiTheme.size[customScale];

  return `
    font-size: ${fontSize};
    line-height: ${lineHeight};

    h1 {
      font-size: ${headings.h1.fontSize};
      line-height: ${headings.h1.lineHeight};
    }
    h1:not(:last-child) {
      ${logicalCSS('margin-bottom', headingMarginBottom)}
    }

    h2 {
      font-size: ${headings.h2.fontSize};
      line-height: ${headings.h2.lineHeight};

      &:not(:first-child) {
        ${logicalCSS('margin-top', headingMarginTop)}
      }

      &:not(:last-child) {
        ${logicalCSS('margin-bottom', headingMarginBottom)}
      }
    }

    h3 {
      font-size: ${headings.h3.fontSize};
      line-height: ${headings.h3.lineHeight};

      &:not(:first-child) {
        ${logicalCSS('margin-top', headingMarginTop)}
      }

      &:not(:last-child) {
        ${logicalCSS('margin-bottom', headingMarginBottom)}
      }
    }

    h4 {
      font-size: ${headings.h4.fontSize};
      line-height: ${headings.h4.lineHeight};

      &:not(:first-child) {
        ${logicalCSS('margin-top', headingMarginTop)}
      }

      &:not(:last-child) {
        ${logicalCSS('margin-bottom', headingMarginBottom)}
      }
    }

    h5 {
      font-size: ${headings.h5.fontSize};
      line-height: ${headings.h5.lineHeight};

      &:not(:first-child) {
        ${logicalCSS('margin-top', headingMarginTop)}
      }

      &:not(:last-child) {
        ${logicalCSS('margin-bottom', headingMarginBottom)}
      }
    }

    h6 {
      font-size: ${headings.h6.fontSize};
      line-height: ${headings.h6.lineHeight};

      &:not(:first-child) {
        ${logicalCSS('margin-top', headingMarginTop)}
      }

      &:not(:last-child) {
        ${logicalCSS('margin-bottom', headingMarginBottom)}
      }
    }

    p,
    ul,
    ol,
    dl,
    blockquote,
    img,
    pre {
      ${logicalCSS('margin-bottom', lineHeightSize)}
    }

    ul,
    ol {
      ${logicalCSS('margin-left', lineHeightSize)}
    }
  
    blockquote {
      font-size: ${fontSize};
      padding: ${lineHeightSize};
    }

    dd + dt {
      ${logicalCSS('margin-top', fontSize)}
    }

    dt,
    .eui-definitionListReverse dd {
      font-size: ${fontSize};
      line-height: ${lineHeight};
    }

    .eui-definitionListReverse dt {
      font-size: ${euiFontSize('xs', euiTheme, options).fontSize};
      color: ${euiTheme.colors.text};
    }

    small {
      font-size: ${euiFontSize('s', euiTheme, options).fontSize};
    }

    pre:not(.euiCodeBlock__pre) {
      padding: ${lineHeightSize};
    }

    code:not(.euiCode):not(.euiCodeBlock__code)  {
      font-size: .9em; // 90% of parent font size
    }
  `;
};

/**
 * Styles
 */
export const euiTextStyles = (euiThemeContext: UseEuiTheme) => {
  const { euiTheme } = euiThemeContext;

  return {
    euiText: css`
      ${euiText(euiTheme, true)};

      // EuiImage with floats are often used within EuiText.
      clear: both;

      // Style anchors that don't have a class. This prevents overwriting "buttons"
      // and other stylized elements passed in.
      a:not([class]) {
        ${euiLinkCSS(euiTheme)}
      }

      img {
        display: block;
        width: 100%;
      }

      ul {
        list-style: disc;
      }

      ol {
        list-style: decimal;
      }

      blockquote:not(.euiMarkdownFormat__blockquote) {
        position: relative;
        text-align: center;
        ${logicalCSS('margin-horizontal', 'auto')}
        font-family: ${euiTheme.font.familySerif};
        font-style: italic;
        letter-spacing: normal;

        p:last-child {
          margin-bottom: 0;
        }

        &:before,
        &:after {
          position: absolute;
          content: '';
          height: ${euiTheme.border.width.thick};
          width: 50%;
          right: 0;
          transform: translateX(-50%);
          background: ${euiTheme.colors.darkShade};
        }

        &:before {
          top: 0;
        }

        &:after {
          bottom: 0;
        }
      }

      h1 {
        ${euiTitle('l', euiTheme)}
      }

      h2 {
        ${euiTitle('m', euiTheme)}
      }

      h3 {
        ${euiTitle('s', euiTheme)}
      }

      h4,
      dt {
        ${euiTitle('xs', euiTheme)}
      }

      h5 {
        ${euiTitle('xxs', euiTheme)}
      }

      h6 {
        ${euiTitle('xxxs', euiTheme)}
        text-transform: uppercase;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      dt {
        color: inherit;
      }

      pre:not(.euiCodeBlock__pre) {
        white-space: pre-wrap;
        background: ${euiBackgroundColor(
          'subdued',
          euiThemeContext
        )}; // TODO: $euiCodeBlockBackgroundColor - switch to var once EuiCode is converted
        color: ${euiTheme.colors
          .text}; // TODO: $euiCodeBlockColor - switch to var once EuiCode is converted
      }

      pre:not(.euiCodeBlock__pre),
      pre:not(.euiCodeBlock__pre) code {
        display: block;
      }

      > :last-child {
        margin-bottom: 0 !important;
      }
    `,
    constrainedWidth: css`
      max-width: ${euiTextConstrainedMaxWidth};
    `,
    // Sizes
    m: css`
      ${euiScaleText(euiTheme, {
        measurement: 'rem',
        customScale: 'm',
      })}
    `,
    s: css`
      ${euiScaleText(euiTheme, {
        measurement: 'rem',
        customScale: 's',
      })}
    `,
    xs: css`
      ${euiScaleText(euiTheme, {
        measurement: 'rem',
        customScale: 'xs',
      })}
    `,
    relative: css`
      ${euiScaleText(euiTheme, {
        measurement: 'em',
      })}
    `,
  };
};
