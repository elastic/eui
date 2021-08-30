import React from 'react';

import { EuiAccordion, EuiButton } from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const accordionID = htmlIdGenerator('accordion')();

  return (
    <EuiAccordion
      id={accordionID}
      buttonContent="Click to open"
      extraAction={<EuiButton size="s">Extra action!</EuiButton>}
      paddingSize="l">
      <strong>Opened content.</strong>
    </EuiAccordion>
  );
};
