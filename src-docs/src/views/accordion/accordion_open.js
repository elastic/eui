import React from 'react';

import { EuiAccordion, EuiPanel } from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => (
  <div>
    <EuiAccordion
      id={htmlIdGenerator()()}
      buttonContent="I am opened by default. Click me to toggle close / open"
      initialIsOpen={true}
    >
      <EuiPanel color="subdued">
        Any content inside of <strong>EuiAccordion</strong> will appear here.
      </EuiPanel>
    </EuiAccordion>
  </div>
);
