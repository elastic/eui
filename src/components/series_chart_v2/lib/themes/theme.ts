import { Margins } from '../utils/dimensions';

export interface ChartConfig {
  margins: Margins;
  paddings: Margins;
  styles: {
    lineSeries: LineSeriesStyle,
    areaSeries: AreaSeriesStyle,
  };
}
export interface AxisConfig {
  tickFontSize: number;
  tickFontFamily: string;
  tickFontStyle: string;
  titleFontSize: number;
  titleFontFamily: string;
  titleFontStyle: string;
  titlePadding: number;
}
export interface ScalesConfig {
  ordinal: {
    padding: number;
  };
}
export interface ColorConfig {
  vizColors: string[];
  defaultVizColor: string;
}
export interface InteractionConfig {
  dimmingOpacity: number;
}
export interface LegendStyle {
  verticalWidth: number;
  horizontalHeight: number;
}
export interface Theme {
  chart: ChartConfig;
  axes: AxisConfig;
  scales: ScalesConfig;
  colors: ColorConfig;
  interactions: InteractionConfig;
  legend: LegendStyle;
}
export interface LineSeriesStyle {
  hideLine: boolean;
  lineWidth: number;
  hideBorder: boolean;
  borderStrokeColor: string;
  borderWidth: number;
  hideDataPoints: boolean;
  dataPointsRadius: number;
  dataPointsStroke: string;
  dataPointsStrokeWidth: number;
}
export interface AreaSeriesStyle {
  hideArea: boolean;
  hideLine: boolean;
  lineStrokeColor: string;
  lineWidth: number;
  hideBorder: boolean;
  borderStrokeColor: string;
  borderWidth: number;
  hideDataPoints: boolean;
  dataPointsRadius: number;
  dataPointsStroke: string;
  dataPointsStrokeWidth: number;
}

export const DEFAULT_THEME: Theme = {
  chart: {
    paddings: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 5,
    },
    margins: {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30,
    },
    styles: {
      lineSeries: {
        hideLine: false,
        lineWidth: 1,
        hideBorder: true,
        borderWidth: 2,
        borderStrokeColor: 'gray',
        hideDataPoints: true,
        dataPointsRadius: 5,
        dataPointsStroke: 'gray',
        dataPointsStrokeWidth: 1,
      },
      areaSeries: {
        hideArea: false,
        hideLine: true,
        lineWidth: 1,
        lineStrokeColor: 'white',
        hideBorder: true,
        borderWidth: 2,
        borderStrokeColor: 'gray',
        hideDataPoints: true,
        dataPointsRadius: 5,
        dataPointsStroke: 'gray',
        dataPointsStrokeWidth: 1,
      },
    },
  },
  scales: {
    ordinal: {
      padding: 0.25,
    },
  },
  axes: {
    tickFontSize: 10,
    tickFontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
    tickFontStyle: 'normal',
    titleFontSize: 12,
    titleFontStyle: 'bold',
    titleFontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
    titlePadding: 5,
  },
  colors: {
    vizColors: [
      '#00B3A4',
      '#3185FC',
      '#DB1374',
      '#490092',
      '#FEB6DB',
      '#E6C220',
      '#F98510',
      '#BFA180',
      '#461A0A',
      '#920000',
    ],
    defaultVizColor: 'red',
  },
  interactions: {
    dimmingOpacity: 0.1,
  },
  legend: {
    verticalWidth: 150,
    horizontalHeight: 50,
  },
};
