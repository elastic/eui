import React from 'react';

import {
  EuiAccordion,
  EuiText,
  EuiSpacer,
  EuiPanel,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiAccordion
      id="accordion3"
      buttonContent="An accordion with padding applied through props"
      paddingSize="l"
    >
      <EuiText size="s">
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
        <p>The content inside can be of any height.</p>
      </EuiText>
    </EuiAccordion>

    <EuiSpacer />

    <EuiAccordion
      id="accordion4"
      buttonContent="A second accordion with padding and a very long title that should truncate because of eui-textTruncate"
      buttonContentClassName="eui-textTruncate"
      paddingSize="l"
    >
      <EuiText size="s">
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
      id="accordion5"
      buttonContent="A third accordion with a nested accordion"
      paddingSize="m"
    >
      <EuiText size="s">
        <p>
          This content area will grow to accommodate when the accordion below
          opens
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiAccordion id="accordion6" buttonContent="A fourth nested accordion">
        <EuiPanel color="subdued">
          Any content inside of <strong>EuiAccordion</strong> will appear here.
        </EuiPanel>
      </EuiAccordion>
    </EuiAccordion>
  </div>
);
