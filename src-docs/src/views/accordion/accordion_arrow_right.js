import React from 'react';

import { EuiAccordion, EuiPanel } from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const accordionID = htmlIdGenerator('accordion')();

  return (
    <EuiAccordion
      id={accordionID}
      arrowDisplay="right"
      buttonContent="This accordion has the arrow on the right">
      <EuiPanel color="subdued">
        Any content inside of <strong>EuiAccordion</strong> will appear here.
      </EuiPanel>
    </EuiAccordion>
  );
};
