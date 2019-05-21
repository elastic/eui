import React from 'react';

import { EuiAccordion, EuiText, EuiCode } from '../../../../src/components';

export default () => (
  <div>
    <EuiAccordion
      id="accordion1"
      buttonContent="Click me to toggle open / close">
      <EuiText>
        <p>
          Any content inside of <EuiCode>EuiAccordion</EuiCode> will appear
          here.
        </p>
      </EuiText>
    </EuiAccordion>
  </div>
);
