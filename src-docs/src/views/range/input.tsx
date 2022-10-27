import React, { useState, Fragment } from 'react';

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

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const onDualChange = (value: EuiDualRangeProps['value']) => {
    setDualValue(value);
  };

  return (
    <Fragment>
      <EuiRange
        id={inputRangeSliderId}
        value={value}
        onChange={onChange}
        min={0}
        max={100}
        showInput
        aria-label="An example of EuiRange"
      />

      <EuiSpacer size="xl" />

      <EuiDualRange
        id={dualInputRangeSliderId}
        value={dualValue}
        onChange={onDualChange}
        showInput
        minInputProps={{ 'aria-label': 'Min value' }}
        maxInputProps={{ 'aria-label': 'Max value' }}
        aria-label="An example of EuiDualRange with inputs"
      />
    </Fragment>
  );
};
