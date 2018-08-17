import React, { PureComponent } from 'react';

export class PointSeries extends PureComponent {
  onMouseEnter = (e) => {
    // const { onMouseOver } = this.props;
    console.log('On mouse enter Point', e);

  }
  onMouseLeave = () => {
    // const { onMouseOut } = this.props;
    console.log('On mouse leave Point');

  }
  renderPoints = () => {
    const { points } = this.props;
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
    return this.renderPoints();
  }
}
