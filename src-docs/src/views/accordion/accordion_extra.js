import React from 'react';

import { EuiAccordion, EuiButton } from '../../../../src/components';

export default () => (
  <EuiAccordion
    id="accordionExtra"
    buttonContent="Click to open"
    extraAction={<EuiButton size="s">Extra action!</EuiButton>}
    paddingSize="l">
    <div>Opened content.</div>
  </EuiAccordion>
);
