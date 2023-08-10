import React, { useState } from 'react';
import moment from 'moment';

import { EuiDatePicker, EuiDatePickerRange } from '../../../../src';
import { DisplayToggles } from '../form_controls/display_toggles';

export default () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(11, 'd'));

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canPrepend={true} canAppend={true}>
      <EuiDatePickerRange
        startDateControl={
          <EuiDatePicker
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
            startDate={startDate}
            endDate={endDate}
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
            aria-label="End date"
            showTimeSelect
          />
        }
      />
    </DisplayToggles>
  );
};
