import React from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiFormRow,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiDatePicker
      inline
      showTimeSelect
      dateFormat="LLL"
    />
    <EuiDatePicker
      inline
      showTimeSelect
      dateFormat="LLL"
      shadow={false}
    />
  </div>
);
