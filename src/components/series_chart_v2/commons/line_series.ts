export const enum ScaleType {
  Linear = 'linear',
  Ordinal = 'ordinal',
  Log = 'log',
  Sqrt = 'sqrt',
}

export const enum CurveType {
  CURVE_CARDINAL,
  CURVE_NATURAL,
  CURVE_MONOTONE_X,
  CURVE_MONOTONE_Y,
  CURVE_BASIS,
  CURVE_BUNDLE,
  CURVE_CATMULL_ROM,
  CURVE_STEP,
  CURVE_STEP_AFTER,
  CURVE_STEP_BEFORE,
  LINEAR,
}
