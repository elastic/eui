import React, { useState } from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());

  const handleChange = date => {
    setStartDate(date);
  };

  return (
    <div>
      <EuiFormRow label="Time select on">
        <EuiDatePicker
          showTimeSelect
          selected={startDate}
          onChange={handleChange}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Only time select, 24 hour clock">
        <EuiDatePicker
          showTimeSelect
          showTimeSelectOnly
          selected={startDate}
          onChange={handleChange}
          dateFormat="HH:mm"
          timeFormat="HH:mm"
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Inject additional times into the list">
        <EuiDatePicker
          showTimeSelect
          showTimeSelectOnly
          selected={startDate}
          onChange={handleChange}
          dateFormat="hh:mm a"
          timeFormat="hh:mm a"
          injectTimes={[
            moment()
              .hours(0)
              .minutes(1),
            moment()
              .hours(0)
              .minutes(5),
            moment()
              .hours(23)
              .minutes(59),
          ]}
        />
      </EuiFormRow>
    </div>
  );
};
