import React, { useState } from 'react';

import moment from 'moment';

import { EuiDatePicker } from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = date => {
    setStartDate(date);
  };

  return (
    <div>
      <EuiDatePicker
        selected={startDate}
        onChange={handleChange}
        inline
        showTimeSelect
      />
      <EuiDatePicker
        selected={startDate}
        onChange={handleChange}
        inline
        showTimeSelect
        shadow={false}
      />
    </div>
  );
};
