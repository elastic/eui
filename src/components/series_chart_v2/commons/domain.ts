import { extent } from 'd3-array';
import { sortedUniq, uniq } from 'lodash';
import { DataSeriesSpec, SeriesDomains, SeriesScales } from '../commons/specs';
import { ScaleType } from './scales';

export type OrdinalAccessor = (d: any) => any;
export type ContinuousAccessor = (d: any) => number | null | undefined;
export type Accessor = OrdinalAccessor | ContinuousAccessor;
// type ContinuousScaleTypes = ScaleType.Linear | ScaleType.Sqrt | ScaleType.Log

export function computeDataDomain(
  data: any[],
  accessor: Accessor,
  scaleType: ScaleType,
  sorted?: boolean,
) {
  if (scaleType === ScaleType.Ordinal) {
    return computeOrdinalDataDomain(data, accessor, sorted);
  }
  return computeContinuousDataDomain(data, accessor);
}

function computeOrdinalDataDomain(
  data: any[],
  accessor: OrdinalAccessor,
  sorted?: boolean,
): string[] | number[] {
  const domain = data.map(accessor);
  return sorted ? sortedUniq(domain) : uniq(domain);
}

function computeContinuousDataDomain(
  data: any[],
  accessor: ContinuousAccessor,
): [number, number] | [undefined, undefined] {
  return extent(data, accessor);
}

export function computeSeriesDomains(seriesSpec: DataSeriesSpec): SeriesDomains {
  const { xScaleType, yScaleType, xAccessor, yAccessor, data } = seriesSpec;
  const xDomain = computeDataDomain(data, xAccessor, xScaleType);
  const yDomain = computeDataDomain(data, yAccessor, yScaleType);
  return {
    xDomain,
    yDomain,
  };
}

/**
 * Merge passed domain into a multidomain. If save scaletype is available,
 * then the merge is on the same scale type, if not ordinal scale type is used
 * @return [description]
 */
export function mergeGlobalDomains(currentSeriesScales: SeriesScales, seriesScales: SeriesScales) {
  // TODO
}
