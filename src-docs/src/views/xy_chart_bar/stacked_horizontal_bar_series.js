import React, { Component } from 'react';

import {
  EuiButton,
  EuiXYChart,
  EuiHorizontalBarSeries,
  EuiDefaultAxis,
} from '../../../../src/components';

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
  }

  render() {
    const { stacked } = this.state
    return (
      <div>
        <EuiButton
          color="primary"
          onClick={this.onSwitchStacked}
          style={{ marginBottom: '2em' }}
        >
          Toggle stacked
        </EuiButton>
        <EuiXYChart
          width={600}
          height={200}
          yType="ordinal"
          stackBy={stacked ? 'x' : null}
        >
          <EuiHorizontalBarSeries
            name={`Tag A`}
            data={dataA}
          />
          <EuiHorizontalBarSeries
            name={`Tag B`}
            data={dataB}
          />
          <EuiDefaultAxis
            isHorizontal={true}
          />
        </EuiXYChart>

      </div>
    )
  }
}
