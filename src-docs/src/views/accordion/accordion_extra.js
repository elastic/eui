import React from 'react';

import { EuiAccordion, EuiButton } from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const extraActionAccordionId = htmlIdGenerator('accordion')();

  return (
    <EuiAccordion
      id={extraActionAccordionId}
      buttonContent="Click to open"
      extraAction={<EuiButton size="s">Extra action!</EuiButton>}
      paddingSize="l"
    >
      <strong>Opened content.</strong>
    </EuiAccordion>
  );
};
