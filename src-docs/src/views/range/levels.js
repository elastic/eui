import React, { Component, Fragment } from 'react';

import {
  EuiRange,
  EuiSpacer,
  EuiFormHelpText,
  EuiDualRange,
} from '../../../../src/components';

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
          showTicks
          tickInterval={20}
          levels={this.levels}
          aria-label="An example of EuiRange with levels prop"
          aria-describedby="levelsHelp2"
        />
        <EuiFormHelpText id="levelsHelp2">
          Recommended levels are {this.levels[1].min} and above.
        </EuiFormHelpText>

        <EuiSpacer size="xl" />

        <EuiDualRange
          id={makeId()}
          value={this.state.dualValue}
          onChange={this.onDualChange}
          showTicks
          ticks={[{ label: '20kb', value: 20 }, { label: '100kb', value: 100 }]}
          showInput
          levels={this.levels}
          aria-label="An example of EuiDualRange with levels prop"
          aria-describedby="levelsHelp3"
        />
        <EuiFormHelpText id="levelsHelp3">
          Recommended size is {this.levels[1].min}kb and above.
        </EuiFormHelpText>
      </Fragment>
    );
  }
}
