import React, { useState } from 'react';

import { EuiSwitch } from '../../../../src/components';
import { DisplayToggles } from './display_toggles';

export default () => {
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    /* DisplayToggles wrapper for Docs only */
    <DisplayToggles
      canReadOnly={false}
      canLoading={false}
      canInvalid={false}
      canFullWidth={false}
    >
      <EuiSwitch
        label="Enable"
        checked={checked}
        onChange={(e) => onChange(e)}
      />
    </DisplayToggles>
  );
};
