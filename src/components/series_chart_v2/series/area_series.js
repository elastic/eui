import React, { PureComponent } from 'react';

export class AreaSeries extends PureComponent {
  renderArea = () => {
    const { d } = this.props;
    return (
      <g className="euiSeriesChartSeries_areaGroup">
        <path className="euiSeriesChartSeries_area" d={d}/>
      </g>
    );
  };

  render() {
    const { animate } = this.props;
    if (!animate) {
      return this.renderArea();
    }
    return null;
  }
}
