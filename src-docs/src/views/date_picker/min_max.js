import React, { useState } from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiFormRow,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [startDate, setStartDate] = useState(moment());
  const [startDate2, setStartDate2] = useState(moment());
  const [startDate3, setStartDate3] = useState(moment().add(1, 'days'));
  const [startDate4, setStartDate4] = useState(moment().add(1, 'days'));
  const [startDate5, setStartDate5] = useState(moment());

  const isWeekday = (date) => {
    const day = date.day();
    return day !== 0 && day !== 6;
  };

  return (
    <div>
      <EuiFormRow label="Only allow a certain range of dates">
        <EuiDatePicker
          showTimeSelect
          selected={startDate}
          onChange={setStartDate}
          minDate={moment().subtract(2, 'days')}
          maxDate={moment().add(5, 'days')}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Only allow a certain range of times">
        <EuiDatePicker
          showTimeSelect
          selected={startDate2}
          onChange={setStartDate2}
          minTime={moment().hours(17).minutes(0)}
          maxTime={moment().hours(20).minutes(30)}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Exclude yesterday and today">
        <EuiDatePicker
          showTimeSelect
          selected={startDate3}
          onChange={setStartDate3}
          excludeDates={[moment(), moment().add(1, 'days')]}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Exclude 12AM and 5PM from selection">
        <EuiDatePicker
          showTimeSelect
          selected={startDate4}
          onChange={setStartDate4}
          excludeTimes={[
            moment().hours(0).minutes(0),
            moment().hours(17).minutes(0),
          ]}
        />
      </EuiFormRow>

      <EuiSpacer />

      <EuiFormRow label="Filter so only weekdays are selectable">
        <EuiDatePicker
          showTimeSelect
          selected={startDate5}
          onChange={setStartDate5}
          filterDate={isWeekday}
        />
      </EuiFormRow>
    </div>
  );
};
