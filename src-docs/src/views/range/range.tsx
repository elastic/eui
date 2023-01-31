import React, { useState } from 'react';

import { EuiRange, EuiRangeProps, EuiSpacer } from '../../../../src/components';

import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState('120');

  const basicRangeId = useGeneratedHtmlId({ prefix: 'basicRange' });
  const rangeWithShowValueId = useGeneratedHtmlId({
    prefix: 'rangeWithShowValue',
  });
  const rangeWithValuePrependId = useGeneratedHtmlId({
    prefix: 'rangeWithValuePrepend',
  });

  const onChange: EuiRangeProps['onChange'] = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <>
      <EuiRange
        id={basicRangeId}
        min={100}
        max={200}
        step={0.05}
        value={value}
        onChange={onChange}
        showLabels
        aria-label="An example of EuiRange with showLabels prop"
      />

      <EuiSpacer size="xl" />

      <EuiRange
        id={rangeWithShowValueId}
        min={100}
        max={200}
        value={value}
        onChange={onChange}
        showLabels
        showValue
        aria-label="An example of EuiRange with showValue prop"
      />

      <EuiSpacer size="xl" />

      <EuiRange
        id={rangeWithValuePrependId}
        min={100}
        max={200}
        value={value}
        onChange={onChange}
        showLabels
        showRange
        showValue
        valuePrepend="100 - "
        aria-label="An example of EuiRange with valuePrepend prop"
      />
    </>
  );
};
