import React, { useState } from 'react';

import {
  EuiAccordion,
  EuiText,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src/components';

export default () => {
  const [forceClose, setForceClose] = useState(true);
  const onChange = e => {
    setForceClose(e.target.checked);
  };

  return (
    <div>
      <EuiSwitch label="forceClose" checked={forceClose} onChange={onChange} />
      <EuiSpacer />
      <EuiAccordion
        id="accordion1"
        forceClose={forceClose}
        buttonContent="Click me to toggle open / close">
        <EuiText>
          <p>
            Any content inside of <strong>EuiAccordion</strong> will appear
            here.
          </p>
        </EuiText>
      </EuiAccordion>
    </div>
  );
};
