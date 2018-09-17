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

export interface SpecDomains {
  xDomains: SpecDomain[];
  yDomain: SpecDomain;
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

// export type OrdinalAccessor = (d: any) => any;
// export type ContinuousAccessor = (d: any) => number;
// export type Accessor = OrdinalAccessor | ContinuousAccessor;
// type ContinuousScaleTypes = ScaleType.Linear | ScaleType.Sqrt | ScaleType.Log

// export function computeDataDomain(
//   data: any[],
//   xAccessor: Accessor,
//   yAccessor: Accessor,
//   scaleType: ScaleType,
//   scaleToExtent = false,
//   sorted = false,
//   stackAccessor?: Accessor,
// ) {
//   if (scaleType === ScaleType.Ordinal) {
//     return computeOrdinalDataDomain(data, accessor as OrdinalAccessor, sorted);
//   }
//   if (stackAccessor) {
//     return computeStackedContinuousDomain(data, xAccessor, yAccessor, scaleToExtent);
//   } else {
//     return computeContinuousDataDomain(data, accessor as ContinuousAccessor, scaleToExtent);
//   }
// }

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

// export function computeSeriesDomains(seriesSpec: DataSeriesSpec): SeriesScales[] {
//   const {
//     xScaleType,
//     yScaleType,
//     xAccessor,
//     yAccessor,
//     stackAccessor,
//     groupAccessors,
//     data,
//     scaleToExtent,
//   } = seriesSpec;
//   const isGrouped = groupAccessors && groupAccessors.length > 0;

//   let mainYDomain;
//   if (stackAccessor) {
//     if (isGrouped) {
//       mainYDomain = computeStackedContinuousDomain(data, stackAccessor, yAccessor, scaleToExtent);
//     } else {
//       mainYDomain = computeStackedContinuousDomain(data, xAccessor, yAccessor, scaleToExtent);
//     }
//   } else {
//     mainYDomain = computeContinuousDataDomain(data, yAccessor, scaleToExtent);
//   }
//   if (isGrouped) {
//     const mainXDomain = computeOrdinalDataDomain(data, xAccessor);
//     const groupDomains = groupAccessors.map((accessor, groupLevel) => {
//       const groupXDomain = computeOrdinalDataDomain(data, accessor);
//       return {
//         groupLevel,
//         xDomain: groupXDomain,
//         xScaleType: ScaleType.Ordinal,
//         xAccessor: accessor,
//       };
//     });
//     return [
//       ...groupDomains,
//       {
//         groupLevel: groupDomains.length,
//         xDomain: mainXDomain,
//         yDomain: mainYDomain,
//         xScaleType: ScaleType.Ordinal,
//         yScaleType,
//         xAccessor,
//         yAccessor,
//       },
//     ];
//   }

//   let xDomain;
//   if (xScaleType === ScaleType.Ordinal) {
//     xDomain = computeOrdinalDataDomain(data, xAccessor);
//   } else {
//     xDomain = computeContinuousDataDomain(data, xAccessor);
//   }
//   return [
//     {
//       groupLevel: 0,
//       xDomain,
//       yDomain: mainYDomain,
//       xScaleType,
//       yScaleType,
//       xAccessor,
//       yAccessor,
//     },
//   ];
// }

// /**
//  * Merge passed domain into a multidomain. If save scaletype is available,
//  * then the merge is on the same scale type, if not ordinal scale type is used
//  * @return [description]
//  */
// export function mergeGlobalDomains(currentSeriesScales: SeriesScales, seriesScales: SeriesScales) {
//   // TODO
// }
