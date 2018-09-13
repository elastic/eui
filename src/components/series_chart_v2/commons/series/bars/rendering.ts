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
import { SpecDomains, XSpecDomain } from './domains';

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

export function renderBarSeriesSpec(
  barSeriesSpec: BarSeriesSpec,
  domains: SpecDomains,
  chartDims: Dimensions,
): BarGlyphGroup[] {
  const {
    data,
    xAccessor,
    yAccessors,
    splitSeriesAccessors = [],
    stackAccessors,
  } = barSeriesSpec;

  let requiredSplitSeriesAccessors = splitSeriesAccessors;
  const requiredXDomains = domains.x;
  if (yAccessors.length === 1 && splitSeriesAccessors.length === 1) {
    requiredSplitSeriesAccessors = [];
    // requiredXDomains = domains.x.slice(0, -1);
  }
  if (yAccessors.length === 1 && splitSeriesAccessors.length > 1) {
    requiredSplitSeriesAccessors = splitSeriesAccessors.slice(0, -1);
    // requiredXDomains = domains.x.slice(0, -1);
  }

  const xNestedScales = getXNestedScales(
    requiredXDomains,
    [xAccessor, ...requiredSplitSeriesAccessors],
    chartDims,
  );
  // fixare questo yaccessors deve essere gestito per creare la giusta scala....

  const yScaleConfig = getScale(yAccessors[0], domains.y[0].scaleType, domains.y[0].domain, 0, chartDims.height);

  console.log(requiredXDomains);
  // console.log(xNestedScales);
  // console.log(yScaleConfig.scale.range());
  // compute composed scales

  // const yDomain = domains.y[0]; // min and max 1 y domain
  interface RollupType {
    x: number;
    y: number;
  }
  // group data by splitAccessors and xaccessors
  const groupedDataFn = nest<any, RollupType[]>();
  groupedDataFn.key(getAccessorFn(xAccessor));

  requiredSplitSeriesAccessors.forEach((accessor) => {
    groupedDataFn.key(getAccessorFn(accessor));
  });

  // if multiple y, rollup this way..... siamo sicuri? cosa succede se yAccessor
  // ha un solo accessor, come esce il rollup?
  if (yAccessors.length > 1) {
    groupedDataFn.rollup((values: any) => {
      const elements: RollupType[] = [];
      values.forEach((value: any) => {
        yAccessors.forEach((accessor) => {
          elements.push({
            x: value.x,
            y: getAccessorFn(accessor)(value),
          });
        });
      });
      return elements;
    });
  }

  const groupedData = groupedDataFn.entries(data);
  console.log(`Grouped data: ${JSON.stringify(groupedData, null, 2)}`);
  const isYStacked = Boolean(stackAccessors) && yAccessors.length > 1;
  console.log({isYStacked});
  const formattedData = reformatData(groupedData, 0, xNestedScales, yScaleConfig, chartDims, isYStacked);
  console.log(`formattedData: ${JSON.stringify(formattedData, null, 2)}`);
  return formattedData;

}

function getXNestedScales(
  domains: XSpecDomain[],
  accessors: Accessor[],
  seriesDimensions: Dimensions,
) {
  return domains.reduce(
    (acc, scale) => {
      const { scaleType, domain, level } = scale;
      const accessor = accessors[level];
      if (acc.length === 0) {
        const scaleConfig = getScale(accessor, scaleType, domain, 0, seriesDimensions.width);
        return [scaleConfig];
      } else {
        const prevScale = acc[acc.length - 1];
        const scaleConfig = getScale(accessor, scaleType, domain, 0, prevScale.barWidth);
        return [...acc, scaleConfig];
      }
    },
    [] as BarScaleFnConfig[],
  );
}

function reformatData(
  data: any,
  level: any,
  xScalesFnConfigs: BarScaleFnConfig[],
  yScalesFnConfig: BarScaleFnConfig,
  seriesDimensions: Dimensions,
  isStacked = false,
  ) {
  const xLevelScale = xScalesFnConfigs[level];

  if (Array.isArray(data) && data[0].value) {
    // we are in a rollup (nY accessors)
    console.log(`on rollup ${JSON.stringify(xScalesFnConfigs[level])}`);
    return data.reduce((acc, nestedData: any) => {
      const elements = formatElements(
        nestedData.value,
        xScalesFnConfigs[isStacked ? level + 1 : level],
        yScalesFnConfig,
        seriesDimensions,
        isStacked,
      );
      const levelData: any = {
        level,
        accessor: xLevelScale.accessor,
        levelValue: nestedData.key,
        translateX: acc.length * xLevelScale.barWidth,
        translateY: 0,
        elements,
      };
      return [...acc, levelData];
    }, []);
  }
  if (Array.isArray(data) && data[0].values) { // is a root array
    return data.reduce((acc, nestedData: any) => {
      const levelData: any = {
        level,
        accessor: xLevelScale.accessor,
        levelValue: nestedData.key,
        translateX: acc.length * xLevelScale.barWidth,
        translateY: 0,
        elements: reformatData(
          nestedData.values,
          level + 1,
          xScalesFnConfigs,
          yScalesFnConfig,
          seriesDimensions,
          isStacked,
        ),
      };
      return [...acc, levelData];
    }, []);
  }

  return formatElements(data, xScalesFnConfigs[isStacked ? level + 1 : level ], yScalesFnConfig, seriesDimensions, isStacked);
}

function formatElements(
  elements: any,
  xScalesFnConfig: BarScaleFnConfig,
  yScalesFnConfig: BarScaleFnConfig,
  seriesDimensions: Dimensions,
  isStacked = false,
  ) {
  const barWidth = xScalesFnConfig.barWidth;
  // if (isStacked) {
  //   barWidth = xScalesFnConfig.barWidth * xScalesFnConfig.scale.domain().length;
  // }
  return elements.reduce((acc, element) => {
    const height = yScalesFnConfig.scale(element.y);
    let x = 0;
    let y = seriesDimensions.height - height;
    if (acc.length > 0 && !isStacked) {
      x = acc[acc.length - 1].width;
    }
    if (acc.length > 0 && isStacked) {
      y = acc[acc.length - 1].y - height;
    }
    const currentElement = {
      x,
      y,
      width: barWidth,
      height,
      // __data: element,
    };
    return [...acc, currentElement];
  }, []);
  return elements;
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
