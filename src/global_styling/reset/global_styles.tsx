/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { Global, css } from '@emotion/react';
import { euiFocusRing, euiScrollBarStyles } from '../mixins';
import { logicalCSS } from '../functions';
import { shade, tint, transparentize } from '../../services/color';
import { useEuiTheme } from '../../services/theme';
import { resetStyles as reset } from './reset';

export interface EuiGlobalStylesProps {}

export const EuiGlobalStyles = ({}: EuiGlobalStylesProps) => {
  const euiThemeContext = useEuiTheme();
  const { euiTheme, colorMode } = euiThemeContext;
  const { base, colors, font } = euiTheme;

  /**
   * Declaring the top level scrollbar colors to match the theme also requires setting the sizes on Chrome
   * so that it knows to use custom styles. Therefore, we just reuse the same scrollbar mixin with thick size.
   */
  const scrollbarStyles = euiScrollBarStyles(euiThemeContext, {
    trackColor:
      colorMode === 'LIGHT'
        ? shade(colors.body, 0.03)
        : tint(colors.body, 0.07),
    width: 'auto',
  });

  /**
   * This font reset sets all our base font/typography related properties
   * that are needed to override browser-specific element settings.
   */
  const fontReset = `
    font-family: ${font.family};
    font-size: ${`${font.scale[font.body.scale] * base}px`};
    line-height: ${base / (font.scale[font.body.scale] * base)};
    font-weight: ${font.weight[font.body.weight]};
  `;

  /**
   * Final styles
   */
  const styles = css`
    ${reset}

    html {
      ${scrollbarStyles}
      ${fontReset}
      text-size-adjust: 100%;
      font-kerning: normal;
      ${logicalCSS('height', '100%')}
      background-color: ${colors.body};
      color: ${colors.text};
    }

    code,
    pre,
    kbd,
    samp {
      font-family: ${font.familyCode};
    }

    input,
    textarea,
    select {
      ${fontReset}
    }

    // Chrome has opinionated select:disabled opacity styles that need to be overridden
    select:disabled {
      opacity: 1;
    }

    button {
      font-family: ${font.family};
    }

    em {
      font-style: italic;
    }

    strong {
      font-weight: ${font.weight.bold};
    }

    *:focus {
      ${euiFocusRing(euiThemeContext)}
    }

    // Dark mode's highlighted doesn't work well so lets just set it the same as our focus background
    ::selection {
      background: ${transparentize(
        colors.primary,
        colorMode === 'LIGHT' ? 0.1 : 0.2
      )};
    }

    a {
      color: ${colors.primaryText};

      &,
      &:hover,
      &:focus {
        text-decoration: none;
      }
    }

    // A few EUI components (e.g. tooltip, combobox) use a portal to render content outside of the DOM hierarchy.
    // The portal content is absolutely positioned relative to the body.
    .euiBody-hasPortalContent {
      position: relative;
    }
  `;

  return <Global styles={styles} />;
};
