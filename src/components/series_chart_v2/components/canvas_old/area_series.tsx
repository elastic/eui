// import { Group as KonvaGroup } from 'konva';
// import React from 'react';
// import { Circle, Group, Path } from 'react-konva';
// import { animated, Spring } from 'react-spring/dist/konva';
// import { AreaGeom, AreaPoint } from '../../lib/series/areas/rendering';
// import { AreaSeriesStyle } from '../../lib/themes/theme';
// import { SpecId } from '../../lib/utils/ids';

// interface AreaSeriesDataProps {
//   specId: SpecId;
//   animated?: boolean;
//   geometries: AreaGeom[];
//   markers: AreaPoint[];
//   style: AreaSeriesStyle;
//   isStacked: boolean;
// }

// export class AreaSeries extends React.PureComponent<AreaSeriesDataProps> {
//   public static defaultProps: Partial<AreaSeriesDataProps> = {
//     animated: false,
//     isStacked: false,
//   };
//   private readonly lineSeriesRef: React.RefObject<KonvaGroup> = React.createRef();
//   constructor(props: AreaSeriesDataProps) {
//     super(props);
//     this.lineSeriesRef = React.createRef();
//   }
//   public render() {
//     const { geometries, style } = this.props;
//     return (
//       <Group ref={this.lineSeriesRef}>
//         {!style.hideArea && this.renderAreas(geometries)}
//         {/* {!style.hideLine && this.renderLines(geometries, style)} */}
//       </Group>
//     );
//   }
//   private renderAreas = (geoms: AreaGeom[]): JSX.Element[] => {
//     const opacity = !this.props.isStacked ? 0.2 : 1;
//     return geoms.map((geom, i) => {
//       if (this.props.animated) {
//         return (
//           <Spring
//             key={`spring-area${i}`}
//             native
//             from={{  initialOpacity: 0, path: geom.path }}
//             to={{  initialOpacity: opacity, path: geom.path }}
//             >
//               {(props: {initialOpacity: number, path: string}) => (
//                 <animated.Path
//                   key={`area${i}`}
//                   data={props.path}
//                   fill={geom.color}
//                   listening={false}
//                   opacity={props.initialOpacity}
//                 />
//               )}
//           </Spring>
//         );
//       } else {
//         return <Path
//           key={`area${i}`}
//           data={geom.path}
//           fill={geom.color}
//           listening={false}
//           opacity={opacity}
//         />;
//       }
//     });
//   }
//   // private renderLines = (geoms: AreaGeom[], style: AreaSeriesStyle): JSX.Element[] => {
//   //   return geoms.map((geom, i) => {
//   //     return this.renderLine(geom, i, style);
//   //   });
//   // }

//   // private renderLine = (geom: AreaGeom, i: number, style: AreaSeriesStyle): JSX.Element => {
//   //   const { isStacked } = this.props;
//   //   if (this.props.animated) {
//   //     return (
//   //       <Spring
//   //         key={`spring-area${i}`}
//   //         native
//   //         duration={250}
//   //         from={{ opacity: 0, path: geom.path }}
//   //         to={{ opacity: 1, path: geom.path }}
//   //         >
//   //           {(props: {opacity: number, path: string, points: Array<{x: number, y1: number, y0: number}>}) => {
//   //             return this.renderLineGlyphs(
//   //               true,
//   //               props.path,
//   //               props.opacity,
//   //               i,
//   //               style,
//   //               isStacked,
//   //               geom.color,
//   //             );
//   //           }}
//   //       </Spring>
//   //     );
//   //   } else {
//   //     return this.renderLineGlyphs(false, geom.path, 1, i, style, isStacked, geom.color);
//   //   }
//   // }

//   // private renderLineGlyphs = (
//   //   isAnimated: boolean,
//   //   linePath: string,
//   //   opacity: number,
//   //   i: number,
//   //   style: AreaSeriesStyle,
//   //   isStacked: boolean,
//   //   color?: string,
//   //   markers: AreaPoints[],
//   //   ) => {
//   //     const PathComponent = isAnimated ? animated.Path : Path;
//   //     return (<Group key={i}>
//   //     {
//   //       !style.hideBorder && isStacked && <PathComponent
//   //         key="border"
//   //         data={linePath}
//   //         strokeWidth={style.borderWidth}
//   //         stroke={style.borderStrokeColor}
//   //         listening={false}
//   //         lineCap="round"
//   //         lineJoin="round"
//   //         opacity={opacity}
//   //       />
//   //     }
//   //     {
//   //       !style.hideLine && isStacked && <PathComponent
//   //         key="line"
//   //         data={linePath}
//   //         strokeWidth={style.lineWidth}
//   //         stroke={style.lineStrokeColor}
//   //         listening={false}
//   //         lineCap="round"
//   //         lineJoin="round"
//   //         opacity={opacity}
//   //       />
//   //     }
//   //     {
//   //       !style.hideDataPoints  && isStacked && markers.map((point, pointIndex) => {
//   //         return <Circle
//   //             key={`point${pointIndex}`}
//   //             x={point.x}
//   //             y={point.y1}
//   //             radius={style.dataPointsRadius}
//   //             fill={color}
//   //             opacity={opacity}
//   //             // stroke={style.dataPointsStroke}
//   //             // strokeWidth={undefined}
//   //           />;
//   //       })
//   //     }
//   //   </Group>
//   //   );
//   // }
// }
