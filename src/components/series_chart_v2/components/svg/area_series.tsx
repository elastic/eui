// import React from 'react';
// import Animate from 'react-move/Animate';
// import { AreaSeriesGlyph, StackedAreaSeriesGlyph } from '../utils/area_series_utils';
// interface AreaSeriesDataProps {
//   animated?: boolean;
//   area: AreaSeriesGlyph | StackedAreaSeriesGlyph;
// }

// export class AreaSeries extends React.PureComponent<AreaSeriesDataProps> {
//   public static defaultProps: Partial<AreaSeriesDataProps> = {
//     animated: false,
//   };
//   public render() {
//     const { animated, area } = this.props;
//     // if (area.d === null) {
//     //   return null;
//     // }
//     if (!animated) {
//       if (Array.isArray(area)) {
//         return this.renderStackedAreas(area);
//       }
//       return this.renderArea(area as AreaSeriesGlyph);
//     }
//     return this.renderAnimatedArea((area as AreaSeriesGlyph).d as string);
//   }
//   private renderAnimatedArea = (d: string) => {
//     return (
//       <Animate
//       start={{
//         key: 'transform',
//         d,
//       }}
//       update={{
//         key: 'transform',
//         d: [d],
//       }}
//       >
//       {
//         (state) => {
//           return (
//             <path className="euiSeriesChartSeries_area" d={state.d as string}/>
//          );
//         }
//       }
//       </Animate>
//     );
//   }
//   private renderStackedAreas = (areas: StackedAreaSeriesGlyph) => {
//     return (
//       <g className="euiSeriesChartSeries_areaGroup">
//       {
//         areas.map((area, index) => {
//           return this.renderSingleArea(area, `area-${index}`);
//         })
//       }
//       </g>
//     );
//   }
//   private renderArea = (area: AreaSeriesGlyph) => {
//     return (
//       <g className="euiSeriesChartSeries_areaGroup">
//       {
//         this.renderSingleArea(area, 'area-1')
//       }
//       </g>
//     );
//   }
//   private renderSingleArea = (area: AreaSeriesGlyph, key: string) => {
//     return (
//       <React.Fragment key={key}>
//         <path  className="euiSeriesChartSeries_area" d={area.d as string}/>
//         {/* <g>
//           {
//             area.points.map((point) => {
//               return <circle cx={point.x} cy={point.y} r="5" />;
//             })
//           }
//         </g> */}
//       </React.Fragment>
//     );
//   }
// }
