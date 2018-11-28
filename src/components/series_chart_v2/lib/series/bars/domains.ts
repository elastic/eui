import { extent, sum } from 'd3-array';
import { uniq } from 'lodash';
import { Accessor, getAccessorFn } from '../../utils/accessor';
import { Domain, SpecDomains } from '../../utils/domain';
import { ScaleType } from '../../utils/scales/scales';
import { BarSeriesSpec } from '../specs';

/**
 * Compute the domains configuration based for a bar series spec.
 * Depending on groupings and stacking, the resulting domains will reflect
 * the number of group levels required to correctly render data.
 * @param spec the BarSeriesSpec
 * @return SpecDomains
 */
export function computeDataDomain(spec: BarSeriesSpec): SpecDomains {
  // compute x domains
  const {
    data,
    xScaleType,
    yScaleType,
    xAccessor,
    yAccessors,
    splitSeriesAccessors = [],
    stackAccessors = [],
    colorAccessors = [],
  } = spec;
  const stackedData: Map<string, any[]> = new Map();
  const colorKeys: Set<string> = new Set();
  let yDomain: any[] = [];

  let nonStackedSplitAccessors = splitSeriesAccessors;
  if (yAccessors.length === 1 && stackAccessors.length > 0) {
    // if we are going to stack elements, we need to remove the last splitted series.
    // because this is the one used to stack elements together
    nonStackedSplitAccessors = splitSeriesAccessors.slice(0, -1);
  }
  const orderedXAccessors = [xAccessor, ...nonStackedSplitAccessors];
  const orderedXDomains: Domain[] = [];
  let configuredColorAccessors: Accessor[];
  if (colorAccessors.length > 0) {
    configuredColorAccessors = colorAccessors;
  } else {
    configuredColorAccessors = splitSeriesAccessors;
  }

  data.map((datum) => {
    // computing the xDomain of each splitted series
    orderedXAccessors.forEach((accessor, index) => {
      if (
        orderedXAccessors.length === 1 &&
        yAccessors.length === 1 &&
        xScaleType === ScaleType.Linear
      ) {
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
    // getting all the y values
    const yValues = yAccessors.map((accessor) => {
      return datum[accessor];
    });
    // compute y domain
    if (spec.yDomain) {
      yDomain = spec.yDomain;
    } else {
      // TODO check this, the y value can be ordinal only when using point series.
      if (yScaleType === ScaleType.Ordinal) {
        yDomain = [...yDomain, ...yValues];
      } else {
        // computing the stack value
        if (stackAccessors.length > 0) {
          const stackKey = stackAccessors.map((accessor) => String(datum[accessor])).join('--');
          if (!stackedData.has(stackKey)) {
            stackedData.set(stackKey, []);
          }
          const prevValues = stackedData.get(stackKey)!;
          stackedData.set(stackKey, [...prevValues, ...yValues]);
        } else {
          const yExtent = extent(yValues);
          if (yDomain.length === 0) {
            yDomain = [yExtent[0], yExtent[1]];
          }
          const [min, max] = yDomain;
          yDomain = [Math.min(min, yExtent[0]), Math.max(max, yExtent[1])];
        }
      }
    }

    const colorKey = configuredColorAccessors.map((accessor) => getAccessorFn(accessor)(datum));
    if (yAccessors.length > 1) {
      yAccessors.forEach((yAccessor) => {
        colorKeys.add([...colorKey, yAccessor].join('--'));
      });
    } else {
      colorKeys.add(colorKey.join('--'));
    }

  });
  if (stackAccessors.length > 0) {
    const stackedDataArray = Array.from(stackedData.values());

    const stackedDomain = stackedDataArray.map((value) => {
      return sum(value);
    });
    yDomain = extent(stackedDomain);
  }
  if (!spec.yScaleToDataExtent) {
    yDomain = [0, yDomain[1]];
  }
  const xDomains = orderedXDomains.map((xDomain, level) => {
    let domainConvertedScale;
    if (orderedXAccessors.length === 1 && yAccessors.length === 1) {
      domainConvertedScale = xScaleType;
    } else {
      domainConvertedScale = ScaleType.Ordinal;
    }
    let domain: Domain = [];
    if (level === 0 && spec.xDomain) {
      domain = spec.xDomain;
    } else {
      domain = domainConvertedScale === ScaleType.Linear ? xDomain : uniq(xDomain as string[]);
    }
    return {
      accessor: orderedXAccessors[level],
      level,
      domain,
      scaleType: domainConvertedScale,
    };
  });

  if (stackAccessors.length === 0 && yAccessors.length > 1) {
    xDomains.push({
      accessor: 'groupedY',
      level: xDomains.length,
      scaleType: ScaleType.Ordinal,
      domain: [...yAccessors],
    });
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
    colorDomain: {
      accessors: configuredColorAccessors,
      yAccessors: yAccessors.length > 1 ? yAccessors : undefined,
      domain: [...colorKeys],
      scaleType: ScaleType.Ordinal,
    },
  };
}
