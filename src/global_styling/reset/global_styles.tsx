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
import { useEuiTheme } from '../../services/theme';
import { resetStyles as reset } from './reset';
import { isLegacyTheme } from '../../themes';

export interface EuiGlobalStylesProps {}

export const EuiGlobalStyles = ({}: EuiGlobalStylesProps) => {
  const {
    euiTheme: { base, border, colors, font, themeName },
    colorMode,
  } = useEuiTheme();

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
   * Early return with no styles if using the legacy theme,
   * which has reset and global styles included in the compiled CSS.
   * Comes after `scrollbarStyles` because of hook rules.
   */
  if (isLegacyTheme(themeName)) {
    return null;
  }

  /**
   * This font reset sets all our base font/typography related properties
   * that are needed to override browser-specific element settings.
   */
  const fontReset = `
    font-family: ${font.family};
    font-size: ${`${font.scale[font.body.scale] * base}px`};
    line-height: ${base / (font.scale[font.body.scale] * base)};
    font-weight: ${font.weight[font.body.weight]};
    ${
      font.body.letterSpacing
        ? `letter-spacing: ${font.body.letterSpacing};`
        : ''
    }
  `;

  /**
   * Outline/Focus state resets
   */
  const focusReset = () => {
    // The latest theme utilizes `focus-visible` to turn on focus outlines.
    // But this is browser-dependend:
    // 👉 Safari and Firefox innately respect only showing the outline with keyboard only
    // 💔 But they don't allow coloring of the 'auto'/default outline, so contrast is no good in dark mode.
    // 👉 For these browsers we use the solid type in order to match with \`currentColor\`.
    // 😦 Which does means the outline will be square
    return `*:focus {
      outline: currentColor solid ${border.width.thick};
      outline-offset: calc(-(${border.width.thick} / 2) * -1);

      // 👀 Chrome respects :focus-visible and allows coloring the \`auto\` style
      &:focus-visible {
        outline-style: auto;
      }

      // 🙅‍♀️ But Chrome also needs to have the outline forcefully removed from regular \`:focus\` state
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
   * Final styles
   */
  const styles = css`
    ${reset}

    html {
      ${scrollbarStyles}
      ${fontReset}
      text-size-adjust: 100%;
      font-kerning: normal;
      height: 100%;
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

    button {
      font-family: ${font.family};
    }

    em {
      font-style: italic;
    }

    strong {
      font-weight: ${font.weight.bold};
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
  `;

  return <Global styles={styles} />;
};
