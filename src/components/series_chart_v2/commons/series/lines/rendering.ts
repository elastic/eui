import { line } from 'd3-shape';
import { ColorScales, getColor } from '../../themes/colors';
import { ColorConfig, ScalesConfig } from '../../themes/theme';
import { Accessor, AccessorFn, getAccessorFn } from '../../utils/accessor';
import { Dimensions } from '../../utils/dimensions';
import { Domain, SpecDomains } from '../../utils/domain';
import { createContinuousScale, createOrdinalScale, ScaleType } from '../../utils/scales';
import { BarScaleFnConfig } from '../bars/commons';
import { Datum, LineSeriesSpec, Rotation } from '../specs';
export interface LineGlyph {
  data: Datum[];
  points: Array<{x: number, y: number}>;
  path: string;
  color?: string;
}

export function renderLineSeriesSpec(
  lineSeriesSpec: LineSeriesSpec,
  domains: SpecDomains,
  chartDims: Dimensions,
  rotation: Rotation,
  colorScales: ColorScales,
  chartColorsConfig: ColorConfig,
  chartScalesConfig: ScalesConfig,
): LineGlyph[] {
  const {
    data,
    yAccessors,
    xAccessor,
    xScaleType,
    splitSeriesAccessors = [],
    stackAccessors = [],
    colorAccessors = [],
  } = lineSeriesSpec;

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
  const lineSeries = new Map<string, LineGlyph>();
  const stackedYValues = new Map<string, number>();
  data.forEach((datum: Datum) => {
    const splitSeriesKey = getSplitSeriesKey(datum, splitSeriesAccessorsFns);
    yAccessorsFns.forEach((yAccessorFn, index) => {
      const yAccessor = yAccessors[index];
      const seriesKey = getSeriesKey(splitSeriesKey, yAccessor);
      const x = xScaleConfig.scale(xAccessorFn(datum)) + xScaleConfig.barWidth / 2;
      let y = yScaleConfig.scale(yAccessorFn(datum));
      if (stackAccessors.length > 0) {
        const stackKey = getStackKey(datum, stackAccessors, '');
        y = stackedYValues.has(stackKey) ? (stackedYValues.get(stackKey) || 0) + y : y;
        stackedYValues.set(stackKey, y);
      }
      y = maxYHeight - y;
      let lineGlyph: LineGlyph;
      if (lineSeries.has(seriesKey)) {
        lineGlyph = updateLinePoints(lineSeries.get(seriesKey)!, x, y);
      } else {
        lineGlyph = createLineGlyph(x, y, getColorFn(datum, yAccessors.length > 1 ? yAccessor : undefined));
      }
      lineSeries.set(seriesKey, lineGlyph);
    });
  });
  const pathGenerator = line<{x: number, y: number}>()
      .x((datum: Datum) => datum.x)
      .y((datum: Datum) => datum.y);
  const glyphs = Array.from(lineSeries.values()).map((lineGlyph) => {
    const path = pathGenerator(lineGlyph.points) || '';
    return {
      ...lineGlyph,
      path,
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
function updateLinePoints(lineGlyph: LineGlyph, x: number, y: number): LineGlyph {
  return {
    ...lineGlyph,
    points: [
      ...lineGlyph.points,
      { x, y },
    ],
  };
}
function createLineGlyph( x: number, y: number, color: string): LineGlyph {
  return {
    points: [
      { x, y },
    ],
    data: [],
    path: '',
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
