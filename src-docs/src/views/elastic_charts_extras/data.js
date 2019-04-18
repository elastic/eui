import { palettes } from '../../../../src/services/color/eui_palettes';

import {
  TooltipType,
  DEFAULT_CHART_PADDING,
  DEFAULT_GEOMETRY_STYLES,
  DEFAULT_MISSING_COLOR,
} from '@elastic/charts';

export const DATA = [
  { x: 0, y: 2, g: 'data 1' }, { x: 1, y: 7, g: 'data 1' }, { x: 2, y: 3, g: 'data 1' }, { x: 3, y: 6, g: 'data 1' },
  { x: 0, y: 1, g: 'data 2' }, { x: 1, y: 3, g: 'data 2' }, { x: 2, y: 4.5, g: 'data 2' }, { x: 3, y: 2, g: 'data 2' }];

/**
 * Temporary placement for EUI specific theming
 */
export const EUI_LIGHT_THEME = {
  chartPaddings: DEFAULT_CHART_PADDING,
  chartMargins: DEFAULT_CHART_PADDING,
  lineSeriesStyle: {
    line: {
      stroke: DEFAULT_MISSING_COLOR,
      strokeWidth: 2,
      visible: true,
    },
    border: {
      stroke: 'gray',
      strokeWidth: 2,
      visible: false,
    },
    point: {
      visible: true,
      radius: 3,
      stroke: 'white',
      strokeWidth: 2,
      opacity: 1,
    },
  },
  areaSeriesStyle: {
    area: {
      fill: DEFAULT_MISSING_COLOR,
      visible: true,
      opacity: 0.3,
    },
    line: {
      stroke: DEFAULT_MISSING_COLOR,
      strokeWidth: 2,
      visible: true,
    },
    border: {
      stroke: 'gray',
      strokeWidth: 2,
      visible: false,
    },
    point: {
      visible: false,
      radius: 1,
      stroke: 'white',
      strokeWidth: 0.5,
      opacity: 1,
    },
  },
  barSeriesStyle: {
    border: {
      stroke: 'white',
      strokeWidth: 1,
      visible: false,
    },
  },
  sharedStyle: DEFAULT_GEOMETRY_STYLES,
  scales: {
    ordinal: {
      padding: 0.25,
    },
  },
  axes: {
    axisTitleStyle: {
      fontSize: 12,
      fontStyle: 'bold',
      fontFamily: `'Open Sans', Helvetica, Arial, sans-serif`,
      padding: 5,
      fill: 'gray',
    },
    axisLineStyle: {
      stroke: 'gray',
      strokeWidth: 1,
    },
    tickLabelStyle: {
      fontSize: 10,
      fontFamily: `'Open Sans', Helvetica, Arial, sans-serif`,
      fontStyle: 'normal',
      fill: 'gray',
      padding: 0,
    },
    tickLineStyle: {
      stroke: 'gray',
      strokeWidth: 1,
    },
  },
  colors: {
    vizColors: palettes.euiPaletteColorBlind.colors,
    defaultVizColor: DEFAULT_MISSING_COLOR,
  },
  legend: {
    verticalWidth: 150,
    horizontalHeight: 50,
  },
  crosshair: {
    band: {
      fill: 'lightgray',
      visible: true,
    },
    line: {
      stroke: 'gray',
      strokeWidth: 1,
      dash: [5, 5],
      visible: true,
    },
  },
};

/**
 * Temporary placement for EUI specific SETTINGS
 */
export const SETTINGS = {
  showLegend: false,
  tooltipType: TooltipType.None,
  theme: EUI_LIGHT_THEME,
};
