import React, { Component } from 'react';

import { EuiSwitch, EuiXYChart, EuiSpacer } from '../../../../src/components';

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
    const { isHorizontal } = this.state;
    return (
      <div>
        <EuiSwitch label="Is Horizontal" checked={this.state.checked} onChange={this.onChange} />
        <EuiSpacer size="m" />

        <EuiXYChart
          width={600}
          height={200}
          xType={!isHorizontal ? 'ordinal' : undefined}
          yType={isHorizontal ? 'ordinal' : undefined}
        >
          {/* <EuiBarSeries
            name={`Tag A`}
            data={isHorizontal ? horizontalData : verticalData}
            isHorizontal={isHorizontal}
            />
            <EuiDefaultAxis
            isHorizontal={isHorizontal}
          /> */}
        </EuiXYChart>
      </div>
    );
  }
}
