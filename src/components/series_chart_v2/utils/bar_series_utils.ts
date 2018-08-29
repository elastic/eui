import { Dimensions } from '../commons/dimensions';
import { Accessor, Domain, SeriesScales } from '../commons/domain';
import {
  createOrdinalScale,
  getContinuousScaleFn,
  getOrdinalScaleFn,
  ScaleFunction,
  ScaleType,
} from '../commons/scales';

export const DEFAULT_BAR_WIDTH = 10;

/**
 * A single bar glyph representation
 */
export interface BarSeriesGlyph {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ScaleFnConfig {
  scaleFn: ScaleFunction;
  barWidth: number;
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
): BarSeriesGlyph[] {
  return compute(data, seriesScales, seriesDimensions, clamp);
}

function compute(
  data: any[],
  seriesScales: SeriesScales[],
  seriesDimensions: Dimensions,
  clamp: boolean,
) {
  const yScaleConfig = seriesScales[seriesScales.length - 1];
  const { yScaleType, yDomain, yAccessor } = yScaleConfig;
  if (!yScaleType || !yDomain || !yAccessor) {
    throw new Error('Missing yScaleType or yDomain or yAccessor for series');
  }
  const yScale = getScale(yScaleType, yDomain, yAccessor , 0, seriesDimensions.height, clamp);
  const xScales = seriesScales.reduce((acc, scale) => {
    const { xScaleType, xDomain, xAccessor } = scale;
    if (acc.length === 0) {
      const scaleConfig = getScale(xScaleType, xDomain, xAccessor, 0, seriesDimensions.width);
      return [ scaleConfig ];
    } else {
      const prevScale = acc[acc.length - 1];
      const scaleConfig = getScale(xScaleType, xDomain, xAccessor, 0, prevScale.barWidth);
      return [ ...acc, scaleConfig ];
    }
  }, [] as ScaleFnConfig[]);
  const dataPoints = data.map((point) => {
    const yValue = yScale.scaleFn(point);
    const xData = computeXScaleValue(xScales, point);
    return {
      x: xData.value,
      y: seriesDimensions.height - yValue,
      height: yValue,
      width: xData.barWidth,
    };
  });
  return dataPoints;
}

function computeXScaleValue(scales: ScaleFnConfig[], datum: any) {
  const value = scales.reduce((acc: number, scale) => {
    const position = scale.scaleFn(datum);
    return acc + position;
  }, 0);
  const barWidth = scales[scales.length - 1].barWidth;
  return {
    value,
    barWidth,
  };
}

function getScale(type: ScaleType, domain: Domain, accessor: Accessor, min: number, max: number, clamp?: boolean) {
  if (type === ScaleType.Ordinal) {
    const ordinalScale = createOrdinalScale(domain as string[], min, max);
    const scaleFn = getOrdinalScaleFn(ordinalScale, accessor);
    const barWidth = ordinalScale.bandwidth();
    return {
      scaleFn,
      barWidth,
    };
  } else {
    const scaleFn = getContinuousScaleFn(
      type,
      domain as number[],
      accessor,
      min,
      max,
      clamp,
    );
    const barWidth = DEFAULT_BAR_WIDTH;
    return {
      scaleFn,
      barWidth,
    };
  }
}
