import React, { useState, Fragment } from 'react';

import {
  EuiRange,
  EuiSpacer,
  EuiFormHelpText,
  EuiDualRange,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setvalue] = useState('20');
  const [dualValue, setDualValue] = useState([20, 100]);

  const levels = [
    {
      min: 0,
      max: 25,
      color: 'primary',
    },
    {
      min: 25,
      max: 50,
      color: 'success',
    },
    {
      min: 50,
      max: 90,
      color: 'warning',
    },
    {
      min: 90,
      max: 100,
      color: 'danger',
    },
  ];

  const ticks = [
    { label: 'warning', value: 0 },
    { label: 'minor', value: 25 },
    { label: 'major', value: 50 },
    { label: 'critical', value: 90 },
  ];

  const onChange = (e) => {
    setvalue(e.target.value);
  };

  const onDualChange = (value) => {
    setDualValue(value);
  };

  return (
    <Fragment>
      <EuiRange
        id={htmlIdGenerator()()}
        value={value}
        onChange={(e) => onChange(e)}
        showTicks
        tickInterval={20}
        levels={levels}
        ticks={ticks}
        aria-label="An example of EuiRange with levels prop"
        aria-describedby="levelsHelp2"
      />
      <EuiFormHelpText id="levelsHelp2">
        Recommended levels are {levels[1].min} and above.
      </EuiFormHelpText>

      <EuiSpacer size="xl" />
      <EuiDualRange
        id={htmlIdGenerator()()}
        value={dualValue}
        onChange={(value) => onDualChange(value)}
        showTicks
        ticks={[
          { label: '25kb', value: 25 },
          { label: '90kb', value: 90 },
        ]}
        showInput
        levels={levels}
        aria-label="An example of EuiDualRange with levels prop"
        aria-describedby="levelsHelp3"
      />
      <EuiFormHelpText id="levelsHelp3">
        Recommended size is {levels[1].min}kb and above.
      </EuiFormHelpText>
    </Fragment>
  );
};
