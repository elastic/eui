import React, { Component, Fragment } from 'react';

import {
  EuiForm,
  EuiFormRow,
  EuiSelect,
  EuiSpacer,
} from '../../../../src/components';
import {
  EuiSeriesChart,
  EuiLineSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';

const {
  LINEAR,
  CURVE_CARDINAL,
  CURVE_NATURAL,
  CURVE_MONOTONE_X,
  CURVE_MONOTONE_Y,
  CURVE_BASIS,
  CURVE_BUNDLE,
  CURVE_CATMULL_ROM,
  CURVE_STEP,
  CURVE_STEP_AFTER,
  CURVE_STEP_BEFORE,
} = EuiSeriesChartUtils.CURVE;

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
      { value: LINEAR, text: 'Linear' },
      { value: CURVE_CARDINAL, text: 'Curve Cardinal' },
      { value: CURVE_NATURAL, text: 'Curve Natural' },
      { value: CURVE_MONOTONE_X, text: 'Curve Monotone X' },
      { value: CURVE_MONOTONE_Y, text: 'Curve Monotone Y' },
      { value: CURVE_BASIS, text: 'Curve Basis' },
      { value: CURVE_BUNDLE, text: 'Curve Bundle' },
      { value: CURVE_CATMULL_ROM, text: 'Curve Catmull Rom' },
      { value: CURVE_STEP, text: 'Curve Step' },
      { value: CURVE_STEP_AFTER, text: 'Curve Step After' },
      { value: CURVE_STEP_BEFORE, text: 'Curve Step Before' },
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

        <EuiSeriesChart width={600} height={200}>
          <EuiLineSeries
            name="Total Bytes"
            data={DATA_A}
            curve={this.state.value}
          />
        </EuiSeriesChart>
      </Fragment>
    );
  }
}
