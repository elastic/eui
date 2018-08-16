import React, { PureComponent } from 'react';

export class BarSeries extends PureComponent {
  renderBars = () => {
    const {
      bars,
    } = this.props;
    return (
      <g className="euiSeriesChartSeries_barGroup">
        {
          bars.map((bar, i) => {
            const { x, y, width, height } = bar;
            return (
              <rect
                key={`bar-${i}`}
                className="euiSeriesChartSeries_bar"
                x={x}
                y={y}
                width={width}
                height={height}
              />
            );
          })
        }
      </g>
    );
  };

  render() {
    return this.renderBars();
  }
}
