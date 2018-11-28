import { area, line } from 'd3-shape';
import { ColorScales, getColor } from '../../themes/colors';
import { ColorConfig, ScalesConfig } from '../../themes/theme';
import { Accessor, AccessorFn, getAccessorFn } from '../../utils/accessor';
import { Dimensions } from '../../utils/dimensions';
import { Domain, SpecDomains } from '../../utils/domain';
import { createContinuousScale, createOrdinalScale, ScaleType } from '../../utils/scales/scales';
import { BarScaleFnConfig } from '../bars/commons';
import { AreaSeriesSpec, Datum, Rotation } from '../specs';
import { getCurveFactory } from '../utils/curves';
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
    curve,
  } = areaSeriesSpec;

  const maxXWidth = (rotation === 0 || rotation === 180) ? chartDims.width : chartDims.height;
  const xScaleConfig = getScale(
    xAccessor,
    xScaleType,
    domains.xDomains[0].domain,
    0,
    maxXWidth,
    false,
    chartScalesConfig.ordinal.padding,
  );

  const maxYHeight = (rotation === 0 || rotation === 180) ? chartDims.height : chartDims.width;
  const yScaleConfig = getScale(
    yAccessors[0],
    domains.yDomain.scaleType,
    domains.yDomain.domain,
    maxYHeight,
    0,
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
      const x = xScaleConfig.scaleFn.scale(xAccessorFn(datum)) + xScaleConfig.scaleFn.bandwidth / 2;
      // to be changed to the available y0accessor
      let y0 = yScaleConfig.scaleFn.scale(0);
      let y1 = yScaleConfig.scaleFn.scale(yAccessorFn(datum));
      if (stackAccessors.length > 0) {
        const stackKey = getStackKey(datum, stackAccessors, '');
        if (stackedYValues.has(stackKey)) {
          y0 = stackedYValues.get(stackKey) || 0;
          y1 = (y1 - yScaleConfig.scaleFn.scale(0)) + y0;
        }
        stackedYValues.set(stackKey, y1);
      }
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
      .y1((datum: Datum) => datum.y1) // the real value
      .curve(getCurveFactory(curve));
  const linePathGenerator = line<{x: number, y1: number}>()
    .x((datum: Datum) => datum.x)
    .y((datum: Datum) => datum.y1)
    .curve(getCurveFactory(curve));
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
    const scaleFn = createOrdinalScale(domain as string[], min, max, padding);
    return {
      accessor,
      scaleFn,
    };
  } else {
    const scaleFn = createContinuousScale(type, domain as [number, number], min, max, clamp);
    return {
      accessor,
      scaleFn,
    };
  }
}
