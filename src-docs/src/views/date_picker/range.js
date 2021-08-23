import React, { useState } from 'react';

import moment from 'moment';

import { EuiDatePicker, EuiDatePickerRange } from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(11, 'd'));

  return (
    <EuiDatePickerRange
      startDateControl={
        <EuiDatePicker
          selected={startDate}
          onChange={setStartDate}
          startDate={startDate}
          minDate={moment()}
          maxDate={moment('2023-01-01')}
          endDate={endDate}
          isInvalid={startDate > endDate}
          aria-label="Start date"
          showTimeSelect
        />
      }
      endDateControl={
        <EuiDatePicker
          selected={endDate}
          onChange={setEndDate}
          startDate={startDate}
          endDate={endDate}
          isInvalid={startDate > endDate}
          aria-label="End date"
          showTimeSelect
        />
      }
    />
  );
};
