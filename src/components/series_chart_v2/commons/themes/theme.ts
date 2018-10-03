import { Margins } from '../dimensions';

export interface ChartConfig {
  margins: Margins;
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

export const DEFAULT_THEME: Theme = {
  chart: {
    margins: {
      left: 30,
      right: 30,
      top: 30,
      bottom: 30,
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
