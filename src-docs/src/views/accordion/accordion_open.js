import React from 'react';

import { EuiAccordion, EuiText } from '../../../../src/components';

export default () => (
  <div>
    <EuiAccordion
      id="accordion2"
      buttonContent="I am opened by default. Click me to toggle close / open"
      initialIsOpen={true}
      paddingSize="l">
      <EuiText>
        <p>
          Any content inside of <strong>EuiAccordion</strong> will appear here.
        </p>
      </EuiText>
    </EuiAccordion>
  </div>
);
