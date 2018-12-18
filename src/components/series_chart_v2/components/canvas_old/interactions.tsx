// import React from 'react';
// import { Circle, Group, Rect } from 'react-konva';
// import { AreaGlyph, AreaPoint, AreaSeriesState } from '../../lib/series/areas/rendering';
// import { BarGeom, BarSeriesState } from '../../lib/series/bars/rendering';
// import { Datum } from '../../lib/series/specs';
// import { Dimensions } from '../../lib/utils/dimensions';
// import { SpecId } from '../../lib/utils/ids';
// import { TooltipPosition } from '../../state/chart_state';

// interface InteractionsProps {
//   debug: boolean;
//   chartDimensions: Dimensions;
//   areaSeriesStates: Map<SpecId, AreaSeriesState>;
//   barSeriesStates: Map<SpecId, BarSeriesState>;
//   onElementOver?: (specId: SpecId, datum: Datum, position: TooltipPosition) => void;
//   onElementOut?: () => void;
// }
// export class InteractionsLayer extends React.PureComponent<InteractionsProps> {
//   public static defaultProps: Partial<InteractionsProps> = {
//     debug: false,
//     onElementOver: () => ({}),
//     onElementOut: () => ({}),
//   };
//   public render() {
//     return (<Group key={'interactions'} >
//       {
//         this.renderAreaSeriesSensitiveAreas()
//       }
//       {
//         this.renderBarSeriesSensitiveAreas()
//       }
//     </Group>);
//   }

//   private renderAreaSeriesSensitiveAreas = () => {
//     const { areaSeriesStates } = this.props;
//     return (
//       <Group key={'area-series-interactions'}>
//         {
//           Array
//             .from(areaSeriesStates.values())
//             .map((point, index) => this.renderAreaSeriesPoints(point.interactionAreas, point.isStacked, index))
//         }
//       </Group>
//     );
//   }

//   private renderAreaSeriesPoints = (points: AreaPoint[], isStacked: boolean, index: number) => {
//     const opacity = isStacked ? 1 : 0.2;

//     return points.map(({x, y1, color, geomDatum}, i) => {
//       return <Circle
//         key={`${index} - ${i}`}
//         x={x}
//         y={y1}
//         radius={2}
//         stroke={color}
//         fill={'white'}
//         opacity={opacity}
//         onMouseEnter={() => {
//           const {specId, datum, tooltipPosition} = geomDatum;
//           if (this.props.onElementOver) {
//             this.props.onElementOver(specId, datum, tooltipPosition);
//           }
//         }}
//         onMouseLeave={() => {
//           if ( this.props.onElementOut) {
//             this.props.onElementOut();
//           }
//         }}
//       />;
//     });
//   }
//   // private renderAreaSeriesHighlightMarkers = () => {
//   //   const { areaSeriesInteractivePoints } = this.props;
//   //   return Array.from(areaSeriesInteractivePoints.values()).map((points) => {
//   //     return (
//   //       <Group key={'areas-interactions'}>
//   //         {
//   //           points.map((glyph, index) => this.renderAreaSeriesPoints(glyph, index))
//   //         }
//   //       </Group>
//   //     );
//   //   });
//   // }
//   // BAR SERIES
//   private renderBarSeriesSensitiveAreas = () => {
//     const { barSeriesStates } = this.props;
//     return (
//       <Group key={'bar-interactions'}>
//       {
//         Array.from(barSeriesStates.values())
//           .map((seriesState, index) => this.renderBarSeriesSensitiveArea(seriesState.interactionAreas, index))
//       }
//       </Group>
//     );
//   }
//   private renderBarSeriesSensitiveArea(barSeriesState: BarGeom[], index: number) {
//     return barSeriesState.map((geom, i) => {
//       const { x, y1, width, height, color, geomDatum } = geom;
//       return <Rect
//         key={`${index} - ${i}`}
//         x={x}
//         y={y1}
//         width={width}
//         height={height}
//         fill={color}
//         opacity={0.2}
//         strokeWidth={0}
//         perfectDrawEnabled={false}
//         onMouseEnter={() => {
//           const {specId, datum, tooltipPosition} = geomDatum;
//           if (this.props.onElementOver) {
//             this.props.onElementOver(specId, datum, tooltipPosition);
//           }
//         }}
//         onMouseLeave={() => {
//           if ( this.props.onElementOut) {
//             this.props.onElementOut();
//           }
//         }}
//       />;
//     });
//   }
// }
