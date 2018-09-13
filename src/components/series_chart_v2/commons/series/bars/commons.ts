import { Accessor } from '../../domains/accessor';

export interface BarScaleFnConfig {
  accessor: Accessor;
  scale: (datum: any) => number;
  barWidth: number;
}

export const DEFAULT_BAR_WIDTH = 10;
