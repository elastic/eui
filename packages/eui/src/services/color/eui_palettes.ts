/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

// The implementations live in @elastic/eui-theme-common so that color palettes
// are usable without importing @elastic/eui. The functions are wrapped (rather
// than re-exported) with their original docblocks so the website's docgen data
// keeps being generated from this package.
import {
  euiPaletteColorBlind as _euiPaletteColorBlind,
  euiPaletteColorBlindBehindText as _euiPaletteColorBlindBehindText,
  euiPaletteForStatus as _euiPaletteForStatus,
  euiPaletteForTemperature as _euiPaletteForTemperature,
  euiPaletteComplementary as _euiPaletteComplementary,
  euiPaletteRed as _euiPaletteRed,
  euiPaletteGreen as _euiPaletteGreen,
  euiPaletteSkyBlue as _euiPaletteSkyBlue,
  euiPaletteYellow as _euiPaletteYellow,
  euiPaletteOrange as _euiPaletteOrange,
  euiPaletteCool as _euiPaletteCool,
  euiPaletteWarm as _euiPaletteWarm,
  euiPaletteGray as _euiPaletteGray,
} from '@elastic/eui-theme-common';

export type {
  EuiPalette,
  EuiPaletteColorBlindProps,
  EuiPaletteRotationProps,
  EuiPaletteCommonProps,
} from '@elastic/eui-theme-common';

import type {
  EuiPalette,
  EuiPaletteColorBlindProps,
  EuiPaletteCommonProps,
} from '@elastic/eui-theme-common';

/**
 * For usage in React use the `useEuiPaletteColorBlind` hook instead.
 *
 * NOTE: These functions rely on base vis colors of the theme which are provided via a global
 * singleton instance `EUI_VIS_COLOR_STORE` that's updated by the EuiProvider on theme change.
 * Make sure the function is recalled on theme change to retrieve theme-related colors.
 *
 * Outside of a react component you can use the `subscibe()` method on the `EUI_VIS_COLOR_STORE`
 * to subscribe to updates and update your usages to ensure latest colors are loaded.
 */
export const euiPaletteColorBlind = (
  props: EuiPaletteColorBlindProps = {}
): EuiPalette => _euiPaletteColorBlind(props);

/**
 * For usage in React use the `useEuiPaletteColorBlindBehindText` hook instead.
 *
 * Color blind palette with text is meant for use when text is applied on top of the color.
 * It increases the brightness of the color to give the text more contrast.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteColorBlindBehindText = (
  paletteProps: EuiPaletteColorBlindProps = {}
): EuiPalette => _euiPaletteColorBlindBehindText(paletteProps);

/**
 * For usage in React use the `useEuiPaletteForStatus` hook instead.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteForStatus = (
  steps: number,
  props: EuiPaletteCommonProps = {}
): EuiPalette => _euiPaletteForStatus(steps, props);

/**
 * For usage in React use the `useEuiPaletteForTemperature` hook instead.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteForTemperature = (
  steps: any,
  props: EuiPaletteCommonProps = {}
): EuiPalette => _euiPaletteForTemperature(steps, props);

/**
 * For usage in React use the `useEuiPaletteComplementary` hook instead.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteComplementary = (
  steps: number,
  props: EuiPaletteCommonProps = {}
): EuiPalette => _euiPaletteComplementary(steps, props);

/**
 * For usage in React use the `useEuiPaletteRed` hook instead.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteRed = (
  steps: number,
  props: EuiPaletteCommonProps = {}
): EuiPalette => _euiPaletteRed(steps, props);

/**
 * For usage in React use the `useEuiPaletteGreen` hook instead.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteGreen = (
  steps: number,
  props: EuiPaletteCommonProps = {}
): EuiPalette => _euiPaletteGreen(steps, props);

/**
 * For usage in React use the `useEuiPaletteSkyBlue` hook instead.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteSkyBlue = (
  steps: number,
  props: EuiPaletteCommonProps = {}
): EuiPalette => _euiPaletteSkyBlue(steps, props);

/**
 * For usage in React use the `useEuiPaletteYellow` hook instead.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteYellow = (
  steps: number,
  props: EuiPaletteCommonProps = {}
): EuiPalette => _euiPaletteYellow(steps, props);

/**
 * For usage in React use the `useEuiPaletteOrange` hook instead.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteOrange = (
  steps: number,
  props: EuiPaletteCommonProps = {}
): EuiPalette => _euiPaletteOrange(steps, props);

/**
 * For usage in React use the `useEuiPaletteCool` hook instead.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteCool = (
  steps: number,
  props: EuiPaletteCommonProps = {}
): EuiPalette => _euiPaletteCool(steps, props);

/**
 * For usage in React use the `useEuiPaletteWarm` hook instead.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteWarm = (
  steps: number,
  props: EuiPaletteCommonProps = {}
): EuiPalette => _euiPaletteWarm(steps, props);

/**
 * For usage in React use the `useEuiPaletteGray` hook instead.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteGray = (
  steps: number,
  props: EuiPaletteCommonProps = {}
): EuiPalette => _euiPaletteGray(steps, props);
