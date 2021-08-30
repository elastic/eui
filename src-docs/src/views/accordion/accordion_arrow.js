import React from 'react';

import { EuiAccordion, EuiPanel } from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const accordionID = htmlIdGenerator('accordion')();

  return (
    <EuiAccordion
      id={accordionID}
      arrowDisplay="none"
      buttonContent="This one has it removed entirely">
      <EuiPanel color="subdued">
        Any content inside of <strong>EuiAccordion</strong> will appear here.
      </EuiPanel>
    </EuiAccordion>
  );
};
