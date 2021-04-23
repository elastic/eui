import React from 'react';

import { EuiAccordion, EuiPanel } from '../../../../src/components';

export default () => (
  <div>
    <EuiAccordion id="accordion1" buttonContent="Click me to toggle">
      <EuiPanel color="subdued">
        Any content inside of <strong>EuiAccordion</strong> will appear here.
      </EuiPanel>
    </EuiAccordion>
  </div>
);
