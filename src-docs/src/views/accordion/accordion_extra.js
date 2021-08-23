import React from 'react';

import { EuiAccordion, EuiButton } from '../../../../src/components';

export default () => (
  <EuiAccordion
    id="accordionExtraWithLeftArrow"
    buttonContent="Click to open"
    extraAction={<EuiButton size="s">Extra action!</EuiButton>}
    paddingSize="l"
  >
    <strong>Opened content.</strong>
  </EuiAccordion>
);
