import React from 'react';

import {
  EuiAccordion,
  EuiText,
  EuiCode,
  EuiSpacer,
} from '../../../../src/components';


export default () => (
  <div>
    <EuiAccordion
      id="accordion1"
      buttonContent="Click me to toggle open / close"
    >
      <EuiText>
        <p>Any content inside of <EuiCode>EuiAccordion</EuiCode> will appear here.</p>
      </EuiText>
    </EuiAccordion>

    <EuiSpacer size="l" />

    <EuiAccordion
      id="accordion2"
      buttonContent="An accordion with some padding applied through props"
      paddingSize="l"
    >
      <EuiText>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
      </EuiText>
    </EuiAccordion>
  </div>
);
