import { ScaleContinuousNumeric } from 'd3-scale';
import { area, Area } from 'd3-shape';
import { Dimensions } from '../commons/dimensions';
import { Accessor, ContinuousAccessor, OrdinalAccessor, SeriesScales } from '../commons/domains/domain';

import { ScaleFunction } from '../commons/scales';
import { CurveType, getCurveFactory } from '../commons/series/utils/curves';
import { computeStackedLinearYData, getLinearSerisScalesFns, LinearStackedCumulatedValue } from './linear_series_utils';

export type StackedAreaSeriesGlyph = AreaSeriesGlyph[];

/**
 * A single area series. d is the area path.
 * points is the array of points that compose the area.
 */
export interface AreaSeriesGlyph {
  d: string | null;
  points: Array<{ x: number; y: number }>;
}

/**
 * This compute a single Area path or an array of Area paths that can be used to
 * draw an svg paths for the dataset provided
 */
export function computeDataPoints(
  data: any[],
  seriesScales: SeriesScales[],
  seriesDimensions: Dimensions,
  clamp = false,
  stackedKeyAccessor?: Accessor,
  curveType: CurveType = CurveType.LINEAR,
): AreaSeriesGlyph | StackedAreaSeriesGlyph {
  const seriesScale = seriesScales[0];
  const { xScaleFn, yScale, yScaleFn } = getLinearSerisScalesFns(
    seriesScale,
    seriesDimensions,
    clamp,
  );
  if (stackedKeyAccessor) {
    return computeStackedAreaGlyphs(
      data,
      xScaleFn,
      seriesScale.xAccessor,
      yScale,
      seriesScale.yAccessor!,
      stackedKeyAccessor,
      curveType,
    );
  }
  return computeSingleAreaGlyphs(data, xScaleFn, yScaleFn, seriesDimensions, curveType);
}

export function computeSingleAreaGlyphs(
  data: any[],
  xScaleFn: ScaleFunction,
  yScaleFn: ScaleFunction,
  seriesDimensions: Dimensions,
  curveType: CurveType = CurveType.LINEAR,
) {
  const areaGenerator = area<any>()
    .x(xScaleFn)
    .y0(seriesDimensions.height)
    .y1(yScaleFn)
    .curve(getCurveFactory(curveType));
  return computeAreaGlyphs(data, xScaleFn, yScaleFn, areaGenerator);
}

function computeAreaGlyphs(
  data: any[],
  xScaleFn: ScaleFunction,
  yScaleFn: ScaleFunction,
  areaGenerator: Area<any>,
) {
  const points = data.map((datum) => {
    return {
      x: xScaleFn(datum),
      y: yScaleFn(datum),
    };
  });
  const generatedArea = {
    d: areaGenerator(data),
    points,
  };
  return generatedArea;
}

export function computeStackedAreaGlyphs(
  data: any[],
  xScaleFn: ScaleFunction,
  xAccessor: Accessor,
  yScale: ScaleContinuousNumeric<number, number>,
  yAccessor: ContinuousAccessor,
  stackedKeyAccessor: OrdinalAccessor,
  curveType: CurveType = CurveType.LINEAR,
): StackedAreaSeriesGlyph {
  const stackedAreaSeries = computeStackedLinearYData(
    data,
    xAccessor,
    yAccessor,
    stackedKeyAccessor,
  );
  const areas = Array.from(stackedAreaSeries.values());
  const areaGenerator = area<LinearStackedCumulatedValue>()
    .x0((datum: any) => xScaleFn(datum.data))
    .x1((datum: any) => xScaleFn(datum.data))
    .y0((datum: any) => yScale(datum.y0))
    .y1((datum: any) => yScale(datum.y1))
    .curve(getCurveFactory(curveType));

  return areas.map((areaData) => {
    const yScaleFn = (datum: any) => {
      return yScale(datum.y1);
    };
    const xScaleFnPoint = (datum: any) => {
      return xScaleFn(datum.data);
    };
    return computeAreaGlyphs(areaData, xScaleFnPoint, yScaleFn, areaGenerator);
  });
}
