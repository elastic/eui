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

export interface EuiGlobalStylesProps {
  hasReset?: boolean;
  hasFontReset?: boolean;
  hasFont?: boolean;
  hasBase?: boolean;
  hasColor?: boolean;
  hasFocus?: boolean;
  hasLink?: boolean;
  hasScrollbar?: boolean;
}

export const EuiGlobalStyles = ({
  hasReset = true,
  hasFontReset = true,
  hasFont = true,
  hasBase = true,
  hasColor = true,
  hasFocus = true,
  hasLink = true,
  hasScrollbar = true,
}: EuiGlobalStylesProps) => {
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
  const fontBodyScale = font.scale[font.body.scale];
  const fontReset = {
    fontFamily: font.family,
    fontSize: `${
      font.defaultUnits === 'px' ? fontBodyScale * base : fontBodyScale
    }${font.defaultUnits}`,
    lineHeight: base / (fontBodyScale * base),
    fontWeight: font.weight[font.body.weight],
  };

  /**
   * Final styles
   */
  const styles = css`
    ${hasReset && reset}

    ${hasBase &&
    css`
      html {
        ${hasScrollbar && scrollbarStyles}
        ${hasFontReset && fontReset}
        text-size-adjust: 100%;
        font-kerning: normal;
        ${logicalCSS('height', '100%')}
        ${
          hasColor && {
            backgroundColor: colors.body,
            color: colors.text,
          }
        }
    `}

    ${hasFont &&
    css`
      code,
      pre,
      kbd,
      samp {
        font-family: ${font.familyCode};
      }

      input,
      textarea,
      select {
        ${hasFontReset && {
          ...fontReset,
        }}
        font-size: 1rem; // Inherit from html root
      }
    `}

    ${hasBase &&
    css`
      // Chrome has opinionated select:disabled opacity styles that need to be overridden
      select:disabled {
        opacity: 1;
      }
    `}

    ${hasFont &&
    css`
      button {
        font-family: ${font.family};
      }

      em {
        font-style: italic;
      }

      strong {
        font-weight: ${font.weight.bold};
      }
    `}

    ${hasFocus &&
    css`
      *:focus {
        ${euiFocusRing(euiThemeContext)}
      }
    `}

    ${hasColor &&
    css`
      // Dark mode's highlighted doesn't work well so lets just set it the same as our focus background
      ::selection {
        background: ${transparentize(
          colors.primary,
          colorMode === 'LIGHT' ? 0.1 : 0.2
        )};
      }
    `}

    ${hasLink &&
    css`
      a {
        ${hasColor && { color: colors.primaryText }}

        &,
        &:hover,
        &:focus {
          text-decoration: none;
        }
      }
    `}

    // A few EUI components (e.g. tooltip, combobox) use a portal to render content outside of the DOM hierarchy.
    // The portal content is absolutely positioned relative to the body.
    .euiBody-hasPortalContent {
      position: relative;
    }
  `;

  return <Global styles={styles} />;
};
