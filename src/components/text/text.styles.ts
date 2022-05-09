/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { css } from '@emotion/react';
import { UseEuiTheme } from '../../services';

import { euiLinkCSS } from '../link/link.styles';
import { euiTitle } from '../title/title.styles';

export const euiTextConstrainedMaxWidth = '36em';

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

/**
 * Styles
 */
export const euiTextStyles = ({ euiTheme }: UseEuiTheme) => ({
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
      margin-left: auto;
      margin-right: auto;
      font-family: Georgia, Times, Times New Roman, serif;
      font-style: italic;
      letter-spacing: normal;

      p:last-child {
        margin-bottom: 0;
      }

      &:before,
      &:after {
        position: absolute;
        content: '';
        height: 2px;
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

    pre {
      white-space: pre-wrap;
      background: ${euiTheme.colors
        .lightestShade}; // TODO: $euiCodeBlockBackgroundColor - switch to var once EuiCode is converted
      color: ${euiTheme.colors
        .text}; // TODO: $euiCodeBlockColor - switch to var once EuiCode is converted
    }

    pre,
    pre code {
      display: block;
    }

    code {
      // TODO: Use euiCodeFont mixin once EuiCode is converted
      font-family: ${euiTheme.font.familyCode};
      letter-spacing: normal;
    }

    > :last-child,
    .euiTextColor > :last-child {
      margin-bottom: 0 !important;
    }
  `,
  constrainedWidth: css`
    max-width: ${euiTextConstrainedMaxWidth};
    // If the max-width is way too short of the width of the container,
    // at least make it 2/3 of its parent
    min-width: 75%;
  `,
});
