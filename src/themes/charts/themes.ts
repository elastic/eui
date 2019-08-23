import { palettes } from '../../services/color/eui_palettes';
import { DEFAULT_VISUALIZATION_COLOR } from '../../services/color/visualization_colors';
import {
  PartialTheme,
  GridLineConfig,
  LineAnnotationStyle,
} from '@elastic/charts';

// @ts-ignore
import lightColors from '!!sass-vars-to-js-loader!../../global_styling/variables/_colors.scss';
// @ts-ignore
import darkColors from '!!sass-vars-to-js-loader!../../themes/eui/eui_colors_dark.scss';

const fontFamily = `'Inter UI', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`;

export interface EuiChartThemeType {
  gridHorizontalSettings: GridLineConfig;
  gridVerticalSettings: GridLineConfig;
  lineAnnotation: LineAnnotationStyle;
  theme: PartialTheme;
}

function createTheme(colors: any) {
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
          stroke: 'rgba(0,0,0,0)', // transparent
          strokeWidth: 0,
        },
      },
      colors: {
        vizColors: palettes.euiPaletteColorBlind.colors,
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
