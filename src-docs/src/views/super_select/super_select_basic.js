import React, { useState } from 'react';

import { EuiSuperSelect } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

export default function() {

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

  const onChange = value => {
    setValue(value);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles>
      <EuiSuperSelect
        options={options}
        valueOfSelected={value}
        onChange={(value) => onChange(value)}
      />
    </DisplayToggles>
  );
}

