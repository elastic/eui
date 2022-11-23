import React, { useState } from 'react';

import {
  EuiRange,
  EuiRangeProps,
  EuiSpacer,
  EuiDualRange,
  EuiDualRangeProps,
  useGeneratedHtmlId,
} from '../../../../src';

import { DisplayToggles } from '../form_controls/display_toggles';

export default () => {
  const [value, setValue] = useState<EuiRangeProps['value']>('20');
  const [dualValue, setDualValue] = useState<EuiDualRangeProps['value']>([
    20,
    100,
  ]);

  const inputRangeSliderId = useGeneratedHtmlId({ prefix: 'inputRangeSlider' });
  const dualInputRangeSliderId = useGeneratedHtmlId({
    prefix: 'dualInputRangeSlider',
  });

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

  return (
    <>
      <DisplayToggles canAppend canPrepend>
        <EuiRange
          id={inputRangeSliderId}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          min={0}
          max={100}
          showInput="inputWithPopover"
          showLabels
          aria-label="An example of EuiRange with showInput prop"
        />
      </DisplayToggles>

      <EuiSpacer size="xl" />

      <DisplayToggles canAppend canPrepend>
        <EuiDualRange
          id={dualInputRangeSliderId}
          value={dualValue}
          onChange={(value) => setDualValue(value)}
          showInput="inputWithPopover"
          showLabels
          levels={levels}
          aria-label="An example of EuiDualRange with showInput prop"
        />
      </DisplayToggles>
    </>
  );
};
