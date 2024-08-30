/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  ColorModeSwitch,
  StrictColorModeSwitch,
} from '../../services/theme/types';

/**
 * Top 5 colors
 */
export type _EuiThemeBrandColors = {
  /**
   * Main brand color and used for most **call to actions** like buttons and links.
   */
  primary: ColorModeSwitch;
  /**
   * Pulls attention to key indicators like **notifications** or number of selections.
   */
  accent: ColorModeSwitch;
  /**
   * Used for **positive** messages/graphics and additive actions.
   */
  success: ColorModeSwitch;
  /**
   * Used for **warnings** and actions that have a potential to be destructive.
   */
  warning: ColorModeSwitch;
  /**
   * Used for **negative** messages/graphics like errors and destructive actions.
   */
  danger: ColorModeSwitch;
};

/**
 * Every brand color must have a contrast computed text equivelant
 */
export type _EuiThemeBrandTextColors = {
  /**
   * Typically computed against `colors.primary`
   */
  primaryText: ColorModeSwitch;
  /**
   * Typically computed against `colors.accent`
   */
  accentText: ColorModeSwitch;
  /**
   * Typically computed against `colors.success`
   */
  successText: ColorModeSwitch;
  /**
   * Typically computed against `colors.warning`
   */
  warningText: ColorModeSwitch;
  /**
   * Typically computed against `colors.danger`
   */
  dangerText: ColorModeSwitch;
};

export type _EuiThemeShadeColors = {
  /**
   * Used as the background color of primary **page content and panels** including modals and flyouts.
   */
  emptyShade: ColorModeSwitch;
  /**
   * Used to lightly shade areas that contain **secondary content** or contain panel-like components.
   */
  lightestShade: ColorModeSwitch;
  /**
   * Used for most **borders** and dividers (horizontal rules).
   */
  lightShade: ColorModeSwitch;
  /**
   * The middle gray for all themes; this is the base for `colors.subdued`.
   */
  mediumShade: ColorModeSwitch;
  /**
   * Slightly subtle graphic color
   */
  darkShade: ColorModeSwitch;
  /**
   * Used as the **text** color and the background color for **inverted components** like tooltips and the control bar.
   */
  darkestShade: ColorModeSwitch;
  /**
   * The opposite of `emptyShade`
   */
  fullShade: ColorModeSwitch;
};

export type _EuiThemeTextColors = {
  /**
   * Computed against `colors.darkestShade`
   */
  text: ColorModeSwitch;
  /**
   * Computed against `colors.text`
   */
  title: ColorModeSwitch;
  /**
   * Computed against `colors.mediumShade`
   */
  subduedText: ColorModeSwitch;
  /**
   * Computed against `colors.primaryText`
   */
  link: ColorModeSwitch;

  textHeading: ColorModeSwitch;
  textParagraph: ColorModeSwitch;
  textSubdued: ColorModeSwitch;
  textPrimary: ColorModeSwitch;
  textAccent: ColorModeSwitch;
  textSuccess: ColorModeSwitch;
  textWarning: ColorModeSwitch;
  textDanger: ColorModeSwitch;
  textDisabled: ColorModeSwitch;
  textInverse: ColorModeSwitch;
};

export type _EuiThemeSpecialColors = {
  /**
   * The background color for the **whole window (body)** and is a computed value of `colors.lightestShade`.
   * Provides denominator (background) value for **contrast calculations**.
   */
  body: ColorModeSwitch;
  /**
   * Used to **highlight text** when matching against search strings
   */
  highlight: ColorModeSwitch;
  /**
   * Computed against `colors.darkestShade`
   */
  disabled: ColorModeSwitch;
  /**
   * Computed against `colors.disabled`
   */
  disabledText: ColorModeSwitch;
  /**
   * The base color for shadows that gets `transparentized`
   * at a value based on the `colorMode` and then layered.
   */
  shadow: ColorModeSwitch;
};

export type _EuiThemeConstantColors = {
  /**
   * Purest **white**
   */
  ghost: string;
  /**
   * Purest **black**
   */
  ink: string;
};

export type _EuiThemeSemanticMatrixColors = {
  shade10: string;
  shade15: string;
  shade20: string;
  shade25: string;
  shade30: string;
  shade35: string;
  shade40: string;
  shade45: string;
  shade50: string;
  shade55: string;
  shade60: string;
  shade65: string;
  shade70: string;
  shade75: string;
  shade80: string;
  shade85: string;
  shade90: string;
  shade95: string;
  shade100: string;
  shade105: string;
  shade110: string;
  shade115: string;
  shade120: string;
  shade125: string;
  shade130: string;
  shade135: string;
  shade140: string;
  shade145: string;

  primary10: string;
  primary20: string;
  primary30: string;
  primary40: string;
  primary50: string;
  primary60: string;
  primary70: string;
  primary80: string;
  primary90: string;
  primary100: string;
  primary110: string;
  primary120: string;
  primary130: string;
  primary140: string;

  accent10: string;
  accent20: string;
  accent30: string;
  accent40: string;
  accent50: string;
  accent60: string;
  accent70: string;
  accent80: string;
  accent90: string;
  accent100: string;
  accent110: string;
  accent120: string;
  accent130: string;
  accent140: string;

  highlight10: string;
  highlight20: string;
  highlight30: string;
  highlight40: string;
  highlight50: string;
  highlight60: string;
  highlight70: string;
  highlight80: string;
  highlight90: string;
  highlight100: string;
  highlight110: string;
  highlight120: string;
  highlight130: string;
  highlight140: string;

  success10: string;
  success20: string;
  success30: string;
  success40: string;
  success50: string;
  success60: string;
  success70: string;
  success80: string;
  success90: string;
  success100: string;
  success110: string;
  success120: string;
  success130: string;
  success140: string;

  warning10: string;
  warning20: string;
  warning30: string;
  warning40: string;
  warning50: string;
  warning60: string;
  warning70: string;
  warning80: string;
  warning90: string;
  warning100: string;
  warning110: string;
  warning120: string;
  warning130: string;
  warning140: string;

  danger10: string;
  danger20: string;
  danger30: string;
  danger40: string;
  danger50: string;
  danger60: string;
  danger70: string;
  danger80: string;
  danger90: string;
  danger100: string;
  danger110: string;
  danger120: string;
  danger130: string;
  danger140: string;
};

export type _EuiThemeSemanticColors = _EuiThemeSemanticMatrixColors & {
  plain: string;
  ink: string;
  developerBlue: string;
};

export type _EuiThemeBackgroundColors = {
  backgroundPrimary: ColorModeSwitch;
  backgroundAccent: ColorModeSwitch;
  backgroundSuccess: ColorModeSwitch;
  backgroundWarning: ColorModeSwitch;
  backgroundDanger: ColorModeSwitch;
  backgroundSubdued: ColorModeSwitch;
  backgroundPlain: ColorModeSwitch;
  backgroundDisabled: ColorModeSwitch;
};

export type _EuiThemeTransparentBackgroundColors = {
  backgroundPrimaryTransparent: ColorModeSwitch;
  backgroundAccentTransparent: ColorModeSwitch;
  backgroundSuccessTransparent: ColorModeSwitch;
  backgroundWarningTransparent: ColorModeSwitch;
  backgroundDangerTransparent: ColorModeSwitch;
  backgroundSubduedTransparent: ColorModeSwitch;
  backgroundPlainTransparent: ColorModeSwitch;
};

export type _EuiThemeBorderColors = {
  borderPrimary: ColorModeSwitch;
  borderAccent: ColorModeSwitch;
  borderSuccess: ColorModeSwitch;
  borderWarning: ColorModeSwitch;
  borderDanger: ColorModeSwitch;
  borderSubdued: ColorModeSwitch;
  borderPlain: ColorModeSwitch;
  borderDisabled: ColorModeSwitch;
  borderHollow: ColorModeSwitch;
};

export type _EuiThemeFormColors = {
  formBackground: ColorModeSwitch;
  formBackgroundDisabled: ColorModeSwitch;
  formBackgroundFocused: ColorModeSwitch;
  formBorderColor: ColorModeSwitch;
  formAppendBackground: ColorModeSwitch;
  formControlPlaceholderColor: ColorModeSwitch;
  formControlBorder: ColorModeSwitch;
  formAutofillBackground: ColorModeSwitch;
  formAutofillBorderColor: ColorModeSwitch;
};

export type _EuiThemeColorsMode = _EuiThemeBrandColors &
  _EuiThemeSemanticColors &
  _EuiThemeBrandTextColors &
  _EuiThemeShadeColors &
  _EuiThemeSpecialColors &
  _EuiThemeTextColors &
  _EuiThemeBackgroundColors &
  _EuiThemeTransparentBackgroundColors &
  _EuiThemeBorderColors &
  _EuiThemeFormColors;

export type _EuiThemeColors = StrictColorModeSwitch<_EuiThemeColorsMode> &
  _EuiThemeConstantColors;
