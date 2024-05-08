import React, { useState } from 'react';

import moment from 'moment';

import { EuiDatePicker, EuiDatePickerRange } from '../../../../src/components';

export default () => {
  const minDate = moment().subtract(2, 'y');
  const maxDate = moment();
  const [startDate, setStartDate] = useState(minDate);
  const [endDate, setEndDate] = useState(maxDate);

  const isInvalid =
    startDate > endDate || startDate < minDate || endDate > maxDate;

  return (
    <EuiDatePickerRange
      isInvalid={isInvalid}
      startDateControl={
        <EuiDatePicker
          selected={startDate}
          onChange={(date) => date && setStartDate(date)}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={endDate}
          aria-label="Start date"
          showTimeSelect
        />
      }
      endDateControl={
        <EuiDatePicker
          selected={endDate}
          onChange={(date) => date && setEndDate(date)}
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={maxDate}
          aria-label="End date"
          showTimeSelect
        />
      }
    />
  );
};
