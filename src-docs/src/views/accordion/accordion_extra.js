import React from 'react';

import { EuiAccordion, EuiButton, EuiSpacer } from '../../../../src/components';

export default () => (
  <>
    <EuiAccordion
      id="accordionExtraWithLeftArrow"
      buttonContent="Click to open (Arrow on the left)"
      extraAction={<EuiButton size="s">Extra action!</EuiButton>}
      paddingSize="l">
      <div>Opened content.</div>
    </EuiAccordion>

    <EuiSpacer />

    <EuiAccordion
      id="accordionExtraWithRightArrow"
      arrowDisplay="right"
      buttonContent="Click to open (Arrow on the right)"
      extraAction={<EuiButton size="s">Extra action!</EuiButton>}
      paddingSize="l">
      <div>Opened content.</div>
    </EuiAccordion>
  </>
);
