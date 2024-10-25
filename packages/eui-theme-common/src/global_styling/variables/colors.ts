/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { ColorModeSwitch, StrictColorModeSwitch } from '../types';

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
   * Secondary attention indicator with lower priority.
   */
  accentSecondary: ColorModeSwitch;
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
   * @deprecated - use `textPrimary` instead
   */
  primaryText: ColorModeSwitch;
  /**
   * Typically computed against `colors.accent`
   * @deprecated - use `textAccent` instead
   */
  accentText: ColorModeSwitch;
  /**
   * Typically computed against `colors.success`
   * @deprecated - use `textSuccess` instead
   */
  successText: ColorModeSwitch;
  /**
   * Typically computed against `colors.warning`
   * @deprecated - use `textWarning` instead
   */
  warningText: ColorModeSwitch;
  /**
   * Typically computed against `colors.danger`
   * @deprecated - use `textDanger` instead
   */
  dangerText: ColorModeSwitch;

  textPrimary: ColorModeSwitch;
  textAccent: ColorModeSwitch;
  textAccentSecondary: ColorModeSwitch;
  textSuccess: ColorModeSwitch;
  textWarning: ColorModeSwitch;
  textDanger: ColorModeSwitch;
};

export type _EuiThemeShadeColors = {
  /**
   * Used as the background color of primary **page content and panels** including modals and flyouts.
   * @deprecated - use `white`
   */
  emptyShade: ColorModeSwitch;
  /**
   * Used to lightly shade areas that contain **secondary content** or contain panel-like components.
   * @deprecated - use specific semantic color tokens instead
   */
  lightestShade: ColorModeSwitch;
  /**
   * Used for most **borders** and dividers (horizontal rules).
   * @deprecated - use specific semantic color tokens instead
   */
  lightShade: ColorModeSwitch;
  /**
   * The middle gray for all themes; this is the base for `colors.subdued`.
   * @deprecated - use specific semantic color tokens instead
   */
  mediumShade: ColorModeSwitch;
  /**
   * Slightly subtle graphic color
   * @deprecated - use specific semantic color tokens instead
   */
  darkShade: ColorModeSwitch;
  /**
   * Used as the **text** color and the background color for **inverted components** like tooltips and the control bar.
   * @deprecated - use specific semantic color tokens instead
   */
  darkestShade: ColorModeSwitch;
  /**
   * The opposite of `emptyShade`
   * @deprecated - use`black`
   */
  fullShade: ColorModeSwitch;
};

export type _EuiThemeTextColors = {
  /**
   * Computed against `colors.darkestShade`
   * @deprecated - use `textParagraph` instead
   */
  text: ColorModeSwitch;
  /**
   * Computed against `colors.text`
   * @deprecated - use `textHeading` instead
   */
  title: ColorModeSwitch;
  /**
   * Computed against `colors.mediumShade`
   * @deprecated - use `textSubdued` instead
   */
  subduedText: ColorModeSwitch;
  /**
   * Computed against `colors.primaryText`
   */
  link: ColorModeSwitch;

  textParagraph: ColorModeSwitch;
  textHeading: ColorModeSwitch;
  textSubdued: ColorModeSwitch;
  textDisabled: ColorModeSwitch;
  textInverse: ColorModeSwitch;
};

export type _EuiThemeSpecialColors = {
  /**
   * The background color for the **whole window (body)** and is a computed value of `colors.lightestShade`.
   * Provides denominator (background) value for **contrast calculations**.
   * @deprecated - use backgroundPage instead
   */
  body: ColorModeSwitch;
  /**
   * Used to **highlight text** when matching against search strings
   */
  highlight: ColorModeSwitch;
  /**
   * Computed against `colors.darkestShade`
   * @deprecated - use specific semantic tokens instead (e.g. backgroundDisabled, borderDisabled etc)
   */
  disabled: ColorModeSwitch;
  /**
   * Computed against `colors.disabled`
   * @deprecated - use textDisabled instead
   */
  disabledText: ColorModeSwitch;
  /**
   * The base color for shadows that gets `transparentized`
   * at a value based on the `colorMode` and then layered.
   * @deprecated - use specific shadow tokens instead
   */
  shadow: ColorModeSwitch;
};

export type _EuiThemeBackgroundColors = {
  backgroundBasePrimary: ColorModeSwitch;
  backgroundBaseAccent: ColorModeSwitch;
  backgroundBaseAccentSecondary: ColorModeSwitch;
  backgroundBaseSuccess: ColorModeSwitch;
  backgroundBaseWarning: ColorModeSwitch;
  backgroundBaseDanger: ColorModeSwitch;
  backgroundBaseSubdued: ColorModeSwitch;
  backgroundBasePlain: ColorModeSwitch;
  backgroundBaseDisabled: ColorModeSwitch;
  backgroundBaseFormsPrepend: ColorModeSwitch;
  backgroundBaseFormsControlDisabled: ColorModeSwitch;
  backgroundBaseInteractiveHover: ColorModeSwitch;
  backgroundBaseInteractiveSelect: ColorModeSwitch;
  backgroundBaseInteractiveOverlay: ColorModeSwitch;
  backgroundBaseSkeletonEdge: ColorModeSwitch;
  backgroundBaseSkeletonMiddle: ColorModeSwitch;

  backgroundLightPrimary: ColorModeSwitch;
  backgroundLightAccent: ColorModeSwitch;
  backgroundLightAccentSecondary: ColorModeSwitch;
  backgroundLightSuccess: ColorModeSwitch;
  backgroundLightWarning: ColorModeSwitch;
  backgroundLightDanger: ColorModeSwitch;
  backgroundLightText: ColorModeSwitch;

  backgroundFilledPrimary: ColorModeSwitch;
  backgroundFilledAccent: ColorModeSwitch;
  backgroundFilledAccentSecondary: ColorModeSwitch;
  backgroundFilledSuccess: ColorModeSwitch;
  backgroundFilledWarning: ColorModeSwitch;
  backgroundFilledDanger: ColorModeSwitch;
  backgroundFilledText: ColorModeSwitch;
};

/** TODO: remove once usages are re-mapped */
export type _EuiThemeTransparentBackgroundColors = {
  /** @deprecated */
  backgroundTransparent: string;
  /** @deprecated */
  backgroundTransparentPrimary: ColorModeSwitch;
  /** @deprecated */
  backgroundTransparentAccent: ColorModeSwitch;
  /** @deprecated */
  backgroundTransparentAccentSecondary: ColorModeSwitch;
  /** @deprecated */
  backgroundTransparentSuccess: ColorModeSwitch;
  /** @deprecated */
  backgroundTransparentWarning: ColorModeSwitch;
  /** @deprecated */
  backgroundTransparentDanger: ColorModeSwitch;
  /** @deprecated */
  backgroundTransparentSubdued: ColorModeSwitch;
  /** @deprecated */
  backgroundTransparentPlain: ColorModeSwitch;
};

export type _EuiThemeBorderColors = {
  borderBasePrimary: ColorModeSwitch;
  borderBaseAccent: ColorModeSwitch;
  borderBaseAccentSecondary: ColorModeSwitch;
  borderBaseSuccess: ColorModeSwitch;
  borderBaseWarning: ColorModeSwitch;
  borderBaseDanger: ColorModeSwitch;

  borderBasePlain: ColorModeSwitch;
  borderBaseSubdued: ColorModeSwitch;
  borderBaseDisabled: ColorModeSwitch;
  borderBaseFloating: ColorModeSwitch;

  borderBaseFormsColorSwatch: ColorModeSwitch;
  borderBaseFormsControl: ColorModeSwitch;

  borderStrongPrimary: ColorModeSwitch;
  borderStrongAccent: ColorModeSwitch;
  borderStrongAccentSecondary: ColorModeSwitch;
  borderStrongSuccess: ColorModeSwitch;
  borderStrongWarning: ColorModeSwitch;
  borderStrongDanger: ColorModeSwitch;
};

export type _EuiThemeConstantColors = {
  /**
   * Purest **white**
   * @deprecated
   */
  ghost: string;
  /**
   * Purest **black**
   * @deprecated
   */
  ink: string;
};

export type _EuiThemeColorsMode = _EuiThemeBrandColors &
  _EuiThemeBrandTextColors &
  _EuiThemeShadeColors &
  _EuiThemeSpecialColors &
  _EuiThemeTextColors &
  _EuiThemeBackgroundColors &
  _EuiThemeTransparentBackgroundColors &
  _EuiThemeBorderColors;

export type _EuiThemeColors = StrictColorModeSwitch<_EuiThemeColorsMode> &
  _EuiThemeConstantColors;
