import React, { useState } from 'react';
import moment from 'moment';

import { EuiDatePicker, EuiDatePickerRange } from '../../../../src';

// @ts-ignore Importing from JS
import { DisplayToggles } from '../form_controls/display_toggles';

export default () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(11, 'd'));

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles canCompressed={false} canLoading={false}>
      <EuiDatePickerRange
        isInvalid={startDate > endDate}
        startDateControl={
          <EuiDatePicker
            selected={startDate}
            // @ts-expect-error Help?
            onChange={setStartDate}
            startDate={startDate}
            endDate={endDate}
            isInvalid={true}
            aria-label="Start date"
            showTimeSelect
          />
        }
        endDateControl={
          <EuiDatePicker
            selected={endDate}
            // @ts-expect-error Help?
            onChange={setEndDate}
            startDate={startDate}
            endDate={endDate}
            aria-label="End date"
            showTimeSelect
            disabled
          />
        }
      />
    </DisplayToggles>
  );
};
