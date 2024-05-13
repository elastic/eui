import React, { useState } from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiFormRow,
  EuiSelect,
} from '../../../../src/components';

export default () => {
  const options = [
    { value: -1, text: 'GMT -01:00' },
    { value: -2, text: 'GMT -02:00' },
    { value: -3, text: 'GMT -03:00' },
  ];
  const [startDate, setStartDate] = useState(moment());
  const [utcOffset, setUtcOffset] = useState(options[1].value);

  const onSelectChange = (e) => {
    setUtcOffset(parseInt(e.target.value, 10));
  };

  const selected = startDate && startDate.clone().utcOffset(utcOffset);

  return (
    <div>
      <EuiFormRow label="Select a date">
        <EuiDatePicker
          selected={selected}
          showTimeSelect
          onChange={setStartDate}
          utcOffset={utcOffset * 60}
        />
      </EuiFormRow>
      <EuiFormRow label="UTC offset">
        <EuiSelect
          options={options}
          value={utcOffset}
          onChange={onSelectChange}
        />
      </EuiFormRow>
    </div>
  );
};
