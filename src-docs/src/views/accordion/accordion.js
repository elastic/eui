import React from 'react';

import { EuiAccordion, EuiText } from '../../../../src/components';

export default () => (
  <div>
    <EuiAccordion
      id="accordion1"
      buttonContent="Click me to toggle open / close">
      <EuiText>
        <p>
          Any content inside of <strong>EuiAccordion</strong> will appear here.
        </p>
      </EuiText>
    </EuiAccordion>
  </div>
);
