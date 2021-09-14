/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { Global, css } from '@emotion/react';
import { useScrollBar } from '../mixins/_helpers';
import { shade, tint, transparentize } from '../../services/color';
import { useEuiTheme, isLegacyTheme } from '../../services/theme';

export const EuiGlobalReset = () => {
  const {
    euiTheme: { base, colors, font, size, themeName },
    colorMode,
  } = useEuiTheme();
  const legacyTheme = isLegacyTheme(themeName);

  /**
   * Declaring the top level scrollbar colors to match the theme also requires setting the sizes on Chrome
   * so that it knows to use custom styles. Therefore, we just reuse the same scrollbar mixin with thick size.
   */
  const scrollbarStyles = useScrollBar({
    trackColor:
      colorMode === 'LIGHT'
        ? shade(colors.body, 0.03)
        : tint(colors.body, 0.07),
    width: 'auto',
  });

  /**
   * This font reset sets all our base font/typography related properties
   * that are needed to override browser-specifici settings.
   */
  const fontReset = `
    font-family: ${font.family};
    font-weight: ${font.weight.regular};
    letter-spacing: ${legacyTheme ? '-.005em' : 'normal'};
    text-size-adjust: 100%;
    font-kerning: normal;
  `;

  /**
   * Outline/Focus state resets
   */
  const focusReset = () => {
    if (legacyTheme) {
      // The legacy theme simply turns off all outlines in favor of component-specific handling using box-shadow
      return `*:focus {
        outline: none;

        // Disables border that shows up when tabbing in Firefox.
        &::-moz-focus-inner {
          border: none;
        }

        &:-moz-focusring {
          outline: none;
        }
      }`;
    }

    // The latest theme utilizes `focus-visible` to turn on focus outlines.
    // But this is browser-dependend:
    // 👉 Safari and Firefox innately respect only showing the outline with keyboard only
    // 💔 But they don't allow coloring of the 'auto'/default outline, so contrast is no good in dark mode.
    // 👉 For these browsers we use the solid type in order to match with \`currentColor\`.
    // 😦 Which does means the outline will be square
    // TODO: $euiFocusRingSize & $euiFocusBackgroundColor
    return `*:focus {
      outline: 2px solid currentColor;
      outline-offset: calc((2px / 2) * -1);

      // 👀 Chrome respects :focus-visible and allows coloring the \`auto\` style
      &:focus-visible {
        outline-style: auto;
      }

      //🙅‍♀️ But Chrome also needs to have the outline forcefully removed from regular \`:focus\` state
      &:not(:focus-visible) {
        outline: none;
      }
    }

    // Dark mode's highlighted doesn't work well so lets just set it the same as our focus background
    ::selection {
      background: ${transparentize(
        colors.primary,
        colorMode === 'LIGHT' ? 0.1 : 0.2
      )}
    }`;
  };

  /**
   * Final reset
   * Adapted from Eric Meyer's reset (http://meyerweb.com/eric/tools/css/reset/, v2.0 | 20110126)
   */
  const reset = css`
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    html {
      ${scrollbarStyles}
    }

    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
      margin: 0;
      padding: 0;
      border: none;
      vertical-align: baseline;
    }

    code,
    pre,
    kbd,
    samp {
      font-family: ${font.familyCode};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
      font-family: inherit;
      font-weight: inherit;
      font-size: inherit;
    }

    input,
    textarea,
    select,
    button {
      ${fontReset}
    }

    em {
      font-style: italic;
    }

    strong {
      font-weight: ${font.weight.bold};
    }

    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
      display: block;
    }

    html {
      ${fontReset}
      // font-size: $euiFontSize;
      font-size: ${legacyTheme ? size.base : `${base - 2}px`};
      color: ${colors.text};
      height: 100%;
      background-color: ${colors.body};
    }

    body {
      // TODO: $euiBodyLineHeight;
      line-height: ${legacyTheme ? '1' : '1.142857143'};
    }

    ${focusReset()}

    a {
      color: ${colors.primaryText};

      &,
      &:hover,
      &:focus {
        text-decoration: none;
      }
    }

    a[href],
    button,
    [role='button'] {
      cursor: pointer;
    }

    button {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      font-size: inherit;
      color: inherit;
      border-radius: 0;

      &:hover {
        cursor: pointer;
      }
    }

    input {
      margin: 0;
      padding: 0;

      &:disabled {
        opacity: 1; /* required on iOS */
      }
    }

    ol,
    ul {
      list-style: none;
    }

    blockquote,
    q {
      quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
      content: '';
    }

    table {
      border-collapse: collapse;
      border-spacing: 0;
    }

    hr {
      margin: 0;
    }

    fieldset {
      min-inline-size: auto;
    }

    // Chrome has an issue around RTL languages in SVGs when letter-spacing is negative
    // https://bugs.chromium.org/p/chromium/issues/detail?id=966480
    svg text {
      letter-spacing: normal !important; // sass-lint:disable-line no-important
    }
  `;

  return <Global styles={reset} />;
};
