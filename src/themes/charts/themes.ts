/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { PartialTheme, LineAnnotationSpec } from '@elastic/charts';

import { euiPaletteColorBlind } from '../../services/color/eui_palettes';
import { DEFAULT_VISUALIZATION_COLOR } from '../../services/color/visualization_colors';
import { tint, shade } from '../../services/color';
import { buildTheme, getComputed } from '../../services/theme/utils';
import { EuiThemeAmsterdam } from '../../themes/amsterdam/theme';

const fontFamily = `'Inter', 'Inter UI', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`;

export interface EuiChartThemeType {
  lineAnnotation: LineAnnotationSpec['style'];
  theme: PartialTheme;
}

function createTheme(colors: any): EuiChartThemeType {
  return {
    lineAnnotation: {
      line: {
        strokeWidth: 1,
        stroke: colors.darkShade,
        opacity: 1,
      },
      details: {
        fontSize: 10,
        fontFamily: fontFamily,
        fill: colors.text,
        padding: 0,
      },
    },
    theme: {
      background: {
        color: colors.emptyShade,
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
          fill: colors.emptyShade,
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
          fill: colors.emptyShade,
          strokeWidth: 2,
          radius: 3,
        },
      },
      barSeriesStyle: {
        displayValue: {
          fontSize: 10,
          fontFamily: fontFamily,
          fill: {
            textBorder: 0,
          },
          alignment: {
            horizontal: 'center',
            vertical: 'middle',
          },
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
          fill: colors.text,
          padding: {
            inner: 10,
            outer: 0,
          },
        },
        axisLine: {
          stroke: colors.chartLines,
        },
        tickLabel: {
          fontSize: 10,
          fontFamily: fontFamily,
          fill: colors.subduedText,
          padding: {
            outer: 8,
            inner: 10,
          },
        },
        tickLine: {
          visible: false,
          stroke: colors.chartLines,
          strokeWidth: 1,
        },
        gridLine: {
          horizontal: {
            visible: true,
            stroke: colors.chartLines,
            strokeWidth: 1,
            opacity: 1,
            dash: [0, 0],
          },
          vertical: {
            visible: true,
            stroke: colors.chartLines,
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
          fill: colors.chartBand,
        },
        line: {
          stroke: colors.darkShade,
          strokeWidth: 1,
          dash: [4, 4],
        },
        crossLine: {
          stroke: colors.darkShade,
          strokeWidth: 1,
          dash: [4, 4],
        },
      },
      goal: {
        tickLabel: {
          fontFamily: fontFamily,
          fill: colors.subduedText,
        },
        majorLabel: {
          fontFamily: fontFamily,
          fill: colors.text,
        },
        minorLabel: {
          fontFamily: fontFamily,
          fill: colors.subduedText,
        },
        majorCenterLabel: {
          fontFamily: fontFamily,
          fill: colors.text,
        },
        minorCenterLabel: {
          fontFamily: fontFamily,
          fill: colors.subduedText,
        },
        targetLine: {
          stroke: colors.darkestShade,
        },
        tickLine: {
          stroke: colors.mediumShade,
        },
        progressLine: {
          stroke: colors.darkestShade,
        },
      },
      partition: {
        fontFamily: fontFamily,
        minFontSize: 8,
        maxFontSize: 16,
        fillLabel: {
          valueFont: {
            fontWeight: 700,
          },
        },
        linkLabel: {
          maxCount: 5,
          fontSize: 11,
          textColor: colors.text,
        },
        outerSizeRatio: 1,
        circlePadding: 4,
        sectorLineStroke: colors.emptyShade,
        sectorLineWidth: 1.5,
      },
    },
  };
}

// Build a static output of the EUI Amsterdam theme colors
// TODO: At some point, should Elastic Charts be able to inherit or create a theme dynamically from our theme provider?
const KEY = '_EUI_CHART_THEME_AMSTERDAM';
const builtTheme = buildTheme({}, KEY) as typeof EuiThemeAmsterdam;
const lightColors = getComputed(EuiThemeAmsterdam, builtTheme, 'LIGHT').colors;
const darkColors = getComputed(EuiThemeAmsterdam, builtTheme, 'DARK').colors;

export const EUI_CHARTS_THEME_LIGHT: EuiChartThemeType = createTheme({
  ...lightColors,
  chartLines: shade(lightColors.lightestShade, 0.03),
  chartBand: lightColors.lightestShade,
});

export const EUI_CHARTS_THEME_DARK: EuiChartThemeType = createTheme({
  ...darkColors,
  chartLines: darkColors.lightShade,
  chartBand: tint(darkColors.lightestShade, 0.025),
});

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
