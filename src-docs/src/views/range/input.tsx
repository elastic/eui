import React, { useState } from 'react';

import {
  EuiRange,
  EuiSpacer,
  EuiDualRange,
  EuiDualRangeProps,
  useGeneratedHtmlId,
} from '../../../../src';

export default () => {
  const [value, setValue] = useState('20');
  const [dualValue, setDualValue] = useState<EuiDualRangeProps['value']>([
    20,
    100,
  ]);

  const inputRangeSliderId = useGeneratedHtmlId({ prefix: 'inputRangeSlider' });
  const dualInputRangeSliderId = useGeneratedHtmlId({
    prefix: 'dualInputRangeSlider',
  });

  return (
    <>
      <EuiRange
        id={inputRangeSliderId}
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        showInput
        aria-label="An example of EuiRange"
      />

      <EuiSpacer size="xl" />

      <EuiDualRange
        id={dualInputRangeSliderId}
        min={0}
        max={100}
        value={dualValue}
        onChange={(value) => setDualValue(value)}
        showInput
        minInputProps={{ 'aria-label': 'Min value' }}
        maxInputProps={{ 'aria-label': 'Max value' }}
        aria-label="An example of EuiDualRange with inputs"
      />
    </>
  );
};
