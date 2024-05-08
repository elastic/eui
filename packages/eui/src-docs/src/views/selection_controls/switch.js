import React, { useState } from 'react';

import { EuiSwitch } from '../../../../src/components';
import { DisplayToggles } from '../form_controls/display_toggles';

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
        label="Malware protection"
        checked={checked}
        onChange={(e) => onChange(e)}
      />
    </DisplayToggles>
  );
};
