import React, { Component } from 'react';

import { EuiButton, EuiXYChart, EuiVerticalBarSeries } from '../../../../src/components';

const dataA = [{ x: 0, y: 5 }, { x: 1, y: 4 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 1 }];

const dataB = [{ x: 0, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }];

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
      <div>
        <EuiButton color="primary" onClick={this.onSwitchStacked} style={{ marginBottom: '2em' }}>
          Toggle stacked
        </EuiButton>
        <EuiXYChart width={600} height={200} xType="ordinal" stackBy={stacked ? 'y' : null}>
          <EuiVerticalBarSeries name={`Tag A`} data={dataA} />
          <EuiVerticalBarSeries name={`Tag B`} data={dataB} />
        </EuiXYChart>
      </div>
    );
  }
}
