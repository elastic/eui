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
import { SeriesScales } from '../commons/domain';
import { CurveType } from '../commons/line_series';
import {
  createOrdinalScale,
  getContinuousScaleFn,
  getOrdinalScaleFn,
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

// groupLevel: number;
// xDomain: Domain;
// yDomain?: Domain;
// xScaleType: ScaleType;
// yScaleType?: ScaleType;
// xAccessor: Accessor;
// yAccessor?: Accessor;
export function computeDataPoints(
  data: any[],
  seriesScales: SeriesScales[],
  seriesDimensions: Dimensions,
  curveType?: CurveType,
  clamp = false,
): LineSeriesGlyph {
  const seriesScale = seriesScales[0];
  let xScaleFn: ScaleFunction;
  if (seriesScale.xScaleType === ScaleType.Ordinal) {
    const ordinalScale = createOrdinalScale(seriesScale.xDomain as string[], 0, seriesDimensions.width);
    xScaleFn = getOrdinalScaleFn(ordinalScale, seriesScale.xAccessor, true);
  } else {
    xScaleFn = getContinuousScaleFn(
      seriesScale.xScaleType,
      seriesScale.xDomain as number[],
      seriesScale.xAccessor,
      0,
      seriesDimensions.width,
      clamp,
    );
  }
  let yScaleFn: ScaleFunction;
  if (seriesScale.yScaleType === ScaleType.Ordinal) {
    const ordinalScale = createOrdinalScale(seriesScale.yDomain as string[], 0, seriesDimensions.height);
    yScaleFn = getOrdinalScaleFn(ordinalScale, seriesScale.yAccessor!);
  } else {
    yScaleFn = getContinuousScaleFn(
      seriesScale.yScaleType!,
      seriesScale.yDomain as number[],
      seriesScale.yAccessor!,
      seriesDimensions.height,
      0,
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

export function getLineCurve(curveType: CurveType = CurveType.LINEAR) {
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
