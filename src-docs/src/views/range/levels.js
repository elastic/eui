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
  const [customColorsValue, setCustomColorsValue] = useState('25');
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

  const customColorsLevels = [
    {
      min: 0,
      max: 25,
      color: '#95cced',
    },
    {
      min: 25,
      max: 50,
      color: '#f2cc8f',
    },
    {
      min: 50,
      max: 75,
      color: '#e07a5f',
    },
    {
      min: 75,
      max: 100,
      color: '#975786',
    },
  ];

  const onChange = (e) => {
    setvalue(e.target.value);
  };

  const onCustomColorsChange = (e) => {
    setCustomColorsValue(e.target.value);
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
        aria-label="An example of EuiRange with levels prop"
        aria-describedby="levelsHelp2"
      />
      <EuiFormHelpText id="levelsHelp2">
        Recommended levels are {levels[1].min} and above.
      </EuiFormHelpText>

      <EuiSpacer size="xl" />

      <EuiRange
        id={htmlIdGenerator()()}
        value={customColorsValue}
        onChange={(e) => onCustomColorsChange(e)}
        showTicks
        ticks={[
          { label: 'warning', value: 0 },
          { label: 'minor', value: 25 },
          { label: 'major', value: 50 },
          { label: 'critical', value: 75 },
        ]}
        levels={customColorsLevels}
        aria-label="An example of EuiRange with custom colored indicators"
        aria-describedby="levelsHelp3"
      />

      <EuiFormHelpText id="levelsHelp3">
        Levels accept custom hex colors.
      </EuiFormHelpText>

      <EuiSpacer size="xl" />
      <EuiDualRange
        id={htmlIdGenerator()()}
        value={dualValue}
        onChange={(value) => onDualChange(value)}
        showTicks
        ticks={[
          { label: '20kb', value: 20 },
          { label: '100kb', value: 100 },
        ]}
        showInput
        levels={levels}
        aria-label="An example of EuiDualRange with levels prop"
        aria-describedby="levelsHelp4"
      />
      <EuiFormHelpText id="levelsHelp4">
        Recommended size is {levels[1].min}kb and above.
      </EuiFormHelpText>
    </Fragment>
  );
};
