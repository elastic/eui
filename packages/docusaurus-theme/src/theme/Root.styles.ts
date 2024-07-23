/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  euiBorderColor,
  euiFontSizeFromScale,
  euiLineHeightFromBaseline,
  useEuiBackgroundColor,
  useEuiFocusRing,
  UseEuiTheme,
} from '@elastic/eui';

// override docusaurus variables as needed
// NOTE: we use define variables with style calculations here
// on the global level to reduce how often they are called
export const getGlobalStyles = (theme: UseEuiTheme) => {
  const { euiTheme } = theme;
  const { font, base, colors, size } = euiTheme;
  const fontBodyScale = font.scale[font.body.scale];
  const fontBase = {
    fontFamily: font.family,
    fontSize: `${
      font.defaultUnits === 'px' ? fontBodyScale * base : fontBodyScale
    }${font.defaultUnits}`,
    fontWeight: font.weight[font.body.weight],
  };

  const fontSizeXXL = euiFontSizeFromScale('xxl', euiTheme);
  const fontSizeXL = euiFontSizeFromScale('xl', euiTheme);
  const fontSizeL = euiFontSizeFromScale('l', euiTheme);
  const fontSizeM = euiFontSizeFromScale('m', euiTheme);
  const fontSizeS = euiFontSizeFromScale('s', euiTheme);
  const fontSizeXS = euiFontSizeFromScale('xs', euiTheme);
  const fontSizeXXS = euiFontSizeFromScale('xxs', euiTheme);

  const lineHeightXL = '1.75rem';
  const lineHeightL = euiLineHeightFromBaseline('s', euiTheme);
  const lineHeightM = '1.5rem';
  const lineHeightS = euiLineHeightFromBaseline('xs', euiTheme);
  const lineHeightXS = '1.33rem';
  const lineHeightXXS = euiLineHeightFromBaseline('xxs', euiTheme);

  return `
      // color theme related variables
      :root,
      [data-theme='dark']:root {
        /* EUI theme variables */
        --eui-background-color-primary: ${useEuiBackgroundColor('primary')};
        --eui-background-color-primary-opaque: ${useEuiBackgroundColor('primary', { method: 'opaque' })};
        --eui-background-color-success: ${useEuiBackgroundColor('success')};
        --eui-background-color-danger: ${useEuiBackgroundColor('danger')};
        --eui-background-color-warning: ${useEuiBackgroundColor('warning')};

        --eui-color-danger-text: ${euiTheme.colors.dangerText};

        /* Docusaurus theme variables */
        --ifm-background-color: ${colors.body};
        --ifm-font-color-base: ${colors.text};
        --ifm-link-color: ${colors.link};
        --ifm-link-hover-color: ${colors.link};

        --ifm-menu-color: ${euiTheme.colors.text};
        --ifm-menu-color-background-active: ${euiTheme.colors.lightestShade};
        --ifm-menu-color-background-hover: var(--eui-background-color-primary);

        --ifm-pre-background: ${euiTheme.colors.lightestShade};
      }

      :root {
        /* EUI theme variables */
        --eui-font-size-base: ${fontBase.fontSize};
        --eui-font-size-xxl: ${fontSizeXXL};
        --eui-font-size-xl: ${fontSizeXL};
        --eui-font-size-l: ${fontSizeL};
        --eui-font-size-m: ${fontSizeM};
        --eui-font-size-s: ${fontSizeS};
        --eui-font-size-xs: ${fontSizeXS};
        --eui-font-size-xxs: ${fontSizeXXS};

        --eui-line-height-base: ${lineHeightXL};
        --eui-line-height-xl: ${lineHeightXL};
        --eui-line-height-l: ${lineHeightL};
        --eui-line-height-m: ${lineHeightM};
        --eui-line-height-s: ${lineHeightS};
        --eui-line-height-xs: ${lineHeightXS};
        --eui-line-height-xxs: ${lineHeightXXS};

        --eui-size-xs: ${euiTheme.size.xs};
        --eui-size-s: ${euiTheme.size.s};

        --eui-border-color-primary: ${euiBorderColor(theme, 'primary')};

        /* Docusaurus theme variables */
        --ifm-font-family-base: ${fontBase.fontFamily};
        --ifm-font-size-base: var(--eui-font-size-base);
        --ifm-font-weight-base: ${fontBase.fontWeight};
        --ifm-line-height-base: var(--eui-line-height-base);

        --ifm-global-radius: ${euiTheme.border.radius.small};
      }

      /* base styles & resets */
      h1, h2, h3, h4, h5, h6 {
        margin-block-start: ${size.l};
        margin-block-end: ${size.m};

        font-weight: ${font.weight.bold};
      }

      button {
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        color: inherit;
        border-radius: 0;
        font-size: inherit;
      }

      /* global styles */
      * {
        ${useEuiFocusRing('outset', euiTheme.colors.primary)};
      }
  `;
};
