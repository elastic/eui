import React, { useState, Fragment } from 'react';

import {
  EuiRange,
  EuiSpacer,
  EuiFormHelpText,
  EuiDualRange,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default function() {
  const [value, setvalue] = useState('20');
  const [dualValue, setDualValue] = useState([20, 100]);

  const levels = [
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

  const onChange = e => {
    setvalue(e.target.value);
  };

  const onDualChange = value => {
    setDualValue(value);
  };

  render() {
    return (
      <Fragment>
        <EuiRange
          id={htmlIdGenerator()()}
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
          id={htmlIdGenerator()()}
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
