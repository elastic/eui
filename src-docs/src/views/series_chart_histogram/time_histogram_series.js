import React, { Component, Fragment } from 'react';

import { EuiButton, EuiSpacer } from '../../../../src/components';
import {
  EuiSeriesChart,
  EuiHistogramSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';

const { SCALE } = EuiSeriesChartUtils;
const timestamp = Date.now();
const ONE_HOUR = 3600000;
const margins = {
  top: 10,
  left: 80,
  right: 0,
  bottom: 20,
};

function randomizeData(size = 24, max = 15) {
  return new Array(size)
    .fill(0)
    .map((d, i) => ({
      x0: ONE_HOUR * i,
      x: ONE_HOUR * (i + 1),
      y: Math.floor(Math.random() * max),
    }))
    .map(el => ({
      x0: el.x0 + timestamp,
      x: el.x + timestamp,
      y: el.y,
    }));
}
function buildData(series) {
  const max = Math.ceil(Math.random() * 100000000);
  return new Array(series).fill(0).map(() => randomizeData(100, max));
}
export default class Example extends Component {
  state = {
    series: 4,
    data: buildData(4),
  };
  handleRandomize = () => {
    this.setState({
      data: buildData(this.state.series),
    });
  };
  render() {
    const { data } = this.state;
    return (
      <Fragment>
        <EuiButton onClick={this.handleRandomize}>Randomize data</EuiButton>

        <EuiSpacer size="xl" />
        <EuiSeriesChart
          width={600}
          height={200}
          xType={SCALE.TIME}
          stackBy="y"
          margins={margins}>
          {data.map((d, i) => (
            <EuiHistogramSeries key={i} name={`Chart ${i}`} data={d} />
          ))}
        </EuiSeriesChart>
      </Fragment>
    );
  }
}
