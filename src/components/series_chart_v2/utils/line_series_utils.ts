import { curveBasis,
  curveBundle,
  curveCardinal,
  curveCatmullRom,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
  curveNatural,
  curveStep,
  curveStepAfter,
  curveStepBefore,
  line,
} from 'd3-shape';
import { Dimensions } from '../commons/dimensions';
import { CurveType } from '../commons/line_series';
import {
  createOrdinalScale,
  getContinuousScaleFn,
  getOrdinalScaleFn,
  ScaleConfig,
  ScaleFunction,
  ScaleType,
} from '../commons/scales';

/**
 * A single bar glyph representation
 */
export interface LineSeriesGlyph {
  d: string | null;
}

/**
 * This compute an array of BarSeriesGlyphs that can be used to
 * draw an svg rect for the dataset provided
 * @param data The data array
 * @param xScaleConfig the x scale configuration
 * @param yScaleConfig the y scale configuration
 * @param seriesDimensions the dimension of the series (not necessary the chart)
 */
export function computeDataPoints(
  data: any[],
  xScaleConfig: ScaleConfig,
  yScaleConfig: ScaleConfig,
  seriesDimensions: Dimensions,
  curveType: CurveType,
): LineSeriesGlyph {
  let xScaleFn: ScaleFunction;
  if (xScaleConfig.type === ScaleType.Ordinal) {
    const { domain, accessor } = xScaleConfig;
    const ordinalScale = createOrdinalScale(domain as string[], 0, seriesDimensions.width);
    xScaleFn = getOrdinalScaleFn(ordinalScale, accessor);
  } else {
    const { domain, accessor, type, clamp } = xScaleConfig;
    xScaleFn = getContinuousScaleFn(
      type,
      domain as number[],
      accessor,
      0,
      seriesDimensions.width,
      clamp,
    );
  }
  let yScaleFn: ScaleFunction;
  if (yScaleConfig.type === ScaleType.Ordinal) {
    const { domain, accessor } = yScaleConfig;
    const ordinalScale = createOrdinalScale(domain as string[], 0, seriesDimensions.height);
    yScaleFn = getOrdinalScaleFn(ordinalScale, accessor);
  } else {
    const { domain, accessor, type, clamp } = yScaleConfig;
    yScaleFn = getContinuousScaleFn(
      type,
      domain as number[],
      accessor,
      0,
      seriesDimensions.height,
      clamp,
    );
  }

  const lineGenerator = line()
    .x(xScaleFn)
    .y(yScaleFn)
    .curve(getLineCurve(curveType));
  const generatedLine = {
    d: lineGenerator(data),
  };
  return generatedLine;
}

export function getLineCurve(curveType: CurveType) {
  switch (curveType) {
    case CurveType.CURVE_CARDINAL:
      return curveCardinal;
    case CurveType.CURVE_NATURAL:
      return curveNatural;
    case CurveType.CURVE_MONOTONE_X:
      return curveMonotoneX;
    case CurveType.CURVE_MONOTONE_Y:
      return curveMonotoneY;
    case CurveType.CURVE_BASIS:
      return curveBasis;
    case CurveType.CURVE_BUNDLE:
      return curveBundle;
    case CurveType.CURVE_CATMULL_ROM:
      return curveCatmullRom;
    case CurveType.CURVE_STEP:
      return curveStep;
    case CurveType.CURVE_STEP_AFTER:
      return curveStepAfter;
    case CurveType.CURVE_STEP_BEFORE:
      return curveStepBefore;
    case CurveType.LINEAR:
    default:
      return curveLinear;
  }
}
