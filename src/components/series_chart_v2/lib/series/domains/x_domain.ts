import { identity } from 'lodash';
import { computeContinuousDataDomain, computeOrdinalDataDomain } from '../../utils/domain';
import { ScaleType } from '../../utils/scales/scales';
import { BasicSeriesSpec } from '../specs';
import { BaseDomain } from './domain';

export type XDomain = BaseDomain & {
  type: 'xDomain';
  /* if the scale needs to be a band scale: used when displaying bars */
  isBandScale: boolean;
  /* the minimum interval of the scale if not-ordinal band-scale*/
  minInterval: number | null;
};

/**
 * Merge X domain value between a set of chart specification.
 */
export function mergeXDomain(
  specs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType' | 'xDomain'>>,
  xValues: Set<any>,
): XDomain {
  const mainXScaleType = convertXScaleTypes(specs);
  if (!mainXScaleType) {
    throw new Error('Cannot merge the domain. Missing X scale types');
  }
  // TODO
  // compute the domain merging the configured static domains

  const values = [...xValues.values()];
  let seriesXComputedDomains;
  let minInterval = null;
  if (mainXScaleType.scaleType === ScaleType.Ordinal) {
    seriesXComputedDomains = computeOrdinalDataDomain(values, identity, false, true);
  } else {
    seriesXComputedDomains =  computeContinuousDataDomain(values, identity, true);
    minInterval = findMinInterval(values);
  }
  return {
    type: 'xDomain',
    scaleType: mainXScaleType.scaleType,
    isBandScale: mainXScaleType.isBandScale,
    domain: seriesXComputedDomains,
    minInterval,
  };
}

/**
 * Find the minimum interval between numerical xValues that can be used
 * to display a bar chart in a linear scale.
 */
export function findMinInterval(xValues: number[]): number | null {
  const sortedValues = xValues.slice().sort();
  const sortedValuesLength = sortedValues.length - 1;
  let i;
  let minInterval = null;
  for (i = 0; i < sortedValuesLength; i++) {
    const current = sortedValues[i];
    const next = sortedValues[i + 1];
    const interval = next - current;
    if (minInterval === null) {
      minInterval = interval;
    } else {
      minInterval = Math.min(minInterval, interval);
    }
  }
  return minInterval;
}

/**
 * Convert the scale types of a set of specification to a generic one.
 * If there is at least one bar series type, than the response will specity
 * that the coerched scale is a `scaleBand` (each point needs to have a surrounding empty
 * space to draw the bar width).
 * If there are multiple continuous scale types, is coerched to linear.
 * If there are at least one Ordinal scale type, is coerched to ordinal.
 * If none of the above, than coerch to the specified scale.
 * @returns {ChartScaleType}
 */
export function convertXScaleTypes(
  specs: Array<Pick<BasicSeriesSpec, 'seriesType' | 'xScaleType'>>,
): Pick<XDomain, 'scaleType' | 'isBandScale'> | null {
  const seriesTypes = new Set<string>();
  const scaleTypes = new Set<ScaleType>();
  specs.forEach((spec) => {
    seriesTypes.add(spec.seriesType);
    scaleTypes.add(spec.xScaleType);
  });
  if (specs.length === 0 || seriesTypes.size === 0 || scaleTypes.size === 0) {
    return null;
  }
  const isBandScale = seriesTypes.has('bar');
  if (scaleTypes.size === 1) {
    return { scaleType: [...scaleTypes.values()][0], isBandScale };
  }

  if (scaleTypes.size > 1 && scaleTypes.has(ScaleType.Ordinal)) {
    return { scaleType: ScaleType.Ordinal, isBandScale };
  }
  return { scaleType: ScaleType.Linear, isBandScale };
}
