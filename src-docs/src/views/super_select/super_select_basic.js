import React, { useState } from 'react';

import { EuiSuperSelect, EuiHealth } from '../../../../src/components';

export default () => {
  const options = [
    {
      value: 'warning',
      inputDisplay: (
        <EuiHealth color="subdued" style={{ lineHeight: 'inherit' }}>
          Warning
        </EuiHealth>
      ),
      'data-test-subj': 'option-warning',
      disabled: true,
    },
    {
      value: true,
      inputDisplay: (
        <EuiHealth color="warning" style={{ lineHeight: 'inherit' }}>
          True
        </EuiHealth>
      ),
      'data-test-subj': 'option-minor',
    },
    {
      value: false,
      inputDisplay: (
        <EuiHealth color="danger" style={{ lineHeight: 'inherit' }}>
          False
        </EuiHealth>
      ),
      'data-test-subj': 'option-critical',
    },
  ];
  const [value, setValue] = useState(options[1].value);

  const onChange = (value) => {
    setValue(value);
  };

  return (
    <EuiSuperSelect
      options={options}
      valueOfSelected={value}
      onChange={(value) => onChange(value)}
    />
  );
};
