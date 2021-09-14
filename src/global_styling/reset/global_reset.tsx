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
import { useEuiFont } from '../mixins/_typography';
import { shade, tint, transparentize } from '../../services/color';
import { useEuiTheme, isDefaultTheme } from '../../services/theme';

export const EuiGlobalReset = () => {
  const {
    euiTheme: { base, colors, font, size, themeName },
    colorMode,
  } = useEuiTheme();
  const defaultTheme = isDefaultTheme(themeName);
  const euiFont = useEuiFont();

  const hacks = css`
    // Chrome has an issue around RTL languages in SVGs when letter-spacing is negative
    // https://bugs.chromium.org/p/chromium/issues/detail?id=966480
    svg text {
      letter-spacing: normal !important; // sass-lint:disable-line no-important
    }
  `;

  const scrollbarStyles = useScrollBar({
    trackBackgroundColor:
      colorMode === 'LIGHT'
        ? shade(colors.body, 0.03)
        : tint(colors.body, 0.07),
    width: 'thick',
  });
  const scrollbar = css`
    // Declaring the top level scrollbar colors to match the theme also requires setting the sizes on Chrome
    // so that it knows to use custom styles. Therefore, we just reuse the same scrollbar mixin with thick size.
    html {
      ${scrollbarStyles}
    }
  `;

  const reset = css`
    /**
     * Adapted from Eric Meyer's reset (http://meyerweb.com/eric/tools/css/reset/, v2.0 | 20110126).
     *
     */

    *,
    *:before,
    *:after {
      box-sizing: border-box;
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
      font-family: ${font.family};
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
      // @include euiFont;
      ${euiFont}
      // font-size: $euiFontSize;
      font-size: ${defaultTheme ? size.base : `${base - 2}px`};
      color: ${colors.text};
      height: 100%;
      background-color: ${colors.body};
    }

    body {
      // line-height: $euiBodyLineHeight;
      line-height: ${defaultTheme ? '1' : '1.142857143'};
    }

    ${defaultTheme
      ? `
    *:focus {
      outline: none;

      // Disables border that shows up when tabbing in Firefox.
      &::-moz-focus-inner {
        border: none;
      }

      &:-moz-focusring {
        outline: none;
      }
    }`
      : `
    *:focus {
      // 👉 Safari and Firefox innately respect only showing the outline with keyboard only
      // 💔 But they don't allow coloring of the 'auto'/default outline, so contrast is no good in dark mode.
      // 👉 For these browsers we use the solid type in order to match with \`currentColor\`.
      // 😦 Which does means the outline will be square
      // outline: $euiFocusRingSize solid currentColor;
      outline: 2px solid currentColor;
      // outline-offset: -($euiFocusRingSize / 2);
      outline-offset: calc((2px / 2) * -1);

      // 👀 Chrome respects :focus-visible and allows coloring the \`auto\` style
      &:focus-visible {
        outline-style: auto;
      }

      //🙅‍♀️ But Chrome also needs to have the outline forcefully removed from regular \`:focus\` state
      &:not(:focus-visible) {
        outline: none;
      }
    }`}

    ${!defaultTheme &&
    `
    // Dark mode's highlighted doesn't work well so lets just set it the same as our focus background
    ::selection {
      // background: $euiFocusBackgroundColor;
      background: ${transparentize(
        colors.primary,
        colorMode === 'LIGHT' ? 0.1 : 0.2
      )}
    }
    `}

    a {
      text-decoration: none;
      color: ${colors.primary};

      &:hover {
        text-decoration: none;
      }

      &:focus {
        text-decoration: none;
        ${defaultTheme && 'outline: none;'}
      }
    }

    a:hover,
    button,
    [role='button'] {
      cursor: pointer;
    }

    input {
      margin: 0;
      padding: 0;

      &:disabled {
        opacity: 1; /* required on iOS */
      }
    }

    button {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      ${defaultTheme && 'outline: none;'}
      font-size: inherit;
      color: inherit;
      border-radius: 0;

      &:hover {
        cursor: pointer;
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
      content: none;
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
  `;
  return <Global styles={[reset, hacks, scrollbar]} />;
};
