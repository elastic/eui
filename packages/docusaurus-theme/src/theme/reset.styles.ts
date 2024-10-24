/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { UseEuiTheme, euiFocusRing } from '@elastic/eui';
import { css } from '@emotion/react';

export const getResetStyles = (theme: UseEuiTheme) => {
  const { euiTheme } = theme;

  return css`
    button {
      background: none;
      border: none;
      padding: 0;
      margin: 0;
      color: inherit;
      border-radius: 0;
      font-size: inherit;
      font-family: inherit;
    }

    input,
    textarea,
    select {
      font-size: 1rem; // Inherit from html root
      font-family: inherit;
    }

    dd {
      margin: 0;
    }

    figure {
      margin: 0;
    }

    ul, ol {
      list-style: none;
    }

    * {
      ${euiFocusRing(theme, 'outset', { color: euiTheme.colors.primary })};
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: none;
      vertical-align: baseline;
    }
  `;
};
