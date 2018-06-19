import React, { Component } from 'react';

import {
  EuiSwitch,
  EuiXYChart,
  EuiBarSeries,
  EuiSpacer,
  EuiDefaultAxis,
} from '../../../../src/components';

const horizontalData = [
  { x: 3, y: 'A' },
  { x: 1, y: 'B' },
  { x: 5, y: 'C' },
  { x: 2, y: 'D' },
  { x: 1, y: 'E' }
]
const verticalData = [
  { x: 'A', y: 3 },
  { x: 'B', y: 1 },
  { x: 'C', y: 5 },
  { x: 'D', y: 2 },
  { x: 'E', y: 1 },
]

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHorizontal: false,
    };
  }

  onChange = e => {
    this.setState({
      isHorizontal: e.target.checked,
    });
  };

  render() {
    const { isHorizontal } = this.state
    return (
      <div>
        <EuiSwitch
          label="Is Horizontal"
          checked={this.state.checked}
          onChange={this.onChange}
        />
        <EuiSpacer size="m" />

        <EuiXYChart
          width={600}
          height={200}
          xType={!isHorizontal ? 'ordinal' : undefined}
          yType={isHorizontal ? 'ordinal': undefined}
        >
          <EuiBarSeries
            name={`Tag A`}
            data={isHorizontal ? horizontalData : verticalData}
            isHorizontal={isHorizontal}
          />
          <EuiDefaultAxis
            isHorizontal={isHorizontal}
          />
        </EuiXYChart>

      </div>
    )
  }
}
