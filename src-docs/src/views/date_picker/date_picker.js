import React, { useState } from 'react';

import moment from 'moment';

import { EuiDatePicker, EuiToolTip } from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = (date) => {
    setStartDate(date);
  };

  return (
    <EuiToolTip content="Select a date">
      <EuiDatePicker selected={startDate} onChange={handleChange} />
    </EuiToolTip>
  );
};
