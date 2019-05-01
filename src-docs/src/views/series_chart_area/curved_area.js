import React, { Component, Fragment } from 'react';

import {
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiSpacer,
} from '../../../../src/components';

import { EuiSeriesChart, EuiAreaSeries } from '../../../../src/experimental';

const DATA_A = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: -1 },
  { x: 5, y: 2 },
];
const DATA_B = [
  { x: 0, y: 3 },
  { x: 1, y: 2 },
  { x: 2, y: 4 },
  { x: 3, y: 1 },
  { x: 5, y: 3 },
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
        <EuiForm>
          <EuiFormRow label="Line Mode">
            <EuiSelect
              options={this.options}
              value={this.state.value}
              onChange={this.onChange}
            />
          </EuiFormRow>
        </EuiForm>

        <EuiSpacer size="xl" />

        <EuiSeriesChart width={600} height={200} stackBy="y">
          <EuiAreaSeries
            name="Total Bytes A"
            data={DATA_A}
            curve={this.state.value}
          />
          <EuiAreaSeries
            name="Total Bytes B"
            data={DATA_B}
            curve={this.state.value}
          />
        </EuiSeriesChart>
      </Fragment>
    );
  }
}
