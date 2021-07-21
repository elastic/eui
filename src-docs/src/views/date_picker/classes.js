import React, { useState } from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = (date) => {
    setStartDate(date);
  };

  return (
    <div>
      <EuiFormRow label="className example">
        <EuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          className="guideDemo__datePickerPurpleInput"
        />
      </EuiFormRow>

      <EuiSpacer size="m" />

      <EuiFormRow label="calendarClassName example">
        <EuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          calendarClassName="guideDemo__datePickerPurpleCal"
        />
      </EuiFormRow>

      <EuiSpacer size="m" />

      <EuiFormRow label="dayClassName example">
        <EuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dayClassName={(date) =>
            date.date() < Math.random() * 31
              ? 'guideDemo__datePickerPurpleDay'
              : undefined
          }
        />
      </EuiFormRow>

      <EuiSpacer size="m" />

      <EuiFormRow label="popperClassName example">
        <EuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          popperClassName="guideDemo__datePickerPurplePopper"
        />
      </EuiFormRow>
    </div>
  );
};
