import { Accessor } from '../../utils/accessor';
import { Scale } from '../../utils/scales/scales';

export interface BarScaleFnConfig {
  accessor: Accessor;
  scaleFn: Scale;
}

export const DEFAULT_BAR_WIDTH = 10;
