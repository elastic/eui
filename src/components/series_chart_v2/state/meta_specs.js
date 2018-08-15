// // PSEUDO STATE
// const specState = {
//   parentDimensions: {
//     width,
//     height,
//   },
//   chartDimensions: {
//     top,
//     left,
//     width,
//     height,
//   },
//   axis: [
//     {
//       id,
//       visible,
//       position,
//       orientation,
//       tickSize,
//       tickFormat,
//       width,
//       height,
//       scaleType,
//       groupId,
//       domain, // post computed after series bind
//       top, // post computed after series + parent + axis
//       left, // post computed after series + parent + axis
//       width, // post computed after series + parent + axis
//       height, // post computed after series + parent + axis
//     }
//   ],
//   series: [
//     {
//       id,
//       type,
//       data,
//       xScaleType,
//       yScaleType,
//       xAccessor,
//       yAccessor,
//       beginOnZero,
//       customConfig,
//       dataExtent, // post computed
//       chartData, // post computed after chart dims
//     }
//   ]
// }
// function processSpecs() {
//   computeDataExtent()
//   bindDataToAxis()
//   computeAxisDimensions()
//   computeChartDimensions()
//   computeSeriesChartData()
// }
