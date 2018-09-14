import { nest } from 'd3-collection';
import { Dimensions } from '../../dimensions';
import { Accessor, getAccessorFn } from '../../domains/accessor';
import { Domain } from '../../domains/domain';
import {
  createContinuousScale,
  createOrdinalScale,
  ScaleType,
} from '../../scales';
import { BarSeriesSpec } from '../specs';
import { BarScaleFnConfig, DEFAULT_BAR_WIDTH } from './commons';
import { SpecDomain, SpecDomains } from './domains';

export interface BarGlyph {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: string;
  opacity?: number;
}

export interface BarGlyphGroup {
  level: number;
  accessor: string;
  levelValue: number | string;
  translateX: number;
  translateY: number;
  elements: BarGlyph[] | BarGlyphGroup[];
}
/**
 * The interface used for nesting data rollups
 */
interface NestRollupType {
  x: number;
  y: number;
  _data: any;
}
export function renderBarSeriesSpec(
  barSeriesSpec: BarSeriesSpec,
  domains: SpecDomains,
  chartDims: Dimensions,
): BarGlyphGroup[] {
  const {
    data,
    yAccessors,
    stackAccessors = [],
  } = barSeriesSpec;
  const isYStacked = stackAccessors.length > 0;
  let groupingXDomains = domains.xDomains;

  if (!isYStacked) {
    groupingXDomains = domains.xDomains.slice(0, -1);
  }

  const nestedXScaleConfigs = getNestedXScaleConfigs(domains.xDomains, chartDims);
  const yScaleConfig = getScale(yAccessors[0], domains.yDomain.scaleType, domains.yDomain.domain, 0, chartDims.height);

  // console.log(nestedXScales);
  // console.log(yScaleConfig.scale.range());
  // compute composed scales

  // group data by xAccessors and splitAccessors
  const groupedDataFn = nest<any, NestRollupType[]>();

  groupingXDomains.forEach((xDomain) => {
    const { accessor } = xDomain;
    groupedDataFn.key(getAccessorFn(accessor));
  });

  const xAccessorFn = getAccessorFn(domains.xDomains[domains.xDomains.length - 1].accessor);
  const isMultipleY = yAccessors.length > 1 && !isYStacked;
  // console.log({isMultipleY});
  groupedDataFn.rollup((values: any) => {
    const elements: NestRollupType[] = [];
    values.forEach((value: any) => {
      yAccessors.forEach((accessor) => {
        elements.push({
          x: isMultipleY ? accessor : xAccessorFn(value),
          y: getAccessorFn(accessor)(value),
          _data: value,
        });
      });
    });
    return elements;
  });

  const groupedData = groupedDataFn.entries(data);
  // console.log(`Grouped data: ${JSON.stringify(groupedData, null, 2)}`);

  const leafLevel = groupingXDomains.length;
  const formattedData = reformatData(
    nestedXScaleConfigs,
    yScaleConfig,
    chartDims,
    leafLevel,
    isYStacked,
  )(groupedData, 0);
  // console.log(`formattedData: ${JSON.stringify(formattedData, null, 2)}`);
  return formattedData;

}

function getNestedXScaleConfigs(domains: SpecDomain[], seriesDimensions: Dimensions) {
  return domains.reduce((acc, scale) => {
    const { accessor, scaleType, domain } = scale;
    if (acc.length === 0) {
      const scaleConfig = getScale(accessor, scaleType, domain, 0, seriesDimensions.width);
      return [scaleConfig];
    } else {
      const prevScale = acc[acc.length - 1];
      const scaleConfig = getScale(accessor, scaleType, domain, 0, prevScale.barWidth);
      return [...acc, scaleConfig];
    }
  },
  [] as BarScaleFnConfig[]);
}

function reformatData(
  xScalesFnConfigs: BarScaleFnConfig[],
  yScalesFnConfig: BarScaleFnConfig,
  seriesDimensions: Dimensions,
  leafLevel: number,
  isStacked = false,
) {

  return function reformat(data: any[], level: number) {
    // console.log({level}, {leafLevel} , xScalesFnConfigs.length);
    const currentLevelXScaleConfig = xScalesFnConfigs[level];
    if (level === leafLevel) {
      // we are at the leaf
      // console.log(`i'm on leaf ${data}`);
      const leafXScaleConfigs = isStacked ? xScalesFnConfigs[level - 1] : currentLevelXScaleConfig;
      return formatElements(
        data,
        leafXScaleConfigs,
        yScalesFnConfig,
        seriesDimensions,
        isStacked,
      );
    }
    return data.reduce((acc, nestedData) => {
      const nextLevelData = level === leafLevel - 1 ? nestedData.value : nestedData.values;
      // console.log(`next level data ${JSON.stringify(nextLevelData)}`);
      const levelData: any = {
        level,
        accessor: currentLevelXScaleConfig.accessor,
        levelValue: nestedData.key,
        translateX: acc.length * currentLevelXScaleConfig.barWidth,
        translateY: 0,
        elements: reformat(
          nextLevelData,
          level + 1,
        ),
      };
      return [...acc, levelData];
    }, []);
  };
}

function formatElements(
  elements: NestRollupType[],
  xScalesFnConfig: BarScaleFnConfig,
  yScalesFnConfig: BarScaleFnConfig,
  seriesDimensions: Dimensions,
  isStacked = false,
  ) {
  const barWidth = xScalesFnConfig.barWidth;
  // console.log({domain: xScalesFnConfig.scale.domain(), elements });
  // if (isStacked) {
  //   barWidth = xScalesFnConfig.barWidth * xScalesFnConfig.scale.domain().length;
  // }
  return elements.reduce((acc, element, index) => {
    const height = yScalesFnConfig.scale(element.y);
    let x = 0;
    let y = seriesDimensions.height - height;
    if (acc.length > 0 && !isStacked) {
      x = xScalesFnConfig.scale(element.x);
    }
    if (acc.length > 0 && isStacked) {
      y = acc[acc.length - 1].y - height;
    }
    // console.log({x});
    const currentElement = {
      x,
      y,
      width: barWidth,
      height,
      // __data: element,
    };
    return [...acc, currentElement];
  }, [] as BarGlyph[]);
}

export function getScale(
  accessor: Accessor,
  type: ScaleType,
  domain: Domain,
  min: number,
  max: number,
  clamp?: boolean,
): BarScaleFnConfig {
  if (type === ScaleType.Ordinal) {
    const scale = createOrdinalScale(domain as string[], min, max);
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
