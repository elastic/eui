import { extent, sum } from 'd3-array';
import { uniq } from 'lodash';
import { Accessor } from '../../domains/accessor';
import { Domain } from '../../domains/domain';
import { ScaleType } from '../../scales';
import { BarSeriesSpec } from '../specs';

export interface SpecDomain {
  accessor: Accessor;
  level: number;
  domain: Domain;
  scaleType: ScaleType;
  isStacked?: boolean;
}

export interface SpecDomains {
  xDomains: SpecDomain[];
  yDomain: SpecDomain;
}

export function computeDomains(spec: BarSeriesSpec): SpecDomains {
  // compute x domains
  const { data,  xScaleType, yScaleType, xAccessor, yAccessors, splitSeriesAccessors = [], stackAccessors = [] } = spec;

  // if we want to stack
  let nonStackedSplitAccessors = splitSeriesAccessors;
  if (yAccessors.length === 1 && stackAccessors.length > 0) {
    nonStackedSplitAccessors = splitSeriesAccessors.slice(0, -1);
  }
  const orderedXAccessors = [ xAccessor, ...nonStackedSplitAccessors ];
  const orderedXDomains: Domain[] = [];
  let yDomain: any[] = [];
  const groupedData: Map<string, any[]> = new Map();
  data.map((datum) => {
    // compute x domains
    orderedXAccessors.forEach((accessor, index) => {
      if (orderedXAccessors.length === 1 && yAccessors.length === 1 && xScaleType === ScaleType.Linear) {
        const value = datum[accessor];
        const [min, max] = (orderedXDomains[0] as [number, number]) || [value, value];
        orderedXDomains[index] = [Math.min(min, value), Math.max(max, value)];
      } else {
        if (!orderedXDomains[index]) {
          orderedXDomains[index] = [];
        }
        const value = datum[accessor];
        (orderedXDomains[index] as any[]).push(value);
      }
    });
    const yValues = yAccessors.map((accessor) => {
      return datum[accessor];
    });
    // compute y domain
    if (yScaleType === ScaleType.Ordinal) {
      yDomain = [...yDomain, ...yValues];
    } else {
      if (stackAccessors.length > 0) {
        const stackKey = stackAccessors.map((accessor) => String(datum[accessor])).join('--');
        if (!groupedData.has(stackKey)) {
          groupedData.set(stackKey, []);
        }
        const prevValues = groupedData.get(stackKey)!;
        groupedData.set(stackKey, [...prevValues, ...yValues]);
      } else {
        const yExtent = extent(yValues);
        if (yDomain.length === 0) {
          yDomain = [yExtent[0], yExtent[1]];
        }
        const [min, max] = yDomain;
        yDomain = [Math.min(min, yExtent[0]), Math.max(max, yExtent[1])];
      }
    }
  });
  const xDomains = orderedXDomains.map((xDomain, level) => {
    let domainConvertedScale;
    if (orderedXAccessors.length === 1 && yAccessors.length === 1) {
      domainConvertedScale = xScaleType;
    } else {
      domainConvertedScale = ScaleType.Ordinal;
    }
    const domain = domainConvertedScale === ScaleType.Linear ? xDomain : uniq(xDomain as string[]);
    return {
      accessor: orderedXAccessors[level],
      level,
      domain,
      scaleType: domainConvertedScale,
    };
  });

  if (stackAccessors.length === 0 && yAccessors.length > 1) {
    xDomains.push({
      accessor: 'y',
      level: xDomains.length,
      scaleType: ScaleType.Ordinal,
      domain: [...yAccessors ],
    });
  }
  if (stackAccessors.length > 0) {
    const groupedDataArray = Array.from(groupedData.values());

    const stackedDomain = groupedDataArray.map((value) => {
      return sum(value);
    });
    yDomain = extent(stackedDomain);
  }
  if (!spec.yScaleToDataExtent) {
    yDomain = [0, yDomain[1]];
  }
  return {
    xDomains,
    yDomain: {
      accessor: 'y',
      level: 0,
      domain: yDomain,
      scaleType: yScaleType,
      isStacked: stackAccessors.length > 0,
    },
  };
}
