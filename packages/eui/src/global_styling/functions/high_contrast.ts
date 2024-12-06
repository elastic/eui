/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { UseEuiTheme } from '../../services';

// NOTE: These functions are not being published as top-level EUI exports
// until high contrast mode is out of beta.

/**
 * Minor syntactical sugar for conditional high contrast styles.
 * Ternaries are otherwise somewhat ugly in css`` template literals,
 * and this makes life just a little more beautiful ✨
 */
export const highContrastModeStyles = (
  euiThemeContext: UseEuiTheme,
  options: {
    /** Default styles to render (no high contrast mode) */
    none?: string;
    /** Styles to render when high contrast mode is preferred or forced */
    preferred?: string;
    /** Styles to render when high contrast mode is being forced */
    forced?: string;
  }
) => {
  const { highContrastMode } = euiThemeContext;
  const {
    none: defaultStyles = '',
    preferred: highContrastStyles = '',
    forced: forcedColorsStyles = '',
  } = options;

  if (highContrastMode) {
    if (highContrastMode === 'forced') {
      // Assume preferred high contrast styles should also apply to forced contrast styles
      return highContrastStyles.trim() + forcedColorsStyles.trim();
    }

    if (!highContrastStyles && forcedColorsStyles && defaultStyles) {
      // If only forced styles were passed, assume we can use default styles for preferred high contrast
      return defaultStyles.trim();
    }

    return highContrastStyles.trim();
  }
  return defaultStyles.trim();
};

/**
 * Small uitility that allows component styles to ignore/override
 * forced colors modes (primarily Windows high contrast themes)
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/forced-color-adjust
 *
 * WARNING: Do *not* use this utility unless:
 * 1. Colors/backgrounds are **essential** to the semantic meaning of the UI,
 *    and users will lose all meaning without them
 * 2. Tweaks have been made to existing styles to increase color contrast
 *    as necessary
 */
export const preventForcedColors = ({ highContrastMode }: UseEuiTheme) =>
  highContrastMode === 'forced' ? 'forced-color-adjust: none;' : '';
