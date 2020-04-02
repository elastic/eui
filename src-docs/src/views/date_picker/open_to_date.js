import React, { useState } from 'react';

import moment from 'moment';

import { EuiDatePicker, EuiFormRow } from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(null);

  const handleChange = date => {
    setStartDate(date);
  };

  return (
    <EuiFormRow label="Select a date">
      <EuiDatePicker
        selected={startDate}
        onChange={handleChange}
        openToDate={moment('1993-09-28')}
        placeholder="Back to 1993"
      />
    </EuiFormRow>
  );
};
