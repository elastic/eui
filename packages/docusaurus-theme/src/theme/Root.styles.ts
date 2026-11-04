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

// override docusaurus / Infima variables as needed
// NOTE: we define variables with style calculations here
// on the global level to reduce how often they are called
export const getGlobalStyles = (theme: UseEuiTheme) => {
  const { euiTheme } = theme;
  const { font, base, colors, size, border, components, shadows } = euiTheme;
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
    // EUI colorMode already resolves light/dark token values, so the same
    // mappings apply under both :root and [data-theme='dark']:root.
    :root,
    [data-theme='dark']:root {
      /* EUI theme variables (docs chrome helpers) */
      --eui-background-color-primary: ${colors.backgroundBasePrimary};
      --eui-background-color-success: ${colors.backgroundBaseSuccess};
      --eui-background-color-danger: ${colors.backgroundBaseDanger};
      --eui-background-color-warning: ${colors.backgroundBaseWarning};
      --eui-background-color-accent: ${colors.backgroundBaseAccent};

      --eui-color-danger-text: ${colors.textDanger};

      /* —— Infima ← EUI: brand / status —— */
      --ifm-color-primary: ${colors.primary};
      --ifm-color-primary-dark: ${colors.textPrimary};
      --ifm-color-primary-darker: ${colors.textPrimary};
      --ifm-color-primary-darkest: ${colors.textPrimary};
      --ifm-color-primary-light: ${colors.backgroundLightPrimary};
      --ifm-color-primary-lighter: ${colors.backgroundBasePrimary};
      --ifm-color-primary-lightest: ${colors.backgroundBasePrimary};
      --ifm-color-primary-contrast-background: ${colors.backgroundBasePrimary};
      --ifm-color-primary-contrast-foreground: ${colors.textPrimary};

      --ifm-color-secondary: ${colors.backgroundBaseSubdued};
      --ifm-color-secondary-dark: ${colors.borderBasePlain};
      --ifm-color-secondary-darker: ${colors.borderBaseProminent};
      --ifm-color-secondary-darkest: ${colors.mediumShade};
      --ifm-color-secondary-light: ${colors.backgroundBaseSubdued};
      --ifm-color-secondary-lighter: ${colors.backgroundBasePlain};
      --ifm-color-secondary-lightest: ${colors.backgroundBasePlain};
      --ifm-color-secondary-contrast-background: ${colors.backgroundBaseSubdued};
      --ifm-color-secondary-contrast-foreground: ${colors.textParagraph};

      --ifm-color-success: ${colors.success};
      --ifm-color-success-dark: ${colors.textSuccess};
      --ifm-color-success-darker: ${colors.textSuccess};
      --ifm-color-success-darkest: ${colors.textSuccess};
      --ifm-color-success-light: ${colors.backgroundLightSuccess};
      --ifm-color-success-lighter: ${colors.backgroundBaseSuccess};
      --ifm-color-success-lightest: ${colors.backgroundBaseSuccess};
      --ifm-color-success-contrast-background: ${colors.backgroundBaseSuccess};
      --ifm-color-success-contrast-foreground: ${colors.textSuccess};

      /* POC: Infima "info" has no EUI twin — map to assistance */
      --ifm-color-info: ${colors.accentSecondary};
      --ifm-color-info-dark: ${colors.textAssistance};
      --ifm-color-info-darker: ${colors.textAssistance};
      --ifm-color-info-darkest: ${colors.textAssistance};
      --ifm-color-info-light: ${colors.backgroundLightAssistance};
      --ifm-color-info-lighter: ${colors.backgroundBaseAssistance};
      --ifm-color-info-lightest: ${colors.backgroundBaseAssistance};
      --ifm-color-info-contrast-background: ${colors.backgroundBaseAssistance};
      --ifm-color-info-contrast-foreground: ${colors.textAssistance};

      --ifm-color-warning: ${colors.warning};
      --ifm-color-warning-dark: ${colors.textWarning};
      --ifm-color-warning-darker: ${colors.textWarning};
      --ifm-color-warning-darkest: ${colors.textWarning};
      --ifm-color-warning-light: ${colors.backgroundLightWarning};
      --ifm-color-warning-lighter: ${colors.backgroundBaseWarning};
      --ifm-color-warning-lightest: ${colors.backgroundBaseWarning};
      --ifm-color-warning-contrast-background: ${colors.backgroundBaseWarning};
      --ifm-color-warning-contrast-foreground: ${colors.textWarning};

      --ifm-color-danger: ${colors.danger};
      --ifm-color-danger-dark: ${colors.textDanger};
      --ifm-color-danger-darker: ${colors.textDanger};
      --ifm-color-danger-darkest: ${colors.textDanger};
      --ifm-color-danger-light: ${colors.backgroundLightDanger};
      --ifm-color-danger-lighter: ${colors.backgroundBaseDanger};
      --ifm-color-danger-lightest: ${colors.backgroundBaseDanger};
      --ifm-color-danger-contrast-background: ${colors.backgroundBaseDanger};
      --ifm-color-danger-contrast-foreground: ${colors.textDanger};

      /* —— Infima ← EUI: emphasis / gray ladder (role-based, not 1:1 steps) —— */
      --ifm-color-white: ${colors.textInverse};
      --ifm-color-black: ${colors.textInk};

      --ifm-color-gray-0: ${colors.backgroundBasePlain};
      --ifm-color-gray-100: ${colors.backgroundBaseSubdued};
      --ifm-color-gray-200: ${colors.backgroundBaseDisabled};
      --ifm-color-gray-300: ${colors.borderBasePlain};
      --ifm-color-gray-400: ${colors.borderBaseProminent};
      --ifm-color-gray-500: ${colors.mediumShade};
      --ifm-color-gray-600: ${colors.darkShade};
      --ifm-color-gray-700: ${colors.textSubdued};
      --ifm-color-gray-800: ${colors.textParagraph};
      --ifm-color-gray-900: ${colors.textHeading};
      --ifm-color-gray-1000: ${colors.textInk};

      /* Emphasis aliases Infima gray; keep explicit so dark mode stays EUI-driven */
      --ifm-color-emphasis-0: ${colors.backgroundBasePlain};
      --ifm-color-emphasis-100: ${colors.backgroundBaseSubdued};
      --ifm-color-emphasis-200: ${colors.backgroundBaseDisabled};
      --ifm-color-emphasis-300: ${colors.borderBasePlain};
      --ifm-color-emphasis-400: ${colors.borderBaseProminent};
      --ifm-color-emphasis-500: ${colors.mediumShade};
      --ifm-color-emphasis-600: ${colors.darkShade};
      --ifm-color-emphasis-700: ${colors.textSubdued};
      --ifm-color-emphasis-800: ${colors.textParagraph};
      --ifm-color-emphasis-900: ${colors.textHeading};
      --ifm-color-emphasis-1000: ${colors.textInk};

      --ifm-color-content: ${colors.textParagraph};
      --ifm-color-content-inverse: ${colors.textInverse};
      --ifm-color-content-secondary: ${colors.textSubdued};

      /* —— Infima ← EUI: surfaces / chrome —— */
      /* POC: one step lighter than lightestShade (shade15 → shade10) */
      --ifm-background-color: ${colors.backgroundBaseSubdued};
      --ifm-background-surface-color: ${colors.backgroundBasePlain};
      --ifm-font-color-base: ${colors.textParagraph};
      --ifm-font-color-base-inverse: ${colors.textInverse};
      --ifm-font-color-secondary: ${colors.textSubdued};

      --ifm-hover-overlay: ${colors.backgroundBaseInteractiveHover};

      --ifm-link-color: ${colors.link};
      --ifm-link-hover-color: ${colors.link};

      --ifm-menu-color: ${colors.textParagraph};
      --ifm-menu-color-active: ${colors.textPrimary};
      --ifm-menu-color-background-active: ${colors.backgroundBaseInteractiveSelect};
      --ifm-menu-color-background-hover: ${colors.backgroundBaseInteractiveHover};

      --ifm-navbar-background-color: ${colors.backgroundBasePlain};
      --ifm-navbar-link-color: ${colors.textParagraph};
      --ifm-navbar-link-hover-color: ${colors.textPrimary};
      --ifm-navbar-link-active-color: ${colors.textPrimary};
      /* POC: hairline over Infima drop shadow for docs chrome */
      --ifm-navbar-shadow: none;

      --ifm-toc-border-color: ${border.color};
      --ifm-hr-background-color: ${border.color};
      --ifm-table-border-color: ${colors.borderBaseSubdued};
      --ifm-blockquote-color: ${colors.textSubdued};
      --ifm-blockquote-border-color: ${colors.borderBasePlain};

      --ifm-code-background: ${components.codeBackground};
      --ifm-pre-background: ${components.codeBackground};

      --ifm-scrollbar-track-background-color: ${colors.backgroundBaseSubdued};
      --ifm-scrollbar-thumb-background-color: ${colors.borderBaseProminent};
      --ifm-scrollbar-thumb-hover-background-color: ${colors.mediumShade};

      --ifm-breadcrumb-color-active: ${colors.textPrimary};
      --ifm-breadcrumb-item-background-active: ${colors.backgroundBaseInteractiveHover};
      --ifm-pagination-color-active: ${colors.textPrimary};
      --ifm-pagination-nav-color-hover: ${colors.textPrimary};
      --ifm-tabs-color: ${colors.textSubdued};
      --ifm-tabs-color-active: ${colors.textPrimary};
      --ifm-tabs-color-active-border: ${colors.primary};
      --ifm-dropdown-background-color: ${colors.backgroundBasePlain};
      --ifm-dropdown-link-color: ${colors.textParagraph};
      --ifm-dropdown-hover-background-color: ${colors.backgroundBaseInteractiveHover};
      --ifm-card-background-color: ${colors.backgroundBasePlain};
      --ifm-heading-color: ${colors.textHeading};

      /* Shadows: Infima vars hold raw box-shadow values */
      --ifm-global-shadow-lw: ${shadows.xs.down};
      --ifm-global-shadow-md: ${shadows.m.down};
      --ifm-global-shadow-tl: ${shadows.l.down};
      --ifm-alert-shadow: none;
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
      --eui-size-m: ${size.m};

      --eui-border-color-primary: ${colors.borderStrongPrimary};

      --eui-theme-content-vertical-spacing: ${size.base};

      /* Infima ← EUI: typography / shape (mode-independent) */
      --ifm-font-family-base: ${fontBase.fontFamily};
      --ifm-font-family-monospace: ${font.familyCode};
      --ifm-font-size-base: var(--eui-font-size-base);
      --ifm-font-weight-base: ${fontBase.fontWeight};
      --ifm-font-weight-light: ${font.weight.light};
      --ifm-font-weight-normal: ${font.weight.regular};
      --ifm-font-weight-semibold: ${font.weight.semiBold};
      --ifm-font-weight-bold: ${font.weight.bold};
      --ifm-line-height-base: var(--eui-line-height-base);

      --ifm-h1-font-size: var(--eui-font-size-xl);
      --ifm-h2-font-size: var(--eui-font-size-l);
      --ifm-h3-font-size: var(--eui-font-size-m);
      --ifm-h4-font-size: var(--eui-font-size-s);
      --ifm-h5-font-size: var(--eui-font-size-xs);
      --ifm-h6-font-size: var(--eui-font-size-xxs);
      --ifm-heading-font-family: ${fontBase.fontFamily};
      --ifm-heading-font-weight: ${font.weight.bold};

      --ifm-global-radius: ${border.radius.small};
      --ifm-global-border-width: ${border.width.thin};
      --ifm-code-border-radius: ${border.radius.inline};
      --ifm-pre-border-radius: ${border.radius.inline};
      --ifm-button-border-radius: ${border.radius.control};
      --ifm-card-border-radius: ${border.radius.panel};
      --ifm-pagination-border-radius: ${border.radius.control};
      --ifm-pagination-nav-border-radius: ${border.radius.control};
      --ifm-alert-border-radius: ${border.radius.panel};
      --ifm-badge-border-radius: ${border.radius.inline};

      --ifm-global-spacing: ${size.base};
      --ifm-spacing-vertical: ${size.base};
      --ifm-spacing-horizontal: 40px;

      /* Wider to fit panel inset (size.m) + menu without clipping active states */
      --doc-sidebar-width: 300px;
      --doc-sidebar-hidden-width: 30px;
    }
  `;
};
