import React, { Component, Fragment } from 'react';

import {
  EuiRange,
  EuiSpacer,
  EuiTitle,
  EuiDualRange,
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
        <EuiRange
          id={makeId()}
          step={10}
          value={this.state.value}
          onChange={this.onChange}
          showTicks
        />

        <EuiSpacer size="xl" />

        <EuiTitle size="xxs">
          <h3>Custom tick interval</h3>
        </EuiTitle>

        <EuiSpacer size="l" />

        <EuiRange
          id={makeId()}
          value={this.state.value}
          onChange={this.onChange}
          showInput
          showRange
          showTicks
          tickInterval={20}
        />

        <EuiSpacer size="xl" />

        <EuiTitle size="xxs">
          <h3>Custom ticks object</h3>
        </EuiTitle>

        <EuiSpacer size="l" />

        <EuiDualRange
          id={makeId()}
          value={this.state.dualValue}
          onChange={this.onDualChange}
          showTicks
          ticks={[{ label: '20kb', value: 20 }, { label: '100kb', value: 100 }]}
          showInput
        />
      </Fragment>
    );
  }
}
