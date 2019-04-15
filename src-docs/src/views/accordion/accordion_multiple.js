import React from 'react';

import {
  EuiAccordion,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';


export default () => (
  <div>
    <EuiAccordion
      id="accordion1"
      buttonContent="An accordion with padding applied through props"
      paddingSize="l"
    >
      <EuiText>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
      </EuiText>
    </EuiAccordion>

    <EuiSpacer />

    <EuiAccordion
      id="accordion2"
      buttonContent="A second accordion with padding"
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
