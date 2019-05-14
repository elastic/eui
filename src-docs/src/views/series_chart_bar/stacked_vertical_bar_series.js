import React, { Component, Fragment } from 'react';

import { EuiSpacer, EuiButton } from '../../../../src/components';

import {
  EuiSeriesChart,
  EuiBarSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';

const { SCALE } = EuiSeriesChartUtils;

const dataA = [
  { x: 0, y: 5 },
  { x: 1, y: 4 },
  { x: 2, y: 3 },
  { x: 3, y: 2 },
  { x: 4, y: 1 },
];

const dataB = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 4 },
  { x: 4, y: 5 },
];

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stacked: true,
    };
  }

  onSwitchStacked = () => {
    this.setState({
      stacked: !this.state.stacked,
    });
  };

  render() {
    const { stacked } = this.state;
    return (
      <Fragment>
        <EuiButton color="primary" onClick={this.onSwitchStacked}>
          Toggle stacked
        </EuiButton>
        <EuiSpacer size="l" />
        <EuiSeriesChart
          width={600}
          height={200}
          xType={SCALE.ORDINAL}
          stackBy={stacked ? 'y' : null}>
          <EuiBarSeries name={'Tag A'} data={dataA} />
          <EuiBarSeries name={'Tag B'} data={dataB} />
        </EuiSeriesChart>
      </Fragment>
    );
  }
}
