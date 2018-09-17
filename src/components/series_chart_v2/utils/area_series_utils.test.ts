// import { createContinuousScale, getContinuousScaleFn, ScaleType } from '../commons/data_ops/scales';
// import { computeSingleAreaGlyphs, computeStackedAreaGlyphs } from './area_series_utils';

// describe('Area Series Utils', () => {
//   test('Should compute a simple area path',  () => {
//     const data = [
//       { x: 0, y: 10 },
//       { x: 100, y: 20 },
//     ];
//     const xScaleFn = (datum: any) => datum.x;
//     const yScaleFn = (datum: any) => 20 - datum.y;
//     const dimensions = {
//       width: 100,
//       height: 20,
//       top: 0,
//       left: 0,
//     };
//     const glyph = computeSingleAreaGlyphs(data, xScaleFn, yScaleFn, dimensions);
//     const expectedGlyph = {
//       d: 'M0,10L100,0L100,20L0,20Z',
//     };
//     expect(glyph).toEqual(expectedGlyph);
//   });
//   test.only('Should compute two stacked area path',  () => {
//     const data = [
//       { group: 'a', x: 0, y: 10 },
//       { group: 'a', x: 100, y: 20 },
//       { group: 'b', x: 0, y: 20 },
//       { group: 'b', x: 100, y: 10 },

//     ];
//     const xAccessor = (datum: any) => datum.x;
//     const yAccessor = (datum: any) => datum.y;
//     const xScaleFn = getContinuousScaleFn(ScaleType.Linear, [0, 100], xAccessor, 0, 100);
//     const yScale = createContinuousScale(ScaleType.Linear, [0, 30], 30, 0);

//     const stackAccessor = (datum: any) => datum.group;

//     const glyph = computeStackedAreaGlyphs(data, xScaleFn, xAccessor, yScale, yAccessor, stackAccessor);
//     const expectedGlyph = [
//       {
//         d: 'M0,20L100,10L100,30L0,30Z',
//         points: [
//           {
//             x: 0,
//             y: 20,
//           },
//           {
//             x: 100,
//             y: 10,
//           },
//         ],
//       },
//       {
//         d: 'M0,0L100,0L100,10L0,20Z',
//         points: [
//           {
//             x: 0,
//             y: 0,
//           },
//           {
//             x: 100,
//             y: 0,
//           },
//         ],
//       },
//     ];
//     expect(glyph).toEqual(expectedGlyph);
//   });
// });
