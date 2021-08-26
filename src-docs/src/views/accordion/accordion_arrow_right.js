import React from 'react';

import { EuiAccordion, EuiPanel } from '../../../../src/components';

export default () => (
  <EuiAccordion
    id="accordion10"
    arrowDisplay="right"
    buttonContent="This accordion has the arrow on the right"
  >
    <EuiPanel color="subdued">
      Any content inside of <strong>EuiAccordion</strong> will appear here.
    </EuiPanel>
  </EuiAccordion>
);
