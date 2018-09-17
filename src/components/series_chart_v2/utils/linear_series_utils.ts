// import { nest } from 'd3-collection';
// import { ScaleContinuousNumeric } from 'd3-scale';
// import { sortBy } from 'lodash';
// import { Accessor, ContinuousAccessor, OrdinalAccessor, SeriesScales } from '../commons/data_ops/domain';
// import {
//   createContinuousScale,
//   createOrdinalScale,
//   getContinuousScaleFn,
//   getOrdinalScaleFn,
//   ScaleFunction,
//   ScaleType,
// } from '../commons/data_ops/scales';
// import { Dimensions } from '../commons/dimensions';

// export function getLinearSerisScalesFns(
//   seriesScale: SeriesScales,
//   seriesDimensions: Dimensions,
//   clamp = false,
// ) {
//   let xScaleFn: ScaleFunction;
//   if (seriesScale.xScaleType === ScaleType.Ordinal) {
//     const ordinalScale = createOrdinalScale(
//       seriesScale.xDomain as string[],
//       0,
//       seriesDimensions.width,
//     );
//     xScaleFn = getOrdinalScaleFn(ordinalScale, seriesScale.xAccessor, true);
//   } else {
//     xScaleFn = getContinuousScaleFn(
//       seriesScale.xScaleType,
//       seriesScale.xDomain as number[],
//       seriesScale.xAccessor,
//       0,
//       seriesDimensions.width,
//       clamp,
//     );
//   }
//   let yScaleFn: ScaleFunction;
//   let yScale: ScaleContinuousNumeric<number, number>;
//   if (seriesScale.yScaleType === ScaleType.Ordinal) {
//     const ordinalScale = createOrdinalScale(
//       seriesScale.yDomain as string[],
//       0,
//       seriesDimensions.height,
//     );
//     yScaleFn = getOrdinalScaleFn(ordinalScale, seriesScale.yAccessor!);
//     yScale = createContinuousScale(
//       ScaleType.Linear,
//       seriesScale.yDomain as number[],
//       seriesDimensions.height,
//       0,
//       clamp,
//     );
//   } else {
//     yScaleFn = getContinuousScaleFn(
//       seriesScale.yScaleType!,
//       seriesScale.yDomain as number[],
//       seriesScale.yAccessor!,
//       seriesDimensions.height,
//       0,
//       clamp,
//     );
//     yScale = createContinuousScale(
//       seriesScale.yScaleType!,
//       seriesScale.yDomain as number[],
//       seriesDimensions.height,
//       0,
//       clamp,
//     );
//   }
//   return {
//     xScaleFn,
//     yScaleFn,
//     yScale,
//   };
// }

// export interface LinearStackedCumulatedValue {
//   data: any;
//   y1: number;
//   y0: number;
// }

// export function computeStackedLinearYData(
//   data: any[],
//   xAccessor: Accessor,
//   yAccessor: ContinuousAccessor,
//   stackedKeyAccessor: OrdinalAccessor,
// ): Map<string, LinearStackedCumulatedValue[]> {
//   const stackedData = nest<any, LinearStackedCumulatedValue[]>()
//     .key((datum) => `${xAccessor(datum)}`) // .key type requires a string return
//     .rollup((values) => {
//       const sortedValues = sortBy(values, stackedKeyAccessor);
//       return sortedValues.reduce<LinearStackedCumulatedValue[]>((acc: LinearStackedCumulatedValue[], curr) => {
//         const currentScaledYValue = yAccessor(curr);
//         if (acc.length === 0) {
//           return [{
//             data: curr,
//             y1: currentScaledYValue,
//             y0: 0,
//           }];
//         }
//         const prevY1 = acc[acc.length - 1].y1;
//         return [
//           ...acc,
//           {
//             data: curr,
//             y1: prevY1 + currentScaledYValue,
//             y0: prevY1,
//           },
//         ];
//         return acc;
//       }, []) || [];
//     })
//     .entries(data);
//   const stackedAreaSeries = new Map<string, LinearStackedCumulatedValue[]>();
//   stackedData.forEach(({ value }: any) => {
//     value.forEach((datum: LinearStackedCumulatedValue) => {
//       const stackKey = stackedKeyAccessor(datum.data);
//       if (!stackedAreaSeries.has(stackKey)) {
//         stackedAreaSeries.set(stackKey, []);
//       }
//       const existingValues = stackedAreaSeries.get(stackKey)!;
//       stackedAreaSeries.set(stackKey, [...existingValues, datum]);
//     });
//   });
//   return stackedAreaSeries;
// }
