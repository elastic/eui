import React, { useState } from 'react';

import moment from 'moment';

// NOTE: These explicit imports are required for CodeSandbox and any
// bundler that does not support Moment dynamically loading locales
import 'moment/locale/zh-cn';
import 'moment/locale/ko';
import 'moment/locale/de';

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
      <EuiFormRow label="US with fractional seconds">
        <EuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dateFormat="YYYY-MM-DD hh:mm:ss:SSS A"
        />
      </EuiFormRow>

      <EuiSpacer size="m" />

      <EuiFormRow label="China">
        <EuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dateFormat="YYYY-MM-DD hh:mm A"
          locale="zh-cn"
        />
      </EuiFormRow>

      <EuiSpacer size="m" />

      <EuiFormRow label="Korea">
        <EuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          locale="ko"
          dateFormat="YYYY-MM-DD hh:mm A"
        />
      </EuiFormRow>

      <EuiSpacer size="m" />

      <EuiFormRow label="Germany on 24 hour clock">
        <EuiDatePicker
          selected={startDate}
          showTimeSelect
          onChange={handleChange}
          dateFormat="DD-MM-YYYY HH:mm"
          timeFormat="HH:mm"
          locale="de"
        />
      </EuiFormRow>
    </div>
  );
};
