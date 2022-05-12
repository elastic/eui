import React from 'react';

import { EuiAccordion, EuiButton } from '../../../../src/components';
import { useGeneratedHtmlId } from '../../../../src/services';

export default () => {
  const extraActionAccordionId = useGeneratedHtmlId({
    prefix: 'extraActionAccordion',
  });

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
