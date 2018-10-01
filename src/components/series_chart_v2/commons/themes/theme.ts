import { Margins } from '../dimensions';

export interface Theme {
  chartMargins: Margins;
  axisTitle: {
    fontSize: number,
  };
  scales: {
    ordinal: {
      padding: number;
    };
  };
  vizColors: string[];
  defaultVizColor: string;
  interactions: {
    hideOpacity: number,
  };
}
export const DEFAULT_THEME: Theme = {
  chartMargins: {
    left: 30,
    right: 30,
    top: 30,
    bottom: 30,
  },
  scales: {
    ordinal: {
      padding: 0.15,
    },
  },
  axisTitle: {
    fontSize: 12,
  },
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
  interactions: {
    hideOpacity: 0.1,
  },
};
