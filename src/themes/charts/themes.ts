/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { euiPaletteColorBlind } from '../../services/color/eui_palettes';
import { DEFAULT_VISUALIZATION_COLOR } from '../../services/color/visualization_colors';
import {
  PartialTheme,
  LineAnnotationStyle,
  PartitionConfig,
} from '@elastic/charts';

import { RecursivePartial } from '../../components/common';

// @ts-ignore typescript doesn't understand the webpack loader
import lightColors from '!!sass-vars-to-js-loader!../../global_styling/variables/_colors.scss';
// @ts-ignore typescript doesn't understand the webpack loader
import darkColors from '!!sass-vars-to-js-loader!../../themes/eui/eui_colors_dark.scss';

const fontFamily = `'Inter UI', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`;

export interface EuiChartThemeType {
  lineAnnotation: LineAnnotationStyle;
  theme: PartialTheme;
  partition: RecursivePartial<PartitionConfig>;
}

function createTheme(colors: any): EuiChartThemeType {
  return {
    lineAnnotation: {
      line: {
        strokeWidth: 1,
        stroke: colors.euiColorDarkShade.rgba,
        opacity: 1,
      },
      details: {
        fontSize: 10,
        fontFamily: fontFamily,
        fill: colors.euiColorDarkShade.rgba,
        padding: 0,
      },
    },
    partition: {
      fontFamily: fontFamily,
      minFontSize: 8,
      maxFontSize: 16,
      fillLabel: {
        textInvertible: false,
        valueFont: {
          fontWeight: 700,
        },
      },
      linkLabel: {
        maxCount: 5,
        fontSize: 11,
        textColor: colors.euiColorDarkestShade.rgba,
      },
      outerSizeRatio: 1,
      circlePadding: 4,
      sectorLineStroke: colors.euiColorEmptyShade.rgba,
      sectorLineWidth: 1.5,
    },
    theme: {
      background: {
        color: colors.euiColorEmptyShade.rgba,
      },
      chartMargins: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      lineSeriesStyle: {
        line: {
          strokeWidth: 2,
        },
        point: {
          fill: colors.euiColorEmptyShade.rgba,
          strokeWidth: 2,
          radius: 3,
        },
      },
      areaSeriesStyle: {
        area: {
          opacity: 0.3,
        },
        line: {
          strokeWidth: 2,
        },
        point: {
          visible: false,
          fill: colors.euiColorEmptyShade.rgba,
          strokeWidth: 2,
          radius: 3,
        },
      },
      barSeriesStyle: {
        displayValue: {
          fontSize: 8,
          fontFamily: fontFamily,
          fill: colors.euiColorDarkShade.rgba,
        },
      },
      scales: {
        barsPadding: 0.25,
        histogramPadding: 0.05,
      },
      axes: {
        axisTitle: {
          fontSize: 12,
          fontFamily: fontFamily,
          fill: colors.euiColorDarkestShade.rgba,
          padding: {
            inner: 10,
            outer: 0,
          },
        },
        axisLine: {
          stroke: colors.euiColorChartLines.rgba,
        },
        tickLabel: {
          fontSize: 10,
          fontFamily: fontFamily,
          fill: colors.euiColorDarkShade.rgba,
          padding: {
            outer: 8,
            inner: 10,
          },
        },
        tickLine: {
          visible: false,
          stroke: colors.euiColorChartLines.rgba,
          strokeWidth: 1,
        },
        gridLine: {
          horizontal: {
            visible: true,
            stroke: colors.euiColorChartLines.rgba,
            strokeWidth: 1,
            opacity: 1,
            dash: [0, 0],
          },
          vertical: {
            visible: true,
            stroke: colors.euiColorChartLines.rgba,
            strokeWidth: 1,
            opacity: 1,
            dash: [4, 4],
          },
        },
      },
      colors: {
        vizColors: euiPaletteColorBlind({ sortBy: 'natural' }),
        defaultVizColor: DEFAULT_VISUALIZATION_COLOR,
      },
      crosshair: {
        band: {
          fill: colors.euiColorChartBand.rgba,
        },
        line: {
          stroke: colors.euiColorDarkShade.rgba,
          strokeWidth: 1,
          dash: [4, 4],
        },
        crossLine: {
          stroke: colors.euiColorDarkShade.rgba,
          strokeWidth: 1,
          dash: [4, 4],
        },
      },
    },
  };
}

export const EUI_CHARTS_THEME_LIGHT: EuiChartThemeType = createTheme(
  lightColors
);
export const EUI_CHARTS_THEME_DARK: EuiChartThemeType = createTheme(darkColors);

export const EUI_SPARKLINE_THEME_PARTIAL: PartialTheme = {
  lineSeriesStyle: {
    point: {
      visible: false,
      strokeWidth: 1,
      radius: 1,
    },
  },
  areaSeriesStyle: {
    point: {
      visible: false,
      strokeWidth: 1,
      radius: 1,
    },
  },
};
