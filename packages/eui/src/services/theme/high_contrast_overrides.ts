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
    const borderColor = system.root.colors[colorMode].fullShade;
    const getBorderWidth = (width: 'thin' | 'thick') =>
      modifications?.border?.width?.[width] || system.root.border.width[width];

    return {
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
