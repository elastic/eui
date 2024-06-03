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

export type _EuiThemeColorsMode = _EuiThemeBrandColors &
  _EuiThemeBrandTextColors &
  _EuiThemeShadeColors &
  _EuiThemeSpecialColors &
  _EuiThemeTextColors;

export type _EuiThemeColors = StrictColorModeSwitch<_EuiThemeColorsMode> &
  _EuiThemeConstantColors;
