import React from 'react';

import {
  EuiAccordion,
  EuiButton,
} from '../../../../src/components';

export default () => (
  <EuiAccordion
    buttonContent="Click to open"
    extraAction={<EuiButton size="small">Extra action!</EuiButton>}
  >
    <div>Opened content.</div>
  </EuiAccordion>
);
