// import { nest } from 'd3-collection';
// import { getScaleFromType } from './utils';
// export const DEFAULT_BAR_WIDTH = 10;

// export function computeDataPoints(data, scaleConfigs, chartDimensions) {
//   const { x, y } = scaleConfigs;
//   const xScale = getScaleFromType(x.scaleType)
//     .domain(x.domain)
//     .range([0, chartDimensions.width]);
//   const yScale = getScaleFromType(y.scaleType)
//     .domain(y.domain)
//     .range([0, chartDimensions.height]);
//   const barWidth = xScale.bandwidth ? xScale.bandwidth() : DEFAULT_BAR_WIDTH;
//   const dataPoints = data.map(point => {
//     return {
//       x: xScale(x.accessor(point)) - (barWidth / 2),
//       y: chartDimensions.height - yScale(y.accessor(point)),
//       height: yScale(y.accessor(point)),
//       width: barWidth,
//     };
//   });
//   return dataPoints;
// }

// export function getNestedScales(scaleConfigs) {
//   const { x, groupings } = scaleConfigs;
//   if (groupings.length === 0) {
//     // return xScale and yScale
//   }
//   if (groupings.length === 1 && x.scaleType === 'linear') {
//     // allow only vertical stack
//   }
//   // consider all as ordinal scales
//   // const groupedScales = groupings.map(({ accessor }, i) => {
//   //   return getScaleFromType('ordinal')
//   //     .domain(x.domain)
//   //     .range([0, chartDimensions.width]);
//   // });
// }

// export function nestData(data, scaleConfigs) {
//   const { groupings, stacked } = scaleConfigs;
//   // const groupedScales = groupings.map(grouping => {
//   //   return xScale(x.accessor(point))
//   // })
//   const nestedData = nest();
//   groupings.forEach(({ accessor }) => {
//     nestedData.key(d => {
//       return accessor(d);
//     });
//   });
//   if (stacked) {
//     nestedData.rollup((values) => {
//       return {
//         values,
//       };
//     });
//   }

//   return nestedData.entries(data);
// }

// export function computeBarSeriesDataPoint(spec, domain, chartDimensions) {
//   const {
//     xScaleType,
//     yScaleType,
//     xAccessor,
//     yAccessor,
//     data,
//   } = spec;
//   if (typeof xAccessor !== Array) {
//     const xScale = getScaleFromType(xScaleType)
//       .domain(domain.x.domain)
//       .range([0, chartDimensions.width]);
//     const yScale = getScaleFromType(yScaleType)
//       .domain(domain.y.domain)
//       .range([0, chartDimensions.height]);
//     // TODO compute bar width
//     const barWidth = xScale.bandwidth ? xScale.bandwidth() : 10;
//     const bars = data.map(point => {
//       return {
//         x: xScale(xAccessor(point)) - barWidth / 2,
//         y: chartDimensions.height - yScale(yAccessor(point)),
//         height: yScale(yAccessor(point)),
//         width: barWidth,
//       };
//     });
//     return {
//       bars
//     };
//   }

// }
