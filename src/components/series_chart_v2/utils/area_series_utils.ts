import { nest } from 'd3-collection';
import { ScaleContinuousNumeric } from 'd3-scale';
import { area } from 'd3-shape';
import { sortBy } from 'lodash';
import { Dimensions } from '../commons/dimensions';
import { Accessor, ContinuousAccessor, OrdinalAccessor, SeriesScales } from '../commons/domain';

import { CurveType, getCurveFactory } from '../commons/curves';
import {
  createContinuousScale,
  createOrdinalScale,
  getContinuousScaleFn,
  getOrdinalScaleFn,
  ScaleFunction,
  ScaleType,
} from '../commons/scales';

export type StackedAreaSeriesGlyph = AreaSeriesGlyph[];

/**
 * A single bar glyph representation
 */
export interface AreaSeriesGlyph {
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
  seriesScales: SeriesScales[],
  seriesDimensions: Dimensions,
  clamp = false,
  stackedKeyAccessor?: Accessor,
  curveType: CurveType = CurveType.LINEAR,
): AreaSeriesGlyph | StackedAreaSeriesGlyph {
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
  let yScale: ScaleContinuousNumeric<number, number>;
  if (seriesScale.yScaleType === ScaleType.Ordinal) {
    const ordinalScale = createOrdinalScale(seriesScale.yDomain as string[], 0, seriesDimensions.height);
    yScaleFn = getOrdinalScaleFn(ordinalScale, seriesScale.yAccessor!);
    yScale = createContinuousScale(
      ScaleType.Linear,
      seriesScale.yDomain as number[],
      seriesDimensions.height,
      0,
      clamp,
    );
  } else {
    yScaleFn = getContinuousScaleFn(
      seriesScale.yScaleType!,
      seriesScale.yDomain as number[],
      seriesScale.yAccessor!,
      seriesDimensions.height,
      0,
      clamp,
    );
    yScale = createContinuousScale(
      seriesScale.yScaleType!,
      seriesScale.yDomain as number[],
      seriesDimensions.height,
      0,
      clamp,
    );
  }
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
  return computeAreaGlyphs(data, xScaleFn, yScaleFn, seriesDimensions, curveType);

}

export function computeAreaGlyphs(
  data: any[],
  xScaleFn: ScaleFunction,
  yScaleFn: ScaleFunction,
  seriesDimensions: Dimensions,
  curveType: CurveType = CurveType.LINEAR,
) {
  const areaGenerator = area()
    .x(xScaleFn)
    .y0(seriesDimensions.height)
    .y1(yScaleFn)
    .curve(getCurveFactory(curveType));
  const generatedArea = {
    d: areaGenerator(data),
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

  interface CumulatedValue {
    data: any;
    y1: number;
    y0: number;
  }
  const stackedData = nest<any, CumulatedValue[]>()
    .key((datum) => `${xAccessor(datum)}`)
    .rollup((values) => {
      const sortedValues = sortBy(values, stackedKeyAccessor);
      return sortedValues.reduce<CumulatedValue[]>((acc: CumulatedValue[], curr) => {
        const currentScaledYValue = yAccessor(curr);
        if (acc.length === 0) {
          return [{
            data: curr,
            y1: currentScaledYValue,
            y0: 0,
          }];
        }
        const prevY1 = acc[acc.length - 1].y1;
        return [
          ...acc,
          {
            data: curr,
            y1: prevY1 + currentScaledYValue,
            y0: prevY1,
          },
        ];
        return acc;
      }, []) || [];
    })
    .entries(data);
  const stackedAreaSeries = new Map<string, CumulatedValue[]>();
  stackedData.forEach(({ key, value }: any) => { // TODO check this
    value.forEach((datum: CumulatedValue) => {
      const stackKey = stackedKeyAccessor(datum.data);
      if (!stackedAreaSeries.has(stackKey)) {
        stackedAreaSeries.set(stackKey, []);
      }
      const existingValues = stackedAreaSeries.get(stackKey)!;
      stackedAreaSeries.set(stackKey, [...existingValues, datum]);
    });
  });

  const areas = Array.from(stackedAreaSeries.values());
  const areaGenerator = area<CumulatedValue>()
    .x0((datum: any) => xScaleFn(datum.data))
    .x1((datum: any) => xScaleFn(datum.data))
    .y0((datum: any) => yScale(datum.y0))
    .y1((datum: any) => yScale(datum.y1));

  areaGenerator.curve(getCurveFactory(curveType));

  return areas.map((areaData) => {
    return {
      d: areaGenerator(areaData),
    };
  });
}
