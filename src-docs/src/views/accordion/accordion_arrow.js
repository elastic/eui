import React from 'react';

import { EuiAccordion, EuiPanel } from '../../../../src/components';

export default () => (
  <EuiAccordion
    id="accordion11"
    arrowDisplay="none"
    buttonContent="This one has it removed entirely"
  >
    <EuiPanel color="subdued">
      Any content inside of <strong>EuiAccordion</strong> will appear here.
    </EuiPanel>
  </EuiAccordion>
);
