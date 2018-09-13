import { extent, sum } from 'd3-array';
import { uniq } from 'lodash';
import { Domain } from '../../domains/domain';
import { ScaleType } from '../../scales';
import { BarSeriesSpec } from '../specs';

export interface YSpecDomain {
  level: number;
  domain: Domain;
  scaleType: ScaleType;
  isStacked: boolean;
}

export interface XSpecDomain {
  level: number;
  domain: Domain;
  scaleType: ScaleType;
}

export interface SpecDomains {
  x: XSpecDomain[];
  y: YSpecDomain[];
}

export function computeDomains(spec: BarSeriesSpec): SpecDomains {
  // compute x domains
  const { data,  xScaleType, yScaleType, xAccessor, yAccessors, splitSeriesAccessors = [], stackAccessors = [] } = spec;
  const orderedXAccessors = [ xAccessor, ...splitSeriesAccessors ];
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
    const scaleType = (orderedXAccessors.length === 1 && yAccessors.length === 1) ? xScaleType : ScaleType.Ordinal;
    const domain = scaleType === ScaleType.Linear ? xDomain : uniq(xDomain as string[]);
    return {
      level,
      domain,
      scaleType,
    };
  });
  if (stackAccessors.length === 0 && yAccessors.length > 1) {
    xDomains.push({
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
  if (!spec.yScaleToDataExtent && xScaleType === ScaleType.Linear) {
    yDomain = [0, yDomain[1]];
  }
  return {
    x: xDomains,
    y: [
      {
        level: 0,
        domain: yDomain,
        scaleType: yScaleType,
        isStacked: stackAccessors.length > 0,
      },
    ],
  };
}
