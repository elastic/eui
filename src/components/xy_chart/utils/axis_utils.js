import { AxisUtils } from 'react-vis';

/**
 * Axis orientation. Can be top, bottom, left, right.
 * See react-vis AxisUtils.ORIENTATION for docs.
 */
export const ORIENTATION = {
  TOP: AxisUtils.ORIENTATION.TOP,
  LEFT: AxisUtils.ORIENTATION.LEFT,
  RIGHT: AxisUtils.ORIENTATION.RIGHT,
  BOTTOM: AxisUtils.ORIENTATION.BOTTOM,
  HORIZONTAL: AxisUtils.ORIENTATION.HORIZONTAL,
  VERTICAL: AxisUtils.ORIENTATION.VERTICAL,
};

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
