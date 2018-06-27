import { AxisUtils } from 'react-vis';

/**
 * Axis orientation. Can be top, bottom, left, right.
 * See react-vis AxisUtils.ORIENTATION for docs.
 */
export const ORIENTATION = AxisUtils.ORIENTATION;

/**
 * The title position along the axis.
 */
export const TITLE_POSITION = {
  MIDDLE: 'middle',
  START: 'start',
  END: 'end',
};

export const EuiXYChartAxisUtils = {
  TITLE_POSITION,
  ORIENTATION,
};
