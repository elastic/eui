// import { Group as KonvaGroup } from 'konva';
// import React from 'react';
// import { Group, Rect } from 'react-konva';
// import { animated, Spring } from 'react-spring/dist/konva';
// import { BarGeom } from '../../lib/series/bars/rendering';

// interface BarSeriesDataProps {
//   animated?: boolean;
//   geoms: BarGeom[];
// }
// export class BarSeries extends React.PureComponent<BarSeriesDataProps> {
//   public static defaultProps: Partial<BarSeriesDataProps> = {
//     animated: false,
//   };
//   private readonly barSeriesRef: React.RefObject<KonvaGroup> = React.createRef();
//   constructor(props: BarSeriesDataProps) {
//     super(props);
//     this.barSeriesRef = React.createRef();
//   }
//   public render() {
//     const { geoms } = this.props;
//     return (
//       <Group ref={this.barSeriesRef} key={'bar_series'}>
//         {
//           this.renderBarGeoms(geoms)
//         }
//       </Group>
//     );
//   }
//   private renderBarGeoms = (geoms: BarGeom[]): JSX.Element[] => {
//     return geoms.map((glyph, i) => {
//       const { x, y1, width, height, color } = glyph;
//       if (this.props.animated) {
//         return (
//           <Group key={i}>
//             <Spring
//               native
//               from={{ y1: y1 + height, height: 0 }}
//               to={{ y1, height }}
//               >
//                 {(props: {y1: number, height: number}) => (
//                   <animated.Rect
//                     key="animatedRect"
//                     x={x}
//                     y={props.y1}
//                     width={width}
//                     height={props.height}
//                     fill={color}
//                     strokeWidth={0}
//                     listening={false}
//                     perfectDrawEnabled={false}
//                   />
//                 )}
//             </Spring>
//           </Group>
//         );
//       } else {
//         return <Rect
//           key={i}
//           x={x}
//           y={y1}
//           width={width}
//           height={height}
//           fill={color}
//           strokeWidth={0}
//           listening={false}
//           perfectDrawEnabled={false}
//         />;
//       }
//     });
//   }
// }
