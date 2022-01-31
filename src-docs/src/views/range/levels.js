import React, { useState, Fragment } from 'react';

import {
  EuiRange,
  EuiSpacer,
  EuiFormHelpText,
  EuiDualRange,
} from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [value, setvalue] = useState('20');
  const [customColorsValue, setCustomColorsValue] = useState('15');
  const [dualValue, setDualValue] = useState([20, 100]);

  const levels = [
    {
      min: 0,
      max: 20,
      color: 'danger',
      'data-test-subj': 'dangerColorLevel',
    },
    {
      min: 20,
      max: 100,
      color: 'success',
    },
  ];

  const customTicks = [
    { label: 'low', value: 0 },
    { label: 'intermediate', value: 15 },
    { label: 'moderate', value: 35 },
    { label: 'high', value: 65 },
    { label: 'severe', value: 85 },
  ];

  const customColorsLevels = [
    {
      min: 0,
      max: 15,
      color: '#a2cb9f',
      'data-test-subj': 'customColorLevel',
    },
    {
      min: 15,
      max: 35,
      color: '#a1cbea',
    },
    {
      min: 35,
      max: 65,
      color: '#f2cc8f',
    },
    {
      min: 65,
      max: 85,
      color: '#e07a5f',
    },
    {
      min: 85,
      max: 100,
      color: '#b1130a',
    },
  ];

  const rangeWithLevelsId = useGeneratedHtmlId({ prefix: 'rangeWithLevels' });
  const rangeWithLevelsHelpId = useGeneratedHtmlId({
    prefix: 'rangeWithLevelsHelp',
  });
  const rangeWithCustomColorsId = useGeneratedHtmlId({
    prefix: 'rangeWithCustomColors',
  });
  const rangeWithCustomColorsHelpId = useGeneratedHtmlId({
    prefix: 'rangeWithCustomColorsHelp',
  });
  const dualRangeWithLevelsId = useGeneratedHtmlId({
    prefix: 'dualRangeWithLevels',
  });
  const dualRangeWithLevelsHelpId = useGeneratedHtmlId({
    prefix: 'dualRangeWithLevelsHelp',
  });

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
        id={rangeWithLevelsId}
        value={value}
        onChange={(e) => onChange(e)}
        showTicks
        tickInterval={20}
        levels={levels}
        aria-label="An example of EuiRange with levels prop"
        aria-describedby={rangeWithLevelsHelpId}
      />
      <EuiFormHelpText id={rangeWithLevelsHelpId}>
        Recommended levels are {levels[1].min} and above.
      </EuiFormHelpText>

      <EuiSpacer size="xl" />

      <EuiRange
        id={rangeWithCustomColorsId}
        value={customColorsValue}
        onChange={(e) => onCustomColorsChange(e)}
        showTicks
        ticks={customTicks}
        levels={customColorsLevels}
        aria-label="An example of EuiRange with custom colored indicators"
        aria-describedby={rangeWithCustomColorsHelpId}
      />

      <EuiFormHelpText id={rangeWithCustomColorsHelpId}>
        Recommended levels are below {customTicks[3].label}.
      </EuiFormHelpText>

      <EuiSpacer size="xl" />
      <EuiDualRange
        id={dualRangeWithLevelsId}
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
        aria-describedby={dualRangeWithLevelsHelpId}
      />
      <EuiFormHelpText id={dualRangeWithLevelsHelpId}>
        Recommended size is {levels[1].min}kb and above.
      </EuiFormHelpText>
    </Fragment>
  );
};
