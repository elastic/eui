import React, { useState } from 'react';

import { EuiToggle } from '../../../../src/components';

export default function() {
  const [toggleOn, setToggleValue] = useState(false);

  const onToggleChange = e => {
    setToggleValue(e.target.checked);
  };

  return (
    <div>
      <EuiToggle onChange={e => onToggleChange(e)} label="Is toggle on?">
        {toggleOn ? 'On' : 'Off'}
      </EuiToggle>
    </div>
  );
}
