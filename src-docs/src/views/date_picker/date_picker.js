import React, { useState } from 'react';

import moment from 'moment';

import { EuiDatePicker, EuiFormRow } from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = date => {
    setStartDate(date);
  };

  return (
    <EuiFormRow label="Select a date">
      <EuiDatePicker selected={startDate} onChange={handleChange} />
    </EuiFormRow>
  );
};
