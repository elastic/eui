import React, { PureComponent } from 'react';

export class LineSeries extends PureComponent {
  renderLine = () => {
    const { d } = this.props;
    return (
      <g className="euiSeriesChartSeries_lineGroup">
        <path className="euiSeriesChartSeries_line" d={d}/>
      </g>
    );
  };

  render() {
    const { animate } = this.props;
    if (!animate) {
      return this.renderLine();
    }
    return null;
  }
}
