import React from 'react';

import { EuiAccordion, EuiPanel } from '../../../../src/components';

export default () => (
  <EuiAccordion
    id="accordion123"
    buttonElement="div"
    buttonContent={
      <a
        onClick={(e) => e.stopPropagation()}
        href="#/layout/accordion#interactable-content-in-the-trigger"
      >
        I'm a link
      </a>
    }
  >
    <EuiPanel color="subdued">
      Any content inside of <strong>EuiAccordion</strong> will appear here.
    </EuiPanel>
  </EuiAccordion>
);
