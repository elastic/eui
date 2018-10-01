import { nest } from 'd3-collection';
import { Accessor, getAccessorFn } from '../../data_ops/accessor';
import { Domain, SpecDomain, SpecDomains } from '../../data_ops/domain';
import { createContinuousScale, createOrdinalScale, ScaleType } from '../../data_ops/scales';
import { Dimensions } from '../../dimensions';
import { ColorScales, getColor, GetColorFn } from '../../themes/colors';
import { Theme } from '../../themes/theme';
import { BarSeriesSpec, Datum, Rotation } from '../specs';
import { BarScaleFnConfig, DEFAULT_BAR_WIDTH } from './commons';

// export interface BarGlyph {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   fill?: string;
//   opacity?: number;
//   data: Datum;
// }

export interface BarGlyphGroup {
  level: number;
  accessor: string;
  levelValue: number | string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  opacity?: number;
  data?: Datum;
  elements?: BarGlyphGroup[];
}
/**
 * The interface used for nesting data rollups
 */
interface NestRollupType {
  x: number;
  y: number;
  _isMultipleY: boolean;
  _data: any;
}
export function renderBarSeriesSpec(
  barSeriesSpec: BarSeriesSpec,
  domains: SpecDomains,
  chartDims: Dimensions,
  rotation: Rotation,
  colorScales: ColorScales,
  theme: Theme,
): BarGlyphGroup[] {
  const {
    data,
    yAccessors,
    splitSeriesAccessors = [],
    stackAccessors = [],
    colorAccessors = [],
  } = barSeriesSpec;
  const isYStacked = stackAccessors.length > 0;
  let groupingXDomains = domains.xDomains;

  if (!isYStacked) {
    groupingXDomains = domains.xDomains.slice(0, -1);
  }

  const nestedXScaleConfigs = getNestedXScaleConfigs(domains.xDomains, chartDims, theme, rotation);
  console.log(nestedXScaleConfigs);
  const maxY = rotation === 0 ? chartDims.height : chartDims.width;
  const yScaleConfig = getScale(
    yAccessors[0],
    domains.yDomain.scaleType,
    domains.yDomain.domain,
    0,
    maxY,
  );

  // group data by xAccessors and splitAccessors
  const groupedDataFn = nest<Datum, NestRollupType[]>();

  groupingXDomains.forEach((xDomain) => {
    const { accessor } = xDomain;
    groupedDataFn.key(getAccessorFn(accessor));
  });

  const xAccessorFn = getAccessorFn(domains.xDomains[domains.xDomains.length - 1].accessor);
  // const isMultipleY = yAccessors.length > 1 && !isYStacked;
  const isMultipleY = yAccessors.length > 1;
  groupedDataFn.rollup((values: Datum[]) => {
    const elements: NestRollupType[] = [];
    values.forEach((value: Datum) => {
      yAccessors.forEach((accessor) => {
        elements.push({
          x: isMultipleY ? accessor : xAccessorFn(value),
          y: getAccessorFn(accessor)(value),
          _isMultipleY: isMultipleY,
          _data: {
            ...value,
          },
        });
      });
    });
    return elements;
  });

  const groupedData = groupedDataFn.entries(data);
  // console.log(groupedData);

  const leafLevel = groupingXDomains.length;
  const specColorAccessors = colorAccessors.length > 0 ? colorAccessors : [...splitSeriesAccessors];
  const getColorFn = getColor(theme, colorScales, specColorAccessors);
  const formattedData = reformatData(
    nestedXScaleConfigs,
    yScaleConfig,
    maxY,
    leafLevel,
    getColorFn,
    chartDims.height,
    isYStacked,
  )(groupedData, 0);

  return formattedData;
}

function getNestedXScaleConfigs(domains: SpecDomain[], seriesDimensions: Dimensions, theme: Theme, rotation: Rotation) {
  const maxXWidth = rotation === 0 ? seriesDimensions.width : seriesDimensions.height;
  return domains.reduce(
    (acc, scale) => {
      const { accessor, scaleType, domain } = scale;
      if (acc.length === 0) {
        const scaleConfig = getScale(
          accessor,
          scaleType,
          domain,
          0,
          maxXWidth,
          false,
          theme.scales.ordinal.padding,
        );
        return [scaleConfig];
      } else {
        const prevScale = acc[acc.length - 1];
        const scaleConfig = getScale(
          accessor,
          scaleType,
          domain,
          0,
          prevScale.barWidth,
          false,
          theme.scales.ordinal.padding,
        );
        return [...acc, scaleConfig];
      }
    },
    [] as BarScaleFnConfig[],
  );
}

function reformatData(
  xScalesFnConfigs: BarScaleFnConfig[],
  yScalesFnConfig: BarScaleFnConfig,
  maxY: number,
  leafLevel: number,
  getColorFn: GetColorFn,
  chartHeight: number,
  isStacked = false,
) {
  return function reformat(data: Datum[] | NestRollupType[], level: number) {
    const currentLevelXScaleConfig = xScalesFnConfigs[level];
    if (level === leafLevel) {
      // we are at the leaf
      const leafXScaleConfigs = isStacked ? xScalesFnConfigs[level - 1] : currentLevelXScaleConfig;
      return formatElements(
        level,
        data,
        leafXScaleConfigs,
        yScalesFnConfig,
        maxY,
        getColorFn,
        isStacked,
      );
    }
    return (data as Datum[]).reduce((acc, nestedData) => {
      const nextLevelData = level === leafLevel - 1 ? nestedData.value : nestedData.values;
      const currentLevelScale = xScalesFnConfigs[level];
      const x = currentLevelScale.scale(nestedData.key);
      const levelData: BarGlyphGroup = {
        level,
        accessor: currentLevelXScaleConfig.accessor,
        levelValue: nestedData.key,
        x,
        y: 0,
        width: currentLevelScale.barWidth,
        height: chartHeight,
        elements: reformat(nextLevelData, level + 1),
      };
      return [...acc, levelData];
    }, []);
  };
}

function formatElements(
  level: number,
  elements: NestRollupType[],
  xScalesFnConfig: BarScaleFnConfig,
  yScalesFnConfig: BarScaleFnConfig,
  maxY: number,
  getColorFn: GetColorFn,
  isStacked = false,
) {
  const barWidth = xScalesFnConfig.barWidth;
  return elements.reduce(
    (acc, element) => {
      const height = yScalesFnConfig.scale(element.y);
      const x = isStacked ? 0 : xScalesFnConfig.scale(element.x);
      let y = maxY - height;
      if (acc.length > 0 && isStacked) {
        y = acc[acc.length - 1].y - height;
      }
      const currentElement = {
        level,
        accessor: xScalesFnConfig.accessor,
        levelValue: element.y,
        x,
        y,
        width: barWidth,
        height,
        fill: getColorFn(element._data, element._isMultipleY ? `${element.x}` : undefined),
        data: {
          ...element._data,
        },
      };
      return [...acc, currentElement];
    },
    [] as BarGlyphGroup[],
  );
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
    const barWidth = DEFAULT_BAR_WIDTH;
    return {
      accessor,
      scale,
      barWidth,
    };
  }
}
