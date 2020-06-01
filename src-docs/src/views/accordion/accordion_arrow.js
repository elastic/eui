import React from 'react';

import { EuiAccordion, EuiText, EuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <EuiAccordion
      id="accordion9"
      buttonContent="Arrows default to the left"
      paddingSize="s">
      <EuiText>
        <p>
          Any content inside of <strong>EuiAccordion</strong> will appear here.
        </p>
      </EuiText>
    </EuiAccordion>
    <EuiSpacer />
    <EuiAccordion
      id="accordion10"
      arrowDisplay="right"
      buttonContent="This one has it on the right"
      paddingSize="s">
      <EuiText>
        <p>
          Any content inside of <strong>EuiAccordion</strong> will appear here.
        </p>
      </EuiText>
    </EuiAccordion>
    <EuiSpacer />
    <EuiAccordion
      id="accordion11"
      arrowDisplay="none"
      buttonContent="This one has it removed entirely"
      paddingSize="s">
      <EuiText>
        <p>
          Any content inside of <strong>EuiAccordion</strong> will appear here.
        </p>
      </EuiText>
    </EuiAccordion>
  </div>
);
