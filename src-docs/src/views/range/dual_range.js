import React, { useState } from 'react';

import { EuiDualRange } from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const [value, setValue] = useState(['', '']);

  const onChange = value => {
    setValue(value);
  };

  return (
    <EuiDualRange
      id={htmlIdGenerator()()}
      min={-100}
      max={200}
      step={10}
      value={value}
      onChange={onChange}
      showLabels
      aria-label="An example of EuiDualRange"
    />
  );
};
