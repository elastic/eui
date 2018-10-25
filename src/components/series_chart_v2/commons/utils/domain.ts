import { extent, sum } from 'd3-array';
import { nest } from 'd3-collection';
import { uniq } from 'lodash';
import { Accessor, AccessorFn } from './accessor';
import { ScaleType } from './scales';

export type Domain = number[] | string[] | [number, number] | [undefined, undefined];

export interface SpecDomain {
  accessor: Accessor;
  level: number;
  domain: Domain;
  scaleType: ScaleType;
  isStacked?: boolean;
}

export interface ColorDomain {
  accessors: Accessor[];
  yAccessors?: Accessor[];
  domain: string[];
  scaleType: ScaleType;
}

export interface SpecDomains {
  xDomains: SpecDomain[];
  yDomain: SpecDomain;
  colorDomain: ColorDomain;
}

export interface SeriesScales {
  groupLevel: number;
  xDomain: Domain;
  yDomain?: Domain;
  xScaleType: ScaleType;
  yScaleType?: ScaleType;
  xAccessor: Accessor;
  yAccessor?: Accessor;
}

export function computeOrdinalDataDomain(
  data: any[],
  accessor: AccessorFn,
  sorted?: boolean,
): string[] | number[] {
  const domain = data.map(accessor);
  const uniqueValues = uniq(domain);
  return sorted ? uniqueValues.sort() : uniqueValues;
}

export function computeContinuousDataDomain(
  data: any[],
  accessor: AccessorFn,
  scaleToExtent = false,
): [number, number] | [undefined, undefined] {
  const range = extent(data, accessor);
  return scaleToExtent ? range : [0, range[1] || 0];
}

export function computeStackedContinuousDomain(
  data: any[],
  xAccessor: AccessorFn,
  yAccessor: AccessorFn,
  scaleToExtent = false,
): any {
  const groups = nest<any, number>()
    .key((datum: any) => `${xAccessor(datum)}`)
    .rollup((values: any) => {
      return sum(values, yAccessor);
    })
    .entries(data);
  const cumulativeSumAccessor = (d: any) => d.value;
  return computeContinuousDataDomain(groups, cumulativeSumAccessor, scaleToExtent);
}
