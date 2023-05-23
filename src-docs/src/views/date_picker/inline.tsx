import React, { useState } from 'react';

import moment from 'moment';

import {
  EuiDatePicker,
  EuiFlexGroup,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

import { DisplayToggles } from '../form_controls/display_toggles';

export default () => {
  const [shadow, setShadow] = useState(true);
  const [showTimeSelect, setShowTimeSelect] = useState(true);

  const [startDate, setStartDate] = useState(moment());

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
    </>
  );
};
