/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  euiFontSizeFromScale,
  euiLineHeightFromBaseline,
  UseEuiTheme,
} from '@elastic/eui';
import { css } from '@emotion/react';

// override docusaurus variables as needed
// NOTE: we use define variables with style calculations here
// on the global level to reduce how often they are called
export const getGlobalStyles = (theme: UseEuiTheme) => {
  const { euiTheme } = theme;
  const { font, base, colors, size, components } = euiTheme;
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

  const lineHeightXXL = '2rem';
  const lineHeightXL = '1.75rem';
  const lineHeightL = euiLineHeightFromBaseline('s', euiTheme);
  const lineHeightM = '1.5rem';
  const lineHeightS = euiLineHeightFromBaseline('xs', euiTheme);
  const lineHeightXS = '1.33rem';
  const lineHeightXXS = euiLineHeightFromBaseline('xxs', euiTheme);

  return css`
    // color theme related variables
    :root,
    [data-theme='dark']:root {
      /* EUI theme variables */
      --eui-background-color-primary: ${colors.backgroundBasePrimary};
      --eui-background-color-success: ${colors.backgroundBaseSuccess};
      --eui-background-color-danger: ${colors.backgroundBaseDanger};
      --eui-background-color-warning: ${colors.backgroundBaseWarning};
      --eui-background-color-accent: ${colors.backgroundBaseAccent};

      --eui-color-danger-text: ${colors.textDanger};

      /* Docusaurus theme variables */
      --ifm-background-color: ${colors.backgroundBasePlain};
      --ifm-font-color-base: ${colors.textParagraph};
      --ifm-link-color: ${colors.link};
      --ifm-link-hover-color: ${colors.link};

      --ifm-menu-color: ${colors.textParagraph};
      --ifm-menu-color-background-active: ${colors.backgroundBaseSubdued};
      --ifm-menu-color-background-hover: var(--eui-background-color-primary);

      --ifm-pre-background: ${components.codeBackground};
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
      --eui-line-height-xxl: ${lineHeightXXL};
      --eui-line-height-xl: ${lineHeightXL};
      --eui-line-height-l: ${lineHeightL};
      --eui-line-height-m: ${lineHeightM};
      --eui-line-height-s: ${lineHeightS};
      --eui-line-height-xs: ${lineHeightXS};
      --eui-line-height-xxs: ${lineHeightXXS};

      --eui-size-xs: ${size.xs};
      --eui-size-s: ${size.s};

      --eui-border-color-primary: ${colors.borderStrongPrimary};

      --eui-theme-content-vertical-spacing: ${size.base};

      /* Docusaurus theme variables */
      --ifm-font-family-base: ${fontBase.fontFamily};
      --ifm-font-size-base: var(--eui-font-size-base);
      --ifm-font-weight-base: ${fontBase.fontWeight};
      --ifm-line-height-base: var(--eui-line-height-base);

      --ifm-h1-font-size: var(--eui-font-size-xl);
      --ifm-h2-font-size: var(--eui-font-size-l);
      --ifm-h3-font-size: var(--eui-font-size-m);
      --ifm-h4-font-size: var(--eui-font-size-s);
      --ifm-h5-font-size: var(--eui-font-size-xs);
      --ifm-h6-font-size: var(--eui-font-size-xxs);

      --ifm-global-radius: ${euiTheme.border.radius.small};

      --ifm-toc-border-color: ${euiTheme.border.color};

      --doc-sidebar-width: 258px;
      --doc-sidebar-hidden-width: 30px;
    }
  `;
};
