// import { ScaleContinuousNumeric } from 'd3-scale';
// import { line, Line } from 'd3-shape';
// import { Accessor, ContinuousAccessor, OrdinalAccessor, SeriesScales } from '../commons/data_ops/domain';
// import { ScaleFunction } from '../commons/data_ops/scales';
// import { Dimensions } from '../commons/dimensions';
// import { CurveType, getCurveFactory } from '../commons/series/utils/curves';
// import {
//   computeStackedLinearYData,
//   getLinearSerisScalesFns,
//   LinearStackedCumulatedValue,
// } from './linear_series_utils';
// /**
//  * A single line glyph representation
//  */
// export interface LineSeriesGlyph {
//   d: string | null;
//   points: Array<{ x: number; y: number }>;
// }

// export type StackedLineSeriesGlyph = LineSeriesGlyph[];

// export function computeDataPoints(
//   data: any[],
//   seriesScales: SeriesScales[],
//   seriesDimensions: Dimensions,
//   clamp = false,
//   stackedKeyAccessor?: Accessor,
//   curveType: CurveType = CurveType.LINEAR,
// ): LineSeriesGlyph | StackedLineSeriesGlyph {
//   const seriesScale = seriesScales[0];
//   const { xScaleFn, yScale, yScaleFn } = getLinearSerisScalesFns(
//     seriesScale,
//     seriesDimensions,
//     clamp,
//   );
//   if (stackedKeyAccessor) {
//     return computeStackedLineGlyphs(
//       data,
//       xScaleFn,
//       seriesScale.xAccessor,
//       yScale,
//       seriesScale.yAccessor!,
//       stackedKeyAccessor,
//       curveType,
//     );
//   }
//   return computeSingleLineGlyphs(data, xScaleFn, yScaleFn, curveType);
// }

// export function computeSingleLineGlyphs(
//   data: any[],
//   xScaleFn: ScaleFunction,
//   yScaleFn: ScaleFunction,
//   curveType: CurveType = CurveType.LINEAR,
// ) {
//   const lineGenerator = line<any>()
//     .x(xScaleFn)
//     .y(yScaleFn)
//     .curve(getCurveFactory(curveType));
//   return computeLineGlyphs(data, xScaleFn, yScaleFn, lineGenerator);
// }

// export function computeStackedLineGlyphs(
//   data: any[],
//   xScaleFn: ScaleFunction,
//   xAccessor: Accessor,
//   yScale: ScaleContinuousNumeric<number, number>,
//   yAccessor: ContinuousAccessor,
//   stackedKeyAccessor: OrdinalAccessor,
//   curveType: CurveType = CurveType.LINEAR,
// ): StackedLineSeriesGlyph {
//   const stackedLineSeries = computeStackedLinearYData(
//     data,
//     xAccessor,
//     yAccessor,
//     stackedKeyAccessor,
//   );
//   const lines = Array.from(stackedLineSeries.values());
//   const areaGenerator = line<LinearStackedCumulatedValue>()
//     .x((datum: any) => xScaleFn(datum.data))
//     .y((datum: any) => yScale(datum.y1))
//     .curve(getCurveFactory(curveType));

//   return lines.map((areaData) => {
//     const yScaleFn = (datum: any) => {
//       return yScale(datum.y1);
//     };
//     const xScaleFnPoints = (datum: any) => {
//       return xScaleFn(datum.data);
//     };
//     return computeLineGlyphs(areaData, xScaleFnPoints, yScaleFn, areaGenerator);
//   });
// }

// function computeLineGlyphs(
//   data: any[],
//   xScaleFn: ScaleFunction,
//   yScaleFn: ScaleFunction,
//   lineGenerator: Line<any>,
// ) {
//   const points = data.map((datum) => {
//     return {
//       x: xScaleFn(datum),
//       y: yScaleFn(datum),
//     };
//   });
//   const generatedLine = {
//     d: lineGenerator(data),
//     points,
//   };
//   return generatedLine;
// }
