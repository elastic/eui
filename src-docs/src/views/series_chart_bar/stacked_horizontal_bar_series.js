import React, { Component, Fragment } from 'react';

import { EuiSpacer, EuiButton } from '../../../../src/components';
import {
  EuiSeriesChart,
  EuiBarSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';

const { ORIENTATION, SCALE } = EuiSeriesChartUtils;

const dataA = [
  { x: 1, y: 'A' },
  { x: 2, y: 'B' },
  { x: 3, y: 'C' },
  { x: 4, y: 'D' },
  { x: 5, y: 'E' },
];
const dataB = [
  { x: 3, y: 'A' },
  { x: 2, y: 'B' },
  { x: 1, y: 'C' },
  { x: 2, y: 'D' },
  { x: 3, y: 'E' },
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
          orientation={ORIENTATION.HORIZONTAL}
          yType={SCALE.ORDINAL}
          stackBy={stacked ? 'x' : null}>
          <EuiBarSeries name={`Tag A`} data={dataA} />
          <EuiBarSeries name={`Tag B`} data={dataB} />
        </EuiSeriesChart>
      </Fragment>
    );
  }
}
