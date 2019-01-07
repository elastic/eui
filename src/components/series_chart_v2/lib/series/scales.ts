import { GroupId } from '../utils/ids';
import {
  createContinuousScale,
  createOrdinalScale,
  Scale,
  ScaleType,
} from '../utils/scales/scales';
import { XDomain } from './domains/x_domain';
import { YDomain } from './domains/y_domain';
import { FormattedDataSeries } from './series';

/**
 * Count how many series are clustered
 * @param stacked all the stacked formatted dataseries
 * @param nonStacked all the non-stacked formatted dataseries
 */
export function countClusteredSeries(
  stacked: FormattedDataSeries[],
  nonStacked: FormattedDataSeries[],
): {
  nonStackedGroupCount: number;
  stackedGroupCount: number;
  totalGroupCount: number;
} {
  // along x axis, we count one "space" per bar series.
  // we ignore the points, areas, lines as they are
  // aligned with the x value and doesn't occupy space
  const nonStackedGroupCount = nonStacked.reduce((acc, ns) => {
    return acc + ns.counts.barSeries;
  }, 0);
  // count stacked bars groups as 1 per group
  const stackedGroupCount = stacked.reduce((acc, ns) => {
    return acc + (ns.counts.barSeries > 0 ? 1 : 0);
  }, 0);
  const totalGroupCount = nonStackedGroupCount + stackedGroupCount;
  return {
    nonStackedGroupCount,
    stackedGroupCount,
    totalGroupCount,
  };
}

/**
 * Compute the x scale used to align geometries to the x axis.
 * @param xDomain the x domain
 * @param totalGroupCount the total number of grouped series
 * @param axisLength the length of the x axis
 */
export function computeXScale(
  xDomain: XDomain,
  totalGroupCount: number,
  minRange: number,
  maxRange: number,
): Scale {
  const { scaleType, minInterval, domain, isBandScale } = xDomain;
  if (scaleType === ScaleType.Ordinal) {
    const dividend = totalGroupCount > 0 ? totalGroupCount : 1;
    const bandwitdh = maxRange / (domain.length * dividend);
    return createOrdinalScale(domain, minRange, maxRange, 0, bandwitdh);
  } else {
    if (isBandScale && minInterval !== null) {
      const intervalCount = (domain[1] - domain[0]) / minInterval;
      const bandwidth = maxRange / (intervalCount + 1);
      const finalLength = maxRange - bandwidth;
      console.log({domain});
      return createContinuousScale(
        scaleType,
        domain,
        minRange,
        finalLength,
        bandwidth / totalGroupCount,
        false,
        minInterval,
      );
    } else {
      return createContinuousScale(scaleType, domain, minRange, maxRange, 0);
    }
  }
}

/**
 * Compute the y scales, one per groupId for the y axis.
 * @param yDomains the y domains
 * @param axisLength the axisLength of the y axis
 */
export function computeYScales(yDomains: YDomain[], minRange: number, maxRange: number): Map<GroupId, Scale> {
  const yScales: Map<GroupId, Scale> = new Map();

  yDomains.forEach((yDomain) => {
    const yScale = createContinuousScale(yDomain.scaleType, yDomain.domain, minRange, maxRange);
    yScales.set(yDomain.groupId, yScale);
  });

  return yScales;
}
