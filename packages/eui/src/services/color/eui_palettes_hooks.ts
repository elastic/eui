/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useMemo } from 'react';
import { useEuiTheme } from '../theme/hooks';
import {
  EuiPalette,
  euiPaletteColorBlind,
  euiPaletteColorBlindBehindText,
  EuiPaletteColorBlindProps,
  EuiPaletteCommonProps,
  euiPaletteComplementary,
  euiPaletteCool,
  euiPaletteForStatus,
  euiPaletteForTemperature,
  euiPaletteGray,
  euiPaletteGreen,
  euiPaletteOrange,
  euiPaletteRed,
  EuiPaletteRotationProps,
  euiPaletteSkyBlue,
  euiPaletteWarm,
  euiPaletteYellow,
} from './eui_palettes';

export const useEuiPaletteColorBlind = (args?: EuiPaletteColorBlindProps) => {
  return _useEuiPaletteFn(euiPaletteColorBlind, args);
};

export const useEuiPaletteColorBlindBehindText = (
  args?: EuiPaletteColorBlindProps
) => {
  return _useEuiPaletteFn(euiPaletteColorBlindBehindText, args);
};

export const useEuiPaletteForStatus = (steps: number) => {
  return _useEuiPaletteWithStepsFn(euiPaletteForStatus, steps);
};

export const useEuiPaletteForTemperature = (steps: number) => {
  return _useEuiPaletteWithStepsFn(euiPaletteForTemperature, steps);
};

export const useEuiPaletteComplementary = (steps: number) => {
  return _useEuiPaletteWithStepsFn(euiPaletteComplementary, steps);
};

export const useEuiPaletteRed = (steps: number) => {
  return _useEuiPaletteWithStepsFn(euiPaletteRed, steps);
};

export const useEuiPaletteGreen = (steps: number) => {
  return _useEuiPaletteWithStepsFn(euiPaletteGreen, steps);
};

export const useEuiPaletteSkyBlue = (steps: number) => {
  return _useEuiPaletteWithStepsFn(euiPaletteSkyBlue, steps);
};

export const useEuiPaletteYellow = (steps: number) => {
  return _useEuiPaletteWithStepsFn(euiPaletteYellow, steps);
};

export const useEuiPaletteOrange = (steps: number) => {
  return _useEuiPaletteWithStepsFn(euiPaletteOrange, steps);
};

export const useEuiPaletteCool = (steps: number) => {
  return _useEuiPaletteWithStepsFn(euiPaletteCool, steps);
};

export const useEuiPaletteWarm = (steps: number) => {
  return _useEuiPaletteWithStepsFn(euiPaletteWarm, steps);
};

export const useEuiPaletteGray = (steps: number) => {
  return _useEuiPaletteWithStepsFn(euiPaletteGray, steps);
};

/* Internal helper utils */

const _useEuiPaletteFn = (
  palleteFn: (args: EuiPaletteColorBlindProps) => EuiPalette,
  args?: EuiPaletteRotationProps
) => {
  const { euiTheme } = useEuiTheme();
  const { colors, flags } = euiTheme;

  return useMemo(() => {
    return palleteFn({
      ...args,
      colors: colors.vis,
      hasVisColorAdjustment: flags.hasVisColorAdjustment,
    });
  }, [colors, flags, args, palleteFn]);
};

const _useEuiPaletteWithStepsFn = (
  palleteFn: (steps: number, args: EuiPaletteCommonProps) => EuiPalette,
  steps: number
) => {
  const { euiTheme } = useEuiTheme();
  const { colors, flags } = euiTheme;

  return useMemo(
    () =>
      palleteFn(steps, {
        colors: colors.vis,
        hasVisColorAdjustment: flags.hasVisColorAdjustment,
      }),
    [colors, flags, steps, palleteFn]
  );
};
