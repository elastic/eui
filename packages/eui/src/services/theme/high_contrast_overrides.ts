/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useMemo } from 'react';

import type {
  EuiThemeHighContrastMode,
  EuiThemeColorModeStandard,
  EuiThemeSystem,
  EuiThemeModifications,
} from './types';
import { getComputed } from '@elastic/eui-theme-common';

// Rather than being calculated when the theme's styles are being computed, we're bogarting the
// `modify` logic so we can ensure consumer modifications to border-color are also overriden.
// If in the future we need more complex high contrast mode logic (e.g. changing color tokens)
// we'll need to actually dive into theme/utils.ts's Computed.getValue logic at that point.
export const useHighContrastModifications = ({
  highContrastMode,
  colorMode,
  system,
  modifications,
}: {
  highContrastMode: EuiThemeHighContrastMode;
  colorMode: EuiThemeColorModeStandard;
  system: EuiThemeSystem;
  modifications: EuiThemeModifications;
}) => {
  const highContrastModifications = useMemo(() => {
    const borderColor =
      colorMode === 'DARK'
        ? system.root.colors.plainLight
        : system.root.colors.plainDark;
    const getBorderWidth = (width: 'thin' | 'thick') =>
      modifications?.border?.width?.[width] || system.root.border.width[width];

    const systemTheme = getComputed(system, {}, colorMode);

    const borderColorModifications = {
      borderBasePrimary: systemTheme.colors.textPrimary,
      borderBaseAccent: systemTheme.colors.textAccent,
      borderBaseAccentSecondary: systemTheme.colors.textAccentSecondary,
      borderBaseNeutral: systemTheme.colors.textNeutral,
      borderBaseSuccess: systemTheme.colors.textSuccess,
      borderBaseWarning: systemTheme.colors.textWarning,
      borderBaseRisk: systemTheme.colors.textRisk,
      borderBaseDanger: systemTheme.colors.textDanger,
      borderBasePlain: borderColor,
      borderBaseSubdued: borderColor,
      borderBaseProminent: borderColor,
      borderBaseDisabled: systemTheme.colors.textDisabled,
      borderBaseFloating: borderColor,
      borderStrongPrimary: systemTheme.colors.textPrimary,
      borderStrongAccent: systemTheme.colors.textAccent,
      borderStrongAccentSecondary: systemTheme.colors.textAccentSecondary,
      borderStrongNeutral: systemTheme.colors.textNeutral,
      borderStrongSuccess: systemTheme.colors.textSuccess,
      borderStrongWarning: systemTheme.colors.textWarning,
      borderStrongRisk: systemTheme.colors.textRisk,
      borderStrongDanger: systemTheme.colors.textDanger,
    };

    return {
      colors: {
        LIGHT: {
          ...borderColorModifications,
        },
        DARK: {
          ...borderColorModifications,
        },
      },
      border: {
        color: borderColor,
        thin: `${getBorderWidth('thin')} solid ${borderColor}`,
        thick: `${getBorderWidth('thick')} solid ${borderColor}`,
      },
    };
  }, [system, colorMode, modifications?.border?.width]);

  // Memoizing the object(s) returned is important for performance/referential equality
  return useMemo(() => {
    return highContrastMode
      ? { ...modifications, ...highContrastModifications }
      : modifications;
  }, [highContrastMode, modifications, highContrastModifications]);
};
