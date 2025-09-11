/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* TODO: move to a shared module package */

/**
 * Calculates the `px` value based on a scale multiplier
 * @param scale - The font scale multiplier
 * *
 * @param themeOrBase - Theme base value
 * *
 * @returns string - Rem unit aligned to baseline
 */

export const sizeToPixel =
  (scale: number = 1) =>
  (themeOrBase: number | { base: number; fontBase?: number; [key: string]: any }) => {
    const base =
      typeof themeOrBase === 'object' ? themeOrBase.base : themeOrBase;
    return `${base * scale}px`;
  };

/**
 * Wrapper for sizeToPixel that works with EuiThemeComputed
 * Extracts the base value from the theme object
 */
export const sizeToPixelFromTheme =
  (scale: number = 1) =>
  (theme: { base: number | { base: number; fontBase?: number } }) => {
    const base = typeof theme.base === 'object' ? theme.base.base : theme.base;
    return `${base * scale}px`;
  };

/**
 * Calculates the `px` value for typography based on a scale multiplier
 * Uses fontBase if available, otherwise falls back to base
 * @param scale - The font scale multiplier
 * @param themeOrBase - Theme base value (number or object with base/fontBase)
 * @returns string - Pixel value for typography
 */
export const fontSizeToPixel =
  (scale: number = 1) =>
  (themeOrBase: number | { base: number; fontBase?: number; [key: string]: any }) => {
    if (typeof themeOrBase === 'object') {
      const fontBase = themeOrBase.fontBase || themeOrBase.base;
      return `${fontBase * scale}px`;
    }
    return `${themeOrBase * scale}px`;
  };

/**
 * Helper function to extract the base value from theme base
 * @param base - Theme base value (number or object with base/fontBase)
 * @returns number - The base value for spacing calculations
 */
export const getBaseValue = (base: number | { base: number; fontBase?: number }): number => {
  return typeof base === 'object' ? base.base : base;
};
