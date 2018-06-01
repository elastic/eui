import React, { Component } from 'react';

import {
  EuiButton,
  EuiXYChart,
  EuiVerticalBarSeries,
} from '../../../../src/components';

const dataA = [
  { x: 'A', y: 3 },
  { x: 'B', y: 1 },
  { x: 'C', y: 5 },
  { x: 'D', y: 2 },
  { x: 'E', y: 1 },
];

const dataB = [
  { x: 'A', y: 1 },
  { x: 'B', y: 2 },
  { x: 'C', y: 3 },
  { x: 'D', y: 4 },
  { x: 'E', y: 5 },
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
          xType="ordinal"
          stackBy={stacked ? 'y' : null}
        >
          <EuiVerticalBarSeries
            name={`Tag A`}
            data={dataA}
          />
          <EuiVerticalBarSeries
            name={`Tag B`}
            data={dataB}
          />
        </EuiXYChart>

      </div>
    )
  }
}
