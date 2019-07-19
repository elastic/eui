import React from 'react';

import { EuiAccordion, EuiText, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiAccordion
      id="accordion1"
      buttonContent="An accordion with padding applied through props"
      paddingSize="l">
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
      paddingSize="l">
      <EuiText>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
      </EuiText>
    </EuiAccordion>

    <EuiSpacer />

    <EuiAccordion
      id="accordion3"
      buttonContent="A third accordion with a nested accordion"
      paddingSize="m">
      <EuiText>
        <p>
          This content area will grow to accomodate when the accordion below
          opens
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiAccordion id="accordion4" buttonContent="A fourth nested accordion">
        <EuiText>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
        </EuiText>
      </EuiAccordion>
      <EuiSpacer />
    </EuiAccordion>
  </div>
);
