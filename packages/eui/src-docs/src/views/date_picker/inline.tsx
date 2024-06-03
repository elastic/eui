import React, { useState } from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiDatePickerRange,
  EuiFlexGroup,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

import { DisplayToggles } from '../form_controls/display_toggles';

export default () => {
  const [shadow, setShadow] = useState(true);
  const [showTimeSelect, setShowTimeSelect] = useState(true);

  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment().add(11, 'd'));

  return (
    <>
      <EuiFlexGroup>
        <EuiSwitch
          label="Show shadow"
          checked={shadow}
          onChange={() => setShadow((toggle) => !toggle)}
        />
        <EuiSwitch
          label="Show time select"
          checked={showTimeSelect}
          onChange={() => setShowTimeSelect((toggle) => !toggle)}
        />
      </EuiFlexGroup>
      <EuiSpacer />
      <DisplayToggles spacerSize="s" canCompressed={false} canFullWidth={false}>
        <EuiDatePicker
          selected={startDate}
          onChange={(date) => date && setStartDate(date)}
          inline
          showTimeSelect={showTimeSelect}
          shadow={shadow}
        />
      </DisplayToggles>
      <EuiSpacer />
      <DisplayToggles spacerSize="s" canCompressed={false} canFullWidth={false}>
        <EuiDatePickerRange
          inline
          shadow={shadow}
          startDateControl={
            <EuiDatePicker
              aria-label="Start date"
              selected={startDate}
              onChange={(date) => date && setStartDate(date)}
              startDate={startDate}
              endDate={endDate}
              showTimeSelect={showTimeSelect}
            />
          }
          endDateControl={
            <EuiDatePicker
              aria-label="End date"
              selected={endDate}
              onChange={(date) => date && setEndDate(date)}
              startDate={startDate}
              endDate={endDate}
              showTimeSelect={showTimeSelect}
            />
          }
        />
      </DisplayToggles>
    </>
  );
};
