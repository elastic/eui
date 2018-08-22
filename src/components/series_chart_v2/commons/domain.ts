import { extent } from 'd3-array';
import { sortedUniq, uniq } from 'lodash';

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
