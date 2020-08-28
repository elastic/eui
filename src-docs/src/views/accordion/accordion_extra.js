import React from 'react';

import { EuiAccordion, EuiButton, EuiSpacer } from '../../../../src/components';

export default () => (
  <>
    <EuiAccordion
      id="accordionExtra"
      buttonContent="Click to open (Arrow on the left)"
      extraAction={<EuiButton size="s">Extra action!</EuiButton>}
      paddingSize="l">
      <div>Opened content.</div>
    </EuiAccordion>

    <EuiSpacer />

    <EuiAccordion
      id="accordionExtra"
      arrowDisplay="right"
      buttonContent="Click to open (Arrow on the right)"
      extraAction={<EuiButton size="s">Extra action!</EuiButton>}
      paddingSize="l">
      <div>Opened content.</div>
    </EuiAccordion>

    <EuiSpacer />

    <EuiAccordion
      id="accordionExtra"
      arrowDisplay="none"
      buttonContent="Click to open"
      extraAction={<EuiButton size="s">Extra action!</EuiButton>}
      paddingSize="l">
      <div>Opened content.</div>
    </EuiAccordion>
  </>
);
