import { Margins } from '../dimensions';

export interface ChartConfig {
  margins: Margins;
  styles: {
    lineSeries: LineSeriesStyle,
  };
}
export interface AxisConfig {
  titleFontSize: number;
  tickFontSize: number;
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
export interface Theme {
  chart: ChartConfig;
  axes: AxisConfig;
  scales: ScalesConfig;
  colors: ColorConfig;
  interactions: InteractionConfig;
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
}

export const DEFAULT_THEME: Theme = {
  chart: {
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
        dataPointsRadius: 3,
        dataPointsStroke: 'gray',
      },
    },
  },
  scales: {
    ordinal: {
      padding: 0.15,
    },
  },
  axes: {
    titleFontSize: 12,
    tickFontSize: 12,
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
};
