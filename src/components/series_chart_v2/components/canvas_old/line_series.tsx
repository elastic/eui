// import { Group as KonvaGroup } from 'konva';
// import React from 'react';
// import { Circle, Group, Path } from 'react-konva';
// import { animated, Spring } from 'react-spring/dist/konva';
// import { LineGlyph } from '../../lib/series/lines/rendering';
// import { LineSeriesStyle } from '../../lib/themes/theme';
// import { SpecId } from '../../lib/utils/ids';
// interface LineSeriesDataProps {
//   specId: SpecId;
//   animated?: boolean;
//   glyphs: LineGlyph[];
//   style: LineSeriesStyle;
// }

// export class LineSeries extends React.PureComponent<LineSeriesDataProps> {
//   public static defaultProps: Partial<LineSeriesDataProps> = {
//     animated: false,
//   };
//   private readonly lineSeriesRef: React.RefObject<KonvaGroup> = React.createRef();
//   constructor(props: LineSeriesDataProps) {
//     super(props);
//     this.lineSeriesRef = React.createRef();
//   }
//   public render() {
//     const { glyphs, style } = this.props;
//     return <Group ref={this.lineSeriesRef}>{this.renderGlyphs(glyphs, style)}</Group>;
//   }

//   private renderDataPoints = (
//     dataPoints: Array<{x: number, y: number}>,
//     color: string | undefined,
//     style: LineSeriesStyle,
//     ): JSX.Element[] => {
//     return dataPoints.map((point) => {
//       return (
//         <Circle
//           x={point.x}
//           y={point.y}
//           radius={style.dataPointsRadius}
//           fill={color}
//           stroke={style.dataPointsStroke}
//         />
//       );
//     });
//   }

//   private renderGlyphs = (glyphs: LineGlyph[], style: LineSeriesStyle): JSX.Element[] => {
//     return glyphs.map((glyph, i) => {
//       if (this.props.animated) {
//         return (
//           <Spring
//             key={`spring-area${i}`}
//             native
//             from={{ path: glyph.path }}
//             to={{ path: glyph.path }}
//             >
//               {(props: {path: string}) => (
//                 this.renderArea(true, `area-${i}`, style, props.path, glyph.points, glyph.color)
//               )}
//           </Spring>
//         );
//       } else {
//         return this.renderArea(false, `area-${i}`, style, glyph.path, glyph.points, glyph.color);
//       }
//     });
//   }
//   private renderArea = (
//     isAnimated: boolean,
//     key: string,
//     style: LineSeriesStyle,
//     path: string,
//     points: Array<{x: number, y: number}>,
//     color?: string,
//     ) => {
//       const PathComponent = isAnimated ? animated.Path : Path;
//       return (
//       <Group key={key}>
//         {
//           !style.hideBorder && <PathComponent
//             key="border"
//             data={path}
//             strokeWidth={style.borderWidth}
//             stroke={style.borderStrokeColor}
//             listening={false}
//             lineCap="round"
//             lineJoin="round"
//           />
//         }
//         {
//           !style.hideDataPoints && this.renderDataPoints(points, color, style)
//         }
//         {
//           !style.hideLine && <PathComponent
//             key="line"
//             data={path}
//             strokeWidth={style.lineWidth}
//             stroke={color}
//             listening={false}
//             lineCap="round"
//             lineJoin="round"
//           />
//         }
//       </Group>
//     );
//   }
// }
