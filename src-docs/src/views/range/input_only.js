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
        <DisplayToggles canAppend canPrepend>
          <EuiRange
            id={makeId()}
            value={this.state.value}
            onChange={this.onChange}
            showInput="inputWithPopover"
            showLabels
          />
        </DisplayToggles>

        <EuiSpacer size="xl" />

        <DisplayToggles canAppend canPrepend canLoading={false}>
          <EuiDualRange
            id={makeId()}
            value={this.state.dualValue}
            onChange={this.onDualChange}
            showInput="inputWithPopover"
            showLabels
            levels={this.levels}
          />
        </DisplayToggles>
      </Fragment>
    );
  }
}
