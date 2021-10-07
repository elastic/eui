import React from 'react';

import { EuiAccordion, EuiLink, EuiPanel } from '../../../../src/components';

export default () => (
  <EuiAccordion
    id="accordion123"
    buttonElement="div"
    buttonContent={
      <EuiLink
        onClick={(e) => e.stopPropagation()}
        href="#/layout/accordion#interactive-content-in-the-trigger"
      >
        This is a nested link
      </EuiLink>
    }
  >
    <EuiPanel color="subdued">
      Any content inside of <strong>EuiAccordion</strong> will appear here.
    </EuiPanel>
  </EuiAccordion>
);
