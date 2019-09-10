import React, { Component, Fragment } from 'react';

import {
  EuiDualRange,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ['', ''],
      value2: ['20', '150'],
    };
  }

  onChange = value => {
    this.setState({
      value,
    });
  };

  onChange2 = value => {
    this.setState({
      value2: value,
    });
  };

  render() {
    return (
      <Fragment>
        <EuiFormRow label="Dual range">
          <EuiDualRange
            id={makeId()}
            min={-100}
            max={200}
            step={10}
            value={this.state.value}
            onChange={this.onChange}
            showLabels
          />
        </EuiFormRow>

        <EuiSpacer size="xl" />

        <EuiDualRange
          id={makeId()}
          min={-100}
          max={200}
          step={10}
          value={this.state.value2}
          onChange={this.onChange2}
          showLabels
        />
      </Fragment>
    );
  }
}
