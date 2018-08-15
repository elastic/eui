import React, { PureComponent } from 'react';
// import { NodeGroup } from "react-move";
// import { easeExpInOut } from "d3-ease";
import { plotLineSeriesData } from '../state/utils';

export class LineSeries extends PureComponent {
  renderLine = () => {
    const {
      data,
      xScale,
      yScale,
      xAccessor,
      yAccessor
    } = this.props;
    const d = plotLineSeriesData(
      data,
      xScale,
      yScale,
      xAccessor,
      yAccessor,
    );
    return (
      <g className="euiLineSeries">
        <path d={d} fill="none" strokeWidth={1} stroke="black"/>
      </g>
    );
  };

  render() {
    const { animate } = this.props;
    if (!animate) {
      return this.renderLine();
    }
    return null;
    // return (
    //   <NodeGroup
    //     data={data}
    //     keyAccessor={(d,i) => i}
    //     start={(d) => ({
    //       opacity: 0,
    //       x: d.x,
    //       y: d.y
    //     })}
    //
    //     enter={(d) => ({
    //       opacity: [0.7],
    //       timing: { duration: 250, ease: easeExpInOut },
    //     })}
    //
    //     update={(d, i) => ({
    //       opacity: 0.7,
    //       d: [d],
    //       test: (d, i) => {
    //         console.log(d, i )
    //       },
    //       timing: { duration: 250, ease: easeExpInOut },
    //     })}
    //
    //     leave={() => ({
    //       opacity: [0],
    //       timing: { duration: 250, ease: easeExpInOut },
    //     })}
    //   >
    //     {this.renderLine}
    //   </NodeGroup>
    // );
  }
}

// export class LineSeries extends React.PureComponent {
//   static propTypes = {
//     id: PropTypes.string.isRequired,
//     data: PropTypes.array.isRequired,
//   };
//   static defaultProps = {
//     curveType: 'cardinal',
//     xAccessor: (d) => d.x,
//     yAccessor: (d) => d.y,
//   }
//   render() {
//     const { id, data, xScale, yScale, xAccessor, yAccessor, curveType } = this.props
//     return (
//       <Group
//         key={`lines-${id}`}
//       >
//         <LinePath
//           data={data}
//           xScale={xScale}
//           yScale={yScale}
//           x={xAccessor}
//           y={yAccessor}
//           curve={Curve[`curve${capitalize(curveType)}`]}
//           strokeWidth={1}
//         />
//         {
//           data.map((point, i) => {
//             return (
//               <circle
//                 key={i}
//                 cx={xScale(xAccessor(point))}
//                 cy={yScale(yAccessor(point))}
//                 r={2}
//               />
//
//             )
//           })
//         }
//       </Group>
//     );
//   }
// }
