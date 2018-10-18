import { area, line } from 'd3-shape';
import { Accessor, AccessorFn, getAccessorFn } from '../../data_ops/accessor';
import { Domain, SpecDomains } from '../../data_ops/domain';
import { createContinuousScale, createOrdinalScale, ScaleType } from '../../data_ops/scales';
import { Dimensions } from '../../dimensions';
import { ColorScales, getColor } from '../../themes/colors';
import { ColorConfig, ScalesConfig } from '../../themes/theme';
import { BarScaleFnConfig } from '../bars/commons';
import { AreaSeriesSpec, Datum, Rotation } from '../specs';
export interface AreaGlyph {
  data: Datum[];
  points: Array<{x: number, y1: number, y0: number}>;
  path: string;
  linePath: string;
  color?: string;
}

export function renderAreaSeriesSpec(
  areaSeriesSpec: AreaSeriesSpec,
  domains: SpecDomains,
  chartDims: Dimensions,
  rotation: Rotation,
  colorScales: ColorScales,
  chartColorsConfig: ColorConfig,
  chartScalesConfig: ScalesConfig,
): AreaGlyph[] {
  const {
    data,
    yAccessors,
    xAccessor,
    xScaleType,
    splitSeriesAccessors = [],
    stackAccessors = [],
    colorAccessors = [],
  } = areaSeriesSpec;

  if (domains.xDomains.length !== 1) {
    return []; // TODO find a better return value, option maybe?
  }
  const maxXWidth = rotation === 0 ? chartDims.width : chartDims.height;
  const xScaleConfig = getScale(
    xAccessor,
    xScaleType,
    domains.xDomains[0].domain,
    0,
    maxXWidth,
    false,
    chartScalesConfig.ordinal.padding,
  );

  const maxYHeight = rotation === 0 ? chartDims.height : chartDims.width;
  const yScaleConfig = getScale(
    yAccessors[0],
    domains.yDomain.scaleType,
    domains.yDomain.domain,
    0,
    maxYHeight,
  );
  const xAccessorFn = getAccessorFn(domains.xDomains[0].accessor);
  const yAccessorsFns = yAccessors.map((yAccessor) => {
    return getAccessorFn(yAccessor);
  });
  let splitSeriesAccessorsFns = splitSeriesAccessors.map((splitSeriesAccessor) => {
    return getAccessorFn(splitSeriesAccessor);
  });
  if (splitSeriesAccessorsFns.length === 0) {
    splitSeriesAccessorsFns = [
      () => '_', // no need of split by series here
    ];
  }
  const specColorAccessors = colorAccessors.length > 0 ? colorAccessors : [...splitSeriesAccessors];
  const getColorFn = getColor(chartColorsConfig, colorScales, specColorAccessors);
  const areaSeries = new Map<string, AreaGlyph>();
  const stackedYValues = new Map<string, number>();
  data.forEach((datum: Datum) => {
    const splitSeriesKey = getSplitSeriesKey(datum, splitSeriesAccessorsFns);
    yAccessorsFns.forEach((yAccessorFn, index) => {
      const yAccessor = yAccessors[index];
      const seriesKey = getSeriesKey(splitSeriesKey, yAccessor);
      const x = xScaleConfig.scale(xAccessorFn(datum)) + xScaleConfig.barWidth / 2;
      let y0 = maxYHeight;
      const scaledYValue = yScaleConfig.scale(yAccessorFn(datum));
      let y1 = maxYHeight - scaledYValue;
      if (stackAccessors.length > 0) {
        const stackKey = getStackKey(datum, stackAccessors, '');
        if (stackedYValues.has(stackKey)) {
          y0 = stackedYValues.get(stackKey) || maxYHeight;
          y1 = y0 - scaledYValue;
        }
        stackedYValues.set(stackKey, y1);
      }
      // y0 = maxYHeight - y0;
      let areaGlyph: AreaGlyph;
      if (areaSeries.has(seriesKey)) {
        areaGlyph = updateAreaPoints(areaSeries.get(seriesKey)!, x, y0, y1);
      } else {
        areaGlyph = createAreaGlyph(x, y0, y1, getColorFn(datum, undefined));
      }
      areaSeries.set(seriesKey, areaGlyph);
    });
  });
  const pathGenerator = area<{x: number, y1: number, y0: number}>()
      .x((datum: Datum) => datum.x)
      .y0((datum: Datum) => datum.y0) // the zero
      .y1((datum: Datum) => datum.y1); // the real value
  const linePathGenerator = line<{x: number, y1: number}>()
    .x((datum: Datum) => datum.x)
    .y((datum: Datum) => datum.y1);
  const glyphs = Array.from(areaSeries.values()).map((areaGlyph) => {
    const path = pathGenerator(areaGlyph.points) || '';
    const linePath = linePathGenerator(areaGlyph.points) || '';
    return {
      ...areaGlyph,
      path,
      linePath,
    };
  });
  return glyphs;
}
function getSeriesKey(seriesValue: string, yAccessor: Accessor) {
  return `${seriesValue}__${yAccessor}`;
}
function getStackKey(datum: Datum, stackAccessors: Accessor[], yAccessor: Accessor) {
  return [
    ...stackAccessors.map((accessor) => {
      return `acc_${datum[accessor]}`;
    }),
    yAccessor,
  ].join('--');
}
function getSplitSeriesKey(datum: Datum, splitSeriesAccessorFn: AccessorFn[]) {
  return splitSeriesAccessorFn.map((accessorFn) => {
    return accessorFn(datum);
  }).join('--');
}
function updateAreaPoints(areaGlyph: AreaGlyph  , x: number, y0: number, y1: number): AreaGlyph {
  return {
    ...areaGlyph,
    points: [
      ...areaGlyph.points,
      { x, y0, y1 },
    ],
  };
}
function createAreaGlyph( x: number, y0: number, y1: number, color: string): AreaGlyph {
  return {
    points: [
      { x, y0, y1 },
    ],
    data: [],
    path: '',
    linePath: '',
    color,
  };
}

export function getScale(
  accessor: Accessor,
  type: ScaleType,
  domain: Domain,
  min: number,
  max: number,
  clamp?: boolean,
  padding?: number,
): BarScaleFnConfig {
  if (type === ScaleType.Ordinal) {
    const scale = createOrdinalScale(domain as string[], min, max, padding);
    const barWidth = scale.bandwidth();
    return {
      accessor,
      scale,
      barWidth,
    };
  } else {
    const scale = createContinuousScale(type, domain as [number, number], min, max, clamp);
    const barWidth = 0;
    return {
      accessor,
      scale,
      barWidth,
    };
  }
}
