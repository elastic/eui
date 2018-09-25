// import React from 'react';
// import Animate from 'react-move/Animate';
// import { LineSeriesGlyph, StackedLineSeriesGlyph } from '../utils/line_series_utils';
// interface LineSeriesDataProps {
//   animated?: boolean;
//   line: LineSeriesGlyph;
// }

// export class LineSeries extends React.PureComponent<LineSeriesDataProps> {
//   public static defaultProps: Partial<LineSeriesDataProps> = {
//     animated: false,
//   };
//   public render() {
//     const { animated, line } = this.props;
//     if (line.d === null) {
//       return null;
//     }
//     if (!animated) {
//       if (Array.isArray(line)) {
//         return this.renderStackedLines(line);
//       }
//       return this.renderLine(line as LineSeriesGlyph);
//     }
//     return this.renderAnimatedLine(line.d);
//   }
//   private renderAnimatedLine = (d: string) => {
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
//            <g className="euiSeriesChartSeries_lineGroup">
//               <path className="euiSeriesChartSeries_line" d={state.d as string}/>
//             </g>
//          );
//         }
//       }
//       </Animate>
//     );
//   }
//   private renderLine = (line: LineSeriesGlyph) => {
//     if (!line.d) {
//       return null;
//     }
//     return (
//       <g className="euiSeriesChartSeries_lineGroup">
//         <path className="euiSeriesChartSeries_line" d={line.d}/>
//       </g>
//     );
//   }
//   private renderStackedLines = (lines: StackedLineSeriesGlyph) => {
//     return (
//       <g className="euiSeriesChartSeries_lineGroup">
//       {
//         lines.map((line, index) => {
//           return (
//             <path key={`line-${index}`} className="euiSeriesChartSeries_line" d={line.d as string}/>
//           );
//         })
//       }
//       </g>
//     );
//   }
// }
