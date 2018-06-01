import React, { Component } from 'react';

import {
  EuiButton,
  EuiXYChart,
  EuiVerticalBarSeries,
} from '../../../../src/components';

const data = [
  [
    { x: 'A', y: 3 },
    { x: 'B', y: 1 },
    { x: 'C', y: 5 },
    { x: 'D', y: 2 },
    { x: 'E', y: 1 },
  ],
  [
    { x: 'A', y: 1 },
    { x: 'B', y: 2 },
    { x: 'C', y: 3 },
    { x: 'D', y: 4 },
    { x: 'E', y: 5 },
  ]
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
  renderBars = () => {
    const { stacked } = this.state
    return data.map((d, i) => {
      return (
        <EuiVerticalBarSeries
          key={i}
          cluster={stacked ? `cluster${i}` : null}
          name={`Tag ${i}`}
          data={d}
        />
      )
    })
  }

  render() {

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
          stackBy="y"
        >
          {
            this.renderBars()
          }
        </EuiXYChart>

      </div>
    )
  }
}
