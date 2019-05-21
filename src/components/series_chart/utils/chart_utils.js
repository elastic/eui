/**
 * Used to describe orientation.
 */
export const ORIENTATION = {
  /** The main measure/value is along Y axis. Standard chart orientation. */
  VERTICAL: 'vertical',
  /** The main measure/value is along X axis. Rotated 90 deg. */
  HORIZONTAL: 'horizontal',
  /** Along both axis axis */
  BOTH: 'both',
};

/**
 * Type of scales used in charts.
 */
export const SCALE = {
  /** Continuous scale, that works with numbers.
   * Similar to [d3.scaleLinear](https://github.com/d3/d3-scale/blob/master/README.md#scaleLinear). */
  LINEAR: 'linear',
  /** Ordinal scale, works with numbers and strings.
   * Similar to [d3.scaleOrdinal](https://github.com/d3/d3-scale/blob/master/README.md#ordinal-scales).*/
  ORDINAL: 'ordinal',
  /** Categorical scale, each new value gets the next value from the range.
   *  Similar to d3.scale.category\[Number\], but works with other values besides colors. */
  CATEGORY: 'category',
  /** Time scale. Similar to [d3.scaleTime](https://github.com/d3/d3-scale/blob/master/README.md#time-scales). */
  TIME: 'time',
  /** Time UTC scale. Similar to [d3.scaleUtc](https://github.com/d3/d3-scale/blob/master/README.md#scaleUtc).*/
  TIME_UTC: 'time-utc',
  /** Log scale. Similar to [d3.scaleLog](https://github.com/d3/d3-scale/blob/master/README.md#log-scales). */
  LOG: 'log',
  /** Returns exactly the value that was given to it.
   * Similar to [d3.scaleIdentity](https://github.com/d3/d3-scale#scaleIdentity), except that it does NOT coerce data into numbers.
   * This is useful for precisely specifying properties in the data, eg color can be specified directly on the data. */
  LITERAL: 'literal',
};

/**
 * Differnet types of curves that can be used on lines and areas series.
 * See [d3-shape#curves](https://github.com/d3/d3-shape#curves)
 */
export const CURVE = {
  LINEAR: 'linear',
  CURVE_CARDINAL: 'curveCardinal',
  CURVE_NATURAL: 'curveNatural',
  CURVE_MONOTONE_X: 'curveMonotoneX',
  CURVE_MONOTONE_Y: 'curveMonotoneY',
  CURVE_BASIS: 'curveBasis',
  CURVE_BUNDLE: 'curveBundle',
  CURVE_CATMULL_ROM: 'curveCatmullRom',
  CURVE_STEP: 'curveStep',
  CURVE_STEP_AFTER: 'curveStepAfter',
  CURVE_STEP_BEFORE: 'curveStepBefore',
};

export const EuiSeriesChartUtils = {
  ORIENTATION,
  SCALE,
  CURVE,
};
