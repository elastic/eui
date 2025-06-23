/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chroma from 'chroma-js';
import { colorPalette } from './color_palette';
import { EUI_VIS_COLOR_STORE } from './vis_color_store';
import { _EuiThemeVisColors } from '@elastic/eui-theme-common';

export type EuiPalette = string[];

const flatten = (arr: any[]) => [].concat(...arr);

const euiPalette = function (
  colors: string[],
  steps: number,
  diverge: boolean = false,
  categorical: boolean = true
): EuiPalette {
  // This function also trims the first color so white/black is never a color
  if (!diverge && steps > 1) {
    const palette = colorPalette(colors, steps + 1);
    palette.shift();
    return palette;
  }

  return colorPalette(colors, steps, diverge, categorical);
};

export type EuiPaletteCommonProps = {
  /**
   * Defines the default set of colors the palette uses.
   * Defaults to vis colors from `EUI_VIS_COLOR_STORE`.
   * Use this to specify colors when you can't rely on the EuiProvider updates.
   */
  colors?: _EuiThemeVisColors;
  /**
   * Specifies if some color asdjustments for vis colors are required.
   * Has to be passed when `colors` are set
   */
  hasVisColorAdjustment?: boolean;
};

export type EuiPaletteRotationProps = {
  /**
   * How many variations of the series is needed
   */
  rotations?: number;
  /**
   * Order similar colors as `group`s or just `append` each variation
   */
  order?: 'append' | 'group';
  /**
   * Specifies if the direction of the color variations
   */
  direction?: 'lighter' | 'darker' | 'both';
  /**
   * Use the default sort order, or re-sort them based on the color wheel (natural)
   */
  sortBy?: 'default' | 'natural';
  /**
   * Shift the sorting order by a certain number when used in conjunction with `'natural'` `sortBy`.
   * Defaults to a number close to green.
   */
  sortShift?: string;
};

export type EuiPaletteColorBlindProps = EuiPaletteCommonProps &
  EuiPaletteRotationProps;

/**
 * NOTE: These functions rely on base vis colors of the theme which are provided via a global
 * singleton instance `EUI_VIS_COLOR_STORE` that's updated by the EuiProvider on theme change.
 * Make sure the function is recalled on theme change to retrieve theme-related colors.
 *
 * Outside of a react component you can use the `subscibe()` method on the `EUI_VIS_COLOR_STORE`
 * to subscribe to updates and update your usages to ensure latest colors are loaded.
 */
export const euiPaletteColorBlind = ({
  rotations = 1,
  order = 'append',
  direction = 'lighter',
  sortBy = 'default',
  sortShift = '-100',
  colors,
}: EuiPaletteColorBlindProps = {}): EuiPalette => {
  let _colors: string[] = [];

  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;

  let base = [
    visColors.euiColorVis0,
    visColors.euiColorVis1,
    visColors.euiColorVis2,
    visColors.euiColorVis3,
    visColors.euiColorVis4,
    visColors.euiColorVis5,
    visColors.euiColorVis6,
    visColors.euiColorVis7,
    visColors.euiColorVis8,
    visColors.euiColorVis9,
  ];

  if (sortBy === 'natural') {
    // Sort the colors based on the color wheel, but shifting the values based on sortShift
    base = [...base].sort(function (a, b) {
      return (
        chroma(a).set('hsl.h', sortShift).hsl()[0] -
        chroma(b).set('hsl.h', sortShift).hsl()[0]
      );
    });
  }

  if (rotations > 1) {
    const palettes = base.map((color) => {
      // Create the darkest and lightest versions of each color using black and white
      const palette = colorPalette(['black', color, 'white'], 5, false, true);
      // Then removing the extremes
      palette.pop();
      palette.shift();

      switch (direction) {
        case 'lighter':
          return colorPalette([palette[1], palette[2]], rotations, false, true);
        case 'darker':
          return colorPalette([palette[1], palette[0]], rotations, false, true);
        case 'both':
          return colorPalette(palette, rotations, false, true);
      }
    });

    if (order === 'group') {
      _colors = flatten(palettes);
    } else {
      for (let i = 0; i < rotations; i++) {
        const rotation = palettes.map((palette) => palette[i]);
        _colors.push(...rotation);
      }
    }
  } else {
    _colors = base;
  }

  return _colors;
};

/**
 * Color blind palette with text is meant for use when text is applied on top of the color.
 * It increases the brightness of the color to give the text more contrast.
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteColorBlindBehindText = (
  paletteProps: EuiPaletteColorBlindProps = {}
) => {
  const { hasVisColorAdjustment } = paletteProps;
  const _hasVisColorAdjustment =
    hasVisColorAdjustment ?? EUI_VIS_COLOR_STORE.hasVisColorAdjustment;

  const originalPalette = euiPaletteColorBlind(paletteProps);

  // new theme palette has required contrast, we don't need to adjust them
  if (!_hasVisColorAdjustment) return originalPalette;

  const newPalette = originalPalette.map((color) =>
    chroma(color).brighten(0.5).hex()
  );
  return newPalette;
};

const _getVisColorsAsText = (
  visColors: _EuiThemeVisColors,
  keys: Array<keyof _EuiThemeVisColors>
) =>
  keys.reduce((colors, curr) => {
    return [...colors, visColors[curr]];
  }, [] as EuiPalette);

/**
 * @deprecated - use `euiColorVisText{NUMBER}` tokens directly
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteForLightBackground = function ({
  colors,
}: EuiPaletteCommonProps = {}): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;

  const visColorsAsTextKeys = Object.keys(visColors).filter((color) =>
    color.includes('euiColorVisText')
  ) as Array<keyof typeof visColors>;

  return _getVisColorsAsText(visColors, visColorsAsTextKeys);
};

/**
 * @deprecated - use `euiColorVisText{NUMBER}` tokens directly
 *
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteForDarkBackground = function ({
  colors,
}: EuiPaletteCommonProps = {}): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;

  const visColorsAsTextKeys = Object.keys(visColors).filter((color) =>
    color.includes('euiColorVisText')
  ) as Array<keyof typeof visColors>;

  return _getVisColorsAsText(visColors, visColorsAsTextKeys);
};

/**
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteForStatus = function (
  steps: number,
  { colors }: EuiPaletteCommonProps = {}
): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;

  if (steps === 1) {
    return [visColors.euiColorVisSuccess0];
  }
  if (steps <= 3) {
    return euiPalette(
      [
        visColors.euiColorVisSuccess0,
        visColors.euiColorVisWarning1,
        visColors.euiColorVisDanger0,
      ],
      steps,
      true
    );
  }
  return euiPalette(
    [
      visColors.euiColorVisSuccess0,
      visColors.euiColorVisSuccess1,
      visColors.euiColorVisWarning1,
      visColors.euiColorVisDanger1,
      visColors.euiColorVisDanger0,
    ],
    steps,
    true
  );
};

/**
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteForTemperature = function (
  steps: any,
  { colors, hasVisColorAdjustment }: EuiPaletteCommonProps = {}
): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;
  const _hasVisColorAdjustment =
    hasVisColorAdjustment ?? EUI_VIS_COLOR_STORE.hasVisColorAdjustment;

  if (steps === 1) {
    return [visColors.euiColorVisCool2];
  } else if (steps <= 3) {
    return euiPalette(
      [visColors.euiColorVisCool2, visColors.euiColorVisWarm2],
      steps,
      true
    );
  }

  const cools = colorPalette(
    [
      visColors.euiColorVisCool2,
      visColors.euiColorVisCool1,
      visColors.euiColorVisCool0,
    ],
    3
  );
  const warms = colorPalette(
    [
      visColors.euiColorVisWarm0,
      visColors.euiColorVisWarm1,
      visColors.euiColorVisWarm2,
    ],
    3
  );

  const paletteColors = _hasVisColorAdjustment
    ? [...cools, ...warms]
    : [...cools, visColors.euiColorVisBase0, ...warms];

  return euiPalette(paletteColors, steps, true);
};

/**
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteComplementary = function (
  steps: number,
  { colors, hasVisColorAdjustment }: EuiPaletteCommonProps = {}
): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;
  const _hasVisColorAdjustment =
    hasVisColorAdjustment ?? EUI_VIS_COLOR_STORE.hasVisColorAdjustment;

  if (steps === 1) {
    return [visColors.euiColorVisComplementary0];
  }

  const paletteColors = _hasVisColorAdjustment
    ? [visColors.euiColorVisComplementary0, visColors.euiColorVisComplementary1]
    : [
        visColors.euiColorVisComplementary0,
        visColors.euiColorVisBase0,
        visColors.euiColorVisComplementary1,
      ];

  return euiPalette(paletteColors, steps, true);
};

/**
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteRed = function (
  steps: number,
  { colors }: EuiPaletteCommonProps = {}
): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;

  if (steps === 1) {
    return [visColors.euiColorVisDanger1];
  }

  return euiPalette(
    [visColors.euiColorVisBase0, visColors.euiColorVisDanger0],
    steps
  );
};

/**
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteGreen = function (
  steps: number,
  { colors }: EuiPaletteCommonProps = {}
): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;

  if (steps === 1) {
    return [visColors.euiColorVisSuccess1];
  }

  return euiPalette(
    [visColors.euiColorVisBase0, visColors.euiColorVisSuccess0],
    steps
  );
};

/**
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteSkyBlue = function (
  steps: number,
  { colors }: EuiPaletteCommonProps = {}
): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;

  if (steps === 1) {
    return [visColors.euiColorVisNeutral1];
  }

  return euiPalette(
    [visColors.euiColorVisBase0, visColors.euiColorVisNeutral0],
    steps
  );
};

/**
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteYellow = function (
  steps: number,
  { colors }: EuiPaletteCommonProps = {}
): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;

  if (steps === 1) {
    return [visColors.euiColorVisWarning1];
  }

  return euiPalette(
    [visColors.euiColorVisBase0, visColors.euiColorVisWarning0],
    steps
  );
};

/**
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteOrange = function (
  steps: number,
  { colors }: EuiPaletteCommonProps = {}
): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;

  if (steps === 1) {
    return [visColors.euiColorVisRisk1];
  }

  return euiPalette(
    [visColors.euiColorVisBase0, visColors.euiColorVisRisk0],
    steps
  );
};

/**
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteCool = function (
  steps: number,
  { colors, hasVisColorAdjustment }: EuiPaletteCommonProps = {}
): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;
  const _hasVisColorAdjustment =
    hasVisColorAdjustment ?? EUI_VIS_COLOR_STORE.hasVisColorAdjustment;

  if (steps === 1) {
    return [visColors.euiColorVisCool1];
  }

  return euiPalette(
    [
      _hasVisColorAdjustment
        ? visColors.euiColorVisBase0
        : visColors.euiColorVisCool0,
      visColors.euiColorVisCool1,
      visColors.euiColorVisCool2,
    ],
    steps
  );
};

/**
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteWarm = function (
  steps: number,
  { colors }: EuiPaletteCommonProps = {}
): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;

  if (steps === 1) {
    return [visColors.euiColorVisWarm2];
  }

  return euiPalette(
    [
      visColors.euiColorVisWarm0,
      visColors.euiColorVisWarm1,
      visColors.euiColorVisWarm2,
    ],
    steps
  );
};

/**
 * NOTE: This function is not pure. It relies on `EUI_VIS_COLOR_STORE` which is updated by the
 * EuiProvider on theme change. Ensure to recall the function on theme change or subscribe to the store.
 */
export const euiPaletteGray = function (
  steps: number,
  { colors }: EuiPaletteCommonProps = {}
): EuiPalette {
  const visColors = colors ?? EUI_VIS_COLOR_STORE.visColors;

  if (steps === 1) {
    return [visColors.euiColorVisGrey1];
  }

  return euiPalette(
    [
      visColors.euiColorVisBase0,
      visColors.euiColorVisGrey0,
      visColors.euiColorVisGrey1,
      visColors.euiColorVisGrey2,
      visColors.euiColorVisGrey3,
    ],
    steps,
    false
  );
};
