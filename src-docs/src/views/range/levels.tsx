import React, { useState } from 'react';

import {
  EuiRange,
  EuiSpacer,
  EuiFormHelpText,
  EuiDualRange,
  EuiDualRangeProps,
  useGeneratedHtmlId,
} from '../../../../src';

export default () => {
  const [value, setValue] = useState('20');
  const [customColorsValue, setCustomColorsValue] = useState('15');
  const [dualValue, setDualValue] = useState<EuiDualRangeProps['value']>([
    20,
    100,
  ]);

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

  return (
    <>
      <EuiRange
        id={rangeWithLevelsId}
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
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
        min={0}
        max={100}
        value={customColorsValue}
        onChange={(e) => setCustomColorsValue(e.currentTarget.value)}
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
        min={0}
        max={100}
        value={dualValue}
        onChange={(value) => setDualValue(value)}
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
    </>
  );
};
