import React, { Component, Fragment } from 'react';

import { EuiRange, EuiSpacer, EuiDualRange } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

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
        <DisplayToggles canAppend canPrepend canLoading={false}>
          <EuiRange
            id={makeId()}
            value={this.state.value}
            onChange={this.onChange}
            showTicks
            showInput
            showLabels
            showValue
            showRange
            tickInterval={20}
            levels={this.levels}
          />
        </DisplayToggles>

        <EuiSpacer size="xl" />

        <DisplayToggles canAppend canPrepend canLoading={false}>
          <EuiDualRange
            id={makeId()}
            value={this.state.dualValue}
            onChange={this.onDualChange}
            showLabels
            showInput
            showTicks
            ticks={[
              { label: '20kb', value: 20 },
              { label: '100kb', value: 100 },
            ]}
            levels={this.levels}
          />
        </DisplayToggles>
      </Fragment>
    );
  }
}
