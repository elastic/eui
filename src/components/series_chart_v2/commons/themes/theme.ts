import { Margins } from '../dimensions';

export interface Theme {
  chartMargins: Margins;
  axisTitle: {
    fontSize: number,
  };
}
export const DEFAULT_THEME: Theme = {
  chartMargins: {
    left: 30,
    right: 30,
    top: 30,
    bottom: 30,
  },
  axisTitle: {
    fontSize: 20,
  },
};
