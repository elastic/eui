import React, { PureComponent } from 'react';

export class PointSeries extends PureComponent {
  // renderPoints = (nodes) => {
  //   return (
  //     <g className="euiPointSeries">
  //       {
  //         nodes.map(({ key, data, state }) => {
  //           const { x, y, r, opacity } = state;
  //           return (
  //             <circle
  //               key={key}
  //               className="euiPointSeries_point"
  //               cx={x}
  //               cy={y}
  //               r={r}
  //               fillOpacity={opacity}
  //             />
  //           );
  //         })}
  //     </g>
  //   );
  // }
  onMouseEnter = (e) => {
    // const { onMouseOver } = this.props;
    console.log('On mouse enter Point', e);

  }
  onMouseLeave = () => {
    // const { onMouseOut } = this.props;
    console.log('On mouse leave Point');

  }
  renderPoints = () => {
    const {
      // chartDimensions: { height },
      points,
    } = this.props;
    return (
      <g className="euiSeriesChartSeries_pointGroup">
        {points.map((point, i) => {
          const { x, y, r } = point;
          return (
            <circle
              key={i}
              className="euiSeriesChartSeries_point"
              cx={x}
              cy={y}
              r={r}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
            />
          );
        })}
      </g>
    );
  };

  render() {
    const { animate } = this.props;
    if (!animate) {
      return this.renderPoints();
    }
    return null;
    // (
    //   <NodeGroup
    //     data={data}
    //     keyAccessor={(d,i) => i}
    //     start={(d) => ({
    //       opacity: 0,
    //       x: xScale(d.x),
    //       y: height - yScale(d.y),
    //       r: 5
    //     })}
    //
    //     enter={(d) => ({
    //       opacity: [0.7],
    //       timing: { duration: 250, ease: easeExpInOut },
    //     })}
    //
    //     update={(d, i) => ({
    //       opacity: 0.7,
    //       x: [xScale(d.x)],
    //       y: [height - yScale(d.y)],
    //       timing: { duration: 250, ease: easeExpInOut },
    //     })}
    //
    //     leave={() => ({
    //       opacity: [0],
    //       timing: { duration: 250, ease: easeExpInOut },
    //     })}
    //   >
    //     {this.renderPoints}
    //   </NodeGroup>
    // );
  }
}
