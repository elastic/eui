import React, { useState } from 'react';

import {
  EuiSuperSelect,
  EuiHealth,
  EuiFormRow,
} from '../../../../src/components';

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
      value: 'minor',
      inputDisplay: (
        <EuiHealth color="warning" style={{ lineHeight: 'inherit' }}>
          Minor
        </EuiHealth>
      ),
      'data-test-subj': 'option-minor',
    },
    {
      value: 'critical',
      inputDisplay: (
        <EuiHealth color="danger" style={{ lineHeight: 'inherit' }}>
          Critical
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
    <EuiFormRow
      label="Status"
      helpText="This super select is inside a form row."
    >
      <EuiSuperSelect
        options={options}
        valueOfSelected={value}
        onChange={(value) => onChange(value)}
      />
    </EuiFormRow>
  );
};
