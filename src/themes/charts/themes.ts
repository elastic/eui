/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
        axisTitleStyle: {
          fontSize: 12,
          fontFamily: fontFamily,
          fill: colors.euiColorDarkestShade.rgba,
          padding: 10,
        },
        axisLineStyle: {
          stroke: colors.euiColorChartLines.rgba,
        },
        tickLabelStyle: {
          fontSize: 10,
          fontFamily: fontFamily,
          fill: colors.euiColorDarkShade.rgba,
          padding: 8,
        },
        tickLineStyle: {
          visible: false,
          stroke: colors.euiColorChartLines.rgba,
          strokeWidth: 1,
        },
        gridLineStyle: {
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
