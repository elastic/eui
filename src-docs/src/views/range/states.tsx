import React, { useState } from 'react';

import {
  EuiRange,
  EuiSpacer,
  EuiDualRange,
  EuiDualRangeProps,
} from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState('20');
  const [dualValue, setDualValue] = useState<EuiDualRangeProps['value']>([
    20, 100,
  ]);

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

  const rangeWithOptionsId = useGeneratedHtmlId({ prefix: 'rangeWithOptions' });
  const inputRangeWithOptionsId = useGeneratedHtmlId({
    prefix: 'inputRangeWithOptions',
  });

  return (
    <>
      <DisplayToggles canAppend canPrepend canLoading={false}>
        <EuiRange
          id={rangeWithOptionsId}
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          showTicks
          showInput
          showLabels
          showValue
          showRange
          tickInterval={20}
          levels={levels}
          aria-label="An example of EuiRange"
        />
      </DisplayToggles>

      <EuiSpacer size="xl" />

      <DisplayToggles canLoading={false}>
        <EuiDualRange
          id={inputRangeWithOptionsId}
          min={0}
          max={100}
          value={dualValue}
          onChange={(value) => setDualValue(value)}
          showLabels
          showInput
          showTicks
          ticks={[
            { label: '20kb', value: 20 },
            { label: '100kb', value: 100 },
          ]}
          levels={levels}
          aria-label="An example of EuiRange"
        />
      </DisplayToggles>
    </>
  );
};
