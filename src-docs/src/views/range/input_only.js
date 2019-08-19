import React, { Component, Fragment } from 'react';

import { EuiRange, EuiSpacer, EuiDualRange } from '../../../../src/components';

import makeId from '../../../../src/components/form/form_row/make_id';

export default class extends Component {
  constructor(props) {
    super(props);

    this.levels = [
      {
        min: 0,
        max: 20,
        color: 'danger',
      },
      {
        min: 20,
        max: 100,
        color: 'success',
      },
    ];

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
        <EuiRange
          id={makeId()}
          value={this.state.value}
          onChange={this.onChange}
          showInput="only"
          showLabels
        />

        <EuiSpacer size="xl" />

        <EuiDualRange
          id={makeId()}
          value={this.state.dualValue}
          onChange={this.onDualChange}
          showInput="only"
          showLabels
          levels={this.levels}
        />

        <EuiSpacer size="xl" />

        <EuiRange
          id={makeId()}
          value={this.state.value}
          onChange={this.onChange}
          compressed
          showInput="only"
          showLabels
        />

        <EuiSpacer size="xl" />

        <EuiDualRange
          id={makeId()}
          value={this.state.dualValue}
          onChange={this.onDualChange}
          compressed
          showInput="only"
          showLabels
          levels={this.levels}
          readOnly
        />
      </Fragment>
    );
  }
}
