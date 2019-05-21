import React, { Component, Fragment } from 'react';

import { EuiButton, EuiSpacer } from '../../../../src/components';
import {
  EuiSeriesChart,
  EuiLineSeries,
  EuiBarSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';

const { SCALE } = EuiSeriesChartUtils;
const timestamp = Date.now();
const ONE_HOUR = 3600000;

function randomizeData(size = 24, max = 15) {
  return new Array(size)
    .fill(0)
    .map((d, i) => ({
      x0: ONE_HOUR * i,
      x: ONE_HOUR * (i + 1),
      y: Math.floor(Math.random() * max),
    }))
    .map(el => ({
      x: el.x + timestamp,
      y: el.y,
    }));
}
function buildData(series) {
  const max = Math.ceil(Math.random() * 100000);
  return new Array(series).fill(0).map(() => randomizeData(10, max));
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
        <EuiSeriesChart width={600} height={200} xType={SCALE.TIME}>
          {data.map((d, i) => (
            <EuiBarSeries key={i} name={`Bars ${i}`} data={d} />
          ))}
          {data.map((d, i) => (
            <EuiLineSeries
              key={i}
              name={`Lines ${i}`}
              data={d}
              showLineMarks={false}
            />
          ))}
        </EuiSeriesChart>
      </Fragment>
    );
  }
}
