import React from 'react';

import { EuiAccordion, EuiText, EuiCode } from '../../../../src/components';

export default () => (
  <div>
    <EuiAccordion
      id="accordion1"
      buttonContent="I am opened by default. Click me to toggle close / open"
      initialIsOpen={true}
      paddingSize="l">
      <EuiText>
        <p>
          Any content inside of <EuiCode>EuiAccordion</EuiCode> will appear
          here.
        </p>
      </EuiText>
    </EuiAccordion>
  </div>
);
