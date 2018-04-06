import React from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiFormRow,
} from '../../../../src/components';

export default () => (
  <EuiFormRow label="Select a date">
    <EuiDatePicker
      showTimeSelect
      dateFormat="LLL"
      showYearDropdown
      showMonthDropdown
      yearDropdownItemNumber={9}
    />
  </EuiFormRow>
);
