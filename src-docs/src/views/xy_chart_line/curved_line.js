import React, { Component, Fragment } from 'react';

import {
  EuiSelect,
  EuiSpacer,
  EuiXYChart,
  EuiLine,
  EuiDefaultAxis } from '../../../../src/components';

const DATA_A = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: -1 },
  { x: 5, y: 2 },
];

export default class extends Component {
  constructor(props) {
    super(props);

    this.options = [
      { value: 'linear', text: 'Linear' },
      { value: 'curveCardinal', text: 'Curve Cardinal' },
      { value: 'curveNatural', text: 'Curve Natural' },
      { value: 'curveMonotoneX', text: 'Curve Monotone X' },
      { value: 'curveMonotoneY', text: 'Curve Monotone Y' },
      { value: 'curveBasis', text: 'Curve Basis' },
      { value: 'curveBundle', text: 'Curve Bundle' },
      { value: 'curveCatmullRom', text: 'Curve Catmull Rom' },
      { value: 'curveStep', text: 'Curve Step' },
      { value: 'curveStepAfter', text: 'Curve Step After' },
      { value: 'curveStepBefore', text: 'Curve Step Before' },
    ];

    this.state = {
      value: this.options[0].value,
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiSelect
          options={this.options}
          value={this.state.value}
          onChange={this.onChange}
        />

        <EuiSpacer size="xl" />
        <EuiXYChart
          width={600}
          height={200}
        >
          <EuiDefaultAxis />
          <EuiLine
            name="Total Bytes"
            data={DATA_A}
            curve={this.state.value}
          />

        </EuiXYChart>
      </Fragment>
    )
  }
}
