import React from 'react';

import {
  EuiAccordion,
  EuiText,
  EuiSpacer,
  EuiPanel,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const accordionID__1 = htmlIdGenerator('accordion')();
  const accordionID__2 = htmlIdGenerator('accordion')();
  const accordionID__3 = htmlIdGenerator('accordion')();

  return (
    <div>
      <EuiAccordion
        id={accordionID__1}
        buttonContent="An accordion with padding applied through props"
        paddingSize="l">
        <EuiText size="s">
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
          <p>The content inside can be of any height.</p>
        </EuiText>
      </EuiAccordion>

      <EuiSpacer />

      <EuiAccordion
        id={accordionID__2}
        buttonContent="A second accordion with padding and a very long title that should truncate because of eui-textTruncate"
        buttonContentClassName="eui-textTruncate"
        paddingSize="l">
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
        id={accordionID__3}
        buttonContent="A third accordion with a nested accordion"
        paddingSize="m">
        <EuiText size="s">
          <p>
            This content area will grow to accommodate when the accordion below
            opens
          </p>
        </EuiText>
        <EuiSpacer />
        <EuiAccordion id="accordion6" buttonContent="A fourth nested accordion">
          <EuiPanel color="subdued">
            Any content inside of <strong>EuiAccordion</strong> will appear
            here.
          </EuiPanel>
        </EuiAccordion>
      </EuiAccordion>
    </div>
  );
};
