import { palettes } from '../../services/color/eui_palettes';
import { DEFAULT_VISUALIZATION_COLOR } from '../../services/color/visualization_colors';

import lightColors from '!!sass-vars-to-js-loader!../../global_styling/variables/_colors.scss';
import darkColors from '!!sass-vars-to-js-loader!../../themes/eui/eui_colors_dark.scss';

import { mergeWithDefaultTheme } from '@elastic/charts';

const fontFamily = `'Inter UI', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`;

function createTheme(colors) {
  return {
    gridHorizontalSettings: {
      stroke: colors.euiColorChartLines.rgba,
      strokeWidth: 1,
      opacity: 1,
      dash: [0, 0],
    },
    gridVerticalSettings: {
      stroke: colors.euiColorChartLines.rgba,
      strokeWidth: 1,
      opacity: 1,
      dash: [4, 4],
    },
    theme: mergeWithDefaultTheme({
      chartMargins: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      lineSeriesStyle: {
        line: {
          visible: true,
          stroke: DEFAULT_VISUALIZATION_COLOR,
          strokeWidth: 2,
        },
        point: {
          visible: true,
          stroke: DEFAULT_VISUALIZATION_COLOR,
          strokeWidth: 2,
          radius: 3,
          opacity: 1,
        },
      },
      areaSeriesStyle: {
        area: {
          visible: true,
          fill: DEFAULT_VISUALIZATION_COLOR,
          opacity: 0.3,
        },
        line: {
          visible: true,
          stroke: DEFAULT_VISUALIZATION_COLOR,
          strokeWidth: 2,
        },
        point: {
          visible: false,
          stroke: DEFAULT_VISUALIZATION_COLOR,
          strokeWidth: 2,
          radius: 3,
          opacity: 1,
        },
      },
      barSeriesStyle: {
        border: {
          visible: false,
          stroke: colors.euiColorEmptyShade.rgba,
          strokeWidth: 1,
        },
        displayValue: {
          fontSize: 8,
          fontFamily: fontFamily,
          fontStyle: 'normal',
          fill: colors.euiColorDarkShade.rgba,
          padding: 0,
          offsetX: 0,
          offsetY: 0,
        },
      },
      axes: {
        axisTitleStyle: {
          fontSize: 10,
          fontStyle: 'bold',
          fontFamily: fontFamily,
          padding: 5,
          fill: colors.euiColorDarkShade.rgba,
        },
        axisLineStyle: {
          stroke: colors.euiColorChartLines.rgba,
          strokeWidth: 1,
        },
        tickLabelStyle: {
          fontSize: 8,
          fontFamily: fontFamily,
          fontStyle: 'normal',
          fill: colors.euiColorDarkShade.rgba,
          padding: 2,
        },
        tickLineStyle: {
          stroke: '#00000000', // transparent
          strokeWidth: 0,
        },
      },
      colors: {
        vizColors: palettes.euiPaletteColorBlind.colors,
        defaultVizColor: DEFAULT_VISUALIZATION_COLOR,
      },
      crosshair: {
        band: {
          visible: true,
          fill: colors.euiColorChartBand.rgba,
        },
        line: {
          visible: true,
          stroke: colors.euiColorDarkShade.rgba,
          strokeWidth: 1,
          dash: [4, 4],
        },
      },
    }),
  };
}

export const EUI_LIGHT_THEME = createTheme(lightColors);
export const EUI_DARK_THEME = createTheme(darkColors);
