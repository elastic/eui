import React, { useState } from 'react';

import {
  EuiDatePicker,
  EuiSpacer,
  EuiFormRow,
} from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

export default () => {
  const [startDate, setStartDate] = useState(null);

  const handleChange = date => {
    setStartDate(date);
  };

  const errors = [
    "Here's an example of an error",
    'You might have more than one error, so pass an array.',
  ];

  return (
    /* DisplayToggles wrapper for Docs only */
    <div>
      <DisplayToggles canCompressed={false}>
        <EuiDatePicker
          showTimeSelect
          selected={startDate}
          onChange={handleChange}
          placeholder="Placeholder text"
        />
      </DisplayToggles>

      <EuiSpacer size="l" />

      <EuiDatePicker
        showTimeSelect
        selected={startDate}
        onChange={handleChange}
        onClear={() => handleChange(null)}
        placeholder="Clearable"
      />

      <EuiSpacer size="m" />

      <EuiFormRow label="Form row validation" isInvalid error={errors}>
        <EuiDatePicker
          showTimeSelect
          isInvalid
          selected={startDate}
          onChange={handleChange}
          placeholder="Example of an error"
        />
      </EuiFormRow>
    </div>
  );
};
