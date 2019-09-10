import React, { Component, Fragment } from 'react';

import {
  EuiRange,
  EuiSpacer,
  EuiDualRange,
  EuiFormRow,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '20',
      dualValue: [20, 100],
    };
  }

  onChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  onDualChange = value => {
    this.setState({
      dualValue: value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiFormRow label="Single">
          <EuiRange
            id={makeId()}
            value={this.state.value}
            onChange={this.onChange}
            showInput
          />
        </EuiFormRow>

        <EuiSpacer size="xl" />

        <EuiFormRow label="Dual">
          <EuiDualRange
            id={makeId()}
            value={this.state.dualValue}
            onChange={this.onDualChange}
            showInput
          />
        </EuiFormRow>
      </Fragment>
    );
  }
}
